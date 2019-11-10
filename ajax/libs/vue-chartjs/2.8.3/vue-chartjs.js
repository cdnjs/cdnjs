/*!
 * vue-chartjs v2.8.3
 * (c) 2017 Jakub Juszczak <jakub@posteo.de>
 * http://vue-chartjs.org
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("chart.js"));
	else if(typeof define === 'function' && define.amd)
		define("VueChartJs", ["vue", "chart.js"], factory);
	else if(typeof exports === 'object')
		exports["VueChartJs"] = factory(require("vue"), require("chart.js"));
	else
		root["VueChartJs"] = factory(root["vue"], root["chart.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mixins = exports.Scatter = exports.Bubble = exports.Radar = exports.PolarArea = exports.Pie = exports.Line = exports.Doughnut = exports.HorizontalBar = exports.Bar = exports.VueCharts = undefined;

	var _Bar = __webpack_require__(1);

	var _Bar2 = _interopRequireDefault(_Bar);

	var _HorizontalBar = __webpack_require__(43);

	var _HorizontalBar2 = _interopRequireDefault(_HorizontalBar);

	var _Doughnut = __webpack_require__(44);

	var _Doughnut2 = _interopRequireDefault(_Doughnut);

	var _Line = __webpack_require__(45);

	var _Line2 = _interopRequireDefault(_Line);

	var _Pie = __webpack_require__(46);

	var _Pie2 = _interopRequireDefault(_Pie);

	var _PolarArea = __webpack_require__(47);

	var _PolarArea2 = _interopRequireDefault(_PolarArea);

	var _Radar = __webpack_require__(48);

	var _Radar2 = _interopRequireDefault(_Radar);

	var _Bubble = __webpack_require__(49);

	var _Bubble2 = _interopRequireDefault(_Bubble);

	var _Scatter = __webpack_require__(50);

	var _Scatter2 = _interopRequireDefault(_Scatter);

	var _index = __webpack_require__(51);

	var _index2 = _interopRequireDefault(_index);

	var _package = __webpack_require__(60);

	var _package2 = _interopRequireDefault(_package);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var VueCharts = {
	  version: _package2.default.version,
	  Bar: _Bar2.default,
	  HorizontalBar: _HorizontalBar2.default,
	  Doughnut: _Doughnut2.default,
	  Line: _Line2.default,
	  Pie: _Pie2.default,
	  PolarArea: _PolarArea2.default,
	  Radar: _Radar2.default,
	  Bubble: _Bubble2.default,
	  Scatter: _Scatter2.default,
	  mixins: _index2.default
	};

	exports.default = VueCharts;
	exports.VueCharts = VueCharts;
	exports.Bar = _Bar2.default;
	exports.HorizontalBar = _HorizontalBar2.default;
	exports.Doughnut = _Doughnut2.default;
	exports.Line = _Line2.default;
	exports.Pie = _Pie2.default;
	exports.PolarArea = _PolarArea2.default;
	exports.Radar = _Radar2.default;
	exports.Bubble = _Bubble2.default;
	exports.Scatter = _Scatter2.default;
	exports.mixins = _index2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },
	  props: {
	    chartId: {
	      default: 'bar-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },
	  data: function data() {
	    return {
	      defaultOptions: {
	        scales: {
	          yAxes: [{
	            ticks: {
	              beginAtZero: true
	            },
	            gridLines: {
	              display: false
	            }
	          }],
	          xAxes: [{
	            gridLines: {
	              display: false
	            },
	            categoryPercentage: 0.5,
	            barPercentage: 0.2
	          }]
	        }
	      },
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);
	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'bar',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.mergeOptions = mergeOptions;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mergeOptions(obj, src) {
	  var mutableObj = (0, _extends3.default)({}, obj);
	  return (0, _extends3.default)(mutableObj, src);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(6);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	module.exports = __webpack_require__(11).Object.assign;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(9);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(24)});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(10)
	  , core      = __webpack_require__(11)
	  , ctx       = __webpack_require__(12)
	  , hide      = __webpack_require__(14)
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
/* 10 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(13);
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
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(15)
	  , createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(19) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(16)
	  , IE8_DOM_DEFINE = __webpack_require__(18)
	  , toPrimitive    = __webpack_require__(22)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(19) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(19) && !__webpack_require__(20)(function(){
	  return Object.defineProperty(__webpack_require__(21)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(20)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17)
	  , document = __webpack_require__(10).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(17);
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(25)
	  , gOPS     = __webpack_require__(40)
	  , pIE      = __webpack_require__(41)
	  , toObject = __webpack_require__(42)
	  , IObject  = __webpack_require__(29)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(20)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(26)
	  , enumBugKeys = __webpack_require__(39);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(27)
	  , toIObject    = __webpack_require__(28)
	  , arrayIndexOf = __webpack_require__(32)(false)
	  , IE_PROTO     = __webpack_require__(36)('IE_PROTO');

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
/* 27 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(29)
	  , defined = __webpack_require__(31);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(30);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(28)
	  , toLength  = __webpack_require__(33)
	  , toIndex   = __webpack_require__(35);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(34)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(34)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(37)('keys')
	  , uid    = __webpack_require__(38);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 40 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 41 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(31);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },

	  props: {
	    chartId: {
	      default: 'horizontalbar-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },

	  data: function data() {
	    return {
	      defaultOptions: {
	        scales: {
	          yAxes: [{
	            ticks: {
	              beginAtZero: true
	            },
	            gridLines: {
	              display: false
	            }
	          }],
	          xAxes: [{
	            gridLines: {
	              display: false
	            },
	            categoryPercentage: 0.5,
	            barPercentage: 0.2
	          }]
	        }
	      },
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options, type) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);
	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'horizontalBar',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },

	  props: {
	    chartId: {
	      default: 'doughnut-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },

	  data: function data() {
	    return {
	      defaultOptions: {},
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);

	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'doughnut',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },

	  props: {
	    chartId: {
	      default: 'line-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },

	  data: function data() {
	    return {
	      defaultOptions: {
	        scales: {
	          yAxes: [{
	            ticks: {
	              beginAtZero: true
	            },
	            gridLines: {
	              display: false
	            }
	          }],
	          xAxes: [{
	            gridLines: {
	              display: false
	            }
	          }]
	        }
	      },
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);

	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'line',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },

	  props: {
	    chartId: {
	      default: 'pie-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },

	  data: function data() {
	    return {
	      defaultOptions: {},
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);

	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'pie',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },

	  props: {
	    chartId: {
	      default: 'polar-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },

	  data: function data() {
	    return {
	      defaultOptions: {},
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);

	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'polarArea',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },

	  props: {
	    chartId: {
	      default: 'radar-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },

	  data: function data() {
	    return {
	      defaultOptions: {},
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);

	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'radar',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },

	  props: {
	    chartId: {
	      default: 'bubble-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },

	  data: function data() {
	    return {
	      defaultOptions: {
	        scales: {
	          yAxes: [{
	            ticks: {
	              beginAtZero: true
	            },
	            gridLines: {
	              display: false
	            }
	          }],
	          xAxes: [{
	            gridLines: {
	              display: false
	            },
	            categoryPercentage: 0.5,
	            barPercentage: 0.2
	          }]
	        }
	      },
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);

	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'bubble',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _chart = __webpack_require__(3);

	var _chart2 = _interopRequireDefault(_chart);

	var _options = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vue2.default.extend({
	  render: function render(createElement) {
	    return createElement('div', {
	      style: this.styles,
	      class: this.cssClasses
	    }, [createElement('canvas', {
	      attrs: {
	        id: this.chartId,
	        width: this.width,
	        height: this.height
	      },
	      ref: 'canvas'
	    })]);
	  },

	  props: {
	    chartId: {
	      default: 'scatter-chart',
	      type: String
	    },
	    width: {
	      default: 400,
	      type: Number
	    },
	    height: {
	      default: 400,
	      type: Number
	    },
	    cssClasses: {
	      type: String,
	      default: ''
	    },
	    styles: {
	      type: Object
	    }
	  },

	  data: function data() {
	    return {
	      defaultOptions: {
	        scales: {
	          xAxes: [{
	            type: 'linear',
	            position: 'bottom'
	          }]
	        }
	      },
	      plugins: []
	    };
	  },


	  methods: {
	    addPlugin: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    },
	    renderChart: function renderChart(data, options) {
	      var chartOptions = (0, _options.mergeOptions)(this.defaultOptions, options);

	      this._chart = new _chart2.default(this.$refs.canvas.getContext('2d'), {
	        type: 'scatter',
	        data: data,
	        options: chartOptions,
	        plugins: this.plugins
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._chart) {
	      this._chart.destroy();
	    }
	  }
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactiveData = __webpack_require__(52);

	var _reactiveData2 = _interopRequireDefault(_reactiveData);

	var _reactiveProp = __webpack_require__(59);

	var _reactiveProp2 = _interopRequireDefault(_reactiveProp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  reactiveData: _reactiveData2.default,
	  reactiveProp: _reactiveProp2.default
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(53);

	var _keys2 = _interopRequireDefault(_keys);

	var _stringify = __webpack_require__(57);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  data: function data() {
	    return {
	      chartData: null
	    };
	  },

	  watch: {
	    'chartData': {
	      handler: function handler(newData, oldData) {
	        if (oldData) {
	          var chart = this._chart;

	          var newDatasetLabels = newData.datasets.map(function (dataset) {
	            return dataset.label;
	          });

	          var oldDatasetLabels = oldData.datasets.map(function (dataset) {
	            return dataset.label;
	          });

	          var oldLabels = (0, _stringify2.default)(oldDatasetLabels);
	          var newLabels = (0, _stringify2.default)(newDatasetLabels);

	          if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
	            newData.datasets.forEach(function (dataset, i) {
	              var oldDatasetKeys = (0, _keys2.default)(oldData.datasets[i]);
	              var newDatasetKeys = (0, _keys2.default)(dataset);

	              var deletionKeys = oldDatasetKeys.filter(function (key) {
	                return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
	              });

	              deletionKeys.forEach(function (deletionKey) {
	                delete chart.data.datasets[i][deletionKey];
	              });

	              for (var attribute in dataset) {
	                if (dataset.hasOwnProperty(attribute)) {
	                  chart.data.datasets[i][attribute] = dataset[attribute];
	                }
	              }
	            });

	            if (newData.hasOwnProperty('labels')) {
	              chart.data.labels = newData.labels;
	            }
	            if (newData.hasOwnProperty('xLabels')) {
	              chart.data.xLabels = newData.xLabels;
	            }
	            if (newData.hasOwnProperty('yLabels')) {
	              chart.data.yLabels = newData.yLabels;
	            }
	            chart.update();
	          } else {
	            chart.destroy();
	            this.renderChart(this.chartData, this.options);
	          }
	        } else {
	          this.renderChart(this.chartData, this.options);
	        }
	      }
	    }
	  }
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	module.exports = __webpack_require__(11).Object.keys;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(42)
	  , $keys    = __webpack_require__(25);

	__webpack_require__(56)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(9)
	  , core    = __webpack_require__(11)
	  , fails   = __webpack_require__(20);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(11)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(53);

	var _keys2 = _interopRequireDefault(_keys);

	var _stringify = __webpack_require__(57);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  props: {
	    chartData: {
	      required: true
	    }
	  },
	  watch: {
	    'chartData': {
	      handler: function handler(newData, oldData) {
	        if (oldData) {
	          var chart = this._chart;

	          var newDatasetLabels = newData.datasets.map(function (dataset) {
	            return dataset.label;
	          });

	          var oldDatasetLabels = oldData.datasets.map(function (dataset) {
	            return dataset.label;
	          });

	          var oldLabels = (0, _stringify2.default)(oldDatasetLabels);
	          var newLabels = (0, _stringify2.default)(newDatasetLabels);

	          if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
	            newData.datasets.forEach(function (dataset, i) {
	              var oldDatasetKeys = (0, _keys2.default)(oldData.datasets[i]);
	              var newDatasetKeys = (0, _keys2.default)(dataset);

	              var deletionKeys = oldDatasetKeys.filter(function (key) {
	                return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
	              });

	              deletionKeys.forEach(function (deletionKey) {
	                delete chart.data.datasets[i][deletionKey];
	              });

	              for (var attribute in dataset) {
	                if (dataset.hasOwnProperty(attribute)) {
	                  chart.data.datasets[i][attribute] = dataset[attribute];
	                }
	              }
	            });

	            if (newData.hasOwnProperty('labels')) {
	              chart.data.labels = newData.labels;
	            }
	            if (newData.hasOwnProperty('xLabels')) {
	              chart.data.xLabels = newData.xLabels;
	            }
	            if (newData.hasOwnProperty('yLabels')) {
	              chart.data.yLabels = newData.yLabels;
	            }
	            chart.update();
	          } else {
	            chart.destroy();
	            this.renderChart(this.chartData, this.options);
	          }
	        } else {
	          this.renderChart(this.chartData, this.options);
	        }
	      }
	    }
	  }
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = {
		"name": "vue-chartjs",
		"version": "2.8.3",
		"description": "vue.js wrapper for chart.js",
		"author": "Jakub Juszczak <jakub@posteo.de>",
		"homepage": "http://vue-chartjs.org",
		"license": "MIT",
		"contributors": [
			{
				"name": "Thorsten Lünborg",
				"web": "https://github.com/LinusBorg"
			},
			{
				"name": "Juan Carlos Alonso",
				"web": "https://github.com/jcalonso"
			}
		],
		"maintainers": [
			{
				"name": "Jakub Juszczak",
				"email": "jakub@posteo.de",
				"web": "http://www.jakubjuszczak.de"
			}
		],
		"repository": {
			"type": "git",
			"url": "git+ssh://git@github.com:apertureless/vue-chartjs.git"
		},
		"bugs": {
			"url": "https://github.com/apertureless/vue-chartjs/issues"
		},
		"keywords": [
			"ChartJs",
			"Vue",
			"Visualisation",
			"Wrapper",
			"Charts"
		],
		"main": "dist/vue-chartjs.js",
		"unpkg": "dist/vue-chartjs.full.min.js",
		"module": "es/index.js",
		"jsnext:main": "es/index.js",
		"files": [
			"src",
			"dist",
			"es"
		],
		"scripts": {
			"dev": "node build/dev-server.js",
			"build": "yarn run release && yarn run build:es",
			"build:es": "cross-env BABEL_ENV=es babel src --out-dir es",
			"unit": "karma start test/unit/karma.conf.js --single-run",
			"e2e": "node test/e2e/runner.js",
			"test": "npm run unit",
			"lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs",
			"release": "webpack --progress --hide-modules --config  ./build/webpack.release.js && NODE_ENV=production webpack --progress --hide-modules --config  ./build/webpack.release.min.js && webpack --progress --hide-modules --config  ./build/webpack.release.full.js && NODE_ENV=production webpack --progress --hide-modules --config  ./build/webpack.release.full.min.js",
			"prepublish": "yarn run lint && yarn run test && yarn run build"
		},
		"dependencies": {},
		"peerDependencies": {
			"chart.js": "^2.6.0",
			"vue": "^2.4.2"
		},
		"devDependencies": {
			"babel-cli": "^6.24.1",
			"babel-core": "^6.25.0",
			"babel-loader": "^7.0.0",
			"babel-plugin-transform-object-assign": "^6.22.0",
			"babel-plugin-transform-runtime": "^6.23.0",
			"babel-preset-es2015": "^6.24.1",
			"babel-preset-stage-2": "^6.24.1",
			"babel-runtime": "^6.23.0",
			"chai": "^3.5.0",
			"chart.js": "^2.6.0",
			"chromedriver": "^2.28.0",
			"connect-history-api-fallback": "^1.1.0",
			"cross-env": "^3.2.4",
			"cross-spawn": "^5.1.0",
			"css-loader": "^0.28.0",
			"eslint": "^3.19.0",
			"eslint-config-standard": "^10.2.1",
			"eslint-friendly-formatter": "^2.0.7",
			"eslint-loader": "^1.7.1",
			"eslint-plugin-html": "^2.0.1",
			"eslint-plugin-import": "^2.2.0",
			"eslint-plugin-node": "^4.2.2",
			"eslint-plugin-promise": "^3.5.0",
			"eslint-plugin-standard": "^3.0.1",
			"eventsource-polyfill": "^0.9.6",
			"express": "^4.15.2",
			"extract-text-webpack-plugin": "^1.0.1",
			"file-loader": "^0.10.1",
			"function-bind": "^1.0.2",
			"html-webpack-plugin": "^2.28.0",
			"http-proxy-middleware": "^0.17.4",
			"inject-loader": "^3.0.0",
			"isparta-loader": "^2.0.0",
			"jasmine-core": "^2.5.2",
			"json-loader": "^0.5.4",
			"karma": "^1.5.0",
			"karma-coverage": "^1.1.1",
			"karma-jasmine": "^1.0.2",
			"karma-mocha": "^1.2.0",
			"karma-phantomjs-launcher": "^1.0.4",
			"karma-sinon-chai": "^1.2.0",
			"karma-sourcemap-loader": "^0.3.7",
			"karma-spec-reporter": "0.0.30",
			"karma-webpack": "1.8.1",
			"lolex": "^1.6.0",
			"mocha": "^3.1.0",
			"nightwatch": "^0.9.14",
			"ora": "^1.2.0",
			"phantomjs-prebuilt": "^2.1.13",
			"selenium-server": "^3.3.1",
			"shelljs": "^0.7.7",
			"sinon": "^2.1.0",
			"sinon-chai": "^2.9.0",
			"url-loader": "^0.5.8",
			"vue": "^2.4.2",
			"vue-hot-reload-api": "^2.1.0",
			"vue-html-loader": "^1.2.4",
			"vue-loader": "^12.2.2",
			"vue-style-loader": "^3.0.1",
			"vue-template-compiler": "^2.4.2",
			"webpack": "^1.13.2",
			"webpack-dev-middleware": "^1.10.1",
			"webpack-hot-middleware": "^2.17.1",
			"webpack-merge": "1.1.1"
		},
		"engines": {
			"node": ">=6.9.0"
		},
		"babel": {
			"presets": [
				"es2015"
			]
		},
		"browserify": {
			"transform": [
				"babelify"
			]
		},
		"greenkeeper": {
			"ignore": [
				"extract-text-webpack-plugin",
				"karma-webpack",
				"webpack",
				"webpack-merge"
			]
		}
	};

/***/ }
/******/ ])
});
;