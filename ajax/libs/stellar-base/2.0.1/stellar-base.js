var StellarBase =
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// eslint-disable-next-line prefer-import/prefer-import-over-require
	module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StrKey = exports.Networks = exports.Network = exports.Account = exports.AuthImmutableFlag = exports.AuthRevocableFlag = exports.AuthRequiredFlag = exports.Operation = exports.Asset = exports.BASE_FEE = exports.TimeoutInfinite = exports.TransactionBuilder = exports.Transaction = exports.Hyper = exports.UnsignedHyper = exports.Keypair = exports.FastSigning = exports.verify = exports.sign = exports.hash = exports.xdr = undefined;

	var _hashing = __webpack_require__(2);

	Object.defineProperty(exports, 'hash', {
	  enumerable: true,
	  get: function get() {
	    return _hashing.hash;
	  }
	});

	var _signing = __webpack_require__(18);

	Object.defineProperty(exports, 'sign', {
	  enumerable: true,
	  get: function get() {
	    return _signing.sign;
	  }
	});
	Object.defineProperty(exports, 'verify', {
	  enumerable: true,
	  get: function get() {
	    return _signing.verify;
	  }
	});
	Object.defineProperty(exports, 'FastSigning', {
	  enumerable: true,
	  get: function get() {
	    return _signing.FastSigning;
	  }
	});

	var _keypair = __webpack_require__(21);

	Object.defineProperty(exports, 'Keypair', {
	  enumerable: true,
	  get: function get() {
	    return _keypair.Keypair;
	  }
	});

	var _jsXdr = __webpack_require__(65);

	Object.defineProperty(exports, 'UnsignedHyper', {
	  enumerable: true,
	  get: function get() {
	    return _jsXdr.UnsignedHyper;
	  }
	});
	Object.defineProperty(exports, 'Hyper', {
	  enumerable: true,
	  get: function get() {
	    return _jsXdr.Hyper;
	  }
	});

	var _transaction = __webpack_require__(310);

	Object.defineProperty(exports, 'Transaction', {
	  enumerable: true,
	  get: function get() {
	    return _transaction.Transaction;
	  }
	});

	var _transaction_builder = __webpack_require__(373);

	Object.defineProperty(exports, 'TransactionBuilder', {
	  enumerable: true,
	  get: function get() {
	    return _transaction_builder.TransactionBuilder;
	  }
	});
	Object.defineProperty(exports, 'TimeoutInfinite', {
	  enumerable: true,
	  get: function get() {
	    return _transaction_builder.TimeoutInfinite;
	  }
	});
	Object.defineProperty(exports, 'BASE_FEE', {
	  enumerable: true,
	  get: function get() {
	    return _transaction_builder.BASE_FEE;
	  }
	});

	var _asset = __webpack_require__(327);

	Object.defineProperty(exports, 'Asset', {
	  enumerable: true,
	  get: function get() {
	    return _asset.Asset;
	  }
	});

	var _operation = __webpack_require__(311);

	Object.defineProperty(exports, 'Operation', {
	  enumerable: true,
	  get: function get() {
	    return _operation.Operation;
	  }
	});
	Object.defineProperty(exports, 'AuthRequiredFlag', {
	  enumerable: true,
	  get: function get() {
	    return _operation.AuthRequiredFlag;
	  }
	});
	Object.defineProperty(exports, 'AuthRevocableFlag', {
	  enumerable: true,
	  get: function get() {
	    return _operation.AuthRevocableFlag;
	  }
	});
	Object.defineProperty(exports, 'AuthImmutableFlag', {
	  enumerable: true,
	  get: function get() {
	    return _operation.AuthImmutableFlag;
	  }
	});

	var _memo = __webpack_require__(372);

	Object.keys(_memo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _memo[key];
	    }
	  });
	});

	var _account = __webpack_require__(374);

	Object.defineProperty(exports, 'Account', {
	  enumerable: true,
	  get: function get() {
	    return _account.Account;
	  }
	});

	var _network = __webpack_require__(22);

	Object.defineProperty(exports, 'Network', {
	  enumerable: true,
	  get: function get() {
	    return _network.Network;
	  }
	});
	Object.defineProperty(exports, 'Networks', {
	  enumerable: true,
	  get: function get() {
	    return _network.Networks;
	  }
	});

	var _strkey = __webpack_require__(27);

	Object.defineProperty(exports, 'StrKey', {
	  enumerable: true,
	  get: function get() {
	    return _strkey.StrKey;
	  }
	});

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.xdr = _stellarXdr_generated2.default;
	exports.default = module.exports;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hash = hash;

	var _sha = __webpack_require__(3);

	function hash(data) {
	  var hasher = new _sha.sha256();
	  hasher.update(data, 'utf8');
	  return hasher.digest();
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var exports = module.exports = function SHA (algorithm) {
	  algorithm = algorithm.toLowerCase()

	  var Algorithm = exports[algorithm]
	  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

	  return new Algorithm()
	}

	exports.sha = __webpack_require__(4)
	exports.sha1 = __webpack_require__(13)
	exports.sha224 = __webpack_require__(14)
	exports.sha256 = __webpack_require__(15)
	exports.sha384 = __webpack_require__(16)
	exports.sha512 = __webpack_require__(17)


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
	 * in FIPS PUB 180-1
	 * This source code is derived from sha1.js of the same repository.
	 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
	 * operation was added.
	 */

	var inherits = __webpack_require__(5)
	var Hash = __webpack_require__(6)
	var Buffer = __webpack_require__(7).Buffer

	var K = [
	  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
	]

	var W = new Array(80)

	function Sha () {
	  this.init()
	  this._w = W

	  Hash.call(this, 64, 56)
	}

	inherits(Sha, Hash)

	Sha.prototype.init = function () {
	  this._a = 0x67452301
	  this._b = 0xefcdab89
	  this._c = 0x98badcfe
	  this._d = 0x10325476
	  this._e = 0xc3d2e1f0

	  return this
	}

	function rotl5 (num) {
	  return (num << 5) | (num >>> 27)
	}

	function rotl30 (num) {
	  return (num << 30) | (num >>> 2)
	}

	function ft (s, b, c, d) {
	  if (s === 0) return (b & c) | ((~b) & d)
	  if (s === 2) return (b & c) | (b & d) | (c & d)
	  return b ^ c ^ d
	}

	Sha.prototype._update = function (M) {
	  var W = this._w

	  var a = this._a | 0
	  var b = this._b | 0
	  var c = this._c | 0
	  var d = this._d | 0
	  var e = this._e | 0

	  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
	  for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]

	  for (var j = 0; j < 80; ++j) {
	    var s = ~~(j / 20)
	    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

	    e = d
	    d = c
	    c = rotl30(b)
	    b = a
	    a = t
	  }

	  this._a = (a + this._a) | 0
	  this._b = (b + this._b) | 0
	  this._c = (c + this._c) | 0
	  this._d = (d + this._d) | 0
	  this._e = (e + this._e) | 0
	}

	Sha.prototype._hash = function () {
	  var H = Buffer.allocUnsafe(20)

	  H.writeInt32BE(this._a | 0, 0)
	  H.writeInt32BE(this._b | 0, 4)
	  H.writeInt32BE(this._c | 0, 8)
	  H.writeInt32BE(this._d | 0, 12)
	  H.writeInt32BE(this._e | 0, 16)

	  return H
	}

	module.exports = Sha


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var Buffer = __webpack_require__(7).Buffer

	// prototype class for hash functions
	function Hash (blockSize, finalSize) {
	  this._block = Buffer.alloc(blockSize)
	  this._finalSize = finalSize
	  this._blockSize = blockSize
	  this._len = 0
	}

	Hash.prototype.update = function (data, enc) {
	  if (typeof data === 'string') {
	    enc = enc || 'utf8'
	    data = Buffer.from(data, enc)
	  }

	  var block = this._block
	  var blockSize = this._blockSize
	  var length = data.length
	  var accum = this._len

	  for (var offset = 0; offset < length;) {
	    var assigned = accum % blockSize
	    var remainder = Math.min(length - offset, blockSize - assigned)

	    for (var i = 0; i < remainder; i++) {
	      block[assigned + i] = data[offset + i]
	    }

	    accum += remainder
	    offset += remainder

	    if ((accum % blockSize) === 0) {
	      this._update(block)
	    }
	  }

	  this._len += length
	  return this
	}

	Hash.prototype.digest = function (enc) {
	  var rem = this._len % this._blockSize

	  this._block[rem] = 0x80

	  // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
	  // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
	  this._block.fill(0, rem + 1)

	  if (rem >= this._finalSize) {
	    this._update(this._block)
	    this._block.fill(0)
	  }

	  var bits = this._len * 8

	  // uint32
	  if (bits <= 0xffffffff) {
	    this._block.writeUInt32BE(bits, this._blockSize - 4)

	  // uint64
	  } else {
	    var lowBits = (bits & 0xffffffff) >>> 0
	    var highBits = (bits - lowBits) / 0x100000000

	    this._block.writeUInt32BE(highBits, this._blockSize - 8)
	    this._block.writeUInt32BE(lowBits, this._blockSize - 4)
	  }

	  this._update(this._block)
	  var hash = this._hash()

	  return enc ? hash.toString(enc) : hash
	}

	Hash.prototype._update = function () {
	  throw new Error('_update must be implemented by subclass')
	}

	module.exports = Hash


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* eslint-disable node/no-deprecated-api */
	var buffer = __webpack_require__(8)
	var Buffer = buffer.Buffer

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key]
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer, exports)
	  exports.Buffer = SafeBuffer
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer)

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	}

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size)
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding)
	    } else {
	      buf.fill(fill)
	    }
	  } else {
	    buf.fill(0)
	  }
	  return buf
	}

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	}

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer.SlowBuffer(size)
	}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(10)
	var ieee754 = __webpack_require__(11)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	var K_MAX_LENGTH = 0x7fffffff
	exports.kMaxLength = K_MAX_LENGTH

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
	 *               implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * We report that the browser does not support typed arrays if the are not subclassable
	 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
	 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
	 * for __proto__ and has a buggy typed array implementation.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

	if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
	    typeof console.error === 'function') {
	  console.error(
	    'This browser lacks typed array (Uint8Array) support which is required by ' +
	    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
	  )
	}

	function typedArraySupport () {
	  // Can typed array instances can be augmented?
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42
	  } catch (e) {
	    return false
	  }
	}

	Object.defineProperty(Buffer.prototype, 'parent', {
	  get: function () {
	    if (!(this instanceof Buffer)) {
	      return undefined
	    }
	    return this.buffer
	  }
	})

	Object.defineProperty(Buffer.prototype, 'offset', {
	  get: function () {
	    if (!(this instanceof Buffer)) {
	      return undefined
	    }
	    return this.byteOffset
	  }
	})

	function createBuffer (length) {
	  if (length > K_MAX_LENGTH) {
	    throw new RangeError('Invalid typed array length')
	  }
	  // Return an augmented `Uint8Array` instance
	  var buf = new Uint8Array(length)
	  buf.__proto__ = Buffer.prototype
	  return buf
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(arg)
	  }
	  return from(arg, encodingOrOffset, length)
	}

	// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	if (typeof Symbol !== 'undefined' && Symbol.species &&
	    Buffer[Symbol.species] === Buffer) {
	  Object.defineProperty(Buffer, Symbol.species, {
	    value: null,
	    configurable: true,
	    enumerable: false,
	    writable: false
	  })
	}

	Buffer.poolSize = 8192 // not used by this implementation

	function from (value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (isArrayBuffer(value) || (value && isArrayBuffer(value.buffer))) {
	    return fromArrayBuffer(value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(value, encodingOrOffset)
	  }

	  return fromObject(value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(value, encodingOrOffset, length)
	}

	// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
	// https://github.com/feross/buffer/pull/148
	Buffer.prototype.__proto__ = Uint8Array.prototype
	Buffer.__proto__ = Uint8Array

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be of type number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(size).fill(fill, encoding)
	      : createBuffer(size).fill(fill)
	  }
	  return createBuffer(size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(size, fill, encoding)
	}

	function allocUnsafe (size) {
	  assertSize(size)
	  return createBuffer(size < 0 ? 0 : checked(size) | 0)
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(size)
	}

	function fromString (string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('Unknown encoding: ' + encoding)
	  }

	  var length = byteLength(string, encoding) | 0
	  var buf = createBuffer(length)

	  var actual = buf.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    buf = buf.slice(0, actual)
	  }

	  return buf
	}

	function fromArrayLike (array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  var buf = createBuffer(length)
	  for (var i = 0; i < length; i += 1) {
	    buf[i] = array[i] & 255
	  }
	  return buf
	}

	function fromArrayBuffer (array, byteOffset, length) {
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('"offset" is outside of buffer bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('"length" is outside of buffer bounds')
	  }

	  var buf
	  if (byteOffset === undefined && length === undefined) {
	    buf = new Uint8Array(array)
	  } else if (length === undefined) {
	    buf = new Uint8Array(array, byteOffset)
	  } else {
	    buf = new Uint8Array(array, byteOffset, length)
	  }

	  // Return an augmented `Uint8Array` instance
	  buf.__proto__ = Buffer.prototype
	  return buf
	}

	function fromObject (obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    var buf = createBuffer(len)

	    if (buf.length === 0) {
	      return buf
	    }

	    obj.copy(buf, 0, 0, len)
	    return buf
	  }

	  if (obj) {
	    if (ArrayBuffer.isView(obj) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
	        return createBuffer(0)
	      }
	      return fromArrayLike(obj)
	    }

	    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
	      return fromArrayLike(obj.data)
	    }
	  }

	  throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.')
	}

	function checked (length) {
	  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= K_MAX_LENGTH) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return b != null && b._isBuffer === true
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!Array.isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (ArrayBuffer.isView(buf)) {
	      buf = Buffer.from(buf)
	    }
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (ArrayBuffer.isView(string) || isArrayBuffer(string)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
	// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
	// reliably in a browserify context because there could be multiple different
	// copies of the 'buffer' package in use. This method works even for Buffer
	// instances that were created from another copy of the `buffer` package.
	// See: https://github.com/feross/buffer/issues/154
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.toLocaleString = Buffer.prototype.toString

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (numberIsNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  var strLen = string.length

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (numberIsNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset >>> 0
	    if (isFinite(length)) {
	      length = length >>> 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf = this.subarray(start, end)
	  // Return an augmented `Uint8Array` instance
	  newBuf.__proto__ = Buffer.prototype
	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  offset = offset >>> 0
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  this[offset] = (value & 0xff)
	  this[offset + 1] = (value >>> 8)
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  this[offset] = (value >>> 8)
	  this[offset + 1] = (value & 0xff)
	  return offset + 2
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  this[offset + 3] = (value >>> 24)
	  this[offset + 2] = (value >>> 16)
	  this[offset + 1] = (value >>> 8)
	  this[offset] = (value & 0xff)
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  this[offset] = (value >>> 24)
	  this[offset + 1] = (value >>> 16)
	  this[offset + 2] = (value >>> 8)
	  this[offset + 3] = (value & 0xff)
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) {
	    var limit = Math.pow(2, (8 * byteLength) - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) {
	    var limit = Math.pow(2, (8 * byteLength) - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  this[offset] = (value & 0xff)
	  this[offset + 1] = (value >>> 8)
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  this[offset] = (value >>> 8)
	  this[offset + 1] = (value & 0xff)
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  this[offset] = (value & 0xff)
	  this[offset + 1] = (value >>> 8)
	  this[offset + 2] = (value >>> 16)
	  this[offset + 3] = (value >>> 24)
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  this[offset] = (value >>> 24)
	  this[offset + 1] = (value >>> 16)
	  this[offset + 2] = (value >>> 8)
	  this[offset + 3] = (value & 0xff)
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start

	  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
	    // Use built-in when available, missing from IE11
	    this.copyWithin(targetStart, start, end)
	  } else if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (var i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, end),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if ((encoding === 'utf8' && code < 128) ||
	          encoding === 'latin1') {
	        // Fast path: If `val` fits into a single byte, use that numeric value.
	        val = code
	      }
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : new Buffer(val, encoding)
	    var len = bytes.length
	    if (len === 0) {
	      throw new TypeError('The value "' + val +
	        '" is invalid for argument "value"')
	    }
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node takes equal signs as end of the Base64 encoding
	  str = str.split('=')[0]
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = str.trim().replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
	// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
	function isArrayBuffer (obj) {
	  return obj instanceof ArrayBuffer ||
	    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
	      typeof obj.byteLength === 'number')
	}

	function numberIsNaN (obj) {
	  return obj !== obj // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(10)
	var ieee754 = __webpack_require__(11)
	var isArray = __webpack_require__(12)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

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
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function getLens (b64) {
	  var len = b64.length

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=')
	  if (validLen === -1) validLen = len

	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4)

	  return [validLen, placeHoldersLen]
	}

	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function toByteArray (b64) {
	  var tmp
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]

	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

	  var curByte = 0

	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen

	  for (var i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)]
	    arr[curByte++] = (tmp >> 16) & 0xFF
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF)
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(
	      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
	    ))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    )
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    )
	  }

	  return parts.join('')
	}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(5)
	var Hash = __webpack_require__(6)
	var Buffer = __webpack_require__(7).Buffer

	var K = [
	  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
	]

	var W = new Array(80)

	function Sha1 () {
	  this.init()
	  this._w = W

	  Hash.call(this, 64, 56)
	}

	inherits(Sha1, Hash)

	Sha1.prototype.init = function () {
	  this._a = 0x67452301
	  this._b = 0xefcdab89
	  this._c = 0x98badcfe
	  this._d = 0x10325476
	  this._e = 0xc3d2e1f0

	  return this
	}

	function rotl1 (num) {
	  return (num << 1) | (num >>> 31)
	}

	function rotl5 (num) {
	  return (num << 5) | (num >>> 27)
	}

	function rotl30 (num) {
	  return (num << 30) | (num >>> 2)
	}

	function ft (s, b, c, d) {
	  if (s === 0) return (b & c) | ((~b) & d)
	  if (s === 2) return (b & c) | (b & d) | (c & d)
	  return b ^ c ^ d
	}

	Sha1.prototype._update = function (M) {
	  var W = this._w

	  var a = this._a | 0
	  var b = this._b | 0
	  var c = this._c | 0
	  var d = this._d | 0
	  var e = this._e | 0

	  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
	  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])

	  for (var j = 0; j < 80; ++j) {
	    var s = ~~(j / 20)
	    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

	    e = d
	    d = c
	    c = rotl30(b)
	    b = a
	    a = t
	  }

	  this._a = (a + this._a) | 0
	  this._b = (b + this._b) | 0
	  this._c = (c + this._c) | 0
	  this._d = (d + this._d) | 0
	  this._e = (e + this._e) | 0
	}

	Sha1.prototype._hash = function () {
	  var H = Buffer.allocUnsafe(20)

	  H.writeInt32BE(this._a | 0, 0)
	  H.writeInt32BE(this._b | 0, 4)
	  H.writeInt32BE(this._c | 0, 8)
	  H.writeInt32BE(this._d | 0, 12)
	  H.writeInt32BE(this._e | 0, 16)

	  return H
	}

	module.exports = Sha1


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(5)
	var Sha256 = __webpack_require__(15)
	var Hash = __webpack_require__(6)
	var Buffer = __webpack_require__(7).Buffer

	var W = new Array(64)

	function Sha224 () {
	  this.init()

	  this._w = W // new Array(64)

	  Hash.call(this, 64, 56)
	}

	inherits(Sha224, Sha256)

	Sha224.prototype.init = function () {
	  this._a = 0xc1059ed8
	  this._b = 0x367cd507
	  this._c = 0x3070dd17
	  this._d = 0xf70e5939
	  this._e = 0xffc00b31
	  this._f = 0x68581511
	  this._g = 0x64f98fa7
	  this._h = 0xbefa4fa4

	  return this
	}

	Sha224.prototype._hash = function () {
	  var H = Buffer.allocUnsafe(28)

	  H.writeInt32BE(this._a, 0)
	  H.writeInt32BE(this._b, 4)
	  H.writeInt32BE(this._c, 8)
	  H.writeInt32BE(this._d, 12)
	  H.writeInt32BE(this._e, 16)
	  H.writeInt32BE(this._f, 20)
	  H.writeInt32BE(this._g, 24)

	  return H
	}

	module.exports = Sha224


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(5)
	var Hash = __webpack_require__(6)
	var Buffer = __webpack_require__(7).Buffer

	var K = [
	  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	]

	var W = new Array(64)

	function Sha256 () {
	  this.init()

	  this._w = W // new Array(64)

	  Hash.call(this, 64, 56)
	}

	inherits(Sha256, Hash)

	Sha256.prototype.init = function () {
	  this._a = 0x6a09e667
	  this._b = 0xbb67ae85
	  this._c = 0x3c6ef372
	  this._d = 0xa54ff53a
	  this._e = 0x510e527f
	  this._f = 0x9b05688c
	  this._g = 0x1f83d9ab
	  this._h = 0x5be0cd19

	  return this
	}

	function ch (x, y, z) {
	  return z ^ (x & (y ^ z))
	}

	function maj (x, y, z) {
	  return (x & y) | (z & (x | y))
	}

	function sigma0 (x) {
	  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
	}

	function sigma1 (x) {
	  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
	}

	function gamma0 (x) {
	  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
	}

	function gamma1 (x) {
	  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
	}

	Sha256.prototype._update = function (M) {
	  var W = this._w

	  var a = this._a | 0
	  var b = this._b | 0
	  var c = this._c | 0
	  var d = this._d | 0
	  var e = this._e | 0
	  var f = this._f | 0
	  var g = this._g | 0
	  var h = this._h | 0

	  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
	  for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0

	  for (var j = 0; j < 64; ++j) {
	    var T1 = (h + sigma1(e) + ch(e, f, g) + K[j] + W[j]) | 0
	    var T2 = (sigma0(a) + maj(a, b, c)) | 0

	    h = g
	    g = f
	    f = e
	    e = (d + T1) | 0
	    d = c
	    c = b
	    b = a
	    a = (T1 + T2) | 0
	  }

	  this._a = (a + this._a) | 0
	  this._b = (b + this._b) | 0
	  this._c = (c + this._c) | 0
	  this._d = (d + this._d) | 0
	  this._e = (e + this._e) | 0
	  this._f = (f + this._f) | 0
	  this._g = (g + this._g) | 0
	  this._h = (h + this._h) | 0
	}

	Sha256.prototype._hash = function () {
	  var H = Buffer.allocUnsafe(32)

	  H.writeInt32BE(this._a, 0)
	  H.writeInt32BE(this._b, 4)
	  H.writeInt32BE(this._c, 8)
	  H.writeInt32BE(this._d, 12)
	  H.writeInt32BE(this._e, 16)
	  H.writeInt32BE(this._f, 20)
	  H.writeInt32BE(this._g, 24)
	  H.writeInt32BE(this._h, 28)

	  return H
	}

	module.exports = Sha256


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(5)
	var SHA512 = __webpack_require__(17)
	var Hash = __webpack_require__(6)
	var Buffer = __webpack_require__(7).Buffer

	var W = new Array(160)

	function Sha384 () {
	  this.init()
	  this._w = W

	  Hash.call(this, 128, 112)
	}

	inherits(Sha384, SHA512)

	Sha384.prototype.init = function () {
	  this._ah = 0xcbbb9d5d
	  this._bh = 0x629a292a
	  this._ch = 0x9159015a
	  this._dh = 0x152fecd8
	  this._eh = 0x67332667
	  this._fh = 0x8eb44a87
	  this._gh = 0xdb0c2e0d
	  this._hh = 0x47b5481d

	  this._al = 0xc1059ed8
	  this._bl = 0x367cd507
	  this._cl = 0x3070dd17
	  this._dl = 0xf70e5939
	  this._el = 0xffc00b31
	  this._fl = 0x68581511
	  this._gl = 0x64f98fa7
	  this._hl = 0xbefa4fa4

	  return this
	}

	Sha384.prototype._hash = function () {
	  var H = Buffer.allocUnsafe(48)

	  function writeInt64BE (h, l, offset) {
	    H.writeInt32BE(h, offset)
	    H.writeInt32BE(l, offset + 4)
	  }

	  writeInt64BE(this._ah, this._al, 0)
	  writeInt64BE(this._bh, this._bl, 8)
	  writeInt64BE(this._ch, this._cl, 16)
	  writeInt64BE(this._dh, this._dl, 24)
	  writeInt64BE(this._eh, this._el, 32)
	  writeInt64BE(this._fh, this._fl, 40)

	  return H
	}

	module.exports = Sha384


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(5)
	var Hash = __webpack_require__(6)
	var Buffer = __webpack_require__(7).Buffer

	var K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	]

	var W = new Array(160)

	function Sha512 () {
	  this.init()
	  this._w = W

	  Hash.call(this, 128, 112)
	}

	inherits(Sha512, Hash)

	Sha512.prototype.init = function () {
	  this._ah = 0x6a09e667
	  this._bh = 0xbb67ae85
	  this._ch = 0x3c6ef372
	  this._dh = 0xa54ff53a
	  this._eh = 0x510e527f
	  this._fh = 0x9b05688c
	  this._gh = 0x1f83d9ab
	  this._hh = 0x5be0cd19

	  this._al = 0xf3bcc908
	  this._bl = 0x84caa73b
	  this._cl = 0xfe94f82b
	  this._dl = 0x5f1d36f1
	  this._el = 0xade682d1
	  this._fl = 0x2b3e6c1f
	  this._gl = 0xfb41bd6b
	  this._hl = 0x137e2179

	  return this
	}

	function Ch (x, y, z) {
	  return z ^ (x & (y ^ z))
	}

	function maj (x, y, z) {
	  return (x & y) | (z & (x | y))
	}

	function sigma0 (x, xl) {
	  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
	}

	function sigma1 (x, xl) {
	  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
	}

	function Gamma0 (x, xl) {
	  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
	}

	function Gamma0l (x, xl) {
	  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
	}

	function Gamma1 (x, xl) {
	  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
	}

	function Gamma1l (x, xl) {
	  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
	}

	function getCarry (a, b) {
	  return (a >>> 0) < (b >>> 0) ? 1 : 0
	}

	Sha512.prototype._update = function (M) {
	  var W = this._w

	  var ah = this._ah | 0
	  var bh = this._bh | 0
	  var ch = this._ch | 0
	  var dh = this._dh | 0
	  var eh = this._eh | 0
	  var fh = this._fh | 0
	  var gh = this._gh | 0
	  var hh = this._hh | 0

	  var al = this._al | 0
	  var bl = this._bl | 0
	  var cl = this._cl | 0
	  var dl = this._dl | 0
	  var el = this._el | 0
	  var fl = this._fl | 0
	  var gl = this._gl | 0
	  var hl = this._hl | 0

	  for (var i = 0; i < 32; i += 2) {
	    W[i] = M.readInt32BE(i * 4)
	    W[i + 1] = M.readInt32BE(i * 4 + 4)
	  }
	  for (; i < 160; i += 2) {
	    var xh = W[i - 15 * 2]
	    var xl = W[i - 15 * 2 + 1]
	    var gamma0 = Gamma0(xh, xl)
	    var gamma0l = Gamma0l(xl, xh)

	    xh = W[i - 2 * 2]
	    xl = W[i - 2 * 2 + 1]
	    var gamma1 = Gamma1(xh, xl)
	    var gamma1l = Gamma1l(xl, xh)

	    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	    var Wi7h = W[i - 7 * 2]
	    var Wi7l = W[i - 7 * 2 + 1]

	    var Wi16h = W[i - 16 * 2]
	    var Wi16l = W[i - 16 * 2 + 1]

	    var Wil = (gamma0l + Wi7l) | 0
	    var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0
	    Wil = (Wil + gamma1l) | 0
	    Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0
	    Wil = (Wil + Wi16l) | 0
	    Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0

	    W[i] = Wih
	    W[i + 1] = Wil
	  }

	  for (var j = 0; j < 160; j += 2) {
	    Wih = W[j]
	    Wil = W[j + 1]

	    var majh = maj(ah, bh, ch)
	    var majl = maj(al, bl, cl)

	    var sigma0h = sigma0(ah, al)
	    var sigma0l = sigma0(al, ah)
	    var sigma1h = sigma1(eh, el)
	    var sigma1l = sigma1(el, eh)

	    // t1 = h + sigma1 + ch + K[j] + W[j]
	    var Kih = K[j]
	    var Kil = K[j + 1]

	    var chh = Ch(eh, fh, gh)
	    var chl = Ch(el, fl, gl)

	    var t1l = (hl + sigma1l) | 0
	    var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0
	    t1l = (t1l + chl) | 0
	    t1h = (t1h + chh + getCarry(t1l, chl)) | 0
	    t1l = (t1l + Kil) | 0
	    t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0
	    t1l = (t1l + Wil) | 0
	    t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0

	    // t2 = sigma0 + maj
	    var t2l = (sigma0l + majl) | 0
	    var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0

	    hh = gh
	    hl = gl
	    gh = fh
	    gl = fl
	    fh = eh
	    fl = el
	    el = (dl + t1l) | 0
	    eh = (dh + t1h + getCarry(el, dl)) | 0
	    dh = ch
	    dl = cl
	    ch = bh
	    cl = bl
	    bh = ah
	    bl = al
	    al = (t1l + t2l) | 0
	    ah = (t1h + t2h + getCarry(al, t1l)) | 0
	  }

	  this._al = (this._al + al) | 0
	  this._bl = (this._bl + bl) | 0
	  this._cl = (this._cl + cl) | 0
	  this._dl = (this._dl + dl) | 0
	  this._el = (this._el + el) | 0
	  this._fl = (this._fl + fl) | 0
	  this._gl = (this._gl + gl) | 0
	  this._hl = (this._hl + hl) | 0

	  this._ah = (this._ah + ah + getCarry(this._al, al)) | 0
	  this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0
	  this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0
	  this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0
	  this._eh = (this._eh + eh + getCarry(this._el, el)) | 0
	  this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0
	  this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0
	  this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0
	}

	Sha512.prototype._hash = function () {
	  var H = Buffer.allocUnsafe(64)

	  function writeInt64BE (h, l, offset) {
	    H.writeInt32BE(h, offset)
	    H.writeInt32BE(l, offset + 4)
	  }

	  writeInt64BE(this._ah, this._al, 0)
	  writeInt64BE(this._bh, this._bl, 8)
	  writeInt64BE(this._ch, this._cl, 16)
	  writeInt64BE(this._dh, this._dl, 24)
	  writeInt64BE(this._eh, this._el, 32)
	  writeInt64BE(this._fh, this._fl, 40)
	  writeInt64BE(this._gh, this._gl, 48)
	  writeInt64BE(this._hh, this._hl, 56)

	  return H
	}

	module.exports = Sha512


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sign = sign;
	exports.verify = verify;
	exports.generate = generate;
	//  This module provides the signing functionality used by the stellar network
	//  The code below may look a little strange... this is because we try to provide
	//  the most efficient signing method possible.  First, we try to load the
	//  native `sodium-native` package for node.js environments, and if that fails we
	//  fallback to `tweetnacl`

	var actualMethods = {};

	/**
	 * Use this flag to check if fast signing (provided by `sodium-native` package) is available.
	 * If your app is signing a large number of transaction or verifying a large number
	 * of signatures make sure `sodium-native` package is installed.
	 */
	var FastSigning = exports.FastSigning = checkFastSigning();

	function sign(data, secretKey) {
	  return actualMethods.sign(data, secretKey);
	}

	function verify(data, signature, publicKey) {
	  return actualMethods.verify(data, signature, publicKey);
	}

	function generate(secretKey) {
	  return actualMethods.generate(secretKey);
	}

	function checkFastSigning() {
	  return typeof window === 'undefined' ? checkFastSigningNode() : checkFastSigningBrowser();
	}

	function checkFastSigningNode() {
	  // NOTE: we use commonjs style require here because es6 imports
	  // can only occur at the top level.  thanks, obama.
	  var sodium = void 0;
	  try {
	    // eslint-disable-next-line
	    sodium = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"sodium-native\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	  } catch (err) {
	    return checkFastSigningBrowser();
	  }

	  actualMethods.generate = function (secretKey) {
	    var pk = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES);
	    var sk = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);
	    sodium.crypto_sign_seed_keypair(pk, sk, secretKey);
	    return pk;
	  };

	  actualMethods.sign = function (data, secretKey) {
	    data = Buffer.from(data);
	    var signature = Buffer.alloc(sodium.crypto_sign_BYTES);
	    sodium.crypto_sign_detached(signature, data, secretKey);
	    return signature;
	  };

	  actualMethods.verify = function (data, signature, publicKey) {
	    data = Buffer.from(data);
	    try {
	      return sodium.crypto_sign_verify_detached(signature, data, publicKey);
	    } catch (e) {
	      return false;
	    }
	  };

	  return true;
	}

	function checkFastSigningBrowser() {
	  // fallback to `tweetnacl` if we're in the browser or
	  // if there was a failure installing `sodium-native`
	  // eslint-disable-next-line
	  var nacl = __webpack_require__(19);

	  actualMethods.generate = function (secretKey) {
	    var secretKeyUint8 = new Uint8Array(secretKey);
	    var naclKeys = nacl.sign.keyPair.fromSeed(secretKeyUint8);
	    return Buffer.from(naclKeys.publicKey);
	  };

	  actualMethods.sign = function (data, secretKey) {
	    data = Buffer.from(data);
	    data = new Uint8Array(data.toJSON().data);
	    secretKey = new Uint8Array(secretKey.toJSON().data);

	    var signature = nacl.sign.detached(data, secretKey);

	    return Buffer.from(signature);
	  };

	  actualMethods.verify = function (data, signature, publicKey) {
	    data = Buffer.from(data);
	    data = new Uint8Array(data.toJSON().data);
	    signature = new Uint8Array(signature.toJSON().data);
	    publicKey = new Uint8Array(publicKey.toJSON().data);

	    return nacl.sign.detached.verify(data, signature, publicKey);
	  };

	  return false;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	(function(nacl) {
	'use strict';

	// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
	// Public domain.
	//
	// Implementation derived from TweetNaCl version 20140427.
	// See for details: http://tweetnacl.cr.yp.to/

	var gf = function(init) {
	  var i, r = new Float64Array(16);
	  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
	  return r;
	};

	//  Pluggable, initialized in high-level API below.
	var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

	var _0 = new Uint8Array(16);
	var _9 = new Uint8Array(32); _9[0] = 9;

	var gf0 = gf(),
	    gf1 = gf([1]),
	    _121665 = gf([0xdb41, 1]),
	    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
	    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
	    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
	    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
	    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

	function ts64(x, i, h, l) {
	  x[i]   = (h >> 24) & 0xff;
	  x[i+1] = (h >> 16) & 0xff;
	  x[i+2] = (h >>  8) & 0xff;
	  x[i+3] = h & 0xff;
	  x[i+4] = (l >> 24)  & 0xff;
	  x[i+5] = (l >> 16)  & 0xff;
	  x[i+6] = (l >>  8)  & 0xff;
	  x[i+7] = l & 0xff;
	}

	function vn(x, xi, y, yi, n) {
	  var i,d = 0;
	  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
	  return (1 & ((d - 1) >>> 8)) - 1;
	}

	function crypto_verify_16(x, xi, y, yi) {
	  return vn(x,xi,y,yi,16);
	}

	function crypto_verify_32(x, xi, y, yi) {
	  return vn(x,xi,y,yi,32);
	}

	function core_salsa20(o, p, k, c) {
	  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
	      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
	      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
	      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
	      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
	      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
	      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
	      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
	      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
	      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
	      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
	      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
	      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
	      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
	      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
	      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

	  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
	      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
	      x15 = j15, u;

	  for (var i = 0; i < 20; i += 2) {
	    u = x0 + x12 | 0;
	    x4 ^= u<<7 | u>>>(32-7);
	    u = x4 + x0 | 0;
	    x8 ^= u<<9 | u>>>(32-9);
	    u = x8 + x4 | 0;
	    x12 ^= u<<13 | u>>>(32-13);
	    u = x12 + x8 | 0;
	    x0 ^= u<<18 | u>>>(32-18);

	    u = x5 + x1 | 0;
	    x9 ^= u<<7 | u>>>(32-7);
	    u = x9 + x5 | 0;
	    x13 ^= u<<9 | u>>>(32-9);
	    u = x13 + x9 | 0;
	    x1 ^= u<<13 | u>>>(32-13);
	    u = x1 + x13 | 0;
	    x5 ^= u<<18 | u>>>(32-18);

	    u = x10 + x6 | 0;
	    x14 ^= u<<7 | u>>>(32-7);
	    u = x14 + x10 | 0;
	    x2 ^= u<<9 | u>>>(32-9);
	    u = x2 + x14 | 0;
	    x6 ^= u<<13 | u>>>(32-13);
	    u = x6 + x2 | 0;
	    x10 ^= u<<18 | u>>>(32-18);

	    u = x15 + x11 | 0;
	    x3 ^= u<<7 | u>>>(32-7);
	    u = x3 + x15 | 0;
	    x7 ^= u<<9 | u>>>(32-9);
	    u = x7 + x3 | 0;
	    x11 ^= u<<13 | u>>>(32-13);
	    u = x11 + x7 | 0;
	    x15 ^= u<<18 | u>>>(32-18);

	    u = x0 + x3 | 0;
	    x1 ^= u<<7 | u>>>(32-7);
	    u = x1 + x0 | 0;
	    x2 ^= u<<9 | u>>>(32-9);
	    u = x2 + x1 | 0;
	    x3 ^= u<<13 | u>>>(32-13);
	    u = x3 + x2 | 0;
	    x0 ^= u<<18 | u>>>(32-18);

	    u = x5 + x4 | 0;
	    x6 ^= u<<7 | u>>>(32-7);
	    u = x6 + x5 | 0;
	    x7 ^= u<<9 | u>>>(32-9);
	    u = x7 + x6 | 0;
	    x4 ^= u<<13 | u>>>(32-13);
	    u = x4 + x7 | 0;
	    x5 ^= u<<18 | u>>>(32-18);

	    u = x10 + x9 | 0;
	    x11 ^= u<<7 | u>>>(32-7);
	    u = x11 + x10 | 0;
	    x8 ^= u<<9 | u>>>(32-9);
	    u = x8 + x11 | 0;
	    x9 ^= u<<13 | u>>>(32-13);
	    u = x9 + x8 | 0;
	    x10 ^= u<<18 | u>>>(32-18);

	    u = x15 + x14 | 0;
	    x12 ^= u<<7 | u>>>(32-7);
	    u = x12 + x15 | 0;
	    x13 ^= u<<9 | u>>>(32-9);
	    u = x13 + x12 | 0;
	    x14 ^= u<<13 | u>>>(32-13);
	    u = x14 + x13 | 0;
	    x15 ^= u<<18 | u>>>(32-18);
	  }
	   x0 =  x0 +  j0 | 0;
	   x1 =  x1 +  j1 | 0;
	   x2 =  x2 +  j2 | 0;
	   x3 =  x3 +  j3 | 0;
	   x4 =  x4 +  j4 | 0;
	   x5 =  x5 +  j5 | 0;
	   x6 =  x6 +  j6 | 0;
	   x7 =  x7 +  j7 | 0;
	   x8 =  x8 +  j8 | 0;
	   x9 =  x9 +  j9 | 0;
	  x10 = x10 + j10 | 0;
	  x11 = x11 + j11 | 0;
	  x12 = x12 + j12 | 0;
	  x13 = x13 + j13 | 0;
	  x14 = x14 + j14 | 0;
	  x15 = x15 + j15 | 0;

	  o[ 0] = x0 >>>  0 & 0xff;
	  o[ 1] = x0 >>>  8 & 0xff;
	  o[ 2] = x0 >>> 16 & 0xff;
	  o[ 3] = x0 >>> 24 & 0xff;

	  o[ 4] = x1 >>>  0 & 0xff;
	  o[ 5] = x1 >>>  8 & 0xff;
	  o[ 6] = x1 >>> 16 & 0xff;
	  o[ 7] = x1 >>> 24 & 0xff;

	  o[ 8] = x2 >>>  0 & 0xff;
	  o[ 9] = x2 >>>  8 & 0xff;
	  o[10] = x2 >>> 16 & 0xff;
	  o[11] = x2 >>> 24 & 0xff;

	  o[12] = x3 >>>  0 & 0xff;
	  o[13] = x3 >>>  8 & 0xff;
	  o[14] = x3 >>> 16 & 0xff;
	  o[15] = x3 >>> 24 & 0xff;

	  o[16] = x4 >>>  0 & 0xff;
	  o[17] = x4 >>>  8 & 0xff;
	  o[18] = x4 >>> 16 & 0xff;
	  o[19] = x4 >>> 24 & 0xff;

	  o[20] = x5 >>>  0 & 0xff;
	  o[21] = x5 >>>  8 & 0xff;
	  o[22] = x5 >>> 16 & 0xff;
	  o[23] = x5 >>> 24 & 0xff;

	  o[24] = x6 >>>  0 & 0xff;
	  o[25] = x6 >>>  8 & 0xff;
	  o[26] = x6 >>> 16 & 0xff;
	  o[27] = x6 >>> 24 & 0xff;

	  o[28] = x7 >>>  0 & 0xff;
	  o[29] = x7 >>>  8 & 0xff;
	  o[30] = x7 >>> 16 & 0xff;
	  o[31] = x7 >>> 24 & 0xff;

	  o[32] = x8 >>>  0 & 0xff;
	  o[33] = x8 >>>  8 & 0xff;
	  o[34] = x8 >>> 16 & 0xff;
	  o[35] = x8 >>> 24 & 0xff;

	  o[36] = x9 >>>  0 & 0xff;
	  o[37] = x9 >>>  8 & 0xff;
	  o[38] = x9 >>> 16 & 0xff;
	  o[39] = x9 >>> 24 & 0xff;

	  o[40] = x10 >>>  0 & 0xff;
	  o[41] = x10 >>>  8 & 0xff;
	  o[42] = x10 >>> 16 & 0xff;
	  o[43] = x10 >>> 24 & 0xff;

	  o[44] = x11 >>>  0 & 0xff;
	  o[45] = x11 >>>  8 & 0xff;
	  o[46] = x11 >>> 16 & 0xff;
	  o[47] = x11 >>> 24 & 0xff;

	  o[48] = x12 >>>  0 & 0xff;
	  o[49] = x12 >>>  8 & 0xff;
	  o[50] = x12 >>> 16 & 0xff;
	  o[51] = x12 >>> 24 & 0xff;

	  o[52] = x13 >>>  0 & 0xff;
	  o[53] = x13 >>>  8 & 0xff;
	  o[54] = x13 >>> 16 & 0xff;
	  o[55] = x13 >>> 24 & 0xff;

	  o[56] = x14 >>>  0 & 0xff;
	  o[57] = x14 >>>  8 & 0xff;
	  o[58] = x14 >>> 16 & 0xff;
	  o[59] = x14 >>> 24 & 0xff;

	  o[60] = x15 >>>  0 & 0xff;
	  o[61] = x15 >>>  8 & 0xff;
	  o[62] = x15 >>> 16 & 0xff;
	  o[63] = x15 >>> 24 & 0xff;
	}

	function core_hsalsa20(o,p,k,c) {
	  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
	      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
	      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
	      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
	      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
	      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
	      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
	      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
	      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
	      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
	      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
	      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
	      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
	      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
	      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
	      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

	  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
	      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
	      x15 = j15, u;

	  for (var i = 0; i < 20; i += 2) {
	    u = x0 + x12 | 0;
	    x4 ^= u<<7 | u>>>(32-7);
	    u = x4 + x0 | 0;
	    x8 ^= u<<9 | u>>>(32-9);
	    u = x8 + x4 | 0;
	    x12 ^= u<<13 | u>>>(32-13);
	    u = x12 + x8 | 0;
	    x0 ^= u<<18 | u>>>(32-18);

	    u = x5 + x1 | 0;
	    x9 ^= u<<7 | u>>>(32-7);
	    u = x9 + x5 | 0;
	    x13 ^= u<<9 | u>>>(32-9);
	    u = x13 + x9 | 0;
	    x1 ^= u<<13 | u>>>(32-13);
	    u = x1 + x13 | 0;
	    x5 ^= u<<18 | u>>>(32-18);

	    u = x10 + x6 | 0;
	    x14 ^= u<<7 | u>>>(32-7);
	    u = x14 + x10 | 0;
	    x2 ^= u<<9 | u>>>(32-9);
	    u = x2 + x14 | 0;
	    x6 ^= u<<13 | u>>>(32-13);
	    u = x6 + x2 | 0;
	    x10 ^= u<<18 | u>>>(32-18);

	    u = x15 + x11 | 0;
	    x3 ^= u<<7 | u>>>(32-7);
	    u = x3 + x15 | 0;
	    x7 ^= u<<9 | u>>>(32-9);
	    u = x7 + x3 | 0;
	    x11 ^= u<<13 | u>>>(32-13);
	    u = x11 + x7 | 0;
	    x15 ^= u<<18 | u>>>(32-18);

	    u = x0 + x3 | 0;
	    x1 ^= u<<7 | u>>>(32-7);
	    u = x1 + x0 | 0;
	    x2 ^= u<<9 | u>>>(32-9);
	    u = x2 + x1 | 0;
	    x3 ^= u<<13 | u>>>(32-13);
	    u = x3 + x2 | 0;
	    x0 ^= u<<18 | u>>>(32-18);

	    u = x5 + x4 | 0;
	    x6 ^= u<<7 | u>>>(32-7);
	    u = x6 + x5 | 0;
	    x7 ^= u<<9 | u>>>(32-9);
	    u = x7 + x6 | 0;
	    x4 ^= u<<13 | u>>>(32-13);
	    u = x4 + x7 | 0;
	    x5 ^= u<<18 | u>>>(32-18);

	    u = x10 + x9 | 0;
	    x11 ^= u<<7 | u>>>(32-7);
	    u = x11 + x10 | 0;
	    x8 ^= u<<9 | u>>>(32-9);
	    u = x8 + x11 | 0;
	    x9 ^= u<<13 | u>>>(32-13);
	    u = x9 + x8 | 0;
	    x10 ^= u<<18 | u>>>(32-18);

	    u = x15 + x14 | 0;
	    x12 ^= u<<7 | u>>>(32-7);
	    u = x12 + x15 | 0;
	    x13 ^= u<<9 | u>>>(32-9);
	    u = x13 + x12 | 0;
	    x14 ^= u<<13 | u>>>(32-13);
	    u = x14 + x13 | 0;
	    x15 ^= u<<18 | u>>>(32-18);
	  }

	  o[ 0] = x0 >>>  0 & 0xff;
	  o[ 1] = x0 >>>  8 & 0xff;
	  o[ 2] = x0 >>> 16 & 0xff;
	  o[ 3] = x0 >>> 24 & 0xff;

	  o[ 4] = x5 >>>  0 & 0xff;
	  o[ 5] = x5 >>>  8 & 0xff;
	  o[ 6] = x5 >>> 16 & 0xff;
	  o[ 7] = x5 >>> 24 & 0xff;

	  o[ 8] = x10 >>>  0 & 0xff;
	  o[ 9] = x10 >>>  8 & 0xff;
	  o[10] = x10 >>> 16 & 0xff;
	  o[11] = x10 >>> 24 & 0xff;

	  o[12] = x15 >>>  0 & 0xff;
	  o[13] = x15 >>>  8 & 0xff;
	  o[14] = x15 >>> 16 & 0xff;
	  o[15] = x15 >>> 24 & 0xff;

	  o[16] = x6 >>>  0 & 0xff;
	  o[17] = x6 >>>  8 & 0xff;
	  o[18] = x6 >>> 16 & 0xff;
	  o[19] = x6 >>> 24 & 0xff;

	  o[20] = x7 >>>  0 & 0xff;
	  o[21] = x7 >>>  8 & 0xff;
	  o[22] = x7 >>> 16 & 0xff;
	  o[23] = x7 >>> 24 & 0xff;

	  o[24] = x8 >>>  0 & 0xff;
	  o[25] = x8 >>>  8 & 0xff;
	  o[26] = x8 >>> 16 & 0xff;
	  o[27] = x8 >>> 24 & 0xff;

	  o[28] = x9 >>>  0 & 0xff;
	  o[29] = x9 >>>  8 & 0xff;
	  o[30] = x9 >>> 16 & 0xff;
	  o[31] = x9 >>> 24 & 0xff;
	}

	function crypto_core_salsa20(out,inp,k,c) {
	  core_salsa20(out,inp,k,c);
	}

	function crypto_core_hsalsa20(out,inp,k,c) {
	  core_hsalsa20(out,inp,k,c);
	}

	var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
	            // "expand 32-byte k"

	function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
	  var z = new Uint8Array(16), x = new Uint8Array(64);
	  var u, i;
	  for (i = 0; i < 16; i++) z[i] = 0;
	  for (i = 0; i < 8; i++) z[i] = n[i];
	  while (b >= 64) {
	    crypto_core_salsa20(x,z,k,sigma);
	    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
	    u = 1;
	    for (i = 8; i < 16; i++) {
	      u = u + (z[i] & 0xff) | 0;
	      z[i] = u & 0xff;
	      u >>>= 8;
	    }
	    b -= 64;
	    cpos += 64;
	    mpos += 64;
	  }
	  if (b > 0) {
	    crypto_core_salsa20(x,z,k,sigma);
	    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
	  }
	  return 0;
	}

	function crypto_stream_salsa20(c,cpos,b,n,k) {
	  var z = new Uint8Array(16), x = new Uint8Array(64);
	  var u, i;
	  for (i = 0; i < 16; i++) z[i] = 0;
	  for (i = 0; i < 8; i++) z[i] = n[i];
	  while (b >= 64) {
	    crypto_core_salsa20(x,z,k,sigma);
	    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
	    u = 1;
	    for (i = 8; i < 16; i++) {
	      u = u + (z[i] & 0xff) | 0;
	      z[i] = u & 0xff;
	      u >>>= 8;
	    }
	    b -= 64;
	    cpos += 64;
	  }
	  if (b > 0) {
	    crypto_core_salsa20(x,z,k,sigma);
	    for (i = 0; i < b; i++) c[cpos+i] = x[i];
	  }
	  return 0;
	}

	function crypto_stream(c,cpos,d,n,k) {
	  var s = new Uint8Array(32);
	  crypto_core_hsalsa20(s,n,k,sigma);
	  var sn = new Uint8Array(8);
	  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
	  return crypto_stream_salsa20(c,cpos,d,sn,s);
	}

	function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
	  var s = new Uint8Array(32);
	  crypto_core_hsalsa20(s,n,k,sigma);
	  var sn = new Uint8Array(8);
	  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
	  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
	}

	/*
	* Port of Andrew Moon's Poly1305-donna-16. Public domain.
	* https://github.com/floodyberry/poly1305-donna
	*/

	var poly1305 = function(key) {
	  this.buffer = new Uint8Array(16);
	  this.r = new Uint16Array(10);
	  this.h = new Uint16Array(10);
	  this.pad = new Uint16Array(8);
	  this.leftover = 0;
	  this.fin = 0;

	  var t0, t1, t2, t3, t4, t5, t6, t7;

	  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
	  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
	  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
	  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
	  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
	  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
	  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
	  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
	  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
	  this.r[9] = ((t7 >>>  5)) & 0x007f;

	  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
	  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
	  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
	  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
	  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
	  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
	  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
	  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
	};

	poly1305.prototype.blocks = function(m, mpos, bytes) {
	  var hibit = this.fin ? 0 : (1 << 11);
	  var t0, t1, t2, t3, t4, t5, t6, t7, c;
	  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

	  var h0 = this.h[0],
	      h1 = this.h[1],
	      h2 = this.h[2],
	      h3 = this.h[3],
	      h4 = this.h[4],
	      h5 = this.h[5],
	      h6 = this.h[6],
	      h7 = this.h[7],
	      h8 = this.h[8],
	      h9 = this.h[9];

	  var r0 = this.r[0],
	      r1 = this.r[1],
	      r2 = this.r[2],
	      r3 = this.r[3],
	      r4 = this.r[4],
	      r5 = this.r[5],
	      r6 = this.r[6],
	      r7 = this.r[7],
	      r8 = this.r[8],
	      r9 = this.r[9];

	  while (bytes >= 16) {
	    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
	    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
	    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
	    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
	    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
	    h5 += ((t4 >>>  1)) & 0x1fff;
	    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
	    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
	    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
	    h9 += ((t7 >>> 5)) | hibit;

	    c = 0;

	    d0 = c;
	    d0 += h0 * r0;
	    d0 += h1 * (5 * r9);
	    d0 += h2 * (5 * r8);
	    d0 += h3 * (5 * r7);
	    d0 += h4 * (5 * r6);
	    c = (d0 >>> 13); d0 &= 0x1fff;
	    d0 += h5 * (5 * r5);
	    d0 += h6 * (5 * r4);
	    d0 += h7 * (5 * r3);
	    d0 += h8 * (5 * r2);
	    d0 += h9 * (5 * r1);
	    c += (d0 >>> 13); d0 &= 0x1fff;

	    d1 = c;
	    d1 += h0 * r1;
	    d1 += h1 * r0;
	    d1 += h2 * (5 * r9);
	    d1 += h3 * (5 * r8);
	    d1 += h4 * (5 * r7);
	    c = (d1 >>> 13); d1 &= 0x1fff;
	    d1 += h5 * (5 * r6);
	    d1 += h6 * (5 * r5);
	    d1 += h7 * (5 * r4);
	    d1 += h8 * (5 * r3);
	    d1 += h9 * (5 * r2);
	    c += (d1 >>> 13); d1 &= 0x1fff;

	    d2 = c;
	    d2 += h0 * r2;
	    d2 += h1 * r1;
	    d2 += h2 * r0;
	    d2 += h3 * (5 * r9);
	    d2 += h4 * (5 * r8);
	    c = (d2 >>> 13); d2 &= 0x1fff;
	    d2 += h5 * (5 * r7);
	    d2 += h6 * (5 * r6);
	    d2 += h7 * (5 * r5);
	    d2 += h8 * (5 * r4);
	    d2 += h9 * (5 * r3);
	    c += (d2 >>> 13); d2 &= 0x1fff;

	    d3 = c;
	    d3 += h0 * r3;
	    d3 += h1 * r2;
	    d3 += h2 * r1;
	    d3 += h3 * r0;
	    d3 += h4 * (5 * r9);
	    c = (d3 >>> 13); d3 &= 0x1fff;
	    d3 += h5 * (5 * r8);
	    d3 += h6 * (5 * r7);
	    d3 += h7 * (5 * r6);
	    d3 += h8 * (5 * r5);
	    d3 += h9 * (5 * r4);
	    c += (d3 >>> 13); d3 &= 0x1fff;

	    d4 = c;
	    d4 += h0 * r4;
	    d4 += h1 * r3;
	    d4 += h2 * r2;
	    d4 += h3 * r1;
	    d4 += h4 * r0;
	    c = (d4 >>> 13); d4 &= 0x1fff;
	    d4 += h5 * (5 * r9);
	    d4 += h6 * (5 * r8);
	    d4 += h7 * (5 * r7);
	    d4 += h8 * (5 * r6);
	    d4 += h9 * (5 * r5);
	    c += (d4 >>> 13); d4 &= 0x1fff;

	    d5 = c;
	    d5 += h0 * r5;
	    d5 += h1 * r4;
	    d5 += h2 * r3;
	    d5 += h3 * r2;
	    d5 += h4 * r1;
	    c = (d5 >>> 13); d5 &= 0x1fff;
	    d5 += h5 * r0;
	    d5 += h6 * (5 * r9);
	    d5 += h7 * (5 * r8);
	    d5 += h8 * (5 * r7);
	    d5 += h9 * (5 * r6);
	    c += (d5 >>> 13); d5 &= 0x1fff;

	    d6 = c;
	    d6 += h0 * r6;
	    d6 += h1 * r5;
	    d6 += h2 * r4;
	    d6 += h3 * r3;
	    d6 += h4 * r2;
	    c = (d6 >>> 13); d6 &= 0x1fff;
	    d6 += h5 * r1;
	    d6 += h6 * r0;
	    d6 += h7 * (5 * r9);
	    d6 += h8 * (5 * r8);
	    d6 += h9 * (5 * r7);
	    c += (d6 >>> 13); d6 &= 0x1fff;

	    d7 = c;
	    d7 += h0 * r7;
	    d7 += h1 * r6;
	    d7 += h2 * r5;
	    d7 += h3 * r4;
	    d7 += h4 * r3;
	    c = (d7 >>> 13); d7 &= 0x1fff;
	    d7 += h5 * r2;
	    d7 += h6 * r1;
	    d7 += h7 * r0;
	    d7 += h8 * (5 * r9);
	    d7 += h9 * (5 * r8);
	    c += (d7 >>> 13); d7 &= 0x1fff;

	    d8 = c;
	    d8 += h0 * r8;
	    d8 += h1 * r7;
	    d8 += h2 * r6;
	    d8 += h3 * r5;
	    d8 += h4 * r4;
	    c = (d8 >>> 13); d8 &= 0x1fff;
	    d8 += h5 * r3;
	    d8 += h6 * r2;
	    d8 += h7 * r1;
	    d8 += h8 * r0;
	    d8 += h9 * (5 * r9);
	    c += (d8 >>> 13); d8 &= 0x1fff;

	    d9 = c;
	    d9 += h0 * r9;
	    d9 += h1 * r8;
	    d9 += h2 * r7;
	    d9 += h3 * r6;
	    d9 += h4 * r5;
	    c = (d9 >>> 13); d9 &= 0x1fff;
	    d9 += h5 * r4;
	    d9 += h6 * r3;
	    d9 += h7 * r2;
	    d9 += h8 * r1;
	    d9 += h9 * r0;
	    c += (d9 >>> 13); d9 &= 0x1fff;

	    c = (((c << 2) + c)) | 0;
	    c = (c + d0) | 0;
	    d0 = c & 0x1fff;
	    c = (c >>> 13);
	    d1 += c;

	    h0 = d0;
	    h1 = d1;
	    h2 = d2;
	    h3 = d3;
	    h4 = d4;
	    h5 = d5;
	    h6 = d6;
	    h7 = d7;
	    h8 = d8;
	    h9 = d9;

	    mpos += 16;
	    bytes -= 16;
	  }
	  this.h[0] = h0;
	  this.h[1] = h1;
	  this.h[2] = h2;
	  this.h[3] = h3;
	  this.h[4] = h4;
	  this.h[5] = h5;
	  this.h[6] = h6;
	  this.h[7] = h7;
	  this.h[8] = h8;
	  this.h[9] = h9;
	};

	poly1305.prototype.finish = function(mac, macpos) {
	  var g = new Uint16Array(10);
	  var c, mask, f, i;

	  if (this.leftover) {
	    i = this.leftover;
	    this.buffer[i++] = 1;
	    for (; i < 16; i++) this.buffer[i] = 0;
	    this.fin = 1;
	    this.blocks(this.buffer, 0, 16);
	  }

	  c = this.h[1] >>> 13;
	  this.h[1] &= 0x1fff;
	  for (i = 2; i < 10; i++) {
	    this.h[i] += c;
	    c = this.h[i] >>> 13;
	    this.h[i] &= 0x1fff;
	  }
	  this.h[0] += (c * 5);
	  c = this.h[0] >>> 13;
	  this.h[0] &= 0x1fff;
	  this.h[1] += c;
	  c = this.h[1] >>> 13;
	  this.h[1] &= 0x1fff;
	  this.h[2] += c;

	  g[0] = this.h[0] + 5;
	  c = g[0] >>> 13;
	  g[0] &= 0x1fff;
	  for (i = 1; i < 10; i++) {
	    g[i] = this.h[i] + c;
	    c = g[i] >>> 13;
	    g[i] &= 0x1fff;
	  }
	  g[9] -= (1 << 13);

	  mask = (c ^ 1) - 1;
	  for (i = 0; i < 10; i++) g[i] &= mask;
	  mask = ~mask;
	  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

	  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
	  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
	  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
	  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
	  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
	  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
	  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
	  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

	  f = this.h[0] + this.pad[0];
	  this.h[0] = f & 0xffff;
	  for (i = 1; i < 8; i++) {
	    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
	    this.h[i] = f & 0xffff;
	  }

	  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
	  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
	  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
	  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
	  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
	  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
	  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
	  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
	  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
	  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
	  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
	  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
	  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
	  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
	  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
	  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
	};

	poly1305.prototype.update = function(m, mpos, bytes) {
	  var i, want;

	  if (this.leftover) {
	    want = (16 - this.leftover);
	    if (want > bytes)
	      want = bytes;
	    for (i = 0; i < want; i++)
	      this.buffer[this.leftover + i] = m[mpos+i];
	    bytes -= want;
	    mpos += want;
	    this.leftover += want;
	    if (this.leftover < 16)
	      return;
	    this.blocks(this.buffer, 0, 16);
	    this.leftover = 0;
	  }

	  if (bytes >= 16) {
	    want = bytes - (bytes % 16);
	    this.blocks(m, mpos, want);
	    mpos += want;
	    bytes -= want;
	  }

	  if (bytes) {
	    for (i = 0; i < bytes; i++)
	      this.buffer[this.leftover + i] = m[mpos+i];
	    this.leftover += bytes;
	  }
	};

	function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
	  var s = new poly1305(k);
	  s.update(m, mpos, n);
	  s.finish(out, outpos);
	  return 0;
	}

	function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
	  var x = new Uint8Array(16);
	  crypto_onetimeauth(x,0,m,mpos,n,k);
	  return crypto_verify_16(h,hpos,x,0);
	}

	function crypto_secretbox(c,m,d,n,k) {
	  var i;
	  if (d < 32) return -1;
	  crypto_stream_xor(c,0,m,0,d,n,k);
	  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
	  for (i = 0; i < 16; i++) c[i] = 0;
	  return 0;
	}

	function crypto_secretbox_open(m,c,d,n,k) {
	  var i;
	  var x = new Uint8Array(32);
	  if (d < 32) return -1;
	  crypto_stream(x,0,32,n,k);
	  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
	  crypto_stream_xor(m,0,c,0,d,n,k);
	  for (i = 0; i < 32; i++) m[i] = 0;
	  return 0;
	}

	function set25519(r, a) {
	  var i;
	  for (i = 0; i < 16; i++) r[i] = a[i]|0;
	}

	function car25519(o) {
	  var i, v, c = 1;
	  for (i = 0; i < 16; i++) {
	    v = o[i] + c + 65535;
	    c = Math.floor(v / 65536);
	    o[i] = v - c * 65536;
	  }
	  o[0] += c-1 + 37 * (c-1);
	}

	function sel25519(p, q, b) {
	  var t, c = ~(b-1);
	  for (var i = 0; i < 16; i++) {
	    t = c & (p[i] ^ q[i]);
	    p[i] ^= t;
	    q[i] ^= t;
	  }
	}

	function pack25519(o, n) {
	  var i, j, b;
	  var m = gf(), t = gf();
	  for (i = 0; i < 16; i++) t[i] = n[i];
	  car25519(t);
	  car25519(t);
	  car25519(t);
	  for (j = 0; j < 2; j++) {
	    m[0] = t[0] - 0xffed;
	    for (i = 1; i < 15; i++) {
	      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
	      m[i-1] &= 0xffff;
	    }
	    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
	    b = (m[15]>>16) & 1;
	    m[14] &= 0xffff;
	    sel25519(t, m, 1-b);
	  }
	  for (i = 0; i < 16; i++) {
	    o[2*i] = t[i] & 0xff;
	    o[2*i+1] = t[i]>>8;
	  }
	}

	function neq25519(a, b) {
	  var c = new Uint8Array(32), d = new Uint8Array(32);
	  pack25519(c, a);
	  pack25519(d, b);
	  return crypto_verify_32(c, 0, d, 0);
	}

	function par25519(a) {
	  var d = new Uint8Array(32);
	  pack25519(d, a);
	  return d[0] & 1;
	}

	function unpack25519(o, n) {
	  var i;
	  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
	  o[15] &= 0x7fff;
	}

	function A(o, a, b) {
	  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
	}

	function Z(o, a, b) {
	  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
	}

	function M(o, a, b) {
	  var v, c,
	     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
	     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
	    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
	    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
	    b0 = b[0],
	    b1 = b[1],
	    b2 = b[2],
	    b3 = b[3],
	    b4 = b[4],
	    b5 = b[5],
	    b6 = b[6],
	    b7 = b[7],
	    b8 = b[8],
	    b9 = b[9],
	    b10 = b[10],
	    b11 = b[11],
	    b12 = b[12],
	    b13 = b[13],
	    b14 = b[14],
	    b15 = b[15];

	  v = a[0];
	  t0 += v * b0;
	  t1 += v * b1;
	  t2 += v * b2;
	  t3 += v * b3;
	  t4 += v * b4;
	  t5 += v * b5;
	  t6 += v * b6;
	  t7 += v * b7;
	  t8 += v * b8;
	  t9 += v * b9;
	  t10 += v * b10;
	  t11 += v * b11;
	  t12 += v * b12;
	  t13 += v * b13;
	  t14 += v * b14;
	  t15 += v * b15;
	  v = a[1];
	  t1 += v * b0;
	  t2 += v * b1;
	  t3 += v * b2;
	  t4 += v * b3;
	  t5 += v * b4;
	  t6 += v * b5;
	  t7 += v * b6;
	  t8 += v * b7;
	  t9 += v * b8;
	  t10 += v * b9;
	  t11 += v * b10;
	  t12 += v * b11;
	  t13 += v * b12;
	  t14 += v * b13;
	  t15 += v * b14;
	  t16 += v * b15;
	  v = a[2];
	  t2 += v * b0;
	  t3 += v * b1;
	  t4 += v * b2;
	  t5 += v * b3;
	  t6 += v * b4;
	  t7 += v * b5;
	  t8 += v * b6;
	  t9 += v * b7;
	  t10 += v * b8;
	  t11 += v * b9;
	  t12 += v * b10;
	  t13 += v * b11;
	  t14 += v * b12;
	  t15 += v * b13;
	  t16 += v * b14;
	  t17 += v * b15;
	  v = a[3];
	  t3 += v * b0;
	  t4 += v * b1;
	  t5 += v * b2;
	  t6 += v * b3;
	  t7 += v * b4;
	  t8 += v * b5;
	  t9 += v * b6;
	  t10 += v * b7;
	  t11 += v * b8;
	  t12 += v * b9;
	  t13 += v * b10;
	  t14 += v * b11;
	  t15 += v * b12;
	  t16 += v * b13;
	  t17 += v * b14;
	  t18 += v * b15;
	  v = a[4];
	  t4 += v * b0;
	  t5 += v * b1;
	  t6 += v * b2;
	  t7 += v * b3;
	  t8 += v * b4;
	  t9 += v * b5;
	  t10 += v * b6;
	  t11 += v * b7;
	  t12 += v * b8;
	  t13 += v * b9;
	  t14 += v * b10;
	  t15 += v * b11;
	  t16 += v * b12;
	  t17 += v * b13;
	  t18 += v * b14;
	  t19 += v * b15;
	  v = a[5];
	  t5 += v * b0;
	  t6 += v * b1;
	  t7 += v * b2;
	  t8 += v * b3;
	  t9 += v * b4;
	  t10 += v * b5;
	  t11 += v * b6;
	  t12 += v * b7;
	  t13 += v * b8;
	  t14 += v * b9;
	  t15 += v * b10;
	  t16 += v * b11;
	  t17 += v * b12;
	  t18 += v * b13;
	  t19 += v * b14;
	  t20 += v * b15;
	  v = a[6];
	  t6 += v * b0;
	  t7 += v * b1;
	  t8 += v * b2;
	  t9 += v * b3;
	  t10 += v * b4;
	  t11 += v * b5;
	  t12 += v * b6;
	  t13 += v * b7;
	  t14 += v * b8;
	  t15 += v * b9;
	  t16 += v * b10;
	  t17 += v * b11;
	  t18 += v * b12;
	  t19 += v * b13;
	  t20 += v * b14;
	  t21 += v * b15;
	  v = a[7];
	  t7 += v * b0;
	  t8 += v * b1;
	  t9 += v * b2;
	  t10 += v * b3;
	  t11 += v * b4;
	  t12 += v * b5;
	  t13 += v * b6;
	  t14 += v * b7;
	  t15 += v * b8;
	  t16 += v * b9;
	  t17 += v * b10;
	  t18 += v * b11;
	  t19 += v * b12;
	  t20 += v * b13;
	  t21 += v * b14;
	  t22 += v * b15;
	  v = a[8];
	  t8 += v * b0;
	  t9 += v * b1;
	  t10 += v * b2;
	  t11 += v * b3;
	  t12 += v * b4;
	  t13 += v * b5;
	  t14 += v * b6;
	  t15 += v * b7;
	  t16 += v * b8;
	  t17 += v * b9;
	  t18 += v * b10;
	  t19 += v * b11;
	  t20 += v * b12;
	  t21 += v * b13;
	  t22 += v * b14;
	  t23 += v * b15;
	  v = a[9];
	  t9 += v * b0;
	  t10 += v * b1;
	  t11 += v * b2;
	  t12 += v * b3;
	  t13 += v * b4;
	  t14 += v * b5;
	  t15 += v * b6;
	  t16 += v * b7;
	  t17 += v * b8;
	  t18 += v * b9;
	  t19 += v * b10;
	  t20 += v * b11;
	  t21 += v * b12;
	  t22 += v * b13;
	  t23 += v * b14;
	  t24 += v * b15;
	  v = a[10];
	  t10 += v * b0;
	  t11 += v * b1;
	  t12 += v * b2;
	  t13 += v * b3;
	  t14 += v * b4;
	  t15 += v * b5;
	  t16 += v * b6;
	  t17 += v * b7;
	  t18 += v * b8;
	  t19 += v * b9;
	  t20 += v * b10;
	  t21 += v * b11;
	  t22 += v * b12;
	  t23 += v * b13;
	  t24 += v * b14;
	  t25 += v * b15;
	  v = a[11];
	  t11 += v * b0;
	  t12 += v * b1;
	  t13 += v * b2;
	  t14 += v * b3;
	  t15 += v * b4;
	  t16 += v * b5;
	  t17 += v * b6;
	  t18 += v * b7;
	  t19 += v * b8;
	  t20 += v * b9;
	  t21 += v * b10;
	  t22 += v * b11;
	  t23 += v * b12;
	  t24 += v * b13;
	  t25 += v * b14;
	  t26 += v * b15;
	  v = a[12];
	  t12 += v * b0;
	  t13 += v * b1;
	  t14 += v * b2;
	  t15 += v * b3;
	  t16 += v * b4;
	  t17 += v * b5;
	  t18 += v * b6;
	  t19 += v * b7;
	  t20 += v * b8;
	  t21 += v * b9;
	  t22 += v * b10;
	  t23 += v * b11;
	  t24 += v * b12;
	  t25 += v * b13;
	  t26 += v * b14;
	  t27 += v * b15;
	  v = a[13];
	  t13 += v * b0;
	  t14 += v * b1;
	  t15 += v * b2;
	  t16 += v * b3;
	  t17 += v * b4;
	  t18 += v * b5;
	  t19 += v * b6;
	  t20 += v * b7;
	  t21 += v * b8;
	  t22 += v * b9;
	  t23 += v * b10;
	  t24 += v * b11;
	  t25 += v * b12;
	  t26 += v * b13;
	  t27 += v * b14;
	  t28 += v * b15;
	  v = a[14];
	  t14 += v * b0;
	  t15 += v * b1;
	  t16 += v * b2;
	  t17 += v * b3;
	  t18 += v * b4;
	  t19 += v * b5;
	  t20 += v * b6;
	  t21 += v * b7;
	  t22 += v * b8;
	  t23 += v * b9;
	  t24 += v * b10;
	  t25 += v * b11;
	  t26 += v * b12;
	  t27 += v * b13;
	  t28 += v * b14;
	  t29 += v * b15;
	  v = a[15];
	  t15 += v * b0;
	  t16 += v * b1;
	  t17 += v * b2;
	  t18 += v * b3;
	  t19 += v * b4;
	  t20 += v * b5;
	  t21 += v * b6;
	  t22 += v * b7;
	  t23 += v * b8;
	  t24 += v * b9;
	  t25 += v * b10;
	  t26 += v * b11;
	  t27 += v * b12;
	  t28 += v * b13;
	  t29 += v * b14;
	  t30 += v * b15;

	  t0  += 38 * t16;
	  t1  += 38 * t17;
	  t2  += 38 * t18;
	  t3  += 38 * t19;
	  t4  += 38 * t20;
	  t5  += 38 * t21;
	  t6  += 38 * t22;
	  t7  += 38 * t23;
	  t8  += 38 * t24;
	  t9  += 38 * t25;
	  t10 += 38 * t26;
	  t11 += 38 * t27;
	  t12 += 38 * t28;
	  t13 += 38 * t29;
	  t14 += 38 * t30;
	  // t15 left as is

	  // first car
	  c = 1;
	  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
	  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
	  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
	  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
	  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
	  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
	  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
	  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
	  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
	  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
	  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
	  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
	  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
	  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
	  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
	  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
	  t0 += c-1 + 37 * (c-1);

	  // second car
	  c = 1;
	  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
	  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
	  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
	  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
	  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
	  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
	  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
	  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
	  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
	  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
	  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
	  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
	  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
	  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
	  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
	  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
	  t0 += c-1 + 37 * (c-1);

	  o[ 0] = t0;
	  o[ 1] = t1;
	  o[ 2] = t2;
	  o[ 3] = t3;
	  o[ 4] = t4;
	  o[ 5] = t5;
	  o[ 6] = t6;
	  o[ 7] = t7;
	  o[ 8] = t8;
	  o[ 9] = t9;
	  o[10] = t10;
	  o[11] = t11;
	  o[12] = t12;
	  o[13] = t13;
	  o[14] = t14;
	  o[15] = t15;
	}

	function S(o, a) {
	  M(o, a, a);
	}

	function inv25519(o, i) {
	  var c = gf();
	  var a;
	  for (a = 0; a < 16; a++) c[a] = i[a];
	  for (a = 253; a >= 0; a--) {
	    S(c, c);
	    if(a !== 2 && a !== 4) M(c, c, i);
	  }
	  for (a = 0; a < 16; a++) o[a] = c[a];
	}

	function pow2523(o, i) {
	  var c = gf();
	  var a;
	  for (a = 0; a < 16; a++) c[a] = i[a];
	  for (a = 250; a >= 0; a--) {
	      S(c, c);
	      if(a !== 1) M(c, c, i);
	  }
	  for (a = 0; a < 16; a++) o[a] = c[a];
	}

	function crypto_scalarmult(q, n, p) {
	  var z = new Uint8Array(32);
	  var x = new Float64Array(80), r, i;
	  var a = gf(), b = gf(), c = gf(),
	      d = gf(), e = gf(), f = gf();
	  for (i = 0; i < 31; i++) z[i] = n[i];
	  z[31]=(n[31]&127)|64;
	  z[0]&=248;
	  unpack25519(x,p);
	  for (i = 0; i < 16; i++) {
	    b[i]=x[i];
	    d[i]=a[i]=c[i]=0;
	  }
	  a[0]=d[0]=1;
	  for (i=254; i>=0; --i) {
	    r=(z[i>>>3]>>>(i&7))&1;
	    sel25519(a,b,r);
	    sel25519(c,d,r);
	    A(e,a,c);
	    Z(a,a,c);
	    A(c,b,d);
	    Z(b,b,d);
	    S(d,e);
	    S(f,a);
	    M(a,c,a);
	    M(c,b,e);
	    A(e,a,c);
	    Z(a,a,c);
	    S(b,a);
	    Z(c,d,f);
	    M(a,c,_121665);
	    A(a,a,d);
	    M(c,c,a);
	    M(a,d,f);
	    M(d,b,x);
	    S(b,e);
	    sel25519(a,b,r);
	    sel25519(c,d,r);
	  }
	  for (i = 0; i < 16; i++) {
	    x[i+16]=a[i];
	    x[i+32]=c[i];
	    x[i+48]=b[i];
	    x[i+64]=d[i];
	  }
	  var x32 = x.subarray(32);
	  var x16 = x.subarray(16);
	  inv25519(x32,x32);
	  M(x16,x16,x32);
	  pack25519(q,x16);
	  return 0;
	}

	function crypto_scalarmult_base(q, n) {
	  return crypto_scalarmult(q, n, _9);
	}

	function crypto_box_keypair(y, x) {
	  randombytes(x, 32);
	  return crypto_scalarmult_base(y, x);
	}

	function crypto_box_beforenm(k, y, x) {
	  var s = new Uint8Array(32);
	  crypto_scalarmult(s, x, y);
	  return crypto_core_hsalsa20(k, _0, s, sigma);
	}

	var crypto_box_afternm = crypto_secretbox;
	var crypto_box_open_afternm = crypto_secretbox_open;

	function crypto_box(c, m, d, n, y, x) {
	  var k = new Uint8Array(32);
	  crypto_box_beforenm(k, y, x);
	  return crypto_box_afternm(c, m, d, n, k);
	}

	function crypto_box_open(m, c, d, n, y, x) {
	  var k = new Uint8Array(32);
	  crypto_box_beforenm(k, y, x);
	  return crypto_box_open_afternm(m, c, d, n, k);
	}

	var K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	];

	function crypto_hashblocks_hl(hh, hl, m, n) {
	  var wh = new Int32Array(16), wl = new Int32Array(16),
	      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
	      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
	      th, tl, i, j, h, l, a, b, c, d;

	  var ah0 = hh[0],
	      ah1 = hh[1],
	      ah2 = hh[2],
	      ah3 = hh[3],
	      ah4 = hh[4],
	      ah5 = hh[5],
	      ah6 = hh[6],
	      ah7 = hh[7],

	      al0 = hl[0],
	      al1 = hl[1],
	      al2 = hl[2],
	      al3 = hl[3],
	      al4 = hl[4],
	      al5 = hl[5],
	      al6 = hl[6],
	      al7 = hl[7];

	  var pos = 0;
	  while (n >= 128) {
	    for (i = 0; i < 16; i++) {
	      j = 8 * i + pos;
	      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
	      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
	    }
	    for (i = 0; i < 80; i++) {
	      bh0 = ah0;
	      bh1 = ah1;
	      bh2 = ah2;
	      bh3 = ah3;
	      bh4 = ah4;
	      bh5 = ah5;
	      bh6 = ah6;
	      bh7 = ah7;

	      bl0 = al0;
	      bl1 = al1;
	      bl2 = al2;
	      bl3 = al3;
	      bl4 = al4;
	      bl5 = al5;
	      bl6 = al6;
	      bl7 = al7;

	      // add
	      h = ah7;
	      l = al7;

	      a = l & 0xffff; b = l >>> 16;
	      c = h & 0xffff; d = h >>> 16;

	      // Sigma1
	      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
	      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      // Ch
	      h = (ah4 & ah5) ^ (~ah4 & ah6);
	      l = (al4 & al5) ^ (~al4 & al6);

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      // K
	      h = K[i*2];
	      l = K[i*2+1];

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      // w
	      h = wh[i%16];
	      l = wl[i%16];

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      b += a >>> 16;
	      c += b >>> 16;
	      d += c >>> 16;

	      th = c & 0xffff | d << 16;
	      tl = a & 0xffff | b << 16;

	      // add
	      h = th;
	      l = tl;

	      a = l & 0xffff; b = l >>> 16;
	      c = h & 0xffff; d = h >>> 16;

	      // Sigma0
	      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
	      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      // Maj
	      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
	      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      b += a >>> 16;
	      c += b >>> 16;
	      d += c >>> 16;

	      bh7 = (c & 0xffff) | (d << 16);
	      bl7 = (a & 0xffff) | (b << 16);

	      // add
	      h = bh3;
	      l = bl3;

	      a = l & 0xffff; b = l >>> 16;
	      c = h & 0xffff; d = h >>> 16;

	      h = th;
	      l = tl;

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      b += a >>> 16;
	      c += b >>> 16;
	      d += c >>> 16;

	      bh3 = (c & 0xffff) | (d << 16);
	      bl3 = (a & 0xffff) | (b << 16);

	      ah1 = bh0;
	      ah2 = bh1;
	      ah3 = bh2;
	      ah4 = bh3;
	      ah5 = bh4;
	      ah6 = bh5;
	      ah7 = bh6;
	      ah0 = bh7;

	      al1 = bl0;
	      al2 = bl1;
	      al3 = bl2;
	      al4 = bl3;
	      al5 = bl4;
	      al6 = bl5;
	      al7 = bl6;
	      al0 = bl7;

	      if (i%16 === 15) {
	        for (j = 0; j < 16; j++) {
	          // add
	          h = wh[j];
	          l = wl[j];

	          a = l & 0xffff; b = l >>> 16;
	          c = h & 0xffff; d = h >>> 16;

	          h = wh[(j+9)%16];
	          l = wl[(j+9)%16];

	          a += l & 0xffff; b += l >>> 16;
	          c += h & 0xffff; d += h >>> 16;

	          // sigma0
	          th = wh[(j+1)%16];
	          tl = wl[(j+1)%16];
	          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
	          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

	          a += l & 0xffff; b += l >>> 16;
	          c += h & 0xffff; d += h >>> 16;

	          // sigma1
	          th = wh[(j+14)%16];
	          tl = wl[(j+14)%16];
	          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
	          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

	          a += l & 0xffff; b += l >>> 16;
	          c += h & 0xffff; d += h >>> 16;

	          b += a >>> 16;
	          c += b >>> 16;
	          d += c >>> 16;

	          wh[j] = (c & 0xffff) | (d << 16);
	          wl[j] = (a & 0xffff) | (b << 16);
	        }
	      }
	    }

	    // add
	    h = ah0;
	    l = al0;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[0];
	    l = hl[0];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[0] = ah0 = (c & 0xffff) | (d << 16);
	    hl[0] = al0 = (a & 0xffff) | (b << 16);

	    h = ah1;
	    l = al1;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[1];
	    l = hl[1];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[1] = ah1 = (c & 0xffff) | (d << 16);
	    hl[1] = al1 = (a & 0xffff) | (b << 16);

	    h = ah2;
	    l = al2;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[2];
	    l = hl[2];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[2] = ah2 = (c & 0xffff) | (d << 16);
	    hl[2] = al2 = (a & 0xffff) | (b << 16);

	    h = ah3;
	    l = al3;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[3];
	    l = hl[3];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[3] = ah3 = (c & 0xffff) | (d << 16);
	    hl[3] = al3 = (a & 0xffff) | (b << 16);

	    h = ah4;
	    l = al4;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[4];
	    l = hl[4];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[4] = ah4 = (c & 0xffff) | (d << 16);
	    hl[4] = al4 = (a & 0xffff) | (b << 16);

	    h = ah5;
	    l = al5;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[5];
	    l = hl[5];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[5] = ah5 = (c & 0xffff) | (d << 16);
	    hl[5] = al5 = (a & 0xffff) | (b << 16);

	    h = ah6;
	    l = al6;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[6];
	    l = hl[6];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[6] = ah6 = (c & 0xffff) | (d << 16);
	    hl[6] = al6 = (a & 0xffff) | (b << 16);

	    h = ah7;
	    l = al7;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[7];
	    l = hl[7];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[7] = ah7 = (c & 0xffff) | (d << 16);
	    hl[7] = al7 = (a & 0xffff) | (b << 16);

	    pos += 128;
	    n -= 128;
	  }

	  return n;
	}

	function crypto_hash(out, m, n) {
	  var hh = new Int32Array(8),
	      hl = new Int32Array(8),
	      x = new Uint8Array(256),
	      i, b = n;

	  hh[0] = 0x6a09e667;
	  hh[1] = 0xbb67ae85;
	  hh[2] = 0x3c6ef372;
	  hh[3] = 0xa54ff53a;
	  hh[4] = 0x510e527f;
	  hh[5] = 0x9b05688c;
	  hh[6] = 0x1f83d9ab;
	  hh[7] = 0x5be0cd19;

	  hl[0] = 0xf3bcc908;
	  hl[1] = 0x84caa73b;
	  hl[2] = 0xfe94f82b;
	  hl[3] = 0x5f1d36f1;
	  hl[4] = 0xade682d1;
	  hl[5] = 0x2b3e6c1f;
	  hl[6] = 0xfb41bd6b;
	  hl[7] = 0x137e2179;

	  crypto_hashblocks_hl(hh, hl, m, n);
	  n %= 128;

	  for (i = 0; i < n; i++) x[i] = m[b-n+i];
	  x[n] = 128;

	  n = 256-128*(n<112?1:0);
	  x[n-9] = 0;
	  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
	  crypto_hashblocks_hl(hh, hl, x, n);

	  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

	  return 0;
	}

	function add(p, q) {
	  var a = gf(), b = gf(), c = gf(),
	      d = gf(), e = gf(), f = gf(),
	      g = gf(), h = gf(), t = gf();

	  Z(a, p[1], p[0]);
	  Z(t, q[1], q[0]);
	  M(a, a, t);
	  A(b, p[0], p[1]);
	  A(t, q[0], q[1]);
	  M(b, b, t);
	  M(c, p[3], q[3]);
	  M(c, c, D2);
	  M(d, p[2], q[2]);
	  A(d, d, d);
	  Z(e, b, a);
	  Z(f, d, c);
	  A(g, d, c);
	  A(h, b, a);

	  M(p[0], e, f);
	  M(p[1], h, g);
	  M(p[2], g, f);
	  M(p[3], e, h);
	}

	function cswap(p, q, b) {
	  var i;
	  for (i = 0; i < 4; i++) {
	    sel25519(p[i], q[i], b);
	  }
	}

	function pack(r, p) {
	  var tx = gf(), ty = gf(), zi = gf();
	  inv25519(zi, p[2]);
	  M(tx, p[0], zi);
	  M(ty, p[1], zi);
	  pack25519(r, ty);
	  r[31] ^= par25519(tx) << 7;
	}

	function scalarmult(p, q, s) {
	  var b, i;
	  set25519(p[0], gf0);
	  set25519(p[1], gf1);
	  set25519(p[2], gf1);
	  set25519(p[3], gf0);
	  for (i = 255; i >= 0; --i) {
	    b = (s[(i/8)|0] >> (i&7)) & 1;
	    cswap(p, q, b);
	    add(q, p);
	    add(p, p);
	    cswap(p, q, b);
	  }
	}

	function scalarbase(p, s) {
	  var q = [gf(), gf(), gf(), gf()];
	  set25519(q[0], X);
	  set25519(q[1], Y);
	  set25519(q[2], gf1);
	  M(q[3], X, Y);
	  scalarmult(p, q, s);
	}

	function crypto_sign_keypair(pk, sk, seeded) {
	  var d = new Uint8Array(64);
	  var p = [gf(), gf(), gf(), gf()];
	  var i;

	  if (!seeded) randombytes(sk, 32);
	  crypto_hash(d, sk, 32);
	  d[0] &= 248;
	  d[31] &= 127;
	  d[31] |= 64;

	  scalarbase(p, d);
	  pack(pk, p);

	  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
	  return 0;
	}

	var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

	function modL(r, x) {
	  var carry, i, j, k;
	  for (i = 63; i >= 32; --i) {
	    carry = 0;
	    for (j = i - 32, k = i - 12; j < k; ++j) {
	      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
	      carry = (x[j] + 128) >> 8;
	      x[j] -= carry * 256;
	    }
	    x[j] += carry;
	    x[i] = 0;
	  }
	  carry = 0;
	  for (j = 0; j < 32; j++) {
	    x[j] += carry - (x[31] >> 4) * L[j];
	    carry = x[j] >> 8;
	    x[j] &= 255;
	  }
	  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
	  for (i = 0; i < 32; i++) {
	    x[i+1] += x[i] >> 8;
	    r[i] = x[i] & 255;
	  }
	}

	function reduce(r) {
	  var x = new Float64Array(64), i;
	  for (i = 0; i < 64; i++) x[i] = r[i];
	  for (i = 0; i < 64; i++) r[i] = 0;
	  modL(r, x);
	}

	// Note: difference from C - smlen returned, not passed as argument.
	function crypto_sign(sm, m, n, sk) {
	  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
	  var i, j, x = new Float64Array(64);
	  var p = [gf(), gf(), gf(), gf()];

	  crypto_hash(d, sk, 32);
	  d[0] &= 248;
	  d[31] &= 127;
	  d[31] |= 64;

	  var smlen = n + 64;
	  for (i = 0; i < n; i++) sm[64 + i] = m[i];
	  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

	  crypto_hash(r, sm.subarray(32), n+32);
	  reduce(r);
	  scalarbase(p, r);
	  pack(sm, p);

	  for (i = 32; i < 64; i++) sm[i] = sk[i];
	  crypto_hash(h, sm, n + 64);
	  reduce(h);

	  for (i = 0; i < 64; i++) x[i] = 0;
	  for (i = 0; i < 32; i++) x[i] = r[i];
	  for (i = 0; i < 32; i++) {
	    for (j = 0; j < 32; j++) {
	      x[i+j] += h[i] * d[j];
	    }
	  }

	  modL(sm.subarray(32), x);
	  return smlen;
	}

	function unpackneg(r, p) {
	  var t = gf(), chk = gf(), num = gf(),
	      den = gf(), den2 = gf(), den4 = gf(),
	      den6 = gf();

	  set25519(r[2], gf1);
	  unpack25519(r[1], p);
	  S(num, r[1]);
	  M(den, num, D);
	  Z(num, num, r[2]);
	  A(den, r[2], den);

	  S(den2, den);
	  S(den4, den2);
	  M(den6, den4, den2);
	  M(t, den6, num);
	  M(t, t, den);

	  pow2523(t, t);
	  M(t, t, num);
	  M(t, t, den);
	  M(t, t, den);
	  M(r[0], t, den);

	  S(chk, r[0]);
	  M(chk, chk, den);
	  if (neq25519(chk, num)) M(r[0], r[0], I);

	  S(chk, r[0]);
	  M(chk, chk, den);
	  if (neq25519(chk, num)) return -1;

	  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

	  M(r[3], r[0], r[1]);
	  return 0;
	}

	function crypto_sign_open(m, sm, n, pk) {
	  var i, mlen;
	  var t = new Uint8Array(32), h = new Uint8Array(64);
	  var p = [gf(), gf(), gf(), gf()],
	      q = [gf(), gf(), gf(), gf()];

	  mlen = -1;
	  if (n < 64) return -1;

	  if (unpackneg(q, pk)) return -1;

	  for (i = 0; i < n; i++) m[i] = sm[i];
	  for (i = 0; i < 32; i++) m[i+32] = pk[i];
	  crypto_hash(h, m, n);
	  reduce(h);
	  scalarmult(p, q, h);

	  scalarbase(q, sm.subarray(32));
	  add(p, q);
	  pack(t, p);

	  n -= 64;
	  if (crypto_verify_32(sm, 0, t, 0)) {
	    for (i = 0; i < n; i++) m[i] = 0;
	    return -1;
	  }

	  for (i = 0; i < n; i++) m[i] = sm[i + 64];
	  mlen = n;
	  return mlen;
	}

	var crypto_secretbox_KEYBYTES = 32,
	    crypto_secretbox_NONCEBYTES = 24,
	    crypto_secretbox_ZEROBYTES = 32,
	    crypto_secretbox_BOXZEROBYTES = 16,
	    crypto_scalarmult_BYTES = 32,
	    crypto_scalarmult_SCALARBYTES = 32,
	    crypto_box_PUBLICKEYBYTES = 32,
	    crypto_box_SECRETKEYBYTES = 32,
	    crypto_box_BEFORENMBYTES = 32,
	    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
	    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
	    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
	    crypto_sign_BYTES = 64,
	    crypto_sign_PUBLICKEYBYTES = 32,
	    crypto_sign_SECRETKEYBYTES = 64,
	    crypto_sign_SEEDBYTES = 32,
	    crypto_hash_BYTES = 64;

	nacl.lowlevel = {
	  crypto_core_hsalsa20: crypto_core_hsalsa20,
	  crypto_stream_xor: crypto_stream_xor,
	  crypto_stream: crypto_stream,
	  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
	  crypto_stream_salsa20: crypto_stream_salsa20,
	  crypto_onetimeauth: crypto_onetimeauth,
	  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
	  crypto_verify_16: crypto_verify_16,
	  crypto_verify_32: crypto_verify_32,
	  crypto_secretbox: crypto_secretbox,
	  crypto_secretbox_open: crypto_secretbox_open,
	  crypto_scalarmult: crypto_scalarmult,
	  crypto_scalarmult_base: crypto_scalarmult_base,
	  crypto_box_beforenm: crypto_box_beforenm,
	  crypto_box_afternm: crypto_box_afternm,
	  crypto_box: crypto_box,
	  crypto_box_open: crypto_box_open,
	  crypto_box_keypair: crypto_box_keypair,
	  crypto_hash: crypto_hash,
	  crypto_sign: crypto_sign,
	  crypto_sign_keypair: crypto_sign_keypair,
	  crypto_sign_open: crypto_sign_open,

	  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
	  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
	  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
	  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
	  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
	  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
	  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
	  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
	  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
	  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
	  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
	  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
	  crypto_sign_BYTES: crypto_sign_BYTES,
	  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
	  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
	  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
	  crypto_hash_BYTES: crypto_hash_BYTES
	};

	/* High-level API */

	function checkLengths(k, n) {
	  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
	  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
	}

	function checkBoxLengths(pk, sk) {
	  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
	  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
	}

	function checkArrayTypes() {
	  for (var i = 0; i < arguments.length; i++) {
	    if (!(arguments[i] instanceof Uint8Array))
	      throw new TypeError('unexpected type, use Uint8Array');
	  }
	}

	function cleanup(arr) {
	  for (var i = 0; i < arr.length; i++) arr[i] = 0;
	}

	nacl.randomBytes = function(n) {
	  var b = new Uint8Array(n);
	  randombytes(b, n);
	  return b;
	};

	nacl.secretbox = function(msg, nonce, key) {
	  checkArrayTypes(msg, nonce, key);
	  checkLengths(key, nonce);
	  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
	  var c = new Uint8Array(m.length);
	  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
	  crypto_secretbox(c, m, m.length, nonce, key);
	  return c.subarray(crypto_secretbox_BOXZEROBYTES);
	};

	nacl.secretbox.open = function(box, nonce, key) {
	  checkArrayTypes(box, nonce, key);
	  checkLengths(key, nonce);
	  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
	  var m = new Uint8Array(c.length);
	  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
	  if (c.length < 32) return null;
	  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
	  return m.subarray(crypto_secretbox_ZEROBYTES);
	};

	nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
	nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
	nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

	nacl.scalarMult = function(n, p) {
	  checkArrayTypes(n, p);
	  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
	  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
	  var q = new Uint8Array(crypto_scalarmult_BYTES);
	  crypto_scalarmult(q, n, p);
	  return q;
	};

	nacl.scalarMult.base = function(n) {
	  checkArrayTypes(n);
	  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
	  var q = new Uint8Array(crypto_scalarmult_BYTES);
	  crypto_scalarmult_base(q, n);
	  return q;
	};

	nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
	nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

	nacl.box = function(msg, nonce, publicKey, secretKey) {
	  var k = nacl.box.before(publicKey, secretKey);
	  return nacl.secretbox(msg, nonce, k);
	};

	nacl.box.before = function(publicKey, secretKey) {
	  checkArrayTypes(publicKey, secretKey);
	  checkBoxLengths(publicKey, secretKey);
	  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
	  crypto_box_beforenm(k, publicKey, secretKey);
	  return k;
	};

	nacl.box.after = nacl.secretbox;

	nacl.box.open = function(msg, nonce, publicKey, secretKey) {
	  var k = nacl.box.before(publicKey, secretKey);
	  return nacl.secretbox.open(msg, nonce, k);
	};

	nacl.box.open.after = nacl.secretbox.open;

	nacl.box.keyPair = function() {
	  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
	  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
	  crypto_box_keypair(pk, sk);
	  return {publicKey: pk, secretKey: sk};
	};

	nacl.box.keyPair.fromSecretKey = function(secretKey) {
	  checkArrayTypes(secretKey);
	  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
	    throw new Error('bad secret key size');
	  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
	  crypto_scalarmult_base(pk, secretKey);
	  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
	};

	nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
	nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
	nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
	nacl.box.nonceLength = crypto_box_NONCEBYTES;
	nacl.box.overheadLength = nacl.secretbox.overheadLength;

	nacl.sign = function(msg, secretKey) {
	  checkArrayTypes(msg, secretKey);
	  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
	    throw new Error('bad secret key size');
	  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
	  crypto_sign(signedMsg, msg, msg.length, secretKey);
	  return signedMsg;
	};

	nacl.sign.open = function(signedMsg, publicKey) {
	  checkArrayTypes(signedMsg, publicKey);
	  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
	    throw new Error('bad public key size');
	  var tmp = new Uint8Array(signedMsg.length);
	  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
	  if (mlen < 0) return null;
	  var m = new Uint8Array(mlen);
	  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
	  return m;
	};

	nacl.sign.detached = function(msg, secretKey) {
	  var signedMsg = nacl.sign(msg, secretKey);
	  var sig = new Uint8Array(crypto_sign_BYTES);
	  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
	  return sig;
	};

	nacl.sign.detached.verify = function(msg, sig, publicKey) {
	  checkArrayTypes(msg, sig, publicKey);
	  if (sig.length !== crypto_sign_BYTES)
	    throw new Error('bad signature size');
	  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
	    throw new Error('bad public key size');
	  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
	  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
	  var i;
	  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
	  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
	  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
	};

	nacl.sign.keyPair = function() {
	  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
	  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
	  crypto_sign_keypair(pk, sk);
	  return {publicKey: pk, secretKey: sk};
	};

	nacl.sign.keyPair.fromSecretKey = function(secretKey) {
	  checkArrayTypes(secretKey);
	  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
	    throw new Error('bad secret key size');
	  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
	  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
	  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
	};

	nacl.sign.keyPair.fromSeed = function(seed) {
	  checkArrayTypes(seed);
	  if (seed.length !== crypto_sign_SEEDBYTES)
	    throw new Error('bad seed size');
	  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
	  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
	  for (var i = 0; i < 32; i++) sk[i] = seed[i];
	  crypto_sign_keypair(pk, sk, true);
	  return {publicKey: pk, secretKey: sk};
	};

	nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
	nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
	nacl.sign.seedLength = crypto_sign_SEEDBYTES;
	nacl.sign.signatureLength = crypto_sign_BYTES;

	nacl.hash = function(msg) {
	  checkArrayTypes(msg);
	  var h = new Uint8Array(crypto_hash_BYTES);
	  crypto_hash(h, msg, msg.length);
	  return h;
	};

	nacl.hash.hashLength = crypto_hash_BYTES;

	nacl.verify = function(x, y) {
	  checkArrayTypes(x, y);
	  // Zero length arguments are considered not equal.
	  if (x.length === 0 || y.length === 0) return false;
	  if (x.length !== y.length) return false;
	  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
	};

	nacl.setPRNG = function(fn) {
	  randombytes = fn;
	};

	(function() {
	  // Initialize PRNG if environment provides CSPRNG.
	  // If not, methods calling randombytes will throw.
	  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
	  if (crypto && crypto.getRandomValues) {
	    // Browsers.
	    var QUOTA = 65536;
	    nacl.setPRNG(function(x, n) {
	      var i, v = new Uint8Array(n);
	      for (i = 0; i < n; i += QUOTA) {
	        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
	      }
	      for (i = 0; i < n; i++) x[i] = v[i];
	      cleanup(v);
	    });
	  } else if (true) {
	    // Node.js.
	    crypto = __webpack_require__(20);
	    if (crypto && crypto.randomBytes) {
	      nacl.setPRNG(function(x, n) {
	        var i, v = crypto.randomBytes(n);
	        for (i = 0; i < n; i++) x[i] = v[i];
	        cleanup(v);
	      });
	    }
	  }
	})();

	})(typeof module !== 'undefined' && module.exports ? module.exports : (self.nacl = self.nacl || {}));


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Keypair = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tweetnacl = __webpack_require__(19);

	var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

	var _network = __webpack_require__(22);

	var _signing = __webpack_require__(18);

	var _base = __webpack_require__(23);

	var base58 = _interopRequireWildcard(_base);

	var _strkey = __webpack_require__(27);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _hashing = __webpack_require__(2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * `Keypair` represents public (and secret) keys of the account.
	 *
	 * Currently `Keypair` only supports ed25519 but in a future this class can be abstraction layer for other
	 * public-key signature systems.
	 *
	 * Use more convenient methods to create `Keypair` object:
	 * * `{@link Keypair.fromPublicKey}`
	 * * `{@link Keypair.fromSecret}`
	 * * `{@link Keypair.random}`
	 *
	 * @constructor
	 * @param {object} keys At least one of keys must be provided.
	 * @param {string} keys.type Public-key signature system name. (currently only `ed25519` keys are supported)
	 * @param {Buffer} [keys.publicKey] Raw public key
	 * @param {Buffer} [keys.secretKey] Raw secret key (32-byte secret seed in ed25519`)
	 */
	var Keypair = exports.Keypair = function () {
	  function Keypair(keys) {
	    _classCallCheck(this, Keypair);

	    if (keys.type !== 'ed25519') {
	      throw new Error('Invalid keys type');
	    }

	    this.type = keys.type;

	    if (keys.secretKey) {
	      keys.secretKey = Buffer.from(keys.secretKey);

	      if (keys.secretKey.length !== 32) {
	        throw new Error('secretKey length is invalid');
	      }

	      this._secretSeed = keys.secretKey;
	      this._publicKey = (0, _signing.generate)(keys.secretKey);
	      this._secretKey = Buffer.concat([keys.secretKey, this._publicKey]);

	      if (keys.publicKey && !this._publicKey.equals(Buffer.from(keys.publicKey))) {
	        throw new Error('secretKey does not match publicKey');
	      }
	    } else {
	      this._publicKey = Buffer.from(keys.publicKey);

	      if (this._publicKey.length !== 32) {
	        throw new Error('publicKey length is invalid');
	      }
	    }
	  }

	  /**
	   * Creates a new `Keypair` instance from secret. This can either be secret key or secret seed depending
	   * on underlying public-key signature system. Currently `Keypair` only supports ed25519.
	   * @param {string} secret secret key (ex. `SDAKFNYEIAORZKKCYRILFQKLLOCNPL5SWJ3YY5NM3ZH6GJSZGXHZEPQS`)
	   * @returns {Keypair}
	   */


	  _createClass(Keypair, [{
	    key: 'xdrAccountId',
	    value: function xdrAccountId() {
	      return new _stellarXdr_generated2.default.AccountId.publicKeyTypeEd25519(this._publicKey);
	    }
	  }, {
	    key: 'xdrPublicKey',
	    value: function xdrPublicKey() {
	      return new _stellarXdr_generated2.default.PublicKey.publicKeyTypeEd25519(this._publicKey);
	    }

	    /**
	     * Returns raw public key
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'rawPublicKey',
	    value: function rawPublicKey() {
	      return this._publicKey;
	    }
	  }, {
	    key: 'signatureHint',
	    value: function signatureHint() {
	      var a = this.xdrAccountId().toXDR();

	      return a.slice(a.length - 4);
	    }

	    /**
	     * Returns public key associated with this `Keypair` object.
	     * @returns {string}
	     */

	  }, {
	    key: 'publicKey',
	    value: function publicKey() {
	      return _strkey.StrKey.encodeEd25519PublicKey(this._publicKey);
	    }

	    /**
	     * Returns secret key associated with this `Keypair` object
	     * @returns {string}
	     */

	  }, {
	    key: 'secret',
	    value: function secret() {
	      if (!this._secretSeed) {
	        throw new Error('no secret key available');
	      }

	      if (this.type === 'ed25519') {
	        return _strkey.StrKey.encodeEd25519SecretSeed(this._secretSeed);
	      }

	      throw new Error('Invalid Keypair type');
	    }

	    /**
	     * Returns raw secret key.
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'rawSecretKey',
	    value: function rawSecretKey() {
	      return this._secretSeed;
	    }

	    /**
	     * Returns `true` if this `Keypair` object contains secret key and can sign.
	     * @returns {boolean}
	     */

	  }, {
	    key: 'canSign',
	    value: function canSign() {
	      return !!this._secretKey;
	    }

	    /**
	     * Signs data.
	     * @param {Buffer} data Data to sign
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'sign',
	    value: function sign(data) {
	      if (!this.canSign()) {
	        throw new Error('cannot sign: no secret key available');
	      }

	      return (0, _signing.sign)(data, this._secretKey);
	    }

	    /**
	     * Verifies if `signature` for `data` is valid.
	     * @param {Buffer} data Signed data
	     * @param {Buffer} signature Signature
	     * @returns {boolean}
	     */

	  }, {
	    key: 'verify',
	    value: function verify(data, signature) {
	      return (0, _signing.verify)(data, signature, this._publicKey);
	    }
	  }, {
	    key: 'signDecorated',
	    value: function signDecorated(data) {
	      var signature = this.sign(data);
	      var hint = this.signatureHint();

	      return new _stellarXdr_generated2.default.DecoratedSignature({ hint: hint, signature: signature });
	    }
	  }], [{
	    key: 'fromSecret',
	    value: function fromSecret(secret) {
	      var rawSecret = _strkey.StrKey.decodeEd25519SecretSeed(secret);
	      return this.fromRawEd25519Seed(rawSecret);
	    }

	    /**
	     * Base58 address encoding is **DEPRECATED**! Use this method only for transition to strkey encoding.
	     * @param {string} seed Base58 secret seed
	     * @deprecated Use {@link Keypair.fromSecret}
	     * @returns {Keypair}
	     */

	  }, {
	    key: 'fromBase58Seed',
	    value: function fromBase58Seed(seed) {
	      var rawSeed = base58.decodeBase58Check('seed', seed);
	      return this.fromRawEd25519Seed(rawSeed);
	    }

	    /**
	     * Creates a new `Keypair` object from ed25519 secret key seed raw bytes.
	     *
	     * @param {Buffer} rawSeed Raw 32-byte ed25519 secret key seed
	     * @returns {Keypair}
	     */

	  }, {
	    key: 'fromRawEd25519Seed',
	    value: function fromRawEd25519Seed(rawSeed) {
	      return new this({ type: 'ed25519', secretKey: rawSeed });
	    }

	    /**
	     * Returns `Keypair` object representing network master key.
	     * @param {string} [networkPassphrase] passphrase of the target stellar network (e.g. "Public Global Stellar Network ; September 2015").
	     * @returns {Keypair}
	     */

	  }, {
	    key: 'master',
	    value: function master(networkPassphrase) {
	      // Deprecation warning. TODO: remove optionality with next major release.
	      if (!networkPassphrase) {
	        console.warn('Global `Network.current()` is deprecated. Please pass explicit argument instead, e.g. `Keypair.master(Networks.PUBLIC)` (see https://git.io/fj9fG for more info).');
	        if (_network.Network.current() === null) {
	          throw new Error('No network selected. Please pass a network argument, e.g. `Keypair.master(Networks.PUBLIC)`.');
	        }
	        networkPassphrase = _network.Network.current().networkPassphrase();
	      }
	      return this.fromRawEd25519Seed((0, _hashing.hash)(networkPassphrase));
	    }

	    /**
	     * Creates a new `Keypair` object from public key.
	     * @param {string} publicKey public key (ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`)
	     * @returns {Keypair}
	     */

	  }, {
	    key: 'fromPublicKey',
	    value: function fromPublicKey(publicKey) {
	      publicKey = _strkey.StrKey.decodeEd25519PublicKey(publicKey);
	      if (publicKey.length !== 32) {
	        throw new Error('Invalid Stellar public key');
	      }
	      return new this({ type: 'ed25519', publicKey: publicKey });
	    }

	    /**
	     * Create a random `Keypair` object.
	     * @returns {Keypair}
	     */

	  }, {
	    key: 'random',
	    value: function random() {
	      var secret = _tweetnacl2.default.randomBytes(32);
	      return this.fromRawEd25519Seed(secret);
	    }
	  }]);

	  return Keypair;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Network = exports.Networks = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _hashing = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Contains passphrases for common networks:
	 * * `Networks.PUBLIC`: `Public Global Stellar Network ; September 2015`
	 * * `Networks.TESTNET`: `Test SDF Network ; September 2015`
	 * @type {{PUBLIC: string, TESTNET: string}}
	 */
	var Networks = exports.Networks = {
	  PUBLIC: 'Public Global Stellar Network ; September 2015',
	  TESTNET: 'Test SDF Network ; September 2015'
	};

	var _current = null;

	/**
	 * The Network class provides helper methods to get the passphrase or id for different
	 * stellar networks.  It also provides the {@link Network.current} class method that returns the network
	 * that will be used by this process for the purposes of generating signatures.
	 *
	 * You should select network your app will use before adding the first signature. You can use the `use`,
	 * `usePublicNetwork` and `useTestNetwork` helper methods.
	 *
	 * Creates a new `Network` object.
	 * @constructor
	 * @param {string} networkPassphrase Network passphrase
	 * @deprecated
	 */

	var Network = exports.Network = function () {
	  function Network(networkPassphrase) {
	    _classCallCheck(this, Network);

	    this._networkPassphrase = networkPassphrase;
	  }

	  /**
	   * Use Stellar Public Network
	   * @returns {void}
	   */


	  _createClass(Network, [{
	    key: 'networkPassphrase',


	    /**
	     * @returns {string} Network passphrase
	     */
	    value: function networkPassphrase() {
	      return this._networkPassphrase;
	    }

	    /**
	     * @returns {string} Network ID (SHA-256 hash of network passphrase)
	     */

	  }, {
	    key: 'networkId',
	    value: function networkId() {
	      return (0, _hashing.hash)(this.networkPassphrase());
	    }
	  }], [{
	    key: 'usePublicNetwork',
	    value: function usePublicNetwork() {
	      this.use(new Network(Networks.PUBLIC));
	    }

	    /**
	     * Use test network.
	     * @returns {void}
	     */

	  }, {
	    key: 'useTestNetwork',
	    value: function useTestNetwork() {
	      this.use(new Network(Networks.TESTNET));
	    }

	    /**
	     * Use network defined by Network object.
	     * @param {Network} network Network to use
	     * @returns {void}
	     */

	  }, {
	    key: 'use',
	    value: function use(network) {
	      console.warn('Global class `Network` is deprecated. Please pass explicit argument instead, e.g. `new Transaction(envelope, Networks.PUBLIC)` (see https://git.io/fj9fG for more info).');

	      _current = network;
	    }

	    /**
	     * @returns {Network} Currently selected network
	     */

	  }, {
	    key: 'current',
	    value: function current() {
	      return _current;
	    }
	  }]);

	  return Network;
	}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decodeBase58Check = decodeBase58Check;

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _bs = __webpack_require__(25);

	var _bs2 = _interopRequireDefault(_bs);

	var _hashing = __webpack_require__(2);

	var _checksum = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var versionBytes = {
	  accountId: 0x00, // decimal 0
	  none: 0x01, // decimal 1
	  seed: 0x21 // decimal 33
	};

	function decodeBase58Check(versionByteName, encoded) {
	  var decoded = _bs2.default.decode(encoded);
	  var versionByte = decoded[0];
	  var payload = decoded.slice(0, decoded.length - 4);
	  var data = payload.slice(1);
	  var checksum = decoded.slice(decoded.length - 4);

	  var expectedVersion = versionBytes[versionByteName];

	  if ((0, _isUndefined2.default)(expectedVersion)) {
	    throw new Error(versionByteName + ' is not a valid version byte name.  expected one of "accountId", "seed", or "none"');
	  }

	  if (versionByte !== expectedVersion) {
	    throw new Error('invalid version byte.  expected ' + expectedVersion + ', got ' + versionByte);
	  }

	  var expectedChecksum = calculateChecksum(payload);

	  if (!(0, _checksum.verifyChecksum)(expectedChecksum, checksum)) {
	    throw new Error('invalid checksum');
	  }

	  if (versionByteName === 'accountId' && decoded.length !== 37) {
	    throw new Error('Decoded address length is invalid. Expected 37, got ' + decoded.length);
	  }

	  return Buffer.from(data);
	}

	function calculateChecksum(payload) {
	  var inner = (0, _hashing.hash)(payload);
	  var outer = (0, _hashing.hash)(inner);
	  return outer.slice(0, 4);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}

	module.exports = isUndefined;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';

	// vendored from http://cryptocoinjs.com/modules/misc/bs58/

	// Base58 encoding/decoding
	// Originally written by Mike Hearn for BitcoinJ
	// Copyright (c) 2011 Google Inc
	// Ported to JavaScript by Stefan Thomas
	// Merged Buffer refactorings from base58-native by Stephen Pair
	// Copyright (c) 2013 BitPay Inc

	var ALPHABET = 'gsphnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCr65jkm8oFqi1tuvAxyz';
	var ALPHABET_MAP = {};
	for (var i = 0; i < ALPHABET.length; ++i) {
	  ALPHABET_MAP[ALPHABET.charAt(i)] = i;
	}
	var BASE = 58;

	function decode(string) {
	  if (string.length === 0) return [];

	  var i,
	      j,
	      bytes = [0];
	  for (i = 0; i < string.length; ++i) {
	    var c = string[i];
	    if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');

	    for (j = 0; j < bytes.length; ++j) {
	      bytes[j] *= BASE;
	    }bytes[0] += ALPHABET_MAP[c];

	    var carry = 0;
	    for (j = 0; j < bytes.length; ++j) {
	      bytes[j] += carry;

	      carry = bytes[j] >> 8;
	      bytes[j] &= 0xff;
	    }

	    while (carry) {
	      bytes.push(carry & 0xff);

	      carry >>= 8;
	    }
	  }

	  // deal with leading zeros
	  for (i = 0; string[i] === 'g' && i < string.length - 1; ++i) {
	    bytes.push(0);
	  }return bytes.reverse();
	}

	module.exports = { decode: decode };

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.verifyChecksum = verifyChecksum;
	function verifyChecksum(expected, actual) {
	  if (expected.length !== actual.length) {
	    return false;
	  }

	  if (expected.length === 0) {
	    return true;
	  }

	  for (var i = 0; i < expected.length; i += 1) {
	    if (expected[i] !== actual[i]) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StrKey = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-bitwise */

	exports.decodeCheck = decodeCheck;
	exports.encodeCheck = encodeCheck;

	var _base = __webpack_require__(28);

	var _base2 = _interopRequireDefault(_base);

	var _crc = __webpack_require__(29);

	var _crc2 = _interopRequireDefault(_crc);

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _isNull = __webpack_require__(54);

	var _isNull2 = _interopRequireDefault(_isNull);

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _checksum = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var versionBytes = {
	  ed25519PublicKey: 6 << 3, // G
	  ed25519SecretSeed: 18 << 3, // S
	  preAuthTx: 19 << 3, // T
	  sha256Hash: 23 << 3 // X
	};

	/**
	 * StrKey is a helper class that allows encoding and decoding strkey.
	 */

	var StrKey = exports.StrKey = function () {
	  function StrKey() {
	    _classCallCheck(this, StrKey);
	  }

	  _createClass(StrKey, null, [{
	    key: 'encodeEd25519PublicKey',

	    /**
	     * Encodes data to strkey ed25519 public key.
	     * @param {Buffer} data data to encode
	     * @returns {string}
	     */
	    value: function encodeEd25519PublicKey(data) {
	      return encodeCheck('ed25519PublicKey', data);
	    }

	    /**
	     * Decodes strkey ed25519 public key to raw data.
	     * @param {string} data data to decode
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'decodeEd25519PublicKey',
	    value: function decodeEd25519PublicKey(data) {
	      return decodeCheck('ed25519PublicKey', data);
	    }

	    /**
	     * Returns true if the given Stellar public key is a valid ed25519 public key.
	     * @param {string} publicKey public key to check
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isValidEd25519PublicKey',
	    value: function isValidEd25519PublicKey(publicKey) {
	      return isValid('ed25519PublicKey', publicKey);
	    }

	    /**
	     * Encodes data to strkey ed25519 seed.
	     * @param {Buffer} data data to encode
	     * @returns {string}
	     */

	  }, {
	    key: 'encodeEd25519SecretSeed',
	    value: function encodeEd25519SecretSeed(data) {
	      return encodeCheck('ed25519SecretSeed', data);
	    }

	    /**
	     * Decodes strkey ed25519 seed to raw data.
	     * @param {string} data data to decode
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'decodeEd25519SecretSeed',
	    value: function decodeEd25519SecretSeed(data) {
	      return decodeCheck('ed25519SecretSeed', data);
	    }

	    /**
	     * Returns true if the given Stellar secret key is a valid ed25519 secret seed.
	     * @param {string} seed seed to check
	     * @returns {boolean}
	     */

	  }, {
	    key: 'isValidEd25519SecretSeed',
	    value: function isValidEd25519SecretSeed(seed) {
	      return isValid('ed25519SecretSeed', seed);
	    }

	    /**
	     * Encodes data to strkey preAuthTx.
	     * @param {Buffer} data data to encode
	     * @returns {string}
	     */

	  }, {
	    key: 'encodePreAuthTx',
	    value: function encodePreAuthTx(data) {
	      return encodeCheck('preAuthTx', data);
	    }

	    /**
	     * Decodes strkey PreAuthTx to raw data.
	     * @param {string} data data to decode
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'decodePreAuthTx',
	    value: function decodePreAuthTx(data) {
	      return decodeCheck('preAuthTx', data);
	    }

	    /**
	     * Encodes data to strkey sha256 hash.
	     * @param {Buffer} data data to encode
	     * @returns {string}
	     */

	  }, {
	    key: 'encodeSha256Hash',
	    value: function encodeSha256Hash(data) {
	      return encodeCheck('sha256Hash', data);
	    }

	    /**
	     * Decodes strkey sha256 hash to raw data.
	     * @param {string} data data to decode
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'decodeSha256Hash',
	    value: function decodeSha256Hash(data) {
	      return decodeCheck('sha256Hash', data);
	    }
	  }]);

	  return StrKey;
	}();

	function isValid(versionByteName, encoded) {
	  if (encoded && encoded.length !== 56) {
	    return false;
	  }

	  try {
	    var decoded = decodeCheck(versionByteName, encoded);
	    if (decoded.length !== 32) {
	      return false;
	    }
	  } catch (err) {
	    return false;
	  }
	  return true;
	}

	function decodeCheck(versionByteName, encoded) {
	  if (!(0, _isString2.default)(encoded)) {
	    throw new TypeError('encoded argument must be of type String');
	  }

	  var decoded = _base2.default.decode(encoded);
	  var versionByte = decoded[0];
	  var payload = decoded.slice(0, -2);
	  var data = payload.slice(1);
	  var checksum = decoded.slice(-2);

	  if (encoded !== _base2.default.encode(decoded)) {
	    throw new Error('invalid encoded string');
	  }

	  var expectedVersion = versionBytes[versionByteName];

	  if ((0, _isUndefined2.default)(expectedVersion)) {
	    throw new Error(versionByteName + ' is not a valid version byte name.  expected one of "accountId" or "seed"');
	  }

	  if (versionByte !== expectedVersion) {
	    throw new Error('invalid version byte. expected ' + expectedVersion + ', got ' + versionByte);
	  }

	  var expectedChecksum = calculateChecksum(payload);

	  if (!(0, _checksum.verifyChecksum)(expectedChecksum, checksum)) {
	    throw new Error('invalid checksum');
	  }

	  return Buffer.from(data);
	}

	function encodeCheck(versionByteName, data) {
	  if ((0, _isNull2.default)(data) || (0, _isUndefined2.default)(data)) {
	    throw new Error('cannot encode null data');
	  }

	  var versionByte = versionBytes[versionByteName];

	  if ((0, _isUndefined2.default)(versionByte)) {
	    throw new Error(versionByteName + ' is not a valid version byte name.  expected one of "ed25519PublicKey", "ed25519SecretSeed", "preAuthTx", "sha256Hash"');
	  }

	  data = Buffer.from(data);
	  var versionBuffer = Buffer.from([versionByte]);
	  var payload = Buffer.concat([versionBuffer, data]);
	  var checksum = calculateChecksum(payload);
	  var unencoded = Buffer.concat([payload, checksum]);

	  return _base2.default.encode(unencoded);
	}

	function calculateChecksum(payload) {
	  // This code calculates CRC16-XModem checksum of payload
	  // and returns it as Buffer in little-endian order.
	  var checksum = Buffer.alloc(2);
	  checksum.writeUInt16LE(_crc2.default.crc16xmodem(payload), 0);
	  return checksum;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Generate a character map.
	 * @param {string} alphabet e.g. "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
	 * @param {object} mappings map overrides from key to value
	 * @method
	 */

	var charmap = function (alphabet, mappings) {
	  mappings || (mappings = {});
	  alphabet.split("").forEach(function (c, i) {
	    if (!(c in mappings)) mappings[c] = i;
	  });
	  return mappings;
	}

	/**
	 * The RFC 4648 base 32 alphabet and character map.
	 * @see {@link https://tools.ietf.org/html/rfc4648}
	 */

	var rfc4648 = {
	  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
	  charmap: {
	    0: 14,
	    1: 8
	  }
	};

	rfc4648.charmap = charmap(rfc4648.alphabet, rfc4648.charmap);

	/**
	 * The Crockford base 32 alphabet and character map.
	 * @see {@link http://www.crockford.com/wrmg/base32.html}
	 */

	var crockford = {
	  alphabet: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
	  charmap: {
	    O: 0,
	    I: 1,
	    L: 1
	  }
	};

	crockford.charmap = charmap(crockford.alphabet, crockford.charmap);

	/**
	 * base32hex
	 * @see {@link https://en.wikipedia.org/wiki/Base32#base32hex}
	 */

	var base32hex = {
	  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
	  charmap: {}
	};

	base32hex.charmap = charmap(base32hex.alphabet, base32hex.charmap);

	/**
	 * Create a new `Decoder` with the given options.
	 *
	 * @param {object} [options]
	 *   @param {string} [type] Supported Base-32 variants are "rfc4648" and
	 *     "crockford".
	 *   @param {object} [charmap] Override the character map used in decoding.
	 * @constructor
	 */

	function Decoder (options) {
	  this.buf = [];
	  this.shift = 8;
	  this.carry = 0;

	  if (options) {

	    switch (options.type) {
	      case "rfc4648":
	        this.charmap = exports.rfc4648.charmap;
	        break;
	      case "crockford":
	        this.charmap = exports.crockford.charmap;
	        break;
	      case "base32hex":
	        this.charmap = exports.base32hex.charmap;
	        break;
	      default:
	        throw new Error("invalid type");
	    }

	    if (options.charmap) this.charmap = options.charmap;
	  }
	}

	/**
	 * The default character map coresponds to RFC4648.
	 */

	Decoder.prototype.charmap = rfc4648.charmap;

	/**
	 * Decode a string, continuing from the previous state.
	 *
	 * @param {string} str
	 * @return {Decoder} this
	 */

	Decoder.prototype.write = function (str) {
	  var charmap = this.charmap;
	  var buf = this.buf;
	  var shift = this.shift;
	  var carry = this.carry;

	  // decode string
	  str.toUpperCase().split("").forEach(function (char) {

	    // ignore padding
	    if (char == "=") return;

	    // lookup symbol
	    var symbol = charmap[char] & 0xff;

	    // 1: 00000 000
	    // 2:          00 00000 0
	    // 3:                    0000 0000
	    // 4:                             0 00000 00
	    // 5:                                       000 00000
	    // 6:                                                00000 000
	    // 7:                                                         00 00000 0

	    shift -= 5;
	    if (shift > 0) {
	      carry |= symbol << shift;
	    } else if (shift < 0) {
	      buf.push(carry | (symbol >> -shift));
	      shift += 8;
	      carry = (symbol << shift) & 0xff;
	    } else {
	      buf.push(carry | symbol);
	      shift = 8;
	      carry = 0;
	    }
	  });

	  // save state
	  this.shift = shift;
	  this.carry = carry;

	  // for chaining
	  return this;
	};

	/**
	 * Finish decoding.
	 *
	 * @param {string} [str] The final string to decode.
	 * @return {Array} Decoded byte array.
	 */

	Decoder.prototype.finalize = function (str) {
	  if (str) {
	    this.write(str);
	  }
	  if (this.shift !== 8 && this.carry !== 0) {
	    this.buf.push(this.carry);
	    this.shift = 8;
	    this.carry = 0;
	  }
	  return this.buf;
	};

	/**
	 * Create a new `Encoder` with the given options.
	 *
	 * @param {object} [options]
	 *   @param {string} [type] Supported Base-32 variants are "rfc4648" and
	 *     "crockford".
	 *   @param {object} [alphabet] Override the alphabet used in encoding.
	 * @constructor
	 */

	function Encoder (options) {
	  this.buf = "";
	  this.shift = 3;
	  this.carry = 0;

	  if (options) {

	    switch (options.type) {
	      case "rfc4648":
	        this.alphabet = exports.rfc4648.alphabet;
	        break;
	      case "crockford":
	        this.alphabet = exports.crockford.alphabet;
	        break;
	      case "base32hex":
	        this.alphabet = exports.base32hex.alphabet;
	        break;
	      default:
	        throw new Error("invalid type");
	    }

	    if (options.alphabet) this.alphabet = options.alphabet;
	    else if (options.lc) this.alphabet = this.alphabet.toLowerCase();
	  }
	}

	/**
	 * The default alphabet coresponds to RFC4648.
	 */

	Encoder.prototype.alphabet = rfc4648.alphabet;

	/**
	 * Encode a byte array, continuing from the previous state.
	 *
	 * @param {byte[]} buf The byte array to encode.
	 * @return {Encoder} this
	 */

	Encoder.prototype.write = function (buf) {
	  var shift = this.shift;
	  var carry = this.carry;
	  var symbol;
	  var byte;
	  var i;

	  // encode each byte in buf
	  for (i = 0; i < buf.length; i++) {
	    byte = buf[i];

	    // 1: 00000 000
	    // 2:          00 00000 0
	    // 3:                    0000 0000
	    // 4:                             0 00000 00
	    // 5:                                       000 00000
	    // 6:                                                00000 000
	    // 7:                                                         00 00000 0

	    symbol = carry | (byte >> shift);
	    this.buf += this.alphabet[symbol & 0x1f];

	    if (shift > 5) {
	      shift -= 5;
	      symbol = byte >> shift;
	      this.buf += this.alphabet[symbol & 0x1f];
	    }

	    shift = 5 - shift;
	    carry = byte << shift;
	    shift = 8 - shift;
	  }

	  // save state
	  this.shift = shift;
	  this.carry = carry;

	  // for chaining
	  return this;
	};

	/**
	 * Finish encoding.
	 *
	 * @param {byte[]} [buf] The final byte array to encode.
	 * @return {string} The encoded byte array.
	 */

	Encoder.prototype.finalize = function (buf) {
	  if (buf) {
	    this.write(buf);
	  }
	  if (this.shift !== 3) {
	    this.buf += this.alphabet[this.carry & 0x1f];
	    this.shift = 3;
	    this.carry = 0;
	  }
	  return this.buf;
	};

	/**
	 * Convenience encoder.
	 *
	 * @param {byte[]} buf The byte array to encode.
	 * @param {object} [options] Options to pass to the encoder.
	 * @return {string} The encoded string.
	 */

	exports.encode = function (buf, options) {
	  return new Encoder(options).finalize(buf);
	};

	/**
	 * Convenience decoder.
	 *
	 * @param {string} str The string to decode.
	 * @param {object} [options] Options to pass to the decoder.
	 * @return {byte[]} The decoded byte array.
	 */

	exports.decode = function (str, options) {
	  return new Decoder(options).finalize(str);
	};

	// Exports.
	exports.Decoder = Decoder;
	exports.Encoder = Encoder;
	exports.charmap = charmap;
	exports.crockford = crockford;
	exports.rfc4648 = rfc4648;
	exports.base32hex = base32hex;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  crc1: __webpack_require__(30),
	  crc8: __webpack_require__(34),
	  crc81wire: __webpack_require__(36),
	  crc16: __webpack_require__(38),
	  crc16ccitt: __webpack_require__(40),
	  crc16modbus: __webpack_require__(42),
	  crc16xmodem: __webpack_require__(44),
	  crc16kermit: __webpack_require__(46),
	  crc24: __webpack_require__(48),
	  crc32: __webpack_require__(50),
	  crcjam: __webpack_require__(52)
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(31).default;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var crc1 = (0, _define_crc2.default)('crc1', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = ~~previous;
	  var accum = 0;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    accum += byte;
	  }

	  crc += accum % 256;
	  return crc % 256;
	});

	exports.default = crc1;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var createBuffer = _buffer.Buffer.from && _buffer.Buffer.alloc && _buffer.Buffer.allocUnsafe && _buffer.Buffer.allocUnsafeSlow ? _buffer.Buffer.from : // support for Node < 5.10
	function (val) {
	  return new _buffer.Buffer(val);
	};

	exports.default = createBuffer;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (model, calc) {
	  var fn = function fn(buf, previous) {
	    return calc(buf, previous) >>> 0;
	  };
	  fn.signed = calc;
	  fn.unsigned = fn;
	  fn.model = model;

	  return fn;
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(35).default;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-driven --model=crc-8 --generate=c`
	// prettier-ignore
	var TABLE = [0x00, 0x07, 0x0e, 0x09, 0x1c, 0x1b, 0x12, 0x15, 0x38, 0x3f, 0x36, 0x31, 0x24, 0x23, 0x2a, 0x2d, 0x70, 0x77, 0x7e, 0x79, 0x6c, 0x6b, 0x62, 0x65, 0x48, 0x4f, 0x46, 0x41, 0x54, 0x53, 0x5a, 0x5d, 0xe0, 0xe7, 0xee, 0xe9, 0xfc, 0xfb, 0xf2, 0xf5, 0xd8, 0xdf, 0xd6, 0xd1, 0xc4, 0xc3, 0xca, 0xcd, 0x90, 0x97, 0x9e, 0x99, 0x8c, 0x8b, 0x82, 0x85, 0xa8, 0xaf, 0xa6, 0xa1, 0xb4, 0xb3, 0xba, 0xbd, 0xc7, 0xc0, 0xc9, 0xce, 0xdb, 0xdc, 0xd5, 0xd2, 0xff, 0xf8, 0xf1, 0xf6, 0xe3, 0xe4, 0xed, 0xea, 0xb7, 0xb0, 0xb9, 0xbe, 0xab, 0xac, 0xa5, 0xa2, 0x8f, 0x88, 0x81, 0x86, 0x93, 0x94, 0x9d, 0x9a, 0x27, 0x20, 0x29, 0x2e, 0x3b, 0x3c, 0x35, 0x32, 0x1f, 0x18, 0x11, 0x16, 0x03, 0x04, 0x0d, 0x0a, 0x57, 0x50, 0x59, 0x5e, 0x4b, 0x4c, 0x45, 0x42, 0x6f, 0x68, 0x61, 0x66, 0x73, 0x74, 0x7d, 0x7a, 0x89, 0x8e, 0x87, 0x80, 0x95, 0x92, 0x9b, 0x9c, 0xb1, 0xb6, 0xbf, 0xb8, 0xad, 0xaa, 0xa3, 0xa4, 0xf9, 0xfe, 0xf7, 0xf0, 0xe5, 0xe2, 0xeb, 0xec, 0xc1, 0xc6, 0xcf, 0xc8, 0xdd, 0xda, 0xd3, 0xd4, 0x69, 0x6e, 0x67, 0x60, 0x75, 0x72, 0x7b, 0x7c, 0x51, 0x56, 0x5f, 0x58, 0x4d, 0x4a, 0x43, 0x44, 0x19, 0x1e, 0x17, 0x10, 0x05, 0x02, 0x0b, 0x0c, 0x21, 0x26, 0x2f, 0x28, 0x3d, 0x3a, 0x33, 0x34, 0x4e, 0x49, 0x40, 0x47, 0x52, 0x55, 0x5c, 0x5b, 0x76, 0x71, 0x78, 0x7f, 0x6a, 0x6d, 0x64, 0x63, 0x3e, 0x39, 0x30, 0x37, 0x22, 0x25, 0x2c, 0x2b, 0x06, 0x01, 0x08, 0x0f, 0x1a, 0x1d, 0x14, 0x13, 0xae, 0xa9, 0xa0, 0xa7, 0xb2, 0xb5, 0xbc, 0xbb, 0x96, 0x91, 0x98, 0x9f, 0x8a, 0x8d, 0x84, 0x83, 0xde, 0xd9, 0xd0, 0xd7, 0xc2, 0xc5, 0xcc, 0xcb, 0xe6, 0xe1, 0xe8, 0xef, 0xfa, 0xfd, 0xf4, 0xf3];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crc8 = (0, _define_crc2.default)('crc-8', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = ~~previous;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = TABLE[(crc ^ byte) & 0xff] & 0xff;
	  }

	  return crc;
	});

	exports.default = crc8;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(37).default;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-driven --model=dallas-1-wire --generate=c`
	// prettier-ignore
	var TABLE = [0x00, 0x5e, 0xbc, 0xe2, 0x61, 0x3f, 0xdd, 0x83, 0xc2, 0x9c, 0x7e, 0x20, 0xa3, 0xfd, 0x1f, 0x41, 0x9d, 0xc3, 0x21, 0x7f, 0xfc, 0xa2, 0x40, 0x1e, 0x5f, 0x01, 0xe3, 0xbd, 0x3e, 0x60, 0x82, 0xdc, 0x23, 0x7d, 0x9f, 0xc1, 0x42, 0x1c, 0xfe, 0xa0, 0xe1, 0xbf, 0x5d, 0x03, 0x80, 0xde, 0x3c, 0x62, 0xbe, 0xe0, 0x02, 0x5c, 0xdf, 0x81, 0x63, 0x3d, 0x7c, 0x22, 0xc0, 0x9e, 0x1d, 0x43, 0xa1, 0xff, 0x46, 0x18, 0xfa, 0xa4, 0x27, 0x79, 0x9b, 0xc5, 0x84, 0xda, 0x38, 0x66, 0xe5, 0xbb, 0x59, 0x07, 0xdb, 0x85, 0x67, 0x39, 0xba, 0xe4, 0x06, 0x58, 0x19, 0x47, 0xa5, 0xfb, 0x78, 0x26, 0xc4, 0x9a, 0x65, 0x3b, 0xd9, 0x87, 0x04, 0x5a, 0xb8, 0xe6, 0xa7, 0xf9, 0x1b, 0x45, 0xc6, 0x98, 0x7a, 0x24, 0xf8, 0xa6, 0x44, 0x1a, 0x99, 0xc7, 0x25, 0x7b, 0x3a, 0x64, 0x86, 0xd8, 0x5b, 0x05, 0xe7, 0xb9, 0x8c, 0xd2, 0x30, 0x6e, 0xed, 0xb3, 0x51, 0x0f, 0x4e, 0x10, 0xf2, 0xac, 0x2f, 0x71, 0x93, 0xcd, 0x11, 0x4f, 0xad, 0xf3, 0x70, 0x2e, 0xcc, 0x92, 0xd3, 0x8d, 0x6f, 0x31, 0xb2, 0xec, 0x0e, 0x50, 0xaf, 0xf1, 0x13, 0x4d, 0xce, 0x90, 0x72, 0x2c, 0x6d, 0x33, 0xd1, 0x8f, 0x0c, 0x52, 0xb0, 0xee, 0x32, 0x6c, 0x8e, 0xd0, 0x53, 0x0d, 0xef, 0xb1, 0xf0, 0xae, 0x4c, 0x12, 0x91, 0xcf, 0x2d, 0x73, 0xca, 0x94, 0x76, 0x28, 0xab, 0xf5, 0x17, 0x49, 0x08, 0x56, 0xb4, 0xea, 0x69, 0x37, 0xd5, 0x8b, 0x57, 0x09, 0xeb, 0xb5, 0x36, 0x68, 0x8a, 0xd4, 0x95, 0xcb, 0x29, 0x77, 0xf4, 0xaa, 0x48, 0x16, 0xe9, 0xb7, 0x55, 0x0b, 0x88, 0xd6, 0x34, 0x6a, 0x2b, 0x75, 0x97, 0xc9, 0x4a, 0x14, 0xf6, 0xa8, 0x74, 0x2a, 0xc8, 0x96, 0x15, 0x4b, 0xa9, 0xf7, 0xb6, 0xe8, 0x0a, 0x54, 0xd7, 0x89, 0x6b, 0x35];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crc81wire = (0, _define_crc2.default)('dallas-1-wire', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = ~~previous;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = TABLE[(crc ^ byte) & 0xff] & 0xff;
	  }

	  return crc;
	});

	exports.default = crc81wire;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(39).default;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-driven --model=crc-16 --generate=c`
	// prettier-ignore
	var TABLE = [0x0000, 0xc0c1, 0xc181, 0x0140, 0xc301, 0x03c0, 0x0280, 0xc241, 0xc601, 0x06c0, 0x0780, 0xc741, 0x0500, 0xc5c1, 0xc481, 0x0440, 0xcc01, 0x0cc0, 0x0d80, 0xcd41, 0x0f00, 0xcfc1, 0xce81, 0x0e40, 0x0a00, 0xcac1, 0xcb81, 0x0b40, 0xc901, 0x09c0, 0x0880, 0xc841, 0xd801, 0x18c0, 0x1980, 0xd941, 0x1b00, 0xdbc1, 0xda81, 0x1a40, 0x1e00, 0xdec1, 0xdf81, 0x1f40, 0xdd01, 0x1dc0, 0x1c80, 0xdc41, 0x1400, 0xd4c1, 0xd581, 0x1540, 0xd701, 0x17c0, 0x1680, 0xd641, 0xd201, 0x12c0, 0x1380, 0xd341, 0x1100, 0xd1c1, 0xd081, 0x1040, 0xf001, 0x30c0, 0x3180, 0xf141, 0x3300, 0xf3c1, 0xf281, 0x3240, 0x3600, 0xf6c1, 0xf781, 0x3740, 0xf501, 0x35c0, 0x3480, 0xf441, 0x3c00, 0xfcc1, 0xfd81, 0x3d40, 0xff01, 0x3fc0, 0x3e80, 0xfe41, 0xfa01, 0x3ac0, 0x3b80, 0xfb41, 0x3900, 0xf9c1, 0xf881, 0x3840, 0x2800, 0xe8c1, 0xe981, 0x2940, 0xeb01, 0x2bc0, 0x2a80, 0xea41, 0xee01, 0x2ec0, 0x2f80, 0xef41, 0x2d00, 0xedc1, 0xec81, 0x2c40, 0xe401, 0x24c0, 0x2580, 0xe541, 0x2700, 0xe7c1, 0xe681, 0x2640, 0x2200, 0xe2c1, 0xe381, 0x2340, 0xe101, 0x21c0, 0x2080, 0xe041, 0xa001, 0x60c0, 0x6180, 0xa141, 0x6300, 0xa3c1, 0xa281, 0x6240, 0x6600, 0xa6c1, 0xa781, 0x6740, 0xa501, 0x65c0, 0x6480, 0xa441, 0x6c00, 0xacc1, 0xad81, 0x6d40, 0xaf01, 0x6fc0, 0x6e80, 0xae41, 0xaa01, 0x6ac0, 0x6b80, 0xab41, 0x6900, 0xa9c1, 0xa881, 0x6840, 0x7800, 0xb8c1, 0xb981, 0x7940, 0xbb01, 0x7bc0, 0x7a80, 0xba41, 0xbe01, 0x7ec0, 0x7f80, 0xbf41, 0x7d00, 0xbdc1, 0xbc81, 0x7c40, 0xb401, 0x74c0, 0x7580, 0xb541, 0x7700, 0xb7c1, 0xb681, 0x7640, 0x7200, 0xb2c1, 0xb381, 0x7340, 0xb101, 0x71c0, 0x7080, 0xb041, 0x5000, 0x90c1, 0x9181, 0x5140, 0x9301, 0x53c0, 0x5280, 0x9241, 0x9601, 0x56c0, 0x5780, 0x9741, 0x5500, 0x95c1, 0x9481, 0x5440, 0x9c01, 0x5cc0, 0x5d80, 0x9d41, 0x5f00, 0x9fc1, 0x9e81, 0x5e40, 0x5a00, 0x9ac1, 0x9b81, 0x5b40, 0x9901, 0x59c0, 0x5880, 0x9841, 0x8801, 0x48c0, 0x4980, 0x8941, 0x4b00, 0x8bc1, 0x8a81, 0x4a40, 0x4e00, 0x8ec1, 0x8f81, 0x4f40, 0x8d01, 0x4dc0, 0x4c80, 0x8c41, 0x4400, 0x84c1, 0x8581, 0x4540, 0x8701, 0x47c0, 0x4680, 0x8641, 0x8201, 0x42c0, 0x4380, 0x8341, 0x4100, 0x81c1, 0x8081, 0x4040];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crc16 = (0, _define_crc2.default)('crc-16', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = ~~previous;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = (TABLE[(crc ^ byte) & 0xff] ^ crc >> 8) & 0xffff;
	  }

	  return crc;
	});

	exports.default = crc16;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(41).default;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-driven --model=ccitt --generate=c`
	// prettier-ignore
	var TABLE = [0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crc16ccitt = (0, _define_crc2.default)('ccitt', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = typeof previous !== 'undefined' ? ~~previous : 0xffff;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = (TABLE[(crc >> 8 ^ byte) & 0xff] ^ crc << 8) & 0xffff;
	  }

	  return crc;
	});

	exports.default = crc16ccitt;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(43).default;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-driven --model=crc-16-modbus --generate=c`
	// prettier-ignore
	var TABLE = [0x0000, 0xc0c1, 0xc181, 0x0140, 0xc301, 0x03c0, 0x0280, 0xc241, 0xc601, 0x06c0, 0x0780, 0xc741, 0x0500, 0xc5c1, 0xc481, 0x0440, 0xcc01, 0x0cc0, 0x0d80, 0xcd41, 0x0f00, 0xcfc1, 0xce81, 0x0e40, 0x0a00, 0xcac1, 0xcb81, 0x0b40, 0xc901, 0x09c0, 0x0880, 0xc841, 0xd801, 0x18c0, 0x1980, 0xd941, 0x1b00, 0xdbc1, 0xda81, 0x1a40, 0x1e00, 0xdec1, 0xdf81, 0x1f40, 0xdd01, 0x1dc0, 0x1c80, 0xdc41, 0x1400, 0xd4c1, 0xd581, 0x1540, 0xd701, 0x17c0, 0x1680, 0xd641, 0xd201, 0x12c0, 0x1380, 0xd341, 0x1100, 0xd1c1, 0xd081, 0x1040, 0xf001, 0x30c0, 0x3180, 0xf141, 0x3300, 0xf3c1, 0xf281, 0x3240, 0x3600, 0xf6c1, 0xf781, 0x3740, 0xf501, 0x35c0, 0x3480, 0xf441, 0x3c00, 0xfcc1, 0xfd81, 0x3d40, 0xff01, 0x3fc0, 0x3e80, 0xfe41, 0xfa01, 0x3ac0, 0x3b80, 0xfb41, 0x3900, 0xf9c1, 0xf881, 0x3840, 0x2800, 0xe8c1, 0xe981, 0x2940, 0xeb01, 0x2bc0, 0x2a80, 0xea41, 0xee01, 0x2ec0, 0x2f80, 0xef41, 0x2d00, 0xedc1, 0xec81, 0x2c40, 0xe401, 0x24c0, 0x2580, 0xe541, 0x2700, 0xe7c1, 0xe681, 0x2640, 0x2200, 0xe2c1, 0xe381, 0x2340, 0xe101, 0x21c0, 0x2080, 0xe041, 0xa001, 0x60c0, 0x6180, 0xa141, 0x6300, 0xa3c1, 0xa281, 0x6240, 0x6600, 0xa6c1, 0xa781, 0x6740, 0xa501, 0x65c0, 0x6480, 0xa441, 0x6c00, 0xacc1, 0xad81, 0x6d40, 0xaf01, 0x6fc0, 0x6e80, 0xae41, 0xaa01, 0x6ac0, 0x6b80, 0xab41, 0x6900, 0xa9c1, 0xa881, 0x6840, 0x7800, 0xb8c1, 0xb981, 0x7940, 0xbb01, 0x7bc0, 0x7a80, 0xba41, 0xbe01, 0x7ec0, 0x7f80, 0xbf41, 0x7d00, 0xbdc1, 0xbc81, 0x7c40, 0xb401, 0x74c0, 0x7580, 0xb541, 0x7700, 0xb7c1, 0xb681, 0x7640, 0x7200, 0xb2c1, 0xb381, 0x7340, 0xb101, 0x71c0, 0x7080, 0xb041, 0x5000, 0x90c1, 0x9181, 0x5140, 0x9301, 0x53c0, 0x5280, 0x9241, 0x9601, 0x56c0, 0x5780, 0x9741, 0x5500, 0x95c1, 0x9481, 0x5440, 0x9c01, 0x5cc0, 0x5d80, 0x9d41, 0x5f00, 0x9fc1, 0x9e81, 0x5e40, 0x5a00, 0x9ac1, 0x9b81, 0x5b40, 0x9901, 0x59c0, 0x5880, 0x9841, 0x8801, 0x48c0, 0x4980, 0x8941, 0x4b00, 0x8bc1, 0x8a81, 0x4a40, 0x4e00, 0x8ec1, 0x8f81, 0x4f40, 0x8d01, 0x4dc0, 0x4c80, 0x8c41, 0x4400, 0x84c1, 0x8581, 0x4540, 0x8701, 0x47c0, 0x4680, 0x8641, 0x8201, 0x42c0, 0x4380, 0x8341, 0x4100, 0x81c1, 0x8081, 0x4040];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crc16modbus = (0, _define_crc2.default)('crc-16-modbus', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = typeof previous !== 'undefined' ? ~~previous : 0xffff;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = (TABLE[(crc ^ byte) & 0xff] ^ crc >> 8) & 0xffff;
	  }

	  return crc;
	});

	exports.default = crc16modbus;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(45).default;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var crc16xmodem = (0, _define_crc2.default)('xmodem', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = typeof previous !== 'undefined' ? ~~previous : 0x0;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    var code = crc >>> 8 & 0xff;

	    code ^= byte & 0xff;
	    code ^= code >>> 4;
	    crc = crc << 8 & 0xffff;
	    crc ^= code;
	    code = code << 5 & 0xffff;
	    crc ^= code;
	    code = code << 7 & 0xffff;
	    crc ^= code;
	  }

	  return crc;
	});

	exports.default = crc16xmodem;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(47).default;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-driven --model=kermit --generate=c`
	// prettier-ignore
	var TABLE = [0x0000, 0x1189, 0x2312, 0x329b, 0x4624, 0x57ad, 0x6536, 0x74bf, 0x8c48, 0x9dc1, 0xaf5a, 0xbed3, 0xca6c, 0xdbe5, 0xe97e, 0xf8f7, 0x1081, 0x0108, 0x3393, 0x221a, 0x56a5, 0x472c, 0x75b7, 0x643e, 0x9cc9, 0x8d40, 0xbfdb, 0xae52, 0xdaed, 0xcb64, 0xf9ff, 0xe876, 0x2102, 0x308b, 0x0210, 0x1399, 0x6726, 0x76af, 0x4434, 0x55bd, 0xad4a, 0xbcc3, 0x8e58, 0x9fd1, 0xeb6e, 0xfae7, 0xc87c, 0xd9f5, 0x3183, 0x200a, 0x1291, 0x0318, 0x77a7, 0x662e, 0x54b5, 0x453c, 0xbdcb, 0xac42, 0x9ed9, 0x8f50, 0xfbef, 0xea66, 0xd8fd, 0xc974, 0x4204, 0x538d, 0x6116, 0x709f, 0x0420, 0x15a9, 0x2732, 0x36bb, 0xce4c, 0xdfc5, 0xed5e, 0xfcd7, 0x8868, 0x99e1, 0xab7a, 0xbaf3, 0x5285, 0x430c, 0x7197, 0x601e, 0x14a1, 0x0528, 0x37b3, 0x263a, 0xdecd, 0xcf44, 0xfddf, 0xec56, 0x98e9, 0x8960, 0xbbfb, 0xaa72, 0x6306, 0x728f, 0x4014, 0x519d, 0x2522, 0x34ab, 0x0630, 0x17b9, 0xef4e, 0xfec7, 0xcc5c, 0xddd5, 0xa96a, 0xb8e3, 0x8a78, 0x9bf1, 0x7387, 0x620e, 0x5095, 0x411c, 0x35a3, 0x242a, 0x16b1, 0x0738, 0xffcf, 0xee46, 0xdcdd, 0xcd54, 0xb9eb, 0xa862, 0x9af9, 0x8b70, 0x8408, 0x9581, 0xa71a, 0xb693, 0xc22c, 0xd3a5, 0xe13e, 0xf0b7, 0x0840, 0x19c9, 0x2b52, 0x3adb, 0x4e64, 0x5fed, 0x6d76, 0x7cff, 0x9489, 0x8500, 0xb79b, 0xa612, 0xd2ad, 0xc324, 0xf1bf, 0xe036, 0x18c1, 0x0948, 0x3bd3, 0x2a5a, 0x5ee5, 0x4f6c, 0x7df7, 0x6c7e, 0xa50a, 0xb483, 0x8618, 0x9791, 0xe32e, 0xf2a7, 0xc03c, 0xd1b5, 0x2942, 0x38cb, 0x0a50, 0x1bd9, 0x6f66, 0x7eef, 0x4c74, 0x5dfd, 0xb58b, 0xa402, 0x9699, 0x8710, 0xf3af, 0xe226, 0xd0bd, 0xc134, 0x39c3, 0x284a, 0x1ad1, 0x0b58, 0x7fe7, 0x6e6e, 0x5cf5, 0x4d7c, 0xc60c, 0xd785, 0xe51e, 0xf497, 0x8028, 0x91a1, 0xa33a, 0xb2b3, 0x4a44, 0x5bcd, 0x6956, 0x78df, 0x0c60, 0x1de9, 0x2f72, 0x3efb, 0xd68d, 0xc704, 0xf59f, 0xe416, 0x90a9, 0x8120, 0xb3bb, 0xa232, 0x5ac5, 0x4b4c, 0x79d7, 0x685e, 0x1ce1, 0x0d68, 0x3ff3, 0x2e7a, 0xe70e, 0xf687, 0xc41c, 0xd595, 0xa12a, 0xb0a3, 0x8238, 0x93b1, 0x6b46, 0x7acf, 0x4854, 0x59dd, 0x2d62, 0x3ceb, 0x0e70, 0x1ff9, 0xf78f, 0xe606, 0xd49d, 0xc514, 0xb1ab, 0xa022, 0x92b9, 0x8330, 0x7bc7, 0x6a4e, 0x58d5, 0x495c, 0x3de3, 0x2c6a, 0x1ef1, 0x0f78];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crc16kermit = (0, _define_crc2.default)('kermit', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = typeof previous !== 'undefined' ? ~~previous : 0x0000;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = (TABLE[(crc ^ byte) & 0xff] ^ crc >> 8) & 0xffff;
	  }

	  return crc;
	});

	exports.default = crc16kermit;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(49).default;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-drive --model=crc-24 --generate=c`
	// prettier-ignore
	var TABLE = [0x000000, 0x864cfb, 0x8ad50d, 0x0c99f6, 0x93e6e1, 0x15aa1a, 0x1933ec, 0x9f7f17, 0xa18139, 0x27cdc2, 0x2b5434, 0xad18cf, 0x3267d8, 0xb42b23, 0xb8b2d5, 0x3efe2e, 0xc54e89, 0x430272, 0x4f9b84, 0xc9d77f, 0x56a868, 0xd0e493, 0xdc7d65, 0x5a319e, 0x64cfb0, 0xe2834b, 0xee1abd, 0x685646, 0xf72951, 0x7165aa, 0x7dfc5c, 0xfbb0a7, 0x0cd1e9, 0x8a9d12, 0x8604e4, 0x00481f, 0x9f3708, 0x197bf3, 0x15e205, 0x93aefe, 0xad50d0, 0x2b1c2b, 0x2785dd, 0xa1c926, 0x3eb631, 0xb8faca, 0xb4633c, 0x322fc7, 0xc99f60, 0x4fd39b, 0x434a6d, 0xc50696, 0x5a7981, 0xdc357a, 0xd0ac8c, 0x56e077, 0x681e59, 0xee52a2, 0xe2cb54, 0x6487af, 0xfbf8b8, 0x7db443, 0x712db5, 0xf7614e, 0x19a3d2, 0x9fef29, 0x9376df, 0x153a24, 0x8a4533, 0x0c09c8, 0x00903e, 0x86dcc5, 0xb822eb, 0x3e6e10, 0x32f7e6, 0xb4bb1d, 0x2bc40a, 0xad88f1, 0xa11107, 0x275dfc, 0xdced5b, 0x5aa1a0, 0x563856, 0xd074ad, 0x4f0bba, 0xc94741, 0xc5deb7, 0x43924c, 0x7d6c62, 0xfb2099, 0xf7b96f, 0x71f594, 0xee8a83, 0x68c678, 0x645f8e, 0xe21375, 0x15723b, 0x933ec0, 0x9fa736, 0x19ebcd, 0x8694da, 0x00d821, 0x0c41d7, 0x8a0d2c, 0xb4f302, 0x32bff9, 0x3e260f, 0xb86af4, 0x2715e3, 0xa15918, 0xadc0ee, 0x2b8c15, 0xd03cb2, 0x567049, 0x5ae9bf, 0xdca544, 0x43da53, 0xc596a8, 0xc90f5e, 0x4f43a5, 0x71bd8b, 0xf7f170, 0xfb6886, 0x7d247d, 0xe25b6a, 0x641791, 0x688e67, 0xeec29c, 0x3347a4, 0xb50b5f, 0xb992a9, 0x3fde52, 0xa0a145, 0x26edbe, 0x2a7448, 0xac38b3, 0x92c69d, 0x148a66, 0x181390, 0x9e5f6b, 0x01207c, 0x876c87, 0x8bf571, 0x0db98a, 0xf6092d, 0x7045d6, 0x7cdc20, 0xfa90db, 0x65efcc, 0xe3a337, 0xef3ac1, 0x69763a, 0x578814, 0xd1c4ef, 0xdd5d19, 0x5b11e2, 0xc46ef5, 0x42220e, 0x4ebbf8, 0xc8f703, 0x3f964d, 0xb9dab6, 0xb54340, 0x330fbb, 0xac70ac, 0x2a3c57, 0x26a5a1, 0xa0e95a, 0x9e1774, 0x185b8f, 0x14c279, 0x928e82, 0x0df195, 0x8bbd6e, 0x872498, 0x016863, 0xfad8c4, 0x7c943f, 0x700dc9, 0xf64132, 0x693e25, 0xef72de, 0xe3eb28, 0x65a7d3, 0x5b59fd, 0xdd1506, 0xd18cf0, 0x57c00b, 0xc8bf1c, 0x4ef3e7, 0x426a11, 0xc426ea, 0x2ae476, 0xaca88d, 0xa0317b, 0x267d80, 0xb90297, 0x3f4e6c, 0x33d79a, 0xb59b61, 0x8b654f, 0x0d29b4, 0x01b042, 0x87fcb9, 0x1883ae, 0x9ecf55, 0x9256a3, 0x141a58, 0xefaaff, 0x69e604, 0x657ff2, 0xe33309, 0x7c4c1e, 0xfa00e5, 0xf69913, 0x70d5e8, 0x4e2bc6, 0xc8673d, 0xc4fecb, 0x42b230, 0xddcd27, 0x5b81dc, 0x57182a, 0xd154d1, 0x26359f, 0xa07964, 0xace092, 0x2aac69, 0xb5d37e, 0x339f85, 0x3f0673, 0xb94a88, 0x87b4a6, 0x01f85d, 0x0d61ab, 0x8b2d50, 0x145247, 0x921ebc, 0x9e874a, 0x18cbb1, 0xe37b16, 0x6537ed, 0x69ae1b, 0xefe2e0, 0x709df7, 0xf6d10c, 0xfa48fa, 0x7c0401, 0x42fa2f, 0xc4b6d4, 0xc82f22, 0x4e63d9, 0xd11cce, 0x575035, 0x5bc9c3, 0xdd8538];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crc24 = (0, _define_crc2.default)('crc-24', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = typeof previous !== 'undefined' ? ~~previous : 0xb704ce;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = (TABLE[(crc >> 16 ^ byte) & 0xff] ^ crc << 8) & 0xffffff;
	  }

	  return crc;
	});

	exports.default = crc24;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(51).default;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-driven --model=crc-32 --generate=c`
	// prettier-ignore
	var TABLE = [0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crc32 = (0, _define_crc2.default)('crc-32', function (buf, previous) {
	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = previous === 0 ? 0 : ~~previous ^ -1;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = TABLE[(crc ^ byte) & 0xff] ^ crc >>> 8;
	  }

	  return crc ^ -1;
	});

	exports.default = crc32;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(53).default;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _buffer = __webpack_require__(8);

	var _create_buffer = __webpack_require__(32);

	var _create_buffer2 = _interopRequireDefault(_create_buffer);

	var _define_crc = __webpack_require__(33);

	var _define_crc2 = _interopRequireDefault(_define_crc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Generated by `./pycrc.py --algorithm=table-driven --model=jam --generate=c`
	// prettier-ignore
	var TABLE = [0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d];

	if (typeof Int32Array !== 'undefined') TABLE = new Int32Array(TABLE);

	var crcjam = (0, _define_crc2.default)('jam', function (buf) {
	  var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

	  if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);

	  var crc = previous === 0 ? 0 : ~~previous;

	  for (var index = 0; index < buf.length; index++) {
	    var byte = buf[index];
	    crc = TABLE[(crc ^ byte) & 0xff] ^ crc >>> 8;
	  }

	  return crc;
	});

	exports.default = crcjam;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	 * @example
	 *
	 * _.isNull(null);
	 * // => true
	 *
	 * _.isNull(void 0);
	 * // => false
	 */
	function isNull(value) {
	  return value === null;
	}

	module.exports = isNull;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(56),
	    isArray = __webpack_require__(62),
	    isObjectLike = __webpack_require__(63);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}

	module.exports = isString;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(57),
	    getRawTag = __webpack_require__(60),
	    objectToString = __webpack_require__(61);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(58);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(59);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(57);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsXdr = __webpack_require__(65);

	var XDR = _interopRequireWildcard(_jsXdr);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var types = XDR.config(function (xdr) {

	  // === xdr source ============================================================
	  //
	  //   typedef PublicKey AccountID;
	  //
	  // ===========================================================================
	  xdr.typedef("AccountId", xdr.lookup("PublicKey"));

	  // === xdr source ============================================================
	  //
	  //   typedef opaque Thresholds[4];
	  //
	  // ===========================================================================
	  xdr.typedef("Thresholds", xdr.opaque(4));

	  // === xdr source ============================================================
	  //
	  //   typedef string string32<32>;
	  //
	  // ===========================================================================
	  xdr.typedef("String32", xdr.string(32));

	  // === xdr source ============================================================
	  //
	  //   typedef string string64<64>;
	  //
	  // ===========================================================================
	  xdr.typedef("String64", xdr.string(64));

	  // === xdr source ============================================================
	  //
	  //   typedef int64 SequenceNumber;
	  //
	  // ===========================================================================
	  xdr.typedef("SequenceNumber", xdr.lookup("Int64"));

	  // === xdr source ============================================================
	  //
	  //   typedef uint64 TimePoint;
	  //
	  // ===========================================================================
	  xdr.typedef("TimePoint", xdr.lookup("Uint64"));

	  // === xdr source ============================================================
	  //
	  //   typedef opaque DataValue<64>;
	  //
	  // ===========================================================================
	  xdr.typedef("DataValue", xdr.varOpaque(64));

	  // === xdr source ============================================================
	  //
	  //   typedef opaque AssetCode4[4];
	  //
	  // ===========================================================================
	  xdr.typedef("AssetCode4", xdr.opaque(4));

	  // === xdr source ============================================================
	  //
	  //   typedef opaque AssetCode12[12];
	  //
	  // ===========================================================================
	  xdr.typedef("AssetCode12", xdr.opaque(12));

	  // === xdr source ============================================================
	  //
	  //   enum AssetType
	  //   {
	  //       ASSET_TYPE_NATIVE = 0,
	  //       ASSET_TYPE_CREDIT_ALPHANUM4 = 1,
	  //       ASSET_TYPE_CREDIT_ALPHANUM12 = 2
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("AssetType", {
	    assetTypeNative: 0,
	    assetTypeCreditAlphanum4: 1,
	    assetTypeCreditAlphanum12: 2
	  });

	  // === xdr source ============================================================
	  //
	  //   struct
	  //       {
	  //           AssetCode4 assetCode;
	  //           AccountID issuer;
	  //       }
	  //
	  // ===========================================================================
	  xdr.struct("AssetAlphaNum4", [["assetCode", xdr.lookup("AssetCode4")], ["issuer", xdr.lookup("AccountId")]]);

	  // === xdr source ============================================================
	  //
	  //   struct
	  //       {
	  //           AssetCode12 assetCode;
	  //           AccountID issuer;
	  //       }
	  //
	  // ===========================================================================
	  xdr.struct("AssetAlphaNum12", [["assetCode", xdr.lookup("AssetCode12")], ["issuer", xdr.lookup("AccountId")]]);

	  // === xdr source ============================================================
	  //
	  //   union Asset switch (AssetType type)
	  //   {
	  //   case ASSET_TYPE_NATIVE: // Not credit
	  //       void;
	  //   
	  //   case ASSET_TYPE_CREDIT_ALPHANUM4:
	  //       struct
	  //       {
	  //           AssetCode4 assetCode;
	  //           AccountID issuer;
	  //       } alphaNum4;
	  //   
	  //   case ASSET_TYPE_CREDIT_ALPHANUM12:
	  //       struct
	  //       {
	  //           AssetCode12 assetCode;
	  //           AccountID issuer;
	  //       } alphaNum12;
	  //   
	  //       // add other asset types here in the future
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("Asset", {
	    switchOn: xdr.lookup("AssetType"),
	    switchName: "type",
	    switches: [["assetTypeNative", xdr.void()], ["assetTypeCreditAlphanum4", "alphaNum4"], ["assetTypeCreditAlphanum12", "alphaNum12"]],
	    arms: {
	      alphaNum4: xdr.lookup("AssetAlphaNum4"),
	      alphaNum12: xdr.lookup("AssetAlphaNum12")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct Price
	  //   {
	  //       int32 n; // numerator
	  //       int32 d; // denominator
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Price", [["n", xdr.lookup("Int32")], ["d", xdr.lookup("Int32")]]);

	  // === xdr source ============================================================
	  //
	  //   struct Liabilities
	  //   {
	  //       int64 buying;
	  //       int64 selling;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Liabilities", [["buying", xdr.lookup("Int64")], ["selling", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   enum ThresholdIndexes
	  //   {
	  //       THRESHOLD_MASTER_WEIGHT = 0,
	  //       THRESHOLD_LOW = 1,
	  //       THRESHOLD_MED = 2,
	  //       THRESHOLD_HIGH = 3
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("ThresholdIndices", {
	    thresholdMasterWeight: 0,
	    thresholdLow: 1,
	    thresholdMed: 2,
	    thresholdHigh: 3
	  });

	  // === xdr source ============================================================
	  //
	  //   enum LedgerEntryType
	  //   {
	  //       ACCOUNT = 0,
	  //       TRUSTLINE = 1,
	  //       OFFER = 2,
	  //       DATA = 3
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("LedgerEntryType", {
	    account: 0,
	    trustline: 1,
	    offer: 2,
	    datum: 3
	  });

	  // === xdr source ============================================================
	  //
	  //   struct Signer
	  //   {
	  //       SignerKey key;
	  //       uint32 weight; // really only need 1 byte
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Signer", [["key", xdr.lookup("SignerKey")], ["weight", xdr.lookup("Uint32")]]);

	  // === xdr source ============================================================
	  //
	  //   enum AccountFlags
	  //   { // masks for each flag
	  //   
	  //       // Flags set on issuer accounts
	  //       // TrustLines are created with authorized set to "false" requiring
	  //       // the issuer to set it for each TrustLine
	  //       AUTH_REQUIRED_FLAG = 0x1,
	  //       // If set, the authorized flag in TrustLines can be cleared
	  //       // otherwise, authorization cannot be revoked
	  //       AUTH_REVOCABLE_FLAG = 0x2,
	  //       // Once set, causes all AUTH_* flags to be read-only
	  //       AUTH_IMMUTABLE_FLAG = 0x4
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("AccountFlags", {
	    authRequiredFlag: 1,
	    authRevocableFlag: 2,
	    authImmutableFlag: 4
	  });

	  // === xdr source ============================================================
	  //
	  //   const MASK_ACCOUNT_FLAGS = 0x7;
	  //
	  // ===========================================================================
	  xdr.const("MASK_ACCOUNT_FLAGS", 0x7);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //               {
	  //               case 0:
	  //                   void;
	  //               }
	  //
	  // ===========================================================================
	  xdr.union("AccountEntryV1Ext", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct
	  //           {
	  //               Liabilities liabilities;
	  //   
	  //               union switch (int v)
	  //               {
	  //               case 0:
	  //                   void;
	  //               }
	  //               ext;
	  //           }
	  //
	  // ===========================================================================
	  xdr.struct("AccountEntryV1", [["liabilities", xdr.lookup("Liabilities")], ["ext", xdr.lookup("AccountEntryV1Ext")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       case 1:
	  //           struct
	  //           {
	  //               Liabilities liabilities;
	  //   
	  //               union switch (int v)
	  //               {
	  //               case 0:
	  //                   void;
	  //               }
	  //               ext;
	  //           } v1;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("AccountEntryExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()], [1, "v1"]],
	    arms: {
	      v1: xdr.lookup("AccountEntryV1")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct AccountEntry
	  //   {
	  //       AccountID accountID;      // master public key for this account
	  //       int64 balance;            // in stroops
	  //       SequenceNumber seqNum;    // last sequence number used for this account
	  //       uint32 numSubEntries;     // number of sub-entries this account has
	  //                                 // drives the reserve
	  //       AccountID* inflationDest; // Account to vote for during inflation
	  //       uint32 flags;             // see AccountFlags
	  //   
	  //       string32 homeDomain; // can be used for reverse federation and memo lookup
	  //   
	  //       // fields used for signatures
	  //       // thresholds stores unsigned bytes: [weight of master|low|medium|high]
	  //       Thresholds thresholds;
	  //   
	  //       Signer signers<20>; // possible signers for this account
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       case 1:
	  //           struct
	  //           {
	  //               Liabilities liabilities;
	  //   
	  //               union switch (int v)
	  //               {
	  //               case 0:
	  //                   void;
	  //               }
	  //               ext;
	  //           } v1;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("AccountEntry", [["accountId", xdr.lookup("AccountId")], ["balance", xdr.lookup("Int64")], ["seqNum", xdr.lookup("SequenceNumber")], ["numSubEntries", xdr.lookup("Uint32")], ["inflationDest", xdr.option(xdr.lookup("AccountId"))], ["flags", xdr.lookup("Uint32")], ["homeDomain", xdr.lookup("String32")], ["thresholds", xdr.lookup("Thresholds")], ["signers", xdr.varArray(xdr.lookup("Signer"), 20)], ["ext", xdr.lookup("AccountEntryExt")]]);

	  // === xdr source ============================================================
	  //
	  //   enum TrustLineFlags
	  //   {
	  //       // issuer has authorized account to perform transactions with its credit
	  //       AUTHORIZED_FLAG = 1
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("TrustLineFlags", {
	    authorizedFlag: 1
	  });

	  // === xdr source ============================================================
	  //
	  //   const MASK_TRUSTLINE_FLAGS = 1;
	  //
	  // ===========================================================================
	  xdr.const("MASK_TRUSTLINE_FLAGS", 1);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //               {
	  //               case 0:
	  //                   void;
	  //               }
	  //
	  // ===========================================================================
	  xdr.union("TrustLineEntryV1Ext", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct
	  //           {
	  //               Liabilities liabilities;
	  //   
	  //               union switch (int v)
	  //               {
	  //               case 0:
	  //                   void;
	  //               }
	  //               ext;
	  //           }
	  //
	  // ===========================================================================
	  xdr.struct("TrustLineEntryV1", [["liabilities", xdr.lookup("Liabilities")], ["ext", xdr.lookup("TrustLineEntryV1Ext")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       case 1:
	  //           struct
	  //           {
	  //               Liabilities liabilities;
	  //   
	  //               union switch (int v)
	  //               {
	  //               case 0:
	  //                   void;
	  //               }
	  //               ext;
	  //           } v1;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("TrustLineEntryExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()], [1, "v1"]],
	    arms: {
	      v1: xdr.lookup("TrustLineEntryV1")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct TrustLineEntry
	  //   {
	  //       AccountID accountID; // account this trustline belongs to
	  //       Asset asset;         // type of asset (with issuer)
	  //       int64 balance;       // how much of this asset the user has.
	  //                            // Asset defines the unit for this;
	  //   
	  //       int64 limit;  // balance cannot be above this
	  //       uint32 flags; // see TrustLineFlags
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       case 1:
	  //           struct
	  //           {
	  //               Liabilities liabilities;
	  //   
	  //               union switch (int v)
	  //               {
	  //               case 0:
	  //                   void;
	  //               }
	  //               ext;
	  //           } v1;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TrustLineEntry", [["accountId", xdr.lookup("AccountId")], ["asset", xdr.lookup("Asset")], ["balance", xdr.lookup("Int64")], ["limit", xdr.lookup("Int64")], ["flags", xdr.lookup("Uint32")], ["ext", xdr.lookup("TrustLineEntryExt")]]);

	  // === xdr source ============================================================
	  //
	  //   enum OfferEntryFlags
	  //   {
	  //       // issuer has authorized account to perform transactions with its credit
	  //       PASSIVE_FLAG = 1
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("OfferEntryFlags", {
	    passiveFlag: 1
	  });

	  // === xdr source ============================================================
	  //
	  //   const MASK_OFFERENTRY_FLAGS = 1;
	  //
	  // ===========================================================================
	  xdr.const("MASK_OFFERENTRY_FLAGS", 1);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("OfferEntryExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct OfferEntry
	  //   {
	  //       AccountID sellerID;
	  //       int64 offerID;
	  //       Asset selling; // A
	  //       Asset buying;  // B
	  //       int64 amount;  // amount of A
	  //   
	  //       /* price for this offer:
	  //           price of A in terms of B
	  //           price=AmountB/AmountA=priceNumerator/priceDenominator
	  //           price is after fees
	  //       */
	  //       Price price;
	  //       uint32 flags; // see OfferEntryFlags
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("OfferEntry", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")], ["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["flags", xdr.lookup("Uint32")], ["ext", xdr.lookup("OfferEntryExt")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("DataEntryExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct DataEntry
	  //   {
	  //       AccountID accountID; // account this data belongs to
	  //       string64 dataName;
	  //       DataValue dataValue;
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("DataEntry", [["accountId", xdr.lookup("AccountId")], ["dataName", xdr.lookup("String64")], ["dataValue", xdr.lookup("DataValue")], ["ext", xdr.lookup("DataEntryExt")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (LedgerEntryType type)
	  //       {
	  //       case ACCOUNT:
	  //           AccountEntry account;
	  //       case TRUSTLINE:
	  //           TrustLineEntry trustLine;
	  //       case OFFER:
	  //           OfferEntry offer;
	  //       case DATA:
	  //           DataEntry data;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("LedgerEntryData", {
	    switchOn: xdr.lookup("LedgerEntryType"),
	    switchName: "type",
	    switches: [["account", "account"], ["trustline", "trustLine"], ["offer", "offer"], ["datum", "data"]],
	    arms: {
	      account: xdr.lookup("AccountEntry"),
	      trustLine: xdr.lookup("TrustLineEntry"),
	      offer: xdr.lookup("OfferEntry"),
	      data: xdr.lookup("DataEntry")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("LedgerEntryExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct LedgerEntry
	  //   {
	  //       uint32 lastModifiedLedgerSeq; // ledger the LedgerEntry was last changed
	  //   
	  //       union switch (LedgerEntryType type)
	  //       {
	  //       case ACCOUNT:
	  //           AccountEntry account;
	  //       case TRUSTLINE:
	  //           TrustLineEntry trustLine;
	  //       case OFFER:
	  //           OfferEntry offer;
	  //       case DATA:
	  //           DataEntry data;
	  //       }
	  //       data;
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("LedgerEntry", [["lastModifiedLedgerSeq", xdr.lookup("Uint32")], ["data", xdr.lookup("LedgerEntryData")], ["ext", xdr.lookup("LedgerEntryExt")]]);

	  // === xdr source ============================================================
	  //
	  //   enum EnvelopeType
	  //   {
	  //       ENVELOPE_TYPE_SCP = 1,
	  //       ENVELOPE_TYPE_TX = 2,
	  //       ENVELOPE_TYPE_AUTH = 3,
	  //       ENVELOPE_TYPE_SCPVALUE = 4
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("EnvelopeType", {
	    envelopeTypeScp: 1,
	    envelopeTypeTx: 2,
	    envelopeTypeAuth: 3,
	    envelopeTypeScpvalue: 4
	  });

	  // === xdr source ============================================================
	  //
	  //   typedef opaque UpgradeType<128>;
	  //
	  // ===========================================================================
	  xdr.typedef("UpgradeType", xdr.varOpaque(128));

	  // === xdr source ============================================================
	  //
	  //   enum StellarValueType
	  //   {
	  //       STELLAR_VALUE_BASIC = 0,
	  //       STELLAR_VALUE_SIGNED = 1
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("StellarValueType", {
	    stellarValueBasic: 0,
	    stellarValueSigned: 1
	  });

	  // === xdr source ============================================================
	  //
	  //   struct LedgerCloseValueSignature
	  //   {
	  //       NodeID nodeID;       // which node introduced the value
	  //       Signature signature; // nodeID's signature
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("LedgerCloseValueSignature", [["nodeId", xdr.lookup("NodeId")], ["signature", xdr.lookup("Signature")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (StellarValueType v)
	  //       {
	  //       case STELLAR_VALUE_BASIC:
	  //           void;
	  //       case STELLAR_VALUE_SIGNED:
	  //           LedgerCloseValueSignature lcValueSignature;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("StellarValueExt", {
	    switchOn: xdr.lookup("StellarValueType"),
	    switchName: "v",
	    switches: [["stellarValueBasic", xdr.void()], ["stellarValueSigned", "lcValueSignature"]],
	    arms: {
	      lcValueSignature: xdr.lookup("LedgerCloseValueSignature")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct StellarValue
	  //   {
	  //       Hash txSetHash;      // transaction set to apply to previous ledger
	  //       TimePoint closeTime; // network close time
	  //   
	  //       // upgrades to apply to the previous ledger (usually empty)
	  //       // this is a vector of encoded 'LedgerUpgrade' so that nodes can drop
	  //       // unknown steps during consensus if needed.
	  //       // see notes below on 'LedgerUpgrade' for more detail
	  //       // max size is dictated by number of upgrade types (+ room for future)
	  //       UpgradeType upgrades<6>;
	  //   
	  //       // reserved for future use
	  //       union switch (StellarValueType v)
	  //       {
	  //       case STELLAR_VALUE_BASIC:
	  //           void;
	  //       case STELLAR_VALUE_SIGNED:
	  //           LedgerCloseValueSignature lcValueSignature;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("StellarValue", [["txSetHash", xdr.lookup("Hash")], ["closeTime", xdr.lookup("TimePoint")], ["upgrades", xdr.varArray(xdr.lookup("UpgradeType"), 6)], ["ext", xdr.lookup("StellarValueExt")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("LedgerHeaderExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct LedgerHeader
	  //   {
	  //       uint32 ledgerVersion;    // the protocol version of the ledger
	  //       Hash previousLedgerHash; // hash of the previous ledger header
	  //       StellarValue scpValue;   // what consensus agreed to
	  //       Hash txSetResultHash;    // the TransactionResultSet that led to this ledger
	  //       Hash bucketListHash;     // hash of the ledger state
	  //   
	  //       uint32 ledgerSeq; // sequence number of this ledger
	  //   
	  //       int64 totalCoins; // total number of stroops in existence.
	  //                         // 10,000,000 stroops in 1 XLM
	  //   
	  //       int64 feePool;       // fees burned since last inflation run
	  //       uint32 inflationSeq; // inflation sequence number
	  //   
	  //       uint64 idPool; // last used global ID, used for generating objects
	  //   
	  //       uint32 baseFee;     // base fee per operation in stroops
	  //       uint32 baseReserve; // account base reserve in stroops
	  //   
	  //       uint32 maxTxSetSize; // maximum size a transaction set can be
	  //   
	  //       Hash skipList[4]; // hashes of ledgers in the past. allows you to jump back
	  //                         // in time without walking the chain back ledger by ledger
	  //                         // each slot contains the oldest ledger that is mod of
	  //                         // either 50  5000  50000 or 500000 depending on index
	  //                         // skipList[0] mod(50), skipList[1] mod(5000), etc
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("LedgerHeader", [["ledgerVersion", xdr.lookup("Uint32")], ["previousLedgerHash", xdr.lookup("Hash")], ["scpValue", xdr.lookup("StellarValue")], ["txSetResultHash", xdr.lookup("Hash")], ["bucketListHash", xdr.lookup("Hash")], ["ledgerSeq", xdr.lookup("Uint32")], ["totalCoins", xdr.lookup("Int64")], ["feePool", xdr.lookup("Int64")], ["inflationSeq", xdr.lookup("Uint32")], ["idPool", xdr.lookup("Uint64")], ["baseFee", xdr.lookup("Uint32")], ["baseReserve", xdr.lookup("Uint32")], ["maxTxSetSize", xdr.lookup("Uint32")], ["skipList", xdr.array(xdr.lookup("Hash"), 4)], ["ext", xdr.lookup("LedgerHeaderExt")]]);

	  // === xdr source ============================================================
	  //
	  //   enum LedgerUpgradeType
	  //   {
	  //       LEDGER_UPGRADE_VERSION = 1,
	  //       LEDGER_UPGRADE_BASE_FEE = 2,
	  //       LEDGER_UPGRADE_MAX_TX_SET_SIZE = 3,
	  //       LEDGER_UPGRADE_BASE_RESERVE = 4
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("LedgerUpgradeType", {
	    ledgerUpgradeVersion: 1,
	    ledgerUpgradeBaseFee: 2,
	    ledgerUpgradeMaxTxSetSize: 3,
	    ledgerUpgradeBaseReserve: 4
	  });

	  // === xdr source ============================================================
	  //
	  //   union LedgerUpgrade switch (LedgerUpgradeType type)
	  //   {
	  //   case LEDGER_UPGRADE_VERSION:
	  //       uint32 newLedgerVersion; // update ledgerVersion
	  //   case LEDGER_UPGRADE_BASE_FEE:
	  //       uint32 newBaseFee; // update baseFee
	  //   case LEDGER_UPGRADE_MAX_TX_SET_SIZE:
	  //       uint32 newMaxTxSetSize; // update maxTxSetSize
	  //   case LEDGER_UPGRADE_BASE_RESERVE:
	  //       uint32 newBaseReserve; // update baseReserve
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("LedgerUpgrade", {
	    switchOn: xdr.lookup("LedgerUpgradeType"),
	    switchName: "type",
	    switches: [["ledgerUpgradeVersion", "newLedgerVersion"], ["ledgerUpgradeBaseFee", "newBaseFee"], ["ledgerUpgradeMaxTxSetSize", "newMaxTxSetSize"], ["ledgerUpgradeBaseReserve", "newBaseReserve"]],
	    arms: {
	      newLedgerVersion: xdr.lookup("Uint32"),
	      newBaseFee: xdr.lookup("Uint32"),
	      newMaxTxSetSize: xdr.lookup("Uint32"),
	      newBaseReserve: xdr.lookup("Uint32")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct
	  //       {
	  //           AccountID accountID;
	  //       }
	  //
	  // ===========================================================================
	  xdr.struct("LedgerKeyAccount", [["accountId", xdr.lookup("AccountId")]]);

	  // === xdr source ============================================================
	  //
	  //   struct
	  //       {
	  //           AccountID accountID;
	  //           Asset asset;
	  //       }
	  //
	  // ===========================================================================
	  xdr.struct("LedgerKeyTrustLine", [["accountId", xdr.lookup("AccountId")], ["asset", xdr.lookup("Asset")]]);

	  // === xdr source ============================================================
	  //
	  //   struct
	  //       {
	  //           AccountID sellerID;
	  //           int64 offerID;
	  //       }
	  //
	  // ===========================================================================
	  xdr.struct("LedgerKeyOffer", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   struct
	  //       {
	  //           AccountID accountID;
	  //           string64 dataName;
	  //       }
	  //
	  // ===========================================================================
	  xdr.struct("LedgerKeyData", [["accountId", xdr.lookup("AccountId")], ["dataName", xdr.lookup("String64")]]);

	  // === xdr source ============================================================
	  //
	  //   union LedgerKey switch (LedgerEntryType type)
	  //   {
	  //   case ACCOUNT:
	  //       struct
	  //       {
	  //           AccountID accountID;
	  //       } account;
	  //   
	  //   case TRUSTLINE:
	  //       struct
	  //       {
	  //           AccountID accountID;
	  //           Asset asset;
	  //       } trustLine;
	  //   
	  //   case OFFER:
	  //       struct
	  //       {
	  //           AccountID sellerID;
	  //           int64 offerID;
	  //       } offer;
	  //   
	  //   case DATA:
	  //       struct
	  //       {
	  //           AccountID accountID;
	  //           string64 dataName;
	  //       } data;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("LedgerKey", {
	    switchOn: xdr.lookup("LedgerEntryType"),
	    switchName: "type",
	    switches: [["account", "account"], ["trustline", "trustLine"], ["offer", "offer"], ["datum", "data"]],
	    arms: {
	      account: xdr.lookup("LedgerKeyAccount"),
	      trustLine: xdr.lookup("LedgerKeyTrustLine"),
	      offer: xdr.lookup("LedgerKeyOffer"),
	      data: xdr.lookup("LedgerKeyData")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   enum BucketEntryType
	  //   {
	  //       METAENTRY =
	  //           -1, // At-and-after protocol 11: bucket metadata, should come first.
	  //       LIVEENTRY = 0, // Before protocol 11: created-or-updated;
	  //                      // At-and-after protocol 11: only updated.
	  //       DEADENTRY = 1,
	  //       INITENTRY = 2 // At-and-after protocol 11: only created.
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("BucketEntryType", {
	    metaentry: -1,
	    liveentry: 0,
	    deadentry: 1,
	    initentry: 2
	  });

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("BucketMetadataExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct BucketMetadata
	  //   {
	  //       // Indicates the protocol version used to create / merge this bucket.
	  //       uint32 ledgerVersion;
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("BucketMetadata", [["ledgerVersion", xdr.lookup("Uint32")], ["ext", xdr.lookup("BucketMetadataExt")]]);

	  // === xdr source ============================================================
	  //
	  //   union BucketEntry switch (BucketEntryType type)
	  //   {
	  //   case LIVEENTRY:
	  //   case INITENTRY:
	  //       LedgerEntry liveEntry;
	  //   
	  //   case DEADENTRY:
	  //       LedgerKey deadEntry;
	  //   case METAENTRY:
	  //       BucketMetadata metaEntry;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("BucketEntry", {
	    switchOn: xdr.lookup("BucketEntryType"),
	    switchName: "type",
	    switches: [["liveentry", "liveEntry"], ["initentry", "liveEntry"], ["deadentry", "deadEntry"], ["metaentry", "metaEntry"]],
	    arms: {
	      liveEntry: xdr.lookup("LedgerEntry"),
	      deadEntry: xdr.lookup("LedgerKey"),
	      metaEntry: xdr.lookup("BucketMetadata")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct TransactionSet
	  //   {
	  //       Hash previousLedgerHash;
	  //       TransactionEnvelope txs<>;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionSet", [["previousLedgerHash", xdr.lookup("Hash")], ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)]]);

	  // === xdr source ============================================================
	  //
	  //   struct TransactionResultPair
	  //   {
	  //       Hash transactionHash;
	  //       TransactionResult result; // result for the transaction
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionResultPair", [["transactionHash", xdr.lookup("Hash")], ["result", xdr.lookup("TransactionResult")]]);

	  // === xdr source ============================================================
	  //
	  //   struct TransactionResultSet
	  //   {
	  //       TransactionResultPair results<>;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionResultSet", [["results", xdr.varArray(xdr.lookup("TransactionResultPair"), 2147483647)]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("TransactionHistoryEntryExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct TransactionHistoryEntry
	  //   {
	  //       uint32 ledgerSeq;
	  //       TransactionSet txSet;
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionHistoryEntry", [["ledgerSeq", xdr.lookup("Uint32")], ["txSet", xdr.lookup("TransactionSet")], ["ext", xdr.lookup("TransactionHistoryEntryExt")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("TransactionHistoryResultEntryExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct TransactionHistoryResultEntry
	  //   {
	  //       uint32 ledgerSeq;
	  //       TransactionResultSet txResultSet;
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionHistoryResultEntry", [["ledgerSeq", xdr.lookup("Uint32")], ["txResultSet", xdr.lookup("TransactionResultSet")], ["ext", xdr.lookup("TransactionHistoryResultEntryExt")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("LedgerHeaderHistoryEntryExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct LedgerHeaderHistoryEntry
	  //   {
	  //       Hash hash;
	  //       LedgerHeader header;
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("LedgerHeaderHistoryEntry", [["hash", xdr.lookup("Hash")], ["header", xdr.lookup("LedgerHeader")], ["ext", xdr.lookup("LedgerHeaderHistoryEntryExt")]]);

	  // === xdr source ============================================================
	  //
	  //   struct LedgerSCPMessages
	  //   {
	  //       uint32 ledgerSeq;
	  //       SCPEnvelope messages<>;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("LedgerScpMessages", [["ledgerSeq", xdr.lookup("Uint32")], ["messages", xdr.varArray(xdr.lookup("ScpEnvelope"), 2147483647)]]);

	  // === xdr source ============================================================
	  //
	  //   struct SCPHistoryEntryV0
	  //   {
	  //       SCPQuorumSet quorumSets<>; // additional quorum sets used by ledgerMessages
	  //       LedgerSCPMessages ledgerMessages;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ScpHistoryEntryV0", [["quorumSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)], ["ledgerMessages", xdr.lookup("LedgerScpMessages")]]);

	  // === xdr source ============================================================
	  //
	  //   union SCPHistoryEntry switch (int v)
	  //   {
	  //   case 0:
	  //       SCPHistoryEntryV0 v0;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("ScpHistoryEntry", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, "v0"]],
	    arms: {
	      v0: xdr.lookup("ScpHistoryEntryV0")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   enum LedgerEntryChangeType
	  //   {
	  //       LEDGER_ENTRY_CREATED = 0, // entry was added to the ledger
	  //       LEDGER_ENTRY_UPDATED = 1, // entry was modified in the ledger
	  //       LEDGER_ENTRY_REMOVED = 2, // entry was removed from the ledger
	  //       LEDGER_ENTRY_STATE = 3    // value of the entry
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("LedgerEntryChangeType", {
	    ledgerEntryCreated: 0,
	    ledgerEntryUpdated: 1,
	    ledgerEntryRemoved: 2,
	    ledgerEntryState: 3
	  });

	  // === xdr source ============================================================
	  //
	  //   union LedgerEntryChange switch (LedgerEntryChangeType type)
	  //   {
	  //   case LEDGER_ENTRY_CREATED:
	  //       LedgerEntry created;
	  //   case LEDGER_ENTRY_UPDATED:
	  //       LedgerEntry updated;
	  //   case LEDGER_ENTRY_REMOVED:
	  //       LedgerKey removed;
	  //   case LEDGER_ENTRY_STATE:
	  //       LedgerEntry state;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("LedgerEntryChange", {
	    switchOn: xdr.lookup("LedgerEntryChangeType"),
	    switchName: "type",
	    switches: [["ledgerEntryCreated", "created"], ["ledgerEntryUpdated", "updated"], ["ledgerEntryRemoved", "removed"], ["ledgerEntryState", "state"]],
	    arms: {
	      created: xdr.lookup("LedgerEntry"),
	      updated: xdr.lookup("LedgerEntry"),
	      removed: xdr.lookup("LedgerKey"),
	      state: xdr.lookup("LedgerEntry")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   typedef LedgerEntryChange LedgerEntryChanges<>;
	  //
	  // ===========================================================================
	  xdr.typedef("LedgerEntryChanges", xdr.varArray(xdr.lookup("LedgerEntryChange"), 2147483647));

	  // === xdr source ============================================================
	  //
	  //   struct OperationMeta
	  //   {
	  //       LedgerEntryChanges changes;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("OperationMeta", [["changes", xdr.lookup("LedgerEntryChanges")]]);

	  // === xdr source ============================================================
	  //
	  //   struct TransactionMetaV1
	  //   {
	  //       LedgerEntryChanges txChanges; // tx level changes if any
	  //       OperationMeta operations<>;   // meta for each operation
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionMetaV1", [["txChanges", xdr.lookup("LedgerEntryChanges")], ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)]]);

	  // === xdr source ============================================================
	  //
	  //   union TransactionMeta switch (int v)
	  //   {
	  //   case 0:
	  //       OperationMeta operations<>;
	  //   case 1:
	  //       TransactionMetaV1 v1;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("TransactionMeta", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, "operations"], [1, "v1"]],
	    arms: {
	      operations: xdr.varArray(xdr.lookup("OperationMeta"), 2147483647),
	      v1: xdr.lookup("TransactionMetaV1")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   enum ErrorCode
	  //   {
	  //       ERR_MISC = 0, // Unspecific error
	  //       ERR_DATA = 1, // Malformed data
	  //       ERR_CONF = 2, // Misconfiguration error
	  //       ERR_AUTH = 3, // Authentication failure
	  //       ERR_LOAD = 4  // System overloaded
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("ErrorCode", {
	    errMisc: 0,
	    errDatum: 1,
	    errConf: 2,
	    errAuth: 3,
	    errLoad: 4
	  });

	  // === xdr source ============================================================
	  //
	  //   struct Error
	  //   {
	  //       ErrorCode code;
	  //       string msg<100>;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Error", [["code", xdr.lookup("ErrorCode")], ["msg", xdr.string(100)]]);

	  // === xdr source ============================================================
	  //
	  //   struct AuthCert
	  //   {
	  //       Curve25519Public pubkey;
	  //       uint64 expiration;
	  //       Signature sig;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("AuthCert", [["pubkey", xdr.lookup("Curve25519Public")], ["expiration", xdr.lookup("Uint64")], ["sig", xdr.lookup("Signature")]]);

	  // === xdr source ============================================================
	  //
	  //   struct Hello
	  //   {
	  //       uint32 ledgerVersion;
	  //       uint32 overlayVersion;
	  //       uint32 overlayMinVersion;
	  //       Hash networkID;
	  //       string versionStr<100>;
	  //       int listeningPort;
	  //       NodeID peerID;
	  //       AuthCert cert;
	  //       uint256 nonce;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Hello", [["ledgerVersion", xdr.lookup("Uint32")], ["overlayVersion", xdr.lookup("Uint32")], ["overlayMinVersion", xdr.lookup("Uint32")], ["networkId", xdr.lookup("Hash")], ["versionStr", xdr.string(100)], ["listeningPort", xdr.int()], ["peerId", xdr.lookup("NodeId")], ["cert", xdr.lookup("AuthCert")], ["nonce", xdr.lookup("Uint256")]]);

	  // === xdr source ============================================================
	  //
	  //   struct Auth
	  //   {
	  //       // Empty message, just to confirm
	  //       // establishment of MAC keys.
	  //       int unused;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Auth", [["unused", xdr.int()]]);

	  // === xdr source ============================================================
	  //
	  //   enum IPAddrType
	  //   {
	  //       IPv4 = 0,
	  //       IPv6 = 1
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("IpAddrType", {
	    iPv4: 0,
	    iPv6: 1
	  });

	  // === xdr source ============================================================
	  //
	  //   union switch (IPAddrType type)
	  //       {
	  //       case IPv4:
	  //           opaque ipv4[4];
	  //       case IPv6:
	  //           opaque ipv6[16];
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("PeerAddressIp", {
	    switchOn: xdr.lookup("IpAddrType"),
	    switchName: "type",
	    switches: [["iPv4", "ipv4"], ["iPv6", "ipv6"]],
	    arms: {
	      ipv4: xdr.opaque(4),
	      ipv6: xdr.opaque(16)
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct PeerAddress
	  //   {
	  //       union switch (IPAddrType type)
	  //       {
	  //       case IPv4:
	  //           opaque ipv4[4];
	  //       case IPv6:
	  //           opaque ipv6[16];
	  //       }
	  //       ip;
	  //       uint32 port;
	  //       uint32 numFailures;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("PeerAddress", [["ip", xdr.lookup("PeerAddressIp")], ["port", xdr.lookup("Uint32")], ["numFailures", xdr.lookup("Uint32")]]);

	  // === xdr source ============================================================
	  //
	  //   enum MessageType
	  //   {
	  //       ERROR_MSG = 0,
	  //       AUTH = 2,
	  //       DONT_HAVE = 3,
	  //   
	  //       GET_PEERS = 4, // gets a list of peers this guy knows about
	  //       PEERS = 5,
	  //   
	  //       GET_TX_SET = 6, // gets a particular txset by hash
	  //       TX_SET = 7,
	  //   
	  //       TRANSACTION = 8, // pass on a tx you have heard about
	  //   
	  //       // SCP
	  //       GET_SCP_QUORUMSET = 9,
	  //       SCP_QUORUMSET = 10,
	  //       SCP_MESSAGE = 11,
	  //       GET_SCP_STATE = 12,
	  //   
	  //       // new messages
	  //       HELLO = 13
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("MessageType", {
	    errorMsg: 0,
	    auth: 2,
	    dontHave: 3,
	    getPeer: 4,
	    peer: 5,
	    getTxSet: 6,
	    txSet: 7,
	    transaction: 8,
	    getScpQuorumset: 9,
	    scpQuorumset: 10,
	    scpMessage: 11,
	    getScpState: 12,
	    hello: 13
	  });

	  // === xdr source ============================================================
	  //
	  //   struct DontHave
	  //   {
	  //       MessageType type;
	  //       uint256 reqHash;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("DontHave", [["type", xdr.lookup("MessageType")], ["reqHash", xdr.lookup("Uint256")]]);

	  // === xdr source ============================================================
	  //
	  //   union StellarMessage switch (MessageType type)
	  //   {
	  //   case ERROR_MSG:
	  //       Error error;
	  //   case HELLO:
	  //       Hello hello;
	  //   case AUTH:
	  //       Auth auth;
	  //   case DONT_HAVE:
	  //       DontHave dontHave;
	  //   case GET_PEERS:
	  //       void;
	  //   case PEERS:
	  //       PeerAddress peers<100>;
	  //   
	  //   case GET_TX_SET:
	  //       uint256 txSetHash;
	  //   case TX_SET:
	  //       TransactionSet txSet;
	  //   
	  //   case TRANSACTION:
	  //       TransactionEnvelope transaction;
	  //   
	  //   // SCP
	  //   case GET_SCP_QUORUMSET:
	  //       uint256 qSetHash;
	  //   case SCP_QUORUMSET:
	  //       SCPQuorumSet qSet;
	  //   case SCP_MESSAGE:
	  //       SCPEnvelope envelope;
	  //   case GET_SCP_STATE:
	  //       uint32 getSCPLedgerSeq; // ledger seq requested ; if 0, requests the latest
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("StellarMessage", {
	    switchOn: xdr.lookup("MessageType"),
	    switchName: "type",
	    switches: [["errorMsg", "error"], ["hello", "hello"], ["auth", "auth"], ["dontHave", "dontHave"], ["getPeer", xdr.void()], ["peer", "peers"], ["getTxSet", "txSetHash"], ["txSet", "txSet"], ["transaction", "transaction"], ["getScpQuorumset", "qSetHash"], ["scpQuorumset", "qSet"], ["scpMessage", "envelope"], ["getScpState", "getScpLedgerSeq"]],
	    arms: {
	      error: xdr.lookup("Error"),
	      hello: xdr.lookup("Hello"),
	      auth: xdr.lookup("Auth"),
	      dontHave: xdr.lookup("DontHave"),
	      peers: xdr.varArray(xdr.lookup("PeerAddress"), 100),
	      txSetHash: xdr.lookup("Uint256"),
	      txSet: xdr.lookup("TransactionSet"),
	      transaction: xdr.lookup("TransactionEnvelope"),
	      qSetHash: xdr.lookup("Uint256"),
	      qSet: xdr.lookup("ScpQuorumSet"),
	      envelope: xdr.lookup("ScpEnvelope"),
	      getScpLedgerSeq: xdr.lookup("Uint32")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct
	  //   {
	  //      uint64 sequence;
	  //      StellarMessage message;
	  //      HmacSha256Mac mac;
	  //       }
	  //
	  // ===========================================================================
	  xdr.struct("AuthenticatedMessageV0", [["sequence", xdr.lookup("Uint64")], ["message", xdr.lookup("StellarMessage")], ["mac", xdr.lookup("HmacSha256Mac")]]);

	  // === xdr source ============================================================
	  //
	  //   union AuthenticatedMessage switch (uint32 v)
	  //   {
	  //   case 0:
	  //       struct
	  //   {
	  //      uint64 sequence;
	  //      StellarMessage message;
	  //      HmacSha256Mac mac;
	  //       } v0;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("AuthenticatedMessage", {
	    switchOn: xdr.lookup("Uint32"),
	    switchName: "v",
	    switches: [[0, "v0"]],
	    arms: {
	      v0: xdr.lookup("AuthenticatedMessageV0")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   typedef opaque Value<>;
	  //
	  // ===========================================================================
	  xdr.typedef("Value", xdr.varOpaque());

	  // === xdr source ============================================================
	  //
	  //   struct SCPBallot
	  //   {
	  //       uint32 counter; // n
	  //       Value value;    // x
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ScpBallot", [["counter", xdr.lookup("Uint32")], ["value", xdr.lookup("Value")]]);

	  // === xdr source ============================================================
	  //
	  //   enum SCPStatementType
	  //   {
	  //       SCP_ST_PREPARE = 0,
	  //       SCP_ST_CONFIRM = 1,
	  //       SCP_ST_EXTERNALIZE = 2,
	  //       SCP_ST_NOMINATE = 3
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("ScpStatementType", {
	    scpStPrepare: 0,
	    scpStConfirm: 1,
	    scpStExternalize: 2,
	    scpStNominate: 3
	  });

	  // === xdr source ============================================================
	  //
	  //   struct SCPNomination
	  //   {
	  //       Hash quorumSetHash; // D
	  //       Value votes<>;      // X
	  //       Value accepted<>;   // Y
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ScpNomination", [["quorumSetHash", xdr.lookup("Hash")], ["votes", xdr.varArray(xdr.lookup("Value"), 2147483647)], ["accepted", xdr.varArray(xdr.lookup("Value"), 2147483647)]]);

	  // === xdr source ============================================================
	  //
	  //   struct
	  //           {
	  //               Hash quorumSetHash;       // D
	  //               SCPBallot ballot;         // b
	  //               SCPBallot* prepared;      // p
	  //               SCPBallot* preparedPrime; // p'
	  //               uint32 nC;                // c.n
	  //               uint32 nH;                // h.n
	  //           }
	  //
	  // ===========================================================================
	  xdr.struct("ScpStatementPrepare", [["quorumSetHash", xdr.lookup("Hash")], ["ballot", xdr.lookup("ScpBallot")], ["prepared", xdr.option(xdr.lookup("ScpBallot"))], ["preparedPrime", xdr.option(xdr.lookup("ScpBallot"))], ["nC", xdr.lookup("Uint32")], ["nH", xdr.lookup("Uint32")]]);

	  // === xdr source ============================================================
	  //
	  //   struct
	  //           {
	  //               SCPBallot ballot;   // b
	  //               uint32 nPrepared;   // p.n
	  //               uint32 nCommit;     // c.n
	  //               uint32 nH;          // h.n
	  //               Hash quorumSetHash; // D
	  //           }
	  //
	  // ===========================================================================
	  xdr.struct("ScpStatementConfirm", [["ballot", xdr.lookup("ScpBallot")], ["nPrepared", xdr.lookup("Uint32")], ["nCommit", xdr.lookup("Uint32")], ["nH", xdr.lookup("Uint32")], ["quorumSetHash", xdr.lookup("Hash")]]);

	  // === xdr source ============================================================
	  //
	  //   struct
	  //           {
	  //               SCPBallot commit;         // c
	  //               uint32 nH;                // h.n
	  //               Hash commitQuorumSetHash; // D used before EXTERNALIZE
	  //           }
	  //
	  // ===========================================================================
	  xdr.struct("ScpStatementExternalize", [["commit", xdr.lookup("ScpBallot")], ["nH", xdr.lookup("Uint32")], ["commitQuorumSetHash", xdr.lookup("Hash")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (SCPStatementType type)
	  //       {
	  //       case SCP_ST_PREPARE:
	  //           struct
	  //           {
	  //               Hash quorumSetHash;       // D
	  //               SCPBallot ballot;         // b
	  //               SCPBallot* prepared;      // p
	  //               SCPBallot* preparedPrime; // p'
	  //               uint32 nC;                // c.n
	  //               uint32 nH;                // h.n
	  //           } prepare;
	  //       case SCP_ST_CONFIRM:
	  //           struct
	  //           {
	  //               SCPBallot ballot;   // b
	  //               uint32 nPrepared;   // p.n
	  //               uint32 nCommit;     // c.n
	  //               uint32 nH;          // h.n
	  //               Hash quorumSetHash; // D
	  //           } confirm;
	  //       case SCP_ST_EXTERNALIZE:
	  //           struct
	  //           {
	  //               SCPBallot commit;         // c
	  //               uint32 nH;                // h.n
	  //               Hash commitQuorumSetHash; // D used before EXTERNALIZE
	  //           } externalize;
	  //       case SCP_ST_NOMINATE:
	  //           SCPNomination nominate;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("ScpStatementPledges", {
	    switchOn: xdr.lookup("ScpStatementType"),
	    switchName: "type",
	    switches: [["scpStPrepare", "prepare"], ["scpStConfirm", "confirm"], ["scpStExternalize", "externalize"], ["scpStNominate", "nominate"]],
	    arms: {
	      prepare: xdr.lookup("ScpStatementPrepare"),
	      confirm: xdr.lookup("ScpStatementConfirm"),
	      externalize: xdr.lookup("ScpStatementExternalize"),
	      nominate: xdr.lookup("ScpNomination")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct SCPStatement
	  //   {
	  //       NodeID nodeID;    // v
	  //       uint64 slotIndex; // i
	  //   
	  //       union switch (SCPStatementType type)
	  //       {
	  //       case SCP_ST_PREPARE:
	  //           struct
	  //           {
	  //               Hash quorumSetHash;       // D
	  //               SCPBallot ballot;         // b
	  //               SCPBallot* prepared;      // p
	  //               SCPBallot* preparedPrime; // p'
	  //               uint32 nC;                // c.n
	  //               uint32 nH;                // h.n
	  //           } prepare;
	  //       case SCP_ST_CONFIRM:
	  //           struct
	  //           {
	  //               SCPBallot ballot;   // b
	  //               uint32 nPrepared;   // p.n
	  //               uint32 nCommit;     // c.n
	  //               uint32 nH;          // h.n
	  //               Hash quorumSetHash; // D
	  //           } confirm;
	  //       case SCP_ST_EXTERNALIZE:
	  //           struct
	  //           {
	  //               SCPBallot commit;         // c
	  //               uint32 nH;                // h.n
	  //               Hash commitQuorumSetHash; // D used before EXTERNALIZE
	  //           } externalize;
	  //       case SCP_ST_NOMINATE:
	  //           SCPNomination nominate;
	  //       }
	  //       pledges;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ScpStatement", [["nodeId", xdr.lookup("NodeId")], ["slotIndex", xdr.lookup("Uint64")], ["pledges", xdr.lookup("ScpStatementPledges")]]);

	  // === xdr source ============================================================
	  //
	  //   struct SCPEnvelope
	  //   {
	  //       SCPStatement statement;
	  //       Signature signature;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ScpEnvelope", [["statement", xdr.lookup("ScpStatement")], ["signature", xdr.lookup("Signature")]]);

	  // === xdr source ============================================================
	  //
	  //   struct SCPQuorumSet
	  //   {
	  //       uint32 threshold;
	  //       PublicKey validators<>;
	  //       SCPQuorumSet innerSets<>;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ScpQuorumSet", [["threshold", xdr.lookup("Uint32")], ["validators", xdr.varArray(xdr.lookup("PublicKey"), 2147483647)], ["innerSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)]]);

	  // === xdr source ============================================================
	  //
	  //   struct DecoratedSignature
	  //   {
	  //       SignatureHint hint;  // last 4 bytes of the public key, used as a hint
	  //       Signature signature; // actual signature
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("DecoratedSignature", [["hint", xdr.lookup("SignatureHint")], ["signature", xdr.lookup("Signature")]]);

	  // === xdr source ============================================================
	  //
	  //   enum OperationType
	  //   {
	  //       CREATE_ACCOUNT = 0,
	  //       PAYMENT = 1,
	  //       PATH_PAYMENT = 2,
	  //       MANAGE_SELL_OFFER = 3,
	  //       CREATE_PASSIVE_SELL_OFFER = 4,
	  //       SET_OPTIONS = 5,
	  //       CHANGE_TRUST = 6,
	  //       ALLOW_TRUST = 7,
	  //       ACCOUNT_MERGE = 8,
	  //       INFLATION = 9,
	  //       MANAGE_DATA = 10,
	  //       BUMP_SEQUENCE = 11,
	  //       MANAGE_BUY_OFFER = 12
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("OperationType", {
	    createAccount: 0,
	    payment: 1,
	    pathPayment: 2,
	    manageSellOffer: 3,
	    createPassiveSellOffer: 4,
	    setOption: 5,
	    changeTrust: 6,
	    allowTrust: 7,
	    accountMerge: 8,
	    inflation: 9,
	    manageDatum: 10,
	    bumpSequence: 11,
	    manageBuyOffer: 12
	  });

	  // === xdr source ============================================================
	  //
	  //   struct CreateAccountOp
	  //   {
	  //       AccountID destination; // account to create
	  //       int64 startingBalance; // amount they end up with
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("CreateAccountOp", [["destination", xdr.lookup("AccountId")], ["startingBalance", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   struct PaymentOp
	  //   {
	  //       AccountID destination; // recipient of the payment
	  //       Asset asset;           // what they end up with
	  //       int64 amount;          // amount they end up with
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("PaymentOp", [["destination", xdr.lookup("AccountId")], ["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   struct PathPaymentOp
	  //   {
	  //       Asset sendAsset; // asset we pay with
	  //       int64 sendMax;   // the maximum amount of sendAsset to
	  //                        // send (excluding fees).
	  //                        // The operation will fail if can't be met
	  //   
	  //       AccountID destination; // recipient of the payment
	  //       Asset destAsset;       // what they end up with
	  //       int64 destAmount;      // amount they end up with
	  //   
	  //       Asset path<5>; // additional hops it must go through to get there
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("PathPaymentOp", [["sendAsset", xdr.lookup("Asset")], ["sendMax", xdr.lookup("Int64")], ["destination", xdr.lookup("AccountId")], ["destAsset", xdr.lookup("Asset")], ["destAmount", xdr.lookup("Int64")], ["path", xdr.varArray(xdr.lookup("Asset"), 5)]]);

	  // === xdr source ============================================================
	  //
	  //   struct ManageSellOfferOp
	  //   {
	  //       Asset selling;
	  //       Asset buying;
	  //       int64 amount; // amount being sold. if set to 0, delete the offer
	  //       Price price;  // price of thing being sold in terms of what you are buying
	  //   
	  //       // 0=create a new offer, otherwise edit an existing offer
	  //       int64 offerID;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ManageSellOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["offerId", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   struct ManageBuyOfferOp
	  //   {
	  //       Asset selling;
	  //       Asset buying;
	  //       int64 buyAmount; // amount being bought. if set to 0, delete the offer
	  //       Price price;     // price of thing being bought in terms of what you are
	  //                        // selling
	  //   
	  //       // 0=create a new offer, otherwise edit an existing offer
	  //       int64 offerID;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ManageBuyOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["buyAmount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["offerId", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   struct CreatePassiveSellOfferOp
	  //   {
	  //       Asset selling; // A
	  //       Asset buying;  // B
	  //       int64 amount;  // amount taker gets. if set to 0, delete the offer
	  //       Price price;   // cost of A in terms of B
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("CreatePassiveSellOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")]]);

	  // === xdr source ============================================================
	  //
	  //   struct SetOptionsOp
	  //   {
	  //       AccountID* inflationDest; // sets the inflation destination
	  //   
	  //       uint32* clearFlags; // which flags to clear
	  //       uint32* setFlags;   // which flags to set
	  //   
	  //       // account threshold manipulation
	  //       uint32* masterWeight; // weight of the master account
	  //       uint32* lowThreshold;
	  //       uint32* medThreshold;
	  //       uint32* highThreshold;
	  //   
	  //       string32* homeDomain; // sets the home domain
	  //   
	  //       // Add, update or remove a signer for the account
	  //       // signer is deleted if the weight is 0
	  //       Signer* signer;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("SetOptionsOp", [["inflationDest", xdr.option(xdr.lookup("AccountId"))], ["clearFlags", xdr.option(xdr.lookup("Uint32"))], ["setFlags", xdr.option(xdr.lookup("Uint32"))], ["masterWeight", xdr.option(xdr.lookup("Uint32"))], ["lowThreshold", xdr.option(xdr.lookup("Uint32"))], ["medThreshold", xdr.option(xdr.lookup("Uint32"))], ["highThreshold", xdr.option(xdr.lookup("Uint32"))], ["homeDomain", xdr.option(xdr.lookup("String32"))], ["signer", xdr.option(xdr.lookup("Signer"))]]);

	  // === xdr source ============================================================
	  //
	  //   struct ChangeTrustOp
	  //   {
	  //       Asset line;
	  //   
	  //       // if limit is set to 0, deletes the trust line
	  //       int64 limit;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ChangeTrustOp", [["line", xdr.lookup("Asset")], ["limit", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (AssetType type)
	  //       {
	  //       // ASSET_TYPE_NATIVE is not allowed
	  //       case ASSET_TYPE_CREDIT_ALPHANUM4:
	  //           AssetCode4 assetCode4;
	  //   
	  //       case ASSET_TYPE_CREDIT_ALPHANUM12:
	  //           AssetCode12 assetCode12;
	  //   
	  //           // add other asset types here in the future
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("AllowTrustOpAsset", {
	    switchOn: xdr.lookup("AssetType"),
	    switchName: "type",
	    switches: [["assetTypeCreditAlphanum4", "assetCode4"], ["assetTypeCreditAlphanum12", "assetCode12"]],
	    arms: {
	      assetCode4: xdr.lookup("AssetCode4"),
	      assetCode12: xdr.lookup("AssetCode12")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct AllowTrustOp
	  //   {
	  //       AccountID trustor;
	  //       union switch (AssetType type)
	  //       {
	  //       // ASSET_TYPE_NATIVE is not allowed
	  //       case ASSET_TYPE_CREDIT_ALPHANUM4:
	  //           AssetCode4 assetCode4;
	  //   
	  //       case ASSET_TYPE_CREDIT_ALPHANUM12:
	  //           AssetCode12 assetCode12;
	  //   
	  //           // add other asset types here in the future
	  //       }
	  //       asset;
	  //   
	  //       bool authorize;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("AllowTrustOp", [["trustor", xdr.lookup("AccountId")], ["asset", xdr.lookup("AllowTrustOpAsset")], ["authorize", xdr.bool()]]);

	  // === xdr source ============================================================
	  //
	  //   struct ManageDataOp
	  //   {
	  //       string64 dataName;
	  //       DataValue* dataValue; // set to null to clear
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ManageDataOp", [["dataName", xdr.lookup("String64")], ["dataValue", xdr.option(xdr.lookup("DataValue"))]]);

	  // === xdr source ============================================================
	  //
	  //   struct BumpSequenceOp
	  //   {
	  //       SequenceNumber bumpTo;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("BumpSequenceOp", [["bumpTo", xdr.lookup("SequenceNumber")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (OperationType type)
	  //       {
	  //       case CREATE_ACCOUNT:
	  //           CreateAccountOp createAccountOp;
	  //       case PAYMENT:
	  //           PaymentOp paymentOp;
	  //       case PATH_PAYMENT:
	  //           PathPaymentOp pathPaymentOp;
	  //       case MANAGE_SELL_OFFER:
	  //           ManageSellOfferOp manageSellOfferOp;
	  //       case CREATE_PASSIVE_SELL_OFFER:
	  //           CreatePassiveSellOfferOp createPassiveSellOfferOp;
	  //       case SET_OPTIONS:
	  //           SetOptionsOp setOptionsOp;
	  //       case CHANGE_TRUST:
	  //           ChangeTrustOp changeTrustOp;
	  //       case ALLOW_TRUST:
	  //           AllowTrustOp allowTrustOp;
	  //       case ACCOUNT_MERGE:
	  //           AccountID destination;
	  //       case INFLATION:
	  //           void;
	  //       case MANAGE_DATA:
	  //           ManageDataOp manageDataOp;
	  //       case BUMP_SEQUENCE:
	  //           BumpSequenceOp bumpSequenceOp;
	  //       case MANAGE_BUY_OFFER:
	  //           ManageBuyOfferOp manageBuyOfferOp;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("OperationBody", {
	    switchOn: xdr.lookup("OperationType"),
	    switchName: "type",
	    switches: [["createAccount", "createAccountOp"], ["payment", "paymentOp"], ["pathPayment", "pathPaymentOp"], ["manageSellOffer", "manageSellOfferOp"], ["createPassiveSellOffer", "createPassiveSellOfferOp"], ["setOption", "setOptionsOp"], ["changeTrust", "changeTrustOp"], ["allowTrust", "allowTrustOp"], ["accountMerge", "destination"], ["inflation", xdr.void()], ["manageDatum", "manageDataOp"], ["bumpSequence", "bumpSequenceOp"], ["manageBuyOffer", "manageBuyOfferOp"]],
	    arms: {
	      createAccountOp: xdr.lookup("CreateAccountOp"),
	      paymentOp: xdr.lookup("PaymentOp"),
	      pathPaymentOp: xdr.lookup("PathPaymentOp"),
	      manageSellOfferOp: xdr.lookup("ManageSellOfferOp"),
	      createPassiveSellOfferOp: xdr.lookup("CreatePassiveSellOfferOp"),
	      setOptionsOp: xdr.lookup("SetOptionsOp"),
	      changeTrustOp: xdr.lookup("ChangeTrustOp"),
	      allowTrustOp: xdr.lookup("AllowTrustOp"),
	      destination: xdr.lookup("AccountId"),
	      manageDataOp: xdr.lookup("ManageDataOp"),
	      bumpSequenceOp: xdr.lookup("BumpSequenceOp"),
	      manageBuyOfferOp: xdr.lookup("ManageBuyOfferOp")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct Operation
	  //   {
	  //       // sourceAccount is the account used to run the operation
	  //       // if not set, the runtime defaults to "sourceAccount" specified at
	  //       // the transaction level
	  //       AccountID* sourceAccount;
	  //   
	  //       union switch (OperationType type)
	  //       {
	  //       case CREATE_ACCOUNT:
	  //           CreateAccountOp createAccountOp;
	  //       case PAYMENT:
	  //           PaymentOp paymentOp;
	  //       case PATH_PAYMENT:
	  //           PathPaymentOp pathPaymentOp;
	  //       case MANAGE_SELL_OFFER:
	  //           ManageSellOfferOp manageSellOfferOp;
	  //       case CREATE_PASSIVE_SELL_OFFER:
	  //           CreatePassiveSellOfferOp createPassiveSellOfferOp;
	  //       case SET_OPTIONS:
	  //           SetOptionsOp setOptionsOp;
	  //       case CHANGE_TRUST:
	  //           ChangeTrustOp changeTrustOp;
	  //       case ALLOW_TRUST:
	  //           AllowTrustOp allowTrustOp;
	  //       case ACCOUNT_MERGE:
	  //           AccountID destination;
	  //       case INFLATION:
	  //           void;
	  //       case MANAGE_DATA:
	  //           ManageDataOp manageDataOp;
	  //       case BUMP_SEQUENCE:
	  //           BumpSequenceOp bumpSequenceOp;
	  //       case MANAGE_BUY_OFFER:
	  //           ManageBuyOfferOp manageBuyOfferOp;
	  //       }
	  //       body;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Operation", [["sourceAccount", xdr.option(xdr.lookup("AccountId"))], ["body", xdr.lookup("OperationBody")]]);

	  // === xdr source ============================================================
	  //
	  //   enum MemoType
	  //   {
	  //       MEMO_NONE = 0,
	  //       MEMO_TEXT = 1,
	  //       MEMO_ID = 2,
	  //       MEMO_HASH = 3,
	  //       MEMO_RETURN = 4
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("MemoType", {
	    memoNone: 0,
	    memoText: 1,
	    memoId: 2,
	    memoHash: 3,
	    memoReturn: 4
	  });

	  // === xdr source ============================================================
	  //
	  //   union Memo switch (MemoType type)
	  //   {
	  //   case MEMO_NONE:
	  //       void;
	  //   case MEMO_TEXT:
	  //       string text<28>;
	  //   case MEMO_ID:
	  //       uint64 id;
	  //   case MEMO_HASH:
	  //       Hash hash; // the hash of what to pull from the content server
	  //   case MEMO_RETURN:
	  //       Hash retHash; // the hash of the tx you are rejecting
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("Memo", {
	    switchOn: xdr.lookup("MemoType"),
	    switchName: "type",
	    switches: [["memoNone", xdr.void()], ["memoText", "text"], ["memoId", "id"], ["memoHash", "hash"], ["memoReturn", "retHash"]],
	    arms: {
	      text: xdr.string(28),
	      id: xdr.lookup("Uint64"),
	      hash: xdr.lookup("Hash"),
	      retHash: xdr.lookup("Hash")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct TimeBounds
	  //   {
	  //       TimePoint minTime;
	  //       TimePoint maxTime; // 0 here means no maxTime
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TimeBounds", [["minTime", xdr.lookup("TimePoint")], ["maxTime", xdr.lookup("TimePoint")]]);

	  // === xdr source ============================================================
	  //
	  //   const MAX_OPS_PER_TX = 100;
	  //
	  // ===========================================================================
	  xdr.const("MAX_OPS_PER_TX", 100);

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("TransactionExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct Transaction
	  //   {
	  //       // account used to run the transaction
	  //       AccountID sourceAccount;
	  //   
	  //       // the fee the sourceAccount will pay
	  //       uint32 fee;
	  //   
	  //       // sequence number to consume in the account
	  //       SequenceNumber seqNum;
	  //   
	  //       // validity range (inclusive) for the last ledger close time
	  //       TimeBounds* timeBounds;
	  //   
	  //       Memo memo;
	  //   
	  //       Operation operations<MAX_OPS_PER_TX>;
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Transaction", [["sourceAccount", xdr.lookup("AccountId")], ["fee", xdr.lookup("Uint32")], ["seqNum", xdr.lookup("SequenceNumber")], ["timeBounds", xdr.option(xdr.lookup("TimeBounds"))], ["memo", xdr.lookup("Memo")], ["operations", xdr.varArray(xdr.lookup("Operation"), xdr.lookup("MAX_OPS_PER_TX"))], ["ext", xdr.lookup("TransactionExt")]]);

	  // === xdr source ============================================================
	  //
	  //   union switch (EnvelopeType type)
	  //       {
	  //       case ENVELOPE_TYPE_TX:
	  //           Transaction tx;
	  //           /* All other values of type are invalid */
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("TransactionSignaturePayloadTaggedTransaction", {
	    switchOn: xdr.lookup("EnvelopeType"),
	    switchName: "type",
	    switches: [["envelopeTypeTx", "tx"]],
	    arms: {
	      tx: xdr.lookup("Transaction")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   struct TransactionSignaturePayload
	  //   {
	  //       Hash networkId;
	  //       union switch (EnvelopeType type)
	  //       {
	  //       case ENVELOPE_TYPE_TX:
	  //           Transaction tx;
	  //           /* All other values of type are invalid */
	  //       }
	  //       taggedTransaction;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionSignaturePayload", [["networkId", xdr.lookup("Hash")], ["taggedTransaction", xdr.lookup("TransactionSignaturePayloadTaggedTransaction")]]);

	  // === xdr source ============================================================
	  //
	  //   struct TransactionEnvelope
	  //   {
	  //       Transaction tx;
	  //       /* Each decorated signature is a signature over the SHA256 hash of
	  //        * a TransactionSignaturePayload */
	  //       DecoratedSignature signatures<20>;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionEnvelope", [["tx", xdr.lookup("Transaction")], ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)]]);

	  // === xdr source ============================================================
	  //
	  //   struct ClaimOfferAtom
	  //   {
	  //       // emitted to identify the offer
	  //       AccountID sellerID; // Account that owns the offer
	  //       int64 offerID;
	  //   
	  //       // amount and asset taken from the owner
	  //       Asset assetSold;
	  //       int64 amountSold;
	  //   
	  //       // amount and asset sent to the owner
	  //       Asset assetBought;
	  //       int64 amountBought;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ClaimOfferAtom", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")], ["assetSold", xdr.lookup("Asset")], ["amountSold", xdr.lookup("Int64")], ["assetBought", xdr.lookup("Asset")], ["amountBought", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   enum CreateAccountResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       CREATE_ACCOUNT_SUCCESS = 0, // account was created
	  //   
	  //       // codes considered as "failure" for the operation
	  //       CREATE_ACCOUNT_MALFORMED = -1,   // invalid destination
	  //       CREATE_ACCOUNT_UNDERFUNDED = -2, // not enough funds in source account
	  //       CREATE_ACCOUNT_LOW_RESERVE =
	  //           -3, // would create an account below the min reserve
	  //       CREATE_ACCOUNT_ALREADY_EXIST = -4 // account already exists
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("CreateAccountResultCode", {
	    createAccountSuccess: 0,
	    createAccountMalformed: -1,
	    createAccountUnderfunded: -2,
	    createAccountLowReserve: -3,
	    createAccountAlreadyExist: -4
	  });

	  // === xdr source ============================================================
	  //
	  //   union CreateAccountResult switch (CreateAccountResultCode code)
	  //   {
	  //   case CREATE_ACCOUNT_SUCCESS:
	  //       void;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("CreateAccountResult", {
	    switchOn: xdr.lookup("CreateAccountResultCode"),
	    switchName: "code",
	    switches: [["createAccountSuccess", xdr.void()]],
	    arms: {},
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum PaymentResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       PAYMENT_SUCCESS = 0, // payment successfuly completed
	  //   
	  //       // codes considered as "failure" for the operation
	  //       PAYMENT_MALFORMED = -1,          // bad input
	  //       PAYMENT_UNDERFUNDED = -2,        // not enough funds in source account
	  //       PAYMENT_SRC_NO_TRUST = -3,       // no trust line on source account
	  //       PAYMENT_SRC_NOT_AUTHORIZED = -4, // source not authorized to transfer
	  //       PAYMENT_NO_DESTINATION = -5,     // destination account does not exist
	  //       PAYMENT_NO_TRUST = -6,       // destination missing a trust line for asset
	  //       PAYMENT_NOT_AUTHORIZED = -7, // destination not authorized to hold asset
	  //       PAYMENT_LINE_FULL = -8,      // destination would go above their limit
	  //       PAYMENT_NO_ISSUER = -9       // missing issuer on asset
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("PaymentResultCode", {
	    paymentSuccess: 0,
	    paymentMalformed: -1,
	    paymentUnderfunded: -2,
	    paymentSrcNoTrust: -3,
	    paymentSrcNotAuthorized: -4,
	    paymentNoDestination: -5,
	    paymentNoTrust: -6,
	    paymentNotAuthorized: -7,
	    paymentLineFull: -8,
	    paymentNoIssuer: -9
	  });

	  // === xdr source ============================================================
	  //
	  //   union PaymentResult switch (PaymentResultCode code)
	  //   {
	  //   case PAYMENT_SUCCESS:
	  //       void;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("PaymentResult", {
	    switchOn: xdr.lookup("PaymentResultCode"),
	    switchName: "code",
	    switches: [["paymentSuccess", xdr.void()]],
	    arms: {},
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum PathPaymentResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       PATH_PAYMENT_SUCCESS = 0, // success
	  //   
	  //       // codes considered as "failure" for the operation
	  //       PATH_PAYMENT_MALFORMED = -1,          // bad input
	  //       PATH_PAYMENT_UNDERFUNDED = -2,        // not enough funds in source account
	  //       PATH_PAYMENT_SRC_NO_TRUST = -3,       // no trust line on source account
	  //       PATH_PAYMENT_SRC_NOT_AUTHORIZED = -4, // source not authorized to transfer
	  //       PATH_PAYMENT_NO_DESTINATION = -5,     // destination account does not exist
	  //       PATH_PAYMENT_NO_TRUST = -6,           // dest missing a trust line for asset
	  //       PATH_PAYMENT_NOT_AUTHORIZED = -7,     // dest not authorized to hold asset
	  //       PATH_PAYMENT_LINE_FULL = -8,          // dest would go above their limit
	  //       PATH_PAYMENT_NO_ISSUER = -9,          // missing issuer on one asset
	  //       PATH_PAYMENT_TOO_FEW_OFFERS = -10,    // not enough offers to satisfy path
	  //       PATH_PAYMENT_OFFER_CROSS_SELF = -11,  // would cross one of its own offers
	  //       PATH_PAYMENT_OVER_SENDMAX = -12       // could not satisfy sendmax
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("PathPaymentResultCode", {
	    pathPaymentSuccess: 0,
	    pathPaymentMalformed: -1,
	    pathPaymentUnderfunded: -2,
	    pathPaymentSrcNoTrust: -3,
	    pathPaymentSrcNotAuthorized: -4,
	    pathPaymentNoDestination: -5,
	    pathPaymentNoTrust: -6,
	    pathPaymentNotAuthorized: -7,
	    pathPaymentLineFull: -8,
	    pathPaymentNoIssuer: -9,
	    pathPaymentTooFewOffer: -10,
	    pathPaymentOfferCrossSelf: -11,
	    pathPaymentOverSendmax: -12
	  });

	  // === xdr source ============================================================
	  //
	  //   struct SimplePaymentResult
	  //   {
	  //       AccountID destination;
	  //       Asset asset;
	  //       int64 amount;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("SimplePaymentResult", [["destination", xdr.lookup("AccountId")], ["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   struct
	  //       {
	  //           ClaimOfferAtom offers<>;
	  //           SimplePaymentResult last;
	  //       }
	  //
	  // ===========================================================================
	  xdr.struct("PathPaymentResultSuccess", [["offers", xdr.varArray(xdr.lookup("ClaimOfferAtom"), 2147483647)], ["last", xdr.lookup("SimplePaymentResult")]]);

	  // === xdr source ============================================================
	  //
	  //   union PathPaymentResult switch (PathPaymentResultCode code)
	  //   {
	  //   case PATH_PAYMENT_SUCCESS:
	  //       struct
	  //       {
	  //           ClaimOfferAtom offers<>;
	  //           SimplePaymentResult last;
	  //       } success;
	  //   case PATH_PAYMENT_NO_ISSUER:
	  //       Asset noIssuer; // the asset that caused the error
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("PathPaymentResult", {
	    switchOn: xdr.lookup("PathPaymentResultCode"),
	    switchName: "code",
	    switches: [["pathPaymentSuccess", "success"], ["pathPaymentNoIssuer", "noIssuer"]],
	    arms: {
	      success: xdr.lookup("PathPaymentResultSuccess"),
	      noIssuer: xdr.lookup("Asset")
	    },
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum ManageSellOfferResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       MANAGE_SELL_OFFER_SUCCESS = 0,
	  //   
	  //       // codes considered as "failure" for the operation
	  //       MANAGE_SELL_OFFER_MALFORMED = -1,     // generated offer would be invalid
	  //       MANAGE_SELL_OFFER_SELL_NO_TRUST = -2, // no trust line for what we're selling
	  //       MANAGE_SELL_OFFER_BUY_NO_TRUST = -3,  // no trust line for what we're buying
	  //       MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED = -4, // not authorized to sell
	  //       MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED = -5,  // not authorized to buy
	  //       MANAGE_SELL_OFFER_LINE_FULL = -6,      // can't receive more of what it's buying
	  //       MANAGE_SELL_OFFER_UNDERFUNDED = -7,    // doesn't hold what it's trying to sell
	  //       MANAGE_SELL_OFFER_CROSS_SELF = -8,     // would cross an offer from the same user
	  //       MANAGE_SELL_OFFER_SELL_NO_ISSUER = -9, // no issuer for what we're selling
	  //       MANAGE_SELL_OFFER_BUY_NO_ISSUER = -10, // no issuer for what we're buying
	  //   
	  //       // update errors
	  //       MANAGE_SELL_OFFER_NOT_FOUND = -11, // offerID does not match an existing offer
	  //   
	  //       MANAGE_SELL_OFFER_LOW_RESERVE = -12 // not enough funds to create a new Offer
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("ManageSellOfferResultCode", {
	    manageSellOfferSuccess: 0,
	    manageSellOfferMalformed: -1,
	    manageSellOfferSellNoTrust: -2,
	    manageSellOfferBuyNoTrust: -3,
	    manageSellOfferSellNotAuthorized: -4,
	    manageSellOfferBuyNotAuthorized: -5,
	    manageSellOfferLineFull: -6,
	    manageSellOfferUnderfunded: -7,
	    manageSellOfferCrossSelf: -8,
	    manageSellOfferSellNoIssuer: -9,
	    manageSellOfferBuyNoIssuer: -10,
	    manageSellOfferNotFound: -11,
	    manageSellOfferLowReserve: -12
	  });

	  // === xdr source ============================================================
	  //
	  //   enum ManageOfferEffect
	  //   {
	  //       MANAGE_OFFER_CREATED = 0,
	  //       MANAGE_OFFER_UPDATED = 1,
	  //       MANAGE_OFFER_DELETED = 2
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("ManageOfferEffect", {
	    manageOfferCreated: 0,
	    manageOfferUpdated: 1,
	    manageOfferDeleted: 2
	  });

	  // === xdr source ============================================================
	  //
	  //   union switch (ManageOfferEffect effect)
	  //       {
	  //       case MANAGE_OFFER_CREATED:
	  //       case MANAGE_OFFER_UPDATED:
	  //           OfferEntry offer;
	  //       default:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("ManageOfferSuccessResultOffer", {
	    switchOn: xdr.lookup("ManageOfferEffect"),
	    switchName: "effect",
	    switches: [["manageOfferCreated", "offer"], ["manageOfferUpdated", "offer"]],
	    arms: {
	      offer: xdr.lookup("OfferEntry")
	    },
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   struct ManageOfferSuccessResult
	  //   {
	  //       // offers that got claimed while creating this offer
	  //       ClaimOfferAtom offersClaimed<>;
	  //   
	  //       union switch (ManageOfferEffect effect)
	  //       {
	  //       case MANAGE_OFFER_CREATED:
	  //       case MANAGE_OFFER_UPDATED:
	  //           OfferEntry offer;
	  //       default:
	  //           void;
	  //       }
	  //       offer;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("ManageOfferSuccessResult", [["offersClaimed", xdr.varArray(xdr.lookup("ClaimOfferAtom"), 2147483647)], ["offer", xdr.lookup("ManageOfferSuccessResultOffer")]]);

	  // === xdr source ============================================================
	  //
	  //   union ManageSellOfferResult switch (ManageSellOfferResultCode code)
	  //   {
	  //   case MANAGE_SELL_OFFER_SUCCESS:
	  //       ManageOfferSuccessResult success;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("ManageSellOfferResult", {
	    switchOn: xdr.lookup("ManageSellOfferResultCode"),
	    switchName: "code",
	    switches: [["manageSellOfferSuccess", "success"]],
	    arms: {
	      success: xdr.lookup("ManageOfferSuccessResult")
	    },
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum ManageBuyOfferResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       MANAGE_BUY_OFFER_SUCCESS = 0,
	  //   
	  //       // codes considered as "failure" for the operation
	  //       MANAGE_BUY_OFFER_MALFORMED = -1,     // generated offer would be invalid
	  //       MANAGE_BUY_OFFER_SELL_NO_TRUST = -2, // no trust line for what we're selling
	  //       MANAGE_BUY_OFFER_BUY_NO_TRUST = -3,  // no trust line for what we're buying
	  //       MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED = -4, // not authorized to sell
	  //       MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED = -5,  // not authorized to buy
	  //       MANAGE_BUY_OFFER_LINE_FULL = -6,      // can't receive more of what it's buying
	  //       MANAGE_BUY_OFFER_UNDERFUNDED = -7,    // doesn't hold what it's trying to sell
	  //       MANAGE_BUY_OFFER_CROSS_SELF = -8,     // would cross an offer from the same user
	  //       MANAGE_BUY_OFFER_SELL_NO_ISSUER = -9, // no issuer for what we're selling
	  //       MANAGE_BUY_OFFER_BUY_NO_ISSUER = -10, // no issuer for what we're buying
	  //   
	  //       // update errors
	  //       MANAGE_BUY_OFFER_NOT_FOUND = -11, // offerID does not match an existing offer
	  //   
	  //       MANAGE_BUY_OFFER_LOW_RESERVE = -12 // not enough funds to create a new Offer
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("ManageBuyOfferResultCode", {
	    manageBuyOfferSuccess: 0,
	    manageBuyOfferMalformed: -1,
	    manageBuyOfferSellNoTrust: -2,
	    manageBuyOfferBuyNoTrust: -3,
	    manageBuyOfferSellNotAuthorized: -4,
	    manageBuyOfferBuyNotAuthorized: -5,
	    manageBuyOfferLineFull: -6,
	    manageBuyOfferUnderfunded: -7,
	    manageBuyOfferCrossSelf: -8,
	    manageBuyOfferSellNoIssuer: -9,
	    manageBuyOfferBuyNoIssuer: -10,
	    manageBuyOfferNotFound: -11,
	    manageBuyOfferLowReserve: -12
	  });

	  // === xdr source ============================================================
	  //
	  //   union ManageBuyOfferResult switch (ManageBuyOfferResultCode code)
	  //   {
	  //   case MANAGE_BUY_OFFER_SUCCESS:
	  //       ManageOfferSuccessResult success;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("ManageBuyOfferResult", {
	    switchOn: xdr.lookup("ManageBuyOfferResultCode"),
	    switchName: "code",
	    switches: [["manageBuyOfferSuccess", "success"]],
	    arms: {
	      success: xdr.lookup("ManageOfferSuccessResult")
	    },
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum SetOptionsResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       SET_OPTIONS_SUCCESS = 0,
	  //       // codes considered as "failure" for the operation
	  //       SET_OPTIONS_LOW_RESERVE = -1,      // not enough funds to add a signer
	  //       SET_OPTIONS_TOO_MANY_SIGNERS = -2, // max number of signers already reached
	  //       SET_OPTIONS_BAD_FLAGS = -3,        // invalid combination of clear/set flags
	  //       SET_OPTIONS_INVALID_INFLATION = -4,      // inflation account does not exist
	  //       SET_OPTIONS_CANT_CHANGE = -5,            // can no longer change this option
	  //       SET_OPTIONS_UNKNOWN_FLAG = -6,           // can't set an unknown flag
	  //       SET_OPTIONS_THRESHOLD_OUT_OF_RANGE = -7, // bad value for weight/threshold
	  //       SET_OPTIONS_BAD_SIGNER = -8,             // signer cannot be masterkey
	  //       SET_OPTIONS_INVALID_HOME_DOMAIN = -9     // malformed home domain
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("SetOptionsResultCode", {
	    setOptionsSuccess: 0,
	    setOptionsLowReserve: -1,
	    setOptionsTooManySigner: -2,
	    setOptionsBadFlag: -3,
	    setOptionsInvalidInflation: -4,
	    setOptionsCantChange: -5,
	    setOptionsUnknownFlag: -6,
	    setOptionsThresholdOutOfRange: -7,
	    setOptionsBadSigner: -8,
	    setOptionsInvalidHomeDomain: -9
	  });

	  // === xdr source ============================================================
	  //
	  //   union SetOptionsResult switch (SetOptionsResultCode code)
	  //   {
	  //   case SET_OPTIONS_SUCCESS:
	  //       void;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("SetOptionsResult", {
	    switchOn: xdr.lookup("SetOptionsResultCode"),
	    switchName: "code",
	    switches: [["setOptionsSuccess", xdr.void()]],
	    arms: {},
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum ChangeTrustResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       CHANGE_TRUST_SUCCESS = 0,
	  //       // codes considered as "failure" for the operation
	  //       CHANGE_TRUST_MALFORMED = -1,     // bad input
	  //       CHANGE_TRUST_NO_ISSUER = -2,     // could not find issuer
	  //       CHANGE_TRUST_INVALID_LIMIT = -3, // cannot drop limit below balance
	  //                                        // cannot create with a limit of 0
	  //       CHANGE_TRUST_LOW_RESERVE =
	  //           -4, // not enough funds to create a new trust line,
	  //       CHANGE_TRUST_SELF_NOT_ALLOWED = -5  // trusting self is not allowed
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("ChangeTrustResultCode", {
	    changeTrustSuccess: 0,
	    changeTrustMalformed: -1,
	    changeTrustNoIssuer: -2,
	    changeTrustInvalidLimit: -3,
	    changeTrustLowReserve: -4,
	    changeTrustSelfNotAllowed: -5
	  });

	  // === xdr source ============================================================
	  //
	  //   union ChangeTrustResult switch (ChangeTrustResultCode code)
	  //   {
	  //   case CHANGE_TRUST_SUCCESS:
	  //       void;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("ChangeTrustResult", {
	    switchOn: xdr.lookup("ChangeTrustResultCode"),
	    switchName: "code",
	    switches: [["changeTrustSuccess", xdr.void()]],
	    arms: {},
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum AllowTrustResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       ALLOW_TRUST_SUCCESS = 0,
	  //       // codes considered as "failure" for the operation
	  //       ALLOW_TRUST_MALFORMED = -1,     // asset is not ASSET_TYPE_ALPHANUM
	  //       ALLOW_TRUST_NO_TRUST_LINE = -2, // trustor does not have a trustline
	  //                                       // source account does not require trust
	  //       ALLOW_TRUST_TRUST_NOT_REQUIRED = -3,
	  //       ALLOW_TRUST_CANT_REVOKE = -4,     // source account can't revoke trust,
	  //       ALLOW_TRUST_SELF_NOT_ALLOWED = -5 // trusting self is not allowed
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("AllowTrustResultCode", {
	    allowTrustSuccess: 0,
	    allowTrustMalformed: -1,
	    allowTrustNoTrustLine: -2,
	    allowTrustTrustNotRequired: -3,
	    allowTrustCantRevoke: -4,
	    allowTrustSelfNotAllowed: -5
	  });

	  // === xdr source ============================================================
	  //
	  //   union AllowTrustResult switch (AllowTrustResultCode code)
	  //   {
	  //   case ALLOW_TRUST_SUCCESS:
	  //       void;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("AllowTrustResult", {
	    switchOn: xdr.lookup("AllowTrustResultCode"),
	    switchName: "code",
	    switches: [["allowTrustSuccess", xdr.void()]],
	    arms: {},
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum AccountMergeResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       ACCOUNT_MERGE_SUCCESS = 0,
	  //       // codes considered as "failure" for the operation
	  //       ACCOUNT_MERGE_MALFORMED = -1,       // can't merge onto itself
	  //       ACCOUNT_MERGE_NO_ACCOUNT = -2,      // destination does not exist
	  //       ACCOUNT_MERGE_IMMUTABLE_SET = -3,   // source account has AUTH_IMMUTABLE set
	  //       ACCOUNT_MERGE_HAS_SUB_ENTRIES = -4, // account has trust lines/offers
	  //       ACCOUNT_MERGE_SEQNUM_TOO_FAR = -5,  // sequence number is over max allowed
	  //       ACCOUNT_MERGE_DEST_FULL = -6        // can't add source balance to
	  //                                           // destination balance
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("AccountMergeResultCode", {
	    accountMergeSuccess: 0,
	    accountMergeMalformed: -1,
	    accountMergeNoAccount: -2,
	    accountMergeImmutableSet: -3,
	    accountMergeHasSubEntry: -4,
	    accountMergeSeqnumTooFar: -5,
	    accountMergeDestFull: -6
	  });

	  // === xdr source ============================================================
	  //
	  //   union AccountMergeResult switch (AccountMergeResultCode code)
	  //   {
	  //   case ACCOUNT_MERGE_SUCCESS:
	  //       int64 sourceAccountBalance; // how much got transfered from source account
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("AccountMergeResult", {
	    switchOn: xdr.lookup("AccountMergeResultCode"),
	    switchName: "code",
	    switches: [["accountMergeSuccess", "sourceAccountBalance"]],
	    arms: {
	      sourceAccountBalance: xdr.lookup("Int64")
	    },
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum InflationResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       INFLATION_SUCCESS = 0,
	  //       // codes considered as "failure" for the operation
	  //       INFLATION_NOT_TIME = -1
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("InflationResultCode", {
	    inflationSuccess: 0,
	    inflationNotTime: -1
	  });

	  // === xdr source ============================================================
	  //
	  //   struct InflationPayout // or use PaymentResultAtom to limit types?
	  //   {
	  //       AccountID destination;
	  //       int64 amount;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("InflationPayout", [["destination", xdr.lookup("AccountId")], ["amount", xdr.lookup("Int64")]]);

	  // === xdr source ============================================================
	  //
	  //   union InflationResult switch (InflationResultCode code)
	  //   {
	  //   case INFLATION_SUCCESS:
	  //       InflationPayout payouts<>;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("InflationResult", {
	    switchOn: xdr.lookup("InflationResultCode"),
	    switchName: "code",
	    switches: [["inflationSuccess", "payouts"]],
	    arms: {
	      payouts: xdr.varArray(xdr.lookup("InflationPayout"), 2147483647)
	    },
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum ManageDataResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       MANAGE_DATA_SUCCESS = 0,
	  //       // codes considered as "failure" for the operation
	  //       MANAGE_DATA_NOT_SUPPORTED_YET =
	  //           -1, // The network hasn't moved to this protocol change yet
	  //       MANAGE_DATA_NAME_NOT_FOUND =
	  //           -2, // Trying to remove a Data Entry that isn't there
	  //       MANAGE_DATA_LOW_RESERVE = -3, // not enough funds to create a new Data Entry
	  //       MANAGE_DATA_INVALID_NAME = -4 // Name not a valid string
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("ManageDataResultCode", {
	    manageDataSuccess: 0,
	    manageDataNotSupportedYet: -1,
	    manageDataNameNotFound: -2,
	    manageDataLowReserve: -3,
	    manageDataInvalidName: -4
	  });

	  // === xdr source ============================================================
	  //
	  //   union ManageDataResult switch (ManageDataResultCode code)
	  //   {
	  //   case MANAGE_DATA_SUCCESS:
	  //       void;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("ManageDataResult", {
	    switchOn: xdr.lookup("ManageDataResultCode"),
	    switchName: "code",
	    switches: [["manageDataSuccess", xdr.void()]],
	    arms: {},
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum BumpSequenceResultCode
	  //   {
	  //       // codes considered as "success" for the operation
	  //       BUMP_SEQUENCE_SUCCESS = 0,
	  //       // codes considered as "failure" for the operation
	  //       BUMP_SEQUENCE_BAD_SEQ = -1 // `bumpTo` is not within bounds
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("BumpSequenceResultCode", {
	    bumpSequenceSuccess: 0,
	    bumpSequenceBadSeq: -1
	  });

	  // === xdr source ============================================================
	  //
	  //   union BumpSequenceResult switch (BumpSequenceResultCode code)
	  //   {
	  //   case BUMP_SEQUENCE_SUCCESS:
	  //       void;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("BumpSequenceResult", {
	    switchOn: xdr.lookup("BumpSequenceResultCode"),
	    switchName: "code",
	    switches: [["bumpSequenceSuccess", xdr.void()]],
	    arms: {},
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum OperationResultCode
	  //   {
	  //       opINNER = 0, // inner object result is valid
	  //   
	  //       opBAD_AUTH = -1,     // too few valid signatures / wrong network
	  //       opNO_ACCOUNT = -2,   // source account was not found
	  //       opNOT_SUPPORTED = -3, // operation not supported at this time
	  //       opTOO_MANY_SUBENTRIES = -4, // max number of subentries already reached
	  //       opEXCEEDED_WORK_LIMIT = -5  // operation did too much work
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("OperationResultCode", {
	    opInner: 0,
	    opBadAuth: -1,
	    opNoAccount: -2,
	    opNotSupported: -3,
	    opTooManySubentry: -4,
	    opExceededWorkLimit: -5
	  });

	  // === xdr source ============================================================
	  //
	  //   union switch (OperationType type)
	  //       {
	  //       case CREATE_ACCOUNT:
	  //           CreateAccountResult createAccountResult;
	  //       case PAYMENT:
	  //           PaymentResult paymentResult;
	  //       case PATH_PAYMENT:
	  //           PathPaymentResult pathPaymentResult;
	  //       case MANAGE_SELL_OFFER:
	  //           ManageSellOfferResult manageSellOfferResult;
	  //       case CREATE_PASSIVE_SELL_OFFER:
	  //           ManageSellOfferResult createPassiveSellOfferResult;
	  //       case SET_OPTIONS:
	  //           SetOptionsResult setOptionsResult;
	  //       case CHANGE_TRUST:
	  //           ChangeTrustResult changeTrustResult;
	  //       case ALLOW_TRUST:
	  //           AllowTrustResult allowTrustResult;
	  //       case ACCOUNT_MERGE:
	  //           AccountMergeResult accountMergeResult;
	  //       case INFLATION:
	  //           InflationResult inflationResult;
	  //       case MANAGE_DATA:
	  //           ManageDataResult manageDataResult;
	  //       case BUMP_SEQUENCE:
	  //           BumpSequenceResult bumpSeqResult;
	  //       case MANAGE_BUY_OFFER:
	  //   	ManageBuyOfferResult manageBuyOfferResult;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("OperationResultTr", {
	    switchOn: xdr.lookup("OperationType"),
	    switchName: "type",
	    switches: [["createAccount", "createAccountResult"], ["payment", "paymentResult"], ["pathPayment", "pathPaymentResult"], ["manageSellOffer", "manageSellOfferResult"], ["createPassiveSellOffer", "createPassiveSellOfferResult"], ["setOption", "setOptionsResult"], ["changeTrust", "changeTrustResult"], ["allowTrust", "allowTrustResult"], ["accountMerge", "accountMergeResult"], ["inflation", "inflationResult"], ["manageDatum", "manageDataResult"], ["bumpSequence", "bumpSeqResult"], ["manageBuyOffer", "manageBuyOfferResult"]],
	    arms: {
	      createAccountResult: xdr.lookup("CreateAccountResult"),
	      paymentResult: xdr.lookup("PaymentResult"),
	      pathPaymentResult: xdr.lookup("PathPaymentResult"),
	      manageSellOfferResult: xdr.lookup("ManageSellOfferResult"),
	      createPassiveSellOfferResult: xdr.lookup("ManageSellOfferResult"),
	      setOptionsResult: xdr.lookup("SetOptionsResult"),
	      changeTrustResult: xdr.lookup("ChangeTrustResult"),
	      allowTrustResult: xdr.lookup("AllowTrustResult"),
	      accountMergeResult: xdr.lookup("AccountMergeResult"),
	      inflationResult: xdr.lookup("InflationResult"),
	      manageDataResult: xdr.lookup("ManageDataResult"),
	      bumpSeqResult: xdr.lookup("BumpSequenceResult"),
	      manageBuyOfferResult: xdr.lookup("ManageBuyOfferResult")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   union OperationResult switch (OperationResultCode code)
	  //   {
	  //   case opINNER:
	  //       union switch (OperationType type)
	  //       {
	  //       case CREATE_ACCOUNT:
	  //           CreateAccountResult createAccountResult;
	  //       case PAYMENT:
	  //           PaymentResult paymentResult;
	  //       case PATH_PAYMENT:
	  //           PathPaymentResult pathPaymentResult;
	  //       case MANAGE_SELL_OFFER:
	  //           ManageSellOfferResult manageSellOfferResult;
	  //       case CREATE_PASSIVE_SELL_OFFER:
	  //           ManageSellOfferResult createPassiveSellOfferResult;
	  //       case SET_OPTIONS:
	  //           SetOptionsResult setOptionsResult;
	  //       case CHANGE_TRUST:
	  //           ChangeTrustResult changeTrustResult;
	  //       case ALLOW_TRUST:
	  //           AllowTrustResult allowTrustResult;
	  //       case ACCOUNT_MERGE:
	  //           AccountMergeResult accountMergeResult;
	  //       case INFLATION:
	  //           InflationResult inflationResult;
	  //       case MANAGE_DATA:
	  //           ManageDataResult manageDataResult;
	  //       case BUMP_SEQUENCE:
	  //           BumpSequenceResult bumpSeqResult;
	  //       case MANAGE_BUY_OFFER:
	  //   	ManageBuyOfferResult manageBuyOfferResult;
	  //       }
	  //       tr;
	  //   default:
	  //       void;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("OperationResult", {
	    switchOn: xdr.lookup("OperationResultCode"),
	    switchName: "code",
	    switches: [["opInner", "tr"]],
	    arms: {
	      tr: xdr.lookup("OperationResultTr")
	    },
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   enum TransactionResultCode
	  //   {
	  //       txSUCCESS = 0, // all operations succeeded
	  //   
	  //       txFAILED = -1, // one of the operations failed (none were applied)
	  //   
	  //       txTOO_EARLY = -2,         // ledger closeTime before minTime
	  //       txTOO_LATE = -3,          // ledger closeTime after maxTime
	  //       txMISSING_OPERATION = -4, // no operation was specified
	  //       txBAD_SEQ = -5,           // sequence number does not match source account
	  //   
	  //       txBAD_AUTH = -6,             // too few valid signatures / wrong network
	  //       txINSUFFICIENT_BALANCE = -7, // fee would bring account below reserve
	  //       txNO_ACCOUNT = -8,           // source account not found
	  //       txINSUFFICIENT_FEE = -9,     // fee is too small
	  //       txBAD_AUTH_EXTRA = -10,      // unused signatures attached to transaction
	  //       txINTERNAL_ERROR = -11       // an unknown error occured
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("TransactionResultCode", {
	    txSuccess: 0,
	    txFailed: -1,
	    txTooEarly: -2,
	    txTooLate: -3,
	    txMissingOperation: -4,
	    txBadSeq: -5,
	    txBadAuth: -6,
	    txInsufficientBalance: -7,
	    txNoAccount: -8,
	    txInsufficientFee: -9,
	    txBadAuthExtra: -10,
	    txInternalError: -11
	  });

	  // === xdr source ============================================================
	  //
	  //   union switch (TransactionResultCode code)
	  //       {
	  //       case txSUCCESS:
	  //       case txFAILED:
	  //           OperationResult results<>;
	  //       default:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("TransactionResultResult", {
	    switchOn: xdr.lookup("TransactionResultCode"),
	    switchName: "code",
	    switches: [["txSuccess", "results"], ["txFailed", "results"]],
	    arms: {
	      results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647)
	    },
	    defaultArm: xdr.void()
	  });

	  // === xdr source ============================================================
	  //
	  //   union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //
	  // ===========================================================================
	  xdr.union("TransactionResultExt", {
	    switchOn: xdr.int(),
	    switchName: "v",
	    switches: [[0, xdr.void()]],
	    arms: {}
	  });

	  // === xdr source ============================================================
	  //
	  //   struct TransactionResult
	  //   {
	  //       int64 feeCharged; // actual fee charged for the transaction
	  //   
	  //       union switch (TransactionResultCode code)
	  //       {
	  //       case txSUCCESS:
	  //       case txFAILED:
	  //           OperationResult results<>;
	  //       default:
	  //           void;
	  //       }
	  //       result;
	  //   
	  //       // reserved for future use
	  //       union switch (int v)
	  //       {
	  //       case 0:
	  //           void;
	  //       }
	  //       ext;
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("TransactionResult", [["feeCharged", xdr.lookup("Int64")], ["result", xdr.lookup("TransactionResultResult")], ["ext", xdr.lookup("TransactionResultExt")]]);

	  // === xdr source ============================================================
	  //
	  //   typedef opaque Hash[32];
	  //
	  // ===========================================================================
	  xdr.typedef("Hash", xdr.opaque(32));

	  // === xdr source ============================================================
	  //
	  //   typedef opaque uint256[32];
	  //
	  // ===========================================================================
	  xdr.typedef("Uint256", xdr.opaque(32));

	  // === xdr source ============================================================
	  //
	  //   typedef unsigned int uint32;
	  //
	  // ===========================================================================
	  xdr.typedef("Uint32", xdr.uint());

	  // === xdr source ============================================================
	  //
	  //   typedef int int32;
	  //
	  // ===========================================================================
	  xdr.typedef("Int32", xdr.int());

	  // === xdr source ============================================================
	  //
	  //   typedef unsigned hyper uint64;
	  //
	  // ===========================================================================
	  xdr.typedef("Uint64", xdr.uhyper());

	  // === xdr source ============================================================
	  //
	  //   typedef hyper int64;
	  //
	  // ===========================================================================
	  xdr.typedef("Int64", xdr.hyper());

	  // === xdr source ============================================================
	  //
	  //   enum CryptoKeyType
	  //   {
	  //       KEY_TYPE_ED25519 = 0,
	  //       KEY_TYPE_PRE_AUTH_TX = 1,
	  //       KEY_TYPE_HASH_X = 2
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("CryptoKeyType", {
	    keyTypeEd25519: 0,
	    keyTypePreAuthTx: 1,
	    keyTypeHashX: 2
	  });

	  // === xdr source ============================================================
	  //
	  //   enum PublicKeyType
	  //   {
	  //       PUBLIC_KEY_TYPE_ED25519 = KEY_TYPE_ED25519
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("PublicKeyType", {
	    publicKeyTypeEd25519: 0
	  });

	  // === xdr source ============================================================
	  //
	  //   enum SignerKeyType
	  //   {
	  //       SIGNER_KEY_TYPE_ED25519 = KEY_TYPE_ED25519,
	  //       SIGNER_KEY_TYPE_PRE_AUTH_TX = KEY_TYPE_PRE_AUTH_TX,
	  //       SIGNER_KEY_TYPE_HASH_X = KEY_TYPE_HASH_X
	  //   };
	  //
	  // ===========================================================================
	  xdr.enum("SignerKeyType", {
	    signerKeyTypeEd25519: 0,
	    signerKeyTypePreAuthTx: 1,
	    signerKeyTypeHashX: 2
	  });

	  // === xdr source ============================================================
	  //
	  //   union PublicKey switch (PublicKeyType type)
	  //   {
	  //   case PUBLIC_KEY_TYPE_ED25519:
	  //       uint256 ed25519;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("PublicKey", {
	    switchOn: xdr.lookup("PublicKeyType"),
	    switchName: "type",
	    switches: [["publicKeyTypeEd25519", "ed25519"]],
	    arms: {
	      ed25519: xdr.lookup("Uint256")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   union SignerKey switch (SignerKeyType type)
	  //   {
	  //   case SIGNER_KEY_TYPE_ED25519:
	  //       uint256 ed25519;
	  //   case SIGNER_KEY_TYPE_PRE_AUTH_TX:
	  //       /* SHA-256 Hash of TransactionSignaturePayload structure */
	  //       uint256 preAuthTx;
	  //   case SIGNER_KEY_TYPE_HASH_X:
	  //       /* Hash of random 256 bit preimage X */
	  //       uint256 hashX;
	  //   };
	  //
	  // ===========================================================================
	  xdr.union("SignerKey", {
	    switchOn: xdr.lookup("SignerKeyType"),
	    switchName: "type",
	    switches: [["signerKeyTypeEd25519", "ed25519"], ["signerKeyTypePreAuthTx", "preAuthTx"], ["signerKeyTypeHashX", "hashX"]],
	    arms: {
	      ed25519: xdr.lookup("Uint256"),
	      preAuthTx: xdr.lookup("Uint256"),
	      hashX: xdr.lookup("Uint256")
	    }
	  });

	  // === xdr source ============================================================
	  //
	  //   typedef opaque Signature<64>;
	  //
	  // ===========================================================================
	  xdr.typedef("Signature", xdr.varOpaque(64));

	  // === xdr source ============================================================
	  //
	  //   typedef opaque SignatureHint[4];
	  //
	  // ===========================================================================
	  xdr.typedef("SignatureHint", xdr.opaque(4));

	  // === xdr source ============================================================
	  //
	  //   typedef PublicKey NodeID;
	  //
	  // ===========================================================================
	  xdr.typedef("NodeId", xdr.lookup("PublicKey"));

	  // === xdr source ============================================================
	  //
	  //   struct Curve25519Secret
	  //   {
	  //           opaque key[32];
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Curve25519Secret", [["key", xdr.opaque(32)]]);

	  // === xdr source ============================================================
	  //
	  //   struct Curve25519Public
	  //   {
	  //           opaque key[32];
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("Curve25519Public", [["key", xdr.opaque(32)]]);

	  // === xdr source ============================================================
	  //
	  //   struct HmacSha256Key
	  //   {
	  //           opaque key[32];
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("HmacSha256Key", [["key", xdr.opaque(32)]]);

	  // === xdr source ============================================================
	  //
	  //   struct HmacSha256Mac
	  //   {
	  //           opaque mac[32];
	  //   };
	  //
	  // ===========================================================================
	  xdr.struct("HmacSha256Mac", [["mac", xdr.opaque(32)]]);
	}); // Automatically generated on 2019-04-30T12:43:38-07:00
	// DO NOT EDIT or your changes may be overwritten

	/* jshint maxstatements:2147483647  */
	/* jshint esnext:true  */

	exports.default = types;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _types = __webpack_require__(66);

	Object.keys(_types).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _types[key];
	    }
	  });
	});

	var _config = __webpack_require__(308);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _int = __webpack_require__(67);

	Object.keys(_int).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _int[key];
	    }
	  });
	});

	var _hyper = __webpack_require__(209);

	Object.keys(_hyper).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _hyper[key];
	    }
	  });
	});

	var _unsignedInt = __webpack_require__(212);

	Object.keys(_unsignedInt).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _unsignedInt[key];
	    }
	  });
	});

	var _unsignedHyper = __webpack_require__(213);

	Object.keys(_unsignedHyper).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _unsignedHyper[key];
	    }
	  });
	});

	var _float = __webpack_require__(214);

	Object.keys(_float).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _float[key];
	    }
	  });
	});

	var _double = __webpack_require__(215);

	Object.keys(_double).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _double[key];
	    }
	  });
	});

	var _quadruple = __webpack_require__(216);

	Object.keys(_quadruple).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _quadruple[key];
	    }
	  });
	});

	var _bool = __webpack_require__(217);

	Object.keys(_bool).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _bool[key];
	    }
	  });
	});

	var _string = __webpack_require__(219);

	Object.keys(_string).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _string[key];
	    }
	  });
	});

	var _opaque = __webpack_require__(220);

	Object.keys(_opaque).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _opaque[key];
	    }
	  });
	});

	var _varOpaque = __webpack_require__(221);

	Object.keys(_varOpaque).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _varOpaque[key];
	    }
	  });
	});

	var _array = __webpack_require__(222);

	Object.keys(_array).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _array[key];
	    }
	  });
	});

	var _varArray = __webpack_require__(231);

	Object.keys(_varArray).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _varArray[key];
	    }
	  });
	});

	var _option = __webpack_require__(232);

	Object.keys(_option).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _option[key];
	    }
	  });
	});

	var _void = __webpack_require__(233);

	Object.keys(_void).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _void[key];
	    }
	  });
	});

	var _enum = __webpack_require__(234);

	Object.keys(_enum).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _enum[key];
	    }
	  });
	});

	var _struct = __webpack_require__(304);

	Object.keys(_struct).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _struct[key];
	    }
	  });
	});

	var _union = __webpack_require__(309);

	Object.keys(_union).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _union[key];
	    }
	  });
	});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Int = undefined;

	var _isNumber = __webpack_require__(68);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Int = exports.Int = {
	  read: function read(io) {
	    return io.readInt32BE();
	  },
	  write: function write(value, io) {
	    if (!(0, _isNumber2.default)(value)) {
	      throw new Error('XDR Write Error: not a number');
	    }

	    if (Math.floor(value) !== value) {
	      throw new Error('XDR Write Error: not an integer');
	    }

	    io.writeInt32BE(value);
	  },
	  isValid: function isValid(value) {
	    if (!(0, _isNumber2.default)(value)) {
	      return false;
	    }
	    if (Math.floor(value) !== value) {
	      return false;
	    }

	    return value >= Int.MIN_VALUE && value <= Int.MAX_VALUE;
	  }
	};

	Int.MAX_VALUE = Math.pow(2, 31) - 1;
	Int.MIN_VALUE = -Math.pow(2, 31);

	(0, _ioMixin2.default)(Int);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(56),
	    isObjectLike = __webpack_require__(63);

	/** `Object#toString` result references. */
	var numberTag = '[object Number]';

	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && baseGetTag(value) == numberTag);
	}

	module.exports = isNumber;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = includeIoMixin;

	var _extend = __webpack_require__(70);

	var _extend2 = _interopRequireDefault(_extend);

	var _isFunction = __webpack_require__(78);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _cursor = __webpack_require__(113);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// TODO: build a system to grow a buffer as we write to it
	var BUFFER_SIZE = Math.pow(2, 16);

	var staticMethods = {
	  toXDR: function toXDR(val) {
	    var cursor = new _cursor.Cursor(BUFFER_SIZE);
	    this.write(val, cursor);
	    var bytesWritten = cursor.tell();
	    cursor.rewind();

	    return cursor.slice(bytesWritten).buffer();
	  },
	  fromXDR: function fromXDR(input) {
	    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'raw';

	    var buffer = void 0;
	    switch (format) {
	      case 'raw':
	        buffer = input;
	        break;
	      case 'hex':
	        buffer = Buffer.from(input, 'hex');
	        break;
	      case 'base64':
	        buffer = Buffer.from(input, 'base64');
	        break;
	      default:
	        throw new Error('Invalid format ' + format + ', must be "raw", "hex", "base64"');
	    }

	    var cursor = new _cursor.Cursor(buffer);
	    var result = this.read(cursor);

	    // TODO: error out if the entire buffer isn't consumed

	    return result;
	  }
	};

	var instanceMethods = {
	  toXDR: function toXDR() {
	    var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'raw';

	    var buffer = this.constructor.toXDR(this);
	    switch (format) {
	      case 'raw':
	        return buffer;
	      case 'hex':
	        return buffer.toString('hex');
	      case 'base64':
	        return buffer.toString('base64');
	      default:
	        throw new Error('Invalid format ' + format + ', must be "raw", "hex", "base64"');
	    }
	  }
	};

	function includeIoMixin(obj) {
	  (0, _extend2.default)(obj, staticMethods);

	  if ((0, _isFunction2.default)(obj)) {
	    (0, _extend2.default)(obj.prototype, instanceMethods);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(71);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(72),
	    createAssigner = __webpack_require__(85),
	    keysIn = __webpack_require__(98);

	/**
	 * This method is like `_.assign` except that it iterates over own and
	 * inherited source properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assign
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
	 */
	var assignIn = createAssigner(function(object, source) {
	  copyObject(source, keysIn(source), object);
	});

	module.exports = assignIn;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(73),
	    baseAssignValue = __webpack_require__(74);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(74),
	    eq = __webpack_require__(84);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(75);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(76);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(77),
	    getValue = __webpack_require__(83);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(78),
	    isMasked = __webpack_require__(80),
	    isObject = __webpack_require__(79),
	    toSource = __webpack_require__(82);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(56),
	    isObject = __webpack_require__(79);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ }),
/* 79 */
/***/ (function(module, exports) {

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


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(81);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(58);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ }),
/* 82 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(86),
	    isIterateeCall = __webpack_require__(94);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(87),
	    overRest = __webpack_require__(88),
	    setToString = __webpack_require__(90);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ }),
/* 87 */
/***/ (function(module, exports) {

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


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(89);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ }),
/* 89 */
/***/ (function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(91),
	    shortOut = __webpack_require__(93);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(92),
	    defineProperty = __webpack_require__(75),
	    identity = __webpack_require__(87);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ }),
/* 93 */
/***/ (function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(84),
	    isArrayLike = __webpack_require__(95),
	    isIndex = __webpack_require__(97),
	    isObject = __webpack_require__(79);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(78),
	    isLength = __webpack_require__(96);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ }),
/* 96 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(99),
	    baseKeysIn = __webpack_require__(110),
	    isArrayLike = __webpack_require__(95);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
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
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(100),
	    isArguments = __webpack_require__(101),
	    isArray = __webpack_require__(62),
	    isBuffer = __webpack_require__(103),
	    isIndex = __webpack_require__(97),
	    isTypedArray = __webpack_require__(106);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(102),
	    isObjectLike = __webpack_require__(63);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(56),
	    isObjectLike = __webpack_require__(63);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(58),
	    stubFalse = __webpack_require__(105);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)(module)))

/***/ }),
/* 104 */
/***/ (function(module, exports) {

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


/***/ }),
/* 105 */
/***/ (function(module, exports) {

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


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(107),
	    baseUnary = __webpack_require__(108),
	    nodeUtil = __webpack_require__(109);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(56),
	    isLength = __webpack_require__(96),
	    isObjectLike = __webpack_require__(63);

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
	    dataViewTag = '[object DataView]',
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
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ }),
/* 108 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(59);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)(module)))

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(79),
	    isPrototype = __webpack_require__(111),
	    nativeKeysIn = __webpack_require__(112);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ }),
/* 111 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Cursor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cursor = __webpack_require__(114);

	var _cursor2 = _interopRequireDefault(_cursor);

	var _util = __webpack_require__(118);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Cursor = exports.Cursor = function (_BaseCursor) {
	  _inherits(Cursor, _BaseCursor);

	  function Cursor() {
	    _classCallCheck(this, Cursor);

	    return _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).apply(this, arguments));
	  }

	  _createClass(Cursor, [{
	    key: 'writeBufferPadded',
	    value: function writeBufferPadded(buffer) {
	      var padding = (0, _util.calculatePadding)(buffer.length);
	      var paddingBuffer = Buffer.alloc(padding);

	      return this.copyFrom(new Cursor(buffer)).copyFrom(new Cursor(paddingBuffer));
	    }
	  }]);

	  return Cursor;
	}(_cursor2.default);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var Cursor = function(buffer)
	{
		if (!(this instanceof Cursor))
		{
			return new Cursor(buffer);
		}

		if (!(buffer instanceof Buffer))
		{
			buffer = new Buffer(buffer);
		}

		this._setBuffer(buffer);
		this.rewind();
	};

	Cursor.prototype._setBuffer = function(buffer)
	{
		this._buffer = buffer;
		this.length = buffer.length;
	};

	Cursor.prototype.buffer = function()
	{
		return this._buffer;
	};

	Cursor.prototype.tap = function(cb)
	{
		cb(this);
		return this;
	};

	Cursor.prototype.clone = function(newIndex)
	{
		var c = new this.constructor(this.buffer());
		c.seek(arguments.length === 0 ? this.tell() : newIndex);

		return c;
	};

	Cursor.prototype.tell = function()
	{
		return this._index;
	};

	Cursor.prototype.seek = function(op, index)
	{
		if (arguments.length == 1)
		{
			index = op;
			op = '=';
		}

		if (op == '+')
		{
			this._index += index;
		}
		else if (op == '-')
		{
			this._index -= index;
		}
		else
		{
			this._index = index;
		}

		return this;
	};

	Cursor.prototype.rewind = function()
	{
		return this.seek(0);
	};

	Cursor.prototype.eof = function()
	{
		return this.tell() == this.buffer().length;
	};

	Cursor.prototype.write = function(string, length, encoding)
	{
		return this.seek('+', this.buffer().write(string, this.tell(), length, encoding));
	};

	Cursor.prototype.fill = function(value, length)
	{
		if (arguments.length == 1)
		{
			length = this.buffer().length - this.tell();
		}
		
		this.buffer().fill(value, this.tell(), this.tell() + length);
		this.seek('+', length);

		return this;
	};

	Cursor.prototype.slice = function(length)
	{
		if (arguments.length === 0)
		{
			length = this.length - this.tell();
		}

		var c = new this.constructor(this.buffer().slice(this.tell(), this.tell() + length));
		this.seek('+', length);

		return c;
	};

	Cursor.prototype.copyFrom = function(source)
	{
		var buf = source instanceof Buffer ? source: source.buffer();
		buf.copy(this.buffer(), this.tell(), 0, buf.length);
		this.seek('+', buf.length);

		return this;
	};

	Cursor.prototype.concat = function(list)
	{
		for (var i in list)
		{
			if (list[i] instanceof Cursor)
			{
				list[i] = list[i].buffer();
			}
		}

		list.unshift(this.buffer());

		var b = Buffer.concat(list);
		this._setBuffer(b);

		return this;
	};

	Cursor.prototype.toString = function(encoding, length)
	{
		if (arguments.length === 0)
		{
			encoding = 'utf8';
			length = this.buffer().length - this.tell();
		}
		else if (arguments.length === 1)
		{
			length = this.buffer().length - this.tell();
		}

		var val = this.buffer().toString(encoding, this.tell(), this.tell() + length);
		this.seek('+', length);

		return val;
	};

	[
		[1, ['readInt8', 'readUInt8']],
		[2, ['readInt16BE', 'readInt16LE', 'readUInt16BE', 'readUInt16LE']],
		[4, ['readInt32BE', 'readInt32LE', 'readUInt32BE', 'readUInt32LE', 'readFloatBE', 'readFloatLE']],
		[8, ['readDoubleBE', 'readDoubleLE']]
	].forEach(function(arr)
	{
		arr[1].forEach(function(method)
		{
			Cursor.prototype[method] = function()
			{
				var val = this.buffer()[method](this.tell());
				this.seek('+', arr[0]);

				return val;
			};
		});
	});

	[
		[1, ['writeInt8', 'writeUInt8']],
		[2, ['writeInt16BE', 'writeInt16LE', 'writeUInt16BE', 'writeUInt16LE']],
		[4, ['writeInt32BE', 'writeInt32LE', 'writeUInt32BE', 'writeUInt32LE', 'writeFloatBE', 'writeFloatLE']],
		[8, ['writeDoubleBE', 'writeDoubleLE']]
	].forEach(function(arr)
	{
		arr[1].forEach(function(method)
		{
			Cursor.prototype[method] = function(val)
			{
				val = this.buffer()[method](val, this.tell());
				this.seek('+', arr[0]);

				return this;
			};
		});
	});

	//basic extend functionality to facilitate
	//writing your own cursor while still providing
	//access to low level r/w functionality
	Cursor.extend = function(C, proto)
	{
		var parent = this;

		if (arguments.length === 1)
		{
			proto = C;
			C = null;
		}

		proto = proto || {};

		C = C || function ctor(buffer)
		{
			if (!(this instanceof C))
			{
				return new C(buffer);
			}

			parent.call(this, buffer);
		};

		__webpack_require__(115).inherits(C, parent);

		C.extend = parent.extend;
		C.define = parent.define;

		for (var i in proto)
		{
			C.define(i, proto[i]);
		}

		return C;
	};

	Cursor.define = function(name, fn)
	{
		var proto = this.prototype[name];

		this.prototype[name] = proto && function()
		{
			this.__super = proto;
			return fn.apply(this, arguments);
		} || fn;
	};

	module.exports = Cursor;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
	  function getOwnPropertyDescriptors(obj) {
	    var keys = Object.keys(obj);
	    var descriptors = {};
	    for (var i = 0; i < keys.length; i++) {
	      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
	    }
	    return descriptors;
	  };

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(117);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(5);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

	exports.promisify = function promisify(original) {
	  if (typeof original !== 'function')
	    throw new TypeError('The "original" argument must be of type Function');

	  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
	    var fn = original[kCustomPromisifiedSymbol];
	    if (typeof fn !== 'function') {
	      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
	    }
	    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	      value: fn, enumerable: false, writable: false, configurable: true
	    });
	    return fn;
	  }

	  function fn() {
	    var promiseResolve, promiseReject;
	    var promise = new Promise(function (resolve, reject) {
	      promiseResolve = resolve;
	      promiseReject = reject;
	    });

	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args.push(arguments[i]);
	    }
	    args.push(function (err, value) {
	      if (err) {
	        promiseReject(err);
	      } else {
	        promiseResolve(value);
	      }
	    });

	    try {
	      original.apply(this, args);
	    } catch (err) {
	      promiseReject(err);
	    }

	    return promise;
	  }

	  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

	  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	    value: fn, enumerable: false, writable: false, configurable: true
	  });
	  return Object.defineProperties(
	    fn,
	    getOwnPropertyDescriptors(original)
	  );
	}

	exports.promisify.custom = kCustomPromisifiedSymbol

	function callbackifyOnRejected(reason, cb) {
	  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
	  // Because `null` is a special error value in callbacks which means "no error
	  // occurred", we error-wrap so the callback consumer can distinguish between
	  // "the promise rejected with null" or "the promise fulfilled with undefined".
	  if (!reason) {
	    var newReason = new Error('Promise was rejected with a falsy value');
	    newReason.reason = reason;
	    reason = newReason;
	  }
	  return cb(reason);
	}

	function callbackify(original) {
	  if (typeof original !== 'function') {
	    throw new TypeError('The "original" argument must be of type Function');
	  }

	  // We DO NOT return the promise as it gives the user a false sense that
	  // the promise is actually somehow related to the callback's execution
	  // and that the callback throwing will reject the promise.
	  function callbackified() {
	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args.push(arguments[i]);
	    }

	    var maybeCb = args.pop();
	    if (typeof maybeCb !== 'function') {
	      throw new TypeError('The last argument must be of type Function');
	    }
	    var self = this;
	    var cb = function() {
	      return maybeCb.apply(self, arguments);
	    };
	    // In true node style we process the callback on `nextTick` with all the
	    // implications (stack, `uncaughtException`, `async_hooks`)
	    original.apply(this, args)
	      .then(function(ret) { process.nextTick(cb, null, ret) },
	            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
	  }

	  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
	  Object.defineProperties(callbackified,
	                          getOwnPropertyDescriptors(original));
	  return callbackified;
	}
	exports.callbackify = callbackify;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(116)))

/***/ }),
/* 116 */
/***/ (function(module, exports) {

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
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 117 */
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.calculatePadding = calculatePadding;
	exports.slicePadding = slicePadding;

	var _every = __webpack_require__(119);

	var _every2 = _interopRequireDefault(_every);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function calculatePadding(length) {
	  switch (length % 4) {
	    case 0:
	      return 0;
	    case 1:
	      return 3;
	    case 2:
	      return 2;
	    case 3:
	      return 1;
	    default:
	      return null;
	  }
	}
	function slicePadding(io, length) {
	  var padding = io.slice(length);
	  var allZero = (0, _every2.default)(padding.buffer(), function (byte) {
	    return byte === 0;
	  });

	  if (allZero !== true) {
	    throw new Error('XDR Read Error: invalid padding');
	  }
	}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(120),
	    baseEvery = __webpack_require__(121),
	    baseIteratee = __webpack_require__(131),
	    isArray = __webpack_require__(62),
	    isIterateeCall = __webpack_require__(94);

	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * Iteration is stopped once `predicate` returns falsey. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * **Note:** This method returns `true` for
	 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
	 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
	 * elements of empty collections.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.every([true, 1, null, 'yes'], Boolean);
	 * // => false
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': false },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.every(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.every(users, 'active');
	 * // => false
	 */
	function every(collection, predicate, guard) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = every;


/***/ }),
/* 120 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = arrayEvery;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(122);

	/**
	 * The base implementation of `_.every` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`
	 */
	function baseEvery(collection, predicate) {
	  var result = true;
	  baseEach(collection, function(value, index, collection) {
	    result = !!predicate(value, index, collection);
	    return result;
	  });
	  return result;
	}

	module.exports = baseEvery;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(123),
	    createBaseEach = __webpack_require__(130);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(124),
	    keys = __webpack_require__(126);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(125);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ }),
/* 125 */
/***/ (function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(99),
	    baseKeys = __webpack_require__(127),
	    isArrayLike = __webpack_require__(95);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
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
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(111),
	    nativeKeys = __webpack_require__(128);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(129);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ }),
/* 129 */
/***/ (function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(95);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(132),
	    baseMatchesProperty = __webpack_require__(190),
	    identity = __webpack_require__(87),
	    isArray = __webpack_require__(62),
	    property = __webpack_require__(206);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(133),
	    getMatchData = __webpack_require__(187),
	    matchesStrictComparable = __webpack_require__(189);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(134),
	    baseIsEqual = __webpack_require__(163);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(135),
	    stackClear = __webpack_require__(142),
	    stackDelete = __webpack_require__(143),
	    stackGet = __webpack_require__(144),
	    stackHas = __webpack_require__(145),
	    stackSet = __webpack_require__(146);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(136),
	    listCacheDelete = __webpack_require__(137),
	    listCacheGet = __webpack_require__(139),
	    listCacheHas = __webpack_require__(140),
	    listCacheSet = __webpack_require__(141);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ }),
/* 136 */
/***/ (function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(138);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(84);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(138);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(138);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(138);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(135);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ }),
/* 143 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ }),
/* 144 */
/***/ (function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ }),
/* 145 */
/***/ (function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(135),
	    Map = __webpack_require__(147),
	    MapCache = __webpack_require__(148);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(76),
	    root = __webpack_require__(58);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(149),
	    mapCacheDelete = __webpack_require__(157),
	    mapCacheGet = __webpack_require__(160),
	    mapCacheHas = __webpack_require__(161),
	    mapCacheSet = __webpack_require__(162);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(150),
	    ListCache = __webpack_require__(135),
	    Map = __webpack_require__(147);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(151),
	    hashDelete = __webpack_require__(153),
	    hashGet = __webpack_require__(154),
	    hashHas = __webpack_require__(155),
	    hashSet = __webpack_require__(156);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(152);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(76);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ }),
/* 153 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(152);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(152);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(152);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(158);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(159);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ }),
/* 159 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(158);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(158);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(158);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(164),
	    isObjectLike = __webpack_require__(63);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(134),
	    equalArrays = __webpack_require__(165),
	    equalByTag = __webpack_require__(171),
	    equalObjects = __webpack_require__(175),
	    getTag = __webpack_require__(182),
	    isArray = __webpack_require__(62),
	    isBuffer = __webpack_require__(103),
	    isTypedArray = __webpack_require__(106);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);

	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;

	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(166),
	    arraySome = __webpack_require__(169),
	    cacheHas = __webpack_require__(170);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(148),
	    setCacheAdd = __webpack_require__(167),
	    setCacheHas = __webpack_require__(168);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ }),
/* 167 */
/***/ (function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ }),
/* 168 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ }),
/* 169 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ }),
/* 170 */
/***/ (function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(57),
	    Uint8Array = __webpack_require__(172),
	    eq = __webpack_require__(84),
	    equalArrays = __webpack_require__(165),
	    mapToArray = __webpack_require__(173),
	    setToArray = __webpack_require__(174);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(58);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ }),
/* 173 */
/***/ (function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ }),
/* 174 */
/***/ (function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(176);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(177),
	    getSymbols = __webpack_require__(179),
	    keys = __webpack_require__(126);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(178),
	    isArray = __webpack_require__(62);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ }),
/* 178 */
/***/ (function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(180),
	    stubArray = __webpack_require__(181);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	module.exports = getSymbols;


/***/ }),
/* 180 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ }),
/* 181 */
/***/ (function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(183),
	    Map = __webpack_require__(147),
	    Promise = __webpack_require__(184),
	    Set = __webpack_require__(185),
	    WeakMap = __webpack_require__(186),
	    baseGetTag = __webpack_require__(56),
	    toSource = __webpack_require__(82);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(76),
	    root = __webpack_require__(58);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(76),
	    root = __webpack_require__(58);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(76),
	    root = __webpack_require__(58);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(76),
	    root = __webpack_require__(58);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(188),
	    keys = __webpack_require__(126);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(79);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ }),
/* 189 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(163),
	    get = __webpack_require__(191),
	    hasIn = __webpack_require__(203),
	    isKey = __webpack_require__(194),
	    isStrictComparable = __webpack_require__(188),
	    matchesStrictComparable = __webpack_require__(189),
	    toKey = __webpack_require__(202);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(192);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(193),
	    toKey = __webpack_require__(202);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(62),
	    isKey = __webpack_require__(194),
	    stringToPath = __webpack_require__(196),
	    toString = __webpack_require__(199);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(62),
	    isSymbol = __webpack_require__(195);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(56),
	    isObjectLike = __webpack_require__(63);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(197);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (string.charCodeAt(0) === 46 /* . */) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, subString) {
	    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(198);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(148);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(200);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(57),
	    arrayMap = __webpack_require__(201),
	    isArray = __webpack_require__(62),
	    isSymbol = __webpack_require__(195);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ }),
/* 201 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(195);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(204),
	    hasPath = __webpack_require__(205);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ }),
/* 204 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(193),
	    isArguments = __webpack_require__(101),
	    isArray = __webpack_require__(62),
	    isIndex = __webpack_require__(97),
	    isLength = __webpack_require__(96),
	    toKey = __webpack_require__(202);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(207),
	    basePropertyDeep = __webpack_require__(208),
	    isKey = __webpack_require__(194),
	    toKey = __webpack_require__(202);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ }),
/* 207 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(192);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Hyper = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _long = __webpack_require__(210);

	var _long2 = _interopRequireDefault(_long);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Hyper = exports.Hyper = function (_Long) {
	  _inherits(Hyper, _Long);

	  _createClass(Hyper, null, [{
	    key: 'read',
	    value: function read(io) {
	      var high = io.readInt32BE();
	      var low = io.readInt32BE();
	      return this.fromBits(low, high);
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      if (!(value instanceof this)) {
	        throw new Error('XDR Write Error: ' + value + ' is not a Hyper');
	      }

	      io.writeInt32BE(value.high);
	      io.writeInt32BE(value.low);
	    }
	  }, {
	    key: 'fromString',
	    value: function fromString(string) {
	      if (!/^-?\d+$/.test(string)) {
	        throw new Error('Invalid hyper string: ' + string);
	      }
	      var result = _get(Hyper.__proto__ || Object.getPrototypeOf(Hyper), 'fromString', this).call(this, string, false);
	      return new this(result.low, result.high);
	    }
	  }, {
	    key: 'fromBits',
	    value: function fromBits(low, high) {
	      var result = _get(Hyper.__proto__ || Object.getPrototypeOf(Hyper), 'fromBits', this).call(this, low, high, false);
	      return new this(result.low, result.high);
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      return value instanceof this;
	    }
	  }]);

	  function Hyper(low, high) {
	    _classCallCheck(this, Hyper);

	    return _possibleConstructorReturn(this, (Hyper.__proto__ || Object.getPrototypeOf(Hyper)).call(this, low, high, false));
	  }

	  return Hyper;
	}(_long2.default);

	(0, _ioMixin2.default)(Hyper);

	Hyper.MAX_VALUE = new Hyper(_long2.default.MAX_VALUE.low, _long2.default.MAX_VALUE.high);
	Hyper.MIN_VALUE = new Hyper(_long2.default.MIN_VALUE.low, _long2.default.MIN_VALUE.high);

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*
	 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
	 Copyright 2009 The Closure Library Authors. All Rights Reserved.

	 Licensed under the Apache License, Version 2.0 (the "License");
	 you may not use this file except in compliance with the License.
	 You may obtain a copy of the License at

	 http://www.apache.org/licenses/LICENSE-2.0

	 Unless required by applicable law or agreed to in writing, software
	 distributed under the License is distributed on an "AS-IS" BASIS,
	 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 See the License for the specific language governing permissions and
	 limitations under the License.
	 */

	/**
	 * @license Long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
	 * Released under the Apache License, Version 2.0
	 * see: https://github.com/dcodeIO/Long.js for details
	 */
	(function(global, factory) {

	    /* AMD */ if ("function" === 'function' && __webpack_require__(211)["amd"])
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    /* CommonJS */ else if ("function" === 'function' && typeof module === "object" && module && module["exports"])
	        module["exports"] = factory();
	    /* Global */ else
	        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();

	})(this, function() {
	    "use strict";

	    /**
	     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
	     *  See the from* functions below for more convenient ways of constructing Longs.
	     * @exports Long
	     * @class A Long class for representing a 64 bit two's-complement integer value.
	     * @param {number} low The low (signed) 32 bits of the long
	     * @param {number} high The high (signed) 32 bits of the long
	     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @constructor
	     */
	    function Long(low, high, unsigned) {

	        /**
	         * The low 32 bits as a signed value.
	         * @type {number}
	         * @expose
	         */
	        this.low = low|0;

	        /**
	         * The high 32 bits as a signed value.
	         * @type {number}
	         * @expose
	         */
	        this.high = high|0;

	        /**
	         * Whether unsigned or not.
	         * @type {boolean}
	         * @expose
	         */
	        this.unsigned = !!unsigned;
	    }

	    // The internal representation of a long is the two given signed, 32-bit values.
	    // We use 32-bit pieces because these are the size of integers on which
	    // Javascript performs bit-operations.  For operations like addition and
	    // multiplication, we split each number into 16 bit pieces, which can easily be
	    // multiplied within Javascript's floating-point representation without overflow
	    // or change in sign.
	    //
	    // In the algorithms below, we frequently reduce the negative case to the
	    // positive case by negating the input(s) and then post-processing the result.
	    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
	    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
	    // a positive number, it overflows back into a negative).  Not handling this
	    // case would often result in infinite recursion.
	    //
	    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
	    // methods on which they depend.

	    /**
	     * An indicator used to reliably determine if an object is a Long or not.
	     * @type {boolean}
	     * @const
	     * @expose
	     * @private
	     */
	    Long.__isLong__;

	    Object.defineProperty(Long.prototype, "__isLong__", {
	        value: true,
	        enumerable: false,
	        configurable: false
	    });

	    /**
	     * Tests if the specified object is a Long.
	     * @param {*} obj Object
	     * @returns {boolean}
	     * @expose
	     */
	    Long.isLong = function isLong(obj) {
	        return (obj && obj["__isLong__"]) === true;
	    };

	    /**
	     * A cache of the Long representations of small integer values.
	     * @type {!Object}
	     * @inner
	     */
	    var INT_CACHE = {};

	    /**
	     * A cache of the Long representations of small unsigned integer values.
	     * @type {!Object}
	     * @inner
	     */
	    var UINT_CACHE = {};

	    /**
	     * Returns a Long representing the given 32 bit integer value.
	     * @param {number} value The 32 bit integer in question
	     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @returns {!Long} The corresponding Long value
	     * @expose
	     */
	    Long.fromInt = function fromInt(value, unsigned) {
	        var obj, cachedObj;
	        if (!unsigned) {
	            value = value | 0;
	            if (-128 <= value && value < 128) {
	                cachedObj = INT_CACHE[value];
	                if (cachedObj)
	                    return cachedObj;
	            }
	            obj = new Long(value, value < 0 ? -1 : 0, false);
	            if (-128 <= value && value < 128)
	                INT_CACHE[value] = obj;
	            return obj;
	        } else {
	            value = value >>> 0;
	            if (0 <= value && value < 256) {
	                cachedObj = UINT_CACHE[value];
	                if (cachedObj)
	                    return cachedObj;
	            }
	            obj = new Long(value, (value | 0) < 0 ? -1 : 0, true);
	            if (0 <= value && value < 256)
	                UINT_CACHE[value] = obj;
	            return obj;
	        }
	    };

	    /**
	     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
	     * @param {number} value The number in question
	     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @returns {!Long} The corresponding Long value
	     * @expose
	     */
	    Long.fromNumber = function fromNumber(value, unsigned) {
	        unsigned = !!unsigned;
	        if (isNaN(value) || !isFinite(value))
	            return Long.ZERO;
	        if (!unsigned && value <= -TWO_PWR_63_DBL)
	            return Long.MIN_VALUE;
	        if (!unsigned && value + 1 >= TWO_PWR_63_DBL)
	            return Long.MAX_VALUE;
	        if (unsigned && value >= TWO_PWR_64_DBL)
	            return Long.MAX_UNSIGNED_VALUE;
	        if (value < 0)
	            return Long.fromNumber(-value, unsigned).negate();
	        return new Long((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
	    };

	    /**
	     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
	     *  assumed to use 32 bits.
	     * @param {number} lowBits The low 32 bits
	     * @param {number} highBits The high 32 bits
	     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @returns {!Long} The corresponding Long value
	     * @expose
	     */
	    Long.fromBits = function fromBits(lowBits, highBits, unsigned) {
	        return new Long(lowBits, highBits, unsigned);
	    };

	    /**
	     * Returns a Long representation of the given string, written using the specified radix.
	     * @param {string} str The textual representation of the Long
	     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
	     * @returns {!Long} The corresponding Long value
	     * @expose
	     */
	    Long.fromString = function fromString(str, unsigned, radix) {
	        if (str.length === 0)
	            throw Error('number format error: empty string');
	        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
	            return Long.ZERO;
	        if (typeof unsigned === 'number') // For goog.math.long compatibility
	            radix = unsigned,
	            unsigned = false;
	        radix = radix || 10;
	        if (radix < 2 || 36 < radix)
	            throw Error('radix out of range: ' + radix);

	        var p;
	        if ((p = str.indexOf('-')) > 0)
	            throw Error('number format error: interior "-" character: ' + str);
	        else if (p === 0)
	            return Long.fromString(str.substring(1), unsigned, radix).negate();

	        // Do several (8) digits each time through the loop, so as to
	        // minimize the calls to the very expensive emulated div.
	        var radixToPower = Long.fromNumber(Math.pow(radix, 8));

	        var result = Long.ZERO;
	        for (var i = 0; i < str.length; i += 8) {
	            var size = Math.min(8, str.length - i);
	            var value = parseInt(str.substring(i, i + size), radix);
	            if (size < 8) {
	                var power = Long.fromNumber(Math.pow(radix, size));
	                result = result.multiply(power).add(Long.fromNumber(value));
	            } else {
	                result = result.multiply(radixToPower);
	                result = result.add(Long.fromNumber(value));
	            }
	        }
	        result.unsigned = unsigned;
	        return result;
	    };

	    /**
	     * Converts the specified value to a Long.
	     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
	     * @returns {!Long}
	     * @expose
	     */
	    Long.fromValue = function fromValue(val) {
	        if (val /* is compatible */ instanceof Long)
	            return val;
	        if (typeof val === 'number')
	            return Long.fromNumber(val);
	        if (typeof val === 'string')
	            return Long.fromString(val);
	        // Throws for non-objects, converts non-instanceof Long:
	        return new Long(val.low, val.high, val.unsigned);
	    };

	    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
	    // no runtime penalty for these.

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_16_DBL = 1 << 16;

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_24_DBL = 1 << 24;

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

	    /**
	     * @type {!Long}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_24 = Long.fromInt(TWO_PWR_24_DBL);

	    /**
	     * Signed zero.
	     * @type {!Long}
	     * @expose
	     */
	    Long.ZERO = Long.fromInt(0);

	    /**
	     * Unsigned zero.
	     * @type {!Long}
	     * @expose
	     */
	    Long.UZERO = Long.fromInt(0, true);

	    /**
	     * Signed one.
	     * @type {!Long}
	     * @expose
	     */
	    Long.ONE = Long.fromInt(1);

	    /**
	     * Unsigned one.
	     * @type {!Long}
	     * @expose
	     */
	    Long.UONE = Long.fromInt(1, true);

	    /**
	     * Signed negative one.
	     * @type {!Long}
	     * @expose
	     */
	    Long.NEG_ONE = Long.fromInt(-1);

	    /**
	     * Maximum signed value.
	     * @type {!Long}
	     * @expose
	     */
	    Long.MAX_VALUE = Long.fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

	    /**
	     * Maximum unsigned value.
	     * @type {!Long}
	     * @expose
	     */
	    Long.MAX_UNSIGNED_VALUE = Long.fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

	    /**
	     * Minimum signed value.
	     * @type {!Long}
	     * @expose
	     */
	    Long.MIN_VALUE = Long.fromBits(0, 0x80000000|0, false);

	    /**
	     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
	     * @returns {number}
	     * @expose
	     */
	    Long.prototype.toInt = function toInt() {
	        return this.unsigned ? this.low >>> 0 : this.low;
	    };

	    /**
	     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
	     * @returns {number}
	     * @expose
	     */
	    Long.prototype.toNumber = function toNumber() {
	        if (this.unsigned) {
	            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
	        }
	        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
	    };

	    /**
	     * Converts the Long to a string written in the specified radix.
	     * @param {number=} radix Radix (2-36), defaults to 10
	     * @returns {string}
	     * @override
	     * @throws {RangeError} If `radix` is out of range
	     * @expose
	     */
	    Long.prototype.toString = function toString(radix) {
	        radix = radix || 10;
	        if (radix < 2 || 36 < radix)
	            throw RangeError('radix out of range: ' + radix);
	        if (this.isZero())
	            return '0';
	        var rem;
	        if (this.isNegative()) { // Unsigned Longs are never negative
	            if (this.equals(Long.MIN_VALUE)) {
	                // We need to change the Long value before it can be negated, so we remove
	                // the bottom-most digit in this base and then recurse to do the rest.
	                var radixLong = Long.fromNumber(radix);
	                var div = this.divide(radixLong);
	                rem = div.multiply(radixLong).subtract(this);
	                return div.toString(radix) + rem.toInt().toString(radix);
	            } else
	                return '-' + this.negate().toString(radix);
	        }

	        // Do several (6) digits each time through the loop, so as to
	        // minimize the calls to the very expensive emulated div.
	        var radixToPower = Long.fromNumber(Math.pow(radix, 6), this.unsigned);
	        rem = this;
	        var result = '';
	        while (true) {
	            var remDiv = rem.divide(radixToPower),
	                intval = rem.subtract(remDiv.multiply(radixToPower)).toInt() >>> 0,
	                digits = intval.toString(radix);
	            rem = remDiv;
	            if (rem.isZero())
	                return digits + result;
	            else {
	                while (digits.length < 6)
	                    digits = '0' + digits;
	                result = '' + digits + result;
	            }
	        }
	    };

	    /**
	     * Gets the high 32 bits as a signed integer.
	     * @returns {number} Signed high bits
	     * @expose
	     */
	    Long.prototype.getHighBits = function getHighBits() {
	        return this.high;
	    };

	    /**
	     * Gets the high 32 bits as an unsigned integer.
	     * @returns {number} Unsigned high bits
	     * @expose
	     */
	    Long.prototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
	        return this.high >>> 0;
	    };

	    /**
	     * Gets the low 32 bits as a signed integer.
	     * @returns {number} Signed low bits
	     * @expose
	     */
	    Long.prototype.getLowBits = function getLowBits() {
	        return this.low;
	    };

	    /**
	     * Gets the low 32 bits as an unsigned integer.
	     * @returns {number} Unsigned low bits
	     * @expose
	     */
	    Long.prototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
	        return this.low >>> 0;
	    };

	    /**
	     * Gets the number of bits needed to represent the absolute value of this Long.
	     * @returns {number}
	     * @expose
	     */
	    Long.prototype.getNumBitsAbs = function getNumBitsAbs() {
	        if (this.isNegative()) // Unsigned Longs are never negative
	            return this.equals(Long.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
	        var val = this.high != 0 ? this.high : this.low;
	        for (var bit = 31; bit > 0; bit--)
	            if ((val & (1 << bit)) != 0)
	                break;
	        return this.high != 0 ? bit + 33 : bit + 1;
	    };

	    /**
	     * Tests if this Long's value equals zero.
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.isZero = function isZero() {
	        return this.high === 0 && this.low === 0;
	    };

	    /**
	     * Tests if this Long's value is negative.
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.isNegative = function isNegative() {
	        return !this.unsigned && this.high < 0;
	    };

	    /**
	     * Tests if this Long's value is positive.
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.isPositive = function isPositive() {
	        return this.unsigned || this.high >= 0;
	    };

	    /**
	     * Tests if this Long's value is odd.
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.isOdd = function isOdd() {
	        return (this.low & 1) === 1;
	    };

	    /**
	     * Tests if this Long's value is even.
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.isEven = function isEven() {
	        return (this.low & 1) === 0;
	    };

	    /**
	     * Tests if this Long's value equals the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.equals = function equals(other) {
	        if (!Long.isLong(other))
	            other = Long.fromValue(other);
	        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
	            return false;
	        return this.high === other.high && this.low === other.low;
	    };

	    /**
	     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.eq = Long.prototype.equals;

	    /**
	     * Tests if this Long's value differs from the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.notEquals = function notEquals(other) {
	        return !this.equals(/* validates */ other);
	    };

	    /**
	     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.neq = Long.prototype.notEquals;

	    /**
	     * Tests if this Long's value is less than the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.lessThan = function lessThan(other) {
	        return this.compare(/* validates */ other) < 0;
	    };

	    /**
	     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.lt = Long.prototype.lessThan;

	    /**
	     * Tests if this Long's value is less than or equal the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.lessThanOrEqual = function lessThanOrEqual(other) {
	        return this.compare(/* validates */ other) <= 0;
	    };

	    /**
	     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.lte = Long.prototype.lessThanOrEqual;

	    /**
	     * Tests if this Long's value is greater than the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.greaterThan = function greaterThan(other) {
	        return this.compare(/* validates */ other) > 0;
	    };

	    /**
	     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.gt = Long.prototype.greaterThan;

	    /**
	     * Tests if this Long's value is greater than or equal the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
	        return this.compare(/* validates */ other) >= 0;
	    };

	    /**
	     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     * @expose
	     */
	    Long.prototype.gte = Long.prototype.greaterThanOrEqual;

	    /**
	     * Compares this Long's value with the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
	     *  if the given one is greater
	     * @expose
	     */
	    Long.prototype.compare = function compare(other) {
	        if (!Long.isLong(other))
	            other = Long.fromValue(other);
	        if (this.equals(other))
	            return 0;
	        var thisNeg = this.isNegative(),
	            otherNeg = other.isNegative();
	        if (thisNeg && !otherNeg)
	            return -1;
	        if (!thisNeg && otherNeg)
	            return 1;
	        // At this point the sign bits are the same
	        if (!this.unsigned)
	            return this.subtract(other).isNegative() ? -1 : 1;
	        // Both are positive if at least one is unsigned
	        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
	    };

	    /**
	     * Negates this Long's value.
	     * @returns {!Long} Negated Long
	     * @expose
	     */
	    Long.prototype.negate = function negate() {
	        if (!this.unsigned && this.equals(Long.MIN_VALUE))
	            return Long.MIN_VALUE;
	        return this.not().add(Long.ONE);
	    };

	    /**
	     * Negates this Long's value. This is an alias of {@link Long#negate}.
	     * @function
	     * @returns {!Long} Negated Long
	     * @expose
	     */
	    Long.prototype.neg = Long.prototype.negate;

	    /**
	     * Returns the sum of this and the specified Long.
	     * @param {!Long|number|string} addend Addend
	     * @returns {!Long} Sum
	     * @expose
	     */
	    Long.prototype.add = function add(addend) {
	        if (!Long.isLong(addend))
	            addend = Long.fromValue(addend);

	        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

	        var a48 = this.high >>> 16;
	        var a32 = this.high & 0xFFFF;
	        var a16 = this.low >>> 16;
	        var a00 = this.low & 0xFFFF;

	        var b48 = addend.high >>> 16;
	        var b32 = addend.high & 0xFFFF;
	        var b16 = addend.low >>> 16;
	        var b00 = addend.low & 0xFFFF;

	        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	        c00 += a00 + b00;
	        c16 += c00 >>> 16;
	        c00 &= 0xFFFF;
	        c16 += a16 + b16;
	        c32 += c16 >>> 16;
	        c16 &= 0xFFFF;
	        c32 += a32 + b32;
	        c48 += c32 >>> 16;
	        c32 &= 0xFFFF;
	        c48 += a48 + b48;
	        c48 &= 0xFFFF;
	        return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
	    };

	    /**
	     * Returns the difference of this and the specified Long.
	     * @param {!Long|number|string} subtrahend Subtrahend
	     * @returns {!Long} Difference
	     * @expose
	     */
	    Long.prototype.subtract = function subtract(subtrahend) {
	        if (!Long.isLong(subtrahend))
	            subtrahend = Long.fromValue(subtrahend);
	        return this.add(subtrahend.negate());
	    };

	    /**
	     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
	     * @function
	     * @param {!Long|number|string} subtrahend Subtrahend
	     * @returns {!Long} Difference
	     * @expose
	     */
	    Long.prototype.sub = Long.prototype.subtract;

	    /**
	     * Returns the product of this and the specified Long.
	     * @param {!Long|number|string} multiplier Multiplier
	     * @returns {!Long} Product
	     * @expose
	     */
	    Long.prototype.multiply = function multiply(multiplier) {
	        if (this.isZero())
	            return Long.ZERO;
	        if (!Long.isLong(multiplier))
	            multiplier = Long.fromValue(multiplier);
	        if (multiplier.isZero())
	            return Long.ZERO;
	        if (this.equals(Long.MIN_VALUE))
	            return multiplier.isOdd() ? Long.MIN_VALUE : Long.ZERO;
	        if (multiplier.equals(Long.MIN_VALUE))
	            return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;

	        if (this.isNegative()) {
	            if (multiplier.isNegative())
	                return this.negate().multiply(multiplier.negate());
	            else
	                return this.negate().multiply(multiplier).negate();
	        } else if (multiplier.isNegative())
	            return this.multiply(multiplier.negate()).negate();

	        // If both longs are small, use float multiplication
	        if (this.lessThan(TWO_PWR_24) && multiplier.lessThan(TWO_PWR_24))
	            return Long.fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

	        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
	        // We can skip products that would overflow.

	        var a48 = this.high >>> 16;
	        var a32 = this.high & 0xFFFF;
	        var a16 = this.low >>> 16;
	        var a00 = this.low & 0xFFFF;

	        var b48 = multiplier.high >>> 16;
	        var b32 = multiplier.high & 0xFFFF;
	        var b16 = multiplier.low >>> 16;
	        var b00 = multiplier.low & 0xFFFF;

	        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	        c00 += a00 * b00;
	        c16 += c00 >>> 16;
	        c00 &= 0xFFFF;
	        c16 += a16 * b00;
	        c32 += c16 >>> 16;
	        c16 &= 0xFFFF;
	        c16 += a00 * b16;
	        c32 += c16 >>> 16;
	        c16 &= 0xFFFF;
	        c32 += a32 * b00;
	        c48 += c32 >>> 16;
	        c32 &= 0xFFFF;
	        c32 += a16 * b16;
	        c48 += c32 >>> 16;
	        c32 &= 0xFFFF;
	        c32 += a00 * b32;
	        c48 += c32 >>> 16;
	        c32 &= 0xFFFF;
	        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
	        c48 &= 0xFFFF;
	        return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
	    };

	    /**
	     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
	     * @function
	     * @param {!Long|number|string} multiplier Multiplier
	     * @returns {!Long} Product
	     * @expose
	     */
	    Long.prototype.mul = Long.prototype.multiply;

	    /**
	     * Returns this Long divided by the specified.
	     * @param {!Long|number|string} divisor Divisor
	     * @returns {!Long} Quotient
	     * @expose
	     */
	    Long.prototype.divide = function divide(divisor) {
	        if (!Long.isLong(divisor))
	            divisor = Long.fromValue(divisor);
	        if (divisor.isZero())
	            throw(new Error('division by zero'));
	        if (this.isZero())
	            return this.unsigned ? Long.UZERO : Long.ZERO;
	        var approx, rem, res;
	        if (this.equals(Long.MIN_VALUE)) {
	            if (divisor.equals(Long.ONE) || divisor.equals(Long.NEG_ONE))
	                return Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
	            else if (divisor.equals(Long.MIN_VALUE))
	                return Long.ONE;
	            else {
	                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
	                var halfThis = this.shiftRight(1);
	                approx = halfThis.divide(divisor).shiftLeft(1);
	                if (approx.equals(Long.ZERO)) {
	                    return divisor.isNegative() ? Long.ONE : Long.NEG_ONE;
	                } else {
	                    rem = this.subtract(divisor.multiply(approx));
	                    res = approx.add(rem.divide(divisor));
	                    return res;
	                }
	            }
	        } else if (divisor.equals(Long.MIN_VALUE))
	            return this.unsigned ? Long.UZERO : Long.ZERO;
	        if (this.isNegative()) {
	            if (divisor.isNegative())
	                return this.negate().divide(divisor.negate());
	            return this.negate().divide(divisor).negate();
	        } else if (divisor.isNegative())
	            return this.divide(divisor.negate()).negate();

	        // Repeat the following until the remainder is less than other:  find a
	        // floating-point that approximates remainder / other *from below*, add this
	        // into the result, and subtract it from the remainder.  It is critical that
	        // the approximate value is less than or equal to the real value so that the
	        // remainder never becomes negative.
	        res = Long.ZERO;
	        rem = this;
	        while (rem.greaterThanOrEqual(divisor)) {
	            // Approximate the result of division. This may be a little greater or
	            // smaller than the actual value.
	            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

	            // We will tweak the approximate result by changing it in the 48-th digit or
	            // the smallest non-fractional digit, whichever is larger.
	            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
	                delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48),

	            // Decrease the approximation until it is smaller than the remainder.  Note
	            // that if it is too large, the product overflows and is negative.
	                approxRes = Long.fromNumber(approx),
	                approxRem = approxRes.multiply(divisor);
	            while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
	                approx -= delta;
	                approxRes = Long.fromNumber(approx, this.unsigned);
	                approxRem = approxRes.multiply(divisor);
	            }

	            // We know the answer can't be zero... and actually, zero would cause
	            // infinite recursion since we would make no progress.
	            if (approxRes.isZero())
	                approxRes = Long.ONE;

	            res = res.add(approxRes);
	            rem = rem.subtract(approxRem);
	        }
	        return res;
	    };

	    /**
	     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
	     * @function
	     * @param {!Long|number|string} divisor Divisor
	     * @returns {!Long} Quotient
	     * @expose
	     */
	    Long.prototype.div = Long.prototype.divide;

	    /**
	     * Returns this Long modulo the specified.
	     * @param {!Long|number|string} divisor Divisor
	     * @returns {!Long} Remainder
	     * @expose
	     */
	    Long.prototype.modulo = function modulo(divisor) {
	        if (!Long.isLong(divisor))
	            divisor = Long.fromValue(divisor);
	        return this.subtract(this.divide(divisor).multiply(divisor));
	    };

	    /**
	     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
	     * @function
	     * @param {!Long|number|string} divisor Divisor
	     * @returns {!Long} Remainder
	     * @expose
	     */
	    Long.prototype.mod = Long.prototype.modulo;

	    /**
	     * Returns the bitwise NOT of this Long.
	     * @returns {!Long}
	     * @expose
	     */
	    Long.prototype.not = function not() {
	        return Long.fromBits(~this.low, ~this.high, this.unsigned);
	    };

	    /**
	     * Returns the bitwise AND of this Long and the specified.
	     * @param {!Long|number|string} other Other Long
	     * @returns {!Long}
	     * @expose
	     */
	    Long.prototype.and = function and(other) {
	        if (!Long.isLong(other))
	            other = Long.fromValue(other);
	        return Long.fromBits(this.low & other.low, this.high & other.high, this.unsigned);
	    };

	    /**
	     * Returns the bitwise OR of this Long and the specified.
	     * @param {!Long|number|string} other Other Long
	     * @returns {!Long}
	     * @expose
	     */
	    Long.prototype.or = function or(other) {
	        if (!Long.isLong(other))
	            other = Long.fromValue(other);
	        return Long.fromBits(this.low | other.low, this.high | other.high, this.unsigned);
	    };

	    /**
	     * Returns the bitwise XOR of this Long and the given one.
	     * @param {!Long|number|string} other Other Long
	     * @returns {!Long}
	     * @expose
	     */
	    Long.prototype.xor = function xor(other) {
	        if (!Long.isLong(other))
	            other = Long.fromValue(other);
	        return Long.fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
	    };

	    /**
	     * Returns this Long with bits shifted to the left by the given amount.
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     * @expose
	     */
	    Long.prototype.shiftLeft = function shiftLeft(numBits) {
	        if (Long.isLong(numBits))
	            numBits = numBits.toInt();
	        if ((numBits &= 63) === 0)
	            return this;
	        else if (numBits < 32)
	            return Long.fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
	        else
	            return Long.fromBits(0, this.low << (numBits - 32), this.unsigned);
	    };

	    /**
	     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
	     * @function
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     * @expose
	     */
	    Long.prototype.shl = Long.prototype.shiftLeft;

	    /**
	     * Returns this Long with bits arithmetically shifted to the right by the given amount.
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     * @expose
	     */
	    Long.prototype.shiftRight = function shiftRight(numBits) {
	        if (Long.isLong(numBits))
	            numBits = numBits.toInt();
	        if ((numBits &= 63) === 0)
	            return this;
	        else if (numBits < 32)
	            return Long.fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
	        else
	            return Long.fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
	    };

	    /**
	     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
	     * @function
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     * @expose
	     */
	    Long.prototype.shr = Long.prototype.shiftRight;

	    /**
	     * Returns this Long with bits logically shifted to the right by the given amount.
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     * @expose
	     */
	    Long.prototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
	        if (Long.isLong(numBits))
	            numBits = numBits.toInt();
	        numBits &= 63;
	        if (numBits === 0)
	            return this;
	        else {
	            var high = this.high;
	            if (numBits < 32) {
	                var low = this.low;
	                return Long.fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
	            } else if (numBits === 32)
	                return Long.fromBits(high, 0, this.unsigned);
	            else
	                return Long.fromBits(high >>> (numBits - 32), 0, this.unsigned);
	        }
	    };

	    /**
	     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
	     * @function
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     * @expose
	     */
	    Long.prototype.shru = Long.prototype.shiftRightUnsigned;

	    /**
	     * Converts this Long to signed.
	     * @returns {!Long} Signed long
	     * @expose
	     */
	    Long.prototype.toSigned = function toSigned() {
	        if (!this.unsigned)
	            return this;
	        return new Long(this.low, this.high, false);
	    };

	    /**
	     * Converts this Long to unsigned.
	     * @returns {!Long} Unsigned long
	     * @expose
	     */
	    Long.prototype.toUnsigned = function toUnsigned() {
	        if (this.unsigned)
	            return this;
	        return new Long(this.low, this.high, true);
	    };

	    return Long;
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)(module)))

/***/ }),
/* 211 */
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UnsignedInt = undefined;

	var _isNumber = __webpack_require__(68);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UnsignedInt = exports.UnsignedInt = {
	  read: function read(io) {
	    return io.readUInt32BE();
	  },
	  write: function write(value, io) {
	    if (!(0, _isNumber2.default)(value)) {
	      throw new Error('XDR Write Error: not a number');
	    }

	    if (Math.floor(value) !== value) {
	      throw new Error('XDR Write Error: not an integer');
	    }

	    if (value < 0) {
	      throw new Error('XDR Write Error: negative number ' + value);
	    }

	    io.writeUInt32BE(value);
	  },
	  isValid: function isValid(value) {
	    if (!(0, _isNumber2.default)(value)) {
	      return false;
	    }
	    if (Math.floor(value) !== value) {
	      return false;
	    }

	    return value >= UnsignedInt.MIN_VALUE && value <= UnsignedInt.MAX_VALUE;
	  }
	};

	UnsignedInt.MAX_VALUE = Math.pow(2, 32) - 1;
	UnsignedInt.MIN_VALUE = 0;

	(0, _ioMixin2.default)(UnsignedInt);

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UnsignedHyper = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _long = __webpack_require__(210);

	var _long2 = _interopRequireDefault(_long);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UnsignedHyper = exports.UnsignedHyper = function (_Long) {
	  _inherits(UnsignedHyper, _Long);

	  _createClass(UnsignedHyper, null, [{
	    key: 'read',
	    value: function read(io) {
	      var high = io.readInt32BE();
	      var low = io.readInt32BE();
	      return this.fromBits(low, high);
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      if (!(value instanceof this)) {
	        throw new Error('XDR Write Error: ' + value + ' is not an UnsignedHyper');
	      }

	      io.writeInt32BE(value.high);
	      io.writeInt32BE(value.low);
	    }
	  }, {
	    key: 'fromString',
	    value: function fromString(string) {
	      if (!/^\d+$/.test(string)) {
	        throw new Error('Invalid hyper string: ' + string);
	      }
	      var result = _get(UnsignedHyper.__proto__ || Object.getPrototypeOf(UnsignedHyper), 'fromString', this).call(this, string, true);
	      return new this(result.low, result.high);
	    }
	  }, {
	    key: 'fromBits',
	    value: function fromBits(low, high) {
	      var result = _get(UnsignedHyper.__proto__ || Object.getPrototypeOf(UnsignedHyper), 'fromBits', this).call(this, low, high, true);
	      return new this(result.low, result.high);
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      return value instanceof this;
	    }
	  }]);

	  function UnsignedHyper(low, high) {
	    _classCallCheck(this, UnsignedHyper);

	    return _possibleConstructorReturn(this, (UnsignedHyper.__proto__ || Object.getPrototypeOf(UnsignedHyper)).call(this, low, high, true));
	  }

	  return UnsignedHyper;
	}(_long2.default);

	(0, _ioMixin2.default)(UnsignedHyper);

	UnsignedHyper.MAX_VALUE = new UnsignedHyper(_long2.default.MAX_UNSIGNED_VALUE.low, _long2.default.MAX_UNSIGNED_VALUE.high);

	UnsignedHyper.MIN_VALUE = new UnsignedHyper(_long2.default.MIN_VALUE.low, _long2.default.MIN_VALUE.high);

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Float = undefined;

	var _isNumber = __webpack_require__(68);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Float = exports.Float = {
	  read: function read(io) {
	    return io.readFloatBE();
	  },
	  write: function write(value, io) {
	    if (!(0, _isNumber2.default)(value)) {
	      throw new Error('XDR Write Error: not a number');
	    }

	    io.writeFloatBE(value);
	  },
	  isValid: function isValid(value) {
	    return (0, _isNumber2.default)(value);
	  }
	};

	(0, _ioMixin2.default)(Float);

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Double = undefined;

	var _isNumber = __webpack_require__(68);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Double = exports.Double = {
	  read: function read(io) {
	    return io.readDoubleBE();
	  },
	  write: function write(value, io) {
	    if (!(0, _isNumber2.default)(value)) {
	      throw new Error('XDR Write Error: not a number');
	    }

	    io.writeDoubleBE(value);
	  },
	  isValid: function isValid(value) {
	    return (0, _isNumber2.default)(value);
	  }
	};

	(0, _ioMixin2.default)(Double);

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Quadruple = undefined;

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Quadruple = exports.Quadruple = {
	  /* jshint unused: false */

	  read: function read() {
	    throw new Error('XDR Read Error: quadruple not supported');
	  },
	  write: function write() {
	    throw new Error('XDR Write Error: quadruple not supported');
	  },
	  isValid: function isValid() {
	    return false;
	  }
	};

	(0, _ioMixin2.default)(Quadruple);

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Bool = undefined;

	var _isBoolean = __webpack_require__(218);

	var _isBoolean2 = _interopRequireDefault(_isBoolean);

	var _int = __webpack_require__(67);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Bool = exports.Bool = {
	  read: function read(io) {
	    var value = _int.Int.read(io);

	    switch (value) {
	      case 0:
	        return false;
	      case 1:
	        return true;
	      default:
	        throw new Error('XDR Read Error: Got ' + value + ' when trying to read a bool');
	    }
	  },
	  write: function write(value, io) {
	    var intVal = value ? 1 : 0;
	    return _int.Int.write(intVal, io);
	  },
	  isValid: function isValid(value) {
	    return (0, _isBoolean2.default)(value);
	  }
	};

	(0, _ioMixin2.default)(Bool);

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(56),
	    isObjectLike = __webpack_require__(63);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false ||
	    (isObjectLike(value) && baseGetTag(value) == boolTag);
	}

	module.exports = isBoolean;


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.String = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _isArray = __webpack_require__(62);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _int = __webpack_require__(67);

	var _unsignedInt = __webpack_require__(212);

	var _util = __webpack_require__(118);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var String = exports.String = function () {
	  function String() {
	    var maxLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _unsignedInt.UnsignedInt.MAX_VALUE;

	    _classCallCheck(this, String);

	    this._maxLength = maxLength;
	  }

	  _createClass(String, [{
	    key: 'read',
	    value: function read(io) {
	      var length = _int.Int.read(io);

	      if (length > this._maxLength) {
	        throw new Error('XDR Read Error: Saw ' + length + ' length String,' + ('max allowed is ' + this._maxLength));
	      }
	      var padding = (0, _util.calculatePadding)(length);
	      var result = io.slice(length);
	      (0, _util.slicePadding)(io, padding);
	      return result.buffer();
	    }
	  }, {
	    key: 'readString',
	    value: function readString(io) {
	      return this.read(io).toString('utf8');
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      if (value.length > this._maxLength) {
	        throw new Error('XDR Write Error: Got ' + value.length + ' bytes,' + ('max allows is ' + this._maxLength));
	      }

	      var buffer = void 0;
	      if ((0, _isString2.default)(value)) {
	        buffer = Buffer.from(value, 'utf8');
	      } else {
	        buffer = Buffer.from(value);
	      }

	      _int.Int.write(buffer.length, io);
	      io.writeBufferPadded(buffer);
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      var buffer = void 0;
	      if ((0, _isString2.default)(value)) {
	        buffer = Buffer.from(value, 'utf8');
	      } else if ((0, _isArray2.default)(value) || Buffer.isBuffer(value)) {
	        buffer = Buffer.from(value);
	      } else {
	        return false;
	      }
	      return buffer.length <= this._maxLength;
	    }
	  }]);

	  return String;
	}();

	(0, _ioMixin2.default)(String.prototype);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Opaque = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(118);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Opaque = exports.Opaque = function () {
	  function Opaque(length) {
	    _classCallCheck(this, Opaque);

	    this._length = length;
	    this._padding = (0, _util.calculatePadding)(length);
	  }

	  _createClass(Opaque, [{
	    key: 'read',
	    value: function read(io) {
	      var result = io.slice(this._length);
	      (0, _util.slicePadding)(io, this._padding);
	      return result.buffer();
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      if (value.length !== this._length) {
	        throw new Error('XDR Write Error: Got ' + value.length + ' bytes, expected ' + this._length);
	      }

	      io.writeBufferPadded(value);
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      return Buffer.isBuffer(value) && value.length === this._length;
	    }
	  }]);

	  return Opaque;
	}();

	(0, _ioMixin2.default)(Opaque.prototype);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VarOpaque = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _int = __webpack_require__(67);

	var _unsignedInt = __webpack_require__(212);

	var _util = __webpack_require__(118);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VarOpaque = exports.VarOpaque = function () {
	  function VarOpaque() {
	    var maxLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _unsignedInt.UnsignedInt.MAX_VALUE;

	    _classCallCheck(this, VarOpaque);

	    this._maxLength = maxLength;
	  }

	  _createClass(VarOpaque, [{
	    key: 'read',
	    value: function read(io) {
	      var length = _int.Int.read(io);

	      if (length > this._maxLength) {
	        throw new Error('XDR Read Error: Saw ' + length + ' length VarOpaque,' + ('max allowed is ' + this._maxLength));
	      }
	      var padding = (0, _util.calculatePadding)(length);
	      var result = io.slice(length);
	      (0, _util.slicePadding)(io, padding);
	      return result.buffer();
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      if (value.length > this._maxLength) {
	        throw new Error('XDR Write Error: Got ' + value.length + ' bytes,' + ('max allows is ' + this._maxLength));
	      }
	      _int.Int.write(value.length, io);
	      io.writeBufferPadded(value);
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      return Buffer.isBuffer(value) && value.length <= this._maxLength;
	    }
	  }]);

	  return VarOpaque;
	}();

	(0, _ioMixin2.default)(VarOpaque.prototype);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Array = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _every = __webpack_require__(119);

	var _every2 = _interopRequireDefault(_every);

	var _each = __webpack_require__(223);

	var _each2 = _interopRequireDefault(_each);

	var _times = __webpack_require__(227);

	var _times2 = _interopRequireDefault(_times);

	var _isArray = __webpack_require__(62);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Array = exports.Array = function () {
	  function Array(childType, length) {
	    _classCallCheck(this, Array);

	    this._childType = childType;
	    this._length = length;
	  }

	  _createClass(Array, [{
	    key: 'read',
	    value: function read(io) {
	      var _this = this;

	      return (0, _times2.default)(this._length, function () {
	        return _this._childType.read(io);
	      });
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      var _this2 = this;

	      if (!(0, _isArray2.default)(value)) {
	        throw new Error('XDR Write Error: value is not array');
	      }

	      if (value.length !== this._length) {
	        throw new Error('XDR Write Error: Got array of size ' + value.length + ',' + ('expected ' + this._length));
	      }

	      (0, _each2.default)(value, function (child) {
	        return _this2._childType.write(child, io);
	      });
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      var _this3 = this;

	      if (!(0, _isArray2.default)(value)) {
	        return false;
	      }
	      if (value.length !== this._length) {
	        return false;
	      }

	      return (0, _every2.default)(value, function (child) {
	        return _this3._childType.isValid(child);
	      });
	    }
	  }]);

	  return Array;
	}();

	(0, _ioMixin2.default)(Array.prototype);

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(224);


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(225),
	    baseEach = __webpack_require__(122),
	    castFunction = __webpack_require__(226),
	    isArray = __webpack_require__(62);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}

	module.exports = forEach;


/***/ }),
/* 225 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(87);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = castFunction;


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(100),
	    castFunction = __webpack_require__(226),
	    toInteger = __webpack_require__(228);

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Invokes the iteratee `n` times, returning an array of the results of
	 * each invocation. The iteratee is invoked with one argument; (index).
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 * @example
	 *
	 * _.times(3, String);
	 * // => ['0', '1', '2']
	 *
	 *  _.times(4, _.constant(0));
	 * // => [0, 0, 0, 0]
	 */
	function times(n, iteratee) {
	  n = toInteger(n);
	  if (n < 1 || n > MAX_SAFE_INTEGER) {
	    return [];
	  }
	  var index = MAX_ARRAY_LENGTH,
	      length = nativeMin(n, MAX_ARRAY_LENGTH);

	  iteratee = castFunction(iteratee);
	  n -= MAX_ARRAY_LENGTH;

	  var result = baseTimes(length, iteratee);
	  while (++index < n) {
	    iteratee(index);
	  }
	  return result;
	}

	module.exports = times;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(229);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(230);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(79),
	    isSymbol = __webpack_require__(195);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VarArray = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _every = __webpack_require__(119);

	var _every2 = _interopRequireDefault(_every);

	var _each = __webpack_require__(223);

	var _each2 = _interopRequireDefault(_each);

	var _times = __webpack_require__(227);

	var _times2 = _interopRequireDefault(_times);

	var _isArray = __webpack_require__(62);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _unsignedInt = __webpack_require__(212);

	var _int = __webpack_require__(67);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VarArray = exports.VarArray = function () {
	  function VarArray(childType) {
	    var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _unsignedInt.UnsignedInt.MAX_VALUE;

	    _classCallCheck(this, VarArray);

	    this._childType = childType;
	    this._maxLength = maxLength;
	  }

	  _createClass(VarArray, [{
	    key: 'read',
	    value: function read(io) {
	      var _this = this;

	      var length = _int.Int.read(io);

	      if (length > this._maxLength) {
	        throw new Error('XDR Read Error: Saw ' + length + ' length VarArray,' + ('max allowed is ' + this._maxLength));
	      }

	      return (0, _times2.default)(length, function () {
	        return _this._childType.read(io);
	      });
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      var _this2 = this;

	      if (!(0, _isArray2.default)(value)) {
	        throw new Error('XDR Write Error: value is not array');
	      }

	      if (value.length > this._maxLength) {
	        throw new Error('XDR Write Error: Got array of size ' + value.length + ',' + ('max allowed is ' + this._maxLength));
	      }

	      _int.Int.write(value.length, io);
	      (0, _each2.default)(value, function (child) {
	        return _this2._childType.write(child, io);
	      });
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      var _this3 = this;

	      if (!(0, _isArray2.default)(value)) {
	        return false;
	      }
	      if (value.length > this._maxLength) {
	        return false;
	      }

	      return (0, _every2.default)(value, function (child) {
	        return _this3._childType.isValid(child);
	      });
	    }
	  }]);

	  return VarArray;
	}();

	(0, _ioMixin2.default)(VarArray.prototype);

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Option = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isNull = __webpack_require__(54);

	var _isNull2 = _interopRequireDefault(_isNull);

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _bool = __webpack_require__(217);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Option = exports.Option = function () {
	  function Option(childType) {
	    _classCallCheck(this, Option);

	    this._childType = childType;
	  }

	  _createClass(Option, [{
	    key: 'read',
	    value: function read(io) {
	      if (_bool.Bool.read(io)) {
	        return this._childType.read(io);
	      }

	      return undefined;
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      var isPresent = !((0, _isNull2.default)(value) || (0, _isUndefined2.default)(value));

	      _bool.Bool.write(isPresent, io);

	      if (isPresent) {
	        this._childType.write(value, io);
	      }
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      if ((0, _isNull2.default)(value)) {
	        return true;
	      }
	      if ((0, _isUndefined2.default)(value)) {
	        return true;
	      }

	      return this._childType.isValid(value);
	    }
	  }]);

	  return Option;
	}();

	(0, _ioMixin2.default)(Option.prototype);

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Void = undefined;

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Void = exports.Void = {
	  /* jshint unused: false */

	  read: function read() {
	    return undefined;
	  },
	  write: function write(value) {
	    if (!(0, _isUndefined2.default)(value)) {
	      throw new Error('XDR Write Error: trying to write value to a void slot');
	    }
	  },
	  isValid: function isValid(value) {
	    return (0, _isUndefined2.default)(value);
	  }
	};

	(0, _ioMixin2.default)(Void);

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Enum = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _map = __webpack_require__(235);

	var _map2 = _interopRequireDefault(_map);

	var _each = __webpack_require__(223);

	var _each2 = _interopRequireDefault(_each);

	var _values = __webpack_require__(302);

	var _values2 = _interopRequireDefault(_values);

	var _int = __webpack_require__(67);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Enum = exports.Enum = function () {
	  function Enum(name, value) {
	    _classCallCheck(this, Enum);

	    this.name = name;
	    this.value = value;
	  }

	  _createClass(Enum, null, [{
	    key: 'read',
	    value: function read(io) {
	      var intVal = _int.Int.read(io);

	      if (!this._byValue.has(intVal)) {
	        throw new Error('XDR Read Error: Unknown ' + this.enumName + ' member for value ' + intVal);
	      }

	      return this._byValue.get(intVal);
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      if (!(value instanceof this)) {
	        throw new Error('XDR Write Error: Unknown ' + value + ' is not a ' + this.enumName);
	      }

	      _int.Int.write(value.value, io);
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      return value instanceof this;
	    }
	  }, {
	    key: 'members',
	    value: function members() {
	      return this._members;
	    }
	  }, {
	    key: 'values',
	    value: function values() {
	      return (0, _values2.default)(this._members);
	    }
	  }, {
	    key: 'fromName',
	    value: function fromName(name) {
	      var result = this._members[name];

	      if (!result) {
	        throw new Error(name + ' is not a member of ' + this.enumName);
	      }

	      return result;
	    }
	  }, {
	    key: 'fromValue',
	    value: function fromValue(value) {
	      var result = this._byValue.get(value);

	      if (!result) {
	        throw new Error(value + ' is not a value of any member of ' + this.enumName);
	      }

	      return result;
	    }
	  }, {
	    key: 'create',
	    value: function create(context, name, members) {
	      var ChildEnum = function (_Enum) {
	        _inherits(ChildEnum, _Enum);

	        function ChildEnum() {
	          _classCallCheck(this, ChildEnum);

	          return _possibleConstructorReturn(this, (ChildEnum.__proto__ || Object.getPrototypeOf(ChildEnum)).apply(this, arguments));
	        }

	        return ChildEnum;
	      }(Enum);

	      ChildEnum.enumName = name;
	      context.results[name] = ChildEnum;

	      ChildEnum._members = {};
	      ChildEnum._byValue = new _map2.default();

	      (0, _each2.default)(members, function (value, key) {
	        var inst = new ChildEnum(key, value);
	        ChildEnum._members[key] = inst;
	        ChildEnum._byValue.set(value, inst);
	        ChildEnum[key] = function () {
	          return inst;
	        };
	      });

	      return ChildEnum;
	    }
	  }]);

	  return Enum;
	}();

	(0, _ioMixin2.default)(Enum);

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(281);
	__webpack_require__(285);
	module.exports = __webpack_require__(245).Map;


/***/ }),
/* 236 */
/***/ (function(module, exports) {

	

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(238)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(241)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(239);
	var defined = __webpack_require__(240);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 239 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 240 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(242);
	var $export = __webpack_require__(243);
	var redefine = __webpack_require__(259);
	var hide = __webpack_require__(248);
	var Iterators = __webpack_require__(260);
	var $iterCreate = __webpack_require__(261);
	var setToStringTag = __webpack_require__(277);
	var getPrototypeOf = __webpack_require__(279);
	var ITERATOR = __webpack_require__(278)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 242 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(244);
	var core = __webpack_require__(245);
	var ctx = __webpack_require__(246);
	var hide = __webpack_require__(248);
	var has = __webpack_require__(258);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
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
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
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


/***/ }),
/* 244 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 245 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(247);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
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
/* 247 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(249);
	var createDesc = __webpack_require__(257);
	module.exports = __webpack_require__(253) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(250);
	var IE8_DOM_DEFINE = __webpack_require__(252);
	var toPrimitive = __webpack_require__(256);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(253) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(251);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 251 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(253) && !__webpack_require__(254)(function () {
	  return Object.defineProperty(__webpack_require__(255)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(254)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 254 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(251);
	var document = __webpack_require__(244).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(251);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 257 */
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
/* 258 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(248);


/***/ }),
/* 260 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(262);
	var descriptor = __webpack_require__(257);
	var setToStringTag = __webpack_require__(277);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(248)(IteratorPrototype, __webpack_require__(278)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(250);
	var dPs = __webpack_require__(263);
	var enumBugKeys = __webpack_require__(275);
	var IE_PROTO = __webpack_require__(272)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(255)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(276).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(249);
	var anObject = __webpack_require__(250);
	var getKeys = __webpack_require__(264);

	module.exports = __webpack_require__(253) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(265);
	var enumBugKeys = __webpack_require__(275);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(258);
	var toIObject = __webpack_require__(266);
	var arrayIndexOf = __webpack_require__(269)(false);
	var IE_PROTO = __webpack_require__(272)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(267);
	var defined = __webpack_require__(240);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(268);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 268 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(266);
	var toLength = __webpack_require__(270);
	var toAbsoluteIndex = __webpack_require__(271);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(239);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(239);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(273)('keys');
	var uid = __webpack_require__(274);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(245);
	var global = __webpack_require__(244);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core.version,
	  mode: __webpack_require__(242) ? 'pure' : 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});


/***/ }),
/* 274 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 275 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(244).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(249).f;
	var has = __webpack_require__(258);
	var TAG = __webpack_require__(278)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(273)('wks');
	var uid = __webpack_require__(274);
	var Symbol = __webpack_require__(244).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(258);
	var toObject = __webpack_require__(280);
	var IE_PROTO = __webpack_require__(272)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(240);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(282);
	var global = __webpack_require__(244);
	var hide = __webpack_require__(248);
	var Iterators = __webpack_require__(260);
	var TO_STRING_TAG = __webpack_require__(278)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(283);
	var step = __webpack_require__(284);
	var Iterators = __webpack_require__(260);
	var toIObject = __webpack_require__(266);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(241)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 283 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 284 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(286);
	var validate = __webpack_require__(296);
	var MAP = 'Map';

	// 23.1 Map Objects
	module.exports = __webpack_require__(297)(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(validate(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, strong, true);


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var dP = __webpack_require__(249).f;
	var create = __webpack_require__(262);
	var redefineAll = __webpack_require__(287);
	var ctx = __webpack_require__(246);
	var anInstance = __webpack_require__(288);
	var forOf = __webpack_require__(289);
	var $iterDefine = __webpack_require__(241);
	var step = __webpack_require__(284);
	var setSpecies = __webpack_require__(294);
	var DESCRIPTORS = __webpack_require__(253);
	var fastKey = __webpack_require__(295).fastKey;
	var validate = __webpack_require__(296);
	var SIZE = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	module.exports = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = validate(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        validate(this, NAME);
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(validate(this, NAME), key);
	      }
	    });
	    if (DESCRIPTORS) dP(C.prototype, 'size', {
	      get: function () {
	        return validate(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = validate(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(248);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};


/***/ }),
/* 288 */
/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(246);
	var call = __webpack_require__(290);
	var isArrayIter = __webpack_require__(291);
	var anObject = __webpack_require__(250);
	var toLength = __webpack_require__(270);
	var getIterFn = __webpack_require__(292);
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(250);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(260);
	var ITERATOR = __webpack_require__(278)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(293);
	var ITERATOR = __webpack_require__(278)('iterator');
	var Iterators = __webpack_require__(260);
	module.exports = __webpack_require__(245).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(268);
	var TAG = __webpack_require__(278)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global = __webpack_require__(244);
	var core = __webpack_require__(245);
	var dP = __webpack_require__(249);
	var DESCRIPTORS = __webpack_require__(253);
	var SPECIES = __webpack_require__(278)('species');

	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(274)('meta');
	var isObject = __webpack_require__(251);
	var has = __webpack_require__(258);
	var setDesc = __webpack_require__(249).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(254)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(251);
	module.exports = function (it, TYPE) {
	  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global = __webpack_require__(244);
	var $export = __webpack_require__(243);
	var meta = __webpack_require__(295);
	var fails = __webpack_require__(254);
	var hide = __webpack_require__(248);
	var redefineAll = __webpack_require__(287);
	var forOf = __webpack_require__(289);
	var anInstance = __webpack_require__(288);
	var isObject = __webpack_require__(251);
	var setToStringTag = __webpack_require__(277);
	var dP = __webpack_require__(249).f;
	var each = __webpack_require__(298)(0);
	var DESCRIPTORS = __webpack_require__(253);

	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function (target, iterable) {
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base();
	      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
	        anInstance(this, C, KEY);
	        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    IS_WEAK || dP(C.prototype, 'size', {
	      get: function () {
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx = __webpack_require__(246);
	var IObject = __webpack_require__(267);
	var toObject = __webpack_require__(280);
	var toLength = __webpack_require__(270);
	var asc = __webpack_require__(299);
	module.exports = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this);
	    var self = IObject(O);
	    var f = ctx(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(300);

	module.exports = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(251);
	var isArray = __webpack_require__(301);
	var SPECIES = __webpack_require__(278)('species');

	module.exports = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(268);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(303),
	    keys = __webpack_require__(126);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object == null ? [] : baseValues(object, keys(object));
	}

	module.exports = values;


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(201);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Struct = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _each = __webpack_require__(223);

	var _each2 = _interopRequireDefault(_each);

	var _map = __webpack_require__(305);

	var _map2 = _interopRequireDefault(_map);

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _fromPairs = __webpack_require__(307);

	var _fromPairs2 = _interopRequireDefault(_fromPairs);

	var _config = __webpack_require__(308);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Struct = exports.Struct = function () {
	  function Struct(attributes) {
	    _classCallCheck(this, Struct);

	    this._attributes = attributes || {};
	  }

	  _createClass(Struct, null, [{
	    key: 'read',
	    value: function read(io) {
	      var fields = (0, _map2.default)(this._fields, function (field) {
	        var _field = _slicedToArray(field, 2),
	            name = _field[0],
	            type = _field[1];

	        var value = type.read(io);
	        return [name, value];
	      });

	      return new this((0, _fromPairs2.default)(fields));
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      if (!(value instanceof this)) {
	        throw new Error('XDR Write Error: ' + value + ' is not a ' + this.structName);
	      }
	      (0, _each2.default)(this._fields, function (field) {
	        var _field2 = _slicedToArray(field, 2),
	            name = _field2[0],
	            type = _field2[1];

	        var attribute = value._attributes[name];
	        type.write(attribute, io);
	      });
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      return value instanceof this;
	    }
	  }, {
	    key: 'create',
	    value: function create(context, name, fields) {
	      var ChildStruct = function (_Struct) {
	        _inherits(ChildStruct, _Struct);

	        function ChildStruct() {
	          _classCallCheck(this, ChildStruct);

	          return _possibleConstructorReturn(this, (ChildStruct.__proto__ || Object.getPrototypeOf(ChildStruct)).apply(this, arguments));
	        }

	        return ChildStruct;
	      }(Struct);

	      ChildStruct.structName = name;

	      context.results[name] = ChildStruct;

	      ChildStruct._fields = fields.map(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            fieldName = _ref2[0],
	            field = _ref2[1];

	        if (field instanceof _config.Reference) {
	          field = field.resolve(context);
	        }

	        return [fieldName, field];
	      });

	      (0, _each2.default)(ChildStruct._fields, function (field) {
	        var _field3 = _slicedToArray(field, 1),
	            fieldName = _field3[0];

	        ChildStruct.prototype[fieldName] = getReadOrWriteAttribute(fieldName);
	      });

	      return ChildStruct;
	    }
	  }]);

	  return Struct;
	}();

	(0, _ioMixin2.default)(Struct);

	function getReadOrWriteAttribute(name) {
	  return function readOrWriteAttribute(value) {
	    if (!(0, _isUndefined2.default)(value)) {
	      this._attributes[name] = value;
	    }

	    return this._attributes[name];
	  };
	}

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(201),
	    baseIteratee = __webpack_require__(131),
	    baseMap = __webpack_require__(306),
	    isArray = __webpack_require__(62);

	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = map;


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(122),
	    isArrayLike = __webpack_require__(95);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ }),
/* 307 */
/***/ (function(module, exports) {

	/**
	 * The inverse of `_.toPairs`; this method returns an object composed
	 * from key-value `pairs`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} pairs The key-value pairs.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * _.fromPairs([['a', 1], ['b', 2]]);
	 * // => { 'a': 1, 'b': 2 }
	 */
	function fromPairs(pairs) {
	  var index = -1,
	      length = pairs == null ? 0 : pairs.length,
	      result = {};

	  while (++index < length) {
	    var pair = pairs[index];
	    result[pair[0]] = pair[1];
	  }
	  return result;
	}

	module.exports = fromPairs;


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Reference = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.config = config;

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _each = __webpack_require__(223);

	var _each2 = _interopRequireDefault(_each);

	var _types = __webpack_require__(66);

	var XDRTypes = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function config(fn) {
	  var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (fn) {
	    var builder = new TypeBuilder(types);
	    fn(builder);
	    builder.resolve();
	  }

	  return types;
	}

	var Reference = exports.Reference = function () {
	  function Reference() {
	    _classCallCheck(this, Reference);
	  }

	  _createClass(Reference, [{
	    key: 'resolve',

	    /* jshint unused: false */
	    value: function resolve() {
	      throw new Error('implement resolve in child class');
	    }
	  }]);

	  return Reference;
	}();

	var SimpleReference = function (_Reference) {
	  _inherits(SimpleReference, _Reference);

	  function SimpleReference(name) {
	    _classCallCheck(this, SimpleReference);

	    var _this = _possibleConstructorReturn(this, (SimpleReference.__proto__ || Object.getPrototypeOf(SimpleReference)).call(this));

	    _this.name = name;
	    return _this;
	  }

	  _createClass(SimpleReference, [{
	    key: 'resolve',
	    value: function resolve(context) {
	      var defn = context.definitions[this.name];
	      return defn.resolve(context);
	    }
	  }]);

	  return SimpleReference;
	}(Reference);

	var ArrayReference = function (_Reference2) {
	  _inherits(ArrayReference, _Reference2);

	  function ArrayReference(childReference, length) {
	    var variable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    _classCallCheck(this, ArrayReference);

	    var _this2 = _possibleConstructorReturn(this, (ArrayReference.__proto__ || Object.getPrototypeOf(ArrayReference)).call(this));

	    _this2.childReference = childReference;
	    _this2.length = length;
	    _this2.variable = variable;
	    return _this2;
	  }

	  _createClass(ArrayReference, [{
	    key: 'resolve',
	    value: function resolve(context) {
	      var resolvedChild = this.childReference;
	      var length = this.length;

	      if (resolvedChild instanceof Reference) {
	        resolvedChild = resolvedChild.resolve(context);
	      }

	      if (length instanceof Reference) {
	        length = length.resolve(context);
	      }

	      if (this.variable) {
	        return new XDRTypes.VarArray(resolvedChild, length);
	      }
	      return new XDRTypes.Array(resolvedChild, length);
	    }
	  }]);

	  return ArrayReference;
	}(Reference);

	var OptionReference = function (_Reference3) {
	  _inherits(OptionReference, _Reference3);

	  function OptionReference(childReference) {
	    _classCallCheck(this, OptionReference);

	    var _this3 = _possibleConstructorReturn(this, (OptionReference.__proto__ || Object.getPrototypeOf(OptionReference)).call(this));

	    _this3.childReference = childReference;
	    _this3.name = childReference.name;
	    return _this3;
	  }

	  _createClass(OptionReference, [{
	    key: 'resolve',
	    value: function resolve(context) {
	      var resolvedChild = this.childReference;

	      if (resolvedChild instanceof Reference) {
	        resolvedChild = resolvedChild.resolve(context);
	      }

	      return new XDRTypes.Option(resolvedChild);
	    }
	  }]);

	  return OptionReference;
	}(Reference);

	var SizedReference = function (_Reference4) {
	  _inherits(SizedReference, _Reference4);

	  function SizedReference(sizedType, length) {
	    _classCallCheck(this, SizedReference);

	    var _this4 = _possibleConstructorReturn(this, (SizedReference.__proto__ || Object.getPrototypeOf(SizedReference)).call(this));

	    _this4.sizedType = sizedType;
	    _this4.length = length;
	    return _this4;
	  }

	  _createClass(SizedReference, [{
	    key: 'resolve',
	    value: function resolve(context) {
	      var length = this.length;

	      if (length instanceof Reference) {
	        length = length.resolve(context);
	      }

	      return new this.sizedType(length);
	    }
	  }]);

	  return SizedReference;
	}(Reference);

	var Definition = function () {
	  function Definition(constructor, name, cfg) {
	    _classCallCheck(this, Definition);

	    this.constructor = constructor;
	    this.name = name;
	    this.config = cfg;
	  }

	  // resolve calls the constructor of this definition with the provided context
	  // and this definitions config values.  The definitions constructor should
	  // populate the final type on `context.results`, and may refer to other
	  // definitions through `context.definitions`


	  _createClass(Definition, [{
	    key: 'resolve',
	    value: function resolve(context) {
	      if (this.name in context.results) {
	        return context.results[this.name];
	      }

	      return this.constructor(context, this.name, this.config);
	    }
	  }]);

	  return Definition;
	}();

	// let the reference resoltion system do it's thing
	// the "constructor" for a typedef just returns the resolved value


	function createTypedef(context, typeName, value) {
	  if (value instanceof Reference) {
	    value = value.resolve(context);
	  }
	  context.results[typeName] = value;
	  return value;
	}

	function createConst(context, name, value) {
	  context.results[name] = value;
	  return value;
	}

	var TypeBuilder = function () {
	  function TypeBuilder(destination) {
	    _classCallCheck(this, TypeBuilder);

	    this._destination = destination;
	    this._definitions = {};
	  }

	  _createClass(TypeBuilder, [{
	    key: 'enum',
	    value: function _enum(name, members) {
	      var result = new Definition(XDRTypes.Enum.create, name, members);
	      this.define(name, result);
	    }
	  }, {
	    key: 'struct',
	    value: function struct(name, members) {
	      var result = new Definition(XDRTypes.Struct.create, name, members);
	      this.define(name, result);
	    }
	  }, {
	    key: 'union',
	    value: function union(name, cfg) {
	      var result = new Definition(XDRTypes.Union.create, name, cfg);
	      this.define(name, result);
	    }
	  }, {
	    key: 'typedef',
	    value: function typedef(name, cfg) {
	      var result = new Definition(createTypedef, name, cfg);
	      this.define(name, result);
	    }
	  }, {
	    key: 'const',
	    value: function _const(name, cfg) {
	      var result = new Definition(createConst, name, cfg);
	      this.define(name, result);
	    }
	  }, {
	    key: 'void',
	    value: function _void() {
	      return XDRTypes.Void;
	    }
	  }, {
	    key: 'bool',
	    value: function bool() {
	      return XDRTypes.Bool;
	    }
	  }, {
	    key: 'int',
	    value: function int() {
	      return XDRTypes.Int;
	    }
	  }, {
	    key: 'hyper',
	    value: function hyper() {
	      return XDRTypes.Hyper;
	    }
	  }, {
	    key: 'uint',
	    value: function uint() {
	      return XDRTypes.UnsignedInt;
	    }
	  }, {
	    key: 'uhyper',
	    value: function uhyper() {
	      return XDRTypes.UnsignedHyper;
	    }
	  }, {
	    key: 'float',
	    value: function float() {
	      return XDRTypes.Float;
	    }
	  }, {
	    key: 'double',
	    value: function double() {
	      return XDRTypes.Double;
	    }
	  }, {
	    key: 'quadruple',
	    value: function quadruple() {
	      return XDRTypes.Quadruple;
	    }
	  }, {
	    key: 'string',
	    value: function string(length) {
	      return new SizedReference(XDRTypes.String, length);
	    }
	  }, {
	    key: 'opaque',
	    value: function opaque(length) {
	      return new SizedReference(XDRTypes.Opaque, length);
	    }
	  }, {
	    key: 'varOpaque',
	    value: function varOpaque(length) {
	      return new SizedReference(XDRTypes.VarOpaque, length);
	    }
	  }, {
	    key: 'array',
	    value: function array(childType, length) {
	      return new ArrayReference(childType, length);
	    }
	  }, {
	    key: 'varArray',
	    value: function varArray(childType, maxLength) {
	      return new ArrayReference(childType, maxLength, true);
	    }
	  }, {
	    key: 'option',
	    value: function option(childType) {
	      return new OptionReference(childType);
	    }
	  }, {
	    key: 'define',
	    value: function define(name, definition) {
	      if ((0, _isUndefined2.default)(this._destination[name])) {
	        this._definitions[name] = definition;
	      } else {
	        throw new Error('XDRTypes Error:' + name + ' is already defined');
	      }
	    }
	  }, {
	    key: 'lookup',
	    value: function lookup(name) {
	      return new SimpleReference(name);
	    }
	  }, {
	    key: 'resolve',
	    value: function resolve() {
	      var _this5 = this;

	      (0, _each2.default)(this._definitions, function (defn) {
	        defn.resolve({
	          definitions: _this5._definitions,
	          results: _this5._destination
	        });
	      });
	    }
	  }]);

	  return TypeBuilder;
	}();

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Union = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _map = __webpack_require__(235);

	var _map2 = _interopRequireDefault(_map);

	var _each = __webpack_require__(223);

	var _each2 = _interopRequireDefault(_each);

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _void = __webpack_require__(233);

	var _config = __webpack_require__(308);

	var _ioMixin = __webpack_require__(69);

	var _ioMixin2 = _interopRequireDefault(_ioMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Union = exports.Union = function () {
	  function Union(aSwitch, value) {
	    _classCallCheck(this, Union);

	    this.set(aSwitch, value);
	  }

	  _createClass(Union, [{
	    key: 'set',
	    value: function set(aSwitch, value) {
	      if ((0, _isString2.default)(aSwitch)) {
	        aSwitch = this.constructor._switchOn.fromName(aSwitch);
	      }

	      this._switch = aSwitch;
	      this._arm = this.constructor.armForSwitch(this._switch);
	      this._armType = this.constructor.armTypeForArm(this._arm);
	      this._value = value;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      var armName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._arm;

	      if (this._arm !== _void.Void && this._arm !== armName) {
	        throw new Error(armName + ' not set');
	      }
	      return this._value;
	    }
	  }, {
	    key: 'switch',
	    value: function _switch() {
	      return this._switch;
	    }
	  }, {
	    key: 'arm',
	    value: function arm() {
	      return this._arm;
	    }
	  }, {
	    key: 'armType',
	    value: function armType() {
	      return this._armType;
	    }
	  }, {
	    key: 'value',
	    value: function value() {
	      return this._value;
	    }
	  }], [{
	    key: 'armForSwitch',
	    value: function armForSwitch(aSwitch) {
	      if (this._switches.has(aSwitch)) {
	        return this._switches.get(aSwitch);
	      }
	      if (this._defaultArm) {
	        return this._defaultArm;
	      }
	      throw new Error('Bad union switch: ' + aSwitch);
	    }
	  }, {
	    key: 'armTypeForArm',
	    value: function armTypeForArm(arm) {
	      if (arm === _void.Void) {
	        return _void.Void;
	      }
	      return this._arms[arm];
	    }
	  }, {
	    key: 'read',
	    value: function read(io) {
	      var aSwitch = this._switchOn.read(io);
	      var arm = this.armForSwitch(aSwitch);
	      var armType = this.armTypeForArm(arm);
	      var value = void 0;
	      if (!(0, _isUndefined2.default)(armType)) {
	        value = armType.read(io);
	      } else {
	        value = arm.read(io);
	      }
	      return new this(aSwitch, value);
	    }
	  }, {
	    key: 'write',
	    value: function write(value, io) {
	      if (!(value instanceof this)) {
	        throw new Error('XDR Write Error: ' + value + ' is not a ' + this.unionName);
	      }

	      this._switchOn.write(value.switch(), io);
	      value.armType().write(value.value(), io);
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(value) {
	      return value instanceof this;
	    }
	  }, {
	    key: 'create',
	    value: function create(context, name, config) {
	      var ChildUnion = function (_Union) {
	        _inherits(ChildUnion, _Union);

	        function ChildUnion() {
	          _classCallCheck(this, ChildUnion);

	          return _possibleConstructorReturn(this, (ChildUnion.__proto__ || Object.getPrototypeOf(ChildUnion)).apply(this, arguments));
	        }

	        return ChildUnion;
	      }(Union);

	      ChildUnion.unionName = name;
	      context.results[name] = ChildUnion;

	      if (config.switchOn instanceof _config.Reference) {
	        ChildUnion._switchOn = config.switchOn.resolve(context);
	      } else {
	        ChildUnion._switchOn = config.switchOn;
	      }

	      ChildUnion._switches = new _map2.default();
	      ChildUnion._arms = {};

	      (0, _each2.default)(config.arms, function (value, armsName) {
	        if (value instanceof _config.Reference) {
	          value = value.resolve(context);
	        }

	        ChildUnion._arms[armsName] = value;
	      });

	      // resolve default arm
	      var defaultArm = config.defaultArm;
	      if (defaultArm instanceof _config.Reference) {
	        defaultArm = defaultArm.resolve(context);
	      }

	      ChildUnion._defaultArm = defaultArm;

	      (0, _each2.default)(config.switches, function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            aSwitch = _ref2[0],
	            armName = _ref2[1];

	        if ((0, _isString2.default)(aSwitch)) {
	          aSwitch = ChildUnion._switchOn.fromName(aSwitch);
	        }

	        ChildUnion._switches.set(aSwitch, armName);
	      });

	      // add enum-based helpers
	      // NOTE: we don't have good notation for "is a subclass of XDR.Enum",
	      //  and so we use the following check (does _switchOn have a `values`
	      //  attribute) to approximate the intent.
	      if (!(0, _isUndefined2.default)(ChildUnion._switchOn.values)) {
	        (0, _each2.default)(ChildUnion._switchOn.values(), function (aSwitch) {
	          // Add enum-based constrocutors
	          ChildUnion[aSwitch.name] = function (value) {
	            return new ChildUnion(aSwitch, value);
	          };

	          // Add enum-based "set" helpers
	          // (note: normally I'd use an arrow function but the use of `this`
	          // here might rely on it NOT being an arrow function. so just keep it.)
	          ChildUnion.prototype[aSwitch.name] = function set(value) {
	            return this.set(aSwitch, value);
	          };
	        });
	      }

	      // Add arm accessor helpers
	      (0, _each2.default)(ChildUnion._arms, function (type, armsName) {
	        if (type === _void.Void) {
	          return;
	        }

	        ChildUnion.prototype[armsName] = function get() {
	          return this.get(armsName);
	        };
	      });

	      return ChildUnion;
	    }
	  }]);

	  return Union;
	}();

	(0, _ioMixin2.default)(Union);

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Transaction = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _map = __webpack_require__(305);

	var _map2 = _interopRequireDefault(_map);

	var _each = __webpack_require__(223);

	var _each2 = _interopRequireDefault(_each);

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _hashing = __webpack_require__(2);

	var _strkey = __webpack_require__(27);

	var _operation = __webpack_require__(311);

	var _network = __webpack_require__(22);

	var _memo = __webpack_require__(372);

	var _keypair = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Use {@link TransactionBuilder} to build a transaction object, unless you have
	 * an object or base64-encoded string of the transaction envelope XDR.
	 * Once a Transaction has been created, its attributes and operations
	 * should not be changed. You should only add signatures (using {@link Transaction#sign}) to a Transaction object before
	 * submitting to the network or forwarding on to additional signers.
	 * @constructor
	 * @param {string|xdr.TransactionEnvelope} envelope - The transaction envelope object or base64 encoded string.
	 * @param {string} [networkPassphrase] passphrase of the target stellar network (e.g. "Public Global Stellar Network ; September 2015").
	 */
	var Transaction = exports.Transaction = function () {
	  function Transaction(envelope, networkPassphrase) {
	    _classCallCheck(this, Transaction);

	    if (typeof envelope === 'string') {
	      var buffer = Buffer.from(envelope, 'base64');
	      envelope = _stellarXdr_generated2.default.TransactionEnvelope.fromXDR(buffer);
	    }

	    // Deprecation warning. TODO: remove optionality with next major release.
	    if (typeof networkPassphrase !== 'string') {
	      console.warn('Global `Network.current()` is deprecated. Please pass explicit argument instead, e.g. `new Transaction(envelope, Networks.PUBLIC)` (see https://git.io/fj9fG for more info).');
	    }
	    this._networkPassphrase = networkPassphrase;

	    // since this transaction is immutable, save the tx
	    this.tx = envelope.tx();
	    this.source = _strkey.StrKey.encodeEd25519PublicKey(envelope.tx().sourceAccount().ed25519());
	    this.fee = this.tx.fee();
	    this._memo = this.tx.memo();
	    this.sequence = this.tx.seqNum().toString();

	    var timeBounds = this.tx.timeBounds();
	    if (timeBounds) {
	      this.timeBounds = {
	        minTime: timeBounds.minTime().toString(),
	        maxTime: timeBounds.maxTime().toString()
	      };
	    }

	    var operations = this.tx.operations() || [];
	    this.operations = (0, _map2.default)(operations, function (op) {
	      return _operation.Operation.fromXDRObject(op);
	    });

	    var signatures = envelope.signatures() || [];
	    this.signatures = (0, _map2.default)(signatures, function (s) {
	      return s;
	    });
	  }

	  _createClass(Transaction, [{
	    key: 'sign',


	    /**
	     * Signs the transaction with the given {@link Keypair}.
	     * @param {...Keypair} keypairs Keypairs of signers
	     * @returns {void}
	     */
	    value: function sign() {
	      var _this = this;

	      var txHash = this.hash();

	      for (var _len = arguments.length, keypairs = Array(_len), _key = 0; _key < _len; _key++) {
	        keypairs[_key] = arguments[_key];
	      }

	      (0, _each2.default)(keypairs, function (kp) {
	        var sig = kp.signDecorated(txHash);
	        _this.signatures.push(sig);
	      });
	    }

	    /**
	     * Signs a transaction with the given {@link Keypair}. Useful if someone sends
	     * you a transaction XDR for you to sign and return (see
	     * {@link Transaction#addSignature} for how that works).
	     *
	     * When you get a transaction XDR to sign....
	     * - Instantiate a `Transaction` object with the XDR
	     * - Use {@link Keypair} to generate a keypair object for your Stellar seed.
	     * - Run `getKeypairSignature` with that keypair
	     * - Send back the signature along with your publicKey (not your secret seed!)
	     *
	     * Example:
	     * ```javascript
	     * // `transactionXDR` is a string from the person generating the transaction
	     * const transaction = new Transaction(transactionXDR, networkPassphrase);
	     * const keypair = Keypair.fromSecret(myStellarSeed);
	     * return transaction.getKeypairSignature(keypair);
	     * ```
	     *
	     * @param {Keypair} keypair Keypair of signer
	     * @returns {string} Signature string
	     */

	  }, {
	    key: 'getKeypairSignature',
	    value: function getKeypairSignature(keypair) {
	      return keypair.sign(this.hash()).toString('base64');
	    }

	    /**
	     * Add a signature to the transaction. Useful when a party wants to pre-sign
	     * a transaction but doesn't want to give access to their secret keys.
	     * This will also verify whether the signature is valid.
	     *
	     * Here's how you would use this feature to solicit multiple signatures.
	     * - Use `TransactionBuilder` to build a new transaction.
	     * - Make sure to set a long enough timeout on that transaction to give your
	     * signers enough time to sign!
	     * - Once you build the transaction, use `transaction.toXDR()` to get the
	     * base64-encoded XDR string.
	     * - _Warning!_ Once you've built this transaction, don't submit any other
	     * transactions onto your account! Doing so will invalidate this pre-compiled
	     * transaction!
	     * - Send this XDR string to your other parties. They can use the instructions
	     * for {@link Transaction#getKeypairSignature} to sign the transaction.
	     * - They should send you back their `publicKey` and the `signature` string
	     * from {@link Transaction#getKeypairSignature}, both of which you pass to
	     * this function.
	     *
	     * @param {string} publicKey The public key of the signer
	     * @param {string} signature The base64 value of the signature XDR
	     * @returns {TransactionBuilder}
	     */

	  }, {
	    key: 'addSignature',
	    value: function addSignature() {
	      var publicKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var signature = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	      if (!signature || typeof signature !== 'string') {
	        throw new Error('Invalid signature');
	      }

	      if (!publicKey || typeof publicKey !== 'string') {
	        throw new Error('Invalid publicKey');
	      }

	      var keypair = void 0;
	      var hint = void 0;
	      var signatureBuffer = Buffer.from(signature, 'base64');

	      try {
	        keypair = _keypair.Keypair.fromPublicKey(publicKey);
	        hint = keypair.signatureHint();
	      } catch (e) {
	        throw new Error('Invalid publicKey');
	      }

	      if (!keypair.verify(this.hash(), signatureBuffer)) {
	        throw new Error('Invalid signature');
	      }

	      this.signatures.push(new _stellarXdr_generated2.default.DecoratedSignature({
	        hint: hint,
	        signature: signatureBuffer
	      }));
	    }

	    /**
	     * Add `hashX` signer preimage as signature.
	     * @param {Buffer|String} preimage Preimage of hash used as signer
	     * @returns {void}
	     */

	  }, {
	    key: 'signHashX',
	    value: function signHashX(preimage) {
	      if ((0, _isString2.default)(preimage)) {
	        preimage = Buffer.from(preimage, 'hex');
	      }

	      if (preimage.length > 64) {
	        throw new Error('preimage cannnot be longer than 64 bytes');
	      }

	      var signature = preimage;
	      var hashX = (0, _hashing.hash)(preimage);
	      var hint = hashX.slice(hashX.length - 4);
	      this.signatures.push(new _stellarXdr_generated2.default.DecoratedSignature({ hint: hint, signature: signature }));
	    }

	    /**
	     * Returns a hash for this transaction, suitable for signing.
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'hash',
	    value: function hash() {
	      return (0, _hashing.hash)(this.signatureBase());
	    }

	    /**
	     * Returns the "signature base" of this transaction, which is the value
	     * that, when hashed, should be signed to create a signature that
	     * validators on the Stellar Network will accept.
	     *
	     * It is composed of a 4 prefix bytes followed by the xdr-encoded form
	     * of this transaction.
	     * @returns {Buffer}
	     */

	  }, {
	    key: 'signatureBase',
	    value: function signatureBase() {
	      return Buffer.concat([(0, _hashing.hash)(this.networkPassphrase), _stellarXdr_generated2.default.EnvelopeType.envelopeTypeTx().toXDR(), this.tx.toXDR()]);
	    }

	    /**
	     * To envelope returns a xdr.TransactionEnvelope which can be submitted to the network.
	     * @returns {xdr.TransactionEnvelope}
	     */

	  }, {
	    key: 'toEnvelope',
	    value: function toEnvelope() {
	      var tx = this.tx;
	      var signatures = this.signatures;
	      var envelope = new _stellarXdr_generated2.default.TransactionEnvelope({ tx: tx, signatures: signatures });

	      return envelope;
	    }

	    /**
	     * Get the transaction envelope as a base64-encoded string
	     * @returns {string} XDR string
	     */

	  }, {
	    key: 'toXDR',
	    value: function toXDR() {
	      return this.toEnvelope().toXDR().toString('base64');
	    }
	  }, {
	    key: 'networkPassphrase',
	    get: function get() {
	      if (this._networkPassphrase) {
	        return this._networkPassphrase;
	      }

	      console.warn('Global `Network.current()` is deprecated. Please pass explicit argument instead, e.g. `new Transaction(envelope, Networks.PUBLIC)` (see https://git.io/fj9fG for more info).');

	      if (_network.Network.current() === null) {
	        throw new Error('No network selected. Please pass a network argument, e.g. `new Transaction(envelope, Networks.PUBLIC)`.');
	      }

	      return _network.Network.current().networkPassphrase();
	    },
	    set: function set(networkPassphrase) {
	      this._networkPassphrase = networkPassphrase;
	    }
	  }, {
	    key: 'memo',
	    get: function get() {
	      return _memo.Memo.fromXDRObject(this._memo);
	    },
	    set: function set(value) {
	      throw new Error('Transaction is immutable');
	    }
	  }]);

	  return Transaction;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Operation = exports.AuthImmutableFlag = exports.AuthRevocableFlag = exports.AuthRequiredFlag = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-bitwise */

	var _jsXdr = __webpack_require__(65);

	var _bignumber = __webpack_require__(312);

	var _bignumber2 = _interopRequireDefault(_bignumber);

	var _trimEnd = __webpack_require__(313);

	var _trimEnd2 = _interopRequireDefault(_trimEnd);

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _isNumber = __webpack_require__(68);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	var _isFinite = __webpack_require__(325);

	var _isFinite2 = _interopRequireDefault(_isFinite);

	var _continued_fraction = __webpack_require__(326);

	var _asset = __webpack_require__(327);

	var _strkey = __webpack_require__(27);

	var _keypair = __webpack_require__(21);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _index = __webpack_require__(358);

	var ops = _interopRequireWildcard(_index);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ONE = 10000000;
	var MAX_INT64 = '9223372036854775807';

	/**
	 * When set using `{@link Operation.setOptions}` option, requires the issuing account to
	 * give other accounts permission before they can hold the issuing account’s credit.
	 * @constant
	 * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
	 */
	var AuthRequiredFlag = exports.AuthRequiredFlag = 1 << 0;
	/**
	 * When set using `{@link Operation.setOptions}` option, allows the issuing account to
	 * revoke its credit held by other accounts.
	 * @constant
	 * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
	 */
	var AuthRevocableFlag = exports.AuthRevocableFlag = 1 << 1;
	/**
	 * When set using `{@link Operation.setOptions}` option, then none of the authorization flags
	 * can be set and the account can never be deleted.
	 * @constant
	 * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
	 */
	var AuthImmutableFlag = exports.AuthImmutableFlag = 1 << 2;

	/**
	 * `Operation` class represents [operations](https://www.stellar.org/developers/learn/concepts/operations.html) in Stellar network.
	 * Use one of static methods to create operations:
	 * * `{@link Operation.createAccount}`
	 * * `{@link Operation.payment}`
	 * * `{@link Operation.pathPayment}`
	 * * `{@link Operation.manageSellOffer}`
	 * * `{@link Operation.manageBuyOffer}`
	 * * `{@link Operation.createPassiveSellOffer}`
	 * * `{@link Operation.setOptions}`
	 * * `{@link Operation.changeTrust}`
	 * * `{@link Operation.allowTrust}`
	 * * `{@link Operation.accountMerge}`
	 * * `{@link Operation.inflation}`
	 * * `{@link Operation.manageData}`
	 * * `{@link Operation.bumpSequence}`
	 *
	 * These operations are deprecated and will be removed in a later version:
	 * * `{@link Operation.manageOffer}`
	 * * `{@link Operation.createPassiveOffer}`
	 *
	 *
	 * @class Operation
	 */

	var Operation = exports.Operation = function () {
	  function Operation() {
	    _classCallCheck(this, Operation);
	  }

	  _createClass(Operation, null, [{
	    key: 'setSourceAccount',
	    value: function setSourceAccount(opAttributes, opts) {
	      if (opts.source) {
	        if (!_strkey.StrKey.isValidEd25519PublicKey(opts.source)) {
	          throw new Error('Source address is invalid');
	        }
	        opAttributes.sourceAccount = _keypair.Keypair.fromPublicKey(opts.source).xdrAccountId();
	      }
	    }

	    /**
	     * Converts the XDR Operation object to the opts object used to create the XDR
	     * operation.
	     * @param {xdr.Operation} operation - An XDR Operation.
	     * @return {Operation}
	     */

	  }, {
	    key: 'fromXDRObject',
	    value: function fromXDRObject(operation) {
	      function accountIdtoAddress(accountId) {
	        return _strkey.StrKey.encodeEd25519PublicKey(accountId.ed25519());
	      }

	      var result = {};
	      if (operation.sourceAccount()) {
	        result.source = accountIdtoAddress(operation.sourceAccount());
	      }

	      var attrs = operation.body().value();

	      switch (operation.body().switch().name) {
	        case 'createAccount':
	          {
	            result.type = 'createAccount';
	            result.destination = accountIdtoAddress(attrs.destination());
	            result.startingBalance = this._fromXDRAmount(attrs.startingBalance());
	            break;
	          }
	        case 'payment':
	          {
	            result.type = 'payment';
	            result.destination = accountIdtoAddress(attrs.destination());
	            result.asset = _asset.Asset.fromOperation(attrs.asset());
	            result.amount = this._fromXDRAmount(attrs.amount());
	            break;
	          }
	        case 'pathPayment':
	          {
	            result.type = 'pathPayment';
	            result.sendAsset = _asset.Asset.fromOperation(attrs.sendAsset());
	            result.sendMax = this._fromXDRAmount(attrs.sendMax());
	            result.destination = accountIdtoAddress(attrs.destination());
	            result.destAsset = _asset.Asset.fromOperation(attrs.destAsset());
	            result.destAmount = this._fromXDRAmount(attrs.destAmount());
	            result.path = [];

	            var path = attrs.path();

	            // note that Object.values isn't supported by node 6!
	            Object.keys(path).forEach(function (pathKey) {
	              result.path.push(_asset.Asset.fromOperation(path[pathKey]));
	            });
	            break;
	          }
	        case 'changeTrust':
	          {
	            result.type = 'changeTrust';
	            result.line = _asset.Asset.fromOperation(attrs.line());
	            result.limit = this._fromXDRAmount(attrs.limit());
	            break;
	          }
	        case 'allowTrust':
	          {
	            result.type = 'allowTrust';
	            result.trustor = accountIdtoAddress(attrs.trustor());
	            result.assetCode = attrs.asset().value().toString();
	            result.assetCode = (0, _trimEnd2.default)(result.assetCode, '\0');
	            result.authorize = attrs.authorize();
	            break;
	          }
	        case 'setOption':
	          {
	            result.type = 'setOptions';
	            if (attrs.inflationDest()) {
	              result.inflationDest = accountIdtoAddress(attrs.inflationDest());
	            }

	            result.clearFlags = attrs.clearFlags();
	            result.setFlags = attrs.setFlags();
	            result.masterWeight = attrs.masterWeight();
	            result.lowThreshold = attrs.lowThreshold();
	            result.medThreshold = attrs.medThreshold();
	            result.highThreshold = attrs.highThreshold();
	            // home_domain is checked by iscntrl in stellar-core
	            result.homeDomain = attrs.homeDomain() !== undefined ? attrs.homeDomain().toString('ascii') : undefined;

	            if (attrs.signer()) {
	              var signer = {};
	              var arm = attrs.signer().key().arm();
	              if (arm === 'ed25519') {
	                signer.ed25519PublicKey = accountIdtoAddress(attrs.signer().key());
	              } else if (arm === 'preAuthTx') {
	                signer.preAuthTx = attrs.signer().key().preAuthTx();
	              } else if (arm === 'hashX') {
	                signer.sha256Hash = attrs.signer().key().hashX();
	              }

	              signer.weight = attrs.signer().weight();
	              result.signer = signer;
	            }
	            break;
	          }
	        // the next case intentionally falls through!
	        case 'manageOffer':
	        case 'manageSellOffer':
	          {
	            result.type = 'manageSellOffer';
	            result.selling = _asset.Asset.fromOperation(attrs.selling());
	            result.buying = _asset.Asset.fromOperation(attrs.buying());
	            result.amount = this._fromXDRAmount(attrs.amount());
	            result.price = this._fromXDRPrice(attrs.price());
	            result.offerId = attrs.offerId().toString();
	            break;
	          }
	        case 'manageBuyOffer':
	          {
	            result.type = 'manageBuyOffer';
	            result.selling = _asset.Asset.fromOperation(attrs.selling());
	            result.buying = _asset.Asset.fromOperation(attrs.buying());
	            result.buyAmount = this._fromXDRAmount(attrs.buyAmount());
	            result.price = this._fromXDRPrice(attrs.price());
	            result.offerId = attrs.offerId().toString();
	            break;
	          }
	        // the next case intentionally falls through!
	        case 'createPassiveOffer':
	        case 'createPassiveSellOffer':
	          {
	            result.type = 'createPassiveSellOffer';
	            result.selling = _asset.Asset.fromOperation(attrs.selling());
	            result.buying = _asset.Asset.fromOperation(attrs.buying());
	            result.amount = this._fromXDRAmount(attrs.amount());
	            result.price = this._fromXDRPrice(attrs.price());
	            break;
	          }
	        case 'accountMerge':
	          {
	            result.type = 'accountMerge';
	            result.destination = accountIdtoAddress(attrs);
	            break;
	          }
	        case 'manageDatum':
	          {
	            result.type = 'manageData';
	            // manage_data.name is checked by iscntrl in stellar-core
	            result.name = attrs.dataName().toString('ascii');
	            result.value = attrs.dataValue();
	            break;
	          }
	        case 'inflation':
	          {
	            result.type = 'inflation';
	            break;
	          }
	        case 'bumpSequence':
	          {
	            result.type = 'bumpSequence';
	            result.bumpTo = attrs.bumpTo().toString();
	            break;
	          }
	        default:
	          {
	            throw new Error('Unknown operation');
	          }
	      }
	      return result;
	    }
	  }, {
	    key: 'isValidAmount',
	    value: function isValidAmount(value) {
	      var allowZero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      if (!(0, _isString2.default)(value)) {
	        return false;
	      }

	      var amount = void 0;
	      try {
	        amount = new _bignumber2.default(value);
	      } catch (e) {
	        return false;
	      }

	      if (
	      // == 0
	      !allowZero && amount.isZero() ||
	      // < 0
	      amount.isNegative() ||
	      // > Max value
	      amount.times(ONE).greaterThan(new _bignumber2.default(MAX_INT64).toString()) ||
	      // Decimal places (max 7)
	      amount.decimalPlaces() > 7 ||
	      // NaN or Infinity
	      amount.isNaN() || !amount.isFinite()) {
	        return false;
	      }

	      return true;
	    }
	  }, {
	    key: 'constructAmountRequirementsError',
	    value: function constructAmountRequirementsError(arg) {
	      return arg + ' argument must be of type String, represent a positive number and have at most 7 digits after the decimal';
	    }

	    /**
	     * Returns value converted to uint32 value or undefined.
	     * If `value` is not `Number`, `String` or `Undefined` then throws an error.
	     * Used in {@link Operation.setOptions}.
	     * @private
	     * @param {string} name Name of the property (used in error message only)
	     * @param {*} value Value to check
	     * @param {function(value, name)} isValidFunction Function to check other constraints (the argument will be a `Number`)
	     * @returns {undefined|Number}
	     */

	  }, {
	    key: '_checkUnsignedIntValue',
	    value: function _checkUnsignedIntValue(name, value) {
	      var isValidFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      if ((0, _isUndefined2.default)(value)) {
	        return undefined;
	      }

	      if ((0, _isString2.default)(value)) {
	        value = parseFloat(value);
	      }

	      switch (true) {
	        case !(0, _isNumber2.default)(value) || !(0, _isFinite2.default)(value) || value % 1 !== 0:
	          throw new Error(name + ' value is invalid');
	        case value < 0:
	          throw new Error(name + ' value must be unsigned');
	        case !isValidFunction || isValidFunction && isValidFunction(value, name):
	          return value;
	        default:
	          throw new Error(name + ' value is invalid');
	      }
	    }
	    /**
	     * @private
	     * @param {string|BigNumber} value Value
	     * @returns {Hyper} XDR amount
	     */

	  }, {
	    key: '_toXDRAmount',
	    value: function _toXDRAmount(value) {
	      var amount = new _bignumber2.default(value).mul(ONE);
	      return _jsXdr.Hyper.fromString(amount.toString());
	    }

	    /**
	     * @private
	     * @param {string|BigNumber} value XDR amount
	     * @returns {BigNumber} Number
	     */

	  }, {
	    key: '_fromXDRAmount',
	    value: function _fromXDRAmount(value) {
	      return new _bignumber2.default(value).div(ONE).toFixed(7);
	    }

	    /**
	     * @private
	     * @param {object} price Price object
	     * @param {function} price.n numerator function that returns a value
	     * @param {function} price.d denominator function that returns a value
	     * @returns {BigNumber} Big string
	     */

	  }, {
	    key: '_fromXDRPrice',
	    value: function _fromXDRPrice(price) {
	      var n = new _bignumber2.default(price.n());
	      return n.div(new _bignumber2.default(price.d())).toString();
	    }

	    /**
	     * @private
	     * @param {object} price Price object
	     * @param {function} price.n numerator function that returns a value
	     * @param {function} price.d denominator function that returns a value
	     * @returns {object} XDR price object
	     */

	  }, {
	    key: '_toXDRPrice',
	    value: function _toXDRPrice(price) {
	      var xdrObject = void 0;
	      if (price.n && price.d) {
	        xdrObject = new _stellarXdr_generated2.default.Price(price);
	      } else {
	        price = new _bignumber2.default(price);
	        var approx = (0, _continued_fraction.best_r)(price);
	        xdrObject = new _stellarXdr_generated2.default.Price({
	          n: parseInt(approx[0], 10),
	          d: parseInt(approx[1], 10)
	        });
	      }

	      if (xdrObject.n() < 0 || xdrObject.d() < 0) {
	        throw new Error('price must be positive');
	      }

	      return xdrObject;
	    }
	  }]);

	  return Operation;
	}();

	// Attach all imported operations as static methods on the Operation class


	Operation.accountMerge = ops.accountMerge;
	Operation.allowTrust = ops.allowTrust;
	Operation.bumpSequence = ops.bumpSequence;
	Operation.changeTrust = ops.changeTrust;
	Operation.createAccount = ops.createAccount;
	Operation.createPassiveSellOffer = ops.createPassiveSellOffer;
	Operation.inflation = ops.inflation;
	Operation.manageData = ops.manageData;
	Operation.manageSellOffer = ops.manageSellOffer;
	Operation.manageBuyOffer = ops.manageBuyOffer;
	Operation.pathPayment = ops.pathPayment;
	Operation.payment = ops.payment;
	Operation.setOptions = ops.setOptions;

	// deprecated, to be removed after 1.0.1
	Operation.manageOffer = ops.manageOffer;
	Operation.createPassiveOffer = ops.createPassiveOffer;

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! bignumber.js v4.1.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

	;(function (globalObj) {
	    'use strict';

	    /*
	      bignumber.js v4.1.0
	      A JavaScript library for arbitrary-precision arithmetic.
	      https://github.com/MikeMcl/bignumber.js
	      Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
	      MIT Expat Licence
	    */


	    var BigNumber,
	        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	        mathceil = Math.ceil,
	        mathfloor = Math.floor,
	        notBool = ' not a boolean or binary digit',
	        roundingMode = 'rounding mode',
	        tooManyDigits = 'number type has more than 15 significant digits',
	        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
	        BASE = 1e14,
	        LOG_BASE = 14,
	        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
	        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
	        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
	        SQRT_BASE = 1e7,

	        /*
	         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
	         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
	         * exception is thrown (if ERRORS is true).
	         */
	        MAX = 1E9;                                   // 0 to MAX_INT32


	    /*
	     * Create and return a BigNumber constructor.
	     */
	    function constructorFactory(config) {
	        var div, parseNumeric,

	            // id tracks the caller function, so its name can be included in error messages.
	            id = 0,
	            P = BigNumber.prototype,
	            ONE = new BigNumber(1),


	            /********************************* EDITABLE DEFAULTS **********************************/


	            /*
	             * The default values below must be integers within the inclusive ranges stated.
	             * The values can also be changed at run-time using BigNumber.config.
	             */

	            // The maximum number of decimal places for operations involving division.
	            DECIMAL_PLACES = 20,                     // 0 to MAX

	            /*
	             * The rounding mode used when rounding to the above decimal places, and when using
	             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
	             * UP         0 Away from zero.
	             * DOWN       1 Towards zero.
	             * CEIL       2 Towards +Infinity.
	             * FLOOR      3 Towards -Infinity.
	             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	             */
	            ROUNDING_MODE = 4,                       // 0 to 8

	            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

	            // The exponent value at and beneath which toString returns exponential notation.
	            // Number type: -7
	            TO_EXP_NEG = -7,                         // 0 to -MAX

	            // The exponent value at and above which toString returns exponential notation.
	            // Number type: 21
	            TO_EXP_POS = 21,                         // 0 to MAX

	            // RANGE : [MIN_EXP, MAX_EXP]

	            // The minimum exponent value, beneath which underflow to zero occurs.
	            // Number type: -324  (5e-324)
	            MIN_EXP = -1e7,                          // -1 to -MAX

	            // The maximum exponent value, above which overflow to Infinity occurs.
	            // Number type:  308  (1.7976931348623157e+308)
	            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
	            MAX_EXP = 1e7,                           // 1 to MAX

	            // Whether BigNumber Errors are ever thrown.
	            ERRORS = true,                           // true or false

	            // Change to intValidatorNoErrors if ERRORS is false.
	            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

	            // Whether to use cryptographically-secure random number generation, if available.
	            CRYPTO = false,                          // true or false

	            /*
	             * The modulo mode used when calculating the modulus: a mod n.
	             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	             * The remainder (r) is calculated as: r = a - n * q.
	             *
	             * UP        0 The remainder is positive if the dividend is negative, else is negative.
	             * DOWN      1 The remainder has the same sign as the dividend.
	             *             This modulo mode is commonly known as 'truncated division' and is
	             *             equivalent to (a % n) in JavaScript.
	             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
	             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
	             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
	             *             The remainder is always positive.
	             *
	             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
	             * modes are commonly used for the modulus operation.
	             * Although the other rounding modes can also be used, they may not give useful results.
	             */
	            MODULO_MODE = 1,                         // 0 to 9

	            // The maximum number of significant digits of the result of the toPower operation.
	            // If POW_PRECISION is 0, there will be unlimited significant digits.
	            POW_PRECISION = 0,                       // 0 to MAX

	            // The format specification used by the BigNumber.prototype.toFormat method.
	            FORMAT = {
	                decimalSeparator: '.',
	                groupSeparator: ',',
	                groupSize: 3,
	                secondaryGroupSize: 0,
	                fractionGroupSeparator: '\xA0',      // non-breaking space
	                fractionGroupSize: 0
	            };


	        /******************************************************************************************/


	        // CONSTRUCTOR


	        /*
	         * The BigNumber constructor and exported function.
	         * Create and return a new instance of a BigNumber object.
	         *
	         * n {number|string|BigNumber} A numeric value.
	         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
	         */
	        function BigNumber( n, b ) {
	            var c, e, i, num, len, str,
	                x = this;

	            // Enable constructor usage without new.
	            if ( !( x instanceof BigNumber ) ) {

	                // 'BigNumber() constructor call without new: {n}'
	                if (ERRORS) raise( 26, 'constructor call without new', n );
	                return new BigNumber( n, b );
	            }

	            // 'new BigNumber() base not an integer: {b}'
	            // 'new BigNumber() base out of range: {b}'
	            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

	                // Duplicate.
	                if ( n instanceof BigNumber ) {
	                    x.s = n.s;
	                    x.e = n.e;
	                    x.c = ( n = n.c ) ? n.slice() : n;
	                    id = 0;
	                    return;
	                }

	                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
	                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

	                    // Fast path for integers.
	                    if ( n === ~~n ) {
	                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
	                        x.e = e;
	                        x.c = [n];
	                        id = 0;
	                        return;
	                    }

	                    str = n + '';
	                } else {
	                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
	                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
	                }
	            } else {
	                b = b | 0;
	                str = n + '';

	                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
	                // Allow exponential notation to be used with base 10 argument.
	                if ( b == 10 ) {
	                    x = new BigNumber( n instanceof BigNumber ? n : str );
	                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
	                }

	                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
	                // Any number in exponential form will fail due to the [Ee][+-].
	                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
	                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
	                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
	                    return parseNumeric( x, str, num, b );
	                }

	                if (num) {
	                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

	                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

	                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                        raise( id, tooManyDigits, n );
	                    }

	                    // Prevent later check for length on converted number.
	                    num = false;
	                } else {
	                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
	                }

	                str = convertBase( str, 10, b, x.s );
	            }

	            // Decimal point?
	            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

	            // Exponential form?
	            if ( ( i = str.search( /e/i ) ) > 0 ) {

	                // Determine exponent.
	                if ( e < 0 ) e = i;
	                e += +str.slice( i + 1 );
	                str = str.substring( 0, i );
	            } else if ( e < 0 ) {

	                // Integer.
	                e = str.length;
	            }

	            // Determine leading zeros.
	            for ( i = 0; str.charCodeAt(i) === 48; i++ );

	            // Determine trailing zeros.
	            for ( len = str.length; str.charCodeAt(--len) === 48; );
	            str = str.slice( i, len + 1 );

	            if (str) {
	                len = str.length;

	                // Disallow numbers with over 15 significant digits if number type.
	                // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
	                    raise( id, tooManyDigits, x.s * n );
	                }

	                e = e - i - 1;

	                 // Overflow?
	                if ( e > MAX_EXP ) {

	                    // Infinity.
	                    x.c = x.e = null;

	                // Underflow?
	                } else if ( e < MIN_EXP ) {

	                    // Zero.
	                    x.c = [ x.e = 0 ];
	                } else {
	                    x.e = e;
	                    x.c = [];

	                    // Transform base

	                    // e is the base 10 exponent.
	                    // i is where to slice str to get the first element of the coefficient array.
	                    i = ( e + 1 ) % LOG_BASE;
	                    if ( e < 0 ) i += LOG_BASE;

	                    if ( i < len ) {
	                        if (i) x.c.push( +str.slice( 0, i ) );

	                        for ( len -= LOG_BASE; i < len; ) {
	                            x.c.push( +str.slice( i, i += LOG_BASE ) );
	                        }

	                        str = str.slice(i);
	                        i = LOG_BASE - str.length;
	                    } else {
	                        i -= len;
	                    }

	                    for ( ; i--; str += '0' );
	                    x.c.push( +str );
	                }
	            } else {

	                // Zero.
	                x.c = [ x.e = 0 ];
	            }

	            id = 0;
	        }


	        // CONSTRUCTOR PROPERTIES


	        BigNumber.another = constructorFactory;

	        BigNumber.ROUND_UP = 0;
	        BigNumber.ROUND_DOWN = 1;
	        BigNumber.ROUND_CEIL = 2;
	        BigNumber.ROUND_FLOOR = 3;
	        BigNumber.ROUND_HALF_UP = 4;
	        BigNumber.ROUND_HALF_DOWN = 5;
	        BigNumber.ROUND_HALF_EVEN = 6;
	        BigNumber.ROUND_HALF_CEIL = 7;
	        BigNumber.ROUND_HALF_FLOOR = 8;
	        BigNumber.EUCLID = 9;


	        /*
	         * Configure infrequently-changing library-wide settings.
	         *
	         * Accept an object or an argument list, with one or many of the following properties or
	         * parameters respectively:
	         *
	         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
	         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
	         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
	         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
	         *   ERRORS          {boolean|number}   true, false, 1 or 0
	         *   CRYPTO          {boolean|number}   true, false, 1 or 0
	         *   MODULO_MODE     {number}           0 to 9 inclusive
	         *   POW_PRECISION   {number}           0 to MAX inclusive
	         *   FORMAT          {object}           See BigNumber.prototype.toFormat
	         *      decimalSeparator       {string}
	         *      groupSeparator         {string}
	         *      groupSize              {number}
	         *      secondaryGroupSize     {number}
	         *      fractionGroupSeparator {string}
	         *      fractionGroupSize      {number}
	         *
	         * (The values assigned to the above FORMAT object properties are not checked for validity.)
	         *
	         * E.g.
	         * BigNumber.config(20, 4) is equivalent to
	         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	         *
	         * Ignore properties/parameters set to null or undefined.
	         * Return an object with the properties current values.
	         */
	        BigNumber.config = BigNumber.set = function () {
	            var v, p,
	                i = 0,
	                r = {},
	                a = arguments,
	                o = a[0],
	                has = o && typeof o == 'object'
	                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
	                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

	            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
	            // 'config() DECIMAL_PLACES not an integer: {v}'
	            // 'config() DECIMAL_PLACES out of range: {v}'
	            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
	                DECIMAL_PLACES = v | 0;
	            }
	            r[p] = DECIMAL_PLACES;

	            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
	            // 'config() ROUNDING_MODE not an integer: {v}'
	            // 'config() ROUNDING_MODE out of range: {v}'
	            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
	                ROUNDING_MODE = v | 0;
	            }
	            r[p] = ROUNDING_MODE;

	            // EXPONENTIAL_AT {number|number[]}
	            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
	            // 'config() EXPONENTIAL_AT not an integer: {v}'
	            // 'config() EXPONENTIAL_AT out of range: {v}'
	            if ( has( p = 'EXPONENTIAL_AT' ) ) {

	                if ( isArray(v) ) {
	                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
	                        TO_EXP_NEG = v[0] | 0;
	                        TO_EXP_POS = v[1] | 0;
	                    }
	                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
	                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
	                }
	            }
	            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

	            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
	            // 'config() RANGE not an integer: {v}'
	            // 'config() RANGE cannot be zero: {v}'
	            // 'config() RANGE out of range: {v}'
	            if ( has( p = 'RANGE' ) ) {

	                if ( isArray(v) ) {
	                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
	                        MIN_EXP = v[0] | 0;
	                        MAX_EXP = v[1] | 0;
	                    }
	                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
	                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
	                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
	                }
	            }
	            r[p] = [ MIN_EXP, MAX_EXP ];

	            // ERRORS {boolean|number} true, false, 1 or 0.
	            // 'config() ERRORS not a boolean or binary digit: {v}'
	            if ( has( p = 'ERRORS' ) ) {

	                if ( v === !!v || v === 1 || v === 0 ) {
	                    id = 0;
	                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
	                } else if (ERRORS) {
	                    raise( 2, p + notBool, v );
	                }
	            }
	            r[p] = ERRORS;

	            // CRYPTO {boolean|number} true, false, 1 or 0.
	            // 'config() CRYPTO not a boolean or binary digit: {v}'
	            // 'config() crypto unavailable: {crypto}'
	            if ( has( p = 'CRYPTO' ) ) {

	                if ( v === true || v === false || v === 1 || v === 0 ) {
	                    if (v) {
	                        v = typeof crypto == 'undefined';
	                        if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
	                            CRYPTO = true;
	                        } else if (ERRORS) {
	                            raise( 2, 'crypto unavailable', v ? void 0 : crypto );
	                        } else {
	                            CRYPTO = false;
	                        }
	                    } else {
	                        CRYPTO = false;
	                    }
	                } else if (ERRORS) {
	                    raise( 2, p + notBool, v );
	                }
	            }
	            r[p] = CRYPTO;

	            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
	            // 'config() MODULO_MODE not an integer: {v}'
	            // 'config() MODULO_MODE out of range: {v}'
	            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
	                MODULO_MODE = v | 0;
	            }
	            r[p] = MODULO_MODE;

	            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
	            // 'config() POW_PRECISION not an integer: {v}'
	            // 'config() POW_PRECISION out of range: {v}'
	            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
	                POW_PRECISION = v | 0;
	            }
	            r[p] = POW_PRECISION;

	            // FORMAT {object}
	            // 'config() FORMAT not an object: {v}'
	            if ( has( p = 'FORMAT' ) ) {

	                if ( typeof v == 'object' ) {
	                    FORMAT = v;
	                } else if (ERRORS) {
	                    raise( 2, p + ' not an object', v );
	                }
	            }
	            r[p] = FORMAT;

	            return r;
	        };


	        /*
	         * Return a new BigNumber whose value is the maximum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


	        /*
	         * Return a new BigNumber whose value is the minimum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


	        /*
	         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
	         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
	         * zeros are produced).
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         *
	         * 'random() decimal places not an integer: {dp}'
	         * 'random() decimal places out of range: {dp}'
	         * 'random() crypto unavailable: {crypto}'
	         */
	        BigNumber.random = (function () {
	            var pow2_53 = 0x20000000000000;

	            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
	            // Check if Math.random() produces more than 32 bits of randomness.
	            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
	            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
	            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
	              ? function () { return mathfloor( Math.random() * pow2_53 ); }
	              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
	                  (Math.random() * 0x800000 | 0); };

	            return function (dp) {
	                var a, b, e, k, v,
	                    i = 0,
	                    c = [],
	                    rand = new BigNumber(ONE);

	                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
	                k = mathceil( dp / LOG_BASE );

	                if (CRYPTO) {

	                    // Browsers supporting crypto.getRandomValues.
	                    if (crypto.getRandomValues) {

	                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

	                        for ( ; i < k; ) {

	                            // 53 bits:
	                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
	                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
	                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
	                            //                                     11111 11111111 11111111
	                            // 0x20000 is 2^21.
	                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

	                            // Rejection sampling:
	                            // 0 <= v < 9007199254740992
	                            // Probability that v >= 9e15, is
	                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
	                            if ( v >= 9e15 ) {
	                                b = crypto.getRandomValues( new Uint32Array(2) );
	                                a[i] = b[0];
	                                a[i + 1] = b[1];
	                            } else {

	                                // 0 <= v <= 8999999999999999
	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push( v % 1e14 );
	                                i += 2;
	                            }
	                        }
	                        i = k / 2;

	                    // Node.js supporting crypto.randomBytes.
	                    } else if (crypto.randomBytes) {

	                        // buffer
	                        a = crypto.randomBytes( k *= 7 );

	                        for ( ; i < k; ) {

	                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
	                            // 0x100000000 is 2^32, 0x1000000 is 2^24
	                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
	                            // 0 <= v < 9007199254740992
	                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
	                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
	                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

	                            if ( v >= 9e15 ) {
	                                crypto.randomBytes(7).copy( a, i );
	                            } else {

	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push( v % 1e14 );
	                                i += 7;
	                            }
	                        }
	                        i = k / 7;
	                    } else {
	                        CRYPTO = false;
	                        if (ERRORS) raise( 14, 'crypto unavailable', crypto );
	                    }
	                }

	                // Use Math.random.
	                if (!CRYPTO) {

	                    for ( ; i < k; ) {
	                        v = random53bitInt();
	                        if ( v < 9e15 ) c[i++] = v % 1e14;
	                    }
	                }

	                k = c[--i];
	                dp %= LOG_BASE;

	                // Convert trailing digits to zeros according to dp.
	                if ( k && dp ) {
	                    v = POWS_TEN[LOG_BASE - dp];
	                    c[i] = mathfloor( k / v ) * v;
	                }

	                // Remove trailing elements which are zero.
	                for ( ; c[i] === 0; c.pop(), i-- );

	                // Zero?
	                if ( i < 0 ) {
	                    c = [ e = 0 ];
	                } else {

	                    // Remove leading elements which are zero and adjust exponent accordingly.
	                    for ( e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

	                    // Count the digits of the first element of c to determine leading zeros, and...
	                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

	                    // adjust the exponent accordingly.
	                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
	                }

	                rand.e = e;
	                rand.c = c;
	                return rand;
	            };
	        })();


	        // PRIVATE FUNCTIONS


	        // Convert a numeric string of baseIn to a numeric string of baseOut.
	        function convertBase( str, baseOut, baseIn, sign ) {
	            var d, e, k, r, x, xc, y,
	                i = str.indexOf( '.' ),
	                dp = DECIMAL_PLACES,
	                rm = ROUNDING_MODE;

	            if ( baseIn < 37 ) str = str.toLowerCase();

	            // Non-integer.
	            if ( i >= 0 ) {
	                k = POW_PRECISION;

	                // Unlimited precision.
	                POW_PRECISION = 0;
	                str = str.replace( '.', '' );
	                y = new BigNumber(baseIn);
	                x = y.pow( str.length - i );
	                POW_PRECISION = k;

	                // Convert str as if an integer, then restore the fraction part by dividing the
	                // result by its base raised to a power.
	                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
	                y.e = y.c.length;
	            }

	            // Convert the number as integer.
	            xc = toBaseOut( str, baseIn, baseOut );
	            e = k = xc.length;

	            // Remove trailing zeros.
	            for ( ; xc[--k] == 0; xc.pop() );
	            if ( !xc[0] ) return '0';

	            if ( i < 0 ) {
	                --e;
	            } else {
	                x.c = xc;
	                x.e = e;

	                // sign is needed for correct rounding.
	                x.s = sign;
	                x = div( x, y, dp, rm, baseOut );
	                xc = x.c;
	                r = x.r;
	                e = x.e;
	            }

	            d = e + dp + 1;

	            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
	            i = xc[d];
	            k = baseOut / 2;
	            r = r || d < 0 || xc[d + 1] != null;

	            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
	                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
	                         rm == ( x.s < 0 ? 8 : 7 ) );

	            if ( d < 1 || !xc[0] ) {

	                // 1^-dp or 0.
	                str = r ? toFixedPoint( '1', -dp ) : '0';
	            } else {
	                xc.length = d;

	                if (r) {

	                    // Rounding up may mean the previous digit has to be rounded up and so on.
	                    for ( --baseOut; ++xc[--d] > baseOut; ) {
	                        xc[d] = 0;

	                        if ( !d ) {
	                            ++e;
	                            xc = [1].concat(xc);
	                        }
	                    }
	                }

	                // Determine trailing zeros.
	                for ( k = xc.length; !xc[--k]; );

	                // E.g. [4, 11, 15] becomes 4bf.
	                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
	                str = toFixedPoint( str, e );
	            }

	            // The caller will add the sign.
	            return str;
	        }


	        // Perform division in the specified base. Called by div and convertBase.
	        div = (function () {

	            // Assume non-zero x and k.
	            function multiply( x, k, base ) {
	                var m, temp, xlo, xhi,
	                    carry = 0,
	                    i = x.length,
	                    klo = k % SQRT_BASE,
	                    khi = k / SQRT_BASE | 0;

	                for ( x = x.slice(); i--; ) {
	                    xlo = x[i] % SQRT_BASE;
	                    xhi = x[i] / SQRT_BASE | 0;
	                    m = khi * xlo + xhi * klo;
	                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
	                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
	                    x[i] = temp % base;
	                }

	                if (carry) x = [carry].concat(x);

	                return x;
	            }

	            function compare( a, b, aL, bL ) {
	                var i, cmp;

	                if ( aL != bL ) {
	                    cmp = aL > bL ? 1 : -1;
	                } else {

	                    for ( i = cmp = 0; i < aL; i++ ) {

	                        if ( a[i] != b[i] ) {
	                            cmp = a[i] > b[i] ? 1 : -1;
	                            break;
	                        }
	                    }
	                }
	                return cmp;
	            }

	            function subtract( a, b, aL, base ) {
	                var i = 0;

	                // Subtract b from a.
	                for ( ; aL--; ) {
	                    a[aL] -= i;
	                    i = a[aL] < b[aL] ? 1 : 0;
	                    a[aL] = i * base + a[aL] - b[aL];
	                }

	                // Remove leading zeros.
	                for ( ; !a[0] && a.length > 1; a.splice(0, 1) );
	            }

	            // x: dividend, y: divisor.
	            return function ( x, y, dp, rm, base ) {
	                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
	                    yL, yz,
	                    s = x.s == y.s ? 1 : -1,
	                    xc = x.c,
	                    yc = y.c;

	                // Either NaN, Infinity or 0?
	                if ( !xc || !xc[0] || !yc || !yc[0] ) {

	                    return new BigNumber(

	                      // Return NaN if either NaN, or both Infinity or 0.
	                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

	                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
	                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
	                    );
	                }

	                q = new BigNumber(s);
	                qc = q.c = [];
	                e = x.e - y.e;
	                s = dp + e + 1;

	                if ( !base ) {
	                    base = BASE;
	                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
	                    s = s / LOG_BASE | 0;
	                }

	                // Result exponent may be one less then the current value of e.
	                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
	                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
	                if ( yc[i] > ( xc[i] || 0 ) ) e--;

	                if ( s < 0 ) {
	                    qc.push(1);
	                    more = true;
	                } else {
	                    xL = xc.length;
	                    yL = yc.length;
	                    i = 0;
	                    s += 2;

	                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

	                    n = mathfloor( base / ( yc[0] + 1 ) );

	                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
	                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
	                    if ( n > 1 ) {
	                        yc = multiply( yc, n, base );
	                        xc = multiply( xc, n, base );
	                        yL = yc.length;
	                        xL = xc.length;
	                    }

	                    xi = yL;
	                    rem = xc.slice( 0, yL );
	                    remL = rem.length;

	                    // Add zeros to make remainder as long as divisor.
	                    for ( ; remL < yL; rem[remL++] = 0 );
	                    yz = yc.slice();
	                    yz = [0].concat(yz);
	                    yc0 = yc[0];
	                    if ( yc[1] >= base / 2 ) yc0++;
	                    // Not necessary, but to prevent trial digit n > base, when using base 3.
	                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

	                    do {
	                        n = 0;

	                        // Compare divisor and remainder.
	                        cmp = compare( yc, rem, yL, remL );

	                        // If divisor < remainder.
	                        if ( cmp < 0 ) {

	                            // Calculate trial digit, n.

	                            rem0 = rem[0];
	                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

	                            // n is how many times the divisor goes into the current remainder.
	                            n = mathfloor( rem0 / yc0 );

	                            //  Algorithm:
	                            //  1. product = divisor * trial digit (n)
	                            //  2. if product > remainder: product -= divisor, n--
	                            //  3. remainder -= product
	                            //  4. if product was < remainder at 2:
	                            //    5. compare new remainder and divisor
	                            //    6. If remainder > divisor: remainder -= divisor, n++

	                            if ( n > 1 ) {

	                                // n may be > base only when base is 3.
	                                if (n >= base) n = base - 1;

	                                // product = divisor * trial digit.
	                                prod = multiply( yc, n, base );
	                                prodL = prod.length;
	                                remL = rem.length;

	                                // Compare product and remainder.
	                                // If product > remainder.
	                                // Trial digit n too high.
	                                // n is 1 too high about 5% of the time, and is not known to have
	                                // ever been more than 1 too high.
	                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
	                                    n--;

	                                    // Subtract divisor from product.
	                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
	                                    prodL = prod.length;
	                                    cmp = 1;
	                                }
	                            } else {

	                                // n is 0 or 1, cmp is -1.
	                                // If n is 0, there is no need to compare yc and rem again below,
	                                // so change cmp to 1 to avoid it.
	                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
	                                if ( n == 0 ) {

	                                    // divisor < remainder, so n must be at least 1.
	                                    cmp = n = 1;
	                                }

	                                // product = divisor
	                                prod = yc.slice();
	                                prodL = prod.length;
	                            }

	                            if ( prodL < remL ) prod = [0].concat(prod);

	                            // Subtract product from remainder.
	                            subtract( rem, prod, remL, base );
	                            remL = rem.length;

	                             // If product was < remainder.
	                            if ( cmp == -1 ) {

	                                // Compare divisor and new remainder.
	                                // If divisor < new remainder, subtract divisor from remainder.
	                                // Trial digit n too low.
	                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
	                                while ( compare( yc, rem, yL, remL ) < 1 ) {
	                                    n++;

	                                    // Subtract divisor from remainder.
	                                    subtract( rem, yL < remL ? yz : yc, remL, base );
	                                    remL = rem.length;
	                                }
	                            }
	                        } else if ( cmp === 0 ) {
	                            n++;
	                            rem = [0];
	                        } // else cmp === 1 and n will be 0

	                        // Add the next digit, n, to the result array.
	                        qc[i++] = n;

	                        // Update the remainder.
	                        if ( rem[0] ) {
	                            rem[remL++] = xc[xi] || 0;
	                        } else {
	                            rem = [ xc[xi] ];
	                            remL = 1;
	                        }
	                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );

	                    more = rem[0] != null;

	                    // Leading zero?
	                    if ( !qc[0] ) qc.splice(0, 1);
	                }

	                if ( base == BASE ) {

	                    // To calculate q.e, first get the number of digits of qc[0].
	                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
	                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

	                // Caller is convertBase.
	                } else {
	                    q.e = e;
	                    q.r = +more;
	                }

	                return q;
	            };
	        })();


	        /*
	         * Return a string representing the value of BigNumber n in fixed-point or exponential
	         * notation rounded to the specified decimal places or significant digits.
	         *
	         * n is a BigNumber.
	         * i is the index of the last digit required (i.e. the digit that may be rounded up).
	         * rm is the rounding mode.
	         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
	         */
	        function format( n, i, rm, caller ) {
	            var c0, e, ne, len, str;

	            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
	              ? rm | 0 : ROUNDING_MODE;

	            if ( !n.c ) return n.toString();
	            c0 = n.c[0];
	            ne = n.e;

	            if ( i == null ) {
	                str = coeffToString( n.c );
	                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
	                  ? toExponential( str, ne )
	                  : toFixedPoint( str, ne );
	            } else {
	                n = round( new BigNumber(n), i, rm );

	                // n.e may have changed if the value was rounded up.
	                e = n.e;

	                str = coeffToString( n.c );
	                len = str.length;

	                // toPrecision returns exponential notation if the number of significant digits
	                // specified is less than the number of digits necessary to represent the integer
	                // part of the value in fixed-point notation.

	                // Exponential notation.
	                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

	                    // Append zeros?
	                    for ( ; len < i; str += '0', len++ );
	                    str = toExponential( str, e );

	                // Fixed-point notation.
	                } else {
	                    i -= ne;
	                    str = toFixedPoint( str, e );

	                    // Append zeros?
	                    if ( e + 1 > len ) {
	                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
	                    } else {
	                        i += e - len;
	                        if ( i > 0 ) {
	                            if ( e + 1 == len ) str += '.';
	                            for ( ; i--; str += '0' );
	                        }
	                    }
	                }
	            }

	            return n.s < 0 && c0 ? '-' + str : str;
	        }


	        // Handle BigNumber.max and BigNumber.min.
	        function maxOrMin( args, method ) {
	            var m, n,
	                i = 0;

	            if ( isArray( args[0] ) ) args = args[0];
	            m = new BigNumber( args[0] );

	            for ( ; ++i < args.length; ) {
	                n = new BigNumber( args[i] );

	                // If any number is NaN, return NaN.
	                if ( !n.s ) {
	                    m = n;
	                    break;
	                } else if ( method.call( m, n ) ) {
	                    m = n;
	                }
	            }

	            return m;
	        }


	        /*
	         * Return true if n is an integer in range, otherwise throw.
	         * Use for argument validation when ERRORS is true.
	         */
	        function intValidatorWithErrors( n, min, max, caller, name ) {
	            if ( n < min || n > max || n != truncate(n) ) {
	                raise( caller, ( name || 'decimal places' ) +
	                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
	            }

	            return true;
	        }


	        /*
	         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
	         * Called by minus, plus and times.
	         */
	        function normalise( n, c, e ) {
	            var i = 1,
	                j = c.length;

	             // Remove trailing zeros.
	            for ( ; !c[--j]; c.pop() );

	            // Calculate the base 10 exponent. First get the number of digits of c[0].
	            for ( j = c[0]; j >= 10; j /= 10, i++ );

	            // Overflow?
	            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

	                // Infinity.
	                n.c = n.e = null;

	            // Underflow?
	            } else if ( e < MIN_EXP ) {

	                // Zero.
	                n.c = [ n.e = 0 ];
	            } else {
	                n.e = e;
	                n.c = c;
	            }

	            return n;
	        }


	        // Handle values that fail the validity test in BigNumber.
	        parseNumeric = (function () {
	            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
	                dotAfter = /^([^.]+)\.$/,
	                dotBefore = /^\.([^.]+)$/,
	                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
	                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

	            return function ( x, str, num, b ) {
	                var base,
	                    s = num ? str : str.replace( whitespaceOrPlus, '' );

	                // No exception on ±Infinity or NaN.
	                if ( isInfinityOrNaN.test(s) ) {
	                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
	                } else {
	                    if ( !num ) {

	                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
	                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
	                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
	                            return !b || b == base ? p1 : m;
	                        });

	                        if (b) {
	                            base = b;

	                            // E.g. '1.' to '1', '.1' to '0.1'
	                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
	                        }

	                        if ( str != s ) return new BigNumber( s, base );
	                    }

	                    // 'new BigNumber() not a number: {n}'
	                    // 'new BigNumber() not a base {b} number: {n}'
	                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
	                    x.s = null;
	                }

	                x.c = x.e = null;
	                id = 0;
	            }
	        })();


	        // Throw a BigNumber Error.
	        function raise( caller, msg, val ) {
	            var error = new Error( [
	                'new BigNumber',     // 0
	                'cmp',               // 1
	                'config',            // 2
	                'div',               // 3
	                'divToInt',          // 4
	                'eq',                // 5
	                'gt',                // 6
	                'gte',               // 7
	                'lt',                // 8
	                'lte',               // 9
	                'minus',             // 10
	                'mod',               // 11
	                'plus',              // 12
	                'precision',         // 13
	                'random',            // 14
	                'round',             // 15
	                'shift',             // 16
	                'times',             // 17
	                'toDigits',          // 18
	                'toExponential',     // 19
	                'toFixed',           // 20
	                'toFormat',          // 21
	                'toFraction',        // 22
	                'pow',               // 23
	                'toPrecision',       // 24
	                'toString',          // 25
	                'BigNumber'          // 26
	            ][caller] + '() ' + msg + ': ' + val );

	            error.name = 'BigNumber Error';
	            id = 0;
	            throw error;
	        }


	        /*
	         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
	         * If r is truthy, it is known that there are more digits after the rounding digit.
	         */
	        function round( x, sd, rm, r ) {
	            var d, i, j, k, n, ni, rd,
	                xc = x.c,
	                pows10 = POWS_TEN;

	            // if x is not Infinity or NaN...
	            if (xc) {

	                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
	                // n is a base 1e14 number, the value of the element of array x.c containing rd.
	                // ni is the index of n within x.c.
	                // d is the number of digits of n.
	                // i is the index of rd within n including leading zeros.
	                // j is the actual index of rd within n (if < 0, rd is a leading zero).
	                out: {

	                    // Get the number of digits of the first element of xc.
	                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
	                    i = sd - d;

	                    // If the rounding digit is in the first element of xc...
	                    if ( i < 0 ) {
	                        i += LOG_BASE;
	                        j = sd;
	                        n = xc[ ni = 0 ];

	                        // Get the rounding digit at index j of n.
	                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
	                    } else {
	                        ni = mathceil( ( i + 1 ) / LOG_BASE );

	                        if ( ni >= xc.length ) {

	                            if (r) {

	                                // Needed by sqrt.
	                                for ( ; xc.length <= ni; xc.push(0) );
	                                n = rd = 0;
	                                d = 1;
	                                i %= LOG_BASE;
	                                j = i - LOG_BASE + 1;
	                            } else {
	                                break out;
	                            }
	                        } else {
	                            n = k = xc[ni];

	                            // Get the number of digits of n.
	                            for ( d = 1; k >= 10; k /= 10, d++ );

	                            // Get the index of rd within n.
	                            i %= LOG_BASE;

	                            // Get the index of rd within n, adjusted for leading zeros.
	                            // The number of leading zeros of n is given by LOG_BASE - d.
	                            j = i - LOG_BASE + d;

	                            // Get the rounding digit at index j of n.
	                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
	                        }
	                    }

	                    r = r || sd < 0 ||

	                    // Are there any non-zero digits after the rounding digit?
	                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
	                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
	                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

	                    r = rm < 4
	                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
	                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

	                        // Check whether the digit to the left of the rounding digit is odd.
	                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
	                          rm == ( x.s < 0 ? 8 : 7 ) );

	                    if ( sd < 1 || !xc[0] ) {
	                        xc.length = 0;

	                        if (r) {

	                            // Convert sd to decimal places.
	                            sd -= x.e + 1;

	                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	                            xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
	                            x.e = -sd || 0;
	                        } else {

	                            // Zero.
	                            xc[0] = x.e = 0;
	                        }

	                        return x;
	                    }

	                    // Remove excess digits.
	                    if ( i == 0 ) {
	                        xc.length = ni;
	                        k = 1;
	                        ni--;
	                    } else {
	                        xc.length = ni + 1;
	                        k = pows10[ LOG_BASE - i ];

	                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	                        // j > 0 means i > number of leading zeros of n.
	                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
	                    }

	                    // Round up?
	                    if (r) {

	                        for ( ; ; ) {

	                            // If the digit to be rounded up is in the first element of xc...
	                            if ( ni == 0 ) {

	                                // i will be the length of xc[0] before k is added.
	                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
	                                j = xc[0] += k;
	                                for ( k = 1; j >= 10; j /= 10, k++ );

	                                // if i != k the length has increased.
	                                if ( i != k ) {
	                                    x.e++;
	                                    if ( xc[0] == BASE ) xc[0] = 1;
	                                }

	                                break;
	                            } else {
	                                xc[ni] += k;
	                                if ( xc[ni] != BASE ) break;
	                                xc[ni--] = 0;
	                                k = 1;
	                            }
	                        }
	                    }

	                    // Remove trailing zeros.
	                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
	                }

	                // Overflow? Infinity.
	                if ( x.e > MAX_EXP ) {
	                    x.c = x.e = null;

	                // Underflow? Zero.
	                } else if ( x.e < MIN_EXP ) {
	                    x.c = [ x.e = 0 ];
	                }
	            }

	            return x;
	        }


	        // PROTOTYPE/INSTANCE METHODS


	        /*
	         * Return a new BigNumber whose value is the absolute value of this BigNumber.
	         */
	        P.absoluteValue = P.abs = function () {
	            var x = new BigNumber(this);
	            if ( x.s < 0 ) x.s = 1;
	            return x;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of Infinity.
	         */
	        P.ceil = function () {
	            return round( new BigNumber(this), this.e + 1, 2 );
	        };


	        /*
	         * Return
	         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * 0 if they have the same value,
	         * or null if the value of either is NaN.
	         */
	        P.comparedTo = P.cmp = function ( y, b ) {
	            id = 1;
	            return compare( this, new BigNumber( y, b ) );
	        };


	        /*
	         * Return the number of decimal places of the value of this BigNumber, or null if the value
	         * of this BigNumber is ±Infinity or NaN.
	         */
	        P.decimalPlaces = P.dp = function () {
	            var n, v,
	                c = this.c;

	            if ( !c ) return null;
	            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

	            // Subtract the number of trailing zeros of the last number.
	            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
	            if ( n < 0 ) n = 0;

	            return n;
	        };


	        /*
	         *  n / 0 = I
	         *  n / N = N
	         *  n / I = 0
	         *  0 / n = 0
	         *  0 / 0 = N
	         *  0 / N = N
	         *  0 / I = 0
	         *  N / n = N
	         *  N / 0 = N
	         *  N / N = N
	         *  N / I = N
	         *  I / n = I
	         *  I / 0 = I
	         *  I / N = N
	         *  I / I = N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
	         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	         */
	        P.dividedBy = P.div = function ( y, b ) {
	            id = 3;
	            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
	        };


	        /*
	         * Return a new BigNumber whose value is the integer part of dividing the value of this
	         * BigNumber by the value of BigNumber(y, b).
	         */
	        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
	            id = 4;
	            return div( this, new BigNumber( y, b ), 0, 1 );
	        };


	        /*
	         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.equals = P.eq = function ( y, b ) {
	            id = 5;
	            return compare( this, new BigNumber( y, b ) ) === 0;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of -Infinity.
	         */
	        P.floor = function () {
	            return round( new BigNumber(this), this.e + 1, 3 );
	        };


	        /*
	         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.greaterThan = P.gt = function ( y, b ) {
	            id = 6;
	            return compare( this, new BigNumber( y, b ) ) > 0;
	        };


	        /*
	         * Return true if the value of this BigNumber is greater than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
	            id = 7;
	            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

	        };


	        /*
	         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
	         */
	        P.isFinite = function () {
	            return !!this.c;
	        };


	        /*
	         * Return true if the value of this BigNumber is an integer, otherwise return false.
	         */
	        P.isInteger = P.isInt = function () {
	            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
	        };


	        /*
	         * Return true if the value of this BigNumber is NaN, otherwise returns false.
	         */
	        P.isNaN = function () {
	            return !this.s;
	        };


	        /*
	         * Return true if the value of this BigNumber is negative, otherwise returns false.
	         */
	        P.isNegative = P.isNeg = function () {
	            return this.s < 0;
	        };


	        /*
	         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
	         */
	        P.isZero = function () {
	            return !!this.c && this.c[0] == 0;
	        };


	        /*
	         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.lessThan = P.lt = function ( y, b ) {
	            id = 8;
	            return compare( this, new BigNumber( y, b ) ) < 0;
	        };


	        /*
	         * Return true if the value of this BigNumber is less than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
	            id = 9;
	            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
	        };


	        /*
	         *  n - 0 = n
	         *  n - N = N
	         *  n - I = -I
	         *  0 - n = -n
	         *  0 - 0 = 0
	         *  0 - N = N
	         *  0 - I = -I
	         *  N - n = N
	         *  N - 0 = N
	         *  N - N = N
	         *  N - I = N
	         *  I - n = I
	         *  I - 0 = I
	         *  I - N = N
	         *  I - I = N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
	         * BigNumber(y, b).
	         */
	        P.minus = P.sub = function ( y, b ) {
	            var i, j, t, xLTy,
	                x = this,
	                a = x.s;

	            id = 10;
	            y = new BigNumber( y, b );
	            b = y.s;

	            // Either NaN?
	            if ( !a || !b ) return new BigNumber(NaN);

	            // Signs differ?
	            if ( a != b ) {
	                y.s = -b;
	                return x.plus(y);
	            }

	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;

	            if ( !xe || !ye ) {

	                // Either Infinity?
	                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

	                // Either zero?
	                if ( !xc[0] || !yc[0] ) {

	                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

	                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	                      ROUNDING_MODE == 3 ? -0 : 0 );
	                }
	            }

	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();

	            // Determine which is the bigger number.
	            if ( a = xe - ye ) {

	                if ( xLTy = a < 0 ) {
	                    a = -a;
	                    t = xc;
	                } else {
	                    ye = xe;
	                    t = yc;
	                }

	                t.reverse();

	                // Prepend zeros to equalise exponents.
	                for ( b = a; b--; t.push(0) );
	                t.reverse();
	            } else {

	                // Exponents equal. Check digit by digit.
	                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

	                for ( a = b = 0; b < j; b++ ) {

	                    if ( xc[b] != yc[b] ) {
	                        xLTy = xc[b] < yc[b];
	                        break;
	                    }
	                }
	            }

	            // x < y? Point xc to the array of the bigger number.
	            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

	            b = ( j = yc.length ) - ( i = xc.length );

	            // Append zeros to xc if shorter.
	            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
	            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
	            b = BASE - 1;

	            // Subtract yc from xc.
	            for ( ; j > a; ) {

	                if ( xc[--j] < yc[j] ) {
	                    for ( i = j; i && !xc[--i]; xc[i] = b );
	                    --xc[i];
	                    xc[j] += BASE;
	                }

	                xc[j] -= yc[j];
	            }

	            // Remove leading zeros and adjust exponent accordingly.
	            for ( ; xc[0] == 0; xc.splice(0, 1), --ye );

	            // Zero?
	            if ( !xc[0] ) {

	                // Following IEEE 754 (2008) 6.3,
	                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
	                y.s = ROUNDING_MODE == 3 ? -1 : 1;
	                y.c = [ y.e = 0 ];
	                return y;
	            }

	            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	            // for finite x and y.
	            return normalise( y, xc, ye );
	        };


	        /*
	         *   n % 0 =  N
	         *   n % N =  N
	         *   n % I =  n
	         *   0 % n =  0
	         *  -0 % n = -0
	         *   0 % 0 =  N
	         *   0 % N =  N
	         *   0 % I =  0
	         *   N % n =  N
	         *   N % 0 =  N
	         *   N % N =  N
	         *   N % I =  N
	         *   I % n =  N
	         *   I % 0 =  N
	         *   I % N =  N
	         *   I % I =  N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
	         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
	         */
	        P.modulo = P.mod = function ( y, b ) {
	            var q, s,
	                x = this;

	            id = 11;
	            y = new BigNumber( y, b );

	            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
	            if ( !x.c || !y.s || y.c && !y.c[0] ) {
	                return new BigNumber(NaN);

	            // Return x if y is Infinity or x is zero.
	            } else if ( !y.c || x.c && !x.c[0] ) {
	                return new BigNumber(x);
	            }

	            if ( MODULO_MODE == 9 ) {

	                // Euclidian division: q = sign(y) * floor(x / abs(y))
	                // r = x - qy    where  0 <= r < abs(y)
	                s = y.s;
	                y.s = 1;
	                q = div( x, y, 0, 3 );
	                y.s = s;
	                q.s *= s;
	            } else {
	                q = div( x, y, 0, MODULO_MODE );
	            }

	            return x.minus( q.times(y) );
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber negated,
	         * i.e. multiplied by -1.
	         */
	        P.negated = P.neg = function () {
	            var x = new BigNumber(this);
	            x.s = -x.s || null;
	            return x;
	        };


	        /*
	         *  n + 0 = n
	         *  n + N = N
	         *  n + I = I
	         *  0 + n = n
	         *  0 + 0 = 0
	         *  0 + N = N
	         *  0 + I = I
	         *  N + n = N
	         *  N + 0 = N
	         *  N + N = N
	         *  N + I = N
	         *  I + n = I
	         *  I + 0 = I
	         *  I + N = N
	         *  I + I = I
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
	         * BigNumber(y, b).
	         */
	        P.plus = P.add = function ( y, b ) {
	            var t,
	                x = this,
	                a = x.s;

	            id = 12;
	            y = new BigNumber( y, b );
	            b = y.s;

	            // Either NaN?
	            if ( !a || !b ) return new BigNumber(NaN);

	            // Signs differ?
	             if ( a != b ) {
	                y.s = -b;
	                return x.minus(y);
	            }

	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;

	            if ( !xe || !ye ) {

	                // Return ±Infinity if either ±Infinity.
	                if ( !xc || !yc ) return new BigNumber( a / 0 );

	                // Either zero?
	                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
	            }

	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();

	            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
	            if ( a = xe - ye ) {
	                if ( a > 0 ) {
	                    ye = xe;
	                    t = yc;
	                } else {
	                    a = -a;
	                    t = xc;
	                }

	                t.reverse();
	                for ( ; a--; t.push(0) );
	                t.reverse();
	            }

	            a = xc.length;
	            b = yc.length;

	            // Point xc to the longer array, and b to the shorter length.
	            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

	            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
	            for ( a = 0; b; ) {
	                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
	                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
	            }

	            if (a) {
	                xc = [a].concat(xc);
	                ++ye;
	            }

	            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	            // ye = MAX_EXP + 1 possible
	            return normalise( y, xc, ye );
	        };


	        /*
	         * Return the number of significant digits of the value of this BigNumber.
	         *
	         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	         */
	        P.precision = P.sd = function (z) {
	            var n, v,
	                x = this,
	                c = x.c;

	            // 'precision() argument not a boolean or binary digit: {z}'
	            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
	                if (ERRORS) raise( 13, 'argument' + notBool, z );
	                if ( z != !!z ) z = null;
	            }

	            if ( !c ) return null;
	            v = c.length - 1;
	            n = v * LOG_BASE + 1;

	            if ( v = c[v] ) {

	                // Subtract the number of trailing zeros of the last element.
	                for ( ; v % 10 == 0; v /= 10, n-- );

	                // Add the number of digits of the first element.
	                for ( v = c[0]; v >= 10; v /= 10, n++ );
	            }

	            if ( z && x.e + 1 > n ) n = x.e + 1;

	            return n;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
	         * omitted.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'round() decimal places out of range: {dp}'
	         * 'round() decimal places not an integer: {dp}'
	         * 'round() rounding mode not an integer: {rm}'
	         * 'round() rounding mode out of range: {rm}'
	         */
	        P.round = function ( dp, rm ) {
	            var n = new BigNumber(this);

	            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
	                round( n, ~~dp + this.e + 1, rm == null ||
	                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
	            }

	            return n;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
	         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
	         *
	         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	         *
	         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
	         * otherwise.
	         *
	         * 'shift() argument not an integer: {k}'
	         * 'shift() argument out of range: {k}'
	         */
	        P.shift = function (k) {
	            var n = this;
	            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

	              // k < 1e+21, or truncate(k) will produce exponential notation.
	              ? n.times( '1e' + truncate(k) )
	              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
	                ? n.s * ( k < 0 ? 0 : 1 / 0 )
	                : n );
	        };


	        /*
	         *  sqrt(-n) =  N
	         *  sqrt( N) =  N
	         *  sqrt(-I) =  N
	         *  sqrt( I) =  I
	         *  sqrt( 0) =  0
	         *  sqrt(-0) = -0
	         *
	         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
	         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	         */
	        P.squareRoot = P.sqrt = function () {
	            var m, n, r, rep, t,
	                x = this,
	                c = x.c,
	                s = x.s,
	                e = x.e,
	                dp = DECIMAL_PLACES + 4,
	                half = new BigNumber('0.5');

	            // Negative/NaN/Infinity/zero?
	            if ( s !== 1 || !c || !c[0] ) {
	                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
	            }

	            // Initial estimate.
	            s = Math.sqrt( +x );

	            // Math.sqrt underflow/overflow?
	            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	            if ( s == 0 || s == 1 / 0 ) {
	                n = coeffToString(c);
	                if ( ( n.length + e ) % 2 == 0 ) n += '0';
	                s = Math.sqrt(n);
	                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

	                if ( s == 1 / 0 ) {
	                    n = '1e' + e;
	                } else {
	                    n = s.toExponential();
	                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
	                }

	                r = new BigNumber(n);
	            } else {
	                r = new BigNumber( s + '' );
	            }

	            // Check for zero.
	            // r could be zero if MIN_EXP is changed after the this value was created.
	            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
	            // coeffToString to throw.
	            if ( r.c[0] ) {
	                e = r.e;
	                s = e + dp;
	                if ( s < 3 ) s = 0;

	                // Newton-Raphson iteration.
	                for ( ; ; ) {
	                    t = r;
	                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );

	                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
	                         coeffToString( r.c ) ).slice( 0, s ) ) {

	                        // The exponent of r may here be one less than the final result exponent,
	                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
	                        // are indexed correctly.
	                        if ( r.e < e ) --s;
	                        n = n.slice( s - 3, s + 1 );

	                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
	                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
	                        // iteration.
	                        if ( n == '9999' || !rep && n == '4999' ) {

	                            // On the first iteration only, check to see if rounding up gives the
	                            // exact result as the nines may infinitely repeat.
	                            if ( !rep ) {
	                                round( t, t.e + DECIMAL_PLACES + 2, 0 );

	                                if ( t.times(t).eq(x) ) {
	                                    r = t;
	                                    break;
	                                }
	                            }

	                            dp += 4;
	                            s += 4;
	                            rep = 1;
	                        } else {

	                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
	                            // result. If not, then there are further digits and m will be truthy.
	                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

	                                // Truncate to the first rounding digit.
	                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
	                                m = !r.times(r).eq(x);
	                            }

	                            break;
	                        }
	                    }
	                }
	            }

	            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
	        };


	        /*
	         *  n * 0 = 0
	         *  n * N = N
	         *  n * I = I
	         *  0 * n = 0
	         *  0 * 0 = 0
	         *  0 * N = N
	         *  0 * I = N
	         *  N * n = N
	         *  N * 0 = N
	         *  N * N = N
	         *  N * I = N
	         *  I * n = I
	         *  I * 0 = N
	         *  I * N = N
	         *  I * I = I
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber times the value of
	         * BigNumber(y, b).
	         */
	        P.times = P.mul = function ( y, b ) {
	            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
	                base, sqrtBase,
	                x = this,
	                xc = x.c,
	                yc = ( id = 17, y = new BigNumber( y, b ) ).c;

	            // Either NaN, ±Infinity or ±0?
	            if ( !xc || !yc || !xc[0] || !yc[0] ) {

	                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
	                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
	                    y.c = y.e = y.s = null;
	                } else {
	                    y.s *= x.s;

	                    // Return ±Infinity if either is ±Infinity.
	                    if ( !xc || !yc ) {
	                        y.c = y.e = null;

	                    // Return ±0 if either is ±0.
	                    } else {
	                        y.c = [0];
	                        y.e = 0;
	                    }
	                }

	                return y;
	            }

	            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
	            y.s *= x.s;
	            xcL = xc.length;
	            ycL = yc.length;

	            // Ensure xc points to longer array and xcL to its length.
	            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

	            // Initialise the result array with zeros.
	            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

	            base = BASE;
	            sqrtBase = SQRT_BASE;

	            for ( i = ycL; --i >= 0; ) {
	                c = 0;
	                ylo = yc[i] % sqrtBase;
	                yhi = yc[i] / sqrtBase | 0;

	                for ( k = xcL, j = i + k; j > i; ) {
	                    xlo = xc[--k] % sqrtBase;
	                    xhi = xc[k] / sqrtBase | 0;
	                    m = yhi * xlo + xhi * ylo;
	                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
	                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
	                    zc[j--] = xlo % base;
	                }

	                zc[j] = c;
	            }

	            if (c) {
	                ++e;
	            } else {
	                zc.splice(0, 1);
	            }

	            return normalise( y, zc, e );
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toDigits() precision out of range: {sd}'
	         * 'toDigits() precision not an integer: {sd}'
	         * 'toDigits() rounding mode not an integer: {rm}'
	         * 'toDigits() rounding mode out of range: {rm}'
	         */
	        P.toDigits = function ( sd, rm ) {
	            var n = new BigNumber(this);
	            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
	            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
	            return sd ? round( n, sd, rm ) : n;
	        };


	        /*
	         * Return a string representing the value of this BigNumber in exponential notation and
	         * rounded using ROUNDING_MODE to dp fixed decimal places.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toExponential() decimal places not an integer: {dp}'
	         * 'toExponential() decimal places out of range: {dp}'
	         * 'toExponential() rounding mode not an integer: {rm}'
	         * 'toExponential() rounding mode out of range: {rm}'
	         */
	        P.toExponential = function ( dp, rm ) {
	            return format( this,
	              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
	        };


	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounding
	         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
	         * but e.g. (-0.00001).toFixed(0) is '-0'.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFixed() decimal places not an integer: {dp}'
	         * 'toFixed() decimal places out of range: {dp}'
	         * 'toFixed() rounding mode not an integer: {rm}'
	         * 'toFixed() rounding mode out of range: {rm}'
	         */
	        P.toFixed = function ( dp, rm ) {
	            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
	              ? ~~dp + this.e + 1 : null, rm, 20 );
	        };


	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounded
	         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
	         * of the FORMAT object (see BigNumber.config).
	         *
	         * FORMAT = {
	         *      decimalSeparator : '.',
	         *      groupSeparator : ',',
	         *      groupSize : 3,
	         *      secondaryGroupSize : 0,
	         *      fractionGroupSeparator : '\xA0',    // non-breaking space
	         *      fractionGroupSize : 0
	         * };
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFormat() decimal places not an integer: {dp}'
	         * 'toFormat() decimal places out of range: {dp}'
	         * 'toFormat() rounding mode not an integer: {rm}'
	         * 'toFormat() rounding mode out of range: {rm}'
	         */
	        P.toFormat = function ( dp, rm ) {
	            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
	              ? ~~dp + this.e + 1 : null, rm, 21 );

	            if ( this.c ) {
	                var i,
	                    arr = str.split('.'),
	                    g1 = +FORMAT.groupSize,
	                    g2 = +FORMAT.secondaryGroupSize,
	                    groupSeparator = FORMAT.groupSeparator,
	                    intPart = arr[0],
	                    fractionPart = arr[1],
	                    isNeg = this.s < 0,
	                    intDigits = isNeg ? intPart.slice(1) : intPart,
	                    len = intDigits.length;

	                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

	                if ( g1 > 0 && len > 0 ) {
	                    i = len % g1 || g1;
	                    intPart = intDigits.substr( 0, i );

	                    for ( ; i < len; i += g1 ) {
	                        intPart += groupSeparator + intDigits.substr( i, g1 );
	                    }

	                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
	                    if (isNeg) intPart = '-' + intPart;
	                }

	                str = fractionPart
	                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
	                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
	                      '$&' + FORMAT.fractionGroupSeparator )
	                    : fractionPart )
	                  : intPart;
	            }

	            return str;
	        };


	        /*
	         * Return a string array representing the value of this BigNumber as a simple fraction with
	         * an integer numerator and an integer denominator. The denominator will be a positive
	         * non-zero value less than or equal to the specified maximum denominator. If a maximum
	         * denominator is not specified, the denominator will be the lowest value necessary to
	         * represent the number exactly.
	         *
	         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
	         *
	         * 'toFraction() max denominator not an integer: {md}'
	         * 'toFraction() max denominator out of range: {md}'
	         */
	        P.toFraction = function (md) {
	            var arr, d0, d2, e, exp, n, n0, q, s,
	                k = ERRORS,
	                x = this,
	                xc = x.c,
	                d = new BigNumber(ONE),
	                n1 = d0 = new BigNumber(ONE),
	                d1 = n0 = new BigNumber(ONE);

	            if ( md != null ) {
	                ERRORS = false;
	                n = new BigNumber(md);
	                ERRORS = k;

	                if ( !( k = n.isInt() ) || n.lt(ONE) ) {

	                    if (ERRORS) {
	                        raise( 22,
	                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
	                    }

	                    // ERRORS is false:
	                    // If md is a finite non-integer >= 1, round it to an integer and use it.
	                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
	                }
	            }

	            if ( !xc ) return x.toString();
	            s = coeffToString(xc);

	            // Determine initial denominator.
	            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
	            e = d.e = s.length - x.e - 1;
	            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
	            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

	            exp = MAX_EXP;
	            MAX_EXP = 1 / 0;
	            n = new BigNumber(s);

	            // n0 = d1 = 0
	            n0.c[0] = 0;

	            for ( ; ; )  {
	                q = div( n, d, 0, 1 );
	                d2 = d0.plus( q.times(d1) );
	                if ( d2.cmp(md) == 1 ) break;
	                d0 = d1;
	                d1 = d2;
	                n1 = n0.plus( q.times( d2 = n1 ) );
	                n0 = d2;
	                d = n.minus( q.times( d2 = d ) );
	                n = d2;
	            }

	            d2 = div( md.minus(d0), d1, 0, 1 );
	            n0 = n0.plus( d2.times(n1) );
	            d0 = d0.plus( d2.times(d1) );
	            n0.s = n1.s = x.s;
	            e *= 2;

	            // Determine which fraction is closer to x, n0/d0 or n1/d1
	            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
	                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
	                    ? [ n1.toString(), d1.toString() ]
	                    : [ n0.toString(), d0.toString() ];

	            MAX_EXP = exp;
	            return arr;
	        };


	        /*
	         * Return the value of this BigNumber converted to a number primitive.
	         */
	        P.toNumber = function () {
	            return +this;
	        };


	        /*
	         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
	         * If m is present, return the result modulo m.
	         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
	         * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
	         * ROUNDING_MODE.
	         *
	         * The modular power operation works efficiently when x, n, and m are positive integers,
	         * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
	         *
	         * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	         * [m] {number|string|BigNumber} The modulus.
	         *
	         * 'pow() exponent not an integer: {n}'
	         * 'pow() exponent out of range: {n}'
	         *
	         * Performs 54 loop iterations for n of 9007199254740991.
	         */
	        P.toPower = P.pow = function ( n, m ) {
	            var k, y, z,
	                i = mathfloor( n < 0 ? -n : +n ),
	                x = this;

	            if ( m != null ) {
	                id = 23;
	                m = new BigNumber(m);
	            }

	            // Pass ±Infinity to Math.pow if exponent is out of range.
	            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
	              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
	                parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
	                k = Math.pow( +x, n );
	                return new BigNumber( m ? k % m : k );
	            }

	            if (m) {
	                if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
	                    x = x.mod(m);
	                } else {
	                    z = m;

	                    // Nullify m so only a single mod operation is performed at the end.
	                    m = null;
	                }
	            } else if (POW_PRECISION) {

	                // Truncating each coefficient array to a length of k after each multiplication
	                // equates to truncating significant digits to POW_PRECISION + [28, 41],
	                // i.e. there will be a minimum of 28 guard digits retained.
	                // (Using + 1.5 would give [9, 21] guard digits.)
	                k = mathceil( POW_PRECISION / LOG_BASE + 2 );
	            }

	            y = new BigNumber(ONE);

	            for ( ; ; ) {
	                if ( i % 2 ) {
	                    y = y.times(x);
	                    if ( !y.c ) break;
	                    if (k) {
	                        if ( y.c.length > k ) y.c.length = k;
	                    } else if (m) {
	                        y = y.mod(m);
	                    }
	                }

	                i = mathfloor( i / 2 );
	                if ( !i ) break;
	                x = x.times(x);
	                if (k) {
	                    if ( x.c && x.c.length > k ) x.c.length = k;
	                } else if (m) {
	                    x = x.mod(m);
	                }
	            }

	            if (m) return y;
	            if ( n < 0 ) y = ONE.div(y);

	            return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
	        };


	        /*
	         * Return a string representing the value of this BigNumber rounded to sd significant digits
	         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
	         * necessary to represent the integer part of the value in fixed-point notation, then use
	         * exponential notation.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toPrecision() precision not an integer: {sd}'
	         * 'toPrecision() precision out of range: {sd}'
	         * 'toPrecision() rounding mode not an integer: {rm}'
	         * 'toPrecision() rounding mode out of range: {rm}'
	         */
	        P.toPrecision = function ( sd, rm ) {
	            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
	              ? sd | 0 : null, rm, 24 );
	        };


	        /*
	         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
	         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
	         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
	         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
	         * TO_EXP_NEG, return exponential notation.
	         *
	         * [b] {number} Integer, 2 to 64 inclusive.
	         *
	         * 'toString() base not an integer: {b}'
	         * 'toString() base out of range: {b}'
	         */
	        P.toString = function (b) {
	            var str,
	                n = this,
	                s = n.s,
	                e = n.e;

	            // Infinity or NaN?
	            if ( e === null ) {

	                if (s) {
	                    str = 'Infinity';
	                    if ( s < 0 ) str = '-' + str;
	                } else {
	                    str = 'NaN';
	                }
	            } else {
	                str = coeffToString( n.c );

	                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
	                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	                      ? toExponential( str, e )
	                      : toFixedPoint( str, e );
	                } else {
	                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
	                }

	                if ( s < 0 && n.c[0] ) str = '-' + str;
	            }

	            return str;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
	         * number.
	         */
	        P.truncated = P.trunc = function () {
	            return round( new BigNumber(this), this.e + 1, 1 );
	        };


	        /*
	         * Return as toString, but do not accept a base argument, and include the minus sign for
	         * negative zero.
	         */
	        P.valueOf = P.toJSON = function () {
	            var str,
	                n = this,
	                e = n.e;

	            if ( e === null ) return n.toString();

	            str = coeffToString( n.c );

	            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	                ? toExponential( str, e )
	                : toFixedPoint( str, e );

	            return n.s < 0 ? '-' + str : str;
	        };


	        P.isBigNumber = true;

	        if ( config != null ) BigNumber.config(config);

	        return BigNumber;
	    }


	    // PRIVATE HELPER FUNCTIONS


	    function bitFloor(n) {
	        var i = n | 0;
	        return n > 0 || n === i ? i : i - 1;
	    }


	    // Return a coefficient array as a string of base 10 digits.
	    function coeffToString(a) {
	        var s, z,
	            i = 1,
	            j = a.length,
	            r = a[0] + '';

	        for ( ; i < j; ) {
	            s = a[i++] + '';
	            z = LOG_BASE - s.length;
	            for ( ; z--; s = '0' + s );
	            r += s;
	        }

	        // Determine trailing zeros.
	        for ( j = r.length; r.charCodeAt(--j) === 48; );
	        return r.slice( 0, j + 1 || 1 );
	    }


	    // Compare the value of BigNumbers x and y.
	    function compare( x, y ) {
	        var a, b,
	            xc = x.c,
	            yc = y.c,
	            i = x.s,
	            j = y.s,
	            k = x.e,
	            l = y.e;

	        // Either NaN?
	        if ( !i || !j ) return null;

	        a = xc && !xc[0];
	        b = yc && !yc[0];

	        // Either zero?
	        if ( a || b ) return a ? b ? 0 : -j : i;

	        // Signs differ?
	        if ( i != j ) return i;

	        a = i < 0;
	        b = k == l;

	        // Either Infinity?
	        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

	        // Compare exponents.
	        if ( !b ) return k > l ^ a ? 1 : -1;

	        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

	        // Compare digit by digit.
	        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

	        // Compare lengths.
	        return k == l ? 0 : k > l ^ a ? 1 : -1;
	    }


	    /*
	     * Return true if n is a valid number in range, otherwise false.
	     * Use for argument validation when ERRORS is false.
	     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
	     */
	    function intValidatorNoErrors( n, min, max ) {
	        return ( n = truncate(n) ) >= min && n <= max;
	    }


	    function isArray(obj) {
	        return Object.prototype.toString.call(obj) == '[object Array]';
	    }


	    /*
	     * Convert string of baseIn to an array of numbers of baseOut.
	     * Eg. convertBase('255', 10, 16) returns [15, 15].
	     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	     */
	    function toBaseOut( str, baseIn, baseOut ) {
	        var j,
	            arr = [0],
	            arrL,
	            i = 0,
	            len = str.length;

	        for ( ; i < len; ) {
	            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
	            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

	            for ( ; j < arr.length; j++ ) {

	                if ( arr[j] > baseOut - 1 ) {
	                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
	                    arr[j + 1] += arr[j] / baseOut | 0;
	                    arr[j] %= baseOut;
	                }
	            }
	        }

	        return arr.reverse();
	    }


	    function toExponential( str, e ) {
	        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
	          ( e < 0 ? 'e' : 'e+' ) + e;
	    }


	    function toFixedPoint( str, e ) {
	        var len, z;

	        // Negative exponent?
	        if ( e < 0 ) {

	            // Prepend zeros.
	            for ( z = '0.'; ++e; z += '0' );
	            str = z + str;

	        // Positive exponent
	        } else {
	            len = str.length;

	            // Append zeros.
	            if ( ++e > len ) {
	                for ( z = '0', e -= len; --e; z += '0' );
	                str += z;
	            } else if ( e < len ) {
	                str = str.slice( 0, e ) + '.' + str.slice(e);
	            }
	        }

	        return str;
	    }


	    function truncate(n) {
	        n = parseFloat(n);
	        return n < 0 ? mathceil(n) : mathfloor(n);
	    }


	    // EXPORT


	    BigNumber = constructorFactory();
	    BigNumber['default'] = BigNumber.BigNumber = BigNumber;


	    // AMD.
	    if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return BigNumber; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    // Node.js and other environments that support module.exports.
	    } else if ( typeof module != 'undefined' && module.exports ) {
	        module.exports = BigNumber;

	    // Browser.
	    } else {
	        if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
	        globalObj.BigNumber = BigNumber;
	    }
	})(this);


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(200),
	    castSlice = __webpack_require__(314),
	    charsEndIndex = __webpack_require__(316),
	    stringToArray = __webpack_require__(321),
	    toString = __webpack_require__(199);

	/** Used to match leading and trailing whitespace. */
	var reTrimEnd = /\s+$/;

	/**
	 * Removes trailing whitespace or specified characters from `string`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to trim.
	 * @param {string} [chars=whitespace] The characters to trim.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {string} Returns the trimmed string.
	 * @example
	 *
	 * _.trimEnd('  abc  ');
	 * // => '  abc'
	 *
	 * _.trimEnd('-_-abc-_-', '_-');
	 * // => '-_-abc'
	 */
	function trimEnd(string, chars, guard) {
	  string = toString(string);
	  if (string && (guard || chars === undefined)) {
	    return string.replace(reTrimEnd, '');
	  }
	  if (!string || !(chars = baseToString(chars))) {
	    return string;
	  }
	  var strSymbols = stringToArray(string),
	      end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

	  return castSlice(strSymbols, 0, end).join('');
	}

	module.exports = trimEnd;


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(315);

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}

	module.exports = castSlice;


/***/ }),
/* 315 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(317);

	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
	 * that is not found in the character symbols.
	 *
	 * @private
	 * @param {Array} strSymbols The string symbols to inspect.
	 * @param {Array} chrSymbols The character symbols to find.
	 * @returns {number} Returns the index of the last unmatched string symbol.
	 */
	function charsEndIndex(strSymbols, chrSymbols) {
	  var index = strSymbols.length;

	  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
	  return index;
	}

	module.exports = charsEndIndex;


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(318),
	    baseIsNaN = __webpack_require__(319),
	    strictIndexOf = __webpack_require__(320);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ }),
/* 318 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ }),
/* 319 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ }),
/* 320 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

	var asciiToArray = __webpack_require__(322),
	    hasUnicode = __webpack_require__(323),
	    unicodeToArray = __webpack_require__(324);

	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return hasUnicode(string)
	    ? unicodeToArray(string)
	    : asciiToArray(string);
	}

	module.exports = stringToArray;


/***/ }),
/* 322 */
/***/ (function(module, exports) {

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}

	module.exports = asciiToArray;


/***/ }),
/* 323 */
/***/ (function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';

	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}

	module.exports = hasUnicode;


/***/ }),
/* 324 */
/***/ (function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}

	module.exports = unicodeToArray;


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(58);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsFinite = root.isFinite;

	/**
	 * Checks if `value` is a finite primitive number.
	 *
	 * **Note:** This method is based on
	 * [`Number.isFinite`](https://mdn.io/Number/isFinite).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	 * @example
	 *
	 * _.isFinite(3);
	 * // => true
	 *
	 * _.isFinite(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isFinite(Infinity);
	 * // => false
	 *
	 * _.isFinite('3');
	 * // => false
	 */
	function isFinite(value) {
	  return typeof value == 'number' && nativeIsFinite(value);
	}

	module.exports = isFinite;


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.best_r = best_r;

	var _bignumber = __webpack_require__(312);

	var _bignumber2 = _interopRequireDefault(_bignumber);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// eslint-disable-next-line no-bitwise
	var MAX_INT = (1 << 31 >>> 0) - 1;

	/**
	 * Calculates and returns the best rational approximation of the given real number.
	 * @private
	 * @param {string|number|BigNumber} rawNumber Real number
	 * @throws Error Throws `Error` when the best rational approximation cannot be found.
	 * @returns {array} first element is n (numerator), second element is d (denominator)
	 */
	function best_r(rawNumber) {
	  var number = new _bignumber2.default(rawNumber);
	  var a = void 0;
	  var f = void 0;
	  var fractions = [[new _bignumber2.default(0), new _bignumber2.default(1)], [new _bignumber2.default(1), new _bignumber2.default(0)]];
	  var i = 2;

	  // eslint-disable-next-line no-constant-condition
	  while (true) {
	    if (number.gt(MAX_INT)) {
	      break;
	    }
	    a = number.floor();
	    f = number.sub(a);
	    var h = a.mul(fractions[i - 1][0]).add(fractions[i - 2][0]);
	    var k = a.mul(fractions[i - 1][1]).add(fractions[i - 2][1]);
	    if (h.gt(MAX_INT) || k.gt(MAX_INT)) {
	      break;
	    }
	    fractions.push([h, k]);
	    if (f.eq(0)) {
	      break;
	    }
	    number = new _bignumber2.default(1).div(f);
	    i += 1;
	  }

	  var _fractions = _slicedToArray(fractions[fractions.length - 1], 2),
	      n = _fractions[0],
	      d = _fractions[1];

	  if (n.isZero() || d.isZero()) {
	    throw new Error("Couldn't find approximation");
	  }

	  return [n.toNumber(), d.toNumber()];
	}

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Asset = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _clone = __webpack_require__(328);

	var _clone2 = _interopRequireDefault(_clone);

	var _padEnd = __webpack_require__(352);

	var _padEnd2 = _interopRequireDefault(_padEnd);

	var _trimEnd = __webpack_require__(313);

	var _trimEnd2 = _interopRequireDefault(_trimEnd);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _keypair = __webpack_require__(21);

	var _strkey = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Asset class represents an asset, either the native asset (`XLM`)
	 * or an asset code / issuer account ID pair.
	 *
	 * An asset code describes an asset code and issuer pair. In the case of the native
	 * asset XLM, the issuer will be null.
	 *
	 * @constructor
	 * @param {string} code - The asset code.
	 * @param {string} issuer - The account ID of the issuer.
	 */
	var Asset = exports.Asset = function () {
	  function Asset(code, issuer) {
	    _classCallCheck(this, Asset);

	    if (!/^[a-zA-Z0-9]{1,12}$/.test(code)) {
	      throw new Error('Asset code is invalid (maximum alphanumeric, 12 characters at max)');
	    }
	    if (String(code).toLowerCase() !== 'xlm' && !issuer) {
	      throw new Error('Issuer cannot be null');
	    }
	    if (issuer && !_strkey.StrKey.isValidEd25519PublicKey(issuer)) {
	      throw new Error('Issuer is invalid');
	    }

	    this.code = code;
	    this.issuer = issuer;
	  }

	  /**
	   * Returns an asset object for the native asset.
	   * @Return {Asset}
	   */


	  _createClass(Asset, [{
	    key: 'toXDRObject',


	    /**
	     * Returns the xdr object for this asset.
	     * @returns {xdr.Asset} XDR Asset object
	     */
	    value: function toXDRObject() {
	      if (this.isNative()) {
	        return _stellarXdr_generated2.default.Asset.assetTypeNative();
	      }

	      var xdrType = void 0;
	      var xdrTypeString = void 0;
	      if (this.code.length <= 4) {
	        xdrType = _stellarXdr_generated2.default.AssetAlphaNum4;
	        xdrTypeString = 'assetTypeCreditAlphanum4';
	      } else {
	        xdrType = _stellarXdr_generated2.default.AssetAlphaNum12;
	        xdrTypeString = 'assetTypeCreditAlphanum12';
	      }

	      // pad code with null bytes if necessary
	      var padLength = this.code.length <= 4 ? 4 : 12;
	      var paddedCode = (0, _padEnd2.default)(this.code, padLength, '\0');

	      // eslint-disable-next-line new-cap
	      var assetType = new xdrType({
	        assetCode: paddedCode,
	        issuer: _keypair.Keypair.fromPublicKey(this.issuer).xdrAccountId()
	      });

	      return new _stellarXdr_generated2.default.Asset(xdrTypeString, assetType);
	    }

	    /**
	     * @returns {string} Asset code
	     */

	  }, {
	    key: 'getCode',
	    value: function getCode() {
	      return (0, _clone2.default)(this.code);
	    }

	    /**
	     * @returns {string} Asset issuer
	     */

	  }, {
	    key: 'getIssuer',
	    value: function getIssuer() {
	      return (0, _clone2.default)(this.issuer);
	    }

	    /**
	     * @see [Assets concept](https://www.stellar.org/developers/learn/concepts/assets.html)
	     * @returns {string} Asset type. Can be one of following types:
	     *
	     * * `native`
	     * * `credit_alphanum4`
	     * * `credit_alphanum12`
	     */

	  }, {
	    key: 'getAssetType',
	    value: function getAssetType() {
	      if (this.isNative()) {
	        return 'native';
	      }
	      if (this.code.length >= 1 && this.code.length <= 4) {
	        return 'credit_alphanum4';
	      }
	      if (this.code.length >= 5 && this.code.length <= 12) {
	        return 'credit_alphanum12';
	      }

	      return null;
	    }

	    /**
	     * @returns {boolean}  true if this asset object is the native asset.
	     */

	  }, {
	    key: 'isNative',
	    value: function isNative() {
	      return !this.issuer;
	    }

	    /**
	     * @param {Asset} asset Asset to compare
	     * @returns {boolean} true if this asset equals the given asset.
	     */

	  }, {
	    key: 'equals',
	    value: function equals(asset) {
	      return this.code === asset.getCode() && this.issuer === asset.getIssuer();
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      if (this.isNative()) {
	        return 'native';
	      }

	      return this.getCode() + '-' + this.getIssuer();
	    }
	  }], [{
	    key: 'native',
	    value: function native() {
	      return new Asset('XLM');
	    }

	    /**
	     * Returns an asset object from its XDR object representation.
	     * @param {xdr.Asset} assetXdr - The asset xdr object.
	     * @returns {Asset}
	     */

	  }, {
	    key: 'fromOperation',
	    value: function fromOperation(assetXdr) {
	      var anum = void 0;
	      var code = void 0;
	      var issuer = void 0;
	      switch (assetXdr.switch()) {
	        case _stellarXdr_generated2.default.AssetType.assetTypeNative():
	          return this.native();
	        case _stellarXdr_generated2.default.AssetType.assetTypeCreditAlphanum4():
	          anum = assetXdr.alphaNum4();
	        /* falls through */
	        case _stellarXdr_generated2.default.AssetType.assetTypeCreditAlphanum12():
	          anum = anum || assetXdr.alphaNum12();
	          issuer = _strkey.StrKey.encodeEd25519PublicKey(anum.issuer().ed25519());
	          code = (0, _trimEnd2.default)(anum.assetCode(), '\0');
	          return new this(code, issuer);
	        default:
	          throw new Error('Invalid asset type: ' + assetXdr.switch().name);
	      }
	    }
	  }]);

	  return Asset;
	}();

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(329);

	/** Used to compose bitmasks for cloning. */
	var CLONE_SYMBOLS_FLAG = 4;

	/**
	 * Creates a shallow clone of `value`.
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	 * and supports cloning arrays, array buffers, booleans, date objects, maps,
	 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	 * arrays. The own enumerable properties of `arguments` objects are cloned
	 * as plain objects. An empty object is returned for uncloneable values such
	 * as error objects, functions, DOM nodes, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @returns {*} Returns the cloned value.
	 * @see _.cloneDeep
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var shallow = _.clone(objects);
	 * console.log(shallow[0] === objects[0]);
	 * // => true
	 */
	function clone(value) {
	  return baseClone(value, CLONE_SYMBOLS_FLAG);
	}

	module.exports = clone;


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(134),
	    arrayEach = __webpack_require__(225),
	    assignValue = __webpack_require__(73),
	    baseAssign = __webpack_require__(330),
	    baseAssignIn = __webpack_require__(331),
	    cloneBuffer = __webpack_require__(332),
	    copyArray = __webpack_require__(333),
	    copySymbols = __webpack_require__(334),
	    copySymbolsIn = __webpack_require__(335),
	    getAllKeys = __webpack_require__(176),
	    getAllKeysIn = __webpack_require__(338),
	    getTag = __webpack_require__(182),
	    initCloneArray = __webpack_require__(339),
	    initCloneByTag = __webpack_require__(340),
	    initCloneObject = __webpack_require__(346),
	    isArray = __webpack_require__(62),
	    isBuffer = __webpack_require__(103),
	    isMap = __webpack_require__(348),
	    isObject = __webpack_require__(79),
	    isSet = __webpack_require__(350),
	    keys = __webpack_require__(126);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
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
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (isSet(value)) {
	    value.forEach(function(subValue) {
	      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	    });
	  } else if (isMap(value)) {
	    value.forEach(function(subValue, key) {
	      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	    });
	  }

	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys);

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(72),
	    keys = __webpack_require__(126);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(72),
	    keysIn = __webpack_require__(98);

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	module.exports = baseAssignIn;


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(58);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)(module)))

/***/ }),
/* 333 */
/***/ (function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(72),
	    getSymbols = __webpack_require__(179);

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(72),
	    getSymbolsIn = __webpack_require__(336);

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	module.exports = copySymbolsIn;


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(178),
	    getPrototype = __webpack_require__(337),
	    getSymbols = __webpack_require__(179),
	    stubArray = __webpack_require__(181);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	module.exports = getSymbolsIn;


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(129);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(177),
	    getSymbolsIn = __webpack_require__(336),
	    keysIn = __webpack_require__(98);

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	module.exports = getAllKeysIn;


/***/ }),
/* 339 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
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

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(341),
	    cloneDataView = __webpack_require__(342),
	    cloneRegExp = __webpack_require__(343),
	    cloneSymbol = __webpack_require__(344),
	    cloneTypedArray = __webpack_require__(345);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
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
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return new Ctor;

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return new Ctor;

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(172);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(341);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;


/***/ }),
/* 343 */
/***/ (function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(57);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(341);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(347),
	    getPrototype = __webpack_require__(337),
	    isPrototype = __webpack_require__(111);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(79);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsMap = __webpack_require__(349),
	    baseUnary = __webpack_require__(108),
	    nodeUtil = __webpack_require__(109);

	/* Node.js helper references. */
	var nodeIsMap = nodeUtil && nodeUtil.isMap;

	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */
	var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

	module.exports = isMap;


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(182),
	    isObjectLike = __webpack_require__(63);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap(value) {
	  return isObjectLike(value) && getTag(value) == mapTag;
	}

	module.exports = baseIsMap;


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsSet = __webpack_require__(351),
	    baseUnary = __webpack_require__(108),
	    nodeUtil = __webpack_require__(109);

	/* Node.js helper references. */
	var nodeIsSet = nodeUtil && nodeUtil.isSet;

	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

	module.exports = isSet;


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(182),
	    isObjectLike = __webpack_require__(63);

	/** `Object#toString` result references. */
	var setTag = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike(value) && getTag(value) == setTag;
	}

	module.exports = baseIsSet;


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

	var createPadding = __webpack_require__(353),
	    stringSize = __webpack_require__(355),
	    toInteger = __webpack_require__(228),
	    toString = __webpack_require__(199);

	/**
	 * Pads `string` on the right side if it's shorter than `length`. Padding
	 * characters are truncated if they exceed `length`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to pad.
	 * @param {number} [length=0] The padding length.
	 * @param {string} [chars=' '] The string used as padding.
	 * @returns {string} Returns the padded string.
	 * @example
	 *
	 * _.padEnd('abc', 6);
	 * // => 'abc   '
	 *
	 * _.padEnd('abc', 6, '_-');
	 * // => 'abc_-_'
	 *
	 * _.padEnd('abc', 3);
	 * // => 'abc'
	 */
	function padEnd(string, length, chars) {
	  string = toString(string);
	  length = toInteger(length);

	  var strLength = length ? stringSize(string) : 0;
	  return (length && strLength < length)
	    ? (string + createPadding(length - strLength, chars))
	    : string;
	}

	module.exports = padEnd;


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

	var baseRepeat = __webpack_require__(354),
	    baseToString = __webpack_require__(200),
	    castSlice = __webpack_require__(314),
	    hasUnicode = __webpack_require__(323),
	    stringSize = __webpack_require__(355),
	    stringToArray = __webpack_require__(321);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil;

	/**
	 * Creates the padding for `string` based on `length`. The `chars` string
	 * is truncated if the number of characters exceeds `length`.
	 *
	 * @private
	 * @param {number} length The padding length.
	 * @param {string} [chars=' '] The string used as padding.
	 * @returns {string} Returns the padding for `string`.
	 */
	function createPadding(length, chars) {
	  chars = chars === undefined ? ' ' : baseToString(chars);

	  var charsLength = chars.length;
	  if (charsLength < 2) {
	    return charsLength ? baseRepeat(chars, length) : chars;
	  }
	  var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
	  return hasUnicode(chars)
	    ? castSlice(stringToArray(result), 0, length).join('')
	    : result.slice(0, length);
	}

	module.exports = createPadding;


/***/ }),
/* 354 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor;

	/**
	 * The base implementation of `_.repeat` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {string} string The string to repeat.
	 * @param {number} n The number of times to repeat the string.
	 * @returns {string} Returns the repeated string.
	 */
	function baseRepeat(string, n) {
	  var result = '';
	  if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
	    return result;
	  }
	  // Leverage the exponentiation by squaring algorithm for a faster repeat.
	  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
	  do {
	    if (n % 2) {
	      result += string;
	    }
	    n = nativeFloor(n / 2);
	    if (n) {
	      string += string;
	    }
	  } while (n);

	  return result;
	}

	module.exports = baseRepeat;


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

	var asciiSize = __webpack_require__(356),
	    hasUnicode = __webpack_require__(323),
	    unicodeSize = __webpack_require__(357);

	/**
	 * Gets the number of symbols in `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the string size.
	 */
	function stringSize(string) {
	  return hasUnicode(string)
	    ? unicodeSize(string)
	    : asciiSize(string);
	}

	module.exports = stringSize;


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(207);

	/**
	 * Gets the size of an ASCII `string`.
	 *
	 * @private
	 * @param {string} string The string inspect.
	 * @returns {number} Returns the string size.
	 */
	var asciiSize = baseProperty('length');

	module.exports = asciiSize;


/***/ }),
/* 357 */
/***/ (function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	/**
	 * Gets the size of a Unicode `string`.
	 *
	 * @private
	 * @param {string} string The string inspect.
	 * @returns {number} Returns the string size.
	 */
	function unicodeSize(string) {
	  var result = reUnicode.lastIndex = 0;
	  while (reUnicode.test(string)) {
	    ++result;
	  }
	  return result;
	}

	module.exports = unicodeSize;


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPassiveSellOffer = exports.manageSellOffer = exports.setOptions = exports.payment = exports.pathPayment = exports.manageBuyOffer = exports.manageData = exports.inflation = exports.createAccount = exports.changeTrust = exports.bumpSequence = exports.allowTrust = exports.accountMerge = undefined;

	var _account_merge = __webpack_require__(359);

	Object.defineProperty(exports, 'accountMerge', {
	  enumerable: true,
	  get: function get() {
	    return _account_merge.accountMerge;
	  }
	});

	var _allow_trust = __webpack_require__(360);

	Object.defineProperty(exports, 'allowTrust', {
	  enumerable: true,
	  get: function get() {
	    return _allow_trust.allowTrust;
	  }
	});

	var _bump_sequence = __webpack_require__(361);

	Object.defineProperty(exports, 'bumpSequence', {
	  enumerable: true,
	  get: function get() {
	    return _bump_sequence.bumpSequence;
	  }
	});

	var _change_trust = __webpack_require__(362);

	Object.defineProperty(exports, 'changeTrust', {
	  enumerable: true,
	  get: function get() {
	    return _change_trust.changeTrust;
	  }
	});

	var _create_account = __webpack_require__(363);

	Object.defineProperty(exports, 'createAccount', {
	  enumerable: true,
	  get: function get() {
	    return _create_account.createAccount;
	  }
	});

	var _inflation = __webpack_require__(364);

	Object.defineProperty(exports, 'inflation', {
	  enumerable: true,
	  get: function get() {
	    return _inflation.inflation;
	  }
	});

	var _manage_data = __webpack_require__(365);

	Object.defineProperty(exports, 'manageData', {
	  enumerable: true,
	  get: function get() {
	    return _manage_data.manageData;
	  }
	});

	var _manage_buy_offer = __webpack_require__(366);

	Object.defineProperty(exports, 'manageBuyOffer', {
	  enumerable: true,
	  get: function get() {
	    return _manage_buy_offer.manageBuyOffer;
	  }
	});

	var _path_payment = __webpack_require__(367);

	Object.defineProperty(exports, 'pathPayment', {
	  enumerable: true,
	  get: function get() {
	    return _path_payment.pathPayment;
	  }
	});

	var _payment = __webpack_require__(368);

	Object.defineProperty(exports, 'payment', {
	  enumerable: true,
	  get: function get() {
	    return _payment.payment;
	  }
	});

	var _set_options = __webpack_require__(369);

	Object.defineProperty(exports, 'setOptions', {
	  enumerable: true,
	  get: function get() {
	    return _set_options.setOptions;
	  }
	});
	exports.manageOffer = manageOffer;
	exports.createPassiveOffer = createPassiveOffer;

	var _manage_sell_offer = __webpack_require__(370);

	var _create_passive_sell_offer = __webpack_require__(371);

	exports.manageSellOffer = _manage_sell_offer.manageSellOffer;
	exports.createPassiveSellOffer = _create_passive_sell_offer.createPassiveSellOffer;
	function manageOffer(opts) {
	  // eslint-disable-next-line no-console
	  console.log('[Operation] Operation.manageOffer has been renamed to Operation.manageSellOffer! The old name is deprecated and will be removed in a later version!');

	  return _manage_sell_offer.manageSellOffer.call(this, opts);
	}

	function createPassiveOffer(opts) {
	  // eslint-disable-next-line no-console
	  console.log('[Operation] Operation.createPassiveOffer has been renamed to Operation.createPassiveSellOffer! The old name is deprecated and will be removed in a later version!');

	  return _create_passive_sell_offer.createPassiveSellOffer.call(this, opts);
	}

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.accountMerge = accountMerge;

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _keypair = __webpack_require__(21);

	var _strkey = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Transfers native balance to destination account.
	 * @function
	 * @alias Operation.accountMerge
	 * @param {object} opts Options object
	 * @param {string} opts.destination - Destination to merge the source account into.
	 * @param {string} [opts.source] - The source account (defaults to transaction source).
	 * @returns {xdr.AccountMergeOp} Account Merge operation
	 */
	function accountMerge(opts) {
	  var opAttributes = {};
	  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.destination)) {
	    throw new Error('destination is invalid');
	  }
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.accountMerge(_keypair.Keypair.fromPublicKey(opts.destination).xdrAccountId());
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.allowTrust = allowTrust;

	var _padEnd = __webpack_require__(352);

	var _padEnd2 = _interopRequireDefault(_padEnd);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _keypair = __webpack_require__(21);

	var _strkey = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns an XDR AllowTrustOp. An "allow trust" operation authorizes another
	 * account to hold your account's credit for a given asset.
	 * @function
	 * @alias Operation.allowTrust
	 * @param {object} opts Options object
	 * @param {string} opts.trustor - The trusting account (the one being authorized)
	 * @param {string} opts.assetCode - The asset code being authorized.
	 * @param {boolean} opts.authorize - True to authorize the line, false to deauthorize.
	 * @param {string} [opts.source] - The source account (defaults to transaction source).
	 * @returns {xdr.AllowTrustOp} Allow Trust operation
	 */
	function allowTrust(opts) {
	  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.trustor)) {
	    throw new Error('trustor is invalid');
	  }
	  var attributes = {};
	  attributes.trustor = _keypair.Keypair.fromPublicKey(opts.trustor).xdrAccountId();
	  if (opts.assetCode.length <= 4) {
	    var code = (0, _padEnd2.default)(opts.assetCode, 4, '\0');
	    attributes.asset = _stellarXdr_generated2.default.AllowTrustOpAsset.assetTypeCreditAlphanum4(code);
	  } else if (opts.assetCode.length <= 12) {
	    var _code = (0, _padEnd2.default)(opts.assetCode, 12, '\0');
	    attributes.asset = _stellarXdr_generated2.default.AllowTrustOpAsset.assetTypeCreditAlphanum12(_code);
	  } else {
	    throw new Error('Asset code must be 12 characters at max.');
	  }
	  attributes.authorize = opts.authorize;
	  var allowTrustOp = new _stellarXdr_generated2.default.AllowTrustOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.allowTrust(allowTrustOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bumpSequence = bumpSequence;

	var _jsXdr = __webpack_require__(65);

	var _bignumber = __webpack_require__(312);

	var _bignumber2 = _interopRequireDefault(_bignumber);

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This operation bumps sequence number.
	 * @function
	 * @alias Operation.bumpSequence
	 * @param {object} opts Options object
	 * @param {string} opts.bumpTo - Sequence number to bump to.
	 * @param {string} [opts.source] - The optional source account.
	 * @returns {xdr.BumpSequenceOp} Operation
	 */
	function bumpSequence(opts) {
	  var attributes = {};

	  if (!(0, _isString2.default)(opts.bumpTo)) {
	    throw new Error('bumpTo must be a string');
	  }

	  try {
	    // eslint-disable-next-line no-new
	    new _bignumber2.default(opts.bumpTo);
	  } catch (e) {
	    throw new Error('bumpTo must be a stringified number');
	  }

	  attributes.bumpTo = _jsXdr.Hyper.fromString(opts.bumpTo);

	  var bumpSequenceOp = new _stellarXdr_generated2.default.BumpSequenceOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.bumpSequence(bumpSequenceOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.changeTrust = changeTrust;

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _jsXdr = __webpack_require__(65);

	var _bignumber = __webpack_require__(312);

	var _bignumber2 = _interopRequireDefault(_bignumber);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MAX_INT64 = '9223372036854775807';

	/**
	 * Returns an XDR ChangeTrustOp. A "change trust" operation adds, removes, or updates a
	 * trust line for a given asset from the source account to another. The issuer being
	 * trusted and the asset code are in the given Asset object.
	 * @function
	 * @alias Operation.changeTrust
	 * @param {object} opts Options object
	 * @param {Asset} opts.asset - The asset for the trust line.
	 * @param {string} [opts.limit] - The limit for the asset, defaults to max int64.
	 *                                If the limit is set to "0" it deletes the trustline.
	 * @param {string} [opts.source] - The source account (defaults to transaction source).
	 * @returns {xdr.ChangeTrustOp} Change Trust operation
	 */
	function changeTrust(opts) {
	  var attributes = {};
	  attributes.line = opts.asset.toXDRObject();
	  if (!(0, _isUndefined2.default)(opts.limit) && !this.isValidAmount(opts.limit, true)) {
	    throw new TypeError(this.constructAmountRequirementsError('limit'));
	  }

	  if (opts.limit) {
	    attributes.limit = this._toXDRAmount(opts.limit);
	  } else {
	    attributes.limit = _jsXdr.Hyper.fromString(new _bignumber2.default(MAX_INT64).toString());
	  }

	  if (opts.source) {
	    attributes.source = opts.source.masterKeypair;
	  }
	  var changeTrustOP = new _stellarXdr_generated2.default.ChangeTrustOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.changeTrust(changeTrustOP);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAccount = createAccount;

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _keypair = __webpack_require__(21);

	var _strkey = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Create and fund a non existent account.
	 * @function
	 * @alias Operation.createAccount
	 * @param {object} opts Options object
	 * @param {string} opts.destination - Destination account ID to create an account for.
	 * @param {string} opts.startingBalance - Amount in XLM the account should be funded for. Must be greater
	 *                                   than the [reserve balance amount](https://www.stellar.org/developers/learn/concepts/fees.html).
	 * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
	 * @returns {xdr.CreateAccountOp} Create account operation
	 */
	function createAccount(opts) {
	  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.destination)) {
	    throw new Error('destination is invalid');
	  }
	  if (!this.isValidAmount(opts.startingBalance)) {
	    throw new TypeError(this.constructAmountRequirementsError('startingBalance'));
	  }
	  var attributes = {};
	  attributes.destination = _keypair.Keypair.fromPublicKey(opts.destination).xdrAccountId();
	  attributes.startingBalance = this._toXDRAmount(opts.startingBalance);
	  var createAccountOp = new _stellarXdr_generated2.default.CreateAccountOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.createAccount(createAccountOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.inflation = inflation;

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This operation generates the inflation.
	 * @function
	 * @alias Operation.inflation
	 * @param {object} [opts] Options object
	 * @param {string} [opts.source] - The optional source account.
	 * @returns {xdr.InflationOp} Inflation operation
	 */
	function inflation() {
	  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.inflation();
	  this.setSourceAccount(opAttributes, opts);
	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.manageData = manageData;

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This operation adds data entry to the ledger.
	 * @function
	 * @alias Operation.manageData
	 * @param {object} opts Options object
	 * @param {string} opts.name - The name of the data entry.
	 * @param {string|Buffer} opts.value - The value of the data entry.
	 * @param {string} [opts.source] - The optional source account.
	 * @returns {xdr.ManageDataOp} Manage Data operation
	 */
	function manageData(opts) {
	  var attributes = {};

	  if (!((0, _isString2.default)(opts.name) && opts.name.length <= 64)) {
	    throw new Error('name must be a string, up to 64 characters');
	  }
	  attributes.dataName = opts.name;

	  if (!(0, _isString2.default)(opts.value) && !Buffer.isBuffer(opts.value) && opts.value !== null) {
	    throw new Error('value must be a string, Buffer or null');
	  }

	  if ((0, _isString2.default)(opts.value)) {
	    attributes.dataValue = Buffer.from(opts.value);
	  } else {
	    attributes.dataValue = opts.value;
	  }

	  if (attributes.dataValue !== null && attributes.dataValue.length > 64) {
	    throw new Error('value cannot be longer that 64 bytes');
	  }

	  var manageDataOp = new _stellarXdr_generated2.default.ManageDataOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.manageDatum(manageDataOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.manageBuyOffer = manageBuyOffer;

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _jsXdr = __webpack_require__(65);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns a XDR ManageBuyOfferOp. A "manage buy offer" operation creates, updates, or
	 * deletes a buy offer.
	 * @function
	 * @alias Operation.manageBuyOffer
	 * @param {object} opts Options object
	 * @param {Asset} opts.selling - What you're selling.
	 * @param {Asset} opts.buying - What you're buying.
	 * @param {string} opts.buyAmount - The total amount you're buying. If 0, deletes the offer.
	 * @param {number|string|BigNumber|Object} opts.price - Price of 1 unit of `selling` in terms of `buying`.
	 * @param {number} opts.price.n - If `opts.price` is an object: the price numerator
	 * @param {number} opts.price.d - If `opts.price` is an object: the price denominator
	 * @param {number|string} [opts.offerId ] - If `0`, will create a new offer (default). Otherwise, edits an exisiting offer.
	 * @param {string} [opts.source] - The source account (defaults to transaction source).
	 * @throws {Error} Throws `Error` when the best rational approximation of `price` cannot be found.
	 * @returns {xdr.ManageBuyOfferOp} Manage Buy Offer operation
	 */
	function manageBuyOffer(opts) {
	  var attributes = {};
	  attributes.selling = opts.selling.toXDRObject();
	  attributes.buying = opts.buying.toXDRObject();
	  if (!this.isValidAmount(opts.buyAmount, true)) {
	    throw new TypeError(this.constructAmountRequirementsError('buyAmount'));
	  }
	  attributes.buyAmount = this._toXDRAmount(opts.buyAmount);
	  if ((0, _isUndefined2.default)(opts.price)) {
	    throw new TypeError('price argument is required');
	  }
	  attributes.price = this._toXDRPrice(opts.price);

	  if (!(0, _isUndefined2.default)(opts.offerId)) {
	    opts.offerId = opts.offerId.toString();
	  } else {
	    opts.offerId = '0';
	  }

	  attributes.offerId = _jsXdr.Hyper.fromString(opts.offerId);
	  var manageBuyOfferOp = new _stellarXdr_generated2.default.ManageBuyOfferOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.manageBuyOffer(manageBuyOfferOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pathPayment = pathPayment;

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _keypair = __webpack_require__(21);

	var _strkey = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns a XDR PaymentOp. A "payment" operation send the specified amount to the
	 * destination account, optionally through a path. XLM payments create the destination
	 * account if it does not exist.
	 * @function
	 * @alias Operation.pathPayment
	 * @param {object} opts Options object
	 * @param {Asset} opts.sendAsset - The asset to pay with.
	 * @param {string} opts.sendMax - The maximum amount of sendAsset to send.
	 * @param {string} opts.destination - The destination account to send to.
	 * @param {Asset} opts.destAsset - The asset the destination will receive.
	 * @param {string} opts.destAmount - The amount the destination receives.
	 * @param {Asset[]} opts.path - An array of Asset objects to use as the path.
	 * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
	 * @returns {xdr.PathPaymentOp} Path Payment operation
	 */
	function pathPayment(opts) {
	  switch (true) {
	    case !opts.sendAsset:
	      throw new Error('Must specify a send asset');
	    case !this.isValidAmount(opts.sendMax):
	      throw new TypeError(this.constructAmountRequirementsError('sendMax'));
	    case !_strkey.StrKey.isValidEd25519PublicKey(opts.destination):
	      throw new Error('destination is invalid');
	    case !opts.destAsset:
	      throw new Error('Must provide a destAsset for a payment operation');
	    case !this.isValidAmount(opts.destAmount):
	      throw new TypeError(this.constructAmountRequirementsError('destAmount'));
	    default:
	      break;
	  }

	  var attributes = {};
	  attributes.sendAsset = opts.sendAsset.toXDRObject();
	  attributes.sendMax = this._toXDRAmount(opts.sendMax);
	  attributes.destination = _keypair.Keypair.fromPublicKey(opts.destination).xdrAccountId();
	  attributes.destAsset = opts.destAsset.toXDRObject();
	  attributes.destAmount = this._toXDRAmount(opts.destAmount);

	  var path = opts.path ? opts.path : [];
	  attributes.path = path.map(function (x) {
	    return x.toXDRObject();
	  });

	  var payment = new _stellarXdr_generated2.default.PathPaymentOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.pathPayment(payment);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.payment = payment;

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _keypair = __webpack_require__(21);

	var _strkey = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Create a payment operation.
	 * @function
	 * @alias Operation.payment
	 * @param {object} opts Options object
	 * @param {string} opts.destination - The destination account ID.
	 * @param {Asset} opts.asset - The asset to send.
	 * @param {string} opts.amount - The amount to send.
	 * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
	 * @returns {xdr.PaymentOp} Payment operation
	 */
	function payment(opts) {
	  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.destination)) {
	    throw new Error('destination is invalid');
	  }
	  if (!opts.asset) {
	    throw new Error('Must provide an asset for a payment operation');
	  }
	  if (!this.isValidAmount(opts.amount)) {
	    throw new TypeError(this.constructAmountRequirementsError('amount'));
	  }

	  var attributes = {};
	  attributes.destination = _keypair.Keypair.fromPublicKey(opts.destination).xdrAccountId();
	  attributes.asset = opts.asset.toXDRObject();
	  attributes.amount = this._toXDRAmount(opts.amount);
	  var paymentOp = new _stellarXdr_generated2.default.PaymentOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.payment(paymentOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setOptions = setOptions;

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _keypair = __webpack_require__(21);

	var _strkey = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function weightCheckFunction(value, name) {
	  if (value >= 0 && value <= 255) {
	    return true;
	  }
	  throw new Error(name + ' value must be between 0 and 255');
	}

	/**
	 * Returns an XDR SetOptionsOp. A "set options" operations set or clear account flags,
	 * set the account's inflation destination, and/or add new signers to the account.
	 * The flags used in `opts.clearFlags` and `opts.setFlags` can be the following:
	 *   - `{@link AuthRequiredFlag}`
	 *   - `{@link AuthRevocableFlag}`
	 *   - `{@link AuthImmutableFlag}`
	 *
	 * It's possible to set/clear multiple flags at once using logical or.
	 * @function
	 * @alias Operation.setOptions
	 * @param {object} opts Options object
	 * @param {string} [opts.inflationDest] - Set this account ID as the account's inflation destination.
	 * @param {(number|string)} [opts.clearFlags] - Bitmap integer for which account flags to clear.
	 * @param {(number|string)} [opts.setFlags] - Bitmap integer for which account flags to set.
	 * @param {number|string} [opts.masterWeight] - The master key weight.
	 * @param {number|string} [opts.lowThreshold] - The sum weight for the low threshold.
	 * @param {number|string} [opts.medThreshold] - The sum weight for the medium threshold.
	 * @param {number|string} [opts.highThreshold] - The sum weight for the high threshold.
	 * @param {object} [opts.signer] - Add or remove a signer from the account. The signer is
	 *                                 deleted if the weight is 0. Only one of `ed25519PublicKey`, `sha256Hash`, `preAuthTx` should be defined.
	 * @param {string} [opts.signer.ed25519PublicKey] - The ed25519 public key of the signer.
	 * @param {Buffer|string} [opts.signer.sha256Hash] - sha256 hash (Buffer or hex string) of preimage that will unlock funds. Preimage should be used as signature of future transaction.
	 * @param {Buffer|string} [opts.signer.preAuthTx] - Hash (Buffer or hex string) of transaction that will unlock funds.
	 * @param {number|string} [opts.signer.weight] - The weight of the new signer (0 to delete or 1-255)
	 * @param {string} [opts.homeDomain] - sets the home domain used for reverse federation lookup.
	 * @param {string} [opts.source] - The source account (defaults to transaction source).
	 * @returns {xdr.SetOptionsOp}  XDR operation
	 * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
	 */
	/* eslint-disable no-param-reassign */

	function setOptions(opts) {
	  var attributes = {};

	  if (opts.inflationDest) {
	    if (!_strkey.StrKey.isValidEd25519PublicKey(opts.inflationDest)) {
	      throw new Error('inflationDest is invalid');
	    }
	    attributes.inflationDest = _keypair.Keypair.fromPublicKey(opts.inflationDest).xdrAccountId();
	  }

	  attributes.clearFlags = this._checkUnsignedIntValue('clearFlags', opts.clearFlags);
	  attributes.setFlags = this._checkUnsignedIntValue('setFlags', opts.setFlags);
	  attributes.masterWeight = this._checkUnsignedIntValue('masterWeight', opts.masterWeight, weightCheckFunction);
	  attributes.lowThreshold = this._checkUnsignedIntValue('lowThreshold', opts.lowThreshold, weightCheckFunction);
	  attributes.medThreshold = this._checkUnsignedIntValue('medThreshold', opts.medThreshold, weightCheckFunction);
	  attributes.highThreshold = this._checkUnsignedIntValue('highThreshold', opts.highThreshold, weightCheckFunction);

	  if (!(0, _isUndefined2.default)(opts.homeDomain) && !(0, _isString2.default)(opts.homeDomain)) {
	    throw new TypeError('homeDomain argument must be of type String');
	  }
	  attributes.homeDomain = opts.homeDomain;

	  if (opts.signer) {
	    var weight = this._checkUnsignedIntValue('signer.weight', opts.signer.weight, weightCheckFunction);
	    var key = void 0;

	    var setValues = 0;

	    if (opts.signer.ed25519PublicKey) {
	      if (!_strkey.StrKey.isValidEd25519PublicKey(opts.signer.ed25519PublicKey)) {
	        throw new Error('signer.ed25519PublicKey is invalid.');
	      }
	      var rawKey = _strkey.StrKey.decodeEd25519PublicKey(opts.signer.ed25519PublicKey);

	      // eslint-disable-next-line new-cap
	      key = new _stellarXdr_generated2.default.SignerKey.signerKeyTypeEd25519(rawKey);
	      setValues += 1;
	    }

	    if (opts.signer.preAuthTx) {
	      if ((0, _isString2.default)(opts.signer.preAuthTx)) {
	        opts.signer.preAuthTx = Buffer.from(opts.signer.preAuthTx, 'hex');
	      }

	      if (!(Buffer.isBuffer(opts.signer.preAuthTx) && opts.signer.preAuthTx.length === 32)) {
	        throw new Error('signer.preAuthTx must be 32 bytes Buffer.');
	      }

	      // eslint-disable-next-line new-cap
	      key = new _stellarXdr_generated2.default.SignerKey.signerKeyTypePreAuthTx(opts.signer.preAuthTx);
	      setValues += 1;
	    }

	    if (opts.signer.sha256Hash) {
	      if ((0, _isString2.default)(opts.signer.sha256Hash)) {
	        opts.signer.sha256Hash = Buffer.from(opts.signer.sha256Hash, 'hex');
	      }

	      if (!(Buffer.isBuffer(opts.signer.sha256Hash) && opts.signer.sha256Hash.length === 32)) {
	        throw new Error('signer.sha256Hash must be 32 bytes Buffer.');
	      }

	      // eslint-disable-next-line new-cap
	      key = new _stellarXdr_generated2.default.SignerKey.signerKeyTypeHashX(opts.signer.sha256Hash);
	      setValues += 1;
	    }

	    if (setValues !== 1) {
	      throw new Error('Signer object must contain exactly one of signer.ed25519PublicKey, signer.sha256Hash, signer.preAuthTx.');
	    }

	    attributes.signer = new _stellarXdr_generated2.default.Signer({ key: key, weight: weight });
	  }

	  var setOptionsOp = new _stellarXdr_generated2.default.SetOptionsOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.setOption(setOptionsOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.manageSellOffer = manageSellOffer;

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _jsXdr = __webpack_require__(65);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns a XDR ManageSellOfferOp. A "manage sell offer" operation creates, updates, or
	 * deletes an offer.
	 * @function
	 * @alias Operation.manageSellOffer
	 * @param {object} opts Options object
	 * @param {Asset} opts.selling - What you're selling.
	 * @param {Asset} opts.buying - What you're buying.
	 * @param {string} opts.amount - The total amount you're selling. If 0, deletes the offer.
	 * @param {number|string|BigNumber|Object} opts.price - Price of 1 unit of `selling` in terms of `buying`.
	 * @param {number} opts.price.n - If `opts.price` is an object: the price numerator
	 * @param {number} opts.price.d - If `opts.price` is an object: the price denominator
	 * @param {number|string} [opts.offerId ] - If `0`, will create a new offer (default). Otherwise, edits an exisiting offer.
	 * @param {string} [opts.source] - The source account (defaults to transaction source).
	 * @throws {Error} Throws `Error` when the best rational approximation of `price` cannot be found.
	 * @returns {xdr.ManageSellOfferOp} Manage Sell Offer operation
	 */
	function manageSellOffer(opts) {
	  var attributes = {};
	  attributes.selling = opts.selling.toXDRObject();
	  attributes.buying = opts.buying.toXDRObject();
	  if (!this.isValidAmount(opts.amount, true)) {
	    throw new TypeError(this.constructAmountRequirementsError('amount'));
	  }
	  attributes.amount = this._toXDRAmount(opts.amount);
	  if ((0, _isUndefined2.default)(opts.price)) {
	    throw new TypeError('price argument is required');
	  }
	  attributes.price = this._toXDRPrice(opts.price);

	  if (!(0, _isUndefined2.default)(opts.offerId)) {
	    opts.offerId = opts.offerId.toString();
	  } else {
	    opts.offerId = '0';
	  }

	  attributes.offerId = _jsXdr.Hyper.fromString(opts.offerId);
	  var manageSellOfferOp = new _stellarXdr_generated2.default.ManageSellOfferOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.manageSellOffer(manageSellOfferOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPassiveSellOffer = createPassiveSellOffer;

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns a XDR CreatePasiveSellOfferOp. A "create passive offer" operation creates an
	 * offer that won't consume a counter offer that exactly matches this offer. This is
	 * useful for offers just used as 1:1 exchanges for path payments. Use manage offer
	 * to manage this offer after using this operation to create it.
	 * @function
	 * @alias Operation.createPassiveSellOffer
	 * @param {object} opts Options object
	 * @param {Asset} opts.selling - What you're selling.
	 * @param {Asset} opts.buying - What you're buying.
	 * @param {string} opts.amount - The total amount you're selling. If 0, deletes the offer.
	 * @param {number|string|BigNumber|Object} opts.price - Price of 1 unit of `selling` in terms of `buying`.
	 * @param {number} opts.price.n - If `opts.price` is an object: the price numerator
	 * @param {number} opts.price.d - If `opts.price` is an object: the price denominator
	 * @param {string} [opts.source] - The source account (defaults to transaction source).
	 * @throws {Error} Throws `Error` when the best rational approximation of `price` cannot be found.
	 * @returns {xdr.CreatePassiveSellOfferOp} Create Passive Sell Offer operation
	 */
	function createPassiveSellOffer(opts) {
	  var attributes = {};
	  attributes.selling = opts.selling.toXDRObject();
	  attributes.buying = opts.buying.toXDRObject();
	  if (!this.isValidAmount(opts.amount)) {
	    throw new TypeError(this.constructAmountRequirementsError('amount'));
	  }
	  attributes.amount = this._toXDRAmount(opts.amount);
	  if ((0, _isUndefined2.default)(opts.price)) {
	    throw new TypeError('price argument is required');
	  }
	  attributes.price = this._toXDRPrice(opts.price);
	  var createPassiveSellOfferOp = new _stellarXdr_generated2.default.CreatePassiveSellOfferOp(attributes);

	  var opAttributes = {};
	  opAttributes.body = _stellarXdr_generated2.default.OperationBody.createPassiveSellOffer(createPassiveSellOfferOp);
	  this.setSourceAccount(opAttributes, opts);

	  return new _stellarXdr_generated2.default.Operation(opAttributes);
	}

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Memo = exports.MemoReturn = exports.MemoHash = exports.MemoText = exports.MemoID = exports.MemoNone = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _clone = __webpack_require__(328);

	var _clone2 = _interopRequireDefault(_clone);

	var _jsXdr = __webpack_require__(65);

	var _bignumber = __webpack_require__(312);

	var _bignumber2 = _interopRequireDefault(_bignumber);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Type of {@link Memo}.
	 */
	var MemoNone = exports.MemoNone = 'none';
	/**
	 * Type of {@link Memo}.
	 */
	var MemoID = exports.MemoID = 'id';
	/**
	 * Type of {@link Memo}.
	 */
	var MemoText = exports.MemoText = 'text';
	/**
	 * Type of {@link Memo}.
	 */
	var MemoHash = exports.MemoHash = 'hash';
	/**
	 * Type of {@link Memo}.
	 */
	var MemoReturn = exports.MemoReturn = 'return';

	/**
	 * `Memo` represents memos attached to transactions.
	 *
	 * @param {string} type - `MemoNone`, `MemoID`, `MemoText`, `MemoHash` or `MemoReturn`
	 * @param {*} value - `string` for `MemoID`, `MemoText`, buffer of hex string for `MemoHash` or `MemoReturn`
	 * @see [Transactions concept](https://www.stellar.org/developers/learn/concepts/transactions.html)
	 * @class Memo
	 */

	var Memo = function () {
	  function Memo(type) {
	    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    _classCallCheck(this, Memo);

	    this._type = type;
	    this._value = value;

	    switch (this._type) {
	      case MemoNone:
	        break;
	      case MemoID:
	        Memo._validateIdValue(value);
	        break;
	      case MemoText:
	        Memo._validateTextValue(value);
	        break;
	      case MemoHash:
	      case MemoReturn:
	        Memo._validateHashValue(value);
	        // We want MemoHash and MemoReturn to have Buffer as a value
	        if ((0, _isString2.default)(value)) {
	          this._value = Buffer.from(value, 'hex');
	        }
	        break;
	      default:
	        throw new Error('Invalid memo type');
	    }
	  }

	  /**
	   * Contains memo type: `MemoNone`, `MemoID`, `MemoText`, `MemoHash` or `MemoReturn`
	   */


	  _createClass(Memo, [{
	    key: 'toXDRObject',


	    /**
	     * Returns XDR memo object.
	     * @returns {xdr.Memo}
	     */
	    value: function toXDRObject() {
	      switch (this._type) {
	        case MemoNone:
	          return _stellarXdr_generated2.default.Memo.memoNone();
	        case MemoID:
	          return _stellarXdr_generated2.default.Memo.memoId(_jsXdr.UnsignedHyper.fromString(this._value));
	        case MemoText:
	          return _stellarXdr_generated2.default.Memo.memoText(this._value);
	        case MemoHash:
	          return _stellarXdr_generated2.default.Memo.memoHash(this._value);
	        case MemoReturn:
	          return _stellarXdr_generated2.default.Memo.memoReturn(this._value);
	        default:
	          return null;
	      }
	    }

	    /**
	     * Returns {@link Memo} from XDR memo object.
	     * @param {xdr.Memo} object XDR memo object
	     * @returns {Memo}
	     */

	  }, {
	    key: 'type',
	    get: function get() {
	      return (0, _clone2.default)(this._type);
	    },
	    set: function set(type) {
	      throw new Error('Memo is immutable');
	    }

	    /**
	     * Contains memo value:
	     * * `null` for `MemoNone`,
	     * * `string` for `MemoID`,
	     * * `Buffer` for `MemoText` after decoding using `fromXDRObject`, original value otherwise,
	     * * `Buffer` for `MemoHash`, `MemoReturn`.
	     */

	  }, {
	    key: 'value',
	    get: function get() {
	      switch (this._type) {
	        case MemoNone:
	          return null;
	        case MemoID:
	        case MemoText:
	          return (0, _clone2.default)(this._value);
	        case MemoHash:
	        case MemoReturn:
	          return Buffer.from(this._value);
	        default:
	          throw new Error('Invalid memo type');
	      }
	    },
	    set: function set(value) {
	      throw new Error('Memo is immutable');
	    }
	  }], [{
	    key: '_validateIdValue',
	    value: function _validateIdValue(value) {
	      var error = new Error('Expects a int64 as a string. Got ' + value);

	      if (!(0, _isString2.default)(value)) {
	        throw error;
	      }

	      var number = void 0;
	      try {
	        number = new _bignumber2.default(value);
	      } catch (e) {
	        throw error;
	      }

	      // Infinity
	      if (!number.isFinite()) {
	        throw error;
	      }

	      // NaN
	      if (number.isNaN()) {
	        throw error;
	      }
	    }
	  }, {
	    key: '_validateTextValue',
	    value: function _validateTextValue(value) {
	      if (!_stellarXdr_generated2.default.Memo.armTypeForArm('text').isValid(value)) {
	        throw new Error('Expects string, array or buffer, max 28 bytes');
	      }
	    }
	  }, {
	    key: '_validateHashValue',
	    value: function _validateHashValue(value) {
	      var error = new Error('Expects a 32 byte hash value or hex encoded string. Got ' + value);

	      if (value === null || (0, _isUndefined2.default)(value)) {
	        throw error;
	      }

	      var valueBuffer = void 0;
	      if ((0, _isString2.default)(value)) {
	        if (!/^[0-9A-Fa-f]{64}$/g.test(value)) {
	          throw error;
	        }
	        valueBuffer = Buffer.from(value, 'hex');
	      } else if (Buffer.isBuffer(value)) {
	        valueBuffer = Buffer.from(value);
	      } else {
	        throw error;
	      }

	      if (!valueBuffer.length || valueBuffer.length !== 32) {
	        throw error;
	      }
	    }

	    /**
	     * Returns an empty memo (`MemoNone`).
	     * @returns {Memo}
	     */

	  }, {
	    key: 'none',
	    value: function none() {
	      return new Memo(MemoNone);
	    }

	    /**
	     * Creates and returns a `MemoText` memo.
	     * @param {string} text - memo text
	     * @returns {Memo}
	     */

	  }, {
	    key: 'text',
	    value: function text(_text) {
	      return new Memo(MemoText, _text);
	    }

	    /**
	     * Creates and returns a `MemoID` memo.
	     * @param {string} id - 64-bit number represented as a string
	     * @returns {Memo}
	     */

	  }, {
	    key: 'id',
	    value: function id(_id) {
	      return new Memo(MemoID, _id);
	    }

	    /**
	     * Creates and returns a `MemoHash` memo.
	     * @param {array|string} hash - 32 byte hash or hex encoded string
	     * @returns {Memo}
	     */

	  }, {
	    key: 'hash',
	    value: function hash(_hash) {
	      return new Memo(MemoHash, _hash);
	    }

	    /**
	     * Creates and returns a `MemoReturn` memo.
	     * @param {array|string} hash - 32 byte hash or hex encoded string
	     * @returns {Memo}
	     */

	  }, {
	    key: 'return',
	    value: function _return(hash) {
	      return new Memo(MemoReturn, hash);
	    }
	  }, {
	    key: 'fromXDRObject',
	    value: function fromXDRObject(object) {
	      switch (object.arm()) {
	        case 'id':
	          return Memo.id(object.value().toString());
	        case 'text':
	          return Memo.text(object.value());
	        case 'hash':
	          return Memo.hash(object.value());
	        case 'retHash':
	          return Memo.return(object.value());
	        default:
	          break;
	      }

	      if (typeof object.value() === 'undefined') {
	        return Memo.none();
	      }

	      throw new Error('Unknown type');
	    }
	  }]);

	  return Memo;
	}();

	exports.Memo = Memo;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TransactionBuilder = exports.TimeoutInfinite = exports.BASE_FEE = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.isValidDate = isValidDate;

	var _jsXdr = __webpack_require__(65);

	var _bignumber = __webpack_require__(312);

	var _bignumber2 = _interopRequireDefault(_bignumber);

	var _clone = __webpack_require__(328);

	var _clone2 = _interopRequireDefault(_clone);

	var _isUndefined = __webpack_require__(24);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _stellarXdr_generated = __webpack_require__(64);

	var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

	var _keypair = __webpack_require__(21);

	var _transaction = __webpack_require__(310);

	var _memo = __webpack_require__(372);

	var _network = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Minimum base fee for transactions. If this fee is below the network
	 * minimum, the transaction will fail. The more operations in the
	 * transaction, the greater the required fee. Use {@link
	 * Server#fetchBaseFee} to get an accurate value of minimum transaction
	 * fee on the network.
	 *
	 * @constant
	 * @see [Fees](https://www.stellar.org/developers/guides/concepts/fees.html)
	 */
	var BASE_FEE = exports.BASE_FEE = 100; // Stroops

	/**
	 * @constant
	 * @see {@link TransactionBuilder#setTimeout}
	 * @see [Timeout](https://www.stellar.org/developers/horizon/reference/endpoints/transactions-create.html#timeout)
	 */
	var TimeoutInfinite = exports.TimeoutInfinite = 0;

	/**
	 * <p>Transaction builder helps constructs a new `{@link Transaction}` using the given {@link Account}
	 * as the transaction's "source account". The transaction will use the current sequence
	 * number of the given account as its sequence number and increment the given account's
	 * sequence number by one. The given source account must include a private key for signing
	 * the transaction or an error will be thrown.</p>
	 *
	 * <p>Operations can be added to the transaction via their corresponding builder methods, and
	 * each returns the TransactionBuilder object so they can be chained together. After adding
	 * the desired operations, call the `build()` method on the `TransactionBuilder` to return a fully
	 * constructed `{@link Transaction}` that can be signed. The returned transaction will contain the
	 * sequence number of the source account and include the signature from the source account.</p>
	 *
	 * <p><strong>Be careful about unsubmitted transactions!</strong> When you build a transaction, stellar-sdk
	 * automatically increments the source account's sequence number. If you end up
	 * not submitting this transaction and submitting another one instead, it'll fail due to
	 * the sequence number being wrong. So if you decide not to use a built transaction,
	 * make sure to update the source account's sequence number
	 * with [Server.loadAccount](https://stellar.github.io/js-stellar-sdk/Server.html#loadAccount) before creating another transaction.</p>
	 *
	 * <p>The following code example creates a new transaction with {@link Operation.createAccount} and
	 * {@link Operation.payment} operations.
	 * The Transaction's source account first funds `destinationA`, then sends
	 * a payment to `destinationB`. The built transaction is then signed by `sourceKeypair`.</p>
	 *
	 * ```
	 * var transaction = new TransactionBuilder(source, { fee, networkPassphrase: Networks.TESTNET })
	 * .addOperation(Operation.createAccount({
	 *     destination: destinationA,
	 *     startingBalance: "20"
	 * })) // <- funds and creates destinationA
	 * .addOperation(Operation.payment({
	 *     destination: destinationB,
	 *     amount: "100",
	 *     asset: Asset.native()
	 * })) // <- sends 100 XLM to destinationB
	 * .setTimeout(30)
	 * .build();
	 *
	 * transaction.sign(sourceKeypair);
	 * ```
	 * @constructor
	 * @param {Account} sourceAccount - The source account for this transaction.
	 * @param {object} opts Options object
	 * @param {number} opts.fee - The max fee willing to pay per operation in this transaction (**in stroops**). Required.
	 * @param {object} [opts.timebounds] - The timebounds for the validity of this transaction.
	 * @param {number|string|Date} [opts.timebounds.minTime] - 64 bit unix timestamp or Date object
	 * @param {number|string|Date} [opts.timebounds.maxTime] - 64 bit unix timestamp or Date object
	 * @param {Memo} [opts.memo] - The memo for the transaction
	 * @param {string} [opts.networkPassphrase] passphrase of the target stellar network (e.g. "Public Global Stellar Network ; September 2015").
	 */

	var TransactionBuilder = exports.TransactionBuilder = function () {
	  function TransactionBuilder(sourceAccount) {
	    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, TransactionBuilder);

	    if (!sourceAccount) {
	      throw new Error('must specify source account for the transaction');
	    }

	    if ((0, _isUndefined2.default)(opts.fee)) {
	      throw new Error('must specify fee for the transaction (in stroops)');
	    }

	    this.source = sourceAccount;
	    this.operations = [];

	    this.baseFee = (0, _isUndefined2.default)(opts.fee) ? BASE_FEE : opts.fee;
	    this.timebounds = (0, _clone2.default)(opts.timebounds) || null;
	    this.memo = opts.memo || _memo.Memo.none();
	    this.timeoutSet = false;
	    this.networkPassphrase = opts.networkPassphrase || null;
	  }

	  /**
	   * Adds an operation to the transaction.
	   * @param {xdr.Operation} operation The xdr operation object, use {@link Operation} static methods.
	   * @returns {TransactionBuilder}
	   */


	  _createClass(TransactionBuilder, [{
	    key: 'addOperation',
	    value: function addOperation(operation) {
	      this.operations.push(operation);
	      return this;
	    }

	    /**
	     * Adds a memo to the transaction.
	     * @param {Memo} memo {@link Memo} object
	     * @returns {TransactionBuilder}
	     */

	  }, {
	    key: 'addMemo',
	    value: function addMemo(memo) {
	      this.memo = memo;
	      return this;
	    }

	    /**
	     * Because of the distributed nature of the Stellar network it is possible that the status of your transaction
	     * will be determined after a long time if the network is highly congested.
	     * If you want to be sure to receive the status of the transaction within a given period you should set the
	     * {@link TimeBounds} with <code>maxTime</code> on the transaction (this is what <code>setTimeout</code> does
	     * internally; if there's <code>minTime</code> set but no <code>maxTime</code> it will be added).
	     * Call to <code>TransactionBuilder.setTimeout</code> is required if Transaction does not have <code>max_time</code> set.
	     * If you don't want to set timeout, use <code>{@link TimeoutInfinite}</code>. In general you should set
	     * <code>{@link TimeoutInfinite}</code> only in smart contracts.
	     *
	     * Please note that Horizon may still return <code>504 Gateway Timeout</code> error, even for short timeouts.
	     * In such case you need to resubmit the same transaction again without making any changes to receive a status.
	     * This method is using the machine system time (UTC), make sure it is set correctly.
	     * @param {number} timeout Number of seconds the transaction is good. Can't be negative.
	     * If the value is `0`, the transaction is good indefinitely.
	     * @return {TransactionBuilder}
	     * @see TimeoutInfinite
	     */

	  }, {
	    key: 'setTimeout',
	    value: function setTimeout(timeout) {
	      if (this.timebounds != null && this.timebounds.maxTime > 0) {
	        throw new Error('TimeBounds.max_time has been already set - setting timeout would overwrite it.');
	      }

	      if (timeout < 0) {
	        throw new Error('timeout cannot be negative');
	      }

	      this.timeoutSet = true;
	      if (timeout > 0) {
	        var timeoutTimestamp = Math.floor(Date.now() / 1000) + timeout;
	        if (this.timebounds === null) {
	          this.timebounds = { minTime: 0, maxTime: timeoutTimestamp };
	        } else {
	          this.timebounds = {
	            minTime: this.timebounds.minTime,
	            maxTime: timeoutTimestamp
	          };
	        }
	      }

	      return this;
	    }

	    /**
	     * Set network nassphrase for the Transaction that will be built.
	     *
	     * @param {string} [networkPassphrase] passphrase of the target stellar network (e.g. "Public Global Stellar Network ; September 2015").
	     * @returns {TransactionBuilder}
	     */

	  }, {
	    key: 'setNetworkPassphrase',
	    value: function setNetworkPassphrase(networkPassphrase) {
	      this.networkPassphrase = networkPassphrase;
	      return this;
	    }

	    /**
	     * This will build the transaction.
	     * It will also increment the source account's sequence number by 1.
	     * @returns {Transaction} This method will return the built {@link Transaction}.
	     */

	  }, {
	    key: 'build',
	    value: function build() {
	      // Ensure setTimeout called or maxTime is set
	      if ((this.timebounds === null || this.timebounds !== null && this.timebounds.maxTime === 0) && !this.timeoutSet) {
	        throw new Error('TimeBounds has to be set or you must call setTimeout(TimeoutInfinite).');
	      }

	      var sequenceNumber = new _bignumber2.default(this.source.sequenceNumber()).add(1);

	      var attrs = {
	        sourceAccount: _keypair.Keypair.fromPublicKey(this.source.accountId()).xdrAccountId(),
	        fee: this.baseFee * this.operations.length,
	        seqNum: _stellarXdr_generated2.default.SequenceNumber.fromString(sequenceNumber.toString()),
	        memo: this.memo ? this.memo.toXDRObject() : null,
	        ext: new _stellarXdr_generated2.default.TransactionExt(0)
	      };

	      if (this.timebounds) {
	        if (isValidDate(this.timebounds.minTime)) {
	          this.timebounds.minTime = this.timebounds.minTime.getTime() / 1000;
	        }
	        if (isValidDate(this.timebounds.maxTime)) {
	          this.timebounds.maxTime = this.timebounds.maxTime.getTime() / 1000;
	        }

	        this.timebounds.minTime = _jsXdr.UnsignedHyper.fromString(this.timebounds.minTime.toString());
	        this.timebounds.maxTime = _jsXdr.UnsignedHyper.fromString(this.timebounds.maxTime.toString());

	        attrs.timeBounds = new _stellarXdr_generated2.default.TimeBounds(this.timebounds);
	      }

	      var xtx = new _stellarXdr_generated2.default.Transaction(attrs);
	      xtx.operations(this.operations);

	      var xenv = new _stellarXdr_generated2.default.TransactionEnvelope({ tx: xtx });
	      var tx = new _transaction.Transaction(xenv, this.networkPassphrase);

	      this.source.incrementSequenceNumber();

	      return tx;
	    }
	  }]);

	  return TransactionBuilder;
	}();

	/**
	 * Checks whether a provided object is a valid Date.
	 * @argument {Date} d date object
	 * @returns {boolean}
	 */


	function isValidDate(d) {
	  // isnan is okay here because it correctly checks for invalid date objects
	  // eslint-disable-next-line no-restricted-globals
	  return d instanceof Date && !isNaN(d);
	}

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Account = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _bignumber = __webpack_require__(312);

	var _bignumber2 = _interopRequireDefault(_bignumber);

	var _isString = __webpack_require__(55);

	var _isString2 = _interopRequireDefault(_isString);

	var _strkey = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Create a new Account object.
	 *
	 * `Account` represents a single account in Stellar network and its sequence number.
	 * Account tracks the sequence number as it is used by {@link TransactionBuilder}.
	 * See [Accounts](https://stellar.org/developers/learn/concepts/accounts.html) for more information about how
	 * accounts work in Stellar.
	 * @constructor
	 * @param {string} accountId ID of the account (ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`)
	 * @param {string} sequence current sequence number of the account
	 */
	var Account = exports.Account = function () {
	  function Account(accountId, sequence) {
	    _classCallCheck(this, Account);

	    if (!_strkey.StrKey.isValidEd25519PublicKey(accountId)) {
	      throw new Error('accountId is invalid');
	    }
	    if (!(0, _isString2.default)(sequence)) {
	      throw new Error('sequence must be of type string');
	    }
	    this._accountId = accountId;
	    this.sequence = new _bignumber2.default(sequence);
	  }

	  /**
	   * Returns Stellar account ID, ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`
	   * @returns {string}
	   */


	  _createClass(Account, [{
	    key: 'accountId',
	    value: function accountId() {
	      return this._accountId;
	    }

	    /**
	     * @returns {string}
	     */

	  }, {
	    key: 'sequenceNumber',
	    value: function sequenceNumber() {
	      return this.sequence.toString();
	    }

	    /**
	     * Increments sequence number in this object by one.
	     * @returns {void}
	     */

	  }, {
	    key: 'incrementSequenceNumber',
	    value: function incrementSequenceNumber() {
	      this.sequence = this.sequence.add(1);
	    }
	  }]);

	  return Account;
	}();

/***/ })
/******/ ]);