(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["JsFile"] = factory();
	else
		root["JsFile"] = factory();
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _libsPolyfillsObject = __webpack_require__(1);

	var _libsPolyfillsObject2 = _interopRequireDefault(_libsPolyfillsObject);

	var _libsPolyfillsString = __webpack_require__(2);

	var _libsPolyfillsString2 = _interopRequireDefault(_libsPolyfillsString);

	var _utilsMerge = __webpack_require__(3);

	var _utilsMerge2 = _interopRequireDefault(_utilsMerge);

	var _read = __webpack_require__(8);

	var _read2 = _interopRequireDefault(_read);

	var _documentIndex = __webpack_require__(11);

	var _documentIndex2 = _interopRequireDefault(_documentIndex);

	var _engineIndex = __webpack_require__(18);

	var _engineIndex2 = _interopRequireDefault(_engineIndex);

	var _domIndex = __webpack_require__(17);

	var _domIndex2 = _interopRequireDefault(_domIndex);

	var _isSupported = __webpack_require__(10);

	var _isSupported2 = _interopRequireDefault(_isSupported);

	var documentEngines = [];
	var mimeTypes = [];

	var JsFile = (function () {
	    function JsFile(file, config) {
	        _classCallCheck(this, JsFile);

	        this.read = _read2['default'];

	        this.file = file;
	        this.config = {
	            workerPath: 'workers/'
	        };

	        for (var k in config) {
	            if (config.hasOwnProperty(k)) {
	                this.config[k] = config[k];
	            }
	        }
	    }

	    _createClass(JsFile, [{
	        key: 'findEngine',
	        value: function findEngine() {
	            var file = this.file;
	            var result = null;

	            documentEngines.some(function (Engine) {
	                if (Engine.test(file)) {
	                    result = Engine;
	                    return true;
	                }
	            });

	            return result;
	        }
	    }], [{
	        key: 'version',
	        value: '0.0.1',
	        enumerable: true
	    }, {
	        key: 'Engine',
	        value: _engineIndex2['default'],
	        enumerable: true
	    }, {
	        key: 'Document',
	        value: _documentIndex2['default'],
	        enumerable: true
	    }, {
	        key: 'dom',
	        value: _domIndex2['default'],

	        /**
	         *
	         * @param name
	         * @param mime
	         * @returns {Engine}
	         */
	        enumerable: true
	    }, {
	        key: 'defineEngine',
	        value: defineEngine,
	        enumerable: true
	    }]);

	    return JsFile;
	})();

	Object.defineProperties(JsFile, {
	    mimeTypes: {
	        enumerable: false,
	        get: function get() {
	            return mimeTypes.slice(0);
	        }
	    },

	    isSupported: {
	        /**
	         * @description Check required technologies
	         * @returns {boolean}
	         */
	        get: _isSupported2['default']
	    }
	});

	function defineEngine() {
	    var Engine = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var engineMimeTypes = Engine.mimeTypes;

	    if (typeof Engine.test === 'function' && Array.isArray(engineMimeTypes)) {
	        mimeTypes.push.apply(mimeTypes, engineMimeTypes);
	        return documentEngines.push(Engine);
	    }

	    return null;
	}

	exports['default'] = JsFile;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/merge
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	if (!Object.merge) {
	    Object.defineProperty(Object, 'merge', {
	        enumerable: false,
	        configurable: true,
	        writable: true,
	        value: function value(target) {
	            if (target === undefined || target === null) {
	                throw new TypeError('Cannot convert first argument to object');
	            }

	            var to = Object(target);
	            for (var i = 1; i < arguments.length; i++) {
	                var nextSource = arguments[i];
	                if (nextSource === undefined || nextSource === null) {
	                    continue;
	                }

	                nextSource = Object(nextSource);
	                var keysArray = Object.keys(Object(nextSource));
	                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	                    var nextKey = keysArray[nextIndex];
	                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	                    if (desc !== undefined && desc.enumerable) {
	                        to[nextKey] = nextSource[nextKey];
	                    }
	                }
	            }

	            return to;
	        }
	    });
	}

	exports['default'] = {};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	String.prototype.includes = String.prototype.includes || function () {
	    return this.indexOf.apply(this, arguments) !== -1;
	};

	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var isSpecificValue = function isSpecificValue(val) {
	    return val instanceof Buffer || val instanceof Date || val instanceof RegExp;
	};

	function cloneSpecificValue(val) {
	    if (val instanceof Buffer) {
	        var buffer = new Buffer(val.length);
	        val.copy(buffer);
	        return buffer;
	    }

	    if (val instanceof Date) {
	        return new Date(val.getTime());
	    }

	    if (val instanceof RegExp) {
	        return new RegExp(val);
	    }

	    return val;
	}

	function deepCloneArray() {
	    var arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	    var clone = [];

	    arr.forEach(function (item, index) {
	        if (typeof item === 'object' && item !== null) {
	            if (Array.isArray(item)) {
	                clone[index] = deepCloneArray(item);
	            } else if (isSpecificValue(item)) {
	                clone[index] = cloneSpecificValue(item);
	            } else {
	                clone[index] = merge({}, item);
	            }
	        } else {
	            clone[index] = item;
	        }
	    });

	    return clone;
	}

	/**
	 * @description deep merge
	 * @param target
	 * @param sources
	 * @returns {*}
	 */
	function merge() {
	    var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    if (typeof target === 'object') {
	        for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            sources[_key - 1] = arguments[_key];
	        }

	        sources.forEach(function (src) {
	            for (var key in src) {
	                if (src.hasOwnProperty(key)) {
	                    var srcValue = src[key];
	                    var targetValue = target[key];

	                    // recursion prevention
	                    if (srcValue === target) {
	                        continue;
	                    }

	                    if (typeof srcValue !== 'object' || srcValue === null) {
	                        target[key] = srcValue;
	                        continue;
	                    }

	                    if (Array.isArray(srcValue)) {
	                        target[key] = deepCloneArray(srcValue);
	                        continue;
	                    }

	                    if (isSpecificValue(srcValue)) {
	                        target[key] = cloneSpecificValue(srcValue);
	                        continue;
	                    }

	                    if (typeof targetValue !== 'object' || targetValue === null || Array.isArray(targetValue)) {
	                        target[key] = merge({}, srcValue);
	                        continue;
	                    }

	                    target[key] = merge(targetValue, srcValue);
	                }
	            }
	        });
	    }

	    return target;
	}

	exports['default'] = merge;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	'use strict';

	var base64 = __webpack_require__(5);
	var ieee754 = __webpack_require__(6);
	var isArray = __webpack_require__(7);

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;
	Buffer.poolSize = 8192; // not used by this implementation

	var rootParent = {};

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  function Bar() {}
	  try {
	    var arr = new Uint8Array(1);
	    arr.foo = function () {
	      return 42;
	    };
	    arr.constructor = Bar;
	    return arr.foo() === 42 && // typed array instances can be augmented
	    arr.constructor === Bar && // constructor can be set
	    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
	  } catch (e) {
	    return false;
	  }
	})();

	function kMaxLength() {
	  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer(arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1]);
	    return new Buffer(arg);
	  }

	  this.length = 0;
	  this.parent = undefined;

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg);
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
	  }

	  // Unusual.
	  return fromObject(this, arg);
	}

	function fromNumber(that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0;
	    }
	  }
	  return that;
	}

	function fromString(that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8';

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0;
	  that = allocate(that, length);

	  that.write(string, encoding);
	  return that;
	}

	function fromObject(that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object);

	  if (isArray(object)) return fromArray(that, object);

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string');
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object);
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object);
	    }
	  }

	  if (object.length) return fromArrayLike(that, object);

	  return fromJsonObject(that, object);
	}

	function fromBuffer(that, buffer) {
	  var length = checked(buffer.length) | 0;
	  that = allocate(that, length);
	  buffer.copy(that, 0, 0, length);
	  return that;
	}

	function fromArray(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	function fromArrayBuffer(that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength;
	    that = Buffer._augment(new Uint8Array(array));
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array));
	  }
	  return that;
	}

	function fromArrayLike(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject(that, object) {
	  var array;
	  var length = 0;

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data;
	    length = checked(array.length) | 0;
	  }
	  that = allocate(that, length);

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	function allocate(that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length));
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length;
	    that._isBuffer = true;
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
	  if (fromPool) that.parent = rootParent;

	  return that;
	}

	function checked(length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
	  }
	  return length | 0;
	}

	function SlowBuffer(subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding);

	  var buf = new Buffer(subject, encoding);
	  delete buf.parent;
	  return buf;
	}

	Buffer.isBuffer = function isBuffer(b) {
	  return !!(b != null && b._isBuffer);
	};

	Buffer.compare = function compare(a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers');
	  }

	  if (a === b) return 0;

	  var x = a.length;
	  var y = b.length;

	  var i = 0;
	  var len = Math.min(x, y);
	  while (i < len) {
	    if (a[i] !== b[i]) break;

	    ++i;
	  }

	  if (i !== len) {
	    x = a[i];
	    y = b[i];
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	Buffer.isEncoding = function isEncoding(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;
	    default:
	      return false;
	  }
	};

	Buffer.concat = function concat(list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.');

	  if (list.length === 0) {
	    return new Buffer(0);
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length;
	    }
	  }

	  var buf = new Buffer(length);
	  var pos = 0;
	  for (i = 0; i < list.length; i++) {
	    var item = list[i];
	    item.copy(buf, pos);
	    pos += item.length;
	  }
	  return buf;
	};

	function byteLength(string, encoding) {
	  if (typeof string !== 'string') string = '' + string;

	  var len = string.length;
	  if (len === 0) return 0;

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len;
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length;
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;
	      case 'hex':
	        return len >>> 1;
	      case 'base64':
	        return base64ToBytes(string).length;
	      default:
	        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined;
	Buffer.prototype.parent = undefined;

	function slowToString(encoding, start, end) {
	  var loweredCase = false;

	  start = start | 0;
	  end = end === undefined || end === Infinity ? this.length : end | 0;

	  if (!encoding) encoding = 'utf8';
	  if (start < 0) start = 0;
	  if (end > this.length) end = this.length;
	  if (end <= start) return '';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);

	      case 'ascii':
	        return asciiSlice(this, start, end);

	      case 'binary':
	        return binarySlice(this, start, end);

	      case 'base64':
	        return base64Slice(this, start, end);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	Buffer.prototype.toString = function toString() {
	  var length = this.length | 0;
	  if (length === 0) return '';
	  if (arguments.length === 0) return utf8Slice(this, 0, length);
	  return slowToString.apply(this, arguments);
	};

	Buffer.prototype.equals = function equals(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return true;
	  return Buffer.compare(this, b) === 0;
	};

	Buffer.prototype.inspect = function inspect() {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>';
	};

	Buffer.prototype.compare = function compare(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return 0;
	  return Buffer.compare(this, b);
	};

	Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;else if (byteOffset < -0x80000000) byteOffset = -0x80000000;
	  byteOffset >>= 0;

	  if (this.length === 0) return -1;
	  if (byteOffset >= this.length) return -1;

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0);

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1; // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset);
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset);
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
	    }
	    return arrayIndexOf(this, [val], byteOffset);
	  }

	  function arrayIndexOf(arr, val, byteOffset) {
	    var foundIndex = -1;
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex;
	      } else {
	        foundIndex = -1;
	      }
	    }
	    return -1;
	  }

	  throw new TypeError('val must be string, number or Buffer');
	};

	// `get` is deprecated
	Buffer.prototype.get = function get(offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.');
	  return this.readUInt8(offset);
	};

	// `set` is deprecated
	Buffer.prototype.set = function set(v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.');
	  return this.writeUInt8(v, offset);
	};

	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string');

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) throw new Error('Invalid hex string');
	    buf[offset + i] = parsed;
	  }
	  return i;
	}

	function utf8Write(buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}

	function asciiWrite(buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length);
	}

	function binaryWrite(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}

	function base64Write(buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length);
	}

	function ucs2Write(buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}

	Buffer.prototype.write = function write(string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	      encoding = offset;
	      length = this.length;
	      offset = 0;
	      // Buffer#write(string, offset[, length][, encoding])
	    } else if (isFinite(offset)) {
	        offset = offset | 0;
	        if (isFinite(length)) {
	          length = length | 0;
	          if (encoding === undefined) encoding = 'utf8';
	        } else {
	          encoding = length;
	          length = undefined;
	        }
	        // legacy write(string, encoding, offset, length) - remove in v0.13
	      } else {
	          var swap = encoding;
	          encoding = offset;
	          offset = length | 0;
	          length = swap;
	        }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds');
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length);

	      case 'ascii':
	        return asciiWrite(this, string, offset, length);

	      case 'binary':
	        return binaryWrite(this, string, offset, length);

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};

	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf);
	  } else {
	    return base64.fromByteArray(buf.slice(start, end));
	  }
	}

	function utf8Slice(buf, start, end) {
	  var res = '';
	  var tmp = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
	      tmp = '';
	    } else {
	      tmp += '%' + buf[i].toString(16);
	    }
	  }

	  return res + decodeUtf8Char(tmp);
	}

	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret;
	}

	function binarySlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret;
	}

	function hexSlice(buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i]);
	  }
	  return out;
	}

	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res;
	}

	Buffer.prototype.slice = function slice(start, end) {
	  var len = this.length;
	  start = ~ ~start;
	  end = end === undefined ? len : ~ ~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end));
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this;

	  return newBuf;
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset(offset, ext, length) {
	  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
	}

	Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset];
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | this[offset + 1] << 8;
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] << 8 | this[offset + 1];
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};

	Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return this[offset];
	  return (0xff - this[offset] + 1) * -1;
	};

	Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | this[offset + 1] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | this[offset] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};

	Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};

	Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4);
	};

	Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4);
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8);
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8);
	};

	function checkInt(buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance');
	  if (value > max || value < min) throw new RangeError('value is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('index out of range');
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = value;
	  return offset + 1;
	};

	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = value >>> 24;
	    this[offset + 2] = value >>> 16;
	    this[offset + 1] = value >>> 8;
	    this[offset] = value;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = value < 0 ? 1 : 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = value < 0 ? 1 : 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = value;
	  return offset + 1;
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value;
	    this[offset + 1] = value >>> 8;
	    this[offset + 2] = value >>> 16;
	    this[offset + 3] = value >>> 24;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('index out of range');
	  if (offset < 0) throw new RangeError('index out of range');
	}

	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};

	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy(target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0;
	  if (target.length === 0 || this.length === 0) return 0;

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds');
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
	  if (end < 0) throw new RangeError('sourceEnd out of bounds');

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart);
	  }

	  return len;
	};

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill(value, start, end) {
	  if (!value) value = 0;
	  if (!start) start = 0;
	  if (!end) end = this.length;

	  if (end < start) throw new RangeError('end < start');

	  // Fill 0 bytes; we're done
	  if (end === start) return;
	  if (this.length === 0) return;

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds');
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds');

	  var i;
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value;
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString());
	    var len = bytes.length;
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len];
	    }
	  }

	  return this;
	};

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return new Buffer(this).buffer;
	    } else {
	      var buf = new Uint8Array(this.length);
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i];
	      }
	      return buf.buffer;
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
	  }
	};

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype;

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment(arr) {
	  arr.constructor = Buffer;
	  arr._isBuffer = true;

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set;

	  // deprecated
	  arr.get = BP.get;
	  arr.set = BP.set;

	  arr.write = BP.write;
	  arr.toString = BP.toString;
	  arr.toLocaleString = BP.toString;
	  arr.toJSON = BP.toJSON;
	  arr.equals = BP.equals;
	  arr.compare = BP.compare;
	  arr.indexOf = BP.indexOf;
	  arr.copy = BP.copy;
	  arr.slice = BP.slice;
	  arr.readUIntLE = BP.readUIntLE;
	  arr.readUIntBE = BP.readUIntBE;
	  arr.readUInt8 = BP.readUInt8;
	  arr.readUInt16LE = BP.readUInt16LE;
	  arr.readUInt16BE = BP.readUInt16BE;
	  arr.readUInt32LE = BP.readUInt32LE;
	  arr.readUInt32BE = BP.readUInt32BE;
	  arr.readIntLE = BP.readIntLE;
	  arr.readIntBE = BP.readIntBE;
	  arr.readInt8 = BP.readInt8;
	  arr.readInt16LE = BP.readInt16LE;
	  arr.readInt16BE = BP.readInt16BE;
	  arr.readInt32LE = BP.readInt32LE;
	  arr.readInt32BE = BP.readInt32BE;
	  arr.readFloatLE = BP.readFloatLE;
	  arr.readFloatBE = BP.readFloatBE;
	  arr.readDoubleLE = BP.readDoubleLE;
	  arr.readDoubleBE = BP.readDoubleBE;
	  arr.writeUInt8 = BP.writeUInt8;
	  arr.writeUIntLE = BP.writeUIntLE;
	  arr.writeUIntBE = BP.writeUIntBE;
	  arr.writeUInt16LE = BP.writeUInt16LE;
	  arr.writeUInt16BE = BP.writeUInt16BE;
	  arr.writeUInt32LE = BP.writeUInt32LE;
	  arr.writeUInt32BE = BP.writeUInt32BE;
	  arr.writeIntLE = BP.writeIntLE;
	  arr.writeIntBE = BP.writeIntBE;
	  arr.writeInt8 = BP.writeInt8;
	  arr.writeInt16LE = BP.writeInt16LE;
	  arr.writeInt16BE = BP.writeInt16BE;
	  arr.writeInt32LE = BP.writeInt32LE;
	  arr.writeInt32BE = BP.writeInt32BE;
	  arr.writeFloatLE = BP.writeFloatLE;
	  arr.writeFloatBE = BP.writeFloatBE;
	  arr.writeDoubleLE = BP.writeDoubleLE;
	  arr.writeDoubleBE = BP.writeDoubleBE;
	  arr.fill = BP.fill;
	  arr.inspect = BP.inspect;
	  arr.toArrayBuffer = BP.toArrayBuffer;

	  return arr;
	};

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return '';
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str;
	}

	function stringtrim(str) {
	  if (str.trim) return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}

	function toHex(n) {
	  if (n < 16) return '0' + n.toString(16);
	  return n.toString(16);
	}

	function utf8ToBytes(string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];
	  var i = 0;

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          leadSurrogate = codePoint;
	          continue;
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000;
	          leadSurrogate = null;
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else {
	          // valid lead
	          leadSurrogate = codePoint;
	          continue;
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	      leadSurrogate = null;
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break;
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break;
	      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break;
	      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break;
	      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else {
	      throw new Error('Invalid code point');
	    }
	  }

	  return bytes;
	}

	function asciiToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray;
	}

	function utf16leToBytes(str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break;

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray;
	}

	function base64ToBytes(str) {
	  return base64.toByteArray(base64clean(str));
	}

	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if (i + offset >= dst.length || i >= src.length) break;
	    dst[i + offset] = src[i];
	  }
	  return i;
	}

	function decodeUtf8Char(str) {
	  try {
	    return decodeURIComponent(str);
	  } catch (err) {
	    return String.fromCharCode(0xFFFD); // UTF 8 invalid char
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

		var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

		var PLUS = '+'.charCodeAt(0);
		var SLASH = '/'.charCodeAt(0);
		var NUMBER = '0'.charCodeAt(0);
		var LOWER = 'a'.charCodeAt(0);
		var UPPER = 'A'.charCodeAt(0);
		var PLUS_URL_SAFE = '-'.charCodeAt(0);
		var SLASH_URL_SAFE = '_'.charCodeAt(0);

		function decode(elt) {
			var code = elt.charCodeAt(0);
			if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
			if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
			if (code < NUMBER) return -1; //no match
			if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
			if (code < UPPER + 26) return code - UPPER;
			if (code < LOWER + 26) return code - LOWER + 26;
		}

		function b64ToByteArray(b64) {
			var i, j, l, tmp, placeHolders, arr;

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4');
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length;
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders);

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length;

			var L = 0;

			function push(v) {
				arr[L++] = v;
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
				push((tmp & 0xFF0000) >> 16);
				push((tmp & 0xFF00) >> 8);
				push(tmp & 0xFF);
			}

			if (placeHolders === 2) {
				tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
				push(tmp & 0xFF);
			} else if (placeHolders === 1) {
				tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
				push(tmp >> 8 & 0xFF);
				push(tmp & 0xFF);
			}

			return arr;
		}

		function uint8ToBase64(uint8) {
			var i,
			    extraBytes = uint8.length % 3,
			    // if we have 1 byte left, pad 2 bytes
			output = "",
			    temp,
			    length;

			function encode(num) {
				return lookup.charAt(num);
			}

			function tripletToBase64(num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
				output += tripletToBase64(temp);
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1];
					output += encode(temp >> 2);
					output += encode(temp << 4 & 0x3F);
					output += '==';
					break;
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
					output += encode(temp >> 10);
					output += encode(temp >> 4 & 0x3F);
					output += encode(temp << 2 & 0x3F);
					output += '=';
					break;
			}

			return output;
		}

		exports.toByteArray = b64ToByteArray;
		exports.fromByteArray = uint8ToBase64;
	})( false ? undefined.base64js = {} : exports);

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? nBytes - 1 : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & (1 << -nBits) - 1;
	  s >>= -nBits;
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : (s ? -1 : 1) * Infinity;
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	  var i = isLE ? 0 : nBytes - 1;
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	'use strict';

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !!val && '[object Array]' == str.call(val);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsErrors = __webpack_require__(9);

	var _utilsErrors2 = _interopRequireDefault(_utilsErrors);

	var _isSupported = __webpack_require__(10);

	var _isSupported2 = _interopRequireDefault(_isSupported);

	/**
	 * @description Read the file
	 * @returns {Promise}
	 */

	exports['default'] = function () {
	    return new Promise((function (resolve, reject) {
	        if (!(0, _isSupported2['default'])()) {
	            reject(new Error(_utilsErrors2['default'].requiredTechnologies));
	            return;
	        }

	        var file = this.file;
	        if (!file || !(file instanceof File || file instanceof Blob)) {
	            reject(new Error(_utilsErrors2['default'].invalidFileType));
	            return;
	        }

	        var Engine = this.findEngine(file);
	        if (!Engine) {
	            reject(new Error(_utilsErrors2['default'].invalidFileType));
	            return;
	        }

	        var engine = new Engine(file, this.config);
	        var parser = engine[engine.parser] || engine.parser;
	        if (typeof parser === 'function') {
	            parser.call(engine).then(resolve, reject);
	        } else {
	            reject(new Error(_utilsErrors2['default'].invalidParser));
	        }
	    }).bind(this));
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * @description error objects
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    invalidFileType: 'Invalid file type. It must be an instance of File or Blob',
	    invalidLoadFile: 'Can\'t load the file',
	    invalidReadFile: 'Can\'t read the file',
	    requiredTechnologies: 'Doesn\'t have required technologies',
	    invalidParser: 'Doesn\'t have a parser',
	    invalidReadArchive: 'Can\'t read the archive',
	    notFoundMethodCreateDocument: 'Method `createDocument` not found',
	    invalidWorker: 'Can\'t run the worker'
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function () {
	    return Boolean(typeof File !== 'undefined' && typeof Blob !== 'undefined' && typeof FileReader !== 'undefined' && typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof DataView !== 'undefined' && Blob.prototype.slice);
	};

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _htmlIndex = __webpack_require__(12);

	var _htmlIndex2 = _interopRequireDefault(_htmlIndex);

	var _utilsMerge = __webpack_require__(3);

	var _utilsMerge2 = _interopRequireDefault(_utilsMerge);

	/**
	 * @param attrs
	 */

	var Document = (function () {
	    function Document() {
	        var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Document);

	        var zoom = Number(attrs.zoom);
	        var wordsCount = Number(attrs.wordsCount);

	        this._data = (0, _utilsMerge2['default'])({
	            name: '',
	            language: '',
	            pages: []
	        }, attrs);

	        if (isNaN(zoom) || zoom < 0 || zoom > 100) {
	            zoom = 100;
	        } else {
	            zoom = Math.round(zoom * 100) / 100;
	        }

	        if (isNaN(wordsCount) || wordsCount < 0) {
	            wordsCount = 0;
	        }

	        this._data.zoom = zoom;
	        this._data.wordsCount = wordsCount;
	    }

	    _createClass(Document, [{
	        key: 'html',
	        value: function html(options) {
	            var html = new _htmlIndex2['default'](options);

	            return html.buildDocument(this._data.pages);
	        }
	    }, {
	        key: 'json',
	        value: function json() {
	            return this._data.pages.slice(0);
	        }
	    }, {
	        key: 'page',
	        value: function page(index) {
	            return this._data.pages[index];
	        }
	    }]);

	    return Document;
	})();

	Object.defineProperties(Document, {
	    elementPrototype: {
	        get: function get() {
	            return {
	                children: [],
	                style: {
	                    position: 'relative',
	                    boxSizing: 'border-box'
	                },
	                properties: {
	                    tagName: 'DIV',
	                    textContent: ''
	                }
	            };
	        }
	    }
	});

	/**
	 *
	 */
	Object.defineProperties(Document.prototype, {
	    /**
	     *
	     */
	    language: {
	        get: function get() {
	            return this._data.language;
	        }
	    },

	    /**
	     *
	     */
	    name: {
	        get: function get() {
	            return this._data.name;
	        }
	    },

	    /**
	     *
	     */
	    wordsCount: {
	        get: function get() {
	            return this._data.wordsCount;
	        }
	    },

	    /**
	     *
	     */
	    length: {
	        get: function get() {
	            return this._data.pages.length;
	        }
	    },

	    /**
	     *
	     */
	    zoom: {
	        get: function get() {
	            return this._data.zoom;
	        }
	    },

	    /**
	     *
	     */
	    isEmpty: {
	        get: function get() {
	            return !(this._data.pages && this._data.pages[0]);
	        }
	    }
	});

	exports['default'] = Document;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _srcBuildElement = __webpack_require__(13);

	var _srcBuildElement2 = _interopRequireDefault(_srcBuildElement);

	var _srcBuildPageNumber = __webpack_require__(14);

	var _srcBuildPageNumber2 = _interopRequireDefault(_srcBuildPageNumber);

	var _srcSetStyles = __webpack_require__(15);

	var _srcSetStyles2 = _interopRequireDefault(_srcSetStyles);

	var _srcSetProperties = __webpack_require__(16);

	var _srcSetProperties2 = _interopRequireDefault(_srcSetProperties);

	var _domIndex = __webpack_require__(17);

	var _domIndex2 = _interopRequireDefault(_domIndex);

	var _utilsMerge = __webpack_require__(3);

	var _utilsMerge2 = _interopRequireDefault(_utilsMerge);

	var Html = (function () {
	    function Html(options) {
	        _classCallCheck(this, Html);

	        this.setStyles = _srcSetStyles2['default'];
	        this.setProperties = _srcSetProperties2['default'];
	        this.buildElement = _srcBuildElement2['default'];

	        this.options = (0, _utilsMerge2['default'])({
	            pageClassName: 'jf-page'
	        }, options);
	    }

	    _createClass(Html, [{
	        key: 'buildDocument',
	        value: function buildDocument(pages) {
	            var doc = document.createDocumentFragment();

	            if (!Array.isArray(pages)) {
	                return doc;
	            }

	            var pageClassName = this.options.pageClassName;
	            pages.forEach(function (page) {
	                var pageEl = this.buildElement(page);
	                pageEl.classList.add(pageClassName);

	                if (page.properties && page.properties.pageNumber) {
	                    (0, _srcBuildPageNumber2['default'])(pageEl, page);
	                }

	                doc.appendChild(pageEl);
	            }, this);

	            return doc;
	        }
	    }]);

	    return Html;
	})();

	exports['default'] = Html;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 *
	 * @param data
	 * @private
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function () {
	    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var properties = data.properties || {};
	    var tagName = properties.tagName;
	    var el = document.createElement(tagName);

	    this.setStyles(el, data);
	    this.setProperties(el, data);

	    (data.children || []).forEach((function (child) {
	        el.appendChild(this.buildElement(child));
	    }).bind(this));

	    return el;
	};

	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (el) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var numberBlock = document.createElement('div');
	    var _data$options = data.options;
	    var header = _data$options.header;
	    var pageNumber = _data$options.pageNumber;

	    el.style.position = 'relative';
	    numberBlock.style.position = 'absolute';
	    numberBlock.style.top = 0;
	    var rule = header.style.height;
	    if (rule) {
	        numberBlock.style.top = rule.value + rule.unit;
	    }

	    rule = el.style.paddingRight;
	    if (rule) {
	        numberBlock.style.right = rule.value + rule.unit;
	    }

	    numberBlock.appendChild(document.createTextNode(pageNumber.value));
	    el.appendChild(numberBlock);

	    return el;
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 *
	 * @param node
	 * @param data
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (node) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    for (var prop in data.style) {
	        if (data.style.hasOwnProperty(prop)) {
	            var value = data.style[prop];

	            if (typeof value === 'object') {
	                if (value.unit) {
	                    node.style[prop] = value.value + value.unit;
	                }
	            } else {
	                node.style[prop] = value;
	            }
	        }
	    }
	};

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var nonDomProperties = {
	    after: true,
	    tagName: true,
	    pageNumber: true
	};

	/**
	 *
	 * @param node
	 * @param data
	 * @private
	 */

	exports["default"] = function (node, data) {
	    for (var prop in data.properties) {
	        if (data.properties.hasOwnProperty(prop) && !nonDomProperties[prop]) {
	            node[prop] = data.properties[prop];
	        }
	    }
	};

	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * @namespace $
	 * @type {*}
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = Object.defineProperties({}, {
	    children: {
	        /**
	         * @params element {Object}
	         * @return {Array}
	         */
	        value: function value(element) {
	            if (!element) {
	                return [];
	            }

	            if (element.children) {
	                return Array.prototype.slice.call(element.children, 0);
	            }

	            var result = [];
	            var child = element.firstChild;

	            while (child) {
	                //it is an element
	                if (child.nodeType === 1) {
	                    result.push(child);
	                }

	                child = child.nextSibling;
	            }

	            return result;
	        }
	    }
	});
	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _srcNormalizeDataUri = __webpack_require__(19);

	var _srcNormalizeDataUri2 = _interopRequireDefault(_srcNormalizeDataUri);

	var _srcValidateFile = __webpack_require__(20);

	var _srcValidateFile2 = _interopRequireDefault(_srcValidateFile);

	var _srcCropUnit = __webpack_require__(21);

	var _srcCropUnit2 = _interopRequireDefault(_srcCropUnit);

	var _srcReadFileEntry = __webpack_require__(22);

	var _srcReadFileEntry2 = _interopRequireDefault(_srcReadFileEntry);

	var _srcReadSingleFile = __webpack_require__(24);

	var _srcReadSingleFile2 = _interopRequireDefault(_srcReadSingleFile);

	var _srcNormalizeColorValue = __webpack_require__(25);

	var _srcNormalizeColorValue2 = _interopRequireDefault(_srcNormalizeColorValue);

	var _srcNormalizeDate = __webpack_require__(27);

	var _srcNormalizeDate2 = _interopRequireDefault(_srcNormalizeDate);

	var _srcAttributeToBoolean = __webpack_require__(28);

	var _srcAttributeToBoolean2 = _interopRequireDefault(_srcAttributeToBoolean);

	var _srcFormatPropertyName = __webpack_require__(29);

	var _srcFormatPropertyName2 = _interopRequireDefault(_srcFormatPropertyName);

	var _srcReadArchive = __webpack_require__(30);

	var _srcReadArchive2 = _interopRequireDefault(_srcReadArchive);

	var _srcColorsList = __webpack_require__(26);

	var _srcColorsList2 = _interopRequireDefault(_srcColorsList);

	var _srcValidateUrl = __webpack_require__(34);

	var _srcValidateUrl2 = _interopRequireDefault(_srcValidateUrl);

	var _utilsErrors = __webpack_require__(9);

	var _utilsErrors2 = _interopRequireDefault(_utilsErrors);

	var _utilsClone = __webpack_require__(35);

	var _utilsClone2 = _interopRequireDefault(_utilsClone);

	var _utilsMerge = __webpack_require__(3);

	var _utilsMerge2 = _interopRequireDefault(_utilsMerge);

	var halfTabAsSpaces = '  ';

	var Engine = (function () {
	    function Engine(file, config) {
	        _classCallCheck(this, Engine);

	        this.parser = 'readSingleFile';
	        this.readFileEntry = _srcReadFileEntry2['default'];
	        this.readSingleFile = _srcReadSingleFile2['default'];
	        this.readArchive = _srcReadArchive2['default'];

	        this.file = file;
	        this.fileName = this.file && this.file.name || '';
	        this.config = {};
	        for (var k in config) {
	            if (config.hasOwnProperty(k)) {
	                this.config[k] = config[k];
	            }
	        }
	    }

	    _createClass(Engine, [{
	        key: 'isValid',
	        value: function isValid() {
	            return this.constructor.test(this.file);
	        }
	    }], [{
	        key: 'getCharFromHex',
	        value: function getCharFromHex(hex) {
	            var code = parseInt(hex, 16);
	            return !isNaN(code) ? String.fromCharCode(code) : '';
	        }
	    }, {
	        key: 'replaceSpaces',
	        value: function replaceSpaces(str) {
	            return String(str || '').replace(/\s{2,}/g, halfTabAsSpaces);
	        }
	    }, {
	        key: 'test',

	        /**
	         *
	         * @returns {Boolean}
	         */
	        value: function test() {
	            return false;
	        }
	    }, {
	        key: 'normalizeDataUri',
	        value: _srcNormalizeDataUri2['default'],
	        enumerable: true
	    }, {
	        key: 'formatPropertyName',
	        value: _srcFormatPropertyName2['default'],
	        enumerable: true
	    }, {
	        key: 'cropUnit',
	        value: _srcCropUnit2['default'],
	        enumerable: true
	    }, {
	        key: 'normalizeColorValue',
	        value: _srcNormalizeColorValue2['default'],
	        enumerable: true
	    }, {
	        key: 'normalizeDate',
	        value: _srcNormalizeDate2['default'],
	        enumerable: true
	    }, {
	        key: 'attributeToBoolean',
	        value: _srcAttributeToBoolean2['default'],
	        enumerable: true
	    }, {
	        key: 'validateUrl',
	        value: _srcValidateUrl2['default'],
	        enumerable: true
	    }, {
	        key: 'merge',
	        value: _utilsMerge2['default'],
	        enumerable: true
	    }, {
	        key: 'clone',
	        value: _utilsClone2['default'],
	        enumerable: true
	    }, {
	        key: 'validateFile',
	        value: _srcValidateFile2['default'],
	        enumerable: true
	    }, {
	        key: 'errors',
	        value: (0, _utilsClone2['default'])(_utilsErrors2['default']),
	        enumerable: true
	    }, {
	        key: 'colorsList',
	        value: (0, _utilsClone2['default'])(_srcColorsList2['default']),
	        enumerable: true
	    }, {
	        key: 'emDash',
	        value: '—',
	        enumerable: true
	    }, {
	        key: 'enDash',
	        value: '–',
	        enumerable: true
	    }, {
	        key: 'halfTabAsSpaces',
	        value: halfTabAsSpaces,
	        enumerable: true
	    }, {
	        key: 'tabAsSpaces',
	        value: '    ',
	        enumerable: true
	    }, {
	        key: 'space',
	        value: ' ',
	        enumerable: true
	    }, {
	        key: 'nbsp',
	        value: ' ',
	        enumerable: true
	    }, {
	        key: 'nbHyphen',
	        value: 'Ò',
	        enumerable: true
	    }]);

	    return Engine;
	})();

	exports['default'] = Engine;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var mimeTypesByExtension = {
	    png: 'image/png',
	    jpg: 'image/jpeg',
	    jpeg: 'image/jpeg',
	    gif: 'image/gif'
	};

	/**
	 *
	 * @param dataUri
	 * @param filename
	 * @return {String}
	 * @private
	 */

	exports['default'] = function (dataUri, filename) {
	    var extensionData = /[A-Za-z]+$/.exec(filename);
	    var mime = extensionData && mimeTypesByExtension[extensionData[0].toLowerCase()];

	    return !mime ? dataUri : dataUri.replace(/data:[^;]*;/, 'data:' + mime + ';');
	};

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * @description get type of file
	 * @param file {File|Blob}
	 * @param files {Array}
	 * @return {Boolean}
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (file, files) {
	    var found = false;

	    if (!file || !files || !(file instanceof File || file instanceof Blob)) {
	        return found;
	    }

	    var fileType = file.type;
	    var fileNameData = String(file.name).split('.');
	    var len = fileNameData.length;
	    var fileExtension = len > 1 ? fileNameData[len - 1] : '';
	    var mime = files.mime;
	    var extension = files.extension;

	    if (!Array.isArray(mime)) {
	        mime = [mime];
	    }

	    found = mime.some(function (type) {
	        return fileType.includes(type);
	    });

	    // if not found by mime type find by file extension
	    if (!found) {
	        if (!Array.isArray(extension)) {
	            extension = [extension];
	        }

	        found = extension.some(function (ext) {
	            return fileExtension.includes(ext);
	        });
	    }

	    return found;
	};

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 *
	 * @param value - for example, "18px", "10em", "2pt", etc.
	 * @return {Number} - for example, 18, 10, 12
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (value) {
	  value = Number(String(value).replace(/,/g, '.').replace(/[^0-9.]+/g, ''));
	  return !isNaN(value) ? value : 0;
	};

	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsErrors = __webpack_require__(9);

	var _taskIndex = __webpack_require__(23);

	var _taskIndex2 = _interopRequireDefault(_taskIndex);

	exports['default'] = function () {
	    // istanbul ignore next

	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var _config = _this.config;
	        var config = _config === undefined ? {} : _config;

	        if (!options.file) {
	            reject(new Error(_utilsErrors.invalidReadFile));
	            return;
	        }

	        new _taskIndex2['default'](config.workerPath + 'readFile.js', options, resolve, function (error) {
	            reject(error || new Error(_utilsErrors.invalidReadFile));
	        });
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(9);

	var maxWorkersCount = typeof navigator !== 'undefined' && navigator.hardwareConcurrency || 4;
	var queue = [];
	var createdWorkersCount = 0;

	function done(worker) {
	    worker.terminate();
	    createdWorkersCount--;
	    processQueue();
	}

	function processQueue() {
	    if (createdWorkersCount < maxWorkersCount) {
	        var _ret = (function () {
	            var taskOptions = queue.shift();

	            if (!taskOptions) {
	                return {
	                    v: undefined
	                };
	            }

	            createdWorkersCount++;
	            var worker = new Worker(taskOptions.url);

	            worker.onmessage = function (e) {
	                var data = e.data || {};

	                if (data.error) {
	                    this.onerror(data.error);
	                    taskOptions = null;
	                    return;
	                }

	                if (typeof taskOptions.resolve === 'function') {
	                    taskOptions.resolve(data.result);
	                }

	                taskOptions = null;
	                done(this);
	            };

	            worker.onerror = function () {
	                if (typeof taskOptions.reject === 'function') {
	                    taskOptions.reject(new Error(_utilsErrors.invalidWorker));
	                }

	                taskOptions = null;
	                done(this);
	            };

	            worker.postMessage(taskOptions.data);
	        })();

	        // istanbul ignore next
	        if (typeof _ret === 'object') return _ret.v;
	    }
	}

	var Task = function Task(url, data, resolve, reject) {
	    _classCallCheck(this, Task);

	    queue.push({
	        token: Date.now(),
	        url: url,
	        data: data,
	        resolve: resolve,
	        reject: reject
	    });
	    processQueue();
	};

	exports['default'] = Task;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsErrors = __webpack_require__(9);

	var _utilsErrors2 = _interopRequireDefault(_utilsErrors);

	exports['default'] = function () {
	    return new Promise((function (resolve, reject) {
	        if (!this.isValid()) {
	            reject(new Error(_utilsErrors2['default'].invalidFileType));
	            return;
	        }

	        this.readFileEntry({
	            file: this.file
	        }).then((function (result) {
	            if (typeof this.createDocument !== 'function') {
	                reject(new Error(_utilsErrors2['default'].notFoundMethodCreateDocument));
	                return;
	            }

	            this.createDocument(result).then(resolve, function (rejection) {
	                reject(rejection || new Error(_utilsErrors2['default'].invalidReadFile));
	            });
	        }).bind(this), function (error) {
	            return reject(error || new Error(_utilsErrors2['default'].invalidReadFile));
	        });
	    }).bind(this));
	};

	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _colorsList = __webpack_require__(26);

	var _colorsList2 = _interopRequireDefault(_colorsList);

	var defaultColor = _colorsList2['default'].black;

	/**
	 * @description Adjunct a color value to a single mind
	 * @param value
	 * @return {String}
	 * @private
	 */

	exports['default'] = function (value) {
	    if (!value || typeof value !== 'string') {
	        return defaultColor;
	    }

	    value = value.replace(/\s+/g, '');

	    if (/^#/.test(value)) {
	        return value.toUpperCase();
	    }

	    if (!isNaN(Number('0x' + value))) {
	        return '#' + value.toUpperCase();
	    }

	    value = value.toLowerCase();

	    return _colorsList2['default'][value] || defaultColor;
	};

	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 *
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    black: '#000000',
	    navy: '#000080',
	    darkblue: '#00008B',
	    mediumblue: '#0000CD',
	    blue: '#0000FF',
	    darkgreen: '#006400',
	    green: '#008000',
	    teal: '#008080',
	    darkcyan: '#008B8B',
	    deepskyblue: '#00BFFF',
	    darkturquoise: '#00CED1',
	    mediumspringgreen: '#00FA9A',
	    lime: '#00FF00',
	    springgreen: '#00FF7F',
	    aqua: '#00FFFF',
	    cyan: '#00FFFF',
	    midnightblue: '#191970',
	    dodgerblue: '#1E90FF',
	    lightseagreen: '#20B2AA',
	    forestgreen: '#228B22',
	    seagreen: '#2E8B57',
	    darkslategray: '#2F4F4F',
	    limegreen: '#32CD32',
	    mediumseagreen: '#3CB371',
	    turquoise: '#40E0D0',
	    royalblue: '#4169E1',
	    steelblue: '#4682B4',
	    darkslateblue: '#483D8B',
	    mediumturquoise: '#48D1CC',
	    white: '#FFFFFF',
	    indigo: '#4B0082',
	    darkolivegreen: '#556B2F',
	    cadetblue: '#5F9EA0',
	    cornflowerblue: '#6495ED',
	    mediumaquamarine: '#66CDAA',
	    dimgray: '#696969',
	    slateblue: '#6A5ACD',
	    olivedrab: '#6B8E23',
	    slategray: '#708090',
	    lightslategray: '#778899',
	    mediumslateblue: '#7B68EE',
	    lawngreen: '#7CFC00',
	    chartreuse: '#7FFF00',
	    aquamarine: '#7FFFD4',
	    maroon: '#800000',
	    purple: '#800080',
	    olive: '#808000',
	    gray: '#808080',
	    skyblue: '#87CEEB',
	    lightskyblue: '#87CEFA',
	    blueviolet: '#8A2BE2',
	    darkred: '#8B0000',
	    darkmagenta: '#8B008B',
	    saddlebrown: '#8B4513',
	    darkseagreen: '#8FBC8F',
	    lightgreen: '#90EE90',
	    mediumpurple: '#9370D8',
	    darkviolet: '#9400D3',
	    palegreen: '#98FB98',
	    darkorchid: '#9932CC',
	    yellowgreen: '#9ACD32',
	    sienna: '#A0522D',
	    brown: '#A52A2A',
	    darkgray: '#A9A9A9',
	    lightblue: '#ADD8E6',
	    greenyellow: '#ADFF2F',
	    paleturquoise: '#AFEEEE',
	    lightsteelblue: '#B0C4DE',
	    powderblue: '#B0E0E6',
	    firebrick: '#B22222',
	    darkgoldenrod: '#B8860B',
	    mediumorchid: '#BA55D3',
	    rosybrown: '#BC8F8F',
	    darkkhaki: '#BDB76B',
	    silver: '#C0C0C0',
	    mediumvioletred: '#C71585',
	    indianred: '#CD5C5C',
	    peru: '#CD853F',
	    chocolate: '#D2691E',
	    tan: '#D2B48C',
	    lightgray: '#D3D3D3',
	    palevioletred: '#D87093',
	    thistle: '#D8BFD8',
	    orchid: '#DA70D6',
	    goldenrod: '#DAA520',
	    crimson: '#DC143C',
	    gainsboro: '#DCDCDC',
	    plum: '#DDA0DD',
	    burlywood: '#DEB887',
	    lightcyan: '#E0FFFF',
	    lavender: '#E6E6FA',
	    darksalmon: '#E9967A',
	    violet: '#EE82EE',
	    palegoldenrod: '#EE82EE',
	    airforceblue: '#5D8AA8',
	    aliceblue: '#F0F8FF',
	    alizarincrimson: '#E32636',
	    almond: '#EFDECD',
	    amaranth: '#E52B50',
	    lightcoral: '#F08080',
	    khaki: '#F0E68C',
	    honeydew: '#F0FFF0',
	    azure: '#F0FFFF',
	    sandybrown: '#F4A460',
	    wheat: '#F5DEB3',
	    beige: '#F5F5DC',
	    whitesmoke: '#F5F5F5',
	    mintcream: '#F5FFFA',
	    ghostwhite: '#F8F8FF',
	    salmon: '#FA8072',
	    antiqueWhite: '#FAEBD7',
	    linen: '#FAF0E6',
	    lightgoldenrodyellow: '#FAFAD2',
	    oldlace: '#FDF5E6',
	    red: '#FF0000',
	    fuchsia: '#FF00FF',
	    magenta: '#FF00FF',
	    deeppink: '#FF1493',
	    orangered: '#FF4500',
	    tomato: '#FF6347',
	    hotpink: '#FF69B4',
	    coral: '#FF7F50',
	    darkorange: '#FF8C00',
	    lightSalmon: '#FFA07A',
	    orange: '#FFA500',
	    lightpink: '#FFB6C1',
	    pink: '#FFC0CB',
	    gold: '#FFD700',
	    peachpuff: '#FFDAB9',
	    navajowhite: '#FFDEAD',
	    moccasin: '#FFE4B5',
	    bisque: '#FFE4C4',
	    mistyrose: '#FFE4E1',
	    blanchedalmond: '#FFEBCD',
	    papayawhip: '#FFEFD5',
	    lavenderblush: '#FFF0F5',
	    seashell: '#FFF5EE',
	    cornsilk: '#FFF8DC',
	    lemonchiffon: '#FFFACD',
	    floralwhite: '#FFFAF0',
	    snow: '#FFFAFA',
	    yellow: '#FFFF00',
	    lightyellow: '#FFFFE0',
	    ivory: '#FFFFF0',
	    none: 'inherit'
	};
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 *
	 * @param str
	 * @return {String} - dd.mm.yyy
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (str) {
	    if (str) {
	        // yyyy-mm-dd
	        if (/^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/.test(str)) {
	            /**
	             * @description Transform to dd.mm.yyyy
	             * @type {string}
	             */
	            return str.split('-').reverse().join('.');
	        }
	    }

	    return '';
	};

	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 *
	 * @description Convert attribute value to boolean value
	 * @param attribute
	 * @return {Boolean}
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (attribute) {
	  var value = attribute && attribute.value || attribute;

	  return [true, 'true', 'on', '1', 1].indexOf(value) >= 0;
	};

	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * @description
	 * @param value
	 * @param options
	 * @return {String}
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (value) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  /**
	   * @description
	   * Remove namespace of property. namespace:property => property
	   * Transform property sub parts to Camel notation. my-property => myProperty
	   * @type {string}
	   */
	  var src = String(value || '').replace(/^[0-9a-zA-Z-_]+:/, '').replace(/-+([^-]?)/g, function (f, part) {
	    return part && part.toUpperCase() || '';
	  });

	  return src.charAt(0)[options.capitalize ? 'toUpperCase' : 'toLowerCase']() + src.slice(1);
	};

	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsErrors = __webpack_require__(9);

	var _zipIndex = __webpack_require__(31);

	var _zipIndex2 = _interopRequireDefault(_zipIndex);

	/**
	 * @description Read the file
	 * @returns {Promise}
	 */

	exports['default'] = function () {
	    // istanbul ignore next

	    var _this = this;

	    return new Promise(function (resolve, reject) {
	        if (!_this.isValid()) {
	            reject(new Error(_utilsErrors.invalidFileType));
	            return;
	        }

	        _zipIndex2['default'].readFile(_this.file, {
	            useWebWorkers: true,
	            workerScriptsPath: _this.config.workerPath
	        }).then((function (result) {
	            this.createDocument(result).then(resolve)['catch'](function (rejection) {
	                return reject(rejection || new Error(_utilsErrors.invalidFileType));
	            });
	        }).bind(_this))['catch'](reject);
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _srcZip = __webpack_require__(32);

	var _srcZip2 = _interopRequireDefault(_srcZip);

	var _srcEntry = __webpack_require__(33);

	var _srcEntry2 = _interopRequireDefault(_srcEntry);

	var BlobReader = _srcZip2['default'].BlobReader;
	var BlobWriter = _srcZip2['default'].BlobWriter;
	var createWorker = _srcZip2['default'].createWorker;
	var getDataHelper = _srcZip2['default'].getDataHelper;
	var seekEOCDR = _srcZip2['default'].seekEOCDR;
	var readCommonHeader = _srcZip2['default'].readCommonHeader;
	var getString = _srcZip2['default'].getString;
	var decodeUTF8 = _srcZip2['default'].decodeUTF8;
	var decodeASCII = _srcZip2['default'].decodeASCII;
	var ERR_BAD_FORMAT = _srcZip2['default'].ERR_BAD_FORMAT;
	exports['default'] = {
	    readFile: function readFile(file, options) {
	        Object.merge(_srcZip2['default'], options);

	        return new Promise(function (resolve, reject) {
	            var reader = new BlobReader(file);

	            /**
	             * instead of .init()
	             */
	            reader.size = file.size;

	            createWorker('inflater', function (worker) {
	                // look for End of central directory record
	                seekEOCDR(reader, function (dataView) {
	                    var dataLength = dataView.getUint32(16, true);
	                    var filesLength = dataView.getUint16(8, true);
	                    if (dataLength < 0 || dataLength >= reader.size) {
	                        reject();
	                        return;
	                    }

	                    reader.readUint8Array(dataLength, reader.size - dataLength, function (bytes) {
	                        var index = 0;
	                        var filename = undefined;
	                        var comment = undefined;
	                        var data = getDataHelper(bytes.length, bytes);
	                        var entries = [];
	                        var queue = [];
	                        var dataOptions = {
	                            inflateSN: 0
	                        };

	                        for (var i = 0; i < filesLength; i++) {
	                            var entry = new _srcEntry2['default']({
	                                reader: reader,
	                                worker: worker,
	                                writer: new BlobWriter()
	                            });

	                            if (data.view.getUint32(index) !== 0x504b0102) {
	                                reject(new Error(ERR_BAD_FORMAT));
	                                return;
	                            }

	                            readCommonHeader(entry, data, index + 6, true, onerror);
	                            entry.commentLength = data.view.getUint16(index + 32, true);
	                            entry.directory = (data.view.getUint8(index + 38) & 0x10) == 0x10;
	                            entry.offset = data.view.getUint32(index + 42, true);
	                            filename = getString(data.array.subarray(index + 46, index + 46 + entry.filenameLength));
	                            entry.filename = (entry.bitFlag & 0x0800) === 0x0800 ? decodeUTF8(filename) : decodeASCII(filename);
	                            if (!entry.directory && entry.filename[entry.filename.length - 1] === '/') {
	                                entry.directory = true;
	                            }

	                            var val = index + 46 + entry.filenameLength + entry.extraFieldLength;
	                            index = val + entry.commentLength;
	                            comment = getString(data.array.subarray(val, index));
	                            entry.comment = (entry.bitFlag & 0x0800) === 0x0800 ? decodeUTF8(comment) : decodeASCII(comment);
	                            entries.push(entry);
	                            queue.push(entry.getData(dataOptions));
	                        }

	                        Promise.all(queue).then(function (files) {
	                            var data = files.map(function (file, i) {
	                                return {
	                                    file: file,
	                                    entry: entries[i]
	                                };
	                            });

	                            entries = null;
	                            resolve(data);
	                        }, reject);
	                    }, function () {
	                        return reject(new Error(ERR_READ));
	                    });
	                });
	            }, reject);
	        });
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports) {

	/*
	 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright
	 notice, this list of conditions and the following disclaimer in
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ERR_BAD_FORMAT = "File format is not recognized.";
	var ERR_CRC = "CRC failed.";
	var ERR_ENCRYPTED = "File contains encrypted entry.";
	var ERR_ZIP64 = "File is using Zip64 (4gb+ file size).";
	var ERR_READ = "Error while reading zip file.";
	var ERR_WRITE = "Error while writing zip file.";
	var ERR_WRITE_DATA = "Error while writing file data.";
	var ERR_READ_DATA = "Error while reading file data.";
	var ERR_DUPLICATED_NAME = "File already exists.";
	var CHUNK_SIZE = 512 * 1024;

	var TEXT_PLAIN = "text/plain";

	var appendABViewSupported;
	try {
	    appendABViewSupported = new Blob([new DataView(new ArrayBuffer(0))]).size === 0;
	} catch (e) {}

	function Crc32() {
	    this.crc = -1;
	}
	Crc32.prototype.append = function append(data) {
	    var crc = this.crc | 0,
	        table = this.table;
	    for (var offset = 0, len = data.length | 0; offset < len; offset++) crc = crc >>> 8 ^ table[(crc ^ data[offset]) & 0xFF];
	    this.crc = crc;
	};
	Crc32.prototype.get = function get() {
	    return ~this.crc;
	};
	Crc32.prototype.table = (function () {
	    var i,
	        j,
	        t,
	        table = []; // Uint32Array is actually slower than []
	    for (i = 0; i < 256; i++) {
	        t = i;
	        for (j = 0; j < 8; j++) if (t & 1) t = t >>> 1 ^ 0xEDB88320;else t = t >>> 1;
	        table[i] = t;
	    }
	    return table;
	})();

	// "no-op" codec
	function NOOP() {}
	NOOP.prototype.append = function append(bytes, onprogress) {
	    return bytes;
	};
	NOOP.prototype.flush = function flush() {};

	function blobSlice(blob, index, length) {
	    if (index < 0 || length < 0 || index + length > blob.size) throw new RangeError('offset:' + index + ', length:' + length + ', size:' + blob.size);
	    if (blob.slice) return blob.slice(index, index + length);else if (blob.webkitSlice) return blob.webkitSlice(index, index + length);else if (blob.mozSlice) return blob.mozSlice(index, index + length);else if (blob.msSlice) return blob.msSlice(index, index + length);
	}

	function getDataHelper(byteLength, bytes) {
	    var dataBuffer, dataArray;
	    dataBuffer = new ArrayBuffer(byteLength);
	    dataArray = new Uint8Array(dataBuffer);
	    if (bytes) dataArray.set(bytes, 0);
	    return {
	        buffer: dataBuffer,
	        array: dataArray,
	        view: new DataView(dataBuffer)
	    };
	}

	// Readers
	function Reader() {}

	function TextReader(text) {
	    var that = this,
	        blobReader;

	    function init(callback, onerror) {
	        var blob = new Blob([text], {
	            type: TEXT_PLAIN
	        });
	        blobReader = new BlobReader(blob);
	        blobReader.init(function () {
	            that.size = blobReader.size;
	            callback();
	        }, onerror);
	    }

	    function readUint8Array(index, length, callback, onerror) {
	        blobReader.readUint8Array(index, length, callback, onerror);
	    }

	    that.size = 0;
	    that.init = init;
	    that.readUint8Array = readUint8Array;
	}
	TextReader.prototype = new Reader();
	TextReader.prototype.constructor = TextReader;

	function Data64URIReader(dataURI) {
	    var that = this,
	        dataStart;

	    function init(callback) {
	        var dataEnd = dataURI.length;
	        while (dataURI.charAt(dataEnd - 1) == "=") dataEnd--;
	        dataStart = dataURI.indexOf(",") + 1;
	        that.size = Math.floor((dataEnd - dataStart) * 0.75);
	        callback();
	    }

	    function readUint8Array(index, length, callback) {
	        var i,
	            data = getDataHelper(length);
	        var start = Math.floor(index / 3) * 4;
	        var end = Math.ceil((index + length) / 3) * 4;
	        var bytes = atob(dataURI.substring(start + dataStart, end + dataStart));
	        var delta = index - Math.floor(start / 4) * 3;
	        for (i = delta; i < delta + length; i++) data.array[i - delta] = bytes.charCodeAt(i);
	        callback(data.array);
	    }

	    that.size = 0;
	    that.init = init;
	    that.readUint8Array = readUint8Array;
	}
	Data64URIReader.prototype = new Reader();
	Data64URIReader.prototype.constructor = Data64URIReader;

	function BlobReader(blob) {
	    var that = this;

	    function init(callback) {
	        that.size = blob.size;
	        callback();
	    }

	    function readUint8Array(index, length, callback, onerror) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            callback(new Uint8Array(e.target.result));
	        };
	        reader.onerror = onerror;
	        try {
	            reader.readAsArrayBuffer(blobSlice(blob, index, length));
	        } catch (e) {
	            onerror(e);
	        }
	    }

	    that.size = 0;
	    that.init = init;
	    that.readUint8Array = readUint8Array;
	}
	BlobReader.prototype = new Reader();
	BlobReader.prototype.constructor = BlobReader;

	// Writers

	function Writer() {}
	Writer.prototype.getData = function (callback) {
	    callback(this.data);
	};

	function TextWriter(encoding) {
	    var that = this,
	        blob;

	    function init(callback) {
	        blob = new Blob([], {
	            type: TEXT_PLAIN
	        });
	        callback();
	    }

	    function writeUint8Array(array, callback) {
	        blob = new Blob([blob, appendABViewSupported ? array : array.buffer], {
	            type: TEXT_PLAIN
	        });
	        callback();
	    }

	    function getData(callback, onerror) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            callback(e.target.result);
	        };
	        reader.onerror = onerror;
	        reader.readAsText(blob, encoding);
	    }

	    that.init = init;
	    that.writeUint8Array = writeUint8Array;
	    that.getData = getData;
	}
	TextWriter.prototype = new Writer();
	TextWriter.prototype.constructor = TextWriter;

	function Data64URIWriter(contentType) {
	    var that = this,
	        data = "",
	        pending = "";

	    function init(callback) {
	        data += "data:" + (contentType || "") + ";base64,";
	        callback();
	    }

	    function writeUint8Array(array, callback) {
	        var i,
	            delta = pending.length,
	            dataString = pending;
	        pending = "";
	        for (i = 0; i < Math.floor((delta + array.length) / 3) * 3 - delta; i++) dataString += String.fromCharCode(array[i]);
	        for (; i < array.length; i++) pending += String.fromCharCode(array[i]);
	        if (dataString.length > 2) data += btoa(dataString);else pending = dataString;
	        callback();
	    }

	    function getData(callback) {
	        callback(data + btoa(pending));
	    }

	    that.init = init;
	    that.writeUint8Array = writeUint8Array;
	    that.getData = getData;
	}
	Data64URIWriter.prototype = new Writer();
	Data64URIWriter.prototype.constructor = Data64URIWriter;

	function BlobWriter(contentType) {
	    var blob,
	        that = this;

	    function init(callback) {
	        blob = new Blob([], {
	            type: contentType
	        });
	        callback();
	    }

	    function writeUint8Array(array, callback) {
	        blob = new Blob([blob, appendABViewSupported ? array : array.buffer], {
	            type: contentType
	        });
	        callback();
	    }

	    function getData(callback) {
	        callback(blob);
	    }

	    that.init = init;
	    that.writeUint8Array = writeUint8Array;
	    that.getData = getData;
	}
	BlobWriter.prototype = new Writer();
	BlobWriter.prototype.constructor = BlobWriter;

	/**
	 * inflate/deflate core functions
	 * @param worker {Worker} web worker for the task.
	 * @param initialMessage {Object} initial message to be sent to the worker. should contain
	 *   sn(serial number for distinguishing multiple tasks sent to the worker), and codecClass.
	 *   This function may add more properties before sending.
	 */
	function launchWorkerProcess(worker, initialMessage, reader, writer, offset, size, onprogress, onend, onreaderror, onwriteerror) {
	    var chunkIndex = 0,
	        index,
	        outputSize,
	        sn = initialMessage.sn,
	        crc;

	    function onflush() {
	        worker.removeEventListener('message', onmessage, false);
	        onend(outputSize, crc);
	    }

	    function onmessage(event) {
	        var message = event.data,
	            data = message.data,
	            err = message.error;
	        if (err) {
	            err.toString = function () {
	                return 'Error: ' + this.message;
	            };
	            onreaderror(err);
	            return;
	        }
	        if (message.sn !== sn) return;
	        if (typeof message.codecTime === 'number') worker.codecTime += message.codecTime; // should be before onflush()
	        if (typeof message.crcTime === 'number') worker.crcTime += message.crcTime;

	        switch (message.type) {
	            case 'append':
	                if (data) {
	                    outputSize += data.length;
	                    writer.writeUint8Array(data, function () {
	                        step();
	                    }, onwriteerror);
	                } else step();
	                break;
	            case 'flush':
	                crc = message.crc;
	                if (data) {
	                    outputSize += data.length;
	                    writer.writeUint8Array(data, function () {
	                        onflush();
	                    }, onwriteerror);
	                } else onflush();
	                break;
	            case 'progress':
	                if (onprogress) onprogress(index + message.loaded, size);
	                break;
	            case 'importScripts': //no need to handle here
	            case 'newTask':
	            case 'echo':
	                break;
	            default:
	                console.warn('zip.js:launchWorkerProcess: unknown message: ', message);
	        }
	    }

	    function step() {
	        index = chunkIndex * CHUNK_SIZE;
	        // use `<=` instead of `<`, because `size` may be 0.
	        if (index <= size) {
	            reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function (array) {
	                if (onprogress) onprogress(index, size);
	                var msg = index === 0 ? initialMessage : { sn: sn };
	                msg.type = 'append';
	                msg.data = array;

	                // posting a message with transferables will fail on IE10
	                try {
	                    worker.postMessage(msg, [array.buffer]);
	                } catch (ex) {
	                    worker.postMessage(msg); // retry without transferables
	                }
	                chunkIndex++;
	            }, onreaderror);
	        } else {
	            worker.postMessage({
	                sn: sn,
	                type: 'flush'
	            });
	        }
	    }

	    outputSize = 0;
	    worker.addEventListener('message', onmessage, false);
	    step();
	}

	function launchProcess(process, reader, writer, offset, size, crcType, onprogress, onend, onreaderror, onwriteerror) {
	    var chunkIndex = 0,
	        index,
	        outputSize = 0,
	        crcInput = crcType === 'input',
	        crcOutput = crcType === 'output',
	        crc = new Crc32();

	    function step() {
	        var outputData;
	        index = chunkIndex * CHUNK_SIZE;
	        if (index < size) reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function (inputData) {
	            var outputData;
	            try {
	                outputData = process.append(inputData, function (loaded) {
	                    if (onprogress) onprogress(index + loaded, size);
	                });
	            } catch (e) {
	                onreaderror(e);
	                return;
	            }
	            if (outputData) {
	                outputSize += outputData.length;
	                writer.writeUint8Array(outputData, function () {
	                    chunkIndex++;
	                    setTimeout(step, 1);
	                }, onwriteerror);
	                if (crcOutput) crc.append(outputData);
	            } else {
	                chunkIndex++;
	                setTimeout(step, 1);
	            }
	            if (crcInput) crc.append(inputData);
	            if (onprogress) onprogress(index, size);
	        }, onreaderror);else {
	            try {
	                outputData = process.flush();
	            } catch (e) {
	                onreaderror(e);
	                return;
	            }
	            if (outputData) {
	                if (crcOutput) crc.append(outputData);
	                outputSize += outputData.length;
	                writer.writeUint8Array(outputData, function () {
	                    onend(outputSize, crc.get());
	                }, onwriteerror);
	            } else onend(outputSize, crc.get());
	        }
	    }

	    step();
	}

	function inflate(worker, sn, reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
	    var crcType = computeCrc32 ? 'output' : 'none';
	    if (zip.useWebWorkers) {
	        var initialMessage = {
	            sn: sn,
	            codecClass: 'Inflater',
	            crcType: crcType
	        };
	        launchWorkerProcess(worker, initialMessage, reader, writer, offset, size, onprogress, onend, onreaderror, onwriteerror);
	    } else launchProcess(new zip.Inflater(), reader, writer, offset, size, crcType, onprogress, onend, onreaderror, onwriteerror);
	}

	function deflate(worker, sn, reader, writer, level, onend, onprogress, onreaderror, onwriteerror) {
	    var crcType = 'input';
	    if (zip.useWebWorkers) {
	        var initialMessage = {
	            sn: sn,
	            options: { level: level },
	            codecClass: 'Deflater',
	            crcType: crcType
	        };
	        launchWorkerProcess(worker, initialMessage, reader, writer, 0, reader.size, onprogress, onend, onreaderror, onwriteerror);
	    } else launchProcess(new zip.Deflater(), reader, writer, 0, reader.size, crcType, onprogress, onend, onreaderror, onwriteerror);
	}

	function copy(worker, sn, reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
	    var crcType = 'input';
	    if (zip.useWebWorkers && computeCrc32) {
	        var initialMessage = {
	            sn: sn,
	            codecClass: 'NOOP',
	            crcType: crcType
	        };
	        launchWorkerProcess(worker, initialMessage, reader, writer, offset, size, onprogress, onend, onreaderror, onwriteerror);
	    } else launchProcess(new NOOP(), reader, writer, offset, size, crcType, onprogress, onend, onreaderror, onwriteerror);
	}

	// ZipReader

	function decodeASCII(str) {
	    var i,
	        out = "",
	        charCode,
	        extendedASCII = ["Ç", "ü", "é", "â", "ä", "à", "å", "ç", "ê", "ë", "è", "ï", "î", "ì", "Ä", "Å", "É", "æ", "Æ", "ô", "ö", "ò", "û", "ù", "ÿ", "Ö", "Ü", "ø", "£", "Ø", "×", "ƒ", "á", "í", "ó", "ú", "ñ", "Ñ", "ª", "º", "¿", "®", "¬", "½", "¼", "¡", "«", "»", '_', '_', '_', "¦", "¦", "Á", "Â", "À", "©", "¦", "¦", '+', '+', "¢", "¥", '+', '+', '-', '-', '+', '-', '+', "ã", "Ã", '+', '+', '-', '-', "¦", '-', '+', "¤", "ð", "Ð", "Ê", "Ë", "È", 'i', "Í", "Î", "Ï", '+', '+', '_', '_', "¦", "Ì", '_', "Ó", "ß", "Ô", "Ò", "õ", "Õ", "µ", "þ", "Þ", "Ú", "Û", "Ù", "ý", "Ý", "¯", "´", "­", "±", '_', "¾", "¶", "§", "÷", "¸", "°", "¨", "·", "¹", "³", "²", '_', ' '];
	    for (i = 0; i < str.length; i++) {
	        charCode = str.charCodeAt(i) & 0xFF;
	        if (charCode > 127) out += extendedASCII[charCode - 128];else out += String.fromCharCode(charCode);
	    }
	    return out;
	}

	function decodeUTF8(string) {
	    return decodeURIComponent(escape(string));
	}

	function getString(bytes) {
	    var i,
	        str = "";
	    for (i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
	    return str;
	}

	function getDate(timeRaw) {
	    var date = (timeRaw & 0xffff0000) >> 16,
	        time = timeRaw & 0x0000ffff;
	    try {
	        return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5, (time & 0x001F) * 2, 0);
	    } catch (e) {}
	}

	function readCommonHeader(entry, data, index, centralDirectory, onerror) {
	    entry.version = data.view.getUint16(index, true);
	    entry.bitFlag = data.view.getUint16(index + 2, true);
	    entry.compressionMethod = data.view.getUint16(index + 4, true);
	    entry.lastModDateRaw = data.view.getUint32(index + 6, true);
	    entry.lastModDate = getDate(entry.lastModDateRaw);
	    if ((entry.bitFlag & 0x01) === 0x01) {
	        onerror(ERR_ENCRYPTED);
	        return;
	    }
	    if (centralDirectory || (entry.bitFlag & 0x0008) != 0x0008) {
	        entry.crc32 = data.view.getUint32(index + 10, true);
	        entry.compressedSize = data.view.getUint32(index + 14, true);
	        entry.uncompressedSize = data.view.getUint32(index + 18, true);
	    }
	    if (entry.compressedSize === 0xFFFFFFFF || entry.uncompressedSize === 0xFFFFFFFF) {
	        onerror(ERR_ZIP64);
	        return;
	    }
	    entry.filenameLength = data.view.getUint16(index + 22, true);
	    entry.extraFieldLength = data.view.getUint16(index + 24, true);
	}

	function seekEOCDR(reader, eocdrCallback) {
	    // "End of central directory record" is the last part of a zip archive, and is at least 22 bytes long.
	    // Zip file comment is the last part of EOCDR and has max length of 64KB,
	    // so we only have to search the last 64K + 22 bytes of a archive for EOCDR signature (0x06054b50).
	    var EOCDR_MIN = 22;
	    if (reader.size < EOCDR_MIN) {
	        onerror(ERR_BAD_FORMAT);
	        return;
	    }
	    var ZIP_COMMENT_MAX = 256 * 256,
	        EOCDR_MAX = EOCDR_MIN + ZIP_COMMENT_MAX;

	    // In most cases, the EOCDR is EOCDR_MIN bytes long
	    doSeek(EOCDR_MIN, function () {
	        // If not found, try within EOCDR_MAX bytes
	        doSeek(Math.min(EOCDR_MAX, reader.size), function () {
	            onerror(ERR_BAD_FORMAT);
	        });
	    });

	    // seek last length bytes of file for EOCDR
	    function doSeek(length, eocdrNotFoundCallback) {
	        reader.readUint8Array(reader.size - length, length, function (bytes) {
	            for (var i = bytes.length - EOCDR_MIN; i >= 0; i--) {
	                if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x05 && bytes[i + 3] === 0x06) {
	                    eocdrCallback(new DataView(bytes.buffer, i, EOCDR_MIN));
	                    return;
	                }
	            }
	            eocdrNotFoundCallback();
	        }, function () {
	            onerror(ERR_READ);
	        });
	    }
	}

	// ZipWriter

	function encodeUTF8(string) {
	    return unescape(encodeURIComponent(string));
	}

	function getBytes(str) {
	    var i,
	        array = [];
	    for (i = 0; i < str.length; i++) array.push(str.charCodeAt(i));
	    return array;
	}

	function createZipWriter(writer, callback, onerror, dontDeflate) {
	    var files = {},
	        filenames = [],
	        datalength = 0;
	    var deflateSN = 0;

	    function onwriteerror(err) {
	        onerror(err || ERR_WRITE);
	    }

	    function onreaderror(err) {
	        onerror(err || ERR_READ_DATA);
	    }

	    var zipWriter = {
	        add: function add(name, reader, onend, onprogress, options) {
	            var header, filename, date;
	            var worker = this._worker;

	            function writeHeader(callback) {
	                var data;
	                date = options.lastModDate || new Date();
	                header = getDataHelper(26);
	                files[name] = {
	                    headerArray: header.array,
	                    directory: options.directory,
	                    filename: filename,
	                    offset: datalength,
	                    comment: getBytes(encodeUTF8(options.comment || ""))
	                };
	                header.view.setUint32(0, 0x14000808);
	                if (options.version) header.view.setUint8(0, options.version);
	                if (!dontDeflate && options.level !== 0 && !options.directory) header.view.setUint16(4, 0x0800);
	                header.view.setUint16(6, (date.getHours() << 6 | date.getMinutes()) << 5 | date.getSeconds() / 2, true);
	                header.view.setUint16(8, (date.getFullYear() - 1980 << 4 | date.getMonth() + 1) << 5 | date.getDate(), true);
	                header.view.setUint16(22, filename.length, true);
	                data = getDataHelper(30 + filename.length);
	                data.view.setUint32(0, 0x504b0304);
	                data.array.set(header.array, 4);
	                data.array.set(filename, 30);
	                datalength += data.array.length;
	                writer.writeUint8Array(data.array, callback, onwriteerror);
	            }

	            function writeFooter(compressedLength, crc32) {
	                var footer = getDataHelper(16);
	                datalength += compressedLength || 0;
	                footer.view.setUint32(0, 0x504b0708);
	                if (typeof crc32 != "undefined") {
	                    header.view.setUint32(10, crc32, true);
	                    footer.view.setUint32(4, crc32, true);
	                }
	                if (reader) {
	                    footer.view.setUint32(8, compressedLength, true);
	                    header.view.setUint32(14, compressedLength, true);
	                    footer.view.setUint32(12, reader.size, true);
	                    header.view.setUint32(18, reader.size, true);
	                }
	                writer.writeUint8Array(footer.array, function () {
	                    datalength += 16;
	                    onend();
	                }, onwriteerror);
	            }

	            function writeFile() {
	                options = options || {};
	                name = name.trim();
	                if (options.directory && name.charAt(name.length - 1) != "/") name += "/";
	                if (files.hasOwnProperty(name)) {
	                    onerror(ERR_DUPLICATED_NAME);
	                    return;
	                }
	                filename = getBytes(encodeUTF8(name));
	                filenames.push(name);
	                writeHeader(function () {
	                    if (reader) if (dontDeflate || options.level === 0) copy(worker, deflateSN++, reader, writer, 0, reader.size, true, writeFooter, onprogress, onreaderror, onwriteerror);else deflate(worker, deflateSN++, reader, writer, options.level, writeFooter, onprogress, onreaderror, onwriteerror);else writeFooter();
	                }, onwriteerror);
	            }

	            if (reader) reader.init(writeFile, onreaderror);else writeFile();
	        },
	        close: function close(callback) {
	            if (this._worker) {
	                this._worker.terminate();
	                this._worker = null;
	            }

	            var data,
	                length = 0,
	                index = 0,
	                indexFilename,
	                file;
	            for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
	                file = files[filenames[indexFilename]];
	                length += 46 + file.filename.length + file.comment.length;
	            }
	            data = getDataHelper(length + 22);
	            for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
	                file = files[filenames[indexFilename]];
	                data.view.setUint32(index, 0x504b0102);
	                data.view.setUint16(index + 4, 0x1400);
	                data.array.set(file.headerArray, index + 6);
	                data.view.setUint16(index + 32, file.comment.length, true);
	                if (file.directory) data.view.setUint8(index + 38, 0x10);
	                data.view.setUint32(index + 42, file.offset, true);
	                data.array.set(file.filename, index + 46);
	                data.array.set(file.comment, index + 46 + file.filename.length);
	                index += 46 + file.filename.length + file.comment.length;
	            }
	            data.view.setUint32(index, 0x504b0506);
	            data.view.setUint16(index + 8, filenames.length, true);
	            data.view.setUint16(index + 10, filenames.length, true);
	            data.view.setUint32(index + 12, length, true);
	            data.view.setUint32(index + 16, datalength, true);
	            writer.writeUint8Array(data.array, function () {
	                writer.getData(callback);
	            }, onwriteerror);
	        },
	        _worker: null
	    };

	    if (!zip.useWebWorkers) callback(zipWriter);else {
	        createWorker('deflater', function (worker) {
	            zipWriter._worker = worker;
	            callback(zipWriter);
	        }, function (err) {
	            onerror(err);
	        });
	    }
	}

	function resolveURLs(urls) {
	    var a = document.createElement('a');
	    return urls.map(function (url) {
	        a.href = url;
	        return a.href;
	    });
	}

	var DEFAULT_WORKER_SCRIPTS = {
	    deflater: ['z-worker.js', 'deflate.js'],
	    inflater: ['z-worker.js', 'inflate.js']
	};
	function createWorker(type, callback, onerror) {
	    if (zip.workerScripts !== null && zip.workerScriptsPath !== null) {
	        onerror(new Error('Either zip.workerScripts or zip.workerScriptsPath may be set, not both.'));
	        return;
	    }
	    var scripts;
	    if (zip.workerScripts) {
	        scripts = zip.workerScripts[type];
	        if (!Array.isArray(scripts)) {
	            onerror(new Error('zip.workerScripts.' + type + ' is not an array!'));
	            return;
	        }
	        scripts = resolveURLs(scripts);
	    } else {
	        scripts = DEFAULT_WORKER_SCRIPTS[type].slice(0);
	        scripts[0] = (zip.workerScriptsPath || '') + scripts[0];
	    }
	    var worker = new Worker(scripts[0]);
	    // record total consumed time by inflater/deflater/crc32 in this worker
	    worker.codecTime = worker.crcTime = 0;
	    worker.postMessage({ type: 'importScripts', scripts: scripts.slice(1) });
	    worker.addEventListener('message', onmessage);
	    function onmessage(ev) {
	        var msg = ev.data;
	        if (msg.error) {
	            worker.terminate(); // should before onerror(), because onerror() may throw.
	            onerror(msg.error);
	            return;
	        }
	        if (msg.type === 'importScripts') {
	            worker.removeEventListener('message', onmessage);
	            worker.removeEventListener('error', errorHandler);
	            callback(worker);
	        }
	    }

	    // catch entry script loading error and other unhandled errors
	    worker.addEventListener('error', errorHandler);
	    function errorHandler(err) {
	        worker.terminate();
	        onerror(err);
	    }
	}

	function onerror_default(error) {
	    console.error(error);
	}

	var zip = {
	    BlobReader: BlobReader,
	    BlobWriter: BlobWriter,
	    createWorker: createWorker,
	    getDataHelper: getDataHelper,
	    seekEOCDR: seekEOCDR,
	    readCommonHeader: readCommonHeader,
	    getString: getString,
	    decodeUTF8: decodeUTF8,
	    decodeASCII: decodeASCII,
	    copy: copy,
	    inflate: inflate,
	    ERR_BAD_FORMAT: ERR_BAD_FORMAT,
	    ERR_READ_DATA: ERR_READ_DATA,
	    ERR_WRITE_DATA: ERR_WRITE_DATA,
	    workerScripts: null
	};

	exports["default"] = zip;
	module.exports = exports["default"];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	// istanbul ignore next

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _zip = __webpack_require__(32);

	var Entry = (function () {
	    function Entry(options) {
	        _classCallCheck(this, Entry);

	        Object.merge(this, options);
	    }

	    _createClass(Entry, [{
	        key: 'testCrc32',
	        value: function testCrc32(crc32) {
	            var dataCrc32 = (0, _zip.getDataHelper)(4);
	            dataCrc32.view.setUint32(0, crc32);
	            return this.crc32 === crc32;
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            return new Promise((function (resolve, reject) {
	                var checkCrc32 = options.checkCrc32;

	                function onReadError(err) {
	                    reject(new Error(err || _zip.ERR_READ_DATA));
	                }

	                onReadError = onReadError.bind(this);

	                function onWriteError(err) {
	                    reject(new Error(err || _zip.ERR_WRITE_DATA));
	                }

	                this.reader.readUint8Array(this.offset, 30, (function (bytes) {
	                    var data = (0, _zip.getDataHelper)(bytes.length, bytes);
	                    if (data.view.getUint32(0) !== 0x504b0304) {
	                        reject(new Error(_zip.ERR_BAD_FORMAT));
	                        return;
	                    }

	                    (0, _zip.readCommonHeader)(this, data, 4, false, onerror);
	                    var dataOffset = this.offset + 30 + this.filenameLength + this.extraFieldLength;
	                    var writer = this.writer;
	                    var reader = this.reader;
	                    var worker = this.worker;
	                    var compressedSize = this.compressedSize;

	                    options.inflateSN++;
	                    writer.init((function () {
	                        var method = _zip.inflate;

	                        if (this.compressionMethod === 0) {
	                            method = _zip.copy;
	                        }
	                        method(worker, options.inflateSN, reader, writer, dataOffset, compressedSize, checkCrc32, (function (uncompressedSize, crc32) {
	                            if (checkCrc32 && !this.testCrc32(crc32)) {
	                                reject(new Error(ERR_CRC));
	                            } else {
	                                writer.getData(function (data) {
	                                    return resolve(data);
	                                });
	                            }
	                        }).bind(this), null, onReadError, onWriteError);
	                    }).bind(this), onWriteError);
	                }).bind(this), onReadError);
	            }).bind(this));
	        }
	    }]);

	    return Entry;
	})();

	exports['default'] = Entry;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mask = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

	exports["default"] = function (val) {
	  return mask.test(val);
	};

	module.exports = exports["default"];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _merge = __webpack_require__(3);

	var _merge2 = _interopRequireDefault(_merge);

	exports['default'] = function (obj) {
	    return (0, _merge2['default'])({}, obj);
	};

	;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;