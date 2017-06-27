require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

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

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
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
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(array)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
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

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
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
    case 'binary':
    case 'base64':
    case 'raw':
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
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
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
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

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

// Even though this property is private, it shouldn't be removed because it is
// used by `is-buffer` to detect buffer instances in Safari 5-7.
Buffer.prototype._isBuffer = true

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

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
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
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
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

function binaryWrite (buf, string, offset, length) {
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
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
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

      case 'binary':
        return binaryWrite(this, string, offset, length)

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

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
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
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

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
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

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
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

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
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
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
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
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
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
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
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
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
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
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
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
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

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
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

  for (var i = 0; i < length; i++) {
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
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
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
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":3,"ieee754":4,"isarray":5}],3:[function(require,module,exports){
;(function (exports) {
  'use strict'

  var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

  var PLUS = '+'.charCodeAt(0)
  var SLASH = '/'.charCodeAt(0)
  var NUMBER = '0'.charCodeAt(0)
  var LOWER = 'a'.charCodeAt(0)
  var UPPER = 'A'.charCodeAt(0)
  var PLUS_URL_SAFE = '-'.charCodeAt(0)
  var SLASH_URL_SAFE = '_'.charCodeAt(0)

  function decode (elt) {
    var code = elt.charCodeAt(0)
    if (code === PLUS || code === PLUS_URL_SAFE) return 62 // '+'
    if (code === SLASH || code === SLASH_URL_SAFE) return 63 // '/'
    if (code < NUMBER) return -1 // no match
    if (code < NUMBER + 10) return code - NUMBER + 26 + 26
    if (code < UPPER + 26) return code - UPPER
    if (code < LOWER + 26) return code - LOWER + 26
  }

  function b64ToByteArray (b64) {
    var i, j, l, tmp, placeHolders, arr

    if (b64.length % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    var len = b64.length
    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(b64.length * 3 / 4 - placeHolders)

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? b64.length - 4 : b64.length

    var L = 0

    function push (v) {
      arr[L++] = v
    }

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
      push((tmp & 0xFF0000) >> 16)
      push((tmp & 0xFF00) >> 8)
      push(tmp & 0xFF)
    }

    if (placeHolders === 2) {
      tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
      push(tmp & 0xFF)
    } else if (placeHolders === 1) {
      tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
      push((tmp >> 8) & 0xFF)
      push(tmp & 0xFF)
    }

    return arr
  }

  function uint8ToBase64 (uint8) {
    var i
    var extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
    var output = ''
    var temp, length

    function encode (num) {
      return lookup.charAt(num)
    }

    function tripletToBase64 (num) {
      return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
    }

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
      output += tripletToBase64(temp)
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    switch (extraBytes) {
      case 1:
        temp = uint8[uint8.length - 1]
        output += encode(temp >> 2)
        output += encode((temp << 4) & 0x3F)
        output += '=='
        break
      case 2:
        temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
        output += encode(temp >> 10)
        output += encode((temp >> 4) & 0x3F)
        output += encode((temp << 2) & 0x3F)
        output += '='
        break
      default:
        break
    }

    return output
  }

  exports.toByteArray = b64ToByteArray
  exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],4:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
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
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

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
  var eLen = nBytes * 8 - mLen - 1
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
      m = (value * c - 1) * Math.pow(2, mLen)
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

},{}],5:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],6:[function(require,module,exports){
(function (process){
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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
module.exports = function(nodent,html,url,options){
	var f = [[],[]] ;
	var re = [/(.*)(<script[^>]*>)(.*)/i,/(.*)(<\/script>)(.*)/i] ;
	var m = 0 ;
	var initScript = true ;
	html = html.split("\n") ;

	for (var l=0; l<html.length; ) {
		var fragment = re[m].exec(html[l]) ;
		if (fragment) {
			if (m==0 && fragment[2].match("src="))
				fragment = null ;
		} 
		if (!fragment) {
			f[m].push(html[l++]) ;
		} else {
			if (m==1) {
				f[m].push(fragment[1]) ;
				pr = nodent.compile(f[1].join("\n"),url,3,options.compiler).code;
				if (initScript && options.runtime) {
					initScript = false ;
					if (options.runtime)
						f[0].push("Function.prototype.$asyncbind = "+nodent.$asyncbind.toString()+";\n") ;
				}
				f[0].push(pr) ;
				f[1] = [] ;
				m = 0 ;
				f[m].push(fragment[2]) ;
			} else {
				f[m].push(fragment[1]) ;
				f[m].push(fragment[2]) ;
				m = 1 ;
			}
			html[l] = fragment[3] ;
		}
	}
	return f[0].join("\n") ;
}

},{}],9:[function(require,module,exports){
'use strict';

/* We manipulate (abstract syntax) trees */
var parser = require('./parser');
var outputCode = require('./output');
/** Helpers **/
function printNode(n) {
    if (Array.isArray(n)) 
        return n.map(printNode).join("|\n");
    try {
        return outputCode(n);
    } catch (ex) {
        return ex.message + "\n" + n.type;
    }
}

function cloneNode(n) {
    if (Array.isArray(n)) 
        return n.map(function (n) {
        return cloneNode(n);
    });
    var o = {};
    Object.keys(n).forEach(function (k) {
        o[k] = n[k];
    });
    return o;
}

/* Bit of a hack: without having to search for references to this
 * node, force it to be some replacement node */
function coerce(node, replace) {
    node.__proto__ = Object.getPrototypeOf(replace);
    Object.keys(node).forEach(function (k) {
        delete node[k];
    });
    Object.keys(replace).forEach(function (k) {
        node[k] = replace[k];
    });
}

var examinations = {
        getScope: function(){ return  this.node.type === 'FunctionDeclaration' || this.node.type === 'FunctionExpression' || this.node.type === 'Function' || this.node.type === 'ObjectMethod' || this.node.type === 'ClassMethod' || this.node.type === 'ArrowFunctionExpression' && this.node.body.type === 'BlockStatement' ? this.node.body.body : this.node.type === 'Program' ? this.node.body : null},
        isScope: function(){ return  this.node.type === 'FunctionDeclaration' || this.node.type === 'FunctionExpression' || this.node.type === 'Function' || this.node.type === 'Program' || this.node.type === 'ObjectMethod' || this.node.type === 'ClassMethod' || this.node.type === 'ArrowFunctionExpression' && this.node.body.type === 'BlockStatement'},
        isFunction: function(){ return  this.node.type === 'FunctionDeclaration' || this.node.type === 'FunctionExpression' || this.node.type === 'Function' || this.node.type === 'ArrowFunctionExpression'},
        isClass: function(){ return  this.node.type === 'ClassDeclaration' || this.node.type === 'ClassExpression'},
        isBlockStatement: function(){ return  this.node.type === 'Program' || this.node.type === 'BlockStatement' ? this.node.body : this.node.type === 'SwitchCase' ? this.node.consequent : false},
        isExpressionStatement: function(){ return  this.node.type === 'ExpressionStatement'},
        isLiteral: function(){ return  this.node.type === 'Literal' || this.node.type === 'BooleanLiteral' || this.node.type === 'RegExpLiteral' || this.node.type === 'NumericLiteral' || this.node.type === 'StringLiteral' || this.node.type === 'NullLiteral'},
        isDirective: function(){ return  this.node.type === 'ExpressionStatement' && (this.node.expression.type === 'StringLiteral' || this.node.expression.type === 'Literal' && typeof this.node.expression.value === 'string')},
        isUnaryExpression: function(){ return  this.node.type === 'UnaryExpression'},
        isAwait: function(){ return  this.node.type === 'AwaitExpression'},
        isAsync: function(){ return  this.node.async},
        isStatement: function(){ return  this.node.type.match(/[a-zA-Z]+Declaration/) !== null || this.node.type.match(/[a-zA-Z]+Statement/) !== null},
        isExpression: function(){ return  this.node.type.match(/[a-zA-Z]+Expression/) !== null},
        isLoop: function(){ return  this.node.type === 'ForStatement' || this.node.type === 'WhileStatement' || this.node.type === 'DoWhileStatement'}, //   Other loops?
        isJump: function(){ return  this.node.type === 'ReturnStatement' || this.node.type === 'ThrowStatement' || this.node.type === 'BreakStatement' || this.node.type === 'ContinueStatement'},
        isES6: function(){ return  this.node.type === 'ArrowFunctionExpression' 
            || this.node.type === 'ForOfStatement' 
            || (this.node.type === 'VariableDeclaration' && this.node.kind !== 'var')
            || ((this.node.type === 'FunctionDeclaration' || this.node.type === 'FunctionExpression') && this.node.generator === 'true')
            || this.node.type === 'YieldExpression'
            || this.node.type === 'Super'
            || this.node.type === 'SpreadElement'
            || this.node.type === 'TemplateLiteral'
            || this.node.type === 'ClassDeclaration'
            || this.node.type === 'ClassExpression'}
};

var NodeExaminerProto = {} ;
Object.keys(examinations).forEach(function(k){
    Object.defineProperty(NodeExaminerProto,k,{
        get:examinations[k]
    }) ;
}) ;
var NodeExaminer = Object.create(NodeExaminerProto) ;
function examine(node) {
    if (!node) 
        return {};
    NodeExaminer.node = node ;
    return NodeExaminer ;
}

function replaceNode(ast, node, replacement) {
    if (Array.isArray(ast)) {
        return ast.map(function (n) {
            return replaceNode(n, node, replacement);
        });
    }
    return parser.treeWalker(ast, function (child, descend, path) {
        if (child === node) {
            path[0].replace(replacement);
        } else {
            descend();
        }
    });
}

function contains(ast, fn, subScopes) {
    if (!ast) 
        return null;
    if (fn && typeof fn === 'object') {
        var keys = Object.keys(fn);
        return contains(ast, function (node) {
            return keys.every(function (k) {
                return node[k] == fn[k];
            });
        });
    }
    var n, found = {};
    if (Array.isArray(ast)) {
        for (var i = 0;i < ast.length; i++) 
            if (n = contains(ast[i], fn)) 
            return n;
        return null;
    }
    try {
        parser.treeWalker(ast, function (node, descend, path) {
            if (fn(node)) {
                found.node = node;
                throw found;
            }
            if (node === ast || subScopes || !examine(node).isFunction) 
                descend();
        });
    } catch (ex) {
        if (ex === found) 
            return found.node;
        throw ex;
    }
    return null;
}

function containsAwait(ast) {
    return contains(ast, {
        type: 'AwaitExpression'
    });
}

function containsBlockScopedDeclarations(nodes) {
    for (var i = 0;i < nodes.length; i++) {
        var node = nodes[i];
        if (node.type === 'ClassDefinition' || node.type === 'VariableDeclaration' && (node.kind === 'let' || node.kind === 'const')) {
            return true;
        }
    }
    return false;
}

function babelLiteralNode(value) {
    if (value === null) 
        return {
        type: 'NullLiteral',
        value: null,
        raw: 'null'
    };
    if (value === true || value === false) 
        return {
        type: 'BooleanLiteral',
        value: value,
        raw: JSON.stringify(value)
    };
    if (value instanceof RegExp) {
        var str = value.toString();
        var parts = str.split('/');
        return {
            type: 'RegExpLiteral',
            value: value,
            raw: str,
            pattern: parts[1],
            flags: parts[2]
        };
    }
    if (typeof value === 'number') 
        return {
        type: 'NumericLiteral',
        value: value,
        raw: JSON.stringify(value)
    };
    return {
        type: 'StringLiteral',
        value: value,
        raw: JSON.stringify(value)
    };
}

function ident(name, loc) {
    return {
        type: 'Identifier',
        name: name,
        loc: loc
    };
}

function idents(s) {
    var r = {};
    for (var k in s) 
        r[k] = typeof s[k] === "string" ? ident(s[k]) : s[k];
    return r;
}

function asynchronize(pr, __sourceMapping, opts, logger) {
    var continuations = {};
    var generatedSymbol = 1;
    var genIdent = {};
    Object.keys(opts).filter(function (k) {
        return k[0] === '$';
    }).forEach(function (k) {
        genIdent[k.slice(1)] = ident(opts[k]);
    });
    
    function where(node) {
        return pr.filename + (node && node.loc && node.loc.start ? "(" + node.loc.start.line + ":" + node.loc.start.column + ")\t" : "\t");
    }

    function literal(value) {
        if (opts.babelTree) {
            return babelLiteralNode(value);
        } else {
            return {
                type: 'Literal',
                value: value,
                raw: JSON.stringify(value)
            };
        }
    }
    
    function getMemberFunction(node) {
        if (opts.babelTree && (node.type === 'ClassMethod' || node.type === 'ObjectMethod')) {
            return node;
        } else if ((!opts.babelTree && node.type === 'MethodDefinition' || node.type === 'Property' && (node.method || node.kind == 'get' || node.kind == 'set')) && examine(node.value).isFunction) {
            return node.value;
        }
        return null;
    }
    
    var assign$Args = {
        "type": "VariableDeclaration",
        "kind": "var",
        "declarations": [{
            "type": "VariableDeclarator",
            "id": genIdent.arguments,
            "init": ident("arguments")
        }]
    };
    function replaceArguments(ast) {
        if (!ast) 
            return false;
        var r = false;
        if (Array.isArray(ast)) {
            for (var i = 0;i < ast.length; i++) 
                if (replaceArguments(ast[i])) 
                r = true;
            return r;
        }
        parser.treeWalker(ast, function (node, descend, path) {
            if (node.type === 'Identifier' && node.name === 'arguments') {
                node.name = opts.$arguments;
                r = true;
            } else if (node === ast || !examine(node).isFunction) 
                descend();
        });
        return r;
    }
    
    function generateSymbol(node) {
        if (typeof node != 'string') 
            node = node.type;
        return opts.generatedSymbolPrefix + node + "_" + generatedSymbol++;
    }
    
    function setExit(n, sym) {
        if (n) {
            n.$exit = idents({
                $error: sym.$error,
                $return: sym.$return
            });
        }
        return n;
    }
    
    function getExitNode(path) {
        for (var n = 0;n < path.length; n++) {
            if (path[n].self.$exit) {
                return path[n].self;
            }
            if (path[n].parent && path[n].parent.$exit) {
                return path[n].parent;
            }
        }
        return null;
    }
    
    function getExit(path, parents) {
        var n = getExitNode(path);
        if (n) 
            return n.$exit;
        if (parents) {
            for (var i = 0;i < parents.length; i++) 
                if (parents[i]) 
                return idents(parents[i]);
        }
        return null;
    }
        
    pr.ast = fixSuperReferences(pr.ast);
    if (opts.generators) {
        pr.ast = asyncSpawn(pr.ast);
        pr.ast = exposeCompilerOpts(pr.ast);
    } else {
        asyncTransforms(pr.ast);
    }
    return pr;
    function asyncTransforms(ast, awaitFlag) {
        // Because we create functions (and scopes), we need all declarations before use
        blockifyArrows(ast);
        hoistDeclarations(ast);
        // All TryCatch blocks need a name so we can (if necessary) find out what the enclosing catch routine is called
        labelTryCatch(ast);
        // Convert async functions and their contained returns & throws
        asyncDefine(ast);
        asyncDefineMethod(ast);
        // Loops are asynchronized in an odd way - the loop is turned into a function that is
        // invoked through tail recursion OR callback. They are like the inner functions of
        // async functions to allow for completion and throwing
        asyncLoops(ast);
        // Handle the various JS control flow keywords by splitting into continuations that could
        // be invoked asynchronously
        mapLogicalOp(ast);
        mapCondOp(ast);
        walkDown(ast, [mapTryCatch,mapIfStmt,mapSwitch]);
        // Map awaits by creating continuations and passing them into the async resolver
        asyncAwait(ast, awaitFlag);
        exposeCompilerOpts(ast);
        // Remove guff generated by transpiling
        cleanCode(ast);
    }
    
    function bound(expr) {
        return {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": expr,
                "property": genIdent.asyncbind,
                "computed": false
            },
            "arguments": [{
                "type": "ThisExpression"
            }]
        };
    }
    
    function makeBoundFn(name, body, argnames, binding) {
        return {
            // :> var name = function(args}{body}.$asyncbind(this)
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [{
                type: 'VariableDeclarator',
                id: ident(name),
                init: {
                    "type": "CallExpression",
                    "callee": {
                        "type": "MemberExpression",
                        "object": {
                            "type": "FunctionExpression",
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "params": argnames || [],
                            "body": body
                        },
                        "property": genIdent.asyncbind,
                        "computed": false
                    },
                    "arguments": [{
                        "type": "ThisExpression"
                    },binding]
                }
            }]
        };
    }
    
    /* Create a 'continuation' - a block of statements that have been hoisted
     * into a named function so they can be invoked conditionally or asynchronously */
    function makeContinuation(name, body) {
        var ctn = {
            $continuation: true,
            type: 'FunctionDeclaration',
            id: ident(name),
            params: [],
            body: {
                type: 'BlockStatement',
                body: cloneNode(body)
            }
        };
        continuations[name] = {
            def: ctn
        };
        return ctn;
    }
    
    /* Generate an expression AST the immediate invokes the specified async function, e.g.
     *      (await ((async function(){ ...body... })()))
     */
    function internalIIAFE(body) {
        return {
            type: 'AwaitExpression',
            argument: asyncDefine({
                "type": "FunctionExpression",
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": body
                }
            }).body.body[0].argument
        }
    }
    
    /* Used to invoke a 'continuation' - a function that represents
     * a block of statements lifted out so they can be labelled (as
     * a function definition) to be invoked via multiple execution
     * paths - either conditional or asynchronous. Since 'this' existed
     * in the original scope of the statements, the continuation function
     * must also have the correct 'this'.*/
    function thisCall(name, args) {
        if (typeof name === 'string') 
            name = ident(name);
        var n = {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": name,
                "property": ident('call'),
                "computed": false
            },
            "arguments": [{
                "type": "ThisExpression"
            }].concat(args || [])
        };
        name.$thisCall = n;
        n.$thisCallName = name.name;
        return n;
    }
    
    function deferredFinally(node, expr) {
        return {
            "type": "CallExpression",
            "callee": ident(node.$seh + "Finally"),
            "arguments": expr ? [expr] : []
        };
    }
    
    /**
     * returnMapper is an Uglify2 transformer that is used to change statements such as:
     *     return some-expression ;
     * into
     *     return $return(some-expression) ;
     * for the current scope only -i.e. returns nested in inner functions are NOT modified.
     *
     * This allows us to capture a normal "return" statement and actually implement it
     * by calling the locally-scoped function $return()
     */
    function mapReturns(n, path) {
        if (Array.isArray(n)) {
            return n.map(function (m) {
                return mapReturns(m, path);
            });
        }
        var lambdaNesting = 0;
        return parser.treeWalker(n, function (node, descend, path) {
            if (node.type === 'ReturnStatement' && !node.$mapped) {
                if (lambdaNesting > 0) {
                    if (!node.async) {
                        return descend(node);
                    }
                    delete node.async;
                }
                /* NB: There is a special case where we do a REAL return to allow for chained async-calls and synchronous returns
                 *
                 * The selected syntax for this is:
                 *   return void (expr) ;
                 * which is mapped to:
                 *   return (expr) ;
                 *
                 * Note that the parenthesis are necessary in the case of anything except a single symbol as "void" binds to
                 * values before operator. In the case where we REALLY want to return undefined to the callback, a simple
                 * "return" or "return undefined" works.
                 *
                 * There is an argument for only allowing this exception in es7 mode, as Promises and generators might (one day)
                 * get their own cancellation method.
                 * */
                if (examine(node.argument).isUnaryExpression && node.argument.operator === "void") {
                    node.argument = node.argument.argument;
                } else {
                    node.argument = {
                        "type": "CallExpression",
                        callee: getExit(path, [opts]).$return,
                        "arguments": node.argument ? [node.argument] : []
                    };
                }
                return;
            } else if (node.type === 'ThrowStatement') {
                if (lambdaNesting > 0) {
                    if (!node.async) {
                        return descend(node);
                    }
                    delete node.async;
                }
                node.type = 'ReturnStatement';
                node.$mapped = true;
                node.argument = {
                    type: 'CallExpression',
                    callee: getExit(path, [opts]).$error,
                    arguments: [node.argument]
                };
                return;
            } else if (examine(node).isFunction) {
                lambdaNesting++;
                descend(node);
                lambdaNesting--;
                return;
            } else {
                descend(node);
                return;
            }
        }, path);
    }
    
    /*
    To implement conditional execution, a?b:c is mapped to 

      await (async function(){ if (a) return b ; return c })

      Note that 'await (async function(){})()' can be optimized to a Thenable since no args are passed
   */
    function mapCondOp(ast, state) {
        if (Array.isArray(ast)) 
            return ast.map(function (n) {
            return mapCondOp(n, state);
        });
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            if (node.type === 'ConditionalExpression' && (containsAwait(node.alternate) || containsAwait(node.consequent))) {
                var z = ident(generateSymbol("condOp"));
                var xform = internalIIAFE([    
                   {
                       "type": "IfStatement",
                       "test": node.test,
                       "consequent": {
                           "type": "ReturnStatement",
                           "argument": node.consequent
                       },
                       "alternate": null
                   },
                   {
                       "type": "ReturnStatement",
                       "argument": node.alternate
                   }
                ]) ;
                coerce(node, xform);
            }
        }, state);
        return ast;
    }
    
    /*
      To implement conditional execution, logical operators with an awaited RHS are mapped thus:

        Translate a || b into await (async function Or(){ var z ; if (!(z=a)) z=b ; return z })
        Translate a && b into await (async function And(){ var z ; if (z=a) z=b ; return z })

        Note that 'await (async function(){})()' can be optimized to a Thenable since no args are passed
     */
    function mapLogicalOp(ast, state) {
        if (Array.isArray(ast)) 
            return ast.map(function (n) {
            return mapLogicalOp(n, state);
        });
        parser.treeWalker(ast, function (node, descend, path) {
            function awaitedTest(truthy, falsy) {
                return internalIIAFE([{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": z,
                        "init": null
                    }],
                    "kind": "var"
                },{
                    "type": "IfStatement",
                    "test": truthy,
                    "consequent": falsy,
                    "alternate": null
                },{
                    "type": "ReturnStatement",
                    "argument": z
                }]) ;
            }

            descend();
            if (node.type === 'LogicalExpression' && containsAwait(node.right)) {
                var xform;
                var z = ident(generateSymbol("logical" + (node.operator === '&&' ? "And" : "Or")));
                
                if (node.operator === '||') {
                    xform = awaitedTest({
                        "type": "UnaryExpression",
                        "operator": "!",
                        "prefix": true,
                        "argument": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": z,
                            "right": node.left
                        }
                    }, {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": z,
                            "right": node.right
                        }
                    });
                } else if (node.operator === '&&') {
                    xform = awaitedTest({
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": z,
                        "right": node.left
                    }, {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": z,
                            "right": node.right
                        }
                    });
                } else 
                    throw new Error(where(node) + "Illegal logical operator: "+node.operator);
                coerce(node, xform);
            }
        }, state);
        return ast;
    }
    
    /*
     * Translate:
  if (x) { y; } more... ;
     * into
  if (x) { y; return $more(); } function $more() { more... } $more() ;
     *
     * ...in case 'y' uses await, in which case we need to invoke $more() at the end of the
     * callback to continue execution after the case.
     */
    function mapIfStmt(ifStmt, path, down) {
        if (ifStmt.type === 'IfStatement' && containsAwait([ifStmt.consequent,ifStmt.alternate])) {
            var symName = generateSymbol(ifStmt);
            var synthBlock = {
                type: 'BlockStatement',
                body: [ifStmt]
            };
            var ref = path[0];
            if ('index' in ref) {
                var idx = ref.index;
                var deferredCode = ref.parent[ref.field].splice(idx + 1, ref.parent[ref.field].length - (idx + 1));
                ref.parent[ref.field][idx] = synthBlock;
                if (deferredCode.length) {
                    var call = {
                        type: 'ReturnStatement',
                        argument: thisCall(symName)
                    };
                    synthBlock.body.unshift(down(makeContinuation(symName, deferredCode)));
                    [ifStmt.consequent,ifStmt.alternate].forEach(function (cond) {
                        if (!cond) 
                            return;
                        var blockEnd;
                        if (!examine(cond).isBlockStatement) 
                            blockEnd = cond;
                         else 
                            blockEnd = cond.body[cond.body.length - 1];
                        if (!(blockEnd.type === 'ReturnStatement')) {
                            if (!(cond.type === 'BlockStatement')) {
                                coerce(cond, {
                                    type: 'BlockStatement',
                                    body: [cloneNode(cond)]
                                });
                            }
                            cond.$deferred = true;
                            cond.body.push(cloneNode(call));
                        }
                        down(cond);
                    });
                    // If both blocks are transformed, the trailing call to $post_if()
                    // can be omitted as it'll be unreachable via a synchronous path
                    if (!(ifStmt.consequent && ifStmt.alternate && ifStmt.consequent.$deferred && ifStmt.alternate.$deferred)) 
                        synthBlock.body.push(cloneNode(call));
                }
            } else {
                ref.parent[ref.field] = synthBlock;
            }
        }
    }
    
    function mapSwitch(switchStmt, path, down) {
        if (!switchStmt.$switched && switchStmt.type === 'SwitchStatement' && containsAwait(switchStmt.cases)) {
            switchStmt.$switched = true;
            var symName, deferred, deferredCode, ref = path[0];
            if ('index' in ref) {
                var j = ref.index + 1;
                deferredCode = ref.parent[ref.field].splice(j, ref.parent[ref.field].length - j);
                if (deferredCode.length && deferredCode[deferredCode.length - 1].type === 'BreakStatement') 
                    ref.parent[ref.field].push(deferredCode.pop());
                symName = generateSymbol(switchStmt);
                deferred = thisCall(symName);
                ref.parent[ref.field].unshift(makeContinuation(symName, deferredCode));
                ref.parent[ref.field].push({
                    type: 'ExpressionStatement',
                    expression: cloneNode(deferred)
                });
            }
            // Now transform each case so that 'break' looks like return <deferred>
            switchStmt.cases.forEach(function (caseStmt, idx) {
                if (!(caseStmt.type === 'SwitchCase')) {
                    throw new Error("switch contains non-case/default statement: " + caseStmt.type);
                }
                if (containsAwait(caseStmt.consequent)) {
                    var end = caseStmt.consequent[caseStmt.consequent.length - 1];
                    if (end.type === 'BreakStatement') {
                        caseStmt.consequent[caseStmt.consequent.length - 1] = {
                            type: 'ReturnStatement',
                            argument: deferred && cloneNode(deferred)
                        };
                    } else if (end.type === 'ReturnStatement' || end.type === 'ThrowStatement') {} else {
                        // Do nothing - block ends in return or throw
                        logger(where(caseStmt) + "switch-case fall-through not supported - added break. See https://github.com/MatAtBread/nodent#differences-from-the-es7-specification");
                        caseStmt.consequent.push({
                            type: 'ReturnStatement',
                            argument: deferred && cloneNode(deferred)
                        });
                    }
                }
            });
            return true;
        }
    }
    
    /* Give unique names to TryCatch blocks */
    function labelTryCatch(ast) {
        parser.treeWalker(ast, function (node, descend, path) {
            if (node.type === 'TryStatement' && containsAwait(node)) {
                // Every try-catch needs a name, so asyncDefine/asyncAwait knows who's handling errors
                var parent = getExit(path, [opts]);
                node.$seh = generateSymbol("Try") + "_";
                if (node.finalizer && !node.handler) {
                    // We have a finally, but no 'catch'. Create the default catch clause 'catch(_ex) { throw _ex }'
                    var exSym = ident(generateSymbol("exception"));
                    node.handler = {
                        "type": "CatchClause",
                        "param": exSym,
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ThrowStatement",
                                "argument": exSym
                            }]
                        }
                    };
                }
                if (!node.handler && !node.finalizer) {
                    var ex = new SyntaxError(where(node.value) + "try requires catch and/or finally clause", pr.filename, node.start);
                    ex.pos = node.start;
                    ex.loc = node.loc.start;
                    throw ex;
                }
                if (node.finalizer) {
                    setExit(node.block, {
                        $error: node.$seh + "Catch",
                        $return: deferredFinally(node, parent.$return)
                    });
                    setExit(node.handler, {
                        $error: deferredFinally(node, parent.$error),
                        $return: deferredFinally(node, parent.$return)
                    });
                } else {
                    setExit(node.block, {
                        $error: node.$seh + "Catch",
                        $return: parent.$return
                    });
                }
            }
            descend();
        });
        return ast;
    }
    
    function mapTryCatch(node, path, down) {
        if (node.type === 'TryStatement' && containsAwait(node) && !node.$mapped) {
            var continuation, ctnName, catchBody;
            var ref = path[0];
            if ('index' in ref) {
                var i = ref.index + 1;
                var afterTry = ref.parent[ref.field].splice(i, ref.parent[ref.field].length - i);
                if (afterTry.length) {
                    ctnName = node.$seh + "Post";
                    var afterContinuation = makeContinuation(ctnName, afterTry);
                    afterContinuation = down(afterContinuation);
                    ref.parent[ref.field].unshift(afterContinuation);
                    continuation = thisCall(node.finalizer ? deferredFinally(node, ident(ctnName)) : ctnName);
                } else if (node.finalizer) {
                    continuation = thisCall(deferredFinally(node));
                }
            } else {
                throw new Error(pr.filename + " - malformed try/catch blocks");
            }
            node.$mapped = true;
            if (continuation) {
                node.block.body.push(cloneNode(continuation));
                node.handler.body.body.push(cloneNode(continuation));
            }
            var binding = getExit(path, [opts]);
            if (node.handler) {
                var symCatch = ident(node.$seh + "Catch");
                catchBody = cloneNode(node.handler.body);
                var catcher = makeBoundFn(symCatch.name, catchBody, [cloneNode(node.handler.param)], node.finalizer ? deferredFinally(node, binding.$error) : binding.$error);
                node.handler.body.body = [{
                    type: 'CallExpression',
                    callee: symCatch,
                    arguments: [cloneNode(node.handler.param)]
                }];
                ref.parent[ref.field].unshift(catcher);
            }
            if (node.finalizer) {
                var finalizer = {
                    type: "VariableDeclaration",
                    kind: "var",
                    declarations: [{
                        type: "VariableDeclarator",
                        id: ident(node.$seh + "Finally"),
                        init: {
                            type: "CallExpression",
                            callee: {
                                type: "MemberExpression",
                                object: {
                                    type: 'FunctionExpression',
                                    params: [ident(node.$seh + "Exit")],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [{
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'CallExpression',
                                                arguments: [{
                                                    type: 'ThisExpression'
                                                },binding.$error],
                                                callee: {
                                                    type: 'MemberExpression',
                                                    property: genIdent.asyncbind,
                                                    object: {
                                                        type: 'FunctionExpression',
                                                        params: [ident(node.$seh + "Value")],
                                                        body: {
                                                            type: 'BlockStatement',
                                                            body: cloneNode(node.finalizer.body).concat([{
                                                                type: 'ReturnStatement',
                                                                argument: {
                                                                    type: 'BinaryExpression',
                                                                    operator: '&&',
                                                                    left: ident(node.$seh + "Exit"),
                                                                    right: thisCall(ident(node.$seh + "Exit"), [ident(node.$seh + "Value")])
                                                                }
                                                            }])
                                                        }
                                                    }
                                                }
                                            }
                                        }]
                                    }
                                },
                                "property": genIdent.asyncbind,
                                "computed": false
                            },
                            "arguments": [{
                                "type": "ThisExpression"
                            }]
                        }
                    }]
                };
                ref.parent[ref.field].unshift(finalizer);
                var callFinally = {
                    type: 'ReturnStatement',
                    argument: thisCall(deferredFinally(node, ctnName && ident(ctnName)))
                };
                catchBody.body[catchBody.length - 1] = callFinally;
                node.block.body[node.block.body.length - 1] = callFinally;
                delete node.finalizer;
            }
        }
    }
    
    function walkDown(ast, mapper, state) {
        var walked = [];
        return parser.treeWalker(ast, function (node, descend, path) {
            if (walked.indexOf(node) >= 0) 
                return;
            function walkDownSubtree(node) {
                walked.push(node);
                return walkDown(node, mapper, path);
            }
            
            if (Array.isArray(mapper)) {
                mapper.forEach(function (m) {
                    m(node, path, walkDownSubtree);
                });
            } else {
                mapper(node, path, walkDownSubtree);
            }
            descend();
            return;
        }, state);
    }
    
    function asyncAwait(ast, inAsync, parentCatcher) {
        parser.treeWalker(ast, function (node, descend, path) {
            if (node.type == 'IfStatement') {
                if (node.consequent.type != 'BlockStatement' && containsAwait(node.consequent)) 
                    node.consequent = {
                    type: 'BlockStatement',
                    body: [node.consequent]
                };
                if (node.alternate && node.alternate.type != 'BlockStatement' && containsAwait(node.alternate)) 
                    node.alternate = {
                    type: 'BlockStatement',
                    body: [node.alternate]
                };
            }
            descend();
            if (examine(node).isAwait) {
                var loc = node.loc;
                /* Warn if this await expression is not inside an async function, as the return
                 * will depend on the Thenable implementation, and references to $return might
                 * not resolve to anything */
                inAsync = inAsync || path.some(function (ancestor) {
                    return ancestor.self && ancestor.self.$wasAsync;
                });
                if (!inAsync || inAsync === "warn") {
                    var errMsg = where(node) + "'await' used inside non-async function. ";
                    if (opts.promises) 
                        errMsg += "'return' value Promise runtime-specific";
                     else 
                        errMsg += "'return' value from await is synchronous";
                    logger(errMsg + ". See https://github.com/MatAtBread/nodent#differences-from-the-es7-specification");
                }
                var parent = path[0].parent;
                if (parent.type === 'LogicalExpression' && parent.right === node) {
                    logger(where(node.argument) + "'" + printNode(parent) + "' on right of " + parent.operator + " will always evaluate '" + printNode(node.argument) + "'");
                }
                if (parent.type === 'ConditionalExpression' && parent.test !== node) {
                    logger(where(node.argument) + "'" + printNode(parent) + "' will always evaluate '" + printNode(node.argument) + "'");
                }
                var result = ident(generateSymbol("await"));
                var expr = cloneNode(node.argument);
                coerce(node, result);
                // Find the statement containing this await expression (and it's parent)
                var stmt, body;
                for (var n = 1;n < path.length; n++) {
                    if (body = examine(path[n].self).isBlockStatement) {
                        stmt = path[n - 1];
                        break;
                    }
                }
                if (!stmt) 
                    throw new Error(where(node) + "Illegal await not contained in a statement");
                var containingExits = getExit(path, [parentCatcher,opts]);
                var i = stmt.index;
                var callback, callBack = body.splice(i, body.length - i).slice(1);
                var returner;
                // If stmt is of the form 'return fn(result.name)', just replace it a
                // reference to 'fn'.
                if (stmt.self.type === 'ReturnStatement' && stmt.self.argument.type === 'CallExpression' && stmt.self.argument.arguments.length === 1 && stmt.self.argument.arguments[0].name === result.name) {
                    returner = (callback = stmt.self.argument.callee);
                // If stmt is only a reference to the result, suppress the result
                // reference as it does nothing
                } else if (!(stmt.self.type === 'Identifier' || stmt.self.name === result.name || stmt.self.type === 'ExpressionStatement' && stmt.self.expression.type === 'Identifier' && stmt.self.expression.name === result.name)) {
                    callBack.unshift(stmt.self);
                    callback = {
                        type: 'FunctionExpression',
                        params: [cloneNode(result)],
                        body: asyncAwait({
                            type: 'BlockStatement',
                            body: cloneNode(callBack)
                        }, inAsync, containingExits)
                    };
                } else {
                    if (callBack.length) 
                        callback = {
                        type: 'FunctionExpression',
                        params: [cloneNode(result)],
                        body: asyncAwait({
                            type: 'BlockStatement',
                            body: cloneNode(callBack)
                        }, inAsync, containingExits)
                    };
                     else 
                        callback = {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: []
                        }
                    };
                }
                // Wrap the callback statement(s) in a Block and transform them
                if (!returner) {
                    if (callback) {
                        returner = {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                object: callback,
                                property: ident('$asyncbind', loc),
                                computed: false
                            },
                            arguments: [{
                                type: 'ThisExpression'
                            },containingExits.$error]
                        };
                    } else {
                        returner = {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        };
                    }
                }
                if (opts.wrapAwait) {
                    if (opts.promises || opts.generators) {
                        expr = {
                            type: 'CallExpression',
                            arguments: [expr],
                            callee: {
                                type: 'MemberExpression',
                                object: ident('Promise'),
                                property: ident('resolve')
                            }
                        };
                    } else {
                        // ES7 makeThenable
                        expr = {
                            type: 'CallExpression',
                            arguments: [expr],
                            callee: {
                                type: 'MemberExpression',
                                object: ident('Object'),
                                property: ident('$makeThenable')
                            }
                        };
                    }
                }
                var exitCall = {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: expr,
                        property: ident('then', loc),
                        computed: false
                    },
                    arguments: [returner,containingExits.$error]
                };
                body.push({
                    loc: loc,
                    type: 'ReturnStatement',
                    argument: exitCall
                });
            }
            return true;
        });
        return ast;
    }
    
    // Transform a for..in into it's iterative equivalent
    function transformForIn(node, path) {
        var i = ident(generateSymbol("in"));
        var it = node.left.type === 'VariableDeclaration' ? node.left.declarations[0].id : node.left;
        var init = {
            "type": "VariableDeclaration",
            "declarations": [{
                "type": "VariableDeclarator",
                "id": i,
                "init": {
                    "type": "ArrayExpression",
                    "elements": []
                }
            }],
            "kind": "var"
        };
        var body = node.body;
        node.body = {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "object": i,
                    "property": ident('push'),
                    "computed": false
                },
                "arguments": [it]
            }
        };
        var indexAssign = {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": it,
                "right": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "MemberExpression",
                        "object": i,
                        "property": ident('shift'),
                        "computed": false
                    },
                    "arguments": []
                }
            }
        };
        if (body.type === 'BlockStatement') {
            body.body.unshift(indexAssign);
        } else {
            body = {
                "type": "BlockStatement",
                "body": [indexAssign].concat(body)
            };
        }
        var loop = {
            "type": "WhileStatement",
            "test": {
                "type": "MemberExpression",
                "object": i,
                "property": ident('length'),
                "computed": false
            },
            "body": body
        };
        //        var parent = path[0].parent[path[0].ref] ;
        if ('index' in path[0]) {
            path[0].parent.body.splice(path[0].index, 1, init, node, loop);
        } else {
            path[0].parent[path[0].ref] = {
                type: 'BlockStatement',
                body: [init,node,loop]
            };
        }
    }
    
    // Transform a for..of into it's iterative equivalent
    function iterizeForOf(node, path) {
        node.type = 'ForStatement';
        if (node.body.type !== 'BlockStatement') {
            node.body = {
                type: 'BlockStatement',
                body: [node.body]
            };
        }
        var index, iterator, initIterator = {
            "type": "ArrayExpression",
            "elements": [{
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "object": node.right,
                    "property": {
                        "type": "MemberExpression",
                        "object": ident("Symbol"),
                        "property": ident("iterator"),
                        "computed": false
                    },
                    "computed": true
                },
                "arguments": []
            }]
        };
        if (node.left.type === 'VariableDeclaration') {
            index = node.left.declarations[0].id;
            iterator = ident("$iterator_" + index.name);
            node.left.declarations.push({
                type: "VariableDeclarator",
                id: iterator,
                init: initIterator
            });
            node.init = node.left;
        } else {
            index = node.left;
            iterator = ident("$iterator_" + index.name);
            var declaration = {
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [{
                    type: "VariableDeclarator",
                    id: iterator,
                    init: initIterator
                }]
            };
            path[0].parent.body.splice(path[0].index, 0, declaration);
            node.init = null;
        }
        node.test = {
            "type": "LogicalExpression",
            "left": {
                "type": "UnaryExpression",
                "operator": "!",
                "prefix": true,
                "argument": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "MemberExpression",
                            "object": iterator,
                            "property": literal(1),
                            "computed": true
                        },
                        "right": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "MemberExpression",
                                "object": {
                                    "type": "MemberExpression",
                                    "object": iterator,
                                    "property": literal(0),
                                    "computed": true
                                },
                                "property": ident('next'),
                                "computed": false
                            },
                            "arguments": []
                        }
                    },
                    "property": ident('done'),
                    "computed": false
                }
            },
            "operator": "&&",
            "right": {
                type: 'LogicalExpression',
                "operator": "||",
                left: {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": index,
                    "right": {
                        "type": "MemberExpression",
                        "object": {
                            "type": "MemberExpression",
                            "object": iterator,
                            "property": literal(1),
                            "computed": true
                        },
                        "property": ident('value'),
                        "computed": false
                    }
                },
                right: literal(true)
            }
        };
        delete node.left;
        delete node.right;
    }
    
    /* Map loops:

  for (init;cond;step) body ;
     * to:
  init;
  await (async function $for_i_0_i_10_i$1() {
   if (cond) {
     body;
     step;
     return void $for_i_0_i_10_i$1()($return,$error) ;
   } else {
    $return();
   }
  })() ;

     * Also:
   do { body } while (cond) ;
     * to:
   await (async function $for_i_0_i_10_i$1() {
    body;
    if (cond) {
     return void $for_i_0_i_10_i$1()($return,$error) ;
   } else {
    $return();
   }
  })() ;
     */
    function asyncLoops(ast) {
        parser.treeWalker(ast, function (node, descend, path) {
            function mapContinue(label) {
                return {
                    type: 'ReturnStatement',
                    argument: {
                        type: 'UnaryExpression',
                        operator: 'void',
                        prefix: true,
                        argument: thisCall(label || symContinue)
                    }
                };
            };
            function mapExits(n, descend) {
                if (n.type === 'BreakStatement') {
                    coerce(n, cloneNode(mapBreak(n.label && opts.generatedSymbolPrefix + node.type + "_" + n.label.name + "_exit")));
                } else if (n.type === 'ContinueStatement') {
                    coerce(n, cloneNode(mapContinue(n.label && opts.generatedSymbolPrefix + node.type + "_" + n.label.name + "_next")));
                } else if (examine(n).isFunction) {
                    return true;
                }
                descend();
            }
            
            if (node.type === 'ForInStatement' && containsAwait(node)) {
                transformForIn(node, path);
            } else if (node.type === 'ForOfStatement' && containsAwait(node)) {
                iterizeForOf(node, path);
            }
            descend();
            var p;
            if (examine(node).isLoop && containsAwait(node)) {
                var init = node.init;
                var condition = node.test;
                var step = node.update;
                var body = node.body;
                if (init) {
                    if (!examine(init).isStatement) 
                        init = {
                        type: 'ExpressionStatement',
                        expression: init
                    };
                     else if (init.type === 'VariableDeclaration') {
                        var decl = init;
                        init = {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'SequenceExpression',
                                expressions: init.declarations.filter(function (d) {
                                    return d.init;
                                }).map(function (d) {
                                    return {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: d.id,
                                        right: d.init
                                    };
                                })
                            }
                        };
                        decl.declarations.forEach(function (d) {
                            delete d.init;
                        });
                        for (p = 0; p < path.length; p++) {
                            var scope;
                            if (scope = examine(path[p].parent).getScope) {
                                if (scope[0].type === 'VariableDeclaration') 
                                    scope[0].declarations = scope[0].declarations.concat(decl.declarations);
                                 else 
                                    scope.unshift(decl);
                                break;
                            }
                        }
                    }
                }
                step = step ? {
                    type: 'ExpressionStatement',
                    expression: step
                } : null;
                body = examine(body).isBlockStatement ? cloneNode(body).body : [cloneNode(body)];
                var label = path[0].parent.type === 'LabeledStatement' && path[0].parent.label.name;
                label = node.type + "_" + (label || generatedSymbol++);
                var symExit = opts.generatedSymbolPrefix + (label + "_exit");
                var symContinue = opts.generatedSymbolPrefix + (label + "_next");
                var loop = ident(opts.generatedSymbolPrefix + (label + "_loop"));
                // How to exit the loop
                var mapBreak = function (label) {
                    return {
                        type: 'ReturnStatement',
                        argument: {
                            type: 'UnaryExpression',
                            operator: 'void',
                            prefix: true,
                            argument: {
                                type: 'CallExpression',
                                callee: ident(label || symExit),
                                arguments: []
                            }
                        }
                    };
                };
                
                // How to continue the loop
                var defContinue = makeContinuation(symContinue, [{
                    type: 'ReturnStatement',
                    argument: {
                        type: 'CallExpression',
                        callee: loop,
                        arguments: [ident(symExit),genIdent.error]
                    }
                }]);
                if (step) 
                    defContinue.body.body.unshift(step);
                for (var i = 0;i < body.length; i++) {
                    parser.treeWalker(body[i], mapExits);
                }
                body.push(cloneNode(mapContinue()));
                var subCall = {
                    type: 'FunctionExpression',
                    id: loop,
                    params: [ident(symExit),genIdent.error],
                    body: {
                        type: 'BlockStatement',
                        body: [defContinue]
                    }
                };
                if (node.type === 'DoWhileStatement') {
                    defContinue.body.body = [{
                        type: 'IfStatement',
                        test: cloneNode(condition),
                        consequent: {
                            type: 'BlockStatement',
                            body: cloneNode(defContinue.body.body)
                        },
                        alternate: {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'CallExpression',
                                callee: ident(symExit),
                                arguments: []
                            }
                        }
                    }];
                    subCall.body.body = [defContinue].concat(body);
                } else {
                    var nextTest = {
                        type: 'IfStatement',
                        test: cloneNode(condition),
                        consequent: {
                            type: 'BlockStatement',
                            body: body
                        },
                        alternate: cloneNode(mapBreak())
                    };
                    subCall.body.body.push(nextTest);
                }
                var replace = {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AwaitExpression',
                        operator: 'await',
                        argument: {
                            type: 'CallExpression',
                            arguments: [{
                                type: 'ThisExpression'
                            }],
                            callee: {
                                type: 'MemberExpression',
                                object: subCall,
                                property: genIdent.asyncbind,
                                computed: false
                            }
                        }
                    }
                };
                for (p = 0; p < path.length; p++) {
                    var ref = path[p];
                    if ('index' in ref) {
                        if (init) {
                            ref.parent[ref.field].splice(ref.index, 1, cloneNode(init), replace);
                        } else {
                            ref.parent[ref.field][ref.index] = replace;
                        }
                        return true;
                    }
                }
            }
            return true;
        });
        return ast;
    }
    
    function containsAsyncExit(ast) {
        try {
            if (Array.isArray(ast)) {
                return ast.some(containsAsyncExit);
            }
            // For each function in this ast....
            parser.treeWalker(ast, function (node, descend, path) {
                if (node.type === 'Identifier' && (node.name === opts.$return || node.name === opts.$error)) {
                    throw node;
                }
                if (examine(node).isFunction) {
                    var f = contains(node, function (node) {
                        // Legacy reference to $return or $error - treat as if there is an asyncExit (it might be)
                        // so we behave as previous releases did
                        if (node.type === 'Identifier' && (node.name === opts.$return || node.name === opts.$error)) {
                            throw node;
                        }
                        if (node.type === 'ReturnStatement' || node.type === 'ThrowStatement') {
                            if (node.async) {
                                throw node;
                            }
                        }
                    });
                    if (f) {
                        throw f;
                    }
                    return false;
                } else 
                    descend();
            });
            return false;
        } catch (ex) {
            return ex;
        }
    }
    
    /**
     * Uglify transormer: Transform
     *
    async function test(x) {
     return x*2 ;
   };
     *
     * to
     *
  function test(x) {
    return function($return, $error) {
        try {
            return $return(x * 2);
        } catch ($except) {
            $error($except)
        }
    }.bind(this);
}
     *
     */
    function asyncDefineMethod(ast) {
        return parser.treeWalker(ast, function (node, descend, path) {
            descend();
            var transform = getMemberFunction(node);
            if (!transform || !transform.async) 
                return;
            if (node.kind == 'set') {
                var ex = new SyntaxError(where(transform) + "method 'async set' cannot be invoked", pr.filename, node.start);
                ex.pos = node.start;
                ex.loc = node.loc.start;
                throw ex;
            }
            transform.async = false;
            var usesArgs = replaceArguments(transform);
            if (!containsAsyncExit(transform) && (transform.body.body.length === 0 || transform.body.body[transform.body.body.length - 1].type !== 'ReturnStatement')) {
                transform.body.body.push({
                    type: 'ReturnStatement'
                });
            }
            var funcback = {
                type: 'CallExpression',
                arguments: [{
                    type: 'ThisExpression'
                }],
                callee: {
                    type: 'MemberExpression',
                    object: setExit({
                        type: 'FunctionExpression',
                        params: [genIdent.return,genIdent.error],
                        body: asyncDefineMethod(mapReturns(transform.body, path)),
                        $wasAsync: true
                    }, opts),
                    property: genIdent.asyncbind,
                    computed: false
                }
            };
            if (opts.promises) {
                transform.body = {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ReturnStatement',
                        argument: {
                            type: 'NewExpression',
                            callee: ident('Promise'),
                            arguments: [funcback]
                        }
                    }]
                };
            } else {
                transform.body = {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ReturnStatement',
                        argument: funcback
                    }]
                };
            }
            if (usesArgs) {
                transform.body.body.unshift(assign$Args);
            }
        });
    }
    
    function asyncDefine(ast) {
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            if (examine(node).isAsync && examine(node).isFunction) {
                delete node.async;
                var fnBody;
                var usesArgs = replaceArguments(node);
                if (examine(node.body).isBlockStatement) {
                    if (!containsAsyncExit(node.body) && (node.body.body.length === 0 || node.body.body[node.body.body.length - 1].type !== 'ReturnStatement')) {
                        node.body.body.push({
                            type: 'ReturnStatement'
                        });
                    }
                    fnBody = {
                        type: 'BlockStatement',
                        body: node.body.body.map(function (sub) {
                            return mapReturns(sub, path);
                        })
                    };
                } else {
                    fnBody = {
                        type: 'BlockStatement',
                        body: [mapReturns({
                            type: 'ReturnStatement',
                            argument: node.body
                        }, path)]
                    };
                    node.expression = false;
                }
                fnBody = {
                    type: 'CallExpression',
                    arguments: [{
                        type: 'ThisExpression'
                    }],
                    callee: {
                        type: 'MemberExpression',
                        object: setExit({
                            type: 'FunctionExpression',
                            params: [genIdent.return,genIdent.error],
                            body: fnBody,
                            $wasAsync: true
                        }, opts),
                        property: genIdent.asyncbind,
                        computed: false
                    }
                };
                if (opts.promises) {
                    fnBody = {
                        type: 'NewExpression',
                        callee: ident('Promise'),
                        arguments: [fnBody]
                    };
                }
                fnBody = {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ReturnStatement',
                        loc: node.loc,
                        argument: fnBody
                    }]
                };
                if (usesArgs) 
                    fnBody.body.unshift(assign$Args);
                node.body = fnBody;
                return;
            }
        });
        return ast;
    }
    
    /*
     * Rewrite
      async function <name>?<argumentlist><body>
    to
      function <name>?<argumentlist>{ return function*() {<body>}.$asyncspawn(); }
     */
    // Like mapReturns, but ONLY for return/throw async
    function mapAsyncReturns(ast) {
        if (Array.isArray(ast)) {
            return ast.map(mapAsyncReturns);
        }
        var lambdaNesting = 0;
        return parser.treeWalker(ast, function (node, descend, path) {
            if ((node.type === 'ThrowStatement' || node.type === 'ReturnStatement') && !node.$mapped) {
                if (lambdaNesting > 0) {
                    if (node.async) {
                        delete node.async;
                        node.argument = {
                            "type": "CallExpression",
                            "callee": node.type === 'ThrowStatement' ? genIdent.error : genIdent.return,
                            "arguments": node.argument ? [node.argument] : []
                        };
                        node.type = 'ReturnStatement';
                        return;
                    }
                }
            } else if (examine(node).isFunction) {
                lambdaNesting++;
                descend(node);
                lambdaNesting--;
                return;
            }
            descend(node);
        });
    }
    
    function spawnBody(body, deferExit) {
        return {
            "type": "BlockStatement",
            "body": [{
                "type": "ReturnStatement",
                "argument": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "MemberExpression",
                        "object": {
                            "type": "FunctionExpression",
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "params": [genIdent.return,genIdent.error],
                            "body": {
                                type: 'BlockStatement',
                                body: mapAsyncReturns(body).concat(deferExit ? [{
                                    type: 'ReturnStatement',
                                    argument: genIdent.return
                                }] : [])
                            }
                        },
                        "property": genIdent.asyncspawn,
                        "computed": false
                    },
                    "arguments": [ident('Promise'),{
                        type: 'ThisExpression'
                    }]
                }
            }]
        };
    }
    
    function asyncSpawn(ast) {
        function warnAsyncExit(exit, fn) {
            if (!fn.$asyncexitwarninig) {
                fn.$asyncexitwarninig = true;
                logger(where(exit) + "'async " + ({
                    ReturnStatement: 'return',
                    ThrowStatement: 'throw'
                })[exit.type] + "' not possible in generator mode. Using Promises for function at " + where(fn));
            }
        }
        
        function mapAwaits(ast) {
            parser.treeWalker(ast, function (node, descend, path) {
                if (node !== ast && examine(node).isFunction) 
                    return;
                if (examine(node).isAwait) {
                    delete node.operator;
                    node.delegate = false;
                    node.type = 'YieldExpression';
                    descend();
                } else 
                    descend();
            });
        }
        
        function promiseTransform(ast) {
            var promises = opts.promises;
            opts.promises = true;
            asyncTransforms(ast, true);
            opts.promises = promises;
        }
        
        function expandArrows(fn) {
            if (fn.body.type !== 'BlockStatement') {
                fn.body = {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ReturnStatement',
                        argument: fn.body
                    }]
                };
            }
            return fn;
        }
        
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            var fn, exit, usesArgs;
            if (examine(node).isAsync && examine(node).isFunction) {
                if (exit = containsAsyncExit(node.body)) {
                    // Do the Promise transform
                    warnAsyncExit(exit, node.body);
                    promiseTransform(node);
                } else {
                    fn = node;
                    delete fn.async;
                    usesArgs = replaceArguments(fn);
                    mapAwaits(fn);
                    fn = expandArrows(fn);
                    fn.body = spawnBody(fn.body.body, exit);
                    if (usesArgs) 
                        fn.body.body.unshift(assign$Args);
                    if (path[0].parent.type === 'ExpressionStatement') {
                        fn.type = 'FunctionDeclaration';
                        path[1].replace(fn);
                    } else {
                        path[0].replace(fn);
                    }
                }
            } else if ((fn = getMemberFunction(node)) && fn.async) {
                if (exit = containsAsyncExit(fn)) {
                    // Do the Promise transform
                    warnAsyncExit(exit, fn);
                    promiseTransform(node);
                } else {
                    node.async = false;
                    usesArgs = replaceArguments(fn);
                    mapAwaits(fn);
                    coerce(fn, expandArrows(fn));
                    fn.body = spawnBody(fn.body.body, exit);
                    if (usesArgs) 
                        fn.body.body.unshift(assign$Args);
                }
            }
        });
        // Map (and warn) about any out-of-scope awaits that are being
        // mapped using Promises.
        var promises = opts.promises;
        opts.promises = true;
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            if (examine(node).isFunction && containsAwait(node.body)) {
                blockifyArrows(node);
                hoistDeclarations(node);
                labelTryCatch(node);
                asyncLoops(node);
                mapLogicalOp(node);
                mapCondOp(node);
                walkDown(node, [mapTryCatch,mapIfStmt,mapSwitch]);
                asyncAwait(node, "warn");
                exposeCompilerOpts(ast);
                cleanCode(node);
            }
        });
        opts.promises = promises;
        return ast;
    }
    
    /* Find all nodes within this scope matching the specified function */
    function scopedNodes(ast, matching, flat) {
        var matches = [];
        parser.treeWalker(ast, function (node, descend, path) {
            if (node === ast) 
                return descend();
            var m = matching(node, path) ;
            if (m) {
                matches.push([].concat(path));
                if (m !== scopedNodes.deep)
                    return;
            }
            if (flat || examine(node).isScope) {
                return;
            }
            descend();
        });
        return matches;
    }
    scopedNodes.deep = {} ;
    
    function pathIsLoopInitializer(p) {
        if (p.field == "init" && p.parent.type === 'ForStatement') 
            return true;
        if (p.field == "left" && (p.parent.type === 'ForInStatement' || p.parent.type === 'ForOfStatement')) 
            return true;
        return false;
    }
    
    /* Move directives, vars and named functions to the top of their scope iff. the scope contains an 'await' */
    function hoistDeclarations(ast) {
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            if (examine(node).isScope && containsAwait(node)) {
                // For this scope, find all the hoistable functions, vars and directives
                var functions = scopedNodes(node, function hoistable(n, path) {
                    // YES: We're a named async function
                    if (examine(n).isAsync && examine(n).isFunction && n.id) 
                        return true;
                    // YES: We're a named function, but not a continuation
                    if (examine(n).isFunction && n.id) {
                        return !n.$continuation;
                    }
                    // No, we're not a hoistable function
                    return false;
                });
                // TODO: For ES6, this needs more care, as blocks containing 'let' have a scope of their own
                var vars = scopedNodes(node, function (n, path) {
                    if (n.type === 'VariableDeclaration' && n.kind === 'var') {
                        return !pathIsLoopInitializer(path[0]);
                    }
                });
                /* TODO: directives are not obvious in ESTREE format. There was an issue
                 * with obtuse labelled statements such as 'label:"name"; looking like
                 * directives, but they're not, so we only hoist directives directly in
                 * our own block */
                var directives = scopedNodes(node, function (n) {
                    return examine(n).isDirective;
                });
                var nodeBody = node.type === 'Program' ? node : node.body;
                functions = functions.map(function (path) {
                    var ref = path[0], symName;
                    // What is the name of this function (could be async, so check the expression if necessary),
                    // and should we remove and hoist, or reference and hoist?
                    if (examine(ref.self).isAsync) {
                        symName = ref.self.id.name;
                        // If we're actually a top-level async FunctionExpression, redeclare as a FunctionDeclaration
                        if (examine(ref.parent).isBlockStatement) {
                            ref.self.type = 'FunctionDeclaration';
                            ref.remove();
                            return ref.self;
                        }
                        // We're an async FunctionExpression
                        return ref.replace(ident(symName));
                    }
                    // We're just a vanilla FunctionDeclaration or FunctionExpression
                    symName = ref.self.id.name;
                    var movedFn = ref.self.type === 'FunctionDeclaration' ? ref.remove() : ref.replace(ident(symName));
                    return movedFn;
                });
                var varDecls = [];
                if (vars.length) {
                    var definitions = [];
                    vars.forEach(function (path) {
                        var ref = path[0];
                        var self = ref.self;
                        var values = [];
                        for (var i = 0;i < self.declarations.length; i++) {
                            var name = self.declarations[i].id.name;
                            var idx = definitions.indexOf(name);
                            if (idx >= 0) {
                                logger(where(self.declarations[i]) + "Duplicate 'var " + name + "' in '" + (node.name ? node.name.name : "anonymous") + "()'");
                            } else {
                                definitions.push(name);
                            }
                            if (self.declarations[i].init) {
                                var value = {
                                    type: 'AssignmentExpression',
                                    left: ident(name),
                                    operator: '=',
                                    right: cloneNode(self.declarations[i].init)
                                };
                                if (!(ref.parent.type === 'ForStatement')) 
                                    value = {
                                    type: 'ExpressionStatement',
                                    expression: value
                                };
                                values.push(value);
                            }
                        }
                        if (values.length == 0) 
                            ref.remove();
                         else 
                            ref.replace(values);
                    });
                    if (definitions.length) {
                        definitions = definitions.map(function (name) {
                            return {
                                type: 'VariableDeclarator',
                                id: ident(name)
                            };
                        });
                        if (!varDecls[0] || varDecls[0].type !== 'VariableDeclaration') {
                            varDecls.unshift({
                                type: 'VariableDeclaration',
                                kind: 'var',
                                declarations: definitions
                            });
                        } else {
                            varDecls[0].declarations = varDecls[0].declarations.concat(definitions);
                        }
                    }
                }
                directives = directives.map(function (path) {
                    var ref = path[0];
                    return ref.remove();
                });
                nodeBody.body = directives.concat(varDecls).concat(functions).concat(nodeBody.body);
            }
            return true;
        });
        return ast;
    }
    
    function mapSupers(classNode) {
        function superID() {
            return classNode.$superID = classNode.$superID || ident("$super$" + generatedSymbol++);
        }
        
        return function (method) {
            method = getMemberFunction(method);
            if (method && method.async) {
                parser.treeWalker(method.body, function (node, descend, path) {
                    var r;
                    if (!examine(node).isClass) {
                        descend();
                        if (node.type === 'Super') {
                            if (path[0].parent.type === 'MemberExpression') {
                                if (path[1].parent.type === 'CallExpression' && path[1].field === 'callee') {
                                    if (path[0].parent.computed) {
                                        // super[m](...)  maps to:  this.$superid(m).call(this,...)
                                        r = {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "ThisExpression"
                                                        },
                                                        "property": superID(),
                                                        "computed": false
                                                    },
                                                    "arguments": [path[0].parent.property]
                                                },
                                                "property": ident('call'),
                                                "computed": false
                                            },
                                            "arguments": [{
                                                "type": "ThisExpression"
                                            }].concat(path[1].parent.arguments)
                                        };
                                        path[2].replace(r);
                                    } else {
                                        // super.m(...)    maps to:  this.$superid('m').call(this,...)
                                        r = {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "ThisExpression"
                                                        },
                                                        "property": superID(),
                                                        "computed": false
                                                    },
                                                    "arguments": [literal(path[0].parent.property.name)]
                                                },
                                                "property": ident('call'),
                                                "computed": false
                                            },
                                            "arguments": [{
                                                "type": "ThisExpression"
                                            }].concat(path[1].parent.arguments)
                                        };
                                        path[2].replace(r);
                                    }
                                } else {
                                    if (path[0].parent.computed) {
                                        // super[f],    maps to:  this.$superid(f)
                                        r = {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "ThisExpression"
                                                },
                                                "property": superID(),
                                                "computed": false
                                            },
                                            "arguments": [path[0].parent.property]
                                        };
                                        path[1].replace(r);
                                    } else {
                                        // super.f,      maps to:  this.$superid('f')
                                        r = {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "ThisExpression"
                                                },
                                                "property": superID(),
                                                "computed": false
                                            },
                                            "arguments": [literal(path[0].parent.property.name)]
                                        };
                                        path[1].replace(r);
                                    }
                                }
                            } else {
                                logger(where(node) + "'super' in async methods must be deferenced. 'async constructor()'/'await super()' not valid.");
                            }
                        }
                    }
                });
            }
        };
    }
    
    function fixSuperReferences(ast) {
        return parser.treeWalker(ast, function (node, descend, path) {
            descend();
            if (node.type === 'ClassDeclaration' || node.type === 'ClassExpression') {
                node.body.body.forEach(mapSupers(node));
                if (node.$superID) {
                    var method = {
                        "type": "FunctionExpression",
                        "params": [ident("$field")],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "MemberExpression",
                                    "object": {
                                        "type": "Super"
                                    },
                                    "property": ident("$field"),
                                    "computed": true
                                }
                            }]
                        }
                    };
                    if (opts.babelTree) {
                        method.type = 'ClassMethod';
                        method.key = node.$superID;
                        method.kind = 'method';
                        node.body.body.push(method);
                    } else {
                        node.body.body.push({
                            type: 'MethodDefinition',
                            key: node.$superID,
                            kind: 'method',
                            value: method
                        });
                    }
                }
            }
        });
    }
    
    function blockifyArrows(ast) {
        parser.treeWalker(ast, function (node, descend, path) {
            var awaiting = containsAwait(node);
            if (awaiting)  {
                if (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement') {
                    node.body = {
                        type: "BlockStatement",
                        body: [{
                            type: "ReturnStatement",
                            argument: node.body
                        }]
                    };
                }
            }
            descend();
            return true;
        });
        return ast;
    }
    
    function exposeCompilerOpts(ast) {
        // Expose compiler
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            if (node.type === 'Identifier' && node.name === '__nodent') {
                coerce(node, literal(opts));
            }
        });
        return ast;
    }
    
    /* Remove un-necessary nested blocks and crunch down empty function implementations */
    function cleanCode(ast) {
        // Coalese BlockStatements
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            var block, child;
            // If this node is a block with vanilla BlockStatements (no controlling entity), merge them
            if (block = examine(node).isBlockStatement) {
                // Remove any empty statements from within the block
                for (var i = 0;i < block.length; i++) {
                    if (child = examine(block[i]).isBlockStatement) {
                        // For ES6, this needs more care, as blocks containing 'let/const/class' have a scope of their own
                        if (!containsBlockScopedDeclarations(block[i])) 
                            [].splice.apply(block, [i,1].concat(child));
                    }
                }
            }
        });
        // Truncate BlockStatements with a Jump (break;continue;return;throw) inside
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            if (examine(node).isJump) {
                var ref = path[0];
                if ('index' in ref) {
                    var i = ref.index + 1;
                    var ctn = ref.parent[ref.field];
                    while (i < ctn.length) {
                        // Remove any statements EXCEPT for function/var definitions
                        if (ctn[i].type === 'VariableDeclaration' || examine(ctn[i]).isFunction && ctn[i].id) 
                            i += 1;
                         else 
                            ctn.splice(i, 1);
                    }
                }
            }
        });
        /* Inline continuations that are only referenced once */
        // Find any continuations that have a single reference
        parser.treeWalker(ast, function (node, descend, path) {
            descend();
            if (node.$thisCall && continuations[node.name]) {
                if (continuations[node.name].ref) {
                    delete continuations[node.name]; //   Multiple ref
                } else {
                    continuations[node.name].ref = node.$thisCall;
                }
            }
        });
        var calls = Object.keys(continuations).map(function (c) {
            return continuations[c].ref;
        });
        if (calls.length) {
            // Replace all the calls to the continuation with the body from the continuation followed by 'return;'
            parser.treeWalker(ast, function (node, descend, path) {
                descend();
                if (calls.indexOf(node) >= 0) {
                    if (path[1].self.type === 'ReturnStatement') {
                        var sym = node.$thisCallName;
                        var repl = cloneNode(continuations[sym].def.body.body);
                        continuations[sym].$inlined = true;
                        if (!examine(path[1].self).isJump) 
                            repl.push({
                            type: 'ReturnStatement'
                        });
                        path[1].replace(repl);
                    }
                }
            });
            var defs = Object.keys(continuations).map(function (c) {
                return continuations[c].$inlined && continuations[c].def;
            });
            // Remove all the (now inline) declarations of the continuations
            parser.treeWalker(ast, function (node, descend, path) {
                descend();
                if (defs.indexOf(node) >= 0) {
                    path[0].remove();
                }
            });
        }
        
        /* Called with a Program or FunctionDeclaration.body */
        function isStrict(node) {
            var nodes = node.body ;
            for (var i=0; i<nodes.length; i++)
                if (examine(nodes[i]).isDirective && nodes[i].expression.value.match(/\s*use\s+strict\s*/))
                    return true ;
            return false ;
        }
        
        // Hoist generated FunctionDeclarations within ES5 Strict functions (actually put them at the
        // end of the scope-block, don't hoist them, it's just an expensive operation)
        if (!contains(ast,function(n){
            return examine(n).isES6
        },true)) {
            var useStrict = ast.type==='Program' && (ast.sourceType === 'module' || isStrict(ast)) ;
            (function(ast){
                parser.treeWalker(ast, function (node, descend, path) {
                    if (node.type==='Program' || node.type==='FunctionDeclaration' || node.type==='FunctionExpression') {
                        var functionScope = node.type === 'Program' ? node : node.body ;
                        var wasStrict = useStrict ;
                        useStrict = useStrict || isStrict(functionScope) ;
                        if (useStrict) {
                            descend();

                            var functions = scopedNodes(functionScope,function(n,path){
                                if (n.type==='FunctionDeclaration') {
                                    return path[0].parent !== functionScope ;
                                }
                            }) ;

                            functions = functions.map(function (path) {
                                return path[0].remove() ;
                            });
                            [].push.apply(functionScope.body,functions) ;
                        } else {
                            descend();
                        }
                        useStrict = wasStrict ;
                    } else {
                        descend();
                    }
                }) ;
            })(ast);
        }        
        return ast;
        
        /*
        function replaceSymbols(ast,from,to) {
            parser.treeWalker(ast,function(node,descend,path){
                descend() ;
                if (node.type=='Identifier' && node.name==from) {
                    node.name = to ;
                }
            }) ;
            return ast ;
        }
    
        // Find declarations of functions of the form:
        //     function [sym]() { return _call_.call(this) }
        // or
        //     function [sym]() { return _call_() }
        // and replace with:
        //    _call_
        // If the [sym] exists and is referenced elsewhere, replace those too. This
        // needs to be done recursively from the bottom of the tree upwards.
        // NB: If _call_ is in the parameter list for the function, this is NOT a correct optimization
    
    
        // The symbol folding above might generate lines like:
        //    $return.$asyncbind(this,$error)
        // these can be simplified to:
        //    $return
        */
        return ast;
    }
    
}

module.exports = {
    babelLiteralNode: babelLiteralNode,
    asynchronize: function (pr, __sourceMapping, opts, logger) {
        try {
            return asynchronize(pr, __sourceMapping, opts, logger);
        } catch (ex) {
            if (ex instanceof SyntaxError) {
                var l = pr.origCode.substr(ex.pos - ex.loc.column);
                l = l.split("\n")[0];
                ex.message += " (nodent)\n" + l + "\n" + l.replace(/[\S ]/g, "-").substring(0, ex.loc.column) + "^";
                ex.stack = "";
            }
            throw ex;
        }
    }
};


},{"./output":10,"./parser":11}],10:[function(require,module,exports){
'use strict';

// This module is derived from Astring by David Bonnet (see below), but heavily
// modified to support source-maps & es7 as specified in
// https://github.com/estree/estree/blob/master/experimental/async-functions.md
// --------------------
// Astring is a tiny and fast JavaScript code generator from an ESTree-compliant AST.
//
// Astring was written by David Bonnet and released under an MIT license.
//
// The Git repository for Astring is available at:
// https://github.com/davidbonnet/astring.git
//
// Please use the GitHub bug tracker to report issues:
// https://github.com/davidbonnet/astring/issues

var SourceMapGenerator = require('source-map').SourceMapGenerator;
var ForInStatement, RestElement, BinaryExpression, ArrayExpression, traveler;

function repeat(str, count) {
    var out = [];
    while (count--) {
        out.push(str);
    }
    return out.join('');
}

var OPERATORS_PRECEDENCE = {
    'ExpressionStatement': -1, //  Use to parenthesize FunctionExpressions as statements
    'Identifier': 21,
    'Literal': 21,
	'BooleanLiteral':21,
	'RegExpLiteral':21,
	'NumericLiteral':21,
	'StringLiteral':21,
	'NullLiteral':21,
    'ThisExpression': 21,
    'SuperExpression': 21,
    'ObjectExpression': 21,
    'ClassExpression': 21,
    //		'(_)':20,	// Parens
    'MemberExpression': 19,
    //		'new()':19,
    'CallExpression': 18,
    'NewExpression': 18,
    'ArrayExpression': 17.5,
    'FunctionExpression': 17.5,
    'FunctionDeclaration': 17.5,
    'ArrowFunctionExpression': 17.5,
    'UpdateExpression++': 16.5, //  Postfix is 17, prefix is 16
    'UpdateExpression--': 16.5, //  Postfix is 17, prefix is 16
    'UnaryExpression':16, // ! ~ + - typeof void delete
    'AwaitExpression': 16,
    'BinaryExpression**': 15,
    'BinaryExpression*': 15,
    'BinaryExpression/': 15,
    'BinaryExpression%': 15,
    'BinaryExpression+': 14,
    'BinaryExpression-': 14,
    'BinaryExpression<<': 13,
    'BinaryExpression>>': 13,
    'BinaryExpression>>>': 13,
    'BinaryExpression<': 12,
    'BinaryExpression<=': 12,
    'BinaryExpression>': 12,
    'BinaryExpression>=': 12,
    'BinaryExpressionin': 12,
    'BinaryExpressioninstanceof': 12,
    'BinaryExpression==': 11,
    'BinaryExpression===': 11,
    'BinaryExpression!=': 11,
    'BinaryExpression!==': 11,
    'BinaryExpression&': 10,
    'BinaryExpression^': 9,
    'BinaryExpression|': 8,
    'LogicalExpression&&': 7,
    'LogicalExpression||': 6,
    'ConditionalExpression': 5,
    'AssignmentPattern': 4,
    'AssignmentExpression': 4,
    'yield': 3,
    'YieldExpression': 3,
    'SpreadElement': 2,
    'comma-separated-list':1.5,
    'SequenceExpression': 1
};

var CommaList = {type:'comma-separated-list'} ;

function precedence(node) {
    var p = OPERATORS_PRECEDENCE[node.type] || OPERATORS_PRECEDENCE[node.type+node.operator];
    if (p==16.5) { // ++ and --
        if (node.prefix)
            return 16 ;
        return 17 ;
    }
    if (p !== undefined)
        return p;
    //console.log("Precedence?",node.type,node.operator) ;
    return 20;
}

traveler = {
	out: function(node,state,type) {
		var f = this[type || node.type] ;
		if (f)
			f.call(this, node, state);
		else // Unknown node type - just spew its source
			state.write(node,state.sourceAt(node.start,node.end)) ;
	},
    expr: function expr(state, parent, node, assoc) {
        if (assoc==2 ||
        		precedence(node) < precedence(parent) ||
        		(precedence(node) == precedence(parent) && (assoc || parent.right === node))) {
            state.write(null, '(');
            this.out(node, state,node.type);
            state.write(null, ')');
        } else {
            this.out(node, state,node.type);
        }
    },
    formatParameters: function formatParameters(node, state) {
        var param, params;
        params = node.params;
        state.write(null, '(');
        if (params != null && params.length > 0) {
            this.out(params[0], state,params[0].type);
            for (var i = 1, length = params.length; i < length; i++) {
                param = params[i];
                state.write(param, ', ');
                this.out(param, state,param.type);
            }
        }
        state.write(null, ') ');
    },
    Program: function (node, state) {
        var statements, statement;
        var indent = repeat(state.indent, state.indentLevel);
        var lineEnd = state.lineEnd;
        statements = node.body;
        for (var i = 0, length = statements.length; i < length; i++) {
            statement = statements[i];
            state.write(null, indent);
            this.out(statement, state,statement.type);
            state.write(null, lineEnd);
        }
    },
    BlockStatement: function (node, state) {
        var statements, statement;
        var indent = repeat(state.indent, state.indentLevel++);
        var lineEnd = state.lineEnd;
        var statementIndent = indent + state.indent;
        state.write(node, '{');
        statements = node.body;
        if (statements != null && statements.length > 0) {
            state.write(null, lineEnd);
            for (var i = 0, length = statements.length; i < length; i++) {
                statement = statements[i];
                state.write(null, statementIndent);
                this.out(statement, state,statement.type);
                state.write(null, lineEnd);
            }
            state.write(null, indent);
        }
        state.write(node.loc ? {
            loc: {
                start: {
                    line: node.loc.end.line,
                    column: 0
                }
            }
        } : null, '}');
        state.indentLevel--;
    },
    EmptyStatement: function (node, state) {
        state.write(node, ';');
    },
    ExpressionStatement: function (node, state) {
        if (node.expression.type === 'FunctionExpression' || node.expression.type === 'ObjectExpression') {
            state.write(null, '(');
            this.expr(state, node, node.expression);
            state.write(null, ')');
        } else {
            this.expr(state, node, node.expression);
        }
        state.write(null, ';');
    },
    IfStatement: function (node, state) {
        state.write(node, 'if (');
        this.out(node.test, state,node.test.type);
        state.write(null, ') ');
        if (node.consequent.type !== 'BlockStatement')
            state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel + 1));
        this.out(node.consequent, state,node.consequent.type);
        if (node.alternate != null) {
            if (node.consequent.type !== 'BlockStatement')
                state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel));
            state.write(null, ' else ');
            if (node.alternate.type !== 'BlockStatement' && node.alternate.type !== 'IfStatement')
                state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel + 1));
            this.out(node.alternate, state,node.alternate.type);
        }
    },
    LabeledStatement: function (node, state) {
        this.out(node.label, state,node.label.type);
        state.write(null, ':');
        this.out(node.body, state,node.body.type);
    },
    BreakStatement: function (node, state) {
        state.write(node, 'break');
        if (node.label) {
            state.write(null, ' ');
            this.out(node.label, state,node.label.type);
        }
        state.write(null, ';');
    },
    ContinueStatement: function (node, state) {
        state.write(node, 'continue');
        if (node.label) {
            state.write(null, ' ');
            this.out(node.label, state,node.label.type);
        }
        state.write(null, ';');
    },
    WithStatement: function (node, state) {
        state.write(node, 'with (');
        this.out(node.object, state,node.object.type);
        state.write(null, ') ');
        this.out(node.body, state,node.body.type);
    },
    SwitchStatement: function (node, state) {
        var occurence, consequent, statement;
        var indent = repeat(state.indent, state.indentLevel++);
        var lineEnd = state.lineEnd;
        state.indentLevel++;
        var caseIndent = indent + state.indent;
        var statementIndent = caseIndent + state.indent;
        state.write(node, 'switch (');
        this.out(node.discriminant, state,node.discriminant.type);
        state.write(null, ') {', lineEnd);
        var occurences = node.cases;
        for (var i = 0; i < occurences.length; i++) {
            occurence = occurences[i];
            if (occurence.test) {
                state.write(occurence, caseIndent, 'case ');
                this.out(occurence.test, state,occurence.test.type);
                state.write(null, ':', lineEnd);
            } else {
                state.write(occurence, caseIndent, 'default:', lineEnd);
            }
            consequent = occurence.consequent;
            for (var j = 0; j < consequent.length; j++) {
                statement = consequent[j];
                state.write(null, statementIndent);
                this.out(statement, state,statement.type);
                state.write(null, lineEnd);
            }
        }
        state.indentLevel -= 2;
        state.write(null, indent, '}');
    },
    ReturnStatement: function (node, state) {
        if (node.async)
            state.write(node, ' async ');
        state.write(node, 'return');
        if (node.argument) {
            state.write(null, ' ');
            this.out(node.argument, state,node.argument.type);
        }
        state.write(null, ';');
    },
    ThrowStatement: function (node, state) {
        if (node.async)
            state.write(node, ' async ');
        state.write(node, 'throw ');
        this.out(node.argument, state,node.argument.type);
        state.write(null, ';');
    },
    TryStatement: function (node, state) {
        var handler;
        state.write(node, 'try ');
        this.out(node.block, state,node.block.type);
        if (node.handler) {
            handler = node.handler;
            state.write(handler, ' catch (');
            this.out(handler.param, state,handler.param.type);
            state.write(null, ') ');
            this.out(handler.body, state,handler.body.type);
        }
        if (node.finalizer) {
            state.write(node.finalizer, ' finally ');
            this.out(node.finalizer, state,node.finalizer.type);
        }
    },
    WhileStatement: function (node, state) {
        state.write(node, 'while (');
        this.out(node.test, state,node.test.type);
        state.write(null, ') ');
        if (node.body.type !== 'BlockStatement')
            state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel + 1));
        this.out(node.body, state,node.body.type);
    },
    DoWhileStatement: function (node, state) {
        state.write(node, 'do ');
        if (node.body.type !== 'BlockStatement')
            state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel + 1));
        this.out(node.body, state,node.body.type);
        state.write(null, ' while (');
        this.out(node.test, state,node.test.type);
        state.write(null, ');');
    },
    ForStatement: function (node, state) {
        state.write(node, 'for (');
        if (node.init != null) {
            var init = node.init, type = init.type;
            state.inForInit++ ;
            this.out(init, state,type);
            state.inForInit-- ;
            if (type !== 'VariableDeclaration')
              state.write(null, '; ');
        } else {
          state.write(null, '; ');
        }
        if (node.test)
            this.out(node.test, state,node.test.type);
        state.write(null, '; ');
        if (node.update)
            this.out(node.update, state,node.update.type);
        state.write(null, ') ');
        if (node.body.type !== 'BlockStatement')
            state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel + 1));
        this.out(node.body, state,node.body.type);
    },
    ForInStatement: ForInStatement = function (node, state) {
        state.write(node, 'for (');
        var left = node.left, type = left.type;
        state.inForInit++ ;
        this.out(left, state,type);
        if (type[0] === 'V' && type.length === 19) {
            state.back();
        }
        state.inForInit-- ;
        state.write(null, node.type[3] === 'I' ? ' in ' : ' of ');
        this.out(node.right, state,node.right.type);
        state.write(null, ') ');
        if (node.body.type !== 'BlockStatement')
            state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel + 1));
        this.out(node.body, state,node.body.type);
    },
    ForOfStatement: ForInStatement,
    DebuggerStatement: function (node, state) {
        state.write(node, 'debugger;');
    },
    Function: function (node, state) {
        if (node.async)
            state.write(node, 'async ');
        state.write(node, node.generator ? 'function* ' : 'function ');
        if (node.id)
            state.write(node.id, node.id.name);
        this.formatParameters(node, state);
        this.out(node.body, state,node.body.type);
    },
    FunctionDeclaration: function (node, state) {
        this.Function(node, state);
        state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel));
    },
    FunctionExpression: function (node, state) {
        this.Function(node, state);
    },
    VariableDeclaration: function (node, state) {
        var declarations = node.declarations;
        state.write(node, node.kind, ' ');
        var length = declarations.length;
        if (length > 0) {
            this.out(declarations[0], state,'VariableDeclarator');
            for (var i = 1; i < length; i++) {
                state.write(null, ', ');
                this.out(declarations[i], state,'VariableDeclarator');
            }
        }
        state.write(null, ';');
    },
    VariableDeclarator: function (node, state) {
        this.out(node.id, state,node.id.type);
        if (node.init != null) {
            state.write(null, ' = ');
            this.expr(state,CommaList,node.init) ;
        }
    },
    ClassDeclaration: function (node, state) {
        state.write(node, 'class ');
        if (node.id) {
            state.write(node.id, node.id.name + ' ');
        }
        if (node.superClass) {
            state.write(null, 'extends ');
            this.out(node.superClass, state,node.superClass.type);
            state.write(null, ' ');
        }
        this.out(node.body, state,'BlockStatement');
    },
    ImportSpecifier: function (node, state) {
        if (node.local.name == node.imported.name) {
            this.out(node.local, state,node.local.type);
        } else {
            this.out(node.imported, state,node.imported.type);
            state.write(null, ' as ');
            this.out(node.local, state,node.local.type);
        }
    },
    ImportDefaultSpecifier: function (node, state) {
        this.out(node.local, state,node.local.type);
    },
    ImportNamespaceSpecifier: function (node, state) {
        state.write(null, '* as ');
        this.out(node.local, state,node.local.type);
    },
    ImportDeclaration: function (node, state) {
        var i, specifier, name;
        state.write(node, 'import ');
        var specifiers = node.specifiers;
        var length = specifiers.length;
        var block = true;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                if (specifiers[i].type === 'ImportSpecifier' && block) {
                    block = false;
                    state.write(null, '{');
                }
                this.out(specifiers[i], state,specifiers[i].type);
                if (i < length - 1)
                    state.write(null, ', ');
            }
            if (specifiers[length - 1].type === 'ImportSpecifier')
                state.write(null, '}');
            state.write(null, ' from ');
        }
        state.write(node.source, node.source.raw);
        state.write(null, ';');
    },
    ExportDefaultDeclaration: function (node, state) {
        state.write(node, 'export default ');
        this.out(node.declaration, state,node.declaration.type);
    },
    ExportSpecifier: function (node, state) {
        if (node.local.name == node.exported.name) {
            this.out(node.local, state,node.local.type);
        } else {
            this.out(node.local, state,node.local.type);
            state.write(null, ' as ');
            this.out(node.exported, state,node.exported.type);
        }
    },
    ExportNamedDeclaration: function (node, state) {
        var specifier, name;
        state.write(node, 'export ');
        if (node.declaration) {
            this.out(node.declaration, state,node.declaration.type);
        } else {
            var specifiers = node.specifiers;
            state.write(node, '{');
            if (specifiers && specifiers.length > 0) {
                for (var i = 0; i < specifiers.length; i++) {
                    this.out(specifiers[i], state,specifiers[i].type);
                    if (i < specifiers.length - 1)
                        state.write(null, ', ');
                }
            }
            state.write(null, '}');
            if (node.source) {
                state.write(node.source, ' from ', node.source.raw);
            }
            state.write(null, ';');
        }
    },
    ExportAllDeclaration: function (node, state) {
        state.write(node, 'export * from ');
        state.write(node.source, node.source.raw, ';');
    },
    MethodDefinition: function (node, state) {
        if (node.value.async)
            state.write(node, 'async ');
        if (node.static)
            state.write(node, 'static ');
        switch (node.kind) {
            case 'get':
            case 'set':
                state.write(node, node.kind, ' ');
                break;
            default:
                break;
        }
        if (node.value.generator)
          state.write(null, '*');
        if (node.computed) {
            state.write(null, '[');
            this.out(node.key, state,node.key.type);
            state.write(null, ']');
        } else {
            this.out(node.key, state,node.key.type);
        }
        this.formatParameters(node.value, state);
        this.out(node.value.body, state,node.value.body.type);
    },
    ClassExpression: function (node, state) {
        this.out(node, state,'ClassDeclaration');
    },
    ArrowFunctionExpression: function (node, state) {
        if (node.async)
            state.write(node, 'async ');
        this.formatParameters(node, state);
        state.write(node, '=> ');
        if (node.body.type === 'ObjectExpression' || node.body.type === 'SequenceExpression') {
            state.write(null, '(');
            this.out(node.body, state,node.body.type);
            state.write(null, ')');
        } else {
            this.out(node.body, state,node.body.type);
        }
    },
    ThisExpression: function (node, state) {
        state.write(node, 'this');
    },
    Super: function (node, state) {
        state.write(node, 'super');
    },
    RestElement: RestElement = function (node, state) {
        state.write(node, '...');
        this.out(node.argument, state,node.argument.type);
    },
    SpreadElement: RestElement,
    YieldExpression: function (node, state) {
        state.write(node, 'yield');
        if (node.argument) {
            state.write(null, ' ');
            this.expr(state, node, node.argument);
        }
    },
    AwaitExpression: function (node, state) {
        state.write(node, 'await ');
        this.expr(state, node, node.argument);
    },
    TemplateLiteral: function (node, state) {
        var expression;
        var quasis = node.quasis, expressions = node.expressions;
        state.write(node, '`');
        for (var i = 0, length = expressions.length; i < length; i++) {
            expression = expressions[i];
            state.write(quasis[i].value, quasis[i].value.raw);
            state.write(null, '${');
            this.out(expression, state,expression.type);
            state.write(null, '}');
        }
        state.write(quasis[quasis.length - 1].value, quasis[quasis.length - 1].value.raw);
        state.write(node, '`');
    },
    TaggedTemplateExpression: function (node, state) {
        this.out(node.tag, state,node.tag.type);
        this.out(node.quasi, state,node.quasi.type);
    },
    ArrayExpression: ArrayExpression = function (node, state) {
        state.write(node, '[');
        if (node.elements.length > 0) {
            var elements = node.elements, length = elements.length;
            for (var i = 0; ; ) {
                var element = elements[i];
                element && this.expr(state,CommaList,element) ;

                i += 1 ;
                if (i < length || element===null)
                    state.write(null, ',');
                if (i >= length)
                    break;
                if (state.lineLength() > state.wrapColumn)
                    state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel + 1));
            }
        }
        state.write(null, ']');
    },
    ArrayPattern: ArrayExpression,
    ObjectExpression: function (node, state) {
        var property;
        var indent = repeat(state.indent, state.indentLevel++);
        var lineEnd = state.lineEnd;
        var propertyIndent = indent + state.indent;
        state.write(node, '{');
        if (node.properties.length > 0) {
            state.write(null, lineEnd);
            var properties = node.properties, length = properties.length;
            for (var i = 0; ; ) {
                property = properties[i];
                state.write(null, propertyIndent);
                this.out(property, state,'Property');
                if (++i < length)
                    state.write(node, ',', lineEnd);
                 else
                    break;
                if (state.lineLength() > state.wrapColumn)
                    state.write(null, state.lineEnd, repeat(state.indent, state.indentLevel + 1));
            }
            state.write(null, lineEnd, indent, '}');
        } else {
            state.write(null, '}');
        }
        state.indentLevel--;
    },
    Property: function (node, state) {
        if (node.method || (node.kind == 'get' || node.kind == 'set')) {
            this.MethodDefinition(node, state);
        } else {
            if (!node.shorthand) {
                if (node.computed) {
                    state.write(null, '[');
                    this.out(node.key, state,node.key.type);
                    state.write(null, ']');
                } else {
                    this.out(node.key, state,node.key.type);
                }
                state.write(null, ': ');
            }
            this.expr(state,CommaList,node.value);
        }
    },
    ObjectPattern: function (node, state) {
        state.write(node, '{');
        if (node.properties.length > 0) {
            var properties = node.properties, length = properties.length;
            for (var i = 0; ; ) {
                this.out(properties[i], state,'Property');
                if (++i < length)
                    state.write(null, ', ');
                 else
                    break;
            }
        }
        state.write(null, '}');
    },
    SequenceExpression: function (node, state) {
        var expression;
        var expressions = node.expressions;
        if (expressions.length > 0) {
            var length = expressions.length;
            for (var i = 0; i<length; i++) {
                expression = expressions[i];
                if (i)
                	state.write(null, ', ') ;
                this.expr(state,CommaList,expression) ;
            }
        }
    },
    UnaryExpression: function (node, state) {
        if (node.prefix) {
            state.write(node, node.operator);
            if (node.operator.length > 1)
                state.write(node, ' ');
            this.expr(state, node, node.argument, true);
        } else {
            this.expr(state, node, node.argument);
            state.write(node, node.operator);
        }
    },
    UpdateExpression: function (node, state) {
        if (node.prefix) {
            state.write(node, node.operator);
            this.out(node.argument, state,node.argument.type);
        } else {
            this.out(node.argument, state,node.argument.type);
            state.write(node, node.operator);
        }
    },
    BinaryExpression: BinaryExpression = function (node, state) {
        var operator = node.operator;
        if (operator==='in' && state.inForInit)
          state.write(null, '(');
        this.expr(state, node, node.left);
        state.write(node, ' ', operator, ' ');
        this.expr(state, node, node.right);
        if (operator==='in' && state.inForInit)
          state.write(null, ')');
    },
    LogicalExpression: BinaryExpression,
    AssignmentExpression: function (node, state) {
      if (node.left.type==='ObjectPattern')
        state.write(null,'(');
      this.BinaryExpression(node,state);
      if (node.left.type==='ObjectPattern')
        state.write(null,')');
    },
    AssignmentPattern: function (node, state) {
        this.expr(state, node, node.left);
        state.write(node, ' = ');
        this.expr(state, node, node.right);
    },
    ConditionalExpression: function (node, state) {
        this.expr(state, node, node.test, true);
        state.write(node, ' ? ');
        this.expr(state, node, node.consequent);
        state.write(null, ' : ');
        this.expr(state, node, node.alternate);
    },
    NewExpression: function (node, state) {
        state.write(node, 'new ');
        this.out(node, state,'CallExpression');
    },
    CallExpression: function (node, state) {
        this.expr(state, node, node.callee, node.callee.type==='ObjectExpression'?2:0);
        state.write(node, '(');
        var args = node['arguments'];
        if (args.length > 0) {
            var length = args.length;
            for (var i = 0; i < length; i++) {
                if (i!=0)
                	state.write(null, ', ');
               	this.expr(state,CommaList,args[i]) ;
            }
        }
        state.write(null, ')');
    },
    MemberExpression: function (node, state) {
    	var requireParens = (node.object.type === 'ObjectExpression' || (node.object.type.match(/Literal$/) && node.object.raw.match(/^[0-9]/))) ;
        var noParens = !requireParens &&
        	((node.object.type === 'ArrayExpression' || node.object.type === 'CallExpression' || node.object.type === 'NewExpression')
        	|| precedence(node) <= precedence(node.object));
        if (noParens) {
            this.out(node.object, state,node.object.type);
        } else {
            state.write(null, '(');
            this.out(node.object, state,node.object.type);
            state.write(null, ')');
        }
        if (node.computed) {
            state.write(node, '[');
            this.out(node.property, state,node.property.type);
            state.write(null, ']');
        } else {
            state.write(node, '.');
            this.out(node.property, state,node.property.type);
        }
    },
    Identifier: function (node, state) {
        state.write(node, node.name);
    },
    Literal: function (node, state) {
        state.write(node, node.raw);
    },
    NullLiteral:function (node, state) {
        state.write(node, 'null');
    },
    BooleanLiteral:function (node, state) {
        state.write(node, JSON.stringify(node.value));
    },
    StringLiteral:function (node, state) {
        state.write(node, JSON.stringify(node.value));
    },
    RegExpLiteral:function (node, state) {
        state.write(node, node.extra.raw || ('/'+node.pattern+'/'+node.flags));
    },
    NumericLiteral:function (node, state) {
        state.write(node, JSON.stringify(node.value));
    },
};
module.exports = function (node, options, originalSource) {
    options = options || {};
    var buffer = "", lines = [];
    var map = options.map && new SourceMapGenerator(options.map);
    if (map && options.map.sourceContent) {
        map.setSourceContent(options.map.file, options.map.sourceContent);
    }
    var backBy = 0;
    var leadingComments = [];
    var trailingComments = [];
    var st = {
        inForInit: 0,
        lineLength: function () {
            return buffer.length;
        },
        sourceAt:function(start, end) {
        	return originalSource?originalSource.substring(start,end):"/* Omitted Non-standard node */" ;
        },
        write: function (node) {
            var parts;
            parts = [].slice.call(arguments, 1);
            backBy = parts[parts.length - 1].length;
            for (var i = 0; i < parts.length; i++) {
                if (map && node && node.loc && node.loc.start) {
                    var startOfLine = false;
                    map.addMapping({
                        source: options.map.file,
                        original: {
                            line: node.loc.start.line,
                            column: startOfLine ? 0 : node.loc.start.column
                        },
                        generated: {
                            line: options.map.startLine + lines.length + 1,
                            column: startOfLine ? 0 : buffer.length
                        }
                    });
                }
                if (parts[i] == st.lineEnd) {
                    if (trailingComments.length) {
                        trailingComments.forEach(function (c) {
                            if (c.type === 'Line')
                                buffer += " // " + c.value;
                             else {
                                (" /*" + c.value + "*/").split("\n").forEach(function (v) {
                                    buffer += v;
                                    lines.push(buffer);
                                    buffer = "";
                                });
                                buffer = lines.pop();
                            }
                        });
                        trailingComments = [];
                    }
                    lines.push(buffer);
                    buffer = "";
                    if (leadingComments.length) {
                        var preceeding = lines.pop();
                        leadingComments.forEach(function (c) {
                            var indent = repeat(st.indent, c.indent);
                            if (c.type == "Line")
                                lines.push(indent + "//" + c.value);
                             else
                                (indent + "/*" + c.value + "*/").split("\n").forEach(function (l) {
                                lines.push(l);
                            });
                        });
                        lines.push(preceeding);
                        leadingComments = [];
                    }
                } else {
                    buffer += parts[i];
                    if (node && node.$comments) {
                        node.$comments.forEach(function (c) {
                            var trailing = node.loc.start.column < c.loc.start.column;
                            c.indent = st.indentLevel;
                            if (trailing) {
                                trailingComments.push(c);
                            } else {
                                leadingComments.push(c);
                            }
                        });
                        node.$comments = null;
                    }
                }
            }
        },
        back: function () {
            buffer = buffer.substring(0, buffer.length - backBy);
        },
        indent: "    ",
        lineEnd: "\n",
        indentLevel: 0,
        wrapColumn: 80
    };
    traveler[node.type](node, st);
    trailingComments = node.$comments || [];
    st.write(node, st.lineEnd);
    var result = lines.join(st.lineEnd);
    if (options && options.map) {
        return {
            code: result,
            map: map
        };
    }
    return result;
};

},{"source-map":25}],11:[function(require,module,exports){
'use strict';

var acorn = require("acorn");
var acornWalk = require("acorn/dist/walk");

var walkers = {
    AwaitExpression: function (node, st, c) {
        c(node.argument, st, "Expression");
    },
    SwitchStatement: function (node, st, c) {
        c(node.discriminant, st, "Expression");
        for (var i = 0; i < node.cases.length; ++i) {
            c(node.cases[i],st) ;
        }
    },
    SwitchCase: function (node, st, c) {
        if (node.test) c(node.test, st, "Expression");
        for (var i = 0; i < node.consequent.length; ++i) {
            c(node.consequent[i], st, "Statement");
        }
    },
    TryStatement: function (node, st, c) {
        c(node.block, st, "Statement");
        if (node.handler) c(node.handler, st, "Statement");
        if (node.finalizer) c(node.finalizer, st, "Statement");
    },
    CatchClause: function (node, st, c) {
        c(node.param, st, "Pattern");
        c(node.body, st, "ScopeBody");
    },
    Class: function (node, st, c) {
        if (node.id) c(node.id, st, "Pattern");
        if (node.superClass) c(node.superClass, st, "Expression");
        c(node.body, st);
    },
    ClassBody: function(node, st, c){
        for (var i = 0; i < node.body.length; i++) {
            c(node.body[i], st);
        }
    },
    /* Babel extensions */
    ClassProperty: function(node,st,c){
        if (node.key) c(node.key, st, "Expression");
        if (node.value) c(node.value, st, "Expression");
    },
    ClassMethod: function(node,st,c){
        if (node.key) c(node.key, st, "Expression");
        c(node, st, "Function");
    },
    ObjectProperty: function(node,st,c){
        if (node.key) c(node.key, st, "Expression");
        if (node.value) c(node.value, st, "Expression");
    },
    ObjectMethod: function(node,st,c){
        if (node.key) c(node.key, st, "Expression");
        c(node, st, "Function");
    }
} ;

var acornBase = acornWalk.make(walkers) ;

var referencePrototypes = {
        replace: function(newNode) {
            if ('index' in this) {
                if (Array.isArray(newNode)) {
                    [].splice.apply(this.parent[this.field],[this.index,1].concat(newNode)) ;
                } else {
                    this.parent[this.field][this.index] = newNode ;
                }
            } else {
                if (Array.isArray(newNode)) {
                    this.parent[this.field] = {type:'BlockStatement',body:newNode} ;
                } else {
                    this.parent[this.field] = newNode ;
                }
            }
            return this.self ;
        },
        append: function(newNode) {
            if ('index' in this) {
                if (Array.isArray(newNode)) {
                    [].splice.apply(this.parent[this.field],[this.index+1,0].concat(newNode)) ;
                } else {
                    this.parent[this.field].splice(this.index+1,0,newNode) ;
                }
            } else {
                throw new Error("Cannot append Element node to non-array") ;
            }
            return this.self ;
        },
        index: function(){
            return this.parent[this.field].indexOf(this.self) ;
        },
        removeElement: function() {
            return this.parent[this.field].splice(this.index,1)[0] ;
        },
        removeNode: function() {
            var r = this.parent[this.field] ;
            delete this.parent[this.field] ;
            return r ;
        }
};

function treeWalker(n,walker,state){
    if (!state) {
        state = [{self:n}] ;
        state.replace = function(pos,newNode) {
            state[pos].replace(newNode) ;
        }
    }

    function descend() {
        if (!(n.type in acornBase)) {
            // We don't know what type of node this is - it's not in the ESTree spec,
            // (maybe a 'react' extension?), so just ignore it
        } else {
            acornBase[n.type](n,state,function down(sub,_,derivedFrom){
                if (sub===n)
                    return acornBase[derivedFrom || n.type](n,state,down) ;
    
                function goDown(ref) {
                    ref.replace = referencePrototypes.replace ;
                    ref.append = referencePrototypes.append ;
                    if (ref.index) {
                        Object.defineProperties(ref, {index:{enumerable:true,get:referencePrototypes.index}}) ;
                        ref.remove = referencePrototypes.removeElement ;
                    } else {
                        ref.remove = referencePrototypes.removeNode ;
                    }
                    state.unshift(ref) ;
                    treeWalker(sub,walker,state) ;
                    state.shift() ;
                }
    
                var keys = Object.keys(n) ;
                for (var i=0; i<keys.length; i++){
                    var v = n[keys[i]] ;
                    if (Array.isArray(v) && v.indexOf(sub)>=0) {
                        goDown({
                            self:sub,
                            parent:n,
                            field:keys[i],
                            index:true
                        }) ;
                    } else if (v instanceof Object && sub===v) {
                        goDown({
                            self:sub,
                            parent:n,
                            field:keys[i]
                        }) ;
                    }
                }
            }) ;
        }
    } ;
    walker(n,descend,state) ;
    return n ;
}

require('acorn-es7-plugin')(acorn) ;
function acornParse(code,config) {
    var comments = [] ;
    var options = {
        plugins:{asyncawait:{asyncExits:true, awaitAnywhere:true}},
        ecmaVersion:7,
        allowHashBang:true,
        allowReturnOutsideFunction:true,
        allowImportExportEverywhere:true,
        locations:true,
        onComment:comments
    } ;

    if (config)
        for (var k in config)
            options[k] = config[k] ;

    var ast = acorn.parse(code,options) ;

    // attach comments to the most tightly containing node
    treeWalker(ast,function(node,descend,path){
        descend() ;
        while (comments.length &&
                (node.loc.start.line >= comments[0].loc.start.line && node.loc.end.line>=comments[0].loc.end.line)) {
            node.$comments = node.$comments||[] ;
            node.$comments.push(comments.shift()) ;
        }
    }) ;
    return ast ;
}

module.exports = {
    parse: acornParse,
    treeWalker:treeWalker,
    _acorn:acorn
} ;

},{"acorn":13,"acorn-es7-plugin":12,"acorn/dist/walk":14}],12:[function(require,module,exports){
var NotAsync = {} ;
var asyncExit = /^async[\t ]+(return|throw)/ ;
var asyncFunction = /^async[\t ]+function/ ;
var atomOrPropertyOrLabel = /^\s*[):;]/ ;
var asyncAtEndOfLine = /^async[\t ]*\n/ ;

/* Return the object holding the parser's 'State'. This is different between acorn ('this')
 * and babylon ('this.state') */
function state(p) {
	if (('state' in p) && p.state.constructor && p.state.constructor.name==='State')
		return p.state ; // Probably babylon
	return p ; // Probably acorn
}

/* Create a new parser derived from the specified parser, so that in the
 * event of an error we can back out and try again */
function subParse(parser, pos, extensions) {
	// NB: The Babylon constructor does NOT expect 'pos' as an argument, and so
	// the input needs truncation at the start position, however at present
	// this doesn't work nicely as all the node location/start/end values
	// are therefore offset. Consequently, this plug-in is NOT currently working
	// with the (undocumented) Babylon plug-in interface.
	var p = new parser.constructor(parser.options, parser.input, pos);
	if (extensions)
		for (var k in extensions)
			p[k] = extensions[k] ;

	var src = state(parser) ;
	var dest = state(p) ;
	['inFunction','inAsyncFunction','inAsync','inGenerator','inModule'].forEach(function(k){
		if (k in src)
			dest[k] = src[k] ;
	}) ;
	p.nextToken();
	return p;
}

function asyncAwaitPlugin (parser,options){
	var es7check = function(){} ;

	parser.extend("initialContext",function(base){
		return function(){
			if (this.options.ecmaVersion < 7) {
				es7check = function(node) {
					parser.raise(node.start,"async/await keywords only available when ecmaVersion>=7") ;
				} ;
			}
      this.reservedWords = new RegExp(this.reservedWords.toString().replace(/await|async/g,"").replace("|/","/").replace("/|","/").replace("||","|")) ;
      this.reservedWordsStrict = new RegExp(this.reservedWordsStrict.toString().replace(/await|async/g,"").replace("|/","/").replace("/|","/").replace("||","|")) ;
      this.reservedWordsStrictBind = new RegExp(this.reservedWordsStrictBind.toString().replace(/await|async/g,"").replace("|/","/").replace("/|","/").replace("||","|")) ;
			return base.apply(this,arguments);
		}
	}) ;

	parser.extend("parseStatement",function(base){
		return function (declaration, topLevel) {
			var st = state(this) ;
			var start = st.start;
			var startLoc = st.startLoc;
			if (st.type.label==='name') {
				if (asyncFunction.test(st.input.slice(st.start))) {
					var wasAsync = st.inAsyncFunction ;
					try {
						st.inAsyncFunction = true ;
						this.next() ;
						var r = this.parseStatement(declaration, topLevel) ;
						r.async = true ;
						r.start = start;
						r.loc && (r.loc.start = startLoc);
						return r ;
					} finally {
						st.inAsyncFunction = wasAsync ;
					}
				} else if ((typeof options==="object" && options.asyncExits) && asyncExit.test(st.input.slice(st.start))) {
					// NON-STANDARD EXTENSION iff. options.asyncExits is set, the
					// extensions 'async return <expr>?' and 'async throw <expr>?'
					// are enabled. In each case they are the standard ESTree nodes
					// with the flag 'async:true'
					this.next() ;
					var r = this.parseStatement(declaration, topLevel) ;
					r.async = true ;
					r.start = start;
					r.loc && (r.loc.start = startLoc);
					return r ;
				}
			}
			return base.apply(this,arguments);
		}
	}) ;

  parser.extend("parseIdent",function(base){
		return function(liberal){
				var id = base.apply(this,arguments);
				var st = state(this) ;
				if (st.inAsyncFunction && id.name==='await') {
					if (arguments.length===0) {
						this.raise(id.start,"'await' is reserved within async functions") ;
					}
				}
				return id ;
		}
	}) ;

	parser.extend("parseExprAtom",function(base){
		return function(refShorthandDefaultPos){
			var st = state(this) ;
			var start = st.start ;
			var startLoc = st.startLoc;
			var rhs,r = base.apply(this,arguments);
			if (r.type==='Identifier') {
				if (r.name==='async' && !asyncAtEndOfLine.test(st.input.slice(start))) {
					// Is this really an async function?
					var isAsync = st.inAsyncFunction ;
					try {
						st.inAsyncFunction = true ;
						var pp = this ;
						var inBody = false ;

						var parseHooks = {
							parseFunctionBody:function(node,isArrowFunction){
								try {
									var wasInBody = inBody ;
									inBody = true ;
									return pp.parseFunctionBody.apply(this,arguments) ;
								} finally {
									inBody = wasInBody ;
								}
							},
							raise:function(){
								try {
									return pp.raise.apply(this,arguments) ;
								} catch(ex) {
									throw inBody?ex:NotAsync ;
								}
							}
						} ;

						rhs = subParse(this,st.start,parseHooks).parseExpression() ;
						if (rhs.type==='SequenceExpression')
							rhs = rhs.expressions[0] ;
						if (rhs.type==='FunctionExpression' || rhs.type==='FunctionDeclaration' || rhs.type==='ArrowFunctionExpression') {
							rhs.async = true ;
							rhs.start = start;
							rhs.loc && (rhs.loc.start = startLoc);
							st.pos = rhs.end;
							this.next();
							es7check(rhs) ;
							return rhs ;
						}
					} catch (ex) {
						if (ex!==NotAsync)
							throw ex ;
					}
					finally {
						st.inAsyncFunction = isAsync ;
					}
				}
				else if (r.name==='await') {
					var n = this.startNodeAt(r.start, r.loc && r.loc.start);
					if (st.inAsyncFunction) {
						rhs = this.parseExprSubscripts() ;
						n.operator = 'await' ;
						n.argument = rhs ;
						n = this.finishNodeAt(n,'AwaitExpression', rhs.end, rhs.loc && rhs.loc.end) ;
						es7check(n) ;
						return n ;
					} else
						// NON-STANDARD EXTENSION iff. options.awaitAnywhere is true,
						// an 'AwaitExpression' is allowed anywhere the token 'await'
						// could not be an identifier with the name 'await'.

						// Look-ahead to see if this is really a property or label called async or await
						if (st.input.slice(r.end).match(atomOrPropertyOrLabel))
							return r ; // This is a valid property name or label

						if (typeof options==="object" && options.awaitAnywhere) {
							start = st.start ;
							rhs = subParse(this,start-4).parseExprSubscripts() ;
							if (rhs.end<=start) {
								rhs = subParse(this,start).parseExprSubscripts() ;
								n.operator = 'await' ;
								n.argument = rhs ;
								n = this.finishNodeAt(n,'AwaitExpression', rhs.end, rhs.loc && rhs.loc.end) ;
								st.pos = rhs.end;
								this.next();
								es7check(n) ;
								return n ;
							}
						}
				}
			}
			return r ;
		}
	}) ;

	parser.extend('finishNodeAt',function(base){
			return function(node,type,pos,loc) {
				if (node.__asyncValue) {
					delete node.__asyncValue ;
					node.value.async = true ;
				}
				return base.apply(this,arguments) ;
			}
	}) ;

	parser.extend('finishNode',function(base){
			return function(node,type) {
				if (node.__asyncValue) {
					delete node.__asyncValue ;
					node.value.async = true ;
				}
				return base.apply(this,arguments) ;
			}
	}) ;

	parser.extend("parsePropertyName",function(base){
		return function (prop) {
			var st = state(this) ;
			var key = base.apply(this,arguments) ;
			if (key.type === "Identifier" && key.name === "async") {
				// Look-ahead to see if this is really a property or label called async or await
				if (!st.input.slice(key.end).match(atomOrPropertyOrLabel)){
					es7check(prop) ;
					key = base.apply(this,arguments) ;
					if (key.type==='Identifier') {
						if (key.name==='constructor')
							this.raise(key.start,"'constructor()' cannot be be async") ;
						else if (key.name==='set')
							this.raise(key.start,"'set <member>(value)' cannot be be async") ;
					}
					prop.__asyncValue = true ;
				}
			}
			return key;
		};
	}) ;
}

module.exports = function(acorn) {
	acorn.plugins.asyncawait = asyncAwaitPlugin ;
}

},{}],13:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.acorn = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

"use strict";

var _tokentype = _dereq_("./tokentype");

var _state = _dereq_("./state");

var pp = _state.Parser.prototype;

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp.checkPropClash = function (prop, propHash) {
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) return;
  var key = prop.key;var name = undefined;
  switch (key.type) {
    case "Identifier":
      name = key.name;break;
    case "Literal":
      name = String(key.value);break;
    default:
      return;
  }
  var kind = prop.kind;

  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) this.raise(key.start, "Redefinition of __proto__ property");
      propHash.proto = true;
    }
    return;
  }
  name = "$" + name;
  var other = propHash[name];
  if (other) {
    var isGetSet = kind !== "init";
    if ((this.strict || isGetSet) && other[kind] || !(isGetSet ^ other.init)) this.raise(key.start, "Redefinition of property");
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function(s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initalization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp.parseExpression = function (noIn, refDestructuringErrors) {
  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
  if (this.type === _tokentype.types.comma) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(_tokentype.types.comma)) node.expressions.push(this.parseMaybeAssign(noIn, refDestructuringErrors));
    return this.finishNode(node, "SequenceExpression");
  }
  return expr;
};

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp.parseMaybeAssign = function (noIn, refDestructuringErrors, afterLeftParse) {
  if (this.type == _tokentype.types._yield && this.inGenerator) return this.parseYield();

  var validateDestructuring = false;
  if (!refDestructuringErrors) {
    refDestructuringErrors = { shorthandAssign: 0, trailingComma: 0 };
    validateDestructuring = true;
  }
  var startPos = this.start,
      startLoc = this.startLoc;
  if (this.type == _tokentype.types.parenL || this.type == _tokentype.types.name) this.potentialArrowAt = this.start;
  var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
  if (afterLeftParse) left = afterLeftParse.call(this, left, startPos, startLoc);
  if (this.type.isAssign) {
    if (validateDestructuring) this.checkPatternErrors(refDestructuringErrors, true);
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    node.left = this.type === _tokentype.types.eq ? this.toAssignable(left) : left;
    refDestructuringErrors.shorthandAssign = 0; // reset because shorthand default was used correctly
    this.checkLVal(left);
    this.next();
    node.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "AssignmentExpression");
  } else {
    if (validateDestructuring) this.checkExpressionErrors(refDestructuringErrors, true);
  }
  return left;
};

// Parse a ternary conditional (`?:`) operator.

pp.parseMaybeConditional = function (noIn, refDestructuringErrors) {
  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseExprOps(noIn, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
  if (this.eat(_tokentype.types.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(_tokentype.types.colon);
    node.alternate = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "ConditionalExpression");
  }
  return expr;
};

// Start the precedence parser.

pp.parseExprOps = function (noIn, refDestructuringErrors) {
  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
  return this.parseExprOp(expr, startPos, startLoc, -1, noIn);
};

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp.parseExprOp = function (left, leftStartPos, leftStartLoc, minPrec, noIn) {
  var prec = this.type.binop;
  if (prec != null && (!noIn || this.type !== _tokentype.types._in)) {
    if (prec > minPrec) {
      var node = this.startNodeAt(leftStartPos, leftStartLoc);
      node.left = left;
      node.operator = this.value;
      var op = this.type;
      this.next();
      var startPos = this.start,
          startLoc = this.startLoc;
      node.right = this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, prec, noIn);
      this.finishNode(node, op === _tokentype.types.logicalOR || op === _tokentype.types.logicalAND ? "LogicalExpression" : "BinaryExpression");
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
    }
  }
  return left;
};

// Parse unary operators, both prefix and postfix.

pp.parseMaybeUnary = function (refDestructuringErrors) {
  if (this.type.prefix) {
    var node = this.startNode(),
        update = this.type === _tokentype.types.incDec;
    node.operator = this.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary();
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) this.checkLVal(node.argument);else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") this.raise(node.start, "Deleting local variable in strict mode");
    return this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  }
  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseExprSubscripts(refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
  while (this.type.postfix && !this.canInsertSemicolon()) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    node.prefix = false;
    node.argument = expr;
    this.checkLVal(expr);
    this.next();
    expr = this.finishNode(node, "UpdateExpression");
  }
  return expr;
};

// Parse call, dot, and `[]`-subscript expressions.

pp.parseExprSubscripts = function (refDestructuringErrors) {
  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors);
  var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
  if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) return expr;
  return this.parseSubscripts(expr, startPos, startLoc);
};

pp.parseSubscripts = function (base, startPos, startLoc, noCalls) {
  for (;;) {
    if (this.eat(_tokentype.types.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = this.parseIdent(true);
      node.computed = false;
      base = this.finishNode(node, "MemberExpression");
    } else if (this.eat(_tokentype.types.bracketL)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = this.parseExpression();
      node.computed = true;
      this.expect(_tokentype.types.bracketR);
      base = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.eat(_tokentype.types.parenL)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.callee = base;
      node.arguments = this.parseExprList(_tokentype.types.parenR, false);
      base = this.finishNode(node, "CallExpression");
    } else if (this.type === _tokentype.types.backQuote) {
      var node = this.startNodeAt(startPos, startLoc);
      node.tag = base;
      node.quasi = this.parseTemplate();
      base = this.finishNode(node, "TaggedTemplateExpression");
    } else {
      return base;
    }
  }
};

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp.parseExprAtom = function (refDestructuringErrors) {
  var node = undefined,
      canBeArrow = this.potentialArrowAt == this.start;
  switch (this.type) {
    case _tokentype.types._super:
      if (!this.inFunction) this.raise(this.start, "'super' outside of function or class");
    case _tokentype.types._this:
      var type = this.type === _tokentype.types._this ? "ThisExpression" : "Super";
      node = this.startNode();
      this.next();
      return this.finishNode(node, type);

    case _tokentype.types._yield:
      if (this.inGenerator) this.unexpected();

    case _tokentype.types.name:
      var startPos = this.start,
          startLoc = this.startLoc;
      var id = this.parseIdent(this.type !== _tokentype.types.name);
      if (canBeArrow && !this.canInsertSemicolon() && this.eat(_tokentype.types.arrow)) return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id]);
      return id;

    case _tokentype.types.regexp:
      var value = this.value;
      node = this.parseLiteral(value.value);
      node.regex = { pattern: value.pattern, flags: value.flags };
      return node;

    case _tokentype.types.num:case _tokentype.types.string:
      return this.parseLiteral(this.value);

    case _tokentype.types._null:case _tokentype.types._true:case _tokentype.types._false:
      node = this.startNode();
      node.value = this.type === _tokentype.types._null ? null : this.type === _tokentype.types._true;
      node.raw = this.type.keyword;
      this.next();
      return this.finishNode(node, "Literal");

    case _tokentype.types.parenL:
      return this.parseParenAndDistinguishExpression(canBeArrow);

    case _tokentype.types.bracketL:
      node = this.startNode();
      this.next();
      // check whether this is array comprehension or regular array
      if (this.options.ecmaVersion >= 7 && this.type === _tokentype.types._for) {
        return this.parseComprehension(node, false);
      }
      node.elements = this.parseExprList(_tokentype.types.bracketR, true, true, refDestructuringErrors);
      return this.finishNode(node, "ArrayExpression");

    case _tokentype.types.braceL:
      return this.parseObj(false, refDestructuringErrors);

    case _tokentype.types._function:
      node = this.startNode();
      this.next();
      return this.parseFunction(node, false);

    case _tokentype.types._class:
      return this.parseClass(this.startNode(), false);

    case _tokentype.types._new:
      return this.parseNew();

    case _tokentype.types.backQuote:
      return this.parseTemplate();

    default:
      this.unexpected();
  }
};

pp.parseLiteral = function (value) {
  var node = this.startNode();
  node.value = value;
  node.raw = this.input.slice(this.start, this.end);
  this.next();
  return this.finishNode(node, "Literal");
};

pp.parseParenExpression = function () {
  this.expect(_tokentype.types.parenL);
  var val = this.parseExpression();
  this.expect(_tokentype.types.parenR);
  return val;
};

pp.parseParenAndDistinguishExpression = function (canBeArrow) {
  var startPos = this.start,
      startLoc = this.startLoc,
      val = undefined;
  if (this.options.ecmaVersion >= 6) {
    this.next();

    if (this.options.ecmaVersion >= 7 && this.type === _tokentype.types._for) {
      return this.parseComprehension(this.startNodeAt(startPos, startLoc), true);
    }

    var innerStartPos = this.start,
        innerStartLoc = this.startLoc;
    var exprList = [],
        first = true;
    var refDestructuringErrors = { shorthandAssign: 0, trailingComma: 0 },
        spreadStart = undefined,
        innerParenStart = undefined;
    while (this.type !== _tokentype.types.parenR) {
      first ? first = false : this.expect(_tokentype.types.comma);
      if (this.type === _tokentype.types.ellipsis) {
        spreadStart = this.start;
        exprList.push(this.parseParenItem(this.parseRest()));
        break;
      } else {
        if (this.type === _tokentype.types.parenL && !innerParenStart) {
          innerParenStart = this.start;
        }
        exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
      }
    }
    var innerEndPos = this.start,
        innerEndLoc = this.startLoc;
    this.expect(_tokentype.types.parenR);

    if (canBeArrow && !this.canInsertSemicolon() && this.eat(_tokentype.types.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, true);
      if (innerParenStart) this.unexpected(innerParenStart);
      return this.parseParenArrowList(startPos, startLoc, exprList);
    }

    if (!exprList.length) this.unexpected(this.lastTokStart);
    if (spreadStart) this.unexpected(spreadStart);
    this.checkExpressionErrors(refDestructuringErrors, true);

    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }

  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression");
  } else {
    return val;
  }
};

pp.parseParenItem = function (item) {
  return item;
};

pp.parseParenArrowList = function (startPos, startLoc, exprList) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
};

// New's precedence is slightly tricky. It must allow its argument
// to be a `[]` or dot subscript expression, but not a call — at
// least, not without wrapping it in parentheses. Thus, it uses the

var empty = [];

pp.parseNew = function () {
  var node = this.startNode();
  var meta = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(_tokentype.types.dot)) {
    node.meta = meta;
    node.property = this.parseIdent(true);
    if (node.property.name !== "target") this.raise(node.property.start, "The only valid meta property for new is new.target");
    if (!this.inFunction) this.raise(node.start, "new.target can only be used in functions");
    return this.finishNode(node, "MetaProperty");
  }
  var startPos = this.start,
      startLoc = this.startLoc;
  node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
  if (this.eat(_tokentype.types.parenL)) node.arguments = this.parseExprList(_tokentype.types.parenR, false);else node.arguments = empty;
  return this.finishNode(node, "NewExpression");
};

// Parse template expression.

pp.parseTemplateElement = function () {
  var elem = this.startNode();
  elem.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, '\n'),
    cooked: this.value
  };
  this.next();
  elem.tail = this.type === _tokentype.types.backQuote;
  return this.finishNode(elem, "TemplateElement");
};

pp.parseTemplate = function () {
  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement();
  node.quasis = [curElt];
  while (!curElt.tail) {
    this.expect(_tokentype.types.dollarBraceL);
    node.expressions.push(this.parseExpression());
    this.expect(_tokentype.types.braceR);
    node.quasis.push(curElt = this.parseTemplateElement());
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral");
};

// Parse an object literal or binding pattern.

pp.parseObj = function (isPattern, refDestructuringErrors) {
  var node = this.startNode(),
      first = true,
      propHash = {};
  node.properties = [];
  this.next();
  while (!this.eat(_tokentype.types.braceR)) {
    if (!first) {
      this.expect(_tokentype.types.comma);
      if (this.afterTrailingComma(_tokentype.types.braceR)) break;
    } else first = false;

    var prop = this.startNode(),
        isGenerator = undefined,
        startPos = undefined,
        startLoc = undefined;
    if (this.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;
      if (isPattern || refDestructuringErrors) {
        startPos = this.start;
        startLoc = this.startLoc;
      }
      if (!isPattern) isGenerator = this.eat(_tokentype.types.star);
    }
    this.parsePropertyName(prop);
    this.parsePropertyValue(prop, isPattern, isGenerator, startPos, startLoc, refDestructuringErrors);
    this.checkPropClash(prop, propHash);
    node.properties.push(this.finishNode(prop, "Property"));
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
};

pp.parsePropertyValue = function (prop, isPattern, isGenerator, startPos, startLoc, refDestructuringErrors) {
  if (this.eat(_tokentype.types.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === _tokentype.types.parenL) {
    if (isPattern) this.unexpected();
    prop.kind = "init";
    prop.method = true;
    prop.value = this.parseMethod(isGenerator);
  } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type != _tokentype.types.comma && this.type != _tokentype.types.braceR)) {
    if (isGenerator || isPattern) this.unexpected();
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get") this.raise(start, "getter should have no params");else this.raise(start, "setter should have exactly one param");
    }
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    prop.kind = "init";
    if (isPattern) {
      if (this.keywords.test(prop.key.name) || (this.strict ? this.reservedWordsStrictBind : this.reservedWords).test(prop.key.name)) this.raise(prop.key.start, "Binding " + prop.key.name);
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else if (this.type === _tokentype.types.eq && refDestructuringErrors) {
      if (!refDestructuringErrors.shorthandAssign) refDestructuringErrors.shorthandAssign = this.start;
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else {
      prop.value = prop.key;
    }
    prop.shorthand = true;
  } else this.unexpected();
};

pp.parsePropertyName = function (prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(_tokentype.types.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(_tokentype.types.bracketR);
      return prop.key;
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === _tokentype.types.num || this.type === _tokentype.types.string ? this.parseExprAtom() : this.parseIdent(true);
};

// Initialize empty function node.

pp.initFunction = function (node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) {
    node.generator = false;
    node.expression = false;
  }
};

// Parse object or class method.

pp.parseMethod = function (isGenerator) {
  var node = this.startNode();
  this.initFunction(node);
  this.expect(_tokentype.types.parenL);
  node.params = this.parseBindingList(_tokentype.types.parenR, false, false);
  if (this.options.ecmaVersion >= 6) node.generator = isGenerator;
  this.parseFunctionBody(node, false);
  return this.finishNode(node, "FunctionExpression");
};

// Parse arrow function expression with given parameters.

pp.parseArrowExpression = function (node, params) {
  this.initFunction(node);
  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true);
  return this.finishNode(node, "ArrowFunctionExpression");
};

// Parse function body and check parameters.

pp.parseFunctionBody = function (node, isArrowFunction) {
  var isExpression = isArrowFunction && this.type !== _tokentype.types.braceL;

  if (isExpression) {
    node.body = this.parseMaybeAssign();
    node.expression = true;
  } else {
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldInFunc = this.inFunction,
        oldInGen = this.inGenerator,
        oldLabels = this.labels;
    this.inFunction = true;this.inGenerator = node.generator;this.labels = [];
    node.body = this.parseBlock(true);
    node.expression = false;
    this.inFunction = oldInFunc;this.inGenerator = oldInGen;this.labels = oldLabels;
  }

  // If this is a strict mode function, verify that argument names
  // are not repeated, and it does not try to bind the words `eval`
  // or `arguments`.
  if (this.strict || !isExpression && node.body.body.length && this.isUseStrict(node.body.body[0])) {
    var oldStrict = this.strict;
    this.strict = true;
    if (node.id) this.checkLVal(node.id, true);
    this.checkParams(node);
    this.strict = oldStrict;
  } else if (isArrowFunction) {
    this.checkParams(node);
  }
};

// Checks function params for various disallowed patterns such as using "eval"
// or "arguments" and duplicate parameters.

pp.checkParams = function (node) {
  var nameHash = {};
  for (var i = 0; i < node.params.length; i++) {
    this.checkLVal(node.params[i], true, nameHash);
  }
};

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp.parseExprList = function (close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var elts = [],
      first = true;
  while (!this.eat(close)) {
    if (!first) {
      this.expect(_tokentype.types.comma);
      if (this.type === close && refDestructuringErrors && !refDestructuringErrors.trailingComma) {
        refDestructuringErrors.trailingComma = this.lastTokStart;
      }
      if (allowTrailingComma && this.afterTrailingComma(close)) break;
    } else first = false;

    var elt = undefined;
    if (allowEmpty && this.type === _tokentype.types.comma) elt = null;else if (this.type === _tokentype.types.ellipsis) elt = this.parseSpread(refDestructuringErrors);else elt = this.parseMaybeAssign(false, refDestructuringErrors);
    elts.push(elt);
  }
  return elts;
};

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp.parseIdent = function (liberal) {
  var node = this.startNode();
  if (liberal && this.options.allowReserved == "never") liberal = false;
  if (this.type === _tokentype.types.name) {
    if (!liberal && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(this.value) && (this.options.ecmaVersion >= 6 || this.input.slice(this.start, this.end).indexOf("\\") == -1)) this.raise(this.start, "The keyword '" + this.value + "' is reserved");
    node.name = this.value;
  } else if (liberal && this.type.keyword) {
    node.name = this.type.keyword;
  } else {
    this.unexpected();
  }
  this.next();
  return this.finishNode(node, "Identifier");
};

// Parses yield expression inside generator.

pp.parseYield = function () {
  var node = this.startNode();
  this.next();
  if (this.type == _tokentype.types.semi || this.canInsertSemicolon() || this.type != _tokentype.types.star && !this.type.startsExpr) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(_tokentype.types.star);
    node.argument = this.parseMaybeAssign();
  }
  return this.finishNode(node, "YieldExpression");
};

// Parses array and generator comprehensions.

pp.parseComprehension = function (node, isGenerator) {
  node.blocks = [];
  while (this.type === _tokentype.types._for) {
    var block = this.startNode();
    this.next();
    this.expect(_tokentype.types.parenL);
    block.left = this.parseBindingAtom();
    this.checkLVal(block.left, true);
    this.expectContextual("of");
    block.right = this.parseExpression();
    this.expect(_tokentype.types.parenR);
    node.blocks.push(this.finishNode(block, "ComprehensionBlock"));
  }
  node.filter = this.eat(_tokentype.types._if) ? this.parseParenExpression() : null;
  node.body = this.parseExpression();
  this.expect(isGenerator ? _tokentype.types.parenR : _tokentype.types.bracketR);
  node.generator = isGenerator;
  return this.finishNode(node, "ComprehensionExpression");
};

},{"./state":10,"./tokentype":14}],2:[function(_dereq_,module,exports){
// This is a trick taken from Esprima. It turns out that, on
// non-Chrome browsers, to check whether a string is in a set, a
// predicate containing a big ugly `switch` statement is faster than
// a regular expression, and on Chrome the two are about on par.
// This function uses `eval` (non-lexical) to produce such a
// predicate from a space-separated string of words.
//
// It starts by sorting the words by length.

// Reserved word lists for various dialects of the language

"use strict";

exports.__esModule = true;
exports.isIdentifierStart = isIdentifierStart;
exports.isIdentifierChar = isIdentifierChar;
var reservedWords = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};

exports.reservedWords = reservedWords;
// And the keywords

var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

var keywords = {
  5: ecma5AndLessKeywords,
  6: ecma5AndLessKeywords + " let const class extends export import yield super"
};

exports.keywords = keywords;
// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
// Generated by `bin/generate-identifier-regex.js`.

var nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
var nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏ᦰ-ᧀᧈᧉ᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷼-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︭︳︴﹍-﹏０-９＿";

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range. They were
// generated by tools/generate-identifier-regex.js
var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 99, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 98, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 955, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 38, 17, 2, 24, 133, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 32, 4, 287, 47, 21, 1, 2, 0, 185, 46, 82, 47, 21, 0, 60, 42, 502, 63, 32, 0, 449, 56, 1288, 920, 104, 110, 2962, 1070, 13266, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 16481, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 1340, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 16355, 541];
var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 16, 9, 83, 11, 168, 11, 6, 9, 8, 2, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 316, 19, 13, 9, 214, 6, 3, 8, 112, 16, 16, 9, 82, 12, 9, 9, 535, 9, 20855, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 4305, 6, 792618, 239];

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) return false;
    pos += set[i + 1];
    if (pos >= code) return true;
  }
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code, astral) {
  if (code < 65) return code === 36;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  if (astral === false) return false;
  return isInAstralSet(code, astralIdentifierStartCodes);
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code, astral) {
  if (code < 48) return code === 36;
  if (code < 58) return true;
  if (code < 65) return false;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  if (astral === false) return false;
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}

},{}],3:[function(_dereq_,module,exports){
// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/ternjs/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/ternjs/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

"use strict";

exports.__esModule = true;
exports.parse = parse;
exports.parseExpressionAt = parseExpressionAt;
exports.tokenizer = tokenizer;

var _state = _dereq_("./state");

_dereq_("./parseutil");

_dereq_("./statement");

_dereq_("./lval");

_dereq_("./expression");

_dereq_("./location");

exports.Parser = _state.Parser;
exports.plugins = _state.plugins;

var _options = _dereq_("./options");

exports.defaultOptions = _options.defaultOptions;

var _locutil = _dereq_("./locutil");

exports.Position = _locutil.Position;
exports.SourceLocation = _locutil.SourceLocation;
exports.getLineInfo = _locutil.getLineInfo;

var _node = _dereq_("./node");

exports.Node = _node.Node;

var _tokentype = _dereq_("./tokentype");

exports.TokenType = _tokentype.TokenType;
exports.tokTypes = _tokentype.types;

var _tokencontext = _dereq_("./tokencontext");

exports.TokContext = _tokencontext.TokContext;
exports.tokContexts = _tokencontext.types;

var _identifier = _dereq_("./identifier");

exports.isIdentifierChar = _identifier.isIdentifierChar;
exports.isIdentifierStart = _identifier.isIdentifierStart;

var _tokenize = _dereq_("./tokenize");

exports.Token = _tokenize.Token;

var _whitespace = _dereq_("./whitespace");

exports.isNewLine = _whitespace.isNewLine;
exports.lineBreak = _whitespace.lineBreak;
exports.lineBreakG = _whitespace.lineBreakG;
var version = "2.6.4";

exports.version = version;
// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

function parse(input, options) {
  return new _state.Parser(options, input).parse();
}

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

function parseExpressionAt(input, pos, options) {
  var p = new _state.Parser(options, input, pos);
  p.nextToken();
  return p.parseExpression();
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenizer` export provides an interface to the tokenizer.

function tokenizer(input, options) {
  return new _state.Parser(options, input);
}

},{"./expression":1,"./identifier":2,"./location":4,"./locutil":5,"./lval":6,"./node":7,"./options":8,"./parseutil":9,"./state":10,"./statement":11,"./tokencontext":12,"./tokenize":13,"./tokentype":14,"./whitespace":16}],4:[function(_dereq_,module,exports){
"use strict";

var _state = _dereq_("./state");

var _locutil = _dereq_("./locutil");

var pp = _state.Parser.prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp.raise = function (pos, message) {
  var loc = _locutil.getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos;err.loc = loc;err.raisedAt = this.pos;
  throw err;
};

pp.curPosition = function () {
  if (this.options.locations) {
    return new _locutil.Position(this.curLine, this.pos - this.lineStart);
  }
};

},{"./locutil":5,"./state":10}],5:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;
exports.getLineInfo = getLineInfo;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _whitespace = _dereq_("./whitespace");

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = (function () {
  function Position(line, col) {
    _classCallCheck(this, Position);

    this.line = line;
    this.column = col;
  }

  Position.prototype.offset = function offset(n) {
    return new Position(this.line, this.column + n);
  };

  return Position;
})();

exports.Position = Position;

var SourceLocation = function SourceLocation(p, start, end) {
  _classCallCheck(this, SourceLocation);

  this.start = start;
  this.end = end;
  if (p.sourceFile !== null) this.source = p.sourceFile;
}

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

;

exports.SourceLocation = SourceLocation;

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    _whitespace.lineBreakG.lastIndex = cur;
    var match = _whitespace.lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return new Position(line, offset - cur);
    }
  }
}

},{"./whitespace":16}],6:[function(_dereq_,module,exports){
"use strict";

var _tokentype = _dereq_("./tokentype");

var _state = _dereq_("./state");

var _util = _dereq_("./util");

var pp = _state.Parser.prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp.toAssignable = function (node, isBinding) {
  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
      case "Identifier":
      case "ObjectPattern":
      case "ArrayPattern":
        break;

      case "ObjectExpression":
        node.type = "ObjectPattern";
        for (var i = 0; i < node.properties.length; i++) {
          var prop = node.properties[i];
          if (prop.kind !== "init") this.raise(prop.key.start, "Object pattern can't contain getter or setter");
          this.toAssignable(prop.value, isBinding);
        }
        break;

      case "ArrayExpression":
        node.type = "ArrayPattern";
        this.toAssignableList(node.elements, isBinding);
        break;

      case "AssignmentExpression":
        if (node.operator === "=") {
          node.type = "AssignmentPattern";
          delete node.operator;
          // falls through to AssignmentPattern
        } else {
            this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
            break;
          }

      case "AssignmentPattern":
        if (node.right.type === "YieldExpression") this.raise(node.right.start, "Yield expression cannot be a default value");
        break;

      case "ParenthesizedExpression":
        node.expression = this.toAssignable(node.expression, isBinding);
        break;

      case "MemberExpression":
        if (!isBinding) break;

      default:
        this.raise(node.start, "Assigning to rvalue");
    }
  }
  return node;
};

// Convert list of expression atoms to binding list.

pp.toAssignableList = function (exprList, isBinding) {
  var end = exprList.length;
  if (end) {
    var last = exprList[end - 1];
    if (last && last.type == "RestElement") {
      --end;
    } else if (last && last.type == "SpreadElement") {
      last.type = "RestElement";
      var arg = last.argument;
      this.toAssignable(arg, isBinding);
      if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern") this.unexpected(arg.start);
      --end;
    }

    if (isBinding && last.type === "RestElement" && last.argument.type !== "Identifier") this.unexpected(last.argument.start);
  }
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) this.toAssignable(elt, isBinding);
  }
  return exprList;
};

// Parses spread element.

pp.parseSpread = function (refDestructuringErrors) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(refDestructuringErrors);
  return this.finishNode(node, "SpreadElement");
};

pp.parseRest = function (allowNonIdent) {
  var node = this.startNode();
  this.next();

  // RestElement inside of a function parameter must be an identifier
  if (allowNonIdent) node.argument = this.type === _tokentype.types.name ? this.parseIdent() : this.unexpected();else node.argument = this.type === _tokentype.types.name || this.type === _tokentype.types.bracketL ? this.parseBindingAtom() : this.unexpected();

  return this.finishNode(node, "RestElement");
};

// Parses lvalue (assignable) atom.

pp.parseBindingAtom = function () {
  if (this.options.ecmaVersion < 6) return this.parseIdent();
  switch (this.type) {
    case _tokentype.types.name:
      return this.parseIdent();

    case _tokentype.types.bracketL:
      var node = this.startNode();
      this.next();
      node.elements = this.parseBindingList(_tokentype.types.bracketR, true, true);
      return this.finishNode(node, "ArrayPattern");

    case _tokentype.types.braceL:
      return this.parseObj(true);

    default:
      this.unexpected();
  }
};

pp.parseBindingList = function (close, allowEmpty, allowTrailingComma, allowNonIdent) {
  var elts = [],
      first = true;
  while (!this.eat(close)) {
    if (first) first = false;else this.expect(_tokentype.types.comma);
    if (allowEmpty && this.type === _tokentype.types.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this.afterTrailingComma(close)) {
      break;
    } else if (this.type === _tokentype.types.ellipsis) {
      var rest = this.parseRest(allowNonIdent);
      this.parseBindingListItem(rest);
      elts.push(rest);
      this.expect(close);
      break;
    } else {
      var elem = this.parseMaybeDefault(this.start, this.startLoc);
      this.parseBindingListItem(elem);
      elts.push(elem);
    }
  }
  return elts;
};

pp.parseBindingListItem = function (param) {
  return param;
};

// Parses assignment pattern around given atom if possible.

pp.parseMaybeDefault = function (startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(_tokentype.types.eq)) return left;
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern");
};

// Verify that a node is an lval — something that can be assigned
// to.

pp.checkLVal = function (expr, isBinding, checkClashes) {
  switch (expr.type) {
    case "Identifier":
      if (this.strict && this.reservedWordsStrictBind.test(expr.name)) this.raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
      if (checkClashes) {
        if (_util.has(checkClashes, expr.name)) this.raise(expr.start, "Argument name clash");
        checkClashes[expr.name] = true;
      }
      break;

    case "MemberExpression":
      if (isBinding) this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
      break;

    case "ObjectPattern":
      for (var i = 0; i < expr.properties.length; i++) {
        this.checkLVal(expr.properties[i].value, isBinding, checkClashes);
      }break;

    case "ArrayPattern":
      for (var i = 0; i < expr.elements.length; i++) {
        var elem = expr.elements[i];
        if (elem) this.checkLVal(elem, isBinding, checkClashes);
      }
      break;

    case "AssignmentPattern":
      this.checkLVal(expr.left, isBinding, checkClashes);
      break;

    case "RestElement":
      this.checkLVal(expr.argument, isBinding, checkClashes);
      break;

    case "ParenthesizedExpression":
      this.checkLVal(expr.expression, isBinding, checkClashes);
      break;

    default:
      this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " rvalue");
  }
};

},{"./state":10,"./tokentype":14,"./util":15}],7:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _state = _dereq_("./state");

var _locutil = _dereq_("./locutil");

var Node = function Node(parser, pos, loc) {
  _classCallCheck(this, Node);

  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations) this.loc = new _locutil.SourceLocation(parser, loc);
  if (parser.options.directSourceFile) this.sourceFile = parser.options.directSourceFile;
  if (parser.options.ranges) this.range = [pos, 0];
}

// Start an AST node, attaching a start offset.

;

exports.Node = Node;
var pp = _state.Parser.prototype;

pp.startNode = function () {
  return new Node(this, this.start, this.startLoc);
};

pp.startNodeAt = function (pos, loc) {
  return new Node(this, pos, loc);
};

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations) node.loc.end = loc;
  if (this.options.ranges) node.range[1] = pos;
  return node;
}

pp.finishNode = function (node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
};

// Finish node at given position

pp.finishNodeAt = function (node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};

},{"./locutil":5,"./state":10}],8:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;
exports.getOptions = getOptions;

var _util = _dereq_("./util");

var _locutil = _dereq_("./locutil");

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

var defaultOptions = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must
  // be either 3, or 5, or 6. This influences support for strict
  // mode, the set of reserved words, support for getters and
  // setters and other features.
  ecmaVersion: 5,
  // Source type ("script" or "module") for different semantics
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called
  // when a semicolon is automatically inserted. It will be passed
  // th position of the comma as an offset, and if `locations` is
  // enabled, it is given the location as a `{line, column}` object
  // as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // When enabled, hashbang directive in the beginning of file
  // is allowed and treated as a line comment.
  allowHashBang: false,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false,
  plugins: {}
};

exports.defaultOptions = defaultOptions;
// Interpret and default an options object

function getOptions(opts) {
  var options = {};
  for (var opt in defaultOptions) {
    options[opt] = opts && _util.has(opts, opt) ? opts[opt] : defaultOptions[opt];
  }if (options.allowReserved == null) options.allowReserved = options.ecmaVersion < 5;

  if (_util.isArray(options.onToken)) {
    (function () {
      var tokens = options.onToken;
      options.onToken = function (token) {
        return tokens.push(token);
      };
    })();
  }
  if (_util.isArray(options.onComment)) options.onComment = pushComment(options, options.onComment);

  return options;
}

function pushComment(options, array) {
  return function (block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? 'Block' : 'Line',
      value: text,
      start: start,
      end: end
    };
    if (options.locations) comment.loc = new _locutil.SourceLocation(this, startLoc, endLoc);
    if (options.ranges) comment.range = [start, end];
    array.push(comment);
  };
}

},{"./locutil":5,"./util":15}],9:[function(_dereq_,module,exports){
"use strict";

var _tokentype = _dereq_("./tokentype");

var _state = _dereq_("./state");

var _whitespace = _dereq_("./whitespace");

var pp = _state.Parser.prototype;

// ## Parser utilities

// Test whether a statement node is the string literal `"use strict"`.

pp.isUseStrict = function (stmt) {
  return this.options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && stmt.expression.raw.slice(1, -1) === "use strict";
};

// Predicate that tests whether the next token is of the given
// type, and if yes, consumes it as a side effect.

pp.eat = function (type) {
  if (this.type === type) {
    this.next();
    return true;
  } else {
    return false;
  }
};

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function (name) {
  return this.type === _tokentype.types.name && this.value === name;
};

// Consumes contextual keyword if possible.

pp.eatContextual = function (name) {
  return this.value === name && this.eat(_tokentype.types.name);
};

// Asserts that following token is given contextual keyword.

pp.expectContextual = function (name) {
  if (!this.eatContextual(name)) this.unexpected();
};

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function () {
  return this.type === _tokentype.types.eof || this.type === _tokentype.types.braceR || _whitespace.lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
};

pp.insertSemicolon = function () {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon) this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
    return true;
  }
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function () {
  if (!this.eat(_tokentype.types.semi) && !this.insertSemicolon()) this.unexpected();
};

pp.afterTrailingComma = function (tokType) {
  if (this.type == tokType) {
    if (this.options.onTrailingComma) this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
    this.next();
    return true;
  }
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp.expect = function (type) {
  this.eat(type) || this.unexpected();
};

// Raise an unexpected token error.

pp.unexpected = function (pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};

pp.checkPatternErrors = function (refDestructuringErrors, andThrow) {
  var pos = refDestructuringErrors && refDestructuringErrors.trailingComma;
  if (!andThrow) return !!pos;
  if (pos) this.raise(pos, "Trailing comma is not permitted in destructuring patterns");
};

pp.checkExpressionErrors = function (refDestructuringErrors, andThrow) {
  var pos = refDestructuringErrors && refDestructuringErrors.shorthandAssign;
  if (!andThrow) return !!pos;
  if (pos) this.raise(pos, "Shorthand property assignments are valid only in destructuring patterns");
};

},{"./state":10,"./tokentype":14,"./whitespace":16}],10:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _identifier = _dereq_("./identifier");

var _tokentype = _dereq_("./tokentype");

var _whitespace = _dereq_("./whitespace");

var _options = _dereq_("./options");

// Registered plugins
var plugins = {};

exports.plugins = plugins;
function keywordRegexp(words) {
  return new RegExp("^(" + words.replace(/ /g, "|") + ")$");
}

var Parser = (function () {
  function Parser(options, input, startPos) {
    _classCallCheck(this, Parser);

    this.options = options = _options.getOptions(options);
    this.sourceFile = options.sourceFile;
    this.keywords = keywordRegexp(_identifier.keywords[options.ecmaVersion >= 6 ? 6 : 5]);
    var reserved = options.allowReserved ? "" : _identifier.reservedWords[options.ecmaVersion] + (options.sourceType == "module" ? " await" : "");
    this.reservedWords = keywordRegexp(reserved);
    var reservedStrict = (reserved ? reserved + " " : "") + _identifier.reservedWords.strict;
    this.reservedWordsStrict = keywordRegexp(reservedStrict);
    this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + _identifier.reservedWords.strictBind);
    this.input = String(input);

    // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.
    this.containsEsc = false;

    // Load plugins
    this.loadPlugins(options.plugins);

    // Set up token state

    // The current position of the tokenizer in the input.
    if (startPos) {
      this.pos = startPos;
      this.lineStart = Math.max(0, this.input.lastIndexOf("\n", startPos));
      this.curLine = this.input.slice(0, this.lineStart).split(_whitespace.lineBreak).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    }

    // Properties of the current token:
    // Its type
    this.type = _tokentype.types.eof;
    // For tokens that include more information than their type, the value
    this.value = null;
    // Its start and end offset
    this.start = this.end = this.pos;
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = this.curPosition();

    // Position information for the previous token
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = this.initialContext();
    this.exprAllowed = true;

    // Figure out if it's a module code.
    this.strict = this.inModule = options.sourceType === "module";

    // Used to signify the start of a potential arrow function
    this.potentialArrowAt = -1;

    // Flags to track whether we are in a function, a generator.
    this.inFunction = this.inGenerator = false;
    // Labels in scope.
    this.labels = [];

    // If enabled, skip leading hashbang line.
    if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === '#!') this.skipLineComment(2);
  }

  // DEPRECATED Kept for backwards compatibility until 3.0 in case a plugin uses them

  Parser.prototype.isKeyword = function isKeyword(word) {
    return this.keywords.test(word);
  };

  Parser.prototype.isReservedWord = function isReservedWord(word) {
    return this.reservedWords.test(word);
  };

  Parser.prototype.extend = function extend(name, f) {
    this[name] = f(this[name]);
  };

  Parser.prototype.loadPlugins = function loadPlugins(pluginConfigs) {
    for (var _name in pluginConfigs) {
      var plugin = plugins[_name];
      if (!plugin) throw new Error("Plugin '" + _name + "' not found");
      plugin(this, pluginConfigs[_name]);
    }
  };

  Parser.prototype.parse = function parse() {
    var node = this.options.program || this.startNode();
    this.nextToken();
    return this.parseTopLevel(node);
  };

  return Parser;
})();

exports.Parser = Parser;

},{"./identifier":2,"./options":8,"./tokentype":14,"./whitespace":16}],11:[function(_dereq_,module,exports){
"use strict";

var _tokentype = _dereq_("./tokentype");

var _state = _dereq_("./state");

var _whitespace = _dereq_("./whitespace");

var pp = _state.Parser.prototype;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp.parseTopLevel = function (node) {
  var first = true;
  if (!node.body) node.body = [];
  while (this.type !== _tokentype.types.eof) {
    var stmt = this.parseStatement(true, true);
    node.body.push(stmt);
    if (first) {
      if (this.isUseStrict(stmt)) this.setStrict(true);
      first = false;
    }
  }
  this.next();
  if (this.options.ecmaVersion >= 6) {
    node.sourceType = this.options.sourceType;
  }
  return this.finishNode(node, "Program");
};

var loopLabel = { kind: "loop" },
    switchLabel = { kind: "switch" };

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp.parseStatement = function (declaration, topLevel) {
  var starttype = this.type,
      node = this.startNode();

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
    case _tokentype.types._break:case _tokentype.types._continue:
      return this.parseBreakContinueStatement(node, starttype.keyword);
    case _tokentype.types._debugger:
      return this.parseDebuggerStatement(node);
    case _tokentype.types._do:
      return this.parseDoStatement(node);
    case _tokentype.types._for:
      return this.parseForStatement(node);
    case _tokentype.types._function:
      if (!declaration && this.options.ecmaVersion >= 6) this.unexpected();
      return this.parseFunctionStatement(node);
    case _tokentype.types._class:
      if (!declaration) this.unexpected();
      return this.parseClass(node, true);
    case _tokentype.types._if:
      return this.parseIfStatement(node);
    case _tokentype.types._return:
      return this.parseReturnStatement(node);
    case _tokentype.types._switch:
      return this.parseSwitchStatement(node);
    case _tokentype.types._throw:
      return this.parseThrowStatement(node);
    case _tokentype.types._try:
      return this.parseTryStatement(node);
    case _tokentype.types._let:case _tokentype.types._const:
      if (!declaration) this.unexpected(); // NOTE: falls through to _var
    case _tokentype.types._var:
      return this.parseVarStatement(node, starttype);
    case _tokentype.types._while:
      return this.parseWhileStatement(node);
    case _tokentype.types._with:
      return this.parseWithStatement(node);
    case _tokentype.types.braceL:
      return this.parseBlock();
    case _tokentype.types.semi:
      return this.parseEmptyStatement(node);
    case _tokentype.types._export:
    case _tokentype.types._import:
      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel) this.raise(this.start, "'import' and 'export' may only appear at the top level");
        if (!this.inModule) this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
      }
      return starttype === _tokentype.types._import ? this.parseImport(node) : this.parseExport(node);

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    default:
      var maybeName = this.value,
          expr = this.parseExpression();
      if (starttype === _tokentype.types.name && expr.type === "Identifier" && this.eat(_tokentype.types.colon)) return this.parseLabeledStatement(node, maybeName, expr);else return this.parseExpressionStatement(node, expr);
  }
};

pp.parseBreakContinueStatement = function (node, keyword) {
  var isBreak = keyword == "break";
  this.next();
  if (this.eat(_tokentype.types.semi) || this.insertSemicolon()) node.label = null;else if (this.type !== _tokentype.types.name) this.unexpected();else {
    node.label = this.parseIdent();
    this.semicolon();
  }

  // Verify that there is an actual destination to break or
  // continue to.
  for (var i = 0; i < this.labels.length; ++i) {
    var lab = this.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
      if (node.label && isBreak) break;
    }
  }
  if (i === this.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
};

pp.parseDebuggerStatement = function (node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement");
};

pp.parseDoStatement = function (node) {
  this.next();
  this.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.labels.pop();
  this.expect(_tokentype.types._while);
  node.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6) this.eat(_tokentype.types.semi);else this.semicolon();
  return this.finishNode(node, "DoWhileStatement");
};

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp.parseForStatement = function (node) {
  this.next();
  this.labels.push(loopLabel);
  this.expect(_tokentype.types.parenL);
  if (this.type === _tokentype.types.semi) return this.parseFor(node, null);
  if (this.type === _tokentype.types._var || this.type === _tokentype.types._let || this.type === _tokentype.types._const) {
    var _init = this.startNode(),
        varKind = this.type;
    this.next();
    this.parseVar(_init, true, varKind);
    this.finishNode(_init, "VariableDeclaration");
    if ((this.type === _tokentype.types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && _init.declarations.length === 1 && !(varKind !== _tokentype.types._var && _init.declarations[0].init)) return this.parseForIn(node, _init);
    return this.parseFor(node, _init);
  }
  var refDestructuringErrors = { shorthandAssign: 0, trailingComma: 0 };
  var init = this.parseExpression(true, refDestructuringErrors);
  if (this.type === _tokentype.types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
    this.checkPatternErrors(refDestructuringErrors, true);
    this.toAssignable(init);
    this.checkLVal(init);
    return this.parseForIn(node, init);
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  return this.parseFor(node, init);
};

pp.parseFunctionStatement = function (node) {
  this.next();
  return this.parseFunction(node, true);
};

pp.parseIfStatement = function (node) {
  this.next();
  node.test = this.parseParenExpression();
  node.consequent = this.parseStatement(false);
  node.alternate = this.eat(_tokentype.types._else) ? this.parseStatement(false) : null;
  return this.finishNode(node, "IfStatement");
};

pp.parseReturnStatement = function (node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction) this.raise(this.start, "'return' outside of function");
  this.next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.eat(_tokentype.types.semi) || this.insertSemicolon()) node.argument = null;else {
    node.argument = this.parseExpression();this.semicolon();
  }
  return this.finishNode(node, "ReturnStatement");
};

pp.parseSwitchStatement = function (node) {
  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(_tokentype.types.braceL);
  this.labels.push(switchLabel);

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  for (var cur, sawDefault = false; this.type != _tokentype.types.braceR;) {
    if (this.type === _tokentype.types._case || this.type === _tokentype.types._default) {
      var isCase = this.type === _tokentype.types._case;
      if (cur) this.finishNode(cur, "SwitchCase");
      node.cases.push(cur = this.startNode());
      cur.consequent = [];
      this.next();
      if (isCase) {
        cur.test = this.parseExpression();
      } else {
        if (sawDefault) this.raise(this.lastTokStart, "Multiple default clauses");
        sawDefault = true;
        cur.test = null;
      }
      this.expect(_tokentype.types.colon);
    } else {
      if (!cur) this.unexpected();
      cur.consequent.push(this.parseStatement(true));
    }
  }
  if (cur) this.finishNode(cur, "SwitchCase");
  this.next(); // Closing brace
  this.labels.pop();
  return this.finishNode(node, "SwitchStatement");
};

pp.parseThrowStatement = function (node) {
  this.next();
  if (_whitespace.lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) this.raise(this.lastTokEnd, "Illegal newline after throw");
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement");
};

// Reused empty array added for node fields that are always empty.

var empty = [];

pp.parseTryStatement = function (node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.type === _tokentype.types._catch) {
    var clause = this.startNode();
    this.next();
    this.expect(_tokentype.types.parenL);
    clause.param = this.parseBindingAtom();
    this.checkLVal(clause.param, true);
    this.expect(_tokentype.types.parenR);
    clause.body = this.parseBlock();
    node.handler = this.finishNode(clause, "CatchClause");
  }
  node.finalizer = this.eat(_tokentype.types._finally) ? this.parseBlock() : null;
  if (!node.handler && !node.finalizer) this.raise(node.start, "Missing catch or finally clause");
  return this.finishNode(node, "TryStatement");
};

pp.parseVarStatement = function (node, kind) {
  this.next();
  this.parseVar(node, false, kind);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration");
};

pp.parseWhileStatement = function (node) {
  this.next();
  node.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, "WhileStatement");
};

pp.parseWithStatement = function (node) {
  if (this.strict) this.raise(this.start, "'with' in strict mode");
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement(false);
  return this.finishNode(node, "WithStatement");
};

pp.parseEmptyStatement = function (node) {
  this.next();
  return this.finishNode(node, "EmptyStatement");
};

pp.parseLabeledStatement = function (node, maybeName, expr) {
  for (var i = 0; i < this.labels.length; ++i) {
    if (this.labels[i].name === maybeName) this.raise(expr.start, "Label '" + maybeName + "' is already declared");
  }var kind = this.type.isLoop ? "loop" : this.type === _tokentype.types._switch ? "switch" : null;
  for (var i = this.labels.length - 1; i >= 0; i--) {
    var label = this.labels[i];
    if (label.statementStart == node.start) {
      label.statementStart = this.start;
      label.kind = kind;
    } else break;
  }
  this.labels.push({ name: maybeName, kind: kind, statementStart: this.start });
  node.body = this.parseStatement(true);
  this.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement");
};

pp.parseExpressionStatement = function (node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement");
};

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp.parseBlock = function (allowStrict) {
  var node = this.startNode(),
      first = true,
      oldStrict = undefined;
  node.body = [];
  this.expect(_tokentype.types.braceL);
  while (!this.eat(_tokentype.types.braceR)) {
    var stmt = this.parseStatement(true);
    node.body.push(stmt);
    if (first && allowStrict && this.isUseStrict(stmt)) {
      oldStrict = this.strict;
      this.setStrict(this.strict = true);
    }
    first = false;
  }
  if (oldStrict === false) this.setStrict(false);
  return this.finishNode(node, "BlockStatement");
};

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp.parseFor = function (node, init) {
  node.init = init;
  this.expect(_tokentype.types.semi);
  node.test = this.type === _tokentype.types.semi ? null : this.parseExpression();
  this.expect(_tokentype.types.semi);
  node.update = this.type === _tokentype.types.parenR ? null : this.parseExpression();
  this.expect(_tokentype.types.parenR);
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, "ForStatement");
};

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp.parseForIn = function (node, init) {
  var type = this.type === _tokentype.types._in ? "ForInStatement" : "ForOfStatement";
  this.next();
  node.left = init;
  node.right = this.parseExpression();
  this.expect(_tokentype.types.parenR);
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, type);
};

// Parse a list of variable declarations.

pp.parseVar = function (node, isFor, kind) {
  node.declarations = [];
  node.kind = kind.keyword;
  for (;;) {
    var decl = this.startNode();
    this.parseVarId(decl);
    if (this.eat(_tokentype.types.eq)) {
      decl.init = this.parseMaybeAssign(isFor);
    } else if (kind === _tokentype.types._const && !(this.type === _tokentype.types._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      this.unexpected();
    } else if (decl.id.type != "Identifier" && !(isFor && (this.type === _tokentype.types._in || this.isContextual("of")))) {
      this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(_tokentype.types.comma)) break;
  }
  return node;
};

pp.parseVarId = function (decl) {
  decl.id = this.parseBindingAtom();
  this.checkLVal(decl.id, true);
};

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

pp.parseFunction = function (node, isStatement, allowExpressionBody) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) node.generator = this.eat(_tokentype.types.star);
  if (isStatement || this.type === _tokentype.types.name) node.id = this.parseIdent();
  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody);
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
};

pp.parseFunctionParams = function (node) {
  this.expect(_tokentype.types.parenL);
  node.params = this.parseBindingList(_tokentype.types.parenR, false, false, true);
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp.parseClass = function (node, isStatement) {
  this.next();
  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(_tokentype.types.braceL);
  while (!this.eat(_tokentype.types.braceR)) {
    if (this.eat(_tokentype.types.semi)) continue;
    var method = this.startNode();
    var isGenerator = this.eat(_tokentype.types.star);
    var isMaybeStatic = this.type === _tokentype.types.name && this.value === "static";
    this.parsePropertyName(method);
    method["static"] = isMaybeStatic && this.type !== _tokentype.types.parenL;
    if (method["static"]) {
      if (isGenerator) this.unexpected();
      isGenerator = this.eat(_tokentype.types.star);
      this.parsePropertyName(method);
    }
    method.kind = "method";
    var isGetSet = false;
    if (!method.computed) {
      var key = method.key;

      if (!isGenerator && key.type === "Identifier" && this.type !== _tokentype.types.parenL && (key.name === "get" || key.name === "set")) {
        isGetSet = true;
        method.kind = key.name;
        key = this.parsePropertyName(method);
      }
      if (!method["static"] && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
        if (hadConstructor) this.raise(key.start, "Duplicate constructor in the same class");
        if (isGetSet) this.raise(key.start, "Constructor can't have get/set modifier");
        if (isGenerator) this.raise(key.start, "Constructor can't be a generator");
        method.kind = "constructor";
        hadConstructor = true;
      }
    }
    this.parseClassMethod(classBody, method, isGenerator);
    if (isGetSet) {
      var paramCount = method.kind === "get" ? 0 : 1;
      if (method.value.params.length !== paramCount) {
        var start = method.value.start;
        if (method.kind === "get") this.raise(start, "getter should have no params");else this.raise(start, "setter should have exactly one param");
      }
    }
  }
  node.body = this.finishNode(classBody, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
};

pp.parseClassMethod = function (classBody, method, isGenerator) {
  method.value = this.parseMethod(isGenerator);
  classBody.body.push(this.finishNode(method, "MethodDefinition"));
};

pp.parseClassId = function (node, isStatement) {
  node.id = this.type === _tokentype.types.name ? this.parseIdent() : isStatement ? this.unexpected() : null;
};

pp.parseClassSuper = function (node) {
  node.superClass = this.eat(_tokentype.types._extends) ? this.parseExprSubscripts() : null;
};

// Parses module export declaration.

pp.parseExport = function (node) {
  this.next();
  // export * from '...'
  if (this.eat(_tokentype.types.star)) {
    this.expectContextual("from");
    node.source = this.type === _tokentype.types.string ? this.parseExprAtom() : this.unexpected();
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration");
  }
  if (this.eat(_tokentype.types._default)) {
    // export default ...
    var expr = this.parseMaybeAssign();
    var needsSemi = true;
    if (expr.type == "FunctionExpression" || expr.type == "ClassExpression") {
      needsSemi = false;
      if (expr.id) {
        expr.type = expr.type == "FunctionExpression" ? "FunctionDeclaration" : "ClassDeclaration";
      }
    }
    node.declaration = expr;
    if (needsSemi) this.semicolon();
    return this.finishNode(node, "ExportDefaultDeclaration");
  }
  // export var|const|let|function|class ...
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseStatement(true);
    node.specifiers = [];
    node.source = null;
  } else {
    // export { x, y as z } [from '...']
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers();
    if (this.eatContextual("from")) {
      node.source = this.type === _tokentype.types.string ? this.parseExprAtom() : this.unexpected();
    } else {
      // check for keywords used as local names
      for (var i = 0; i < node.specifiers.length; i++) {
        if (this.keywords.test(node.specifiers[i].local.name) || this.reservedWords.test(node.specifiers[i].local.name)) {
          this.unexpected(node.specifiers[i].local.start);
        }
      }

      node.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration");
};

pp.shouldParseExportStatement = function () {
  return this.type.keyword;
};

// Parses a comma-separated list of module exports.

pp.parseExportSpecifiers = function () {
  var nodes = [],
      first = true;
  // export { x, y as z } [from '...']
  this.expect(_tokentype.types.braceL);
  while (!this.eat(_tokentype.types.braceR)) {
    if (!first) {
      this.expect(_tokentype.types.comma);
      if (this.afterTrailingComma(_tokentype.types.braceR)) break;
    } else first = false;

    var node = this.startNode();
    node.local = this.parseIdent(this.type === _tokentype.types._default);
    node.exported = this.eatContextual("as") ? this.parseIdent(true) : node.local;
    nodes.push(this.finishNode(node, "ExportSpecifier"));
  }
  return nodes;
};

// Parses import declaration.

pp.parseImport = function (node) {
  this.next();
  // import '...'
  if (this.type === _tokentype.types.string) {
    node.specifiers = empty;
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === _tokentype.types.string ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};

// Parses a comma-separated list of module imports.

pp.parseImportSpecifiers = function () {
  var nodes = [],
      first = true;
  if (this.type === _tokentype.types.name) {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLVal(node.local, true);
    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
    if (!this.eat(_tokentype.types.comma)) return nodes;
  }
  if (this.type === _tokentype.types.star) {
    var node = this.startNode();
    this.next();
    this.expectContextual("as");
    node.local = this.parseIdent();
    this.checkLVal(node.local, true);
    nodes.push(this.finishNode(node, "ImportNamespaceSpecifier"));
    return nodes;
  }
  this.expect(_tokentype.types.braceL);
  while (!this.eat(_tokentype.types.braceR)) {
    if (!first) {
      this.expect(_tokentype.types.comma);
      if (this.afterTrailingComma(_tokentype.types.braceR)) break;
    } else first = false;

    var node = this.startNode();
    node.imported = this.parseIdent(true);
    node.local = this.eatContextual("as") ? this.parseIdent() : node.imported;
    this.checkLVal(node.local, true);
    nodes.push(this.finishNode(node, "ImportSpecifier"));
  }
  return nodes;
};

},{"./state":10,"./tokentype":14,"./whitespace":16}],12:[function(_dereq_,module,exports){
// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design

"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _state = _dereq_("./state");

var _tokentype = _dereq_("./tokentype");

var _whitespace = _dereq_("./whitespace");

var TokContext = function TokContext(token, isExpr, preserveSpace, override) {
  _classCallCheck(this, TokContext);

  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
};

exports.TokContext = TokContext;
var types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", true),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function (p) {
    return p.readTmplToken();
  }),
  f_expr: new TokContext("function", true)
};

exports.types = types;
var pp = _state.Parser.prototype;

pp.initialContext = function () {
  return [types.b_stat];
};

pp.braceIsBlock = function (prevType) {
  if (prevType === _tokentype.types.colon) {
    var _parent = this.curContext();
    if (_parent === types.b_stat || _parent === types.b_expr) return !_parent.isExpr;
  }
  if (prevType === _tokentype.types._return) return _whitespace.lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  if (prevType === _tokentype.types._else || prevType === _tokentype.types.semi || prevType === _tokentype.types.eof || prevType === _tokentype.types.parenR) return true;
  if (prevType == _tokentype.types.braceL) return this.curContext() === types.b_stat;
  return !this.exprAllowed;
};

pp.updateContext = function (prevType) {
  var update = undefined,
      type = this.type;
  if (type.keyword && prevType == _tokentype.types.dot) this.exprAllowed = false;else if (update = type.updateContext) update.call(this, prevType);else this.exprAllowed = type.beforeExpr;
};

// Token-specific context update code

_tokentype.types.parenR.updateContext = _tokentype.types.braceR.updateContext = function () {
  if (this.context.length == 1) {
    this.exprAllowed = true;
    return;
  }
  var out = this.context.pop();
  if (out === types.b_stat && this.curContext() === types.f_expr) {
    this.context.pop();
    this.exprAllowed = false;
  } else if (out === types.b_tmpl) {
    this.exprAllowed = true;
  } else {
    this.exprAllowed = !out.isExpr;
  }
};

_tokentype.types.braceL.updateContext = function (prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
  this.exprAllowed = true;
};

_tokentype.types.dollarBraceL.updateContext = function () {
  this.context.push(types.b_tmpl);
  this.exprAllowed = true;
};

_tokentype.types.parenL.updateContext = function (prevType) {
  var statementParens = prevType === _tokentype.types._if || prevType === _tokentype.types._for || prevType === _tokentype.types._with || prevType === _tokentype.types._while;
  this.context.push(statementParens ? types.p_stat : types.p_expr);
  this.exprAllowed = true;
};

_tokentype.types.incDec.updateContext = function () {
  // tokExprAllowed stays unchanged
};

_tokentype.types._function.updateContext = function () {
  if (this.curContext() !== types.b_stat) this.context.push(types.f_expr);
  this.exprAllowed = false;
};

_tokentype.types.backQuote.updateContext = function () {
  if (this.curContext() === types.q_tmpl) this.context.pop();else this.context.push(types.q_tmpl);
  this.exprAllowed = false;
};

},{"./state":10,"./tokentype":14,"./whitespace":16}],13:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _identifier = _dereq_("./identifier");

var _tokentype = _dereq_("./tokentype");

var _state = _dereq_("./state");

var _locutil = _dereq_("./locutil");

var _whitespace = _dereq_("./whitespace");

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(p) {
  _classCallCheck(this, Token);

  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations) this.loc = new _locutil.SourceLocation(p, p.startLoc, p.endLoc);
  if (p.options.ranges) this.range = [p.start, p.end];
}

// ## Tokenizer

;

exports.Token = Token;
var pp = _state.Parser.prototype;

// Are we running under Rhino?
var isRhino = typeof Packages == "object" && Object.prototype.toString.call(Packages) == "[object JavaPackage]";

// Move to the next token

pp.next = function () {
  if (this.options.onToken) this.options.onToken(new Token(this));

  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};

pp.getToken = function () {
  this.next();
  return new Token(this);
};

// If we're in an ES6 environment, make parsers iterable
if (typeof Symbol !== "undefined") pp[Symbol.iterator] = function () {
  var self = this;
  return { next: function next() {
      var token = self.getToken();
      return {
        done: token.type === _tokentype.types.eof,
        value: token
      };
    } };
};

// Toggle strict mode. Re-reads the next number or string to please
// pedantic tests (`"use strict"; 010;` should fail).

pp.setStrict = function (strict) {
  this.strict = strict;
  if (this.type !== _tokentype.types.num && this.type !== _tokentype.types.string) return;
  this.pos = this.start;
  if (this.options.locations) {
    while (this.pos < this.lineStart) {
      this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1;
      --this.curLine;
    }
  }
  this.nextToken();
};

pp.curContext = function () {
  return this.context[this.context.length - 1];
};

// Read a single token, updating the parser object's token-related
// properties.

pp.nextToken = function () {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) this.skipSpace();

  this.start = this.pos;
  if (this.options.locations) this.startLoc = this.curPosition();
  if (this.pos >= this.input.length) return this.finishToken(_tokentype.types.eof);

  if (curContext.override) return curContext.override(this);else this.readToken(this.fullCharCodeAtPos());
};

pp.readToken = function (code) {
  // Identifier or keyword. '\uXXXX' sequences are allowed in
  // identifiers, so '\' also dispatches to that.
  if (_identifier.isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */) return this.readWord();

  return this.getTokenFromCode(code);
};

pp.fullCharCodeAtPos = function () {
  var code = this.input.charCodeAt(this.pos);
  if (code <= 0xd7ff || code >= 0xe000) return code;
  var next = this.input.charCodeAt(this.pos + 1);
  return (code << 10) + next - 0x35fdc00;
};

pp.skipBlockComment = function () {
  var startLoc = this.options.onComment && this.curPosition();
  var start = this.pos,
      end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) this.raise(this.pos - 2, "Unterminated comment");
  this.pos = end + 2;
  if (this.options.locations) {
    _whitespace.lineBreakG.lastIndex = start;
    var match = undefined;
    while ((match = _whitespace.lineBreakG.exec(this.input)) && match.index < this.pos) {
      ++this.curLine;
      this.lineStart = match.index + match[0].length;
    }
  }
  if (this.options.onComment) this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
};

pp.skipLineComment = function (startSkip) {
  var start = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
    ++this.pos;
    ch = this.input.charCodeAt(this.pos);
  }
  if (this.options.onComment) this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
};

// Called at the start of the parse and after every token. Skips
// whitespace and comments, and.

pp.skipSpace = function () {
  loop: while (this.pos < this.input.length) {
    var ch = this.input.charCodeAt(this.pos);
    switch (ch) {
      case 32:case 160:
        // ' '
        ++this.pos;
        break;
      case 13:
        if (this.input.charCodeAt(this.pos + 1) === 10) {
          ++this.pos;
        }
      case 10:case 8232:case 8233:
        ++this.pos;
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        break;
      case 47:
        // '/'
        switch (this.input.charCodeAt(this.pos + 1)) {
          case 42:
            // '*'
            this.skipBlockComment();
            break;
          case 47:
            this.skipLineComment(2);
            break;
          default:
            break loop;
        }
        break;
      default:
        if (ch > 8 && ch < 14 || ch >= 5760 && _whitespace.nonASCIIwhitespace.test(String.fromCharCode(ch))) {
          ++this.pos;
        } else {
          break loop;
        }
    }
  }
};

// Called at the end of every token. Sets `end`, `val`, and
// maintains `context` and `exprAllowed`, and skips the space after
// the token, so that the next one's `start` will point at the
// right position.

pp.finishToken = function (type, val) {
  this.end = this.pos;
  if (this.options.locations) this.endLoc = this.curPosition();
  var prevType = this.type;
  this.type = type;
  this.value = val;

  this.updateContext(prevType);
};

// ### Token reading

// This is the function that is called to fetch the next token. It
// is somewhat obscure, because it works in character codes rather
// than characters, and because operator parsing has been inlined
// into it.
//
// All in the name of speed.
//
pp.readToken_dot = function () {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) return this.readNumber(true);
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
    // 46 = dot '.'
    this.pos += 3;
    return this.finishToken(_tokentype.types.ellipsis);
  } else {
    ++this.pos;
    return this.finishToken(_tokentype.types.dot);
  }
};

pp.readToken_slash = function () {
  // '/'
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) {
    ++this.pos;return this.readRegexp();
  }
  if (next === 61) return this.finishOp(_tokentype.types.assign, 2);
  return this.finishOp(_tokentype.types.slash, 1);
};

pp.readToken_mult_modulo = function (code) {
  // '%*'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) return this.finishOp(_tokentype.types.assign, 2);
  return this.finishOp(code === 42 ? _tokentype.types.star : _tokentype.types.modulo, 1);
};

pp.readToken_pipe_amp = function (code) {
  // '|&'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) return this.finishOp(code === 124 ? _tokentype.types.logicalOR : _tokentype.types.logicalAND, 2);
  if (next === 61) return this.finishOp(_tokentype.types.assign, 2);
  return this.finishOp(code === 124 ? _tokentype.types.bitwiseOR : _tokentype.types.bitwiseAND, 1);
};

pp.readToken_caret = function () {
  // '^'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) return this.finishOp(_tokentype.types.assign, 2);
  return this.finishOp(_tokentype.types.bitwiseXOR, 1);
};

pp.readToken_plus_min = function (code) {
  // '+-'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (next == 45 && this.input.charCodeAt(this.pos + 2) == 62 && _whitespace.lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) {
      // A `-->` line comment
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken();
    }
    return this.finishOp(_tokentype.types.incDec, 2);
  }
  if (next === 61) return this.finishOp(_tokentype.types.assign, 2);
  return this.finishOp(_tokentype.types.plusMin, 1);
};

pp.readToken_lt_gt = function (code) {
  // '<>'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) return this.finishOp(_tokentype.types.assign, size + 1);
    return this.finishOp(_tokentype.types.bitShift, size);
  }
  if (next == 33 && code == 60 && this.input.charCodeAt(this.pos + 2) == 45 && this.input.charCodeAt(this.pos + 3) == 45) {
    if (this.inModule) this.unexpected();
    // `<!--`, an XML-style comment that should be interpreted as a line comment
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken();
  }
  if (next === 61) size = this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2;
  return this.finishOp(_tokentype.types.relational, size);
};

pp.readToken_eq_excl = function (code) {
  // '=!'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) return this.finishOp(_tokentype.types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
    // '=>'
    this.pos += 2;
    return this.finishToken(_tokentype.types.arrow);
  }
  return this.finishOp(code === 61 ? _tokentype.types.eq : _tokentype.types.prefix, 1);
};

pp.getTokenFromCode = function (code) {
  switch (code) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46:
      // '.'
      return this.readToken_dot();

    // Punctuation tokens.
    case 40:
      ++this.pos;return this.finishToken(_tokentype.types.parenL);
    case 41:
      ++this.pos;return this.finishToken(_tokentype.types.parenR);
    case 59:
      ++this.pos;return this.finishToken(_tokentype.types.semi);
    case 44:
      ++this.pos;return this.finishToken(_tokentype.types.comma);
    case 91:
      ++this.pos;return this.finishToken(_tokentype.types.bracketL);
    case 93:
      ++this.pos;return this.finishToken(_tokentype.types.bracketR);
    case 123:
      ++this.pos;return this.finishToken(_tokentype.types.braceL);
    case 125:
      ++this.pos;return this.finishToken(_tokentype.types.braceR);
    case 58:
      ++this.pos;return this.finishToken(_tokentype.types.colon);
    case 63:
      ++this.pos;return this.finishToken(_tokentype.types.question);

    case 96:
      // '`'
      if (this.options.ecmaVersion < 6) break;
      ++this.pos;
      return this.finishToken(_tokentype.types.backQuote);

    case 48:
      // '0'
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) return this.readRadixNumber(16); // '0x', '0X' - hex number
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) return this.readRadixNumber(8); // '0o', '0O' - octal number
        if (next === 98 || next === 66) return this.readRadixNumber(2); // '0b', '0B' - binary number
      }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
      // 1-9
      return this.readNumber(false);

    // Quotes produce strings.
    case 34:case 39:
      // '"', "'"
      return this.readString(code);

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

    case 47:
      // '/'
      return this.readToken_slash();

    case 37:case 42:
      // '%*'
      return this.readToken_mult_modulo(code);

    case 124:case 38:
      // '|&'
      return this.readToken_pipe_amp(code);

    case 94:
      // '^'
      return this.readToken_caret();

    case 43:case 45:
      // '+-'
      return this.readToken_plus_min(code);

    case 60:case 62:
      // '<>'
      return this.readToken_lt_gt(code);

    case 61:case 33:
      // '=!'
      return this.readToken_eq_excl(code);

    case 126:
      // '~'
      return this.finishOp(_tokentype.types.prefix, 1);
  }

  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};

pp.finishOp = function (type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str);
};

// Parse a regular expression. Some context-awareness is necessary,
// since a '/' inside a '[]' set does not end the expression.

function tryCreateRegexp(src, flags, throwErrorAt, parser) {
  try {
    return new RegExp(src, flags);
  } catch (e) {
    if (throwErrorAt !== undefined) {
      if (e instanceof SyntaxError) parser.raise(throwErrorAt, "Error parsing regular expression: " + e.message);
      throw e;
    }
  }
}

var regexpUnicodeSupport = !!tryCreateRegexp("￿", "u");

pp.readRegexp = function () {
  var _this = this;

  var escaped = undefined,
      inClass = undefined,
      start = this.pos;
  for (;;) {
    if (this.pos >= this.input.length) this.raise(start, "Unterminated regular expression");
    var ch = this.input.charAt(this.pos);
    if (_whitespace.lineBreak.test(ch)) this.raise(start, "Unterminated regular expression");
    if (!escaped) {
      if (ch === "[") inClass = true;else if (ch === "]" && inClass) inClass = false;else if (ch === "/" && !inClass) break;
      escaped = ch === "\\";
    } else escaped = false;
    ++this.pos;
  }
  var content = this.input.slice(start, this.pos);
  ++this.pos;
  // Need to use `readWord1` because '\uXXXX' sequences are allowed
  // here (don't ask).
  var mods = this.readWord1();
  var tmp = content;
  if (mods) {
    var validFlags = /^[gmsiy]*$/;
    if (this.options.ecmaVersion >= 6) validFlags = /^[gmsiyu]*$/;
    if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
    if (mods.indexOf('u') >= 0 && !regexpUnicodeSupport) {
      // Replace each astral symbol and every Unicode escape sequence that
      // possibly represents an astral symbol or a paired surrogate with a
      // single ASCII symbol to avoid throwing on regular expressions that
      // are only valid in combination with the `/u` flag.
      // Note: replacing with the ASCII symbol `x` might cause false
      // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
      // perfectly valid pattern that is equivalent to `[a-b]`, but it would
      // be replaced by `[x-b]` which throws an error.
      tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, function (_match, code, offset) {
        code = Number("0x" + code);
        if (code > 0x10FFFF) _this.raise(start + offset + 3, "Code point out of bounds");
        return "x";
      });
      tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
    }
  }
  // Detect invalid regular expressions.
  var value = null;
  // Rhino's regular expression parser is flaky and throws uncatchable exceptions,
  // so don't do detection if we are running under Rhino
  if (!isRhino) {
    tryCreateRegexp(tmp, undefined, start, this);
    // Get a regular expression object for this pattern-flag pair, or `null` in
    // case the current environment doesn't support the flags it uses.
    value = tryCreateRegexp(content, mods);
  }
  return this.finishToken(_tokentype.types.regexp, { pattern: content, flags: mods, value: value });
};

// Read an integer in the given radix. Return null if zero digits
// were read, the integer value otherwise. When `len` is given, this
// will return `null` unless the integer has exactly `len` digits.

pp.readInt = function (radix, len) {
  var start = this.pos,
      total = 0;
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    var code = this.input.charCodeAt(this.pos),
        val = undefined;
    if (code >= 97) val = code - 97 + 10; // a
    else if (code >= 65) val = code - 65 + 10; // A
      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
        else val = Infinity;
    if (val >= radix) break;
    ++this.pos;
    total = total * radix + val;
  }
  if (this.pos === start || len != null && this.pos - start !== len) return null;

  return total;
};

pp.readRadixNumber = function (radix) {
  this.pos += 2; // 0x
  var val = this.readInt(radix);
  if (val == null) this.raise(this.start + 2, "Expected number in radix " + radix);
  if (_identifier.isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");
  return this.finishToken(_tokentype.types.num, val);
};

// Read an integer, octal integer, or floating-point number.

pp.readNumber = function (startsWithDot) {
  var start = this.pos,
      isFloat = false,
      octal = this.input.charCodeAt(this.pos) === 48;
  if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
  var next = this.input.charCodeAt(this.pos);
  if (next === 46) {
    // '.'
    ++this.pos;
    this.readInt(10);
    isFloat = true;
    next = this.input.charCodeAt(this.pos);
  }
  if (next === 69 || next === 101) {
    // 'eE'
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) ++this.pos; // '+-'
    if (this.readInt(10) === null) this.raise(start, "Invalid number");
    isFloat = true;
  }
  if (_identifier.isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");

  var str = this.input.slice(start, this.pos),
      val = undefined;
  if (isFloat) val = parseFloat(str);else if (!octal || str.length === 1) val = parseInt(str, 10);else if (/[89]/.test(str) || this.strict) this.raise(start, "Invalid number");else val = parseInt(str, 8);
  return this.finishToken(_tokentype.types.num, val);
};

// Read a string value, interpreting backslash-escapes.

pp.readCodePoint = function () {
  var ch = this.input.charCodeAt(this.pos),
      code = undefined;

  if (ch === 123) {
    if (this.options.ecmaVersion < 6) this.unexpected();
    var codePos = ++this.pos;
    code = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos);
    ++this.pos;
    if (code > 0x10FFFF) this.raise(codePos, "Code point out of bounds");
  } else {
    code = this.readHexChar(4);
  }
  return code;
};

function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code);
  code -= 0x10000;
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00);
}

pp.readString = function (quote) {
  var out = "",
      chunkStart = ++this.pos;
  for (;;) {
    if (this.pos >= this.input.length) this.raise(this.start, "Unterminated string constant");
    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) break;
    if (ch === 92) {
      // '\'
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(false);
      chunkStart = this.pos;
    } else {
      if (_whitespace.isNewLine(ch)) this.raise(this.start, "Unterminated string constant");
      ++this.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(_tokentype.types.string, out);
};

// Reads template string tokens.

pp.readTmplToken = function () {
  var out = "",
      chunkStart = this.pos;
  for (;;) {
    if (this.pos >= this.input.length) this.raise(this.start, "Unterminated template");
    var ch = this.input.charCodeAt(this.pos);
    if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
      // '`', '${'
      if (this.pos === this.start && this.type === _tokentype.types.template) {
        if (ch === 36) {
          this.pos += 2;
          return this.finishToken(_tokentype.types.dollarBraceL);
        } else {
          ++this.pos;
          return this.finishToken(_tokentype.types.backQuote);
        }
      }
      out += this.input.slice(chunkStart, this.pos);
      return this.finishToken(_tokentype.types.template, out);
    }
    if (ch === 92) {
      // '\'
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(true);
      chunkStart = this.pos;
    } else if (_whitespace.isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.pos);
      ++this.pos;
      switch (ch) {
        case 13:
          if (this.input.charCodeAt(this.pos) === 10) ++this.pos;
        case 10:
          out += "\n";
          break;
        default:
          out += String.fromCharCode(ch);
          break;
      }
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      chunkStart = this.pos;
    } else {
      ++this.pos;
    }
  }
};

// Used to read escaped characters

pp.readEscapedChar = function (inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
    case 110:
      return "\n"; // 'n' -> '\n'
    case 114:
      return "\r"; // 'r' -> '\r'
    case 120:
      return String.fromCharCode(this.readHexChar(2)); // 'x'
    case 117:
      return codePointToString(this.readCodePoint()); // 'u'
    case 116:
      return "\t"; // 't' -> '\t'
    case 98:
      return "\b"; // 'b' -> '\b'
    case 118:
      return "\u000b"; // 'v' -> '\u000b'
    case 102:
      return "\f"; // 'f' -> '\f'
    case 13:
      if (this.input.charCodeAt(this.pos) === 10) ++this.pos; // '\r\n'
    case 10:
      // ' \n'
      if (this.options.locations) {
        this.lineStart = this.pos;++this.curLine;
      }
      return "";
    default:
      if (ch >= 48 && ch <= 55) {
        var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
        var octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        if (octal > 0 && (this.strict || inTemplate)) {
          this.raise(this.pos - 2, "Octal literal in strict mode");
        }
        this.pos += octalStr.length - 1;
        return String.fromCharCode(octal);
      }
      return String.fromCharCode(ch);
  }
};

// Used to read character escape sequences ('\x', '\u', '\U').

pp.readHexChar = function (len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) this.raise(codePos, "Bad character escape sequence");
  return n;
};

// Read an identifier, and return it as a string. Sets `this.containsEsc`
// to whether the word contained a '\u' escape.
//
// Incrementally adds only escaped chars, adding other chunks as-is
// as a micro-optimization.

pp.readWord1 = function () {
  this.containsEsc = false;
  var word = "",
      first = true,
      chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this.fullCharCodeAtPos();
    if (_identifier.isIdentifierChar(ch, astral)) {
      this.pos += ch <= 0xffff ? 1 : 2;
    } else if (ch === 92) {
      // "\"
      this.containsEsc = true;
      word += this.input.slice(chunkStart, this.pos);
      var escStart = this.pos;
      if (this.input.charCodeAt(++this.pos) != 117) // "u"
        this.raise(this.pos, "Expecting Unicode escape sequence \\uXXXX");
      ++this.pos;
      var esc = this.readCodePoint();
      if (!(first ? _identifier.isIdentifierStart : _identifier.isIdentifierChar)(esc, astral)) this.raise(escStart, "Invalid Unicode escape");
      word += codePointToString(esc);
      chunkStart = this.pos;
    } else {
      break;
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos);
};

// Read an identifier or keyword token. Will check for reserved
// words when necessary.

pp.readWord = function () {
  var word = this.readWord1();
  var type = _tokentype.types.name;
  if ((this.options.ecmaVersion >= 6 || !this.containsEsc) && this.keywords.test(word)) type = _tokentype.keywords[word];
  return this.finishToken(type, word);
};

},{"./identifier":2,"./locutil":5,"./state":10,"./tokentype":14,"./whitespace":16}],14:[function(_dereq_,module,exports){
// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// The `startsExpr` property is used to check if the token ends a
// `yield` expression. It is set on all token types that either can
// directly start an expression (like a quotation mark) or can
// continue an expression (like the body of a string).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenType = function TokenType(label) {
  var conf = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  _classCallCheck(this, TokenType);

  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};

exports.TokenType = TokenType;

function binop(name, prec) {
  return new TokenType(name, { beforeExpr: true, binop: prec });
}
var beforeExpr = { beforeExpr: true },
    startsExpr = { startsExpr: true };

var types = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
  assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
  incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
  prefix: new TokenType("prefix", { beforeExpr: true, prefix: true, startsExpr: true }),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=", 6),
  relational: binop("</>", 7),
  bitShift: binop("<</>>", 8),
  plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10)
};

exports.types = types;
// Map keyword names to token types.

var keywords = {};

exports.keywords = keywords;
// Succinct definitions of keyword token types
function kw(name) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  options.keyword = name;
  keywords[name] = types["_" + name] = new TokenType(name, options);
}

kw("break");
kw("case", beforeExpr);
kw("catch");
kw("continue");
kw("debugger");
kw("default", beforeExpr);
kw("do", { isLoop: true, beforeExpr: true });
kw("else", beforeExpr);
kw("finally");
kw("for", { isLoop: true });
kw("function", startsExpr);
kw("if");
kw("return", beforeExpr);
kw("switch");
kw("throw", beforeExpr);
kw("try");
kw("var");
kw("let");
kw("const");
kw("while", { isLoop: true });
kw("with");
kw("new", { beforeExpr: true, startsExpr: true });
kw("this", startsExpr);
kw("super", startsExpr);
kw("class");
kw("extends", beforeExpr);
kw("export");
kw("import");
kw("yield", { beforeExpr: true, startsExpr: true });
kw("null", startsExpr);
kw("true", startsExpr);
kw("false", startsExpr);
kw("in", { beforeExpr: true, binop: 7 });
kw("instanceof", { beforeExpr: true, binop: 7 });
kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true });
kw("void", { beforeExpr: true, prefix: true, startsExpr: true });
kw("delete", { beforeExpr: true, prefix: true, startsExpr: true });

},{}],15:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;
exports.isArray = isArray;
exports.has = has;

function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

// Checks if an object has a property.

function has(obj, propName) {
  return Object.prototype.hasOwnProperty.call(obj, propName);
}

},{}],16:[function(_dereq_,module,exports){
// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

"use strict";

exports.__esModule = true;
exports.isNewLine = isNewLine;
var lineBreak = /\r\n?|\n|\u2028|\u2029/;
exports.lineBreak = lineBreak;
var lineBreakG = new RegExp(lineBreak.source, "g");

exports.lineBreakG = lineBreakG;

function isNewLine(code) {
  return code === 10 || code === 13 || code === 0x2028 || code == 0x2029;
}

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
exports.nonASCIIwhitespace = nonASCIIwhitespace;

},{}]},{},[3])(3)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.acorn || (g.acorn = {})).walk = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// AST walker module for Mozilla Parser API compatible trees

// A simple walk is one where you simply specify callbacks to be
// called on specific nodes. The last two arguments are optional. A
// simple use would be
//
//     walk.simple(myTree, {
//         Expression: function(node) { ... }
//     });
//
// to do something with all expressions. All Parser API node types
// can be used to identify node types, as well as Expression,
// Statement, and ScopeBody, which denote categories of nodes.
//
// The base argument can be used to pass a custom (recursive)
// walker, and state can be used to give this walked an initial
// state.

"use strict";

exports.__esModule = true;
exports.simple = simple;
exports.ancestor = ancestor;
exports.recursive = recursive;
exports.findNodeAt = findNodeAt;
exports.findNodeAround = findNodeAround;
exports.findNodeAfter = findNodeAfter;
exports.findNodeBefore = findNodeBefore;
exports.make = make;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple(node, visitors, base, state, override) {
  if (!base) base = exports.base;(function c(node, st, override) {
    var type = override || node.type,
        found = visitors[type];
    base[type](node, st, c);
    if (found) found(node, st);
  })(node, state, override);
}

// An ancestor walk builds up an array of ancestor nodes (including
// the current node) and passes them to the callback as the state parameter.

function ancestor(node, visitors, base, state) {
  if (!base) base = exports.base;
  if (!state) state = [];(function c(node, st, override) {
    var type = override || node.type,
        found = visitors[type];
    if (node != st[st.length - 1]) {
      st = st.slice();
      st.push(node);
    }
    base[type](node, st, c);
    if (found) found(node, st);
  })(node, state);
}

// A recursive walk is one where your functions override the default
// walkers. They can modify and replace the state parameter that's
// threaded through the walk, and can opt how and whether to walk
// their child nodes (by calling their third argument on these
// nodes).

function recursive(node, state, funcs, base, override) {
  var visitor = funcs ? exports.make(funcs, base) : base;(function c(node, st, override) {
    visitor[override || node.type](node, st, c);
  })(node, state, override);
}

function makeTest(test) {
  if (typeof test == "string") return function (type) {
    return type == test;
  };else if (!test) return function () {
    return true;
  };else return test;
}

var Found = function Found(node, state) {
  _classCallCheck(this, Found);

  this.node = node;this.state = state;
}

// Find a node with a given start, end, and type (all are optional,
// null can be used as wildcard). Returns a {node, state} object, or
// undefined when it doesn't find a matching node.
;

function findNodeAt(node, start, end, test, base, state) {
  test = makeTest(test);
  if (!base) base = exports.base;
  try {
    ;(function c(node, st, override) {
      var type = override || node.type;
      if ((start == null || node.start <= start) && (end == null || node.end >= end)) base[type](node, st, c);
      if ((start == null || node.start == start) && (end == null || node.end == end) && test(type, node)) throw new Found(node, st);
    })(node, state);
  } catch (e) {
    if (e instanceof Found) return e;
    throw e;
  }
}

// Find the innermost node of a given type that contains the given
// position. Interface similar to findNodeAt.

function findNodeAround(node, pos, test, base, state) {
  test = makeTest(test);
  if (!base) base = exports.base;
  try {
    ;(function c(node, st, override) {
      var type = override || node.type;
      if (node.start > pos || node.end < pos) return;
      base[type](node, st, c);
      if (test(type, node)) throw new Found(node, st);
    })(node, state);
  } catch (e) {
    if (e instanceof Found) return e;
    throw e;
  }
}

// Find the outermost matching node after a given position.

function findNodeAfter(node, pos, test, base, state) {
  test = makeTest(test);
  if (!base) base = exports.base;
  try {
    ;(function c(node, st, override) {
      if (node.end < pos) return;
      var type = override || node.type;
      if (node.start >= pos && test(type, node)) throw new Found(node, st);
      base[type](node, st, c);
    })(node, state);
  } catch (e) {
    if (e instanceof Found) return e;
    throw e;
  }
}

// Find the outermost matching node before a given position.

function findNodeBefore(node, pos, test, base, state) {
  test = makeTest(test);
  if (!base) base = exports.base;
  var max = undefined;(function c(node, st, override) {
    if (node.start > pos) return;
    var type = override || node.type;
    if (node.end <= pos && (!max || max.node.end < node.end) && test(type, node)) max = new Found(node, st);
    base[type](node, st, c);
  })(node, state);
  return max;
}

// Used to create a custom walker. Will fill in all missing node
// type properties with the defaults.

function make(funcs, base) {
  if (!base) base = exports.base;
  var visitor = {};
  for (var type in base) visitor[type] = base[type];
  for (var type in funcs) visitor[type] = funcs[type];
  return visitor;
}

function skipThrough(node, st, c) {
  c(node, st);
}
function ignore(_node, _st, _c) {}

// Node walkers.

var base = {};

exports.base = base;
base.Program = base.BlockStatement = function (node, st, c) {
  for (var i = 0; i < node.body.length; ++i) {
    c(node.body[i], st, "Statement");
  }
};
base.Statement = skipThrough;
base.EmptyStatement = ignore;
base.ExpressionStatement = base.ParenthesizedExpression = function (node, st, c) {
  return c(node.expression, st, "Expression");
};
base.IfStatement = function (node, st, c) {
  c(node.test, st, "Expression");
  c(node.consequent, st, "Statement");
  if (node.alternate) c(node.alternate, st, "Statement");
};
base.LabeledStatement = function (node, st, c) {
  return c(node.body, st, "Statement");
};
base.BreakStatement = base.ContinueStatement = ignore;
base.WithStatement = function (node, st, c) {
  c(node.object, st, "Expression");
  c(node.body, st, "Statement");
};
base.SwitchStatement = function (node, st, c) {
  c(node.discriminant, st, "Expression");
  for (var i = 0; i < node.cases.length; ++i) {
    var cs = node.cases[i];
    if (cs.test) c(cs.test, st, "Expression");
    for (var j = 0; j < cs.consequent.length; ++j) {
      c(cs.consequent[j], st, "Statement");
    }
  }
};
base.ReturnStatement = base.YieldExpression = function (node, st, c) {
  if (node.argument) c(node.argument, st, "Expression");
};
base.ThrowStatement = base.SpreadElement = function (node, st, c) {
  return c(node.argument, st, "Expression");
};
base.TryStatement = function (node, st, c) {
  c(node.block, st, "Statement");
  if (node.handler) {
    c(node.handler.param, st, "Pattern");
    c(node.handler.body, st, "ScopeBody");
  }
  if (node.finalizer) c(node.finalizer, st, "Statement");
};
base.WhileStatement = base.DoWhileStatement = function (node, st, c) {
  c(node.test, st, "Expression");
  c(node.body, st, "Statement");
};
base.ForStatement = function (node, st, c) {
  if (node.init) c(node.init, st, "ForInit");
  if (node.test) c(node.test, st, "Expression");
  if (node.update) c(node.update, st, "Expression");
  c(node.body, st, "Statement");
};
base.ForInStatement = base.ForOfStatement = function (node, st, c) {
  c(node.left, st, "ForInit");
  c(node.right, st, "Expression");
  c(node.body, st, "Statement");
};
base.ForInit = function (node, st, c) {
  if (node.type == "VariableDeclaration") c(node, st);else c(node, st, "Expression");
};
base.DebuggerStatement = ignore;

base.FunctionDeclaration = function (node, st, c) {
  return c(node, st, "Function");
};
base.VariableDeclaration = function (node, st, c) {
  for (var i = 0; i < node.declarations.length; ++i) {
    c(node.declarations[i], st);
  }
};
base.VariableDeclarator = function (node, st, c) {
  c(node.id, st, "Pattern");
  if (node.init) c(node.init, st, "Expression");
};

base.Function = function (node, st, c) {
  if (node.id) c(node.id, st, "Pattern");
  for (var i = 0; i < node.params.length; i++) {
    c(node.params[i], st, "Pattern");
  }c(node.body, st, node.expression ? "ScopeExpression" : "ScopeBody");
};
// FIXME drop these node types in next major version
// (They are awkward, and in ES6 every block can be a scope.)
base.ScopeBody = function (node, st, c) {
  return c(node, st, "Statement");
};
base.ScopeExpression = function (node, st, c) {
  return c(node, st, "Expression");
};

base.Pattern = function (node, st, c) {
  if (node.type == "Identifier") c(node, st, "VariablePattern");else if (node.type == "MemberExpression") c(node, st, "MemberPattern");else c(node, st);
};
base.VariablePattern = ignore;
base.MemberPattern = skipThrough;
base.RestElement = function (node, st, c) {
  return c(node.argument, st, "Pattern");
};
base.ArrayPattern = function (node, st, c) {
  for (var i = 0; i < node.elements.length; ++i) {
    var elt = node.elements[i];
    if (elt) c(elt, st, "Pattern");
  }
};
base.ObjectPattern = function (node, st, c) {
  for (var i = 0; i < node.properties.length; ++i) {
    c(node.properties[i].value, st, "Pattern");
  }
};

base.Expression = skipThrough;
base.ThisExpression = base.Super = base.MetaProperty = ignore;
base.ArrayExpression = function (node, st, c) {
  for (var i = 0; i < node.elements.length; ++i) {
    var elt = node.elements[i];
    if (elt) c(elt, st, "Expression");
  }
};
base.ObjectExpression = function (node, st, c) {
  for (var i = 0; i < node.properties.length; ++i) {
    c(node.properties[i], st);
  }
};
base.FunctionExpression = base.ArrowFunctionExpression = base.FunctionDeclaration;
base.SequenceExpression = base.TemplateLiteral = function (node, st, c) {
  for (var i = 0; i < node.expressions.length; ++i) {
    c(node.expressions[i], st, "Expression");
  }
};
base.UnaryExpression = base.UpdateExpression = function (node, st, c) {
  c(node.argument, st, "Expression");
};
base.BinaryExpression = base.LogicalExpression = function (node, st, c) {
  c(node.left, st, "Expression");
  c(node.right, st, "Expression");
};
base.AssignmentExpression = base.AssignmentPattern = function (node, st, c) {
  c(node.left, st, "Pattern");
  c(node.right, st, "Expression");
};
base.ConditionalExpression = function (node, st, c) {
  c(node.test, st, "Expression");
  c(node.consequent, st, "Expression");
  c(node.alternate, st, "Expression");
};
base.NewExpression = base.CallExpression = function (node, st, c) {
  c(node.callee, st, "Expression");
  if (node.arguments) for (var i = 0; i < node.arguments.length; ++i) {
    c(node.arguments[i], st, "Expression");
  }
};
base.MemberExpression = function (node, st, c) {
  c(node.object, st, "Expression");
  if (node.computed) c(node.property, st, "Expression");
};
base.ExportNamedDeclaration = base.ExportDefaultDeclaration = function (node, st, c) {
  if (node.declaration) c(node.declaration, st, node.type == "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression");
  if (node.source) c(node.source, st, "Expression");
};
base.ExportAllDeclaration = function (node, st, c) {
  c(node.source, st, "Expression");
};
base.ImportDeclaration = function (node, st, c) {
  for (var i = 0; i < node.specifiers.length; i++) {
    c(node.specifiers[i], st);
  }c(node.source, st, "Expression");
};
base.ImportSpecifier = base.ImportDefaultSpecifier = base.ImportNamespaceSpecifier = base.Identifier = base.Literal = ignore;

base.TaggedTemplateExpression = function (node, st, c) {
  c(node.tag, st, "Expression");
  c(node.quasi, st);
};
base.ClassDeclaration = base.ClassExpression = function (node, st, c) {
  return c(node, st, "Class");
};
base.Class = function (node, st, c) {
  if (node.id) c(node.id, st, "Pattern");
  if (node.superClass) c(node.superClass, st, "Expression");
  for (var i = 0; i < node.body.body.length; i++) {
    c(node.body.body[i], st);
  }
};
base.MethodDefinition = base.Property = function (node, st, c) {
  if (node.computed) c(node.key, st, "Expression");
  c(node.value, st, "Expression");
};
base.ComprehensionExpression = function (node, st, c) {
  for (var i = 0; i < node.blocks.length; i++) {
    c(node.blocks[i].right, st, "Expression");
  }c(node.body, st, "Expression");
};

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  var util = require('./util');

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet() {
    this._array = [];
    this._set = {};
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };

  /**
   * Return how many unique items are in this ArraySet. If duplicates have been
   * added, than those do not count towards the size.
   *
   * @returns Number
   */
  ArraySet.prototype.size = function ArraySet_size() {
    return Object.getOwnPropertyNames(this._set).length;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var sStr = util.toSetString(aStr);
    var isDuplicate = this._set.hasOwnProperty(sStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      this._set[sStr] = idx;
    }
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    var sStr = util.toSetString(aStr);
    return this._set.hasOwnProperty(sStr);
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    var sStr = util.toSetString(aStr);
    if (this._set.hasOwnProperty(sStr)) {
      return this._set[sStr];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  exports.ArraySet = ArraySet;
}

},{"./util":24}],16:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
{
  var base64 = require('./base64');

  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string via the out parameter.
   */
  exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (aIndex >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }

      digit = base64.decode(aStr.charCodeAt(aIndex++));
      if (digit === -1) {
        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      }

      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aIndex;
  };
}

},{"./base64":17}],17:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  exports.encode = function (number) {
    if (0 <= number && number < intToCharMap.length) {
      return intToCharMap[number];
    }
    throw new TypeError("Must be between 0 and 63: " + number);
  };

  /**
   * Decode a single base 64 character code digit to an integer. Returns -1 on
   * failure.
   */
  exports.decode = function (charCode) {
    var bigA = 65;     // 'A'
    var bigZ = 90;     // 'Z'

    var littleA = 97;  // 'a'
    var littleZ = 122; // 'z'

    var zero = 48;     // '0'
    var nine = 57;     // '9'

    var plus = 43;     // '+'
    var slash = 47;    // '/'

    var littleOffset = 26;
    var numberOffset = 52;

    // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
    if (bigA <= charCode && charCode <= bigZ) {
      return (charCode - bigA);
    }

    // 26 - 51: abcdefghijklmnopqrstuvwxyz
    if (littleA <= charCode && charCode <= littleZ) {
      return (charCode - littleA + littleOffset);
    }

    // 52 - 61: 0123456789
    if (zero <= charCode && charCode <= nine) {
      return (charCode - zero + numberOffset);
    }

    // 62: +
    if (charCode == plus) {
      return 62;
    }

    // 63: /
    if (charCode == slash) {
      return 63;
    }

    // Invalid base64 digit.
    return -1;
  };
}

},{}],18:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  exports.GREATEST_LOWER_BOUND = 1;
  exports.LEAST_UPPER_BOUND = 2;

  /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
   *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   */
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the index of
    //      the next-closest element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element than the one we are searching for, so we return -1.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      // Found the element we are looking for.
      return mid;
    }
    else if (cmp > 0) {
      // Our needle is greater than aHaystack[mid].
      if (aHigh - mid > 1) {
        // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
      }

      // The exact needle element was not found in this haystack. Determine if
      // we are in termination case (3) or (2) and return the appropriate thing.
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return aHigh < aHaystack.length ? aHigh : -1;
      } else {
        return mid;
      }
    }
    else {
      // Our needle is less than aHaystack[mid].
      if (mid - aLow > 1) {
        // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
      }

      // we are in termination case (3) or (2) and return the appropriate thing.
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return mid;
      } else {
        return aLow < 0 ? -1 : aLow;
      }
    }
  }

  /**
   * This is an implementation of binary search which will always try and return
   * the index of the closest element if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
   *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
   */
  exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
    if (aHaystack.length === 0) {
      return -1;
    }

    var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                                aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    if (index < 0) {
      return -1;
    }

    // We have found either the exact element, or the next-closest element than
    // the one we are searching for. However, there may be more than one such
    // element. Make sure we always return the smallest of these.
    while (index - 1 >= 0) {
      if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
        break;
      }
      --index;
    }

    return index;
  };
}

},{}],19:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  var util = require('./util');

  /**
   * Determine whether mappingB is after mappingA with respect to generated
   * position.
   */
  function generatedPositionAfter(mappingA, mappingB) {
    // Optimized for most common case
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA ||
           util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
  }

  /**
   * A data structure to provide a sorted view of accumulated mappings in a
   * performance conscious manner. It trades a neglibable overhead in general
   * case for a large speedup in case of mappings being added in order.
   */
  function MappingList() {
    this._array = [];
    this._sorted = true;
    // Serves as infimum
    this._last = {generatedLine: -1, generatedColumn: 0};
  }

  /**
   * Iterate through internal items. This method takes the same arguments that
   * `Array.prototype.forEach` takes.
   *
   * NOTE: The order of the mappings is NOT guaranteed.
   */
  MappingList.prototype.unsortedForEach =
    function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };

  /**
   * Add the given source mapping.
   *
   * @param Object aMapping
   */
  MappingList.prototype.add = function MappingList_add(aMapping) {
    if (generatedPositionAfter(this._last, aMapping)) {
      this._last = aMapping;
      this._array.push(aMapping);
    } else {
      this._sorted = false;
      this._array.push(aMapping);
    }
  };

  /**
   * Returns the flat, sorted array of mappings. The mappings are sorted by
   * generated position.
   *
   * WARNING: This method returns internal data without copying, for
   * performance. The return value must NOT be mutated, and should be treated as
   * an immutable borrow. If you want to take ownership, you must make your own
   * copy.
   */
  MappingList.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
      this._array.sort(util.compareByGeneratedPositionsInflated);
      this._sorted = true;
    }
    return this._array;
  };

  exports.MappingList = MappingList;
}

},{"./util":24}],20:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  // It turns out that some (most?) JavaScript engines don't self-host
  // `Array.prototype.sort`. This makes sense because C++ will likely remain
  // faster than JS when doing raw CPU-intensive sorting. However, when using a
  // custom comparator function, calling back and forth between the VM's C++ and
  // JIT'd JS is rather slow *and* loses JIT type information, resulting in
  // worse generated code for the comparator function than would be optimal. In
  // fact, when sorting with a comparator, these costs outweigh the benefits of
  // sorting in C++. By using our own JS-implemented Quick Sort (below), we get
  // a ~3500ms mean speed-up in `bench/bench.html`.

  /**
   * Swap the elements indexed by `x` and `y` in the array `ary`.
   *
   * @param {Array} ary
   *        The array.
   * @param {Number} x
   *        The index of the first item.
   * @param {Number} y
   *        The index of the second item.
   */
  function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y];
    ary[y] = temp;
  }

  /**
   * Returns a random integer within the range `low .. high` inclusive.
   *
   * @param {Number} low
   *        The lower bound on the range.
   * @param {Number} high
   *        The upper bound on the range.
   */
  function randomIntInRange(low, high) {
    return Math.round(low + (Math.random() * (high - low)));
  }

  /**
   * The Quick Sort algorithm.
   *
   * @param {Array} ary
   *        An array to sort.
   * @param {function} comparator
   *        Function to use to compare two items.
   * @param {Number} p
   *        Start index of the array
   * @param {Number} r
   *        End index of the array
   */
  function doQuickSort(ary, comparator, p, r) {
    // If our lower bound is less than our upper bound, we (1) partition the
    // array into two pieces and (2) recurse on each half. If it is not, this is
    // the empty array and our base case.

    if (p < r) {
      // (1) Partitioning.
      //
      // The partitioning chooses a pivot between `p` and `r` and moves all
      // elements that are less than or equal to the pivot to the before it, and
      // all the elements that are greater than it after it. The effect is that
      // once partition is done, the pivot is in the exact place it will be when
      // the array is put in sorted order, and it will not need to be moved
      // again. This runs in O(n) time.

      // Always choose a random pivot so that an input array which is reverse
      // sorted does not cause O(n^2) running time.
      var pivotIndex = randomIntInRange(p, r);
      var i = p - 1;

      swap(ary, pivotIndex, r);
      var pivot = ary[r];

      // Immediately after `j` is incremented in this loop, the following hold
      // true:
      //
      //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
      //
      //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
      for (var j = p; j < r; j++) {
        if (comparator(ary[j], pivot) <= 0) {
          i += 1;
          swap(ary, i, j);
        }
      }

      swap(ary, i + 1, j);
      var q = i + 1;

      // (2) Recurse on each half.

      doQuickSort(ary, comparator, p, q - 1);
      doQuickSort(ary, comparator, q + 1, r);
    }
  }

  /**
   * Sort the given array in-place with the given comparator function.
   *
   * @param {Array} ary
   *        An array to sort.
   * @param {function} comparator
   *        Function to use to compare two items.
   */
  exports.quickSort = function (ary, comparator) {
    doQuickSort(ary, comparator, 0, ary.length - 1);
  };
}

},{}],21:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  var util = require('./util');
  var binarySearch = require('./binary-search');
  var ArraySet = require('./array-set').ArraySet;
  var base64VLQ = require('./base64-vlq');
  var quickSort = require('./quick-sort').quickSort;

  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    return sourceMap.sections != null
      ? new IndexedSourceMapConsumer(sourceMap)
      : new BasicSourceMapConsumer(sourceMap);
  }

  SourceMapConsumer.fromSourceMap = function(aSourceMap) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
  }

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    get: function () {
      if (!this.__generatedMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    get: function () {
      if (!this.__originalMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  SourceMapConsumer.prototype._charIsMappingSeparator =
    function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
  SourceMapConsumer.LEAST_UPPER_BOUND = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      var sourceRoot = this.sourceRoot;
      mappings.map(function (mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        if (source != null && sourceRoot != null) {
          source = util.join(sourceRoot, source);
        }
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        };
      }, this).forEach(aCallback, context);
    };

  /**
   * Returns all generated line and column information for the original source,
   * line, and column provided. If no column is provided, returns all mappings
   * corresponding to a either the line we are searching for or the next
   * closest line that has any mappings. Otherwise, returns all mappings
   * corresponding to the given line and either the column we are searching for
   * or the next closest column that has any offsets.
   *
   * The only argument is an object with the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: Optional. the column number in the original source.
   *
   * and an array of objects is returned, each with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.allGeneratedPositionsFor =
    function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, 'line');

      // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
      // returns the index of the closest mapping less than the needle. By
      // setting needle.originalColumn to 0, we thus find the last mapping for
      // the given line, provided such a mapping exists.
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: line,
        originalColumn: util.getArg(aArgs, 'column', 0)
      };

      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }
      if (!this._sources.has(needle.source)) {
        return [];
      }
      needle.source = this._sources.indexOf(needle.source);

      var mappings = [];

      var index = this._findMapping(needle,
                                    this._originalMappings,
                                    "originalLine",
                                    "originalColumn",
                                    util.compareByOriginalPositions,
                                    binarySearch.LEAST_UPPER_BOUND);
      if (index >= 0) {
        var mapping = this._originalMappings[index];

        if (aArgs.column === undefined) {
          var originalLine = mapping.originalLine;

          // Iterate until either we run out of mappings, or we run into
          // a mapping for a different line than the one we found. Since
          // mappings are sorted, this is guaranteed to find all mappings for
          // the line we found.
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, 'generatedLine', null),
              column: util.getArg(mapping, 'generatedColumn', null),
              lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
            });

            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;

          // Iterate until either we run out of mappings, or we run into
          // a mapping for a different line than the one we were searching for.
          // Since mappings are sorted, this is guaranteed to find all mappings for
          // the line we are searching for.
          while (mapping &&
                 mapping.originalLine === line &&
                 mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, 'generatedLine', null),
              column: util.getArg(mapping, 'generatedColumn', null),
              lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
            });

            mapping = this._originalMappings[++index];
          }
        }
      }

      return mappings;
    };

  exports.SourceMapConsumer = SourceMapConsumer;

  /**
   * A BasicSourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function BasicSourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    sources = sources
      // Some source maps produce relative source paths like "./foo.js" instead of
      // "foo.js".  Normalize these first so that future comparisons will succeed.
      // See bugzil.la/1090768.
      .map(util.normalize)
      // Always ensure that absolute sources are internally stored relative to
      // the source root, if the source root is absolute. Not doing this would
      // be particularly problematic when the source root is a prefix of the
      // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
      .map(function (source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
          ? util.relative(sourceRoot, source)
          : source;
      });

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names, true);
    this._sources = ArraySet.fromArray(sources, true);

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this.file = file;
  }

  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

  /**
   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns BasicSourceMapConsumer
   */
  BasicSourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap(aSourceMap) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);

      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot);
      smc.file = aSourceMap._file;

      // Because we are modifying the entries (by converting string sources and
      // names to indices into the sources and names ArraySets), we have to make
      // a copy of the entry or else bad things happen. Shared mutable state
      // strikes again! See github issue #191.

      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];

      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping;
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;

        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;

          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }

          destOriginalMappings.push(destMapping);
        }

        destGeneratedMappings.push(destMapping);
      }

      quickSort(smc.__originalMappings, util.compareByOriginalPositions);

      return smc;
    };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  BasicSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._sources.toArray().map(function (s) {
        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
      }, this);
    }
  });

  /**
   * Provide the JIT with a nice shape / hidden class.
   */
  function Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
  }

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  BasicSourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;

      while (index < length) {
        if (aStr.charAt(index) === ';') {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
        }
        else if (aStr.charAt(index) === ',') {
          index++;
        }
        else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;

          // Because each offset is encoded relative to the previous one,
          // many segments often have the same encoding. We can exploit this
          // fact by caching the parsed variable length fields of each segment,
          // allowing us to avoid a second parse if we encounter the same
          // segment again.
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);

          segment = cachedSegments[str];
          if (segment) {
            index += str.length;
          } else {
            segment = [];
            while (index < end) {
              base64VLQ.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value);
            }

            if (segment.length === 2) {
              throw new Error('Found a source, but no line and column');
            }

            if (segment.length === 3) {
              throw new Error('Found a source and line, but no column');
            }

            cachedSegments[str] = segment;
          }

          // Generated column.
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;

          if (segment.length > 1) {
            // Original source.
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];

            // Original line.
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;

            // Original column.
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;

            if (segment.length > 4) {
              // Original name.
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }

          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            originalMappings.push(mapping);
          }
        }
      }

      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;

      quickSort(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings;
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  BasicSourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator, aBias) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };

  /**
   * Compute the last column for each generated mapping. The last column is
   * inclusive.
   */
  BasicSourceMapConsumer.prototype.computeColumnSpans =
    function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];

        // Mappings do not contain a field for the last generated columnt. We
        // can come up with an optimistic estimate, however, by assuming that
        // mappings are contiguous (i.e. given two consecutive mappings, the
        // first mapping ends where the second one starts).
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];

          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }

        // The last mapping for each line spans the entire line.
        mapping.lastGeneratedColumn = Infinity;
      }
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  BasicSourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
      );

      if (index >= 0) {
        var mapping = this._generatedMappings[index];

        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, 'source', null);
          if (source !== null) {
            source = this._sources.at(source);
            if (this.sourceRoot != null) {
              source = util.join(this.sourceRoot, source);
            }
          }
          var name = util.getArg(mapping, 'name', null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source: source,
            line: util.getArg(mapping, 'originalLine', null),
            column: util.getArg(mapping, 'originalColumn', null),
            name: name
          };
        }
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
    function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() &&
        !this.sourcesContent.some(function (sc) { return sc == null; });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  BasicSourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }

      if (this.sourceRoot != null) {
        aSource = util.relative(this.sourceRoot, aSource);
      }

      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)];
      }

      var url;
      if (this.sourceRoot != null
          && (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
        if (url.scheme == "file"
            && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == "/")
            && this._sources.has("/" + aSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
        }
      }

      // This function is used recursively from
      // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
      // don't want to throw if we can't find the source - we just want to
      // return null, so we provide a flag to exit gracefully.
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  BasicSourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, 'source');
      if (this.sourceRoot != null) {
        source = util.relative(this.sourceRoot, source);
      }
      if (!this._sources.has(source)) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      source = this._sources.indexOf(source);

      var needle = {
        source: source,
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };

      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
      );

      if (index >= 0) {
        var mapping = this._originalMappings[index];

        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          };
        }
      }

      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };

  exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

  /**
   * An IndexedSourceMapConsumer instance represents a parsed source map which
   * we can query for information. It differs from BasicSourceMapConsumer in
   * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
   * input.
   *
   * The only parameter is a raw source map (either as a JSON string, or already
   * parsed to an object). According to the spec for indexed source maps, they
   * have the following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - file: Optional. The generated file this source map is associated with.
   *   - sections: A list of section definitions.
   *
   * Each value under the "sections" field has two fields:
   *   - offset: The offset into the original specified at which this section
   *       begins to apply, defined as an object with a "line" and "column"
   *       field.
   *   - map: A source map definition. This source map could also be indexed,
   *       but doesn't have to be.
   *
   * Instead of the "map" field, it's also possible to have a "url" field
   * specifying a URL to retrieve a source map from, but that's currently
   * unsupported.
   *
   * Here's an example source map, taken from the source map spec[0], but
   * modified to omit a section which uses the "url" field.
   *
   *  {
   *    version : 3,
   *    file: "app.js",
   *    sections: [{
   *      offset: {line:100, column:10},
   *      map: {
   *        version : 3,
   *        file: "section.js",
   *        sources: ["foo.js", "bar.js"],
   *        names: ["src", "maps", "are", "fun"],
   *        mappings: "AAAA,E;;ABCDE;"
   *      }
   *    }],
   *  }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
   */
  function IndexedSourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sections = util.getArg(sourceMap, 'sections');

    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    this._sources = new ArraySet();
    this._names = new ArraySet();

    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map(function (s) {
      if (s.url) {
        // The url field will require support for asynchronicity.
        // See https://github.com/mozilla/source-map/issues/16
        throw new Error('Support for url field in sections not implemented.');
      }
      var offset = util.getArg(s, 'offset');
      var offsetLine = util.getArg(offset, 'line');
      var offsetColumn = util.getArg(offset, 'column');

      if (offsetLine < lastOffset.line ||
          (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
        throw new Error('Section offsets must be ordered and non-overlapping.');
      }
      lastOffset = offset;

      return {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer(util.getArg(s, 'map'))
      }
    });
  }

  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

  /**
   * The version of the source mapping spec that we are consuming.
   */
  IndexedSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
    get: function () {
      var sources = [];
      for (var i = 0; i < this._sections.length; i++) {
        for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
          sources.push(this._sections[i].consumer.sources[j]);
        }
      }
      return sources;
    }
  });

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  IndexedSourceMapConsumer.prototype.originalPositionFor =
    function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      // Find the section containing the generated position we're trying to map
      // to an original position.
      var sectionIndex = binarySearch.search(needle, this._sections,
        function(needle, section) {
          var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }

          return (needle.generatedColumn -
                  section.generatedOffset.generatedColumn);
        });
      var section = this._sections[sectionIndex];

      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }

      return section.consumer.originalPositionFor({
        line: needle.generatedLine -
          (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn -
          (section.generatedOffset.generatedLine === needle.generatedLine
           ? section.generatedOffset.generatedColumn - 1
           : 0),
        bias: aArgs.bias
      });
    };

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
    function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function (s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  IndexedSourceMapConsumer.prototype.sourceContentFor =
    function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  IndexedSourceMapConsumer.prototype.generatedPositionFor =
    function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        // Only consider this section if the requested source is in the list of
        // sources of the consumer.
        if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line +
              (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column +
              (section.generatedOffset.generatedLine === generatedPosition.line
               ? section.generatedOffset.generatedColumn - 1
               : 0)
          };
          return ret;
        }
      }

      return {
        line: null,
        column: null
      };
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  IndexedSourceMapConsumer.prototype._parseMappings =
    function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];

          var source = section.consumer._sources.at(mapping.source);
          if (section.consumer.sourceRoot !== null) {
            source = util.join(section.consumer.sourceRoot, source);
          }
          this._sources.add(source);
          source = this._sources.indexOf(source);

          var name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);

          // The mappings coming from the consumer for the section have
          // generated positions relative to the start of the section, so we
          // need to offset them to be relative to the start of the concatenated
          // generated file.
          var adjustedMapping = {
            source: source,
            generatedLine: mapping.generatedLine +
              (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn +
              (section.generatedOffset.generatedLine === mapping.generatedLine
              ? section.generatedOffset.generatedColumn - 1
              : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: name
          };

          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === 'number') {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }

      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };

  exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
}

},{"./array-set":15,"./base64-vlq":16,"./binary-search":18,"./quick-sort":20,"./util":24}],22:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  var base64VLQ = require('./base64-vlq');
  var util = require('./util');
  var ArraySet = require('./array-set').ArraySet;
  var MappingList = require('./mapping-list').MappingList;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util.getArg(aArgs, 'file', null);
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = new MappingList();
    this._sourcesContents = null;
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator.fromSourceMap =
    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };

        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };

          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }

        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);

      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }

      if (source != null && !this._sources.has(source)) {
        this._sources.add(source);
      }

      if (name != null && !this._names.has(name)) {
        this._names.add(name);
      }

      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }

      if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = {};
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
  SourceMapGenerator.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
            'or the source map\'s "file" property. Both were omitted.'
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      // Make "sourceFile" relative if an absolute Url is passed.
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet();
      var newNames = new ArraySet();

      // Find mappings for the "sourceFile"
      this._mappings.unsortedForEach(function (mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            // Copy mapping
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source)
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }

        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }

        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }

      }, this);
      this._sources = newSources;
      this._names = newNames;

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util.join(aSourceMapPath, sourceFile);
          }
          if (sourceRoot != null) {
            sourceFile = util.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var mapping;
      var nameIdx;
      var sourceIdx;

      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            result += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            result += ',';
          }
        }

        result += base64VLQ.encode(mapping.generatedColumn
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;

        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          result += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;

          // lines are stored 0-based in SourceMap spec version 3
          result += base64VLQ.encode(mapping.originalLine - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;

          result += base64VLQ.encode(mapping.originalColumn
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;

          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            result += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
      }

      return result;
    };

  SourceMapGenerator.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
                                                    key)
          ? this._sourcesContents[key]
          : null;
      }, this);
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }

      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };

  exports.SourceMapGenerator = SourceMapGenerator;
}

},{"./array-set":15,"./base64-vlq":16,"./mapping-list":19,"./util":24}],23:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;
  var util = require('./util');

  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
  // operating systems these days (capturing the result).
  var REGEX_NEWLINE = /(\r?\n)/;

  // Newline character code for charCodeAt() comparisons
  var NEWLINE_CODE = 10;

  // Private symbol for identifying `SourceNode`s when multiple versions of
  // the source-map library are loaded. This MUST NOT CHANGE across
  // versions!
  var isSourceNode = "$$$isSourceNode$$$";

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   * @param aRelativePath Optional. The path that relative sources in the
   *        SourceMapConsumer should be relative to.
   */
  SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode();

      // All even indices of this array are one line of the generated code,
      // while all odd indices are the newlines between two adjacent lines
      // (since `REGEX_NEWLINE` captures its match).
      // Processed fragments are removed from this array, by calling `shiftNextLine`.
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var shiftNextLine = function() {
        var lineContents = remainingLines.shift();
        // The last line of a file might not have a newline.
        var newLine = remainingLines.shift() || "";
        return lineContents + newLine;
      };

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null;

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping !== null) {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            // Associate first line with "lastMapping"
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
            // The remaining code is added without mapping
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[0];
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn);
            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            // No more remaining code, continue
            lastMapping = mapping;
            return;
          }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[0];
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[0] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      // We have processed all mappings.
      if (remainingLines.length > 0) {
        if (lastMapping) {
          // Associate the remaining code in the current line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        // and add the remaining lines without any mapping
        node.add(remainingLines.join(""));
      }

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });

      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code);
        } else {
          var source = aRelativePath
            ? util.join(aRelativePath, mapping.source)
            : mapping.source;
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  source,
                                  code,
                                  mapping.name));
        }
      }
    };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk[isSourceNode]) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
                       line: this.line,
                       column: this.column,
                       name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }

      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null
          && original.line !== null
          && original.column !== null) {
        if(lastOriginalSource !== original.source
           || lastOriginalLine !== original.line
           || lastOriginalColumn !== original.column
           || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      for (var idx = 0, length = chunk.length; idx < length; idx++) {
        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
          generated.line++;
          generated.column = 0;
          // Mappings end at eol
          if (idx + 1 === length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      }
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  exports.SourceNode = SourceNode;
}

},{"./source-map-generator":22,"./util":24}],24:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;

  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
  var dataUrlRegexp = /^data:.+\,.+$/;

  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    };
  }
  exports.urlParse = urlParse;

  function urlGenerate(aParsedUrl) {
    var url = '';
    if (aParsedUrl.scheme) {
      url += aParsedUrl.scheme + ':';
    }
    url += '//';
    if (aParsedUrl.auth) {
      url += aParsedUrl.auth + '@';
    }
    if (aParsedUrl.host) {
      url += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url += ":" + aParsedUrl.port
    }
    if (aParsedUrl.path) {
      url += aParsedUrl.path;
    }
    return url;
  }
  exports.urlGenerate = urlGenerate;

  /**
   * Normalizes a path, or the path portion of a URL:
   *
   * - Replaces consequtive slashes with one slash.
   * - Removes unnecessary '.' parts.
   * - Removes unnecessary '<dir>/..' parts.
   *
   * Based on code in the Node.js 'path' core module.
   *
   * @param aPath The path or url to normalize.
   */
  function normalize(aPath) {
    var path = aPath;
    var url = urlParse(aPath);
    if (url) {
      if (!url.path) {
        return aPath;
      }
      path = url.path;
    }
    var isAbsolute = exports.isAbsolute(path);

    var parts = path.split(/\/+/);
    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
      part = parts[i];
      if (part === '.') {
        parts.splice(i, 1);
      } else if (part === '..') {
        up++;
      } else if (up > 0) {
        if (part === '') {
          // The first part is blank if the path is absolute. Trying to go
          // above the root is a no-op. Therefore we can remove all '..' parts
          // directly after the root.
          parts.splice(i + 1, up);
          up = 0;
        } else {
          parts.splice(i, 2);
          up--;
        }
      }
    }
    path = parts.join('/');

    if (path === '') {
      path = isAbsolute ? '/' : '.';
    }

    if (url) {
      url.path = path;
      return urlGenerate(url);
    }
    return path;
  }
  exports.normalize = normalize;

  /**
   * Joins two paths/URLs.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be joined with the root.
   *
   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
   *   first.
   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
   *   is updated with the result and aRoot is returned. Otherwise the result
   *   is returned.
   *   - If aPath is absolute, the result is aPath.
   *   - Otherwise the two paths are joined with a slash.
   * - Joining for example 'http://' and 'www.example.com' is also supported.
   */
  function join(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    if (aPath === "") {
      aPath = ".";
    }
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) {
      aRoot = aRootUrl.path || '/';
    }

    // `join(foo, '//www.example.org')`
    if (aPathUrl && !aPathUrl.scheme) {
      if (aRootUrl) {
        aPathUrl.scheme = aRootUrl.scheme;
      }
      return urlGenerate(aPathUrl);
    }

    if (aPathUrl || aPath.match(dataUrlRegexp)) {
      return aPath;
    }

    // `join('http://', 'www.example.com')`
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
      aRootUrl.host = aPath;
      return urlGenerate(aRootUrl);
    }

    var joined = aPath.charAt(0) === '/'
      ? aPath
      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

    if (aRootUrl) {
      aRootUrl.path = joined;
      return urlGenerate(aRootUrl);
    }
    return joined;
  }
  exports.join = join;

  exports.isAbsolute = function (aPath) {
    return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
  };

  /**
   * Make a path relative to a URL or another path.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be made relative to aRoot.
   */
  function relative(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }

    aRoot = aRoot.replace(/\/$/, '');

    // It is possible for the path to be above the root. In this case, simply
    // checking whether the root is a prefix of the path won't work. Instead, we
    // need to remove components from the root one by one, until either we find
    // a prefix that fits, or we run out of components to remove.
    var level = 0;
    while (aPath.indexOf(aRoot + '/') !== 0) {
      var index = aRoot.lastIndexOf("/");
      if (index < 0) {
        return aPath;
      }

      // If the only part of the root that is left is the scheme (i.e. http://,
      // file:///, etc.), one or more slashes (/), or simply nothing at all, we
      // have exhausted all components, so the path is not relative to the root.
      aRoot = aRoot.slice(0, index);
      if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
        return aPath;
      }

      ++level;
    }

    // Make sure we add a "../" for each component we removed from the root.
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  }
  exports.relative = relative;

  /**
   * Because behavior goes wacky when you set `__proto__` on objects, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
  function toSetString(aStr) {
    return '$' + aStr;
  }
  exports.toSetString = toSetString;

  function fromSetString(aStr) {
    return aStr.substr(1);
  }
  exports.fromSetString = fromSetString;

  /**
   * Comparator between two mappings where the original positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same original source/line/column, but different generated
   * line and column the same. Useful when searching for a mapping with a
   * stubbed out mapping.
   */
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = mappingA.source - mappingB.source;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0 || onlyCompareOriginal) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    return mappingA.name - mappingB.name;
  }
  exports.compareByOriginalPositions = compareByOriginalPositions;

  /**
   * Comparator between two mappings with deflated source and name indices where
   * the generated positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same generated line and column, but different
   * source/name/original line and column the same. Useful when searching for a
   * mapping with a stubbed out mapping.
   */
  function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0 || onlyCompareGenerated) {
      return cmp;
    }

    cmp = mappingA.source - mappingB.source;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }

    return mappingA.name - mappingB.name;
  }
  exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

  function strcmp(aStr1, aStr2) {
    if (aStr1 === aStr2) {
      return 0;
    }

    if (aStr1 > aStr2) {
      return 1;
    }

    return -1;
  }

  /**
   * Comparator between two mappings with inflated source and name strings where
   * the generated positions are compared.
   */
  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
}

},{}],25:[function(require,module,exports){
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = require('./lib/source-map-generator').SourceMapGenerator;
exports.SourceMapConsumer = require('./lib/source-map-consumer').SourceMapConsumer;
exports.SourceNode = require('./lib/source-node').SourceNode;

},{"./lib/source-map-consumer":21,"./lib/source-map-generator":22,"./lib/source-node":23}],26:[function(require,module,exports){
module.exports={
  "name": "nodent",
  "version": "2.3.13",
  "description": "NoDent - Asynchronous Javascript language extensions",
  "main": "nodent.js",
  "scripts": {
    "test": "./nodent.js tests --syntax --quick --quiet --generators",
    "start": "./nodent.js"
  },
  "dependencies": {
    "acorn": "2.6.4",
    "acorn-es7-plugin": "^1.0.11",
    "source-map": "0.5.3"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/MatAtBread/nodent.git"
  },
  "engines": "node >= 0.10.0",
  "keywords": [
    "Javascript",
    "ES7",
    "async",
    "await",
    "language",
    "extensions",
    "Node",
    "callback",
    "generator",
    "Promise",
    "asynchronous"
  ],
  "author": {
    "name": "Mat At Bread",
    "email": "nodent@mailed.me.uk"
  },
  "license": "BSD-2-Clause",
  "bugs": {
    "url": "https://github.com/MatAtBread/nodent/issues"
  },
  "gitHead": "f6e05ffb444898ac0589a4db63d44cc98d0ef73c",
  "homepage": "https://github.com/MatAtBread/nodent#readme",
  "_id": "nodent@2.3.13",
  "_shasum": "d139eaffa91edf6323d962582cd4c6bc2d5d54c2",
  "_from": "nodent@>=2.3.13 <3.0.0",
  "_npmVersion": "3.3.12",
  "_nodeVersion": "5.5.0",
  "_npmUser": {
    "name": "matatbread",
    "email": "npm@mailed.me.uk"
  },
  "maintainers": [
    {
      "name": "matatbread",
      "email": "npm@mailed.me.uk"
    }
  ],
  "dist": {
    "shasum": "d139eaffa91edf6323d962582cd4c6bc2d5d54c2",
    "tarball": "http://registry.npmjs.org/nodent/-/nodent-2.3.13.tgz"
  },
  "_npmOperationalInternal": {
    "host": "packages-6-west.internal.npmjs.com",
    "tmp": "tmp/nodent-2.3.13.tgz_1454424008526_0.8511582668870687"
  },
  "directories": {},
  "_resolved": "https://registry.npmjs.org/nodent/-/nodent-2.3.13.tgz"
}

},{}],"nodent":[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__dirname){


'use strict';
/**
 * NoDent - Asynchronous JavaScript Language extensions for Node
 *
 * AST transforms and node loader extension
 */
var stdJSLoader ;
var smCache = {} ;
var fs = require('fs') ;
var outputCode = require('./lib/output') ;
var parser = require('./lib/parser') ;
var treeSurgeon = require('./lib/arboriculture') ;

// Config options used to control the run-time behaviour of the compiler
var config = {
	log:function(msg){ console.warn("Nodent: "+msg) },		// Where to print errors and warnings
	augmentObject:false,									// Only one has to say 'yes'
	extension:'.njs',										// The 'default' extension
	dontMapStackTraces:false,								// Only one has to say 'no'
	asyncStackTrace:false,
	babelTree:false,
	dontInstallRequireHook:false
} ;

// Code generation options, which are determined by the "use nodent"; directive. Specifically,
// the (optional) portion as in "use nodent<-option-set>"; is used to select a compilation
// behaviour on a file-by-file basis. There are preset option sets called "es7", "promise(s)"
// and "generators" (which cannot be over-written). Others can be specified via the
// 'setCompileOptions(name,options)' call, or via the 'nodent:{directive:{'name':{...}}}' entry in the
// current project's package.json. In the latter's case, the name 'default' is also reserved and
// is used for a bare 'use nodent' driective with no project-specific extension.
// Finally, the 'use nodent' directive can be followed by a JSON encoded set of options, for example:
//		'use nodent-es7 {"wrapAwait":true}';
//		'use nodent {"wrapAwait":true,"promise":true}';
//		'use nodent-generators {"parser":{"sourceType":"module"}}';
//
// The order of application of these options is:
//		initialCodeGenOpts (hard-coded)
//		named by the 'use nodent-OPTION', as read from the package.json
//		named by the 'use nodent-OPTION', as set by the setCompileOptions (or setDefaultCompileOptions)
//		set within the directive as a JSON-encoded extension

var initialCodeGenOpts = {
	wrapAwait:null,
	mapStartLine:0,
	sourcemap:true,
	parser:{sourceType:'script'},
	$return:"$return",
	$error:"$error",
	$arguments:"$args",
	$asyncspawn:"$asyncspawn",
	$asyncbind:"$asyncbind",
	/* deprecated
	bindAwait:"$asyncbind",
	bindAsync:"$asyncbind",
	bindLoop:"$asyncbind", */
	generatedSymbolPrefix:"$",
	$makeThenable:'$makeThenable'
};

function copyObj(a){
	var o = {} ;
	a.forEach(function(b){
		if (b && typeof b==='object')
			for (var k in b)
				o[k] = b[k]  ;
	}) ;
	return o ;
};

var defaultCodeGenOpts = Object.create(initialCodeGenOpts, {es7:{value:true,writeable:true,enumerable:true}}) ; 
var optionSets = {
	default:defaultCodeGenOpts,
	es7:Object.create(defaultCodeGenOpts),
	promise:Object.create(defaultCodeGenOpts,{
		promises:{value:true,writeable:true,enumerable:true}
	}),
	generator:Object.create(defaultCodeGenOpts,{
		generators:{value:true,writeable:true,enumerable:true},
		es7:{value:false,writeable:true,enumerable:true},
	})
};
optionSets.promises = optionSets.promise ;
optionSets.generators = optionSets.generator ;

function globalErrorHandler(err) {
	throw err ;
}

/* Extract compiler options from code (either a string or AST) */
var useDirective = /^\s*['"]use\s+nodent-?([a-zA-Z0-9]*)?(\s*.*)?['"]\s*;/

function noLogger(){}

function isDirective(node){
    return node.type === 'ExpressionStatement' && 
        (node.expression.type === 'StringLiteral' || 
            (node.expression.type === 'Literal' && typeof node.expression.value === 'string')) ;
}

function parseCompilerOptions(code,log) {
	var regex, set, parseOpts = {} ;
	if (typeof code=="string") {
		if (regex = code.match(useDirective)) {
			set = regex[1] || 'default' ;
		}
	} else { // code is an AST
		for (var i=0; i<code.body.length; i++) {
			if (isDirective(code.body[i].type)) {
			    var test = "'"+code.body[i].value+"'" ;
				if (regex = test.match(useDirective)) {
					set = regex[1] || 'default' ;
					break ;
				}
			} else {
			    break ; // Directives should preceed all other statements
			}
		}
	}
	if (!regex)
		return null ;

	if (set) {
		try {
			var packageOptions = JSON.parse(fs.readFileSync(__dirname+"/../../package.json")).nodent.directive[set] ;
		} catch(ex) {
			// Meh
		}
	}
	try {
		parseOpts = copyObj([optionSets[set],packageOptions,regex[2] && JSON.parse(regex[2])]);
	} catch(ex) {
		log("Invalid literal compiler option:"+regex[2]);
	}

	if (parseOpts.promises || parseOpts.es7 || parseOpts.generators) {
		if ((parseOpts.promises || parseOpts.es7) && parseOpts.generators) {
			log("No valid 'use nodent' directive, assumed -es7 mode") ;
			parseOpts = optionSets.es7 ;
		}
		return parseOpts ;
	}
	return null ; // No valid nodent options
}

function stripBOM(content) {
	// Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	// because the buffer-to-string conversion in `fs.readFileSync()`
	// translates it to FEFF, the UTF-16 BOM.
	if (content.charCodeAt(0) === 0xFEFF) {
		content = content.slice(1);
	}
	if (content.substring(0,2) === "#!") {
		content = "//"+content ;
	}
	return content;
}

function btoa(str) {
	var buffer ;
	if (str instanceof Buffer) {
		buffer = str;
	} else {
		buffer = new Buffer(str.toString(), 'binary');
	}

	return buffer.toString('base64');
}

/**
 * NoDentify (make async) a general function.
 * The format is function(a,b,cb,d,e,f){}.noDentify(cbIdx,errorIdx,resultIdx) ;
 * for example:
 * 		http.aGet = http.get.noDentify(1) ;	// The 1st argument (from zero) is the callback. errorIdx is undefined (no error)
 *
 * The function is transformed from:
 * 		http.get(opts,function(result){}) ;
 * to:
 * 		http.aGet(opts).then(function(result){}) ;
 *
 * @params
 * idx			The argument index that is the 'callback'. 'undefined' for the final parameter
 * errorIdx		The argument index of the callback that holds the error. 'undefined' for no error value
 * resultIdx 	The argument index of the callback that holds the result.
 * 				'undefined' for the argument after the errorIdx (errorIdx != undefined)
 * 				[] returns all the arguments
 * promiseProvider	For promises, set this to the module providing Promises.
 */
function noDentify(idx,errorIdx,resultIdx,promiseProvider) {
	promiseProvider = promiseProvider || Thenable ;
	var fn = this ;
	return function() {
		var scope = this ;
		var args = Array.prototype.slice.apply(arguments) ;
		var resolver = function(ok,error) {
			if (undefined==idx)	// No index specified - use the final (unspecified) parameter
				idx = args.length ;
			if (undefined==errorIdx)	// No error parameter in the callback - just pass to ok()
				args[idx] = ok ;
			else {
				args[idx] = function() {
					var err = arguments[errorIdx] ;
					if (err)
						return error(err) ;
					if (Array.isArray(resultIdx) && resultIdx.length===0)
						return ok(arguments) ;
					var result = arguments[resultIdx===undefined?errorIdx+1:resultIdx] ;
					return ok(result) ;
				} ;
			}
			return fn.apply(scope,args) ;
		}
		return new promiseProvider(resolver) ;
	};
}

function compileNodentedFile(nodent,log) {
    log = log || nodent.log ;
	return function(mod, filename, parseOpts) {
		var content = stripBOM(fs.readFileSync(filename, 'utf8'));
		var pr = nodent.parse(content,filename,parseOpts);
		parseOpts = parseOpts || parseCompilerOptions(pr.ast,log) ;
		nodent.asynchronize(pr,undefined,parseOpts,log) ;
		nodent.prettyPrint(pr,parseOpts) ;
		mod._compile(pr.code, pr.filename);
	}
};

// Things that DON'T depend on initOpts (or config, and therefore nodent)
function asyncify(promiseProvider) {
	promiseProvider = promiseProvider || Thenable ;
	return function(obj,filter,suffix) {
		if (Array.isArray(filter)) {
			var names = filter ;
			filter = function(k,o) {
				return names.indexOf(k)>=0 ;
			}
		} else {
			filter = filter || function(k,o) {
				return (!k.match(/Sync$/) || !(k.replace(/Sync$/,"") in o)) ;
			};
		}

		if (!suffix)
			suffix = "" ;

		var o = Object.create(obj) ;
		for (var j in o) (function(){
			var k = j ;
			try {
				if (typeof obj[k]==='function' && (!o[k+suffix] || !o[k+suffix].isAsync) && filter(k,o)) {
					o[k+suffix] = function() {
						var a = Array.prototype.slice.call(arguments) ;
						var resolver = function($return,$error) {
							var cb = function(err,ok){
								if (err)
									return $error(err) ;
								switch (arguments.length) {
								case 0: return $return() ;
								case 2: return $return(ok) ;
								default: return $return(Array.prototype.slice.call(arguments,1)) ;
								}
							} ;
							// If more args were supplied than declared, push the CB
							if (a.length > obj[k].length) {
								a.push(cb) ;
							} else {
								// Assume the CB is the final arg
								a[obj[k].length-1] = cb ;
							}
							var ret = obj[k].apply(obj,a) ;
						} ;
						return new promiseProvider(resolver) ;
					}
					o[k+suffix].isAsync = true ;
				}
			} catch (ex) {
				// Log the fact that we couldn't augment this member??
			}
		})() ;
		o["super"] = obj ;
		return o ;
	}
};

function prettyPrint(pr,opts) {
	var map ;
	var filepath = pr.filename.split("/") ;
	var filename = filepath.pop() ;

	var out = outputCode(pr.ast,(opts && opts.sourcemap)?{map:{
		startLine: opts.mapStartLine || 0,
		file: filename+"(original)",
		sourceMapRoot: filepath.join("/"),
		sourceContent: pr.origCode
	}}:null, pr.origCode) ;

	if (opts && opts.sourcemap){
	    try {
	        var mapUrl = "" ;
	        var jsmap = out.map.toJSON();
	        if (jsmap) {
	            // require an expression to defeat browserify
	            var SourceMapConsumer = require('source-map').SourceMapConsumer;
	            pr.sourcemap = jsmap ;
	            smCache[pr.filename] = {map:jsmap,smc:new SourceMapConsumer(jsmap)} ;
	            mapUrl = "\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,"
	                +btoa(JSON.stringify(jsmap))+"\n" ;
	        }
	        pr.code = out.code+mapUrl ;
	    } catch (ex) {
	        pr.code = out ;
	    }
	} else {
        pr.code = out ;
	}
	return pr ;
}

function parseCode(code,origFilename,__sourceMapping,opts) {
	if (typeof __sourceMapping==="object" && opts===undefined)
		opts = __sourceMapping ;

	var r = { origCode:code.toString(), filename:origFilename } ;
	try {
		r.ast = parser.parse(r.origCode, opts && opts.parser) ;
		if (opts.babelTree) {
			parser.treeWalker(r.ast,function(node,descend,path){
				if (node.type==='Literal')
					path[0].replace(treeSurgeon.babelLiteralNode(node.value)) ;
				descend() ;
			}) ;
		}
		return r ;
	} catch (ex) {
		if (ex instanceof SyntaxError) {
			var l = r.origCode.substr(ex.pos-ex.loc.column) ;
			l = l.split("\n")[0] ;
			ex.message += " "+origFilename+" (nodent)\n"+l+"\n"+l.replace(/[\S ]/g,"-").substring(0,ex.loc.column)+"^" ;
			ex.stack = "" ;
		}
		throw ex ;
	}
}

function $asyncbind(self,catcher) {
	var resolver = this ;
	if (catcher) {
		if ($asyncbind.wrapAsyncStack)
			catcher = $asyncbind.wrapAsyncStack(catcher) ;
		var thenable = function thenable(result,error){
			try {
				return (result instanceof Object) && ('then' in result) && typeof result.then==="function"
					? result.then(thenable,catcher) : resolver.call(self,result,error||catcher);
			} catch (ex) {
				return (error||catcher)(ex);
			}
		} ;
		thenable.then = thenable ;
		return thenable ;
	} else {
		var then = function(result,error) {
			return resolver.call(self,result,error) ;
		} ;
		then.then = then ;
		return then ;
	}
}

function wrapAsyncStack(catcher) {
	var context = {} ;
	Error.captureStackTrace(context,$asyncbind) ;
	return function wrappedCatch(ex){
		if (ex instanceof Error && context) {
			try {
				ex.stack = //+= "\n\t...\n"+
					ex.stack.split("\n").slice(0,3)
					.filter(function(s){
						return !s.match(/^\s*at.*nodent\.js/) ;
					}).join("\n")+
					ex.stack.split("\n").slice(3).map(function(s){return "\n    "+s}).join("")+
					context.stack.split("\n").slice(2)
					.filter(function(s){
						return !s.match(/^\s*at.*nodent\.js/) ;
					})
					.map(function(s,idx){
						return idx?"\n"+s:s.replace(/^(\s*)at /g,"\n$1await ")
					}).join("") ;
			} catch (stackError) {
				// Just fall through and don't modify the stack
			}
			context = null ;
		}
		return catcher.call(this,ex) ;
	} ;
}

function $asyncspawn(promiseProvider,self) {
	var genF = this ;
    return new promiseProvider(function enough(resolve, reject) {
        var gen = genF.call(self, resolve, reject);
        function step(fn,arg) {
            var next;
            try {
                next = fn.call(gen,arg);
	            if(next.done) {
	            	if (next.value !== resolve) {
	    	            if (next.value && next.value===next.value.then)
	    	            	return next.value(resolve,reject) ;
		            	resolve && resolve(next.value);
		            	resolve = null ;
	            	}
	                return;
	            }

	            if (next.value.then) {
		            next.value.then(function(v) {
		                step(gen.next,v);
		            }, function(e) {
		                step(gen.throw,e);
		            });
	            } else {
	            	step(gen.next,next.value);
	            }
            } catch(e) {
            	reject && reject(e);
            	reject = null ;
                return;
            }
        }
        step(gen.next);
    });
}

function Thenable(thenable) {
	return thenable.then = thenable ;
};
Thenable.resolve = function(v){
	return ((v instanceof Object) && ('then' in v) && typeof v.then==="function")?v:{then:function(resolve){return resolve(v)}};
};

function isThenable(obj) {
	return (obj instanceof Object) && ('then' in obj) && typeof obj.then==="function";
}

/* NodentCompiler prototypes, that refer to 'this' */
function requireCover(cover,opts) {
	if (!this.covers[cover]) {
		if (cover.indexOf("/")>=0)
			this.covers[cover] = require(cover) ;
		else
			this.covers[cover] = require("./covers/"+cover);
	}
	return this.covers[cover](this,opts) ;
}

function compile(code,origFilename,__sourceMapping,opts) {
	if (typeof __sourceMapping==="object" && opts===undefined)
		opts = __sourceMapping ;

	opts = opts || {} ;

	// Fill in any default codeGen options
	for (var k in defaultCodeGenOpts) {
		if (!(k in opts))
			opts[k] = defaultCodeGenOpts[k] ;
	}

	var pr = this.parse(code,origFilename,null,opts);
	this.asynchronize(pr,null,opts,this.log || noLogger) ;
	this.prettyPrint(pr,opts) ;
	return pr ;
}

function generateRequestHandler(path, matchRegex, options) {
	var cache = {} ;
	var compiler = this ;

	if (!matchRegex)
		matchRegex = /\.njs$/ ;
	if (!options)
		options = {compiler:{}} ;
	else if (!options.compiler)
		options.compiler = {} ;
	var compilerOptions = copyObj([initialCodeGenOpts,options.compiler]) ;

	return function (req, res, next) {
		if (cache[req.url]) {
			res.setHeader("Content-Type", cache[req.url].contentType);
			options.setHeaders && options.setHeaders(res) ;
			res.write(cache[req.url].output) ;
			res.end();
			return ;
		}

		if (!req.url.match(matchRegex) && !(options.htmlScriptRegex && req.url.match(options.htmlScriptRegex))) {
			return next && next() ;
		}

		function sendException(ex) {
			res.statusCode = 500 ;
			res.write(ex.toString()) ;
			res.end() ;
		}

		var filename = path+req.url ;
		if (options.extensions && !fs.existsSync(filename)) {
			for (var i=0; i<options.extensions.length; i++) {
				if (fs.existsSync(filename+"."+options.extensions[i])) {
					filename = filename+"."+options.extensions[i] ;
					break ;
				}
			}
		}
		fs.readFile(filename,function(err,content){
			if (err) {
				return sendException(err) ;
			} else {
				try {
					var pr,contentType ;
					if (options.htmlScriptRegex && req.url.match(options.htmlScriptRegex)) {
						pr = require('./htmlScriptParser')(compiler,content.toString(),req.url,options) ;
						contentType = "text/html" ;
					} else {
						if (options.runtime) {
							pr = "Function.prototype."+compilerOptions.$asyncbind+" = "+$asyncbind.toString()+";" ;
							if (compilerOptions.generators)
								pr += "Function.prototype."+compilerOptions.$asyncspawn+" = "+$asyncspawn.toString()+";" ;
							if (compilerOptions.wrapAwait && !compilerOptions.promises)
								pr += "Object."+compilerOptions.$makeThenable+" = "+Thenable.resolve.toString()+";" ;
							compilerOptions.mapStartLine = pr.split("\n").length ;
							pr += "\n";
						} else {
							pr = "" ;
						}
						pr += compiler.compile(content.toString(),req.url,null,compilerOptions).code;
						contentType = "application/javascript" ;
					}
					res.setHeader("Content-Type", contentType);
					if (options.enableCache)
						cache[req.url] = {output:pr,contentType:contentType} ;
					options.setHeaders && options.setHeaders(res) ;
					res.write(pr) ;
					res.end();
				} catch (ex) {
					return sendException(ex) ;
				}
			}
		}) ;
	};
};

function NodentCompiler(members) {
	this.covers = {} ;
	this._ident = NodentCompiler.prototype.version+"_"+Math.random() ;
	this.setOptions(members) ;
}

NodentCompiler.prototype.setOptions = function(members){
	this.log = members.log===false?noLogger:members.log||this.log;
	this.options = copyObj([this.options,members]) ;
	delete this.options.log ;
	return this ;
};
NodentCompiler.prototype.version =  require("./package.json").version ;
NodentCompiler.prototype.Thenable =  Thenable ;
NodentCompiler.prototype.isThenable =  isThenable ;
NodentCompiler.prototype.asyncify =  asyncify ;
NodentCompiler.prototype.require =  requireCover ;
NodentCompiler.prototype.generateRequestHandler = generateRequestHandler ;
// Exported so they can be transported to a client
NodentCompiler.prototype.$asyncspawn =  $asyncspawn ;
NodentCompiler.prototype.$asyncbind =  $asyncbind ;
// Exported ; but not to be used lightly!
NodentCompiler.prototype.parse = parseCode ;
NodentCompiler.prototype.compile =  compile ;
NodentCompiler.prototype.asynchronize =  treeSurgeon.asynchronize ;
NodentCompiler.prototype.prettyPrint =  prettyPrint ;
NodentCompiler.prototype.parseCompilerOptions =  parseCompilerOptions ;
NodentCompiler.prototype.getDefaultCompileOptions = undefined ;

Object.defineProperty(NodentCompiler.prototype,"Promise",{
	get:function (){
		initOpts.log("Warning: nodent.Promise is deprecated. Use nodent.Thenable instead");
		return Thenable;
	},
	enumerable:false,
	configurable:false
}) ;

function prepareMappedStackTrace(error, stack) {
	function mappedTrace(frame) {
		var source = frame.getFileName();
		if (source && smCache[source]) {
			var position = smCache[source].smc.originalPositionFor({
				line: frame.getLineNumber(),
				column: frame.getColumnNumber()
			});
			if (position && position.line) {
				var desc = frame.toString() ;
				return '\n    at '
					+ desc.substring(0,desc.length-1)
					+ " => \u2026"+position.source+":"+position.line+":"+position.column
					+ (frame.getFunctionName()?")":"");
			}
		}
		return '\n    at '+frame;
	}
	return error + stack.map(mappedTrace).join('');
}

// Set the 'global' references to the (backward-compatible) versions
// required by the current version of Nodent
function setGlobalEnvironment(initOpts) {
	var codeGenOpts = defaultCodeGenOpts ;
	/*
	Object.$makeThenable
	Object.prototype.isThenable
	Object.prototype.asyncify
	Function.prototype.noDentify
	Function.prototype.$asyncspawn
	Function.prototype.$asyncbind
	Error.prepareStackTrace
	global[defaultCodeGenOpts.$error]
	*/

	var augmentFunction = {} ;
	augmentFunction[defaultCodeGenOpts.$asyncbind] = {
		value:$asyncbind,
		writable:true,
		enumerable:false,
		configurable:true
	};
	augmentFunction[defaultCodeGenOpts.$asyncspawn] = {
		value:$asyncspawn,
		writable:true,
		enumerable:false,
		configurable:true
	};
	augmentFunction.noDentify = {
		value:noDentify,
		configurable:true,
		enumerable:false,
		writable:true
	} ;
	Object.defineProperties(Function.prototype,augmentFunction) ;

	/**
	 * We need a global to handle funcbacks for which no error handler has ever been defined.
	 */
	if (!(defaultCodeGenOpts[defaultCodeGenOpts.$error] in global)) {
		global[defaultCodeGenOpts[defaultCodeGenOpts.$error]] = globalErrorHandler ;
	}

	if (initOpts.asyncStackTrace)
		$asyncbind.wrapAsyncStack = wrapAsyncStack ;

	// "Global" options:
	// If anyone wants to augment Object, do it. The augmentation does not depend on the config options
	if (initOpts.augmentObject) {
		Object.defineProperties(Object.prototype,{
			"asyncify":{
				value:function(promiseProvider,filter,suffix){
					return asyncify(promiseProvider)(this,filter,suffix)
				},
				writable:true,
				configurable:true
			},
			"isThenable":{
				value:function(){ return isThenable(this) },
				writable:true,
				configurable:true
			}
		}) ;
	}

	Object[defaultCodeGenOpts.$makeThenable] = Thenable.resolve ;
}

/* Construct a 'nodent' object - combining logic and options */
var compiler ;
function initialize(initOpts){
	// Validate the options
/* initOpts:{
 * 		log:function(msg),
 * 		augmentObject:boolean,
 * 		extension:string?
 * 		dontMapStackTraces:boolean
 * 		asyncStackTrace:boolean
 */
	if (!initOpts)
		initOpts = {} ;
	else {
		// Throw an error for any options we don't know about
		for (var k in initOpts) {
			if (k==="use")
				continue ; // deprecated
			if (!config.hasOwnProperty(k))
				throw new Error("NoDent: unknown option: "+k+"="+JSON.stringify(initOpts[k])) ;
		}
	}


	if (compiler) {
		compiler.setOptions(initOpts);
	} else {
		// Fill in any missing options with their default values
		Object.keys(config).forEach(function(k){
			if (!(k in initOpts))
				initOpts[k] = config[k] ;
		}) ;
		compiler = new NodentCompiler(initOpts) ;
	}

	// If anyone wants to mapStackTraces, do it. The augmentation does not depend on the config options
	if (!initOpts.dontMapStackTraces) {
		// This function is part of the V8 stack trace API, for more info see:
		// http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
		Error.prepareStackTrace = prepareMappedStackTrace ;
	}

	setGlobalEnvironment(initOpts) ;

	/* If we've not done it before, create a compiler for '.js' scripts */
	// Create a new compiler

	var nodentLoaders = [];
	function compareSemVer(a,b) {
		a = a.split('.') ;
		b = b.split('.') ;
		for (var i=0;i<3;i++) {
			if (a[i]<b[i]) return -1 ;
			if (a[i]>b[i]) return 1 ;
		}
		return 0 ;
	}

    function versionAwareNodentJSLoader(mod,filename) {
        if (filename.match(/nodent\/nodent.js$/)) {
            var downLevel = {path:filename.replace(/\/node_modules\/nodent\/nodent.js$/,"")} ;
            if (downLevel.path) {
                downLevel.version = JSON.parse(fs.readFileSync(filename.replace(/nodent\.js$/,"package.json"))).version ;
                // Load the specified nodent
                stdJSLoader(mod,filename) ;

                // If the version of nodent we've just loaded is lower than the
                // current (version-aware) version, hook the initialzer
                // so we can replace the JS loader after it's been run.
                if (compareSemVer(downLevel.version,NodentCompiler.prototype.version)<0) {
                    downLevel.originalNodentLoader = mod.exports ;
                    mod.exports = function(){
                        var previousJSLoader = require.extensions['.js'] ;
                        var defaultNodentInstance = downLevel.originalNodentLoader.apply(this,arguments) ;
                        downLevel.jsCompiler = require.extensions['.js'] ;
                        require.extensions['.js'] = previousJSLoader ;
                        setGlobalEnvironment(initOpts) ;
                        return defaultNodentInstance ;
                    } ;
                    Object.keys(downLevel.originalNodentLoader).forEach(function(k){
                        mod.exports[k] = downLevel.originalNodentLoader[k] ;
                    }) ;
                    nodentLoaders.push(downLevel) ;
                    nodentLoaders = nodentLoaders.sort(function(a,b){
                        return b.path.length - a.path.length ;
                    }) ;
                }
            }
        } else {
            // The the appropriate loader for this file
            for (var n=0; n<nodentLoaders.length; n++) {
                if (filename.slice(0,nodentLoaders[n].path.length)==nodentLoaders[n].path) {
                    //console.log("Using nodent@",nodentLoaders[n].version,"to load",filename) ;
                    return nodentLoaders[n].jsCompiler.apply(this,arguments) ;
                }
            }

            var content = stripBOM(fs.readFileSync(filename, 'utf8'));
            var parseOpts = parseCompilerOptions(content,initOpts.log) ;
            if (parseOpts) {
                return stdCompiler(mod,filename,parseOpts) ;
            }
            return stdJSLoader(mod,filename) ;
        }
    }

    function registerExtension(extension) {
        if (Array.isArray(extension))
            return extension.forEach(registerExtension) ;

        if (require.extensions[extension]) {
            var changedKeys = Object.keys(initOpts).filter(function(k){ return compiler[k] != initOpts[k]}) ;
            if (changedKeys.length) {
                initOpts.log("File extension "+extension+" already configured for async/await compilation.") ;
            }
        }
    	require.extensions[extension] = compileNodentedFile(compiler,initOpts.log) ;
    }
        
    if (!initOpts.dontInstallRequireHook) {
		if (!stdJSLoader) {
			stdJSLoader = require.extensions['.js'] ;
			var stdCompiler = compileNodentedFile(compiler,initOpts.log) ;
			require.extensions['.js'] = versionAwareNodentJSLoader ;
		}

		/* If the initOpts specified a file extension, use this compiler for it */
		if (initOpts.extension) {
			registerExtension(initOpts.extension) ;
		}
	}

	// Finally, load any required covers
	if (initOpts.use) {
		if (Array.isArray(initOpts.use)) {
			initOpts.log("Warning: nodent({use:[...]}) is deprecated. Use nodent.require(module,options)\n"+(new Error().stack).split("\n")[2]);
			if (initOpts.use.length) {
				initOpts.use.forEach(function(x){
					compiler[x] = compiler.require(x) ;
				}) ;
			}
		} else {
			initOpts.log("Warning: nodent({use:{...}}) is deprecated. Use nodent.require(module,options)\n"+(new Error().stack).split("\n")[2]);
			Object.keys(initOpts.use).forEach(function(x){
				compiler[x] = compiler.require(x,initOpts.use[x])
			}) ;
		}
	}
	return compiler ;
} ;

/* Export these so that we have the opportunity to set the options for the default .js parser */
initialize.setDefaultCompileOptions = function(compiler,env) {
	if (compiler) {
		Object.keys(compiler).forEach(function(k){
			if (!(k in defaultCodeGenOpts))
				throw new Error("NoDent: unknown compiler option: "+k) ;
			defaultCodeGenOpts[k] = compiler[k] ;
		}) ;
	}

	env && Object.keys(env).forEach(function(k){
		if (!(k in env))
			throw new Error("NoDent: unknown configuration option: "+k) ;
		config[k] = env[k] ;
	}) ;
	return initialize ;
};

initialize.setCompileOptions = function(set,compiler) {
	optionSet[set] = optionSet[set] || copyObj([defaultCodeGenOpts]);
	compiler && Object.keys(compiler).forEach(function(k){
		if (!(k in defaultCodeGenOpts))
			throw new Error("NoDent: unknown compiler option: "+k) ;
		optionSet[set][k] = compiler[k] ;
	}) ;
	return initialize ;
};

initialize.asyncify = asyncify ;
initialize.Thenable = Thenable ;

module.exports = initialize ;

/* If invoked as the top level module, read the next arg and load it */
function readStream(stream) {
    return new Thenable(function ($return, $error) {
        var buffer = [] ;
        stream.on('data',function(data){
            buffer.push(data)
        }) ;
        stream.on('end',function(){
            var code = buffer.map(function(b){ return b.toString()}).join("") ;
            return $return(code);
        }) ;
        stream.on('error',$error) ;
    }.$asyncbind(this));
}

function getCLIOpts(start) {
    var o = [] ;
    for (var i=start || 2; i<process.argv.length; i++) {
        if (process.argv[i].slice(0,2)==='--') {
            var opt = process.argv[i].slice(2).split('=') ;
            o[opt[0]] = opt[1] || true ;
        }
        else
            o.push(process.argv[i]) ;
    }
    return o ;
}

function processInput(content){
    var pr ;
    var parseOpts ;

    // Input options
    cli.use = cli.use ? '"use nodent-'+cli.use+'";' : '"use nodent";' ;
    if (cli.fromast) {
        content = JSON.parse(content) ;
        pr = { origCode:"", filename:filename, ast: content } ;
        parseOpts = parseCompilerOptions(content,nodent.log) ;
        if (!parseOpts) {
            parseOpts = parseCompilerOptions(cli.use,nodent.log) ;
            console.warn("/* "+filename+": No 'use nodent*' directive, assumed "+cli.use+" */") ;
        }
    } else {
        parseOpts = parseCompilerOptions(content,nodent.log) ;
        if (!parseOpts) {
            parseOpts = parseCompilerOptions(cli.use,nodent.log) ;
            console.warn("/* "+filename+": No 'use nodent*' directive, assumed "+cli.use+" */") ;
        }
        pr = nodent.parse(content,filename,parseOpts);
    }

    // Processing options
    if (!cli.parseast && !cli.pretty)
        nodent.asynchronize(pr,undefined,parseOpts,nodent.log) ;

    // Output options
    nodent.prettyPrint(pr,parseOpts) ;
    if (cli.out || cli.pretty) {
        console.log(pr.code) ;
    }
    if (cli.minast || cli.parseast) {
        console.log(JSON.stringify(pr.ast,function(key,value){
            return key[0]==="$" || key.match(/^(start|end|loc)$/)?undefined:value
        },2,null)) ;
    }
    if (cli.ast) {
        console.log(JSON.stringify(pr.ast,function(key,value){ return key[0]==="$"?undefined:value},0)) ;
    }
    if (cli.exec) {
        (new Function(pr.code))() ;
    }
}

if (require.main===module && process.argv.length>=3) {
	var path = require('path') ;
	var initOpts = (process.env.NODENT_OPTS && JSON.parse(process.env.NODENT_OPTS)) || {};
	var filename, cli = getCLIOpts() ;
	initialize.setDefaultCompileOptions({
		sourcemap:cli.sourcemap,
		wrapAwait:cli.wrapAwait
	});

	var nodent = initialize({
		augmentObject:true
	}) ;

	if (!cli.fromast && !cli.parseast && !cli.pretty && !cli.out && !cli.ast && !cli.minast && !cli.exec) {
		// No input/output options - just require the
		// specified module now we've initialized nodent
		try {
			var mod = path.resolve(cli[0]) ;
			return require(mod);
		} catch (ex) {
			ex.message = cli[0]+": "+ex.message ;
			throw ex ;
		}
	}

	if (cli.length==0 || cli[0]==='-') {
		filename = "(stdin)" ;
		return readStream(process.stdin).then(processInput,globalErrorHandler) ;
	} else {
		filename = path.resolve(cli[0]) ;
		return processInput(stripBOM(fs.readFileSync(filename, 'utf8'))) ;
	}
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/nodent")
},{"./htmlScriptParser":8,"./lib/arboriculture":9,"./lib/output":10,"./lib/parser":11,"./package.json":26,"_process":7,"buffer":2,"fs":1,"path":6,"source-map":25}]},{},[]);
