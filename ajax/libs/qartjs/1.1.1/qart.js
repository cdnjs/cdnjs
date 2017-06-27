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
/******/ 	__webpack_require__.p = "../dist/";

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
	        this.version = typeof options.version === 'undefined' ? QArt.DEFAULTS.version : options.version;
	    }

	    (0, _createClass3.default)(QArt, [{
	        key: 'make',
	        value: function make(el) {
	            var version = this.version;
	            var imageSize = 75 + version * 12;
	            var padding = 12;

	            var qr = (0, _qrcode.QRCode)(version, 'H');
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

	                        if (x < padding || y < padding || x >= imageSize - padding || y >= imageSize - padding) {
	                            resultImageBinary[i + 3] = 0;
	                            continue;
	                        }
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

	                    var patternPostion = _qrcode.QRUtil.getPatternPosition(version);
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
	                filter: 'threshold',
	                version: 10
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
//# sourceMappingURL=qart.js.map