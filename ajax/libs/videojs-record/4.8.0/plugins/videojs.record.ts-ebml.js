/*!
 * ts-ebml plugin for videojs-record
 * @version 4.8.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2024 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("video.js"));
	else if(typeof define === 'function' && define.amd)
		define("VideojsRecord", ["video.js"], factory);
	else if(typeof exports === 'object')
		exports["VideojsRecord"] = factory(require("video.js"));
	else
		root["VideojsRecord"] = root["VideojsRecord"] || {}, root["VideojsRecord"]["ts-ebml"] = factory(root["videojs"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_video_js__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/plugins/ts-ebml-plugin.js":
/*!******************************************!*\
  !*** ./src/js/plugins/ts-ebml-plugin.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
var ebml = _interopRequireWildcard(__webpack_require__(/*! ts-ebml */ "./node_modules/ts-ebml/lib/index.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ConvertEngine = _video.default.getComponent('ConvertEngine');
window.Buffer = _buffer.Buffer;
var TsEBMLEngine = function (_ConvertEngine) {
  function TsEBMLEngine() {
    (0, _classCallCheck2.default)(this, TsEBMLEngine);
    return _callSuper(this, TsEBMLEngine, arguments);
  }
  (0, _inherits2.default)(TsEBMLEngine, _ConvertEngine);
  return (0, _createClass2.default)(TsEBMLEngine, [{
    key: "convert",
    value: function convert(data) {
      var _this = this;
      var decoder = new ebml.Decoder();
      var reader = new ebml.Reader();
      reader.logging = false;
      reader.drop_default_duration = false;
      var timestamp = new Date();
      timestamp.setTime(data.lastModified);
      this.player().trigger('startConvert');
      this.loadBlob(data).then(function (buffer) {
        var elms = decoder.decode(buffer);
        var validEmlType = ['m', 'u', 'i', 'f', 's', '8', 'b', 'd'];
        elms = elms.filter(function (elm) {
          return validEmlType.includes(elm.type);
        });
        elms.forEach(function (elm) {
          reader.read(elm);
        });
        reader.stop();
        var refinedMetadataBuf = ebml.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
        var body = buffer.slice(reader.metadataSize);
        var result = new Blob([refinedMetadataBuf, body], {
          type: data.type
        });
        _this.addFileInfo(result, timestamp);
        _this.player().convertedData = result;
        _this.player().trigger('finishConvert');
      });
    }
  }]);
}(ConvertEngine);
_video.default.TsEBMLEngine = TsEBMLEngine;
var _default = exports["default"] = TsEBMLEngine;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


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

  var i
  for (i = 0; i < len; i += 4) {
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
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
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

/***/ "./node_modules/bigint-buffer/dist/browser.js":
/*!****************************************************!*\
  !*** ./node_modules/bigint-buffer/dist/browser.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));
let converter;
/**
 * Convert a little-endian buffer into a BigInt.
 * @param buf The little-endian buffer to convert
 * @returns A BigInt with the little-endian representation of buf.
 */
function toBigIntLE(buf) {
    {
        const reversed = Buffer.from(buf);
        reversed.reverse();
        const hex = reversed.toString('hex');
        if (hex.length === 0) {
            return BigInt(0);
        }
        return BigInt(`0x${hex}`);
    }
    return converter.toBigInt(buf, false);
}
exports.toBigIntLE = toBigIntLE;
/**
 * Convert a big-endian buffer into a BigInt
 * @param buf The big-endian buffer to convert.
 * @returns A BigInt with the big-endian representation of buf.
 */
function toBigIntBE(buf) {
    {
        const hex = buf.toString('hex');
        if (hex.length === 0) {
            return BigInt(0);
        }
        return BigInt(`0x${hex}`);
    }
    return converter.toBigInt(buf, true);
}
exports.toBigIntBE = toBigIntBE;
/**
 * Convert a BigInt to a little-endian buffer.
 * @param num   The BigInt to convert.
 * @param width The number of bytes that the resulting buffer should be.
 * @returns A little-endian buffer representation of num.
 */
function toBufferLE(num, width) {
    {
        const hex = num.toString(16);
        const buffer = Buffer.from(hex.padStart(width * 2, '0').slice(0, width * 2), 'hex');
        buffer.reverse();
        return buffer;
    }
    // Allocation is done here, since it is slower using napi in C
    return converter.fromBigInt(num, Buffer.allocUnsafe(width), false);
}
exports.toBufferLE = toBufferLE;
/**
 * Convert a BigInt to a big-endian buffer.
 * @param num   The BigInt to convert.
 * @param width The number of bytes that the resulting buffer should be.
 * @returns A big-endian buffer representation of num.
 */
function toBufferBE(num, width) {
    {
        const hex = num.toString(16);
        return Buffer.from(hex.padStart(width * 2, '0').slice(0, width * 2), 'hex');
    }
    return converter.fromBigInt(num, Buffer.allocUnsafe(width), true);
}
exports.toBufferBE = toBufferBE;


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
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
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
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
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
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
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
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
    // be interpreted as a start offset.
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

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
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
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
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

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
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
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

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

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
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
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
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
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
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

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
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
  byteOffset = +byteOffset // Coerce to Number.
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
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

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

  let i
  if (dir) {
    let foundIndex = -1
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
      let found = true
      for (let j = 0; j < valLength; j++) {
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
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
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

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

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
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

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
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
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

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
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

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
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
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
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

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

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

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
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

Buffer.prototype.writeUint32BE =
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

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
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
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
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

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

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

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
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
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
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

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
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

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

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

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
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
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
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
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/ebml-block/index.js":
/*!******************************************!*\
  !*** ./node_modules/ebml-block/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var BufferReader = __webpack_require__(/*! ./lib/buffer-reader */ "./node_modules/ebml-block/lib/buffer-reader.js")

var XIPH_LACING = 1
var EBML_LACING = 3
var FIXED_SIZE_LACING = 2

module.exports = function (buffer) {
  var block = {}
  var reader = new BufferReader(buffer)

  block.trackNumber = reader.nextUIntV()
  block.timecode = reader.nextInt16BE()

  var flags = reader.nextUInt8()

  block.invisible = !!(flags & 0x8)

  // only valid for SimpleBlock
  block.keyframe = !!(flags & 0x80)
  block.discardable = !!(flags & 0x1)

  var lacing = (flags & 0x6) >> 1

  block.frames = readLacedData(reader, lacing)

  return block
}

function readLacedData (reader, lacing) {
  if (!lacing) return [reader.nextBuffer()]

  var i, frameSize
  var frames = []
  var framesNum = reader.nextUInt8() + 1 // number of frames

  if (lacing === FIXED_SIZE_LACING) {
    // remaining data should be divisible by the number of frames
    if (reader.length % framesNum !== 0) throw new Error('Fixed-Size Lacing Error')

    frameSize = reader.length / framesNum
    for (i = 0; i < framesNum; i++) {
      frames.push(reader.nextBuffer(frameSize))
    }
    return frames
  }

  var frameSizes = []

  if (lacing === XIPH_LACING) {
    for (i = 0; i < framesNum - 1; i++) {
      var val
      frameSize = 0
      do {
        val = reader.nextUInt8()
        frameSize += val
      } while (val === 0xff)
      frameSizes.push(frameSize)
    }
  } else if (lacing === EBML_LACING) {
    // first frame
    frameSize = reader.nextUIntV()
    frameSizes.push(frameSize)

    // middle frames
    for (i = 1; i < framesNum - 1; i++) {
      frameSize += reader.nextIntV()
      frameSizes.push(frameSize)
    }
  }

  for (i = 0; i < framesNum - 1; i++) {
    frames.push(reader.nextBuffer(frameSizes[i]))
  }

  // last frame (remaining buffer)
  frames.push(reader.nextBuffer())

  return frames
}


/***/ }),

/***/ "./node_modules/ebml-block/lib/buffer-reader.js":
/*!******************************************************!*\
  !*** ./node_modules/ebml-block/lib/buffer-reader.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var vint = __webpack_require__(/*! ./vint */ "./node_modules/ebml-block/lib/vint.js")

function BufferReader (buffer) {
  this.buffer = buffer
  this.offset = 0
}

// a super limited subset of the node buffer API
BufferReader.prototype.nextInt16BE = function () {
  var value = this.buffer.readInt16BE(this.offset)
  this.offset += 2
  return value
}

BufferReader.prototype.nextUInt8 = function () {
  var value = this.buffer.readUInt8(this.offset)
  this.offset += 1
  return value
}

// EBML variable sized integers
BufferReader.prototype.nextUIntV = function () {
  var v = vint(this.buffer, this.offset)
  this.offset += v.length
  return v.value
}

BufferReader.prototype.nextIntV = function () {
  var v = vint(this.buffer, this.offset, true)
  this.offset += v.length
  return v.value
}

// buffer slice
BufferReader.prototype.nextBuffer = function (length) {
  var buffer = length
    ? this.buffer.slice(this.offset, this.offset + length)
    : this.buffer.slice(this.offset)
  this.offset += length || this.length
  return buffer
}

// remaining bytes to read
Object.defineProperty(BufferReader.prototype, 'length', {
  get: function () { return this.buffer.length - this.offset }
})

module.exports = BufferReader


/***/ }),

/***/ "./node_modules/ebml-block/lib/vint.js":
/*!*********************************************!*\
  !*** ./node_modules/ebml-block/lib/vint.js ***!
  \*********************************************/
/***/ ((module) => {

// https://github.com/themasch/node-ebml/blob/master/lib/ebml/tools.js
module.exports = function (buffer, start, signed) {
  start = start || 0
  for (var length = 1; length <= 8; length++) {
    if (buffer[start] >= Math.pow(2, 8 - length)) {
      break
    }
  }
  if (length > 8) {
    throw new Error('Unrepresentable length: ' + length + ' ' +
      buffer.toString('hex', start, start + length))
  }
  if (start + length > buffer.length) {
    return null
  }
  var i
  var value = buffer[start] & (1 << (8 - length)) - 1
  for (i = 1; i < length; i++) {
    if (i === 7) {
      if (value >= Math.pow(2, 53 - 8) && buffer[start + 7] > 0) {
        return {
          length: length,
          value: -1
        }
      }
    }
    value *= Math.pow(2, 8)
    value += buffer[start + i]
  }
  if (signed) {
    value -= Math.pow(2, length * 7 - 1) - 1
  }
  return {
    length: length,
    value: value
  }
}


/***/ }),

/***/ "./node_modules/ebml/lib/ebml.esm.js":
/*!*******************************************!*\
  !*** ./node_modules/ebml/lib/ebml.esm.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Decoder: () => (/* binding */ EbmlDecoder),
/* harmony export */   Encoder: () => (/* binding */ EbmlEncoder),
/* harmony export */   schema: () => (/* binding */ schema),
/* harmony export */   tools: () => (/* binding */ Tools)
/* harmony export */ });
var global$1 = (typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

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

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

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
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1.TYPED_ARRAY_SUPPORT
  : true;

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
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
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

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

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
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
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
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
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
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

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
};

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
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
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

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
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
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

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

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
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
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
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read$$1 (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read$$1(arr, i + j) !== read$$1(val, j)) {
          found = false;
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
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
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
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
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

Buffer.prototype.write = function write$$1 (string, offset, length, encoding) {
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
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
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
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

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
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
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

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
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

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
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

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

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
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
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
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var dP$1 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || _descriptors && dP$1(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id$1 = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
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

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

var _stringRepeat = function repeat(count) {
  var str = String(_defined(this));
  var res = '';
  var n = _toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

// https://github.com/tc39/proposal-string-pad-start-end




var _stringPad = function (that, maxLength, fillString, left) {
  var S = String(_defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = _toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

var navigator = _global.navigator;

var _userAgent = navigator && navigator.userAgent || '';

// https://github.com/tc39/proposal-string-pad-start-end




// https://github.com/zloirock/core-js/issues/280
_export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

var toString$1 = {}.toString;

var _cof = function (it) {
  return toString$1.call(it).slice(8, -1);
};

var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$2
};

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

var setPrototypeOf = _setProto.set;
var _inheritIfRequired = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
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

var _library = false;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf$1 = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf$1(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$3
};

var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var space = '[' + _stringWs + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = _fails(function () {
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(_defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$1 = _global.document;
var _html = document$1 && document$1.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var gOPN = _objectGopn.f;
var gOPD$1 = _objectGopd.f;
var dP$2 = _objectDp.f;
var $trim = _stringTrim.trim;
var NUMBER = 'Number';
var $Number = _global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = _toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = _descriptors ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (_has(Base, key = keys[j]) && !_has($Number, key)) {
      dP$2($Number, key, gOPD$1(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  _redefine(_global, NUMBER, $Number);
}

// 21.2.5.3 get RegExp.prototype.flags

var _flags = function () {
  var that = _anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// 21.2.5.3 get RegExp.prototype.flags()
if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _flags
});

var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  _redefine(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = _anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

var _iterators = {};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

// check on default Array iterator

var ITERATOR = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR] === it);
};

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$1 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var ITERATOR$2 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$2]();
  riter['return'] = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$2]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$2] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

// 20.2.2.22 Math.log2(x)


_export(_export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

var Tools =
/*#__PURE__*/
function () {
  function Tools() {
    _classCallCheck(this, Tools);
  }

  _createClass(Tools, null, [{
    key: "readVint",

    /**
     * read variable length integer per
     * https://www.matroska.org/technical/specs/index.html#EBML_ex
     * @param {Buffer} buffer containing input
     * @param {Number} [start=0] position in buffer
     * @returns {{length: Number, value: number}}  value / length object
     */
    value: function readVint(buffer) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var length = 8 - Math.floor(Math.log2(buffer[start]));

      if (length > 8) {
        var number = Tools.readHexString(buffer, start, start + length);
        throw new Error("Unrepresentable length: ".concat(length, " ").concat(number));
      }

      if (start + length > buffer.length) {
        return null;
      }

      var value = buffer[start] & (1 << 8 - length) - 1;

      for (var i = 1; i < length; i += 1) {
        if (i === 7) {
          if (value >= Math.pow(2, 8) && buffer[start + 7] > 0) {
            return {
              length: length,
              value: -1
            };
          }
        }

        value *= Math.pow(2, 8);
        value += buffer[start + i];
      }

      return {
        length: length,
        value: value
      };
    }
    /**
     * write variable length integer
     * @param {Number} value to store into buffer
     * @returns {Buffer} containing the value
     */

  }, {
    key: "writeVint",
    value: function writeVint(value) {
      if (value < 0 || value > Math.pow(2, 53)) {
        throw new Error("Unrepresentable value: ".concat(value));
      }

      var length = 1;

      for (length = 1; length <= 8; length += 1) {
        if (value < Math.pow(2, 7 * length) - 1) {
          break;
        }
      }

      var buffer = Buffer.alloc(length);
      var val = value;

      for (var i = 1; i <= length; i += 1) {
        var b = val & 0xff;
        buffer[length - i] = b;
        val -= b;
        val /= Math.pow(2, 8);
      }

      buffer[0] |= 1 << 8 - length;
      return buffer;
    }
    /**
     * *
     * concatenate two arrays of bytes
     * @param {Buffer} a1  First array
     * @param {Buffer} a2  Second array
     * @returns  {Buffer} concatenated arrays
     */

  }, {
    key: "concatenate",
    value: function concatenate(a1, a2) {
      if (!a1 || a1.byteLength === 0) {
        return a2;
      }

      if (!a2 || a2.byteLength === 0) {
        return a1;
      }

      return Buffer.from(_toConsumableArray(a1).concat(_toConsumableArray(a2)));
    }
    /**
     * get a hex text string from Buff[start,end)
     * @param {Buffer} buff from which to read the string
     * @param {Number} [start=0] starting point (default 0)
     * @param {Number} [end=buff.byteLength] ending point (default the whole buffer)
     * @returns {string} the hex string
     */

  }, {
    key: "readHexString",
    value: function readHexString(buff) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : buff.byteLength;
      return Array.from(buff.slice(start, end)).map(function (q) {
        return Number(q).toString(16);
      }).reduce(function (acc, current) {
        return "".concat(acc).concat(current.padStart(2, '0'));
      }, '');
    }
    /**
     * tries to read out a UTF-8 encoded string
     * @param  {Buffer} buff the buffer to attempt to read from
     * @return {string|null}      the decoded text, or null if unable to
     */

  }, {
    key: "readUtf8",
    value: function readUtf8(buff) {
      try {
        return Buffer.from(buff).toString('utf8');
      } catch (exception) {
        return null;
      }
    }
    /**
     * get an unsigned number from a buffer
     * @param {Buffer} buff from which to read variable-length unsigned number
     * @returns {number|string} result (in hex for lengths > 6)
     */

  }, {
    key: "readUnsigned",
    value: function readUnsigned(buff) {
      var b = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);

      switch (buff.byteLength) {
        case 1:
          return b.getUint8(0);

        case 2:
          return b.getUint16(0);

        case 4:
          return b.getUint32(0);

        default:
          break;
      }

      if (buff.byteLength <= 6) {
        return buff.reduce(function (acc, current) {
          return acc * 256 + current;
        }, 0);
      }

      return Tools.readHexString(buff, 0, buff.byteLength);
    }
    /**
     * get an signed number from a buffer
     * @static
     * @param {Buffer} buff from which to read variable-length signed number
     * @returns {number} result
     */

  }, {
    key: "readSigned",
    value: function readSigned(buff) {
      var b = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);

      switch (buff.byteLength) {
        case 1:
          return b.getInt8(0);

        case 2:
          return b.getInt16(0);

        case 4:
          return b.getInt32(0);

        default:
          return NaN;
      }
    }
    /**
     * get an floating-point number from a buffer
     * @static
     * @param {Buffer} buff from which to read variable-length floating-point number
     * @returns {number} result
     */

  }, {
    key: "readFloat",
    value: function readFloat(buff) {
      var b = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);

      switch (buff.byteLength) {
        case 4:
          return b.getFloat32(0);

        case 8:
          return b.getFloat64(0);

        default:
          return NaN;
      }
    }
    /**
     * Reads the data from a tag
     * @static
     * @param  {TagData} tagObj The tag object to be read
     * @param  {Buffer} data Data to be transformed
     * @return {Tag} result
     */

  }, {
    key: "readDataFromTag",
    value: function readDataFromTag(tagObj, data) {
      var type = tagObj.type,
          name = tagObj.name;
      var track = tagObj.track;
      var discardable = tagObj.discardable || false;
      var keyframe = tagObj.keyframe || false;
      var payload = null;
      var value;

      switch (type) {
        case 'u':
          value = Tools.readUnsigned(data);
          break;

        case 'f':
          value = Tools.readFloat(data);
          break;

        case 'i':
          value = Tools.readSigned(data);
          break;

        case 's':
          value = String.fromCharCode.apply(String, _toConsumableArray(data));
          break;

        case '8':
          value = Tools.readUtf8(data);
          break;

        default:
          break;
      }

      if (name === 'SimpleBlock' || name === 'Block') {
        var p = 0;

        var _Tools$readVint = Tools.readVint(data, p),
            length = _Tools$readVint.length,
            trak = _Tools$readVint.value;

        p += length;
        track = trak;
        value = Tools.readSigned(data.subarray(p, p + 2));
        p += 2;

        if (name === 'SimpleBlock') {
          keyframe = Boolean(data[length + 2] & 0x80);
          discardable = Boolean(data[length + 2] & 0x01);
        }

        p += 1;
        payload = data.subarray(p);
      }

      return _objectSpread({}, tagObj, {
        data: data,
        discardable: discardable,
        keyframe: keyframe,
        payload: payload,
        track: track,
        value: value
      });
    }
  }]);

  return Tools;
}();

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto$1 = Array.prototype;
if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto$1[UNSCOPABLES][key] = true;
};

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var def = _objectDp.f;

var TAG$1 = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR$3 = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
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
  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR$3] != 'function') _hide(IteratorPrototype, ITERATOR$3, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR$3])) {
    _hide(proto, ITERATOR$3, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var ITERATOR$4 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME$1 = collections[i];
  var explicit = DOMIterables[NAME$1];
  var Collection = _global[NAME$1];
  var proto$1 = Collection && Collection.prototype;
  var key$1;
  if (proto$1) {
    if (!proto$1[ITERATOR$4]) _hide(proto$1, ITERATOR$4, ArrayValues);
    if (!proto$1[TO_STRING_TAG]) _hide(proto$1, TO_STRING_TAG, NAME$1);
    _iterators[NAME$1] = ArrayValues;
    if (explicit) for (key$1 in es6_array_iterator) if (!proto$1[key$1]) _redefine(proto$1, key$1, es6_array_iterator[key$1], true);
  }
}

var _redefineAll = function (target, src, safe) {
  for (var key in src) _redefine(target, key, src[key], safe);
  return target;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

var SPECIES = _wks('species');

var _setSpecies = function (KEY) {
  var C = _global[KEY];
  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
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
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
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
  if (!_has(it, META)) {
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
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var _validateCollection = function (it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$3 = _objectDp.f;









var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

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

var _collectionStrong = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
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
        var that = _validateCollection(this, NAME);
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
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
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
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$3(C.prototype, 'size', {
      get: function () {
        return _validateCollection(this, NAME)[SIZE];
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
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
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
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    _redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        _anInstance(target, C, NAME);
        var that = _inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

var schema = new Map([[0x80, {
  name: 'ChapterDisplay',
  level: 4,
  type: 'm',
  multiple: true,
  minver: 1,
  webm: true,
  description: 'Contains all possible strings to use for the chapter display.'
}], [0x83, {
  name: 'TrackType',
  level: 3,
  type: 'u',
  multiple: false,
  mandatory: true,
  minver: 1,
  range: '1-254',
  description: 'A set of track types coded on 8 bits (1: video, 2: audio, 3: complex, 0x10: logo, 0x11: subtitle, 0x12: buttons, 0x20: control).',
  webm: false
}], [0x85, {
  name: 'ChapString',
  cppname: 'ChapterString',
  level: 5,
  type: '8',
  multiple: false,
  mandatory: true,
  minver: 1,
  webm: true,
  description: 'Contains the string to use as the chapter atom.'
}], [0x86, {
  name: 'CodecID',
  level: 3,
  type: 's',
  mandatory: true,
  minver: 1,
  description: 'An ID corresponding to the codec, see the codec page for more info.',
  multiple: false,
  webm: false
}], [0x88, {
  name: 'FlagDefault',
  cppname: 'TrackFlagDefault',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  default: 1,
  range: '0-1',
  description: 'Set if that track (audio, video or subs) SHOULD be active if no language found matches the user preference. (1 bit)',
  multiple: false,
  webm: false
}], [0x89, {
  name: 'ChapterTrackNumber',
  level: 5,
  type: 'u',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: false,
  range: 'not 0',
  description: 'UID of the Track to apply this chapter too. In the absense of a control track, choosing this chapter will select the listed Tracks and deselect unlisted tracks. Absense of this element indicates that the Chapter should be applied to any currently used Tracks.'
}], [0x91, {
  name: 'ChapterTimeStart',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: true,
  description: 'Timestamp of the start of Chapter (not scaled).',
  multiple: false
}], [0x92, {
  name: 'ChapterTimeEnd',
  level: 4,
  type: 'u',
  minver: 1,
  webm: false,
  description: 'Timestamp of the end of Chapter (timestamp excluded, not scaled).',
  multiple: false
}], [0x96, {
  name: 'CueRefTime',
  level: 5,
  type: 'u',
  mandatory: true,
  minver: 2,
  webm: false,
  description: 'Timestamp of the referenced Block.',
  multiple: false
}], [0x97, {
  name: 'CueRefCluster',
  level: 5,
  type: 'u',
  mandatory: true,
  webm: false,
  description: 'The Position of the Cluster containing the referenced Block.',
  minver: 0,
  multiple: false
}], [0x98, {
  name: 'ChapterFlagHidden',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  range: '0-1',
  description: 'If a chapter is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)',
  multiple: false
}], [0x4254, {
  name: 'ContentCompAlgo',
  level: 6,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  br: ['', '', '', ''],
  del: ['1 - bzlib,', '2 - lzo1x'],
  description: 'The compression algorithm used. Algorithms that have been specified so far are: 0 - zlib,   3 - Header Stripping',
  multiple: false
}], [0x4255, {
  name: 'ContentCompSettings',
  level: 6,
  type: 'b',
  minver: 1,
  webm: false,
  description: 'Settings that might be needed by the decompressor. For Header Stripping (ContentCompAlgo=3), the bytes that were removed from the beggining of each frames of the track.',
  multiple: false
}], [0x4282, {
  name: 'DocType',
  level: 1,
  type: 's',
  mandatory: true,
  default: 'matroska',
  minver: 1,
  description: "A string that describes the type of document that follows this EBML header. 'matroska' in our case or 'webm' for webm files.",
  multiple: false,
  webm: false
}], [0x4285, {
  name: 'DocTypeReadVersion',
  level: 1,
  type: 'u',
  mandatory: true,
  default: 1,
  minver: 1,
  description: 'The minimum DocType version an interpreter has to support to read this file.',
  multiple: false,
  webm: false
}], [0x4286, {
  name: 'EBMLVersion',
  level: 1,
  type: 'u',
  mandatory: true,
  default: 1,
  minver: 1,
  description: 'The version of EBML parser used to create the file.',
  multiple: false,
  webm: false
}], [0x4287, {
  name: 'DocTypeVersion',
  level: 1,
  type: 'u',
  mandatory: true,
  default: 1,
  minver: 1,
  description: 'The version of DocType interpreter used to create the file.',
  multiple: false,
  webm: false
}], [0x4444, {
  name: 'SegmentFamily',
  level: 2,
  type: 'b',
  multiple: true,
  minver: 1,
  webm: false,
  bytesize: 16,
  description: 'A randomly generated unique ID that all segments related to each other must use (128 bits).'
}], [0x4461, {
  name: 'DateUTC',
  level: 2,
  type: 'd',
  minver: 1,
  description: 'Date of the origin of timestamp (value 0), i.e. production date.',
  multiple: false,
  webm: false
}], [0x4484, {
  name: 'TagDefault',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 1,
  range: '0-1',
  description: 'Indication to know if this is the default/original language to use for the given tag. (1 bit)',
  multiple: false
}], [0x4485, {
  name: 'TagBinary',
  level: 4,
  type: 'b',
  minver: 1,
  webm: false,
  description: 'The values of the Tag if it is binary. Note that this cannot be used in the same SimpleTag as TagString.',
  multiple: false
}], [0x4487, {
  name: 'TagString',
  level: 4,
  type: '8',
  minver: 1,
  webm: false,
  description: 'The value of the Tag.',
  multiple: false
}], [0x4489, {
  name: 'Duration',
  level: 2,
  type: 'f',
  minver: 1,
  range: '> 0',
  description: 'Duration of the segment (based on TimecodeScale).',
  multiple: false,
  webm: false
}], [0x4598, {
  name: 'ChapterFlagEnabled',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 1,
  range: '0-1',
  description: 'Specify wether the chapter is enabled. It can be enabled/disabled by a Control Track. When disabled, the movie should skip all the content between the TimeStart and TimeEnd of this chapter (see flag notes). (1 bit)',
  multiple: false
}], [0x4660, {
  name: 'FileMimeType',
  level: 3,
  type: 's',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'MIME type of the file.',
  multiple: false
}], [0x4661, {
  name: 'FileUsedStartTime',
  level: 3,
  type: 'u',
  divx: true,
  description: 'DivX font extension',
  multiple: false
}], [0x4662, {
  name: 'FileUsedEndTime',
  level: 3,
  type: 'u',
  divx: true,
  multiple: false,
  description: 'DivX font extension'
}], [0x4675, {
  name: 'FileReferral',
  level: 3,
  type: 'b',
  webm: false,
  description: 'A binary value that a track/codec can refer to when the attachment is needed.',
  multiple: false
}], [0x5031, {
  name: 'ContentEncodingOrder',
  level: 5,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  multiple: false,
  description: 'Tells when this modification was used during encoding/muxing starting with 0 and counting upwards. The decoder/demuxer has to start with the highest order number it finds and work its way down. This value has to be unique over all ContentEncodingOrder elements in the segment.'
}], [0x5032, {
  name: 'ContentEncodingScope',
  level: 5,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 1,
  range: 'not 0',
  br: ['', '', ''],
  description: "A bit field that describes which elements have been modified in this way. Values (big endian) can be OR'ed. Possible values: 1 - all frame contents, 2 - the track's private data, 4 - the next ContentEncoding (next ContentEncodingOrder. Either the data inside ContentCompression and/or ContentEncryption)",
  multiple: false
}], [0x5033, {
  name: 'ContentEncodingType',
  level: 5,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  br: ['', ''],
  description: 'A value describing what kind of transformation has been done. Possible values: 0 - compression, 1 - encryption',
  multiple: false
}], [0x5034, {
  name: 'ContentCompression',
  level: 5,
  type: 'm',
  minver: 1,
  webm: false,
  description: 'Settings describing the compression used. Must be present if the value of ContentEncodingType is 0 and absent otherwise. Each block must be decompressable even if no previous block is available in order not to prevent seeking.',
  multiple: false
}], [0x5035, {
  name: 'ContentEncryption',
  level: 5,
  type: 'm',
  minver: 1,
  webm: false,
  description: 'Settings describing the encryption used. Must be present if the value of ContentEncodingType is 1 and absent otherwise.',
  multiple: false
}], [0x5378, {
  name: 'CueBlockNumber',
  level: 4,
  type: 'u',
  minver: 1,
  default: 1,
  range: 'not 0',
  description: 'Number of the Block in the specified Cluster.',
  multiple: false
}], [0x5654, {
  name: 'ChapterStringUID',
  level: 4,
  type: '8',
  mandatory: false,
  minver: 3,
  webm: true,
  description: 'A unique string ID to identify the Chapter. Use for WebVTT cue identifier storage.',
  multiple: false
}], [0x5741, {
  name: 'WritingApp',
  level: 2,
  type: '8',
  mandatory: true,
  minver: 1,
  multiple: false,
  description: 'Writing application ("mkvmerge-0.3.3").'
}], [0x5854, {
  name: 'SilentTracks',
  cppname: 'ClusterSilentTracks',
  level: 2,
  type: 'm',
  minver: 1,
  multiple: false,
  webm: false,
  description: 'The list of tracks that are not used in that part of the stream. It is useful when using overlay tracks on seeking. Then you should decide what track to use.'
}], [0x6240, {
  name: 'ContentEncoding',
  level: 4,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Settings for one content encoding like compression or encryption.'
}], [0x6264, {
  name: 'BitDepth',
  cppname: 'AudioBitDepth',
  level: 4,
  type: 'u',
  minver: 1,
  range: 'not 0',
  multiple: false,
  description: 'Bits per sample, mostly used for PCM.'
}], [0x6532, {
  name: 'SignedElement',
  level: 3,
  type: 'b',
  multiple: true,
  webm: false,
  description: 'An element ID whose data will be used to compute the signature.'
}], [0x6624, {
  name: 'TrackTranslate',
  level: 3,
  type: 'm',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'The track identification for the given Chapter Codec.'
}], [0x6911, {
  name: 'ChapProcessCommand',
  cppname: 'ChapterProcessCommand',
  level: 5,
  type: 'm',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Contains all the commands associated to the Atom.'
}], [0x6922, {
  name: 'ChapProcessTime',
  cppname: 'ChapterProcessTime',
  level: 6,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'Defines when the process command should be handled (0: during the whole chapter, 1: before starting playback, 2: after playback of the chapter).'
}], [0x6924, {
  name: 'ChapterTranslate',
  level: 2,
  type: 'm',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'A tuple of corresponding ID used by chapter codecs to represent this segment.'
}], [0x6933, {
  name: 'ChapProcessData',
  cppname: 'ChapterProcessData',
  level: 6,
  type: 'b',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'Contains the command information. The data should be interpreted depending on the ChapProcessCodecID value. For ChapProcessCodecID = 1, the data correspond to the binary DVD cell pre/post commands.'
}], [0x6944, {
  name: 'ChapProcess',
  cppname: 'ChapterProcess',
  level: 4,
  type: 'm',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Contains all the commands associated to the Atom.'
}], [0x6955, {
  name: 'ChapProcessCodecID',
  cppname: 'ChapterProcessCodecID',
  level: 5,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  description: 'Contains the type of the codec used for the processing. A value of 0 means native Matroska processing (to be defined), a value of 1 means the DVD command set is used. More codec IDs can be added later.'
}], [0x7373, {
  name: 'Tag',
  level: 2,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Element containing elements specific to Tracks/Chapters.'
}], [0x7384, {
  name: 'SegmentFilename',
  level: 2,
  type: '8',
  minver: 1,
  webm: false,
  description: 'A filename corresponding to this segment.'
}], [0x7446, {
  name: 'AttachmentLink',
  cppname: 'TrackAttachmentLink',
  level: 3,
  type: 'u',
  minver: 1,
  webm: false,
  range: 'not 0',
  description: 'The UID of an attachment that is used by this codec.'
}], [0x258688, {
  name: 'CodecName',
  level: 3,
  type: '8',
  minver: 1,
  description: 'A human-readable string specifying the codec.'
}], [0x18538067, {
  name: 'Segment',
  level: 0,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  description: 'This element contains all other top-level (level 1) elements. Typically a Matroska file is composed of 1 segment.'
}], [0x447a, {
  name: 'TagLanguage',
  level: 4,
  type: 's',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 'und',
  description: 'Specifies the language of the tag specified, in the Matroska languages form.'
}], [0x45a3, {
  name: 'TagName',
  level: 4,
  type: '8',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'The name of the Tag that is going to be stored.'
}], [0x67c8, {
  name: 'SimpleTag',
  cppname: 'TagSimple',
  level: 3,
  recursive: true,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Contains general information about the target.'
}], [0x63c6, {
  name: 'TagAttachmentUID',
  level: 4,
  type: 'u',
  multiple: true,
  minver: 1,
  webm: false,
  default: 0,
  description: 'A unique ID to identify the Attachment(s) the tags belong to. If the value is 0 at this level, the tags apply to all the attachments in the Segment.'
}], [0x63c4, {
  name: 'TagChapterUID',
  level: 4,
  type: 'u',
  multiple: true,
  minver: 1,
  webm: false,
  default: 0,
  description: 'A unique ID to identify the Chapter(s) the tags belong to. If the value is 0 at this level, the tags apply to all chapters in the Segment.'
}], [0x63c9, {
  name: 'TagEditionUID',
  level: 4,
  type: 'u',
  multiple: true,
  minver: 1,
  webm: false,
  default: 0,
  description: 'A unique ID to identify the EditionEntry(s) the tags belong to. If the value is 0 at this level, the tags apply to all editions in the Segment.'
}], [0x63c5, {
  name: 'TagTrackUID',
  level: 4,
  type: 'u',
  multiple: true,
  minver: 1,
  webm: false,
  default: 0,
  description: 'A unique ID to identify the Track(s) the tags belong to. If the value is 0 at this level, the tags apply to all tracks in the Segment.'
}], [0x63ca, {
  name: 'TargetType',
  cppname: 'TagTargetType',
  level: 4,
  type: 's',
  minver: 1,
  webm: false,
  strong: 'informational',
  description: 'An  string that can be used to display the logical level of the target like "ALBUM", "TRACK", "MOVIE", "CHAPTER", etc (see TargetType).'
}], [0x68ca, {
  name: 'TargetTypeValue',
  cppname: 'TagTargetTypeValue',
  level: 4,
  type: 'u',
  minver: 1,
  webm: false,
  default: 50,
  description: 'A number to indicate the logical level of the target (see TargetType).'
}], [0x63c0, {
  name: 'Targets',
  cppname: 'TagTargets',
  level: 3,
  type: 'm',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'Contain all UIDs where the specified meta data apply. It is empty to describe everything in the segment.'
}], [0x1254c367, {
  name: 'Tags',
  level: 1,
  type: 'm',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Element containing elements specific to Tracks/Chapters. A list of valid tags can be found here.'
}], [0x450d, {
  name: 'ChapProcessPrivate',
  cppname: 'ChapterProcessPrivate',
  level: 5,
  type: 'b',
  minver: 1,
  webm: false,
  description: 'Some optional data attached to the ChapProcessCodecID information. For ChapProcessCodecID = 1, it is the "DVD level" equivalent.'
}], [0x437e, {
  name: 'ChapCountry',
  cppname: 'ChapterCountry',
  level: 5,
  type: 's',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'The countries corresponding to the string, same 2 octets as in Internet domains.'
}], [0x437c, {
  name: 'ChapLanguage',
  cppname: 'ChapterLanguage',
  level: 5,
  type: 's',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: true,
  default: 'eng',
  description: 'The languages corresponding to the string, in the bibliographic ISO-639-2 form.'
}], [0x8f, {
  name: 'ChapterTrack',
  level: 4,
  type: 'm',
  minver: 1,
  webm: false,
  description: 'List of tracks on which the chapter applies. If this element is not present, all tracks apply'
}], [0x63c3, {
  name: 'ChapterPhysicalEquiv',
  level: 4,
  type: 'u',
  minver: 1,
  webm: false,
  description: 'Specify the physical equivalent of this ChapterAtom like "DVD" (60) or "SIDE" (50), see complete list of values.'
}], [0x6ebc, {
  name: 'ChapterSegmentEditionUID',
  level: 4,
  type: 'u',
  minver: 1,
  webm: false,
  range: 'not 0',
  description: 'The EditionUID to play from the segment linked in ChapterSegmentUID.'
}], [0x6e67, {
  name: 'ChapterSegmentUID',
  level: 4,
  type: 'b',
  minver: 1,
  webm: false,
  range: '>0',
  bytesize: 16,
  description: 'A segment to play in place of this chapter. Edition ChapterSegmentEditionUID should be used for this segment, otherwise no edition is used.'
}], [0x73c4, {
  name: 'ChapterUID',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: true,
  range: 'not 0',
  description: 'A unique ID to identify the Chapter.'
}], [0xb6, {
  name: 'ChapterAtom',
  level: 3,
  recursive: true,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: true,
  description: 'Contains the atom information to use as the chapter atom (apply to all tracks).'
}], [0x45dd, {
  name: 'EditionFlagOrdered',
  level: 3,
  type: 'u',
  minver: 1,
  webm: false,
  default: 0,
  range: '0-1',
  description: 'Specify if the chapters can be defined multiple times and the order to play them is enforced. (1 bit)'
}], [0x45db, {
  name: 'EditionFlagDefault',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  range: '0-1',
  description: 'If a flag is set (1) the edition should be used as the default one. (1 bit)'
}], [0x45bd, {
  name: 'EditionFlagHidden',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  range: '0-1',
  description: 'If an edition is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)'
}], [0x45bc, {
  name: 'EditionUID',
  level: 3,
  type: 'u',
  minver: 1,
  webm: false,
  range: 'not 0',
  description: "A unique ID to identify the edition. It's useful for tagging an edition."
}], [0x45b9, {
  name: 'EditionEntry',
  level: 2,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: true,
  description: 'Contains all information about a segment edition.'
}], [0x1043a770, {
  name: 'Chapters',
  level: 1,
  type: 'm',
  minver: 1,
  webm: true,
  description: 'A system to define basic menus and partition data. For more detailed information, look at the Chapters Explanation.'
}], [0x46ae, {
  name: 'FileUID',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  range: 'not 0',
  description: 'Unique ID representing the file, as random as possible.'
}], [0x465c, {
  name: 'FileData',
  level: 3,
  type: 'b',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'The data of the file.'
}], [0x466e, {
  name: 'FileName',
  level: 3,
  type: '8',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'Filename of the attached file.'
}], [0x467e, {
  name: 'FileDescription',
  level: 3,
  type: '8',
  minver: 1,
  webm: false,
  description: 'A human-friendly name for the attached file.'
}], [0x61a7, {
  name: 'AttachedFile',
  level: 2,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: false,
  description: 'An attached file.'
}], [0x1941a469, {
  name: 'Attachments',
  level: 1,
  type: 'm',
  minver: 1,
  webm: false,
  description: 'Contain attached files.'
}], [0xeb, {
  name: 'CueRefCodecState',
  level: 5,
  type: 'u',
  webm: false,
  default: 0,
  description: 'The position of the Codec State corresponding to this referenced element. 0 means that the data is taken from the initial Track Entry.'
}], [0x535f, {
  name: 'CueRefNumber',
  level: 5,
  type: 'u',
  webm: false,
  default: 1,
  range: 'not 0',
  description: 'Number of the referenced Block of Track X in the specified Cluster.'
}], [0xdb, {
  name: 'CueReference',
  level: 4,
  type: 'm',
  multiple: true,
  minver: 2,
  webm: false,
  description: 'The Clusters containing the required referenced Blocks.'
}], [0xea, {
  name: 'CueCodecState',
  level: 4,
  type: 'u',
  minver: 2,
  webm: false,
  default: 0,
  description: 'The position of the Codec State corresponding to this Cue element. 0 means that the data is taken from the initial Track Entry.'
}], [0xb2, {
  name: 'CueDuration',
  level: 4,
  type: 'u',
  mandatory: false,
  minver: 4,
  webm: false,
  description: "The duration of the block according to the segment time base. If missing the track's DefaultDuration does not apply and no duration information is available in terms of the cues."
}], [0xf0, {
  name: 'CueRelativePosition',
  level: 4,
  type: 'u',
  mandatory: false,
  minver: 4,
  webm: false,
  description: 'The relative position of the referenced block inside the cluster with 0 being the first possible position for an element inside that cluster.'
}], [0xf1, {
  name: 'CueClusterPosition',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  description: 'The position of the Cluster containing the required Block.'
}], [0xf7, {
  name: 'CueTrack',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  range: 'not 0',
  description: 'The track for which a position is given.'
}], [0xb7, {
  name: 'CueTrackPositions',
  level: 3,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  description: 'Contain positions for different tracks corresponding to the timestamp.'
}], [0xb3, {
  name: 'CueTime',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  description: 'Absolute timestamp according to the segment time base.'
}], [0xbb, {
  name: 'CuePoint',
  level: 2,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  description: 'Contains all information relative to a seek point in the segment.'
}], [0x1c53bb6b, {
  name: 'Cues',
  level: 1,
  type: 'm',
  minver: 1,
  description: 'A top-level element to speed seeking access. All entries are local to the segment. Should be mandatory for non "live" streams.'
}], [0x47e6, {
  name: 'ContentSigHashAlgo',
  level: 6,
  type: 'u',
  minver: 1,
  webm: false,
  default: 0,
  br: ['', ''],
  description: "The hash algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - SHA1-160 2 - MD5"
}], [0x47e5, {
  name: 'ContentSigAlgo',
  level: 6,
  type: 'u',
  minver: 1,
  webm: false,
  default: 0,
  br: '',
  description: "The algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - RSA"
}], [0x47e4, {
  name: 'ContentSigKeyID',
  level: 6,
  type: 'b',
  minver: 1,
  webm: false,
  description: 'This is the ID of the private key the data was signed with.'
}], [0x47e3, {
  name: 'ContentSignature',
  level: 6,
  type: 'b',
  minver: 1,
  webm: false,
  description: 'A cryptographic signature of the contents.'
}], [0x47e2, {
  name: 'ContentEncKeyID',
  level: 6,
  type: 'b',
  minver: 1,
  webm: false,
  description: 'For public key algorithms this is the ID of the public key the the data was encrypted with.'
}], [0x47e1, {
  name: 'ContentEncAlgo',
  level: 6,
  type: 'u',
  minver: 1,
  webm: false,
  default: 0,
  br: '',
  description: "The encryption algorithm used. The value '0' means that the contents have not been encrypted but only signed. Predefined values: 1 - DES, 2 - 3DES, 3 - Twofish, 4 - Blowfish, 5 - AES"
}], [0x6d80, {
  name: 'ContentEncodings',
  level: 3,
  type: 'm',
  minver: 1,
  webm: false,
  description: 'Settings for several content encoding mechanisms like compression or encryption.'
}], [0xc4, {
  name: 'TrickMasterTrackSegmentUID',
  level: 3,
  type: 'b',
  divx: true,
  bytesize: 16,
  description: 'DivX trick track extenstions'
}], [0xc7, {
  name: 'TrickMasterTrackUID',
  level: 3,
  type: 'u',
  divx: true,
  description: 'DivX trick track extenstions'
}], [0xc6, {
  name: 'TrickTrackFlag',
  level: 3,
  type: 'u',
  divx: true,
  default: 0,
  description: 'DivX trick track extenstions'
}], [0xc1, {
  name: 'TrickTrackSegmentUID',
  level: 3,
  type: 'b',
  divx: true,
  bytesize: 16,
  description: 'DivX trick track extenstions'
}], [0xc0, {
  name: 'TrickTrackUID',
  level: 3,
  type: 'u',
  divx: true,
  description: 'DivX trick track extenstions'
}], [0xed, {
  name: 'TrackJoinUID',
  level: 5,
  type: 'u',
  mandatory: true,
  multiple: true,
  minver: 3,
  webm: false,
  range: 'not 0',
  description: 'The trackUID number of a track whose blocks are used to create this virtual track.'
}], [0xe9, {
  name: 'TrackJoinBlocks',
  level: 4,
  type: 'm',
  minver: 3,
  webm: false,
  description: 'Contains the list of all tracks whose Blocks need to be combined to create this virtual track'
}], [0xe6, {
  name: 'TrackPlaneType',
  level: 6,
  type: 'u',
  mandatory: true,
  minver: 3,
  webm: false,
  description: 'The kind of plane this track corresponds to (0: left eye, 1: right eye, 2: background).'
}], [0xe5, {
  name: 'TrackPlaneUID',
  level: 6,
  type: 'u',
  mandatory: true,
  minver: 3,
  webm: false,
  range: 'not 0',
  description: 'The trackUID number of the track representing the plane.'
}], [0xe4, {
  name: 'TrackPlane',
  level: 5,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 3,
  webm: false,
  description: 'Contains a video plane track that need to be combined to create this 3D track'
}], [0xe3, {
  name: 'TrackCombinePlanes',
  level: 4,
  type: 'm',
  minver: 3,
  webm: false,
  description: 'Contains the list of all video plane tracks that need to be combined to create this 3D track'
}], [0xe2, {
  name: 'TrackOperation',
  level: 3,
  type: 'm',
  minver: 3,
  webm: false,
  description: 'Operation that needs to be applied on tracks to create this virtual track. For more details look at the Specification Notes on the subject.'
}], [0x7d7b, {
  name: 'ChannelPositions',
  cppname: 'AudioPosition',
  level: 4,
  type: 'b',
  webm: false,
  description: 'Table of horizontal angles for each successive channel, see appendix.'
}], [0x9f, {
  name: 'Channels',
  cppname: 'AudioChannels',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  default: 1,
  range: 'not 0',
  description: 'Numbers of channels in the track.'
}], [0x78b5, {
  name: 'OutputSamplingFrequency',
  cppname: 'AudioOutputSamplingFreq',
  level: 4,
  type: 'f',
  minver: 1,
  default: 'Sampling Frequency',
  range: '> 0',
  description: 'Real output sampling frequency in Hz (used for SBR techniques).'
}], [0xb5, {
  name: 'SamplingFrequency',
  cppname: 'AudioSamplingFreq',
  level: 4,
  type: 'f',
  mandatory: true,
  minver: 1,
  default: '8000.0',
  range: '> 0',
  description: 'Sampling frequency in Hz.'
}], [0xe1, {
  name: 'Audio',
  cppname: 'TrackAudio',
  level: 3,
  type: 'm',
  minver: 1,
  description: 'Audio settings.'
}], [0x2383e3, {
  name: 'FrameRate',
  cppname: 'VideoFrameRate',
  level: 4,
  type: 'f',
  range: '> 0',
  strong: 'Informational',
  description: 'Number of frames per second.  only.'
}], [0x2fb523, {
  name: 'GammaValue',
  cppname: 'VideoGamma',
  level: 4,
  type: 'f',
  webm: false,
  range: '> 0',
  description: 'Gamma Value.'
}], [0x2eb524, {
  name: 'ColourSpace',
  cppname: 'VideoColourSpace',
  level: 4,
  type: 'b',
  minver: 1,
  webm: false,
  bytesize: 4,
  description: 'Same value as in AVI (32 bits).'
}], [0x54b3, {
  name: 'AspectRatioType',
  cppname: 'VideoAspectRatio',
  level: 4,
  type: 'u',
  minver: 1,
  default: 0,
  description: 'Specify the possible modifications to the aspect ratio (0: free resizing, 1: keep aspect ratio, 2: fixed).'
}], [0x54b2, {
  name: 'DisplayUnit',
  cppname: 'VideoDisplayUnit',
  level: 4,
  type: 'u',
  minver: 1,
  default: 0,
  description: 'How DisplayWidth & DisplayHeight should be interpreted (0: pixels, 1: centimeters, 2: inches, 3: Display Aspect Ratio).'
}], [0x54ba, {
  name: 'DisplayHeight',
  cppname: 'VideoDisplayHeight',
  level: 4,
  type: 'u',
  minver: 1,
  default: 'PixelHeight',
  range: 'not 0',
  description: 'Height of the video frames to display. The default value is only valid when DisplayUnit is 0.'
}], [0x54b0, {
  name: 'DisplayWidth',
  cppname: 'VideoDisplayWidth',
  level: 4,
  type: 'u',
  minver: 1,
  default: 'PixelWidth',
  range: 'not 0',
  description: 'Width of the video frames to display. The default value is only valid when DisplayUnit is 0.'
}], [0x54dd, {
  name: 'PixelCropRight',
  cppname: 'VideoPixelCropRight',
  level: 4,
  type: 'u',
  minver: 1,
  default: 0,
  description: 'The number of video pixels to remove on the right of the image.'
}], [0x54cc, {
  name: 'PixelCropLeft',
  cppname: 'VideoPixelCropLeft',
  level: 4,
  type: 'u',
  minver: 1,
  default: 0,
  description: 'The number of video pixels to remove on the left of the image.'
}], [0x54bb, {
  name: 'PixelCropTop',
  cppname: 'VideoPixelCropTop',
  level: 4,
  type: 'u',
  minver: 1,
  default: 0,
  description: 'The number of video pixels to remove at the top of the image.'
}], [0x54aa, {
  name: 'PixelCropBottom',
  cppname: 'VideoPixelCropBottom',
  level: 4,
  type: 'u',
  minver: 1,
  default: 0,
  description: 'The number of video pixels to remove at the bottom of the image (for HDTV content).'
}], [0xba, {
  name: 'PixelHeight',
  cppname: 'VideoPixelHeight',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  range: 'not 0',
  description: 'Height of the encoded video frames in pixels.'
}], [0xb0, {
  name: 'PixelWidth',
  cppname: 'VideoPixelWidth',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  range: 'not 0',
  description: 'Width of the encoded video frames in pixels.'
}], [0x53b9, {
  name: 'OldStereoMode',
  level: 4,
  type: 'u',
  maxver: '0',
  webm: false,
  divx: false,
  description: 'DEPRECATED, DO NOT USE. Bogus StereoMode value used in old versions of libmatroska. (0: mono, 1: right eye, 2: left eye, 3: both eyes).'
}], [0x53c0, {
  name: 'AlphaMode',
  cppname: 'VideoAlphaMode',
  level: 4,
  type: 'u',
  minver: 3,
  webm: true,
  default: 0,
  description: 'Alpha Video Mode. Presence of this element indicates that the BlockAdditional element could contain Alpha data.'
}], [0x53b8, {
  name: 'StereoMode',
  cppname: 'VideoStereoMode',
  level: 4,
  type: 'u',
  minver: 3,
  webm: true,
  default: 0,
  description: 'Stereo-3D video mode (0: mono, 1: side by side (left eye is first), 2: top-bottom (right eye is first), 3: top-bottom (left eye is first), 4: checkboard (right is first), 5: checkboard (left is first), 6: row interleaved (right is first), 7: row interleaved (left is first), 8: column interleaved (right is first), 9: column interleaved (left is first), 10: anaglyph (cyan/red), 11: side by side (right eye is first), 12: anaglyph (green/magenta), 13 both eyes laced in one Block (left eye is first), 14 both eyes laced in one Block (right eye is first)) . There are some more details on 3D support in the Specification Notes.'
}], [0x9a, {
  name: 'FlagInterlaced',
  cppname: 'VideoFlagInterlaced',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 2,
  webm: true,
  default: 0,
  range: '0-1',
  description: 'Set if the video is interlaced. (1 bit)'
}], [0xe0, {
  name: 'Video',
  cppname: 'TrackVideo',
  level: 3,
  type: 'm',
  minver: 1,
  description: 'Video settings.'
}], [0x66a5, {
  name: 'TrackTranslateTrackID',
  level: 4,
  type: 'b',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'The binary value used to represent this track in the chapter codec data. The format depends on the ChapProcessCodecID used.'
}], [0x66bf, {
  name: 'TrackTranslateCodec',
  level: 4,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'The chapter codec using this ID (0: Matroska Script, 1: DVD-menu).'
}], [0x66fc, {
  name: 'TrackTranslateEditionUID',
  level: 4,
  type: 'u',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Specify an edition UID on which this translation applies. When not specified, it means for all editions found in the segment.'
}], [0x56bb, {
  name: 'SeekPreRoll',
  level: 3,
  type: 'u',
  mandatory: true,
  multiple: false,
  default: 0,
  minver: 4,
  webm: true,
  description: 'After a discontinuity, SeekPreRoll is the duration in nanoseconds of the data the decoder must decode before the decoded data is valid.'
}], [0x56aa, {
  name: 'CodecDelay',
  level: 3,
  type: 'u',
  multiple: false,
  default: 0,
  minver: 4,
  webm: true,
  description: 'CodecDelay is The codec-built-in delay in nanoseconds. This value must be subtracted from each block timestamp in order to get the actual timestamp. The value should be small so the muxing of tracks with the same actual timestamp are in the same Cluster.'
}], [0x6fab, {
  name: 'TrackOverlay',
  level: 3,
  type: 'u',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Specify that this track is an overlay track for the Track specified (in the u-integer). That means when this track has a gap (see SilentTracks) the overlay track should be used instead. The order of multiple TrackOverlay matters, the first one is the one that should be used. If not found it should be the second, etc.'
}], [0xaa, {
  name: 'CodecDecodeAll',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 2,
  webm: false,
  default: 1,
  range: '0-1',
  description: 'The codec can decode potentially damaged data (1 bit).'
}], [0x26b240, {
  name: 'CodecDownloadURL',
  level: 3,
  type: 's',
  multiple: true,
  webm: false,
  description: 'A URL to download about the codec used.'
}], [0x3b4040, {
  name: 'CodecInfoURL',
  level: 3,
  type: 's',
  multiple: true,
  webm: false,
  description: 'A URL to find information about the codec used.'
}], [0x3a9697, {
  name: 'CodecSettings',
  level: 3,
  type: '8',
  webm: false,
  description: 'A string describing the encoding setting used.'
}], [0x63a2, {
  name: 'CodecPrivate',
  level: 3,
  type: 'b',
  minver: 1,
  description: 'Private data only known to the codec.'
}], [0x22b59c, {
  name: 'Language',
  cppname: 'TrackLanguage',
  level: 3,
  type: 's',
  minver: 1,
  default: 'eng',
  description: 'Specifies the language of the track in the Matroska languages form.'
}], [0x536e, {
  name: 'Name',
  cppname: 'TrackName',
  level: 3,
  type: '8',
  minver: 1,
  description: 'A human-readable track name.'
}], [0x55ee, {
  name: 'MaxBlockAdditionID',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  description: 'The maximum value of BlockAdditions for this track.'
}], [0x537f, {
  name: 'TrackOffset',
  level: 3,
  type: 'i',
  webm: false,
  default: 0,
  description: "A value to add to the Block's Timestamp. This can be used to adjust the playback offset of a track."
}], [0x23314f, {
  name: 'TrackTimecodeScale',
  level: 3,
  type: 'f',
  mandatory: true,
  minver: 1,
  maxver: '3',
  webm: false,
  default: '1.0',
  range: '> 0',
  description: 'DEPRECATED, DO NOT USE. The scale to apply on this track to work at normal speed in relation with other tracks (mostly used to adjust video speed when the audio length differs).'
}], [0x234e7a, {
  name: 'DefaultDecodedFieldDuration',
  cppname: 'TrackDefaultDecodedFieldDuration',
  level: 3,
  type: 'u',
  minver: 4,
  range: 'not 0',
  description: 'The period in nanoseconds (not scaled by TimcodeScale)\nbetween two successive fields at the output of the decoding process (see the notes)'
}], [0x23e383, {
  name: 'DefaultDuration',
  cppname: 'TrackDefaultDuration',
  level: 3,
  type: 'u',
  minver: 1,
  range: 'not 0',
  description: "Number of nanoseconds (not scaled via TimecodeScale) per frame ('frame' in the Matroska sense -- one element put into a (Simple)Block)."
}], [0x6df8, {
  name: 'MaxCache',
  cppname: 'TrackMaxCache',
  level: 3,
  type: 'u',
  minver: 1,
  webm: false,
  description: 'The maximum cache size required to store referenced frames in and the current frame. 0 means no cache is needed.'
}], [0x6de7, {
  name: 'MinCache',
  cppname: 'TrackMinCache',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  description: 'The minimum number of frames a player should be able to cache during playback. If set to 0, the reference pseudo-cache system is not used.'
}], [0x9c, {
  name: 'FlagLacing',
  cppname: 'TrackFlagLacing',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  default: 1,
  range: '0-1',
  description: 'Set if the track may contain blocks using lacing. (1 bit)'
}], [0x55aa, {
  name: 'FlagForced',
  cppname: 'TrackFlagForced',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  default: 0,
  range: '0-1',
  description: 'Set if that track MUST be active during playback. There can be many forced track for a kind (audio, video or subs), the player should select the one which language matches the user preference or the default + forced track. Overlay MAY happen between a forced and non-forced track of the same kind. (1 bit)'
}], [0xb9, {
  name: 'FlagEnabled',
  cppname: 'TrackFlagEnabled',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 2,
  webm: true,
  default: 1,
  range: '0-1',
  description: 'Set if the track is usable. (1 bit)'
}], [0x73c5, {
  name: 'TrackUID',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  range: 'not 0',
  description: 'A unique ID to identify the Track. This should be kept the same when making a direct stream copy of the Track to another file.'
}], [0xd7, {
  name: 'TrackNumber',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  range: 'not 0',
  description: 'The track number as used in the Block Header (using more than 127 tracks is not encouraged, though the design allows an unlimited number).'
}], [0xae, {
  name: 'TrackEntry',
  level: 2,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  description: 'Describes a track with all elements.'
}], [0x1654ae6b, {
  name: 'Tracks',
  level: 1,
  type: 'm',
  multiple: true,
  minver: 1,
  description: 'A top-level block of information with many tracks described.'
}], [0xaf, {
  name: 'EncryptedBlock',
  level: 2,
  type: 'b',
  multiple: true,
  webm: false,
  description: 'Similar to EncryptedBlock Structure)'
}], [0xca, {
  name: 'ReferenceTimeCode',
  level: 4,
  type: 'u',
  multiple: false,
  mandatory: true,
  minver: 0,
  webm: false,
  divx: true,
  description: 'DivX trick track extenstions'
}], [0xc9, {
  name: 'ReferenceOffset',
  level: 4,
  type: 'u',
  multiple: false,
  mandatory: true,
  minver: 0,
  webm: false,
  divx: true,
  description: 'DivX trick track extenstions'
}], [0xc8, {
  name: 'ReferenceFrame',
  level: 3,
  type: 'm',
  multiple: false,
  minver: 0,
  webm: false,
  divx: true,
  description: 'DivX trick track extenstions'
}], [0xcf, {
  name: 'SliceDuration',
  level: 5,
  type: 'u',
  default: 0,
  description: 'The (scaled) duration to apply to the element.'
}], [0xce, {
  name: 'Delay',
  cppname: 'SliceDelay',
  level: 5,
  type: 'u',
  default: 0,
  description: 'The (scaled) delay to apply to the element.'
}], [0xcb, {
  name: 'BlockAdditionID',
  cppname: 'SliceBlockAddID',
  level: 5,
  type: 'u',
  default: 0,
  description: 'The ID of the BlockAdditional element (0 is the main Block).'
}], [0xcd, {
  name: 'FrameNumber',
  cppname: 'SliceFrameNumber',
  level: 5,
  type: 'u',
  default: 0,
  description: 'The number of the frame to generate from this lace with this delay (allow you to generate many frames from the same Block/Frame).'
}], [0xcc, {
  name: 'LaceNumber',
  cppname: 'SliceLaceNumber',
  level: 5,
  type: 'u',
  minver: 1,
  default: 0,
  divx: false,
  description: 'The reverse number of the frame in the lace (0 is the last frame, 1 is the next to last, etc). While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback.'
}], [0xe8, {
  name: 'TimeSlice',
  level: 4,
  type: 'm',
  multiple: true,
  minver: 1,
  divx: false,
  description: 'Contains extra time information about the data contained in the Block. While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback.'
}], [0x8e, {
  name: 'Slices',
  level: 3,
  type: 'm',
  minver: 1,
  divx: false,
  description: 'Contains slices description.'
}], [0x75a2, {
  name: 'DiscardPadding',
  level: 3,
  type: 'i',
  minver: 4,
  webm: true,
  description: 'Duration in nanoseconds of the silent data added to the Block (padding at the end of the Block for positive value, at the beginning of the Block for negative value). The duration of DiscardPadding is not calculated in the duration of the TrackEntry and should be discarded during playback.'
}], [0xa4, {
  name: 'CodecState',
  level: 3,
  type: 'b',
  minver: 2,
  webm: false,
  description: 'The new codec state to use. Data interpretation is private to the codec. This information should always be referenced by a seek entry.'
}], [0xfd, {
  name: 'ReferenceVirtual',
  level: 3,
  type: 'i',
  webm: false,
  description: 'Relative position of the data that should be in position of the virtual block.'
}], [0xfb, {
  name: 'ReferenceBlock',
  level: 3,
  type: 'i',
  multiple: true,
  minver: 1,
  description: "Timestamp of another frame used as a reference (ie: B or P frame). The timestamp is relative to the block it's attached to."
}], [0xfa, {
  name: 'ReferencePriority',
  cppname: 'FlagReferenced',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 0,
  description: 'This frame is referenced and has the specified cache priority. In cache only a frame of the same or higher priority can replace this frame. A value of 0 means the frame is not referenced.'
}], [0x9b, {
  name: 'BlockDuration',
  level: 3,
  type: 'u',
  minver: 1,
  default: 'TrackDuration',
  description: 'The duration of the Block (based on TimecodeScale). This element is mandatory when DefaultDuration is set for the track (but can be omitted as other default values). When not written and with no DefaultDuration, the value is assumed to be the difference between the timestamp of this Block and the timestamp of the next Block in "display" order (not coding order). This element can be useful at the end of a Track (as there is not other Block available), or when there is a break in a track like for subtitle tracks. When set to 0 that means the frame is not a keyframe.'
}], [0xa5, {
  name: 'BlockAdditional',
  level: 5,
  type: 'b',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'Interpreted by the codec as it wishes (using the BlockAddID).'
}], [0xee, {
  name: 'BlockAddID',
  level: 5,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  default: 1,
  range: 'not 0',
  description: 'An ID to identify the BlockAdditional level.'
}], [0xa6, {
  name: 'BlockMore',
  level: 4,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Contain the BlockAdditional and some parameters.'
}], [0x75a1, {
  name: 'BlockAdditions',
  level: 3,
  type: 'm',
  minver: 1,
  webm: false,
  description: 'Contain additional blocks to complete the main one. An EBML parser that has no knowledge of the Block structure could still see and use/skip these data.'
}], [0xa2, {
  name: 'BlockVirtual',
  level: 3,
  type: 'b',
  webm: false,
  description: 'A Block with no data. It must be stored in the stream at the place the real Block should be in display order. (see Block Virtual)'
}], [0xa1, {
  name: 'Block',
  level: 3,
  type: 'b',
  mandatory: true,
  minver: 1,
  description: 'Block containing the actual data to be rendered and a timestamp relative to the Cluster Timecode. (see Block Structure)'
}], [0xa0, {
  name: 'BlockGroup',
  level: 2,
  type: 'm',
  multiple: true,
  minver: 1,
  description: 'Basic container of information containing a single Block or BlockVirtual, and information specific to that Block/VirtualBlock.'
}], [0xa3, {
  name: 'SimpleBlock',
  level: 2,
  type: 'b',
  multiple: true,
  minver: 2,
  webm: true,
  divx: true,
  description: 'Similar to SimpleBlock Structure)'
}], [0xab, {
  name: 'PrevSize',
  cppname: 'ClusterPrevSize',
  level: 2,
  type: 'u',
  minver: 1,
  description: 'Size of the previous Cluster, in octets. Can be useful for backward playing.'
}], [0xa7, {
  name: 'Position',
  cppname: 'ClusterPosition',
  level: 2,
  type: 'u',
  minver: 1,
  webm: false,
  description: 'The Position of the Cluster in the segment (0 in live broadcast streams). It might help to resynchronise offset on damaged streams.'
}], [0x58d7, {
  name: 'SilentTrackNumber',
  cppname: 'ClusterSilentTrackNumber',
  level: 3,
  type: 'u',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'One of the track number that are not used from now on in the stream. It could change later if not specified as silent in a further Cluster.'
}], [0xe7, {
  name: 'Timecode',
  cppname: 'ClusterTimecode',
  level: 2,
  type: 'u',
  mandatory: true,
  minver: 1,
  description: 'Absolute timestamp of the cluster (based on TimecodeScale).'
}], [0x1f43b675, {
  name: 'Cluster',
  level: 1,
  type: 'm',
  multiple: true,
  minver: 1,
  description: 'The lower level element containing the (monolithic) Block structure.'
}], [0x4d80, {
  name: 'MuxingApp',
  level: 2,
  type: '8',
  mandatory: true,
  minver: 1,
  description: 'Muxing application or library ("libmatroska-0.4.3").'
}], [0x7ba9, {
  name: 'Title',
  level: 2,
  type: '8',
  minver: 1,
  webm: false,
  description: 'General name of the segment.'
}], [0x2ad7b2, {
  name: 'TimecodeScaleDenominator',
  level: 2,
  type: 'u',
  mandatory: true,
  minver: 4,
  default: 1000000000,
  description: 'Timestamp scale numerator, see TimecodeScale.'
}], [0x2ad7b1, {
  name: 'TimecodeScale',
  level: 2,
  type: 'u',
  mandatory: true,
  minver: 1,
  default: 1000000,
  description: 'Timestamp scale in nanoseconds (1.000.000 means all timestamps in the segment are expressed in milliseconds).'
}], [0x69a5, {
  name: 'ChapterTranslateID',
  level: 3,
  type: 'b',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'The binary value used to represent this segment in the chapter codec data. The format depends on the ChapProcessCodecID used.'
}], [0x69bf, {
  name: 'ChapterTranslateCodec',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  webm: false,
  description: 'The chapter codec using this ID (0: Matroska Script, 1: DVD-menu).'
}], [0x69fc, {
  name: 'ChapterTranslateEditionUID',
  level: 3,
  type: 'u',
  multiple: true,
  minver: 1,
  webm: false,
  description: 'Specify an edition UID on which this correspondance applies. When not specified, it means for all editions found in the segment.'
}], [0x3e83bb, {
  name: 'NextFilename',
  level: 2,
  type: '8',
  minver: 1,
  webm: false,
  description: 'An escaped filename corresponding to the next segment.'
}], [0x3eb923, {
  name: 'NextUID',
  level: 2,
  type: 'b',
  minver: 1,
  webm: false,
  bytesize: 16,
  description: 'A unique ID to identify the next chained segment (128 bits).'
}], [0x3c83ab, {
  name: 'PrevFilename',
  level: 2,
  type: '8',
  minver: 1,
  webm: false,
  description: 'An escaped filename corresponding to the previous segment.'
}], [0x3cb923, {
  name: 'PrevUID',
  level: 2,
  type: 'b',
  minver: 1,
  webm: false,
  bytesize: 16,
  description: 'A unique ID to identify the previous chained segment (128 bits).'
}], [0x73a4, {
  name: 'SegmentUID',
  level: 2,
  type: 'b',
  minver: 1,
  webm: false,
  range: 'not 0',
  bytesize: 16,
  description: 'A randomly generated unique ID to identify the current segment between many others (128 bits).'
}], [0x1549a966, {
  name: 'Info',
  level: 1,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  description: 'Contains miscellaneous general information and statistics on the file.'
}], [0x53ac, {
  name: 'SeekPosition',
  level: 3,
  type: 'u',
  mandatory: true,
  minver: 1,
  description: 'The position of the element in the segment in octets (0 = first level 1 element).'
}], [0x53ab, {
  name: 'SeekID',
  level: 3,
  type: 'b',
  mandatory: true,
  minver: 1,
  description: 'The binary ID corresponding to the element name.'
}], [0x4dbb, {
  name: 'Seek',
  cppname: 'SeekPoint',
  level: 2,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  description: 'Contains a single seek entry to an EBML element.'
}], [0x114d9b74, {
  name: 'SeekHead',
  cppname: 'SeekHeader',
  level: 1,
  type: 'm',
  multiple: true,
  minver: 1,
  description: 'Contains the position of other level 1 elements.'
}], [0x7e7b, {
  name: 'SignatureElementList',
  level: 2,
  type: 'm',
  multiple: true,
  webm: false,
  i: 'Cluster|Block|BlockAdditional',
  description: 'A list consists of a number of consecutive elements that represent one case where data is used in signature. Ex:  means that the BlockAdditional of all Blocks in all Clusters is used for encryption.'
}], [0x7e5b, {
  name: 'SignatureElements',
  level: 1,
  type: 'm',
  webm: false,
  description: 'Contains elements that will be used to compute the signature.'
}], [0x7eb5, {
  name: 'Signature',
  level: 1,
  type: 'b',
  webm: false,
  description: 'The signature of the data (until a new.'
}], [0x7ea5, {
  name: 'SignaturePublicKey',
  level: 1,
  type: 'b',
  webm: false,
  description: 'The public key to use with the algorithm (in the case of a PKI-based signature).'
}], [0x7e9a, {
  name: 'SignatureHash',
  level: 1,
  type: 'u',
  webm: false,
  description: 'Hash algorithm used (1=SHA1-160, 2=MD5).'
}], [0x7e8a, {
  name: 'SignatureAlgo',
  level: 1,
  type: 'u',
  webm: false,
  description: 'Signature algorithm used (1=RSA, 2=elliptic).'
}], [0x1b538667, {
  name: 'SignatureSlot',
  level: -1,
  type: 'm',
  multiple: true,
  webm: false,
  description: 'Contain signature of some (coming) elements in the stream.'
}], [0xbf, {
  name: 'CRC-32',
  level: -1,
  type: 'b',
  minver: 1,
  webm: false,
  description: "The CRC is computed on all the data of the Master element it's in. The CRC element should be the first in it's parent master for easier reading. All level 1 elements should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian"
}], [0xec, {
  name: 'Void',
  level: -1,
  type: 'b',
  minver: 1,
  description: 'Used to void damaged data, to avoid unexpected behaviors when using damaged data. The content is discarded. Also used to reserve space in a sub-element for later use.'
}], [0x42f3, {
  name: 'EBMLMaxSizeLength',
  level: 1,
  type: 'u',
  mandatory: true,
  default: 8,
  minver: 1,
  description: "The maximum length of the sizes you'll find in this file (8 or less in Matroska). This does not override the element size indicated at the beginning of an element. Elements that have an indicated size which is larger than what is allowed by EBMLMaxSizeLength shall be considered invalid."
}], [0x42f2, {
  name: 'EBMLMaxIDLength',
  level: 1,
  type: 'u',
  mandatory: true,
  default: 4,
  minver: 1,
  description: "The maximum length of the IDs you'll find in this file (4 or less in Matroska)."
}], [0x42f7, {
  name: 'EBMLReadVersion',
  level: 1,
  type: 'u',
  mandatory: true,
  default: 1,
  minver: 1,
  description: 'The minimum EBML version a parser has to support to read this file.'
}], [0x1a45dfa3, {
  name: 'EBML',
  level: 0,
  type: 'm',
  mandatory: true,
  multiple: true,
  minver: 1,
  description: 'Set the EBML characteristics of the data to follow. Each EBML document has to start with this.'
}]]);

// 20.1.2.3 Number.isInteger(number)

var floor$1 = Math.floor;
var _isInteger = function isInteger(it) {
  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
};

// 20.1.2.3 Number.isInteger(number)


_export(_export.S, 'Number', { isInteger: _isInteger });

var $parseInt = _global.parseInt;
var $trim$1 = _stringTrim.trim;

var hex = /^[-+]?0[xX]/;

var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim$1(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

// 20.1.2.13 Number.parseInt(string, radix)
_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', { parseInt: _parseInt });

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter() {
  EventEmitter.init.call(this);
}

// nodejs oddity
// require('events') === require('events').EventEmitter
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active && !(this instanceof domain.Domain)) ;
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] :
                                          [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + type + ' listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (list.length === 1) {
          list[0] = undefined;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

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
function nextTick(fun) {
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
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var inherits;
if (typeof Object.create === 'function'){
  inherits = function inherits(ctor, superCtor) {
    // implementation from standard node.js 'util' module
    ctor.super_ = superCtor;
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
  inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
var inherits$1 = inherits;

var formatRegExp = /%[sdj%]/g;
function format(f) {
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
}

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
function deprecate(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global$1.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

var debugs = {};
var debugEnviron;
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
}

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
    _extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

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
      value.inspect !== inspect &&
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
  if (isArray$1(value)) {
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
    if (hasOwnProperty$1(value, String(i))) {
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
  if (!hasOwnProperty$1(visibleKeys, key)) {
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
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
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
function isArray$1(ar) {
  return Array.isArray(ar);
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isNull(arg) {
  return arg === null;
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isUndefined(arg) {
  return arg === void 0;
}

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isFunction(arg) {
  return typeof arg === 'function';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}
function hasOwnProperty$1(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return Buffer.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = Buffer.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

// Copyright Joyent, Inc. and other Node contributors.
var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     };


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
function StringDecoder(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
}

// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

Readable.ReadableState = ReadableState;

var debug = debuglog('stream');
inherits$1(Readable, EventEmitter);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
}
function listenerCount$1 (emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  EventEmitter.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = Buffer.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false);

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && src.listeners('data').length) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var _i = 0; _i < len; _i++) {
      dests[_i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1) return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = EventEmitter.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

// A bit simpler than readable streams.
Writable.WritableState = WritableState;
inherits$1(Writable, EventEmitter);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Object.defineProperty(this, 'buffer', {
    get: deprecate(function () {
      return this.getBuffer();
    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
  });
  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function writableStateGetBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
function Writable(options) {

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  EventEmitter.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  nextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) nextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
        nextTick(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}

inherits$1(Duplex, Readable);

var keys$1 = Object.keys(Writable.prototype);
for (var v = 0; v < keys$1.length; v++) {
  var method = keys$1[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

// a transform stream is a readable/writable stream where you do
inherits$1(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}
function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er) {
      done(stream, er);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('Not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er) {
  if (er) return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

inherits$1(PassThrough, Transform);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

inherits$1(Stream, EventEmitter);
Stream.Readable = Readable;
Stream.Writable = Writable;
Stream.Duplex = Duplex;
Stream.Transform = Transform;
Stream.PassThrough = PassThrough;

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EventEmitter.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EventEmitter.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

var debug$1 = __webpack_require__(/*! debug */ "./node_modules/ebml/node_modules/debug/src/browser.js")('ebml:decoder');

var STATE_TAG = 1;
var STATE_SIZE = 2;
var STATE_CONTENT = 3;

var EbmlDecoder =
/*#__PURE__*/
function (_Transform) {
  _inherits(EbmlDecoder, _Transform);

  /**
   * @property
   * @private
   * @type {Buffer}
   */

  /**
   * @private
   * @property
   * @readonly
   */

  /**
   * @property
   * @private
   * @type {Number}
   */

  /**
   * @property
   * @private
   * @type {Number}
   */

  /**
   * @property
   * @private
   * @type {Number}
   */

  /**
   * @constructor
   * @param {Object} options The options to be passed along to the super class
   */
  function EbmlDecoder() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EbmlDecoder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EbmlDecoder).call(this, _objectSpread({}, options, {
      readableObjectMode: true
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mBuffer", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mTagStack", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mState", STATE_TAG);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mCursor", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mTotal", 0);

    return _this;
  }

  _createClass(EbmlDecoder, [{
    key: "_transform",
    value: function _transform(chunk, enc, done) {
      if (!this.buffer) {
        this.buffer = Buffer.from(chunk);
      } else {
        this.buffer = Tools.concatenate(this.buffer, Buffer.from(chunk));
      }

      while (this.cursor < this.buffer.length) {
        if (this.state === STATE_TAG && !this.readTag()) {
          break;
        }

        if (this.state === STATE_SIZE && !this.readSize()) {
          break;
        }

        if (this.state === STATE_CONTENT && !this.readContent()) {
          break;
        }
      }

      done();
    }
  }, {
    key: "readTag",
    value: function readTag() {
      if (debug$1.enabled) {
        debug$1('parsing tag');
      }

      if (this.cursor >= this.buffer.length) {
        if (debug$1.enabled) {
          debug$1('waiting for more data');
        }

        return false;
      }

      var start = this.total;
      var tag = Tools.readVint(this.buffer, this.cursor);

      if (tag == null) {
        if (debug$1.enabled) {
          debug$1('waiting for more data');
        }

        return false;
      }

      var tagStr = Tools.readHexString(this.buffer, this.cursor, this.cursor + tag.length);
      var tagNum = Number.parseInt(tagStr, 16);
      this.cursor += tag.length;
      this.total += tag.length;
      this.state = STATE_SIZE;
      var tagObj = {
        tag: tag.value,
        tagStr: tagStr,
        type: EbmlDecoder.getSchemaInfo(tagNum).type,
        name: EbmlDecoder.getSchemaInfo(tagNum).name,
        start: start,
        end: start + tag.length
      };
      this.tagStack.push(tagObj);

      if (debug$1.enabled) {
        debug$1("read tag: ".concat(tagStr));
      }

      return true;
    }
  }, {
    key: "readSize",
    value: function readSize() {
      var tagObj = this.tagStack[this.tagStack.length - 1];

      if (debug$1.enabled) {
        debug$1("parsing size for tag: ".concat(tagObj.tagStr));
      }

      if (this.cursor >= this.buffer.length) {
        if (debug$1.enabled) {
          debug$1('waiting for more data');
        }

        return false;
      }

      var size = Tools.readVint(this.buffer, this.cursor);

      if (size == null) {
        if (debug$1.enabled) {
          debug$1('waiting for more data');
        }

        return false;
      }

      this.cursor += size.length;
      this.total += size.length;
      this.state = STATE_CONTENT;
      tagObj.dataSize = size.value; // unknown size

      if (size.value === -1) {
        tagObj.end = -1;
      } else {
        tagObj.end += size.value + size.length;
      }

      if (debug$1.enabled) {
        debug$1("read size: ".concat(size.value));
      }

      return true;
    }
  }, {
    key: "readContent",
    value: function readContent() {
      var _this$tagStack = this.tagStack[this.tagStack.length - 1],
          tagStr = _this$tagStack.tagStr,
          type = _this$tagStack.type,
          dataSize = _this$tagStack.dataSize,
          rest = _objectWithoutProperties(_this$tagStack, ["tagStr", "type", "dataSize"]);

      if (debug$1.enabled) {
        debug$1("parsing content for tag: ".concat(tagStr));
      }

      if (type === 'm') {
        if (debug$1.enabled) {
          debug$1('content should be tags');
        }

        this.push(['start', _objectSpread({
          tagStr: tagStr,
          type: type,
          dataSize: dataSize
        }, rest)]);
        this.state = STATE_TAG;
        return true;
      }

      if (this.buffer.length < this.cursor + dataSize) {
        if (debug$1.enabled) {
          debug$1("got: ".concat(this.buffer.length));
          debug$1("need: ".concat(this.cursor + dataSize));
          debug$1('waiting for more data');
        }

        return false;
      }

      var data = this.buffer.subarray(this.cursor, this.cursor + dataSize);
      this.total += dataSize;
      this.state = STATE_TAG;
      this.buffer = this.buffer.subarray(this.cursor + dataSize);
      this.cursor = 0;
      this.tagStack.pop(); // remove the object from the stack

      this.push(['tag', Tools.readDataFromTag(_objectSpread({
        tagStr: tagStr,
        type: type,
        dataSize: dataSize
      }, rest), Buffer.from(data))]);

      while (this.tagStack.length > 0) {
        var topEle = this.tagStack[this.tagStack.length - 1];

        if (this.total < topEle.end) {
          break;
        }

        this.push(['end', topEle]);
        this.tagStack.pop();
      }

      if (debug$1.enabled) {
        debug$1("read data: ".concat(data.toString('hex')));
      }

      return true;
    }
  }, {
    key: "buffer",
    get: function get() {
      return this.mBuffer;
    },
    set: function set(buffer) {
      this.mBuffer = buffer;
    }
    /**
     * @param {number} cursor
     */

  }, {
    key: "cursor",
    get: function get() {
      return this.mCursor;
    },
    set: function set(cursor) {
      this.mCursor = cursor;
    }
  }, {
    key: "state",
    get: function get() {
      return this.mState;
    },
    set: function set(state) {
      this.mState = state;
    }
  }, {
    key: "tagStack",
    get: function get() {
      return this.mTagStack;
    }
  }, {
    key: "total",
    get: function get() {
      return this.mTotal;
    },
    set: function set(total) {
      this.mTotal = total;
    }
  }], [{
    key: "getSchemaInfo",
    value: function getSchemaInfo(tag) {
      if (Number.isInteger(tag) && schema.has(tag)) {
        return schema.get(tag);
      }

      return {
        type: null,
        name: 'unknown',
        description: '',
        level: -1,
        minver: -1,
        multiple: false,
        webm: false
      };
    }
  }]);

  return EbmlDecoder;
}(Transform);

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var SPECIES$1 = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
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

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

var buffers = Buffers;

function Buffers (bufs) {
    if (!(this instanceof Buffers)) return new Buffers(bufs);
    this.buffers = bufs || [];
    this.length = this.buffers.reduce(function (size, buf) {
        return size + buf.length
    }, 0);
}

Buffers.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!isBuffer(arguments[i])) {
            throw new TypeError('Tried to push a non-buffer');
        }
    }
    
    for (var i = 0; i < arguments.length; i++) {
        var buf = arguments[i];
        this.buffers.push(buf);
        this.length += buf.length;
    }
    return this.length;
};

Buffers.prototype.unshift = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!isBuffer(arguments[i])) {
            throw new TypeError('Tried to unshift a non-buffer');
        }
    }
    
    for (var i = 0; i < arguments.length; i++) {
        var buf = arguments[i];
        this.buffers.unshift(buf);
        this.length += buf.length;
    }
    return this.length;
};

Buffers.prototype.copy = function (dst, dStart, start, end) {
    return this.slice(start, end).copy(dst, dStart, 0, end - start);
};

Buffers.prototype.splice = function (i, howMany) {
    var buffers = this.buffers;
    var index = i >= 0 ? i : this.length - i;
    var reps = [].slice.call(arguments, 2);
    
    if (howMany === undefined) {
        howMany = this.length - index;
    }
    else if (howMany > this.length - index) {
        howMany = this.length - index;
    }
    
    for (var i = 0; i < reps.length; i++) {
        this.length += reps[i].length;
    }
    
    var removed = new Buffers();
    
    var startBytes = 0;
    for (
        var ii = 0;
        ii < buffers.length && startBytes + buffers[ii].length < index;
        ii ++
    ) { startBytes += buffers[ii].length; }
    
    if (index - startBytes > 0) {
        var start = index - startBytes;
        
        if (start + howMany < buffers[ii].length) {
            removed.push(buffers[ii].slice(start, start + howMany));
            
            var orig = buffers[ii];
            //var buf = new Buffer(orig.length - howMany);
            var buf0 = new Buffer(start);
            for (var i = 0; i < start; i++) {
                buf0[i] = orig[i];
            }
            
            var buf1 = new Buffer(orig.length - start - howMany);
            for (var i = start + howMany; i < orig.length; i++) {
                buf1[ i - howMany - start ] = orig[i];
            }
            
            if (reps.length > 0) {
                var reps_ = reps.slice();
                reps_.unshift(buf0);
                reps_.push(buf1);
                buffers.splice.apply(buffers, [ ii, 1 ].concat(reps_));
                ii += reps_.length;
                reps = [];
            }
            else {
                buffers.splice(ii, 1, buf0, buf1);
                //buffers[ii] = buf;
                ii += 2;
            }
        }
        else {
            removed.push(buffers[ii].slice(start));
            buffers[ii] = buffers[ii].slice(0, start);
            ii ++;
        }
    }
    
    if (reps.length > 0) {
        buffers.splice.apply(buffers, [ ii, 0 ].concat(reps));
        ii += reps.length;
    }
    
    while (removed.length < howMany) {
        var buf = buffers[ii];
        var len = buf.length;
        var take = Math.min(len, howMany - removed.length);
        
        if (take === len) {
            removed.push(buf);
            buffers.splice(ii, 1);
        }
        else {
            removed.push(buf.slice(0, take));
            buffers[ii] = buffers[ii].slice(take);
        }
    }
    
    this.length -= removed.length;
    
    return removed;
};
 
Buffers.prototype.slice = function (i, j) {
    var buffers = this.buffers;
    if (j === undefined) j = this.length;
    if (i === undefined) i = 0;
    
    if (j > this.length) j = this.length;
    
    var startBytes = 0;
    for (
        var si = 0;
        si < buffers.length && startBytes + buffers[si].length <= i;
        si ++
    ) { startBytes += buffers[si].length; }
    
    var target = new Buffer(j - i);
    
    var ti = 0;
    for (var ii = si; ti < j - i && ii < buffers.length; ii++) {
        var len = buffers[ii].length;
        
        var start = ti === 0 ? i - startBytes : 0;
        var end = ti + len >= j - i
            ? Math.min(start + (j - i) - ti, len)
            : len
        ;
        
        buffers[ii].copy(target, ti, start, end);
        ti += end - start;
    }
    
    return target;
};

Buffers.prototype.pos = function (i) {
    if (i < 0 || i >= this.length) throw new Error('oob');
    var l = i, bi = 0, bu = null;
    for (;;) {
        bu = this.buffers[bi];
        if (l < bu.length) {
            return {buf: bi, offset: l};
        } else {
            l -= bu.length;
        }
        bi++;
    }
};

Buffers.prototype.get = function get (i) {
    var pos = this.pos(i);

    return this.buffers[pos.buf].get(pos.offset);
};

Buffers.prototype.set = function set (i, b) {
    var pos = this.pos(i);

    return this.buffers[pos.buf].set(pos.offset, b);
};

Buffers.prototype.indexOf = function (needle, offset) {
    if ("string" === typeof needle) {
        needle = new Buffer(needle);
    } else if (needle instanceof Buffer) ; else {
        throw new Error('Invalid type for a search string');
    }

    if (!needle.length) {
        return 0;
    }

    if (!this.length) {
        return -1;
    }

    var i = 0, j = 0, match = 0, mstart, pos = 0;

    // start search from a particular point in the virtual buffer
    if (offset) {
        var p = this.pos(offset);
        i = p.buf;
        j = p.offset;
        pos = offset;
    }

    // for each character in virtual buffer
    for (;;) {
        while (j >= this.buffers[i].length) {
            j = 0;
            i++;

            if (i >= this.buffers.length) {
                // search string not found
                return -1;
            }
        }

        var char = this.buffers[i][j];

        if (char == needle[match]) {
            // keep track where match started
            if (match == 0) {
                mstart = {
                    i: i,
                    j: j,
                    pos: pos
                };
            }
            match++;
            if (match == needle.length) {
                // full match
                return mstart.pos;
            }
        } else if (match != 0) {
            // a partial match ended, go back to match starting position
            // this will continue the search at the next character
            i = mstart.i;
            j = mstart.j;
            pos = mstart.pos;
            match = 0;
        }

        j++;
        pos++;
    }
};

Buffers.prototype.toBuffer = function() {
    return this.slice();
};

Buffers.prototype.toString = function(encoding, start, end) {
    return this.slice(start, end).toString(encoding);
};

var debug$2 = __webpack_require__(/*! debug */ "./node_modules/ebml/node_modules/debug/src/browser.js")('ebml:encoder');

function encodeTag(tagId, tagData, end) {
  if (end === -1) {
    return buffers([tagId, Buffer.from('01ffffffffffffff', 'hex'), tagData]);
  }

  return buffers([tagId, Tools.writeVint(tagData.length), tagData]);
}
/**
 * Encodes a raw EBML stream
 * @class EbmlEncoder
 * @extends Transform
 */


var EbmlEncoder =
/*#__PURE__*/
function (_Transform) {
  _inherits(EbmlEncoder, _Transform);

  /**
   * @type {Buffer}
   * @property
   * @private
   */

  /**
   * @private
   * @property
   * @type {Boolean}
   */

  /**
   * @private
   * @property
   * @type {Array<Tag>}
   */
  function EbmlEncoder() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EbmlEncoder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EbmlEncoder).call(this, _objectSpread({}, options, {
      writableObjectMode: true
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mBuffer", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mCorked", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mStack", []);

    return _this;
  }

  _createClass(EbmlEncoder, [{
    key: "_transform",

    /**
     *
     * @param {[string, Tag]} chunk array of chunk data, starting with the tag
     * @param {string} enc the encoding type (not used)
     * @param {Function} done a callback method to call after the transformation
     */
    value: function _transform(chunk, enc, done) {
      var _chunk = _slicedToArray(chunk, 2),
          tag = _chunk[0],
          _chunk$ = _chunk[1],
          data = _chunk$.data,
          name = _chunk$.name,
          rest = _objectWithoutProperties(_chunk$, ["data", "name"]);

      if (debug$2.enabled) {
        debug$2("encode ".concat(tag, " ").concat(name));
      }

      switch (tag) {
        case 'start':
          this.startTag(name, _objectSpread({
            name: name,
            data: data
          }, rest));
          break;

        case 'tag':
          this.writeTag(name, data);
          break;

        case 'end':
          this.endTag();
          break;

        default:
          break;
      }

      done();
    }
    /**
     * @private
     * @param {Function} done callback function
     */

  }, {
    key: "flush",
    value: function flush() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      if (!this.buffer || this.corked) {
        if (debug$2.enabled) {
          debug$2('no buffer/nothing pending');
        }

        done();
        return;
      }

      if (debug$2.enabled) {
        debug$2("writing ".concat(this.buffer.length, " bytes"));
      } // console.info(`this.buffer.toBuffer = ${this.buffer.buffer}`);


      var chunk = Buffer.from(this.buffer);
      this.buffer = null;
      this.push(chunk);
      done();
    }
    /**
     * @private
     * @param {Buffer | Buffer[]} buffer
     */

  }, {
    key: "bufferAndFlush",
    value: function bufferAndFlush(buffer) {
      if (this.buffer) {
        this.buffer = Tools.concatenate(this.buffer, buffer);
      } else {
        this.buffer = buffers(buffer);
      }

      this.flush();
    }
  }, {
    key: "_flush",
    value: function _flush() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.flush(done);
    }
  }, {
    key: "_bufferAndFlush",
    value: function _bufferAndFlush(buffer) {
      this.bufferAndFlush(buffer);
    }
    /**
     * gets the ID of the type of tagName
     * @static
     * @param  {string} tagName to be looked up
     * @return {number}         A buffer containing the schema information
     */

  }, {
    key: "cork",
    value: function cork() {
      this.corked = true;
    }
  }, {
    key: "uncork",
    value: function uncork() {
      this.corked = false;
      this.flush();
    }
  }, {
    key: "writeTag",
    value: function writeTag(tagName, tagData) {
      var tagId = EbmlEncoder.getSchemaInfo(tagName);

      if (!tagId) {
        throw new Error("No schema entry found for ".concat(tagName));
      }

      if (tagData) {
        var data = encodeTag(tagId, tagData);

        if (this.stack.length > 0) {
          this.stack[this.stack.length - 1].children.push({
            data: data
          });
        } else {
          this.bufferAndFlush(data.buffer);
        }
      }
    }
    /**
     *
     * @param {String} tagName The name of the tag to start
     * @param {{end: Number}} info an information object with a `end` parameter
     */

  }, {
    key: "startTag",
    value: function startTag(tagName, _ref) {
      var end = _ref.end;
      var tagId = EbmlEncoder.getSchemaInfo(tagName);

      if (!tagId) {
        throw new Error("No schema entry found for ".concat(tagName));
      }

      var tag = {
        data: null,
        id: tagId,
        name: tagName,
        end: end,
        children: []
      };

      if (this.stack.length > 0) {
        this.stack[this.stack.length - 1].children.push(tag);
      }

      this.stack.push(tag);
    }
  }, {
    key: "endTag",
    value: function endTag() {
      var tag = this.stack.pop();
      var childTagDataBuffers = tag.children.map(function (child) {
        return child.data;
      });
      tag.data = encodeTag(tag.id, buffers(childTagDataBuffers), tag.end);

      if (this.stack.length < 1) {
        this.bufferAndFlush(tag.data.buffer);
      }

      this.end();
    }
  }, {
    key: "buffer",
    get: function get() {
      return this.mBuffer;
    },
    set: function set(buffer) {
      this.mBuffer = buffer;
    }
  }, {
    key: "corked",
    get: function get() {
      return this.mCorked;
    },
    set: function set(corked) {
      this.mCorked = corked;
    }
  }, {
    key: "stack",
    get: function get() {
      return this.mStack;
    },
    set: function set(stak) {
      this.mStack = stak;
    }
  }], [{
    key: "getSchemaInfo",
    value: function getSchemaInfo(tagName) {
      var tagId = Array.from(schema.keys()).find(function (str) {
        return schema.get(str).name === tagName;
      });

      if (tagId) {
        return tagId;
      }

      return null;
    }
  }]);

  return EbmlEncoder;
}(Transform);


//# sourceMappingURL=ebml.esm.js.map


/***/ }),

/***/ "./node_modules/ebml/node_modules/debug/src/browser.js":
/*!*************************************************************!*\
  !*** ./node_modules/ebml/node_modules/debug/src/browser.js ***!
  \*************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/ebml/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "./node_modules/ebml/node_modules/debug/src/debug.js":
/*!***********************************************************!*\
  !*** ./node_modules/ebml/node_modules/debug/src/debug.js ***!
  \***********************************************************/
/***/ ((module, exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
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



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
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

/***/ "./node_modules/int64-buffer/int64-buffer.js":
/*!***************************************************!*\
  !*** ./node_modules/int64-buffer/int64-buffer.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {

// int64-buffer.js

/*jshint -W018 */ // Confusing use of '!'.
/*jshint -W030 */ // Expected an assignment or function call and instead saw an expression.
/*jshint -W093 */ // Did you mean to return a conditional instead of an assignment?

var Uint64BE, Int64BE, Uint64LE, Int64LE;

!function(exports) {
  // constants

  var UNDEFINED = "undefined";
  var BUFFER = (UNDEFINED !== typeof Buffer) && Buffer;
  var UINT8ARRAY = (UNDEFINED !== typeof Uint8Array) && Uint8Array;
  var ARRAYBUFFER = (UNDEFINED !== typeof ArrayBuffer) && ArrayBuffer;
  var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
  var isArray = Array.isArray || _isArray;
  var BIT32 = 4294967296;
  var BIT24 = 16777216;

  // storage class

  var storage; // Array;

  // generate classes

  Uint64BE = factory("Uint64BE", true, true);
  Int64BE = factory("Int64BE", true, false);
  Uint64LE = factory("Uint64LE", false, true);
  Int64LE = factory("Int64LE", false, false);

  // class factory

  function factory(name, bigendian, unsigned) {
    var posH = bigendian ? 0 : 4;
    var posL = bigendian ? 4 : 0;
    var pos0 = bigendian ? 0 : 3;
    var pos1 = bigendian ? 1 : 2;
    var pos2 = bigendian ? 2 : 1;
    var pos3 = bigendian ? 3 : 0;
    var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
    var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
    var proto = Int64.prototype;
    var isName = "is" + name;
    var _isInt64 = "_" + isName;

    // properties
    proto.buffer = void 0;
    proto.offset = 0;
    proto[_isInt64] = true;

    // methods
    proto.toNumber = toNumber;
    proto.toString = toString;
    proto.toJSON = toNumber;
    proto.toArray = toArray;

    // add .toBuffer() method only when Buffer available
    if (BUFFER) proto.toBuffer = toBuffer;

    // add .toArrayBuffer() method only when Uint8Array available
    if (UINT8ARRAY) proto.toArrayBuffer = toArrayBuffer;

    // isUint64BE, isInt64BE
    Int64[isName] = isInt64;

    // CommonJS
    exports[name] = Int64;

    return Int64;

    // constructor
    function Int64(buffer, offset, value, raddix) {
      if (!(this instanceof Int64)) return new Int64(buffer, offset, value, raddix);
      return init(this, buffer, offset, value, raddix);
    }

    // isUint64BE, isInt64BE
    function isInt64(b) {
      return !!(b && b[_isInt64]);
    }

    // initializer
    function init(that, buffer, offset, value, raddix) {
      if (UINT8ARRAY && ARRAYBUFFER) {
        if (buffer instanceof ARRAYBUFFER) buffer = new UINT8ARRAY(buffer);
        if (value instanceof ARRAYBUFFER) value = new UINT8ARRAY(value);
      }

      // Int64BE() style
      if (!buffer && !offset && !value && !storage) {
        // shortcut to initialize with zero
        that.buffer = newArray(ZERO, 0);
        return;
      }

      // Int64BE(value, raddix) style
      if (!isValidBuffer(buffer, offset)) {
        var _storage = storage || Array;
        raddix = offset;
        value = buffer;
        offset = 0;
        buffer = (storage === BUFFER) ? BUFFER.alloc(8) : new _storage(8);
      }

      that.buffer = buffer;
      that.offset = offset |= 0;

      // Int64BE(buffer, offset) style
      if (UNDEFINED === typeof value) return;

      // Int64BE(buffer, offset, value, raddix) style
      if ("string" === typeof value) {
        fromString(buffer, offset, value, raddix || 10);
      } else if (isValidBuffer(value, raddix)) {
        fromArray(buffer, offset, value, raddix);
      } else if ("number" === typeof raddix) {
        writeInt32(buffer, offset + posH, value); // high
        writeInt32(buffer, offset + posL, raddix); // low
      } else if (value > 0) {
        fromPositive(buffer, offset, value); // positive
      } else if (value < 0) {
        fromNegative(buffer, offset, value); // negative
      } else {
        fromArray(buffer, offset, ZERO, 0); // zero, NaN and others
      }
    }

    function fromString(buffer, offset, str, raddix) {
      var pos = 0;
      var len = str.length;
      var high = 0;
      var low = 0;
      if (str[0] === "-") pos++;
      var sign = pos;
      while (pos < len) {
        var chr = parseInt(str[pos++], raddix);
        if (!(chr >= 0)) break; // NaN
        low = low * raddix + chr;
        high = high * raddix + Math.floor(low / BIT32);
        low %= BIT32;
      }
      if (sign) {
        high = ~high;
        if (low) {
          low = BIT32 - low;
        } else {
          high++;
        }
      }
      writeInt32(buffer, offset + posH, high);
      writeInt32(buffer, offset + posL, low);
    }

    function toNumber() {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      if (!unsigned) high |= 0; // a trick to get signed
      return high ? (high * BIT32 + low) : low;
    }

    function toString(radix) {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      var str = "";
      var sign = !unsigned && (high & 0x80000000);
      if (sign) {
        high = ~high;
        low = BIT32 - low;
      }
      radix = radix || 10;
      while (1) {
        var mod = (high % radix) * BIT32 + low;
        high = Math.floor(high / radix);
        low = Math.floor(mod / radix);
        str = (mod % radix).toString(radix) + str;
        if (!high && !low) break;
      }
      if (sign) {
        str = "-" + str;
      }
      return str;
    }

    function writeInt32(buffer, offset, value) {
      buffer[offset + pos3] = value & 255;
      value = value >> 8;
      buffer[offset + pos2] = value & 255;
      value = value >> 8;
      buffer[offset + pos1] = value & 255;
      value = value >> 8;
      buffer[offset + pos0] = value & 255;
    }

    function readInt32(buffer, offset) {
      return (buffer[offset + pos0] * BIT24) +
        (buffer[offset + pos1] << 16) +
        (buffer[offset + pos2] << 8) +
        buffer[offset + pos3];
    }
  }

  function toArray(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = null; // Array

    if (raw !== false && isArray(buffer)) {
      return (buffer.length === 8) ? buffer : buffer.slice(offset, offset + 8);
    }

    return newArray(buffer, offset);
  }

  function toBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = BUFFER;

    if (raw !== false && BUFFER.isBuffer(buffer)) {
      return (buffer.length === 8) ? buffer : buffer.slice(offset, offset + 8);
    }

    // Buffer.from(arraybuffer) available since Node v4.5.0
    // https://nodejs.org/en/blog/release/v4.5.0/
    return BUFFER.from(toArrayBuffer.call(this, raw));
  }

  function toArrayBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    var arrbuf = buffer.buffer;
    storage = UINT8ARRAY;

    // arrbuf.slice() ignores buffer.offset until Node v8.0.0
    if (raw !== false && !buffer.offset && (arrbuf instanceof ARRAYBUFFER)) {
      return (arrbuf.byteLength === 8) ? arrbuf : arrbuf.slice(offset, offset + 8);
    }

    var dest = new UINT8ARRAY(8);
    fromArray(dest, 0, buffer, offset);
    return dest.buffer;
  }

  function isValidBuffer(buffer, offset) {
    var len = buffer && buffer.length;
    offset |= 0;
    return len && (offset + 8 <= len) && ("string" !== typeof buffer[offset]);
  }

  function fromArray(destbuf, destoff, srcbuf, srcoff) {
    destoff |= 0;
    srcoff |= 0;
    for (var i = 0; i < 8; i++) {
      destbuf[destoff++] = srcbuf[srcoff++] & 255;
    }
  }

  function newArray(buffer, offset) {
    return Array.prototype.slice.call(buffer, offset, offset + 8);
  }

  function fromPositiveBE(buffer, offset, value) {
    var pos = offset + 8;
    while (pos > offset) {
      buffer[--pos] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeBE(buffer, offset, value) {
    var pos = offset + 8;
    value++;
    while (pos > offset) {
      buffer[--pos] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  function fromPositiveLE(buffer, offset, value) {
    var end = offset + 8;
    while (offset < end) {
      buffer[offset++] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeLE(buffer, offset, value) {
    var end = offset + 8;
    value++;
    while (offset < end) {
      buffer[offset++] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  // https://github.com/retrofox/is-array
  function _isArray(val) {
    return !!val && "[object Array]" == Object.prototype.toString.call(val);
  }

}( true && typeof exports.nodeName !== 'string' ? exports : (this || {}));


/***/ }),

/***/ "./node_modules/matroska-schema/schema.js":
/*!************************************************!*\
  !*** ./node_modules/matroska-schema/schema.js ***!
  \************************************************/
/***/ ((module) => {

module.exports = {
  byEbmlID: {
    0x80: {
      name: 'ChapterDisplay',
      level: 4,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contains all possible strings to use for the chapter display.',
      minver: 1,
      crc: false
    },
    0x83: {
      name: 'TrackType',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The `TrackType` defines the type of each frame found in the Track. The value **SHOULD** be stored on 1 octet.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x85: {
      name: 'ChapString',
      level: 5,
      type: '8',
      multiple: false,
      webm: true,
      description: 'Contains the string to use as the chapter atom.',
      mandatory: true,
      cppname: 'ChapterString',
      minver: 1,
      crc: false
    },
    0x86: {
      name: 'CodecID',
      level: 3,
      type: 's',
      multiple: false,
      webm: true,
      description: 'An ID corresponding to the codec, see [@?MatroskaCodec] for more info.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x88: {
      name: 'FlagDefault',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Set if that track (audio, video or subs) is eligible for automatic selection by the player; see (#default-track-selection) for more details.',
      mandatory: true,
      range: '0-1',
      cppname: 'TrackFlagDefault',
      minver: 1,
      default: '1',
      crc: false
    },
    0x89: {
      name: 'ChapterTrackUID',
      level: 5,
      type: 'u',
      multiple: true,
      description: 'UID of the Track to apply this chapter to. In the absence of a control track, choosing this chapter will select the listed Tracks and deselect unlisted tracks. Absence of this Element indicates that the Chapter **SHOULD** be applied to any currently used Tracks.',
      mandatory: true,
      range: 'not 0',
      cppname: 'ChapterTrackNumber',
      minver: 1,
      crc: false
    },
    0x8e: {
      name: 'Slices',
      level: 3,
      type: 'm',
      multiple: false,
      description: 'Contains slices description.',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x8f: {
      name: 'ChapterTrack',
      level: 4,
      type: 'm',
      multiple: false,
      description: 'List of tracks on which the chapter applies. If this Element is not present, all tracks apply',
      minver: 1,
      crc: false
    },
    0x91: {
      name: 'ChapterTimeStart',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Timestamp of the start of Chapter, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x92: {
      name: 'ChapterTimeEnd',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Timestamp of the end of Chapter timestamp excluded, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks). The value **MUST** be greater than or equal to the `ChapterTimeStart` of the same `ChapterAtom`.',
      minver: 1,
      crc: false
    },
    0x96: {
      name: 'CueRefTime',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'Timestamp of the referenced Block, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks).',
      mandatory: true,
      minver: 2,
      crc: false
    },
    0x97: {
      name: 'CueRefCluster',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'The Segment Position of the Cluster containing the referenced Block.',
      mandatory: true,
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x98: {
      name: 'ChapterFlagHidden',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if a chapter is hidden. Hidden chapters **SHOULD NOT** be available to the user interface (but still to Control Tracks; see (#chapterflaghidden) on Chapter flags).',
      mandatory: true,
      range: '0-1',
      minver: 1,
      default: '0',
      crc: false
    },
    0x9a: {
      name: 'FlagInterlaced',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Specify whether the video frames in this track are interlaced.',
      mandatory: true,
      cppname: 'VideoFlagInterlaced',
      minver: 2,
      default: '0',
      crc: false
    },
    0x9b: {
      name: 'BlockDuration',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The duration of the Block, expressed in Track Ticks; see (#timestamp-ticks). The BlockDuration Element can be useful at the end of a Track to define the duration of the last frame (as there is no subsequent Block available), or when there is a break in a track like for subtitle tracks.',
      minver: 1,
      crc: false
    },
    0x9c: {
      name: 'FlagLacing',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Set to 1 if the track **MAY** contain blocks using lacing. When set to 0 all blocks **MUST** have their lacing flags set to No lacing; see (#block-lacing) on Block Lacing.',
      mandatory: true,
      range: '0-1',
      cppname: 'TrackFlagLacing',
      minver: 1,
      default: '1',
      crc: false
    },
    0x9d: {
      name: 'FieldOrder',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'Specify the field ordering of video frames in this track.',
      mandatory: true,
      cppname: 'VideoFieldOrder',
      minver: 4,
      default: '2',
      crc: false
    },
    0x9f: {
      name: 'Channels',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Numbers of channels in the track.',
      mandatory: true,
      range: 'not 0',
      cppname: 'AudioChannels',
      minver: 1,
      default: '1',
      crc: false
    },
    0xa0: {
      name: 'BlockGroup',
      level: 2,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Basic container of information containing a single Block and information specific to that Block.',
      minver: 1,
      crc: false
    },
    0xa1: {
      name: 'Block',
      level: 3,
      type: 'b',
      multiple: false,
      webm: true,
      description: 'Block containing the actual data to be rendered and a timestamp relative to the Cluster Timestamp; see (#block-structure) on Block Structure.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xa2: {
      name: 'BlockVirtual',
      level: 3,
      type: 'b',
      multiple: false,
      description: 'A Block with no data. It must be stored in the stream at the place the real Block would be in display order. ',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0xa3: {
      name: 'SimpleBlock',
      level: 2,
      type: 'b',
      multiple: true,
      webm: true,
      description: 'Similar to Block, see (#block-structure), but without all the extra information, mostly used to reduced overhead when no extra feature is needed; see (#simpleblock-structure) on SimpleBlock Structure.',
      minver: 2,
      divx: true,
      crc: false
    },
    0xa4: {
      name: 'CodecState',
      level: 3,
      type: 'b',
      multiple: false,
      description: 'The new codec state to use. Data interpretation is private to the codec. This information **SHOULD** always be referenced by a seek entry.',
      minver: 2,
      crc: false
    },
    0xa5: {
      name: 'BlockAdditional',
      level: 5,
      type: 'b',
      multiple: false,
      webm: true,
      description: 'Interpreted by the codec as it wishes (using the BlockAddID).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xa6: {
      name: 'BlockMore',
      level: 4,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contain the BlockAdditional and some parameters.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xa7: {
      name: 'Position',
      level: 2,
      type: 'u',
      multiple: false,
      description: 'The Segment Position of the Cluster in the Segment (0 in live streams). It might help to resynchronise offset on damaged streams.',
      cppname: 'ClusterPosition',
      minver: 1,
      maxver: 4,
      crc: false
    },
    0xaa: {
      name: 'CodecDecodeAll',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if the codec can decode potentially damaged data.',
      mandatory: true,
      range: '0-1',
      minver: 1,
      maxver: 0,
      default: '1',
      crc: false
    },
    0xab: {
      name: 'PrevSize',
      level: 2,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Size of the previous Cluster, in octets. Can be useful for backward playing.',
      cppname: 'ClusterPrevSize',
      minver: 1,
      crc: false
    },
    0xae: {
      name: 'TrackEntry',
      level: 2,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Describes a track with all Elements.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xaf: {
      name: 'EncryptedBlock',
      level: 2,
      type: 'b',
      multiple: true,
      description: 'Similar to SimpleBlock, see (#simpleblock-structure), but the data inside the Block are Transformed (encrypt and/or signed).',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0xb0: {
      name: 'PixelWidth',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Width of the encoded video frames in pixels.',
      mandatory: true,
      range: 'not 0',
      cppname: 'VideoPixelWidth',
      minver: 1,
      crc: false
    },
    0xb2: {
      name: 'CueDuration',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: "The duration of the block, expressed in Segment Ticks which is based on TimestampScale; see (#timestamp-ticks). If missing, the track's DefaultDuration does not apply and no duration information is available in terms of the cues.",
      minver: 4,
      crc: false
    },
    0xb3: {
      name: 'CueTime',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Absolute timestamp of the seek point, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xb5: {
      name: 'SamplingFrequency',
      level: 4,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Sampling frequency in Hz.',
      mandatory: true,
      range: '> 0x0p+0',
      cppname: 'AudioSamplingFreq',
      minver: 1,
      default: '0x1.f4p+12',
      crc: false
    },
    0xb6: {
      name: 'ChapterAtom',
      level: 3,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contains the atom information to use as the chapter atom (apply to all tracks).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xb7: {
      name: 'CueTrackPositions',
      level: 3,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contain positions for different tracks corresponding to the timestamp.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xb9: {
      name: 'FlagEnabled',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Set to 1 if the track is usable. It is possible to turn a not usable track into a usable track using chapter codecs or control tracks.',
      mandatory: true,
      range: '0-1',
      cppname: 'TrackFlagEnabled',
      minver: 2,
      default: '1',
      crc: false
    },
    0xba: {
      name: 'PixelHeight',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Height of the encoded video frames in pixels.',
      mandatory: true,
      range: 'not 0',
      cppname: 'VideoPixelHeight',
      minver: 1,
      crc: false
    },
    0xbb: {
      name: 'CuePoint',
      level: 2,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contains all information relative to a seek point in the Segment.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xbf: {
      name: 'CRC-32',
      level: -1,
      type: 'b',
      multiple: true,
      description: "The CRC is computed on all the data of the Master element it's in. The CRC element should be the first in it's parent master for easier reading. All level 1 elements should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian.",
      minver: 1,
      crc: true,
      webm: false
    },
    0xc0: {
      name: 'TrickTrackUID',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The TrackUID of the Smooth FF/RW video in the paired EBML structure corresponding to this video track. See [@?DivXTrickTrack].',
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0xc1: {
      name: 'TrickTrackSegmentUID',
      level: 3,
      type: 'b',
      multiple: false,
      description: 'The SegmentUID of the Segment containing the track identified by TrickTrackUID. See [@?DivXTrickTrack].',
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0xc4: {
      name: 'TrickMasterTrackSegmentUID',
      level: 3,
      type: 'b',
      multiple: false,
      description: 'The SegmentUID of the Segment containing the track identified by MasterTrackUID. See [@?DivXTrickTrack].',
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0xc6: {
      name: 'TrickTrackFlag',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if this video track is a Smooth FF/RW track. If set to 1, MasterTrackUID and MasterTrackSegUID should must be present and BlockGroups for this track must contain ReferenceFrame structures. Otherwise, TrickTrackUID and TrickTrackSegUID must be present if this track has a corresponding Smooth FF/RW track. See [@?DivXTrickTrack].',
      minver: 0,
      maxver: 0,
      default: '0',
      divx: true,
      crc: false
    },
    0xc7: {
      name: 'TrickMasterTrackUID',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The TrackUID of the video track in the paired EBML structure that corresponds to this Smooth FF/RW track. See [@?DivXTrickTrack].',
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0xc8: {
      name: 'ReferenceFrame',
      level: 3,
      type: 'm',
      multiple: false,
      description: 'Contains information about the last reference frame. See [@?DivXTrickTrack].',
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0xc9: {
      name: 'ReferenceOffset',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'The relative offset, in bytes, from the previous BlockGroup element for this Smooth FF/RW video track to the containing BlockGroup element. See [@?DivXTrickTrack].',
      mandatory: true,
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0xca: {
      name: 'ReferenceTimestamp',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'The timestamp of the BlockGroup pointed to by ReferenceOffset, expressed in Track Ticks; see (#timestamp-ticks). See [@?DivXTrickTrack].',
      mandatory: true,
      cppname: 'ReferenceTimeCode',
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0xcb: {
      name: 'BlockAdditionID',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'The ID of the BlockAdditional Element (0 is the main Block).',
      cppname: 'SliceBlockAddID',
      minver: 0,
      maxver: 0,
      default: '0',
      crc: false
    },
    0xcc: {
      name: 'LaceNumber',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'The reverse number of the frame in the lace (0 is the last frame, 1 is the next to last, etc.). Being able to interpret this Element is not required for playback.',
      cppname: 'SliceLaceNumber',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0xcd: {
      name: 'FrameNumber',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'The number of the frame to generate from this lace with this delay (allow you to generate many frames from the same Block/Frame).',
      cppname: 'SliceFrameNumber',
      minver: 0,
      maxver: 0,
      default: '0',
      crc: false
    },
    0xce: {
      name: 'Delay',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'The delay to apply to the Element, expressed in Track Ticks; see (#timestamp-ticks).',
      cppname: 'SliceDelay',
      minver: 0,
      maxver: 0,
      default: '0',
      crc: false
    },
    0xcf: {
      name: 'SliceDuration',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'The duration to apply to the Element, expressed in Track Ticks; see (#timestamp-ticks).',
      minver: 0,
      maxver: 0,
      default: '0',
      crc: false
    },
    0xd7: {
      name: 'TrackNumber',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The track number as used in the Block Header.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0xdb: {
      name: 'CueReference',
      level: 4,
      type: 'm',
      multiple: true,
      description: 'The Clusters containing the referenced Blocks.',
      minver: 2,
      crc: false
    },
    0xe0: {
      name: 'Video',
      level: 3,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Video settings.',
      cppname: 'TrackVideo',
      minver: 1,
      crc: false
    },
    0xe1: {
      name: 'Audio',
      level: 3,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Audio settings.',
      cppname: 'TrackAudio',
      minver: 1,
      crc: false
    },
    0xe2: {
      name: 'TrackOperation',
      level: 3,
      type: 'm',
      multiple: false,
      description: 'Operation that needs to be applied on tracks to create this virtual track. For more details look at (#track-operation).',
      minver: 3,
      crc: false
    },
    0xe3: {
      name: 'TrackCombinePlanes',
      level: 4,
      type: 'm',
      multiple: false,
      description: 'Contains the list of all video plane tracks that need to be combined to create this 3D track',
      minver: 3,
      crc: false
    },
    0xe4: {
      name: 'TrackPlane',
      level: 5,
      type: 'm',
      multiple: true,
      description: 'Contains a video plane track that need to be combined to create this 3D track',
      mandatory: true,
      minver: 3,
      crc: false
    },
    0xe5: {
      name: 'TrackPlaneUID',
      level: 6,
      type: 'u',
      multiple: false,
      description: 'The trackUID number of the track representing the plane.',
      mandatory: true,
      range: 'not 0',
      minver: 3,
      crc: false
    },
    0xe6: {
      name: 'TrackPlaneType',
      level: 6,
      type: 'u',
      multiple: false,
      description: 'The kind of plane this track corresponds to.',
      mandatory: true,
      minver: 3,
      crc: false
    },
    0xe7: {
      name: 'Timestamp',
      level: 2,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Absolute timestamp of the cluster, expressed in Segment Ticks which is based on TimestampScale; see (#timestamp-ticks).',
      mandatory: true,
      cppname: 'ClusterTimecode',
      minver: 1,
      crc: false
    },
    0xe8: {
      name: 'TimeSlice',
      level: 4,
      type: 'm',
      multiple: true,
      description: 'Contains extra time information about the data contained in the Block. Being able to interpret this Element is not required for playback.',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0xe9: {
      name: 'TrackJoinBlocks',
      level: 4,
      type: 'm',
      multiple: false,
      description: 'Contains the list of all tracks whose Blocks need to be combined to create this virtual track',
      minver: 3,
      crc: false
    },
    0xea: {
      name: 'CueCodecState',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'The Segment Position ((#segment-position)) of the Codec State corresponding to this Cue Element. 0 means that the data is taken from the initial Track Entry.',
      mandatory: true,
      minver: 2,
      default: '0',
      crc: false
    },
    0xeb: {
      name: 'CueRefCodecState',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'The Segment Position of the Codec State corresponding to this referenced Element. 0 means that the data is taken from the initial Track Entry.',
      minver: 0,
      maxver: 0,
      default: '0',
      crc: false
    },
    0xec: {
      name: 'Void',
      level: -1,
      type: 'b',
      multiple: true,
      description: 'Used to void damaged data, to avoid unexpected behaviors when using damaged data. The content is discarded. Also used to reserve space in a sub-element for later use.',
      minver: 1,
      crc: false
    },
    0xed: {
      name: 'TrackJoinUID',
      level: 5,
      type: 'u',
      multiple: true,
      description: 'The trackUID number of a track whose blocks are used to create this virtual track.',
      mandatory: true,
      range: 'not 0',
      minver: 3,
      crc: false
    },
    0xee: {
      name: 'BlockAddID',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'An ID to identify how to interpret the BlockAdditional data; see Codec BlockAdditions section of [@?MatroskaCodec] for more information. A value of 1 indicates that the meaning of the BlockAdditional data is defined by the codec. Any other value indicates the meaning of the BlockAdditional data is found in the BlockAddIDType found in the TrackEntry.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      default: '1',
      crc: false
    },
    0xf0: {
      name: 'CueRelativePosition',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The relative position inside the Cluster of the referenced SimpleBlock or BlockGroup with 0 being the first possible position for an Element inside that Cluster.',
      minver: 4,
      crc: false
    },
    0xf1: {
      name: 'CueClusterPosition',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The Segment Position ((#segment-position)) of the Cluster containing the associated Block.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0xf7: {
      name: 'CueTrack',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The track for which a position is given.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0xfa: {
      name: 'ReferencePriority',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'This frame is referenced and has the specified cache priority. In cache only a frame of the same or higher priority can replace this frame. A value of 0 means the frame is not referenced.',
      mandatory: true,
      minver: 1,
      default: '0',
      crc: false
    },
    0xfb: {
      name: 'ReferenceBlock',
      level: 3,
      type: 'i',
      multiple: true,
      webm: true,
      description: 'A timestamp value, relative to the timestamp of the Block in this BlockGroup, expressed in Track Ticks; see (#timestamp-ticks). This is used to reference other frames necessary to decode this frame. The relative value **SHOULD** correspond to a valid `Block` this `Block` depends on. Historically Matroska Writer didn\'t write the actual `Block(s)` this `Block` depends on, but *some* `Block` in the past.  The value "0" **MAY** also be used to signify this `Block` cannot be decoded on its own, but without knownledge of which `Block` is necessary. In this case, other `ReferenceBlock` **MUST NOT** be found in the same `BlockGroup`.  If the `BlockGroup` doesn\'t have any `ReferenceBlock` element, then the `Block` it contains can be decoded without using any other `Block` data.',
      minver: 1,
      crc: false
    },
    0xfd: {
      name: 'ReferenceVirtual',
      level: 3,
      type: 'i',
      multiple: false,
      description: 'The Segment Position of the data that would otherwise be in position of the virtual block.',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x41a4: {
      name: 'BlockAddIDName',
      level: 4,
      type: 's',
      multiple: false,
      description: 'A human-friendly name describing the type of BlockAdditional data, as defined by the associated Block Additional Mapping.',
      minver: 4,
      crc: false
    },
    0x41e4: {
      name: 'BlockAdditionMapping',
      level: 3,
      type: 'm',
      multiple: true,
      description: 'Contains elements that extend the track format, by adding content either to each frame, with BlockAddID ((#blockaddid-element)), or to the track as a whole with BlockAddIDExtraData.',
      minver: 4,
      crc: false
    },
    0x41e7: {
      name: 'BlockAddIDType',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'Stores the registered identifier of the Block Additional Mapping to define how the BlockAdditional data should be handled.',
      mandatory: true,
      minver: 4,
      default: '0',
      crc: false
    },
    0x41ed: {
      name: 'BlockAddIDExtraData',
      level: 4,
      type: 'b',
      multiple: false,
      description: 'Extra binary data that the BlockAddIDType can use to interpret the BlockAdditional data. The interpretation of the binary data depends on the BlockAddIDType value and the corresponding Block Additional Mapping.',
      minver: 4,
      crc: false
    },
    0x41f0: {
      name: 'BlockAddIDValue',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'If the track format extension needs content beside frames, the value refers to the BlockAddID ((#blockaddid-element)), value being described.',
      range: '>=2',
      minver: 4,
      crc: false
    },
    0x4254: {
      name: 'ContentCompAlgo',
      level: 6,
      type: 'u',
      multiple: false,
      description: 'The compression algorithm used.',
      mandatory: true,
      minver: 1,
      default: '0',
      crc: false
    },
    0x4255: {
      name: 'ContentCompSettings',
      level: 6,
      type: 'b',
      multiple: false,
      description: 'Settings that might be needed by the decompressor. For Header Stripping (`ContentCompAlgo`=3), the bytes that were removed from the beginning of each frames of the track.',
      minver: 1,
      crc: false
    },
    0x4281: {
      name: 'DocTypeExtension',
      level: 1,
      type: 'm',
      multiple: true,
      description: "A DocTypeExtension adds extra Elements to the main DocType+DocTypeVersion\ttuple it's attached to. An EBML Reader **MAY** know these extra Elements and how to use them. A DocTypeExtension **MAY** be used to iterate between\texperimental Elements before they are integrated into a regular\tDocTypeVersion. Reading one DocTypeExtension version of a DocType+DocTypeVersion tuple doesn't imply one should be able to read upper versions of this DocTypeExtension.",
      minver: 1,
      crc: false
    },
    0x4282: {
      name: 'DocType',
      level: 1,
      type: 's',
      multiple: true,
      description: "A string that describes the type of document that follows this EBML header, for example 'matroska' or 'webm'.",
      mandatory: true,
      minver: 1,
      crc: false,
      default: 'matroska'
    },
    0x4283: {
      name: 'DocTypeExtensionName',
      level: 2,
      type: 's',
      multiple: false,
      description: 'The name of the DocTypeExtension to differentiate it from other DocTypeExtensions of the same DocType+DocTypeVersion tuple. A DocTypeExtensionName value **MUST** be unique within the EBML Header.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x4284: {
      name: 'DocTypeExtensionVersion',
      level: 2,
      type: 'u',
      multiple: false,
      description: 'The version of the DocTypeExtension. Different DocTypeExtensionVersion values of the same DocType + DocTypeVersion + DocTypeExtensionName tuple **MAY** contain completely different sets of extra Elements. An EBML Reader **MAY** support multiple versions\tof the same tuple, only one version of the tuple, or not support the tuple at all.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0x4285: {
      name: 'DocTypeReadVersion',
      level: 1,
      type: 'u',
      multiple: false,
      description: 'The minimum DocType version an interpreter has to support to read this file.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      default: '1',
      crc: false
    },
    0x4286: {
      name: 'EBMLVersion',
      level: 1,
      type: 'u',
      multiple: false,
      description: 'The version of EBML parser used to create the file.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      default: '1',
      crc: false
    },
    0x4287: {
      name: 'DocTypeVersion',
      level: 1,
      type: 'u',
      multiple: false,
      description: 'The version of DocType interpreter used to create the file.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      default: '1',
      crc: false
    },
    0x42f2: {
      name: 'EBMLMaxIDLength',
      level: 1,
      type: 'u',
      multiple: false,
      mandatory: true,
      range: '>=4',
      minver: 1,
      default: '4',
      crc: false,
      description: "The maximum length of the IDs you'll find in this file (4 or less in Matroska)."
    },
    0x42f3: {
      name: 'EBMLMaxSizeLength',
      level: 1,
      type: 'u',
      multiple: false,
      mandatory: true,
      range: 'not 0',
      minver: 1,
      default: '8',
      crc: false,
      description: "The maximum length of the sizes you'll find in this file (8 or less in Matroska). This does not override the element size indicated at the beginning of an element. Elements that have an indicated size which is larger than what is allowed by EBMLMaxSizeLength shall be considered invalid."
    },
    0x42f7: {
      name: 'EBMLReadVersion',
      level: 1,
      type: 'u',
      multiple: false,
      description: 'The minimum EBML version a parser has to support to read this file.',
      mandatory: true,
      range: '1',
      minver: 1,
      default: '1',
      crc: false
    },
    0x437c: {
      name: 'ChapLanguage',
      level: 5,
      type: 's',
      multiple: true,
      webm: true,
      description: 'A language corresponding to the string, in the Matroska languages form; see (#language-codes) on language codes. This Element **MUST** be ignored if a ChapLanguageBCP47 Element is used within the same ChapterDisplay Element.',
      mandatory: true,
      cppname: 'ChapterLanguage',
      minver: 1,
      default: 'eng',
      crc: false
    },
    0x437d: {
      name: 'ChapLanguageBCP47',
      level: 5,
      type: 's',
      multiple: true,
      description: 'A language corresponding to the ChapString, in the [@!BCP47] form; see (#language-codes) on language codes. If a ChapLanguageBCP47 Element is used, then any ChapLanguage and ChapCountry Elements used in the same ChapterDisplay **MUST** be ignored.',
      cppname: 'ChapLanguageIETF',
      minver: 4,
      crc: false
    },
    0x437e: {
      name: 'ChapCountry',
      level: 5,
      type: 's',
      multiple: true,
      webm: true,
      description: 'A country corresponding to the string, in the Matroska countries form; see (#country-codes) on country codes. This Element **MUST** be ignored if a ChapLanguageBCP47 Element is used within the same ChapterDisplay Element.',
      cppname: 'ChapterCountry',
      minver: 1,
      crc: false
    },
    0x4444: {
      name: 'SegmentFamily',
      level: 2,
      type: 'b',
      multiple: true,
      description: 'A unique ID that all Segments of a Linked Segment **MUST** share (128 bits). It is equivalent to a UUID v4 [@!RFC4122] with all bits randomly (or pseudo-randomly) chosen. An actual UUID v4 value, where some bits are not random, **MAY** also be used.',
      minver: 1,
      crc: false
    },
    0x4461: {
      name: 'DateUTC',
      level: 2,
      type: 'd',
      multiple: false,
      webm: true,
      description: 'The date and time that the Segment was created by the muxing application or library.',
      minver: 1,
      crc: false
    },
    0x447a: {
      name: 'TagLanguage',
      level: 4,
      type: 's',
      multiple: false,
      webm: true,
      description: 'Specifies the language of the tag specified, in the Matroska languages form; see (#language-codes) on language codes. This Element **MUST** be ignored if the TagLanguageBCP47 Element is used within the same SimpleTag Element.',
      mandatory: true,
      cppname: 'TagLangue',
      minver: 1,
      default: 'und',
      crc: false
    },
    0x447b: {
      name: 'TagLanguageBCP47',
      level: 4,
      type: 's',
      multiple: false,
      description: 'The language used in the TagString, in the [@!BCP47] form; see (#language-codes) on language codes. If this Element is used, then any TagLanguage Elements used in the same SimpleTag **MUST** be ignored.',
      cppname: 'TagLanguageIETF',
      minver: 4,
      crc: false
    },
    0x4484: {
      name: 'TagDefault',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'A boolean value to indicate if this is the default/original language to use for the given tag.',
      mandatory: true,
      range: '0-1',
      minver: 1,
      default: '1',
      crc: false
    },
    0x4485: {
      name: 'TagBinary',
      level: 4,
      type: 'b',
      multiple: false,
      webm: true,
      description: 'The values of the Tag, if it is binary. Note that this cannot be used in the same SimpleTag as TagString.',
      minver: 1,
      crc: false
    },
    0x4487: {
      name: 'TagString',
      level: 4,
      type: '8',
      multiple: false,
      webm: true,
      description: 'The value of the Tag.',
      minver: 1,
      crc: false
    },
    0x4489: {
      name: 'Duration',
      level: 2,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Duration of the Segment, expressed in Segment Ticks which is based on TimestampScale; see (#timestamp-ticks).',
      range: '> 0x0p+0',
      minver: 1,
      crc: false
    },
    0x44b4: {
      name: 'TagDefaultBogus',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'A variant of the TagDefault element with a bogus Element ID; see (#tagdefault-element).',
      mandatory: true,
      range: '0-1',
      minver: 0,
      maxver: 0,
      default: '1',
      crc: false
    },
    0x450d: {
      name: 'ChapProcessPrivate',
      level: 5,
      type: 'b',
      multiple: false,
      description: 'Some optional data attached to the ChapProcessCodecID information. For ChapProcessCodecID = 1, it is the "DVD level" equivalent; see (#menu-features) on DVD menus.',
      cppname: 'ChapterProcessPrivate',
      minver: 1,
      crc: false
    },
    0x4520: {
      name: 'EditionDisplay',
      level: 3,
      type: 'm',
      multiple: true,
      description: 'Contains a possible string to use for the edition display for the given languages.',
      minver: 5,
      crc: false
    },
    0x4521: {
      name: 'EditionString',
      level: 4,
      type: '8',
      multiple: false,
      description: 'Contains the string to use as the edition name.',
      mandatory: true,
      minver: 5,
      crc: false
    },
    0x4588: {
      name: 'ChapterSkipType',
      level: 4,
      type: 'u',
      multiple: false,
      webm: false,
      description: "Indicate what type of content the ChapterAtom contains and might be skipped. It can be used to automatically skip content based on the type. If a `ChapterAtom` is inside a `ChapterAtom` that has a `ChapterSkipType` set, it **MUST NOT** have a `ChapterSkipType` or have a `ChapterSkipType` with the same value as it's parent `ChapterAtom`. If the `ChapterAtom` doesn't contain a `ChapterTimeEnd`, the value of the `ChapterSkipType` is only valid until the next `ChapterAtom` with a `ChapterSkipType` value or the end of the file. ",
      minver: 5,
      crc: false
    },
    0x4598: {
      name: 'ChapterFlagEnabled',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if the chapter is enabled. It can be enabled/disabled by a Control Track. When disabled, the movie **SHOULD** skip all the content between the TimeStart and TimeEnd of this chapter; see (#chapter-flags) on Chapter flags.',
      mandatory: true,
      range: '0-1',
      minver: 1,
      default: '1',
      crc: false
    },
    0x45a3: {
      name: 'TagName',
      level: 4,
      type: '8',
      multiple: false,
      webm: true,
      description: 'The name of the Tag that is going to be stored.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x45b9: {
      name: 'EditionEntry',
      level: 2,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contains all information about a Segment edition.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x45bc: {
      name: 'EditionUID',
      level: 3,
      type: 'u',
      multiple: false,
      description: "A unique ID to identify the edition. It's useful for tagging an edition.",
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0x45bd: {
      name: 'EditionFlagHidden',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if an edition is hidden. Hidden editions **SHOULD NOT** be available to the user interface (but still to Control Tracks; see (#chapter-flags) on Chapter flags).',
      mandatory: true,
      range: '0-1',
      minver: 1,
      default: '0',
      crc: false
    },
    0x45db: {
      name: 'EditionFlagDefault',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if the edition **SHOULD** be used as the default one.',
      mandatory: true,
      range: '0-1',
      minver: 1,
      default: '0',
      crc: false
    },
    0x45dd: {
      name: 'EditionFlagOrdered',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if the chapters can be defined multiple times and the order to play them is enforced; see (#editionflagordered).',
      mandatory: true,
      range: '0-1',
      minver: 1,
      default: '0',
      crc: false
    },
    0x45e4: {
      name: 'EditionLanguageIETF',
      level: 4,
      type: 's',
      multiple: true,
      description: 'One language corresponding to the EditionString, in the [@!BCP47] form; see (#language-codes) on language codes.',
      minver: 5,
      crc: false
    },
    0x465c: {
      name: 'FileData',
      level: 3,
      type: 'b',
      multiple: false,
      description: 'The data of the file.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x4660: {
      name: 'FileMediaType',
      level: 3,
      type: 's',
      multiple: false,
      description: 'Media type of the file following the [@!RFC6838] format.',
      mandatory: true,
      cppname: 'MimeType',
      minver: 1,
      crc: false
    },
    0x4661: {
      name: 'FileUsedStartTime',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The timestamp at which this optimized font attachment comes into context, expressed in Segment Ticks which is based on TimestampScale. See [@?DivXWorldFonts].',
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0x4662: {
      name: 'FileUsedEndTime',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The timestamp at which this optimized font attachment goes out of context, expressed in Segment Ticks which is based on TimestampScale. See [@?DivXWorldFonts].',
      minver: 0,
      maxver: 0,
      divx: true,
      crc: false
    },
    0x466e: {
      name: 'FileName',
      level: 3,
      type: '8',
      multiple: false,
      description: 'Filename of the attached file.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x4675: {
      name: 'FileReferral',
      level: 3,
      type: 'b',
      multiple: false,
      description: 'A binary value that a track/codec can refer to when the attachment is needed.',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x467e: {
      name: 'FileDescription',
      level: 3,
      type: '8',
      multiple: false,
      description: 'A human-friendly name for the attached file.',
      minver: 1,
      crc: false
    },
    0x46ae: {
      name: 'FileUID',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Unique ID representing the file, as random as possible.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0x47e1: {
      name: 'ContentEncAlgo',
      level: 6,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The encryption algorithm used.',
      mandatory: true,
      minver: 1,
      default: '0',
      crc: false
    },
    0x47e2: {
      name: 'ContentEncKeyID',
      level: 6,
      type: 'b',
      multiple: false,
      webm: true,
      description: 'For public key algorithms this is the ID of the public key the the data was encrypted with.',
      minver: 1,
      crc: false
    },
    0x47e3: {
      name: 'ContentSignature',
      level: 6,
      type: 'b',
      multiple: false,
      description: 'A cryptographic signature of the contents.',
      minver: 1,
      maxver: 0,
      crc: false
    },
    0x47e4: {
      name: 'ContentSigKeyID',
      level: 6,
      type: 'b',
      multiple: false,
      description: 'This is the ID of the private key the data was signed with.',
      minver: 1,
      maxver: 0,
      crc: false
    },
    0x47e5: {
      name: 'ContentSigAlgo',
      level: 6,
      type: 'u',
      multiple: false,
      description: 'The algorithm used for the signature.',
      minver: 1,
      maxver: 0,
      default: '0',
      crc: false
    },
    0x47e6: {
      name: 'ContentSigHashAlgo',
      level: 6,
      type: 'u',
      multiple: false,
      description: 'The hash algorithm used for the signature.',
      minver: 1,
      maxver: 0,
      default: '0',
      crc: false
    },
    0x47e7: {
      name: 'ContentEncAESSettings',
      level: 6,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Settings describing the encryption algorithm used. If `ContentEncAlgo` != 5 this **MUST** be ignored.',
      minver: 4,
      crc: false
    },
    0x47e8: {
      name: 'AESSettingsCipherMode',
      level: 7,
      type: 'u',
      multiple: true,
      webm: true,
      description: 'The AES cipher mode used in the encryption.',
      mandatory: true,
      minver: 4,
      crc: false
    },
    0x4d80: {
      name: 'MuxingApp',
      level: 2,
      type: '8',
      multiple: false,
      webm: true,
      description: 'Muxing application or library (example: "libmatroska-0.4.3").',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x4dbb: {
      name: 'Seek',
      level: 2,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contains a single seek entry to an EBML Element.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x5031: {
      name: 'ContentEncodingOrder',
      level: 5,
      type: 'u',
      multiple: true,
      webm: true,
      description: 'Tells when this modification was used during encoding/muxing starting with 0 and counting upwards. The decoder/demuxer has to start with the highest order number it finds and work its way down. This value has to be unique over all ContentEncodingOrder Elements in the TrackEntry that contains this ContentEncodingOrder element.',
      mandatory: true,
      minver: 1,
      default: '0',
      crc: false
    },
    0x5032: {
      name: 'ContentEncodingScope',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: "A bit field that describes which Elements have been modified in this way. Values (big-endian) can be OR'ed.",
      mandatory: true,
      minver: 1,
      default: '1',
      crc: false
    },
    0x5033: {
      name: 'ContentEncodingType',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'A value describing what kind of transformation is applied.',
      mandatory: true,
      minver: 1,
      default: '0',
      crc: false
    },
    0x5034: {
      name: 'ContentCompression',
      level: 5,
      type: 'm',
      multiple: false,
      description: 'Settings describing the compression used. This Element **MUST** be present if the value of ContentEncodingType is 0 and absent otherwise. Each block **MUST** be decompressable even if no previous block is available in order not to prevent seeking.',
      minver: 1,
      crc: false
    },
    0x5035: {
      name: 'ContentEncryption',
      level: 5,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Settings describing the encryption used. This Element **MUST** be present if the value of `ContentEncodingType` is 1 (encryption) and **MUST** be ignored otherwise. A Matroska Player **MAY** support encryption.',
      minver: 1,
      crc: false
    },
    0x52f1: {
      name: 'Emphasis',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'Audio emphasis applied on audio samples. The player **MUST** apply the inverse emphasis to get the proper audio samples.',
      mandatory: true,
      minver: 5,
      default: '0',
      crc: false
    },
    0x535f: {
      name: 'CueRefNumber',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'Number of the referenced Block of Track X in the specified Cluster.',
      range: 'not 0',
      minver: 0,
      maxver: 0,
      default: '1',
      crc: false
    },
    0x536e: {
      name: 'Name',
      level: 3,
      type: '8',
      multiple: false,
      webm: true,
      description: 'A human-readable track name.',
      cppname: 'TrackName',
      minver: 1,
      crc: false
    },
    0x5378: {
      name: 'CueBlockNumber',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Number of the Block in the specified Cluster.',
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0x537f: {
      name: 'TrackOffset',
      level: 3,
      type: 'i',
      multiple: false,
      description: "A value to add to the Block's Timestamp, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks). This can be used to adjust the playback offset of a track.",
      minver: 0,
      maxver: 0,
      default: '0',
      crc: false
    },
    0x53ab: {
      name: 'SeekID',
      level: 3,
      type: 'b',
      multiple: false,
      webm: true,
      description: 'The binary EBML ID of a Top-Level Element.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x53ac: {
      name: 'SeekPosition',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The Segment Position ((#segment-position)) of a Top-Level Element.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x53b8: {
      name: 'StereoMode',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Stereo-3D video mode. There are some more details in (#multi-planar-and-3d-videos).',
      mandatory: true,
      cppname: 'VideoStereoMode',
      minver: 3,
      default: '0',
      crc: false
    },
    0x53b9: {
      name: 'OldStereoMode',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'Bogus StereoMode value used in old versions of libmatroska.',
      minver: 1,
      maxver: 2,
      crc: false
    },
    0x53c0: {
      name: 'AlphaMode',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Indicate whether the BlockAdditional Element with BlockAddID of "1" contains Alpha data, as defined by to the Codec Mapping for the `CodecID`. Undefined values **SHOULD NOT** be used as the behavior of known implementations is different (considered either as 0 or 1).',
      mandatory: true,
      cppname: 'VideoAlphaMode',
      minver: 3,
      default: '0',
      crc: false
    },
    0x54aa: {
      name: 'PixelCropBottom',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The number of video pixels to remove at the bottom of the image.',
      mandatory: true,
      cppname: 'VideoPixelCropBottom',
      minver: 1,
      default: '0',
      crc: false
    },
    0x54b0: {
      name: 'DisplayWidth',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Width of the video frames to display. Applies to the video frame after cropping (PixelCrop* Elements).',
      range: 'not 0',
      cppname: 'VideoDisplayWidth',
      minver: 1,
      crc: false
    },
    0x54b2: {
      name: 'DisplayUnit',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'How DisplayWidth & DisplayHeight are interpreted.',
      mandatory: true,
      cppname: 'VideoDisplayUnit',
      minver: 1,
      default: '0',
      crc: false
    },
    0x54b3: {
      name: 'AspectRatioType',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'Specify the possible modifications to the aspect ratio.',
      cppname: 'VideoAspectRatio',
      minver: 0,
      maxver: 0,
      default: '0',
      crc: false
    },
    0x54ba: {
      name: 'DisplayHeight',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Height of the video frames to display. Applies to the video frame after cropping (PixelCrop* Elements).',
      range: 'not 0',
      cppname: 'VideoDisplayHeight',
      minver: 1,
      crc: false
    },
    0x54bb: {
      name: 'PixelCropTop',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The number of video pixels to remove at the top of the image.',
      mandatory: true,
      cppname: 'VideoPixelCropTop',
      minver: 1,
      default: '0',
      crc: false
    },
    0x54cc: {
      name: 'PixelCropLeft',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The number of video pixels to remove on the left of the image.',
      mandatory: true,
      cppname: 'VideoPixelCropLeft',
      minver: 1,
      default: '0',
      crc: false
    },
    0x54dd: {
      name: 'PixelCropRight',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The number of video pixels to remove on the right of the image.',
      mandatory: true,
      cppname: 'VideoPixelCropRight',
      minver: 1,
      default: '0',
      crc: false
    },
    0x55aa: {
      name: 'FlagForced',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: "Applies only to subtitles. Set if that track is eligible for automatic selection by the player if it matches the user's language preference, even if the user's preferences would normally not enable subtitles with the selected audio track; this can be used for tracks containing only translations of foreign-language audio or onscreen text. See (#default-track-selection) for more details.",
      mandatory: true,
      range: '0-1',
      cppname: 'TrackFlagForced',
      minver: 1,
      default: '0',
      crc: false
    },
    0x55ab: {
      name: 'FlagHearingImpaired',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if and only if that track is suitable for users with hearing impairments.',
      range: '0-1',
      minver: 4,
      crc: false
    },
    0x55ac: {
      name: 'FlagVisualImpaired',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if and only if that track is suitable for users with visual impairments.',
      range: '0-1',
      minver: 4,
      crc: false
    },
    0x55ad: {
      name: 'FlagTextDescriptions',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if and only if that track contains textual descriptions of video content.',
      range: '0-1',
      minver: 4,
      crc: false
    },
    0x55ae: {
      name: 'FlagOriginal',
      level: 3,
      type: 'u',
      multiple: false,
      description: "Set to 1 if and only if that track is in the content's original language.",
      range: '0-1',
      minver: 4,
      crc: false
    },
    0x55af: {
      name: 'FlagCommentary',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'Set to 1 if and only if that track contains commentary.',
      range: '0-1',
      minver: 4,
      crc: false
    },
    0x55b0: {
      name: 'Colour',
      level: 4,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Settings describing the colour format.',
      cppname: 'VideoColour',
      minver: 4,
      crc: false
    },
    0x55b1: {
      name: 'MatrixCoefficients',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The Matrix Coefficients of the video used to derive luma and chroma values from red, green, and blue color primaries. For clarity, the value and meanings for MatrixCoefficients are adopted from Table 4 of ISO/IEC 23001-8:2016 or ITU-T H.273.',
      mandatory: true,
      cppname: 'VideoColourMatrix',
      minver: 4,
      default: '2',
      crc: false
    },
    0x55b2: {
      name: 'BitsPerChannel',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Number of decoded bits per channel. A value of 0 indicates that the BitsPerChannel is unspecified.',
      mandatory: true,
      cppname: 'VideoBitsPerChannel',
      minver: 4,
      default: '0',
      crc: false
    },
    0x55b3: {
      name: 'ChromaSubsamplingHorz',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The amount of pixels to remove in the Cr and Cb channels for every pixel not removed horizontally. Example: For video with 4:2:0 chroma subsampling, the ChromaSubsamplingHorz **SHOULD** be set to 1.',
      cppname: 'VideoChromaSubsampHorz',
      minver: 4,
      crc: false
    },
    0x55b4: {
      name: 'ChromaSubsamplingVert',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The amount of pixels to remove in the Cr and Cb channels for every pixel not removed vertically. Example: For video with 4:2:0 chroma subsampling, the ChromaSubsamplingVert **SHOULD** be set to 1.',
      cppname: 'VideoChromaSubsampVert',
      minver: 4,
      crc: false
    },
    0x55b5: {
      name: 'CbSubsamplingHorz',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The amount of pixels to remove in the Cb channel for every pixel not removed horizontally. This is additive with ChromaSubsamplingHorz. Example: For video with 4:2:1 chroma subsampling, the ChromaSubsamplingHorz **SHOULD** be set to 1 and CbSubsamplingHorz **SHOULD** be set to 1.',
      cppname: 'VideoCbSubsampHorz',
      minver: 4,
      crc: false
    },
    0x55b6: {
      name: 'CbSubsamplingVert',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The amount of pixels to remove in the Cb channel for every pixel not removed vertically. This is additive with ChromaSubsamplingVert.',
      cppname: 'VideoCbSubsampVert',
      minver: 4,
      crc: false
    },
    0x55b7: {
      name: 'ChromaSitingHorz',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'How chroma is subsampled horizontally.',
      mandatory: true,
      cppname: 'VideoChromaSitHorz',
      minver: 4,
      default: '0',
      crc: false
    },
    0x55b8: {
      name: 'ChromaSitingVert',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'How chroma is subsampled vertically.',
      mandatory: true,
      cppname: 'VideoChromaSitVert',
      minver: 4,
      default: '0',
      crc: false
    },
    0x55b9: {
      name: 'Range',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Clipping of the color ranges.',
      mandatory: true,
      cppname: 'VideoColourRange',
      minver: 4,
      default: '0',
      crc: false
    },
    0x55ba: {
      name: 'TransferCharacteristics',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The transfer characteristics of the video. For clarity, the value and meanings for TransferCharacteristics are adopted from Table 3 of ISO/IEC 23091-4 or ITU-T H.273.',
      mandatory: true,
      cppname: 'VideoColourTransferCharacter',
      minver: 4,
      default: '2',
      crc: false
    },
    0x55bb: {
      name: 'Primaries',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'The colour primaries of the video. For clarity, the value and meanings for Primaries are adopted from Table 2 of ISO/IEC 23091-4 or ITU-T H.273.',
      mandatory: true,
      cppname: 'VideoColourPrimaries',
      minver: 4,
      default: '2',
      crc: false
    },
    0x55bc: {
      name: 'MaxCLL',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Maximum brightness of a single pixel (Maximum Content Light Level) in candelas per square meter (cd/m^2^).',
      cppname: 'VideoColourMaxCLL',
      minver: 4,
      crc: false
    },
    0x55bd: {
      name: 'MaxFALL',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Maximum brightness of a single full frame (Maximum Frame-Average Light Level) in candelas per square meter (cd/m^2^).',
      cppname: 'VideoColourMaxFALL',
      minver: 4,
      crc: false
    },
    0x55d0: {
      name: 'MasteringMetadata',
      level: 5,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'SMPTE 2086 mastering data.',
      cppname: 'VideoColourMasterMeta',
      minver: 4,
      crc: false
    },
    0x55d1: {
      name: 'PrimaryRChromaticityX',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Red X chromaticity coordinate, as defined by [@!CIE-1931].',
      range: '0x0p+0-0x1p+0',
      cppname: 'VideoRChromaX',
      minver: 4,
      crc: false
    },
    0x55d2: {
      name: 'PrimaryRChromaticityY',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Red Y chromaticity coordinate, as defined by [@!CIE-1931].',
      range: '0x0p+0-0x1p+0',
      cppname: 'VideoRChromaY',
      minver: 4,
      crc: false
    },
    0x55d3: {
      name: 'PrimaryGChromaticityX',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Green X chromaticity coordinate, as defined by [@!CIE-1931].',
      range: '0x0p+0-0x1p+0',
      cppname: 'VideoGChromaX',
      minver: 4,
      crc: false
    },
    0x55d4: {
      name: 'PrimaryGChromaticityY',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Green Y chromaticity coordinate, as defined by [@!CIE-1931].',
      range: '0x0p+0-0x1p+0',
      cppname: 'VideoGChromaY',
      minver: 4,
      crc: false
    },
    0x55d5: {
      name: 'PrimaryBChromaticityX',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Blue X chromaticity coordinate, as defined by [@!CIE-1931].',
      range: '0x0p+0-0x1p+0',
      cppname: 'VideoBChromaX',
      minver: 4,
      crc: false
    },
    0x55d6: {
      name: 'PrimaryBChromaticityY',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Blue Y chromaticity coordinate, as defined by [@!CIE-1931].',
      range: '0x0p+0-0x1p+0',
      cppname: 'VideoBChromaY',
      minver: 4,
      crc: false
    },
    0x55d7: {
      name: 'WhitePointChromaticityX',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'White X chromaticity coordinate, as defined by [@!CIE-1931].',
      range: '0x0p+0-0x1p+0',
      cppname: 'VideoWhitePointChromaX',
      minver: 4,
      crc: false
    },
    0x55d8: {
      name: 'WhitePointChromaticityY',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'White Y chromaticity coordinate, as defined by [@!CIE-1931].',
      range: '0x0p+0-0x1p+0',
      cppname: 'VideoWhitePointChromaY',
      minver: 4,
      crc: false
    },
    0x55d9: {
      name: 'LuminanceMax',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Maximum luminance. Represented in candelas per square meter (cd/m^2^).',
      range: '>= 0x0p+0',
      cppname: 'VideoLuminanceMax',
      minver: 4,
      crc: false
    },
    0x55da: {
      name: 'LuminanceMin',
      level: 6,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Minimum luminance. Represented in candelas per square meter (cd/m^2^).',
      range: '>= 0x0p+0',
      cppname: 'VideoLuminanceMin',
      minver: 4,
      crc: false
    },
    0x55ee: {
      name: 'MaxBlockAdditionID',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The maximum value of BlockAddID ((#blockaddid-element)). A value 0 means there is no BlockAdditions ((#blockadditions-element)) for this track.',
      mandatory: true,
      minver: 1,
      default: '0',
      crc: false
    },
    0x5654: {
      name: 'ChapterStringUID',
      level: 4,
      type: '8',
      multiple: false,
      webm: true,
      description: 'A unique string ID to identify the Chapter. For example it is used as the storage for [@?WebVTT] cue identifier values.',
      minver: 3,
      crc: false
    },
    0x56aa: {
      name: 'CodecDelay',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'CodecDelay is The codec-built-in delay, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks). It represents the amount of codec samples that will be discarded by the decoder during playback. This timestamp value **MUST** be subtracted from each frame timestamp in order to get the timestamp that will be actually played. The value **SHOULD** be small so the muxing of tracks with the same actual timestamp are in the same Cluster.',
      mandatory: true,
      minver: 4,
      default: '0',
      crc: false
    },
    0x56bb: {
      name: 'SeekPreRoll',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'After a discontinuity, SeekPreRoll is the duration of the data the decoder **MUST** decode before the decoded data is valid, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks).',
      mandatory: true,
      minver: 4,
      default: '0',
      crc: false
    },
    0x5741: {
      name: 'WritingApp',
      level: 2,
      type: '8',
      multiple: false,
      webm: true,
      description: 'Writing application (example: "mkvmerge-0.3.3").',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x5854: {
      name: 'SilentTracks',
      level: 2,
      type: 'm',
      multiple: false,
      description: 'The list of tracks that are not used in that part of the stream. It is useful when using overlay tracks on seeking or to decide what track to use.',
      cppname: 'ClusterSilentTracks',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x58d7: {
      name: 'SilentTrackNumber',
      level: 3,
      type: 'u',
      multiple: true,
      description: 'One of the track number that are not used from now on in the stream. It could change later if not specified as silent in a further Cluster.',
      cppname: 'ClusterSilentTrackNumber',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x61a7: {
      name: 'AttachedFile',
      level: 2,
      type: 'm',
      multiple: true,
      description: 'An attached file.',
      mandatory: true,
      cppname: 'Attached',
      minver: 1,
      crc: false
    },
    0x6240: {
      name: 'ContentEncoding',
      level: 4,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Settings for one content encoding like compression or encryption.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x6264: {
      name: 'BitDepth',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Bits per sample, mostly used for PCM.',
      range: 'not 0',
      cppname: 'AudioBitDepth',
      minver: 1,
      crc: false
    },
    0x63a2: {
      name: 'CodecPrivate',
      level: 3,
      type: 'b',
      multiple: false,
      webm: true,
      description: 'Private data only known to the codec.',
      minver: 1,
      crc: false
    },
    0x63c0: {
      name: 'Targets',
      level: 3,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Specifies which other elements the metadata represented by the Tag applies to. If empty or omitted, then the Tag describes everything in the Segment.',
      mandatory: true,
      cppname: 'TagTargets',
      minver: 1,
      crc: false
    },
    0x63c3: {
      name: 'ChapterPhysicalEquiv',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'Specify the physical equivalent of this ChapterAtom like "DVD" (60) or "SIDE" (50); see (#physical-types) for a complete list of values.',
      minver: 1,
      crc: false
    },
    0x63c4: {
      name: 'TagChapterUID',
      level: 4,
      type: 'u',
      multiple: true,
      description: 'A unique ID to identify the Chapter(s) the tags belong to.',
      minver: 1,
      default: '0',
      crc: false
    },
    0x63c5: {
      name: 'TagTrackUID',
      level: 4,
      type: 'u',
      multiple: true,
      webm: true,
      description: 'A unique ID to identify the Track(s) the tags belong to.',
      minver: 1,
      default: '0',
      crc: false
    },
    0x63c6: {
      name: 'TagAttachmentUID',
      level: 4,
      type: 'u',
      multiple: true,
      description: 'A unique ID to identify the Attachment(s) the tags belong to.',
      minver: 1,
      default: '0',
      crc: false
    },
    0x63c9: {
      name: 'TagEditionUID',
      level: 4,
      type: 'u',
      multiple: true,
      description: 'A unique ID to identify the EditionEntry(s) the tags belong to.',
      minver: 1,
      default: '0',
      crc: false
    },
    0x63ca: {
      name: 'TargetType',
      level: 4,
      type: 's',
      multiple: false,
      webm: true,
      description: 'An informational string that can be used to display the logical level of the target like "ALBUM", "TRACK", "MOVIE", "CHAPTER", etc. ; see Section 6.4 of [@?MatroskaTags].',
      cppname: 'TagTargetType',
      minver: 1,
      crc: false
    },
    0x6532: {
      name: 'SignedElement',
      level: 2,
      type: 'b',
      multiple: true,
      webm: false,
      description: 'An element ID whose data will be used to compute the signature.',
      minver: 1,
      crc: false
    },
    0x6624: {
      name: 'TrackTranslate',
      level: 3,
      type: 'm',
      multiple: true,
      description: 'The mapping between this `TrackEntry` and a track value in the given Chapter Codec.',
      minver: 1,
      crc: false
    },
    0x66a5: {
      name: 'TrackTranslateTrackID',
      level: 4,
      type: 'b',
      multiple: false,
      description: 'The binary value used to represent this `TrackEntry` in the chapter codec data. The format depends on the `ChapProcessCodecID` used; see (#chapprocesscodecid-element).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x66bf: {
      name: 'TrackTranslateCodec',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'This `TrackTranslate` applies to this chapter codec of the given chapter edition(s); see (#chapprocesscodecid-element).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x66fc: {
      name: 'TrackTranslateEditionUID',
      level: 4,
      type: 'u',
      multiple: true,
      description: 'Specify a chapter edition UID on which this `TrackTranslate` applies.',
      minver: 1,
      crc: false
    },
    0x67c8: {
      name: 'SimpleTag',
      level: 3,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contains general information about the target.',
      mandatory: true,
      cppname: 'TagSimple',
      minver: 1,
      crc: false
    },
    0x68ca: {
      name: 'TargetTypeValue',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'A number to indicate the logical level of the target.',
      mandatory: true,
      cppname: 'TagTargetTypeValue',
      minver: 1,
      default: '50',
      crc: false
    },
    0x6911: {
      name: 'ChapProcessCommand',
      level: 5,
      type: 'm',
      multiple: true,
      description: 'Contains all the commands associated to the Atom.',
      cppname: 'ChapterProcessCommand',
      minver: 1,
      crc: false
    },
    0x6922: {
      name: 'ChapProcessTime',
      level: 6,
      type: 'u',
      multiple: false,
      description: 'Defines when the process command **SHOULD** be handled',
      mandatory: true,
      cppname: 'ChapterProcessTime',
      minver: 1,
      crc: false
    },
    0x6924: {
      name: 'ChapterTranslate',
      level: 2,
      type: 'm',
      multiple: true,
      description: 'The mapping between this `Segment` and a segment value in the given Chapter Codec.',
      minver: 1,
      crc: false
    },
    0x6933: {
      name: 'ChapProcessData',
      level: 6,
      type: 'b',
      multiple: false,
      description: 'Contains the command information. The data **SHOULD** be interpreted depending on the ChapProcessCodecID value. For ChapProcessCodecID = 1, the data correspond to the binary DVD cell pre/post commands; see (#menu-features) on DVD menus.',
      mandatory: true,
      cppname: 'ChapterProcessData',
      minver: 1,
      crc: false
    },
    0x6944: {
      name: 'ChapProcess',
      level: 4,
      type: 'm',
      multiple: true,
      description: 'Contains all the commands associated to the Atom.',
      cppname: 'ChapterProcess',
      minver: 1,
      crc: false
    },
    0x6955: {
      name: 'ChapProcessCodecID',
      level: 5,
      type: 'u',
      multiple: false,
      description: 'Contains the type of the codec used for the processing. A value of 0 means native Matroska processing (to be defined), a value of 1 means the DVD command set is used; see (#menu-features) on DVD menus. More codec IDs can be added later.',
      mandatory: true,
      cppname: 'ChapterProcessCodecID',
      minver: 1,
      default: '0',
      crc: false
    },
    0x69a5: {
      name: 'ChapterTranslateID',
      level: 3,
      type: 'b',
      multiple: false,
      description: 'The binary value used to represent this Segment in the chapter codec data. The format depends on the ChapProcessCodecID used; see (#chapprocesscodecid-element).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x69bf: {
      name: 'ChapterTranslateCodec',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'This `ChapterTranslate` applies to this chapter codec of the given chapter edition(s); see (#chapprocesscodecid-element).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x69fc: {
      name: 'ChapterTranslateEditionUID',
      level: 3,
      type: 'u',
      multiple: true,
      description: 'Specify a chapter edition UID on which this `ChapterTranslate` applies.',
      minver: 1,
      crc: false
    },
    0x6d80: {
      name: 'ContentEncodings',
      level: 3,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Settings for several content encoding mechanisms like compression or encryption.',
      minver: 1,
      crc: false
    },
    0x6de7: {
      name: 'MinCache',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The minimum number of frames a player should be able to cache during playback. If set to 0, the reference pseudo-cache system is not used.',
      mandatory: true,
      cppname: 'TrackMinCache',
      minver: 0,
      maxver: 0,
      default: '0',
      crc: false
    },
    0x6df8: {
      name: 'MaxCache',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The maximum cache size necessary to store referenced frames in and the current frame. 0 means no cache is needed.',
      cppname: 'TrackMaxCache',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x6e67: {
      name: 'ChapterSegmentUUID',
      level: 4,
      type: 'b',
      multiple: false,
      description: 'The SegmentUUID of another Segment to play during this chapter.',
      cppname: 'ChapterSegmentUID',
      minver: 1,
      crc: false
    },
    0x6ebc: {
      name: 'ChapterSegmentEditionUID',
      level: 4,
      type: 'u',
      multiple: false,
      description: 'The EditionUID to play from the Segment linked in ChapterSegmentUUID. If ChapterSegmentEditionUID is undeclared, then no Edition of the linked Segment is used; see (#medium-linking) on medium-linking Segments.',
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0x6fab: {
      name: 'TrackOverlay',
      level: 3,
      type: 'u',
      multiple: true,
      description: 'Specify that this track is an overlay track for the Track specified (in the u-integer). That means when this track has a gap on SilentTracks, the overlay track should be used instead. The order of multiple TrackOverlay matters, the first one is the one that should be used. If not found it should be the second, etc.',
      minver: 1,
      maxver: 0,
      crc: false
    },
    0x7373: {
      name: 'Tag',
      level: 2,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'A single metadata descriptor.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x7384: {
      name: 'SegmentFilename',
      level: 2,
      type: '8',
      multiple: false,
      description: 'A filename corresponding to this Segment.',
      minver: 1,
      crc: false
    },
    0x73a4: {
      name: 'SegmentUUID',
      level: 2,
      type: 'b',
      multiple: false,
      description: 'A randomly generated unique ID to identify the Segment amongst many others (128 bits). It is equivalent to a UUID v4 [@!RFC4122] with all bits randomly (or pseudo-randomly) chosen.  An actual UUID v4 value, where some bits are not random, **MAY** also be used.',
      cppname: 'SegmentUID',
      minver: 1,
      crc: false
    },
    0x73c4: {
      name: 'ChapterUID',
      level: 4,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'A unique ID to identify the Chapter.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0x73c5: {
      name: 'TrackUID',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'A unique ID to identify the Track.',
      mandatory: true,
      range: 'not 0',
      minver: 1,
      crc: false
    },
    0x7446: {
      name: 'AttachmentLink',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The UID of an attachment that is used by this codec.',
      range: 'not 0',
      cppname: 'TrackAttachmentLink',
      minver: 1,
      maxver: 3,
      crc: false
    },
    0x75a1: {
      name: 'BlockAdditions',
      level: 3,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Contain additional binary data to complete the main one; see Codec BlockAdditions section of [@?MatroskaCodec] for more information. An EBML parser that has no knowledge of the Block structure could still see and use/skip these data.',
      minver: 1,
      crc: false
    },
    0x75a2: {
      name: 'DiscardPadding',
      level: 3,
      type: 'i',
      multiple: false,
      webm: true,
      description: 'Duration of the silent data added to the Block, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks) (padding at the end of the Block for positive value, at the beginning of the Block for negative value). The duration of DiscardPadding is not calculated in the duration of the TrackEntry and **SHOULD** be discarded during playback.',
      minver: 4,
      crc: false
    },
    0x7670: {
      name: 'Projection',
      level: 4,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Describes the video projection details. Used to render spherical, VR videos or flipping videos horizontally/vertically.',
      cppname: 'VideoProjection',
      minver: 4,
      crc: false
    },
    0x7671: {
      name: 'ProjectionType',
      level: 5,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Describes the projection used for this video track.',
      mandatory: true,
      cppname: 'VideoProjectionType',
      minver: 4,
      default: '0',
      crc: false
    },
    0x7672: {
      name: 'ProjectionPrivate',
      level: 5,
      type: 'b',
      multiple: false,
      webm: true,
      description: "Private data that only applies to a specific projection.  *  If `ProjectionType` equals 0 (Rectangular), then this element **MUST NOT** be present. *  If `ProjectionType` equals 1 (Equirectangular), then this element **MUST** be present and contain the same binary data that would be stored inside an ISOBMFF Equirectangular Projection Box ('equi'). *  If `ProjectionType` equals 2 (Cubemap), then this element **MUST** be present and contain the same binary data that would be stored inside an ISOBMFF Cubemap Projection Box ('cbmp'). *  If `ProjectionType` equals 3 (Mesh), then this element **MUST** be present and contain the same binary data that would be stored inside an ISOBMFF Mesh Projection Box ('mshp').",
      cppname: 'VideoProjectionPrivate',
      minver: 4,
      crc: false
    },
    0x7673: {
      name: 'ProjectionPoseYaw',
      level: 5,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Specifies a yaw rotation to the projection.  Value represents a clockwise rotation, in degrees, around the up vector. This rotation must be applied before any `ProjectionPosePitch` or `ProjectionPoseRoll` rotations. The value of this element **MUST** be in the -180 to 180 degree range, both included.  Setting `ProjectionPoseYaw` to 180 or -180 degrees, with the `ProjectionPoseRoll` and `ProjectionPosePitch` set to 0 degrees flips the image horizontally.',
      mandatory: true,
      range: '>= -0xB4p+0, <= 0xB4p+0',
      cppname: 'VideoProjectionPoseYaw',
      minver: 4,
      default: '0x0p+0',
      crc: false
    },
    0x7674: {
      name: 'ProjectionPosePitch',
      level: 5,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Specifies a pitch rotation to the projection.  Value represents a counter-clockwise rotation, in degrees, around the right vector. This rotation must be applied after the `ProjectionPoseYaw` rotation and before the `ProjectionPoseRoll` rotation. The value of this element **MUST** be in the -90 to 90 degree range, both included.',
      mandatory: true,
      range: '>= -0x5Ap+0, <= 0x5Ap+0',
      cppname: 'VideoProjectionPosePitch',
      minver: 4,
      default: '0x0p+0',
      crc: false
    },
    0x7675: {
      name: 'ProjectionPoseRoll',
      level: 5,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Specifies a roll rotation to the projection.  Value represents a counter-clockwise rotation, in degrees, around the forward vector. This rotation must be applied after the `ProjectionPoseYaw` and `ProjectionPosePitch` rotations. The value of this element **MUST** be in the -180 to 180 degree range, both included.  Setting `ProjectionPoseRoll` to 180 or -180 degrees, the `ProjectionPoseYaw` to 180 or -180 degrees with `ProjectionPosePitch` set to 0 degrees flips the image vertically.  Setting `ProjectionPoseRoll` to 180 or -180 degrees, with the `ProjectionPoseYaw` and `ProjectionPosePitch` set to 0 degrees flips the image horizontally and vertically.',
      mandatory: true,
      range: '>= -0xB4p+0, <= 0xB4p+0',
      cppname: 'VideoProjectionPoseRoll',
      minver: 4,
      default: '0x0p+0',
      crc: false
    },
    0x78b5: {
      name: 'OutputSamplingFrequency',
      level: 4,
      type: 'f',
      multiple: false,
      webm: true,
      description: 'Real output sampling frequency in Hz (used for SBR techniques).',
      range: '> 0x0p+0',
      cppname: 'AudioOutputSamplingFreq',
      minver: 1,
      crc: false
    },
    0x7ba9: {
      name: 'Title',
      level: 2,
      type: '8',
      multiple: false,
      webm: true,
      description: 'General name of the Segment.',
      minver: 1,
      crc: false
    },
    0x7d7b: {
      name: 'ChannelPositions',
      level: 4,
      type: 'b',
      multiple: false,
      description: 'Table of horizontal angles for each successive channel.',
      cppname: 'AudioPosition',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x7e5b: {
      name: 'SignatureElements',
      level: 1,
      type: 'm',
      multiple: true,
      webm: false,
      description: 'Contains elements that will be used to compute the signature.',
      minver: 1,
      crc: false
    },
    0x7e7b: {
      name: 'SignatureElementList',
      level: 2,
      type: 'm',
      multiple: true,
      webm: false,
      description: 'A list consists of a number of consecutive elements that represent one case where data is used in signature. Ex:  means that the BlockAdditional of all Blocks in all Clusters is used for encryption.',
      minver: 1,
      crc: false,
      i: 'Cluster|Block|BlockAdditional'
    },
    0x7e8a: {
      name: 'SignatureAlgo',
      level: 2,
      type: 'u',
      multiple: true,
      webm: false,
      description: 'Signature algorithm used (1=RSA, 2=elliptic).',
      minver: 1,
      crc: false
    },
    0x7e9a: {
      name: 'SignatureHash',
      level: 2,
      type: 'u',
      multiple: true,
      webm: false,
      description: 'Hash algorithm used (1=SHA1-160, 2=MD5).',
      minver: 1,
      crc: false
    },
    0x7ea5: {
      name: 'SignaturePublicKey',
      level: 2,
      type: 'b',
      multiple: true,
      webm: false,
      description: 'The public key to use with the algorithm (in the case of a PKI-based signature).',
      minver: 1,
      crc: false
    },
    0x7eb5: {
      name: 'Signature',
      level: 2,
      type: 'b',
      multiple: true,
      webm: false,
      description: 'The signature of the data (until a new.',
      minver: 1,
      crc: false
    },
    0x22b59c: {
      name: 'Language',
      level: 3,
      type: 's',
      multiple: false,
      webm: true,
      description: 'The language of the track, in the Matroska languages form; see (#language-codes) on language codes. This Element **MUST** be ignored if the LanguageBCP47 Element is used in the same TrackEntry.',
      mandatory: true,
      cppname: 'TrackLanguage',
      minver: 1,
      default: 'eng',
      crc: false
    },
    0x22b59d: {
      name: 'LanguageBCP47',
      level: 3,
      type: 's',
      multiple: false,
      description: 'The language of the track, in the [@!BCP47] form; see (#language-codes) on language codes. If this Element is used, then any Language Elements used in the same TrackEntry **MUST** be ignored.',
      cppname: 'LanguageIETF',
      minver: 4,
      crc: false
    },
    0x23314f: {
      name: 'TrackTimestampScale',
      level: 3,
      type: 'f',
      multiple: false,
      description: 'The scale to apply on this track to work at normal speed in relation with other tracks (mostly used to adjust video speed when the audio length differs).',
      mandatory: true,
      range: '> 0x0p+0',
      cppname: 'TrackTimecodeScale',
      minver: 1,
      maxver: 3,
      default: '0x1p+0',
      crc: false
    },
    0x234e7a: {
      name: 'DefaultDecodedFieldDuration',
      level: 3,
      type: 'u',
      multiple: false,
      description: 'The period between two successive fields at the output of the decoding process, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks). see (#defaultdecodedfieldduration) for more information',
      range: 'not 0',
      cppname: 'TrackDefaultDecodedFieldDuration',
      minver: 4,
      crc: false
    },
    0x2383e3: {
      name: 'FrameRate',
      level: 4,
      type: 'f',
      multiple: false,
      description: 'Number of frames per second. This value is Informational only. It is intended for constant frame rate streams, and should not be used for a variable frame rate TrackEntry.',
      range: '> 0x0p+0',
      cppname: 'VideoFrameRate',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x23e383: {
      name: 'DefaultDuration',
      level: 3,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Number of nanoseconds per frame, expressed in Matroska Ticks -- i.e., in nanoseconds; see (#timestamp-ticks) (frame in the Matroska sense -- one Element put into a (Simple)Block).',
      range: 'not 0',
      cppname: 'TrackDefaultDuration',
      minver: 1,
      crc: false
    },
    0x258688: {
      name: 'CodecName',
      level: 3,
      type: '8',
      multiple: false,
      webm: true,
      description: 'A human-readable string specifying the codec.',
      minver: 1,
      crc: false
    },
    0x26b240: {
      name: 'CodecDownloadURL',
      level: 3,
      type: 's',
      multiple: true,
      description: 'A URL to download about the codec used.',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x2ad7b1: {
      name: 'TimestampScale',
      level: 2,
      type: 'u',
      multiple: false,
      webm: true,
      description: 'Base unit for Segment Ticks and Track Ticks, in nanoseconds. A TimestampScale value of 1000000 means scaled timestamps in the Segment are expressed in milliseconds; see (#timestamps) on how to interpret timestamps.',
      mandatory: true,
      range: 'not 0',
      cppname: 'TimecodeScale',
      minver: 1,
      default: '1000000',
      crc: false
    },
    0x2ad7b2: {
      name: 'TimecodeScaleDenominator',
      level: 2,
      type: 'u',
      multiple: false,
      description: 'Timestamp scale numerator, see TimecodeScale.',
      mandatory: true,
      minver: 4,
      default: '1000000000',
      crc: false
    },
    0x2eb524: {
      name: 'UncompressedFourCC',
      level: 4,
      type: 'b',
      multiple: false,
      description: "Specify the uncompressed pixel format used for the Track's data as a FourCC. This value is similar in scope to the biCompression value of AVI's `BITMAPINFO` [@?AVIFormat]. There is no definitive list of FourCC values, nor an official registry. Some common values for YUV pixel formats can be found at [@?MSYUV8], [@?MSYUV16] and [@?FourCC-YUV]. Some common values for uncompressed RGB pixel formats can be found at [@?MSRGB] and [@?FourCC-RGB].",
      cppname: 'VideoColourSpace',
      minver: 1,
      crc: false
    },
    0x2fb523: {
      name: 'GammaValue',
      level: 4,
      type: 'f',
      multiple: false,
      description: 'Gamma Value.',
      range: '> 0x0p+0',
      cppname: 'VideoGamma',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x3a9697: {
      name: 'CodecSettings',
      level: 3,
      type: '8',
      multiple: false,
      description: 'A string describing the encoding setting used.',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x3b4040: {
      name: 'CodecInfoURL',
      level: 3,
      type: 's',
      multiple: true,
      description: 'A URL to find information about the codec used.',
      minver: 0,
      maxver: 0,
      crc: false
    },
    0x3c83ab: {
      name: 'PrevFilename',
      level: 2,
      type: '8',
      multiple: false,
      description: 'A filename corresponding to the file of the previous Linked Segment.',
      minver: 1,
      crc: false
    },
    0x3cb923: {
      name: 'PrevUUID',
      level: 2,
      type: 'b',
      multiple: false,
      description: 'An ID to identify the previous Segment of a Linked Segment.',
      cppname: 'PrevUID',
      minver: 1,
      crc: false
    },
    0x3e83bb: {
      name: 'NextFilename',
      level: 2,
      type: '8',
      multiple: false,
      description: 'A filename corresponding to the file of the next Linked Segment.',
      minver: 1,
      crc: false
    },
    0x3eb923: {
      name: 'NextUUID',
      level: 2,
      type: 'b',
      multiple: false,
      description: 'An ID to identify the next Segment of a Linked Segment.',
      cppname: 'NextUID',
      minver: 1,
      crc: false
    },
    0x1043a770: {
      name: 'Chapters',
      level: 1,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'A system to define basic menus and partition data. For more detailed information, look at the Chapters explanation in (#chapters).',
      minver: 1,
      crc: false
    },
    0x114d9b74: {
      name: 'SeekHead',
      level: 1,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Contains seeking information of Top-Level Elements; see (#data-layout).',
      minver: 1,
      crc: false
    },
    0x1254c367: {
      name: 'Tags',
      level: 1,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'Element containing metadata describing Tracks, Editions, Chapters, Attachments, or the Segment as a whole. A list of valid tags can be found in [@?MatroskaTags].',
      minver: 1,
      crc: false
    },
    0x1549a966: {
      name: 'Info',
      level: 1,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'Contains general information about the Segment.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x1654ae6b: {
      name: 'Tracks',
      level: 1,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'A Top-Level Element of information with many tracks described.',
      minver: 1,
      crc: false
    },
    0x18538067: {
      name: 'Segment',
      level: 0,
      type: 'm',
      multiple: false,
      description: 'The Root Element that contains all other Top-Level Elements; see (#data-layout).',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x1941a469: {
      name: 'Attachments',
      level: 1,
      type: 'm',
      multiple: false,
      description: 'Contain attached files.',
      minver: 1,
      crc: false
    },
    0x1a45dfa3: {
      name: 'EBML',
      level: 0,
      type: 'm',
      multiple: false,
      description: 'Set the EBML characteristics of the data to follow. Each EBML document has to start with this.',
      mandatory: true,
      minver: 1,
      crc: false
    },
    0x1b538667: {
      name: 'SignatureSlot',
      level: 1,
      type: 'm',
      multiple: true,
      webm: false,
      description: 'Contain signature of some (coming) elements in the stream.',
      minver: 1,
      crc: false
    },
    0x1c53bb6b: {
      name: 'Cues',
      level: 1,
      type: 'm',
      multiple: false,
      webm: true,
      description: 'A Top-Level Element to speed seeking access. All entries are local to the Segment.',
      minver: 1,
      crc: false
    },
    0x1f43b675: {
      name: 'Cluster',
      level: 1,
      type: 'm',
      multiple: true,
      webm: true,
      description: 'The Top-Level Element containing the (monolithic) Block structure.',
      minver: 1,
      crc: false
    },
  },
  byName: {
    EBMLMaxIDLength: 0x42f2,
    EBMLMaxSizeLength: 0x42f3,
    Segment: 0x18538067,
    SeekHead: 0x114d9b74,
    Seek: 0x4dbb,
    SeekID: 0x53ab,
    SeekPosition: 0x53ac,
    Info: 0x1549a966,
    SegmentUUID: 0x73a4,
    SegmentFilename: 0x7384,
    PrevUUID: 0x3cb923,
    PrevFilename: 0x3c83ab,
    NextUUID: 0x3eb923,
    NextFilename: 0x3e83bb,
    SegmentFamily: 0x4444,
    ChapterTranslate: 0x6924,
    ChapterTranslateID: 0x69a5,
    ChapterTranslateCodec: 0x69bf,
    ChapterTranslateEditionUID: 0x69fc,
    TimestampScale: 0x2ad7b1,
    Duration: 0x4489,
    DateUTC: 0x4461,
    Title: 0x7ba9,
    MuxingApp: 0x4d80,
    WritingApp: 0x5741,
    Cluster: 0x1f43b675,
    Timestamp: 0xe7,
    SilentTracks: 0x5854,
    SilentTrackNumber: 0x58d7,
    Position: 0xa7,
    PrevSize: 0xab,
    SimpleBlock: 0xa3,
    BlockGroup: 0xa0,
    Block: 0xa1,
    BlockVirtual: 0xa2,
    BlockAdditions: 0x75a1,
    BlockMore: 0xa6,
    BlockAdditional: 0xa5,
    BlockAddID: 0xee,
    BlockDuration: 0x9b,
    ReferencePriority: 0xfa,
    ReferenceBlock: 0xfb,
    ReferenceVirtual: 0xfd,
    CodecState: 0xa4,
    DiscardPadding: 0x75a2,
    Slices: 0x8e,
    TimeSlice: 0xe8,
    LaceNumber: 0xcc,
    FrameNumber: 0xcd,
    BlockAdditionID: 0xcb,
    Delay: 0xce,
    SliceDuration: 0xcf,
    ReferenceFrame: 0xc8,
    ReferenceOffset: 0xc9,
    ReferenceTimestamp: 0xca,
    EncryptedBlock: 0xaf,
    Tracks: 0x1654ae6b,
    TrackEntry: 0xae,
    TrackNumber: 0xd7,
    TrackUID: 0x73c5,
    TrackType: 0x83,
    FlagEnabled: 0xb9,
    FlagDefault: 0x88,
    FlagForced: 0x55aa,
    FlagHearingImpaired: 0x55ab,
    FlagVisualImpaired: 0x55ac,
    FlagTextDescriptions: 0x55ad,
    FlagOriginal: 0x55ae,
    FlagCommentary: 0x55af,
    FlagLacing: 0x9c,
    MinCache: 0x6de7,
    MaxCache: 0x6df8,
    DefaultDuration: 0x23e383,
    DefaultDecodedFieldDuration: 0x234e7a,
    TrackTimestampScale: 0x23314f,
    TrackOffset: 0x537f,
    MaxBlockAdditionID: 0x55ee,
    BlockAdditionMapping: 0x41e4,
    BlockAddIDValue: 0x41f0,
    BlockAddIDName: 0x41a4,
    BlockAddIDType: 0x41e7,
    BlockAddIDExtraData: 0x41ed,
    Name: 0x536e,
    Language: 0x22b59c,
    LanguageBCP47: 0x22b59d,
    CodecID: 0x86,
    CodecPrivate: 0x63a2,
    CodecName: 0x258688,
    AttachmentLink: 0x7446,
    CodecSettings: 0x3a9697,
    CodecInfoURL: 0x3b4040,
    CodecDownloadURL: 0x26b240,
    CodecDecodeAll: 0xaa,
    TrackOverlay: 0x6fab,
    CodecDelay: 0x56aa,
    SeekPreRoll: 0x56bb,
    TrackTranslate: 0x6624,
    TrackTranslateTrackID: 0x66a5,
    TrackTranslateCodec: 0x66bf,
    TrackTranslateEditionUID: 0x66fc,
    Video: 0xe0,
    FlagInterlaced: 0x9a,
    FieldOrder: 0x9d,
    StereoMode: 0x53b8,
    AlphaMode: 0x53c0,
    OldStereoMode: 0x53b9,
    PixelWidth: 0xb0,
    PixelHeight: 0xba,
    PixelCropBottom: 0x54aa,
    PixelCropTop: 0x54bb,
    PixelCropLeft: 0x54cc,
    PixelCropRight: 0x54dd,
    DisplayWidth: 0x54b0,
    DisplayHeight: 0x54ba,
    DisplayUnit: 0x54b2,
    AspectRatioType: 0x54b3,
    UncompressedFourCC: 0x2eb524,
    GammaValue: 0x2fb523,
    FrameRate: 0x2383e3,
    Colour: 0x55b0,
    MatrixCoefficients: 0x55b1,
    BitsPerChannel: 0x55b2,
    ChromaSubsamplingHorz: 0x55b3,
    ChromaSubsamplingVert: 0x55b4,
    CbSubsamplingHorz: 0x55b5,
    CbSubsamplingVert: 0x55b6,
    ChromaSitingHorz: 0x55b7,
    ChromaSitingVert: 0x55b8,
    Range: 0x55b9,
    TransferCharacteristics: 0x55ba,
    Primaries: 0x55bb,
    MaxCLL: 0x55bc,
    MaxFALL: 0x55bd,
    MasteringMetadata: 0x55d0,
    PrimaryRChromaticityX: 0x55d1,
    PrimaryRChromaticityY: 0x55d2,
    PrimaryGChromaticityX: 0x55d3,
    PrimaryGChromaticityY: 0x55d4,
    PrimaryBChromaticityX: 0x55d5,
    PrimaryBChromaticityY: 0x55d6,
    WhitePointChromaticityX: 0x55d7,
    WhitePointChromaticityY: 0x55d8,
    LuminanceMax: 0x55d9,
    LuminanceMin: 0x55da,
    Projection: 0x7670,
    ProjectionType: 0x7671,
    ProjectionPrivate: 0x7672,
    ProjectionPoseYaw: 0x7673,
    ProjectionPosePitch: 0x7674,
    ProjectionPoseRoll: 0x7675,
    Audio: 0xe1,
    SamplingFrequency: 0xb5,
    OutputSamplingFrequency: 0x78b5,
    Channels: 0x9f,
    ChannelPositions: 0x7d7b,
    BitDepth: 0x6264,
    Emphasis: 0x52f1,
    TrackOperation: 0xe2,
    TrackCombinePlanes: 0xe3,
    TrackPlane: 0xe4,
    TrackPlaneUID: 0xe5,
    TrackPlaneType: 0xe6,
    TrackJoinBlocks: 0xe9,
    TrackJoinUID: 0xed,
    TrickTrackUID: 0xc0,
    TrickTrackSegmentUID: 0xc1,
    TrickTrackFlag: 0xc6,
    TrickMasterTrackUID: 0xc7,
    TrickMasterTrackSegmentUID: 0xc4,
    ContentEncodings: 0x6d80,
    ContentEncoding: 0x6240,
    ContentEncodingOrder: 0x5031,
    ContentEncodingScope: 0x5032,
    ContentEncodingType: 0x5033,
    ContentCompression: 0x5034,
    ContentCompAlgo: 0x4254,
    ContentCompSettings: 0x4255,
    ContentEncryption: 0x5035,
    ContentEncAlgo: 0x47e1,
    ContentEncKeyID: 0x47e2,
    ContentEncAESSettings: 0x47e7,
    AESSettingsCipherMode: 0x47e8,
    ContentSignature: 0x47e3,
    ContentSigKeyID: 0x47e4,
    ContentSigAlgo: 0x47e5,
    ContentSigHashAlgo: 0x47e6,
    Cues: 0x1c53bb6b,
    CuePoint: 0xbb,
    CueTime: 0xb3,
    CueTrackPositions: 0xb7,
    CueTrack: 0xf7,
    CueClusterPosition: 0xf1,
    CueRelativePosition: 0xf0,
    CueDuration: 0xb2,
    CueBlockNumber: 0x5378,
    CueCodecState: 0xea,
    CueReference: 0xdb,
    CueRefTime: 0x96,
    CueRefCluster: 0x97,
    CueRefNumber: 0x535f,
    CueRefCodecState: 0xeb,
    Attachments: 0x1941a469,
    AttachedFile: 0x61a7,
    FileDescription: 0x467e,
    FileName: 0x466e,
    FileMediaType: 0x4660,
    FileData: 0x465c,
    FileUID: 0x46ae,
    FileReferral: 0x4675,
    FileUsedStartTime: 0x4661,
    FileUsedEndTime: 0x4662,
    Chapters: 0x1043a770,
    EditionEntry: 0x45b9,
    EditionUID: 0x45bc,
    EditionFlagHidden: 0x45bd,
    EditionFlagDefault: 0x45db,
    EditionFlagOrdered: 0x45dd,
    EditionDisplay: 0x4520,
    EditionString: 0x4521,
    EditionLanguageIETF: 0x45e4,
    ChapterAtom: 0xb6,
    ChapterUID: 0x73c4,
    ChapterStringUID: 0x5654,
    ChapterTimeStart: 0x91,
    ChapterTimeEnd: 0x92,
    ChapterFlagHidden: 0x98,
    ChapterFlagEnabled: 0x4598,
    ChapterSegmentUUID: 0x6e67,
    ChapterSkipType: 0x4588,
    ChapterSegmentEditionUID: 0x6ebc,
    ChapterPhysicalEquiv: 0x63c3,
    ChapterTrack: 0x8f,
    ChapterTrackUID: 0x89,
    ChapterDisplay: 0x80,
    ChapString: 0x85,
    ChapLanguage: 0x437c,
    ChapLanguageBCP47: 0x437d,
    ChapCountry: 0x437e,
    ChapProcess: 0x6944,
    ChapProcessCodecID: 0x6955,
    ChapProcessPrivate: 0x450d,
    ChapProcessCommand: 0x6911,
    ChapProcessTime: 0x6922,
    ChapProcessData: 0x6933,
    Tags: 0x1254c367,
    Tag: 0x7373,
    Targets: 0x63c0,
    TargetTypeValue: 0x68ca,
    TargetType: 0x63ca,
    TagTrackUID: 0x63c5,
    TagEditionUID: 0x63c9,
    TagChapterUID: 0x63c4,
    TagAttachmentUID: 0x63c6,
    SimpleTag: 0x67c8,
    TagName: 0x45a3,
    TagLanguage: 0x447a,
    TagLanguageBCP47: 0x447b,
    TagDefault: 0x4484,
    TagDefaultBogus: 0x44b4,
    TagString: 0x4487,
    TagBinary: 0x4485,
    EBML: 0x1a45dfa3,
    EBMLVersion: 0x4286,
    EBMLReadVersion: 0x42f7,
    DocType: 0x4282,
    DocTypeVersion: 0x4287,
    DocTypeReadVersion: 0x4285,
    DocTypeExtension: 0x4281,
    DocTypeExtensionName: 0x4283,
    DocTypeExtensionVersion: 0x4284,
    Void: 0xec,
    CRC_32: 0xbf,
    SignatureSlot: 0x1b538667,
    SignatureAlgo: 0x7e8a,
    SignatureHash: 0x7e9a,
    SignaturePublicKey: 0x7ea5,
    Signature: 0x7eb5,
    SignatureElements: 0x7e5b,
    SignatureElementList: 0x7e7b,
    SignedElement: 0x6532,
    TimecodeScaleDenominator: 0x2ad7b2,
  }
};


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/ts-ebml/lib/EBML.js":
/*!******************************************!*\
  !*** ./node_modules/ts-ebml/lib/EBML.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./node_modules/ts-ebml/lib/EBMLDecoder.js":
/*!*************************************************!*\
  !*** ./node_modules/ts-ebml/lib/EBMLDecoder.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const bigint_buffer_1 = __webpack_require__(/*! bigint-buffer */ "./node_modules/bigint-buffer/dist/browser.js");
const tools_1 = __webpack_require__(/*! ./tools */ "./node_modules/ts-ebml/lib/tools.js");
const tools = __importStar(__webpack_require__(/*! ./tools */ "./node_modules/ts-ebml/lib/tools.js"));
const schema = __webpack_require__(/*! matroska-schema */ "./node_modules/matroska-schema/schema.js");
const { byEbmlID } = schema;
var State;
(function (State) {
    State[State["STATE_TAG"] = 1] = "STATE_TAG";
    State[State["STATE_SIZE"] = 2] = "STATE_SIZE";
    State[State["STATE_CONTENT"] = 3] = "STATE_CONTENT";
})(State || (State = {}));
class EBMLDecoder {
    constructor() {
        this._buffer = Buffer.alloc(0);
        this._tag_stack = [];
        this._state = State.STATE_TAG;
        this._cursor = 0;
        this._total = 0;
        this._schema = byEbmlID;
        this._result = [];
    }
    decode(chunk) {
        this.readChunk(chunk);
        const diff = this._result;
        this._result = [];
        return diff;
    }
    readChunk(chunk) {
        // Re-read the _buffer that was unreadable and the new chunk together.
        // console.log(this._buffer, Buffer.from(chunk));
        this._buffer = tools.concat([this._buffer, Buffer.from(chunk)]);
        while (this._cursor < this._buffer.length) {
            // console.log(this._state, this._cursor, this._total, this._tag_stack);
            if (this._state === State.STATE_TAG && !this.readTag()) {
                break;
            }
            if (this._state === State.STATE_SIZE && !this.readSize()) {
                break;
            }
            if (this._state === State.STATE_CONTENT && !this.readContent()) {
                break;
            }
        }
    }
    getSchemaInfo(tagNum) {
        if (this._schema[tagNum] != null) {
            return this._schema[tagNum];
        }
        else {
            return {
                name: "unknown",
                level: -1,
                type: "unknown",
                description: "unknown"
            };
        }
    }
    /**
     * parsing vint-ed tag
     * @return - return false when waiting for more data
     */
    readTag() {
        // tag.length is out of the buffer
        if (this._cursor >= this._buffer.length) {
            return false;
        }
        // read ebml id vint without first byte
        const tag = (0, tools_1.readVint)(this._buffer, this._cursor);
        // cannot parse tag
        if (tag == null) {
            return false;
        }
        // read tag id
        // Hacks to avoid using parseInt
        //const tagStr = this._buffer.toString("hex", this._cursor, this._cursor + tag.length);
        //const tagNum = parseInt(tagStr, 16);
        const buf = this._buffer.subarray(this._cursor, this._cursor + tag.length);
        const tagNum = buf.reduce((o, v, i, arr) => o + v * Math.pow(16, 2 * (arr.length - 1 - i)), 0);
        const schema = this.getSchemaInfo(tagNum);
        const tagObj = {
            EBML_ID: tagNum.toString(16),
            schema,
            type: schema.type,
            name: schema.name,
            level: schema.level,
            tagStart: this._total,
            tagEnd: this._total + tag.length,
            sizeStart: this._total + tag.length,
            sizeEnd: null,
            dataStart: null,
            dataEnd: null,
            dataSize: null,
            data: null
        };
        // +-----------+------------+--------------------+
        // | tag: vint | size: vint | data: Buffer(size) |
        // +-----------+------------+--------------------+
        this._tag_stack.push(tagObj);
        // advance the pointer
        this._cursor += tag.length;
        this._total += tag.length;
        // change read status
        this._state = State.STATE_SIZE;
        return true;
    }
    /**
     * Reads the size of the vint-ed current tag content
     * @return - return false when waiting for more data
     */
    readSize() {
        // tag.length is outside the buffer
        if (this._cursor >= this._buffer.length) {
            return false;
        }
        // read ebml datasize vint without first byte
        const size = (0, tools_1.readVint)(this._buffer, this._cursor);
        // still can't read it.
        if (size == null) {
            return false;
        }
        // decide data size for current tag
        const tagObj = this._tag_stack[this._tag_stack.length - 1];
        if (tagObj == null) {
            return false;
        }
        tagObj.sizeEnd = tagObj.sizeStart + size.length;
        tagObj.dataStart = tagObj.sizeEnd;
        tagObj.dataSize = size.value;
        if (size.value === -1) {
            // unknown size
            tagObj.dataEnd = -1;
            if (tagObj.type === "m") {
                tagObj.unknownSize = true;
            }
        }
        else {
            tagObj.dataEnd = tagObj.sizeEnd + size.value;
        }
        // advance the pointer
        this._cursor += size.length;
        this._total += size.length;
        this._state = State.STATE_CONTENT;
        return true;
    }
    readContent() {
        const tagObj = this._tag_stack[this._tag_stack.length - 1];
        if (tagObj == null) {
            return false;
        }
        // master element does not have raw data buffer
        // because it has child elements
        if (tagObj.type === "m") {
            // console.log('content should be tags');
            tagObj.isEnd = false;
            this._result.push(tagObj);
            this._state = State.STATE_TAG;
            // if this Mastert Element empty
            if (tagObj.dataSize === 0) {
                // then add the end tag immediately
                const elm = Object.assign({}, tagObj, { isEnd: true });
                this._result.push(elm);
                // pop out the tag from tag stack
                this._tag_stack.pop();
            }
            return true;
        }
        // waiting for more data
        if (this._buffer.length < this._cursor + tagObj.dataSize) {
            return false;
        }
        // raw data of tag content
        const data = this._buffer.subarray(this._cursor, this._cursor + tagObj.dataSize);
        // 読み終わったバッファを捨てて読み込んでいる部分のバッファのみ残す
        this._buffer = this._buffer.subarray(this._cursor + tagObj.dataSize);
        tagObj.data = data;
        switch (tagObj.type) {
            // case "m": {
            //   // Master-Element - contains other EBML sub-elements of the next lower level
            //   throw new Error("never");
            // }
            case "u": {
                // Unsigned Integer - Big-endian, any size from 1 to 8 octets
                if (data.length > 6) {
                    // feross/buffer shim can read over 7 octets
                    // but nodejs buffer only can read under 6 octets
                    // so use bigint-buffer
                    tagObj.value = Number((0, bigint_buffer_1.toBigIntBE)(data));
                }
                else {
                    tagObj.value = data.readUIntBE(0, data.length);
                }
                break;
            }
            case "i": {
                // Signed Integer - Big-endian, any size from 1 to 8 octets
                tagObj.value = data.readIntBE(0, data.length);
                break;
            }
            case "f": {
                // Float - Big-endian, defined for 4 and 8 octets (32, 64 bits)
                if (tagObj.dataSize === 4) {
                    tagObj.value = data.readFloatBE(0);
                }
                else if (tagObj.dataSize === 8) {
                    tagObj.value = data.readDoubleBE(0);
                }
                else {
                    console.warn(`cannot read ${tagObj.dataSize} octets float. failback to 0`);
                    tagObj.value = 0;
                }
                break;
            }
            case "s": {
                //  Printable ASCII (0x20 to 0x7E), zero-padded when needed
                tagObj.value = data.toString("ascii");
                break;
            }
            case "8": {
                //  Unicode string, zero padded when needed (RFC 2279)
                tagObj.value = data.toString("utf8");
                break;
            }
            case "b": {
                // Binary - not interpreted by the parser
                tagObj.value = data;
                break;
            }
            case "d": {
                // nano second; Date.UTC(2001,1,1,0,0,0,0) === 980985600000
                // Date - signed 8 octets integer in nanoseconds with 0 indicating
                // the precise beginning of the millennium (at 2001-01-01T00:00:00,000000000 UTC)
                tagObj.value = (0, tools_1.convertEBMLDateToJSDate)(Number((0, bigint_buffer_1.toBigIntBE)(data)));
                break;
            }
        }
        if (tagObj.value === null) {
            throw new Error("unknown tag type:" + tagObj.type);
        }
        this._result.push(tagObj);
        // advance the pointer
        this._total += tagObj.dataSize;
        // change state to waiting next tag
        this._state = State.STATE_TAG;
        this._cursor = 0;
        // remove the object from the stack
        this._tag_stack.pop();
        while (this._tag_stack.length > 0) {
            const topEle = this._tag_stack[this._tag_stack.length - 1];
            if (topEle == null) {
                return false;
            }
            // 親が不定長サイズなので閉じタグは期待できない
            if (topEle.dataEnd < 0) {
                // remove parent tag
                this._tag_stack.pop();
                return true;
            }
            // 閉じタグの来るべき場所まで来たかどうか
            if (this._total < topEle.dataEnd) {
                break;
            }
            // 閉じタグを挿入すべきタイミングが来た
            if (topEle.type !== "m") {
                throw new Error("parent element is not master element");
            }
            const elm = Object.assign({}, topEle, { isEnd: true });
            this._result.push(elm);
            this._tag_stack.pop();
        }
        return true;
    }
}
exports["default"] = EBMLDecoder;


/***/ }),

/***/ "./node_modules/ts-ebml/lib/EBMLEncoder.js":
/*!*************************************************!*\
  !*** ./node_modules/ts-ebml/lib/EBMLEncoder.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tools = __importStar(__webpack_require__(/*! ./tools */ "./node_modules/ts-ebml/lib/tools.js"));
const schema = __webpack_require__(/*! matroska-schema */ "./node_modules/matroska-schema/schema.js");
const { byEbmlID } = schema;
class EBMLEncoder {
    constructor() {
        this._schema = byEbmlID;
        this._buffers = [];
        this._stack = [];
    }
    encode(elms) {
        return tools.concat(elms.reduce((lst, elm) => lst.concat(this.encodeChunk(elm)), [])).buffer;
    }
    encodeChunk(elm) {
        if (elm.type === "m") {
            if (!elm.isEnd) {
                this.startTag(elm);
            }
            else {
                this.endTag(elm);
            }
        }
        else {
            // ensure that we are working with an internal `Buffer` instance
            elm.data = Buffer.from(elm.data);
            this.writeTag(elm);
        }
        return this.flush();
    }
    flush() {
        const ret = this._buffers;
        this._buffers = [];
        return ret;
    }
    getSchemaInfo(tagName) {
        for (const [tagNum, tagVal] of Object.entries(this._schema)) {
            if (tagVal.name === tagName) {
                return Buffer.from(Number(tagNum).toString(16), "hex");
            }
        }
        return null;
    }
    writeTag(elm) {
        const tagName = elm.name;
        const tagId = this.getSchemaInfo(tagName);
        const tagData = elm.data;
        if (tagId == null) {
            throw new Error("No schema entry found for " + tagName);
        }
        const data = tools.encodeTag(tagId, tagData);
        // 親要素が閉じタグあり(isEnd)なら閉じタグが来るまで待つ(children queに入る)
        if (this._stack.length > 0) {
            const last = this._stack[this._stack.length - 1];
            last.children.push({
                tagId,
                elm,
                children: [],
                data
            });
            return;
        }
        this._buffers = this._buffers.concat(data);
        return;
    }
    startTag(elm) {
        const tagName = elm.name;
        const tagId = this.getSchemaInfo(tagName);
        if (tagId == null) {
            throw new Error("No schema entry found for " + tagName);
        }
        // 閉じタグ不定長の場合はスタックに積まずに即時バッファに書き込む
        if (elm.unknownSize) {
            const data = tools.encodeTag(tagId, Buffer.alloc(0), elm.unknownSize);
            this._buffers = this._buffers.concat(data);
            return;
        }
        const tag = {
            tagId,
            elm,
            children: [],
            data: null
        };
        if (this._stack.length > 0) {
            this._stack[this._stack.length - 1].children.push(tag);
        }
        this._stack.push(tag);
    }
    endTag(elm) {
        const tag = this._stack.pop();
        if (tag == null) {
            throw new Error("EBML structure is broken");
        }
        if (tag.elm.name !== elm.name) {
            throw new Error("EBML structure is broken");
        }
        const childTagDataBuffers = tag.children.reduce((lst, child) => {
            if (child.data === null) {
                throw new Error("EBML structure is broken");
            }
            return lst.concat(child.data);
        }, []);
        const childTagDataBuffer = tools.concat(childTagDataBuffers);
        if (tag.elm.type === "m") {
            tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer, tag.elm.unknownSize);
        }
        else {
            tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer);
        }
        if (this._stack.length < 1) {
            this._buffers = this._buffers.concat(tag.data);
        }
    }
}
exports["default"] = EBMLEncoder;


/***/ }),

/***/ "./node_modules/ts-ebml/lib/EBMLReader.js":
/*!************************************************!*\
  !*** ./node_modules/ts-ebml/lib/EBMLReader.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const tools = __importStar(__webpack_require__(/*! ./tools */ "./node_modules/ts-ebml/lib/tools.js"));
/**
 * This is an informal code for reference.
 * EBMLReader is a class for getting information to enable seeking Webm recorded by MediaRecorder.
 * So please do not use for regular WebM files.
 */
class EBMLReader extends events_1.EventEmitter {
    constructor() {
        super();
        this.logGroup = "";
        this.hasLoggingStarted = false;
        this.metadataloaded = false;
        this.chunks = [];
        this.stack = [];
        this.segmentOffset = 0;
        this.last2SimpleBlockVideoTrackTimestamp = [0, 0];
        this.last2SimpleBlockAudioTrackTimestamp = [0, 0];
        this.lastClusterTimestamp = 0;
        this.lastClusterPosition = 0;
        // webm default TimestampScale is 1ms
        this.timestampScale = 1000000;
        this.metadataSize = 0;
        this.metadatas = [];
        this.cues = [];
        this.firstVideoBlockRead = false;
        this.firstAudioBlockRead = false;
        this.currentTrack = {
            TrackNumber: -1,
            TrackType: -1,
            DefaultDuration: null,
            CodecDelay: null
        };
        this.trackTypes = [];
        this.trackDefaultDuration = [];
        this.trackCodecDelay = [];
        this.trackInfo = { type: "nothing" };
        this.ended = false;
        this.logging = false;
        this.use_duration_every_simpleblock = false;
        this.use_webp = false;
        this.use_segment_info = true;
        this.drop_default_duration = true;
    }
    /**
     * emit final state.
     */
    stop() {
        this.ended = true;
        this.emit_segment_info();
        // clean up any unclosed Master Elements at the end of the stream.
        while (this.stack.length) {
            this.stack.pop();
            if (this.logging) {
                console.groupEnd();
            }
        }
        // close main group if set, logging is enabled, and has actually logged anything.
        if (this.logging && this.hasLoggingStarted && this.logGroup) {
            console.groupEnd();
        }
    }
    /**
     * emit chunk info
     */
    emit_segment_info() {
        const data = this.chunks;
        this.chunks = [];
        if (!this.metadataloaded) {
            this.metadataloaded = true;
            this.metadatas = data;
            // find first video track
            const videoTrackNum = this.trackTypes.indexOf(1);
            // find first audio track
            const audioTrackNum = this.trackTypes.indexOf(2);
            this.trackInfo =
                videoTrackNum >= 0 && audioTrackNum >= 0
                    ? { type: "both", trackNumber: videoTrackNum }
                    : videoTrackNum >= 0
                        ? { type: "video", trackNumber: videoTrackNum }
                        : audioTrackNum >= 0
                            ? { type: "audio", trackNumber: audioTrackNum }
                            : { type: "nothing" };
            if (!this.use_segment_info) {
                return;
            }
            this.emit("metadata", { data, metadataSize: this.metadataSize });
        }
        else {
            if (!this.use_segment_info) {
                return;
            }
            const timestamp = this.lastClusterTimestamp;
            const duration = this.duration;
            const timestampScale = this.timestampScale;
            this.emit("cluster", { timestamp, data });
            this.emit("duration", { timestampScale, duration });
        }
    }
    read(elm) {
        let drop = false;
        if (this.ended) {
            // reader is finished
            return;
        }
        if (elm.type === "m") {
            // 閉じタグの自動挿入
            if (elm.isEnd) {
                this.stack.pop();
            }
            else {
                const parent = this.stack[this.stack.length - 1];
                if (parent != null && parent.level >= elm.level) {
                    // 閉じタグなしでレベルが下がったら閉じタグを挿入
                    this.stack.pop();
                    // From http://w3c.github.io/media-source/webm-byte-stream-format.html#webm-media-segments
                    // This fixes logging for webm streams with Cluster of unknown length and no Cluster closing elements.
                    if (this.logging) {
                        console.groupEnd();
                    }
                    parent.dataEnd = elm.dataEnd;
                    parent.dataSize = elm.dataEnd - parent.dataStart;
                    parent.unknownSize = false;
                    const o = Object.assign({}, parent, {
                        name: parent.name,
                        type: parent.type,
                        isEnd: true
                    });
                    this.chunks.push(o);
                }
                this.stack.push(elm);
            }
        }
        if (elm.type === "m" && elm.name === "Segment") {
            if (this.segmentOffset !== 0) {
                console.warn("Multiple segments detected!");
            }
            this.segmentOffset = elm.dataStart;
            this.emit("segment_offset", this.segmentOffset);
        }
        else if (elm.type === "b" && elm.name === "SimpleBlock") {
            const { timecode: timestamp, trackNumber, frames } = tools.ebmlBlock(elm.data);
            if (this.trackTypes[trackNumber] === 1) {
                // trackType === 1 => video track
                if (!this.firstVideoBlockRead) {
                    this.firstVideoBlockRead = true;
                    if (this.trackInfo.type === "both" ||
                        this.trackInfo.type === "video") {
                        const CueTime = this.lastClusterTimestamp + timestamp;
                        this.cues.push({
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime
                        });
                        this.emit("cue_info", {
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime: this.lastClusterTimestamp
                        });
                        this.emit("cue", {
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime
                        });
                    }
                }
                this.last2SimpleBlockVideoTrackTimestamp = [
                    this.last2SimpleBlockVideoTrackTimestamp[1],
                    timestamp
                ];
            }
            else if (this.trackTypes[trackNumber] === 2) {
                // trackType === 2 => audio track
                if (!this.firstAudioBlockRead) {
                    this.firstAudioBlockRead = true;
                    if (this.trackInfo.type === "audio") {
                        const CueTime = this.lastClusterTimestamp + timestamp;
                        this.cues.push({
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime
                        });
                        this.emit("cue_info", {
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime: this.lastClusterTimestamp
                        });
                        this.emit("cue", {
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime
                        });
                    }
                }
                this.last2SimpleBlockAudioTrackTimestamp = [
                    this.last2SimpleBlockAudioTrackTimestamp[1],
                    timestamp
                ];
            }
            if (this.use_duration_every_simpleblock) {
                this.emit("duration", {
                    timestampScale: this.timestampScale,
                    duration: this.duration
                });
            }
            if (this.use_webp) {
                for (const frame of frames) {
                    const startcode = frame.subarray(3, 6).toString("hex");
                    // this is not a good way to detect VP8
                    // see rfc6386 -- VP8 Data Format and Decoding Guide
                    if (startcode !== "9d012a") {
                        break;
                    }
                    const webpBuf = tools.VP8BitStreamToRiffWebPBuffer(frame);
                    const webp = new Blob([webpBuf], { type: "image/webp" });
                    const currentTime = this.duration;
                    this.emit("webp", { currentTime, webp });
                }
            }
        }
        else if (elm.type === "m" && elm.name === "Cluster" && !elm.isEnd) {
            this.firstVideoBlockRead = false;
            this.firstAudioBlockRead = false;
            this.emit_segment_info();
            this.emit("cluster_ptr", elm.tagStart);
            this.lastClusterPosition = elm.tagStart;
        }
        else if (elm.type === "u" && elm.name === "Timestamp") {
            this.lastClusterTimestamp = elm.value;
        }
        else if (elm.type === "u" && elm.name === "TimestampScale") {
            this.timestampScale = elm.value;
        }
        else if (elm.type === "m" && elm.name === "TrackEntry") {
            if (elm.isEnd) {
                this.trackTypes[this.currentTrack.TrackNumber] =
                    this.currentTrack.TrackType;
                this.trackDefaultDuration[this.currentTrack.TrackNumber] =
                    this.currentTrack.DefaultDuration;
                this.trackCodecDelay[this.currentTrack.TrackNumber] =
                    this.currentTrack.CodecDelay;
            }
            else {
                this.currentTrack = {
                    TrackNumber: -1,
                    TrackType: -1,
                    DefaultDuration: null,
                    CodecDelay: null
                };
            }
        }
        else if (elm.type === "u" && elm.name === "TrackType") {
            this.currentTrack.TrackType = elm.value;
        }
        else if (elm.type === "u" && elm.name === "TrackNumber") {
            this.currentTrack.TrackNumber = elm.value;
        }
        else if (elm.type === "u" && elm.name === "CodecDelay") {
            this.currentTrack.CodecDelay = elm.value;
        }
        else if (elm.type === "u" && elm.name === "DefaultDuration") {
            // media source api は DefaultDuration を計算するとバグる。
            // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
            // chrome 58 ではこれを回避するために DefaultDuration 要素を抜き取った。
            // chrome 58 以前でもこのタグを抜き取ることで回避できる
            if (this.drop_default_duration) {
                console.warn("DefaultDuration detected!, remove it");
                drop = true;
            }
            else {
                this.currentTrack.DefaultDuration = elm.value;
            }
        }
        else if (elm.name === "unknown") {
            console.warn(elm);
        }
        if (!this.metadataloaded && elm.dataEnd > 0) {
            this.metadataSize = elm.dataEnd;
        }
        if (!drop) {
            this.chunks.push(elm);
        }
        if (this.logging) {
            this.put(elm);
        }
    }
    /**
     * DefaultDuration が定義されている場合は最後のフレームのdurationも考慮する
     * 単位 timestampScale
     *
     * !!! if you need duration with seconds !!!
     * ```js
     * const nanosec = reader.duration * reader.timestampScale;
     * const sec = nanosec / 1000 / 1000 / 1000;
     * ```
     */
    get duration() {
        if (this.trackInfo.type === "nothing") {
            console.warn("no video, no audio track");
            return 0;
        }
        // defaultDuration は 生の nano sec
        let defaultDuration = 0;
        // nanoseconds
        let codecDelay = 0;
        let lastTimestamp = 0;
        const _defaultDuration = this.trackDefaultDuration[this.trackInfo.trackNumber];
        if (typeof _defaultDuration === "number") {
            defaultDuration = _defaultDuration;
        }
        else {
            // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
            // default duration がないときに使う delta
            if (this.trackInfo.type === "both") {
                if (this.last2SimpleBlockAudioTrackTimestamp[1] >
                    this.last2SimpleBlockVideoTrackTimestamp[1]) {
                    // audio diff
                    defaultDuration =
                        (this.last2SimpleBlockAudioTrackTimestamp[1] -
                            this.last2SimpleBlockAudioTrackTimestamp[0]) *
                            this.timestampScale;
                    // audio delay
                    // 2 => audio
                    const delay = this.trackCodecDelay[this.trackTypes.indexOf(2)];
                    if (typeof delay === "number") {
                        codecDelay = delay;
                    }
                    // audio timestamp
                    lastTimestamp = this.last2SimpleBlockAudioTrackTimestamp[1];
                }
                else {
                    // video diff
                    defaultDuration =
                        (this.last2SimpleBlockVideoTrackTimestamp[1] -
                            this.last2SimpleBlockVideoTrackTimestamp[0]) *
                            this.timestampScale;
                    // video delay
                    // 1 => video
                    const delay = this.trackCodecDelay[this.trackTypes.indexOf(1)];
                    if (typeof delay === "number") {
                        codecDelay = delay;
                    }
                    // video timestamp
                    lastTimestamp = this.last2SimpleBlockVideoTrackTimestamp[1];
                }
            }
            else if (this.trackInfo.type === "video") {
                defaultDuration =
                    (this.last2SimpleBlockVideoTrackTimestamp[1] -
                        this.last2SimpleBlockVideoTrackTimestamp[0]) *
                        this.timestampScale;
                const delay = this.trackCodecDelay[this.trackInfo.trackNumber];
                if (typeof delay === "number") {
                    codecDelay = delay;
                }
                lastTimestamp = this.last2SimpleBlockVideoTrackTimestamp[1];
            }
            else if (this.trackInfo.type === "audio") {
                defaultDuration =
                    (this.last2SimpleBlockAudioTrackTimestamp[1] -
                        this.last2SimpleBlockAudioTrackTimestamp[0]) *
                        this.timestampScale;
                const delay = this.trackCodecDelay[this.trackInfo.trackNumber];
                if (typeof delay === "number") {
                    codecDelay = delay;
                }
                lastTimestamp = this.last2SimpleBlockAudioTrackTimestamp[1];
            }
            // else { never }
        }
        // convert to timestampscale
        const duration_nanosec = (this.lastClusterTimestamp + lastTimestamp) * this.timestampScale +
            defaultDuration -
            codecDelay;
        const duration = duration_nanosec / this.timestampScale;
        return Math.floor(duration);
    }
    addListener(event, listener) {
        return super.addListener(event, listener);
    }
    put(elm) {
        if (!this.hasLoggingStarted) {
            this.hasLoggingStarted = true;
            if (this.logging && this.logGroup) {
                console.groupCollapsed(this.logGroup);
            }
        }
        if (elm.type === "m") {
            if (elm.isEnd) {
                console.groupEnd();
            }
            else {
                console.group(elm.name + ":" + elm.tagStart);
            }
        }
        else if (elm.type === "b") {
            // for debug
            //if(elm.name === "SimpleBlock"){
            //const o = EBML.tools.ebmlBlock(elm.value);
            //console.log(elm.name, elm.type, o.trackNumber, o.timestamp);
            //}else{
            console.log(elm.name, elm.type);
            //}
        }
        else {
            console.log(elm.name, elm.tagStart, elm.type, elm.value);
        }
    }
}
exports["default"] = EBMLReader;


/***/ }),

/***/ "./node_modules/ts-ebml/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/ts-ebml/lib/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tools = exports.Reader = exports.Encoder = exports.Decoder = exports.version = void 0;
__exportStar(__webpack_require__(/*! ./EBML */ "./node_modules/ts-ebml/lib/EBML.js"), exports);
const EBMLDecoder_1 = __importDefault(__webpack_require__(/*! ./EBMLDecoder */ "./node_modules/ts-ebml/lib/EBMLDecoder.js"));
exports.Decoder = EBMLDecoder_1.default;
const EBMLEncoder_1 = __importDefault(__webpack_require__(/*! ./EBMLEncoder */ "./node_modules/ts-ebml/lib/EBMLEncoder.js"));
exports.Encoder = EBMLEncoder_1.default;
const EBMLReader_1 = __importDefault(__webpack_require__(/*! ./EBMLReader */ "./node_modules/ts-ebml/lib/EBMLReader.js"));
exports.Reader = EBMLReader_1.default;
const tools = __importStar(__webpack_require__(/*! ./tools */ "./node_modules/ts-ebml/lib/tools.js"));
exports.tools = tools;
const version = (__webpack_require__(/*! ../package.json */ "./node_modules/ts-ebml/package.json").version);
exports.version = version;


/***/ }),

/***/ "./node_modules/ts-ebml/lib/tools.js":
/*!*******************************************!*\
  !*** ./node_modules/ts-ebml/lib/tools.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertEBMLDateToJSDate = exports.createFloatBuffer = exports.createIntBuffer = exports.createUIntBuffer = exports.encodeValueToBuffer = exports.concat = exports.putRefinedMetaData = exports.extractElement = exports.removeElement = exports.makeMetadataSeekable = exports.createRIFFChunk = exports.VP8BitStreamToRiffWebPBuffer = exports.WebPBlockFilter = exports.WebPFrameFilter = exports.encodeTag = exports.readBlock = exports.ebmlBlock = exports.writeVint = exports.readVint = void 0;
const int64_buffer_1 = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
const EBMLEncoder_1 = __importDefault(__webpack_require__(/*! ./EBMLEncoder */ "./node_modules/ts-ebml/lib/EBMLEncoder.js"));
const { tools: _tools } = __webpack_require__(/*! ebml */ "./node_modules/ebml/lib/ebml.esm.js");
const _block = __webpack_require__(/*! ebml-block */ "./node_modules/ebml-block/index.js");
exports.readVint = _tools.readVint;
exports.writeVint = _tools.writeVint;
exports.ebmlBlock = _block;
function readBlock(buf) {
    return (0, exports.ebmlBlock)(Buffer.from(buf));
}
exports.readBlock = readBlock;
/**
 * @param end - if end === false then length is unknown
 */
function encodeTag(tagId, tagData, unknownSize = false) {
    return concat([
        tagId,
        unknownSize
            ? Buffer.from("01ffffffffffffff", "hex")
            : (0, exports.writeVint)(tagData.length),
        tagData
    ]);
}
exports.encodeTag = encodeTag;
/**
 * @return - SimpleBlock to WebP Filter
 */
function WebPFrameFilter(elms) {
    return WebPBlockFilter(elms).reduce((lst, elm) => {
        const o = (0, exports.ebmlBlock)(elm.data);
        return o.frames.reduce((lst, frame) => {
            // https://developers.Blob.com/speed/webp/docs/riff_container
            const webpBuf = VP8BitStreamToRiffWebPBuffer(frame);
            const webp = new Blob([webpBuf], { type: "image/webp" });
            return lst.concat(webp);
        }, lst);
    }, []);
}
exports.WebPFrameFilter = WebPFrameFilter;
/**
 * WebP ファイルにできる SimpleBlock の パスフィルタ
 */
function WebPBlockFilter(elms) {
    return elms.reduce((lst, elm) => {
        if (elm.type !== "b") {
            return lst;
        }
        if (elm.name !== "SimpleBlock") {
            return lst;
        }
        const o = (0, exports.ebmlBlock)(elm.data);
        const hasWebP = o.frames.some((frame) => {
            // https://tools.ietf.org/html/rfc6386#section-19.1
            const startcode = frame.subarray(3, 6).toString("hex");
            return startcode === "9d012a";
        });
        if (!hasWebP) {
            return lst;
        }
        return lst.concat(elm);
    }, []);
}
exports.WebPBlockFilter = WebPBlockFilter;
/**
 * @param frame - VP8 BitStream のうち startcode をもつ frame
 * @return - WebP ファイルの ArrayBuffer
 */
function VP8BitStreamToRiffWebPBuffer(frame) {
    const VP8Chunk = createRIFFChunk("VP8 ", frame);
    const WebPChunk = concat([Buffer.from("WEBP", "ascii"), VP8Chunk]);
    return createRIFFChunk("RIFF", WebPChunk);
}
exports.VP8BitStreamToRiffWebPBuffer = VP8BitStreamToRiffWebPBuffer;
/**
 * RIFF データチャンクを作る
 */
function createRIFFChunk(FourCC, chunk) {
    const chunkSize = Buffer.alloc(4);
    chunkSize.writeUInt32LE(chunk.byteLength, 0);
    return concat([
        Buffer.from(FourCC.substring(0, 4), "ascii"),
        chunkSize,
        chunk,
        // padding
        Buffer.alloc(chunk.byteLength % 2 === 0 ? 0 : 1)
    ]);
}
exports.createRIFFChunk = createRIFFChunk;
/* Original Metadata

 m  0	EBML
 u  1	  EBMLVersion 1
 u  1	  EBMLReadVersion 1
 u  1	  EBMLMaxIDLength 4
 u  1	  EBMLMaxSizeLength 8
 s  1	  DocType webm
 u  1	  DocTypeVersion 4
 u  1	  DocTypeReadVersion 2
 m  0	Segment
 m  1	  Info                                segmentContentStartPos, all CueClusterPositions provided in
                                              info.cues will be relative to here and will need adjusted
 u  2	    TimestampScale 1000000
 8  2	    MuxingApp Chrome
 8  2	    WritingApp Chrome
 m  1	  Tracks                              tracksStartPos
 m  2	    TrackEntry
 u  3	      TrackNumber 1
 u  3	      TrackUID 31790271978391090
 u  3	      TrackType 2
 s  3	      CodecID A_OPUS
 b  3	      CodecPrivate <Buffer 19>
 m  3	      Audio
 f  4	        SamplingFrequency 48000
 u  4	        Channels 1
 m  2	    TrackEntry
 u  3	      TrackNumber 2
 u  3	      TrackUID 24051277436254136
 u  3	      TrackType 1
 s  3	      CodecID V_VP8
 m  3	      Video
 u  4	        PixelWidth 1024
 u  4	        PixelHeight 576
 m  1	  Cluster                             clusterStartPos
 u  2	    Timestamp 0
 b  2	    SimpleBlock track:2 timestamp:0	keyframe:true	invisible:false	discardable:false	lacing:1
*/
/* Desired Metadata

 m	0 EBML
 u	1   EBMLVersion 1
 u	1   EBMLReadVersion 1
 u	1   EBMLMaxIDLength 4
 u	1   EBMLMaxSizeLength 8
 s	1   DocType webm
 u	1   DocTypeVersion 4
 u	1   DocTypeReadVersion 2
 m	0 Segment
 m	1   SeekHead                            -> This is SeekPosition 0, so all SeekPositions can be calculated as
                                               (bytePos - segmentContentStartPos), which is 44 in this case
 m	2     Seek
 b	3       SeekID                          -> Buffer([0x15, 0x49, 0xA9, 0x66])  Info
 u	3       SeekPosition                    -> infoStartPos =
 m	2     Seek
 b	3       SeekID                          -> Buffer([0x16, 0x54, 0xAE, 0x6B])  Tracks
 u	3       SeekPosition { tracksStartPos }
 m	2     Seek
 b	3       SeekID                          -> Buffer([0x1C, 0x53, 0xBB, 0x6B])  Cues
 u	3       SeekPosition { cuesStartPos }
 m	1   Info
 f	2     Duration 32480                    -> overwrite, or insert if it doesn't exist
 u	2     TimestampScale 1000000
 8	2     MuxingApp Chrome
 8	2     WritingApp Chrome
 m	1   Tracks
 m	2     TrackEntry
 u	3       TrackNumber 1
 u	3       TrackUID 31790271978391090
 u	3       TrackType 2
 s	3       CodecID A_OPUS
 b	3       CodecPrivate <Buffer 19>
 m	3       Audio
 f	4         SamplingFrequency 48000
 u	4         Channels 1
 m	2     TrackEntry
 u	3       TrackNumber 2
 u	3       TrackUID 24051277436254136
 u	3       TrackType 1
 s	3       CodecID V_VP8
 m	3       Video
 u	4         PixelWidth 1024
 u	4         PixelHeight 576
 m  1   Cues                                -> cuesStartPos
 m  2     CuePoint
 u  3       CueTime 0
 m  3       CueTrackPositions
 u  4         CueTrack 1
 u  4         CueClusterPosition 3911
 m  2     CuePoint
 u  3       CueTime 600
 m  3       CueTrackPositions
 u  4         CueTrack 1
 u  4         CueClusterPosition 3911
 m  1   Cluster
 u  2     Timestamp 0
 b  2     SimpleBlock track:2 timestamp:0	keyframe:true	invisible:false	discardable:false	lacing:1
*/
/**
 * convert the metadata from a streaming webm bytestream to a seekable file by inserting Duration, Seekhead and Cues
 * @param originalMetadata - orginal metadata (everything before the clusters start) from media recorder
 * @param duration - Duration (TimestampScale)
 * @param cuesInfo - cue points for clusters
 * @param cuesOffset - extra space to leave before cue points
 * @param cuesPosition - location for cue points (if zero, put after tracks metadata)
 */
function makeMetadataSeekable(originalMetadata, duration, cuesInfo, cuesOffset = 0, cuesPosition = 0) {
    // extract the header, we can reuse this as-is
    const header = extractElement("EBML", originalMetadata);
    const headerSize = encodedSizeOfEbml(header);
    //console.error("Header size: " + headerSize);
    //printElementIds(header);
    // After the header comes the Segment open tag, which in this implementation is always 12 bytes (4 byte id, 8 byte 'unknown length')
    // After that the segment content starts. All SeekPositions and CueClusterPosition must be relative to segmentContentStartPos
    const segmentContentStartPos = headerSize + 12;
    //console.error("segmentContentStartPos: " + segmentContentStartPos);
    // find the original metadata size, and adjust it for header size and Segment start element
    // so we can keep all positions relative to segmentContentStartPos
    const originalMetadataSize = originalMetadata[originalMetadata.length - 1].dataEnd -
        segmentContentStartPos;
    //console.error("Original Metadata size: " + originalMetadataSize);
    //printElementIds(originalMetadata);
    // extract the segment info, remove the potentially existing Duration element, and add our own one.
    const info = extractElement("Info", originalMetadata);
    removeElement("Duration", info);
    info.splice(1, 0, {
        name: "Duration",
        type: "f",
        data: createFloatBuffer(duration, 8)
    });
    const infoSize = encodedSizeOfEbml(info);
    //console.error("Info size: " + infoSize);
    //printElementIds(info);
    // extract the track info, we can re-use this as is
    const tracks = extractElement("Tracks", originalMetadata);
    const tracksSize = encodedSizeOfEbml(tracks);
    //console.error("Tracks size: " + tracksSize);
    //printElementIds(tracks);
    // Initial best guess, but could be slightly larger if the Cues element is huge.
    let seekHeadSize = 47;
    let seekHead = [];
    // very rough initial approximation,
    let cuesSize = 5 + cuesInfo.length * 15;
    // depends a lot on file size and number of CuePoints
    let cues = [];
    let lastSizeDifference = -1;
    // The size of SeekHead and Cues elements depends on how many bytes the offsets values can be encoded in.
    // The actual offsets in CueClusterPosition depend on the final size of the SeekHead and Cues elements
    // We need to iteratively converge to a stable solution.
    const maxIterations = 10;
    for (let i = 0; i < maxIterations; i++) {
        // SeekHead starts at 0
        // Info comes directly after SeekHead
        const infoStart = seekHeadSize;
        // Tracks comes directly after Info
        const tracksStart = infoStart + infoSize;
        let cuesStart = 0;
        let newMetadataSize = 0;
        if (cuesPosition) {
            // Cues position is before segment open tag
            cuesStart = cuesPosition - segmentContentStartPos;
            // Cues outside initial metadata
            newMetadataSize = tracksStart + tracksSize;
        }
        else {
            // Cues starts directly after
            cuesStart = tracksStart + tracksSize;
            // total size of metadata
            newMetadataSize = cuesStart + cuesSize;
        }
        // This is the offset all CueClusterPositions should be adjusted by due to the metadata size changing.
        const sizeDifference = newMetadataSize - originalMetadataSize;
        // console.error(`infoStart: ${infoStart}, infoSize: ${infoSize}`);
        // console.error(`tracksStart: ${tracksStart}, tracksSize: ${tracksSize}`);
        // console.error(`cuesStart: ${cuesStart}, cuesSize: ${cuesSize}`);
        // tslint:disable-next-line:max-line-length
        // console.error(`originalMetadataSize: ${originalMetadataSize}, ` + `newMetadataSize: ${newMetadataSize}, sizeDifference: ${sizeDifference}`);
        // create the SeekHead element
        seekHead = [];
        seekHead.push({ name: "SeekHead", type: "m", isEnd: false });
        seekHead.push({ name: "Seek", type: "m", isEnd: false });
        // Info
        seekHead.push({
            name: "SeekID",
            type: "b",
            data: Buffer.from([0x15, 0x49, 0xa9, 0x66])
        });
        seekHead.push({
            name: "SeekPosition",
            type: "u",
            data: createUIntBuffer(infoStart)
        });
        seekHead.push({ name: "Seek", type: "m", isEnd: true });
        seekHead.push({ name: "Seek", type: "m", isEnd: false });
        // Tracks
        seekHead.push({
            name: "SeekID",
            type: "b",
            data: Buffer.from([0x16, 0x54, 0xae, 0x6b])
        });
        seekHead.push({
            name: "SeekPosition",
            type: "u",
            data: createUIntBuffer(tracksStart)
        });
        seekHead.push({ name: "Seek", type: "m", isEnd: true });
        seekHead.push({ name: "Seek", type: "m", isEnd: false });
        // Cues
        seekHead.push({
            name: "SeekID",
            type: "b",
            data: Buffer.from([0x1c, 0x53, 0xbb, 0x6b])
        });
        seekHead.push({
            name: "SeekPosition",
            type: "u",
            data: createUIntBuffer(cuesStart)
        });
        seekHead.push({ name: "Seek", type: "m", isEnd: true });
        seekHead.push({ name: "SeekHead", type: "m", isEnd: true });
        seekHeadSize = encodedSizeOfEbml(seekHead);
        //console.error("SeekHead size: " + seekHeadSize);
        //printElementIds(seekHead);
        // create the Cues element
        cues = [];
        cues.push({ name: "Cues", type: "m", isEnd: false });
        for (const { CueTrack, CueClusterPosition, CueTime } of cuesInfo) {
            cues.push({ name: "CuePoint", type: "m", isEnd: false });
            cues.push({
                name: "CueTime",
                type: "u",
                data: createUIntBuffer(CueTime)
            });
            cues.push({ name: "CueTrackPositions", type: "m", isEnd: false });
            cues.push({
                name: "CueTrack",
                type: "u",
                data: createUIntBuffer(CueTrack)
            });
            // tslint:disable-next-line:max-line-length
            //console.error(`CueClusterPosition: ${CueClusterPosition}, Corrected to: ${CueClusterPosition - segmentContentStartPos}  , offset by ${sizeDifference} to become ${(CueClusterPosition - segmentContentStartPos) + sizeDifference - segmentContentStartPos}`);
            // EBMLReader returns CueClusterPosition with absolute byte offsets.
            // The Cues section expects them as offsets from the first level 1 element of the Segment, so we need to adjust it.
            let _CueClusterPosition = CueClusterPosition - segmentContentStartPos;
            if (cuesOffset) {
                // Leave space before cues.
                _CueClusterPosition += cuesOffset;
            }
            else {
                // We also need to adjust to take into account the change in metadata size from when EBMLReader read the original metadata.
                _CueClusterPosition += sizeDifference;
            }
            cues.push({
                name: "CueClusterPosition",
                type: "u",
                data: createUIntBuffer(_CueClusterPosition)
            });
            cues.push({ name: "CueTrackPositions", type: "m", isEnd: true });
            cues.push({ name: "CuePoint", type: "m", isEnd: true });
        }
        cues.push({ name: "Cues", type: "m", isEnd: true });
        cuesSize = encodedSizeOfEbml(cues);
        //console.error("Cues size: " + cuesSize);
        //console.error("Cue count: " + cuesInfo.length);
        //printElementIds(cues);
        // If the new MetadataSize is not the same as the previous iteration, we need to run once more.
        if (lastSizeDifference !== sizeDifference) {
            lastSizeDifference = sizeDifference;
            if (i === maxIterations - 1) {
                throw new Error("Failed to converge to a stable metadata size");
            }
        }
        else {
            // We're done! Construct the new metadata from all individual components and return.
            //console.error(`Final size: ${newMetadataSize}, difference: ${sizeDifference}`);
            break;
        }
    }
    const finalMetadata = [].concat.apply([], [
        header,
        { name: "Segment", type: "m", isEnd: false, unknownSize: true },
        seekHead,
        info,
        tracks,
        cuesPosition ? [] : cues
    ]);
    const result = new EBMLEncoder_1.default().encode(finalMetadata);
    //printElementIds(finalMetadata);
    //console.error(`Final metadata buffer size: ${result.byteLength}`);
    //console.error(`Final metadata buffer size without header and segment: ${result.byteLength-segmentContentStartPos}`);
    return result;
}
exports.makeMetadataSeekable = makeMetadataSeekable;
/**
 * print all element id names in a list

 * @param metadata - array of EBML elements to print
 *
export function printElementIds(metadata: EBML.EBMLElementBuffer[]) {

  let result: EBML.EBMLElementBuffer[] = [];
  let start: number = -1;

  for (let i = 0; i < metadata.length; i++) {
    console.error("\t id: " + metadata[i].name);
  }
}
*/
/**
 * remove all occurances of an EBML element from an array of elements
 * If it's a MasterElement you will also remove the content. (everything between start and end)
 * @param idName - name of the EBML Element to remove.
 * @param metadata - array of EBML elements to search
 */
function removeElement(idName, metadata) {
    // const result: EBML.EBMLElementBuffer[] = [];
    let start = -1;
    for (let i = 0; i < metadata.length; i++) {
        const element = metadata[i];
        if (element.name === idName) {
            // if it's a Master element, extract the start and end element, and everything in between
            if (element.type === "m") {
                if (!element.isEnd) {
                    start = i;
                }
                else {
                    // we've reached the end, extract the whole thing
                    if (start === -1) {
                        throw new Error(`Detected ${idName} closing element before finding the start`);
                    }
                    metadata.splice(start, i - start + 1);
                    return;
                }
            }
            else {
                // not a Master element, so we've found what we're looking for.
                metadata.splice(i, 1);
                return;
            }
        }
    }
}
exports.removeElement = removeElement;
/**
 * extract the first occurance of an EBML tag from a flattened array of EBML data.
 * If it's a MasterElement you will also get the content. (everything between start and end)
 * @param idName - name of the EBML Element to extract.
 * @param metadata - array of EBML elements to search
 */
function extractElement(idName, metadata) {
    let result = [];
    let start = -1;
    for (let i = 0; i < metadata.length; i++) {
        const element = metadata[i];
        if (element.name === idName) {
            // if it's a Master element, extract the start and end element, and everything in between
            if (element.type === "m") {
                if (!element.isEnd) {
                    start = i;
                }
                else {
                    // we've reached the end, extract the whole thing
                    if (start === -1) {
                        throw new Error(`Detected ${idName} closing element before finding the start`);
                    }
                    result = metadata.slice(start, i + 1);
                    break;
                }
            }
            else {
                // not a Master element, so we've found what we're looking for.
                result.push(metadata[i]);
                break;
            }
        }
    }
    return result;
}
exports.extractElement = extractElement;
/**
 * @deprecated
 * metadata に対して duration と seekhead を追加した metadata を返す
 * @param metadata - 変更前の webm における ファイル先頭から 最初の Cluster 要素までの 要素
 * @param duration - Duration (TimestampScale)
 * @param cues - cue points for clusters
 * @deprecated @param clusterPtrs - 変更前の webm における SeekHead に追加する Cluster 要素 への start pointer
 * @deprecated @param cueInfos - please use cues.
 */
function putRefinedMetaData(metadata, info) {
    if (Array.isArray(info.cueInfos) && !Array.isArray(info.cues)) {
        console.warn("putRefinedMetaData: info.cueInfos property is deprecated. please use info.cues");
        info.cues = info.cueInfos;
    }
    let ebml = [];
    let payload = [];
    for (let i = 0; i < metadata.length; i++) {
        const elm = metadata[i];
        if (elm.type === "m" && elm.name === "Segment") {
            ebml = metadata.slice(0, i);
            payload = metadata.slice(i);
            if (elm.unknownSize) {
                // remove segment tag
                payload.shift();
                break;
            }
            throw new Error("this metadata is not streaming webm file");
        }
    }
    // *0    *4    *5  *36      *40   *48=segmentOffset              *185=originalPayloadOffsetEnd
    // |     |     |   |        |     |                              |
    // [EBML][size]....[Segment][size][Info][size][Duration][size]...[Cluster]
    // |               |        |^inf |                              |
    // |               +segmentSiz(12)+                              |
    // +-ebmlSize(36)--+        |     +-payloadSize(137)-------------+offsetEndDiff+
    //                 |        |     +-newPayloadSize(??)-------------------------+
    //                 |        |     |                                            |
    //                 [Segment][size][Info][size][Duration][size]....[size][value][Cluster]
    //                           ^                                                 |
    //                           |                                                 *??=newPayloadOffsetEnd
    //                           inf
    if (!(payload[payload.length - 1].dataEnd > 0)) {
        throw new Error("metadata dataEnd has wrong number");
    }
    // first cluster ptr
    const originalPayloadOffsetEnd = payload[payload.length - 1].dataEnd;
    // first segment ptr
    const ebmlSize = ebml[ebml.length - 1].dataEnd;
    const refinedEBMLSize = new EBMLEncoder_1.default().encode(ebml).byteLength;
    const offsetDiff = refinedEBMLSize - ebmlSize;
    const payloadSize = originalPayloadOffsetEnd - payload[0].tagStart;
    // const segmentSize = payload[0].tagStart - ebmlSize;
    // const segmentOffset = payload[0].tagStart;
    // Segment
    const segmentTagBuf = Buffer.from([0x18, 0x53, 0x80, 0x67]);
    // Segmentの最後の位置は無数の Cluster 依存なので。 writeVint(newPayloadSize).byteLength ではなく、 infinity.
    const segmentSizeBuf = Buffer.from("01ffffffffffffff", "hex");
    // _segmentSize === segmentSize
    const _segmentSize = segmentTagBuf.byteLength + segmentSizeBuf.byteLength;
    let newPayloadSize = payloadSize;
    // We need the size to be stable between two refinements in order for our offsets to be correct
    // Bound the number of possible refinements so we can't go infinate if something goes wrong
    const count = 20;
    for (let i = 1; i < count; i++) {
        const newPayloadOffsetEnd = ebmlSize + _segmentSize + newPayloadSize;
        const offsetEndDiff = newPayloadOffsetEnd - originalPayloadOffsetEnd;
        const sizeDiff = offsetDiff + offsetEndDiff;
        const refined = refineMetadata(payload, sizeDiff, info);
        // 一旦 seekhead を作って自身のサイズを調べる
        const newNewRefinedSize = new EBMLEncoder_1.default().encode(refined).byteLength;
        if (newNewRefinedSize === newPayloadSize) {
            // Size is stable
            return new EBMLEncoder_1.default().encode([].concat(ebml, [{ type: "m", name: "Segment", isEnd: false, unknownSize: true }], refined));
        }
        newPayloadSize = newNewRefinedSize;
    }
    throw new Error("unable to refine metadata, stable size could not be found in " +
        count +
        " iterations!");
}
exports.putRefinedMetaData = putRefinedMetaData;
// Given a list of EBMLElementBuffers, returns their encoded size in bytes
function encodedSizeOfEbml(refinedMetaData) {
    const encorder = new EBMLEncoder_1.default();
    return refinedMetaData
        .reduce((lst, elm) => lst.concat(encorder.encode([elm])), [])
        .reduce((o, buf) => o + buf.byteLength, 0);
}
function refineMetadata(mesetadata, sizeDiff, info) {
    const { duration, clusterPtrs, cues } = info;
    const _metadata = mesetadata.slice(0);
    if (typeof duration === "number") {
        // duration を追加する
        let overwrited = false;
        for (const elm of _metadata) {
            if (elm.type === "f" && elm.name === "Duration") {
                overwrited = true;
                elm.data = createFloatBuffer(duration, 8);
            }
        }
        if (!overwrited) {
            insertTag(_metadata, "Info", [
                { name: "Duration", type: "f", data: createFloatBuffer(duration, 8) }
            ]);
        }
    }
    if (Array.isArray(cues)) {
        insertTag(_metadata, "Cues", create_cue(cues, sizeDiff));
    }
    let seekhead_children = [];
    if (Array.isArray(clusterPtrs)) {
        console.warn("append cluster pointers to seekhead is deprecated. please use cues");
        seekhead_children = create_seek_from_clusters(clusterPtrs, sizeDiff);
    }
    // remove seek info
    /*
    _metadata = _metadata.filter((elm)=> !(
      elm.name === "Seek" ||
      elm.name === "SeekID" ||
      elm.name === "SeekPosition") );
    */
    // working on progress
    //seekhead_children = seekhead_children.concat(create_seekhead(_metadata));
    insertTag(_metadata, "SeekHead", seekhead_children, true);
    return _metadata;
}
/*
function create_seekhead(
  metadata: (EBML.EBMLElementDetail | EBML.EBMLElementBuffer)[],
  sizeDiff: number
): EBML.EBMLElementBuffer[] {
  const seeks: EBML.EBMLElementBuffer[] = [];
  ["Info", "Tracks", "Cues"].forEach((tagName) => {
    const tagStarts = metadata
      .filter(
        (elm) => elm.type === "m" && elm.name === tagName && elm.isEnd === false
      )
      .map((elm) => elm["tagStart"]);
    const tagStart = tagStarts[0];
    if (typeof tagStart !== "number") {
      return;
    }
    seeks.push({ name: "Seek", type: "m", isEnd: false });
    switch (tagName) {
      case "Info":
        seeks.push({
          name: "SeekID",
          type: "b",
          data: Buffer.from([0x15, 0x49, 0xa9, 0x66])
        });
        break;
      case "Tracks":
        seeks.push({
          name: "SeekID",
          type: "b",
          data: Buffer.from([0x16, 0x54, 0xae, 0x6b])
        });
        break;
      case "Cues":
        seeks.push({
          name: "SeekID",
          type: "b",
          data: Buffer.from([0x1c, 0x53, 0xbb, 0x6b])
        });
        break;
    }
    seeks.push({
      name: "SeekPosition",
      type: "u",
      data: createUIntBuffer(tagStart + sizeDiff)
    });
    seeks.push({ name: "Seek", type: "m", isEnd: true });
  });
  return seeks;
}
*/
function create_seek_from_clusters(clusterPtrs, sizeDiff) {
    const seeks = [];
    for (const start of clusterPtrs) {
        seeks.push({ name: "Seek", type: "m", isEnd: false });
        // [0x1F, 0x43, 0xB6, 0x75] で Cluster 意
        seeks.push({
            name: "SeekID",
            type: "b",
            data: Buffer.from([0x1f, 0x43, 0xb6, 0x75])
        });
        seeks.push({
            name: "SeekPosition",
            type: "u",
            data: createUIntBuffer(start + sizeDiff)
        });
        seeks.push({ name: "Seek", type: "m", isEnd: true });
    }
    return seeks;
}
function create_cue(cueInfos, sizeDiff) {
    const cues = [];
    for (const { CueTrack, CueClusterPosition, CueTime } of cueInfos) {
        cues.push({ name: "CuePoint", type: "m", isEnd: false });
        cues.push({ name: "CueTime", type: "u", data: createUIntBuffer(CueTime) });
        cues.push({ name: "CueTrackPositions", type: "m", isEnd: false });
        // video track
        cues.push({
            name: "CueTrack",
            type: "u",
            data: createUIntBuffer(CueTrack)
        });
        cues.push({
            name: "CueClusterPosition",
            type: "u",
            data: createUIntBuffer(CueClusterPosition + sizeDiff)
        });
        cues.push({ name: "CueTrackPositions", type: "m", isEnd: true });
        cues.push({ name: "CuePoint", type: "m", isEnd: true });
    }
    return cues;
}
function insertTag(_metadata, tagName, children, insertHead = false) {
    // find the tagname from _metadata
    let idx = -1;
    for (let i = 0; i < _metadata.length; i++) {
        const elm = _metadata[i];
        if (elm.type === "m" && elm.name === tagName && !elm.isEnd) {
            idx = i;
            break;
        }
    }
    if (idx >= 0) {
        // insert [<CuePoint />] to <Cues />
        Array.prototype.splice.apply(_metadata, [idx + 1, 0].concat(children));
    }
    else if (insertHead) {
        const elms = [].concat([{ name: tagName, type: "m", isEnd: false }], children, [{ name: tagName, type: "m", isEnd: true }]);
        elms.reverse();
        for (const elm of elms) {
            _metadata.unshift(elm);
        }
    }
    else {
        // metadata 末尾に <Cues /> を追加
        // insert <Cues />
        _metadata.push({ name: tagName, type: "m", isEnd: false });
        for (const elm of children) {
            _metadata.push(elm);
        }
        _metadata.push({ name: tagName, type: "m", isEnd: true });
    }
}
function concat(list) {
    return Buffer.concat(list);
}
exports.concat = concat;
function encodeValueToBuffer(elm) {
    let data = Buffer.alloc(0);
    if (elm.type === "m") {
        return elm;
    }
    switch (elm.type) {
        case "u":
            data = createUIntBuffer(elm.value);
            break;
        case "i":
            data = createIntBuffer(elm.value);
            break;
        case "f":
            data = createFloatBuffer(elm.value);
            break;
        case "s":
            data = Buffer.from(elm.value, "ascii");
            break;
        case "8":
            data = Buffer.from(elm.value, "utf8");
            break;
        case "b":
            data = elm.value;
            break;
        case "d":
            data = new int64_buffer_1.Int64BE(elm.value.getTime().toString()).toBuffer();
            break;
    }
    return Object.assign({}, elm, { data });
}
exports.encodeValueToBuffer = encodeValueToBuffer;
function createUIntBuffer(value) {
    // Big-endian, any size from 1 to 8
    // but js number is float64, so max 6 bit octets
    let bytes = 1;
    for (; value >= Math.pow(2, 8 * bytes); bytes++) {
        void 0;
    }
    if (bytes >= 7) {
        console.warn("7bit or more bigger uint not supported.");
        return new int64_buffer_1.Uint64BE(value).toBuffer();
    }
    const data = Buffer.alloc(bytes);
    data.writeUIntBE(value, 0, bytes);
    return data;
}
exports.createUIntBuffer = createUIntBuffer;
function createIntBuffer(value) {
    // Big-endian, any size from 1 to 8 octets
    // but js number is float64, so max 6 bit
    let bytes = 1;
    /* eslint no-empty: off */
    for (; value >= Math.pow(2, 8 * bytes); bytes++) { }
    if (bytes >= 7) {
        console.warn("7bit or more bigger uint not supported.");
        return new int64_buffer_1.Int64BE(value).toBuffer();
    }
    const data = Buffer.alloc(bytes);
    data.writeIntBE(value, 0, bytes);
    return data;
}
exports.createIntBuffer = createIntBuffer;
function createFloatBuffer(value, bytes = 8) {
    // Big-endian, defined for 4 and 8 octets (32, 64 bits)
    // js number is float64 so 8 bytes.
    if (bytes === 8) {
        // 64bit
        const data = Buffer.alloc(8);
        data.writeDoubleBE(value, 0);
        return data;
    }
    else if (bytes === 4) {
        // 32bit
        const data = Buffer.alloc(4);
        data.writeFloatBE(value, 0);
        return data;
    }
    else {
        throw new Error("float type bits must 4bytes or 8bytes");
    }
}
exports.createFloatBuffer = createFloatBuffer;
function convertEBMLDateToJSDate(int64str) {
    if (int64str instanceof Date) {
        return int64str;
    }
    return new Date(new Date("2001-01-01T00:00:00.000Z").getTime() +
        Number(int64str) / 1000 / 1000);
}
exports.convertEBMLDateToJSDate = convertEBMLDateToJSDate;


/***/ }),

/***/ "video.js":
/*!*************************************************************************************************!*\
  !*** external {"commonjs":"video.js","commonjs2":"video.js","amd":"video.js","root":"videojs"} ***!
  \*************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_video_js__;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
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
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/ts-ebml/package.json":
/*!*******************************************!*\
  !*** ./node_modules/ts-ebml/package.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"ts-ebml","version":"3.0.1","description":"ebml decoder and encoder","scripts":{"clean":"rimraf lib/* dist/* test/*.js","build":"npm run clean && tsc -p . && npm run _build_standalone && npm run _build_test","_build_standalone":"browserify lib/index.js --standalone EBML -o dist/EBML.js && uglifyjs dist/EBML.js > dist/EBML.min.js","_build_test":"espower lib/test.js > lib/test.tmp && mv -f lib/test.tmp lib/test.js && browserify lib/test.js -o dist/test.js","test":"playwright install && playwright test","serve":"http-server","lint":"eslint src","fmt":"prettier --write \'src/**/*.ts\'","doc":"typedoc src/index.ts"},"repository":{"type":"git","url":"git+https://github.com/legokichi/ts-ebml.git"},"keywords":["ebml","webm","mkv","matrosika","webp"],"author":"legokichi duckscallion","license":"MIT","bugs":{"url":"https://github.com/legokichi/ts-ebml/issues"},"homepage":"https://github.com/legokichi/ts-ebml#readme","dependencies":{"bigint-buffer":"^1.1.5","commander":"^12.0.0","ebml":"^3.0.0","ebml-block":"^1.1.2","events":"^3.3.0","int64-buffer":"^1.0.1","matroska":"^2.2.5","matroska-schema":"^2.1.0"},"devDependencies":{"@playwright/test":"^1.41.2","@types/empower":"^1.2.35","@types/node":"^20.11.19","@types/qunit":"^2.19.10","@typescript-eslint/eslint-plugin":"^7.0.1","@typescript-eslint/parser":"^7.0.1","aliasify":"^2.1.0","browserify":"^17.0.0","empower":"^1.3.1","eslint":"^8.56.0","eslint-config-prettier":"^9.1.0","espower-cli":"^1.1.0","http-server":"^14.1.1","power-assert":"^1.6.1","power-assert-formatter":"^1.4.1","prettier":"^3.2.5","qunit":"^2.20.0","qunit-tap":"^1.5.1","rimraf":"^5.0.5","typedoc":"^0.25.3","typedoc-plugin-missing-exports":"^2.1.0","typescript":"^5.2.2","uglify-js":"^3.17.4"},"bin":"./lib/cli.js","main":"./lib/index.js","typings":"./lib/index.d.ts","browserify":{"transform":["aliasify"]},"aliasify":{"aliases":{"ebml":"ebml/lib/ebml.js"}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/plugins/ts-ebml-plugin.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});