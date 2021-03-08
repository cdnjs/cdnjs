(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OpenPlayer"] = factory();
	else
		root["OpenPlayer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  /* global globalThis -- safe */
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_OPTIONS = exports.DVR_THRESHOLD = exports.SUPPORTS_HLS = exports.HAS_MSE = exports.IS_STOCK_ANDROID = exports.IS_SAFARI = exports.IS_FIREFOX = exports.IS_CHROME = exports.IS_EDGE = exports.IS_IE = exports.IS_ANDROID = exports.IS_IOS = exports.IS_IPOD = exports.IS_IPHONE = exports.IS_IPAD = exports.UA = exports.NAV = void 0;
exports.NAV = typeof window !== 'undefined' ? window.navigator : null;
exports.UA = exports.NAV ? exports.NAV.userAgent.toLowerCase() : null;
exports.IS_IPAD = exports.UA ? /ipad/i.test(exports.UA) && !window.MSStream : false;
exports.IS_IPHONE = exports.UA ? /iphone/i.test(exports.UA) && !window.MSStream : false;
exports.IS_IPOD = exports.UA ? /ipod/i.test(exports.UA) && !window.MSStream : false;
exports.IS_IOS = exports.UA ? /ipad|iphone|ipod/i.test(exports.UA) && !window.MSStream : false;
exports.IS_ANDROID = exports.UA ? /android/i.test(exports.UA) : false;
exports.IS_IE = exports.UA ? /(trident|microsoft)/i.test(exports.NAV.appName) : false;
exports.IS_EDGE = exports.NAV ? 'msLaunchUri' in exports.NAV && !('documentMode' in document) : false;
exports.IS_CHROME = exports.UA ? /chrome/i.test(exports.UA) : false;
exports.IS_FIREFOX = exports.UA ? /firefox/i.test(exports.UA) : false;
exports.IS_SAFARI = exports.UA ? /safari/i.test(exports.UA) && !exports.IS_CHROME : false;
exports.IS_STOCK_ANDROID = exports.UA ? /^mozilla\/\d+\.\d+\s\(linux;\su;/i.test(exports.UA) : false;
exports.HAS_MSE = typeof window !== 'undefined' ? 'MediaSource' in window : false;

exports.SUPPORTS_HLS = function () {
  if (typeof window === 'undefined') {
    return false;
  }

  var mediaSource = window.MediaSource || window.WebKitMediaSource;
  var sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
  var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
  return !!isTypeSupported && !!sourceBufferValidAPI && !exports.IS_SAFARI;
};

exports.DVR_THRESHOLD = 120;
exports.EVENT_OPTIONS = exports.IS_IE ? false : {
  passive: false
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isXml = exports.offset = exports.hasClass = exports.request = exports.removeElement = exports.loadScript = exports.isAudio = exports.isVideo = exports.getAbsoluteUrl = void 0;

function getAbsoluteUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.href;
}

exports.getAbsoluteUrl = getAbsoluteUrl;

function isVideo(element) {
  return element.tagName.toLowerCase() === 'video';
}

exports.isVideo = isVideo;

function isAudio(element) {
  return element.tagName.toLowerCase() === 'audio';
}

exports.isAudio = isAudio;

function loadScript(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onload = function () {
      removeElement(script);
      resolve({});
    };

    script.onerror = function () {
      removeElement(script);
      reject();
    };

    document.head.appendChild(script);
  });
}

exports.loadScript = loadScript;

function removeElement(node) {
  if (node) {
    var parentNode = node.parentNode;

    if (parentNode) {
      parentNode.removeChild(node);
    }
  }
}

exports.removeElement = removeElement;

function request(url, dataType, success, error) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  var type;

  switch (dataType) {
    case 'text':
      type = 'text/plain';
      break;

    case 'json':
      type = 'application/json, text/javascript';
      break;

    case 'html':
      type = 'text/html';
      break;

    case 'xml':
      type = 'application/xml, text/xml';
      break;

    default:
      type = 'application/x-www-form-urlencoded; charset=UTF-8';
      break;
  }

  var completed = false;
  var accept = type !== 'application/x-www-form-urlencoded' ? "".concat(type, ", */*; q=0.01") : '*/'.concat('*');

  if (xhr) {
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Accept', accept);

    xhr.onreadystatechange = function () {
      if (completed) {
        return;
      }

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          completed = true;
          var data;

          switch (dataType) {
            case 'json':
              data = JSON.parse(xhr.responseText);
              break;

            case 'xml':
              data = xhr.responseXML;
              break;

            default:
              data = xhr.responseText;
              break;
          }

          success(data);
        } else if (typeof error === 'function') {
          error(xhr.status);
        }
      }
    };

    xhr.send();
  }
}

exports.request = request;

function hasClass(target, className) {
  return !!(target.className.split(' ').indexOf(className) > -1);
}

exports.hasClass = hasClass;

function offset(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft),
    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop)
  };
}

exports.offset = offset;

function isXml(input) {
  var parsedXml;

  if (typeof window.DOMParser !== 'undefined') {
    parsedXml = function parsedXml(text) {
      return new window.DOMParser().parseFromString(text, 'text/xml');
    };
  } else if (typeof window.ActiveXObject !== 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
    parsedXml = function parsedXml(text) {
      var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
      xmlDoc.async = false;
      xmlDoc.loadXML(text);
      return xmlDoc;
    };
  } else {
    return false;
  }

  try {
    var response = parsedXml(input);

    if (response.getElementsByTagName('parsererror').length > 0) {
      return false;
    }

    if (response.parseError && response.parseError.errorCode !== 0) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}

exports.isXml = isXml;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var shared = __webpack_require__(54);
var has = __webpack_require__(8);
var uid = __webpack_require__(55);
var NATIVE_SYMBOL = __webpack_require__(59);
var USE_SYMBOL_AS_UID = __webpack_require__(92);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var getOwnPropertyDescriptor = __webpack_require__(32).f;
var createNonEnumerableProperty = __webpack_require__(10);
var redefine = __webpack_require__(15);
var setGlobal = __webpack_require__(37);
var copyConstructorProperties = __webpack_require__(84);
var isForced = __webpack_require__(58);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = exports.addEvent = void 0;

function addEvent(event, details) {
  if (typeof event !== 'string') {
    throw new Error('Event name must be a string');
  }

  var detail = {};

  if (details) {
    detail = details.detail ? {
      detail: details.detail
    } : {
      detail: details
    };
  }

  return new CustomEvent(event, detail);
}

exports.addEvent = addEvent;
exports.events = ['loadstart', 'durationchange', 'loadedmetadata', 'loadeddata', 'progress', 'canplay', 'canplaythrough', 'suspend', 'abort', 'error', 'emptied', 'stalled', 'play', 'playing', 'pause', 'waiting', 'seeking', 'seeked', 'timeupdate', 'ended', 'ratechange', 'volumechange'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(11);
var definePropertyModule = __webpack_require__(12);
var createPropertyDescriptor = __webpack_require__(17);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(53);
var anObject = __webpack_require__(7);
var toPrimitive = __webpack_require__(35);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(19);
var global = __webpack_require__(0);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAutoplaySupported = exports.predictType = exports.isFlvSource = exports.isDashSource = exports.isM3USource = exports.isHlsSource = exports.getExtension = void 0;

function getExtension(url) {
  if (typeof url !== 'string') {
    throw new Error('`url` argument must be a string');
  }

  var baseUrl = url.split('?')[0];
  var baseFrags = baseUrl ? baseUrl.split('\\') : null;
  var baseUrlFragment = baseFrags ? baseFrags.pop() : null;
  var baseNameFrags = baseUrlFragment ? baseUrlFragment.split('/') : null;
  var baseName = baseNameFrags ? baseNameFrags.pop() : null;
  return baseName && baseName.indexOf('.') > -1 ? baseName.substring(baseName.lastIndexOf('.') + 1) : '';
}

exports.getExtension = getExtension;

function isHlsSource(media) {
  return /\.m3u8$/i.test(media.src) || ['application/x-mpegURL', 'application/vnd.apple.mpegurl'].indexOf(media.type) > -1;
}

exports.isHlsSource = isHlsSource;

function isM3USource(media) {
  return /\.m3u$/i.test(media.src);
}

exports.isM3USource = isM3USource;

function isDashSource(media) {
  return /\.mpd/i.test(media.src) || media.type === 'application/dash+xml';
}

exports.isDashSource = isDashSource;

function isFlvSource(media) {
  return /(^rtmp:\/\/|\.flv$)/i.test(media.src) || ['video/x-flv', 'video/flv'].indexOf(media.type) > -1;
}

exports.isFlvSource = isFlvSource;

function predictType(url) {
  var extension = getExtension(url);
  var type;

  if (!extension) {
    return 'video/mp4';
  }

  switch (extension) {
    case 'm3u8':
    case 'm3u':
      type = 'application/x-mpegURL';
      break;

    case 'mpd':
      type = 'application/dash+xml';
      break;

    case 'mp3':
      type = 'audio/mp3';
      break;

    case 'webm':
      type = 'video/webm';
      break;

    default:
      type = 'video/mp4';
      break;
  }

  return type;
}

exports.predictType = predictType;

function isAutoplaySupported(media, autoplay, muted, callback) {
  var playPromise = media.play();

  if (playPromise !== undefined) {
    playPromise.then(function () {
      media.pause();
      autoplay(true);
      muted(false);
      return callback();
    })["catch"](function () {
      media.volume = 0;
      media.muted = true;
      media.play().then(function () {
        media.pause();
        autoplay(true);
        muted(true);
        return callback();
      })["catch"](function () {
        media.volume = 1;
        media.muted = false;
        autoplay(false);
        muted(false);
        callback();
      });
    });
  } else {
    autoplay(!media.paused || 'Promise' in window && playPromise instanceof Promise);
    media.pause();
    muted(false);
    callback();
  }
}

exports.isAutoplaySupported = isAutoplaySupported;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var createNonEnumerableProperty = __webpack_require__(10);
var has = __webpack_require__(8);
var setGlobal = __webpack_require__(37);
var inspectSource = __webpack_require__(38);
var InternalStateModule = __webpack_require__(26);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

module.exports = global;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(16);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(34);

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(16);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(33);
var requireObjectCoercible = __webpack_require__(34);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(83);
var global = __webpack_require__(0);
var isObject = __webpack_require__(9);
var createNonEnumerableProperty = __webpack_require__(10);
var objectHas = __webpack_require__(8);
var shared = __webpack_require__(39);
var sharedKey = __webpack_require__(40);
var hiddenKeys = __webpack_require__(41);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(42);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(25);
var global = __webpack_require__(0);

module.exports = classof(global.process) == 'process';


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isArrayIteratorMethod = __webpack_require__(68);
var toLength = __webpack_require__(27);
var bind = __webpack_require__(20);
var getIteratorMethod = __webpack_require__(69);
var iteratorClose = __webpack_require__(67);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Native = function () {
  function Native(element, media) {
    _classCallCheck(this, Native);

    this.element = element;
    this.media = media;
    this.promise = new Promise(function (resolve) {
      resolve({});
    });
  }

  _createClass(Native, [{
    key: "play",
    value: function play() {
      return this.element.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.element.pause();
    }
  }, {
    key: "instance",
    set: function set(customPlayer) {
      this.customPlayer = customPlayer;
    },
    get: function get() {
      return this.customPlayer;
    }
  }, {
    key: "volume",
    set: function set(value) {
      this.element.volume = value;
    },
    get: function get() {
      return this.element.volume;
    }
  }, {
    key: "muted",
    set: function set(value) {
      this.element.muted = value;
    },
    get: function get() {
      return this.element.muted;
    }
  }, {
    key: "playbackRate",
    set: function set(value) {
      this.element.playbackRate = value;
    },
    get: function get() {
      return this.element.playbackRate;
    }
  }, {
    key: "defaultPlaybackRate",
    set: function set(value) {
      this.element.defaultPlaybackRate = value;
    },
    get: function get() {
      return this.element.defaultPlaybackRate;
    }
  }, {
    key: "currentTime",
    set: function set(value) {
      this.element.currentTime = value;
    },
    get: function get() {
      return this.element.currentTime;
    }
  }, {
    key: "duration",
    get: function get() {
      return this.element.duration;
    }
  }, {
    key: "paused",
    get: function get() {
      return this.element.paused;
    }
  }, {
    key: "ended",
    get: function get() {
      return this.element.ended;
    }
  }]);

  return Native;
}();

exports["default"] = Native;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(11);
var propertyIsEnumerableModule = __webpack_require__(52);
var createPropertyDescriptor = __webpack_require__(17);
var toIndexedObject = __webpack_require__(24);
var toPrimitive = __webpack_require__(35);
var has = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(53);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);
var classof = __webpack_require__(25);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var isObject = __webpack_require__(9);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var createNonEnumerableProperty = __webpack_require__(10);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(39);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var setGlobal = __webpack_require__(37);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(54);
var uid = __webpack_require__(55);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(13);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var defineProperties = __webpack_require__(93);
var enumBugKeys = __webpack_require__(43);
var hiddenKeys = __webpack_require__(41);
var html = __webpack_require__(62);
var documentCreateElement = __webpack_require__(36);
var sharedKey = __webpack_require__(40);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(56);
var enumBugKeys = __webpack_require__(43);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toObject = __webpack_require__(21);
var sharedKey = __webpack_require__(40);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(99);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(12).f;
var has = __webpack_require__(8);
var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeToSeconds = exports.formatTime = void 0;

function formatTime(seconds, frameRate) {
  var f = Math.floor(seconds % 1 * (frameRate || 0));
  var s = Math.floor(seconds);
  var m = Math.floor(s / 60);
  var h = Math.floor(m / 60);

  var wrap = function wrap(value) {
    return value < 10 ? "0".concat(value) : value;
  };

  m = m % 60;
  s = s % 60;
  return "".concat(h > 0 ? "".concat(wrap(h), ":") : '').concat(wrap(m), ":").concat(wrap(s)).concat(f ? ":".concat(wrap(f)) : '');
}

exports.formatTime = formatTime;

function timeToSeconds(timecode) {
  var time = timecode.replace(/;/g, ':').split(':');
  var seconds = 0;

  if (time.length === 3) {
    seconds += parseFloat(time[0]) * 60 * 60;
    seconds += parseFloat(time[1]) * 60;
    seconds += parseFloat(time[2]);
  } else {
    seconds += parseFloat(time[0]) * 60;
    seconds += parseFloat(time[1]);
  }

  return seconds;
}

exports.timeToSeconds = timeToSeconds;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(80);

__webpack_require__(95);

__webpack_require__(105);

__webpack_require__(109);

__webpack_require__(112);

__webpack_require__(131);

__webpack_require__(132);

var controls_1 = __importDefault(__webpack_require__(133));

var media_1 = __importDefault(__webpack_require__(142));

var ads_1 = __importDefault(__webpack_require__(147));

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var media_2 = __webpack_require__(14);

var Player = function () {
  function Player(element, options) {
    _classCallCheck(this, Player);

    this.uid = '';
    this.events = {};
    this.autoplay = false;
    this.volume = 1;
    this.canAutoplay = false;
    this.canAutoplayMuted = false;
    this.processedAutoplay = false;
    this.options = {};
    this.customControlItems = [];
    this.defaultOptions = {
      controls: {
        alwaysVisible: false,
        layers: {
          left: ['play', 'time', 'volume'],
          middle: ['progress'],
          right: ['captions', 'settings', 'fullscreen']
        }
      },
      defaultLevel: null,
      detachMenus: false,
      forceNative: true,
      height: 0,
      hidePlayBtnTimer: 350,
      labels: {
        auto: 'Auto',
        captions: 'CC/Subtitles',
        click: 'Click to unmute',
        fullscreen: 'Fullscreen',
        lang: {
          en: 'English'
        },
        levels: 'Quality Levels',
        live: 'Live Broadcast',
        mediaLevels: 'Change Quality',
        mute: 'Mute',
        off: 'Off',
        pause: 'Pause',
        play: 'Play',
        progressRail: 'Time Rail',
        progressSlider: 'Time Slider',
        settings: 'Player Settings',
        speed: 'Speed',
        speedNormal: 'Normal',
        tap: 'Tap to unmute',
        toggleCaptions: 'Toggle Captions',
        unmute: 'Unmute',
        volume: 'Volume',
        volumeControl: 'Volume Control',
        volumeSlider: 'Volume Slider'
      },
      live: {
        showLabel: true,
        showProgress: false
      },
      mode: 'responsive',
      onError: function onError() {},
      progress: {
        duration: 0
      },
      showLoaderOnInit: false,
      startTime: 0,
      startVolume: 1,
      step: 0,
      width: 0
    };
    this.element = element instanceof HTMLMediaElement ? element : document.getElementById(element);

    if (this.element) {
      this.autoplay = this.element.autoplay || false;

      if (typeof options !== 'string' && !Array.isArray(options)) {
        this._mergeOptions(options);
      }

      this.element.volume = this.options.startVolume;

      if (this.options.ads && this.options.ads.src) {
        this.ads = this.options.ads.src;
      }

      if (this.options.startTime > 0) {
        this.element.currentTime = this.options.startTime;
      }

      this.volume = this.element.volume;
    }

    return this;
  }

  _createClass(Player, [{
    key: "init",
    value: function init() {
      if (this._isValid()) {
        this._wrapInstance();

        this._prepareMedia();

        this._createPlayButton();

        this._createUID();

        this._createControls();

        this._setEvents();

        Player.instances[this.id] = this;
      }
    }
  }, {
    key: "load",
    value: function load() {
      if (this.isMedia()) {
        this.media.load();
      }
    }
  }, {
    key: "play",
    value: function play() {
      if (this.media && !this.media.loaded) {
        this.media.load();
        this.media.loaded = true;
      }

      if (this.adsInstance) {
        return this.adsInstance.play();
      } else {
        return this.media.play();
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.adsInstance) {
        this.adsInstance.pause();
      } else {
        this.media.pause();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this = this;

      if (this.adsInstance) {
        this.adsInstance.pause();
        this.adsInstance.destroy();
      }

      var el = this.element;
      this.media.destroy();
      Object.keys(this.events).forEach(function (event) {
        el.removeEventListener(event, _this.events[event]);
      });

      if (this.autoplay && !this.processedAutoplay && general_1.isVideo(this.element)) {
        el.removeEventListener('canplay', this._autoplay.bind(this));
      }

      this.controls.destroy();

      if (general_1.isVideo(this.element)) {
        general_1.removeElement(this.playBtn);
        general_1.removeElement(this.loader);
      }

      el.controls = true;
      el.setAttribute('id', this.uid);
      el.removeAttribute('op-live__enabled');
      el.removeAttribute('op-dvr__enabled');
      var parent = el.parentElement;

      if (parent && parent.parentNode) {
        parent.parentNode.replaceChild(el, parent);
      }

      var e = events_1.addEvent('playerdestroyed');
      el.dispatchEvent(e);
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.element.parentElement || this.element;
    }
  }, {
    key: "getControls",
    value: function getControls() {
      return this.controls;
    }
  }, {
    key: "getCustomControls",
    value: function getCustomControls() {
      return this.customControlItems;
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
  }, {
    key: "getEvents",
    value: function getEvents() {
      return this.events;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.options;
    }
  }, {
    key: "activeElement",
    value: function activeElement() {
      return this.adsInstance && this.adsInstance.adsStarted ? this.adsInstance : this.media;
    }
  }, {
    key: "isMedia",
    value: function isMedia() {
      return this.activeElement() instanceof media_1["default"];
    }
  }, {
    key: "isAd",
    value: function isAd() {
      return this.activeElement() instanceof ads_1["default"];
    }
  }, {
    key: "getMedia",
    value: function getMedia() {
      return this.media;
    }
  }, {
    key: "getAd",
    value: function getAd() {
      return this.adsInstance;
    }
  }, {
    key: "addCaptions",
    value: function addCaptions(args) {
      if (args["default"]) {
        var tracks = this.element.querySelectorAll('track');

        for (var i = 0, total = tracks.length; i < total; i++) {
          tracks[i]["default"] = false;
        }
      }

      var el = this.element;
      var track = el.querySelector("track[srclang=\"".concat(args.srclang, "\"][kind=\"").concat(args.kind, "\"]"));

      if (track) {
        track.src = args.src;
        track.label = args.label;
        track["default"] = args["default"] || false;
      } else {
        track = document.createElement('track');
        track.srclang = args.srclang;
        track.src = args.src;
        track.kind = args.kind;
        track.label = args.label;
        track["default"] = args["default"] || false;
        el.appendChild(track);
      }

      var e = events_1.addEvent('controlschanged');
      el.dispatchEvent(e);
    }
  }, {
    key: "addControl",
    value: function addControl(args) {
      args.custom = true;
      this.customControlItems.push(args);
      var e = events_1.addEvent('controlschanged');
      this.element.dispatchEvent(e);
    }
  }, {
    key: "removeControl",
    value: function removeControl(controlName) {
      var _this2 = this;

      var layers = this.getOptions().controls.layers;
      Object.keys(layers).forEach(function (layer) {
        layers[layer].forEach(function (item, idx) {
          if (item === controlName) {
            layers[layer].splice(idx, 1);
          }
        });
      });
      this.customControlItems.forEach(function (item, idx) {
        if (item.id === controlName) {
          _this2.customControlItems.splice(idx, 1);
        }
      });
      var e = events_1.addEvent('controlschanged');
      this.element.dispatchEvent(e);
    }
  }, {
    key: "_prepareMedia",
    value: function _prepareMedia() {
      try {
        this.element.addEventListener('playererror', this.options.onError, constants_1.EVENT_OPTIONS);

        if (this.autoplay && general_1.isVideo(this.element)) {
          this.element.addEventListener('canplay', this._autoplay.bind(this), constants_1.EVENT_OPTIONS);
        }

        this.media = new media_1["default"](this.element, this.options, this.autoplay, Player.customMedia);
        var preload = this.element.getAttribute('preload');

        if (this.ads || !preload || preload !== 'none') {
          this.media.load();
          this.media.loaded = true;
        }

        if (!this.autoplay && this.ads) {
          var adsOptions = this.options && this.options.ads ? this.options.ads : undefined;
          this.adsInstance = new ads_1["default"](this, this.ads, false, false, adsOptions);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "_isValid",
    value: function _isValid() {
      var el = this.element;

      if (el instanceof HTMLElement === false) {
        return false;
      }

      if (!general_1.isAudio(el) && !general_1.isVideo(el)) {
        return false;
      }

      if (!el.classList.contains('op-player__media')) {
        return false;
      }

      return true;
    }
  }, {
    key: "_wrapInstance",
    value: function _wrapInstance() {
      var wrapper = document.createElement('div');
      wrapper.className = 'op-player op-player__keyboard--inactive';
      wrapper.className += general_1.isAudio(this.element) ? ' op-player__audio' : ' op-player__video';
      wrapper.tabIndex = 0;
      this.element.classList.remove('op-player');

      if (this.element.parentElement) {
        this.element.parentElement.insertBefore(wrapper, this.element);
      }

      wrapper.appendChild(this.element);
      wrapper.addEventListener('keydown', function () {
        if (wrapper.classList.contains('op-player__keyboard--inactive')) {
          wrapper.classList.remove('op-player__keyboard--inactive');
        }
      }, constants_1.EVENT_OPTIONS);
      wrapper.addEventListener('click', function () {
        if (!wrapper.classList.contains('op-player__keyboard--inactive')) {
          wrapper.classList.add('op-player__keyboard--inactive');
        }
      }, constants_1.EVENT_OPTIONS);

      if (this.options.mode === 'fill' && !general_1.isAudio(this.element) && !constants_1.IS_IPHONE) {
        this.getContainer().classList.add('op-player__full');
      } else if (this.options.mode === 'fit' && !general_1.isAudio(this.element)) {
        var container = this.getContainer();

        if (container.parentElement) {
          var fitWrapper = document.createElement('div');
          fitWrapper.className = 'op-player__fit--wrapper';
          fitWrapper.tabIndex = 0;
          container.parentElement.insertBefore(fitWrapper, container);
          fitWrapper.appendChild(container);
          container.classList.add('op-player__fit');
        }
      } else {
        var style = '';

        if (this.options.width) {
          var width = typeof this.options.width === 'number' ? "".concat(this.options.width, "px") : this.options.width;
          style += "width: ".concat(width, " !important;");
        }

        if (this.options.height) {
          var height = typeof this.options.height === 'number' ? "".concat(this.options.height, "px") : this.options.height;
          style += "height: ".concat(height, " !important;");
        }

        if (style) {
          wrapper.setAttribute('style', style);
        }
      }
    }
  }, {
    key: "_createControls",
    value: function _createControls() {
      if (constants_1.IS_IPHONE && general_1.isVideo(this.element)) {
        this.getContainer().classList.add('op-player__ios--iphone');
      }

      this.controls = new controls_1["default"](this);
      this.controls.create();
    }
  }, {
    key: "_createUID",
    value: function _createUID() {
      if (this.element.id) {
        this.uid = this.element.id;
        this.element.removeAttribute('id');
      } else {
        var uid;

        do {
          uid = "op_".concat(Math.random().toString(36).substr(2, 9));
        } while (Player.instances[uid] !== undefined);

        this.uid = uid;
      }

      if (this.element.parentElement) {
        this.element.parentElement.id = this.uid;
      }
    }
  }, {
    key: "_createPlayButton",
    value: function _createPlayButton() {
      var _this3 = this;

      if (general_1.isAudio(this.element)) {
        return;
      }

      this.playBtn = document.createElement('button');
      this.playBtn.className = 'op-player__play';
      this.playBtn.tabIndex = 0;
      this.playBtn.title = this.options.labels.play;
      this.playBtn.innerHTML = "<span>".concat(this.options.labels.play, "</span>");
      this.playBtn.setAttribute('aria-pressed', 'false');
      this.playBtn.setAttribute('aria-hidden', 'false');
      this.loader = document.createElement('span');
      this.loader.className = 'op-player__loader';
      this.loader.tabIndex = -1;
      this.loader.setAttribute('aria-hidden', 'true');

      if (this.element.parentElement) {
        this.element.parentElement.insertBefore(this.loader, this.element);
        this.element.parentElement.insertBefore(this.playBtn, this.element);
      }

      this.playBtn.addEventListener('click', function () {
        if (_this3.adsInstance) {
          _this3.adsInstance.playRequested = _this3.activeElement().paused;
        }

        if (_this3.activeElement().paused) {
          _this3.activeElement().play();
        } else {
          _this3.activeElement().pause();
        }
      }, constants_1.EVENT_OPTIONS);
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this4 = this;

      if (general_1.isVideo(this.element)) {
        this.events.loadedmetadata = function () {
          var el = _this4.activeElement();

          if (_this4.options.showLoaderOnInit && !constants_1.IS_IOS && !constants_1.IS_ANDROID) {
            _this4.loader.setAttribute('aria-hidden', 'false');

            _this4.playBtn.setAttribute('aria-hidden', 'true');
          } else {
            _this4.loader.setAttribute('aria-hidden', 'true');

            _this4.playBtn.setAttribute('aria-hidden', 'false');
          }

          if (el.paused) {
            _this4.playBtn.classList.remove('op-player__play--paused');

            _this4.playBtn.setAttribute('aria-pressed', 'false');
          }
        };

        this.events.waiting = function () {
          _this4.playBtn.setAttribute('aria-hidden', 'true');

          _this4.loader.setAttribute('aria-hidden', 'false');
        };

        this.events.seeking = function () {
          var el = _this4.activeElement();

          _this4.playBtn.setAttribute('aria-hidden', 'true');

          _this4.loader.setAttribute('aria-hidden', el instanceof media_1["default"] ? 'false' : 'true');
        };

        this.events.seeked = function () {
          var el = _this4.activeElement();

          if (Math.round(el.currentTime) === 0) {
            _this4.playBtn.setAttribute('aria-hidden', 'true');

            _this4.loader.setAttribute('aria-hidden', 'false');
          } else {
            _this4.playBtn.setAttribute('aria-hidden', el instanceof media_1["default"] ? 'false' : 'true');

            _this4.loader.setAttribute('aria-hidden', 'true');
          }
        };

        this.events.play = function () {
          _this4.playBtn.classList.add('op-player__play--paused');

          _this4.playBtn.title = _this4.options.labels.pause;

          _this4.loader.setAttribute('aria-hidden', 'true');

          if (_this4.options.showLoaderOnInit) {
            _this4.playBtn.setAttribute('aria-hidden', 'true');
          } else {
            setTimeout(function () {
              _this4.playBtn.setAttribute('aria-hidden', 'true');
            }, _this4.options.hidePlayBtnTimer);
          }
        };

        this.events.playing = function () {
          _this4.loader.setAttribute('aria-hidden', 'true');

          _this4.playBtn.setAttribute('aria-hidden', 'true');
        };

        this.events.pause = function () {
          var el = _this4.activeElement();

          _this4.playBtn.classList.remove('op-player__play--paused');

          _this4.playBtn.title = _this4.options.labels.play;

          if (_this4.options.showLoaderOnInit && Math.round(el.currentTime) === 0) {
            _this4.playBtn.setAttribute('aria-hidden', 'true');

            _this4.loader.setAttribute('aria-hidden', 'false');
          } else {
            _this4.playBtn.setAttribute('aria-hidden', 'false');

            _this4.loader.setAttribute('aria-hidden', 'true');
          }
        };

        this.events.ended = function () {
          _this4.loader.setAttribute('aria-hidden', 'true');

          _this4.playBtn.setAttribute('aria-hidden', 'true');
        };
      }

      Object.keys(this.events).forEach(function (event) {
        _this4.element.addEventListener(event, _this4.events[event], constants_1.EVENT_OPTIONS);
      });
    }
  }, {
    key: "_autoplay",
    value: function _autoplay() {
      var _this5 = this;

      if (!this.processedAutoplay) {
        this.processedAutoplay = true;
        this.element.removeEventListener('canplay', this._autoplay.bind(this));
        media_2.isAutoplaySupported(this.element, function (autoplay) {
          _this5.canAutoplay = autoplay;
        }, function (muted) {
          _this5.canAutoplayMuted = muted;
        }, function () {
          if (_this5.canAutoplayMuted) {
            _this5.activeElement().muted = true;
            _this5.activeElement().volume = 0;
            var e = events_1.addEvent('volumechange');

            _this5.element.dispatchEvent(e);

            var volumeEl = document.createElement('div');
            var action = constants_1.IS_IOS || constants_1.IS_ANDROID ? _this5.options.labels.tap : _this5.options.labels.click;
            volumeEl.className = 'op-player__unmute';
            volumeEl.innerHTML = "<span>".concat(action, "</span>");
            volumeEl.tabIndex = 0;
            volumeEl.addEventListener('click', function () {
              _this5.activeElement().muted = false;
              _this5.activeElement().volume = _this5.volume;
              var event = events_1.addEvent('volumechange');

              _this5.element.dispatchEvent(event);

              general_1.removeElement(volumeEl);
            }, constants_1.EVENT_OPTIONS);

            var target = _this5.getContainer();

            target.insertBefore(volumeEl, target.firstChild);
          } else {
            _this5.activeElement().muted = _this5.element.muted;
            _this5.activeElement().volume = _this5.volume;
          }

          if (_this5.ads) {
            var adsOptions = _this5.options && _this5.options.ads ? _this5.options.ads : undefined;
            _this5.adsInstance = new ads_1["default"](_this5, _this5.ads, _this5.canAutoplay, _this5.canAutoplayMuted, adsOptions);
          } else if (_this5.canAutoplay || _this5.canAutoplayMuted) {
            return _this5.play();
          }
        });
      }
    }
  }, {
    key: "_mergeOptions",
    value: function _mergeOptions(playerOptions) {
      var _this6 = this;

      this.options = Object.assign(Object.assign({}, this.defaultOptions), playerOptions);

      if (playerOptions) {
        var objectElements = ['labels', 'controls'];
        objectElements.forEach(function (item) {
          _this6.options[item] = playerOptions[item] && Object.keys(playerOptions[item]).length ? Object.assign(Object.assign({}, _this6.defaultOptions[item]), playerOptions[item]) : _this6.defaultOptions[item];
        });
      }
    }
  }, {
    key: "src",
    set: function set(media) {
      if (this.media instanceof media_1["default"]) {
        this.media.mediaFiles = [];
        this.media.src = media;
      }
    },
    get: function get() {
      return this.media.src;
    }
  }, {
    key: "id",
    get: function get() {
      return this.uid;
    }
  }], [{
    key: "init",
    value: function init() {
      Player.instances = {};
      var targets = document.querySelectorAll('video.op-player, audio.op-player');

      for (var i = 0, total = targets.length; i < total; i++) {
        var target = targets[i];
        var settings = target.getAttribute('data-op-settings');
        var options = settings ? JSON.parse(settings) : {};
        var player = new Player(target, options);
        player.init();
      }
    }
  }, {
    key: "addMedia",
    value: function addMedia(name, mimeType, valid, media) {
      Player.customMedia.media[mimeType] = media;
      Player.customMedia.optionsKey[mimeType] = name;
      Player.customMedia.rules.push(valid);
    }
  }]);

  return Player;
}();

Player.instances = {};
Player.customMedia = {
  media: {},
  optionsKey: {},
  rules: []
};
exports["default"] = Player;

if (typeof window !== 'undefined') {
  window.OpenPlayer = Player;
  window.OpenPlayerJS = Player;
  Player.init();
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(11);
var fails = __webpack_require__(5);
var createElement = __webpack_require__(36);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(18);
var store = __webpack_require__(39);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.9.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 55 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIndexedObject = __webpack_require__(24);
var indexOf = __webpack_require__(87).indexOf;
var hiddenKeys = __webpack_require__(41);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var IS_NODE = __webpack_require__(28);
var V8_VERSION = __webpack_require__(60);
var fails = __webpack_require__(5);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  /* global Symbol -- required for testing */
  return !Symbol.sham &&
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    (IS_NODE ? V8_VERSION === 38 : V8_VERSION > 37 && V8_VERSION < 41);
});


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var userAgent = __webpack_require__(44);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);
var create = __webpack_require__(45);
var definePropertyModule = __webpack_require__(12);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(13);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(97).charAt;
var InternalStateModule = __webpack_require__(26);
var defineIterator = __webpack_require__(64);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var createIteratorConstructor = __webpack_require__(98);
var getPrototypeOf = __webpack_require__(47);
var setPrototypeOf = __webpack_require__(66);
var setToStringTag = __webpack_require__(48);
var createNonEnumerableProperty = __webpack_require__(10);
var redefine = __webpack_require__(15);
var wellKnownSymbol = __webpack_require__(3);
var IS_PURE = __webpack_require__(18);
var Iterators = __webpack_require__(22);
var IteratorsCore = __webpack_require__(65);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(5);
var getPrototypeOf = __webpack_require__(47);
var createNonEnumerableProperty = __webpack_require__(10);
var has = __webpack_require__(8);
var wellKnownSymbol = __webpack_require__(3);
var IS_PURE = __webpack_require__(18);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(7);
var aPossiblePrototype = __webpack_require__(100);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);

module.exports = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);
var Iterators = __webpack_require__(22);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(70);
var Iterators = __webpack_require__(22);
var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(49);
var classofRaw = __webpack_require__(25);
var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(47);
var setPrototypeOf = __webpack_require__(66);
var create = __webpack_require__(45);
var createNonEnumerableProperty = __webpack_require__(10);
var createPropertyDescriptor = __webpack_require__(17);
var iterate = __webpack_require__(29);

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (setPrototypeOf) {
    // eslint-disable-next-line unicorn/error-message -- expected
    that = setPrototypeOf(new Error(undefined), getPrototypeOf(that));
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
  var errorsArray = [];
  iterate(errors, errorsArray.push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

$AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$({ global: true }, {
  AggregateError: $AggregateError
});


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

module.exports = global.Promise;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(16);
var wellKnownSymbol = __webpack_require__(3);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var fails = __webpack_require__(5);
var bind = __webpack_require__(20);
var html = __webpack_require__(62);
var createElement = __webpack_require__(36);
var IS_IOS = __webpack_require__(76);
var IS_NODE = __webpack_require__(28);

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(44);

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(23);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var aFunction = __webpack_require__(16);
var newPromiseCapabilityModule = __webpack_require__(23);
var perform = __webpack_require__(30);
var iterate = __webpack_require__(29);

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var aFunction = __webpack_require__(16);
var getBuiltIn = __webpack_require__(13);
var newPromiseCapabilityModule = __webpack_require__(23);
var perform = __webpack_require__(30);
var iterate = __webpack_require__(29);

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(81);

module.exports = parent;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
var entryUnbind = __webpack_require__(94);

module.exports = entryUnbind('Array', 'find');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var $find = __webpack_require__(89).find;
var addToUnscopables = __webpack_require__(61);

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var inspectSource = __webpack_require__(38);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var ownKeys = __webpack_require__(85);
var getOwnPropertyDescriptorModule = __webpack_require__(32);
var definePropertyModule = __webpack_require__(12);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(13);
var getOwnPropertyNamesModule = __webpack_require__(86);
var getOwnPropertySymbolsModule = __webpack_require__(57);
var anObject = __webpack_require__(7);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(56);
var enumBugKeys = __webpack_require__(43);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(24);
var toLength = __webpack_require__(27);
var toAbsoluteIndex = __webpack_require__(88);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(42);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(20);
var IndexedObject = __webpack_require__(33);
var toObject = __webpack_require__(21);
var toLength = __webpack_require__(27);
var arraySpeciesCreate = __webpack_require__(90);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var isArray = __webpack_require__(91);
var wellKnownSymbol = __webpack_require__(3);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(25);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(59);

module.exports = NATIVE_SYMBOL
  /* global Symbol -- safe */
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(11);
var definePropertyModule = __webpack_require__(12);
var anObject = __webpack_require__(7);
var objectKeys = __webpack_require__(46);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var bind = __webpack_require__(20);

var call = Function.call;

module.exports = function (CONSTRUCTOR, METHOD, length) {
  return bind(call, global[CONSTRUCTOR].prototype[METHOD], length);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(96);

module.exports = parent;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);
__webpack_require__(101);
var path = __webpack_require__(19);

module.exports = path.Array.from;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(42);
var requireObjectCoercible = __webpack_require__(34);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(65).IteratorPrototype;
var create = __webpack_require__(45);
var createPropertyDescriptor = __webpack_require__(17);
var setToStringTag = __webpack_require__(48);
var Iterators = __webpack_require__(22);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(4);
var from = __webpack_require__(102);
var checkCorrectnessOfIteration = __webpack_require__(71);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(20);
var toObject = __webpack_require__(21);
var callWithSafeIterationClosing = __webpack_require__(103);
var isArrayIteratorMethod = __webpack_require__(68);
var toLength = __webpack_require__(27);
var createProperty = __webpack_require__(104);
var getIteratorMethod = __webpack_require__(69);

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var iteratorClose = __webpack_require__(67);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(35);
var definePropertyModule = __webpack_require__(12);
var createPropertyDescriptor = __webpack_require__(17);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(106);

module.exports = parent;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
var path = __webpack_require__(19);

module.exports = path.Object.assign;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(4);
var assign = __webpack_require__(108);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(11);
var fails = __webpack_require__(5);
var objectKeys = __webpack_require__(46);
var getOwnPropertySymbolsModule = __webpack_require__(57);
var propertyIsEnumerableModule = __webpack_require__(52);
var toObject = __webpack_require__(21);
var IndexedObject = __webpack_require__(33);

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  /* global Symbol -- required for testing */
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(110);

module.exports = parent;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(111);
var path = __webpack_require__(19);

module.exports = path.Object.keys;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(4);
var toObject = __webpack_require__(21);
var nativeKeys = __webpack_require__(46);
var fails = __webpack_require__(5);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(113);
__webpack_require__(127);
// TODO: Remove from `core-js@4`
__webpack_require__(128);
__webpack_require__(129);
__webpack_require__(130);

module.exports = parent;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
__webpack_require__(114);
__webpack_require__(116);
__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(123);
__webpack_require__(63);
__webpack_require__(124);
var path = __webpack_require__(19);

module.exports = path.Promise;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(49);
var redefine = __webpack_require__(15);
var toString = __webpack_require__(115);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(49);
var classof = __webpack_require__(70);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var IS_PURE = __webpack_require__(18);
var global = __webpack_require__(0);
var getBuiltIn = __webpack_require__(13);
var NativePromise = __webpack_require__(73);
var redefine = __webpack_require__(15);
var redefineAll = __webpack_require__(117);
var setToStringTag = __webpack_require__(48);
var setSpecies = __webpack_require__(118);
var isObject = __webpack_require__(9);
var aFunction = __webpack_require__(16);
var anInstance = __webpack_require__(119);
var inspectSource = __webpack_require__(38);
var iterate = __webpack_require__(29);
var checkCorrectnessOfIteration = __webpack_require__(71);
var speciesConstructor = __webpack_require__(74);
var task = __webpack_require__(75).set;
var microtask = __webpack_require__(120);
var promiseResolve = __webpack_require__(77);
var hostReportErrors = __webpack_require__(122);
var newPromiseCapabilityModule = __webpack_require__(23);
var perform = __webpack_require__(30);
var InternalStateModule = __webpack_require__(26);
var isForced = __webpack_require__(58);
var wellKnownSymbol = __webpack_require__(3);
var IS_NODE = __webpack_require__(28);
var V8_VERSION = __webpack_require__(60);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && !NATIVE_REJECTION_EVENT) return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(15);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(13);
var definePropertyModule = __webpack_require__(12);
var wellKnownSymbol = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(11);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var getOwnPropertyDescriptor = __webpack_require__(32).f;
var macrotask = __webpack_require__(75).set;
var IS_IOS = __webpack_require__(76);
var IS_WEBOS_WEBKIT = __webpack_require__(121);
var IS_NODE = __webpack_require__(28);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(44);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var IS_PURE = __webpack_require__(18);
var NativePromise = __webpack_require__(73);
var fails = __webpack_require__(5);
var getBuiltIn = __webpack_require__(13);
var speciesConstructor = __webpack_require__(74);
var promiseResolve = __webpack_require__(77);
var redefine = __webpack_require__(15);

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var DOMIterables = __webpack_require__(125);
var ArrayIteratorMethods = __webpack_require__(126);
var createNonEnumerableProperty = __webpack_require__(10);
var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),
/* 125 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(24);
var addToUnscopables = __webpack_require__(61);
var Iterators = __webpack_require__(22);
var InternalStateModule = __webpack_require__(26);
var defineIterator = __webpack_require__(64);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(72);


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(78);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var newPromiseCapabilityModule = __webpack_require__(23);
var perform = __webpack_require__(30);

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true }, {
  'try': function (callbackfn) {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(79);


/***/ }),
/* 131 */
/***/ (function(module, exports) {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true });
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default');
    }
  } catch (e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
      params = params || {};
      params.bubbles = !!params.bubbles;
      params.cancelable = !!params.cancelable;

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      origPrevent = evt.preventDefault;
      evt.preventDefault = function() {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return true;
            }
          });
        } catch (e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();


/***/ }),
/* 132 */
/***/ (function(module, exports) {

!function(e){var t=e.Element.prototype;"function"!=typeof t.matches&&(t.matches=t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),o=0;t[o]&&t[o]!==this;)++o;return Boolean(t[o])}),"function"!=typeof t.closest&&(t.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var captions_1 = __importDefault(__webpack_require__(134));

var fullscreen_1 = __importDefault(__webpack_require__(135));

var levels_1 = __importDefault(__webpack_require__(136));

var play_1 = __importDefault(__webpack_require__(137));

var progress_1 = __importDefault(__webpack_require__(138));

var settings_1 = __importDefault(__webpack_require__(139));

var time_1 = __importDefault(__webpack_require__(140));

var volume_1 = __importDefault(__webpack_require__(141));

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var Controls = function () {
  function Controls(player) {
    _classCallCheck(this, Controls);

    this.events = {
      media: {},
      mouse: {}
    };
    this.timer = 0;
    this.controlEls = {
      Captions: captions_1["default"],
      Fullscreen: fullscreen_1["default"],
      Levels: levels_1["default"],
      Play: play_1["default"],
      Progress: progress_1["default"],
      Settings: settings_1["default"],
      Time: time_1["default"],
      Volume: volume_1["default"]
    };
    this.player = player;

    this._setElements();

    return this;
  }

  _createClass(Controls, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.player.getElement().controls = false;
      var isMediaVideo = general_1.isVideo(this.player.getElement());

      this._createControlsLayer();

      this._buildElements();

      this.events.controlschanged = function () {
        _this.destroy();

        _this._setElements();

        _this.create();
      };

      this.events.ended = function () {
        _this.player.getContainer().classList.remove('op-controls--hidden');
      };

      this.player.getElement().addEventListener('controlschanged', this.events.controlschanged, constants_1.EVENT_OPTIONS);
      this.player.getElement().addEventListener('ended', this.events.ended, constants_1.EVENT_OPTIONS);
      var alwaysVisible = this.player.getOptions().controls.alwaysVisible;

      if (!alwaysVisible && !constants_1.IS_ANDROID && !constants_1.IS_IOS) {
        this.events.mouse.mouseenter = function () {
          if (isMediaVideo && !_this.player.activeElement().paused) {
            _this._stopControlTimer();

            if (_this.player.activeElement().currentTime) {
              _this.player.playBtn.setAttribute('aria-hidden', _this.player.isMedia() ? 'false' : 'true');

              _this.player.loader.setAttribute('aria-hidden', 'true');
            } else if (_this.player.getOptions().showLoaderOnInit) {
              _this.player.playBtn.setAttribute('aria-hidden', 'true');

              _this.player.loader.setAttribute('aria-hidden', 'false');
            }

            _this.player.getContainer().classList.remove('op-controls--hidden');

            _this._startControlTimer(2500);
          }
        };

        this.events.mouse.mousemove = function () {
          if (isMediaVideo) {
            if (_this.player.activeElement().currentTime) {
              _this.player.loader.setAttribute('aria-hidden', 'true');

              _this.player.playBtn.setAttribute('aria-hidden', _this.player.isMedia() ? 'false' : 'true');
            } else {
              _this.player.playBtn.setAttribute('aria-hidden', _this.player.getOptions().showLoaderOnInit ? 'true' : 'false');

              _this.player.loader.setAttribute('aria-hidden', _this.player.getOptions().showLoaderOnInit ? 'false' : 'true');
            }

            _this.player.getContainer().classList.remove('op-controls--hidden');

            _this._startControlTimer(2500);
          }
        };

        this.events.mouse.mouseleave = function () {
          if (isMediaVideo && !_this.player.activeElement().paused) {
            _this._startControlTimer(1000);
          }
        };

        this.events.media.play = function () {
          if (isMediaVideo) {
            _this._startControlTimer(_this.player.getOptions().hidePlayBtnTimer);
          }
        };

        this.events.media.pause = function () {
          _this.player.getContainer().classList.remove('op-controls--hidden');

          _this._stopControlTimer();
        };

        Object.keys(this.events.media).forEach(function (event) {
          _this.player.getElement().addEventListener(event, _this.events.media[event], constants_1.EVENT_OPTIONS);
        });
        Object.keys(this.events.mouse).forEach(function (event) {
          _this.player.getContainer().addEventListener(event, _this.events.mouse[event], constants_1.EVENT_OPTIONS);
        });

        this._startControlTimer(3000);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      if (!constants_1.IS_ANDROID && !constants_1.IS_IOS) {
        Object.keys(this.events.mouse).forEach(function (event) {
          _this2.player.getContainer().removeEventListener(event, _this2.events.mouse[event]);
        });
        Object.keys(this.events.media).forEach(function (event) {
          _this2.player.getElement().removeEventListener(event, _this2.events.media[event]);
        });

        this._stopControlTimer();
      }

      this.player.getElement().removeEventListener('controlschanged', this.events.controlschanged);
      this.player.getElement().removeEventListener('ended', this.events.ended);
      Object.keys(this.items).forEach(function (position) {
        _this2.items[position].forEach(function (item) {
          if (item.custom) {
            _this2._destroyCustomControl(item);
          } else if (typeof item.destroy === 'function') {
            item.destroy();
          }
        });
      });
      general_1.removeElement(this.controls);
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.controls;
    }
  }, {
    key: "getLayer",
    value: function getLayer(layer) {
      return this.controls.querySelector(".op-controls-layer__".concat(layer)) || this.controls;
    }
  }, {
    key: "_createControlsLayer",
    value: function _createControlsLayer() {
      if (!this.controls || !this.player.getContainer().querySelector('.op-controls')) {
        this.controls = document.createElement('div');
        this.controls.className = 'op-controls';
        this.player.getContainer().appendChild(this.controls);
      }
    }
  }, {
    key: "_startControlTimer",
    value: function _startControlTimer(time) {
      var _this3 = this;

      var el = this.player.activeElement();

      this._stopControlTimer();

      if (typeof window !== 'undefined') {
        this.timer = window.setTimeout(function () {
          if ((!el.paused || !el.ended) && general_1.isVideo(_this3.player.getElement())) {
            _this3.player.getContainer().classList.add('op-controls--hidden');

            _this3.player.playBtn.setAttribute('aria-hidden', 'true');

            _this3._stopControlTimer();

            var event = events_1.addEvent('controlshidden');

            _this3.player.getElement().dispatchEvent(event);
          }
        }, time);
      }
    }
  }, {
    key: "_stopControlTimer",
    value: function _stopControlTimer() {
      if (this.timer !== 0) {
        clearTimeout(this.timer);
        this.timer = 0;
      }
    }
  }, {
    key: "_setElements",
    value: function _setElements() {
      var _this4 = this;

      var controls = this.player.getOptions().controls.layers;
      this.items = {
        'bottom-left': [],
        'bottom-middle': [],
        'bottom-right': [],
        'left': [],
        'main': [],
        'middle': [],
        'right': [],
        'top-left': [],
        'top-middle': [],
        'top-right': []
      };
      var isVideoEl = general_1.isVideo(this.player.getElement());
      var isAudioEl = general_1.isAudio(this.player.getElement());
      var controlPositions = Object.keys(controls);
      var layersExist = controlPositions.find(function (item) {
        return /^(top|bottom)/.test(item);
      });

      this._createControlsLayer();

      controlPositions.forEach(function (position) {
        var _position$split = position.split('-'),
            _position$split2 = _slicedToArray(_position$split, 2),
            layer = _position$split2[0],
            pos = _position$split2[1];

        if (pos) {
          var className = "op-controls-layer__".concat(layer);

          if (!_this4.controls.querySelector(".".concat(className))) {
            var controlLayer = document.createElement('div');
            controlLayer.className = className;

            _this4.controls.appendChild(controlLayer);
          }
        } else if (layersExist) {
          var _className = 'op-controls-layer__center';

          if (!_this4.controls.querySelector(".".concat(_className))) {
            var _controlLayer = document.createElement('div');

            _controlLayer.className = _className;

            _this4.controls.appendChild(_controlLayer);
          }
        }

        controls[position].filter(function (v, i, a) {
          return a.indexOf(v) === i;
        }).forEach(function (el) {
          var currentLayer = layersExist && !pos ? 'center' : layer;
          var className = "".concat(el.charAt(0).toUpperCase()).concat(el.slice(1));
          var item = new _this4.controlEls[className](_this4.player, pos || layer, currentLayer);

          if (el === 'settings') {
            _this4.settings = item;
          }

          if (isVideoEl || el !== 'fullscreen' && isAudioEl) {
            _this4.items[position].push(item);
          }
        });
      });
      this.player.getCustomControls().forEach(function (item) {
        var _item$position$split = item.position.split('-'),
            _item$position$split2 = _slicedToArray(_item$position$split, 2),
            layer = _item$position$split2[0],
            pos = _item$position$split2[1];

        var currentLayer = layersExist && !pos ? 'center' : layer;
        item.layer = currentLayer;
        item.position = pos || layer;

        if (item.position === 'right') {
          _this4.items[item.position].unshift(item);
        } else {
          _this4.items[item.position].push(item);
        }
      });
    }
  }, {
    key: "_buildElements",
    value: function _buildElements() {
      var _this5 = this;

      Object.keys(this.items).forEach(function (position) {
        _this5.items[position].forEach(function (item) {
          if (item.custom) {
            _this5._createCustomControl(item);
          } else {
            item.create();
          }
        });
      });
      Object.keys(this.items).forEach(function (position) {
        _this5.items[position].forEach(function (item) {
          var allowDefault = !_this5.player.getOptions().detachMenus || item instanceof settings_1["default"];

          if (allowDefault && !item.custom && typeof item.addSettings === 'function') {
            var menuItem = item.addSettings();

            if (_this5.settings && Object.keys(menuItem).length) {
              _this5.settings.addItem(menuItem.name, menuItem.key, menuItem["default"], menuItem.subitems, menuItem.className);
            }
          }
        });
      });
      var e = events_1.addEvent('controlschanged');
      this.controls.dispatchEvent(e);
    }
  }, {
    key: "_hideCustomMenu",
    value: function _hideCustomMenu(menu) {
      var timeout;

      if (timeout && typeof window !== 'undefined') {
        window.cancelAnimationFrame(timeout);
      }

      if (typeof window !== 'undefined') {
        timeout = window.requestAnimationFrame(function () {
          menu.setAttribute('aria-hidden', 'true');
        });
      }
    }
  }, {
    key: "_toggleCustomMenu",
    value: function _toggleCustomMenu(event, menu, item) {
      var menus = this.player.getContainer().querySelectorAll('.op-settings');
      menus.forEach(function (m) {
        if (m.getAttribute('aria-hidden') === 'false' && m.id !== menu.id) {
          m.setAttribute('aria-hidden', 'true');
        }
      });
      menu.setAttribute('aria-hidden', menu.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');

      if (typeof item.click === 'function') {
        item.click(event);
      }
    }
  }, {
    key: "_createCustomControl",
    value: function _createCustomControl(item) {
      var _this6 = this;

      var control = document.createElement('button');
      var icon = /\.(jpg|png|svg|gif)$/.test(item.icon) ? "<img src=\"".concat(item.icon, "\">") : item.icon;
      control.className = "op-controls__".concat(item.id, " op-control__").concat(item.position, " ").concat(item.showInAds ? '' : 'op-control__hide-in-ad');
      control.tabIndex = 0;
      control.id = item.id;
      control.title = item.title;
      control.innerHTML = "".concat(icon, " <span class=\"op-sr\">").concat(item.title, "</span>");

      if (item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
        var menu = document.createElement('div');
        menu.className = 'op-settings op-settings__custom';
        menu.id = "".concat(item.id, "-menu");
        menu.setAttribute('aria-hidden', 'true');
        var items = item.subitems.map(function (s) {
          var itemIcon = '';

          if (s.icon) {
            itemIcon = /\.(jpg|png|svg|gif)$/.test(s.icon) ? "<img src=\"".concat(s.icon, "\">") : s.icon;
          }

          return "<div class=\"op-settings__menu-item\" tabindex=\"0\" ".concat(s.title ? "title=\"".concat(s.title, "\"") : '', " role=\"menuitemradio\">\n                    <div class=\"op-settings__menu-label\" id=\"").concat(s.id, "\" data-value=\"").concat(item.id, "-").concat(s.id, "\">").concat(itemIcon, " ").concat(s.label, "</div>\n                </div>");
        });
        menu.innerHTML = "<div class=\"op-settings__menu\" role=\"menu\">".concat(items.join(''), "</div>");
        this.player.getContainer().appendChild(menu);
        item.subitems.forEach(function (subitem) {
          var menuItem = menu.querySelector("#".concat(subitem.id));

          if (menuItem && subitem.click && typeof subitem.click === 'function') {
            menuItem.addEventListener('click', subitem.click, constants_1.EVENT_OPTIONS);
          }
        });
        control.addEventListener('click', function (e) {
          return _this6._toggleCustomMenu(e, menu, item);
        }, constants_1.EVENT_OPTIONS);
        this.player.getElement().addEventListener('controlshidden', function () {
          return _this6._hideCustomMenu(menu);
        }, constants_1.EVENT_OPTIONS);
      } else if (item.click && typeof item.click === 'function') {
        control.addEventListener('click', item.click, constants_1.EVENT_OPTIONS);
      }

      if (item.mouseenter && typeof item.mouseenter === 'function') {
        control.addEventListener('mouseenter', item.mouseenter, constants_1.EVENT_OPTIONS);
      }

      if (item.mouseleave && typeof item.mouseleave === 'function') {
        control.addEventListener('mouseenter', item.mouseleave, constants_1.EVENT_OPTIONS);
      }

      if (item.keydown && typeof item.keydown === 'function') {
        control.addEventListener('keydown', item.keydown, constants_1.EVENT_OPTIONS);
      }

      if (item.blur && typeof item.blur === 'function') {
        control.addEventListener('blur', item.blur, constants_1.EVENT_OPTIONS);
      }

      if (item.focus && typeof item.focus === 'function') {
        control.addEventListener('focus', item.focus, constants_1.EVENT_OPTIONS);
      }

      if (item.layer) {
        if (item.layer === 'main') {
          this.player.getContainer().appendChild(control);
        } else {
          this.getLayer(item.layer).appendChild(control);
        }
      }
    }
  }, {
    key: "_destroyCustomControl",
    value: function _destroyCustomControl(item) {
      var _this7 = this;

      var key = item.title.toLowerCase().replace(' ', '-');
      var control = this.getContainer().querySelector(".op-controls__".concat(key));

      if (control) {
        if (item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
          var menu = this.player.getContainer().querySelector("#".concat(item.id, "-menu"));

          if (menu) {
            item.subitems.forEach(function (subitem) {
              var menuItem = menu.querySelector("#".concat(subitem.id));

              if (menuItem && subitem.click && typeof subitem.click === 'function') {
                menuItem.removeEventListener('click', subitem.click);
              }
            });
            control.removeEventListener('click', function (e) {
              return _this7._toggleCustomMenu(e, menu, item);
            });
            this.player.getElement().removeEventListener('controlshidden', function () {
              return _this7._hideCustomMenu(menu);
            });
            general_1.removeElement(menu);
          }
        }

        if (item.click && typeof item.click === 'function') {
          control.removeEventListener('click', item.click);
        }

        if (item.mouseenter && typeof item.mouseenter === 'function') {
          control.removeEventListener('mouseenter', item.mouseenter);
        }

        if (item.mouseleave && typeof item.mouseleave === 'function') {
          control.removeEventListener('mouseenter', item.mouseleave);
        }

        if (item.keydown && typeof item.keydown === 'function') {
          control.removeEventListener('keydown', item.keydown);
        }

        if (item.blur && typeof item.blur === 'function') {
          control.removeEventListener('blur', item.blur);
        }

        if (item.focus && typeof item.focus === 'function') {
          control.removeEventListener('focus', item.focus);
        }

        general_1.removeElement(control);
      }
    }
  }]);

  return Controls;
}();

exports["default"] = Controls;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var time_1 = __webpack_require__(50);

var Captions = function () {
  function Captions(player, position, layer) {
    _classCallCheck(this, Captions);

    this.events = {
      button: {},
      global: {},
      media: {}
    };
    this.tracks = {};
    this.trackUrlList = {};
    this["default"] = 'off';
    this.player = player;
    this.labels = player.getOptions().labels;
    this.detachMenu = player.getOptions().detachMenus;
    this.position = position;
    this.layer = layer;
    var trackList = this.player.getElement().textTracks;
    var tracks = [];

    for (var i = 0, total = trackList.length; i < total; i++) {
      var selector = ["track[kind=\"subtitles\"][srclang=\"".concat(trackList[i].language, "\"][label=\"").concat(trackList[i].label, "\"]"), "track[kind=\"captions\"][srclang=\"".concat(trackList[i].language, "\"][label=\"").concat(trackList[i].label, "\"]")];
      var tag = this.player.getElement().querySelector(selector.join(', '));

      if (tag) {
        tracks.push(trackList[i]);
      }
    }

    if (!tracks.length) {
      for (var _i = 0, _total = trackList.length; _i < _total; _i++) {
        tracks.push(trackList[_i]);
      }
    }

    this.trackList = tracks;
    this.hasTracks = !!this.trackList.length;
    return this;
  }

  _createClass(Captions, [{
    key: "create",
    value: function create() {
      var _this = this;

      if (!this.hasTracks) {
        return;
      }

      this.button = document.createElement('button');
      this.button.className = "op-controls__captions op-control__".concat(this.position);
      this.button.tabIndex = 0;
      this.button.title = this.labels.toggleCaptions;
      this.button.setAttribute('aria-controls', this.player.id);
      this.button.setAttribute('aria-pressed', 'false');
      this.button.setAttribute('aria-label', this.labels.toggleCaptions);
      this.button.setAttribute('data-active-captions', 'off');
      this.button.innerHTML = "<span class=\"op-sr\">".concat(this.labels.toggleCaptions, "</span>");

      if (this.detachMenu) {
        this.button.classList.add('op-control--no-hover');
        this.menu = document.createElement('div');
        this.menu.className = 'op-settings op-captions__menu';
        this.menu.setAttribute('aria-hidden', 'true');
        this.menu.innerHTML = "<div class=\"op-settings__menu\" role=\"menu\" id=\"menu-item-captions\">\n                <div class=\"op-settings__submenu-item\" tabindex=\"0\" role=\"menuitemradio\" aria-checked=\"".concat(this["default"] === 'off' ? 'true' : 'false', "\">\n                    <div class=\"op-settings__submenu-label op-subtitles__option\" data-value=\"captions-off\">").concat(this.labels.off, "</div>\n                </div>\n            </div>");
      }

      var _loop = function _loop(i, total, _tracks) {
        var element = _tracks[i];

        if (element.kind === 'subtitles' || element.kind === 'captions') {
          if (element["default"]) {
            _this["default"] = element.srclang;

            _this.button.setAttribute('data-active-captions', element.srclang);
          }

          var trackUrl = general_1.getAbsoluteUrl(element.src);
          var currTrack = _this.trackList[i];

          if (currTrack && currTrack.language === element.srclang) {
            if (currTrack.cues && currTrack.cues.length > 0) {
              _this.tracks[element.srclang] = _this._getNativeCues(_this.trackList[i]);

              _this._prepareTrack(i, element.srclang, trackUrl, element["default"] || false);
            } else {
              general_1.request(trackUrl, 'text', function (d) {
                _this.tracks[element.srclang] = _this._getCuesFromText(d);

                _this._prepareTrack(i, element.srclang, trackUrl, element["default"] || false);

                if (_this.menu && !_this.menu.querySelector(".op-subtitles__option[data-value=\"captions-".concat(_this.trackList[i].language, "\"]"))) {
                  var item = document.createElement('div');
                  item.className = 'op-settings__submenu-item';
                  item.tabIndex = 0;
                  item.setAttribute('role', 'menuitemradio');
                  item.setAttribute('aria-checked', _this["default"] === _this.trackList[i].language ? 'true' : 'false');
                  item.innerHTML = "<div class=\"op-settings__submenu-label op-subtitles__option\"\n                                        data-value=\"captions-".concat(_this.trackList[i].language, "\">\n                                        ").concat(_this.labels.lang[_this.trackList[i].language] || _this.trackList[i].label, "\n                                    </div>");

                  _this.menu.appendChild(item);
                }
              });
            }
          }
        }
      };

      for (var i = 0, _tracks = this.player.getElement().querySelectorAll('track'), total = _tracks.length; i < total; i++) {
        _loop(i, total, _tracks);
      }

      this.captions = document.createElement('div');
      this.captions.className = 'op-captions';
      this.captions.innerHTML = '<span></span>';
      var container = this.captions.querySelector('span');

      this.events.media.timeupdate = function () {
        if (_this.player.isMedia()) {
          if (_this.current) {
            var currentCues = _this.tracks[_this.current.language];

            if (container && currentCues !== undefined) {
              var index = _this._search(currentCues, _this.player.getMedia().currentTime);

              container.innerHTML = '';

              if (index > -1 && general_1.hasClass(_this.button, 'op-controls__captions--on')) {
                _this.captions.classList.add('op-captions--on');

                container.innerHTML = _this._sanitize(currentCues[index].text);
              } else {
                _this._hide();
              }
            }
          } else {
            _this._hide();
          }
        } else {
          _this._hide();
        }
      };

      this.events.button.click = function (e) {
        var button = e.target;

        if (_this.detachMenu) {
          var menus = _this.player.getContainer().querySelectorAll('.op-settings');

          for (var _i2 = 0, _total2 = menus.length; _i2 < _total2; ++_i2) {
            if (menus[_i2] !== _this.menu) {
              menus[_i2].setAttribute('aria-hidden', 'true');
            }
          }

          if (_this.menu.getAttribute('aria-hidden') === 'true') {
            _this.menu.setAttribute('aria-hidden', 'false');
          } else {
            _this.menu.setAttribute('aria-hidden', 'true');
          }
        } else {
          button.setAttribute('aria-pressed', 'true');

          if (general_1.hasClass(button, 'op-controls__captions--on')) {
            _this._hide();

            button.classList.remove('op-controls__captions--on');
            button.setAttribute('data-active-captions', 'off');
          } else {
            if (!_this.current) {
              _this.current = _this.trackList[0];
            }

            _this._show();

            button.classList.add('op-controls__captions--on');
            button.setAttribute('data-active-captions', _this.current.language);
          }
        }
      };

      this.events.button.mouseover = function () {
        if (!constants_1.IS_IOS && !constants_1.IS_ANDROID && _this.detachMenu) {
          var menus = _this.player.getContainer().querySelectorAll('.op-settings');

          for (var _i3 = 0, _total3 = menus.length; _i3 < _total3; ++_i3) {
            if (menus[_i3] !== _this.menu) {
              menus[_i3].setAttribute('aria-hidden', 'true');
            }
          }

          if (_this.menu.getAttribute('aria-hidden') === 'true') {
            _this.menu.setAttribute('aria-hidden', 'false');
          }
        }
      };

      this.events.button.mouseout = function () {
        if (!constants_1.IS_IOS && !constants_1.IS_ANDROID && _this.detachMenu) {
          var menus = _this.player.getContainer().querySelectorAll('.op-settings');

          for (var _i4 = 0, _total4 = menus.length; _i4 < _total4; ++_i4) {
            menus[_i4].setAttribute('aria-hidden', 'true');
          }

          if (_this.menu.getAttribute('aria-hidden') === 'false') {
            _this.menu.setAttribute('aria-hidden', 'true');
          }
        }
      };

      if (this.hasTracks) {
        var target = this.player.getContainer();
        target.insertBefore(this.captions, target.firstChild);

        if (this.detachMenu) {
          var itemContainer = document.createElement('div');
          itemContainer.className = "op-controls__container op-control__".concat(this.position);
          itemContainer.appendChild(this.button);
          itemContainer.appendChild(this.menu);
          this.player.getControls().getLayer(this.layer).appendChild(itemContainer);
        } else {
          this.player.getControls().getLayer(this.layer).appendChild(this.button);
        }

        this.button.addEventListener('click', this.events.button.click, constants_1.EVENT_OPTIONS);
      }

      if (this.trackList.length <= 1 && !this.detachMenu || !this.trackList.length && this.detachMenu) {
        return;
      }

      this.events.global.click = function (e) {
        var option = e.target;

        if (option.closest("#".concat(_this.player.id)) && general_1.hasClass(option, 'op-subtitles__option')) {
          var langEl = option.getAttribute('data-value');
          var language = langEl ? langEl.replace('captions-', '') : '';
          var currentLang = Array.from(_this.trackList).filter(function (item) {
            return item.language === language;
          });
          _this.current = currentLang ? currentLang.pop() : undefined;

          if (_this.detachMenu) {
            if (general_1.hasClass(_this.button, 'op-controls__captions--on')) {
              _this._hide();

              _this.button.classList.remove('op-controls__captions--on');

              _this.button.setAttribute('data-active-captions', 'off');
            } else {
              _this._show();

              _this.button.classList.add('op-controls__captions--on');

              _this.button.setAttribute('data-active-captions', language);
            }

            if (option.parentElement && option.parentElement.parentElement) {
              var captions = option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item');

              for (var _i5 = 0, _total5 = captions.length; _i5 < _total5; ++_i5) {
                captions[_i5].setAttribute('aria-checked', 'false');
              }
            }

            if (option.parentElement) {
              option.parentElement.setAttribute('aria-checked', 'true');
            }

            _this.menu.setAttribute('aria-hidden', 'false');
          } else {
            _this._show();

            _this.button.setAttribute('data-active-captions', language);
          }

          var event = events_1.addEvent('captionschanged');

          _this.player.getElement().dispatchEvent(event);
        }
      };

      if (this.detachMenu) {
        this.button.addEventListener('mouseover', this.events.button.mouseover, constants_1.EVENT_OPTIONS);
        this.menu.addEventListener('mouseover', this.events.button.mouseover, constants_1.EVENT_OPTIONS);
        this.menu.addEventListener('mouseout', this.events.button.mouseout, constants_1.EVENT_OPTIONS);
        this.player.getElement().addEventListener('controlshidden', this.events.button.mouseout, constants_1.EVENT_OPTIONS);
      }

      if (typeof this.events.global.click !== 'undefined') {
        document.addEventListener('click', this.events.global.click, constants_1.EVENT_OPTIONS);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (typeof this.events.global.click !== 'undefined') {
        document.removeEventListener('click', this.events.global.click);
      }

      if (this.hasTracks) {
        this.button.removeEventListener('click', this.events.button.click);

        if (this.detachMenu) {
          this.button.removeEventListener('mouseover', this.events.button.mouseover);
          this.menu.removeEventListener('mouseover', this.events.button.mouseover);
          this.menu.removeEventListener('mouseout', this.events.button.mouseout);
          this.player.getElement().removeEventListener('controlshidden', this.events.button.mouseout);
          general_1.removeElement(this.menu);
        }

        this.player.getElement().removeEventListener('timeupdate', this.events.media.timeupdate);
        general_1.removeElement(this.button);
        general_1.removeElement(this.captions);
      }
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      if (this.detachMenu || this.trackList.length <= 1) {
        return {};
      }

      var subitems = this._formatMenuItems();

      return subitems.length > 2 ? {
        className: 'op-subtitles__option',
        "default": this["default"] || 'off',
        key: 'captions',
        name: this.labels.captions,
        subitems: subitems
      } : {};
    }
  }, {
    key: "_getCuesFromText",
    value: function _getCuesFromText(webvttText) {
      var lines = webvttText.split(/\r?\n/);
      var entries = [];
      var urlRegexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      var timePattern = '^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --> ';
      timePattern += '((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*?)$';
      var regexp = new RegExp(timePattern);
      var identifier;

      function isJson(item) {
        item = typeof item !== 'string' ? JSON.stringify(item) : item;

        try {
          item = JSON.parse(item);
        } catch (e) {
          return false;
        }

        if (_typeof(item) === 'object' && item !== null) {
          return true;
        }

        return false;
      }

      for (var i = 0, total = lines.length; i < total; i++) {
        var timecode = regexp.exec(lines[i]);

        if (timecode && i < lines.length) {
          if (i - 1 >= 0 && lines[i - 1] !== '') {
            identifier = lines[i - 1];
          }

          i++;
          var cue = lines[i];
          i++;

          while (lines[i] !== '' && i < lines.length) {
            cue = "".concat(cue, "\n").concat(lines[i]);
            i++;
          }

          cue = cue.trim().replace(urlRegexp, "<a href='$1' target='_blank'>$1</a>");
          var initTime = time_1.timeToSeconds(timecode[1]);
          entries.push({
            endTime: time_1.timeToSeconds(timecode[3]),
            identifier: identifier || '',
            settings: isJson(timecode[5]) ? JSON.parse(timecode[5]) : {},
            startTime: initTime === 0 ? 0.200 : initTime,
            text: cue
          });
        }

        identifier = '';
      }

      return entries;
    }
  }, {
    key: "_getNativeCues",
    value: function _getNativeCues(track) {
      var cues = [];
      var trackCues = track.cues;
      Object.keys(trackCues).forEach(function (index) {
        var j = parseInt(index, 10);
        var current = trackCues[j];
        cues.push({
          endTime: current.endTime,
          identifier: current.id,
          settings: {},
          startTime: current.startTime,
          text: current.text
        });
      });
      return cues;
    }
  }, {
    key: "_show",
    value: function _show() {
      if (!this.captions || !this.current || this.current.cues === undefined) {
        return;
      }

      var container = this.captions.querySelector('span');

      if (container) {
        container.innerHTML = '';
      }

      this.player.getElement().addEventListener('timeupdate', this.events.media.timeupdate, constants_1.EVENT_OPTIONS);
    }
  }, {
    key: "_hide",
    value: function _hide() {
      this.captions.classList.remove('op-captions--on');

      if (!this.current) {
        this.button.classList.remove('op-controls__captions--on');
        this.button.setAttribute('data-active-captions', 'off');
      }
    }
  }, {
    key: "_search",
    value: function _search(tracks, currentTime) {
      var low = 0;
      var high = tracks.length - 1;

      while (low <= high) {
        var mid = low + high >> 1;
        var start = tracks[mid].startTime;
        var stop = tracks[mid].endTime;

        if (currentTime >= start && currentTime < stop) {
          return mid;
        } else if (start < currentTime) {
          low = mid + 1;
        } else if (start > currentTime) {
          high = mid - 1;
        }
      }

      return -1;
    }
  }, {
    key: "_sanitize",
    value: function _sanitize(html) {
      var div = document.createElement('div');
      div.innerHTML = html;
      var scripts = div.getElementsByTagName('script');
      var i = scripts.length;

      while (i--) {
        general_1.removeElement(scripts[i]);
      }

      var allElements = div.getElementsByTagName('*');

      for (var index = 0, n = allElements.length; index < n; index++) {
        var attributesObj = allElements[index].attributes;
        var attributes = Array.prototype.slice.call(attributesObj);

        for (var j = 0, total = attributes.length; j < total; j++) {
          if (/^(on|javascript:)/.test(attributes[j].name)) {
            general_1.removeElement(allElements[index]);
          } else if (attributes[j].name === 'style') {
            allElements[index].removeAttribute(attributes[j].name);
          }
        }
      }

      return div.innerHTML;
    }
  }, {
    key: "_prepareTrack",
    value: function _prepareTrack(index, language, trackUrl) {
      var _this2 = this;

      var showTrack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.trackUrlList[language] = trackUrl;
      this.trackList[index].mode = 'disabled';

      if (showTrack) {
        this["default"] = language;
        this.button.classList.add('op-controls__captions--on');
        this.button.setAttribute('data-active-captions', language);
        this.current = Array.from(this.trackList).filter(function (item) {
          return item.language === _this2["default"];
        }).pop();

        this._show();

        if (!this.player.getContainer().classList.contains('op-captions--detected')) {
          this.player.getContainer().classList.add('op-captions--detected');
        }
      }
    }
  }, {
    key: "_formatMenuItems",
    value: function _formatMenuItems() {
      var _this3 = this;

      var items = [{
        key: 'off',
        label: this.labels.off
      }];

      var _loop2 = function _loop2(i, total) {
        var track = _this3.trackList[i];
        items = items.filter(function (el) {
          return el.key !== track.language;
        });
        items.push({
          key: track.language,
          label: _this3.labels.lang[track.language] || _this3.trackList[i].label
        });
      };

      for (var i = 0, total = this.trackList.length; i < total; i++) {
        _loop2(i, total);
      }

      return items;
    }
  }]);

  return Captions;
}();

exports["default"] = Captions;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var general_1 = __webpack_require__(2);

var Fullscreen = function () {
  function Fullscreen(player, position, layer) {
    _classCallCheck(this, Fullscreen);

    this.fullscreenEvents = [];
    this.fullscreenWidth = 0;
    this.fullscreenHeight = 0;
    this.player = player;
    this.labels = player.getOptions().labels;
    this.position = position;
    this.layer = layer;
    this.isFullscreen = document.body.classList.contains('op-fullscreen__on');
    var target = document;
    this.fullScreenEnabled = !!(target.fullscreenEnabled || target.mozFullScreenEnabled || target.msFullscreenEnabled || target.webkitSupportsFullscreen || target.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    return this;
  }

  _createClass(Fullscreen, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.className = "op-controls__fullscreen op-control__".concat(this.position);
      this.button.tabIndex = 0;
      this.button.title = this.labels.fullscreen;
      this.button.setAttribute('aria-controls', this.player.id);
      this.button.setAttribute('aria-pressed', 'false');
      this.button.setAttribute('aria-label', this.labels.fullscreen);
      this.button.innerHTML = "<span class=\"op-sr\">".concat(this.labels.fullscreen, "</span>");

      this.clickEvent = function () {
        _this.button.setAttribute('aria-pressed', 'true');

        _this.toggleFullscreen();
      };

      this.fullscreenEvents = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'];

      this._setFullscreenData(false);

      this.player.getContainer().addEventListener('keydown', this._keydownEvent.bind(this), constants_1.EVENT_OPTIONS);
      this.fullscreenEvents.forEach(function (event) {
        document.addEventListener(event, _this._fullscreenChange.bind(_this), constants_1.EVENT_OPTIONS);
      });
      this.button.addEventListener('click', this.clickEvent.bind(this), constants_1.EVENT_OPTIONS);
      this.player.getControls().getLayer(this.layer).appendChild(this.button);

      if (constants_1.IS_IPHONE) {
        this.player.getElement().addEventListener('webkitbeginfullscreen', function () {
          _this.isFullscreen = true;

          _this._setFullscreenData(true);

          document.body.classList.add('op-fullscreen__on');
        }, constants_1.EVENT_OPTIONS);
        this.player.getElement().addEventListener('webkitendfullscreen', function () {
          _this.isFullscreen = false;

          _this._setFullscreenData(false);

          document.body.classList.remove('op-fullscreen__on');
        }, constants_1.EVENT_OPTIONS);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.player.getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
      this.fullscreenEvents.forEach(function (event) {
        document.removeEventListener(event, _this2._fullscreenChange.bind(_this2));
      });

      if (constants_1.IS_IPHONE) {
        this.player.getElement().removeEventListener('webkitbeginfullscreen', function () {
          _this2.isFullscreen = true;

          _this2._setFullscreenData(false);

          document.body.classList.add('op-fullscreen__on');
        });
        this.player.getElement().removeEventListener('webkitendfullscreen', function () {
          _this2.isFullscreen = false;

          _this2._setFullscreenData(true);

          document.body.classList.remove('op-fullscreen__on');
        });
      }

      this.button.removeEventListener('click', this.clickEvent.bind(this));
      general_1.removeElement(this.button);
    }
  }, {
    key: "toggleFullscreen",
    value: function toggleFullscreen() {
      if (this.isFullscreen) {
        var target = document;

        if (target.exitFullscreen) {
          target.exitFullscreen();
        } else if (target.mozCancelFullScreen) {
          target.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          target.webkitCancelFullScreen();
        } else if (target.msExitFullscreen) {
          target.msExitFullscreen();
        } else {
          this._fullscreenChange();
        }

        document.body.classList.remove('op-fullscreen__on');
      } else {
        var video = this.player.getElement();
        this.fullscreenWidth = window.screen.width;
        this.fullscreenHeight = window.screen.height;

        if (video.requestFullscreen) {
          video.parentElement.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.parentElement.mozRequestFullScreen();
        } else if (video.webkitRequestFullScreen) {
          video.parentElement.webkitRequestFullScreen();
        } else if (video.msRequestFullscreen) {
          video.parentElement.msRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        } else {
          this._fullscreenChange();
        }

        document.body.classList.add('op-fullscreen__on');
      }

      if (typeof window !== 'undefined' && (constants_1.IS_ANDROID || constants_1.IS_IPHONE)) {
        var screen = window.screen;

        if (screen.orientation) {
          if (!this.isFullscreen) {
            screen.orientation.lock('landscape');
          }
        }
      }
    }
  }, {
    key: "_fullscreenChange",
    value: function _fullscreenChange() {
      var width = this.isFullscreen ? 0 : this.fullscreenWidth;
      var height = this.isFullscreen ? 0 : this.fullscreenHeight;

      this._setFullscreenData(!this.isFullscreen);

      if (this.player.isAd()) {
        this.player.getAd().resizeAds(width, height);
      }

      this.isFullscreen = !this.isFullscreen;

      if (this.isFullscreen) {
        document.body.classList.add('op-fullscreen__on');
      } else {
        document.body.classList.remove('op-fullscreen__on');
      }

      this._resize(width, height);
    }
  }, {
    key: "_setFullscreenData",
    value: function _setFullscreenData(state) {
      this.player.getContainer().setAttribute('data-fullscreen', (!!state).toString());

      if (state) {
        this.button.classList.add('op-controls__fullscreen--out');
      } else {
        this.button.classList.remove('op-controls__fullscreen--out');
      }
    }
  }, {
    key: "_resize",
    value: function _resize(width, height) {
      var wrapper = this.player.getContainer();
      var video = this.player.getElement();
      var options = this.player.getOptions();
      var styles = '';

      if (width) {
        wrapper.style.width = '100%';
        video.style.width = '100%';
      } else if (options.width) {
        var defaultWidth = typeof options.width === 'number' ? "".concat(options.width, "px") : options.width;
        styles += "width: ".concat(defaultWidth, " !important;");
        video.style.removeProperty('width');
      } else {
        video.style.removeProperty('width');
        wrapper.style.removeProperty('width');
      }

      if (height) {
        video.style.height = '100%';
        wrapper.style.height = '100%';
      } else if (options.height) {
        var defaultHeight = typeof options.height === 'number' ? "".concat(options.height, "px") : options.height;
        styles += "height: ".concat(defaultHeight, " !important;");
        video.style.removeProperty('height');
      } else {
        video.style.removeProperty('height');
        wrapper.style.removeProperty('height');
      }

      if (styles) {
        wrapper.setAttribute('style', styles);
      }
    }
  }, {
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
      var key = e.which || e.keyCode || 0;

      if (key === 70 && !e.ctrlKey && typeof this.fullScreenEnabled !== 'undefined') {
        this.toggleFullscreen();
        e.preventDefault();
      }
    }
  }]);

  return Fullscreen;
}();

exports["default"] = Fullscreen;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var media_1 = __webpack_require__(14);

var Levels = function () {
  function Levels(player, position, layer) {
    _classCallCheck(this, Levels);

    this.events = {
      button: {},
      global: {},
      media: {}
    };
    this.levels = [];
    this["default"] = '';
    this.player = player;
    this.labels = player.getOptions().labels;
    this.detachMenu = player.getOptions().detachMenus;
    this.position = position;
    this.layer = layer;
    return this;
  }

  _createClass(Levels, [{
    key: "create",
    value: function create() {
      var _this = this;

      var initialLevel = this.player.getOptions().defaultLevel !== null ? parseInt(this.player.getOptions().defaultLevel, 10) : this.player.getMedia().level;
      this["default"] = "".concat(initialLevel);

      var menuItems = this._formatMenuItems();

      var defaultLevel = menuItems.length ? menuItems.find(function (items) {
        return items.key === _this["default"];
      }) : null;
      var defaultLabel = defaultLevel ? defaultLevel.label : this.labels.auto;
      var levelSet = false;
      this.button = document.createElement('button');
      this.button.className = "op-controls__levels op-control__".concat(this.position);
      this.button.tabIndex = 0;
      this.button.title = this.labels.mediaLevels;
      this.button.setAttribute('aria-controls', this.player.id);
      this.button.setAttribute('aria-label', this.labels.mediaLevels);
      this.button.setAttribute('data-active-level', this["default"]);
      this.button.innerHTML = "<span>".concat(defaultLabel, "</span>");

      var loadLevelsEvent = function loadLevelsEvent() {
        if (!_this.levels.length) {
          _this._gatherLevels.bind(_this);

          setTimeout(function () {
            _this.player.getMedia().level = initialLevel;
            var e = events_1.addEvent('controlschanged');

            _this.player.getElement().dispatchEvent(e);
          }, 0);
        } else if (!levelSet) {
          _this.player.getMedia().level = initialLevel;
          levelSet = true;
        }
      };

      this.events.media.loadedmetadata = loadLevelsEvent.bind(this);
      this.events.media.manifestLoaded = loadLevelsEvent.bind(this);
      this.events.media.hlsManifestParsed = loadLevelsEvent.bind(this);

      if (this.detachMenu) {
        this._buildMenu();

        this.events.button.click = function () {
          if (_this.detachMenu) {
            var menus = _this.player.getContainer().querySelectorAll('.op-settings');

            for (var i = 0, total = menus.length; i < total; ++i) {
              if (menus[i] !== _this.menu) {
                menus[i].setAttribute('aria-hidden', 'true');
              }
            }

            if (_this.menu.getAttribute('aria-hidden') === 'true') {
              _this.menu.setAttribute('aria-hidden', 'false');
            } else {
              _this.menu.setAttribute('aria-hidden', 'true');
            }
          }
        };

        this.events.button.mouseover = function () {
          if (!constants_1.IS_IOS && !constants_1.IS_ANDROID) {
            var menus = _this.player.getContainer().querySelectorAll('.op-settings');

            for (var i = 0, total = menus.length; i < total; ++i) {
              if (menus[i] !== _this.menu) {
                menus[i].setAttribute('aria-hidden', 'true');
              }
            }

            if (_this.menu.getAttribute('aria-hidden') === 'true') {
              _this.menu.setAttribute('aria-hidden', 'false');
            }
          }
        };

        this.events.button.mouseout = function () {
          if (!constants_1.IS_IOS && !constants_1.IS_ANDROID) {
            var menus = _this.player.getContainer().querySelectorAll('.op-settings');

            for (var i = 0, total = menus.length; i < total; ++i) {
              menus[i].setAttribute('aria-hidden', 'true');
            }

            if (_this.menu.getAttribute('aria-hidden') === 'false') {
              _this.menu.setAttribute('aria-hidden', 'true');
            }
          }
        };

        this.button.addEventListener('click', this.events.button.click, constants_1.EVENT_OPTIONS);
        this.button.addEventListener('mouseover', this.events.button.mouseover, constants_1.EVENT_OPTIONS);
        this.menu.addEventListener('mouseover', this.events.button.mouseover, constants_1.EVENT_OPTIONS);
        this.menu.addEventListener('mouseout', this.events.button.mouseout, constants_1.EVENT_OPTIONS);
        this.player.getElement().addEventListener('controlshidden', this.events.button.mouseout, constants_1.EVENT_OPTIONS);
      }

      this.events.global.click = function (e) {
        var option = e.target;

        var currentTime = _this.player.getMedia().currentTime;

        var isPaused = _this.player.getMedia().paused;

        if (option.closest("#".concat(_this.player.id)) && general_1.hasClass(option, 'op-levels__option')) {
          var levelVal = option.getAttribute('data-value');
          var level = parseInt(levelVal ? levelVal.replace('levels-', '') : '-1', 10);
          _this["default"] = "".concat(level);

          if (_this.detachMenu) {
            _this.button.setAttribute('data-active-level', "".concat(level));

            _this.button.innerHTML = "<span>".concat(option.innerText, "</span>");
            var levels = option.parentElement && option.parentElement.parentElement ? option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item') : [];

            for (var i = 0, total = levels.length; i < total; ++i) {
              levels[i].setAttribute('aria-checked', 'false');
            }

            if (option.parentElement) {
              option.parentElement.setAttribute('aria-checked', 'true');
            }

            _this.menu.setAttribute('aria-hidden', 'false');
          }

          _this.player.getMedia().level = level;
          _this.player.getMedia().currentTime = currentTime;

          if (!isPaused) {
            _this.player.play();
          }

          var event = events_1.addEvent('levelchanged', {
            detail: {
              label: option.innerText.trim(),
              level: level
            }
          });

          _this.player.getElement().dispatchEvent(event);

          e.preventDefault();
        }
      };

      var connection = constants_1.NAV.connection || constants_1.NAV.mozConnection || constants_1.NAV.webkitConnection;

      this.events.global.connection = function () {
        var media = _this.player.getMedia().media.media;

        if (!media_1.isDashSource(media) && !media_1.isHlsSource(media)) {
          var type = connection.effectiveType;

          var levels = _this.levels.map(function (item) {
            return Object.assign(Object.assign({}, item), {
              resolution: parseInt(item.label.replace('p', ''), 10)
            });
          });

          var level = levels.find(function (item) {
            return item.resolution < 360;
          });

          if (type === '4g') {
            level = levels.find(function (item) {
              return item.resolution >= 720;
            });
          } else if (type === '3g') {
            level = levels.find(function (item) {
              return item.resolution >= 360 && item.resolution < 720;
            });
          }

          if (level) {
            _this.player.pause();

            _this.player.getMedia().level = level.id;

            _this.player.play();
          }

          type = connection.effectiveType;
        }
      };

      Object.keys(this.events.media).forEach(function (event) {
        _this.player.getElement().addEventListener(event, _this.events.media[event], constants_1.EVENT_OPTIONS);
      });
      document.addEventListener('click', this.events.global.click, constants_1.EVENT_OPTIONS);

      if (connection) {
        connection.addEventListener('change', this.events.global.connection, constants_1.EVENT_OPTIONS);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      var connection = constants_1.NAV.connection || constants_1.NAV.mozConnection || constants_1.NAV.webkitConnection;
      Object.keys(this.events.media).forEach(function (event) {
        _this2.player.getElement().removeEventListener(event, _this2.events.media[event]);
      });
      document.removeEventListener('click', this.events.global.click);

      if (connection) {
        connection.removeEventListener('change', this.events.global.connection);
      }

      if (this.detachMenu) {
        this.button.removeEventListener('click', this.events.button.click);
        general_1.removeElement(this.button);
        this.button.removeEventListener('mouseover', this.events.button.mouseover);
        this.menu.removeEventListener('mouseover', this.events.button.mouseover);
        this.menu.removeEventListener('mouseout', this.events.button.mouseout);
        this.player.getElement().removeEventListener('controlshidden', this.events.button.mouseout);
        general_1.removeElement(this.menu);
      }
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      if (this.detachMenu) {
        return {};
      }

      var subitems = this._formatMenuItems();

      return subitems.length > 2 ? {
        className: 'op-levels__option',
        "default": this["default"] || '-1',
        key: 'levels',
        name: this.labels.levels,
        subitems: subitems
      } : {};
    }
  }, {
    key: "_formatMenuItems",
    value: function _formatMenuItems() {
      var levels = this._gatherLevels();

      var total = levels.length;
      var items = total ? [{
        key: '-1',
        label: this.labels.auto
      }] : [];

      var _loop = function _loop(i) {
        var level = levels[i];
        items = items.filter(function (el) {
          return el.key !== level.id;
        });
        items.push({
          key: level.id,
          label: level.label
        });
      };

      for (var i = 0; i < total; i++) {
        _loop(i);
      }

      items = items.reduce(function (acc, current) {
        var duplicate = acc.find(function (item) {
          return item.label === current.label;
        });

        if (!duplicate) {
          return acc.concat([current]);
        }

        return acc;
      }, []).sort(function (a, b) {
        return parseInt(a.label, 10) > parseInt(b.label, 10) ? 1 : -1;
      });
      return items;
    }
  }, {
    key: "_getResolutionsLabel",
    value: function _getResolutionsLabel(height) {
      if (height >= 4320) {
        return '8K';
      } else if (height >= 2160) {
        return '4K';
      } else if (height >= 1440) {
        return '1440p';
      } else if (height >= 1080) {
        return '1080p';
      } else if (height >= 720) {
        return '720p';
      } else if (height >= 480) {
        return '480p';
      } else if (height >= 360) {
        return '360p';
      } else if (height >= 240) {
        return '240p';
      } else if (height >= 144) {
        return '144p';
      }

      return this.labels.auto;
    }
  }, {
    key: "_gatherLevels",
    value: function _gatherLevels() {
      var _this3 = this;

      if (!this.levels.length) {
        this.player.getMedia().levels.forEach(function (level) {
          _this3.levels.push(Object.assign(Object.assign({}, level), {
            label: level.label || _this3._getResolutionsLabel(level.height)
          }));
        });
      }

      return this.levels;
    }
  }, {
    key: "_buildMenu",
    value: function _buildMenu() {
      var _this4 = this;

      if (this.detachMenu) {
        this.button.classList.add('op-control--no-hover');
        this.menu = document.createElement('div');
        this.menu.className = 'op-settings op-levels__menu';
        this.menu.setAttribute('aria-hidden', 'true');
        var className = 'op-levels__option';

        var options = this._formatMenuItems();

        var menu = "<div class=\"op-settings__menu\" role=\"menu\" id=\"menu-item-levels\">\n                ".concat(options.map(function (item) {
          return "\n                <div class=\"op-settings__submenu-item\" tabindex=\"0\" role=\"menuitemradio\"\n                    aria-checked=\"".concat(_this4["default"] === item.key ? 'true' : 'false', "\">\n                    <div class=\"op-settings__submenu-label ").concat(className || '', "\" data-value=\"levels-").concat(item.key, "\">").concat(item.label, "</div>\n                </div>");
        }).join(''), "\n            </div>");
        this.menu.innerHTML = menu;
        var itemContainer = document.createElement('div');
        itemContainer.className = "op-controls__container op-control__".concat(this.position);
        itemContainer.appendChild(this.button);
        itemContainer.appendChild(this.menu);
        this.player.getControls().getLayer(this.layer).appendChild(itemContainer);
      }
    }
  }]);

  return Levels;
}();

exports["default"] = Levels;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var player_1 = __importDefault(__webpack_require__(51));

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var Play = function () {
  function Play(player, position, layer) {
    _classCallCheck(this, Play);

    this.events = {
      controls: {},
      media: {}
    };
    this.player = player;
    this.labels = this.player.getOptions().labels;
    this.position = position;
    this.layer = layer;
    return this;
  }

  _createClass(Play, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.className = "op-controls__playpause op-control__".concat(this.position);
      this.button.tabIndex = 0;
      this.button.title = this.labels.play;
      this.button.setAttribute('aria-controls', this.player.id);
      this.button.setAttribute('aria-pressed', 'false');
      this.button.setAttribute('aria-label', this.labels.play);
      this.button.innerHTML = "<span class=\"op-sr\">".concat(this.labels.play, "/").concat(this.labels.pause, "</span>");
      this.player.getControls().getLayer(this.layer).appendChild(this.button);

      this.events.media.click = function (e) {
        _this.button.setAttribute('aria-pressed', 'true');

        var el = _this.player.activeElement();

        if (el.paused || el.ended) {
          if (_this.player.adsInstance) {
            _this.player.adsInstance.playRequested = true;
          }

          el.play();
        } else {
          el.pause();
        }

        e.preventDefault();
      };

      this.events.media.play = function () {
        if (_this.player.activeElement().ended) {
          if (_this.player.isMedia()) {
            _this.button.classList.add('op-controls__playpause--replay');
          } else {
            _this.button.classList.add('op-controls__playpause--pause');
          }

          _this.button.title = _this.labels.play;

          _this.button.setAttribute('aria-label', _this.labels.play);
        } else {
          _this.button.classList.remove('op-controls__playpause--replay');

          _this.button.classList.add('op-controls__playpause--pause');

          _this.button.title = _this.labels.pause;

          _this.button.setAttribute('aria-label', _this.labels.pause);

          Object.keys(player_1["default"].instances).forEach(function (key) {
            if (key !== _this.player.id) {
              var target = player_1["default"].instances[key].activeElement();
              target.pause();
            }
          });
        }
      };

      this.events.media.loadedmetadata = function () {
        if (general_1.hasClass(_this.button, 'op-controls__playpause--pause')) {
          _this.button.classList.remove('op-controls__playpause--replay');

          _this.button.classList.remove('op-controls__playpause--pause');

          _this.button.title = _this.labels.play;

          _this.button.setAttribute('aria-label', _this.labels.play);
        }
      };

      this.events.media.playing = function () {
        if (!general_1.hasClass(_this.button, 'op-controls__playpause--pause')) {
          _this.button.classList.remove('op-controls__playpause--replay');

          _this.button.classList.add('op-controls__playpause--pause');

          _this.button.title = _this.labels.pause;

          _this.button.setAttribute('aria-label', _this.labels.pause);
        }
      };

      this.events.media.pause = function () {
        _this.button.classList.remove('op-controls__playpause--pause');

        _this.button.title = _this.labels.play;

        _this.button.setAttribute('aria-label', _this.labels.play);
      };

      this.events.media.ended = function () {
        if (_this.player.activeElement().ended && _this.player.isMedia()) {
          _this.button.classList.add('op-controls__playpause--replay');

          _this.button.classList.remove('op-controls__playpause--pause');
        } else if (_this.player.getElement().currentTime >= _this.player.getElement().duration || _this.player.getElement().currentTime <= 0) {
          _this.button.classList.add('op-controls__playpause--replay');

          _this.button.classList.remove('op-controls__playpause--pause');
        } else {
          _this.button.classList.remove('op-controls__playpause--replay');

          _this.button.classList.add('op-controls__playpause--pause');
        }

        _this.button.title = _this.labels.play;

        _this.button.setAttribute('aria-label', _this.labels.play);
      };

      this.events.media['adsmediaended'] = function () {
        _this.button.classList.remove('op-controls__playpause--replay');

        _this.button.classList.add('op-controls__playpause--pause');

        _this.button.title = _this.labels.pause;

        _this.button.setAttribute('aria-label', _this.labels.pause);
      };

      var element = this.player.getElement();

      this.events.controls.controlschanged = function () {
        if (!_this.player.activeElement().paused) {
          var event = events_1.addEvent('playing');
          element.dispatchEvent(event);
        }
      };

      Object.keys(this.events.media).forEach(function (event) {
        element.addEventListener(event, _this.events.media[event], constants_1.EVENT_OPTIONS);
      });
      this.player.getControls().getContainer().addEventListener('controlschanged', this.events.controls.controlschanged, constants_1.EVENT_OPTIONS);
      this.player.getContainer().addEventListener('keydown', this._keydownEvent.bind(this), constants_1.EVENT_OPTIONS);
      this.button.addEventListener('click', this.events.media.click, constants_1.EVENT_OPTIONS);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      Object.keys(this.events.media).forEach(function (event) {
        _this2.player.getElement().removeEventListener(event, _this2.events.media[event]);
      });
      this.player.getControls().getContainer().removeEventListener('controlschanged', this.events.controls.controlschanged);
      this.player.getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
      this.button.removeEventListener('click', this.events.media.click);
      general_1.removeElement(this.button);
    }
  }, {
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
      var key = e.which || e.keyCode || 0;
      var el = this.player.activeElement();

      if (key === 13 || key === 32) {
        if (el.paused) {
          el.play();
        } else {
          el.pause();
        }

        e.preventDefault();
      }
    }
  }]);

  return Play;
}();

exports["default"] = Play;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var general_1 = __webpack_require__(2);

var time_1 = __webpack_require__(50);

var Progress = function () {
  function Progress(player, position, layer) {
    _classCallCheck(this, Progress);

    this.events = {
      container: {},
      controls: {},
      global: {},
      media: {},
      slider: {}
    };
    this.player = player;
    this.labels = player.getOptions().labels;
    this.forcePause = false;
    this.position = position;
    this.layer = layer;
    return this;
  }

  _createClass(Progress, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.progress = document.createElement('div');
      this.progress.className = "op-controls__progress op-control__".concat(this.position);
      this.progress.tabIndex = 0;
      this.progress.setAttribute('aria-label', this.labels.progressSlider);
      this.progress.setAttribute('aria-valuemin', '0');
      this.slider = document.createElement('input');
      this.slider.type = 'range';
      this.slider.className = 'op-controls__progress--seek';
      this.slider.tabIndex = -1;
      this.slider.setAttribute('min', '0');
      this.slider.setAttribute('max', '0');
      this.slider.setAttribute('step', '0.1');
      this.slider.value = '0';
      this.slider.setAttribute('aria-label', this.labels.progressRail);
      this.slider.setAttribute('role', 'slider');
      this.buffer = document.createElement('progress');
      this.buffer.className = 'op-controls__progress--buffer';
      this.buffer.setAttribute('max', '100');
      this.buffer.value = 0;
      this.played = document.createElement('progress');
      this.played.className = 'op-controls__progress--played';
      this.played.setAttribute('max', '100');
      this.played.setAttribute('role', 'presentation');
      this.played.value = 0;
      this.progress.appendChild(this.slider);
      this.progress.appendChild(this.played);
      this.progress.appendChild(this.buffer);

      if (!constants_1.IS_IOS && !constants_1.IS_ANDROID) {
        this.tooltip = document.createElement('span');
        this.tooltip.className = 'op-controls__tooltip';
        this.tooltip.tabIndex = -1;
        this.tooltip.innerHTML = '00:00';
        this.progress.appendChild(this.tooltip);
      }

      var setInitialProgress = function setInitialProgress() {
        var el = _this.player.activeElement();

        if (el.duration !== Infinity && !_this.player.getElement().getAttribute('op-live__enabled') && !_this.player.getElement().getAttribute('op-dvr__enabled')) {
          _this.slider.setAttribute('max', "".concat(el.duration));

          var current = _this.player.isMedia() ? el.currentTime : el.duration - el.currentTime;
          _this.slider.value = current.toString();

          _this.progress.setAttribute('aria-valuemax', el.duration.toString());
        } else if (_this.player.getElement().getAttribute('op-dvr__enabled')) {
          _this.slider.setAttribute('max', '1');

          _this.slider.value = '1';
          _this.slider.style.backgroundSize = '100% 100%';
          _this.played.value = 1;

          _this.progress.setAttribute('aria-valuemax', '1');

          _this.progress.setAttribute('aria-hidden', 'false');
        } else if (_this.player.getElement().getAttribute('op-live__enabled') && !_this.player.getOptions().live.showProgress) {
          _this.progress.setAttribute('aria-hidden', 'true');
        }
      };

      var lastCurrentTime = 0;
      this.events.media.loadedmetadata = setInitialProgress.bind(this);
      this.events.controls.controlschanged = setInitialProgress.bind(this);

      this.events.media.progress = function (e) {
        var el = e.target;

        if (el.duration !== Infinity && !_this.player.getElement().getAttribute('op-live__enabled')) {
          if (el.duration > 0) {
            for (var i = 0, total = el.buffered.length; i < total; i++) {
              if (el.buffered.start(el.buffered.length - 1 - i) < el.currentTime) {
                _this.buffer.value = el.buffered.end(el.buffered.length - 1 - i) / el.duration * 100;
                break;
              }
            }
          }
        } else if (!_this.player.getElement().getAttribute('op-dvr__enabled') && _this.progress.getAttribute('aria-hidden') === 'false') {
          _this.progress.setAttribute('aria-hidden', 'true');
        }
      };

      this.events.media.pause = function () {
        var el = _this.player.activeElement();

        if (el.duration !== Infinity && !_this.player.getElement().getAttribute('op-live__enabled')) {
          var current = el.currentTime;

          _this.progress.setAttribute('aria-valuenow', current.toString());

          _this.progress.setAttribute('aria-valuetext', time_1.formatTime(current));
        }
      };

      this.events.media.play = function () {
        if (_this.player.activeElement().duration !== Infinity && !_this.player.getElement().getAttribute('op-live__enabled')) {
          _this.progress.removeAttribute('aria-valuenow');

          _this.progress.removeAttribute('aria-valuetext');
        }
      };

      this.events.media.timeupdate = function () {
        var el = _this.player.activeElement();

        if (el.duration !== Infinity && (!_this.player.getElement().getAttribute('op-live__enabled') || _this.player.getElement().getAttribute('op-dvr__enabled'))) {
          if (!_this.slider.getAttribute('max') || _this.slider.getAttribute('max') === '0' || parseFloat(_this.slider.getAttribute('max') || '-1') !== el.duration) {
            _this.slider.setAttribute('max', "".concat(el.duration));

            _this.progress.setAttribute('aria-hidden', 'false');
          }

          var current = _this.player.isMedia() ? el.currentTime : el.duration - el.currentTime + 1 >= 100 ? 100 : el.duration - el.currentTime + 1;
          var min = parseFloat(_this.slider.min);
          var max = parseFloat(_this.slider.max);
          _this.slider.value = current.toString();
          _this.slider.style.backgroundSize = "".concat((current - min) * 100 / (max - min), "% 100%");
          _this.played.value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ? _this.player.getOptions().progress.duration : current / el.duration * 100;

          if (_this.player.getElement().getAttribute('op-dvr__enabled') && Math.floor(_this.played.value) >= 99) {
            lastCurrentTime = el.currentTime;

            _this.progress.setAttribute('aria-hidden', 'false');
          }
        } else if (!_this.player.getElement().getAttribute('op-dvr__enabled') && _this.progress.getAttribute('aria-hidden') === 'false') {
          _this.progress.setAttribute('aria-hidden', 'true');
        }
      };

      this.events.media.durationchange = function () {
        var el = _this.player.activeElement();

        var current = _this.player.isMedia() ? el.currentTime : el.duration - el.currentTime;

        _this.slider.setAttribute('max', "".concat(el.duration));

        _this.progress.setAttribute('aria-valuemax', el.duration.toString());

        _this.played.value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ? _this.player.getOptions().progress.duration : current / el.duration * 100;
      };

      this.events.media.ended = function () {
        _this.slider.style.backgroundSize = '0% 100%';

        _this.slider.setAttribute('max', '0');

        _this.buffer.value = 0;
        _this.played.value = 0;
      };

      var updateSlider = function updateSlider(e) {
        if (general_1.hasClass(_this.slider, 'op-progress--pressed')) {
          return;
        }

        var target = e.target;

        _this.slider.classList.add('.op-progress--pressed');

        var el = _this.player.activeElement();

        var min = parseFloat(target.min);
        var max = parseFloat(target.max);
        var val = parseFloat(target.value);
        _this.slider.style.backgroundSize = "".concat((val - min) * 100 / (max - min), "% 100%");
        _this.played.value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ? _this.player.getOptions().progress.duration : val / el.duration * 100;

        if (_this.player.getElement().getAttribute('op-dvr__enabled')) {
          el.currentTime = Math.round(_this.played.value) >= 99 ? lastCurrentTime : val;
        } else {
          el.currentTime = val;
        }

        _this.slider.classList.remove('.op-progress--pressed');

        e.preventDefault();
      };

      var forcePause = function forcePause(e) {
        var el = _this.player.activeElement();

        if ((e.which === 1 || e.which === 0) && _this.player.isMedia()) {
          if (!el.paused) {
            el.play().then(function () {
              el.pause.bind(_this);
              _this.forcePause = true;
            });
          }
        }
      };

      var releasePause = function releasePause() {
        var el = _this.player.activeElement();

        if (_this.forcePause === true && _this.player.isMedia()) {
          if (el.paused) {
            el.play();
            _this.forcePause = false;
          }
        }
      };

      var mobileForcePause = function mobileForcePause(e) {
        var el = _this.player.activeElement();

        if (el.duration === Infinity) {
          return true;
        }

        var changedTouches = e.originalEvent ? e.originalEvent.changedTouches : e.changedTouches;
        var x = changedTouches ? changedTouches[0].pageX : e.pageX;
        var pos = x - general_1.offset(_this.progress).left;
        var percentage = pos / _this.progress.offsetWidth;
        var time = percentage * el.duration;
        _this.slider.value = time.toString();
        updateSlider(e);
        forcePause(e);
        e.preventDefault();
      };

      this.events.slider.input = updateSlider.bind(this);
      this.events.slider.change = updateSlider.bind(this);
      this.events.slider.mousedown = forcePause.bind(this);
      this.events.slider.mouseup = releasePause.bind(this);
      this.events.slider.touchstart = mobileForcePause.bind(this);
      this.events.slider.touchend = releasePause.bind(this);

      if (!constants_1.IS_IOS && !constants_1.IS_ANDROID) {
        this.events.container.mousemove = function (e) {
          var el = _this.player.activeElement();

          if (el.duration === Infinity || _this.player.isAd()) {
            return true;
          }

          var x = e.originalEvent && e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX;
          var pos = x - general_1.offset(_this.progress).left;
          var half = _this.tooltip.offsetWidth / 2;
          var percentage = pos / _this.progress.offsetWidth;
          var time = percentage * el.duration;

          var mediaContainer = _this.player.getContainer();

          var limit = mediaContainer.offsetWidth - _this.tooltip.offsetWidth;

          if (pos <= 0 || x - general_1.offset(mediaContainer).left <= half) {
            pos = 0;
          } else if (x - general_1.offset(mediaContainer).left >= limit) {
            pos = limit - general_1.offset(_this.slider).left - 10;
          } else {
            pos -= half;
          }

          if (percentage >= 0 && percentage <= 1) {
            _this.tooltip.classList.add('op-controls__tooltip--visible');
          } else {
            _this.tooltip.classList.remove('op-controls__tooltip--visible');
          }

          _this.tooltip.style.left = "".concat(pos, "px");
          _this.tooltip.innerHTML = isNaN(time) ? '00:00' : time_1.formatTime(time);
        };

        this.events.global.mousemove = function (e) {
          if (!e.target.closest('.op-controls__progress') || _this.player.isAd()) {
            _this.tooltip.classList.remove('op-controls__tooltip--visible');
          }
        };
      }

      Object.keys(this.events.media).forEach(function (event) {
        _this.player.getElement().addEventListener(event, _this.events.media[event], constants_1.EVENT_OPTIONS);
      });
      Object.keys(this.events.slider).forEach(function (event) {
        _this.slider.addEventListener(event, _this.events.slider[event], constants_1.EVENT_OPTIONS);
      });
      this.progress.addEventListener('keydown', this.player.getEvents().keydown, constants_1.EVENT_OPTIONS);
      this.progress.addEventListener('mousemove', this.events.container.mousemove, constants_1.EVENT_OPTIONS);
      document.addEventListener('mousemove', this.events.global.mousemove, constants_1.EVENT_OPTIONS);
      this.player.getContainer().addEventListener('keydown', this._keydownEvent.bind(this), constants_1.EVENT_OPTIONS);
      this.player.getControls().getContainer().addEventListener('controlschanged', this.events.controls.controlschanged, constants_1.EVENT_OPTIONS);
      this.player.getControls().getLayer(this.layer).appendChild(this.progress);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      Object.keys(this.events).forEach(function (event) {
        _this2.player.getElement().removeEventListener(event, _this2.events[event]);
      });
      Object.keys(this.events.slider).forEach(function (event) {
        _this2.slider.removeEventListener(event, _this2.events.slider[event]);
      });
      this.progress.removeEventListener('keydown', this.player.getEvents().keydown);
      this.progress.removeEventListener('mousemove', this.events.container.mousemove);
      document.removeEventListener('mousemove', this.events.global.mousemove);
      this.player.getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
      this.player.getControls().getContainer().removeEventListener('controlschanged', this.events.controls.controlschanged);
      general_1.removeElement(this.buffer);
      general_1.removeElement(this.played);
      general_1.removeElement(this.slider);

      if (!constants_1.IS_IOS && !constants_1.IS_ANDROID) {
        general_1.removeElement(this.tooltip);
      }

      general_1.removeElement(this.progress);
    }
  }, {
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
      var el = this.player.activeElement();
      var isAd = this.player.isAd();
      var key = e.which || e.keyCode || 0;
      var newStep = this.player.getOptions().step ? this.player.getOptions().step : el.duration * 0.05;
      var step = el.duration !== Infinity ? newStep : this.player.getOptions().progress.duration;

      if (key === 35 && !isAd) {
        el.currentTime = el.duration;
        e.preventDefault();
      } else if (key === 36 && !isAd) {
        el.currentTime = 0;
        e.preventDefault();
      } else if ((key === 37 || key === 39) && !isAd && el.duration !== Infinity) {
        el.currentTime += key === 37 ? step * -1 : step;

        if (el.currentTime < 0) {
          el.currentTime = 0;
        } else if (el.currentTime >= el.duration) {
          el.currentTime = el.duration;
        }

        e.preventDefault();
      }
    }
  }]);

  return Progress;
}();

exports["default"] = Progress;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var general_1 = __webpack_require__(2);

var Settings = function () {
  function Settings(player, position, layer) {
    _classCallCheck(this, Settings);

    this.submenu = {};
    this.events = {
      global: {},
      media: {}
    };
    this.originalOutput = '';
    this.player = player;
    this.labels = player.getOptions().labels;
    this.position = position;
    this.layer = layer;
    return this;
  }

  _createClass(Settings, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.button = document.createElement('button');
      this.button.className = "op-controls__settings op-control__".concat(this.position);
      this.button.tabIndex = 0;
      this.button.title = this.labels.settings;
      this.button.setAttribute('aria-controls', this.player.id);
      this.button.setAttribute('aria-pressed', 'false');
      this.button.setAttribute('aria-label', this.labels.settings);
      this.button.innerHTML = "<span class=\"op-sr\">".concat(this.labels.settings, "</span>");
      this.menu = document.createElement('div');
      this.menu.className = 'op-settings';
      this.menu.setAttribute('aria-hidden', 'true');
      this.menu.innerHTML = '<div class="op-settings__menu" role="menu"></div>';

      this.clickEvent = function () {
        _this.button.setAttribute('aria-pressed', 'true');

        var menus = _this.player.getContainer().querySelectorAll('.op-settings');

        for (var i = 0, total = menus.length; i < total; ++i) {
          if (menus[i] !== _this.menu) {
            menus[i].setAttribute('aria-hidden', 'true');
          }
        }

        _this.menu.setAttribute('aria-hidden', _this.menu.getAttribute('aria-hidden') === 'false' ? 'true' : 'false');
      };

      this.hideEvent = function () {
        var timeout;

        if (timeout && typeof window !== 'undefined') {
          window.cancelAnimationFrame(timeout);
        }

        if (typeof window !== 'undefined') {
          timeout = window.requestAnimationFrame(function () {
            _this.menu.innerHTML = _this.originalOutput;

            _this.menu.setAttribute('aria-hidden', 'true');
          });
        }
      };

      this.removeEvent = function (e) {
        var _e$detail = e.detail,
            id = _e$detail.id,
            type = _e$detail.type;

        _this.removeItem(id, type);
      };

      this.events.media.controlshidden = this.hideEvent.bind(this);
      this.events.media.settingremoved = this.removeEvent.bind(this);
      this.events.media.play = this.hideEvent.bind(this);
      this.events.media.pause = this.hideEvent.bind(this);

      this.events.global.click = function (e) {
        if (e.target.closest("#".concat(_this.player.id)) && general_1.hasClass(e.target, 'op-speed__option')) {
          _this.player.getMedia().playbackRate = parseFloat(e.target.getAttribute('data-value').replace('speed-', ''));
        }
      };

      this.events.global.resize = this.hideEvent.bind(this);
      this.button.addEventListener('click', this.clickEvent.bind(this), constants_1.EVENT_OPTIONS);
      Object.keys(this.events).forEach(function (event) {
        _this.player.getElement().addEventListener(event, _this.events.media[event], constants_1.EVENT_OPTIONS);
      });
      document.addEventListener('click', this.events.global.click, constants_1.EVENT_OPTIONS);

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.events.global.resize, constants_1.EVENT_OPTIONS);
      }

      this.player.getControls().getLayer(this.layer).appendChild(this.button);
      this.player.getContainer().appendChild(this.menu);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.button.removeEventListener('click', this.clickEvent.bind(this));
      Object.keys(this.events).forEach(function (event) {
        _this2.player.getElement().removeEventListener(event, _this2.events.media[event]);
      });
      document.removeEventListener('click', this.events.global.click);

      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.events.global.resize);
      }

      if (this.events.global['settings.submenu'] !== undefined) {
        document.removeEventListener('click', this.events.global['settings.submenu']);
        this.player.getElement().removeEventListener('controlshidden', this.hideEvent);
      }

      general_1.removeElement(this.menu);
      general_1.removeElement(this.button);
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      return {
        className: 'op-speed__option',
        "default": this.player && this.player.getMedia() ? this.player.getMedia().defaultPlaybackRate.toString() : '1',
        key: 'speed',
        name: this.labels.speed,
        subitems: [{
          key: '0.25',
          label: '0.25'
        }, {
          key: '0.5',
          label: '0.5'
        }, {
          key: '0.75',
          label: '0.75'
        }, {
          key: '1',
          label: this.labels.speedNormal
        }, {
          key: '1.25',
          label: '1.25'
        }, {
          key: '1.5',
          label: '1.5'
        }, {
          key: '2',
          label: '2'
        }]
      };
    }
  }, {
    key: "addItem",
    value: function addItem(name, key, defaultValue, submenu, className) {
      var _this3 = this;

      var menuItem = document.createElement('div');
      menuItem.className = 'op-settings__menu-item';
      menuItem.tabIndex = 0;
      menuItem.setAttribute('role', 'menuitemradio');
      menuItem.innerHTML = "<div class=\"op-settings__menu-label\" data-value=\"".concat(key, "-").concat(defaultValue, "\">").concat(name, "</div>");
      var submenuMatch = submenu ? submenu.find(function (x) {
        return x.key === defaultValue;
      }) : null;

      if (submenuMatch) {
        menuItem.innerHTML += "<div class=\"op-settings__menu-content\">".concat(submenuMatch.label, "</div>");
      }

      var mainMenu = this.menu.querySelector('.op-settings__menu');

      if (mainMenu) {
        mainMenu.appendChild(menuItem);
      }

      this.originalOutput = this.menu.innerHTML;

      if (submenu) {
        var subItems = "\n                <div class=\"op-settings__header\">\n                    <button type=\"button\" class=\"op-settings__back\">".concat(name, "</button>\n                </div>\n                <div class=\"op-settings__menu\" role=\"menu\" id=\"menu-item-").concat(key, "\">\n                    ").concat(submenu.map(function (item) {
          return "\n                    <div class=\"op-settings__submenu-item\" tabindex=\"0\" role=\"menuitemradio\"\n                        aria-checked=\"".concat(defaultValue === item.key ? 'true' : 'false', "\">\n                        <div class=\"op-settings__submenu-label ").concat(className || '', "\" data-value=\"").concat(key, "-").concat(item.key, "\">").concat(item.label, "</div>\n                    </div>");
        }).join(''), "\n                </div>");
        this.submenu[key] = subItems;
      }

      this.events.global['settings.submenu'] = function (e) {
        var target = e.target;

        if (target.closest("#".concat(_this3.player.id))) {
          if (general_1.hasClass(target, 'op-settings__back')) {
            _this3.menu.classList.add('op-settings--sliding');

            setTimeout(function () {
              _this3.menu.innerHTML = _this3.originalOutput;

              _this3.menu.classList.remove('op-settings--sliding');
            }, 100);
          } else if (general_1.hasClass(target, 'op-settings__menu-content')) {
            var labelEl = target.parentElement ? target.parentElement.querySelector('.op-settings__menu-label') : null;
            var label = labelEl ? labelEl.getAttribute('data-value') : null;
            var fragments = label ? label.split('-') : [];

            if (fragments.length > 0) {
              fragments.pop();
              var current = fragments.join('-').replace(/^\-|\-$/, '');

              if (_typeof(_this3.submenu[current]) !== undefined) {
                _this3.menu.classList.add('op-settings--sliding');

                setTimeout(function () {
                  _this3.menu.innerHTML = _this3.submenu[current];

                  _this3.menu.classList.remove('op-settings--sliding');
                }, 100);
              }
            }
          } else if (general_1.hasClass(target, 'op-settings__submenu-label')) {
            var _current = target.getAttribute('data-value');

            var value = _current ? _current.replace("".concat(key, "-"), '') : '';
            var _label = target.innerText;

            var menuTarget = _this3.menu.querySelector("#menu-item-".concat(key, " .op-settings__submenu-item[aria-checked=true]"));

            if (menuTarget) {
              menuTarget.setAttribute('aria-checked', 'false');

              if (target.parentElement) {
                target.parentElement.setAttribute('aria-checked', 'true');
              }

              _this3.submenu[key] = _this3.menu.innerHTML;

              _this3.menu.classList.add('op-settings--sliding');

              setTimeout(function () {
                _this3.menu.innerHTML = _this3.originalOutput;

                var prev = _this3.menu.querySelector(".op-settings__menu-label[data-value=\"".concat(key, "-").concat(defaultValue, "\"]"));

                if (prev) {
                  prev.setAttribute('data-value', "".concat(_current));

                  if (prev.nextElementSibling) {
                    prev.nextElementSibling.innerHTML = _label;
                  }
                }

                defaultValue = value;
                _this3.originalOutput = _this3.menu.innerHTML;

                _this3.menu.classList.remove('op-settings--sliding');
              }, 100);
            }
          }
        } else {
          _this3.hideEvent();
        }
      };

      document.addEventListener('click', this.events.global['settings.submenu'], constants_1.EVENT_OPTIONS);
      this.player.getElement().addEventListener('controlshidden', this.hideEvent, constants_1.EVENT_OPTIONS);
    }
  }, {
    key: "removeItem",
    value: function removeItem(id, type) {
      var minItems = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
      var target = this.player.getElement().querySelector(".op-settings__submenu-label[data-value=".concat(type, "-").concat(id, "]"));

      if (target) {
        general_1.removeElement(target);
      }

      if (this.player.getElement().querySelectorAll(".op-settings__submenu-label[data-value^=".concat(type, "]")).length < minItems) {
        delete this.submenu[type];
        var label = this.player.getElement().querySelector(".op-settings__menu-label[data-value^=".concat(type, "]"));
        var menuItem = label ? label.closest('.op-settings__menu-item') : null;

        if (menuItem) {
          general_1.removeElement(menuItem);
        }
      }
    }
  }]);

  return Settings;
}();

exports["default"] = Settings;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var general_1 = __webpack_require__(2);

var time_1 = __webpack_require__(50);

var Time = function () {
  function Time(player, position, layer) {
    _classCallCheck(this, Time);

    this.events = {
      controls: {},
      media: {}
    };
    this.player = player;
    this.labels = player.getOptions().labels;
    this.position = position;
    this.layer = layer;
    return this;
  }

  _createClass(Time, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.current = document.createElement('time');
      this.current.className = 'op-controls__current';
      this.current.setAttribute('role', 'timer');
      this.current.setAttribute('aria-live', 'off');
      this.current.setAttribute('aria-hidden', 'false');
      this.current.innerText = '0:00';
      this.delimiter = document.createElement('span');
      this.delimiter.className = 'op-controls__time-delimiter';
      this.delimiter.setAttribute('aria-hidden', 'false');
      this.delimiter.innerText = '/';
      this.duration = document.createElement('time');
      this.duration.className = 'op-controls__duration';
      this.duration.setAttribute('aria-hidden', 'false');
      this.duration.innerText = time_1.formatTime(this.player.getOptions().progress.duration);

      var setInitialTime = function setInitialTime() {
        var el = _this.player.activeElement();

        if (el.duration !== Infinity && !_this.player.getElement().getAttribute('op-live__enabled')) {
          var duration = !isNaN(el.duration) ? el.duration : _this.player.getOptions().progress.duration;
          _this.duration.innerText = time_1.formatTime(duration);
          _this.current.innerText = time_1.formatTime(el.currentTime);
        } else {
          _this.duration.setAttribute('aria-hidden', 'true');

          _this.delimiter.setAttribute('aria-hidden', 'true');
        }
      };

      this.events.media.loadedmetadata = setInitialTime.bind(this);
      this.events.controls.controlschanged = setInitialTime.bind(this);
      var showLiveLabel = this.player.getOptions().live.showLabel;

      this.events.media.timeupdate = function () {
        var el = _this.player.activeElement();

        if (el.duration !== Infinity && !_this.player.getElement().getAttribute('op-live__enabled') && !_this.player.getElement().getAttribute('op-dvr__enabled')) {
          var duration = time_1.formatTime(el.duration);

          if (!isNaN(el.duration) && duration !== _this.duration.innerText) {
            _this.duration.innerText = duration;

            _this.duration.setAttribute('aria-hidden', 'false');

            _this.delimiter.setAttribute('aria-hidden', 'false');
          } else if (duration !== _this.duration.innerText) {
            _this.current.innerText = showLiveLabel ? _this.labels.live : time_1.formatTime(el.currentTime);
          }

          _this.current.innerText = time_1.formatTime(el.currentTime);
        } else if (_this.player.getElement().getAttribute('op-dvr__enabled')) {
          _this.duration.setAttribute('aria-hidden', 'true');

          _this.delimiter.setAttribute('aria-hidden', 'true');

          _this.current.innerText = time_1.formatTime(el.currentTime);
        } else if (!_this.player.getElement().getAttribute('op-dvr__enabled') && _this.duration.getAttribute('aria-hidden') === 'false') {
          _this.duration.setAttribute('aria-hidden', 'true');

          _this.delimiter.setAttribute('aria-hidden', 'true');

          _this.current.innerText = showLiveLabel ? _this.labels.live : time_1.formatTime(el.currentTime);
        } else {
          _this.current.innerText = showLiveLabel ? _this.labels.live : time_1.formatTime(el.currentTime);
        }
      };

      this.events.media.ended = function () {
        var el = _this.player.activeElement();

        var duration = !isNaN(el.duration) ? el.duration : _this.player.getOptions().progress.duration;

        if (_this.player.isMedia()) {
          _this.duration.innerText = time_1.formatTime(duration);
        }
      };

      Object.keys(this.events.media).forEach(function (event) {
        _this.player.getElement().addEventListener(event, _this.events.media[event], constants_1.EVENT_OPTIONS);
      });
      this.player.getControls().getContainer().addEventListener('controlschanged', this.events.controls.controlschanged, constants_1.EVENT_OPTIONS);
      var controls = this.player.getControls().getLayer(this.layer);
      this.container = document.createElement('span');
      this.container.className = "op-controls-time op-control__".concat(this.position);
      this.container.appendChild(this.current);
      this.container.appendChild(this.delimiter);
      this.container.appendChild(this.duration);
      controls.appendChild(this.container);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      Object.keys(this.events.media).forEach(function (event) {
        _this2.player.getElement().removeEventListener(event, _this2.events.media[event]);
      });
      this.player.getControls().getContainer().removeEventListener('controlschanged', this.events.controls.controlschanged);
      general_1.removeElement(this.current);
      general_1.removeElement(this.delimiter);
      general_1.removeElement(this.duration);
      general_1.removeElement(this.container);
    }
  }]);

  return Time;
}();

exports["default"] = Time;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var Volume = function () {
  function Volume(player, position, layer) {
    _classCallCheck(this, Volume);

    this.events = {
      button: {},
      media: {},
      slider: {}
    };
    this.player = player;
    this.labels = player.getOptions().labels;
    this.volume = this.player.getMedia().volume;
    this.position = position;
    this.layer = layer;
    return this;
  }

  _createClass(Volume, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.container = document.createElement('div');
      this.container.className = "op-controls__volume op-control__".concat(this.position);
      this.container.tabIndex = 0;
      this.container.setAttribute('aria-valuemin', '0');
      this.container.setAttribute('aria-valuemax', '100');
      this.container.setAttribute('aria-valuenow', "".concat(this.volume));
      this.container.setAttribute('aria-valuetext', "".concat(this.labels.volume, ": ").concat(this.volume));
      this.container.setAttribute('aria-orientation', 'vertical');
      this.container.setAttribute('aria-label', this.labels.volumeSlider);
      this.slider = document.createElement('input');
      this.slider.type = 'range';
      this.slider.className = 'op-controls__volume--input';
      this.slider.tabIndex = -1;
      this.slider.value = this.player.getMedia().volume.toString();
      this.slider.setAttribute('min', '0');
      this.slider.setAttribute('max', '1');
      this.slider.setAttribute('step', '0.1');
      this.slider.setAttribute('aria-label', this.labels.volumeControl);
      this.display = document.createElement('progress');
      this.display.className = 'op-controls__volume--display';
      this.display.setAttribute('max', '10');
      this.display.setAttribute('role', 'presentation');
      this.display.value = this.player.getMedia().volume * 10;
      this.container.appendChild(this.slider);
      this.container.appendChild(this.display);
      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.className = 'op-controls__mute';
      this.button.tabIndex = 0;
      this.button.title = this.labels.mute;
      this.button.setAttribute('aria-controls', this.player.id);
      this.button.setAttribute('aria-pressed', 'false');
      this.button.setAttribute('aria-label', this.labels.mute);
      this.button.innerHTML = "<span class=\"op-sr\">".concat(this.labels.mute, "</span>");

      var updateSlider = function updateSlider(element) {
        var mediaVolume = element.volume * 1;
        var vol = Math.floor(mediaVolume * 100);
        _this.slider.value = "".concat(element.volume);
        _this.display.value = mediaVolume * 10;

        _this.container.setAttribute('aria-valuenow', "".concat(vol));

        _this.container.setAttribute('aria-valuetext', "".concat(_this.labels.volume, ": ").concat(vol));
      };

      var updateButton = function updateButton(element) {
        var vol = element.volume;

        if (vol <= 0.5 && vol > 0) {
          _this.button.classList.remove('op-controls__mute--muted');

          _this.button.classList.add('op-controls__mute--half');
        } else if (vol === 0) {
          _this.button.classList.add('op-controls__mute--muted');

          _this.button.classList.remove('op-controls__mute--half');
        } else {
          _this.button.classList.remove('op-controls__mute--muted');

          _this.button.classList.remove('op-controls__mute--half');
        }
      };

      var updateVolume = function updateVolume(event) {
        var el = _this.player.activeElement();

        var value = parseFloat(event.target.value);
        el.volume = value;
        el.muted = el.volume === 0;
        _this.volume = value;

        var unmuteEl = _this.player.getContainer().querySelector('.op-player__unmute');

        if (!el.muted && unmuteEl) {
          general_1.removeElement(unmuteEl);
        }

        var e = events_1.addEvent('volumechange');

        _this.player.getElement().dispatchEvent(e);
      };

      this.events.media.volumechange = function () {
        var el = _this.player.activeElement();

        updateSlider(el);
        updateButton(el);
      };

      this.events.media.timeupdate = function () {
        if (general_1.isAudio(_this.player.getElement()) && (_this.player.activeElement().duration === Infinity || _this.player.getElement().getAttribute('op-live__enabled'))) {
          _this.button.classList.add('op-control__right');
        }
      };

      this.events.media.loadedmetadata = function () {
        var el = _this.player.activeElement();

        if (el.muted) {
          el.volume = 0;
        }

        var e = events_1.addEvent('volumechange');

        _this.player.getElement().dispatchEvent(e);
      };

      this.events.slider.input = updateVolume.bind(this);
      this.events.slider.change = updateVolume.bind(this);

      this.events.button.click = function () {
        _this.button.setAttribute('aria-pressed', 'true');

        var el = _this.player.activeElement();

        el.muted = !el.muted;

        if (el.muted) {
          el.volume = 0;
          _this.button.title = _this.labels.unmute;

          _this.button.setAttribute('aria-label', _this.labels.unmute);
        } else {
          el.volume = _this.volume;
          _this.button.title = _this.labels.mute;

          _this.button.setAttribute('aria-label', _this.labels.mute);
        }

        var event = events_1.addEvent('volumechange');

        _this.player.getElement().dispatchEvent(event);
      };

      this.button.addEventListener('click', this.events.button.click, constants_1.EVENT_OPTIONS);
      Object.keys(this.events.media).forEach(function (event) {
        _this.player.getElement().addEventListener(event, _this.events.media[event], constants_1.EVENT_OPTIONS);
      });
      Object.keys(this.events.slider).forEach(function (event) {
        _this.slider.addEventListener(event, _this.events.slider[event], constants_1.EVENT_OPTIONS);
      });
      this.player.getContainer().addEventListener('keydown', this._keydownEvent.bind(this), constants_1.EVENT_OPTIONS);

      if (!constants_1.IS_ANDROID && !constants_1.IS_IOS) {
        var controls = this.player.getControls().getLayer(this.layer);
        controls.appendChild(this.button);
        controls.appendChild(this.container);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.button.removeEventListener('click', this.events.button.click);
      Object.keys(this.events.media).forEach(function (event) {
        _this2.player.getElement().removeEventListener(event, _this2.events.media[event]);
      });
      Object.keys(this.events.slider).forEach(function (event) {
        _this2.slider.removeEventListener(event, _this2.events.slider[event]);
      });
      this.player.getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
      general_1.removeElement(this.slider);
      general_1.removeElement(this.display);
      general_1.removeElement(this.container);
    }
  }, {
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
      var key = e.which || e.keyCode || 0;
      var el = this.player.activeElement();

      if (key === 38 || key === 40) {
        var newVol = key === 38 ? Math.min(el.volume + 0.1, 1) : Math.max(el.volume - 0.1, 0);
        el.volume = newVol;
        el.muted = !(newVol > 0);
        e.preventDefault();
      }
    }
  }]);

  return Volume;
}();

exports["default"] = Volume;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dash_1 = __importDefault(__webpack_require__(143));

var flv_1 = __importDefault(__webpack_require__(144));

var hls_1 = __importDefault(__webpack_require__(145));

var html5_1 = __importDefault(__webpack_require__(146));

var source = __importStar(__webpack_require__(14));

var Media = function () {
  function Media(element, options) {
    var autoplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var customMedia = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, Media);

    this.mediaLoaded = false;
    this.customMedia = {
      media: {},
      optionsKey: {},
      rules: []
    };
    this.element = element;
    this.options = options;
    this.mediaFiles = this._getMediaFiles();
    this.customMedia = customMedia;
    this.autoplay = autoplay;
    return this;
  }

  _createClass(Media, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return this.media.canPlayType(mimeType);
    }
  }, {
    key: "load",
    value: function load() {
      var _this = this;

      if (!this.mediaFiles.length) {
        throw new TypeError('Media not set');
      }

      if (this.media && typeof this.media.destroy === 'function') {
        var sameMedia = this.mediaFiles.length === 1 && this.mediaFiles[0].src === this.media.media.src;

        if (!sameMedia) {
          this.media.destroy();
        }
      }

      this.mediaFiles.some(function (media) {
        try {
          _this.media = _this._invoke(media);
        } catch (e) {
          _this.media = new html5_1["default"](_this.element, media);
        }

        return _this.media.canPlayType(media.type);
      });

      try {
        if (this.media === null) {
          throw new TypeError('Media cannot be played with any valid media type');
        }

        return this.media.promise.then(function () {
          _this.media.load();
        });
      } catch (e) {
        this.media.destroy();
        throw e;
      }
    }
  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      if (!this.loaded) {
        this.loaded = true;
        var promiseLoad = this.load();

        if (promiseLoad) {
          this.loaded = true;
          return promiseLoad.then(function () {
            _this2.media.play();
          });
        }
      }

      this.promisePlay = new Promise(function (resolve) {
        resolve({});
      }).then(this.media.promise.then(this.media.play()));
      return this.promisePlay;
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this3 = this;

      if (this.promisePlay !== undefined) {
        this.promisePlay.then(function () {
          _this3.media.pause();
        });
      } else {
        this.media.pause();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.media.destroy();
    }
  }, {
    key: "_getMediaFiles",
    value: function _getMediaFiles() {
      var mediaFiles = [];
      var sourceTags = this.element.querySelectorAll('source');
      var nodeSource = this.element.src;

      if (nodeSource) {
        mediaFiles.push({
          src: nodeSource,
          type: this.element.getAttribute('type') || source.predictType(nodeSource)
        });
      }

      for (var i = 0, total = sourceTags.length; i < total; i++) {
        var item = sourceTags[i];
        var src = item.src;
        mediaFiles.push({
          src: src,
          type: item.getAttribute('type') || source.predictType(src)
        });
      }

      if (!mediaFiles.length) {
        mediaFiles.push({
          src: '',
          type: source.predictType('')
        });
      }

      return mediaFiles;
    }
  }, {
    key: "_invoke",
    value: function _invoke(media) {
      var _this4 = this;

      var playHLSNatively = this.element.canPlayType('application/vnd.apple.mpegurl') || this.element.canPlayType('application/x-mpegURL');
      var activeLevels = false;
      Object.keys(this.options.controls.layers).forEach(function (layer) {
        if (_this4.options.controls.layers[layer].indexOf('levels') > -1) {
          activeLevels = true;
        }
      });

      if (Object.keys(this.customMedia.media).length) {
        var customRef;
        this.customMedia.rules.forEach(function (rule) {
          var type = rule(media.src);

          if (type) {
            var customMedia = _this4.customMedia.media[type];
            var customOptions = _this4.options[_this4.customMedia.optionsKey[type]] || undefined;
            customRef = customMedia(_this4.element, media, _this4.autoplay, customOptions);
          }
        });

        if (customRef) {
          customRef.create();
          return customRef;
        } else {
          return new html5_1["default"](this.element, media);
        }
      } else if (source.isHlsSource(media)) {
        if (playHLSNatively && this.options.forceNative && !activeLevels) {
          return new html5_1["default"](this.element, media);
        }

        var hlsOptions = this.options && this.options.hls ? this.options.hls : undefined;
        return new hls_1["default"](this.element, media, this.autoplay, hlsOptions);
      } else if (source.isDashSource(media)) {
        var dashOptions = this.options && this.options.dash ? this.options.dash : undefined;
        return new dash_1["default"](this.element, media, dashOptions);
      } else if (source.isFlvSource(media)) {
        var flvOptions = this.options && this.options.flv ? this.options.flv : {
          debug: false,
          type: 'flv',
          url: media.src
        };
        return new flv_1["default"](this.element, media, flvOptions);
      }

      return new html5_1["default"](this.element, media);
    }
  }, {
    key: "src",
    set: function set(media) {
      var _this5 = this;

      if (typeof media === 'string') {
        this.mediaFiles.push({
          src: media,
          type: source.predictType(media)
        });
      } else if (Array.isArray(media)) {
        this.mediaFiles = media;
      } else if (_typeof(media) === 'object') {
        this.mediaFiles.push(media);
      }

      this.mediaFiles.some(function (file) {
        return _this5.canPlayType(file.type);
      });

      if (this.element.src) {
        this.element.setAttribute('data-op-file', this.mediaFiles[0].src);
      }

      this.element.src = this.mediaFiles[0].src;
      this.media.src = this.mediaFiles[0];
    },
    get: function get() {
      return this.mediaFiles;
    }
  }, {
    key: "volume",
    set: function set(value) {
      if (this.media) {
        this.media.volume = value;
      }
    },
    get: function get() {
      return this.media ? this.media.volume : this.element.volume;
    }
  }, {
    key: "muted",
    set: function set(value) {
      if (this.media) {
        this.media.muted = value;
      }
    },
    get: function get() {
      return this.media ? this.media.muted : this.element.muted;
    }
  }, {
    key: "playbackRate",
    set: function set(value) {
      if (this.media) {
        this.media.playbackRate = value;
      }
    },
    get: function get() {
      return this.media ? this.media.playbackRate : this.element.playbackRate;
    }
  }, {
    key: "defaultPlaybackRate",
    set: function set(value) {
      if (this.media) {
        this.media.defaultPlaybackRate = value;
      }
    },
    get: function get() {
      return this.media ? this.media.defaultPlaybackRate : this.element.defaultPlaybackRate;
    }
  }, {
    key: "currentTime",
    set: function set(value) {
      if (this.media) {
        this.media.currentTime = value;
      }
    },
    get: function get() {
      return this.media ? this.media.currentTime : this.element.currentTime;
    }
  }, {
    key: "duration",
    get: function get() {
      var duration = this.media ? this.media.duration : this.element.duration;

      if (duration === Infinity && this.element.seekable && this.element.seekable.length) {
        return this.element.seekable.end(0);
      }

      return duration;
    }
  }, {
    key: "paused",
    get: function get() {
      return this.media ? this.media.paused : this.element.paused;
    }
  }, {
    key: "ended",
    get: function get() {
      return this.media ? this.media.ended : this.element.ended;
    }
  }, {
    key: "loaded",
    set: function set(loaded) {
      this.mediaLoaded = loaded;
    },
    get: function get() {
      return this.mediaLoaded;
    }
  }, {
    key: "level",
    set: function set(value) {
      if (this.media) {
        this.media.level = value;
      }
    },
    get: function get() {
      return this.media ? this.media.level : -1;
    }
  }, {
    key: "levels",
    get: function get() {
      return this.media ? this.media.levels : [];
    }
  }, {
    key: "instance",
    get: function get() {
      return this.media ? this.media.instance : null;
    }
  }]);

  return Media;
}();

exports["default"] = Media;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var media_1 = __webpack_require__(14);

var native_1 = __importDefault(__webpack_require__(31));

var DashMedia = function (_native_1$default) {
  _inherits(DashMedia, _native_1$default);

  var _super = _createSuper(DashMedia);

  function DashMedia(element, mediaSource, options) {
    var _this;

    _classCallCheck(this, DashMedia);

    _this = _super.call(this, element, mediaSource);
    _this.events = {};
    _this.options = {};
    _this.options = options;
    _this.promise = typeof dashjs === 'undefined' ? general_1.loadScript('https://cdn.dashjs.org/latest/dash.all.min.js') : new Promise(function (resolve) {
      resolve({});
    });

    _this.promise.then(function () {
      _this.player = dashjs.MediaPlayer().create();
      _this.instance = _this.player;
    });

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(DashMedia, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return constants_1.HAS_MSE && mimeType === 'application/dash+xml';
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      this._preparePlayer();

      this.player.attachSource(this.media.src);
      var e = events_1.addEvent('loadedmetadata');
      this.element.dispatchEvent(e);

      if (!this.events) {
        this.events = dashjs.MediaPlayer.events;
        Object.keys(this.events).forEach(function (event) {
          _this2.player.on(_this2.events[event], _this2._assign.bind(_this2));
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._revoke();
    }
  }, {
    key: "_assign",
    value: function _assign(event) {
      if (event.type === 'error') {
        var details = {
          detail: {
            message: event,
            type: 'M(PEG)-DASH'
          }
        };
        var errorEvent = events_1.addEvent('playererror', details);
        this.element.dispatchEvent(errorEvent);
      } else {
        var e = events_1.addEvent(event.type, event);
        this.element.dispatchEvent(e);
      }
    }
  }, {
    key: "_revoke",
    value: function _revoke() {
      var _this3 = this;

      if (this.events) {
        Object.keys(this.events).forEach(function (event) {
          _this3.player.off(_this3.events[event], _this3._assign.bind(_this3));
        });
        this.events = [];
      }

      this.player.reset();
    }
  }, {
    key: "_preparePlayer",
    value: function _preparePlayer() {
      if (typeof this.player.getDebug().setLogToBrowserConsole === 'undefined') {
        this.player.updateSettings({
          debug: {
            logLevel: dashjs.Debug.LOG_LEVEL_NONE
          },
          streaming: {
            fastSwitchEnabled: true,
            scheduleWhilePaused: false
          }
        });
      } else {
        this.player.getDebug().setLogToBrowserConsole(false);
        this.player.setScheduleWhilePaused(false);
        this.player.setFastSwitchEnabled(true);
      }

      this.player.initialize();
      this.player.attachView(this.element);
      this.player.setAutoPlay(false);

      if (this.options && _typeof(this.options.drm) === 'object' && Object.keys(this.options.drm).length) {
        this.player.setProtectionData(this.options.drm);

        if (this.options.robustnessLevel && this.options.robustnessLevel) {
          this.player.getProtectionController().setRobustnessLevel(this.options.robustnessLevel);
        }
      }
    }
  }, {
    key: "src",
    set: function set(media) {
      var _this4 = this;

      if (media_1.isDashSource(media)) {
        this._revoke();

        this.player = dashjs.MediaPlayer().create();

        this._preparePlayer();

        this.player.attachSource(media.src);
        this.events = dashjs.MediaPlayer.events;
        Object.keys(this.events).forEach(function (event) {
          _this4.player.on(_this4.events[event], _this4._assign.bind(_this4));
        });
      }
    }
  }, {
    key: "levels",
    get: function get() {
      var levels = [];

      if (this.player) {
        var bitrates = this.player.getBitrateInfoListFor('video');

        if (bitrates.length) {
          bitrates.forEach(function (item) {
            if (bitrates[item]) {
              var _bitrates$item = bitrates[item],
                  height = _bitrates$item.height,
                  name = _bitrates$item.name;
              var level = {
                height: height,
                id: item,
                label: name || null
              };
              levels.push(level);
            }
          });
        }
      }

      return levels;
    }
  }, {
    key: "level",
    set: function set(level) {
      if (level === 0) {
        this.player.setAutoSwitchQuality(true);
      } else {
        this.player.setAutoSwitchQuality(false);
        this.player.setQualityFor('video', level);
      }
    },
    get: function get() {
      return this.player ? this.player.getQualityFor('video') : -1;
    }
  }]);

  return DashMedia;
}(native_1["default"]);

exports["default"] = DashMedia;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var media_1 = __webpack_require__(14);

var native_1 = __importDefault(__webpack_require__(31));

var FlvMedia = function (_native_1$default) {
  _inherits(FlvMedia, _native_1$default);

  var _super = _createSuper(FlvMedia);

  function FlvMedia(element, mediaSource, options) {
    var _this;

    _classCallCheck(this, FlvMedia);

    _this = _super.call(this, element, mediaSource);
    _this.events = {};
    _this.options = undefined;
    _this.options = options;
    _this.element = element;
    _this.media = mediaSource;
    _this.promise = typeof flvjs === 'undefined' ? general_1.loadScript('https://cdn.jsdelivr.net/npm/flv.js@latest/dist/flv.min.js') : new Promise(function (resolve) {
      resolve({});
    });

    _this.promise.then(_this._create.bind(_assertThisInitialized(_this)));

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(FlvMedia, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return constants_1.HAS_MSE && (mimeType === 'video/x-flv' || mimeType === 'video/flv');
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      this.player.unload();
      this.player.detachMediaElement();
      this.player.attachMediaElement(this.element);
      this.player.load();
      var e = events_1.addEvent('loadedmetadata');
      this.element.dispatchEvent(e);

      if (!this.events) {
        this.events = flvjs.Events;
        Object.keys(this.events).forEach(function (event) {
          _this2.player.on(_this2.events[event], function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _this2._assign(_this2.events[event], args);
          });
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._revoke();
    }
  }, {
    key: "_create",
    value: function _create() {
      var _this3 = this;

      var _a = this.options,
          configs = _a.configs,
          rest = __rest(_a, ["configs"]);

      flvjs.LoggingControl.enableDebug = rest && rest.debug ? rest.debug : false;
      flvjs.LoggingControl.enableVerbose = rest && rest.debug ? rest.debug : false;
      var options = Object.assign(Object.assign({}, rest), {
        type: 'flv',
        url: this.media.src
      });
      this.player = flvjs.createPlayer(options, configs);
      this.instance = this.player;

      if (!this.events) {
        this.events = flvjs.Events;
        Object.keys(this.events).forEach(function (event) {
          _this3.player.on(_this3.events[event], function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return _this3._assign(_this3.events[event], args);
          });
        });
      }
    }
  }, {
    key: "_assign",
    value: function _assign(event, data) {
      if (event === 'error') {
        var errorDetails = {
          detail: {
            data: data,
            message: "".concat(data[0], ": ").concat(data[1], " ").concat(data[2].msg),
            type: 'FLV'
          }
        };
        var errorEvent = events_1.addEvent('playererror', errorDetails);
        this.element.dispatchEvent(errorEvent);
      } else {
        var e = events_1.addEvent(event, data);
        this.element.dispatchEvent(e);
      }
    }
  }, {
    key: "_revoke",
    value: function _revoke() {
      this.player.destroy();
      this.player = null;
    }
  }, {
    key: "src",
    set: function set(media) {
      if (media_1.isFlvSource(media)) {
        this._revoke();

        this._create();
      }
    }
  }, {
    key: "levels",
    get: function get() {
      var _this4 = this;

      var levels = [];

      if (this.player && this.player.levels && this.player.levels.length) {
        Object.keys(this.player.levels).forEach(function (item) {
          var _this4$player$levels$ = _this4.player.levels[item],
              height = _this4$player$levels$.height,
              name = _this4$player$levels$.name;
          var level = {
            height: height,
            id: item,
            label: name || null
          };
          levels.push(level);
        });
      }

      return levels;
    }
  }, {
    key: "level",
    set: function set(level) {
      this.player.currentLevel = level;
    },
    get: function get() {
      return this.player ? this.player.currentLevel : -1;
    }
  }]);

  return FlvMedia;
}(native_1["default"]);

exports["default"] = FlvMedia;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var media_1 = __webpack_require__(14);

var native_1 = __importDefault(__webpack_require__(31));

var HlsMedia = function (_native_1$default) {
  _inherits(HlsMedia, _native_1$default);

  var _super = _createSuper(HlsMedia);

  function HlsMedia(element, mediaSource) {
    var _this;

    var autoplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var options = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, HlsMedia);

    _this = _super.call(this, element, mediaSource);
    _this.events = {};
    _this.recoverDecodingErrorDate = 0;
    _this.recoverSwapAudioCodecDate = 0;
    _this.options = undefined;
    _this.options = options;
    _this.element = element;
    _this.media = mediaSource;
    _this.autoplay = autoplay;
    _this.promise = typeof Hls === 'undefined' ? general_1.loadScript('https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js') : new Promise(function (resolve) {
      resolve({});
    });

    _this.promise.then(_this._create.bind(_assertThisInitialized(_this)));

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(HlsMedia, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return constants_1.SUPPORTS_HLS() && mimeType === 'application/x-mpegURL';
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      this.player.detachMedia();
      this.player.loadSource(this.media.src);
      this.player.attachMedia(this.element);
      var e = events_1.addEvent('loadedmetadata');
      this.element.dispatchEvent(e);

      if (!this.events) {
        this.events = Hls.Events;
        Object.keys(this.events).forEach(function (event) {
          _this2.player.on(_this2.events[event], function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _this2._assign(_this2.events[event], args);
          });
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._revoke();
    }
  }, {
    key: "_create",
    value: function _create() {
      var _this3 = this;

      var options = this.options;

      if (!options) {
        options = {};
      }

      var autoplay = !!(this.element.preload === 'auto' || this.autoplay);
      options.autoStartLoad = autoplay;
      this.player = new Hls(options);
      this.instance = this.player;
      this.events = Hls.Events;
      Object.keys(this.events).forEach(function (event) {
        _this3.player.on(_this3.events[event], function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _this3._assign(_this3.events[event], args);
        });
      });

      if (!autoplay) {
        this.element.addEventListener('play', function () {
          if (_this3.player) {
            _this3.player.startLoad();
          }
        }, constants_1.EVENT_OPTIONS);
        this.element.addEventListener('pause', function () {
          if (_this3.player) {
            _this3.player.stopLoad();
          }
        }, constants_1.EVENT_OPTIONS);
      }
    }
  }, {
    key: "_assign",
    value: function _assign(event, data) {
      if (event === 'hlsError') {
        var errorDetails = {
          detail: {
            data: data,
            message: data[1].details,
            type: 'HLS'
          }
        };
        var errorEvent = events_1.addEvent('playererror', errorDetails);
        this.element.dispatchEvent(errorEvent);
        data = data[1];

        var _data = data,
            type = _data.type,
            fatal = _data.fatal,
            details = __rest(data, ["type", "fatal"]);

        if (fatal) {
          switch (type) {
            case 'mediaError':
              var now = new Date().getTime();

              if (!this.recoverDecodingErrorDate || now - this.recoverDecodingErrorDate > 3000) {
                this.recoverDecodingErrorDate = new Date().getTime();
                this.player.recoverMediaError();
              } else if (!this.recoverSwapAudioCodecDate || now - this.recoverSwapAudioCodecDate > 3000) {
                this.recoverSwapAudioCodecDate = new Date().getTime();
                console.warn('Attempting to swap Audio Codec and recover from media error');
                this.player.swapAudioCodec();
                this.player.recoverMediaError();
              } else {
                var msg = 'Cannot recover, last media error recovery failed';
                console.error(msg);
                var mediaEvent = events_1.addEvent(type, details);
                this.element.dispatchEvent(mediaEvent);
              }

              break;

            case 'networkError':
              var message = 'Network error';
              console.error(message);
              var networkEvent = events_1.addEvent(type, details);
              this.element.dispatchEvent(networkEvent);
              break;

            default:
              this.player.destroy();
              var fatalEvent = events_1.addEvent(type, details);
              this.element.dispatchEvent(fatalEvent);
              break;
          }
        } else {
          var err = events_1.addEvent(type, details);
          this.element.dispatchEvent(err);
        }
      } else {
        if (event === 'hlsLevelLoaded' && data[1].details.live === true) {
          this.element.setAttribute('op-live__enabled', 'true');
          var timeEvent = events_1.addEvent('timeupdate');
          this.element.dispatchEvent(timeEvent);
        } else if (event === 'hlsLevelUpdated' && data[1].details.live === true && data[1].details.totalduration > constants_1.DVR_THRESHOLD) {
          this.element.setAttribute('op-dvr__enabled', 'true');

          var _timeEvent = events_1.addEvent('timeupdate');

          this.element.dispatchEvent(_timeEvent);
        } else if (event === 'hlsFragParsingMetadata') {
          var metaEvent = events_1.addEvent('metadataready', data[1]);
          this.element.dispatchEvent(metaEvent);
        }

        var e = events_1.addEvent(event, data[1]);
        this.element.dispatchEvent(e);
      }
    }
  }, {
    key: "_revoke",
    value: function _revoke() {
      var _this4 = this;

      this.player.stopLoad();

      if (this.events) {
        Object.keys(this.events).forEach(function (event) {
          _this4.player.off(_this4.events[event], function () {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            return _this4._assign(_this4.events[event], args);
          });
        });
      }

      this.element.removeEventListener('play', function () {
        if (_this4.player) {
          _this4.player.startLoad();
        }
      });
      this.element.removeEventListener('pause', function () {
        if (_this4.player) {
          _this4.player.stopLoad();
        }
      });
      this.player.destroy();
      this.player = null;
    }
  }, {
    key: "src",
    set: function set(media) {
      var _this5 = this;

      if (media_1.isHlsSource(media)) {
        this._revoke();

        this.player = new Hls(this.options);
        this.player.loadSource(media.src);
        this.player.attachMedia(this.element);
        this.events = Hls.Events;
        Object.keys(this.events).forEach(function (event) {
          _this5.player.on(_this5.events[event], function () {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            return _this5._assign(_this5.events[event], args);
          });
        });
      }
    }
  }, {
    key: "levels",
    get: function get() {
      var _this6 = this;

      var levels = [];

      if (this.player && this.player.levels && this.player.levels.length) {
        Object.keys(this.player.levels).forEach(function (item) {
          var _this6$player$levels$ = _this6.player.levels[item],
              height = _this6$player$levels$.height,
              name = _this6$player$levels$.name;
          var level = {
            height: height,
            id: item,
            label: name || null
          };
          levels.push(level);
        });
      }

      return levels;
    }
  }, {
    key: "level",
    set: function set(level) {
      this.player.currentLevel = level;
    },
    get: function get() {
      return this.player ? this.player.currentLevel : -1;
    }
  }]);

  return HlsMedia;
}(native_1["default"]);

exports["default"] = HlsMedia;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var media_1 = __webpack_require__(14);

var native_1 = __importDefault(__webpack_require__(31));

var HTML5Media = function (_native_1$default) {
  _inherits(HTML5Media, _native_1$default);

  var _super = _createSuper(HTML5Media);

  function HTML5Media(element, mediaFile) {
    var _this;

    _classCallCheck(this, HTML5Media);

    _this = _super.call(this, element, mediaFile);
    _this.currentLevel = null;
    _this.levelList = [];
    _this.isStreaming = false;
    element.addEventListener('error', function (e) {
      var details = {
        detail: {
          data: e,
          message: e.message,
          type: 'HTML5'
        }
      };
      var errorEvent = events_1.addEvent('playererror', details);
      element.dispatchEvent(errorEvent);
    }, constants_1.EVENT_OPTIONS);

    if (!general_1.isAudio(element) && !general_1.isVideo(element)) {
      throw new TypeError('Native method only supports video/audio tags');
    }

    _this.isStreaming = media_1.isHlsSource(mediaFile);

    _this.element.addEventListener('loadeddata', _this._isDvrEnabled.bind(_assertThisInitialized(_this)), constants_1.EVENT_OPTIONS);

    _this.element.textTracks.addEventListener('addtrack', _this._readMediadataInfo.bind(_assertThisInitialized(_this)), constants_1.EVENT_OPTIONS);

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(HTML5Media, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return !!this.element.canPlayType(mimeType).replace('no', '');
    }
  }, {
    key: "load",
    value: function load() {
      this.element.load();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('loadeddata', this._isDvrEnabled.bind(this));
      this.element.textTracks.removeEventListener('addtrack', this._readMediadataInfo.bind(this));
      return this;
    }
  }, {
    key: "_isDvrEnabled",
    value: function _isDvrEnabled() {
      var time = this.element.seekable.end(this.element.seekable.length - 1) - this.element.seekable.start(0);

      if (this.isStreaming && time > constants_1.DVR_THRESHOLD && !this.element.getAttribute('op-dvr__enabled')) {
        this.element.setAttribute('op-dvr__enabled', 'true');
        var timeEvent = events_1.addEvent('timeupdate');
        this.element.dispatchEvent(timeEvent);
      }
    }
  }, {
    key: "_readMediadataInfo",
    value: function _readMediadataInfo(e) {
      var _this2 = this;

      var target = e;

      if (target.track.kind === 'metadata') {
        target.track.mode = 'hidden';
        target.track.addEventListener('cuechange', function (event) {
          var track = event.target;
          var cue = track.activeCues ? track.activeCues[0] : null;

          if (cue) {
            var metaDataEvent = events_1.addEvent('metadataready', {
              detail: cue
            });

            _this2.element.dispatchEvent(metaDataEvent);
          }
        }, constants_1.EVENT_OPTIONS);
      }
    }
  }, {
    key: "levels",
    get: function get() {
      if (!this.levelList.length) {
        var levels = this.element.querySelectorAll('source[title]');

        for (var i = 0, total = levels.length; i < total; ++i) {
          var level = {
            height: 0,
            id: "".concat(i),
            label: levels[i].getAttribute('title')
          };
          this.levelList.push(level);
        }
      }

      return this.levelList;
    }
  }, {
    key: "level",
    set: function set(level) {
      var idx = this.levelList.findIndex(function (item) {
        return parseInt(item.id, 10) === level;
      });

      if (idx > -1) {
        this.currentLevel = this.levels[idx];
        var levels = this.element.querySelectorAll('source[title]');

        for (var i = 0, total = levels.length; i < total; ++i) {
          var source = levels[i].getAttribute('src');

          if (source && parseInt(this.currentLevel.id, 10) === i) {
            this.element.src = source;
          }
        }
      }
    },
    get: function get() {
      return this.currentLevel ? this.currentLevel.id : '-1';
    }
  }, {
    key: "src",
    set: function set(media) {
      this.element.src = media.src;
    }
  }]);

  return HTML5Media;
}(native_1["default"]);

exports["default"] = HTML5Media;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = __webpack_require__(1);

var events_1 = __webpack_require__(6);

var general_1 = __webpack_require__(2);

var Ads = function () {
  function Ads(player, ads, autoStart, autoStartMuted, options) {
    _classCallCheck(this, Ads);

    this.adsEnded = false;
    this.adsDone = false;
    this.adsActive = false;
    this.adsStarted = false;
    this.intervalTimer = 0;
    this.adsMuted = false;
    this.adsDuration = 0;
    this.adsCurrentTime = 0;
    this.adsManager = null;
    this.events = [];
    this.autoStart = false;
    this.autoStartMuted = false;
    this.playTriggered = false;
    this.currentAdsIndex = 0;
    this.lastTimePaused = 0;
    this.mediaSources = [];
    this.mediaStarted = false;
    var defaultOpts = {
      autoPlayAdBreaks: true,
      debug: false,
      enablePreloading: false,
      language: 'en',
      loop: false,
      numRedirects: 4,
      sdkPath: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
      src: []
    };
    this.player = player;
    this.ads = ads;
    this.media = player.getMedia();
    this.element = player.getElement();
    this.autoStart = autoStart || false;
    this.autoStartMuted = autoStartMuted || false;
    this.adsOptions = Object.assign(Object.assign({}, defaultOpts), options);
    this.playTriggered = false;
    this.originalVolume = this.element.volume;
    this.adsVolume = this.originalVolume;
    var path = this.adsOptions.debug ? this.adsOptions.sdkPath.replace(/(\.js$)/, '_debug.js') : this.adsOptions.sdkPath;
    this.promise = typeof google === 'undefined' || typeof google.ima === 'undefined' ? general_1.loadScript(path) : new Promise(function (resolve) {
      resolve({});
    });
    this.promise.then(this.load.bind(this));
    return this;
  }

  _createClass(Ads, [{
    key: "load",
    value: function load() {
      var _this = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.adsOptions.autoPlayAdBreaks && !force) {
        return;
      }

      var existingContainer = this.player.getContainer().querySelector('.op-ads');

      if (existingContainer && existingContainer.parentNode) {
        existingContainer.parentNode.removeChild(existingContainer);
      }

      this.adsStarted = true;
      this.adsContainer = document.createElement('div');
      this.adsContainer.className = 'op-ads';
      this.adsContainer.tabIndex = -1;

      if (this.element.parentElement) {
        this.element.parentElement.insertBefore(this.adsContainer, this.element.nextSibling);
      }

      this.mediaSources = this.media.src;
      google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
      google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
      google.ima.settings.setAutoPlayAdBreaks(this.adsOptions.autoPlayAdBreaks);
      google.ima.settings.setNumRedirects(this.adsOptions.numRedirects);
      google.ima.settings.setLocale(this.adsOptions.language);
      this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adsContainer, this.element);
      this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
      this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded.bind(this), constants_1.EVENT_OPTIONS);
      this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error.bind(this), constants_1.EVENT_OPTIONS);

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', function () {
          _this.resizeAds();
        }, constants_1.EVENT_OPTIONS);
      }

      this.element.addEventListener('loadedmetadata', function () {
        _this.resizeAds();
      }, constants_1.EVENT_OPTIONS);

      if (this.autoStart === true || this.autoStartMuted === true || force === true || this.adsOptions.enablePreloading === true) {
        if (!this.adsDone) {
          this.adsDone = true;
          this.adDisplayContainer.initialize();
        }

        this._requestAds();
      }
    }
  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      var play = function play() {
        if (!_this2.adsDone) {
          _this2._initNotDoneAds();

          return;
        }

        if (_this2.adsManager) {
          if (!_this2.intervalTimer && _this2.adsActive === false) {
            _this2.adsManager.start();
          } else {
            _this2.adsManager.resume();
          }

          _this2.adsActive = true;
          var e = events_1.addEvent('play');

          _this2.element.dispatchEvent(e);
        }
      };

      return new Promise(function (resolve) {
        resolve({});
      }).then(play);
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.adsManager) {
        this.adsActive = false;
        this.adsManager.pause();
        var e = events_1.addEvent('pause');
        this.element.dispatchEvent(e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (this.events) {
        this.events.forEach(function (event) {
          _this3.adsManager.removeEventListener(event, _this3._assign.bind(_this3));
        });
      }

      this.events = [];
      var controls = this.player.getControls();
      var mouseEvents = controls ? controls.events.mouse : {};
      Object.keys(mouseEvents).forEach(function (event) {
        if (_this3.adsContainer) {
          _this3.adsContainer.removeEventListener(event, mouseEvents[event]);
        }
      });

      if (this.adsLoader) {
        this.adsLoader.removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error.bind(this));
        this.adsLoader.removeEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded.bind(this));
      }

      var destroy = !Array.isArray(this.ads) || this.currentAdsIndex > this.ads.length;

      if (this.adsManager && destroy) {
        this.adsManager.destroy();
      }

      if (constants_1.IS_IOS || constants_1.IS_ANDROID) {
        this.element.removeEventListener('loadedmetadata', this._contentLoadedAction.bind(this));
      }

      this.element.removeEventListener('loadedmetadata', function () {
        _this3.resizeAds.bind(_this3);
      });
      this.element.removeEventListener('ended', this._contentEndedListener.bind(this));

      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', function () {
          _this3.resizeAds.bind(_this3);
        });
      }

      general_1.removeElement(this.adsContainer);
    }
  }, {
    key: "resizeAds",
    value: function resizeAds(width, height) {
      var _this4 = this;

      if (this.adsManager) {
        var target = this.element;
        var mode = target.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
        var timeout;

        if (timeout && typeof window !== 'undefined') {
          window.cancelAnimationFrame(timeout);
        }

        if (typeof window !== 'undefined') {
          timeout = window.requestAnimationFrame(function () {
            _this4.adsManager.resize(width || target.offsetWidth, height || target.offsetHeight, mode);
          });
        }
      }
    }
  }, {
    key: "_assign",
    value: function _assign(event) {
      var _this5 = this;

      var ad = event.getAd();

      switch (event.type) {
        case google.ima.AdEvent.Type.LOADED:
          if (!ad.isLinear()) {
            this._onContentResumeRequested();
          } else {
            if (constants_1.IS_IPHONE && general_1.isVideo(this.element)) {
              this.element.controls = false;
            }

            this.adsDuration = ad.getDuration();
            this.adsCurrentTime = ad.getDuration();

            if (!this.mediaStarted && !constants_1.IS_IOS && !constants_1.IS_ANDROID) {
              var waitingEvent = events_1.addEvent('waiting');
              this.element.dispatchEvent(waitingEvent);
              var loadedEvent = events_1.addEvent('loadedmetadata');
              this.element.dispatchEvent(loadedEvent);
              this.resizeAds();
            }
          }

          break;

        case google.ima.AdEvent.Type.STARTED:
          if (ad.isLinear()) {
            if (this.element.parentElement && !this.element.parentElement.classList.contains('op-ads--active')) {
              this.element.parentElement.classList.add('op-ads--active');
            }

            if (!this.media.paused) {
              this.media.pause();
            }

            this.adsActive = true;
            var playEvent = events_1.addEvent('play');
            this.element.dispatchEvent(playEvent);
            var resized;

            if (!resized) {
              this.resizeAds();
              resized = true;
            }

            if (this.media.ended) {
              this.adsEnded = false;
              var endEvent = events_1.addEvent('adsmediaended');
              this.element.dispatchEvent(endEvent);
            }

            if (typeof window !== 'undefined') {
              this.intervalTimer = window.setInterval(function () {
                if (_this5.adsActive === true) {
                  _this5.adsCurrentTime = Math.round(_this5.adsManager.getRemainingTime());
                  var timeEvent = events_1.addEvent('timeupdate');

                  _this5.element.dispatchEvent(timeEvent);
                }
              }, 350);
            }
          }

          break;

        case google.ima.AdEvent.Type.COMPLETE:
        case google.ima.AdEvent.Type.SKIPPED:
          if (ad.isLinear()) {
            if (event.type === google.ima.AdEvent.Type.SKIPPED) {
              var skipEvent = events_1.addEvent('adsskipped');
              this.element.dispatchEvent(skipEvent);
            }

            if (this.element.parentElement) {
              this.element.parentElement.classList.remove('op-ads--active');
            }

            this.adsActive = false;
            clearInterval(this.intervalTimer);
          }

          break;

        case google.ima.AdEvent.Type.VOLUME_CHANGED:
          this._setMediaVolume(this.volume);

        case google.ima.AdEvent.Type.VOLUME_MUTED:
          if (ad.isLinear()) {
            var volumeEvent = events_1.addEvent('volumechange');
            this.element.dispatchEvent(volumeEvent);
          }

          break;

        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
          if (ad.isLinear()) {
            this.adsActive = false;
            this.adsEnded = true;
            this.intervalTimer = 0;
            this.adsMuted = false;
            this.adsStarted = false;
            this.adsDuration = 0;
            this.adsCurrentTime = 0;

            if (this.element.parentElement) {
              this.element.parentElement.classList.remove('op-ads--active');
            }

            this.destroy();

            if (this.element.currentTime >= this.element.duration) {
              var endedEvent = events_1.addEvent('ended');
              this.element.dispatchEvent(endedEvent);
            }
          }

          break;

        default:
          break;
      }

      if (event.type === google.ima.AdEvent.Type.LOG) {
        var adData = event.getAdData();

        if (adData['adError']) {
          var message = adData['adError'].getMessage();
          console.warn("Ad warning: Non-fatal error occurred: ".concat(message));
          var details = {
            detail: {
              data: adData['adError'],
              message: message,
              type: 'Ads'
            }
          };
          var errorEvent = events_1.addEvent('playererror', details);
          this.element.dispatchEvent(errorEvent);
        }
      } else {
        var e = events_1.addEvent("ads".concat(event.type));
        this.element.dispatchEvent(e);
      }
    }
  }, {
    key: "_error",
    value: function _error(event) {
      var error = event.getError();
      var details = {
        detail: {
          data: error,
          message: error.toString(),
          type: 'Ads'
        }
      };
      var errorEvent = events_1.addEvent('playererror', details);
      this.element.dispatchEvent(errorEvent);
      var fatalErrorCodes = [100, 101, 102, 300, 301, 302, 303, 400, 401, 402, 403, 405, 406, 407, 408, 409, 410, 500, 501, 502, 503, 900, 901, 1005];

      if (Array.isArray(this.ads) && this.ads.length > 1 && this.currentAdsIndex <= this.ads.length - 1) {
        if (this.currentAdsIndex < this.ads.length - 1) {
          this.currentAdsIndex++;
        }

        this.playTriggered = true;
        this.adsStarted = true;
        this.adsDone = false;
        this.destroy();
        this.load(true);
        console.warn("Ad warning: ".concat(error.toString()));
      } else {
        if (fatalErrorCodes.indexOf(error.getErrorCode()) > -1) {
          if (this.adsManager) {
            this.adsManager.destroy();
          }

          console.error("Ad error: ".concat(error.toString()));
        } else {
          console.warn("Ad warning: ".concat(error.toString()));
        }

        if (this.autoStart === true || this.autoStartMuted === true || this.adsStarted === true) {
          this.adsActive = false;

          this._resumeMedia();
        }
      }
    }
  }, {
    key: "_loaded",
    value: function _loaded(adsManagerLoadedEvent) {
      var adsRenderingSettings = new google.ima.AdsRenderingSettings();
      adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false;
      adsRenderingSettings.enablePreloading = this.adsOptions.enablePreloading;
      this.adsManager = adsManagerLoadedEvent.getAdsManager(this.element, adsRenderingSettings);

      this._start(this.adsManager);
    }
  }, {
    key: "_start",
    value: function _start(manager) {
      var _this6 = this;

      manager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onContentPauseRequested.bind(this), constants_1.EVENT_OPTIONS);
      manager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onContentResumeRequested.bind(this), constants_1.EVENT_OPTIONS);
      this.events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED, google.ima.AdEvent.Type.CLICK, google.ima.AdEvent.Type.VIDEO_CLICKED, google.ima.AdEvent.Type.VIDEO_ICON_CLICKED, google.ima.AdEvent.Type.AD_PROGRESS, google.ima.AdEvent.Type.AD_BUFFERING, google.ima.AdEvent.Type.IMPRESSION, google.ima.AdEvent.Type.DURATION_CHANGE, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.LINEAR_CHANGED, google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, google.ima.AdEvent.Type.AD_METADATA, google.ima.AdEvent.Type.INTERACTION, google.ima.AdEvent.Type.COMPLETE, google.ima.AdEvent.Type.FIRST_QUARTILE, google.ima.AdEvent.Type.LOADED, google.ima.AdEvent.Type.MIDPOINT, google.ima.AdEvent.Type.PAUSED, google.ima.AdEvent.Type.RESUMED, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.STARTED, google.ima.AdEvent.Type.THIRD_QUARTILE, google.ima.AdEvent.Type.SKIPPED, google.ima.AdEvent.Type.VOLUME_CHANGED, google.ima.AdEvent.Type.VOLUME_MUTED, google.ima.AdEvent.Type.LOG];

      if (!this.adsOptions.autoPlayAdBreaks) {
        this.events.push(google.ima.AdEvent.Type.AD_BREAK_READY);
      }

      var controls = this.player.getControls();
      var mouseEvents = controls ? controls.events.mouse : {};
      Object.keys(mouseEvents).forEach(function (event) {
        if (_this6.adsContainer) {
          _this6.adsContainer.addEventListener(event, mouseEvents[event], constants_1.EVENT_OPTIONS);
        }
      });
      this.events.forEach(function (event) {
        manager.addEventListener(event, _this6._assign.bind(_this6), constants_1.EVENT_OPTIONS);
      });

      if (this.autoStart === true || this.playTriggered === true) {
        this.playTriggered = false;

        if (!this.adsDone) {
          this._initNotDoneAds();

          return;
        }

        manager.init(this.element.offsetWidth, this.element.offsetHeight, this.element.parentElement && this.element.parentElement.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
        manager.start();
        var e = events_1.addEvent('play');
        this.element.dispatchEvent(e);
        var event = events_1.addEvent('playing');
        this.element.dispatchEvent(event);
      } else if (this.adsOptions.enablePreloading === true) {
        manager.init(this.element.offsetWidth, this.element.offsetHeight, this.element.parentElement && this.element.parentElement.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
      }
    }
  }, {
    key: "_initNotDoneAds",
    value: function _initNotDoneAds() {
      this.adsDone = true;
      this.adDisplayContainer.initialize();

      if (constants_1.IS_IOS || constants_1.IS_ANDROID) {
        this.preloadContent = this._contentLoadedAction;
        this.element.addEventListener('loadedmetadata', this._contentLoadedAction.bind(this), constants_1.EVENT_OPTIONS);
        this.element.load();
      } else {
        this._contentLoadedAction();
      }
    }
  }, {
    key: "_contentEndedListener",
    value: function _contentEndedListener() {
      this.adsEnded = true;
      this.adsActive = false;
      this.adsStarted = false;
      this.adsLoader.contentComplete();
    }
  }, {
    key: "_onContentPauseRequested",
    value: function _onContentPauseRequested() {
      this.element.removeEventListener('ended', this._contentEndedListener.bind(this));
      this.lastTimePaused = this.media.currentTime;

      if (this.adsStarted) {
        this.media.pause();
      } else {
        this.adsStarted = true;
      }

      var e = events_1.addEvent('play');
      this.element.dispatchEvent(e);
    }
  }, {
    key: "_onContentResumeRequested",
    value: function _onContentResumeRequested() {
      if (this.adsOptions.loop) {
        if (Array.isArray(this.ads)) {
          if (this.currentAdsIndex === this.ads.length - 1) {
            this.currentAdsIndex = 0;
          } else {
            this.currentAdsIndex++;
          }
        }

        this.destroy();
        this.adsLoader.contentComplete();
        this.playTriggered = true;
        this.adsStarted = true;
        this.adsDone = false;
        this.load(true);
      } else {
        this.element.addEventListener('ended', this._contentEndedListener.bind(this), constants_1.EVENT_OPTIONS);
        this.element.addEventListener('loadedmetadata', this._loadedMetadataHandler.bind(this), constants_1.EVENT_OPTIONS);

        if (constants_1.IS_IOS || constants_1.IS_ANDROID) {
          this.media.src = this.mediaSources;
          this.media.load();

          this._prepareMedia();

          if (this.element.parentElement) {
            this.element.parentElement.classList.add('op-ads--active');
          }
        } else {
          var event = events_1.addEvent('loadedmetadata');
          this.element.dispatchEvent(event);
        }
      }
    }
  }, {
    key: "_loadedMetadataHandler",
    value: function _loadedMetadataHandler() {
      if (Array.isArray(this.ads)) {
        this.currentAdsIndex++;

        if (this.currentAdsIndex <= this.ads.length - 1) {
          if (this.adsManager) {
            this.adsManager.destroy();
          }

          this.adsLoader.contentComplete();
          this.playTriggered = true;
          this.adsStarted = true;
          this.adsDone = false;

          this._requestAds();
        } else {
          if (!this.adsOptions.autoPlayAdBreaks) {
            this._resetAdsAfterManualBreak();
          }

          this._prepareMedia();
        }
      } else if (this.element.seekable.length) {
        if (this.element.seekable.end(0) > this.lastTimePaused) {
          if (!this.adsOptions.autoPlayAdBreaks) {
            this._resetAdsAfterManualBreak();
          }

          this._prepareMedia();
        }
      } else {
        setTimeout(this._loadedMetadataHandler.bind(this), 100);
      }
    }
  }, {
    key: "_resumeMedia",
    value: function _resumeMedia() {
      var _this7 = this;

      this.intervalTimer = 0;
      this.adsMuted = false;
      this.adsStarted = false;
      this.adsDuration = 0;
      this.adsCurrentTime = 0;

      if (this.element.parentElement) {
        this.element.parentElement.classList.remove('op-ads--active');
      }

      var triggerEvent = function triggerEvent(eventName) {
        var event = events_1.addEvent(eventName);

        _this7.element.dispatchEvent(event);
      };

      var waitPromise = function waitPromise(ms, isReject) {
        return new Promise(function (resolve, reject) {
          if (isReject) {
            return reject();
          }

          setTimeout(resolve, ms);
        });
      };

      waitPromise(50, this.media.ended).then(function () {
        return _this7.media.play().then(function () {
          return triggerEvent('play');
        });
      })["catch"](function () {
        return triggerEvent('ended');
      });
    }
  }, {
    key: "_requestAds",
    value: function _requestAds() {
      this.adsRequest = new google.ima.AdsRequest();
      var ads = Array.isArray(this.ads) ? this.ads[this.currentAdsIndex] : this.ads;

      if (general_1.isXml(ads)) {
        this.adsRequest.adsResponse = ads;
      } else {
        this.adsRequest.adTagUrl = ads;
      }

      var width = this.element.parentElement ? this.element.parentElement.offsetWidth : 0;
      var height = this.element.parentElement ? this.element.parentElement.offsetHeight : 0;
      this.adsRequest.linearAdSlotWidth = width;
      this.adsRequest.linearAdSlotHeight = height;
      this.adsRequest.nonLinearAdSlotWidth = width;
      this.adsRequest.nonLinearAdSlotHeight = height / 3;
      this.adsRequest.setAdWillAutoPlay(this.autoStart);
      this.adsRequest.setAdWillPlayMuted(this.autoStartMuted);
      this.adsLoader.requestAds(this.adsRequest);
    }
  }, {
    key: "_contentLoadedAction",
    value: function _contentLoadedAction() {
      if (this.preloadContent) {
        this.element.removeEventListener('loadedmetadata', this.preloadContent.bind(this));
        this.preloadContent = null;
      }

      this._requestAds();
    }
  }, {
    key: "_resetAdsAfterManualBreak",
    value: function _resetAdsAfterManualBreak() {
      if (this.adsManager) {
        this.adsManager.destroy();
      }

      this.adsLoader.contentComplete();
      this.adsDone = false;
      this.playTriggered = true;
    }
  }, {
    key: "_prepareMedia",
    value: function _prepareMedia() {
      this.media.currentTime = this.lastTimePaused;
      this.element.removeEventListener('loadedmetadata', this._loadedMetadataHandler.bind(this));

      this._resumeMedia();
    }
  }, {
    key: "_setMediaVolume",
    value: function _setMediaVolume(volume) {
      this.media.volume = volume;
      this.media.muted = volume === 0;
    }
  }, {
    key: "playRequested",
    set: function set(value) {
      this.playTriggered = value;
    }
  }, {
    key: "volume",
    set: function set(value) {
      if (this.adsManager) {
        this.adsVolume = value;
        this.adsManager.setVolume(value);

        this._setMediaVolume(value);

        this.adsMuted = value === 0;
      }
    },
    get: function get() {
      return this.adsManager ? this.adsManager.getVolume() : this.originalVolume;
    }
  }, {
    key: "muted",
    set: function set(value) {
      if (this.adsManager) {
        if (value) {
          this.adsManager.setVolume(0);
          this.adsMuted = true;

          this._setMediaVolume(0);
        } else {
          this.adsManager.setVolume(this.adsVolume);
          this.adsMuted = false;

          this._setMediaVolume(this.adsVolume);
        }
      }
    },
    get: function get() {
      return this.adsMuted;
    }
  }, {
    key: "currentTime",
    set: function set(value) {
      this.adsCurrentTime = value;
    },
    get: function get() {
      return this.adsCurrentTime;
    }
  }, {
    key: "duration",
    get: function get() {
      return this.adsDuration;
    }
  }, {
    key: "paused",
    get: function get() {
      return !this.adsActive;
    }
  }, {
    key: "ended",
    get: function get() {
      return this.adsEnded;
    }
  }]);

  return Ads;
}();

exports["default"] = Ads;

/***/ })
/******/ ])["default"];
});