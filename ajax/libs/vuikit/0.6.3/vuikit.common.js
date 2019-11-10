/*!
 * Vuikit v0.6.3 (https://github.com/vuikit/vuikit)
 * (c) 2017 ZOOlanders
 * Released under the MIT License.
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(97);

	var _keys2 = _interopRequireDefault(_keys);

	var _Breadcrumb = __webpack_require__(55);

	var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

	var _BreadcrumbItem = __webpack_require__(56);

	var _BreadcrumbItem2 = _interopRequireDefault(_BreadcrumbItem);

	var _Button = __webpack_require__(57);

	var _Button2 = _interopRequireDefault(_Button);

	var _ButtonCheckbox = __webpack_require__(58);

	var _ButtonCheckbox2 = _interopRequireDefault(_ButtonCheckbox);

	var _ButtonRadio = __webpack_require__(59);

	var _ButtonRadio2 = _interopRequireDefault(_ButtonRadio);

	var _Calendar = __webpack_require__(62);

	var _Calendar2 = _interopRequireDefault(_Calendar);

	var _Datepicker = __webpack_require__(37);

	var _Datepicker2 = _interopRequireDefault(_Datepicker);

	var _DatepickerDrop = __webpack_require__(65);

	var _DatepickerDrop2 = _interopRequireDefault(_DatepickerDrop);

	var _Dropdown = __webpack_require__(66);

	var _Dropdown2 = _interopRequireDefault(_Dropdown);

	var _Modal = __webpack_require__(69);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Offcanvas = __webpack_require__(72);

	var _Offcanvas2 = _interopRequireDefault(_Offcanvas);

	var _Pagination = __webpack_require__(76);

	var _Pagination2 = _interopRequireDefault(_Pagination);

	var _Picker = __webpack_require__(38);

	var _Picker2 = _interopRequireDefault(_Picker);

	var _PickerDrop = __webpack_require__(78);

	var _PickerDrop2 = _interopRequireDefault(_PickerDrop);

	var _Subnav = __webpack_require__(79);

	var _Subnav2 = _interopRequireDefault(_Subnav);

	var _SubnavItem = __webpack_require__(80);

	var _SubnavItem2 = _interopRequireDefault(_SubnavItem);

	var _Switcher = __webpack_require__(81);

	var _Switcher2 = _interopRequireDefault(_Switcher);

	var _SwitcherItem = __webpack_require__(82);

	var _SwitcherItem2 = _interopRequireDefault(_SwitcherItem);

	var _Table = __webpack_require__(86);

	var _Table2 = _interopRequireDefault(_Table);

	var _Tabs = __webpack_require__(88);

	var _Tabs2 = _interopRequireDefault(_Tabs);

	var _TabsItem = __webpack_require__(89);

	var _TabsItem2 = _interopRequireDefault(_TabsItem);

	var _TabsVertical = __webpack_require__(90);

	var _TabsVertical2 = _interopRequireDefault(_TabsVertical);

	var _Upload = __webpack_require__(91);

	var _Upload2 = _interopRequireDefault(_Upload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Vuikit = {
	  Breadcrumb: _Breadcrumb2.default,
	  BreadcrumbItem: _BreadcrumbItem2.default,
	  Button: _Button2.default,
	  ButtonCheckbox: _ButtonCheckbox2.default,
	  ButtonRadio: _ButtonRadio2.default,
	  Calendar: _Calendar2.default,
	  Datepicker: _Datepicker2.default,
	  DatepickerDrop: _DatepickerDrop2.default,
	  Dropdown: _Dropdown2.default,
	  Modal: _Modal2.default,
	  Offcanvas: _Offcanvas2.default,
	  Pagination: _Pagination2.default,
	  Picker: _Picker2.default,
	  PickerDrop: _PickerDrop2.default,
	  Subnav: _Subnav2.default,
	  SubnavItem: _SubnavItem2.default,
	  Switcher: _Switcher2.default,
	  SwitcherItem: _SwitcherItem2.default,
	  Table: _Table2.default,
	  Tabs: _Tabs2.default,
	  TabsItem: _TabsItem2.default,
	  TabsVertical: _TabsVertical2.default,
	  Upload: _Upload2.default,
	  install: function install(Vue) {
	    var keys = (0, _keys2.default)(this);
	    keys.pop();
	    var i = keys.length;
	    while (i--) {
	      Vue.component('Vk' + keys[i], this[keys[i]]);
	    }
	  }
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Vuikit);
	}

	module.exports = Vuikit;

/***/ },
/* 1 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(29)('wks')
	  , uid        = __webpack_require__(19)
	  , Symbol     = __webpack_require__(3).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.warn = exports.isArray = undefined;

	var _getPrototypeOf = __webpack_require__(96);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _typeof2 = __webpack_require__(101);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.isString = isString;
	exports.inArray = inArray;
	exports.each = each;
	exports.merge = merge;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object';
	}

	function isPlainObject(obj) {
	  return isObject(obj) && (0, _getPrototypeOf2.default)(obj) === Object.prototype;
	}

	function isString(val) {
	  return typeof val === 'string';
	}

	var isArray = exports.isArray = Array.isArray;

	function inArray(array, value) {
	  return (array || []).indexOf(value) !== -1;
	}

	function each(obj, iterator) {
	  var i, key;
	  if (typeof obj.length === 'number') {
	    for (i = 0; i < obj.length; i++) {
	      iterator.call(obj[i], obj[i], i);
	    }
	  } else if (isObject(obj)) {
	    for (key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        iterator.call(obj[key], obj[key], key);
	      }
	    }
	  }
	  return obj;
	}

	function merge(target) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  args.forEach(function (source) {
	    _merge(target, source, true);
	  });
	  return target;
	}

	function _merge(target, source, deep) {
	  for (var key in source) {
	    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	        target[key] = {};
	      }
	      if (isArray(source[key]) && !isArray(target[key])) {
	        target[key] = [];
	      }
	      _merge(target[key], source[key], deep);
	    } else if (source[key] !== undefined) {
	      target[key] = source[key];
	    }
	  }
	}

	var warn = void 0;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    exports.warn = warn = function warn(msg, vm) {
	      if (hasConsole) {
	        console.error('[Vuikit warn]: ' + msg);
	      }
	    };
	  })();
	}

	exports.warn = warn;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(151)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(14)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(43)
	  , toPrimitive    = __webpack_require__(32)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(116)
	  , defined = __webpack_require__(23);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(7)
	  , createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(5) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

	module.exports = function mergeJSXProps (objs) {
	  return objs.reduce(function (a, b) {
	    var aa, bb, key, nestedKey, temp
	    for (key in b) {
	      aa = a[key]
	      bb = b[key]
	      if (aa && nestRE.test(key)) {
	        // normalize class
	        if (key === 'class') {
	          if (typeof aa === 'string') {
	            temp = aa
	            a[key] = aa = {}
	            aa[temp] = true
	          }
	          if (typeof bb === 'string') {
	            temp = bb
	            b[key] = bb = {}
	            bb[temp] = true
	          }
	        }
	        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
	          // merge functions
	          for (nestedKey in bb) {
	            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
	          }
	        } else if (Array.isArray(aa)) {
	          a[key] = aa.concat(bb)
	        } else if (Array.isArray(bb)) {
	          a[key] = [aa].concat(bb)
	        } else {
	          for (nestedKey in bb) {
	            aa[nestedKey] = bb[nestedKey]
	          }
	        }
	      } else {
	        a[key] = b[key]
	      }
	    }
	    return a
	  }, {})
	}

	function mergeFn (a, b) {
	  return function () {
	    a.apply(this, arguments)
	    b.apply(this, arguments)
	  }
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.on = on;
	exports.offAll = offAll;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.css = css;
	var boundEvents = [];

	function on(el, event, handler) {
	  var namespace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'def';

	  boundEvents[namespace] = boundEvents[namespace] || [];
	  boundEvents[namespace].push({ el: el, event: event, handler: handler });
	  el.addEventListener(event, handler);
	}

	function offAll(namespace) {
	  for (var i = 0; i < boundEvents[namespace].length; ++i) {
	    var _boundEvents$namespac = boundEvents[namespace][i],
	        el = _boundEvents$namespac.el,
	        event = _boundEvents$namespac.event,
	        handler = _boundEvents$namespac.handler;

	    el.removeEventListener(event, handler);
	  }
	}

	function addClass(el, className) {
	  if (el.classList) {
	    el.classList.add(className);
	  } else {
	    el.className += ' ' + className;
	  }
	}

	function removeClass(el, className) {
	  if (el.classList) {
	    el.classList.remove(className);
	  } else {
	    el.className = el.className.replace(new RegExp('^' + className + '$'), '');
	  }
	}

	function css(el, style) {
	  return window.getComputedStyle(el)[style];
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(3)
	  , core      = __webpack_require__(1)
	  , ctx       = __webpack_require__(113)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(49)
	  , enumBugKeys = __webpack_require__(24);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(95);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 26 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).f
	  , has = __webpack_require__(6)
	  , TAG = __webpack_require__(2)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(29)('keys')
	  , uid    = __webpack_require__(19);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(3)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(23);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(15);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(3)
	  , core           = __webpack_require__(1)
	  , LIBRARY        = __webpack_require__(25)
	  , wksExt         = __webpack_require__(34)
	  , defineProperty = __webpack_require__(7).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(2);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(126)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(44)(String, 'String', function(iterated){
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(132);
	var global        = __webpack_require__(3)
	  , hide          = __webpack_require__(9)
	  , Iterators     = __webpack_require__(16)
	  , TO_STRING_TAG = __webpack_require__(2)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isInteger = __webpack_require__(40);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _moment = __webpack_require__(20);

	var _moment2 = _interopRequireDefault(_moment);

	var _render = __webpack_require__(64);

	var _render2 = _interopRequireDefault(_render);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkDatepicker',
	  render: _render2.default,
	  props: {
	    year: {},
	    month: {},
	    dates: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    disabledDates: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },

	    min: {
	      type: [String, Number],
	      default: '1980-01-01'
	    },

	    max: {
	      type: [String, Number],
	      default: '2050-12-31'
	    }
	  },
	  computed: {
	    datesMoments: function datesMoments() {
	      return this.dates.map(function (d) {
	        return (0, _moment2.default)(d);
	      });
	    },
	    disabledDatesMoments: function disabledDatesMoments() {
	      return this.disabledDates.map(function (d) {
	        return (0, _moment2.default)(d);
	      });
	    },
	    minMoment: function minMoment() {
	      return (0, _isInteger2.default)(this.min) ? (0, _moment2.default)().add(-this.min - 1, 'days') : (0, _moment2.default)(this.min || this.$options.props.min.default);
	    },
	    maxMoment: function maxMoment() {
	      return (0, _isInteger2.default)(this.max) ? (0, _moment2.default)().add(this.max, 'days') : (0, _moment2.default)(this.max || this.$options.props.max.default);
	    }
	  },
	  methods: {
	    isPicked: function isPicked(date) {
	      return this.datesMoments.some(function (d) {
	        return d.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
	      });
	    },
	    isDisabled: function isDisabled(date) {
	      return !date.isBetween(this.minMoment, this.maxMoment) || this.disabledDatesMoments.some(function (d) {
	        return d.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
	      });
	    },
	    toggle: function toggle(date) {
	      this.isPicked(date) ? this.$emit('unpick', date) : this.$emit('pick', date);
	    }
	  }
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(4);

	exports.default = {
	  name: 'VkPicker',
	  render: function render(h) {
	    return h(
	      'vk-table',
	      {
	        attrs: {
	          'track-by': 'id',
	          fields: this.tableFields,
	          rows: this.rows }
	      },
	      []
	    );
	  },
	  props: {
	    fields: {
	      type: Array,
	      required: true
	    },
	    rows: {
	      type: Array,
	      required: true
	    }
	  },
	  computed: {
	    tableFields: function tableFields() {
	      return this.fields.map(function (field) {
	        if (field.pickable) {
	          field.render = pickableRender;
	        }
	        return field;
	      });
	    },
	    pickables: function pickables() {
	      var pickables = {};
	      (0, _util.each)(this.fields, function (field) {
	        if (field.pickable && (0, _util.isString)(field.pickable)) {
	          pickables[field.name] = field.pickable;
	        } else if (field.pickable) {
	          pickables[field.name] = field.name;
	        }
	      });
	      return pickables;
	    }
	  }
	};


	var pickableRender = function pickableRender(h, _ref) {
	  var props = _ref.props,
	      parent = _ref.parent;

	  var vm = parent.$parent;
	  return h(
	    'a',
	    {
	      on: {
	        'click': function click(e) {
	          var field = props.field.name;
	          var data = props.row[vm.pickables[field]];
	          e.preventDefault();
	          vm.$emit('pick', data, field);
	        }
	      }
	    },
	    [props.row[props.field.name]]
	  );
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  functional: true,
	  props: ['checked', 'onClick'],
	  render: function render(h, _ref) {
	    var parent = _ref.parent,
	        props = _ref.props;

	    return h('input', {
	      attrs: {
	        type: 'checkbox'
	      },
	      domProps: {
	        checked: props.checked
	      },
	      on: {
	        click: function click(e) {
	          e.target.checked = props.checked;
	          props.onClick();
	        }
	      }
	    });
	  }
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(22)
	  , TAG = __webpack_require__(2)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15)
	  , document = __webpack_require__(3).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(5) && !__webpack_require__(14)(function(){
	  return Object.defineProperty(__webpack_require__(42)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(25)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(51)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(6)
	  , Iterators      = __webpack_require__(16)
	  , $iterCreate    = __webpack_require__(119)
	  , setToStringTag = __webpack_require__(27)
	  , getPrototypeOf = __webpack_require__(48)
	  , ITERATOR       = __webpack_require__(2)('iterator')
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
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
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
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(123)
	  , enumBugKeys = __webpack_require__(24)
	  , IE_PROTO    = __webpack_require__(28)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(42)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(115).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(49)
	  , hiddenKeys = __webpack_require__(24).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(6)
	  , toObject    = __webpack_require__(31)
	  , IE_PROTO    = __webpack_require__(28)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(6)
	  , toIObject    = __webpack_require__(8)
	  , arrayIndexOf = __webpack_require__(112)(false)
	  , IE_PROTO     = __webpack_require__(28)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(13)
	  , core    = __webpack_require__(1)
	  , fails   = __webpack_require__(14);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var createRange = __webpack_require__(142);

	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	 * `start` is specified without an `end` or `step`. If `end` is not specified,
	 * it's set to `start` with `start` then set to `0`.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the range of numbers.
	 * @see _.inRange, _.rangeRight
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(-4);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	var range = createRange();

	module.exports = range;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.validDate = validDate;
	exports.isToday = isToday;
	exports.getCalendarMatrix = getCalendarMatrix;

	var _moment = __webpack_require__(20);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function validDate(date) {
	  return date && (0, _moment2.default)(date).isValid();
	}

	function isToday(date) {
	  return date.isSame((0, _moment2.default)(), 'day');
	}

	function getCalendarMatrix(date) {
	  var year = date.year();
	  var month = date.month();
	  var hour = date.hour();
	  var minute = date.minute();
	  var second = date.second();
	  var daysInMonth = date.daysInMonth();
	  var firstDay = (0, _moment2.default)([year, month, 1]);
	  var lastDay = (0, _moment2.default)([year, month, daysInMonth]);
	  var lastMonth = (0, _moment2.default)(firstDay).subtract(1, 'month').month();
	  var lastYear = (0, _moment2.default)(firstDay).subtract(1, 'month').year();
	  var daysInLastMonth = (0, _moment2.default)([lastYear, lastMonth]).daysInMonth();
	  var dayOfWeek = firstDay.day();
	  var firstDayOfWeek = _moment2.default.localeData().firstDayOfWeek();
	  var matrix = [];
	  var i = void 0;
	  var col = void 0;
	  var row = void 0;
	  matrix.firstDay = firstDay;
	  matrix.lastDay = lastDay;
	  for (i = 0; i < 6; i++) {
	    matrix[i] = [];
	  }

	  var startDay = daysInLastMonth - dayOfWeek + firstDayOfWeek + 1;
	  if (startDay > daysInLastMonth) {
	    startDay -= 7;
	  }
	  if (dayOfWeek === firstDayOfWeek) {
	    startDay = daysInLastMonth - 6;
	  }
	  var curDate = (0, _moment2.default)([lastYear, lastMonth, startDay, 12, minute, second]);
	  for (i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = curDate.clone().add(24, 'hour')) {
	    if (i > 0 && col % 7 === 0) {
	      col = 0;
	      row++;
	    }
	    matrix[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
	    curDate.hour(12);
	  }
	  return matrix;
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray2 = __webpack_require__(100);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	exports.init = init;

	var _tether = __webpack_require__(152);

	var _tether2 = _interopRequireDefault(_tether);

	var _util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MIRROR_ATTACH = {
	  left: 'right',
	  right: 'left',
	  top: 'bottom',
	  bottom: 'top',
	  middle: 'middle',
	  center: 'center'
	};

	var sortAttach = function sortAttach(str) {
	  var _str$split = str.split(' '),
	      _str$split2 = (0, _slicedToArray3.default)(_str$split, 2),
	      first = _str$split2[0],
	      second = _str$split2[1];

	  if (['left', 'right'].indexOf(first) >= 0) {
	    var _ref = [second, first];
	    first = _ref[0];
	    second = _ref[1];
	  }
	  return [first, second].join(' ');
	};

	function init(element, target, enabled, position, offset, targetOffset, constrainToParent, constrainToWindow, overrides) {
	  var dropAttach = position.split(' ');
	  dropAttach[0] = MIRROR_ATTACH[dropAttach[0]];
	  dropAttach = dropAttach.join(' ');

	  var constraints = [];
	  if (constrainToParent) {
	    constraints.push({
	      to: 'scrollParent',
	      pin: 'top, bottom',
	      attachment: 'together none'
	    });
	  } else {
	    constraints.push({
	      to: 'scrollParent'
	    });
	  }

	  if (constrainToWindow !== false) {
	    constraints.push({
	      to: 'window',
	      attachment: 'together'
	    });
	  } else {
	    constraints.push({
	      to: 'window'
	    });
	  }

	  return new _tether2.default((0, _util.merge)({}, {
	    element: element,
	    target: target,
	    attachment: sortAttach(dropAttach),
	    targetAttachment: sortAttach(position),
	    classPrefix: 'vk-tether',
	    offset: offset,
	    targetOffset: targetOffset,
	    enabled: enabled,
	    constraints: constraints,
	    addTargetClasses: false
	  }, overrides));
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'VkBreadcrumb',
	  props: {
	    location: {
	      type: String,
	      default: '/'
	    }
	  },
	  render: function render(h) {
	    var crumbs = this.$slots.default.filter(function (node) {
	      return node.componentOptions && node.componentOptions.tag === 'vk-breadcrumb-item';
	    });
	    return h(
	      'ul',
	      { 'class': 'uk-breadcrumb' },
	      [crumbs]
	    );
	  }
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'VkBreadcrumbItem',
	  props: {
	    path: {
	      type: String,
	      default: '/'
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    }
	  },
	  computed: {
	    active: function active() {
	      return this.path === this.$parent.location;
	    }
	  },
	  render: function render(h) {
	    var _this = this;

	    var name = this.$slots.default;
	    var content = void 0;
	    if (!this.disabled && !this.active) {
	      content = h(
	        'a',
	        {
	          on: {
	            'click': function click(event) {
	              event.preventDefault();
	              _this.$parent.$emit('change', _this.path);
	            }
	          }
	        },
	        [name]
	      );
	    } else {
	      content = h(
	        'span',
	        null,
	        [name]
	      );
	    }
	    return h(
	      'li',
	      { 'class': {
	          'uk-active': this.active
	        } },
	      [content]
	    );
	  }
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _babelHelperVueJsxMergeProps = __webpack_require__(10);

	var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

	var _defineProperty2 = __webpack_require__(21);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkButton',
	  props: {
	    value: {},
	    type: {
	      type: String,
	      default: 'button'
	    },
	    ariaType: {
	      type: String,
	      default: 'pressed'
	    },
	    active: {
	      type: Boolean,
	      default: false
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    },

	    color: {
	      type: String,
	      default: ''
	    },
	    size: {
	      type: String,
	      default: ''
	    },
	    width: {
	      type: String,
	      default: ''
	    }
	  },
	  render: function render(h) {
	    var _class;

	    var data = {
	      attrs: (0, _defineProperty3.default)({}, 'aria-' + this.ariaType, '' + this.active),
	      class: (_class = {
	        'uk-button': true,
	        'uk-active': this.active
	      }, (0, _defineProperty3.default)(_class, 'uk-width-' + this.width, this.width), (0, _defineProperty3.default)(_class, 'uk-button-primary', this.color === 'primary'), (0, _defineProperty3.default)(_class, 'uk-button-success', this.color === 'success'), (0, _defineProperty3.default)(_class, 'uk-button-danger', this.color === 'danger'), (0, _defineProperty3.default)(_class, 'uk-button-link', this.color === 'link'), (0, _defineProperty3.default)(_class, 'uk-button-mini', this.size === 'mini'), (0, _defineProperty3.default)(_class, 'uk-button-small', this.size === 'small'), (0, _defineProperty3.default)(_class, 'uk-button-large', this.size === 'large'), _class)
	    };
	    return h(
	      'button',
	      (0, _babelHelperVueJsxMergeProps2.default)([{
	        attrs: { type: this.type, disabled: this.disabled }
	      }, data]),
	      [this.$slots.default]
	    );
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(4);

	exports.default = {
	  name: 'VkButtonCheckbox',
	  props: {
	    value: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    group: {
	      type: Boolean,
	      default: true
	    }
	  },
	  render: function render(h) {
	    var _this = this;

	    (0, _util.each)(this.$slots.default, function (node) {
	      if (node.componentOptions) {
	        var button = node.componentOptions.propsData;
	        button.ariaType = 'checked';
	        button.active = (0, _util.inArray)(_this.value, button.value);
	      }
	    });
	    return h(
	      'div',
	      { 'class': {
	          'uk-button-group': this.group
	        } },
	      [this.$slots.default]
	    );
	  },
	  mounted: function mounted() {
	    var _this2 = this;

	    (0, _util.each)(this.$children, function (button) {
	      button.$el.addEventListener('click', function () {
	        return _this2.toggle(button);
	      });
	    });
	  },

	  methods: {
	    toggle: function toggle(selected) {
	      var value = this.$children.filter(function (button) {
	        return button === selected ? !button.active : button.active;
	      }).map(function (button) {
	        return button.value;
	      });
	      this.$emit('change', value);
	    }
	  }
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(4);

	exports.default = {
	  name: 'VkButtonRadio',
	  props: {
	    value: {},
	    group: {
	      type: Boolean,
	      default: true
	    }
	  },
	  render: function render(h) {
	    var _this = this;

	    (0, _util.each)(this.$slots.default, function (node) {
	      if (node.componentOptions) {
	        var button = node.componentOptions.propsData;
	        button.ariaType = 'checked';
	        button.active = button.value === _this.value;
	      }
	    });
	    return h(
	      'div',
	      { 'class': {
	          'uk-button-group': this.group
	        } },
	      [this.$slots.default]
	    );
	  },
	  mounted: function mounted() {
	    var _this2 = this;

	    (0, _util.each)(this.$children, function (button) {
	      button.$el.addEventListener('click', function () {
	        return _this2.$emit('change', button.value);
	      });
	    });
	  }
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  functional: true,
	  props: ['date'],
	  render: function render(h, _ref) {
	    var parent = _ref.parent,
	        props = _ref.props,
	        data = _ref.data;

	    if (parent.dateRender) {
	      return h({
	        functional: true,
	        props: ['date'],
	        render: parent.dateRender
	      }, {
	        props: {
	          date: props.date
	        }
	      });
	    } else {
	      return h(
	        'a',
	        { 'class': {
	            'uk-datepicker-table-muted': props.date.month() !== parent.month
	          } },
	        [props.date.format('D')]
	      );
	    }
	  }
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  functional: true,
	  render: function render(h, _ref) {
	    var parent = _ref.parent;

	    return h(
	      "div",
	      { "class": "uk-datepicker-nav" },
	      [parent.isDisplayable(parent.prevMonth) && h(
	        "a",
	        { "class": "uk-datepicker-previous",
	          on: {
	            "click": function click(e) {
	              e.preventDefault();
	              parent.$emit('change', parent.prevMonth);
	            }
	          }
	        },
	        []
	      ), parent.isDisplayable(parent.nextMonth) && h(
	        "a",
	        { "class": "uk-datepicker-next",
	          on: {
	            "click": function click(e) {
	              e.preventDefault();
	              parent.$emit('change', parent.nextMonth);
	            }
	          }
	        },
	        []
	      ), h(
	        "div",
	        { "class": "uk-datepicker-heading" },
	        [h(Select, {
	          props: {
	            value: parent.selectedMonth,
	            display: parent.date.format('MMMM'),
	            options: parent.listMonths,
	            onChange: function onChange(e) {
	              parent.selectedMonth = e.target.value;
	            }
	          }
	        }), "\xA0", h(Select, {
	          props: {
	            value: parent.selectedYear,
	            display: parent.date.format('YYYY'),
	            options: parent.listYears,
	            onChange: function onChange(e) {
	              parent.selectedYear = e.target.value;
	            }
	          }
	        })]
	      )]
	    );
	  }
	};


	var Select = {
	  functional: true,
	  props: ['value', 'display', 'options', 'onChange'],
	  render: function render(h, _ref2) {
	    var parent = _ref2.parent,
	        props = _ref2.props;

	    return h('span', {
	      class: 'uk-form-select'
	    }, [h('a', {
	      on: {
	        click: function click(e) {
	          return e.preventDefault();
	        }
	      }
	    }, [props.display]), h('select', {
	      domProps: {
	        value: props.value
	      },
	      on: {
	        change: props.onChange
	      }
	    }, [props.options.map(function (option) {
	      return h('option', { domProps: {
	          value: option.value
	        } }, [option.text]);
	    })])]);
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isInteger = __webpack_require__(40);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _range2 = __webpack_require__(52);

	var _range3 = _interopRequireDefault(_range2);

	var _moment = __webpack_require__(20);

	var _moment2 = _interopRequireDefault(_moment);

	var _render = __webpack_require__(63);

	var _render2 = _interopRequireDefault(_render);

	var _moment3 = __webpack_require__(92);

	var _moment4 = _interopRequireDefault(_moment3);

	var _date = __webpack_require__(53);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkCalendar',
	  mixins: [_moment4.default],
	  render: _render2.default,
	  props: {
	    year: {
	      type: Number,
	      default: function _default() {
	        return new Date().getFullYear();
	      }
	    },

	    month: {
	      type: Number, default: function _default() {
	        return new Date().getMonth();
	      }
	    },

	    min: {
	      type: [String, Number, Object, Array],
	      default: '1980-01-01',
	      validator: _date.validDate
	    },

	    max: {
	      type: [String, Number, Object, Array],
	      default: '2050-12-31',
	      validator: _date.validDate
	    },
	    locale: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    },
	    dateRender: {
	      type: [Function, Boolean],
	      default: false
	    }
	  },
	  computed: {
	    selectedYear: {
	      get: function get() {
	        return this.year;
	      },
	      set: function set(year) {
	        var date = this.$moment().set({ year: year, month: this.month });
	        this.$emit('change', date);
	      }
	    },
	    selectedMonth: {
	      get: function get() {
	        return this.month;
	      },
	      set: function set(month) {
	        var date = this.$moment().set({ year: this.year, month: month });
	        this.$emit('change', date);
	      }
	    },
	    date: function date() {
	      return this.$moment().set({ year: this.year, month: this.month });
	    },
	    weeks: function weeks() {
	      return (0, _date.getCalendarMatrix)(this.date);
	    },
	    prevMonth: function prevMonth() {
	      return this.date.clone().subtract(1, 'month');
	    },
	    nextMonth: function nextMonth() {
	      return this.date.clone().add(1, 'month');
	    },
	    minMoment: function minMoment() {
	      return (0, _isInteger2.default)(this.min) ? this.$moment().add(-this.min - 1, 'days') : this.$moment(this.min || this.$options.props.min.default);
	    },
	    maxMoment: function maxMoment() {
	      return (0, _isInteger2.default)(this.max) ? this.$moment().add(this.max, 'days') : this.$moment(this.max || this.$options.props.max.default);
	    },
	    listYears: function listYears() {
	      var dates = [];
	      var currentDate = (0, _moment2.default)(this.minMoment);
	      while (currentDate <= this.maxMoment) {
	        dates.push({
	          text: currentDate.year(),
	          value: currentDate.year()
	        });
	        currentDate = (0, _moment2.default)(currentDate).add(1, 'year');
	      }
	      return dates;
	    },
	    listMonths: function listMonths() {
	      var currentYear = this.year;
	      var min = this.minMoment;
	      var max = this.maxMoment;
	      var inMinYear = currentYear === min.year();
	      var inMaxYear = currentYear === max.year();
	      var months = [];
	      _moment2.default.months().forEach(function (name, m) {
	        if ((!inMinYear || m >= min.month()) && (!inMaxYear || m <= max.month())) {
	          months.push({ text: name, value: m });
	        }
	      });
	      return months;
	    },
	    weekDays: function weekDays() {
	      return (0, _range3.default)(0, 7).map(function (val, index) {
	        return (0, _moment2.default)().weekday(index).format('ddd');
	      });
	    }
	  },
	  methods: {
	    isToday: _date.isToday,
	    isDisplayable: function isDisplayable(moment) {
	      return moment.isBetween(this.minMoment, this.maxMoment);
	    }
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (h) {
	  return h(
	    'div',
	    null,
	    [h(_Header2.default), h(
	      'table',
	      { 'class': 'uk-datepicker-table' },
	      [h(
	        'thead',
	        null,
	        [h(
	          'tr',
	          null,
	          [this.weekDays.map(function (day) {
	            return h('th', [day]);
	          })]
	        )]
	      ), h(
	        'tbody',
	        null,
	        [this.weeks.map(function (week) {
	          return h('tr', [week.map(function (date, index) {
	            return h('td', { key: index }, [h(_Field2.default, { props: { date: date } })]);
	          })]);
	        })]
	      )]
	    )]
	  );
	};

	var _Header = __webpack_require__(61);

	var _Header2 = _interopRequireDefault(_Header);

	var _Field = __webpack_require__(60);

	var _Field2 = _interopRequireDefault(_Field);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (h) {
	  var _this = this;

	  return h(
	    'vk-calendar',
	    {
	      attrs: {
	        year: this.year,
	        month: this.month,
	        'date-render': dateRender
	      },
	      on: {
	        'change': function change(date) {
	          return _this.$emit('change', date);
	        }
	      }
	    },
	    []
	  );
	};

	var dateRender = function dateRender(h, _ref) {
	  var props = _ref.props,
	      parent = _ref.parent;

	  var $calendar = parent;
	  var $datepicker = parent.$parent;
	  return h(
	    'a',
	    { 'class': {
	        'uk-active': $datepicker.isPicked(props.date),
	        'uk-datepicker-table-disabled': $datepicker.isDisabled(props.date),
	        'uk-datepicker-table-muted': props.date.month() !== $calendar.month || $datepicker.isDisabled(props.date)
	      }, on: {
	        'click': function click() {
	          if (!$datepicker.isDisabled(props.date)) {
	            $datepicker.toggle(props.date);
	          }
	        }
	      }
	    },
	    [props.date.format('D')]
	  );
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Datepicker = __webpack_require__(37);

	var _Datepicker2 = _interopRequireDefault(_Datepicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkDatepickerDrop',
	  extends: _Datepicker2.default,
	  render: function render(h) {
	    var _this = this;

	    return h(
	      'vk-dropdown',
	      {
	        attrs: {
	          target: this.target,
	          show: this.show
	        },
	        on: {
	          'clickOut': function clickOut(e) {
	            return _this.$emit('clickOut');
	          }
	        }
	      },
	      [h(_Datepicker2.default, {
	        class: 'uk-margin-remove',
	        props: {
	          year: this.year,
	          month: this.month,
	          dates: this.dates,
	          disabledDates: this.disabledDates,
	          min: this.min,
	          max: this.max
	        },
	        on: {
	          pick: function pick(picked) {
	            return _this.$emit('pick', picked);
	          },
	          unpick: function unpick(unpicked) {
	            return _this.$emit('unpick', unpicked);
	          },
	          change: function change(date) {
	            return _this.$emit('change', date);
	          }
	        }
	      })]
	    );
	  },
	  props: {
	    show: {
	      type: Boolean,
	      required: true
	    },
	    target: {
	      type: String,
	      required: true
	    }
	  }
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tether = __webpack_require__(54);

	var Tether = _interopRequireWildcard(_tether);

	var _dom = __webpack_require__(11);

	var _render = __webpack_require__(67);

	var _render2 = _interopRequireDefault(_render);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  name: 'VkDropdown',
	  render: _render2.default,
	  props: {
	    show: {
	      type: Boolean,
	      default: false
	    },
	    target: {
	      default: false
	    },
	    blank: {
	      type: Boolean,
	      default: false
	    },
	    fixWidth: {
	      type: Boolean,
	      default: false
	    },
	    position: {
	      type: String,
	      default: 'bottom left'
	    },
	    transition: {
	      type: String,
	      default: 'vk-transition-dropdown'
	    },
	    scrollable: {
	      type: Boolean,
	      default: false
	    },
	    offset: {
	      type: String,
	      default: '0 0'
	    },
	    offsetTarget: {
	      type: String,
	      default: '0 0'
	    },
	    constrainToWindow: {
	      type: Boolean,
	      default: true
	    },
	    constrainToParent: {
	      type: Boolean,
	      default: true
	    },
	    tetherOptions: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  computed: {
	    targetNode: function targetNode() {
	      return typeof this.target === 'string' ? document.querySelector(this.target) : this.target;
	    }
	  },
	  mounted: function mounted() {
	    if (this.targetNode) {
	      this.init();
	    }
	  },

	  methods: {
	    init: function init() {
	      this.initEvents();
	      this.$tether = Tether.init(this.$el, this.targetNode, this.show, this.position, this.offset, this.offsetTarget, this.constrainToParent, this.constrainToWindow, this.tetherOptions);
	    },
	    initEvents: function initEvents() {
	      var _this = this;

	      var clickEvents = ['click'];
	      if ('ontouchstart' in document.documentElement) {
	        clickEvents.push('touchstart');
	      }
	      var clickHandler = function clickHandler(event) {
	        if (_this.show) {
	          if (event.target === _this.targetNode || _this.targetNode.contains(event.target)) {
	            return;
	          }

	          if (event.target === _this.$el || _this.$el.contains(event.target)) {
	            _this.$emit('clickIn', event);
	          } else {
	            _this.$emit('clickOut', event);
	          }
	        }
	      };
	      for (var i = 0; i < clickEvents.length; ++i) {
	        this.on(document, clickEvents[i], clickHandler);
	      }
	      this.on(this.targetNode, 'mouseover', function (event) {
	        if (_this.targetNode.contains(event.fromElement)) {
	          return;
	        }
	        _this.$emit('targetHoverIn', event);
	      });
	      this.on(this.targetNode, 'mouseout', function (event) {
	        if (event.relatedTarget === _this.targetNode || _this.targetNode.contains(event.relatedTarget)) {
	          return;
	        }
	        _this.$emit('targetHoverOut', event);
	      });
	    },
	    on: function on(el, event, handler) {
	      (0, _dom.on)(el, event, handler, this._uid);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.$tether !== undefined) {
	      this.$tether.destroy();
	    }
	    (0, _dom.offAll)(this._uid);
	    this.$el.parentNode.removeChild(this.$el);
	  }
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _babelHelperVueJsxMergeProps = __webpack_require__(10);

	var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

	exports.default = function (h) {
	  var _this = this;

	  var directives = [{
	    name: 'show', value: this.show
	  }];
	  return h(
	    'transition',
	    (0, _babelHelperVueJsxMergeProps2.default)([{
	      attrs: { name: this.transition }
	    }, {
	      on: {
	        'before-enter': function beforeEnter() {
	          _this.$nextTick(function () {
	            return _this.$tether.enable();
	          });
	        },
	        'after-leave': function afterLeave() {
	          _this.$nextTick(function () {
	            return _this.$tether.disable();
	          });
	        }
	      }
	    }]),
	    [h(
	      'div',
	      (0, _babelHelperVueJsxMergeProps2.default)([{ directives: directives }, { 'class': {
	          'uk-dropdown': !this.blank,
	          'uk-dropdown-blank': this.blank,
	          'uk-dropdown-small': !this.fixWidth,
	          'uk-dropdown-scrollable': this.scrollable
	        },
	        attrs: { 'aria-hidden': this.show ? 'false' : 'true' }
	      }]),
	      [this.$slots.default]
	    )]
	  );
	};

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _debounce2 = __webpack_require__(146);

	var _debounce3 = _interopRequireDefault(_debounce2);

	var _dom = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var html = document.documentElement;
	var body = document.body;

	var active = void 0;
	var activeCount = void 0;

	var events = ['resize', 'orientationchange'];
	for (var i = 0; i < events.length; ++i) {
	  (0, _dom.on)(window, events[i], (0, _debounce3.default)(function (e) {
	    return active && resize(active.$el, active.center);
	  }, 150));
	}

	(0, _dom.on)(document, 'keyup', function (e) {
	  if (active && e.keyCode === 27) {
	    e.preventDefault();
	    active.$emit('keyEsc');
	  }
	});

	exports.default = {
	  functional: true,
	  render: function render(h, _ref) {
	    var props = _ref.props,
	        parent = _ref.parent,
	        children = _ref.children;

	    return h('transition', {
	      props: {
	        name: parent.transition
	      },
	      on: {
	        beforeEnter: function beforeEnter() {
	          parent.$nextTick(function () {
	            (0, _dom.addClass)(html, 'uk-modal-page');
	            resize(parent.$el, parent.center);
	          });
	        },
	        afterEnter: function afterEnter() {
	          if (active) {
	            active.$emit('inactive');
	          }
	          active = parent;
	        },
	        afterLeave: function afterLeave() {
	          activeCount > 0 ? activeCount-- : activeCount = 0;
	          if (!activeCount) {
	            (0, _dom.removeClass)(html, 'uk-modal-page');
	            body.style[parent.paddingDir] = '';
	          }
	          if (active === parent) {
	            active = false;
	          }
	        }
	      }
	    }, [children]);
	  }
	};


	function resize(modal, center) {
	  var dialog = modal.childNodes[0];
	  var bodyWidth = body.offsetWidth;
	  var scrollbarWidth = window.innerWidth - bodyWidth;
	  var lngDir = html.getAttribute('dir') === 'rtl' ? 'right' : 'left';
	  var paddingDir = 'padding-' + (lngDir === 'left' ? 'right' : 'left');
	  body.style[paddingDir] = scrollbarWidth;
	  modal.style['overflow-y'] = scrollbarWidth ? 'scroll' : 'auto';
	  if (center) {
	    var dh = dialog.offsetHeight;
	    var marginTop = (0, _dom.css)(dialog, 'margin-top');
	    var marginBottom = (0, _dom.css)(dialog, 'margin-bottom');
	    var pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10);
	    if (dh + pad < window.innerHeight) {
	      var top = window.innerHeight / 2 - dh / 2 - pad;
	      dialog.style.top = top + 'px';
	    } else {
	      dialog.style.top = '';
	    }
	  } else {
	    dialog.style.top = '';
	  }
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dom = __webpack_require__(11);

	var _render = __webpack_require__(70);

	var _render2 = _interopRequireDefault(_render);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkModal',
	  render: _render2.default,
	  props: {
	    show: {
	      type: Boolean,
	      default: false
	    },
	    center: {
	      type: Boolean,
	      default: false
	    },
	    large: {
	      type: Boolean,
	      default: false
	    },
	    lightbox: {
	      type: Boolean,
	      default: false
	    },
	    blank: {
	      type: Boolean,
	      default: false
	    },
	    transition: {
	      type: String,
	      default: 'vk-modal-transition'
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    var dialog = this.$el.childNodes[0];
	    var clickEvents = ['click'];
	    if ('ontouchstart' in document.documentElement) {
	      clickEvents.push('touchstart');
	    }
	    var clickHandler = function clickHandler(event) {
	      if (event.target === dialog || dialog.contains(event.target)) {
	        _this.$emit('clickIn', event);
	      } else {
	        _this.$emit('clickOut', event);
	      }
	    };
	    for (var i = 0; i < clickEvents.length; ++i) {
	      (0, _dom.on)(this.$el, clickEvents[i], clickHandler, this._uid);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    (0, _dom.offAll)(this._uid);
	  }
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _babelHelperVueJsxMergeProps = __webpack_require__(10);

	var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

	exports.default = function (h) {
	  var directives = [{
	    name: 'show', value: this.show
	  }];
	  var modal = h(
	    'div',
	    (0, _babelHelperVueJsxMergeProps2.default)([{ directives: directives }, { 'class': 'uk-modal',
	      attrs: { 'aria-hidden': this.show ? 'false' : 'true' }
	    }]),
	    [h(
	      'div',
	      { staticClass: 'uk-modal-dialog', 'class': {
	          'uk-modal-dialog-large': this.large,
	          'uk-modal-dialog-lightbox': this.lightbox,
	          'uk-modal-dialog-blank': this.blank
	        } },
	      [this.$slots.default]
	    )]
	  );
	  return h(_Transition2.default, [modal]);
	};

	var _Transition = __webpack_require__(68);

	var _Transition2 = _interopRequireDefault(_Transition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dom = __webpack_require__(11);

	var html = document.documentElement;
	var body = document.body;
	var scrollPos = {};

	exports.default = {
	  functional: true,
	  render: function render(h, _ref) {
	    var parent = _ref.parent,
	        children = _ref.children;

	    return h('transition', {
	      props: {
	        name: parent.transition
	      },
	      on: {
	        beforeEnter: function beforeEnter() {
	          scrollPos = { x: window.pageXOffset, y: window.pageYOffset };

	          parent.$nextTick(function () {
	            var scrollbarWidth = window.innerWidth - body.offsetWidth;
	            (0, _dom.addClass)(body, 'uk-offcanvas-page');
	            (0, _dom.addClass)(body, 'uk-offcanvas-page-open');
	            setBodyMargin(parent.flip, parent.$refs.bar.offsetWidth);
	            body.style.width = window.innerWidth - scrollbarWidth + 'px';
	            body.style.height = window.innerHeight + 'px';
	            body.offsetHeight;
	            html.style['margin-top'] = scrollPos.y * -1 + 'px';
	          });
	        },
	        beforeLeave: function beforeLeave() {
	          (0, _dom.removeClass)(body, 'uk-offcanvas-page-open');
	          body.style['margin-left'] = '';
	          body.style['margin-right'] = '';
	        },
	        afterLeave: function afterLeave() {
	          (0, _dom.removeClass)(body, 'uk-offcanvas-page');
	          body.style.width = '';
	          body.style.height = '';
	          html.style['margin-top'] = '';
	          window.scrollTo(scrollPos.x, scrollPos.y);
	        }
	      }
	    }, children);
	  }
	};


	function setBodyMargin(flip, barWidth) {
	  var lngDir = html.getAttribute('dir') === 'rtl' ? 'right' : 'left';
	  var rtl = lngDir === 'right';
	  var dir = (flip ? -1 : 1) * (rtl ? -1 : 1);
	  var margin = (rtl ? -1 : 1) * (barWidth * dir);
	  body.style[rtl ? 'margin-right' : 'margin-left'] = margin + 'px';
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dom = __webpack_require__(11);

	var _render = __webpack_require__(73);

	var _render2 = _interopRequireDefault(_render);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkOffcanvas',
	  render: _render2.default,
	  props: {
	    show: {
	      type: Boolean,
	      default: false
	    },
	    flip: {
	      type: Boolean,
	      default: false
	    },
	    transition: {
	      type: String,
	      default: 'vk-offcanvas-transition'
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    (0, _dom.on)(document, 'keyup', function (e) {
	      if (_this.show && e.keyCode === 27) {
	        e.preventDefault();
	        _this.$emit('keyEsc', e);
	      }
	    }, this._uid);
	  },
	  beforeDestroy: function beforeDestroy() {
	    (0, _dom.offAll)(this._uid);
	  }
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _babelHelperVueJsxMergeProps = __webpack_require__(10);

	var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

	exports.default = function (h) {
	  var _this = this;

	  var directives = [{
	    name: 'show', value: this.show
	  }];
	  var offcanvas = h(
	    'div',
	    (0, _babelHelperVueJsxMergeProps2.default)([{ directives: directives }, { staticClass: 'uk-offcanvas',
	      attrs: { 'aria-hidden': this.show ? 'false' : 'true'
	      },
	      on: {
	        'click': function click(e) {
	          if (e.target !== _this.$el && _this.$el.contains(e.target)) {
	            _this.$emit('clickIn', e);
	          } else {
	            _this.$emit('clickOut', e);
	          }
	        }
	      }
	    }]),
	    [h(
	      'div',
	      { ref: 'bar', staticClass: 'uk-offcanvas-bar', 'class': {
	          'uk-offcanvas-bar-flip': this.flip
	        } },
	      [this.$slots.default]
	    )]
	  );
	  return h(_Transition2.default, [offcanvas]);
	};

	var _Transition = __webpack_require__(71);

	var _Transition2 = _interopRequireDefault(_Transition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  functional: true,
	  props: ['icon', 'page'],
	  render: function render(h, _ref) {
	    var props = _ref.props,
	        parent = _ref.parent;

	    var icon = h('i', { class: 'uk-icon-' + props.icon });
	    return props.page ? h('a', { on: { click: function click(e) {
	          e.preventDefault();
	          parent.change({ page: props.page });
	        } } }, [icon]) : h('span', [icon]);
	  }
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  functional: true,
	  props: ['page'],
	  render: function render(h, _ref) {
	    var props = _ref.props,
	        parent = _ref.parent;

	    var isCurrent = props.page === parent.page;
	    return h(
	      'li',
	      { 'class': { 'uk-active': isCurrent } },
	      [isCurrent ? h('span', [props.page]) : h('a', { on: {
	          click: function click(e) {
	            e.preventDefault();
	            parent.change({ page: props.page });
	          }
	        } }, [props.page])]
	    );
	  }
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _range2 = __webpack_require__(52);

	var _range3 = _interopRequireDefault(_range2);

	var _util = __webpack_require__(4);

	var _render = __webpack_require__(77);

	var _render2 = _interopRequireDefault(_render);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkPagination',
	  render: _render2.default,
	  props: {
	    page: {
	      type: Number,
	      default: 1
	    },

	    total: {
	      type: Number,
	      required: true
	    },

	    limit: {
	      type: Number,
	      default: 10
	    },

	    pageRange: {
	      type: Number,
	      default: 2
	    },

	    align: {
	      type: String,
	      default: ''
	    },

	    compact: {
	      type: Boolean,
	      default: false
	    }
	  },
	  computed: {
	    prevPage: function prevPage() {
	      return this.page - 1 !== 0 ? this.page - 1 : null;
	    },
	    nextPage: function nextPage() {
	      return this.page + 1 <= this.totalPages ? this.page + 1 : null;
	    },
	    totalPages: function totalPages() {
	      return Math.ceil(this.total / this.limit);
	    },
	    mainPages: function mainPages() {
	      var start = this.page - this.pageRange;
	      var end = this.page + this.pageRange;
	      if (end > this.totalPages) {
	        end = this.totalPages;
	        start = this.totalPages - this.pageRange * 2;
	        start = start < 1 ? 1 : start;
	      }
	      if (start <= 1) {
	        start = 1;
	        end = Math.min(this.pageRange * 2 + 1, this.totalPages);
	      }
	      return (0, _range3.default)(start, end + 1);
	    },
	    prePages: function prePages() {
	      return (0, _range3.default)(1, this.mainPages[0] <= 3 ? this.mainPages[0] : 2);
	    },
	    postPages: function postPages() {
	      var mainLast = this.mainPages[this.mainPages.length - 1];
	      return (0, _range3.default)(mainLast >= this.totalPages - 2 ? mainLast + 1 : this.totalPages, this.totalPages + 1);
	    }
	  },
	  methods: {
	    change: function change(changes) {
	      var state = (0, _util.merge)({
	        page: this.page,
	        total: this.total,
	        limit: this.limit
	      }, changes);

	      state.offset = (state.page - 1) * state.limit + 1;
	      state.to = Math.min(state.total, state.page * state.limit);

	      this.$emit('change', state);
	    }
	  }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (h) {
	  return h(
	    'ul',
	    { 'class': {
	        'uk-pagination': true,
	        'uk-pagination-left': this.align === 'left',
	        'uk-pagination-right': this.align === 'right'
	      } },
	    [h(
	      'li',
	      { 'class': {
	          'uk-disabled': !this.prevPage,
	          'uk-pagination-previous': !this.compact
	        } },
	      [this.prevPage ? h(_Button2.default, { props: { icon: 'angle-double-left', page: 1 } }) : h(_Button2.default, { props: { icon: 'angle-double-left' } }), this.prevPage ? h(_Button2.default, { props: { icon: 'angle-left', page: this.prevPage } }) : h(_Button2.default, { props: { icon: 'angle-left' } })]
	    ), this.prePages.map(function (page) {
	      return h(_Page2.default, { props: { page: page } });
	    }), this.mainPages[0] > this.prePages.length + 1 && h(
	      'li',
	      null,
	      [h(
	        'span',
	        null,
	        ['...']
	      )]
	    ), this.mainPages.map(function (page) {
	      return h(_Page2.default, { props: { page: page } });
	    }), this.mainPages[this.mainPages.length - 1] + 1 < this.postPages[0] && h(
	      'li',
	      null,
	      [h(
	        'span',
	        null,
	        ['...']
	      )]
	    ), this.postPages.map(function (page) {
	      return h(_Page2.default, { props: { page: page } });
	    }), h(
	      'li',
	      { 'class': {
	          'uk-disabled': !this.nextPage,
	          'uk-pagination-next': !this.compact
	        } },
	      [this.nextPage ? h(_Button2.default, { props: { icon: 'angle-right', page: this.nextPage } }) : h(_Button2.default, { props: { icon: 'angle-right' } }), this.nextPage ? h(_Button2.default, { props: { icon: 'angle-double-right', page: this.totalPages } }) : h(_Button2.default, { props: { icon: 'angle-double-right' } })]
	    )]
	  );
	};

	var _Page = __webpack_require__(75);

	var _Page2 = _interopRequireDefault(_Page);

	var _Button = __webpack_require__(74);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Picker = __webpack_require__(38);

	var _Picker2 = _interopRequireDefault(_Picker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkPickerDrop',
	  render: function render(h) {
	    var _this = this;

	    return h(
	      'vk-dropdown',
	      {
	        attrs: {
	          target: this.target,
	          show: this.show
	        },
	        on: {
	          'clickOut': function clickOut(e) {
	            return _this.$emit('clickOut');
	          }
	        }
	      },
	      [h(_Picker2.default, {
	        class: 'uk-margin-remove',
	        props: {
	          fields: this.fields,
	          rows: this.rows
	        },
	        on: {
	          pick: function pick(picked) {
	            return _this.$emit('pick', picked);
	          }
	        }
	      })]
	    );
	  },
	  props: {
	    show: {
	      type: Boolean,
	      required: true
	    },
	    target: {
	      type: String,
	      required: true
	    },
	    fields: {
	      type: Array,
	      required: true
	    },
	    rows: {
	      type: Array,
	      required: true
	    }
	  }
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'VkSubnav',
	  props: {
	    index: {
	      type: Number,
	      default: ''
	    },
	    line: {
	      type: Boolean,
	      default: false
	    },
	    pill: {
	      type: Boolean,
	      default: false
	    }
	  },
	  render: function render(h) {
	    var items = this.$slots.default.filter(function (node) {
	      return node.componentOptions && node.componentOptions.tag === 'vk-subnav-item';
	    }).map(function (node, index) {
	      var data = node.componentOptions.propsData;
	      data.index = index;
	      return node;
	    });
	    return h(
	      'ul',
	      { 'class': {
	          'uk-subnav': true,
	          'uk-subnav-line': this.line,
	          'uk-subnav-pill': this.pill
	        } },
	      [items]
	    );
	  }
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'VkSubnavItem',
	  props: {
	    index: {
	      type: Number,
	      default: 0
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    }
	  },
	  computed: {
	    active: function active() {
	      return this.index === this.$parent.index;
	    }
	  },
	  render: function render(h) {
	    var _this = this;

	    return h(
	      'li',
	      { 'class': {
	          'uk-active': this.active,
	          'uk-disabled': this.disabled
	        } },
	      [h(
	        'a',
	        {
	          on: {
	            'click': function click(event) {
	              event.preventDefault();
	              if (!_this.disabled && !_this.active) {
	                _this.$parent.$emit('change', _this.index);
	              }
	            }
	          }
	        },
	        [this.$slots.default]
	      )]
	    );
	  }
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'VkSwitcher',
	  props: {
	    index: {
	      type: Number,
	      default: 0
	    },
	    transition: {
	      type: String,
	      default: ''
	    },
	    transitionMode: {
	      type: String,
	      default: 'out-in'
	    }
	  },
	  render: function render(h) {
	    var switchers = this.$slots.default.filter(function (node) {
	      return node.componentOptions && node.componentOptions.tag === 'vk-switcher-item';
	    }).map(function (node, index) {
	      node.key = 'tab-' + index;
	      return node;
	    });
	    return h(
	      'ul',
	      { 'class': 'uk-list' },
	      [h(
	        'transition',
	        {
	          attrs: { name: this.transition, mode: this.transitionMode }
	        },
	        [h(
	          'keep-alive',
	          null,
	          [[switchers[this.index]]]
	        )]
	      )]
	    );
	  }
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'VkSwitcherItem',
	  render: function render(h) {
	    return h(
	      'li',
	      null,
	      [this.$slots.default]
	    );
	  }
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  functional: true,
	  props: ['row', 'field'],
	  render: function render(h, _ref) {
	    var parent = _ref.parent,
	        props = _ref.props,
	        data = _ref.data;

	    if (props.field.render !== undefined) {
	      return h({
	        functional: true,
	        props: ['row', 'field'],
	        render: props.field.render
	      }, {
	        props: {
	          row: props.row,
	          field: props.field
	        }
	      });
	    } else {
	      return props.row[props.field.name];
	    }
	  }
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(21);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  functional: true,
	  props: ['field'],
	  render: function render(h, _ref) {
	    var parent = _ref.parent,
	        props = _ref.props;

	    var orderedBy = parent.sortOrder[props.field.name];
	    var icon = h(
	      'i',
	      { staticClass: 'uk-icon-justify uk-margin-small-left', 'class': {
	          'uk-invisible': !orderedBy,
	          'vk-icon-arrow-down': orderedBy === 'asc' || orderedBy === undefined,
	          'vk-icon-arrow-up': orderedBy === 'desc'
	        } },
	      []
	    );
	    return h(
	      'th',
	      { 'class': (0, _defineProperty3.default)({
	          'uk-visible-hover-inline': props.field.sortBy,
	          'vk-table-order': props.field.sortBy,
	          'uk-active': orderedBy
	        }, props.field.headerClass, props.field.headerClass), on: {
	          'click': function click(e) {
	            return props.field.sortBy && parent.emitSort(props.field);
	          }
	        }
	      },
	      [h(
	        'span',
	        { 'class': 'uk-position-relative' },
	        [props.field.header, props.field.sortBy && icon]
	      )]
	    );
	  }
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Checkbox = __webpack_require__(39);

	var _Checkbox2 = _interopRequireDefault(_Checkbox);

	var _Field = __webpack_require__(83);

	var _Field2 = _interopRequireDefault(_Field);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  functional: true,
	  props: ['row'],
	  render: function render(h, _ref) {
	    var parent = _ref.parent,
	        props = _ref.props;

	    var rowId = props.row[parent.trackBy];
	    return h(
	      'tr',
	      {
	        on: {
	          'click': function click(e) {
	            if (e.target.tagName === 'TD') {
	              triggerChangeEvent(parent, props.row);
	            }
	          }
	        }
	      },
	      [parent.selectable && h(
	        'td',
	        { 'class': 'vk-table-width-minimum' },
	        [h(_Checkbox2.default, {
	          props: {
	            checked: parent.selectedRows.find(function (id) {
	              return id === rowId;
	            }),
	            onClick: function onClick(e) {
	              triggerChangeEvent(parent, props.row);
	            }
	          }
	        })]
	      ), parent.fieldsDef.map(function (field, index) {
	        return h(
	          'td',
	          { 'class': field.cellClass },
	          [h(_Field2.default, { props: { row: props.row, field: field } })]
	        );
	      })]
	    );
	  }
	};


	function triggerChangeEvent(parent, row) {
	  var rowId = row[parent.trackBy];
	  var selectedRows = parent.selectedRows.slice();
	  if (selectedRows.find(function (id) {
	    return id === rowId;
	  })) {
	    var index = selectedRows.indexOf(rowId);
	    selectedRows.splice(index, 1);
	    parent.$emit('unselect', selectedRows, [row]);
	  } else {
	    selectedRows.push(rowId);
	    parent.$emit('select', selectedRows, [row]);
	  }
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _render = __webpack_require__(87);

	var _render2 = _interopRequireDefault(_render);

	var _util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkTable',
	  render: _render2.default,
	  props: {
	    fields: {
	      type: Array,
	      required: true
	    },
	    rows: {
	      type: Array,
	      required: true
	    },
	    trackBy: {
	      type: String,
	      required: true
	    },
	    selectable: {
	      type: Boolean,
	      default: false
	    },
	    selectedRows: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    condensed: {
	      type: Boolean,
	      default: false
	    },
	    striped: {
	      type: Boolean,
	      default: false
	    },
	    hover: {
	      type: Boolean,
	      default: false
	    },
	    sortOrder: {
	      type: Object,
	      default: function _default() {
	        return {};
	      } }
	  },
	  computed: {
	    fieldsDef: function fieldsDef() {
	      return this.fields.map(function (field) {
	        var obj = {
	          name: '',
	          header: '',
	          headerClass: '',
	          cellClass: '',
	          sortBy: ''
	        };
	        (0, _util.isString)(field) ? (0, _util.merge)(obj, { name: field }) : (0, _util.merge)(obj, field);
	        if (obj.header !== false && obj.header === '') {
	          obj.header = titleCase(obj.name);
	        }
	        return obj;
	      });
	    }
	  },
	  methods: {
	    emitSort: function emitSort(field) {
	      var sortBy = field.sortBy === true ? field.name : field.sortBy;
	      var sortOrder = {};

	      if (this.sortOrder[sortBy]) {
	        sortOrder[sortBy] = this.sortOrder[sortBy] === 'asc' ? 'desc' : 'asc';
	      } else {
	        sortOrder[sortBy] = 'asc';
	      }
	      this.$emit('sort', sortOrder);
	    }
	  }
	};


	function titleCase(str) {
	  return str.replace(/\w+/g, function (txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (h) {
	  var _this = this;

	  var allSelected = this.rows.every(function (row) {
	    return _this.selectedRows.find(function (id) {
	      return id === row[_this.trackBy];
	    });
	  });
	  return h(
	    'table',
	    { staticClass: 'uk-table', 'class': {
	        'uk-table-striped': this.striped,
	        'uk-table-condensed': this.condensed,
	        'uk-table-hover': this.hover
	      } },
	    [h(
	      'thead',
	      null,
	      [h(
	        'tr',
	        null,
	        [this.selectable && h('th', [h(_Checkbox2.default, {
	          props: {
	            checked: allSelected,
	            onClick: function onClick(e) {
	              if (allSelected) {
	                var affectedRows = _this.rows.slice();
	                _this.$emit('unselect', [], affectedRows);
	              } else {
	                var newState = _this.rows.map(function (row) {
	                  return row[_this.trackBy];
	                });
	                var _affectedRows = _this.rows.filter(function (row) {
	                  return !_this.selectedRows.find(function (id) {
	                    return row[_this.trackBy] === id;
	                  });
	                });
	                _this.$emit('select', newState, _affectedRows);
	              }
	            }
	          }
	        })]), this.fieldsDef.map(function (field) {
	          return h(_Header2.default, { props: { field: field } });
	        })]
	      )]
	    ), h(
	      'tbody',
	      null,
	      [this.rows.map(function (row) {
	        return h(_Row2.default, { props: { row: row } });
	      })]
	    )]
	  );
	};

	var _Checkbox = __webpack_require__(39);

	var _Checkbox2 = _interopRequireDefault(_Checkbox);

	var _Header = __webpack_require__(84);

	var _Header2 = _interopRequireDefault(_Header);

	var _Row = __webpack_require__(85);

	var _Row2 = _interopRequireDefault(_Row);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'VkTabs',
	  props: {
	    index: {
	      type: Number,
	      default: 0
	    },

	    flip: {
	      type: Boolean,
	      default: false
	    },

	    center: {
	      type: Boolean,
	      default: false
	    },

	    bottom: {
	      type: Boolean,
	      default: false
	    },

	    width: {
	      type: String,
	      default: ''
	    }
	  },
	  render: function render(h) {
	    var _this = this;

	    var Tabs = this.$slots.default.filter(function (node) {
	      return node.componentOptions && node.componentOptions.tag === 'vk-tabs-item';
	    }).map(function (node, index) {
	      var data = node.componentOptions.propsData;
	      data.index = index;
	      data.width = _this.width;
	      return node;
	    });
	    return h(
	      'div',
	      { 'class': {
	          'uk-flex uk-flex-column-reverse': this.bottom
	        } },
	      [h(
	        'div',
	        { 'class': {
	            'uk-tab-center': this.center,
	            'uk-tab-center-bottom': this.center && this.bottom
	          } },
	        [h(
	          'ul',
	          { 'class': {
	              'uk-tab': true,
	              'uk-tab-grid': this.width,
	              'uk-tab-flip': this.flip,
	              'uk-tab-bottom': this.bottom
	            } },
	          [Tabs]
	        )]
	      ), h(
	        'vk-switcher',
	        {
	          attrs: { index: this.index }
	        },
	        [Tabs.map(function (tab) {
	          return h(
	            'vk-switcher-item',
	            null,
	            [tab.componentOptions.children]
	          );
	        })]
	      )]
	    );
	  }
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(21);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkTabsItem',
	  props: {
	    index: {
	      type: Number,
	      default: 0
	    },
	    name: {
	      type: String,
	      required: true
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    },
	    width: {
	      type: String,
	      default: ''
	    }
	  },
	  computed: {
	    active: function active() {
	      return this.index === this.$parent.index;
	    }
	  },
	  render: function render(h) {
	    var _ref,
	        _this = this;

	    return h(
	      'li',
	      { 'class': (_ref = {}, (0, _defineProperty3.default)(_ref, 'uk-width-' + this.width, this.width), (0, _defineProperty3.default)(_ref, 'uk-active', this.active), (0, _defineProperty3.default)(_ref, 'uk-disabled', this.disabled), _ref) },
	      [h(
	        'a',
	        {
	          on: {
	            'click': function click(event) {
	              event.preventDefault();
	              if (!_this.disabled) {
	                _this.$parent.$emit('change', _this.index);
	              }
	            }
	          }
	        },
	        [this.name]
	      )]
	    );
	  }
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'VkTabsVertical',
	  props: {
	    index: {
	      type: Number,
	      default: 0
	    },
	    flip: {
	      type: Boolean,
	      default: false
	    },
	    width: {
	      type: String,
	      default: '1-3'
	    },
	    contentWidth: {
	      type: String,
	      default: '2-3'
	    }
	  },
	  render: function render(h) {
	    var Tabs = this.$slots.default.filter(function (node) {
	      return node.componentOptions && node.componentOptions.tag === 'vk-tabs-item';
	    }).map(function (node, index) {
	      node.componentOptions.propsData.index = index;
	      return node;
	    });
	    return h(
	      'div',
	      { 'class': {
	          'uk-grid': true,
	          'uk-flex uk-flex-row-reverse': this.flip
	        } },
	      [h(
	        'div',
	        { 'class': 'uk-width-medium-' + this.width },
	        [h(
	          'ul',
	          { 'class': {
	              'uk-tab': true,
	              'uk-tab-left': !this.flip,
	              'uk-tab-right': this.flip
	            } },
	          [Tabs]
	        )]
	      ), h(
	        'div',
	        { 'class': 'uk-width-medium-' + this.contentWidth },
	        [h(
	          'vk-switcher',
	          {
	            attrs: { index: this.index }
	          },
	          [Tabs.map(function (tab) {
	            return h(
	              'vk-switcher-item',
	              null,
	              [tab.componentOptions.children]
	            );
	          })]
	        )]
	      )]
	    );
	  }
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _babelHelperVueJsxMergeProps = __webpack_require__(10);

	var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'VkUpload',
	  data: function data() {
	    return {
	      dragged: false
	    };
	  },
	  render: function render(h) {
	    var _this = this;

	    var data = {
	      on: {
	        drop: function drop(e) {
	          if (e.dataTransfer && e.dataTransfer.files) {
	            e.stopPropagation();
	            e.preventDefault();
	            _this.dragged = false;
	            _this.$emit('dropped', e.dataTransfer.files);
	          }
	        },
	        dragenter: function dragenter(e) {
	          e.stopPropagation();
	          e.preventDefault();
	        },
	        dragover: function dragover(e) {
	          e.stopPropagation();
	          e.preventDefault();
	          _this.dragged = true;
	        },
	        dragleave: function dragleave(e) {
	          e.stopPropagation();
	          e.preventDefault();
	          _this.dragged = false;
	        }
	      }
	    };
	    return h(
	      'div',
	      (0, _babelHelperVueJsxMergeProps2.default)([data, { 'class': {
	          'uk-placeholder uk-text-center': true,
	          'uk-dragover': this.dragged
	        } }]),
	      [this.$slots.default]
	    );
	  }
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _moment = __webpack_require__(20);

	var _moment2 = _interopRequireDefault(_moment);

	var _util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultLocale = {
	  name: 'en',
	  week: {
	    dow: 1
	  }
	};

	exports.default = {
	  beforeCreate: function beforeCreate() {
	    if (_moment2.default === undefined) {
	      (0, _util.warn)(this.$options.name + ' stopped executing due to missing Moment.js dependency.');
	      this.$destroy();
	    } else {
	      this.$moment = function (date) {
	        var moment = !date || (0, _util.isArray)(date) || (0, _util.isObject)(date) ? (0, _moment2.default)(date || undefined) : (0, _moment2.default)(date, this.format);
	        if (!moment.isValid()) {
	          (0, _util.warn)('Moment object creation failed with date input \'' + date + '\'');
	        }
	        return moment;
	      };
	    }
	  },
	  created: function created() {
	    var locale = (0, _util.merge)({}, defaultLocale, this.locale);
	    _moment2.default.updateLocale(locale.name, locale);
	  },

	  filters: {
	    format: function format(moment, _format) {
	      return moment.format(_format);
	    }
	  }
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(94);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(93);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(99);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(98);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	__webpack_require__(35);
	module.exports = __webpack_require__(130);

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	__webpack_require__(35);
	module.exports = __webpack_require__(131);

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(133);
	module.exports = __webpack_require__(1).Number.isInteger;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(134);
	var $Object = __webpack_require__(1).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(135);
	module.exports = __webpack_require__(1).Object.getPrototypeOf;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(136);
	module.exports = __webpack_require__(1).Object.keys;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(138);
	__webpack_require__(137);
	__webpack_require__(139);
	__webpack_require__(140);
	module.exports = __webpack_require__(1).Symbol;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	__webpack_require__(36);
	module.exports = __webpack_require__(34).f('iterator');

/***/ },
/* 110 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(8)
	  , toLength  = __webpack_require__(128)
	  , toIndex   = __webpack_require__(127);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(110);
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(17)
	  , gOPS    = __webpack_require__(47)
	  , pIE     = __webpack_require__(26);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3).document && document.documentElement;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(22);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(22);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(15)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(45)
	  , descriptor     = __webpack_require__(18)
	  , setToStringTag = __webpack_require__(27)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(17)
	  , toIObject = __webpack_require__(8);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(19)('meta')
	  , isObject = __webpack_require__(15)
	  , has      = __webpack_require__(6)
	  , setDesc  = __webpack_require__(7).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(14)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(7)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(17);

	module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(26)
	  , createDesc     = __webpack_require__(18)
	  , toIObject      = __webpack_require__(8)
	  , toPrimitive    = __webpack_require__(32)
	  , has            = __webpack_require__(6)
	  , IE8_DOM_DEFINE = __webpack_require__(43)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(8)
	  , gOPN      = __webpack_require__(46).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , defined   = __webpack_require__(23);
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(30)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(41)
	  , ITERATOR  = __webpack_require__(2)('iterator')
	  , Iterators = __webpack_require__(16);
	module.exports = __webpack_require__(1).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(12)
	  , get      = __webpack_require__(129);
	module.exports = __webpack_require__(1).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(41)
	  , ITERATOR  = __webpack_require__(2)('iterator')
	  , Iterators = __webpack_require__(16);
	module.exports = __webpack_require__(1).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(111)
	  , step             = __webpack_require__(120)
	  , Iterators        = __webpack_require__(16)
	  , toIObject        = __webpack_require__(8);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(44)(Array, 'Array', function(iterated, kind){
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
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(13);

	$export($export.S, 'Number', {isInteger: __webpack_require__(118)});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(5), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(31)
	  , $getPrototypeOf = __webpack_require__(48);

	__webpack_require__(50)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(31)
	  , $keys    = __webpack_require__(17);

	__webpack_require__(50)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 137 */
/***/ function(module, exports) {

	

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(3)
	  , has            = __webpack_require__(6)
	  , DESCRIPTORS    = __webpack_require__(5)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(51)
	  , META           = __webpack_require__(122).KEY
	  , $fails         = __webpack_require__(14)
	  , shared         = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(27)
	  , uid            = __webpack_require__(19)
	  , wks            = __webpack_require__(2)
	  , wksExt         = __webpack_require__(34)
	  , wksDefine      = __webpack_require__(33)
	  , keyOf          = __webpack_require__(121)
	  , enumKeys       = __webpack_require__(114)
	  , isArray        = __webpack_require__(117)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(8)
	  , toPrimitive    = __webpack_require__(32)
	  , createDesc     = __webpack_require__(18)
	  , _create        = __webpack_require__(45)
	  , gOPNExt        = __webpack_require__(125)
	  , $GOPD          = __webpack_require__(124)
	  , $DP            = __webpack_require__(7)
	  , $keys          = __webpack_require__(17)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(46).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(26).f  = $propertyIsEnumerable;
	  __webpack_require__(47).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(25)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33)('asyncIterator');

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33)('observable');

/***/ },
/* 141 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;

	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the range of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);

	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}

	module.exports = baseRange;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var baseRange = __webpack_require__(141),
	    isIterateeCall = __webpack_require__(144),
	    toFinite = __webpack_require__(149);

	/**
	 * Creates a `_.range` or `_.rangeRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new range function.
	 */
	function createRange(fromRight) {
	  return function(start, end, step) {
	    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	      end = step = undefined;
	    }
	    // Ensure the sign of `-0` is preserved.
	    start = toFinite(start);
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toFinite(end);
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
	    return baseRange(start, end, step, fromRight);
	  };
	}

	module.exports = createRange;


/***/ },
/* 143 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 144 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(143);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(147),
	    now = __webpack_require__(148),
	    toNumber = __webpack_require__(150);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	module.exports = debounce;


/***/ },
/* 147 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(145);

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	module.exports = now;


/***/ },
/* 149 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 150 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 151 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.4.0 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}

	var zeroElement = null;

	// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
	// if the element lies within a nested document (<frame> or <iframe>-like).
	function getActualBoundingClientRect(node) {
	  var boundingRect = node.getBoundingClientRect();

	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = {};
	  for (var k in boundingRect) {
	    rect[k] = boundingRect[k];
	  }

	  if (node.ownerDocument !== document) {
	    var _frameElement = node.ownerDocument.defaultView.frameElement;
	    if (_frameElement) {
	      var frameRect = getActualBoundingClientRect(_frameElement);
	      rect.top += frameRect.top;
	      rect.bottom += frameRect.top;
	      rect.left += frameRect.left;
	      rect.right += frameRect.left;
	    }
	  }

	  return rect;
	}

	function getScrollParents(el) {
	  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	  var computedStyle = getComputedStyle(el) || {};
	  var position = computedStyle.position;
	  var parents = [];

	  if (position === 'fixed') {
	    return [el];
	  }

	  var parent = el;
	  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      parents.push(parent);
	      return parents;
	    }

	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        parents.push(parent);
	      }
	    }
	  }

	  parents.push(el.ownerDocument.body);

	  // If the node is within a frame, account for the parent window scroll
	  if (el.ownerDocument !== document) {
	    parents.push(el.ownerDocument.defaultView);
	  }

	  return parents;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin() {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = zeroElement;
	  if (!node || !document.body.contains(node)) {
	    node = document.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    document.body.appendChild(node);

	    zeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = getActualBoundingClientRect(node);

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
	};

	function removeUtilElements() {
	  if (zeroElement) {
	    document.body.removeChild(zeroElement);
	  }
	  zeroElement = null;
	};

	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }

	  var docEl = doc.documentElement;

	  var box = getActualBoundingClientRect(el);

	  var origin = getOrigin();

	  box.top -= origin.top;
	  box.left -= origin.left;

	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }

	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;

	  return box;
	}

	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}

	var _scrollBarSize = null;
	function getScrollBarSize() {
	  if (_scrollBarSize) {
	    return _scrollBarSize;
	  }
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';

	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });

	  outer.appendChild(inner);

	  document.body.appendChild(outer);

	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;

	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }

	  document.body.removeChild(outer);

	  var width = widthContained - widthScroll;

	  _scrollBarSize = { width: width, height: width };
	  return _scrollBarSize;
	}

	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var args = [];

	  Array.prototype.push.apply(args, arguments);

	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });

	  return out;
	}

	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}

	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}

	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}

	function getClassName(el) {
	  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
	  // completely separately SVGAnimatedString base classes
	  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}

	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}

	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });

	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}

	var deferred = [];

	var defer = function defer(fn) {
	  deferred.push(fn);
	};

	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};

	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }

	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
	        return;
	      }

	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;

	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }

	          handler.apply(context, args);

	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);

	  return Evented;
	})();

	TetherBase.Utils = {
	  getActualBoundingClientRect: getActualBoundingClientRect,
	  getScrollParents: getScrollParents,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize,
	  removeUtilElements: removeUtilElements
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParents = _TetherBase$Utils.getScrollParents;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
	var removeUtilElements = _TetherBase$Utils.removeUtilElements;

	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');

	  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();

	var tethers = [];

	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};

	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}

	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;

	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);

	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }

	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }

	    if (pendingTimeout != null) {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
	})();

	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};

	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};

	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};

	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }

	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }

	  return { left: left, top: top };
	};

	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }

	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }

	  return { left: left, top: top };
	};

	function addOffset() {
	  var out = { top: 0, left: 0 };

	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }

	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }

	    out.top += top;
	    out.left += left;
	  });

	  return out;
	}

	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }

	  return offset;
	}

	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');

	  var _value$split2 = _slicedToArray(_value$split, 2);

	  var top = _value$split2[0];
	  var left = _value$split2[1];

	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;

	var TetherClass = (function (_Evented) {
	  _inherits(TetherClass, _Evented);

	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

	    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
	    this.position = this.position.bind(this);

	    tethers.push(this);

	    this.history = [];

	    this.setOptions(options, false);

	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });

	    this.position();
	  }

	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;

	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;

	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };

	      this.options = extend(defaults, options);

	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;

	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;

	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }

	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }

	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });

	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }

	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }

	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);

	      if (typeof this.scrollParents !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParents = [this.target];
	      } else {
	        this.scrollParents = getScrollParents(this.target);
	      }

	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);

	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };

	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;

	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;

	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }

	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;

	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }

	          var style = getComputedStyle(target);

	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }

	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };

	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }

	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }

	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }

	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var _this3 = this;

	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      this.scrollParents.forEach(function (parent) {
	        if (parent !== _this3.target.ownerDocument) {
	          parent.addEventListener('scroll', _this3.position);
	        }
	      });

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var _this4 = this;

	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParents !== 'undefined') {
	        this.scrollParents.forEach(function (parent) {
	          parent.removeEventListener('scroll', _this4.position);
	        });
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this5 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this5) {
	          tethers.splice(i, 1);
	        }
	      });

	      // Remove any elements we were using for convenience from the DOM
	      if (tethers.length === 0) {
	        removeUtilElements();
	      }
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this6 = this;

	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }

	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;

	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }

	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this6.getClass('element-attached') + '-' + side);
	        all.push(_this6.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this6.element, _this6._addAttachClasses, all);
	        if (!(_this6.options.addTargetClasses === false)) {
	          updateClasses(_this6.target, _this6._addAttachClasses, all);
	        }

	        delete _this6._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this7 = this;

	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)

	      if (!this.enabled) {
	        return;
	      }

	      this.clearCache();

	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

	      this.updateAttachClasses(this.attachment, targetAttachment);

	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this7.element);
	      });

	      var width = elementPos.width;
	      var height = elementPos.height;

	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;

	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }

	      var targetPos = this.cache('target-bounds', function () {
	        return _this7.getTargetBounds();
	      });
	      var targetSize = targetPos;

	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);

	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;

	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });

	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }

	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },

	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };

	      var doc = this.target.ownerDocument;
	      var win = doc.defaultView;

	      var scrollbarSize = undefined;
	      if (win.innerHeight > doc.documentElement.clientHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (win.innerWidth > doc.documentElement.clientWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = doc.body.scrollHeight - top - height;
	        next.page.right = doc.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this7.cache('target-offsetparent', function () {
	            return getOffsetParent(_this7.target);
	          });
	          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;

	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }

	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.

	      this.move(next);

	      this.history.unshift(next);

	      if (this.history.length > 3) {
	        this.history.pop();
	      }

	      if (flushChanges) {
	        flush();
	      }

	      return true;
	    }

	    // THE ISSUE
	  }, {
	    key: 'move',
	    value: function move(pos) {
	      var _this8 = this;

	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }

	      var same = {};

	      for (var type in pos) {
	        same[type] = {};

	        for (var key in pos[type]) {
	          var found = false;

	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }

	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }

	      var css = { top: '', left: '', right: '', bottom: '' };

	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }

	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }

	          if (window.matchMedia) {
	            // HubSpot/tether#207
	            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
	            if (!retina) {
	              xPos = Math.round(xPos);
	              yPos = Math.round(yPos);
	            }
	          }

	          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }

	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };

	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this8.cache('target-offsetparent', function () {
	            return getOffsetParent(_this8.target);
	          });

	          if (getOffsetParent(_this8.element) !== offsetParent) {
	            defer(function () {
	              _this8.element.parentNode.removeChild(_this8.element);
	              offsetParent.appendChild(_this8.element);
	            });
	          }

	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }

	      if (!moved) {
	        if (this.options.bodyElement) {
	          this.options.bodyElement.appendChild(this.element);
	        } else {
	          var offsetParentIsBody = true;
	          var currentNode = this.element.parentNode;
	          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
	            if (getComputedStyle(currentNode).position !== 'static') {
	              offsetParentIsBody = false;
	              break;
	            }

	            currentNode = currentNode.parentNode;
	          }

	          if (!offsetParentIsBody) {
	            this.element.parentNode.removeChild(this.element);
	            this.element.ownerDocument.body.appendChild(this.element);
	          }
	        }
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this8.element.style, writeCSS);
	          _this8.trigger('repositioned');
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})(Evented);

	TetherClass.modules = [];

	TetherBase.position = position;

	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParents[0];
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var node = to;
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

	      // Account any parent Frames scroll offset
	      if (node.ownerDocument !== document) {
	        var win = node.ownerDocument.defaultView;
	        to[0] += win.pageXOffset;
	        to[1] += win.pageYOffset;
	        to[2] += win.pageXOffset;
	        to[3] += win.pageYOffset;
	      }

	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }

	  return to;
	}

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;

	    if (!this.options.constraints) {
	      return true;
	    }

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;

	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }

	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });

	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;

	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;

	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });

	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });

	    var addClasses = [];

	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);

	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;

	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }

	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');

	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }

	      var bounds = getBoundingRect(_this, to);

	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }

	      if (changeAttachY === 'together') {
	        if (tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom' && top < bounds[1]) {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
	            top -= height - targetHeight;
	            tAttachment.top = 'bottom';

	            eAttachment.top = 'bottom';
	          }
	        }

	        if (tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top' && top + height > bounds[3]) {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
	            top += height - targetHeight;
	            tAttachment.top = 'top';

	            eAttachment.top = 'top';
	          }
	        }

	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }

	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }

	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }

	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }

	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }

	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }

	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0]) {
	          if (eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'center') {
	            left += width / 2;
	            eAttachment.left = 'left';
	          }
	        }

	        if (left + width > bounds[2]) {
	          if (eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'center') {
	            left -= width / 2;
	            eAttachment.left = 'right';
	          }
	        }
	      }

	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }

	      pin = pin || [];

	      var pinned = [];
	      var oob = [];

	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }

	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }

	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }

	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }

	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }

	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }

	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }

	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }

	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }

	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	        _this.trigger('update', {
	          attachment: eAttachment,
	          targetAttachment: tAttachment
	        });
	      }
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    var targetPos = this.getTargetBounds();

	    var bottom = top + height;
	    var right = left + width;

	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }

	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }

	    var allClasses = [];
	    var addClasses = [];

	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }

	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return true;
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (!this.options.shift) {
	      return;
	    }

	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }

	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];

	      var _shift = shift;

	      var _shift2 = _slicedToArray(_shift, 2);

	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];

	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }

	    top += shiftTop;
	    left += shiftLeft;

	    return { top: top, left: left };
	  }
	});
	return Tether;

	}));


/***/ }
/******/ ]);