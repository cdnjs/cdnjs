(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, (function() {
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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(99);


/***/ },

/***/ 1:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    mdTheme: String
	  },
	  data: function data() {
	    return {
	      closestThemedParent: false
	    };
	  },
	  methods: {
	    getClosestThemedParent: function getClosestThemedParent($parent) {
	      if (!$parent || !$parent.$el || $parent._uid === 0) {
	        return false;
	      }

	      if ($parent.mdTheme || $parent.mdName) {
	        return $parent;
	      }

	      return this.getClosestThemedParent($parent.$parent);
	    }
	  },
	  computed: {
	    themeClass: function themeClass() {
	      if (this.mdTheme) {
	        return 'md-theme-' + this.mdTheme;
	      }

	      var theme = this.closestThemedParent.mdTheme;

	      if (!theme) {
	        if (this.closestThemedParent) {
	          theme = this.closestThemedParent.mdName;
	        } else {
	          theme = this.$material.currentTheme;
	        }
	      }

	      return 'md-theme-' + theme;
	    }
	  },
	  mounted: function mounted() {
	    this.closestThemedParent = this.getClosestThemedParent(this.$parent);

	    if (!this.$material.currentTheme) {
	      this.$material.setCurrentTheme('default');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 2:
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(11)((function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	}));

/***/ },

/***/ 5:
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(10)
	  , IE8_DOM_DEFINE = __webpack_require__(29)
	  , toPrimitive    = __webpack_require__(28)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

/***/ 7:
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(6)
	  , createDesc = __webpack_require__(14);
	module.exports = __webpack_require__(4) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ 9:
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(35)
	  , defined = __webpack_require__(15);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },

/***/ 13:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getClosestVueParent = function getClosestVueParent($parent, cssClass) {
	  if (!$parent || !$parent.$el) {
	    return false;
	  }

	  if ($parent._uid === 0) {
	    return false;
	  }

	  if ($parent.$el.classList.contains(cssClass)) {
	    return $parent;
	  }

	  return getClosestVueParent($parent.$parent, cssClass);
	};

	exports.default = getClosestVueParent;
	module.exports = exports["default"];

/***/ },

/***/ 14:
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

/***/ 15:
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },

/***/ 16:
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(2)
	  , core      = __webpack_require__(5)
	  , ctx       = __webpack_require__(26)
	  , hide      = __webpack_require__(8)
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

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(24)('keys')
	  , uid    = __webpack_require__(19);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },

/***/ 19:
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(33)
	  , enumBugKeys = __webpack_require__(23);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9)
	  , document = __webpack_require__(2).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },

/***/ 23:
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },

/***/ 25:
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(32);
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

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(15);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(9);
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

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(4) && !__webpack_require__(11)((function(){
	  return Object.defineProperty(__webpack_require__(22)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	}));

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(16)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },

/***/ 32:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(7)
	  , toIObject    = __webpack_require__(12)
	  , arrayIndexOf = __webpack_require__(34)(false)
	  , IE_PROTO     = __webpack_require__(18)('IE_PROTO');

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

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(12)
	  , toLength  = __webpack_require__(30)
	  , toIndex   = __webpack_require__(37);
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

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(25);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(16)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },

/***/ 43:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var uniqueId = function uniqueId() {
	  return Math.random().toString(36).slice(4);
	};

	exports.default = uniqueId;
	module.exports = exports["default"];

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	module.exports = __webpack_require__(5).Object.keys;

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(17)
	  , core    = __webpack_require__(5)
	  , fails   = __webpack_require__(11);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails((function(){ fn(1); })), 'Object', exp);
	};

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(27)
	  , $keys    = __webpack_require__(21);

	__webpack_require__(60)('keys', (function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	}));

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdTabs = __webpack_require__(306);

	var _mdTabs2 = _interopRequireDefault(_mdTabs);

	var _mdTab = __webpack_require__(305);

	var _mdTab2 = _interopRequireDefault(_mdTab);

	var _mdTabs3 = __webpack_require__(245);

	var _mdTabs4 = _interopRequireDefault(_mdTabs3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-tabs', Vue.extend(_mdTabs2.default));
	  Vue.component('md-tab', Vue.extend(_mdTab2.default));

	  Vue.material.styles.push(_mdTabs4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 109:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var debounce = function debounce(callback, limit) {
	  var wait = false;

	  return function () {
	    if (!wait) {
	      callback.call();
	      wait = true;

	      window.setTimeout((function () {
	        wait = false;
	      }), limit);
	    }
	  };
	};

	exports.default = debounce;
	module.exports = exports["default"];

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _uniqueId = __webpack_require__(43);

	var _uniqueId2 = _interopRequireDefault(_uniqueId);

	var _getClosestVueParent = __webpack_require__(13);

	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: {
	    id: [String, Number],
	    mdLabel: [String, Number],
	    mdIcon: String,
	    mdActive: Boolean,
	    mdDisabled: Boolean,
	    mdTooltip: String,
	    mdTooltipDelay: {
	      type: String,
	      default: '0'
	    },
	    mdTooltipDirection: {
	      type: String,
	      default: 'bottom'
	    }
	  },
	  data: function data() {
	    return {
	      mounted: false,
	      tabId: this.id || 'tab-' + (0, _uniqueId2.default)(),
	      width: '0px',
	      left: '0px'
	    };
	  },

	  watch: {
	    mdActive: function mdActive() {
	      this.updateTabData();
	    },
	    mdDisabled: function mdDisabled() {
	      this.updateTabData();
	    },
	    mdIcon: function mdIcon() {
	      this.updateTabData();
	    },
	    mdLabel: function mdLabel() {
	      this.updateTabData();
	    },
	    mdTooltip: function mdTooltip() {
	      this.updateTabData();
	    },
	    mdTooltipDelay: function mdTooltipDelay() {
	      this.updateTabData();
	    },
	    mdTooltipDirection: function mdTooltipDirection() {
	      this.updateTabData();
	    }
	  },
	  computed: {
	    styles: function styles() {
	      return {
	        width: this.width,
	        left: this.left
	      };
	    }
	  },
	  methods: {
	    getTabData: function getTabData() {
	      return {
	        id: this.tabId,
	        label: this.mdLabel,
	        icon: this.mdIcon,
	        active: this.mdActive,
	        disabled: this.mdDisabled,
	        tooltip: this.mdTooltip,
	        tooltipDelay: this.mdTooltipDelay,
	        tooltipDirection: this.mdTooltipDirection,
	        ref: this
	      };
	    },
	    updateTabData: function updateTabData() {
	      this.parentTabs.updateTab(this.getTabData());
	    }
	  },
	  mounted: function mounted() {
	    var tabData = this.getTabData();

	    this.parentTabs = (0, _getClosestVueParent2.default)(this.$parent, 'md-tabs');

	    if (!this.parentTabs) {
	      throw new Error('You must wrap the md-tab in a md-tabs');
	    }

	    this.mounted = true;
	    this.parentTabs.updateTab(tabData);

	    if (this.mdActive) {
	      this.parentTabs.setActiveTab(tabData);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.parentTabs.unregisterTab(this.getTabData());
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(44);

	var _keys2 = _interopRequireDefault(_keys);

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _throttle = __webpack_require__(109);

	var _throttle2 = _interopRequireDefault(_throttle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: {
	    mdFixed: Boolean,
	    mdCentered: Boolean,
	    mdRight: Boolean,
	    mdDynamicHeight: {
	      type: Boolean,
	      default: true
	    },
	    mdElevation: {
	      type: [String, Number],
	      default: 0
	    }
	  },
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      tabList: {},
	      activeTab: null,
	      activeTabNumber: 0,
	      hasIcons: false,
	      hasLabel: false,
	      transitionControl: null,
	      transitionOff: false,
	      contentHeight: '0px',
	      contentWidth: '0px'
	    };
	  },
	  computed: {
	    tabClasses: function tabClasses() {
	      return {
	        'md-dynamic-height': this.mdDynamicHeight,
	        'md-transition-off': this.transitionOff
	      };
	    },
	    navigationClasses: function navigationClasses() {
	      return {
	        'md-has-icon': this.hasIcons,
	        'md-has-label': this.hasLabel,
	        'md-fixed': this.mdFixed,
	        'md-right': !this.mdCentered && this.mdRight,
	        'md-centered': this.mdCentered || this.mdFixed
	      };
	    },
	    indicatorClasses: function indicatorClasses() {
	      var toLeft = this.lastIndicatorNumber > this.activeTabNumber;

	      this.lastIndicatorNumber = this.activeTabNumber;

	      return {
	        'md-transition-off': this.transitionOff,
	        'md-to-right': !toLeft,
	        'md-to-left': toLeft
	      };
	    }
	  },
	  methods: {
	    getHeaderClass: function getHeaderClass(header) {
	      return {
	        'md-active': this.activeTab === header.id,
	        'md-disabled': header.disabled
	      };
	    },
	    registerTab: function registerTab(tabData) {
	      this.tabList[tabData.id] = tabData;
	    },
	    unregisterTab: function unregisterTab(tabData) {
	      delete this.tabList[tabData.id];
	    },
	    updateTab: function updateTab(tabData) {
	      this.registerTab(tabData);

	      if (tabData.active) {
	        if (!tabData.disabled) {
	          this.setActiveTab(tabData);
	        } else if ((0, _keys2.default)(this.tabList).length) {
	          var tabsIds = (0, _keys2.default)(this.tabList);
	          var targetIndex = tabsIds.indexOf(tabData.id) + 1;
	          var target = tabsIds[targetIndex];

	          if (target) {
	            this.setActiveTab(this.tabList[target]);
	          } else {
	            this.setActiveTab(this.tabList[0]);
	          }
	        }
	      }
	    },
	    observeElementChanges: function observeElementChanges() {
	      this.parentObserver = new MutationObserver((0, _throttle2.default)(this.calculateOnWatch, 50));
	      this.parentObserver.observe(this.$refs.tabContent, {
	        childList: true,
	        attributes: true,
	        subtree: true
	      });
	    },
	    getTabIndex: function getTabIndex(id) {
	      var idList = (0, _keys2.default)(this.tabList);

	      return idList.indexOf(id);
	    },
	    calculateIndicatorPos: function calculateIndicatorPos() {
	      if (this.$refs.tabHeader && this.$refs.tabHeader[this.activeTabNumber]) {
	        var tabsWidth = this.$el.offsetWidth;
	        var activeTab = this.$refs.tabHeader[this.activeTabNumber];
	        var left = activeTab.offsetLeft;
	        var right = tabsWidth - left - activeTab.offsetWidth;

	        this.$refs.indicator.style.left = left + 'px';
	        this.$refs.indicator.style.right = right + 'px';
	      }
	    },
	    calculateTabsWidthAndPosition: function calculateTabsWidthAndPosition() {
	      var width = this.$el.offsetWidth;
	      var index = 0;

	      this.contentWidth = width * this.activeTabNumber + 'px';

	      for (var tabId in this.tabList) {
	        var tab = this.tabList[tabId];

	        tab.ref.width = width + 'px';
	        tab.ref.left = width * index + 'px';
	        index++;
	      }
	    },
	    calculateContentHeight: function calculateContentHeight() {
	      var _this = this;

	      this.$nextTick((function () {
	        if ((0, _keys2.default)(_this.tabList).length) {
	          var height = _this.tabList[_this.activeTab].ref.$el.offsetHeight;

	          _this.contentHeight = height + 'px';
	        }
	      }));
	    },
	    calculatePosition: function calculatePosition() {
	      var _this2 = this;

	      window.requestAnimationFrame((function () {
	        _this2.calculateIndicatorPos();
	        _this2.calculateTabsWidthAndPosition();
	        _this2.calculateContentHeight();
	      }));
	    },
	    debounceTransition: function debounceTransition() {
	      var _this3 = this;

	      window.clearTimeout(this.transitionControl);
	      this.transitionControl = window.setTimeout((function () {
	        _this3.calculatePosition();
	        _this3.transitionOff = false;
	      }), 200);
	    },
	    calculateOnWatch: function calculateOnWatch() {
	      this.calculatePosition();
	      this.debounceTransition();
	    },
	    calculateOnResize: function calculateOnResize() {
	      this.transitionOff = true;
	      this.calculateOnWatch();
	    },
	    setActiveTab: function setActiveTab(tabData) {
	      this.hasIcons = !!tabData.icon;
	      this.hasLabel = !!tabData.label;
	      this.activeTab = tabData.id;
	      this.activeTabNumber = this.getTabIndex(this.activeTab);
	      this.calculatePosition();
	      this.$emit('change', this.activeTabNumber);
	    }
	  },
	  mounted: function mounted() {
	    var _this4 = this;

	    this.$nextTick((function () {
	      _this4.observeElementChanges();
	      window.addEventListener('resize', _this4.calculateOnResize);

	      if ((0, _keys2.default)(_this4.tabList).length && !_this4.activeTab) {
	        var firstTab = (0, _keys2.default)(_this4.tabList)[0];

	        _this4.setActiveTab(_this4.tabList[firstTab]);
	      }
	    }));
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.parentObserver) {
	      this.parentObserver.disconnect();
	    }

	    window.removeEventListener('resize', this.calculateOnResize);
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 217:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 245:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-tabs > .md-tabs-navigation {\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header {\n    color: PRIMARY-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header:focus {\n      color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: PRIMARY-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-indicator {\n    background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation {\n  background-color: transparent;\n  border-bottom: 1px solid BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header {\n    color: BACKGROUND-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header:focus {\n      color: PRIMARY-COLOR; }\n    .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: BACKGROUND-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-indicator {\n    background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-tabs.md-accent > .md-tabs-navigation {\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header {\n    color: ACCENT-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header:focus {\n      color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: ACCENT-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-indicator {\n    background-color: BACKGROUND-COLOR; }\n\n.THEME_NAME.md-tabs.md-warn > .md-tabs-navigation {\n  background-color: WARN-COLOR; }\n  .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header {\n    color: WARN-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header:focus {\n      color: WARN-CONTRAST; }\n    .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: WARN-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-indicator {\n    background-color: BACKGROUND-COLOR; }\n"

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(159)

	/* template */
	var __vue_template__ = __webpack_require__(355)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTabs/mdTab.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8aa44a94", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-8aa44a94", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTab.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(217)

	/* script */
	__vue_exports__ = __webpack_require__(160)

	/* template */
	var __vue_template__ = __webpack_require__(363)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTabs/mdTabs.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-c28dc5a6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-c28dc5a6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTabs.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 355:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-tab",
	    style: (_vm.styles),
	    attrs: {
	      "id": _vm.tabId
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8aa44a94", module.exports)
	  }
	}

/***/ },

/***/ 363:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-tabs",
	    class: [_vm.themeClass, _vm.tabClasses]
	  }, [_c('md-whiteframe', {
	    ref: "tabNavigation",
	    staticClass: "md-tabs-navigation",
	    class: _vm.navigationClasses,
	    attrs: {
	      "md-tag": "nav",
	      "md-elevation": _vm.mdElevation
	    }
	  }, [_vm._l((_vm.tabList), (function(header) {
	    return _c('button', {
	      key: header.id,
	      ref: "tabHeader",
	      refInFor: true,
	      staticClass: "md-tab-header",
	      class: _vm.getHeaderClass(header),
	      attrs: {
	        "type": "button",
	        "disabled": header.disabled
	      },
	      on: {
	        "click": function($event) {
	          _vm.setActiveTab(header)
	        }
	      }
	    }, [_c('md-ink-ripple', {
	      attrs: {
	        "md-disabled": header.disabled
	      }
	    }), _vm._v(" "), _c('div', {
	      staticClass: "md-tab-header-container"
	    }, [(header.icon) ? _c('md-icon', [_vm._v(_vm._s(header.icon))]) : _vm._e(), _vm._v(" "), (header.label) ? _c('span', [_vm._v(_vm._s(header.label))]) : _vm._e(), _vm._v(" "), (header.tooltip) ? _c('md-tooltip', {
	      attrs: {
	        "md-direction": header.tooltipDirection,
	        "md-delay": header.tooltipDelay
	      }
	    }, [_vm._v(_vm._s(header.tooltip))]) : _vm._e()], 1)], 1)
	  })), _vm._v(" "), _c('span', {
	    ref: "indicator",
	    staticClass: "md-tab-indicator",
	    class: _vm.indicatorClasses
	  })], 2), _vm._v(" "), _c('div', {
	    ref: "tabContent",
	    staticClass: "md-tabs-content",
	    style: ({
	      height: _vm.contentHeight
	    })
	  }, [_c('div', {
	    staticClass: "md-tabs-wrapper",
	    style: ({
	      transform: ("translate3D(-" + _vm.contentWidth + ", 0, 0)")
	    })
	  }, [_vm._t("default")], 2)])], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-c28dc5a6", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;