(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SirTrevor"] = factory();
	else
		root["SirTrevor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

	__webpack_require__(280);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)["default"];

	__webpack_require__(17);

	// ES6 shims
	__webpack_require__(18).shim();
	__webpack_require__(21);
	__webpack_require__(22); // shims ES7 Array.prototype.includes
	__webpack_require__(23).polyfill();

	var utils = __webpack_require__(29);

	var SirTrevor = {

	  config: __webpack_require__(68),

	  log: utils.log,

	  Locales: __webpack_require__(72),

	  Events: __webpack_require__(73),
	  EventBus: __webpack_require__(75),

	  EditorStore: __webpack_require__(76),
	  Submittable: __webpack_require__(77),
	  FileUploader: __webpack_require__(78),

	  BlockMixins: __webpack_require__(128),
	  BlockPositioner: __webpack_require__(234),
	  BlockReorder: __webpack_require__(237),
	  BlockDeletion: __webpack_require__(238),
	  BlockValidations: __webpack_require__(239),
	  BlockStore: __webpack_require__(240),
	  BlockManager: __webpack_require__(241),

	  SimpleBlock: __webpack_require__(245),
	  Block: __webpack_require__(244),

	  Blocks: __webpack_require__(242),

	  FormatBar: __webpack_require__(269),
	  Editor: __webpack_require__(271),

	  toMarkdown: __webpack_require__(279),
	  toHTML: __webpack_require__(253),

	  setDefaults: function setDefaults(options) {
	    _Object$assign(SirTrevor.config.defaults, options || {});
	  },

	  getInstance: utils.getInstance,

	  setBlockOptions: function setBlockOptions(type, options) {
	    var block = SirTrevor.Blocks[type];

	    if (typeof block === "undefined") {
	      return;
	    }

	    _Object$assign(block.prototype, options || {});
	  },

	  runOnAllInstances: function runOnAllInstances(method) {
	    if (SirTrevor.Editor.prototype.hasOwnProperty(method)) {
	      var methodArgs = Array.prototype.slice.call(arguments, 1);
	      Array.prototype.forEach.call(SirTrevor.config.instances, function (i) {
	        i[method].apply(null, methodArgs);
	      });
	    } else {
	      SirTrevor.log("method doesn't exist");
	    }
	  }

	};

	_Object$assign(SirTrevor, __webpack_require__(272));

	module.exports = SirTrevor;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(10)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(11)
	  , toObject = __webpack_require__(12)
	  , IObject  = __webpack_require__(14);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(16)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(13);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(15);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es6-shim
	var keys = __webpack_require__(19);
	var canBeObject = function (obj) {
		return typeof obj !== 'undefined' && obj !== null;
	};

	var assignShim = function assign(target, source1) {
		if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
		var objTarget = Object(target);
		var s, source, i, props;
		for (s = 1; s < arguments.length; ++s) {
			source = Object(arguments[s]);
			props = keys(source);
			for (i = 0; i < props.length; ++i) {
				objTarget[props[i]] = source[props[i]];
			}
		}
		return objTarget;
	};

	assignShim.shim = function shimObjectAssign() {
		if (!Object.assign) {
			Object.assign = assignShim;
		}
		return Object.assign || assignShim;
	};

	module.exports = assignShim;



/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(20);
	var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
	var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var blacklistedKeys = {
		$console: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$parent: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			}(1, 2));
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
	// For all details and docs: https://github.com/paulmillr/array.prototype.find
	// Fixes and tests supplied by Duncan Hall <http://duncanhall.net> 
	(function(globals){
	  if (Array.prototype.find) return;

	  var find = function(predicate) {
	    var list = Object(this);
	    var length = list.length < 0 ? 0 : list.length >>> 0; // ES.ToUint32;
	    if (length === 0) return undefined;
	    if (typeof predicate !== 'function' || Object.prototype.toString.call(predicate) !== '[object Function]') {
	      throw new TypeError('Array#find: predicate must be a function');
	    }
	    var thisArg = arguments[1];
	    for (var i = 0, value; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) return value;
	    }
	    return undefined;
	  };

	  if (Object.defineProperty) {
	    try {
	      Object.defineProperty(Array.prototype, 'find', {
	        value: find, configurable: true, enumerable: false, writable: true
	      });
	    } catch(e) {}
	  }

	  if (!Array.prototype.find) {
	    Array.prototype.find = find;
	  }
	})(this);


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	// jshint freeze: false, maxcomplexity: 11

	if (!Array.prototype.includes) {
	  Array.prototype.includes = function (searchElement /*, fromIndex*/) {
	    var O = Object(this);
	    var len = parseInt(O.length) || 0;
	    if (len === 0) {
	      return false;
	    }
	    var n = parseInt(arguments[1]) || 0;
	    var k;
	    if (n >= 0) {
	      k = n;
	    } else {
	      k = len + n;
	      if (k < 0) {
	        k = 0;
	      }
	    }
	    var currentElement;
	    while (k < len) {
	      currentElement = O[k];
	      if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
	        return true;
	      }
	      k++;
	    }
	    return false;
	  };
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, setImmediate, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.3.0
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      var nextTick = process.nextTick;
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // setImmediate should be used instead instead
	      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
	      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
	        nextTick = setImmediate;
	      }
	      return function() {
	        nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertex() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(27);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertex();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFullfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFullfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;

	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;

	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }

	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(28)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24), __webpack_require__(25).setImmediate, (function() { return this; }()), __webpack_require__(26)(module)))

/***/ },
/* 24 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(24).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25).setImmediate, __webpack_require__(25).clearImmediate))

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$keys = __webpack_require__(30)['default'];

	var _ = __webpack_require__(34);
	var config = __webpack_require__(68);
	var Dom = __webpack_require__(69);

	var urlRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

	var utils = {

	  getInstance: function getInstance(identifier) {
	    if (_.isUndefined(identifier)) {
	      return config.instances[0];
	    }

	    if (_.isString(identifier)) {
	      return config.instances.find(function (editor) {
	        return editor.ID === identifier;
	      });
	    }

	    return config.instances[identifier];
	  },

	  getInstanceBySelection: function getInstanceBySelection() {
	    return utils.getInstance(Dom.getClosest(window.getSelection().anchorNode.parentNode, '.st-block').getAttribute('data-instance'));
	  },

	  getBlockBySelection: function getBlockBySelection() {
	    return utils.getInstanceBySelection().findBlockById(Dom.getClosest(window.getSelection().anchorNode.parentNode, '.st-block').id);
	  },

	  log: function log() {
	    if (!_.isUndefined(console) && config.debug) {
	      console.log.apply(console, arguments);
	    }
	  },

	  isURI: function isURI(string) {
	    return urlRegex.test(string);
	  },

	  titleize: function titleize(str) {
	    if (str === null) {
	      return '';
	    }
	    str = String(str).toLowerCase();
	    return str.replace(/(?:^|\s|-)\S/g, function (c) {
	      return c.toUpperCase();
	    });
	  },

	  classify: function classify(str) {
	    return utils.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
	  },

	  capitalize: function capitalize(string) {
	    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	  },

	  flatten: function flatten(obj) {
	    var x = {};
	    (Array.isArray(obj) ? obj : _Object$keys(obj)).forEach(function (i) {
	      x[i] = true;
	    });
	    return x;
	  },

	  underscored: function underscored(str) {
	    return str.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
	  },

	  reverse: function reverse(str) {
	    return str.split("").reverse().join("");
	  },

	  toSlug: function toSlug(str) {
	    return str.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
	  },

	  leftTrim: function leftTrim(str) {
	    return str.replace(/^\s+/, '');
	  }

	};

	module.exports = utils;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	module.exports = __webpack_require__(7).Object.keys;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(12);

	__webpack_require__(33)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5)
	  , core    = __webpack_require__(7)
	  , fails   = __webpack_require__(16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.isEmpty = __webpack_require__(35);
	exports.isFunction = __webpack_require__(49);
	exports.isObject = __webpack_require__(43);
	exports.isString = __webpack_require__(54);
	exports.isUndefined = __webpack_require__(55);
	exports.result = __webpack_require__(56);
	exports.template = __webpack_require__(57);
	exports.uniqueId = __webpack_require__(67);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var forOwn = __webpack_require__(36),
	    isFunction = __webpack_require__(49);

	/** `Object#toString` result shortcuts */
	var argsClass = '[object Arguments]',
	    arrayClass = '[object Array]',
	    objectClass = '[object Object]',
	    stringClass = '[object String]';

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/**
	 * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
	 * length of `0` and objects with no own enumerable properties are considered
	 * "empty".
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {Array|Object|string} value The value to inspect.
	 * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({});
	 * // => true
	 *
	 * _.isEmpty('');
	 * // => true
	 */
	function isEmpty(value) {
	  var result = true;
	  if (!value) {
	    return result;
	  }
	  var className = toString.call(value),
	      length = value.length;

	  if ((className == arrayClass || className == stringClass || className == argsClass ) ||
	      (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
	    return !length;
	  }
	  forOwn(value, function() {
	    return (result = false);
	  });
	  return result;
	}

	module.exports = isEmpty;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseCreateCallback = __webpack_require__(37),
	    keys = __webpack_require__(52),
	    objectTypes = __webpack_require__(44);

	/**
	 * Iterates over own enumerable properties of an object, executing the callback
	 * for each property. The callback is bound to `thisArg` and invoked with three
	 * arguments; (value, key, object). Callbacks may exit iteration early by
	 * explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Objects
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [callback=identity] The function called per iteration.
	 * @param {*} [thisArg] The `this` binding of `callback`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	 *   console.log(key);
	 * });
	 * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
	 */
	var forOwn = function(collection, callback, thisArg) {
	  var index, iterable = collection, result = iterable;
	  if (!iterable) return result;
	  if (!objectTypes[typeof iterable]) return result;
	  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	    var ownIndex = -1,
	        ownProps = objectTypes[typeof iterable] && keys(iterable),
	        length = ownProps ? ownProps.length : 0;

	    while (++ownIndex < length) {
	      index = ownProps[ownIndex];
	      if (callback(iterable[index], index, collection) === false) return result;
	    }
	  return result
	};

	module.exports = forOwn;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var bind = __webpack_require__(38),
	    identity = __webpack_require__(50),
	    setBindData = __webpack_require__(46),
	    support = __webpack_require__(51);

	/** Used to detected named functions */
	var reFuncName = /^\s*function[ \n\r\t]+\w/;

	/** Used to detect functions containing a `this` reference */
	var reThis = /\bthis\b/;

	/** Native method shortcuts */
	var fnToString = Function.prototype.toString;

	/**
	 * The base implementation of `_.createCallback` without support for creating
	 * "_.pluck" or "_.where" style callbacks.
	 *
	 * @private
	 * @param {*} [func=identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of the created callback.
	 * @param {number} [argCount] The number of arguments the callback accepts.
	 * @returns {Function} Returns a callback function.
	 */
	function baseCreateCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  // exit early for no `thisArg` or already bound by `Function#bind`
	  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
	    return func;
	  }
	  var bindData = func.__bindData__;
	  if (typeof bindData == 'undefined') {
	    if (support.funcNames) {
	      bindData = !func.name;
	    }
	    bindData = bindData || !support.funcDecomp;
	    if (!bindData) {
	      var source = fnToString.call(func);
	      if (!support.funcNames) {
	        bindData = !reFuncName.test(source);
	      }
	      if (!bindData) {
	        // checks if `func` references the `this` keyword and stores the result
	        bindData = reThis.test(source);
	        setBindData(func, bindData);
	      }
	    }
	  }
	  // exit early if there are no `this` references or `func` is bound
	  if (bindData === false || (bindData !== true && bindData[1] & 1)) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 2: return function(a, b) {
	      return func.call(thisArg, a, b);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	  }
	  return bind(func, thisArg);
	}

	module.exports = baseCreateCallback;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var createWrapper = __webpack_require__(39),
	    slice = __webpack_require__(47);

	/**
	 * Creates a function that, when called, invokes `func` with the `this`
	 * binding of `thisArg` and prepends any additional `bind` arguments to those
	 * provided to the bound function.
	 *
	 * @static
	 * @memberOf _
	 * @category Functions
	 * @param {Function} func The function to bind.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {...*} [arg] Arguments to be partially applied.
	 * @returns {Function} Returns the new bound function.
	 * @example
	 *
	 * var func = function(greeting) {
	 *   return greeting + ' ' + this.name;
	 * };
	 *
	 * func = _.bind(func, { 'name': 'fred' }, 'hi');
	 * func();
	 * // => 'hi fred'
	 */
	function bind(func, thisArg) {
	  return arguments.length > 2
	    ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
	    : createWrapper(func, 1, null, null, thisArg);
	}

	module.exports = bind;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseBind = __webpack_require__(40),
	    baseCreateWrapper = __webpack_require__(48),
	    isFunction = __webpack_require__(49),
	    slice = __webpack_require__(47);

	/**
	 * Used for `Array` method references.
	 *
	 * Normally `Array.prototype` would suffice, however, using an array literal
	 * avoids issues in Narwhal.
	 */
	var arrayRef = [];

	/** Native method shortcuts */
	var push = arrayRef.push,
	    unshift = arrayRef.unshift;

	/**
	 * Creates a function that, when called, either curries or invokes `func`
	 * with an optional `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to reference.
	 * @param {number} bitmask The bitmask of method flags to compose.
	 *  The bitmask may be composed of the following flags:
	 *  1 - `_.bind`
	 *  2 - `_.bindKey`
	 *  4 - `_.curry`
	 *  8 - `_.curry` (bound)
	 *  16 - `_.partial`
	 *  32 - `_.partialRight`
	 * @param {Array} [partialArgs] An array of arguments to prepend to those
	 *  provided to the new function.
	 * @param {Array} [partialRightArgs] An array of arguments to append to those
	 *  provided to the new function.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new function.
	 */
	function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
	  var isBind = bitmask & 1,
	      isBindKey = bitmask & 2,
	      isCurry = bitmask & 4,
	      isCurryBound = bitmask & 8,
	      isPartial = bitmask & 16,
	      isPartialRight = bitmask & 32;

	  if (!isBindKey && !isFunction(func)) {
	    throw new TypeError;
	  }
	  if (isPartial && !partialArgs.length) {
	    bitmask &= ~16;
	    isPartial = partialArgs = false;
	  }
	  if (isPartialRight && !partialRightArgs.length) {
	    bitmask &= ~32;
	    isPartialRight = partialRightArgs = false;
	  }
	  var bindData = func && func.__bindData__;
	  if (bindData && bindData !== true) {
	    // clone `bindData`
	    bindData = slice(bindData);
	    if (bindData[2]) {
	      bindData[2] = slice(bindData[2]);
	    }
	    if (bindData[3]) {
	      bindData[3] = slice(bindData[3]);
	    }
	    // set `thisBinding` is not previously bound
	    if (isBind && !(bindData[1] & 1)) {
	      bindData[4] = thisArg;
	    }
	    // set if previously bound but not currently (subsequent curried functions)
	    if (!isBind && bindData[1] & 1) {
	      bitmask |= 8;
	    }
	    // set curried arity if not yet set
	    if (isCurry && !(bindData[1] & 4)) {
	      bindData[5] = arity;
	    }
	    // append partial left arguments
	    if (isPartial) {
	      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
	    }
	    // append partial right arguments
	    if (isPartialRight) {
	      unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
	    }
	    // merge flags
	    bindData[1] |= bitmask;
	    return createWrapper.apply(null, bindData);
	  }
	  // fast path for `_.bind`
	  var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
	  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
	}

	module.exports = createWrapper;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseCreate = __webpack_require__(41),
	    isObject = __webpack_require__(43),
	    setBindData = __webpack_require__(46),
	    slice = __webpack_require__(47);

	/**
	 * Used for `Array` method references.
	 *
	 * Normally `Array.prototype` would suffice, however, using an array literal
	 * avoids issues in Narwhal.
	 */
	var arrayRef = [];

	/** Native method shortcuts */
	var push = arrayRef.push;

	/**
	 * The base implementation of `_.bind` that creates the bound function and
	 * sets its meta data.
	 *
	 * @private
	 * @param {Array} bindData The bind data array.
	 * @returns {Function} Returns the new bound function.
	 */
	function baseBind(bindData) {
	  var func = bindData[0],
	      partialArgs = bindData[2],
	      thisArg = bindData[4];

	  function bound() {
	    // `Function#bind` spec
	    // http://es5.github.io/#x15.3.4.5
	    if (partialArgs) {
	      // avoid `arguments` object deoptimizations by using `slice` instead
	      // of `Array.prototype.slice.call` and not assigning `arguments` to a
	      // variable as a ternary expression
	      var args = slice(partialArgs);
	      push.apply(args, arguments);
	    }
	    // mimic the constructor's `return` behavior
	    // http://es5.github.io/#x13.2.2
	    if (this instanceof bound) {
	      // ensure `new bound` is an instance of `func`
	      var thisBinding = baseCreate(func.prototype),
	          result = func.apply(thisBinding, args || arguments);
	      return isObject(result) ? result : thisBinding;
	    }
	    return func.apply(thisArg, args || arguments);
	  }
	  setBindData(bound, bindData);
	  return bound;
	}

	module.exports = baseBind;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(42),
	    isObject = __webpack_require__(43),
	    noop = __webpack_require__(45);

	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(prototype, properties) {
	  return isObject(prototype) ? nativeCreate(prototype) : {};
	}
	// fallback for browsers without `Object.create`
	if (!nativeCreate) {
	  baseCreate = (function() {
	    function Object() {}
	    return function(prototype) {
	      if (isObject(prototype)) {
	        Object.prototype = prototype;
	        var result = new Object;
	        Object.prototype = null;
	      }
	      return result || global.Object();
	    };
	  }());
	}

	module.exports = baseCreate;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(44);

	/**
	 * Checks if `value` is the language type of Object.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // check if the value is the ECMAScript language type of Object
	  // http://es5.github.io/#x8
	  // and avoid a V8 bug
	  // http://code.google.com/p/v8/issues/detail?id=2291
	  return !!(value && objectTypes[typeof value]);
	}

	module.exports = isObject;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to determine if values are of the language type Object */
	var objectTypes = {
	  'boolean': false,
	  'function': true,
	  'object': true,
	  'number': false,
	  'string': false,
	  'undefined': false
	};

	module.exports = objectTypes;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * A no-operation function.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @example
	 *
	 * var object = { 'name': 'fred' };
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // no operation performed
	}

	module.exports = noop;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(42),
	    noop = __webpack_require__(45);

	/** Used as the property descriptor for `__bindData__` */
	var descriptor = {
	  'configurable': false,
	  'enumerable': false,
	  'value': null,
	  'writable': false
	};

	/** Used to set meta data on functions */
	var defineProperty = (function() {
	  // IE 8 only accepts DOM elements
	  try {
	    var o = {},
	        func = isNative(func = Object.defineProperty) && func,
	        result = func(o, o, o) && func;
	  } catch(e) { }
	  return result;
	}());

	/**
	 * Sets `this` binding data on a given function.
	 *
	 * @private
	 * @param {Function} func The function to set data on.
	 * @param {Array} value The data array to set.
	 */
	var setBindData = !defineProperty ? noop : function(func, value) {
	  descriptor.value = value;
	  defineProperty(func, '__bindData__', descriptor);
	};

	module.exports = setBindData;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Slices the `collection` from the `start` index up to, but not including,
	 * the `end` index.
	 *
	 * Note: This function is used instead of `Array#slice` to support node lists
	 * in IE < 9 and to ensure dense arrays are returned.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to slice.
	 * @param {number} start The start index.
	 * @param {number} end The end index.
	 * @returns {Array} Returns the new array.
	 */
	function slice(array, start, end) {
	  start || (start = 0);
	  if (typeof end == 'undefined') {
	    end = array ? array.length : 0;
	  }
	  var index = -1,
	      length = end - start || 0,
	      result = Array(length < 0 ? 0 : length);

	  while (++index < length) {
	    result[index] = array[start + index];
	  }
	  return result;
	}

	module.exports = slice;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseCreate = __webpack_require__(41),
	    isObject = __webpack_require__(43),
	    setBindData = __webpack_require__(46),
	    slice = __webpack_require__(47);

	/**
	 * Used for `Array` method references.
	 *
	 * Normally `Array.prototype` would suffice, however, using an array literal
	 * avoids issues in Narwhal.
	 */
	var arrayRef = [];

	/** Native method shortcuts */
	var push = arrayRef.push;

	/**
	 * The base implementation of `createWrapper` that creates the wrapper and
	 * sets its meta data.
	 *
	 * @private
	 * @param {Array} bindData The bind data array.
	 * @returns {Function} Returns the new function.
	 */
	function baseCreateWrapper(bindData) {
	  var func = bindData[0],
	      bitmask = bindData[1],
	      partialArgs = bindData[2],
	      partialRightArgs = bindData[3],
	      thisArg = bindData[4],
	      arity = bindData[5];

	  var isBind = bitmask & 1,
	      isBindKey = bitmask & 2,
	      isCurry = bitmask & 4,
	      isCurryBound = bitmask & 8,
	      key = func;

	  function bound() {
	    var thisBinding = isBind ? thisArg : this;
	    if (partialArgs) {
	      var args = slice(partialArgs);
	      push.apply(args, arguments);
	    }
	    if (partialRightArgs || isCurry) {
	      args || (args = slice(arguments));
	      if (partialRightArgs) {
	        push.apply(args, partialRightArgs);
	      }
	      if (isCurry && args.length < arity) {
	        bitmask |= 16 & ~32;
	        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
	      }
	    }
	    args || (args = arguments);
	    if (isBindKey) {
	      func = thisBinding[key];
	    }
	    if (this instanceof bound) {
	      thisBinding = baseCreate(func.prototype);
	      var result = func.apply(thisBinding, args);
	      return isObject(result) ? result : thisBinding;
	    }
	    return func.apply(thisBinding, args);
	  }
	  setBindData(bound, bindData);
	  return bound;
	}

	module.exports = baseCreateWrapper;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Checks if `value` is a function.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 */
	function isFunction(value) {
	  return typeof value == 'function';
	}

	module.exports = isFunction;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'name': 'fred' };
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(42);

	/** Used to detect functions containing a `this` reference */
	var reThis = /\bthis\b/;

	/**
	 * An object used to flag environments features.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var support = {};

	/**
	 * Detect if functions can be decompiled by `Function#toString`
	 * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
	 *
	 * @memberOf _.support
	 * @type boolean
	 */
	support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

	/**
	 * Detect if `Function#name` is supported (all but IE).
	 *
	 * @memberOf _.support
	 * @type boolean
	 */
	support.funcNames = typeof Function.name == 'string';

	module.exports = support;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(42),
	    isObject = __webpack_require__(43),
	    shimKeys = __webpack_require__(53);

	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	/**
	 * Creates an array composed of the own enumerable property names of an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property names.
	 * @example
	 *
	 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  if (!isObject(object)) {
	    return [];
	  }
	  return nativeKeys(object);
	};

	module.exports = keys;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(44);

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Native method shortcuts */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which produces an array of the
	 * given object's own enumerable property names.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property names.
	 */
	var shimKeys = function(object) {
	  var index, iterable = object, result = [];
	  if (!iterable) return result;
	  if (!(objectTypes[typeof object])) return result;
	    for (index in iterable) {
	      if (hasOwnProperty.call(iterable, index)) {
	        result.push(index);
	      }
	    }
	  return result
	};

	module.exports = shimKeys;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** `Object#toString` result shortcuts */
	var stringClass = '[object String]';

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/**
	 * Checks if `value` is a string.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('fred');
	 * // => true
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    value && typeof value == 'object' && toString.call(value) == stringClass || false;
	}

	module.exports = isString;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 */
	function isUndefined(value) {
	  return typeof value == 'undefined';
	}

	module.exports = isUndefined;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isFunction = __webpack_require__(49);

	/**
	 * Resolves the value of property `key` on `object`. If `key` is a function
	 * it will be invoked with the `this` binding of `object` and its result returned,
	 * else the property value is returned. If `object` is falsey then `undefined`
	 * is returned.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {Object} object The object to inspect.
	 * @param {string} key The name of the property to resolve.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = {
	 *   'cheese': 'crumpets',
	 *   'stuff': function() {
	 *     return 'nonsense';
	 *   }
	 * };
	 *
	 * _.result(object, 'cheese');
	 * // => 'crumpets'
	 *
	 * _.result(object, 'stuff');
	 * // => 'nonsense'
	 */
	function result(object, key) {
	  if (object) {
	    var value = object[key];
	    return isFunction(value) ? object[key]() : value;
	  }
	}

	module.exports = result;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var defaults = __webpack_require__(58),
	    escape = __webpack_require__(59),
	    escapeStringChar = __webpack_require__(63),
	    keys = __webpack_require__(52),
	    reInterpolate = __webpack_require__(64),
	    templateSettings = __webpack_require__(65),
	    values = __webpack_require__(66);

	/** Used to match empty string literals in compiled template source */
	var reEmptyStringLeading = /\b__p \+= '';/g,
	    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	/**
	 * Used to match ES6 template delimiters
	 * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
	 */
	var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	/** Used to ensure capturing order of template delimiters */
	var reNoMatch = /($^)/;

	/** Used to match unescaped characters in compiled string literals */
	var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

	/**
	 * A micro-templating method that handles arbitrary delimiters, preserves
	 * whitespace, and correctly escapes quotes within interpolated code.
	 *
	 * Note: In the development build, `_.template` utilizes sourceURLs for easier
	 * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	 *
	 * For more information on precompiling templates see:
	 * http://lodash.com/custom-builds
	 *
	 * For more information on Chrome extension sandboxes see:
	 * http://developer.chrome.com/stable/extensions/sandboxingEval.html
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {string} text The template text.
	 * @param {Object} data The data object used to populate the text.
	 * @param {Object} [options] The options object.
	 * @param {RegExp} [options.escape] The "escape" delimiter.
	 * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	 * @param {Object} [options.imports] An object to import into the template as local variables.
	 * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	 * @param {string} [sourceURL] The sourceURL of the template's compiled source.
	 * @param {string} [variable] The data object variable name.
	 * @returns {Function|string} Returns a compiled function when no `data` object
	 *  is given, else it returns the interpolated text.
	 * @example
	 *
	 * // using the "interpolate" delimiter to create a compiled template
	 * var compiled = _.template('hello <%= name %>');
	 * compiled({ 'name': 'fred' });
	 * // => 'hello fred'
	 *
	 * // using the "escape" delimiter to escape HTML in data property values
	 * _.template('<b><%- value %></b>', { 'value': '<script>' });
	 * // => '<b>&lt;script&gt;</b>'
	 *
	 * // using the "evaluate" delimiter to generate HTML
	 * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
	 * _.template(list, { 'people': ['fred', 'barney'] });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	 * _.template('hello ${ name }', { 'name': 'pebbles' });
	 * // => 'hello pebbles'
	 *
	 * // using the internal `print` function in "evaluate" delimiters
	 * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
	 * // => 'hello barney!'
	 *
	 * // using a custom template delimiters
	 * _.templateSettings = {
	 *   'interpolate': /{{([\s\S]+?)}}/g
	 * };
	 *
	 * _.template('hello {{ name }}!', { 'name': 'mustache' });
	 * // => 'hello mustache!'
	 *
	 * // using the `imports` option to import jQuery
	 * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
	 * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // using the `sourceURL` option to specify a custom sourceURL for the template
	 * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
	 * compiled(data);
	 * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	 *
	 * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	 * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
	 * compiled.source;
	 * // => function(data) {
	 *   var __t, __p = '', __e = _.escape;
	 *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
	 *   return __p;
	 * }
	 *
	 * // using the `source` property to inline compiled templates for meaningful
	 * // line numbers in error messages and a stack trace
	 * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	 *   var JST = {\
	 *     "main": ' + _.template(mainText).source + '\
	 *   };\
	 * ');
	 */
	function template(text, data, options) {
	  // based on John Resig's `tmpl` implementation
	  // http://ejohn.org/blog/javascript-micro-templating/
	  // and Laura Doktorova's doT.js
	  // https://github.com/olado/doT
	  var settings = templateSettings.imports._.templateSettings || templateSettings;
	  text = String(text || '');

	  // avoid missing dependencies when `iteratorTemplate` is not defined
	  options = defaults({}, options, settings);

	  var imports = defaults({}, options.imports, settings.imports),
	      importsKeys = keys(imports),
	      importsValues = values(imports);

	  var isEvaluating,
	      index = 0,
	      interpolate = options.interpolate || reNoMatch,
	      source = "__p += '";

	  // compile the regexp to match each delimiter
	  var reDelimiters = RegExp(
	    (options.escape || reNoMatch).source + '|' +
	    interpolate.source + '|' +
	    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	    (options.evaluate || reNoMatch).source + '|$'
	  , 'g');

	  text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	    interpolateValue || (interpolateValue = esTemplateValue);

	    // escape characters that cannot be included in string literals
	    source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	    // replace delimiters with snippets
	    if (escapeValue) {
	      source += "' +\n__e(" + escapeValue + ") +\n'";
	    }
	    if (evaluateValue) {
	      isEvaluating = true;
	      source += "';\n" + evaluateValue + ";\n__p += '";
	    }
	    if (interpolateValue) {
	      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	    }
	    index = offset + match.length;

	    // the JS engine embedded in Adobe products requires returning the `match`
	    // string in order to produce the correct `offset` value
	    return match;
	  });

	  source += "';\n";

	  // if `variable` is not specified, wrap a with-statement around the generated
	  // code to add the data object to the top of the scope chain
	  var variable = options.variable,
	      hasVariable = variable;

	  if (!hasVariable) {
	    variable = 'obj';
	    source = 'with (' + variable + ') {\n' + source + '\n}\n';
	  }
	  // cleanup code by stripping empty strings
	  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	    .replace(reEmptyStringMiddle, '$1')
	    .replace(reEmptyStringTrailing, '$1;');

	  // frame code as the function body
	  source = 'function(' + variable + ') {\n' +
	    (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
	    "var __t, __p = '', __e = _.escape" +
	    (isEvaluating
	      ? ', __j = Array.prototype.join;\n' +
	        "function print() { __p += __j.call(arguments, '') }\n"
	      : ';\n'
	    ) +
	    source +
	    'return __p\n}';

	  try {
	    var result = Function(importsKeys, 'return ' + source ).apply(undefined, importsValues);
	  } catch(e) {
	    e.source = source;
	    throw e;
	  }
	  if (data) {
	    return result(data);
	  }
	  // provide the compiled function's source by its `toString` method, in
	  // supported environments, or the `source` property as a convenience for
	  // inlining compiled templates during the build process
	  result.source = source;
	  return result;
	}

	module.exports = template;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var keys = __webpack_require__(52),
	    objectTypes = __webpack_require__(44);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object for all destination properties that resolve to `undefined`. Once a
	 * property is set, additional defaults of the same property will be ignored.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Objects
	 * @param {Object} object The destination object.
	 * @param {...Object} [source] The source objects.
	 * @param- {Object} [guard] Allows working with `_.reduce` without using its
	 *  `key` and `object` arguments as sources.
	 * @returns {Object} Returns the destination object.
	 * @example
	 *
	 * var object = { 'name': 'barney' };
	 * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
	 * // => { 'name': 'barney', 'employer': 'slate' }
	 */
	var defaults = function(object, source, guard) {
	  var index, iterable = object, result = iterable;
	  if (!iterable) return result;
	  var args = arguments,
	      argsIndex = 0,
	      argsLength = typeof guard == 'number' ? 2 : args.length;
	  while (++argsIndex < argsLength) {
	    iterable = args[argsIndex];
	    if (iterable && objectTypes[typeof iterable]) {
	    var ownIndex = -1,
	        ownProps = objectTypes[typeof iterable] && keys(iterable),
	        length = ownProps ? ownProps.length : 0;

	    while (++ownIndex < length) {
	      index = ownProps[ownIndex];
	      if (typeof result[index] == 'undefined') result[index] = iterable[index];
	    }
	    }
	  }
	  return result
	};

	module.exports = defaults;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var escapeHtmlChar = __webpack_require__(60),
	    keys = __webpack_require__(52),
	    reUnescapedHtml = __webpack_require__(62);

	/**
	 * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
	 * corresponding HTML entities.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {string} string The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escape('Fred, Wilma, & Pebbles');
	 * // => 'Fred, Wilma, &amp; Pebbles'
	 */
	function escape(string) {
	  return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
	}

	module.exports = escape;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var htmlEscapes = __webpack_require__(61);

	/**
	 * Used by `escape` to convert characters to HTML entities.
	 *
	 * @private
	 * @param {string} match The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeHtmlChar(match) {
	  return htmlEscapes[match];
	}

	module.exports = escapeHtmlChar;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Used to convert characters to HTML entities:
	 *
	 * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	 * don't require escaping in HTML and have no special meaning unless they're part
	 * of a tag or an unquoted attribute value.
	 * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	 */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;'
	};

	module.exports = htmlEscapes;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var htmlEscapes = __webpack_require__(61),
	    keys = __webpack_require__(52);

	/** Used to match HTML entities and HTML characters */
	var reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

	module.exports = reUnescapedHtml;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to escape characters for inclusion in compiled string literals */
	var stringEscapes = {
	  '\\': '\\',
	  "'": "'",
	  '\n': 'n',
	  '\r': 'r',
	  '\t': 't',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};

	/**
	 * Used by `template` to escape characters for inclusion in compiled
	 * string literals.
	 *
	 * @private
	 * @param {string} match The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeStringChar(match) {
	  return '\\' + stringEscapes[match];
	}

	module.exports = escapeStringChar;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to match "interpolate" template delimiters */
	var reInterpolate = /<%=([\s\S]+?)%>/g;

	module.exports = reInterpolate;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var escape = __webpack_require__(59),
	    reInterpolate = __webpack_require__(64);

	/**
	 * By default, the template delimiters used by Lo-Dash are similar to those in
	 * embedded Ruby (ERB). Change the following template settings to use alternative
	 * delimiters.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var templateSettings = {

	  /**
	   * Used to detect `data` property values to be HTML-escaped.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'escape': /<%-([\s\S]+?)%>/g,

	  /**
	   * Used to detect code to be evaluated.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'evaluate': /<%([\s\S]+?)%>/g,

	  /**
	   * Used to detect `data` property values to inject.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'interpolate': reInterpolate,

	  /**
	   * Used to reference the data object in the template text.
	   *
	   * @memberOf _.templateSettings
	   * @type string
	   */
	  'variable': '',

	  /**
	   * Used to import variables into the compiled template.
	   *
	   * @memberOf _.templateSettings
	   * @type Object
	   */
	  'imports': {

	    /**
	     * A reference to the `lodash` function.
	     *
	     * @memberOf _.templateSettings.imports
	     * @type Function
	     */
	    '_': { 'escape': escape }
	  }
	};

	module.exports = templateSettings;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var keys = __webpack_require__(52);

	/**
	 * Creates an array composed of the own enumerable property values of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property values.
	 * @example
	 *
	 * _.values({ 'one': 1, 'two': 2, 'three': 3 });
	 * // => [1, 2, 3] (property order is not guaranteed across environments)
	 */
	function values(object) {
	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = object[props[index]];
	  }
	  return result;
	}

	module.exports = values;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to generate unique IDs */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {string} [prefix] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return String(prefix == null ? '' : prefix) + id;
	}

	module.exports = uniqueId;


/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";

	var drop_options = {
	  html: ['<div class="st-block__dropzone">', '<svg role="img" class="st-icon"><use xlink:href="<%= config.defaults.iconUrl %>#<%= _.result(block, "icon_name") %>"/></svg>', '<p><%= i18n.t("general:drop", { block: "<span>" + _.result(block, "title") + "</span>" }) %>', '</p></div>'].join('\n'),
	  re_render_on_reorder: false
	};

	var paste_options = {
	  html: ['<input type="text" placeholder="<%= i18n.t("general:paste") %>"', ' class="st-block__paste-input st-paste-block">'].join('')
	};

	var upload_options = {
	  html: ['<div class="st-block__upload-container">', '<input type="file" type="st-file-upload">', '<button class="st-upload-btn"><%= i18n.t("general:upload") %></button>', '</div>'].join('\n')
	};

	module.exports = {
	  debug: false,
	  scribeDebug: false,
	  skipValidation: false,
	  version: "0.4.0",
	  language: "en",

	  instances: [],

	  defaults: {
	    defaultType: false,
	    spinner: {
	      className: 'st-spinner',
	      lines: 9,
	      length: 8,
	      width: 3,
	      radius: 6,
	      color: '#000',
	      speed: 1.4,
	      trail: 57,
	      shadow: false,
	      left: '50%',
	      top: '50%'
	    },
	    Block: {
	      drop_options: drop_options,
	      paste_options: paste_options,
	      upload_options: upload_options
	    },
	    blockLimit: 0,
	    blockTypeLimits: {},
	    required: [],
	    uploadUrl: '/attachments',
	    baseImageUrl: '/sir-trevor-uploads/',
	    iconUrl: '../src/icons/sir-trevor-icons.svg',
	    errorsContainer: undefined,
	    convertFromMarkdown: true,
	    formatBar: {
	      commands: [{
	        name: "Bold",
	        title: "bold",
	        iconName: "fmt-bold",
	        cmd: "bold",
	        keyCode: 66,
	        text: "B"
	      }, {
	        name: "Italic",
	        title: "italic",
	        iconName: "fmt-italic",
	        cmd: "italic",
	        keyCode: 73,
	        text: "i"
	      }, {
	        name: "Link",
	        title: "link",
	        iconName: "fmt-link",
	        cmd: "linkPrompt",
	        text: "link"
	      }, {
	        name: "Unlink",
	        title: "unlink",
	        iconName: "fmt-unlink",
	        cmd: "unlink",
	        text: "link"
	      }, {
	        name: "Heading",
	        title: "heading",
	        iconName: "fmt-heading",
	        cmd: "heading",
	        text: "heading"
	      }, {
	        name: "Quote",
	        title: "quote",
	        iconName: "fmt-quote",
	        cmd: "quote",
	        text: "quote"
	      }]
	    },
	    ajaxOptions: {
	      headers: {}
	    }
	  }
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(70)['default'];

	var _Object$keys = __webpack_require__(30)['default'];

	var _ = __webpack_require__(34);

	// disabling undefined warnings until jshint can handle argument destructing

	var Dom = _Object$create(null);

	Dom.setAttributes = function (el) {
	  var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if (attributes.html) {
	    el.innerHTML = _.result(attributes, 'html');
	    delete attributes.html;
	  }

	  if (attributes.text) {
	    el.textContent = attributes.text;
	    delete attributes.text;
	  }

	  _Object$keys(attributes).forEach(function (key) {
	    el.setAttribute(key, attributes[key]);
	  });
	  return el;
	};

	Dom.createElement = function (tagName) {
	  var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var el = document.createElement(tagName);
	  Dom.setAttributes(el, attributes);
	  return el;
	};

	Dom.insertAfter = function (el, referenceNode) {
	  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
	};

	Dom.remove = function (el) {
	  if (el && el.parentNode) {
	    el.parentNode.removeChild(el);
	  }
	};

	Dom.replaceWith = function (el, referenceNode) {
	  Dom.remove(referenceNode);
	  el.outerHTML = referenceNode;
	};

	Dom.hide = function (el) {
	  el.style.display = 'none';
	};

	Dom.show = function (el) {
	  el.style.display = '';
	};

	Dom.matches = (function (proto) {
	  var matcher = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector || function (selector) {
	    var element = this;
	    var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
	    var i = 0;
	    while (matches[i] && matches[i] !== element) {
	      i++;
	    }
	    return matches[i] ? true : false;
	  };
	  return function (el, selector) {
	    return matcher.call(el, selector);
	  };
	})(Element.prototype);

	Dom.getClosest = function (elem, selector) {
	  for (elem; elem && elem !== document.body; elem = elem.parentNode) {
	    if (Dom.matches(elem, selector)) {
	      break;
	    }
	  }
	  return elem;
	};

	Dom.wrap = function (toWrap, wrapper) {
	  wrapper = wrapper || document.createElement('div');
	  if (toWrap.nextSibling) {
	    toWrap.parentNode.insertBefore(wrapper, toWrap.nextSibling);
	  } else {
	    toWrap.parentNode.appendChild(wrapper);
	  }
	  return wrapper.appendChild(toWrap);
	};

	Dom.createDocumentFragmentFromString = function (html) {
	  var frag = document.createDocumentFragment();
	  var elem = document.createElement('div');
	  elem.innerHTML = html;

	  while (elem.childNodes[0]) {
	    frag.appendChild(elem.childNodes[0]);
	  }
	  return frag;
	};

	module.exports = Dom;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$keys = __webpack_require__(30)['default'];

	var _ = __webpack_require__(34);
	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);

	var Locales = {
	  en: {
	    general: {
	      'delete': 'Delete?',
	      'drop': 'Drag __block__ here',
	      'paste': 'Or paste URL here',
	      'upload': '...or choose a file',
	      'close': 'close',
	      'position': 'Position',
	      'wait': 'Please wait...',
	      'link': 'Enter a link',
	      'yes': 'Yes',
	      'no': 'No'
	    },
	    errors: {
	      'title': "You have the following errors:",
	      'validation_fail': "__type__ block is invalid",
	      'block_empty': "__name__ must not be empty",
	      'type_missing': "You must have a block of type __type__",
	      'required_type_empty': "A required block type __type__ is empty",
	      'load_fail': "There was a problem loading the contents of the document"
	    },
	    blocks: {
	      text: {
	        'title': "Text"
	      },
	      list: {
	        'title': "List"
	      },
	      quote: {
	        'title': "Quote",
	        'credit_field': "Credit"
	      },
	      image: {
	        'title': "Image",
	        'upload_error': "There was a problem with your upload"
	      },
	      video: {
	        'title': "Video"
	      },
	      tweet: {
	        'title': "Tweet",
	        'fetch_error': "There was a problem fetching your tweet"
	      },
	      embedly: {
	        'title': "Embedly",
	        'fetch_error': "There was a problem fetching your embed",
	        'key_missing': "An Embedly API key must be present"
	      },
	      heading: {
	        'title': "Heading"
	      }
	    }
	  }
	};

	if (window.i18n === undefined) {
	  // Minimal i18n stub that only reads the English strings
	  utils.log("Using i18n stub");
	  window.i18n = {
	    t: function t(key, options) {
	      var parts = key.split(':'),
	          str,
	          obj,
	          part,
	          i;

	      obj = Locales[config.language];

	      for (i = 0; i < parts.length; i++) {
	        part = parts[i];

	        if (!_.isUndefined(obj[part])) {
	          obj = obj[part];
	        }
	      }

	      str = obj;

	      if (!_.isString(str)) {
	        return "";
	      }

	      if (str.indexOf('__') >= 0) {
	        _Object$keys(options).forEach(function (opt) {
	          str = str.replace('__' + opt + '__', options[opt]);
	        });
	      }

	      return str;
	    }
	  };
	} else {
	  utils.log("Using i18next");
	  // Only use i18next when the library has been loaded by the user, keeps
	  // dependencies slim
	  i18n.init({ resStore: Locales, fallbackLng: config.language,
	    ns: { namespaces: ['general', 'blocks'], defaultNs: 'general' }
	  });
	}

	module.exports = Locales;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(74);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    // AMD. Register as a module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return (root.Eventable = factory());
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined') {
	    // Node. Does not work with strict CommonJS, but only CommonJS-like
	    // enviroments that support module.exports, like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals
	    root.Eventable = factory();
	  }
	}(this, function() {

	  // Copy and pasted straight out of Backbone 1.0.0
	  // We'll try and keep this updated to the latest

	  var array = [];
	  var slice = array.slice;

	  function once(func) {
	    var memo, times = 2;

	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      } else {
	        func = null;
	      }
	      return memo;
	    };
	  }

	  // Backbone.Events
	  // ---------------

	  // A module that can be mixed in to *any object* in order to provide it with
	  // custom events. You may bind with `on` or remove with `off` callback
	  // functions to an event; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Eventable = {

	    // Bind an event to a `callback` function. Passing `"all"` will bind
	    // the callback to all events fired.
	    on: function(name, callback, context) {
	      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	      this._events || (this._events = {});
	      var events = this._events[name] || (this._events[name] = []);
	      events.push({callback: callback, context: context, ctx: context || this});
	      return this;
	    },

	    // Bind an event to only be triggered a single time. After the first time
	    // the callback is invoked, it will be removed.
	    once: function(name, callback, context) {
	      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
	      var self = this;
	      var func = once(function() {
	        self.off(name, func);
	        callback.apply(this, arguments);
	      });
	      func._callback = callback;
	      return this.on(name, func, context);
	    },

	    // Remove one or many callbacks. If `context` is null, removes all
	    // callbacks with that function. If `callback` is null, removes all
	    // callbacks for the event. If `name` is null, removes all bound
	    // callbacks for all events.
	    off: function(name, callback, context) {
	      var retain, ev, events, names, i, l, j, k;
	      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
	      if (!name && !callback && !context) {
	        this._events = {};
	        return this;
	      }

	      names = name ? [name] : Object.keys(this._events);
	      for (i = 0, l = names.length; i < l; i++) {
	        name = names[i];
	        if (events = this._events[name]) {
	          this._events[name] = retain = [];
	          if (callback || context) {
	            for (j = 0, k = events.length; j < k; j++) {
	              ev = events[j];
	              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
	                  (context && context !== ev.context)) {
	                retain.push(ev);
	              }
	            }
	          }
	          if (!retain.length) delete this._events[name];
	        }
	      }

	      return this;
	    },

	    // Trigger one or many events, firing all bound callbacks. Callbacks are
	    // passed the same arguments as `trigger` is, apart from the event name
	    // (unless you're listening on `"all"`, which will cause your callback to
	    // receive the true name of the event as the first argument).
	    trigger: function(name) {
	      if (!this._events) return this;
	      var args = slice.call(arguments, 1);
	      if (!eventsApi(this, 'trigger', name, args)) return this;
	      var events = this._events[name];
	      var allEvents = this._events.all;
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, arguments);
	      return this;
	    },

	    // Tell this object to stop listening to either specific events ... or
	    // to every object it's currently listening to.
	    stopListening: function(obj, name, callback) {
	      var listeners = this._listeners;
	      if (!listeners) return this;
	      var deleteListener = !name && !callback;
	      if (typeof name === 'object') callback = this;
	      if (obj) (listeners = {})[obj._listenerId] = obj;
	      for (var id in listeners) {
	        listeners[id].off(name, callback, this);
	        if (deleteListener) delete this._listeners[id];
	      }
	      return this;
	    }

	  };

	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;

	  // Implement fancy features of the Events API such as multiple event
	  // names `"change blur"` and jQuery-style event maps `{change: action}`
	  // in terms of the existing API.
	  var eventsApi = function(obj, action, name, rest) {
	    if (!name) return true;

	    // Handle event maps.
	    if (typeof name === 'object') {
	      for (var key in name) {
	        obj[action].apply(obj, [key, name[key]].concat(rest));
	      }
	      return false;
	    }

	    // Handle space separated event names.
	    if (eventSplitter.test(name)) {
	      var names = name.split(eventSplitter);
	      for (var i = 0, l = names.length; i < l; i++) {
	        obj[action].apply(obj, [names[i]].concat(rest));
	      }
	      return false;
	    }

	    return true;
	  };

	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
	    }
	  };

	  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

	  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
	  // listen to an event in another object ... keeping track of what it's
	  // listening to.
	  function addListenMethod(method, implementation) {
	    Eventable[method] = function(obj, name, callback) {
	      var listeners = this._listeners || (this._listeners = {});
	      var id = obj._listenerId || (obj._listenerId = (new Date()).getTime());
	      listeners[id] = obj;
	      if (typeof name === 'object') callback = this;
	      obj[implementation](name, callback, this);
	      return this;
	    };
	  }

	  addListenMethod('listenTo', 'on');
	  addListenMethod('listenToOnce', 'once');

	  // Aliases for backwards compatibility.
	  Eventable.bind   = Eventable.on;
	  Eventable.unbind = Eventable.off;

	  return Eventable;

	}));


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)["default"];

	module.exports = _Object$assign({}, __webpack_require__(73));

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * Sir Trevor Editor Store
	 * By default we store the complete data on the instances $el
	 * We can easily extend this and store it on some server or something
	 */

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);

	var EditorStore = function EditorStore(data, mediator) {
	  this.mediator = mediator;
	  this.initialize(data ? data.trim() : '');
	};

	_Object$assign(EditorStore.prototype, {

	  initialize: function initialize(data) {
	    this.store = this._parseData(data) || { data: [] };
	  },

	  retrieve: function retrieve() {
	    return this.store;
	  },

	  toString: function toString(space) {
	    return JSON.stringify(this.store, undefined, space);
	  },

	  reset: function reset() {
	    utils.log("Resetting the EditorStore");
	    this.store = { data: [] };
	  },

	  addData: function addData(data) {
	    this.store.data.push(data);
	    return this.store;
	  },

	  _parseData: function _parseData(data) {
	    var result;

	    if (data.length === 0) {
	      return result;
	    }

	    try {
	      // Ensure the JSON string has a data element that's an array
	      var jsonStr = JSON.parse(data);
	      if (!_.isUndefined(jsonStr.data)) {
	        result = jsonStr;
	      }
	    } catch (e) {
	      this.mediator.trigger('errors:add', { text: i18n.t("errors:load_fail") });

	      this.mediator.trigger('errors:render');

	      console.log('Sorry there has been a problem with parsing the JSON');
	      console.log(e);
	    }

	    return result;
	  }

	});

	module.exports = EditorStore;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * SirTrevor.Submittable
	 * --
	 * We need a global way of setting if the editor can and can't be submitted,
	 * and a way to disable the submit button and add messages (when appropriate)
	 * We also need this to be highly extensible so it can be overridden.
	 * This will be triggered *by anything* so it needs to subscribe to events.
	 */

	var _Object$assign = __webpack_require__(2)['default'];

	var _Object$keys = __webpack_require__(30)['default'];

	var utils = __webpack_require__(29);

	var EventBus = __webpack_require__(75);

	var Submittable = function Submittable(form) {
	  this.form = form;
	  this.initialize();
	};

	_Object$assign(Submittable.prototype, {

	  initialize: function initialize() {
	    this.submitBtns = this.form.querySelectorAll("input[type='submit']");

	    var btnTitles = [];

	    Array.prototype.forEach.call(this.submitBtns, function (btn, i) {
	      btnTitles.push(btn.getAttribute('value'));
	    });

	    this.submitBtnTitles = btnTitles;
	    this.canSubmit = true;
	    this.globalUploadCount = 0;
	    this._bindEvents();
	  },

	  setSubmitButton: function setSubmitButton(e, message) {
	    Array.prototype.forEach.call(this.submitBtns, function (btn, i) {
	      btn.setAttribute('value', message);
	    });
	  },

	  resetSubmitButton: function resetSubmitButton() {
	    var titles = this.submitBtnTitles;
	    Array.prototype.forEach.call(this.submitBtns, function (item, index) {
	      item.setAttribute('value', titles[index]);
	    });
	  },

	  onUploadStart: function onUploadStart(e) {
	    this.globalUploadCount++;
	    utils.log('onUploadStart called ' + this.globalUploadCount);

	    if (this.globalUploadCount === 1) {
	      this._disableSubmitButton();
	    }
	  },

	  onUploadStop: function onUploadStop(e) {
	    this.globalUploadCount = this.globalUploadCount <= 0 ? 0 : this.globalUploadCount - 1;

	    utils.log('onUploadStop called ' + this.globalUploadCount);

	    if (this.globalUploadCount === 0) {
	      this._enableSubmitButton();
	    }
	  },

	  onError: function onError(e) {
	    utils.log('onError called');
	    this.canSubmit = false;
	  },

	  _disableSubmitButton: function _disableSubmitButton(message) {
	    this.setSubmitButton(null, message || i18n.t("general:wait"));
	    Array.prototype.forEach.call(this.submitBtns, function (btn, i) {
	      btn.setAttribute('disabled', 'disabled');
	      btn.classList.add('disabled');
	    });
	  },

	  _enableSubmitButton: function _enableSubmitButton() {
	    this.resetSubmitButton();
	    Array.prototype.forEach.call(this.submitBtns, function (btn, i) {
	      btn.removeAttribute('disabled');
	      btn.classList.remove('disabled');
	    });
	  },

	  _events: {
	    "disableSubmitButton": "_disableSubmitButton",
	    "enableSubmitButton": "_enableSubmitButton",
	    "setSubmitButton": "setSubmitButton",
	    "resetSubmitButton": "resetSubmitButton",
	    "onError": "onError",
	    "onUploadStart": "onUploadStart",
	    "onUploadStop": "onUploadStop"
	  },

	  _bindEvents: function _bindEvents() {
	    _Object$keys(this._events).forEach(function (type) {
	      EventBus.on(type, this[this._events[type]], this);
	    }, this);
	  }

	});

	module.exports = Submittable;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	*   Sir Trevor Uploader
	*   Generic Upload implementation that can be extended for blocks
	*/

	var _ = __webpack_require__(34);
	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);
	var Ajax = __webpack_require__(79);

	var EventBus = __webpack_require__(75);

	module.exports = function (block, file, success, error) {

	  EventBus.trigger('onUploadStart');

	  var uid = [block.blockID, new Date().getTime(), 'raw'].join('-');
	  var data = new FormData();

	  data.append('attachment[name]', file.name);
	  data.append('attachment[file]', file);
	  data.append('attachment[uid]', uid);

	  block.resetMessages();

	  var callbackSuccess = function callbackSuccess(data) {
	    utils.log('Upload callback called');
	    EventBus.trigger('onUploadStop', data);

	    if (!_.isUndefined(success) && _.isFunction(success)) {
	      success.apply(block, arguments, data);
	    }

	    block.removeQueuedItem(uid);
	  };

	  var callbackError = function callbackError(jqXHR, status, errorThrown) {
	    utils.log('Upload callback error called');
	    EventBus.trigger('onUploadStop', undefined, errorThrown, status, jqXHR);

	    if (!_.isUndefined(error) && _.isFunction(error)) {
	      error.call(block, status);
	    }

	    block.removeQueuedItem(uid);
	  };

	  var url = block.uploadUrl || config.defaults.uploadUrl;

	  var xhr = Ajax.fetch(url, {
	    body: data,
	    method: 'POST',
	    dataType: 'json'
	  });

	  block.addQueuedItem(uid, xhr);

	  xhr.then(callbackSuccess)['catch'](callbackError);

	  return xhr;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(70)['default'];

	var _Object$assign = __webpack_require__(2)['default'];

	__webpack_require__(80);
	var fetchJsonP = __webpack_require__(81);
	var cancellablePromise = __webpack_require__(82);
	var config = __webpack_require__(68);

	var Ajax = _Object$create(null);

	Ajax.fetch = function (url) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  options = _Object$assign({}, config.defaults.ajaxOptions, options);

	  var promise;
	  if (options.jsonp) {
	    promise = fetchJsonP(url).promise;
	  } else {
	    promise = fetch(url, options).then(function (response) {
	      if (options.dataType === 'json') {
	        return response.json();
	      }
	      return response.text();
	    });
	  }
	  return cancellablePromise(promise);
	};

	module.exports = Ajax;

/***/ },
/* 80 */
/***/ function(module, exports) {

	(function() {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = name.toString();
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = value.toString();
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(url, options) {
	    options = options || {}
	    this.url = url

	    this.credentials = options.credentials || 'omit'
	    this.headers = new Headers(options.headers)
	    this.method = normalizeMethod(options.method || 'GET')
	    this.mode = options.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(options.body)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.url = null
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }

	  Body.call(Response.prototype)

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    // TODO: Request constructor should accept input, init
	    var request
	    if (Request.prototype.isPrototypeOf(input) && !init) {
	      request = input
	    } else {
	      request = new Request(input, init)
	    }

	    return new Promise(function(resolve, reject) {
	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * MIT license
	 */

	// Callback index.
	var count = 0;

	/**
	 * JSONP handler
	 *
	 * Options:
	 * - prefix {String} callback prefix (defaults to `__jp`)
	 * - param {String} qs parameter (defaults to `callback`)
	 * - timeout {Number} how long after the request until a timeout error
	 *   is emitted (defaults to `15000`)
	 *
	 * @param {String} url
	 * @param {Object} options optional options
	 * @return {Object} Returns a response promise and a cancel handler.
	 */
	var jsonp = function(url, options) {
	    options = options || {};

	    var prefix = options.prefix || '__jp';
	    var param = options.param || 'callback';
	    var timeout = options.timeout ? options.timeout : 15000;
	    var target = document.getElementsByTagName('script')[0] || document.head;
	    var script;
	    var timer;
	    var cleanup;
	    var cancel;
	    var promise;
	    var noop = function() {};

	    // Generate a unique id for the request.
	    var id = prefix + (count++);

	    cleanup = function() {
	        // Remove the script tag.
	        if (script && script.parentNode) {
	            script.parentNode.removeChild(script);
	        }

	        window[id] = noop;

	        if (timer) {
	            clearTimeout(timer);
	        }
	    };

	    promise = new Promise(function(resolve, reject) {
	        if (timeout) {
	            timer = setTimeout(function() {
	                cleanup();
	                reject(new Error('Timeout'));
	            }, timeout);
	        }

	        window[id] = function(data) {
	            cleanup();
	            resolve(data);
	        };

	        // Add querystring component
	        url += (~url.indexOf('?') ? '&' : '?') + param + '=' + encodeURIComponent(id);
	        url = url.replace('?&', '?');

	        // Create script.
	        script = document.createElement('script');
	        script.src = url;
	        target.parentNode.insertBefore(script, target);

	        cancel = function() {
	            if (window[id]) {
	                cleanup();
	                reject(new Error('Canceled'));
	            }
	        };

	    });

	    return {
	        promise: promise,
	        cancel: cancel
	    };
	};

	module.exports = jsonp;



/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Promise = __webpack_require__(83)["default"];

	var cancellablePromise = function cancellablePromise(promise) {
	  var resolve, reject;

	  var proxyPromise = new _Promise(function (res, rej) {
	    resolve = res;
	    reject = rej;
	  });

	  promise.then(function (value) {
	    if (!proxyPromise.cancelled) {
	      resolve(value);
	    }
	  }, function (value) {
	    if (!proxyPromise.cancelled) {
	      reject(value);
	    }
	  });

	  proxyPromise.cancel = function () {
	    this.cancelled = true;
	  };

	  return proxyPromise;
	};

	module.exports = cancellablePromise;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(85);
	__webpack_require__(86);
	__webpack_require__(102);
	__webpack_require__(107);
	module.exports = __webpack_require__(7).Promise;

/***/ },
/* 85 */
/***/ function(module, exports) {

	

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(87)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(89)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(88)
	  , defined   = __webpack_require__(13);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 88 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(90)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(91)
	  , hide           = __webpack_require__(92)
	  , has            = __webpack_require__(95)
	  , Iterators      = __webpack_require__(96)
	  , $iterCreate    = __webpack_require__(97)
	  , setToStringTag = __webpack_require__(98)
	  , getProto       = __webpack_require__(11).getProto
	  , ITERATOR       = __webpack_require__(99)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(92);

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(11)
	  , createDesc = __webpack_require__(93);
	module.exports = __webpack_require__(94) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 95 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(11)
	  , descriptor     = __webpack_require__(93)
	  , setToStringTag = __webpack_require__(98)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(92)(IteratorPrototype, __webpack_require__(99)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).setDesc
	  , has = __webpack_require__(95)
	  , TAG = __webpack_require__(99)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(100)('wks')
	  , uid    = __webpack_require__(101)
	  , Symbol = __webpack_require__(6).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(103);
	var Iterators = __webpack_require__(96);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(104)
	  , step             = __webpack_require__(105)
	  , Iterators        = __webpack_require__(96)
	  , toIObject        = __webpack_require__(106);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(89)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(14)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(11)
	  , LIBRARY    = __webpack_require__(90)
	  , global     = __webpack_require__(6)
	  , ctx        = __webpack_require__(8)
	  , classof    = __webpack_require__(108)
	  , $export    = __webpack_require__(5)
	  , isObject   = __webpack_require__(109)
	  , anObject   = __webpack_require__(110)
	  , aFunction  = __webpack_require__(9)
	  , strictNew  = __webpack_require__(111)
	  , forOf      = __webpack_require__(112)
	  , setProto   = __webpack_require__(117).set
	  , same       = __webpack_require__(118)
	  , SPECIES    = __webpack_require__(99)('species')
	  , speciesConstructor = __webpack_require__(119)
	  , asap       = __webpack_require__(120)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;

	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};

	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(94)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(125)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(98)(P, PROMISE);
	__webpack_require__(126)(PROMISE);
	Wrapper = __webpack_require__(7)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(127)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(15)
	  , TAG = __webpack_require__(99)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(109);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(8)
	  , call        = __webpack_require__(113)
	  , isArrayIter = __webpack_require__(114)
	  , anObject    = __webpack_require__(110)
	  , toLength    = __webpack_require__(115)
	  , getIterFn   = __webpack_require__(116);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(110);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(96)
	  , ITERATOR   = __webpack_require__(99)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(88)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(108)
	  , ITERATOR  = __webpack_require__(99)('iterator')
	  , Iterators = __webpack_require__(96);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(11).getDesc
	  , isObject = __webpack_require__(109)
	  , anObject = __webpack_require__(110);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(8)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 118 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(110)
	  , aFunction = __webpack_require__(9)
	  , SPECIES   = __webpack_require__(99)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , macrotask = __webpack_require__(121).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(15)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(8)
	  , invoke             = __webpack_require__(122)
	  , html               = __webpack_require__(123)
	  , cel                = __webpack_require__(124)
	  , global             = __webpack_require__(6)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(15)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 122 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(109)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(91);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(7)
	  , $           = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(94)
	  , SPECIES     = __webpack_require__(99)('species');

	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(99)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  Ajaxable: __webpack_require__(129),
	  Controllable: __webpack_require__(130),
	  Droppable: __webpack_require__(132),
	  Fetchable: __webpack_require__(134),
	  Pastable: __webpack_require__(135),
	  Uploadable: __webpack_require__(136),
	  MultiEditable: __webpack_require__(137),
	  Textable: __webpack_require__(229)
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils = __webpack_require__(29);

	module.exports = {

	  mixinName: "Ajaxable",

	  ajaxable: true,

	  initializeAjaxable: function initializeAjaxable() {
	    this._queued = [];
	  },

	  addQueuedItem: function addQueuedItem(name, deferred) {
	    utils.log("Adding queued item for " + this.blockID + " called " + name);

	    this._queued.push({ name: name, deferred: deferred });
	  },

	  removeQueuedItem: function removeQueuedItem(name) {
	    utils.log("Removing queued item for " + this.blockID + " called " + name);

	    this._queued = this._queued.filter(function (queued) {
	      return queued.name !== name;
	    });
	  },

	  hasItemsInQueue: function hasItemsInQueue() {
	    return this._queued.length > 0;
	  },

	  resolveAllInQueue: function resolveAllInQueue() {
	    this._queued.forEach(function (item) {
	      utils.log("Aborting queued request: " + item.name);
	      item.deferred.cancel();
	    }, this);
	  }

	};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$keys = __webpack_require__(30)['default'];

	var utils = __webpack_require__(29);
	var config = __webpack_require__(68);
	var Dom = __webpack_require__(69);
	var Events = __webpack_require__(131);

	module.exports = {

	  mixinName: "Controllable",

	  initializeControllable: function initializeControllable() {
	    utils.log("Adding controllable to block " + this.blockID);
	    this.control_ui = Dom.createElement('div', { 'class': 'st-block__control-ui' });
	    _Object$keys(this.controls).forEach(function (cmd) {
	      // Bind configured handler to current block context
	      this.addUiControl(cmd, this.controls[cmd].bind(this));
	    }, this);
	    this.inner.appendChild(this.control_ui);
	  },

	  getControlTemplate: function getControlTemplate(cmd) {
	    return Dom.createElement("a", {
	      'data-icon': cmd,
	      'class': 'st-icon st-block-control-ui-btn st-block-control-ui-btn--' + cmd,
	      'html': '<svg role="img" class="st-icon">\n                  <use xlink:href="' + config.defaults.iconUrl + '#' + cmd + '"/>\n                </svg>'
	    });
	  },

	  addUiControl: function addUiControl(cmd, handler) {
	    this.control_ui.appendChild(this.getControlTemplate(cmd));
	    Events.delegate(this.control_ui, '.st-block-control-ui-btn--' + cmd, 'click', handler);
	  }
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Dom = __webpack_require__(69);

	var fixEvent = function fixEvent(e, target) {
	  var obj = {};

	  // Events don't work as normal objects, so need to copy properties directly.
	  // List and matchers taken from jQuery.Event.fix.
	  // For other properties refer to the originalEvent object.

	  var props = {
	    shared: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
	    mouseEvent: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
	    keyEvent: "char charCode key keyCode".split(" ")
	  };

	  var rkeyEvent = /^key/,
	      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;

	  var propsToCopy = rmouseEvent.test(e.type) ? props.shared.concat(props.mouseEvent) : rkeyEvent.test(e.type) ? props.shared.concat(props.keyEvent) : props.shared;

	  var prop;
	  for (var i = 0; i < propsToCopy.length; i++) {
	    prop = propsToCopy[i];
	    obj[prop] = e[prop];
	  }

	  obj.currentTarget = target;
	  obj.originalEvent = e;

	  obj.preventDefault = function () {
	    if (this.originalEvent) {
	      this.originalEvent.preventDefault();
	    }
	  };

	  obj.stopPropagation = function () {
	    if (this.originalEvent) {
	      this.originalEvent.stopPropagation();
	    }
	  };

	  return obj;
	};

	module.exports.delegate = function delegate(el, selector, event, fn) {
	  var useCapture = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	  el.addEventListener(event, function (e) {
	    var target = e.target;
	    for (target; target && target !== el; target = target.parentNode) {
	      if (Dom.matches(target, selector)) {
	        fn.call(target, fixEvent(e, target));
	        break;
	      }
	    }
	    target = null;
	  }, useCapture);
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* Adds drop functionaltiy to this block */

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);
	var Dom = __webpack_require__(69);

	var dropEvents = __webpack_require__(133);

	var EventBus = __webpack_require__(75);

	module.exports = {

	  mixinName: "Droppable",
	  valid_drop_file_types: ['File', 'Files', 'text/plain', 'text/uri-list'],
	  requireInputs: true,

	  initializeDroppable: function initializeDroppable() {
	    utils.log("Adding droppable to block " + this.blockID);

	    this.drop_options = _Object$assign({}, config.defaults.Block.drop_options, this.drop_options);

	    Dom.hide(this.editor);

	    this.inputs.insertAdjacentHTML("beforeend", _.template(this.drop_options.html, { block: this, _: _, config: config }));

	    // Bind our drop event
	    dropEvents.dropArea(this.inputs.lastElementChild).addEventListener('drop', this._handleDrop.bind(this));

	    this.el.classList.add('st-block--droppable');
	    this.inner.classList.add('st-block__inner--droppable');

	    this._setupKeyEvents();
	  },

	  _handleDrop: function _handleDrop(e) {
	    e.preventDefault();
	    e.stopPropagation();

	    var el = e.target,
	        types = [].slice.call(e.dataTransfer.types);

	    el.classList.remove('st-dropzone--dragover');

	    /*
	      Check the type we just received,
	      delegate it away to our blockTypes to process
	    */

	    if (types && types.some(function (type) {
	      return this.valid_drop_file_types.includes(type);
	    }, this)) {
	      this.onDrop(e.dataTransfer);
	    }

	    EventBus.trigger('block:content:dropped', this.blockID);
	  },

	  focus: function focus() {
	    this.inner.focus();
	  },

	  /**
	    Allow this block to be managed with the keyboard
	  **/

	  _setupKeyEvents: function _setupKeyEvents() {
	    var _this = this;

	    this.inner.setAttribute('tabindex', 0);
	    this.inner.addEventListener('keyup', function (e) {
	      if (e.target !== _this.inner) {
	        return;
	      }

	      switch (e.keyCode) {
	        case 13:
	          _this.mediator.trigger("block:create", 'Text', null, _this.el);
	          break;
	        case 8:
	          _this.onDeleteClick.call(_this, new Event('click'));
	          return;
	      }
	    });
	  }
	};

/***/ },
/* 133 */
/***/ function(module, exports) {

	"use strict";

	function dragEnter(e) {
	  e.preventDefault();
	  e.stopPropagation();
	}

	function dragOver(e) {
	  e.dataTransfer.dropEffect = "copy";
	  e.currentTarget.classList.add('st-drag-over');
	  e.preventDefault();
	  e.stopPropagation();
	}

	function dragLeave(e) {
	  e.currentTarget.classList.remove('st-drag-over');
	  e.preventDefault();
	  e.stopPropagation();
	}

	module.exports = {

	  dropArea: function dropArea(el) {
	    el.addEventListener("dragenter", dragEnter);
	    el.addEventListener("dragover", dragOver);
	    el.addEventListener("dragleave", dragLeave);
	    return el;
	  },

	  noDropArea: function noDropArea(el) {
	    el.removeEventListener("dragenter");
	    el.removeEventListener("dragover");
	    el.removeEventListener("dragleave");
	    return el;
	  }

	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);
	var Ajax = __webpack_require__(79);

	module.exports = {

	  mixinName: "Fetchable",

	  initializeFetchable: function initializeFetchable() {
	    this.withMixin(__webpack_require__(129));
	  },

	  fetch: function fetch(url, options, success, failure) {
	    var uid = _.uniqueId(this.blockID + "_fetch"),
	        xhr = Ajax.fetch(url, options);

	    this.resetMessages();
	    this.addQueuedItem(uid, xhr);

	    function alwaysFunc(func, arg) {
	      /*jshint validthis: true */
	      func.call(this, arg);
	      this.removeQueuedItem(uid);
	    }

	    if (!_.isUndefined(success)) {
	      xhr.then(alwaysFunc.bind(this, success));
	    }

	    if (!_.isUndefined(failure)) {
	      xhr['catch'](alwaysFunc.bind(this, failure));
	    }

	    return xhr;
	  }

	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);

	module.exports = {

	  mixinName: "Pastable",
	  requireInputs: true,

	  initializePastable: function initializePastable() {
	    var _this = this;

	    utils.log("Adding pastable to block " + this.blockID);

	    this.paste_options = _Object$assign({}, config.defaults.Block.paste_options, this.paste_options);

	    this.inputs.insertAdjacentHTML("beforeend", _.template(this.paste_options.html, this));

	    Array.prototype.forEach.call(this.$('.st-paste-block'), function (el) {
	      el.addEventListener('click', function () {
	        var event = document.createEvent('HTMLEvents');
	        event.initEvent('select', true, false);
	        this.dispatchEvent(event);
	      });
	      el.addEventListener('paste', _this._handleContentPaste);
	      el.addEventListener('submit', _this._handleContentPaste);
	    });
	  }

	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);

	var fileUploader = __webpack_require__(78);

	module.exports = {

	  mixinName: "Uploadable",

	  uploadsCount: 0,
	  requireInputs: true,

	  initializeUploadable: function initializeUploadable() {
	    utils.log("Adding uploadable to block " + this.blockID);
	    this.withMixin(__webpack_require__(129));

	    this.upload_options = _Object$assign({}, config.defaults.Block.upload_options, this.upload_options);
	    this.inputs.insertAdjacentHTML("beforeend", _.template(this.upload_options.html, this));

	    Array.prototype.forEach.call(this.inputs.querySelectorAll('button'), function (button) {
	      button.addEventListener('click', function (ev) {
	        ev.preventDefault();
	      });
	    });
	    Array.prototype.forEach.call(this.inputs.querySelectorAll('input'), (function (input) {
	      input.addEventListener('change', (function (ev) {
	        this.onDrop(ev.currentTarget);
	      }).bind(this));
	    }).bind(this));
	  },

	  uploader: function uploader(file, success, failure) {
	    return fileUploader(this, file, success, failure);
	  }

	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);
	var ScribeInterface = __webpack_require__(138);

	module.exports = {
	  mixinName: 'MultiEditable',

	  initializeMultiEditable: function initializeMultiEditable() {
	    this.editors = {};
	  },

	  newTextEditor: function newTextEditor(template, content) {
	    // render template outside of dom
	    var wrapper = document.createElement('div');
	    wrapper.innerHTML = template;

	    var editor = wrapper.querySelector('.st-block__editor');
	    var id = _.uniqueId('editor-');
	    editor.dataset.editorId = id;
	    editor.addEventListener('keyup', this.getSelectionForFormatter);
	    editor.addEventListener('mouseup', this.getSelectionForFormatter);

	    var configureScribe = _.isFunction(this.configureScribe) ? this.configureScribe.bind(this) : null;
	    var scribe = ScribeInterface.initScribeInstance(editor, this.scribeOptions, configureScribe);

	    scribe.setContent(content);

	    var editorObject = {
	      node: wrapper.removeChild(wrapper.firstChild),
	      el: editor,
	      scribe: scribe,
	      id: id
	    };

	    this.editors[id] = editorObject;

	    return editorObject;
	  },

	  getCurrentTextEditor: function getCurrentTextEditor() {
	    var id = document.activeElement.dataset.editorId;
	    var editor = this.getTextEditor(id);

	    if (editor) {
	      this.currentEditor = editor;
	    }

	    return this.currentEditor;
	  },

	  appendToTextEditor: function appendToTextEditor(id, content) {
	    var scribe = this.getTextEditor(id).scribe;
	    var selection = new scribe.api.Selection();
	    var range = selection.range.cloneRange();
	    var lastChild = scribe.el.lastChild;
	    range.setStartAfter(lastChild);
	    range.collapse(true);
	    selection.selection.removeAllRanges();
	    selection.selection.addRange(range);

	    if (content) {
	      scribe.insertHTML(content);
	    }
	  },

	  getCurrentScribeInstance: function getCurrentScribeInstance() {
	    return this.getCurrentTextEditor().scribe;
	  },

	  getTextEditor: function getTextEditor(id) {
	    return this.editors[id];
	  },

	  removeTextEditor: function removeTextEditor(id) {
	    delete this.editors[id];
	  },

	  // scribe commands for FormatBar
	  execTextBlockCommand: function execTextBlockCommand(cmdName) {
	    return ScribeInterface.execTextBlockCommand(this.getCurrentScribeInstance(), cmdName);
	  },

	  queryTextBlockCommandState: function queryTextBlockCommandState(cmdName) {
	    return ScribeInterface.queryTextBlockCommandState(this.getCurrentScribeInstance(), cmdName);
	  }
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var Scribe = __webpack_require__(139);
	var config = __webpack_require__(68);

	var scribePluginFormatterPlainTextConvertNewLinesToHTML = __webpack_require__(206);
	var scribePluginLinkPromptCommand = __webpack_require__(207);
	var scribePluginSanitizer = __webpack_require__(208);

	var sanitizeDefaults = {
	  p: true,
	  a: {
	    href: true,
	    target: '_blank',
	    rel: true
	  },
	  i: true,
	  b: true,
	  strong: true,
	  em: true
	};

	module.exports = {

	  initScribeInstance: function initScribeInstance(el, scribeOptions, configureScribe) {

	    scribeOptions = scribeOptions || {};

	    var scribeConfig = { debug: config.scribeDebug };
	    var tags = sanitizeDefaults;

	    if (_.isObject(scribeOptions)) {
	      scribeConfig = _Object$assign(scribeConfig, scribeOptions);
	    }

	    var scribe = new Scribe(el, scribeConfig);

	    if (scribeOptions.hasOwnProperty("tags")) {
	      tags = _Object$assign(sanitizeDefaults, scribeOptions.tags);
	    }

	    scribe.use(scribePluginFormatterPlainTextConvertNewLinesToHTML());
	    scribe.use(scribePluginLinkPromptCommand());
	    scribe.use(scribePluginSanitizer({ tags: tags }));

	    if (_.isFunction(configureScribe)) {
	      configureScribe.call(this, scribe);
	    }

	    return scribe;
	  },

	  execTextBlockCommand: function execTextBlockCommand(scribeInstance, cmdName) {
	    if (_.isUndefined(scribeInstance)) {
	      throw "No Scribe instance found to query command";
	    }

	    var cmd = scribeInstance.getCommand(cmdName);
	    scribeInstance.el.focus();
	    return cmd.execute();
	  },

	  queryTextBlockCommandState: function queryTextBlockCommandState(scribeInstance, cmdName) {
	    if (_.isUndefined(scribeInstance)) {
	      throw "No Scribe instance found to query command";
	    }

	    var cmd = scribeInstance.getCommand(cmdName),
	        sel = new scribeInstance.api.Selection();
	    return sel.range && cmd.queryState();
	  }
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(162),
	  __webpack_require__(192),
	  __webpack_require__(171),
	  __webpack_require__(176),
	  __webpack_require__(179),
	  __webpack_require__(187),
	  __webpack_require__(140),
	  __webpack_require__(200),
	  __webpack_require__(201),
	  __webpack_require__(167),
	  __webpack_require__(165),
	  __webpack_require__(202)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  plugins,
	  commands,
	  formatters,
	  events,
	  patches,
	  Api,
	  buildTransactionManager,
	  UndoManager,
	  EventEmitter,
	  nodeHelpers,
	  Immutable,
	  config
	) {

	  'use strict';

	  function Scribe(el, options) {
	    EventEmitter.call(this);

	    this.el = el;
	    this.commands = {};

	    this.options = config.checkOptions(options);

	    this.commandPatches = {};
	    this._plainTextFormatterFactory = new FormatterFactory();
	    this._htmlFormatterFactory = new HTMLFormatterFactory();

	    this.api = new Api(this);

	    this.Immutable = Immutable;

	    var TransactionManager = buildTransactionManager(this);
	    this.transactionManager = new TransactionManager();

	    //added for explicit checking later eg if (scribe.undoManager) { ... }
	    this.undoManager = false;
	    if (this.options.undo.enabled) {
	      if (this.options.undo.manager) {
	        this.undoManager = this.options.undo.manager;
	      }
	      else {
	        this.undoManager = new UndoManager(this.options.undo.limit, this.el);
	      }
	      this._merge = false;
	      this._forceMerge = false;
	      this._mergeTimer = 0;
	      this._lastItem = {content: ''};
	    }

	    this.setHTML(this.getHTML());

	    this.el.setAttribute('contenteditable', true);

	    this.el.addEventListener('input', function () {
	      /**
	       * This event triggers when either the user types something or a native
	       * command is executed which causes the content to change (i.e.
	       * `document.execCommand('bold')`). We can't wrap a transaction around
	       * these actions, so instead we run the transaction in this event.
	       */
	      this.transactionManager.run();
	    }.bind(this), false);

	    /**
	     * Core Plugins
	     */
	    var corePlugins = Immutable.OrderedSet(this.options.defaultPlugins)
	      .sort(config.sortByPlugin('setRootPElement')) // Ensure `setRootPElement` is always loaded first
	      .filter(config.filterByBlockLevelMode(this.allowsBlockElements()))
	      .map(function (plugin) { return plugins[plugin]; });

	    // Formatters
	    var defaultFormatters = Immutable.List(this.options.defaultFormatters)
	    .filter(function (formatter) { return !!formatters[formatter]; })
	    .map(function (formatter) { return formatters[formatter]; });

	    // Patches

	    var defaultPatches = Immutable.List.of(
	      patches.events
	    );

	    var defaultCommandPatches = Immutable.List(this.options.defaultCommandPatches).map(function(patch) { return patches.commands[patch]; });

	    var defaultCommands = Immutable.List.of(
	      'indent',
	      'insertList',
	      'outdent',
	      'redo',
	      'subscript',
	      'superscript',
	      'undo'
	    ).map(function(command) { return commands[command]; });

	    var allPlugins = Immutable.List().concat(
	      corePlugins,
	      defaultFormatters,
	      defaultPatches,
	      defaultCommandPatches,
	      defaultCommands);

	    allPlugins.forEach(function(plugin) {
	      this.use(plugin());
	    }.bind(this));

	    this.use(events());
	  }

	  Scribe.prototype = Object.create(EventEmitter.prototype);
	  Scribe.prototype.node = nodeHelpers;
	  Scribe.prototype.element= Scribe.prototype.node;

	  // For plugins
	  // TODO: tap combinator?
	  Scribe.prototype.use = function (configurePlugin) {
	    configurePlugin(this);
	    return this;
	  };

	  Scribe.prototype.setHTML = function (html, skipFormatters) {
	    this._lastItem.content = html;

	    if (skipFormatters) {
	      this._skipFormatters = true;
	    }
	    // IE11: Setting HTML to the value it already has causes breakages elsewhere (see #336)
	    if (this.el.innerHTML !== html) {
	      this.el.innerHTML = html;
	    }
	  };

	  Scribe.prototype.getHTML = function () {
	    return this.el.innerHTML;
	  };

	  Scribe.prototype.getContent = function () {
	    // Remove bogus BR element for Firefox — see explanation in BR mode files.
	    return this._htmlFormatterFactory.formatForExport(this.getHTML().replace(/<br>$/, ''));
	  };

	  Scribe.prototype.getTextContent = function () {
	    return this.el.textContent;
	  };

	  Scribe.prototype.pushHistory = function () {
	    /**
	     * Chrome and Firefox: If we did push to the history, this would break
	     * browser magic around `Document.queryCommandState` (http://jsbin.com/eDOxacI/1/edit?js,console,output).
	     * This happens when doing any DOM manipulation.
	     */
	    var scribe = this;

	    if (scribe.options.undo.enabled) {
	      // Get scribe previous content, and strip markers.
	      var lastContentNoMarkers = scribe._lastItem.content.replace(/<em [^>]*class="scribe-marker"[^>]*>[^<]*?<\/em>/g, '');

	      // We only want to push the history if the content actually changed.
	      if (scribe.getHTML() !== lastContentNoMarkers) {
	        var selection = new scribe.api.Selection();

	        selection.placeMarkers();
	        var content = scribe.getHTML();
	        selection.removeMarkers();

	        // Checking if there is a need to merge, and that the previous history item
	        // is the last history item of the same scribe instance.
	        // It is possible the last transaction is not for the same instance, or
	        // even not a scribe transaction (e.g. when using a shared undo manager).
	        var previousItem = scribe.undoManager.item(scribe.undoManager.position);
	        if ((scribe._merge || scribe._forceMerge) && previousItem && scribe._lastItem == previousItem[0]) {
	          // If so, merge manually with the last item to save more memory space.
	          scribe._lastItem.content = content;
	        }
	        else {
	          // Otherwise, create a new history item, and register it as a new transaction
	          scribe._lastItem = {
	            previousItem: scribe._lastItem,
	            content: content,
	            scribe: scribe,
	            execute: function () { },
	            undo: function () { this.scribe.restoreFromHistory(this.previousItem); },
	            redo: function () { this.scribe.restoreFromHistory(this); }
	          };

	          scribe.undoManager.transact(scribe._lastItem, false);
	        }

	        // Merge next transaction if it happens before the interval option, otherwise don't merge.
	        clearTimeout(scribe._mergeTimer);
	        scribe._merge = true;
	        scribe._mergeTimer = setTimeout(function() { scribe._merge = false; }, scribe.options.undo.interval);

	        return true;
	      }
	    }

	    return false;
	  };

	  Scribe.prototype.getCommand = function (commandName) {
	    return this.commands[commandName] || this.commandPatches[commandName] || new this.api.Command(commandName);
	  };

	  Scribe.prototype.restoreFromHistory = function (historyItem) {
	    this._lastItem = historyItem;

	    this.setHTML(historyItem.content, true);

	    // Restore the selection
	    var selection = new this.api.Selection();
	    selection.selectMarkers();

	    // Because we skip the formatters, a transaction is not run, so we have to
	    // emit this event ourselves.
	    this.trigger('content-changed');
	  };

	  // This will most likely be moved to another object eventually
	  Scribe.prototype.allowsBlockElements = function () {
	    return this.options.allowBlockElements;
	  };

	  Scribe.prototype.setContent = function (content) {
	    if (! this.allowsBlockElements()) {
	      // Set bogus BR element for Firefox — see explanation in BR mode files.
	      content = content + '<br>';
	    }

	    this.setHTML(content);

	    this.trigger('content-changed');
	  };

	  Scribe.prototype.insertPlainText = function (plainText) {
	    this.insertHTML('<p>' + this._plainTextFormatterFactory.format(plainText) + '</p>');
	  };

	  Scribe.prototype.insertHTML = function (html) {
	    /**
	     * When pasting text from Google Docs in both Chrome and Firefox,
	     * the resulting text will be wrapped in a B tag. So it would look
	     * something like <b><p>Text</p></b>, which is invalid HTML. The command
	     * insertHTML will then attempt to fix this content by moving the B tag
	     * inside the P. The result is: <p><b></b></p><p>Text</p>, which is valid
	     * but means an extra P is inserted into the text. To avoid this we run the
	     * formatters before the insertHTML command as the formatter will
	     * unwrap the P and delete the B tag. It is acceptable to remove invalid
	     * HTML as Scribe should only accept valid HTML.
	     *
	     * See http://jsbin.com/cayosada/3/edit for more
	     **/

	    // TODO: error if the selection is not within the Scribe instance? Or
	    // focus the Scribe instance if it is not already focused?
	    this.getCommand('insertHTML').execute(this._htmlFormatterFactory.format(html));
	  };

	  Scribe.prototype.isDebugModeEnabled = function () {
	    return this.options.debug;
	  };

	  /**
	   * Applies HTML formatting to all editor text.
	   * @param {String} phase sanitize/normalize/export are the standard phases
	   * @param {Function} fn Function that takes the current editor HTML and returns a formatted version.
	   */
	  Scribe.prototype.registerHTMLFormatter = function (phase, formatter) {
	    this._htmlFormatterFactory.formatters[phase]
	      = this._htmlFormatterFactory.formatters[phase].push(formatter);
	  };

	  Scribe.prototype.registerPlainTextFormatter = function (formatter) {
	    this._plainTextFormatterFactory.formatters
	      = this._plainTextFormatterFactory.formatters.push(formatter);
	  };

	  // TODO: abstract
	  function FormatterFactory() {
	    this.formatters = Immutable.List();
	  }

	  FormatterFactory.prototype.format = function (html) {
	    // Map the object to an array: Array[Formatter]
	    var formatted = this.formatters.reduce(function (formattedData, formatter) {
	      return formatter(formattedData);
	    }, html);

	    return formatted;
	  };

	  function HTMLFormatterFactory() {
	    // Define phases
	    // For a list of formatters, see https://github.com/guardian/scribe/issues/126
	    this.formatters = {
	      // Configurable sanitization of the HTML, e.g. converting/filter/removing
	      // elements
	      sanitize: Immutable.List(),
	      // Normalize content to ensure it is ready for interaction
	      normalize: Immutable.List(),
	      'export': Immutable.List()
	    };
	  }

	  HTMLFormatterFactory.prototype = Object.create(FormatterFactory.prototype);
	  HTMLFormatterFactory.prototype.constructor = HTMLFormatterFactory;

	  HTMLFormatterFactory.prototype.format = function (html) {
	    var formatters = this.formatters.sanitize.concat(this.formatters.normalize);

	    var formatted = formatters.reduce(function (formattedData, formatter) {
	      return formatter(formattedData);
	    }, html);

	    return formatted;
	  };

	  HTMLFormatterFactory.prototype.formatForExport = function (html) {
	    return this.formatters['export'].reduce(function (formattedData, formatter) {
	      return formatter(formattedData);
	    }, html);
	  };

	  return Scribe;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(141)], __WEBPACK_AMD_DEFINE_RESULT__ = function (assign) {

	  'use strict';

	  return function (scribe) {
	    function TransactionManager() {
	      this.history = [];
	    }

	    assign(TransactionManager.prototype, {
	      start: function () {
	        this.history.push(1);
	      },

	      end: function () {
	        this.history.pop();

	        if (this.history.length === 0) {
	          scribe.pushHistory();
	          scribe.trigger('content-changed');
	        }
	      },

	      run: function (transaction, forceMerge) {
	        this.start();
	        // If there is an error, don't prevent the transaction from ending.
	        try {
	          if (transaction) {
	            transaction();
	          }
	        } finally {
	          scribe._forceMerge = forceMerge === true;
	          this.end();
	          scribe._forceMerge = false;
	        }
	      }
	    });

	    return TransactionManager;
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(142), __webpack_require__(158)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseAssign, createAssigner) {

	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object. Subsequent sources overwrite property assignments of previous sources.
	   * If `customizer` is provided it is invoked to produce the assigned values.
	   * The `customizer` is bound to `thisArg` and invoked with five arguments;
	   * (objectValue, sourceValue, key, object, source).
	   *
	   * @static
	   * @memberOf _
	   * @alias extend
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @param {Function} [customizer] The function to customize assigning values.
	   * @param {*} [thisArg] The `this` binding of `customizer`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	   * // => { 'user': 'fred', 'age': 40 }
	   *
	   * // using a customizer callback
	   * var defaults = _.partialRight(_.assign, function(value, other) {
	   *   return typeof value == 'undefined' ? other : value;
	   * });
	   *
	   * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	   * // => { 'user': 'barney', 'age': 36 }
	   */
	  var assign = createAssigner(baseAssign);

	  return assign;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(143), __webpack_require__(144)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseCopy, keys) {

	  /**
	   * The base implementation of `_.assign` without support for argument juggling,
	   * multiple sources, and `this` binding `customizer` functions.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {Function} [customizer] The function to customize assigning values.
	   * @returns {Object} Returns the destination object.
	   */
	  function baseAssign(object, source, customizer) {
	    var props = keys(source);
	    if (!customizer) {
	      return baseCopy(source, object, props);
	    }
	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index],
	          value = object[key],
	          result = customizer(value, source[key], key, object, source);

	      if ((result === result ? (result !== value) : (value === value)) ||
	          (typeof value == 'undefined' && !(key in object))) {
	        object[key] = result;
	      }
	    }
	    return object;
	  }

	  return baseAssign;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Copies the properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @param {Array} props The property names to copy.
	   * @returns {Object} Returns `object`.
	   */
	  function baseCopy(source, object, props) {
	    if (!props) {
	      props = object;
	      object = {};
	    }
	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      object[key] = source[key];
	    }
	    return object;
	  }

	  return baseCopy;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(145), __webpack_require__(146), __webpack_require__(150), __webpack_require__(151)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isNative, isObject, shimKeys) {

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keys(new Foo);
	   * // => ['a', 'b'] (iteration order is not guaranteed)
	   *
	   * _.keys('hi');
	   * // => ['0', '1']
	   */
	  var keys = !nativeKeys ? shimKeys : function(object) {
	    if (object) {
	      var Ctor = object.constructor,
	          length = object.length;
	    }
	    if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	        (typeof object != 'function' && (length && isLength(length)))) {
	      return shimKeys(object);
	    }
	    return isObject(object) ? nativeKeys(object) : [];
	  };

	  return keys;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used as the maximum length of an array-like value.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	   * for more details.
	   */
	  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This function is based on ES `ToLength`. See the
	   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	   * for more details.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	   */
	  function isLength(value) {
	    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	  }

	  return isLength;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(147), __webpack_require__(149)], __WEBPACK_AMD_DEFINE_RESULT__ = function(escapeRegExp, isObjectLike) {

	  /** `Object#toString` result references. */
	  var funcTag = '[object Function]';

	  /** Used to detect host constructors (Safari > 5). */
	  var reHostCtor = /^\[object .+?Constructor\]$/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to resolve the decompiled source of functions. */
	  var fnToString = Function.prototype.toString;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /** Used to detect if a method is native. */
	  var reNative = RegExp('^' +
	    escapeRegExp(objToString)
	    .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	  );

	  /**
	   * Checks if `value` is a native function.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	   * @example
	   *
	   * _.isNative(Array.prototype.push);
	   * // => true
	   *
	   * _.isNative(_);
	   * // => false
	   */
	  function isNative(value) {
	    if (value == null) {
	      return false;
	    }
	    if (objToString.call(value) == funcTag) {
	      return reNative.test(fnToString.call(value));
	    }
	    return (isObjectLike(value) && reHostCtor.test(value)) || false;
	  }

	  return isNative;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(148)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseToString) {

	  /**
	   * Used to match `RegExp` special characters.
	   * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
	   * for more details.
	   */
	  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	      reHasRegExpChars = RegExp(reRegExpChars.source);

	  /**
	   * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
	   * "+", "(", ")", "[", "]", "{" and "}" in `string`.
	   *
	   * @static
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escapeRegExp('[lodash](https://lodash.com/)');
	   * // => '\[lodash\]\(https://lodash\.com/\)'
	   */
	  function escapeRegExp(string) {
	    string = baseToString(string);
	    return (string && reHasRegExpChars.test(string))
	      ? string.replace(reRegExpChars, '\\$&')
	      : string;
	  }

	  return escapeRegExp;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Converts `value` to a string if it is not one. An empty string is returned
	   * for `null` or `undefined` values.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   */
	  function baseToString(value) {
	    if (typeof value == 'string') {
	      return value;
	    }
	    return value == null ? '' : (value + '');
	  }

	  return baseToString;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */
	  function isObjectLike(value) {
	    return (value && typeof value == 'object') || false;
	  }

	  return isObjectLike;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Checks if `value` is the language type of `Object`.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	   * @example
	   *
	   * _.isObject({});
	   * // => true
	   *
	   * _.isObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isObject(1);
	   * // => false
	   */
	  function isObject(value) {
	    // Avoid a V8 JIT bug in Chrome 19-20.
	    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	    var type = typeof value;
	    return type == 'function' || (value && type == 'object') || false;
	  }

	  return isObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(152), __webpack_require__(153), __webpack_require__(154), __webpack_require__(145), __webpack_require__(155), __webpack_require__(156)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArguments, isArray, isIndex, isLength, keysIn, support) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * A fallback implementation of `Object.keys` which creates an array of the
	   * own enumerable property names of `object`.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   */
	  function shimKeys(object) {
	    var props = keysIn(object),
	        propsLength = props.length,
	        length = propsLength && object.length;

	    var allowIndexes = length && isLength(length) &&
	      (isArray(object) || (support.nonEnumArgs && isArguments(object)));

	    var index = -1,
	        result = [];

	    while (++index < propsLength) {
	      var key = props[index];
	      if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  return shimKeys;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(145), __webpack_require__(149)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isObjectLike) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * Checks if `value` is classified as an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    var length = isObjectLike(value) ? value.length : undefined;
	    return (isLength(length) && objToString.call(value) == argsTag) || false;
	  }

	  return isArguments;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(145), __webpack_require__(146), __webpack_require__(149)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isNative, isObjectLike) {

	  /** `Object#toString` result references. */
	  var arrayTag = '[object Array]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

	  /**
	   * Checks if `value` is classified as an `Array` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   *
	   * _.isArray(function() { return arguments; }());
	   * // => false
	   */
	  var isArray = nativeIsArray || function(value) {
	    return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
	  };

	  return isArray;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used as the maximum length of an array-like value.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	   * for more details.
	   */
	  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    value = +value;
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return value > -1 && value % 1 == 0 && value < length;
	  }

	  return isIndex;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(152), __webpack_require__(153), __webpack_require__(154), __webpack_require__(145), __webpack_require__(150), __webpack_require__(156)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArguments, isArray, isIndex, isLength, isObject, support) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  function keysIn(object) {
	    if (object == null) {
	      return [];
	    }
	    if (!isObject(object)) {
	      object = Object(object);
	    }
	    var length = object.length;
	    length = (length && isLength(length) &&
	      (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

	    var Ctor = object.constructor,
	        index = -1,
	        isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	        result = Array(length),
	        skipIndexes = length > 0;

	    while (++index < length) {
	      result[index] = (index + '');
	    }
	    for (var key in object) {
	      if (!(skipIndexes && isIndex(key, length)) &&
	          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  return keysIn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(146), __webpack_require__(157)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isNative, root) {

	  /** Used to detect functions containing a `this` reference. */
	  var reThis = /\bthis\b/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to detect DOM support. */
	  var document = (document = root.window) && document.document;

	  /** Native method references. */
	  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	  /**
	   * An object environment feature flags.
	   *
	   * @static
	   * @memberOf _
	   * @type Object
	   */
	  var support = {};

	  (function(x) {

	    /**
	     * Detect if functions can be decompiled by `Function#toString`
	     * (all but Firefox OS certified apps, older Opera mobile browsers, and
	     * the PlayStation 3; forced `false` for Windows 8 apps).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcDecomp = !isNative(root.WinRTError) && reThis.test(function() { return this; });

	    /**
	     * Detect if `Function#name` is supported (all but IE).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcNames = typeof Function.name == 'string';

	    /**
	     * Detect if the DOM is supported.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    try {
	      support.dom = document.createDocumentFragment().nodeType === 11;
	    } catch(e) {
	      support.dom = false;
	    }

	    /**
	     * Detect if `arguments` object indexes are non-enumerable.
	     *
	     * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	     * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	     * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	     * checks for indexes that exceed their function's formal parameters with
	     * associated values of `0`.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    try {
	      support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
	    } catch(e) {
	      support.nonEnumArgs = true;
	    }
	  }(0, 0));

	  return support;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

	  /** Detect free variable `window`. */
	  var freeWindow = objectTypes[typeof window] && window;

	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it is the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || this;

	  return root;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)(module), (function() { return this; }())))

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(159), __webpack_require__(161)], __WEBPACK_AMD_DEFINE_RESULT__ = function(bindCallback, isIterateeCall) {

	  /**
	   * Creates a function that assigns properties of source object(s) to a given
	   * destination object.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return function() {
	      var args = arguments,
	          length = args.length,
	          object = args[0];

	      if (length < 2 || object == null) {
	        return object;
	      }
	      var customizer = args[length - 2],
	          thisArg = args[length - 1],
	          guard = args[3];

	      if (length > 3 && typeof customizer == 'function') {
	        customizer = bindCallback(customizer, thisArg, 5);
	        length -= 2;
	      } else {
	        customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
	        length -= (customizer ? 1 : 0);
	      }
	      if (guard && isIterateeCall(args[1], args[2], guard)) {
	        customizer = length == 3 ? null : customizer;
	        length = 2;
	      }
	      var index = 0;
	      while (++index < length) {
	        var source = args[index];
	        if (source) {
	          assigner(object, source, customizer);
	        }
	      }
	      return object;
	    };
	  }

	  return createAssigner;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(160)], __WEBPACK_AMD_DEFINE_RESULT__ = function(identity) {

	  /**
	   * A specialized version of `baseCallback` which only supports `this` binding
	   * and specifying the number of arguments to provide to `func`.
	   *
	   * @private
	   * @param {Function} func The function to bind.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {number} [argCount] The number of arguments to provide to `func`.
	   * @returns {Function} Returns the callback.
	   */
	  function bindCallback(func, thisArg, argCount) {
	    if (typeof func != 'function') {
	      return identity;
	    }
	    if (typeof thisArg == 'undefined') {
	      return func;
	    }
	    switch (argCount) {
	      case 1: return function(value) {
	        return func.call(thisArg, value);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	      case 5: return function(value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	    }
	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  }

	  return bindCallback;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * This method returns the first argument provided to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {*} value Any value.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.identity(object) === object;
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }

	  return identity;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(154), __webpack_require__(145), __webpack_require__(150)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isIndex, isLength, isObject) {

	  /**
	   * Checks if the provided arguments are from an iteratee call.
	   *
	   * @private
	   * @param {*} value The potential iteratee value argument.
	   * @param {*} index The potential iteratee index or key argument.
	   * @param {*} object The potential iteratee object argument.
	   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	   */
	  function isIterateeCall(value, index, object) {
	    if (!isObject(object)) {
	      return false;
	    }
	    var type = typeof index;
	    if (type == 'number') {
	      var length = object.length,
	          prereq = isLength(length) && isIndex(index, length);
	    } else {
	      prereq = type == 'string' && index in object;
	    }
	    if (prereq) {
	      var other = object[index];
	      return value === value ? (value === other) : (other !== other);
	    }
	    return false;
	  }

	  return isIterateeCall;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(163),
	  __webpack_require__(164),
	  __webpack_require__(166),
	  __webpack_require__(170)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  setRootPElement,
	  enforcePElements,
	  ensureSelectableContainers,
	  inlineElementsMode
	) {
	  'use strict';

	  return {
	    setRootPElement: setRootPElement,
	    enforcePElements: enforcePElements,
	    ensureSelectableContainers: ensureSelectableContainers,
	    inlineElementsMode: inlineElementsMode
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * Sets the default content of the scribe so that each carriage return creates
	   * a P.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      // The content might have already been set, in which case we don't want
	      // to apply.
	      if (scribe.getHTML().trim() === '') {
	        /**
	         * We have to begin with the following HTML, because otherwise some
	         * browsers(?) will position the caret outside of the P when the scribe is
	         * focused.
	         */
	        scribe.setContent('<p><br></p>');
	      }
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(165)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {

	  /**
	   * Chrome and Firefox: Upon pressing backspace inside of a P, the
	   * browser deletes the paragraph element, leaving the caret (and any
	   * content) outside of any P.
	   *
	   * Firefox: Erasing across multiple paragraphs, or outside of a
	   * whole paragraph (e.g. by ‘Select All’) will leave content outside
	   * of any P.
	   *
	   * Entering a new line in a pristine state state will insert
	   * `<div>`s (in Chrome) or `<br>`s (in Firefox) where previously we
	   * had `<p>`'s. This patches the behaviour of delete/backspace so
	   * that we do not end up in a pristine state.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;

	      /**
	       * Wrap consecutive inline elements and text nodes in a P element.
	       */
	      function wrapChildNodes(parentNode) {
	        var index = 0;
	        Immutable.List(parentNode.childNodes)
	          .filter(function(node) {
	            return node.nodeType === Node.TEXT_NODE || !nodeHelpers.isBlockElement(node);
	          })
	          .groupBy(function(node, key, list) {
	            return key === 0 || node.previousSibling === list.get(key - 1) ?
	              index :
	              index += 1;
	          })
	          .forEach(function(nodeGroup) {
	            nodeHelpers.wrap(nodeGroup.toArray(), document.createElement('p'));
	          });
	      }

	      // Traverse the tree, wrapping child nodes as we go.
	      function traverse(parentNode) {
	        var i = 0, node;

	        while (node = parentNode.children[i++]) {
	          if (node.tagName === 'BLOCKQUOTE') {
	            wrapChildNodes(node);
	          }
	        }
	      }

	      scribe.registerHTMLFormatter('normalize', function (html) {
	        /**
	         * Ensure P mode.
	         *
	         * Wrap any orphan text nodes in a P element.
	         */
	        // TODO: This should be configurable and also correct markup such as
	        // `<ul>1</ul>` to <ul><li>2</li></ul>`. See skipped tests.
	        // TODO: This should probably be a part of HTML Janitor, or some other
	        // formatter.
	        var bin = document.createElement('div');
	        bin.innerHTML = html;

	        wrapChildNodes(bin);
	        traverse(bin);

	        return bin.innerHTML;
	      });

	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */

	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.Immutable = factory();
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    //
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	    if (typeof index !== 'number') {
	      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	      if ('' + uint32Index !== index || uint32Index === 4294967295) {
	        return NaN;
	      }
	      index = uint32Index;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function Iterator(next) {
	      this.next = next;
	    }

	    Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  Iterator.KEYS = ITERATE_KEYS;
	  Iterator.VALUES = ITERATE_VALUES;
	  Iterator.ENTRIES = ITERATE_ENTRIES;

	  Iterator.prototype.inspect =
	  Iterator.prototype.toSource = function () { return this.toString(); }
	  Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step > 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  var imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    if (type === 'object') {
	      return hashJSObj(o);
	    }
	    if (typeof o.toString === 'function') {
	      return hashString(o.toString());
	    }
	    throw new Error('Value type ' + type + ' cannot be hashed.');
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(Map, KeyedCollection);

	    // @pragma Construction

	    function Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) && !isOrdered(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger, arguments);
	    };

	    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
	    };

	    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(existing, value, key) {
	    return existing && existing.mergeDeep && isIterable(value) ?
	      existing.mergeDeep(value) :
	      is(existing, value) ? existing : value;
	  }

	  function deepMergerWith(merger) {
	    return function(existing, value, key)  {
	      if (existing && existing.mergeDeepWith && isIterable(value)) {
	        return existing.mergeDeepWith(merger, value);
	      }
	      var nextValue = merger(existing, value, key);
	      return is(existing, nextValue) ? existing : nextValue;
	    };
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index >= 0 && index < this.size) {
	        index += this._origin;
	        var node = listNodeFor(this, index);
	        return node && node.array[index & MASK];
	      }
	      return notSetValue;
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.insert = function(index, value) {
	      return this.splice(index, 0, value);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger, arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMergerWith(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }

	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	          return this;
	        }
	      }

	      var editable = editableVNode(this, ownerID);
	      editable.array.splice(sizeIndex + 1);
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  createClass(Set, SetCollection);

	    // @pragma Construction

	    function Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) && !isOrdered(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    findEntry: function(predicate, context) {
	      var found;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findLastEntry: function(predicate, context) {
	      return this.toSeq().reverse().findEntry(predicate, context);
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  // Temporary warning about using length
	  (function () {
	    try {
	      Object.defineProperty(IterablePrototype, 'length', {
	        get: function () {
	          if (!Iterable.noLengthWarning) {
	            var stack;
	            try {
	              throw new Error();
	            } catch (error) {
	              stack = error.stack;
	            }
	            if (stack.indexOf('_wrapObject') === -1) {
	              console && console.warn && console.warn(
	                'iterable.length has been deprecated, '+
	                'use iterable.size or iterable.count(). '+
	                'This warning will become a silent error in a future version. ' +
	                stack
	              );
	              return this.size;
	            }
	          }
	        }
	      });
	    } catch (e) {}
	  })();



	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLastKey: function(predicate, context) {
	      return this.toSeq().reverse().findKey(predicate, context);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    lastKeyOf: function(searchValue) {
	      return this.findLastKey(function(value ) {return is(value, searchValue)});
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.toKeyedSeq().keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      var key = this.toKeyedSeq().reverse().keyOf(searchValue);
	      return key === undefined ? -1 : key;

	      // var index =
	      // return this.toSeq().reverse().indexOf(searchValue);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var key = this.toKeyedSeq().findLastKey(predicate, context);
	      return key === undefined ? -1 : key;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : value;
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = imul(h, 0xCC9E2D51);
	    h = imul(h << 15 | h >>> -15, 0x1B873593);
	    h = imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;

	}));

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(167),
	    __webpack_require__(165)
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	    nodeHelpers,
	    Immutable
	  ) {

	  /**
	   * Chrome and Firefox: All elements need to contain either text or a `<br>` to
	   * remain selectable. (Unless they have a width and height explicitly set with
	   * CSS(?), as per: http://jsbin.com/gulob/2/edit?html,css,js,output)
	   */

	  'use strict';

	  // http://www.w3.org/TR/html-markup/syntax.html#syntax-elements
	  var html5VoidElements = Immutable.Set.of('AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR');

	  function parentHasNoTextContent(node) {
	    if (nodeHelpers.isCaretPositionNode(node)) {
	      return true;
	    } else {
	      return node.parentNode.textContent.trim() === '';
	    }
	  }


	  function traverse(parentNode) {
	    // Instead of TreeWalker, which gets confused when the BR is added to the dom,
	    // we recursively traverse the tree to look for an empty node that can have childNodes

	    var node = parentNode.firstElementChild;

	    function isEmpty(node) {

	      if ((node.children.length === 0 && nodeHelpers.isBlockElement(node))
	        || (node.children.length === 1 && nodeHelpers.isSelectionMarkerNode(node.children[0]))) {
	         return true;
	      }

	      // Do not insert BR in empty non block elements with parent containing text
	      if (!nodeHelpers.isBlockElement(node) && node.children.length === 0) {
	        return parentHasNoTextContent(node);
	      }

	      return false;
	    }

	    while (node) {
	      if (!nodeHelpers.isSelectionMarkerNode(node)) {
	        // Find any node that contains no child *elements*, or just contains
	        // whitespace, and is not self-closing
	        if (isEmpty(node) &&
	          node.textContent.trim() === '' &&
	          !html5VoidElements.includes(node.nodeName)) {
	          node.appendChild(document.createElement('br'));
	        } else if (node.children.length > 0) {
	          traverse(node);
	        }
	      }
	      node = node.nextElementSibling;
	    }
	  }

	  return function () {
	    return function (scribe) {

	      scribe.registerHTMLFormatter('normalize', function (html) {
	        var bin = document.createElement('div');
	        bin.innerHTML = html;

	        traverse(bin);

	        return bin.innerHTML;
	      });

	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(168),
	  __webpack_require__(169),
	  __webpack_require__(165)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (inlineElementNames, blockElementNames, Immutable) {

	  'use strict';

	  function isBlockElement(node) {
	    return blockElementNames.includes(node.nodeName);
	  }

	  function isInlineElement(node) {
	    return inlineElementNames.includes(node.nodeName);
	  }

	  // return true if nested inline tags ultimately just contain <br> or ""
	  function isEmptyInlineElement(node) {
	    if( node.children.length > 1 ) return false;
	    if( node.children.length === 1 && node.textContent.trim() !== '' ) return false;
	    if( node.children.length === 0 ) return node.textContent.trim() === '';
	    return isEmptyInlineElement(node.children[0]);
	  }

	  function isText(node) {
	    return node.nodeType === Node.TEXT_NODE;
	  }

	  function isEmptyTextNode(node) {
	    return isText(node) && node.data === '';
	  }

	  function isFragment(node) {
	    return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
	  }

	  function isBefore(node1, node2) {
	    return node1.compareDocumentPosition(node2) & Node.DOCUMENT_POSITION_FOLLOWING;
	  }

	  function elementHasClass(Node, className) {
	    return function(node) {
	      return (node.nodeType === Node.ELEMENT_NODE && node.className === className)
	    }
	  }

	  function isSelectionMarkerNode(node) {
	    return elementHasClass(Node, 'scribe-marker')(node);
	  }

	  function isCaretPositionNode(node) {
	    return elementHasClass(Node, 'caret-position')(node);
	  }

	  function isNotObservableNode(node) {
	    return elementHasClass(Node, 'scribe-not-observable')(node);
	  }

	  function firstDeepestChild(node) {
	    var fs = node.firstChild;
	    return !fs || fs.nodeName === 'BR' ?
	      node :
	      firstDeepestChild(fs);
	  }

	  function insertAfter(newNode, referenceNode) {
	    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	  }

	  function removeNode(node) {
	    return node.parentNode.removeChild(node);
	  }

	  function getAncestor(node, rootElement, nodeFilter) {
	    function isTopContainerElement (element) {
	      return rootElement === element;
	    }
	    // TODO: should this happen here?
	    if (isTopContainerElement(node)) {
	      return;
	    }

	    var currentNode = node.parentNode;

	    // If it's a `contenteditable` then it's likely going to be the Scribe
	    // instance, so stop traversing there.
	    while (currentNode && ! isTopContainerElement(currentNode)) {
	      if (nodeFilter(currentNode)) {
	        return currentNode;
	      }
	      currentNode = currentNode.parentNode;
	    }
	  }

	  function nextSiblings(node) {
	    var all = Immutable.List();
	    while (node = node.nextSibling) {
	      all = all.push(node);
	    }
	    return all;
	  }

	  function wrap(nodes, parentNode) {
	    nodes[0].parentNode.insertBefore(parentNode, nodes[0]);
	    nodes.forEach(function (node) {
	      parentNode.appendChild(node);
	    });
	    return parentNode;
	  }

	  function unwrap(node, childNode) {
	    while (childNode.childNodes.length > 0) {
	      node.insertBefore(childNode.childNodes[0], childNode);
	    }
	    node.removeChild(childNode);
	  }

	  /**
	   * Chrome: If a parent node has a CSS `line-height` when we apply the
	   * insertHTML command, Chrome appends a SPAN to plain content with
	   * inline styling replicating that `line-height`, and adjusts the
	   * `line-height` on inline elements.
	   *
	   * As per: http://jsbin.com/ilEmudi/4/edit?css,js,output
	   * More from the web: http://stackoverflow.com/q/15015019/40352
	   */
	  function removeChromeArtifacts(parentElement) {
	    function isInlineWithStyle(parentStyle, element) {
	      return window.getComputedStyle(element).lineHeight === parentStyle.lineHeight;
	    }

	    var nodes = Immutable.List(parentElement.querySelectorAll(inlineElementNames
	      .map(function(elName) { return elName + '[style*="line-height"]' })
	      .join(',')
	      ));
	    nodes = nodes.filter(isInlineWithStyle.bind(null, window.getComputedStyle(parentElement)));

	    var emptySpans = Immutable.List();

	    nodes.forEach(function(node) {
	      node.style.lineHeight = null;
	      if (!node.getAttribute('style')) {
	        node.removeAttribute('style');
	      }
	      if (node.nodeName === 'SPAN' && node.attributes.length === 0) {
	        emptySpans = emptySpans.push(node);
	      }
	    });

	    emptySpans.forEach(function(node) {
	      unwrap(node.parentNode, node);
	    });
	  }

	  return {
	    isInlineElement: isInlineElement,
	    isBlockElement: isBlockElement,
	    isEmptyInlineElement: isEmptyInlineElement,
	    isText: isText,
	    isEmptyTextNode: isEmptyTextNode,
	    isFragment: isFragment,
	    isBefore: isBefore,
	    isSelectionMarkerNode: isSelectionMarkerNode,
	    isCaretPositionNode: isCaretPositionNode,
	    firstDeepestChild: firstDeepestChild,
	    insertAfter: insertAfter,
	    removeNode: removeNode,
	    getAncestor: getAncestor,
	    nextSiblings: nextSiblings,
	    wrap: wrap,
	    unwrap: unwrap,
	    removeChromeArtifacts: removeChromeArtifacts,
	    elementHasClass: elementHasClass
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(165)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {
	  // Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elemente
	  var inlineElementNames = Immutable.Set.of('B', 'BIG', 'I', 'SMALL', 'TT',
	    'ABBR', 'ACRONYM', 'CITE', 'CODE', 'DFN', 'EM', 'KBD', 'STRONG', 'SAMP', 'VAR',
	    'A', 'BDO', 'BR', 'IMG', 'MAP', 'OBJECT', 'Q', 'SCRIPT', 'SPAN', 'SUB', 'SUP',
	    'BUTTON', 'INPUT', 'LABEL', 'SELECT', 'TEXTAREA');

	  return inlineElementNames;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(165)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Immutable) {
	  var blockElementNames = Immutable.Set.of('ADDRESS', 'ARTICLE', 'ASIDE', 'AUDIO', 'BLOCKQUOTE', 'CANVAS', 'DD',
	                           'DIV', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FOOTER', 'FORM', 'H1',
	                           'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER', 'HGROUP', 'HR', 'LI',
	                           'NOSCRIPT', 'OL', 'OUTPUT', 'P', 'PRE', 'SECTION', 'TABLE', 'TD',
	                           'TH', 'TFOOT', 'UL', 'VIDEO');

	  return blockElementNames;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  // TODO: abstract
	  function hasContent(rootNode) {
	    var treeWalker = document.createTreeWalker(rootNode, NodeFilter.SHOW_ALL, null, false);

	    while (treeWalker.nextNode()) {
	      if (treeWalker.currentNode) {
	        // If the node is a non-empty element or has content
	        if (~['br'].indexOf(treeWalker.currentNode.nodeName.toLowerCase()) || treeWalker.currentNode.length > 0) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  return function () {
	    return function (scribe) {
	      /**
	       * Firefox has a `insertBrOnReturn` command, but this is not a part of
	       * any standard. One day we might have an `insertLineBreak` command,
	       * proposed by this spec:
	       * https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#the-insertlinebreak-command
	       * As per: http://jsbin.com/IQUraXA/1/edit?html,js,output
	       */
	      scribe.el.addEventListener('keydown', function (event) {
	        if (event.keyCode === 13) { // enter
	          var selection = new scribe.api.Selection();
	          var range = selection.range;

	          var blockNode = selection.getContaining(function (node) {
	            return node.nodeName === 'LI' || (/^(H[1-6])$/).test(node.nodeName);
	          });

	          if (! blockNode) {
	            event.preventDefault();

	            scribe.transactionManager.run(function () {
	              /**
	               * Firefox: Delete the bogus BR as we insert another one later.
	               * We have to do this because otherwise the browser will believe
	               * there is content to the right of the selection.
	               */
	              if (scribe.el.lastChild.nodeName === 'BR') {
	                scribe.el.removeChild(scribe.el.lastChild);
	              }

	              var brNode = document.createElement('br');

	              range.insertNode(brNode);
	              // After inserting the BR into the range is no longer collapsed, so
	              // we have to collapse it again.
	              // TODO: Older versions of Firefox require this argument even though
	              // it is supposed to be optional. Proxy/polyfill?
	              range.collapse(false);

	              /**
	               * Chrome: If there is no right-hand side content, inserting a BR
	               * will not appear to create a line break.
	               * Firefox: If there is no right-hand side content, inserting a BR
	               * will appear to create a weird "half-line break".
	               *
	               * Possible solution: Insert two BRs.
	               * ✓ Chrome: Inserting two BRs appears to create a line break.
	               * Typing will then delete the bogus BR element.
	               * Firefox: Inserting two BRs will create two line breaks.
	               *
	               * Solution: Only insert two BRs if there is no right-hand
	               * side content.
	               *
	               * If the user types on a line immediately after a BR element,
	               * Chrome will replace the BR element with the typed characters,
	               * whereas Firefox will not. Thus, to satisfy Firefox we have to
	               * insert a bogus BR element on initialization (see below).
	               */

	              var contentToEndRange = range.cloneRange();
	              contentToEndRange.setEndAfter(scribe.el.lastChild, 0);

	              // Get the content from the range to the end of the heading
	              var contentToEndFragment = contentToEndRange.cloneContents();

	              // If there is not already a right hand side content we need to
	              // insert a bogus BR element.
	              if (! hasContent(contentToEndFragment)) {
	                var bogusBrNode = document.createElement('br');
	                range.insertNode(bogusBrNode);
	              }

	              var newRange = range.cloneRange();

	              newRange.setStartAfter(brNode, 0);
	              newRange.setEndAfter(brNode, 0);

	              selection.selection.removeAllRanges();
	              selection.selection.addRange(newRange);
	            });
	          }
	        }
	      }.bind(this));

	      if (scribe.getHTML().trim() === '') {
	        // Bogus BR element for Firefox — see explanation above.
	        // TODO: also append when consumer sets the content manually.
	        // TODO: hide when the user calls `getHTML`?
	        scribe.setContent('');
	      }
	    };
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(172),
	  __webpack_require__(173)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  replaceNbspCharsFormatter,
	  escapeHtmlCharactersFormatter
	) {
	  'use strict';

	  return {
	    replaceNbspCharsFormatter: replaceNbspCharsFormatter,
	    escapeHtmlCharactersFormatter: escapeHtmlCharactersFormatter
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * Chrome:
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nbspCharRegExp = /(\s|&nbsp;)+/g;

	      // TODO: should we be doing this on paste?
	      scribe.registerHTMLFormatter('export', function (html) {
	        return html.replace(nbspCharRegExp, ' ');
	      });
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(174)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  escape
	) {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      scribe.registerPlainTextFormatter(escape);
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(148), __webpack_require__(175)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseToString, escapeHtmlChar) {

	  /** Used to match HTML entities and HTML characters. */
	  var reUnescapedHtml = /[&<>"'`]/g,
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	  /**
	   * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
	   * their corresponding HTML entities.
	   *
	   * **Note:** No other characters are escaped. To escape additional characters
	   * use a third-party library like [_he_](https://mths.be/he).
	   *
	   * Though the ">" character is escaped for symmetry, characters like
	   * ">" and "/" don't require escaping in HTML and have no special meaning
	   * unless they're part of a tag or unquoted attribute value.
	   * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	   * (under "semi-related fun fact") for more details.
	   *
	   * Backticks are escaped because in Internet Explorer < 9, they can break out
	   * of attribute values or HTML comments. See [#102](https://html5sec.org/#102),
	   * [#108](https://html5sec.org/#108), and [#133](https://html5sec.org/#133) of
	   * the [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
	   *
	   * When working with HTML you should always quote attribute values to reduce
	   * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escape('fred, barney, & pebbles');
	   * // => 'fred, barney, &amp; pebbles'
	   */
	  function escape(string) {
	    // Reset `lastIndex` because in IE < 9 `String#replace` does not.
	    string = baseToString(string);
	    return (string && reHasUnescapedHtml.test(string))
	      ? string.replace(reUnescapedHtml, escapeHtmlChar)
	      : string;
	  }

	  return escape;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '`': '&#96;'
	  };

	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeHtmlChar(chr) {
	    return htmlEscapes[chr];
	  }

	  return escapeHtmlChar;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(177),
	  __webpack_require__(165)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  observeDomChanges,
	  Immutable
	) {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;

	      /**
	       * Firefox: Giving focus to a `contenteditable` will place the caret
	       * outside of any block elements. Chrome behaves correctly by placing the
	       * caret at the  earliest point possible inside the first block element.
	       * As per: http://jsbin.com/eLoFOku/1/edit?js,console,output
	       *
	       * We detect when this occurs and fix it by placing the caret ourselves.
	       */
	      scribe.el.addEventListener('focus', function placeCaretOnFocus() {
	        var selection = new scribe.api.Selection();
	        // In Chrome, the range is not created on or before this event loop.
	        // It doesn’t matter because this is a fix for Firefox.
	        if (selection.range) {

	          var isFirefoxBug = scribe.allowsBlockElements() &&
	                  selection.range.startContainer === scribe.el;

	          if (isFirefoxBug) {
	            var focusElement = nodeHelpers.firstDeepestChild(scribe.el);

	            var range = selection.range;

	            range.setStart(focusElement, 0);
	            range.setEnd(focusElement, 0);

	            selection.selection.removeAllRanges();
	            selection.selection.addRange(range);
	          }
	        }
	      }.bind(scribe));

	      /**
	       * Apply the formatters when there is a DOM mutation.
	       */
	      var applyFormatters = function() {
	        if (!scribe._skipFormatters) {
	          var selection = new scribe.api.Selection();
	          var isEditorActive = selection.range;

	          var runFormatters = function () {
	            if (isEditorActive) {
	              selection.placeMarkers();
	            }
	            scribe.setHTML(scribe._htmlFormatterFactory.format(scribe.getHTML()));
	            selection.selectMarkers();
	          }.bind(scribe);

	          // We only want to wrap the formatting in a transaction if the editor is
	          // active. If the DOM is mutated when the editor isn't active (e.g.
	          // `scribe.setContent`), we do not want to push to the history. (This
	          // happens on the first `focus` event).

	          // The previous check is no longer needed, and the above comments are no longer valid.
	          // Now `scribe.setContent` updates the content manually, and `scribe.pushHistory`
	          // will not detect any changes, and nothing will be push into the history.
	          // Any mutations made without `scribe.getContent` will be pushed into the history normally.

	          // Pass content through formatters, place caret back
	          scribe.transactionManager.run(runFormatters);
	        }

	        delete scribe._skipFormatters;
	      }.bind(scribe);

	      observeDomChanges(scribe.el, applyFormatters);

	      // TODO: disconnect on tear down:
	      // observer.disconnect();

	      /**
	       * If the paragraphs option is set to true, we need to manually handle
	       * keyboard navigation inside a heading to ensure a P element is created.
	       */
	      if (scribe.allowsBlockElements()) {
	        scribe.el.addEventListener('keydown', function (event) {
	          if (event.keyCode === 13) { // enter

	            var selection = new scribe.api.Selection();
	            var range = selection.range;

	            var headingNode = selection.getContaining(function (node) {
	              return (/^(H[1-6])$/).test(node.nodeName);
	            });

	            /**
	             * If we are at the end of the heading, insert a P. Otherwise handle
	             * natively.
	             */
	            if (headingNode && range.collapsed) {
	              var contentToEndRange = range.cloneRange();
	              contentToEndRange.setEndAfter(headingNode, 0);

	              // Get the content from the range to the end of the heading
	              var contentToEndFragment = contentToEndRange.cloneContents();

	              if (contentToEndFragment.firstChild.textContent === '') {
	                event.preventDefault();

	                scribe.transactionManager.run(function () {
	                  // Default P
	                  // TODO: Abstract somewhere
	                  var pNode = document.createElement('p');
	                  var brNode = document.createElement('br');
	                  pNode.appendChild(brNode);

	                  headingNode.parentNode.insertBefore(pNode, headingNode.nextElementSibling);

	                  // Re-apply range
	                  range.setStart(pNode, 0);
	                  range.setEnd(pNode, 0);

	                  selection.selection.removeAllRanges();
	                  selection.selection.addRange(range);
	                });
	              }
	            }
	          }
	        });
	      }

	      /**
	       * If the paragraphs option is set to true, we need to manually handle
	       * keyboard navigation inside list item nodes.
	       */
	      if (scribe.allowsBlockElements()) {
	        scribe.el.addEventListener('keydown', function (event) {
	          if (event.keyCode === 13 || event.keyCode === 8) { // enter || backspace

	            var selection = new scribe.api.Selection();
	            var range = selection.range;

	            if (range.collapsed) {
	              var containerLIElement = selection.getContaining(function (node) {
	                return node.nodeName === 'LI';
	              });
	              if (containerLIElement && containerLIElement.textContent.trim() === '') {
	                /**
	                 * LIs
	                 */

	                event.preventDefault();

	                var listNode = selection.getContaining(function (node) {
	                  return node.nodeName === 'UL' || node.nodeName === 'OL';
	                });

	                var command = scribe.getCommand(listNode.nodeName === 'OL' ? 'insertOrderedList' : 'insertUnorderedList');

	                command.event = event;

	                command.execute();
	              }
	            }
	          }
	        });
	      }

	      /**
	       * We have to hijack the paste event to ensure it uses
	       * `scribe.insertHTML`, which executes the Scribe version of the command
	       * and also runs the formatters.
	       */

	      /**
	       * TODO: could we implement this as a polyfill for `event.clipboardData` instead?
	       * I also don't like how it has the authority to perform `event.preventDefault`.
	       */

	      scribe.el.addEventListener('paste', function handlePaste(event) {
	        /**
	         * Browsers without the Clipboard API (specifically `ClipboardEvent.clipboardData`)
	         * will execute the second branch here.
	         *
	         * Chrome on android provides `ClipboardEvent.clipboardData` but the types array is not filled
	         */
	        if (event.clipboardData && event.clipboardData.types.length > 0) {
	          event.preventDefault();

	          if (Immutable.List(event.clipboardData.types).includes('text/html')) {
	            scribe.insertHTML(event.clipboardData.getData('text/html'));
	          } else {
	            scribe.insertPlainText(event.clipboardData.getData('text/plain'));
	          }
	        } else {
	          /**
	           * If the browser doesn't have `ClipboardEvent.clipboardData`, we run through a
	           * sequence of events:
	           *
	           *   - Save the text selection
	           *   - Focus another, hidden textarea so we paste there
	           *   - Copy the pasted content of said textarea
	           *   - Give focus back to the scribe
	           *   - Restore the text selection
	           *
	           * This is required because, without access to the Clipboard API, there is literally
	           * no other way to manipulate content on paste.
	           * As per: https://github.com/jejacks0n/mercury/issues/23#issuecomment-2308347
	           *
	           * Firefox <= 21
	           * https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent.clipboardData
	           */

	          var selection = new scribe.api.Selection();

	          // Store the caret position
	          selection.placeMarkers();

	          var bin = document.createElement('div');
	          document.body.appendChild(bin);
	          bin.setAttribute('contenteditable', true);
	          bin.focus();

	          // Wait for the paste to happen (next loop?)
	          setTimeout(function () {
	            var data = bin.innerHTML;
	            bin.parentNode.removeChild(bin);

	            // Restore the caret position
	            selection.selectMarkers();
	            /**
	             * Firefox 19 (and maybe others): even though the applied range
	             * exists within the Scribe instance, we need to focus it.
	             */
	            scribe.el.focus();

	            scribe.insertHTML(data);
	          }, 1);
	        }
	      });

	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(167),
	  __webpack_require__(178)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (nodeHelpers, mutations) {

	  var maybeWindow = typeof window === 'object' ? window : undefined;

	  var MutationObserver = mutations.determineMutationObserver(maybeWindow);

	  function hasRealMutation(n) {
	    return ! nodeHelpers.isEmptyTextNode(n) &&
	      ! nodeHelpers.isSelectionMarkerNode(n);
	  }

	  function includeRealMutations(mutations) {
	    return mutations.some(function(mutation) {
	      return Array.prototype.some.call(mutation.addedNodes, hasRealMutation) ||
	        Array.prototype.some.call(mutation.removedNodes, hasRealMutation);
	    });
	  }

	  function observeDomChanges(el, callback) {
	    // Flag to avoid running recursively
	    var runningPostMutation = false;

	    var observer = new MutationObserver(function(mutations) {
	      if (! runningPostMutation && includeRealMutations(mutations)) {
	        runningPostMutation = true;

	        try {
	          callback();
	        } catch(e) {
	          // The catch block is required but we don't want to swallow the error
	          throw e;
	        } finally {
	          // We must yield to let any mutation we caused be triggered
	          // in the next cycle
	          setTimeout(function() {
	            runningPostMutation = false;
	          }, 0);
	        }
	      }
	    });

	    observer.observe(el, {
	      childList: true,
	      subtree: true
	    });

	    return observer;
	  }

	  return observeDomChanges;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  function determineMutationObserver(window) {
	    // This enables server side rendering
	    if (typeof window === 'undefined') {
	      // Stub observe function to avoid error
	      return function() {
	        return {
	          observe: function() {}
	        };
	      }
	    } else {
	      return window.MutationObserver ||
	        window.WebKitMutationObserver ||
	        window.MozMutationObserver;
	    }
	  }

	  return {
	    determineMutationObserver: determineMutationObserver
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(180),
	  __webpack_require__(181),
	  __webpack_require__(182),
	  __webpack_require__(183),
	  __webpack_require__(184),
	  __webpack_require__(185),
	  __webpack_require__(186)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  boldCommand,
	  indentCommand,
	  insertHTMLCommand,
	  insertListCommands,
	  outdentCommand,
	  createLinkCommand,
	  events
	) {

	  /**
	   * Command patches browser inconsistencies. They do not perform core features
	   * of the editor, such as ensuring P elements are created when
	   * applying/unapplying commands — that is the job of the core commands.
	   */

	  'use strict';

	  return {
	    commands: {
	      bold: boldCommand,
	      indent: indentCommand,
	      insertHTML: insertHTMLCommand,
	      insertList: insertListCommands,
	      outdent: outdentCommand,
	      createLink: createLinkCommand,
	    },
	    events: events
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var boldCommand = new scribe.api.CommandPatch('bold');

	      /**
	       * Chrome: Executing the bold command inside a heading corrupts the markup.
	       * Disabling for now.
	       */
	      boldCommand.queryEnabled = function () {
	        var selection = new scribe.api.Selection();
	        var headingNode = selection.getContaining(function (node) {
	          return (/^(H[1-6])$/).test(node.nodeName);
	        });

	        return scribe.api.CommandPatch.prototype.queryEnabled.apply(this, arguments) && ! headingNode;
	      };

	      // TODO: We can't use STRONGs because this would mean we have to
	      // re-implement the `queryState` command, which would be difficult.

	      scribe.commandPatches.bold = boldCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * Prevent Chrome from inserting BLOCKQUOTEs inside of Ps, and also from
	   * adding a redundant `style` attribute to the created BLOCKQUOTE.
	   */

	  'use strict';

	  var INVISIBLE_CHAR = '\uFEFF';

	  return function () {
	    return function (scribe) {
	      var indentCommand = new scribe.api.CommandPatch('indent');

	      indentCommand.execute = function (value) {
	        scribe.transactionManager.run(function () {
	          /**
	           * Chrome: If we apply the indent command on an empty P, the
	           * BLOCKQUOTE will be nested inside the P.
	           * As per: http://jsbin.com/oDOriyU/3/edit?html,js,output
	           */
	          var selection = new scribe.api.Selection();
	          var range = selection.range;

	          var isCaretOnNewLine =
	              (range.commonAncestorContainer.nodeName === 'P'
	               && range.commonAncestorContainer.innerHTML === '<br>');
	          if (isCaretOnNewLine) {
	            // FIXME: this text node is left behind. Tidy it up somehow,
	            // or don't use it at all.
	            var textNode = document.createTextNode(INVISIBLE_CHAR);

	            range.insertNode(textNode);

	            range.setStart(textNode, 0);
	            range.setEnd(textNode, 0);

	            selection.selection.removeAllRanges();
	            selection.selection.addRange(range);
	          }

	          scribe.api.CommandPatch.prototype.execute.call(this, value);

	          /**
	           * Chrome: The BLOCKQUOTE created contains a redundant style attribute.
	           * As per: http://jsbin.com/AkasOzu/1/edit?html,js,output
	           */

	          // Renew the selection
	          selection = new scribe.api.Selection();
	          var blockquoteNode = selection.getContaining(function (node) {
	            return node.nodeName === 'BLOCKQUOTE';
	          });

	          if (blockquoteNode) {
	            blockquoteNode.removeAttribute('style');
	          }
	        }.bind(this));
	      };

	      scribe.commandPatches.indent = indentCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	  "use strict";
	  return function () {
	    return function (scribe) {
	      var insertHTMLCommandPatch = new scribe.api.CommandPatch('insertHTML');
	      var nodeHelpers = scribe.node;

	      insertHTMLCommandPatch.execute = function (value) {
	        scribe.transactionManager.run(function () {
	          scribe.api.CommandPatch.prototype.execute.call(this, value);
	          nodeHelpers.removeChromeArtifacts(scribe.el);
	        }.bind(this));
	      };

	      scribe.commandPatches.insertHTML = insertHTMLCommandPatch;
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;

	      var InsertListCommandPatch = function (commandName) {
	        scribe.api.CommandPatch.call(this, commandName);
	      };

	      InsertListCommandPatch.prototype = Object.create(scribe.api.CommandPatch.prototype);
	      InsertListCommandPatch.prototype.constructor = InsertListCommandPatch;

	      InsertListCommandPatch.prototype.execute = function (value) {
	        scribe.transactionManager.run(function () {
	          scribe.api.CommandPatch.prototype.execute.call(this, value);

	          if (this.queryState()) {
	            var selection = new scribe.api.Selection();

	            var listElement = selection.getContaining(function (node) {
	              return node.nodeName === 'OL' || node.nodeName === 'UL';
	            });

	            /**
	             * Firefox: If we apply the insertOrderedList or the insertUnorderedList
	             * command on an empty block, a P will be inserted after the OL/UL.
	             * As per: http://jsbin.com/cubacoli/3/edit?html,js,output
	             */

	            if (listElement.nextElementSibling &&
	                listElement.nextElementSibling.childNodes.length === 0) {
	              nodeHelpers.removeNode(listElement.nextElementSibling);
	            }

	            /**
	             * Chrome: If we apply the insertOrderedList or the insertUnorderedList
	             * command on an empty block, the OL/UL will be nested inside the block.
	             * As per: http://jsbin.com/eFiRedUc/1/edit?html,js,output
	             */

	            if (listElement) {
	              var listParentNode = listElement.parentNode;
	              // If list is within a text block then split that block
	              if (listParentNode && /^(H[1-6]|P)$/.test(listParentNode.nodeName)) {
	                selection.placeMarkers();
	                // Move listElement out of the block
	                nodeHelpers.insertAfter(listElement, listParentNode);
	                selection.selectMarkers();

	                /**
	                 * Chrome 27-34: An empty text node is inserted.
	                 */
	                if (listParentNode.childNodes.length === 2 &&
	                    nodeHelpers.isEmptyTextNode(listParentNode.firstChild)) {
	                  nodeHelpers.removeNode(listParentNode);
	                }

	                // Remove the block if it's empty
	                if (listParentNode.childNodes.length === 0) {
	                  nodeHelpers.removeNode(listParentNode);
	                }
	              }
	            }

	            nodeHelpers.removeChromeArtifacts(listElement);
	          }
	        }.bind(this));
	      };

	      InsertListCommandPatch.prototype.queryState = function() {
	        try {
	          return scribe.api.CommandPatch.prototype.queryState.apply(this, arguments);
	        } catch (err) {
	          // Explicitly catch unexpected error when calling queryState - bug in Firefox: https://github.com/guardian/scribe/issues/208
	          if (err.name == 'NS_ERROR_UNEXPECTED') {
	            return false;
	          } else {
	            throw err;
	          }
	        }
	      };

	      scribe.commandPatches.insertOrderedList = new InsertListCommandPatch('insertOrderedList');
	      scribe.commandPatches.insertUnorderedList = new InsertListCommandPatch('insertUnorderedList');
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * Prevent Chrome from removing formatting of BLOCKQUOTE contents.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;
	      var outdentCommand = new scribe.api.CommandPatch('outdent');

	      outdentCommand.execute = function () {
	        scribe.transactionManager.run(function () {
	          var selection = new scribe.api.Selection();
	          var range = selection.range;

	          var blockquoteNode = selection.getContaining(function (node) {
	            return node.nodeName === 'BLOCKQUOTE';
	          });

	          if (range.commonAncestorContainer.nodeName === 'BLOCKQUOTE') {
	            /**
	             * Chrome: Applying the outdent command when a whole BLOCKQUOTE is
	             * selected removes the formatting of its contents.
	             * As per: http://jsbin.com/okAYaHa/1/edit?html,js,output
	             */

	            // Insert a copy of the selection before the BLOCKQUOTE, and then
	            // restore the selection on the copy.
	            selection.placeMarkers();
	            // We want to copy the selected nodes *with* the markers
	            selection.selectMarkers(true);
	            var selectedNodes = range.cloneContents();
	            blockquoteNode.parentNode.insertBefore(selectedNodes, blockquoteNode);
	            range.deleteContents();
	            selection.selectMarkers();

	            // Delete the BLOCKQUOTE if it's empty
	            if (blockquoteNode.textContent === '') {
	              blockquoteNode.parentNode.removeChild(blockquoteNode);
	            }
	          } else {
	            /**
	             * Chrome: If we apply the outdent command on a P, the contents of the
	             * P will be outdented instead of the whole P element.
	             * As per: http://jsbin.com/IfaRaFO/1/edit?html,js,output
	             */

	            var pNode = selection.getContaining(function (node) {
	              return node.nodeName === 'P';
	            });

	            if (pNode) {
	              /**
	               * If we are not at the start of end of a BLOCKQUOTE, we have to
	               * split the node and insert the P in the middle.
	               */

	              var nextSiblingNodes = nodeHelpers.nextSiblings(pNode);

	              if (!!nextSiblingNodes.size) {
	                var newContainerNode = document.createElement(blockquoteNode.nodeName);

	                while (!!nextSiblingNodes.size) {
	                  newContainerNode.appendChild(nextSiblingNodes.first());
	                  nextSiblingNodes = nextSiblingNodes.shift();
	                }

	                blockquoteNode.parentNode.insertBefore(newContainerNode, blockquoteNode.nextElementSibling);
	              }

	              selection.placeMarkers();
	              blockquoteNode.parentNode.insertBefore(pNode, blockquoteNode.nextElementSibling);
	              selection.selectMarkers();

	              // If the BLOCKQUOTE is now empty, clean it up.
	              if (blockquoteNode.innerHTML === '') {
	                blockquoteNode.parentNode.removeChild(blockquoteNode);
	              }
	            } else {
	              scribe.api.CommandPatch.prototype.execute.call(this);
	            }
	          }
	        }.bind(this));
	      };

	      scribe.commandPatches.outdent = outdentCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var createLinkCommand = new scribe.api.CommandPatch('createLink');
	      scribe.commandPatches.createLink = createLinkCommand;

	      createLinkCommand.execute = function (value) {
	        var selection = new scribe.api.Selection();

	        /**
	         * Firefox does not create a link when selection is collapsed
	         * so we create it manually. http://jsbin.com/tutufi/2/edit?js,output
	         */
	        // using range.collapsed vs selection.isCollapsed - https://code.google.com/p/chromium/issues/detail?id=447523
	        if (selection.range.collapsed) {
	          var aElement = document.createElement('a');
	          aElement.setAttribute('href', value);
	          aElement.textContent = value;

	          selection.range.insertNode(aElement);

	          // Select the created link
	          var newRange = document.createRange();
	          newRange.setStartBefore(aElement);
	          newRange.setEndAfter(aElement);

	          selection.selection.removeAllRanges();
	          selection.selection.addRange(newRange);
	        } else {
	          scribe.api.CommandPatch.prototype.execute.call(this, value);
	        }
	      };
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      // TODO: do we need to run this on every key press, or could we
	      //       detect when the issue may have occurred?
	      // TODO: run in a transaction so as to record the change? how do
	      //       we know in advance whether there will be a change though?
	      // TODO: share somehow with `InsertList` command

	      var nodeHelpers = scribe.node;

	      if (scribe.allowsBlockElements()) {
	        scribe.el.addEventListener('keyup', function (event) {
	          if (event.keyCode === 8 || event.keyCode === 46) { // backspace or delete

	            var selection = new scribe.api.Selection();

	            // Note: the range is always collapsed on keyup here
	            var containerPElement = selection.getContaining(function (node) {
	              return node.nodeName === 'P';
	            });
	            if (containerPElement) {
	              /**
	               * The 'input' event listener has already triggered
	               * and recorded the faulty content as an item in the
	               * UndoManager. We interfere with the undoManager
	               * by force merging that transaction with the next
	               * transaction which produce a clean one instead.
	               *
	               * FIXME: ideally we would not trigger a
	               * 'content-changed' event with faulty HTML at all, but
	               * it's too late to cancel it at this stage (and it's
	               * not happened yet at keydown time).
	               */

	              scribe.transactionManager.run(function () {
	                // Store the caret position
	                selection.placeMarkers();
	                nodeHelpers.removeChromeArtifacts(containerPElement);
	                selection.selectMarkers();
	              }, true);
	            }
	          }
	        });
	      }
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(188),
	  __webpack_require__(189),
	  __webpack_require__(190),
	  __webpack_require__(191)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  buildCommandPatch,
	  buildCommand,
	  buildSelection,
	  buildSimpleCommand
	) {

	  'use strict';

	  return function Api(scribe) {
	    this.CommandPatch = buildCommandPatch(scribe);
	    this.Command = buildCommand(scribe);
	    this.Selection = buildSelection(scribe);
	    this.SimpleCommand = buildSimpleCommand(this, scribe);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function (scribe) {
	    function CommandPatch(commandName) {
	      this.commandName = commandName;
	    }

	    CommandPatch.prototype.execute = function (value) {
	      scribe.transactionManager.run(function () {
	        document.execCommand(this.commandName, false, value || null);
	      }.bind(this));
	    };

	    CommandPatch.prototype.queryState = function () {
	      return document.queryCommandState(this.commandName);
	    };

	    CommandPatch.prototype.queryEnabled = function () {
	      return document.queryCommandEnabled(this.commandName);
	    };

	    return CommandPatch;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function (scribe) {
	    function Command(commandName) {
	      this.commandName = commandName;
	      this.patch = scribe.commandPatches[this.commandName];
	    }

	    Command.prototype.execute = function (value) {
	      if (this.patch) {
	        this.patch.execute(value);
	      } else {
	        scribe.transactionManager.run(function () {
	          document.execCommand(this.commandName, false, value || null);
	        }.bind(this));
	      }
	    };

	    Command.prototype.queryState = function () {
	      if (this.patch) {
	        return this.patch.queryState();
	      } else {
	        return document.queryCommandState(this.commandName);
	      }
	    };

	    Command.prototype.queryEnabled = function () {
	      if (this.patch) {
	        return this.patch.queryEnabled();
	      } else {
	        return document.queryCommandEnabled(this.commandName);
	      }
	    };

	    return Command;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function (scribe) {
	    var rootDoc = scribe.el.ownerDocument;
	    var nodeHelpers = scribe.node;

	    // find the parent document or document fragment
	    if( rootDoc.compareDocumentPosition(scribe.el) & Node.DOCUMENT_POSITION_DISCONNECTED ) {
	      var currentElement = scribe.el.parentNode;
	      while(currentElement && nodeHelpers.isFragment(currentElement)) {
	        currentElement = currentElement.parentNode;
	      }

	      // if we found a document fragment and it has a getSelection method, set it to the root doc
	      if (currentElement && currentElement.getSelection) {
	        rootDoc = currentElement;
	      }
	    }

	    function createMarker() {
	      var node = document.createElement('em');
	      node.style.display = 'none';
	      node.classList.add('scribe-marker');
	      return node;
	    }

	    function insertMarker(range, marker) {
	      range.insertNode(marker);

	      /**
	       * Chrome and Firefox: `Range.insertNode` inserts a bogus text node after
	       * the inserted element. We just remove it. This in turn creates several
	       * bugs when perfoming commands on selections that contain an empty text
	       * node (`removeFormat`, `unlink`).
	       * As per: http://jsbin.com/hajim/5/edit?js,console,output
	       */
	      if (marker.nextSibling && nodeHelpers.isEmptyTextNode(marker.nextSibling)) {
	        nodeHelpers.removeNode(marker.nextSibling);
	      }

	      /**
	       * Chrome and Firefox: `Range.insertNode` inserts a bogus text node before
	       * the inserted element when the child element is at the start of a block
	       * element. We just remove it.
	       * FIXME: Document why we need to remove this
	       * As per: http://jsbin.com/sifez/1/edit?js,console,output
	       */
	      if (marker.previousSibling && nodeHelpers.isEmptyTextNode(marker.previousSibling)) {
	        nodeHelpers.removeNode(marker.previousSibling);
	      }
	    }

	    /**
	     * Wrapper for object holding currently selected text.
	     */
	    function Selection() {
	      this.selection = rootDoc.getSelection();
	      if (this.selection.rangeCount && this.selection.anchorNode) {
	        var startNode   = this.selection.anchorNode;
	        var startOffset = this.selection.anchorOffset;
	        var endNode     = this.selection.focusNode;
	        var endOffset   = this.selection.focusOffset;

	        // if the range starts and ends on the same node, then we must swap the
	        // offsets if ever focusOffset is smaller than anchorOffset
	        if (startNode === endNode && endOffset < startOffset) {
	          var tmp = startOffset;
	          startOffset = endOffset;
	          endOffset = tmp;
	        }
	        // if the range ends *before* it starts, then we must reverse the range
	        else if (nodeHelpers.isBefore(endNode, startNode)) {
	          var tmpNode = startNode,
	            tmpOffset = startOffset;
	          startNode = endNode;
	          startOffset = endOffset;
	          endNode = tmpNode;
	          endOffset = tmpOffset;
	        }

	        // create the range to avoid chrome bug from getRangeAt / window.getSelection()
	        // https://code.google.com/p/chromium/issues/detail?id=380690
	        this.range = document.createRange();
	        this.range.setStart(startNode, startOffset);
	        this.range.setEnd(endNode, endOffset);
	      }
	    }

	    /**
	     * @returns Closest ancestor Node satisfying nodeFilter. Undefined if none exist before reaching Scribe container.
	     */
	    Selection.prototype.getContaining = function (nodeFilter) {
	      var range = this.range;
	      if (!range) { return; }

	      var node = this.range.commonAncestorContainer;
	      return ! (node && scribe.el === node) && nodeFilter(node) ?
	        node :
	        nodeHelpers.getAncestor(node, scribe.el, nodeFilter);
	    };

	    Selection.prototype.placeMarkers = function () {
	      var range = this.range;
	      if (!range) {
	        return;
	      }

	      //we need to ensure that the scribe's element lives within the current document to avoid errors with the range comparison (see below)
	      //one way to do this is to check if it's visible (is this the best way?).
	      if (!document.contains(scribe.el)) {
	        return;
	      }

	      //we want to ensure that the current selection is within the current scribe node
	      //if this isn't true scribe will place markers within the selections parent
	      //we want to ensure that scribe ONLY places markers within it's own element
	      if (scribe.el.contains(range.startContainer) && scribe.el.contains(range.endContainer)) {
	        // insert start marker
	        insertMarker(range.cloneRange(), createMarker());

	        if (! range.collapsed ) {
	          // End marker
	          var rangeEnd = range.cloneRange();
	          rangeEnd.collapse(false);
	          insertMarker(rangeEnd, createMarker());
	        }

	        this.selection.removeAllRanges();
	        this.selection.addRange(range);
	      }
	    };

	    Selection.prototype.getMarkers = function () {
	      return scribe.el.querySelectorAll('em.scribe-marker');
	    };

	    Selection.prototype.removeMarkers = function () {
	      Array.prototype.forEach.call(this.getMarkers(), function (marker) {
	        var markerParent = marker.parentNode;
	        nodeHelpers.removeNode(marker);
	        // Placing the markers may have split a text node. Sew it up, otherwise
	        // if the user presses space between the nodes the browser will insert
	        // an `&nbsp;` and that will cause word wrapping issues.
	        markerParent.normalize();
	      });
	    };

	    // This will select markers if there are any. You will need to focus the
	    // Scribe instance’s element if it is not already for the selection to
	    // become active.
	    Selection.prototype.selectMarkers = function (keepMarkers) {
	      var markers = this.getMarkers();
	      if (!markers.length) {
	        return;
	      }

	      var newRange = document.createRange();

	      newRange.setStartBefore(markers[0]);
	      // We always reset the end marker because otherwise it will just
	      // use the current range’s end marker.
	      newRange.setEndAfter(markers.length >= 2 ? markers[1] : markers[0]);

	      if (! keepMarkers) {
	        this.removeMarkers();
	      }

	      this.selection.removeAllRanges();
	      this.selection.addRange(newRange);
	    };

	    Selection.prototype.isCaretOnNewLine = function () {
	      var containerPElement = this.getContaining(function (node) {
	        return node.nodeName === 'P';
	      });
	      return !! containerPElement && nodeHelpers.isEmptyInlineElement(containerPElement);
	    };

	    return Selection;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function (api, scribe) {
	    function SimpleCommand(commandName, nodeName) {
	      scribe.api.Command.call(this, commandName);

	      this._nodeName = nodeName;
	    }

	    SimpleCommand.prototype = Object.create(api.Command.prototype);
	    SimpleCommand.prototype.constructor = SimpleCommand;

	    SimpleCommand.prototype.queryState = function () {
	      var selection = new scribe.api.Selection();
	      return scribe.api.Command.prototype.queryState.call(this) && !! selection.getContaining(function (node) {
	        return node.nodeName === this._nodeName;
	      }.bind(this));
	    };

	    return SimpleCommand;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(193),
	  __webpack_require__(194),
	  __webpack_require__(195),
	  __webpack_require__(196),
	  __webpack_require__(197),
	  __webpack_require__(198),
	  __webpack_require__(199)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  indent,
	  insertList,
	  outdent,
	  redo,
	  subscript,
	  superscript,
	  undo
	) {

	  'use strict';

	  return {
	    indent: indent,
	    insertList: insertList,
	    outdent: outdent,
	    redo: redo,
	    subscript: subscript,
	    superscript: superscript,
	    undo: undo
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var indentCommand = new scribe.api.Command('indent');

	      indentCommand.queryEnabled = function () {
	        /**
	         * FIXME: Chrome nests ULs inside of ULs
	         * Currently we just disable the command when the selection is inside of
	         * a list.
	         * As per: http://jsbin.com/ORikUPa/3/edit?html,js,output
	         */
	        var selection = new scribe.api.Selection();
	        var listElement = selection.getContaining(function (element) {
	          return element.nodeName === 'UL' || element.nodeName === 'OL';
	        });

	        return scribe.api.Command.prototype.queryEnabled.call(this) && scribe.allowsBlockElements() && ! listElement;
	      };

	      scribe.commands.indent = indentCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(165)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {

	  /**
	   * If the paragraphs option is set to true, then when the list is
	   * unapplied, ensure that we enter a P element.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;

	      var InsertListCommand = function (commandName) {
	        scribe.api.Command.call(this, commandName);
	      };

	      InsertListCommand.prototype = Object.create(scribe.api.Command.prototype);
	      InsertListCommand.prototype.constructor = InsertListCommand;

	      InsertListCommand.prototype.execute = function (value) {
	        function splitList(listItemElements) {
	          if (!!listItemElements.size) {
	            var newListNode = document.createElement(listNode.nodeName);

	            while (!!listItemElements.size) {
	              newListNode.appendChild(listItemElements.first());
	              listItemElements = listItemElements.shift();
	            }

	            listNode.parentNode.insertBefore(newListNode, listNode.nextElementSibling);
	          }
	        }

	        if (this.queryState()) {
	          var selection = new scribe.api.Selection();
	          var range = selection.range;

	          var listNode = selection.getContaining(function (node) {
	            return node.nodeName === 'OL' || node.nodeName === 'UL';
	          });

	          var listItemElement = selection.getContaining(function (node) {
	            return node.nodeName === 'LI';
	          });

	          scribe.transactionManager.run(function () {
	            if (listItemElement) {
	              var nextListItemElements = nodeHelpers.nextSiblings(listItemElement);

	              /**
	               * If we are not at the start or end of a UL/OL, we have to
	               * split the node and insert the P(s) in the middle.
	               */
	              splitList(nextListItemElements);

	              /**
	               * Insert a paragraph in place of the list item.
	               */

	              selection.placeMarkers();

	              var pNode = document.createElement('p');
	              pNode.innerHTML = listItemElement.innerHTML;

	              listNode.parentNode.insertBefore(pNode, listNode.nextElementSibling);
	              listItemElement.parentNode.removeChild(listItemElement);
	            } else {
	              /**
	               * When multiple list items are selected, we replace each list
	               * item with a paragraph.
	               */

	              // We can't query for list items in the selection so we loop
	              // through them all and find the intersection ourselves.
	              var selectedListItemElements = Immutable.List(listNode.querySelectorAll('li'))
	                .filter(function (listItemElement) {
	                  return range.intersectsNode(listItemElement);
	                });
	              var lastSelectedListItemElement = selectedListItemElements.last();
	              var listItemElementsAfterSelection = nodeHelpers.nextSiblings(lastSelectedListItemElement);

	              /**
	               * If we are not at the start or end of a UL/OL, we have to
	               * split the node and insert the P(s) in the middle.
	               */
	              splitList(listItemElementsAfterSelection);

	              // Store the caret/range positioning inside of the list items so
	              // we can restore it from the newly created P elements soon
	              // afterwards.
	              selection.placeMarkers();

	              var documentFragment = document.createDocumentFragment();
	              selectedListItemElements.forEach(function (listItemElement) {
	                var pElement = document.createElement('p');
	                pElement.innerHTML = listItemElement.innerHTML;
	                documentFragment.appendChild(pElement);
	              });

	              // Insert the Ps
	              listNode.parentNode.insertBefore(documentFragment, listNode.nextElementSibling);

	              // Remove the LIs
	              selectedListItemElements.forEach(function (listItemElement) {
	                listItemElement.parentNode.removeChild(listItemElement);
	              });
	            }

	            // If the list is now empty, clean it up.
	            if (listNode.childNodes.length === 0) {
	              listNode.parentNode.removeChild(listNode);
	            }

	            selection.selectMarkers();
	          }.bind(this));
	        } else {
	          scribe.api.Command.prototype.execute.call(this, value);
	        }
	      };

	      InsertListCommand.prototype.queryEnabled = function () {
	        return scribe.api.Command.prototype.queryEnabled.call(this) && scribe.allowsBlockElements();
	      };

	      scribe.commands.insertOrderedList = new InsertListCommand('insertOrderedList');
	      scribe.commands.insertUnorderedList = new InsertListCommand('insertUnorderedList');
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var outdentCommand = new scribe.api.Command('outdent');

	      outdentCommand.queryEnabled = function () {
	        /**
	         * FIXME: If the paragraphs option is set to true, then when the
	         * list is unapplied, ensure that we enter a P element.
	         * Currently we just disable the command when the selection is inside of
	         * a list.
	         */
	        var selection = new scribe.api.Selection();
	        var listElement = selection.getContaining(function (element) {
	          return element.nodeName === 'UL' || element.nodeName === 'OL';
	        });

	        // FIXME: define block element rule here?
	        return scribe.api.Command.prototype.queryEnabled.call(this) && scribe.allowsBlockElements() && ! listElement;
	      };

	      scribe.commands.outdent = outdentCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var redoCommand = new scribe.api.Command('redo');

	      redoCommand.execute = function () {
	        scribe.undoManager.redo();
	      };

	      redoCommand.queryEnabled = function () {
	        return scribe.undoManager.position > 0;
	      };

	      scribe.commands.redo = redoCommand;

	      //is scribe is configured to undo assign listener
	      if (scribe.options.undo.enabled) {
	        scribe.el.addEventListener('keydown', function (event) {
	          if (event.shiftKey && (event.metaKey || event.ctrlKey) && event.keyCode === 90) {
	            event.preventDefault();
	            redoCommand.execute();
	          }
	        });
	      }
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var subscriptCommand = new scribe.api.Command('subscript');

	      scribe.commands.subscript = subscriptCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var superscriptCommand = new scribe.api.Command('superscript');

	      scribe.commands.superscript = superscriptCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var undoCommand = new scribe.api.Command('undo');

	      undoCommand.execute = function () {
	        scribe.undoManager.undo();
	      };

	      undoCommand.queryEnabled = function () {
	        return scribe.undoManager.position < scribe.undoManager.length;
	      };

	      scribe.commands.undo = undoCommand;

	      if (scribe.options.undo.enabled) {
	        scribe.el.addEventListener('keydown', function (event) {
	          // TODO: use lib to abstract meta/ctrl keys?
	          if (! event.shiftKey && (event.metaKey || event.ctrlKey) && event.keyCode === 90) {
	            event.preventDefault();
	            undoCommand.execute();
	          }
	        });
	      }
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(165)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {
	  'use strict';

	  function UndoManager(limit, undoScopeHost) {
	    this._stack = Immutable.List();
	    this._limit = limit;
	    this._fireEvent = typeof CustomEvent != 'undefined' && undoScopeHost && undoScopeHost.dispatchEvent;
	    this._ush = undoScopeHost;

	    this.position = 0;
	    this.length = 0;
	  }

	  UndoManager.prototype.transact = function (transaction, merge) {
	    if (arguments.length < 2) {
	      throw new TypeError('Not enough arguments to UndoManager.transact.');
	    }

	    transaction.execute();

	    if (this.position > 0) {
	      this.clearRedo();
	    }

	    var transactions;
	    if (merge && this.length) {
	      transactions = this._stack.first().push(transaction);
	      this._stack = this._stack.shift().unshift(transactions);
	    }
	    else {
	      transactions = Immutable.List.of(transaction);
	      this._stack = this._stack.unshift(transactions);
	      this.length++;

	      if (this._limit && this.length > this._limit) {
	        this.clearUndo(this._limit);
	      }
	    }

	    this._dispatch('DOMTransaction', transactions);
	  };

	  UndoManager.prototype.undo = function () {
	    if (this.position >= this.length) { return; }

	    var transactions = this._stack.get(this.position);
	    var i = transactions.size;
	    while (i--) {
	      transactions.get(i).undo();
	    }
	    this.position++;

	    this._dispatch('undo', transactions);
	  };

	  UndoManager.prototype.redo = function () {
	    if (this.position === 0) { return; }

	    this.position--;
	    var transactions = this._stack.get(this.position);
	    for (var i = 0; i < transactions.size; i++) {
	      transactions.get(i).redo();
	    }

	    this._dispatch('redo', transactions);
	  };

	  UndoManager.prototype.item = function (index) {
	    return index >= 0 && index < this.length ?
	      this._stack.get(index).toArray() :
	      null;
	  };

	  UndoManager.prototype.clearUndo = function (position) {
	    this._stack = this._stack.take(position !== undefined ? position : this.position);
	    this.length = this._stack.size;
	  };

	  UndoManager.prototype.clearRedo = function () {
	    this._stack = this._stack.skip(this.position);
	    this.length = this._stack.size;
	    this.position = 0;
	  };

	  UndoManager.prototype._dispatch = function(event, transactions) {
	    if (this._fireEvent) {
	      this._ush.dispatchEvent(new CustomEvent(event, {
	        detail: {transactions: transactions.toArray()},
	        bubbles: true,
	        cancelable: false
	      }));
	    }
	  }

	  return UndoManager;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(165)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {

	  'use strict';

	  // TODO: once
	  // TODO: unit test
	  // Good example of a complete(?) implementation: https://github.com/Wolfy87/EventEmitter
	  function EventEmitter() {
	    this._listeners = {};
	  }

	  EventEmitter.prototype.on = function (eventName, fn) {
	    var listeners = this._listeners[eventName] || Immutable.Set();

	    this._listeners[eventName] = listeners.add(fn);
	  };

	  EventEmitter.prototype.off = function (eventName, fn) {
	    var listeners = this._listeners[eventName] || Immutable.Set();
	    if (fn) {
	      this._listeners[eventName] = listeners.delete(fn);
	    } else {
	      this._listeners[eventName] = listeners.clear();
	    }
	  };

	  EventEmitter.prototype.trigger = function (eventName, args) {

	    //fire events like my:custom:event -> my:custom -> my
	    var events = eventName.split(':');
	    while(!!events.length){
	      var currentEvent = events.join(':');
	      var listeners = this._listeners[currentEvent] || Immutable.Set();
	      //trigger handles
	      listeners.forEach(function (listener) {
	        listener.apply(null, args);
	      });
	      events.splice((events.length - 1), 1);
	    }
	  };

	  return EventEmitter;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(203)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (defaults) {

	  var blockModePlugins = [
	    'setRootPElement',
	    'enforcePElements',
	    'ensureSelectableContainers',
	  ],
	  inlineModePlugins = [
	    'inlineElementsMode'
	  ],
	  defaultOptions = {
	    allowBlockElements: true,
	    debug: false,
	    undo: {
	      manager: false,
	      enabled: true,
	      limit: 100,
	      interval: 250
	    },
	    defaultCommandPatches: [
	      'bold',
	      'indent',
	      'insertHTML',
	      'insertList',
	      'outdent',
	      'createLink'
	    ],

	    defaultPlugins: blockModePlugins.concat(inlineModePlugins),

	    defaultFormatters: [
	      'escapeHtmlCharactersFormatter',
	      'replaceNbspCharsFormatter'
	    ]
	  };

	  /**
	   * Overrides defaults with user's options
	   *
	   * @param  {Object} userSuppliedOptions The user's options
	   * @return {Object}                     The overridden options
	   */
	  function checkOptions(userSuppliedOptions) {
	    var options = userSuppliedOptions || {};

	    // Remove invalid plugins
	    if (options.defaultPlugins) {
	      options.defaultPlugins    = options.defaultPlugins.filter(filterByPluginExists(defaultOptions.defaultPlugins));
	    }

	    if (options.defaultFormatters) {
	      options.defaultFormatters = options.defaultFormatters.filter(filterByPluginExists(defaultOptions.defaultFormatters));
	    }

	    return Object.freeze(defaults(options, defaultOptions));
	  }

	  /**
	   * Sorts a plugin list by a specified plugin name
	   *
	   * @param  {String} priorityPlugin The plugin name to be given priority
	   * @return {Function}              Sorting function for the given plugin name
	   */
	  function sortByPlugin(priorityPlugin) {
	    return function (pluginCurrent, pluginNext) {
	      if (pluginCurrent === priorityPlugin) {
	        // pluginCurrent comes before plugin next
	        return -1;
	      } else if (pluginNext === priorityPlugin) {
	        // pluginNext comes before pluginCurrent
	        return 1;
	      }

	      // Do no swap
	      return 0;
	    }
	  }

	  /**
	   * Filters a list of plugins by block level / inline level mode.
	   *
	   * @param  {Boolean} isBlockLevelMode Whether block level mode is enabled
	   * @return {Function}                 Filtering function based upon the given mode
	   */
	  function filterByBlockLevelMode(isBlockLevelMode) {
	    return function (plugin) {
	      return (isBlockLevelMode ? blockModePlugins : inlineModePlugins).indexOf(plugin) !== -1;
	    }
	  }

	  /**
	   * Filters a list of plugins by their validity
	   *
	   * @param  {Array<String>} pluginList   List of plugins to check against
	   * @return {Function}                   Filtering function based upon the given list
	   */
	  function filterByPluginExists(pluginList) {
	    return function (plugin) {
	      return pluginList.indexOf(plugin) !== -1;
	    }
	  }

	  return {
	    defaultOptions: defaultOptions,
	    checkOptions: checkOptions,
	    sortByPlugin: sortByPlugin,
	    filterByBlockLevelMode: filterByBlockLevelMode,
	    filterByPluginExists: filterByPluginExists
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(204), __webpack_require__(141), __webpack_require__(205)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayCopy, assign, assignDefaults) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object for all destination properties that resolve to `undefined`. Once a
	   * property is set, additional values of the same property are ignored.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	   * // => { 'user': 'barney', 'age': 36 }
	   */
	  function defaults(object) {
	    if (object == null) {
	      return object;
	    }
	    var args = arrayCopy(arguments);
	    args.push(assignDefaults);
	    return assign.apply(undefined, args);
	  }

	  return defaults;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Copies the values of `source` to `array`.
	   *
	   * @private
	   * @param {Array} source The array to copy values from.
	   * @param {Array} [array=[]] The array to copy values to.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayCopy(source, array) {
	    var index = -1,
	        length = source.length;

	    array || (array = Array(length));
	    while (++index < length) {
	      array[index] = source[index];
	    }
	    return array;
	  }

	  return arrayCopy;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used by `_.defaults` to customize its `_.assign` use.
	   *
	   * @private
	   * @param {*} objectValue The destination object property value.
	   * @param {*} sourceValue The source object property value.
	   * @returns {*} Returns the value to assign to the destination object.
	   */
	  function assignDefaults(objectValue, sourceValue) {
	    return typeof objectValue == 'undefined' ? sourceValue : objectValue;
	  }

	  return assignDefaults;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      scribe.registerPlainTextFormatter(function (html) {
	        return html.replace(/\n([ \t]*\n)+/g, '</p><p>').replace(/\n/g, '<br>');
	      });
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * This plugin adds a command for creating links, including a basic prompt.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var linkPromptCommand = new scribe.api.Command('createLink');

	      linkPromptCommand.nodeName = 'A';

	      linkPromptCommand.execute = function () {
	        var selection = new scribe.api.Selection();
	        var range = selection.range;
	        var anchorNode = selection.getContaining(function (node) {
	          return node.nodeName === this.nodeName;
	        }.bind(this));
	        var initialLink = anchorNode ? anchorNode.href : '';
	        var link = window.prompt('Enter a link.', initialLink);

	        if (anchorNode) {
	          range.selectNode(anchorNode);
	          selection.selection.removeAllRanges();
	          selection.selection.addRange(range);
	        }

	        // FIXME: I don't like how plugins like this do so much. Is there a way
	        // to compose?

	        if (link) {
	          // Prepend href protocol if missing
	          // If a http/s or mailto link is provided, then we will trust that an link is valid
	          var urlProtocolRegExp = /^https?\:\/\//;
	          var mailtoProtocolRegExp = /^mailto\:/;
	          if (! urlProtocolRegExp.test(link) && ! mailtoProtocolRegExp.test(link)) {
	            // For emails we just look for a `@` symbol as it is easier.
	            if (/@/.test(link)) {
	              var shouldPrefixEmail = window.confirm(
	                'The URL you entered appears to be an email address. ' +
	                'Do you want to add the required “mailto:” prefix?'
	              );
	              if (shouldPrefixEmail) {
	                link = 'mailto:' + link;
	              }
	            } else {
	              var shouldPrefixLink = window.confirm(
	                'The URL you entered appears to be a link. ' +
	                'Do you want to add the required “http://” prefix?'
	              );
	              if (shouldPrefixLink) {
	                link = 'http://' + link;
	              }
	            }
	          }

	          scribe.api.SimpleCommand.prototype.execute.call(this, link);
	        }
	      };

	      linkPromptCommand.queryState = function () {
	        /**
	         * We override the native `document.queryCommandState` for links because
	         * the `createLink` and `unlink` commands are not supported.
	         * As per: http://jsbin.com/OCiJUZO/1/edit?js,console,output
	         */
	        var selection = new scribe.api.Selection();
	        return !! selection.getContaining(function (node) {
	          return node.nodeName === this.nodeName;
	        }.bind(this));
	      };

	      scribe.commands.linkPrompt = linkPromptCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(209),
	  __webpack_require__(210),
	  __webpack_require__(222)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  HTMLJanitor,
	  merge,
	  cloneDeep
	) {

	  /**
	   * This plugin adds the ability to sanitize content when it is pasted into the
	   * scribe, adhering to a whitelist of allowed tags and attributes.
	   */

	  'use strict';

	  return function (config) {
	    // We extend the config to let through (1) Scribe position markers,
	    // otherwise we lose the caret position when running the Scribe content
	    // through this sanitizer, and (2) BR elements which are needed by the
	    // browser to ensure elements are selectable.
	    var configAllowMarkers = merge(cloneDeep(config), {
	      tags: {
	        em: {class: 'scribe-marker'},
	        br: {}
	      }
	    });

	    return function (scribe) {
	      var janitor = new HTMLJanitor(configAllowMarkers);

	      scribe.registerHTMLFormatter('sanitize', janitor.clean.bind(janitor));
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.HTMLJanitor = factory();
	  }
	}(this, function () {

	  /**
	   * @param {Object} config.tags Dictionary of allowed tags.
	   * @param {boolean} config.keepNestedBlockElements Default false.
	   */
	  function HTMLJanitor(config) {

	    var tagDefinitions = config['tags'];
	    var tags = Object.keys(tagDefinitions);

	    var validConfigValues = tags
	      .map(function(k) { return typeof tagDefinitions[k]; })
	      .every(function(type) { return type === 'object' || type === 'boolean' || type === 'function'; });

	    if(!validConfigValues) {
	      throw new Error("The configuration was invalid");
	    }

	    this.config = config;
	  }

	  // TODO: not exhaustive?
	  var blockElementNames = ['P', 'LI', 'TD', 'TH', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'PRE'];
	  function isBlockElement(node) {
	    return blockElementNames.indexOf(node.nodeName) !== -1;
	  }

	  var inlineElementNames = ['A', 'B', 'STRONG', 'I', 'EM', 'SUB', 'SUP', 'U', 'STRIKE'];
	  function isInlineElement(node) {
	    return inlineElementNames.indexOf(node.nodeName) !== -1;
	  }

	  HTMLJanitor.prototype.clean = function (html) {
	    var sandbox = document.createElement('div');
	    sandbox.innerHTML = html;

	    this._sanitize(sandbox);

	    return sandbox.innerHTML;
	  };

	  HTMLJanitor.prototype._sanitize = function (parentNode) {
	    var treeWalker = createTreeWalker(parentNode);
	    var node = treeWalker.firstChild();
	    if (!node) { return; }

	    do {
	      // Ignore nodes that have already been sanitized
	      if (node._sanitized) {
	        continue;
	      }

	      if (node.nodeType === Node.TEXT_NODE) {
	        // If this text node is just whitespace and the previous or next element
	        // sibling is a block element, remove it
	        // N.B.: This heuristic could change. Very specific to a bug with
	        // `contenteditable` in Firefox: http://jsbin.com/EyuKase/1/edit?js,output
	        // FIXME: make this an option?
	        if (node.data.trim() === ''
	            && ((node.previousElementSibling && isBlockElement(node.previousElementSibling))
	                 || (node.nextElementSibling && isBlockElement(node.nextElementSibling)))) {
	          parentNode.removeChild(node);
	          this._sanitize(parentNode);
	          break;
	        } else {
	          continue;
	        }
	      }

	      // Remove all comments
	      if (node.nodeType === Node.COMMENT_NODE) {
	        parentNode.removeChild(node);
	        this._sanitize(parentNode);
	        break;
	      }

	      var isInline = isInlineElement(node);
	      var containsBlockElement;
	      if (isInline) {
	        containsBlockElement = Array.prototype.some.call(node.childNodes, isBlockElement);
	      }

	      // Block elements should not be nested (e.g. <li><p>...); if
	      // they are, we want to unwrap the inner block element.
	      var isNotTopContainer = !! parentNode.parentNode;
	      var isNestedBlockElement =
	            isBlockElement(parentNode) &&
	            isBlockElement(node) &&
	            isNotTopContainer;

	      var nodeName = node.nodeName.toLowerCase();

	      var allowedAttrs = getAllowedAttrs(this.config, nodeName, node);

	      var isInvalid = isInline && containsBlockElement;

	      // Drop tag entirely according to the whitelist *and* if the markup
	      // is invalid.
	      if (isInvalid || shouldRejectNode(node, allowedAttrs)
	          || (!this.config.keepNestedBlockElements && isNestedBlockElement)) {
	        // Do not keep the inner text of SCRIPT/STYLE elements.
	        if (! (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE')) {
	          while (node.childNodes.length > 0) {
	            parentNode.insertBefore(node.childNodes[0], node);
	          }
	        }
	        parentNode.removeChild(node);

	        this._sanitize(parentNode);
	        break;
	      }

	      // Sanitize attributes
	      for (var a = 0; a < node.attributes.length; a += 1) {
	        var attr = node.attributes[a];

	        if (shouldRejectAttr(attr, allowedAttrs, node)) {
	          node.removeAttribute(attr.name);
	          // Shift the array to continue looping.
	          a = a - 1;
	        }
	      }

	      // Sanitize children
	      this._sanitize(node);

	      // Mark node as sanitized so it's ignored in future runs
	      node._sanitized = true;
	    } while ((node = treeWalker.nextSibling()));
	  };

	  function createTreeWalker(node) {
	    return document.createTreeWalker(node,
	                                     NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
	                                     null, false);
	  }

	  function getAllowedAttrs(config, nodeName, node){
	    if (typeof config.tags[nodeName] === 'function') {
	      return config.tags[nodeName](node);
	    } else {
	      return config.tags[nodeName];
	    }
	  }

	  function shouldRejectNode(node, allowedAttrs){
	    if (typeof allowedAttrs === 'undefined') {
	      return true;
	    } else if (typeof allowedAttrs === 'boolean') {
	      return !allowedAttrs;
	    }

	    return false;
	  }

	  function shouldRejectAttr(attr, allowedAttrs, node){
	    var attrName = attr.name.toLowerCase();

	    if (allowedAttrs === true){
	      return false;
	    } else if (typeof allowedAttrs[attrName] === 'function'){
	      return !allowedAttrs[attrName](attr.value, node);
	    } else if (typeof allowedAttrs[attrName] === 'undefined'){
	      return true;
	    } else if (allowedAttrs[attrName] === false) {
	      return true;
	    } else if (typeof allowedAttrs[attrName] === 'string') {
	      return (allowedAttrs[attrName] !== attr.value);
	    }

	    return false;
	  }

	  return HTMLJanitor;

	}));


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(211), __webpack_require__(158)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseMerge, createAssigner) {

	  /**
	   * Recursively merges own enumerable properties of the source object(s), that
	   * don't resolve to `undefined` into the destination object. Subsequent sources
	   * overwrite property assignments of previous sources. If `customizer` is
	   * provided it is invoked to produce the merged values of the destination and
	   * source properties. If `customizer` returns `undefined` merging is handled
	   * by the method instead. The `customizer` is bound to `thisArg` and invoked
	   * with five arguments; (objectValue, sourceValue, key, object, source).
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @param {Function} [customizer] The function to customize merging properties.
	   * @param {*} [thisArg] The `this` binding of `customizer`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * var users = {
	   *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	   * };
	   *
	   * var ages = {
	   *   'data': [{ 'age': 36 }, { 'age': 40 }]
	   * };
	   *
	   * _.merge(users, ages);
	   * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	   *
	   * // using a customizer callback
	   * var object = {
	   *   'fruits': ['apple'],
	   *   'vegetables': ['beet']
	   * };
	   *
	   * var other = {
	   *   'fruits': ['banana'],
	   *   'vegetables': ['carrot']
	   * };
	   *
	   * _.merge(object, other, function(a, b) {
	   *   if (_.isArray(a)) {
	   *     return a.concat(b);
	   *   }
	   * });
	   * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	   */
	  var merge = createAssigner(baseMerge);

	  return merge;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(212), __webpack_require__(213), __webpack_require__(216), __webpack_require__(153), __webpack_require__(145), __webpack_require__(150), __webpack_require__(149), __webpack_require__(220)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayEach, baseForOwn, baseMergeDeep, isArray, isLength, isObject, isObjectLike, isTypedArray) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * The base implementation of `_.merge` without support for argument juggling,
	   * multiple sources, and `this` binding `customizer` functions.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {Function} [customizer] The function to customize merging properties.
	   * @param {Array} [stackA=[]] Tracks traversed source objects.
	   * @param {Array} [stackB=[]] Associates values with source counterparts.
	   * @returns {Object} Returns the destination object.
	   */
	  function baseMerge(object, source, customizer, stackA, stackB) {
	    if (!isObject(object)) {
	      return object;
	    }
	    var isSrcArr = isLength(source.length) && (isArray(source) || isTypedArray(source));
	    (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
	      if (isObjectLike(srcValue)) {
	        stackA || (stackA = []);
	        stackB || (stackB = []);
	        return baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	      }
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = typeof result == 'undefined';

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((isSrcArr || typeof result != 'undefined') &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    });
	    return object;
	  }

	  return baseMerge;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * A specialized version of `_.forEach` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEach(array, iteratee) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      if (iteratee(array[index], index, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  return arrayEach;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(214), __webpack_require__(144)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseFor, keys) {

	  /**
	   * The base implementation of `_.forOwn` without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForOwn(object, iteratee) {
	    return baseFor(object, iteratee, keys);
	  }

	  return baseForOwn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(215)], __WEBPACK_AMD_DEFINE_RESULT__ = function(toObject) {

	  /**
	   * The base implementation of `baseForIn` and `baseForOwn` which iterates
	   * over `object` properties returned by `keysFunc` invoking `iteratee` for
	   * each property. Iterator functions may exit iteration early by explicitly
	   * returning `false`.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {Function} keysFunc The function to get the keys of `object`.
	   * @returns {Object} Returns `object`.
	   */
	  function baseFor(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  }

	  return baseFor;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(150)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isObject) {

	  /**
	   * Converts `value` to an object if it is not one.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {Object} Returns the object.
	   */
	  function toObject(value) {
	    return isObject(value) ? value : Object(value);
	  }

	  return toObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(204), __webpack_require__(152), __webpack_require__(153), __webpack_require__(145), __webpack_require__(217), __webpack_require__(220), __webpack_require__(221)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayCopy, isArguments, isArray, isLength, isPlainObject, isTypedArray, toPlainObject) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * A specialized version of `baseMerge` for arrays and objects which performs
	   * deep merges and tracks traversed objects enabling objects with circular
	   * references to be merged.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {string} key The key of the value to merge.
	   * @param {Function} mergeFunc The function to merge values.
	   * @param {Function} [customizer] The function to customize merging properties.
	   * @param {Array} [stackA=[]] Tracks traversed source objects.
	   * @param {Array} [stackB=[]] Associates values with source counterparts.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	    var length = stackA.length,
	        srcValue = source[key];

	    while (length--) {
	      if (stackA[length] == srcValue) {
	        object[key] = stackB[length];
	        return;
	      }
	    }
	    var value = object[key],
	        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	        isCommon = typeof result == 'undefined';

	    if (isCommon) {
	      result = srcValue;
	      if (isLength(srcValue.length) && (isArray(srcValue) || isTypedArray(srcValue))) {
	        result = isArray(value)
	          ? value
	          : (value ? arrayCopy(value) : []);
	      }
	      else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	        result = isArguments(value)
	          ? toPlainObject(value)
	          : (isPlainObject(value) ? value : {});
	      }
	      else {
	        isCommon = false;
	      }
	    }
	    // Add the source value to the stack of traversed objects and associate
	    // it with its merged value.
	    stackA.push(srcValue);
	    stackB.push(result);

	    if (isCommon) {
	      // Recursively merge objects and arrays (susceptible to call stack limits).
	      object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	    } else if (result === result ? (result !== value) : (value === value)) {
	      object[key] = result;
	    }
	  }

	  return baseMergeDeep;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(146), __webpack_require__(218)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isNative, shimIsPlainObject) {

	  /** `Object#toString` result references. */
	  var objectTag = '[object Object]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /** Native method references. */
	  var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;

	  /**
	   * Checks if `value` is a plain object, that is, an object created by the
	   * `Object` constructor or one with a `[[Prototype]]` of `null`.
	   *
	   * **Note:** This method assumes objects created by the `Object` constructor
	   * have no inherited enumerable properties.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   * }
	   *
	   * _.isPlainObject(new Foo);
	   * // => false
	   *
	   * _.isPlainObject([1, 2, 3]);
	   * // => false
	   *
	   * _.isPlainObject({ 'x': 0, 'y': 0 });
	   * // => true
	   *
	   * _.isPlainObject(Object.create(null));
	   * // => true
	   */
	  var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	    if (!(value && objToString.call(value) == objectTag)) {
	      return false;
	    }
	    var valueOf = value.valueOf,
	        objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

	    return objProto
	      ? (value == objProto || getPrototypeOf(value) == objProto)
	      : shimIsPlainObject(value);
	  };

	  return isPlainObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(219), __webpack_require__(149)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseForIn, isObjectLike) {

	  /** `Object#toString` result references. */
	  var objectTag = '[object Object]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * A fallback implementation of `_.isPlainObject` which checks if `value`
	   * is an object created by the `Object` constructor or has a `[[Prototype]]`
	   * of `null`.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	   */
	  function shimIsPlainObject(value) {
	    var Ctor;

	    // Exit early for non `Object` objects.
	    if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
	        (!hasOwnProperty.call(value, 'constructor') &&
	          (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	      return false;
	    }
	    // IE < 9 iterates inherited properties before own properties. If the first
	    // iterated property is an object's own property then there are no inherited
	    // enumerable properties.
	    var result;
	    // In most environments an object's own properties are iterated before
	    // its inherited properties. If the last iterated property is an object's
	    // own property then there are no inherited enumerable properties.
	    baseForIn(value, function(subValue, key) {
	      result = key;
	    });
	    return typeof result == 'undefined' || hasOwnProperty.call(value, result);
	  }

	  return shimIsPlainObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(214), __webpack_require__(155)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseFor, keysIn) {

	  /**
	   * The base implementation of `_.forIn` without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForIn(object, iteratee) {
	    return baseFor(object, iteratee, keysIn);
	  }

	  return baseForIn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(145), __webpack_require__(149)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isObjectLike) {

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      mapTag = '[object Map]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      setTag = '[object Set]',
	      stringTag = '[object String]',
	      weakMapTag = '[object WeakMap]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /** Used to identify `toStringTag` values of typed arrays. */
	  var typedArrayTags = {};
	  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	  typedArrayTags[uint32Tag] = true;
	  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * Checks if `value` is classified as a typed array.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isTypedArray(new Uint8Array);
	   * // => true
	   *
	   * _.isTypedArray([]);
	   * // => false
	   */
	  function isTypedArray(value) {
	    return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
	  }

	  return isTypedArray;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(143), __webpack_require__(155)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseCopy, keysIn) {

	  /**
	   * Converts `value` to a plain object flattening inherited enumerable
	   * properties of `value` to own properties of the plain object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {Object} Returns the converted plain object.
	   * @example
	   *
	   * function Foo() {
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.assign({ 'a': 1 }, new Foo);
	   * // => { 'a': 1, 'b': 2 }
	   *
	   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	   * // => { 'a': 1, 'b': 2, 'c': 3 }
	   */
	  function toPlainObject(value) {
	    return baseCopy(value, keysIn(value));
	  }

	  return toPlainObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(223), __webpack_require__(159)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseClone, bindCallback) {

	  /**
	   * Creates a deep clone of `value`. If `customizer` is provided it is invoked
	   * to produce the cloned values. If `customizer` returns `undefined` cloning
	   * is handled by the method instead. The `customizer` is bound to `thisArg`
	   * and invoked with two argument; (value [, index|key, object]).
	   *
	   * **Note:** This method is loosely based on the structured clone algorithm.
	   * The enumerable properties of `arguments` objects and objects created by
	   * constructors other than `Object` are cloned to plain `Object` objects. An
	   * empty object is returned for uncloneable values such as functions, DOM nodes,
	   * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to deep clone.
	   * @param {Function} [customizer] The function to customize cloning values.
	   * @param {*} [thisArg] The `this` binding of `customizer`.
	   * @returns {*} Returns the deep cloned value.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney' },
	   *   { 'user': 'fred' }
	   * ];
	   *
	   * var deep = _.cloneDeep(users);
	   * deep[0] === users[0];
	   * // => false
	   *
	   * // using a customizer callback
	   * var el = _.cloneDeep(document.body, function(value) {
	   *   if (_.isElement(value)) {
	   *     return value.cloneNode(true);
	   *   }
	   * });
	   *
	   * el === document.body
	   * // => false
	   * el.nodeName
	   * // => BODY
	   * el.childNodes.length;
	   * // => 20
	   */
	  function cloneDeep(value, customizer, thisArg) {
	    customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
	    return baseClone(value, true, customizer);
	  }

	  return cloneDeep;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(204), __webpack_require__(212), __webpack_require__(143), __webpack_require__(213), __webpack_require__(227), __webpack_require__(224), __webpack_require__(228), __webpack_require__(153), __webpack_require__(150), __webpack_require__(144)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayCopy, arrayEach, baseCopy, baseForOwn, initCloneArray, initCloneByTag, initCloneObject, isArray, isObject, keys) {

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      mapTag = '[object Map]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      setTag = '[object Set]',
	      stringTag = '[object String]',
	      weakMapTag = '[object WeakMap]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /** Used to identify `toStringTag` values supported by `_.clone`. */
	  var cloneableTags = {};
	  cloneableTags[argsTag] = cloneableTags[arrayTag] =
	  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	  cloneableTags[dateTag] = cloneableTags[float32Tag] =
	  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	  cloneableTags[numberTag] = cloneableTags[objectTag] =
	  cloneableTags[regexpTag] = cloneableTags[stringTag] =
	  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	  cloneableTags[errorTag] = cloneableTags[funcTag] =
	  cloneableTags[mapTag] = cloneableTags[setTag] =
	  cloneableTags[weakMapTag] = false;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * The base implementation of `_.clone` without support for argument juggling
	   * and `this` binding `customizer` functions.
	   *
	   * @private
	   * @param {*} value The value to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @param {Function} [customizer] The function to customize cloning values.
	   * @param {string} [key] The key of `value`.
	   * @param {Object} [object] The object `value` belongs to.
	   * @param {Array} [stackA=[]] Tracks traversed source objects.
	   * @param {Array} [stackB=[]] Associates clones with source counterparts.
	   * @returns {*} Returns the cloned value.
	   */
	  function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	    var result;
	    if (customizer) {
	      result = object ? customizer(value, key, object) : customizer(value);
	    }
	    if (typeof result != 'undefined') {
	      return result;
	    }
	    if (!isObject(value)) {
	      return value;
	    }
	    var isArr = isArray(value);
	    if (isArr) {
	      result = initCloneArray(value);
	      if (!isDeep) {
	        return arrayCopy(value, result);
	      }
	    } else {
	      var tag = objToString.call(value),
	          isFunc = tag == funcTag;

	      if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	        result = initCloneObject(isFunc ? {} : value);
	        if (!isDeep) {
	          return baseCopy(value, result, keys(value));
	        }
	      } else {
	        return cloneableTags[tag]
	          ? initCloneByTag(value, tag, isDeep)
	          : (object ? value : {});
	      }
	    }
	    // Check for circular references and return corresponding clone.
	    stackA || (stackA = []);
	    stackB || (stackB = []);

	    var length = stackA.length;
	    while (length--) {
	      if (stackA[length] == value) {
	        return stackB[length];
	      }
	    }
	    // Add the source value to the stack of traversed objects and associate it with its clone.
	    stackA.push(value);
	    stackB.push(result);

	    // Recursively populate clone (susceptible to call stack limits).
	    (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	      result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	    });
	    return result;
	  }

	  return baseClone;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(225)], __WEBPACK_AMD_DEFINE_RESULT__ = function(bufferClone) {

	  /** `Object#toString` result references. */
	  var boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      numberTag = '[object Number]',
	      regexpTag = '[object RegExp]',
	      stringTag = '[object String]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /** Used to match `RegExp` flags from their coerced string values. */
	  var reFlags = /\w*$/;

	  /**
	   * Initializes an object clone based on its `toStringTag`.
	   *
	   * **Note:** This function only supports cloning values with tags of
	   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	   *
	   *
	   * @private
	   * @param {Object} object The object to clone.
	   * @param {string} tag The `toStringTag` of the object to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Object} Returns the initialized clone.
	   */
	  function initCloneByTag(object, tag, isDeep) {
	    var Ctor = object.constructor;
	    switch (tag) {
	      case arrayBufferTag:
	        return bufferClone(object);

	      case boolTag:
	      case dateTag:
	        return new Ctor(+object);

	      case float32Tag: case float64Tag:
	      case int8Tag: case int16Tag: case int32Tag:
	      case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	        var buffer = object.buffer;
	        return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	      case numberTag:
	      case stringTag:
	        return new Ctor(object);

	      case regexpTag:
	        var result = new Ctor(object.source, reFlags.exec(object));
	        result.lastIndex = object.lastIndex;
	    }
	    return result;
	  }

	  return initCloneByTag;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(226), __webpack_require__(146), __webpack_require__(157)], __WEBPACK_AMD_DEFINE_RESULT__ = function(constant, isNative, root) {

	  /** Native method references. */
	  var ArrayBuffer = isNative(ArrayBuffer = root.ArrayBuffer) && ArrayBuffer,
	      bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
	      floor = Math.floor,
	      Uint8Array = isNative(Uint8Array = root.Uint8Array) && Uint8Array;

	  /** Used to clone array buffers. */
	  var Float64Array = (function() {
	    // Safari 5 errors when using an array buffer to initialize a typed array
	    // where the array buffer's `byteLength` is not a multiple of the typed
	    // array's `BYTES_PER_ELEMENT`.
	    try {
	      var func = isNative(func = root.Float64Array) && func,
	          result = new func(new ArrayBuffer(10), 0, 1) && func;
	    } catch(e) {}
	    return result;
	  }());

	  /** Used as the size, in bytes, of each `Float64Array` element. */
	  var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

	  /**
	   * Creates a clone of the given array buffer.
	   *
	   * @private
	   * @param {ArrayBuffer} buffer The array buffer to clone.
	   * @returns {ArrayBuffer} Returns the cloned array buffer.
	   */
	  function bufferClone(buffer) {
	    return bufferSlice.call(buffer, 0);
	  }
	  if (!bufferSlice) {
	    // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
	    bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
	      var byteLength = buffer.byteLength,
	          floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
	          offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
	          result = new ArrayBuffer(byteLength);

	      if (floatLength) {
	        var view = new Float64Array(result, 0, floatLength);
	        view.set(new Float64Array(buffer, 0, floatLength));
	      }
	      if (byteLength != offset) {
	        view = new Uint8Array(result, offset);
	        view.set(new Uint8Array(buffer, offset));
	      }
	      return result;
	    };
	  }

	  return bufferClone;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Creates a function that returns `value`.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {*} value The value to return from the new function.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   * var getter = _.constant(object);
	   *
	   * getter() === object;
	   * // => true
	   */
	  function constant(value) {
	    return function() {
	      return value;
	    };
	  }

	  return constant;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Initializes an array clone.
	   *
	   * @private
	   * @param {Array} array The array to clone.
	   * @returns {Array} Returns the initialized clone.
	   */
	  function initCloneArray(array) {
	    var length = array.length,
	        result = new array.constructor(length);

	    // Add array properties assigned by `RegExp#exec`.
	    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	      result.index = array.index;
	      result.input = array.input;
	    }
	    return result;
	  }

	  return initCloneArray;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Initializes an object clone.
	   *
	   * @private
	   * @param {Object} object The object to clone.
	   * @returns {Object} Returns the initialized clone.
	   */
	  function initCloneObject(object) {
	    var Ctor = object.constructor;
	    if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	      Ctor = Object;
	    }
	    return new Ctor;
	  }

	  return initCloneObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var selectionRange = __webpack_require__(230);

	module.exports = {
	  mixinName: 'Textable',

	  initializeTextable: function initializeTextable() {
	    this.el.classList.add('st-block--textable');
	  },

	  focusAtEnd: function focusAtEnd() {
	    this.focus();
	    this.selectText();
	  },

	  selectText: function selectText() {
	    var range = document.createRange();
	    if (this._scribe.allowsBlockElements()) {
	      range.setStartAfter(this._scribe.el.firstChild, 0);
	    } else {
	      range.selectNodeContents(this._scribe.el);
	    }
	    range.collapse(false);
	    var selection = new this._scribe.api.Selection();
	    selection.selection.removeAllRanges();
	    selection.selection.addRange(range);
	  },

	  getScribeInnerContent: function getScribeInnerContent(block) {
	    var content = '';
	    if (this._scribe.getTextContent() !== '') {
	      var fakeContent = document.createElement('div');
	      fakeContent.innerHTML = this.getTextBlockHTML();
	      content = fakeContent.firstChild.innerHTML || fakeContent.innerHTML;
	      return content.replace(/^[\s\uFEFF\xA0]+|$/g, '');
	    }
	    return content;
	  },

	  getCaretPositionAtEnd: function getCaretPositionAtEnd() {
	    this.selectText();

	    return selectionRange(this._scribe.el);
	  },

	  appendContent: function appendContent(content, options) {
	    options = options || {};

	    var caretPosition = this.getCaretPositionAtEnd();

	    var currentContent = this.getScribeInnerContent();
	    if (currentContent !== '') {
	      content = currentContent + content;
	    }

	    if (content === '') {
	      content = '<br>';
	    }

	    this.setTextBlockHTML(content);

	    this.focus();

	    if (options.keepCaretPosition && caretPosition.start !== 0 && caretPosition.end !== 0) {
	      selectionRange(this._scribe.el, {
	        start: caretPosition.start,
	        end: caretPosition.end
	      });
	    }
	  }
	};

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var iterator = __webpack_require__(231);
	var selection = window.getSelection();

	/**
	 * Expose position fn
	 */

	module.exports = position;

	/**
	 * Get or set cursor, selection, relative to
	 * an element.
	 *
	 * @param  {Element} el
	 * @param  {Object} pos selection range
	 * @return {Object|Undefined}
	 */

	function position(el, pos){

	  /**
	   * Get cursor or selection position
	   */

	  if (1 == arguments.length) {
	    if (!selection.rangeCount) return;
	    var indexes = {};
	    var range = selection.getRangeAt(0);
	    var clone = range.cloneRange();
	    clone.selectNodeContents(el);
	    clone.setEnd(range.endContainer, range.endOffset);
	    indexes.end = clone.toString().length;
	    clone.setStart(range.startContainer, range.startOffset);
	    indexes.start = indexes.end - clone.toString().length;
	    indexes.atStart = clone.startOffset === 0;
	    return indexes;
	  }

	  /**
	   * Set cursor or selection position
	   */

	  var setSelection = pos.end && (pos.end !== pos.start);
	  var length = 0;
	  var range = document.createRange();
	  var it = iterator(el).select(Node.TEXT_NODE).revisit(false);
	  var next;
	  var startindex;
	  var start = pos.start > el.textContent.length ? el.textContent.length : pos.start;
	  var end = pos.end > el.textContent.length ? el.textContent.length : pos.end;
	  var atStart = pos.atStart;

	  while (next = it.next()){
	    var olen = length;
	    length += next.textContent.length;

	    // Set start point of selection
	    var atLength = atStart ? length > start : length >= start;
	    if (!startindex && atLength) {
	      startindex = true;
	      range.setStart(next, start - olen);
	      if (!setSelection) {
	        range.collapse(true);
	        makeSelection(el, range);
	        break;
	      }
	    }

	    // Set end point of selection
	    if (setSelection && (length >= end)) {
	      range.setEnd(next, end - olen);
	      makeSelection(el, range);
	      break;
	    }
	  }
	}

	/**
	 * add selection / insert cursor.
	 *
	 * @param  {Element} el
	 * @param  {Range} range
	 */

	function makeSelection(el, range){
	  el.focus();
	  selection.removeAllRanges();
	  selection.addRange(range);
	}


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var xor, props;

	try {
	  xor = __webpack_require__(232);
	} catch (e) {
	  xor = __webpack_require__(232);
	}

	try {
	  props = __webpack_require__(233);
	} catch (e) {
	  props = __webpack_require__(233);
	}

	/**
	 * Export `Iterator`
	 */

	module.exports = Iterator;

	/**
	 * Initialize `Iterator`
	 *
	 * @param {Node} node
	 * @param {Node} root
	 * @return {Iterator} self
	 * @api public
	 */

	function Iterator(node, root) {
	  if (!(this instanceof Iterator)) return new Iterator(node, root);
	  this.node = this.start = this.peeked = node;
	  this.root = root;
	  this.closingTag = false;
	  this._revisit = true;
	  this._selects = [];
	  this._rejects = [];

	  if (node && this.higher(node)) {
	    throw new Error('root must be a parent or ancestor to node');
	  }
	}

	/**
	 * Reset the Iterator
	 *
	 * @param {Node} node (optional)
	 * @return {Iterator} self
	 * @api public
	 */

	Iterator.prototype.reset = function(node) {
	  this.node = node || this.start;
	  return this;
	};

	/**
	 * Revisit element nodes. Defaults to `true`
	 */

	Iterator.prototype.revisit = function(revisit) {
	  this._revisit = undefined == revisit ? true : revisit;
	  return this;
	};

	/**
	 * Jump to the opening tag
	 */

	Iterator.prototype.opening = function() {
	  if (1 == this.node.nodeType) this.closingTag = false;
	  return this;
	};

	/**
	 * Jump to the closing tag
	 */

	Iterator.prototype.atOpening = function() {
	  return !this.closingTag;
	};


	/**
	 * Jump to the closing tag
	 */

	Iterator.prototype.closing = function() {
	  if (1 == this.node.nodeType) this.closingTag = true;
	  return this;
	};

	/**
	 * Jump to the closing tag
	 */

	Iterator.prototype.atClosing = function() {
	  return this.closingTag;
	};

	/**
	 * Next node
	 *
	 * @param {Number} type
	 * @return {Node|null}
	 * @api public
	 */

	Iterator.prototype.next = traverse('nextSibling', 'firstChild');

	/**
	 * Previous node
	 *
	 * @param {Number} type
	 * @return {Node|null}
	 * @api public
	 */

	Iterator.prototype.previous =
	Iterator.prototype.prev = traverse('previousSibling', 'lastChild');

	/**
	 * Make traverse function
	 *
	 * @param {String} dir
	 * @param {String} child
	 * @return {Function}
	 * @api private
	 */

	function traverse(dir, child) {
	  var next = dir == 'nextSibling';
	  return function walk(expr, n, peek) {
	    expr = this.compile(expr);
	    n = n && n > 0 ? n : 1;
	    var node = this.node;
	    var closing = this.closingTag;
	    var revisit = this._revisit;

	    while (node) {
	      if (xor(next, closing) && node[child]) {
	        // element with children: <em>...</em>
	        node = node[child];
	        closing = !next;
	      } else if (1 == node.nodeType && !node[child] && xor(next, closing)) {
	        // empty element tag: <em></em>
	        closing = next;
	        if (!revisit) continue;
	      } else if (node[dir]) {
	        // element has a neighbor: ...<em></em>...
	        node = node[dir];
	        closing = !next;
	      } else {
	        // done with current layer, move up.
	        node = node.parentNode;
	        closing = next;
	        if (!revisit) continue;
	      }

	      if (!node || this.higher(node, this.root)) break;

	      if (expr(node) && this.selects(node, peek) && this.rejects(node, peek)) {
	        if (--n) continue;
	        if (!peek) this.node = node;
	        this.closingTag = closing;
	        return node;
	      }
	    }

	    return null;
	  };
	}

	/**
	 * Select nodes that cause `expr(node)`
	 * to be truthy
	 *
	 * @param {Number|String|Function} expr
	 * @return {Iterator} self
	 * @api public
	 */

	Iterator.prototype.select = function(expr) {
	  expr = this.compile(expr);
	  this._selects.push(expr);
	  return this;
	};

	/**
	 * Run through the selects ORing each
	 *
	 * @param {Node} node
	 * @param {Boolean} peek
	 * @return {Boolean}
	 * @api private
	 */

	Iterator.prototype.selects = function(node, peek) {
	  var exprs = this._selects;
	  var len = exprs.length;
	  if (!len) return true;

	  for (var i = 0; i < len; i++) {
	    if (exprs[i].call(this, node, peek)) return true;
	  };

	  return false;
	};

	/**
	 * Select nodes that cause `expr(node)`
	 * to be falsy
	 *
	 * @param {Number|String|Function} expr
	 * @return {Iterator} self
	 * @api public
	 */

	Iterator.prototype.reject = function(expr) {
	  expr = this.compile(expr);
	  this._rejects.push(expr);
	  return this;
	};

	/**
	 * Run through the reject expressions ANDing each
	 *
	 * @param {Node} node
	 * @param {Boolean} peek
	 * @return {Boolean}
	 * @api private
	 */

	Iterator.prototype.rejects = function(node, peek) {
	  var exprs = this._rejects;
	  var len = exprs.length;
	  if (!len) return true;

	  for (var i = 0; i < len; i++) {
	    if (exprs[i].call(this, node, peek)) return false;
	  };

	  return true;
	};

	/**
	 * Check if node is higher
	 * than root.
	 *
	 * @param {Node} node
	 * @param {Node} root
	 * @return {Boolean}
	 * @api private
	 */

	Iterator.prototype.higher = function(node) {
	  var root = this.root;
	  if (!root) return false;
	  node = node.parentNode;
	  while (node && node != root) node = node.parentNode;
	  return node != root;
	};

	/**
	 * Compile an expression
	 *
	 * @param {String|Function|Number} expr
	 * @return {Function}
	 */

	Iterator.prototype.compile = function(expr) {
	  switch (typeof expr) {
	    case 'number':
	      return function(node) { return expr == node.nodeType; };
	    case 'string':
	      return new Function('node', 'return ' + props(expr, 'node.'));
	    case 'function':
	      return expr;
	    default:
	      return function() { return true; };
	  }
	};

	/**
	 * Peek in either direction
	 * `n` nodes. Peek backwards
	 * using negative numbers.
	 *
	 * @param {Number} n (optional)
	 * @return {Node|null}
	 * @api public
	 */

	Iterator.prototype.peak =
	Iterator.prototype.peek = function(expr, n) {
	  if (arguments.length == 1) n = expr, expr = true;
	  n = undefined == n ? 1 : n;
	  if (!n) return this.node;
	  else if (n > 0) return this.next(expr, n, true);
	  else return this.prev(expr, Math.abs(n), true);
	};

	/**
	 * Add a plugin
	 *
	 * @param {Function} fn
	 * @return {Iterator}
	 * @api public
	 */

	Iterator.prototype.use = function(fn) {
	  fn(this);
	  return this;
	};


/***/ },
/* 232 */
/***/ function(module, exports) {

	/**
	 * Expose `xor`
	 */

	module.exports = xor;

	/**
	 * XOR utility
	 *
	 * T T F
	 * T F T
	 * F T T
	 * F F F
	 *
	 * @param {Boolean} a
	 * @param {Boolean} b
	 * @return {Boolean}
	 */

	function xor(a, b) {
	  return !a != !b;
	}


/***/ },
/* 233 */
/***/ function(module, exports) {

	/**
	 * Global Names
	 */

	var globals = /\b(Array|Date|Object|Math|JSON)\b/g;

	/**
	 * Return immediate identifiers parsed from `str`.
	 *
	 * @param {String} str
	 * @param {String|Function} map function or prefix
	 * @return {Array}
	 * @api public
	 */

	module.exports = function(str, fn){
	  var p = unique(props(str));
	  if (fn && 'string' == typeof fn) fn = prefixed(fn);
	  if (fn) return map(str, p, fn);
	  return p;
	};

	/**
	 * Return immediate identifiers in `str`.
	 *
	 * @param {String} str
	 * @return {Array}
	 * @api private
	 */

	function props(str) {
	  return str
	    .replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
	    .replace(globals, '')
	    .match(/[a-zA-Z_]\w*/g)
	    || [];
	}

	/**
	 * Return `str` with `props` mapped with `fn`.
	 *
	 * @param {String} str
	 * @param {Array} props
	 * @param {Function} fn
	 * @return {String}
	 * @api private
	 */

	function map(str, props, fn) {
	  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
	  return str.replace(re, function(_){
	    if ('(' == _[_.length - 1]) return fn(_);
	    if (!~props.indexOf(_)) return _;
	    return fn(_);
	  });
	}

	/**
	 * Return unique array.
	 *
	 * @param {Array} arr
	 * @return {Array}
	 * @api private
	 */

	function unique(arr) {
	  var ret = [];

	  for (var i = 0; i < arr.length; i++) {
	    if (~ret.indexOf(arr[i])) continue;
	    ret.push(arr[i]);
	  }

	  return ret;
	}

	/**
	 * Map with prefix `str`.
	 */

	function prefixed(str) {
	  return function(_){
	    return str + _;
	  };
	}


/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)["default"];

	var template = ["<div class='st-block-positioner__inner'>", "<span class='st-block-positioner__selected-value'></span>", "<select class='st-block-positioner__select'></select>", "</div>"].join("\n");

	var BlockPositioner = function BlockPositioner(block, mediator) {
	  this.mediator = mediator;
	  this.block = block;

	  this._ensureElement();
	  this._bindFunctions();

	  this.initialize();
	};

	_Object$assign(BlockPositioner.prototype, __webpack_require__(235), __webpack_require__(236), {

	  total_blocks: 0,

	  bound: ['onBlockCountChange', 'onSelectChange', 'toggle', 'show', 'hide'],

	  className: 'st-block-positioner',
	  visibleClass: 'active',

	  initialize: function initialize() {
	    this.el.insertAdjacentHTML("beforeend", template);
	    this.select = this.$('.st-block-positioner__select')[0];

	    this.select.addEventListener('change', this.onSelectChange);

	    this.mediator.on("block:countUpdate", this.onBlockCountChange);
	  },

	  onBlockCountChange: function onBlockCountChange(new_count) {
	    if (new_count !== this.total_blocks) {
	      this.total_blocks = new_count;
	      this.renderPositionList();
	    }
	  },

	  onSelectChange: function onSelectChange() {
	    var val = this.select.value;
	    if (val !== 0) {
	      this.mediator.trigger("block:changePosition", this.block, val, val === 1 ? 'before' : 'after');
	      this.toggle();
	    }
	  },

	  renderPositionList: function renderPositionList() {
	    var inner = "<option value='0'>" + i18n.t("general:position") + "</option>";
	    for (var i = 1; i <= this.total_blocks; i++) {
	      inner += "<option value=" + i + ">" + i + "</option>";
	    }
	    this.select.innerHTML = inner;
	  },

	  toggle: function toggle() {
	    this.select.value = 0;
	    this.el.classList.toggle(this.visibleClass);
	  },

	  show: function show() {
	    this.el.classList.add(this.visibleClass);
	  },

	  hide: function hide() {
	    this.el.classList.remove(this.visibleClass);
	  }

	});

	module.exports = BlockPositioner;

/***/ },
/* 235 */
/***/ function(module, exports) {

	"use strict";

	/* Generic function binding utility, used by lots of our classes */

	module.exports = {
	  bound: [],
	  _bindFunctions: function _bindFunctions() {
	    this.bound.forEach(function (f) {
	      this[f] = this[f].bind(this);
	    }, this);
	  }
	};

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var Dom = __webpack_require__(69);

	module.exports = {
	  tagName: 'div',
	  className: 'sir-trevor__view',
	  attributes: {},

	  $: function $(selector) {
	    return this.el.querySelectorAll(selector);
	  },

	  render: function render() {
	    return this;
	  },

	  destroy: function destroy() {
	    if (!_.isUndefined(this.stopListening)) {
	      this.stopListening();
	    }
	    Dom.remove(this.el);
	  },

	  _ensureElement: function _ensureElement() {
	    if (!this.el) {
	      var attrs = _Object$assign({}, _.result(this, 'attributes'));
	      if (this.id) {
	        attrs.id = this.id;
	      }
	      if (this.className) {
	        attrs['class'] = this.className;
	      }

	      var el = Dom.createElement(this.tagName, attrs);
	      this._setElement(el);
	    } else {
	      this._setElement(this.el);
	    }
	  },

	  _setElement: function _setElement(element) {
	    this.el = element;
	    return this;
	  }
	};

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var dropEvents = __webpack_require__(133);

	var EventBus = __webpack_require__(75);
	var Dom = __webpack_require__(69);

	var config = __webpack_require__(68);

	var BlockReorder = function BlockReorder(block_element, mediator) {
	  this.block = block_element;
	  this.blockID = this.block.getAttribute('id');
	  this.mediator = mediator;

	  this._ensureElement();
	  this._bindFunctions();

	  this.initialize();
	};

	_Object$assign(BlockReorder.prototype, __webpack_require__(235), __webpack_require__(236), {

	  bound: ['onMouseDown', 'onDragStart', 'onDragEnd', 'onDrop'],

	  className: 'st-block-ui-btn__reorder',
	  tagName: 'a',

	  attributes: function attributes() {
	    return {
	      'html': '<svg role="img" class="st-icon">\n                 <use xlink:href="' + config.defaults.iconUrl + '#move"/>\n               </svg>',
	      'draggable': 'true',
	      'data-icon': 'move'
	    };
	  },

	  initialize: function initialize() {
	    this.el.addEventListener('mousedown', this.onMouseDown);
	    this.el.addEventListener('dragstart', this.onDragStart);
	    this.el.addEventListener('dragend', this.onDragEnd);

	    dropEvents.dropArea(this.block);
	    this.block.addEventListener('drop', this.onDrop);
	  },

	  blockId: function blockId() {
	    return this.block.getAttribute('id');
	  },

	  onMouseDown: function onMouseDown() {
	    EventBus.trigger("block:reorder:down");
	  },

	  onDrop: function onDrop(ev) {
	    ev.preventDefault();

	    var dropped_on = this.block,
	        item_id = ev.dataTransfer.getData("text/plain"),
	        block = document.querySelector('#' + item_id);

	    if ((!!item_id, !!block, dropped_on.id !== item_id)) {
	      Dom.insertAfter(block, dropped_on);
	    }
	    this.mediator.trigger("block:rerender", item_id);
	    EventBus.trigger("block:reorder:dropped", item_id);
	  },

	  onDragStart: function onDragStart(ev) {
	    var block = this.block;

	    this.dragEl = block.cloneNode(true);
	    this.dragEl.classList.add("st-drag-element");
	    this.dragEl.style.top = block.offsetTop + 'px';
	    this.dragEl.style.left = block.offsetLeft + 'px';

	    block.parentNode.appendChild(this.dragEl);

	    ev.dataTransfer.setDragImage(this.dragEl, 0, 0);
	    ev.dataTransfer.setData("text/plain", this.blockId());
	    this.mediator.trigger("block-controls:hide");

	    EventBus.trigger("block:reorder:dragstart");
	    block.classList.add('st-block--dragging');
	  },

	  onDragEnd: function onDragEnd(ev) {
	    EventBus.trigger("block:reorder:dragend");
	    this.block.classList.remove('st-block--dragging');
	    this.dragEl.parentNode.removeChild(this.dragEl);
	  },

	  render: function render() {
	    return this;
	  }

	});

	module.exports = BlockReorder;

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var config = __webpack_require__(68);

	var BlockDeletion = function BlockDeletion() {
	  this._ensureElement();
	  this._bindFunctions();
	};

	_Object$assign(BlockDeletion.prototype, __webpack_require__(235), __webpack_require__(236), {

	  tagName: 'a',
	  className: 'st-block-ui-btn__delete',

	  attributes: {
	    html: function html() {
	      return '<svg role="img" class="st-icon">\n                   <use xlink:href="' + config.defaults.iconUrl + '#cross"/>\n                 </svg>';
	    },
	    'data-icon': 'close'
	  }

	});

	module.exports = BlockDeletion;

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);

	var bestNameFromField = function bestNameFromField(field) {
	  var msg = field.getAttribute("data-st-name") || field.getAttribute("name");

	  if (!msg) {
	    msg = 'Field';
	  }

	  return utils.capitalize(msg);
	};

	module.exports = {

	  errors: [],

	  valid: function valid() {
	    this.performValidations();
	    return this.errors.length === 0;
	  },

	  // This method actually does the leg work
	  // of running our validators and custom validators
	  performValidations: function performValidations() {
	    this.resetErrors();

	    var required_fields = this.$('.st-required');
	    Array.prototype.forEach.call(required_fields, (function (f, i) {
	      this.validateField(f);
	    }).bind(this));
	    this.validations.forEach(this.runValidator, this);

	    this.el.classList.toggle('st-block--with-errors', this.errors.length > 0);
	  },

	  // Everything in here should be a function that returns true or false
	  validations: [],

	  validateField: function validateField(field) {

	    var content = field.getAttribute('contenteditable') ? field.textContent : field.value;

	    if (content.length === 0) {
	      this.setError(field, i18n.t("errors:block_empty", { name: bestNameFromField(field) }));
	    }
	  },

	  runValidator: function runValidator(validator) {
	    if (!_.isUndefined(this[validator])) {
	      this[validator].call(this);
	    }
	  },

	  setError: function setError(field, reason) {
	    var msg = this.addMessage(reason, "st-msg--error");
	    field.classList.add('st-error');

	    this.errors.push({ field: field, reason: reason, msg: msg });
	  },

	  resetErrors: function resetErrors() {
	    this.errors.forEach(function (error) {
	      error.field.classList.remove('st-error');
	      error.msg.remove();
	    });

	    this.messages.classList.remove("st-block__messages--is-visible");
	    this.errors = [];
	  }

	};

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);

	var EventBus = __webpack_require__(75);

	module.exports = {

	  /**
	   * Internal storage object for the block
	   */
	  blockStorage: {},

	  /**
	   * Initialize the store, including the block type
	   */
	  createStore: function createStore(blockData) {
	    this.blockStorage = {
	      type: utils.underscored(this.type),
	      data: blockData || {}
	    };
	  },

	  /**
	   * Serialize the block and save the data into the store
	   */
	  save: function save() {
	    var data = this._serializeData();

	    if (!_.isEmpty(data)) {
	      this.setData(data);
	    }
	  },

	  getData: function getData() {
	    this.save();
	    return this.blockStorage;
	  },

	  getBlockData: function getBlockData() {
	    this.save();
	    return this.blockStorage.data;
	  },

	  _getData: function _getData() {
	    return this.blockStorage.data;
	  },

	  /**
	   * Set the block data.
	   * This is used by the save() method.
	   */
	  setData: function setData(blockData) {
	    utils.log("Setting data for block " + this.blockID);
	    _Object$assign(this.blockStorage.data, blockData || {});
	  },

	  setAndLoadData: function setAndLoadData(blockData) {
	    this.setData(blockData);
	    this.beforeLoadingData();
	  },

	  _serializeData: function _serializeData() {},
	  loadData: function loadData() {},

	  beforeLoadingData: function beforeLoadingData() {
	    utils.log("loadData for " + this.blockID);
	    EventBus.trigger("editor/block/loadData");
	    this.loadData(this._getData());
	  },

	  _loadData: function _loadData() {
	    utils.log("_loadData is deprecated and will be removed in the future. Please use beforeLoadingData instead.");
	    this.beforeLoadingData();
	  },

	  checkAndLoadData: function checkAndLoadData() {
	    if (!_.isEmpty(this._getData())) {
	      this.beforeLoadingData();
	    }
	  }

	};

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var _Object$keys = __webpack_require__(30)['default'];

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);
	var config = __webpack_require__(68);

	var EventBus = __webpack_require__(75);
	var Blocks = __webpack_require__(242);

	var Dom = __webpack_require__(69);

	var BLOCK_OPTION_KEYS = ['convertToMarkdown', 'convertFromMarkdown', 'formatBar'];

	var BlockManager = function BlockManager(SirTrevor) {
	  this.options = SirTrevor.options;
	  this.blockOptions = BLOCK_OPTION_KEYS.reduce(function (acc, key) {
	    acc[key] = SirTrevor.options[key];
	    return acc;
	  }, {});
	  this.instance_scope = SirTrevor.ID;
	  this.mediator = SirTrevor.mediator;

	  // REFACTOR: this is a hack until I can focus on reworking the blockmanager
	  this.wrapper = SirTrevor.wrapper;

	  this.blocks = [];
	  this.blockCounts = {};
	  this.blockTypes = [];

	  this._setBlocksTypes();

	  this._setRequired();
	  this._bindMediatedEvents();

	  this.initialize();
	};

	_Object$assign(BlockManager.prototype, __webpack_require__(235), __webpack_require__(268), __webpack_require__(73), {

	  eventNamespace: 'block',

	  mediatedEvents: {
	    'create': 'createBlock',
	    'remove': 'removeBlock',
	    'rerender': 'rerenderBlock',
	    'replace': 'replaceBlock',
	    'focusPrevious': 'focusPreviousBlock',
	    'focusNext': 'focusNextBlock'
	  },

	  initialize: function initialize() {},

	  createBlock: function createBlock(type, data, previousSibling) {
	    type = utils.classify(type);

	    // Run validations
	    if (!this.canCreateBlock(type)) {
	      return;
	    }

	    var block = new Blocks[type](data, this.instance_scope, this.mediator, this.blockOptions);
	    this.blocks.push(block);

	    this._incrementBlockTypeCount(type);
	    this.renderBlock(block, previousSibling);

	    this.triggerBlockCountUpdate();
	    this.mediator.trigger('block:limitReached', this.blockLimitReached());

	    EventBus.trigger(data ? "block:create:existing" : "block:create:new", block);
	    utils.log("Block created of type " + type);
	  },

	  removeBlock: function removeBlock(blockID, options) {
	    options = _Object$assign({
	      transposeContent: false,
	      focusOnPrevious: false
	    }, options);

	    var block = this.findBlockById(blockID);
	    var type = utils.classify(block.type);
	    var previousBlock = this.getPreviousBlock(block);
	    var nextBlock = this.getNextBlock(block);

	    if (options.transposeContent && block.textable) {

	      // Don't allow removal of first block if it's the only block.
	      if (!previousBlock && this.blocks.length === 1) {
	        return;
	      }

	      // If previous block can transpose content then append content.
	      if (previousBlock && previousBlock.textable) {
	        previousBlock.appendContent(block.getScribeInnerContent(), {
	          keepCaretPosition: true
	        });
	      } else {
	        // If there's content and the block above isn't textable then
	        // cancel remove.
	        if (block.getScribeInnerContent() !== '') {
	          return;
	        }

	        // If block before isn't textable then we want to still focus.
	        if (previousBlock) {
	          previousBlock.focusAtEnd();
	        } else if (nextBlock) {
	          // If there wasn't a previous block then
	          // we'll want to focus on the next block.
	          nextBlock.focus();
	        }
	      }
	    }

	    this.mediator.trigger('block-controls:reset');
	    this.blocks = this.blocks.filter(function (item) {
	      return item.blockID !== block.blockID;
	    });

	    block.remove();

	    if (options.focusOnPrevious && previousBlock) {
	      previousBlock.focusAtEnd();
	    }

	    this._decrementBlockTypeCount(type);
	    this.triggerBlockCountUpdate();
	    this.mediator.trigger('block:limitReached', this.blockLimitReached());

	    EventBus.trigger("block:remove");
	  },

	  replaceBlock: function replaceBlock(blockNode, type, data) {
	    var block = this.findBlockById(blockNode.id);
	    this.createBlock(type, data || null, blockNode);
	    this.removeBlock(blockNode.id);
	    block.remove();
	  },

	  renderBlock: function renderBlock(block, previousSibling) {
	    // REFACTOR: this will have to do until we're able to address
	    // the block manager
	    if (previousSibling) {
	      Dom.insertAfter(block.render().el, previousSibling);
	    } else {
	      this.wrapper.appendChild(block.render().el);
	    }
	    block.trigger("onRender");
	  },

	  rerenderBlock: function rerenderBlock(blockID) {
	    var block = this.findBlockById(blockID);
	    if (!_.isUndefined(block) && !block.isEmpty() && block.drop_options.re_render_on_reorder) {
	      block.beforeLoadingData();
	    }
	  },

	  getPreviousBlock: function getPreviousBlock(block) {
	    var blockPosition = this.getBlockPosition(block.el);
	    if (blockPosition < 1) {
	      return;
	    }
	    var previousBlock = this.wrapper.querySelectorAll('.st-block')[blockPosition - 1];
	    return this.findBlockById(previousBlock.getAttribute('id'));
	  },

	  getNextBlock: function getNextBlock(block) {
	    var blockPosition = this.getBlockPosition(block.el);
	    if (blockPosition < 0 || blockPosition >= this.blocks.length - 1) {
	      return;
	    }
	    return this.findBlockById(this.wrapper.querySelectorAll('.st-block')[blockPosition + 1].getAttribute('id'));
	  },

	  getBlockPosition: function getBlockPosition(block) {
	    return Array.prototype.indexOf.call(this.wrapper.querySelectorAll('.st-block'), block);
	  },

	  focusPreviousBlock: function focusPreviousBlock(blockID) {
	    var block = this.findBlockById(blockID);

	    if (block.textable) {
	      var previousBlock = this.getPreviousBlock(block);

	      if (previousBlock && previousBlock.textable) {
	        previousBlock.focusAtEnd();
	      }
	    }
	  },

	  focusNextBlock: function focusNextBlock(blockID) {
	    var block = this.findBlockById(blockID);

	    if (block && block.textable) {
	      var nextBlock = this.getNextBlock(block);

	      if (nextBlock && nextBlock.textable) {
	        nextBlock.focus();
	      }
	    }
	  },

	  triggerBlockCountUpdate: function triggerBlockCountUpdate() {
	    this.mediator.trigger('block:countUpdate', this.blocks.length);
	  },

	  canCreateBlock: function canCreateBlock(type) {
	    if (this.blockLimitReached()) {
	      utils.log("Cannot add any more blocks. Limit reached.");
	      return false;
	    }

	    if (!this.isBlockTypeAvailable(type)) {
	      utils.log("Block type not available " + type);
	      return false;
	    }

	    // Can we have another one of these blocks?
	    if (!this.canAddBlockType(type)) {
	      utils.log("Block Limit reached for type " + type);
	      return false;
	    }

	    return true;
	  },

	  validateBlockTypesExist: function validateBlockTypesExist(shouldValidate) {
	    if (config.skipValidation || !shouldValidate) {
	      return false;
	    }

	    (this.required || []).forEach(function (type, index) {
	      if (!this.isBlockTypeAvailable(type)) {
	        return;
	      }

	      if (this._getBlockTypeCount(type) === 0) {
	        utils.log("Failed validation on required block type " + type);
	        this.mediator.trigger('errors:add', { text: i18n.t("errors:type_missing", { type: type }) });
	      } else {
	        var blocks = this.getBlocksByType(type).filter(function (b) {
	          return !b.isEmpty();
	        });

	        if (blocks.length > 0) {
	          return false;
	        }

	        this.mediator.trigger('errors:add', {
	          text: i18n.t("errors:required_type_empty", { type: type })
	        });

	        utils.log("A required block type " + type + " is empty");
	      }
	    }, this);
	  },

	  findBlockById: function findBlockById(blockID) {
	    return this.blocks.find(function (b) {
	      return b.blockID === blockID;
	    });
	  },

	  getBlocksByType: function getBlocksByType(type) {
	    return this.blocks.filter(function (b) {
	      return utils.classify(b.type) === type;
	    });
	  },

	  getBlocksByIDs: function getBlocksByIDs(block_ids) {
	    return this.blocks.filter(function (b) {
	      return block_ids.includes(b.blockID);
	    });
	  },

	  blockLimitReached: function blockLimitReached() {
	    return this.options.blockLimit !== 0 && this.blocks.length >= this.options.blockLimit;
	  },

	  isBlockTypeAvailable: function isBlockTypeAvailable(t) {
	    return this.blockTypes.includes(t);
	  },

	  canAddBlockType: function canAddBlockType(type) {
	    var block_type_limit = this._getBlockTypeLimit(type);
	    return !(block_type_limit !== 0 && this._getBlockTypeCount(type) >= block_type_limit);
	  },

	  _setBlocksTypes: function _setBlocksTypes() {
	    this.blockTypes = this.options.blockTypes || _Object$keys(Blocks);
	  },

	  _setRequired: function _setRequired() {
	    this.required = false;

	    if (Array.isArray(this.options.required) && !_.isEmpty(this.options.required)) {
	      this.required = this.options.required;
	    }
	  },

	  _incrementBlockTypeCount: function _incrementBlockTypeCount(type) {
	    this.blockCounts[type] = _.isUndefined(this.blockCounts[type]) ? 1 : this.blockCounts[type] + 1;
	  },

	  _decrementBlockTypeCount: function _decrementBlockTypeCount(type) {
	    this.blockCounts[type] = _.isUndefined(this.blockCounts[type]) ? 1 : this.blockCounts[type] - 1;
	  },

	  _getBlockTypeCount: function _getBlockTypeCount(type) {
	    return _.isUndefined(this.blockCounts[type]) ? 0 : this.blockCounts[type];
	  },

	  _blockLimitReached: function _blockLimitReached() {
	    return this.options.blockLimit !== 0 && this.blocks.length >= this.options.blockLimit;
	  },

	  _getBlockTypeLimit: function _getBlockTypeLimit(t) {
	    if (!this.isBlockTypeAvailable(t)) {
	      return 0;
	    }
	    return parseInt(_.isUndefined(this.options.blockTypeLimits[t]) ? 0 : this.options.blockTypeLimits[t], 10);
	  }
	});

	module.exports = BlockManager;

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  Text: __webpack_require__(243),
	  Quote: __webpack_require__(261),
	  Image: __webpack_require__(262),
	  Heading: __webpack_require__(263),
	  List: __webpack_require__(264),
	  Tweet: __webpack_require__(266),
	  Video: __webpack_require__(267)
	};

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	  Text Block
	*/

	var Block = __webpack_require__(244);
	var stToHTML = __webpack_require__(253);

	var ScribeTextBlockPlugin = __webpack_require__(254);
	var ScribePastePlugin = __webpack_require__(258);
	var ScribeHeadingPlugin = __webpack_require__(259);
	var ScribeQuotePlugin = __webpack_require__(260);

	module.exports = Block.extend({

	  type: "text",

	  title: function title() {
	    return i18n.t('blocks:text:title');
	  },

	  editorHTML: '<div class="st-text-block" contenteditable="true"></div>',

	  icon_name: 'text',

	  textable: true,
	  toolbarEnabled: false,

	  configureScribe: function configureScribe(scribe) {
	    scribe.use(new ScribeTextBlockPlugin(this));
	    scribe.use(new ScribePastePlugin(this));
	    scribe.use(new ScribeHeadingPlugin(this));
	    scribe.use(new ScribeQuotePlugin(this));

	    scribe.on('content-changed', this.toggleEmptyClass.bind(this));
	  },

	  scribeOptions: {
	    allowBlockElements: true,
	    tags: {
	      p: true
	    }
	  },

	  loadData: function loadData(data) {
	    if (this.options.convertFromMarkdown && data.format !== "html") {
	      this.setTextBlockHTML(stToHTML(data.text, this.type));
	    } else {
	      this.setTextBlockHTML(data.text);
	    }
	  },

	  onBlockRender: function onBlockRender() {
	    this.focus();
	    this.toggleEmptyClass();
	  },

	  toggleEmptyClass: function toggleEmptyClass() {
	    this.el.classList.toggle('st-block--empty', this.isEmpty());
	  },

	  isEmpty: function isEmpty() {
	    return this._scribe.getTextContent() === '';
	  }
	});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(70)['default'];

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);

	var ScribeInterface = __webpack_require__(138);

	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);
	var Dom = __webpack_require__(69);
	var Events = __webpack_require__(131);
	var BlockMixins = __webpack_require__(128);

	var SimpleBlock = __webpack_require__(245);
	var BlockReorder = __webpack_require__(237);
	var BlockDeletion = __webpack_require__(238);
	var BlockPositioner = __webpack_require__(234);
	var EventBus = __webpack_require__(75);

	var Spinner = __webpack_require__(251);

	var DELETE_TEMPLATE = __webpack_require__(252);

	var Block = function Block(data, instance_id, mediator, options) {
	  SimpleBlock.apply(this, arguments);
	};

	Block.prototype = _Object$create(SimpleBlock.prototype);
	Block.prototype.constructor = Block;

	_Object$assign(Block.prototype, SimpleBlock.fn, __webpack_require__(239), {

	  bound: ["_handleContentPaste", "_onFocus", "_onBlur", "onDrop", "onDeleteClick", "clearInsertedStyles", "getSelectionForFormatter", "onBlockRender", "onDeleteConfirm"],

	  className: 'st-block',

	  attributes: function attributes() {
	    return _Object$assign(SimpleBlock.fn.attributes.call(this));
	  },

	  icon_name: 'default',

	  validationFailMsg: function validationFailMsg() {
	    return i18n.t('errors:validation_fail', { type: this.title });
	  },

	  editorHTML: "<div class=\"st-block__editor\"></div>",

	  toolbarEnabled: true,

	  availableMixins: ['droppable', 'pastable', 'uploadable', 'fetchable', 'ajaxable', 'controllable', 'multi_editable', 'textable'],

	  droppable: false,
	  pastable: false,
	  uploadable: false,
	  fetchable: false,
	  ajaxable: false,
	  multi_editable: false,
	  textable: false,

	  drop_options: {},
	  paste_options: {},
	  upload_options: {},

	  formattable: true,

	  _previousSelection: '',

	  initialize: function initialize() {},

	  toMarkdown: function toMarkdown(markdown) {
	    return markdown;
	  },
	  toHTML: function toHTML(html) {
	    return html;
	  },

	  withMixin: function withMixin(mixin) {
	    if (!_.isObject(mixin)) {
	      return;
	    }

	    var initializeMethod = "initialize" + mixin.mixinName;

	    if (_.isUndefined(this[initializeMethod])) {
	      _Object$assign(this, mixin);
	      this[initializeMethod]();
	    }
	  },

	  render: function render() {
	    this.beforeBlockRender();
	    this._setBlockInner();

	    this.editor = this.inner.children[0];

	    this.mixinsRequireInputs = false;
	    this.availableMixins.forEach(function (mixin) {
	      if (this[mixin]) {
	        var blockMixin = BlockMixins[utils.classify(mixin)];
	        if (!_.isUndefined(blockMixin.requireInputs) && blockMixin.requireInputs) {
	          this.mixinsRequireInputs = true;
	        }
	      }
	    }, this);

	    if (this.mixinsRequireInputs) {
	      var input_html = document.createElement("div");
	      input_html.classList.add('st-block__inputs');
	      this.inner.appendChild(input_html);
	      this.inputs = input_html;
	    }

	    if (this.hasTextBlock()) {
	      this._initTextBlocks();
	    }

	    this.availableMixins.forEach(function (mixin) {
	      if (this[mixin]) {
	        this.withMixin(BlockMixins[utils.classify(mixin)]);
	      }
	    }, this);

	    if (this.formattable) {
	      this._initFormatting();
	    }

	    this._blockPrepare();

	    return this;
	  },

	  remove: function remove() {
	    if (this.ajaxable) {
	      this.resolveAllInQueue();
	    }

	    Dom.remove(this.el);
	  },

	  loading: function loading() {
	    if (!_.isUndefined(this.spinner)) {
	      this.ready();
	    }

	    this.spinner = new Spinner(config.defaults.spinner);
	    this.spinner.spin(this.el);

	    this.el.classList.add('st--is-loading');
	  },

	  ready: function ready() {
	    this.el.classList.remove('st--is-loading');
	    if (!_.isUndefined(this.spinner)) {
	      this.spinner.stop();
	      delete this.spinner;
	    }
	  },

	  //Generic _serializeData implementation to serialize the block into a plain object.
	  //Can be overwritten, although hopefully this will cover most situations.
	  //If you want to get the data of your block use block.getBlockData()
	  _serializeData: function _serializeData() {
	    utils.log("toData for " + this.blockID);

	    var data = {};

	    //[> Simple to start. Add conditions later <]
	    if (this.hasTextBlock()) {
	      data.text = this.getTextBlockHTML();
	      data.format = 'html';
	    }

	    // Add any inputs to the data attr
	    var matcher = ['input:not([class="st-paste-block"])', 'textarea:not([class="st-paste-block"])', 'select:not([class="st-paste-block"])', 'button:not([class="st-paste-block"])'].join(",");
	    if (this.$(matcher).length > 0) {
	      Array.prototype.forEach.call(this.$('input, textarea, select, button'), function (input) {
	        if (input.getAttribute('name')) {
	          data[input.getAttribute('name')] = input.value;
	        }
	      });
	    }

	    return data;
	  },

	  //[> Generic implementation to tell us when the block is active <]
	  focus: function focus() {
	    Array.prototype.forEach.call(this.getTextBlock(), function (el) {
	      el.focus();
	    });
	  },

	  focusAtEnd: function focusAtEnd() {
	    this.focus();
	  },

	  blur: function blur() {
	    Array.prototype.forEach.call(this.getTextBlock(), function (el) {
	      el.blur();
	    });
	  },

	  onFocus: function onFocus() {
	    var _this = this;

	    Array.prototype.forEach.call(this.getTextBlock(), function (el) {
	      el.addEventListener('focus', _this._onFocus);
	    });
	  },

	  onBlur: function onBlur() {
	    var _this2 = this;

	    Array.prototype.forEach.call(this.getTextBlock(), function (el) {
	      el.addEventListener('blur', _this2._onBlur);
	    });
	  },

	  //Event handlers
	  _onFocus: function _onFocus() {
	    this.trigger('blockFocus', this.el);
	  },

	  _onBlur: function _onBlur() {},

	  onBlockRender: function onBlockRender() {
	    this.focus();
	  },

	  onDrop: function onDrop(dataTransferObj) {},

	  onDeleteConfirm: function onDeleteConfirm(e) {
	    e.preventDefault();
	    this.mediator.trigger('block:remove', this.blockID, { focusOnPrevious: true });
	  },

	  // REFACTOR: have one set of delete controls that moves around like the
	  // block controls?
	  addDeleteControls: function addDeleteControls() {
	    var _this3 = this;

	    var onDeleteDeny = function onDeleteDeny(e) {
	      e.preventDefault();
	      _this3.deleteEl.classList.remove("active");
	    };

	    this.ui.insertAdjacentHTML("beforeend", DELETE_TEMPLATE);
	    Events.delegate(this.el, ".js-st-block-confirm-delete", "click", this.onDeleteConfirm);
	    Events.delegate(this.el, ".js-st-block-deny-delete", "click", onDeleteDeny);
	  },

	  onDeleteClick: function onDeleteClick(ev) {
	    ev.preventDefault();

	    if (this.isEmpty()) {
	      this.onDeleteConfirm.call(this, new Event('click'));
	      return;
	    }

	    this.deleteEl = this.el.querySelector('.st-block__ui-delete-controls');
	    this.deleteEl.classList.toggle('active');
	  },

	  beforeLoadingData: function beforeLoadingData() {
	    this.loading();

	    if (this.mixinsRequireInputs) {
	      Dom.show(this.editor);
	      Dom.hide(this.inputs);
	    }

	    SimpleBlock.fn.beforeLoadingData.call(this);

	    this.ready();
	  },

	  execTextBlockCommand: function execTextBlockCommand(cmdName) {
	    if (_.isUndefined(this._scribe)) {
	      throw "No Scribe instance found to send a command to";
	    }

	    return ScribeInterface.execTextBlockCommand(this._scribe, cmdName);
	  },

	  queryTextBlockCommandState: function queryTextBlockCommandState(cmdName) {
	    if (_.isUndefined(this._scribe)) {
	      throw "No Scribe instance found to query command";
	    }

	    return ScribeInterface.queryTextBlockCommandState(this._scribe, cmdName);
	  },

	  _handleContentPaste: function _handleContentPaste(ev) {
	    setTimeout(this.onContentPasted.bind(this, ev, ev.currentTarget), 0);
	  },

	  _getBlockClass: function _getBlockClass() {
	    return 'st-block--' + this.className;
	  },

	  //Init functions for adding functionality
	  _initUIComponents: function _initUIComponents() {

	    this.addDeleteControls();

	    var positioner = new BlockPositioner(this.el, this.mediator);

	    this._withUIComponent(positioner, '.st-block-ui-btn__reorder', positioner.toggle);

	    this._withUIComponent(new BlockReorder(this.el, this.mediator));

	    this._withUIComponent(new BlockDeletion(), '.st-block-ui-btn__delete', this.onDeleteClick);

	    this.onFocus();
	    this.onBlur();
	  },

	  _initFormatting: function _initFormatting() {

	    // Enable formatting keyboard input
	    var block = this;

	    if (!this.options.formatBar) {
	      return;
	    }

	    this.options.formatBar.commands.forEach(function (cmd) {
	      if (_.isUndefined(cmd.keyCode)) {
	        return;
	      }

	      var ctrlDown = false;

	      Events.delegate(block.el, '.st-text-block', 'keyup', function (ev) {
	        if (ev.which === 17 || ev.which === 224 || ev.which === 91) {
	          ctrlDown = false;
	        }
	      });
	      Events.delegate(block.el, '.st-text-block', 'keydown', function (ev) {
	        if (ev.which === 17 || ev.which === 224 || ev.which === 91) {
	          ctrlDown = true;
	        }

	        if (ev.which === cmd.keyCode && ctrlDown) {
	          ev.preventDefault();
	          block.execTextBlockCommand(cmd);
	        }
	      });
	    });
	  },

	  _initTextBlocks: function _initTextBlocks() {
	    var _this4 = this;

	    Array.prototype.forEach.call(this.getTextBlock(), function (el) {
	      el.addEventListener('keyup', _this4.getSelectionForFormatter);
	      el.addEventListener('mouseup', _this4.getSelectionForFormatter);
	      el.addEventListener('DOMNodeInserted', _this4.clearInsertedStyles);
	    });

	    var textBlock = this.getTextBlock()[0];
	    if (!_.isUndefined(textBlock) && _.isUndefined(this._scribe)) {

	      var configureScribe = _.isFunction(this.configureScribe) ? this.configureScribe.bind(this) : null;
	      this._scribe = ScribeInterface.initScribeInstance(textBlock, this.scribeOptions, configureScribe);
	    }
	  },

	  getSelectionForFormatter: function getSelectionForFormatter() {
	    var _this5 = this;

	    setTimeout(function () {
	      var selection = window.getSelection(),
	          selectionStr = selection.toString().trim(),
	          en = 'formatter:' + (selectionStr === '' ? 'hide' : 'position');

	      _this5.mediator.trigger(en, _this5);
	      EventBus.trigger(en, _this5);
	    }, 1);
	  },

	  clearInsertedStyles: function clearInsertedStyles(e) {
	    var target = e.target;
	    if (_.isUndefined(target.tagName)) {
	      target = target.parentNode;
	    }
	    target.removeAttribute('style'); // Hacky fix for Chrome.
	  },

	  hasTextBlock: function hasTextBlock() {
	    return this.getTextBlock().length > 0;
	  },

	  getTextBlock: function getTextBlock() {
	    if (_.isUndefined(this.text_block)) {
	      this.text_block = this.$('.st-text-block');
	    }

	    return this.text_block;
	  },

	  getTextBlockHTML: function getTextBlockHTML() {
	    return this._scribe.getContent();
	  },

	  setTextBlockHTML: function setTextBlockHTML(html) {
	    var returnVal = this._scribe.setContent(html);

	    // Remove any whitespace in the first node, otherwise selections won't work.
	    var firstNode = this._scribe.node.firstDeepestChild(this._scribe.el);
	    if (firstNode.nodeName === '#text') {
	      firstNode.textContent = utils.leftTrim(firstNode.textContent);
	    }

	    // Remove all empty nodes at the front to get blocks working.
	    while (this._scribe.el.firstChild && this._scribe.el.firstChild.textContent === '') {
	      this._scribe.el.removeChild(this._scribe.el.firstChild);
	    }

	    // Firefox adds empty br tags at the end of content.
	    while (this._scribe.el.lastChild && this._scribe.el.lastChild.nodeName === 'BR') {
	      this._scribe.el.removeChild(this._scribe.el.lastChild);
	    }

	    return returnVal;
	  },

	  isEmpty: function isEmpty() {
	    return _.isEmpty(this.getBlockData());
	  }

	});

	Block.extend = __webpack_require__(250); // Allow our Block to be extended.

	module.exports = Block;

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);
	var Dom = __webpack_require__(69);
	var Events = __webpack_require__(131);

	var BlockReorder = __webpack_require__(237);

	var BLOCK_TEMPLATE = __webpack_require__(246);

	var SimpleBlock = function SimpleBlock(data, instance_id, mediator, options) {
	  this.createStore(data);
	  this.blockID = _.uniqueId('st-block-');
	  this.instanceID = instance_id;
	  this.mediator = mediator;
	  this.options = options || {};

	  this._ensureElement();
	  this._bindFunctions();

	  this.initialize.apply(this, arguments);
	};

	_Object$assign(SimpleBlock.prototype, __webpack_require__(235), __webpack_require__(73), __webpack_require__(236), __webpack_require__(240), {

	  focus: function focus() {},

	  valid: function valid() {
	    return true;
	  },

	  className: 'st-block',

	  block_template: BLOCK_TEMPLATE,

	  attributes: function attributes() {
	    return {
	      'id': this.blockID,
	      'data-type': this.type,
	      'data-instance': this.instanceID
	    };
	  },

	  title: function title() {
	    return utils.titleize(this.type.replace(/[\W_]/g, ' '));
	  },

	  blockCSSClass: function blockCSSClass() {
	    this.blockCSSClass = utils.toSlug(this.type);
	    return this.blockCSSClass;
	  },

	  type: '',

	  'class': function _class() {
	    return utils.classify(this.type);
	  },

	  editorHTML: '',

	  initialize: function initialize() {},

	  onBlockRender: function onBlockRender() {},
	  beforeBlockRender: function beforeBlockRender() {},

	  _setBlockInner: function _setBlockInner() {
	    var editor_html = _.result(this, 'editorHTML');

	    this.el.insertAdjacentHTML("beforeend", this.block_template(editor_html));

	    this.inner = this.el.querySelector('.st-block__inner');
	  },

	  render: function render() {
	    this.beforeBlockRender();

	    this._setBlockInner();
	    this._blockPrepare();

	    return this;
	  },

	  _blockPrepare: function _blockPrepare() {
	    this._initUI();
	    this._initMessages();

	    this.checkAndLoadData();

	    this.el.classList.add('st-item-ready');
	    this.on("onRender", this.onBlockRender);
	    this.save();
	  },

	  _withUIComponent: function _withUIComponent(component, className, callback) {
	    this.ui.appendChild(component.render().el);
	    if (className && callback) {
	      Events.delegate(this.ui, className, 'click', callback);
	    }
	  },

	  _initUI: function _initUI() {
	    var ui_element = Dom.createElement("div", { 'class': 'st-block__ui' });
	    this.el.appendChild(ui_element);
	    this.ui = ui_element;
	    this._initUIComponents();
	  },

	  _initMessages: function _initMessages() {
	    var msgs_element = Dom.createElement("div", { 'class': 'st-block__messages' });
	    this.inner.insertBefore(msgs_element, this.inner.firstChild);
	    this.messages = msgs_element;
	  },

	  addMessage: function addMessage(msg, additionalClass) {
	    msg = Dom.createElement("span", { html: msg, 'class': "st-msg " + additionalClass });
	    this.messages.appendChild(msg);
	    this.messages.classList.add('st-block__messages--is-visible');
	    return msg;
	  },

	  resetMessages: function resetMessages() {
	    this.messages.innerHTML = '';
	    this.messages.classList.remove('st-block__messages--is-visible');
	  },

	  _initUIComponents: function _initUIComponents() {
	    this._withUIComponent(new BlockReorder(this.el));
	  }

	});

	SimpleBlock.fn = SimpleBlock.prototype;

	// Allow our Block to be extended.
	SimpleBlock.extend = __webpack_require__(250);

	module.exports = SimpleBlock;

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var BLOCK_ADDITION_TOP_TEMPLATE = __webpack_require__(247);
	var BLOCK_ADDITION_TEMPLATE = __webpack_require__(248);
	var BLOCK_REPLACER_TEMPLATE = __webpack_require__(249);

	module.exports = function (editor_html) {
	  return "\n    <div class='st-block__inner'>\n      " + editor_html + "\n    </div>\n    " + BLOCK_REPLACER_TEMPLATE() + "\n    " + BLOCK_ADDITION_TOP_TEMPLATE() + "\n    " + BLOCK_ADDITION_TEMPLATE() + "\n  ";
	};

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(68);

	module.exports = function () {
	  return "\n    <div class=\"st-block-addition-top\">\n      <div class=\"st-block-addition-top__button\" type=\"button\"></div>\n      <div class=\"st-block-addition-top__icon\">\n        <svg role=\"img\" class=\"st-icon\">\n          <use xlink:href=\"" + config.defaults.iconUrl + "#add-block\"/>\n        </svg>\n      </div>\n    </div>\n  ";
	};

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(68);

	module.exports = function () {
	  return "\n    <button class=\"st-block-addition\" type=\"button\">\n      <span class=\"st-block-addition__button\">\n        <svg role=\"img\" class=\"st-icon\">\n          <use xlink:href=\"" + config.defaults.iconUrl + "#plus\"/>\n        </svg>\n      </span>\n    </button>\n  ";
	};

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(68);

	module.exports = function () {
	  return "\n    <button class=\"st-block-replacer\" type=\"button\">\n      <span class=\"st-block-replacer__button\">\n        <svg role=\"img\" class=\"st-icon\">\n          <use xlink:href=\"" + config.defaults.iconUrl + "#add-block\"/>\n        </svg>\n      </span>\n    </button>\n  ";
	};

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	  Backbone Inheritence 
	  --
	  From: https://github.com/documentcloud/backbone/blob/master/backbone.js
	  Backbone.js 0.9.2
	  (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
	*/

	var _Object$assign = __webpack_require__(2)["default"];

	module.exports = function (protoProps, staticProps) {
	  var parent = this;
	  var child;

	  // The constructor function for the new subclass is either defined by you
	  // (the "constructor" property in your `extend` definition), or defaulted
	  // by us to simply call the parent's constructor.
	  if (protoProps && protoProps.hasOwnProperty('constructor')) {
	    child = protoProps.constructor;
	  } else {
	    child = function () {
	      return parent.apply(this, arguments);
	    };
	  }

	  // Add static properties to the constructor function, if supplied.
	  _Object$assign(child, parent, staticProps);

	  // Set the prototype chain to inherit from `parent`, without calling
	  // `parent`'s constructor function.
	  var Surrogate = function Surrogate() {
	    this.constructor = child;
	  };
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate(); // jshint ignore:line

	  // Add prototype properties (instance properties) to the subclass,
	  // if supplied.
	  if (protoProps) {
	    _Object$assign(child.prototype, protoProps);
	  }

	  // Set a convenience property in case the parent's prototype is needed
	  // later.
	  child.__super__ = parent.prototype;

	  return child;
	};

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2011-2014 Felix Gnass
	 * Licensed under the MIT license
	 * http://spin.js.org/
	 *
	 * Example:
	    var opts = {
	      lines: 12             // The number of lines to draw
	    , length: 7             // The length of each line
	    , width: 5              // The line thickness
	    , radius: 10            // The radius of the inner circle
	    , scale: 1.0            // Scales overall size of the spinner
	    , corners: 1            // Roundness (0..1)
	    , color: '#000'         // #rgb or #rrggbb
	    , opacity: 1/4          // Opacity of the lines
	    , rotate: 0             // Rotation offset
	    , direction: 1          // 1: clockwise, -1: counterclockwise
	    , speed: 1              // Rounds per second
	    , trail: 100            // Afterglow percentage
	    , fps: 20               // Frames per second when using setTimeout()
	    , zIndex: 2e9           // Use a high z-index by default
	    , className: 'spinner'  // CSS class to assign to the element
	    , top: '50%'            // center vertically
	    , left: '50%'           // center horizontally
	    , shadow: false         // Whether to render a shadow
	    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	    , position: 'absolute'  // Element positioning
	    }
	    var target = document.getElementById('foo')
	    var spinner = new Spinner(opts).spin(target)
	 */
	;(function (root, factory) {

	  /* CommonJS */
	  if (typeof module == 'object' && module.exports) module.exports = factory()

	  /* AMD module */
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

	  /* Browser global */
	  else root.Spinner = factory()
	}(this, function () {
	  "use strict"

	  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
	    , animations = {} /* Animation rules keyed by their name */
	    , useCssAnimations /* Whether to use CSS animations or setTimeout */
	    , sheet /* A stylesheet to hold the @keyframe or VML rules. */

	  /**
	   * Utility function to create elements. If no tag name is given,
	   * a DIV is created. Optionally properties can be passed.
	   */
	  function createEl (tag, prop) {
	    var el = document.createElement(tag || 'div')
	      , n

	    for (n in prop) el[n] = prop[n]
	    return el
	  }

	  /**
	   * Appends children and returns the parent.
	   */
	  function ins (parent /* child1, child2, ...*/) {
	    for (var i = 1, n = arguments.length; i < n; i++) {
	      parent.appendChild(arguments[i])
	    }

	    return parent
	  }

	  /**
	   * Creates an opacity keyframe animation rule and returns its name.
	   * Since most mobile Webkits have timing issues with animation-delay,
	   * we create separate rules for each line/segment.
	   */
	  function addAnimation (alpha, trail, i, lines) {
	    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
	      , start = 0.01 + i/lines * 100
	      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
	      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
	      , pre = prefix && '-' + prefix + '-' || ''

	    if (!animations[name]) {
	      sheet.insertRule(
	        '@' + pre + 'keyframes ' + name + '{' +
	        '0%{opacity:' + z + '}' +
	        start + '%{opacity:' + alpha + '}' +
	        (start+0.01) + '%{opacity:1}' +
	        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
	        '100%{opacity:' + z + '}' +
	        '}', sheet.cssRules.length)

	      animations[name] = 1
	    }

	    return name
	  }

	  /**
	   * Tries various vendor prefixes and returns the first supported property.
	   */
	  function vendor (el, prop) {
	    var s = el.style
	      , pp
	      , i

	    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
	    if (s[prop] !== undefined) return prop
	    for (i = 0; i < prefixes.length; i++) {
	      pp = prefixes[i]+prop
	      if (s[pp] !== undefined) return pp
	    }
	  }

	  /**
	   * Sets multiple style properties at once.
	   */
	  function css (el, prop) {
	    for (var n in prop) {
	      el.style[vendor(el, n) || n] = prop[n]
	    }

	    return el
	  }

	  /**
	   * Fills in default values.
	   */
	  function merge (obj) {
	    for (var i = 1; i < arguments.length; i++) {
	      var def = arguments[i]
	      for (var n in def) {
	        if (obj[n] === undefined) obj[n] = def[n]
	      }
	    }
	    return obj
	  }

	  /**
	   * Returns the line color from the given string or array.
	   */
	  function getColor (color, idx) {
	    return typeof color == 'string' ? color : color[idx % color.length]
	  }

	  // Built-in defaults

	  var defaults = {
	    lines: 12             // The number of lines to draw
	  , length: 7             // The length of each line
	  , width: 5              // The line thickness
	  , radius: 10            // The radius of the inner circle
	  , scale: 1.0            // Scales overall size of the spinner
	  , corners: 1            // Roundness (0..1)
	  , color: '#000'         // #rgb or #rrggbb
	  , opacity: 1/4          // Opacity of the lines
	  , rotate: 0             // Rotation offset
	  , direction: 1          // 1: clockwise, -1: counterclockwise
	  , speed: 1              // Rounds per second
	  , trail: 100            // Afterglow percentage
	  , fps: 20               // Frames per second when using setTimeout()
	  , zIndex: 2e9           // Use a high z-index by default
	  , className: 'spinner'  // CSS class to assign to the element
	  , top: '50%'            // center vertically
	  , left: '50%'           // center horizontally
	  , shadow: false         // Whether to render a shadow
	  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	  , position: 'absolute'  // Element positioning
	  }

	  /** The constructor */
	  function Spinner (o) {
	    this.opts = merge(o || {}, Spinner.defaults, defaults)
	  }

	  // Global defaults that override the built-ins:
	  Spinner.defaults = {}

	  merge(Spinner.prototype, {
	    /**
	     * Adds the spinner to the given target element. If this instance is already
	     * spinning, it is automatically removed from its previous target b calling
	     * stop() internally.
	     */
	    spin: function (target) {
	      this.stop()

	      var self = this
	        , o = self.opts
	        , el = self.el = createEl(null, {className: o.className})

	      css(el, {
	        position: o.position
	      , width: 0
	      , zIndex: o.zIndex
	      , left: o.left
	      , top: o.top
	      })

	      if (target) {
	        target.insertBefore(el, target.firstChild || null)
	      }

	      el.setAttribute('role', 'progressbar')
	      self.lines(el, self.opts)

	      if (!useCssAnimations) {
	        // No CSS animation support, use setTimeout() instead
	        var i = 0
	          , start = (o.lines - 1) * (1 - o.direction) / 2
	          , alpha
	          , fps = o.fps
	          , f = fps / o.speed
	          , ostep = (1 - o.opacity) / (f * o.trail / 100)
	          , astep = f / o.lines

	        ;(function anim () {
	          i++
	          for (var j = 0; j < o.lines; j++) {
	            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

	            self.opacity(el, j * o.direction + start, alpha, o)
	          }
	          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
	        })()
	      }
	      return self
	    }

	    /**
	     * Stops and removes the Spinner.
	     */
	  , stop: function () {
	      var el = this.el
	      if (el) {
	        clearTimeout(this.timeout)
	        if (el.parentNode) el.parentNode.removeChild(el)
	        this.el = undefined
	      }
	      return this
	    }

	    /**
	     * Internal method that draws the individual lines. Will be overwritten
	     * in VML fallback mode below.
	     */
	  , lines: function (el, o) {
	      var i = 0
	        , start = (o.lines - 1) * (1 - o.direction) / 2
	        , seg

	      function fill (color, shadow) {
	        return css(createEl(), {
	          position: 'absolute'
	        , width: o.scale * (o.length + o.width) + 'px'
	        , height: o.scale * o.width + 'px'
	        , background: color
	        , boxShadow: shadow
	        , transformOrigin: 'left'
	        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
	        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
	        })
	      }

	      for (; i < o.lines; i++) {
	        seg = css(createEl(), {
	          position: 'absolute'
	        , top: 1 + ~(o.scale * o.width / 2) + 'px'
	        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
	        , opacity: o.opacity
	        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
	        })

	        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
	        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
	      }
	      return el
	    }

	    /**
	     * Internal method that adjusts the opacity of a single line.
	     * Will be overwritten in VML fallback mode below.
	     */
	  , opacity: function (el, i, val) {
	      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
	    }

	  })


	  function initVML () {

	    /* Utility function to create a VML tag */
	    function vml (tag, attr) {
	      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
	    }

	    // No CSS transforms but VML support, add a CSS rule for VML elements:
	    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

	    Spinner.prototype.lines = function (el, o) {
	      var r = o.scale * (o.length + o.width)
	        , s = o.scale * 2 * r

	      function grp () {
	        return css(
	          vml('group', {
	            coordsize: s + ' ' + s
	          , coordorigin: -r + ' ' + -r
	          })
	        , { width: s, height: s }
	        )
	      }

	      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
	        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
	        , i

	      function seg (i, dx, filter) {
	        ins(
	          g
	        , ins(
	            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
	          , ins(
	              css(
	                vml('roundrect', {arcsize: o.corners})
	              , { width: r
	                , height: o.scale * o.width
	                , left: o.scale * o.radius
	                , top: -o.scale * o.width >> 1
	                , filter: filter
	                }
	              )
	            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
	            , vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
	            )
	          )
	        )
	      }

	      if (o.shadow)
	        for (i = 1; i <= o.lines; i++) {
	          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
	        }

	      for (i = 1; i <= o.lines; i++) seg(i)
	      return ins(el, g)
	    }

	    Spinner.prototype.opacity = function (el, i, val, o) {
	      var c = el.firstChild
	      o = o.shadow && o.lines || 0
	      if (c && i + o < c.childNodes.length) {
	        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
	        if (c) c.opacity = val
	      }
	    }
	  }

	  if (typeof document !== 'undefined') {
	    sheet = (function () {
	      var el = createEl('style', {type : 'text/css'})
	      ins(document.getElementsByTagName('head')[0], el)
	      return el.sheet || el.styleSheet
	    }())

	    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

	    if (!vendor(probe, 'transform') && probe.adj) initVML()
	    else useCssAnimations = vendor(probe, 'animation')
	  }

	  return Spinner

	}));


/***/ },
/* 252 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '\n  <div class="st-block__ui-delete-controls">\n    <label class="st-block__delete-label">\n      ' + i18n.t('general:delete') + '\n    </label>\n    <button class=\'st-block-ui__confirm js-st-block-confirm-delete\' type="button">\n      ' + i18n.t('general:yes') + '\n    </button>\n    <button class=\'st-block-ui__confirm js-st-block-deny-delete\' type="button">\n      ' + i18n.t('general:no') + '\n    </button>\n  </div>\n';

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);

	module.exports = function (markdown, type) {

	  // Deferring requiring these to sidestep a circular dependency:
	  // Block -> this -> Blocks -> Block
	  var Blocks = __webpack_require__(242);

	  // MD -> HTML
	  type = utils.classify(type);

	  var html = markdown,
	      shouldWrap = type === "Text";

	  if (_.isUndefined(shouldWrap)) {
	    shouldWrap = false;
	  }

	  if (shouldWrap) {
	    html = "<p>" + html;
	  }

	  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gm, function (match, p1, p2) {
	    return "<a href='" + p2 + "'>" + p1.replace(/\n/g, '') + "</a>";
	  });

	  // This may seem crazy, but because JS doesn't have a look behind,
	  // we reverse the string to regex out the italic items (and bold)
	  // and look for something that doesn't start (or end in the reversed strings case)
	  // with a slash.
	  html = utils.reverse(utils.reverse(html).replace(/_(?!\\)((_\\|[^_])*)_(?=$|[^\\])/gm, function (match, p1) {
	    return ">i/<" + p1.replace(/\n/g, '').replace(/[\s]+$/, '') + ">i<";
	  }).replace(/\*\*(?!\\)((\*\*\\|[^\*\*])*)\*\*(?=$|[^\\])/gm, function (match, p1) {
	    return ">b/<" + p1.replace(/\n/g, '').replace(/[\s]+$/, '') + ">b<";
	  }));

	  html = html.replace(/^\> (.+)$/mg, "$1");

	  // Use custom block toHTML functions (if any exist)
	  var block;
	  if (Blocks.hasOwnProperty(type)) {
	    block = Blocks[type];
	    // Do we have a toHTML function?
	    if (!_.isUndefined(block.prototype.toHTML) && _.isFunction(block.prototype.toHTML)) {
	      html = block.prototype.toHTML(html);
	    }
	  }

	  if (shouldWrap) {
	    html = html.replace(/\n\s*\n/gm, "</p><p>");
	    html = html.replace(/\n/gm, "<br>");
	  }

	  html = html.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/\n/g, "<br>").replace(/\*\*/, "").replace(/__/, ""); // Cleanup any markdown characters left

	  // Replace escaped
	  html = html.replace(/\\\*/g, "*").replace(/\\\[/g, "[").replace(/\\\]/g, "]").replace(/\\\_/g, "_").replace(/\\\(/g, "(").replace(/\\\)/g, ")").replace(/\\\-/g, "-");

	  if (shouldWrap) {
	    html += "</p>";
	  }

	  return html;
	};

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Array$from = __webpack_require__(255)['default'];

	var selectionRange = __webpack_require__(230);

	var ScribeTextBlockPlugin = function ScribeTextBlockPlugin(block) {
	  return function (scribe) {

	    // Remove any empty elements at the start of the range.
	    var stripFirstEmptyElement = function stripFirstEmptyElement(div) {
	      var firstChild = div.firstChild.childNodes[0];
	      if (firstChild && firstChild.nodeName !== '#text') {
	        if (firstChild.innerText === '') {
	          div.firstChild.removeChild(firstChild);
	        }
	      }
	    };

	    var rangeToHTML = function rangeToHTML(range, extract) {
	      var div = document.createElement('div');
	      if (extract) {
	        div.appendChild(range.extractContents());
	      } else {
	        div.appendChild(range.cloneContents());
	      }

	      stripFirstEmptyElement(div);

	      // Sometimes you'll get an empty tag at the start of the block.
	      if (div.firstChild.nodeName !== '#text') {
	        div = div.lastChild;
	      }

	      return div.innerHTML.trim();
	    };

	    var selectToEnd = function selectToEnd() {
	      var selection = new scribe.api.Selection();
	      var range = selection.range.cloneRange();
	      range.setEndAfter(scribe.el.lastChild, 0);

	      return range;
	    };

	    var isAtStartOfBlock = function isAtStartOfBlock() {
	      if (scribe.getTextContent() === '') {
	        return true;
	      }

	      var selection = new scribe.api.Selection();
	      var range = selection.range.cloneRange();

	      range.setStartBefore(scribe.el.firstChild, 0);

	      return rangeToHTML(range, false) === '';
	    };

	    var getTotalLength = function getTotalLength() {
	      var selection = new scribe.api.Selection();
	      var range = selection.range.cloneRange();
	      range.selectNodeContents(scribe.el);

	      return range.toString().length;
	    };

	    var isAtEndOfBlock = function isAtEndOfBlock() {
	      var currentRange = selectionRange(scribe.el);

	      return getTotalLength() === currentRange.end && currentRange.start === currentRange.end;
	    };

	    var createBlocksFromParagraphs = function createBlocksFromParagraphs() {
	      var fakeContent = document.createElement('div');
	      fakeContent.appendChild(selectToEnd().extractContents());

	      stripFirstEmptyElement(fakeContent);

	      // Add wrapper div which is missing in non blockElement scribe.
	      if (!scribe.allowsBlockElements()) {
	        var tempContent = document.createElement('div');
	        tempContent.appendChild(fakeContent);
	        fakeContent = tempContent;
	      }

	      if (fakeContent.childNodes.length >= 1) {
	        var data;
	        var nodes = _Array$from(fakeContent.childNodes);
	        nodes.reverse().forEach(function (node) {
	          if (node.innerText !== '') {
	            data = {
	              format: 'html',
	              text: node.innerHTML.trim()
	            };
	            block.mediator.trigger("block:create", 'Text', data, block.el);
	          }
	        });
	      }
	    };

	    var isAtStart = false;

	    scribe.el.addEventListener('keydown', function (ev) {

	      if (ev.keyCode === 13 && !ev.shiftKey) {
	        // enter pressed
	        ev.preventDefault();

	        if (isAtEndOfBlock()) {

	          // Remove any bad characters after current selection.
	          selectToEnd().extractContents();
	          block.mediator.trigger("block:create", 'Text', null, block.el);
	        } else {
	          createBlocksFromParagraphs();
	        }

	        // If the block is left empty then we need to reset the placeholder content.
	        if (scribe.allowsBlockElements() && scribe.getTextContent() === '') {
	          scribe.setContent('<p><br></p>');
	        }
	      } else if ((ev.keyCode === 37 || ev.keyCode === 38) && isAtStartOfBlock()) {
	        ev.preventDefault();

	        block.mediator.trigger("block:focusPrevious", block.blockID);
	      } else if (ev.keyCode === 8 && isAtStartOfBlock()) {
	        ev.preventDefault();

	        isAtStart = true;
	      } else if ((ev.keyCode === 39 || ev.keyCode === 40) && isAtEndOfBlock()) {
	        ev.preventDefault();

	        block.mediator.trigger("block:focusNext", block.blockID);
	      }
	    });

	    scribe.el.addEventListener('keyup', function (ev) {
	      if (ev.keyCode === 8 && isAtStart) {
	        ev.preventDefault();

	        block.mediator.trigger('block:remove', block.blockID, {
	          transposeContent: true
	        });

	        isAtStart = false;
	      }
	    });
	  };
	};

	module.exports = ScribeTextBlockPlugin;

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(256), __esModule: true };

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	__webpack_require__(257);
	module.exports = __webpack_require__(7).Array.from;

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(8)
	  , $export     = __webpack_require__(5)
	  , toObject    = __webpack_require__(12)
	  , call        = __webpack_require__(113)
	  , isArrayIter = __webpack_require__(114)
	  , toLength    = __webpack_require__(115)
	  , getIterFn   = __webpack_require__(116);
	$export($export.S + $export.F * !__webpack_require__(127)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	When content is pasted into a block take the sanitized html and create a block for each
	paragraph that has been added.
	*/

	var _Array$from = __webpack_require__(255)['default'];

	var scribePastePlugin = function scribePastePlugin(block) {
	  return function (scribe) {
	    var insertHTMLCommandPatch = new scribe.api.CommandPatch('insertHTML');

	    insertHTMLCommandPatch.execute = function (value) {
	      var _this = this;

	      scribe.transactionManager.run(function () {
	        scribe.api.CommandPatch.prototype.execute.call(_this, value);

	        var fakeContent = document.createElement('div');
	        fakeContent.innerHTML = scribe.getContent();

	        if (fakeContent.childNodes.length > 1) {

	          var nodes = _Array$from(fakeContent.childNodes);
	          scribe.setContent(nodes.shift().innerHTML);
	          nodes.reverse().forEach(function (node) {
	            var data = {
	              format: 'html',
	              text: node.innerHTML
	            };
	            block.mediator.trigger("block:create", 'Text', data, block.el);
	          });
	          scribe.el.focus();
	        }
	      });
	    };

	    scribe.commandPatches.insertHTML = insertHTMLCommandPatch;
	  };
	};

	module.exports = scribePastePlugin;

/***/ },
/* 259 */
/***/ function(module, exports) {

	"use strict";

	var scribeHeadingPlugin = function scribeHeadingPlugin(block) {
	  return function (scribe) {

	    var headingCommand = new scribe.api.Command('heading');
	    headingCommand.queryEnabled = function () {
	      return block.inline_editable;
	    };
	    headingCommand.queryState = function () {
	      return block.type === 'heading';
	    };

	    var getBlockType = function getBlockType() {
	      return headingCommand.queryState() ? 'Text' : 'Heading';
	    };

	    headingCommand.execute = function headingCommandExecute(value) {
	      var data = {
	        format: 'html',
	        text: block.getScribeInnerContent()
	      };

	      block.mediator.trigger("block:replace", block.el, getBlockType(), data);
	    };

	    scribe.commands.heading = headingCommand;
	  };
	};

	module.exports = scribeHeadingPlugin;

/***/ },
/* 260 */
/***/ function(module, exports) {

	"use strict";

	var scribeQuotePlugin = function scribeQuotePlugin(block) {
	  return function (scribe) {

	    var quoteCommand = new scribe.api.Command('quote');
	    quoteCommand.queryEnabled = function () {
	      return block.inline_editable;
	    };
	    quoteCommand.queryState = function () {
	      return block.type === 'quote';
	    };

	    var getBlockType = function getBlockType() {
	      return quoteCommand.queryState() ? 'Text' : 'Quote';
	    };

	    quoteCommand.execute = function quoteCommandExecute(value) {
	      var data = {
	        format: 'html',
	        text: block.getScribeInnerContent()
	      };

	      block.mediator.trigger("block:replace", block.el, getBlockType(), data);
	    };

	    scribe.commands.quote = quoteCommand;
	  };
	};

	module.exports = scribeQuotePlugin;

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	  Block Quote
	*/

	var _ = __webpack_require__(34);

	var Block = __webpack_require__(244);
	var stToHTML = __webpack_require__(253);
	var ScribeHeadingPlugin = __webpack_require__(259);
	var ScribeQuotePlugin = __webpack_require__(260);

	var template = _.template(['<blockquote class="st-required st-text-block st-text-block--quote" contenteditable="true"></blockquote>', '<label class="st-input-label"> <%= i18n.t("blocks:quote:credit_field") %></label>', '<input maxlength="140" name="cite" placeholder="<%= i18n.t("blocks:quote:credit_field") %>"', ' class="st-input-string js-cite-input" type="text" />'].join("\n"));

	module.exports = Block.extend({

	  type: "quote",

	  title: function title() {
	    return i18n.t('blocks:quote:title');
	  },

	  icon_name: 'quote',

	  textable: true,
	  toolbarEnabled: false,

	  editorHTML: function editorHTML() {
	    return template(this);
	  },

	  configureScribe: function configureScribe(scribe) {
	    scribe.use(new ScribeHeadingPlugin(this));
	    scribe.use(new ScribeQuotePlugin(this));
	  },

	  loadData: function loadData(data) {
	    if (this.options.convertFromMarkdown && data.format !== "html") {
	      this.setTextBlockHTML(stToHTML(data.text, this.type));
	    } else {
	      this.setTextBlockHTML(data.text);
	    }

	    if (data.cite) {
	      this.$('.js-cite-input')[0].value = data.cite;
	    }
	  }
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Dom = __webpack_require__(69);
	var Block = __webpack_require__(244);

	module.exports = Block.extend({

	  type: "image",
	  title: function title() {
	    return i18n.t('blocks:image:title');
	  },

	  droppable: true,
	  uploadable: true,

	  icon_name: 'image',

	  loadData: function loadData(data) {
	    // Create our image tag
	    this.editor.innerHTML = '';
	    this.editor.appendChild(Dom.createElement('img', { src: data.file.url }));
	  },

	  onDrop: function onDrop(transferData) {
	    var file = transferData.files[0],
	        urlAPI = typeof URL !== "undefined" ? URL : typeof webkitURL !== "undefined" ? webkitURL : null;

	    // Handle one upload at a time
	    if (/image/.test(file.type)) {
	      this.loading();
	      // Show this image on here
	      Dom.hide(this.inputs);
	      this.editor.innerHTML = '';
	      this.editor.appendChild(Dom.createElement('img', { src: urlAPI.createObjectURL(file) }));
	      Dom.show(this.editor);

	      this.uploader(file, function (data) {
	        this.setData(data);
	        this.ready();
	      }, function (error) {
	        this.addMessage(i18n.t('blocks:image:upload_error'));
	        this.ready();
	      });
	    }
	  }
	});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	  Heading Block
	*/

	var Block = __webpack_require__(244);
	var stToHTML = __webpack_require__(253);

	var ScribeTextBlockPlugin = __webpack_require__(254);
	var ScribeHeadingPlugin = __webpack_require__(259);
	var ScribeQuotePlugin = __webpack_require__(260);

	module.exports = Block.extend({

	  type: 'heading',

	  title: function title() {
	    return i18n.t('blocks:heading:title');
	  },

	  editorHTML: '<h2 class="st-required st-text-block st-text-block--heading" contenteditable="true"></h2>',

	  configureScribe: function configureScribe(scribe) {
	    scribe.use(new ScribeTextBlockPlugin(this));
	    scribe.use(new ScribeHeadingPlugin(this));
	    scribe.use(new ScribeQuotePlugin(this));

	    scribe.on('content-changed', this.toggleEmptyClass.bind(this));
	  },

	  textable: true,
	  toolbarEnabled: false,

	  scribeOptions: {
	    allowBlockElements: false,
	    tags: {
	      p: false
	    }
	  },

	  icon_name: 'heading',

	  loadData: function loadData(data) {
	    if (this.options.convertFromMarkdown && data.format !== "html") {
	      this.setTextBlockHTML(stToHTML(data.text, this.type));
	    } else {
	      this.setTextBlockHTML(data.text);
	    }
	  },

	  onBlockRender: function onBlockRender() {
	    this.focus();
	    this.toggleEmptyClass();
	  },

	  toggleEmptyClass: function toggleEmptyClass() {
	    this.el.classList.toggle('st-block--empty', this._scribe.getTextContent().length === 0);
	  }
	});

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Block = __webpack_require__(244);
	var stToHTML = __webpack_require__(253);

	var ScribeListBlockPlugin = __webpack_require__(265);

	module.exports = Block.extend({
	  type: 'list',
	  title: function title() {
	    return i18n.t('blocks:list:title');
	  },
	  icon_name: 'list',
	  multi_editable: true,

	  scribeOptions: {
	    allowBlockElements: false,
	    tags: {
	      p: false
	    }
	  },

	  configureScribe: function configureScribe(scribe) {
	    scribe.use(new ScribeListBlockPlugin(this));
	  },

	  editorHTML: '<ul class="st-list-block__list"></ul>',
	  listItemEditorHTML: '<li class="st-list-block__item"><div class="st-list-block__editor st-block__editor"></div></li>',

	  initialize: function initialize() {
	    this.editorIds = [];
	  },

	  // Data functions (loading, converting, saving)
	  beforeLoadingData: function beforeLoadingData() {
	    this.setupListVariables();

	    this.loadData(this._getData());
	  },

	  onBlockRender: function onBlockRender() {
	    if (!this.ul) {
	      this.setupListVariables();
	    }
	    if (this.editorIds.length < 1) {
	      this.addListItem();
	    }
	  },

	  setupListVariables: function setupListVariables() {
	    this.ul = this.inner.querySelector('ul');
	  },

	  loadData: function loadData(data) {
	    var block = this;
	    if (this.options.convertFromMarkdown && data.format !== "html") {
	      data = this.parseFromMarkdown(data.text);
	    }

	    if (data.listItems.length) {
	      data.listItems.forEach(function (li) {
	        block.addListItem(li.content);
	      });
	    } else {
	      block.addListItem();
	    }
	  },

	  parseFromMarkdown: function parseFromMarkdown(markdown) {
	    var listItems = markdown.replace(/^ - (.+)$/mg, "$1").split("\n");
	    listItems = listItems.filter(function (item) {
	      return item.length;
	    }).map((function (item) {
	      return { content: stToHTML(item, this.type) };
	    }).bind(this));

	    return { listItems: listItems, format: 'html' };
	  },

	  _serializeData: function _serializeData() {
	    var data = { format: 'html', listItems: [] };

	    this.editorIds.forEach((function (editorId) {
	      var listItem = { content: this.getTextEditor(editorId).scribe.getContent() };
	      data.listItems.push(listItem);
	    }).bind(this));

	    return data;
	  },

	  // List Items manipulation functions (add, remove, etc)
	  addListItemAfterCurrent: function addListItemAfterCurrent(content) {
	    this.addListItem(content, this.getCurrentTextEditor());
	  },

	  addListItem: function addListItem(content, after) {
	    content = content || '';
	    if (content.trim() === "<br>") {
	      content = '';
	    }

	    var editor = this.newTextEditor(this.listItemEditorHTML, content);

	    if (after && this.ul.lastchild !== after.node) {
	      var before = after.node.nextSibling;
	      this.ul.insertBefore(editor.node, before);

	      var idx = this.editorIds.indexOf(after.id) + 1;
	      this.editorIds.splice(idx, 0, editor.id);
	    } else {
	      this.ul.appendChild(editor.node);
	      this.editorIds.push(editor.id);
	    }

	    !content && this.focusOn(editor); // jshint ignore:line
	  },

	  focusOnNeighbor: function focusOnNeighbor(item) {
	    var neighbor = this.previousListItem() || this.nextListItem();

	    if (neighbor) {
	      this.focusOn(neighbor);
	    }
	  },

	  focusOn: function focusOn(editor) {
	    var scribe = editor.scribe;
	    var selection = new scribe.api.Selection();
	    var lastChild = scribe.el.lastChild;
	    var range;
	    if (selection.range) {
	      range = selection.range.cloneRange();
	    }

	    editor.el.focus();

	    if (range) {
	      range.setStartAfter(lastChild, 1);
	      range.collapse(false);
	    }
	  },

	  focusAtEnd: function focusAtEnd() {
	    var lastEditorId = this.editorIds[this.editorIds.length - 1];
	    this.appendToTextEditor(lastEditorId);
	  },

	  removeCurrentListItem: function removeCurrentListItem() {
	    if (this.editorIds.length === 1) {
	      return;
	    }

	    var item = this.getCurrentTextEditor();
	    var idx = this.editorIds.indexOf(item.id);

	    this.focusOnNeighbor(item);
	    this.editorIds.splice(idx, 1);
	    this.ul.removeChild(item.node);
	    this.removeTextEditor(item.id);
	  },

	  appendToCurrentItem: function appendToCurrentItem(content) {
	    this.appendToTextEditor(this.getCurrentTextEditor().id, content);
	  },

	  isLastListItem: function isLastListItem() {
	    return this.editorIds.length === 1;
	  },

	  nextListItem: function nextListItem() {
	    var idx = this.editorIds.indexOf(this.getCurrentTextEditor().id);
	    var editorId = this.editorIds[idx + 1];

	    if (editorId !== undefined) {
	      return this.getTextEditor(editorId);
	    } else {
	      return null;
	    }
	  },

	  previousListItem: function previousListItem() {
	    var idx = this.editorIds.indexOf(this.getCurrentTextEditor().id);
	    var editorId = this.editorIds[idx - 1];

	    if (editorId !== undefined) {
	      return this.getTextEditor(editorId);
	    } else {
	      return null;
	    }
	  }

	});

/***/ },
/* 265 */
/***/ function(module, exports) {

	"use strict";

	var ScribeListBlockPlugin = function ScribeListBlockPlugin(block) {
	  return function (scribe) {
	    scribe.el.addEventListener('keydown', function (ev) {
	      var rangeToHTML = function rangeToHTML(range) {
	        var div = document.createElement('div');
	        div.appendChild(range.extractContents());

	        return div.innerHTML;
	      };

	      var selectToEnd = function selectToEnd() {
	        var selection = new scribe.api.Selection();
	        var range = selection.range.cloneRange();
	        range.setEndAfter(scribe.el.lastChild, 0);

	        return range;
	      };

	      var currentPosition = function currentPosition() {
	        var selection = new scribe.api.Selection();
	        return selection.range.startOffset;
	      };

	      var content;

	      if (ev.keyCode === 13 && !ev.shiftKey) {
	        // enter pressed
	        ev.preventDefault();

	        if (scribe.getTextContent().length === 0) {
	          block.removeCurrentListItem();
	          block.mediator.trigger("block:create", 'Text', null, block.el);
	        } else {
	          content = rangeToHTML(selectToEnd());
	          block.addListItemAfterCurrent(content);
	        }
	      } else if (ev.keyCode === 8 && currentPosition() === 0) {
	        ev.preventDefault();

	        if (block.isLastListItem()) {
	          block.mediator.trigger('block:remove', block.blockID);
	        } else {
	          content = scribe.getContent();
	          block.removeCurrentListItem();
	          block.appendToCurrentItem(content);
	        }
	      } else if (ev.keyCode === 46) {
	        // TODO: Pressing del from end of list item
	      }
	    });
	  };
	};

	module.exports = ScribeListBlockPlugin;

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);
	var Dom = __webpack_require__(69);

	var Block = __webpack_require__(244);

	var tweet_template = _.template(["<blockquote class='twitter-tweet' align='center'>", "<p><%= text %></p>", "&mdash; <%= user.name %> (@<%= user.screen_name %>)", "<a href='<%= status_url %>' data-datetime='<%= created_at %>'><%= created_at %></a>", "</blockquote>"].join("\n"));

	module.exports = Block.extend({

	  type: "tweet",
	  icon_name: "tweet",
	  droppable: true,
	  pastable: true,
	  fetchable: true,

	  drop_options: {
	    re_render_on_reorder: true
	  },

	  title: function title() {
	    return i18n.t('blocks:tweet:title');
	  },

	  fetchUrl: function fetchUrl(tweetID) {
	    return "/tweets/?tweet_id=" + tweetID;
	  },

	  loadData: function loadData(data) {
	    if (_.isUndefined(data.status_url)) {
	      data.status_url = '';
	    }
	    var iframe = this.inner.querySelector('iframe');
	    Dom.remove(iframe);

	    this.inner.insertAdjacentHTML("afterbegin", tweet_template(data));

	    var script = Dom.createElement('script', { src: '//platform.twitter.com/widgets.js' });
	    this.inner.appendChild(script);
	  },

	  onContentPasted: function onContentPasted(event) {
	    // Content pasted. Delegate to the drop parse method
	    var input = event.target,
	        val = input.value;

	    // Pass this to the same handler as onDrop
	    this.handleTwitterDropPaste(val);
	  },

	  handleTwitterDropPaste: function handleTwitterDropPaste(url) {
	    if (!this.validTweetUrl(url)) {
	      utils.log("Invalid Tweet URL");
	      return;
	    }

	    // Twitter status
	    var tweetID = url.match(/[^\/]+$/);
	    if (!_.isEmpty(tweetID)) {
	      this.loading();
	      tweetID = tweetID[0];

	      this.fetch(this.fetchUrl(tweetID), { dataType: 'json' }, this.onTweetSuccess, this.onTweetFail);
	    }
	  },

	  validTweetUrl: function validTweetUrl(url) {
	    return utils.isURI(url) && url.indexOf("twitter") !== -1 && url.indexOf("status") !== -1;
	  },

	  onTweetSuccess: function onTweetSuccess(data) {
	    // Parse the twitter object into something a bit slimmer..
	    var obj = {
	      user: {
	        profile_image_url: data.user.profile_image_url,
	        profile_image_url_https: data.user.profile_image_url_https,
	        screen_name: data.user.screen_name,
	        name: data.user.name
	      },
	      id: data.id_str,
	      text: data.text,
	      created_at: data.created_at,
	      entities: data.entities,
	      status_url: "https://twitter.com/" + data.user.screen_name + "/status/" + data.id_str
	    };

	    this.setAndLoadData(obj);
	    this.ready();
	  },

	  onTweetFail: function onTweetFail() {
	    this.addMessage(i18n.t("blocks:tweet:fetch_error"));
	    this.ready();
	  },

	  onDrop: function onDrop(transferData) {
	    var url = transferData.getData('text/plain');
	    this.handleTwitterDropPaste(url);
	  }
	});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);
	var Block = __webpack_require__(244);

	module.exports = Block.extend({

	  // more providers at https://gist.github.com/jeffling/a9629ae28e076785a14f
	  providers: {
	    vimeo: {
	      regex: /(?:http[s]?:\/\/)?(?:www.)?vimeo\.co(?:.+(?:\/)([^\/].*)+$)/,
	      html: "<iframe src=\"<%= protocol %>//player.vimeo.com/video/<%= remote_id %>?title=0&byline=0\" width=\"580\" height=\"320\" frameborder=\"0\"></iframe>"
	    },
	    youtube: {
	      regex: /^.*(?:(?:youtu\.be\/)|(?:youtube\.com)\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)/,
	      html: "<iframe src=\"<%= protocol %>//www.youtube.com/embed/<%= remote_id %>\" width=\"580\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>"
	    }
	  },

	  type: 'video',
	  title: function title() {
	    return i18n.t('blocks:video:title');
	  },

	  droppable: true,
	  pastable: true,

	  icon_name: 'video',

	  loadData: function loadData(data) {
	    if (!this.providers.hasOwnProperty(data.source)) {
	      return;
	    }

	    var source = this.providers[data.source];

	    var protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;

	    var aspectRatioClass = source.square ? 'with-square-media' : 'with-sixteen-by-nine-media';

	    this.editor.classList.add('st-block__editor--' + aspectRatioClass);
	    this.editor.innerHTML = _.template(source.html, {
	      protocol: protocol,
	      remote_id: data.remote_id,
	      width: this.editor.style.width // for videos like vine
	    });
	  },

	  onContentPasted: function onContentPasted(event) {
	    this.handleDropPaste(event.target.value);
	  },

	  matchVideoProvider: function matchVideoProvider(provider, index, url) {
	    var match = provider.regex.exec(url);
	    if (match == null || _.isUndefined(match[1])) {
	      return {};
	    }

	    return {
	      source: index,
	      remote_id: match[1]
	    };
	  },

	  handleDropPaste: function handleDropPaste(url) {
	    if (!utils.isURI(url)) {
	      return;
	    }

	    for (var key in this.providers) {
	      if (!this.providers.hasOwnProperty(key)) {
	        continue;
	      }
	      this.setAndLoadData(this.matchVideoProvider(this.providers[key], key, url));
	    }
	  },

	  onDrop: function onDrop(transferData) {
	    var url = transferData.getData('text/plain');
	    this.handleDropPaste(url);
	  }
	});

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$keys = __webpack_require__(30)["default"];

	module.exports = {
	  mediatedEvents: {},
	  eventNamespace: null,
	  _bindMediatedEvents: function _bindMediatedEvents() {
	    _Object$keys(this.mediatedEvents).forEach(function (eventName) {
	      var cb = this.mediatedEvents[eventName];
	      eventName = this.eventNamespace ? this.eventNamespace + ':' + eventName : eventName;
	      this.mediator.on(eventName, this[cb].bind(this));
	    }, this);
	  }
	};

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Format Bar
	 * --
	 * Displayed on focus on a text area.
	 * Renders with all available options for the editor instance
	 */

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);

	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);
	var Dom = __webpack_require__(69);
	var Events = __webpack_require__(131);

	var FORMAT_BUTTON_TEMPLATE = __webpack_require__(270);

	var FormatBar = function FormatBar(options, mediator, editor) {
	  this.editor = editor;
	  this.options = _Object$assign({}, config.defaults.formatBar, options || {});
	  this.commands = this.options.commands;
	  this.mediator = mediator;
	  this.isShown = false;

	  this._ensureElement();
	  this._bindFunctions();
	  this._bindMediatedEvents();

	  this.initialize.apply(this, arguments);
	};

	_Object$assign(FormatBar.prototype, __webpack_require__(235), __webpack_require__(268), __webpack_require__(73), __webpack_require__(236), {

	  className: 'st-format-bar',

	  bound: ["onFormatButtonClick", "renderBySelection", "hide"],

	  eventNamespace: 'formatter',

	  mediatedEvents: {
	    'position': 'renderBySelection',
	    'show': 'show',
	    'hide': 'hide'
	  },

	  initialize: function initialize() {

	    var buttons = this.commands.reduce(function (memo, format) {
	      return memo += FORMAT_BUTTON_TEMPLATE(format);
	    }, "");

	    this.el.insertAdjacentHTML("beforeend", buttons);

	    Events.delegate(this.el, '.st-format-btn', 'click', this.onFormatButtonClick);
	  },

	  hide: function hide() {
	    this.isShown = false;

	    this.el.classList.remove('st-format-bar--is-ready');
	    Dom.remove(this.el);
	  },

	  show: function show() {
	    if (this.isShown) {
	      return;
	    }

	    this.isShown = true;

	    this.editor.outer.appendChild(this.el);
	    this.el.classList.add('st-format-bar--is-ready');
	  },

	  remove: function remove() {
	    Dom.remove(this.el);
	  },

	  renderBySelection: function renderBySelection() {
	    this.highlightSelectedButtons();
	    this.show();
	    this.calculatePosition();
	  },

	  calculatePosition: function calculatePosition() {
	    var selection = window.getSelection(),
	        range = selection.getRangeAt(0),
	        boundary = range.getBoundingClientRect(),
	        coords = {},
	        outer = this.editor.outer,
	        outerBoundary = outer.getBoundingClientRect();

	    coords.top = boundary.top - outerBoundary.top + 'px';
	    coords.left = (boundary.left + boundary.right) / 2 - this.el.offsetWidth / 2 - outerBoundary.left + 'px';

	    this.el.style.top = coords.top;
	    this.el.style.left = coords.left;
	  },

	  highlightSelectedButtons: function highlightSelectedButtons() {
	    var block = utils.getBlockBySelection();
	    [].forEach.call(this.el.querySelectorAll(".st-format-btn"), function (btn) {
	      var cmd = btn.getAttribute('data-cmd');
	      btn.classList.toggle("st-format-btn--is-active", block.queryTextBlockCommandState(cmd));
	      btn = null;
	    });
	  },

	  onFormatButtonClick: function onFormatButtonClick(ev) {
	    ev.preventDefault();
	    ev.stopPropagation();

	    var block = utils.getBlockBySelection();
	    if (_.isUndefined(block)) {
	      throw "Associated block not found";
	    }

	    var btn = ev.currentTarget,
	        cmd = btn.getAttribute('data-cmd');

	    if (_.isUndefined(cmd)) {
	      return false;
	    }

	    block.execTextBlockCommand(cmd);

	    this.highlightSelectedButtons();

	    return false;
	  }

	});

	module.exports = FormatBar;

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(68);

	module.exports = function (_ref) {
	  var name = _ref.name;
	  var text = _ref.text;
	  var cmd = _ref.cmd;
	  var iconName = _ref.iconName;

	  return "\n    <button class=\"st-format-btn st-format-btn--" + name + "\" data-cmd=\"" + cmd + "\">\n      <svg role=\"img\" class=\"st-icon\">\n        <use xlink:href=\"" + config.defaults.iconUrl + "#" + iconName + "\"/>\n      </svg>\n    </button>\n  ";
	};

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * Sir Trevor Editor
	 * --
	 * Represents one Sir Trevor editor instance (with multiple blocks)
	 * Each block references this instance.
	 * BlockTypes are global however.
	 */

	var _Object$assign = __webpack_require__(2)['default'];

	var _Object$keys = __webpack_require__(30)['default'];

	var _ = __webpack_require__(34);
	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);
	var Dom = __webpack_require__(69);

	var Events = __webpack_require__(73);
	var EventBus = __webpack_require__(75);
	var FormEvents = __webpack_require__(272);
	var BlockControls = __webpack_require__(273);
	var BlockAddition = __webpack_require__(275);
	var BlockAdditionTop = __webpack_require__(277);
	var BlockManager = __webpack_require__(241);
	var FormatBar = __webpack_require__(269);
	var EditorStore = __webpack_require__(76);
	var ErrorHandler = __webpack_require__(278);

	var Editor = function Editor(options) {
	  this.initialize(options);
	};

	_Object$assign(Editor.prototype, __webpack_require__(235), __webpack_require__(73), {

	  bound: ['onFormSubmit', 'hideAllTheThings', 'changeBlockPosition', 'removeBlockDragOver', 'blockLimitReached'],

	  events: {
	    'block:reorder:dragend': 'removeBlockDragOver',
	    'block:reorder:dropped': 'removeBlockDragOver',
	    'block:content:dropped': 'removeBlockDragOver'
	  },

	  initialize: function initialize(options) {
	    utils.log("Init SirTrevor.Editor");

	    this.options = _Object$assign({}, config.defaults, options || {});
	    this.ID = _.uniqueId('st-editor-');

	    if (!this._ensureAndSetElements()) {
	      return false;
	    }

	    if (!_.isUndefined(this.options.onEditorRender) && _.isFunction(this.options.onEditorRender)) {
	      this.onEditorRender = this.options.onEditorRender;
	    }

	    // Mediated events for *this* Editor instance
	    this.mediator = _Object$assign({}, Events);

	    this._bindFunctions();

	    config.instances.push(this);

	    this.build();

	    FormEvents.bindFormSubmit(this.form);
	  },

	  /*
	   * Build the Editor instance.
	   * Check to see if we've been passed JSON already, and if not try and
	   * create a default block.
	   * If we have JSON then we need to build all of our blocks from this.
	   */
	  build: function build() {
	    Dom.hide(this.el);

	    this.errorHandler = new ErrorHandler(this.outer, this.mediator, this.options.errorsContainer);
	    this.store = new EditorStore(this.el.value, this.mediator);

	    this.blockManager = new BlockManager(this);
	    this.blockAddition = BlockAddition.create(this);
	    this.BlockAdditionTop = BlockAdditionTop.create(this);
	    this.blockControls = BlockControls.create(this);

	    this.formatBar = new FormatBar(this.options.formatBar, this.mediator, this);

	    this.mediator.on('block:changePosition', this.changeBlockPosition);
	    this.mediator.on('block:limitReached', this.blockLimitReached);

	    this.dataStore = "Please use store.retrieve();";

	    this._setEvents();

	    // External event listeners
	    window.addEventListener('click', this.hideAllTheThings);
	    document.body.addEventListener('keydown', this.disableBackButton);

	    this.createBlocks();
	    this.wrapper.classList.add('st-ready');

	    if (!_.isUndefined(this.onEditorRender)) {
	      this.onEditorRender();
	    }
	  },

	  createBlocks: function createBlocks() {
	    var store = this.store.retrieve();

	    if (store.data.length > 0) {
	      store.data.forEach(function (block) {
	        this.mediator.trigger('block:create', block.type, block.data);
	      }, this);
	    } else if (this.options.defaultType !== false) {
	      this.mediator.trigger('block:create', this.options.defaultType, {});
	    }
	  },

	  destroy: function destroy() {
	    // Destroy the rendered sub views
	    this.formatBar.destroy();
	    this.blockAddition.destroy();
	    this.blockControls.destroy();

	    // Destroy all blocks
	    this.blockManager.blocks.forEach(function (block) {
	      this.mediator.trigger('block:remove', block.blockID);
	    }, this);

	    // Stop listening to events
	    this.mediator.stopListening();
	    this.stopListening();

	    // Remove instance
	    config.instances = config.instances.filter(function (instance) {
	      return instance.ID !== this.ID;
	    }, this);

	    // Remove external event listeners
	    window.removeEventListener('click', this.hideAllTheThings);
	    document.body.removeEventListener('keydown', this.disableBackButton);

	    // Clear the store
	    this.store.reset();
	    Dom.replaceWith(this.outer, this.el);
	  },

	  reinitialize: function reinitialize(options) {
	    this.destroy();
	    this.initialize(options || this.options);
	  },

	  blockLimitReached: function blockLimitReached(toggle) {
	    this.wrapper.classList.toggle('st--block-limit-reached', toggle);
	  },

	  _setEvents: function _setEvents() {
	    _Object$keys(this.events).forEach(function (type) {
	      EventBus.on(type, this[this.events[type]], this);
	    }, this);
	  },

	  hideAllTheThings: function hideAllTheThings(e) {
	    this.blockControls.hide();
	    this.blockAddition.hide();
	    this.formatBar.hide();
	  },

	  store: function store(method, options) {
	    utils.log("The store method has been removed, please call store[methodName]");
	    return this.store[method].call(this, options || {});
	  },

	  removeBlockDragOver: function removeBlockDragOver() {
	    var dragOver = this.outer.querySelector('.st-drag-over');
	    if (!dragOver) {
	      return;
	    }
	    dragOver.classList.remove('st-drag-over');
	  },

	  changeBlockPosition: function changeBlockPosition(block, selectedPosition) {
	    selectedPosition = selectedPosition - 1;

	    var blockPosition = this.blockManager.getBlockPosition(block),
	        blockBy = this.wrapper.querySelectorAll('.st-block')[selectedPosition];

	    if (blockBy && blockBy.getAttribute('id') !== block.getAttribute('id')) {
	      this.hideAllTheThings();
	      if (blockPosition > selectedPosition) {
	        blockBy.parentNode.insertBefore(block, blockBy);
	      } else {
	        Dom.insertAfter(block, blockBy);
	      }
	    }
	  },

	  validateAndSaveBlock: function validateAndSaveBlock(block, shouldValidate) {
	    if ((!config.skipValidation || shouldValidate) && !block.valid()) {
	      this.mediator.trigger('errors:add', { text: _.result(block, 'validationFailMsg') });
	      utils.log("Block " + block.blockID + " failed validation");
	      return;
	    }

	    if (block.type === 'text' && block.isEmpty()) {
	      return;
	    }

	    var blockData = block.getData();
	    utils.log("Adding data for block " + block.blockID + " to block store:", blockData);
	    this.store.addData(blockData);
	  },

	  /*
	   * Handle a form submission of this Editor instance.
	   * Validate all of our blocks, and serialise all data onto the JSON objects
	   */
	  onFormSubmit: function onFormSubmit(shouldValidate) {
	    // if undefined or null or anything other than false - treat as true
	    shouldValidate = shouldValidate === false ? false : true;

	    utils.log("Handling form submission for Editor " + this.ID);

	    this.mediator.trigger('errors:reset');
	    this.store.reset();

	    this.validateBlocks(shouldValidate);
	    this.blockManager.validateBlockTypesExist(shouldValidate);

	    this.mediator.trigger('errors:render');
	    this.el.value = this.store.toString();

	    return this.errorHandler.errors.length;
	  },

	  /*
	   * Disable back button so when a block loses focus the user
	   * pressing backspace multiple times doesn't close the page.
	   */
	  disableBackButton: function disableBackButton(e) {
	    if (e.keyCode === 8) {
	      if (e.srcElement.getAttribute('contenteditable') || e.srcElement.tagName === 'INPUT' || e.srcElement.tagName === 'TEXTAREA') {
	        return;
	      }

	      e.preventDefault();
	    }
	  },

	  validateBlocks: function validateBlocks(shouldValidate) {
	    var self = this;
	    Array.prototype.forEach.call(this.wrapper.querySelectorAll('.st-block'), function (block, idx) {
	      var _block = self.blockManager.findBlockById(block.getAttribute('id'));
	      if (!_.isUndefined(_block)) {
	        self.validateAndSaveBlock(_block, shouldValidate);
	      }
	    });
	  },

	  findBlockById: function findBlockById(block_id) {
	    return this.blockManager.findBlockById(block_id);
	  },

	  getBlocksByType: function getBlocksByType(block_type) {
	    return this.blockManager.getBlocksByType(block_type);
	  },

	  getBlocksByIDs: function getBlocksByIDs(block_ids) {
	    return this.blockManager.getBlocksByIDs(block_ids);
	  },

	  getBlockPosition: function getBlockPosition(block) {
	    utils.log("This method has been moved to blockManager.getBlockPosition()");
	    return this.blockManager.getBlockPosition(block);
	  },

	  _ensureAndSetElements: function _ensureAndSetElements() {
	    if (_.isUndefined(this.options.el)) {
	      utils.log("You must provide an el");
	      return false;
	    }

	    this.el = this.options.el;
	    this.form = Dom.getClosest(this.el, 'form');

	    var outer = Dom.createElement("div", {
	      'id': this.ID,
	      'class': 'st-outer notranslate',
	      'dropzone': 'copy link move' });

	    var wrapper = Dom.createElement("div", { 'class': 'st-blocks' });

	    // Wrap our element in lots of containers *eww*

	    Dom.wrap(Dom.wrap(this.el, outer), wrapper);

	    this.outer = this.form.querySelector('#' + this.ID);
	    this.wrapper = this.outer.querySelector('.st-blocks');

	    return true;
	  }

	});

	module.exports = Editor;

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(68);
	var utils = __webpack_require__(29);

	var EventBus = __webpack_require__(75);
	var Submittable = __webpack_require__(77);

	var formBound = false; // Flag to tell us once we've bound our submit event

	var FormEvents = {
	  bindFormSubmit: function bindFormSubmit(form) {
	    if (!formBound) {
	      // XXX: should we have a formBound and submittable per-editor?
	      // telling JSHint to ignore as it'll complain we shouldn't be creating
	      // a new object, but otherwise `this` won't be set in the Submittable
	      // initialiser. Bit weird.
	      new Submittable(form); // jshint ignore:line
	      form.addEventListener('submit', this.onFormSubmit);
	      formBound = true;
	    }
	  },

	  onBeforeSubmit: function onBeforeSubmit(shouldValidate) {
	    // Loop through all of our instances and do our form submits on them
	    var errors = 0;
	    config.instances.forEach(function (inst, i) {
	      errors += inst.onFormSubmit(shouldValidate);
	    });
	    utils.log("Total errors: " + errors);

	    return errors;
	  },

	  onFormSubmit: function onFormSubmit(ev) {
	    var errors = FormEvents.onBeforeSubmit();

	    if (errors > 0) {
	      EventBus.trigger("onError");
	      ev.preventDefault();
	    }
	  }
	};

	module.exports = FormEvents;

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * SirTrevor Block Controls
	 * --
	 * Gives an interface for adding new Sir Trevor blocks.
	 */

	var Blocks = __webpack_require__(242);
	var Events = __webpack_require__(131);

	var BLOCK_REPLACER_CONTROL_TEMPLATE = __webpack_require__(274);

	function generateBlocksHTML(Blocks, availableTypes) {
	  return availableTypes.reduce(function (memo, type) {
	    if (Blocks.hasOwnProperty(type) && Blocks[type].prototype.toolbarEnabled) {
	      return memo += BLOCK_REPLACER_CONTROL_TEMPLATE(Blocks[type].prototype);
	    }
	    return memo;
	  }, "");
	}

	function render(Blocks, availableTypes) {
	  var el = document.createElement('div');
	  el.className = "st-block-controls__buttons";
	  el.innerHTML = generateBlocksHTML.apply(null, arguments);

	  var elButtons = document.createElement('div');
	  elButtons.className = "st-block-controls";
	  elButtons.appendChild(el);
	  return elButtons;
	}

	module.exports.create = function (SirTrevor) {

	  // REFACTOR - should probably not know about blockManager
	  var el = render(Blocks, SirTrevor.blockManager.blockTypes);

	  function replaceBlock(e) {
	    // REFACTOR: mediator so that we can trigger events directly on instance?
	    // REFACTOR: block create event expects data as second argument.
	    /*jshint validthis:true */
	    SirTrevor.mediator.trigger("block:replace", el.parentNode, this.dataset.type);
	  }

	  function insert(e) {
	    e.stopPropagation(); // we don't want el to be removed by the window click
	    /*jshint validthis:true */
	    var parent = this.parentNode;
	    if (!parent || hide() === parent) {
	      return;
	    }
	    parent.appendChild(el);
	    parent.classList.toggle("st-block--controls-active");
	  }

	  // Public
	  function hide() {
	    var parent = el.parentNode;
	    if (!parent) {
	      return;
	    }
	    parent.removeChild(el);
	    parent.classList.remove("st-block--controls-active");
	    return parent;
	  }

	  // Public
	  function destroy() {
	    SirTrevor = null;
	    el = null;
	  }

	  Events.delegate(SirTrevor.wrapper, ".st-block-replacer", "click", insert);

	  Events.delegate(SirTrevor.wrapper, ".st-block-controls__button", "click", replaceBlock);

	  return { el: el, hide: hide, destroy: destroy };
	};

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(68);

	module.exports = function (_ref) {
	  var title = _ref.title;
	  var type = _ref.type;
	  var icon_name = _ref.icon_name;

	  return "\n    <button class=\"st-block-controls__button\" data-type=\"" + type + "\" type=\"button\">\n      <svg role=\"img\" class=\"st-icon\">\n        <use xlink:href=\"" + config.defaults.iconUrl + "#" + icon_name + "\"/>\n      </svg>\n      " + title() + "\n    </button>\n  ";
	};

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * SirTrevor Block Controls
	 * --
	 * Gives an interface for adding new Sir Trevor blocks.
	 */

	var dropEvents = __webpack_require__(133);

	var EventBus = __webpack_require__(75);

	var Dom = __webpack_require__(69);
	var Events = __webpack_require__(131);

	var TOP_CONTROLS_TEMPLATE = __webpack_require__(276);

	module.exports.create = function (SirTrevor) {

	  function createBlock(e) {
	    // REFACTOR: mediator so that we can trigger events directly on instance?
	    // REFACTOR: block create event expects data as second argument.
	    /*jshint validthis:true */
	    SirTrevor.mediator.trigger("block:create", 'Text', null, this.parentNode.parentNode.id ? this.parentNode.parentNode : this.parentNode);
	  }

	  function hide() {}

	  // Public
	  function destroy() {
	    SirTrevor = null;
	  }

	  SirTrevor.wrapper.insertAdjacentHTML("beforeend", TOP_CONTROLS_TEMPLATE());

	  var topControls = SirTrevor.wrapper.querySelector('.st-top-controls');

	  function onDrop(ev) {
	    ev.preventDefault();

	    var dropped_on = topControls,
	        item_id = ev.dataTransfer.getData("text/plain"),
	        block = document.querySelector('#' + item_id);

	    if ((!!item_id, !!block, dropped_on.id !== item_id)) {
	      Dom.insertAfter(block, dropped_on);
	    }
	    SirTrevor.mediator.trigger("block:rerender", item_id);
	    EventBus.trigger("block:reorder:dropped", item_id);
	  }

	  dropEvents.dropArea(topControls);
	  topControls.addEventListener('drop', onDrop);

	  Events.delegate(SirTrevor.wrapper, ".st-block-addition", "click", createBlock);

	  return { destroy: destroy, hide: hide };
	};

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var BLOCK_ADDITION_TEMPLATE = __webpack_require__(248);

	module.exports = function () {
	  return "\n    <div id=\"st_top\" class=\"st-top-controls\">\n      " + BLOCK_ADDITION_TEMPLATE() + "\n    </div>\n  ";
	};

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * SirTrevor Block Controls
	 * --
	 * Gives an interface for adding new Sir Trevor blocks.
	 */

	var Events = __webpack_require__(131);

	module.exports.create = function (SirTrevor) {

	  function createBlock(e) {
	    // REFACTOR: mediator so that we can trigger events directly on instance?
	    // REFACTOR: block create event expects data as second argument.
	    /*jshint validthis:true */
	    SirTrevor.mediator.trigger("block:create", 'Text', null, this.parentNode.parentNode.previousSibling);
	  }

	  function hide() {}

	  // Public
	  function destroy() {
	    SirTrevor = null;
	  }

	  Events.delegate(SirTrevor.wrapper, ".st-block-addition-top__button", "click", createBlock);

	  Events.delegate(SirTrevor.wrapper, ".st-block-addition-top__icon", "click", createBlock);

	  return { destroy: destroy, hide: hide };
	};

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)['default'];

	var _ = __webpack_require__(34);
	var Dom = __webpack_require__(69);

	var ErrorHandler = function ErrorHandler(wrapper, mediator, container) {
	  this.wrapper = wrapper;
	  this.mediator = mediator;
	  this.el = container;

	  if (_.isUndefined(this.el)) {
	    this._ensureElement();
	    this.wrapper.insertBefore(this.el, this.wrapper.firstChild);
	  }

	  Dom.hide(this.el);

	  this._bindFunctions();
	  this._bindMediatedEvents();

	  this.initialize();
	};

	_Object$assign(ErrorHandler.prototype, __webpack_require__(235), __webpack_require__(268), __webpack_require__(236), {

	  errors: [],
	  className: "st-errors",
	  eventNamespace: 'errors',

	  mediatedEvents: {
	    'reset': 'reset',
	    'add': 'addMessage',
	    'render': 'render'
	  },

	  initialize: function initialize() {
	    var list = document.createElement("ul");
	    var p = document.createElement("p");
	    p.innerHTML = i18n.t("errors:title");

	    this.el.appendChild(p).appendChild(list);
	    this.list = list;
	  },

	  render: function render() {
	    if (this.errors.length === 0) {
	      return false;
	    }
	    this.errors.forEach(this.createErrorItem, this);
	    Dom.show(this.el);
	  },

	  createErrorItem: function createErrorItem(errorObj) {
	    var error = document.createElement("li");
	    error.classList.add("st-errors__msg");
	    error.innerHTML = errorObj.text;
	    this.list.appendChild(error);
	  },

	  addMessage: function addMessage(error) {
	    this.errors.push(error);
	  },

	  reset: function reset() {
	    if (this.errors.length === 0) {
	      return false;
	    }
	    this.errors = [];
	    this.list.innerHTML = '';
	    Dom.hide(this.el);
	  }

	});

	module.exports = ErrorHandler;

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);
	var utils = __webpack_require__(29);

	module.exports = function (content, type) {

	  // Deferring requiring these to sidestep a circular dependency:
	  // Block -> this -> Blocks -> Block
	  var Blocks = __webpack_require__(242);

	  type = utils.classify(type);

	  var markdown = content;

	  //Normalise whitespace
	  markdown = markdown.replace(/&nbsp;/g, " ");

	  // First of all, strip any additional formatting
	  // MSWord, I'm looking at you, punk.
	  markdown = markdown.replace(/( class=(")?Mso[a-zA-Z]+(")?)/g, '').replace(/<!--(.*?)-->/g, '').replace(/\/\*(.*?)\*\//g, '').replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, '');

	  var badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'],
	      tagStripper,
	      i;

	  for (i = 0; i < badTags.length; i++) {
	    tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
	    markdown = markdown.replace(tagStripper, '');
	  }

	  // Escape anything in here that *could* be considered as MD
	  // Markdown chars we care about: * [] _ () -
	  markdown = markdown.replace(/\*/g, "\\*").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\_/g, "\\_").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\-/g, "\\-");

	  var inlineTags = ["em", "i", "strong", "b"];

	  for (i = 0; i < inlineTags.length; i++) {
	    tagStripper = new RegExp('<' + inlineTags[i] + '><br></' + inlineTags[i] + '>', 'gi');
	    markdown = markdown.replace(tagStripper, '<br>');
	  }

	  function replaceBolds(match, p1, p2) {
	    if (_.isUndefined(p2)) {
	      p2 = '';
	    }
	    return "**" + p1.replace(/<(.)?br(.)?>/g, '') + "**" + p2;
	  }

	  function replaceItalics(match, p1, p2) {
	    if (_.isUndefined(p2)) {
	      p2 = '';
	    }
	    return "_" + p1.replace(/<(.)?br(.)?>/g, '') + "_" + p2;
	  }

	  markdown = markdown.replace(/<(\w+)(?:\s+\w+="[^"]+(?:"\$[^"]+"[^"]+)?")*>\s*<\/\1>/gim, '') //Empty elements
	  .replace(/\n/mg, "").replace(/<a.*?href=[""'](.*?)[""'].*?>(.*?)<\/a>/gim, function (match, p1, p2) {
	    return "[" + p2.trim().replace(/<(.)?br(.)?>/g, '') + "](" + p1 + ")";
	  }) // Hyperlinks
	  .replace(/<strong>(?:\s*)(.*?)(\s)*?<\/strong>/gim, replaceBolds).replace(/<b>(?:\s*)(.*?)(\s*)?<\/b>/gim, replaceBolds).replace(/<em>(?:\s*)(.*?)(\s*)?<\/em>/gim, replaceItalics).replace(/<i>(?:\s*)(.*?)(\s*)?<\/i>/gim, replaceItalics);

	  // Do our generic stripping out
	  markdown = markdown.replace(/([^<>]+)(<div>)/g, "$1\n$2") // Divitis style line breaks (handle the first line)
	  .replace(/<div><div>/g, '\n<div>') // ^ (double opening divs with one close from Chrome)
	  .replace(/(?:<div>)([^<>]+)(?:<div>)/g, "$1\n") // ^ (handle nested divs that start with content)
	  .replace(/(?:<div>)(?:<br>)?([^<>]+)(?:<br>)?(?:<\/div>)/g, "$1\n") // ^ (handle content inside divs)
	  .replace(/<\/p>/g, "\n\n") // P tags as line breaks
	  .replace(/<(.)?br(.)?>/g, "\n") // Convert normal line breaks
	  .replace(/&lt;/g, "<").replace(/&gt;/g, ">"); // Encoding

	  // Use custom block toMarkdown functions (if any exist)
	  var block;
	  if (Blocks.hasOwnProperty(type)) {
	    block = Blocks[type];
	    // Do we have a toMarkdown function?
	    if (!_.isUndefined(block.prototype.toMarkdown) && _.isFunction(block.prototype.toMarkdown)) {
	      markdown = block.prototype.toMarkdown(markdown);
	    }
	  }

	  // Strip remaining HTML
	  markdown = markdown.replace(/<\/?[^>]+(>|$)/g, "");

	  return markdown;
	};

/***/ },
/* 280 */
17
/******/ ])))
});
;