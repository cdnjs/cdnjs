(function __HLS_WORKER_BUNDLE__(__IN_WORKER__){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Hls = factory());
})(this, (function () { 'use strict';

  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    try {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    } catch (e) {
      return typeof fn === "function";
    }
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var urlToolkit = {exports: {}};

  (function (module, exports) {
  	// see https://tools.ietf.org/html/rfc1808

  	(function (root) {
  	  var URL_REGEX =
  	    /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/;
  	  var FIRST_SEGMENT_REGEX = /^(?=([^\/?#]*))\1([^]*)$/;
  	  var SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g;
  	  var SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g;

  	  var URLToolkit = {
  	    // If opts.alwaysNormalize is true then the path will always be normalized even when it starts with / or //
  	    // E.g
  	    // With opts.alwaysNormalize = false (default, spec compliant)
  	    // http://a.com/b/cd + /e/f/../g => http://a.com/e/f/../g
  	    // With opts.alwaysNormalize = true (not spec compliant)
  	    // http://a.com/b/cd + /e/f/../g => http://a.com/e/g
  	    buildAbsoluteURL: function (baseURL, relativeURL, opts) {
  	      opts = opts || {};
  	      // remove any remaining space and CRLF
  	      baseURL = baseURL.trim();
  	      relativeURL = relativeURL.trim();
  	      if (!relativeURL) {
  	        // 2a) If the embedded URL is entirely empty, it inherits the
  	        // entire base URL (i.e., is set equal to the base URL)
  	        // and we are done.
  	        if (!opts.alwaysNormalize) {
  	          return baseURL;
  	        }
  	        var basePartsForNormalise = URLToolkit.parseURL(baseURL);
  	        if (!basePartsForNormalise) {
  	          throw new Error('Error trying to parse base URL.');
  	        }
  	        basePartsForNormalise.path = URLToolkit.normalizePath(
  	          basePartsForNormalise.path
  	        );
  	        return URLToolkit.buildURLFromParts(basePartsForNormalise);
  	      }
  	      var relativeParts = URLToolkit.parseURL(relativeURL);
  	      if (!relativeParts) {
  	        throw new Error('Error trying to parse relative URL.');
  	      }
  	      if (relativeParts.scheme) {
  	        // 2b) If the embedded URL starts with a scheme name, it is
  	        // interpreted as an absolute URL and we are done.
  	        if (!opts.alwaysNormalize) {
  	          return relativeURL;
  	        }
  	        relativeParts.path = URLToolkit.normalizePath(relativeParts.path);
  	        return URLToolkit.buildURLFromParts(relativeParts);
  	      }
  	      var baseParts = URLToolkit.parseURL(baseURL);
  	      if (!baseParts) {
  	        throw new Error('Error trying to parse base URL.');
  	      }
  	      if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== '/') {
  	        // If netLoc missing and path doesn't start with '/', assume everthing before the first '/' is the netLoc
  	        // This causes 'example.com/a' to be handled as '//example.com/a' instead of '/example.com/a'
  	        var pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path);
  	        baseParts.netLoc = pathParts[1];
  	        baseParts.path = pathParts[2];
  	      }
  	      if (baseParts.netLoc && !baseParts.path) {
  	        baseParts.path = '/';
  	      }
  	      var builtParts = {
  	        // 2c) Otherwise, the embedded URL inherits the scheme of
  	        // the base URL.
  	        scheme: baseParts.scheme,
  	        netLoc: relativeParts.netLoc,
  	        path: null,
  	        params: relativeParts.params,
  	        query: relativeParts.query,
  	        fragment: relativeParts.fragment,
  	      };
  	      if (!relativeParts.netLoc) {
  	        // 3) If the embedded URL's <net_loc> is non-empty, we skip to
  	        // Step 7.  Otherwise, the embedded URL inherits the <net_loc>
  	        // (if any) of the base URL.
  	        builtParts.netLoc = baseParts.netLoc;
  	        // 4) If the embedded URL path is preceded by a slash "/", the
  	        // path is not relative and we skip to Step 7.
  	        if (relativeParts.path[0] !== '/') {
  	          if (!relativeParts.path) {
  	            // 5) If the embedded URL path is empty (and not preceded by a
  	            // slash), then the embedded URL inherits the base URL path
  	            builtParts.path = baseParts.path;
  	            // 5a) if the embedded URL's <params> is non-empty, we skip to
  	            // step 7; otherwise, it inherits the <params> of the base
  	            // URL (if any) and
  	            if (!relativeParts.params) {
  	              builtParts.params = baseParts.params;
  	              // 5b) if the embedded URL's <query> is non-empty, we skip to
  	              // step 7; otherwise, it inherits the <query> of the base
  	              // URL (if any) and we skip to step 7.
  	              if (!relativeParts.query) {
  	                builtParts.query = baseParts.query;
  	              }
  	            }
  	          } else {
  	            // 6) The last segment of the base URL's path (anything
  	            // following the rightmost slash "/", or the entire path if no
  	            // slash is present) is removed and the embedded URL's path is
  	            // appended in its place.
  	            var baseURLPath = baseParts.path;
  	            var newPath =
  	              baseURLPath.substring(0, baseURLPath.lastIndexOf('/') + 1) +
  	              relativeParts.path;
  	            builtParts.path = URLToolkit.normalizePath(newPath);
  	          }
  	        }
  	      }
  	      if (builtParts.path === null) {
  	        builtParts.path = opts.alwaysNormalize
  	          ? URLToolkit.normalizePath(relativeParts.path)
  	          : relativeParts.path;
  	      }
  	      return URLToolkit.buildURLFromParts(builtParts);
  	    },
  	    parseURL: function (url) {
  	      var parts = URL_REGEX.exec(url);
  	      if (!parts) {
  	        return null;
  	      }
  	      return {
  	        scheme: parts[1] || '',
  	        netLoc: parts[2] || '',
  	        path: parts[3] || '',
  	        params: parts[4] || '',
  	        query: parts[5] || '',
  	        fragment: parts[6] || '',
  	      };
  	    },
  	    normalizePath: function (path) {
  	      // The following operations are
  	      // then applied, in order, to the new path:
  	      // 6a) All occurrences of "./", where "." is a complete path
  	      // segment, are removed.
  	      // 6b) If the path ends with "." as a complete path segment,
  	      // that "." is removed.
  	      path = path.split('').reverse().join('').replace(SLASH_DOT_REGEX, '');
  	      // 6c) All occurrences of "<segment>/../", where <segment> is a
  	      // complete path segment not equal to "..", are removed.
  	      // Removal of these path segments is performed iteratively,
  	      // removing the leftmost matching pattern on each iteration,
  	      // until no matching pattern remains.
  	      // 6d) If the path ends with "<segment>/..", where <segment> is a
  	      // complete path segment not equal to "..", that
  	      // "<segment>/.." is removed.
  	      while (
  	        path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, '')).length
  	      ) {}
  	      return path.split('').reverse().join('');
  	    },
  	    buildURLFromParts: function (parts) {
  	      return (
  	        parts.scheme +
  	        parts.netLoc +
  	        parts.path +
  	        parts.params +
  	        parts.query +
  	        parts.fragment
  	      );
  	    },
  	  };

  	  module.exports = URLToolkit;
  	})(); 
  } (urlToolkit));

  var urlToolkitExports = urlToolkit.exports;

  // https://caniuse.com/mdn-javascript_builtins_number_isfinite
  var isFiniteNumber = Number.isFinite || function (value) {
    return typeof value === 'number' && isFinite(value);
  };

  // https://caniuse.com/mdn-javascript_builtins_number_issafeinteger
  var isSafeInteger = Number.isSafeInteger || function (value) {
    return typeof value === 'number' && Math.abs(value) <= MAX_SAFE_INTEGER;
  };
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

  var Events = /*#__PURE__*/function (Events) {
    Events["MEDIA_ATTACHING"] = "hlsMediaAttaching";
    Events["MEDIA_ATTACHED"] = "hlsMediaAttached";
    Events["MEDIA_DETACHING"] = "hlsMediaDetaching";
    Events["MEDIA_DETACHED"] = "hlsMediaDetached";
    Events["BUFFER_RESET"] = "hlsBufferReset";
    Events["BUFFER_CODECS"] = "hlsBufferCodecs";
    Events["BUFFER_CREATED"] = "hlsBufferCreated";
    Events["BUFFER_APPENDING"] = "hlsBufferAppending";
    Events["BUFFER_APPENDED"] = "hlsBufferAppended";
    Events["BUFFER_EOS"] = "hlsBufferEos";
    Events["BUFFER_FLUSHING"] = "hlsBufferFlushing";
    Events["BUFFER_FLUSHED"] = "hlsBufferFlushed";
    Events["MANIFEST_LOADING"] = "hlsManifestLoading";
    Events["MANIFEST_LOADED"] = "hlsManifestLoaded";
    Events["MANIFEST_PARSED"] = "hlsManifestParsed";
    Events["LEVEL_SWITCHING"] = "hlsLevelSwitching";
    Events["LEVEL_SWITCHED"] = "hlsLevelSwitched";
    Events["LEVEL_LOADING"] = "hlsLevelLoading";
    Events["LEVEL_LOADED"] = "hlsLevelLoaded";
    Events["LEVEL_UPDATED"] = "hlsLevelUpdated";
    Events["LEVEL_PTS_UPDATED"] = "hlsLevelPtsUpdated";
    Events["LEVELS_UPDATED"] = "hlsLevelsUpdated";
    Events["AUDIO_TRACKS_UPDATED"] = "hlsAudioTracksUpdated";
    Events["AUDIO_TRACK_SWITCHING"] = "hlsAudioTrackSwitching";
    Events["AUDIO_TRACK_SWITCHED"] = "hlsAudioTrackSwitched";
    Events["AUDIO_TRACK_LOADING"] = "hlsAudioTrackLoading";
    Events["AUDIO_TRACK_LOADED"] = "hlsAudioTrackLoaded";
    Events["SUBTITLE_TRACKS_UPDATED"] = "hlsSubtitleTracksUpdated";
    Events["SUBTITLE_TRACKS_CLEARED"] = "hlsSubtitleTracksCleared";
    Events["SUBTITLE_TRACK_SWITCH"] = "hlsSubtitleTrackSwitch";
    Events["SUBTITLE_TRACK_LOADING"] = "hlsSubtitleTrackLoading";
    Events["SUBTITLE_TRACK_LOADED"] = "hlsSubtitleTrackLoaded";
    Events["SUBTITLE_FRAG_PROCESSED"] = "hlsSubtitleFragProcessed";
    Events["CUES_PARSED"] = "hlsCuesParsed";
    Events["NON_NATIVE_TEXT_TRACKS_FOUND"] = "hlsNonNativeTextTracksFound";
    Events["INIT_PTS_FOUND"] = "hlsInitPtsFound";
    Events["FRAG_LOADING"] = "hlsFragLoading";
    Events["FRAG_LOAD_EMERGENCY_ABORTED"] = "hlsFragLoadEmergencyAborted";
    Events["FRAG_LOADED"] = "hlsFragLoaded";
    Events["FRAG_DECRYPTED"] = "hlsFragDecrypted";
    Events["FRAG_PARSING_INIT_SEGMENT"] = "hlsFragParsingInitSegment";
    Events["FRAG_PARSING_USERDATA"] = "hlsFragParsingUserdata";
    Events["FRAG_PARSING_METADATA"] = "hlsFragParsingMetadata";
    Events["FRAG_PARSED"] = "hlsFragParsed";
    Events["FRAG_BUFFERED"] = "hlsFragBuffered";
    Events["FRAG_CHANGED"] = "hlsFragChanged";
    Events["FPS_DROP"] = "hlsFpsDrop";
    Events["FPS_DROP_LEVEL_CAPPING"] = "hlsFpsDropLevelCapping";
    Events["MAX_AUTO_LEVEL_UPDATED"] = "hlsMaxAutoLevelUpdated";
    Events["ERROR"] = "hlsError";
    Events["DESTROYING"] = "hlsDestroying";
    Events["KEY_LOADING"] = "hlsKeyLoading";
    Events["KEY_LOADED"] = "hlsKeyLoaded";
    Events["LIVE_BACK_BUFFER_REACHED"] = "hlsLiveBackBufferReached";
    Events["BACK_BUFFER_REACHED"] = "hlsBackBufferReached";
    Events["STEERING_MANIFEST_LOADED"] = "hlsSteeringManifestLoaded";
    return Events;
  }({});

  /**
   * Defines each Event type and payload by Event name. Used in {@link hls.js#HlsEventEmitter} to strongly type the event listener API.
   */

  var ErrorTypes = /*#__PURE__*/function (ErrorTypes) {
    ErrorTypes["NETWORK_ERROR"] = "networkError";
    ErrorTypes["MEDIA_ERROR"] = "mediaError";
    ErrorTypes["KEY_SYSTEM_ERROR"] = "keySystemError";
    ErrorTypes["MUX_ERROR"] = "muxError";
    ErrorTypes["OTHER_ERROR"] = "otherError";
    return ErrorTypes;
  }({});
  var ErrorDetails = /*#__PURE__*/function (ErrorDetails) {
    ErrorDetails["KEY_SYSTEM_NO_KEYS"] = "keySystemNoKeys";
    ErrorDetails["KEY_SYSTEM_NO_ACCESS"] = "keySystemNoAccess";
    ErrorDetails["KEY_SYSTEM_NO_SESSION"] = "keySystemNoSession";
    ErrorDetails["KEY_SYSTEM_NO_CONFIGURED_LICENSE"] = "keySystemNoConfiguredLicense";
    ErrorDetails["KEY_SYSTEM_LICENSE_REQUEST_FAILED"] = "keySystemLicenseRequestFailed";
    ErrorDetails["KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED"] = "keySystemServerCertificateRequestFailed";
    ErrorDetails["KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED"] = "keySystemServerCertificateUpdateFailed";
    ErrorDetails["KEY_SYSTEM_SESSION_UPDATE_FAILED"] = "keySystemSessionUpdateFailed";
    ErrorDetails["KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED"] = "keySystemStatusOutputRestricted";
    ErrorDetails["KEY_SYSTEM_STATUS_INTERNAL_ERROR"] = "keySystemStatusInternalError";
    ErrorDetails["MANIFEST_LOAD_ERROR"] = "manifestLoadError";
    ErrorDetails["MANIFEST_LOAD_TIMEOUT"] = "manifestLoadTimeOut";
    ErrorDetails["MANIFEST_PARSING_ERROR"] = "manifestParsingError";
    ErrorDetails["MANIFEST_INCOMPATIBLE_CODECS_ERROR"] = "manifestIncompatibleCodecsError";
    ErrorDetails["LEVEL_EMPTY_ERROR"] = "levelEmptyError";
    ErrorDetails["LEVEL_LOAD_ERROR"] = "levelLoadError";
    ErrorDetails["LEVEL_LOAD_TIMEOUT"] = "levelLoadTimeOut";
    ErrorDetails["LEVEL_PARSING_ERROR"] = "levelParsingError";
    ErrorDetails["LEVEL_SWITCH_ERROR"] = "levelSwitchError";
    ErrorDetails["AUDIO_TRACK_LOAD_ERROR"] = "audioTrackLoadError";
    ErrorDetails["AUDIO_TRACK_LOAD_TIMEOUT"] = "audioTrackLoadTimeOut";
    ErrorDetails["SUBTITLE_LOAD_ERROR"] = "subtitleTrackLoadError";
    ErrorDetails["SUBTITLE_TRACK_LOAD_TIMEOUT"] = "subtitleTrackLoadTimeOut";
    ErrorDetails["FRAG_LOAD_ERROR"] = "fragLoadError";
    ErrorDetails["FRAG_LOAD_TIMEOUT"] = "fragLoadTimeOut";
    ErrorDetails["FRAG_DECRYPT_ERROR"] = "fragDecryptError";
    ErrorDetails["FRAG_PARSING_ERROR"] = "fragParsingError";
    ErrorDetails["FRAG_GAP"] = "fragGap";
    ErrorDetails["REMUX_ALLOC_ERROR"] = "remuxAllocError";
    ErrorDetails["KEY_LOAD_ERROR"] = "keyLoadError";
    ErrorDetails["KEY_LOAD_TIMEOUT"] = "keyLoadTimeOut";
    ErrorDetails["BUFFER_ADD_CODEC_ERROR"] = "bufferAddCodecError";
    ErrorDetails["BUFFER_INCOMPATIBLE_CODECS_ERROR"] = "bufferIncompatibleCodecsError";
    ErrorDetails["BUFFER_APPEND_ERROR"] = "bufferAppendError";
    ErrorDetails["BUFFER_APPENDING_ERROR"] = "bufferAppendingError";
    ErrorDetails["BUFFER_STALLED_ERROR"] = "bufferStalledError";
    ErrorDetails["BUFFER_FULL_ERROR"] = "bufferFullError";
    ErrorDetails["BUFFER_SEEK_OVER_HOLE"] = "bufferSeekOverHole";
    ErrorDetails["BUFFER_NUDGE_ON_STALL"] = "bufferNudgeOnStall";
    ErrorDetails["INTERNAL_EXCEPTION"] = "internalException";
    ErrorDetails["INTERNAL_ABORTED"] = "aborted";
    ErrorDetails["UNKNOWN"] = "unknown";
    return ErrorDetails;
  }({});

  var noop = function noop() {};
  var fakeLogger = {
    trace: noop,
    debug: noop,
    log: noop,
    warn: noop,
    info: noop,
    error: noop
  };
  var exportedLogger = fakeLogger;

  // let lastCallTime;
  // function formatMsgWithTimeInfo(type, msg) {
  //   const now = Date.now();
  //   const diff = lastCallTime ? '+' + (now - lastCallTime) : '0';
  //   lastCallTime = now;
  //   msg = (new Date(now)).toISOString() + ' | [' +  type + '] > ' + msg + ' ( ' + diff + ' ms )';
  //   return msg;
  // }

  function consolePrintFn(type) {
    var func = self.console[type];
    if (func) {
      return func.bind(self.console, "[" + type + "] >");
    }
    return noop;
  }
  function exportLoggerFunctions(debugConfig) {
    for (var _len = arguments.length, functions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      functions[_key - 1] = arguments[_key];
    }
    functions.forEach(function (type) {
      exportedLogger[type] = debugConfig[type] ? debugConfig[type].bind(debugConfig) : consolePrintFn(type);
    });
  }
  function enableLogs(debugConfig, id) {
    // check that console is available
    if (typeof console === 'object' && debugConfig === true || typeof debugConfig === 'object') {
      exportLoggerFunctions(debugConfig,
      // Remove out from list here to hard-disable a log-level
      // 'trace',
      'debug', 'log', 'info', 'warn', 'error');
      // Some browsers don't allow to use bind on console object anyway
      // fallback to default if needed
      try {
        exportedLogger.log("Debug logs enabled for \"" + id + "\" in hls.js version " + "1.5.8");
      } catch (e) {
        exportedLogger = fakeLogger;
      }
    } else {
      exportedLogger = fakeLogger;
    }
  }
  var logger = exportedLogger;

  var DECIMAL_RESOLUTION_REGEX = /^(\d+)x(\d+)$/;
  var ATTR_LIST_REGEX = /(.+?)=(".*?"|.*?)(?:,|$)/g;

  // adapted from https://github.com/kanongil/node-m3u8parse/blob/master/attrlist.js
  var AttrList = /*#__PURE__*/function () {
    function AttrList(attrs) {
      if (typeof attrs === 'string') {
        attrs = AttrList.parseAttrList(attrs);
      }
      _extends(this, attrs);
    }
    var _proto = AttrList.prototype;
    _proto.decimalInteger = function decimalInteger(attrName) {
      var intValue = parseInt(this[attrName], 10);
      if (intValue > Number.MAX_SAFE_INTEGER) {
        return Infinity;
      }
      return intValue;
    };
    _proto.hexadecimalInteger = function hexadecimalInteger(attrName) {
      if (this[attrName]) {
        var stringValue = (this[attrName] || '0x').slice(2);
        stringValue = (stringValue.length & 1 ? '0' : '') + stringValue;
        var value = new Uint8Array(stringValue.length / 2);
        for (var i = 0; i < stringValue.length / 2; i++) {
          value[i] = parseInt(stringValue.slice(i * 2, i * 2 + 2), 16);
        }
        return value;
      } else {
        return null;
      }
    };
    _proto.hexadecimalIntegerAsNumber = function hexadecimalIntegerAsNumber(attrName) {
      var intValue = parseInt(this[attrName], 16);
      if (intValue > Number.MAX_SAFE_INTEGER) {
        return Infinity;
      }
      return intValue;
    };
    _proto.decimalFloatingPoint = function decimalFloatingPoint(attrName) {
      return parseFloat(this[attrName]);
    };
    _proto.optionalFloat = function optionalFloat(attrName, defaultValue) {
      var value = this[attrName];
      return value ? parseFloat(value) : defaultValue;
    };
    _proto.enumeratedString = function enumeratedString(attrName) {
      return this[attrName];
    };
    _proto.bool = function bool(attrName) {
      return this[attrName] === 'YES';
    };
    _proto.decimalResolution = function decimalResolution(attrName) {
      var res = DECIMAL_RESOLUTION_REGEX.exec(this[attrName]);
      if (res === null) {
        return undefined;
      }
      return {
        width: parseInt(res[1], 10),
        height: parseInt(res[2], 10)
      };
    };
    AttrList.parseAttrList = function parseAttrList(input) {
      var match;
      var attrs = {};
      var quote = '"';
      ATTR_LIST_REGEX.lastIndex = 0;
      while ((match = ATTR_LIST_REGEX.exec(input)) !== null) {
        var value = match[2];
        if (value.indexOf(quote) === 0 && value.lastIndexOf(quote) === value.length - 1) {
          value = value.slice(1, -1);
        }
        var name = match[1].trim();
        attrs[name] = value;
      }
      return attrs;
    };
    _createClass(AttrList, [{
      key: "clientAttrs",
      get: function get() {
        return Object.keys(this).filter(function (attr) {
          return attr.substring(0, 2) === 'X-';
        });
      }
    }]);
    return AttrList;
  }();

  // Avoid exporting const enum so that these values can be inlined

  function isDateRangeCueAttribute(attrName) {
    return attrName !== "ID" && attrName !== "CLASS" && attrName !== "START-DATE" && attrName !== "DURATION" && attrName !== "END-DATE" && attrName !== "END-ON-NEXT";
  }
  function isSCTE35Attribute(attrName) {
    return attrName === "SCTE35-OUT" || attrName === "SCTE35-IN";
  }
  var DateRange = /*#__PURE__*/function () {
    function DateRange(dateRangeAttr, dateRangeWithSameId) {
      this.attr = void 0;
      this._startDate = void 0;
      this._endDate = void 0;
      this._badValueForSameId = void 0;
      if (dateRangeWithSameId) {
        var previousAttr = dateRangeWithSameId.attr;
        for (var key in previousAttr) {
          if (Object.prototype.hasOwnProperty.call(dateRangeAttr, key) && dateRangeAttr[key] !== previousAttr[key]) {
            logger.warn("DATERANGE tag attribute: \"" + key + "\" does not match for tags with ID: \"" + dateRangeAttr.ID + "\"");
            this._badValueForSameId = key;
            break;
          }
        }
        // Merge DateRange tags with the same ID
        dateRangeAttr = _extends(new AttrList({}), previousAttr, dateRangeAttr);
      }
      this.attr = dateRangeAttr;
      this._startDate = new Date(dateRangeAttr["START-DATE"]);
      if ("END-DATE" in this.attr) {
        var endDate = new Date(this.attr["END-DATE"]);
        if (isFiniteNumber(endDate.getTime())) {
          this._endDate = endDate;
        }
      }
    }
    _createClass(DateRange, [{
      key: "id",
      get: function get() {
        return this.attr.ID;
      }
    }, {
      key: "class",
      get: function get() {
        return this.attr.CLASS;
      }
    }, {
      key: "startDate",
      get: function get() {
        return this._startDate;
      }
    }, {
      key: "endDate",
      get: function get() {
        if (this._endDate) {
          return this._endDate;
        }
        var duration = this.duration;
        if (duration !== null) {
          return new Date(this._startDate.getTime() + duration * 1000);
        }
        return null;
      }
    }, {
      key: "duration",
      get: function get() {
        if ("DURATION" in this.attr) {
          var duration = this.attr.decimalFloatingPoint("DURATION");
          if (isFiniteNumber(duration)) {
            return duration;
          }
        } else if (this._endDate) {
          return (this._endDate.getTime() - this._startDate.getTime()) / 1000;
        }
        return null;
      }
    }, {
      key: "plannedDuration",
      get: function get() {
        if ("PLANNED-DURATION" in this.attr) {
          return this.attr.decimalFloatingPoint("PLANNED-DURATION");
        }
        return null;
      }
    }, {
      key: "endOnNext",
      get: function get() {
        return this.attr.bool("END-ON-NEXT");
      }
    }, {
      key: "isValid",
      get: function get() {
        return !!this.id && !this._badValueForSameId && isFiniteNumber(this.startDate.getTime()) && (this.duration === null || this.duration >= 0) && (!this.endOnNext || !!this.class);
      }
    }]);
    return DateRange;
  }();

  var LoadStats = function LoadStats() {
    this.aborted = false;
    this.loaded = 0;
    this.retry = 0;
    this.total = 0;
    this.chunkCount = 0;
    this.bwEstimate = 0;
    this.loading = {
      start: 0,
      first: 0,
      end: 0
    };
    this.parsing = {
      start: 0,
      end: 0
    };
    this.buffering = {
      start: 0,
      first: 0,
      end: 0
    };
  };

  var ElementaryStreamTypes = {
    AUDIO: "audio",
    VIDEO: "video",
    AUDIOVIDEO: "audiovideo"
  };
  var BaseSegment = /*#__PURE__*/function () {
    function BaseSegment(baseurl) {
      var _this$elementaryStrea;
      this._byteRange = null;
      this._url = null;
      // baseurl is the URL to the playlist
      this.baseurl = void 0;
      // relurl is the portion of the URL that comes from inside the playlist.
      this.relurl = void 0;
      // Holds the types of data this fragment supports
      this.elementaryStreams = (_this$elementaryStrea = {}, _this$elementaryStrea[ElementaryStreamTypes.AUDIO] = null, _this$elementaryStrea[ElementaryStreamTypes.VIDEO] = null, _this$elementaryStrea[ElementaryStreamTypes.AUDIOVIDEO] = null, _this$elementaryStrea);
      this.baseurl = baseurl;
    }

    // setByteRange converts a EXT-X-BYTERANGE attribute into a two element array
    var _proto = BaseSegment.prototype;
    _proto.setByteRange = function setByteRange(value, previous) {
      var params = value.split('@', 2);
      var start;
      if (params.length === 1) {
        start = (previous == null ? void 0 : previous.byteRangeEndOffset) || 0;
      } else {
        start = parseInt(params[1]);
      }
      this._byteRange = [start, parseInt(params[0]) + start];
    };
    _createClass(BaseSegment, [{
      key: "byteRange",
      get: function get() {
        if (!this._byteRange) {
          return [];
        }
        return this._byteRange;
      }
    }, {
      key: "byteRangeStartOffset",
      get: function get() {
        return this.byteRange[0];
      }
    }, {
      key: "byteRangeEndOffset",
      get: function get() {
        return this.byteRange[1];
      }
    }, {
      key: "url",
      get: function get() {
        if (!this._url && this.baseurl && this.relurl) {
          this._url = urlToolkitExports.buildAbsoluteURL(this.baseurl, this.relurl, {
            alwaysNormalize: true
          });
        }
        return this._url || '';
      },
      set: function set(value) {
        this._url = value;
      }
    }]);
    return BaseSegment;
  }();

  /**
   * Object representing parsed data from an HLS Segment. Found in {@link hls.js#LevelDetails.fragments}.
   */
  var Fragment = /*#__PURE__*/function (_BaseSegment) {
    _inheritsLoose(Fragment, _BaseSegment);
    function Fragment(type, baseurl) {
      var _this;
      _this = _BaseSegment.call(this, baseurl) || this;
      _this._decryptdata = null;
      _this.rawProgramDateTime = null;
      _this.programDateTime = null;
      _this.tagList = [];
      // EXTINF has to be present for a m3u8 to be considered valid
      _this.duration = 0;
      // sn notates the sequence number for a segment, and if set to a string can be 'initSegment'
      _this.sn = 0;
      // levelkeys are the EXT-X-KEY tags that apply to this segment for decryption
      // core difference from the private field _decryptdata is the lack of the initialized IV
      // _decryptdata will set the IV for this segment based on the segment number in the fragment
      _this.levelkeys = void 0;
      // A string representing the fragment type
      _this.type = void 0;
      // A reference to the loader. Set while the fragment is loading, and removed afterwards. Used to abort fragment loading
      _this.loader = null;
      // A reference to the key loader. Set while the key is loading, and removed afterwards. Used to abort key loading
      _this.keyLoader = null;
      // The level/track index to which the fragment belongs
      _this.level = -1;
      // The continuity counter of the fragment
      _this.cc = 0;
      // The starting Presentation Time Stamp (PTS) of the fragment. Set after transmux complete.
      _this.startPTS = void 0;
      // The ending Presentation Time Stamp (PTS) of the fragment. Set after transmux complete.
      _this.endPTS = void 0;
      // The starting Decode Time Stamp (DTS) of the fragment. Set after transmux complete.
      _this.startDTS = void 0;
      // The ending Decode Time Stamp (DTS) of the fragment. Set after transmux complete.
      _this.endDTS = void 0;
      // The start time of the fragment, as listed in the manifest. Updated after transmux complete.
      _this.start = 0;
      // Set by `updateFragPTSDTS` in level-helper
      _this.deltaPTS = void 0;
      // The maximum starting Presentation Time Stamp (audio/video PTS) of the fragment. Set after transmux complete.
      _this.maxStartPTS = void 0;
      // The minimum ending Presentation Time Stamp (audio/video PTS) of the fragment. Set after transmux complete.
      _this.minEndPTS = void 0;
      // Load/parse timing information
      _this.stats = new LoadStats();
      // Init Segment bytes (unset for media segments)
      _this.data = void 0;
      // A flag indicating whether the segment was downloaded in order to test bitrate, and was not buffered
      _this.bitrateTest = false;
      // #EXTINF  segment title
      _this.title = null;
      // The Media Initialization Section for this segment
      _this.initSegment = null;
      // Fragment is the last fragment in the media playlist
      _this.endList = void 0;
      // Fragment is marked by an EXT-X-GAP tag indicating that it does not contain media data and should not be loaded
      _this.gap = void 0;
      // Deprecated
      _this.urlId = 0;
      _this.type = type;
      return _this;
    }
    var _proto2 = Fragment.prototype;
    _proto2.setKeyFormat = function setKeyFormat(keyFormat) {
      if (this.levelkeys) {
        var _key = this.levelkeys[keyFormat];
        if (_key && !this._decryptdata) {
          this._decryptdata = _key.getDecryptData(this.sn);
        }
      }
    };
    _proto2.abortRequests = function abortRequests() {
      var _this$loader, _this$keyLoader;
      (_this$loader = this.loader) == null ? void 0 : _this$loader.abort();
      (_this$keyLoader = this.keyLoader) == null ? void 0 : _this$keyLoader.abort();
    };
    _proto2.setElementaryStreamInfo = function setElementaryStreamInfo(type, startPTS, endPTS, startDTS, endDTS, partial) {
      if (partial === void 0) {
        partial = false;
      }
      var elementaryStreams = this.elementaryStreams;
      var info = elementaryStreams[type];
      if (!info) {
        elementaryStreams[type] = {
          startPTS: startPTS,
          endPTS: endPTS,
          startDTS: startDTS,
          endDTS: endDTS,
          partial: partial
        };
        return;
      }
      info.startPTS = Math.min(info.startPTS, startPTS);
      info.endPTS = Math.max(info.endPTS, endPTS);
      info.startDTS = Math.min(info.startDTS, startDTS);
      info.endDTS = Math.max(info.endDTS, endDTS);
    };
    _proto2.clearElementaryStreamInfo = function clearElementaryStreamInfo() {
      var elementaryStreams = this.elementaryStreams;
      elementaryStreams[ElementaryStreamTypes.AUDIO] = null;
      elementaryStreams[ElementaryStreamTypes.VIDEO] = null;
      elementaryStreams[ElementaryStreamTypes.AUDIOVIDEO] = null;
    };
    _createClass(Fragment, [{
      key: "decryptdata",
      get: function get() {
        var levelkeys = this.levelkeys;
        if (!levelkeys && !this._decryptdata) {
          return null;
        }
        if (!this._decryptdata && this.levelkeys && !this.levelkeys.NONE) {
          var _key2 = this.levelkeys.identity;
          if (_key2) {
            this._decryptdata = _key2.getDecryptData(this.sn);
          } else {
            var keyFormats = Object.keys(this.levelkeys);
            if (keyFormats.length === 1) {
              return this._decryptdata = this.levelkeys[keyFormats[0]].getDecryptData(this.sn);
            }
          }
        }
        return this._decryptdata;
      }
    }, {
      key: "end",
      get: function get() {
        return this.start + this.duration;
      }
    }, {
      key: "endProgramDateTime",
      get: function get() {
        if (this.programDateTime === null) {
          return null;
        }
        if (!isFiniteNumber(this.programDateTime)) {
          return null;
        }
        var duration = !isFiniteNumber(this.duration) ? 0 : this.duration;
        return this.programDateTime + duration * 1000;
      }
    }, {
      key: "encrypted",
      get: function get() {
        var _this$_decryptdata;
        // At the m3u8-parser level we need to add support for manifest signalled keyformats
        // when we want the fragment to start reporting that it is encrypted.
        // Currently, keyFormat will only be set for identity keys
        if ((_this$_decryptdata = this._decryptdata) != null && _this$_decryptdata.encrypted) {
          return true;
        } else if (this.levelkeys) {
          var keyFormats = Object.keys(this.levelkeys);
          var len = keyFormats.length;
          if (len > 1 || len === 1 && this.levelkeys[keyFormats[0]].encrypted) {
            return true;
          }
        }
        return false;
      }
    }]);
    return Fragment;
  }(BaseSegment);

  /**
   * Object representing parsed data from an HLS Partial Segment. Found in {@link hls.js#LevelDetails.partList}.
   */
  var Part = /*#__PURE__*/function (_BaseSegment2) {
    _inheritsLoose(Part, _BaseSegment2);
    function Part(partAttrs, frag, baseurl, index, previous) {
      var _this2;
      _this2 = _BaseSegment2.call(this, baseurl) || this;
      _this2.fragOffset = 0;
      _this2.duration = 0;
      _this2.gap = false;
      _this2.independent = false;
      _this2.relurl = void 0;
      _this2.fragment = void 0;
      _this2.index = void 0;
      _this2.stats = new LoadStats();
      _this2.duration = partAttrs.decimalFloatingPoint('DURATION');
      _this2.gap = partAttrs.bool('GAP');
      _this2.independent = partAttrs.bool('INDEPENDENT');
      _this2.relurl = partAttrs.enumeratedString('URI');
      _this2.fragment = frag;
      _this2.index = index;
      var byteRange = partAttrs.enumeratedString('BYTERANGE');
      if (byteRange) {
        _this2.setByteRange(byteRange, previous);
      }
      if (previous) {
        _this2.fragOffset = previous.fragOffset + previous.duration;
      }
      return _this2;
    }
    _createClass(Part, [{
      key: "start",
      get: function get() {
        return this.fragment.start + this.fragOffset;
      }
    }, {
      key: "end",
      get: function get() {
        return this.start + this.duration;
      }
    }, {
      key: "loaded",
      get: function get() {
        var elementaryStreams = this.elementaryStreams;
        return !!(elementaryStreams.audio || elementaryStreams.video || elementaryStreams.audiovideo);
      }
    }]);
    return Part;
  }(BaseSegment);

  var DEFAULT_TARGET_DURATION = 10;

  /**
   * Object representing parsed data from an HLS Media Playlist. Found in {@link hls.js#Level.details}.
   */
  var LevelDetails = /*#__PURE__*/function () {
    function LevelDetails(baseUrl) {
      this.PTSKnown = false;
      this.alignedSliding = false;
      this.averagetargetduration = void 0;
      this.endCC = 0;
      this.endSN = 0;
      this.fragments = void 0;
      this.fragmentHint = void 0;
      this.partList = null;
      this.dateRanges = void 0;
      this.live = true;
      this.ageHeader = 0;
      this.advancedDateTime = void 0;
      this.updated = true;
      this.advanced = true;
      this.availabilityDelay = void 0;
      // Manifest reload synchronization
      this.misses = 0;
      this.startCC = 0;
      this.startSN = 0;
      this.startTimeOffset = null;
      this.targetduration = 0;
      this.totalduration = 0;
      this.type = null;
      this.url = void 0;
      this.m3u8 = '';
      this.version = null;
      this.canBlockReload = false;
      this.canSkipUntil = 0;
      this.canSkipDateRanges = false;
      this.skippedSegments = 0;
      this.recentlyRemovedDateranges = void 0;
      this.partHoldBack = 0;
      this.holdBack = 0;
      this.partTarget = 0;
      this.preloadHint = void 0;
      this.renditionReports = void 0;
      this.tuneInGoal = 0;
      this.deltaUpdateFailed = void 0;
      this.driftStartTime = 0;
      this.driftEndTime = 0;
      this.driftStart = 0;
      this.driftEnd = 0;
      this.encryptedFragments = void 0;
      this.playlistParsingError = null;
      this.variableList = null;
      this.hasVariableRefs = false;
      this.fragments = [];
      this.encryptedFragments = [];
      this.dateRanges = {};
      this.url = baseUrl;
    }
    var _proto = LevelDetails.prototype;
    _proto.reloaded = function reloaded(previous) {
      if (!previous) {
        this.advanced = true;
        this.updated = true;
        return;
      }
      var partSnDiff = this.lastPartSn - previous.lastPartSn;
      var partIndexDiff = this.lastPartIndex - previous.lastPartIndex;
      this.updated = this.endSN !== previous.endSN || !!partIndexDiff || !!partSnDiff || !this.live;
      this.advanced = this.endSN > previous.endSN || partSnDiff > 0 || partSnDiff === 0 && partIndexDiff > 0;
      if (this.updated || this.advanced) {
        this.misses = Math.floor(previous.misses * 0.6);
      } else {
        this.misses = previous.misses + 1;
      }
      this.availabilityDelay = previous.availabilityDelay;
    };
    _createClass(LevelDetails, [{
      key: "hasProgramDateTime",
      get: function get() {
        if (this.fragments.length) {
          return isFiniteNumber(this.fragments[this.fragments.length - 1].programDateTime);
        }
        return false;
      }
    }, {
      key: "levelTargetDuration",
      get: function get() {
        return this.averagetargetduration || this.targetduration || DEFAULT_TARGET_DURATION;
      }
    }, {
      key: "drift",
      get: function get() {
        var runTime = this.driftEndTime - this.driftStartTime;
        if (runTime > 0) {
          var runDuration = this.driftEnd - this.driftStart;
          return runDuration * 1000 / runTime;
        }
        return 1;
      }
    }, {
      key: "edge",
      get: function get() {
        return this.partEnd || this.fragmentEnd;
      }
    }, {
      key: "partEnd",
      get: function get() {
        var _this$partList;
        if ((_this$partList = this.partList) != null && _this$partList.length) {
          return this.partList[this.partList.length - 1].end;
        }
        return this.fragmentEnd;
      }
    }, {
      key: "fragmentEnd",
      get: function get() {
        var _this$fragments;
        if ((_this$fragments = this.fragments) != null && _this$fragments.length) {
          return this.fragments[this.fragments.length - 1].end;
        }
        return 0;
      }
    }, {
      key: "age",
      get: function get() {
        if (this.advancedDateTime) {
          return Math.max(Date.now() - this.advancedDateTime, 0) / 1000;
        }
        return 0;
      }
    }, {
      key: "lastPartIndex",
      get: function get() {
        var _this$partList2;
        if ((_this$partList2 = this.partList) != null && _this$partList2.length) {
          return this.partList[this.partList.length - 1].index;
        }
        return -1;
      }
    }, {
      key: "lastPartSn",
      get: function get() {
        var _this$partList3;
        if ((_this$partList3 = this.partList) != null && _this$partList3.length) {
          return this.partList[this.partList.length - 1].fragment.sn;
        }
        return this.endSN;
      }
    }]);
    return LevelDetails;
  }();

  // This file is inserted as a shim for modules which we do not want to include into the distro.
  // This replacement is done in the "alias" plugin of the rollup config.
  var empty = undefined;
  var Cues = /*@__PURE__*/getDefaultExportFromCjs(empty);

  function sliceUint8(array, start, end) {
    // @ts-expect-error This polyfills IE11 usage of Uint8Array slice.
    // It always exists in the TypeScript definition so fails, but it fails at runtime on IE11.
    return Uint8Array.prototype.slice ? array.slice(start, end) : new Uint8Array(Array.prototype.slice.call(array, start, end));
  }

  // breaking up those two types in order to clarify what is happening in the decoding path.

  /**
   * Returns true if an ID3 header can be found at offset in data
   * @param data - The data to search
   * @param offset - The offset at which to start searching
   */
  var isHeader$2 = function isHeader(data, offset) {
    /*
     * http://id3.org/id3v2.3.0
     * [0]     = 'I'
     * [1]     = 'D'
     * [2]     = '3'
     * [3,4]   = {Version}
     * [5]     = {Flags}
     * [6-9]   = {ID3 Size}
     *
     * An ID3v2 tag can be detected with the following pattern:
     *  $49 44 33 yy yy xx zz zz zz zz
     * Where yy is less than $FF, xx is the 'flags' byte and zz is less than $80
     */
    if (offset + 10 <= data.length) {
      // look for 'ID3' identifier
      if (data[offset] === 0x49 && data[offset + 1] === 0x44 && data[offset + 2] === 0x33) {
        // check version is within range
        if (data[offset + 3] < 0xff && data[offset + 4] < 0xff) {
          // check size is within range
          if (data[offset + 6] < 0x80 && data[offset + 7] < 0x80 && data[offset + 8] < 0x80 && data[offset + 9] < 0x80) {
            return true;
          }
        }
      }
    }
    return false;
  };

  /**
   * Returns true if an ID3 footer can be found at offset in data
   * @param data - The data to search
   * @param offset - The offset at which to start searching
   */
  var isFooter = function isFooter(data, offset) {
    /*
     * The footer is a copy of the header, but with a different identifier
     */
    if (offset + 10 <= data.length) {
      // look for '3DI' identifier
      if (data[offset] === 0x33 && data[offset + 1] === 0x44 && data[offset + 2] === 0x49) {
        // check version is within range
        if (data[offset + 3] < 0xff && data[offset + 4] < 0xff) {
          // check size is within range
          if (data[offset + 6] < 0x80 && data[offset + 7] < 0x80 && data[offset + 8] < 0x80 && data[offset + 9] < 0x80) {
            return true;
          }
        }
      }
    }
    return false;
  };

  /**
   * Returns any adjacent ID3 tags found in data starting at offset, as one block of data
   * @param data - The data to search in
   * @param offset - The offset at which to start searching
   * @returns the block of data containing any ID3 tags found
   * or *undefined* if no header is found at the starting offset
   */
  var getID3Data = function getID3Data(data, offset) {
    var front = offset;
    var length = 0;
    while (isHeader$2(data, offset)) {
      // ID3 header is 10 bytes
      length += 10;
      var size = readSize(data, offset + 6);
      length += size;
      if (isFooter(data, offset + 10)) {
        // ID3 footer is 10 bytes
        length += 10;
      }
      offset += length;
    }
    if (length > 0) {
      return data.subarray(front, front + length);
    }
    return undefined;
  };
  var readSize = function readSize(data, offset) {
    var size = 0;
    size = (data[offset] & 0x7f) << 21;
    size |= (data[offset + 1] & 0x7f) << 14;
    size |= (data[offset + 2] & 0x7f) << 7;
    size |= data[offset + 3] & 0x7f;
    return size;
  };
  var canParse$2 = function canParse(data, offset) {
    return isHeader$2(data, offset) && readSize(data, offset + 6) + 10 <= data.length - offset;
  };

  /**
   * Searches for the Elementary Stream timestamp found in the ID3 data chunk
   * @param data - Block of data containing one or more ID3 tags
   */
  var getTimeStamp = function getTimeStamp(data) {
    var frames = getID3Frames(data);
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      if (isTimeStampFrame(frame)) {
        return readTimeStamp(frame);
      }
    }
    return undefined;
  };

  /**
   * Returns true if the ID3 frame is an Elementary Stream timestamp frame
   */
  var isTimeStampFrame = function isTimeStampFrame(frame) {
    return frame && frame.key === 'PRIV' && frame.info === 'com.apple.streaming.transportStreamTimestamp';
  };
  var getFrameData = function getFrameData(data) {
    /*
    Frame ID       $xx xx xx xx (four characters)
    Size           $xx xx xx xx
    Flags          $xx xx
    */
    var type = String.fromCharCode(data[0], data[1], data[2], data[3]);
    var size = readSize(data, 4);

    // skip frame id, size, and flags
    var offset = 10;
    return {
      type: type,
      size: size,
      data: data.subarray(offset, offset + size)
    };
  };

  /**
   * Returns an array of ID3 frames found in all the ID3 tags in the id3Data
   * @param id3Data - The ID3 data containing one or more ID3 tags
   */
  var getID3Frames = function getID3Frames(id3Data) {
    var offset = 0;
    var frames = [];
    while (isHeader$2(id3Data, offset)) {
      var size = readSize(id3Data, offset + 6);
      // skip past ID3 header
      offset += 10;
      var end = offset + size;
      // loop through frames in the ID3 tag
      while (offset + 8 < end) {
        var frameData = getFrameData(id3Data.subarray(offset));
        var frame = decodeFrame(frameData);
        if (frame) {
          frames.push(frame);
        }

        // skip frame header and frame data
        offset += frameData.size + 10;
      }
      if (isFooter(id3Data, offset)) {
        offset += 10;
      }
    }
    return frames;
  };
  var decodeFrame = function decodeFrame(frame) {
    if (frame.type === 'PRIV') {
      return decodePrivFrame(frame);
    } else if (frame.type[0] === 'W') {
      return decodeURLFrame(frame);
    }
    return decodeTextFrame(frame);
  };
  var decodePrivFrame = function decodePrivFrame(frame) {
    /*
    Format: <text string>\0<binary data>
    */
    if (frame.size < 2) {
      return undefined;
    }
    var owner = utf8ArrayToStr(frame.data, true);
    var privateData = new Uint8Array(frame.data.subarray(owner.length + 1));
    return {
      key: frame.type,
      info: owner,
      data: privateData.buffer
    };
  };
  var decodeTextFrame = function decodeTextFrame(frame) {
    if (frame.size < 2) {
      return undefined;
    }
    if (frame.type === 'TXXX') {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Description}\0{Value}
      */
      var index = 1;
      var description = utf8ArrayToStr(frame.data.subarray(index), true);
      index += description.length + 1;
      var value = utf8ArrayToStr(frame.data.subarray(index));
      return {
        key: frame.type,
        info: description,
        data: value
      };
    }
    /*
    Format:
    [0]   = {Text Encoding}
    [1-?] = {Value}
    */
    var text = utf8ArrayToStr(frame.data.subarray(1));
    return {
      key: frame.type,
      data: text
    };
  };
  var decodeURLFrame = function decodeURLFrame(frame) {
    if (frame.type === 'WXXX') {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Description}\0{URL}
      */
      if (frame.size < 2) {
        return undefined;
      }
      var index = 1;
      var description = utf8ArrayToStr(frame.data.subarray(index), true);
      index += description.length + 1;
      var value = utf8ArrayToStr(frame.data.subarray(index));
      return {
        key: frame.type,
        info: description,
        data: value
      };
    }
    /*
    Format:
    [0-?] = {URL}
    */
    var url = utf8ArrayToStr(frame.data);
    return {
      key: frame.type,
      data: url
    };
  };
  var readTimeStamp = function readTimeStamp(timeStampFrame) {
    if (timeStampFrame.data.byteLength === 8) {
      var data = new Uint8Array(timeStampFrame.data);
      // timestamp is 33 bit expressed as a big-endian eight-octet number,
      // with the upper 31 bits set to zero.
      var pts33Bit = data[3] & 0x1;
      var timestamp = (data[4] << 23) + (data[5] << 15) + (data[6] << 7) + data[7];
      timestamp /= 45;
      if (pts33Bit) {
        timestamp += 47721858.84;
      } // 2^32 / 90

      return Math.round(timestamp);
    }
    return undefined;
  };

  // http://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript/22373197
  // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
  /* utf.js - UTF-8 <=> UTF-16 convertion
   *
   * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0
   * LastModified: Dec 25 1999
   * This library is free.  You can redistribute it and/or modify it.
   */
  var utf8ArrayToStr = function utf8ArrayToStr(array, exitOnNull) {
    if (exitOnNull === void 0) {
      exitOnNull = false;
    }
    var decoder = getTextDecoder();
    if (decoder) {
      var decoded = decoder.decode(array);
      if (exitOnNull) {
        // grab up to the first null
        var idx = decoded.indexOf('\0');
        return idx !== -1 ? decoded.substring(0, idx) : decoded;
      }

      // remove any null characters
      return decoded.replace(/\0/g, '');
    }
    var len = array.length;
    var c;
    var char2;
    var char3;
    var out = '';
    var i = 0;
    while (i < len) {
      c = array[i++];
      if (c === 0x00 && exitOnNull) {
        return out;
      } else if (c === 0x00 || c === 0x03) {
        // If the character is 3 (END_OF_TEXT) or 0 (NULL) then skip it
        continue;
      }
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode((c & 0x1f) << 6 | char2 & 0x3f);
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode((c & 0x0f) << 12 | (char2 & 0x3f) << 6 | (char3 & 0x3f) << 0);
          break;
      }
    }
    return out;
  };
  var decoder;
  function getTextDecoder() {
    // On Play Station 4, TextDecoder is defined but partially implemented.
    // Manual decoding option is preferable
    if (navigator.userAgent.includes('PlayStation 4')) {
      return;
    }
    if (!decoder && typeof self.TextDecoder !== 'undefined') {
      decoder = new self.TextDecoder('utf-8');
    }
    return decoder;
  }

  /**
   *  hex dump helper class
   */

  var Hex = {
    hexDump: function hexDump(array) {
      var str = '';
      for (var i = 0; i < array.length; i++) {
        var h = array[i].toString(16);
        if (h.length < 2) {
          h = '0' + h;
        }
        str += h;
      }
      return str;
    }
  };

  var UINT32_MAX$1 = Math.pow(2, 32) - 1;
  var push = [].push;

  // We are using fixed track IDs for driving the MP4 remuxer
  // instead of following the TS PIDs.
  // There is no reason not to do this and some browsers/SourceBuffer-demuxers
  // may not like if there are TrackID "switches"
  // See https://github.com/video-dev/hls.js/issues/1331
  // Here we are mapping our internal track types to constant MP4 track IDs
  // With MSE currently one can only have one track of each, and we are muxing
  // whatever video/audio rendition in them.
  var RemuxerTrackIdConfig = {
    video: 1,
    audio: 2,
    id3: 3,
    text: 4
  };
  function bin2str(data) {
    return String.fromCharCode.apply(null, data);
  }
  function readUint16(buffer, offset) {
    var val = buffer[offset] << 8 | buffer[offset + 1];
    return val < 0 ? 65536 + val : val;
  }
  function readUint32(buffer, offset) {
    var val = readSint32(buffer, offset);
    return val < 0 ? 4294967296 + val : val;
  }
  function readUint64(buffer, offset) {
    var result = readUint32(buffer, offset);
    result *= Math.pow(2, 32);
    result += readUint32(buffer, offset + 4);
    return result;
  }
  function readSint32(buffer, offset) {
    return buffer[offset] << 24 | buffer[offset + 1] << 16 | buffer[offset + 2] << 8 | buffer[offset + 3];
  }
  function writeUint32(buffer, offset, value) {
    buffer[offset] = value >> 24;
    buffer[offset + 1] = value >> 16 & 0xff;
    buffer[offset + 2] = value >> 8 & 0xff;
    buffer[offset + 3] = value & 0xff;
  }

  // Find "moof" box
  function hasMoofData(data) {
    var end = data.byteLength;
    for (var i = 0; i < end;) {
      var size = readUint32(data, i);
      if (size > 8 && data[i + 4] === 0x6d && data[i + 5] === 0x6f && data[i + 6] === 0x6f && data[i + 7] === 0x66) {
        return true;
      }
      i = size > 1 ? i + size : end;
    }
    return false;
  }

  // Find the data for a box specified by its path
  function findBox(data, path) {
    var results = [];
    if (!path.length) {
      // short-circuit the search for empty paths
      return results;
    }
    var end = data.byteLength;
    for (var i = 0; i < end;) {
      var size = readUint32(data, i);
      var type = bin2str(data.subarray(i + 4, i + 8));
      var endbox = size > 1 ? i + size : end;
      if (type === path[0]) {
        if (path.length === 1) {
          // this is the end of the path and we've found the box we were
          // looking for
          results.push(data.subarray(i + 8, endbox));
        } else {
          // recursively search for the next box along the path
          var subresults = findBox(data.subarray(i + 8, endbox), path.slice(1));
          if (subresults.length) {
            push.apply(results, subresults);
          }
        }
      }
      i = endbox;
    }

    // we've finished searching all of data
    return results;
  }
  function parseSegmentIndex(sidx) {
    var references = [];
    var version = sidx[0];

    // set initial offset, we skip the reference ID (not needed)
    var index = 8;
    var timescale = readUint32(sidx, index);
    index += 4;
    var earliestPresentationTime = 0;
    var firstOffset = 0;
    if (version === 0) {
      earliestPresentationTime = readUint32(sidx, index);
      firstOffset = readUint32(sidx, index + 4);
      index += 8;
    } else {
      earliestPresentationTime = readUint64(sidx, index);
      firstOffset = readUint64(sidx, index + 8);
      index += 16;
    }

    // skip reserved
    index += 2;
    var startByte = sidx.length + firstOffset;
    var referencesCount = readUint16(sidx, index);
    index += 2;
    for (var i = 0; i < referencesCount; i++) {
      var referenceIndex = index;
      var referenceInfo = readUint32(sidx, referenceIndex);
      referenceIndex += 4;
      var referenceSize = referenceInfo & 0x7fffffff;
      var referenceType = (referenceInfo & 0x80000000) >>> 31;
      if (referenceType === 1) {
        logger.warn('SIDX has hierarchical references (not supported)');
        return null;
      }
      var subsegmentDuration = readUint32(sidx, referenceIndex);
      referenceIndex += 4;
      references.push({
        referenceSize: referenceSize,
        subsegmentDuration: subsegmentDuration,
        // unscaled
        info: {
          duration: subsegmentDuration / timescale,
          start: startByte,
          end: startByte + referenceSize - 1
        }
      });
      startByte += referenceSize;

      // Skipping 1 bit for |startsWithSap|, 3 bits for |sapType|, and 28 bits
      // for |sapDelta|.
      referenceIndex += 4;

      // skip to next ref
      index = referenceIndex;
    }
    return {
      earliestPresentationTime: earliestPresentationTime,
      timescale: timescale,
      version: version,
      referencesCount: referencesCount,
      references: references
    };
  }

  /**
   * Parses an MP4 initialization segment and extracts stream type and
   * timescale values for any declared tracks. Timescale values indicate the
   * number of clock ticks per second to assume for time-based values
   * elsewhere in the MP4.
   *
   * To determine the start time of an MP4, you need two pieces of
   * information: the timescale unit and the earliest base media decode
   * time. Multiple timescales can be specified within an MP4 but the
   * base media decode time is always expressed in the timescale from
   * the media header box for the track:
   * ```
   * moov > trak > mdia > mdhd.timescale
   * moov > trak > mdia > hdlr
   * ```
   * @param initSegment the bytes of the init segment
   * @returns a hash of track type to timescale values or null if
   * the init segment is malformed.
   */

  function parseInitSegment(initSegment) {
    var result = [];
    var traks = findBox(initSegment, ['moov', 'trak']);
    for (var i = 0; i < traks.length; i++) {
      var trak = traks[i];
      var tkhd = findBox(trak, ['tkhd'])[0];
      if (tkhd) {
        var version = tkhd[0];
        var trackId = readUint32(tkhd, version === 0 ? 12 : 20);
        var mdhd = findBox(trak, ['mdia', 'mdhd'])[0];
        if (mdhd) {
          version = mdhd[0];
          var timescale = readUint32(mdhd, version === 0 ? 12 : 20);
          var hdlr = findBox(trak, ['mdia', 'hdlr'])[0];
          if (hdlr) {
            var hdlrType = bin2str(hdlr.subarray(8, 12));
            var type = {
              soun: ElementaryStreamTypes.AUDIO,
              vide: ElementaryStreamTypes.VIDEO
            }[hdlrType];
            if (type) {
              // Parse codec details
              var stsd = findBox(trak, ['mdia', 'minf', 'stbl', 'stsd'])[0];
              var stsdData = parseStsd(stsd);
              result[trackId] = {
                timescale: timescale,
                type: type
              };
              result[type] = _objectSpread2({
                timescale: timescale,
                id: trackId
              }, stsdData);
            }
          }
        }
      }
    }
    var trex = findBox(initSegment, ['moov', 'mvex', 'trex']);
    trex.forEach(function (trex) {
      var trackId = readUint32(trex, 4);
      var track = result[trackId];
      if (track) {
        track.default = {
          duration: readUint32(trex, 12),
          flags: readUint32(trex, 20)
        };
      }
    });
    return result;
  }
  function parseStsd(stsd) {
    var sampleEntries = stsd.subarray(8);
    var sampleEntriesEnd = sampleEntries.subarray(8 + 78);
    var fourCC = bin2str(sampleEntries.subarray(4, 8));
    var codec = fourCC;
    var encrypted = fourCC === 'enca' || fourCC === 'encv';
    if (encrypted) {
      var encBox = findBox(sampleEntries, [fourCC])[0];
      var encBoxChildren = encBox.subarray(fourCC === 'enca' ? 28 : 78);
      var sinfs = findBox(encBoxChildren, ['sinf']);
      sinfs.forEach(function (sinf) {
        var schm = findBox(sinf, ['schm'])[0];
        if (schm) {
          var scheme = bin2str(schm.subarray(4, 8));
          if (scheme === 'cbcs' || scheme === 'cenc') {
            var frma = findBox(sinf, ['frma'])[0];
            if (frma) {
              // for encrypted content codec fourCC will be in frma
              codec = bin2str(frma);
            }
          }
        }
      });
    }
    switch (codec) {
      case 'avc1':
      case 'avc2':
      case 'avc3':
      case 'avc4':
        {
          // extract profile + compatibility + level out of avcC box
          var avcCBox = findBox(sampleEntriesEnd, ['avcC'])[0];
          codec += '.' + toHex(avcCBox[1]) + toHex(avcCBox[2]) + toHex(avcCBox[3]);
          break;
        }
      case 'mp4a':
        {
          var codecBox = findBox(sampleEntries, [fourCC])[0];
          var esdsBox = findBox(codecBox.subarray(28), ['esds'])[0];
          if (esdsBox && esdsBox.length > 12) {
            var i = 4;
            // ES Descriptor tag
            if (esdsBox[i++] !== 0x03) {
              break;
            }
            i = skipBERInteger(esdsBox, i);
            i += 2; // skip es_id;
            var flags = esdsBox[i++];
            if (flags & 0x80) {
              i += 2; // skip dependency es_id
            }
            if (flags & 0x40) {
              i += esdsBox[i++]; // skip URL
            }
            // Decoder config descriptor
            if (esdsBox[i++] !== 0x04) {
              break;
            }
            i = skipBERInteger(esdsBox, i);
            var objectType = esdsBox[i++];
            if (objectType === 0x40) {
              codec += '.' + toHex(objectType);
            } else {
              break;
            }
            i += 12;
            // Decoder specific info
            if (esdsBox[i++] !== 0x05) {
              break;
            }
            i = skipBERInteger(esdsBox, i);
            var firstByte = esdsBox[i++];
            var audioObjectType = (firstByte & 0xf8) >> 3;
            if (audioObjectType === 31) {
              audioObjectType += 1 + ((firstByte & 0x7) << 3) + ((esdsBox[i] & 0xe0) >> 5);
            }
            codec += '.' + audioObjectType;
          }
          break;
        }
      case 'hvc1':
      case 'hev1':
        {
          var hvcCBox = findBox(sampleEntriesEnd, ['hvcC'])[0];
          var profileByte = hvcCBox[1];
          var profileSpace = ['', 'A', 'B', 'C'][profileByte >> 6];
          var generalProfileIdc = profileByte & 0x1f;
          var profileCompat = readUint32(hvcCBox, 2);
          var tierFlag = (profileByte & 0x20) >> 5 ? 'H' : 'L';
          var levelIDC = hvcCBox[12];
          var constraintIndicator = hvcCBox.subarray(6, 12);
          codec += '.' + profileSpace + generalProfileIdc;
          codec += '.' + profileCompat.toString(16).toUpperCase();
          codec += '.' + tierFlag + levelIDC;
          var constraintString = '';
          for (var _i = constraintIndicator.length; _i--;) {
            var _byte = constraintIndicator[_i];
            if (_byte || constraintString) {
              var encodedByte = _byte.toString(16).toUpperCase();
              constraintString = '.' + encodedByte + constraintString;
            }
          }
          codec += constraintString;
          break;
        }
      case 'dvh1':
      case 'dvhe':
        {
          var dvcCBox = findBox(sampleEntriesEnd, ['dvcC'])[0];
          var profile = dvcCBox[2] >> 1 & 0x7f;
          var level = dvcCBox[2] << 5 & 0x20 | dvcCBox[3] >> 3 & 0x1f;
          codec += '.' + addLeadingZero(profile) + '.' + addLeadingZero(level);
          break;
        }
      case 'vp09':
        {
          var vpcCBox = findBox(sampleEntriesEnd, ['vpcC'])[0];
          var _profile = vpcCBox[4];
          var _level = vpcCBox[5];
          var bitDepth = vpcCBox[6] >> 4 & 0x0f;
          codec += '.' + addLeadingZero(_profile) + '.' + addLeadingZero(_level) + '.' + addLeadingZero(bitDepth);
          break;
        }
      case 'av01':
        {
          var av1CBox = findBox(sampleEntriesEnd, ['av1C'])[0];
          var _profile2 = av1CBox[1] >>> 5;
          var _level2 = av1CBox[1] & 0x1f;
          var _tierFlag = av1CBox[2] >>> 7 ? 'H' : 'M';
          var highBitDepth = (av1CBox[2] & 0x40) >> 6;
          var twelveBit = (av1CBox[2] & 0x20) >> 5;
          var _bitDepth = _profile2 === 2 && highBitDepth ? twelveBit ? 12 : 10 : highBitDepth ? 10 : 8;
          var monochrome = (av1CBox[2] & 0x10) >> 4;
          var chromaSubsamplingX = (av1CBox[2] & 0x08) >> 3;
          var chromaSubsamplingY = (av1CBox[2] & 0x04) >> 2;
          var chromaSamplePosition = av1CBox[2] & 0x03;
          // TODO: parse color_description_present_flag
          // default it to BT.709/limited range for now
          // more info https://aomediacodec.github.io/av1-isobmff/#av1codecconfigurationbox-syntax
          var colorPrimaries = 1;
          var transferCharacteristics = 1;
          var matrixCoefficients = 1;
          var videoFullRangeFlag = 0;
          codec += '.' + _profile2 + '.' + addLeadingZero(_level2) + _tierFlag + '.' + addLeadingZero(_bitDepth) + '.' + monochrome + '.' + chromaSubsamplingX + chromaSubsamplingY + chromaSamplePosition + '.' + addLeadingZero(colorPrimaries) + '.' + addLeadingZero(transferCharacteristics) + '.' + addLeadingZero(matrixCoefficients) + '.' + videoFullRangeFlag;
          break;
        }
    }
    return {
      codec: codec,
      encrypted: encrypted
    };
  }
  function skipBERInteger(bytes, i) {
    var limit = i + 5;
    while (bytes[i++] & 0x80 && i < limit) {}
    return i;
  }
  function toHex(x) {
    return ('0' + x.toString(16).toUpperCase()).slice(-2);
  }
  function addLeadingZero(num) {
    return (num < 10 ? '0' : '') + num;
  }
  function patchEncyptionData(initSegment, decryptdata) {
    if (!initSegment || !decryptdata) {
      return initSegment;
    }
    var keyId = decryptdata.keyId;
    if (keyId && decryptdata.isCommonEncryption) {
      var traks = findBox(initSegment, ['moov', 'trak']);
      traks.forEach(function (trak) {
        var stsd = findBox(trak, ['mdia', 'minf', 'stbl', 'stsd'])[0];

        // skip the sample entry count
        var sampleEntries = stsd.subarray(8);
        var encBoxes = findBox(sampleEntries, ['enca']);
        var isAudio = encBoxes.length > 0;
        if (!isAudio) {
          encBoxes = findBox(sampleEntries, ['encv']);
        }
        encBoxes.forEach(function (enc) {
          var encBoxChildren = isAudio ? enc.subarray(28) : enc.subarray(78);
          var sinfBoxes = findBox(encBoxChildren, ['sinf']);
          sinfBoxes.forEach(function (sinf) {
            var tenc = parseSinf(sinf);
            if (tenc) {
              // Look for default key id (keyID offset is always 8 within the tenc box):
              var tencKeyId = tenc.subarray(8, 24);
              if (!tencKeyId.some(function (b) {
                return b !== 0;
              })) {
                logger.log("[eme] Patching keyId in 'enc" + (isAudio ? 'a' : 'v') + ">sinf>>tenc' box: " + Hex.hexDump(tencKeyId) + " -> " + Hex.hexDump(keyId));
                tenc.set(keyId, 8);
              }
            }
          });
        });
      });
    }
    return initSegment;
  }
  function parseSinf(sinf) {
    var schm = findBox(sinf, ['schm'])[0];
    if (schm) {
      var scheme = bin2str(schm.subarray(4, 8));
      if (scheme === 'cbcs' || scheme === 'cenc') {
        return findBox(sinf, ['schi', 'tenc'])[0];
      }
    }
    logger.error("[eme] missing 'schm' box");
    return null;
  }

  /**
   * Determine the base media decode start time, in seconds, for an MP4
   * fragment. If multiple fragments are specified, the earliest time is
   * returned.
   *
   * The base media decode time can be parsed from track fragment
   * metadata:
   * ```
   * moof > traf > tfdt.baseMediaDecodeTime
   * ```
   * It requires the timescale value from the mdhd to interpret.
   *
   * @param initData - a hash of track type to timescale values
   * @param fmp4 - the bytes of the mp4 fragment
   * @returns the earliest base media decode start time for the
   * fragment, in seconds
   */
  function getStartDTS(initData, fmp4) {
    // we need info from two children of each track fragment box
    return findBox(fmp4, ['moof', 'traf']).reduce(function (result, traf) {
      var tfdt = findBox(traf, ['tfdt'])[0];
      var version = tfdt[0];
      var start = findBox(traf, ['tfhd']).reduce(function (result, tfhd) {
        // get the track id from the tfhd
        var id = readUint32(tfhd, 4);
        var track = initData[id];
        if (track) {
          var baseTime = readUint32(tfdt, 4);
          if (version === 1) {
            // If value is too large, assume signed 64-bit. Negative track fragment decode times are invalid, but they exist in the wild.
            // This prevents large values from being used for initPTS, which can cause playlist sync issues.
            // https://github.com/video-dev/hls.js/issues/5303
            if (baseTime === UINT32_MAX$1) {
              logger.warn("[mp4-demuxer]: Ignoring assumed invalid signed 64-bit track fragment decode time");
              return result;
            }
            baseTime *= UINT32_MAX$1 + 1;
            baseTime += readUint32(tfdt, 8);
          }
          // assume a 90kHz clock if no timescale was specified
          var scale = track.timescale || 90e3;
          // convert base time to seconds
          var startTime = baseTime / scale;
          if (isFiniteNumber(startTime) && (result === null || startTime < result)) {
            return startTime;
          }
        }
        return result;
      }, null);
      if (start !== null && isFiniteNumber(start) && (result === null || start < result)) {
        return start;
      }
      return result;
    }, null);
  }

  /*
    For Reference:
    aligned(8) class TrackFragmentHeaderBox
             extends FullBox(‘tfhd’, 0, tf_flags){
       unsigned int(32)  track_ID;
       // all the following are optional fields
       unsigned int(64)  base_data_offset;
       unsigned int(32)  sample_description_index;
       unsigned int(32)  default_sample_duration;
       unsigned int(32)  default_sample_size;
       unsigned int(32)  default_sample_flags
    }
   */
  function getDuration(data, initData) {
    var rawDuration = 0;
    var videoDuration = 0;
    var audioDuration = 0;
    var trafs = findBox(data, ['moof', 'traf']);
    for (var i = 0; i < trafs.length; i++) {
      var traf = trafs[i];
      // There is only one tfhd & trun per traf
      // This is true for CMAF style content, and we should perhaps check the ftyp
      // and only look for a single trun then, but for ISOBMFF we should check
      // for multiple track runs.
      var tfhd = findBox(traf, ['tfhd'])[0];
      // get the track id from the tfhd
      var id = readUint32(tfhd, 4);
      var track = initData[id];
      if (!track) {
        continue;
      }
      var trackDefault = track.default;
      var tfhdFlags = readUint32(tfhd, 0) | (trackDefault == null ? void 0 : trackDefault.flags);
      var sampleDuration = trackDefault == null ? void 0 : trackDefault.duration;
      if (tfhdFlags & 0x000008) {
        // 0x000008 indicates the presence of the default_sample_duration field
        if (tfhdFlags & 0x000002) {
          // 0x000002 indicates the presence of the sample_description_index field, which precedes default_sample_duration
          // If present, the default_sample_duration exists at byte offset 12
          sampleDuration = readUint32(tfhd, 12);
        } else {
          // Otherwise, the duration is at byte offset 8
          sampleDuration = readUint32(tfhd, 8);
        }
      }
      // assume a 90kHz clock if no timescale was specified
      var timescale = track.timescale || 90e3;
      var truns = findBox(traf, ['trun']);
      for (var j = 0; j < truns.length; j++) {
        rawDuration = computeRawDurationFromSamples(truns[j]);
        if (!rawDuration && sampleDuration) {
          var sampleCount = readUint32(truns[j], 4);
          rawDuration = sampleDuration * sampleCount;
        }
        if (track.type === ElementaryStreamTypes.VIDEO) {
          videoDuration += rawDuration / timescale;
        } else if (track.type === ElementaryStreamTypes.AUDIO) {
          audioDuration += rawDuration / timescale;
        }
      }
    }
    if (videoDuration === 0 && audioDuration === 0) {
      // If duration samples are not available in the traf use sidx subsegment_duration
      var sidxMinStart = Infinity;
      var sidxMaxEnd = 0;
      var sidxDuration = 0;
      var sidxs = findBox(data, ['sidx']);
      for (var _i2 = 0; _i2 < sidxs.length; _i2++) {
        var sidx = parseSegmentIndex(sidxs[_i2]);
        if (sidx != null && sidx.references) {
          sidxMinStart = Math.min(sidxMinStart, sidx.earliestPresentationTime / sidx.timescale);
          var subSegmentDuration = sidx.references.reduce(function (dur, ref) {
            return dur + ref.info.duration || 0;
          }, 0);
          sidxMaxEnd = Math.max(sidxMaxEnd, subSegmentDuration + sidx.earliestPresentationTime / sidx.timescale);
          sidxDuration = sidxMaxEnd - sidxMinStart;
        }
      }
      if (sidxDuration && isFiniteNumber(sidxDuration)) {
        return sidxDuration;
      }
    }
    if (videoDuration) {
      return videoDuration;
    }
    return audioDuration;
  }

  /*
    For Reference:
    aligned(8) class TrackRunBox
             extends FullBox(‘trun’, version, tr_flags) {
       unsigned int(32)  sample_count;
       // the following are optional fields
       signed int(32) data_offset;
       unsigned int(32)  first_sample_flags;
       // all fields in the following array are optional
       {
          unsigned int(32)  sample_duration;
          unsigned int(32)  sample_size;
          unsigned int(32)  sample_flags
          if (version == 0)
             { unsigned int(32)
          else
             { signed int(32)
       }[ sample_count ]
    }
   */
  function computeRawDurationFromSamples(trun) {
    var flags = readUint32(trun, 0);
    // Flags are at offset 0, non-optional sample_count is at offset 4. Therefore we start 8 bytes in.
    // Each field is an int32, which is 4 bytes
    var offset = 8;
    // data-offset-present flag
    if (flags & 0x000001) {
      offset += 4;
    }
    // first-sample-flags-present flag
    if (flags & 0x000004) {
      offset += 4;
    }
    var duration = 0;
    var sampleCount = readUint32(trun, 4);
    for (var i = 0; i < sampleCount; i++) {
      // sample-duration-present flag
      if (flags & 0x000100) {
        var sampleDuration = readUint32(trun, offset);
        duration += sampleDuration;
        offset += 4;
      }
      // sample-size-present flag
      if (flags & 0x000200) {
        offset += 4;
      }
      // sample-flags-present flag
      if (flags & 0x000400) {
        offset += 4;
      }
      // sample-composition-time-offsets-present flag
      if (flags & 0x000800) {
        offset += 4;
      }
    }
    return duration;
  }
  function offsetStartDTS(initData, fmp4, timeOffset) {
    findBox(fmp4, ['moof', 'traf']).forEach(function (traf) {
      findBox(traf, ['tfhd']).forEach(function (tfhd) {
        // get the track id from the tfhd
        var id = readUint32(tfhd, 4);
        var track = initData[id];
        if (!track) {
          return;
        }
        // assume a 90kHz clock if no timescale was specified
        var timescale = track.timescale || 90e3;
        // get the base media decode time from the tfdt
        findBox(traf, ['tfdt']).forEach(function (tfdt) {
          var version = tfdt[0];
          var offset = timeOffset * timescale;
          if (offset) {
            var baseMediaDecodeTime = readUint32(tfdt, 4);
            if (version === 0) {
              baseMediaDecodeTime -= offset;
              baseMediaDecodeTime = Math.max(baseMediaDecodeTime, 0);
              writeUint32(tfdt, 4, baseMediaDecodeTime);
            } else {
              baseMediaDecodeTime *= Math.pow(2, 32);
              baseMediaDecodeTime += readUint32(tfdt, 8);
              baseMediaDecodeTime -= offset;
              baseMediaDecodeTime = Math.max(baseMediaDecodeTime, 0);
              var upper = Math.floor(baseMediaDecodeTime / (UINT32_MAX$1 + 1));
              var lower = Math.floor(baseMediaDecodeTime % (UINT32_MAX$1 + 1));
              writeUint32(tfdt, 4, upper);
              writeUint32(tfdt, 8, lower);
            }
          }
        });
      });
    });
  }

  // TODO: Check if the last moof+mdat pair is part of the valid range
  function segmentValidRange(data) {
    var segmentedRange = {
      valid: null,
      remainder: null
    };
    var moofs = findBox(data, ['moof']);
    if (moofs.length < 2) {
      segmentedRange.remainder = data;
      return segmentedRange;
    }
    var last = moofs[moofs.length - 1];
    // Offset by 8 bytes; findBox offsets the start by as much
    segmentedRange.valid = sliceUint8(data, 0, last.byteOffset - 8);
    segmentedRange.remainder = sliceUint8(data, last.byteOffset - 8);
    return segmentedRange;
  }
  function appendUint8Array(data1, data2) {
    var temp = new Uint8Array(data1.length + data2.length);
    temp.set(data1);
    temp.set(data2, data1.length);
    return temp;
  }
  function parseSamples(timeOffset, track) {
    var seiSamples = [];
    var videoData = track.samples;
    var timescale = track.timescale;
    var trackId = track.id;
    var isHEVCFlavor = false;
    var moofs = findBox(videoData, ['moof']);
    moofs.map(function (moof) {
      var moofOffset = moof.byteOffset - 8;
      var trafs = findBox(moof, ['traf']);
      trafs.map(function (traf) {
        // get the base media decode time from the tfdt
        var baseTime = findBox(traf, ['tfdt']).map(function (tfdt) {
          var version = tfdt[0];
          var result = readUint32(tfdt, 4);
          if (version === 1) {
            result *= Math.pow(2, 32);
            result += readUint32(tfdt, 8);
          }
          return result / timescale;
        })[0];
        if (baseTime !== undefined) {
          timeOffset = baseTime;
        }
        return findBox(traf, ['tfhd']).map(function (tfhd) {
          var id = readUint32(tfhd, 4);
          var tfhdFlags = readUint32(tfhd, 0) & 0xffffff;
          var baseDataOffsetPresent = (tfhdFlags & 0x000001) !== 0;
          var sampleDescriptionIndexPresent = (tfhdFlags & 0x000002) !== 0;
          var defaultSampleDurationPresent = (tfhdFlags & 0x000008) !== 0;
          var defaultSampleDuration = 0;
          var defaultSampleSizePresent = (tfhdFlags & 0x000010) !== 0;
          var defaultSampleSize = 0;
          var defaultSampleFlagsPresent = (tfhdFlags & 0x000020) !== 0;
          var tfhdOffset = 8;
          if (id === trackId) {
            if (baseDataOffsetPresent) {
              tfhdOffset += 8;
            }
            if (sampleDescriptionIndexPresent) {
              tfhdOffset += 4;
            }
            if (defaultSampleDurationPresent) {
              defaultSampleDuration = readUint32(tfhd, tfhdOffset);
              tfhdOffset += 4;
            }
            if (defaultSampleSizePresent) {
              defaultSampleSize = readUint32(tfhd, tfhdOffset);
              tfhdOffset += 4;
            }
            if (defaultSampleFlagsPresent) {
              tfhdOffset += 4;
            }
            if (track.type === 'video') {
              isHEVCFlavor = isHEVC(track.codec);
            }
            findBox(traf, ['trun']).map(function (trun) {
              var version = trun[0];
              var flags = readUint32(trun, 0) & 0xffffff;
              var dataOffsetPresent = (flags & 0x000001) !== 0;
              var dataOffset = 0;
              var firstSampleFlagsPresent = (flags & 0x000004) !== 0;
              var sampleDurationPresent = (flags & 0x000100) !== 0;
              var sampleDuration = 0;
              var sampleSizePresent = (flags & 0x000200) !== 0;
              var sampleSize = 0;
              var sampleFlagsPresent = (flags & 0x000400) !== 0;
              var sampleCompositionOffsetsPresent = (flags & 0x000800) !== 0;
              var compositionOffset = 0;
              var sampleCount = readUint32(trun, 4);
              var trunOffset = 8; // past version, flags, and sample count

              if (dataOffsetPresent) {
                dataOffset = readUint32(trun, trunOffset);
                trunOffset += 4;
              }
              if (firstSampleFlagsPresent) {
                trunOffset += 4;
              }
              var sampleOffset = dataOffset + moofOffset;
              for (var ix = 0; ix < sampleCount; ix++) {
                if (sampleDurationPresent) {
                  sampleDuration = readUint32(trun, trunOffset);
                  trunOffset += 4;
                } else {
                  sampleDuration = defaultSampleDuration;
                }
                if (sampleSizePresent) {
                  sampleSize = readUint32(trun, trunOffset);
                  trunOffset += 4;
                } else {
                  sampleSize = defaultSampleSize;
                }
                if (sampleFlagsPresent) {
                  trunOffset += 4;
                }
                if (sampleCompositionOffsetsPresent) {
                  if (version === 0) {
                    compositionOffset = readUint32(trun, trunOffset);
                  } else {
                    compositionOffset = readSint32(trun, trunOffset);
                  }
                  trunOffset += 4;
                }
                if (track.type === ElementaryStreamTypes.VIDEO) {
                  var naluTotalSize = 0;
                  while (naluTotalSize < sampleSize) {
                    var naluSize = readUint32(videoData, sampleOffset);
                    sampleOffset += 4;
                    if (isSEIMessage(isHEVCFlavor, videoData[sampleOffset])) {
                      var data = videoData.subarray(sampleOffset, sampleOffset + naluSize);
                      parseSEIMessageFromNALu(data, isHEVCFlavor ? 2 : 1, timeOffset + compositionOffset / timescale, seiSamples);
                    }
                    sampleOffset += naluSize;
                    naluTotalSize += naluSize + 4;
                  }
                }
                timeOffset += sampleDuration / timescale;
              }
            });
          }
        });
      });
    });
    return seiSamples;
  }
  function isHEVC(codec) {
    if (!codec) {
      return false;
    }
    var delimit = codec.indexOf('.');
    var baseCodec = delimit < 0 ? codec : codec.substring(0, delimit);
    return baseCodec === 'hvc1' || baseCodec === 'hev1' ||
    // Dolby Vision
    baseCodec === 'dvh1' || baseCodec === 'dvhe';
  }
  function isSEIMessage(isHEVCFlavor, naluHeader) {
    if (isHEVCFlavor) {
      var naluType = naluHeader >> 1 & 0x3f;
      return naluType === 39 || naluType === 40;
    } else {
      var _naluType = naluHeader & 0x1f;
      return _naluType === 6;
    }
  }
  function parseSEIMessageFromNALu(unescapedData, headerSize, pts, samples) {
    var data = discardEPB(unescapedData);
    var seiPtr = 0;
    // skip nal header
    seiPtr += headerSize;
    var payloadType = 0;
    var payloadSize = 0;
    var b = 0;
    while (seiPtr < data.length) {
      payloadType = 0;
      do {
        if (seiPtr >= data.length) {
          break;
        }
        b = data[seiPtr++];
        payloadType += b;
      } while (b === 0xff);

      // Parse payload size.
      payloadSize = 0;
      do {
        if (seiPtr >= data.length) {
          break;
        }
        b = data[seiPtr++];
        payloadSize += b;
      } while (b === 0xff);
      var leftOver = data.length - seiPtr;
      // Create a variable to process the payload
      var payPtr = seiPtr;

      // Increment the seiPtr to the end of the payload
      if (payloadSize < leftOver) {
        seiPtr += payloadSize;
      } else if (payloadSize > leftOver) {
        // Some type of corruption has happened?
        logger.error("Malformed SEI payload. " + payloadSize + " is too small, only " + leftOver + " bytes left to parse.");
        // We might be able to parse some data, but let's be safe and ignore it.
        break;
      }
      if (payloadType === 4) {
        var countryCode = data[payPtr++];
        if (countryCode === 181) {
          var providerCode = readUint16(data, payPtr);
          payPtr += 2;
          if (providerCode === 49) {
            var userStructure = readUint32(data, payPtr);
            payPtr += 4;
            if (userStructure === 0x47413934) {
              var userDataType = data[payPtr++];

              // Raw CEA-608 bytes wrapped in CEA-708 packet
              if (userDataType === 3) {
                var firstByte = data[payPtr++];
                var totalCCs = 0x1f & firstByte;
                var enabled = 0x40 & firstByte;
                var totalBytes = enabled ? 2 + totalCCs * 3 : 0;
                var byteArray = new Uint8Array(totalBytes);
                if (enabled) {
                  byteArray[0] = firstByte;
                  for (var i = 1; i < totalBytes; i++) {
                    byteArray[i] = data[payPtr++];
                  }
                }
                samples.push({
                  type: userDataType,
                  payloadType: payloadType,
                  pts: pts,
                  bytes: byteArray
                });
              }
            }
          }
        }
      } else if (payloadType === 5) {
        if (payloadSize > 16) {
          var uuidStrArray = [];
          for (var _i3 = 0; _i3 < 16; _i3++) {
            var _b = data[payPtr++].toString(16);
            uuidStrArray.push(_b.length == 1 ? '0' + _b : _b);
            if (_i3 === 3 || _i3 === 5 || _i3 === 7 || _i3 === 9) {
              uuidStrArray.push('-');
            }
          }
          var length = payloadSize - 16;
          var userDataBytes = new Uint8Array(length);
          for (var _i4 = 0; _i4 < length; _i4++) {
            userDataBytes[_i4] = data[payPtr++];
          }
          samples.push({
            payloadType: payloadType,
            pts: pts,
            uuid: uuidStrArray.join(''),
            userData: utf8ArrayToStr(userDataBytes),
            userDataBytes: userDataBytes
          });
        }
      }
    }
  }

  /**
   * remove Emulation Prevention bytes from a RBSP
   */
  function discardEPB(data) {
    var length = data.byteLength;
    var EPBPositions = [];
    var i = 1;

    // Find all `Emulation Prevention Bytes`
    while (i < length - 2) {
      if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
        EPBPositions.push(i + 2);
        i += 2;
      } else {
        i++;
      }
    }

    // If no Emulation Prevention Bytes were found just return the original
    // array
    if (EPBPositions.length === 0) {
      return data;
    }

    // Create a new array to hold the NAL unit data
    var newLength = length - EPBPositions.length;
    var newData = new Uint8Array(newLength);
    var sourceIndex = 0;
    for (i = 0; i < newLength; sourceIndex++, i++) {
      if (sourceIndex === EPBPositions[0]) {
        // Skip this byte
        sourceIndex++;
        // Remove this position index
        EPBPositions.shift();
      }
      newData[i] = data[sourceIndex];
    }
    return newData;
  }
  function parseEmsg(data) {
    var version = data[0];
    var schemeIdUri = '';
    var value = '';
    var timeScale = 0;
    var presentationTimeDelta = 0;
    var presentationTime = 0;
    var eventDuration = 0;
    var id = 0;
    var offset = 0;
    if (version === 0) {
      while (bin2str(data.subarray(offset, offset + 1)) !== '\0') {
        schemeIdUri += bin2str(data.subarray(offset, offset + 1));
        offset += 1;
      }
      schemeIdUri += bin2str(data.subarray(offset, offset + 1));
      offset += 1;
      while (bin2str(data.subarray(offset, offset + 1)) !== '\0') {
        value += bin2str(data.subarray(offset, offset + 1));
        offset += 1;
      }
      value += bin2str(data.subarray(offset, offset + 1));
      offset += 1;
      timeScale = readUint32(data, 12);
      presentationTimeDelta = readUint32(data, 16);
      eventDuration = readUint32(data, 20);
      id = readUint32(data, 24);
      offset = 28;
    } else if (version === 1) {
      offset += 4;
      timeScale = readUint32(data, offset);
      offset += 4;
      var leftPresentationTime = readUint32(data, offset);
      offset += 4;
      var rightPresentationTime = readUint32(data, offset);
      offset += 4;
      presentationTime = Math.pow(2, 32) * leftPresentationTime + rightPresentationTime;
      if (!isSafeInteger(presentationTime)) {
        presentationTime = Number.MAX_SAFE_INTEGER;
        logger.warn('Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box');
      }
      eventDuration = readUint32(data, offset);
      offset += 4;
      id = readUint32(data, offset);
      offset += 4;
      while (bin2str(data.subarray(offset, offset + 1)) !== '\0') {
        schemeIdUri += bin2str(data.subarray(offset, offset + 1));
        offset += 1;
      }
      schemeIdUri += bin2str(data.subarray(offset, offset + 1));
      offset += 1;
      while (bin2str(data.subarray(offset, offset + 1)) !== '\0') {
        value += bin2str(data.subarray(offset, offset + 1));
        offset += 1;
      }
      value += bin2str(data.subarray(offset, offset + 1));
      offset += 1;
    }
    var payload = data.subarray(offset, data.byteLength);
    return {
      schemeIdUri: schemeIdUri,
      value: value,
      timeScale: timeScale,
      presentationTime: presentationTime,
      presentationTimeDelta: presentationTimeDelta,
      eventDuration: eventDuration,
      id: id,
      payload: payload
    };
  }

  var LevelKey = /*#__PURE__*/function () {
    LevelKey.clearKeyUriToKeyIdMap = function clearKeyUriToKeyIdMap() {
    };
    function LevelKey(method, uri, format, formatversions, iv) {
      if (formatversions === void 0) {
        formatversions = [1];
      }
      if (iv === void 0) {
        iv = null;
      }
      this.uri = void 0;
      this.method = void 0;
      this.keyFormat = void 0;
      this.keyFormatVersions = void 0;
      this.encrypted = void 0;
      this.isCommonEncryption = void 0;
      this.iv = null;
      this.key = null;
      this.keyId = null;
      this.pssh = null;
      this.method = method;
      this.uri = uri;
      this.keyFormat = format;
      this.keyFormatVersions = formatversions;
      this.iv = iv;
      this.encrypted = method ? method !== 'NONE' : false;
      this.isCommonEncryption = this.encrypted && method !== 'AES-128';
    }
    var _proto = LevelKey.prototype;
    _proto.isSupported = function isSupported() {
      // If it's Segment encryption or No encryption, just select that key system
      if (this.method) {
        if (this.method === 'AES-128' || this.method === 'NONE') {
          return true;
        }
        if (this.keyFormat === 'identity') {
          // Maintain support for clear SAMPLE-AES with MPEG-3 TS
          return this.method === 'SAMPLE-AES';
        }
      }
      return false;
    };
    _proto.getDecryptData = function getDecryptData(sn) {
      if (!this.encrypted || !this.uri) {
        return null;
      }
      if (this.method === 'AES-128' && this.uri && !this.iv) {
        if (typeof sn !== 'number') {
          // We are fetching decryption data for a initialization segment
          // If the segment was encrypted with AES-128
          // It must have an IV defined. We cannot substitute the Segment Number in.
          if (this.method === 'AES-128' && !this.iv) {
            logger.warn("missing IV for initialization segment with method=\"" + this.method + "\" - compliance issue");
          }
          // Explicitly set sn to resulting value from implicit conversions 'initSegment' values for IV generation.
          sn = 0;
        }
        var iv = createInitializationVector(sn);
        var decryptdata = new LevelKey(this.method, this.uri, 'identity', this.keyFormatVersions, iv);
        return decryptdata;
      }
      {
        return this;
      }
    };
    return LevelKey;
  }();
  function createInitializationVector(segmentNumber) {
    var uint8View = new Uint8Array(16);
    for (var i = 12; i < 16; i++) {
      uint8View[i] = segmentNumber >> 8 * (15 - i) & 0xff;
    }
    return uint8View;
  }

  /**
   * MediaSource helper
   */

  function getMediaSource(preferManagedMediaSource) {
    if (preferManagedMediaSource === void 0) {
      preferManagedMediaSource = true;
    }
    if (typeof self === 'undefined') return undefined;
    var mms = (preferManagedMediaSource || !self.MediaSource) && self.ManagedMediaSource;
    return mms || self.MediaSource || self.WebKitMediaSource;
  }
  function isManagedMediaSource(source) {
    return typeof self !== 'undefined' && source === self.ManagedMediaSource;
  }

  // from http://mp4ra.org/codecs.html
  // values indicate codec selection preference (lower is higher priority)
  var sampleEntryCodesISO = {
    audio: {
      a3ds: 1,
      'ac-3': 0.95,
      'ac-4': 1,
      alac: 0.9,
      alaw: 1,
      dra1: 1,
      'dts+': 1,
      'dts-': 1,
      dtsc: 1,
      dtse: 1,
      dtsh: 1,
      'ec-3': 0.9,
      enca: 1,
      fLaC: 0.9,
      // MP4-RA listed codec entry for FLAC
      flac: 0.9,
      // legacy browser codec name for FLAC
      FLAC: 0.9,
      // some manifests may list "FLAC" with Apple's tools
      g719: 1,
      g726: 1,
      m4ae: 1,
      mha1: 1,
      mha2: 1,
      mhm1: 1,
      mhm2: 1,
      mlpa: 1,
      mp4a: 1,
      'raw ': 1,
      Opus: 1,
      opus: 1,
      // browsers expect this to be lowercase despite MP4RA says 'Opus'
      samr: 1,
      sawb: 1,
      sawp: 1,
      sevc: 1,
      sqcp: 1,
      ssmv: 1,
      twos: 1,
      ulaw: 1
    },
    video: {
      avc1: 1,
      avc2: 1,
      avc3: 1,
      avc4: 1,
      avcp: 1,
      av01: 0.8,
      drac: 1,
      dva1: 1,
      dvav: 1,
      dvh1: 0.7,
      dvhe: 0.7,
      encv: 1,
      hev1: 0.75,
      hvc1: 0.75,
      mjp2: 1,
      mp4v: 1,
      mvc1: 1,
      mvc2: 1,
      mvc3: 1,
      mvc4: 1,
      resv: 1,
      rv60: 1,
      s263: 1,
      svc1: 1,
      svc2: 1,
      'vc-1': 1,
      vp08: 1,
      vp09: 0.9
    },
    text: {
      stpp: 1,
      wvtt: 1
    }
  };
  function isCodecType(codec, type) {
    var typeCodes = sampleEntryCodesISO[type];
    return !!typeCodes && !!typeCodes[codec.slice(0, 4)];
  }
  function areCodecsMediaSourceSupported(codecs, type, preferManagedMediaSource) {
    if (preferManagedMediaSource === void 0) {
      preferManagedMediaSource = true;
    }
    return !codecs.split(',').some(function (codec) {
      return !isCodecMediaSourceSupported(codec, type, preferManagedMediaSource);
    });
  }
  function isCodecMediaSourceSupported(codec, type, preferManagedMediaSource) {
    var _MediaSource$isTypeSu;
    if (preferManagedMediaSource === void 0) {
      preferManagedMediaSource = true;
    }
    var MediaSource = getMediaSource(preferManagedMediaSource);
    return (_MediaSource$isTypeSu = MediaSource == null ? void 0 : MediaSource.isTypeSupported(mimeTypeForCodec(codec, type))) != null ? _MediaSource$isTypeSu : false;
  }
  function mimeTypeForCodec(codec, type) {
    return type + "/mp4;codecs=\"" + codec + "\"";
  }
  function videoCodecPreferenceValue(videoCodec) {
    if (videoCodec) {
      var fourCC = videoCodec.substring(0, 4);
      return sampleEntryCodesISO.video[fourCC];
    }
    return 2;
  }
  function codecsSetSelectionPreferenceValue(codecSet) {
    return codecSet.split(',').reduce(function (num, fourCC) {
      var preferenceValue = sampleEntryCodesISO.video[fourCC];
      if (preferenceValue) {
        return (preferenceValue * 2 + num) / (num ? 3 : 2);
      }
      return (sampleEntryCodesISO.audio[fourCC] + num) / (num ? 2 : 1);
    }, 0);
  }
  var CODEC_COMPATIBLE_NAMES = {};
  function getCodecCompatibleNameLower(lowerCaseCodec, preferManagedMediaSource) {
    if (preferManagedMediaSource === void 0) {
      preferManagedMediaSource = true;
    }
    if (CODEC_COMPATIBLE_NAMES[lowerCaseCodec]) {
      return CODEC_COMPATIBLE_NAMES[lowerCaseCodec];
    }

    // Idealy fLaC and Opus would be first (spec-compliant) but
    // some browsers will report that fLaC is supported then fail.
    // see: https://bugs.chromium.org/p/chromium/issues/detail?id=1422728
    var codecsToCheck = {
      flac: ['flac', 'fLaC', 'FLAC'],
      opus: ['opus', 'Opus']
    }[lowerCaseCodec];
    for (var i = 0; i < codecsToCheck.length; i++) {
      if (isCodecMediaSourceSupported(codecsToCheck[i], 'audio', preferManagedMediaSource)) {
        CODEC_COMPATIBLE_NAMES[lowerCaseCodec] = codecsToCheck[i];
        return codecsToCheck[i];
      }
    }
    return lowerCaseCodec;
  }
  var AUDIO_CODEC_REGEXP = /flac|opus/i;
  function getCodecCompatibleName(codec, preferManagedMediaSource) {
    if (preferManagedMediaSource === void 0) {
      preferManagedMediaSource = true;
    }
    return codec.replace(AUDIO_CODEC_REGEXP, function (m) {
      return getCodecCompatibleNameLower(m.toLowerCase(), preferManagedMediaSource);
    });
  }
  function pickMostCompleteCodecName(parsedCodec, levelCodec) {
    // Parsing of mp4a codecs strings in mp4-tools from media is incomplete as of d8c6c7a
    // so use level codec is parsed codec is unavailable or incomplete
    if (parsedCodec && parsedCodec !== 'mp4a') {
      return parsedCodec;
    }
    return levelCodec ? levelCodec.split(',')[0] : levelCodec;
  }
  function convertAVC1ToAVCOTI(codec) {
    // Convert avc1 codec string from RFC-4281 to RFC-6381 for MediaSource.isTypeSupported
    var avcdata = codec.split('.');
    if (avcdata.length > 2) {
      var result = avcdata.shift() + '.';
      result += parseInt(avcdata.shift()).toString(16);
      result += ('000' + parseInt(avcdata.shift()).toString(16)).slice(-4);
      return result;
    }
    return codec;
  }

  var MASTER_PLAYLIST_REGEX = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-(SESSION-DATA|SESSION-KEY|DEFINE|CONTENT-STEERING|START):([^\r\n]*)[\r\n]+/g;
  var MASTER_PLAYLIST_MEDIA_REGEX = /#EXT-X-MEDIA:(.*)/g;
  var IS_MEDIA_PLAYLIST = /^#EXT(?:INF|-X-TARGETDURATION):/m; // Handle empty Media Playlist (first EXTINF not signaled, but TARGETDURATION present)

  var LEVEL_PLAYLIST_REGEX_FAST = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
  // duration (#EXTINF:<duration>,<title>), group 1 => duration, group 2 => title
  /(?!#) *(\S[\S ]*)/.source,
  // segment URI, group 3 => the URI (note newline is not eaten)
  /#EXT-X-BYTERANGE:*(.+)/.source,
  // next segment's byterange, group 4 => range spec (x@y)
  /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
  // next segment's program date/time group 5 => the datetime spec
  /#.*/.source // All other non-segment oriented tags will match with all groups empty
  ].join('|'), 'g');
  var LEVEL_PLAYLIST_REGEX_SLOW = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(DATERANGE|DEFINE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source, /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source, /#EXT-X-(DISCONTINUITY|ENDLIST|GAP|INDEPENDENT-SEGMENTS)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join('|'));
  var M3U8Parser = /*#__PURE__*/function () {
    function M3U8Parser() {}
    M3U8Parser.findGroup = function findGroup(groups, mediaGroupId) {
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        if (group.id === mediaGroupId) {
          return group;
        }
      }
    };
    M3U8Parser.resolve = function resolve(url, baseUrl) {
      return urlToolkitExports.buildAbsoluteURL(baseUrl, url, {
        alwaysNormalize: true
      });
    };
    M3U8Parser.isMediaPlaylist = function isMediaPlaylist(str) {
      return IS_MEDIA_PLAYLIST.test(str);
    };
    M3U8Parser.parseMasterPlaylist = function parseMasterPlaylist(string, baseurl) {
      var hasVariableRefs = false;
      var parsed = {
        contentSteering: null,
        levels: [],
        playlistParsingError: null,
        sessionData: null,
        sessionKeys: null,
        startTimeOffset: null,
        variableList: null,
        hasVariableRefs: hasVariableRefs
      };
      var levelsWithKnownCodecs = [];
      MASTER_PLAYLIST_REGEX.lastIndex = 0;
      var result;
      while ((result = MASTER_PLAYLIST_REGEX.exec(string)) != null) {
        if (result[1]) {
          var _level$unknownCodecs;
          // '#EXT-X-STREAM-INF' is found, parse level tag  in group 1
          var attrs = new AttrList(result[1]);
          var uri = result[2];
          var level = {
            attrs: attrs,
            bitrate: attrs.decimalInteger('BANDWIDTH') || attrs.decimalInteger('AVERAGE-BANDWIDTH'),
            name: attrs.NAME,
            url: M3U8Parser.resolve(uri, baseurl)
          };
          var resolution = attrs.decimalResolution('RESOLUTION');
          if (resolution) {
            level.width = resolution.width;
            level.height = resolution.height;
          }
          setCodecs(attrs.CODECS, level);
          if (!((_level$unknownCodecs = level.unknownCodecs) != null && _level$unknownCodecs.length)) {
            levelsWithKnownCodecs.push(level);
          }
          parsed.levels.push(level);
        } else if (result[3]) {
          var tag = result[3];
          var attributes = result[4];
          switch (tag) {
            case 'SESSION-DATA':
              {
                // #EXT-X-SESSION-DATA
                var sessionAttrs = new AttrList(attributes);
                var dataId = sessionAttrs['DATA-ID'];
                if (dataId) {
                  if (parsed.sessionData === null) {
                    parsed.sessionData = {};
                  }
                  parsed.sessionData[dataId] = sessionAttrs;
                }
                break;
              }
            case 'SESSION-KEY':
              {
                // #EXT-X-SESSION-KEY
                var sessionKey = parseKey(attributes, baseurl);
                if (sessionKey.encrypted && sessionKey.isSupported()) {
                  if (parsed.sessionKeys === null) {
                    parsed.sessionKeys = [];
                  }
                  parsed.sessionKeys.push(sessionKey);
                } else {
                  logger.warn("[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: \"" + attributes + "\"");
                }
                break;
              }
            case 'DEFINE':
              {
                break;
              }
            case 'CONTENT-STEERING':
              {
                // #EXT-X-CONTENT-STEERING
                var contentSteeringAttributes = new AttrList(attributes);
                parsed.contentSteering = {
                  uri: M3U8Parser.resolve(contentSteeringAttributes['SERVER-URI'], baseurl),
                  pathwayId: contentSteeringAttributes['PATHWAY-ID'] || '.'
                };
                break;
              }
            case 'START':
              {
                // #EXT-X-START
                parsed.startTimeOffset = parseStartTimeOffset(attributes);
                break;
              }
          }
        }
      }
      // Filter out levels with unknown codecs if it does not remove all levels
      var stripUnknownCodecLevels = levelsWithKnownCodecs.length > 0 && levelsWithKnownCodecs.length < parsed.levels.length;
      parsed.levels = stripUnknownCodecLevels ? levelsWithKnownCodecs : parsed.levels;
      if (parsed.levels.length === 0) {
        parsed.playlistParsingError = new Error('no levels found in manifest');
      }
      return parsed;
    };
    M3U8Parser.parseMasterPlaylistMedia = function parseMasterPlaylistMedia(string, baseurl, parsed) {
      var result;
      var results = {};
      var levels = parsed.levels;
      var groupsByType = {
        AUDIO: levels.map(function (level) {
          return {
            id: level.attrs.AUDIO,
            audioCodec: level.audioCodec
          };
        }),
        SUBTITLES: levels.map(function (level) {
          return {
            id: level.attrs.SUBTITLES,
            textCodec: level.textCodec
          };
        }),
        'CLOSED-CAPTIONS': []
      };
      var id = 0;
      MASTER_PLAYLIST_MEDIA_REGEX.lastIndex = 0;
      while ((result = MASTER_PLAYLIST_MEDIA_REGEX.exec(string)) !== null) {
        var attrs = new AttrList(result[1]);
        var type = attrs.TYPE;
        if (type) {
          var groups = groupsByType[type];
          var medias = results[type] || [];
          results[type] = medias;
          var lang = attrs.LANGUAGE;
          var assocLang = attrs['ASSOC-LANGUAGE'];
          var channels = attrs.CHANNELS;
          var characteristics = attrs.CHARACTERISTICS;
          var instreamId = attrs['INSTREAM-ID'];
          var media = {
            attrs: attrs,
            bitrate: 0,
            id: id++,
            groupId: attrs['GROUP-ID'] || '',
            name: attrs.NAME || lang || '',
            type: type,
            default: attrs.bool('DEFAULT'),
            autoselect: attrs.bool('AUTOSELECT'),
            forced: attrs.bool('FORCED'),
            lang: lang,
            url: attrs.URI ? M3U8Parser.resolve(attrs.URI, baseurl) : ''
          };
          if (assocLang) {
            media.assocLang = assocLang;
          }
          if (channels) {
            media.channels = channels;
          }
          if (characteristics) {
            media.characteristics = characteristics;
          }
          if (instreamId) {
            media.instreamId = instreamId;
          }
          if (groups != null && groups.length) {
            // If there are audio or text groups signalled in the manifest, let's look for a matching codec string for this track
            // If we don't find the track signalled, lets use the first audio groups codec we have
            // Acting as a best guess
            var groupCodec = M3U8Parser.findGroup(groups, media.groupId) || groups[0];
            assignCodec(media, groupCodec, 'audioCodec');
            assignCodec(media, groupCodec, 'textCodec');
          }
          medias.push(media);
        }
      }
      return results;
    };
    M3U8Parser.parseLevelPlaylist = function parseLevelPlaylist(string, baseurl, id, type, levelUrlId, multivariantVariableList) {
      var level = new LevelDetails(baseurl);
      var fragments = level.fragments;
      // The most recent init segment seen (applies to all subsequent segments)
      var currentInitSegment = null;
      var currentSN = 0;
      var currentPart = 0;
      var totalduration = 0;
      var discontinuityCounter = 0;
      var prevFrag = null;
      var frag = new Fragment(type, baseurl);
      var result;
      var i;
      var levelkeys;
      var firstPdtIndex = -1;
      var createNextFrag = false;
      var nextByteRange = null;
      LEVEL_PLAYLIST_REGEX_FAST.lastIndex = 0;
      level.m3u8 = string;
      level.hasVariableRefs = false;
      while ((result = LEVEL_PLAYLIST_REGEX_FAST.exec(string)) !== null) {
        if (createNextFrag) {
          createNextFrag = false;
          frag = new Fragment(type, baseurl);
          // setup the next fragment for part loading
          frag.start = totalduration;
          frag.sn = currentSN;
          frag.cc = discontinuityCounter;
          frag.level = id;
          if (currentInitSegment) {
            frag.initSegment = currentInitSegment;
            frag.rawProgramDateTime = currentInitSegment.rawProgramDateTime;
            currentInitSegment.rawProgramDateTime = null;
            if (nextByteRange) {
              frag.setByteRange(nextByteRange);
              nextByteRange = null;
            }
          }
        }
        var duration = result[1];
        if (duration) {
          // INF
          frag.duration = parseFloat(duration);
          // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939
          var title = (' ' + result[2]).slice(1);
          frag.title = title || null;
          frag.tagList.push(title ? ['INF', duration, title] : ['INF', duration]);
        } else if (result[3]) {
          // url
          if (isFiniteNumber(frag.duration)) {
            frag.start = totalduration;
            if (levelkeys) {
              setFragLevelKeys(frag, levelkeys, level);
            }
            frag.sn = currentSN;
            frag.level = id;
            frag.cc = discontinuityCounter;
            fragments.push(frag);
            // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939
            var uri = (' ' + result[3]).slice(1);
            frag.relurl = uri;
            assignProgramDateTime(frag, prevFrag);
            prevFrag = frag;
            totalduration += frag.duration;
            currentSN++;
            currentPart = 0;
            createNextFrag = true;
          }
        } else if (result[4]) {
          // X-BYTERANGE
          var data = (' ' + result[4]).slice(1);
          if (prevFrag) {
            frag.setByteRange(data, prevFrag);
          } else {
            frag.setByteRange(data);
          }
        } else if (result[5]) {
          // PROGRAM-DATE-TIME
          // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939
          frag.rawProgramDateTime = (' ' + result[5]).slice(1);
          frag.tagList.push(['PROGRAM-DATE-TIME', frag.rawProgramDateTime]);
          if (firstPdtIndex === -1) {
            firstPdtIndex = fragments.length;
          }
        } else {
          result = result[0].match(LEVEL_PLAYLIST_REGEX_SLOW);
          if (!result) {
            logger.warn('No matches on slow regex match for level playlist!');
            continue;
          }
          for (i = 1; i < result.length; i++) {
            if (typeof result[i] !== 'undefined') {
              break;
            }
          }

          // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939
          var tag = (' ' + result[i]).slice(1);
          var value1 = (' ' + result[i + 1]).slice(1);
          var value2 = result[i + 2] ? (' ' + result[i + 2]).slice(1) : '';
          switch (tag) {
            case 'PLAYLIST-TYPE':
              level.type = value1.toUpperCase();
              break;
            case 'MEDIA-SEQUENCE':
              currentSN = level.startSN = parseInt(value1);
              break;
            case 'SKIP':
              {
                var skipAttrs = new AttrList(value1);
                var skippedSegments = skipAttrs.decimalInteger('SKIPPED-SEGMENTS');
                if (isFiniteNumber(skippedSegments)) {
                  level.skippedSegments = skippedSegments;
                  // This will result in fragments[] containing undefined values, which we will fill in with `mergeDetails`
                  for (var _i = skippedSegments; _i--;) {
                    fragments.unshift(null);
                  }
                  currentSN += skippedSegments;
                }
                var recentlyRemovedDateranges = skipAttrs.enumeratedString('RECENTLY-REMOVED-DATERANGES');
                if (recentlyRemovedDateranges) {
                  level.recentlyRemovedDateranges = recentlyRemovedDateranges.split('\t');
                }
                break;
              }
            case 'TARGETDURATION':
              level.targetduration = Math.max(parseInt(value1), 1);
              break;
            case 'VERSION':
              level.version = parseInt(value1);
              break;
            case 'INDEPENDENT-SEGMENTS':
            case 'EXTM3U':
              break;
            case 'ENDLIST':
              level.live = false;
              break;
            case '#':
              if (value1 || value2) {
                frag.tagList.push(value2 ? [value1, value2] : [value1]);
              }
              break;
            case 'DISCONTINUITY':
              discontinuityCounter++;
              frag.tagList.push(['DIS']);
              break;
            case 'GAP':
              frag.gap = true;
              frag.tagList.push([tag]);
              break;
            case 'BITRATE':
              frag.tagList.push([tag, value1]);
              break;
            case 'DATERANGE':
              {
                var dateRangeAttr = new AttrList(value1);
                var dateRange = new DateRange(dateRangeAttr, level.dateRanges[dateRangeAttr.ID]);
                if (dateRange.isValid || level.skippedSegments) {
                  level.dateRanges[dateRange.id] = dateRange;
                } else {
                  logger.warn("Ignoring invalid DATERANGE tag: \"" + value1 + "\"");
                }
                // Add to fragment tag list for backwards compatibility (< v1.2.0)
                frag.tagList.push(['EXT-X-DATERANGE', value1]);
                break;
              }
            case 'DEFINE':
              {
                break;
              }
            case 'DISCONTINUITY-SEQUENCE':
              discontinuityCounter = parseInt(value1);
              break;
            case 'KEY':
              {
                var levelKey = parseKey(value1, baseurl);
                if (levelKey.isSupported()) {
                  if (levelKey.method === 'NONE') {
                    levelkeys = undefined;
                    break;
                  }
                  if (!levelkeys) {
                    levelkeys = {};
                  }
                  if (levelkeys[levelKey.keyFormat]) {
                    levelkeys = _extends({}, levelkeys);
                  }
                  levelkeys[levelKey.keyFormat] = levelKey;
                } else {
                  logger.warn("[Keys] Ignoring invalid EXT-X-KEY tag: \"" + value1 + "\"");
                }
                break;
              }
            case 'START':
              level.startTimeOffset = parseStartTimeOffset(value1);
              break;
            case 'MAP':
              {
                var mapAttrs = new AttrList(value1);
                if (frag.duration) {
                  // Initial segment tag is after segment duration tag.
                  //   #EXTINF: 6.0
                  //   #EXT-X-MAP:URI="init.mp4
                  var init = new Fragment(type, baseurl);
                  setInitSegment(init, mapAttrs, id, levelkeys);
                  currentInitSegment = init;
                  frag.initSegment = currentInitSegment;
                  if (currentInitSegment.rawProgramDateTime && !frag.rawProgramDateTime) {
                    frag.rawProgramDateTime = currentInitSegment.rawProgramDateTime;
                  }
                } else {
                  // Initial segment tag is before segment duration tag
                  // Handle case where EXT-X-MAP is declared after EXT-X-BYTERANGE
                  var end = frag.byteRangeEndOffset;
                  if (end) {
                    var start = frag.byteRangeStartOffset;
                    nextByteRange = end - start + "@" + start;
                  } else {
                    nextByteRange = null;
                  }
                  setInitSegment(frag, mapAttrs, id, levelkeys);
                  currentInitSegment = frag;
                  createNextFrag = true;
                }
                break;
              }
            case 'SERVER-CONTROL':
              {
                var serverControlAttrs = new AttrList(value1);
                level.canBlockReload = serverControlAttrs.bool('CAN-BLOCK-RELOAD');
                level.canSkipUntil = serverControlAttrs.optionalFloat('CAN-SKIP-UNTIL', 0);
                level.canSkipDateRanges = level.canSkipUntil > 0 && serverControlAttrs.bool('CAN-SKIP-DATERANGES');
                level.partHoldBack = serverControlAttrs.optionalFloat('PART-HOLD-BACK', 0);
                level.holdBack = serverControlAttrs.optionalFloat('HOLD-BACK', 0);
                break;
              }
            case 'PART-INF':
              {
                var partInfAttrs = new AttrList(value1);
                level.partTarget = partInfAttrs.decimalFloatingPoint('PART-TARGET');
                break;
              }
            case 'PART':
              {
                var partList = level.partList;
                if (!partList) {
                  partList = level.partList = [];
                }
                var previousFragmentPart = currentPart > 0 ? partList[partList.length - 1] : undefined;
                var index = currentPart++;
                var partAttrs = new AttrList(value1);
                var part = new Part(partAttrs, frag, baseurl, index, previousFragmentPart);
                partList.push(part);
                frag.duration += part.duration;
                break;
              }
            case 'PRELOAD-HINT':
              {
                var preloadHintAttrs = new AttrList(value1);
                level.preloadHint = preloadHintAttrs;
                break;
              }
            case 'RENDITION-REPORT':
              {
                var renditionReportAttrs = new AttrList(value1);
                level.renditionReports = level.renditionReports || [];
                level.renditionReports.push(renditionReportAttrs);
                break;
              }
            default:
              logger.warn("line parsed but not handled: " + result);
              break;
          }
        }
      }
      if (prevFrag && !prevFrag.relurl) {
        fragments.pop();
        totalduration -= prevFrag.duration;
        if (level.partList) {
          level.fragmentHint = prevFrag;
        }
      } else if (level.partList) {
        assignProgramDateTime(frag, prevFrag);
        frag.cc = discontinuityCounter;
        level.fragmentHint = frag;
        if (levelkeys) {
          setFragLevelKeys(frag, levelkeys, level);
        }
      }
      var fragmentLength = fragments.length;
      var firstFragment = fragments[0];
      var lastFragment = fragments[fragmentLength - 1];
      totalduration += level.skippedSegments * level.targetduration;
      if (totalduration > 0 && fragmentLength && lastFragment) {
        level.averagetargetduration = totalduration / fragmentLength;
        var lastSn = lastFragment.sn;
        level.endSN = lastSn !== 'initSegment' ? lastSn : 0;
        if (!level.live) {
          lastFragment.endList = true;
        }
        if (firstFragment) {
          level.startCC = firstFragment.cc;
        }
      } else {
        level.endSN = 0;
        level.startCC = 0;
      }
      if (level.fragmentHint) {
        totalduration += level.fragmentHint.duration;
      }
      level.totalduration = totalduration;
      level.endCC = discontinuityCounter;

      /**
       * Backfill any missing PDT values
       * "If the first EXT-X-PROGRAM-DATE-TIME tag in a Playlist appears after
       * one or more Media Segment URIs, the client SHOULD extrapolate
       * backward from that tag (using EXTINF durations and/or media
       * timestamps) to associate dates with those segments."
       * We have already extrapolated forward, but all fragments up to the first instance of PDT do not have their PDTs
       * computed.
       */
      if (firstPdtIndex > 0) {
        backfillProgramDateTimes(fragments, firstPdtIndex);
      }
      return level;
    };
    return M3U8Parser;
  }();
  function parseKey(keyTagAttributes, baseurl, parsed) {
    var _keyAttrs$METHOD, _keyAttrs$KEYFORMAT;
    // https://tools.ietf.org/html/rfc8216#section-4.3.2.4
    var keyAttrs = new AttrList(keyTagAttributes);
    var decryptmethod = (_keyAttrs$METHOD = keyAttrs.METHOD) != null ? _keyAttrs$METHOD : '';
    var decrypturi = keyAttrs.URI;
    var decryptiv = keyAttrs.hexadecimalInteger('IV');
    var decryptkeyformatversions = keyAttrs.KEYFORMATVERSIONS;
    // From RFC: This attribute is OPTIONAL; its absence indicates an implicit value of "identity".
    var decryptkeyformat = (_keyAttrs$KEYFORMAT = keyAttrs.KEYFORMAT) != null ? _keyAttrs$KEYFORMAT : 'identity';
    if (decrypturi && keyAttrs.IV && !decryptiv) {
      logger.error("Invalid IV: " + keyAttrs.IV);
    }
    // If decrypturi is a URI with a scheme, then baseurl will be ignored
    // No uri is allowed when METHOD is NONE
    var resolvedUri = decrypturi ? M3U8Parser.resolve(decrypturi, baseurl) : '';
    var keyFormatVersions = (decryptkeyformatversions ? decryptkeyformatversions : '1').split('/').map(Number).filter(Number.isFinite);
    return new LevelKey(decryptmethod, resolvedUri, decryptkeyformat, keyFormatVersions, decryptiv);
  }
  function parseStartTimeOffset(startAttributes) {
    var startAttrs = new AttrList(startAttributes);
    var startTimeOffset = startAttrs.decimalFloatingPoint('TIME-OFFSET');
    if (isFiniteNumber(startTimeOffset)) {
      return startTimeOffset;
    }
    return null;
  }
  function setCodecs(codecsAttributeValue, level) {
    var codecs = (codecsAttributeValue || '').split(/[ ,]+/).filter(function (c) {
      return c;
    });
    ['video', 'audio', 'text'].forEach(function (type) {
      var filtered = codecs.filter(function (codec) {
        return isCodecType(codec, type);
      });
      if (filtered.length) {
        // Comma separated list of all codecs for type
        level[type + "Codec"] = filtered.join(',');
        // Remove known codecs so that only unknownCodecs are left after iterating through each type
        codecs = codecs.filter(function (codec) {
          return filtered.indexOf(codec) === -1;
        });
      }
    });
    level.unknownCodecs = codecs;
  }
  function assignCodec(media, groupItem, codecProperty) {
    var codecValue = groupItem[codecProperty];
    if (codecValue) {
      media[codecProperty] = codecValue;
    }
  }
  function backfillProgramDateTimes(fragments, firstPdtIndex) {
    var fragPrev = fragments[firstPdtIndex];
    for (var i = firstPdtIndex; i--;) {
      var frag = fragments[i];
      // Exit on delta-playlist skipped segments
      if (!frag) {
        return;
      }
      frag.programDateTime = fragPrev.programDateTime - frag.duration * 1000;
      fragPrev = frag;
    }
  }
  function assignProgramDateTime(frag, prevFrag) {
    if (frag.rawProgramDateTime) {
      frag.programDateTime = Date.parse(frag.rawProgramDateTime);
    } else if (prevFrag != null && prevFrag.programDateTime) {
      frag.programDateTime = prevFrag.endProgramDateTime;
    }
    if (!isFiniteNumber(frag.programDateTime)) {
      frag.programDateTime = null;
      frag.rawProgramDateTime = null;
    }
  }
  function setInitSegment(frag, mapAttrs, id, levelkeys) {
    frag.relurl = mapAttrs.URI;
    if (mapAttrs.BYTERANGE) {
      frag.setByteRange(mapAttrs.BYTERANGE);
    }
    frag.level = id;
    frag.sn = 'initSegment';
    if (levelkeys) {
      frag.levelkeys = levelkeys;
    }
    frag.initSegment = null;
  }
  function setFragLevelKeys(frag, levelkeys, level) {
    frag.levelkeys = levelkeys;
    var encryptedFragments = level.encryptedFragments;
    if ((!encryptedFragments.length || encryptedFragments[encryptedFragments.length - 1].levelkeys !== levelkeys) && Object.keys(levelkeys).some(function (format) {
      return levelkeys[format].isCommonEncryption;
    })) {
      encryptedFragments.push(frag);
    }
  }

  var PlaylistContextType = {
    MANIFEST: "manifest",
    LEVEL: "level",
    AUDIO_TRACK: "audioTrack",
    SUBTITLE_TRACK: "subtitleTrack"
  };
  var PlaylistLevelType = {
    MAIN: "main",
    AUDIO: "audio",
    SUBTITLE: "subtitle"
  };

  function mapContextToLevelType(context) {
    var type = context.type;
    switch (type) {
      case PlaylistContextType.AUDIO_TRACK:
        return PlaylistLevelType.AUDIO;
      case PlaylistContextType.SUBTITLE_TRACK:
        return PlaylistLevelType.SUBTITLE;
      default:
        return PlaylistLevelType.MAIN;
    }
  }
  function getResponseUrl(response, context) {
    var url = response.url;
    // responseURL not supported on some browsers (it is used to detect URL redirection)
    // data-uri mode also not supported (but no need to detect redirection)
    if (url === undefined || url.indexOf('data:') === 0) {
      // fallback to initial URL
      url = context.url;
    }
    return url;
  }
  var PlaylistLoader = /*#__PURE__*/function () {
    function PlaylistLoader(hls) {
      this.hls = void 0;
      this.loaders = Object.create(null);
      this.variableList = null;
      this.hls = hls;
      this.registerListeners();
    }
    var _proto = PlaylistLoader.prototype;
    _proto.startLoad = function startLoad(startPosition) {};
    _proto.stopLoad = function stopLoad() {
      this.destroyInternalLoaders();
    };
    _proto.registerListeners = function registerListeners() {
      var hls = this.hls;
      hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.on(Events.LEVEL_LOADING, this.onLevelLoading, this);
      hls.on(Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this);
      hls.on(Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
    };
    _proto.unregisterListeners = function unregisterListeners() {
      var hls = this.hls;
      hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.off(Events.LEVEL_LOADING, this.onLevelLoading, this);
      hls.off(Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this);
      hls.off(Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
    }

    /**
     * Returns defaults or configured loader-type overloads (pLoader and loader config params)
     */;
    _proto.createInternalLoader = function createInternalLoader(context) {
      var config = this.hls.config;
      var PLoader = config.pLoader;
      var Loader = config.loader;
      var InternalLoader = PLoader || Loader;
      var loader = new InternalLoader(config);
      this.loaders[context.type] = loader;
      return loader;
    };
    _proto.getInternalLoader = function getInternalLoader(context) {
      return this.loaders[context.type];
    };
    _proto.resetInternalLoader = function resetInternalLoader(contextType) {
      if (this.loaders[contextType]) {
        delete this.loaders[contextType];
      }
    }

    /**
     * Call `destroy` on all internal loader instances mapped (one per context type)
     */;
    _proto.destroyInternalLoaders = function destroyInternalLoaders() {
      for (var contextType in this.loaders) {
        var loader = this.loaders[contextType];
        if (loader) {
          loader.destroy();
        }
        this.resetInternalLoader(contextType);
      }
    };
    _proto.destroy = function destroy() {
      this.variableList = null;
      this.unregisterListeners();
      this.destroyInternalLoaders();
    };
    _proto.onManifestLoading = function onManifestLoading(event, data) {
      var url = data.url;
      this.variableList = null;
      this.load({
        id: null,
        level: 0,
        responseType: 'text',
        type: PlaylistContextType.MANIFEST,
        url: url,
        deliveryDirectives: null
      });
    };
    _proto.onLevelLoading = function onLevelLoading(event, data) {
      var id = data.id,
        level = data.level,
        pathwayId = data.pathwayId,
        url = data.url,
        deliveryDirectives = data.deliveryDirectives;
      this.load({
        id: id,
        level: level,
        pathwayId: pathwayId,
        responseType: 'text',
        type: PlaylistContextType.LEVEL,
        url: url,
        deliveryDirectives: deliveryDirectives
      });
    };
    _proto.onAudioTrackLoading = function onAudioTrackLoading(event, data) {
      var id = data.id,
        groupId = data.groupId,
        url = data.url,
        deliveryDirectives = data.deliveryDirectives;
      this.load({
        id: id,
        groupId: groupId,
        level: null,
        responseType: 'text',
        type: PlaylistContextType.AUDIO_TRACK,
        url: url,
        deliveryDirectives: deliveryDirectives
      });
    };
    _proto.onSubtitleTrackLoading = function onSubtitleTrackLoading(event, data) {
      var id = data.id,
        groupId = data.groupId,
        url = data.url,
        deliveryDirectives = data.deliveryDirectives;
      this.load({
        id: id,
        groupId: groupId,
        level: null,
        responseType: 'text',
        type: PlaylistContextType.SUBTITLE_TRACK,
        url: url,
        deliveryDirectives: deliveryDirectives
      });
    };
    _proto.load = function load(context) {
      var _context$deliveryDire,
        _this = this;
      var config = this.hls.config;

      // logger.debug(`[playlist-loader]: Loading playlist of type ${context.type}, level: ${context.level}, id: ${context.id}`);

      // Check if a loader for this context already exists
      var loader = this.getInternalLoader(context);
      if (loader) {
        var loaderContext = loader.context;
        if (loaderContext && loaderContext.url === context.url && loaderContext.level === context.level) {
          // same URL can't overlap
          logger.trace('[playlist-loader]: playlist request ongoing');
          return;
        }
        logger.log("[playlist-loader]: aborting previous loader for type: " + context.type);
        loader.abort();
      }

      // apply different configs for retries depending on
      // context (manifest, level, audio/subs playlist)
      var loadPolicy;
      if (context.type === PlaylistContextType.MANIFEST) {
        loadPolicy = config.manifestLoadPolicy.default;
      } else {
        loadPolicy = _extends({}, config.playlistLoadPolicy.default, {
          timeoutRetry: null,
          errorRetry: null
        });
      }
      loader = this.createInternalLoader(context);

      // Override level/track timeout for LL-HLS requests
      // (the default of 10000ms is counter productive to blocking playlist reload requests)
      if (isFiniteNumber((_context$deliveryDire = context.deliveryDirectives) == null ? void 0 : _context$deliveryDire.part)) {
        var levelDetails;
        if (context.type === PlaylistContextType.LEVEL && context.level !== null) {
          levelDetails = this.hls.levels[context.level].details;
        } else if (context.type === PlaylistContextType.AUDIO_TRACK && context.id !== null) {
          levelDetails = this.hls.audioTracks[context.id].details;
        } else if (context.type === PlaylistContextType.SUBTITLE_TRACK && context.id !== null) {
          levelDetails = this.hls.subtitleTracks[context.id].details;
        }
        if (levelDetails) {
          var partTarget = levelDetails.partTarget;
          var targetDuration = levelDetails.targetduration;
          if (partTarget && targetDuration) {
            var maxLowLatencyPlaylistRefresh = Math.max(partTarget * 3, targetDuration * 0.8) * 1000;
            loadPolicy = _extends({}, loadPolicy, {
              maxTimeToFirstByteMs: Math.min(maxLowLatencyPlaylistRefresh, loadPolicy.maxTimeToFirstByteMs),
              maxLoadTimeMs: Math.min(maxLowLatencyPlaylistRefresh, loadPolicy.maxTimeToFirstByteMs)
            });
          }
        }
      }
      var legacyRetryCompatibility = loadPolicy.errorRetry || loadPolicy.timeoutRetry || {};
      var loaderConfig = {
        loadPolicy: loadPolicy,
        timeout: loadPolicy.maxLoadTimeMs,
        maxRetry: legacyRetryCompatibility.maxNumRetry || 0,
        retryDelay: legacyRetryCompatibility.retryDelayMs || 0,
        maxRetryDelay: legacyRetryCompatibility.maxRetryDelayMs || 0
      };
      var loaderCallbacks = {
        onSuccess: function onSuccess(response, stats, context, networkDetails) {
          var loader = _this.getInternalLoader(context);
          _this.resetInternalLoader(context.type);
          var string = response.data;

          // Validate if it is an M3U8 at all
          if (string.indexOf('#EXTM3U') !== 0) {
            _this.handleManifestParsingError(response, context, new Error('no EXTM3U delimiter'), networkDetails || null, stats);
            return;
          }
          stats.parsing.start = performance.now();
          if (M3U8Parser.isMediaPlaylist(string)) {
            _this.handleTrackOrLevelPlaylist(response, stats, context, networkDetails || null, loader);
          } else {
            _this.handleMasterPlaylist(response, stats, context, networkDetails);
          }
        },
        onError: function onError(response, context, networkDetails, stats) {
          _this.handleNetworkError(context, networkDetails, false, response, stats);
        },
        onTimeout: function onTimeout(stats, context, networkDetails) {
          _this.handleNetworkError(context, networkDetails, true, undefined, stats);
        }
      };

      // logger.debug(`[playlist-loader]: Calling internal loader delegate for URL: ${context.url}`);

      loader.load(context, loaderConfig, loaderCallbacks);
    };
    _proto.handleMasterPlaylist = function handleMasterPlaylist(response, stats, context, networkDetails) {
      var hls = this.hls;
      var string = response.data;
      var url = getResponseUrl(response, context);
      var parsedResult = M3U8Parser.parseMasterPlaylist(string, url);
      if (parsedResult.playlistParsingError) {
        this.handleManifestParsingError(response, context, parsedResult.playlistParsingError, networkDetails, stats);
        return;
      }
      var contentSteering = parsedResult.contentSteering,
        levels = parsedResult.levels,
        sessionData = parsedResult.sessionData,
        sessionKeys = parsedResult.sessionKeys,
        startTimeOffset = parsedResult.startTimeOffset,
        variableList = parsedResult.variableList;
      this.variableList = variableList;
      var _M3U8Parser$parseMast = M3U8Parser.parseMasterPlaylistMedia(string, url, parsedResult),
        _M3U8Parser$parseMast2 = _M3U8Parser$parseMast.AUDIO,
        audioTracks = _M3U8Parser$parseMast2 === void 0 ? [] : _M3U8Parser$parseMast2,
        subtitles = _M3U8Parser$parseMast.SUBTITLES,
        captions = _M3U8Parser$parseMast['CLOSED-CAPTIONS'];
      if (audioTracks.length) {
        // check if we have found an audio track embedded in main playlist (audio track without URI attribute)
        var embeddedAudioFound = audioTracks.some(function (audioTrack) {
          return !audioTrack.url;
        });

        // if no embedded audio track defined, but audio codec signaled in quality level,
        // we need to signal this main audio track this could happen with playlists with
        // alt audio rendition in which quality levels (main)
        // contains both audio+video. but with mixed audio track not signaled
        if (!embeddedAudioFound && levels[0].audioCodec && !levels[0].attrs.AUDIO) {
          logger.log('[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one');
          audioTracks.unshift({
            type: 'main',
            name: 'main',
            groupId: 'main',
            default: false,
            autoselect: false,
            forced: false,
            id: -1,
            attrs: new AttrList({}),
            bitrate: 0,
            url: ''
          });
        }
      }
      hls.trigger(Events.MANIFEST_LOADED, {
        levels: levels,
        audioTracks: audioTracks,
        subtitles: subtitles,
        captions: captions,
        contentSteering: contentSteering,
        url: url,
        stats: stats,
        networkDetails: networkDetails,
        sessionData: sessionData,
        sessionKeys: sessionKeys,
        startTimeOffset: startTimeOffset,
        variableList: variableList
      });
    };
    _proto.handleTrackOrLevelPlaylist = function handleTrackOrLevelPlaylist(response, stats, context, networkDetails, loader) {
      var hls = this.hls;
      var id = context.id,
        level = context.level,
        type = context.type;
      var url = getResponseUrl(response, context);
      var levelUrlId = 0;
      var levelId = isFiniteNumber(level) ? level : isFiniteNumber(id) ? id : 0;
      var levelType = mapContextToLevelType(context);
      var levelDetails = M3U8Parser.parseLevelPlaylist(response.data, url, levelId, levelType, levelUrlId, this.variableList);

      // We have done our first request (Manifest-type) and receive
      // not a master playlist but a chunk-list (track/level)
      // We fire the manifest-loaded event anyway with the parsed level-details
      // by creating a single-level structure for it.
      if (type === PlaylistContextType.MANIFEST) {
        var singleLevel = {
          attrs: new AttrList({}),
          bitrate: 0,
          details: levelDetails,
          name: '',
          url: url
        };
        hls.trigger(Events.MANIFEST_LOADED, {
          levels: [singleLevel],
          audioTracks: [],
          url: url,
          stats: stats,
          networkDetails: networkDetails,
          sessionData: null,
          sessionKeys: null,
          contentSteering: null,
          startTimeOffset: null,
          variableList: null
        });
      }

      // save parsing time
      stats.parsing.end = performance.now();

      // extend the context with the new levelDetails property
      context.levelDetails = levelDetails;
      this.handlePlaylistLoaded(levelDetails, response, stats, context, networkDetails, loader);
    };
    _proto.handleManifestParsingError = function handleManifestParsingError(response, context, error, networkDetails, stats) {
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.NETWORK_ERROR,
        details: ErrorDetails.MANIFEST_PARSING_ERROR,
        fatal: context.type === PlaylistContextType.MANIFEST,
        url: response.url,
        err: error,
        error: error,
        reason: error.message,
        response: response,
        context: context,
        networkDetails: networkDetails,
        stats: stats
      });
    };
    _proto.handleNetworkError = function handleNetworkError(context, networkDetails, timeout, response, stats) {
      if (timeout === void 0) {
        timeout = false;
      }
      var message = "A network " + (timeout ? 'timeout' : 'error' + (response ? ' (status ' + response.code + ')' : '')) + " occurred while loading " + context.type;
      if (context.type === PlaylistContextType.LEVEL) {
        message += ": " + context.level + " id: " + context.id;
      } else if (context.type === PlaylistContextType.AUDIO_TRACK || context.type === PlaylistContextType.SUBTITLE_TRACK) {
        message += " id: " + context.id + " group-id: \"" + context.groupId + "\"";
      }
      var error = new Error(message);
      logger.warn("[playlist-loader]: " + message);
      var details = ErrorDetails.UNKNOWN;
      var fatal = false;
      var loader = this.getInternalLoader(context);
      switch (context.type) {
        case PlaylistContextType.MANIFEST:
          details = timeout ? ErrorDetails.MANIFEST_LOAD_TIMEOUT : ErrorDetails.MANIFEST_LOAD_ERROR;
          fatal = true;
          break;
        case PlaylistContextType.LEVEL:
          details = timeout ? ErrorDetails.LEVEL_LOAD_TIMEOUT : ErrorDetails.LEVEL_LOAD_ERROR;
          fatal = false;
          break;
        case PlaylistContextType.AUDIO_TRACK:
          details = timeout ? ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : ErrorDetails.AUDIO_TRACK_LOAD_ERROR;
          fatal = false;
          break;
        case PlaylistContextType.SUBTITLE_TRACK:
          details = timeout ? ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT : ErrorDetails.SUBTITLE_LOAD_ERROR;
          fatal = false;
          break;
      }
      if (loader) {
        this.resetInternalLoader(context.type);
      }
      var errorData = {
        type: ErrorTypes.NETWORK_ERROR,
        details: details,
        fatal: fatal,
        url: context.url,
        loader: loader,
        context: context,
        error: error,
        networkDetails: networkDetails,
        stats: stats
      };
      if (response) {
        var url = (networkDetails == null ? void 0 : networkDetails.url) || context.url;
        errorData.response = _objectSpread2({
          url: url,
          data: undefined
        }, response);
      }
      this.hls.trigger(Events.ERROR, errorData);
    };
    _proto.handlePlaylistLoaded = function handlePlaylistLoaded(levelDetails, response, stats, context, networkDetails, loader) {
      var hls = this.hls;
      var type = context.type,
        level = context.level,
        id = context.id,
        groupId = context.groupId,
        deliveryDirectives = context.deliveryDirectives;
      var url = getResponseUrl(response, context);
      var parent = mapContextToLevelType(context);
      var levelIndex = typeof context.level === 'number' && parent === PlaylistLevelType.MAIN ? level : undefined;
      if (!levelDetails.fragments.length) {
        var _error = new Error('No Segments found in Playlist');
        hls.trigger(Events.ERROR, {
          type: ErrorTypes.NETWORK_ERROR,
          details: ErrorDetails.LEVEL_EMPTY_ERROR,
          fatal: false,
          url: url,
          error: _error,
          reason: _error.message,
          response: response,
          context: context,
          level: levelIndex,
          parent: parent,
          networkDetails: networkDetails,
          stats: stats
        });
        return;
      }
      if (!levelDetails.targetduration) {
        levelDetails.playlistParsingError = new Error('Missing Target Duration');
      }
      var error = levelDetails.playlistParsingError;
      if (error) {
        hls.trigger(Events.ERROR, {
          type: ErrorTypes.NETWORK_ERROR,
          details: ErrorDetails.LEVEL_PARSING_ERROR,
          fatal: false,
          url: url,
          error: error,
          reason: error.message,
          response: response,
          context: context,
          level: levelIndex,
          parent: parent,
          networkDetails: networkDetails,
          stats: stats
        });
        return;
      }
      if (levelDetails.live && loader) {
        if (loader.getCacheAge) {
          levelDetails.ageHeader = loader.getCacheAge() || 0;
        }
        if (!loader.getCacheAge || isNaN(levelDetails.ageHeader)) {
          levelDetails.ageHeader = 0;
        }
      }
      switch (type) {
        case PlaylistContextType.MANIFEST:
        case PlaylistContextType.LEVEL:
          hls.trigger(Events.LEVEL_LOADED, {
            details: levelDetails,
            level: levelIndex || 0,
            id: id || 0,
            stats: stats,
            networkDetails: networkDetails,
            deliveryDirectives: deliveryDirectives
          });
          break;
        case PlaylistContextType.AUDIO_TRACK:
          hls.trigger(Events.AUDIO_TRACK_LOADED, {
            details: levelDetails,
            id: id || 0,
            groupId: groupId || '',
            stats: stats,
            networkDetails: networkDetails,
            deliveryDirectives: deliveryDirectives
          });
          break;
        case PlaylistContextType.SUBTITLE_TRACK:
          hls.trigger(Events.SUBTITLE_TRACK_LOADED, {
            details: levelDetails,
            id: id || 0,
            groupId: groupId || '',
            stats: stats,
            networkDetails: networkDetails,
            deliveryDirectives: deliveryDirectives
          });
          break;
      }
    };
    return PlaylistLoader;
  }();

  function sendAddTrackEvent(track, videoEl) {
    var event;
    try {
      event = new Event('addtrack');
    } catch (err) {
      // for IE11
      event = document.createEvent('Event');
      event.initEvent('addtrack', false, false);
    }
    event.track = track;
    videoEl.dispatchEvent(event);
  }
  function clearCurrentCues(track) {
    // When track.mode is disabled, track.cues will be null.
    // To guarantee the removal of cues, we need to temporarily
    // change the mode to hidden
    var mode = track.mode;
    if (mode === 'disabled') {
      track.mode = 'hidden';
    }
    if (track.cues) {
      for (var i = track.cues.length; i--;) {
        track.removeCue(track.cues[i]);
      }
    }
    if (mode === 'disabled') {
      track.mode = mode;
    }
  }
  function removeCuesInRange(track, start, end, predicate) {
    var mode = track.mode;
    if (mode === 'disabled') {
      track.mode = 'hidden';
    }
    if (track.cues && track.cues.length > 0) {
      var cues = getCuesInRange(track.cues, start, end);
      for (var i = 0; i < cues.length; i++) {
        if (!predicate || predicate(cues[i])) {
          track.removeCue(cues[i]);
        }
      }
    }
    if (mode === 'disabled') {
      track.mode = mode;
    }
  }

  // Find first cue starting after given time.
  // Modified version of binary search O(log(n)).
  function getFirstCueIndexAfterTime(cues, time) {
    // If first cue starts after time, start there
    if (time < cues[0].startTime) {
      return 0;
    }
    // If the last cue ends before time there is no overlap
    var len = cues.length - 1;
    if (time > cues[len].endTime) {
      return -1;
    }
    var left = 0;
    var right = len;
    while (left <= right) {
      var mid = Math.floor((right + left) / 2);
      if (time < cues[mid].startTime) {
        right = mid - 1;
      } else if (time > cues[mid].startTime && left < len) {
        left = mid + 1;
      } else {
        // If it's not lower or higher, it must be equal.
        return mid;
      }
    }
    // At this point, left and right have swapped.
    // No direct match was found, left or right element must be the closest. Check which one has the smallest diff.
    return cues[left].startTime - time < time - cues[right].startTime ? left : right;
  }
  function getCuesInRange(cues, start, end) {
    var cuesFound = [];
    var firstCueInRange = getFirstCueIndexAfterTime(cues, start);
    if (firstCueInRange > -1) {
      for (var i = firstCueInRange, len = cues.length; i < len; i++) {
        var _cue = cues[i];
        if (_cue.startTime >= start && _cue.endTime <= end) {
          cuesFound.push(_cue);
        } else if (_cue.startTime > end) {
          return cuesFound;
        }
      }
    }
    return cuesFound;
  }

  var MetadataSchema = {
    audioId3: "org.id3",
    dateRange: "com.apple.quicktime.HLS",
    emsg: "https://aomedia.org/emsg/ID3"
  };

  var MIN_CUE_DURATION = 0.25;
  function getCueClass() {
    if (typeof self === 'undefined') return undefined;
    return self.VTTCue || self.TextTrackCue;
  }
  function createCueWithDataFields(Cue, startTime, endTime, data, type) {
    var cue = new Cue(startTime, endTime, '');
    try {
      cue.value = data;
      if (type) {
        cue.type = type;
      }
    } catch (e) {
      cue = new Cue(startTime, endTime, JSON.stringify(type ? _objectSpread2({
        type: type
      }, data) : data));
    }
    return cue;
  }

  // VTTCue latest draft allows an infinite duration, fallback
  // to MAX_VALUE if necessary
  var MAX_CUE_ENDTIME = function () {
    var Cue = getCueClass();
    try {
      Cue && new Cue(0, Number.POSITIVE_INFINITY, '');
    } catch (e) {
      return Number.MAX_VALUE;
    }
    return Number.POSITIVE_INFINITY;
  }();
  function dateRangeDateToTimelineSeconds(date, offset) {
    return date.getTime() / 1000 - offset;
  }
  function hexToArrayBuffer(str) {
    return Uint8Array.from(str.replace(/^0x/, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' ')).buffer;
  }
  var ID3TrackController = /*#__PURE__*/function () {
    function ID3TrackController(hls) {
      this.hls = void 0;
      this.id3Track = null;
      this.media = null;
      this.dateRangeCuesAppended = {};
      this.hls = hls;
      this._registerListeners();
    }
    var _proto = ID3TrackController.prototype;
    _proto.destroy = function destroy() {
      this._unregisterListeners();
      this.id3Track = null;
      this.media = null;
      this.dateRangeCuesAppended = {};
      // @ts-ignore
      this.hls = null;
    };
    _proto._registerListeners = function _registerListeners() {
      var hls = this.hls;
      hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this);
      hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
      hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.on(Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this);
      hls.on(Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
      hls.on(Events.LEVEL_UPDATED, this.onLevelUpdated, this);
    };
    _proto._unregisterListeners = function _unregisterListeners() {
      var hls = this.hls;
      hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this);
      hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
      hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.off(Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this);
      hls.off(Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
      hls.off(Events.LEVEL_UPDATED, this.onLevelUpdated, this);
    }

    // Add ID3 metatadata text track.
    ;
    _proto.onMediaAttached = function onMediaAttached(event, data) {
      this.media = data.media;
    };
    _proto.onMediaDetaching = function onMediaDetaching() {
      if (!this.id3Track) {
        return;
      }
      clearCurrentCues(this.id3Track);
      this.id3Track = null;
      this.media = null;
      this.dateRangeCuesAppended = {};
    };
    _proto.onManifestLoading = function onManifestLoading() {
      this.dateRangeCuesAppended = {};
    };
    _proto.createTrack = function createTrack(media) {
      var track = this.getID3Track(media.textTracks);
      track.mode = 'hidden';
      return track;
    };
    _proto.getID3Track = function getID3Track(textTracks) {
      if (!this.media) {
        return;
      }
      for (var i = 0; i < textTracks.length; i++) {
        var textTrack = textTracks[i];
        if (textTrack.kind === 'metadata' && textTrack.label === 'id3') {
          // send 'addtrack' when reusing the textTrack for metadata,
          // same as what we do for captions
          sendAddTrackEvent(textTrack, this.media);
          return textTrack;
        }
      }
      return this.media.addTextTrack('metadata', 'id3');
    };
    _proto.onFragParsingMetadata = function onFragParsingMetadata(event, data) {
      if (!this.media) {
        return;
      }
      var _this$hls$config = this.hls.config,
        enableEmsgMetadataCues = _this$hls$config.enableEmsgMetadataCues,
        enableID3MetadataCues = _this$hls$config.enableID3MetadataCues;
      if (!enableEmsgMetadataCues && !enableID3MetadataCues) {
        return;
      }
      var samples = data.samples;

      // create track dynamically
      if (!this.id3Track) {
        this.id3Track = this.createTrack(this.media);
      }
      var Cue = getCueClass();
      if (!Cue) {
        return;
      }
      for (var i = 0; i < samples.length; i++) {
        var type = samples[i].type;
        if (type === MetadataSchema.emsg && !enableEmsgMetadataCues || !enableID3MetadataCues) {
          continue;
        }
        var frames = getID3Frames(samples[i].data);
        if (frames) {
          var startTime = samples[i].pts;
          var endTime = startTime + samples[i].duration;
          if (endTime > MAX_CUE_ENDTIME) {
            endTime = MAX_CUE_ENDTIME;
          }
          var timeDiff = endTime - startTime;
          if (timeDiff <= 0) {
            endTime = startTime + MIN_CUE_DURATION;
          }
          for (var j = 0; j < frames.length; j++) {
            var frame = frames[j];
            // Safari doesn't put the timestamp frame in the TextTrack
            if (!isTimeStampFrame(frame)) {
              // add a bounds to any unbounded cues
              this.updateId3CueEnds(startTime, type);
              var cue = createCueWithDataFields(Cue, startTime, endTime, frame, type);
              if (cue) {
                this.id3Track.addCue(cue);
              }
            }
          }
        }
      }
    };
    _proto.updateId3CueEnds = function updateId3CueEnds(startTime, type) {
      var _this$id3Track;
      var cues = (_this$id3Track = this.id3Track) == null ? void 0 : _this$id3Track.cues;
      if (cues) {
        for (var i = cues.length; i--;) {
          var cue = cues[i];
          if (cue.type === type && cue.startTime < startTime && cue.endTime === MAX_CUE_ENDTIME) {
            cue.endTime = startTime;
          }
        }
      }
    };
    _proto.onBufferFlushing = function onBufferFlushing(event, _ref) {
      var startOffset = _ref.startOffset,
        endOffset = _ref.endOffset,
        type = _ref.type;
      var id3Track = this.id3Track,
        hls = this.hls;
      if (!hls) {
        return;
      }
      var _hls$config = hls.config,
        enableEmsgMetadataCues = _hls$config.enableEmsgMetadataCues,
        enableID3MetadataCues = _hls$config.enableID3MetadataCues;
      if (id3Track && (enableEmsgMetadataCues || enableID3MetadataCues)) {
        var predicate;
        if (type === 'audio') {
          predicate = function predicate(cue) {
            return cue.type === MetadataSchema.audioId3 && enableID3MetadataCues;
          };
        } else if (type === 'video') {
          predicate = function predicate(cue) {
            return cue.type === MetadataSchema.emsg && enableEmsgMetadataCues;
          };
        } else {
          predicate = function predicate(cue) {
            return cue.type === MetadataSchema.audioId3 && enableID3MetadataCues || cue.type === MetadataSchema.emsg && enableEmsgMetadataCues;
          };
        }
        removeCuesInRange(id3Track, startOffset, endOffset, predicate);
      }
    };
    _proto.onLevelUpdated = function onLevelUpdated(event, _ref2) {
      var _this = this;
      var details = _ref2.details;
      if (!this.media || !details.hasProgramDateTime || !this.hls.config.enableDateRangeMetadataCues) {
        return;
      }
      var dateRangeCuesAppended = this.dateRangeCuesAppended,
        id3Track = this.id3Track;
      var dateRanges = details.dateRanges;
      var ids = Object.keys(dateRanges);
      // Remove cues from track not found in details.dateRanges
      if (id3Track) {
        var idsToRemove = Object.keys(dateRangeCuesAppended).filter(function (id) {
          return !ids.includes(id);
        });
        var _loop = function _loop() {
          var id = idsToRemove[i];
          Object.keys(dateRangeCuesAppended[id].cues).forEach(function (key) {
            id3Track.removeCue(dateRangeCuesAppended[id].cues[key]);
          });
          delete dateRangeCuesAppended[id];
        };
        for (var i = idsToRemove.length; i--;) {
          _loop();
        }
      }
      // Exit if the playlist does not have Date Ranges or does not have Program Date Time
      var lastFragment = details.fragments[details.fragments.length - 1];
      if (ids.length === 0 || !isFiniteNumber(lastFragment == null ? void 0 : lastFragment.programDateTime)) {
        return;
      }
      if (!this.id3Track) {
        this.id3Track = this.createTrack(this.media);
      }
      var dateTimeOffset = lastFragment.programDateTime / 1000 - lastFragment.start;
      var Cue = getCueClass();
      var _loop2 = function _loop2() {
        var id = ids[_i];
        var dateRange = dateRanges[id];
        var startTime = dateRangeDateToTimelineSeconds(dateRange.startDate, dateTimeOffset);

        // Process DateRanges to determine end-time (known DURATION, END-DATE, or END-ON-NEXT)
        var appendedDateRangeCues = dateRangeCuesAppended[id];
        var cues = (appendedDateRangeCues == null ? void 0 : appendedDateRangeCues.cues) || {};
        var durationKnown = (appendedDateRangeCues == null ? void 0 : appendedDateRangeCues.durationKnown) || false;
        var endTime = MAX_CUE_ENDTIME;
        var endDate = dateRange.endDate;
        if (endDate) {
          endTime = dateRangeDateToTimelineSeconds(endDate, dateTimeOffset);
          durationKnown = true;
        } else if (dateRange.endOnNext && !durationKnown) {
          var nextDateRangeWithSameClass = ids.reduce(function (candidateDateRange, id) {
            if (id !== dateRange.id) {
              var otherDateRange = dateRanges[id];
              if (otherDateRange.class === dateRange.class && otherDateRange.startDate > dateRange.startDate && (!candidateDateRange || dateRange.startDate < candidateDateRange.startDate)) {
                return otherDateRange;
              }
            }
            return candidateDateRange;
          }, null);
          if (nextDateRangeWithSameClass) {
            endTime = dateRangeDateToTimelineSeconds(nextDateRangeWithSameClass.startDate, dateTimeOffset);
            durationKnown = true;
          }
        }

        // Create TextTrack Cues for each MetadataGroup Item (select DateRange attribute)
        // This is to emulate Safari HLS playback handling of DateRange tags
        var attributes = Object.keys(dateRange.attr);
        for (var j = 0; j < attributes.length; j++) {
          var key = attributes[j];
          if (!isDateRangeCueAttribute(key)) {
            continue;
          }
          var cue = cues[key];
          if (cue) {
            if (durationKnown && !appendedDateRangeCues.durationKnown) {
              cue.endTime = endTime;
            }
          } else if (Cue) {
            var data = dateRange.attr[key];
            if (isSCTE35Attribute(key)) {
              data = hexToArrayBuffer(data);
            }
            var _cue = createCueWithDataFields(Cue, startTime, endTime, {
              key: key,
              data: data
            }, MetadataSchema.dateRange);
            if (_cue) {
              _cue.id = id;
              _this.id3Track.addCue(_cue);
              cues[key] = _cue;
            }
          }
        }

        // Keep track of processed DateRanges by ID for updating cues with new DateRange tag attributes
        dateRangeCuesAppended[id] = {
          cues: cues,
          dateRange: dateRange,
          durationKnown: durationKnown
        };
      };
      for (var _i = 0; _i < ids.length; _i++) {
        _loop2();
      }
    };
    return ID3TrackController;
  }();

  var LatencyController = /*#__PURE__*/function () {
    function LatencyController(hls) {
      var _this = this;
      this.hls = void 0;
      this.config = void 0;
      this.media = null;
      this.levelDetails = null;
      this.currentTime = 0;
      this.stallCount = 0;
      this._latency = null;
      this.timeupdateHandler = function () {
        return _this.timeupdate();
      };
      this.hls = hls;
      this.config = hls.config;
      this.registerListeners();
    }
    var _proto = LatencyController.prototype;
    _proto.destroy = function destroy() {
      this.unregisterListeners();
      this.onMediaDetaching();
      this.levelDetails = null;
      // @ts-ignore
      this.hls = this.timeupdateHandler = null;
    };
    _proto.registerListeners = function registerListeners() {
      this.hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this);
      this.hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
      this.hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      this.hls.on(Events.LEVEL_UPDATED, this.onLevelUpdated, this);
      this.hls.on(Events.ERROR, this.onError, this);
    };
    _proto.unregisterListeners = function unregisterListeners() {
      this.hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this);
      this.hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
      this.hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      this.hls.off(Events.LEVEL_UPDATED, this.onLevelUpdated, this);
      this.hls.off(Events.ERROR, this.onError, this);
    };
    _proto.onMediaAttached = function onMediaAttached(event, data) {
      this.media = data.media;
      this.media.addEventListener('timeupdate', this.timeupdateHandler);
    };
    _proto.onMediaDetaching = function onMediaDetaching() {
      if (this.media) {
        this.media.removeEventListener('timeupdate', this.timeupdateHandler);
        this.media = null;
      }
    };
    _proto.onManifestLoading = function onManifestLoading() {
      this.levelDetails = null;
      this._latency = null;
      this.stallCount = 0;
    };
    _proto.onLevelUpdated = function onLevelUpdated(event, _ref) {
      var details = _ref.details;
      this.levelDetails = details;
      if (details.advanced) {
        this.timeupdate();
      }
      if (!details.live && this.media) {
        this.media.removeEventListener('timeupdate', this.timeupdateHandler);
      }
    };
    _proto.onError = function onError(event, data) {
      var _this$levelDetails;
      if (data.details !== ErrorDetails.BUFFER_STALLED_ERROR) {
        return;
      }
      this.stallCount++;
      if ((_this$levelDetails = this.levelDetails) != null && _this$levelDetails.live) {
        logger.warn('[playback-rate-controller]: Stall detected, adjusting target latency');
      }
    };
    _proto.timeupdate = function timeupdate() {
      var media = this.media,
        levelDetails = this.levelDetails;
      if (!media || !levelDetails) {
        return;
      }
      this.currentTime = media.currentTime;
      var latency = this.computeLatency();
      if (latency === null) {
        return;
      }
      this._latency = latency;

      // Adapt playbackRate to meet target latency in low-latency mode
      var _this$config = this.config,
        lowLatencyMode = _this$config.lowLatencyMode,
        maxLiveSyncPlaybackRate = _this$config.maxLiveSyncPlaybackRate;
      if (!lowLatencyMode || maxLiveSyncPlaybackRate === 1 || !levelDetails.live) {
        return;
      }
      var targetLatency = this.targetLatency;
      if (targetLatency === null) {
        return;
      }
      var distanceFromTarget = latency - targetLatency;
      // Only adjust playbackRate when within one target duration of targetLatency
      // and more than one second from under-buffering.
      // Playback further than one target duration from target can be considered DVR playback.
      var liveMinLatencyDuration = Math.min(this.maxLatency, targetLatency + levelDetails.targetduration);
      var inLiveRange = distanceFromTarget < liveMinLatencyDuration;
      if (inLiveRange && distanceFromTarget > 0.05 && this.forwardBufferLength > 1) {
        var max = Math.min(2, Math.max(1.0, maxLiveSyncPlaybackRate));
        var rate = Math.round(2 / (1 + Math.exp(-0.75 * distanceFromTarget - this.edgeStalled)) * 20) / 20;
        media.playbackRate = Math.min(max, Math.max(1, rate));
      } else if (media.playbackRate !== 1 && media.playbackRate !== 0) {
        media.playbackRate = 1;
      }
    };
    _proto.estimateLiveEdge = function estimateLiveEdge() {
      var levelDetails = this.levelDetails;
      if (levelDetails === null) {
        return null;
      }
      return levelDetails.edge + levelDetails.age;
    };
    _proto.computeLatency = function computeLatency() {
      var liveEdge = this.estimateLiveEdge();
      if (liveEdge === null) {
        return null;
      }
      return liveEdge - this.currentTime;
    };
    _createClass(LatencyController, [{
      key: "latency",
      get: function get() {
        return this._latency || 0;
      }
    }, {
      key: "maxLatency",
      get: function get() {
        var config = this.config,
          levelDetails = this.levelDetails;
        if (config.liveMaxLatencyDuration !== undefined) {
          return config.liveMaxLatencyDuration;
        }
        return levelDetails ? config.liveMaxLatencyDurationCount * levelDetails.targetduration : 0;
      }
    }, {
      key: "targetLatency",
      get: function get() {
        var levelDetails = this.levelDetails;
        if (levelDetails === null) {
          return null;
        }
        var holdBack = levelDetails.holdBack,
          partHoldBack = levelDetails.partHoldBack,
          targetduration = levelDetails.targetduration;
        var _this$config2 = this.config,
          liveSyncDuration = _this$config2.liveSyncDuration,
          liveSyncDurationCount = _this$config2.liveSyncDurationCount,
          lowLatencyMode = _this$config2.lowLatencyMode;
        var userConfig = this.hls.userConfig;
        var targetLatency = lowLatencyMode ? partHoldBack || holdBack : holdBack;
        if (userConfig.liveSyncDuration || userConfig.liveSyncDurationCount || targetLatency === 0) {
          targetLatency = liveSyncDuration !== undefined ? liveSyncDuration : liveSyncDurationCount * targetduration;
        }
        var maxLiveSyncOnStallIncrease = targetduration;
        var liveSyncOnStallIncrease = 1.0;
        return targetLatency + Math.min(this.stallCount * liveSyncOnStallIncrease, maxLiveSyncOnStallIncrease);
      }
    }, {
      key: "liveSyncPosition",
      get: function get() {
        var liveEdge = this.estimateLiveEdge();
        var targetLatency = this.targetLatency;
        var levelDetails = this.levelDetails;
        if (liveEdge === null || targetLatency === null || levelDetails === null) {
          return null;
        }
        var edge = levelDetails.edge;
        var syncPosition = liveEdge - targetLatency - this.edgeStalled;
        var min = edge - levelDetails.totalduration;
        var max = edge - (this.config.lowLatencyMode && levelDetails.partTarget || levelDetails.targetduration);
        return Math.min(Math.max(min, syncPosition), max);
      }
    }, {
      key: "drift",
      get: function get() {
        var levelDetails = this.levelDetails;
        if (levelDetails === null) {
          return 1;
        }
        return levelDetails.drift;
      }
    }, {
      key: "edgeStalled",
      get: function get() {
        var levelDetails = this.levelDetails;
        if (levelDetails === null) {
          return 0;
        }
        var maxLevelUpdateAge = (this.config.lowLatencyMode && levelDetails.partTarget || levelDetails.targetduration) * 3;
        return Math.max(levelDetails.age - maxLevelUpdateAge, 0);
      }
    }, {
      key: "forwardBufferLength",
      get: function get() {
        var media = this.media,
          levelDetails = this.levelDetails;
        if (!media || !levelDetails) {
          return 0;
        }
        var bufferedRanges = media.buffered.length;
        return (bufferedRanges ? media.buffered.end(bufferedRanges - 1) : levelDetails.edge) - this.currentTime;
      }
    }]);
    return LatencyController;
  }();

  var HdcpLevels = ['NONE', 'TYPE-0', 'TYPE-1', null];
  function isHdcpLevel(value) {
    return HdcpLevels.indexOf(value) > -1;
  }
  var VideoRangeValues = ['SDR', 'PQ', 'HLG'];
  function isVideoRange(value) {
    return !!value && VideoRangeValues.indexOf(value) > -1;
  }
  var HlsSkip = {
    No: "",
    Yes: "YES",
    v2: "v2"
  };
  function getSkipValue(details) {
    var canSkipUntil = details.canSkipUntil,
      canSkipDateRanges = details.canSkipDateRanges,
      age = details.age;
    // A Client SHOULD NOT request a Playlist Delta Update unless it already
    // has a version of the Playlist that is no older than one-half of the Skip Boundary.
    // @see: https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis#section-6.3.7
    var playlistRecentEnough = age < canSkipUntil / 2;
    if (canSkipUntil && playlistRecentEnough) {
      if (canSkipDateRanges) {
        return HlsSkip.v2;
      }
      return HlsSkip.Yes;
    }
    return HlsSkip.No;
  }
  var HlsUrlParameters = /*#__PURE__*/function () {
    function HlsUrlParameters(msn, part, skip) {
      this.msn = void 0;
      this.part = void 0;
      this.skip = void 0;
      this.msn = msn;
      this.part = part;
      this.skip = skip;
    }
    var _proto = HlsUrlParameters.prototype;
    _proto.addDirectives = function addDirectives(uri) {
      var url = new self.URL(uri);
      if (this.msn !== undefined) {
        url.searchParams.set('_HLS_msn', this.msn.toString());
      }
      if (this.part !== undefined) {
        url.searchParams.set('_HLS_part', this.part.toString());
      }
      if (this.skip) {
        url.searchParams.set('_HLS_skip', this.skip);
      }
      return url.href;
    };
    return HlsUrlParameters;
  }();
  var Level = /*#__PURE__*/function () {
    function Level(data) {
      this._attrs = void 0;
      this.audioCodec = void 0;
      this.bitrate = void 0;
      this.codecSet = void 0;
      this.url = void 0;
      this.frameRate = void 0;
      this.height = void 0;
      this.id = void 0;
      this.name = void 0;
      this.videoCodec = void 0;
      this.width = void 0;
      this.details = void 0;
      this.fragmentError = 0;
      this.loadError = 0;
      this.loaded = void 0;
      this.realBitrate = 0;
      this.supportedPromise = void 0;
      this.supportedResult = void 0;
      this._avgBitrate = 0;
      this._audioGroups = void 0;
      this._subtitleGroups = void 0;
      // Deprecated (retained for backwards compatibility)
      this._urlId = 0;
      this.url = [data.url];
      this._attrs = [data.attrs];
      this.bitrate = data.bitrate;
      if (data.details) {
        this.details = data.details;
      }
      this.id = data.id || 0;
      this.name = data.name;
      this.width = data.width || 0;
      this.height = data.height || 0;
      this.frameRate = data.attrs.optionalFloat('FRAME-RATE', 0);
      this._avgBitrate = data.attrs.decimalInteger('AVERAGE-BANDWIDTH');
      this.audioCodec = data.audioCodec;
      this.videoCodec = data.videoCodec;
      this.codecSet = [data.videoCodec, data.audioCodec].filter(function (c) {
        return !!c;
      }).map(function (s) {
        return s.substring(0, 4);
      }).join(',');
      this.addGroupId('audio', data.attrs.AUDIO);
      this.addGroupId('text', data.attrs.SUBTITLES);
    }
    var _proto2 = Level.prototype;
    _proto2.hasAudioGroup = function hasAudioGroup(groupId) {
      return hasGroup(this._audioGroups, groupId);
    };
    _proto2.hasSubtitleGroup = function hasSubtitleGroup(groupId) {
      return hasGroup(this._subtitleGroups, groupId);
    };
    _proto2.addGroupId = function addGroupId(type, groupId) {
      if (!groupId) {
        return;
      }
      if (type === 'audio') {
        var audioGroups = this._audioGroups;
        if (!audioGroups) {
          audioGroups = this._audioGroups = [];
        }
        if (audioGroups.indexOf(groupId) === -1) {
          audioGroups.push(groupId);
        }
      } else if (type === 'text') {
        var subtitleGroups = this._subtitleGroups;
        if (!subtitleGroups) {
          subtitleGroups = this._subtitleGroups = [];
        }
        if (subtitleGroups.indexOf(groupId) === -1) {
          subtitleGroups.push(groupId);
        }
      }
    }

    // Deprecated methods (retained for backwards compatibility)
    ;
    _proto2.addFallback = function addFallback() {};
    _createClass(Level, [{
      key: "maxBitrate",
      get: function get() {
        return Math.max(this.realBitrate, this.bitrate);
      }
    }, {
      key: "averageBitrate",
      get: function get() {
        return this._avgBitrate || this.realBitrate || this.bitrate;
      }
    }, {
      key: "attrs",
      get: function get() {
        return this._attrs[0];
      }
    }, {
      key: "codecs",
      get: function get() {
        return this.attrs.CODECS || '';
      }
    }, {
      key: "pathwayId",
      get: function get() {
        return this.attrs['PATHWAY-ID'] || '.';
      }
    }, {
      key: "videoRange",
      get: function get() {
        return this.attrs['VIDEO-RANGE'] || 'SDR';
      }
    }, {
      key: "score",
      get: function get() {
        return this.attrs.optionalFloat('SCORE', 0);
      }
    }, {
      key: "uri",
      get: function get() {
        return this.url[0] || '';
      }
    }, {
      key: "audioGroups",
      get: function get() {
        return this._audioGroups;
      }
    }, {
      key: "subtitleGroups",
      get: function get() {
        return this._subtitleGroups;
      }
    }, {
      key: "urlId",
      get: function get() {
        return 0;
      },
      set: function set(value) {}
    }, {
      key: "audioGroupIds",
      get: function get() {
        return this.audioGroups ? [this.audioGroupId] : undefined;
      }
    }, {
      key: "textGroupIds",
      get: function get() {
        return this.subtitleGroups ? [this.textGroupId] : undefined;
      }
    }, {
      key: "audioGroupId",
      get: function get() {
        var _this$audioGroups;
        return (_this$audioGroups = this.audioGroups) == null ? void 0 : _this$audioGroups[0];
      }
    }, {
      key: "textGroupId",
      get: function get() {
        var _this$subtitleGroups;
        return (_this$subtitleGroups = this.subtitleGroups) == null ? void 0 : _this$subtitleGroups[0];
      }
    }]);
    return Level;
  }();
  function hasGroup(groups, groupId) {
    if (!groupId || !groups) {
      return false;
    }
    return groups.indexOf(groupId) !== -1;
  }

  function updateFromToPTS(fragFrom, fragTo) {
    var fragToPTS = fragTo.startPTS;
    // if we know startPTS[toIdx]
    if (isFiniteNumber(fragToPTS)) {
      // update fragment duration.
      // it helps to fix drifts between playlist reported duration and fragment real duration
      var duration = 0;
      var frag;
      if (fragTo.sn > fragFrom.sn) {
        duration = fragToPTS - fragFrom.start;
        frag = fragFrom;
      } else {
        duration = fragFrom.start - fragToPTS;
        frag = fragTo;
      }
      if (frag.duration !== duration) {
        frag.duration = duration;
      }
      // we dont know startPTS[toIdx]
    } else if (fragTo.sn > fragFrom.sn) {
      var contiguous = fragFrom.cc === fragTo.cc;
      // TODO: With part-loading end/durations we need to confirm the whole fragment is loaded before using (or setting) minEndPTS
      if (contiguous && fragFrom.minEndPTS) {
        fragTo.start = fragFrom.start + (fragFrom.minEndPTS - fragFrom.start);
      } else {
        fragTo.start = fragFrom.start + fragFrom.duration;
      }
    } else {
      fragTo.start = Math.max(fragFrom.start - fragTo.duration, 0);
    }
  }
  function updateFragPTSDTS(details, frag, startPTS, endPTS, startDTS, endDTS) {
    var parsedMediaDuration = endPTS - startPTS;
    if (parsedMediaDuration <= 0) {
      logger.warn('Fragment should have a positive duration', frag);
      endPTS = startPTS + frag.duration;
      endDTS = startDTS + frag.duration;
    }
    var maxStartPTS = startPTS;
    var minEndPTS = endPTS;
    var fragStartPts = frag.startPTS;
    var fragEndPts = frag.endPTS;
    if (isFiniteNumber(fragStartPts)) {
      // delta PTS between audio and video
      var deltaPTS = Math.abs(fragStartPts - startPTS);
      if (!isFiniteNumber(frag.deltaPTS)) {
        frag.deltaPTS = deltaPTS;
      } else {
        frag.deltaPTS = Math.max(deltaPTS, frag.deltaPTS);
      }
      maxStartPTS = Math.max(startPTS, fragStartPts);
      startPTS = Math.min(startPTS, fragStartPts);
      startDTS = Math.min(startDTS, frag.startDTS);
      minEndPTS = Math.min(endPTS, fragEndPts);
      endPTS = Math.max(endPTS, fragEndPts);
      endDTS = Math.max(endDTS, frag.endDTS);
    }
    var drift = startPTS - frag.start;
    if (frag.start !== 0) {
      frag.start = startPTS;
    }
    frag.duration = endPTS - frag.start;
    frag.startPTS = startPTS;
    frag.maxStartPTS = maxStartPTS;
    frag.startDTS = startDTS;
    frag.endPTS = endPTS;
    frag.minEndPTS = minEndPTS;
    frag.endDTS = endDTS;
    var sn = frag.sn; // 'initSegment'
    // exit if sn out of range
    if (!details || sn < details.startSN || sn > details.endSN) {
      return 0;
    }
    var i;
    var fragIdx = sn - details.startSN;
    var fragments = details.fragments;
    // update frag reference in fragments array
    // rationale is that fragments array might not contain this frag object.
    // this will happen if playlist has been refreshed between frag loading and call to updateFragPTSDTS()
    // if we don't update frag, we won't be able to propagate PTS info on the playlist
    // resulting in invalid sliding computation
    fragments[fragIdx] = frag;
    // adjust fragment PTS/duration from seqnum-1 to frag 0
    for (i = fragIdx; i > 0; i--) {
      updateFromToPTS(fragments[i], fragments[i - 1]);
    }

    // adjust fragment PTS/duration from seqnum to last frag
    for (i = fragIdx; i < fragments.length - 1; i++) {
      updateFromToPTS(fragments[i], fragments[i + 1]);
    }
    if (details.fragmentHint) {
      updateFromToPTS(fragments[fragments.length - 1], details.fragmentHint);
    }
    details.PTSKnown = details.alignedSliding = true;
    return drift;
  }
  function mergeDetails(oldDetails, newDetails) {
    // Track the last initSegment processed. Initialize it to the last one on the timeline.
    var currentInitSegment = null;
    var oldFragments = oldDetails.fragments;
    for (var i = oldFragments.length - 1; i >= 0; i--) {
      var oldInit = oldFragments[i].initSegment;
      if (oldInit) {
        currentInitSegment = oldInit;
        break;
      }
    }
    if (oldDetails.fragmentHint) {
      // prevent PTS and duration from being adjusted on the next hint
      delete oldDetails.fragmentHint.endPTS;
    }
    // check if old/new playlists have fragments in common
    // loop through overlapping SN and update startPTS , cc, and duration if any found
    var ccOffset = 0;
    var PTSFrag;
    mapFragmentIntersection(oldDetails, newDetails, function (oldFrag, newFrag) {
      if (oldFrag.relurl) {
        // Do not compare CC if the old fragment has no url. This is a level.fragmentHint used by LL-HLS parts.
        // It maybe be off by 1 if it was created before any parts or discontinuity tags were appended to the end
        // of the playlist.
        ccOffset = oldFrag.cc - newFrag.cc;
      }
      if (isFiniteNumber(oldFrag.startPTS) && isFiniteNumber(oldFrag.endPTS)) {
        newFrag.start = newFrag.startPTS = oldFrag.startPTS;
        newFrag.startDTS = oldFrag.startDTS;
        newFrag.maxStartPTS = oldFrag.maxStartPTS;
        newFrag.endPTS = oldFrag.endPTS;
        newFrag.endDTS = oldFrag.endDTS;
        newFrag.minEndPTS = oldFrag.minEndPTS;
        newFrag.duration = oldFrag.endPTS - oldFrag.startPTS;
        if (newFrag.duration) {
          PTSFrag = newFrag;
        }

        // PTS is known when any segment has startPTS and endPTS
        newDetails.PTSKnown = newDetails.alignedSliding = true;
      }
      newFrag.elementaryStreams = oldFrag.elementaryStreams;
      newFrag.loader = oldFrag.loader;
      newFrag.stats = oldFrag.stats;
      if (oldFrag.initSegment) {
        newFrag.initSegment = oldFrag.initSegment;
        currentInitSegment = oldFrag.initSegment;
      }
    });
    if (currentInitSegment) {
      var fragmentsToCheck = newDetails.fragmentHint ? newDetails.fragments.concat(newDetails.fragmentHint) : newDetails.fragments;
      fragmentsToCheck.forEach(function (frag) {
        var _currentInitSegment;
        if (frag && (!frag.initSegment || frag.initSegment.relurl === ((_currentInitSegment = currentInitSegment) == null ? void 0 : _currentInitSegment.relurl))) {
          frag.initSegment = currentInitSegment;
        }
      });
    }
    if (newDetails.skippedSegments) {
      newDetails.deltaUpdateFailed = newDetails.fragments.some(function (frag) {
        return !frag;
      });
      if (newDetails.deltaUpdateFailed) {
        logger.warn('[level-helper] Previous playlist missing segments skipped in delta playlist');
        for (var _i = newDetails.skippedSegments; _i--;) {
          newDetails.fragments.shift();
        }
        newDetails.startSN = newDetails.fragments[0].sn;
        newDetails.startCC = newDetails.fragments[0].cc;
      } else if (newDetails.canSkipDateRanges) {
        newDetails.dateRanges = mergeDateRanges(oldDetails.dateRanges, newDetails.dateRanges, newDetails.recentlyRemovedDateranges);
      }
    }
    var newFragments = newDetails.fragments;
    if (ccOffset) {
      logger.warn('discontinuity sliding from playlist, take drift into account');
      for (var _i2 = 0; _i2 < newFragments.length; _i2++) {
        newFragments[_i2].cc += ccOffset;
      }
    }
    if (newDetails.skippedSegments) {
      newDetails.startCC = newDetails.fragments[0].cc;
    }

    // Merge parts
    mapPartIntersection(oldDetails.partList, newDetails.partList, function (oldPart, newPart) {
      newPart.elementaryStreams = oldPart.elementaryStreams;
      newPart.stats = oldPart.stats;
    });

    // if at least one fragment contains PTS info, recompute PTS information for all fragments
    if (PTSFrag) {
      updateFragPTSDTS(newDetails, PTSFrag, PTSFrag.startPTS, PTSFrag.endPTS, PTSFrag.startDTS, PTSFrag.endDTS);
    } else {
      // ensure that delta is within oldFragments range
      // also adjust sliding in case delta is 0 (we could have old=[50-60] and new=old=[50-61])
      // in that case we also need to adjust start offset of all fragments
      adjustSliding(oldDetails, newDetails);
    }
    if (newFragments.length) {
      newDetails.totalduration = newDetails.edge - newFragments[0].start;
    }
    newDetails.driftStartTime = oldDetails.driftStartTime;
    newDetails.driftStart = oldDetails.driftStart;
    var advancedDateTime = newDetails.advancedDateTime;
    if (newDetails.advanced && advancedDateTime) {
      var edge = newDetails.edge;
      if (!newDetails.driftStart) {
        newDetails.driftStartTime = advancedDateTime;
        newDetails.driftStart = edge;
      }
      newDetails.driftEndTime = advancedDateTime;
      newDetails.driftEnd = edge;
    } else {
      newDetails.driftEndTime = oldDetails.driftEndTime;
      newDetails.driftEnd = oldDetails.driftEnd;
      newDetails.advancedDateTime = oldDetails.advancedDateTime;
    }
  }
  function mergeDateRanges(oldDateRanges, deltaDateRanges, recentlyRemovedDateranges) {
    var dateRanges = _extends({}, oldDateRanges);
    if (recentlyRemovedDateranges) {
      recentlyRemovedDateranges.forEach(function (id) {
        delete dateRanges[id];
      });
    }
    Object.keys(deltaDateRanges).forEach(function (id) {
      var dateRange = new DateRange(deltaDateRanges[id].attr, dateRanges[id]);
      if (dateRange.isValid) {
        dateRanges[id] = dateRange;
      } else {
        logger.warn("Ignoring invalid Playlist Delta Update DATERANGE tag: \"" + JSON.stringify(deltaDateRanges[id].attr) + "\"");
      }
    });
    return dateRanges;
  }
  function mapPartIntersection(oldParts, newParts, intersectionFn) {
    if (oldParts && newParts) {
      var delta = 0;
      for (var i = 0, len = oldParts.length; i <= len; i++) {
        var _oldPart = oldParts[i];
        var _newPart = newParts[i + delta];
        if (_oldPart && _newPart && _oldPart.index === _newPart.index && _oldPart.fragment.sn === _newPart.fragment.sn) {
          intersectionFn(_oldPart, _newPart);
        } else {
          delta--;
        }
      }
    }
  }
  function mapFragmentIntersection(oldDetails, newDetails, intersectionFn) {
    var skippedSegments = newDetails.skippedSegments;
    var start = Math.max(oldDetails.startSN, newDetails.startSN) - newDetails.startSN;
    var end = (oldDetails.fragmentHint ? 1 : 0) + (skippedSegments ? newDetails.endSN : Math.min(oldDetails.endSN, newDetails.endSN)) - newDetails.startSN;
    var delta = newDetails.startSN - oldDetails.startSN;
    var newFrags = newDetails.fragmentHint ? newDetails.fragments.concat(newDetails.fragmentHint) : newDetails.fragments;
    var oldFrags = oldDetails.fragmentHint ? oldDetails.fragments.concat(oldDetails.fragmentHint) : oldDetails.fragments;
    for (var i = start; i <= end; i++) {
      var _oldFrag = oldFrags[delta + i];
      var _newFrag = newFrags[i];
      if (skippedSegments && !_newFrag && i < skippedSegments) {
        // Fill in skipped segments in delta playlist
        _newFrag = newDetails.fragments[i] = _oldFrag;
      }
      if (_oldFrag && _newFrag) {
        intersectionFn(_oldFrag, _newFrag);
      }
    }
  }
  function adjustSliding(oldDetails, newDetails) {
    var delta = newDetails.startSN + newDetails.skippedSegments - oldDetails.startSN;
    var oldFragments = oldDetails.fragments;
    if (delta < 0 || delta >= oldFragments.length) {
      return;
    }
    addSliding(newDetails, oldFragments[delta].start);
  }
  function addSliding(details, start) {
    if (start) {
      var fragments = details.fragments;
      for (var i = details.skippedSegments; i < fragments.length; i++) {
        fragments[i].start += start;
      }
      if (details.fragmentHint) {
        details.fragmentHint.start += start;
      }
    }
  }
  function computeReloadInterval(newDetails, distanceToLiveEdgeMs) {
    if (distanceToLiveEdgeMs === void 0) {
      distanceToLiveEdgeMs = Infinity;
    }
    var reloadInterval = 1000 * newDetails.targetduration;
    if (newDetails.updated) {
      // Use last segment duration when shorter than target duration and near live edge
      var fragments = newDetails.fragments;
      var liveEdgeMaxTargetDurations = 4;
      if (fragments.length && reloadInterval * liveEdgeMaxTargetDurations > distanceToLiveEdgeMs) {
        var lastSegmentDuration = fragments[fragments.length - 1].duration * 1000;
        if (lastSegmentDuration < reloadInterval) {
          reloadInterval = lastSegmentDuration;
        }
      }
    } else {
      // estimate = 'miss half average';
      // follow HLS Spec, If the client reloads a Playlist file and finds that it has not
      // changed then it MUST wait for a period of one-half the target
      // duration before retrying.
      reloadInterval /= 2;
    }
    return Math.round(reloadInterval);
  }
  function getFragmentWithSN(level, sn, fragCurrent) {
    if (!(level != null && level.details)) {
      return null;
    }
    var levelDetails = level.details;
    var fragment = levelDetails.fragments[sn - levelDetails.startSN];
    if (fragment) {
      return fragment;
    }
    fragment = levelDetails.fragmentHint;
    if (fragment && fragment.sn === sn) {
      return fragment;
    }
    if (sn < levelDetails.startSN && fragCurrent && fragCurrent.sn === sn) {
      return fragCurrent;
    }
    return null;
  }
  function getPartWith(level, sn, partIndex) {
    var _level$details;
    if (!(level != null && level.details)) {
      return null;
    }
    return findPart((_level$details = level.details) == null ? void 0 : _level$details.partList, sn, partIndex);
  }
  function findPart(partList, sn, partIndex) {
    if (partList) {
      for (var i = partList.length; i--;) {
        var part = partList[i];
        if (part.index === partIndex && part.fragment.sn === sn) {
          return part;
        }
      }
    }
    return null;
  }
  function reassignFragmentLevelIndexes(levels) {
    levels.forEach(function (level, index) {
      var details = level.details;
      if (details != null && details.fragments) {
        details.fragments.forEach(function (fragment) {
          fragment.level = index;
        });
      }
    });
  }

  function isTimeoutError(error) {
    switch (error.details) {
      case ErrorDetails.FRAG_LOAD_TIMEOUT:
      case ErrorDetails.KEY_LOAD_TIMEOUT:
      case ErrorDetails.LEVEL_LOAD_TIMEOUT:
      case ErrorDetails.MANIFEST_LOAD_TIMEOUT:
        return true;
    }
    return false;
  }
  function getRetryConfig(loadPolicy, error) {
    var isTimeout = isTimeoutError(error);
    return loadPolicy.default[(isTimeout ? 'timeout' : 'error') + "Retry"];
  }
  function getRetryDelay(retryConfig, retryCount) {
    // exponential backoff capped to max retry delay
    var backoffFactor = retryConfig.backoff === 'linear' ? 1 : Math.pow(2, retryCount);
    return Math.min(backoffFactor * retryConfig.retryDelayMs, retryConfig.maxRetryDelayMs);
  }
  function getLoaderConfigWithoutReties(loderConfig) {
    return _objectSpread2(_objectSpread2({}, loderConfig), {
      errorRetry: null,
      timeoutRetry: null
    });
  }
  function shouldRetry(retryConfig, retryCount, isTimeout, loaderResponse) {
    if (!retryConfig) {
      return false;
    }
    var httpStatus = loaderResponse == null ? void 0 : loaderResponse.code;
    var retry = retryCount < retryConfig.maxNumRetry && (retryForHttpStatus(httpStatus) || !!isTimeout);
    return retryConfig.shouldRetry ? retryConfig.shouldRetry(retryConfig, retryCount, isTimeout, loaderResponse, retry) : retry;
  }
  function retryForHttpStatus(httpStatus) {
    // Do not retry on status 4xx, status 0 (CORS error), or undefined (decrypt/gap/parse error)
    return httpStatus === 0 && navigator.onLine === false || !!httpStatus && (httpStatus < 400 || httpStatus > 499);
  }

  var BinarySearch = {
    /**
     * Searches for an item in an array which matches a certain condition.
     * This requires the condition to only match one item in the array,
     * and for the array to be ordered.
     *
     * @param list The array to search.
     * @param comparisonFn
     *      Called and provided a candidate item as the first argument.
     *      Should return:
     *          > -1 if the item should be located at a lower index than the provided item.
     *          > 1 if the item should be located at a higher index than the provided item.
     *          > 0 if the item is the item you're looking for.
     *
     * @returns the object if found, otherwise returns null
     */
    search: function search(list, comparisonFn) {
      var minIndex = 0;
      var maxIndex = list.length - 1;
      var currentIndex = null;
      var currentElement = null;
      while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = list[currentIndex];
        var comparisonResult = comparisonFn(currentElement);
        if (comparisonResult > 0) {
          minIndex = currentIndex + 1;
        } else if (comparisonResult < 0) {
          maxIndex = currentIndex - 1;
        } else {
          return currentElement;
        }
      }
      return null;
    }
  };

  /**
   * Returns first fragment whose endPdt value exceeds the given PDT, or null.
   * @param fragments - The array of candidate fragments
   * @param PDTValue - The PDT value which must be exceeded
   * @param maxFragLookUpTolerance - The amount of time that a fragment's start/end can be within in order to be considered contiguous
   */
  function findFragmentByPDT(fragments, PDTValue, maxFragLookUpTolerance) {
    if (PDTValue === null || !Array.isArray(fragments) || !fragments.length || !isFiniteNumber(PDTValue)) {
      return null;
    }

    // if less than start
    var startPDT = fragments[0].programDateTime;
    if (PDTValue < (startPDT || 0)) {
      return null;
    }
    var endPDT = fragments[fragments.length - 1].endProgramDateTime;
    if (PDTValue >= (endPDT || 0)) {
      return null;
    }
    maxFragLookUpTolerance = maxFragLookUpTolerance || 0;
    for (var seg = 0; seg < fragments.length; ++seg) {
      var frag = fragments[seg];
      if (pdtWithinToleranceTest(PDTValue, maxFragLookUpTolerance, frag)) {
        return frag;
      }
    }
    return null;
  }

  /**
   * Finds a fragment based on the SN of the previous fragment; or based on the needs of the current buffer.
   * This method compensates for small buffer gaps by applying a tolerance to the start of any candidate fragment, thus
   * breaking any traps which would cause the same fragment to be continuously selected within a small range.
   * @param fragPrevious - The last frag successfully appended
   * @param fragments - The array of candidate fragments
   * @param bufferEnd - The end of the contiguous buffered range the playhead is currently within
   * @param maxFragLookUpTolerance - The amount of time that a fragment's start/end can be within in order to be considered contiguous
   * @returns a matching fragment or null
   */
  function findFragmentByPTS(fragPrevious, fragments, bufferEnd, maxFragLookUpTolerance) {
    if (bufferEnd === void 0) {
      bufferEnd = 0;
    }
    if (maxFragLookUpTolerance === void 0) {
      maxFragLookUpTolerance = 0;
    }
    var fragNext = null;
    if (fragPrevious) {
      fragNext = fragments[fragPrevious.sn - fragments[0].sn + 1] || null;
      // check for buffer-end rounding error
      var bufferEdgeError = fragPrevious.endDTS - bufferEnd;
      if (bufferEdgeError > 0 && bufferEdgeError < 0.0000015) {
        bufferEnd += 0.0000015;
      }
    } else if (bufferEnd === 0 && fragments[0].start === 0) {
      fragNext = fragments[0];
    }
    // Prefer the next fragment if it's within tolerance
    if (fragNext && (!fragPrevious || fragPrevious.level === fragNext.level) && fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, fragNext) === 0) {
      return fragNext;
    }
    // We might be seeking past the tolerance so find the best match
    var foundFragment = BinarySearch.search(fragments, fragmentWithinToleranceTest.bind(null, bufferEnd, maxFragLookUpTolerance));
    if (foundFragment && (foundFragment !== fragPrevious || !fragNext)) {
      return foundFragment;
    }
    // If no match was found return the next fragment after fragPrevious, or null
    return fragNext;
  }

  /**
   * The test function used by the findFragmentBySn's BinarySearch to look for the best match to the current buffer conditions.
   * @param candidate - The fragment to test
   * @param bufferEnd - The end of the current buffered range the playhead is currently within
   * @param maxFragLookUpTolerance - The amount of time that a fragment's start can be within in order to be considered contiguous
   * @returns 0 if it matches, 1 if too low, -1 if too high
   */
  function fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, candidate) {
    if (bufferEnd === void 0) {
      bufferEnd = 0;
    }
    if (maxFragLookUpTolerance === void 0) {
      maxFragLookUpTolerance = 0;
    }
    // eagerly accept an accurate match (no tolerance)
    if (candidate.start <= bufferEnd && candidate.start + candidate.duration > bufferEnd) {
      return 0;
    }
    // offset should be within fragment boundary - config.maxFragLookUpTolerance
    // this is to cope with situations like
    // bufferEnd = 9.991
    // frag[Ø] : [0,10]
    // frag[1] : [10,20]
    // bufferEnd is within frag[0] range ... although what we are expecting is to return frag[1] here
    //              frag start               frag start+duration
    //                  |-----------------------------|
    //              <--->                         <--->
    //  ...--------><-----------------------------><---------....
    // previous frag         matching fragment         next frag
    //  return -1             return 0                 return 1
    // logger.log(`level/sn/start/end/bufEnd:${level}/${candidate.sn}/${candidate.start}/${(candidate.start+candidate.duration)}/${bufferEnd}`);
    // Set the lookup tolerance to be small enough to detect the current segment - ensures we don't skip over very small segments
    var candidateLookupTolerance = Math.min(maxFragLookUpTolerance, candidate.duration + (candidate.deltaPTS ? candidate.deltaPTS : 0));
    if (candidate.start + candidate.duration - candidateLookupTolerance <= bufferEnd) {
      return 1;
    } else if (candidate.start - candidateLookupTolerance > bufferEnd && candidate.start) {
      // if maxFragLookUpTolerance will have negative value then don't return -1 for first element
      return -1;
    }
    return 0;
  }

  /**
   * The test function used by the findFragmentByPdt's BinarySearch to look for the best match to the current buffer conditions.
   * This function tests the candidate's program date time values, as represented in Unix time
   * @param candidate - The fragment to test
   * @param pdtBufferEnd - The Unix time representing the end of the current buffered range
   * @param maxFragLookUpTolerance - The amount of time that a fragment's start can be within in order to be considered contiguous
   * @returns true if contiguous, false otherwise
   */
  function pdtWithinToleranceTest(pdtBufferEnd, maxFragLookUpTolerance, candidate) {
    var candidateLookupTolerance = Math.min(maxFragLookUpTolerance, candidate.duration + (candidate.deltaPTS ? candidate.deltaPTS : 0)) * 1000;

    // endProgramDateTime can be null, default to zero
    var endProgramDateTime = candidate.endProgramDateTime || 0;
    return endProgramDateTime - candidateLookupTolerance > pdtBufferEnd;
  }
  function findFragWithCC(fragments, cc) {
    return BinarySearch.search(fragments, function (candidate) {
      if (candidate.cc < cc) {
        return 1;
      } else if (candidate.cc > cc) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  var NetworkErrorAction = {
    DoNothing: 0,
    SendEndCallback: 1,
    SendAlternateToPenaltyBox: 2,
    RemoveAlternatePermanently: 3,
    InsertDiscontinuity: 4,
    RetryRequest: 5
  };
  var ErrorActionFlags = {
    None: 0,
    MoveAllAlternatesMatchingHost: 1,
    MoveAllAlternatesMatchingHDCP: 2,
    SwitchToSDR: 4
  }; // Reserved for future use
  var ErrorController = /*#__PURE__*/function () {
    function ErrorController(hls) {
      this.hls = void 0;
      this.playlistError = 0;
      this.penalizedRenditions = {};
      this.log = void 0;
      this.warn = void 0;
      this.error = void 0;
      this.hls = hls;
      this.log = logger.log.bind(logger, "[info]:");
      this.warn = logger.warn.bind(logger, "[warning]:");
      this.error = logger.error.bind(logger, "[error]:");
      this.registerListeners();
    }
    var _proto = ErrorController.prototype;
    _proto.registerListeners = function registerListeners() {
      var hls = this.hls;
      hls.on(Events.ERROR, this.onError, this);
      hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.on(Events.LEVEL_UPDATED, this.onLevelUpdated, this);
    };
    _proto.unregisterListeners = function unregisterListeners() {
      var hls = this.hls;
      if (!hls) {
        return;
      }
      hls.off(Events.ERROR, this.onError, this);
      hls.off(Events.ERROR, this.onErrorOut, this);
      hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.off(Events.LEVEL_UPDATED, this.onLevelUpdated, this);
    };
    _proto.destroy = function destroy() {
      this.unregisterListeners();
      // @ts-ignore
      this.hls = null;
      this.penalizedRenditions = {};
    };
    _proto.startLoad = function startLoad(startPosition) {};
    _proto.stopLoad = function stopLoad() {
      this.playlistError = 0;
    };
    _proto.getVariantLevelIndex = function getVariantLevelIndex(frag) {
      return (frag == null ? void 0 : frag.type) === PlaylistLevelType.MAIN ? frag.level : this.hls.loadLevel;
    };
    _proto.onManifestLoading = function onManifestLoading() {
      this.playlistError = 0;
      this.penalizedRenditions = {};
    };
    _proto.onLevelUpdated = function onLevelUpdated() {
      this.playlistError = 0;
    };
    _proto.onError = function onError(event, data) {
      var _data$frag, _data$level;
      if (data.fatal) {
        return;
      }
      var hls = this.hls;
      var context = data.context;
      switch (data.details) {
        case ErrorDetails.FRAG_LOAD_ERROR:
        case ErrorDetails.FRAG_LOAD_TIMEOUT:
        case ErrorDetails.KEY_LOAD_ERROR:
        case ErrorDetails.KEY_LOAD_TIMEOUT:
          data.errorAction = this.getFragRetryOrSwitchAction(data);
          return;
        case ErrorDetails.FRAG_PARSING_ERROR:
          // ignore empty segment errors marked as gap
          if ((_data$frag = data.frag) != null && _data$frag.gap) {
            data.errorAction = {
              action: NetworkErrorAction.DoNothing,
              flags: ErrorActionFlags.None
            };
            return;
          }
        // falls through
        case ErrorDetails.FRAG_GAP:
        case ErrorDetails.FRAG_DECRYPT_ERROR:
          {
            // Switch level if possible, otherwise allow retry count to reach max error retries
            data.errorAction = this.getFragRetryOrSwitchAction(data);
            data.errorAction.action = NetworkErrorAction.SendAlternateToPenaltyBox;
            return;
          }
        case ErrorDetails.LEVEL_EMPTY_ERROR:
        case ErrorDetails.LEVEL_PARSING_ERROR:
          {
            var _data$context, _data$context$levelDe;
            // Only retry when empty and live
            var levelIndex = data.parent === PlaylistLevelType.MAIN ? data.level : hls.loadLevel;
            if (data.details === ErrorDetails.LEVEL_EMPTY_ERROR && !!((_data$context = data.context) != null && (_data$context$levelDe = _data$context.levelDetails) != null && _data$context$levelDe.live)) {
              data.errorAction = this.getPlaylistRetryOrSwitchAction(data, levelIndex);
            } else {
              // Escalate to fatal if not retrying or switching
              data.levelRetry = false;
              data.errorAction = this.getLevelSwitchAction(data, levelIndex);
            }
          }
          return;
        case ErrorDetails.LEVEL_LOAD_ERROR:
        case ErrorDetails.LEVEL_LOAD_TIMEOUT:
          if (typeof (context == null ? void 0 : context.level) === 'number') {
            data.errorAction = this.getPlaylistRetryOrSwitchAction(data, context.level);
          }
          return;
        case ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
        case ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
        case ErrorDetails.SUBTITLE_LOAD_ERROR:
        case ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT:
          if (context) {
            var level = hls.levels[hls.loadLevel];
            if (level && (context.type === PlaylistContextType.AUDIO_TRACK && level.hasAudioGroup(context.groupId) || context.type === PlaylistContextType.SUBTITLE_TRACK && level.hasSubtitleGroup(context.groupId))) {
              // Perform Pathway switch or Redundant failover if possible for fastest recovery
              // otherwise allow playlist retry count to reach max error retries
              data.errorAction = this.getPlaylistRetryOrSwitchAction(data, hls.loadLevel);
              data.errorAction.action = NetworkErrorAction.SendAlternateToPenaltyBox;
              data.errorAction.flags = ErrorActionFlags.MoveAllAlternatesMatchingHost;
              return;
            }
          }
          return;
        case ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:
          {
            var _level = hls.levels[hls.loadLevel];
            var restrictedHdcpLevel = _level == null ? void 0 : _level.attrs['HDCP-LEVEL'];
            if (restrictedHdcpLevel) {
              data.errorAction = {
                action: NetworkErrorAction.SendAlternateToPenaltyBox,
                flags: ErrorActionFlags.MoveAllAlternatesMatchingHDCP,
                hdcpLevel: restrictedHdcpLevel
              };
            } else {
              this.keySystemError(data);
            }
          }
          return;
        case ErrorDetails.BUFFER_ADD_CODEC_ERROR:
        case ErrorDetails.REMUX_ALLOC_ERROR:
        case ErrorDetails.BUFFER_APPEND_ERROR:
          data.errorAction = this.getLevelSwitchAction(data, (_data$level = data.level) != null ? _data$level : hls.loadLevel);
          return;
        case ErrorDetails.INTERNAL_EXCEPTION:
        case ErrorDetails.BUFFER_APPENDING_ERROR:
        case ErrorDetails.BUFFER_FULL_ERROR:
        case ErrorDetails.LEVEL_SWITCH_ERROR:
        case ErrorDetails.BUFFER_STALLED_ERROR:
        case ErrorDetails.BUFFER_SEEK_OVER_HOLE:
        case ErrorDetails.BUFFER_NUDGE_ON_STALL:
          data.errorAction = {
            action: NetworkErrorAction.DoNothing,
            flags: ErrorActionFlags.None
          };
          return;
      }
      if (data.type === ErrorTypes.KEY_SYSTEM_ERROR) {
        this.keySystemError(data);
      }
    };
    _proto.keySystemError = function keySystemError(data) {
      var levelIndex = this.getVariantLevelIndex(data.frag);
      // Do not retry level. Escalate to fatal if switching levels fails.
      data.levelRetry = false;
      data.errorAction = this.getLevelSwitchAction(data, levelIndex);
    };
    _proto.getPlaylistRetryOrSwitchAction = function getPlaylistRetryOrSwitchAction(data, levelIndex) {
      var hls = this.hls;
      var retryConfig = getRetryConfig(hls.config.playlistLoadPolicy, data);
      var retryCount = this.playlistError++;
      var retry = shouldRetry(retryConfig, retryCount, isTimeoutError(data), data.response);
      if (retry) {
        return {
          action: NetworkErrorAction.RetryRequest,
          flags: ErrorActionFlags.None,
          retryConfig: retryConfig,
          retryCount: retryCount
        };
      }
      var errorAction = this.getLevelSwitchAction(data, levelIndex);
      if (retryConfig) {
        errorAction.retryConfig = retryConfig;
        errorAction.retryCount = retryCount;
      }
      return errorAction;
    };
    _proto.getFragRetryOrSwitchAction = function getFragRetryOrSwitchAction(data) {
      var hls = this.hls;
      // Share fragment error count accross media options (main, audio, subs)
      // This allows for level based rendition switching when media option assets fail
      var variantLevelIndex = this.getVariantLevelIndex(data.frag);
      var level = hls.levels[variantLevelIndex];
      var _hls$config = hls.config,
        fragLoadPolicy = _hls$config.fragLoadPolicy,
        keyLoadPolicy = _hls$config.keyLoadPolicy;
      var retryConfig = getRetryConfig(data.details.startsWith('key') ? keyLoadPolicy : fragLoadPolicy, data);
      var fragmentErrors = hls.levels.reduce(function (acc, level) {
        return acc + level.fragmentError;
      }, 0);
      // Switch levels when out of retried or level index out of bounds
      if (level) {
        if (data.details !== ErrorDetails.FRAG_GAP) {
          level.fragmentError++;
        }
        var retry = shouldRetry(retryConfig, fragmentErrors, isTimeoutError(data), data.response);
        if (retry) {
          return {
            action: NetworkErrorAction.RetryRequest,
            flags: ErrorActionFlags.None,
            retryConfig: retryConfig,
            retryCount: fragmentErrors
          };
        }
      }
      // Reach max retry count, or Missing level reference
      // Switch to valid index
      var errorAction = this.getLevelSwitchAction(data, variantLevelIndex);
      // Add retry details to allow skipping of FRAG_PARSING_ERROR
      if (retryConfig) {
        errorAction.retryConfig = retryConfig;
        errorAction.retryCount = fragmentErrors;
      }
      return errorAction;
    };
    _proto.getLevelSwitchAction = function getLevelSwitchAction(data, levelIndex) {
      var hls = this.hls;
      if (levelIndex === null || levelIndex === undefined) {
        levelIndex = hls.loadLevel;
      }
      var level = this.hls.levels[levelIndex];
      if (level) {
        var _data$frag2, _data$context2;
        var errorDetails = data.details;
        level.loadError++;
        if (errorDetails === ErrorDetails.BUFFER_APPEND_ERROR) {
          level.fragmentError++;
        }
        // Search for next level to retry
        var nextLevel = -1;
        var levels = hls.levels,
          loadLevel = hls.loadLevel,
          minAutoLevel = hls.minAutoLevel,
          maxAutoLevel = hls.maxAutoLevel;
        if (!hls.autoLevelEnabled) {
          hls.loadLevel = -1;
        }
        var fragErrorType = (_data$frag2 = data.frag) == null ? void 0 : _data$frag2.type;
        // Find alternate audio codec if available on audio codec error
        var isAudioCodecError = fragErrorType === PlaylistLevelType.AUDIO && errorDetails === ErrorDetails.FRAG_PARSING_ERROR || data.sourceBufferName === 'audio' && (errorDetails === ErrorDetails.BUFFER_ADD_CODEC_ERROR || errorDetails === ErrorDetails.BUFFER_APPEND_ERROR);
        var findAudioCodecAlternate = isAudioCodecError && levels.some(function (_ref) {
          var audioCodec = _ref.audioCodec;
          return level.audioCodec !== audioCodec;
        });
        // Find alternate video codec if available on video codec error
        var isVideoCodecError = data.sourceBufferName === 'video' && (errorDetails === ErrorDetails.BUFFER_ADD_CODEC_ERROR || errorDetails === ErrorDetails.BUFFER_APPEND_ERROR);
        var findVideoCodecAlternate = isVideoCodecError && levels.some(function (_ref2) {
          var codecSet = _ref2.codecSet,
            audioCodec = _ref2.audioCodec;
          return level.codecSet !== codecSet && level.audioCodec === audioCodec;
        });
        var _ref3 = (_data$context2 = data.context) != null ? _data$context2 : {},
          playlistErrorType = _ref3.type,
          playlistErrorGroupId = _ref3.groupId;
        var _loop = function _loop() {
            var candidate = (i + loadLevel) % levels.length;
            if (candidate !== loadLevel && candidate >= minAutoLevel && candidate <= maxAutoLevel && levels[candidate].loadError === 0) {
              var _level$audioGroups, _level$subtitleGroups;
              var levelCandidate = levels[candidate];
              // Skip level switch if GAP tag is found in next level at same position
              if (errorDetails === ErrorDetails.FRAG_GAP && data.frag) {
                var levelDetails = levels[candidate].details;
                if (levelDetails) {
                  var fragCandidate = findFragmentByPTS(data.frag, levelDetails.fragments, data.frag.start);
                  if (fragCandidate != null && fragCandidate.gap) {
                    return 0; // continue
                  }
                }
              } else if (playlistErrorType === PlaylistContextType.AUDIO_TRACK && levelCandidate.hasAudioGroup(playlistErrorGroupId) || playlistErrorType === PlaylistContextType.SUBTITLE_TRACK && levelCandidate.hasSubtitleGroup(playlistErrorGroupId)) {
                // For audio/subs playlist errors find another group ID or fallthrough to redundant fail-over
                return 0; // continue
              } else if (fragErrorType === PlaylistLevelType.AUDIO && (_level$audioGroups = level.audioGroups) != null && _level$audioGroups.some(function (groupId) {
                return levelCandidate.hasAudioGroup(groupId);
              }) || fragErrorType === PlaylistLevelType.SUBTITLE && (_level$subtitleGroups = level.subtitleGroups) != null && _level$subtitleGroups.some(function (groupId) {
                return levelCandidate.hasSubtitleGroup(groupId);
              }) || findAudioCodecAlternate && level.audioCodec === levelCandidate.audioCodec || !findAudioCodecAlternate && level.audioCodec !== levelCandidate.audioCodec || findVideoCodecAlternate && level.codecSet === levelCandidate.codecSet) {
                // For video/audio/subs frag errors find another group ID or fallthrough to redundant fail-over
                return 0; // continue
              }
              nextLevel = candidate;
              return 1; // break
            }
          },
          _ret;
        for (var i = levels.length; i--;) {
          _ret = _loop();
          if (_ret === 0) continue;
          if (_ret === 1) break;
        }
        if (nextLevel > -1 && hls.loadLevel !== nextLevel) {
          data.levelRetry = true;
          this.playlistError = 0;
          return {
            action: NetworkErrorAction.SendAlternateToPenaltyBox,
            flags: ErrorActionFlags.None,
            nextAutoLevel: nextLevel
          };
        }
      }
      // No levels to switch / Manual level selection / Level not found
      // Resolve with Pathway switch, Redundant fail-over, or stay on lowest Level
      return {
        action: NetworkErrorAction.SendAlternateToPenaltyBox,
        flags: ErrorActionFlags.MoveAllAlternatesMatchingHost
      };
    };
    _proto.onErrorOut = function onErrorOut(event, data) {
      var _data$errorAction;
      switch ((_data$errorAction = data.errorAction) == null ? void 0 : _data$errorAction.action) {
        case NetworkErrorAction.DoNothing:
          break;
        case NetworkErrorAction.SendAlternateToPenaltyBox:
          this.sendAlternateToPenaltyBox(data);
          if (!data.errorAction.resolved && data.details !== ErrorDetails.FRAG_GAP) {
            data.fatal = true;
          } else if (/MediaSource readyState: ended/.test(data.error.message)) {
            this.warn("MediaSource ended after \"" + data.sourceBufferName + "\" sourceBuffer append error. Attempting to recover from media error.");
            this.hls.recoverMediaError();
          }
          break;
      }
      if (data.fatal) {
        this.hls.stopLoad();
        return;
      }
    };
    _proto.sendAlternateToPenaltyBox = function sendAlternateToPenaltyBox(data) {
      var hls = this.hls;
      var errorAction = data.errorAction;
      if (!errorAction) {
        return;
      }
      var flags = errorAction.flags,
        hdcpLevel = errorAction.hdcpLevel,
        nextAutoLevel = errorAction.nextAutoLevel;
      switch (flags) {
        case ErrorActionFlags.None:
          this.switchLevel(data, nextAutoLevel);
          break;
        case ErrorActionFlags.MoveAllAlternatesMatchingHDCP:
          if (hdcpLevel) {
            hls.maxHdcpLevel = HdcpLevels[HdcpLevels.indexOf(hdcpLevel) - 1];
            errorAction.resolved = true;
          }
          this.warn("Restricting playback to HDCP-LEVEL of \"" + hls.maxHdcpLevel + "\" or lower");
          break;
      }
      // If not resolved by previous actions try to switch to next level
      if (!errorAction.resolved) {
        this.switchLevel(data, nextAutoLevel);
      }
    };
    _proto.switchLevel = function switchLevel(data, levelIndex) {
      if (levelIndex !== undefined && data.errorAction) {
        this.warn("switching to level " + levelIndex + " after " + data.details);
        this.hls.nextAutoLevel = levelIndex;
        data.errorAction.resolved = true;
        // Stream controller is responsible for this but won't switch on false start
        this.hls.nextLoadLevel = this.hls.nextAutoLevel;
      }
    };
    return ErrorController;
  }();

  var BasePlaylistController = /*#__PURE__*/function () {
    function BasePlaylistController(hls, logPrefix) {
      this.hls = void 0;
      this.timer = -1;
      this.requestScheduled = -1;
      this.canLoad = false;
      this.log = void 0;
      this.warn = void 0;
      this.log = logger.log.bind(logger, logPrefix + ":");
      this.warn = logger.warn.bind(logger, logPrefix + ":");
      this.hls = hls;
    }
    var _proto = BasePlaylistController.prototype;
    _proto.destroy = function destroy() {
      this.clearTimer();
      // @ts-ignore
      this.hls = this.log = this.warn = null;
    };
    _proto.clearTimer = function clearTimer() {
      if (this.timer !== -1) {
        self.clearTimeout(this.timer);
        this.timer = -1;
      }
    };
    _proto.startLoad = function startLoad() {
      this.canLoad = true;
      this.requestScheduled = -1;
      this.loadPlaylist();
    };
    _proto.stopLoad = function stopLoad() {
      this.canLoad = false;
      this.clearTimer();
    };
    _proto.switchParams = function switchParams(playlistUri, previous, current) {
      var renditionReports = previous == null ? void 0 : previous.renditionReports;
      if (renditionReports) {
        var foundIndex = -1;
        for (var i = 0; i < renditionReports.length; i++) {
          var attr = renditionReports[i];
          var uri = void 0;
          try {
            uri = new self.URL(attr.URI, previous.url).href;
          } catch (error) {
            logger.warn("Could not construct new URL for Rendition Report: " + error);
            uri = attr.URI || '';
          }
          // Use exact match. Otherwise, the last partial match, if any, will be used
          // (Playlist URI includes a query string that the Rendition Report does not)
          if (uri === playlistUri) {
            foundIndex = i;
            break;
          } else if (uri === playlistUri.substring(0, uri.length)) {
            foundIndex = i;
          }
        }
        if (foundIndex !== -1) {
          var _attr = renditionReports[foundIndex];
          var msn = parseInt(_attr['LAST-MSN']) || (previous == null ? void 0 : previous.lastPartSn);
          var part = parseInt(_attr['LAST-PART']) || (previous == null ? void 0 : previous.lastPartIndex);
          if (this.hls.config.lowLatencyMode) {
            var currentGoal = Math.min(previous.age - previous.partTarget, previous.targetduration);
            if (part >= 0 && currentGoal > previous.partTarget) {
              part += 1;
            }
          }
          var skip = current && getSkipValue(current);
          return new HlsUrlParameters(msn, part >= 0 ? part : undefined, skip);
        }
      }
    };
    _proto.loadPlaylist = function loadPlaylist(hlsUrlParameters) {
      if (this.requestScheduled === -1) {
        this.requestScheduled = self.performance.now();
      }
      // Loading is handled by the subclasses
    };
    _proto.shouldLoadPlaylist = function shouldLoadPlaylist(playlist) {
      return this.canLoad && !!playlist && !!playlist.url && (!playlist.details || playlist.details.live);
    };
    _proto.shouldReloadPlaylist = function shouldReloadPlaylist(playlist) {
      return this.timer === -1 && this.requestScheduled === -1 && this.shouldLoadPlaylist(playlist);
    };
    _proto.playlistLoaded = function playlistLoaded(index, data, previousDetails) {
      var _this = this;
      var details = data.details,
        stats = data.stats;

      // Set last updated date-time
      var now = self.performance.now();
      var elapsed = stats.loading.first ? Math.max(0, now - stats.loading.first) : 0;
      details.advancedDateTime = Date.now() - elapsed;

      // if current playlist is a live playlist, arm a timer to reload it
      if (details.live || previousDetails != null && previousDetails.live) {
        details.reloaded(previousDetails);
        if (previousDetails) {
          this.log("live playlist " + index + " " + (details.advanced ? 'REFRESHED ' + details.lastPartSn + '-' + details.lastPartIndex : details.updated ? 'UPDATED' : 'MISSED'));
        }
        // Merge live playlists to adjust fragment starts and fill in delta playlist skipped segments
        if (previousDetails && details.fragments.length > 0) {
          mergeDetails(previousDetails, details);
        }
        if (!this.canLoad || !details.live) {
          return;
        }
        var deliveryDirectives;
        var msn = undefined;
        var part = undefined;
        if (details.canBlockReload && details.endSN && details.advanced) {
          // Load level with LL-HLS delivery directives
          var lowLatencyMode = this.hls.config.lowLatencyMode;
          var lastPartSn = details.lastPartSn;
          var endSn = details.endSN;
          var lastPartIndex = details.lastPartIndex;
          var hasParts = lastPartIndex !== -1;
          var lastPart = lastPartSn === endSn;
          // When low latency mode is disabled, we'll skip part requests once the last part index is found
          var nextSnStartIndex = lowLatencyMode ? 0 : lastPartIndex;
          if (hasParts) {
            msn = lastPart ? endSn + 1 : lastPartSn;
            part = lastPart ? nextSnStartIndex : lastPartIndex + 1;
          } else {
            msn = endSn + 1;
          }
          // Low-Latency CDN Tune-in: "age" header and time since load indicates we're behind by more than one part
          // Update directives to obtain the Playlist that has the estimated additional duration of media
          var lastAdvanced = details.age;
          var cdnAge = lastAdvanced + details.ageHeader;
          var currentGoal = Math.min(cdnAge - details.partTarget, details.targetduration * 1.5);
          if (currentGoal > 0) {
            if (previousDetails && currentGoal > previousDetails.tuneInGoal) {
              // If we attempted to get the next or latest playlist update, but currentGoal increased,
              // then we either can't catchup, or the "age" header cannot be trusted.
              this.warn("CDN Tune-in goal increased from: " + previousDetails.tuneInGoal + " to: " + currentGoal + " with playlist age: " + details.age);
              currentGoal = 0;
            } else {
              var segments = Math.floor(currentGoal / details.targetduration);
              msn += segments;
              if (part !== undefined) {
                var parts = Math.round(currentGoal % details.targetduration / details.partTarget);
                part += parts;
              }
              this.log("CDN Tune-in age: " + details.ageHeader + "s last advanced " + lastAdvanced.toFixed(2) + "s goal: " + currentGoal + " skip sn " + segments + " to part " + part);
            }
            details.tuneInGoal = currentGoal;
          }
          deliveryDirectives = this.getDeliveryDirectives(details, data.deliveryDirectives, msn, part);
          if (lowLatencyMode || !lastPart) {
            this.loadPlaylist(deliveryDirectives);
            return;
          }
        } else if (details.canBlockReload || details.canSkipUntil) {
          deliveryDirectives = this.getDeliveryDirectives(details, data.deliveryDirectives, msn, part);
        }
        var bufferInfo = this.hls.mainForwardBufferInfo;
        var position = bufferInfo ? bufferInfo.end - bufferInfo.len : 0;
        var distanceToLiveEdgeMs = (details.edge - position) * 1000;
        var reloadInterval = computeReloadInterval(details, distanceToLiveEdgeMs);
        if (details.updated && now > this.requestScheduled + reloadInterval) {
          this.requestScheduled = stats.loading.start;
        }
        if (msn !== undefined && details.canBlockReload) {
          this.requestScheduled = stats.loading.first + reloadInterval - (details.partTarget * 1000 || 1000);
        } else if (this.requestScheduled === -1 || this.requestScheduled + reloadInterval < now) {
          this.requestScheduled = now;
        } else if (this.requestScheduled - now <= 0) {
          this.requestScheduled += reloadInterval;
        }
        var estimatedTimeUntilUpdate = this.requestScheduled - now;
        estimatedTimeUntilUpdate = Math.max(0, estimatedTimeUntilUpdate);
        this.log("reload live playlist " + index + " in " + Math.round(estimatedTimeUntilUpdate) + " ms");
        // this.log(
        //   `live reload ${details.updated ? 'REFRESHED' : 'MISSED'}
        // reload in ${estimatedTimeUntilUpdate / 1000}
        // round trip ${(stats.loading.end - stats.loading.start) / 1000}
        // diff ${
        //   (reloadInterval -
        //     (estimatedTimeUntilUpdate +
        //       stats.loading.end -
        //       stats.loading.start)) /
        //   1000
        // }
        // reload interval ${reloadInterval / 1000}
        // target duration ${details.targetduration}
        // distance to edge ${distanceToLiveEdgeMs / 1000}`
        // );

        this.timer = self.setTimeout(function () {
          return _this.loadPlaylist(deliveryDirectives);
        }, estimatedTimeUntilUpdate);
      } else {
        this.clearTimer();
      }
    };
    _proto.getDeliveryDirectives = function getDeliveryDirectives(details, previousDeliveryDirectives, msn, part) {
      var skip = getSkipValue(details);
      if (previousDeliveryDirectives != null && previousDeliveryDirectives.skip && details.deltaUpdateFailed) {
        msn = previousDeliveryDirectives.msn;
        part = previousDeliveryDirectives.part;
        skip = HlsSkip.No;
      }
      return new HlsUrlParameters(msn, part, skip);
    };
    _proto.checkRetry = function checkRetry(errorEvent) {
      var _this2 = this;
      var errorDetails = errorEvent.details;
      var isTimeout = isTimeoutError(errorEvent);
      var errorAction = errorEvent.errorAction;
      var _ref = errorAction || {},
        action = _ref.action,
        _ref$retryCount = _ref.retryCount,
        retryCount = _ref$retryCount === void 0 ? 0 : _ref$retryCount,
        retryConfig = _ref.retryConfig;
      var retry = !!errorAction && !!retryConfig && (action === NetworkErrorAction.RetryRequest || !errorAction.resolved && action === NetworkErrorAction.SendAlternateToPenaltyBox);
      if (retry) {
        var _errorEvent$context;
        this.requestScheduled = -1;
        if (retryCount >= retryConfig.maxNumRetry) {
          return false;
        }
        if (isTimeout && (_errorEvent$context = errorEvent.context) != null && _errorEvent$context.deliveryDirectives) {
          // The LL-HLS request already timed out so retry immediately
          this.warn("Retrying playlist loading " + (retryCount + 1) + "/" + retryConfig.maxNumRetry + " after \"" + errorDetails + "\" without delivery-directives");
          this.loadPlaylist();
        } else {
          var delay = getRetryDelay(retryConfig, retryCount);
          // Schedule level/track reload
          this.timer = self.setTimeout(function () {
            return _this2.loadPlaylist();
          }, delay);
          this.warn("Retrying playlist loading " + (retryCount + 1) + "/" + retryConfig.maxNumRetry + " after \"" + errorDetails + "\" in " + delay + "ms");
        }
        // `levelRetry = true` used to inform other controllers that a retry is happening
        errorEvent.levelRetry = true;
        errorAction.resolved = true;
      }
      return retry;
    };
    return BasePlaylistController;
  }();

  /*
   * compute an Exponential Weighted moving average
   * - https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
   *  - heavily inspired from shaka-player
   */
  var EWMA = /*#__PURE__*/function () {
    //  About half of the estimated value will be from the last |halfLife| samples by weight.
    function EWMA(halfLife, estimate, weight) {
      if (estimate === void 0) {
        estimate = 0;
      }
      if (weight === void 0) {
        weight = 0;
      }
      this.halfLife = void 0;
      this.alpha_ = void 0;
      this.estimate_ = void 0;
      this.totalWeight_ = void 0;
      this.halfLife = halfLife;
      // Larger values of alpha expire historical data more slowly.
      this.alpha_ = halfLife ? Math.exp(Math.log(0.5) / halfLife) : 0;
      this.estimate_ = estimate;
      this.totalWeight_ = weight;
    }
    var _proto = EWMA.prototype;
    _proto.sample = function sample(weight, value) {
      var adjAlpha = Math.pow(this.alpha_, weight);
      this.estimate_ = value * (1 - adjAlpha) + adjAlpha * this.estimate_;
      this.totalWeight_ += weight;
    };
    _proto.getTotalWeight = function getTotalWeight() {
      return this.totalWeight_;
    };
    _proto.getEstimate = function getEstimate() {
      if (this.alpha_) {
        var zeroFactor = 1 - Math.pow(this.alpha_, this.totalWeight_);
        if (zeroFactor) {
          return this.estimate_ / zeroFactor;
        }
      }
      return this.estimate_;
    };
    return EWMA;
  }();

  /*
   * EWMA Bandwidth Estimator
   *  - heavily inspired from shaka-player
   * Tracks bandwidth samples and estimates available bandwidth.
   * Based on the minimum of two exponentially-weighted moving averages with
   * different half-lives.
   */

  var EwmaBandWidthEstimator = /*#__PURE__*/function () {
    function EwmaBandWidthEstimator(slow, fast, defaultEstimate, defaultTTFB) {
      if (defaultTTFB === void 0) {
        defaultTTFB = 100;
      }
      this.defaultEstimate_ = void 0;
      this.minWeight_ = void 0;
      this.minDelayMs_ = void 0;
      this.slow_ = void 0;
      this.fast_ = void 0;
      this.defaultTTFB_ = void 0;
      this.ttfb_ = void 0;
      this.defaultEstimate_ = defaultEstimate;
      this.minWeight_ = 0.001;
      this.minDelayMs_ = 50;
      this.slow_ = new EWMA(slow);
      this.fast_ = new EWMA(fast);
      this.defaultTTFB_ = defaultTTFB;
      this.ttfb_ = new EWMA(slow);
    }
    var _proto = EwmaBandWidthEstimator.prototype;
    _proto.update = function update(slow, fast) {
      var slow_ = this.slow_,
        fast_ = this.fast_,
        ttfb_ = this.ttfb_;
      if (slow_.halfLife !== slow) {
        this.slow_ = new EWMA(slow, slow_.getEstimate(), slow_.getTotalWeight());
      }
      if (fast_.halfLife !== fast) {
        this.fast_ = new EWMA(fast, fast_.getEstimate(), fast_.getTotalWeight());
      }
      if (ttfb_.halfLife !== slow) {
        this.ttfb_ = new EWMA(slow, ttfb_.getEstimate(), ttfb_.getTotalWeight());
      }
    };
    _proto.sample = function sample(durationMs, numBytes) {
      durationMs = Math.max(durationMs, this.minDelayMs_);
      var numBits = 8 * numBytes;
      // weight is duration in seconds
      var durationS = durationMs / 1000;
      // value is bandwidth in bits/s
      var bandwidthInBps = numBits / durationS;
      this.fast_.sample(durationS, bandwidthInBps);
      this.slow_.sample(durationS, bandwidthInBps);
    };
    _proto.sampleTTFB = function sampleTTFB(ttfb) {
      // weight is frequency curve applied to TTFB in seconds
      // (longer times have less weight with expected input under 1 second)
      var seconds = ttfb / 1000;
      var weight = Math.sqrt(2) * Math.exp(-Math.pow(seconds, 2) / 2);
      this.ttfb_.sample(weight, Math.max(ttfb, 5));
    };
    _proto.canEstimate = function canEstimate() {
      return this.fast_.getTotalWeight() >= this.minWeight_;
    };
    _proto.getEstimate = function getEstimate() {
      if (this.canEstimate()) {
        // console.log('slow estimate:'+ Math.round(this.slow_.getEstimate()));
        // console.log('fast estimate:'+ Math.round(this.fast_.getEstimate()));
        // Take the minimum of these two estimates.  This should have the effect of
        // adapting down quickly, but up more slowly.
        return Math.min(this.fast_.getEstimate(), this.slow_.getEstimate());
      } else {
        return this.defaultEstimate_;
      }
    };
    _proto.getEstimateTTFB = function getEstimateTTFB() {
      if (this.ttfb_.getTotalWeight() >= this.minWeight_) {
        return this.ttfb_.getEstimate();
      } else {
        return this.defaultTTFB_;
      }
    };
    _proto.destroy = function destroy() {};
    return EwmaBandWidthEstimator;
  }();

  /**
   * @returns Whether we can detect and validate HDR capability within the window context
   */
  function isHdrSupported() {
    if (typeof matchMedia === 'function') {
      var mediaQueryList = matchMedia('(dynamic-range: high)');
      var badQuery = matchMedia('bad query');
      if (mediaQueryList.media !== badQuery.media) {
        return mediaQueryList.matches === true;
      }
    }
    return false;
  }

  /**
   * Sanitizes inputs to return the active video selection options for HDR/SDR.
   * When both inputs are null:
   *
   *    `{ preferHDR: false, allowedVideoRanges: [] }`
   *
   * When `currentVideoRange` non-null, maintain the active range:
   *
   *    `{ preferHDR: currentVideoRange !== 'SDR', allowedVideoRanges: [currentVideoRange] }`
   *
   * When VideoSelectionOption non-null:
   *
   *  - Allow all video ranges if `allowedVideoRanges` unspecified.
   *  - If `preferHDR` is non-null use the value to filter `allowedVideoRanges`.
   *  - Else check window for HDR support and set `preferHDR` to the result.
   *
   * @param currentVideoRange
   * @param videoPreference
   */
  function getVideoSelectionOptions(currentVideoRange, videoPreference) {
    var preferHDR = false;
    var allowedVideoRanges = [];
    if (currentVideoRange) {
      preferHDR = currentVideoRange !== 'SDR';
      allowedVideoRanges = [currentVideoRange];
    }
    if (videoPreference) {
      allowedVideoRanges = videoPreference.allowedVideoRanges || VideoRangeValues.slice(0);
      preferHDR = videoPreference.preferHDR !== undefined ? videoPreference.preferHDR : isHdrSupported();
      if (preferHDR) {
        allowedVideoRanges = allowedVideoRanges.filter(function (range) {
          return range !== 'SDR';
        });
      } else {
        allowedVideoRanges = ['SDR'];
      }
    }
    return {
      preferHDR: preferHDR,
      allowedVideoRanges: allowedVideoRanges
    };
  }

  function getStartCodecTier(codecTiers, currentVideoRange, currentBw, audioPreference, videoPreference) {
    var codecSets = Object.keys(codecTiers);
    var channelsPreference = audioPreference == null ? void 0 : audioPreference.channels;
    var audioCodecPreference = audioPreference == null ? void 0 : audioPreference.audioCodec;
    var preferStereo = channelsPreference && parseInt(channelsPreference) === 2;
    // Use first level set to determine stereo, and minimum resolution and framerate
    var hasStereo = true;
    var hasCurrentVideoRange = false;
    var minHeight = Infinity;
    var minFramerate = Infinity;
    var minBitrate = Infinity;
    var selectedScore = 0;
    var videoRanges = [];
    var _getVideoSelectionOpt = getVideoSelectionOptions(currentVideoRange, videoPreference),
      preferHDR = _getVideoSelectionOpt.preferHDR,
      allowedVideoRanges = _getVideoSelectionOpt.allowedVideoRanges;
    var _loop = function _loop() {
      var tier = codecTiers[codecSets[i]];
      hasStereo = tier.channels[2] > 0;
      minHeight = Math.min(minHeight, tier.minHeight);
      minFramerate = Math.min(minFramerate, tier.minFramerate);
      minBitrate = Math.min(minBitrate, tier.minBitrate);
      var matchingVideoRanges = allowedVideoRanges.filter(function (range) {
        return tier.videoRanges[range] > 0;
      });
      if (matchingVideoRanges.length > 0) {
        hasCurrentVideoRange = true;
        videoRanges = matchingVideoRanges;
      }
    };
    for (var i = codecSets.length; i--;) {
      _loop();
    }
    minHeight = isFiniteNumber(minHeight) ? minHeight : 0;
    minFramerate = isFiniteNumber(minFramerate) ? minFramerate : 0;
    var maxHeight = Math.max(1080, minHeight);
    var maxFramerate = Math.max(30, minFramerate);
    minBitrate = isFiniteNumber(minBitrate) ? minBitrate : currentBw;
    currentBw = Math.max(minBitrate, currentBw);
    // If there are no variants with matching preference, set currentVideoRange to undefined
    if (!hasCurrentVideoRange) {
      currentVideoRange = undefined;
      videoRanges = [];
    }
    var codecSet = codecSets.reduce(function (selected, candidate) {
      // Remove candiates which do not meet bitrate, default audio, stereo or channels preference, 1080p or lower, 30fps or lower, or SDR/HDR selection if present
      var candidateTier = codecTiers[candidate];
      if (candidate === selected) {
        return selected;
      }
      if (candidateTier.minBitrate > currentBw) {
        logStartCodecCandidateIgnored(candidate, "min bitrate of " + candidateTier.minBitrate + " > current estimate of " + currentBw);
        return selected;
      }
      if (!candidateTier.hasDefaultAudio) {
        logStartCodecCandidateIgnored(candidate, "no renditions with default or auto-select sound found");
        return selected;
      }
      if (audioCodecPreference && candidate.indexOf(audioCodecPreference.substring(0, 4)) % 5 !== 0) {
        logStartCodecCandidateIgnored(candidate, "audio codec preference \"" + audioCodecPreference + "\" not found");
        return selected;
      }
      if (channelsPreference && !preferStereo) {
        if (!candidateTier.channels[channelsPreference]) {
          logStartCodecCandidateIgnored(candidate, "no renditions with " + channelsPreference + " channel sound found (channels options: " + Object.keys(candidateTier.channels) + ")");
          return selected;
        }
      } else if ((!audioCodecPreference || preferStereo) && hasStereo && candidateTier.channels['2'] === 0) {
        logStartCodecCandidateIgnored(candidate, "no renditions with stereo sound found");
        return selected;
      }
      if (candidateTier.minHeight > maxHeight) {
        logStartCodecCandidateIgnored(candidate, "min resolution of " + candidateTier.minHeight + " > maximum of " + maxHeight);
        return selected;
      }
      if (candidateTier.minFramerate > maxFramerate) {
        logStartCodecCandidateIgnored(candidate, "min framerate of " + candidateTier.minFramerate + " > maximum of " + maxFramerate);
        return selected;
      }
      if (!videoRanges.some(function (range) {
        return candidateTier.videoRanges[range] > 0;
      })) {
        logStartCodecCandidateIgnored(candidate, "no variants with VIDEO-RANGE of " + JSON.stringify(videoRanges) + " found");
        return selected;
      }
      if (candidateTier.maxScore < selectedScore) {
        logStartCodecCandidateIgnored(candidate, "max score of " + candidateTier.maxScore + " < selected max of " + selectedScore);
        return selected;
      }
      // Remove candiates with less preferred codecs or more errors
      if (selected && (codecsSetSelectionPreferenceValue(candidate) >= codecsSetSelectionPreferenceValue(selected) || candidateTier.fragmentError > codecTiers[selected].fragmentError)) {
        return selected;
      }
      selectedScore = candidateTier.maxScore;
      return candidate;
    }, undefined);
    return {
      codecSet: codecSet,
      videoRanges: videoRanges,
      preferHDR: preferHDR,
      minFramerate: minFramerate,
      minBitrate: minBitrate
    };
  }
  function logStartCodecCandidateIgnored(codeSet, reason) {
    logger.log("[abr] start candidates with \"" + codeSet + "\" ignored because " + reason);
  }
  function getAudioTracksByGroup(allAudioTracks) {
    return allAudioTracks.reduce(function (audioTracksByGroup, track) {
      var trackGroup = audioTracksByGroup.groups[track.groupId];
      if (!trackGroup) {
        trackGroup = audioTracksByGroup.groups[track.groupId] = {
          tracks: [],
          channels: {
            2: 0
          },
          hasDefault: false,
          hasAutoSelect: false
        };
      }
      trackGroup.tracks.push(track);
      var channelsKey = track.channels || '2';
      trackGroup.channels[channelsKey] = (trackGroup.channels[channelsKey] || 0) + 1;
      trackGroup.hasDefault = trackGroup.hasDefault || track.default;
      trackGroup.hasAutoSelect = trackGroup.hasAutoSelect || track.autoselect;
      if (trackGroup.hasDefault) {
        audioTracksByGroup.hasDefaultAudio = true;
      }
      if (trackGroup.hasAutoSelect) {
        audioTracksByGroup.hasAutoSelectAudio = true;
      }
      return audioTracksByGroup;
    }, {
      hasDefaultAudio: false,
      hasAutoSelectAudio: false,
      groups: {}
    });
  }
  function getCodecTiers(levels, audioTracksByGroup, minAutoLevel, maxAutoLevel) {
    return levels.slice(minAutoLevel, maxAutoLevel + 1).reduce(function (tiers, level) {
      if (!level.codecSet) {
        return tiers;
      }
      var audioGroups = level.audioGroups;
      var tier = tiers[level.codecSet];
      if (!tier) {
        tiers[level.codecSet] = tier = {
          minBitrate: Infinity,
          minHeight: Infinity,
          minFramerate: Infinity,
          maxScore: 0,
          videoRanges: {
            SDR: 0
          },
          channels: {
            '2': 0
          },
          hasDefaultAudio: !audioGroups,
          fragmentError: 0
        };
      }
      tier.minBitrate = Math.min(tier.minBitrate, level.bitrate);
      var lesserWidthOrHeight = Math.min(level.height, level.width);
      tier.minHeight = Math.min(tier.minHeight, lesserWidthOrHeight);
      tier.minFramerate = Math.min(tier.minFramerate, level.frameRate);
      tier.maxScore = Math.max(tier.maxScore, level.score);
      tier.fragmentError += level.fragmentError;
      tier.videoRanges[level.videoRange] = (tier.videoRanges[level.videoRange] || 0) + 1;
      return tiers;
    }, {});
  }

  var AbrController = /*#__PURE__*/function () {
    function AbrController(_hls) {
      var _this = this;
      this.hls = void 0;
      this.lastLevelLoadSec = 0;
      this.lastLoadedFragLevel = -1;
      this.firstSelection = -1;
      this._nextAutoLevel = -1;
      this.nextAutoLevelKey = '';
      this.audioTracksByGroup = null;
      this.codecTiers = null;
      this.timer = -1;
      this.fragCurrent = null;
      this.partCurrent = null;
      this.bitrateTestDelay = 0;
      this.bwEstimator = void 0;
      /*
          This method monitors the download rate of the current fragment, and will downswitch if that fragment will not load
          quickly enough to prevent underbuffering
        */
      this._abandonRulesCheck = function () {
        var frag = _this.fragCurrent,
          part = _this.partCurrent,
          hls = _this.hls;
        var autoLevelEnabled = hls.autoLevelEnabled,
          media = hls.media;
        if (!frag || !media) {
          return;
        }
        var now = performance.now();
        var stats = part ? part.stats : frag.stats;
        var duration = part ? part.duration : frag.duration;
        var timeLoading = now - stats.loading.start;
        var minAutoLevel = hls.minAutoLevel;
        // If frag loading is aborted, complete, or from lowest level, stop timer and return
        if (stats.aborted || stats.loaded && stats.loaded === stats.total || frag.level <= minAutoLevel) {
          _this.clearTimer();
          // reset forced auto level value so that next level will be selected
          _this._nextAutoLevel = -1;
          return;
        }

        // This check only runs if we're in ABR mode and actually playing
        if (!autoLevelEnabled || media.paused || !media.playbackRate || !media.readyState) {
          return;
        }
        var bufferInfo = hls.mainForwardBufferInfo;
        if (bufferInfo === null) {
          return;
        }
        var ttfbEstimate = _this.bwEstimator.getEstimateTTFB();
        var playbackRate = Math.abs(media.playbackRate);
        // To maintain stable adaptive playback, only begin monitoring frag loading after half or more of its playback duration has passed
        if (timeLoading <= Math.max(ttfbEstimate, 1000 * (duration / (playbackRate * 2)))) {
          return;
        }

        // bufferStarvationDelay is an estimate of the amount time (in seconds) it will take to exhaust the buffer
        var bufferStarvationDelay = bufferInfo.len / playbackRate;
        var ttfb = stats.loading.first ? stats.loading.first - stats.loading.start : -1;
        var loadedFirstByte = stats.loaded && ttfb > -1;
        var bwEstimate = _this.getBwEstimate();
        var levels = hls.levels;
        var level = levels[frag.level];
        var expectedLen = stats.total || Math.max(stats.loaded, Math.round(duration * level.averageBitrate / 8));
        var timeStreaming = loadedFirstByte ? timeLoading - ttfb : timeLoading;
        if (timeStreaming < 1 && loadedFirstByte) {
          timeStreaming = Math.min(timeLoading, stats.loaded * 8 / bwEstimate);
        }
        var loadRate = loadedFirstByte ? stats.loaded * 1000 / timeStreaming : 0;
        // fragLoadDelay is an estimate of the time (in seconds) it will take to buffer the remainder of the fragment
        var fragLoadedDelay = loadRate ? (expectedLen - stats.loaded) / loadRate : expectedLen * 8 / bwEstimate + ttfbEstimate / 1000;
        // Only downswitch if the time to finish loading the current fragment is greater than the amount of buffer left
        if (fragLoadedDelay <= bufferStarvationDelay) {
          return;
        }
        var bwe = loadRate ? loadRate * 8 : bwEstimate;
        var fragLevelNextLoadedDelay = Number.POSITIVE_INFINITY;
        var nextLoadLevel;
        // Iterate through lower level and try to find the largest one that avoids rebuffering
        for (nextLoadLevel = frag.level - 1; nextLoadLevel > minAutoLevel; nextLoadLevel--) {
          // compute time to load next fragment at lower level
          // 8 = bits per byte (bps/Bps)
          var levelNextBitrate = levels[nextLoadLevel].maxBitrate;
          fragLevelNextLoadedDelay = _this.getTimeToLoadFrag(ttfbEstimate / 1000, bwe, duration * levelNextBitrate, !levels[nextLoadLevel].details);
          if (fragLevelNextLoadedDelay < bufferStarvationDelay) {
            break;
          }
        }
        // Only emergency switch down if it takes less time to load a new fragment at lowest level instead of continuing
        // to load the current one
        if (fragLevelNextLoadedDelay >= fragLoadedDelay) {
          return;
        }

        // if estimated load time of new segment is completely unreasonable, ignore and do not emergency switch down
        if (fragLevelNextLoadedDelay > duration * 10) {
          return;
        }
        hls.nextLoadLevel = hls.nextAutoLevel = nextLoadLevel;
        if (loadedFirstByte) {
          // If there has been loading progress, sample bandwidth using loading time offset by minimum TTFB time
          _this.bwEstimator.sample(timeLoading - Math.min(ttfbEstimate, ttfb), stats.loaded);
        } else {
          // If there has been no loading progress, sample TTFB
          _this.bwEstimator.sampleTTFB(timeLoading);
        }
        var nextLoadLevelBitrate = levels[nextLoadLevel].maxBitrate;
        if (_this.getBwEstimate() * _this.hls.config.abrBandWidthUpFactor > nextLoadLevelBitrate) {
          _this.resetEstimator(nextLoadLevelBitrate);
        }
        _this.clearTimer();
        logger.warn("[abr] Fragment " + frag.sn + (part ? ' part ' + part.index : '') + " of level " + frag.level + " is loading too slowly;\n      Time to underbuffer: " + bufferStarvationDelay.toFixed(3) + " s\n      Estimated load time for current fragment: " + fragLoadedDelay.toFixed(3) + " s\n      Estimated load time for down switch fragment: " + fragLevelNextLoadedDelay.toFixed(3) + " s\n      TTFB estimate: " + (ttfb | 0) + " ms\n      Current BW estimate: " + (isFiniteNumber(bwEstimate) ? bwEstimate | 0 : 'Unknown') + " bps\n      New BW estimate: " + (_this.getBwEstimate() | 0) + " bps\n      Switching to level " + nextLoadLevel + " @ " + (nextLoadLevelBitrate | 0) + " bps");
        hls.trigger(Events.FRAG_LOAD_EMERGENCY_ABORTED, {
          frag: frag,
          part: part,
          stats: stats
        });
      };
      this.hls = _hls;
      this.bwEstimator = this.initEstimator();
      this.registerListeners();
    }
    var _proto = AbrController.prototype;
    _proto.resetEstimator = function resetEstimator(abrEwmaDefaultEstimate) {
      if (abrEwmaDefaultEstimate) {
        logger.log("setting initial bwe to " + abrEwmaDefaultEstimate);
        this.hls.config.abrEwmaDefaultEstimate = abrEwmaDefaultEstimate;
      }
      this.firstSelection = -1;
      this.bwEstimator = this.initEstimator();
    };
    _proto.initEstimator = function initEstimator() {
      var config = this.hls.config;
      return new EwmaBandWidthEstimator(config.abrEwmaSlowVoD, config.abrEwmaFastVoD, config.abrEwmaDefaultEstimate);
    };
    _proto.registerListeners = function registerListeners() {
      var hls = this.hls;
      hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.on(Events.FRAG_LOADING, this.onFragLoading, this);
      hls.on(Events.FRAG_LOADED, this.onFragLoaded, this);
      hls.on(Events.FRAG_BUFFERED, this.onFragBuffered, this);
      hls.on(Events.LEVEL_SWITCHING, this.onLevelSwitching, this);
      hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this);
      hls.on(Events.LEVELS_UPDATED, this.onLevelsUpdated, this);
      hls.on(Events.MAX_AUTO_LEVEL_UPDATED, this.onMaxAutoLevelUpdated, this);
      hls.on(Events.ERROR, this.onError, this);
    };
    _proto.unregisterListeners = function unregisterListeners() {
      var hls = this.hls;
      if (!hls) {
        return;
      }
      hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.off(Events.FRAG_LOADING, this.onFragLoading, this);
      hls.off(Events.FRAG_LOADED, this.onFragLoaded, this);
      hls.off(Events.FRAG_BUFFERED, this.onFragBuffered, this);
      hls.off(Events.LEVEL_SWITCHING, this.onLevelSwitching, this);
      hls.off(Events.LEVEL_LOADED, this.onLevelLoaded, this);
      hls.off(Events.LEVELS_UPDATED, this.onLevelsUpdated, this);
      hls.off(Events.MAX_AUTO_LEVEL_UPDATED, this.onMaxAutoLevelUpdated, this);
      hls.off(Events.ERROR, this.onError, this);
    };
    _proto.destroy = function destroy() {
      this.unregisterListeners();
      this.clearTimer();
      // @ts-ignore
      this.hls = this._abandonRulesCheck = null;
      this.fragCurrent = this.partCurrent = null;
    };
    _proto.onManifestLoading = function onManifestLoading(event, data) {
      this.lastLoadedFragLevel = -1;
      this.firstSelection = -1;
      this.lastLevelLoadSec = 0;
      this.fragCurrent = this.partCurrent = null;
      this.onLevelsUpdated();
      this.clearTimer();
    };
    _proto.onLevelsUpdated = function onLevelsUpdated() {
      if (this.lastLoadedFragLevel > -1 && this.fragCurrent) {
        this.lastLoadedFragLevel = this.fragCurrent.level;
      }
      this._nextAutoLevel = -1;
      this.onMaxAutoLevelUpdated();
      this.codecTiers = null;
      this.audioTracksByGroup = null;
    };
    _proto.onMaxAutoLevelUpdated = function onMaxAutoLevelUpdated() {
      this.firstSelection = -1;
      this.nextAutoLevelKey = '';
    };
    _proto.onFragLoading = function onFragLoading(event, data) {
      var frag = data.frag;
      if (this.ignoreFragment(frag)) {
        return;
      }
      if (!frag.bitrateTest) {
        var _data$part;
        this.fragCurrent = frag;
        this.partCurrent = (_data$part = data.part) != null ? _data$part : null;
      }
      this.clearTimer();
      this.timer = self.setInterval(this._abandonRulesCheck, 100);
    };
    _proto.onLevelSwitching = function onLevelSwitching(event, data) {
      this.clearTimer();
    };
    _proto.onError = function onError(event, data) {
      if (data.fatal) {
        return;
      }
      switch (data.details) {
        case ErrorDetails.BUFFER_ADD_CODEC_ERROR:
        case ErrorDetails.BUFFER_APPEND_ERROR:
          // Reset last loaded level so that a new selection can be made after calling recoverMediaError
          this.lastLoadedFragLevel = -1;
          this.firstSelection = -1;
          break;
        case ErrorDetails.FRAG_LOAD_TIMEOUT:
          {
            var frag = data.frag;
            var fragCurrent = this.fragCurrent,
              part = this.partCurrent;
            if (frag && fragCurrent && frag.sn === fragCurrent.sn && frag.level === fragCurrent.level) {
              var now = performance.now();
              var stats = part ? part.stats : frag.stats;
              var timeLoading = now - stats.loading.start;
              var ttfb = stats.loading.first ? stats.loading.first - stats.loading.start : -1;
              var loadedFirstByte = stats.loaded && ttfb > -1;
              if (loadedFirstByte) {
                var ttfbEstimate = this.bwEstimator.getEstimateTTFB();
                this.bwEstimator.sample(timeLoading - Math.min(ttfbEstimate, ttfb), stats.loaded);
              } else {
                this.bwEstimator.sampleTTFB(timeLoading);
              }
            }
            break;
          }
      }
    };
    _proto.getTimeToLoadFrag = function getTimeToLoadFrag(timeToFirstByteSec, bandwidth, fragSizeBits, isSwitch) {
      var fragLoadSec = timeToFirstByteSec + fragSizeBits / bandwidth;
      var playlistLoadSec = isSwitch ? this.lastLevelLoadSec : 0;
      return fragLoadSec + playlistLoadSec;
    };
    _proto.onLevelLoaded = function onLevelLoaded(event, data) {
      var config = this.hls.config;
      var loading = data.stats.loading;
      var timeLoadingMs = loading.end - loading.start;
      if (isFiniteNumber(timeLoadingMs)) {
        this.lastLevelLoadSec = timeLoadingMs / 1000;
      }
      if (data.details.live) {
        this.bwEstimator.update(config.abrEwmaSlowLive, config.abrEwmaFastLive);
      } else {
        this.bwEstimator.update(config.abrEwmaSlowVoD, config.abrEwmaFastVoD);
      }
    };
    _proto.onFragLoaded = function onFragLoaded(event, _ref) {
      var frag = _ref.frag,
        part = _ref.part;
      var stats = part ? part.stats : frag.stats;
      if (frag.type === PlaylistLevelType.MAIN) {
        this.bwEstimator.sampleTTFB(stats.loading.first - stats.loading.start);
      }
      if (this.ignoreFragment(frag)) {
        return;
      }
      // stop monitoring bw once frag loaded
      this.clearTimer();
      // reset forced auto level value so that next level will be selected
      if (frag.level === this._nextAutoLevel) {
        this._nextAutoLevel = -1;
      }
      this.firstSelection = -1;

      // compute level average bitrate
      if (this.hls.config.abrMaxWithRealBitrate) {
        var duration = part ? part.duration : frag.duration;
        var level = this.hls.levels[frag.level];
        var loadedBytes = (level.loaded ? level.loaded.bytes : 0) + stats.loaded;
        var loadedDuration = (level.loaded ? level.loaded.duration : 0) + duration;
        level.loaded = {
          bytes: loadedBytes,
          duration: loadedDuration
        };
        level.realBitrate = Math.round(8 * loadedBytes / loadedDuration);
      }
      if (frag.bitrateTest) {
        var fragBufferedData = {
          stats: stats,
          frag: frag,
          part: part,
          id: frag.type
        };
        this.onFragBuffered(Events.FRAG_BUFFERED, fragBufferedData);
        frag.bitrateTest = false;
      } else {
        // store level id after successful fragment load for playback
        this.lastLoadedFragLevel = frag.level;
      }
    };
    _proto.onFragBuffered = function onFragBuffered(event, data) {
      var frag = data.frag,
        part = data.part;
      var stats = part != null && part.stats.loaded ? part.stats : frag.stats;
      if (stats.aborted) {
        return;
      }
      if (this.ignoreFragment(frag)) {
        return;
      }
      // Use the difference between parsing and request instead of buffering and request to compute fragLoadingProcessing;
      // rationale is that buffer appending only happens once media is attached. This can happen when config.startFragPrefetch
      // is used. If we used buffering in that case, our BW estimate sample will be very large.
      var processingMs = stats.parsing.end - stats.loading.start - Math.min(stats.loading.first - stats.loading.start, this.bwEstimator.getEstimateTTFB());
      this.bwEstimator.sample(processingMs, stats.loaded);
      stats.bwEstimate = this.getBwEstimate();
      if (frag.bitrateTest) {
        this.bitrateTestDelay = processingMs / 1000;
      } else {
        this.bitrateTestDelay = 0;
      }
    };
    _proto.ignoreFragment = function ignoreFragment(frag) {
      // Only count non-alt-audio frags which were actually buffered in our BW calculations
      return frag.type !== PlaylistLevelType.MAIN || frag.sn === 'initSegment';
    };
    _proto.clearTimer = function clearTimer() {
      if (this.timer > -1) {
        self.clearInterval(this.timer);
        this.timer = -1;
      }
    };
    _proto.getAutoLevelKey = function getAutoLevelKey() {
      return this.getBwEstimate() + "_" + this.getStarvationDelay().toFixed(2);
    };
    _proto.getNextABRAutoLevel = function getNextABRAutoLevel() {
      var fragCurrent = this.fragCurrent,
        partCurrent = this.partCurrent,
        hls = this.hls;
      var maxAutoLevel = hls.maxAutoLevel,
        config = hls.config,
        minAutoLevel = hls.minAutoLevel;
      var currentFragDuration = partCurrent ? partCurrent.duration : fragCurrent ? fragCurrent.duration : 0;
      var avgbw = this.getBwEstimate();
      // bufferStarvationDelay is the wall-clock time left until the playback buffer is exhausted.
      var bufferStarvationDelay = this.getStarvationDelay();
      var bwFactor = config.abrBandWidthFactor;
      var bwUpFactor = config.abrBandWidthUpFactor;

      // First, look to see if we can find a level matching with our avg bandwidth AND that could also guarantee no rebuffering at all
      if (bufferStarvationDelay) {
        var _bestLevel = this.findBestLevel(avgbw, minAutoLevel, maxAutoLevel, bufferStarvationDelay, 0, bwFactor, bwUpFactor);
        if (_bestLevel >= 0) {
          return _bestLevel;
        }
      }
      // not possible to get rid of rebuffering... try to find level that will guarantee less than maxStarvationDelay of rebuffering
      var maxStarvationDelay = currentFragDuration ? Math.min(currentFragDuration, config.maxStarvationDelay) : config.maxStarvationDelay;
      if (!bufferStarvationDelay) {
        // in case buffer is empty, let's check if previous fragment was loaded to perform a bitrate test
        var bitrateTestDelay = this.bitrateTestDelay;
        if (bitrateTestDelay) {
          // if it is the case, then we need to adjust our max starvation delay using maxLoadingDelay config value
          // max video loading delay used in  automatic start level selection :
          // in that mode ABR controller will ensure that video loading time (ie the time to fetch the first fragment at lowest quality level +
          // the time to fetch the fragment at the appropriate quality level is less than ```maxLoadingDelay``` )
          // cap maxLoadingDelay and ensure it is not bigger 'than bitrate test' frag duration
          var maxLoadingDelay = currentFragDuration ? Math.min(currentFragDuration, config.maxLoadingDelay) : config.maxLoadingDelay;
          maxStarvationDelay = maxLoadingDelay - bitrateTestDelay;
          logger.info("[abr] bitrate test took " + Math.round(1000 * bitrateTestDelay) + "ms, set first fragment max fetchDuration to " + Math.round(1000 * maxStarvationDelay) + " ms");
          // don't use conservative factor on bitrate test
          bwFactor = bwUpFactor = 1;
        }
      }
      var bestLevel = this.findBestLevel(avgbw, minAutoLevel, maxAutoLevel, bufferStarvationDelay, maxStarvationDelay, bwFactor, bwUpFactor);
      logger.info("[abr] " + (bufferStarvationDelay ? 'rebuffering expected' : 'buffer is empty') + ", optimal quality level " + bestLevel);
      if (bestLevel > -1) {
        return bestLevel;
      }
      // If no matching level found, see if min auto level would be a better option
      var minLevel = hls.levels[minAutoLevel];
      var autoLevel = hls.levels[hls.loadLevel];
      if ((minLevel == null ? void 0 : minLevel.bitrate) < (autoLevel == null ? void 0 : autoLevel.bitrate)) {
        return minAutoLevel;
      }
      // or if bitrate is not lower, continue to use loadLevel
      return hls.loadLevel;
    };
    _proto.getStarvationDelay = function getStarvationDelay() {
      var hls = this.hls;
      var media = hls.media;
      if (!media) {
        return Infinity;
      }
      // playbackRate is the absolute value of the playback rate; if media.playbackRate is 0, we use 1 to load as
      // if we're playing back at the normal rate.
      var playbackRate = media && media.playbackRate !== 0 ? Math.abs(media.playbackRate) : 1.0;
      var bufferInfo = hls.mainForwardBufferInfo;
      return (bufferInfo ? bufferInfo.len : 0) / playbackRate;
    };
    _proto.getBwEstimate = function getBwEstimate() {
      return this.bwEstimator.canEstimate() ? this.bwEstimator.getEstimate() : this.hls.config.abrEwmaDefaultEstimate;
    };
    _proto.findBestLevel = function findBestLevel(currentBw, minAutoLevel, maxAutoLevel, bufferStarvationDelay, maxStarvationDelay, bwFactor, bwUpFactor) {
      var _level$details,
        _this2 = this;
      var maxFetchDuration = bufferStarvationDelay + maxStarvationDelay;
      var lastLoadedFragLevel = this.lastLoadedFragLevel;
      var selectionBaseLevel = lastLoadedFragLevel === -1 ? this.hls.firstLevel : lastLoadedFragLevel;
      var fragCurrent = this.fragCurrent,
        partCurrent = this.partCurrent;
      var _this$hls = this.hls,
        levels = _this$hls.levels,
        allAudioTracks = _this$hls.allAudioTracks,
        loadLevel = _this$hls.loadLevel,
        config = _this$hls.config;
      if (levels.length === 1) {
        return 0;
      }
      var level = levels[selectionBaseLevel];
      var live = !!(level != null && (_level$details = level.details) != null && _level$details.live);
      var firstSelection = loadLevel === -1 || lastLoadedFragLevel === -1;
      var currentCodecSet;
      var currentVideoRange = 'SDR';
      var currentFrameRate = (level == null ? void 0 : level.frameRate) || 0;
      var audioPreference = config.audioPreference,
        videoPreference = config.videoPreference;
      var audioTracksByGroup = this.audioTracksByGroup || (this.audioTracksByGroup = getAudioTracksByGroup(allAudioTracks));
      if (firstSelection) {
        if (this.firstSelection !== -1) {
          return this.firstSelection;
        }
        var codecTiers = this.codecTiers || (this.codecTiers = getCodecTiers(levels, audioTracksByGroup, minAutoLevel, maxAutoLevel));
        var startTier = getStartCodecTier(codecTiers, currentVideoRange, currentBw, audioPreference, videoPreference);
        var codecSet = startTier.codecSet,
          videoRanges = startTier.videoRanges,
          minFramerate = startTier.minFramerate,
          minBitrate = startTier.minBitrate,
          preferHDR = startTier.preferHDR;
        currentCodecSet = codecSet;
        currentVideoRange = preferHDR ? videoRanges[videoRanges.length - 1] : videoRanges[0];
        currentFrameRate = minFramerate;
        currentBw = Math.max(currentBw, minBitrate);
        logger.log("[abr] picked start tier " + JSON.stringify(startTier));
      } else {
        currentCodecSet = level == null ? void 0 : level.codecSet;
        currentVideoRange = level == null ? void 0 : level.videoRange;
      }
      var currentFragDuration = partCurrent ? partCurrent.duration : fragCurrent ? fragCurrent.duration : 0;
      var ttfbEstimateSec = this.bwEstimator.getEstimateTTFB() / 1000;
      var levelsSkipped = [];
      var _loop = function _loop() {
          var _levelInfo$supportedR;
          var levelInfo = levels[i];
          var upSwitch = i > selectionBaseLevel;
          if (!levelInfo) {
            return 0; // continue
          }

          // skip candidates which change codec-family or video-range,
          // and which decrease or increase frame-rate for up and down-switch respectfully
          if (currentCodecSet && levelInfo.codecSet !== currentCodecSet || currentVideoRange && levelInfo.videoRange !== currentVideoRange || upSwitch && currentFrameRate > levelInfo.frameRate || !upSwitch && currentFrameRate > 0 && currentFrameRate < levelInfo.frameRate || levelInfo.supportedResult && !((_levelInfo$supportedR = levelInfo.supportedResult.decodingInfoResults) != null && _levelInfo$supportedR[0].smooth)) {
            levelsSkipped.push(i);
            return 0; // continue
          }
          var levelDetails = levelInfo.details;
          var avgDuration = (partCurrent ? levelDetails == null ? void 0 : levelDetails.partTarget : levelDetails == null ? void 0 : levelDetails.averagetargetduration) || currentFragDuration;
          var adjustedbw;
          // follow algorithm captured from stagefright :
          // https://android.googlesource.com/platform/frameworks/av/+/master/media/libstagefright/httplive/LiveSession.cpp
          // Pick the highest bandwidth stream below or equal to estimated bandwidth.
          // consider only 80% of the available bandwidth, but if we are switching up,
          // be even more conservative (70%) to avoid overestimating and immediately
          // switching back.
          if (!upSwitch) {
            adjustedbw = bwFactor * currentBw;
          } else {
            adjustedbw = bwUpFactor * currentBw;
          }

          // Use average bitrate when starvation delay (buffer length) is gt or eq two segment durations and rebuffering is not expected (maxStarvationDelay > 0)
          var bitrate = currentFragDuration && bufferStarvationDelay >= currentFragDuration * 2 && maxStarvationDelay === 0 ? levels[i].averageBitrate : levels[i].maxBitrate;
          var fetchDuration = _this2.getTimeToLoadFrag(ttfbEstimateSec, adjustedbw, bitrate * avgDuration, levelDetails === undefined);
          var canSwitchWithinTolerance =
          // if adjusted bw is greater than level bitrate AND
          adjustedbw >= bitrate && (
          // no level change, or new level has no error history
          i === lastLoadedFragLevel || levelInfo.loadError === 0 && levelInfo.fragmentError === 0) && (
          // fragment fetchDuration unknown OR live stream OR fragment fetchDuration less than max allowed fetch duration, then this level matches
          // we don't account for max Fetch Duration for live streams, this is to avoid switching down when near the edge of live sliding window ...
          // special case to support startLevel = -1 (bitrateTest) on live streams : in that case we should not exit loop so that findBestLevel will return -1
          fetchDuration <= ttfbEstimateSec || !isFiniteNumber(fetchDuration) || live && !_this2.bitrateTestDelay || fetchDuration < maxFetchDuration);
          if (canSwitchWithinTolerance) {
            var forcedAutoLevel = _this2.forcedAutoLevel;
            if (i !== loadLevel && (forcedAutoLevel === -1 || forcedAutoLevel !== loadLevel)) {
              if (levelsSkipped.length) {
                logger.trace("[abr] Skipped level(s) " + levelsSkipped.join(',') + " of " + maxAutoLevel + " max with CODECS and VIDEO-RANGE:\"" + levels[levelsSkipped[0]].codecs + "\" " + levels[levelsSkipped[0]].videoRange + "; not compatible with \"" + level.codecs + "\" " + currentVideoRange);
              }
              logger.info("[abr] switch candidate:" + selectionBaseLevel + "->" + i + " adjustedbw(" + Math.round(adjustedbw) + ")-bitrate=" + Math.round(adjustedbw - bitrate) + " ttfb:" + ttfbEstimateSec.toFixed(1) + " avgDuration:" + avgDuration.toFixed(1) + " maxFetchDuration:" + maxFetchDuration.toFixed(1) + " fetchDuration:" + fetchDuration.toFixed(1) + " firstSelection:" + firstSelection + " codecSet:" + currentCodecSet + " videoRange:" + currentVideoRange + " hls.loadLevel:" + loadLevel);
            }
            if (firstSelection) {
              _this2.firstSelection = i;
            }
            // as we are looping from highest to lowest, this will return the best achievable quality level
            return {
              v: i
            };
          }
        },
        _ret;
      for (var i = maxAutoLevel; i >= minAutoLevel; i--) {
        _ret = _loop();
        if (_ret === 0) continue;
        if (_ret) return _ret.v;
      }
      // not enough time budget even with quality level 0 ... rebuffering might happen
      return -1;
    };
    _createClass(AbrController, [{
      key: "firstAutoLevel",
      get: function get() {
        var _this$hls2 = this.hls,
          maxAutoLevel = _this$hls2.maxAutoLevel,
          minAutoLevel = _this$hls2.minAutoLevel;
        var bwEstimate = this.getBwEstimate();
        var maxStartDelay = this.hls.config.maxStarvationDelay;
        var abrAutoLevel = this.findBestLevel(bwEstimate, minAutoLevel, maxAutoLevel, 0, maxStartDelay, 1, 1);
        if (abrAutoLevel > -1) {
          return abrAutoLevel;
        }
        var firstLevel = this.hls.firstLevel;
        var clamped = Math.min(Math.max(firstLevel, minAutoLevel), maxAutoLevel);
        logger.warn("[abr] Could not find best starting auto level. Defaulting to first in playlist " + firstLevel + " clamped to " + clamped);
        return clamped;
      }
    }, {
      key: "forcedAutoLevel",
      get: function get() {
        if (this.nextAutoLevelKey) {
          return -1;
        }
        return this._nextAutoLevel;
      }

      // return next auto level
    }, {
      key: "nextAutoLevel",
      get: function get() {
        var forcedAutoLevel = this.forcedAutoLevel;
        var bwEstimator = this.bwEstimator;
        var useEstimate = bwEstimator.canEstimate();
        var loadedFirstFrag = this.lastLoadedFragLevel > -1;
        // in case next auto level has been forced, and bw not available or not reliable, return forced value
        if (forcedAutoLevel !== -1 && (!useEstimate || !loadedFirstFrag || this.nextAutoLevelKey === this.getAutoLevelKey())) {
          return forcedAutoLevel;
        }

        // compute next level using ABR logic
        var nextABRAutoLevel = useEstimate && loadedFirstFrag ? this.getNextABRAutoLevel() : this.firstAutoLevel;

        // use forced auto level while it hasn't errored more than ABR selection
        if (forcedAutoLevel !== -1) {
          var levels = this.hls.levels;
          if (levels.length > Math.max(forcedAutoLevel, nextABRAutoLevel) && levels[forcedAutoLevel].loadError <= levels[nextABRAutoLevel].loadError) {
            return forcedAutoLevel;
          }
        }

        // save result until state has changed
        this._nextAutoLevel = nextABRAutoLevel;
        this.nextAutoLevelKey = this.getAutoLevelKey();
        return nextABRAutoLevel;
      },
      set: function set(nextLevel) {
        var _this$hls3 = this.hls,
          maxAutoLevel = _this$hls3.maxAutoLevel,
          minAutoLevel = _this$hls3.minAutoLevel;
        var value = Math.min(Math.max(nextLevel, minAutoLevel), maxAutoLevel);
        if (this._nextAutoLevel !== value) {
          this.nextAutoLevelKey = '';
          this._nextAutoLevel = value;
        }
      }
    }]);
    return AbrController;
  }();

  /**
   * Provides methods dealing with buffer length retrieval for example.
   *
   * In general, a helper around HTML5 MediaElement TimeRanges gathered from `buffered` property.
   *
   * Also @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered
   */

  var noopBuffered = {
    length: 0,
    start: function start() {
      return 0;
    },
    end: function end() {
      return 0;
    }
  };
  var BufferHelper = /*#__PURE__*/function () {
    function BufferHelper() {}
    /**
     * Return true if `media`'s buffered include `position`
     */
    BufferHelper.isBuffered = function isBuffered(media, position) {
      try {
        if (media) {
          var buffered = BufferHelper.getBuffered(media);
          for (var i = 0; i < buffered.length; i++) {
            if (position >= buffered.start(i) && position <= buffered.end(i)) {
              return true;
            }
          }
        }
      } catch (error) {
        // this is to catch
        // InvalidStateError: Failed to read the 'buffered' property from 'SourceBuffer':
        // This SourceBuffer has been removed from the parent media source
      }
      return false;
    };
    BufferHelper.bufferInfo = function bufferInfo(media, pos, maxHoleDuration) {
      try {
        if (media) {
          var vbuffered = BufferHelper.getBuffered(media);
          var buffered = [];
          var i;
          for (i = 0; i < vbuffered.length; i++) {
            buffered.push({
              start: vbuffered.start(i),
              end: vbuffered.end(i)
            });
          }
          return this.bufferedInfo(buffered, pos, maxHoleDuration);
        }
      } catch (error) {
        // this is to catch
        // InvalidStateError: Failed to read the 'buffered' property from 'SourceBuffer':
        // This SourceBuffer has been removed from the parent media source
      }
      return {
        len: 0,
        start: pos,
        end: pos,
        nextStart: undefined
      };
    };
    BufferHelper.bufferedInfo = function bufferedInfo(buffered, pos, maxHoleDuration) {
      pos = Math.max(0, pos);
      // sort on buffer.start/smaller end (IE does not always return sorted buffered range)
      buffered.sort(function (a, b) {
        var diff = a.start - b.start;
        if (diff) {
          return diff;
        } else {
          return b.end - a.end;
        }
      });
      var buffered2 = [];
      if (maxHoleDuration) {
        // there might be some small holes between buffer time range
        // consider that holes smaller than maxHoleDuration are irrelevant and build another
        // buffer time range representations that discards those holes
        for (var i = 0; i < buffered.length; i++) {
          var buf2len = buffered2.length;
          if (buf2len) {
            var buf2end = buffered2[buf2len - 1].end;
            // if small hole (value between 0 or maxHoleDuration ) or overlapping (negative)
            if (buffered[i].start - buf2end < maxHoleDuration) {
              // merge overlapping time ranges
              // update lastRange.end only if smaller than item.end
              // e.g.  [ 1, 15] with  [ 2,8] => [ 1,15] (no need to modify lastRange.end)
              // whereas [ 1, 8] with  [ 2,15] => [ 1,15] ( lastRange should switch from [1,8] to [1,15])
              if (buffered[i].end > buf2end) {
                buffered2[buf2len - 1].end = buffered[i].end;
              }
            } else {
              // big hole
              buffered2.push(buffered[i]);
            }
          } else {
            // first value
            buffered2.push(buffered[i]);
          }
        }
      } else {
        buffered2 = buffered;
      }
      var bufferLen = 0;

      // bufferStartNext can possibly be undefined based on the conditional logic below
      var bufferStartNext;

      // bufferStart and bufferEnd are buffer boundaries around current video position
      var bufferStart = pos;
      var bufferEnd = pos;
      for (var _i = 0; _i < buffered2.length; _i++) {
        var start = buffered2[_i].start;
        var end = buffered2[_i].end;
        // logger.log('buf start/end:' + buffered.start(i) + '/' + buffered.end(i));
        if (pos + maxHoleDuration >= start && pos < end) {
          // play position is inside this buffer TimeRange, retrieve end of buffer position and buffer length
          bufferStart = start;
          bufferEnd = end;
          bufferLen = bufferEnd - pos;
        } else if (pos + maxHoleDuration < start) {
          bufferStartNext = start;
          break;
        }
      }
      return {
        len: bufferLen,
        start: bufferStart || 0,
        end: bufferEnd || 0,
        nextStart: bufferStartNext
      };
    }

    /**
     * Safe method to get buffered property.
     * SourceBuffer.buffered may throw if SourceBuffer is removed from it's MediaSource
     */;
    BufferHelper.getBuffered = function getBuffered(media) {
      try {
        return media.buffered;
      } catch (e) {
        logger.log('failed to get media.buffered', e);
        return noopBuffered;
      }
    };
    return BufferHelper;
  }();

  var BufferOperationQueue = /*#__PURE__*/function () {
    function BufferOperationQueue(sourceBufferReference) {
      this.buffers = void 0;
      this.queues = {
        video: [],
        audio: [],
        audiovideo: []
      };
      this.buffers = sourceBufferReference;
    }
    var _proto = BufferOperationQueue.prototype;
    _proto.append = function append(operation, type, pending) {
      var queue = this.queues[type];
      queue.push(operation);
      if (queue.length === 1 && !pending) {
        this.executeNext(type);
      }
    };
    _proto.insertAbort = function insertAbort(operation, type) {
      var queue = this.queues[type];
      queue.unshift(operation);
      this.executeNext(type);
    };
    _proto.appendBlocker = function appendBlocker(type) {
      var execute;
      var promise = new Promise(function (resolve) {
        execute = resolve;
      });
      var operation = {
        execute: execute,
        onStart: function onStart() {},
        onComplete: function onComplete() {},
        onError: function onError() {}
      };
      this.append(operation, type);
      return promise;
    };
    _proto.executeNext = function executeNext(type) {
      var queue = this.queues[type];
      if (queue.length) {
        var operation = queue[0];
        try {
          // Operations are expected to result in an 'updateend' event being fired. If not, the queue will lock. Operations
          // which do not end with this event must call _onSBUpdateEnd manually
          operation.execute();
        } catch (error) {
          logger.warn("[buffer-operation-queue]: Exception executing \"" + type + "\" SourceBuffer operation: " + error);
          operation.onError(error);

          // Only shift the current operation off, otherwise the updateend handler will do this for us
          var sb = this.buffers[type];
          if (!(sb != null && sb.updating)) {
            this.shiftAndExecuteNext(type);
          }
        }
      }
    };
    _proto.shiftAndExecuteNext = function shiftAndExecuteNext(type) {
      this.queues[type].shift();
      this.executeNext(type);
    };
    _proto.current = function current(type) {
      return this.queues[type][0];
    };
    return BufferOperationQueue;
  }();

  var VIDEO_CODEC_PROFILE_REPLACE = /(avc[1234]|hvc1|hev1|dvh[1e]|vp09|av01)(?:\.[^.,]+)+/;
  var BufferController = /*#__PURE__*/function () {
    function BufferController(hls) {
      var _this = this;
      // The level details used to determine duration, target-duration and live
      this.details = null;
      // cache the self generated object url to detect hijack of video tag
      this._objectUrl = null;
      // A queue of buffer operations which require the SourceBuffer to not be updating upon execution
      this.operationQueue = void 0;
      // References to event listeners for each SourceBuffer, so that they can be referenced for event removal
      this.listeners = void 0;
      this.hls = void 0;
      // The number of BUFFER_CODEC events received before any sourceBuffers are created
      this.bufferCodecEventsExpected = 0;
      // The total number of BUFFER_CODEC events received
      this._bufferCodecEventsTotal = 0;
      // A reference to the attached media element
      this.media = null;
      // A reference to the active media source
      this.mediaSource = null;
      // Last MP3 audio chunk appended
      this.lastMpegAudioChunk = null;
      this.appendSource = void 0;
      // counters
      this.appendErrors = {
        audio: 0,
        video: 0,
        audiovideo: 0
      };
      this.tracks = {};
      this.pendingTracks = {};
      this.sourceBuffer = void 0;
      this.log = void 0;
      this.warn = void 0;
      this.error = void 0;
      this._onEndStreaming = function (event) {
        if (!_this.hls) {
          return;
        }
        _this.hls.pauseBuffering();
      };
      this._onStartStreaming = function (event) {
        if (!_this.hls) {
          return;
        }
        _this.hls.resumeBuffering();
      };
      // Keep as arrow functions so that we can directly reference these functions directly as event listeners
      this._onMediaSourceOpen = function () {
        var media = _this.media,
          mediaSource = _this.mediaSource;
        _this.log('Media source opened');
        if (media) {
          media.removeEventListener('emptied', _this._onMediaEmptied);
          _this.updateMediaElementDuration();
          _this.hls.trigger(Events.MEDIA_ATTACHED, {
            media: media,
            mediaSource: mediaSource
          });
        }
        if (mediaSource) {
          // once received, don't listen anymore to sourceopen event
          mediaSource.removeEventListener('sourceopen', _this._onMediaSourceOpen);
        }
        _this.checkPendingTracks();
      };
      this._onMediaSourceClose = function () {
        _this.log('Media source closed');
      };
      this._onMediaSourceEnded = function () {
        _this.log('Media source ended');
      };
      this._onMediaEmptied = function () {
        var mediaSrc = _this.mediaSrc,
          _objectUrl = _this._objectUrl;
        if (mediaSrc !== _objectUrl) {
          logger.error("Media element src was set while attaching MediaSource (" + _objectUrl + " > " + mediaSrc + ")");
        }
      };
      this.hls = hls;
      var logPrefix = '[buffer-controller]';
      this.appendSource = isManagedMediaSource(getMediaSource(hls.config.preferManagedMediaSource));
      this.log = logger.log.bind(logger, logPrefix);
      this.warn = logger.warn.bind(logger, logPrefix);
      this.error = logger.error.bind(logger, logPrefix);
      this._initSourceBuffer();
      this.registerListeners();
    }
    var _proto = BufferController.prototype;
    _proto.hasSourceTypes = function hasSourceTypes() {
      return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0;
    };
    _proto.destroy = function destroy() {
      this.unregisterListeners();
      this.details = null;
      this.lastMpegAudioChunk = null;
      // @ts-ignore
      this.hls = null;
    };
    _proto.registerListeners = function registerListeners() {
      var hls = this.hls;
      hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
      hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
      hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.on(Events.BUFFER_RESET, this.onBufferReset, this);
      hls.on(Events.BUFFER_APPENDING, this.onBufferAppending, this);
      hls.on(Events.BUFFER_CODECS, this.onBufferCodecs, this);
      hls.on(Events.BUFFER_EOS, this.onBufferEos, this);
      hls.on(Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
      hls.on(Events.LEVEL_UPDATED, this.onLevelUpdated, this);
      hls.on(Events.FRAG_PARSED, this.onFragParsed, this);
      hls.on(Events.FRAG_CHANGED, this.onFragChanged, this);
    };
    _proto.unregisterListeners = function unregisterListeners() {
      var hls = this.hls;
      hls.off(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
      hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
      hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.off(Events.BUFFER_RESET, this.onBufferReset, this);
      hls.off(Events.BUFFER_APPENDING, this.onBufferAppending, this);
      hls.off(Events.BUFFER_CODECS, this.onBufferCodecs, this);
      hls.off(Events.BUFFER_EOS, this.onBufferEos, this);
      hls.off(Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
      hls.off(Events.LEVEL_UPDATED, this.onLevelUpdated, this);
      hls.off(Events.FRAG_PARSED, this.onFragParsed, this);
      hls.off(Events.FRAG_CHANGED, this.onFragChanged, this);
    };
    _proto._initSourceBuffer = function _initSourceBuffer() {
      this.sourceBuffer = {};
      this.operationQueue = new BufferOperationQueue(this.sourceBuffer);
      this.listeners = {
        audio: [],
        video: [],
        audiovideo: []
      };
      this.appendErrors = {
        audio: 0,
        video: 0,
        audiovideo: 0
      };
      this.lastMpegAudioChunk = null;
    };
    _proto.onManifestLoading = function onManifestLoading() {
      this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = 0;
      this.details = null;
    };
    _proto.onManifestParsed = function onManifestParsed(event, data) {
      // in case of alt audio 2 BUFFER_CODECS events will be triggered, one per stream controller
      // sourcebuffers will be created all at once when the expected nb of tracks will be reached
      // in case alt audio is not used, only one BUFFER_CODEC event will be fired from main stream controller
      // it will contain the expected nb of source buffers, no need to compute it
      var codecEvents = 2;
      if (data.audio && !data.video || !data.altAudio || !false) {
        codecEvents = 1;
      }
      this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = codecEvents;
      this.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected");
    };
    _proto.onMediaAttaching = function onMediaAttaching(event, data) {
      var media = this.media = data.media;
      var MediaSource = getMediaSource(this.appendSource);
      if (media && MediaSource) {
        var _ms$constructor;
        var ms = this.mediaSource = new MediaSource();
        this.log("created media source: " + ((_ms$constructor = ms.constructor) == null ? void 0 : _ms$constructor.name));
        // MediaSource listeners are arrow functions with a lexical scope, and do not need to be bound
        ms.addEventListener('sourceopen', this._onMediaSourceOpen);
        ms.addEventListener('sourceended', this._onMediaSourceEnded);
        ms.addEventListener('sourceclose', this._onMediaSourceClose);
        if (this.appendSource) {
          ms.addEventListener('startstreaming', this._onStartStreaming);
          ms.addEventListener('endstreaming', this._onEndStreaming);
        }

        // cache the locally generated object url
        var objectUrl = this._objectUrl = self.URL.createObjectURL(ms);
        // link video and media Source
        if (this.appendSource) {
          try {
            media.removeAttribute('src');
            // ManagedMediaSource will not open without disableRemotePlayback set to false or source alternatives
            var MMS = self.ManagedMediaSource;
            media.disableRemotePlayback = media.disableRemotePlayback || MMS && ms instanceof MMS;
            removeSourceChildren(media);
            addSource(media, objectUrl);
            media.load();
          } catch (error) {
            media.src = objectUrl;
          }
        } else {
          media.src = objectUrl;
        }
        media.addEventListener('emptied', this._onMediaEmptied);
      }
    };
    _proto.onMediaDetaching = function onMediaDetaching() {
      var media = this.media,
        mediaSource = this.mediaSource,
        _objectUrl = this._objectUrl;
      if (mediaSource) {
        this.log('media source detaching');
        if (mediaSource.readyState === 'open') {
          try {
            // endOfStream could trigger exception if any sourcebuffer is in updating state
            // we don't really care about checking sourcebuffer state here,
            // as we are anyway detaching the MediaSource
            // let's just avoid this exception to propagate
            mediaSource.endOfStream();
          } catch (err) {
            this.warn("onMediaDetaching: " + err.message + " while calling endOfStream");
          }
        }
        // Clean up the SourceBuffers by invoking onBufferReset
        this.onBufferReset();
        mediaSource.removeEventListener('sourceopen', this._onMediaSourceOpen);
        mediaSource.removeEventListener('sourceended', this._onMediaSourceEnded);
        mediaSource.removeEventListener('sourceclose', this._onMediaSourceClose);
        if (this.appendSource) {
          mediaSource.removeEventListener('startstreaming', this._onStartStreaming);
          mediaSource.removeEventListener('endstreaming', this._onEndStreaming);
        }

        // Detach properly the MediaSource from the HTMLMediaElement as
        // suggested in https://github.com/w3c/media-source/issues/53.
        if (media) {
          media.removeEventListener('emptied', this._onMediaEmptied);
          if (_objectUrl) {
            self.URL.revokeObjectURL(_objectUrl);
          }

          // clean up video tag src only if it's our own url. some external libraries might
          // hijack the video tag and change its 'src' without destroying the Hls instance first
          if (this.mediaSrc === _objectUrl) {
            media.removeAttribute('src');
            if (this.appendSource) {
              removeSourceChildren(media);
            }
            media.load();
          } else {
            this.warn('media|source.src was changed by a third party - skip cleanup');
          }
        }
        this.mediaSource = null;
        this.media = null;
        this._objectUrl = null;
        this.bufferCodecEventsExpected = this._bufferCodecEventsTotal;
        this.pendingTracks = {};
        this.tracks = {};
      }
      this.hls.trigger(Events.MEDIA_DETACHED, undefined);
    };
    _proto.onBufferReset = function onBufferReset() {
      var _this2 = this;
      this.getSourceBufferTypes().forEach(function (type) {
        _this2.resetBuffer(type);
      });
      this._initSourceBuffer();
    };
    _proto.resetBuffer = function resetBuffer(type) {
      var sb = this.sourceBuffer[type];
      try {
        if (sb) {
          var _this$mediaSource;
          this.removeBufferListeners(type);
          // Synchronously remove the SB from the map before the next call in order to prevent an async function from
          // accessing it
          this.sourceBuffer[type] = undefined;
          if ((_this$mediaSource = this.mediaSource) != null && _this$mediaSource.sourceBuffers.length) {
            this.mediaSource.removeSourceBuffer(sb);
          }
        }
      } catch (err) {
        this.warn("onBufferReset " + type, err);
      }
    };
    _proto.onBufferCodecs = function onBufferCodecs(event, data) {
      var _this3 = this;
      var sourceBufferCount = this.getSourceBufferTypes().length;
      var trackNames = Object.keys(data);
      trackNames.forEach(function (trackName) {
        if (sourceBufferCount) {
          // check if SourceBuffer codec needs to change
          var track = _this3.tracks[trackName];
          if (track && typeof track.buffer.changeType === 'function') {
            var _trackCodec;
            var _data$trackName = data[trackName],
              id = _data$trackName.id,
              codec = _data$trackName.codec,
              levelCodec = _data$trackName.levelCodec,
              container = _data$trackName.container,
              metadata = _data$trackName.metadata;
            var currentCodecFull = pickMostCompleteCodecName(track.codec, track.levelCodec);
            var currentCodec = currentCodecFull == null ? void 0 : currentCodecFull.replace(VIDEO_CODEC_PROFILE_REPLACE, '$1');
            var trackCodec = pickMostCompleteCodecName(codec, levelCodec);
            var nextCodec = (_trackCodec = trackCodec) == null ? void 0 : _trackCodec.replace(VIDEO_CODEC_PROFILE_REPLACE, '$1');
            if (trackCodec && currentCodec !== nextCodec) {
              if (trackName.slice(0, 5) === 'audio') {
                trackCodec = getCodecCompatibleName(trackCodec, _this3.appendSource);
              }
              var mimeType = container + ";codecs=" + trackCodec;
              _this3.appendChangeType(trackName, mimeType);
              _this3.log("switching codec " + currentCodecFull + " to " + trackCodec);
              _this3.tracks[trackName] = {
                buffer: track.buffer,
                codec: codec,
                container: container,
                levelCodec: levelCodec,
                metadata: metadata,
                id: id
              };
            }
          }
        } else {
          // if source buffer(s) not created yet, appended buffer tracks in this.pendingTracks
          _this3.pendingTracks[trackName] = data[trackName];
        }
      });

      // if sourcebuffers already created, do nothing ...
      if (sourceBufferCount) {
        return;
      }
      var bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0);
      if (this.bufferCodecEventsExpected !== bufferCodecEventsExpected) {
        this.log(bufferCodecEventsExpected + " bufferCodec event(s) expected " + trackNames.join(','));
        this.bufferCodecEventsExpected = bufferCodecEventsExpected;
      }
      if (this.mediaSource && this.mediaSource.readyState === 'open') {
        this.checkPendingTracks();
      }
    };
    _proto.appendChangeType = function appendChangeType(type, mimeType) {
      var _this4 = this;
      var operationQueue = this.operationQueue;
      var operation = {
        execute: function execute() {
          var sb = _this4.sourceBuffer[type];
          if (sb) {
            _this4.log("changing " + type + " sourceBuffer type to " + mimeType);
            sb.changeType(mimeType);
          }
          operationQueue.shiftAndExecuteNext(type);
        },
        onStart: function onStart() {},
        onComplete: function onComplete() {},
        onError: function onError(error) {
          _this4.warn("Failed to change " + type + " SourceBuffer type", error);
        }
      };
      operationQueue.append(operation, type, !!this.pendingTracks[type]);
    };
    _proto.onBufferAppending = function onBufferAppending(event, eventData) {
      var _this5 = this;
      var hls = this.hls,
        operationQueue = this.operationQueue,
        tracks = this.tracks;
      var data = eventData.data,
        type = eventData.type,
        frag = eventData.frag,
        part = eventData.part,
        chunkMeta = eventData.chunkMeta;
      var chunkStats = chunkMeta.buffering[type];
      var bufferAppendingStart = self.performance.now();
      chunkStats.start = bufferAppendingStart;
      var fragBuffering = frag.stats.buffering;
      var partBuffering = part ? part.stats.buffering : null;
      if (fragBuffering.start === 0) {
        fragBuffering.start = bufferAppendingStart;
      }
      if (partBuffering && partBuffering.start === 0) {
        partBuffering.start = bufferAppendingStart;
      }

      // TODO: Only update timestampOffset when audio/mpeg fragment or part is not contiguous with previously appended
      // Adjusting `SourceBuffer.timestampOffset` (desired point in the timeline where the next frames should be appended)
      // in Chrome browser when we detect MPEG audio container and time delta between level PTS and `SourceBuffer.timestampOffset`
      // is greater than 100ms (this is enough to handle seek for VOD or level change for LIVE videos).
      // More info here: https://github.com/video-dev/hls.js/issues/332#issuecomment-257986486
      var audioTrack = tracks.audio;
      var checkTimestampOffset = false;
      if (type === 'audio' && (audioTrack == null ? void 0 : audioTrack.container) === 'audio/mpeg') {
        checkTimestampOffset = !this.lastMpegAudioChunk || chunkMeta.id === 1 || this.lastMpegAudioChunk.sn !== chunkMeta.sn;
        this.lastMpegAudioChunk = chunkMeta;
      }
      var fragStart = frag.start;
      var operation = {
        execute: function execute() {
          chunkStats.executeStart = self.performance.now();
          if (checkTimestampOffset) {
            var sb = _this5.sourceBuffer[type];
            if (sb) {
              var delta = fragStart - sb.timestampOffset;
              if (Math.abs(delta) >= 0.1) {
                _this5.log("Updating audio SourceBuffer timestampOffset to " + fragStart + " (delta: " + delta + ") sn: " + frag.sn + ")");
                sb.timestampOffset = fragStart;
              }
            }
          }
          _this5.appendExecutor(data, type);
        },
        onStart: function onStart() {
          // logger.debug(`[buffer-controller]: ${type} SourceBuffer updatestart`);
        },
        onComplete: function onComplete() {
          // logger.debug(`[buffer-controller]: ${type} SourceBuffer updateend`);
          var end = self.performance.now();
          chunkStats.executeEnd = chunkStats.end = end;
          if (fragBuffering.first === 0) {
            fragBuffering.first = end;
          }
          if (partBuffering && partBuffering.first === 0) {
            partBuffering.first = end;
          }
          var sourceBuffer = _this5.sourceBuffer;
          var timeRanges = {};
          for (var _type in sourceBuffer) {
            timeRanges[_type] = BufferHelper.getBuffered(sourceBuffer[_type]);
          }
          _this5.appendErrors[type] = 0;
          if (type === 'audio' || type === 'video') {
            _this5.appendErrors.audiovideo = 0;
          } else {
            _this5.appendErrors.audio = 0;
            _this5.appendErrors.video = 0;
          }
          _this5.hls.trigger(Events.BUFFER_APPENDED, {
            type: type,
            frag: frag,
            part: part,
            chunkMeta: chunkMeta,
            parent: frag.type,
            timeRanges: timeRanges
          });
        },
        onError: function onError(error) {
          // in case any error occured while appending, put back segment in segments table
          var event = {
            type: ErrorTypes.MEDIA_ERROR,
            parent: frag.type,
            details: ErrorDetails.BUFFER_APPEND_ERROR,
            sourceBufferName: type,
            frag: frag,
            part: part,
            chunkMeta: chunkMeta,
            error: error,
            err: error,
            fatal: false
          };
          if (error.code === DOMException.QUOTA_EXCEEDED_ERR) {
            // QuotaExceededError: http://www.w3.org/TR/html5/infrastructure.html#quotaexceedederror
            // let's stop appending any segments, and report BUFFER_FULL_ERROR error
            event.details = ErrorDetails.BUFFER_FULL_ERROR;
          } else {
            var appendErrorCount = ++_this5.appendErrors[type];
            event.details = ErrorDetails.BUFFER_APPEND_ERROR;
            /* with UHD content, we could get loop of quota exceeded error until
              browser is able to evict some data from sourcebuffer. Retrying can help recover.
            */
            _this5.warn("Failed " + appendErrorCount + "/" + hls.config.appendErrorMaxRetry + " times to append segment in \"" + type + "\" sourceBuffer");
            if (appendErrorCount >= hls.config.appendErrorMaxRetry) {
              event.fatal = true;
            }
          }
          hls.trigger(Events.ERROR, event);
        }
      };
      operationQueue.append(operation, type, !!this.pendingTracks[type]);
    };
    _proto.onBufferFlushing = function onBufferFlushing(event, data) {
      var _this6 = this;
      var operationQueue = this.operationQueue;
      var flushOperation = function flushOperation(type) {
        return {
          execute: _this6.removeExecutor.bind(_this6, type, data.startOffset, data.endOffset),
          onStart: function onStart() {
            // logger.debug(`[buffer-controller]: Started flushing ${data.startOffset} -> ${data.endOffset} for ${type} Source Buffer`);
          },
          onComplete: function onComplete() {
            // logger.debug(`[buffer-controller]: Finished flushing ${data.startOffset} -> ${data.endOffset} for ${type} Source Buffer`);
            _this6.hls.trigger(Events.BUFFER_FLUSHED, {
              type: type
            });
          },
          onError: function onError(error) {
            _this6.warn("Failed to remove from " + type + " SourceBuffer", error);
          }
        };
      };
      if (data.type) {
        operationQueue.append(flushOperation(data.type), data.type);
      } else {
        this.getSourceBufferTypes().forEach(function (type) {
          operationQueue.append(flushOperation(type), type);
        });
      }
    };
    _proto.onFragParsed = function onFragParsed(event, data) {
      var _this7 = this;
      var frag = data.frag,
        part = data.part;
      var buffersAppendedTo = [];
      var elementaryStreams = part ? part.elementaryStreams : frag.elementaryStreams;
      if (elementaryStreams[ElementaryStreamTypes.AUDIOVIDEO]) {
        buffersAppendedTo.push('audiovideo');
      } else {
        if (elementaryStreams[ElementaryStreamTypes.AUDIO]) {
          buffersAppendedTo.push('audio');
        }
        if (elementaryStreams[ElementaryStreamTypes.VIDEO]) {
          buffersAppendedTo.push('video');
        }
      }
      var onUnblocked = function onUnblocked() {
        var now = self.performance.now();
        frag.stats.buffering.end = now;
        if (part) {
          part.stats.buffering.end = now;
        }
        var stats = part ? part.stats : frag.stats;
        _this7.hls.trigger(Events.FRAG_BUFFERED, {
          frag: frag,
          part: part,
          stats: stats,
          id: frag.type
        });
      };
      if (buffersAppendedTo.length === 0) {
        this.warn("Fragments must have at least one ElementaryStreamType set. type: " + frag.type + " level: " + frag.level + " sn: " + frag.sn);
      }
      this.blockBuffers(onUnblocked, buffersAppendedTo);
    };
    _proto.onFragChanged = function onFragChanged(event, data) {
      this.trimBuffers();
    }

    // on BUFFER_EOS mark matching sourcebuffer(s) as ended and trigger checkEos()
    // an undefined data.type will mark all buffers as EOS.
    ;
    _proto.onBufferEos = function onBufferEos(event, data) {
      var _this8 = this;
      var ended = this.getSourceBufferTypes().reduce(function (acc, type) {
        var sb = _this8.sourceBuffer[type];
        if (sb && (!data.type || data.type === type)) {
          sb.ending = true;
          if (!sb.ended) {
            sb.ended = true;
            _this8.log(type + " sourceBuffer now EOS");
          }
        }
        return acc && !!(!sb || sb.ended);
      }, true);
      if (ended) {
        this.log("Queueing mediaSource.endOfStream()");
        this.blockBuffers(function () {
          _this8.getSourceBufferTypes().forEach(function (type) {
            var sb = _this8.sourceBuffer[type];
            if (sb) {
              sb.ending = false;
            }
          });
          var mediaSource = _this8.mediaSource;
          if (!mediaSource || mediaSource.readyState !== 'open') {
            if (mediaSource) {
              _this8.log("Could not call mediaSource.endOfStream(). mediaSource.readyState: " + mediaSource.readyState);
            }
            return;
          }
          _this8.log("Calling mediaSource.endOfStream()");
          // Allow this to throw and be caught by the enqueueing function
          mediaSource.endOfStream();
        });
      }
    };
    _proto.onLevelUpdated = function onLevelUpdated(event, _ref) {
      var details = _ref.details;
      if (!details.fragments.length) {
        return;
      }
      this.details = details;
      if (this.getSourceBufferTypes().length) {
        this.blockBuffers(this.updateMediaElementDuration.bind(this));
      } else {
        this.updateMediaElementDuration();
      }
    };
    _proto.trimBuffers = function trimBuffers() {
      var hls = this.hls,
        details = this.details,
        media = this.media;
      if (!media || details === null) {
        return;
      }
      var sourceBufferTypes = this.getSourceBufferTypes();
      if (!sourceBufferTypes.length) {
        return;
      }
      var config = hls.config;
      var currentTime = media.currentTime;
      var targetDuration = details.levelTargetDuration;

      // Support for deprecated liveBackBufferLength
      var backBufferLength = details.live && config.liveBackBufferLength !== null ? config.liveBackBufferLength : config.backBufferLength;
      if (isFiniteNumber(backBufferLength) && backBufferLength > 0) {
        var maxBackBufferLength = Math.max(backBufferLength, targetDuration);
        var targetBackBufferPosition = Math.floor(currentTime / targetDuration) * targetDuration - maxBackBufferLength;
        this.flushBackBuffer(currentTime, targetDuration, targetBackBufferPosition);
      }
      if (isFiniteNumber(config.frontBufferFlushThreshold) && config.frontBufferFlushThreshold > 0) {
        var frontBufferLength = Math.max(config.maxBufferLength, config.frontBufferFlushThreshold);
        var maxFrontBufferLength = Math.max(frontBufferLength, targetDuration);
        var targetFrontBufferPosition = Math.floor(currentTime / targetDuration) * targetDuration + maxFrontBufferLength;
        this.flushFrontBuffer(currentTime, targetDuration, targetFrontBufferPosition);
      }
    };
    _proto.flushBackBuffer = function flushBackBuffer(currentTime, targetDuration, targetBackBufferPosition) {
      var _this9 = this;
      var details = this.details,
        sourceBuffer = this.sourceBuffer;
      var sourceBufferTypes = this.getSourceBufferTypes();
      sourceBufferTypes.forEach(function (type) {
        var sb = sourceBuffer[type];
        if (sb) {
          var buffered = BufferHelper.getBuffered(sb);
          // when target buffer start exceeds actual buffer start
          if (buffered.length > 0 && targetBackBufferPosition > buffered.start(0)) {
            _this9.hls.trigger(Events.BACK_BUFFER_REACHED, {
              bufferEnd: targetBackBufferPosition
            });

            // Support for deprecated event:
            if (details != null && details.live) {
              _this9.hls.trigger(Events.LIVE_BACK_BUFFER_REACHED, {
                bufferEnd: targetBackBufferPosition
              });
            } else if (sb.ended && buffered.end(buffered.length - 1) - currentTime < targetDuration * 2) {
              _this9.log("Cannot flush " + type + " back buffer while SourceBuffer is in ended state");
              return;
            }
            _this9.hls.trigger(Events.BUFFER_FLUSHING, {
              startOffset: 0,
              endOffset: targetBackBufferPosition,
              type: type
            });
          }
        }
      });
    };
    _proto.flushFrontBuffer = function flushFrontBuffer(currentTime, targetDuration, targetFrontBufferPosition) {
      var _this10 = this;
      var sourceBuffer = this.sourceBuffer;
      var sourceBufferTypes = this.getSourceBufferTypes();
      sourceBufferTypes.forEach(function (type) {
        var sb = sourceBuffer[type];
        if (sb) {
          var buffered = BufferHelper.getBuffered(sb);
          var numBufferedRanges = buffered.length;
          // The buffer is either empty or contiguous
          if (numBufferedRanges < 2) {
            return;
          }
          var bufferStart = buffered.start(numBufferedRanges - 1);
          var bufferEnd = buffered.end(numBufferedRanges - 1);
          // No flush if we can tolerate the current buffer length or the current buffer range we would flush is contiguous with current position
          if (targetFrontBufferPosition > bufferStart || currentTime >= bufferStart && currentTime <= bufferEnd) {
            return;
          } else if (sb.ended && currentTime - bufferEnd < 2 * targetDuration) {
            _this10.log("Cannot flush " + type + " front buffer while SourceBuffer is in ended state");
            return;
          }
          _this10.hls.trigger(Events.BUFFER_FLUSHING, {
            startOffset: bufferStart,
            endOffset: Infinity,
            type: type
          });
        }
      });
    }

    /**
     * Update Media Source duration to current level duration or override to Infinity if configuration parameter
     * 'liveDurationInfinity` is set to `true`
     * More details: https://github.com/video-dev/hls.js/issues/355
     */;
    _proto.updateMediaElementDuration = function updateMediaElementDuration() {
      if (!this.details || !this.media || !this.mediaSource || this.mediaSource.readyState !== 'open') {
        return;
      }
      var details = this.details,
        hls = this.hls,
        media = this.media,
        mediaSource = this.mediaSource;
      var levelDuration = details.fragments[0].start + details.totalduration;
      var mediaDuration = media.duration;
      var msDuration = isFiniteNumber(mediaSource.duration) ? mediaSource.duration : 0;
      if (details.live && hls.config.liveDurationInfinity) {
        // Override duration to Infinity
        mediaSource.duration = Infinity;
        this.updateSeekableRange(details);
      } else if (levelDuration > msDuration && levelDuration > mediaDuration || !isFiniteNumber(mediaDuration)) {
        // levelDuration was the last value we set.
        // not using mediaSource.duration as the browser may tweak this value
        // only update Media Source duration if its value increase, this is to avoid
        // flushing already buffered portion when switching between quality level
        this.log("Updating Media Source duration to " + levelDuration.toFixed(3));
        mediaSource.duration = levelDuration;
      }
    };
    _proto.updateSeekableRange = function updateSeekableRange(levelDetails) {
      var mediaSource = this.mediaSource;
      var fragments = levelDetails.fragments;
      var len = fragments.length;
      if (len && levelDetails.live && mediaSource != null && mediaSource.setLiveSeekableRange) {
        var start = Math.max(0, fragments[0].start);
        var end = Math.max(start, start + levelDetails.totalduration);
        this.log("Media Source duration is set to " + mediaSource.duration + ". Setting seekable range to " + start + "-" + end + ".");
        mediaSource.setLiveSeekableRange(start, end);
      }
    };
    _proto.checkPendingTracks = function checkPendingTracks() {
      var bufferCodecEventsExpected = this.bufferCodecEventsExpected,
        operationQueue = this.operationQueue,
        pendingTracks = this.pendingTracks;

      // Check if we've received all of the expected bufferCodec events. When none remain, create all the sourceBuffers at once.
      // This is important because the MSE spec allows implementations to throw QuotaExceededErrors if creating new sourceBuffers after
      // data has been appended to existing ones.
      // 2 tracks is the max (one for audio, one for video). If we've reach this max go ahead and create the buffers.
      var pendingTracksCount = Object.keys(pendingTracks).length;
      if (pendingTracksCount && (!bufferCodecEventsExpected || pendingTracksCount === 2 || 'audiovideo' in pendingTracks)) {
        // ok, let's create them now !
        this.createSourceBuffers(pendingTracks);
        this.pendingTracks = {};
        // append any pending segments now !
        var buffers = this.getSourceBufferTypes();
        if (buffers.length) {
          this.hls.trigger(Events.BUFFER_CREATED, {
            tracks: this.tracks
          });
          buffers.forEach(function (type) {
            operationQueue.executeNext(type);
          });
        } else {
          var error = new Error('could not create source buffer for media codec(s)');
          this.hls.trigger(Events.ERROR, {
            type: ErrorTypes.MEDIA_ERROR,
            details: ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR,
            fatal: true,
            error: error,
            reason: error.message
          });
        }
      }
    };
    _proto.createSourceBuffers = function createSourceBuffers(tracks) {
      var _this11 = this;
      var sourceBuffer = this.sourceBuffer,
        mediaSource = this.mediaSource;
      if (!mediaSource) {
        throw Error('createSourceBuffers called when mediaSource was null');
      }
      var _loop = function _loop(trackName) {
        if (!sourceBuffer[trackName]) {
          var _track$levelCodec;
          var track = tracks[trackName];
          if (!track) {
            throw Error("source buffer exists for track " + trackName + ", however track does not");
          }
          // use levelCodec as first priority unless it contains multiple comma-separated codec values
          var codec = ((_track$levelCodec = track.levelCodec) == null ? void 0 : _track$levelCodec.indexOf(',')) === -1 ? track.levelCodec : track.codec;
          if (codec) {
            if (trackName.slice(0, 5) === 'audio') {
              codec = getCodecCompatibleName(codec, _this11.appendSource);
            }
          }
          var mimeType = track.container + ";codecs=" + codec;
          _this11.log("creating sourceBuffer(" + mimeType + ")");
          try {
            var sb = sourceBuffer[trackName] = mediaSource.addSourceBuffer(mimeType);
            var sbName = trackName;
            _this11.addBufferListener(sbName, 'updatestart', _this11._onSBUpdateStart);
            _this11.addBufferListener(sbName, 'updateend', _this11._onSBUpdateEnd);
            _this11.addBufferListener(sbName, 'error', _this11._onSBUpdateError);
            // ManagedSourceBuffer bufferedchange event
            if (_this11.appendSource) {
              _this11.addBufferListener(sbName, 'bufferedchange', function (type, event) {
                // If media was ejected check for a change. Added ranges are redundant with changes on 'updateend' event.
                var removedRanges = event.removedRanges;
                if (removedRanges != null && removedRanges.length) {
                  _this11.hls.trigger(Events.BUFFER_FLUSHED, {
                    type: trackName
                  });
                }
              });
            }
            _this11.tracks[trackName] = {
              buffer: sb,
              codec: codec,
              container: track.container,
              levelCodec: track.levelCodec,
              metadata: track.metadata,
              id: track.id
            };
          } catch (err) {
            _this11.error("error while trying to add sourceBuffer: " + err.message);
            _this11.hls.trigger(Events.ERROR, {
              type: ErrorTypes.MEDIA_ERROR,
              details: ErrorDetails.BUFFER_ADD_CODEC_ERROR,
              fatal: false,
              error: err,
              sourceBufferName: trackName,
              mimeType: mimeType
            });
          }
        }
      };
      for (var trackName in tracks) {
        _loop(trackName);
      }
    };
    _proto._onSBUpdateStart = function _onSBUpdateStart(type) {
      var operationQueue = this.operationQueue;
      var operation = operationQueue.current(type);
      operation.onStart();
    };
    _proto._onSBUpdateEnd = function _onSBUpdateEnd(type) {
      var _this$mediaSource2;
      if (((_this$mediaSource2 = this.mediaSource) == null ? void 0 : _this$mediaSource2.readyState) === 'closed') {
        this.resetBuffer(type);
        return;
      }
      var operationQueue = this.operationQueue;
      var operation = operationQueue.current(type);
      operation.onComplete();
      operationQueue.shiftAndExecuteNext(type);
    };
    _proto._onSBUpdateError = function _onSBUpdateError(type, event) {
      var _this$mediaSource3;
      var error = new Error(type + " SourceBuffer error. MediaSource readyState: " + ((_this$mediaSource3 = this.mediaSource) == null ? void 0 : _this$mediaSource3.readyState));
      this.error("" + error, event);
      // according to http://www.w3.org/TR/media-source/#sourcebuffer-append-error
      // SourceBuffer errors are not necessarily fatal; if so, the HTMLMediaElement will fire an error event
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.BUFFER_APPENDING_ERROR,
        sourceBufferName: type,
        error: error,
        fatal: false
      });
      // updateend is always fired after error, so we'll allow that to shift the current operation off of the queue
      var operation = this.operationQueue.current(type);
      if (operation) {
        operation.onError(error);
      }
    }

    // This method must result in an updateend event; if remove is not called, _onSBUpdateEnd must be called manually
    ;
    _proto.removeExecutor = function removeExecutor(type, startOffset, endOffset) {
      var media = this.media,
        mediaSource = this.mediaSource,
        operationQueue = this.operationQueue,
        sourceBuffer = this.sourceBuffer;
      var sb = sourceBuffer[type];
      if (!media || !mediaSource || !sb) {
        this.warn("Attempting to remove from the " + type + " SourceBuffer, but it does not exist");
        operationQueue.shiftAndExecuteNext(type);
        return;
      }
      var mediaDuration = isFiniteNumber(media.duration) ? media.duration : Infinity;
      var msDuration = isFiniteNumber(mediaSource.duration) ? mediaSource.duration : Infinity;
      var removeStart = Math.max(0, startOffset);
      var removeEnd = Math.min(endOffset, mediaDuration, msDuration);
      if (removeEnd > removeStart && (!sb.ending || sb.ended)) {
        sb.ended = false;
        this.log("Removing [" + removeStart + "," + removeEnd + "] from the " + type + " SourceBuffer");
        sb.remove(removeStart, removeEnd);
      } else {
        // Cycle the queue
        operationQueue.shiftAndExecuteNext(type);
      }
    }

    // This method must result in an updateend event; if append is not called, _onSBUpdateEnd must be called manually
    ;
    _proto.appendExecutor = function appendExecutor(data, type) {
      var sb = this.sourceBuffer[type];
      if (!sb) {
        if (!this.pendingTracks[type]) {
          throw new Error("Attempting to append to the " + type + " SourceBuffer, but it does not exist");
        }
        return;
      }
      sb.ended = false;
      sb.appendBuffer(data);
    }

    // Enqueues an operation to each SourceBuffer queue which, upon execution, resolves a promise. When all promises
    // resolve, the onUnblocked function is executed. Functions calling this method do not need to unblock the queue
    // upon completion, since we already do it here
    ;
    _proto.blockBuffers = function blockBuffers(onUnblocked, buffers) {
      var _this12 = this;
      if (buffers === void 0) {
        buffers = this.getSourceBufferTypes();
      }
      if (!buffers.length) {
        this.log('Blocking operation requested, but no SourceBuffers exist');
        Promise.resolve().then(onUnblocked);
        return;
      }
      var operationQueue = this.operationQueue;

      // logger.debug(`[buffer-controller]: Blocking ${buffers} SourceBuffer`);
      var blockingOperations = buffers.map(function (type) {
        return operationQueue.appendBlocker(type);
      });
      Promise.all(blockingOperations).then(function () {
        // logger.debug(`[buffer-controller]: Blocking operation resolved; unblocking ${buffers} SourceBuffer`);
        onUnblocked();
        buffers.forEach(function (type) {
          var sb = _this12.sourceBuffer[type];
          // Only cycle the queue if the SB is not updating. There's a bug in Chrome which sets the SB updating flag to
          // true when changing the MediaSource duration (https://bugs.chromium.org/p/chromium/issues/detail?id=959359&can=2&q=mediasource%20duration)
          // While this is a workaround, it's probably useful to have around
          if (!(sb != null && sb.updating)) {
            operationQueue.shiftAndExecuteNext(type);
          }
        });
      });
    };
    _proto.getSourceBufferTypes = function getSourceBufferTypes() {
      return Object.keys(this.sourceBuffer);
    };
    _proto.addBufferListener = function addBufferListener(type, event, fn) {
      var buffer = this.sourceBuffer[type];
      if (!buffer) {
        return;
      }
      var listener = fn.bind(this, type);
      this.listeners[type].push({
        event: event,
        listener: listener
      });
      buffer.addEventListener(event, listener);
    };
    _proto.removeBufferListeners = function removeBufferListeners(type) {
      var buffer = this.sourceBuffer[type];
      if (!buffer) {
        return;
      }
      this.listeners[type].forEach(function (l) {
        buffer.removeEventListener(l.event, l.listener);
      });
    };
    _createClass(BufferController, [{
      key: "mediaSrc",
      get: function get() {
        var _this$media;
        var media = ((_this$media = this.media) == null ? void 0 : _this$media.firstChild) || this.media;
        return media == null ? void 0 : media.src;
      }
    }]);
    return BufferController;
  }();
  function removeSourceChildren(node) {
    var sourceChildren = node.querySelectorAll('source');
    [].slice.call(sourceChildren).forEach(function (source) {
      node.removeChild(source);
    });
  }
  function addSource(media, url) {
    var source = self.document.createElement('source');
    source.type = 'video/mp4';
    source.src = url;
    media.appendChild(source);
  }

  var CapLevelController = /*#__PURE__*/function () {
    function CapLevelController(hls) {
      this.hls = void 0;
      this.autoLevelCapping = void 0;
      this.firstLevel = void 0;
      this.media = void 0;
      this.restrictedLevels = void 0;
      this.timer = void 0;
      this.clientRect = void 0;
      this.streamController = void 0;
      this.hls = hls;
      this.autoLevelCapping = Number.POSITIVE_INFINITY;
      this.firstLevel = -1;
      this.media = null;
      this.restrictedLevels = [];
      this.timer = undefined;
      this.clientRect = null;
      this.registerListeners();
    }
    var _proto = CapLevelController.prototype;
    _proto.setStreamController = function setStreamController(streamController) {
      this.streamController = streamController;
    };
    _proto.destroy = function destroy() {
      if (this.hls) {
        this.unregisterListener();
      }
      if (this.timer) {
        this.stopCapping();
      }
      this.media = null;
      this.clientRect = null;
      // @ts-ignore
      this.hls = this.streamController = null;
    };
    _proto.registerListeners = function registerListeners() {
      var hls = this.hls;
      hls.on(Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this);
      hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
      hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.on(Events.LEVELS_UPDATED, this.onLevelsUpdated, this);
      hls.on(Events.BUFFER_CODECS, this.onBufferCodecs, this);
      hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
    };
    _proto.unregisterListener = function unregisterListener() {
      var hls = this.hls;
      hls.off(Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this);
      hls.off(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
      hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.off(Events.LEVELS_UPDATED, this.onLevelsUpdated, this);
      hls.off(Events.BUFFER_CODECS, this.onBufferCodecs, this);
      hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
    };
    _proto.onFpsDropLevelCapping = function onFpsDropLevelCapping(event, data) {
      // Don't add a restricted level more than once
      var level = this.hls.levels[data.droppedLevel];
      if (this.isLevelAllowed(level)) {
        this.restrictedLevels.push({
          bitrate: level.bitrate,
          height: level.height,
          width: level.width
        });
      }
    };
    _proto.onMediaAttaching = function onMediaAttaching(event, data) {
      this.media = data.media instanceof HTMLVideoElement ? data.media : null;
      this.clientRect = null;
      if (this.timer && this.hls.levels.length) {
        this.detectPlayerSize();
      }
    };
    _proto.onManifestParsed = function onManifestParsed(event, data) {
      var hls = this.hls;
      this.restrictedLevels = [];
      this.firstLevel = data.firstLevel;
      if (hls.config.capLevelToPlayerSize && data.video) {
        // Start capping immediately if the manifest has signaled video codecs
        this.startCapping();
      }
    };
    _proto.onLevelsUpdated = function onLevelsUpdated(event, data) {
      if (this.timer && isFiniteNumber(this.autoLevelCapping)) {
        this.detectPlayerSize();
      }
    }

    // Only activate capping when playing a video stream; otherwise, multi-bitrate audio-only streams will be restricted
    // to the first level
    ;
    _proto.onBufferCodecs = function onBufferCodecs(event, data) {
      var hls = this.hls;
      if (hls.config.capLevelToPlayerSize && data.video) {
        // If the manifest did not signal a video codec capping has been deferred until we're certain video is present
        this.startCapping();
      }
    };
    _proto.onMediaDetaching = function onMediaDetaching() {
      this.stopCapping();
    };
    _proto.detectPlayerSize = function detectPlayerSize() {
      if (this.media) {
        if (this.mediaHeight <= 0 || this.mediaWidth <= 0) {
          this.clientRect = null;
          return;
        }
        var levels = this.hls.levels;
        if (levels.length) {
          var hls = this.hls;
          var maxLevel = this.getMaxLevel(levels.length - 1);
          if (maxLevel !== this.autoLevelCapping) {
            logger.log("Setting autoLevelCapping to " + maxLevel + ": " + levels[maxLevel].height + "p@" + levels[maxLevel].bitrate + " for media " + this.mediaWidth + "x" + this.mediaHeight);
          }
          hls.autoLevelCapping = maxLevel;
          if (hls.autoLevelCapping > this.autoLevelCapping && this.streamController) {
            // if auto level capping has a higher value for the previous one, flush the buffer using nextLevelSwitch
            // usually happen when the user go to the fullscreen mode.
            this.streamController.nextLevelSwitch();
          }
          this.autoLevelCapping = hls.autoLevelCapping;
        }
      }
    }

    /*
     * returns level should be the one with the dimensions equal or greater than the media (player) dimensions (so the video will be downscaled)
     */;
    _proto.getMaxLevel = function getMaxLevel(capLevelIndex) {
      var _this = this;
      var levels = this.hls.levels;
      if (!levels.length) {
        return -1;
      }
      var validLevels = levels.filter(function (level, index) {
        return _this.isLevelAllowed(level) && index <= capLevelIndex;
      });
      this.clientRect = null;
      return CapLevelController.getMaxLevelByMediaSize(validLevels, this.mediaWidth, this.mediaHeight);
    };
    _proto.startCapping = function startCapping() {
      if (this.timer) {
        // Don't reset capping if started twice; this can happen if the manifest signals a video codec
        return;
      }
      this.autoLevelCapping = Number.POSITIVE_INFINITY;
      self.clearInterval(this.timer);
      this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1000);
      this.detectPlayerSize();
    };
    _proto.stopCapping = function stopCapping() {
      this.restrictedLevels = [];
      this.firstLevel = -1;
      this.autoLevelCapping = Number.POSITIVE_INFINITY;
      if (this.timer) {
        self.clearInterval(this.timer);
        this.timer = undefined;
      }
    };
    _proto.getDimensions = function getDimensions() {
      if (this.clientRect) {
        return this.clientRect;
      }
      var media = this.media;
      var boundsRect = {
        width: 0,
        height: 0
      };
      if (media) {
        var clientRect = media.getBoundingClientRect();
        boundsRect.width = clientRect.width;
        boundsRect.height = clientRect.height;
        if (!boundsRect.width && !boundsRect.height) {
          // When the media element has no width or height (equivalent to not being in the DOM),
          // then use its width and height attributes (media.width, media.height)
          boundsRect.width = clientRect.right - clientRect.left || media.width || 0;
          boundsRect.height = clientRect.bottom - clientRect.top || media.height || 0;
        }
      }
      this.clientRect = boundsRect;
      return boundsRect;
    };
    _proto.isLevelAllowed = function isLevelAllowed(level) {
      var restrictedLevels = this.restrictedLevels;
      return !restrictedLevels.some(function (restrictedLevel) {
        return level.bitrate === restrictedLevel.bitrate && level.width === restrictedLevel.width && level.height === restrictedLevel.height;
      });
    };
    CapLevelController.getMaxLevelByMediaSize = function getMaxLevelByMediaSize(levels, width, height) {
      if (!(levels != null && levels.length)) {
        return -1;
      }

      // Levels can have the same dimensions but differing bandwidths - since levels are ordered, we can look to the next
      // to determine whether we've chosen the greatest bandwidth for the media's dimensions
      var atGreatestBandwidth = function atGreatestBandwidth(curLevel, nextLevel) {
        if (!nextLevel) {
          return true;
        }
        return curLevel.width !== nextLevel.width || curLevel.height !== nextLevel.height;
      };

      // If we run through the loop without breaking, the media's dimensions are greater than every level, so default to
      // the max level
      var maxLevelIndex = levels.length - 1;
      // Prevent changes in aspect-ratio from causing capping to toggle back and forth
      var squareSize = Math.max(width, height);
      for (var i = 0; i < levels.length; i += 1) {
        var level = levels[i];
        if ((level.width >= squareSize || level.height >= squareSize) && atGreatestBandwidth(level, levels[i + 1])) {
          maxLevelIndex = i;
          break;
        }
      }
      return maxLevelIndex;
    };
    _createClass(CapLevelController, [{
      key: "mediaWidth",
      get: function get() {
        return this.getDimensions().width * this.contentScaleFactor;
      }
    }, {
      key: "mediaHeight",
      get: function get() {
        return this.getDimensions().height * this.contentScaleFactor;
      }
    }, {
      key: "contentScaleFactor",
      get: function get() {
        var pixelRatio = 1;
        if (!this.hls.config.ignoreDevicePixelRatio) {
          try {
            pixelRatio = self.devicePixelRatio;
          } catch (e) {
            /* no-op */
          }
        }
        return pixelRatio;
      }
    }]);
    return CapLevelController;
  }();

  var FPSController = /*#__PURE__*/function () {
    function FPSController(hls) {
      this.hls = void 0;
      this.isVideoPlaybackQualityAvailable = false;
      this.timer = void 0;
      this.media = null;
      this.lastTime = void 0;
      this.lastDroppedFrames = 0;
      this.lastDecodedFrames = 0;
      // stream controller must be provided as a dependency!
      this.streamController = void 0;
      this.hls = hls;
      this.registerListeners();
    }
    var _proto = FPSController.prototype;
    _proto.setStreamController = function setStreamController(streamController) {
      this.streamController = streamController;
    };
    _proto.registerListeners = function registerListeners() {
      this.hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
    };
    _proto.unregisterListeners = function unregisterListeners() {
      this.hls.off(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
    };
    _proto.destroy = function destroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.unregisterListeners();
      this.isVideoPlaybackQualityAvailable = false;
      this.media = null;
    };
    _proto.onMediaAttaching = function onMediaAttaching(event, data) {
      var config = this.hls.config;
      if (config.capLevelOnFPSDrop) {
        var media = data.media instanceof self.HTMLVideoElement ? data.media : null;
        this.media = media;
        if (media && typeof media.getVideoPlaybackQuality === 'function') {
          this.isVideoPlaybackQualityAvailable = true;
        }
        self.clearInterval(this.timer);
        this.timer = self.setInterval(this.checkFPSInterval.bind(this), config.fpsDroppedMonitoringPeriod);
      }
    };
    _proto.checkFPS = function checkFPS(video, decodedFrames, droppedFrames) {
      var currentTime = performance.now();
      if (decodedFrames) {
        if (this.lastTime) {
          var currentPeriod = currentTime - this.lastTime;
          var currentDropped = droppedFrames - this.lastDroppedFrames;
          var currentDecoded = decodedFrames - this.lastDecodedFrames;
          var droppedFPS = 1000 * currentDropped / currentPeriod;
          var hls = this.hls;
          hls.trigger(Events.FPS_DROP, {
            currentDropped: currentDropped,
            currentDecoded: currentDecoded,
            totalDroppedFrames: droppedFrames
          });
          if (droppedFPS > 0) {
            // logger.log('checkFPS : droppedFPS/decodedFPS:' + droppedFPS/(1000 * currentDecoded / currentPeriod));
            if (currentDropped > hls.config.fpsDroppedMonitoringThreshold * currentDecoded) {
              var currentLevel = hls.currentLevel;
              logger.warn('drop FPS ratio greater than max allowed value for currentLevel: ' + currentLevel);
              if (currentLevel > 0 && (hls.autoLevelCapping === -1 || hls.autoLevelCapping >= currentLevel)) {
                currentLevel = currentLevel - 1;
                hls.trigger(Events.FPS_DROP_LEVEL_CAPPING, {
                  level: currentLevel,
                  droppedLevel: hls.currentLevel
                });
                hls.autoLevelCapping = currentLevel;
                this.streamController.nextLevelSwitch();
              }
            }
          }
        }
        this.lastTime = currentTime;
        this.lastDroppedFrames = droppedFrames;
        this.lastDecodedFrames = decodedFrames;
      }
    };
    _proto.checkFPSInterval = function checkFPSInterval() {
      var video = this.media;
      if (video) {
        if (this.isVideoPlaybackQualityAvailable) {
          var videoPlaybackQuality = video.getVideoPlaybackQuality();
          this.checkFPS(video, videoPlaybackQuality.totalVideoFrames, videoPlaybackQuality.droppedVideoFrames);
        } else {
          // HTMLVideoElement doesn't include the webkit types
          this.checkFPS(video, video.webkitDecodedFrameCount, video.webkitDroppedFrameCount);
        }
      }
    };
    return FPSController;
  }();

  var PATHWAY_PENALTY_DURATION_MS = 300000;
  var ContentSteeringController = /*#__PURE__*/function () {
    function ContentSteeringController(hls) {
      this.hls = void 0;
      this.log = void 0;
      this.loader = null;
      this.uri = null;
      this.pathwayId = '.';
      this.pathwayPriority = null;
      this.timeToLoad = 300;
      this.reloadTimer = -1;
      this.updated = 0;
      this.started = false;
      this.enabled = true;
      this.levels = null;
      this.audioTracks = null;
      this.subtitleTracks = null;
      this.penalizedPathways = {};
      this.hls = hls;
      this.log = logger.log.bind(logger, "[content-steering]:");
      this.registerListeners();
    }
    var _proto = ContentSteeringController.prototype;
    _proto.registerListeners = function registerListeners() {
      var hls = this.hls;
      hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.on(Events.MANIFEST_LOADED, this.onManifestLoaded, this);
      hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.on(Events.ERROR, this.onError, this);
    };
    _proto.unregisterListeners = function unregisterListeners() {
      var hls = this.hls;
      if (!hls) {
        return;
      }
      hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.off(Events.MANIFEST_LOADED, this.onManifestLoaded, this);
      hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.off(Events.ERROR, this.onError, this);
    };
    _proto.startLoad = function startLoad() {
      this.started = true;
      this.clearTimeout();
      if (this.enabled && this.uri) {
        if (this.updated) {
          var ttl = this.timeToLoad * 1000 - (performance.now() - this.updated);
          if (ttl > 0) {
            this.scheduleRefresh(this.uri, ttl);
            return;
          }
        }
        this.loadSteeringManifest(this.uri);
      }
    };
    _proto.stopLoad = function stopLoad() {
      this.started = false;
      if (this.loader) {
        this.loader.destroy();
        this.loader = null;
      }
      this.clearTimeout();
    };
    _proto.clearTimeout = function clearTimeout() {
      if (this.reloadTimer !== -1) {
        self.clearTimeout(this.reloadTimer);
        this.reloadTimer = -1;
      }
    };
    _proto.destroy = function destroy() {
      this.unregisterListeners();
      this.stopLoad();
      // @ts-ignore
      this.hls = null;
      this.levels = this.audioTracks = this.subtitleTracks = null;
    };
    _proto.removeLevel = function removeLevel(levelToRemove) {
      var levels = this.levels;
      if (levels) {
        this.levels = levels.filter(function (level) {
          return level !== levelToRemove;
        });
      }
    };
    _proto.onManifestLoading = function onManifestLoading() {
      this.stopLoad();
      this.enabled = true;
      this.timeToLoad = 300;
      this.updated = 0;
      this.uri = null;
      this.pathwayId = '.';
      this.levels = this.audioTracks = this.subtitleTracks = null;
    };
    _proto.onManifestLoaded = function onManifestLoaded(event, data) {
      var contentSteering = data.contentSteering;
      if (contentSteering === null) {
        return;
      }
      this.pathwayId = contentSteering.pathwayId;
      this.uri = contentSteering.uri;
      if (this.started) {
        this.startLoad();
      }
    };
    _proto.onManifestParsed = function onManifestParsed(event, data) {
      this.audioTracks = data.audioTracks;
      this.subtitleTracks = data.subtitleTracks;
    };
    _proto.onError = function onError(event, data) {
      var errorAction = data.errorAction;
      if ((errorAction == null ? void 0 : errorAction.action) === NetworkErrorAction.SendAlternateToPenaltyBox && errorAction.flags === ErrorActionFlags.MoveAllAlternatesMatchingHost) {
        var levels = this.levels;
        var pathwayPriority = this.pathwayPriority;
        var errorPathway = this.pathwayId;
        if (data.context) {
          var _data$context = data.context,
            groupId = _data$context.groupId,
            _pathwayId = _data$context.pathwayId,
            type = _data$context.type;
          if (groupId && levels) {
            errorPathway = this.getPathwayForGroupId(groupId, type, errorPathway);
          } else if (_pathwayId) {
            errorPathway = _pathwayId;
          }
        }
        if (!(errorPathway in this.penalizedPathways)) {
          this.penalizedPathways[errorPathway] = performance.now();
        }
        if (!pathwayPriority && levels) {
          // If PATHWAY-PRIORITY was not provided, list pathways for error handling
          pathwayPriority = levels.reduce(function (pathways, level) {
            if (pathways.indexOf(level.pathwayId) === -1) {
              pathways.push(level.pathwayId);
            }
            return pathways;
          }, []);
        }
        if (pathwayPriority && pathwayPriority.length > 1) {
          this.updatePathwayPriority(pathwayPriority);
          errorAction.resolved = this.pathwayId !== errorPathway;
        }
        if (!errorAction.resolved) {
          logger.warn("Could not resolve " + data.details + " (\"" + data.error.message + "\") with content-steering for Pathway: " + errorPathway + " levels: " + (levels ? levels.length : levels) + " priorities: " + JSON.stringify(pathwayPriority) + " penalized: " + JSON.stringify(this.penalizedPathways));
        }
      }
    };
    _proto.filterParsedLevels = function filterParsedLevels(levels) {
      // Filter levels to only include those that are in the initial pathway
      this.levels = levels;
      var pathwayLevels = this.getLevelsForPathway(this.pathwayId);
      if (pathwayLevels.length === 0) {
        var _pathwayId2 = levels[0].pathwayId;
        this.log("No levels found in Pathway " + this.pathwayId + ". Setting initial Pathway to \"" + _pathwayId2 + "\"");
        pathwayLevels = this.getLevelsForPathway(_pathwayId2);
        this.pathwayId = _pathwayId2;
      }
      if (pathwayLevels.length !== levels.length) {
        this.log("Found " + pathwayLevels.length + "/" + levels.length + " levels in Pathway \"" + this.pathwayId + "\"");
        return pathwayLevels;
      }
      return levels;
    };
    _proto.getLevelsForPathway = function getLevelsForPathway(pathwayId) {
      if (this.levels === null) {
        return [];
      }
      return this.levels.filter(function (level) {
        return pathwayId === level.pathwayId;
      });
    };
    _proto.updatePathwayPriority = function updatePathwayPriority(pathwayPriority) {
      this.pathwayPriority = pathwayPriority;
      var levels;

      // Evaluate if we should remove the pathway from the penalized list
      var penalizedPathways = this.penalizedPathways;
      var now = performance.now();
      Object.keys(penalizedPathways).forEach(function (pathwayId) {
        if (now - penalizedPathways[pathwayId] > PATHWAY_PENALTY_DURATION_MS) {
          delete penalizedPathways[pathwayId];
        }
      });
      for (var i = 0; i < pathwayPriority.length; i++) {
        var _pathwayId3 = pathwayPriority[i];
        if (_pathwayId3 in penalizedPathways) {
          continue;
        }
        if (_pathwayId3 === this.pathwayId) {
          return;
        }
        var selectedIndex = this.hls.nextLoadLevel;
        var selectedLevel = this.hls.levels[selectedIndex];
        levels = this.getLevelsForPathway(_pathwayId3);
        if (levels.length > 0) {
          this.log("Setting Pathway to \"" + _pathwayId3 + "\"");
          this.pathwayId = _pathwayId3;
          reassignFragmentLevelIndexes(levels);
          this.hls.trigger(Events.LEVELS_UPDATED, {
            levels: levels
          });
          // Set LevelController's level to trigger LEVEL_SWITCHING which loads playlist if needed
          var levelAfterChange = this.hls.levels[selectedIndex];
          if (selectedLevel && levelAfterChange && this.levels) {
            if (levelAfterChange.attrs['STABLE-VARIANT-ID'] !== selectedLevel.attrs['STABLE-VARIANT-ID'] && levelAfterChange.bitrate !== selectedLevel.bitrate) {
              this.log("Unstable Pathways change from bitrate " + selectedLevel.bitrate + " to " + levelAfterChange.bitrate);
            }
            this.hls.nextLoadLevel = selectedIndex;
          }
          break;
        }
      }
    };
    _proto.getPathwayForGroupId = function getPathwayForGroupId(groupId, type, defaultPathway) {
      var levels = this.getLevelsForPathway(defaultPathway).concat(this.levels || []);
      for (var i = 0; i < levels.length; i++) {
        if (type === PlaylistContextType.AUDIO_TRACK && levels[i].hasAudioGroup(groupId) || type === PlaylistContextType.SUBTITLE_TRACK && levels[i].hasSubtitleGroup(groupId)) {
          return levels[i].pathwayId;
        }
      }
      return defaultPathway;
    };
    _proto.clonePathways = function clonePathways(pathwayClones) {
      var _this = this;
      var levels = this.levels;
      if (!levels) {
        return;
      }
      var audioGroupCloneMap = {};
      var subtitleGroupCloneMap = {};
      pathwayClones.forEach(function (pathwayClone) {
        var cloneId = pathwayClone.ID,
          baseId = pathwayClone['BASE-ID'],
          uriReplacement = pathwayClone['URI-REPLACEMENT'];
        if (levels.some(function (level) {
          return level.pathwayId === cloneId;
        })) {
          return;
        }
        var clonedVariants = _this.getLevelsForPathway(baseId).map(function (baseLevel) {
          var attributes = new AttrList(baseLevel.attrs);
          attributes['PATHWAY-ID'] = cloneId;
          var clonedAudioGroupId = attributes.AUDIO && attributes.AUDIO + "_clone_" + cloneId;
          var clonedSubtitleGroupId = attributes.SUBTITLES && attributes.SUBTITLES + "_clone_" + cloneId;
          if (clonedAudioGroupId) {
            audioGroupCloneMap[attributes.AUDIO] = clonedAudioGroupId;
            attributes.AUDIO = clonedAudioGroupId;
          }
          if (clonedSubtitleGroupId) {
            subtitleGroupCloneMap[attributes.SUBTITLES] = clonedSubtitleGroupId;
            attributes.SUBTITLES = clonedSubtitleGroupId;
          }
          var url = performUriReplacement(baseLevel.uri, attributes['STABLE-VARIANT-ID'], 'PER-VARIANT-URIS', uriReplacement);
          var clonedLevel = new Level({
            attrs: attributes,
            audioCodec: baseLevel.audioCodec,
            bitrate: baseLevel.bitrate,
            height: baseLevel.height,
            name: baseLevel.name,
            url: url,
            videoCodec: baseLevel.videoCodec,
            width: baseLevel.width
          });
          if (baseLevel.audioGroups) {
            for (var i = 1; i < baseLevel.audioGroups.length; i++) {
              clonedLevel.addGroupId('audio', baseLevel.audioGroups[i] + "_clone_" + cloneId);
            }
          }
          if (baseLevel.subtitleGroups) {
            for (var _i = 1; _i < baseLevel.subtitleGroups.length; _i++) {
              clonedLevel.addGroupId('text', baseLevel.subtitleGroups[_i] + "_clone_" + cloneId);
            }
          }
          return clonedLevel;
        });
        levels.push.apply(levels, clonedVariants);
        cloneRenditionGroups(_this.audioTracks, audioGroupCloneMap, uriReplacement, cloneId);
        cloneRenditionGroups(_this.subtitleTracks, subtitleGroupCloneMap, uriReplacement, cloneId);
      });
    };
    _proto.loadSteeringManifest = function loadSteeringManifest(uri) {
      var _this2 = this;
      var config = this.hls.config;
      var Loader = config.loader;
      if (this.loader) {
        this.loader.destroy();
      }
      this.loader = new Loader(config);
      var url;
      try {
        url = new self.URL(uri);
      } catch (error) {
        this.enabled = false;
        this.log("Failed to parse Steering Manifest URI: " + uri);
        return;
      }
      if (url.protocol !== 'data:') {
        var throughput = (this.hls.bandwidthEstimate || config.abrEwmaDefaultEstimate) | 0;
        url.searchParams.set('_HLS_pathway', this.pathwayId);
        url.searchParams.set('_HLS_throughput', '' + throughput);
      }
      var context = {
        responseType: 'json',
        url: url.href
      };
      var loadPolicy = config.steeringManifestLoadPolicy.default;
      var legacyRetryCompatibility = loadPolicy.errorRetry || loadPolicy.timeoutRetry || {};
      var loaderConfig = {
        loadPolicy: loadPolicy,
        timeout: loadPolicy.maxLoadTimeMs,
        maxRetry: legacyRetryCompatibility.maxNumRetry || 0,
        retryDelay: legacyRetryCompatibility.retryDelayMs || 0,
        maxRetryDelay: legacyRetryCompatibility.maxRetryDelayMs || 0
      };
      var callbacks = {
        onSuccess: function onSuccess(response, stats, context, networkDetails) {
          _this2.log("Loaded steering manifest: \"" + url + "\"");
          var steeringData = response.data;
          if (steeringData.VERSION !== 1) {
            _this2.log("Steering VERSION " + steeringData.VERSION + " not supported!");
            return;
          }
          _this2.updated = performance.now();
          _this2.timeToLoad = steeringData.TTL;
          var reloadUri = steeringData['RELOAD-URI'],
            pathwayClones = steeringData['PATHWAY-CLONES'],
            pathwayPriority = steeringData['PATHWAY-PRIORITY'];
          if (reloadUri) {
            try {
              _this2.uri = new self.URL(reloadUri, url).href;
            } catch (error) {
              _this2.enabled = false;
              _this2.log("Failed to parse Steering Manifest RELOAD-URI: " + reloadUri);
              return;
            }
          }
          _this2.scheduleRefresh(_this2.uri || context.url);
          if (pathwayClones) {
            _this2.clonePathways(pathwayClones);
          }
          var loadedSteeringData = {
            steeringManifest: steeringData,
            url: url.toString()
          };
          _this2.hls.trigger(Events.STEERING_MANIFEST_LOADED, loadedSteeringData);
          if (pathwayPriority) {
            _this2.updatePathwayPriority(pathwayPriority);
          }
        },
        onError: function onError(error, context, networkDetails, stats) {
          _this2.log("Error loading steering manifest: " + error.code + " " + error.text + " (" + context.url + ")");
          _this2.stopLoad();
          if (error.code === 410) {
            _this2.enabled = false;
            _this2.log("Steering manifest " + context.url + " no longer available");
            return;
          }
          var ttl = _this2.timeToLoad * 1000;
          if (error.code === 429) {
            var loader = _this2.loader;
            if (typeof (loader == null ? void 0 : loader.getResponseHeader) === 'function') {
              var retryAfter = loader.getResponseHeader('Retry-After');
              if (retryAfter) {
                ttl = parseFloat(retryAfter) * 1000;
              }
            }
            _this2.log("Steering manifest " + context.url + " rate limited");
            return;
          }
          _this2.scheduleRefresh(_this2.uri || context.url, ttl);
        },
        onTimeout: function onTimeout(stats, context, networkDetails) {
          _this2.log("Timeout loading steering manifest (" + context.url + ")");
          _this2.scheduleRefresh(_this2.uri || context.url);
        }
      };
      this.log("Requesting steering manifest: " + url);
      this.loader.load(context, loaderConfig, callbacks);
    };
    _proto.scheduleRefresh = function scheduleRefresh(uri, ttlMs) {
      var _this3 = this;
      if (ttlMs === void 0) {
        ttlMs = this.timeToLoad * 1000;
      }
      this.clearTimeout();
      this.reloadTimer = self.setTimeout(function () {
        var _this3$hls;
        var media = (_this3$hls = _this3.hls) == null ? void 0 : _this3$hls.media;
        if (media && !media.ended) {
          _this3.loadSteeringManifest(uri);
          return;
        }
        _this3.scheduleRefresh(uri, _this3.timeToLoad * 1000);
      }, ttlMs);
    };
    return ContentSteeringController;
  }();
  function cloneRenditionGroups(tracks, groupCloneMap, uriReplacement, cloneId) {
    if (!tracks) {
      return;
    }
    Object.keys(groupCloneMap).forEach(function (audioGroupId) {
      var clonedTracks = tracks.filter(function (track) {
        return track.groupId === audioGroupId;
      }).map(function (track) {
        var clonedTrack = _extends({}, track);
        clonedTrack.details = undefined;
        clonedTrack.attrs = new AttrList(clonedTrack.attrs);
        clonedTrack.url = clonedTrack.attrs.URI = performUriReplacement(track.url, track.attrs['STABLE-RENDITION-ID'], 'PER-RENDITION-URIS', uriReplacement);
        clonedTrack.groupId = clonedTrack.attrs['GROUP-ID'] = groupCloneMap[audioGroupId];
        clonedTrack.attrs['PATHWAY-ID'] = cloneId;
        return clonedTrack;
      });
      tracks.push.apply(tracks, clonedTracks);
    });
  }
  function performUriReplacement(uri, stableId, perOptionKey, uriReplacement) {
    var host = uriReplacement.HOST,
      params = uriReplacement.PARAMS,
      perOptionUris = uriReplacement[perOptionKey];
    var perVariantUri;
    if (stableId) {
      perVariantUri = perOptionUris == null ? void 0 : perOptionUris[stableId];
      if (perVariantUri) {
        uri = perVariantUri;
      }
    }
    var url = new self.URL(uri);
    if (host && !perVariantUri) {
      url.host = host;
    }
    if (params) {
      Object.keys(params).sort().forEach(function (key) {
        if (key) {
          url.searchParams.set(key, params[key]);
        }
      });
    }
    return url.href;
  }

  var AGE_HEADER_LINE_REGEX = /^age:\s*[\d.]+\s*$/im;
  var XhrLoader = /*#__PURE__*/function () {
    function XhrLoader(config) {
      this.xhrSetup = void 0;
      this.requestTimeout = void 0;
      this.retryTimeout = void 0;
      this.retryDelay = void 0;
      this.config = null;
      this.callbacks = null;
      this.context = null;
      this.loader = null;
      this.stats = void 0;
      this.xhrSetup = config ? config.xhrSetup || null : null;
      this.stats = new LoadStats();
      this.retryDelay = 0;
    }
    var _proto = XhrLoader.prototype;
    _proto.destroy = function destroy() {
      this.callbacks = null;
      this.abortInternal();
      this.loader = null;
      this.config = null;
      this.context = null;
      this.xhrSetup = null;
      // @ts-ignore
      this.stats = null;
    };
    _proto.abortInternal = function abortInternal() {
      var loader = this.loader;
      self.clearTimeout(this.requestTimeout);
      self.clearTimeout(this.retryTimeout);
      if (loader) {
        loader.onreadystatechange = null;
        loader.onprogress = null;
        if (loader.readyState !== 4) {
          this.stats.aborted = true;
          loader.abort();
        }
      }
    };
    _proto.abort = function abort() {
      var _this$callbacks;
      this.abortInternal();
      if ((_this$callbacks = this.callbacks) != null && _this$callbacks.onAbort) {
        this.callbacks.onAbort(this.stats, this.context, this.loader);
      }
    };
    _proto.load = function load(context, config, callbacks) {
      if (this.stats.loading.start) {
        throw new Error('Loader can only be used once.');
      }
      this.stats.loading.start = self.performance.now();
      this.context = context;
      this.config = config;
      this.callbacks = callbacks;
      this.loadInternal();
    };
    _proto.loadInternal = function loadInternal() {
      var _this = this;
      var config = this.config,
        context = this.context;
      if (!config || !context) {
        return;
      }
      var xhr = this.loader = new self.XMLHttpRequest();
      var stats = this.stats;
      stats.loading.first = 0;
      stats.loaded = 0;
      stats.aborted = false;
      var xhrSetup = this.xhrSetup;
      if (xhrSetup) {
        Promise.resolve().then(function () {
          if (_this.stats.aborted) return;
          return xhrSetup(xhr, context.url);
        }).catch(function (error) {
          xhr.open('GET', context.url, true);
          return xhrSetup(xhr, context.url);
        }).then(function () {
          if (_this.stats.aborted) return;
          _this.openAndSendXhr(xhr, context, config);
        }).catch(function (error) {
          // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
          _this.callbacks.onError({
            code: xhr.status,
            text: error.message
          }, context, xhr, stats);
          return;
        });
      } else {
        this.openAndSendXhr(xhr, context, config);
      }
    };
    _proto.openAndSendXhr = function openAndSendXhr(xhr, context, config) {
      if (!xhr.readyState) {
        xhr.open('GET', context.url, true);
      }
      var headers = context.headers;
      var _config$loadPolicy = config.loadPolicy,
        maxTimeToFirstByteMs = _config$loadPolicy.maxTimeToFirstByteMs,
        maxLoadTimeMs = _config$loadPolicy.maxLoadTimeMs;
      if (headers) {
        for (var header in headers) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }
      if (context.rangeEnd) {
        xhr.setRequestHeader('Range', 'bytes=' + context.rangeStart + '-' + (context.rangeEnd - 1));
      }
      xhr.onreadystatechange = this.readystatechange.bind(this);
      xhr.onprogress = this.loadprogress.bind(this);
      xhr.responseType = context.responseType;
      // setup timeout before we perform request
      self.clearTimeout(this.requestTimeout);
      config.timeout = maxTimeToFirstByteMs && isFiniteNumber(maxTimeToFirstByteMs) ? maxTimeToFirstByteMs : maxLoadTimeMs;
      this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), config.timeout);
      xhr.send();
    };
    _proto.readystatechange = function readystatechange() {
      var context = this.context,
        xhr = this.loader,
        stats = this.stats;
      if (!context || !xhr) {
        return;
      }
      var readyState = xhr.readyState;
      var config = this.config;

      // don't proceed if xhr has been aborted
      if (stats.aborted) {
        return;
      }

      // >= HEADERS_RECEIVED
      if (readyState >= 2) {
        if (stats.loading.first === 0) {
          stats.loading.first = Math.max(self.performance.now(), stats.loading.start);
          // readyState >= 2 AND readyState !==4 (readyState = HEADERS_RECEIVED || LOADING) rearm timeout as xhr not finished yet
          if (config.timeout !== config.loadPolicy.maxLoadTimeMs) {
            self.clearTimeout(this.requestTimeout);
            config.timeout = config.loadPolicy.maxLoadTimeMs;
            this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), config.loadPolicy.maxLoadTimeMs - (stats.loading.first - stats.loading.start));
          }
        }
        if (readyState === 4) {
          self.clearTimeout(this.requestTimeout);
          xhr.onreadystatechange = null;
          xhr.onprogress = null;
          var _status = xhr.status;
          // http status between 200 to 299 are all successful
          var useResponse = xhr.responseType !== 'text';
          if (_status >= 200 && _status < 300 && (useResponse && xhr.response || xhr.responseText !== null)) {
            stats.loading.end = Math.max(self.performance.now(), stats.loading.first);
            var data = useResponse ? xhr.response : xhr.responseText;
            var len = xhr.responseType === 'arraybuffer' ? data.byteLength : data.length;
            stats.loaded = stats.total = len;
            stats.bwEstimate = stats.total * 8000 / (stats.loading.end - stats.loading.first);
            if (!this.callbacks) {
              return;
            }
            var onProgress = this.callbacks.onProgress;
            if (onProgress) {
              onProgress(stats, context, data, xhr);
            }
            if (!this.callbacks) {
              return;
            }
            var response = {
              url: xhr.responseURL,
              data: data,
              code: _status
            };
            this.callbacks.onSuccess(response, stats, context, xhr);
          } else {
            var retryConfig = config.loadPolicy.errorRetry;
            var retryCount = stats.retry;
            // if max nb of retries reached or if http status between 400 and 499 (such error cannot be recovered, retrying is useless), return error
            var _response = {
              url: context.url,
              data: undefined,
              code: _status
            };
            if (shouldRetry(retryConfig, retryCount, false, _response)) {
              this.retry(retryConfig);
            } else {
              logger.error(_status + " while loading " + context.url);
              this.callbacks.onError({
                code: _status,
                text: xhr.statusText
              }, context, xhr, stats);
            }
          }
        }
      }
    };
    _proto.loadtimeout = function loadtimeout() {
      var _this$config;
      var retryConfig = (_this$config = this.config) == null ? void 0 : _this$config.loadPolicy.timeoutRetry;
      var retryCount = this.stats.retry;
      if (shouldRetry(retryConfig, retryCount, true)) {
        this.retry(retryConfig);
      } else {
        var _this$context;
        logger.warn("timeout while loading " + ((_this$context = this.context) == null ? void 0 : _this$context.url));
        var callbacks = this.callbacks;
        if (callbacks) {
          this.abortInternal();
          callbacks.onTimeout(this.stats, this.context, this.loader);
        }
      }
    };
    _proto.retry = function retry(retryConfig) {
      var context = this.context,
        stats = this.stats;
      this.retryDelay = getRetryDelay(retryConfig, stats.retry);
      stats.retry++;
      logger.warn((status ? 'HTTP Status ' + status : 'Timeout') + " while loading " + (context == null ? void 0 : context.url) + ", retrying " + stats.retry + "/" + retryConfig.maxNumRetry + " in " + this.retryDelay + "ms");
      // abort and reset internal state
      this.abortInternal();
      this.loader = null;
      // schedule retry
      self.clearTimeout(this.retryTimeout);
      this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay);
    };
    _proto.loadprogress = function loadprogress(event) {
      var stats = this.stats;
      stats.loaded = event.loaded;
      if (event.lengthComputable) {
        stats.total = event.total;
      }
    };
    _proto.getCacheAge = function getCacheAge() {
      var result = null;
      if (this.loader && AGE_HEADER_LINE_REGEX.test(this.loader.getAllResponseHeaders())) {
        var ageHeader = this.loader.getResponseHeader('age');
        result = ageHeader ? parseFloat(ageHeader) : null;
      }
      return result;
    };
    _proto.getResponseHeader = function getResponseHeader(name) {
      if (this.loader && new RegExp("^" + name + ":\\s*[\\d.]+\\s*$", 'im').test(this.loader.getAllResponseHeaders())) {
        return this.loader.getResponseHeader(name);
      }
      return null;
    };
    return XhrLoader;
  }();

  var ChunkCache = /*#__PURE__*/function () {
    function ChunkCache() {
      this.chunks = [];
      this.dataLength = 0;
    }
    var _proto = ChunkCache.prototype;
    _proto.push = function push(chunk) {
      this.chunks.push(chunk);
      this.dataLength += chunk.length;
    };
    _proto.flush = function flush() {
      var chunks = this.chunks,
        dataLength = this.dataLength;
      var result;
      if (!chunks.length) {
        return new Uint8Array(0);
      } else if (chunks.length === 1) {
        result = chunks[0];
      } else {
        result = concatUint8Arrays(chunks, dataLength);
      }
      this.reset();
      return result;
    };
    _proto.reset = function reset() {
      this.chunks.length = 0;
      this.dataLength = 0;
    };
    return ChunkCache;
  }();
  function concatUint8Arrays(chunks, dataLength) {
    var result = new Uint8Array(dataLength);
    var offset = 0;
    for (var i = 0; i < chunks.length; i++) {
      var chunk = chunks[i];
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result;
  }

  function fetchSupported() {
    if (
    // @ts-ignore
    self.fetch && self.AbortController && self.ReadableStream && self.Request) {
      try {
        new self.ReadableStream({}); // eslint-disable-line no-new
        return true;
      } catch (e) {
        /* noop */
      }
    }
    return false;
  }
  var BYTERANGE = /(\d+)-(\d+)\/(\d+)/;
  var FetchLoader = /*#__PURE__*/function () {
    function FetchLoader(config /* HlsConfig */) {
      this.fetchSetup = void 0;
      this.requestTimeout = void 0;
      this.request = null;
      this.response = null;
      this.controller = void 0;
      this.context = null;
      this.config = null;
      this.callbacks = null;
      this.stats = void 0;
      this.loader = null;
      this.fetchSetup = config.fetchSetup || getRequest;
      this.controller = new self.AbortController();
      this.stats = new LoadStats();
    }
    var _proto = FetchLoader.prototype;
    _proto.destroy = function destroy() {
      this.loader = this.callbacks = this.context = this.config = this.request = null;
      this.abortInternal();
      this.response = null;
      // @ts-ignore
      this.fetchSetup = this.controller = this.stats = null;
    };
    _proto.abortInternal = function abortInternal() {
      if (this.controller && !this.stats.loading.end) {
        this.stats.aborted = true;
        this.controller.abort();
      }
    };
    _proto.abort = function abort() {
      var _this$callbacks;
      this.abortInternal();
      if ((_this$callbacks = this.callbacks) != null && _this$callbacks.onAbort) {
        this.callbacks.onAbort(this.stats, this.context, this.response);
      }
    };
    _proto.load = function load(context, config, callbacks) {
      var _this = this;
      var stats = this.stats;
      if (stats.loading.start) {
        throw new Error('Loader can only be used once.');
      }
      stats.loading.start = self.performance.now();
      var initParams = getRequestParameters(context, this.controller.signal);
      var onProgress = callbacks.onProgress;
      var isArrayBuffer = context.responseType === 'arraybuffer';
      var LENGTH = isArrayBuffer ? 'byteLength' : 'length';
      var _config$loadPolicy = config.loadPolicy,
        maxTimeToFirstByteMs = _config$loadPolicy.maxTimeToFirstByteMs,
        maxLoadTimeMs = _config$loadPolicy.maxLoadTimeMs;
      this.context = context;
      this.config = config;
      this.callbacks = callbacks;
      this.request = this.fetchSetup(context, initParams);
      self.clearTimeout(this.requestTimeout);
      config.timeout = maxTimeToFirstByteMs && isFiniteNumber(maxTimeToFirstByteMs) ? maxTimeToFirstByteMs : maxLoadTimeMs;
      this.requestTimeout = self.setTimeout(function () {
        _this.abortInternal();
        callbacks.onTimeout(stats, context, _this.response);
      }, config.timeout);
      self.fetch(this.request).then(function (response) {
        _this.response = _this.loader = response;
        var first = Math.max(self.performance.now(), stats.loading.start);
        self.clearTimeout(_this.requestTimeout);
        config.timeout = maxLoadTimeMs;
        _this.requestTimeout = self.setTimeout(function () {
          _this.abortInternal();
          callbacks.onTimeout(stats, context, _this.response);
        }, maxLoadTimeMs - (first - stats.loading.start));
        if (!response.ok) {
          var status = response.status,
            statusText = response.statusText;
          throw new FetchError(statusText || 'fetch, bad network response', status, response);
        }
        stats.loading.first = first;
        stats.total = getContentLength(response.headers) || stats.total;
        if (onProgress && isFiniteNumber(config.highWaterMark)) {
          return _this.loadProgressively(response, stats, context, config.highWaterMark, onProgress);
        }
        if (isArrayBuffer) {
          return response.arrayBuffer();
        }
        if (context.responseType === 'json') {
          return response.json();
        }
        return response.text();
      }).then(function (responseData) {
        var response = _this.response;
        if (!response) {
          throw new Error('loader destroyed');
        }
        self.clearTimeout(_this.requestTimeout);
        stats.loading.end = Math.max(self.performance.now(), stats.loading.first);
        var total = responseData[LENGTH];
        if (total) {
          stats.loaded = stats.total = total;
        }
        var loaderResponse = {
          url: response.url,
          data: responseData,
          code: response.status
        };
        if (onProgress && !isFiniteNumber(config.highWaterMark)) {
          onProgress(stats, context, responseData, response);
        }
        callbacks.onSuccess(loaderResponse, stats, context, response);
      }).catch(function (error) {
        self.clearTimeout(_this.requestTimeout);
        if (stats.aborted) {
          return;
        }
        // CORS errors result in an undefined code. Set it to 0 here to align with XHR's behavior
        // when destroying, 'error' itself can be undefined
        var code = !error ? 0 : error.code || 0;
        var text = !error ? null : error.message;
        callbacks.onError({
          code: code,
          text: text
        }, context, error ? error.details : null, stats);
      });
    };
    _proto.getCacheAge = function getCacheAge() {
      var result = null;
      if (this.response) {
        var ageHeader = this.response.headers.get('age');
        result = ageHeader ? parseFloat(ageHeader) : null;
      }
      return result;
    };
    _proto.getResponseHeader = function getResponseHeader(name) {
      return this.response ? this.response.headers.get(name) : null;
    };
    _proto.loadProgressively = function loadProgressively(response, stats, context, highWaterMark, onProgress) {
      if (highWaterMark === void 0) {
        highWaterMark = 0;
      }
      var chunkCache = new ChunkCache();
      var reader = response.body.getReader();
      var pump = function pump() {
        return reader.read().then(function (data) {
          if (data.done) {
            if (chunkCache.dataLength) {
              onProgress(stats, context, chunkCache.flush(), response);
            }
            return Promise.resolve(new ArrayBuffer(0));
          }
          var chunk = data.value;
          var len = chunk.length;
          stats.loaded += len;
          if (len < highWaterMark || chunkCache.dataLength) {
            // The current chunk is too small to to be emitted or the cache already has data
            // Push it to the cache
            chunkCache.push(chunk);
            if (chunkCache.dataLength >= highWaterMark) {
              // flush in order to join the typed arrays
              onProgress(stats, context, chunkCache.flush(), response);
            }
          } else {
            // If there's nothing cached already, and the chache is large enough
            // just emit the progress event
            onProgress(stats, context, chunk, response);
          }
          return pump();
        }).catch(function () {
          /* aborted */
          return Promise.reject();
        });
      };
      return pump();
    };
    return FetchLoader;
  }();
  function getRequestParameters(context, signal) {
    var initParams = {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      signal: signal,
      headers: new self.Headers(_extends({}, context.headers))
    };
    if (context.rangeEnd) {
      initParams.headers.set('Range', 'bytes=' + context.rangeStart + '-' + String(context.rangeEnd - 1));
    }
    return initParams;
  }
  function getByteRangeLength(byteRangeHeader) {
    var result = BYTERANGE.exec(byteRangeHeader);
    if (result) {
      return parseInt(result[2]) - parseInt(result[1]) + 1;
    }
  }
  function getContentLength(headers) {
    var contentRange = headers.get('Content-Range');
    if (contentRange) {
      var byteRangeLength = getByteRangeLength(contentRange);
      if (isFiniteNumber(byteRangeLength)) {
        return byteRangeLength;
      }
    }
    var contentLength = headers.get('Content-Length');
    if (contentLength) {
      return parseInt(contentLength);
    }
  }
  function getRequest(context, initParams) {
    return new self.Request(context.url, initParams);
  }
  var FetchError = /*#__PURE__*/function (_Error) {
    _inheritsLoose(FetchError, _Error);
    function FetchError(message, code, details) {
      var _this2;
      _this2 = _Error.call(this, message) || this;
      _this2.code = void 0;
      _this2.details = void 0;
      _this2.code = code;
      _this2.details = details;
      return _this2;
    }
    return FetchError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  /**
   * @deprecated use fragLoadPolicy.default
   */

  /**
   * @deprecated use manifestLoadPolicy.default and playlistLoadPolicy.default
   */

  var defaultLoadPolicy = {
    maxTimeToFirstByteMs: 8000,
    maxLoadTimeMs: 20000,
    timeoutRetry: null,
    errorRetry: null
  };

  /**
   * @ignore
   * If possible, keep hlsDefaultConfig shallow
   * It is cloned whenever a new Hls instance is created, by keeping the config
   * shallow the properties are cloned, and we don't end up manipulating the default
   */
  var hlsDefaultConfig = _objectSpread2(_objectSpread2({
    autoStartLoad: true,
    // used by stream-controller
    startPosition: -1,
    // used by stream-controller
    defaultAudioCodec: undefined,
    // used by stream-controller
    debug: false,
    // used by logger
    capLevelOnFPSDrop: false,
    // used by fps-controller
    capLevelToPlayerSize: false,
    // used by cap-level-controller
    ignoreDevicePixelRatio: false,
    // used by cap-level-controller
    preferManagedMediaSource: true,
    initialLiveManifestSize: 1,
    // used by stream-controller
    maxBufferLength: 30,
    // used by stream-controller
    backBufferLength: Infinity,
    // used by buffer-controller
    frontBufferFlushThreshold: Infinity,
    maxBufferSize: 60 * 1000 * 1000,
    // used by stream-controller
    maxBufferHole: 0.1,
    // used by stream-controller
    highBufferWatchdogPeriod: 2,
    // used by stream-controller
    nudgeOffset: 0.1,
    // used by stream-controller
    nudgeMaxRetry: 3,
    // used by stream-controller
    maxFragLookUpTolerance: 0.25,
    // used by stream-controller
    liveSyncDurationCount: 3,
    // used by latency-controller
    liveMaxLatencyDurationCount: Infinity,
    // used by latency-controller
    liveSyncDuration: undefined,
    // used by latency-controller
    liveMaxLatencyDuration: undefined,
    // used by latency-controller
    maxLiveSyncPlaybackRate: 1,
    // used by latency-controller
    liveDurationInfinity: false,
    // used by buffer-controller
    /**
     * @deprecated use backBufferLength
     */
    liveBackBufferLength: null,
    // used by buffer-controller
    maxMaxBufferLength: 600,
    // used by stream-controller
    enableWorker: true,
    // used by transmuxer
    workerPath: null,
    // used by transmuxer
    enableSoftwareAES: true,
    // used by decrypter
    startLevel: undefined,
    // used by level-controller
    startFragPrefetch: false,
    // used by stream-controller
    fpsDroppedMonitoringPeriod: 5000,
    // used by fps-controller
    fpsDroppedMonitoringThreshold: 0.2,
    // used by fps-controller
    appendErrorMaxRetry: 3,
    // used by buffer-controller
    loader: XhrLoader,
    // loader: FetchLoader,
    fLoader: undefined,
    // used by fragment-loader
    pLoader: undefined,
    // used by playlist-loader
    xhrSetup: undefined,
    // used by xhr-loader
    licenseXhrSetup: undefined,
    // used by eme-controller
    licenseResponseCallback: undefined,
    // used by eme-controller
    abrController: AbrController,
    bufferController: BufferController,
    capLevelController: CapLevelController,
    errorController: ErrorController,
    fpsController: FPSController,
    stretchShortVideoTrack: false,
    // used by mp4-remuxer
    maxAudioFramesDrift: 1,
    // used by mp4-remuxer
    forceKeyFrameOnDiscontinuity: true,
    // used by ts-demuxer
    abrEwmaFastLive: 3,
    // used by abr-controller
    abrEwmaSlowLive: 9,
    // used by abr-controller
    abrEwmaFastVoD: 3,
    // used by abr-controller
    abrEwmaSlowVoD: 9,
    // used by abr-controller
    abrEwmaDefaultEstimate: 5e5,
    // 500 kbps  // used by abr-controller
    abrEwmaDefaultEstimateMax: 5e6,
    // 5 mbps
    abrBandWidthFactor: 0.95,
    // used by abr-controller
    abrBandWidthUpFactor: 0.7,
    // used by abr-controller
    abrMaxWithRealBitrate: false,
    // used by abr-controller
    maxStarvationDelay: 4,
    // used by abr-controller
    maxLoadingDelay: 4,
    // used by abr-controller
    minAutoBitrate: 0,
    // used by hls
    emeEnabled: false,
    // used by eme-controller
    widevineLicenseUrl: undefined,
    // used by eme-controller
    drmSystems: {},
    // used by eme-controller
    drmSystemOptions: {},
    // used by eme-controller
    requestMediaKeySystemAccessFunc: null,
    // used by eme-controller
    testBandwidth: true,
    progressive: false,
    lowLatencyMode: true,
    cmcd: undefined,
    enableDateRangeMetadataCues: true,
    enableEmsgMetadataCues: true,
    enableID3MetadataCues: true,
    useMediaCapabilities: false,
    certLoadPolicy: {
      default: defaultLoadPolicy
    },
    keyLoadPolicy: {
      default: {
        maxTimeToFirstByteMs: 8000,
        maxLoadTimeMs: 20000,
        timeoutRetry: {
          maxNumRetry: 1,
          retryDelayMs: 1000,
          maxRetryDelayMs: 20000,
          backoff: 'linear'
        },
        errorRetry: {
          maxNumRetry: 8,
          retryDelayMs: 1000,
          maxRetryDelayMs: 20000,
          backoff: 'linear'
        }
      }
    },
    manifestLoadPolicy: {
      default: {
        maxTimeToFirstByteMs: Infinity,
        maxLoadTimeMs: 20000,
        timeoutRetry: {
          maxNumRetry: 2,
          retryDelayMs: 0,
          maxRetryDelayMs: 0
        },
        errorRetry: {
          maxNumRetry: 1,
          retryDelayMs: 1000,
          maxRetryDelayMs: 8000
        }
      }
    },
    playlistLoadPolicy: {
      default: {
        maxTimeToFirstByteMs: 10000,
        maxLoadTimeMs: 20000,
        timeoutRetry: {
          maxNumRetry: 2,
          retryDelayMs: 0,
          maxRetryDelayMs: 0
        },
        errorRetry: {
          maxNumRetry: 2,
          retryDelayMs: 1000,
          maxRetryDelayMs: 8000
        }
      }
    },
    fragLoadPolicy: {
      default: {
        maxTimeToFirstByteMs: 10000,
        maxLoadTimeMs: 120000,
        timeoutRetry: {
          maxNumRetry: 4,
          retryDelayMs: 0,
          maxRetryDelayMs: 0
        },
        errorRetry: {
          maxNumRetry: 6,
          retryDelayMs: 1000,
          maxRetryDelayMs: 8000
        }
      }
    },
    steeringManifestLoadPolicy: {
      default: {
        maxTimeToFirstByteMs: 10000,
        maxLoadTimeMs: 20000,
        timeoutRetry: {
          maxNumRetry: 2,
          retryDelayMs: 0,
          maxRetryDelayMs: 0
        },
        errorRetry: {
          maxNumRetry: 1,
          retryDelayMs: 1000,
          maxRetryDelayMs: 8000
        }
      } 
    },
    // These default settings are deprecated in favor of the above policies
    // and are maintained for backwards compatibility
    manifestLoadingTimeOut: 10000,
    manifestLoadingMaxRetry: 1,
    manifestLoadingRetryDelay: 1000,
    manifestLoadingMaxRetryTimeout: 64000,
    levelLoadingTimeOut: 10000,
    levelLoadingMaxRetry: 4,
    levelLoadingRetryDelay: 1000,
    levelLoadingMaxRetryTimeout: 64000,
    fragLoadingTimeOut: 20000,
    fragLoadingMaxRetry: 6,
    fragLoadingRetryDelay: 1000,
    fragLoadingMaxRetryTimeout: 64000
  }, timelineConfig()), {}, {
    subtitleStreamController: undefined,
    subtitleTrackController: undefined,
    timelineController: undefined,
    audioStreamController: undefined,
    audioTrackController: undefined,
    emeController: undefined,
    cmcdController: undefined,
    contentSteeringController: ContentSteeringController 
  });
  function timelineConfig() {
    return {
      cueHandler: Cues,
      // used by timeline-controller
      enableWebVTT: false,
      // used by timeline-controller
      enableIMSC1: false,
      // used by timeline-controller
      enableCEA708Captions: false,
      // used by timeline-controller
      captionsTextTrack1Label: 'English',
      // used by timeline-controller
      captionsTextTrack1LanguageCode: 'en',
      // used by timeline-controller
      captionsTextTrack2Label: 'Spanish',
      // used by timeline-controller
      captionsTextTrack2LanguageCode: 'es',
      // used by timeline-controller
      captionsTextTrack3Label: 'Unknown CC',
      // used by timeline-controller
      captionsTextTrack3LanguageCode: '',
      // used by timeline-controller
      captionsTextTrack4Label: 'Unknown CC',
      // used by timeline-controller
      captionsTextTrack4LanguageCode: '',
      // used by timeline-controller
      renderTextTracksNatively: true
    };
  }

  /**
   * @ignore
   */
  function mergeConfig(defaultConfig, userConfig) {
    if ((userConfig.liveSyncDurationCount || userConfig.liveMaxLatencyDurationCount) && (userConfig.liveSyncDuration || userConfig.liveMaxLatencyDuration)) {
      throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
    }
    if (userConfig.liveMaxLatencyDurationCount !== undefined && (userConfig.liveSyncDurationCount === undefined || userConfig.liveMaxLatencyDurationCount <= userConfig.liveSyncDurationCount)) {
      throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
    }
    if (userConfig.liveMaxLatencyDuration !== undefined && (userConfig.liveSyncDuration === undefined || userConfig.liveMaxLatencyDuration <= userConfig.liveSyncDuration)) {
      throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
    }
    var defaultsCopy = deepCpy(defaultConfig);

    // Backwards compatibility with deprecated config values
    var deprecatedSettingTypes = ['manifest', 'level', 'frag'];
    var deprecatedSettings = ['TimeOut', 'MaxRetry', 'RetryDelay', 'MaxRetryTimeout'];
    deprecatedSettingTypes.forEach(function (type) {
      var policyName = (type === 'level' ? 'playlist' : type) + "LoadPolicy";
      var policyNotSet = userConfig[policyName] === undefined;
      var report = [];
      deprecatedSettings.forEach(function (setting) {
        var deprecatedSetting = type + "Loading" + setting;
        var value = userConfig[deprecatedSetting];
        if (value !== undefined && policyNotSet) {
          report.push(deprecatedSetting);
          var settings = defaultsCopy[policyName].default;
          userConfig[policyName] = {
            default: settings
          };
          switch (setting) {
            case 'TimeOut':
              settings.maxLoadTimeMs = value;
              settings.maxTimeToFirstByteMs = value;
              break;
            case 'MaxRetry':
              settings.errorRetry.maxNumRetry = value;
              settings.timeoutRetry.maxNumRetry = value;
              break;
            case 'RetryDelay':
              settings.errorRetry.retryDelayMs = value;
              settings.timeoutRetry.retryDelayMs = value;
              break;
            case 'MaxRetryTimeout':
              settings.errorRetry.maxRetryDelayMs = value;
              settings.timeoutRetry.maxRetryDelayMs = value;
              break;
          }
        }
      });
      if (report.length) {
        logger.warn("hls.js config: \"" + report.join('", "') + "\" setting(s) are deprecated, use \"" + policyName + "\": " + JSON.stringify(userConfig[policyName]));
      }
    });
    return _objectSpread2(_objectSpread2({}, defaultsCopy), userConfig);
  }
  function deepCpy(obj) {
    if (obj && typeof obj === 'object') {
      if (Array.isArray(obj)) {
        return obj.map(deepCpy);
      }
      return Object.keys(obj).reduce(function (result, key) {
        result[key] = deepCpy(obj[key]);
        return result;
      }, {});
    }
    return obj;
  }

  /**
   * @ignore
   */
  function enableStreamingMode(config) {
    var currentLoader = config.loader;
    if (currentLoader !== FetchLoader && currentLoader !== XhrLoader) {
      // If a developer has configured their own loader, respect that choice
      logger.log('[config]: Custom loader detected, cannot enable progressive streaming');
      config.progressive = false;
    } else {
      var canStreamProgressively = fetchSupported();
      if (canStreamProgressively) {
        config.loader = FetchLoader;
        config.progressive = true;
        config.enableSoftwareAES = true;
        logger.log('[config]: Progressive streaming enabled, using FetchLoader');
      }
    }
  }

  var chromeOrFirefox;
  var LevelController = /*#__PURE__*/function (_BasePlaylistControll) {
    _inheritsLoose(LevelController, _BasePlaylistControll);
    function LevelController(hls, contentSteeringController) {
      var _this;
      _this = _BasePlaylistControll.call(this, hls, '[level-controller]') || this;
      _this._levels = [];
      _this._firstLevel = -1;
      _this._maxAutoLevel = -1;
      _this._startLevel = void 0;
      _this.currentLevel = null;
      _this.currentLevelIndex = -1;
      _this.manualLevelIndex = -1;
      _this.steering = void 0;
      _this.onParsedComplete = void 0;
      _this.steering = contentSteeringController;
      _this._registerListeners();
      return _this;
    }
    var _proto = LevelController.prototype;
    _proto._registerListeners = function _registerListeners() {
      var hls = this.hls;
      hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.on(Events.MANIFEST_LOADED, this.onManifestLoaded, this);
      hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this);
      hls.on(Events.LEVELS_UPDATED, this.onLevelsUpdated, this);
      hls.on(Events.FRAG_BUFFERED, this.onFragBuffered, this);
      hls.on(Events.ERROR, this.onError, this);
    };
    _proto._unregisterListeners = function _unregisterListeners() {
      var hls = this.hls;
      hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.off(Events.MANIFEST_LOADED, this.onManifestLoaded, this);
      hls.off(Events.LEVEL_LOADED, this.onLevelLoaded, this);
      hls.off(Events.LEVELS_UPDATED, this.onLevelsUpdated, this);
      hls.off(Events.FRAG_BUFFERED, this.onFragBuffered, this);
      hls.off(Events.ERROR, this.onError, this);
    };
    _proto.destroy = function destroy() {
      this._unregisterListeners();
      this.steering = null;
      this.resetLevels();
      _BasePlaylistControll.prototype.destroy.call(this);
    };
    _proto.stopLoad = function stopLoad() {
      var levels = this._levels;

      // clean up live level details to force reload them, and reset load errors
      levels.forEach(function (level) {
        level.loadError = 0;
        level.fragmentError = 0;
      });
      _BasePlaylistControll.prototype.stopLoad.call(this);
    };
    _proto.resetLevels = function resetLevels() {
      this._startLevel = undefined;
      this.manualLevelIndex = -1;
      this.currentLevelIndex = -1;
      this.currentLevel = null;
      this._levels = [];
      this._maxAutoLevel = -1;
    };
    _proto.onManifestLoading = function onManifestLoading(event, data) {
      this.resetLevels();
    };
    _proto.onManifestLoaded = function onManifestLoaded(event, data) {
      var preferManagedMediaSource = this.hls.config.preferManagedMediaSource;
      var levels = [];
      var redundantSet = {};
      var generatePathwaySet = {};
      var resolutionFound = false;
      var videoCodecFound = false;
      var audioCodecFound = false;
      data.levels.forEach(function (levelParsed) {
        var _audioCodec, _videoCodec;
        var attributes = levelParsed.attrs;

        // erase audio codec info if browser does not support mp4a.40.34.
        // demuxer will autodetect codec and fallback to mpeg/audio
        var audioCodec = levelParsed.audioCodec,
          videoCodec = levelParsed.videoCodec;
        if (((_audioCodec = audioCodec) == null ? void 0 : _audioCodec.indexOf('mp4a.40.34')) !== -1) {
          chromeOrFirefox || (chromeOrFirefox = /chrome|firefox/i.test(navigator.userAgent));
          if (chromeOrFirefox) {
            levelParsed.audioCodec = audioCodec = undefined;
          }
        }
        if (audioCodec) {
          levelParsed.audioCodec = audioCodec = getCodecCompatibleName(audioCodec, preferManagedMediaSource);
        }
        if (((_videoCodec = videoCodec) == null ? void 0 : _videoCodec.indexOf('avc1')) === 0) {
          videoCodec = levelParsed.videoCodec = convertAVC1ToAVCOTI(videoCodec);
        }

        // only keep levels with supported audio/video codecs
        var width = levelParsed.width,
          height = levelParsed.height,
          unknownCodecs = levelParsed.unknownCodecs;
        resolutionFound || (resolutionFound = !!(width && height));
        videoCodecFound || (videoCodecFound = !!videoCodec);
        audioCodecFound || (audioCodecFound = !!audioCodec);
        if (unknownCodecs != null && unknownCodecs.length || audioCodec && !areCodecsMediaSourceSupported(audioCodec, 'audio', preferManagedMediaSource) || videoCodec && !areCodecsMediaSourceSupported(videoCodec, 'video', preferManagedMediaSource)) {
          return;
        }
        var CODECS = attributes.CODECS,
          FRAMERATE = attributes['FRAME-RATE'],
          HDCP = attributes['HDCP-LEVEL'],
          PATHWAY = attributes['PATHWAY-ID'],
          RESOLUTION = attributes.RESOLUTION,
          VIDEO_RANGE = attributes['VIDEO-RANGE'];
        var contentSteeringPrefix = (PATHWAY || '.') + "-";
        var levelKey = "" + contentSteeringPrefix + levelParsed.bitrate + "-" + RESOLUTION + "-" + FRAMERATE + "-" + CODECS + "-" + VIDEO_RANGE + "-" + HDCP;
        if (!redundantSet[levelKey]) {
          var level = new Level(levelParsed);
          redundantSet[levelKey] = level;
          generatePathwaySet[levelKey] = 1;
          levels.push(level);
        } else if (redundantSet[levelKey].uri !== levelParsed.url && !levelParsed.attrs['PATHWAY-ID']) {
          // Assign Pathway IDs to Redundant Streams (default Pathways is ".". Redundant Streams "..", "...", and so on.)
          // Content Steering controller to handles Pathway fallback on error
          var pathwayCount = generatePathwaySet[levelKey] += 1;
          levelParsed.attrs['PATHWAY-ID'] = new Array(pathwayCount + 1).join('.');
          var _level = new Level(levelParsed);
          redundantSet[levelKey] = _level;
          levels.push(_level);
        } else {
          redundantSet[levelKey].addGroupId('audio', attributes.AUDIO);
          redundantSet[levelKey].addGroupId('text', attributes.SUBTITLES);
        }
      });
      this.filterAndSortMediaOptions(levels, data, resolutionFound, videoCodecFound, audioCodecFound);
    };
    _proto.filterAndSortMediaOptions = function filterAndSortMediaOptions(filteredLevels, data, resolutionFound, videoCodecFound, audioCodecFound) {
      var _this2 = this;
      var audioTracks = [];
      var subtitleTracks = [];
      var levels = filteredLevels;

      // remove audio-only and invalid video-range levels if we also have levels with video codecs or RESOLUTION signalled
      if ((resolutionFound || videoCodecFound) && audioCodecFound) {
        levels = levels.filter(function (_ref) {
          var videoCodec = _ref.videoCodec,
            videoRange = _ref.videoRange,
            width = _ref.width,
            height = _ref.height;
          return (!!videoCodec || !!(width && height)) && isVideoRange(videoRange);
        });
      }
      if (levels.length === 0) {
        // Dispatch error after MANIFEST_LOADED is done propagating
        Promise.resolve().then(function () {
          if (_this2.hls) {
            if (data.levels.length) {
              _this2.warn("One or more CODECS in variant not supported: " + JSON.stringify(data.levels[0].attrs));
            }
            var error = new Error('no level with compatible codecs found in manifest');
            _this2.hls.trigger(Events.ERROR, {
              type: ErrorTypes.MEDIA_ERROR,
              details: ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
              fatal: true,
              url: data.url,
              error: error,
              reason: error.message
            });
          }
        });
        return;
      }
      if (data.audioTracks) {
        var preferManagedMediaSource = this.hls.config.preferManagedMediaSource;
        audioTracks = data.audioTracks.filter(function (track) {
          return !track.audioCodec || areCodecsMediaSourceSupported(track.audioCodec, 'audio', preferManagedMediaSource);
        });
        // Assign ids after filtering as array indices by group-id
        assignTrackIdsByGroup(audioTracks);
      }
      if (data.subtitles) {
        subtitleTracks = data.subtitles;
        assignTrackIdsByGroup(subtitleTracks);
      }
      // start bitrate is the first bitrate of the manifest
      var unsortedLevels = levels.slice(0);
      // sort levels from lowest to highest
      levels.sort(function (a, b) {
        if (a.attrs['HDCP-LEVEL'] !== b.attrs['HDCP-LEVEL']) {
          return (a.attrs['HDCP-LEVEL'] || '') > (b.attrs['HDCP-LEVEL'] || '') ? 1 : -1;
        }
        // sort on height before bitrate for cap-level-controller
        if (resolutionFound && a.height !== b.height) {
          return a.height - b.height;
        }
        if (a.frameRate !== b.frameRate) {
          return a.frameRate - b.frameRate;
        }
        if (a.videoRange !== b.videoRange) {
          return VideoRangeValues.indexOf(a.videoRange) - VideoRangeValues.indexOf(b.videoRange);
        }
        if (a.videoCodec !== b.videoCodec) {
          var valueA = videoCodecPreferenceValue(a.videoCodec);
          var valueB = videoCodecPreferenceValue(b.videoCodec);
          if (valueA !== valueB) {
            return valueB - valueA;
          }
        }
        if (a.uri === b.uri && a.codecSet !== b.codecSet) {
          var _valueA = codecsSetSelectionPreferenceValue(a.codecSet);
          var _valueB = codecsSetSelectionPreferenceValue(b.codecSet);
          if (_valueA !== _valueB) {
            return _valueB - _valueA;
          }
        }
        if (a.averageBitrate !== b.averageBitrate) {
          return a.averageBitrate - b.averageBitrate;
        }
        return 0;
      });
      var firstLevelInPlaylist = unsortedLevels[0];
      if (this.steering) {
        levels = this.steering.filterParsedLevels(levels);
        if (levels.length !== unsortedLevels.length) {
          for (var i = 0; i < unsortedLevels.length; i++) {
            if (unsortedLevels[i].pathwayId === levels[0].pathwayId) {
              firstLevelInPlaylist = unsortedLevels[i];
              break;
            }
          }
        }
      }
      this._levels = levels;

      // find index of first level in sorted levels
      for (var _i = 0; _i < levels.length; _i++) {
        if (levels[_i] === firstLevelInPlaylist) {
          var _this$hls$userConfig;
          this._firstLevel = _i;
          var firstLevelBitrate = firstLevelInPlaylist.bitrate;
          var bandwidthEstimate = this.hls.bandwidthEstimate;
          this.log("manifest loaded, " + levels.length + " level(s) found, first bitrate: " + firstLevelBitrate);
          // Update default bwe to first variant bitrate as long it has not been configured or set
          if (((_this$hls$userConfig = this.hls.userConfig) == null ? void 0 : _this$hls$userConfig.abrEwmaDefaultEstimate) === undefined) {
            var startingBwEstimate = Math.min(firstLevelBitrate, this.hls.config.abrEwmaDefaultEstimateMax);
            if (startingBwEstimate > bandwidthEstimate && bandwidthEstimate === hlsDefaultConfig.abrEwmaDefaultEstimate) {
              this.hls.bandwidthEstimate = startingBwEstimate;
            }
          }
          break;
        }
      }

      // Audio is only alternate if manifest include a URI along with the audio group tag,
      // and this is not an audio-only stream where levels contain audio-only
      var audioOnly = audioCodecFound && !videoCodecFound;
      var edata = {
        levels: levels,
        audioTracks: audioTracks,
        subtitleTracks: subtitleTracks,
        sessionData: data.sessionData,
        sessionKeys: data.sessionKeys,
        firstLevel: this._firstLevel,
        stats: data.stats,
        audio: audioCodecFound,
        video: videoCodecFound,
        altAudio: !audioOnly && audioTracks.some(function (t) {
          return !!t.url;
        })
      };
      this.hls.trigger(Events.MANIFEST_PARSED, edata);

      // Initiate loading after all controllers have received MANIFEST_PARSED
      if (this.hls.config.autoStartLoad || this.hls.forceStartLoad) {
        this.hls.startLoad(this.hls.config.startPosition);
      }
    };
    _proto.onError = function onError(event, data) {
      if (data.fatal || !data.context) {
        return;
      }
      if (data.context.type === PlaylistContextType.LEVEL && data.context.level === this.level) {
        this.checkRetry(data);
      }
    }

    // reset errors on the successful load of a fragment
    ;
    _proto.onFragBuffered = function onFragBuffered(event, _ref2) {
      var frag = _ref2.frag;
      if (frag !== undefined && frag.type === PlaylistLevelType.MAIN) {
        var el = frag.elementaryStreams;
        if (!Object.keys(el).some(function (type) {
          return !!el[type];
        })) {
          return;
        }
        var level = this._levels[frag.level];
        if (level != null && level.loadError) {
          this.log("Resetting level error count of " + level.loadError + " on frag buffered");
          level.loadError = 0;
        }
      }
    };
    _proto.onLevelLoaded = function onLevelLoaded(event, data) {
      var _data$deliveryDirecti2;
      var level = data.level,
        details = data.details;
      var curLevel = this._levels[level];
      if (!curLevel) {
        var _data$deliveryDirecti;
        this.warn("Invalid level index " + level);
        if ((_data$deliveryDirecti = data.deliveryDirectives) != null && _data$deliveryDirecti.skip) {
          details.deltaUpdateFailed = true;
        }
        return;
      }

      // only process level loaded events matching with expected level
      if (level === this.currentLevelIndex) {
        // reset level load error counter on successful level loaded only if there is no issues with fragments
        if (curLevel.fragmentError === 0) {
          curLevel.loadError = 0;
        }
        this.playlistLoaded(level, data, curLevel.details);
      } else if ((_data$deliveryDirecti2 = data.deliveryDirectives) != null && _data$deliveryDirecti2.skip) {
        // received a delta playlist update that cannot be merged
        details.deltaUpdateFailed = true;
      }
    };
    _proto.loadPlaylist = function loadPlaylist(hlsUrlParameters) {
      _BasePlaylistControll.prototype.loadPlaylist.call(this);
      var currentLevelIndex = this.currentLevelIndex;
      var currentLevel = this.currentLevel;
      if (currentLevel && this.shouldLoadPlaylist(currentLevel)) {
        var url = currentLevel.uri;
        if (hlsUrlParameters) {
          try {
            url = hlsUrlParameters.addDirectives(url);
          } catch (error) {
            this.warn("Could not construct new URL with HLS Delivery Directives: " + error);
          }
        }
        var pathwayId = currentLevel.attrs['PATHWAY-ID'];
        this.log("Loading level index " + currentLevelIndex + ((hlsUrlParameters == null ? void 0 : hlsUrlParameters.msn) !== undefined ? ' at sn ' + hlsUrlParameters.msn + ' part ' + hlsUrlParameters.part : '') + " with" + (pathwayId ? ' Pathway ' + pathwayId : '') + " " + url);

        // console.log('Current audio track group ID:', this.hls.audioTracks[this.hls.audioTrack].groupId);
        // console.log('New video quality level audio group id:', levelObject.attrs.AUDIO, level);
        this.clearTimer();
        this.hls.trigger(Events.LEVEL_LOADING, {
          url: url,
          level: currentLevelIndex,
          pathwayId: currentLevel.attrs['PATHWAY-ID'],
          id: 0,
          // Deprecated Level urlId
          deliveryDirectives: hlsUrlParameters || null
        });
      }
    };
    _proto.removeLevel = function removeLevel(levelIndex) {
      var _this3 = this,
        _this$currentLevel;
      var levels = this._levels.filter(function (level, index) {
        if (index !== levelIndex) {
          return true;
        }
        if (_this3.steering) {
          _this3.steering.removeLevel(level);
        }
        if (level === _this3.currentLevel) {
          _this3.currentLevel = null;
          _this3.currentLevelIndex = -1;
          if (level.details) {
            level.details.fragments.forEach(function (f) {
              return f.level = -1;
            });
          }
        }
        return false;
      });
      reassignFragmentLevelIndexes(levels);
      this._levels = levels;
      if (this.currentLevelIndex > -1 && (_this$currentLevel = this.currentLevel) != null && _this$currentLevel.details) {
        this.currentLevelIndex = this.currentLevel.details.fragments[0].level;
      }
      this.hls.trigger(Events.LEVELS_UPDATED, {
        levels: levels
      });
    };
    _proto.onLevelsUpdated = function onLevelsUpdated(event, _ref3) {
      var levels = _ref3.levels;
      this._levels = levels;
    };
    _proto.checkMaxAutoUpdated = function checkMaxAutoUpdated() {
      var _this$hls = this.hls,
        autoLevelCapping = _this$hls.autoLevelCapping,
        maxAutoLevel = _this$hls.maxAutoLevel,
        maxHdcpLevel = _this$hls.maxHdcpLevel;
      if (this._maxAutoLevel !== maxAutoLevel) {
        this._maxAutoLevel = maxAutoLevel;
        this.hls.trigger(Events.MAX_AUTO_LEVEL_UPDATED, {
          autoLevelCapping: autoLevelCapping,
          levels: this.levels,
          maxAutoLevel: maxAutoLevel,
          minAutoLevel: this.hls.minAutoLevel,
          maxHdcpLevel: maxHdcpLevel
        });
      }
    };
    _createClass(LevelController, [{
      key: "levels",
      get: function get() {
        if (this._levels.length === 0) {
          return null;
        }
        return this._levels;
      }
    }, {
      key: "level",
      get: function get() {
        return this.currentLevelIndex;
      },
      set: function set(newLevel) {
        var levels = this._levels;
        if (levels.length === 0) {
          return;
        }
        // check if level idx is valid
        if (newLevel < 0 || newLevel >= levels.length) {
          // invalid level id given, trigger error
          var error = new Error('invalid level idx');
          var fatal = newLevel < 0;
          this.hls.trigger(Events.ERROR, {
            type: ErrorTypes.OTHER_ERROR,
            details: ErrorDetails.LEVEL_SWITCH_ERROR,
            level: newLevel,
            fatal: fatal,
            error: error,
            reason: error.message
          });
          if (fatal) {
            return;
          }
          newLevel = Math.min(newLevel, levels.length - 1);
        }
        var lastLevelIndex = this.currentLevelIndex;
        var lastLevel = this.currentLevel;
        var lastPathwayId = lastLevel ? lastLevel.attrs['PATHWAY-ID'] : undefined;
        var level = levels[newLevel];
        var pathwayId = level.attrs['PATHWAY-ID'];
        this.currentLevelIndex = newLevel;
        this.currentLevel = level;
        if (lastLevelIndex === newLevel && level.details && lastLevel && lastPathwayId === pathwayId) {
          return;
        }
        this.log("Switching to level " + newLevel + " (" + (level.height ? level.height + 'p ' : '') + (level.videoRange ? level.videoRange + ' ' : '') + (level.codecSet ? level.codecSet + ' ' : '') + "@" + level.bitrate + ")" + (pathwayId ? ' with Pathway ' + pathwayId : '') + " from level " + lastLevelIndex + (lastPathwayId ? ' with Pathway ' + lastPathwayId : ''));
        var levelSwitchingData = {
          level: newLevel,
          attrs: level.attrs,
          details: level.details,
          bitrate: level.bitrate,
          averageBitrate: level.averageBitrate,
          maxBitrate: level.maxBitrate,
          realBitrate: level.realBitrate,
          width: level.width,
          height: level.height,
          codecSet: level.codecSet,
          audioCodec: level.audioCodec,
          videoCodec: level.videoCodec,
          audioGroups: level.audioGroups,
          subtitleGroups: level.subtitleGroups,
          loaded: level.loaded,
          loadError: level.loadError,
          fragmentError: level.fragmentError,
          name: level.name,
          id: level.id,
          uri: level.uri,
          url: level.url,
          urlId: 0,
          audioGroupIds: level.audioGroupIds,
          textGroupIds: level.textGroupIds
        };
        this.hls.trigger(Events.LEVEL_SWITCHING, levelSwitchingData);
        // check if we need to load playlist for this level
        var levelDetails = level.details;
        if (!levelDetails || levelDetails.live) {
          // level not retrieved yet, or live playlist we need to (re)load it
          var hlsUrlParameters = this.switchParams(level.uri, lastLevel == null ? void 0 : lastLevel.details, levelDetails);
          this.loadPlaylist(hlsUrlParameters);
        }
      }
    }, {
      key: "manualLevel",
      get: function get() {
        return this.manualLevelIndex;
      },
      set: function set(newLevel) {
        this.manualLevelIndex = newLevel;
        if (this._startLevel === undefined) {
          this._startLevel = newLevel;
        }
        if (newLevel !== -1) {
          this.level = newLevel;
        }
      }
    }, {
      key: "firstLevel",
      get: function get() {
        return this._firstLevel;
      },
      set: function set(newLevel) {
        this._firstLevel = newLevel;
      }
    }, {
      key: "startLevel",
      get: function get() {
        // Setting hls.startLevel (this._startLevel) overrides config.startLevel
        if (this._startLevel === undefined) {
          var configStartLevel = this.hls.config.startLevel;
          if (configStartLevel !== undefined) {
            return configStartLevel;
          }
          return this.hls.firstAutoLevel;
        }
        return this._startLevel;
      },
      set: function set(newLevel) {
        this._startLevel = newLevel;
      }
    }, {
      key: "nextLoadLevel",
      get: function get() {
        if (this.manualLevelIndex !== -1) {
          return this.manualLevelIndex;
        } else {
          return this.hls.nextAutoLevel;
        }
      },
      set: function set(nextLevel) {
        this.level = nextLevel;
        if (this.manualLevelIndex === -1) {
          this.hls.nextAutoLevel = nextLevel;
        }
      }
    }]);
    return LevelController;
  }(BasePlaylistController);
  function assignTrackIdsByGroup(tracks) {
    var groups = {};
    tracks.forEach(function (track) {
      var groupId = track.groupId || '';
      track.id = groups[groupId] = groups[groupId] || 0;
      groups[groupId]++;
    });
  }

  var FragmentState = {
    NOT_LOADED: "NOT_LOADED",
    APPENDING: "APPENDING",
    PARTIAL: "PARTIAL",
    OK: "OK"
  };
  var FragmentTracker = /*#__PURE__*/function () {
    function FragmentTracker(hls) {
      this.activePartLists = Object.create(null);
      this.endListFragments = Object.create(null);
      this.fragments = Object.create(null);
      this.timeRanges = Object.create(null);
      this.bufferPadding = 0.2;
      this.hls = void 0;
      this.hasGaps = false;
      this.hls = hls;
      this._registerListeners();
    }
    var _proto = FragmentTracker.prototype;
    _proto._registerListeners = function _registerListeners() {
      var hls = this.hls;
      hls.on(Events.BUFFER_APPENDED, this.onBufferAppended, this);
      hls.on(Events.FRAG_BUFFERED, this.onFragBuffered, this);
      hls.on(Events.FRAG_LOADED, this.onFragLoaded, this);
    };
    _proto._unregisterListeners = function _unregisterListeners() {
      var hls = this.hls;
      hls.off(Events.BUFFER_APPENDED, this.onBufferAppended, this);
      hls.off(Events.FRAG_BUFFERED, this.onFragBuffered, this);
      hls.off(Events.FRAG_LOADED, this.onFragLoaded, this);
    };
    _proto.destroy = function destroy() {
      this._unregisterListeners();
      // @ts-ignore
      this.fragments =
      // @ts-ignore
      this.activePartLists =
      // @ts-ignore
      this.endListFragments = this.timeRanges = null;
    }

    /**
     * Return a Fragment or Part with an appended range that matches the position and levelType
     * Otherwise, return null
     */;
    _proto.getAppendedFrag = function getAppendedFrag(position, levelType) {
      var activeParts = this.activePartLists[levelType];
      if (activeParts) {
        for (var i = activeParts.length; i--;) {
          var activePart = activeParts[i];
          if (!activePart) {
            break;
          }
          var appendedPTS = activePart.end;
          if (activePart.start <= position && appendedPTS !== null && position <= appendedPTS) {
            return activePart;
          }
        }
      }
      return this.getBufferedFrag(position, levelType);
    }

    /**
     * Return a buffered Fragment that matches the position and levelType.
     * A buffered Fragment is one whose loading, parsing and appending is done (completed or "partial" meaning aborted).
     * If not found any Fragment, return null
     */;
    _proto.getBufferedFrag = function getBufferedFrag(position, levelType) {
      var fragments = this.fragments;
      var keys = Object.keys(fragments);
      for (var i = keys.length; i--;) {
        var fragmentEntity = fragments[keys[i]];
        if ((fragmentEntity == null ? void 0 : fragmentEntity.body.type) === levelType && fragmentEntity.buffered) {
          var frag = fragmentEntity.body;
          if (frag.start <= position && position <= frag.end) {
            return frag;
          }
        }
      }
      return null;
    }

    /**
     * Partial fragments effected by coded frame eviction will be removed
     * The browser will unload parts of the buffer to free up memory for new buffer data
     * Fragments will need to be reloaded when the buffer is freed up, removing partial fragments will allow them to reload(since there might be parts that are still playable)
     */;
    _proto.detectEvictedFragments = function detectEvictedFragments(elementaryStream, timeRange, playlistType, appendedPart) {
      var _this = this;
      if (this.timeRanges) {
        this.timeRanges[elementaryStream] = timeRange;
      }
      // Check if any flagged fragments have been unloaded
      // excluding anything newer than appendedPartSn
      var appendedPartSn = (appendedPart == null ? void 0 : appendedPart.fragment.sn) || -1;
      Object.keys(this.fragments).forEach(function (key) {
        var fragmentEntity = _this.fragments[key];
        if (!fragmentEntity) {
          return;
        }
        if (appendedPartSn >= fragmentEntity.body.sn) {
          return;
        }
        if (!fragmentEntity.buffered && !fragmentEntity.loaded) {
          if (fragmentEntity.body.type === playlistType) {
            _this.removeFragment(fragmentEntity.body);
          }
          return;
        }
        var esData = fragmentEntity.range[elementaryStream];
        if (!esData) {
          return;
        }
        esData.time.some(function (time) {
          var isNotBuffered = !_this.isTimeBuffered(time.startPTS, time.endPTS, timeRange);
          if (isNotBuffered) {
            // Unregister partial fragment as it needs to load again to be reused
            _this.removeFragment(fragmentEntity.body);
          }
          return isNotBuffered;
        });
      });
    }

    /**
     * Checks if the fragment passed in is loaded in the buffer properly
     * Partially loaded fragments will be registered as a partial fragment
     */;
    _proto.detectPartialFragments = function detectPartialFragments(data) {
      var _this2 = this;
      var timeRanges = this.timeRanges;
      var frag = data.frag,
        part = data.part;
      if (!timeRanges || frag.sn === 'initSegment') {
        return;
      }
      var fragKey = getFragmentKey(frag);
      var fragmentEntity = this.fragments[fragKey];
      if (!fragmentEntity || fragmentEntity.buffered && frag.gap) {
        return;
      }
      var isFragHint = !frag.relurl;
      Object.keys(timeRanges).forEach(function (elementaryStream) {
        var streamInfo = frag.elementaryStreams[elementaryStream];
        if (!streamInfo) {
          return;
        }
        var timeRange = timeRanges[elementaryStream];
        var partial = isFragHint || streamInfo.partial === true;
        fragmentEntity.range[elementaryStream] = _this2.getBufferedTimes(frag, part, partial, timeRange);
      });
      fragmentEntity.loaded = null;
      if (Object.keys(fragmentEntity.range).length) {
        fragmentEntity.buffered = true;
        var endList = fragmentEntity.body.endList = frag.endList || fragmentEntity.body.endList;
        if (endList) {
          this.endListFragments[fragmentEntity.body.type] = fragmentEntity;
        }
        if (!isPartial(fragmentEntity)) {
          // Remove older fragment parts from lookup after frag is tracked as buffered
          this.removeParts(frag.sn - 1, frag.type);
        }
      } else {
        // remove fragment if nothing was appended
        this.removeFragment(fragmentEntity.body);
      }
    };
    _proto.removeParts = function removeParts(snToKeep, levelType) {
      var activeParts = this.activePartLists[levelType];
      if (!activeParts) {
        return;
      }
      this.activePartLists[levelType] = activeParts.filter(function (part) {
        return part.fragment.sn >= snToKeep;
      });
    };
    _proto.fragBuffered = function fragBuffered(frag, force) {
      var fragKey = getFragmentKey(frag);
      var fragmentEntity = this.fragments[fragKey];
      if (!fragmentEntity && force) {
        fragmentEntity = this.fragments[fragKey] = {
          body: frag,
          appendedPTS: null,
          loaded: null,
          buffered: false,
          range: Object.create(null)
        };
        if (frag.gap) {
          this.hasGaps = true;
        }
      }
      if (fragmentEntity) {
        fragmentEntity.loaded = null;
        fragmentEntity.buffered = true;
      }
    };
    _proto.getBufferedTimes = function getBufferedTimes(fragment, part, partial, timeRange) {
      var buffered = {
        time: [],
        partial: partial
      };
      var startPTS = fragment.start;
      var endPTS = fragment.end;
      var minEndPTS = fragment.minEndPTS || endPTS;
      var maxStartPTS = fragment.maxStartPTS || startPTS;
      for (var i = 0; i < timeRange.length; i++) {
        var startTime = timeRange.start(i) - this.bufferPadding;
        var endTime = timeRange.end(i) + this.bufferPadding;
        if (maxStartPTS >= startTime && minEndPTS <= endTime) {
          // Fragment is entirely contained in buffer
          // No need to check the other timeRange times since it's completely playable
          buffered.time.push({
            startPTS: Math.max(startPTS, timeRange.start(i)),
            endPTS: Math.min(endPTS, timeRange.end(i))
          });
          break;
        } else if (startPTS < endTime && endPTS > startTime) {
          var start = Math.max(startPTS, timeRange.start(i));
          var end = Math.min(endPTS, timeRange.end(i));
          if (end > start) {
            buffered.partial = true;
            // Check for intersection with buffer
            // Get playable sections of the fragment
            buffered.time.push({
              startPTS: start,
              endPTS: end
            });
          }
        } else if (endPTS <= startTime) {
          // No need to check the rest of the timeRange as it is in order
          break;
        }
      }
      return buffered;
    }

    /**
     * Gets the partial fragment for a certain time
     */;
    _proto.getPartialFragment = function getPartialFragment(time) {
      var bestFragment = null;
      var timePadding;
      var startTime;
      var endTime;
      var bestOverlap = 0;
      var bufferPadding = this.bufferPadding,
        fragments = this.fragments;
      Object.keys(fragments).forEach(function (key) {
        var fragmentEntity = fragments[key];
        if (!fragmentEntity) {
          return;
        }
        if (isPartial(fragmentEntity)) {
          startTime = fragmentEntity.body.start - bufferPadding;
          endTime = fragmentEntity.body.end + bufferPadding;
          if (time >= startTime && time <= endTime) {
            // Use the fragment that has the most padding from start and end time
            timePadding = Math.min(time - startTime, endTime - time);
            if (bestOverlap <= timePadding) {
              bestFragment = fragmentEntity.body;
              bestOverlap = timePadding;
            }
          }
        }
      });
      return bestFragment;
    };
    _proto.isEndListAppended = function isEndListAppended(type) {
      var lastFragmentEntity = this.endListFragments[type];
      return lastFragmentEntity !== undefined && (lastFragmentEntity.buffered || isPartial(lastFragmentEntity));
    };
    _proto.getState = function getState(fragment) {
      var fragKey = getFragmentKey(fragment);
      var fragmentEntity = this.fragments[fragKey];
      if (fragmentEntity) {
        if (!fragmentEntity.buffered) {
          return FragmentState.APPENDING;
        } else if (isPartial(fragmentEntity)) {
          return FragmentState.PARTIAL;
        } else {
          return FragmentState.OK;
        }
      }
      return FragmentState.NOT_LOADED;
    };
    _proto.isTimeBuffered = function isTimeBuffered(startPTS, endPTS, timeRange) {
      var startTime;
      var endTime;
      for (var i = 0; i < timeRange.length; i++) {
        startTime = timeRange.start(i) - this.bufferPadding;
        endTime = timeRange.end(i) + this.bufferPadding;
        if (startPTS >= startTime && endPTS <= endTime) {
          return true;
        }
        if (endPTS <= startTime) {
          // No need to check the rest of the timeRange as it is in order
          return false;
        }
      }
      return false;
    };
    _proto.onFragLoaded = function onFragLoaded(event, data) {
      var frag = data.frag,
        part = data.part;
      // don't track initsegment (for which sn is not a number)
      // don't track frags used for bitrateTest, they're irrelevant.
      if (frag.sn === 'initSegment' || frag.bitrateTest) {
        return;
      }

      // Fragment entity `loaded` FragLoadedData is null when loading parts
      var loaded = part ? null : data;
      var fragKey = getFragmentKey(frag);
      this.fragments[fragKey] = {
        body: frag,
        appendedPTS: null,
        loaded: loaded,
        buffered: false,
        range: Object.create(null)
      };
    };
    _proto.onBufferAppended = function onBufferAppended(event, data) {
      var _this3 = this;
      var frag = data.frag,
        part = data.part,
        timeRanges = data.timeRanges;
      if (frag.sn === 'initSegment') {
        return;
      }
      var playlistType = frag.type;
      if (part) {
        var activeParts = this.activePartLists[playlistType];
        if (!activeParts) {
          this.activePartLists[playlistType] = activeParts = [];
        }
        activeParts.push(part);
      }
      // Store the latest timeRanges loaded in the buffer
      this.timeRanges = timeRanges;
      Object.keys(timeRanges).forEach(function (elementaryStream) {
        var timeRange = timeRanges[elementaryStream];
        _this3.detectEvictedFragments(elementaryStream, timeRange, playlistType, part);
      });
    };
    _proto.onFragBuffered = function onFragBuffered(event, data) {
      this.detectPartialFragments(data);
    };
    _proto.hasFragment = function hasFragment(fragment) {
      var fragKey = getFragmentKey(fragment);
      return !!this.fragments[fragKey];
    };
    _proto.hasParts = function hasParts(type) {
      var _this$activePartLists;
      return !!((_this$activePartLists = this.activePartLists[type]) != null && _this$activePartLists.length);
    };
    _proto.removeFragmentsInRange = function removeFragmentsInRange(start, end, playlistType, withGapOnly, unbufferedOnly) {
      var _this4 = this;
      if (withGapOnly && !this.hasGaps) {
        return;
      }
      Object.keys(this.fragments).forEach(function (key) {
        var fragmentEntity = _this4.fragments[key];
        if (!fragmentEntity) {
          return;
        }
        var frag = fragmentEntity.body;
        if (frag.type !== playlistType || withGapOnly && !frag.gap) {
          return;
        }
        if (frag.start < end && frag.end > start && (fragmentEntity.buffered || unbufferedOnly)) {
          _this4.removeFragment(frag);
        }
      });
    };
    _proto.removeFragment = function removeFragment(fragment) {
      var fragKey = getFragmentKey(fragment);
      fragment.stats.loaded = 0;
      fragment.clearElementaryStreamInfo();
      var activeParts = this.activePartLists[fragment.type];
      if (activeParts) {
        var snToRemove = fragment.sn;
        this.activePartLists[fragment.type] = activeParts.filter(function (part) {
          return part.fragment.sn !== snToRemove;
        });
      }
      delete this.fragments[fragKey];
      if (fragment.endList) {
        delete this.endListFragments[fragment.type];
      }
    };
    _proto.removeAllFragments = function removeAllFragments() {
      this.fragments = Object.create(null);
      this.endListFragments = Object.create(null);
      this.activePartLists = Object.create(null);
      this.hasGaps = false;
    };
    return FragmentTracker;
  }();
  function isPartial(fragmentEntity) {
    var _fragmentEntity$range, _fragmentEntity$range2, _fragmentEntity$range3;
    return fragmentEntity.buffered && (fragmentEntity.body.gap || ((_fragmentEntity$range = fragmentEntity.range.video) == null ? void 0 : _fragmentEntity$range.partial) || ((_fragmentEntity$range2 = fragmentEntity.range.audio) == null ? void 0 : _fragmentEntity$range2.partial) || ((_fragmentEntity$range3 = fragmentEntity.range.audiovideo) == null ? void 0 : _fragmentEntity$range3.partial));
  }
  function getFragmentKey(fragment) {
    return fragment.type + "_" + fragment.level + "_" + fragment.sn;
  }

  var MIN_CHUNK_SIZE = Math.pow(2, 17); // 128kb
  var FragmentLoader = /*#__PURE__*/function () {
    function FragmentLoader(config) {
      this.config = void 0;
      this.loader = null;
      this.partLoadTimeout = -1;
      this.config = config;
    }
    var _proto = FragmentLoader.prototype;
    _proto.destroy = function destroy() {
      if (this.loader) {
        this.loader.destroy();
        this.loader = null;
      }
    };
    _proto.abort = function abort() {
      if (this.loader) {
        // Abort the loader for current fragment. Only one may load at any given time
        this.loader.abort();
      }
    };
    _proto.load = function load(frag, _onProgress) {
      var _this = this;
      var url = frag.url;
      if (!url) {
        return Promise.reject(new LoadError({
          type: ErrorTypes.NETWORK_ERROR,
          details: ErrorDetails.FRAG_LOAD_ERROR,
          fatal: false,
          frag: frag,
          error: new Error("Fragment does not have a " + (url ? 'part list' : 'url')),
          networkDetails: null
        }));
      }
      this.abort();
      var config = this.config;
      var FragmentILoader = config.fLoader;
      var DefaultILoader = config.loader;
      return new Promise(function (resolve, reject) {
        if (_this.loader) {
          _this.loader.destroy();
        }
        if (frag.gap) {
          if (frag.tagList.some(function (tags) {
            return tags[0] === 'GAP';
          })) {
            reject(createGapLoadError(frag));
            return;
          } else {
            // Reset temporary treatment as GAP tag
            frag.gap = false;
          }
        }
        var loader = _this.loader = frag.loader = FragmentILoader ? new FragmentILoader(config) : new DefaultILoader(config);
        var loaderContext = createLoaderContext(frag);
        var loadPolicy = getLoaderConfigWithoutReties(config.fragLoadPolicy.default);
        var loaderConfig = {
          loadPolicy: loadPolicy,
          timeout: loadPolicy.maxLoadTimeMs,
          maxRetry: 0,
          retryDelay: 0,
          maxRetryDelay: 0,
          highWaterMark: frag.sn === 'initSegment' ? Infinity : MIN_CHUNK_SIZE
        };
        // Assign frag stats to the loader's stats reference
        frag.stats = loader.stats;
        loader.load(loaderContext, loaderConfig, {
          onSuccess: function onSuccess(response, stats, context, networkDetails) {
            _this.resetLoader(frag, loader);
            var payload = response.data;
            if (context.resetIV && frag.decryptdata) {
              frag.decryptdata.iv = new Uint8Array(payload.slice(0, 16));
              payload = payload.slice(16);
            }
            resolve({
              frag: frag,
              part: null,
              payload: payload,
              networkDetails: networkDetails
            });
          },
          onError: function onError(response, context, networkDetails, stats) {
            _this.resetLoader(frag, loader);
            reject(new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.FRAG_LOAD_ERROR,
              fatal: false,
              frag: frag,
              response: _objectSpread2({
                url: url,
                data: undefined
              }, response),
              error: new Error("HTTP Error " + response.code + " " + response.text),
              networkDetails: networkDetails,
              stats: stats
            }));
          },
          onAbort: function onAbort(stats, context, networkDetails) {
            _this.resetLoader(frag, loader);
            reject(new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.INTERNAL_ABORTED,
              fatal: false,
              frag: frag,
              error: new Error('Aborted'),
              networkDetails: networkDetails,
              stats: stats
            }));
          },
          onTimeout: function onTimeout(stats, context, networkDetails) {
            _this.resetLoader(frag, loader);
            reject(new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.FRAG_LOAD_TIMEOUT,
              fatal: false,
              frag: frag,
              error: new Error("Timeout after " + loaderConfig.timeout + "ms"),
              networkDetails: networkDetails,
              stats: stats
            }));
          },
          onProgress: function onProgress(stats, context, data, networkDetails) {
            if (_onProgress) {
              _onProgress({
                frag: frag,
                part: null,
                payload: data,
                networkDetails: networkDetails
              });
            }
          }
        });
      });
    };
    _proto.loadPart = function loadPart(frag, part, onProgress) {
      var _this2 = this;
      this.abort();
      var config = this.config;
      var FragmentILoader = config.fLoader;
      var DefaultILoader = config.loader;
      return new Promise(function (resolve, reject) {
        if (_this2.loader) {
          _this2.loader.destroy();
        }
        if (frag.gap || part.gap) {
          reject(createGapLoadError(frag, part));
          return;
        }
        var loader = _this2.loader = frag.loader = FragmentILoader ? new FragmentILoader(config) : new DefaultILoader(config);
        var loaderContext = createLoaderContext(frag, part);
        // Should we define another load policy for parts?
        var loadPolicy = getLoaderConfigWithoutReties(config.fragLoadPolicy.default);
        var loaderConfig = {
          loadPolicy: loadPolicy,
          timeout: loadPolicy.maxLoadTimeMs,
          maxRetry: 0,
          retryDelay: 0,
          maxRetryDelay: 0,
          highWaterMark: MIN_CHUNK_SIZE
        };
        // Assign part stats to the loader's stats reference
        part.stats = loader.stats;
        loader.load(loaderContext, loaderConfig, {
          onSuccess: function onSuccess(response, stats, context, networkDetails) {
            _this2.resetLoader(frag, loader);
            _this2.updateStatsFromPart(frag, part);
            var partLoadedData = {
              frag: frag,
              part: part,
              payload: response.data,
              networkDetails: networkDetails
            };
            onProgress(partLoadedData);
            resolve(partLoadedData);
          },
          onError: function onError(response, context, networkDetails, stats) {
            _this2.resetLoader(frag, loader);
            reject(new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.FRAG_LOAD_ERROR,
              fatal: false,
              frag: frag,
              part: part,
              response: _objectSpread2({
                url: loaderContext.url,
                data: undefined
              }, response),
              error: new Error("HTTP Error " + response.code + " " + response.text),
              networkDetails: networkDetails,
              stats: stats
            }));
          },
          onAbort: function onAbort(stats, context, networkDetails) {
            frag.stats.aborted = part.stats.aborted;
            _this2.resetLoader(frag, loader);
            reject(new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.INTERNAL_ABORTED,
              fatal: false,
              frag: frag,
              part: part,
              error: new Error('Aborted'),
              networkDetails: networkDetails,
              stats: stats
            }));
          },
          onTimeout: function onTimeout(stats, context, networkDetails) {
            _this2.resetLoader(frag, loader);
            reject(new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.FRAG_LOAD_TIMEOUT,
              fatal: false,
              frag: frag,
              part: part,
              error: new Error("Timeout after " + loaderConfig.timeout + "ms"),
              networkDetails: networkDetails,
              stats: stats
            }));
          }
        });
      });
    };
    _proto.updateStatsFromPart = function updateStatsFromPart(frag, part) {
      var fragStats = frag.stats;
      var partStats = part.stats;
      var partTotal = partStats.total;
      fragStats.loaded += partStats.loaded;
      if (partTotal) {
        var estTotalParts = Math.round(frag.duration / part.duration);
        var estLoadedParts = Math.min(Math.round(fragStats.loaded / partTotal), estTotalParts);
        var estRemainingParts = estTotalParts - estLoadedParts;
        var estRemainingBytes = estRemainingParts * Math.round(fragStats.loaded / estLoadedParts);
        fragStats.total = fragStats.loaded + estRemainingBytes;
      } else {
        fragStats.total = Math.max(fragStats.loaded, fragStats.total);
      }
      var fragLoading = fragStats.loading;
      var partLoading = partStats.loading;
      if (fragLoading.start) {
        // add to fragment loader latency
        fragLoading.first += partLoading.first - partLoading.start;
      } else {
        fragLoading.start = partLoading.start;
        fragLoading.first = partLoading.first;
      }
      fragLoading.end = partLoading.end;
    };
    _proto.resetLoader = function resetLoader(frag, loader) {
      frag.loader = null;
      if (this.loader === loader) {
        self.clearTimeout(this.partLoadTimeout);
        this.loader = null;
      }
      loader.destroy();
    };
    return FragmentLoader;
  }();
  function createLoaderContext(frag, part) {
    if (part === void 0) {
      part = null;
    }
    var segment = part || frag;
    var loaderContext = {
      frag: frag,
      part: part,
      responseType: 'arraybuffer',
      url: segment.url,
      headers: {},
      rangeStart: 0,
      rangeEnd: 0
    };
    var start = segment.byteRangeStartOffset;
    var end = segment.byteRangeEndOffset;
    if (isFiniteNumber(start) && isFiniteNumber(end)) {
      var _frag$decryptdata;
      var byteRangeStart = start;
      var byteRangeEnd = end;
      if (frag.sn === 'initSegment' && ((_frag$decryptdata = frag.decryptdata) == null ? void 0 : _frag$decryptdata.method) === 'AES-128') {
        // MAP segment encrypted with method 'AES-128', when served with HTTP Range,
        // has the unencrypted size specified in the range.
        // Ref: https://tools.ietf.org/html/draft-pantos-hls-rfc8216bis-08#section-6.3.6
        var fragmentLen = end - start;
        if (fragmentLen % 16) {
          byteRangeEnd = end + (16 - fragmentLen % 16);
        }
        if (start !== 0) {
          loaderContext.resetIV = true;
          byteRangeStart = start - 16;
        }
      }
      loaderContext.rangeStart = byteRangeStart;
      loaderContext.rangeEnd = byteRangeEnd;
    }
    return loaderContext;
  }
  function createGapLoadError(frag, part) {
    var error = new Error("GAP " + (frag.gap ? 'tag' : 'attribute') + " found");
    var errorData = {
      type: ErrorTypes.MEDIA_ERROR,
      details: ErrorDetails.FRAG_GAP,
      fatal: false,
      frag: frag,
      error: error,
      networkDetails: null
    };
    if (part) {
      errorData.part = part;
    }
    (part ? part : frag).stats.aborted = true;
    return new LoadError(errorData);
  }
  var LoadError = /*#__PURE__*/function (_Error) {
    _inheritsLoose(LoadError, _Error);
    function LoadError(data) {
      var _this3;
      _this3 = _Error.call(this, data.error.message) || this;
      _this3.data = void 0;
      _this3.data = data;
      return _this3;
    }
    return LoadError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var KeyLoader = /*#__PURE__*/function () {
    function KeyLoader(config) {
      this.config = void 0;
      this.keyUriToKeyInfo = {};
      this.emeController = null;
      this.config = config;
    }
    var _proto = KeyLoader.prototype;
    _proto.abort = function abort(type) {
      for (var uri in this.keyUriToKeyInfo) {
        var loader = this.keyUriToKeyInfo[uri].loader;
        if (loader) {
          var _loader$context;
          if (type && type !== ((_loader$context = loader.context) == null ? void 0 : _loader$context.frag.type)) {
            return;
          }
          loader.abort();
        }
      }
    };
    _proto.detach = function detach() {
      for (var uri in this.keyUriToKeyInfo) {
        var keyInfo = this.keyUriToKeyInfo[uri];
        // Remove cached EME keys on detach
        if (keyInfo.mediaKeySessionContext || keyInfo.decryptdata.isCommonEncryption) {
          delete this.keyUriToKeyInfo[uri];
        }
      }
    };
    _proto.destroy = function destroy() {
      this.detach();
      for (var uri in this.keyUriToKeyInfo) {
        var loader = this.keyUriToKeyInfo[uri].loader;
        if (loader) {
          loader.destroy();
        }
      }
      this.keyUriToKeyInfo = {};
    };
    _proto.createKeyLoadError = function createKeyLoadError(frag, details, error, networkDetails, response) {
      if (details === void 0) {
        details = ErrorDetails.KEY_LOAD_ERROR;
      }
      return new LoadError({
        type: ErrorTypes.NETWORK_ERROR,
        details: details,
        fatal: false,
        frag: frag,
        response: response,
        error: error,
        networkDetails: networkDetails
      });
    };
    _proto.loadClear = function loadClear(loadingFrag, encryptedFragments) {
      var _this = this;
      if (this.emeController && this.config.emeEnabled) {
        // access key-system with nearest key on start (loaidng frag is unencrypted)
        var sn = loadingFrag.sn,
          cc = loadingFrag.cc;
        var _loop = function _loop() {
          var frag = encryptedFragments[i];
          if (cc <= frag.cc && (sn === 'initSegment' || frag.sn === 'initSegment' || sn < frag.sn)) {
            _this.emeController.selectKeySystemFormat(frag).then(function (keySystemFormat) {
              frag.setKeyFormat(keySystemFormat);
            });
            return 1; // break
          }
        };
        for (var i = 0; i < encryptedFragments.length; i++) {
          if (_loop()) break;
        }
      }
    };
    _proto.load = function load(frag) {
      var _this2 = this;
      if (!frag.decryptdata && frag.encrypted && this.emeController) {
        // Multiple keys, but none selected, resolve in eme-controller
        return this.emeController.selectKeySystemFormat(frag).then(function (keySystemFormat) {
          return _this2.loadInternal(frag, keySystemFormat);
        });
      }
      return this.loadInternal(frag);
    };
    _proto.loadInternal = function loadInternal(frag, keySystemFormat) {
      var _keyInfo, _keyInfo2;
      if (keySystemFormat) {
        frag.setKeyFormat(keySystemFormat);
      }
      var decryptdata = frag.decryptdata;
      if (!decryptdata) {
        var error = new Error(keySystemFormat ? "Expected frag.decryptdata to be defined after setting format " + keySystemFormat : 'Missing decryption data on fragment in onKeyLoading');
        return Promise.reject(this.createKeyLoadError(frag, ErrorDetails.KEY_LOAD_ERROR, error));
      }
      var uri = decryptdata.uri;
      if (!uri) {
        return Promise.reject(this.createKeyLoadError(frag, ErrorDetails.KEY_LOAD_ERROR, new Error("Invalid key URI: \"" + uri + "\"")));
      }
      var keyInfo = this.keyUriToKeyInfo[uri];
      if ((_keyInfo = keyInfo) != null && _keyInfo.decryptdata.key) {
        decryptdata.key = keyInfo.decryptdata.key;
        return Promise.resolve({
          frag: frag,
          keyInfo: keyInfo
        });
      }
      // Return key load promise as long as it does not have a mediakey session with an unusable key status
      if ((_keyInfo2 = keyInfo) != null && _keyInfo2.keyLoadPromise) {
        var _keyInfo$mediaKeySess;
        switch ((_keyInfo$mediaKeySess = keyInfo.mediaKeySessionContext) == null ? void 0 : _keyInfo$mediaKeySess.keyStatus) {
          case undefined:
          case 'status-pending':
          case 'usable':
          case 'usable-in-future':
            return keyInfo.keyLoadPromise.then(function (keyLoadedData) {
              // Return the correct fragment with updated decryptdata key and loaded keyInfo
              decryptdata.key = keyLoadedData.keyInfo.decryptdata.key;
              return {
                frag: frag,
                keyInfo: keyInfo
              };
            });
        }
        // If we have a key session and status and it is not pending or usable, continue
        // This will go back to the eme-controller for expired keys to get a new keyLoadPromise
      }

      // Load the key or return the loading promise
      keyInfo = this.keyUriToKeyInfo[uri] = {
        decryptdata: decryptdata,
        keyLoadPromise: null,
        loader: null,
        mediaKeySessionContext: null
      };
      switch (decryptdata.method) {
        case 'ISO-23001-7':
        case 'SAMPLE-AES':
        case 'SAMPLE-AES-CENC':
        case 'SAMPLE-AES-CTR':
          if (decryptdata.keyFormat === 'identity') {
            // loadKeyHTTP handles http(s) and data URLs
            return this.loadKeyHTTP(keyInfo, frag);
          }
          return this.loadKeyEME(keyInfo, frag);
        case 'AES-128':
          return this.loadKeyHTTP(keyInfo, frag);
        default:
          return Promise.reject(this.createKeyLoadError(frag, ErrorDetails.KEY_LOAD_ERROR, new Error("Key supplied with unsupported METHOD: \"" + decryptdata.method + "\"")));
      }
    };
    _proto.loadKeyEME = function loadKeyEME(keyInfo, frag) {
      var keyLoadedData = {
        frag: frag,
        keyInfo: keyInfo
      };
      if (this.emeController && this.config.emeEnabled) {
        var keySessionContextPromise = this.emeController.loadKey(keyLoadedData);
        if (keySessionContextPromise) {
          return (keyInfo.keyLoadPromise = keySessionContextPromise.then(function (keySessionContext) {
            keyInfo.mediaKeySessionContext = keySessionContext;
            return keyLoadedData;
          })).catch(function (error) {
            // Remove promise for license renewal or retry
            keyInfo.keyLoadPromise = null;
            throw error;
          });
        }
      }
      return Promise.resolve(keyLoadedData);
    };
    _proto.loadKeyHTTP = function loadKeyHTTP(keyInfo, frag) {
      var _this3 = this;
      var config = this.config;
      var Loader = config.loader;
      var keyLoader = new Loader(config);
      frag.keyLoader = keyInfo.loader = keyLoader;
      return keyInfo.keyLoadPromise = new Promise(function (resolve, reject) {
        var loaderContext = {
          keyInfo: keyInfo,
          frag: frag,
          responseType: 'arraybuffer',
          url: keyInfo.decryptdata.uri
        };

        // maxRetry is 0 so that instead of retrying the same key on the same variant multiple times,
        // key-loader will trigger an error and rely on stream-controller to handle retry logic.
        // this will also align retry logic with fragment-loader
        var loadPolicy = config.keyLoadPolicy.default;
        var loaderConfig = {
          loadPolicy: loadPolicy,
          timeout: loadPolicy.maxLoadTimeMs,
          maxRetry: 0,
          retryDelay: 0,
          maxRetryDelay: 0
        };
        var loaderCallbacks = {
          onSuccess: function onSuccess(response, stats, context, networkDetails) {
            var frag = context.frag,
              keyInfo = context.keyInfo,
              uri = context.url;
            if (!frag.decryptdata || keyInfo !== _this3.keyUriToKeyInfo[uri]) {
              return reject(_this3.createKeyLoadError(frag, ErrorDetails.KEY_LOAD_ERROR, new Error('after key load, decryptdata unset or changed'), networkDetails));
            }
            keyInfo.decryptdata.key = frag.decryptdata.key = new Uint8Array(response.data);

            // detach fragment key loader on load success
            frag.keyLoader = null;
            keyInfo.loader = null;
            resolve({
              frag: frag,
              keyInfo: keyInfo
            });
          },
          onError: function onError(response, context, networkDetails, stats) {
            _this3.resetLoader(context);
            reject(_this3.createKeyLoadError(frag, ErrorDetails.KEY_LOAD_ERROR, new Error("HTTP Error " + response.code + " loading key " + response.text), networkDetails, _objectSpread2({
              url: loaderContext.url,
              data: undefined
            }, response)));
          },
          onTimeout: function onTimeout(stats, context, networkDetails) {
            _this3.resetLoader(context);
            reject(_this3.createKeyLoadError(frag, ErrorDetails.KEY_LOAD_TIMEOUT, new Error('key loading timed out'), networkDetails));
          },
          onAbort: function onAbort(stats, context, networkDetails) {
            _this3.resetLoader(context);
            reject(_this3.createKeyLoadError(frag, ErrorDetails.INTERNAL_ABORTED, new Error('key loading aborted'), networkDetails));
          }
        };
        keyLoader.load(loaderContext, loaderConfig, loaderCallbacks);
      });
    };
    _proto.resetLoader = function resetLoader(context) {
      var frag = context.frag,
        keyInfo = context.keyInfo,
        uri = context.url;
      var loader = keyInfo.loader;
      if (frag.keyLoader === loader) {
        frag.keyLoader = null;
        keyInfo.loader = null;
      }
      delete this.keyUriToKeyInfo[uri];
      if (loader) {
        loader.destroy();
      }
    };
    return KeyLoader;
  }();

  /**
   * @ignore
   * Sub-class specialization of EventHandler base class.
   *
   * TaskLoop allows to schedule a task function being called (optionnaly repeatedly) on the main loop,
   * scheduled asynchroneously, avoiding recursive calls in the same tick.
   *
   * The task itself is implemented in `doTick`. It can be requested and called for single execution
   * using the `tick` method.
   *
   * It will be assured that the task execution method (`tick`) only gets called once per main loop "tick",
   * no matter how often it gets requested for execution. Execution in further ticks will be scheduled accordingly.
   *
   * If further execution requests have already been scheduled on the next tick, it can be checked with `hasNextTick`,
   * and cancelled with `clearNextTick`.
   *
   * The task can be scheduled as an interval repeatedly with a period as parameter (see `setInterval`, `clearInterval`).
   *
   * Sub-classes need to implement the `doTick` method which will effectively have the task execution routine.
   *
   * Further explanations:
   *
   * The baseclass has a `tick` method that will schedule the doTick call. It may be called synchroneously
   * only for a stack-depth of one. On re-entrant calls, sub-sequent calls are scheduled for next main loop ticks.
   *
   * When the task execution (`tick` method) is called in re-entrant way this is detected and
   * we are limiting the task execution per call stack to exactly one, but scheduling/post-poning further
   * task processing on the next main loop iteration (also known as "next tick" in the Node/JS runtime lingo).
   */
  var TaskLoop = /*#__PURE__*/function () {
    function TaskLoop() {
      this._boundTick = void 0;
      this._tickTimer = null;
      this._tickInterval = null;
      this._tickCallCount = 0;
      this._boundTick = this.tick.bind(this);
    }
    var _proto = TaskLoop.prototype;
    _proto.destroy = function destroy() {
      this.onHandlerDestroying();
      this.onHandlerDestroyed();
    };
    _proto.onHandlerDestroying = function onHandlerDestroying() {
      // clear all timers before unregistering from event bus
      this.clearNextTick();
      this.clearInterval();
    };
    _proto.onHandlerDestroyed = function onHandlerDestroyed() {};
    _proto.hasInterval = function hasInterval() {
      return !!this._tickInterval;
    };
    _proto.hasNextTick = function hasNextTick() {
      return !!this._tickTimer;
    }

    /**
     * @param millis - Interval time (ms)
     * @eturns True when interval has been scheduled, false when already scheduled (no effect)
     */;
    _proto.setInterval = function setInterval(millis) {
      if (!this._tickInterval) {
        this._tickCallCount = 0;
        this._tickInterval = self.setInterval(this._boundTick, millis);
        return true;
      }
      return false;
    }

    /**
     * @returns True when interval was cleared, false when none was set (no effect)
     */;
    _proto.clearInterval = function clearInterval() {
      if (this._tickInterval) {
        self.clearInterval(this._tickInterval);
        this._tickInterval = null;
        return true;
      }
      return false;
    }

    /**
     * @returns True when timeout was cleared, false when none was set (no effect)
     */;
    _proto.clearNextTick = function clearNextTick() {
      if (this._tickTimer) {
        self.clearTimeout(this._tickTimer);
        this._tickTimer = null;
        return true;
      }
      return false;
    }

    /**
     * Will call the subclass doTick implementation in this main loop tick
     * or in the next one (via setTimeout(,0)) in case it has already been called
     * in this tick (in case this is a re-entrant call).
     */;
    _proto.tick = function tick() {
      this._tickCallCount++;
      if (this._tickCallCount === 1) {
        this.doTick();
        // re-entrant call to tick from previous doTick call stack
        // -> schedule a call on the next main loop iteration to process this task processing request
        if (this._tickCallCount > 1) {
          // make sure only one timer exists at any time at max
          this.tickImmediate();
        }
        this._tickCallCount = 0;
      }
    };
    _proto.tickImmediate = function tickImmediate() {
      this.clearNextTick();
      this._tickTimer = self.setTimeout(this._boundTick, 0);
    }

    /**
     * For subclass to implement task logic
     * @abstract
     */;
    _proto.doTick = function doTick() {};
    return TaskLoop;
  }();

  var ChunkMetadata = function ChunkMetadata(level, sn, id, size, part, partial) {
    if (size === void 0) {
      size = 0;
    }
    if (part === void 0) {
      part = -1;
    }
    if (partial === void 0) {
      partial = false;
    }
    this.level = void 0;
    this.sn = void 0;
    this.part = void 0;
    this.id = void 0;
    this.size = void 0;
    this.partial = void 0;
    this.transmuxing = getNewPerformanceTiming();
    this.buffering = {
      audio: getNewPerformanceTiming(),
      video: getNewPerformanceTiming(),
      audiovideo: getNewPerformanceTiming()
    };
    this.level = level;
    this.sn = sn;
    this.id = id;
    this.size = size;
    this.part = part;
    this.partial = partial;
  };
  function getNewPerformanceTiming() {
    return {
      start: 0,
      executeStart: 0,
      executeEnd: 0,
      end: 0
    };
  }

  function findFirstFragWithCC(fragments, cc) {
    for (var i = 0, len = fragments.length; i < len; i++) {
      var _fragments$i;
      if (((_fragments$i = fragments[i]) == null ? void 0 : _fragments$i.cc) === cc) {
        return fragments[i];
      }
    }
    return null;
  }
  function shouldAlignOnDiscontinuities(lastFrag, switchDetails, details) {
    if (switchDetails) {
      if (details.endCC > details.startCC || lastFrag && lastFrag.cc < details.startCC) {
        return true;
      }
    }
    return false;
  }

  // Find the first frag in the previous level which matches the CC of the first frag of the new level
  function findDiscontinuousReferenceFrag(prevDetails, curDetails) {
    var prevFrags = prevDetails.fragments;
    var curFrags = curDetails.fragments;
    if (!curFrags.length || !prevFrags.length) {
      logger.log('No fragments to align');
      return;
    }
    var prevStartFrag = findFirstFragWithCC(prevFrags, curFrags[0].cc);
    if (!prevStartFrag || prevStartFrag && !prevStartFrag.startPTS) {
      logger.log('No frag in previous level to align on');
      return;
    }
    return prevStartFrag;
  }
  function adjustFragmentStart(frag, sliding) {
    if (frag) {
      var start = frag.start + sliding;
      frag.start = frag.startPTS = start;
      frag.endPTS = start + frag.duration;
    }
  }
  function adjustSlidingStart(sliding, details) {
    // Update segments
    var fragments = details.fragments;
    for (var i = 0, len = fragments.length; i < len; i++) {
      adjustFragmentStart(fragments[i], sliding);
    }
    // Update LL-HLS parts at the end of the playlist
    if (details.fragmentHint) {
      adjustFragmentStart(details.fragmentHint, sliding);
    }
    details.alignedSliding = true;
  }

  /**
   * Using the parameters of the last level, this function computes PTS' of the new fragments so that they form a
   * contiguous stream with the last fragments.
   * The PTS of a fragment lets Hls.js know where it fits into a stream - by knowing every PTS, we know which fragment to
   * download at any given time. PTS is normally computed when the fragment is demuxed, so taking this step saves us time
   * and an extra download.
   * @param lastFrag
   * @param lastLevel
   * @param details
   */
  function alignStream(lastFrag, switchDetails, details) {
    if (!switchDetails) {
      return;
    }
    alignDiscontinuities(lastFrag, details, switchDetails);
    if (!details.alignedSliding && switchDetails) {
      // If the PTS wasn't figured out via discontinuity sequence that means there was no CC increase within the level.
      // Aligning via Program Date Time should therefore be reliable, since PDT should be the same within the same
      // discontinuity sequence.
      alignMediaPlaylistByPDT(details, switchDetails);
    }
    if (!details.alignedSliding && switchDetails && !details.skippedSegments) {
      // Try to align on sn so that we pick a better start fragment.
      // Do not perform this on playlists with delta updates as this is only to align levels on switch
      // and adjustSliding only adjusts fragments after skippedSegments.
      adjustSliding(switchDetails, details);
    }
  }

  /**
   * Computes the PTS if a new level's fragments using the PTS of a fragment in the last level which shares the same
   * discontinuity sequence.
   * @param lastFrag - The last Fragment which shares the same discontinuity sequence
   * @param lastLevel - The details of the last loaded level
   * @param details - The details of the new level
   */
  function alignDiscontinuities(lastFrag, details, switchDetails) {
    if (shouldAlignOnDiscontinuities(lastFrag, switchDetails, details)) {
      var referenceFrag = findDiscontinuousReferenceFrag(switchDetails, details);
      if (referenceFrag && isFiniteNumber(referenceFrag.start)) {
        logger.log("Adjusting PTS using last level due to CC increase within current level " + details.url);
        adjustSlidingStart(referenceFrag.start, details);
      }
    }
  }

  /**
   * Ensures appropriate time-alignment between renditions based on PDT.
   * This function assumes the timelines represented in `refDetails` are accurate, including the PDTs
   * for the last discontinuity sequence number shared by both playlists when present,
   * and uses the "wallclock"/PDT timeline as a cross-reference to `details`, adjusting the presentation
   * times/timelines of `details` accordingly.
   * Given the asynchronous nature of fetches and initial loads of live `main` and audio/subtitle tracks,
   * the primary purpose of this function is to ensure the "local timelines" of audio/subtitle tracks
   * are aligned to the main/video timeline, using PDT as the cross-reference/"anchor" that should
   * be consistent across playlists, per the HLS spec.
   * @param details - The details of the rendition you'd like to time-align (e.g. an audio rendition).
   * @param refDetails - The details of the reference rendition with start and PDT times for alignment.
   */
  function alignMediaPlaylistByPDT(details, refDetails) {
    if (!details.hasProgramDateTime || !refDetails.hasProgramDateTime) {
      return;
    }
    var fragments = details.fragments;
    var refFragments = refDetails.fragments;
    if (!fragments.length || !refFragments.length) {
      return;
    }

    // Calculate a delta to apply to all fragments according to the delta in PDT times and start times
    // of a fragment in the reference details, and a fragment in the target details of the same discontinuity.
    // If a fragment of the same discontinuity was not found use the middle fragment of both.
    var refFrag;
    var frag;
    var targetCC = Math.min(refDetails.endCC, details.endCC);
    if (refDetails.startCC < targetCC && details.startCC < targetCC) {
      refFrag = findFirstFragWithCC(refFragments, targetCC);
      frag = findFirstFragWithCC(fragments, targetCC);
    }
    if (!refFrag || !frag) {
      refFrag = refFragments[Math.floor(refFragments.length / 2)];
      frag = findFirstFragWithCC(fragments, refFrag.cc) || fragments[Math.floor(fragments.length / 2)];
    }
    var refPDT = refFrag.programDateTime;
    var targetPDT = frag.programDateTime;
    if (!refPDT || !targetPDT) {
      return;
    }
    var delta = (targetPDT - refPDT) / 1000 - (frag.start - refFrag.start);
    adjustSlidingStart(delta, details);
  }

  var AESCrypto = /*#__PURE__*/function () {
    function AESCrypto(subtle, iv) {
      this.subtle = void 0;
      this.aesIV = void 0;
      this.subtle = subtle;
      this.aesIV = iv;
    }
    var _proto = AESCrypto.prototype;
    _proto.decrypt = function decrypt(data, key) {
      return this.subtle.decrypt({
        name: 'AES-CBC',
        iv: this.aesIV
      }, key, data);
    };
    return AESCrypto;
  }();

  var FastAESKey = /*#__PURE__*/function () {
    function FastAESKey(subtle, key) {
      this.subtle = void 0;
      this.key = void 0;
      this.subtle = subtle;
      this.key = key;
    }
    var _proto = FastAESKey.prototype;
    _proto.expandKey = function expandKey() {
      return this.subtle.importKey('raw', this.key, {
        name: 'AES-CBC'
      }, false, ['encrypt', 'decrypt']);
    };
    return FastAESKey;
  }();

  // PKCS7
  function removePadding(array) {
    var outputBytes = array.byteLength;
    var paddingBytes = outputBytes && new DataView(array.buffer).getUint8(outputBytes - 1);
    if (paddingBytes) {
      return sliceUint8(array, 0, outputBytes - paddingBytes);
    }
    return array;
  }
  var AESDecryptor = /*#__PURE__*/function () {
    function AESDecryptor() {
      this.rcon = [0x0, 0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
      this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
      this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
      this.sBox = new Uint32Array(256);
      this.invSBox = new Uint32Array(256);
      this.key = new Uint32Array(0);
      this.ksRows = 0;
      this.keySize = 0;
      this.keySchedule = void 0;
      this.invKeySchedule = void 0;
      this.initTable();
    }

    // Using view.getUint32() also swaps the byte order.
    var _proto = AESDecryptor.prototype;
    _proto.uint8ArrayToUint32Array_ = function uint8ArrayToUint32Array_(arrayBuffer) {
      var view = new DataView(arrayBuffer);
      var newArray = new Uint32Array(4);
      for (var i = 0; i < 4; i++) {
        newArray[i] = view.getUint32(i * 4);
      }
      return newArray;
    };
    _proto.initTable = function initTable() {
      var sBox = this.sBox;
      var invSBox = this.invSBox;
      var subMix = this.subMix;
      var subMix0 = subMix[0];
      var subMix1 = subMix[1];
      var subMix2 = subMix[2];
      var subMix3 = subMix[3];
      var invSubMix = this.invSubMix;
      var invSubMix0 = invSubMix[0];
      var invSubMix1 = invSubMix[1];
      var invSubMix2 = invSubMix[2];
      var invSubMix3 = invSubMix[3];
      var d = new Uint32Array(256);
      var x = 0;
      var xi = 0;
      var i = 0;
      for (i = 0; i < 256; i++) {
        if (i < 128) {
          d[i] = i << 1;
        } else {
          d[i] = i << 1 ^ 0x11b;
        }
      }
      for (i = 0; i < 256; i++) {
        var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
        sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
        sBox[x] = sx;
        invSBox[sx] = x;

        // Compute multiplication
        var x2 = d[x];
        var x4 = d[x2];
        var x8 = d[x4];

        // Compute sub/invSub bytes, mix columns tables
        var t = d[sx] * 0x101 ^ sx * 0x1010100;
        subMix0[x] = t << 24 | t >>> 8;
        subMix1[x] = t << 16 | t >>> 16;
        subMix2[x] = t << 8 | t >>> 24;
        subMix3[x] = t;

        // Compute inv sub bytes, inv mix columns tables
        t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
        invSubMix0[sx] = t << 24 | t >>> 8;
        invSubMix1[sx] = t << 16 | t >>> 16;
        invSubMix2[sx] = t << 8 | t >>> 24;
        invSubMix3[sx] = t;

        // Compute next counter
        if (!x) {
          x = xi = 1;
        } else {
          x = x2 ^ d[d[d[x8 ^ x2]]];
          xi ^= d[d[xi]];
        }
      }
    };
    _proto.expandKey = function expandKey(keyBuffer) {
      // convert keyBuffer to Uint32Array
      var key = this.uint8ArrayToUint32Array_(keyBuffer);
      var sameKey = true;
      var offset = 0;
      while (offset < key.length && sameKey) {
        sameKey = key[offset] === this.key[offset];
        offset++;
      }
      if (sameKey) {
        return;
      }
      this.key = key;
      var keySize = this.keySize = key.length;
      if (keySize !== 4 && keySize !== 6 && keySize !== 8) {
        throw new Error('Invalid aes key size=' + keySize);
      }
      var ksRows = this.ksRows = (keySize + 6 + 1) * 4;
      var ksRow;
      var invKsRow;
      var keySchedule = this.keySchedule = new Uint32Array(ksRows);
      var invKeySchedule = this.invKeySchedule = new Uint32Array(ksRows);
      var sbox = this.sBox;
      var rcon = this.rcon;
      var invSubMix = this.invSubMix;
      var invSubMix0 = invSubMix[0];
      var invSubMix1 = invSubMix[1];
      var invSubMix2 = invSubMix[2];
      var invSubMix3 = invSubMix[3];
      var prev;
      var t;
      for (ksRow = 0; ksRow < ksRows; ksRow++) {
        if (ksRow < keySize) {
          prev = keySchedule[ksRow] = key[ksRow];
          continue;
        }
        t = prev;
        if (ksRow % keySize === 0) {
          // Rot word
          t = t << 8 | t >>> 24;

          // Sub word
          t = sbox[t >>> 24] << 24 | sbox[t >>> 16 & 0xff] << 16 | sbox[t >>> 8 & 0xff] << 8 | sbox[t & 0xff];

          // Mix Rcon
          t ^= rcon[ksRow / keySize | 0] << 24;
        } else if (keySize > 6 && ksRow % keySize === 4) {
          // Sub word
          t = sbox[t >>> 24] << 24 | sbox[t >>> 16 & 0xff] << 16 | sbox[t >>> 8 & 0xff] << 8 | sbox[t & 0xff];
        }
        keySchedule[ksRow] = prev = (keySchedule[ksRow - keySize] ^ t) >>> 0;
      }
      for (invKsRow = 0; invKsRow < ksRows; invKsRow++) {
        ksRow = ksRows - invKsRow;
        if (invKsRow & 3) {
          t = keySchedule[ksRow];
        } else {
          t = keySchedule[ksRow - 4];
        }
        if (invKsRow < 4 || ksRow <= 4) {
          invKeySchedule[invKsRow] = t;
        } else {
          invKeySchedule[invKsRow] = invSubMix0[sbox[t >>> 24]] ^ invSubMix1[sbox[t >>> 16 & 0xff]] ^ invSubMix2[sbox[t >>> 8 & 0xff]] ^ invSubMix3[sbox[t & 0xff]];
        }
        invKeySchedule[invKsRow] = invKeySchedule[invKsRow] >>> 0;
      }
    }

    // Adding this as a method greatly improves performance.
    ;
    _proto.networkToHostOrderSwap = function networkToHostOrderSwap(word) {
      return word << 24 | (word & 0xff00) << 8 | (word & 0xff0000) >> 8 | word >>> 24;
    };
    _proto.decrypt = function decrypt(inputArrayBuffer, offset, aesIV) {
      var nRounds = this.keySize + 6;
      var invKeySchedule = this.invKeySchedule;
      var invSBOX = this.invSBox;
      var invSubMix = this.invSubMix;
      var invSubMix0 = invSubMix[0];
      var invSubMix1 = invSubMix[1];
      var invSubMix2 = invSubMix[2];
      var invSubMix3 = invSubMix[3];
      var initVector = this.uint8ArrayToUint32Array_(aesIV);
      var initVector0 = initVector[0];
      var initVector1 = initVector[1];
      var initVector2 = initVector[2];
      var initVector3 = initVector[3];
      var inputInt32 = new Int32Array(inputArrayBuffer);
      var outputInt32 = new Int32Array(inputInt32.length);
      var t0, t1, t2, t3;
      var s0, s1, s2, s3;
      var inputWords0, inputWords1, inputWords2, inputWords3;
      var ksRow, i;
      var swapWord = this.networkToHostOrderSwap;
      while (offset < inputInt32.length) {
        inputWords0 = swapWord(inputInt32[offset]);
        inputWords1 = swapWord(inputInt32[offset + 1]);
        inputWords2 = swapWord(inputInt32[offset + 2]);
        inputWords3 = swapWord(inputInt32[offset + 3]);
        s0 = inputWords0 ^ invKeySchedule[0];
        s1 = inputWords3 ^ invKeySchedule[1];
        s2 = inputWords2 ^ invKeySchedule[2];
        s3 = inputWords1 ^ invKeySchedule[3];
        ksRow = 4;

        // Iterate through the rounds of decryption
        for (i = 1; i < nRounds; i++) {
          t0 = invSubMix0[s0 >>> 24] ^ invSubMix1[s1 >> 16 & 0xff] ^ invSubMix2[s2 >> 8 & 0xff] ^ invSubMix3[s3 & 0xff] ^ invKeySchedule[ksRow];
          t1 = invSubMix0[s1 >>> 24] ^ invSubMix1[s2 >> 16 & 0xff] ^ invSubMix2[s3 >> 8 & 0xff] ^ invSubMix3[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
          t2 = invSubMix0[s2 >>> 24] ^ invSubMix1[s3 >> 16 & 0xff] ^ invSubMix2[s0 >> 8 & 0xff] ^ invSubMix3[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
          t3 = invSubMix0[s3 >>> 24] ^ invSubMix1[s0 >> 16 & 0xff] ^ invSubMix2[s1 >> 8 & 0xff] ^ invSubMix3[s2 & 0xff] ^ invKeySchedule[ksRow + 3];
          // Update state
          s0 = t0;
          s1 = t1;
          s2 = t2;
          s3 = t3;
          ksRow = ksRow + 4;
        }

        // Shift rows, sub bytes, add round key
        t0 = invSBOX[s0 >>> 24] << 24 ^ invSBOX[s1 >> 16 & 0xff] << 16 ^ invSBOX[s2 >> 8 & 0xff] << 8 ^ invSBOX[s3 & 0xff] ^ invKeySchedule[ksRow];
        t1 = invSBOX[s1 >>> 24] << 24 ^ invSBOX[s2 >> 16 & 0xff] << 16 ^ invSBOX[s3 >> 8 & 0xff] << 8 ^ invSBOX[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
        t2 = invSBOX[s2 >>> 24] << 24 ^ invSBOX[s3 >> 16 & 0xff] << 16 ^ invSBOX[s0 >> 8 & 0xff] << 8 ^ invSBOX[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
        t3 = invSBOX[s3 >>> 24] << 24 ^ invSBOX[s0 >> 16 & 0xff] << 16 ^ invSBOX[s1 >> 8 & 0xff] << 8 ^ invSBOX[s2 & 0xff] ^ invKeySchedule[ksRow + 3];

        // Write
        outputInt32[offset] = swapWord(t0 ^ initVector0);
        outputInt32[offset + 1] = swapWord(t3 ^ initVector1);
        outputInt32[offset + 2] = swapWord(t2 ^ initVector2);
        outputInt32[offset + 3] = swapWord(t1 ^ initVector3);

        // reset initVector to last 4 unsigned int
        initVector0 = inputWords0;
        initVector1 = inputWords1;
        initVector2 = inputWords2;
        initVector3 = inputWords3;
        offset = offset + 4;
      }
      return outputInt32.buffer;
    };
    return AESDecryptor;
  }();

  var CHUNK_SIZE = 16; // 16 bytes, 128 bits
  var Decrypter = /*#__PURE__*/function () {
    function Decrypter(config, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$removePKCS7Paddi = _ref.removePKCS7Padding,
        removePKCS7Padding = _ref$removePKCS7Paddi === void 0 ? true : _ref$removePKCS7Paddi;
      this.logEnabled = true;
      this.removePKCS7Padding = void 0;
      this.subtle = null;
      this.softwareDecrypter = null;
      this.key = null;
      this.fastAesKey = null;
      this.remainderData = null;
      this.currentIV = null;
      this.currentResult = null;
      this.useSoftware = void 0;
      this.useSoftware = config.enableSoftwareAES;
      this.removePKCS7Padding = removePKCS7Padding;
      // built in decryptor expects PKCS7 padding
      if (removePKCS7Padding) {
        try {
          var browserCrypto = self.crypto;
          if (browserCrypto) {
            this.subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
          }
        } catch (e) {
          /* no-op */
        }
      }
      if (this.subtle === null) {
        this.useSoftware = true;
      }
    }
    var _proto = Decrypter.prototype;
    _proto.destroy = function destroy() {
      this.subtle = null;
      this.softwareDecrypter = null;
      this.key = null;
      this.fastAesKey = null;
      this.remainderData = null;
      this.currentIV = null;
      this.currentResult = null;
    };
    _proto.isSync = function isSync() {
      return this.useSoftware;
    };
    _proto.flush = function flush() {
      var currentResult = this.currentResult,
        remainderData = this.remainderData;
      if (!currentResult || remainderData) {
        this.reset();
        return null;
      }
      var data = new Uint8Array(currentResult);
      this.reset();
      if (this.removePKCS7Padding) {
        return removePadding(data);
      }
      return data;
    };
    _proto.reset = function reset() {
      this.currentResult = null;
      this.currentIV = null;
      this.remainderData = null;
      if (this.softwareDecrypter) {
        this.softwareDecrypter = null;
      }
    };
    _proto.decrypt = function decrypt(data, key, iv) {
      var _this = this;
      if (this.useSoftware) {
        return new Promise(function (resolve, reject) {
          _this.softwareDecrypt(new Uint8Array(data), key, iv);
          var decryptResult = _this.flush();
          if (decryptResult) {
            resolve(decryptResult.buffer);
          } else {
            reject(new Error('[softwareDecrypt] Failed to decrypt data'));
          }
        });
      }
      return this.webCryptoDecrypt(new Uint8Array(data), key, iv);
    }

    // Software decryption is progressive. Progressive decryption may not return a result on each call. Any cached
    // data is handled in the flush() call
    ;
    _proto.softwareDecrypt = function softwareDecrypt(data, key, iv) {
      var currentIV = this.currentIV,
        currentResult = this.currentResult,
        remainderData = this.remainderData;
      this.logOnce('JS AES decrypt');
      // The output is staggered during progressive parsing - the current result is cached, and emitted on the next call
      // This is done in order to strip PKCS7 padding, which is found at the end of each segment. We only know we've reached
      // the end on flush(), but by that time we have already received all bytes for the segment.
      // Progressive decryption does not work with WebCrypto

      if (remainderData) {
        data = appendUint8Array(remainderData, data);
        this.remainderData = null;
      }

      // Byte length must be a multiple of 16 (AES-128 = 128 bit blocks = 16 bytes)
      var currentChunk = this.getValidChunk(data);
      if (!currentChunk.length) {
        return null;
      }
      if (currentIV) {
        iv = currentIV;
      }
      var softwareDecrypter = this.softwareDecrypter;
      if (!softwareDecrypter) {
        softwareDecrypter = this.softwareDecrypter = new AESDecryptor();
      }
      softwareDecrypter.expandKey(key);
      var result = currentResult;
      this.currentResult = softwareDecrypter.decrypt(currentChunk.buffer, 0, iv);
      this.currentIV = sliceUint8(currentChunk, -16).buffer;
      if (!result) {
        return null;
      }
      return result;
    };
    _proto.webCryptoDecrypt = function webCryptoDecrypt(data, key, iv) {
      var _this2 = this;
      var subtle = this.subtle;
      if (this.key !== key || !this.fastAesKey) {
        this.key = key;
        this.fastAesKey = new FastAESKey(subtle, key);
      }
      return this.fastAesKey.expandKey().then(function (aesKey) {
        // decrypt using web crypto
        if (!subtle) {
          return Promise.reject(new Error('web crypto not initialized'));
        }
        _this2.logOnce('WebCrypto AES decrypt');
        var crypto = new AESCrypto(subtle, new Uint8Array(iv));
        return crypto.decrypt(data.buffer, aesKey);
      }).catch(function (err) {
        logger.warn("[decrypter]: WebCrypto Error, disable WebCrypto API, " + err.name + ": " + err.message);
        return _this2.onWebCryptoError(data, key, iv);
      });
    };
    _proto.onWebCryptoError = function onWebCryptoError(data, key, iv) {
      this.useSoftware = true;
      this.logEnabled = true;
      this.softwareDecrypt(data, key, iv);
      var decryptResult = this.flush();
      if (decryptResult) {
        return decryptResult.buffer;
      }
      throw new Error('WebCrypto and softwareDecrypt: failed to decrypt data');
    };
    _proto.getValidChunk = function getValidChunk(data) {
      var currentChunk = data;
      var splitPoint = data.length - data.length % CHUNK_SIZE;
      if (splitPoint !== data.length) {
        currentChunk = sliceUint8(data, 0, splitPoint);
        this.remainderData = sliceUint8(data, splitPoint);
      }
      return currentChunk;
    };
    _proto.logOnce = function logOnce(msg) {
      if (!this.logEnabled) {
        return;
      }
      logger.log("[decrypter]: " + msg);
      this.logEnabled = false;
    };
    return Decrypter;
  }();

  /**
   *  TimeRanges to string helper
   */

  var TimeRanges = {
    toString: function toString(r) {
      var log = '';
      var len = r.length;
      for (var i = 0; i < len; i++) {
        log += "[" + r.start(i).toFixed(3) + "-" + r.end(i).toFixed(3) + "]";
      }
      return log;
    }
  };

  var State = {
    STOPPED: 'STOPPED',
    IDLE: 'IDLE',
    KEY_LOADING: 'KEY_LOADING',
    FRAG_LOADING: 'FRAG_LOADING',
    FRAG_LOADING_WAITING_RETRY: 'FRAG_LOADING_WAITING_RETRY',
    WAITING_TRACK: 'WAITING_TRACK',
    PARSING: 'PARSING',
    PARSED: 'PARSED',
    ENDED: 'ENDED',
    ERROR: 'ERROR',
    WAITING_INIT_PTS: 'WAITING_INIT_PTS',
    WAITING_LEVEL: 'WAITING_LEVEL'
  };
  var BaseStreamController = /*#__PURE__*/function (_TaskLoop) {
    _inheritsLoose(BaseStreamController, _TaskLoop);
    function BaseStreamController(hls, fragmentTracker, keyLoader, logPrefix, playlistType) {
      var _this;
      _this = _TaskLoop.call(this) || this;
      _this.hls = void 0;
      _this.fragPrevious = null;
      _this.fragCurrent = null;
      _this.fragmentTracker = void 0;
      _this.transmuxer = null;
      _this._state = State.STOPPED;
      _this.playlistType = void 0;
      _this.media = null;
      _this.mediaBuffer = null;
      _this.config = void 0;
      _this.bitrateTest = false;
      _this.lastCurrentTime = 0;
      _this.nextLoadPosition = 0;
      _this.startPosition = 0;
      _this.startTimeOffset = null;
      _this.loadedmetadata = false;
      _this.retryDate = 0;
      _this.levels = null;
      _this.fragmentLoader = void 0;
      _this.keyLoader = void 0;
      _this.levelLastLoaded = null;
      _this.startFragRequested = false;
      _this.decrypter = void 0;
      _this.initPTS = [];
      _this.onvseeking = null;
      _this.onvended = null;
      _this.logPrefix = '';
      _this.log = void 0;
      _this.warn = void 0;
      _this.playlistType = playlistType;
      _this.logPrefix = logPrefix;
      _this.log = logger.log.bind(logger, logPrefix + ":");
      _this.warn = logger.warn.bind(logger, logPrefix + ":");
      _this.hls = hls;
      _this.fragmentLoader = new FragmentLoader(hls.config);
      _this.keyLoader = keyLoader;
      _this.fragmentTracker = fragmentTracker;
      _this.config = hls.config;
      _this.decrypter = new Decrypter(hls.config);
      hls.on(Events.MANIFEST_LOADED, _this.onManifestLoaded, _assertThisInitialized(_this));
      return _this;
    }
    var _proto = BaseStreamController.prototype;
    _proto.doTick = function doTick() {
      this.onTickEnd();
    };
    _proto.onTickEnd = function onTickEnd() {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ;
    _proto.startLoad = function startLoad(startPosition) {};
    _proto.stopLoad = function stopLoad() {
      this.fragmentLoader.abort();
      this.keyLoader.abort(this.playlistType);
      var frag = this.fragCurrent;
      if (frag != null && frag.loader) {
        frag.abortRequests();
        this.fragmentTracker.removeFragment(frag);
      }
      this.resetTransmuxer();
      this.fragCurrent = null;
      this.fragPrevious = null;
      this.clearInterval();
      this.clearNextTick();
      this.state = State.STOPPED;
    };
    _proto._streamEnded = function _streamEnded(bufferInfo, levelDetails) {
      // If playlist is live, there is another buffered range after the current range, nothing buffered, media is detached,
      // of nothing loading/loaded return false
      if (levelDetails.live || bufferInfo.nextStart || !bufferInfo.end || !this.media) {
        return false;
      }
      var partList = levelDetails.partList;
      // Since the last part isn't guaranteed to correspond to the last playlist segment for Low-Latency HLS,
      // check instead if the last part is buffered.
      if (partList != null && partList.length) {
        var lastPart = partList[partList.length - 1];

        // Checking the midpoint of the part for potential margin of error and related issues.
        // NOTE: Technically I believe parts could yield content that is < the computed duration (including potential a duration of 0)
        // and still be spec-compliant, so there may still be edge cases here. Likewise, there could be issues in end of stream
        // part mismatches for independent audio and video playlists/segments.
        var lastPartBuffered = BufferHelper.isBuffered(this.media, lastPart.start + lastPart.duration / 2);
        return lastPartBuffered;
      }
      var playlistType = levelDetails.fragments[levelDetails.fragments.length - 1].type;
      return this.fragmentTracker.isEndListAppended(playlistType);
    };
    _proto.getLevelDetails = function getLevelDetails() {
      if (this.levels && this.levelLastLoaded !== null) {
        var _this$levelLastLoaded;
        return (_this$levelLastLoaded = this.levelLastLoaded) == null ? void 0 : _this$levelLastLoaded.details;
      }
    };
    _proto.onMediaAttached = function onMediaAttached(event, data) {
      var media = this.media = this.mediaBuffer = data.media;
      this.onvseeking = this.onMediaSeeking.bind(this);
      this.onvended = this.onMediaEnded.bind(this);
      media.addEventListener('seeking', this.onvseeking);
      media.addEventListener('ended', this.onvended);
      var config = this.config;
      if (this.levels && config.autoStartLoad && this.state === State.STOPPED) {
        this.startLoad(config.startPosition);
      }
    };
    _proto.onMediaDetaching = function onMediaDetaching() {
      var media = this.media;
      if (media != null && media.ended) {
        this.log('MSE detaching and video ended, reset startPosition');
        this.startPosition = this.lastCurrentTime = 0;
      }

      // remove video listeners
      if (media && this.onvseeking && this.onvended) {
        media.removeEventListener('seeking', this.onvseeking);
        media.removeEventListener('ended', this.onvended);
        this.onvseeking = this.onvended = null;
      }
      if (this.keyLoader) {
        this.keyLoader.detach();
      }
      this.media = this.mediaBuffer = null;
      this.loadedmetadata = false;
      this.fragmentTracker.removeAllFragments();
      this.stopLoad();
    };
    _proto.onMediaSeeking = function onMediaSeeking() {
      var config = this.config,
        fragCurrent = this.fragCurrent,
        media = this.media,
        mediaBuffer = this.mediaBuffer,
        state = this.state;
      var currentTime = media ? media.currentTime : 0;
      var bufferInfo = BufferHelper.bufferInfo(mediaBuffer ? mediaBuffer : media, currentTime, config.maxBufferHole);
      this.log("media seeking to " + (isFiniteNumber(currentTime) ? currentTime.toFixed(3) : currentTime) + ", state: " + state);
      if (this.state === State.ENDED) {
        this.resetLoadingState();
      } else if (fragCurrent) {
        // Seeking while frag load is in progress
        var tolerance = config.maxFragLookUpTolerance;
        var fragStartOffset = fragCurrent.start - tolerance;
        var fragEndOffset = fragCurrent.start + fragCurrent.duration + tolerance;
        // if seeking out of buffered range or into new one
        if (!bufferInfo.len || fragEndOffset < bufferInfo.start || fragStartOffset > bufferInfo.end) {
          var pastFragment = currentTime > fragEndOffset;
          // if the seek position is outside the current fragment range
          if (currentTime < fragStartOffset || pastFragment) {
            if (pastFragment && fragCurrent.loader) {
              this.log('seeking outside of buffer while fragment load in progress, cancel fragment load');
              fragCurrent.abortRequests();
              this.resetLoadingState();
            }
            this.fragPrevious = null;
          }
        }
      }
      if (media) {
        // Remove gap fragments
        this.fragmentTracker.removeFragmentsInRange(currentTime, Infinity, this.playlistType, true);
        this.lastCurrentTime = currentTime;
      }

      // in case seeking occurs although no media buffered, adjust startPosition and nextLoadPosition to seek target
      if (!this.loadedmetadata && !bufferInfo.len) {
        this.nextLoadPosition = this.startPosition = currentTime;
      }

      // Async tick to speed up processing
      this.tickImmediate();
    };
    _proto.onMediaEnded = function onMediaEnded() {
      // reset startPosition and lastCurrentTime to restart playback @ stream beginning
      this.startPosition = this.lastCurrentTime = 0;
    };
    _proto.onManifestLoaded = function onManifestLoaded(event, data) {
      this.startTimeOffset = data.startTimeOffset;
      this.initPTS = [];
    };
    _proto.onHandlerDestroying = function onHandlerDestroying() {
      this.hls.off(Events.MANIFEST_LOADED, this.onManifestLoaded, this);
      this.stopLoad();
      _TaskLoop.prototype.onHandlerDestroying.call(this);
      // @ts-ignore
      this.hls = null;
    };
    _proto.onHandlerDestroyed = function onHandlerDestroyed() {
      this.state = State.STOPPED;
      if (this.fragmentLoader) {
        this.fragmentLoader.destroy();
      }
      if (this.keyLoader) {
        this.keyLoader.destroy();
      }
      if (this.decrypter) {
        this.decrypter.destroy();
      }
      this.hls = this.log = this.warn = this.decrypter = this.keyLoader = this.fragmentLoader = this.fragmentTracker = null;
      _TaskLoop.prototype.onHandlerDestroyed.call(this);
    };
    _proto.loadFragment = function loadFragment(frag, level, targetBufferTime) {
      this._loadFragForPlayback(frag, level, targetBufferTime);
    };
    _proto._loadFragForPlayback = function _loadFragForPlayback(frag, level, targetBufferTime) {
      var _this2 = this;
      var progressCallback = function progressCallback(data) {
        if (_this2.fragContextChanged(frag)) {
          _this2.warn("Fragment " + frag.sn + (data.part ? ' p: ' + data.part.index : '') + " of level " + frag.level + " was dropped during download.");
          _this2.fragmentTracker.removeFragment(frag);
          return;
        }
        frag.stats.chunkCount++;
        _this2._handleFragmentLoadProgress(data);
      };
      this._doFragLoad(frag, level, targetBufferTime, progressCallback).then(function (data) {
        if (!data) {
          // if we're here we probably needed to backtrack or are waiting for more parts
          return;
        }
        var state = _this2.state;
        if (_this2.fragContextChanged(frag)) {
          if (state === State.FRAG_LOADING || !_this2.fragCurrent && state === State.PARSING) {
            _this2.fragmentTracker.removeFragment(frag);
            _this2.state = State.IDLE;
          }
          return;
        }
        if ('payload' in data) {
          _this2.log("Loaded fragment " + frag.sn + " of level " + frag.level);
          _this2.hls.trigger(Events.FRAG_LOADED, data);
        }

        // Pass through the whole payload; controllers not implementing progressive loading receive data from this callback
        _this2._handleFragmentLoadComplete(data);
      }).catch(function (reason) {
        if (_this2.state === State.STOPPED || _this2.state === State.ERROR) {
          return;
        }
        _this2.warn(reason);
        _this2.resetFragmentLoading(frag);
      });
    };
    _proto.clearTrackerIfNeeded = function clearTrackerIfNeeded(frag) {
      var _this$mediaBuffer;
      var fragmentTracker = this.fragmentTracker;
      var fragState = fragmentTracker.getState(frag);
      if (fragState === FragmentState.APPENDING) {
        // Lower the buffer size and try again
        var playlistType = frag.type;
        var bufferedInfo = this.getFwdBufferInfo(this.mediaBuffer, playlistType);
        var minForwardBufferLength = Math.max(frag.duration, bufferedInfo ? bufferedInfo.len : this.config.maxBufferLength);
        if (this.reduceMaxBufferLength(minForwardBufferLength)) {
          fragmentTracker.removeFragment(frag);
        }
      } else if (((_this$mediaBuffer = this.mediaBuffer) == null ? void 0 : _this$mediaBuffer.buffered.length) === 0) {
        // Stop gap for bad tracker / buffer flush behavior
        fragmentTracker.removeAllFragments();
      } else if (fragmentTracker.hasParts(frag.type)) {
        // In low latency mode, remove fragments for which only some parts were buffered
        fragmentTracker.detectPartialFragments({
          frag: frag,
          part: null,
          stats: frag.stats,
          id: frag.type
        });
        if (fragmentTracker.getState(frag) === FragmentState.PARTIAL) {
          fragmentTracker.removeFragment(frag);
        }
      }
    };
    _proto.checkLiveUpdate = function checkLiveUpdate(details) {
      if (details.updated && !details.live) {
        // Live stream ended, update fragment tracker
        var lastFragment = details.fragments[details.fragments.length - 1];
        this.fragmentTracker.detectPartialFragments({
          frag: lastFragment,
          part: null,
          stats: lastFragment.stats,
          id: lastFragment.type
        });
      }
      if (!details.fragments[0]) {
        details.deltaUpdateFailed = true;
      }
    };
    _proto.flushMainBuffer = function flushMainBuffer(startOffset, endOffset, type) {
      if (type === void 0) {
        type = null;
      }
      if (!(startOffset - endOffset)) {
        return;
      }
      // When alternate audio is playing, the audio-stream-controller is responsible for the audio buffer. Otherwise,
      // passing a null type flushes both buffers
      var flushScope = {
        startOffset: startOffset,
        endOffset: endOffset,
        type: type
      };
      this.hls.trigger(Events.BUFFER_FLUSHING, flushScope);
    };
    _proto._loadInitSegment = function _loadInitSegment(frag, level) {
      var _this3 = this;
      this._doFragLoad(frag, level).then(function (data) {
        if (!data || _this3.fragContextChanged(frag) || !_this3.levels) {
          throw new Error('init load aborted');
        }
        return data;
      }).then(function (data) {
        var hls = _this3.hls;
        var payload = data.payload;
        var decryptData = frag.decryptdata;

        // check to see if the payload needs to be decrypted
        if (payload && payload.byteLength > 0 && decryptData != null && decryptData.key && decryptData.iv && decryptData.method === 'AES-128') {
          var startTime = self.performance.now();
          // decrypt init segment data
          return _this3.decrypter.decrypt(new Uint8Array(payload), decryptData.key.buffer, decryptData.iv.buffer).catch(function (err) {
            hls.trigger(Events.ERROR, {
              type: ErrorTypes.MEDIA_ERROR,
              details: ErrorDetails.FRAG_DECRYPT_ERROR,
              fatal: false,
              error: err,
              reason: err.message,
              frag: frag
            });
            throw err;
          }).then(function (decryptedData) {
            var endTime = self.performance.now();
            hls.trigger(Events.FRAG_DECRYPTED, {
              frag: frag,
              payload: decryptedData,
              stats: {
                tstart: startTime,
                tdecrypt: endTime
              }
            });
            data.payload = decryptedData;
            return _this3.completeInitSegmentLoad(data);
          });
        }
        return _this3.completeInitSegmentLoad(data);
      }).catch(function (reason) {
        if (_this3.state === State.STOPPED || _this3.state === State.ERROR) {
          return;
        }
        _this3.warn(reason);
        _this3.resetFragmentLoading(frag);
      });
    };
    _proto.completeInitSegmentLoad = function completeInitSegmentLoad(data) {
      var levels = this.levels;
      if (!levels) {
        throw new Error('init load aborted, missing levels');
      }
      var stats = data.frag.stats;
      this.state = State.IDLE;
      data.frag.data = new Uint8Array(data.payload);
      stats.parsing.start = stats.buffering.start = self.performance.now();
      stats.parsing.end = stats.buffering.end = self.performance.now();
      this.tick();
    };
    _proto.fragContextChanged = function fragContextChanged(frag) {
      var fragCurrent = this.fragCurrent;
      return !frag || !fragCurrent || frag.sn !== fragCurrent.sn || frag.level !== fragCurrent.level;
    };
    _proto.fragBufferedComplete = function fragBufferedComplete(frag, part) {
      var _frag$startPTS, _frag$endPTS, _this$fragCurrent, _this$fragPrevious;
      var media = this.mediaBuffer ? this.mediaBuffer : this.media;
      this.log("Buffered " + frag.type + " sn: " + frag.sn + (part ? ' part: ' + part.index : '') + " of " + (this.playlistType === PlaylistLevelType.MAIN ? 'level' : 'track') + " " + frag.level + " (frag:[" + ((_frag$startPTS = frag.startPTS) != null ? _frag$startPTS : NaN).toFixed(3) + "-" + ((_frag$endPTS = frag.endPTS) != null ? _frag$endPTS : NaN).toFixed(3) + "] > buffer:" + (media ? TimeRanges.toString(BufferHelper.getBuffered(media)) : '(detached)') + ")");
      if (frag.sn !== 'initSegment') {
        var _this$levels;
        if (frag.type !== PlaylistLevelType.SUBTITLE) {
          var el = frag.elementaryStreams;
          if (!Object.keys(el).some(function (type) {
            return !!el[type];
          })) {
            // empty segment
            this.state = State.IDLE;
            return;
          }
        }
        var level = (_this$levels = this.levels) == null ? void 0 : _this$levels[frag.level];
        if (level != null && level.fragmentError) {
          this.log("Resetting level fragment error count of " + level.fragmentError + " on frag buffered");
          level.fragmentError = 0;
        }
      }
      this.state = State.IDLE;
      if (!media) {
        return;
      }
      if (!this.loadedmetadata && frag.type == PlaylistLevelType.MAIN && media.buffered.length && ((_this$fragCurrent = this.fragCurrent) == null ? void 0 : _this$fragCurrent.sn) === ((_this$fragPrevious = this.fragPrevious) == null ? void 0 : _this$fragPrevious.sn)) {
        this.loadedmetadata = true;
        this.seekToStartPos();
      }
      this.tick();
    };
    _proto.seekToStartPos = function seekToStartPos() {};
    _proto._handleFragmentLoadComplete = function _handleFragmentLoadComplete(fragLoadedEndData) {
      var transmuxer = this.transmuxer;
      if (!transmuxer) {
        return;
      }
      var frag = fragLoadedEndData.frag,
        part = fragLoadedEndData.part,
        partsLoaded = fragLoadedEndData.partsLoaded;
      // If we did not load parts, or loaded all parts, we have complete (not partial) fragment data
      var complete = !partsLoaded || partsLoaded.length === 0 || partsLoaded.some(function (fragLoaded) {
        return !fragLoaded;
      });
      var chunkMeta = new ChunkMetadata(frag.level, frag.sn, frag.stats.chunkCount + 1, 0, part ? part.index : -1, !complete);
      transmuxer.flush(chunkMeta);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ;
    _proto._handleFragmentLoadProgress = function _handleFragmentLoadProgress(frag) {};
    _proto._doFragLoad = function _doFragLoad(frag, level, targetBufferTime, progressCallback) {
      var _frag$decryptdata,
        _this4 = this;
      if (targetBufferTime === void 0) {
        targetBufferTime = null;
      }
      var details = level == null ? void 0 : level.details;
      if (!this.levels || !details) {
        throw new Error("frag load aborted, missing level" + (details ? '' : ' detail') + "s");
      }
      var keyLoadingPromise = null;
      if (frag.encrypted && !((_frag$decryptdata = frag.decryptdata) != null && _frag$decryptdata.key)) {
        this.log("Loading key for " + frag.sn + " of [" + details.startSN + "-" + details.endSN + "], " + (this.logPrefix === '[stream-controller]' ? 'level' : 'track') + " " + frag.level);
        this.state = State.KEY_LOADING;
        this.fragCurrent = frag;
        keyLoadingPromise = this.keyLoader.load(frag).then(function (keyLoadedData) {
          if (!_this4.fragContextChanged(keyLoadedData.frag)) {
            _this4.hls.trigger(Events.KEY_LOADED, keyLoadedData);
            if (_this4.state === State.KEY_LOADING) {
              _this4.state = State.IDLE;
            }
            return keyLoadedData;
          }
        });
        this.hls.trigger(Events.KEY_LOADING, {
          frag: frag
        });
        if (this.fragCurrent === null) {
          keyLoadingPromise = Promise.reject(new Error("frag load aborted, context changed in KEY_LOADING"));
        }
      } else if (!frag.encrypted && details.encryptedFragments.length) {
        this.keyLoader.loadClear(frag, details.encryptedFragments);
      }
      targetBufferTime = Math.max(frag.start, targetBufferTime || 0);
      if (this.config.lowLatencyMode && frag.sn !== 'initSegment') {
        var partList = details.partList;
        if (partList && progressCallback) {
          if (targetBufferTime > frag.end && details.fragmentHint) {
            frag = details.fragmentHint;
          }
          var partIndex = this.getNextPart(partList, frag, targetBufferTime);
          if (partIndex > -1) {
            var part = partList[partIndex];
            this.log("Loading part sn: " + frag.sn + " p: " + part.index + " cc: " + frag.cc + " of playlist [" + details.startSN + "-" + details.endSN + "] parts [0-" + partIndex + "-" + (partList.length - 1) + "] " + (this.logPrefix === '[stream-controller]' ? 'level' : 'track') + ": " + frag.level + ", target: " + parseFloat(targetBufferTime.toFixed(3)));
            this.nextLoadPosition = part.start + part.duration;
            this.state = State.FRAG_LOADING;
            var _result;
            if (keyLoadingPromise) {
              _result = keyLoadingPromise.then(function (keyLoadedData) {
                if (!keyLoadedData || _this4.fragContextChanged(keyLoadedData.frag)) {
                  return null;
                }
                return _this4.doFragPartsLoad(frag, part, level, progressCallback);
              }).catch(function (error) {
                return _this4.handleFragLoadError(error);
              });
            } else {
              _result = this.doFragPartsLoad(frag, part, level, progressCallback).catch(function (error) {
                return _this4.handleFragLoadError(error);
              });
            }
            this.hls.trigger(Events.FRAG_LOADING, {
              frag: frag,
              part: part,
              targetBufferTime: targetBufferTime
            });
            if (this.fragCurrent === null) {
              return Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING parts"));
            }
            return _result;
          } else if (!frag.url || this.loadedEndOfParts(partList, targetBufferTime)) {
            // Fragment hint has no parts
            return Promise.resolve(null);
          }
        }
      }
      this.log("Loading fragment " + frag.sn + " cc: " + frag.cc + " " + (details ? 'of [' + details.startSN + '-' + details.endSN + '] ' : '') + (this.logPrefix === '[stream-controller]' ? 'level' : 'track') + ": " + frag.level + ", target: " + parseFloat(targetBufferTime.toFixed(3)));
      // Don't update nextLoadPosition for fragments which are not buffered
      if (isFiniteNumber(frag.sn) && !this.bitrateTest) {
        this.nextLoadPosition = frag.start + frag.duration;
      }
      this.state = State.FRAG_LOADING;

      // Load key before streaming fragment data
      var dataOnProgress = this.config.progressive;
      var result;
      if (dataOnProgress && keyLoadingPromise) {
        result = keyLoadingPromise.then(function (keyLoadedData) {
          if (!keyLoadedData || _this4.fragContextChanged(keyLoadedData == null ? void 0 : keyLoadedData.frag)) {
            return null;
          }
          return _this4.fragmentLoader.load(frag, progressCallback);
        }).catch(function (error) {
          return _this4.handleFragLoadError(error);
        });
      } else {
        // load unencrypted fragment data with progress event,
        // or handle fragment result after key and fragment are finished loading
        result = Promise.all([this.fragmentLoader.load(frag, dataOnProgress ? progressCallback : undefined), keyLoadingPromise]).then(function (_ref) {
          var fragLoadedData = _ref[0];
          if (!dataOnProgress && fragLoadedData && progressCallback) {
            progressCallback(fragLoadedData);
          }
          return fragLoadedData;
        }).catch(function (error) {
          return _this4.handleFragLoadError(error);
        });
      }
      this.hls.trigger(Events.FRAG_LOADING, {
        frag: frag,
        targetBufferTime: targetBufferTime
      });
      if (this.fragCurrent === null) {
        return Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING"));
      }
      return result;
    };
    _proto.doFragPartsLoad = function doFragPartsLoad(frag, fromPart, level, progressCallback) {
      var _this5 = this;
      return new Promise(function (resolve, reject) {
        var _level$details;
        var partsLoaded = [];
        var initialPartList = (_level$details = level.details) == null ? void 0 : _level$details.partList;
        var loadPart = function loadPart(part) {
          _this5.fragmentLoader.loadPart(frag, part, progressCallback).then(function (partLoadedData) {
            partsLoaded[part.index] = partLoadedData;
            var loadedPart = partLoadedData.part;
            _this5.hls.trigger(Events.FRAG_LOADED, partLoadedData);
            var nextPart = getPartWith(level, frag.sn, part.index + 1) || findPart(initialPartList, frag.sn, part.index + 1);
            if (nextPart) {
              loadPart(nextPart);
            } else {
              return resolve({
                frag: frag,
                part: loadedPart,
                partsLoaded: partsLoaded
              });
            }
          }).catch(reject);
        };
        loadPart(fromPart);
      });
    };
    _proto.handleFragLoadError = function handleFragLoadError(error) {
      if ('data' in error) {
        var data = error.data;
        if (error.data && data.details === ErrorDetails.INTERNAL_ABORTED) {
          this.handleFragLoadAborted(data.frag, data.part);
        } else {
          this.hls.trigger(Events.ERROR, data);
        }
      } else {
        this.hls.trigger(Events.ERROR, {
          type: ErrorTypes.OTHER_ERROR,
          details: ErrorDetails.INTERNAL_EXCEPTION,
          err: error,
          error: error,
          fatal: true
        });
      }
      return null;
    };
    _proto._handleTransmuxerFlush = function _handleTransmuxerFlush(chunkMeta) {
      var context = this.getCurrentContext(chunkMeta);
      if (!context || this.state !== State.PARSING) {
        if (!this.fragCurrent && this.state !== State.STOPPED && this.state !== State.ERROR) {
          this.state = State.IDLE;
        }
        return;
      }
      var frag = context.frag,
        part = context.part,
        level = context.level;
      var now = self.performance.now();
      frag.stats.parsing.end = now;
      if (part) {
        part.stats.parsing.end = now;
      }
      this.updateLevelTiming(frag, part, level, chunkMeta.partial);
    };
    _proto.getCurrentContext = function getCurrentContext(chunkMeta) {
      var levels = this.levels,
        fragCurrent = this.fragCurrent;
      var levelIndex = chunkMeta.level,
        sn = chunkMeta.sn,
        partIndex = chunkMeta.part;
      if (!(levels != null && levels[levelIndex])) {
        this.warn("Levels object was unset while buffering fragment " + sn + " of level " + levelIndex + ". The current chunk will not be buffered.");
        return null;
      }
      var level = levels[levelIndex];
      var part = partIndex > -1 ? getPartWith(level, sn, partIndex) : null;
      var frag = part ? part.fragment : getFragmentWithSN(level, sn, fragCurrent);
      if (!frag) {
        return null;
      }
      if (fragCurrent && fragCurrent !== frag) {
        frag.stats = fragCurrent.stats;
      }
      return {
        frag: frag,
        part: part,
        level: level
      };
    };
    _proto.bufferFragmentData = function bufferFragmentData(data, frag, part, chunkMeta, noBacktracking) {
      var _buffer;
      if (!data || this.state !== State.PARSING) {
        return;
      }
      var data1 = data.data1,
        data2 = data.data2;
      var buffer = data1;
      if (data1 && data2) {
        // Combine the moof + mdat so that we buffer with a single append
        buffer = appendUint8Array(data1, data2);
      }
      if (!((_buffer = buffer) != null && _buffer.length)) {
        return;
      }
      var segment = {
        type: data.type,
        frag: frag,
        part: part,
        chunkMeta: chunkMeta,
        parent: frag.type,
        data: buffer
      };
      this.hls.trigger(Events.BUFFER_APPENDING, segment);
      if (data.dropped && data.independent && !part) {
        if (noBacktracking) {
          return;
        }
        // Clear buffer so that we reload previous segments sequentially if required
        this.flushBufferGap(frag);
      }
    };
    _proto.flushBufferGap = function flushBufferGap(frag) {
      var media = this.media;
      if (!media) {
        return;
      }
      // If currentTime is not buffered, clear the back buffer so that we can backtrack as much as needed
      if (!BufferHelper.isBuffered(media, media.currentTime)) {
        this.flushMainBuffer(0, frag.start);
        return;
      }
      // Remove back-buffer without interrupting playback to allow back tracking
      var currentTime = media.currentTime;
      var bufferInfo = BufferHelper.bufferInfo(media, currentTime, 0);
      var fragDuration = frag.duration;
      var segmentFraction = Math.min(this.config.maxFragLookUpTolerance * 2, fragDuration * 0.25);
      var start = Math.max(Math.min(frag.start - segmentFraction, bufferInfo.end - segmentFraction), currentTime + segmentFraction);
      if (frag.start - start > segmentFraction) {
        this.flushMainBuffer(start, frag.start);
      }
    };
    _proto.getFwdBufferInfo = function getFwdBufferInfo(bufferable, type) {
      var pos = this.getLoadPosition();
      if (!isFiniteNumber(pos)) {
        return null;
      }
      return this.getFwdBufferInfoAtPos(bufferable, pos, type);
    };
    _proto.getFwdBufferInfoAtPos = function getFwdBufferInfoAtPos(bufferable, pos, type) {
      var maxBufferHole = this.config.maxBufferHole;
      var bufferInfo = BufferHelper.bufferInfo(bufferable, pos, maxBufferHole);
      // Workaround flaw in getting forward buffer when maxBufferHole is smaller than gap at current pos
      if (bufferInfo.len === 0 && bufferInfo.nextStart !== undefined) {
        var bufferedFragAtPos = this.fragmentTracker.getBufferedFrag(pos, type);
        if (bufferedFragAtPos && bufferInfo.nextStart < bufferedFragAtPos.end) {
          return BufferHelper.bufferInfo(bufferable, pos, Math.max(bufferInfo.nextStart, maxBufferHole));
        }
      }
      return bufferInfo;
    };
    _proto.getMaxBufferLength = function getMaxBufferLength(levelBitrate) {
      var config = this.config;
      var maxBufLen;
      if (levelBitrate) {
        maxBufLen = Math.max(8 * config.maxBufferSize / levelBitrate, config.maxBufferLength);
      } else {
        maxBufLen = config.maxBufferLength;
      }
      return Math.min(maxBufLen, config.maxMaxBufferLength);
    };
    _proto.reduceMaxBufferLength = function reduceMaxBufferLength(threshold) {
      var config = this.config;
      var minLength = threshold || config.maxBufferLength;
      if (config.maxMaxBufferLength >= minLength) {
        // reduce max buffer length as it might be too high. we do this to avoid loop flushing ...
        config.maxMaxBufferLength /= 2;
        this.warn("Reduce max buffer length to " + config.maxMaxBufferLength + "s");
        return true;
      }
      return false;
    };
    _proto.getAppendedFrag = function getAppendedFrag(position, playlistType) {
      var fragOrPart = this.fragmentTracker.getAppendedFrag(position, PlaylistLevelType.MAIN);
      if (fragOrPart && 'fragment' in fragOrPart) {
        return fragOrPart.fragment;
      }
      return fragOrPart;
    };
    _proto.getNextFragment = function getNextFragment(pos, levelDetails) {
      var fragments = levelDetails.fragments;
      var fragLen = fragments.length;
      if (!fragLen) {
        return null;
      }

      // find fragment index, contiguous with end of buffer position
      var config = this.config;
      var start = fragments[0].start;
      var frag;
      if (levelDetails.live) {
        var initialLiveManifestSize = config.initialLiveManifestSize;
        if (fragLen < initialLiveManifestSize) {
          this.warn("Not enough fragments to start playback (have: " + fragLen + ", need: " + initialLiveManifestSize + ")");
          return null;
        }
        // The real fragment start times for a live stream are only known after the PTS range for that level is known.
        // In order to discover the range, we load the best matching fragment for that level and demux it.
        // Do not load using live logic if the starting frag is requested - we want to use getFragmentAtPosition() so that
        // we get the fragment matching that start time
        if (!levelDetails.PTSKnown && !this.startFragRequested && this.startPosition === -1 || pos < start) {
          frag = this.getInitialLiveFragment(levelDetails, fragments);
          this.startPosition = this.nextLoadPosition = frag ? this.hls.liveSyncPosition || frag.start : pos;
        }
      } else if (pos <= start) {
        // VoD playlist: if loadPosition before start of playlist, load first fragment
        frag = fragments[0];
      }

      // If we haven't run into any special cases already, just load the fragment most closely matching the requested position
      if (!frag) {
        var end = config.lowLatencyMode ? levelDetails.partEnd : levelDetails.fragmentEnd;
        frag = this.getFragmentAtPosition(pos, end, levelDetails);
      }
      return this.mapToInitFragWhenRequired(frag);
    };
    _proto.isLoopLoading = function isLoopLoading(frag, targetBufferTime) {
      var trackerState = this.fragmentTracker.getState(frag);
      return (trackerState === FragmentState.OK || trackerState === FragmentState.PARTIAL && !!frag.gap) && this.nextLoadPosition > targetBufferTime;
    };
    _proto.getNextFragmentLoopLoading = function getNextFragmentLoopLoading(frag, levelDetails, bufferInfo, playlistType, maxBufLen) {
      var gapStart = frag.gap;
      var nextFragment = this.getNextFragment(this.nextLoadPosition, levelDetails);
      if (nextFragment === null) {
        return nextFragment;
      }
      frag = nextFragment;
      if (gapStart && frag && !frag.gap && bufferInfo.nextStart) {
        // Media buffered after GAP tags should not make the next buffer timerange exceed forward buffer length
        var nextbufferInfo = this.getFwdBufferInfoAtPos(this.mediaBuffer ? this.mediaBuffer : this.media, bufferInfo.nextStart, playlistType);
        if (nextbufferInfo !== null && bufferInfo.len + nextbufferInfo.len >= maxBufLen) {
          // Returning here might result in not finding an audio and video candiate to skip to
          this.log("buffer full after gaps in \"" + playlistType + "\" playlist starting at sn: " + frag.sn);
          return null;
        }
      }
      return frag;
    };
    _proto.mapToInitFragWhenRequired = function mapToInitFragWhenRequired(frag) {
      // If an initSegment is present, it must be buffered first
      if (frag != null && frag.initSegment && !(frag != null && frag.initSegment.data) && !this.bitrateTest) {
        return frag.initSegment;
      }
      return frag;
    };
    _proto.getNextPart = function getNextPart(partList, frag, targetBufferTime) {
      var nextPart = -1;
      var contiguous = false;
      var independentAttrOmitted = true;
      for (var i = 0, len = partList.length; i < len; i++) {
        var part = partList[i];
        independentAttrOmitted = independentAttrOmitted && !part.independent;
        if (nextPart > -1 && targetBufferTime < part.start) {
          break;
        }
        var loaded = part.loaded;
        if (loaded) {
          nextPart = -1;
        } else if ((contiguous || part.independent || independentAttrOmitted) && part.fragment === frag) {
          nextPart = i;
        }
        contiguous = loaded;
      }
      return nextPart;
    };
    _proto.loadedEndOfParts = function loadedEndOfParts(partList, targetBufferTime) {
      var lastPart = partList[partList.length - 1];
      return lastPart && targetBufferTime > lastPart.start && lastPart.loaded;
    }

    /*
     This method is used find the best matching first fragment for a live playlist. This fragment is used to calculate the
     "sliding" of the playlist, which is its offset from the start of playback. After sliding we can compute the real
     start and end times for each fragment in the playlist (after which this method will not need to be called).
    */;
    _proto.getInitialLiveFragment = function getInitialLiveFragment(levelDetails, fragments) {
      var fragPrevious = this.fragPrevious;
      var frag = null;
      if (fragPrevious) {
        if (levelDetails.hasProgramDateTime) {
          // Prefer using PDT, because it can be accurate enough to choose the correct fragment without knowing the level sliding
          this.log("Live playlist, switching playlist, load frag with same PDT: " + fragPrevious.programDateTime);
          frag = findFragmentByPDT(fragments, fragPrevious.endProgramDateTime, this.config.maxFragLookUpTolerance);
        }
        if (!frag) {
          // SN does not need to be accurate between renditions, but depending on the packaging it may be so.
          var targetSN = fragPrevious.sn + 1;
          if (targetSN >= levelDetails.startSN && targetSN <= levelDetails.endSN) {
            var fragNext = fragments[targetSN - levelDetails.startSN];
            // Ensure that we're staying within the continuity range, since PTS resets upon a new range
            if (fragPrevious.cc === fragNext.cc) {
              frag = fragNext;
              this.log("Live playlist, switching playlist, load frag with next SN: " + frag.sn);
            }
          }
          // It's important to stay within the continuity range if available; otherwise the fragments in the playlist
          // will have the wrong start times
          if (!frag) {
            frag = findFragWithCC(fragments, fragPrevious.cc);
            if (frag) {
              this.log("Live playlist, switching playlist, load frag with same CC: " + frag.sn);
            }
          }
        }
      } else {
        // Find a new start fragment when fragPrevious is null
        var liveStart = this.hls.liveSyncPosition;
        if (liveStart !== null) {
          frag = this.getFragmentAtPosition(liveStart, this.bitrateTest ? levelDetails.fragmentEnd : levelDetails.edge, levelDetails);
        }
      }
      return frag;
    }

    /*
    This method finds the best matching fragment given the provided position.
     */;
    _proto.getFragmentAtPosition = function getFragmentAtPosition(bufferEnd, end, levelDetails) {
      var config = this.config;
      var fragPrevious = this.fragPrevious;
      var fragments = levelDetails.fragments,
        endSN = levelDetails.endSN;
      var fragmentHint = levelDetails.fragmentHint;
      var tolerance = config.maxFragLookUpTolerance;
      var partList = levelDetails.partList;
      var loadingParts = !!(config.lowLatencyMode && partList != null && partList.length && fragmentHint);
      if (loadingParts && fragmentHint && !this.bitrateTest) {
        // Include incomplete fragment with parts at end
        fragments = fragments.concat(fragmentHint);
        endSN = fragmentHint.sn;
      }
      var frag;
      if (bufferEnd < end) {
        var lookupTolerance = bufferEnd > end - tolerance ? 0 : tolerance;
        // Remove the tolerance if it would put the bufferEnd past the actual end of stream
        // Uses buffer and sequence number to calculate switch segment (required if using EXT-X-DISCONTINUITY-SEQUENCE)
        frag = findFragmentByPTS(fragPrevious, fragments, bufferEnd, lookupTolerance);
      } else {
        // reach end of playlist
        frag = fragments[fragments.length - 1];
      }
      if (frag) {
        var curSNIdx = frag.sn - levelDetails.startSN;
        // Move fragPrevious forward to support forcing the next fragment to load
        // when the buffer catches up to a previously buffered range.
        var fragState = this.fragmentTracker.getState(frag);
        if (fragState === FragmentState.OK || fragState === FragmentState.PARTIAL && frag.gap) {
          fragPrevious = frag;
        }
        if (fragPrevious && frag.sn === fragPrevious.sn && (!loadingParts || partList[0].fragment.sn > frag.sn)) {
          // Force the next fragment to load if the previous one was already selected. This can occasionally happen with
          // non-uniform fragment durations
          var sameLevel = fragPrevious && frag.level === fragPrevious.level;
          if (sameLevel) {
            var nextFrag = fragments[curSNIdx + 1];
            if (frag.sn < endSN && this.fragmentTracker.getState(nextFrag) !== FragmentState.OK) {
              frag = nextFrag;
            } else {
              frag = null;
            }
          }
        }
      }
      return frag;
    };
    _proto.synchronizeToLiveEdge = function synchronizeToLiveEdge(levelDetails) {
      var config = this.config,
        media = this.media;
      if (!media) {
        return;
      }
      var liveSyncPosition = this.hls.liveSyncPosition;
      var currentTime = media.currentTime;
      var start = levelDetails.fragments[0].start;
      var end = levelDetails.edge;
      var withinSlidingWindow = currentTime >= start - config.maxFragLookUpTolerance && currentTime <= end;
      // Continue if we can seek forward to sync position or if current time is outside of sliding window
      if (liveSyncPosition !== null && media.duration > liveSyncPosition && (currentTime < liveSyncPosition || !withinSlidingWindow)) {
        // Continue if buffer is starving or if current time is behind max latency
        var maxLatency = config.liveMaxLatencyDuration !== undefined ? config.liveMaxLatencyDuration : config.liveMaxLatencyDurationCount * levelDetails.targetduration;
        if (!withinSlidingWindow && media.readyState < 4 || currentTime < end - maxLatency) {
          if (!this.loadedmetadata) {
            this.nextLoadPosition = liveSyncPosition;
          }
          // Only seek if ready and there is not a significant forward buffer available for playback
          if (media.readyState) {
            this.warn("Playback: " + currentTime.toFixed(3) + " is located too far from the end of live sliding playlist: " + end + ", reset currentTime to : " + liveSyncPosition.toFixed(3));
            media.currentTime = liveSyncPosition;
          }
        }
      }
    };
    _proto.alignPlaylists = function alignPlaylists(details, previousDetails, switchDetails) {
      // FIXME: If not for `shouldAlignOnDiscontinuities` requiring fragPrevious.cc,
      //  this could all go in level-helper mergeDetails()
      var length = details.fragments.length;
      if (!length) {
        this.warn("No fragments in live playlist");
        return 0;
      }
      var slidingStart = details.fragments[0].start;
      var firstLevelLoad = !previousDetails;
      var aligned = details.alignedSliding && isFiniteNumber(slidingStart);
      if (firstLevelLoad || !aligned && !slidingStart) {
        var fragPrevious = this.fragPrevious;
        alignStream(fragPrevious, switchDetails, details);
        var alignedSlidingStart = details.fragments[0].start;
        this.log("Live playlist sliding: " + alignedSlidingStart.toFixed(2) + " start-sn: " + (previousDetails ? previousDetails.startSN : 'na') + "->" + details.startSN + " prev-sn: " + (fragPrevious ? fragPrevious.sn : 'na') + " fragments: " + length);
        return alignedSlidingStart;
      }
      return slidingStart;
    };
    _proto.waitForCdnTuneIn = function waitForCdnTuneIn(details) {
      // Wait for Low-Latency CDN Tune-in to get an updated playlist
      var advancePartLimit = 3;
      return details.live && details.canBlockReload && details.partTarget && details.tuneInGoal > Math.max(details.partHoldBack, details.partTarget * advancePartLimit);
    };
    _proto.setStartPosition = function setStartPosition(details, sliding) {
      // compute start position if set to -1. use it straight away if value is defined
      var startPosition = this.startPosition;
      if (startPosition < sliding) {
        startPosition = -1;
      }
      if (startPosition === -1 || this.lastCurrentTime === -1) {
        // Use Playlist EXT-X-START:TIME-OFFSET when set
        // Prioritize Multivariant Playlist offset so that main, audio, and subtitle stream-controller start times match
        var offsetInMultivariantPlaylist = this.startTimeOffset !== null;
        var startTimeOffset = offsetInMultivariantPlaylist ? this.startTimeOffset : details.startTimeOffset;
        if (startTimeOffset !== null && isFiniteNumber(startTimeOffset)) {
          startPosition = sliding + startTimeOffset;
          if (startTimeOffset < 0) {
            startPosition += details.totalduration;
          }
          startPosition = Math.min(Math.max(sliding, startPosition), sliding + details.totalduration);
          this.log("Start time offset " + startTimeOffset + " found in " + (offsetInMultivariantPlaylist ? 'multivariant' : 'media') + " playlist, adjust startPosition to " + startPosition);
          this.startPosition = startPosition;
        } else if (details.live) {
          // Leave this.startPosition at -1, so that we can use `getInitialLiveFragment` logic when startPosition has
          // not been specified via the config or an as an argument to startLoad (#3736).
          startPosition = this.hls.liveSyncPosition || sliding;
        } else {
          this.startPosition = startPosition = 0;
        }
        this.lastCurrentTime = startPosition;
      }
      this.nextLoadPosition = startPosition;
    };
    _proto.getLoadPosition = function getLoadPosition() {
      var media = this.media;
      // if we have not yet loaded any fragment, start loading from start position
      var pos = 0;
      if (this.loadedmetadata && media) {
        pos = media.currentTime;
      } else if (this.nextLoadPosition) {
        pos = this.nextLoadPosition;
      }
      return pos;
    };
    _proto.handleFragLoadAborted = function handleFragLoadAborted(frag, part) {
      if (this.transmuxer && frag.sn !== 'initSegment' && frag.stats.aborted) {
        this.warn("Fragment " + frag.sn + (part ? ' part ' + part.index : '') + " of level " + frag.level + " was aborted");
        this.resetFragmentLoading(frag);
      }
    };
    _proto.resetFragmentLoading = function resetFragmentLoading(frag) {
      if (!this.fragCurrent || !this.fragContextChanged(frag) && this.state !== State.FRAG_LOADING_WAITING_RETRY) {
        this.state = State.IDLE;
      }
    };
    _proto.onFragmentOrKeyLoadError = function onFragmentOrKeyLoadError(filterType, data) {
      if (data.chunkMeta && !data.frag) {
        var context = this.getCurrentContext(data.chunkMeta);
        if (context) {
          data.frag = context.frag;
        }
      }
      var frag = data.frag;
      // Handle frag error related to caller's filterType
      if (!frag || frag.type !== filterType || !this.levels) {
        return;
      }
      if (this.fragContextChanged(frag)) {
        var _this$fragCurrent2;
        this.warn("Frag load error must match current frag to retry " + frag.url + " > " + ((_this$fragCurrent2 = this.fragCurrent) == null ? void 0 : _this$fragCurrent2.url));
        return;
      }
      var gapTagEncountered = data.details === ErrorDetails.FRAG_GAP;
      if (gapTagEncountered) {
        this.fragmentTracker.fragBuffered(frag, true);
      }
      // keep retrying until the limit will be reached
      var errorAction = data.errorAction;
      var _ref2 = errorAction || {},
        action = _ref2.action,
        _ref2$retryCount = _ref2.retryCount,
        retryCount = _ref2$retryCount === void 0 ? 0 : _ref2$retryCount,
        retryConfig = _ref2.retryConfig;
      if (errorAction && action === NetworkErrorAction.RetryRequest && retryConfig) {
        this.resetStartWhenNotLoaded(this.levelLastLoaded);
        var delay = getRetryDelay(retryConfig, retryCount);
        this.warn("Fragment " + frag.sn + " of " + filterType + " " + frag.level + " errored with " + data.details + ", retrying loading " + (retryCount + 1) + "/" + retryConfig.maxNumRetry + " in " + delay + "ms");
        errorAction.resolved = true;
        this.retryDate = self.performance.now() + delay;
        this.state = State.FRAG_LOADING_WAITING_RETRY;
      } else if (retryConfig && errorAction) {
        this.resetFragmentErrors(filterType);
        if (retryCount < retryConfig.maxNumRetry) {
          // Network retry is skipped when level switch is preferred
          if (!gapTagEncountered && action !== NetworkErrorAction.RemoveAlternatePermanently) {
            errorAction.resolved = true;
          }
        } else {
          logger.warn(data.details + " reached or exceeded max retry (" + retryCount + ")");
          return;
        }
      } else if ((errorAction == null ? void 0 : errorAction.action) === NetworkErrorAction.SendAlternateToPenaltyBox) {
        this.state = State.WAITING_LEVEL;
      } else {
        this.state = State.ERROR;
      }
      // Perform next async tick sooner to speed up error action resolution
      this.tickImmediate();
    };
    _proto.reduceLengthAndFlushBuffer = function reduceLengthAndFlushBuffer(data) {
      // if in appending state
      if (this.state === State.PARSING || this.state === State.PARSED) {
        var playlistType = data.parent;
        var bufferedInfo = this.getFwdBufferInfo(this.mediaBuffer, playlistType);
        // 0.5 : tolerance needed as some browsers stalls playback before reaching buffered end
        // reduce max buf len if current position is buffered
        var buffered = bufferedInfo && bufferedInfo.len > 0.5;
        if (buffered) {
          this.reduceMaxBufferLength(bufferedInfo.len);
        }
        var flushBuffer = !buffered;
        if (flushBuffer) {
          // current position is not buffered, but browser is still complaining about buffer full error
          // this happens on IE/Edge, refer to https://github.com/video-dev/hls.js/pull/708
          // in that case flush the whole audio buffer to recover
          this.warn("Buffer full error while media.currentTime is not buffered, flush " + playlistType + " buffer");
        }
        if (data.frag) {
          this.fragmentTracker.removeFragment(data.frag);
          this.nextLoadPosition = data.frag.start;
        }
        this.resetLoadingState();
        return flushBuffer;
      }
      return false;
    };
    _proto.resetFragmentErrors = function resetFragmentErrors(filterType) {
      if (filterType === PlaylistLevelType.AUDIO) {
        // Reset current fragment since audio track audio is essential and may not have a fail-over track
        this.fragCurrent = null;
      }
      // Fragment errors that result in a level switch or redundant fail-over
      // should reset the stream controller state to idle
      if (!this.loadedmetadata) {
        this.startFragRequested = false;
      }
      if (this.state !== State.STOPPED) {
        this.state = State.IDLE;
      }
    };
    _proto.afterBufferFlushed = function afterBufferFlushed(media, bufferType, playlistType) {
      if (!media) {
        return;
      }
      // After successful buffer flushing, filter flushed fragments from bufferedFrags use mediaBuffered instead of media
      // (so that we will check against video.buffered ranges in case of alt audio track)
      var bufferedTimeRanges = BufferHelper.getBuffered(media);
      this.fragmentTracker.detectEvictedFragments(bufferType, bufferedTimeRanges, playlistType);
      if (this.state === State.ENDED) {
        this.resetLoadingState();
      }
    };
    _proto.resetLoadingState = function resetLoadingState() {
      this.log('Reset loading state');
      this.fragCurrent = null;
      this.fragPrevious = null;
      this.state = State.IDLE;
    };
    _proto.resetStartWhenNotLoaded = function resetStartWhenNotLoaded(level) {
      // if loadedmetadata is not set, it means that first frag request failed
      // in that case, reset startFragRequested flag
      if (!this.loadedmetadata) {
        this.startFragRequested = false;
        var details = level ? level.details : null;
        if (details != null && details.live) {
          // Update the start position and return to IDLE to recover live start
          this.startPosition = -1;
          this.setStartPosition(details, 0);
          this.resetLoadingState();
        } else {
          this.nextLoadPosition = this.startPosition;
        }
      }
    };
    _proto.resetWhenMissingContext = function resetWhenMissingContext(chunkMeta) {
      this.warn("The loading context changed while buffering fragment " + chunkMeta.sn + " of level " + chunkMeta.level + ". This chunk will not be buffered.");
      this.removeUnbufferedFrags();
      this.resetStartWhenNotLoaded(this.levelLastLoaded);
      this.resetLoadingState();
    };
    _proto.removeUnbufferedFrags = function removeUnbufferedFrags(start) {
      if (start === void 0) {
        start = 0;
      }
      this.fragmentTracker.removeFragmentsInRange(start, Infinity, this.playlistType, false, true);
    };
    _proto.updateLevelTiming = function updateLevelTiming(frag, part, level, partial) {
      var _this6 = this,
        _this$transmuxer;
      var details = level.details;
      if (!details) {
        this.warn('level.details undefined');
        return;
      }
      var parsed = Object.keys(frag.elementaryStreams).reduce(function (result, type) {
        var info = frag.elementaryStreams[type];
        if (info) {
          var parsedDuration = info.endPTS - info.startPTS;
          if (parsedDuration <= 0) {
            // Destroy the transmuxer after it's next time offset failed to advance because duration was <= 0.
            // The new transmuxer will be configured with a time offset matching the next fragment start,
            // preventing the timeline from shifting.
            _this6.warn("Could not parse fragment " + frag.sn + " " + type + " duration reliably (" + parsedDuration + ")");
            return result || false;
          }
          var drift = partial ? 0 : updateFragPTSDTS(details, frag, info.startPTS, info.endPTS, info.startDTS, info.endDTS);
          _this6.hls.trigger(Events.LEVEL_PTS_UPDATED, {
            details: details,
            level: level,
            drift: drift,
            type: type,
            frag: frag,
            start: info.startPTS,
            end: info.endPTS
          });
          return true;
        }
        return result;
      }, false);
      if (!parsed && ((_this$transmuxer = this.transmuxer) == null ? void 0 : _this$transmuxer.error) === null) {
        var error = new Error("Found no media in fragment " + frag.sn + " of level " + frag.level + " resetting transmuxer to fallback to playlist timing");
        if (level.fragmentError === 0) {
          // Mark and track the odd empty segment as a gap to avoid reloading
          level.fragmentError++;
          frag.gap = true;
          this.fragmentTracker.removeFragment(frag);
          this.fragmentTracker.fragBuffered(frag, true);
        }
        this.warn(error.message);
        this.hls.trigger(Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.FRAG_PARSING_ERROR,
          fatal: false,
          error: error,
          frag: frag,
          reason: "Found no media in msn " + frag.sn + " of level \"" + level.url + "\""
        });
        if (!this.hls) {
          return;
        }
        this.resetTransmuxer();
        // For this error fallthrough. Marking parsed will allow advancing to next fragment.
      }
      this.state = State.PARSED;
      this.hls.trigger(Events.FRAG_PARSED, {
        frag: frag,
        part: part
      });
    };
    _proto.resetTransmuxer = function resetTransmuxer() {
      if (this.transmuxer) {
        this.transmuxer.destroy();
        this.transmuxer = null;
      }
    };
    _proto.recoverWorkerError = function recoverWorkerError(data) {
      if (data.event === 'demuxerWorker') {
        this.fragmentTracker.removeAllFragments();
        this.resetTransmuxer();
        this.resetStartWhenNotLoaded(this.levelLastLoaded);
        this.resetLoadingState();
      }
    };
    _createClass(BaseStreamController, [{
      key: "state",
      get: function get() {
        return this._state;
      },
      set: function set(nextState) {
        var previousState = this._state;
        if (previousState !== nextState) {
          this._state = nextState;
          this.log(previousState + "->" + nextState);
        }
      }
    }]);
    return BaseStreamController;
  }(TaskLoop);

  function getSourceBuffer() {
    return self.SourceBuffer || self.WebKitSourceBuffer;
  }
  function isMSESupported() {
    var mediaSource = getMediaSource();
    if (!mediaSource) {
      return false;
    }

    // if SourceBuffer is exposed ensure its API is valid
    // Older browsers do not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
    var sourceBuffer = getSourceBuffer();
    return !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
  }
  function isSupported() {
    if (!isMSESupported()) {
      return false;
    }
    var mediaSource = getMediaSource();
    return typeof (mediaSource == null ? void 0 : mediaSource.isTypeSupported) === 'function' && (['avc1.42E01E,mp4a.40.2', 'av01.0.01M.08', 'vp09.00.50.08'].some(function (codecsForVideoContainer) {
      return mediaSource.isTypeSupported(mimeTypeForCodec(codecsForVideoContainer, 'video'));
    }) || ['mp4a.40.2', 'fLaC'].some(function (codecForAudioContainer) {
      return mediaSource.isTypeSupported(mimeTypeForCodec(codecForAudioContainer, 'audio'));
    }));
  }
  function changeTypeSupported() {
    var _sourceBuffer$prototy;
    var sourceBuffer = getSourceBuffer();
    return typeof (sourceBuffer == null ? void 0 : (_sourceBuffer$prototy = sourceBuffer.prototype) == null ? void 0 : _sourceBuffer$prototy.changeType) === 'function';
  }

  function dummyTrack(type, inputTimeScale) {
    if (type === void 0) {
      type = '';
    }
    if (inputTimeScale === void 0) {
      inputTimeScale = 90000;
    }
    return {
      type: type,
      id: -1,
      pid: -1,
      inputTimeScale: inputTimeScale,
      sequenceNumber: -1,
      samples: [],
      dropped: 0
    };
  }

  var BaseAudioDemuxer = /*#__PURE__*/function () {
    function BaseAudioDemuxer() {
      this._audioTrack = void 0;
      this._id3Track = void 0;
      this.frameIndex = 0;
      this.cachedData = null;
      this.basePTS = null;
      this.initPTS = null;
      this.lastPTS = null;
    }
    var _proto = BaseAudioDemuxer.prototype;
    _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, trackDuration) {
      this._id3Track = {
        type: 'id3',
        id: 3,
        pid: -1,
        inputTimeScale: 90000,
        sequenceNumber: 0,
        samples: [],
        dropped: 0
      };
    };
    _proto.resetTimeStamp = function resetTimeStamp(deaultTimestamp) {
      this.initPTS = deaultTimestamp;
      this.resetContiguity();
    };
    _proto.resetContiguity = function resetContiguity() {
      this.basePTS = null;
      this.lastPTS = null;
      this.frameIndex = 0;
    };
    _proto.canParse = function canParse(data, offset) {
      return false;
    };
    _proto.appendFrame = function appendFrame(track, data, offset) {}

    // feed incoming data to the front of the parsing pipeline
    ;
    _proto.demux = function demux(data, timeOffset) {
      if (this.cachedData) {
        data = appendUint8Array(this.cachedData, data);
        this.cachedData = null;
      }
      var id3Data = getID3Data(data, 0);
      var offset = id3Data ? id3Data.length : 0;
      var lastDataIndex;
      var track = this._audioTrack;
      var id3Track = this._id3Track;
      var timestamp = id3Data ? getTimeStamp(id3Data) : undefined;
      var length = data.length;
      if (this.basePTS === null || this.frameIndex === 0 && isFiniteNumber(timestamp)) {
        this.basePTS = initPTSFn(timestamp, timeOffset, this.initPTS);
        this.lastPTS = this.basePTS;
      }
      if (this.lastPTS === null) {
        this.lastPTS = this.basePTS;
      }

      // more expressive than alternative: id3Data?.length
      if (id3Data && id3Data.length > 0) {
        id3Track.samples.push({
          pts: this.lastPTS,
          dts: this.lastPTS,
          data: id3Data,
          type: MetadataSchema.audioId3,
          duration: Number.POSITIVE_INFINITY
        });
      }
      while (offset < length) {
        if (this.canParse(data, offset)) {
          var frame = this.appendFrame(track, data, offset);
          if (frame) {
            this.frameIndex++;
            this.lastPTS = frame.sample.pts;
            offset += frame.length;
            lastDataIndex = offset;
          } else {
            offset = length;
          }
        } else if (canParse$2(data, offset)) {
          // after a ID3.canParse, a call to ID3.getID3Data *should* always returns some data
          id3Data = getID3Data(data, offset);
          id3Track.samples.push({
            pts: this.lastPTS,
            dts: this.lastPTS,
            data: id3Data,
            type: MetadataSchema.audioId3,
            duration: Number.POSITIVE_INFINITY
          });
          offset += id3Data.length;
          lastDataIndex = offset;
        } else {
          offset++;
        }
        if (offset === length && lastDataIndex !== length) {
          var partialData = sliceUint8(data, lastDataIndex);
          if (this.cachedData) {
            this.cachedData = appendUint8Array(this.cachedData, partialData);
          } else {
            this.cachedData = partialData;
          }
        }
      }
      return {
        audioTrack: track,
        videoTrack: dummyTrack(),
        id3Track: id3Track,
        textTrack: dummyTrack()
      };
    };
    _proto.demuxSampleAes = function demuxSampleAes(data, keyData, timeOffset) {
      return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption"));
    };
    _proto.flush = function flush(timeOffset) {
      // Parse cache in case of remaining frames.
      var cachedData = this.cachedData;
      if (cachedData) {
        this.cachedData = null;
        this.demux(cachedData, 0);
      }
      return {
        audioTrack: this._audioTrack,
        videoTrack: dummyTrack(),
        id3Track: this._id3Track,
        textTrack: dummyTrack()
      };
    };
    _proto.destroy = function destroy() {};
    return BaseAudioDemuxer;
  }();
  /**
   * Initialize PTS
   * <p>
   *    use timestamp unless it is undefined, NaN or Infinity
   * </p>
   */
  var initPTSFn = function initPTSFn(timestamp, timeOffset, initPTS) {
    if (isFiniteNumber(timestamp)) {
      return timestamp * 90;
    }
    var init90kHz = initPTS ? initPTS.baseTime * 90000 / initPTS.timescale : 0;
    return timeOffset * 90000 + init90kHz;
  };

  /**
   * ADTS parser helper
   * @link https://wiki.multimedia.cx/index.php?title=ADTS
   */
  function getAudioConfig(observer, data, offset, audioCodec) {
    var adtsObjectType;
    var adtsExtensionSamplingIndex;
    var adtsChannelConfig;
    var config;
    var userAgent = navigator.userAgent.toLowerCase();
    var manifestCodec = audioCodec;
    var adtsSamplingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
    // byte 2
    adtsObjectType = ((data[offset + 2] & 0xc0) >>> 6) + 1;
    var adtsSamplingIndex = (data[offset + 2] & 0x3c) >>> 2;
    if (adtsSamplingIndex > adtsSamplingRates.length - 1) {
      var error = new Error("invalid ADTS sampling index:" + adtsSamplingIndex);
      observer.emit(Events.ERROR, Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.FRAG_PARSING_ERROR,
        fatal: true,
        error: error,
        reason: error.message
      });
      return;
    }
    adtsChannelConfig = (data[offset + 2] & 0x01) << 2;
    // byte 3
    adtsChannelConfig |= (data[offset + 3] & 0xc0) >>> 6;
    logger.log("manifest codec:" + audioCodec + ", ADTS type:" + adtsObjectType + ", samplingIndex:" + adtsSamplingIndex);
    // firefox: freq less than 24kHz = AAC SBR (HE-AAC)
    if (/firefox/i.test(userAgent)) {
      if (adtsSamplingIndex >= 6) {
        adtsObjectType = 5;
        config = new Array(4);
        // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
        // there is a factor 2 between frame sample rate and output sample rate
        // multiply frequency by 2 (see table below, equivalent to substract 3)
        adtsExtensionSamplingIndex = adtsSamplingIndex - 3;
      } else {
        adtsObjectType = 2;
        config = new Array(2);
        adtsExtensionSamplingIndex = adtsSamplingIndex;
      }
      // Android : always use AAC
    } else if (userAgent.indexOf('android') !== -1) {
      adtsObjectType = 2;
      config = new Array(2);
      adtsExtensionSamplingIndex = adtsSamplingIndex;
    } else {
      /*  for other browsers (Chrome/Vivaldi/Opera ...)
          always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
      */
      adtsObjectType = 5;
      config = new Array(4);
      // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)
      if (audioCodec && (audioCodec.indexOf('mp4a.40.29') !== -1 || audioCodec.indexOf('mp4a.40.5') !== -1) || !audioCodec && adtsSamplingIndex >= 6) {
        // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
        // there is a factor 2 between frame sample rate and output sample rate
        // multiply frequency by 2 (see table below, equivalent to substract 3)
        adtsExtensionSamplingIndex = adtsSamplingIndex - 3;
      } else {
        // if (manifest codec is AAC) AND (frequency less than 24kHz AND nb channel is 1) OR (manifest codec not specified and mono audio)
        // Chrome fails to play back with low frequency AAC LC mono when initialized with HE-AAC.  This is not a problem with stereo.
        if (audioCodec && audioCodec.indexOf('mp4a.40.2') !== -1 && (adtsSamplingIndex >= 6 && adtsChannelConfig === 1 || /vivaldi/i.test(userAgent)) || !audioCodec && adtsChannelConfig === 1) {
          adtsObjectType = 2;
          config = new Array(2);
        }
        adtsExtensionSamplingIndex = adtsSamplingIndex;
      }
    }
    /* refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
        ISO 14496-3 (AAC).pdf - Table 1.13 — Syntax of AudioSpecificConfig()
      Audio Profile / Audio Object Type
      0: Null
      1: AAC Main
      2: AAC LC (Low Complexity)
      3: AAC SSR (Scalable Sample Rate)
      4: AAC LTP (Long Term Prediction)
      5: SBR (Spectral Band Replication)
      6: AAC Scalable
     sampling freq
      0: 96000 Hz
      1: 88200 Hz
      2: 64000 Hz
      3: 48000 Hz
      4: 44100 Hz
      5: 32000 Hz
      6: 24000 Hz
      7: 22050 Hz
      8: 16000 Hz
      9: 12000 Hz
      10: 11025 Hz
      11: 8000 Hz
      12: 7350 Hz
      13: Reserved
      14: Reserved
      15: frequency is written explictly
      Channel Configurations
      These are the channel configurations:
      0: Defined in AOT Specifc Config
      1: 1 channel: front-center
      2: 2 channels: front-left, front-right
    */
    // audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1
    config[0] = adtsObjectType << 3;
    // samplingFrequencyIndex
    config[0] |= (adtsSamplingIndex & 0x0e) >> 1;
    config[1] |= (adtsSamplingIndex & 0x01) << 7;
    // channelConfiguration
    config[1] |= adtsChannelConfig << 3;
    if (adtsObjectType === 5) {
      // adtsExtensionSamplingIndex
      config[1] |= (adtsExtensionSamplingIndex & 0x0e) >> 1;
      config[2] = (adtsExtensionSamplingIndex & 0x01) << 7;
      // adtsObjectType (force to 2, chrome is checking that object type is less than 5 ???
      //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc
      config[2] |= 2 << 2;
      config[3] = 0;
    }
    return {
      config: config,
      samplerate: adtsSamplingRates[adtsSamplingIndex],
      channelCount: adtsChannelConfig,
      codec: 'mp4a.40.' + adtsObjectType,
      manifestCodec: manifestCodec
    };
  }
  function isHeaderPattern$1(data, offset) {
    return data[offset] === 0xff && (data[offset + 1] & 0xf6) === 0xf0;
  }
  function getHeaderLength(data, offset) {
    return data[offset + 1] & 0x01 ? 7 : 9;
  }
  function getFullFrameLength(data, offset) {
    return (data[offset + 3] & 0x03) << 11 | data[offset + 4] << 3 | (data[offset + 5] & 0xe0) >>> 5;
  }
  function canGetFrameLength(data, offset) {
    return offset + 5 < data.length;
  }
  function isHeader$1(data, offset) {
    // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
    // Layer bits (position 14 and 15) in header should be always 0 for ADTS
    // More info https://wiki.multimedia.cx/index.php?title=ADTS
    return offset + 1 < data.length && isHeaderPattern$1(data, offset);
  }
  function canParse$1(data, offset) {
    return canGetFrameLength(data, offset) && isHeaderPattern$1(data, offset) && getFullFrameLength(data, offset) <= data.length - offset;
  }
  function probe$1(data, offset) {
    // same as isHeader but we also check that ADTS frame follows last ADTS frame
    // or end of data is reached
    if (isHeader$1(data, offset)) {
      // ADTS header Length
      var headerLength = getHeaderLength(data, offset);
      if (offset + headerLength >= data.length) {
        return false;
      }
      // ADTS frame Length
      var frameLength = getFullFrameLength(data, offset);
      if (frameLength <= headerLength) {
        return false;
      }
      var newOffset = offset + frameLength;
      return newOffset === data.length || isHeader$1(data, newOffset);
    }
    return false;
  }
  function initTrackConfig(track, observer, data, offset, audioCodec) {
    if (!track.samplerate) {
      var config = getAudioConfig(observer, data, offset, audioCodec);
      if (!config) {
        return;
      }
      track.config = config.config;
      track.samplerate = config.samplerate;
      track.channelCount = config.channelCount;
      track.codec = config.codec;
      track.manifestCodec = config.manifestCodec;
      logger.log("parsed codec:" + track.codec + ", rate:" + config.samplerate + ", channels:" + config.channelCount);
    }
  }
  function getFrameDuration(samplerate) {
    return 1024 * 90000 / samplerate;
  }
  function parseFrameHeader(data, offset) {
    // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header
    var headerLength = getHeaderLength(data, offset);
    if (offset + headerLength <= data.length) {
      // retrieve frame size
      var frameLength = getFullFrameLength(data, offset) - headerLength;
      if (frameLength > 0) {
        // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}`);
        return {
          headerLength: headerLength,
          frameLength: frameLength
        };
      }
    }
  }
  function appendFrame$1(track, data, offset, pts, frameIndex) {
    var frameDuration = getFrameDuration(track.samplerate);
    var stamp = pts + frameIndex * frameDuration;
    var header = parseFrameHeader(data, offset);
    var unit;
    if (header) {
      var frameLength = header.frameLength,
        headerLength = header.headerLength;
      var _length = headerLength + frameLength;
      var missing = Math.max(0, offset + _length - data.length);
      // logger.log(`AAC frame ${frameIndex}, pts:${stamp} length@offset/total: ${frameLength}@${offset+headerLength}/${data.byteLength} missing: ${missing}`);
      if (missing) {
        unit = new Uint8Array(_length - headerLength);
        unit.set(data.subarray(offset + headerLength, data.length), 0);
      } else {
        unit = data.subarray(offset + headerLength, offset + _length);
      }
      var _sample = {
        unit: unit,
        pts: stamp
      };
      if (!missing) {
        track.samples.push(_sample);
      }
      return {
        sample: _sample,
        length: _length,
        missing: missing
      };
    }
    // overflow incomplete header
    var length = data.length - offset;
    unit = new Uint8Array(length);
    unit.set(data.subarray(offset, data.length), 0);
    var sample = {
      unit: unit,
      pts: stamp
    };
    return {
      sample: sample,
      length: length,
      missing: -1
    };
  }

  /**
   *  MPEG parser helper
   */

  var chromeVersion$1 = null;
  var BitratesMap = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160];
  var SamplingRateMap = [44100, 48000, 32000, 22050, 24000, 16000, 11025, 12000, 8000];
  var SamplesCoefficients = [
  // MPEG 2.5
  [0,
  // Reserved
  72,
  // Layer3
  144,
  // Layer2
  12 // Layer1
  ],
  // Reserved
  [0,
  // Reserved
  0,
  // Layer3
  0,
  // Layer2
  0 // Layer1
  ],
  // MPEG 2
  [0,
  // Reserved
  72,
  // Layer3
  144,
  // Layer2
  12 // Layer1
  ],
  // MPEG 1
  [0,
  // Reserved
  144,
  // Layer3
  144,
  // Layer2
  12 // Layer1
  ]];
  var BytesInSlot = [0,
  // Reserved
  1,
  // Layer3
  1,
  // Layer2
  4 // Layer1
  ];
  function appendFrame(track, data, offset, pts, frameIndex) {
    // Using http://www.datavoyage.com/mpgscript/mpeghdr.htm as a reference
    if (offset + 24 > data.length) {
      return;
    }
    var header = parseHeader(data, offset);
    if (header && offset + header.frameLength <= data.length) {
      var frameDuration = header.samplesPerFrame * 90000 / header.sampleRate;
      var stamp = pts + frameIndex * frameDuration;
      var sample = {
        unit: data.subarray(offset, offset + header.frameLength),
        pts: stamp,
        dts: stamp
      };
      track.config = [];
      track.channelCount = header.channelCount;
      track.samplerate = header.sampleRate;
      track.samples.push(sample);
      return {
        sample: sample,
        length: header.frameLength,
        missing: 0
      };
    }
  }
  function parseHeader(data, offset) {
    var mpegVersion = data[offset + 1] >> 3 & 3;
    var mpegLayer = data[offset + 1] >> 1 & 3;
    var bitRateIndex = data[offset + 2] >> 4 & 15;
    var sampleRateIndex = data[offset + 2] >> 2 & 3;
    if (mpegVersion !== 1 && bitRateIndex !== 0 && bitRateIndex !== 15 && sampleRateIndex !== 3) {
      var paddingBit = data[offset + 2] >> 1 & 1;
      var channelMode = data[offset + 3] >> 6;
      var columnInBitrates = mpegVersion === 3 ? 3 - mpegLayer : mpegLayer === 3 ? 3 : 4;
      var bitRate = BitratesMap[columnInBitrates * 14 + bitRateIndex - 1] * 1000;
      var columnInSampleRates = mpegVersion === 3 ? 0 : mpegVersion === 2 ? 1 : 2;
      var sampleRate = SamplingRateMap[columnInSampleRates * 3 + sampleRateIndex];
      var channelCount = channelMode === 3 ? 1 : 2; // If bits of channel mode are `11` then it is a single channel (Mono)
      var sampleCoefficient = SamplesCoefficients[mpegVersion][mpegLayer];
      var bytesInSlot = BytesInSlot[mpegLayer];
      var samplesPerFrame = sampleCoefficient * 8 * bytesInSlot;
      var frameLength = Math.floor(sampleCoefficient * bitRate / sampleRate + paddingBit) * bytesInSlot;
      if (chromeVersion$1 === null) {
        var userAgent = navigator.userAgent || '';
        var result = userAgent.match(/Chrome\/(\d+)/i);
        chromeVersion$1 = result ? parseInt(result[1]) : 0;
      }
      var needChromeFix = !!chromeVersion$1 && chromeVersion$1 <= 87;
      if (needChromeFix && mpegLayer === 2 && bitRate >= 224000 && channelMode === 0) {
        // Work around bug in Chromium by setting channelMode to dual-channel (01) instead of stereo (00)
        data[offset + 3] = data[offset + 3] | 0x80;
      }
      return {
        sampleRate: sampleRate,
        channelCount: channelCount,
        frameLength: frameLength,
        samplesPerFrame: samplesPerFrame
      };
    }
  }
  function isHeaderPattern(data, offset) {
    return data[offset] === 0xff && (data[offset + 1] & 0xe0) === 0xe0 && (data[offset + 1] & 0x06) !== 0x00;
  }
  function isHeader(data, offset) {
    // Look for MPEG header | 1111 1111 | 111X XYZX | where X can be either 0 or 1 and Y or Z should be 1
    // Layer bits (position 14 and 15) in header should be always different from 0 (Layer I or Layer II or Layer III)
    // More info http://www.mp3-tech.org/programmer/frame_header.html
    return offset + 1 < data.length && isHeaderPattern(data, offset);
  }
  function canParse(data, offset) {
    var headerSize = 4;
    return isHeaderPattern(data, offset) && headerSize <= data.length - offset;
  }
  function probe(data, offset) {
    // same as isHeader but we also check that MPEG frame follows last MPEG frame
    // or end of data is reached
    if (offset + 1 < data.length && isHeaderPattern(data, offset)) {
      // MPEG header Length
      var headerLength = 4;
      // MPEG frame Length
      var header = parseHeader(data, offset);
      var frameLength = headerLength;
      if (header != null && header.frameLength) {
        frameLength = header.frameLength;
      }
      var newOffset = offset + frameLength;
      return newOffset === data.length || isHeader(data, newOffset);
    }
    return false;
  }

  var AACDemuxer = /*#__PURE__*/function (_BaseAudioDemuxer) {
    _inheritsLoose(AACDemuxer, _BaseAudioDemuxer);
    function AACDemuxer(observer, config) {
      var _this;
      _this = _BaseAudioDemuxer.call(this) || this;
      _this.observer = void 0;
      _this.config = void 0;
      _this.observer = observer;
      _this.config = config;
      return _this;
    }
    var _proto = AACDemuxer.prototype;
    _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, trackDuration) {
      _BaseAudioDemuxer.prototype.resetInitSegment.call(this, initSegment, audioCodec, videoCodec, trackDuration);
      this._audioTrack = {
        container: 'audio/adts',
        type: 'audio',
        id: 2,
        pid: -1,
        sequenceNumber: 0,
        segmentCodec: 'aac',
        samples: [],
        manifestCodec: audioCodec,
        duration: trackDuration,
        inputTimeScale: 90000,
        dropped: 0
      };
    }

    // Source for probe info - https://wiki.multimedia.cx/index.php?title=ADTS
    ;
    AACDemuxer.probe = function probe$2(data) {
      if (!data) {
        return false;
      }

      // Check for the ADTS sync word
      // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
      // Layer bits (position 14 and 15) in header should be always 0 for ADTS
      // More info https://wiki.multimedia.cx/index.php?title=ADTS
      var id3Data = getID3Data(data, 0);
      var offset = (id3Data == null ? void 0 : id3Data.length) || 0;
      if (probe(data, offset)) {
        return false;
      }
      for (var length = data.length; offset < length; offset++) {
        if (probe$1(data, offset)) {
          logger.log('ADTS sync word found !');
          return true;
        }
      }
      return false;
    };
    _proto.canParse = function canParse(data, offset) {
      return canParse$1(data, offset);
    };
    _proto.appendFrame = function appendFrame(track, data, offset) {
      initTrackConfig(track, this.observer, data, offset, track.manifestCodec);
      var frame = appendFrame$1(track, data, offset, this.basePTS, this.frameIndex);
      if (frame && frame.missing === 0) {
        return frame;
      }
    };
    return AACDemuxer;
  }(BaseAudioDemuxer);

  var emsgSchemePattern = /\/emsg[-/]ID3/i;
  var MP4Demuxer = /*#__PURE__*/function () {
    function MP4Demuxer(observer, config) {
      this.remainderData = null;
      this.timeOffset = 0;
      this.config = void 0;
      this.videoTrack = void 0;
      this.audioTrack = void 0;
      this.id3Track = void 0;
      this.txtTrack = void 0;
      this.config = config;
    }
    var _proto = MP4Demuxer.prototype;
    _proto.resetTimeStamp = function resetTimeStamp() {};
    _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, trackDuration) {
      var videoTrack = this.videoTrack = dummyTrack('video', 1);
      var audioTrack = this.audioTrack = dummyTrack('audio', 1);
      var captionTrack = this.txtTrack = dummyTrack('text', 1);
      this.id3Track = dummyTrack('id3', 1);
      this.timeOffset = 0;
      if (!(initSegment != null && initSegment.byteLength)) {
        return;
      }
      var initData = parseInitSegment(initSegment);
      if (initData.video) {
        var _initData$video = initData.video,
          id = _initData$video.id,
          timescale = _initData$video.timescale,
          codec = _initData$video.codec;
        videoTrack.id = id;
        videoTrack.timescale = captionTrack.timescale = timescale;
        videoTrack.codec = codec;
      }
      if (initData.audio) {
        var _initData$audio = initData.audio,
          _id = _initData$audio.id,
          _timescale = _initData$audio.timescale,
          _codec = _initData$audio.codec;
        audioTrack.id = _id;
        audioTrack.timescale = _timescale;
        audioTrack.codec = _codec;
      }
      captionTrack.id = RemuxerTrackIdConfig.text;
      videoTrack.sampleDuration = 0;
      videoTrack.duration = audioTrack.duration = trackDuration;
    };
    _proto.resetContiguity = function resetContiguity() {
      this.remainderData = null;
    };
    MP4Demuxer.probe = function probe(data) {
      return hasMoofData(data);
    };
    _proto.demux = function demux(data, timeOffset) {
      this.timeOffset = timeOffset;
      // Load all data into the avc track. The CMAF remuxer will look for the data in the samples object; the rest of the fields do not matter
      var videoSamples = data;
      var videoTrack = this.videoTrack;
      var textTrack = this.txtTrack;
      if (this.config.progressive) {
        // Split the bytestream into two ranges: one encompassing all data up until the start of the last moof, and everything else.
        // This is done to guarantee that we're sending valid data to MSE - when demuxing progressively, we have no guarantee
        // that the fetch loader gives us flush moof+mdat pairs. If we push jagged data to MSE, it will throw an exception.
        if (this.remainderData) {
          videoSamples = appendUint8Array(this.remainderData, data);
        }
        var segmentedData = segmentValidRange(videoSamples);
        this.remainderData = segmentedData.remainder;
        videoTrack.samples = segmentedData.valid || new Uint8Array();
      } else {
        videoTrack.samples = videoSamples;
      }
      var id3Track = this.extractID3Track(videoTrack, timeOffset);
      textTrack.samples = parseSamples(timeOffset, videoTrack);
      return {
        videoTrack: videoTrack,
        audioTrack: this.audioTrack,
        id3Track: id3Track,
        textTrack: this.txtTrack
      };
    };
    _proto.flush = function flush() {
      var timeOffset = this.timeOffset;
      var videoTrack = this.videoTrack;
      var textTrack = this.txtTrack;
      videoTrack.samples = this.remainderData || new Uint8Array();
      this.remainderData = null;
      var id3Track = this.extractID3Track(videoTrack, this.timeOffset);
      textTrack.samples = parseSamples(timeOffset, videoTrack);
      return {
        videoTrack: videoTrack,
        audioTrack: dummyTrack(),
        id3Track: id3Track,
        textTrack: dummyTrack()
      };
    };
    _proto.extractID3Track = function extractID3Track(videoTrack, timeOffset) {
      var id3Track = this.id3Track;
      if (videoTrack.samples.length) {
        var emsgs = findBox(videoTrack.samples, ['emsg']);
        if (emsgs) {
          emsgs.forEach(function (data) {
            var emsgInfo = parseEmsg(data);
            if (emsgSchemePattern.test(emsgInfo.schemeIdUri)) {
              var pts = isFiniteNumber(emsgInfo.presentationTime) ? emsgInfo.presentationTime / emsgInfo.timeScale : timeOffset + emsgInfo.presentationTimeDelta / emsgInfo.timeScale;
              var duration = emsgInfo.eventDuration === 0xffffffff ? Number.POSITIVE_INFINITY : emsgInfo.eventDuration / emsgInfo.timeScale;
              // Safari takes anything <= 0.001 seconds and maps it to Infinity
              if (duration <= 0.001) {
                duration = Number.POSITIVE_INFINITY;
              }
              var payload = emsgInfo.payload;
              id3Track.samples.push({
                data: payload,
                len: payload.byteLength,
                dts: pts,
                pts: pts,
                type: MetadataSchema.emsg,
                duration: duration
              });
            }
          });
        }
      }
      return id3Track;
    };
    _proto.demuxSampleAes = function demuxSampleAes(data, keyData, timeOffset) {
      return Promise.reject(new Error('The MP4 demuxer does not support SAMPLE-AES decryption'));
    };
    _proto.destroy = function destroy() {};
    return MP4Demuxer;
  }();

  var getAudioBSID = function getAudioBSID(data, offset) {
    // check the bsid to confirm ac-3 | ec-3
    var bsid = 0;
    var numBits = 5;
    offset += numBits;
    var temp = new Uint32Array(1); // unsigned 32 bit for temporary storage
    var mask = new Uint32Array(1); // unsigned 32 bit mask value
    var _byte = new Uint8Array(1); // unsigned 8 bit for temporary storage
    while (numBits > 0) {
      _byte[0] = data[offset];
      // read remaining bits, upto 8 bits at a time
      var bits = Math.min(numBits, 8);
      var shift = 8 - bits;
      mask[0] = 0xff000000 >>> 24 + shift << shift;
      temp[0] = (_byte[0] & mask[0]) >> shift;
      bsid = !bsid ? temp[0] : bsid << bits | temp[0];
      offset += 1;
      numBits -= bits;
    }
    return bsid;
  };

  var BaseVideoParser = /*#__PURE__*/function () {
    function BaseVideoParser() {
      this.VideoSample = null;
    }
    var _proto = BaseVideoParser.prototype;
    _proto.createVideoSample = function createVideoSample(key, pts, dts, debug) {
      return {
        key: key,
        frame: false,
        pts: pts,
        dts: dts,
        units: [],
        debug: debug,
        length: 0
      };
    };
    _proto.getLastNalUnit = function getLastNalUnit(samples) {
      var _VideoSample;
      var VideoSample = this.VideoSample;
      var lastUnit;
      // try to fallback to previous sample if current one is empty
      if (!VideoSample || VideoSample.units.length === 0) {
        VideoSample = samples[samples.length - 1];
      }
      if ((_VideoSample = VideoSample) != null && _VideoSample.units) {
        var units = VideoSample.units;
        lastUnit = units[units.length - 1];
      }
      return lastUnit;
    };
    _proto.pushAccessUnit = function pushAccessUnit(VideoSample, videoTrack) {
      if (VideoSample.units.length && VideoSample.frame) {
        // if sample does not have PTS/DTS, patch with last sample PTS/DTS
        if (VideoSample.pts === undefined) {
          var samples = videoTrack.samples;
          var nbSamples = samples.length;
          if (nbSamples) {
            var lastSample = samples[nbSamples - 1];
            VideoSample.pts = lastSample.pts;
            VideoSample.dts = lastSample.dts;
          } else {
            // dropping samples, no timestamp found
            videoTrack.dropped++;
            return;
          }
        }
        videoTrack.samples.push(VideoSample);
      }
      if (VideoSample.debug.length) {
        logger.log(VideoSample.pts + '/' + VideoSample.dts + ':' + VideoSample.debug);
      }
    };
    return BaseVideoParser;
  }();

  /**
   * Parser for exponential Golomb codes, a variable-bitwidth number encoding scheme used by h264.
   */

  var ExpGolomb = /*#__PURE__*/function () {
    function ExpGolomb(data) {
      this.data = void 0;
      this.bytesAvailable = void 0;
      this.word = void 0;
      this.bitsAvailable = void 0;
      this.data = data;
      // the number of bytes left to examine in this.data
      this.bytesAvailable = data.byteLength;
      // the current word being examined
      this.word = 0; // :uint
      // the number of bits left to examine in the current word
      this.bitsAvailable = 0; // :uint
    }

    // ():void
    var _proto = ExpGolomb.prototype;
    _proto.loadWord = function loadWord() {
      var data = this.data;
      var bytesAvailable = this.bytesAvailable;
      var position = data.byteLength - bytesAvailable;
      var workingBytes = new Uint8Array(4);
      var availableBytes = Math.min(4, bytesAvailable);
      if (availableBytes === 0) {
        throw new Error('no bytes available');
      }
      workingBytes.set(data.subarray(position, position + availableBytes));
      this.word = new DataView(workingBytes.buffer).getUint32(0);
      // track the amount of this.data that has been processed
      this.bitsAvailable = availableBytes * 8;
      this.bytesAvailable -= availableBytes;
    }

    // (count:int):void
    ;
    _proto.skipBits = function skipBits(count) {
      var skipBytes; // :int
      count = Math.min(count, this.bytesAvailable * 8 + this.bitsAvailable);
      if (this.bitsAvailable > count) {
        this.word <<= count;
        this.bitsAvailable -= count;
      } else {
        count -= this.bitsAvailable;
        skipBytes = count >> 3;
        count -= skipBytes << 3;
        this.bytesAvailable -= skipBytes;
        this.loadWord();
        this.word <<= count;
        this.bitsAvailable -= count;
      }
    }

    // (size:int):uint
    ;
    _proto.readBits = function readBits(size) {
      var bits = Math.min(this.bitsAvailable, size); // :uint
      var valu = this.word >>> 32 - bits; // :uint
      if (size > 32) {
        logger.error('Cannot read more than 32 bits at a time');
      }
      this.bitsAvailable -= bits;
      if (this.bitsAvailable > 0) {
        this.word <<= bits;
      } else if (this.bytesAvailable > 0) {
        this.loadWord();
      } else {
        throw new Error('no bits available');
      }
      bits = size - bits;
      if (bits > 0 && this.bitsAvailable) {
        return valu << bits | this.readBits(bits);
      } else {
        return valu;
      }
    }

    // ():uint
    ;
    _proto.skipLZ = function skipLZ() {
      var leadingZeroCount; // :uint
      for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
        if ((this.word & 0x80000000 >>> leadingZeroCount) !== 0) {
          // the first bit of working word is 1
          this.word <<= leadingZeroCount;
          this.bitsAvailable -= leadingZeroCount;
          return leadingZeroCount;
        }
      }
      // we exhausted word and still have not found a 1
      this.loadWord();
      return leadingZeroCount + this.skipLZ();
    }

    // ():void
    ;
    _proto.skipUEG = function skipUEG() {
      this.skipBits(1 + this.skipLZ());
    }

    // ():void
    ;
    _proto.skipEG = function skipEG() {
      this.skipBits(1 + this.skipLZ());
    }

    // ():uint
    ;
    _proto.readUEG = function readUEG() {
      var clz = this.skipLZ(); // :uint
      return this.readBits(clz + 1) - 1;
    }

    // ():int
    ;
    _proto.readEG = function readEG() {
      var valu = this.readUEG(); // :int
      if (0x01 & valu) {
        // the number is odd if the low order bit is set
        return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
      } else {
        return -1 * (valu >>> 1); // divide by two then make it negative
      }
    }

    // Some convenience functions
    // :Boolean
    ;
    _proto.readBoolean = function readBoolean() {
      return this.readBits(1) === 1;
    }

    // ():int
    ;
    _proto.readUByte = function readUByte() {
      return this.readBits(8);
    }

    // ():int
    ;
    _proto.readUShort = function readUShort() {
      return this.readBits(16);
    }

    // ():int
    ;
    _proto.readUInt = function readUInt() {
      return this.readBits(32);
    }

    /**
     * Advance the ExpGolomb decoder past a scaling list. The scaling
     * list is optionally transmitted as part of a sequence parameter
     * set and is not relevant to transmuxing.
     * @param count the number of entries in this scaling list
     * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
     */;
    _proto.skipScalingList = function skipScalingList(count) {
      var lastScale = 8;
      var nextScale = 8;
      var deltaScale;
      for (var j = 0; j < count; j++) {
        if (nextScale !== 0) {
          deltaScale = this.readEG();
          nextScale = (lastScale + deltaScale + 256) % 256;
        }
        lastScale = nextScale === 0 ? lastScale : nextScale;
      }
    }

    /**
     * Read a sequence parameter set and return some interesting video
     * properties. A sequence parameter set is the H264 metadata that
     * describes the properties of upcoming video frames.
     * @returns an object with configuration parsed from the
     * sequence parameter set, including the dimensions of the
     * associated video frames.
     */;
    _proto.readSPS = function readSPS() {
      var frameCropLeftOffset = 0;
      var frameCropRightOffset = 0;
      var frameCropTopOffset = 0;
      var frameCropBottomOffset = 0;
      var numRefFramesInPicOrderCntCycle;
      var scalingListCount;
      var i;
      var readUByte = this.readUByte.bind(this);
      var readBits = this.readBits.bind(this);
      var readUEG = this.readUEG.bind(this);
      var readBoolean = this.readBoolean.bind(this);
      var skipBits = this.skipBits.bind(this);
      var skipEG = this.skipEG.bind(this);
      var skipUEG = this.skipUEG.bind(this);
      var skipScalingList = this.skipScalingList.bind(this);
      readUByte();
      var profileIdc = readUByte(); // profile_idc
      readBits(5); // profileCompat constraint_set[0-4]_flag, u(5)
      skipBits(3); // reserved_zero_3bits u(3),
      readUByte(); // level_idc u(8)
      skipUEG(); // seq_parameter_set_id
      // some profiles have more optional data we don't need
      if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128) {
        var chromaFormatIdc = readUEG();
        if (chromaFormatIdc === 3) {
          skipBits(1);
        } // separate_colour_plane_flag

        skipUEG(); // bit_depth_luma_minus8
        skipUEG(); // bit_depth_chroma_minus8
        skipBits(1); // qpprime_y_zero_transform_bypass_flag
        if (readBoolean()) {
          // seq_scaling_matrix_present_flag
          scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
          for (i = 0; i < scalingListCount; i++) {
            if (readBoolean()) {
              // seq_scaling_list_present_flag[ i ]
              if (i < 6) {
                skipScalingList(16);
              } else {
                skipScalingList(64);
              }
            }
          }
        }
      }
      skipUEG(); // log2_max_frame_num_minus4
      var picOrderCntType = readUEG();
      if (picOrderCntType === 0) {
        readUEG(); // log2_max_pic_order_cnt_lsb_minus4
      } else if (picOrderCntType === 1) {
        skipBits(1); // delta_pic_order_always_zero_flag
        skipEG(); // offset_for_non_ref_pic
        skipEG(); // offset_for_top_to_bottom_field
        numRefFramesInPicOrderCntCycle = readUEG();
        for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
          skipEG();
        } // offset_for_ref_frame[ i ]
      }
      skipUEG(); // max_num_ref_frames
      skipBits(1); // gaps_in_frame_num_value_allowed_flag
      var picWidthInMbsMinus1 = readUEG();
      var picHeightInMapUnitsMinus1 = readUEG();
      var frameMbsOnlyFlag = readBits(1);
      if (frameMbsOnlyFlag === 0) {
        skipBits(1);
      } // mb_adaptive_frame_field_flag

      skipBits(1); // direct_8x8_inference_flag
      if (readBoolean()) {
        // frame_cropping_flag
        frameCropLeftOffset = readUEG();
        frameCropRightOffset = readUEG();
        frameCropTopOffset = readUEG();
        frameCropBottomOffset = readUEG();
      }
      var pixelRatio = [1, 1];
      if (readBoolean()) {
        // vui_parameters_present_flag
        if (readBoolean()) {
          // aspect_ratio_info_present_flag
          var aspectRatioIdc = readUByte();
          switch (aspectRatioIdc) {
            case 1:
              pixelRatio = [1, 1];
              break;
            case 2:
              pixelRatio = [12, 11];
              break;
            case 3:
              pixelRatio = [10, 11];
              break;
            case 4:
              pixelRatio = [16, 11];
              break;
            case 5:
              pixelRatio = [40, 33];
              break;
            case 6:
              pixelRatio = [24, 11];
              break;
            case 7:
              pixelRatio = [20, 11];
              break;
            case 8:
              pixelRatio = [32, 11];
              break;
            case 9:
              pixelRatio = [80, 33];
              break;
            case 10:
              pixelRatio = [18, 11];
              break;
            case 11:
              pixelRatio = [15, 11];
              break;
            case 12:
              pixelRatio = [64, 33];
              break;
            case 13:
              pixelRatio = [160, 99];
              break;
            case 14:
              pixelRatio = [4, 3];
              break;
            case 15:
              pixelRatio = [3, 2];
              break;
            case 16:
              pixelRatio = [2, 1];
              break;
            case 255:
              {
                pixelRatio = [readUByte() << 8 | readUByte(), readUByte() << 8 | readUByte()];
                break;
              }
          }
        }
      }
      return {
        width: Math.ceil((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2),
        height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset),
        pixelRatio: pixelRatio
      };
    };
    _proto.readSliceType = function readSliceType() {
      // skip NALu type
      this.readUByte();
      // discard first_mb_in_slice
      this.readUEG();
      // return slice_type
      return this.readUEG();
    };
    return ExpGolomb;
  }();

  var AvcVideoParser = /*#__PURE__*/function (_BaseVideoParser) {
    _inheritsLoose(AvcVideoParser, _BaseVideoParser);
    function AvcVideoParser() {
      return _BaseVideoParser.apply(this, arguments) || this;
    }
    var _proto = AvcVideoParser.prototype;
    _proto.parseAVCPES = function parseAVCPES(track, textTrack, pes, last, duration) {
      var _this = this;
      var units = this.parseAVCNALu(track, pes.data);
      var VideoSample = this.VideoSample;
      var push;
      var spsfound = false;
      // free pes.data to save up some memory
      pes.data = null;

      // if new NAL units found and last sample still there, let's push ...
      // this helps parsing streams with missing AUD (only do this if AUD never found)
      if (VideoSample && units.length && !track.audFound) {
        this.pushAccessUnit(VideoSample, track);
        VideoSample = this.VideoSample = this.createVideoSample(false, pes.pts, pes.dts, '');
      }
      units.forEach(function (unit) {
        var _VideoSample2;
        switch (unit.type) {
          // NDR
          case 1:
            {
              var iskey = false;
              push = true;
              var data = unit.data;
              // only check slice type to detect KF in case SPS found in same packet (any keyframe is preceded by SPS ...)
              if (spsfound && data.length > 4) {
                // retrieve slice type by parsing beginning of NAL unit (follow H264 spec, slice_header definition) to detect keyframe embedded in NDR
                var sliceType = new ExpGolomb(data).readSliceType();
                // 2 : I slice, 4 : SI slice, 7 : I slice, 9: SI slice
                // SI slice : A slice that is coded using intra prediction only and using quantisation of the prediction samples.
                // An SI slice can be coded such that its decoded samples can be constructed identically to an SP slice.
                // I slice: A slice that is not an SI slice that is decoded using intra prediction only.
                // if (sliceType === 2 || sliceType === 7) {
                if (sliceType === 2 || sliceType === 4 || sliceType === 7 || sliceType === 9) {
                  iskey = true;
                }
              }
              if (iskey) {
                var _VideoSample;
                // if we have non-keyframe data already, that cannot belong to the same frame as a keyframe, so force a push
                if ((_VideoSample = VideoSample) != null && _VideoSample.frame && !VideoSample.key) {
                  _this.pushAccessUnit(VideoSample, track);
                  VideoSample = _this.VideoSample = null;
                }
              }
              if (!VideoSample) {
                VideoSample = _this.VideoSample = _this.createVideoSample(true, pes.pts, pes.dts, '');
              }
              VideoSample.frame = true;
              VideoSample.key = iskey;
              break;
              // IDR
            }
          case 5:
            push = true;
            // handle PES not starting with AUD
            // if we have frame data already, that cannot belong to the same frame, so force a push
            if ((_VideoSample2 = VideoSample) != null && _VideoSample2.frame && !VideoSample.key) {
              _this.pushAccessUnit(VideoSample, track);
              VideoSample = _this.VideoSample = null;
            }
            if (!VideoSample) {
              VideoSample = _this.VideoSample = _this.createVideoSample(true, pes.pts, pes.dts, '');
            }
            VideoSample.key = true;
            VideoSample.frame = true;
            break;
          // SEI
          case 6:
            {
              push = true;
              parseSEIMessageFromNALu(unit.data, 1, pes.pts, textTrack.samples);
              break;
              // SPS
            }
          case 7:
            {
              var _track$pixelRatio, _track$pixelRatio2;
              push = true;
              spsfound = true;
              var sps = unit.data;
              var expGolombDecoder = new ExpGolomb(sps);
              var config = expGolombDecoder.readSPS();
              if (!track.sps || track.width !== config.width || track.height !== config.height || ((_track$pixelRatio = track.pixelRatio) == null ? void 0 : _track$pixelRatio[0]) !== config.pixelRatio[0] || ((_track$pixelRatio2 = track.pixelRatio) == null ? void 0 : _track$pixelRatio2[1]) !== config.pixelRatio[1]) {
                track.width = config.width;
                track.height = config.height;
                track.pixelRatio = config.pixelRatio;
                track.sps = [sps];
                track.duration = duration;
                var codecarray = sps.subarray(1, 4);
                var codecstring = 'avc1.';
                for (var i = 0; i < 3; i++) {
                  var h = codecarray[i].toString(16);
                  if (h.length < 2) {
                    h = '0' + h;
                  }
                  codecstring += h;
                }
                track.codec = codecstring;
              }
              break;
            }
          // PPS
          case 8:
            push = true;
            track.pps = [unit.data];
            break;
          // AUD
          case 9:
            push = true;
            track.audFound = true;
            if (VideoSample) {
              _this.pushAccessUnit(VideoSample, track);
            }
            VideoSample = _this.VideoSample = _this.createVideoSample(false, pes.pts, pes.dts, '');
            break;
          // Filler Data
          case 12:
            push = true;
            break;
          default:
            push = false;
            if (VideoSample) {
              VideoSample.debug += 'unknown NAL ' + unit.type + ' ';
            }
            break;
        }
        if (VideoSample && push) {
          var _units = VideoSample.units;
          _units.push(unit);
        }
      });
      // if last PES packet, push samples
      if (last && VideoSample) {
        this.pushAccessUnit(VideoSample, track);
        this.VideoSample = null;
      }
    };
    _proto.parseAVCNALu = function parseAVCNALu(track, array) {
      var len = array.byteLength;
      var state = track.naluState || 0;
      var lastState = state;
      var units = [];
      var i = 0;
      var value;
      var overflow;
      var unitType;
      var lastUnitStart = -1;
      var lastUnitType = 0;
      // logger.log('PES:' + Hex.hexDump(array));

      if (state === -1) {
        // special use case where we found 3 or 4-byte start codes exactly at the end of previous PES packet
        lastUnitStart = 0;
        // NALu type is value read from offset 0
        lastUnitType = array[0] & 0x1f;
        state = 0;
        i = 1;
      }
      while (i < len) {
        value = array[i++];
        // optimization. state 0 and 1 are the predominant case. let's handle them outside of the switch/case
        if (!state) {
          state = value ? 0 : 1;
          continue;
        }
        if (state === 1) {
          state = value ? 0 : 2;
          continue;
        }
        // here we have state either equal to 2 or 3
        if (!value) {
          state = 3;
        } else if (value === 1) {
          overflow = i - state - 1;
          if (lastUnitStart >= 0) {
            var unit = {
              data: array.subarray(lastUnitStart, overflow),
              type: lastUnitType
            };
            // logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
            units.push(unit);
          } else {
            // lastUnitStart is undefined => this is the first start code found in this PES packet
            // first check if start code delimiter is overlapping between 2 PES packets,
            // ie it started in last packet (lastState not zero)
            // and ended at the beginning of this PES packet (i <= 4 - lastState)
            var lastUnit = this.getLastNalUnit(track.samples);
            if (lastUnit) {
              if (lastState && i <= 4 - lastState) {
                // start delimiter overlapping between PES packets
                // strip start delimiter bytes from the end of last NAL unit
                // check if lastUnit had a state different from zero
                if (lastUnit.state) {
                  // strip last bytes
                  lastUnit.data = lastUnit.data.subarray(0, lastUnit.data.byteLength - lastState);
                }
              }
              // If NAL units are not starting right at the beginning of the PES packet, push preceding data into previous NAL unit.

              if (overflow > 0) {
                // logger.log('first NALU found with overflow:' + overflow);
                lastUnit.data = appendUint8Array(lastUnit.data, array.subarray(0, overflow));
                lastUnit.state = 0;
              }
            }
          }
          // check if we can read unit type
          if (i < len) {
            unitType = array[i] & 0x1f;
            // logger.log('find NALU @ offset:' + i + ',type:' + unitType);
            lastUnitStart = i;
            lastUnitType = unitType;
            state = 0;
          } else {
            // not enough byte to read unit type. let's read it on next PES parsing
            state = -1;
          }
        } else {
          state = 0;
        }
      }
      if (lastUnitStart >= 0 && state >= 0) {
        var _unit = {
          data: array.subarray(lastUnitStart, len),
          type: lastUnitType,
          state: state
        };
        units.push(_unit);
        // logger.log('pushing NALU, type/size/state:' + unit.type + '/' + unit.data.byteLength + '/' + state);
      }
      // no NALu found
      if (units.length === 0) {
        // append pes.data to previous NAL unit
        var _lastUnit = this.getLastNalUnit(track.samples);
        if (_lastUnit) {
          _lastUnit.data = appendUint8Array(_lastUnit.data, array);
        }
      }
      track.naluState = state;
      return units;
    };
    return AvcVideoParser;
  }(BaseVideoParser);

  /**
   * SAMPLE-AES decrypter
   */

  var SampleAesDecrypter = /*#__PURE__*/function () {
    function SampleAesDecrypter(observer, config, keyData) {
      this.keyData = void 0;
      this.decrypter = void 0;
      this.keyData = keyData;
      this.decrypter = new Decrypter(config, {
        removePKCS7Padding: false
      });
    }
    var _proto = SampleAesDecrypter.prototype;
    _proto.decryptBuffer = function decryptBuffer(encryptedData) {
      return this.decrypter.decrypt(encryptedData, this.keyData.key.buffer, this.keyData.iv.buffer);
    }

    // AAC - encrypt all full 16 bytes blocks starting from offset 16
    ;
    _proto.decryptAacSample = function decryptAacSample(samples, sampleIndex, callback) {
      var _this = this;
      var curUnit = samples[sampleIndex].unit;
      if (curUnit.length <= 16) {
        // No encrypted portion in this sample (first 16 bytes is not
        // encrypted, see https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/HLS_Sample_Encryption/Encryption/Encryption.html),
        return;
      }
      var encryptedData = curUnit.subarray(16, curUnit.length - curUnit.length % 16);
      var encryptedBuffer = encryptedData.buffer.slice(encryptedData.byteOffset, encryptedData.byteOffset + encryptedData.length);
      this.decryptBuffer(encryptedBuffer).then(function (decryptedBuffer) {
        var decryptedData = new Uint8Array(decryptedBuffer);
        curUnit.set(decryptedData, 16);
        if (!_this.decrypter.isSync()) {
          _this.decryptAacSamples(samples, sampleIndex + 1, callback);
        }
      });
    };
    _proto.decryptAacSamples = function decryptAacSamples(samples, sampleIndex, callback) {
      for (;; sampleIndex++) {
        if (sampleIndex >= samples.length) {
          callback();
          return;
        }
        if (samples[sampleIndex].unit.length < 32) {
          continue;
        }
        this.decryptAacSample(samples, sampleIndex, callback);
        if (!this.decrypter.isSync()) {
          return;
        }
      }
    }

    // AVC - encrypt one 16 bytes block out of ten, starting from offset 32
    ;
    _proto.getAvcEncryptedData = function getAvcEncryptedData(decodedData) {
      var encryptedDataLen = Math.floor((decodedData.length - 48) / 160) * 16 + 16;
      var encryptedData = new Int8Array(encryptedDataLen);
      var outputPos = 0;
      for (var inputPos = 32; inputPos < decodedData.length - 16; inputPos += 160, outputPos += 16) {
        encryptedData.set(decodedData.subarray(inputPos, inputPos + 16), outputPos);
      }
      return encryptedData;
    };
    _proto.getAvcDecryptedUnit = function getAvcDecryptedUnit(decodedData, decryptedData) {
      var uint8DecryptedData = new Uint8Array(decryptedData);
      var inputPos = 0;
      for (var outputPos = 32; outputPos < decodedData.length - 16; outputPos += 160, inputPos += 16) {
        decodedData.set(uint8DecryptedData.subarray(inputPos, inputPos + 16), outputPos);
      }
      return decodedData;
    };
    _proto.decryptAvcSample = function decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit) {
      var _this2 = this;
      var decodedData = discardEPB(curUnit.data);
      var encryptedData = this.getAvcEncryptedData(decodedData);
      this.decryptBuffer(encryptedData.buffer).then(function (decryptedBuffer) {
        curUnit.data = _this2.getAvcDecryptedUnit(decodedData, decryptedBuffer);
        if (!_this2.decrypter.isSync()) {
          _this2.decryptAvcSamples(samples, sampleIndex, unitIndex + 1, callback);
        }
      });
    };
    _proto.decryptAvcSamples = function decryptAvcSamples(samples, sampleIndex, unitIndex, callback) {
      if (samples instanceof Uint8Array) {
        throw new Error('Cannot decrypt samples of type Uint8Array');
      }
      for (;; sampleIndex++, unitIndex = 0) {
        if (sampleIndex >= samples.length) {
          callback();
          return;
        }
        var curUnits = samples[sampleIndex].units;
        for (;; unitIndex++) {
          if (unitIndex >= curUnits.length) {
            break;
          }
          var curUnit = curUnits[unitIndex];
          if (curUnit.data.length <= 48 || curUnit.type !== 1 && curUnit.type !== 5) {
            continue;
          }
          this.decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit);
          if (!this.decrypter.isSync()) {
            return;
          }
        }
      }
    };
    return SampleAesDecrypter;
  }();

  var PACKET_LENGTH = 188;
  var TSDemuxer = /*#__PURE__*/function () {
    function TSDemuxer(observer, config, typeSupported) {
      this.observer = void 0;
      this.config = void 0;
      this.typeSupported = void 0;
      this.sampleAes = null;
      this.pmtParsed = false;
      this.audioCodec = void 0;
      this.videoCodec = void 0;
      this._duration = 0;
      this._pmtId = -1;
      this._videoTrack = void 0;
      this._audioTrack = void 0;
      this._id3Track = void 0;
      this._txtTrack = void 0;
      this.aacOverFlow = null;
      this.remainderData = null;
      this.videoParser = void 0;
      this.observer = observer;
      this.config = config;
      this.typeSupported = typeSupported;
      this.videoParser = new AvcVideoParser();
    }
    TSDemuxer.probe = function probe(data) {
      var syncOffset = TSDemuxer.syncOffset(data);
      if (syncOffset > 0) {
        logger.warn("MPEG2-TS detected but first sync word found @ offset " + syncOffset);
      }
      return syncOffset !== -1;
    };
    TSDemuxer.syncOffset = function syncOffset(data) {
      var length = data.length;
      var scanwindow = Math.min(PACKET_LENGTH * 5, length - PACKET_LENGTH) + 1;
      var i = 0;
      while (i < scanwindow) {
        // a TS init segment should contain at least 2 TS packets: PAT and PMT, each starting with 0x47
        var foundPat = false;
        var packetStart = -1;
        var tsPackets = 0;
        for (var j = i; j < length; j += PACKET_LENGTH) {
          if (data[j] === 0x47 && (length - j === PACKET_LENGTH || data[j + PACKET_LENGTH] === 0x47)) {
            tsPackets++;
            if (packetStart === -1) {
              packetStart = j;
              // First sync word found at offset, increase scan length (#5251)
              if (packetStart !== 0) {
                scanwindow = Math.min(packetStart + PACKET_LENGTH * 99, data.length - PACKET_LENGTH) + 1;
              }
            }
            if (!foundPat) {
              foundPat = parsePID(data, j) === 0;
            }
            // Sync word found at 0 with 3 packets, or found at offset least 2 packets up to scanwindow (#5501)
            if (foundPat && tsPackets > 1 && (packetStart === 0 && tsPackets > 2 || j + PACKET_LENGTH > scanwindow)) {
              return packetStart;
            }
          } else if (tsPackets) {
            // Exit if sync word found, but does not contain contiguous packets
            return -1;
          } else {
            break;
          }
        }
        i++;
      }
      return -1;
    }

    /**
     * Creates a track model internal to demuxer used to drive remuxing input
     */;
    TSDemuxer.createTrack = function createTrack(type, duration) {
      return {
        container: type === 'video' || type === 'audio' ? 'video/mp2t' : undefined,
        type: type,
        id: RemuxerTrackIdConfig[type],
        pid: -1,
        inputTimeScale: 90000,
        sequenceNumber: 0,
        samples: [],
        dropped: 0,
        duration: type === 'audio' ? duration : undefined
      };
    }

    /**
     * Initializes a new init segment on the demuxer/remuxer interface. Needed for discontinuities/track-switches (or at stream start)
     * Resets all internal track instances of the demuxer.
     */;
    var _proto = TSDemuxer.prototype;
    _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, trackDuration) {
      this.pmtParsed = false;
      this._pmtId = -1;
      this._videoTrack = TSDemuxer.createTrack('video');
      this._audioTrack = TSDemuxer.createTrack('audio', trackDuration);
      this._id3Track = TSDemuxer.createTrack('id3');
      this._txtTrack = TSDemuxer.createTrack('text');
      this._audioTrack.segmentCodec = 'aac';

      // flush any partial content
      this.aacOverFlow = null;
      this.remainderData = null;
      this.audioCodec = audioCodec;
      this.videoCodec = videoCodec;
      this._duration = trackDuration;
    };
    _proto.resetTimeStamp = function resetTimeStamp() {};
    _proto.resetContiguity = function resetContiguity() {
      var _audioTrack = this._audioTrack,
        _videoTrack = this._videoTrack,
        _id3Track = this._id3Track;
      if (_audioTrack) {
        _audioTrack.pesData = null;
      }
      if (_videoTrack) {
        _videoTrack.pesData = null;
      }
      if (_id3Track) {
        _id3Track.pesData = null;
      }
      this.aacOverFlow = null;
      this.remainderData = null;
    };
    _proto.demux = function demux(data, timeOffset, isSampleAes, flush) {
      if (isSampleAes === void 0) {
        isSampleAes = false;
      }
      if (flush === void 0) {
        flush = false;
      }
      if (!isSampleAes) {
        this.sampleAes = null;
      }
      var pes;
      var videoTrack = this._videoTrack;
      var audioTrack = this._audioTrack;
      var id3Track = this._id3Track;
      var textTrack = this._txtTrack;
      var videoPid = videoTrack.pid;
      var videoData = videoTrack.pesData;
      var audioPid = audioTrack.pid;
      var id3Pid = id3Track.pid;
      var audioData = audioTrack.pesData;
      var id3Data = id3Track.pesData;
      var unknownPID = null;
      var pmtParsed = this.pmtParsed;
      var pmtId = this._pmtId;
      var len = data.length;
      if (this.remainderData) {
        data = appendUint8Array(this.remainderData, data);
        len = data.length;
        this.remainderData = null;
      }
      if (len < PACKET_LENGTH && !flush) {
        this.remainderData = data;
        return {
          audioTrack: audioTrack,
          videoTrack: videoTrack,
          id3Track: id3Track,
          textTrack: textTrack
        };
      }
      var syncOffset = Math.max(0, TSDemuxer.syncOffset(data));
      len -= (len - syncOffset) % PACKET_LENGTH;
      if (len < data.byteLength && !flush) {
        this.remainderData = new Uint8Array(data.buffer, len, data.buffer.byteLength - len);
      }

      // loop through TS packets
      var tsPacketErrors = 0;
      for (var start = syncOffset; start < len; start += PACKET_LENGTH) {
        if (data[start] === 0x47) {
          var stt = !!(data[start + 1] & 0x40);
          var pid = parsePID(data, start);
          var atf = (data[start + 3] & 0x30) >> 4;

          // if an adaption field is present, its length is specified by the fifth byte of the TS packet header.
          var offset = void 0;
          if (atf > 1) {
            offset = start + 5 + data[start + 4];
            // continue if there is only adaptation field
            if (offset === start + PACKET_LENGTH) {
              continue;
            }
          } else {
            offset = start + 4;
          }
          switch (pid) {
            case videoPid:
              if (stt) {
                if (videoData && (pes = parsePES(videoData))) {
                  this.videoParser.parseAVCPES(videoTrack, textTrack, pes, false, this._duration);
                }
                videoData = {
                  data: [],
                  size: 0
                };
              }
              if (videoData) {
                videoData.data.push(data.subarray(offset, start + PACKET_LENGTH));
                videoData.size += start + PACKET_LENGTH - offset;
              }
              break;
            case audioPid:
              if (stt) {
                if (audioData && (pes = parsePES(audioData))) {
                  switch (audioTrack.segmentCodec) {
                    case 'aac':
                      this.parseAACPES(audioTrack, pes);
                      break;
                    case 'mp3':
                      this.parseMPEGPES(audioTrack, pes);
                      break;
                  }
                }
                audioData = {
                  data: [],
                  size: 0
                };
              }
              if (audioData) {
                audioData.data.push(data.subarray(offset, start + PACKET_LENGTH));
                audioData.size += start + PACKET_LENGTH - offset;
              }
              break;
            case id3Pid:
              if (stt) {
                if (id3Data && (pes = parsePES(id3Data))) {
                  this.parseID3PES(id3Track, pes);
                }
                id3Data = {
                  data: [],
                  size: 0
                };
              }
              if (id3Data) {
                id3Data.data.push(data.subarray(offset, start + PACKET_LENGTH));
                id3Data.size += start + PACKET_LENGTH - offset;
              }
              break;
            case 0:
              if (stt) {
                offset += data[offset] + 1;
              }
              pmtId = this._pmtId = parsePAT(data, offset);
              // logger.log('PMT PID:'  + this._pmtId);
              break;
            case pmtId:
              {
                if (stt) {
                  offset += data[offset] + 1;
                }
                var parsedPIDs = parsePMT(data, offset, this.typeSupported, isSampleAes);

                // only update track id if track PID found while parsing PMT
                // this is to avoid resetting the PID to -1 in case
                // track PID transiently disappears from the stream
                // this could happen in case of transient missing audio samples for example
                // NOTE this is only the PID of the track as found in TS,
                // but we are not using this for MP4 track IDs.
                videoPid = parsedPIDs.videoPid;
                if (videoPid > 0) {
                  videoTrack.pid = videoPid;
                  videoTrack.segmentCodec = parsedPIDs.segmentVideoCodec;
                }
                audioPid = parsedPIDs.audioPid;
                if (audioPid > 0) {
                  audioTrack.pid = audioPid;
                  audioTrack.segmentCodec = parsedPIDs.segmentAudioCodec;
                }
                id3Pid = parsedPIDs.id3Pid;
                if (id3Pid > 0) {
                  id3Track.pid = id3Pid;
                }
                if (unknownPID !== null && !pmtParsed) {
                  logger.warn("MPEG-TS PMT found at " + start + " after unknown PID '" + unknownPID + "'. Backtracking to sync byte @" + syncOffset + " to parse all TS packets.");
                  unknownPID = null;
                  // we set it to -188, the += 188 in the for loop will reset start to 0
                  start = syncOffset - 188;
                }
                pmtParsed = this.pmtParsed = true;
                break;
              }
            case 0x11:
            case 0x1fff:
              break;
            default:
              unknownPID = pid;
              break;
          }
        } else {
          tsPacketErrors++;
        }
      }
      if (tsPacketErrors > 0) {
        var error = new Error("Found " + tsPacketErrors + " TS packet/s that do not start with 0x47");
        this.observer.emit(Events.ERROR, Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.FRAG_PARSING_ERROR,
          fatal: false,
          error: error,
          reason: error.message
        });
      }
      videoTrack.pesData = videoData;
      audioTrack.pesData = audioData;
      id3Track.pesData = id3Data;
      var demuxResult = {
        audioTrack: audioTrack,
        videoTrack: videoTrack,
        id3Track: id3Track,
        textTrack: textTrack
      };
      if (flush) {
        this.extractRemainingSamples(demuxResult);
      }
      return demuxResult;
    };
    _proto.flush = function flush() {
      var remainderData = this.remainderData;
      this.remainderData = null;
      var result;
      if (remainderData) {
        result = this.demux(remainderData, -1, false, true);
      } else {
        result = {
          videoTrack: this._videoTrack,
          audioTrack: this._audioTrack,
          id3Track: this._id3Track,
          textTrack: this._txtTrack
        };
      }
      this.extractRemainingSamples(result);
      if (this.sampleAes) {
        return this.decrypt(result, this.sampleAes);
      }
      return result;
    };
    _proto.extractRemainingSamples = function extractRemainingSamples(demuxResult) {
      var audioTrack = demuxResult.audioTrack,
        videoTrack = demuxResult.videoTrack,
        id3Track = demuxResult.id3Track,
        textTrack = demuxResult.textTrack;
      var videoData = videoTrack.pesData;
      var audioData = audioTrack.pesData;
      var id3Data = id3Track.pesData;
      // try to parse last PES packets
      var pes;
      if (videoData && (pes = parsePES(videoData))) {
        this.videoParser.parseAVCPES(videoTrack, textTrack, pes, true, this._duration);
        videoTrack.pesData = null;
      } else {
        // either avcData null or PES truncated, keep it for next frag parsing
        videoTrack.pesData = videoData;
      }
      if (audioData && (pes = parsePES(audioData))) {
        switch (audioTrack.segmentCodec) {
          case 'aac':
            this.parseAACPES(audioTrack, pes);
            break;
          case 'mp3':
            this.parseMPEGPES(audioTrack, pes);
            break;
        }
        audioTrack.pesData = null;
      } else {
        if (audioData != null && audioData.size) {
          logger.log('last AAC PES packet truncated,might overlap between fragments');
        }

        // either audioData null or PES truncated, keep it for next frag parsing
        audioTrack.pesData = audioData;
      }
      if (id3Data && (pes = parsePES(id3Data))) {
        this.parseID3PES(id3Track, pes);
        id3Track.pesData = null;
      } else {
        // either id3Data null or PES truncated, keep it for next frag parsing
        id3Track.pesData = id3Data;
      }
    };
    _proto.demuxSampleAes = function demuxSampleAes(data, keyData, timeOffset) {
      var demuxResult = this.demux(data, timeOffset, true, !this.config.progressive);
      var sampleAes = this.sampleAes = new SampleAesDecrypter(this.observer, this.config, keyData);
      return this.decrypt(demuxResult, sampleAes);
    };
    _proto.decrypt = function decrypt(demuxResult, sampleAes) {
      return new Promise(function (resolve) {
        var audioTrack = demuxResult.audioTrack,
          videoTrack = demuxResult.videoTrack;
        if (audioTrack.samples && audioTrack.segmentCodec === 'aac') {
          sampleAes.decryptAacSamples(audioTrack.samples, 0, function () {
            if (videoTrack.samples) {
              sampleAes.decryptAvcSamples(videoTrack.samples, 0, 0, function () {
                resolve(demuxResult);
              });
            } else {
              resolve(demuxResult);
            }
          });
        } else if (videoTrack.samples) {
          sampleAes.decryptAvcSamples(videoTrack.samples, 0, 0, function () {
            resolve(demuxResult);
          });
        }
      });
    };
    _proto.destroy = function destroy() {
      this._duration = 0;
    };
    _proto.parseAACPES = function parseAACPES(track, pes) {
      var startOffset = 0;
      var aacOverFlow = this.aacOverFlow;
      var data = pes.data;
      if (aacOverFlow) {
        this.aacOverFlow = null;
        var frameMissingBytes = aacOverFlow.missing;
        var sampleLength = aacOverFlow.sample.unit.byteLength;
        // logger.log(`AAC: append overflowing ${sampleLength} bytes to beginning of new PES`);
        if (frameMissingBytes === -1) {
          data = appendUint8Array(aacOverFlow.sample.unit, data);
        } else {
          var frameOverflowBytes = sampleLength - frameMissingBytes;
          aacOverFlow.sample.unit.set(data.subarray(0, frameMissingBytes), frameOverflowBytes);
          track.samples.push(aacOverFlow.sample);
          startOffset = aacOverFlow.missing;
        }
      }
      // look for ADTS header (0xFFFx)
      var offset;
      var len;
      for (offset = startOffset, len = data.length; offset < len - 1; offset++) {
        if (isHeader$1(data, offset)) {
          break;
        }
      }
      // if ADTS header does not start straight from the beginning of the PES payload, raise an error
      if (offset !== startOffset) {
        var reason;
        var recoverable = offset < len - 1;
        if (recoverable) {
          reason = "AAC PES did not start with ADTS header,offset:" + offset;
        } else {
          reason = 'No ADTS header found in AAC PES';
        }
        var error = new Error(reason);
        logger.warn("parsing error: " + reason);
        this.observer.emit(Events.ERROR, Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.FRAG_PARSING_ERROR,
          fatal: false,
          levelRetry: recoverable,
          error: error,
          reason: reason
        });
        if (!recoverable) {
          return;
        }
      }
      initTrackConfig(track, this.observer, data, offset, this.audioCodec);
      var pts;
      if (pes.pts !== undefined) {
        pts = pes.pts;
      } else if (aacOverFlow) {
        // if last AAC frame is overflowing, we should ensure timestamps are contiguous:
        // first sample PTS should be equal to last sample PTS + frameDuration
        var frameDuration = getFrameDuration(track.samplerate);
        pts = aacOverFlow.sample.pts + frameDuration;
      } else {
        logger.warn('[tsdemuxer]: AAC PES unknown PTS');
        return;
      }

      // scan for aac samples
      var frameIndex = 0;
      var frame;
      while (offset < len) {
        frame = appendFrame$1(track, data, offset, pts, frameIndex);
        offset += frame.length;
        if (!frame.missing) {
          frameIndex++;
          for (; offset < len - 1; offset++) {
            if (isHeader$1(data, offset)) {
              break;
            }
          }
        } else {
          this.aacOverFlow = frame;
          break;
        }
      }
    };
    _proto.parseMPEGPES = function parseMPEGPES(track, pes) {
      var data = pes.data;
      var length = data.length;
      var frameIndex = 0;
      var offset = 0;
      var pts = pes.pts;
      if (pts === undefined) {
        logger.warn('[tsdemuxer]: MPEG PES unknown PTS');
        return;
      }
      while (offset < length) {
        if (isHeader(data, offset)) {
          var frame = appendFrame(track, data, offset, pts, frameIndex);
          if (frame) {
            offset += frame.length;
            frameIndex++;
          } else {
            // logger.log('Unable to parse Mpeg audio frame');
            break;
          }
        } else {
          // nothing found, keep looking
          offset++;
        }
      }
    };
    _proto.parseAC3PES = function parseAC3PES(track, pes) {
    };
    _proto.parseID3PES = function parseID3PES(id3Track, pes) {
      if (pes.pts === undefined) {
        logger.warn('[tsdemuxer]: ID3 PES unknown PTS');
        return;
      }
      var id3Sample = _extends({}, pes, {
        type: this._videoTrack ? MetadataSchema.emsg : MetadataSchema.audioId3,
        duration: Number.POSITIVE_INFINITY
      });
      id3Track.samples.push(id3Sample);
    };
    return TSDemuxer;
  }();
  function parsePID(data, offset) {
    // pid is a 13-bit field starting at the last bit of TS[1]
    return ((data[offset + 1] & 0x1f) << 8) + data[offset + 2];
  }
  function parsePAT(data, offset) {
    // skip the PSI header and parse the first PMT entry
    return (data[offset + 10] & 0x1f) << 8 | data[offset + 11];
  }
  function parsePMT(data, offset, typeSupported, isSampleAes) {
    var result = {
      audioPid: -1,
      videoPid: -1,
      id3Pid: -1,
      segmentVideoCodec: 'avc',
      segmentAudioCodec: 'aac'
    };
    var sectionLength = (data[offset + 1] & 0x0f) << 8 | data[offset + 2];
    var tableEnd = offset + 3 + sectionLength - 4;
    // to determine where the table is, we have to figure out how
    // long the program info descriptors are
    var programInfoLength = (data[offset + 10] & 0x0f) << 8 | data[offset + 11];
    // advance the offset to the first entry in the mapping table
    offset += 12 + programInfoLength;
    while (offset < tableEnd) {
      var pid = parsePID(data, offset);
      var esInfoLength = (data[offset + 3] & 0x0f) << 8 | data[offset + 4];
      switch (data[offset]) {
        case 0xcf:
          // SAMPLE-AES AAC
          if (!isSampleAes) {
            logEncryptedSamplesFoundInUnencryptedStream('ADTS AAC');
            break;
          }
        /* falls through */
        case 0x0f:
          // ISO/IEC 13818-7 ADTS AAC (MPEG-2 lower bit-rate audio)
          // logger.log('AAC PID:'  + pid);
          if (result.audioPid === -1) {
            result.audioPid = pid;
          }
          break;

        // Packetized metadata (ID3)
        case 0x15:
          // logger.log('ID3 PID:'  + pid);
          if (result.id3Pid === -1) {
            result.id3Pid = pid;
          }
          break;
        case 0xdb:
          // SAMPLE-AES AVC
          if (!isSampleAes) {
            logEncryptedSamplesFoundInUnencryptedStream('H.264');
            break;
          }
        /* falls through */
        case 0x1b:
          // ITU-T Rec. H.264 and ISO/IEC 14496-10 (lower bit-rate video)
          // logger.log('AVC PID:'  + pid);
          if (result.videoPid === -1) {
            result.videoPid = pid;
            result.segmentVideoCodec = 'avc';
          }
          break;

        // ISO/IEC 11172-3 (MPEG-1 audio)
        // or ISO/IEC 13818-3 (MPEG-2 halved sample rate audio)
        case 0x03:
        case 0x04:
          // logger.log('MPEG PID:'  + pid);
          if (!typeSupported.mpeg && !typeSupported.mp3) {
            logger.log('MPEG audio found, not supported in this browser');
          } else if (result.audioPid === -1) {
            result.audioPid = pid;
            result.segmentAudioCodec = 'mp3';
          }
          break;
        case 0xc1:
          // SAMPLE-AES AC3
          if (!isSampleAes) {
            logEncryptedSamplesFoundInUnencryptedStream('AC-3');
            break;
          }
        /* falls through */
        case 0x81:
          {
            logger.warn('AC-3 in M2TS support not included in build');
          }
          break;
        case 0x06:
          // stream_type 6 can mean a lot of different things in case of DVB.
          // We need to look at the descriptors. Right now, we're only interested
          // in AC-3 audio, so we do the descriptor parsing only when we don't have
          // an audio PID yet.
          if (result.audioPid === -1 && esInfoLength > 0) {
            var parsePos = offset + 5;
            var remaining = esInfoLength;
            while (remaining > 2) {
              var descriptorId = data[parsePos];
              switch (descriptorId) {
                case 0x6a:
                  // DVB Descriptor for AC-3
                  {
                    logger.warn('AC-3 in M2TS support not included in build');
                  }
                  break;
              }
              var descriptorLen = data[parsePos + 1] + 2;
              parsePos += descriptorLen;
              remaining -= descriptorLen;
            }
          }
          break;
        case 0xc2: // SAMPLE-AES EC3
        /* falls through */
        case 0x87:
          logger.warn('Unsupported EC-3 in M2TS found');
          break;
        case 0x24:
          logger.warn('Unsupported HEVC in M2TS found');
          break;
      }
      // move to the next table entry
      // skip past the elementary stream descriptors, if present
      offset += esInfoLength + 5;
    }
    return result;
  }
  function logEncryptedSamplesFoundInUnencryptedStream(type) {
    logger.log(type + " with AES-128-CBC encryption found in unencrypted stream");
  }
  function parsePES(stream) {
    var i = 0;
    var frag;
    var pesLen;
    var pesHdrLen;
    var pesPts;
    var pesDts;
    var data = stream.data;
    // safety check
    if (!stream || stream.size === 0) {
      return null;
    }

    // we might need up to 19 bytes to read PES header
    // if first chunk of data is less than 19 bytes, let's merge it with following ones until we get 19 bytes
    // usually only one merge is needed (and this is rare ...)
    while (data[0].length < 19 && data.length > 1) {
      data[0] = appendUint8Array(data[0], data[1]);
      data.splice(1, 1);
    }
    // retrieve PTS/DTS from first fragment
    frag = data[0];
    var pesPrefix = (frag[0] << 16) + (frag[1] << 8) + frag[2];
    if (pesPrefix === 1) {
      pesLen = (frag[4] << 8) + frag[5];
      // if PES parsed length is not zero and greater than total received length, stop parsing. PES might be truncated
      // minus 6 : PES header size
      if (pesLen && pesLen > stream.size - 6) {
        return null;
      }
      var pesFlags = frag[7];
      if (pesFlags & 0xc0) {
        /* PES header described here : http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
            as PTS / DTS is 33 bit we cannot use bitwise operator in JS,
            as Bitwise operators treat their operands as a sequence of 32 bits */
        pesPts = (frag[9] & 0x0e) * 536870912 +
        // 1 << 29
        (frag[10] & 0xff) * 4194304 +
        // 1 << 22
        (frag[11] & 0xfe) * 16384 +
        // 1 << 14
        (frag[12] & 0xff) * 128 +
        // 1 << 7
        (frag[13] & 0xfe) / 2;
        if (pesFlags & 0x40) {
          pesDts = (frag[14] & 0x0e) * 536870912 +
          // 1 << 29
          (frag[15] & 0xff) * 4194304 +
          // 1 << 22
          (frag[16] & 0xfe) * 16384 +
          // 1 << 14
          (frag[17] & 0xff) * 128 +
          // 1 << 7
          (frag[18] & 0xfe) / 2;
          if (pesPts - pesDts > 60 * 90000) {
            logger.warn(Math.round((pesPts - pesDts) / 90000) + "s delta between PTS and DTS, align them");
            pesPts = pesDts;
          }
        } else {
          pesDts = pesPts;
        }
      }
      pesHdrLen = frag[8];
      // 9 bytes : 6 bytes for PES header + 3 bytes for PES extension
      var payloadStartOffset = pesHdrLen + 9;
      if (stream.size <= payloadStartOffset) {
        return null;
      }
      stream.size -= payloadStartOffset;
      // reassemble PES packet
      var pesData = new Uint8Array(stream.size);
      for (var j = 0, dataLen = data.length; j < dataLen; j++) {
        frag = data[j];
        var len = frag.byteLength;
        if (payloadStartOffset) {
          if (payloadStartOffset > len) {
            // trim full frag if PES header bigger than frag
            payloadStartOffset -= len;
            continue;
          } else {
            // trim partial frag if PES header smaller than frag
            frag = frag.subarray(payloadStartOffset);
            len -= payloadStartOffset;
            payloadStartOffset = 0;
          }
        }
        pesData.set(frag, i);
        i += len;
      }
      if (pesLen) {
        // payload size : remove PES header + PES extension
        pesLen -= pesHdrLen + 3;
      }
      return {
        data: pesData,
        pts: pesPts,
        dts: pesDts,
        len: pesLen
      };
    }
    return null;
  }

  var MP3Demuxer = /*#__PURE__*/function (_BaseAudioDemuxer) {
    _inheritsLoose(MP3Demuxer, _BaseAudioDemuxer);
    function MP3Demuxer() {
      return _BaseAudioDemuxer.apply(this, arguments) || this;
    }
    var _proto = MP3Demuxer.prototype;
    _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, trackDuration) {
      _BaseAudioDemuxer.prototype.resetInitSegment.call(this, initSegment, audioCodec, videoCodec, trackDuration);
      this._audioTrack = {
        container: 'audio/mpeg',
        type: 'audio',
        id: 2,
        pid: -1,
        sequenceNumber: 0,
        segmentCodec: 'mp3',
        samples: [],
        manifestCodec: audioCodec,
        duration: trackDuration,
        inputTimeScale: 90000,
        dropped: 0
      };
    };
    MP3Demuxer.probe = function probe$1(data) {
      if (!data) {
        return false;
      }

      // check if data contains ID3 timestamp and MPEG sync word
      // Look for MPEG header | 1111 1111 | 111X XYZX | where X can be either 0 or 1 and Y or Z should be 1
      // Layer bits (position 14 and 15) in header should be always different from 0 (Layer I or Layer II or Layer III)
      // More info http://www.mp3-tech.org/programmer/frame_header.html
      var id3Data = getID3Data(data, 0);
      var offset = (id3Data == null ? void 0 : id3Data.length) || 0;

      // Check for ac-3|ec-3 sync bytes and return false if present
      if (id3Data && data[offset] === 0x0b && data[offset + 1] === 0x77 && getTimeStamp(id3Data) !== undefined &&
      // check the bsid to confirm ac-3 or ec-3 (not mp3)
      getAudioBSID(data, offset) <= 16) {
        return false;
      }
      for (var length = data.length; offset < length; offset++) {
        if (probe(data, offset)) {
          logger.log('MPEG Audio sync word found !');
          return true;
        }
      }
      return false;
    };
    _proto.canParse = function canParse$1(data, offset) {
      return canParse(data, offset);
    };
    _proto.appendFrame = function appendFrame$1(track, data, offset) {
      if (this.basePTS === null) {
        return;
      }
      return appendFrame(track, data, offset, this.basePTS, this.frameIndex);
    };
    return MP3Demuxer;
  }(BaseAudioDemuxer);

  /**
   *  AAC helper
   */
  var AAC = /*#__PURE__*/function () {
    function AAC() {}
    AAC.getSilentFrame = function getSilentFrame(codec, channelCount) {
      switch (codec) {
        case 'mp4a.40.2':
          if (channelCount === 1) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
          } else if (channelCount === 2) {
            return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
          } else if (channelCount === 3) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
          } else if (channelCount === 4) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
          } else if (channelCount === 5) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
          } else if (channelCount === 6) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
          }
          break;
        // handle HE-AAC below (mp4a.40.5 / mp4a.40.29)
        default:
          if (channelCount === 1) {
            // ffmpeg -y -f lavfi -i "aevalsrc=0:d=0.05" -c:a libfdk_aac -profile:a aac_he -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
            return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x4e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x1c, 0x6, 0xf1, 0xc1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
          } else if (channelCount === 2) {
            // ffmpeg -y -f lavfi -i "aevalsrc=0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
            return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
          } else if (channelCount === 3) {
            // ffmpeg -y -f lavfi -i "aevalsrc=0|0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
            return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
          }
          break;
      }
      return undefined;
    };
    return AAC;
  }();

  /**
   * Generate MP4 Box
   */

  var UINT32_MAX = Math.pow(2, 32) - 1;
  var MP4 = /*#__PURE__*/function () {
    function MP4() {}
    MP4.init = function init() {
      MP4.types = {
        avc1: [],
        // codingname
        avcC: [],
        btrt: [],
        dinf: [],
        dref: [],
        esds: [],
        ftyp: [],
        hdlr: [],
        mdat: [],
        mdhd: [],
        mdia: [],
        mfhd: [],
        minf: [],
        moof: [],
        moov: [],
        mp4a: [],
        '.mp3': [],
        dac3: [],
        'ac-3': [],
        mvex: [],
        mvhd: [],
        pasp: [],
        sdtp: [],
        stbl: [],
        stco: [],
        stsc: [],
        stsd: [],
        stsz: [],
        stts: [],
        tfdt: [],
        tfhd: [],
        traf: [],
        trak: [],
        trun: [],
        trex: [],
        tkhd: [],
        vmhd: [],
        smhd: []
      };
      var i;
      for (i in MP4.types) {
        if (MP4.types.hasOwnProperty(i)) {
          MP4.types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
        }
      }
      var videoHdlr = new Uint8Array([0x00,
      // version 0
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00, 0x00, 0x00,
      // pre_defined
      0x76, 0x69, 0x64, 0x65,
      // handler_type: 'vide'
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
      ]);
      var audioHdlr = new Uint8Array([0x00,
      // version 0
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00, 0x00, 0x00,
      // pre_defined
      0x73, 0x6f, 0x75, 0x6e,
      // handler_type: 'soun'
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
      ]);
      MP4.HDLR_TYPES = {
        video: videoHdlr,
        audio: audioHdlr
      };
      var dref = new Uint8Array([0x00,
      // version 0
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00, 0x00, 0x01,
      // entry_count
      0x00, 0x00, 0x00, 0x0c,
      // entry_size
      0x75, 0x72, 0x6c, 0x20,
      // 'url' type
      0x00,
      // version 0
      0x00, 0x00, 0x01 // entry_flags
      ]);
      var stco = new Uint8Array([0x00,
      // version
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      MP4.STTS = MP4.STSC = MP4.STCO = stco;
      MP4.STSZ = new Uint8Array([0x00,
      // version
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00, 0x00, 0x00,
      // sample_size
      0x00, 0x00, 0x00, 0x00 // sample_count
      ]);
      MP4.VMHD = new Uint8Array([0x00,
      // version
      0x00, 0x00, 0x01,
      // flags
      0x00, 0x00,
      // graphicsmode
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
      ]);
      MP4.SMHD = new Uint8Array([0x00,
      // version
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00,
      // balance
      0x00, 0x00 // reserved
      ]);
      MP4.STSD = new Uint8Array([0x00,
      // version 0
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00, 0x00, 0x01]); // entry_count

      var majorBrand = new Uint8Array([105, 115, 111, 109]); // isom
      var avc1Brand = new Uint8Array([97, 118, 99, 49]); // avc1
      var minorVersion = new Uint8Array([0, 0, 0, 1]);
      MP4.FTYP = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, avc1Brand);
      MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
    };
    MP4.box = function box(type) {
      var size = 8;
      for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }
      var i = payload.length;
      var len = i;
      // calculate the total size we need to allocate
      while (i--) {
        size += payload[i].byteLength;
      }
      var result = new Uint8Array(size);
      result[0] = size >> 24 & 0xff;
      result[1] = size >> 16 & 0xff;
      result[2] = size >> 8 & 0xff;
      result[3] = size & 0xff;
      result.set(type, 4);
      // copy the payload into the result
      for (i = 0, size = 8; i < len; i++) {
        // copy payload[i] array @ offset size
        result.set(payload[i], size);
        size += payload[i].byteLength;
      }
      return result;
    };
    MP4.hdlr = function hdlr(type) {
      return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type]);
    };
    MP4.mdat = function mdat(data) {
      return MP4.box(MP4.types.mdat, data);
    };
    MP4.mdhd = function mdhd(timescale, duration) {
      duration *= timescale;
      var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
      var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
      return MP4.box(MP4.types.mdhd, new Uint8Array([0x01,
      // version 1
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02,
      // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03,
      // modification_time
      timescale >> 24 & 0xff, timescale >> 16 & 0xff, timescale >> 8 & 0xff, timescale & 0xff,
      // timescale
      upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x55, 0xc4,
      // 'und' language (undetermined)
      0x00, 0x00]));
    };
    MP4.mdia = function mdia(track) {
      return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale, track.duration), MP4.hdlr(track.type), MP4.minf(track));
    };
    MP4.mfhd = function mfhd(sequenceNumber) {
      return MP4.box(MP4.types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00,
      // flags
      sequenceNumber >> 24, sequenceNumber >> 16 & 0xff, sequenceNumber >> 8 & 0xff, sequenceNumber & 0xff // sequence_number
      ]));
    };
    MP4.minf = function minf(track) {
      if (track.type === 'audio') {
        return MP4.box(MP4.types.minf, MP4.box(MP4.types.smhd, MP4.SMHD), MP4.DINF, MP4.stbl(track));
      } else {
        return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
      }
    };
    MP4.moof = function moof(sn, baseMediaDecodeTime, track) {
      return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track, baseMediaDecodeTime));
    };
    MP4.moov = function moov(tracks) {
      var i = tracks.length;
      var boxes = [];
      while (i--) {
        boxes[i] = MP4.trak(tracks[i]);
      }
      return MP4.box.apply(null, [MP4.types.moov, MP4.mvhd(tracks[0].timescale, tracks[0].duration)].concat(boxes).concat(MP4.mvex(tracks)));
    };
    MP4.mvex = function mvex(tracks) {
      var i = tracks.length;
      var boxes = [];
      while (i--) {
        boxes[i] = MP4.trex(tracks[i]);
      }
      return MP4.box.apply(null, [MP4.types.mvex].concat(boxes));
    };
    MP4.mvhd = function mvhd(timescale, duration) {
      duration *= timescale;
      var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
      var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
      var bytes = new Uint8Array([0x01,
      // version 1
      0x00, 0x00, 0x00,
      // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02,
      // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03,
      // modification_time
      timescale >> 24 & 0xff, timescale >> 16 & 0xff, timescale >> 8 & 0xff, timescale & 0xff,
      // timescale
      upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x00, 0x01, 0x00, 0x00,
      // 1.0 rate
      0x01, 0x00,
      // 1.0 volume
      0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00,
      // transformation: unity matrix
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // pre_defined
      0xff, 0xff, 0xff, 0xff // next_track_ID
      ]);
      return MP4.box(MP4.types.mvhd, bytes);
    };
    MP4.sdtp = function sdtp(track) {
      var samples = track.samples || [];
      var bytes = new Uint8Array(4 + samples.length);
      var i;
      var flags;
      // leave the full box header (4 bytes) all zero
      // write the sample table
      for (i = 0; i < samples.length; i++) {
        flags = samples[i].flags;
        bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
      }
      return MP4.box(MP4.types.sdtp, bytes);
    };
    MP4.stbl = function stbl(track) {
      return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
    };
    MP4.avc1 = function avc1(track) {
      var sps = [];
      var pps = [];
      var i;
      var data;
      var len;
      // assemble the SPSs

      for (i = 0; i < track.sps.length; i++) {
        data = track.sps[i];
        len = data.byteLength;
        sps.push(len >>> 8 & 0xff);
        sps.push(len & 0xff);

        // SPS
        sps = sps.concat(Array.prototype.slice.call(data));
      }

      // assemble the PPSs
      for (i = 0; i < track.pps.length; i++) {
        data = track.pps[i];
        len = data.byteLength;
        pps.push(len >>> 8 & 0xff);
        pps.push(len & 0xff);
        pps = pps.concat(Array.prototype.slice.call(data));
      }
      var avcc = MP4.box(MP4.types.avcC, new Uint8Array([0x01,
      // version
      sps[3],
      // profile
      sps[4],
      // profile compat
      sps[5],
      // level
      0xfc | 3,
      // lengthSizeMinusOne, hard-coded to 4 bytes
      0xe0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
      ].concat(sps).concat([track.pps.length // numOfPictureParameterSets
      ]).concat(pps))); // "PPS"
      var width = track.width;
      var height = track.height;
      var hSpacing = track.pixelRatio[0];
      var vSpacing = track.pixelRatio[1];
      return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00,
      // reserved
      0x00, 0x01,
      // data_reference_index
      0x00, 0x00,
      // pre_defined
      0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // pre_defined
      width >> 8 & 0xff, width & 0xff,
      // width
      height >> 8 & 0xff, height & 0xff,
      // height
      0x00, 0x48, 0x00, 0x00,
      // horizresolution
      0x00, 0x48, 0x00, 0x00,
      // vertresolution
      0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, 0x01,
      // frame_count
      0x12, 0x64, 0x61, 0x69, 0x6c,
      // dailymotion/hls.js
      0x79, 0x6d, 0x6f, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x68, 0x6c, 0x73, 0x2e, 0x6a, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // compressorname
      0x00, 0x18,
      // depth = 24
      0x11, 0x11]),
      // pre_defined = -1
      avcc, MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80,
      // bufferSizeDB
      0x00, 0x2d, 0xc6, 0xc0,
      // maxBitrate
      0x00, 0x2d, 0xc6, 0xc0])),
      // avgBitrate
      MP4.box(MP4.types.pasp, new Uint8Array([hSpacing >> 24,
      // hSpacing
      hSpacing >> 16 & 0xff, hSpacing >> 8 & 0xff, hSpacing & 0xff, vSpacing >> 24,
      // vSpacing
      vSpacing >> 16 & 0xff, vSpacing >> 8 & 0xff, vSpacing & 0xff])));
    };
    MP4.esds = function esds(track) {
      var configlen = track.config.length;
      return new Uint8Array([0x00,
      // version 0
      0x00, 0x00, 0x00,
      // flags

      0x03,
      // descriptor_type
      0x17 + configlen,
      // length
      0x00, 0x01,
      // es_id
      0x00,
      // stream_priority

      0x04,
      // descriptor_type
      0x0f + configlen,
      // length
      0x40,
      // codec : mpeg4_audio
      0x15,
      // stream_type
      0x00, 0x00, 0x00,
      // buffer_size
      0x00, 0x00, 0x00, 0x00,
      // maxBitrate
      0x00, 0x00, 0x00, 0x00,
      // avgBitrate

      0x05 // descriptor_type
      ].concat([configlen]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
    };
    MP4.audioStsd = function audioStsd(track) {
      var samplerate = track.samplerate;
      return new Uint8Array([0x00, 0x00, 0x00,
      // reserved
      0x00, 0x00, 0x00,
      // reserved
      0x00, 0x01,
      // data_reference_index
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, track.channelCount,
      // channelcount
      0x00, 0x10,
      // sampleSize:16bits
      0x00, 0x00, 0x00, 0x00,
      // reserved2
      samplerate >> 8 & 0xff, samplerate & 0xff,
      //
      0x00, 0x00]);
    };
    MP4.mp4a = function mp4a(track) {
      return MP4.box(MP4.types.mp4a, MP4.audioStsd(track), MP4.box(MP4.types.esds, MP4.esds(track)));
    };
    MP4.mp3 = function mp3(track) {
      return MP4.box(MP4.types['.mp3'], MP4.audioStsd(track));
    };
    MP4.ac3 = function ac3(track) {
      return MP4.box(MP4.types['ac-3'], MP4.audioStsd(track), MP4.box(MP4.types.dac3, track.config));
    };
    MP4.stsd = function stsd(track) {
      if (track.type === 'audio') {
        if (track.segmentCodec === 'mp3' && track.codec === 'mp3') {
          return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp3(track));
        }
        if (track.segmentCodec === 'ac3') {
          return MP4.box(MP4.types.stsd, MP4.STSD, MP4.ac3(track));
        }
        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track));
      } else {
        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
      }
    };
    MP4.tkhd = function tkhd(track) {
      var id = track.id;
      var duration = track.duration * track.timescale;
      var width = track.width;
      var height = track.height;
      var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
      var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
      return MP4.box(MP4.types.tkhd, new Uint8Array([0x01,
      // version 1
      0x00, 0x00, 0x07,
      // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02,
      // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03,
      // modification_time
      id >> 24 & 0xff, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff,
      // track_ID
      0x00, 0x00, 0x00, 0x00,
      // reserved
      upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // reserved
      0x00, 0x00,
      // layer
      0x00, 0x00,
      // alternate_group
      0x00, 0x00,
      // non-audio track volume
      0x00, 0x00,
      // reserved
      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00,
      // transformation: unity matrix
      width >> 8 & 0xff, width & 0xff, 0x00, 0x00,
      // width
      height >> 8 & 0xff, height & 0xff, 0x00, 0x00 // height
      ]));
    };
    MP4.traf = function traf(track, baseMediaDecodeTime) {
      var sampleDependencyTable = MP4.sdtp(track);
      var id = track.id;
      var upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1));
      var lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
      return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00,
      // version 0
      0x00, 0x00, 0x00,
      // flags
      id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff // track_ID
      ])), MP4.box(MP4.types.tfdt, new Uint8Array([0x01,
      // version 1
      0x00, 0x00, 0x00,
      // flags
      upperWordBaseMediaDecodeTime >> 24, upperWordBaseMediaDecodeTime >> 16 & 0xff, upperWordBaseMediaDecodeTime >> 8 & 0xff, upperWordBaseMediaDecodeTime & 0xff, lowerWordBaseMediaDecodeTime >> 24, lowerWordBaseMediaDecodeTime >> 16 & 0xff, lowerWordBaseMediaDecodeTime >> 8 & 0xff, lowerWordBaseMediaDecodeTime & 0xff])), MP4.trun(track, sampleDependencyTable.length + 16 +
      // tfhd
      20 +
      // tfdt
      8 +
      // traf header
      16 +
      // mfhd
      8 +
      // moof header
      8),
      // mdat header
      sampleDependencyTable);
    }

    /**
     * Generate a track box.
     * @param track a track definition
     */;
    MP4.trak = function trak(track) {
      track.duration = track.duration || 0xffffffff;
      return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
    };
    MP4.trex = function trex(track) {
      var id = track.id;
      return MP4.box(MP4.types.trex, new Uint8Array([0x00,
      // version 0
      0x00, 0x00, 0x00,
      // flags
      id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff,
      // track_ID
      0x00, 0x00, 0x00, 0x01,
      // default_sample_description_index
      0x00, 0x00, 0x00, 0x00,
      // default_sample_duration
      0x00, 0x00, 0x00, 0x00,
      // default_sample_size
      0x00, 0x01, 0x00, 0x01 // default_sample_flags
      ]));
    };
    MP4.trun = function trun(track, offset) {
      var samples = track.samples || [];
      var len = samples.length;
      var arraylen = 12 + 16 * len;
      var array = new Uint8Array(arraylen);
      var i;
      var sample;
      var duration;
      var size;
      var flags;
      var cts;
      offset += 8 + arraylen;
      array.set([track.type === 'video' ? 0x01 : 0x00,
      // version 1 for video with signed-int sample_composition_time_offset
      0x00, 0x0f, 0x01,
      // flags
      len >>> 24 & 0xff, len >>> 16 & 0xff, len >>> 8 & 0xff, len & 0xff,
      // sample_count
      offset >>> 24 & 0xff, offset >>> 16 & 0xff, offset >>> 8 & 0xff, offset & 0xff // data_offset
      ], 0);
      for (i = 0; i < len; i++) {
        sample = samples[i];
        duration = sample.duration;
        size = sample.size;
        flags = sample.flags;
        cts = sample.cts;
        array.set([duration >>> 24 & 0xff, duration >>> 16 & 0xff, duration >>> 8 & 0xff, duration & 0xff,
        // sample_duration
        size >>> 24 & 0xff, size >>> 16 & 0xff, size >>> 8 & 0xff, size & 0xff,
        // sample_size
        flags.isLeading << 2 | flags.dependsOn, flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.paddingValue << 1 | flags.isNonSync, flags.degradPrio & 0xf0 << 8, flags.degradPrio & 0x0f,
        // sample_flags
        cts >>> 24 & 0xff, cts >>> 16 & 0xff, cts >>> 8 & 0xff, cts & 0xff // sample_composition_time_offset
        ], 12 + 16 * i);
      }
      return MP4.box(MP4.types.trun, array);
    };
    MP4.initSegment = function initSegment(tracks) {
      if (!MP4.types) {
        MP4.init();
      }
      var movie = MP4.moov(tracks);
      var result = appendUint8Array(MP4.FTYP, movie);
      return result;
    };
    return MP4;
  }();
  MP4.types = void 0;
  MP4.HDLR_TYPES = void 0;
  MP4.STTS = void 0;
  MP4.STSC = void 0;
  MP4.STCO = void 0;
  MP4.STSZ = void 0;
  MP4.VMHD = void 0;
  MP4.SMHD = void 0;
  MP4.STSD = void 0;
  MP4.FTYP = void 0;
  MP4.DINF = void 0;

  var MPEG_TS_CLOCK_FREQ_HZ = 90000;
  function toTimescaleFromBase(baseTime, destScale, srcBase, round) {
    if (srcBase === void 0) {
      srcBase = 1;
    }
    if (round === void 0) {
      round = false;
    }
    var result = baseTime * destScale * srcBase; // equivalent to `(value * scale) / (1 / base)`
    return round ? Math.round(result) : result;
  }
  function toMsFromMpegTsClock(baseTime, round) {
    if (round === void 0) {
      round = false;
    }
    return toTimescaleFromBase(baseTime, 1000, 1 / MPEG_TS_CLOCK_FREQ_HZ, round);
  }

  var MAX_SILENT_FRAME_DURATION = 10 * 1000; // 10 seconds
  var AAC_SAMPLES_PER_FRAME = 1024;
  var MPEG_AUDIO_SAMPLE_PER_FRAME = 1152;
  var AC3_SAMPLES_PER_FRAME = 1536;
  var chromeVersion = null;
  var safariWebkitVersion = null;
  var MP4Remuxer = /*#__PURE__*/function () {
    function MP4Remuxer(observer, config, typeSupported, vendor) {
      this.observer = void 0;
      this.config = void 0;
      this.typeSupported = void 0;
      this.ISGenerated = false;
      this._initPTS = null;
      this._initDTS = null;
      this.nextAvcDts = null;
      this.nextAudioPts = null;
      this.videoSampleDuration = null;
      this.isAudioContiguous = false;
      this.isVideoContiguous = false;
      this.videoTrackConfig = void 0;
      this.observer = observer;
      this.config = config;
      this.typeSupported = typeSupported;
      this.ISGenerated = false;
      if (chromeVersion === null) {
        var userAgent = navigator.userAgent || '';
        var result = userAgent.match(/Chrome\/(\d+)/i);
        chromeVersion = result ? parseInt(result[1]) : 0;
      }
      if (safariWebkitVersion === null) {
        var _result = navigator.userAgent.match(/Safari\/(\d+)/i);
        safariWebkitVersion = _result ? parseInt(_result[1]) : 0;
      }
    }
    var _proto = MP4Remuxer.prototype;
    _proto.destroy = function destroy() {
      // @ts-ignore
      this.config = this.videoTrackConfig = this._initPTS = this._initDTS = null;
    };
    _proto.resetTimeStamp = function resetTimeStamp(defaultTimeStamp) {
      logger.log('[mp4-remuxer]: initPTS & initDTS reset');
      this._initPTS = this._initDTS = defaultTimeStamp;
    };
    _proto.resetNextTimestamp = function resetNextTimestamp() {
      logger.log('[mp4-remuxer]: reset next timestamp');
      this.isVideoContiguous = false;
      this.isAudioContiguous = false;
    };
    _proto.resetInitSegment = function resetInitSegment() {
      logger.log('[mp4-remuxer]: ISGenerated flag reset');
      this.ISGenerated = false;
      this.videoTrackConfig = undefined;
    };
    _proto.getVideoStartPts = function getVideoStartPts(videoSamples) {
      var rolloverDetected = false;
      var startPTS = videoSamples.reduce(function (minPTS, sample) {
        var delta = sample.pts - minPTS;
        if (delta < -4294967296) {
          // 2^32, see PTSNormalize for reasoning, but we're hitting a rollover here, and we don't want that to impact the timeOffset calculation
          rolloverDetected = true;
          return normalizePts(minPTS, sample.pts);
        } else if (delta > 0) {
          return minPTS;
        } else {
          return sample.pts;
        }
      }, videoSamples[0].pts);
      if (rolloverDetected) {
        logger.debug('PTS rollover detected');
      }
      return startPTS;
    };
    _proto.remux = function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, accurateTimeOffset, flush, playlistType) {
      var video;
      var audio;
      var initSegment;
      var text;
      var id3;
      var independent;
      var audioTimeOffset = timeOffset;
      var videoTimeOffset = timeOffset;

      // If we're remuxing audio and video progressively, wait until we've received enough samples for each track before proceeding.
      // This is done to synchronize the audio and video streams. We know if the current segment will have samples if the "pid"
      // parameter is greater than -1. The pid is set when the PMT is parsed, which contains the tracks list.
      // However, if the initSegment has already been generated, or we've reached the end of a segment (flush),
      // then we can remux one track without waiting for the other.
      var hasAudio = audioTrack.pid > -1;
      var hasVideo = videoTrack.pid > -1;
      var length = videoTrack.samples.length;
      var enoughAudioSamples = audioTrack.samples.length > 0;
      var enoughVideoSamples = flush && length > 0 || length > 1;
      var canRemuxAvc = (!hasAudio || enoughAudioSamples) && (!hasVideo || enoughVideoSamples) || this.ISGenerated || flush;
      if (canRemuxAvc) {
        if (this.ISGenerated) {
          var _videoTrack$pixelRati, _config$pixelRatio, _videoTrack$pixelRati2, _config$pixelRatio2;
          var config = this.videoTrackConfig;
          if (config && (videoTrack.width !== config.width || videoTrack.height !== config.height || ((_videoTrack$pixelRati = videoTrack.pixelRatio) == null ? void 0 : _videoTrack$pixelRati[0]) !== ((_config$pixelRatio = config.pixelRatio) == null ? void 0 : _config$pixelRatio[0]) || ((_videoTrack$pixelRati2 = videoTrack.pixelRatio) == null ? void 0 : _videoTrack$pixelRati2[1]) !== ((_config$pixelRatio2 = config.pixelRatio) == null ? void 0 : _config$pixelRatio2[1]))) {
            this.resetInitSegment();
          }
        } else {
          initSegment = this.generateIS(audioTrack, videoTrack, timeOffset, accurateTimeOffset);
        }
        var isVideoContiguous = this.isVideoContiguous;
        var firstKeyFrameIndex = -1;
        var firstKeyFramePTS;
        if (enoughVideoSamples) {
          firstKeyFrameIndex = findKeyframeIndex(videoTrack.samples);
          if (!isVideoContiguous && this.config.forceKeyFrameOnDiscontinuity) {
            independent = true;
            if (firstKeyFrameIndex > 0) {
              logger.warn("[mp4-remuxer]: Dropped " + firstKeyFrameIndex + " out of " + length + " video samples due to a missing keyframe");
              var startPTS = this.getVideoStartPts(videoTrack.samples);
              videoTrack.samples = videoTrack.samples.slice(firstKeyFrameIndex);
              videoTrack.dropped += firstKeyFrameIndex;
              videoTimeOffset += (videoTrack.samples[0].pts - startPTS) / videoTrack.inputTimeScale;
              firstKeyFramePTS = videoTimeOffset;
            } else if (firstKeyFrameIndex === -1) {
              logger.warn("[mp4-remuxer]: No keyframe found out of " + length + " video samples");
              independent = false;
            }
          }
        }
        if (this.ISGenerated) {
          if (enoughAudioSamples && enoughVideoSamples) {
            // timeOffset is expected to be the offset of the first timestamp of this fragment (first DTS)
            // if first audio DTS is not aligned with first video DTS then we need to take that into account
            // when providing timeOffset to remuxAudio / remuxVideo. if we don't do that, there might be a permanent / small
            // drift between audio and video streams
            var _startPTS = this.getVideoStartPts(videoTrack.samples);
            var tsDelta = normalizePts(audioTrack.samples[0].pts, _startPTS) - _startPTS;
            var audiovideoTimestampDelta = tsDelta / videoTrack.inputTimeScale;
            audioTimeOffset += Math.max(0, audiovideoTimestampDelta);
            videoTimeOffset += Math.max(0, -audiovideoTimestampDelta);
          }

          // Purposefully remuxing audio before video, so that remuxVideo can use nextAudioPts, which is calculated in remuxAudio.
          if (enoughAudioSamples) {
            // if initSegment was generated without audio samples, regenerate it again
            if (!audioTrack.samplerate) {
              logger.warn('[mp4-remuxer]: regenerate InitSegment as audio detected');
              initSegment = this.generateIS(audioTrack, videoTrack, timeOffset, accurateTimeOffset);
            }
            audio = this.remuxAudio(audioTrack, audioTimeOffset, this.isAudioContiguous, accurateTimeOffset, hasVideo || enoughVideoSamples || playlistType === PlaylistLevelType.AUDIO ? videoTimeOffset : undefined);
            if (enoughVideoSamples) {
              var audioTrackLength = audio ? audio.endPTS - audio.startPTS : 0;
              // if initSegment was generated without video samples, regenerate it again
              if (!videoTrack.inputTimeScale) {
                logger.warn('[mp4-remuxer]: regenerate InitSegment as video detected');
                initSegment = this.generateIS(audioTrack, videoTrack, timeOffset, accurateTimeOffset);
              }
              video = this.remuxVideo(videoTrack, videoTimeOffset, isVideoContiguous, audioTrackLength);
            }
          } else if (enoughVideoSamples) {
            video = this.remuxVideo(videoTrack, videoTimeOffset, isVideoContiguous, 0);
          }
          if (video) {
            video.firstKeyFrame = firstKeyFrameIndex;
            video.independent = firstKeyFrameIndex !== -1;
            video.firstKeyFramePTS = firstKeyFramePTS;
          }
        }
      }

      // Allow ID3 and text to remux, even if more audio/video samples are required
      if (this.ISGenerated && this._initPTS && this._initDTS) {
        if (id3Track.samples.length) {
          id3 = flushTextTrackMetadataCueSamples(id3Track, timeOffset, this._initPTS, this._initDTS);
        }
        if (textTrack.samples.length) {
          text = flushTextTrackUserdataCueSamples(textTrack, timeOffset, this._initPTS);
        }
      }
      return {
        audio: audio,
        video: video,
        initSegment: initSegment,
        independent: independent,
        text: text,
        id3: id3
      };
    };
    _proto.generateIS = function generateIS(audioTrack, videoTrack, timeOffset, accurateTimeOffset) {
      var audioSamples = audioTrack.samples;
      var videoSamples = videoTrack.samples;
      var typeSupported = this.typeSupported;
      var tracks = {};
      var _initPTS = this._initPTS;
      var computePTSDTS = !_initPTS || accurateTimeOffset;
      var container = 'audio/mp4';
      var initPTS;
      var initDTS;
      var timescale;
      if (computePTSDTS) {
        initPTS = initDTS = Infinity;
      }
      if (audioTrack.config && audioSamples.length) {
        // let's use audio sampling rate as MP4 time scale.
        // rationale is that there is a integer nb of audio frames per audio sample (1024 for AAC)
        // using audio sampling rate here helps having an integer MP4 frame duration
        // this avoids potential rounding issue and AV sync issue
        audioTrack.timescale = audioTrack.samplerate;
        switch (audioTrack.segmentCodec) {
          case 'mp3':
            if (typeSupported.mpeg) {
              // Chrome and Safari
              container = 'audio/mpeg';
              audioTrack.codec = '';
            } else if (typeSupported.mp3) {
              // Firefox
              audioTrack.codec = 'mp3';
            }
            break;
          case 'ac3':
            audioTrack.codec = 'ac-3';
            break;
        }
        tracks.audio = {
          id: 'audio',
          container: container,
          codec: audioTrack.codec,
          initSegment: audioTrack.segmentCodec === 'mp3' && typeSupported.mpeg ? new Uint8Array(0) : MP4.initSegment([audioTrack]),
          metadata: {
            channelCount: audioTrack.channelCount
          }
        };
        if (computePTSDTS) {
          timescale = audioTrack.inputTimeScale;
          if (!_initPTS || timescale !== _initPTS.timescale) {
            // remember first PTS of this demuxing context. for audio, PTS = DTS
            initPTS = initDTS = audioSamples[0].pts - Math.round(timescale * timeOffset);
          } else {
            computePTSDTS = false;
          }
        }
      }
      if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
        // let's use input time scale as MP4 video timescale
        // we use input time scale straight away to avoid rounding issues on frame duration / cts computation
        videoTrack.timescale = videoTrack.inputTimeScale;
        tracks.video = {
          id: 'main',
          container: 'video/mp4',
          codec: videoTrack.codec,
          initSegment: MP4.initSegment([videoTrack]),
          metadata: {
            width: videoTrack.width,
            height: videoTrack.height
          }
        };
        if (computePTSDTS) {
          timescale = videoTrack.inputTimeScale;
          if (!_initPTS || timescale !== _initPTS.timescale) {
            var startPTS = this.getVideoStartPts(videoSamples);
            var startOffset = Math.round(timescale * timeOffset);
            initDTS = Math.min(initDTS, normalizePts(videoSamples[0].dts, startPTS) - startOffset);
            initPTS = Math.min(initPTS, startPTS - startOffset);
          } else {
            computePTSDTS = false;
          }
        }
        this.videoTrackConfig = {
          width: videoTrack.width,
          height: videoTrack.height,
          pixelRatio: videoTrack.pixelRatio
        };
      }
      if (Object.keys(tracks).length) {
        this.ISGenerated = true;
        if (computePTSDTS) {
          this._initPTS = {
            baseTime: initPTS,
            timescale: timescale
          };
          this._initDTS = {
            baseTime: initDTS,
            timescale: timescale
          };
        } else {
          initPTS = timescale = undefined;
        }
        return {
          tracks: tracks,
          initPTS: initPTS,
          timescale: timescale
        };
      }
    };
    _proto.remuxVideo = function remuxVideo(track, timeOffset, contiguous, audioTrackLength) {
      var timeScale = track.inputTimeScale;
      var inputSamples = track.samples;
      var outputSamples = [];
      var nbSamples = inputSamples.length;
      var initPTS = this._initPTS;
      var nextAvcDts = this.nextAvcDts;
      var offset = 8;
      var mp4SampleDuration = this.videoSampleDuration;
      var firstDTS;
      var lastDTS;
      var minPTS = Number.POSITIVE_INFINITY;
      var maxPTS = Number.NEGATIVE_INFINITY;
      var sortSamples = false;

      // if parsed fragment is contiguous with last one, let's use last DTS value as reference
      if (!contiguous || nextAvcDts === null) {
        var pts = timeOffset * timeScale;
        var cts = inputSamples[0].pts - normalizePts(inputSamples[0].dts, inputSamples[0].pts);
        if (chromeVersion && nextAvcDts !== null && Math.abs(pts - cts - nextAvcDts) < 15000) {
          // treat as contigous to adjust samples that would otherwise produce video buffer gaps in Chrome
          contiguous = true;
        } else {
          // if not contiguous, let's use target timeOffset
          nextAvcDts = pts - cts;
        }
      }

      // PTS is coded on 33bits, and can loop from -2^32 to 2^32
      // PTSNormalize will make PTS/DTS value monotonic, we use last known DTS value as reference value
      var initTime = initPTS.baseTime * timeScale / initPTS.timescale;
      for (var i = 0; i < nbSamples; i++) {
        var sample = inputSamples[i];
        sample.pts = normalizePts(sample.pts - initTime, nextAvcDts);
        sample.dts = normalizePts(sample.dts - initTime, nextAvcDts);
        if (sample.dts < inputSamples[i > 0 ? i - 1 : i].dts) {
          sortSamples = true;
        }
      }

      // sort video samples by DTS then PTS then demux id order
      if (sortSamples) {
        inputSamples.sort(function (a, b) {
          var deltadts = a.dts - b.dts;
          var deltapts = a.pts - b.pts;
          return deltadts || deltapts;
        });
      }

      // Get first/last DTS
      firstDTS = inputSamples[0].dts;
      lastDTS = inputSamples[inputSamples.length - 1].dts;

      // Sample duration (as expected by trun MP4 boxes), should be the delta between sample DTS
      // set this constant duration as being the avg delta between consecutive DTS.
      var inputDuration = lastDTS - firstDTS;
      var averageSampleDuration = inputDuration ? Math.round(inputDuration / (nbSamples - 1)) : mp4SampleDuration || track.inputTimeScale / 30;

      // if fragment are contiguous, detect hole/overlapping between fragments
      if (contiguous) {
        // check timestamp continuity across consecutive fragments (this is to remove inter-fragment gap/hole)
        var delta = firstDTS - nextAvcDts;
        var foundHole = delta > averageSampleDuration;
        var foundOverlap = delta < -1;
        if (foundHole || foundOverlap) {
          if (foundHole) {
            logger.warn("AVC: " + toMsFromMpegTsClock(delta, true) + " ms (" + delta + "dts) hole between fragments detected at " + timeOffset.toFixed(3));
          } else {
            logger.warn("AVC: " + toMsFromMpegTsClock(-delta, true) + " ms (" + delta + "dts) overlapping between fragments detected at " + timeOffset.toFixed(3));
          }
          if (!foundOverlap || nextAvcDts >= inputSamples[0].pts || chromeVersion) {
            firstDTS = nextAvcDts;
            var firstPTS = inputSamples[0].pts - delta;
            if (foundHole) {
              inputSamples[0].dts = firstDTS;
              inputSamples[0].pts = firstPTS;
            } else {
              for (var _i = 0; _i < inputSamples.length; _i++) {
                if (inputSamples[_i].dts > firstPTS) {
                  break;
                }
                inputSamples[_i].dts -= delta;
                inputSamples[_i].pts -= delta;
              }
            }
            logger.log("Video: Initial PTS/DTS adjusted: " + toMsFromMpegTsClock(firstPTS, true) + "/" + toMsFromMpegTsClock(firstDTS, true) + ", delta: " + toMsFromMpegTsClock(delta, true) + " ms");
          }
        }
      }
      firstDTS = Math.max(0, firstDTS);
      var nbNalu = 0;
      var naluLen = 0;
      var dtsStep = firstDTS;
      for (var _i2 = 0; _i2 < nbSamples; _i2++) {
        // compute total/avc sample length and nb of NAL units
        var _sample = inputSamples[_i2];
        var units = _sample.units;
        var nbUnits = units.length;
        var sampleLen = 0;
        for (var j = 0; j < nbUnits; j++) {
          sampleLen += units[j].data.length;
        }
        naluLen += sampleLen;
        nbNalu += nbUnits;
        _sample.length = sampleLen;

        // ensure sample monotonic DTS
        if (_sample.dts < dtsStep) {
          _sample.dts = dtsStep;
          dtsStep += averageSampleDuration / 4 | 0 || 1;
        } else {
          dtsStep = _sample.dts;
        }
        minPTS = Math.min(_sample.pts, minPTS);
        maxPTS = Math.max(_sample.pts, maxPTS);
      }
      lastDTS = inputSamples[nbSamples - 1].dts;

      /* concatenate the video data and construct the mdat in place
        (need 8 more bytes to fill length and mpdat type) */
      var mdatSize = naluLen + 4 * nbNalu + 8;
      var mdat;
      try {
        mdat = new Uint8Array(mdatSize);
      } catch (err) {
        this.observer.emit(Events.ERROR, Events.ERROR, {
          type: ErrorTypes.MUX_ERROR,
          details: ErrorDetails.REMUX_ALLOC_ERROR,
          fatal: false,
          error: err,
          bytes: mdatSize,
          reason: "fail allocating video mdat " + mdatSize
        });
        return;
      }
      var view = new DataView(mdat.buffer);
      view.setUint32(0, mdatSize);
      mdat.set(MP4.types.mdat, 4);
      var stretchedLastFrame = false;
      var minDtsDelta = Number.POSITIVE_INFINITY;
      var minPtsDelta = Number.POSITIVE_INFINITY;
      var maxDtsDelta = Number.NEGATIVE_INFINITY;
      var maxPtsDelta = Number.NEGATIVE_INFINITY;
      for (var _i3 = 0; _i3 < nbSamples; _i3++) {
        var _VideoSample = inputSamples[_i3];
        var VideoSampleUnits = _VideoSample.units;
        var mp4SampleLength = 0;
        // convert NALU bitstream to MP4 format (prepend NALU with size field)
        for (var _j = 0, _nbUnits = VideoSampleUnits.length; _j < _nbUnits; _j++) {
          var unit = VideoSampleUnits[_j];
          var unitData = unit.data;
          var unitDataLen = unit.data.byteLength;
          view.setUint32(offset, unitDataLen);
          offset += 4;
          mdat.set(unitData, offset);
          offset += unitDataLen;
          mp4SampleLength += 4 + unitDataLen;
        }

        // expected sample duration is the Decoding Timestamp diff of consecutive samples
        var ptsDelta = void 0;
        if (_i3 < nbSamples - 1) {
          mp4SampleDuration = inputSamples[_i3 + 1].dts - _VideoSample.dts;
          ptsDelta = inputSamples[_i3 + 1].pts - _VideoSample.pts;
        } else {
          var config = this.config;
          var lastFrameDuration = _i3 > 0 ? _VideoSample.dts - inputSamples[_i3 - 1].dts : averageSampleDuration;
          ptsDelta = _i3 > 0 ? _VideoSample.pts - inputSamples[_i3 - 1].pts : averageSampleDuration;
          if (config.stretchShortVideoTrack && this.nextAudioPts !== null) {
            // In some cases, a segment's audio track duration may exceed the video track duration.
            // Since we've already remuxed audio, and we know how long the audio track is, we look to
            // see if the delta to the next segment is longer than maxBufferHole.
            // If so, playback would potentially get stuck, so we artificially inflate
            // the duration of the last frame to minimize any potential gap between segments.
            var gapTolerance = Math.floor(config.maxBufferHole * timeScale);
            var deltaToFrameEnd = (audioTrackLength ? minPTS + audioTrackLength * timeScale : this.nextAudioPts) - _VideoSample.pts;
            if (deltaToFrameEnd > gapTolerance) {
              // We subtract lastFrameDuration from deltaToFrameEnd to try to prevent any video
              // frame overlap. maxBufferHole should be >> lastFrameDuration anyway.
              mp4SampleDuration = deltaToFrameEnd - lastFrameDuration;
              if (mp4SampleDuration < 0) {
                mp4SampleDuration = lastFrameDuration;
              } else {
                stretchedLastFrame = true;
              }
              logger.log("[mp4-remuxer]: It is approximately " + deltaToFrameEnd / 90 + " ms to the next segment; using duration " + mp4SampleDuration / 90 + " ms for the last video frame.");
            } else {
              mp4SampleDuration = lastFrameDuration;
            }
          } else {
            mp4SampleDuration = lastFrameDuration;
          }
        }
        var compositionTimeOffset = Math.round(_VideoSample.pts - _VideoSample.dts);
        minDtsDelta = Math.min(minDtsDelta, mp4SampleDuration);
        maxDtsDelta = Math.max(maxDtsDelta, mp4SampleDuration);
        minPtsDelta = Math.min(minPtsDelta, ptsDelta);
        maxPtsDelta = Math.max(maxPtsDelta, ptsDelta);
        outputSamples.push(new Mp4Sample(_VideoSample.key, mp4SampleDuration, mp4SampleLength, compositionTimeOffset));
      }
      if (outputSamples.length) {
        if (chromeVersion) {
          if (chromeVersion < 70) {
            // Chrome workaround, mark first sample as being a Random Access Point (keyframe) to avoid sourcebuffer append issue
            // https://code.google.com/p/chromium/issues/detail?id=229412
            var flags = outputSamples[0].flags;
            flags.dependsOn = 2;
            flags.isNonSync = 0;
          }
        } else if (safariWebkitVersion) {
          // Fix for "CNN special report, with CC" in test-streams (Safari browser only)
          // Ignore DTS when frame durations are irregular. Safari MSE does not handle this leading to gaps.
          if (maxPtsDelta - minPtsDelta < maxDtsDelta - minDtsDelta && averageSampleDuration / maxDtsDelta < 0.025 && outputSamples[0].cts === 0) {
            logger.warn('Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.');
            var dts = firstDTS;
            for (var _i4 = 0, len = outputSamples.length; _i4 < len; _i4++) {
              var nextDts = dts + outputSamples[_i4].duration;
              var _pts = dts + outputSamples[_i4].cts;
              if (_i4 < len - 1) {
                var nextPts = nextDts + outputSamples[_i4 + 1].cts;
                outputSamples[_i4].duration = nextPts - _pts;
              } else {
                outputSamples[_i4].duration = _i4 ? outputSamples[_i4 - 1].duration : averageSampleDuration;
              }
              outputSamples[_i4].cts = 0;
              dts = nextDts;
            }
          }
        }
      }
      // next AVC sample DTS should be equal to last sample DTS + last sample duration (in PES timescale)
      mp4SampleDuration = stretchedLastFrame || !mp4SampleDuration ? averageSampleDuration : mp4SampleDuration;
      this.nextAvcDts = nextAvcDts = lastDTS + mp4SampleDuration;
      this.videoSampleDuration = mp4SampleDuration;
      this.isVideoContiguous = true;
      var moof = MP4.moof(track.sequenceNumber++, firstDTS, _extends({}, track, {
        samples: outputSamples
      }));
      var type = 'video';
      var data = {
        data1: moof,
        data2: mdat,
        startPTS: minPTS / timeScale,
        endPTS: (maxPTS + mp4SampleDuration) / timeScale,
        startDTS: firstDTS / timeScale,
        endDTS: nextAvcDts / timeScale,
        type: type,
        hasAudio: false,
        hasVideo: true,
        nb: outputSamples.length,
        dropped: track.dropped
      };
      track.samples = [];
      track.dropped = 0;
      return data;
    };
    _proto.getSamplesPerFrame = function getSamplesPerFrame(track) {
      switch (track.segmentCodec) {
        case 'mp3':
          return MPEG_AUDIO_SAMPLE_PER_FRAME;
        case 'ac3':
          return AC3_SAMPLES_PER_FRAME;
        default:
          return AAC_SAMPLES_PER_FRAME;
      }
    };
    _proto.remuxAudio = function remuxAudio(track, timeOffset, contiguous, accurateTimeOffset, videoTimeOffset) {
      var inputTimeScale = track.inputTimeScale;
      var mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale;
      var scaleFactor = inputTimeScale / mp4timeScale;
      var mp4SampleDuration = this.getSamplesPerFrame(track);
      var inputSampleDuration = mp4SampleDuration * scaleFactor;
      var initPTS = this._initPTS;
      var rawMPEG = track.segmentCodec === 'mp3' && this.typeSupported.mpeg;
      var outputSamples = [];
      var alignedWithVideo = videoTimeOffset !== undefined;
      var inputSamples = track.samples;
      var offset = rawMPEG ? 0 : 8;
      var nextAudioPts = this.nextAudioPts || -1;

      // window.audioSamples ? window.audioSamples.push(inputSamples.map(s => s.pts)) : (window.audioSamples = [inputSamples.map(s => s.pts)]);

      // for audio samples, also consider consecutive fragments as being contiguous (even if a level switch occurs),
      // for sake of clarity:
      // consecutive fragments are frags with
      //  - less than 100ms gaps between new time offset (if accurate) and next expected PTS OR
      //  - less than 20 audio frames distance
      // contiguous fragments are consecutive fragments from same quality level (same level, new SN = old SN + 1)
      // this helps ensuring audio continuity
      // and this also avoids audio glitches/cut when switching quality, or reporting wrong duration on first audio frame
      var timeOffsetMpegTS = timeOffset * inputTimeScale;
      var initTime = initPTS.baseTime * inputTimeScale / initPTS.timescale;
      this.isAudioContiguous = contiguous = contiguous || inputSamples.length && nextAudioPts > 0 && (accurateTimeOffset && Math.abs(timeOffsetMpegTS - nextAudioPts) < 9000 || Math.abs(normalizePts(inputSamples[0].pts - initTime, timeOffsetMpegTS) - nextAudioPts) < 20 * inputSampleDuration);

      // compute normalized PTS
      inputSamples.forEach(function (sample) {
        sample.pts = normalizePts(sample.pts - initTime, timeOffsetMpegTS);
      });
      if (!contiguous || nextAudioPts < 0) {
        // filter out sample with negative PTS that are not playable anyway
        // if we don't remove these negative samples, they will shift all audio samples forward.
        // leading to audio overlap between current / next fragment
        inputSamples = inputSamples.filter(function (sample) {
          return sample.pts >= 0;
        });

        // in case all samples have negative PTS, and have been filtered out, return now
        if (!inputSamples.length) {
          return;
        }
        if (videoTimeOffset === 0) {
          // Set the start to 0 to match video so that start gaps larger than inputSampleDuration are filled with silence
          nextAudioPts = 0;
        } else if (accurateTimeOffset && !alignedWithVideo) {
          // When not seeking, not live, and LevelDetails.PTSKnown, use fragment start as predicted next audio PTS
          nextAudioPts = Math.max(0, timeOffsetMpegTS);
        } else {
          // if frags are not contiguous and if we cant trust time offset, let's use first sample PTS as next audio PTS
          nextAudioPts = inputSamples[0].pts;
        }
      }

      // If the audio track is missing samples, the frames seem to get "left-shifted" within the
      // resulting mp4 segment, causing sync issues and leaving gaps at the end of the audio segment.
      // In an effort to prevent this from happening, we inject frames here where there are gaps.
      // When possible, we inject a silent frame; when that's not possible, we duplicate the last
      // frame.

      if (track.segmentCodec === 'aac') {
        var maxAudioFramesDrift = this.config.maxAudioFramesDrift;
        for (var i = 0, nextPts = nextAudioPts; i < inputSamples.length; i++) {
          // First, let's see how far off this frame is from where we expect it to be
          var sample = inputSamples[i];
          var pts = sample.pts;
          var delta = pts - nextPts;
          var duration = Math.abs(1000 * delta / inputTimeScale);

          // When remuxing with video, if we're overlapping by more than a duration, drop this sample to stay in sync
          if (delta <= -maxAudioFramesDrift * inputSampleDuration && alignedWithVideo) {
            if (i === 0) {
              logger.warn("Audio frame @ " + (pts / inputTimeScale).toFixed(3) + "s overlaps nextAudioPts by " + Math.round(1000 * delta / inputTimeScale) + " ms.");
              this.nextAudioPts = nextAudioPts = nextPts = pts;
            }
          } // eslint-disable-line brace-style

          // Insert missing frames if:
          // 1: We're more than maxAudioFramesDrift frame away
          // 2: Not more than MAX_SILENT_FRAME_DURATION away
          // 3: currentTime (aka nextPtsNorm) is not 0
          // 4: remuxing with video (videoTimeOffset !== undefined)
          else if (delta >= maxAudioFramesDrift * inputSampleDuration && duration < MAX_SILENT_FRAME_DURATION && alignedWithVideo) {
            var missing = Math.round(delta / inputSampleDuration);
            // Adjust nextPts so that silent samples are aligned with media pts. This will prevent media samples from
            // later being shifted if nextPts is based on timeOffset and delta is not a multiple of inputSampleDuration.
            nextPts = pts - missing * inputSampleDuration;
            if (nextPts < 0) {
              missing--;
              nextPts += inputSampleDuration;
            }
            if (i === 0) {
              this.nextAudioPts = nextAudioPts = nextPts;
            }
            logger.warn("[mp4-remuxer]: Injecting " + missing + " audio frame @ " + (nextPts / inputTimeScale).toFixed(3) + "s due to " + Math.round(1000 * delta / inputTimeScale) + " ms gap.");
            for (var j = 0; j < missing; j++) {
              var newStamp = Math.max(nextPts, 0);
              var fillFrame = AAC.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);
              if (!fillFrame) {
                logger.log('[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead.');
                fillFrame = sample.unit.subarray();
              }
              inputSamples.splice(i, 0, {
                unit: fillFrame,
                pts: newStamp
              });
              nextPts += inputSampleDuration;
              i++;
            }
          }
          sample.pts = nextPts;
          nextPts += inputSampleDuration;
        }
      }
      var firstPTS = null;
      var lastPTS = null;
      var mdat;
      var mdatSize = 0;
      var sampleLength = inputSamples.length;
      while (sampleLength--) {
        mdatSize += inputSamples[sampleLength].unit.byteLength;
      }
      for (var _j2 = 0, _nbSamples = inputSamples.length; _j2 < _nbSamples; _j2++) {
        var audioSample = inputSamples[_j2];
        var unit = audioSample.unit;
        var _pts2 = audioSample.pts;
        if (lastPTS !== null) {
          // If we have more than one sample, set the duration of the sample to the "real" duration; the PTS diff with
          // the previous sample
          var prevSample = outputSamples[_j2 - 1];
          prevSample.duration = Math.round((_pts2 - lastPTS) / scaleFactor);
        } else {
          if (contiguous && track.segmentCodec === 'aac') {
            // set PTS/DTS to expected PTS/DTS
            _pts2 = nextAudioPts;
          }
          // remember first PTS of our audioSamples
          firstPTS = _pts2;
          if (mdatSize > 0) {
            /* concatenate the audio data and construct the mdat in place
              (need 8 more bytes to fill length and mdat type) */
            mdatSize += offset;
            try {
              mdat = new Uint8Array(mdatSize);
            } catch (err) {
              this.observer.emit(Events.ERROR, Events.ERROR, {
                type: ErrorTypes.MUX_ERROR,
                details: ErrorDetails.REMUX_ALLOC_ERROR,
                fatal: false,
                error: err,
                bytes: mdatSize,
                reason: "fail allocating audio mdat " + mdatSize
              });
              return;
            }
            if (!rawMPEG) {
              var view = new DataView(mdat.buffer);
              view.setUint32(0, mdatSize);
              mdat.set(MP4.types.mdat, 4);
            }
          } else {
            // no audio samples
            return;
          }
        }
        mdat.set(unit, offset);
        var unitLen = unit.byteLength;
        offset += unitLen;
        // Default the sample's duration to the computed mp4SampleDuration, which will either be 1024 for AAC or 1152 for MPEG
        // In the case that we have 1 sample, this will be the duration. If we have more than one sample, the duration
        // becomes the PTS diff with the previous sample
        outputSamples.push(new Mp4Sample(true, mp4SampleDuration, unitLen, 0));
        lastPTS = _pts2;
      }

      // We could end up with no audio samples if all input samples were overlapping with the previously remuxed ones
      var nbSamples = outputSamples.length;
      if (!nbSamples) {
        return;
      }

      // The next audio sample PTS should be equal to last sample PTS + duration
      var lastSample = outputSamples[outputSamples.length - 1];
      this.nextAudioPts = nextAudioPts = lastPTS + scaleFactor * lastSample.duration;

      // Set the track samples from inputSamples to outputSamples before remuxing
      var moof = rawMPEG ? new Uint8Array(0) : MP4.moof(track.sequenceNumber++, firstPTS / scaleFactor, _extends({}, track, {
        samples: outputSamples
      }));

      // Clear the track samples. This also clears the samples array in the demuxer, since the reference is shared
      track.samples = [];
      var start = firstPTS / inputTimeScale;
      var end = nextAudioPts / inputTimeScale;
      var type = 'audio';
      var audioData = {
        data1: moof,
        data2: mdat,
        startPTS: start,
        endPTS: end,
        startDTS: start,
        endDTS: end,
        type: type,
        hasAudio: true,
        hasVideo: false,
        nb: nbSamples
      };
      this.isAudioContiguous = true;
      return audioData;
    };
    _proto.remuxEmptyAudio = function remuxEmptyAudio(track, timeOffset, contiguous, videoData) {
      var inputTimeScale = track.inputTimeScale;
      var mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale;
      var scaleFactor = inputTimeScale / mp4timeScale;
      var nextAudioPts = this.nextAudioPts;
      // sync with video's timestamp
      var initDTS = this._initDTS;
      var init90kHz = initDTS.baseTime * 90000 / initDTS.timescale;
      var startDTS = (nextAudioPts !== null ? nextAudioPts : videoData.startDTS * inputTimeScale) + init90kHz;
      var endDTS = videoData.endDTS * inputTimeScale + init90kHz;
      // one sample's duration value
      var frameDuration = scaleFactor * AAC_SAMPLES_PER_FRAME;
      // samples count of this segment's duration
      var nbSamples = Math.ceil((endDTS - startDTS) / frameDuration);
      // silent frame
      var silentFrame = AAC.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);
      logger.warn('[mp4-remuxer]: remux empty Audio');
      // Can't remux if we can't generate a silent frame...
      if (!silentFrame) {
        logger.trace('[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec');
        return;
      }
      var samples = [];
      for (var i = 0; i < nbSamples; i++) {
        var stamp = startDTS + i * frameDuration;
        samples.push({
          unit: silentFrame,
          pts: stamp,
          dts: stamp
        });
      }
      track.samples = samples;
      return this.remuxAudio(track, timeOffset, contiguous, false);
    };
    return MP4Remuxer;
  }();
  function normalizePts(value, reference) {
    var offset;
    if (reference === null) {
      return value;
    }
    if (reference < value) {
      // - 2^33
      offset = -8589934592;
    } else {
      // + 2^33
      offset = 8589934592;
    }
    /* PTS is 33bit (from 0 to 2^33 -1)
      if diff between value and reference is bigger than half of the amplitude (2^32) then it means that
      PTS looping occured. fill the gap */
    while (Math.abs(value - reference) > 4294967296) {
      value += offset;
    }
    return value;
  }
  function findKeyframeIndex(samples) {
    for (var i = 0; i < samples.length; i++) {
      if (samples[i].key) {
        return i;
      }
    }
    return -1;
  }
  function flushTextTrackMetadataCueSamples(track, timeOffset, initPTS, initDTS) {
    var length = track.samples.length;
    if (!length) {
      return;
    }
    var inputTimeScale = track.inputTimeScale;
    for (var index = 0; index < length; index++) {
      var sample = track.samples[index];
      // setting id3 pts, dts to relative time
      // using this._initPTS and this._initDTS to calculate relative time
      sample.pts = normalizePts(sample.pts - initPTS.baseTime * inputTimeScale / initPTS.timescale, timeOffset * inputTimeScale) / inputTimeScale;
      sample.dts = normalizePts(sample.dts - initDTS.baseTime * inputTimeScale / initDTS.timescale, timeOffset * inputTimeScale) / inputTimeScale;
    }
    var samples = track.samples;
    track.samples = [];
    return {
      samples: samples
    };
  }
  function flushTextTrackUserdataCueSamples(track, timeOffset, initPTS) {
    var length = track.samples.length;
    if (!length) {
      return;
    }
    var inputTimeScale = track.inputTimeScale;
    for (var index = 0; index < length; index++) {
      var sample = track.samples[index];
      // setting text pts, dts to relative time
      // using this._initPTS and this._initDTS to calculate relative time
      sample.pts = normalizePts(sample.pts - initPTS.baseTime * inputTimeScale / initPTS.timescale, timeOffset * inputTimeScale) / inputTimeScale;
    }
    track.samples.sort(function (a, b) {
      return a.pts - b.pts;
    });
    var samples = track.samples;
    track.samples = [];
    return {
      samples: samples
    };
  }
  var Mp4Sample = function Mp4Sample(isKeyframe, duration, size, cts) {
    this.size = void 0;
    this.duration = void 0;
    this.cts = void 0;
    this.flags = void 0;
    this.duration = duration;
    this.size = size;
    this.cts = cts;
    this.flags = {
      isLeading: 0,
      isDependedOn: 0,
      hasRedundancy: 0,
      degradPrio: 0,
      dependsOn: isKeyframe ? 2 : 1,
      isNonSync: isKeyframe ? 0 : 1
    };
  };

  var PassThroughRemuxer = /*#__PURE__*/function () {
    function PassThroughRemuxer() {
      this.emitInitSegment = false;
      this.audioCodec = void 0;
      this.videoCodec = void 0;
      this.initData = void 0;
      this.initPTS = null;
      this.initTracks = void 0;
      this.lastEndTime = null;
    }
    var _proto = PassThroughRemuxer.prototype;
    _proto.destroy = function destroy() {};
    _proto.resetTimeStamp = function resetTimeStamp(defaultInitPTS) {
      this.initPTS = defaultInitPTS;
      this.lastEndTime = null;
    };
    _proto.resetNextTimestamp = function resetNextTimestamp() {
      this.lastEndTime = null;
    };
    _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, decryptdata) {
      this.audioCodec = audioCodec;
      this.videoCodec = videoCodec;
      this.generateInitSegment(patchEncyptionData(initSegment, decryptdata));
      this.emitInitSegment = true;
    };
    _proto.generateInitSegment = function generateInitSegment(initSegment) {
      var audioCodec = this.audioCodec,
        videoCodec = this.videoCodec;
      if (!(initSegment != null && initSegment.byteLength)) {
        this.initTracks = undefined;
        this.initData = undefined;
        return;
      }
      var initData = this.initData = parseInitSegment(initSegment);

      // Get codec from initSegment or fallback to default
      if (initData.audio) {
        audioCodec = getParsedTrackCodec(initData.audio, ElementaryStreamTypes.AUDIO);
      }
      if (initData.video) {
        videoCodec = getParsedTrackCodec(initData.video, ElementaryStreamTypes.VIDEO);
      }
      var tracks = {};
      if (initData.audio && initData.video) {
        tracks.audiovideo = {
          container: 'video/mp4',
          codec: audioCodec + ',' + videoCodec,
          initSegment: initSegment,
          id: 'main'
        };
      } else if (initData.audio) {
        tracks.audio = {
          container: 'audio/mp4',
          codec: audioCodec,
          initSegment: initSegment,
          id: 'audio'
        };
      } else if (initData.video) {
        tracks.video = {
          container: 'video/mp4',
          codec: videoCodec,
          initSegment: initSegment,
          id: 'main'
        };
      } else {
        logger.warn('[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes.');
      }
      this.initTracks = tracks;
    };
    _proto.remux = function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, accurateTimeOffset) {
      var _initData, _initData2;
      var initPTS = this.initPTS,
        lastEndTime = this.lastEndTime;
      var result = {
        audio: undefined,
        video: undefined,
        text: textTrack,
        id3: id3Track,
        initSegment: undefined
      };

      // If we haven't yet set a lastEndDTS, or it was reset, set it to the provided timeOffset. We want to use the
      // lastEndDTS over timeOffset whenever possible; during progressive playback, the media source will not update
      // the media duration (which is what timeOffset is provided as) before we need to process the next chunk.
      if (!isFiniteNumber(lastEndTime)) {
        lastEndTime = this.lastEndTime = timeOffset || 0;
      }

      // The binary segment data is added to the videoTrack in the mp4demuxer. We don't check to see if the data is only
      // audio or video (or both); adding it to video was an arbitrary choice.
      var data = videoTrack.samples;
      if (!(data != null && data.length)) {
        return result;
      }
      var initSegment = {
        initPTS: undefined,
        timescale: 1
      };
      var initData = this.initData;
      if (!((_initData = initData) != null && _initData.length)) {
        this.generateInitSegment(data);
        initData = this.initData;
      }
      if (!((_initData2 = initData) != null && _initData2.length)) {
        // We can't remux if the initSegment could not be generated
        logger.warn('[passthrough-remuxer.ts]: Failed to generate initSegment.');
        return result;
      }
      if (this.emitInitSegment) {
        initSegment.tracks = this.initTracks;
        this.emitInitSegment = false;
      }
      var duration = getDuration(data, initData);
      var startDTS = getStartDTS(initData, data);
      var decodeTime = startDTS === null ? timeOffset : startDTS;
      if (isInvalidInitPts(initPTS, decodeTime, timeOffset, duration) || initSegment.timescale !== initPTS.timescale && accurateTimeOffset) {
        initSegment.initPTS = decodeTime - timeOffset;
        if (initPTS && initPTS.timescale === 1) {
          logger.warn("Adjusting initPTS by " + (initSegment.initPTS - initPTS.baseTime));
        }
        this.initPTS = initPTS = {
          baseTime: initSegment.initPTS,
          timescale: 1
        };
      }
      var startTime = audioTrack ? decodeTime - initPTS.baseTime / initPTS.timescale : lastEndTime;
      var endTime = startTime + duration;
      offsetStartDTS(initData, data, initPTS.baseTime / initPTS.timescale);
      if (duration > 0) {
        this.lastEndTime = endTime;
      } else {
        logger.warn('Duration parsed from mp4 should be greater than zero');
        this.resetNextTimestamp();
      }
      var hasAudio = !!initData.audio;
      var hasVideo = !!initData.video;
      var type = '';
      if (hasAudio) {
        type += 'audio';
      }
      if (hasVideo) {
        type += 'video';
      }
      var track = {
        data1: data,
        startPTS: startTime,
        startDTS: startTime,
        endPTS: endTime,
        endDTS: endTime,
        type: type,
        hasAudio: hasAudio,
        hasVideo: hasVideo,
        nb: 1,
        dropped: 0
      };
      result.audio = track.type === 'audio' ? track : undefined;
      result.video = track.type !== 'audio' ? track : undefined;
      result.initSegment = initSegment;
      result.id3 = flushTextTrackMetadataCueSamples(id3Track, timeOffset, initPTS, initPTS);
      if (textTrack.samples.length) {
        result.text = flushTextTrackUserdataCueSamples(textTrack, timeOffset, initPTS);
      }
      return result;
    };
    return PassThroughRemuxer;
  }();
  function isInvalidInitPts(initPTS, startDTS, timeOffset, duration) {
    if (initPTS === null) {
      return true;
    }
    // InitPTS is invalid when distance from program would be more than segment duration or a minimum of one second
    var minDuration = Math.max(duration, 1);
    var startTime = startDTS - initPTS.baseTime / initPTS.timescale;
    return Math.abs(startTime - timeOffset) > minDuration;
  }
  function getParsedTrackCodec(track, type) {
    var parsedCodec = track == null ? void 0 : track.codec;
    if (parsedCodec && parsedCodec.length > 4) {
      return parsedCodec;
    }
    if (type === ElementaryStreamTypes.AUDIO) {
      if (parsedCodec === 'ec-3' || parsedCodec === 'ac-3' || parsedCodec === 'alac') {
        return parsedCodec;
      }
      if (parsedCodec === 'fLaC' || parsedCodec === 'Opus') {
        // Opting not to get `preferManagedMediaSource` from player config for isSupported() check for simplicity
        var preferManagedMediaSource = false;
        return getCodecCompatibleName(parsedCodec, preferManagedMediaSource);
      }
      var result = 'mp4a.40.5';
      logger.info("Parsed audio codec \"" + parsedCodec + "\" or audio object type not handled. Using \"" + result + "\"");
      return result;
    }
    // Provide defaults based on codec type
    // This allows for some playback of some fmp4 playlists without CODECS defined in manifest
    logger.warn("Unhandled video codec \"" + parsedCodec + "\"");
    if (parsedCodec === 'hvc1' || parsedCodec === 'hev1') {
      return 'hvc1.1.6.L120.90';
    }
    if (parsedCodec === 'av01') {
      return 'av01.0.04M.08';
    }
    return 'avc1.42e01e';
  }

  /** returns `undefined` is `self` is missing, e.g. in node */
  var optionalSelf = typeof self !== 'undefined' ? self : undefined;

  var now;
  // performance.now() not available on WebWorker, at least on Safari Desktop
  try {
    now = self.performance.now.bind(self.performance);
  } catch (err) {
    logger.debug('Unable to use Performance API on this environment');
    now = optionalSelf == null ? void 0 : optionalSelf.Date.now;
  }
  var muxConfig = [{
    demux: MP4Demuxer,
    remux: PassThroughRemuxer
  }, {
    demux: TSDemuxer,
    remux: MP4Remuxer
  }, {
    demux: AACDemuxer,
    remux: MP4Remuxer
  }, {
    demux: MP3Demuxer,
    remux: MP4Remuxer
  }];
  var Transmuxer = /*#__PURE__*/function () {
    function Transmuxer(observer, typeSupported, config, vendor, id) {
      this.async = false;
      this.observer = void 0;
      this.typeSupported = void 0;
      this.config = void 0;
      this.vendor = void 0;
      this.id = void 0;
      this.demuxer = void 0;
      this.remuxer = void 0;
      this.decrypter = void 0;
      this.probe = void 0;
      this.decryptionPromise = null;
      this.transmuxConfig = void 0;
      this.currentTransmuxState = void 0;
      this.observer = observer;
      this.typeSupported = typeSupported;
      this.config = config;
      this.vendor = vendor;
      this.id = id;
    }
    var _proto = Transmuxer.prototype;
    _proto.configure = function configure(transmuxConfig) {
      this.transmuxConfig = transmuxConfig;
      if (this.decrypter) {
        this.decrypter.reset();
      }
    };
    _proto.push = function push(data, decryptdata, chunkMeta, state) {
      var _this = this;
      var stats = chunkMeta.transmuxing;
      stats.executeStart = now();
      var uintData = new Uint8Array(data);
      var currentTransmuxState = this.currentTransmuxState,
        transmuxConfig = this.transmuxConfig;
      if (state) {
        this.currentTransmuxState = state;
      }
      var _ref = state || currentTransmuxState,
        contiguous = _ref.contiguous,
        discontinuity = _ref.discontinuity,
        trackSwitch = _ref.trackSwitch,
        accurateTimeOffset = _ref.accurateTimeOffset,
        timeOffset = _ref.timeOffset,
        initSegmentChange = _ref.initSegmentChange;
      var audioCodec = transmuxConfig.audioCodec,
        videoCodec = transmuxConfig.videoCodec,
        defaultInitPts = transmuxConfig.defaultInitPts,
        duration = transmuxConfig.duration,
        initSegmentData = transmuxConfig.initSegmentData;
      var keyData = getEncryptionType(uintData, decryptdata);
      if (keyData && keyData.method === 'AES-128') {
        var decrypter = this.getDecrypter();
        // Software decryption is synchronous; webCrypto is not
        if (decrypter.isSync()) {
          // Software decryption is progressive. Progressive decryption may not return a result on each call. Any cached
          // data is handled in the flush() call
          var decryptedData = decrypter.softwareDecrypt(uintData, keyData.key.buffer, keyData.iv.buffer);
          // For Low-Latency HLS Parts, decrypt in place, since part parsing is expected on push progress
          var loadingParts = chunkMeta.part > -1;
          if (loadingParts) {
            decryptedData = decrypter.flush();
          }
          if (!decryptedData) {
            stats.executeEnd = now();
            return emptyResult(chunkMeta);
          }
          uintData = new Uint8Array(decryptedData);
        } else {
          this.decryptionPromise = decrypter.webCryptoDecrypt(uintData, keyData.key.buffer, keyData.iv.buffer).then(function (decryptedData) {
            // Calling push here is important; if flush() is called while this is still resolving, this ensures that
            // the decrypted data has been transmuxed
            var result = _this.push(decryptedData, null, chunkMeta);
            _this.decryptionPromise = null;
            return result;
          });
          return this.decryptionPromise;
        }
      }
      var resetMuxers = this.needsProbing(discontinuity, trackSwitch);
      if (resetMuxers) {
        var error = this.configureTransmuxer(uintData);
        if (error) {
          logger.warn("[transmuxer] " + error.message);
          this.observer.emit(Events.ERROR, Events.ERROR, {
            type: ErrorTypes.MEDIA_ERROR,
            details: ErrorDetails.FRAG_PARSING_ERROR,
            fatal: false,
            error: error,
            reason: error.message
          });
          stats.executeEnd = now();
          return emptyResult(chunkMeta);
        }
      }
      if (discontinuity || trackSwitch || initSegmentChange || resetMuxers) {
        this.resetInitSegment(initSegmentData, audioCodec, videoCodec, duration, decryptdata);
      }
      if (discontinuity || initSegmentChange || resetMuxers) {
        this.resetInitialTimestamp(defaultInitPts);
      }
      if (!contiguous) {
        this.resetContiguity();
      }
      var result = this.transmux(uintData, keyData, timeOffset, accurateTimeOffset, chunkMeta);
      var currentState = this.currentTransmuxState;
      currentState.contiguous = true;
      currentState.discontinuity = false;
      currentState.trackSwitch = false;
      stats.executeEnd = now();
      return result;
    }

    // Due to data caching, flush calls can produce more than one TransmuxerResult (hence the Array type)
    ;
    _proto.flush = function flush(chunkMeta) {
      var _this2 = this;
      var stats = chunkMeta.transmuxing;
      stats.executeStart = now();
      var decrypter = this.decrypter,
        currentTransmuxState = this.currentTransmuxState,
        decryptionPromise = this.decryptionPromise;
      if (decryptionPromise) {
        // Upon resolution, the decryption promise calls push() and returns its TransmuxerResult up the stack. Therefore
        // only flushing is required for async decryption
        return decryptionPromise.then(function () {
          return _this2.flush(chunkMeta);
        });
      }
      var transmuxResults = [];
      var timeOffset = currentTransmuxState.timeOffset;
      if (decrypter) {
        // The decrypter may have data cached, which needs to be demuxed. In this case we'll have two TransmuxResults
        // This happens in the case that we receive only 1 push call for a segment (either for non-progressive downloads,
        // or for progressive downloads with small segments)
        var decryptedData = decrypter.flush();
        if (decryptedData) {
          // Push always returns a TransmuxerResult if decryptdata is null
          transmuxResults.push(this.push(decryptedData, null, chunkMeta));
        }
      }
      var demuxer = this.demuxer,
        remuxer = this.remuxer;
      if (!demuxer || !remuxer) {
        // If probing failed, then Hls.js has been given content its not able to handle
        stats.executeEnd = now();
        return [emptyResult(chunkMeta)];
      }
      var demuxResultOrPromise = demuxer.flush(timeOffset);
      if (isPromise(demuxResultOrPromise)) {
        // Decrypt final SAMPLE-AES samples
        return demuxResultOrPromise.then(function (demuxResult) {
          _this2.flushRemux(transmuxResults, demuxResult, chunkMeta);
          return transmuxResults;
        });
      }
      this.flushRemux(transmuxResults, demuxResultOrPromise, chunkMeta);
      return transmuxResults;
    };
    _proto.flushRemux = function flushRemux(transmuxResults, demuxResult, chunkMeta) {
      var audioTrack = demuxResult.audioTrack,
        videoTrack = demuxResult.videoTrack,
        id3Track = demuxResult.id3Track,
        textTrack = demuxResult.textTrack;
      var _this$currentTransmux = this.currentTransmuxState,
        accurateTimeOffset = _this$currentTransmux.accurateTimeOffset,
        timeOffset = _this$currentTransmux.timeOffset;
      logger.log("[transmuxer.ts]: Flushed fragment " + chunkMeta.sn + (chunkMeta.part > -1 ? ' p: ' + chunkMeta.part : '') + " of level " + chunkMeta.level);
      var remuxResult = this.remuxer.remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, accurateTimeOffset, true, this.id);
      transmuxResults.push({
        remuxResult: remuxResult,
        chunkMeta: chunkMeta
      });
      chunkMeta.transmuxing.executeEnd = now();
    };
    _proto.resetInitialTimestamp = function resetInitialTimestamp(defaultInitPts) {
      var demuxer = this.demuxer,
        remuxer = this.remuxer;
      if (!demuxer || !remuxer) {
        return;
      }
      demuxer.resetTimeStamp(defaultInitPts);
      remuxer.resetTimeStamp(defaultInitPts);
    };
    _proto.resetContiguity = function resetContiguity() {
      var demuxer = this.demuxer,
        remuxer = this.remuxer;
      if (!demuxer || !remuxer) {
        return;
      }
      demuxer.resetContiguity();
      remuxer.resetNextTimestamp();
    };
    _proto.resetInitSegment = function resetInitSegment(initSegmentData, audioCodec, videoCodec, trackDuration, decryptdata) {
      var demuxer = this.demuxer,
        remuxer = this.remuxer;
      if (!demuxer || !remuxer) {
        return;
      }
      demuxer.resetInitSegment(initSegmentData, audioCodec, videoCodec, trackDuration);
      remuxer.resetInitSegment(initSegmentData, audioCodec, videoCodec, decryptdata);
    };
    _proto.destroy = function destroy() {
      if (this.demuxer) {
        this.demuxer.destroy();
        this.demuxer = undefined;
      }
      if (this.remuxer) {
        this.remuxer.destroy();
        this.remuxer = undefined;
      }
    };
    _proto.transmux = function transmux(data, keyData, timeOffset, accurateTimeOffset, chunkMeta) {
      var result;
      if (keyData && keyData.method === 'SAMPLE-AES') {
        result = this.transmuxSampleAes(data, keyData, timeOffset, accurateTimeOffset, chunkMeta);
      } else {
        result = this.transmuxUnencrypted(data, timeOffset, accurateTimeOffset, chunkMeta);
      }
      return result;
    };
    _proto.transmuxUnencrypted = function transmuxUnencrypted(data, timeOffset, accurateTimeOffset, chunkMeta) {
      var _demux = this.demuxer.demux(data, timeOffset, false, !this.config.progressive),
        audioTrack = _demux.audioTrack,
        videoTrack = _demux.videoTrack,
        id3Track = _demux.id3Track,
        textTrack = _demux.textTrack;
      var remuxResult = this.remuxer.remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, accurateTimeOffset, false, this.id);
      return {
        remuxResult: remuxResult,
        chunkMeta: chunkMeta
      };
    };
    _proto.transmuxSampleAes = function transmuxSampleAes(data, decryptData, timeOffset, accurateTimeOffset, chunkMeta) {
      var _this3 = this;
      return this.demuxer.demuxSampleAes(data, decryptData, timeOffset).then(function (demuxResult) {
        var remuxResult = _this3.remuxer.remux(demuxResult.audioTrack, demuxResult.videoTrack, demuxResult.id3Track, demuxResult.textTrack, timeOffset, accurateTimeOffset, false, _this3.id);
        return {
          remuxResult: remuxResult,
          chunkMeta: chunkMeta
        };
      });
    };
    _proto.configureTransmuxer = function configureTransmuxer(data) {
      var config = this.config,
        observer = this.observer,
        typeSupported = this.typeSupported,
        vendor = this.vendor;
      // probe for content type
      var mux;
      for (var i = 0, len = muxConfig.length; i < len; i++) {
        var _muxConfig$i$demux;
        if ((_muxConfig$i$demux = muxConfig[i].demux) != null && _muxConfig$i$demux.probe(data)) {
          mux = muxConfig[i];
          break;
        }
      }
      if (!mux) {
        return new Error('Failed to find demuxer by probing fragment data');
      }
      // so let's check that current remuxer and demuxer are still valid
      var demuxer = this.demuxer;
      var remuxer = this.remuxer;
      var Remuxer = mux.remux;
      var Demuxer = mux.demux;
      if (!remuxer || !(remuxer instanceof Remuxer)) {
        this.remuxer = new Remuxer(observer, config, typeSupported, vendor);
      }
      if (!demuxer || !(demuxer instanceof Demuxer)) {
        this.demuxer = new Demuxer(observer, config, typeSupported);
        this.probe = Demuxer.probe;
      }
    };
    _proto.needsProbing = function needsProbing(discontinuity, trackSwitch) {
      // in case of continuity change, or track switch
      // we might switch from content type (AAC container to TS container, or TS to fmp4 for example)
      return !this.demuxer || !this.remuxer || discontinuity || trackSwitch;
    };
    _proto.getDecrypter = function getDecrypter() {
      var decrypter = this.decrypter;
      if (!decrypter) {
        decrypter = this.decrypter = new Decrypter(this.config);
      }
      return decrypter;
    };
    return Transmuxer;
  }();
  function getEncryptionType(data, decryptData) {
    var encryptionType = null;
    if (data.byteLength > 0 && (decryptData == null ? void 0 : decryptData.key) != null && decryptData.iv !== null && decryptData.method != null) {
      encryptionType = decryptData;
    }
    return encryptionType;
  }
  var emptyResult = function emptyResult(chunkMeta) {
    return {
      remuxResult: {},
      chunkMeta: chunkMeta
    };
  };
  function isPromise(p) {
    return 'then' in p && p.then instanceof Function;
  }
  var TransmuxConfig = function TransmuxConfig(audioCodec, videoCodec, initSegmentData, duration, defaultInitPts) {
    this.audioCodec = void 0;
    this.videoCodec = void 0;
    this.initSegmentData = void 0;
    this.duration = void 0;
    this.defaultInitPts = void 0;
    this.audioCodec = audioCodec;
    this.videoCodec = videoCodec;
    this.initSegmentData = initSegmentData;
    this.duration = duration;
    this.defaultInitPts = defaultInitPts || null;
  };
  var TransmuxState = function TransmuxState(discontinuity, contiguous, accurateTimeOffset, trackSwitch, timeOffset, initSegmentChange) {
    this.discontinuity = void 0;
    this.contiguous = void 0;
    this.accurateTimeOffset = void 0;
    this.trackSwitch = void 0;
    this.timeOffset = void 0;
    this.initSegmentChange = void 0;
    this.discontinuity = discontinuity;
    this.contiguous = contiguous;
    this.accurateTimeOffset = accurateTimeOffset;
    this.trackSwitch = trackSwitch;
    this.timeOffset = timeOffset;
    this.initSegmentChange = initSegmentChange;
  };

  var eventemitter3 = {exports: {}};

  (function (module) {

  	var has = Object.prototype.hasOwnProperty
  	  , prefix = '~';

  	/**
  	 * Constructor to create a storage for our `EE` objects.
  	 * An `Events` instance is a plain object whose properties are event names.
  	 *
  	 * @constructor
  	 * @private
  	 */
  	function Events() {}

  	//
  	// We try to not inherit from `Object.prototype`. In some engines creating an
  	// instance in this way is faster than calling `Object.create(null)` directly.
  	// If `Object.create(null)` is not supported we prefix the event names with a
  	// character to make sure that the built-in object properties are not
  	// overridden or used as an attack vector.
  	//
  	if (Object.create) {
  	  Events.prototype = Object.create(null);

  	  //
  	  // This hack is needed because the `__proto__` property is still inherited in
  	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  	  //
  	  if (!new Events().__proto__) prefix = false;
  	}

  	/**
  	 * Representation of a single event listener.
  	 *
  	 * @param {Function} fn The listener function.
  	 * @param {*} context The context to invoke the listener with.
  	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
  	 * @constructor
  	 * @private
  	 */
  	function EE(fn, context, once) {
  	  this.fn = fn;
  	  this.context = context;
  	  this.once = once || false;
  	}

  	/**
  	 * Add a listener for a given event.
  	 *
  	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} context The context to invoke the listener with.
  	 * @param {Boolean} once Specify if the listener is a one-time listener.
  	 * @returns {EventEmitter}
  	 * @private
  	 */
  	function addListener(emitter, event, fn, context, once) {
  	  if (typeof fn !== 'function') {
  	    throw new TypeError('The listener must be a function');
  	  }

  	  var listener = new EE(fn, context || emitter, once)
  	    , evt = prefix ? prefix + event : event;

  	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  	  else emitter._events[evt] = [emitter._events[evt], listener];

  	  return emitter;
  	}

  	/**
  	 * Clear event by name.
  	 *
  	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
  	 * @param {(String|Symbol)} evt The Event name.
  	 * @private
  	 */
  	function clearEvent(emitter, evt) {
  	  if (--emitter._eventsCount === 0) emitter._events = new Events();
  	  else delete emitter._events[evt];
  	}

  	/**
  	 * Minimal `EventEmitter` interface that is molded against the Node.js
  	 * `EventEmitter` interface.
  	 *
  	 * @constructor
  	 * @public
  	 */
  	function EventEmitter() {
  	  this._events = new Events();
  	  this._eventsCount = 0;
  	}

  	/**
  	 * Return an array listing the events for which the emitter has registered
  	 * listeners.
  	 *
  	 * @returns {Array}
  	 * @public
  	 */
  	EventEmitter.prototype.eventNames = function eventNames() {
  	  var names = []
  	    , events
  	    , name;

  	  if (this._eventsCount === 0) return names;

  	  for (name in (events = this._events)) {
  	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  	  }

  	  if (Object.getOwnPropertySymbols) {
  	    return names.concat(Object.getOwnPropertySymbols(events));
  	  }

  	  return names;
  	};

  	/**
  	 * Return the listeners registered for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Array} The registered listeners.
  	 * @public
  	 */
  	EventEmitter.prototype.listeners = function listeners(event) {
  	  var evt = prefix ? prefix + event : event
  	    , handlers = this._events[evt];

  	  if (!handlers) return [];
  	  if (handlers.fn) return [handlers.fn];

  	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
  	    ee[i] = handlers[i].fn;
  	  }

  	  return ee;
  	};

  	/**
  	 * Return the number of listeners listening to a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Number} The number of listeners.
  	 * @public
  	 */
  	EventEmitter.prototype.listenerCount = function listenerCount(event) {
  	  var evt = prefix ? prefix + event : event
  	    , listeners = this._events[evt];

  	  if (!listeners) return 0;
  	  if (listeners.fn) return 1;
  	  return listeners.length;
  	};

  	/**
  	 * Calls each of the listeners registered for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Boolean} `true` if the event had listeners, else `false`.
  	 * @public
  	 */
  	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  	  var evt = prefix ? prefix + event : event;

  	  if (!this._events[evt]) return false;

  	  var listeners = this._events[evt]
  	    , len = arguments.length
  	    , args
  	    , i;

  	  if (listeners.fn) {
  	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

  	    switch (len) {
  	      case 1: return listeners.fn.call(listeners.context), true;
  	      case 2: return listeners.fn.call(listeners.context, a1), true;
  	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
  	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
  	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
  	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
  	    }

  	    for (i = 1, args = new Array(len -1); i < len; i++) {
  	      args[i - 1] = arguments[i];
  	    }

  	    listeners.fn.apply(listeners.context, args);
  	  } else {
  	    var length = listeners.length
  	      , j;

  	    for (i = 0; i < length; i++) {
  	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

  	      switch (len) {
  	        case 1: listeners[i].fn.call(listeners[i].context); break;
  	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
  	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
  	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
  	        default:
  	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
  	            args[j - 1] = arguments[j];
  	          }

  	          listeners[i].fn.apply(listeners[i].context, args);
  	      }
  	    }
  	  }

  	  return true;
  	};

  	/**
  	 * Add a listener for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} [context=this] The context to invoke the listener with.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.on = function on(event, fn, context) {
  	  return addListener(this, event, fn, context, false);
  	};

  	/**
  	 * Add a one-time listener for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} [context=this] The context to invoke the listener with.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.once = function once(event, fn, context) {
  	  return addListener(this, event, fn, context, true);
  	};

  	/**
  	 * Remove the listeners of a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn Only remove the listeners that match this function.
  	 * @param {*} context Only remove the listeners that have this context.
  	 * @param {Boolean} once Only remove one-time listeners.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  	  var evt = prefix ? prefix + event : event;

  	  if (!this._events[evt]) return this;
  	  if (!fn) {
  	    clearEvent(this, evt);
  	    return this;
  	  }

  	  var listeners = this._events[evt];

  	  if (listeners.fn) {
  	    if (
  	      listeners.fn === fn &&
  	      (!once || listeners.once) &&
  	      (!context || listeners.context === context)
  	    ) {
  	      clearEvent(this, evt);
  	    }
  	  } else {
  	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
  	      if (
  	        listeners[i].fn !== fn ||
  	        (once && !listeners[i].once) ||
  	        (context && listeners[i].context !== context)
  	      ) {
  	        events.push(listeners[i]);
  	      }
  	    }

  	    //
  	    // Reset the array, or remove it completely if we have no more listeners.
  	    //
  	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
  	    else clearEvent(this, evt);
  	  }

  	  return this;
  	};

  	/**
  	 * Remove all listeners, or those of the specified event.
  	 *
  	 * @param {(String|Symbol)} [event] The event name.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  	  var evt;

  	  if (event) {
  	    evt = prefix ? prefix + event : event;
  	    if (this._events[evt]) clearEvent(this, evt);
  	  } else {
  	    this._events = new Events();
  	    this._eventsCount = 0;
  	  }

  	  return this;
  	};

  	//
  	// Alias methods names because people roll like that.
  	//
  	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  	//
  	// Expose the prefix.
  	//
  	EventEmitter.prefixed = prefix;

  	//
  	// Allow `EventEmitter` to be imported as module namespace.
  	//
  	EventEmitter.EventEmitter = EventEmitter;

  	//
  	// Expose the module.
  	//
  	{
  	  module.exports = EventEmitter;
  	} 
  } (eventemitter3));

  var eventemitter3Exports = eventemitter3.exports;
  var EventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

  if (typeof __IN_WORKER__ !== 'undefined' && __IN_WORKER__) {
    startWorker(self);
  }
  function startWorker(self) {
    var observer = new EventEmitter();
    var forwardMessage = function forwardMessage(ev, data) {
      self.postMessage({
        event: ev,
        data: data
      });
    };

    // forward events to main thread
    observer.on(Events.FRAG_DECRYPTED, forwardMessage);
    observer.on(Events.ERROR, forwardMessage);

    // forward logger events to main thread
    var forwardWorkerLogs = function forwardWorkerLogs() {
      var _loop = function _loop(logFn) {
        var func = function func(message) {
          forwardMessage('workerLog', {
            logType: logFn,
            message: message
          });
        };
        logger[logFn] = func;
      };
      for (var logFn in logger) {
        _loop(logFn);
      }
    };
    self.addEventListener('message', function (ev) {
      var data = ev.data;
      switch (data.cmd) {
        case 'init':
          {
            var config = JSON.parse(data.config);
            self.transmuxer = new Transmuxer(observer, data.typeSupported, config, data.vendor, data.id);
            enableLogs(config.debug, data.id);
            forwardWorkerLogs();
            forwardMessage('init', null);
            break;
          }
        case 'configure':
          {
            self.transmuxer.configure(data.config);
            break;
          }
        case 'demux':
          {
            var transmuxResult = self.transmuxer.push(data.data, data.decryptdata, data.chunkMeta, data.state);
            if (isPromise(transmuxResult)) {
              self.transmuxer.async = true;
              transmuxResult.then(function (data) {
                emitTransmuxComplete(self, data);
              }).catch(function (error) {
                forwardMessage(Events.ERROR, {
                  type: ErrorTypes.MEDIA_ERROR,
                  details: ErrorDetails.FRAG_PARSING_ERROR,
                  chunkMeta: data.chunkMeta,
                  fatal: false,
                  error: error,
                  err: error,
                  reason: "transmuxer-worker push error"
                });
              });
            } else {
              self.transmuxer.async = false;
              emitTransmuxComplete(self, transmuxResult);
            }
            break;
          }
        case 'flush':
          {
            var id = data.chunkMeta;
            var _transmuxResult = self.transmuxer.flush(id);
            var asyncFlush = isPromise(_transmuxResult);
            if (asyncFlush || self.transmuxer.async) {
              if (!isPromise(_transmuxResult)) {
                _transmuxResult = Promise.resolve(_transmuxResult);
              }
              _transmuxResult.then(function (results) {
                handleFlushResult(self, results, id);
              }).catch(function (error) {
                forwardMessage(Events.ERROR, {
                  type: ErrorTypes.MEDIA_ERROR,
                  details: ErrorDetails.FRAG_PARSING_ERROR,
                  chunkMeta: data.chunkMeta,
                  fatal: false,
                  error: error,
                  err: error,
                  reason: "transmuxer-worker flush error"
                });
              });
            } else {
              handleFlushResult(self, _transmuxResult, id);
            }
            break;
          }
      }
    });
  }
  function emitTransmuxComplete(self, transmuxResult) {
    if (isEmptyResult(transmuxResult.remuxResult)) {
      return false;
    }
    var transferable = [];
    var _transmuxResult$remux = transmuxResult.remuxResult,
      audio = _transmuxResult$remux.audio,
      video = _transmuxResult$remux.video;
    if (audio) {
      addToTransferable(transferable, audio);
    }
    if (video) {
      addToTransferable(transferable, video);
    }
    self.postMessage({
      event: 'transmuxComplete',
      data: transmuxResult
    }, transferable);
    return true;
  }

  // Converts data to a transferable object https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast)
  // in order to minimize message passing overhead
  function addToTransferable(transferable, track) {
    if (track.data1) {
      transferable.push(track.data1.buffer);
    }
    if (track.data2) {
      transferable.push(track.data2.buffer);
    }
  }
  function handleFlushResult(self, results, chunkMeta) {
    var parsed = results.reduce(function (parsed, result) {
      return emitTransmuxComplete(self, result) || parsed;
    }, false);
    if (!parsed) {
      // Emit at least one "transmuxComplete" message even if media is not found to update stream-controller state to PARSING
      self.postMessage({
        event: 'transmuxComplete',
        data: results[0]
      });
    }
    self.postMessage({
      event: 'flush',
      data: chunkMeta
    });
  }
  function isEmptyResult(remuxResult) {
    return !remuxResult.audio && !remuxResult.video && !remuxResult.text && !remuxResult.id3 && !remuxResult.initSegment;
  }

  // ensure the worker ends up in the bundle
  // If the worker should not be included this gets aliased to empty.js
  function hasUMDWorker() {
    return typeof __HLS_WORKER_BUNDLE__ === 'function';
  }
  function injectWorker() {
    var blob = new self.Blob(["var exports={};var module={exports:exports};function define(f){f()};define.amd=true;(" + __HLS_WORKER_BUNDLE__.toString() + ")(true);"], {
      type: 'text/javascript'
    });
    var objectURL = self.URL.createObjectURL(blob);
    var worker = new self.Worker(objectURL);
    return {
      worker: worker,
      objectURL: objectURL
    };
  }
  function loadWorker(path) {
    var scriptURL = new self.URL(path, self.location.href).href;
    var worker = new self.Worker(scriptURL);
    return {
      worker: worker,
      scriptURL: scriptURL
    };
  }

  var TransmuxerInterface = /*#__PURE__*/function () {
    function TransmuxerInterface(hls, id, onTransmuxComplete, onFlush) {
      var _this = this;
      this.error = null;
      this.hls = void 0;
      this.id = void 0;
      this.observer = void 0;
      this.frag = null;
      this.part = null;
      this.useWorker = void 0;
      this.workerContext = null;
      this.onwmsg = void 0;
      this.transmuxer = null;
      this.onTransmuxComplete = void 0;
      this.onFlush = void 0;
      var config = hls.config;
      this.hls = hls;
      this.id = id;
      this.useWorker = !!config.enableWorker;
      this.onTransmuxComplete = onTransmuxComplete;
      this.onFlush = onFlush;
      var forwardMessage = function forwardMessage(ev, data) {
        data = data || {};
        data.frag = _this.frag;
        data.id = _this.id;
        if (ev === Events.ERROR) {
          _this.error = data.error;
        }
        _this.hls.trigger(ev, data);
      };

      // forward events to main thread
      this.observer = new EventEmitter();
      this.observer.on(Events.FRAG_DECRYPTED, forwardMessage);
      this.observer.on(Events.ERROR, forwardMessage);
      var MediaSource = getMediaSource(config.preferManagedMediaSource) || {
        isTypeSupported: function isTypeSupported() {
          return false;
        }
      };
      var m2tsTypeSupported = {
        mpeg: MediaSource.isTypeSupported('audio/mpeg'),
        mp3: MediaSource.isTypeSupported('audio/mp4; codecs="mp3"'),
        ac3: false
      };

      // navigator.vendor is not always available in Web Worker
      // refer to https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/navigator
      var vendor = navigator.vendor;
      if (this.useWorker && typeof Worker !== 'undefined') {
        var canCreateWorker = config.workerPath || hasUMDWorker();
        if (canCreateWorker) {
          try {
            if (config.workerPath) {
              logger.log("loading Web Worker " + config.workerPath + " for \"" + id + "\"");
              this.workerContext = loadWorker(config.workerPath);
            } else {
              logger.log("injecting Web Worker for \"" + id + "\"");
              this.workerContext = injectWorker();
            }
            this.onwmsg = function (ev) {
              return _this.onWorkerMessage(ev);
            };
            var worker = this.workerContext.worker;
            worker.addEventListener('message', this.onwmsg);
            worker.onerror = function (event) {
              var error = new Error(event.message + "  (" + event.filename + ":" + event.lineno + ")");
              config.enableWorker = false;
              logger.warn("Error in \"" + id + "\" Web Worker, fallback to inline");
              _this.hls.trigger(Events.ERROR, {
                type: ErrorTypes.OTHER_ERROR,
                details: ErrorDetails.INTERNAL_EXCEPTION,
                fatal: false,
                event: 'demuxerWorker',
                error: error
              });
            };
            worker.postMessage({
              cmd: 'init',
              typeSupported: m2tsTypeSupported,
              vendor: vendor,
              id: id,
              config: JSON.stringify(config)
            });
          } catch (err) {
            logger.warn("Error setting up \"" + id + "\" Web Worker, fallback to inline", err);
            this.resetWorker();
            this.error = null;
            this.transmuxer = new Transmuxer(this.observer, m2tsTypeSupported, config, vendor, id);
          }
          return;
        }
      }
      this.transmuxer = new Transmuxer(this.observer, m2tsTypeSupported, config, vendor, id);
    }
    var _proto = TransmuxerInterface.prototype;
    _proto.resetWorker = function resetWorker() {
      if (this.workerContext) {
        var _this$workerContext = this.workerContext,
          worker = _this$workerContext.worker,
          objectURL = _this$workerContext.objectURL;
        if (objectURL) {
          // revoke the Object URL that was used to create transmuxer worker, so as not to leak it
          self.URL.revokeObjectURL(objectURL);
        }
        worker.removeEventListener('message', this.onwmsg);
        worker.onerror = null;
        worker.terminate();
        this.workerContext = null;
      }
    };
    _proto.destroy = function destroy() {
      if (this.workerContext) {
        this.resetWorker();
        this.onwmsg = undefined;
      } else {
        var transmuxer = this.transmuxer;
        if (transmuxer) {
          transmuxer.destroy();
          this.transmuxer = null;
        }
      }
      var observer = this.observer;
      if (observer) {
        observer.removeAllListeners();
      }
      this.frag = null;
      // @ts-ignore
      this.observer = null;
      // @ts-ignore
      this.hls = null;
    };
    _proto.push = function push(data, initSegmentData, audioCodec, videoCodec, frag, part, duration, accurateTimeOffset, chunkMeta, defaultInitPTS) {
      var _frag$initSegment,
        _lastFrag$initSegment,
        _this2 = this;
      chunkMeta.transmuxing.start = self.performance.now();
      var transmuxer = this.transmuxer;
      var timeOffset = part ? part.start : frag.start;
      // TODO: push "clear-lead" decrypt data for unencrypted fragments in streams with encrypted ones
      var decryptdata = frag.decryptdata;
      var lastFrag = this.frag;
      var discontinuity = !(lastFrag && frag.cc === lastFrag.cc);
      var trackSwitch = !(lastFrag && chunkMeta.level === lastFrag.level);
      var snDiff = lastFrag ? chunkMeta.sn - lastFrag.sn : -1;
      var partDiff = this.part ? chunkMeta.part - this.part.index : -1;
      var progressive = snDiff === 0 && chunkMeta.id > 1 && chunkMeta.id === (lastFrag == null ? void 0 : lastFrag.stats.chunkCount);
      var contiguous = !trackSwitch && (snDiff === 1 || snDiff === 0 && (partDiff === 1 || progressive && partDiff <= 0));
      var now = self.performance.now();
      if (trackSwitch || snDiff || frag.stats.parsing.start === 0) {
        frag.stats.parsing.start = now;
      }
      if (part && (partDiff || !contiguous)) {
        part.stats.parsing.start = now;
      }
      var initSegmentChange = !(lastFrag && ((_frag$initSegment = frag.initSegment) == null ? void 0 : _frag$initSegment.url) === ((_lastFrag$initSegment = lastFrag.initSegment) == null ? void 0 : _lastFrag$initSegment.url));
      var state = new TransmuxState(discontinuity, contiguous, accurateTimeOffset, trackSwitch, timeOffset, initSegmentChange);
      if (!contiguous || discontinuity || initSegmentChange) {
        logger.log("[transmuxer-interface, " + frag.type + "]: Starting new transmux session for sn: " + chunkMeta.sn + " p: " + chunkMeta.part + " level: " + chunkMeta.level + " id: " + chunkMeta.id + "\n        discontinuity: " + discontinuity + "\n        trackSwitch: " + trackSwitch + "\n        contiguous: " + contiguous + "\n        accurateTimeOffset: " + accurateTimeOffset + "\n        timeOffset: " + timeOffset + "\n        initSegmentChange: " + initSegmentChange);
        var config = new TransmuxConfig(audioCodec, videoCodec, initSegmentData, duration, defaultInitPTS);
        this.configureTransmuxer(config);
      }
      this.frag = frag;
      this.part = part;

      // Frags with sn of 'initSegment' are not transmuxed
      if (this.workerContext) {
        // post fragment payload as transferable objects for ArrayBuffer (no copy)
        this.workerContext.worker.postMessage({
          cmd: 'demux',
          data: data,
          decryptdata: decryptdata,
          chunkMeta: chunkMeta,
          state: state
        }, data instanceof ArrayBuffer ? [data] : []);
      } else if (transmuxer) {
        var _transmuxResult = transmuxer.push(data, decryptdata, chunkMeta, state);
        if (isPromise(_transmuxResult)) {
          transmuxer.async = true;
          _transmuxResult.then(function (data) {
            _this2.handleTransmuxComplete(data);
          }).catch(function (error) {
            _this2.transmuxerError(error, chunkMeta, 'transmuxer-interface push error');
          });
        } else {
          transmuxer.async = false;
          this.handleTransmuxComplete(_transmuxResult);
        }
      }
    };
    _proto.flush = function flush(chunkMeta) {
      var _this3 = this;
      chunkMeta.transmuxing.start = self.performance.now();
      var transmuxer = this.transmuxer;
      if (this.workerContext) {
        this.workerContext.worker.postMessage({
          cmd: 'flush',
          chunkMeta: chunkMeta
        });
      } else if (transmuxer) {
        var _transmuxResult2 = transmuxer.flush(chunkMeta);
        var asyncFlush = isPromise(_transmuxResult2);
        if (asyncFlush || transmuxer.async) {
          if (!isPromise(_transmuxResult2)) {
            _transmuxResult2 = Promise.resolve(_transmuxResult2);
          }
          _transmuxResult2.then(function (data) {
            _this3.handleFlushResult(data, chunkMeta);
          }).catch(function (error) {
            _this3.transmuxerError(error, chunkMeta, 'transmuxer-interface flush error');
          });
        } else {
          this.handleFlushResult(_transmuxResult2, chunkMeta);
        }
      }
    };
    _proto.transmuxerError = function transmuxerError(error, chunkMeta, reason) {
      if (!this.hls) {
        return;
      }
      this.error = error;
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.FRAG_PARSING_ERROR,
        chunkMeta: chunkMeta,
        fatal: false,
        error: error,
        err: error,
        reason: reason
      });
    };
    _proto.handleFlushResult = function handleFlushResult(results, chunkMeta) {
      var _this4 = this;
      results.forEach(function (result) {
        _this4.handleTransmuxComplete(result);
      });
      this.onFlush(chunkMeta);
    };
    _proto.onWorkerMessage = function onWorkerMessage(ev) {
      var data = ev.data;
      var hls = this.hls;
      switch (data.event) {
        case 'init':
          {
            var _this$workerContext2;
            var objectURL = (_this$workerContext2 = this.workerContext) == null ? void 0 : _this$workerContext2.objectURL;
            if (objectURL) {
              // revoke the Object URL that was used to create transmuxer worker, so as not to leak it
              self.URL.revokeObjectURL(objectURL);
            }
            break;
          }
        case 'transmuxComplete':
          {
            this.handleTransmuxComplete(data.data);
            break;
          }
        case 'flush':
          {
            this.onFlush(data.data);
            break;
          }

        // pass logs from the worker thread to the main logger
        case 'workerLog':
          if (logger[data.data.logType]) {
            logger[data.data.logType](data.data.message);
          }
          break;
        default:
          {
            data.data = data.data || {};
            data.data.frag = this.frag;
            data.data.id = this.id;
            hls.trigger(data.event, data.data);
            break;
          }
      }
    };
    _proto.configureTransmuxer = function configureTransmuxer(config) {
      var transmuxer = this.transmuxer;
      if (this.workerContext) {
        this.workerContext.worker.postMessage({
          cmd: 'configure',
          config: config
        });
      } else if (transmuxer) {
        transmuxer.configure(config);
      }
    };
    _proto.handleTransmuxComplete = function handleTransmuxComplete(result) {
      result.chunkMeta.transmuxing.end = self.performance.now();
      this.onTransmuxComplete(result);
    };
    return TransmuxerInterface;
  }();

  var STALL_MINIMUM_DURATION_MS = 250;
  var MAX_START_GAP_JUMP = 2.0;
  var SKIP_BUFFER_HOLE_STEP_SECONDS = 0.1;
  var SKIP_BUFFER_RANGE_START = 0.05;
  var GapController = /*#__PURE__*/function () {
    function GapController(config, media, fragmentTracker, hls) {
      this.config = void 0;
      this.media = null;
      this.fragmentTracker = void 0;
      this.hls = void 0;
      this.nudgeRetry = 0;
      this.stallReported = false;
      this.stalled = null;
      this.moved = false;
      this.seeking = false;
      this.config = config;
      this.media = media;
      this.fragmentTracker = fragmentTracker;
      this.hls = hls;
    }
    var _proto = GapController.prototype;
    _proto.destroy = function destroy() {
      this.media = null;
      // @ts-ignore
      this.hls = this.fragmentTracker = null;
    }

    /**
     * Checks if the playhead is stuck within a gap, and if so, attempts to free it.
     * A gap is an unbuffered range between two buffered ranges (or the start and the first buffered range).
     *
     * @param lastCurrentTime - Previously read playhead position
     */;
    _proto.poll = function poll(lastCurrentTime, activeFrag) {
      var config = this.config,
        media = this.media,
        stalled = this.stalled;
      if (media === null) {
        return;
      }
      var currentTime = media.currentTime,
        seeking = media.seeking;
      var seeked = this.seeking && !seeking;
      var beginSeek = !this.seeking && seeking;
      this.seeking = seeking;

      // The playhead is moving, no-op
      if (currentTime !== lastCurrentTime) {
        this.moved = true;
        if (!seeking) {
          this.nudgeRetry = 0;
        }
        if (stalled !== null) {
          // The playhead is now moving, but was previously stalled
          if (this.stallReported) {
            var _stalledDuration = self.performance.now() - stalled;
            logger.warn("playback not stuck anymore @" + currentTime + ", after " + Math.round(_stalledDuration) + "ms");
            this.stallReported = false;
          }
          this.stalled = null;
        }
        return;
      }

      // Clear stalled state when beginning or finishing seeking so that we don't report stalls coming out of a seek
      if (beginSeek || seeked) {
        this.stalled = null;
        return;
      }

      // The playhead should not be moving
      if (media.paused && !seeking || media.ended || media.playbackRate === 0 || !BufferHelper.getBuffered(media).length) {
        this.nudgeRetry = 0;
        return;
      }
      var bufferInfo = BufferHelper.bufferInfo(media, currentTime, 0);
      var nextStart = bufferInfo.nextStart || 0;
      if (seeking) {
        // Waiting for seeking in a buffered range to complete
        var hasEnoughBuffer = bufferInfo.len > MAX_START_GAP_JUMP;
        // Next buffered range is too far ahead to jump to while still seeking
        var noBufferGap = !nextStart || activeFrag && activeFrag.start <= currentTime || nextStart - currentTime > MAX_START_GAP_JUMP && !this.fragmentTracker.getPartialFragment(currentTime);
        if (hasEnoughBuffer || noBufferGap) {
          return;
        }
        // Reset moved state when seeking to a point in or before a gap
        this.moved = false;
      }

      // Skip start gaps if we haven't played, but the last poll detected the start of a stall
      // The addition poll gives the browser a chance to jump the gap for us
      if (!this.moved && this.stalled !== null) {
        var _level$details;
        // There is no playable buffer (seeked, waiting for buffer)
        var isBuffered = bufferInfo.len > 0;
        if (!isBuffered && !nextStart) {
          return;
        }
        // Jump start gaps within jump threshold
        var startJump = Math.max(nextStart, bufferInfo.start || 0) - currentTime;

        // When joining a live stream with audio tracks, account for live playlist window sliding by allowing
        // a larger jump over start gaps caused by the audio-stream-controller buffering a start fragment
        // that begins over 1 target duration after the video start position.
        var level = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null;
        var isLive = level == null ? void 0 : (_level$details = level.details) == null ? void 0 : _level$details.live;
        var maxStartGapJump = isLive ? level.details.targetduration * 2 : MAX_START_GAP_JUMP;
        var partialOrGap = this.fragmentTracker.getPartialFragment(currentTime);
        if (startJump > 0 && (startJump <= maxStartGapJump || partialOrGap)) {
          if (!media.paused) {
            this._trySkipBufferHole(partialOrGap);
          }
          return;
        }
      }

      // Start tracking stall time
      var tnow = self.performance.now();
      if (stalled === null) {
        this.stalled = tnow;
        return;
      }
      var stalledDuration = tnow - stalled;
      if (!seeking && stalledDuration >= STALL_MINIMUM_DURATION_MS) {
        // Report stalling after trying to fix
        this._reportStall(bufferInfo);
        if (!this.media) {
          return;
        }
      }
      var bufferedWithHoles = BufferHelper.bufferInfo(media, currentTime, config.maxBufferHole);
      this._tryFixBufferStall(bufferedWithHoles, stalledDuration);
    }

    /**
     * Detects and attempts to fix known buffer stalling issues.
     * @param bufferInfo - The properties of the current buffer.
     * @param stalledDurationMs - The amount of time Hls.js has been stalling for.
     * @private
     */;
    _proto._tryFixBufferStall = function _tryFixBufferStall(bufferInfo, stalledDurationMs) {
      var config = this.config,
        fragmentTracker = this.fragmentTracker,
        media = this.media;
      if (media === null) {
        return;
      }
      var currentTime = media.currentTime;
      var partial = fragmentTracker.getPartialFragment(currentTime);
      if (partial) {
        // Try to skip over the buffer hole caused by a partial fragment
        // This method isn't limited by the size of the gap between buffered ranges
        var targetTime = this._trySkipBufferHole(partial);
        // we return here in this case, meaning
        // the branch below only executes when we haven't seeked to a new position
        if (targetTime || !this.media) {
          return;
        }
      }

      // if we haven't had to skip over a buffer hole of a partial fragment
      // we may just have to "nudge" the playlist as the browser decoding/rendering engine
      // needs to cross some sort of threshold covering all source-buffers content
      // to start playing properly.
      if ((bufferInfo.len > config.maxBufferHole || bufferInfo.nextStart && bufferInfo.nextStart - currentTime < config.maxBufferHole) && stalledDurationMs > config.highBufferWatchdogPeriod * 1000) {
        logger.warn('Trying to nudge playhead over buffer-hole');
        // Try to nudge currentTime over a buffer hole if we've been stalling for the configured amount of seconds
        // We only try to jump the hole if it's under the configured size
        // Reset stalled so to rearm watchdog timer
        this.stalled = null;
        this._tryNudgeBuffer();
      }
    }

    /**
     * Triggers a BUFFER_STALLED_ERROR event, but only once per stall period.
     * @param bufferLen - The playhead distance from the end of the current buffer segment.
     * @private
     */;
    _proto._reportStall = function _reportStall(bufferInfo) {
      var hls = this.hls,
        media = this.media,
        stallReported = this.stallReported;
      if (!stallReported && media) {
        // Report stalled error once
        this.stallReported = true;
        var error = new Error("Playback stalling at @" + media.currentTime + " due to low buffer (" + JSON.stringify(bufferInfo) + ")");
        logger.warn(error.message);
        hls.trigger(Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.BUFFER_STALLED_ERROR,
          fatal: false,
          error: error,
          buffer: bufferInfo.len
        });
      }
    }

    /**
     * Attempts to fix buffer stalls by jumping over known gaps caused by partial fragments
     * @param partial - The partial fragment found at the current time (where playback is stalling).
     * @private
     */;
    _proto._trySkipBufferHole = function _trySkipBufferHole(partial) {
      var config = this.config,
        hls = this.hls,
        media = this.media;
      if (media === null) {
        return 0;
      }

      // Check if currentTime is between unbuffered regions of partial fragments
      var currentTime = media.currentTime;
      var bufferInfo = BufferHelper.bufferInfo(media, currentTime, 0);
      var startTime = currentTime < bufferInfo.start ? bufferInfo.start : bufferInfo.nextStart;
      if (startTime) {
        var bufferStarved = bufferInfo.len <= config.maxBufferHole;
        var waiting = bufferInfo.len > 0 && bufferInfo.len < 1 && media.readyState < 3;
        var gapLength = startTime - currentTime;
        if (gapLength > 0 && (bufferStarved || waiting)) {
          // Only allow large gaps to be skipped if it is a start gap, or all fragments in skip range are partial
          if (gapLength > config.maxBufferHole) {
            var fragmentTracker = this.fragmentTracker;
            var startGap = false;
            if (currentTime === 0) {
              var startFrag = fragmentTracker.getAppendedFrag(0, PlaylistLevelType.MAIN);
              if (startFrag && startTime < startFrag.end) {
                startGap = true;
              }
            }
            if (!startGap) {
              var startProvisioned = partial || fragmentTracker.getAppendedFrag(currentTime, PlaylistLevelType.MAIN);
              if (startProvisioned) {
                var moreToLoad = false;
                var pos = startProvisioned.end;
                while (pos < startTime) {
                  var provisioned = fragmentTracker.getPartialFragment(pos);
                  if (provisioned) {
                    pos += provisioned.duration;
                  } else {
                    moreToLoad = true;
                    break;
                  }
                }
                if (moreToLoad) {
                  return 0;
                }
              }
            }
          }
          var targetTime = Math.max(startTime + SKIP_BUFFER_RANGE_START, currentTime + SKIP_BUFFER_HOLE_STEP_SECONDS);
          logger.warn("skipping hole, adjusting currentTime from " + currentTime + " to " + targetTime);
          this.moved = true;
          this.stalled = null;
          media.currentTime = targetTime;
          if (partial && !partial.gap) {
            var error = new Error("fragment loaded with buffer holes, seeking from " + currentTime + " to " + targetTime);
            hls.trigger(Events.ERROR, {
              type: ErrorTypes.MEDIA_ERROR,
              details: ErrorDetails.BUFFER_SEEK_OVER_HOLE,
              fatal: false,
              error: error,
              reason: error.message,
              frag: partial
            });
          }
          return targetTime;
        }
      }
      return 0;
    }

    /**
     * Attempts to fix buffer stalls by advancing the mediaElement's current time by a small amount.
     * @private
     */;
    _proto._tryNudgeBuffer = function _tryNudgeBuffer() {
      var config = this.config,
        hls = this.hls,
        media = this.media,
        nudgeRetry = this.nudgeRetry;
      if (media === null) {
        return;
      }
      var currentTime = media.currentTime;
      this.nudgeRetry++;
      if (nudgeRetry < config.nudgeMaxRetry) {
        var targetTime = currentTime + (nudgeRetry + 1) * config.nudgeOffset;
        // playback stalled in buffered area ... let's nudge currentTime to try to overcome this
        var error = new Error("Nudging 'currentTime' from " + currentTime + " to " + targetTime);
        logger.warn(error.message);
        media.currentTime = targetTime;
        hls.trigger(Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.BUFFER_NUDGE_ON_STALL,
          error: error,
          fatal: false
        });
      } else {
        var _error = new Error("Playhead still not moving while enough data buffered @" + currentTime + " after " + config.nudgeMaxRetry + " nudges");
        logger.error(_error.message);
        hls.trigger(Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.BUFFER_STALLED_ERROR,
          error: _error,
          fatal: true
        });
      }
    };
    return GapController;
  }();

  var TICK_INTERVAL = 100; // how often to tick in ms
  var StreamController = /*#__PURE__*/function (_BaseStreamController) {
    _inheritsLoose(StreamController, _BaseStreamController);
    function StreamController(hls, fragmentTracker, keyLoader) {
      var _this;
      _this = _BaseStreamController.call(this, hls, fragmentTracker, keyLoader, '[stream-controller]', PlaylistLevelType.MAIN) || this;
      _this.audioCodecSwap = false;
      _this.gapController = null;
      _this.level = -1;
      _this._forceStartLoad = false;
      _this.altAudio = false;
      _this.audioOnly = false;
      _this.fragPlaying = null;
      _this.onvplaying = null;
      _this.onvseeked = null;
      _this.fragLastKbps = 0;
      _this.couldBacktrack = false;
      _this.backtrackFragment = null;
      _this.audioCodecSwitch = false;
      _this.videoBuffer = null;
      _this._registerListeners();
      return _this;
    }
    var _proto = StreamController.prototype;
    _proto._registerListeners = function _registerListeners() {
      var hls = this.hls;
      hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this);
      hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
      hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.on(Events.LEVEL_LOADING, this.onLevelLoading, this);
      hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this);
      hls.on(Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this);
      hls.on(Events.ERROR, this.onError, this);
      hls.on(Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this);
      hls.on(Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this);
      hls.on(Events.BUFFER_CREATED, this.onBufferCreated, this);
      hls.on(Events.BUFFER_FLUSHED, this.onBufferFlushed, this);
      hls.on(Events.LEVELS_UPDATED, this.onLevelsUpdated, this);
      hls.on(Events.FRAG_BUFFERED, this.onFragBuffered, this);
    };
    _proto._unregisterListeners = function _unregisterListeners() {
      var hls = this.hls;
      hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this);
      hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this);
      hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this);
      hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.off(Events.LEVEL_LOADED, this.onLevelLoaded, this);
      hls.off(Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this);
      hls.off(Events.ERROR, this.onError, this);
      hls.off(Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this);
      hls.off(Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this);
      hls.off(Events.BUFFER_CREATED, this.onBufferCreated, this);
      hls.off(Events.BUFFER_FLUSHED, this.onBufferFlushed, this);
      hls.off(Events.LEVELS_UPDATED, this.onLevelsUpdated, this);
      hls.off(Events.FRAG_BUFFERED, this.onFragBuffered, this);
    };
    _proto.onHandlerDestroying = function onHandlerDestroying() {
      this._unregisterListeners();
      _BaseStreamController.prototype.onHandlerDestroying.call(this);
    };
    _proto.startLoad = function startLoad(startPosition) {
      if (this.levels) {
        var lastCurrentTime = this.lastCurrentTime,
          hls = this.hls;
        this.stopLoad();
        this.setInterval(TICK_INTERVAL);
        this.level = -1;
        if (!this.startFragRequested) {
          // determine load level
          var startLevel = hls.startLevel;
          if (startLevel === -1) {
            if (hls.config.testBandwidth && this.levels.length > 1) {
              // -1 : guess start Level by doing a bitrate test by loading first fragment of lowest quality level
              startLevel = 0;
              this.bitrateTest = true;
            } else {
              startLevel = hls.firstAutoLevel;
            }
          }
          // set new level to playlist loader : this will trigger start level load
          // hls.nextLoadLevel remains until it is set to a new value or until a new frag is successfully loaded
          hls.nextLoadLevel = startLevel;
          this.level = hls.loadLevel;
          this.loadedmetadata = false;
        }
        // if startPosition undefined but lastCurrentTime set, set startPosition to last currentTime
        if (lastCurrentTime > 0 && startPosition === -1) {
          this.log("Override startPosition with lastCurrentTime @" + lastCurrentTime.toFixed(3));
          startPosition = lastCurrentTime;
        }
        this.state = State.IDLE;
        this.nextLoadPosition = this.startPosition = this.lastCurrentTime = startPosition;
        this.tick();
      } else {
        this._forceStartLoad = true;
        this.state = State.STOPPED;
      }
    };
    _proto.stopLoad = function stopLoad() {
      this._forceStartLoad = false;
      _BaseStreamController.prototype.stopLoad.call(this);
    };
    _proto.doTick = function doTick() {
      switch (this.state) {
        case State.WAITING_LEVEL:
          {
            var levels = this.levels,
              level = this.level;
            var currentLevel = levels == null ? void 0 : levels[level];
            var details = currentLevel == null ? void 0 : currentLevel.details;
            if (details && (!details.live || this.levelLastLoaded === currentLevel)) {
              if (this.waitForCdnTuneIn(details)) {
                break;
              }
              this.state = State.IDLE;
              break;
            } else if (this.hls.nextLoadLevel !== this.level) {
              this.state = State.IDLE;
              break;
            }
            break;
          }
        case State.FRAG_LOADING_WAITING_RETRY:
          {
            var _this$media;
            var now = self.performance.now();
            var retryDate = this.retryDate;
            // if current time is gt than retryDate, or if media seeking let's switch to IDLE state to retry loading
            if (!retryDate || now >= retryDate || (_this$media = this.media) != null && _this$media.seeking) {
              var _levels = this.levels,
                _level = this.level;
              var _currentLevel = _levels == null ? void 0 : _levels[_level];
              this.resetStartWhenNotLoaded(_currentLevel || null);
              this.state = State.IDLE;
            }
          }
          break;
      }
      if (this.state === State.IDLE) {
        this.doTickIdle();
      }
      this.onTickEnd();
    };
    _proto.onTickEnd = function onTickEnd() {
      _BaseStreamController.prototype.onTickEnd.call(this);
      this.checkBuffer();
      this.checkFragmentChanged();
    };
    _proto.doTickIdle = function doTickIdle() {
      var hls = this.hls,
        levelLastLoaded = this.levelLastLoaded,
        levels = this.levels,
        media = this.media;

      // if start level not parsed yet OR
      // if video not attached AND start fragment already requested OR start frag prefetch not enabled
      // exit loop, as we either need more info (level not parsed) or we need media to be attached to load new fragment
      if (levelLastLoaded === null || !media && (this.startFragRequested || !hls.config.startFragPrefetch)) {
        return;
      }

      // If the "main" level is audio-only but we are loading an alternate track in the same group, do not load anything
      if (this.altAudio && this.audioOnly) {
        return;
      }
      var level = hls.nextLoadLevel;
      if (!(levels != null && levels[level])) {
        return;
      }
      var levelInfo = levels[level];

      // if buffer length is less than maxBufLen try to load a new fragment

      var bufferInfo = this.getMainFwdBufferInfo();
      if (bufferInfo === null) {
        return;
      }
      var lastDetails = this.getLevelDetails();
      if (lastDetails && this._streamEnded(bufferInfo, lastDetails)) {
        var data = {};
        if (this.altAudio) {
          data.type = 'video';
        }
        this.hls.trigger(Events.BUFFER_EOS, data);
        this.state = State.ENDED;
        return;
      }

      // set next load level : this will trigger a playlist load if needed
      if (hls.loadLevel !== level && hls.manualLevel === -1) {
        this.log("Adapting to level " + level + " from level " + this.level);
      }
      this.level = hls.nextLoadLevel = level;
      var levelDetails = levelInfo.details;
      // if level info not retrieved yet, switch state and wait for level retrieval
      // if live playlist, ensure that new playlist has been refreshed to avoid loading/try to load
      // a useless and outdated fragment (that might even introduce load error if it is already out of the live playlist)
      if (!levelDetails || this.state === State.WAITING_LEVEL || levelDetails.live && this.levelLastLoaded !== levelInfo) {
        this.level = level;
        this.state = State.WAITING_LEVEL;
        return;
      }
      var bufferLen = bufferInfo.len;

      // compute max Buffer Length that we could get from this load level, based on level bitrate. don't buffer more than 60 MB and more than 30s
      var maxBufLen = this.getMaxBufferLength(levelInfo.maxBitrate);

      // Stay idle if we are still with buffer margins
      if (bufferLen >= maxBufLen) {
        return;
      }
      if (this.backtrackFragment && this.backtrackFragment.start > bufferInfo.end) {
        this.backtrackFragment = null;
      }
      var targetBufferTime = this.backtrackFragment ? this.backtrackFragment.start : bufferInfo.end;
      var frag = this.getNextFragment(targetBufferTime, levelDetails);
      // Avoid backtracking by loading an earlier segment in streams with segments that do not start with a key frame (flagged by `couldBacktrack`)
      if (this.couldBacktrack && !this.fragPrevious && frag && frag.sn !== 'initSegment' && this.fragmentTracker.getState(frag) !== FragmentState.OK) {
        var _this$backtrackFragme;
        var backtrackSn = ((_this$backtrackFragme = this.backtrackFragment) != null ? _this$backtrackFragme : frag).sn;
        var fragIdx = backtrackSn - levelDetails.startSN;
        var backtrackFrag = levelDetails.fragments[fragIdx - 1];
        if (backtrackFrag && frag.cc === backtrackFrag.cc) {
          frag = backtrackFrag;
          this.fragmentTracker.removeFragment(backtrackFrag);
        }
      } else if (this.backtrackFragment && bufferInfo.len) {
        this.backtrackFragment = null;
      }
      // Avoid loop loading by using nextLoadPosition set for backtracking and skipping consecutive GAP tags
      if (frag && this.isLoopLoading(frag, targetBufferTime)) {
        var gapStart = frag.gap;
        if (!gapStart) {
          // Cleanup the fragment tracker before trying to find the next unbuffered fragment
          var type = this.audioOnly && !this.altAudio ? ElementaryStreamTypes.AUDIO : ElementaryStreamTypes.VIDEO;
          var mediaBuffer = (type === ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
          if (mediaBuffer) {
            this.afterBufferFlushed(mediaBuffer, type, PlaylistLevelType.MAIN);
          }
        }
        frag = this.getNextFragmentLoopLoading(frag, levelDetails, bufferInfo, PlaylistLevelType.MAIN, maxBufLen);
      }
      if (!frag) {
        return;
      }
      if (frag.initSegment && !frag.initSegment.data && !this.bitrateTest) {
        frag = frag.initSegment;
      }
      this.loadFragment(frag, levelInfo, targetBufferTime);
    };
    _proto.loadFragment = function loadFragment(frag, level, targetBufferTime) {
      // Check if fragment is not loaded
      var fragState = this.fragmentTracker.getState(frag);
      this.fragCurrent = frag;
      if (fragState === FragmentState.NOT_LOADED || fragState === FragmentState.PARTIAL) {
        if (frag.sn === 'initSegment') {
          this._loadInitSegment(frag, level);
        } else if (this.bitrateTest) {
          this.log("Fragment " + frag.sn + " of level " + frag.level + " is being downloaded to test bitrate and will not be buffered");
          this._loadBitrateTestFrag(frag, level);
        } else {
          this.startFragRequested = true;
          _BaseStreamController.prototype.loadFragment.call(this, frag, level, targetBufferTime);
        }
      } else {
        this.clearTrackerIfNeeded(frag);
      }
    };
    _proto.getBufferedFrag = function getBufferedFrag(position) {
      return this.fragmentTracker.getBufferedFrag(position, PlaylistLevelType.MAIN);
    };
    _proto.followingBufferedFrag = function followingBufferedFrag(frag) {
      if (frag) {
        // try to get range of next fragment (500ms after this range)
        return this.getBufferedFrag(frag.end + 0.5);
      }
      return null;
    }

    /*
      on immediate level switch :
       - pause playback if playing
       - cancel any pending load request
       - and trigger a buffer flush
    */;
    _proto.immediateLevelSwitch = function immediateLevelSwitch() {
      this.abortCurrentFrag();
      this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
    }

    /**
     * try to switch ASAP without breaking video playback:
     * in order to ensure smooth but quick level switching,
     * we need to find the next flushable buffer range
     * we should take into account new segment fetch time
     */;
    _proto.nextLevelSwitch = function nextLevelSwitch() {
      var levels = this.levels,
        media = this.media;
      // ensure that media is defined and that metadata are available (to retrieve currentTime)
      if (media != null && media.readyState) {
        var fetchdelay;
        var fragPlayingCurrent = this.getAppendedFrag(media.currentTime);
        if (fragPlayingCurrent && fragPlayingCurrent.start > 1) {
          // flush buffer preceding current fragment (flush until current fragment start offset)
          // minus 1s to avoid video freezing, that could happen if we flush keyframe of current video ...
          this.flushMainBuffer(0, fragPlayingCurrent.start - 1);
        }
        var levelDetails = this.getLevelDetails();
        if (levelDetails != null && levelDetails.live) {
          var bufferInfo = this.getMainFwdBufferInfo();
          // Do not flush in live stream with low buffer
          if (!bufferInfo || bufferInfo.len < levelDetails.targetduration * 2) {
            return;
          }
        }
        if (!media.paused && levels) {
          // add a safety delay of 1s
          var nextLevelId = this.hls.nextLoadLevel;
          var nextLevel = levels[nextLevelId];
          var fragLastKbps = this.fragLastKbps;
          if (fragLastKbps && this.fragCurrent) {
            fetchdelay = this.fragCurrent.duration * nextLevel.maxBitrate / (1000 * fragLastKbps) + 1;
          } else {
            fetchdelay = 0;
          }
        } else {
          fetchdelay = 0;
        }
        // this.log('fetchdelay:'+fetchdelay);
        // find buffer range that will be reached once new fragment will be fetched
        var bufferedFrag = this.getBufferedFrag(media.currentTime + fetchdelay);
        if (bufferedFrag) {
          // we can flush buffer range following this one without stalling playback
          var nextBufferedFrag = this.followingBufferedFrag(bufferedFrag);
          if (nextBufferedFrag) {
            // if we are here, we can also cancel any loading/demuxing in progress, as they are useless
            this.abortCurrentFrag();
            // start flush position is in next buffered frag. Leave some padding for non-independent segments and smoother playback.
            var maxStart = nextBufferedFrag.maxStartPTS ? nextBufferedFrag.maxStartPTS : nextBufferedFrag.start;
            var fragDuration = nextBufferedFrag.duration;
            var startPts = Math.max(bufferedFrag.end, maxStart + Math.min(Math.max(fragDuration - this.config.maxFragLookUpTolerance, fragDuration * (this.couldBacktrack ? 0.5 : 0.125)), fragDuration * (this.couldBacktrack ? 0.75 : 0.25)));
            this.flushMainBuffer(startPts, Number.POSITIVE_INFINITY);
          }
        }
      }
    };
    _proto.abortCurrentFrag = function abortCurrentFrag() {
      var fragCurrent = this.fragCurrent;
      this.fragCurrent = null;
      this.backtrackFragment = null;
      if (fragCurrent) {
        fragCurrent.abortRequests();
        this.fragmentTracker.removeFragment(fragCurrent);
      }
      switch (this.state) {
        case State.KEY_LOADING:
        case State.FRAG_LOADING:
        case State.FRAG_LOADING_WAITING_RETRY:
        case State.PARSING:
        case State.PARSED:
          this.state = State.IDLE;
          break;
      }
      this.nextLoadPosition = this.getLoadPosition();
    };
    _proto.flushMainBuffer = function flushMainBuffer(startOffset, endOffset) {
      _BaseStreamController.prototype.flushMainBuffer.call(this, startOffset, endOffset, this.altAudio ? 'video' : null);
    };
    _proto.onMediaAttached = function onMediaAttached(event, data) {
      _BaseStreamController.prototype.onMediaAttached.call(this, event, data);
      var media = data.media;
      this.onvplaying = this.onMediaPlaying.bind(this);
      this.onvseeked = this.onMediaSeeked.bind(this);
      media.addEventListener('playing', this.onvplaying);
      media.addEventListener('seeked', this.onvseeked);
      this.gapController = new GapController(this.config, media, this.fragmentTracker, this.hls);
    };
    _proto.onMediaDetaching = function onMediaDetaching() {
      var media = this.media;
      if (media && this.onvplaying && this.onvseeked) {
        media.removeEventListener('playing', this.onvplaying);
        media.removeEventListener('seeked', this.onvseeked);
        this.onvplaying = this.onvseeked = null;
        this.videoBuffer = null;
      }
      this.fragPlaying = null;
      if (this.gapController) {
        this.gapController.destroy();
        this.gapController = null;
      }
      _BaseStreamController.prototype.onMediaDetaching.call(this);
    };
    _proto.onMediaPlaying = function onMediaPlaying() {
      // tick to speed up FRAG_CHANGED triggering
      this.tick();
    };
    _proto.onMediaSeeked = function onMediaSeeked() {
      var media = this.media;
      var currentTime = media ? media.currentTime : null;
      if (isFiniteNumber(currentTime)) {
        this.log("Media seeked to " + currentTime.toFixed(3));
      }

      // If seeked was issued before buffer was appended do not tick immediately
      var bufferInfo = this.getMainFwdBufferInfo();
      if (bufferInfo === null || bufferInfo.len === 0) {
        this.warn("Main forward buffer length on \"seeked\" event " + (bufferInfo ? bufferInfo.len : 'empty') + ")");
        return;
      }

      // tick to speed up FRAG_CHANGED triggering
      this.tick();
    };
    _proto.onManifestLoading = function onManifestLoading() {
      // reset buffer on manifest loading
      this.log('Trigger BUFFER_RESET');
      this.hls.trigger(Events.BUFFER_RESET, undefined);
      this.fragmentTracker.removeAllFragments();
      this.couldBacktrack = false;
      this.startPosition = this.lastCurrentTime = this.fragLastKbps = 0;
      this.levels = this.fragPlaying = this.backtrackFragment = this.levelLastLoaded = null;
      this.altAudio = this.audioOnly = this.startFragRequested = false;
    };
    _proto.onManifestParsed = function onManifestParsed(event, data) {
      // detect if we have different kind of audio codecs used amongst playlists
      var aac = false;
      var heaac = false;
      data.levels.forEach(function (level) {
        var codec = level.audioCodec;
        if (codec) {
          aac = aac || codec.indexOf('mp4a.40.2') !== -1;
          heaac = heaac || codec.indexOf('mp4a.40.5') !== -1;
        }
      });
      this.audioCodecSwitch = aac && heaac && !changeTypeSupported();
      if (this.audioCodecSwitch) {
        this.log('Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC');
      }
      this.levels = data.levels;
      this.startFragRequested = false;
    };
    _proto.onLevelLoading = function onLevelLoading(event, data) {
      var levels = this.levels;
      if (!levels || this.state !== State.IDLE) {
        return;
      }
      var level = levels[data.level];
      if (!level.details || level.details.live && this.levelLastLoaded !== level || this.waitForCdnTuneIn(level.details)) {
        this.state = State.WAITING_LEVEL;
      }
    };
    _proto.onLevelLoaded = function onLevelLoaded(event, data) {
      var _curLevel$details;
      var levels = this.levels;
      var newLevelId = data.level;
      var newDetails = data.details;
      var duration = newDetails.totalduration;
      if (!levels) {
        this.warn("Levels were reset while loading level " + newLevelId);
        return;
      }
      this.log("Level " + newLevelId + " loaded [" + newDetails.startSN + "," + newDetails.endSN + "]" + (newDetails.lastPartSn ? "[part-" + newDetails.lastPartSn + "-" + newDetails.lastPartIndex + "]" : '') + ", cc [" + newDetails.startCC + ", " + newDetails.endCC + "] duration:" + duration);
      var curLevel = levels[newLevelId];
      var fragCurrent = this.fragCurrent;
      if (fragCurrent && (this.state === State.FRAG_LOADING || this.state === State.FRAG_LOADING_WAITING_RETRY)) {
        if (fragCurrent.level !== data.level && fragCurrent.loader) {
          this.abortCurrentFrag();
        }
      }
      var sliding = 0;
      if (newDetails.live || (_curLevel$details = curLevel.details) != null && _curLevel$details.live) {
        var _this$levelLastLoaded;
        this.checkLiveUpdate(newDetails);
        if (newDetails.deltaUpdateFailed) {
          return;
        }
        sliding = this.alignPlaylists(newDetails, curLevel.details, (_this$levelLastLoaded = this.levelLastLoaded) == null ? void 0 : _this$levelLastLoaded.details);
      }
      // override level info
      curLevel.details = newDetails;
      this.levelLastLoaded = curLevel;
      this.hls.trigger(Events.LEVEL_UPDATED, {
        details: newDetails,
        level: newLevelId
      });

      // only switch back to IDLE state if we were waiting for level to start downloading a new fragment
      if (this.state === State.WAITING_LEVEL) {
        if (this.waitForCdnTuneIn(newDetails)) {
          // Wait for Low-Latency CDN Tune-in
          return;
        }
        this.state = State.IDLE;
      }
      if (!this.startFragRequested) {
        this.setStartPosition(newDetails, sliding);
      } else if (newDetails.live) {
        this.synchronizeToLiveEdge(newDetails);
      }

      // trigger handler right now
      this.tick();
    };
    _proto._handleFragmentLoadProgress = function _handleFragmentLoadProgress(data) {
      var _frag$initSegment;
      var frag = data.frag,
        part = data.part,
        payload = data.payload;
      var levels = this.levels;
      if (!levels) {
        this.warn("Levels were reset while fragment load was in progress. Fragment " + frag.sn + " of level " + frag.level + " will not be buffered");
        return;
      }
      var currentLevel = levels[frag.level];
      var details = currentLevel.details;
      if (!details) {
        this.warn("Dropping fragment " + frag.sn + " of level " + frag.level + " after level details were reset");
        this.fragmentTracker.removeFragment(frag);
        return;
      }
      var videoCodec = currentLevel.videoCodec;

      // time Offset is accurate if level PTS is known, or if playlist is not sliding (not live)
      var accurateTimeOffset = details.PTSKnown || !details.live;
      var initSegmentData = (_frag$initSegment = frag.initSegment) == null ? void 0 : _frag$initSegment.data;
      var audioCodec = this._getAudioCodec(currentLevel);

      // transmux the MPEG-TS data to ISO-BMFF segments
      // this.log(`Transmuxing ${frag.sn} of [${details.startSN} ,${details.endSN}],level ${frag.level}, cc ${frag.cc}`);
      var transmuxer = this.transmuxer = this.transmuxer || new TransmuxerInterface(this.hls, PlaylistLevelType.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this));
      var partIndex = part ? part.index : -1;
      var partial = partIndex !== -1;
      var chunkMeta = new ChunkMetadata(frag.level, frag.sn, frag.stats.chunkCount, payload.byteLength, partIndex, partial);
      var initPTS = this.initPTS[frag.cc];
      transmuxer.push(payload, initSegmentData, audioCodec, videoCodec, frag, part, details.totalduration, accurateTimeOffset, chunkMeta, initPTS);
    };
    _proto.onAudioTrackSwitching = function onAudioTrackSwitching(event, data) {
      // if any URL found on new audio track, it is an alternate audio track
      var fromAltAudio = this.altAudio;
      var altAudio = !!data.url;
      // if we switch on main audio, ensure that main fragment scheduling is synced with media.buffered
      // don't do anything if we switch to alt audio: audio stream controller is handling it.
      // we will just have to change buffer scheduling on audioTrackSwitched
      if (!altAudio) {
        if (this.mediaBuffer !== this.media) {
          this.log('Switching on main audio, use media.buffered to schedule main fragment loading');
          this.mediaBuffer = this.media;
          var fragCurrent = this.fragCurrent;
          // we need to refill audio buffer from main: cancel any frag loading to speed up audio switch
          if (fragCurrent) {
            this.log('Switching to main audio track, cancel main fragment load');
            fragCurrent.abortRequests();
            this.fragmentTracker.removeFragment(fragCurrent);
          }
          // destroy transmuxer to force init segment generation (following audio switch)
          this.resetTransmuxer();
          // switch to IDLE state to load new fragment
          this.resetLoadingState();
        } else if (this.audioOnly) {
          // Reset audio transmuxer so when switching back to main audio we're not still appending where we left off
          this.resetTransmuxer();
        }
        var hls = this.hls;
        // If switching from alt to main audio, flush all audio and trigger track switched
        if (fromAltAudio) {
          hls.trigger(Events.BUFFER_FLUSHING, {
            startOffset: 0,
            endOffset: Number.POSITIVE_INFINITY,
            type: null
          });
          this.fragmentTracker.removeAllFragments();
        }
        hls.trigger(Events.AUDIO_TRACK_SWITCHED, data);
      }
    };
    _proto.onAudioTrackSwitched = function onAudioTrackSwitched(event, data) {
      var trackId = data.id;
      var altAudio = !!this.hls.audioTracks[trackId].url;
      if (altAudio) {
        var videoBuffer = this.videoBuffer;
        // if we switched on alternate audio, ensure that main fragment scheduling is synced with video sourcebuffer buffered
        if (videoBuffer && this.mediaBuffer !== videoBuffer) {
          this.log('Switching on alternate audio, use video.buffered to schedule main fragment loading');
          this.mediaBuffer = videoBuffer;
        }
      }
      this.altAudio = altAudio;
      this.tick();
    };
    _proto.onBufferCreated = function onBufferCreated(event, data) {
      var tracks = data.tracks;
      var mediaTrack;
      var name;
      var alternate = false;
      for (var type in tracks) {
        var track = tracks[type];
        if (track.id === 'main') {
          name = type;
          mediaTrack = track;
          // keep video source buffer reference
          if (type === 'video') {
            var videoTrack = tracks[type];
            if (videoTrack) {
              this.videoBuffer = videoTrack.buffer;
            }
          }
        } else {
          alternate = true;
        }
      }
      if (alternate && mediaTrack) {
        this.log("Alternate track found, use " + name + ".buffered to schedule main fragment loading");
        this.mediaBuffer = mediaTrack.buffer;
      } else {
        this.mediaBuffer = this.media;
      }
    };
    _proto.onFragBuffered = function onFragBuffered(event, data) {
      var frag = data.frag,
        part = data.part;
      if (frag && frag.type !== PlaylistLevelType.MAIN) {
        return;
      }
      if (this.fragContextChanged(frag)) {
        // If a level switch was requested while a fragment was buffering, it will emit the FRAG_BUFFERED event upon completion
        // Avoid setting state back to IDLE, since that will interfere with a level switch
        this.warn("Fragment " + frag.sn + (part ? ' p: ' + part.index : '') + " of level " + frag.level + " finished buffering, but was aborted. state: " + this.state);
        if (this.state === State.PARSED) {
          this.state = State.IDLE;
        }
        return;
      }
      var stats = part ? part.stats : frag.stats;
      this.fragLastKbps = Math.round(8 * stats.total / (stats.buffering.end - stats.loading.first));
      if (frag.sn !== 'initSegment') {
        this.fragPrevious = frag;
      }
      this.fragBufferedComplete(frag, part);
    };
    _proto.onError = function onError(event, data) {
      var _data$context;
      if (data.fatal) {
        this.state = State.ERROR;
        return;
      }
      switch (data.details) {
        case ErrorDetails.FRAG_GAP:
        case ErrorDetails.FRAG_PARSING_ERROR:
        case ErrorDetails.FRAG_DECRYPT_ERROR:
        case ErrorDetails.FRAG_LOAD_ERROR:
        case ErrorDetails.FRAG_LOAD_TIMEOUT:
        case ErrorDetails.KEY_LOAD_ERROR:
        case ErrorDetails.KEY_LOAD_TIMEOUT:
          this.onFragmentOrKeyLoadError(PlaylistLevelType.MAIN, data);
          break;
        case ErrorDetails.LEVEL_LOAD_ERROR:
        case ErrorDetails.LEVEL_LOAD_TIMEOUT:
        case ErrorDetails.LEVEL_PARSING_ERROR:
          // in case of non fatal error while loading level, if level controller is not retrying to load level, switch back to IDLE
          if (!data.levelRetry && this.state === State.WAITING_LEVEL && ((_data$context = data.context) == null ? void 0 : _data$context.type) === PlaylistContextType.LEVEL) {
            this.state = State.IDLE;
          }
          break;
        case ErrorDetails.BUFFER_APPEND_ERROR:
        case ErrorDetails.BUFFER_FULL_ERROR:
          if (!data.parent || data.parent !== 'main') {
            return;
          }
          if (data.details === ErrorDetails.BUFFER_APPEND_ERROR) {
            this.resetLoadingState();
            return;
          }
          if (this.reduceLengthAndFlushBuffer(data)) {
            this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
          }
          break;
        case ErrorDetails.INTERNAL_EXCEPTION:
          this.recoverWorkerError(data);
          break;
      }
    }

    // Checks the health of the buffer and attempts to resolve playback stalls.
    ;
    _proto.checkBuffer = function checkBuffer() {
      var media = this.media,
        gapController = this.gapController;
      if (!media || !gapController || !media.readyState) {
        // Exit early if we don't have media or if the media hasn't buffered anything yet (readyState 0)
        return;
      }
      if (this.loadedmetadata || !BufferHelper.getBuffered(media).length) {
        // Resolve gaps using the main buffer, whose ranges are the intersections of the A/V sourcebuffers
        var activeFrag = this.state !== State.IDLE ? this.fragCurrent : null;
        gapController.poll(this.lastCurrentTime, activeFrag);
      }
      this.lastCurrentTime = media.currentTime;
    };
    _proto.onFragLoadEmergencyAborted = function onFragLoadEmergencyAborted() {
      this.state = State.IDLE;
      // if loadedmetadata is not set, it means that we are emergency switch down on first frag
      // in that case, reset startFragRequested flag
      if (!this.loadedmetadata) {
        this.startFragRequested = false;
        this.nextLoadPosition = this.startPosition;
      }
      this.tickImmediate();
    };
    _proto.onBufferFlushed = function onBufferFlushed(event, _ref) {
      var type = _ref.type;
      if (type !== ElementaryStreamTypes.AUDIO || this.audioOnly && !this.altAudio) {
        var mediaBuffer = (type === ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
        this.afterBufferFlushed(mediaBuffer, type, PlaylistLevelType.MAIN);
        this.tick();
      }
    };
    _proto.onLevelsUpdated = function onLevelsUpdated(event, data) {
      if (this.level > -1 && this.fragCurrent) {
        this.level = this.fragCurrent.level;
      }
      this.levels = data.levels;
    };
    _proto.swapAudioCodec = function swapAudioCodec() {
      this.audioCodecSwap = !this.audioCodecSwap;
    }

    /**
     * Seeks to the set startPosition if not equal to the mediaElement's current time.
     */;
    _proto.seekToStartPos = function seekToStartPos() {
      var media = this.media;
      if (!media) {
        return;
      }
      var currentTime = media.currentTime;
      var startPosition = this.startPosition;
      // only adjust currentTime if different from startPosition or if startPosition not buffered
      // at that stage, there should be only one buffered range, as we reach that code after first fragment has been buffered
      if (startPosition >= 0 && currentTime < startPosition) {
        if (media.seeking) {
          this.log("could not seek to " + startPosition + ", already seeking at " + currentTime);
          return;
        }
        var buffered = BufferHelper.getBuffered(media);
        var bufferStart = buffered.length ? buffered.start(0) : 0;
        var delta = bufferStart - startPosition;
        if (delta > 0 && (delta < this.config.maxBufferHole || delta < this.config.maxFragLookUpTolerance)) {
          this.log("adjusting start position by " + delta + " to match buffer start");
          startPosition += delta;
          this.startPosition = startPosition;
        }
        this.log("seek to target start position " + startPosition + " from current time " + currentTime);
        media.currentTime = startPosition;
      }
    };
    _proto._getAudioCodec = function _getAudioCodec(currentLevel) {
      var audioCodec = this.config.defaultAudioCodec || currentLevel.audioCodec;
      if (this.audioCodecSwap && audioCodec) {
        this.log('Swapping audio codec');
        if (audioCodec.indexOf('mp4a.40.5') !== -1) {
          audioCodec = 'mp4a.40.2';
        } else {
          audioCodec = 'mp4a.40.5';
        }
      }
      return audioCodec;
    };
    _proto._loadBitrateTestFrag = function _loadBitrateTestFrag(frag, level) {
      var _this2 = this;
      frag.bitrateTest = true;
      this._doFragLoad(frag, level).then(function (data) {
        var hls = _this2.hls;
        if (!data || _this2.fragContextChanged(frag)) {
          return;
        }
        level.fragmentError = 0;
        _this2.state = State.IDLE;
        _this2.startFragRequested = false;
        _this2.bitrateTest = false;
        var stats = frag.stats;
        // Bitrate tests fragments are neither parsed nor buffered
        stats.parsing.start = stats.parsing.end = stats.buffering.start = stats.buffering.end = self.performance.now();
        hls.trigger(Events.FRAG_LOADED, data);
        frag.bitrateTest = false;
      });
    };
    _proto._handleTransmuxComplete = function _handleTransmuxComplete(transmuxResult) {
      var _id3$samples;
      var id = 'main';
      var hls = this.hls;
      var remuxResult = transmuxResult.remuxResult,
        chunkMeta = transmuxResult.chunkMeta;
      var context = this.getCurrentContext(chunkMeta);
      if (!context) {
        this.resetWhenMissingContext(chunkMeta);
        return;
      }
      var frag = context.frag,
        part = context.part,
        level = context.level;
      var video = remuxResult.video,
        text = remuxResult.text,
        id3 = remuxResult.id3,
        initSegment = remuxResult.initSegment;
      var details = level.details;
      // The audio-stream-controller handles audio buffering if Hls.js is playing an alternate audio track
      var audio = this.altAudio ? undefined : remuxResult.audio;

      // Check if the current fragment has been aborted. We check this by first seeing if we're still playing the current level.
      // If we are, subsequently check if the currently loading fragment (fragCurrent) has changed.
      if (this.fragContextChanged(frag)) {
        this.fragmentTracker.removeFragment(frag);
        return;
      }
      this.state = State.PARSING;
      if (initSegment) {
        if (initSegment != null && initSegment.tracks) {
          var mapFragment = frag.initSegment || frag;
          this._bufferInitSegment(level, initSegment.tracks, mapFragment, chunkMeta);
          hls.trigger(Events.FRAG_PARSING_INIT_SEGMENT, {
            frag: mapFragment,
            id: id,
            tracks: initSegment.tracks
          });
        }

        // This would be nice if Number.isFinite acted as a typeguard, but it doesn't. See: https://github.com/Microsoft/TypeScript/issues/10038
        var initPTS = initSegment.initPTS;
        var timescale = initSegment.timescale;
        if (isFiniteNumber(initPTS)) {
          this.initPTS[frag.cc] = {
            baseTime: initPTS,
            timescale: timescale
          };
          hls.trigger(Events.INIT_PTS_FOUND, {
            frag: frag,
            id: id,
            initPTS: initPTS,
            timescale: timescale
          });
        }
      }

      // Avoid buffering if backtracking this fragment
      if (video && details && frag.sn !== 'initSegment') {
        var prevFrag = details.fragments[frag.sn - 1 - details.startSN];
        var isFirstFragment = frag.sn === details.startSN;
        var isFirstInDiscontinuity = !prevFrag || frag.cc > prevFrag.cc;
        if (remuxResult.independent !== false) {
          var startPTS = video.startPTS,
            endPTS = video.endPTS,
            startDTS = video.startDTS,
            endDTS = video.endDTS;
          if (part) {
            part.elementaryStreams[video.type] = {
              startPTS: startPTS,
              endPTS: endPTS,
              startDTS: startDTS,
              endDTS: endDTS
            };
          } else {
            if (video.firstKeyFrame && video.independent && chunkMeta.id === 1 && !isFirstInDiscontinuity) {
              this.couldBacktrack = true;
            }
            if (video.dropped && video.independent) {
              // Backtrack if dropped frames create a gap after currentTime

              var bufferInfo = this.getMainFwdBufferInfo();
              var targetBufferTime = (bufferInfo ? bufferInfo.end : this.getLoadPosition()) + this.config.maxBufferHole;
              var startTime = video.firstKeyFramePTS ? video.firstKeyFramePTS : startPTS;
              if (!isFirstFragment && targetBufferTime < startTime - this.config.maxBufferHole && !isFirstInDiscontinuity) {
                this.backtrack(frag);
                return;
              } else if (isFirstInDiscontinuity) {
                // Mark segment with a gap to avoid loop loading
                frag.gap = true;
              }
              // Set video stream start to fragment start so that truncated samples do not distort the timeline, and mark it partial
              frag.setElementaryStreamInfo(video.type, frag.start, endPTS, frag.start, endDTS, true);
            } else if (isFirstFragment && startPTS > MAX_START_GAP_JUMP) {
              // Mark segment with a gap to skip large start gap
              frag.gap = true;
            }
          }
          frag.setElementaryStreamInfo(video.type, startPTS, endPTS, startDTS, endDTS);
          if (this.backtrackFragment) {
            this.backtrackFragment = frag;
          }
          this.bufferFragmentData(video, frag, part, chunkMeta, isFirstFragment || isFirstInDiscontinuity);
        } else if (isFirstFragment || isFirstInDiscontinuity) {
          // Mark segment with a gap to avoid loop loading
          frag.gap = true;
        } else {
          this.backtrack(frag);
          return;
        }
      }
      if (audio) {
        var _startPTS = audio.startPTS,
          _endPTS = audio.endPTS,
          _startDTS = audio.startDTS,
          _endDTS = audio.endDTS;
        if (part) {
          part.elementaryStreams[ElementaryStreamTypes.AUDIO] = {
            startPTS: _startPTS,
            endPTS: _endPTS,
            startDTS: _startDTS,
            endDTS: _endDTS
          };
        }
        frag.setElementaryStreamInfo(ElementaryStreamTypes.AUDIO, _startPTS, _endPTS, _startDTS, _endDTS);
        this.bufferFragmentData(audio, frag, part, chunkMeta);
      }
      if (details && id3 != null && (_id3$samples = id3.samples) != null && _id3$samples.length) {
        var emittedID3 = {
          id: id,
          frag: frag,
          details: details,
          samples: id3.samples
        };
        hls.trigger(Events.FRAG_PARSING_METADATA, emittedID3);
      }
      if (details && text) {
        var emittedText = {
          id: id,
          frag: frag,
          details: details,
          samples: text.samples
        };
        hls.trigger(Events.FRAG_PARSING_USERDATA, emittedText);
      }
    };
    _proto._bufferInitSegment = function _bufferInitSegment(currentLevel, tracks, frag, chunkMeta) {
      var _this3 = this;
      if (this.state !== State.PARSING) {
        return;
      }
      this.audioOnly = !!tracks.audio && !tracks.video;

      // if audio track is expected to come from audio stream controller, discard any coming from main
      if (this.altAudio && !this.audioOnly) {
        delete tracks.audio;
      }
      // include levelCodec in audio and video tracks
      var audio = tracks.audio,
        video = tracks.video,
        audiovideo = tracks.audiovideo;
      if (audio) {
        var audioCodec = currentLevel.audioCodec;
        var ua = navigator.userAgent.toLowerCase();
        if (this.audioCodecSwitch) {
          if (audioCodec) {
            if (audioCodec.indexOf('mp4a.40.5') !== -1) {
              audioCodec = 'mp4a.40.2';
            } else {
              audioCodec = 'mp4a.40.5';
            }
          }
          // In the case that AAC and HE-AAC audio codecs are signalled in manifest,
          // force HE-AAC, as it seems that most browsers prefers it.
          // don't force HE-AAC if mono stream, or in Firefox
          if (audio.metadata.channelCount !== 1 && ua.indexOf('firefox') === -1) {
            audioCodec = 'mp4a.40.5';
          }
        }
        // HE-AAC is broken on Android, always signal audio codec as AAC even if variant manifest states otherwise
        if (audioCodec && audioCodec.indexOf('mp4a.40.5') !== -1 && ua.indexOf('android') !== -1 && audio.container !== 'audio/mpeg') {
          // Exclude mpeg audio
          audioCodec = 'mp4a.40.2';
          this.log("Android: force audio codec to " + audioCodec);
        }
        if (currentLevel.audioCodec && currentLevel.audioCodec !== audioCodec) {
          this.log("Swapping manifest audio codec \"" + currentLevel.audioCodec + "\" for \"" + audioCodec + "\"");
        }
        audio.levelCodec = audioCodec;
        audio.id = 'main';
        this.log("Init audio buffer, container:" + audio.container + ", codecs[selected/level/parsed]=[" + (audioCodec || '') + "/" + (currentLevel.audioCodec || '') + "/" + audio.codec + "]");
      }
      if (video) {
        video.levelCodec = currentLevel.videoCodec;
        video.id = 'main';
        this.log("Init video buffer, container:" + video.container + ", codecs[level/parsed]=[" + (currentLevel.videoCodec || '') + "/" + video.codec + "]");
      }
      if (audiovideo) {
        this.log("Init audiovideo buffer, container:" + audiovideo.container + ", codecs[level/parsed]=[" + currentLevel.codecs + "/" + audiovideo.codec + "]");
      }
      this.hls.trigger(Events.BUFFER_CODECS, tracks);
      // loop through tracks that are going to be provided to bufferController
      Object.keys(tracks).forEach(function (trackName) {
        var track = tracks[trackName];
        var initSegment = track.initSegment;
        if (initSegment != null && initSegment.byteLength) {
          _this3.hls.trigger(Events.BUFFER_APPENDING, {
            type: trackName,
            data: initSegment,
            frag: frag,
            part: null,
            chunkMeta: chunkMeta,
            parent: frag.type
          });
        }
      });
      // trigger handler right now
      this.tickImmediate();
    };
    _proto.getMainFwdBufferInfo = function getMainFwdBufferInfo() {
      return this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, PlaylistLevelType.MAIN);
    };
    _proto.backtrack = function backtrack(frag) {
      this.couldBacktrack = true;
      // Causes findFragments to backtrack through fragments to find the keyframe
      this.backtrackFragment = frag;
      this.resetTransmuxer();
      this.flushBufferGap(frag);
      this.fragmentTracker.removeFragment(frag);
      this.fragPrevious = null;
      this.nextLoadPosition = frag.start;
      this.state = State.IDLE;
    };
    _proto.checkFragmentChanged = function checkFragmentChanged() {
      var video = this.media;
      var fragPlayingCurrent = null;
      if (video && video.readyState > 1 && video.seeking === false) {
        var currentTime = video.currentTime;
        /* if video element is in seeked state, currentTime can only increase.
          (assuming that playback rate is positive ...)
          As sometimes currentTime jumps back to zero after a
          media decode error, check this, to avoid seeking back to
          wrong position after a media decode error
        */

        if (BufferHelper.isBuffered(video, currentTime)) {
          fragPlayingCurrent = this.getAppendedFrag(currentTime);
        } else if (BufferHelper.isBuffered(video, currentTime + 0.1)) {
          /* ensure that FRAG_CHANGED event is triggered at startup,
            when first video frame is displayed and playback is paused.
            add a tolerance of 100ms, in case current position is not buffered,
            check if current pos+100ms is buffered and use that buffer range
            for FRAG_CHANGED event reporting */
          fragPlayingCurrent = this.getAppendedFrag(currentTime + 0.1);
        }
        if (fragPlayingCurrent) {
          this.backtrackFragment = null;
          var fragPlaying = this.fragPlaying;
          var fragCurrentLevel = fragPlayingCurrent.level;
          if (!fragPlaying || fragPlayingCurrent.sn !== fragPlaying.sn || fragPlaying.level !== fragCurrentLevel) {
            this.fragPlaying = fragPlayingCurrent;
            this.hls.trigger(Events.FRAG_CHANGED, {
              frag: fragPlayingCurrent
            });
            if (!fragPlaying || fragPlaying.level !== fragCurrentLevel) {
              this.hls.trigger(Events.LEVEL_SWITCHED, {
                level: fragCurrentLevel
              });
            }
          }
        }
      }
    };
    _createClass(StreamController, [{
      key: "nextLevel",
      get: function get() {
        var frag = this.nextBufferedFrag;
        if (frag) {
          return frag.level;
        }
        return -1;
      }
    }, {
      key: "currentFrag",
      get: function get() {
        var media = this.media;
        if (media) {
          return this.fragPlaying || this.getAppendedFrag(media.currentTime);
        }
        return null;
      }
    }, {
      key: "currentProgramDateTime",
      get: function get() {
        var media = this.media;
        if (media) {
          var currentTime = media.currentTime;
          var frag = this.currentFrag;
          if (frag && isFiniteNumber(currentTime) && isFiniteNumber(frag.programDateTime)) {
            var epocMs = frag.programDateTime + (currentTime - frag.start) * 1000;
            return new Date(epocMs);
          }
        }
        return null;
      }
    }, {
      key: "currentLevel",
      get: function get() {
        var frag = this.currentFrag;
        if (frag) {
          return frag.level;
        }
        return -1;
      }
    }, {
      key: "nextBufferedFrag",
      get: function get() {
        var frag = this.currentFrag;
        if (frag) {
          return this.followingBufferedFrag(frag);
        }
        return null;
      }
    }, {
      key: "forceStartLoad",
      get: function get() {
        return this._forceStartLoad;
      }
    }]);
    return StreamController;
  }(BaseStreamController);

  /**
   * The `Hls` class is the core of the HLS.js library used to instantiate player instances.
   * @public
   */
  var Hls = /*#__PURE__*/function () {
    /**
     * Check if the required MediaSource Extensions are available.
     */
    Hls.isMSESupported = function isMSESupported$1() {
      return isMSESupported();
    }

    /**
     * Check if MediaSource Extensions are available and isTypeSupported checks pass for any baseline codecs.
     */;
    Hls.isSupported = function isSupported$1() {
      return isSupported();
    }

    /**
     * Get the MediaSource global used for MSE playback (ManagedMediaSource, MediaSource, or WebKitMediaSource).
     */;
    Hls.getMediaSource = function getMediaSource$1() {
      return getMediaSource();
    };
    /**
     * Creates an instance of an HLS client that can attach to exactly one `HTMLMediaElement`.
     * @param userConfig - Configuration options applied over `Hls.DefaultConfig`
     */
    function Hls(userConfig) {
      if (userConfig === void 0) {
        userConfig = {};
      }
      /**
       * The runtime configuration used by the player. At instantiation this is combination of `hls.userConfig` merged over `Hls.DefaultConfig`.
       */
      this.config = void 0;
      /**
       * The configuration object provided on player instantiation.
       */
      this.userConfig = void 0;
      this.coreComponents = void 0;
      this.networkControllers = void 0;
      this.started = false;
      this._emitter = new EventEmitter();
      this._autoLevelCapping = -1;
      this._maxHdcpLevel = null;
      this.abrController = void 0;
      this.bufferController = void 0;
      this.capLevelController = void 0;
      this.latencyController = void 0;
      this.levelController = void 0;
      this.streamController = void 0;
      this.audioTrackController = void 0;
      this.subtitleTrackController = void 0;
      this.emeController = void 0;
      this.cmcdController = void 0;
      this._media = null;
      this.url = null;
      this.triggeringException = void 0;
      enableLogs(userConfig.debug || false, 'Hls instance');
      var config = this.config = mergeConfig(Hls.DefaultConfig, userConfig);
      this.userConfig = userConfig;
      if (config.progressive) {
        enableStreamingMode(config);
      }

      // core controllers and network loaders
      var ConfigAbrController = config.abrController,
        ConfigBufferController = config.bufferController,
        ConfigCapLevelController = config.capLevelController,
        ConfigErrorController = config.errorController,
        ConfigFpsController = config.fpsController;
      var errorController = new ConfigErrorController(this);
      var abrController = this.abrController = new ConfigAbrController(this);
      var bufferController = this.bufferController = new ConfigBufferController(this);
      var capLevelController = this.capLevelController = new ConfigCapLevelController(this);
      var fpsController = new ConfigFpsController(this);
      var playListLoader = new PlaylistLoader(this);
      var id3TrackController = new ID3TrackController(this);
      var ConfigContentSteeringController = config.contentSteeringController;
      // ConentSteeringController is defined before LevelController to receive Multivariant Playlist events first
      var contentSteering = ConfigContentSteeringController ? new ConfigContentSteeringController(this) : null;
      var levelController = this.levelController = new LevelController(this, contentSteering);
      // FragmentTracker must be defined before StreamController because the order of event handling is important
      var fragmentTracker = new FragmentTracker(this);
      var keyLoader = new KeyLoader(this.config);
      var streamController = this.streamController = new StreamController(this, fragmentTracker, keyLoader);

      // Cap level controller uses streamController to flush the buffer
      capLevelController.setStreamController(streamController);
      // fpsController uses streamController to switch when frames are being dropped
      fpsController.setStreamController(streamController);
      var networkControllers = [playListLoader, levelController, streamController];
      if (contentSteering) {
        networkControllers.splice(1, 0, contentSteering);
      }
      this.networkControllers = networkControllers;
      var coreComponents = [abrController, bufferController, capLevelController, fpsController, id3TrackController, fragmentTracker];
      this.audioTrackController = this.createController(config.audioTrackController, networkControllers);
      var AudioStreamControllerClass = config.audioStreamController;
      if (AudioStreamControllerClass) {
        networkControllers.push(new AudioStreamControllerClass(this, fragmentTracker, keyLoader));
      }
      // subtitleTrackController must be defined before subtitleStreamController because the order of event handling is important
      this.subtitleTrackController = this.createController(config.subtitleTrackController, networkControllers);
      var SubtitleStreamControllerClass = config.subtitleStreamController;
      if (SubtitleStreamControllerClass) {
        networkControllers.push(new SubtitleStreamControllerClass(this, fragmentTracker, keyLoader));
      }
      this.createController(config.timelineController, coreComponents);
      keyLoader.emeController = this.emeController = this.createController(config.emeController, coreComponents);
      this.cmcdController = this.createController(config.cmcdController, coreComponents);
      this.latencyController = this.createController(LatencyController, coreComponents);
      this.coreComponents = coreComponents;

      // Error controller handles errors before and after all other controllers
      // This listener will be invoked after all other controllers error listeners
      networkControllers.push(errorController);
      var onErrorOut = errorController.onErrorOut;
      if (typeof onErrorOut === 'function') {
        this.on(Events.ERROR, onErrorOut, errorController);
      }
    }
    var _proto = Hls.prototype;
    _proto.createController = function createController(ControllerClass, components) {
      if (ControllerClass) {
        var controllerInstance = new ControllerClass(this);
        if (components) {
          components.push(controllerInstance);
        }
        return controllerInstance;
      }
      return null;
    }

    // Delegate the EventEmitter through the public API of Hls.js
    ;
    _proto.on = function on(event, listener, context) {
      if (context === void 0) {
        context = this;
      }
      this._emitter.on(event, listener, context);
    };
    _proto.once = function once(event, listener, context) {
      if (context === void 0) {
        context = this;
      }
      this._emitter.once(event, listener, context);
    };
    _proto.removeAllListeners = function removeAllListeners(event) {
      this._emitter.removeAllListeners(event);
    };
    _proto.off = function off(event, listener, context, once) {
      if (context === void 0) {
        context = this;
      }
      this._emitter.off(event, listener, context, once);
    };
    _proto.listeners = function listeners(event) {
      return this._emitter.listeners(event);
    };
    _proto.emit = function emit(event, name, eventObject) {
      return this._emitter.emit(event, name, eventObject);
    };
    _proto.trigger = function trigger(event, eventObject) {
      if (this.config.debug) {
        return this.emit(event, event, eventObject);
      } else {
        try {
          return this.emit(event, event, eventObject);
        } catch (error) {
          logger.error('An internal error happened while handling event ' + event + '. Error message: "' + error.message + '". Here is a stacktrace:', error);
          // Prevent recursion in error event handlers that throw #5497
          if (!this.triggeringException) {
            this.triggeringException = true;
            var fatal = event === Events.ERROR;
            this.trigger(Events.ERROR, {
              type: ErrorTypes.OTHER_ERROR,
              details: ErrorDetails.INTERNAL_EXCEPTION,
              fatal: fatal,
              event: event,
              error: error
            });
            this.triggeringException = false;
          }
        }
      }
      return false;
    };
    _proto.listenerCount = function listenerCount(event) {
      return this._emitter.listenerCount(event);
    }

    /**
     * Dispose of the instance
     */;
    _proto.destroy = function destroy() {
      logger.log('destroy');
      this.trigger(Events.DESTROYING, undefined);
      this.detachMedia();
      this.removeAllListeners();
      this._autoLevelCapping = -1;
      this.url = null;
      this.networkControllers.forEach(function (component) {
        return component.destroy();
      });
      this.networkControllers.length = 0;
      this.coreComponents.forEach(function (component) {
        return component.destroy();
      });
      this.coreComponents.length = 0;
      // Remove any references that could be held in config options or callbacks
      var config = this.config;
      config.xhrSetup = config.fetchSetup = undefined;
      // @ts-ignore
      this.userConfig = null;
    }

    /**
     * Attaches Hls.js to a media element
     */;
    _proto.attachMedia = function attachMedia(media) {
      logger.log('attachMedia');
      this._media = media;
      this.trigger(Events.MEDIA_ATTACHING, {
        media: media
      });
    }

    /**
     * Detach Hls.js from the media
     */;
    _proto.detachMedia = function detachMedia() {
      logger.log('detachMedia');
      this.trigger(Events.MEDIA_DETACHING, undefined);
      this._media = null;
    }

    /**
     * Set the source URL. Can be relative or absolute.
     */;
    _proto.loadSource = function loadSource(url) {
      this.stopLoad();
      var media = this.media;
      var loadedSource = this.url;
      var loadingSource = this.url = urlToolkitExports.buildAbsoluteURL(self.location.href, url, {
        alwaysNormalize: true
      });
      this._autoLevelCapping = -1;
      this._maxHdcpLevel = null;
      logger.log("loadSource:" + loadingSource);
      if (media && loadedSource && (loadedSource !== loadingSource || this.bufferController.hasSourceTypes())) {
        this.detachMedia();
        this.attachMedia(media);
      }
      // when attaching to a source URL, trigger a playlist load
      this.trigger(Events.MANIFEST_LOADING, {
        url: url
      });
    }

    /**
     * Start loading data from the stream source.
     * Depending on default config, client starts loading automatically when a source is set.
     *
     * @param startPosition - Set the start position to stream from.
     * Defaults to -1 (None: starts from earliest point)
     */;
    _proto.startLoad = function startLoad(startPosition) {
      if (startPosition === void 0) {
        startPosition = -1;
      }
      logger.log("startLoad(" + startPosition + ")");
      this.started = true;
      this.networkControllers.forEach(function (controller) {
        controller.startLoad(startPosition);
      });
    }

    /**
     * Stop loading of any stream data.
     */;
    _proto.stopLoad = function stopLoad() {
      logger.log('stopLoad');
      this.started = false;
      this.networkControllers.forEach(function (controller) {
        controller.stopLoad();
      });
    }

    /**
     * Resumes stream controller segment loading if previously started.
     */;
    _proto.resumeBuffering = function resumeBuffering() {
      if (this.started) {
        this.networkControllers.forEach(function (controller) {
          if ('fragmentLoader' in controller) {
            controller.startLoad(-1);
          }
        });
      }
    }

    /**
     * Stops stream controller segment loading without changing 'started' state like stopLoad().
     * This allows for media buffering to be paused without interupting playlist loading.
     */;
    _proto.pauseBuffering = function pauseBuffering() {
      this.networkControllers.forEach(function (controller) {
        if ('fragmentLoader' in controller) {
          controller.stopLoad();
        }
      });
    }

    /**
     * Swap through possible audio codecs in the stream (for example to switch from stereo to 5.1)
     */;
    _proto.swapAudioCodec = function swapAudioCodec() {
      logger.log('swapAudioCodec');
      this.streamController.swapAudioCodec();
    }

    /**
     * When the media-element fails, this allows to detach and then re-attach it
     * as one call (convenience method).
     *
     * Automatic recovery of media-errors by this process is configurable.
     */;
    _proto.recoverMediaError = function recoverMediaError() {
      logger.log('recoverMediaError');
      var media = this._media;
      this.detachMedia();
      if (media) {
        this.attachMedia(media);
      }
    };
    _proto.removeLevel = function removeLevel(levelIndex) {
      this.levelController.removeLevel(levelIndex);
    }

    /**
     * @returns an array of levels (variants) sorted by HDCP-LEVEL, RESOLUTION (height), FRAME-RATE, CODECS, VIDEO-RANGE, and BANDWIDTH
     */;
    /**
     * Find and select the best matching audio track, making a level switch when a Group change is necessary.
     * Updates `hls.config.audioPreference`. Returns the selected track, or null when no matching track is found.
     */
    _proto.setAudioOption = function setAudioOption(audioOption) {
      var _this$audioTrackContr;
      return (_this$audioTrackContr = this.audioTrackController) == null ? void 0 : _this$audioTrackContr.setAudioOption(audioOption);
    }
    /**
     * Find and select the best matching subtitle track, making a level switch when a Group change is necessary.
     * Updates `hls.config.subtitlePreference`. Returns the selected track, or null when no matching track is found.
     */;
    _proto.setSubtitleOption = function setSubtitleOption(subtitleOption) {
      var _this$subtitleTrackCo;
      (_this$subtitleTrackCo = this.subtitleTrackController) == null ? void 0 : _this$subtitleTrackCo.setSubtitleOption(subtitleOption);
      return null;
    }

    /**
     * Get the complete list of audio tracks across all media groups
     */;
    _createClass(Hls, [{
      key: "levels",
      get: function get() {
        var levels = this.levelController.levels;
        return levels ? levels : [];
      }

      /**
       * Index of quality level (variant) currently played
       */
    }, {
      key: "currentLevel",
      get: function get() {
        return this.streamController.currentLevel;
      }

      /**
       * Set quality level index immediately. This will flush the current buffer to replace the quality asap. That means playback will interrupt at least shortly to re-buffer and re-sync eventually. Set to -1 for automatic level selection.
       */,
      set: function set(newLevel) {
        logger.log("set currentLevel:" + newLevel);
        this.levelController.manualLevel = newLevel;
        this.streamController.immediateLevelSwitch();
      }

      /**
       * Index of next quality level loaded as scheduled by stream controller.
       */
    }, {
      key: "nextLevel",
      get: function get() {
        return this.streamController.nextLevel;
      }

      /**
       * Set quality level index for next loaded data.
       * This will switch the video quality asap, without interrupting playback.
       * May abort current loading of data, and flush parts of buffer (outside currently played fragment region).
       * @param newLevel - Pass -1 for automatic level selection
       */,
      set: function set(newLevel) {
        logger.log("set nextLevel:" + newLevel);
        this.levelController.manualLevel = newLevel;
        this.streamController.nextLevelSwitch();
      }

      /**
       * Return the quality level of the currently or last (of none is loaded currently) segment
       */
    }, {
      key: "loadLevel",
      get: function get() {
        return this.levelController.level;
      }

      /**
       * Set quality level index for next loaded data in a conservative way.
       * This will switch the quality without flushing, but interrupt current loading.
       * Thus the moment when the quality switch will appear in effect will only be after the already existing buffer.
       * @param newLevel - Pass -1 for automatic level selection
       */,
      set: function set(newLevel) {
        logger.log("set loadLevel:" + newLevel);
        this.levelController.manualLevel = newLevel;
      }

      /**
       * get next quality level loaded
       */
    }, {
      key: "nextLoadLevel",
      get: function get() {
        return this.levelController.nextLoadLevel;
      }

      /**
       * Set quality level of next loaded segment in a fully "non-destructive" way.
       * Same as `loadLevel` but will wait for next switch (until current loading is done).
       */,
      set: function set(level) {
        this.levelController.nextLoadLevel = level;
      }

      /**
       * Return "first level": like a default level, if not set,
       * falls back to index of first level referenced in manifest
       */
    }, {
      key: "firstLevel",
      get: function get() {
        return Math.max(this.levelController.firstLevel, this.minAutoLevel);
      }

      /**
       * Sets "first-level", see getter.
       */,
      set: function set(newLevel) {
        logger.log("set firstLevel:" + newLevel);
        this.levelController.firstLevel = newLevel;
      }

      /**
       * Return the desired start level for the first fragment that will be loaded.
       * The default value of -1 indicates automatic start level selection.
       * Setting hls.nextAutoLevel without setting a startLevel will result in
       * the nextAutoLevel value being used for one fragment load.
       */
    }, {
      key: "startLevel",
      get: function get() {
        var startLevel = this.levelController.startLevel;
        if (startLevel === -1 && this.abrController.forcedAutoLevel > -1) {
          return this.abrController.forcedAutoLevel;
        }
        return startLevel;
      }

      /**
       * set  start level (level of first fragment that will be played back)
       * if not overrided by user, first level appearing in manifest will be used as start level
       * if -1 : automatic start level selection, playback will start from level matching download bandwidth
       * (determined from download of first segment)
       */,
      set: function set(newLevel) {
        logger.log("set startLevel:" + newLevel);
        // if not in automatic start level detection, ensure startLevel is greater than minAutoLevel
        if (newLevel !== -1) {
          newLevel = Math.max(newLevel, this.minAutoLevel);
        }
        this.levelController.startLevel = newLevel;
      }

      /**
       * Whether level capping is enabled.
       * Default value is set via `config.capLevelToPlayerSize`.
       */
    }, {
      key: "capLevelToPlayerSize",
      get: function get() {
        return this.config.capLevelToPlayerSize;
      }

      /**
       * Enables or disables level capping. If disabled after previously enabled, `nextLevelSwitch` will be immediately called.
       */,
      set: function set(shouldStartCapping) {
        var newCapLevelToPlayerSize = !!shouldStartCapping;
        if (newCapLevelToPlayerSize !== this.config.capLevelToPlayerSize) {
          if (newCapLevelToPlayerSize) {
            this.capLevelController.startCapping(); // If capping occurs, nextLevelSwitch will happen based on size.
          } else {
            this.capLevelController.stopCapping();
            this.autoLevelCapping = -1;
            this.streamController.nextLevelSwitch(); // Now we're uncapped, get the next level asap.
          }
          this.config.capLevelToPlayerSize = newCapLevelToPlayerSize;
        }
      }

      /**
       * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
       */
    }, {
      key: "autoLevelCapping",
      get: function get() {
        return this._autoLevelCapping;
      }

      /**
       * Returns the current bandwidth estimate in bits per second, when available. Otherwise, `NaN` is returned.
       */,
      set:
      /**
       * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
       */
      function set(newLevel) {
        if (this._autoLevelCapping !== newLevel) {
          logger.log("set autoLevelCapping:" + newLevel);
          this._autoLevelCapping = newLevel;
          this.levelController.checkMaxAutoUpdated();
        }
      }
    }, {
      key: "bandwidthEstimate",
      get: function get() {
        var bwEstimator = this.abrController.bwEstimator;
        if (!bwEstimator) {
          return NaN;
        }
        return bwEstimator.getEstimate();
      },
      set: function set(abrEwmaDefaultEstimate) {
        this.abrController.resetEstimator(abrEwmaDefaultEstimate);
      }

      /**
       * get time to first byte estimate
       * @type {number}
       */
    }, {
      key: "ttfbEstimate",
      get: function get() {
        var bwEstimator = this.abrController.bwEstimator;
        if (!bwEstimator) {
          return NaN;
        }
        return bwEstimator.getEstimateTTFB();
      }
    }, {
      key: "maxHdcpLevel",
      get: function get() {
        return this._maxHdcpLevel;
      },
      set: function set(value) {
        if (isHdcpLevel(value) && this._maxHdcpLevel !== value) {
          this._maxHdcpLevel = value;
          this.levelController.checkMaxAutoUpdated();
        }
      }

      /**
       * True when automatic level selection enabled
       */
    }, {
      key: "autoLevelEnabled",
      get: function get() {
        return this.levelController.manualLevel === -1;
      }

      /**
       * Level set manually (if any)
       */
    }, {
      key: "manualLevel",
      get: function get() {
        return this.levelController.manualLevel;
      }

      /**
       * min level selectable in auto mode according to config.minAutoBitrate
       */
    }, {
      key: "minAutoLevel",
      get: function get() {
        var levels = this.levels,
          minAutoBitrate = this.config.minAutoBitrate;
        if (!levels) return 0;
        var len = levels.length;
        for (var i = 0; i < len; i++) {
          if (levels[i].maxBitrate >= minAutoBitrate) {
            return i;
          }
        }
        return 0;
      }

      /**
       * max level selectable in auto mode according to autoLevelCapping
       */
    }, {
      key: "maxAutoLevel",
      get: function get() {
        var levels = this.levels,
          autoLevelCapping = this.autoLevelCapping,
          maxHdcpLevel = this.maxHdcpLevel;
        var maxAutoLevel;
        if (autoLevelCapping === -1 && levels != null && levels.length) {
          maxAutoLevel = levels.length - 1;
        } else {
          maxAutoLevel = autoLevelCapping;
        }
        if (maxHdcpLevel) {
          for (var i = maxAutoLevel; i--;) {
            var hdcpLevel = levels[i].attrs['HDCP-LEVEL'];
            if (hdcpLevel && hdcpLevel <= maxHdcpLevel) {
              return i;
            }
          }
        }
        return maxAutoLevel;
      }
    }, {
      key: "firstAutoLevel",
      get: function get() {
        return this.abrController.firstAutoLevel;
      }

      /**
       * next automatically selected quality level
       */
    }, {
      key: "nextAutoLevel",
      get: function get() {
        return this.abrController.nextAutoLevel;
      }

      /**
       * this setter is used to force next auto level.
       * this is useful to force a switch down in auto mode:
       * in case of load error on level N, hls.js can set nextAutoLevel to N-1 for example)
       * forced value is valid for one fragment. upon successful frag loading at forced level,
       * this value will be resetted to -1 by ABR controller.
       */,
      set: function set(nextLevel) {
        this.abrController.nextAutoLevel = nextLevel;
      }

      /**
       * get the datetime value relative to media.currentTime for the active level Program Date Time if present
       */
    }, {
      key: "playingDate",
      get: function get() {
        return this.streamController.currentProgramDateTime;
      }
    }, {
      key: "mainForwardBufferInfo",
      get: function get() {
        return this.streamController.getMainFwdBufferInfo();
      }
    }, {
      key: "allAudioTracks",
      get: function get() {
        var audioTrackController = this.audioTrackController;
        return audioTrackController ? audioTrackController.allAudioTracks : [];
      }

      /**
       * Get the list of selectable audio tracks
       */
    }, {
      key: "audioTracks",
      get: function get() {
        var audioTrackController = this.audioTrackController;
        return audioTrackController ? audioTrackController.audioTracks : [];
      }

      /**
       * index of the selected audio track (index in audio track lists)
       */
    }, {
      key: "audioTrack",
      get: function get() {
        var audioTrackController = this.audioTrackController;
        return audioTrackController ? audioTrackController.audioTrack : -1;
      }

      /**
       * selects an audio track, based on its index in audio track lists
       */,
      set: function set(audioTrackId) {
        var audioTrackController = this.audioTrackController;
        if (audioTrackController) {
          audioTrackController.audioTrack = audioTrackId;
        }
      }

      /**
       * get the complete list of subtitle tracks across all media groups
       */
    }, {
      key: "allSubtitleTracks",
      get: function get() {
        var subtitleTrackController = this.subtitleTrackController;
        return subtitleTrackController ? subtitleTrackController.allSubtitleTracks : [];
      }

      /**
       * get alternate subtitle tracks list from playlist
       */
    }, {
      key: "subtitleTracks",
      get: function get() {
        var subtitleTrackController = this.subtitleTrackController;
        return subtitleTrackController ? subtitleTrackController.subtitleTracks : [];
      }

      /**
       * index of the selected subtitle track (index in subtitle track lists)
       */
    }, {
      key: "subtitleTrack",
      get: function get() {
        var subtitleTrackController = this.subtitleTrackController;
        return subtitleTrackController ? subtitleTrackController.subtitleTrack : -1;
      },
      set:
      /**
       * select an subtitle track, based on its index in subtitle track lists
       */
      function set(subtitleTrackId) {
        var subtitleTrackController = this.subtitleTrackController;
        if (subtitleTrackController) {
          subtitleTrackController.subtitleTrack = subtitleTrackId;
        }
      }

      /**
       * Whether subtitle display is enabled or not
       */
    }, {
      key: "media",
      get: function get() {
        return this._media;
      }
    }, {
      key: "subtitleDisplay",
      get: function get() {
        var subtitleTrackController = this.subtitleTrackController;
        return subtitleTrackController ? subtitleTrackController.subtitleDisplay : false;
      }

      /**
       * Enable/disable subtitle display rendering
       */,
      set: function set(value) {
        var subtitleTrackController = this.subtitleTrackController;
        if (subtitleTrackController) {
          subtitleTrackController.subtitleDisplay = value;
        }
      }

      /**
       * get mode for Low-Latency HLS loading
       */
    }, {
      key: "lowLatencyMode",
      get: function get() {
        return this.config.lowLatencyMode;
      }

      /**
       * Enable/disable Low-Latency HLS part playlist and segment loading, and start live streams at playlist PART-HOLD-BACK rather than HOLD-BACK.
       */,
      set: function set(mode) {
        this.config.lowLatencyMode = mode;
      }

      /**
       * Position (in seconds) of live sync point (ie edge of live position minus safety delay defined by ```hls.config.liveSyncDuration```)
       * @returns null prior to loading live Playlist
       */
    }, {
      key: "liveSyncPosition",
      get: function get() {
        return this.latencyController.liveSyncPosition;
      }

      /**
       * Estimated position (in seconds) of live edge (ie edge of live playlist plus time sync playlist advanced)
       * @returns 0 before first playlist is loaded
       */
    }, {
      key: "latency",
      get: function get() {
        return this.latencyController.latency;
      }

      /**
       * maximum distance from the edge before the player seeks forward to ```hls.liveSyncPosition```
       * configured using ```liveMaxLatencyDurationCount``` (multiple of target duration) or ```liveMaxLatencyDuration```
       * @returns 0 before first playlist is loaded
       */
    }, {
      key: "maxLatency",
      get: function get() {
        return this.latencyController.maxLatency;
      }

      /**
       * target distance from the edge as calculated by the latency controller
       */
    }, {
      key: "targetLatency",
      get: function get() {
        return this.latencyController.targetLatency;
      }

      /**
       * the rate at which the edge of the current live playlist is advancing or 1 if there is none
       */
    }, {
      key: "drift",
      get: function get() {
        return this.latencyController.drift;
      }

      /**
       * set to true when startLoad is called before MANIFEST_PARSED event
       */
    }, {
      key: "forceStartLoad",
      get: function get() {
        return this.streamController.forceStartLoad;
      }
    }], [{
      key: "version",
      get:
      /**
       * Get the video-dev/hls.js package version.
       */
      function get() {
        return "1.5.8";
      }
    }, {
      key: "Events",
      get: function get() {
        return Events;
      }
    }, {
      key: "ErrorTypes",
      get: function get() {
        return ErrorTypes;
      }
    }, {
      key: "ErrorDetails",
      get: function get() {
        return ErrorDetails;
      }

      /**
       * Get the default configuration applied to new instances.
       */
    }, {
      key: "DefaultConfig",
      get: function get() {
        if (!Hls.defaultConfig) {
          return hlsDefaultConfig;
        }
        return Hls.defaultConfig;
      }

      /**
       * Replace the default configuration applied to new instances.
       */,
      set: function set(defaultConfig) {
        Hls.defaultConfig = defaultConfig;
      }
    }]);
    return Hls;
  }();
  Hls.defaultConfig = void 0;

  return Hls;

}));
})(false);
//# sourceMappingURL=hls.light.js.map
