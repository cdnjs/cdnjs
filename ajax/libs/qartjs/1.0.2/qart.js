(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["qart"] = factory();
	else
		root["qart"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../dist/";
/******/
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
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(2);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _qrcode = __webpack_require__(21);
	
	var _util = __webpack_require__(75);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var QArt = function () {
	    function QArt(options) {
	        (0, _classCallCheck3.default)(this, QArt);
	
	        if (typeof options === 'undefined') {
	            throw new TypeError('QArt required `options`.');
	        } else if (typeof options.value === 'undefined') {
	            throw new TypeError('QArt required `value` option.');
	        } else if (typeof options.imagePath === 'undefined') {
	            throw new TypeError('QArt required `imagePath` option.');
	        }
	
	        this.filter = typeof options.filter === 'undefined' ? QArt.DEFAULTS.filter : options.filter;
	        this.value = options.value;
	        this.imagePath = options.imagePath;
	    }
	
	    (0, _createClass3.default)(QArt, [{
	        key: 'make',
	        value: function make(el) {
	            var imageSize = 195;
	            var padding = 12;
	
	            var qr = (0, _qrcode.QRCode)(10, 'H');
	            qr.addData(this.value);
	            qr.make();
	            var qrImage = qr.createImgObject(3);
	
	            var self = this;
	            qrImage.onload = function () {
	                var coverImage = new Image();
	                coverImage.src = self.imagePath;
	
	                var resultCanvas = _util2.default.createCanvas(imageSize, qrImage);
	                var qrCanvas = _util2.default.createCanvas(imageSize, qrImage);
	
	                coverImage.onload = function () {
	                    if (coverImage.width < coverImage.height) {
	                        coverImage.height = (imageSize - padding * 2) * (1.0 * coverImage.height / coverImage.width);
	                        coverImage.width = imageSize - padding * 2;
	                    } else {
	                        coverImage.width = (imageSize - padding * 2) * (1.0 * coverImage.width / coverImage.height);
	                        coverImage.height = imageSize - padding * 2;
	                    }
	
	                    var coverCanvas = document.createElement('canvas');
	                    coverCanvas.width = imageSize;
	                    coverCanvas.height = imageSize;
	                    coverCanvas.getContext('2d').drawImage(coverImage, padding, padding, imageSize - padding * 2, imageSize - padding * 2);
	
	                    var coverImageData = coverCanvas.getContext('2d').getImageData(0, 0, imageSize, imageSize);
	                    var coverImageBinary = coverImageData.data;
	                    var resultImageData = resultCanvas.getContext('2d').getImageData(0, 0, imageSize, imageSize);
	                    var resultImageBinary = resultImageData.data;
	
	                    for (var i = 0; i < coverImageBinary.length; i += 4) {
	                        var x = Math.floor(i / 4) % imageSize;
	                        var y = Math.floor(Math.floor(i / 4) / imageSize);
	
	                        if (x % 3 == 1 && y % 3 == 1) {
	                            continue;
	                        }
	                        if (x < 36 && (y < 36 || y >= imageSize - 36)) {
	                            continue;
	                        }
	                        if (x >= imageSize - 36 && y < 36) {
	                            continue;
	                        }
	
	                        if (self.filter == 'threshold') {
	                            var factor = _util2.default.threshold(coverImageBinary[i], coverImageBinary[i + 1], coverImageBinary[i + 2], 127);
	                            resultImageBinary[i] = factor;
	                            resultImageBinary[i + 1] = factor;
	                            resultImageBinary[i + 2] = factor;
	                        } else if (self.filter == 'color') {
	                            resultImageBinary[i] = coverImageBinary[i];
	                            resultImageBinary[i + 1] = coverImageBinary[i + 1];
	                            resultImageBinary[i + 2] = coverImageBinary[i + 2];
	                        }
	                        resultImageBinary[i + 3] = coverImageBinary[i + 3];
	                    }
	
	                    resultCanvas.getContext('2d').putImageData(resultImageData, 0, 0);
	
	                    var patternPostion = _qrcode.QRUtil.getPatternPosition(10);
	                    for (var i = 0; i < patternPostion.length; i += 1) {
	                        for (var j = 0; j < patternPostion.length; j += 1) {
	                            var x = patternPostion[i];
	                            var y = patternPostion[j];
	                            if (!(x == 6 && y == 50 || y == 6 && x == 50 || x == 6 && y == 6)) {
	                                var rectX = 3 * (x - 2) + 12;
	                                var rectY = 3 * (y - 2) + 12;
	                                var rectWidth = 3 * (x + 3) + 12 - rectX;
	                                var rectHeight = 3 * (y + 3) + 12 - rectY;
	
	                                var rectData = qrCanvas.getContext('2d').getImageData(rectX, rectY, rectWidth, rectHeight);
	                                resultCanvas.getContext('2d').putImageData(rectData, rectX, rectY);
	                            }
	                        }
	                    }
	
	                    el.innerHTML = '';
	                    el.appendChild(resultCanvas);
	                };
	            };
	        }
	    }], [{
	        key: 'DEFAULTS',
	        get: function get() {
	            return {
	                value: '',
	                filter: 'threshold'
	            };
	        }
	    }]);
	    return QArt;
	}();
	
	window.QArt = QArt;
	exports.default = window.QArt;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(3);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
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
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
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
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof2 = __webpack_require__(22);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var qrcode = function () {
	  var qrcode = function qrcode(typeNumber, errorCorrectionLevel) {
	
	    var PAD0 = 0xEC;
	    var PAD1 = 0x11;
	
	    var _typeNumber = typeNumber;
	    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
	    var _modules = null;
	    var _moduleCount = 0;
	    var _dataCache = null;
	    var _dataList = new Array();
	
	    var _this = {};
	
	    var makeImpl = function makeImpl(test, maskPattern) {
	
	      _moduleCount = _typeNumber * 4 + 17;
	      _modules = function (moduleCount) {
	        var modules = new Array(moduleCount);
	        for (var row = 0; row < moduleCount; row += 1) {
	          modules[row] = new Array(moduleCount);
	          for (var col = 0; col < moduleCount; col += 1) {
	            modules[row][col] = null;
	          }
	        }
	        return modules;
	      }(_moduleCount);
	
	      setupPositionProbePattern(0, 0);
	      setupPositionProbePattern(_moduleCount - 7, 0);
	      setupPositionProbePattern(0, _moduleCount - 7);
	      setupPositionAdjustPattern();
	      setupTimingPattern();
	      setupTypeInfo(test, maskPattern);
	
	      if (_typeNumber >= 7) {
	        setupTypeNumber(test);
	      }
	
	      if (_dataCache == null) {
	        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
	      }
	
	      mapData(_dataCache, maskPattern);
	    };
	
	    var setupPositionProbePattern = function setupPositionProbePattern(row, col) {
	
	      for (var r = -1; r <= 7; r += 1) {
	
	        if (row + r <= -1 || _moduleCount <= row + r) continue;
	
	        for (var c = -1; c <= 7; c += 1) {
	
	          if (col + c <= -1 || _moduleCount <= col + c) continue;
	
	          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
	            _modules[row + r][col + c] = true;
	          } else {
	            _modules[row + r][col + c] = false;
	          }
	        }
	      }
	    };
	
	    var getBestMaskPattern = function getBestMaskPattern() {
	
	      var minLostPoint = 0;
	      var pattern = 0;
	
	      for (var i = 0; i < 8; i += 1) {
	
	        makeImpl(true, i);
	
	        var lostPoint = QRUtil.getLostPoint(_this);
	
	        if (i == 0 || minLostPoint > lostPoint) {
	          minLostPoint = lostPoint;
	          pattern = i;
	        }
	      }
	
	      return pattern;
	    };
	
	    var setupTimingPattern = function setupTimingPattern() {
	
	      for (var r = 8; r < _moduleCount - 8; r += 1) {
	        if (_modules[r][6] != null) {
	          continue;
	        }
	        _modules[r][6] = r % 2 == 0;
	      }
	
	      for (var c = 8; c < _moduleCount - 8; c += 1) {
	        if (_modules[6][c] != null) {
	          continue;
	        }
	        _modules[6][c] = c % 2 == 0;
	      }
	    };
	
	    var setupPositionAdjustPattern = function setupPositionAdjustPattern() {
	
	      var pos = QRUtil.getPatternPosition(_typeNumber);
	
	      for (var i = 0; i < pos.length; i += 1) {
	
	        for (var j = 0; j < pos.length; j += 1) {
	
	          var row = pos[i];
	          var col = pos[j];
	
	          if (_modules[row][col] != null) {
	            continue;
	          }
	
	          for (var r = -2; r <= 2; r += 1) {
	
	            for (var c = -2; c <= 2; c += 1) {
	
	              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
	                _modules[row + r][col + c] = true;
	              } else {
	                _modules[row + r][col + c] = false;
	              }
	            }
	          }
	        }
	      }
	    };
	
	    var setupTypeNumber = function setupTypeNumber(test) {
	
	      var bits = QRUtil.getBCHTypeNumber(_typeNumber);
	
	      for (var i = 0; i < 18; i += 1) {
	        var mod = !test && (bits >> i & 1) == 1;
	        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
	      }
	
	      for (var i = 0; i < 18; i += 1) {
	        var mod = !test && (bits >> i & 1) == 1;
	        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
	      }
	    };
	
	    var setupTypeInfo = function setupTypeInfo(test, maskPattern) {
	
	      var data = _errorCorrectionLevel << 3 | maskPattern;
	      var bits = QRUtil.getBCHTypeInfo(data);
	
	      for (var i = 0; i < 15; i += 1) {
	
	        var mod = !test && (bits >> i & 1) == 1;
	
	        if (i < 6) {
	          _modules[i][8] = mod;
	        } else if (i < 8) {
	          _modules[i + 1][8] = mod;
	        } else {
	          _modules[_moduleCount - 15 + i][8] = mod;
	        }
	      }
	
	      for (var i = 0; i < 15; i += 1) {
	
	        var mod = !test && (bits >> i & 1) == 1;
	
	        if (i < 8) {
	          _modules[8][_moduleCount - i - 1] = mod;
	        } else if (i < 9) {
	          _modules[8][15 - i - 1 + 1] = mod;
	        } else {
	          _modules[8][15 - i - 1] = mod;
	        }
	      }
	
	      _modules[_moduleCount - 8][8] = !test;
	    };
	
	    var mapData = function mapData(data, maskPattern) {
	
	      var inc = -1;
	      var row = _moduleCount - 1;
	      var bitIndex = 7;
	      var byteIndex = 0;
	      var maskFunc = QRUtil.getMaskFunction(maskPattern);
	
	      for (var col = _moduleCount - 1; col > 0; col -= 2) {
	
	        if (col == 6) col -= 1;
	
	        while (true) {
	
	          for (var c = 0; c < 2; c += 1) {
	
	            if (_modules[row][col - c] == null) {
	
	              var dark = false;
	
	              if (byteIndex < data.length) {
	                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
	              }
	
	              var mask = maskFunc(row, col - c);
	
	              if (mask) {
	                dark = !dark;
	              }
	
	              _modules[row][col - c] = dark;
	              bitIndex -= 1;
	
	              if (bitIndex == -1) {
	                byteIndex += 1;
	                bitIndex = 7;
	              }
	            }
	          }
	
	          row += inc;
	
	          if (row < 0 || _moduleCount <= row) {
	            row -= inc;
	            inc = -inc;
	            break;
	          }
	        }
	      }
	    };
	
	    var createBytes = function createBytes(buffer, rsBlocks) {
	
	      var offset = 0;
	
	      var maxDcCount = 0;
	      var maxEcCount = 0;
	
	      var dcdata = new Array(rsBlocks.length);
	      var ecdata = new Array(rsBlocks.length);
	
	      for (var r = 0; r < rsBlocks.length; r += 1) {
	
	        var dcCount = rsBlocks[r].dataCount;
	        var ecCount = rsBlocks[r].totalCount - dcCount;
	
	        maxDcCount = Math.max(maxDcCount, dcCount);
	        maxEcCount = Math.max(maxEcCount, ecCount);
	
	        dcdata[r] = new Array(dcCount);
	
	        for (var i = 0; i < dcdata[r].length; i += 1) {
	          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
	        }
	        offset += dcCount;
	
	        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
	        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
	
	        var modPoly = rawPoly.mod(rsPoly);
	        ecdata[r] = new Array(rsPoly.getLength() - 1);
	        for (var i = 0; i < ecdata[r].length; i += 1) {
	          var modIndex = i + modPoly.getLength() - ecdata[r].length;
	          ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
	        }
	      }
	
	      var totalCodeCount = 0;
	      for (var i = 0; i < rsBlocks.length; i += 1) {
	        totalCodeCount += rsBlocks[i].totalCount;
	      }
	
	      var data = new Array(totalCodeCount);
	      var index = 0;
	
	      for (var i = 0; i < maxDcCount; i += 1) {
	        for (var r = 0; r < rsBlocks.length; r += 1) {
	          if (i < dcdata[r].length) {
	            data[index] = dcdata[r][i];
	            index += 1;
	          }
	        }
	      }
	
	      for (var i = 0; i < maxEcCount; i += 1) {
	        for (var r = 0; r < rsBlocks.length; r += 1) {
	          if (i < ecdata[r].length) {
	            data[index] = ecdata[r][i];
	            index += 1;
	          }
	        }
	      }
	
	      return data;
	    };
	
	    var createData = function createData(typeNumber, errorCorrectionLevel, dataList) {
	
	      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);
	
	      var buffer = qrBitBuffer();
	
	      for (var i = 0; i < dataList.length; i += 1) {
	        var data = dataList[i];
	        buffer.put(data.getMode(), 4);
	        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber));
	        data.write(buffer);
	      }
	
	      var totalDataCount = 0;
	      for (var i = 0; i < rsBlocks.length; i += 1) {
	        totalDataCount += rsBlocks[i].dataCount;
	      }
	
	      if (buffer.getLengthInBits() > totalDataCount * 8) {
	        throw new Error('code length overflow. (' + buffer.getLengthInBits() + '>' + totalDataCount * 8 + ')');
	      }
	
	      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
	        buffer.put(0, 4);
	      }
	
	      while (buffer.getLengthInBits() % 8 != 0) {
	        buffer.putBit(false);
	      }
	
	      while (true) {
	
	        if (buffer.getLengthInBits() >= totalDataCount * 8) {
	          break;
	        }
	        buffer.put(PAD0, 8);
	
	        if (buffer.getLengthInBits() >= totalDataCount * 8) {
	          break;
	        }
	        buffer.put(PAD1, 8);
	      }
	
	      return createBytes(buffer, rsBlocks);
	    };
	
	    _this.addData = function (data, mode) {
	
	      mode = mode || 'Byte';
	
	      var newData = null;
	
	      switch (mode) {
	        case 'Numeric':
	          newData = qrNumber(data);
	          break;
	        case 'Alphanumeric':
	          newData = qrAlphaNum(data);
	          break;
	        case 'Byte':
	          newData = qr8BitByte(data);
	          break;
	        case 'Kanji':
	          newData = qrKanji(data);
	          break;
	        default:
	          throw 'mode:' + mode;
	      }
	
	      _dataList.push(newData);
	      _dataCache = null;
	    };
	
	    _this.isDark = function (row, col) {
	      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
	        throw new Error(row + ',' + col);
	      }
	      return _modules[row][col];
	    };
	
	    _this.getModuleCount = function () {
	      return _moduleCount;
	    };
	
	    _this.make = function () {
	      makeImpl(false, getBestMaskPattern());
	    };
	
	    _this.createTableTag = function (cellSize, margin) {
	
	      cellSize = cellSize || 2;
	      margin = typeof margin == 'undefined' ? cellSize * 4 : margin;
	
	      var qrHtml = '';
	
	      qrHtml += '<table style="';
	      qrHtml += ' border-width: 0px; border-style: none;';
	      qrHtml += ' border-collapse: collapse;';
	      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
	      qrHtml += '">';
	      qrHtml += '<tbody>';
	
	      for (var r = 0; r < _this.getModuleCount(); r += 1) {
	
	        qrHtml += '<tr>';
	
	        for (var c = 0; c < _this.getModuleCount(); c += 1) {
	          qrHtml += '<td style="';
	          qrHtml += ' border-width: 0px; border-style: none;';
	          qrHtml += ' border-collapse: collapse;';
	          qrHtml += ' padding: 0px; margin: 0px;';
	          qrHtml += ' width: ' + cellSize + 'px;';
	          qrHtml += ' height: ' + cellSize + 'px;';
	          qrHtml += ' background-color: ';
	          qrHtml += _this.isDark(r, c) ? '#000000' : '#ffffff';
	          qrHtml += ';';
	          qrHtml += '"/>';
	        }
	
	        qrHtml += '</tr>';
	      }
	
	      qrHtml += '</tbody>';
	      qrHtml += '</table>';
	
	      return qrHtml;
	    };
	
	    _this.createSvgTag = function (cellSize, margin) {
	
	      cellSize = cellSize || 2;
	      margin = typeof margin == 'undefined' ? cellSize * 4 : margin;
	      var size = _this.getModuleCount() * cellSize + margin * 2;
	      var c,
	          mc,
	          r,
	          mr,
	          qrSvg = '',
	          rect;
	
	      rect = 'l' + cellSize + ',0 0,' + cellSize + ' -' + cellSize + ',0 0,-' + cellSize + 'z ';
	
	      qrSvg += '<svg';
	      qrSvg += ' width="' + size + 'px"';
	      qrSvg += ' height="' + size + 'px"';
	      qrSvg += ' xmlns="http://www.w3.org/2000/svg"';
	      qrSvg += '>';
	      qrSvg += '<path d="';
	
	      for (r = 0; r < _this.getModuleCount(); r += 1) {
	        mr = r * cellSize + margin;
	        for (c = 0; c < _this.getModuleCount(); c += 1) {
	          if (_this.isDark(r, c)) {
	            mc = c * cellSize + margin;
	            qrSvg += 'M' + mc + ',' + mr + rect;
	          }
	        }
	      }
	
	      qrSvg += '" stroke="transparent" fill="black"/>';
	      qrSvg += '</svg>';
	
	      return qrSvg;
	    };
	
	    _this.createImgTag = function (cellSize, margin) {
	
	      cellSize = cellSize || 2;
	      margin = typeof margin == 'undefined' ? cellSize * 4 : margin;
	
	      var size = _this.getModuleCount() * cellSize + margin * 2;
	      var min = margin;
	      var max = size - margin;
	
	      return createImgTag(size, size, function (x, y) {
	        if (min <= x && x < max && min <= y && y < max) {
	          var c = Math.floor((x - min) / cellSize);
	          var r = Math.floor((y - min) / cellSize);
	          return _this.isDark(r, c) ? 0 : 1;
	        } else {
	          return 1;
	        }
	      });
	    };
	
	    _this.createImgObject = function (cellSize, margin) {
	
	      cellSize = cellSize || 2;
	      margin = typeof margin == 'undefined' ? cellSize * 4 : margin;
	
	      var size = _this.getModuleCount() * cellSize + margin * 2;
	      var min = margin;
	      var max = size - margin;
	
	      return createImgObject(size, size, function (x, y) {
	        if (min <= x && x < max && min <= y && y < max) {
	          var c = Math.floor((x - min) / cellSize);
	          var r = Math.floor((y - min) / cellSize);
	          return _this.isDark(r, c) ? 0 : 1;
	        } else {
	          return 1;
	        }
	      });
	    };
	
	    return _this;
	  };
	
	  qrcode.stringToBytes = function (s) {
	    var bytes = new Array();
	    for (var i = 0; i < s.length; i += 1) {
	      var c = s.charCodeAt(i);
	      bytes.push(c & 0xff);
	    }
	    return bytes;
	  };
	
	  qrcode.createStringToBytes = function (unicodeData, numChars) {
	
	    var unicodeMap = function () {
	
	      var bin = base64DecodeInputStream(unicodeData);
	      var read = function read() {
	        var b = bin.read();
	        if (b == -1) throw new Error();
	        return b;
	      };
	
	      var count = 0;
	      var unicodeMap = {};
	      while (true) {
	        var b0 = bin.read();
	        if (b0 == -1) break;
	        var b1 = read();
	        var b2 = read();
	        var b3 = read();
	        var k = String.fromCharCode(b0 << 8 | b1);
	        var v = b2 << 8 | b3;
	        unicodeMap[k] = v;
	        count += 1;
	      }
	      if (count != numChars) {
	        throw new Error(count + ' != ' + numChars);
	      }
	
	      return unicodeMap;
	    }();
	
	    var unknownChar = '?'.charCodeAt(0);
	
	    return function (s) {
	      var bytes = new Array();
	      for (var i = 0; i < s.length; i += 1) {
	        var c = s.charCodeAt(i);
	        if (c < 128) {
	          bytes.push(c);
	        } else {
	          var b = unicodeMap[s.charAt(i)];
	          if (typeof b == 'number') {
	            if ((b & 0xff) == b) {
	              bytes.push(b);
	            } else {
	              bytes.push(b >>> 8);
	              bytes.push(b & 0xff);
	            }
	          } else {
	            bytes.push(unknownChar);
	          }
	        }
	      }
	      return bytes;
	    };
	  };
	
	  var QRMode = {
	    MODE_NUMBER: 1 << 0,
	    MODE_ALPHA_NUM: 1 << 1,
	    MODE_8BIT_BYTE: 1 << 2,
	    MODE_KANJI: 1 << 3
	  };
	
	  var QRErrorCorrectionLevel = {
	    L: 1,
	    M: 0,
	    Q: 3,
	    H: 2
	  };
	
	  var QRMaskPattern = {
	    PATTERN000: 0,
	    PATTERN001: 1,
	    PATTERN010: 2,
	    PATTERN011: 3,
	    PATTERN100: 4,
	    PATTERN101: 5,
	    PATTERN110: 6,
	    PATTERN111: 7
	  };
	
	  var QRUtil = function () {
	
	    var PATTERN_POSITION_TABLE = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]];
	    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
	    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
	    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
	
	    var _this = {};
	
	    var getBCHDigit = function getBCHDigit(data) {
	      var digit = 0;
	      while (data != 0) {
	        digit += 1;
	        data >>>= 1;
	      }
	      return digit;
	    };
	
	    _this.getBCHTypeInfo = function (data) {
	      var d = data << 10;
	      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
	        d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
	      }
	      return (data << 10 | d) ^ G15_MASK;
	    };
	
	    _this.getBCHTypeNumber = function (data) {
	      var d = data << 12;
	      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
	        d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
	      }
	      return data << 12 | d;
	    };
	
	    _this.getPatternPosition = function (typeNumber) {
	      return PATTERN_POSITION_TABLE[typeNumber - 1];
	    };
	
	    _this.getMaskFunction = function (maskPattern) {
	
	      switch (maskPattern) {
	
	        case QRMaskPattern.PATTERN000:
	          return function (i, j) {
	            return (i + j) % 2 == 0;
	          };
	        case QRMaskPattern.PATTERN001:
	          return function (i, j) {
	            return i % 2 == 0;
	          };
	        case QRMaskPattern.PATTERN010:
	          return function (i, j) {
	            return j % 3 == 0;
	          };
	        case QRMaskPattern.PATTERN011:
	          return function (i, j) {
	            return (i + j) % 3 == 0;
	          };
	        case QRMaskPattern.PATTERN100:
	          return function (i, j) {
	            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
	          };
	        case QRMaskPattern.PATTERN101:
	          return function (i, j) {
	            return i * j % 2 + i * j % 3 == 0;
	          };
	        case QRMaskPattern.PATTERN110:
	          return function (i, j) {
	            return (i * j % 2 + i * j % 3) % 2 == 0;
	          };
	        case QRMaskPattern.PATTERN111:
	          return function (i, j) {
	            return (i * j % 3 + (i + j) % 2) % 2 == 0;
	          };
	
	        default:
	          throw new Error('bad maskPattern:' + maskPattern);
	      }
	    };
	
	    _this.getErrorCorrectPolynomial = function (errorCorrectLength) {
	      var a = qrPolynomial([1], 0);
	      for (var i = 0; i < errorCorrectLength; i += 1) {
	        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
	      }
	      return a;
	    };
	
	    _this.getLengthInBits = function (mode, type) {
	
	      if (1 <= type && type < 10) {
	
	        switch (mode) {
	          case QRMode.MODE_NUMBER:
	            return 10;
	          case QRMode.MODE_ALPHA_NUM:
	            return 9;
	          case QRMode.MODE_8BIT_BYTE:
	            return 8;
	          case QRMode.MODE_KANJI:
	            return 8;
	          default:
	            throw new Error('mode:' + mode);
	        }
	      } else if (type < 27) {
	
	        switch (mode) {
	          case QRMode.MODE_NUMBER:
	            return 12;
	          case QRMode.MODE_ALPHA_NUM:
	            return 11;
	          case QRMode.MODE_8BIT_BYTE:
	            return 16;
	          case QRMode.MODE_KANJI:
	            return 10;
	          default:
	            throw new Error('mode:' + mode);
	        }
	      } else if (type < 41) {
	
	        switch (mode) {
	          case QRMode.MODE_NUMBER:
	            return 14;
	          case QRMode.MODE_ALPHA_NUM:
	            return 13;
	          case QRMode.MODE_8BIT_BYTE:
	            return 16;
	          case QRMode.MODE_KANJI:
	            return 12;
	          default:
	            throw new Error('mode:' + mode);
	        }
	      } else {
	        throw new Error('type:' + type);
	      }
	    };
	
	    _this.getLostPoint = function (qrcode) {
	
	      var moduleCount = qrcode.getModuleCount();
	
	      var lostPoint = 0;
	
	      for (var row = 0; row < moduleCount; row += 1) {
	        for (var col = 0; col < moduleCount; col += 1) {
	
	          var sameCount = 0;
	          var dark = qrcode.isDark(row, col);
	
	          for (var r = -1; r <= 1; r += 1) {
	
	            if (row + r < 0 || moduleCount <= row + r) {
	              continue;
	            }
	
	            for (var c = -1; c <= 1; c += 1) {
	
	              if (col + c < 0 || moduleCount <= col + c) {
	                continue;
	              }
	
	              if (r == 0 && c == 0) {
	                continue;
	              }
	
	              if (dark == qrcode.isDark(row + r, col + c)) {
	                sameCount += 1;
	              }
	            }
	          }
	
	          if (sameCount > 5) {
	            lostPoint += 3 + sameCount - 5;
	          }
	        }
	      };
	
	      for (var row = 0; row < moduleCount - 1; row += 1) {
	        for (var col = 0; col < moduleCount - 1; col += 1) {
	          var count = 0;
	          if (qrcode.isDark(row, col)) count += 1;
	          if (qrcode.isDark(row + 1, col)) count += 1;
	          if (qrcode.isDark(row, col + 1)) count += 1;
	          if (qrcode.isDark(row + 1, col + 1)) count += 1;
	          if (count == 0 || count == 4) {
	            lostPoint += 3;
	          }
	        }
	      }
	
	      for (var row = 0; row < moduleCount; row += 1) {
	        for (var col = 0; col < moduleCount - 6; col += 1) {
	          if (qrcode.isDark(row, col) && !qrcode.isDark(row, col + 1) && qrcode.isDark(row, col + 2) && qrcode.isDark(row, col + 3) && qrcode.isDark(row, col + 4) && !qrcode.isDark(row, col + 5) && qrcode.isDark(row, col + 6)) {
	            lostPoint += 40;
	          }
	        }
	      }
	
	      for (var col = 0; col < moduleCount; col += 1) {
	        for (var row = 0; row < moduleCount - 6; row += 1) {
	          if (qrcode.isDark(row, col) && !qrcode.isDark(row + 1, col) && qrcode.isDark(row + 2, col) && qrcode.isDark(row + 3, col) && qrcode.isDark(row + 4, col) && !qrcode.isDark(row + 5, col) && qrcode.isDark(row + 6, col)) {
	            lostPoint += 40;
	          }
	        }
	      }
	
	      var darkCount = 0;
	
	      for (var col = 0; col < moduleCount; col += 1) {
	        for (var row = 0; row < moduleCount; row += 1) {
	          if (qrcode.isDark(row, col)) {
	            darkCount += 1;
	          }
	        }
	      }
	
	      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
	      lostPoint += ratio * 10;
	
	      return lostPoint;
	    };
	
	    return _this;
	  }();
	
	  var QRMath = function () {
	
	    var EXP_TABLE = new Array(256);
	    var LOG_TABLE = new Array(256);
	
	    for (var i = 0; i < 8; i += 1) {
	      EXP_TABLE[i] = 1 << i;
	    }
	    for (var i = 8; i < 256; i += 1) {
	      EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
	    }
	    for (var i = 0; i < 255; i += 1) {
	      LOG_TABLE[EXP_TABLE[i]] = i;
	    }
	
	    var _this = {};
	
	    _this.glog = function (n) {
	
	      if (n < 1) {
	        throw new Error('glog(' + n + ')');
	      }
	
	      return LOG_TABLE[n];
	    };
	
	    _this.gexp = function (n) {
	
	      while (n < 0) {
	        n += 255;
	      }
	
	      while (n >= 256) {
	        n -= 255;
	      }
	
	      return EXP_TABLE[n];
	    };
	
	    return _this;
	  }();
	
	  function qrPolynomial(num, shift) {
	
	    if (typeof num.length == 'undefined') {
	      throw new Error(num.length + '/' + shift);
	    }
	
	    var _num = function () {
	      var offset = 0;
	      while (offset < num.length && num[offset] == 0) {
	        offset += 1;
	      }
	      var _num = new Array(num.length - offset + shift);
	      for (var i = 0; i < num.length - offset; i += 1) {
	        _num[i] = num[i + offset];
	      }
	      return _num;
	    }();
	
	    var _this = {};
	
	    _this.getAt = function (index) {
	      return _num[index];
	    };
	
	    _this.getLength = function () {
	      return _num.length;
	    };
	
	    _this.multiply = function (e) {
	
	      var num = new Array(_this.getLength() + e.getLength() - 1);
	
	      for (var i = 0; i < _this.getLength(); i += 1) {
	        for (var j = 0; j < e.getLength(); j += 1) {
	          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
	        }
	      }
	
	      return qrPolynomial(num, 0);
	    };
	
	    _this.mod = function (e) {
	
	      if (_this.getLength() - e.getLength() < 0) {
	        return _this;
	      }
	
	      var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
	
	      var num = new Array(_this.getLength());
	      for (var i = 0; i < _this.getLength(); i += 1) {
	        num[i] = _this.getAt(i);
	      }
	
	      for (var i = 0; i < e.getLength(); i += 1) {
	        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
	      }
	
	      return qrPolynomial(num, 0).mod(e);
	    };
	
	    return _this;
	  };
	
	  var QRRSBlock = function () {
	
	    var RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
	
	    var qrRSBlock = function qrRSBlock(totalCount, dataCount) {
	      var _this = {};
	      _this.totalCount = totalCount;
	      _this.dataCount = dataCount;
	      return _this;
	    };
	
	    var _this = {};
	
	    var getRsBlockTable = function getRsBlockTable(typeNumber, errorCorrectionLevel) {
	
	      switch (errorCorrectionLevel) {
	        case QRErrorCorrectionLevel.L:
	          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	        case QRErrorCorrectionLevel.M:
	          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	        case QRErrorCorrectionLevel.Q:
	          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	        case QRErrorCorrectionLevel.H:
	          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	        default:
	          return undefined;
	      }
	    };
	
	    _this.getRSBlocks = function (typeNumber, errorCorrectionLevel) {
	
	      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
	
	      if (typeof rsBlock == 'undefined') {
	        throw new Error('bad rs block @ typeNumber:' + typeNumber + '/errorCorrectionLevel:' + errorCorrectionLevel);
	      }
	
	      var length = rsBlock.length / 3;
	
	      var list = new Array();
	
	      for (var i = 0; i < length; i += 1) {
	
	        var count = rsBlock[i * 3 + 0];
	        var totalCount = rsBlock[i * 3 + 1];
	        var dataCount = rsBlock[i * 3 + 2];
	
	        for (var j = 0; j < count; j += 1) {
	          list.push(qrRSBlock(totalCount, dataCount));
	        }
	      }
	
	      return list;
	    };
	
	    return _this;
	  }();
	
	  var qrBitBuffer = function qrBitBuffer() {
	
	    var _buffer = new Array();
	    var _length = 0;
	
	    var _this = {};
	
	    _this.getBuffer = function () {
	      return _buffer;
	    };
	
	    _this.getAt = function (index) {
	      var bufIndex = Math.floor(index / 8);
	      return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
	    };
	
	    _this.put = function (num, length) {
	      for (var i = 0; i < length; i += 1) {
	        _this.putBit((num >>> length - i - 1 & 1) == 1);
	      }
	    };
	
	    _this.getLengthInBits = function () {
	      return _length;
	    };
	
	    _this.putBit = function (bit) {
	
	      var bufIndex = Math.floor(_length / 8);
	      if (_buffer.length <= bufIndex) {
	        _buffer.push(0);
	      }
	
	      if (bit) {
	        _buffer[bufIndex] |= 0x80 >>> _length % 8;
	      }
	
	      _length += 1;
	    };
	
	    return _this;
	  };
	
	  var qrNumber = function qrNumber(data) {
	
	    var _mode = QRMode.MODE_NUMBER;
	    var _data = data;
	
	    var _this = {};
	
	    _this.getMode = function () {
	      return _mode;
	    };
	
	    _this.getLength = function (buffer) {
	      return _data.length;
	    };
	
	    _this.write = function (buffer) {
	
	      var data = _data;
	
	      var i = 0;
	
	      while (i + 2 < data.length) {
	        buffer.put(strToNum(data.substring(i, i + 3)), 10);
	        i += 3;
	      }
	
	      if (i < data.length) {
	        if (data.length - i == 1) {
	          buffer.put(strToNum(data.substring(i, i + 1)), 4);
	        } else if (data.length - i == 2) {
	          buffer.put(strToNum(data.substring(i, i + 2)), 7);
	        }
	      }
	    };
	
	    var strToNum = function strToNum(s) {
	      var num = 0;
	      for (var i = 0; i < s.length; i += 1) {
	        num = num * 10 + chatToNum(s.charAt(i));
	      }
	      return num;
	    };
	
	    var chatToNum = function chatToNum(c) {
	      if ('0' <= c && c <= '9') {
	        return c.charCodeAt(0) - '0'.charCodeAt(0);
	      }
	      throw 'illegal char :' + c;
	    };
	
	    return _this;
	  };
	
	  var qrAlphaNum = function qrAlphaNum(data) {
	
	    var _mode = QRMode.MODE_ALPHA_NUM;
	    var _data = data;
	
	    var _this = {};
	
	    _this.getMode = function () {
	      return _mode;
	    };
	
	    _this.getLength = function (buffer) {
	      return _data.length;
	    };
	
	    _this.write = function (buffer) {
	
	      var s = _data;
	
	      var i = 0;
	
	      while (i + 1 < s.length) {
	        buffer.put(getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)), 11);
	        i += 2;
	      }
	
	      if (i < s.length) {
	        buffer.put(getCode(s.charAt(i)), 6);
	      }
	    };
	
	    var getCode = function getCode(c) {
	
	      if ('0' <= c && c <= '9') {
	        return c.charCodeAt(0) - '0'.charCodeAt(0);
	      } else if ('A' <= c && c <= 'Z') {
	        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
	      } else {
	        switch (c) {
	          case ' ':
	            return 36;
	          case '$':
	            return 37;
	          case '%':
	            return 38;
	          case '*':
	            return 39;
	          case '+':
	            return 40;
	          case '-':
	            return 41;
	          case '.':
	            return 42;
	          case '/':
	            return 43;
	          case ':':
	            return 44;
	          default:
	            throw 'illegal char :' + c;
	        }
	      }
	    };
	
	    return _this;
	  };
	
	  var qr8BitByte = function qr8BitByte(data) {
	
	    var _mode = QRMode.MODE_8BIT_BYTE;
	    var _data = data;
	    var _bytes = qrcode.stringToBytes(data);
	
	    var _this = {};
	
	    _this.getMode = function () {
	      return _mode;
	    };
	
	    _this.getLength = function (buffer) {
	      return _bytes.length;
	    };
	
	    _this.write = function (buffer) {
	      for (var i = 0; i < _bytes.length; i += 1) {
	        buffer.put(_bytes[i], 8);
	      }
	    };
	
	    return _this;
	  };
	
	  var qrKanji = function qrKanji(data) {
	
	    var _mode = QRMode.MODE_KANJI;
	    var _data = data;
	    var _bytes = qrcode.stringToBytes(data);
	
	    !function (c, code) {
	      var test = qrcode.stringToBytes(c);
	      if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
	        throw 'sjis not supported.';
	      }
	    }('\u53CB', 0x9746);
	
	    var _this = {};
	
	    _this.getMode = function () {
	      return _mode;
	    };
	
	    _this.getLength = function (buffer) {
	      return ~~(_bytes.length / 2);
	    };
	
	    _this.write = function (buffer) {
	
	      var data = _bytes;
	
	      var i = 0;
	
	      while (i + 1 < data.length) {
	
	        var c = (0xff & data[i]) << 8 | 0xff & data[i + 1];
	
	        if (0x8140 <= c && c <= 0x9FFC) {
	          c -= 0x8140;
	        } else if (0xE040 <= c && c <= 0xEBBF) {
	          c -= 0xC140;
	        } else {
	          throw 'illegal char at ' + (i + 1) + '/' + c;
	        }
	
	        c = (c >>> 8 & 0xff) * 0xC0 + (c & 0xff);
	
	        buffer.put(c, 13);
	
	        i += 2;
	      }
	
	      if (i < data.length) {
	        throw 'illegal char at ' + (i + 1);
	      }
	    };
	
	    return _this;
	  };
	
	  var byteArrayOutputStream = function byteArrayOutputStream() {
	
	    var _bytes = new Array();
	
	    var _this = {};
	
	    _this.writeByte = function (b) {
	      _bytes.push(b & 0xff);
	    };
	
	    _this.writeShort = function (i) {
	      _this.writeByte(i);
	      _this.writeByte(i >>> 8);
	    };
	
	    _this.writeBytes = function (b, off, len) {
	      off = off || 0;
	      len = len || b.length;
	      for (var i = 0; i < len; i += 1) {
	        _this.writeByte(b[i + off]);
	      }
	    };
	
	    _this.writeString = function (s) {
	      for (var i = 0; i < s.length; i += 1) {
	        _this.writeByte(s.charCodeAt(i));
	      }
	    };
	
	    _this.toByteArray = function () {
	      return _bytes;
	    };
	
	    _this.toString = function () {
	      var s = '';
	      s += '[';
	      for (var i = 0; i < _bytes.length; i += 1) {
	        if (i > 0) {
	          s += ',';
	        }
	        s += _bytes[i];
	      }
	      s += ']';
	      return s;
	    };
	
	    return _this;
	  };
	
	  var base64EncodeOutputStream = function base64EncodeOutputStream() {
	
	    var _buffer = 0;
	    var _buflen = 0;
	    var _length = 0;
	    var _base64 = '';
	
	    var _this = {};
	
	    var writeEncoded = function writeEncoded(b) {
	      _base64 += String.fromCharCode(encode(b & 0x3f));
	    };
	
	    var encode = function encode(n) {
	      if (n < 0) {} else if (n < 26) {
	        return 0x41 + n;
	      } else if (n < 52) {
	        return 0x61 + (n - 26);
	      } else if (n < 62) {
	        return 0x30 + (n - 52);
	      } else if (n == 62) {
	        return 0x2b;
	      } else if (n == 63) {
	        return 0x2f;
	      }
	      throw new Error('n:' + n);
	    };
	
	    _this.writeByte = function (n) {
	
	      _buffer = _buffer << 8 | n & 0xff;
	      _buflen += 8;
	      _length += 1;
	
	      while (_buflen >= 6) {
	        writeEncoded(_buffer >>> _buflen - 6);
	        _buflen -= 6;
	      }
	    };
	
	    _this.flush = function () {
	
	      if (_buflen > 0) {
	        writeEncoded(_buffer << 6 - _buflen);
	        _buffer = 0;
	        _buflen = 0;
	      }
	
	      if (_length % 3 != 0) {
	        var padlen = 3 - _length % 3;
	        for (var i = 0; i < padlen; i += 1) {
	          _base64 += '=';
	        }
	      }
	    };
	
	    _this.toString = function () {
	      return _base64;
	    };
	
	    return _this;
	  };
	
	  var base64DecodeInputStream = function base64DecodeInputStream(str) {
	
	    var _str = str;
	    var _pos = 0;
	    var _buffer = 0;
	    var _buflen = 0;
	
	    var _this = {};
	
	    _this.read = function () {
	
	      while (_buflen < 8) {
	
	        if (_pos >= _str.length) {
	          if (_buflen == 0) {
	            return -1;
	          }
	          throw new Error('unexpected end of file./' + _buflen);
	        }
	
	        var c = _str.charAt(_pos);
	        _pos += 1;
	
	        if (c == '=') {
	          _buflen = 0;
	          return -1;
	        } else if (c.match(/^\s$/)) {
	          continue;
	        }
	
	        _buffer = _buffer << 6 | decode(c.charCodeAt(0));
	        _buflen += 6;
	      }
	
	      var n = _buffer >>> _buflen - 8 & 0xff;
	      _buflen -= 8;
	      return n;
	    };
	
	    var decode = function decode(c) {
	      if (0x41 <= c && c <= 0x5a) {
	        return c - 0x41;
	      } else if (0x61 <= c && c <= 0x7a) {
	        return c - 0x61 + 26;
	      } else if (0x30 <= c && c <= 0x39) {
	        return c - 0x30 + 52;
	      } else if (c == 0x2b) {
	        return 62;
	      } else if (c == 0x2f) {
	        return 63;
	      } else {
	        throw new Error('c:' + c);
	      }
	    };
	
	    return _this;
	  };
	
	  var gifImage = function gifImage(width, height) {
	
	    var _width = width;
	    var _height = height;
	    var _data = new Array(width * height);
	
	    var _this = {};
	
	    _this.setPixel = function (x, y, pixel) {
	      _data[y * _width + x] = pixel;
	    };
	
	    _this.write = function (out) {
	
	      out.writeString('GIF87a');
	
	      out.writeShort(_width);
	      out.writeShort(_height);
	
	      out.writeByte(0x80);
	      out.writeByte(0);
	      out.writeByte(0);
	
	      out.writeByte(0x00);
	      out.writeByte(0x00);
	      out.writeByte(0x00);
	
	      out.writeByte(0xff);
	      out.writeByte(0xff);
	      out.writeByte(0xff);
	
	      out.writeString(',');
	      out.writeShort(0);
	      out.writeShort(0);
	      out.writeShort(_width);
	      out.writeShort(_height);
	      out.writeByte(0);
	
	      var lzwMinCodeSize = 2;
	      var raster = getLZWRaster(lzwMinCodeSize);
	
	      out.writeByte(lzwMinCodeSize);
	
	      var offset = 0;
	
	      while (raster.length - offset > 255) {
	        out.writeByte(255);
	        out.writeBytes(raster, offset, 255);
	        offset += 255;
	      }
	
	      out.writeByte(raster.length - offset);
	      out.writeBytes(raster, offset, raster.length - offset);
	      out.writeByte(0x00);
	
	      out.writeString(';');
	    };
	
	    var bitOutputStream = function bitOutputStream(out) {
	
	      var _out = out;
	      var _bitLength = 0;
	      var _bitBuffer = 0;
	
	      var _this = {};
	
	      _this.write = function (data, length) {
	
	        if (data >>> length != 0) {
	          throw new Error('length over');
	        }
	
	        while (_bitLength + length >= 8) {
	          _out.writeByte(0xff & (data << _bitLength | _bitBuffer));
	          length -= 8 - _bitLength;
	          data >>>= 8 - _bitLength;
	          _bitBuffer = 0;
	          _bitLength = 0;
	        }
	
	        _bitBuffer = data << _bitLength | _bitBuffer;
	        _bitLength = _bitLength + length;
	      };
	
	      _this.flush = function () {
	        if (_bitLength > 0) {
	          _out.writeByte(_bitBuffer);
	        }
	      };
	
	      return _this;
	    };
	
	    var getLZWRaster = function getLZWRaster(lzwMinCodeSize) {
	
	      var clearCode = 1 << lzwMinCodeSize;
	      var endCode = (1 << lzwMinCodeSize) + 1;
	      var bitLength = lzwMinCodeSize + 1;
	
	      var table = lzwTable();
	
	      for (var i = 0; i < clearCode; i += 1) {
	        table.add(String.fromCharCode(i));
	      }
	      table.add(String.fromCharCode(clearCode));
	      table.add(String.fromCharCode(endCode));
	
	      var byteOut = byteArrayOutputStream();
	      var bitOut = bitOutputStream(byteOut);
	
	      bitOut.write(clearCode, bitLength);
	
	      var dataIndex = 0;
	
	      var s = String.fromCharCode(_data[dataIndex]);
	      dataIndex += 1;
	
	      while (dataIndex < _data.length) {
	
	        var c = String.fromCharCode(_data[dataIndex]);
	        dataIndex += 1;
	
	        if (table.contains(s + c)) {
	
	          s = s + c;
	        } else {
	
	          bitOut.write(table.indexOf(s), bitLength);
	
	          if (table.size() < 0xfff) {
	
	            if (table.size() == 1 << bitLength) {
	              bitLength += 1;
	            }
	
	            table.add(s + c);
	          }
	
	          s = c;
	        }
	      }
	
	      bitOut.write(table.indexOf(s), bitLength);
	
	      bitOut.write(endCode, bitLength);
	
	      bitOut.flush();
	
	      return byteOut.toByteArray();
	    };
	
	    var lzwTable = function lzwTable() {
	
	      var _map = {};
	      var _size = 0;
	
	      var _this = {};
	
	      _this.add = function (key) {
	        if (_this.contains(key)) {
	          throw new Error('dup key:' + key);
	        }
	        _map[key] = _size;
	        _size += 1;
	      };
	
	      _this.size = function () {
	        return _size;
	      };
	
	      _this.indexOf = function (key) {
	        return _map[key];
	      };
	
	      _this.contains = function (key) {
	        return typeof _map[key] != 'undefined';
	      };
	
	      return _this;
	    };
	
	    return _this;
	  };
	
	  var createImgTag = function createImgTag(width, height, getPixel, alt) {
	
	    var gif = gifImage(width, height);
	    for (var y = 0; y < height; y += 1) {
	      for (var x = 0; x < width; x += 1) {
	        gif.setPixel(x, y, getPixel(x, y));
	      }
	    }
	
	    var b = byteArrayOutputStream();
	    gif.write(b);
	
	    var base64 = base64EncodeOutputStream();
	    var bytes = b.toByteArray();
	    for (var i = 0; i < bytes.length; i += 1) {
	      base64.writeByte(bytes[i]);
	    }
	    base64.flush();
	
	    var img = '';
	    img += '<img';
	    img += ' src="';
	    img += 'data:image/gif;base64,';
	    img += base64;
	    img += '"';
	    img += ' width="';
	    img += width;
	    img += '"';
	    img += ' height="';
	    img += height;
	    img += '"';
	    if (alt) {
	      img += ' alt="';
	      img += alt;
	      img += '"';
	    }
	    img += '/>';
	
	    return img;
	  };
	
	  var createImgObject = function createImgObject(width, height, getPixel) {
	
	    var gif = gifImage(width, height);
	    for (var y = 0; y < height; y += 1) {
	      for (var x = 0; x < width; x += 1) {
	        gif.setPixel(x, y, getPixel(x, y));
	      }
	    }
	
	    var b = byteArrayOutputStream();
	    gif.write(b);
	
	    var base64 = base64EncodeOutputStream();
	    var bytes = b.toByteArray();
	    for (var i = 0; i < bytes.length; i += 1) {
	      base64.writeByte(bytes[i]);
	    }
	    base64.flush();
	
	    var img = new Image();
	    img.src = 'data:image/gif;base64,' + base64;
	    img.width = width;
	    img.height = height;
	
	    return img;
	  };
	
	  return {
	    QRCode: qrcode,
	    QRUtil: QRUtil
	  };
	}();
	
	(function (factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') {
	    module.exports = factory();
	  }
	})(function () {
	  return {
	    QRCode: qrcode.QRCode,
	    QRUtil: qrcode.QRUtil
	  };
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(23);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(59);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(25);
	__webpack_require__(54);
	module.exports = __webpack_require__(58).f('iterator');

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(26)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(29)(String, 'String', function(iterated){
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(27)
	  , defined   = __webpack_require__(28);
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
/* 27 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(30)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(31)
	  , hide           = __webpack_require__(11)
	  , has            = __webpack_require__(32)
	  , Iterators      = __webpack_require__(33)
	  , $iterCreate    = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(50)
	  , getPrototypeOf = __webpack_require__(52)
	  , ITERATOR       = __webpack_require__(51)('iterator')
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
/* 30 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 32 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(35)
	  , descriptor     = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(50)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(51)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(13)
	  , dPs         = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(48)
	  , IE_PROTO    = __webpack_require__(45)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(49).appendChild(iframe);
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(12)
	  , anObject = __webpack_require__(13)
	  , getKeys  = __webpack_require__(37);
	
	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(38)
	  , enumBugKeys = __webpack_require__(48);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(32)
	  , toIObject    = __webpack_require__(39)
	  , arrayIndexOf = __webpack_require__(42)(false)
	  , IE_PROTO     = __webpack_require__(45)('IE_PROTO');
	
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(40)
	  , defined = __webpack_require__(28);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(41);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(39)
	  , toLength  = __webpack_require__(43)
	  , toIndex   = __webpack_require__(44);
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(27)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(27)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(46)('keys')
	  , uid    = __webpack_require__(47);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).document && document.documentElement;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(12).f
	  , has = __webpack_require__(32)
	  , TAG = __webpack_require__(51)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(46)('wks')
	  , uid        = __webpack_require__(47)
	  , Symbol     = __webpack_require__(7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(32)
	  , toObject    = __webpack_require__(53)
	  , IE_PROTO    = __webpack_require__(45)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(28);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	var global        = __webpack_require__(7)
	  , hide          = __webpack_require__(11)
	  , Iterators     = __webpack_require__(33)
	  , TO_STRING_TAG = __webpack_require__(51)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(56)
	  , step             = __webpack_require__(57)
	  , Iterators        = __webpack_require__(33)
	  , toIObject        = __webpack_require__(39);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(29)(Array, 'Array', function(iterated, kind){
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
/* 56 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(51);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(74);
	module.exports = __webpack_require__(8).Symbol;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(7)
	  , has            = __webpack_require__(32)
	  , DESCRIPTORS    = __webpack_require__(16)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(31)
	  , META           = __webpack_require__(62).KEY
	  , $fails         = __webpack_require__(17)
	  , shared         = __webpack_require__(46)
	  , setToStringTag = __webpack_require__(50)
	  , uid            = __webpack_require__(47)
	  , wks            = __webpack_require__(51)
	  , wksExt         = __webpack_require__(58)
	  , wksDefine      = __webpack_require__(63)
	  , keyOf          = __webpack_require__(64)
	  , enumKeys       = __webpack_require__(65)
	  , isArray        = __webpack_require__(68)
	  , anObject       = __webpack_require__(13)
	  , toIObject      = __webpack_require__(39)
	  , toPrimitive    = __webpack_require__(19)
	  , createDesc     = __webpack_require__(20)
	  , _create        = __webpack_require__(35)
	  , gOPNExt        = __webpack_require__(69)
	  , $GOPD          = __webpack_require__(71)
	  , $DP            = __webpack_require__(12)
	  , $keys          = __webpack_require__(37)
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
	  __webpack_require__(70).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(67).f  = $propertyIsEnumerable;
	  __webpack_require__(66).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(30)){
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(47)('meta')
	  , isObject = __webpack_require__(14)
	  , has      = __webpack_require__(32)
	  , setDesc  = __webpack_require__(12).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function(){
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(7)
	  , core           = __webpack_require__(8)
	  , LIBRARY        = __webpack_require__(30)
	  , wksExt         = __webpack_require__(58)
	  , defineProperty = __webpack_require__(12).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(37)
	  , toIObject = __webpack_require__(39);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(37)
	  , gOPS    = __webpack_require__(66)
	  , pIE     = __webpack_require__(67);
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
/* 66 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 67 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(41);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(39)
	  , gOPN      = __webpack_require__(70).f
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(38)
	  , hiddenKeys = __webpack_require__(48).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(67)
	  , createDesc     = __webpack_require__(20)
	  , toIObject      = __webpack_require__(39)
	  , toPrimitive    = __webpack_require__(19)
	  , has            = __webpack_require__(32)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 72 */
/***/ function(module, exports) {



/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63)('asyncIterator');

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63)('observable');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(2);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Util = function () {
	  function Util() {
	    (0, _classCallCheck3.default)(this, Util);
	  }
	
	  (0, _createClass3.default)(Util, null, [{
	    key: 'createCanvas',
	    value: function createCanvas(size, image) {
	      var canvas = document.createElement('canvas');
	      canvas.width = size;
	      canvas.height = size;
	      canvas.getContext('2d').drawImage(image, 0, 0, size, size);
	      return canvas;
	    }
	  }, {
	    key: 'threshold',
	    value: function threshold(r, g, b, value) {
	      return 0.2126 * r + 0.7152 * g + 0.0722 * b >= value ? 255 : 0;
	    }
	  }]);
	  return Util;
	}();
	
	exports.default = Util;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZTk1NTYyYTIwNTE0MmVjZDdlYiIsIndlYnBhY2s6Ly8vLi9zcmMvcWFydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL3NyYy9xcmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbIlFBcnQiLCJvcHRpb25zIiwiVHlwZUVycm9yIiwidmFsdWUiLCJpbWFnZVBhdGgiLCJmaWx0ZXIiLCJERUZBVUxUUyIsImVsIiwiaW1hZ2VTaXplIiwicGFkZGluZyIsInFyIiwiYWRkRGF0YSIsIm1ha2UiLCJxckltYWdlIiwiY3JlYXRlSW1nT2JqZWN0Iiwic2VsZiIsIm9ubG9hZCIsImNvdmVySW1hZ2UiLCJJbWFnZSIsInNyYyIsInJlc3VsdENhbnZhcyIsImNyZWF0ZUNhbnZhcyIsInFyQ2FudmFzIiwid2lkdGgiLCJoZWlnaHQiLCJjb3ZlckNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJkcmF3SW1hZ2UiLCJjb3ZlckltYWdlRGF0YSIsImdldEltYWdlRGF0YSIsImNvdmVySW1hZ2VCaW5hcnkiLCJkYXRhIiwicmVzdWx0SW1hZ2VEYXRhIiwicmVzdWx0SW1hZ2VCaW5hcnkiLCJpIiwibGVuZ3RoIiwieCIsIk1hdGgiLCJmbG9vciIsInkiLCJmYWN0b3IiLCJ0aHJlc2hvbGQiLCJwdXRJbWFnZURhdGEiLCJwYXR0ZXJuUG9zdGlvbiIsImdldFBhdHRlcm5Qb3NpdGlvbiIsImoiLCJyZWN0WCIsInJlY3RZIiwicmVjdFdpZHRoIiwicmVjdEhlaWdodCIsInJlY3REYXRhIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJ3aW5kb3ciLCJxcmNvZGUiLCJ0eXBlTnVtYmVyIiwiZXJyb3JDb3JyZWN0aW9uTGV2ZWwiLCJQQUQwIiwiUEFEMSIsIl90eXBlTnVtYmVyIiwiX2Vycm9yQ29ycmVjdGlvbkxldmVsIiwiUVJFcnJvckNvcnJlY3Rpb25MZXZlbCIsIl9tb2R1bGVzIiwiX21vZHVsZUNvdW50IiwiX2RhdGFDYWNoZSIsIl9kYXRhTGlzdCIsIkFycmF5IiwiX3RoaXMiLCJtYWtlSW1wbCIsInRlc3QiLCJtYXNrUGF0dGVybiIsIm1vZHVsZUNvdW50IiwibW9kdWxlcyIsInJvdyIsImNvbCIsInNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4iLCJzZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybiIsInNldHVwVGltaW5nUGF0dGVybiIsInNldHVwVHlwZUluZm8iLCJzZXR1cFR5cGVOdW1iZXIiLCJjcmVhdGVEYXRhIiwibWFwRGF0YSIsInIiLCJjIiwiZ2V0QmVzdE1hc2tQYXR0ZXJuIiwibWluTG9zdFBvaW50IiwicGF0dGVybiIsImxvc3RQb2ludCIsIlFSVXRpbCIsImdldExvc3RQb2ludCIsInBvcyIsImJpdHMiLCJnZXRCQ0hUeXBlTnVtYmVyIiwibW9kIiwiZ2V0QkNIVHlwZUluZm8iLCJpbmMiLCJiaXRJbmRleCIsImJ5dGVJbmRleCIsIm1hc2tGdW5jIiwiZ2V0TWFza0Z1bmN0aW9uIiwiZGFyayIsIm1hc2siLCJjcmVhdGVCeXRlcyIsImJ1ZmZlciIsInJzQmxvY2tzIiwib2Zmc2V0IiwibWF4RGNDb3VudCIsIm1heEVjQ291bnQiLCJkY2RhdGEiLCJlY2RhdGEiLCJkY0NvdW50IiwiZGF0YUNvdW50IiwiZWNDb3VudCIsInRvdGFsQ291bnQiLCJtYXgiLCJnZXRCdWZmZXIiLCJyc1BvbHkiLCJnZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsIiwicmF3UG9seSIsInFyUG9seW5vbWlhbCIsImdldExlbmd0aCIsIm1vZFBvbHkiLCJtb2RJbmRleCIsImdldEF0IiwidG90YWxDb2RlQ291bnQiLCJpbmRleCIsImRhdGFMaXN0IiwiUVJSU0Jsb2NrIiwiZ2V0UlNCbG9ja3MiLCJxckJpdEJ1ZmZlciIsInB1dCIsImdldE1vZGUiLCJnZXRMZW5ndGhJbkJpdHMiLCJ3cml0ZSIsInRvdGFsRGF0YUNvdW50IiwiRXJyb3IiLCJwdXRCaXQiLCJtb2RlIiwibmV3RGF0YSIsInFyTnVtYmVyIiwicXJBbHBoYU51bSIsInFyOEJpdEJ5dGUiLCJxckthbmppIiwicHVzaCIsImlzRGFyayIsImdldE1vZHVsZUNvdW50IiwiY3JlYXRlVGFibGVUYWciLCJjZWxsU2l6ZSIsIm1hcmdpbiIsInFySHRtbCIsImNyZWF0ZVN2Z1RhZyIsInNpemUiLCJtYyIsIm1yIiwicXJTdmciLCJyZWN0IiwiY3JlYXRlSW1nVGFnIiwibWluIiwic3RyaW5nVG9CeXRlcyIsInMiLCJieXRlcyIsImNoYXJDb2RlQXQiLCJjcmVhdGVTdHJpbmdUb0J5dGVzIiwidW5pY29kZURhdGEiLCJudW1DaGFycyIsInVuaWNvZGVNYXAiLCJiaW4iLCJiYXNlNjREZWNvZGVJbnB1dFN0cmVhbSIsInJlYWQiLCJiIiwiY291bnQiLCJiMCIsImIxIiwiYjIiLCJiMyIsImsiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ2IiwidW5rbm93bkNoYXIiLCJjaGFyQXQiLCJRUk1vZGUiLCJNT0RFX05VTUJFUiIsIk1PREVfQUxQSEFfTlVNIiwiTU9ERV84QklUX0JZVEUiLCJNT0RFX0tBTkpJIiwiTCIsIk0iLCJRIiwiSCIsIlFSTWFza1BhdHRlcm4iLCJQQVRURVJOMDAwIiwiUEFUVEVSTjAwMSIsIlBBVFRFUk4wMTAiLCJQQVRURVJOMDExIiwiUEFUVEVSTjEwMCIsIlBBVFRFUk4xMDEiLCJQQVRURVJOMTEwIiwiUEFUVEVSTjExMSIsIlBBVFRFUk5fUE9TSVRJT05fVEFCTEUiLCJHMTUiLCJHMTgiLCJHMTVfTUFTSyIsImdldEJDSERpZ2l0IiwiZGlnaXQiLCJkIiwiZXJyb3JDb3JyZWN0TGVuZ3RoIiwiYSIsIm11bHRpcGx5IiwiUVJNYXRoIiwiZ2V4cCIsInR5cGUiLCJzYW1lQ291bnQiLCJkYXJrQ291bnQiLCJyYXRpbyIsImFicyIsIkVYUF9UQUJMRSIsIkxPR19UQUJMRSIsImdsb2ciLCJuIiwibnVtIiwic2hpZnQiLCJfbnVtIiwiZSIsIlJTX0JMT0NLX1RBQkxFIiwicXJSU0Jsb2NrIiwiZ2V0UnNCbG9ja1RhYmxlIiwidW5kZWZpbmVkIiwicnNCbG9jayIsImxpc3QiLCJfYnVmZmVyIiwiX2xlbmd0aCIsImJ1ZkluZGV4IiwiYml0IiwiX21vZGUiLCJfZGF0YSIsInN0clRvTnVtIiwic3Vic3RyaW5nIiwiY2hhdFRvTnVtIiwiZ2V0Q29kZSIsIl9ieXRlcyIsImNvZGUiLCJieXRlQXJyYXlPdXRwdXRTdHJlYW0iLCJ3cml0ZUJ5dGUiLCJ3cml0ZVNob3J0Iiwid3JpdGVCeXRlcyIsIm9mZiIsImxlbiIsIndyaXRlU3RyaW5nIiwidG9CeXRlQXJyYXkiLCJ0b1N0cmluZyIsImJhc2U2NEVuY29kZU91dHB1dFN0cmVhbSIsIl9idWZsZW4iLCJfYmFzZTY0Iiwid3JpdGVFbmNvZGVkIiwiZW5jb2RlIiwiZmx1c2giLCJwYWRsZW4iLCJzdHIiLCJfc3RyIiwiX3BvcyIsIm1hdGNoIiwiZGVjb2RlIiwiZ2lmSW1hZ2UiLCJfd2lkdGgiLCJfaGVpZ2h0Iiwic2V0UGl4ZWwiLCJwaXhlbCIsIm91dCIsImx6d01pbkNvZGVTaXplIiwicmFzdGVyIiwiZ2V0TFpXUmFzdGVyIiwiYml0T3V0cHV0U3RyZWFtIiwiX291dCIsIl9iaXRMZW5ndGgiLCJfYml0QnVmZmVyIiwiY2xlYXJDb2RlIiwiZW5kQ29kZSIsImJpdExlbmd0aCIsInRhYmxlIiwibHp3VGFibGUiLCJhZGQiLCJieXRlT3V0IiwiYml0T3V0IiwiZGF0YUluZGV4IiwiY29udGFpbnMiLCJpbmRleE9mIiwiX21hcCIsIl9zaXplIiwia2V5IiwiZ2V0UGl4ZWwiLCJhbHQiLCJnaWYiLCJiYXNlNjQiLCJpbWciLCJRUkNvZGUiLCJmYWN0b3J5IiwiZGVmaW5lIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlV0aWwiLCJpbWFnZSIsImNhbnZhcyIsImciXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOztBQUNBOzs7Ozs7S0FFTUEsSTtBQUNKLG1CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLGFBQUksT0FBT0EsT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNoQyxtQkFBTSxJQUFJQyxTQUFKLENBQWMsMEJBQWQsQ0FBTjtBQUNILFVBRkQsTUFFTyxJQUFJLE9BQU9ELFFBQVFFLEtBQWYsS0FBeUIsV0FBN0IsRUFBMEM7QUFDN0MsbUJBQU0sSUFBSUQsU0FBSixDQUFjLCtCQUFkLENBQU47QUFDSCxVQUZNLE1BRUEsSUFBSSxPQUFPRCxRQUFRRyxTQUFmLEtBQTZCLFdBQWpDLEVB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R0FBTCxFQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBaE9tQixFQWlPbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBak9tQixFQWtPbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBbE9tQixFQW1PbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBbk9tQixFQXNPbkIsQ0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEdBQVQsRUFBYyxFQUFkLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBdE9tQixFQXVPbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBdk9tQixFQXdPbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBeE9tQixFQXlPbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBek9tQixFQTRPbkIsQ0FBQyxFQUFELEVBQUssR0FBTCxFQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBNU9tQixFQTZPbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBN09tQixFQThPbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBOU9tQixFQStPbkIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFC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Ozs7QUNkQSwwQzs7Ozs7O0FDQUEsZUFBYyxzQjs7Ozs7O0FDQWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQSxtQkFBa0I7O0FBRWxCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxVQUFVO0FBQ2I7QUFDQSxHOzs7Ozs7Ozs7Ozs7QUNmQSwwQzs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0NBTW9OLEk7Ozs7Ozs7a0NBQ2dCckosSSxFQUFNc0osSyxFQUFPO0FBQy9CLFdBQUlDLFNBQVN0UixTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQXFSLGNBQU96UixLQUFQLEdBQWVrSSxJQUFmO0FBQ0F1SixjQUFPeFIsTUFBUCxHQUFnQmlJLElBQWhCO0FBQ0F1SixjQUFPcFIsVUFBUCxDQUFrQixJQUFsQixFQUF3QkMsU0FBeEIsQ0FBa0NrUixLQUFsQyxFQUF5QyxDQUF6QyxFQUE0QyxDQUE1QyxFQUErQ3RKLElBQS9DLEVBQXFEQSxJQUFyRDtBQUNBLGNBQU91SixNQUFQO0FBQ0Q7OzsrQkFFZ0I1TixDLEVBQUc2TixDLEVBQUd0SSxDLEVBQUd4SyxLLEVBQU87QUFDL0IsY0FBUSxTQUFPaUYsQ0FBUCxHQUFXLFNBQU82TixDQUFsQixHQUFzQixTQUFPdEksQ0FBN0IsSUFBa0N4SyxLQUFuQyxHQUE0QyxHQUE1QyxHQUFrRCxDQUF6RDtBQUNEOzs7OzttQkFHWTJTLEkiLCJmaWxlIjoicWFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInFhcnRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wicWFydFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuLi9kaXN0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZlOTU1NjJhMjA1MTQyZWNkN2ViIiwiaW1wb3J0IHtRUkNvZGUsIFFSVXRpbH0gZnJvbSAnLi9xcmNvZGUnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcblxuY2xhc3MgUUFydCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1FBcnQgcmVxdWlyZWQgYG9wdGlvbnNgLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMudmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1FBcnQgcmVxdWlyZWQgYHZhbHVlYCBvcHRpb24uJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbWFnZVBhdGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1FBcnQgcmVxdWlyZWQgYGltYWdlUGF0aGAgb3B0aW9uLicpXG4gICAgfVxuXG4gICAgLy8gdGhpcy5zaXplID0gKHR5cGVvZiBvcHRpb25zLnNpemUgPT09ICd1bmRlZmluZWQnKSA/IFFBcnQuREVGQVVMVFMuc2l6ZSA6IG9wdGlvbnMuc2l6ZTtcbiAgICB0aGlzLmZpbHRlciA9ICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICd1bmRlZmluZWQnKSA/IFFBcnQuREVGQVVMVFMuZmlsdGVyIDogb3B0aW9ucy5maWx0ZXI7XG4gICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWU7XG4gICAgdGhpcy5pbWFnZVBhdGggPSBvcHRpb25zLmltYWdlUGF0aDtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgREVGQVVMVFMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIHNpemU6IDEwMCxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIGZpbHRlcjogJ3RocmVzaG9sZCdcbiAgICB9XG4gIH1cblxuICBtYWtlKGVsKSB7XG4gICAgdmFyIGltYWdlU2l6ZSA9IDE5NTtcbiAgICB2YXIgcGFkZGluZyA9IDEyO1xuXG4gICAgdmFyIHFyID0gUVJDb2RlKDEwLCAnSCcpO1xuICAgIHFyLmFkZERhdGEodGhpcy52YWx1ZSk7XG4gICAgcXIubWFrZSgpO1xuICAgIHZhciBxckltYWdlID0gcXIuY3JlYXRlSW1nT2JqZWN0KDMpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHFySW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb3ZlckltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGNvdmVySW1hZ2Uuc3JjID0gc2VsZi5pbWFnZVBhdGg7XG5cbiAgICAgICAgdmFyIHJlc3VsdENhbnZhcyA9IFV0aWwuY3JlYXRlQ2FudmFzKGltYWdlU2l6ZSwgcXJJbWFnZSk7XG4gICAgICAgIHZhciBxckNhbnZhcyA9IFV0aWwuY3JlYXRlQ2FudmFzKGltYWdlU2l6ZSwgcXJJbWFnZSk7XG5cbiAgICAgICAgY292ZXJJbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb3ZlckltYWdlLndpZHRoIDwgY292ZXJJbWFnZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjb3ZlckltYWdlLmhlaWdodCA9IChpbWFnZVNpemUgLSBwYWRkaW5nICogMikgKiAoMS4wICogY292ZXJJbWFnZS5oZWlnaHQgLyBjb3ZlckltYWdlLndpZHRoKTtcbiAgICAgICAgICAgICAgICBjb3ZlckltYWdlLndpZHRoID0gaW1hZ2VTaXplIC0gcGFkZGluZyAqIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdmVySW1hZ2Uud2lkdGggPSAoaW1hZ2VTaXplIC0gcGFkZGluZyAqIDIpICogKDEuMCAqIGNvdmVySW1hZ2Uud2lkdGggLyBjb3ZlckltYWdlLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgY292ZXJJbWFnZS5oZWlnaHQgPSBpbWFnZVNpemUgLSBwYWRkaW5nICogMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvdmVyQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBjb3ZlckNhbnZhcy53aWR0aCA9IGltYWdlU2l6ZTtcbiAgICAgICAgICAgIGNvdmVyQ2FudmFzLmhlaWdodCA9IGltYWdlU2l6ZTtcbiAgICAgICAgICAgIGNvdmVyQ2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKGNvdmVySW1hZ2UsIHBhZGRpbmcsIHBhZGRpbmcsIGltYWdlU2l6ZSAtIHBhZGRpbmcgKiAyLCBpbWFnZVNpemUgLSBwYWRkaW5nICogMilcblxuICAgICAgICAgICAgdmFyIGNvdmVySW1hZ2VEYXRhID0gY292ZXJDYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5nZXRJbWFnZURhdGEoMCwgMCwgaW1hZ2VTaXplLCBpbWFnZVNpemUpO1xuICAgICAgICAgICAgdmFyIGNvdmVySW1hZ2VCaW5hcnkgPSBjb3ZlckltYWdlRGF0YS5kYXRhO1xuICAgICAgICAgICAgdmFyIHJlc3VsdEltYWdlRGF0YSA9IHJlc3VsdENhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmdldEltYWdlRGF0YSgwLCAwLCBpbWFnZVNpemUsIGltYWdlU2l6ZSk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0SW1hZ2VCaW5hcnkgPSByZXN1bHRJbWFnZURhdGEuZGF0YTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3ZlckltYWdlQmluYXJ5Lmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKGkgLyA0KSAlIGltYWdlU2l6ZTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihpIC8gNCkgLyBpbWFnZVNpemUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHglMyA9PSAxICYmIHklMyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeCA8IDM2ICYmICh5IDwgMzYgfHwgeSA+PSBpbWFnZVNpemUtMzYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeCA+PSBpbWFnZVNpemUtMzYgJiYgeSA8IDM2KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmZpbHRlciA9PSAndGhyZXNob2xkJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmFjdG9yID0gVXRpbC50aHJlc2hvbGQoY292ZXJJbWFnZUJpbmFyeVtpXSwgY292ZXJJbWFnZUJpbmFyeVtpKzFdLCBjb3ZlckltYWdlQmluYXJ5W2krMl0sIDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEltYWdlQmluYXJ5W2ldID0gZmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRJbWFnZUJpbmFyeVtpKzFdID0gZmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRJbWFnZUJpbmFyeVtpKzJdID0gZmFjdG9yO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5maWx0ZXIgPT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRJbWFnZUJpbmFyeVtpXSA9IGNvdmVySW1hZ2VCaW5hcnlbaV07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEltYWdlQmluYXJ5W2krMV0gPSBjb3ZlckltYWdlQmluYXJ5W2krMV07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEltYWdlQmluYXJ5W2krMl0gPSBjb3ZlckltYWdlQmluYXJ5W2krMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdEltYWdlQmluYXJ5W2krM10gPSBjb3ZlckltYWdlQmluYXJ5W2krM107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdENhbnZhcy5nZXRDb250ZXh0KCcyZCcpLnB1dEltYWdlRGF0YShyZXN1bHRJbWFnZURhdGEsIDAsIDApO1xuXG4gICAgICAgICAgICB2YXIgcGF0dGVyblBvc3Rpb24gPSBRUlV0aWwuZ2V0UGF0dGVyblBvc2l0aW9uKDEwKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0dGVyblBvc3Rpb24ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhdHRlcm5Qb3N0aW9uLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4ID0gcGF0dGVyblBvc3Rpb25baV07XG4gICAgICAgICAgICAgICAgICAgIHZhciB5ID0gcGF0dGVyblBvc3Rpb25bal07XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCh4ID09IDYgJiYgeSA9PSA1MCkgfHwgKHkgPT0gNiAmJiB4ID09IDUwKSB8fCAoeCA9PSA2ICYmIHkgPT0gNikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjdFggPSAzICogKHgtMikgKyAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWN0WSA9IDMgKiAoeS0yKSArIDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY3RXaWR0aCA9ICgzICogKHgrMykgKyAxMikgLSByZWN0WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWN0SGVpZ2h0ID0gKDMgKiAoeSszKSArIDEyKSAtIHJlY3RZO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjdERhdGEgPSBxckNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmdldEltYWdlRGF0YShyZWN0WCwgcmVjdFksIHJlY3RXaWR0aCwgcmVjdEhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRDYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5wdXRJbWFnZURhdGEocmVjdERhdGEsIHJlY3RYLCByZWN0WSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlc3VsdENhbnZhcy53aWR0aCA9IHNlbGYuc2l6ZTtcbiAgICAgICAgICAgIC8vIHJlc3VsdENhbnZhcy5oZWlnaHQgPSBzZWxmLnNpemU7XG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHJlc3VsdENhbnZhcyk7XG4gICAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5RQXJ0ID0gUUFydDtcbmV4cG9ydCBkZWZhdWx0IHdpbmRvdy5RQXJ0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3FhcnQuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vL1xuLy8gUVIgQ29kZSBHZW5lcmF0b3IgZm9yIEphdmFTY3JpcHRcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgS2F6dWhpa28gQXJhc2Vcbi8vXG4vLyBVUkw6IGh0dHA6Ly93d3cuZC1wcm9qZWN0LmNvbS9cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4vLyAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbi8vXG4vLyBUaGUgd29yZCAnUVIgQ29kZScgaXMgcmVnaXN0ZXJlZCB0cmFkZW1hcmsgb2Zcbi8vIERFTlNPIFdBVkUgSU5DT1JQT1JBVEVEXG4vLyAgaHR0cDovL3d3dy5kZW5zby13YXZlLmNvbS9xcmNvZGUvZmFxcGF0ZW50LWUuaHRtbFxuLy9cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBxcmNvZGUgPSBmdW5jdGlvbigpIHtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBxcmNvZGVcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogcXJjb2RlXG4gICAqIEBwYXJhbSB0eXBlTnVtYmVyIDEgdG8gNDBcbiAgICogQHBhcmFtIGVycm9yQ29ycmVjdGlvbkxldmVsICdMJywnTScsJ1EnLCdIJ1xuICAgKi9cbiAgdmFyIHFyY29kZSA9IGZ1bmN0aW9uKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdGlvbkxldmVsKSB7XG5cbiAgICB2YXIgUEFEMCA9IDB4RUM7XG4gICAgdmFyIFBBRDEgPSAweDExO1xuXG4gICAgdmFyIF90eXBlTnVtYmVyID0gdHlwZU51bWJlcjtcbiAgICB2YXIgX2Vycm9yQ29ycmVjdGlvbkxldmVsID0gUVJFcnJvckNvcnJlY3Rpb25MZXZlbFtlcnJvckNvcnJlY3Rpb25MZXZlbF07XG4gICAgdmFyIF9tb2R1bGVzID0gbnVsbDtcbiAgICB2YXIgX21vZHVsZUNvdW50ID0gMDtcbiAgICB2YXIgX2RhdGFDYWNoZSA9IG51bGw7XG4gICAgdmFyIF9kYXRhTGlzdCA9IG5ldyBBcnJheSgpO1xuXG4gICAgdmFyIF90aGlzID0ge307XG5cbiAgICB2YXIgbWFrZUltcGwgPSBmdW5jdGlvbih0ZXN0LCBtYXNrUGF0dGVybikge1xuXG4gICAgICBfbW9kdWxlQ291bnQgPSBfdHlwZU51bWJlciAqIDQgKyAxNztcbiAgICAgIF9tb2R1bGVzID0gZnVuY3Rpb24obW9kdWxlQ291bnQpIHtcbiAgICAgICAgdmFyIG1vZHVsZXMgPSBuZXcgQXJyYXkobW9kdWxlQ291bnQpO1xuICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93ICs9IDEpIHtcbiAgICAgICAgICBtb2R1bGVzW3Jvd10gPSBuZXcgQXJyYXkobW9kdWxlQ291bnQpO1xuICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50OyBjb2wgKz0gMSkge1xuICAgICAgICAgICAgbW9kdWxlc1tyb3ddW2NvbF0gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9kdWxlcztcbiAgICAgIH0oX21vZHVsZUNvdW50KTtcblxuICAgICAgc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybigwLCAwKTtcbiAgICAgIHNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oX21vZHVsZUNvdW50IC0gNywgMCk7XG4gICAgICBzZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuKDAsIF9tb2R1bGVDb3VudCAtIDcpO1xuICAgICAgc2V0dXBQb3NpdGlvbkFkanVzdFBhdHRlcm4oKTtcbiAgICAgIHNldHVwVGltaW5nUGF0dGVybigpO1xuICAgICAgc2V0dXBUeXBlSW5mbyh0ZXN0LCBtYXNrUGF0dGVybik7XG5cbiAgICAgIGlmIChfdHlwZU51bWJlciA+PSA3KSB7XG4gICAgICAgIHNldHVwVHlwZU51bWJlcih0ZXN0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9kYXRhQ2FjaGUgPT0gbnVsbCkge1xuICAgICAgICBfZGF0YUNhY2hlID0gY3JlYXRlRGF0YShfdHlwZU51bWJlciwgX2Vycm9yQ29ycmVjdGlvbkxldmVsLCBfZGF0YUxpc3QpO1xuICAgICAgfVxuXG4gICAgICBtYXBEYXRhKF9kYXRhQ2FjaGUsIG1hc2tQYXR0ZXJuKTtcbiAgICB9O1xuXG4gICAgdmFyIHNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4gPSBmdW5jdGlvbihyb3csIGNvbCkge1xuXG4gICAgICBmb3IgKHZhciByID0gLTE7IHIgPD0gNzsgciArPSAxKSB7XG5cbiAgICAgICAgaWYgKHJvdyArIHIgPD0gLTEgfHwgX21vZHVsZUNvdW50IDw9IHJvdyArIHIpIGNvbnRpbnVlO1xuXG4gICAgICAgIGZvciAodmFyIGMgPSAtMTsgYyA8PSA3OyBjICs9IDEpIHtcblxuICAgICAgICAgIGlmIChjb2wgKyBjIDw9IC0xIHx8IF9tb2R1bGVDb3VudCA8PSBjb2wgKyBjKSBjb250aW51ZTtcblxuICAgICAgICAgIGlmICggKDAgPD0gciAmJiByIDw9IDYgJiYgKGMgPT0gMCB8fCBjID09IDYpIClcbiAgICAgICAgICAgICAgfHwgKDAgPD0gYyAmJiBjIDw9IDYgJiYgKHIgPT0gMCB8fCByID09IDYpIClcbiAgICAgICAgICAgICAgfHwgKDIgPD0gciAmJiByIDw9IDQgJiYgMiA8PSBjICYmIGMgPD0gNCkgKSB7XG4gICAgICAgICAgICBfbW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXSA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXRCZXN0TWFza1BhdHRlcm4gPSBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIG1pbkxvc3RQb2ludCA9IDA7XG4gICAgICB2YXIgcGF0dGVybiA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSArPSAxKSB7XG5cbiAgICAgICAgbWFrZUltcGwodHJ1ZSwgaSk7XG5cbiAgICAgICAgdmFyIGxvc3RQb2ludCA9IFFSVXRpbC5nZXRMb3N0UG9pbnQoX3RoaXMpO1xuXG4gICAgICAgIGlmIChpID09IDAgfHwgbWluTG9zdFBvaW50ID4gbG9zdFBvaW50KSB7XG4gICAgICAgICAgbWluTG9zdFBvaW50ID0gbG9zdFBvaW50O1xuICAgICAgICAgIHBhdHRlcm4gPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH07XG5cbiAgICB2YXIgc2V0dXBUaW1pbmdQYXR0ZXJuID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIGZvciAodmFyIHIgPSA4OyByIDwgX21vZHVsZUNvdW50IC0gODsgciArPSAxKSB7XG4gICAgICAgIGlmIChfbW9kdWxlc1tyXVs2XSAhPSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgX21vZHVsZXNbcl1bNl0gPSAociAlIDIgPT0gMCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGMgPSA4OyBjIDwgX21vZHVsZUNvdW50IC0gODsgYyArPSAxKSB7XG4gICAgICAgIGlmIChfbW9kdWxlc1s2XVtjXSAhPSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgX21vZHVsZXNbNl1bY10gPSAoYyAlIDIgPT0gMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBzZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgcG9zID0gUVJVdGlsLmdldFBhdHRlcm5Qb3NpdGlvbihfdHlwZU51bWJlcik7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgaSArPSAxKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwb3MubGVuZ3RoOyBqICs9IDEpIHtcblxuICAgICAgICAgIHZhciByb3cgPSBwb3NbaV07XG4gICAgICAgICAgdmFyIGNvbCA9IHBvc1tqXTtcblxuICAgICAgICAgIGlmIChfbW9kdWxlc1tyb3ddW2NvbF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yICh2YXIgciA9IC0yOyByIDw9IDI7IHIgKz0gMSkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBjID0gLTI7IGMgPD0gMjsgYyArPSAxKSB7XG5cbiAgICAgICAgICAgICAgaWYgKHIgPT0gLTIgfHwgciA9PSAyIHx8IGMgPT0gLTIgfHwgYyA9PSAyXG4gICAgICAgICAgICAgICAgICB8fCAociA9PSAwICYmIGMgPT0gMCkgKSB7XG4gICAgICAgICAgICAgICAgX21vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHNldHVwVHlwZU51bWJlciA9IGZ1bmN0aW9uKHRlc3QpIHtcblxuICAgICAgdmFyIGJpdHMgPSBRUlV0aWwuZ2V0QkNIVHlwZU51bWJlcihfdHlwZU51bWJlcik7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkgKz0gMSkge1xuICAgICAgICB2YXIgbW9kID0gKCF0ZXN0ICYmICggKGJpdHMgPj4gaSkgJiAxKSA9PSAxKTtcbiAgICAgICAgX21vZHVsZXNbTWF0aC5mbG9vcihpIC8gMyldW2kgJSAzICsgX21vZHVsZUNvdW50IC0gOCAtIDNdID0gbW9kO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE4OyBpICs9IDEpIHtcbiAgICAgICAgdmFyIG1vZCA9ICghdGVzdCAmJiAoIChiaXRzID4+IGkpICYgMSkgPT0gMSk7XG4gICAgICAgIF9tb2R1bGVzW2kgJSAzICsgX21vZHVsZUNvdW50IC0gOCAtIDNdW01hdGguZmxvb3IoaSAvIDMpXSA9IG1vZDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHNldHVwVHlwZUluZm8gPSBmdW5jdGlvbih0ZXN0LCBtYXNrUGF0dGVybikge1xuXG4gICAgICB2YXIgZGF0YSA9IChfZXJyb3JDb3JyZWN0aW9uTGV2ZWwgPDwgMykgfCBtYXNrUGF0dGVybjtcbiAgICAgIHZhciBiaXRzID0gUVJVdGlsLmdldEJDSFR5cGVJbmZvKGRhdGEpO1xuXG4gICAgICAvLyB2ZXJ0aWNhbFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSArPSAxKSB7XG5cbiAgICAgICAgdmFyIG1vZCA9ICghdGVzdCAmJiAoIChiaXRzID4+IGkpICYgMSkgPT0gMSk7XG5cbiAgICAgICAgaWYgKGkgPCA2KSB7XG4gICAgICAgICAgX21vZHVsZXNbaV1bOF0gPSBtb2Q7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA8IDgpIHtcbiAgICAgICAgICBfbW9kdWxlc1tpICsgMV1bOF0gPSBtb2Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX21vZHVsZXNbX21vZHVsZUNvdW50IC0gMTUgKyBpXVs4XSA9IG1vZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBob3Jpem9udGFsXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpICs9IDEpIHtcblxuICAgICAgICB2YXIgbW9kID0gKCF0ZXN0ICYmICggKGJpdHMgPj4gaSkgJiAxKSA9PSAxKTtcblxuICAgICAgICBpZiAoaSA8IDgpIHtcbiAgICAgICAgICBfbW9kdWxlc1s4XVtfbW9kdWxlQ291bnQgLSBpIC0gMV0gPSBtb2Q7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA8IDkpIHtcbiAgICAgICAgICBfbW9kdWxlc1s4XVsxNSAtIGkgLSAxICsgMV0gPSBtb2Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX21vZHVsZXNbOF1bMTUgLSBpIC0gMV0gPSBtb2Q7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gZml4ZWQgbW9kdWxlXG4gICAgICBfbW9kdWxlc1tfbW9kdWxlQ291bnQgLSA4XVs4XSA9ICghdGVzdCk7XG4gICAgfTtcblxuICAgIHZhciBtYXBEYXRhID0gZnVuY3Rpb24oZGF0YSwgbWFza1BhdHRlcm4pIHtcblxuICAgICAgdmFyIGluYyA9IC0xO1xuICAgICAgdmFyIHJvdyA9IF9tb2R1bGVDb3VudCAtIDE7XG4gICAgICB2YXIgYml0SW5kZXggPSA3O1xuICAgICAgdmFyIGJ5dGVJbmRleCA9IDA7XG4gICAgICB2YXIgbWFza0Z1bmMgPSBRUlV0aWwuZ2V0TWFza0Z1bmN0aW9uKG1hc2tQYXR0ZXJuKTtcblxuICAgICAgZm9yICh2YXIgY29sID0gX21vZHVsZUNvdW50IC0gMTsgY29sID4gMDsgY29sIC09IDIpIHtcblxuICAgICAgICBpZiAoY29sID09IDYpIGNvbCAtPSAxO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG5cbiAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IDI7IGMgKz0gMSkge1xuXG4gICAgICAgICAgICBpZiAoX21vZHVsZXNbcm93XVtjb2wgLSBjXSA9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgdmFyIGRhcmsgPSBmYWxzZTtcblxuICAgICAgICAgICAgICBpZiAoYnl0ZUluZGV4IDwgZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkYXJrID0gKCAoIChkYXRhW2J5dGVJbmRleF0gPj4+IGJpdEluZGV4KSAmIDEpID09IDEpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIG1hc2sgPSBtYXNrRnVuYyhyb3csIGNvbCAtIGMpO1xuXG4gICAgICAgICAgICAgIGlmIChtYXNrKSB7XG4gICAgICAgICAgICAgICAgZGFyayA9ICFkYXJrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX21vZHVsZXNbcm93XVtjb2wgLSBjXSA9IGRhcms7XG4gICAgICAgICAgICAgIGJpdEluZGV4IC09IDE7XG5cbiAgICAgICAgICAgICAgaWYgKGJpdEluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgYnl0ZUluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgYml0SW5kZXggPSA3O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm93ICs9IGluYztcblxuICAgICAgICAgIGlmIChyb3cgPCAwIHx8IF9tb2R1bGVDb3VudCA8PSByb3cpIHtcbiAgICAgICAgICAgIHJvdyAtPSBpbmM7XG4gICAgICAgICAgICBpbmMgPSAtaW5jO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBjcmVhdGVCeXRlcyA9IGZ1bmN0aW9uKGJ1ZmZlciwgcnNCbG9ja3MpIHtcblxuICAgICAgdmFyIG9mZnNldCA9IDA7XG5cbiAgICAgIHZhciBtYXhEY0NvdW50ID0gMDtcbiAgICAgIHZhciBtYXhFY0NvdW50ID0gMDtcblxuICAgICAgdmFyIGRjZGF0YSA9IG5ldyBBcnJheShyc0Jsb2Nrcy5sZW5ndGgpO1xuICAgICAgdmFyIGVjZGF0YSA9IG5ldyBBcnJheShyc0Jsb2Nrcy5sZW5ndGgpO1xuXG4gICAgICBmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgciArPSAxKSB7XG5cbiAgICAgICAgdmFyIGRjQ291bnQgPSByc0Jsb2Nrc1tyXS5kYXRhQ291bnQ7XG4gICAgICAgIHZhciBlY0NvdW50ID0gcnNCbG9ja3Nbcl0udG90YWxDb3VudCAtIGRjQ291bnQ7XG5cbiAgICAgICAgbWF4RGNDb3VudCA9IE1hdGgubWF4KG1heERjQ291bnQsIGRjQ291bnQpO1xuICAgICAgICBtYXhFY0NvdW50ID0gTWF0aC5tYXgobWF4RWNDb3VudCwgZWNDb3VudCk7XG5cbiAgICAgICAgZGNkYXRhW3JdID0gbmV3IEFycmF5KGRjQ291bnQpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGNkYXRhW3JdLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgZGNkYXRhW3JdW2ldID0gMHhmZiAmIGJ1ZmZlci5nZXRCdWZmZXIoKVtpICsgb2Zmc2V0XTtcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgKz0gZGNDb3VudDtcblxuICAgICAgICB2YXIgcnNQb2x5ID0gUVJVdGlsLmdldEVycm9yQ29ycmVjdFBvbHlub21pYWwoZWNDb3VudCk7XG4gICAgICAgIHZhciByYXdQb2x5ID0gcXJQb2x5bm9taWFsKGRjZGF0YVtyXSwgcnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG5cbiAgICAgICAgdmFyIG1vZFBvbHkgPSByYXdQb2x5Lm1vZChyc1BvbHkpO1xuICAgICAgICBlY2RhdGFbcl0gPSBuZXcgQXJyYXkocnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWNkYXRhW3JdLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgdmFyIG1vZEluZGV4ID0gaSArIG1vZFBvbHkuZ2V0TGVuZ3RoKCkgLSBlY2RhdGFbcl0ubGVuZ3RoO1xuICAgICAgICAgIGVjZGF0YVtyXVtpXSA9IChtb2RJbmRleCA+PSAwKT8gbW9kUG9seS5nZXRBdChtb2RJbmRleCkgOiAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB0b3RhbENvZGVDb3VudCA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRvdGFsQ29kZUNvdW50ICs9IHJzQmxvY2tzW2ldLnRvdGFsQ291bnQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRhID0gbmV3IEFycmF5KHRvdGFsQ29kZUNvdW50KTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4RGNDb3VudDsgaSArPSAxKSB7XG4gICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByICs9IDEpIHtcbiAgICAgICAgICBpZiAoaSA8IGRjZGF0YVtyXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGFbaW5kZXhdID0gZGNkYXRhW3JdW2ldO1xuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhFY0NvdW50OyBpICs9IDEpIHtcbiAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCByc0Jsb2Nrcy5sZW5ndGg7IHIgKz0gMSkge1xuICAgICAgICAgIGlmIChpIDwgZWNkYXRhW3JdLmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YVtpbmRleF0gPSBlY2RhdGFbcl1baV07XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZURhdGEgPSBmdW5jdGlvbih0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3Rpb25MZXZlbCwgZGF0YUxpc3QpIHtcblxuICAgICAgdmFyIHJzQmxvY2tzID0gUVJSU0Jsb2NrLmdldFJTQmxvY2tzKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdGlvbkxldmVsKTtcblxuICAgICAgdmFyIGJ1ZmZlciA9IHFyQml0QnVmZmVyKCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBkYXRhTGlzdFtpXTtcbiAgICAgICAgYnVmZmVyLnB1dChkYXRhLmdldE1vZGUoKSwgNCk7XG4gICAgICAgIGJ1ZmZlci5wdXQoZGF0YS5nZXRMZW5ndGgoKSwgUVJVdGlsLmdldExlbmd0aEluQml0cyhkYXRhLmdldE1vZGUoKSwgdHlwZU51bWJlcikgKTtcbiAgICAgICAgZGF0YS53cml0ZShidWZmZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxjIG51bSBtYXggZGF0YS5cbiAgICAgIHZhciB0b3RhbERhdGFDb3VudCA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRvdGFsRGF0YUNvdW50ICs9IHJzQmxvY2tzW2ldLmRhdGFDb3VudDtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA+IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvZGUgbGVuZ3RoIG92ZXJmbG93LiAoJ1xuICAgICAgICAgICsgYnVmZmVyLmdldExlbmd0aEluQml0cygpXG4gICAgICAgICAgKyAnPidcbiAgICAgICAgICArIHRvdGFsRGF0YUNvdW50ICogOFxuICAgICAgICAgICsgJyknKTtcbiAgICAgIH1cblxuICAgICAgLy8gZW5kIGNvZGVcbiAgICAgIGlmIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgKyA0IDw9IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICBidWZmZXIucHV0KDAsIDQpO1xuICAgICAgfVxuXG4gICAgICAvLyBwYWRkaW5nXG4gICAgICB3aGlsZSAoYnVmZmVyLmdldExlbmd0aEluQml0cygpICUgOCAhPSAwKSB7XG4gICAgICAgIGJ1ZmZlci5wdXRCaXQoZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBwYWRkaW5nXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuXG4gICAgICAgIGlmIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgPj0gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyLnB1dChQQUQwLCA4KTtcblxuICAgICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID49IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlci5wdXQoUEFEMSwgOCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjcmVhdGVCeXRlcyhidWZmZXIsIHJzQmxvY2tzKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuYWRkRGF0YSA9IGZ1bmN0aW9uKGRhdGEsIG1vZGUpIHtcblxuICAgICAgbW9kZSA9IG1vZGUgfHwgJ0J5dGUnO1xuXG4gICAgICB2YXIgbmV3RGF0YSA9IG51bGw7XG5cbiAgICAgIHN3aXRjaChtb2RlKSB7XG4gICAgICBjYXNlICdOdW1lcmljJyA6XG4gICAgICAgIG5ld0RhdGEgPSBxck51bWJlcihkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBbHBoYW51bWVyaWMnIDpcbiAgICAgICAgbmV3RGF0YSA9IHFyQWxwaGFOdW0oZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQnl0ZScgOlxuICAgICAgICBuZXdEYXRhID0gcXI4Qml0Qnl0ZShkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdLYW5qaScgOlxuICAgICAgICBuZXdEYXRhID0gcXJLYW5qaShkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0IDpcbiAgICAgICAgdGhyb3cgJ21vZGU6JyArIG1vZGU7XG4gICAgICB9XG5cbiAgICAgIF9kYXRhTGlzdC5wdXNoKG5ld0RhdGEpO1xuICAgICAgX2RhdGFDYWNoZSA9IG51bGw7XG4gICAgfTtcblxuICAgIF90aGlzLmlzRGFyayA9IGZ1bmN0aW9uKHJvdywgY29sKSB7XG4gICAgICBpZiAocm93IDwgMCB8fCBfbW9kdWxlQ291bnQgPD0gcm93IHx8IGNvbCA8IDAgfHwgX21vZHVsZUNvdW50IDw9IGNvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3Iocm93ICsgJywnICsgY29sKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfbW9kdWxlc1tyb3ddW2NvbF07XG4gICAgfTtcblxuICAgIF90aGlzLmdldE1vZHVsZUNvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gX21vZHVsZUNvdW50O1xuICAgIH07XG5cbiAgICBfdGhpcy5tYWtlID0gZnVuY3Rpb24oKSB7XG4gICAgICBtYWtlSW1wbChmYWxzZSwgZ2V0QmVzdE1hc2tQYXR0ZXJuKCkgKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuY3JlYXRlVGFibGVUYWcgPSBmdW5jdGlvbihjZWxsU2l6ZSwgbWFyZ2luKSB7XG5cbiAgICAgIGNlbGxTaXplID0gY2VsbFNpemUgfHwgMjtcbiAgICAgIG1hcmdpbiA9ICh0eXBlb2YgbWFyZ2luID09ICd1bmRlZmluZWQnKT8gY2VsbFNpemUgKiA0IDogbWFyZ2luO1xuXG4gICAgICB2YXIgcXJIdG1sID0gJyc7XG5cbiAgICAgIHFySHRtbCArPSAnPHRhYmxlIHN0eWxlPVwiJztcbiAgICAgIHFySHRtbCArPSAnIGJvcmRlci13aWR0aDogMHB4OyBib3JkZXItc3R5bGU6IG5vbmU7JztcbiAgICAgIHFySHRtbCArPSAnIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7JztcbiAgICAgIHFySHRtbCArPSAnIHBhZGRpbmc6IDBweDsgbWFyZ2luOiAnICsgbWFyZ2luICsgJ3B4Oyc7XG4gICAgICBxckh0bWwgKz0gJ1wiPic7XG4gICAgICBxckh0bWwgKz0gJzx0Ym9keT4nO1xuXG4gICAgICBmb3IgKHZhciByID0gMDsgciA8IF90aGlzLmdldE1vZHVsZUNvdW50KCk7IHIgKz0gMSkge1xuXG4gICAgICAgIHFySHRtbCArPSAnPHRyPic7XG5cbiAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBfdGhpcy5nZXRNb2R1bGVDb3VudCgpOyBjICs9IDEpIHtcbiAgICAgICAgICBxckh0bWwgKz0gJzx0ZCBzdHlsZT1cIic7XG4gICAgICAgICAgcXJIdG1sICs9ICcgYm9yZGVyLXdpZHRoOiAwcHg7IGJvcmRlci1zdHlsZTogbm9uZTsnO1xuICAgICAgICAgIHFySHRtbCArPSAnIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7JztcbiAgICAgICAgICBxckh0bWwgKz0gJyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4Oyc7XG4gICAgICAgICAgcXJIdG1sICs9ICcgd2lkdGg6ICcgKyBjZWxsU2l6ZSArICdweDsnO1xuICAgICAgICAgIHFySHRtbCArPSAnIGhlaWdodDogJyArIGNlbGxTaXplICsgJ3B4Oyc7XG4gICAgICAgICAgcXJIdG1sICs9ICcgYmFja2dyb3VuZC1jb2xvcjogJztcbiAgICAgICAgICBxckh0bWwgKz0gX3RoaXMuaXNEYXJrKHIsIGMpPyAnIzAwMDAwMCcgOiAnI2ZmZmZmZic7XG4gICAgICAgICAgcXJIdG1sICs9ICc7JztcbiAgICAgICAgICBxckh0bWwgKz0gJ1wiLz4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcXJIdG1sICs9ICc8L3RyPic7XG4gICAgICB9XG5cbiAgICAgIHFySHRtbCArPSAnPC90Ym9keT4nO1xuICAgICAgcXJIdG1sICs9ICc8L3RhYmxlPic7XG5cbiAgICAgIHJldHVybiBxckh0bWw7XG4gICAgfTtcblxuICAgIF90aGlzLmNyZWF0ZVN2Z1RhZyA9IGZ1bmN0aW9uKGNlbGxTaXplLCBtYXJnaW4pIHtcblxuICAgICAgY2VsbFNpemUgPSBjZWxsU2l6ZSB8fCAyO1xuICAgICAgbWFyZ2luID0gKHR5cGVvZiBtYXJnaW4gPT0gJ3VuZGVmaW5lZCcpPyBjZWxsU2l6ZSAqIDQgOiBtYXJnaW47XG4gICAgICB2YXIgc2l6ZSA9IF90aGlzLmdldE1vZHVsZUNvdW50KCkgKiBjZWxsU2l6ZSArIG1hcmdpbiAqIDI7XG4gICAgICB2YXIgYywgbWMsIHIsIG1yLCBxclN2Zz0nJywgcmVjdDtcblxuICAgICAgcmVjdCA9ICdsJyArIGNlbGxTaXplICsgJywwIDAsJyArIGNlbGxTaXplICtcbiAgICAgICAgJyAtJyArIGNlbGxTaXplICsgJywwIDAsLScgKyBjZWxsU2l6ZSArICd6ICc7XG5cbiAgICAgIHFyU3ZnICs9ICc8c3ZnJztcbiAgICAgIHFyU3ZnICs9ICcgd2lkdGg9XCInICsgc2l6ZSArICdweFwiJztcbiAgICAgIHFyU3ZnICs9ICcgaGVpZ2h0PVwiJyArIHNpemUgKyAncHhcIic7XG4gICAgICBxclN2ZyArPSAnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIic7XG4gICAgICBxclN2ZyArPSAnPic7XG4gICAgICBxclN2ZyArPSAnPHBhdGggZD1cIic7XG5cbiAgICAgIGZvciAociA9IDA7IHIgPCBfdGhpcy5nZXRNb2R1bGVDb3VudCgpOyByICs9IDEpIHtcbiAgICAgICAgbXIgPSByICogY2VsbFNpemUgKyBtYXJnaW47XG4gICAgICAgIGZvciAoYyA9IDA7IGMgPCBfdGhpcy5nZXRNb2R1bGVDb3VudCgpOyBjICs9IDEpIHtcbiAgICAgICAgICBpZiAoX3RoaXMuaXNEYXJrKHIsIGMpICkge1xuICAgICAgICAgICAgbWMgPSBjKmNlbGxTaXplK21hcmdpbjtcbiAgICAgICAgICAgIHFyU3ZnICs9ICdNJyArIG1jICsgJywnICsgbXIgKyByZWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBxclN2ZyArPSAnXCIgc3Ryb2tlPVwidHJhbnNwYXJlbnRcIiBmaWxsPVwiYmxhY2tcIi8+JztcbiAgICAgIHFyU3ZnICs9ICc8L3N2Zz4nO1xuXG4gICAgICByZXR1cm4gcXJTdmc7XG4gICAgfTtcblxuICAgIF90aGlzLmNyZWF0ZUltZ1RhZyA9IGZ1bmN0aW9uKGNlbGxTaXplLCBtYXJnaW4pIHtcblxuICAgICAgY2VsbFNpemUgPSBjZWxsU2l6ZSB8fCAyO1xuICAgICAgbWFyZ2luID0gKHR5cGVvZiBtYXJnaW4gPT0gJ3VuZGVmaW5lZCcpPyBjZWxsU2l6ZSAqIDQgOiBtYXJnaW47XG5cbiAgICAgIHZhciBzaXplID0gX3RoaXMuZ2V0TW9kdWxlQ291bnQoKSAqIGNlbGxTaXplICsgbWFyZ2luICogMjtcbiAgICAgIHZhciBtaW4gPSBtYXJnaW47XG4gICAgICB2YXIgbWF4ID0gc2l6ZSAtIG1hcmdpbjtcblxuICAgICAgcmV0dXJuIGNyZWF0ZUltZ1RhZyhzaXplLCBzaXplLCBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmIChtaW4gPD0geCAmJiB4IDwgbWF4ICYmIG1pbiA8PSB5ICYmIHkgPCBtYXgpIHtcbiAgICAgICAgICB2YXIgYyA9IE1hdGguZmxvb3IoICh4IC0gbWluKSAvIGNlbGxTaXplKTtcbiAgICAgICAgICB2YXIgciA9IE1hdGguZmxvb3IoICh5IC0gbWluKSAvIGNlbGxTaXplKTtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuaXNEYXJrKHIsIGMpPyAwIDogMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH07XG5cbiAgICBfdGhpcy5jcmVhdGVJbWdPYmplY3QgPSBmdW5jdGlvbihjZWxsU2l6ZSwgbWFyZ2luKSB7XG5cbiAgICAgIGNlbGxTaXplID0gY2VsbFNpemUgfHwgMjtcbiAgICAgIG1hcmdpbiA9ICh0eXBlb2YgbWFyZ2luID09ICd1bmRlZmluZWQnKT8gY2VsbFNpemUgKiA0IDogbWFyZ2luO1xuXG4gICAgICB2YXIgc2l6ZSA9IF90aGlzLmdldE1vZHVsZUNvdW50KCkgKiBjZWxsU2l6ZSArIG1hcmdpbiAqIDI7XG4gICAgICB2YXIgbWluID0gbWFyZ2luO1xuICAgICAgdmFyIG1heCA9IHNpemUgLSBtYXJnaW47XG5cbiAgICAgIHJldHVybiBjcmVhdGVJbWdPYmplY3Qoc2l6ZSwgc2l6ZSwgZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAobWluIDw9IHggJiYgeCA8IG1heCAmJiBtaW4gPD0geSAmJiB5IDwgbWF4KSB7XG4gICAgICAgICAgdmFyIGMgPSBNYXRoLmZsb29yKCAoeCAtIG1pbikgLyBjZWxsU2l6ZSk7XG4gICAgICAgICAgdmFyIHIgPSBNYXRoLmZsb29yKCAoeSAtIG1pbikgLyBjZWxsU2l6ZSk7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmlzRGFyayhyLCBjKT8gMCA6IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgIH0gKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9O1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIHFyY29kZS5zdHJpbmdUb0J5dGVzXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcXJjb2RlLnN0cmluZ1RvQnl0ZXMgPSBmdW5jdGlvbihzKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IEFycmF5KCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdChpKTtcbiAgICAgIGJ5dGVzLnB1c2goYyAmIDB4ZmYpO1xuICAgIH1cbiAgICByZXR1cm4gYnl0ZXM7XG4gIH07XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gcXJjb2RlLmNyZWF0ZVN0cmluZ1RvQnl0ZXNcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogQHBhcmFtIHVuaWNvZGVEYXRhIGJhc2U2NCBzdHJpbmcgb2YgYnl0ZSBhcnJheS5cbiAgICogWzE2Yml0IFVuaWNvZGVdLFsxNmJpdCBCeXRlc10sIC4uLlxuICAgKiBAcGFyYW0gbnVtQ2hhcnNcbiAgICovXG4gIHFyY29kZS5jcmVhdGVTdHJpbmdUb0J5dGVzID0gZnVuY3Rpb24odW5pY29kZURhdGEsIG51bUNoYXJzKSB7XG5cbiAgICAvLyBjcmVhdGUgY29udmVyc2lvbiBtYXAuXG5cbiAgICB2YXIgdW5pY29kZU1hcCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgYmluID0gYmFzZTY0RGVjb2RlSW5wdXRTdHJlYW0odW5pY29kZURhdGEpO1xuICAgICAgdmFyIHJlYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGIgPSBiaW4ucmVhZCgpO1xuICAgICAgICBpZiAoYiA9PSAtMSkgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgIHJldHVybiBiO1xuICAgICAgfTtcblxuICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgIHZhciB1bmljb2RlTWFwID0ge307XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgYjAgPSBiaW4ucmVhZCgpO1xuICAgICAgICBpZiAoYjAgPT0gLTEpIGJyZWFrO1xuICAgICAgICB2YXIgYjEgPSByZWFkKCk7XG4gICAgICAgIHZhciBiMiA9IHJlYWQoKTtcbiAgICAgICAgdmFyIGIzID0gcmVhZCgpO1xuICAgICAgICB2YXIgayA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIChiMCA8PCA4KSB8IGIxKTtcbiAgICAgICAgdmFyIHYgPSAoYjIgPDwgOCkgfCBiMztcbiAgICAgICAgdW5pY29kZU1hcFtrXSA9IHY7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoY291bnQgIT0gbnVtQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNvdW50ICsgJyAhPSAnICsgbnVtQ2hhcnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5pY29kZU1hcDtcbiAgICB9KCk7XG5cbiAgICB2YXIgdW5rbm93bkNoYXIgPSAnPycuY2hhckNvZGVBdCgwKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihzKSB7XG4gICAgICB2YXIgYnl0ZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgICAgICBieXRlcy5wdXNoKGMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBiID0gdW5pY29kZU1hcFtzLmNoYXJBdChpKV07XG4gICAgICAgICAgaWYgKHR5cGVvZiBiID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAoIChiICYgMHhmZikgPT0gYikge1xuICAgICAgICAgICAgICAvLyAxYnl0ZVxuICAgICAgICAgICAgICBieXRlcy5wdXNoKGIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gMmJ5dGVzXG4gICAgICAgICAgICAgIGJ5dGVzLnB1c2goYiA+Pj4gOCk7XG4gICAgICAgICAgICAgIGJ5dGVzLnB1c2goYiAmIDB4ZmYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKHVua25vd25DaGFyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9O1xuICB9O1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFFSTW9kZVxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHZhciBRUk1vZGUgPSB7XG4gICAgTU9ERV9OVU1CRVIgOiAgICAxIDw8IDAsXG4gICAgTU9ERV9BTFBIQV9OVU0gOiAxIDw8IDEsXG4gICAgTU9ERV84QklUX0JZVEUgOiAxIDw8IDIsXG4gICAgTU9ERV9LQU5KSSA6ICAgICAxIDw8IDNcbiAgfTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBRUkVycm9yQ29ycmVjdGlvbkxldmVsXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgdmFyIFFSRXJyb3JDb3JyZWN0aW9uTGV2ZWwgPSB7XG4gICAgTCA6IDEsXG4gICAgTSA6IDAsXG4gICAgUSA6IDMsXG4gICAgSCA6IDJcbiAgfTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBRUk1hc2tQYXR0ZXJuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgdmFyIFFSTWFza1BhdHRlcm4gPSB7XG4gICAgUEFUVEVSTjAwMCA6IDAsXG4gICAgUEFUVEVSTjAwMSA6IDEsXG4gICAgUEFUVEVSTjAxMCA6IDIsXG4gICAgUEFUVEVSTjAxMSA6IDMsXG4gICAgUEFUVEVSTjEwMCA6IDQsXG4gICAgUEFUVEVSTjEwMSA6IDUsXG4gICAgUEFUVEVSTjExMCA6IDYsXG4gICAgUEFUVEVSTjExMSA6IDdcbiAgfTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBRUlV0aWxcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICB2YXIgUVJVdGlsID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgUEFUVEVSTl9QT1NJVElPTl9UQUJMRSA9IFtcbiAgICAgIFtdLFxuICAgICAgWzYsIDE4XSxcbiAgICAgIFs2LCAyMl0sXG4gICAgICBbNiwgMjZdLFxuICAgICAgWzYsIDMwXSxcbiAgICAgIFs2LCAzNF0sXG4gICAgICBbNiwgMjIsIDM4XSxcbiAgICAgIFs2LCAyNCwgNDJdLFxuICAgICAgWzYsIDI2LCA0Nl0sXG4gICAgICBbNiwgMjgsIDUwXSxcbiAgICAgIFs2LCAzMCwgNTRdLFxuICAgICAgWzYsIDMyLCA1OF0sXG4gICAgICBbNiwgMzQsIDYyXSxcbiAgICAgIFs2LCAyNiwgNDYsIDY2XSxcbiAgICAgIFs2LCAyNiwgNDgsIDcwXSxcbiAgICAgIFs2LCAyNiwgNTAsIDc0XSxcbiAgICAgIFs2LCAzMCwgNTQsIDc4XSxcbiAgICAgIFs2LCAzMCwgNTYsIDgyXSxcbiAgICAgIFs2LCAzMCwgNTgsIDg2XSxcbiAgICAgIFs2LCAzNCwgNjIsIDkwXSxcbiAgICAgIFs2LCAyOCwgNTAsIDcyLCA5NF0sXG4gICAgICBbNiwgMjYsIDUwLCA3NCwgOThdLFxuICAgICAgWzYsIDMwLCA1NCwgNzgsIDEwMl0sXG4gICAgICBbNiwgMjgsIDU0LCA4MCwgMTA2XSxcbiAgICAgIFs2LCAzMiwgNTgsIDg0LCAxMTBdLFxuICAgICAgWzYsIDMwLCA1OCwgODYsIDExNF0sXG4gICAgICBbNiwgMzQsIDYyLCA5MCwgMTE4XSxcbiAgICAgIFs2LCAyNiwgNTAsIDc0LCA5OCwgMTIyXSxcbiAgICAgIFs2LCAzMCwgNTQsIDc4LCAxMDIsIDEyNl0sXG4gICAgICBbNiwgMjYsIDUyLCA3OCwgMTA0LCAxMzBdLFxuICAgICAgWzYsIDMwLCA1NiwgODIsIDEwOCwgMTM0XSxcbiAgICAgIFs2LCAzNCwgNjAsIDg2LCAxMTIsIDEzOF0sXG4gICAgICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDJdLFxuICAgICAgWzYsIDM0LCA2MiwgOTAsIDExOCwgMTQ2XSxcbiAgICAgIFs2LCAzMCwgNTQsIDc4LCAxMDIsIDEyNiwgMTUwXSxcbiAgICAgIFs2LCAyNCwgNTAsIDc2LCAxMDIsIDEyOCwgMTU0XSxcbiAgICAgIFs2LCAyOCwgNTQsIDgwLCAxMDYsIDEzMiwgMTU4XSxcbiAgICAgIFs2LCAzMiwgNTgsIDg0LCAxMTAsIDEzNiwgMTYyXSxcbiAgICAgIFs2LCAyNiwgNTQsIDgyLCAxMTAsIDEzOCwgMTY2XSxcbiAgICAgIFs2LCAzMCwgNTgsIDg2LCAxMTQsIDE0MiwgMTcwXVxuICAgIF07XG4gICAgdmFyIEcxNSA9ICgxIDw8IDEwKSB8ICgxIDw8IDgpIHwgKDEgPDwgNSkgfCAoMSA8PCA0KSB8ICgxIDw8IDIpIHwgKDEgPDwgMSkgfCAoMSA8PCAwKTtcbiAgICB2YXIgRzE4ID0gKDEgPDwgMTIpIHwgKDEgPDwgMTEpIHwgKDEgPDwgMTApIHwgKDEgPDwgOSkgfCAoMSA8PCA4KSB8ICgxIDw8IDUpIHwgKDEgPDwgMikgfCAoMSA8PCAwKTtcbiAgICB2YXIgRzE1X01BU0sgPSAoMSA8PCAxNCkgfCAoMSA8PCAxMikgfCAoMSA8PCAxMCkgfCAoMSA8PCA0KSB8ICgxIDw8IDEpO1xuXG4gICAgdmFyIF90aGlzID0ge307XG5cbiAgICB2YXIgZ2V0QkNIRGlnaXQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgZGlnaXQgPSAwO1xuICAgICAgd2hpbGUgKGRhdGEgIT0gMCkge1xuICAgICAgICBkaWdpdCArPSAxO1xuICAgICAgICBkYXRhID4+Pj0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkaWdpdDtcbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V0QkNIVHlwZUluZm8gPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgZCA9IGRhdGEgPDwgMTA7XG4gICAgICB3aGlsZSAoZ2V0QkNIRGlnaXQoZCkgLSBnZXRCQ0hEaWdpdChHMTUpID49IDApIHtcbiAgICAgICAgZCBePSAoRzE1IDw8IChnZXRCQ0hEaWdpdChkKSAtIGdldEJDSERpZ2l0KEcxNSkgKSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuICggKGRhdGEgPDwgMTApIHwgZCkgXiBHMTVfTUFTSztcbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V0QkNIVHlwZU51bWJlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBkID0gZGF0YSA8PCAxMjtcbiAgICAgIHdoaWxlIChnZXRCQ0hEaWdpdChkKSAtIGdldEJDSERpZ2l0KEcxOCkgPj0gMCkge1xuICAgICAgICBkIF49IChHMTggPDwgKGdldEJDSERpZ2l0KGQpIC0gZ2V0QkNIRGlnaXQoRzE4KSApICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGRhdGEgPDwgMTIpIHwgZDtcbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V0UGF0dGVyblBvc2l0aW9uID0gZnVuY3Rpb24odHlwZU51bWJlcikge1xuICAgICAgcmV0dXJuIFBBVFRFUk5fUE9TSVRJT05fVEFCTEVbdHlwZU51bWJlciAtIDFdO1xuICAgIH07XG5cbiAgICBfdGhpcy5nZXRNYXNrRnVuY3Rpb24gPSBmdW5jdGlvbihtYXNrUGF0dGVybikge1xuXG4gICAgICBzd2l0Y2ggKG1hc2tQYXR0ZXJuKSB7XG5cbiAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMDAwIDpcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuIChpICsgaikgJSAyID09IDA7IH07XG4gICAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjAwMSA6XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihpLCBqKSB7IHJldHVybiBpICUgMiA9PSAwOyB9O1xuICAgICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMTAgOlxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaSwgaikgeyByZXR1cm4gaiAlIDMgPT0gMDsgfTtcbiAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMDExIDpcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuIChpICsgaikgJSAzID09IDA7IH07XG4gICAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMCA6XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihpLCBqKSB7IHJldHVybiAoTWF0aC5mbG9vcihpIC8gMikgKyBNYXRoLmZsb29yKGogLyAzKSApICUgMiA9PSAwOyB9O1xuICAgICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMDEgOlxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaSwgaikgeyByZXR1cm4gKGkgKiBqKSAlIDIgKyAoaSAqIGopICUgMyA9PSAwOyB9O1xuICAgICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMTAgOlxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaSwgaikgeyByZXR1cm4gKCAoaSAqIGopICUgMiArIChpICogaikgJSAzKSAlIDIgPT0gMDsgfTtcbiAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMTExIDpcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuICggKGkgKiBqKSAlIDMgKyAoaSArIGopICUgMikgJSAyID09IDA7IH07XG5cbiAgICAgIGRlZmF1bHQgOlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBtYXNrUGF0dGVybjonICsgbWFza1BhdHRlcm4pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5nZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsID0gZnVuY3Rpb24oZXJyb3JDb3JyZWN0TGVuZ3RoKSB7XG4gICAgICB2YXIgYSA9IHFyUG9seW5vbWlhbChbMV0sIDApO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlcnJvckNvcnJlY3RMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhID0gYS5tdWx0aXBseShxclBvbHlub21pYWwoWzEsIFFSTWF0aC5nZXhwKGkpXSwgMCkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhO1xuICAgIH07XG5cbiAgICBfdGhpcy5nZXRMZW5ndGhJbkJpdHMgPSBmdW5jdGlvbihtb2RlLCB0eXBlKSB7XG5cbiAgICAgIGlmICgxIDw9IHR5cGUgJiYgdHlwZSA8IDEwKSB7XG5cbiAgICAgICAgLy8gMSAtIDlcblxuICAgICAgICBzd2l0Y2gobW9kZSkge1xuICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX05VTUJFUiAgICA6IHJldHVybiAxMDtcbiAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9BTFBIQV9OVU0gOiByZXR1cm4gOTtcbiAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEUgOiByZXR1cm4gODtcbiAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9LQU5KSSAgICAgOiByZXR1cm4gODtcbiAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtb2RlOicgKyBtb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPCAyNykge1xuXG4gICAgICAgIC8vIDEwIC0gMjZcblxuICAgICAgICBzd2l0Y2gobW9kZSkge1xuICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX05VTUJFUiAgICA6IHJldHVybiAxMjtcbiAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9BTFBIQV9OVU0gOiByZXR1cm4gMTE7XG4gICAgICAgIGNhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFIDogcmV0dXJuIDE2O1xuICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJICAgICA6IHJldHVybiAxMDtcbiAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtb2RlOicgKyBtb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPCA0MSkge1xuXG4gICAgICAgIC8vIDI3IC0gNDBcblxuICAgICAgICBzd2l0Y2gobW9kZSkge1xuICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX05VTUJFUiAgICA6IHJldHVybiAxNDtcbiAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9BTFBIQV9OVU0gOiByZXR1cm4gMTM7XG4gICAgICAgIGNhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFIDogcmV0dXJuIDE2O1xuICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJICAgICA6IHJldHVybiAxMjtcbiAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtb2RlOicgKyBtb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3R5cGU6JyArIHR5cGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5nZXRMb3N0UG9pbnQgPSBmdW5jdGlvbihxcmNvZGUpIHtcblxuICAgICAgdmFyIG1vZHVsZUNvdW50ID0gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XG5cbiAgICAgIHZhciBsb3N0UG9pbnQgPSAwO1xuXG4gICAgICAvLyBMRVZFTDFcblxuICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdyArPSAxKSB7XG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50OyBjb2wgKz0gMSkge1xuXG4gICAgICAgICAgdmFyIHNhbWVDb3VudCA9IDA7XG4gICAgICAgICAgdmFyIGRhcmsgPSBxcmNvZGUuaXNEYXJrKHJvdywgY29sKTtcblxuICAgICAgICAgIGZvciAodmFyIHIgPSAtMTsgciA8PSAxOyByICs9IDEpIHtcblxuICAgICAgICAgICAgaWYgKHJvdyArIHIgPCAwIHx8IG1vZHVsZUNvdW50IDw9IHJvdyArIHIpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAtMTsgYyA8PSAxOyBjICs9IDEpIHtcblxuICAgICAgICAgICAgICBpZiAoY29sICsgYyA8IDAgfHwgbW9kdWxlQ291bnQgPD0gY29sICsgYykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHIgPT0gMCAmJiBjID09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChkYXJrID09IHFyY29kZS5pc0Rhcmsocm93ICsgciwgY29sICsgYykgKSB7XG4gICAgICAgICAgICAgICAgc2FtZUNvdW50ICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2FtZUNvdW50ID4gNSkge1xuICAgICAgICAgICAgbG9zdFBvaW50ICs9ICgzICsgc2FtZUNvdW50IC0gNSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBMRVZFTDJcblxuICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQgLSAxOyByb3cgKz0gMSkge1xuICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudCAtIDE7IGNvbCArPSAxKSB7XG4gICAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgICBpZiAocXJjb2RlLmlzRGFyayhyb3csIGNvbCkgKSBjb3VudCArPSAxO1xuICAgICAgICAgIGlmIChxcmNvZGUuaXNEYXJrKHJvdyArIDEsIGNvbCkgKSBjb3VudCArPSAxO1xuICAgICAgICAgIGlmIChxcmNvZGUuaXNEYXJrKHJvdywgY29sICsgMSkgKSBjb3VudCArPSAxO1xuICAgICAgICAgIGlmIChxcmNvZGUuaXNEYXJrKHJvdyArIDEsIGNvbCArIDEpICkgY291bnQgKz0gMTtcbiAgICAgICAgICBpZiAoY291bnQgPT0gMCB8fCBjb3VudCA9PSA0KSB7XG4gICAgICAgICAgICBsb3N0UG9pbnQgKz0gMztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTEVWRUwzXG5cbiAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3cgKz0gMSkge1xuICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudCAtIDY7IGNvbCArPSAxKSB7XG4gICAgICAgICAgaWYgKHFyY29kZS5pc0Rhcmsocm93LCBjb2wpXG4gICAgICAgICAgICAgICYmICFxcmNvZGUuaXNEYXJrKHJvdywgY29sICsgMSlcbiAgICAgICAgICAgICAgJiYgIHFyY29kZS5pc0Rhcmsocm93LCBjb2wgKyAyKVxuICAgICAgICAgICAgICAmJiAgcXJjb2RlLmlzRGFyayhyb3csIGNvbCArIDMpXG4gICAgICAgICAgICAgICYmICBxcmNvZGUuaXNEYXJrKHJvdywgY29sICsgNClcbiAgICAgICAgICAgICAgJiYgIXFyY29kZS5pc0Rhcmsocm93LCBjb2wgKyA1KVxuICAgICAgICAgICAgICAmJiAgcXJjb2RlLmlzRGFyayhyb3csIGNvbCArIDYpICkge1xuICAgICAgICAgICAgbG9zdFBvaW50ICs9IDQwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sICs9IDEpIHtcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQgLSA2OyByb3cgKz0gMSkge1xuICAgICAgICAgIGlmIChxcmNvZGUuaXNEYXJrKHJvdywgY29sKVxuICAgICAgICAgICAgICAmJiAhcXJjb2RlLmlzRGFyayhyb3cgKyAxLCBjb2wpXG4gICAgICAgICAgICAgICYmICBxcmNvZGUuaXNEYXJrKHJvdyArIDIsIGNvbClcbiAgICAgICAgICAgICAgJiYgIHFyY29kZS5pc0Rhcmsocm93ICsgMywgY29sKVxuICAgICAgICAgICAgICAmJiAgcXJjb2RlLmlzRGFyayhyb3cgKyA0LCBjb2wpXG4gICAgICAgICAgICAgICYmICFxcmNvZGUuaXNEYXJrKHJvdyArIDUsIGNvbClcbiAgICAgICAgICAgICAgJiYgIHFyY29kZS5pc0Rhcmsocm93ICsgNiwgY29sKSApIHtcbiAgICAgICAgICAgIGxvc3RQb2ludCArPSA0MDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTEVWRUw0XG5cbiAgICAgIHZhciBkYXJrQ291bnQgPSAwO1xuXG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sICs9IDEpIHtcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdyArPSAxKSB7XG4gICAgICAgICAgaWYgKHFyY29kZS5pc0Rhcmsocm93LCBjb2wpICkge1xuICAgICAgICAgICAgZGFya0NvdW50ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciByYXRpbyA9IE1hdGguYWJzKDEwMCAqIGRhcmtDb3VudCAvIG1vZHVsZUNvdW50IC8gbW9kdWxlQ291bnQgLSA1MCkgLyA1O1xuICAgICAgbG9zdFBvaW50ICs9IHJhdGlvICogMTA7XG5cbiAgICAgIHJldHVybiBsb3N0UG9pbnQ7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfSgpO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFFSTWF0aFxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHZhciBRUk1hdGggPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBFWFBfVEFCTEUgPSBuZXcgQXJyYXkoMjU2KTtcbiAgICB2YXIgTE9HX1RBQkxFID0gbmV3IEFycmF5KDI1Nik7XG5cbiAgICAvLyBpbml0aWFsaXplIHRhYmxlc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSArPSAxKSB7XG4gICAgICBFWFBfVEFCTEVbaV0gPSAxIDw8IGk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSA4OyBpIDwgMjU2OyBpICs9IDEpIHtcbiAgICAgIEVYUF9UQUJMRVtpXSA9IEVYUF9UQUJMRVtpIC0gNF1cbiAgICAgICAgXiBFWFBfVEFCTEVbaSAtIDVdXG4gICAgICAgIF4gRVhQX1RBQkxFW2kgLSA2XVxuICAgICAgICBeIEVYUF9UQUJMRVtpIC0gOF07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU1OyBpICs9IDEpIHtcbiAgICAgIExPR19UQUJMRVtFWFBfVEFCTEVbaV0gXSA9IGk7XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0ge307XG5cbiAgICBfdGhpcy5nbG9nID0gZnVuY3Rpb24obikge1xuXG4gICAgICBpZiAobiA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnbG9nKCcgKyBuICsgJyknKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIExPR19UQUJMRVtuXTtcbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V4cCA9IGZ1bmN0aW9uKG4pIHtcblxuICAgICAgd2hpbGUgKG4gPCAwKSB7XG4gICAgICAgIG4gKz0gMjU1O1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAobiA+PSAyNTYpIHtcbiAgICAgICAgbiAtPSAyNTU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBFWFBfVEFCTEVbbl07XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfSgpO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIHFyUG9seW5vbWlhbFxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGZ1bmN0aW9uIHFyUG9seW5vbWlhbChudW0sIHNoaWZ0KSB7XG5cbiAgICBpZiAodHlwZW9mIG51bS5sZW5ndGggPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihudW0ubGVuZ3RoICsgJy8nICsgc2hpZnQpO1xuICAgIH1cblxuICAgIHZhciBfbnVtID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgIHdoaWxlIChvZmZzZXQgPCBudW0ubGVuZ3RoICYmIG51bVtvZmZzZXRdID09IDApIHtcbiAgICAgICAgb2Zmc2V0ICs9IDE7XG4gICAgICB9XG4gICAgICB2YXIgX251bSA9IG5ldyBBcnJheShudW0ubGVuZ3RoIC0gb2Zmc2V0ICsgc2hpZnQpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoIC0gb2Zmc2V0OyBpICs9IDEpIHtcbiAgICAgICAgX251bVtpXSA9IG51bVtpICsgb2Zmc2V0XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfbnVtO1xuICAgIH0oKTtcblxuICAgIHZhciBfdGhpcyA9IHt9O1xuXG4gICAgX3RoaXMuZ2V0QXQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgcmV0dXJuIF9udW1baW5kZXhdO1xuICAgIH07XG5cbiAgICBfdGhpcy5nZXRMZW5ndGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfbnVtLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgX3RoaXMubXVsdGlwbHkgPSBmdW5jdGlvbihlKSB7XG5cbiAgICAgIHZhciBudW0gPSBuZXcgQXJyYXkoX3RoaXMuZ2V0TGVuZ3RoKCkgKyBlLmdldExlbmd0aCgpIC0gMSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3RoaXMuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGUuZ2V0TGVuZ3RoKCk7IGogKz0gMSkge1xuICAgICAgICAgIG51bVtpICsgal0gXj0gUVJNYXRoLmdleHAoUVJNYXRoLmdsb2coX3RoaXMuZ2V0QXQoaSkgKSArIFFSTWF0aC5nbG9nKGUuZ2V0QXQoaikgKSApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBxclBvbHlub21pYWwobnVtLCAwKTtcbiAgICB9O1xuXG4gICAgX3RoaXMubW9kID0gZnVuY3Rpb24oZSkge1xuXG4gICAgICBpZiAoX3RoaXMuZ2V0TGVuZ3RoKCkgLSBlLmdldExlbmd0aCgpIDwgMCkge1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG5cbiAgICAgIHZhciByYXRpbyA9IFFSTWF0aC5nbG9nKF90aGlzLmdldEF0KDApICkgLSBRUk1hdGguZ2xvZyhlLmdldEF0KDApICk7XG5cbiAgICAgIHZhciBudW0gPSBuZXcgQXJyYXkoX3RoaXMuZ2V0TGVuZ3RoKCkgKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3RoaXMuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICBudW1baV0gPSBfdGhpcy5nZXRBdChpKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgbnVtW2ldIF49IFFSTWF0aC5nZXhwKFFSTWF0aC5nbG9nKGUuZ2V0QXQoaSkgKSArIHJhdGlvKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVjdXJzaXZlIGNhbGxcbiAgICAgIHJldHVybiBxclBvbHlub21pYWwobnVtLCAwKS5tb2QoZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBRUlJTQmxvY2tcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICB2YXIgUVJSU0Jsb2NrID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgUlNfQkxPQ0tfVEFCTEUgPSBbXG5cbiAgICAgIC8vIExcbiAgICAgIC8vIE1cbiAgICAgIC8vIFFcbiAgICAgIC8vIEhcblxuICAgICAgLy8gMVxuICAgICAgWzEsIDI2LCAxOV0sXG4gICAgICBbMSwgMjYsIDE2XSxcbiAgICAgIFsxLCAyNiwgMTNdLFxuICAgICAgWzEsIDI2LCA5XSxcblxuICAgICAgLy8gMlxuICAgICAgWzEsIDQ0LCAzNF0sXG4gICAgICBbMSwgNDQsIDI4XSxcbiAgICAgIFsxLCA0NCwgMjJdLFxuICAgICAgWzEsIDQ0LCAxNl0sXG5cbiAgICAgIC8vIDNcbiAgICAgIFsxLCA3MCwgNTVdLFxuICAgICAgWzEsIDcwLCA0NF0sXG4gICAgICBbMiwgMzUsIDE3XSxcbiAgICAgIFsyLCAzNSwgMTNdLFxuXG4gICAgICAvLyA0XG4gICAgICBbMSwgMTAwLCA4MF0sXG4gICAgICBbMiwgNTAsIDMyXSxcbiAgICAgIFsyLCA1MCwgMjRdLFxuICAgICAgWzQsIDI1LCA5XSxcblxuICAgICAgLy8gNVxuICAgICAgWzEsIDEzNCwgMTA4XSxcbiAgICAgIFsyLCA2NywgNDNdLFxuICAgICAgWzIsIDMzLCAxNSwgMiwgMzQsIDE2XSxcbiAgICAgIFsyLCAzMywgMTEsIDIsIDM0LCAxMl0sXG5cbiAgICAgIC8vIDZcbiAgICAgIFsyLCA4NiwgNjhdLFxuICAgICAgWzQsIDQzLCAyN10sXG4gICAgICBbNCwgNDMsIDE5XSxcbiAgICAgIFs0LCA0MywgMTVdLFxuXG4gICAgICAvLyA3XG4gICAgICBbMiwgOTgsIDc4XSxcbiAgICAgIFs0LCA0OSwgMzFdLFxuICAgICAgWzIsIDMyLCAxNCwgNCwgMzMsIDE1XSxcbiAgICAgIFs0LCAzOSwgMTMsIDEsIDQwLCAxNF0sXG5cbiAgICAgIC8vIDhcbiAgICAgIFsyLCAxMjEsIDk3XSxcbiAgICAgIFsyLCA2MCwgMzgsIDIsIDYxLCAzOV0sXG4gICAgICBbNCwgNDAsIDE4LCAyLCA0MSwgMTldLFxuICAgICAgWzQsIDQwLCAxNCwgMiwgNDEsIDE1XSxcblxuICAgICAgLy8gOVxuICAgICAgWzIsIDE0NiwgMTE2XSxcbiAgICAgIFszLCA1OCwgMzYsIDIsIDU5LCAzN10sXG4gICAgICBbNCwgMzYsIDE2LCA0LCAzNywgMTddLFxuICAgICAgWzQsIDM2LCAxMiwgNCwgMzcsIDEzXSxcblxuICAgICAgLy8gMTBcbiAgICAgIFsyLCA4NiwgNjgsIDIsIDg3LCA2OV0sXG4gICAgICBbNCwgNjksIDQzLCAxLCA3MCwgNDRdLFxuICAgICAgWzYsIDQzLCAxOSwgMiwgNDQsIDIwXSxcbiAgICAgIFs2LCA0MywgMTUsIDIsIDQ0LCAxNl0sXG5cbiAgICAgIC8vIDExXG4gICAgICBbNCwgMTAxLCA4MV0sXG4gICAgICBbMSwgODAsIDUwLCA0LCA4MSwgNTFdLFxuICAgICAgWzQsIDUwLCAyMiwgNCwgNTEsIDIzXSxcbiAgICAgIFszLCAzNiwgMTIsIDgsIDM3LCAxM10sXG5cbiAgICAgIC8vIDEyXG4gICAgICBbMiwgMTE2LCA5MiwgMiwgMTE3LCA5M10sXG4gICAgICBbNiwgNTgsIDM2LCAyLCA1OSwgMzddLFxuICAgICAgWzQsIDQ2LCAyMCwgNiwgNDcsIDIxXSxcbiAgICAgIFs3LCA0MiwgMTQsIDQsIDQzLCAxNV0sXG5cbiAgICAgIC8vIDEzXG4gICAgICBbNCwgMTMzLCAxMDddLFxuICAgICAgWzgsIDU5LCAzNywgMSwgNjAsIDM4XSxcbiAgICAgIFs4LCA0NCwgMjAsIDQsIDQ1LCAyMV0sXG4gICAgICBbMTIsIDMzLCAxMSwgNCwgMzQsIDEyXSxcblxuICAgICAgLy8gMTRcbiAgICAgIFszLCAxNDUsIDExNSwgMSwgMTQ2LCAxMTZdLFxuICAgICAgWzQsIDY0LCA0MCwgNSwgNjUsIDQxXSxcbiAgICAgIFsxMSwgMzYsIDE2LCA1LCAzNywgMTddLFxuICAgICAgWzExLCAzNiwgMTIsIDUsIDM3LCAxM10sXG5cbiAgICAgIC8vIDE1XG4gICAgICBbNSwgMTA5LCA4NywgMSwgMTEwLCA4OF0sXG4gICAgICBbNSwgNjUsIDQxLCA1LCA2NiwgNDJdLFxuICAgICAgWzUsIDU0LCAyNCwgNywgNTUsIDI1XSxcbiAgICAgIFsxMSwgMzYsIDEyLCA3LCAzNywgMTNdLFxuXG4gICAgICAvLyAxNlxuICAgICAgWzUsIDEyMiwgOTgsIDEsIDEyMywgOTldLFxuICAgICAgWzcsIDczLCA0NSwgMywgNzQsIDQ2XSxcbiAgICAgIFsxNSwgNDMsIDE5LCAyLCA0NCwgMjBdLFxuICAgICAgWzMsIDQ1LCAxNSwgMTMsIDQ2LCAxNl0sXG5cbiAgICAgIC8vIDE3XG4gICAgICBbMSwgMTM1LCAxMDcsIDUsIDEzNiwgMTA4XSxcbiAgICAgIFsxMCwgNzQsIDQ2LCAxLCA3NSwgNDddLFxuICAgICAgWzEsIDUwLCAyMiwgMTUsIDUxLCAyM10sXG4gICAgICBbMiwgNDIsIDE0LCAxNywgNDMsIDE1XSxcblxuICAgICAgLy8gMThcbiAgICAgIFs1LCAxNTAsIDEyMCwgMSwgMTUxLCAxMjFdLFxuICAgICAgWzksIDY5LCA0MywgNCwgNzAsIDQ0XSxcbiAgICAgIFsxNywgNTAsIDIyLCAxLCA1MSwgMjNdLFxuICAgICAgWzIsIDQyLCAxNCwgMTksIDQzLCAxNV0sXG5cbiAgICAgIC8vIDE5XG4gICAgICBbMywgMTQxLCAxMTMsIDQsIDE0MiwgMTE0XSxcbiAgICAgIFszLCA3MCwgNDQsIDExLCA3MSwgNDVdLFxuICAgICAgWzE3LCA0NywgMjEsIDQsIDQ4LCAyMl0sXG4gICAgICBbOSwgMzksIDEzLCAxNiwgNDAsIDE0XSxcblxuICAgICAgLy8gMjBcbiAgICAgIFszLCAxMzUsIDEwNywgNSwgMTM2LCAxMDhdLFxuICAgICAgWzMsIDY3LCA0MSwgMTMsIDY4LCA0Ml0sXG4gICAgICBbMTUsIDU0LCAyNCwgNSwgNTUsIDI1XSxcbiAgICAgIFsxNSwgNDMsIDE1LCAxMCwgNDQsIDE2XSxcblxuICAgICAgLy8gMjFcbiAgICAgIFs0LCAxNDQsIDExNiwgNCwgMTQ1LCAxMTddLFxuICAgICAgWzE3LCA2OCwgNDJdLFxuICAgICAgWzE3LCA1MCwgMjIsIDYsIDUxLCAyM10sXG4gICAgICBbMTksIDQ2LCAxNiwgNiwgNDcsIDE3XSxcblxuICAgICAgLy8gMjJcbiAgICAgIFsyLCAxMzksIDExMSwgNywgMTQwLCAxMTJdLFxuICAgICAgWzE3LCA3NCwgNDZdLFxuICAgICAgWzcsIDU0LCAyNCwgMTYsIDU1LCAyNV0sXG4gICAgICBbMzQsIDM3LCAxM10sXG5cbiAgICAgIC8vIDIzXG4gICAgICBbNCwgMTUxLCAxMjEsIDUsIDE1MiwgMTIyXSxcbiAgICAgIFs0LCA3NSwgNDcsIDE0LCA3NiwgNDhdLFxuICAgICAgWzExLCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxuICAgICAgWzE2LCA0NSwgMTUsIDE0LCA0NiwgMTZdLFxuXG4gICAgICAvLyAyNFxuICAgICAgWzYsIDE0NywgMTE3LCA0LCAxNDgsIDExOF0sXG4gICAgICBbNiwgNzMsIDQ1LCAxNCwgNzQsIDQ2XSxcbiAgICAgIFsxMSwgNTQsIDI0LCAxNiwgNTUsIDI1XSxcbiAgICAgIFszMCwgNDYsIDE2LCAyLCA0NywgMTddLFxuXG4gICAgICAvLyAyNVxuICAgICAgWzgsIDEzMiwgMTA2LCA0LCAxMzMsIDEwN10sXG4gICAgICBbOCwgNzUsIDQ3LCAxMywgNzYsIDQ4XSxcbiAgICAgIFs3LCA1NCwgMjQsIDIyLCA1NSwgMjVdLFxuICAgICAgWzIyLCA0NSwgMTUsIDEzLCA0NiwgMTZdLFxuXG4gICAgICAvLyAyNlxuICAgICAgWzEwLCAxNDIsIDExNCwgMiwgMTQzLCAxMTVdLFxuICAgICAgWzE5LCA3NCwgNDYsIDQsIDc1LCA0N10sXG4gICAgICBbMjgsIDUwLCAyMiwgNiwgNTEsIDIzXSxcbiAgICAgIFszMywgNDYsIDE2LCA0LCA0NywgMTddLFxuXG4gICAgICAvLyAyN1xuICAgICAgWzgsIDE1MiwgMTIyLCA0LCAxNTMsIDEyM10sXG4gICAgICBbMjIsIDczLCA0NSwgMywgNzQsIDQ2XSxcbiAgICAgIFs4LCA1MywgMjMsIDI2LCA1NCwgMjRdLFxuICAgICAgWzEyLCA0NSwgMTUsIDI4LCA0NiwgMTZdLFxuXG4gICAgICAvLyAyOFxuICAgICAgWzMsIDE0NywgMTE3LCAxMCwgMTQ4LCAxMThdLFxuICAgICAgWzMsIDczLCA0NSwgMjMsIDc0LCA0Nl0sXG4gICAgICBbNCwgNTQsIDI0LCAzMSwgNTUsIDI1XSxcbiAgICAgIFsxMSwgNDUsIDE1LCAzMSwgNDYsIDE2XSxcblxuICAgICAgLy8gMjlcbiAgICAgIFs3LCAxNDYsIDExNiwgNywgMTQ3LCAxMTddLFxuICAgICAgWzIxLCA3MywgNDUsIDcsIDc0LCA0Nl0sXG4gICAgICBbMSwgNTMsIDIzLCAzNywgNTQsIDI0XSxcbiAgICAgIFsxOSwgNDUsIDE1LCAyNiwgNDYsIDE2XSxcblxuICAgICAgLy8gMzBcbiAgICAgIFs1LCAxNDUsIDExNSwgMTAsIDE0NiwgMTE2XSxcbiAgICAgIFsxOSwgNzUsIDQ3LCAxMCwgNzYsIDQ4XSxcbiAgICAgIFsxNSwgNTQsIDI0LCAyNSwgNTUsIDI1XSxcbiAgICAgIFsyMywgNDUsIDE1LCAyNSwgNDYsIDE2XSxcblxuICAgICAgLy8gMzFcbiAgICAgIFsxMywgMTQ1LCAxMTUsIDMsIDE0NiwgMTE2XSxcbiAgICAgIFsyLCA3NCwgNDYsIDI5LCA3NSwgNDddLFxuICAgICAgWzQyLCA1NCwgMjQsIDEsIDU1LCAyNV0sXG4gICAgICBbMjMsIDQ1LCAxNSwgMjgsIDQ2LCAxNl0sXG5cbiAgICAgIC8vIDMyXG4gICAgICBbMTcsIDE0NSwgMTE1XSxcbiAgICAgIFsxMCwgNzQsIDQ2LCAyMywgNzUsIDQ3XSxcbiAgICAgIFsxMCwgNTQsIDI0LCAzNSwgNTUsIDI1XSxcbiAgICAgIFsxOSwgNDUsIDE1LCAzNSwgNDYsIDE2XSxcblxuICAgICAgLy8gMzNcbiAgICAgIFsxNywgMTQ1LCAxMTUsIDEsIDE0NiwgMTE2XSxcbiAgICAgIFsxNCwgNzQsIDQ2LCAyMSwgNzUsIDQ3XSxcbiAgICAgIFsyOSwgNTQsIDI0LCAxOSwgNTUsIDI1XSxcbiAgICAgIFsxMSwgNDUsIDE1LCA0NiwgNDYsIDE2XSxcblxuICAgICAgLy8gMzRcbiAgICAgIFsxMywgMTQ1LCAxMTUsIDYsIDE0NiwgMTE2XSxcbiAgICAgIFsxNCwgNzQsIDQ2LCAyMywgNzUsIDQ3XSxcbiAgICAgIFs0NCwgNTQsIDI0LCA3LCA1NSwgMjVdLFxuICAgICAgWzU5LCA0NiwgMTYsIDEsIDQ3LCAxN10sXG5cbiAgICAgIC8vIDM1XG4gICAgICBbMTIsIDE1MSwgMTIxLCA3LCAxNTIsIDEyMl0sXG4gICAgICBbMTIsIDc1LCA0NywgMjYsIDc2LCA0OF0sXG4gICAgICBbMzksIDU0LCAyNCwgMTQsIDU1LCAyNV0sXG4gICAgICBbMjIsIDQ1LCAxNSwgNDEsIDQ2LCAxNl0sXG5cbiAgICAgIC8vIDM2XG4gICAgICBbNiwgMTUxLCAxMjEsIDE0LCAxNTIsIDEyMl0sXG4gICAgICBbNiwgNzUsIDQ3LCAzNCwgNzYsIDQ4XSxcbiAgICAgIFs0NiwgNTQsIDI0LCAxMCwgNTUsIDI1XSxcbiAgICAgIFsyLCA0NSwgMTUsIDY0LCA0NiwgMTZdLFxuXG4gICAgICAvLyAzN1xuICAgICAgWzE3LCAxNTIsIDEyMiwgNCwgMTUzLCAxMjNdLFxuICAgICAgWzI5LCA3NCwgNDYsIDE0LCA3NSwgNDddLFxuICAgICAgWzQ5LCA1NCwgMjQsIDEwLCA1NSwgMjVdLFxuICAgICAgWzI0LCA0NSwgMTUsIDQ2LCA0NiwgMTZdLFxuXG4gICAgICAvLyAzOFxuICAgICAgWzQsIDE1MiwgMTIyLCAxOCwgMTUzLCAxMjNdLFxuICAgICAgWzEzLCA3NCwgNDYsIDMyLCA3NSwgNDddLFxuICAgICAgWzQ4LCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxuICAgICAgWzQyLCA0NSwgMTUsIDMyLCA0NiwgMTZdLFxuXG4gICAgICAvLyAzOVxuICAgICAgWzIwLCAxNDcsIDExNywgNCwgMTQ4LCAxMThdLFxuICAgICAgWzQwLCA3NSwgNDcsIDcsIDc2LCA0OF0sXG4gICAgICBbNDMsIDU0LCAyNCwgMjIsIDU1LCAyNV0sXG4gICAgICBbMTAsIDQ1LCAxNSwgNjcsIDQ2LCAxNl0sXG5cbiAgICAgIC8vIDQwXG4gICAgICBbMTksIDE0OCwgMTE4LCA2LCAxNDksIDExOV0sXG4gICAgICBbMTgsIDc1LCA0NywgMzEsIDc2LCA0OF0sXG4gICAgICBbMzQsIDU0LCAyNCwgMzQsIDU1LCAyNV0sXG4gICAgICBbMjAsIDQ1LCAxNSwgNjEsIDQ2LCAxNl1cbiAgICBdO1xuXG4gICAgdmFyIHFyUlNCbG9jayA9IGZ1bmN0aW9uKHRvdGFsQ291bnQsIGRhdGFDb3VudCkge1xuICAgICAgdmFyIF90aGlzID0ge307XG4gICAgICBfdGhpcy50b3RhbENvdW50ID0gdG90YWxDb3VudDtcbiAgICAgIF90aGlzLmRhdGFDb3VudCA9IGRhdGFDb3VudDtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgdmFyIF90aGlzID0ge307XG5cbiAgICB2YXIgZ2V0UnNCbG9ja1RhYmxlID0gZnVuY3Rpb24odHlwZU51bWJlciwgZXJyb3JDb3JyZWN0aW9uTGV2ZWwpIHtcblxuICAgICAgc3dpdGNoKGVycm9yQ29ycmVjdGlvbkxldmVsKSB7XG4gICAgICBjYXNlIFFSRXJyb3JDb3JyZWN0aW9uTGV2ZWwuTCA6XG4gICAgICAgIHJldHVybiBSU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDBdO1xuICAgICAgY2FzZSBRUkVycm9yQ29ycmVjdGlvbkxldmVsLk0gOlxuICAgICAgICByZXR1cm4gUlNfQkxPQ0tfVEFCTEVbKHR5cGVOdW1iZXIgLSAxKSAqIDQgKyAxXTtcbiAgICAgIGNhc2UgUVJFcnJvckNvcnJlY3Rpb25MZXZlbC5RIDpcbiAgICAgICAgcmV0dXJuIFJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMl07XG4gICAgICBjYXNlIFFSRXJyb3JDb3JyZWN0aW9uTGV2ZWwuSCA6XG4gICAgICAgIHJldHVybiBSU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDNdO1xuICAgICAgZGVmYXVsdCA6XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmdldFJTQmxvY2tzID0gZnVuY3Rpb24odHlwZU51bWJlciwgZXJyb3JDb3JyZWN0aW9uTGV2ZWwpIHtcblxuICAgICAgdmFyIHJzQmxvY2sgPSBnZXRSc0Jsb2NrVGFibGUodHlwZU51bWJlciwgZXJyb3JDb3JyZWN0aW9uTGV2ZWwpO1xuXG4gICAgICBpZiAodHlwZW9mIHJzQmxvY2sgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgcnMgYmxvY2sgQCB0eXBlTnVtYmVyOicgKyB0eXBlTnVtYmVyICtcbiAgICAgICAgICAgICcvZXJyb3JDb3JyZWN0aW9uTGV2ZWw6JyArIGVycm9yQ29ycmVjdGlvbkxldmVsKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlbmd0aCA9IHJzQmxvY2subGVuZ3RoIC8gMztcblxuICAgICAgdmFyIGxpc3QgPSBuZXcgQXJyYXkoKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuXG4gICAgICAgIHZhciBjb3VudCA9IHJzQmxvY2tbaSAqIDMgKyAwXTtcbiAgICAgICAgdmFyIHRvdGFsQ291bnQgPSByc0Jsb2NrW2kgKiAzICsgMV07XG4gICAgICAgIHZhciBkYXRhQ291bnQgPSByc0Jsb2NrW2kgKiAzICsgMl07XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb3VudDsgaiArPSAxKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKHFyUlNCbG9jayh0b3RhbENvdW50LCBkYXRhQ291bnQpICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfSgpO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIHFyQml0QnVmZmVyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgdmFyIHFyQml0QnVmZmVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX2J1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgIHZhciBfbGVuZ3RoID0gMDtcblxuICAgIHZhciBfdGhpcyA9IHt9O1xuXG4gICAgX3RoaXMuZ2V0QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gX2J1ZmZlcjtcbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V0QXQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgdmFyIGJ1ZkluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIDgpO1xuICAgICAgcmV0dXJuICggKF9idWZmZXJbYnVmSW5kZXhdID4+PiAoNyAtIGluZGV4ICUgOCkgKSAmIDEpID09IDE7XG4gICAgfTtcblxuICAgIF90aGlzLnB1dCA9IGZ1bmN0aW9uKG51bSwgbGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIF90aGlzLnB1dEJpdCggKCAobnVtID4+PiAobGVuZ3RoIC0gaSAtIDEpICkgJiAxKSA9PSAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V0TGVuZ3RoSW5CaXRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gX2xlbmd0aDtcbiAgICB9O1xuXG4gICAgX3RoaXMucHV0Qml0ID0gZnVuY3Rpb24oYml0KSB7XG5cbiAgICAgIHZhciBidWZJbmRleCA9IE1hdGguZmxvb3IoX2xlbmd0aCAvIDgpO1xuICAgICAgaWYgKF9idWZmZXIubGVuZ3RoIDw9IGJ1ZkluZGV4KSB7XG4gICAgICAgIF9idWZmZXIucHVzaCgwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJpdCkge1xuICAgICAgICBfYnVmZmVyW2J1ZkluZGV4XSB8PSAoMHg4MCA+Pj4gKF9sZW5ndGggJSA4KSApO1xuICAgICAgfVxuXG4gICAgICBfbGVuZ3RoICs9IDE7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBxck51bWJlclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHZhciBxck51bWJlciA9IGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgIHZhciBfbW9kZSA9IFFSTW9kZS5NT0RFX05VTUJFUjtcbiAgICB2YXIgX2RhdGEgPSBkYXRhO1xuXG4gICAgdmFyIF90aGlzID0ge307XG5cbiAgICBfdGhpcy5nZXRNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gX21vZGU7XG4gICAgfTtcblxuICAgIF90aGlzLmdldExlbmd0aCA9IGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgcmV0dXJuIF9kYXRhLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgX3RoaXMud3JpdGUgPSBmdW5jdGlvbihidWZmZXIpIHtcblxuICAgICAgdmFyIGRhdGEgPSBfZGF0YTtcblxuICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICB3aGlsZSAoaSArIDIgPCBkYXRhLmxlbmd0aCkge1xuICAgICAgICBidWZmZXIucHV0KHN0clRvTnVtKGRhdGEuc3Vic3RyaW5nKGksIGkgKyAzKSApLCAxMCk7XG4gICAgICAgIGkgKz0gMztcbiAgICAgIH1cblxuICAgICAgaWYgKGkgPCBkYXRhLmxlbmd0aCkge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggLSBpID09IDEpIHtcbiAgICAgICAgICBidWZmZXIucHV0KHN0clRvTnVtKGRhdGEuc3Vic3RyaW5nKGksIGkgKyAxKSApLCA0KTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCAtIGkgPT0gMikge1xuICAgICAgICAgIGJ1ZmZlci5wdXQoc3RyVG9OdW0oZGF0YS5zdWJzdHJpbmcoaSwgaSArIDIpICksIDcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBzdHJUb051bSA9IGZ1bmN0aW9uKHMpIHtcbiAgICAgIHZhciBudW0gPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIG51bSA9IG51bSAqIDEwICsgY2hhdFRvTnVtKHMuY2hhckF0KGkpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVtO1xuICAgIH07XG5cbiAgICB2YXIgY2hhdFRvTnVtID0gZnVuY3Rpb24oYykge1xuICAgICAgaWYgKCcwJyA8PSBjICYmIGMgPD0gJzknKSB7XG4gICAgICAgIHJldHVybiBjLmNoYXJDb2RlQXQoMCkgLSAnMCcuY2hhckNvZGVBdCgwKTtcbiAgICAgIH1cbiAgICAgIHRocm93ICdpbGxlZ2FsIGNoYXIgOicgKyBjO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH07XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gcXJBbHBoYU51bVxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHZhciBxckFscGhhTnVtID0gZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgdmFyIF9tb2RlID0gUVJNb2RlLk1PREVfQUxQSEFfTlVNO1xuICAgIHZhciBfZGF0YSA9IGRhdGE7XG5cbiAgICB2YXIgX3RoaXMgPSB7fTtcblxuICAgIF90aGlzLmdldE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfbW9kZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V0TGVuZ3RoID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICByZXR1cm4gX2RhdGEubGVuZ3RoO1xuICAgIH07XG5cbiAgICBfdGhpcy53cml0ZSA9IGZ1bmN0aW9uKGJ1ZmZlcikge1xuXG4gICAgICB2YXIgcyA9IF9kYXRhO1xuXG4gICAgICB2YXIgaSA9IDA7XG5cbiAgICAgIHdoaWxlIChpICsgMSA8IHMubGVuZ3RoKSB7XG4gICAgICAgIGJ1ZmZlci5wdXQoXG4gICAgICAgICAgZ2V0Q29kZShzLmNoYXJBdChpKSApICogNDUgK1xuICAgICAgICAgIGdldENvZGUocy5jaGFyQXQoaSArIDEpICksIDExKTtcbiAgICAgICAgaSArPSAyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSA8IHMubGVuZ3RoKSB7XG4gICAgICAgIGJ1ZmZlci5wdXQoZ2V0Q29kZShzLmNoYXJBdChpKSApLCA2KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGdldENvZGUgPSBmdW5jdGlvbihjKSB7XG5cbiAgICAgIGlmICgnMCcgPD0gYyAmJiBjIDw9ICc5Jykge1xuICAgICAgICByZXR1cm4gYy5jaGFyQ29kZUF0KDApIC0gJzAnLmNoYXJDb2RlQXQoMCk7XG4gICAgICB9IGVsc2UgaWYgKCdBJyA8PSBjICYmIGMgPD0gJ1onKSB7XG4gICAgICAgIHJldHVybiBjLmNoYXJDb2RlQXQoMCkgLSAnQScuY2hhckNvZGVBdCgwKSArIDEwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgIGNhc2UgJyAnIDogcmV0dXJuIDM2O1xuICAgICAgICBjYXNlICckJyA6IHJldHVybiAzNztcbiAgICAgICAgY2FzZSAnJScgOiByZXR1cm4gMzg7XG4gICAgICAgIGNhc2UgJyonIDogcmV0dXJuIDM5O1xuICAgICAgICBjYXNlICcrJyA6IHJldHVybiA0MDtcbiAgICAgICAgY2FzZSAnLScgOiByZXR1cm4gNDE7XG4gICAgICAgIGNhc2UgJy4nIDogcmV0dXJuIDQyO1xuICAgICAgICBjYXNlICcvJyA6IHJldHVybiA0MztcbiAgICAgICAgY2FzZSAnOicgOiByZXR1cm4gNDQ7XG4gICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgIHRocm93ICdpbGxlZ2FsIGNoYXIgOicgKyBjO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBxcjhCaXRCeXRlXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgdmFyIHFyOEJpdEJ5dGUgPSBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICB2YXIgX21vZGUgPSBRUk1vZGUuTU9ERV84QklUX0JZVEU7XG4gICAgdmFyIF9kYXRhID0gZGF0YTtcbiAgICB2YXIgX2J5dGVzID0gcXJjb2RlLnN0cmluZ1RvQnl0ZXMoZGF0YSk7XG5cbiAgICB2YXIgX3RoaXMgPSB7fTtcblxuICAgIF90aGlzLmdldE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfbW9kZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V0TGVuZ3RoID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICByZXR1cm4gX2J5dGVzLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgX3RoaXMud3JpdGUgPSBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2J5dGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJ1ZmZlci5wdXQoX2J5dGVzW2ldLCA4KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9O1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIHFyS2FuamlcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICB2YXIgcXJLYW5qaSA9IGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgIHZhciBfbW9kZSA9IFFSTW9kZS5NT0RFX0tBTkpJO1xuICAgIHZhciBfZGF0YSA9IGRhdGE7XG4gICAgdmFyIF9ieXRlcyA9IHFyY29kZS5zdHJpbmdUb0J5dGVzKGRhdGEpO1xuXG4gICAgIWZ1bmN0aW9uKGMsIGNvZGUpIHtcbiAgICAgIC8vIHNlbGYgdGVzdCBmb3Igc2ppcyBzdXBwb3J0LlxuICAgICAgdmFyIHRlc3QgPSBxcmNvZGUuc3RyaW5nVG9CeXRlcyhjKTtcbiAgICAgIGlmICh0ZXN0Lmxlbmd0aCAhPSAyIHx8ICggKHRlc3RbMF0gPDwgOCkgfCB0ZXN0WzFdKSAhPSBjb2RlKSB7XG4gICAgICAgIHRocm93ICdzamlzIG5vdCBzdXBwb3J0ZWQuJztcbiAgICAgIH1cbiAgICB9KCdcXHU1M2NiJywgMHg5NzQ2KTtcblxuICAgIHZhciBfdGhpcyA9IHt9O1xuXG4gICAgX3RoaXMuZ2V0TW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF9tb2RlO1xuICAgIH07XG5cbiAgICBfdGhpcy5nZXRMZW5ndGggPSBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgIHJldHVybiB+fihfYnl0ZXMubGVuZ3RoIC8gMik7XG4gICAgfTtcblxuICAgIF90aGlzLndyaXRlID0gZnVuY3Rpb24oYnVmZmVyKSB7XG5cbiAgICAgIHZhciBkYXRhID0gX2J5dGVzO1xuXG4gICAgICB2YXIgaSA9IDA7XG5cbiAgICAgIHdoaWxlIChpICsgMSA8IGRhdGEubGVuZ3RoKSB7XG5cbiAgICAgICAgdmFyIGMgPSAoICgweGZmICYgZGF0YVtpXSkgPDwgOCkgfCAoMHhmZiAmIGRhdGFbaSArIDFdKTtcblxuICAgICAgICBpZiAoMHg4MTQwIDw9IGMgJiYgYyA8PSAweDlGRkMpIHtcbiAgICAgICAgICBjIC09IDB4ODE0MDtcbiAgICAgICAgfSBlbHNlIGlmICgweEUwNDAgPD0gYyAmJiBjIDw9IDB4RUJCRikge1xuICAgICAgICAgIGMgLT0gMHhDMTQwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICdpbGxlZ2FsIGNoYXIgYXQgJyArIChpICsgMSkgKyAnLycgKyBjO1xuICAgICAgICB9XG5cbiAgICAgICAgYyA9ICggKGMgPj4+IDgpICYgMHhmZikgKiAweEMwICsgKGMgJiAweGZmKTtcblxuICAgICAgICBidWZmZXIucHV0KGMsIDEzKTtcblxuICAgICAgICBpICs9IDI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpIDwgZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgJ2lsbGVnYWwgY2hhciBhdCAnICsgKGkgKyAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9O1xuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIEdJRiBTdXBwb3J0IGV0Yy5cbiAgLy9cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBieXRlQXJyYXlPdXRwdXRTdHJlYW1cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICB2YXIgYnl0ZUFycmF5T3V0cHV0U3RyZWFtID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX2J5dGVzID0gbmV3IEFycmF5KCk7XG5cbiAgICB2YXIgX3RoaXMgPSB7fTtcblxuICAgIF90aGlzLndyaXRlQnl0ZSA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgIF9ieXRlcy5wdXNoKGIgJiAweGZmKTtcbiAgICB9O1xuXG4gICAgX3RoaXMud3JpdGVTaG9ydCA9IGZ1bmN0aW9uKGkpIHtcbiAgICAgIF90aGlzLndyaXRlQnl0ZShpKTtcbiAgICAgIF90aGlzLndyaXRlQnl0ZShpID4+PiA4KTtcbiAgICB9O1xuXG4gICAgX3RoaXMud3JpdGVCeXRlcyA9IGZ1bmN0aW9uKGIsIG9mZiwgbGVuKSB7XG4gICAgICBvZmYgPSBvZmYgfHwgMDtcbiAgICAgIGxlbiA9IGxlbiB8fCBiLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgX3RoaXMud3JpdGVCeXRlKGJbaSArIG9mZl0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy53cml0ZVN0cmluZyA9IGZ1bmN0aW9uKHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBfdGhpcy53cml0ZUJ5dGUocy5jaGFyQ29kZUF0KGkpICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLnRvQnl0ZUFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gX2J5dGVzO1xuICAgIH07XG5cbiAgICBfdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHMgPSAnJztcbiAgICAgIHMgKz0gJ1snO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfYnl0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgcyArPSAnLCc7XG4gICAgICAgIH1cbiAgICAgICAgcyArPSBfYnl0ZXNbaV07XG4gICAgICB9XG4gICAgICBzICs9ICddJztcbiAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH07XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gYmFzZTY0RW5jb2RlT3V0cHV0U3RyZWFtXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgdmFyIGJhc2U2NEVuY29kZU91dHB1dFN0cmVhbSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF9idWZmZXIgPSAwO1xuICAgIHZhciBfYnVmbGVuID0gMDtcbiAgICB2YXIgX2xlbmd0aCA9IDA7XG4gICAgdmFyIF9iYXNlNjQgPSAnJztcblxuICAgIHZhciBfdGhpcyA9IHt9O1xuXG4gICAgdmFyIHdyaXRlRW5jb2RlZCA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgIF9iYXNlNjQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShlbmNvZGUoYiAmIDB4M2YpICk7XG4gICAgfTtcblxuICAgIHZhciBlbmNvZGUgPSBmdW5jdGlvbihuKSB7XG4gICAgICBpZiAobiA8IDApIHtcbiAgICAgICAgLy8gZXJyb3IuXG4gICAgICB9IGVsc2UgaWYgKG4gPCAyNikge1xuICAgICAgICByZXR1cm4gMHg0MSArIG47XG4gICAgICB9IGVsc2UgaWYgKG4gPCA1Mikge1xuICAgICAgICByZXR1cm4gMHg2MSArIChuIC0gMjYpO1xuICAgICAgfSBlbHNlIGlmIChuIDwgNjIpIHtcbiAgICAgICAgcmV0dXJuIDB4MzAgKyAobiAtIDUyKTtcbiAgICAgIH0gZWxzZSBpZiAobiA9PSA2Mikge1xuICAgICAgICByZXR1cm4gMHgyYjtcbiAgICAgIH0gZWxzZSBpZiAobiA9PSA2Mykge1xuICAgICAgICByZXR1cm4gMHgyZjtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignbjonICsgbik7XG4gICAgfTtcblxuICAgIF90aGlzLndyaXRlQnl0ZSA9IGZ1bmN0aW9uKG4pIHtcblxuICAgICAgX2J1ZmZlciA9IChfYnVmZmVyIDw8IDgpIHwgKG4gJiAweGZmKTtcbiAgICAgIF9idWZsZW4gKz0gODtcbiAgICAgIF9sZW5ndGggKz0gMTtcblxuICAgICAgd2hpbGUgKF9idWZsZW4gPj0gNikge1xuICAgICAgICB3cml0ZUVuY29kZWQoX2J1ZmZlciA+Pj4gKF9idWZsZW4gLSA2KSApO1xuICAgICAgICBfYnVmbGVuIC09IDY7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmZsdXNoID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmIChfYnVmbGVuID4gMCkge1xuICAgICAgICB3cml0ZUVuY29kZWQoX2J1ZmZlciA8PCAoNiAtIF9idWZsZW4pICk7XG4gICAgICAgIF9idWZmZXIgPSAwO1xuICAgICAgICBfYnVmbGVuID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKF9sZW5ndGggJSAzICE9IDApIHtcbiAgICAgICAgLy8gcGFkZGluZ1xuICAgICAgICB2YXIgcGFkbGVuID0gMyAtIF9sZW5ndGggJSAzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgX2Jhc2U2NCArPSAnPSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfYmFzZTY0O1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH07XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gYmFzZTY0RGVjb2RlSW5wdXRTdHJlYW1cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICB2YXIgYmFzZTY0RGVjb2RlSW5wdXRTdHJlYW0gPSBmdW5jdGlvbihzdHIpIHtcblxuICAgIHZhciBfc3RyID0gc3RyO1xuICAgIHZhciBfcG9zID0gMDtcbiAgICB2YXIgX2J1ZmZlciA9IDA7XG4gICAgdmFyIF9idWZsZW4gPSAwO1xuXG4gICAgdmFyIF90aGlzID0ge307XG5cbiAgICBfdGhpcy5yZWFkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIHdoaWxlIChfYnVmbGVuIDwgOCkge1xuXG4gICAgICAgIGlmIChfcG9zID49IF9zdHIubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKF9idWZsZW4gPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgZW5kIG9mIGZpbGUuLycgKyBfYnVmbGVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0gX3N0ci5jaGFyQXQoX3Bvcyk7XG4gICAgICAgIF9wb3MgKz0gMTtcblxuICAgICAgICBpZiAoYyA9PSAnPScpIHtcbiAgICAgICAgICBfYnVmbGVuID0gMDtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYy5tYXRjaCgvXlxccyQvKSApIHtcbiAgICAgICAgICAvLyBpZ25vcmUgaWYgd2hpdGVzcGFjZS5cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9idWZmZXIgPSAoX2J1ZmZlciA8PCA2KSB8IGRlY29kZShjLmNoYXJDb2RlQXQoMCkgKTtcbiAgICAgICAgX2J1ZmxlbiArPSA2O1xuICAgICAgfVxuXG4gICAgICB2YXIgbiA9IChfYnVmZmVyID4+PiAoX2J1ZmxlbiAtIDgpICkgJiAweGZmO1xuICAgICAgX2J1ZmxlbiAtPSA4O1xuICAgICAgcmV0dXJuIG47XG4gICAgfTtcblxuICAgIHZhciBkZWNvZGUgPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAoMHg0MSA8PSBjICYmIGMgPD0gMHg1YSkge1xuICAgICAgICByZXR1cm4gYyAtIDB4NDE7XG4gICAgICB9IGVsc2UgaWYgKDB4NjEgPD0gYyAmJiBjIDw9IDB4N2EpIHtcbiAgICAgICAgcmV0dXJuIGMgLSAweDYxICsgMjY7XG4gICAgICB9IGVsc2UgaWYgKDB4MzAgPD0gYyAmJiBjIDw9IDB4MzkpIHtcbiAgICAgICAgcmV0dXJuIGMgLSAweDMwICsgNTI7XG4gICAgICB9IGVsc2UgaWYgKGMgPT0gMHgyYikge1xuICAgICAgICByZXR1cm4gNjI7XG4gICAgICB9IGVsc2UgaWYgKGMgPT0gMHgyZikge1xuICAgICAgICByZXR1cm4gNjM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2M6JyArIGMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH07XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gZ2lmSW1hZ2UgKEIvVylcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICB2YXIgZ2lmSW1hZ2UgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgICB2YXIgX3dpZHRoID0gd2lkdGg7XG4gICAgdmFyIF9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdmFyIF9kYXRhID0gbmV3IEFycmF5KHdpZHRoICogaGVpZ2h0KTtcblxuICAgIHZhciBfdGhpcyA9IHt9O1xuXG4gICAgX3RoaXMuc2V0UGl4ZWwgPSBmdW5jdGlvbih4LCB5LCBwaXhlbCkge1xuICAgICAgX2RhdGFbeSAqIF93aWR0aCArIHhdID0gcGl4ZWw7XG4gICAgfTtcblxuICAgIF90aGlzLndyaXRlID0gZnVuY3Rpb24ob3V0KSB7XG5cbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBHSUYgU2lnbmF0dXJlXG5cbiAgICAgIG91dC53cml0ZVN0cmluZygnR0lGODdhJyk7XG5cbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBTY3JlZW4gRGVzY3JpcHRvclxuXG4gICAgICBvdXQud3JpdGVTaG9ydChfd2lkdGgpO1xuICAgICAgb3V0LndyaXRlU2hvcnQoX2hlaWdodCk7XG5cbiAgICAgIG91dC53cml0ZUJ5dGUoMHg4MCk7IC8vIDJiaXRcbiAgICAgIG91dC53cml0ZUJ5dGUoMCk7XG4gICAgICBvdXQud3JpdGVCeXRlKDApO1xuXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgLy8gR2xvYmFsIENvbG9yIE1hcFxuXG4gICAgICAvLyBibGFja1xuICAgICAgb3V0LndyaXRlQnl0ZSgweDAwKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoMHgwMCk7XG4gICAgICBvdXQud3JpdGVCeXRlKDB4MDApO1xuXG4gICAgICAvLyB3aGl0ZVxuICAgICAgb3V0LndyaXRlQnl0ZSgweGZmKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoMHhmZik7XG4gICAgICBvdXQud3JpdGVCeXRlKDB4ZmYpO1xuXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgLy8gSW1hZ2UgRGVzY3JpcHRvclxuXG4gICAgICBvdXQud3JpdGVTdHJpbmcoJywnKTtcbiAgICAgIG91dC53cml0ZVNob3J0KDApO1xuICAgICAgb3V0LndyaXRlU2hvcnQoMCk7XG4gICAgICBvdXQud3JpdGVTaG9ydChfd2lkdGgpO1xuICAgICAgb3V0LndyaXRlU2hvcnQoX2hlaWdodCk7XG4gICAgICBvdXQud3JpdGVCeXRlKDApO1xuXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgLy8gTG9jYWwgQ29sb3IgTWFwXG5cbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBSYXN0ZXIgRGF0YVxuXG4gICAgICB2YXIgbHp3TWluQ29kZVNpemUgPSAyO1xuICAgICAgdmFyIHJhc3RlciA9IGdldExaV1Jhc3RlcihsendNaW5Db2RlU2l6ZSk7XG5cbiAgICAgIG91dC53cml0ZUJ5dGUobHp3TWluQ29kZVNpemUpO1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gMDtcblxuICAgICAgd2hpbGUgKHJhc3Rlci5sZW5ndGggLSBvZmZzZXQgPiAyNTUpIHtcbiAgICAgICAgb3V0LndyaXRlQnl0ZSgyNTUpO1xuICAgICAgICBvdXQud3JpdGVCeXRlcyhyYXN0ZXIsIG9mZnNldCwgMjU1KTtcbiAgICAgICAgb2Zmc2V0ICs9IDI1NTtcbiAgICAgIH1cblxuICAgICAgb3V0LndyaXRlQnl0ZShyYXN0ZXIubGVuZ3RoIC0gb2Zmc2V0KTtcbiAgICAgIG91dC53cml0ZUJ5dGVzKHJhc3Rlciwgb2Zmc2V0LCByYXN0ZXIubGVuZ3RoIC0gb2Zmc2V0KTtcbiAgICAgIG91dC53cml0ZUJ5dGUoMHgwMCk7XG5cbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBHSUYgVGVybWluYXRvclxuICAgICAgb3V0LndyaXRlU3RyaW5nKCc7Jyk7XG4gICAgfTtcblxuICAgIHZhciBiaXRPdXRwdXRTdHJlYW0gPSBmdW5jdGlvbihvdXQpIHtcblxuICAgICAgdmFyIF9vdXQgPSBvdXQ7XG4gICAgICB2YXIgX2JpdExlbmd0aCA9IDA7XG4gICAgICB2YXIgX2JpdEJ1ZmZlciA9IDA7XG5cbiAgICAgIHZhciBfdGhpcyA9IHt9O1xuXG4gICAgICBfdGhpcy53cml0ZSA9IGZ1bmN0aW9uKGRhdGEsIGxlbmd0aCkge1xuXG4gICAgICAgIGlmICggKGRhdGEgPj4+IGxlbmd0aCkgIT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbGVuZ3RoIG92ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChfYml0TGVuZ3RoICsgbGVuZ3RoID49IDgpIHtcbiAgICAgICAgICBfb3V0LndyaXRlQnl0ZSgweGZmICYgKCAoZGF0YSA8PCBfYml0TGVuZ3RoKSB8IF9iaXRCdWZmZXIpICk7XG4gICAgICAgICAgbGVuZ3RoIC09ICg4IC0gX2JpdExlbmd0aCk7XG4gICAgICAgICAgZGF0YSA+Pj49ICg4IC0gX2JpdExlbmd0aCk7XG4gICAgICAgICAgX2JpdEJ1ZmZlciA9IDA7XG4gICAgICAgICAgX2JpdExlbmd0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBfYml0QnVmZmVyID0gKGRhdGEgPDwgX2JpdExlbmd0aCkgfCBfYml0QnVmZmVyO1xuICAgICAgICBfYml0TGVuZ3RoID0gX2JpdExlbmd0aCArIGxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzLmZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfYml0TGVuZ3RoID4gMCkge1xuICAgICAgICAgIF9vdXQud3JpdGVCeXRlKF9iaXRCdWZmZXIpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcblxuICAgIHZhciBnZXRMWldSYXN0ZXIgPSBmdW5jdGlvbihsendNaW5Db2RlU2l6ZSkge1xuXG4gICAgICB2YXIgY2xlYXJDb2RlID0gMSA8PCBsendNaW5Db2RlU2l6ZTtcbiAgICAgIHZhciBlbmRDb2RlID0gKDEgPDwgbHp3TWluQ29kZVNpemUpICsgMTtcbiAgICAgIHZhciBiaXRMZW5ndGggPSBsendNaW5Db2RlU2l6ZSArIDE7XG5cbiAgICAgIC8vIFNldHVwIExaV1RhYmxlXG4gICAgICB2YXIgdGFibGUgPSBsendUYWJsZSgpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsZWFyQ29kZTsgaSArPSAxKSB7XG4gICAgICAgIHRhYmxlLmFkZChTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICk7XG4gICAgICB9XG4gICAgICB0YWJsZS5hZGQoU3RyaW5nLmZyb21DaGFyQ29kZShjbGVhckNvZGUpICk7XG4gICAgICB0YWJsZS5hZGQoU3RyaW5nLmZyb21DaGFyQ29kZShlbmRDb2RlKSApO1xuXG4gICAgICB2YXIgYnl0ZU91dCA9IGJ5dGVBcnJheU91dHB1dFN0cmVhbSgpO1xuICAgICAgdmFyIGJpdE91dCA9IGJpdE91dHB1dFN0cmVhbShieXRlT3V0KTtcblxuICAgICAgLy8gY2xlYXIgY29kZVxuICAgICAgYml0T3V0LndyaXRlKGNsZWFyQ29kZSwgYml0TGVuZ3RoKTtcblxuICAgICAgdmFyIGRhdGFJbmRleCA9IDA7XG5cbiAgICAgIHZhciBzID0gU3RyaW5nLmZyb21DaGFyQ29kZShfZGF0YVtkYXRhSW5kZXhdKTtcbiAgICAgIGRhdGFJbmRleCArPSAxO1xuXG4gICAgICB3aGlsZSAoZGF0YUluZGV4IDwgX2RhdGEubGVuZ3RoKSB7XG5cbiAgICAgICAgdmFyIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKF9kYXRhW2RhdGFJbmRleF0pO1xuICAgICAgICBkYXRhSW5kZXggKz0gMTtcblxuICAgICAgICBpZiAodGFibGUuY29udGFpbnMocyArIGMpICkge1xuXG4gICAgICAgICAgcyA9IHMgKyBjO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBiaXRPdXQud3JpdGUodGFibGUuaW5kZXhPZihzKSwgYml0TGVuZ3RoKTtcblxuICAgICAgICAgIGlmICh0YWJsZS5zaXplKCkgPCAweGZmZikge1xuXG4gICAgICAgICAgICBpZiAodGFibGUuc2l6ZSgpID09ICgxIDw8IGJpdExlbmd0aCkgKSB7XG4gICAgICAgICAgICAgIGJpdExlbmd0aCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YWJsZS5hZGQocyArIGMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHMgPSBjO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJpdE91dC53cml0ZSh0YWJsZS5pbmRleE9mKHMpLCBiaXRMZW5ndGgpO1xuXG4gICAgICAvLyBlbmQgY29kZVxuICAgICAgYml0T3V0LndyaXRlKGVuZENvZGUsIGJpdExlbmd0aCk7XG5cbiAgICAgIGJpdE91dC5mbHVzaCgpO1xuXG4gICAgICByZXR1cm4gYnl0ZU91dC50b0J5dGVBcnJheSgpO1xuICAgIH07XG5cbiAgICB2YXIgbHp3VGFibGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIF9tYXAgPSB7fTtcbiAgICAgIHZhciBfc2l6ZSA9IDA7XG5cbiAgICAgIHZhciBfdGhpcyA9IHt9O1xuXG4gICAgICBfdGhpcy5hZGQgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKF90aGlzLmNvbnRhaW5zKGtleSkgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkdXAga2V5OicgKyBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIF9tYXBba2V5XSA9IF9zaXplO1xuICAgICAgICBfc2l6ZSArPSAxO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3NpemU7XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5pbmRleE9mID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBfbWFwW2tleV07XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5jb250YWlucyA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIF9tYXBba2V5XSAhPSAndW5kZWZpbmVkJztcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9O1xuXG4gIHZhciBjcmVhdGVJbWdUYWcgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBnZXRQaXhlbCwgYWx0KSB7XG5cbiAgICB2YXIgZ2lmID0gZ2lmSW1hZ2Uod2lkdGgsIGhlaWdodCk7XG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKz0gMSkge1xuICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCArPSAxKSB7XG4gICAgICAgIGdpZi5zZXRQaXhlbCh4LCB5LCBnZXRQaXhlbCh4LCB5KSApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBiID0gYnl0ZUFycmF5T3V0cHV0U3RyZWFtKCk7XG4gICAgZ2lmLndyaXRlKGIpO1xuXG4gICAgdmFyIGJhc2U2NCA9IGJhc2U2NEVuY29kZU91dHB1dFN0cmVhbSgpO1xuICAgIHZhciBieXRlcyA9IGIudG9CeXRlQXJyYXkoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBiYXNlNjQud3JpdGVCeXRlKGJ5dGVzW2ldKTtcbiAgICB9XG4gICAgYmFzZTY0LmZsdXNoKCk7XG5cbiAgICB2YXIgaW1nID0gJyc7XG4gICAgaW1nICs9ICc8aW1nJztcbiAgICBpbWcgKz0gJ1xcdTAwMjBzcmM9XCInO1xuICAgIGltZyArPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LCc7XG4gICAgaW1nICs9IGJhc2U2NDtcbiAgICBpbWcgKz0gJ1wiJztcbiAgICBpbWcgKz0gJ1xcdTAwMjB3aWR0aD1cIic7XG4gICAgaW1nICs9IHdpZHRoO1xuICAgIGltZyArPSAnXCInO1xuICAgIGltZyArPSAnXFx1MDAyMGhlaWdodD1cIic7XG4gICAgaW1nICs9IGhlaWdodDtcbiAgICBpbWcgKz0gJ1wiJztcbiAgICBpZiAoYWx0KSB7XG4gICAgICBpbWcgKz0gJ1xcdTAwMjBhbHQ9XCInO1xuICAgICAgaW1nICs9IGFsdDtcbiAgICAgIGltZyArPSAnXCInO1xuICAgIH1cbiAgICBpbWcgKz0gJy8+JztcblxuICAgIHJldHVybiBpbWc7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZUltZ09iamVjdCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGdldFBpeGVsKSB7XG5cbiAgICB2YXIgZ2lmID0gZ2lmSW1hZ2Uod2lkdGgsIGhlaWdodCk7XG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKz0gMSkge1xuICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCArPSAxKSB7XG4gICAgICAgIGdpZi5zZXRQaXhlbCh4LCB5LCBnZXRQaXhlbCh4LCB5KSApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBiID0gYnl0ZUFycmF5T3V0cHV0U3RyZWFtKCk7XG4gICAgZ2lmLndyaXRlKGIpO1xuXG4gICAgdmFyIGJhc2U2NCA9IGJhc2U2NEVuY29kZU91dHB1dFN0cmVhbSgpO1xuICAgIHZhciBieXRlcyA9IGIudG9CeXRlQXJyYXkoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBiYXNlNjQud3JpdGVCeXRlKGJ5dGVzW2ldKTtcbiAgICB9XG4gICAgYmFzZTY0LmZsdXNoKCk7XG5cbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsJyArIGJhc2U2NDtcbiAgICBpbWcud2lkdGggPSB3aWR0aDtcbiAgICBpbWcuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgcmV0dXJuIGltZztcbiAgfTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyByZXR1cm5zIHFyY29kZSBmdW5jdGlvbi5cblxuICByZXR1cm4ge1xuICAgIFFSQ29kZTogcXJjb2RlLFxuICAgIFFSVXRpbDogUVJVdGlsXG4gIH07XG59KCk7XG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH1cbn0oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBRUkNvZGU6IHFyY29kZS5RUkNvZGUsXG4gICAgICBRUlV0aWw6IHFyY29kZS5RUlV0aWxcbiAgICB9O1xufSkpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9xcmNvZGUuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTUVUQSAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBzZXREZXNjICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjbGFzcyBVdGlsIHtcbiAgc3RhdGljIGNyZWF0ZUNhbnZhcyhzaXplLCBpbWFnZSkge1xuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBzaXplO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBzaXplO1xuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgc2l6ZSwgc2l6ZSk7XG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxuXG4gIHN0YXRpYyB0aHJlc2hvbGQociwgZywgYiwgdmFsdWUpIHtcbiAgICByZXR1cm4gKDAuMjEyNipyICsgMC43MTUyKmcgKyAwLjA3MjIqYiA+PSB2YWx1ZSkgPyAyNTUgOiAwO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWw7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwuanMiXSwic291cmNlUm9vdCI6IiJ9