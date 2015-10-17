(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * @class d3plus
 */
var d3plus, message, stylesheet;

d3plus = {};

if (typeof window !== "undefined") {
  window.d3plus = d3plus;
}

module.exports = d3plus;


/**
 * The current version of **D3plus** you are using. Returns a string in
 * [semantic versioning](http://semver.org/) format.
 * @property d3plus.version
 * @for d3plus
 * @type String
 * @static
 */

d3plus.version = "1.7.0 - Viridian";


/**
 * The URL for the repo, used internally for certain error messages.
 * @property d3plus.repo
 * @for d3plus
 * @type String
 * @static
 */

d3plus.repo = "https://github.com/alexandersimoes/d3plus/";


/**
 * Utilities related to modifying arrays.
 * @class d3plus.array
 * @for d3plus
 * @static
 */

d3plus.array = {
  comparator: require("./array/comparator.coffee"),
  contains: require("./array/contains.coffee"),
  sort: require("./array/sort.coffee"),
  update: require("./array/update.coffee")
};


/**
 * Utilities related to the client's browser.
 * @class d3plus.client
 * @for d3plus
 * @static
 */

d3plus.client = {
  css: require("./client/css.coffee"),
  ie: require("./client/ie.js"),
  pointer: require("./client/pointer.coffee"),
  prefix: require("./client/prefix.coffee"),
  rtl: require("./client/rtl.coffee"),
  scrollbar: require("./client/scrollbar.coffee"),
  touch: require("./client/touch.coffee")
};


/**
 * Utilities related to color manipulation.
 * @class d3plus.color
 * @for d3plus
 * @static
 */

d3plus.color = {
  legible: require("./color/legible.coffee"),
  lighter: require("./color/lighter.coffee"),
  mix: require("./color/mix.coffee"),
  random: require("./color/random.coffee"),
  scale: require("./color/scale.coffee"),
  sort: require("./color/sort.coffee"),
  text: require("./color/text.coffee"),
  validate: require("./color/validate.coffee")
};


/**
 * Utilities related to manipulating data.
 * @class d3plus.data
 * @for d3plus
 * @static
 */

d3plus.data = {
  bestRegress: require("./data/bestRegress.coffee"),
  lof: require("./data/lof.coffee"),
  mad: require("./data/mad.coffee")
};


/**
 * Utilities related to fonts.
 * @class d3plus.font
 * @for d3plus
 * @static
 */

d3plus.font = {
  sizes: require("./font/sizes.coffee"),
  validate: require("./font/validate.coffee")
};


/**
 * D3plus Forms
 * @class d3plus.form
 * @for d3plus
 */

d3plus.form = require("./form/form.js");


/**
 * Utilities related to geometric algorithms.
 * @class d3plus.geom
 * @for d3plus
 * @static
 */

d3plus.geom = {
  largestRect: require("./geom/largestRect.coffee"),
  offset: require("./geom/offset.coffee"),
  path2poly: require("./geom/path2poly.coffee")
};


/**
 * Utilities related to network graphs.
 * @class d3plus.network
 * @for d3plus
 * @static
 */

d3plus.network = {
  cluster: require("./network/cluster.coffee"),
  distance: require("./network/distance.coffee"),
  normalize: require("./network/normalize.coffee"),
  shortestPath: require("./network/shortestPath.coffee"),
  smallestGap: require("./network/smallestGap.coffee"),
  subgraph: require("./network/subgraph.coffee")
};


/**
 * Utilities that process numbers.
 * @class d3plus.number
 * @for d3plus
 * @static
 */

d3plus.number = {
  format: require("./number/format.coffee")
};


/**
 * D3plus features a set of methods that relate to various object properties. These methods may be used outside of the normal constraints of the visualizations.
 * @class d3plus.object
 * @for d3plus
 * @static
 */

d3plus.object = {
  merge: require("./object/merge.coffee"),
  validate: require("./object/validate.coffee")
};


/**
 * Utilities that process strings.
 * @class d3plus.string
 * @for d3plus
 * @static
 */

d3plus.string = {
  format: require("./string/format.js"),
  list: require("./string/list.coffee"),
  strip: require("./string/strip.js"),
  title: require("./string/title.coffee")
};


/**
 * D3plus SVG Textwrapping
 * @class d3plus.textwrap
 * @for d3plus
 */

d3plus.textwrap = require("./textwrap/textwrap.coffee");


/**
 * D3plus Tooltips
 * @class d3plus.tooltip
 * @for d3plus
 */

d3plus.tooltip = {
  create: require("./tooltip/create.js"),
  move: require("./tooltip/move.coffee"),
  remove: require("./tooltip/remove.coffee")
};


/**
 * D3plus features Utilities that can be used to help with some common javascript processes.
 * @class d3plus.util
 * @for d3plus
 * @static
 */

d3plus.util = {
  buckets: require("./util/buckets.coffee"),
  child: require("./util/child.coffee"),
  closest: require("./util/closest.coffee"),
  copy: require("./util/copy.coffee"),
  d3selection: require("./util/d3selection.coffee"),
  dataurl: require("./util/dataURL.coffee"),
  uniques: require("./util/uniques.coffee")
};


/**
 * D3plus Visualizations
 * @class d3plus.viz
 * @for d3plus
 */

d3plus.viz = require("./viz/viz.coffee");

stylesheet = require("./client/css.coffee");

message = require("./core/console/print.coffee");

if (stylesheet("d3plus.css")) {
  message.warning("d3plus.css has been deprecated, you do not need to load this file.", d3plus.repo + "releases/tag/v1.4.0");
}



},{"./array/comparator.coffee":35,"./array/contains.coffee":36,"./array/sort.coffee":37,"./array/update.coffee":38,"./client/css.coffee":39,"./client/ie.js":40,"./client/pointer.coffee":41,"./client/prefix.coffee":42,"./client/rtl.coffee":43,"./client/scrollbar.coffee":44,"./client/touch.coffee":45,"./color/legible.coffee":46,"./color/lighter.coffee":47,"./color/mix.coffee":48,"./color/random.coffee":49,"./color/scale.coffee":50,"./color/sort.coffee":51,"./color/text.coffee":52,"./color/validate.coffee":53,"./core/console/print.coffee":54,"./data/bestRegress.coffee":94,"./data/lof.coffee":95,"./data/mad.coffee":96,"./font/sizes.coffee":97,"./font/validate.coffee":98,"./form/form.js":99,"./geom/largestRect.coffee":155,"./geom/offset.coffee":156,"./geom/path2poly.coffee":157,"./network/cluster.coffee":158,"./network/distance.coffee":159,"./network/normalize.coffee":160,"./network/shortestPath.coffee":161,"./network/smallestGap.coffee":162,"./network/subgraph.coffee":163,"./number/format.coffee":164,"./object/merge.coffee":165,"./object/validate.coffee":166,"./string/format.js":167,"./string/list.coffee":168,"./string/strip.js":169,"./string/title.coffee":170,"./textwrap/textwrap.coffee":194,"./tooltip/create.js":195,"./tooltip/move.coffee":196,"./tooltip/remove.coffee":197,"./util/buckets.coffee":198,"./util/child.coffee":199,"./util/closest.coffee":200,"./util/copy.coffee":201,"./util/d3selection.coffee":202,"./util/dataURL.coffee":203,"./util/uniques.coffee":204,"./viz/viz.coffee":319}],2:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff
var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

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
function Buffer (subject, encoding) {
  var self = this
  if (!(self instanceof Buffer)) return new Buffer(subject, encoding)

  var type = typeof subject
  var length

  if (type === 'number') {
    length = +subject
  } else if (type === 'string') {
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) {
    // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data)) subject = subject.data
    length = +subject.length
  } else {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (length > kMaxLength) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' +
      kMaxLength.toString(16) + ' bytes')
  }

  if (length < 0) length = 0
  else length >>>= 0 // coerce to uint32

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    self = Buffer._augment(new Uint8Array(length)) // eslint-disable-line consistent-this
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    self.length = length
    self._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    self._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++) {
        self[i] = subject.readUInt8(i)
      }
    } else {
      for (i = 0; i < length; i++) {
        self[i] = ((subject[i] % 256) + 256) % 256
      }
    }
  } else if (type === 'string') {
    self.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT) {
    for (i = 0; i < length; i++) {
      self[i] = 0
    }
  }

  if (length > 0 && length <= Buffer.poolSize) self.parent = rootParent

  return self
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
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
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

Buffer.concat = function concat (list, totalLength) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function byteLength (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function toString (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

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

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
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
  var charsWritten = blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0

  if (length < 0 || offset < 0 || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
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
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
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
    newBuf = Buffer._augment(this.subarray(start, end))
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
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) >>> 0 & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) >>> 0 & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
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
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
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
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkInt(
      this, value, offset, byteLength,
      Math.pow(2, 8 * byteLength - 1) - 1,
      -Math.pow(2, 8 * byteLength - 1)
    )
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
  offset = offset >>> 0
  if (!noAssert) {
    checkInt(
      this, value, offset, byteLength,
      Math.pow(2, 8 * byteLength - 1) - 1,
      -Math.pow(2, 8 * byteLength - 1)
    )
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
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
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
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
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
Buffer.prototype.copy = function copy (target, target_start, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (target_start >= target.length) target_start = target.length
  if (!target_start) target_start = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (target_start < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - target_start < end - start) {
    end = target.length - target_start + start
  }

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
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

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

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

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
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
  var i = 0

  for (; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (leadSurrogate) {
        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          leadSurrogate = codePoint
          continue
        } else {
          // valid surrogate pair
          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
          leadSurrogate = null
        }
      } else {
        // no lead yet

        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else {
          // valid lead
          leadSurrogate = codePoint
          continue
        }
      }
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
      leadSurrogate = null
    }

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
    } else if (codePoint < 0x200000) {
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

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":3,"ieee754":4,"is-array":5}],3:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
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
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

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
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

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
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],4:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

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

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],5:[function(require,module,exports){

/**
 * isArray
 */

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
  return !! val && '[object Array]' == str.call(val);
};

},{}],6:[function(require,module,exports){
module.exports = require('./lib/heap');

},{"./lib/heap":7}],7:[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory();
    } else {
      return root.Heap = factory();
    }
  })(this, function() {
    return Heap;
  });

}).call(this);

},{}],8:[function(require,module,exports){
(function (global){
"use strict";

var numeric = (typeof exports === "undefined")?(function numeric() {}):(exports);
if(typeof global !== "undefined") { global.numeric = numeric; }

numeric.version = "1.2.6";

// 1. Utility functions
numeric.bench = function bench (f,interval) {
    var t1,t2,n,i;
    if(typeof interval === "undefined") { interval = 15; }
    n = 0.5;
    t1 = new Date();
    while(1) {
        n*=2;
        for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
        while(i>0) { f(); i--; }
        t2 = new Date();
        if(t2-t1 > interval) break;
    }
    for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
    while(i>0) { f(); i--; }
    t2 = new Date();
    return 1000*(3*n-1)/(t2-t1);
}

numeric._myIndexOf = (function _myIndexOf(w) {
    var n = this.length,k;
    for(k=0;k<n;++k) if(this[k]===w) return k;
    return -1;
});
numeric.myIndexOf = (Array.prototype.indexOf)?Array.prototype.indexOf:numeric._myIndexOf;

numeric.Function = Function;
numeric.precision = 4;
numeric.largeArray = 50;

numeric.prettyPrint = function prettyPrint(x) {
    function fmtnum(x) {
        if(x === 0) { return '0'; }
        if(isNaN(x)) { return 'NaN'; }
        if(x<0) { return '-'+fmtnum(-x); }
        if(isFinite(x)) {
            var scale = Math.floor(Math.log(x) / Math.log(10));
            var normalized = x / Math.pow(10,scale);
            var basic = normalized.toPrecision(numeric.precision);
            if(parseFloat(basic) === 10) { scale++; normalized = 1; basic = normalized.toPrecision(numeric.precision); }
            return parseFloat(basic).toString()+'e'+scale.toString();
        }
        return 'Infinity';
    }
    var ret = [];
    function foo(x) {
        var k;
        if(typeof x === "undefined") { ret.push(Array(numeric.precision+8).join(' ')); return false; }
        if(typeof x === "string") { ret.push('"'+x+'"'); return false; }
        if(typeof x === "boolean") { ret.push(x.toString()); return false; }
        if(typeof x === "number") {
            var a = fmtnum(x);
            var b = x.toPrecision(numeric.precision);
            var c = parseFloat(x.toString()).toString();
            var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
            for(k=1;k<d.length;k++) { if(d[k].length < a.length) a = d[k]; }
            ret.push(Array(numeric.precision+8-a.length).join(' ')+a);
            return false;
        }
        if(x === null) { ret.push("null"); return false; }
        if(typeof x === "function") { 
            ret.push(x.toString());
            var flag = false;
            for(k in x) { if(x.hasOwnProperty(k)) { 
                if(flag) ret.push(',\n');
                else ret.push('\n{');
                flag = true; 
                ret.push(k); 
                ret.push(': \n'); 
                foo(x[k]); 
            } }
            if(flag) ret.push('}\n');
            return true;
        }
        if(x instanceof Array) {
            if(x.length > numeric.largeArray) { ret.push('...Large Array...'); return true; }
            var flag = false;
            ret.push('[');
            for(k=0;k<x.length;k++) { if(k>0) { ret.push(','); if(flag) ret.push('\n '); } flag = foo(x[k]); }
            ret.push(']');
            return true;
        }
        ret.push('{');
        var flag = false;
        for(k in x) { if(x.hasOwnProperty(k)) { if(flag) ret.push(',\n'); flag = true; ret.push(k); ret.push(': \n'); foo(x[k]); } }
        ret.push('}');
        return true;
    }
    foo(x);
    return ret.join('');
}

numeric.parseDate = function parseDate(d) {
    function foo(d) {
        if(typeof d === 'string') { return Date.parse(d.replace(/-/g,'/')); }
        if(!(d instanceof Array)) { throw new Error("parseDate: parameter must be arrays of strings"); }
        var ret = [],k;
        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
        return ret;
    }
    return foo(d);
}

numeric.parseFloat = function parseFloat_(d) {
    function foo(d) {
        if(typeof d === 'string') { return parseFloat(d); }
        if(!(d instanceof Array)) { throw new Error("parseFloat: parameter must be arrays of strings"); }
        var ret = [],k;
        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
        return ret;
    }
    return foo(d);
}

numeric.parseCSV = function parseCSV(t) {
    var foo = t.split('\n');
    var j,k;
    var ret = [];
    var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
    var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
    var stripper = function(n) { return n.substr(0,n.length-1); }
    var count = 0;
    for(k=0;k<foo.length;k++) {
      var bar = (foo[k]+",").match(pat),baz;
      if(bar.length>0) {
          ret[count] = [];
          for(j=0;j<bar.length;j++) {
              baz = stripper(bar[j]);
              if(patnum.test(baz)) { ret[count][j] = parseFloat(baz); }
              else ret[count][j] = baz;
          }
          count++;
      }
    }
    return ret;
}

numeric.toCSV = function toCSV(A) {
    var s = numeric.dim(A);
    var i,j,m,n,row,ret;
    m = s[0];
    n = s[1];
    ret = [];
    for(i=0;i<m;i++) {
        row = [];
        for(j=0;j<m;j++) { row[j] = A[i][j].toString(); }
        ret[i] = row.join(', ');
    }
    return ret.join('\n')+'\n';
}

numeric.getURL = function getURL(url) {
    var client = new XMLHttpRequest();
    client.open("GET",url,false);
    client.send();
    return client;
}

numeric.imageURL = function imageURL(img) {
    function base64(A) {
        var n = A.length, i,x,y,z,p,q,r,s;
        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var ret = "";
        for(i=0;i<n;i+=3) {
            x = A[i];
            y = A[i+1];
            z = A[i+2];
            p = x >> 2;
            q = ((x & 3) << 4) + (y >> 4);
            r = ((y & 15) << 2) + (z >> 6);
            s = z & 63;
            if(i+1>=n) { r = s = 64; }
            else if(i+2>=n) { s = 64; }
            ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
            }
        return ret;
    }
    function crc32Array (a,from,to) {
        if(typeof from === "undefined") { from = 0; }
        if(typeof to === "undefined") { to = a.length; }
        var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
                     0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 
                     0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
                     0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 
                     0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 
                     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 
                     0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
                     0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
                     0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
                     0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 
                     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 
                     0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 
                     0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 
                     0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 
                     0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 
                     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 
                     0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 
                     0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 
                     0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 
                     0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 
                     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 
                     0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 
                     0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 
                     0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 
                     0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 
                     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 
                     0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 
                     0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 
                     0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 
                     0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 
                     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 
                     0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
     
        var crc = -1, y = 0, n = a.length,i;

        for (i = from; i < to; i++) {
            y = (crc ^ a[i]) & 0xFF;
            crc = (crc >>> 8) ^ table[y];
        }
     
        return crc ^ (-1);
    }

    var h = img[0].length, w = img[0][0].length, s1, s2, next,k,length,a,b,i,j,adler32,crc32;
    var stream = [
                  137, 80, 78, 71, 13, 10, 26, 10,                           //  0: PNG signature
                  0,0,0,13,                                                  //  8: IHDR Chunk length
                  73, 72, 68, 82,                                            // 12: "IHDR" 
                  (w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w&255,   // 16: Width
                  (h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h&255,   // 20: Height
                  8,                                                         // 24: bit depth
                  2,                                                         // 25: RGB
                  0,                                                         // 26: deflate
                  0,                                                         // 27: no filter
                  0,                                                         // 28: no interlace
                  -1,-2,-3,-4,                                               // 29: CRC
                  -5,-6,-7,-8,                                               // 33: IDAT Chunk length
                  73, 68, 65, 84,                                            // 37: "IDAT"
                  // RFC 1950 header starts here
                  8,                                                         // 41: RFC1950 CMF
                  29                                                         // 42: RFC1950 FLG
                  ];
    crc32 = crc32Array(stream,12,29);
    stream[29] = (crc32>>24)&255;
    stream[30] = (crc32>>16)&255;
    stream[31] = (crc32>>8)&255;
    stream[32] = (crc32)&255;
    s1 = 1;
    s2 = 0;
    for(i=0;i<h;i++) {
        if(i<h-1) { stream.push(0); }
        else { stream.push(1); }
        a = (3*w+1+(i===0))&255; b = ((3*w+1+(i===0))>>8)&255;
        stream.push(a); stream.push(b);
        stream.push((~a)&255); stream.push((~b)&255);
        if(i===0) stream.push(0);
        for(j=0;j<w;j++) {
            for(k=0;k<3;k++) {
                a = img[k][i][j];
                if(a>255) a = 255;
                else if(a<0) a=0;
                else a = Math.round(a);
                s1 = (s1 + a )%65521;
                s2 = (s2 + s1)%65521;
                stream.push(a);
            }
        }
        stream.push(0);
    }
    adler32 = (s2<<16)+s1;
    stream.push((adler32>>24)&255);
    stream.push((adler32>>16)&255);
    stream.push((adler32>>8)&255);
    stream.push((adler32)&255);
    length = stream.length - 41;
    stream[33] = (length>>24)&255;
    stream[34] = (length>>16)&255;
    stream[35] = (length>>8)&255;
    stream[36] = (length)&255;
    crc32 = crc32Array(stream,37);
    stream.push((crc32>>24)&255);
    stream.push((crc32>>16)&255);
    stream.push((crc32>>8)&255);
    stream.push((crc32)&255);
    stream.push(0);
    stream.push(0);
    stream.push(0);
    stream.push(0);
//    a = stream.length;
    stream.push(73);  // I
    stream.push(69);  // E
    stream.push(78);  // N
    stream.push(68);  // D
    stream.push(174); // CRC1
    stream.push(66);  // CRC2
    stream.push(96);  // CRC3
    stream.push(130); // CRC4
    return 'data:image/png;base64,'+base64(stream);
}

// 2. Linear algebra with Arrays.
numeric._dim = function _dim(x) {
    var ret = [];
    while(typeof x === "object") { ret.push(x.length); x = x[0]; }
    return ret;
}

numeric.dim = function dim(x) {
    var y,z;
    if(typeof x === "object") {
        y = x[0];
        if(typeof y === "object") {
            z = y[0];
            if(typeof z === "object") {
                return numeric._dim(x);
            }
            return [x.length,y.length];
        }
        return [x.length];
    }
    return [];
}

numeric.mapreduce = function mapreduce(body,init) {
    return Function('x','accum','_s','_k',
            'if(typeof accum === "undefined") accum = '+init+';\n'+
            'if(typeof x === "number") { var xi = x; '+body+'; return accum; }\n'+
            'if(typeof _s === "undefined") _s = numeric.dim(x);\n'+
            'if(typeof _k === "undefined") _k = 0;\n'+
            'var _n = _s[_k];\n'+
            'var i,xi;\n'+
            'if(_k < _s.length-1) {\n'+
            '    for(i=_n-1;i>=0;i--) {\n'+
            '        accum = arguments.callee(x[i],accum,_s,_k+1);\n'+
            '    }'+
            '    return accum;\n'+
            '}\n'+
            'for(i=_n-1;i>=1;i-=2) { \n'+
            '    xi = x[i];\n'+
            '    '+body+';\n'+
            '    xi = x[i-1];\n'+
            '    '+body+';\n'+
            '}\n'+
            'if(i === 0) {\n'+
            '    xi = x[i];\n'+
            '    '+body+'\n'+
            '}\n'+
            'return accum;'
            );
}
numeric.mapreduce2 = function mapreduce2(body,setup) {
    return Function('x',
            'var n = x.length;\n'+
            'var i,xi;\n'+setup+';\n'+
            'for(i=n-1;i!==-1;--i) { \n'+
            '    xi = x[i];\n'+
            '    '+body+';\n'+
            '}\n'+
            'return accum;'
            );
}


numeric.same = function same(x,y) {
    var i,n;
    if(!(x instanceof Array) || !(y instanceof Array)) { return false; }
    n = x.length;
    if(n !== y.length) { return false; }
    for(i=0;i<n;i++) {
        if(x[i] === y[i]) { continue; }
        if(typeof x[i] === "object") { if(!same(x[i],y[i])) return false; }
        else { return false; }
    }
    return true;
}

numeric.rep = function rep(s,v,k) {
    if(typeof k === "undefined") { k=0; }
    var n = s[k], ret = Array(n), i;
    if(k === s.length-1) {
        for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
        if(i===-1) { ret[0] = v; }
        return ret;
    }
    for(i=n-1;i>=0;i--) { ret[i] = numeric.rep(s,v,k+1); }
    return ret;
}


numeric.dotMMsmall = function dotMMsmall(x,y) {
    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
    p = x.length; q = y.length; r = y[0].length;
    ret = Array(p);
    for(i=p-1;i>=0;i--) {
        foo = Array(r);
        bar = x[i];
        for(k=r-1;k>=0;k--) {
            woo = bar[q-1]*y[q-1][k];
            for(j=q-2;j>=1;j-=2) {
                i0 = j-1;
                woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
            }
            if(j===0) { woo += bar[0]*y[0][k]; }
            foo[k] = woo;
        }
        ret[i] = foo;
    }
    return ret;
}
numeric._getCol = function _getCol(A,j,x) {
    var n = A.length, i;
    for(i=n-1;i>0;--i) {
        x[i] = A[i][j];
        --i;
        x[i] = A[i][j];
    }
    if(i===0) x[0] = A[0][j];
}
numeric.dotMMbig = function dotMMbig(x,y){
    var gc = numeric._getCol, p = y.length, v = Array(p);
    var m = x.length, n = y[0].length, A = new Array(m), xj;
    var VV = numeric.dotVV;
    var i,j,k,z;
    --p;
    --m;
    for(i=m;i!==-1;--i) A[i] = Array(n);
    --n;
    for(i=n;i!==-1;--i) {
        gc(y,i,v);
        for(j=m;j!==-1;--j) {
            z=0;
            xj = x[j];
            A[j][i] = VV(xj,v);
        }
    }
    return A;
}

numeric.dotMV = function dotMV(x,y) {
    var p = x.length, q = y.length,i;
    var ret = Array(p), dotVV = numeric.dotVV;
    for(i=p-1;i>=0;i--) { ret[i] = dotVV(x[i],y); }
    return ret;
}

numeric.dotVM = function dotVM(x,y) {
    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
    p = x.length; q = y[0].length;
    ret = Array(q);
    for(k=q-1;k>=0;k--) {
        woo = x[p-1]*y[p-1][k];
        for(j=p-2;j>=1;j-=2) {
            i0 = j-1;
            woo += x[j]*y[j][k] + x[i0]*y[i0][k];
        }
        if(j===0) { woo += x[0]*y[0][k]; }
        ret[k] = woo;
    }
    return ret;
}

numeric.dotVV = function dotVV(x,y) {
    var i,n=x.length,i1,ret = x[n-1]*y[n-1];
    for(i=n-2;i>=1;i-=2) {
        i1 = i-1;
        ret += x[i]*y[i] + x[i1]*y[i1];
    }
    if(i===0) { ret += x[0]*y[0]; }
    return ret;
}

numeric.dot = function dot(x,y) {
    var d = numeric.dim;
    switch(d(x).length*1000+d(y).length) {
    case 2002:
        if(y.length < 10) return numeric.dotMMsmall(x,y);
        else return numeric.dotMMbig(x,y);
    case 2001: return numeric.dotMV(x,y);
    case 1002: return numeric.dotVM(x,y);
    case 1001: return numeric.dotVV(x,y);
    case 1000: return numeric.mulVS(x,y);
    case 1: return numeric.mulSV(x,y);
    case 0: return x*y;
    default: throw new Error('numeric.dot only works on vectors and matrices');
    }
}

numeric.diag = function diag(d) {
    var i,i1,j,n = d.length, A = Array(n), Ai;
    for(i=n-1;i>=0;i--) {
        Ai = Array(n);
        i1 = i+2;
        for(j=n-1;j>=i1;j-=2) {
            Ai[j] = 0;
            Ai[j-1] = 0;
        }
        if(j>i) { Ai[j] = 0; }
        Ai[i] = d[i];
        for(j=i-1;j>=1;j-=2) {
            Ai[j] = 0;
            Ai[j-1] = 0;
        }
        if(j===0) { Ai[0] = 0; }
        A[i] = Ai;
    }
    return A;
}
numeric.getDiag = function(A) {
    var n = Math.min(A.length,A[0].length),i,ret = Array(n);
    for(i=n-1;i>=1;--i) {
        ret[i] = A[i][i];
        --i;
        ret[i] = A[i][i];
    }
    if(i===0) {
        ret[0] = A[0][0];
    }
    return ret;
}

numeric.identity = function identity(n) { return numeric.diag(numeric.rep([n],1)); }
numeric.pointwise = function pointwise(params,body,setup) {
    if(typeof setup === "undefined") { setup = ""; }
    var fun = [];
    var k;
    var avec = /\[i\]$/,p,thevec = '';
    var haveret = false;
    for(k=0;k<params.length;k++) {
        if(avec.test(params[k])) {
            p = params[k].substring(0,params[k].length-3);
            thevec = p;
        } else { p = params[k]; }
        if(p==='ret') haveret = true;
        fun.push(p);
    }
    fun[params.length] = '_s';
    fun[params.length+1] = '_k';
    fun[params.length+2] = (
            'if(typeof _s === "undefined") _s = numeric.dim('+thevec+');\n'+
            'if(typeof _k === "undefined") _k = 0;\n'+
            'var _n = _s[_k];\n'+
            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
            'if(_k < _s.length-1) {\n'+
            '    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee('+params.join(',')+',_s,_k+1);\n'+
            '    return ret;\n'+
            '}\n'+
            setup+'\n'+
            'for(i=_n-1;i!==-1;--i) {\n'+
            '    '+body+'\n'+
            '}\n'+
            'return ret;'
            );
    return Function.apply(null,fun);
}
numeric.pointwise2 = function pointwise2(params,body,setup) {
    if(typeof setup === "undefined") { setup = ""; }
    var fun = [];
    var k;
    var avec = /\[i\]$/,p,thevec = '';
    var haveret = false;
    for(k=0;k<params.length;k++) {
        if(avec.test(params[k])) {
            p = params[k].substring(0,params[k].length-3);
            thevec = p;
        } else { p = params[k]; }
        if(p==='ret') haveret = true;
        fun.push(p);
    }
    fun[params.length] = (
            'var _n = '+thevec+'.length;\n'+
            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
            setup+'\n'+
            'for(i=_n-1;i!==-1;--i) {\n'+
            body+'\n'+
            '}\n'+
            'return ret;'
            );
    return Function.apply(null,fun);
}
numeric._biforeach = (function _biforeach(x,y,s,k,f) {
    if(k === s.length-1) { f(x,y); return; }
    var i,n=s[k];
    for(i=n-1;i>=0;i--) { _biforeach(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
});
numeric._biforeach2 = (function _biforeach2(x,y,s,k,f) {
    if(k === s.length-1) { return f(x,y); }
    var i,n=s[k],ret = Array(n);
    for(i=n-1;i>=0;--i) { ret[i] = _biforeach2(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
    return ret;
});
numeric._foreach = (function _foreach(x,s,k,f) {
    if(k === s.length-1) { f(x); return; }
    var i,n=s[k];
    for(i=n-1;i>=0;i--) { _foreach(x[i],s,k+1,f); }
});
numeric._foreach2 = (function _foreach2(x,s,k,f) {
    if(k === s.length-1) { return f(x); }
    var i,n=s[k], ret = Array(n);
    for(i=n-1;i>=0;i--) { ret[i] = _foreach2(x[i],s,k+1,f); }
    return ret;
});

/*numeric.anyV = numeric.mapreduce('if(xi) return true;','false');
numeric.allV = numeric.mapreduce('if(!xi) return false;','true');
numeric.any = function(x) { if(typeof x.length === "undefined") return x; return numeric.anyV(x); }
numeric.all = function(x) { if(typeof x.length === "undefined") return x; return numeric.allV(x); }*/

numeric.ops2 = {
        add: '+',
        sub: '-',
        mul: '*',
        div: '/',
        mod: '%',
        and: '&&',
        or:  '||',
        eq:  '===',
        neq: '!==',
        lt:  '<',
        gt:  '>',
        leq: '<=',
        geq: '>=',
        band: '&',
        bor: '|',
        bxor: '^',
        lshift: '<<',
        rshift: '>>',
        rrshift: '>>>'
};
numeric.opseq = {
        addeq: '+=',
        subeq: '-=',
        muleq: '*=',
        diveq: '/=',
        modeq: '%=',
        lshifteq: '<<=',
        rshifteq: '>>=',
        rrshifteq: '>>>=',
        bandeq: '&=',
        boreq: '|=',
        bxoreq: '^='
};
numeric.mathfuns = ['abs','acos','asin','atan','ceil','cos',
                    'exp','floor','log','round','sin','sqrt','tan',
                    'isNaN','isFinite'];
numeric.mathfuns2 = ['atan2','pow','max','min'];
numeric.ops1 = {
        neg: '-',
        not: '!',
        bnot: '~',
        clone: ''
};
numeric.mapreducers = {
        any: ['if(xi) return true;','var accum = false;'],
        all: ['if(!xi) return false;','var accum = true;'],
        sum: ['accum += xi;','var accum = 0;'],
        prod: ['accum *= xi;','var accum = 1;'],
        norm2Squared: ['accum += xi*xi;','var accum = 0;'],
        norminf: ['accum = max(accum,abs(xi));','var accum = 0, max = Math.max, abs = Math.abs;'],
        norm1: ['accum += abs(xi)','var accum = 0, abs = Math.abs;'],
        sup: ['accum = max(accum,xi);','var accum = -Infinity, max = Math.max;'],
        inf: ['accum = min(accum,xi);','var accum = Infinity, min = Math.min;']
};

(function () {
    var i,o;
    for(i=0;i<numeric.mathfuns2.length;++i) {
        o = numeric.mathfuns2[i];
        numeric.ops2[o] = o;
    }
    for(i in numeric.ops2) {
        if(numeric.ops2.hasOwnProperty(i)) {
            o = numeric.ops2[i];
            var code, codeeq, setup = '';
            if(numeric.myIndexOf.call(numeric.mathfuns2,i)!==-1) {
                setup = 'var '+o+' = Math.'+o+';\n';
                code = function(r,x,y) { return r+' = '+o+'('+x+','+y+')'; };
                codeeq = function(x,y) { return x+' = '+o+'('+x+','+y+')'; };
            } else {
                code = function(r,x,y) { return r+' = '+x+' '+o+' '+y; };
                if(numeric.opseq.hasOwnProperty(i+'eq')) {
                    codeeq = function(x,y) { return x+' '+o+'= '+y; };
                } else {
                    codeeq = function(x,y) { return x+' = '+x+' '+o+' '+y; };                    
                }
            }
            numeric[i+'VV'] = numeric.pointwise2(['x[i]','y[i]'],code('ret[i]','x[i]','y[i]'),setup);
            numeric[i+'SV'] = numeric.pointwise2(['x','y[i]'],code('ret[i]','x','y[i]'),setup);
            numeric[i+'VS'] = numeric.pointwise2(['x[i]','y'],code('ret[i]','x[i]','y'),setup);
            numeric[i] = Function(
                    'var n = arguments.length, i, x = arguments[0], y;\n'+
                    'var VV = numeric.'+i+'VV, VS = numeric.'+i+'VS, SV = numeric.'+i+'SV;\n'+
                    'var dim = numeric.dim;\n'+
                    'for(i=1;i!==n;++i) { \n'+
                    '  y = arguments[i];\n'+
                    '  if(typeof x === "object") {\n'+
                    '      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n'+
                    '      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n'+
                    '  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n'+
                    '  else '+codeeq('x','y')+'\n'+
                    '}\nreturn x;\n');
            numeric[o] = numeric[i];
            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]','x[i]'], codeeq('ret[i]','x[i]'),setup);
            numeric[i+'eqS'] = numeric.pointwise2(['ret[i]','x'], codeeq('ret[i]','x'),setup);
            numeric[i+'eq'] = Function(
                    'var n = arguments.length, i, x = arguments[0], y;\n'+
                    'var V = numeric.'+i+'eqV, S = numeric.'+i+'eqS\n'+
                    'var s = numeric.dim(x);\n'+
                    'for(i=1;i!==n;++i) { \n'+
                    '  y = arguments[i];\n'+
                    '  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n'+
                    '  else numeric._biforeach(x,y,s,0,S);\n'+
                    '}\nreturn x;\n');
        }
    }
    for(i=0;i<numeric.mathfuns2.length;++i) {
        o = numeric.mathfuns2[i];
        delete numeric.ops2[o];
    }
    for(i=0;i<numeric.mathfuns.length;++i) {
        o = numeric.mathfuns[i];
        numeric.ops1[o] = o;
    }
    for(i in numeric.ops1) {
        if(numeric.ops1.hasOwnProperty(i)) {
            setup = '';
            o = numeric.ops1[i];
            if(numeric.myIndexOf.call(numeric.mathfuns,i)!==-1) {
                if(Math.hasOwnProperty(o)) setup = 'var '+o+' = Math.'+o+';\n';
            }
            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]'],'ret[i] = '+o+'(ret[i]);',setup);
            numeric[i+'eq'] = Function('x',
                    'if(typeof x !== "object") return '+o+'x\n'+
                    'var i;\n'+
                    'var V = numeric.'+i+'eqV;\n'+
                    'var s = numeric.dim(x);\n'+
                    'numeric._foreach(x,s,0,V);\n'+
                    'return x;\n');
            numeric[i+'V'] = numeric.pointwise2(['x[i]'],'ret[i] = '+o+'(x[i]);',setup);
            numeric[i] = Function('x',
                    'if(typeof x !== "object") return '+o+'(x)\n'+
                    'var i;\n'+
                    'var V = numeric.'+i+'V;\n'+
                    'var s = numeric.dim(x);\n'+
                    'return numeric._foreach2(x,s,0,V);\n');
        }
    }
    for(i=0;i<numeric.mathfuns.length;++i) {
        o = numeric.mathfuns[i];
        delete numeric.ops1[o];
    }
    for(i in numeric.mapreducers) {
        if(numeric.mapreducers.hasOwnProperty(i)) {
            o = numeric.mapreducers[i];
            numeric[i+'V'] = numeric.mapreduce2(o[0],o[1]);
            numeric[i] = Function('x','s','k',
                    o[1]+
                    'if(typeof x !== "object") {'+
                    '    xi = x;\n'+
                    o[0]+';\n'+
                    '    return accum;\n'+
                    '}'+
                    'if(typeof s === "undefined") s = numeric.dim(x);\n'+
                    'if(typeof k === "undefined") k = 0;\n'+
                    'if(k === s.length-1) return numeric.'+i+'V(x);\n'+
                    'var xi;\n'+
                    'var n = x.length, i;\n'+
                    'for(i=n-1;i!==-1;--i) {\n'+
                    '   xi = arguments.callee(x[i]);\n'+
                    o[0]+';\n'+
                    '}\n'+
                    'return accum;\n');
        }
    }
}());

numeric.truncVV = numeric.pointwise(['x[i]','y[i]'],'ret[i] = round(x[i]/y[i])*y[i];','var round = Math.round;');
numeric.truncVS = numeric.pointwise(['x[i]','y'],'ret[i] = round(x[i]/y)*y;','var round = Math.round;');
numeric.truncSV = numeric.pointwise(['x','y[i]'],'ret[i] = round(x/y[i])*y[i];','var round = Math.round;');
numeric.trunc = function trunc(x,y) {
    if(typeof x === "object") {
        if(typeof y === "object") return numeric.truncVV(x,y);
        return numeric.truncVS(x,y);
    }
    if (typeof y === "object") return numeric.truncSV(x,y);
    return Math.round(x/y)*y;
}

numeric.inv = function inv(x) {
    var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
    var A = numeric.clone(x), Ai, Aj;
    var I = numeric.identity(m), Ii, Ij;
    var i,j,k,x;
    for(j=0;j<n;++j) {
        var i0 = -1;
        var v0 = -1;
        for(i=j;i!==m;++i) { k = abs(A[i][j]); if(k>v0) { i0 = i; v0 = k; } }
        Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
        Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
        x = Aj[j];
        for(k=j;k!==n;++k)    Aj[k] /= x; 
        for(k=n-1;k!==-1;--k) Ij[k] /= x;
        for(i=m-1;i!==-1;--i) {
            if(i!==j) {
                Ai = A[i];
                Ii = I[i];
                x = Ai[j];
                for(k=j+1;k!==n;++k)  Ai[k] -= Aj[k]*x;
                for(k=n-1;k>0;--k) { Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x; }
                if(k===0) Ii[0] -= Ij[0]*x;
            }
        }
    }
    return I;
}

numeric.det = function det(x) {
    var s = numeric.dim(x);
    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: det() only works on square matrices'); }
    var n = s[0], ret = 1,i,j,k,A = numeric.clone(x),Aj,Ai,alpha,temp,k1,k2,k3;
    for(j=0;j<n-1;j++) {
        k=j;
        for(i=j+1;i<n;i++) { if(Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
        if(k !== j) {
            temp = A[k]; A[k] = A[j]; A[j] = temp;
            ret *= -1;
        }
        Aj = A[j];
        for(i=j+1;i<n;i++) {
            Ai = A[i];
            alpha = Ai[j]/Aj[j];
            for(k=j+1;k<n-1;k+=2) {
                k1 = k+1;
                Ai[k] -= Aj[k]*alpha;
                Ai[k1] -= Aj[k1]*alpha;
            }
            if(k!==n) { Ai[k] -= Aj[k]*alpha; }
        }
        if(Aj[j] === 0) { return 0; }
        ret *= Aj[j];
    }
    return ret*A[j][j];
}

numeric.transpose = function transpose(x) {
    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
    for(j=0;j<n;j++) ret[j] = Array(m);
    for(i=m-1;i>=1;i-=2) {
        A1 = x[i];
        A0 = x[i-1];
        for(j=n-1;j>=1;--j) {
            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
            --j;
            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
        }
        if(j===0) {
            Bj = ret[0]; Bj[i] = A1[0]; Bj[i-1] = A0[0];
        }
    }
    if(i===0) {
        A0 = x[0];
        for(j=n-1;j>=1;--j) {
            ret[j][0] = A0[j];
            --j;
            ret[j][0] = A0[j];
        }
        if(j===0) { ret[0][0] = A0[0]; }
    }
    return ret;
}
numeric.negtranspose = function negtranspose(x) {
    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
    for(j=0;j<n;j++) ret[j] = Array(m);
    for(i=m-1;i>=1;i-=2) {
        A1 = x[i];
        A0 = x[i-1];
        for(j=n-1;j>=1;--j) {
            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
            --j;
            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
        }
        if(j===0) {
            Bj = ret[0]; Bj[i] = -A1[0]; Bj[i-1] = -A0[0];
        }
    }
    if(i===0) {
        A0 = x[0];
        for(j=n-1;j>=1;--j) {
            ret[j][0] = -A0[j];
            --j;
            ret[j][0] = -A0[j];
        }
        if(j===0) { ret[0][0] = -A0[0]; }
    }
    return ret;
}

numeric._random = function _random(s,k) {
    var i,n=s[k],ret=Array(n), rnd;
    if(k === s.length-1) {
        rnd = Math.random;
        for(i=n-1;i>=1;i-=2) {
            ret[i] = rnd();
            ret[i-1] = rnd();
        }
        if(i===0) { ret[0] = rnd(); }
        return ret;
    }
    for(i=n-1;i>=0;i--) ret[i] = _random(s,k+1);
    return ret;
}
numeric.random = function random(s) { return numeric._random(s,0); }

numeric.norm2 = function norm2(x) { return Math.sqrt(numeric.norm2Squared(x)); }

numeric.linspace = function linspace(a,b,n) {
    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
    if(n<2) { return n===1?[a]:[]; }
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
}

numeric.getBlock = function getBlock(x,from,to) {
    var s = numeric.dim(x);
    function foo(x,k) {
        var i,a = from[k], n = to[k]-a, ret = Array(n);
        if(k === s.length-1) {
            for(i=n;i>=0;i--) { ret[i] = x[i+a]; }
            return ret;
        }
        for(i=n;i>=0;i--) { ret[i] = foo(x[i+a],k+1); }
        return ret;
    }
    return foo(x,0);
}

numeric.setBlock = function setBlock(x,from,to,B) {
    var s = numeric.dim(x);
    function foo(x,y,k) {
        var i,a = from[k], n = to[k]-a;
        if(k === s.length-1) { for(i=n;i>=0;i--) { x[i+a] = y[i]; } }
        for(i=n;i>=0;i--) { foo(x[i+a],y[i],k+1); }
    }
    foo(x,B,0);
    return x;
}

numeric.getRange = function getRange(A,I,J) {
    var m = I.length, n = J.length;
    var i,j;
    var B = Array(m), Bi, AI;
    for(i=m-1;i!==-1;--i) {
        B[i] = Array(n);
        Bi = B[i];
        AI = A[I[i]];
        for(j=n-1;j!==-1;--j) Bi[j] = AI[J[j]];
    }
    return B;
}

numeric.blockMatrix = function blockMatrix(X) {
    var s = numeric.dim(X);
    if(s.length<4) return numeric.blockMatrix([X]);
    var m=s[0],n=s[1],M,N,i,j,Xij;
    M = 0; N = 0;
    for(i=0;i<m;++i) M+=X[i][0].length;
    for(j=0;j<n;++j) N+=X[0][j][0].length;
    var Z = Array(M);
    for(i=0;i<M;++i) Z[i] = Array(N);
    var I=0,J,ZI,k,l,Xijk;
    for(i=0;i<m;++i) {
        J=N;
        for(j=n-1;j!==-1;--j) {
            Xij = X[i][j];
            J -= Xij[0].length;
            for(k=Xij.length-1;k!==-1;--k) {
                Xijk = Xij[k];
                ZI = Z[I+k];
                for(l = Xijk.length-1;l!==-1;--l) ZI[J+l] = Xijk[l];
            }
        }
        I += X[i][0].length;
    }
    return Z;
}

numeric.tensor = function tensor(x,y) {
    if(typeof x === "number" || typeof y === "number") return numeric.mul(x,y);
    var s1 = numeric.dim(x), s2 = numeric.dim(y);
    if(s1.length !== 1 || s2.length !== 1) {
        throw new Error('numeric: tensor product is only defined for vectors');
    }
    var m = s1[0], n = s2[0], A = Array(m), Ai, i,j,xi;
    for(i=m-1;i>=0;i--) {
        Ai = Array(n);
        xi = x[i];
        for(j=n-1;j>=3;--j) {
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
        }
        while(j>=0) { Ai[j] = xi * y[j]; --j; }
        A[i] = Ai;
    }
    return A;
}

// 3. The Tensor type T
numeric.T = function T(x,y) { this.x = x; this.y = y; }
numeric.t = function t(x,y) { return new numeric.T(x,y); }

numeric.Tbinop = function Tbinop(rr,rc,cr,cc,setup) {
    var io = numeric.indexOf;
    if(typeof setup !== "string") {
        var k;
        setup = '';
        for(k in numeric) {
            if(numeric.hasOwnProperty(k) && (rr.indexOf(k)>=0 || rc.indexOf(k)>=0 || cr.indexOf(k)>=0 || cc.indexOf(k)>=0) && k.length>1) {
                setup += 'var '+k+' = numeric.'+k+';\n';
            }
        }
    }
    return Function(['y'],
            'var x = this;\n'+
            'if(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n'+
            setup+'\n'+
            'if(x.y) {'+
            '  if(y.y) {'+
            '    return new numeric.T('+cc+');\n'+
            '  }\n'+
            '  return new numeric.T('+cr+');\n'+
            '}\n'+
            'if(y.y) {\n'+
            '  return new numeric.T('+rc+');\n'+
            '}\n'+
            'return new numeric.T('+rr+');\n'
    );
}

numeric.T.prototype.add = numeric.Tbinop(
        'add(x.x,y.x)',
        'add(x.x,y.x),y.y',
        'add(x.x,y.x),x.y',
        'add(x.x,y.x),add(x.y,y.y)');
numeric.T.prototype.sub = numeric.Tbinop(
        'sub(x.x,y.x)',
        'sub(x.x,y.x),neg(y.y)',
        'sub(x.x,y.x),x.y',
        'sub(x.x,y.x),sub(x.y,y.y)');
numeric.T.prototype.mul = numeric.Tbinop(
        'mul(x.x,y.x)',
        'mul(x.x,y.x),mul(x.x,y.y)',
        'mul(x.x,y.x),mul(x.y,y.x)',
        'sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))');

numeric.T.prototype.reciprocal = function reciprocal() {
    var mul = numeric.mul, div = numeric.div;
    if(this.y) {
        var d = numeric.add(mul(this.x,this.x),mul(this.y,this.y));
        return new numeric.T(div(this.x,d),div(numeric.neg(this.y),d));
    }
    return new T(div(1,this.x));
}
numeric.T.prototype.div = function div(y) {
    if(!(y instanceof numeric.T)) y = new numeric.T(y);
    if(y.y) { return this.mul(y.reciprocal()); }
    var div = numeric.div;
    if(this.y) { return new numeric.T(div(this.x,y.x),div(this.y,y.x)); }
    return new numeric.T(div(this.x,y.x));
}
numeric.T.prototype.dot = numeric.Tbinop(
        'dot(x.x,y.x)',
        'dot(x.x,y.x),dot(x.x,y.y)',
        'dot(x.x,y.x),dot(x.y,y.x)',
        'sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))'
        );
numeric.T.prototype.transpose = function transpose() {
    var t = numeric.transpose, x = this.x, y = this.y;
    if(y) { return new numeric.T(t(x),t(y)); }
    return new numeric.T(t(x));
}
numeric.T.prototype.transjugate = function transjugate() {
    var t = numeric.transpose, x = this.x, y = this.y;
    if(y) { return new numeric.T(t(x),numeric.negtranspose(y)); }
    return new numeric.T(t(x));
}
numeric.Tunop = function Tunop(r,c,s) {
    if(typeof s !== "string") { s = ''; }
    return Function(
            'var x = this;\n'+
            s+'\n'+
            'if(x.y) {'+
            '  '+c+';\n'+
            '}\n'+
            r+';\n'
    );
}

numeric.T.prototype.exp = numeric.Tunop(
        'return new numeric.T(ex)',
        'return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))',
        'var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;');
numeric.T.prototype.conj = numeric.Tunop(
        'return new numeric.T(x.x);',
        'return new numeric.T(x.x,numeric.neg(x.y));');
numeric.T.prototype.neg = numeric.Tunop(
        'return new numeric.T(neg(x.x));',
        'return new numeric.T(neg(x.x),neg(x.y));',
        'var neg = numeric.neg;');
numeric.T.prototype.sin = numeric.Tunop(
        'return new numeric.T(numeric.sin(x.x))',
        'return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));');
numeric.T.prototype.cos = numeric.Tunop(
        'return new numeric.T(numeric.cos(x.x))',
        'return x.exp().add(x.neg().exp()).div(2);');
numeric.T.prototype.abs = numeric.Tunop(
        'return new numeric.T(numeric.abs(x.x));',
        'return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));',
        'var mul = numeric.mul;');
numeric.T.prototype.log = numeric.Tunop(
        'return new numeric.T(numeric.log(x.x));',
        'var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\n'+
        'return new numeric.T(numeric.log(r.x),theta.x);');
numeric.T.prototype.norm2 = numeric.Tunop(
        'return numeric.norm2(x.x);',
        'var f = numeric.norm2Squared;\n'+
        'return Math.sqrt(f(x.x)+f(x.y));');
numeric.T.prototype.inv = function inv() {
    var A = this;
    if(typeof A.y === "undefined") { return new numeric.T(numeric.inv(A.x)); }
    var n = A.x.length, i, j, k;
    var Rx = numeric.identity(n),Ry = numeric.rep([n,n],0);
    var Ax = numeric.clone(A.x), Ay = numeric.clone(A.y);
    var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
    var i,j,k,d,d1,ax,ay,bx,by,temp;
    for(i=0;i<n;i++) {
        ax = Ax[i][i]; ay = Ay[i][i];
        d = ax*ax+ay*ay;
        k = i;
        for(j=i+1;j<n;j++) {
            ax = Ax[j][i]; ay = Ay[j][i];
            d1 = ax*ax+ay*ay;
            if(d1 > d) { k=j; d = d1; }
        }
        if(k!==i) {
            temp = Ax[i]; Ax[i] = Ax[k]; Ax[k] = temp;
            temp = Ay[i]; Ay[i] = Ay[k]; Ay[k] = temp;
            temp = Rx[i]; Rx[i] = Rx[k]; Rx[k] = temp;
            temp = Ry[i]; Ry[i] = Ry[k]; Ry[k] = temp;
        }
        Aix = Ax[i]; Aiy = Ay[i];
        Rix = Rx[i]; Riy = Ry[i];
        ax = Aix[i]; ay = Aiy[i];
        for(j=i+1;j<n;j++) {
            bx = Aix[j]; by = Aiy[j];
            Aix[j] = (bx*ax+by*ay)/d;
            Aiy[j] = (by*ax-bx*ay)/d;
        }
        for(j=0;j<n;j++) {
            bx = Rix[j]; by = Riy[j];
            Rix[j] = (bx*ax+by*ay)/d;
            Riy[j] = (by*ax-bx*ay)/d;
        }
        for(j=i+1;j<n;j++) {
            Ajx = Ax[j]; Ajy = Ay[j];
            Rjx = Rx[j]; Rjy = Ry[j];
            ax = Ajx[i]; ay = Ajy[i];
            for(k=i+1;k<n;k++) {
                bx = Aix[k]; by = Aiy[k];
                Ajx[k] -= bx*ax-by*ay;
                Ajy[k] -= by*ax+bx*ay;
            }
            for(k=0;k<n;k++) {
                bx = Rix[k]; by = Riy[k];
                Rjx[k] -= bx*ax-by*ay;
                Rjy[k] -= by*ax+bx*ay;
            }
        }
    }
    for(i=n-1;i>0;i--) {
        Rix = Rx[i]; Riy = Ry[i];
        for(j=i-1;j>=0;j--) {
            Rjx = Rx[j]; Rjy = Ry[j];
            ax = Ax[j][i]; ay = Ay[j][i];
            for(k=n-1;k>=0;k--) {
                bx = Rix[k]; by = Riy[k];
                Rjx[k] -= ax*bx - ay*by;
                Rjy[k] -= ax*by + ay*bx;
            }
        }
    }
    return new numeric.T(Rx,Ry);
}
numeric.T.prototype.get = function get(i) {
    var x = this.x, y = this.y, k = 0, ik, n = i.length;
    if(y) {
        while(k<n) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        return new numeric.T(x,y);
    }
    while(k<n) {
        ik = i[k];
        x = x[ik];
        k++;
    }
    return new numeric.T(x);
}
numeric.T.prototype.set = function set(i,v) {
    var x = this.x, y = this.y, k = 0, ik, n = i.length, vx = v.x, vy = v.y;
    if(n===0) {
        if(vy) { this.y = vy; }
        else if(y) { this.y = undefined; }
        this.x = x;
        return this;
    }
    if(vy) {
        if(y) { /* ok */ }
        else {
            y = numeric.rep(numeric.dim(x),0);
            this.y = y;
        }
        while(k<n-1) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        ik = i[k];
        x[ik] = vx;
        y[ik] = vy;
        return this;
    }
    if(y) {
        while(k<n-1) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        ik = i[k];
        x[ik] = vx;
        if(vx instanceof Array) y[ik] = numeric.rep(numeric.dim(vx),0);
        else y[ik] = 0;
        return this;
    }
    while(k<n-1) {
        ik = i[k];
        x = x[ik];
        k++;
    }
    ik = i[k];
    x[ik] = vx;
    return this;
}
numeric.T.prototype.getRows = function getRows(i0,i1) {
    var n = i1-i0+1, j;
    var rx = Array(n), ry, x = this.x, y = this.y;
    for(j=i0;j<=i1;j++) { rx[j-i0] = x[j]; }
    if(y) {
        ry = Array(n);
        for(j=i0;j<=i1;j++) { ry[j-i0] = y[j]; }
        return new numeric.T(rx,ry);
    }
    return new numeric.T(rx);
}
numeric.T.prototype.setRows = function setRows(i0,i1,A) {
    var j;
    var rx = this.x, ry = this.y, x = A.x, y = A.y;
    for(j=i0;j<=i1;j++) { rx[j] = x[j-i0]; }
    if(y) {
        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
        for(j=i0;j<=i1;j++) { ry[j] = y[j-i0]; }
    } else if(ry) {
        for(j=i0;j<=i1;j++) { ry[j] = numeric.rep([x[j-i0].length],0); }
    }
    return this;
}
numeric.T.prototype.getRow = function getRow(k) {
    var x = this.x, y = this.y;
    if(y) { return new numeric.T(x[k],y[k]); }
    return new numeric.T(x[k]);
}
numeric.T.prototype.setRow = function setRow(i,v) {
    var rx = this.x, ry = this.y, x = v.x, y = v.y;
    rx[i] = x;
    if(y) {
        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
        ry[i] = y;
    } else if(ry) {
        ry = numeric.rep([x.length],0);
    }
    return this;
}

numeric.T.prototype.getBlock = function getBlock(from,to) {
    var x = this.x, y = this.y, b = numeric.getBlock;
    if(y) { return new numeric.T(b(x,from,to),b(y,from,to)); }
    return new numeric.T(b(x,from,to));
}
numeric.T.prototype.setBlock = function setBlock(from,to,A) {
    if(!(A instanceof numeric.T)) A = new numeric.T(A);
    var x = this.x, y = this.y, b = numeric.setBlock, Ax = A.x, Ay = A.y;
    if(Ay) {
        if(!y) { this.y = numeric.rep(numeric.dim(this),0); y = this.y; }
        b(x,from,to,Ax);
        b(y,from,to,Ay);
        return this;
    }
    b(x,from,to,Ax);
    if(y) b(y,from,to,numeric.rep(numeric.dim(Ax),0));
}
numeric.T.rep = function rep(s,v) {
    var T = numeric.T;
    if(!(v instanceof T)) v = new T(v);
    var x = v.x, y = v.y, r = numeric.rep;
    if(y) return new T(r(s,x),r(s,y));
    return new T(r(s,x));
}
numeric.T.diag = function diag(d) {
    if(!(d instanceof numeric.T)) d = new numeric.T(d);
    var x = d.x, y = d.y, diag = numeric.diag;
    if(y) return new numeric.T(diag(x),diag(y));
    return new numeric.T(diag(x));
}
numeric.T.eig = function eig() {
    if(this.y) { throw new Error('eig: not implemented for complex matrices.'); }
    return numeric.eig(this.x);
}
numeric.T.identity = function identity(n) { return new numeric.T(numeric.identity(n)); }
numeric.T.prototype.getDiag = function getDiag() {
    var n = numeric;
    var x = this.x, y = this.y;
    if(y) { return new n.T(n.getDiag(x),n.getDiag(y)); }
    return new n.T(n.getDiag(x));
}

// 4. Eigenvalues of real matrices

numeric.house = function house(x) {
    var v = numeric.clone(x);
    var s = x[0] >= 0 ? 1 : -1;
    var alpha = s*numeric.norm2(x);
    v[0] += alpha;
    var foo = numeric.norm2(v);
    if(foo === 0) { /* this should not happen */ throw new Error('eig: internal error'); }
    return numeric.div(v,foo);
}

numeric.toUpperHessenberg = function toUpperHessenberg(me) {
    var s = numeric.dim(me);
    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: toUpperHessenberg() only works on square matrices'); }
    var m = s[0], i,j,k,x,v,A = numeric.clone(me),B,C,Ai,Ci,Q = numeric.identity(m),Qi;
    for(j=0;j<m-2;j++) {
        x = Array(m-j-1);
        for(i=j+1;i<m;i++) { x[i-j-1] = A[i][j]; }
        if(numeric.norm2(x)>0) {
            v = numeric.house(x);
            B = numeric.getBlock(A,[j+1,j],[m-1,m-1]);
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<m;i++) { Ai = A[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Ai[k] -= 2*Ci[k-j]; }
            B = numeric.getBlock(A,[0,j+1],[m-1,m-1]);
            C = numeric.tensor(numeric.dot(B,v),v);
            for(i=0;i<m;i++) { Ai = A[i]; Ci = C[i]; for(k=j+1;k<m;k++) Ai[k] -= 2*Ci[k-j-1]; }
            B = Array(m-j-1);
            for(i=j+1;i<m;i++) B[i-j-1] = Q[i];
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<m;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        }
    }
    return {H:A, Q:Q};
}

numeric.epsilon = 2.220446049250313e-16;

numeric.QRFrancis = function(H,maxiter) {
    if(typeof maxiter === "undefined") { maxiter = 10000; }
    H = numeric.clone(H);
    var H0 = numeric.clone(H);
    var s = numeric.dim(H),m=s[0],x,v,a,b,c,d,det,tr, Hloc, Q = numeric.identity(m), Qi, Hi, B, C, Ci,i,j,k,iter;
    if(m<3) { return {Q:Q, B:[ [0,m-1] ]}; }
    var epsilon = numeric.epsilon;
    for(iter=0;iter<maxiter;iter++) {
        for(j=0;j<m-1;j++) {
            if(Math.abs(H[j+1][j]) < epsilon*(Math.abs(H[j][j])+Math.abs(H[j+1][j+1]))) {
                var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[j,j]),maxiter);
                var QH2 = numeric.QRFrancis(numeric.getBlock(H,[j+1,j+1],[m-1,m-1]),maxiter);
                B = Array(j+1);
                for(i=0;i<=j;i++) { B[i] = Q[i]; }
                C = numeric.dot(QH1.Q,B);
                for(i=0;i<=j;i++) { Q[i] = C[i]; }
                B = Array(m-j-1);
                for(i=j+1;i<m;i++) { B[i-j-1] = Q[i]; }
                C = numeric.dot(QH2.Q,B);
                for(i=j+1;i<m;i++) { Q[i] = C[i-j-1]; }
                return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,j+1))};
            }
        }
        a = H[m-2][m-2]; b = H[m-2][m-1];
        c = H[m-1][m-2]; d = H[m-1][m-1];
        tr = a+d;
        det = (a*d-b*c);
        Hloc = numeric.getBlock(H, [0,0], [2,2]);
        if(tr*tr>=4*det) {
            var s1,s2;
            s1 = 0.5*(tr+Math.sqrt(tr*tr-4*det));
            s2 = 0.5*(tr-Math.sqrt(tr*tr-4*det));
            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
                                           numeric.mul(Hloc,s1+s2)),
                               numeric.diag(numeric.rep([3],s1*s2)));
        } else {
            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
                                           numeric.mul(Hloc,tr)),
                               numeric.diag(numeric.rep([3],det)));
        }
        x = [Hloc[0][0],Hloc[1][0],Hloc[2][0]];
        v = numeric.house(x);
        B = [H[0],H[1],H[2]];
        C = numeric.tensor(v,numeric.dot(v,B));
        for(i=0;i<3;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<m;k++) Hi[k] -= 2*Ci[k]; }
        B = numeric.getBlock(H, [0,0],[m-1,2]);
        C = numeric.tensor(numeric.dot(B,v),v);
        for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<3;k++) Hi[k] -= 2*Ci[k]; }
        B = [Q[0],Q[1],Q[2]];
        C = numeric.tensor(v,numeric.dot(v,B));
        for(i=0;i<3;i++) { Qi = Q[i]; Ci = C[i]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        var J;
        for(j=0;j<m-2;j++) {
            for(k=j;k<=j+1;k++) {
                if(Math.abs(H[k+1][k]) < epsilon*(Math.abs(H[k][k])+Math.abs(H[k+1][k+1]))) {
                    var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[k,k]),maxiter);
                    var QH2 = numeric.QRFrancis(numeric.getBlock(H,[k+1,k+1],[m-1,m-1]),maxiter);
                    B = Array(k+1);
                    for(i=0;i<=k;i++) { B[i] = Q[i]; }
                    C = numeric.dot(QH1.Q,B);
                    for(i=0;i<=k;i++) { Q[i] = C[i]; }
                    B = Array(m-k-1);
                    for(i=k+1;i<m;i++) { B[i-k-1] = Q[i]; }
                    C = numeric.dot(QH2.Q,B);
                    for(i=k+1;i<m;i++) { Q[i] = C[i-k-1]; }
                    return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,k+1))};
                }
            }
            J = Math.min(m-1,j+3);
            x = Array(J-j);
            for(i=j+1;i<=J;i++) { x[i-j-1] = H[i][j]; }
            v = numeric.house(x);
            B = numeric.getBlock(H, [j+1,j],[J,m-1]);
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<=J;i++) { Hi = H[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Hi[k] -= 2*Ci[k-j]; }
            B = numeric.getBlock(H, [0,j+1],[m-1,J]);
            C = numeric.tensor(numeric.dot(B,v),v);
            for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=j+1;k<=J;k++) Hi[k] -= 2*Ci[k-j-1]; }
            B = Array(J-j);
            for(i=j+1;i<=J;i++) B[i-j-1] = Q[i];
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<=J;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        }
    }
    throw new Error('numeric: eigenvalue iteration does not converge -- increase maxiter?');
}

numeric.eig = function eig(A,maxiter) {
    var QH = numeric.toUpperHessenberg(A);
    var QB = numeric.QRFrancis(QH.H,maxiter);
    var T = numeric.T;
    var n = A.length,i,k,flag = false,B = QB.B,H = numeric.dot(QB.Q,numeric.dot(QH.H,numeric.transpose(QB.Q)));
    var Q = new T(numeric.dot(QB.Q,QH.Q)),Q0;
    var m = B.length,j;
    var a,b,c,d,p1,p2,disc,x,y,p,q,n1,n2;
    var sqrt = Math.sqrt;
    for(k=0;k<m;k++) {
        i = B[k][0];
        if(i === B[k][1]) {
            // nothing
        } else {
            j = i+1;
            a = H[i][i];
            b = H[i][j];
            c = H[j][i];
            d = H[j][j];
            if(b === 0 && c === 0) continue;
            p1 = -a-d;
            p2 = a*d-b*c;
            disc = p1*p1-4*p2;
            if(disc>=0) {
                if(p1<0) x = -0.5*(p1-sqrt(disc));
                else     x = -0.5*(p1+sqrt(disc));
                n1 = (a-x)*(a-x)+b*b;
                n2 = c*c+(d-x)*(d-x);
                if(n1>n2) {
                    n1 = sqrt(n1);
                    p = (a-x)/n1;
                    q = b/n1;
                } else {
                    n2 = sqrt(n2);
                    p = c/n2;
                    q = (d-x)/n2;
                }
                Q0 = new T([[q,-p],[p,q]]);
                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
            } else {
                x = -0.5*p1;
                y = 0.5*sqrt(-disc);
                n1 = (a-x)*(a-x)+b*b;
                n2 = c*c+(d-x)*(d-x);
                if(n1>n2) {
                    n1 = sqrt(n1+y*y);
                    p = (a-x)/n1;
                    q = b/n1;
                    x = 0;
                    y /= n1;
                } else {
                    n2 = sqrt(n2+y*y);
                    p = c/n2;
                    q = (d-x)/n2;
                    x = y/n2;
                    y = 0;
                }
                Q0 = new T([[q,-p],[p,q]],[[x,y],[y,-x]]);
                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
            }
        }
    }
    var R = Q.dot(A).dot(Q.transjugate()), n = A.length, E = numeric.T.identity(n);
    for(j=0;j<n;j++) {
        if(j>0) {
            for(k=j-1;k>=0;k--) {
                var Rk = R.get([k,k]), Rj = R.get([j,j]);
                if(numeric.neq(Rk.x,Rj.x) || numeric.neq(Rk.y,Rj.y)) {
                    x = R.getRow(k).getBlock([k],[j-1]);
                    y = E.getRow(j).getBlock([k],[j-1]);
                    E.set([j,k],(R.get([k,j]).neg().sub(x.dot(y))).div(Rk.sub(Rj)));
                } else {
                    E.setRow(j,E.getRow(k));
                    continue;
                }
            }
        }
    }
    for(j=0;j<n;j++) {
        x = E.getRow(j);
        E.setRow(j,x.div(x.norm2()));
    }
    E = E.transpose();
    E = Q.transjugate().dot(E);
    return { lambda:R.getDiag(), E:E };
};

// 5. Compressed Column Storage matrices
numeric.ccsSparse = function ccsSparse(A) {
    var m = A.length,n,foo, i,j, counts = [];
    for(i=m-1;i!==-1;--i) {
        foo = A[i];
        for(j in foo) {
            j = parseInt(j);
            while(j>=counts.length) counts[counts.length] = 0;
            if(foo[j]!==0) counts[j]++;
        }
    }
    var n = counts.length;
    var Ai = Array(n+1);
    Ai[0] = 0;
    for(i=0;i<n;++i) Ai[i+1] = Ai[i] + counts[i];
    var Aj = Array(Ai[n]), Av = Array(Ai[n]);
    for(i=m-1;i!==-1;--i) {
        foo = A[i];
        for(j in foo) {
            if(foo[j]!==0) {
                counts[j]--;
                Aj[Ai[j]+counts[j]] = i;
                Av[Ai[j]+counts[j]] = foo[j];
            }
        }
    }
    return [Ai,Aj,Av];
}
numeric.ccsFull = function ccsFull(A) {
    var Ai = A[0], Aj = A[1], Av = A[2], s = numeric.ccsDim(A), m = s[0], n = s[1], i,j,j0,j1,k;
    var B = numeric.rep([m,n],0);
    for(i=0;i<n;i++) {
        j0 = Ai[i];
        j1 = Ai[i+1];
        for(j=j0;j<j1;++j) { B[Aj[j]][i] = Av[j]; }
    }
    return B;
}
numeric.ccsTSolve = function ccsTSolve(A,b,x,bj,xj) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, max = Math.max,n=0;
    if(typeof bj === "undefined") x = numeric.rep([m],0);
    if(typeof bj === "undefined") bj = numeric.linspace(0,x.length-1);
    if(typeof xj === "undefined") xj = [];
    function dfs(j) {
        var k;
        if(x[j] !== 0) return;
        x[j] = 1;
        for(k=Ai[j];k<Ai[j+1];++k) dfs(Aj[k]);
        xj[n] = j;
        ++n;
    }
    var i,j,j0,j1,k,l,l0,l1,a;
    for(i=bj.length-1;i!==-1;--i) { dfs(bj[i]); }
    xj.length = n;
    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
    for(i=bj.length-1;i!==-1;--i) { j = bj[i]; x[j] = b[j]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        j0 = Ai[j];
        j1 = max(Ai[j+1],j0);
        for(k=j0;k!==j1;++k) { if(Aj[k] === j) { x[j] /= Av[k]; break; } }
        a = x[j];
        for(k=j0;k!==j1;++k) {
            l = Aj[k];
            if(l !== j) x[l] -= a*Av[k];
        }
    }
    return x;
}
numeric.ccsDFS = function ccsDFS(n) {
    this.k = Array(n);
    this.k1 = Array(n);
    this.j = Array(n);
}
numeric.ccsDFS.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv) {
    var m = 0,foo,n=xj.length;
    var k = this.k, k1 = this.k1, j = this.j,km,k11;
    if(x[J]!==0) return;
    x[J] = 1;
    j[0] = J;
    k[0] = km = Ai[J];
    k1[0] = k11 = Ai[J+1];
    while(1) {
        if(km >= k11) {
            xj[n] = j[m];
            if(m===0) return;
            ++n;
            --m;
            km = k[m];
            k11 = k1[m];
        } else {
            foo = Pinv[Aj[km]];
            if(x[foo] === 0) {
                x[foo] = 1;
                k[m] = km;
                ++m;
                j[m] = foo;
                km = Ai[foo];
                k1[m] = k11 = Ai[foo+1];
            } else ++km;
        }
    }
}
numeric.ccsLPSolve = function ccsLPSolve(A,B,x,xj,I,Pinv,dfs) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
    var Bi = B[0], Bj = B[1], Bv = B[2];
    
    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
    i0 = Bi[I];
    i1 = Bi[I+1];
    xj.length = 0;
    for(i=i0;i<i1;++i) { dfs.dfs(Pinv[Bj[i]],Ai,Aj,x,xj,Pinv); }
    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
    for(i=i0;i!==i1;++i) { j = Pinv[Bj[i]]; x[j] = Bv[i]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        j0 = Ai[j];
        j1 = Ai[j+1];
        for(k=j0;k<j1;++k) { if(Pinv[Aj[k]] === j) { x[j] /= Av[k]; break; } }
        a = x[j];
        for(k=j0;k<j1;++k) {
            l = Pinv[Aj[k]];
            if(l !== j) x[l] -= a*Av[k];
        }
    }
    return x;
}
numeric.ccsLUP1 = function ccsLUP1(A,threshold) {
    var m = A[0].length-1;
    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
    var x = numeric.rep([m],0), xj = numeric.rep([m],0);
    var i,j,k,j0,j1,a,e,c,d,K;
    var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
    var dfs = new numeric.ccsDFS(m);
    if(typeof threshold === "undefined") { threshold = 1; }
    for(i=0;i<m;++i) {
        sol(L,A,x,xj,i,Pinv,dfs);
        a = -1;
        e = -1;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            if(k <= i) continue;
            c = abs(x[k]);
            if(c > a) { e = k; a = c; }
        }
        if(abs(x[i])<threshold*a) {
            j = P[i];
            a = P[e];
            P[i] = a; Pinv[a] = i;
            P[e] = j; Pinv[j] = e;
            a = x[i]; x[i] = x[e]; x[e] = a;
        }
        a = Li[i];
        e = Ui[i];
        d = x[i];
        Lj[a] = P[i];
        Lv[a] = 1;
        ++a;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            c = x[k];
            xj[j] = 0;
            x[k] = 0;
            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
        }
        Li[i+1] = a;
        Ui[i+1] = e;
    }
    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
    return {L:L, U:U, P:P, Pinv:Pinv};
}
numeric.ccsDFS0 = function ccsDFS0(n) {
    this.k = Array(n);
    this.k1 = Array(n);
    this.j = Array(n);
}
numeric.ccsDFS0.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv,P) {
    var m = 0,foo,n=xj.length;
    var k = this.k, k1 = this.k1, j = this.j,km,k11;
    if(x[J]!==0) return;
    x[J] = 1;
    j[0] = J;
    k[0] = km = Ai[Pinv[J]];
    k1[0] = k11 = Ai[Pinv[J]+1];
    while(1) {
        if(isNaN(km)) throw new Error("Ow!");
        if(km >= k11) {
            xj[n] = Pinv[j[m]];
            if(m===0) return;
            ++n;
            --m;
            km = k[m];
            k11 = k1[m];
        } else {
            foo = Aj[km];
            if(x[foo] === 0) {
                x[foo] = 1;
                k[m] = km;
                ++m;
                j[m] = foo;
                foo = Pinv[foo];
                km = Ai[foo];
                k1[m] = k11 = Ai[foo+1];
            } else ++km;
        }
    }
}
numeric.ccsLPSolve0 = function ccsLPSolve0(A,B,y,xj,I,Pinv,P,dfs) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
    var Bi = B[0], Bj = B[1], Bv = B[2];
    
    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
    i0 = Bi[I];
    i1 = Bi[I+1];
    xj.length = 0;
    for(i=i0;i<i1;++i) { dfs.dfs(Bj[i],Ai,Aj,y,xj,Pinv,P); }
    for(i=xj.length-1;i!==-1;--i) { j = xj[i]; y[P[j]] = 0; }
    for(i=i0;i!==i1;++i) { j = Bj[i]; y[j] = Bv[i]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        l = P[j];
        j0 = Ai[j];
        j1 = Ai[j+1];
        for(k=j0;k<j1;++k) { if(Aj[k] === l) { y[l] /= Av[k]; break; } }
        a = y[l];
        for(k=j0;k<j1;++k) y[Aj[k]] -= a*Av[k];
        y[l] = a;
    }
}
numeric.ccsLUP0 = function ccsLUP0(A,threshold) {
    var m = A[0].length-1;
    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
    var y = numeric.rep([m],0), xj = numeric.rep([m],0);
    var i,j,k,j0,j1,a,e,c,d,K;
    var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
    var dfs = new numeric.ccsDFS0(m);
    if(typeof threshold === "undefined") { threshold = 1; }
    for(i=0;i<m;++i) {
        sol(L,A,y,xj,i,Pinv,P,dfs);
        a = -1;
        e = -1;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            if(k <= i) continue;
            c = abs(y[P[k]]);
            if(c > a) { e = k; a = c; }
        }
        if(abs(y[P[i]])<threshold*a) {
            j = P[i];
            a = P[e];
            P[i] = a; Pinv[a] = i;
            P[e] = j; Pinv[j] = e;
        }
        a = Li[i];
        e = Ui[i];
        d = y[P[i]];
        Lj[a] = P[i];
        Lv[a] = 1;
        ++a;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            c = y[P[k]];
            xj[j] = 0;
            y[P[k]] = 0;
            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
        }
        Li[i+1] = a;
        Ui[i+1] = e;
    }
    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
    return {L:L, U:U, P:P, Pinv:Pinv};
}
numeric.ccsLUP = numeric.ccsLUP0;

numeric.ccsDim = function ccsDim(A) { return [numeric.sup(A[1])+1,A[0].length-1]; }
numeric.ccsGetBlock = function ccsGetBlock(A,i,j) {
    var s = numeric.ccsDim(A),m=s[0],n=s[1];
    if(typeof i === "undefined") { i = numeric.linspace(0,m-1); }
    else if(typeof i === "number") { i = [i]; }
    if(typeof j === "undefined") { j = numeric.linspace(0,n-1); }
    else if(typeof j === "number") { j = [j]; }
    var p,p0,p1,P = i.length,q,Q = j.length,r,jq,ip;
    var Bi = numeric.rep([n],0), Bj=[], Bv=[], B = [Bi,Bj,Bv];
    var Ai = A[0], Aj = A[1], Av = A[2];
    var x = numeric.rep([m],0),count=0,flags = numeric.rep([m],0);
    for(q=0;q<Q;++q) {
        jq = j[q];
        var q0 = Ai[jq];
        var q1 = Ai[jq+1];
        for(p=q0;p<q1;++p) {
            r = Aj[p];
            flags[r] = 1;
            x[r] = Av[p];
        }
        for(p=0;p<P;++p) {
            ip = i[p];
            if(flags[ip]) {
                Bj[count] = p;
                Bv[count] = x[i[p]];
                ++count;
            }
        }
        for(p=q0;p<q1;++p) {
            r = Aj[p];
            flags[r] = 0;
        }
        Bi[q+1] = count;
    }
    return B;
}

numeric.ccsDot = function ccsDot(A,B) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var Bi = B[0], Bj = B[1], Bv = B[2];
    var sA = numeric.ccsDim(A), sB = numeric.ccsDim(B);
    var m = sA[0], n = sA[1], o = sB[1];
    var x = numeric.rep([m],0), flags = numeric.rep([m],0), xj = Array(m);
    var Ci = numeric.rep([o],0), Cj = [], Cv = [], C = [Ci,Cj,Cv];
    var i,j,k,j0,j1,i0,i1,l,p,a,b;
    for(k=0;k!==o;++k) {
        j0 = Bi[k];
        j1 = Bi[k+1];
        p = 0;
        for(j=j0;j<j1;++j) {
            a = Bj[j];
            b = Bv[j];
            i0 = Ai[a];
            i1 = Ai[a+1];
            for(i=i0;i<i1;++i) {
                l = Aj[i];
                if(flags[l]===0) {
                    xj[p] = l;
                    flags[l] = 1;
                    p = p+1;
                }
                x[l] = x[l] + Av[i]*b;
            }
        }
        j0 = Ci[k];
        j1 = j0+p;
        Ci[k+1] = j1;
        for(j=p-1;j!==-1;--j) {
            b = j0+j;
            i = xj[j];
            Cj[b] = i;
            Cv[b] = x[i];
            flags[i] = 0;
            x[i] = 0;
        }
        Ci[k+1] = Ci[k]+p;
    }
    return C;
}

numeric.ccsLUPSolve = function ccsLUPSolve(LUP,B) {
    var L = LUP.L, U = LUP.U, P = LUP.P;
    var Bi = B[0];
    var flag = false;
    if(typeof Bi !== "object") { B = [[0,B.length],numeric.linspace(0,B.length-1),B]; Bi = B[0]; flag = true; }
    var Bj = B[1], Bv = B[2];
    var n = L[0].length-1, m = Bi.length-1;
    var x = numeric.rep([n],0), xj = Array(n);
    var b = numeric.rep([n],0), bj = Array(n);
    var Xi = numeric.rep([m+1],0), Xj = [], Xv = [];
    var sol = numeric.ccsTSolve;
    var i,j,j0,j1,k,J,N=0;
    for(i=0;i<m;++i) {
        k = 0;
        j0 = Bi[i];
        j1 = Bi[i+1];
        for(j=j0;j<j1;++j) { 
            J = LUP.Pinv[Bj[j]];
            bj[k] = J;
            b[J] = Bv[j];
            ++k;
        }
        bj.length = k;
        sol(L,b,x,bj,xj);
        for(j=bj.length-1;j!==-1;--j) b[bj[j]] = 0;
        sol(U,x,b,xj,bj);
        if(flag) return b;
        for(j=xj.length-1;j!==-1;--j) x[xj[j]] = 0;
        for(j=bj.length-1;j!==-1;--j) {
            J = bj[j];
            Xj[N] = J;
            Xv[N] = b[J];
            b[J] = 0;
            ++N;
        }
        Xi[i+1] = N;
    }
    return [Xi,Xj,Xv];
}

numeric.ccsbinop = function ccsbinop(body,setup) {
    if(typeof setup === "undefined") setup='';
    return Function('X','Y',
            'var Xi = X[0], Xj = X[1], Xv = X[2];\n'+
            'var Yi = Y[0], Yj = Y[1], Yv = Y[2];\n'+
            'var n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\n'+
            'var Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\n'+
            'var x = numeric.rep([m],0),y = numeric.rep([m],0);\n'+
            'var xk,yk,zk;\n'+
            'var i,j,j0,j1,k,p=0;\n'+
            setup+
            'for(i=0;i<n;++i) {\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Xj[j];\n'+
            '    x[k] = 1;\n'+
            '    Zj[p] = k;\n'+
            '    ++p;\n'+
            '  }\n'+
            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Yj[j];\n'+
            '    y[k] = Yv[j];\n'+
            '    if(x[k] === 0) {\n'+
            '      Zj[p] = k;\n'+
            '      ++p;\n'+
            '    }\n'+
            '  }\n'+
            '  Zi[i+1] = p;\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n'+
            '  j0 = Zi[i]; j1 = Zi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Zj[j];\n'+
            '    xk = x[k];\n'+
            '    yk = y[k];\n'+
            body+'\n'+
            '    Zv[j] = zk;\n'+
            '  }\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n'+
            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n'+
            '}\n'+
            'return [Zi,Zj,Zv];'
            );
};

(function() {
    var k,A,B,C;
    for(k in numeric.ops2) {
        if(isFinite(eval('1'+numeric.ops2[k]+'0'))) A = '[Y[0],Y[1],numeric.'+k+'(X,Y[2])]';
        else A = 'NaN';
        if(isFinite(eval('0'+numeric.ops2[k]+'1'))) B = '[X[0],X[1],numeric.'+k+'(X[2],Y)]';
        else B = 'NaN';
        if(isFinite(eval('1'+numeric.ops2[k]+'0')) && isFinite(eval('0'+numeric.ops2[k]+'1'))) C = 'numeric.ccs'+k+'MM(X,Y)';
        else C = 'NaN';
        numeric['ccs'+k+'MM'] = numeric.ccsbinop('zk = xk '+numeric.ops2[k]+'yk;');
        numeric['ccs'+k] = Function('X','Y',
                'if(typeof X === "number") return '+A+';\n'+
                'if(typeof Y === "number") return '+B+';\n'+
                'return '+C+';\n'
                );
    }
}());

numeric.ccsScatter = function ccsScatter(A) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var n = numeric.sup(Aj)+1,m=Ai.length;
    var Ri = numeric.rep([n],0),Rj=Array(m), Rv = Array(m);
    var counts = numeric.rep([n],0),i;
    for(i=0;i<m;++i) counts[Aj[i]]++;
    for(i=0;i<n;++i) Ri[i+1] = Ri[i] + counts[i];
    var ptr = Ri.slice(0),k,Aii;
    for(i=0;i<m;++i) {
        Aii = Aj[i];
        k = ptr[Aii];
        Rj[k] = Ai[i];
        Rv[k] = Av[i];
        ptr[Aii]=ptr[Aii]+1;
    }
    return [Ri,Rj,Rv];
}

numeric.ccsGather = function ccsGather(A) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var n = Ai.length-1,m = Aj.length;
    var Ri = Array(m), Rj = Array(m), Rv = Array(m);
    var i,j,j0,j1,p;
    p=0;
    for(i=0;i<n;++i) {
        j0 = Ai[i];
        j1 = Ai[i+1];
        for(j=j0;j!==j1;++j) {
            Rj[p] = i;
            Ri[p] = Aj[j];
            Rv[p] = Av[j];
            ++p;
        }
    }
    return [Ri,Rj,Rv];
}

// The following sparse linear algebra routines are deprecated.

numeric.sdim = function dim(A,ret,k) {
    if(typeof ret === "undefined") { ret = []; }
    if(typeof A !== "object") return ret;
    if(typeof k === "undefined") { k=0; }
    if(!(k in ret)) { ret[k] = 0; }
    if(A.length > ret[k]) ret[k] = A.length;
    var i;
    for(i in A) {
        if(A.hasOwnProperty(i)) dim(A[i],ret,k+1);
    }
    return ret;
};

numeric.sclone = function clone(A,k,n) {
    if(typeof k === "undefined") { k=0; }
    if(typeof n === "undefined") { n = numeric.sdim(A).length; }
    var i,ret = Array(A.length);
    if(k === n-1) {
        for(i in A) { if(A.hasOwnProperty(i)) ret[i] = A[i]; }
        return ret;
    }
    for(i in A) {
        if(A.hasOwnProperty(i)) ret[i] = clone(A[i],k+1,n);
    }
    return ret;
}

numeric.sdiag = function diag(d) {
    var n = d.length,i,ret = Array(n),i1,i2,i3;
    for(i=n-1;i>=1;i-=2) {
        i1 = i-1;
        ret[i] = []; ret[i][i] = d[i];
        ret[i1] = []; ret[i1][i1] = d[i1];
    }
    if(i===0) { ret[0] = []; ret[0][0] = d[i]; }
    return ret;
}

numeric.sidentity = function identity(n) { return numeric.sdiag(numeric.rep([n],1)); }

numeric.stranspose = function transpose(A) {
    var ret = [], n = A.length, i,j,Ai;
    for(i in A) {
        if(!(A.hasOwnProperty(i))) continue;
        Ai = A[i];
        for(j in Ai) {
            if(!(Ai.hasOwnProperty(j))) continue;
            if(typeof ret[j] !== "object") { ret[j] = []; }
            ret[j][i] = Ai[j];
        }
    }
    return ret;
}

numeric.sLUP = function LUP(A,tol) {
    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
};

numeric.sdotMM = function dotMM(A,B) {
    var p = A.length, q = B.length, BT = numeric.stranspose(B), r = BT.length, Ai, BTk;
    var i,j,k,accum;
    var ret = Array(p),reti;
    for(i=p-1;i>=0;i--) {
        reti = [];
        Ai = A[i];
        for(k=r-1;k>=0;k--) {
            accum = 0;
            BTk = BT[k];
            for(j in Ai) {
                if(!(Ai.hasOwnProperty(j))) continue;
                if(j in BTk) { accum += Ai[j]*BTk[j]; }
            }
            if(accum) reti[k] = accum;
        }
        ret[i] = reti;
    }
    return ret;
}

numeric.sdotMV = function dotMV(A,x) {
    var p = A.length, Ai, i,j;
    var ret = Array(p), accum;
    for(i=p-1;i>=0;i--) {
        Ai = A[i];
        accum = 0;
        for(j in Ai) {
            if(!(Ai.hasOwnProperty(j))) continue;
            if(x[j]) accum += Ai[j]*x[j];
        }
        if(accum) ret[i] = accum;
    }
    return ret;
}

numeric.sdotVM = function dotMV(x,A) {
    var i,j,Ai,alpha;
    var ret = [], accum;
    for(i in x) {
        if(!x.hasOwnProperty(i)) continue;
        Ai = A[i];
        alpha = x[i];
        for(j in Ai) {
            if(!Ai.hasOwnProperty(j)) continue;
            if(!ret[j]) { ret[j] = 0; }
            ret[j] += alpha*Ai[j];
        }
    }
    return ret;
}

numeric.sdotVV = function dotVV(x,y) {
    var i,ret=0;
    for(i in x) { if(x[i] && y[i]) ret+= x[i]*y[i]; }
    return ret;
}

numeric.sdot = function dot(A,B) {
    var m = numeric.sdim(A).length, n = numeric.sdim(B).length;
    var k = m*1000+n;
    switch(k) {
    case 0: return A*B;
    case 1001: return numeric.sdotVV(A,B);
    case 2001: return numeric.sdotMV(A,B);
    case 1002: return numeric.sdotVM(A,B);
    case 2002: return numeric.sdotMM(A,B);
    default: throw new Error('numeric.sdot not implemented for tensors of order '+m+' and '+n);
    }
}

numeric.sscatter = function scatter(V) {
    var n = V[0].length, Vij, i, j, m = V.length, A = [], Aj;
    for(i=n-1;i>=0;--i) {
        if(!V[m-1][i]) continue;
        Aj = A;
        for(j=0;j<m-2;j++) {
            Vij = V[j][i];
            if(!Aj[Vij]) Aj[Vij] = [];
            Aj = Aj[Vij];
        }
        Aj[V[j][i]] = V[j+1][i];
    }
    return A;
}

numeric.sgather = function gather(A,ret,k) {
    if(typeof ret === "undefined") ret = [];
    if(typeof k === "undefined") k = [];
    var n,i,Ai;
    n = k.length;
    for(i in A) {
        if(A.hasOwnProperty(i)) {
            k[n] = parseInt(i);
            Ai = A[i];
            if(typeof Ai === "number") {
                if(Ai) {
                    if(ret.length === 0) {
                        for(i=n+1;i>=0;--i) ret[i] = [];
                    }
                    for(i=n;i>=0;--i) ret[i].push(k[i]);
                    ret[n+1].push(Ai);
                }
            } else gather(Ai,ret,k);
        }
    }
    if(k.length>n) k.pop();
    return ret;
}

// 6. Coordinate matrices
numeric.cLU = function LU(A) {
    var I = A[0], J = A[1], V = A[2];
    var p = I.length, m=0, i,j,k,a,b,c;
    for(i=0;i<p;i++) if(I[i]>m) m=I[i];
    m++;
    var L = Array(m), U = Array(m), left = numeric.rep([m],Infinity), right = numeric.rep([m],-Infinity);
    var Ui, Uj,alpha;
    for(k=0;k<p;k++) {
        i = I[k];
        j = J[k];
        if(j<left[i]) left[i] = j;
        if(j>right[i]) right[i] = j;
    }
    for(i=0;i<m-1;i++) { if(right[i] > right[i+1]) right[i+1] = right[i]; }
    for(i=m-1;i>=1;i--) { if(left[i]<left[i-1]) left[i-1] = left[i]; }
    var countL = 0, countU = 0;
    for(i=0;i<m;i++) {
        U[i] = numeric.rep([right[i]-left[i]+1],0);
        L[i] = numeric.rep([i-left[i]],0);
        countL += i-left[i]+1;
        countU += right[i]-i+1;
    }
    for(k=0;k<p;k++) { i = I[k]; U[i][J[k]-left[i]] = V[k]; }
    for(i=0;i<m-1;i++) {
        a = i-left[i];
        Ui = U[i];
        for(j=i+1;left[j]<=i && j<m;j++) {
            b = i-left[j];
            c = right[i]-i;
            Uj = U[j];
            alpha = Uj[b]/Ui[a];
            if(alpha) {
                for(k=1;k<=c;k++) { Uj[k+b] -= alpha*Ui[k+a]; }
                L[j][i-left[j]] = alpha;
            }
        }
    }
    var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
    var p,q,foo;
    p=0; q=0;
    for(i=0;i<m;i++) {
        a = left[i];
        b = right[i];
        foo = U[i];
        for(j=i;j<=b;j++) {
            if(foo[j-a]) {
                Ui[p] = i;
                Uj[p] = j;
                Uv[p] = foo[j-a];
                p++;
            }
        }
        foo = L[i];
        for(j=a;j<i;j++) {
            if(foo[j-a]) {
                Li[q] = i;
                Lj[q] = j;
                Lv[q] = foo[j-a];
                q++;
            }
        }
        Li[q] = i;
        Lj[q] = i;
        Lv[q] = 1;
        q++;
    }
    return {U:[Ui,Uj,Uv], L:[Li,Lj,Lv]};
};

numeric.cLUsolve = function LUsolve(lu,b) {
    var L = lu.L, U = lu.U, ret = numeric.clone(b);
    var Li = L[0], Lj = L[1], Lv = L[2];
    var Ui = U[0], Uj = U[1], Uv = U[2];
    var p = Ui.length, q = Li.length;
    var m = ret.length,i,j,k;
    k = 0;
    for(i=0;i<m;i++) {
        while(Lj[k] < i) {
            ret[i] -= Lv[k]*ret[Lj[k]];
            k++;
        }
        k++;
    }
    k = p-1;
    for(i=m-1;i>=0;i--) {
        while(Uj[k] > i) {
            ret[i] -= Uv[k]*ret[Uj[k]];
            k--;
        }
        ret[i] /= Uv[k];
        k--;
    }
    return ret;
};

numeric.cgrid = function grid(n,shape) {
    if(typeof n === "number") n = [n,n];
    var ret = numeric.rep(n,-1);
    var i,j,count;
    if(typeof shape !== "function") {
        switch(shape) {
        case 'L':
            shape = function(i,j) { return (i>=n[0]/2 || j<n[1]/2); }
            break;
        default:
            shape = function(i,j) { return true; };
            break;
        }
    }
    count=0;
    for(i=1;i<n[0]-1;i++) for(j=1;j<n[1]-1;j++) 
        if(shape(i,j)) {
            ret[i][j] = count;
            count++;
        }
    return ret;
}

numeric.cdelsq = function delsq(g) {
    var dir = [[-1,0],[0,-1],[0,1],[1,0]];
    var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
    var Li = [], Lj = [], Lv = [];
    for(i=1;i<m-1;i++) for(j=1;j<n-1;j++) {
        if(g[i][j]<0) continue;
        for(k=0;k<4;k++) {
            p = i+dir[k][0];
            q = j+dir[k][1];
            if(g[p][q]<0) continue;
            Li.push(g[i][j]);
            Lj.push(g[p][q]);
            Lv.push(-1);
        }
        Li.push(g[i][j]);
        Lj.push(g[i][j]);
        Lv.push(4);
    }
    return [Li,Lj,Lv];
}

numeric.cdotMV = function dotMV(A,x) {
    var ret, Ai = A[0], Aj = A[1], Av = A[2],k,p=Ai.length,N;
    N=0;
    for(k=0;k<p;k++) { if(Ai[k]>N) N = Ai[k]; }
    N++;
    ret = numeric.rep([N],0);
    for(k=0;k<p;k++) { ret[Ai[k]]+=Av[k]*x[Aj[k]]; }
    return ret;
}

// 7. Splines

numeric.Spline = function Spline(x,yl,yr,kl,kr) { this.x = x; this.yl = yl; this.yr = yr; this.kl = kl; this.kr = kr; }
numeric.Spline.prototype._at = function _at(x1,p) {
    var x = this.x;
    var yl = this.yl;
    var yr = this.yr;
    var kl = this.kl;
    var kr = this.kr;
    var x1,a,b,t;
    var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
    a = sub(mul(kl[p],x[p+1]-x[p]),sub(yr[p+1],yl[p]));
    b = add(mul(kr[p+1],x[p]-x[p+1]),sub(yr[p+1],yl[p]));
    t = (x1-x[p])/(x[p+1]-x[p]);
    var s = t*(1-t);
    return add(add(add(mul(1-t,yl[p]),mul(t,yr[p+1])),mul(a,s*(1-t))),mul(b,s*t));
}
numeric.Spline.prototype.at = function at(x0) {
    if(typeof x0 === "number") {
        var x = this.x;
        var n = x.length;
        var p,q,mid,floor = Math.floor,a,b,t;
        p = 0;
        q = n-1;
        while(q-p>1) {
            mid = floor((p+q)/2);
            if(x[mid] <= x0) p = mid;
            else q = mid;
        }
        return this._at(x0,p);
    }
    var n = x0.length, i, ret = Array(n);
    for(i=n-1;i!==-1;--i) ret[i] = this.at(x0[i]);
    return ret;
}
numeric.Spline.prototype.diff = function diff() {
    var x = this.x;
    var yl = this.yl;
    var yr = this.yr;
    var kl = this.kl;
    var kr = this.kr;
    var n = yl.length;
    var i,dx,dy;
    var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
    var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
    for(i=n-1;i!==-1;--i) {
        dx = x[i+1]-x[i];
        dy = sub(yr[i+1],yl[i]);
        pl[i] = div(add(mul(dy, 6),mul(kl[i],-4*dx),mul(kr[i+1],-2*dx)),dx*dx);
        pr[i+1] = div(add(mul(dy,-6),mul(kl[i], 2*dx),mul(kr[i+1], 4*dx)),dx*dx);
    }
    return new numeric.Spline(x,zl,zr,pl,pr);
}
numeric.Spline.prototype.roots = function roots() {
    function sqr(x) { return x*x; }
    function heval(y0,y1,k0,k1,x) {
        var A = k0*2-(y1-y0);
        var B = -k1*2+(y1-y0);
        var t = (x+1)*0.5;
        var s = t*(1-t);
        return (1-t)*y0+t*y1+A*s*(1-t)+B*s*t;
    }
    var ret = [];
    var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
    if(typeof yl[0] === "number") {
        yl = [yl];
        yr = [yr];
        kl = [kl];
        kr = [kr];
    }
    var m = yl.length,n=x.length-1,i,j,k,y,s,t;
    var ai,bi,ci,di, ret = Array(m),ri,k0,k1,y0,y1,A,B,D,dx,cx,stops,z0,z1,zm,t0,t1,tm;
    var sqrt = Math.sqrt;
    for(i=0;i!==m;++i) {
        ai = yl[i];
        bi = yr[i];
        ci = kl[i];
        di = kr[i];
        ri = [];
        for(j=0;j!==n;j++) {
            if(j>0 && bi[j]*ai[j]<0) ri.push(x[j]);
            dx = (x[j+1]-x[j]);
            cx = x[j];
            y0 = ai[j];
            y1 = bi[j+1];
            k0 = ci[j]/dx;
            k1 = di[j+1]/dx;
            D = sqr(k0-k1+3*(y0-y1)) + 12*k1*y0;
            A = k1+3*y0+2*k0-3*y1;
            B = 3*(k1+k0+2*(y0-y1));
            if(D<=0) {
                z0 = A/B;
                if(z0>x[j] && z0<x[j+1]) stops = [x[j],z0,x[j+1]];
                else stops = [x[j],x[j+1]];
            } else {
                z0 = (A-sqrt(D))/B;
                z1 = (A+sqrt(D))/B;
                stops = [x[j]];
                if(z0>x[j] && z0<x[j+1]) stops.push(z0);
                if(z1>x[j] && z1<x[j+1]) stops.push(z1);
                stops.push(x[j+1]);
            }
            t0 = stops[0];
            z0 = this._at(t0,j);
            for(k=0;k<stops.length-1;k++) {
                t1 = stops[k+1];
                z1 = this._at(t1,j);
                if(z0 === 0) {
                    ri.push(t0); 
                    t0 = t1;
                    z0 = z1;
                    continue;
                }
                if(z1 === 0 || z0*z1>0) {
                    t0 = t1;
                    z0 = z1;
                    continue;
                }
                var side = 0;
                while(1) {
                    tm = (z0*t1-z1*t0)/(z0-z1);
                    if(tm <= t0 || tm >= t1) { break; }
                    zm = this._at(tm,j);
                    if(zm*z1>0) {
                        t1 = tm;
                        z1 = zm;
                        if(side === -1) z0*=0.5;
                        side = -1;
                    } else if(zm*z0>0) {
                        t0 = tm;
                        z0 = zm;
                        if(side === 1) z1*=0.5;
                        side = 1;
                    } else break;
                }
                ri.push(tm);
                t0 = stops[k+1];
                z0 = this._at(t0, j);
            }
            if(z1 === 0) ri.push(t1);
        }
        ret[i] = ri;
    }
    if(typeof this.yl[0] === "number") return ret[0];
    return ret;
}
numeric.spline = function spline(x,y,k1,kn) {
    var n = x.length, b = [], dx = [], dy = [];
    var i;
    var sub = numeric.sub,mul = numeric.mul,add = numeric.add;
    for(i=n-2;i>=0;i--) { dx[i] = x[i+1]-x[i]; dy[i] = sub(y[i+1],y[i]); }
    if(typeof k1 === "string" || typeof kn === "string") { 
        k1 = kn = "periodic";
    }
    // Build sparse tridiagonal system
    var T = [[],[],[]];
    switch(typeof k1) {
    case "undefined":
        b[0] = mul(3/(dx[0]*dx[0]),dy[0]);
        T[0].push(0,0);
        T[1].push(0,1);
        T[2].push(2/dx[0],1/dx[0]);
        break;
    case "string":
        b[0] = add(mul(3/(dx[n-2]*dx[n-2]),dy[n-2]),mul(3/(dx[0]*dx[0]),dy[0]));
        T[0].push(0,0,0);
        T[1].push(n-2,0,1);
        T[2].push(1/dx[n-2],2/dx[n-2]+2/dx[0],1/dx[0]);
        break;
    default:
        b[0] = k1;
        T[0].push(0);
        T[1].push(0);
        T[2].push(1);
        break;
    }
    for(i=1;i<n-1;i++) {
        b[i] = add(mul(3/(dx[i-1]*dx[i-1]),dy[i-1]),mul(3/(dx[i]*dx[i]),dy[i]));
        T[0].push(i,i,i);
        T[1].push(i-1,i,i+1);
        T[2].push(1/dx[i-1],2/dx[i-1]+2/dx[i],1/dx[i]);
    }
    switch(typeof kn) {
    case "undefined":
        b[n-1] = mul(3/(dx[n-2]*dx[n-2]),dy[n-2]);
        T[0].push(n-1,n-1);
        T[1].push(n-2,n-1);
        T[2].push(1/dx[n-2],2/dx[n-2]);
        break;
    case "string":
        T[1][T[1].length-1] = 0;
        break;
    default:
        b[n-1] = kn;
        T[0].push(n-1);
        T[1].push(n-1);
        T[2].push(1);
        break;
    }
    if(typeof b[0] !== "number") b = numeric.transpose(b);
    else b = [b];
    var k = Array(b.length);
    if(typeof k1 === "string") {
        for(i=k.length-1;i!==-1;--i) {
            k[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T)),b[i]);
            k[i][n-1] = k[i][0];
        }
    } else {
        for(i=k.length-1;i!==-1;--i) {
            k[i] = numeric.cLUsolve(numeric.cLU(T),b[i]);
        }
    }
    if(typeof y[0] === "number") k = k[0];
    else k = numeric.transpose(k);
    return new numeric.Spline(x,y,y,k,k);
}

// 8. FFT
numeric.fftpow2 = function fftpow2(x,y) {
    var n = x.length;
    if(n === 1) return;
    var cos = Math.cos, sin = Math.sin, i,j;
    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
    j = n/2;
    for(i=n-1;i!==-1;--i) {
        --j;
        xo[j] = x[i];
        yo[j] = y[i];
        --i;
        xe[j] = x[i];
        ye[j] = y[i];
    }
    fftpow2(xe,ye);
    fftpow2(xo,yo);
    j = n/2;
    var t,k = (-6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
    for(i=n-1;i!==-1;--i) {
        --j;
        if(j === -1) j = n/2-1;
        t = k*i;
        ci = cos(t);
        si = sin(t);
        x[i] = xe[j] + ci*xo[j] - si*yo[j];
        y[i] = ye[j] + ci*yo[j] + si*xo[j];
    }
}
numeric._ifftpow2 = function _ifftpow2(x,y) {
    var n = x.length;
    if(n === 1) return;
    var cos = Math.cos, sin = Math.sin, i,j;
    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
    j = n/2;
    for(i=n-1;i!==-1;--i) {
        --j;
        xo[j] = x[i];
        yo[j] = y[i];
        --i;
        xe[j] = x[i];
        ye[j] = y[i];
    }
    _ifftpow2(xe,ye);
    _ifftpow2(xo,yo);
    j = n/2;
    var t,k = (6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
    for(i=n-1;i!==-1;--i) {
        --j;
        if(j === -1) j = n/2-1;
        t = k*i;
        ci = cos(t);
        si = sin(t);
        x[i] = xe[j] + ci*xo[j] - si*yo[j];
        y[i] = ye[j] + ci*yo[j] + si*xo[j];
    }
}
numeric.ifftpow2 = function ifftpow2(x,y) {
    numeric._ifftpow2(x,y);
    numeric.diveq(x,x.length);
    numeric.diveq(y,y.length);
}
numeric.convpow2 = function convpow2(ax,ay,bx,by) {
    numeric.fftpow2(ax,ay);
    numeric.fftpow2(bx,by);
    var i,n = ax.length,axi,bxi,ayi,byi;
    for(i=n-1;i!==-1;--i) {
        axi = ax[i]; ayi = ay[i]; bxi = bx[i]; byi = by[i];
        ax[i] = axi*bxi-ayi*byi;
        ay[i] = axi*byi+ayi*bxi;
    }
    numeric.ifftpow2(ax,ay);
}
numeric.T.prototype.fft = function fft() {
    var x = this.x, y = this.y;
    var n = x.length, log = Math.log, log2 = log(2),
        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
    var k, c = (-3.141592653589793238462643383279502884197169399375105820/n),t;
    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
    for(k=0;k<n;k++) a[k] = x[k];
    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
    cx[0] = 1;
    for(k=1;k<=m/2;k++) {
        t = c*k*k;
        cx[k] = cos(t);
        cy[k] = sin(t);
        cx[m-k] = cos(t);
        cy[m-k] = sin(t)
    }
    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
    X = X.mul(Y);
    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
    X = X.mul(Y);
    X.x.length = n;
    X.y.length = n;
    return X;
}
numeric.T.prototype.ifft = function ifft() {
    var x = this.x, y = this.y;
    var n = x.length, log = Math.log, log2 = log(2),
        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
    var k, c = (3.141592653589793238462643383279502884197169399375105820/n),t;
    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
    for(k=0;k<n;k++) a[k] = x[k];
    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
    cx[0] = 1;
    for(k=1;k<=m/2;k++) {
        t = c*k*k;
        cx[k] = cos(t);
        cy[k] = sin(t);
        cx[m-k] = cos(t);
        cy[m-k] = sin(t)
    }
    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
    X = X.mul(Y);
    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
    X = X.mul(Y);
    X.x.length = n;
    X.y.length = n;
    return X.div(n);
}

//9. Unconstrained optimization
numeric.gradient = function gradient(f,x) {
    var n = x.length;
    var f0 = f(x);
    if(isNaN(f0)) throw new Error('gradient: f(x) is a NaN!');
    var max = Math.max;
    var i,x0 = numeric.clone(x),f1,f2, J = Array(n);
    var div = numeric.div, sub = numeric.sub,errest,roundoff,max = Math.max,eps = 1e-3,abs = Math.abs, min = Math.min;
    var t0,t1,t2,it=0,d1,d2,N;
    for(i=0;i<n;i++) {
        var h = max(1e-6*f0,1e-8);
        while(1) {
            ++it;
            if(it>20) { throw new Error("Numerical gradient fails"); }
            x0[i] = x[i]+h;
            f1 = f(x0);
            x0[i] = x[i]-h;
            f2 = f(x0);
            x0[i] = x[i];
            if(isNaN(f1) || isNaN(f2)) { h/=16; continue; }
            J[i] = (f1-f2)/(2*h);
            t0 = x[i]-h;
            t1 = x[i];
            t2 = x[i]+h;
            d1 = (f1-f0)/h;
            d2 = (f0-f2)/h;
            N = max(abs(J[i]),abs(f0),abs(f1),abs(f2),abs(t0),abs(t1),abs(t2),1e-8);
            errest = min(max(abs(d1-J[i]),abs(d2-J[i]),abs(d1-d2))/N,h/N);
            if(errest>eps) { h/=16; }
            else break;
            }
    }
    return J;
}

numeric.uncmin = function uncmin(f,x0,tol,gradient,maxit,callback,options) {
    var grad = numeric.gradient;
    if(typeof options === "undefined") { options = {}; }
    if(typeof tol === "undefined") { tol = 1e-8; }
    if(typeof gradient === "undefined") { gradient = function(x) { return grad(f,x); }; }
    if(typeof maxit === "undefined") maxit = 1000;
    x0 = numeric.clone(x0);
    var n = x0.length;
    var f0 = f(x0),f1,df0;
    if(isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
    var max = Math.max, norm2 = numeric.norm2;
    tol = max(tol,numeric.epsilon);
    var step,g0,g1,H1 = options.Hinv || numeric.identity(n);
    var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
    var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
    var it=0,i,s,x1,y,Hy,Hs,ys,i0,t,nstep,t1,t2;
    var msg = "";
    g0 = gradient(x0);
    while(it<maxit) {
        if(typeof callback === "function") { if(callback(it,x0,f0,g0,H1)) { msg = "Callback returned true"; break; } }
        if(!all(isfinite(g0))) { msg = "Gradient has Infinity or NaN"; break; }
        step = neg(dot(H1,g0));
        if(!all(isfinite(step))) { msg = "Search direction has Infinity or NaN"; break; }
        nstep = norm2(step);
        if(nstep < tol) { msg="Newton step smaller than tol"; break; }
        t = 1;
        df0 = dot(g0,step);
        // line search
        x1 = x0;
        while(it < maxit) {
            if(t*nstep < tol) { break; }
            s = mul(step,t);
            x1 = add(x0,s);
            f1 = f(x1);
            if(f1-f0 >= 0.1*t*df0 || isNaN(f1)) {
                t *= 0.5;
                ++it;
                continue;
            }
            break;
        }
        if(t*nstep < tol) { msg = "Line search step size smaller than tol"; break; }
        if(it === maxit) { msg = "maxit reached during line search"; break; }
        g1 = gradient(x1);
        y = sub(g1,g0);
        ys = dot(y,s);
        Hy = dot(H1,y);
        H1 = sub(add(H1,
                mul(
                        (ys+dot(y,Hy))/(ys*ys),
                        ten(s,s)    )),
                div(add(ten(Hy,s),ten(s,Hy)),ys));
        x0 = x1;
        f0 = f1;
        g0 = g1;
        ++it;
    }
    return {solution: x0, f: f0, gradient: g0, invHessian: H1, iterations:it, message: msg};
}

// 10. Ode solver (Dormand-Prince)
numeric.Dopri = function Dopri(x,y,f,ymid,iterations,msg,events) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.ymid = ymid;
    this.iterations = iterations;
    this.events = events;
    this.message = msg;
}
numeric.Dopri.prototype._at = function _at(xi,j) {
    function sqr(x) { return x*x; }
    var sol = this;
    var xs = sol.x;
    var ys = sol.y;
    var k1 = sol.f;
    var ymid = sol.ymid;
    var n = xs.length;
    var x0,x1,xh,y0,y1,yh,xi;
    var floor = Math.floor,h;
    var c = 0.5;
    var add = numeric.add, mul = numeric.mul,sub = numeric.sub, p,q,w;
    x0 = xs[j];
    x1 = xs[j+1];
    y0 = ys[j];
    y1 = ys[j+1];
    h  = x1-x0;
    xh = x0+c*h;
    yh = ymid[j];
    p = sub(k1[j  ],mul(y0,1/(x0-xh)+2/(x0-x1)));
    q = sub(k1[j+1],mul(y1,1/(x1-xh)+2/(x1-x0)));
    w = [sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
         sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
         sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
         (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0-x1) / (x0 - xh),
         (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0-x1) / (x1 - xh)];
    return add(add(add(add(mul(y0,w[0]),
                           mul(yh,w[1])),
                           mul(y1,w[2])),
                           mul( p,w[3])),
                           mul( q,w[4]));
}
numeric.Dopri.prototype.at = function at(x) {
    var i,j,k,floor = Math.floor;
    if(typeof x !== "number") {
        var n = x.length, ret = Array(n);
        for(i=n-1;i!==-1;--i) {
            ret[i] = this.at(x[i]);
        }
        return ret;
    }
    var x0 = this.x;
    i = 0; j = x0.length-1;
    while(j-i>1) {
        k = floor(0.5*(i+j));
        if(x0[k] <= x) i = k;
        else j = k;
    }
    return this._at(x,i);
}

numeric.dopri = function dopri(x0,x1,y0,f,tol,maxit,event) {
    if(typeof tol === "undefined") { tol = 1e-6; }
    if(typeof maxit === "undefined") { maxit = 1000; }
    var xs = [x0], ys = [y0], k1 = [f(x0,y0)], k2,k3,k4,k5,k6,k7, ymid = [];
    var A2 = 1/5;
    var A3 = [3/40,9/40];
    var A4 = [44/45,-56/15,32/9];
    var A5 = [19372/6561,-25360/2187,64448/6561,-212/729];
    var A6 = [9017/3168,-355/33,46732/5247,49/176,-5103/18656];
    var b = [35/384,0,500/1113,125/192,-2187/6784,11/84];
    var bm = [0.5*6025192743/30085553152,
              0,
              0.5*51252292925/65400821598,
              0.5*-2691868925/45128329728,
              0.5*187940372067/1594534317056,
              0.5*-1776094331/19743644256,
              0.5*11237099/235043384];
    var c = [1/5,3/10,4/5,8/9,1,1];
    var e = [-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,1/40];
    var i = 0,er,j;
    var h = (x1-x0)/10;
    var it = 0;
    var add = numeric.add, mul = numeric.mul, y1,erinf;
    var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf,pow = Math.pow;
    var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
    var e0, e1, ev;
    var ret = new numeric.Dopri(xs,ys,k1,ymid,-1,"");
    if(typeof event === "function") e0 = event(x0,y0);
    while(x0<x1 && it<maxit) {
        ++it;
        if(x0+h>x1) h = x1-x0;
        k2 = f(x0+c[0]*h,                add(y0,mul(   A2*h,k1[i])));
        k3 = f(x0+c[1]*h,            add(add(y0,mul(A3[0]*h,k1[i])),mul(A3[1]*h,k2)));
        k4 = f(x0+c[2]*h,        add(add(add(y0,mul(A4[0]*h,k1[i])),mul(A4[1]*h,k2)),mul(A4[2]*h,k3)));
        k5 = f(x0+c[3]*h,    add(add(add(add(y0,mul(A5[0]*h,k1[i])),mul(A5[1]*h,k2)),mul(A5[2]*h,k3)),mul(A5[3]*h,k4)));
        k6 = f(x0+c[4]*h,add(add(add(add(add(y0,mul(A6[0]*h,k1[i])),mul(A6[1]*h,k2)),mul(A6[2]*h,k3)),mul(A6[3]*h,k4)),mul(A6[4]*h,k5)));
        y1 = add(add(add(add(add(y0,mul(k1[i],h*b[0])),mul(k3,h*b[2])),mul(k4,h*b[3])),mul(k5,h*b[4])),mul(k6,h*b[5]));
        k7 = f(x0+h,y1);
        er = add(add(add(add(add(mul(k1[i],h*e[0]),mul(k3,h*e[2])),mul(k4,h*e[3])),mul(k5,h*e[4])),mul(k6,h*e[5])),mul(k7,h*e[6]));
        if(typeof er === "number") erinf = abs(er);
        else erinf = norminf(er);
        if(erinf > tol) { // reject
            h = 0.2*h*pow(tol/erinf,0.25);
            if(x0+h === x0) {
                ret.msg = "Step size became too small";
                break;
            }
            continue;
        }
        ymid[i] = add(add(add(add(add(add(y0,
                mul(k1[i],h*bm[0])),
                mul(k3   ,h*bm[2])),
                mul(k4   ,h*bm[3])),
                mul(k5   ,h*bm[4])),
                mul(k6   ,h*bm[5])),
                mul(k7   ,h*bm[6]));
        ++i;
        xs[i] = x0+h;
        ys[i] = y1;
        k1[i] = k7;
        if(typeof event === "function") {
            var yi,xl = x0,xr = x0+0.5*h,xi;
            e1 = event(xr,ymid[i-1]);
            ev = and(lt(e0,0),lt(0,e1));
            if(!any(ev)) { xl = xr; xr = x0+h; e0 = e1; e1 = event(xr,y1); ev = and(lt(e0,0),lt(0,e1)); }
            if(any(ev)) {
                var xc, yc, en,ei;
                var side=0, sl = 1.0, sr = 1.0;
                while(1) {
                    if(typeof e0 === "number") xi = (sr*e1*xl-sl*e0*xr)/(sr*e1-sl*e0);
                    else {
                        xi = xr;
                        for(j=e0.length-1;j!==-1;--j) {
                            if(e0[j]<0 && e1[j]>0) xi = min(xi,(sr*e1[j]*xl-sl*e0[j]*xr)/(sr*e1[j]-sl*e0[j]));
                        }
                    }
                    if(xi <= xl || xi >= xr) break;
                    yi = ret._at(xi, i-1);
                    ei = event(xi,yi);
                    en = and(lt(e0,0),lt(0,ei));
                    if(any(en)) {
                        xr = xi;
                        e1 = ei;
                        ev = en;
                        sr = 1.0;
                        if(side === -1) sl *= 0.5;
                        else sl = 1.0;
                        side = -1;
                    } else {
                        xl = xi;
                        e0 = ei;
                        sl = 1.0;
                        if(side === 1) sr *= 0.5;
                        else sr = 1.0;
                        side = 1;
                    }
                }
                y1 = ret._at(0.5*(x0+xi),i-1);
                ret.f[i] = f(xi,yi);
                ret.x[i] = xi;
                ret.y[i] = yi;
                ret.ymid[i-1] = y1;
                ret.events = ev;
                ret.iterations = it;
                return ret;
            }
        }
        x0 += h;
        y0 = y1;
        e0 = e1;
        h = min(0.8*h*pow(tol/erinf,0.25),4*h);
    }
    ret.iterations = it;
    return ret;
}

// 11. Ax = b
numeric.LU = function(A, fast) {
  fast = fast || false;

  var abs = Math.abs;
  var i, j, k, absAjk, Akk, Ak, Pk, Ai;
  var max;
  var n = A.length, n1 = n-1;
  var P = new Array(n);
  if(!fast) A = numeric.clone(A);

  for (k = 0; k < n; ++k) {
    Pk = k;
    Ak = A[k];
    max = abs(Ak[k]);
    for (j = k + 1; j < n; ++j) {
      absAjk = abs(A[j][k]);
      if (max < absAjk) {
        max = absAjk;
        Pk = j;
      }
    }
    P[k] = Pk;

    if (Pk != k) {
      A[k] = A[Pk];
      A[Pk] = Ak;
      Ak = A[k];
    }

    Akk = Ak[k];

    for (i = k + 1; i < n; ++i) {
      A[i][k] /= Akk;
    }

    for (i = k + 1; i < n; ++i) {
      Ai = A[i];
      for (j = k + 1; j < n1; ++j) {
        Ai[j] -= Ai[k] * Ak[j];
        ++j;
        Ai[j] -= Ai[k] * Ak[j];
      }
      if(j===n1) Ai[j] -= Ai[k] * Ak[j];
    }
  }

  return {
    LU: A,
    P:  P
  };
}

numeric.LUsolve = function LUsolve(LUP, b) {
  var i, j;
  var LU = LUP.LU;
  var n   = LU.length;
  var x = numeric.clone(b);
  var P   = LUP.P;
  var Pi, LUi, LUii, tmp;

  for (i=n-1;i!==-1;--i) x[i] = b[i];
  for (i = 0; i < n; ++i) {
    Pi = P[i];
    if (P[i] !== i) {
      tmp = x[i];
      x[i] = x[Pi];
      x[Pi] = tmp;
    }

    LUi = LU[i];
    for (j = 0; j < i; ++j) {
      x[i] -= x[j] * LUi[j];
    }
  }

  for (i = n - 1; i >= 0; --i) {
    LUi = LU[i];
    for (j = i + 1; j < n; ++j) {
      x[i] -= x[j] * LUi[j];
    }

    x[i] /= LUi[i];
  }

  return x;
}

numeric.solve = function solve(A,b,fast) { return numeric.LUsolve(numeric.LU(A,fast), b); }

// 12. Linear programming
numeric.echelonize = function echelonize(A) {
    var s = numeric.dim(A), m = s[0], n = s[1];
    var I = numeric.identity(m);
    var P = Array(m);
    var i,j,k,l,Ai,Ii,Z,a;
    var abs = Math.abs;
    var diveq = numeric.diveq;
    A = numeric.clone(A);
    for(i=0;i<m;++i) {
        k = 0;
        Ai = A[i];
        Ii = I[i];
        for(j=1;j<n;++j) if(abs(Ai[k])<abs(Ai[j])) k=j;
        P[i] = k;
        diveq(Ii,Ai[k]);
        diveq(Ai,Ai[k]);
        for(j=0;j<m;++j) if(j!==i) {
            Z = A[j]; a = Z[k];
            for(l=n-1;l!==-1;--l) Z[l] -= Ai[l]*a;
            Z = I[j];
            for(l=m-1;l!==-1;--l) Z[l] -= Ii[l]*a;
        }
    }
    return {I:I, A:A, P:P};
}

numeric.__solveLP = function __solveLP(c,A,b,tol,maxit,x,flag) {
    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
    var m = c.length, n = b.length,y;
    var unbounded = false, cb,i0=0;
    var alpha = 1.0;
    var f0,df0,AT = numeric.transpose(A), svd = numeric.svd,transpose = numeric.transpose,leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
    var muleq = numeric.muleq;
    var norm = numeric.norminf, any = numeric.any,min = Math.min;
    var all = numeric.all, gt = numeric.gt;
    var p = Array(m), A0 = Array(n),e=numeric.rep([n],1), H;
    var solve = numeric.solve, z = sub(b,dot(A,x)),count;
    var dotcc = dot(c,c);
    var g;
    for(count=i0;count<maxit;++count) {
        var i,j,d;
        for(i=n-1;i!==-1;--i) A0[i] = div(A[i],z[i]);
        var A1 = transpose(A0);
        for(i=m-1;i!==-1;--i) p[i] = (/*x[i]+*/sum(A1[i]));
        alpha = 0.25*abs(dotcc/dot(c,p));
        var a1 = 100*sqrt(dotcc/dot(p,p));
        if(!isFinite(alpha) || alpha>a1) alpha = a1;
        g = add(c,mul(alpha,p));
        H = dot(A1,A0);
        for(i=m-1;i!==-1;--i) H[i][i] += 1;
        d = solve(H,div(g,alpha),true);
        var t0 = div(z,dot(A,d));
        var t = 1.0;
        for(i=n-1;i!==-1;--i) if(t0[i]<0) t = min(t,-0.999*t0[i]);
        y = sub(x,mul(d,t));
        z = sub(b,dot(A,y));
        if(!all(gt(z,0))) return { solution: x, message: "", iterations: count };
        x = y;
        if(alpha<tol) return { solution: y, message: "", iterations: count };
        if(flag) {
            var s = dot(c,g), Ag = dot(A,g);
            unbounded = true;
            for(i=n-1;i!==-1;--i) if(s*Ag[i]<0) { unbounded = false; break; }
        } else {
            if(x[m-1]>=0) unbounded = false;
            else unbounded = true;
        }
        if(unbounded) return { solution: y, message: "Unbounded", iterations: count };
    }
    return { solution: x, message: "maximum iteration count exceeded", iterations:count };
}

numeric._solveLP = function _solveLP(c,A,b,tol,maxit) {
    var m = c.length, n = b.length,y;
    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
    var c0 = numeric.rep([m],0).concat([1]);
    var J = numeric.rep([n,1],-1);
    var A0 = numeric.blockMatrix([[A                   ,   J  ]]);
    var b0 = b;
    var y = numeric.rep([m],0).concat(Math.max(0,numeric.sup(numeric.neg(b)))+1);
    var x0 = numeric.__solveLP(c0,A0,b0,tol,maxit,y,false);
    var x = numeric.clone(x0.solution);
    x.length = m;
    var foo = numeric.inf(sub(b,dot(A,x)));
    if(foo<0) { return { solution: NaN, message: "Infeasible", iterations: x0.iterations }; }
    var ret = numeric.__solveLP(c, A, b, tol, maxit-x0.iterations, x, true);
    ret.iterations += x0.iterations;
    return ret;
};

numeric.solveLP = function solveLP(c,A,b,Aeq,beq,tol,maxit) {
    if(typeof maxit === "undefined") maxit = 1000;
    if(typeof tol === "undefined") tol = numeric.epsilon;
    if(typeof Aeq === "undefined") return numeric._solveLP(c,A,b,tol,maxit);
    var m = Aeq.length, n = Aeq[0].length, o = A.length;
    var B = numeric.echelonize(Aeq);
    var flags = numeric.rep([n],0);
    var P = B.P;
    var Q = [];
    var i;
    for(i=P.length-1;i!==-1;--i) flags[P[i]] = 1;
    for(i=n-1;i!==-1;--i) if(flags[i]===0) Q.push(i);
    var g = numeric.getRange;
    var I = numeric.linspace(0,m-1), J = numeric.linspace(0,o-1);
    var Aeq2 = g(Aeq,I,Q), A1 = g(A,J,P), A2 = g(A,J,Q), dot = numeric.dot, sub = numeric.sub;
    var A3 = dot(A1,B.I);
    var A4 = sub(A2,dot(A3,Aeq2)), b4 = sub(b,dot(A3,beq));
    var c1 = Array(P.length), c2 = Array(Q.length);
    for(i=P.length-1;i!==-1;--i) c1[i] = c[P[i]];
    for(i=Q.length-1;i!==-1;--i) c2[i] = c[Q[i]];
    var c4 = sub(c2,dot(c1,dot(B.I,Aeq2)));
    var S = numeric._solveLP(c4,A4,b4,tol,maxit);
    var x2 = S.solution;
    if(x2!==x2) return S;
    var x1 = dot(B.I,sub(beq,dot(Aeq2,x2)));
    var x = Array(c.length);
    for(i=P.length-1;i!==-1;--i) x[P[i]] = x1[i];
    for(i=Q.length-1;i!==-1;--i) x[Q[i]] = x2[i];
    return { solution: x, message:S.message, iterations: S.iterations };
}

numeric.MPStoLP = function MPStoLP(MPS) {
    if(MPS instanceof String) { MPS.split('\n'); }
    var state = 0;
    var states = ['Initial state','NAME','ROWS','COLUMNS','RHS','BOUNDS','ENDATA'];
    var n = MPS.length;
    var i,j,z,N=0,rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
    var name;
    var c = [], A = [], b = [];
    function err(e) { throw new Error('MPStoLP: '+e+'\nLine '+i+': '+MPS[i]+'\nCurrent state: '+states[state]+'\n'); }
    for(i=0;i<n;++i) {
        z = MPS[i];
        var w0 = z.match(/\S*/g);
        var w = [];
        for(j=0;j<w0.length;++j) if(w0[j]!=="") w.push(w0[j]);
        if(w.length === 0) continue;
        for(j=0;j<states.length;++j) if(z.substr(0,states[j].length) === states[j]) break;
        if(j<states.length) {
            state = j;
            if(j===1) { name = w[1]; }
            if(j===6) return { name:name, c:c, A:numeric.transpose(A), b:b, rows:rows, vars:vars };
            continue;
        }
        switch(state) {
        case 0: case 1: err('Unexpected line');
        case 2: 
            switch(w[0]) {
            case 'N': if(N===0) N = w[1]; else err('Two or more N rows'); break;
            case 'L': rows[w[1]] = rl; sign[rl] = 1; b[rl] = 0; ++rl; break;
            case 'G': rows[w[1]] = rl; sign[rl] = -1;b[rl] = 0; ++rl; break;
            case 'E': rows[w[1]] = rl; sign[rl] = 0;b[rl] = 0; ++rl; break;
            default: err('Parse error '+numeric.prettyPrint(w));
            }
            break;
        case 3:
            if(!vars.hasOwnProperty(w[0])) { vars[w[0]] = nv; c[nv] = 0; A[nv] = numeric.rep([rl],0); ++nv; }
            var p = vars[w[0]];
            for(j=1;j<w.length;j+=2) {
                if(w[j] === N) { c[p] = parseFloat(w[j+1]); continue; }
                var q = rows[w[j]];
                A[p][q] = (sign[q]<0?-1:1)*parseFloat(w[j+1]);
            }
            break;
        case 4:
            for(j=1;j<w.length;j+=2) b[rows[w[j]]] = (sign[rows[w[j]]]<0?-1:1)*parseFloat(w[j+1]);
            break;
        case 5: /*FIXME*/ break;
        case 6: err('Internal error');
        }
    }
    err('Reached end of file without ENDATA');
}
// seedrandom.js version 2.0.
// Author: David Bau 4/2/2011
//
// Defines a method Math.seedrandom() that, when called, substitutes
// an explicitly seeded RC4-based algorithm for Math.random().  Also
// supports automatic seeding from local or network sources of entropy.
//
// Usage:
//
//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
//
//   Math.seedrandom('yipee'); Sets Math.random to a function that is
//                             initialized using the given explicit seed.
//
//   Math.seedrandom();        Sets Math.random to a function that is
//                             seeded using the current time, dom state,
//                             and other accumulated local entropy.
//                             The generated seed string is returned.
//
//   Math.seedrandom('yowza', true);
//                             Seeds using the given explicit seed mixed
//                             together with accumulated entropy.
//
//   <script src="http://bit.ly/srandom-512"></script>
//                             Seeds using physical random bits downloaded
//                             from random.org.
//
//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
//   </script>                 Seeds using urandom bits from call.jsonlib.com,
//                             which is faster than random.org.
//
// Examples:
//
//   Math.seedrandom("hello");            // Use "hello" as the seed.
//   document.write(Math.random());       // Always 0.5463663768140734
//   document.write(Math.random());       // Always 0.43973793770592234
//   var rng1 = Math.random;              // Remember the current prng.
//
//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
//   document.write(Math.random());       // Pretty much unpredictable.
//
//   Math.random = rng1;                  // Continue "hello" prng sequence.
//   document.write(Math.random());       // Always 0.554769432473455
//
//   Math.seedrandom(autoseed);           // Restart at the previous seed.
//   document.write(Math.random());       // Repeat the 'unpredictable' value.
//
// Notes:
//
// Each time seedrandom('arg') is called, entropy from the passed seed
// is accumulated in a pool to help generate future seeds for the
// zero-argument form of Math.seedrandom, so entropy can be injected over
// time by calling seedrandom with explicit data repeatedly.
//
// On speed - This javascript implementation of Math.random() is about
// 3-10x slower than the built-in Math.random() because it is not native
// code, but this is typically fast enough anyway.  Seeding is more expensive,
// especially if you use auto-seeding.  Some details (timings on Chrome 4):
//
// Our Math.random()            - avg less than 0.002 milliseconds per call
// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
// seedrandom('explicit', true) - avg less than 2 milliseconds per call
// seedrandom()                 - avg about 38 milliseconds per call
//
// LICENSE (BSD):
//
// Copyright 2010 David Bau, all rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
//   1. Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
// 
//   3. Neither the name of this module nor the names of its contributors may
//      be used to endorse or promote products derived from this software
//      without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
/**
 * All code is in an anonymous closure to keep the global namespace clean.
 *
 * @param {number=} overflow 
 * @param {number=} startdenom
 */

// Patched by Seb so that seedrandom.js does not pollute the Math object.
// My tests suggest that doing Math.trouble = 1 makes Math lookups about 5%
// slower.
numeric.seedrandom = { pow:Math.pow, random:Math.random };

(function (pool, math, width, chunks, significance, overflow, startdenom) {


//
// seedrandom()
// This is the seedrandom function described above.
//
math['seedrandom'] = function seedrandom(seed, use_entropy) {
  var key = [];
  var arc4;

  // Flatten the seed string or build one from local entropy if needed.
  seed = mixkey(flatten(
    use_entropy ? [seed, pool] :
    arguments.length ? seed :
    [new Date().getTime(), pool, window], 3), key);

  // Use the seed to initialize an ARC4 generator.
  arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(arc4.S, pool);

  // Override Math.random

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  math['random'] = function random() {  // Closure to return a random double:
    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
    var d = startdenom;                 //   and denominator d = 2 ^ 48.
    var x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  // Return the seed that was used
  return seed;
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, u, me = this, keylen = key.length;
  var i = 0, j = me.i = me.j = me.m = 0;
  me.S = [];
  me.c = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) { me.S[i] = i++; }
  for (i = 0; i < width; i++) {
    t = me.S[i];
    j = lowbits(j + t + key[i % keylen]);
    u = me.S[j];
    me.S[i] = u;
    me.S[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  me.g = function getnext(count) {
    var s = me.S;
    var i = lowbits(me.i + 1); var t = s[i];
    var j = lowbits(me.j + t); var u = s[j];
    s[i] = u;
    s[j] = t;
    var r = s[lowbits(t + u)];
    while (--count) {
      i = lowbits(i + 1); t = s[i];
      j = lowbits(j + t); u = s[j];
      s[i] = u;
      s[j] = t;
      r = r * width + s[lowbits(t + u)];
    }
    me.i = i;
    me.j = j;
    return r;
  };
  // For robust unpredictability discard an initial batch of values.
  // See http://www.rsa.com/rsalabs/node.asp?id=2009
  me.g(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
/** @param {Object=} result 
  * @param {string=} prop
  * @param {string=} typ */
function flatten(obj, depth, result, prop, typ) {
  result = [];
  typ = typeof(obj);
  if (depth && typ == 'object') {
    for (prop in obj) {
      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
      }
    }
  }
  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
/** @param {number=} smear 
  * @param {number=} j */
function mixkey(seed, key, smear, j) {
  seed += '';                         // Ensure the seed is a string
  smear = 0;
  for (j = 0; j < seed.length; j++) {
    key[lowbits(j)] =
      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
  }
  seed = '';
  for (j in key) { seed += String.fromCharCode(key[j]); }
  return seed;
}

//
// lowbits()
// A quick "n mod width" for width a power of 2.
//
function lowbits(n) { return n & (width - 1); }

//
// The following constants are related to IEEE 754 limits.
//
startdenom = math.pow(width, chunks);
significance = math.pow(2, significance);
overflow = significance * 2;

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

// End anonymous scope, and pass initial values.
}(
  [],   // pool: entropy pool starts empty
  numeric.seedrandom, // math: package containing random, pow, and seedrandom
  256,  // width: each RC4 output is 0 <= x < 256
  6,    // chunks: at least six RC4 outputs for each double
  52    // significance: there are 52 significant digits in a double
  ));
/* This file is a slightly modified version of quadprog.js from Alberto Santini.
 * It has been slightly modified by Sébastien Loisel to make sure that it handles
 * 0-based Arrays instead of 1-based Arrays.
 * License is in resources/LICENSE.quadprog */
(function(exports) {

function base0to1(A) {
    if(typeof A !== "object") { return A; }
    var ret = [], i,n=A.length;
    for(i=0;i<n;i++) ret[i+1] = base0to1(A[i]);
    return ret;
}
function base1to0(A) {
    if(typeof A !== "object") { return A; }
    var ret = [], i,n=A.length;
    for(i=1;i<n;i++) ret[i-1] = base1to0(A[i]);
    return ret;
}

function dpori(a, lda, n) {
    var i, j, k, kp1, t;

    for (k = 1; k <= n; k = k + 1) {
        a[k][k] = 1 / a[k][k];
        t = -a[k][k];
        //~ dscal(k - 1, t, a[1][k], 1);
        for (i = 1; i < k; i = i + 1) {
            a[i][k] = t * a[i][k];
        }

        kp1 = k + 1;
        if (n < kp1) {
            break;
        }
        for (j = kp1; j <= n; j = j + 1) {
            t = a[k][j];
            a[k][j] = 0;
            //~ daxpy(k, t, a[1][k], 1, a[1][j], 1);
            for (i = 1; i <= k; i = i + 1) {
                a[i][j] = a[i][j] + (t * a[i][k]);
            }
        }
    }

}

function dposl(a, lda, n, b) {
    var i, k, kb, t;

    for (k = 1; k <= n; k = k + 1) {
        //~ t = ddot(k - 1, a[1][k], 1, b[1], 1);
        t = 0;
        for (i = 1; i < k; i = i + 1) {
            t = t + (a[i][k] * b[i]);
        }

        b[k] = (b[k] - t) / a[k][k];
    }

    for (kb = 1; kb <= n; kb = kb + 1) {
        k = n + 1 - kb;
        b[k] = b[k] / a[k][k];
        t = -b[k];
        //~ daxpy(k - 1, t, a[1][k], 1, b[1], 1);
        for (i = 1; i < k; i = i + 1) {
            b[i] = b[i] + (t * a[i][k]);
        }
    }
}

function dpofa(a, lda, n, info) {
    var i, j, jm1, k, t, s;

    for (j = 1; j <= n; j = j + 1) {
        info[1] = j;
        s = 0;
        jm1 = j - 1;
        if (jm1 < 1) {
            s = a[j][j] - s;
            if (s <= 0) {
                break;
            }
            a[j][j] = Math.sqrt(s);
        } else {
            for (k = 1; k <= jm1; k = k + 1) {
                //~ t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
                t = a[k][j];
                for (i = 1; i < k; i = i + 1) {
                    t = t - (a[i][j] * a[i][k]);
                }
                t = t / a[k][k];
                a[k][j] = t;
                s = s + t * t;
            }
            s = a[j][j] - s;
            if (s <= 0) {
                break;
            }
            a[j][j] = Math.sqrt(s);
        }
        info[1] = 0;
    }
}

function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat,
    bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {

    var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv,
        temp, sum, t1, tt, gc, gs, nu,
        t1inf, t2min,
        vsmall, tmpa, tmpb,
        go;

    r = Math.min(n, q);
    l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;

    vsmall = 1.0e-60;
    do {
        vsmall = vsmall + vsmall;
        tmpa = 1 + 0.1 * vsmall;
        tmpb = 1 + 0.2 * vsmall;
    } while (tmpa <= 1 || tmpb <= 1);

    for (i = 1; i <= n; i = i + 1) {
        work[i] = dvec[i];
    }
    for (i = n + 1; i <= l; i = i + 1) {
        work[i] = 0;
    }
    for (i = 1; i <= q; i = i + 1) {
        iact[i] = 0;
    }

    info = [];

    if (ierr[1] === 0) {
        dpofa(dmat, fddmat, n, info);
        if (info[1] !== 0) {
            ierr[1] = 2;
            return;
        }
        dposl(dmat, fddmat, n, dvec);
        dpori(dmat, fddmat, n);
    } else {
        for (j = 1; j <= n; j = j + 1) {
            sol[j] = 0;
            for (i = 1; i <= j; i = i + 1) {
                sol[j] = sol[j] + dmat[i][j] * dvec[i];
            }
        }
        for (j = 1; j <= n; j = j + 1) {
            dvec[j] = 0;
            for (i = j; i <= n; i = i + 1) {
                dvec[j] = dvec[j] + dmat[j][i] * sol[i];
            }
        }
    }

    crval[1] = 0;
    for (j = 1; j <= n; j = j + 1) {
        sol[j] = dvec[j];
        crval[1] = crval[1] + work[j] * sol[j];
        work[j] = 0;
        for (i = j + 1; i <= n; i = i + 1) {
            dmat[i][j] = 0;
        }
    }
    crval[1] = -crval[1] / 2;
    ierr[1] = 0;

    iwzv = n;
    iwrv = iwzv + n;
    iwuv = iwrv + r;
    iwrm = iwuv + r + 1;
    iwsv = iwrm + (r * (r + 1)) / 2;
    iwnbv = iwsv + q;

    for (i = 1; i <= q; i = i + 1) {
        sum = 0;
        for (j = 1; j <= n; j = j + 1) {
            sum = sum + amat[j][i] * amat[j][i];
        }
        work[iwnbv + i] = Math.sqrt(sum);
    }
    nact = 0;
    iter[1] = 0;
    iter[2] = 0;

    function fn_goto_50() {
        iter[1] = iter[1] + 1;

        l = iwsv;
        for (i = 1; i <= q; i = i + 1) {
            l = l + 1;
            sum = -bvec[i];
            for (j = 1; j <= n; j = j + 1) {
                sum = sum + amat[j][i] * sol[j];
            }
            if (Math.abs(sum) < vsmall) {
                sum = 0;
            }
            if (i > meq) {
                work[l] = sum;
            } else {
                work[l] = -Math.abs(sum);
                if (sum > 0) {
                    for (j = 1; j <= n; j = j + 1) {
                        amat[j][i] = -amat[j][i];
                    }
                    bvec[i] = -bvec[i];
                }
            }
        }

        for (i = 1; i <= nact; i = i + 1) {
            work[iwsv + iact[i]] = 0;
        }

        nvl = 0;
        temp = 0;
        for (i = 1; i <= q; i = i + 1) {
            if (work[iwsv + i] < temp * work[iwnbv + i]) {
                nvl = i;
                temp = work[iwsv + i] / work[iwnbv + i];
            }
        }
        if (nvl === 0) {
            return 999;
        }

        return 0;
    }

    function fn_goto_55() {
        for (i = 1; i <= n; i = i + 1) {
            sum = 0;
            for (j = 1; j <= n; j = j + 1) {
                sum = sum + dmat[j][i] * amat[j][nvl];
            }
            work[i] = sum;
        }

        l1 = iwzv;
        for (i = 1; i <= n; i = i + 1) {
            work[l1 + i] = 0;
        }
        for (j = nact + 1; j <= n; j = j + 1) {
            for (i = 1; i <= n; i = i + 1) {
                work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
            }
        }

        t1inf = true;
        for (i = nact; i >= 1; i = i - 1) {
            sum = work[i];
            l = iwrm + (i * (i + 3)) / 2;
            l1 = l - i;
            for (j = i + 1; j <= nact; j = j + 1) {
                sum = sum - work[l] * work[iwrv + j];
                l = l + j;
            }
            sum = sum / work[l1];
            work[iwrv + i] = sum;
            if (iact[i] < meq) {
                // continue;
                break;
            }
            if (sum < 0) {
                // continue;
                break;
            }
            t1inf = false;
            it1 = i;
        }

        if (!t1inf) {
            t1 = work[iwuv + it1] / work[iwrv + it1];
            for (i = 1; i <= nact; i = i + 1) {
                if (iact[i] < meq) {
                    // continue;
                    break;
                }
                if (work[iwrv + i] < 0) {
                    // continue;
                    break;
                }
                temp = work[iwuv + i] / work[iwrv + i];
                if (temp < t1) {
                    t1 = temp;
                    it1 = i;
                }
            }
        }

        sum = 0;
        for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
            sum = sum + work[i] * work[i];
        }
        if (Math.abs(sum) <= vsmall) {
            if (t1inf) {
                ierr[1] = 1;
                // GOTO 999
                return 999;
            } else {
                for (i = 1; i <= nact; i = i + 1) {
                    work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
                }
                work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
                // GOTO 700
                return 700;
            }
        } else {
            sum = 0;
            for (i = 1; i <= n; i = i + 1) {
                sum = sum + work[iwzv + i] * amat[i][nvl];
            }
            tt = -work[iwsv + nvl] / sum;
            t2min = true;
            if (!t1inf) {
                if (t1 < tt) {
                    tt = t1;
                    t2min = false;
                }
            }

            for (i = 1; i <= n; i = i + 1) {
                sol[i] = sol[i] + tt * work[iwzv + i];
                if (Math.abs(sol[i]) < vsmall) {
                    sol[i] = 0;
                }
            }

            crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
            for (i = 1; i <= nact; i = i + 1) {
                work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
            }
            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;

            if (t2min) {
                nact = nact + 1;
                iact[nact] = nvl;

                l = iwrm + ((nact - 1) * nact) / 2 + 1;
                for (i = 1; i <= nact - 1; i = i + 1) {
                    work[l] = work[i];
                    l = l + 1;
                }

                if (nact === n) {
                    work[l] = work[n];
                } else {
                    for (i = n; i >= nact + 1; i = i - 1) {
                        if (work[i] === 0) {
                            // continue;
                            break;
                        }
                        gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
                        gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
                        if (work[i - 1] >= 0) {
                            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                        } else {
                            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                        }
                        gc = work[i - 1] / temp;
                        gs = work[i] / temp;

                        if (gc === 1) {
                            // continue;
                            break;
                        }
                        if (gc === 0) {
                            work[i - 1] = gs * temp;
                            for (j = 1; j <= n; j = j + 1) {
                                temp = dmat[j][i - 1];
                                dmat[j][i - 1] = dmat[j][i];
                                dmat[j][i] = temp;
                            }
                        } else {
                            work[i - 1] = temp;
                            nu = gs / (1 + gc);
                            for (j = 1; j <= n; j = j + 1) {
                                temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
                                dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
                                dmat[j][i - 1] = temp;

                            }
                        }
                    }
                    work[l] = work[nact];
                }
            } else {
                sum = -bvec[nvl];
                for (j = 1; j <= n; j = j + 1) {
                    sum = sum + sol[j] * amat[j][nvl];
                }
                if (nvl > meq) {
                    work[iwsv + nvl] = sum;
                } else {
                    work[iwsv + nvl] = -Math.abs(sum);
                    if (sum > 0) {
                        for (j = 1; j <= n; j = j + 1) {
                            amat[j][nvl] = -amat[j][nvl];
                        }
                        bvec[nvl] = -bvec[nvl];
                    }
                }
                // GOTO 700
                return 700;
            }
        }

        return 0;
    }

    function fn_goto_797() {
        l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
        l1 = l + it1;
        if (work[l1] === 0) {
            // GOTO 798
            return 798;
        }
        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        if (work[l1 - 1] >= 0) {
            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
        } else {
            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
        }
        gc = work[l1 - 1] / temp;
        gs = work[l1] / temp;

        if (gc === 1) {
            // GOTO 798
            return 798;
        }
        if (gc === 0) {
            for (i = it1 + 1; i <= nact; i = i + 1) {
                temp = work[l1 - 1];
                work[l1 - 1] = work[l1];
                work[l1] = temp;
                l1 = l1 + i;
            }
            for (i = 1; i <= n; i = i + 1) {
                temp = dmat[i][it1];
                dmat[i][it1] = dmat[i][it1 + 1];
                dmat[i][it1 + 1] = temp;
            }
        } else {
            nu = gs / (1 + gc);
            for (i = it1 + 1; i <= nact; i = i + 1) {
                temp = gc * work[l1 - 1] + gs * work[l1];
                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
                work[l1 - 1] = temp;
                l1 = l1 + i;
            }
            for (i = 1; i <= n; i = i + 1) {
                temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
                dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
                dmat[i][it1] = temp;
            }
        }

        return 0;
    }

    function fn_goto_798() {
        l1 = l - it1;
        for (i = 1; i <= it1; i = i + 1) {
            work[l1] = work[l];
            l = l + 1;
            l1 = l1 + 1;
        }

        work[iwuv + it1] = work[iwuv + it1 + 1];
        iact[it1] = iact[it1 + 1];
        it1 = it1 + 1;
        if (it1 < nact) {
            // GOTO 797
            return 797;
        }

        return 0;
    }

    function fn_goto_799() {
        work[iwuv + nact] = work[iwuv + nact + 1];
        work[iwuv + nact + 1] = 0;
        iact[nact] = 0;
        nact = nact - 1;
        iter[2] = iter[2] + 1;

        return 0;
    }

    go = 0;
    while (true) {
        go = fn_goto_50();
        if (go === 999) {
            return;
        }
        while (true) {
            go = fn_goto_55();
            if (go === 0) {
                break;
            }
            if (go === 999) {
                return;
            }
            if (go === 700) {
                if (it1 === nact) {
                    fn_goto_799();
                } else {
                    while (true) {
                        fn_goto_797();
                        go = fn_goto_798();
                        if (go !== 797) {
                            break;
                        }
                    }
                    fn_goto_799();
                }
            }
        }
    }

}

function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
    Dmat = base0to1(Dmat);
    dvec = base0to1(dvec);
    Amat = base0to1(Amat);
    var i, n, q,
        nact, r,
        crval = [], iact = [], sol = [], work = [], iter = [],
        message;

    meq = meq || 0;
    factorized = factorized ? base0to1(factorized) : [undefined, 0];
    bvec = bvec ? base0to1(bvec) : [];

    // In Fortran the array index starts from 1
    n = Dmat.length - 1;
    q = Amat[1].length - 1;

    if (!bvec) {
        for (i = 1; i <= q; i = i + 1) {
            bvec[i] = 0;
        }
    }
    for (i = 1; i <= q; i = i + 1) {
        iact[i] = 0;
    }
    nact = 0;
    r = Math.min(n, q);
    for (i = 1; i <= n; i = i + 1) {
        sol[i] = 0;
    }
    crval[1] = 0;
    for (i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i = i + 1) {
        work[i] = 0;
    }
    for (i = 1; i <= 2; i = i + 1) {
        iter[i] = 0;
    }

    qpgen2(Dmat, dvec, n, n, sol, crval, Amat,
        bvec, n, q, meq, iact, nact, iter, work, factorized);

    message = "";
    if (factorized[1] === 1) {
        message = "constraints are inconsistent, no solution!";
    }
    if (factorized[1] === 2) {
        message = "matrix D in quadratic function is not positive definite!";
    }

    return {
        solution: base1to0(sol),
        value: base1to0(crval),
        unconstrained_solution: base1to0(dvec),
        iterations: base1to0(iter),
        iact: base1to0(iact),
        message: message
    };
}
exports.solveQP = solveQP;
}(numeric));
/*
Shanti Rao sent me this routine by private email. I had to modify it
slightly to work on Arrays instead of using a Matrix object.
It is apparently translated from http://stitchpanorama.sourceforge.net/Python/svd.py
*/

numeric.svd= function svd(A) {
    var temp;
//Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
	var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
	var tolerance= 1.e-64/prec;
	var itmax= 50;
	var c=0;
	var i=0;
	var j=0;
	var k=0;
	var l=0;
	
	var u= numeric.clone(A);
	var m= u.length;
	
	var n= u[0].length;
	
	if (m < n) throw "Need more rows than columns"
	
	var e = new Array(n);
	var q = new Array(n);
	for (i=0; i<n; i++) e[i] = q[i] = 0.0;
	var v = numeric.rep([n,n],0);
//	v.zero();
	
 	function pythag(a,b)
 	{
		a = Math.abs(a)
		b = Math.abs(b)
		if (a > b)
			return a*Math.sqrt(1.0+(b*b/a/a))
		else if (b == 0.0) 
			return a
		return b*Math.sqrt(1.0+(a*a/b/b))
	}

	//Householder's reduction to bidiagonal form

	var f= 0.0;
	var g= 0.0;
	var h= 0.0;
	var x= 0.0;
	var y= 0.0;
	var z= 0.0;
	var s= 0.0;
	
	for (i=0; i < n; i++)
	{	
		e[i]= g;
		s= 0.0;
		l= i+1;
		for (j=i; j < m; j++) 
			s += (u[j][i]*u[j][i]);
		if (s <= tolerance)
			g= 0.0;
		else
		{	
			f= u[i][i];
			g= Math.sqrt(s);
			if (f >= 0.0) g= -g;
			h= f*g-s
			u[i][i]=f-g;
			for (j=l; j < n; j++)
			{
				s= 0.0
				for (k=i; k < m; k++) 
					s += u[k][i]*u[k][j]
				f= s/h
				for (k=i; k < m; k++) 
					u[k][j]+=f*u[k][i]
			}
		}
		q[i]= g
		s= 0.0
		for (j=l; j < n; j++) 
			s= s + u[i][j]*u[i][j]
		if (s <= tolerance)
			g= 0.0
		else
		{	
			f= u[i][i+1]
			g= Math.sqrt(s)
			if (f >= 0.0) g= -g
			h= f*g - s
			u[i][i+1] = f-g;
			for (j=l; j < n; j++) e[j]= u[i][j]/h
			for (j=l; j < m; j++)
			{	
				s=0.0
				for (k=l; k < n; k++) 
					s += (u[j][k]*u[i][k])
				for (k=l; k < n; k++) 
					u[j][k]+=s*e[k]
			}	
		}
		y= Math.abs(q[i])+Math.abs(e[i])
		if (y>x) 
			x=y
	}
	
	// accumulation of right hand gtransformations
	for (i=n-1; i != -1; i+= -1)
	{	
		if (g != 0.0)
		{
		 	h= g*u[i][i+1]
			for (j=l; j < n; j++) 
				v[j][i]=u[i][j]/h
			for (j=l; j < n; j++)
			{	
				s=0.0
				for (k=l; k < n; k++) 
					s += u[i][k]*v[k][j]
				for (k=l; k < n; k++) 
					v[k][j]+=(s*v[k][i])
			}	
		}
		for (j=l; j < n; j++)
		{
			v[i][j] = 0;
			v[j][i] = 0;
		}
		v[i][i] = 1;
		g= e[i]
		l= i
	}
	
	// accumulation of left hand transformations
	for (i=n-1; i != -1; i+= -1)
	{	
		l= i+1
		g= q[i]
		for (j=l; j < n; j++) 
			u[i][j] = 0;
		if (g != 0.0)
		{
			h= u[i][i]*g
			for (j=l; j < n; j++)
			{
				s=0.0
				for (k=l; k < m; k++) s += u[k][i]*u[k][j];
				f= s/h
				for (k=i; k < m; k++) u[k][j]+=f*u[k][i];
			}
			for (j=i; j < m; j++) u[j][i] = u[j][i]/g;
		}
		else
			for (j=i; j < m; j++) u[j][i] = 0;
		u[i][i] += 1;
	}
	
	// diagonalization of the bidiagonal form
	prec= prec*x
	for (k=n-1; k != -1; k+= -1)
	{
		for (var iteration=0; iteration < itmax; iteration++)
		{	// test f splitting
			var test_convergence = false
			for (l=k; l != -1; l+= -1)
			{	
				if (Math.abs(e[l]) <= prec)
				{	test_convergence= true
					break 
				}
				if (Math.abs(q[l-1]) <= prec)
					break 
			}
			if (!test_convergence)
			{	// cancellation of e[l] if l>0
				c= 0.0
				s= 1.0
				var l1= l-1
				for (i =l; i<k+1; i++)
				{	
					f= s*e[i]
					e[i]= c*e[i]
					if (Math.abs(f) <= prec)
						break
					g= q[i]
					h= pythag(f,g)
					q[i]= h
					c= g/h
					s= -f/h
					for (j=0; j < m; j++)
					{	
						y= u[j][l1]
						z= u[j][i]
						u[j][l1] =  y*c+(z*s)
						u[j][i] = -y*s+(z*c)
					} 
				}	
			}
			// test f convergence
			z= q[k]
			if (l== k)
			{	//convergence
				if (z<0.0)
				{	//q[k] is made non-negative
					q[k]= -z
					for (j=0; j < n; j++)
						v[j][k] = -v[j][k]
				}
				break  //break out of iteration loop and move on to next k value
			}
			if (iteration >= itmax-1)
				throw 'Error: no convergence.'
			// shift from bottom 2x2 minor
			x= q[l]
			y= q[k-1]
			g= e[k-1]
			h= e[k]
			f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
			g= pythag(f,1.0)
			if (f < 0.0)
				f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
			else
				f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
			// next QR transformation
			c= 1.0
			s= 1.0
			for (i=l+1; i< k+1; i++)
			{	
				g= e[i]
				y= q[i]
				h= s*g
				g= c*g
				z= pythag(f,h)
				e[i-1]= z
				c= f/z
				s= h/z
				f= x*c+g*s
				g= -x*s+g*c
				h= y*s
				y= y*c
				for (j=0; j < n; j++)
				{	
					x= v[j][i-1]
					z= v[j][i]
					v[j][i-1] = x*c+z*s
					v[j][i] = -x*s+z*c
				}
				z= pythag(f,h)
				q[i-1]= z
				c= f/z
				s= h/z
				f= c*g+s*y
				x= -s*g+c*y
				for (j=0; j < m; j++)
				{
					y= u[j][i-1]
					z= u[j][i]
					u[j][i-1] = y*c+z*s
					u[j][i] = -y*s+z*c
				}
			}
			e[l]= 0.0
			e[k]= f
			q[k]= x
		} 
	}
		
	//vt= transpose(v)
	//return (u,q,vt)
	for (i=0;i<q.length; i++) 
	  if (q[i] < prec) q[i] = 0
	  
	//sort eigenvalues	
	for (i=0; i< n; i++)
	{	 
	//writeln(q)
	 for (j=i-1; j >= 0; j--)
	 {
	  if (q[j] < q[i])
	  {
	//  writeln(i,'-',j)
	   c = q[j]
	   q[j] = q[i]
	   q[i] = c
	   for(k=0;k<u.length;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
	   for(k=0;k<v.length;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
//	   u.swapCols(i,j)
//	   v.swapCols(i,j)
	   i = j	   
	  }
	 }	
	}
	
	return {U:u,S:q,V:v}
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
/*
 (c) 2013, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
*/

(function () { 'use strict';

// to suit your point format, run search/replace for '.x' and '.y';
// for 3D version, see 3d branch (configurability would draw significant performance overhead)

// square distance between 2 points
function getSqDist(p1, p2) {

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    return dx * dx + dy * dy;
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {

    var x = p1.x,
        y = p1.y,
        dx = p2.x - x,
        dy = p2.y - y;

    if (dx !== 0 || dy !== 0) {

        var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = p2.x;
            y = p2.y;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    dx = p.x - x;
    dy = p.y - y;

    return dx * dx + dy * dy;
}
// rest of the code doesn't care about point format

// basic distance-based simplification
function simplifyRadialDist(points, sqTolerance) {

    var prevPoint = points[0],
        newPoints = [prevPoint],
        point;

    for (var i = 1, len = points.length; i < len; i++) {
        point = points[i];

        if (getSqDist(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }

    if (prevPoint !== point) newPoints.push(point);

    return newPoints;
}

// simplification using optimized Douglas-Peucker algorithm with recursion elimination
function simplifyDouglasPeucker(points, sqTolerance) {

    var len = points.length,
        MarkerArray = typeof Uint8Array !== 'undefined' ? Uint8Array : Array,
        markers = new MarkerArray(len),
        first = 0,
        last = len - 1,
        stack = [],
        newPoints = [],
        i, maxSqDist, sqDist, index;

    markers[first] = markers[last] = 1;

    while (last) {

        maxSqDist = 0;

        for (i = first + 1; i < last; i++) {
            sqDist = getSqSegDist(points[i], points[first], points[last]);

            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }

        if (maxSqDist > sqTolerance) {
            markers[index] = 1;
            stack.push(first, index, index, last);
        }

        last = stack.pop();
        first = stack.pop();
    }

    for (i = 0; i < len; i++) {
        if (markers[i]) newPoints.push(points[i]);
    }

    return newPoints;
}

// both algorithms combined for awesome performance
function simplify(points, tolerance, highestQuality) {

    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);

    return points;
}

// export as AMD module / Node module / browser or worker variable
if (typeof define === 'function' && define.amd) define(function() { return simplify; });
else if (typeof module !== 'undefined') module.exports = simplify;
else if (typeof self !== 'undefined') self.simplify = simplify;
else window.simplify = simplify;

})();

},{}],10:[function(require,module,exports){
"use strict"

module.exports = createKDTree
module.exports.deserialize = deserializeKDTree

var ndarray = require("ndarray")
var ndselect = require("ndarray-select")
var pack = require("ndarray-pack")
var ops = require("ndarray-ops")
var ndscratch = require("ndarray-scratch")
var pool = require("typedarray-pool")
var inorderTree = require("inorder-tree-layout")
var bits = require("bit-twiddle")
var KDTHeap = require("./lib/heap.js")

function KDTree(points, ids, n, d) {
  this.points = points
  this.ids = ids
  this.dimension = d
  this.length = n
}

var proto = KDTree.prototype

proto.serialize = function() {
  if(this.length > 0) {
    return {
      p: Array.prototype.slice.call(this.points.data, 0, this.length*this.dimension),
      i: Array.prototype.slice.call(this.ids, 0, this.length)
    }
  } else {
    return { d: this.dimension }
  }
}

//Range query
proto.range = function kdtRangeQuery(lo, hi, visit) {
  var n = this.length
  if(n < 1) {
    return
  }

  //Check degenerate case
  var d = this.dimension
  for(var i=0; i<d; ++i) {
    if(hi[i] < lo[i]) {
      return
    }
  }

  var points = this.points
  var ids = this.ids

  //Walk tree in level order, skipping subtrees which do not intersect range
  var visitRange = ndscratch.malloc([n, 2, d])
  var visitIndex = pool.mallocInt32(n)
  var rangeData = visitRange.data
  var pointData = points.data
  var visitCount = 1
  var visitTop = 0
  var retval

  visitIndex[0] = 0
  pack(lo, visitRange.pick(0,0))
  pack(hi, visitRange.pick(0,1))
  
  while(visitTop < visitCount) {
    var idx = visitIndex[visitTop]
    var k = bits.log2(idx+1)%d
    var loidx = visitRange.index(visitTop, 0, 0)
    var hiidx = visitRange.index(visitTop, 1, 0)
    var pidx = points.index(idx, 0)

    var visitPoint = true
    for(var i=0; i<d; ++i) {
      var pc = pointData[pidx+i]
      if((pc < rangeData[loidx + i]) || 
         (rangeData[hiidx + i] < pc)) {
        visitPoint = false
        break
      }
    }
    if(visitPoint) {
      retval = visit(ids[idx])
      if(retval !== undefined) {
        break
      }
    }

    //Visit children
    var pk = pointData[pidx+k]
    var hk = rangeData[hiidx+k]
    var lk = rangeData[loidx+k]
    if(lk <= pk) {
      var left = 2 * idx + 1
      if(left < n) {
        visitIndex[visitCount] = left
        var y = visitRange.index(visitCount, 0, 0)
        for(var i=0; i<d; ++i) {
          rangeData[y+i] = rangeData[loidx+i]
        }
        var z = visitRange.index(visitCount, 1, 0)
        for(var i=0; i<d; ++i) {
          rangeData[z+i] = rangeData[hiidx+i]
        }
        rangeData[z+k] = Math.min(hk, pk)
        visitCount += 1
      }
    }
    if(pk <= hk) {
      var right = 2 * (idx + 1)
      if(right < n) {
        visitIndex[visitCount] = right
        var y = visitRange.index(visitCount, 0, 0)
        for(var i=0; i<d; ++i) {
          rangeData[y+i] = rangeData[loidx+i]
        }
        var z = visitRange.index(visitCount, 1, 0)
        for(var i=0; i<d; ++i) {
          rangeData[z+i] = rangeData[hiidx+i]
        }
        rangeData[y+k] = Math.max(lk, pk)
        visitCount += 1
      }
    }

    //Increment pointer
    visitTop += 1
  }
  ndscratch.free(visitRange)
  pool.free(visitIndex)
  return retval
}

proto.rnn = function(point, radius, visit) {
  if(radius < 0) {
    return
  }
  var n = this.length
  if(n < 1) {
    return
  }
  var d = this.dimension
  var points = this.points
  var ids = this.ids

  //Walk tree in level order, skipping subtrees which do not intersect sphere
  var visitDistance = ndscratch.malloc([n, d])
  var visitIndex = pool.mallocInt32(n)
  var distanceData = visitDistance.data
  var pointData = points.data
  var visitCount = 1
  var visitTop = 0
  var r2 = radius*radius
  var retval

  //Initialize top of queue
  visitIndex[0] = 0
  for(var i=0; i<d; ++i) {
    visitDistance.set(0, i, 0)
  }

  //Walk over queue
  while(visitTop < visitCount) {
    var idx = visitIndex[visitTop]
    var pidx = points.index(idx, 0)

    //Check if point in sphere
    var d2 = 0.0
    for(var i=0; i<d; ++i) {
      d2 += Math.pow(point[i] - pointData[pidx+i], 2)
    }
    if(d2 <= r2) {
      retval = visit(ids[idx])
      if(retval !== undefined) {
        break
      }
    }

    //Visit children
    var k = bits.log2(idx+1)%d
    var ds = 0.0
    var didx = visitDistance.index(visitTop, 0)
    for(var i=0; i<d; ++i) {
      if(i !== k) {
        ds += distanceData[didx + i]
      }
    }

    //Handle split axis
    var qk = point[k]
    var pk = pointData[pidx+k]
    var dk = distanceData[didx+k]
    var lk = dk
    var hk = dk
    if(qk < pk) {
      hk = Math.max(dk, Math.pow(pk - qk, 2))
    } else {
      lk = Math.max(dk, Math.pow(pk - qk, 2))
    }

    var d2l = lk + ds
    var d2h = hk + ds

    if(d2l <= r2) {
      var left = 2 * idx + 1
      if(left < n) {
        visitIndex[visitCount] = left
        var y = visitDistance.index(visitCount, 0)
        for(var i=0; i<d; ++i) {
          distanceData[y+i] = distanceData[didx+i]
        }
        distanceData[y+k] = lk
        visitCount += 1
      }
    }
    if(d2h <= r2) {
      var right = 2 * (idx + 1)
      if(right < n) {
        visitIndex[visitCount] = right
        var y = visitDistance.index(visitCount, 0)
        for(var i=0; i<d; ++i) {
          distanceData[y+i] = distanceData[didx+i]
        }
        distanceData[y+k] = hk
        visitCount += 1
      }
    }

    //Increment pointer
    visitTop += 1
  }

  ndscratch.free(visitDistance)
  pool.free(visitIndex)
  return retval
}

proto.nn = function(point, maxDistance) {
  var n = this.length
  if(n < 1) {
    return -1
  }
  if(typeof maxDistance === "number") {
    if(maxDistance < 0) {
      return -1
    } 
  } else {
    maxDistance = Infinity
  }
  var d = this.dimension
  var points = this.points
  var pointData = points.data
  var dataVector = pool.mallocFloat64(d)

  var toVisit = new KDTHeap(n, d+1)
  var index = toVisit.index
  var data = toVisit.data
  index[0] = 0
  for(var i=0; i<=d; ++i) {
    data[i] = 0
  }
  toVisit.count += 1

  var nearest = -1
  var nearestD = maxDistance

  while(toVisit.count > 0) {
    if(data[0] >= nearestD) {
      break
    }

    var idx = index[0]
    var pidx = points.index(idx, 0)
    var d2 = 0.0
    for(var i=0; i<d; ++i) {
      d2 += Math.pow(point[i]-pointData[pidx+i], 2)
    }
    if(d2 < nearestD) {
      nearestD = d2
      nearest = idx
    }

    //Compute distance bounds for children
    var k = bits.log2(idx+1)%d
    var ds = 0
    for(var i=0; i<d; ++i) {
      var dd = data[i+1]
      if(i !== k) {
        ds += dd
      }
      dataVector[i] = dd
    }
    var qk = point[k]
    var pk = pointData[pidx+k]
    var dk = dataVector[k]
    var lk = dk
    var hk = dk
    if(qk < pk) {
      hk = Math.max(dk, Math.pow(pk - qk, 2))
    } else {
      lk = Math.max(dk, Math.pow(pk - qk, 2))
    }
    var d2l = lk + ds
    var d2h = hk + ds

    toVisit.pop()
    
    if(d2l < nearestD) {
      var left = 2 * idx + 1
      if(left < n) {
        var vcount = toVisit.count
        index[vcount] = left
        var vptr = vcount * (d+1)
        data[vptr] = d2l
        for(var i=1; i<=d; ++i) {
          data[vptr+i] = dataVector[i-1]
        }
        data[vptr+k+1] = lk
        toVisit.push()
      }
    }
    if(d2h < nearestD) {
      var right = 2 * (idx + 1)
      if(right < n) {
        var vcount = toVisit.count
        index[vcount] = right
        var vptr = vcount * (d+1)
        data[vptr] = d2h
        for(var i=1; i<=d; ++i) {
          data[vptr+i] = dataVector[i-1]
        }
        data[vptr+k+1] = hk
        toVisit.push()
      }
    }
  }

  pool.freeFloat64(dataVector)
  toVisit.dispose()
  
  if(nearest < 0) {
    return -1
  }
  return this.ids[nearest]
}

proto.knn = function(point, maxPoints, maxDistance) {
  //Check degenerate cases
  if(typeof maxDistance === "number") {
    if(maxDistance < 0) {
      return []
    }
  } else {
    maxDistance = Infinity
  }
  var n = this.length
  if(n < 1) {
    return []
  }
  if(typeof maxPoints === "number") {
    if(maxPoints <= 0) {
      return []
    }
    maxPoints = Math.min(maxPoints, n)|0
  } else {
    maxPoints = n
  }
  var ids = this.ids

  var d = this.dimension
  var points = this.points
  var pointData = points.data
  var dataVector = pool.mallocFloat64(d)
  
  //List of closest points
  var closestPoints = new KDTHeap(maxPoints, 1)
  var cl_index = closestPoints.index
  var cl_data = closestPoints.data

  var toVisit = new KDTHeap(n, d+1)
  var index = toVisit.index
  var data = toVisit.data
  index[0] = 0
  for(var i=0; i<=d; ++i) {
    data[i] = 0
  }
  toVisit.count += 1

  var nearest = -1
  var nearestD = maxDistance

  while(toVisit.count > 0) {
    if(data[0] >= nearestD) {
      break
    }

    var idx = index[0]
    var pidx = points.index(idx, 0)
    var d2 = 0.0
    for(var i=0; i<d; ++i) {
      d2 += Math.pow(point[i]-pointData[pidx+i], 2)
    }
    if(d2 < nearestD) {
      if(closestPoints.count >= maxPoints) {
        closestPoints.pop()
      }
      var pcount = closestPoints.count
      cl_index[pcount] = idx
      cl_data[pcount] = -d2
      closestPoints.push()
      if(closestPoints.count >= maxPoints) {
        nearestD = -cl_data[0]
      }
    }

    //Compute distance bounds for children
    var k = bits.log2(idx+1)%d
    var ds = 0
    for(var i=0; i<d; ++i) {
      var dd = data[i+1]
      if(i !== k) {
        ds += dd
      }
      dataVector[i] = dd
    }
    var qk = point[k]
    var pk = pointData[pidx+k]
    var dk = dataVector[k]
    var lk = dk
    var hk = dk
    if(qk < pk) {
      hk = Math.max(dk, Math.pow(pk - qk, 2))
    } else {
      lk = Math.max(dk, Math.pow(pk - qk, 2))
    }
    var d2l = lk + ds
    var d2h = hk + ds

    toVisit.pop()
    if(d2l < nearestD) {
      var left = 2 * idx + 1
      if(left < n) {
        var vcount = toVisit.count
        index[vcount] = left
        var vptr = vcount * (d+1)
        data[vptr] = d2l
        for(var i=1; i<=d; ++i) {
          data[vptr+i] = dataVector[i-1]
        }
        data[vptr+k+1] = lk
        toVisit.push()
      }
    }
    if(d2h < nearestD) {
      var right = 2 * (idx + 1)
      if(right < n) {
        var vcount = toVisit.count
        index[vcount] = right
        var vptr = vcount * (d+1)
        data[vptr] = d2h
        for(var i=1; i<=d; ++i) {
          data[vptr+i] = dataVector[i-1]
        }
        data[vptr+k+1] = hk
        toVisit.push()
      }
    }
  }

  pool.freeFloat64(dataVector)
  toVisit.dispose()

  //Sort result
  var result = new Array(closestPoints.count)
  var ids = this.ids
  for(var i=closestPoints.count-1; i>=0; --i) {
    result[i] = ids[cl_index[0]]
    closestPoints.pop()
  }
  closestPoints.dispose()

  return result
}

proto.dispose = function kdtDispose() {
  pool.free(this.points.data)
  pool.freeInt32(this.ids)
  this.points = null
  this.ids = null
  this.length = 0
}

function createKDTree(points) {
  var n, d, indexed
  if(Array.isArray(points)) {
    n = points.length
    if(n === 0) {
      return new KDTree(null, null, 0, 0)
    }
    d = points[0].length
    indexed = ndarray(pool.mallocDouble(n*(d+1)), [n, d+1])
    pack(points, indexed.hi(n, d))
  } else {
    n = points.shape[0]
    d = points.shape[1]

    //Round up data type size
    var type = points.dtype
    if(type === "int8" ||
       type === "int16" ||
       type === "int32" ) {
      type = "int32"
    } else if(type === "uint8" ||
      type === "uint8_clamped" ||
      type === "buffer" ||
      type === "uint16" ||
      type === "uint32") {
      type = "uint32"
    } else if(type === "float32") {
      type = "float32"
    } else {
      type = "float64"
    }
    indexed = ndarray(pool.malloc(n*(d+1)), [n, d+1])
    ops.assign(indexed.hi(n,d), points)
  }
  for(var i=0; i<n; ++i) {
    indexed.set(i, d, i)
  }

  var pointArray = ndscratch.malloc([n, d], points.dtype)
  var indexArray = pool.mallocInt32(n)
  var pointer = 0
  var pointData = pointArray.data
  var arrayData = indexed.data
  var l2_n = bits.log2(bits.nextPow2(n))

  var sel_cmp = ndselect.compile(indexed.order, true, indexed.dtype)

  //Walk tree in level order
  var toVisit = [indexed]
  while(pointer < n) {
    var head = toVisit.shift()
    var array = head
    var nn = array.shape[0]|0
    
    //Find median
    if(nn > 1) {
      var k = bits.log2(pointer+1)%d
      var median
      var n_2 = inorderTree.root(nn)
      median = sel_cmp(array, n_2, function(a,b) {
        return a.get(k) - b.get(k)
      })

      //Copy into new array
      var pptr = pointArray.index(pointer, 0)
      var mptr = median.offset
      for(var i=0; i<d; ++i) {
        pointData[pptr++] = arrayData[mptr++]
      }
      indexArray[pointer] = arrayData[mptr]
      pointer += 1

      //Queue new items
      toVisit.push(array.hi(n_2))
      if(nn > 2) {
        toVisit.push(array.lo(n_2+1))
      }
    } else {
      //Copy into new array
      var mptr = array.offset
      var pptr = pointArray.index(pointer, 0)
      for(var i=0; i<d; ++i) {
        pointData[pptr+i] = arrayData[mptr++]
      }
      indexArray[pointer] = arrayData[mptr]
      pointer += 1
    }
  }

  //Release indexed
  pool.free(indexed.data)

  return new KDTree(pointArray, indexArray, n, d)
}

function deserializeKDTree(data) {
  var points = data.p
  var ids = data.i
  if(points) {
    var nd = points.length
    var pointArray = pool.mallocFloat64(nd)
    for(var i=0; i<nd; ++i) {
      pointArray[i] = points[i]
    }
    var n = ids.length
    var idArray = pool.mallocInt32(n)
    for(var i=0; i<n; ++i) {
      idArray[i] = ids[i]
    }
    var d = (nd/n)|0
    return new KDTree(
      ndarray(pointArray, [n,d]),
      idArray,
      n,
      d)
  } else {
    return new KDTree(null, null, 0, data.d)
  }
}
},{"./lib/heap.js":11,"bit-twiddle":12,"inorder-tree-layout":13,"ndarray":31,"ndarray-ops":15,"ndarray-pack":20,"ndarray-scratch":29,"ndarray-select":30,"typedarray-pool":34}],11:[function(require,module,exports){
"use strict"

module.exports = KDTHeap

var pool = require("typedarray-pool")

function heapParent(i) {
  if(i & 1) {
    return (i - 1) >> 1
  }
  return (i >> 1) - 1
}

function KDTHeap(n, d) {
  this.count = 0
  this.dataSize = d
  this.index = pool.mallocInt32(n)
  this.data = pool.mallocFloat64(n*d)
}

var proto = KDTHeap.prototype

proto.heapSwap = function(_i,_j) {
  var data = this.data
  var index = this.index
  var d = this.dataSize
  var tmp = index[_i]
  index[_i] = index[_j]
  index[_j] = tmp
  var aptr = d*_i
  var bptr = d*_j
  for(var _k=0; _k<d; ++_k) {
    var t2 = data[aptr]
    data[aptr] = data[bptr]
    data[bptr] = t2
    aptr += 1
    bptr += 1
  }
}

proto.heapUp = function(i) {
  var d = this.dataSize
  var index = this.index
  var data = this.data
  var w = data[d*i]
  while(i>0) {
    var parent = heapParent(i)
    if(parent >= 0) {
      var pw = data[d*parent]
      if(w < pw) {
        this.heapSwap(i, parent)
        i = parent
        continue
      }
    }
    break
  }
}

proto.heapDown = function(i) {
  var d = this.dataSize
  var index = this.index
  var data = this.data
  var count = this.count
  var w = data[d*i]
  while(true) {
    var tw = w
    var left  = 2*i + 1
    var right = 2*(i + 1)
    var next = i
    if(left < count) {
      var lw = data[d*left]
      if(lw < tw) {
        next = left
        tw = lw
      }
    }
    if(right < count) {
      var rw = data[d*right]
      if(rw < tw) {
        next = right
      }
    }
    if(next === i) {
      break
    }
    this.heapSwap(i, next)
    i = next      
  }
}

//Clear item from top of heap
proto.pop = function() {
  this.count -= 1
  this.heapSwap(0, this.count)
  this.heapDown(0)
}

//Assume object already written to data
proto.push = function() {
  this.heapUp(this.count)
  this.count += 1
}

proto.dispose = function() {
  pool.freeInt32(this.index)
  pool.freeFloat64(this.data)
}
},{"typedarray-pool":34}],12:[function(require,module,exports){
/**
 * Bit twiddling hacks for JavaScript.
 *
 * Author: Mikola Lysenko
 *
 * Ported from Stanford bit twiddling hack library:
 *    http://graphics.stanford.edu/~seander/bithacks.html
 */

"use strict"; "use restrict";

//Number of bits in an integer
var INT_BITS = 32;

//Constants
exports.INT_BITS  = INT_BITS;
exports.INT_MAX   =  0x7fffffff;
exports.INT_MIN   = -1<<(INT_BITS-1);

//Returns -1, 0, +1 depending on sign of x
exports.sign = function(v) {
  return (v > 0) - (v < 0);
}

//Computes absolute value of integer
exports.abs = function(v) {
  var mask = v >> (INT_BITS-1);
  return (v ^ mask) - mask;
}

//Computes minimum of integers x and y
exports.min = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
}

//Computes maximum of integers x and y
exports.max = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
}

//Checks if a number is a power of two
exports.isPow2 = function(v) {
  return !(v & (v-1)) && (!!v);
}

//Computes log base 2 of v
exports.log2 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
}

//Computes log base 10 of v
exports.log10 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
}

//Counts number of bits
exports.popCount = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
}

//Counts number of trailing zeros
function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
exports.countTrailingZeros = countTrailingZeros;

//Rounds to next power of 2
exports.nextPow2 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}

//Rounds down to previous power of 2
exports.prevPow2 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
}

//Computes parity of word
exports.parity = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
}

var REVERSE_TABLE = new Array(256);

(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE);

//Reverse bits in a 32 bit word
exports.reverse = function(v) {
  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE[(v >>> 24) & 0xff];
}

//Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
exports.interleave2 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;

  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;

  return x | (y << 1);
}

//Extracts the nth interleaved component
exports.deinterleave2 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
}


//Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
exports.interleave3 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;

  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  
  return x | (z << 2);
}

//Extracts nth interleaved component of a 3-tuple
exports.deinterleave3 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
}

//Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
exports.nextCombination = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
}


},{}],13:[function(require,module,exports){
"use strict"

var bits = require("bit-twiddle")

function rootInorder(n) {
  var ptree = (bits.nextPow2(n+1)>>>1) - 1
  var f     = n - ptree
  if(bits.nextPow2(f)-1 >= ptree) {
    return ptree
  }
  return (ptree>>>1)+f
}
exports.root = rootInorder

function beginInorder(n) {
  return 0
}
exports.begin = beginInorder

function endInorder(n) {
  return n-1
}
exports.end = endInorder


//This is really horrible because n is not necessarily a power of 2
// If it was, we could just do:
//
//    height = bits.countTrailingZeros(~x)
//
// Instead, we just binary search because doing the right thing here is way too complicated.
function heightInorder(n, x) {
  if(n <= 0) {
    return 0
  }
  var r = rootInorder(n)
  if(x > r) {
    return heightInorder(n-r-1, x-r-1)
  } else if(x === r) {
    return bits.log2(n)
  }
  return heightInorder(r, x)
}
exports.height = heightInorder

function prevInorder(n, x) {
  return Math.max(x-1,0)
}
exports.prev = prevInorder

function nextInorder(n, x) {
  return Math.min(x+1,n-1)
}
exports.next = nextInorder


//The version for n = (1<<k)-1:
//
//  parent = (x & ~(1<<(h+1))) + (1<<h)
//
function parentInorder(n, x) {
  if(n <= 0) {
    return -1
  }
  var r = rootInorder(n)
  if(x > r) {
    var q = parentInorder(n-r-1, x-r-1)
    if(q < 0) {
      return r
    } else {
      return q + r + 1
    }
  } else if(x === r) {
    return -1
  }
  var q =  parentInorder(r, x)
  if(q < 0) {
    return r
  }
  return q
}
exports.parent = parentInorder


//Again, we get screwed because n is not a power of two -1.  If it was, we could do:
//
//    left = x - (1 << (h-1) )
//
// Where h is the height of the node
//
function leftInorder(n, x) {
  if(n <= 0) {
    return 0
  }
  var r = rootInorder(n)
  if(x > r) {
    return leftInorder(n-r-1, x-r-1) + r + 1
  } else if(x === r) {
    return rootInorder(x)
  }
  return leftInorder(r, x)

}
exports.left = leftInorder

//for power of two minus one:
//
//    right = x + (1<<(h-1))
//
function rightInorder(n, x) {
  if(n <= 0) {
    return 0
  }
  var r = rootInorder(n)
  if(x > r) {
    return rightInorder(n-r-1, x-r-1) + r + 1
  } else if(x === r) {
    return rootInorder(n-r-1) + r + 1
  }
  return rightInorder(r, x)
}
exports.right = rightInorder


function leafInorder(n, x) {
  return heightInorder(n, x) === 0
}
exports.leaf = leafInorder


function loInorder(n, x) {
  n |= 0
  x |= 0
  var l = 0
  while(n > 1) {
    var r = rootInorder(n)
    if(x > r) {
      l += r + 1
      n -= r + 1
      x -= r + 1
    } else if(x === r) {
      break
    } else {
      n = r
    }
  }
  return l
}
exports.lo = loInorder

function hiInorder(n, x) {
  n |= 0
  x |= 0
  var l = 0
  while(n > 1) {
    var r = rootInorder(n)
    if(x > r) {
      l += r + 1
      n -= r + 1
      x -= r + 1
    } else if(x === r) {
      l += n-1
      break
    } else {
      n = r
    }
  }
  return l
}
exports.hi = hiInorder

},{"bit-twiddle":14}],14:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"dup":12}],15:[function(require,module,exports){
"use strict"

var compile = require("cwise-compiler")

var EmptyProc = {
  body: "",
  args: [],
  thisVars: [],
  localVars: []
}

function fixup(x) {
  if(!x) {
    return EmptyProc
  }
  for(var i=0; i<x.args.length; ++i) {
    var a = x.args[i]
    if(i === 0) {
      x.args[i] = {name: a, lvalue:true, rvalue: !!x.rvalue, count:x.count||1 }
    } else {
      x.args[i] = {name: a, lvalue:false, rvalue:true, count: 1}
    }
  }
  if(!x.thisVars) {
    x.thisVars = []
  }
  if(!x.localVars) {
    x.localVars = []
  }
  return x
}

function pcompile(user_args) {
  return compile({
    args:     user_args.args,
    pre:      fixup(user_args.pre),
    body:     fixup(user_args.body),
    post:     fixup(user_args.proc),
    funcName: user_args.funcName
  })
}

function makeOp(user_args) {
  var args = []
  for(var i=0; i<user_args.args.length; ++i) {
    args.push("a"+i)
  }
  var wrapper = new Function("P", [
    "return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {P(", args.join(","), ");return a0}"
  ].join(""))
  return wrapper(pcompile(user_args))
}

var assign_ops = {
  add:  "+",
  sub:  "-",
  mul:  "*",
  div:  "/",
  mod:  "%",
  band: "&",
  bor:  "|",
  bxor: "^",
  lshift: "<<",
  rshift: ">>",
  rrshift: ">>>"
}
;(function(){
  for(var id in assign_ops) {
    var op = assign_ops[id]
    exports[id] = makeOp({
      args: ["array","array","array"],
      body: {args:["a","b","c"],
             body: "a=b"+op+"c"},
      funcName: id
    })
    exports[id+"eq"] = makeOp({
      args: ["array","array"],
      body: {args:["a","b"],
             body:"a"+op+"=b"},
      rvalue: true,
      funcName: id+"eq"
    })
    exports[id+"s"] = makeOp({
      args: ["array", "array", "scalar"],
      body: {args:["a","b","s"],
             body:"a=b"+op+"s"},
      funcName: id+"s"
    })
    exports[id+"seq"] = makeOp({
      args: ["array","scalar"],
      body: {args:["a","s"],
             body:"a"+op+"=s"},
      rvalue: true,
      funcName: id+"seq"
    })
  }
})();

var unary_ops = {
  not: "!",
  bnot: "~",
  neg: "-",
  recip: "1.0/"
}
;(function(){
  for(var id in unary_ops) {
    var op = unary_ops[id]
    exports[id] = makeOp({
      args: ["array", "array"],
      body: {args:["a","b"],
             body:"a="+op+"b"},
      funcName: id
    })
    exports[id+"eq"] = makeOp({
      args: ["array"],
      body: {args:["a"],
             body:"a="+op+"a"},
      rvalue: true,
      count: 2,
      funcName: id+"eq"
    })
  }
})();

var binary_ops = {
  and: "&&",
  or: "||",
  eq: "===",
  neq: "!==",
  lt: "<",
  gt: ">",
  leq: "<=",
  geq: ">="
}
;(function() {
  for(var id in binary_ops) {
    var op = binary_ops[id]
    exports[id] = makeOp({
      args: ["array","array","array"],
      body: {args:["a", "b", "c"],
             body:"a=b"+op+"c"},
      funcName: id
    })
    exports[id+"s"] = makeOp({
      args: ["array","array","scalar"],
      body: {args:["a", "b", "s"],
             body:"a=b"+op+"s"},
      funcName: id+"s"
    })
    exports[id+"eq"] = makeOp({
      args: ["array", "array"],
      body: {args:["a", "b"],
             body:"a=a"+op+"b"},
      rvalue:true,
      count:2,
      funcName: id+"eq"
    })
    exports[id+"seq"] = makeOp({
      args: ["array", "scalar"],
      body: {args:["a","s"],
             body:"a=a"+op+"s"},
      rvalue:true,
      count:2,
      funcName: id+"seq"
    })
  }
})();

var math_unary = [
  "abs",
  "acos",
  "asin",
  "atan",
  "ceil",
  "cos",
  "exp",
  "floor",
  "log",
  "round",
  "sin",
  "sqrt",
  "tan"
]
;(function() {
  for(var i=0; i<math_unary.length; ++i) {
    var f = math_unary[i]
    exports[f] = makeOp({
                    args: ["array", "array"],
                    pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                    body: {args:["a","b"], body:"a=this_f(b)", thisVars:["this_f"]},
                    funcName: f
                  })
    exports[f+"eq"] = makeOp({
                      args: ["array"],
                      pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                      body: {args: ["a"], body:"a=this_f(a)", thisVars:["this_f"]},
                      rvalue: true,
                      count: 2,
                      funcName: f+"eq"
                    })
  }
})();

var math_comm = [
  "max",
  "min",
  "atan2",
  "pow"
]
;(function(){
  for(var i=0; i<math_comm.length; ++i) {
    var f= math_comm[i]
    exports[f] = makeOp({
                  args:["array", "array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(b,c)", thisVars:["this_f"]},
                  funcName: f
                })
    exports[f+"s"] = makeOp({
                  args:["array", "array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(b,c)", thisVars:["this_f"]},
                  funcName: f+"s"
                  })
    exports[f+"eq"] = makeOp({ args:["array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(a,b)", thisVars:["this_f"]},
                  rvalue: true,
                  count: 2,
                  funcName: f+"eq"
                  })
    exports[f+"seq"] = makeOp({ args:["array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(a,b)", thisVars:["this_f"]},
                  rvalue:true,
                  count:2,
                  funcName: f+"seq"
                  })
  }
})();

var math_noncomm = [
  "atan2",
  "pow"
]
;(function(){
  for(var i=0; i<math_noncomm.length; ++i) {
    var f= math_noncomm[i]
    exports[f+"op"] = makeOp({
                  args:["array", "array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(c,b)", thisVars:["this_f"]},
                  funcName: f+"op"
                })
    exports[f+"ops"] = makeOp({
                  args:["array", "array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(c,b)", thisVars:["this_f"]},
                  funcName: f+"ops"
                  })
    exports[f+"opeq"] = makeOp({ args:["array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(b,a)", thisVars:["this_f"]},
                  rvalue: true,
                  count: 2,
                  funcName: f+"opeq"
                  })
    exports[f+"opseq"] = makeOp({ args:["array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(b,a)", thisVars:["this_f"]},
                  rvalue:true,
                  count:2,
                  funcName: f+"opseq"
                  })
  }
})();

exports.any = compile({
  args:["array"],
  pre: EmptyProc,
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "if(a){return true}", localVars: [], thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return false"},
  funcName: "any"
})

exports.all = compile({
  args:["array"],
  pre: EmptyProc,
  body: {args:[{name:"x", lvalue:false, rvalue:true, count:1}], body: "if(!x){return false}", localVars: [], thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return true"},
  funcName: "all"
})

exports.sum = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "this_s+=a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "sum"
})

exports.prod = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=1"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "this_s*=a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "prod"
})

exports.norm2squared = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:2}], body: "this_s+=a*a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norm2squared"
})
  
exports.norm2 = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:2}], body: "this_s+=a*a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return Math.sqrt(this_s)"},
  funcName: "norm2"
})
  

exports.norminf = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:4}], body:"if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norminf"
})

exports.norm1 = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:3}], body: "this_s+=a<0?-a:a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norm1"
})

exports.sup = compile({
  args: [ "array" ],
  pre:
   { body: "this_h=-Infinity",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] },
  body:
   { body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
     args: [{"name":"_inline_1_arg0_","lvalue":false,"rvalue":true,"count":2} ],
     thisVars: [ "this_h" ],
     localVars: [] },
  post:
   { body: "return this_h",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] }
 })

exports.inf = compile({
  args: [ "array" ],
  pre:
   { body: "this_h=Infinity",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] },
  body:
   { body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
     args: [{"name":"_inline_1_arg0_","lvalue":false,"rvalue":true,"count":2} ],
     thisVars: [ "this_h" ],
     localVars: [] },
  post:
   { body: "return this_h",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] }
 })

exports.argmin = compile({
  args:["index","array","shape"],
  pre:{
    body:"{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
    args:[
      {name:"_inline_0_arg0_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg1_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg2_",lvalue:false,rvalue:true,count:1}
      ],
    thisVars:["this_i","this_v"],
    localVars:[]},
  body:{
    body:"{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
    args:[
      {name:"_inline_1_arg0_",lvalue:false,rvalue:true,count:2},
      {name:"_inline_1_arg1_",lvalue:false,rvalue:true,count:2}],
    thisVars:["this_i","this_v"],
    localVars:["_inline_1_k"]},
  post:{
    body:"{return this_i}",
    args:[],
    thisVars:["this_i"],
    localVars:[]}
})

exports.argmax = compile({
  args:["index","array","shape"],
  pre:{
    body:"{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
    args:[
      {name:"_inline_0_arg0_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg1_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg2_",lvalue:false,rvalue:true,count:1}
      ],
    thisVars:["this_i","this_v"],
    localVars:[]},
  body:{
    body:"{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
    args:[
      {name:"_inline_1_arg0_",lvalue:false,rvalue:true,count:2},
      {name:"_inline_1_arg1_",lvalue:false,rvalue:true,count:2}],
    thisVars:["this_i","this_v"],
    localVars:["_inline_1_k"]},
  post:{
    body:"{return this_i}",
    args:[],
    thisVars:["this_i"],
    localVars:[]}
})  

exports.random = makeOp({
  args: ["array"],
  pre: {args:[], body:"this_f=Math.random", thisVars:["this_f"]},
  body: {args: ["a"], body:"a=this_f()", thisVars:["this_f"]},
  funcName: "random"
})

exports.assign = makeOp({
  args:["array", "array"],
  body: {args:["a", "b"], body:"a=b"},
  funcName: "assign" })

exports.assigns = makeOp({
  args:["array", "scalar"],
  body: {args:["a", "b"], body:"a=b"},
  funcName: "assigns" })


exports.equals = compile({
  args:["array", "array"],
  pre: EmptyProc,
  body: {args:[{name:"x", lvalue:false, rvalue:true, count:1},
               {name:"y", lvalue:false, rvalue:true, count:1}], 
        body: "if(x!==y){return false}", 
        localVars: [], 
        thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return true"},
  funcName: "equals"
})



},{"cwise-compiler":16}],16:[function(require,module,exports){
"use strict"

var createThunk = require("./lib/thunk.js")

function Procedure() {
  this.argTypes = []
  this.shimArgs = []
  this.arrayArgs = []
  this.scalarArgs = []
  this.offsetArgs = []
  this.offsetArgIndex = []
  this.indexArgs = []
  this.shapeArgs = []
  this.funcName = ""
  this.pre = null
  this.body = null
  this.post = null
  this.debug = false
}

function compileCwise(user_args) {
  //Create procedure
  var proc = new Procedure()
  
  //Parse blocks
  proc.pre    = user_args.pre
  proc.body   = user_args.body
  proc.post   = user_args.post

  //Parse arguments
  var proc_args = user_args.args.slice(0)
  proc.argTypes = proc_args
  for(var i=0; i<proc_args.length; ++i) {
    var arg_type = proc_args[i]
    if(arg_type === "array") {
      proc.arrayArgs.push(i)
      proc.shimArgs.push("array" + i)
      if(i < proc.pre.args.length && proc.pre.args[i].count>0) {
        throw new Error("cwise: pre() block may not reference array args")
      }
      if(i < proc.post.args.length && proc.post.args[i].count>0) {
        throw new Error("cwise: post() block may not reference array args")
      }
    } else if(arg_type === "scalar") {
      proc.scalarArgs.push(i)
      proc.shimArgs.push("scalar" + i)
    } else if(arg_type === "index") {
      proc.indexArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array index")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array index")
      }
      if(i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array index")
      }
    } else if(arg_type === "shape") {
      proc.shapeArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].lvalue) {
        throw new Error("cwise: pre() block may not write to array shape")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array shape")
      }
      if(i < proc.post.args.length && proc.post.args[i].lvalue) {
        throw new Error("cwise: post() block may not write to array shape")
      }
    } else if(typeof arg_type === "object" && arg_type.offset) {
      proc.argTypes[i] = "offset"
      proc.offsetArgs.push({ array: arg_type.array, offset:arg_type.offset })
      proc.offsetArgIndex.push(i)
    } else {
      throw new Error("cwise: Unknown argument type " + proc_args[i])
    }
  }
  
  //Make sure at least one array argument was specified
  if(proc.arrayArgs.length <= 0) {
    throw new Error("cwise: No array arguments specified")
  }
  
  //Make sure arguments are correct
  if(proc.pre.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in pre() block")
  }
  if(proc.body.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in body() block")
  }
  if(proc.post.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in post() block")
  }

  //Check debug flag
  proc.debug = !!user_args.printCode || !!user_args.debug
  
  //Retrieve name
  proc.funcName = user_args.funcName || "cwise"
  
  //Read in block size
  proc.blockSize = user_args.blockSize || 64

  return createThunk(proc)
}

module.exports = compileCwise

},{"./lib/thunk.js":18}],17:[function(require,module,exports){
"use strict"

var uniq = require("uniq")

function innerFill(order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , has_index = proc.indexArgs.length>0
    , code = []
    , vars = []
    , idx=0, pidx=0, i, j
  for(i=0; i<dimension; ++i) {
    vars.push(["i",i,"=0"].join(""))
  }
  //Compute scan deltas
  for(j=0; j<nargs; ++j) {
    for(i=0; i<dimension; ++i) {
      pidx = idx
      idx = order[i]
      if(i === 0) {
        vars.push(["d",j,"s",i,"=t",j,"p",idx].join(""))
      } else {
        vars.push(["d",j,"s",i,"=(t",j,"p",idx,"-s",pidx,"*t",j,"p",pidx,")"].join(""))
      }
    }
  }
  code.push("var " + vars.join(","))
  //Scan loop
  for(i=dimension-1; i>=0; --i) {
    idx = order[i]
    code.push(["for(i",i,"=0;i",i,"<s",idx,";++i",i,"){"].join(""))
  }
  //Push body of inner loop
  code.push(body)
  //Advance scan pointers
  for(i=0; i<dimension; ++i) {
    pidx = idx
    idx = order[i]
    for(j=0; j<nargs; ++j) {
      code.push(["p",j,"+=d",j,"s",i].join(""))
    }
    if(has_index) {
      if(i > 0) {
        code.push(["index[",pidx,"]-=s",pidx].join(""))
      }
      code.push(["++index[",idx,"]"].join(""))
    }
    code.push("}")
  }
  return code.join("\n")
}

function outerFill(matched, order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , blockSize = proc.blockSize
    , has_index = proc.indexArgs.length > 0
    , code = []
  for(var i=0; i<nargs; ++i) {
    code.push(["var offset",i,"=p",i].join(""))
  }
  //Generate matched loops
  for(var i=matched; i<dimension; ++i) {
    code.push(["for(var j"+i+"=SS[", order[i], "]|0;j", i, ">0;){"].join(""))
    code.push(["if(j",i,"<",blockSize,"){"].join(""))
    code.push(["s",order[i],"=j",i].join(""))
    code.push(["j",i,"=0"].join(""))
    code.push(["}else{s",order[i],"=",blockSize].join(""))
    code.push(["j",i,"-=",blockSize,"}"].join(""))
    if(has_index) {
      code.push(["index[",order[i],"]=j",i].join(""))
    }
  }
  for(var i=0; i<nargs; ++i) {
    var indexStr = ["offset"+i]
    for(var j=matched; j<dimension; ++j) {
      indexStr.push(["j",j,"*t",i,"p",order[j]].join(""))
    }
    code.push(["p",i,"=(",indexStr.join("+"),")"].join(""))
  }
  code.push(innerFill(order, proc, body))
  for(var i=matched; i<dimension; ++i) {
    code.push("}")
  }
  return code.join("\n")
}

//Count the number of compatible inner orders
function countMatches(orders) {
  var matched = 0, dimension = orders[0].length
  while(matched < dimension) {
    for(var j=1; j<orders.length; ++j) {
      if(orders[j][matched] !== orders[0][matched]) {
        return matched
      }
    }
    ++matched
  }
  return matched
}

//Processes a block according to the given data types
function processBlock(block, proc, dtypes) {
  var code = block.body
  var pre = []
  var post = []
  for(var i=0; i<block.args.length; ++i) {
    var carg = block.args[i]
    if(carg.count <= 0) {
      continue
    }
    var re = new RegExp(carg.name, "g")
    var ptrStr = ""
    var arrNum = proc.arrayArgs.indexOf(i)
    switch(proc.argTypes[i]) {
      case "offset":
        var offArgIndex = proc.offsetArgIndex.indexOf(i)
        var offArg = proc.offsetArgs[offArgIndex]
        arrNum = offArg.array
        ptrStr = "+q" + offArgIndex
      case "array":
        ptrStr = "p" + arrNum + ptrStr
        var localStr = "l" + i
        var arrStr = "a" + arrNum
        if(carg.count === 1) {
          if(dtypes[arrNum] === "generic") {
            if(carg.lvalue) {
              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join(""))
              code = code.replace(re, localStr)
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            } else {
              code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
            }
          } else {
            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
          }
        } else if(dtypes[arrNum] === "generic") {
          pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join(""))
          code = code.replace(re, localStr)
          if(carg.lvalue) {
            post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
          }
        } else {
          pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join(""))
          code = code.replace(re, localStr)
          if(carg.lvalue) {
            post.push([arrStr, "[", ptrStr, "]=", localStr].join(""))
          }
        }
      break
      case "scalar":
        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i))
      break
      case "index":
        code = code.replace(re, "index")
      break
      case "shape":
        code = code.replace(re, "shape")
      break
    }
  }
  return [pre.join("\n"), code, post.join("\n")].join("\n").trim()
}

function typeSummary(dtypes) {
  var summary = new Array(dtypes.length)
  var allEqual = true
  for(var i=0; i<dtypes.length; ++i) {
    var t = dtypes[i]
    var digits = t.match(/\d+/)
    if(!digits) {
      digits = ""
    } else {
      digits = digits[0]
    }
    if(t.charAt(0) === 0) {
      summary[i] = "u" + t.charAt(1) + digits
    } else {
      summary[i] = t.charAt(0) + digits
    }
    if(i > 0) {
      allEqual = allEqual && summary[i] === summary[i-1]
    }
  }
  if(allEqual) {
    return summary[0]
  }
  return summary.join("")
}

//Generates a cwise operator
function generateCWiseOp(proc, typesig) {

  //Compute dimension
  var dimension = typesig[1].length|0
  var orders = new Array(proc.arrayArgs.length)
  var dtypes = new Array(proc.arrayArgs.length)

  //First create arguments for procedure
  var arglist = ["SS"]
  var code = ["'use strict'"]
  var vars = []
  
  for(var j=0; j<dimension; ++j) {
    vars.push(["s", j, "=SS[", j, "]"].join(""))
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    arglist.push("a"+i)
    arglist.push("t"+i)
    arglist.push("p"+i)
    dtypes[i] = typesig[2*i]
    orders[i] = typesig[2*i+1]
    
    for(var j=0; j<dimension; ++j) {
      vars.push(["t",i,"p",j,"=t",i,"[",j,"]"].join(""))
    }
  }
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    arglist.push("Y" + i)
  }
  if(proc.shapeArgs.length > 0) {
    vars.push("shape=SS.slice(0)")
  }
  if(proc.indexArgs.length > 0) {
    var zeros = new Array(dimension)
    for(var i=0; i<dimension; ++i) {
      zeros[i] = "0"
    }
    vars.push(["index=[", zeros.join(","), "]"].join(""))
  }
  for(var i=0; i<proc.offsetArgs.length; ++i) {
    var off_arg = proc.offsetArgs[i]
    var init_string = []
    for(var j=0; j<off_arg.offset.length; ++j) {
      if(off_arg.offset[j] === 0) {
        continue
      } else if(off_arg.offset[j] === 1) {
        init_string.push(["t", off_arg.array, "p", j].join(""))      
      } else {
        init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""))
      }
    }
    if(init_string.length === 0) {
      vars.push("q" + i + "=0")
    } else {
      vars.push(["q", i, "=", init_string.join("+")].join(""))
    }
  }

  //Prepare this variables
  var thisVars = uniq([].concat(proc.pre.thisVars)
                      .concat(proc.body.thisVars)
                      .concat(proc.post.thisVars))
  vars = vars.concat(thisVars)
  code.push("var " + vars.join(","))
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    code.push("p"+i+"|=0")
  }
  
  //Inline prelude
  if(proc.pre.body.length > 3) {
    code.push(processBlock(proc.pre, proc, dtypes))
  }

  //Process body
  var body = processBlock(proc.body, proc, dtypes)
  var matched = countMatches(orders)
  if(matched < dimension) {
    code.push(outerFill(matched, orders[0], proc, body))
  } else {
    code.push(innerFill(orders[0], proc, body))
  }

  //Inline epilog
  if(proc.post.body.length > 3) {
    code.push(processBlock(proc.post, proc, dtypes))
  }
  
  if(proc.debug) {
    console.log("Generated cwise routine for ", typesig, ":\n\n", code.join("\n"))
  }
  
  var loopName = [(proc.funcName||"unnamed"), "_cwise_loop_", orders[0].join("s"),"m",matched,typeSummary(dtypes)].join("")
  var f = new Function(["function ",loopName,"(", arglist.join(","),"){", code.join("\n"),"} return ", loopName].join(""))
  return f()
}
module.exports = generateCWiseOp
},{"uniq":19}],18:[function(require,module,exports){
"use strict"

var compile = require("./compile.js")

function createThunk(proc) {
  var code = ["'use strict'", "var CACHED={}"]
  var vars = []
  var thunkName = proc.funcName + "_cwise_thunk"
  
  //Build thunk
  code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""))
  var typesig = []
  var string_typesig = []
  var proc_args = [["array",proc.arrayArgs[0],".shape"].join("")]
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    var j = proc.arrayArgs[i]
    vars.push(["t", j, "=array", j, ".dtype,",
               "r", j, "=array", j, ".order"].join(""))
    typesig.push("t" + j)
    typesig.push("r" + j)
    string_typesig.push("t"+j)
    string_typesig.push("r"+j+".join()")
    proc_args.push("array" + j + ".data")
    proc_args.push("array" + j + ".stride")
    proc_args.push("array" + j + ".offset|0")
  }
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    proc_args.push("scalar" + proc.scalarArgs[i])
  }
  vars.push(["type=[", string_typesig.join(","), "].join()"].join(""))
  vars.push("proc=CACHED[type]")
  code.push("var " + vars.join(","))
  
  code.push(["if(!proc){",
             "CACHED[type]=proc=compile([", typesig.join(","), "])}",
             "return proc(", proc_args.join(","), ")}"].join(""))

  if(proc.debug) {
    console.log("Generated thunk:", code.join("\n"))
  }
  
  //Compile thunk
  var thunk = new Function("compile", code.join("\n"))
  return thunk(compile.bind(undefined, proc))
}

module.exports = createThunk

},{"./compile.js":17}],19:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],20:[function(require,module,exports){
"use strict"

var ndarray = require("ndarray")
var do_convert = require("./doConvert.js")

module.exports = function convert(arr, result) {
  var shape = [], c = arr, sz = 1
  while(c instanceof Array) {
    shape.push(c.length)
    sz *= c.length
    c = c[0]
  }
  if(shape.length === 0) {
    return ndarray()
  }
  if(!result) {
    result = ndarray(new Float64Array(sz), shape)
  }
  do_convert(result, arr)
  return result
}

},{"./doConvert.js":21,"ndarray":31}],21:[function(require,module,exports){
module.exports=require('cwise-compiler')({"args":["array","scalar","index"],"pre":{"body":"{}","args":[],"thisVars":[],"localVars":[]},"body":{"body":"{\nvar _inline_1_v=_inline_1_arg1_,_inline_1_i\nfor(_inline_1_i=0;_inline_1_i<_inline_1_arg2_.length-1;++_inline_1_i) {\n_inline_1_v=_inline_1_v[_inline_1_arg2_[_inline_1_i]]\n}\n_inline_1_arg0_=_inline_1_v[_inline_1_arg2_[_inline_1_arg2_.length-1]]\n}","args":[{"name":"_inline_1_arg0_","lvalue":true,"rvalue":false,"count":1},{"name":"_inline_1_arg1_","lvalue":false,"rvalue":true,"count":1},{"name":"_inline_1_arg2_","lvalue":false,"rvalue":true,"count":4}],"thisVars":[],"localVars":["_inline_1_i","_inline_1_v"]},"post":{"body":"{}","args":[],"thisVars":[],"localVars":[]},"funcName":"convert","blockSize":64})

},{"cwise-compiler":22}],22:[function(require,module,exports){
"use strict"

var createThunk = require("./lib/thunk.js")

function Procedure() {
  this.argTypes = []
  this.shimArgs = []
  this.arrayArgs = []
  this.scalarArgs = []
  this.offsetArgs = []
  this.offsetArgIndex = []
  this.indexArgs = []
  this.shapeArgs = []
  this.funcName = ""
  this.pre = null
  this.body = null
  this.post = null
  this.debug = false
}

function compileCwise(user_args) {
  //Create procedure
  var proc = new Procedure()
  
  //Parse blocks
  proc.pre    = user_args.pre
  proc.body   = user_args.body
  proc.post   = user_args.post

  //Parse arguments
  var proc_args = user_args.args.slice(0)
  proc.argTypes = proc_args.slice(0)
  for(var i=0; i<proc_args.length; ++i) {
    var arg_type = proc_args[i]
    if(arg_type === "array") {
      proc.arrayArgs.push(i)
      proc.shimArgs.push("array" + i)
      if(i < proc.pre.args.length && proc.pre.args[i].count>0) {
        throw new Error("cwise: pre() block may not reference array args")
      }
      if(i < proc.post.args.length && proc.post.args[i].count>0) {
        throw new Error("cwise: post() block may not reference array args")
      }
    } else if(arg_type === "scalar") {
      proc.scalarArgs.push(i)
      proc.shimArgs.push("scalar" + i)
    } else if(arg_type === "index") {
      proc.indexArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array index")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array index")
      }
      if(i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array index")
      }
    } else if(arg_type === "shape") {
      proc.shapeArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].lvalue) {
        throw new Error("cwise: pre() block may not write to array shape")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array shape")
      }
      if(i < proc.post.args.length && proc.post.args[i].lvalue) {
        throw new Error("cwise: post() block may not write to array shape")
      }
    } else if(typeof arg_type === "object" && arg_type.offset) {
      proc.argTypes[i] = "offset"
      proc.offsetArgs.push({ array: arg_type.array, offset:arg_type.offset })
      proc.offsetArgIndex.push(i)
    } else {
      throw new Error("cwise: Unknown argument type " + proc_args[i])
    }
  }
  
  //Make sure at least one array argument was specified
  if(proc.arrayArgs.length <= 0) {
    throw new Error("cwise: No array arguments specified")
  }
  
  //Make sure arguments are correct
  if(proc.pre.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in pre() block")
  }
  if(proc.body.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in body() block")
  }
  if(proc.post.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in post() block")
  }

  //Check debug flag
  proc.debug = !!user_args.printCode || !!user_args.debug
  
  //Retrieve name
  proc.funcName = user_args.funcName || "cwise"
  
  //Read in block size
  proc.blockSize = user_args.blockSize || 64

  return createThunk(proc)
}

module.exports = compileCwise

},{"./lib/thunk.js":24}],23:[function(require,module,exports){
"use strict"

var uniq = require("uniq")

function innerFill(order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , has_index = proc.indexArgs.length>0
    , code = []
    , vars = []
    , idx=0, pidx=0, i, j
  for(i=0; i<dimension; ++i) {
    vars.push(["i",i,"=0"].join(""))
  }
  //Compute scan deltas
  for(j=0; j<nargs; ++j) {
    for(i=0; i<dimension; ++i) {
      pidx = idx
      idx = order[i]
      if(i === 0) {
        vars.push(["d",j,"s",i,"=t",j,"[",idx,"]"].join(""))
      } else {
        vars.push(["d",j,"s",i,"=(t",j,"[",idx,"]-s",pidx,"*t",j,"[",pidx,"])"].join(""))
      }
    }
  }
  code.push("var " + vars.join(","))
  //Scan loop
  for(i=dimension-1; i>=0; --i) {
    idx = order[i]
    code.push(["for(i",i,"=0;i",i,"<s",idx,";++i",i,"){"].join(""))
  }
  //Push body of inner loop
  code.push(body)
  //Advance scan pointers
  for(i=0; i<dimension; ++i) {
    pidx = idx
    idx = order[i]
    for(j=0; j<nargs; ++j) {
      code.push(["p",j,"+=d",j,"s",i].join(""))
    }
    if(has_index) {
      if(i > 0) {
        code.push(["index[",pidx,"]-=s",pidx].join(""))
      }
      code.push(["++index[",idx,"]"].join(""))
    }
    code.push("}")
  }
  return code.join("\n")
}

function outerFill(matched, order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , blockSize = proc.blockSize
    , has_index = proc.indexArgs.length > 0
    , code = []
  for(var i=0; i<nargs; ++i) {
    code.push(["var offset",i,"=p",i].join(""))
  }
  //Generate matched loops
  for(var i=matched; i<dimension; ++i) {
    code.push(["for(var j"+i+"=SS[", order[i], "]|0;j", i, ">0;){"].join(""))
    code.push(["if(j",i,"<",blockSize,"){"].join(""))
    code.push(["s",order[i],"=j",i].join(""))
    code.push(["j",i,"=0"].join(""))
    code.push(["}else{s",order[i],"=",blockSize].join(""))
    code.push(["j",i,"-=",blockSize,"}"].join(""))
    if(has_index) {
      code.push(["index[",order[i],"]=j",i].join(""))
    }
  }
  for(var i=0; i<nargs; ++i) {
    var indexStr = ["offset"+i]
    for(var j=matched; j<dimension; ++j) {
      indexStr.push(["j",j,"*t",i,"[",order[j],"]"].join(""))
    }
    code.push(["p",i,"=(",indexStr.join("+"),")"].join(""))
  }
  code.push(innerFill(order, proc, body))
  for(var i=matched; i<dimension; ++i) {
    code.push("}")
  }
  return code.join("\n")
}

//Count the number of compatible inner orders
function countMatches(orders) {
  var matched = 0, dimension = orders[0].length
  while(matched < dimension) {
    for(var j=1; j<orders.length; ++j) {
      if(orders[j][matched] !== orders[0][matched]) {
        return matched
      }
    }
    ++matched
  }
  return matched
}

//Processes a block according to the given data types
function processBlock(block, proc, dtypes) {
  var code = block.body
  var pre = []
  var post = []
  for(var i=0; i<block.args.length; ++i) {
    var carg = block.args[i]
    if(carg.count <= 0) {
      continue
    }
    var re = new RegExp(carg.name, "g")
    var ptrStr = ""
    var arrNum = proc.arrayArgs.indexOf(i)
    switch(proc.argTypes[i]) {
      case "offset":
        var offArgIndex = proc.offsetArgIndex.indexOf(i)
        var offArg = proc.offsetArgs[offArgIndex]
        arrNum = offArg.array
        ptrStr = "+q" + offArgIndex
      case "array":
        ptrStr = "p" + arrNum + ptrStr
        var localStr = "l" + i
        var arrStr = "a" + arrNum
        if(carg.count === 1) {
          if(dtypes[arrNum] === "generic") {
            if(carg.lvalue) {
              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join(""))
              code = code.replace(re, localStr)
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            } else {
              code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
            }
          } else {
            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
          }
        } else if(dtypes[arrNum] === "generic") {
          pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join(""))
          code = code.replace(re, localStr)
          if(carg.lvalue) {
            post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
          }
        } else {
          pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join(""))
          code = code.replace(re, localStr)
          if(carg.lvalue) {
            post.push([arrStr, "[", ptrStr, "]=", localStr].join(""))
          }
        }
      break
      case "scalar":
        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i))
      break
      case "index":
        code = code.replace(re, "index")
      break
      case "shape":
        code = code.replace(re, "shape")
      break
    }
  }
  return [pre.join("\n"), code, post.join("\n")].join("\n").trim()
}

function typeSummary(dtypes) {
  var summary = new Array(dtypes.length)
  var allEqual = true
  for(var i=0; i<dtypes.length; ++i) {
    var t = dtypes[i]
    var digits = t.match(/\d+/)
    if(!digits) {
      digits = ""
    } else {
      digits = digits[0]
    }
    if(t.charAt(0) === 0) {
      summary[i] = "u" + t.charAt(1) + digits
    } else {
      summary[i] = t.charAt(0) + digits
    }
    if(i > 0) {
      allEqual = allEqual && summary[i] === summary[i-1]
    }
  }
  if(allEqual) {
    return summary[0]
  }
  return summary.join("")
}

//Generates a cwise operator
function generateCWiseOp(proc, typesig) {

  //Compute dimension
  var dimension = typesig[1].length|0
  var orders = new Array(proc.arrayArgs.length)
  var dtypes = new Array(proc.arrayArgs.length)

  //First create arguments for procedure
  var arglist = ["SS"]
  var code = ["'use strict'"]
  var vars = []
  
  for(var j=0; j<dimension; ++j) {
    vars.push(["s", j, "=SS[", j, "]"].join(""))
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    arglist.push("a"+i)
    arglist.push("t"+i)
    arglist.push("p"+i)
    dtypes[i] = typesig[2*i]
    orders[i] = typesig[2*i+1]
  }
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    arglist.push("Y" + i)
  }
  if(proc.shapeArgs.length > 0) {
    vars.push("shape=SS.slice(0)")
  }
  if(proc.indexArgs.length > 0) {
    var zeros = new Array(dimension)
    for(var i=0; i<dimension; ++i) {
      zeros[i] = "0"
    }
    vars.push(["index=[", zeros.join(","), "]"].join(""))
  }
  for(var i=0; i<proc.offsetArgs.length; ++i) {
    var off_arg = proc.offsetArgs[i]
    var init_string = []
    for(var j=0; j<off_arg.offset.length; ++j) {
      if(off_arg.offset[j] === 0) {
        continue
      } else if(off_arg.offset[j] === 1) {
        init_string.push(["t", off_arg.array, "[", j, "]"].join(""))      
      } else {
        init_string.push([off_arg.offset[j], "*t", off_arg.array, "[", j, "]"].join(""))
      }
    }
    if(init_string.length === 0) {
      vars.push("q" + i + "=0")
    } else {
      vars.push(["q", i, "=(", init_string.join("+"),")|0"].join(""))
    }
  }

  //Prepare this variables
  var thisVars = uniq([].concat(proc.pre.thisVars)
                      .concat(proc.body.thisVars)
                      .concat(proc.post.thisVars))
  vars = vars.concat(thisVars)
  code.push("var " + vars.join(","))
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    code.push("p"+i+"|=0")
  }
  
  //Inline prelude
  if(proc.pre.body.length > 3) {
    code.push(processBlock(proc.pre, proc, dtypes))
  }

  //Process body
  var body = processBlock(proc.body, proc, dtypes)
  var matched = countMatches(orders)
  if(matched < dimension) {
    code.push(outerFill(matched, orders[0], proc, body))
  } else {
    code.push(innerFill(orders[0], proc, body))
  }

  //Inline epilog
  if(proc.post.body.length > 3) {
    code.push(processBlock(proc.post, proc, dtypes))
  }
  
  if(proc.debug) {
    console.log("Generated cwise routine for ", typesig, ":\n\n", code.join("\n"))
  }
  
  var loopName = [(proc.funcName||"unnamed"), "_cwise_loop_", orders[0].join("s"),"m",matched,typeSummary(dtypes)].join("")
  var f = new Function(["function ",loopName,"(", arglist.join(","),"){", code.join("\n"),"} return ", loopName].join(""))
  return f()
}
module.exports = generateCWiseOp
},{"uniq":25}],24:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"./compile.js":23,"dup":18}],25:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return []
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique
},{}],26:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"dup":12}],27:[function(require,module,exports){
"use strict"

function dupe_array(count, value, i) {
  var c = count[i]|0
  if(c <= 0) {
    return []
  }
  var result = new Array(c), j
  if(i === count.length-1) {
    for(j=0; j<c; ++j) {
      result[j] = value
    }
  } else {
    for(j=0; j<c; ++j) {
      result[j] = dupe_array(count, value, i+1)
    }
  }
  return result
}

function dupe_number(count, value) {
  var result, i
  result = new Array(count)
  for(i=0; i<count; ++i) {
    result[i] = value
  }
  return result
}

function dupe(count, value) {
  if(typeof value === "undefined") {
    value = 0
  }
  switch(typeof count) {
    case "number":
      if(count > 0) {
        return dupe_number(count|0, value)
      }
    break
    case "object":
      if(typeof (count.length) === "number") {
        return dupe_array(count, value, 0)
      }
    break
  }
  return []
}

module.exports = dupe
},{}],28:[function(require,module,exports){
(function (global,Buffer){
'use strict'

var bits = require('bit-twiddle')
var dup = require('dup')

//Legacy pool support
if(!global.__TYPEDARRAY_POOL) {
  global.__TYPEDARRAY_POOL = {
      UINT8   : dup([32, 0])
    , UINT16  : dup([32, 0])
    , UINT32  : dup([32, 0])
    , INT8    : dup([32, 0])
    , INT16   : dup([32, 0])
    , INT32   : dup([32, 0])
    , FLOAT   : dup([32, 0])
    , DOUBLE  : dup([32, 0])
    , DATA    : dup([32, 0])
    , UINT8C  : dup([32, 0])
    , BUFFER  : dup([32, 0])
  }
}

var hasUint8C = (typeof Uint8ClampedArray) !== 'undefined'
var POOL = global.__TYPEDARRAY_POOL

//Upgrade pool
if(!POOL.UINT8C) {
  POOL.UINT8C = dup([32, 0])
}
if(!POOL.BUFFER) {
  POOL.BUFFER = dup([32, 0])
}

//New technique: Only allocate from ArrayBufferView and Buffer
var DATA    = POOL.DATA
  , BUFFER  = POOL.BUFFER

exports.free = function free(array) {
  if(Buffer.isBuffer(array)) {
    BUFFER[bits.log2(array.length)].push(array)
  } else {
    if(Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
      array = array.buffer
    }
    if(!array) {
      return
    }
    var n = array.length || array.byteLength
    var log_n = bits.log2(n)|0
    DATA[log_n].push(array)
  }
}

function freeArrayBuffer(buffer) {
  if(!buffer) {
    return
  }
  var n = buffer.length || buffer.byteLength
  var log_n = bits.log2(n)
  DATA[log_n].push(buffer)
}

function freeTypedArray(array) {
  freeArrayBuffer(array.buffer)
}

exports.freeUint8 =
exports.freeUint16 =
exports.freeUint32 =
exports.freeInt8 =
exports.freeInt16 =
exports.freeInt32 =
exports.freeFloat32 = 
exports.freeFloat =
exports.freeFloat64 = 
exports.freeDouble = 
exports.freeUint8Clamped = 
exports.freeDataView = freeTypedArray

exports.freeArrayBuffer = freeArrayBuffer

exports.freeBuffer = function freeBuffer(array) {
  BUFFER[bits.log2(array.length)].push(array)
}

exports.malloc = function malloc(n, dtype) {
  if(dtype === undefined || dtype === 'arraybuffer') {
    return mallocArrayBuffer(n)
  } else {
    switch(dtype) {
      case 'uint8':
        return mallocUint8(n)
      case 'uint16':
        return mallocUint16(n)
      case 'uint32':
        return mallocUint32(n)
      case 'int8':
        return mallocInt8(n)
      case 'int16':
        return mallocInt16(n)
      case 'int32':
        return mallocInt32(n)
      case 'float':
      case 'float32':
        return mallocFloat(n)
      case 'double':
      case 'float64':
        return mallocDouble(n)
      case 'uint8_clamped':
        return mallocUint8Clamped(n)
      case 'buffer':
        return mallocBuffer(n)
      case 'data':
      case 'dataview':
        return mallocDataView(n)

      default:
        return null
    }
  }
  return null
}

function mallocArrayBuffer(n) {
  var n = bits.nextPow2(n)
  var log_n = bits.log2(n)
  var d = DATA[log_n]
  if(d.length > 0) {
    return d.pop()
  }
  return new ArrayBuffer(n)
}
exports.mallocArrayBuffer = mallocArrayBuffer

function mallocUint8(n) {
  return new Uint8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocUint8 = mallocUint8

function mallocUint16(n) {
  return new Uint16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocUint16 = mallocUint16

function mallocUint32(n) {
  return new Uint32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocUint32 = mallocUint32

function mallocInt8(n) {
  return new Int8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocInt8 = mallocInt8

function mallocInt16(n) {
  return new Int16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocInt16 = mallocInt16

function mallocInt32(n) {
  return new Int32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocInt32 = mallocInt32

function mallocFloat(n) {
  return new Float32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocFloat32 = exports.mallocFloat = mallocFloat

function mallocDouble(n) {
  return new Float64Array(mallocArrayBuffer(8*n), 0, n)
}
exports.mallocFloat64 = exports.mallocDouble = mallocDouble

function mallocUint8Clamped(n) {
  if(hasUint8C) {
    return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n)
  } else {
    return mallocUint8(n)
  }
}
exports.mallocUint8Clamped = mallocUint8Clamped

function mallocDataView(n) {
  return new DataView(mallocArrayBuffer(n), 0, n)
}
exports.mallocDataView = mallocDataView

function mallocBuffer(n) {
  n = bits.nextPow2(n)
  var log_n = bits.log2(n)
  var cache = BUFFER[log_n]
  if(cache.length > 0) {
    return cache.pop()
  }
  return new Buffer(n)
}
exports.mallocBuffer = mallocBuffer

exports.clearCache = function clearCache() {
  for(var i=0; i<32; ++i) {
    POOL.UINT8[i].length = 0
    POOL.UINT16[i].length = 0
    POOL.UINT32[i].length = 0
    POOL.INT8[i].length = 0
    POOL.INT16[i].length = 0
    POOL.INT32[i].length = 0
    POOL.FLOAT[i].length = 0
    POOL.DOUBLE[i].length = 0
    POOL.UINT8C[i].length = 0
    DATA[i].length = 0
    BUFFER[i].length = 0
  }
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"bit-twiddle":26,"buffer":2,"dup":27}],29:[function(require,module,exports){
"use strict"

var ndarray = require("ndarray")
var ops = require("ndarray-ops")
var pool = require("typedarray-pool")

function clone(array) {
  var dtype = array.dtype
  if(dtype === "generic" || dtype === "array") {
    dtype = "double"
  }
  var data = pool.malloc(array.size, dtype)
  var result = ndarray(data, array.shape)
  ops.assign(result, array)
  return result
}
exports.clone = clone

function malloc(shape, dtype) {
  if(!dtype) {
    dtype = "double"
  }
  var sz = 1
  var stride = new Array(shape.length)
  for(var i=shape.length-1; i>=0; --i) {
    stride[i] = sz
    sz *= shape[i]
  }
  return ndarray(pool.malloc(sz, dtype), shape, stride, 0)
}
exports.malloc = malloc

function free(array) {
  if(array.dtype === "generic" || array.dtype === "array") {
    return
  }
  pool.free(array.data)
}
exports.free = free

function zeros(shape, dtype) {
  if(!dtype) {
    dtype = "double"
  }

  var sz = 1
  var stride = new Array(shape.length)
  for(var i=shape.length-1; i>=0; --i) {
    stride[i] = sz
    sz *= shape[i]
  }
  var buf = pool.malloc(sz, dtype)
  for(var i=0; i<sz; ++i) {
    buf[i] = 0
  }
  return ndarray(buf, shape, stride, 0)
}
exports.zeros = zeros
},{"ndarray":31,"ndarray-ops":15,"typedarray-pool":28}],30:[function(require,module,exports){
"use strict"

module.exports = ndSelect
module.exports.compile = lookupCache

//Macros
var ARRAY = "a"
var RANK = "K"
var CMP = "C"
var DATA = "d"
var OFFSET = "o"
var RND = "R"
var TMP = "T"
var LO = "L"
var HI = "H"
var PIVOT = "X"
function SHAPE(i) {
  return "s" + i
}
function STRIDE(i) {
  return "t" + i
}
function STEP(i) {
  return "u" + i
}
function STEP_CMP(i) {
  return "v" + i
}
function INDEX(i) {
  return "i" + i
}
function PICK(i) {
  return "p" + i
}
function PTR(i) {
  return "x" + i
}

//Create new order where index 0 is slowest index
function permuteOrder(order) {
  var norder = order.slice()
  norder.splice(order.indexOf(0), 1)
  norder.unshift(0)
  return norder
}

//Generate quick select procedure
function compileQuickSelect(order, useCompare, dtype) {
  order = permuteOrder(order)

  var dimension = order.length
  var useGetter = (dtype === "generic")
  var funcName = "ndSelect" + dtype + order.join("_") + "_" + (useCompare ? "cmp" : "lex")

  var code = []

  //Get arguments for code
  var args = [ARRAY, RANK]
  if(useCompare) {
    args.push(CMP)
  }

  //Unpack ndarray variables
  var vars = [
    DATA + "=" + ARRAY + ".data",
    OFFSET + "=" + ARRAY + ".offset|0",
    RND + "=Math.random",
    TMP]
  for(var i=0; i<2; ++i) {
    vars.push(PTR(i) + "=0")
  }
  for(var i=0; i<dimension; ++i) {
    vars.push(
      SHAPE(i) + "=" + ARRAY + ".shape[" + i + "]|0",
      STRIDE(i) + "=" + ARRAY + ".stride[" + i + "]|0",
      INDEX(i) + "=0")
  }
  for(var i=1; i<dimension; ++i) {
    if(i < dimension-1) {
      vars.push(STEP_CMP(i) + "=(" + STRIDE(i) + "-" + SHAPE(i+1) + "*" + STRIDE(i+1) + ")|0",
                STEP(order[i]) + "=(" + STRIDE(order[i]) + "-" + SHAPE(order[i+1]) + "*" + STRIDE(order[i+1]) + ")|0")
    } else {
      vars.push(STEP_CMP(i) + "=" + STRIDE(i),
                STEP(order[i]) + "=" + STRIDE(order[i]))
    }
  }
  if(useCompare) {
    for(var i=0; i<2; ++i) {
      vars.push(PICK(i) + "=" + ARRAY + ".pick(0)")
    }
  }
  vars.push(
    PIVOT + "=0",
    LO + "=0",
    HI + "=" + SHAPE(order[0]) + "-1")

  function compare(out, i0, i1) {
    if(useCompare) {
      code.push(
        PICK(0), ".offset=", OFFSET, "+", STRIDE(order[0]), "*(", i0, ");",
        PICK(1), ".offset=", OFFSET, "+", STRIDE(order[0]), "*(", i1, ");",
        out, "=", CMP, "(", PICK(0), ",", PICK(1), ");")
    } else {
      code.push(
        PTR(0), "=", OFFSET, "+", STRIDE(0), "*(", i0, ");",
        PTR(1), "=", OFFSET, "+", STRIDE(0), "*(", i1, ");")
      if(dimension > 1) {
        code.push("_cmp:")
      }
      for(var i=dimension-1; i>0; --i) {
        code.push("for(", INDEX(i), "=0;", 
          INDEX(i), "<", SHAPE(i), ";",
          INDEX(i), "++){")
      }
      if(useGetter) {
        code.push(out, "=", DATA, ".get(", PTR(0), ")-", 
                            DATA, ".get(", PTR(1), ");")
      } else {
        code.push(out, "=", DATA, "[", PTR(0), "]-", 
                            DATA, "[", PTR(1), "];")
      }
      if(dimension > 1) {
        code.push("if(", out, ")break _cmp;")
      }
      for(var i=1; i<dimension; ++i) {
        code.push(
          PTR(0), "+=", STEP_CMP(i), ";",
          PTR(1), "+=", STEP_CMP(i),
          "}")
      }
    }
  }

  function swap(i0, i1) {
    code.push(
      PTR(0), "=", OFFSET, "+", STRIDE(order[0]), "*(", i0, ");",
      PTR(1), "=", OFFSET, "+", STRIDE(order[0]), "*(", i1, ");")
    for(var i=dimension-1; i>0; --i) {
      code.push("for(", INDEX(order[i]), "=0;", 
        INDEX(order[i]), "<", SHAPE(order[i]), ";",
        INDEX(order[i]), "++){")
    }
    if(useGetter) {
      code.push(TMP, "=", DATA, ".get(", PTR(0), ");", 
                DATA, ".set(", PTR(0), ",", DATA, ".get(", PTR(1), "));",
                DATA, ".set(", PTR(1), ",", TMP, ");")
    } else {
      code.push(TMP, "=", DATA, "[", PTR(0), "];", 
                DATA, "[", PTR(0), "]=", DATA, "[", PTR(1), "];",
                DATA, "[", PTR(1), "]=", TMP, ";")
    }
    for(var i=1; i<dimension; ++i) {
      code.push(
        PTR(0), "+=", STEP(order[i]), ";",
        PTR(1), "+=", STEP(order[i]),
        "}")
    }
  }

  code.push(
    "while(", LO, "<", HI, "){",
      PIVOT, "=(", RND, "()*(", HI, "-", LO, "+1)+", LO, ")|0;")

  //Partition array by pivot
  swap(PIVOT, HI)

  code.push(
    PIVOT, "=", LO, ";",
    "for(", INDEX(0), "=", LO, ";",
      INDEX(0), "<", HI, ";",
      INDEX(0), "++){")
  compare(TMP, INDEX(0), HI)
  code.push("if(", TMP, "<0){")
    swap(PIVOT, INDEX(0))
    code.push(PIVOT, "++;")
  code.push("}}")
  swap(PIVOT, HI)

  //Check pivot bounds
  code.push(
    "if(", PIVOT, "===", RANK, "){",
      LO, "=", PIVOT, ";",
      "break;",
    "}else if(", RANK, "<", PIVOT, "){",
      HI, "=", PIVOT, "-1;",
    "}else{",
      LO, "=", PIVOT, "+1;",
    "}",
  "}")

  if(useCompare) {
    code.push(PICK(0), ".offset=", OFFSET, "+", LO, "*", STRIDE(0), ";",
      "return ", PICK(0), ";")
  } else {
    code.push("return ", ARRAY, ".pick(", LO, ");")
  }

  //Compile and link js together
  var procCode = [
    "'use strict';function ", funcName, "(", args, "){",
      "var ", vars.join(), ";",
      code.join(""),
    "};return ", funcName
  ].join("")

  var proc = new Function(procCode)
  return proc()
}

var CACHE = {}

function lookupCache(order, useCompare, dtype) {
  var typesig = order.join() + useCompare + dtype
  var proc = CACHE[typesig]
  if(proc) {
    return proc
  }
  return CACHE[typesig] = compileQuickSelect(order, useCompare, dtype)
}

function ndSelect(array, k, compare) {
  k |= 0
  if((array.dimension === 0) || 
    (array.shape[0] <= k) ||
    (k < 0)) {
    return null
  }
  var useCompare = !!compare
  var proc = lookupCache(array.order, useCompare, array.dtype)
  if(useCompare) {
    return proc(array, k, compare)
  } else {
    return proc(array, k)
  }
}
},{}],31:[function(require,module,exports){
(function (Buffer){
var iota = require("iota-array")

var arrayMethods = [
  "concat",
  "join",
  "slice",
  "toString",
  "indexOf",
  "lastIndexOf",
  "forEach",
  "every",
  "some",
  "filter",
  "map",
  "reduce",
  "reduceRight"
]

var hasTypedArrays  = ((typeof Float64Array) !== "undefined")
var hasBuffer       = ((typeof Buffer) !== "undefined")

function compare1st(a, b) {
  return a[0] - b[0]
}

function order() {
  var stride = this.stride
  var terms = new Array(stride.length)
  var i
  for(i=0; i<terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i]
  }
  terms.sort(compare1st)
  var result = new Array(terms.length)
  for(i=0; i<result.length; ++i) {
    result[i] = terms[i][1]
  }
  return result
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("")
  if(dimension < 0) {
    className = "View_Nil" + dtype
  }
  var useGetters = (dtype === "generic")
  
  if(dimension === -1) {
    //Special case for trivial arrays
    var code = 
      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
    var procedure = new Function(code)
    return procedure()
  } else if(dimension === 0) {
    //Special case for 0d arrays
    var code =
      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
    var procedure = new Function("TrivialArray", code)
    return procedure(CACHED_CONSTRUCTORS[dtype][0])
  }

  var code = ["'use strict'"]
    
  //Create constructor for view
  var indices = iota(dimension)
  var args = indices.map(function(i) { return "i"+i })
  var index_str = "this.offset+" + indices.map(function(i) {
        return "this._stride" + i + "*i" + i
      }).join("+")
  code.push("function "+className+"(a,"+
    indices.map(function(i) {
      return "b"+i
    }).join(",") + "," +
    indices.map(function(i) {
      return "c"+i
    }).join(",") + ",d){this.data=a")
  for(var i=0; i<dimension; ++i) {
    code.push("this._shape"+i+"=b"+i+"|0")
  }
  for(var i=0; i<dimension; ++i) {
    code.push("this._stride"+i+"=c"+i+"|0")
  }
  code.push("this.offset=d|0}",
    "var proto="+className+".prototype",
    "proto.dtype='"+dtype+"'",
    "proto.dimension="+dimension)
  
  //view.stride and view.shape
  var strideClassName = "VStride" + dimension + "d" + dtype
  var shapeClassName = "VShape" + dimension + "d" + dtype
  var props = {"stride":strideClassName, "shape":shapeClassName}
  for(var prop in props) {
    var arrayName = props[prop]
    code.push(
      "function " + arrayName + "(v) {this._v=v} var aproto=" + arrayName + ".prototype",
      "aproto.length="+dimension)
    
    var array_elements = []
    for(var i=0; i<dimension; ++i) {
      array_elements.push(["this._v._", prop, i].join(""))
    }
    code.push(
      "aproto.toJSON=function " + arrayName + "_toJSON(){return [" + array_elements.join(",") + "]}",
      "aproto.valueOf=aproto.toString=function " + arrayName + "_toString(){return [" + array_elements.join(",") + "].join()}")
    
    for(var i=0; i<dimension; ++i) {
      code.push("Object.defineProperty(aproto,"+i+",{get:function(){return this._v._"+prop+i+"},set:function(v){return this._v._"+prop+i+"=v|0},enumerable:true})")
    }
    for(var i=0; i<arrayMethods.length; ++i) {
      if(arrayMethods[i] in Array.prototype) {
        code.push("aproto."+arrayMethods[i]+"=Array.prototype."+arrayMethods[i])
      }
    }
    code.push(["Object.defineProperty(proto,'",prop,"',{get:function ", arrayName, "_get(){return new ", arrayName, "(this)},set: function ", arrayName, "_set(v){"].join(""))
    for(var i=0; i<dimension; ++i) {
      code.push("this._"+prop+i+"=v["+i+"]|0")
    }
    code.push("return v}})")
  }
  
  //view.size:
  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this._shape"+i }).join("*"),
"}})")

  //view.order:
  if(dimension === 1) {
    code.push("proto.order=[0]")
  } else {
    code.push("Object.defineProperty(proto,'order',{get:")
    if(dimension < 4) {
      code.push("function "+className+"_order(){")
      if(dimension === 2) {
        code.push("return (Math.abs(this._stride0)>Math.abs(this._stride1))?[1,0]:[0,1]}})")
      } else if(dimension === 3) {
        code.push(
"var s0=Math.abs(this._stride0),s1=Math.abs(this._stride1),s2=Math.abs(this._stride2);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
      }
    } else {
      code.push("ORDER})")
    }
  }
  
  //view.set(i0, ..., v):
  code.push(
"proto.set=function "+className+"_set("+args.join(",")+",v){")
  if(useGetters) {
    code.push("return this.data.set("+index_str+",v)}")
  } else {
    code.push("return this.data["+index_str+"]=v}")
  }
  
  //view.get(i0, ...):
  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
  if(useGetters) {
    code.push("return this.data.get("+index_str+")}")
  } else {
    code.push("return this.data["+index_str+"]}")
  }
  
  //view.index:
  code.push(
    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

  //view.hi():
  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
    indices.map(function(i) {
      return ["(typeof i",i,"!=='number'||i",i,"<0)?this._shape", i, ":i", i,"|0"].join("")
    }).join(",")+","+
    indices.map(function(i) {
      return "this._stride"+i
    }).join(",")+",this.offset)}")
  
  //view.lo():
  var a_vars = indices.map(function(i) { return "a"+i+"=this._shape"+i })
  var c_vars = indices.map(function(i) { return "c"+i+"=this._stride"+i })
  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "c"+i
    }).join(",")+",b)}")
  
  //view.step():
  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
    indices.map(function(i) {
      return "a"+i+"=this._shape"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "b"+i+"=this._stride"+i
    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a" + i
    }).join(",")+","+
    indices.map(function(i) {
      return "b" + i
    }).join(",")+",c)}")
  
  //view.transpose():
  var tShape = new Array(dimension)
  var tStride = new Array(dimension)
  for(var i=0; i<dimension; ++i) {
    tShape[i] = "a[i"+i+"]"
    tStride[i] = "b[i"+i+"]"
  }
  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")
  
  //view.pick():
  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
  for(var i=0; i<dimension; ++i) {
    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this._stride"+i+"*i"+i+")|0}else{a.push(this._shape"+i+");b.push(this._stride"+i+")}")
  }
  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")
    
  //Add return statement
  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
    indices.map(function(i) {
      return "shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "stride["+i+"]"
    }).join(",")+",offset)}")

  //Compile procedure
  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
  return procedure(CACHED_CONSTRUCTORS[dtype], order)
}

function arrayDType(data) {
  if(hasBuffer) {
    if(Buffer.isBuffer(data)) {
      return "buffer"
    }
  }
  if(hasTypedArrays) {
    switch(Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64"
      case "[object Float32Array]":
        return "float32"
      case "[object Int8Array]":
        return "int8"
      case "[object Int16Array]":
        return "int16"
      case "[object Int32Array]":
        return "int32"
      case "[object Uint8Array]":
        return "uint8"
      case "[object Uint16Array]":
        return "uint16"
      case "[object Uint32Array]":
        return "uint32"
      case "[object Uint8ClampedArray]":
        return "uint8_clamped"
    }
  }
  if(Array.isArray(data)) {
    return "array"
  }
  return "generic"
}

var CACHED_CONSTRUCTORS = {
  "float32":[],
  "float64":[],
  "int8":[],
  "int16":[],
  "int32":[],
  "uint8":[],
  "uint16":[],
  "uint32":[],
  "array":[],
  "uint8_clamped":[],
  "buffer":[],
  "generic":[]
}

;(function() {
  for(var id in CACHED_CONSTRUCTORS) {
    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
  }
});

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if(data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0]
    return ctor([])
  } else if(typeof data === "number") {
    data = [data]
  }
  if(shape === undefined) {
    shape = [ data.length ]
  }
  var d = shape.length
  if(stride === undefined) {
    stride = new Array(d)
    for(var i=d-1, sz=1; i>=0; --i) {
      stride[i] = sz
      sz *= shape[i]
    }
  }
  if(offset === undefined) {
    offset = 0
    for(var i=0; i<d; ++i) {
      if(stride[i] < 0) {
        offset -= (shape[i]-1)*stride[i]
      }
    }
  }
  var dtype = arrayDType(data)
  var ctor_list = CACHED_CONSTRUCTORS[dtype]
  while(ctor_list.length <= d+1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
  }
  var ctor = ctor_list[d+1]
  return ctor(data, shape, stride, offset)
}

module.exports = wrappedNDArrayCtor
}).call(this,require("buffer").Buffer)
},{"buffer":2,"iota-array":32}],32:[function(require,module,exports){
"use strict"

function iota(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = i
  }
  return result
}

module.exports = iota
},{}],33:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],34:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"bit-twiddle":12,"buffer":2,"dup":28}],35:[function(require,module,exports){
var colorSort;

colorSort = require("../color/sort.coffee");

module.exports = function(a, b, keys, sort, colors, vars, depth) {
  var i, k, retVal;
  if (!sort) {
    sort = "asc";
  }
  if (!(colors instanceof Array)) {
    colors = [colors];
  }
  if (!(keys instanceof Array)) {
    keys = [keys];
  }
  if (vars && depth !== void 0 && typeof depth !== "number") {
    depth = vars.id.nesting.indexOf(depth);
  }
  retVal = 0;
  i = 0;
  while (i < keys.length) {
    k = keys[i];
    a = vars && a.d3plus && a.d3plus.sortKeys ? a.d3plus.sortKeys[k] : a[k];
    b = vars && b.d3plus && b.d3plus.sortKeys ? b.d3plus.sortKeys[k] : b[k];
    if (vars && colors.indexOf(k) >= 0) {
      retVal = colorSort(a, b);
    } else {
      retVal = a < b ? -1 : 1;
    }
    if (retVal !== 0 || i === keys.length - 1) {
      break;
    }
    i++;
  }
  if (sort === "asc") {
    return retVal;
  } else {
    return -retVal;
  }
};



},{"../color/sort.coffee":51}],36:[function(require,module,exports){
module.exports = function(arr, value) {
  var constructor;
  if (arr instanceof Array) {
    constructor = value === void 0 || value === null ? value : value.constructor;
    return arr.indexOf(value) >= 0 || arr.indexOf(constructor) >= 0;
  } else {
    return false;
  }
};



},{}],37:[function(require,module,exports){
var comparator, fetchSort;

comparator = require("./comparator.coffee");

fetchSort = require("../core/fetch/sort.coffee");

module.exports = function(arr, keys, sort, colors, vars, depth) {
  var d, data, i, len;
  if (!arr || arr.length <= 1) {
    return arr || [];
  } else {
    if (vars) {
      if (!keys) {
        keys = vars.order.value || vars.size.value || vars.id.value;
      }
      if (!sort) {
        sort = vars.order.sort.value;
      }
      if (!colors) {
        colors = vars.color.value || [];
      }
      for (i = 0, len = arr.length; i < len; i++) {
        d = arr[i];
        if (!d.d3plus) {
          d.d3plus = {};
        }
        data = "d3plus" in d && "d3plus" in d.d3plus ? d.d3plus : d;
        d.d3plus.sortKeys = fetchSort(vars, data, keys, colors, depth);
      }
    }
    return arr.sort(function(a, b) {
      return comparator(a, b, keys, sort, colors, vars, depth);
    });
  }
};



},{"../core/fetch/sort.coffee":67,"./comparator.coffee":35}],38:[function(require,module,exports){
module.exports = function(arr, x) {
  if (x === void 0) {
    return arr;
  }
  if (x === false) {
    return [];
  }
  if (x instanceof Array) {
    return x;
  }
  if (!(arr instanceof Array)) {
    arr = [];
  }
  if (arr.indexOf(x) >= 0) {
    arr.splice(arr.indexOf(x), 1);
  } else {
    arr.push(x);
  }
  return arr;
};



},{}],39:[function(require,module,exports){
var sheet;

sheet = function(name) {
  var css, i, returnBoolean, tested;
  tested = sheet.tested;
  if (name in tested) {
    return tested[name];
  }
  i = 0;
  returnBoolean = false;
  while (i < document.styleSheets.length) {
    css = document.styleSheets[i];
    if (css.href && css.href.indexOf(name) >= 0) {
      returnBoolean = true;
      break;
    }
    i++;
  }
  return returnBoolean;
};

sheet.tested = {};

module.exports = sheet;



},{}],40:[function(require,module,exports){
// Determines if the current browser is Internet Explorer.
module.exports = /*@cc_on!@*/false

},{}],41:[function(require,module,exports){
var ie, touch;

ie = require("./ie.js");

touch = require("./touch.coffee");

if (touch) {
  module.exports = {
    click: "click",
    down: "touchstart",
    up: "touchend",
    over: "touchstart",
    out: "touchend",
    move: "touchmove"
  };
} else {
  module.exports = {
    click: "click",
    down: "mousedown",
    up: "mouseup",
    over: ie ? "mouseenter" : "mouseover",
    out: ie ? "mouseleave" : "mouseout",
    move: "mousemove"
  };
}



},{"./ie.js":40,"./touch.coffee":45}],42:[function(require,module,exports){
var prefix;

prefix = function() {
  var val;
  if ("-webkit-transform" in document.body.style) {
    val = "-webkit-";
  } else if ("-moz-transform" in document.body.style) {
    val = "-moz-";
  } else if ("-ms-transform" in document.body.style) {
    val = "-ms-";
  } else if ("-o-transform" in document.body.style) {
    val = "-o-";
  } else {
    val = "";
  }
  prefix = function() {
    return val;
  };
  return val;
};

module.exports = prefix;



},{}],43:[function(require,module,exports){
module.exports = d3.select("html").attr("dir") === "rtl";



},{}],44:[function(require,module,exports){
var scrollbar;

scrollbar = function() {
  var inner, outer, val, w1, w2;
  inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";
  outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);
  document.body.appendChild(outer);
  w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  document.body.removeChild(outer);
  val = w1 - w2;
  scrollbar = function() {
    return val;
  };
  return val;
};

module.exports = scrollbar;



},{}],45:[function(require,module,exports){
module.exports = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch ? true : false;



},{}],46:[function(require,module,exports){
module.exports = function(color) {
  var hsl;
  hsl = d3.hsl(color);
  if (hsl.l > .45) {
    if (hsl.s > .8) {
      hsl.s = 0.8;
    }
    hsl.l = 0.45;
  }
  return hsl.toString();
};



},{}],47:[function(require,module,exports){
module.exports = function(color, increment) {
  var c;
  if (increment === void 0) {
    increment = 0.5;
  }
  c = d3.hsl(color);
  increment = (1 - c.l) * increment;
  c.l += increment;
  c.s -= increment;
  return c.toString();
};



},{}],48:[function(require,module,exports){
module.exports = function(c1, c2, o1, o2) {
  var b, g, r;
  if (!o1) {
    o1 = 1;
  }
  if (!o2) {
    o2 = 1;
  }
  c1 = d3.rgb(c1);
  c2 = d3.rgb(c2);
  r = (o1 * c1.r + o2 * c2.r - o1 * o2 * c2.r) / (o1 + o2 - o1 * o2);
  g = (o1 * c1.g + o2 * c2.g - o1 * o2 * c2.g) / (o1 + o2 - o1 * o2);
  b = (o1 * c1.b + o2 * c2.b - o1 * o2 * c2.b) / (o1 + o2 - o1 * o2);
  return d3.rgb(r, g, b).toString();
};



},{}],49:[function(require,module,exports){
var defaultScale;

defaultScale = require("./scale.coffee");

module.exports = function(x, scale) {
  var rand_int;
  rand_int = x || Math.floor(Math.random() * 20);
  scale = scale || defaultScale;
  return scale(rand_int);
};



},{"./scale.coffee":50}],50:[function(require,module,exports){
module.exports = d3.scale.ordinal().range(["#b22200", "#EACE3F", "#282F6B", "#B35C1E", "#224F20", "#5F487C", "#759143", "#419391", "#993F88", "#e89c89", "#ffee8d", "#afd5e8", "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"]);



},{}],51:[function(require,module,exports){
module.exports = function(a, b) {
  var aHSL, bHSL;
  aHSL = d3.hsl(a);
  bHSL = d3.hsl(b);
  a = aHSL.s === 0 ? 361 : aHSL.h;
  b = bHSL.s === 0 ? 361 : bHSL.h;
  if (a === b) {
    return aHSL.l - bHSL.l;
  } else {
    return a - b;
  }
};



},{}],52:[function(require,module,exports){
module.exports = function(color) {
  var b, g, r, rgbColor, yiq;
  rgbColor = d3.rgb(color);
  r = rgbColor.r;
  g = rgbColor.g;
  b = rgbColor.b;
  yiq = (r * 299 + g * 587 + b * 114) / 1000;
  if (yiq >= 128) {
    return "#444444";
  } else {
    return "#f7f7f7";
  }
};



},{}],53:[function(require,module,exports){
module.exports = function(color) {
  var blackColors, testColor, userBlack;
  color = color + "";
  color = color.replace(RegExp(" ", "g"), "");
  if (color.indexOf("rgb") === 0) {
    color = color.split("(")[1].split(")")[0].split(",").slice(0, 3).join(",");
  }
  if (color.indexOf("hsl") === 0) {
    color = color.split(",")[2].split(")")[0];
  }
  testColor = d3.rgb(color).toString();
  blackColors = ["black", "#000", "#000000", "0%", "0,0,0"];
  userBlack = blackColors.indexOf(color) >= 0;
  return testColor !== "#000000" || userBlack;
};



},{}],54:[function(require,module,exports){
var icon, ie, print, wiki;

ie = require("../../client/ie.js");

wiki = require("./wiki.coffee");

icon = "http://d3plus.org/assets/img/favicon.ico";

print = function(type, message, style) {
  style = style || "";
  if (ie || typeof InstallTrigger !== 'undefined') {
    console.log("[ D3plus ] " + message);
  } else if (type.indexOf("group") === 0) {
    if (window.chrome && navigator.onLine) {
      console[type]("%c%c " + message, "padding: 3px 10px;" + "line-height: 25px;" + "background-size: 20px;" + "background-position: top left;" + "background-image: url('" + icon + "');", "font-weight:200;" + style);
    } else {
      console[type]("%cD3plus%c " + message, "line-height: 25px;" + "font-weight: 800;" + "color: #b35c1e;" + "margin-left: 0px;", "font-weight:200;" + style);
    }
  } else {
    console[type]("%c" + message, style + "font-weight:200;");
  }
};

print.comment = function(message) {
  this("log", message, "color:#aaa;");
};

print.error = function(message, url) {
  this("groupCollapsed", "ERROR: " + message, "font-weight:800;color:#D74B03;");
  this.stack();
  this.wiki(url);
  this.groupEnd();
};

print.group = function(message) {
  this("group", message, "color:#888;");
};

print.groupCollapsed = function(message) {
  this("groupCollapsed", message, "color:#888;");
};

print.groupEnd = function() {
  if (!ie) {
    console.groupEnd();
  }
};

print.log = function(message) {
  this("log", message, "color:#444444;");
};

print.stack = function() {
  var err, line, message, page, splitter, stack, url;
  if (!ie) {
    err = new Error();
    if (err.stack) {
      stack = err.stack.split("\n");
      stack = stack.filter(function(e) {
        return e.indexOf("Error") !== 0 && e.indexOf("d3plus.js:") < 0 && e.indexOf("d3plus.min.js:") < 0;
      });
      if (stack.length && stack[0].length) {
        splitter = (window.chrome ? "at " : "@");
        url = stack[0].split(splitter)[1];
        stack = url.split(":");
        if (stack.length === 3) {
          stack.pop();
        }
        line = stack.pop();
        page = stack.join(":").split("/");
        page = page[page.length - 1];
        message = "line " + line + " of " + page + ": " + url;
        this("log", message, "color:#D74B03;");
      }
    }
  }
};

print.time = function(message) {
  if (!ie) {
    console.time(message);
  }
};

print.timeEnd = function(message) {
  if (!ie) {
    console.timeEnd(message);
  }
};

print.warning = function(message, url) {
  this("groupCollapsed", message, "color:#888;");
  this.stack();
  this.wiki(url);
  this.groupEnd();
};

print.wiki = function(url) {
  if (url) {
    if (url in wiki) {
      url = d3plus.repo + "wiki/" + wiki[url];
    }
    this("log", "documentation: " + url, "color:#aaa;");
  }
};

module.exports = print;



},{"../../client/ie.js":40,"./wiki.coffee":55}],55:[function(require,module,exports){
module.exports = {
  active: "Segmenting-Data#active",
  aggs: "Custom-Aggregations",
  alt: "Alt-Text-Parameters",
  attrs: "Attribute-Data#axes",
  axes: "Axis-Parameters",
  background: "Background",
  color: "Color-Parameters",
  container: "Container-Element",
  coords: "Geography-Data",
  csv: "CSV-Export",
  data: "Data-Points",
  depth: "Visible-Depth",
  descs: "Value-Definitions",
  dev: "Verbose-Mode",
  draw: "Draw",
  edges: "Edges-List",
  error: "Custom-Error-Message",
  focus: "Focus-Element",
  font: "Font-Styles",
  footer: "Custom-Footer",
  format: "Value-Formatting",
  height: "Height",
  history: "User-History",
  hover: "Hover-Element",
  icon: "Icon-Parameters",
  id: "Unique-ID",
  keywords: "Keyword-Parameters",
  labels: "Data-Labels",
  legend: "Legend",
  links: "Link-Styles",
  margin: "Outer-Margins",
  messages: "Status-Messages",
  method: "Methods",
  nodes: "Node-Positions",
  open: "Open",
  order: "Data-Ordering",
  remove: "Remove",
  search: "Search-Box",
  select: "Selecting-Elements#select",
  selectAll: "Selecting-Elements#selectall",
  shape: "Data-Shapes",
  size: "Size-Parameters",
  temp: "Segmenting-Data#temp",
  text: "Text-Parameters",
  time: "Time-Parameters",
  timeline: "Timeline",
  timing: "Animation-Timing",
  title: "Custom-Titles",
  tooltip: "Tooltip-Parameters",
  total: "Segmenting-Data#total",
  type: "Output-Type",
  ui: "Custom-Interface",
  width: "Width",
  x: "Axis-Parameters",
  y: "Axis-Parameters",
  zoom: "Zooming"
};



},{}],56:[function(require,module,exports){
var buckets = require("../../util/buckets.coffee"),
    fetchValue = require("../fetch/value.coffee"),
    print      = require("../console/print.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sets color range of data, if applicable
//-------------------------------------------------------------------
module.exports = function(vars) {

  if ( vars.dev.value ) print.time("getting color data range")

  var data_range = []
  vars.data.pool.forEach(function(d){
    var val = parseFloat(fetchValue(vars,d,vars.color.value))
    if (typeof val == "number" && !isNaN(val) && data_range.indexOf(val) < 0) data_range.push(val)
  })

  if ( vars.dev.value ) print.timeEnd("getting color data range")

  if (data_range.length > 1) {

    var data_domain = null

    if ( vars.dev.value ) print.time("calculating color scale")

    data_range = d3.extent(data_range)

    if (data_range[0] < 0 && data_range[1] > 0) {
      var color_range = vars.color.range
      if (color_range.length == 3) {
        data_range.push(data_range[1])
        data_range[1] = 0
      }
    }
    else if (data_range[1] > 0 && data_range[0] >= 0) {
      var color_range = vars.color.heatmap
      data_range = buckets(data_range,color_range.length)
    }
    else {
      var color_range = vars.color.range.slice(0)
      if (data_range[0] < 0) {
        color_range.pop()
      }
      else {
        color_range.shift()
      }
    }

    vars.color.valueScale = d3.scale.sqrt()
      .domain(data_range)
      .range(color_range)
      .interpolate(d3.interpolateRgb)

    if ( vars.dev.value ) print.timeEnd("calculating color scale")

  }
  else {
    vars.color.valueScale = null
  }

}

},{"../../util/buckets.coffee":198,"../console/print.coffee":54,"../fetch/value.coffee":69}],57:[function(require,module,exports){
var fetchValue = require("../fetch/value.coffee"),
    print       = require("../console/print.coffee"),
    validObject = require("../../object/validate.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Restricts data based on Solo/Mute filters
//------------------------------------------------------------------------------
module.exports = function( vars , data ) {

  if ( vars.dev.value ) print.time("filtering data")

  var availableKeys = d3.keys(vars.data.keys || {})

  if ( "attrs" in vars ) {
    availableKeys = availableKeys.concat(d3.keys(vars.attrs.keys || {}))
  }

  data = data.filter(function(d){
    var val = fetchValue(vars, d, vars.id.value);
    return val !== null;
  });

  var typeReqs = vars.types[vars.type.value].requirements || [];

  vars.data.filters.forEach( function( key ) {

    if (availableKeys.indexOf(vars[key].value) >= 0 &&
        typeReqs.indexOf(key) >= 0) {

      data = data.filter( function( d ) {

        var val = fetchValue(vars,d,vars[key].value)
        if ( key === "size" ) {
          return typeof val === "number"
        }
        else {
          return val !== null
        }

      })

    }

  });

  // if "solo", only check against "solo" (disregard "mute")
  var key = vars.data.solo.length ? "solo" : "mute"

  vars.data[key].forEach(function(v) {

    function test_value( val ) {

      var arr = vars[v][key].value;

      var match = false;
      arr.forEach(function(f){
        if (typeof f === "function") {
          match = f(val);
        }
        else if ( f === val ) {
          match = true;
        }

      })

      return match
    }

    function nest_check(d) {

      // if the variable has nesting, check all levels
      var match = false
      if (vars[v].nesting) {
        var nesting = vars[v].nesting
        if (validObject(nesting)) {
          nesting = d3.values(nesting)
        }
        nesting.forEach(function(n){
          if (!match) {
            match = test_value(fetchValue(vars,d,n))
          }
        })
      }
      else {
        match = test_value(fetchValue(vars,d,vars[v].value))
      }

      return key === "solo" ? match : !match

    }

    data = data.filter(nest_check)

    if ( v === "id" ) {

      if ("nodes" in vars && vars.nodes.value) {
        if ( vars.dev.value ) print.time("filtering nodes")
        vars.nodes.restricted = vars.nodes.value.filter(nest_check)
        if ( vars.dev.value ) print.timeEnd("filtering nodes")
      }

      if ("edges" in vars && vars.edges.value) {
        if ( vars.dev.value ) print.time("filtering edges")
        vars.edges.restricted = vars.edges.value.filter(function(d){
          var first_match = nest_check(d[vars.edges.source]),
              second_match = nest_check(d[vars.edges.target])
          return first_match && second_match
        })
        if ( vars.dev.value ) print.timeEnd("filtering edges")
      }

    }

  })

  if ( vars.dev.value ) print.timeEnd("filtering data")

  return data

}

},{"../../object/validate.coffee":166,"../console/print.coffee":54,"../fetch/value.coffee":69}],58:[function(require,module,exports){
var dataNest   = require("./nest.js"),
    fetchValue = require("../fetch/value.coffee"),
    print      = require("../console/print.coffee"),
    uniques    = require("../../util/uniques.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Formats raw data by time and nesting
//------------------------------------------------------------------------------
module.exports = function( vars ) {

  var timerString;

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Gets all unique time values
  //----------------------------------------------------------------------------
  vars.data.time = {"values": []};
  if (vars.time && vars.time.value) {

    if ( vars.dev.value ) {
      timerString = "analyzing time periods";
      print.time( timerString );
    }

    vars.data.time.values = uniques(vars.data.value, vars.time.value, fetchValue, vars);

    vars.data.time.values.sort(function(a,b){ return a-b; });

    var step = [];
    vars.data.time.values.forEach(function(y,i){
      if (i !== 0) {
        var prev = vars.data.time.values[i-1];
        step.push(y-prev);
        if (i === vars.data.time.values.length - 1) {
          vars.data.time.total = y - vars.data.time.values[0];
        }
      }
    });

    step = d3.min(step);
    vars.data.time.step = step;

    var periods = ["Milliseconds","Seconds","Minutes","Hours","Date","Month","FullYear"],
        conversions = [1000,60,60,24,30,12,1];

    vars.data.time.periods = periods;

    var getDiff = function(start,end,i) {

      if (!vars.data.time.stepDivider) {
        arr = conversions.slice(0,i);
        if (arr.length) {
          vars.data.time.stepDivider = arr.reduce(function(a,b){ return a*b; });
        }
        else {
          vars.data.time.stepDivider = 1;
        }
      }

      return Math.round(Math.floor(end-start)/vars.data.time.stepDivider);

    };

    var total = vars.data.time.total;
    periods.forEach(function(p,i){
      var c = p === "Date" ? 28 : conversions[i];
      if (!vars.data.time.stepType && (i === periods.length-1 || Math.round(step) < c)) {
        vars.data.time.stepType = p;
        var start = vars.data.time.values[0],
            end = vars.data.time.values[vars.data.time.values.length-1];
        vars.data.time.stepIntervals = getDiff(start,end,i);
      }

      if (!vars.data.time.totalType && (i === periods.length-1 || Math.round(total) < c)) {
        vars.data.time.totalType = p;
      }

      step = step/c;
      total = total/c;
    });

    vars.data.time.values.forEach(function(y,i){
      if (i !== 0) {
        var prev = vars.data.time.values[0];
        vars.data.time.dataSteps.push(getDiff(prev,y,periods.indexOf(vars.data.time.stepType)));
      }
      else {
        vars.data.time.dataSteps = [0];
      }
    });

    var userFormat = vars.time.format.value,
        locale = vars.format.locale.value;

    if (userFormat) {

      if (typeof userFormat === "string") {
        vars.data.time.format = d3.locale(locale.format).timeFormat(userFormat);
      }
      else if (typeof userFormat === "function") {
        vars.data.time.format = userFormat;
      }
      else if (userFormat instanceof Array) {
        vars.data.time.format = d3.locale(locale.format).timeFormat.multi(multi);
      }
      vars.data.time.multiFormat = vars.data.time.format;

    }
    else {

      var stepType = vars.data.time.stepType,
          totalType = vars.data.time.totalType;

      var getFormat = function(s,t,small) {

        if (s === t) {
          return small && locale.timeFormat[s+"Small"] ? locale.timeFormat[s+"Small"] : locale.timeFormat[s];
        }
        else {
          if (periods.indexOf(s) >= 4 || periods.indexOf(t) <= 3) {
            return locale.timeFormat[t+"-"+s];
          }
          else {

            var format;

            if (t === "Date") {
              format = locale.timeFormat[t];
            }
            else {
              format = locale.timeFormat[t+"-Date"];
            }

            if (s === "Hours") {
              return format +" "+ locale.timeFormat[s];
            }
            else {
              return format +" "+ locale.timeFormat["Hours-"+s];
            }

          }
        }

      };

      vars.data.time.getFormat = getFormat;

      var multi = [],
          functions = [
            function(d) { return d.getMilliseconds(); },
            function(d) { return d.getSeconds(); },
            function(d) { return d.getMinutes(); },
            function(d) { return d.getHours(); },
            function(d) { return d.getDate() != 1; },
            function(d) { return d.getMonth(); },
            function(d) { return true; }
          ];

      vars.data.time.functions = functions;

      for (var p = periods.indexOf(stepType); p <= periods.indexOf(totalType); p++) {
        var prev = p-1 < periods.indexOf(stepType) ? periods[p] : periods[p-1];
        var small = periods[p] === prev && stepType !== totalType;
        var format = getFormat(prev,periods[p],small);
        multi.push([format,functions[p]]);
      }

      vars.data.time.format = d3.locale(locale.format).timeFormat(getFormat(stepType,totalType));
      if (multi.length > 1) {
        vars.data.time.multiFormat = d3.locale(locale.format).timeFormat.multi(multi);
      }
      else {
        vars.data.time.multiFormat = vars.data.time.format
      }

      vars.data.time.ticks = [];
      var min = d3.min(vars.data.time.values);
      var max = d3.max(vars.data.time.values);
      for (var s = 0; s <= vars.data.time.stepIntervals; s++) {
        var m = new Date(min);
        m["set"+vars.data.time.stepType](m["get"+vars.data.time.stepType]() + s);
        if (m <= max) vars.data.time.ticks.push(m);
      }

    }

    if ( vars.dev.value ) print.timeEnd( timerString );

  }

  if ( vars.dev.value ) {
    timerString = "nesting data by time and depths";
    print.time( timerString );
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Gets all unique time values
  //----------------------------------------------------------------------------
  vars.data.nested = {};
  if (vars.data.time.values.length === 0) {

    vars.data.nested.all = {};
    vars.id.nesting.forEach( function( depth , i ) {

      var nestingDepth = vars.id.nesting.slice( 0 , i + 1 );
      vars.data.nested.all[ depth ] = dataNest(vars, vars.data.value, nestingDepth);

    });

  }
  else {

    var timeData = vars.data.value.reduce(function(o, d){
      var ms = fetchValue(vars, d, vars.time.value).getTime();
      if (!(ms in o)) o[ms] = [];
      o[ms].push(d);
      return o;
    }, {});

    vars.data.time.values.forEach( function( t ) {

      var ms = t.getTime();

      vars.data.nested[ms] = {};

      vars.id.nesting.forEach( function( depth , i ) {
        var nestingDepth = vars.id.nesting.slice(0, i + 1);
        vars.data.nested[ ms ][ depth ] = dataNest(vars, timeData[ms], nestingDepth);
      });

    });

  }

  if ( vars.dev.value ) print.timeEnd( timerString );

};

},{"../../util/uniques.coffee":204,"../console/print.coffee":54,"../fetch/value.coffee":69,"./nest.js":62}],59:[function(require,module,exports){
var fetchValue;

fetchValue = require("../fetch/value.coffee");

module.exports = function(vars, data, nesting) {
  var d, groupedData, i, j, k, len, len1, n, strippedData, val;
  groupedData = d3.nest();
  if (vars.id.grouping.value) {
    if (nesting === void 0) {
      nesting = vars.id.nesting;
    }
    for (i = j = 0, len = nesting.length; j < len; i = ++j) {
      n = nesting[i];
      if (i < vars.depth.value) {
        (function(n) {
          return groupedData.key(function(d) {
            return fetchValue(vars, d.d3plus, n);
          });
        })(n);
      }
    }
  }
  strippedData = [];
  for (k = 0, len1 = data.length; k < len1; k++) {
    d = data[k];
    val = vars.size.value ? fetchValue(vars, d, vars.size.value) : 1;
    if (val && typeof val === "number" && val > 0) {
      delete d.d3plus.r;
      delete d.d3plus.x;
      delete d.d3plus.y;
      strippedData.push({
        d3plus: d,
        id: d[vars.id.value],
        value: val
      });
    }
  }
  return groupedData.entries(strippedData);
};



},{"../fetch/value.coffee":69}],60:[function(require,module,exports){
var print, validObject,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

print = require("../console/print.coffee");

validObject = require("../../object/validate.coffee");

module.exports = function(vars, type) {
  var get_keys, k, kk, lengthMatch, ref, ref1, timerString, v, vv;
  timerString = type + " key analysis";
  if (vars.dev.value) {
    print.time(timerString);
  }
  vars[type].keys = {};
  get_keys = function(arr) {
    var a, i, k, len, results, results1, v;
    if (arr instanceof Array) {
      results = [];
      for (i = 0, len = arr.length; i < len; i++) {
        a = arr[i];
        results.push(get_keys(a));
      }
      return results;
    } else if (validObject(arr)) {
      results1 = [];
      for (k in arr) {
        v = arr[k];
        if (k.indexOf("d3plus") !== 0 && !(indexOf.call(vars[type].keys, k) >= 0) && v !== null) {
          results1.push(vars[type].keys[k] = typeof v);
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    }
  };
  if (validObject(vars[type].value)) {
    lengthMatch = d3.keys(vars[type].value).length === vars.id.nesting.length;
    ref = vars[type].value;
    for (k in ref) {
      v = ref[k];
      if (lengthMatch && vars.id.nesting.indexOf(k) >= 0 && validObject(v)) {
        for (kk in v) {
          vv = v[kk];
          get_keys(vv);
        }
      } else {
        get_keys(v);
      }
    }
  } else {
    ref1 = vars[type].value;
    for (k in ref1) {
      v = ref1[k];
      get_keys(v);
    }
  }
  if (vars.dev.value) {
    return print.time(timerString);
  }
};



},{"../../object/validate.coffee":166,"../console/print.coffee":54}],61:[function(require,module,exports){
var print, validObject;

print = require("../console/print.coffee");

validObject = require("../../object/validate.coffee");

module.exports = function(vars, key, next) {
  var consoleMessage, fileType, parser, url;
  consoleMessage = vars.dev.value;
  if (consoleMessage) {
    print.time("loading " + key);
  }
  url = vars[key].url;
  if (!vars[key].filetype.value) {
    fileType = url.slice(url.length - 5).split(".");
    if (fileType.length > 1) {
      fileType = fileType[1];
    } else {
      fileType = false;
    }
    if (fileType) {
      if (fileType === "txt") {
        fileType = "text";
      }
      if (vars[key].filetype.accepted.indexOf(fileType) < 0) {
        fileType = "json";
      }
    } else {
      fileType = "json";
    }
  } else {
    fileType = vars[key].filetype.value;
  }
  if (fileType === "dsv") {
    parser = d3.dsv(vars[key].delimiter.value, "text/plain");
  } else {
    parser = d3[fileType];
  }
  return parser(url, function(error, data) {
    var k, ret;
    if (!error && data) {
      if (typeof vars[key].callback === "function") {
        ret = vars[key].callback(data);
        if (ret) {
          if (validObject(ret) && key in ret) {
            for (k in ret) {
              if (k in vars) {
                vars[k].value = ret[k];
              }
            }
          } else {
            vars[key].value = ret;
          }
        }
      } else {
        vars[key].value = data;
      }
      if (["json"].indexOf(fileType) < 0) {
        vars[key].value.forEach(function(d) {
          var results;
          results = [];
          for (k in d) {
            if (!isNaN(d[k])) {
              results.push(d[k] = parseFloat(d[k]));
            } else if (d[k].toLowerCase() === "false") {
              results.push(d[k] = false);
            } else if (d[k].toLowerCase() === "true") {
              results.push(d[k] = true);
            } else if (d[k].toLowerCase() === "null") {
              results.push(d[k] = null);
            } else {
              if (d[k].toLowerCase() === "undefined") {
                results.push(d[k] = void 0);
              } else {
                results.push(void 0);
              }
            }
          }
          return results;
        });
      }
      vars[key].changed = true;
      vars[key].loaded = true;
    } else {
      vars.error.internal = "Could not load data from: \"" + url + "\"";
    }
    if (consoleMessage) {
      print.timeEnd("loading " + key);
    }
    return next();
  });
};



},{"../../object/validate.coffee":166,"../console/print.coffee":54}],62:[function(require,module,exports){
var fetchValue = require("../fetch/value.coffee"),
    validObject  = require("../../object/validate.coffee"),
    uniqueValues = require("../../util/uniques.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Nests and groups the data.
//------------------------------------------------------------------------------
var dataNest = function(vars, flatData, nestingLevels) {

  var nestedData   = d3.nest(),
      groupedData  = [],
      segments     = "temp" in vars ? [ "active" , "temp" , "total" ] : [];

  if (!nestingLevels.length) {
    nestedData.key(function(d){ return true; });
  }
  else {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Loop through each nesting level.
    //----------------------------------------------------------------------------
    nestingLevels.forEach(function(level, i){

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Create a nest key for the current level.
      //--------------------------------------------------------------------------
      nestedData.key(function(d){ return fetchValue(vars, d, level); });

    });

  }

  if (vars.axes && vars.axes.discrete && (!vars.time || vars[vars.axes.discrete].value !== vars.time.value)) {
    nestedData.key(function(d){
      return fetchValue(vars, d, vars[vars.axes.discrete].value);
    });
  }

  var deepest_is_id = nestingLevels.length && vars.id.nesting.indexOf(nestingLevels[nestingLevels.length - 1]) >= 0;
  var i = nestingLevels.length && deepest_is_id ? nestingLevels.length - 1 : 0;
  var depthKey = deepest_is_id ? vars.id.nesting[i] : vars.depth.value;

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If we're at the deepest level, create the rollup function.
  //----------------------------------------------------------------------------
  nestedData.rollup(function(leaves) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If there's only 1 leaf, and it's been processed, return it as-is.
    //--------------------------------------------------------------------------
    if ( leaves.length === 1 && ("d3plus" in leaves[0]) ) {
      groupedData.push(leaves[0]);
      return leaves[0];
    }

    leaves = leaves.reduce(function(arr, ll){
      if (ll.values instanceof Array) {
        return arr.concat(ll.values);
      }
      arr.push(ll);
      return arr;
    }, []);

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create the "d3plus" object for the return variable, starting with
    // just the current depth.
    //--------------------------------------------------------------------------
    var returnObj = {
      "d3plus": {
        "data": {},
        "depth": i
      }
    };

    var merged = d3.sum(leaves, function(ll){ return "d3plus" in ll && ll.d3plus.merged ? 1 : 0; });

    if (merged === leaves.length) {
      for (var ll = 0; ll < leaves.length; ll++) {
        var l = leaves[ll];
        if (!returnObj.d3plus.merged) returnObj.d3plus.merged = [];
        returnObj.d3plus.merged = returnObj.d3plus.merged.concat(l.d3plus.merged);
        if (l.d3plus.text) returnObj.d3plus.text = l.d3plus.text;
      }
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create a reference sum for the 3 different "segment" variables.
    //--------------------------------------------------------------------------
    for (var s = 0; s < segments.length; s++) {

      var c = segments[s];
      var segmentAgg = vars.aggs && vars.aggs.value[key] ? vars.aggs.value[key] : "sum";

      if ("d3plus" in leaves[0] && c in leaves[0].d3plus) {
        returnObj.d3plus[c] = d3.sum(leaves, function(d){
          return d.d3plus[c];
        });
      }
      else if (typeof segmentAgg === "function") {
        returnObj.d3plus[c] = segmentAgg(leaves);
      }
      else {

        returnObj.d3plus[c] = d3[segmentAgg](leaves, function(d) {

          var a = c === "total" ? 1 : 0;
          if (vars[c].value) {
            a = fetchValue(vars, d, vars[c].value);
            if (typeof a !== "number") a = a ? 1 : 0;
          }
          return a;

        });

      }
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Aggregate all values detected in the data.
    //--------------------------------------------------------------------------
    for (var key in vars.data.keys) {

      if (key in returnObj.d3plus.data) {
        returnObj[key] = returnObj.d3plus[key];
      }
      else {

        var agg     = vars.aggs && vars.aggs.value[key] ? vars.aggs.value[key] : "sum",
            aggType = typeof agg,
            keyType = vars.data.keys[key],
            idKey   = vars.id.nesting.indexOf(key) >= 0,
            timeKey = "time" in vars && key === vars.time.value;

        if (key in returnObj.d3plus.data) {
          returnObj[key] = returnObj.d3plus[key];
        }
        if (aggType === "function") {
          returnObj[key] = vars.aggs.value[key](leaves);
        }
        else if (timeKey) {
          returnObj[key] = parseDates(uniqueValues(leaves, key));
        }
        else if (keyType === "number" && aggType === "string" && !idKey) {
          var vals = leaves.map(function(d){ return d[key]; });
          vals = vals.filter(function(d){ return typeof d === keyType; });
          if (vals.length) returnObj[key] = d3[agg](vals);
        }
        else {

          var testVals = checkVal(leaves, key);
          var keyValues = testVals.length === 1 ? testVals[0][key]
                        : uniqueValues(testVals, key);

          if (testVals.length === 1) {
            returnObj[key] = keyValues;
          }
          else if (keyValues && keyValues.length) {

            if (!(keyValues instanceof Array)) {
              keyValues = [keyValues];
            }

            if (idKey && vars.id.nesting.indexOf(key) > i) {
            // if (idKey && vars.id.nesting.indexOf(key) > i && keyValues.length > 1) {
              // if (nestingLevels.length == 1 && testVals.length > leaves.length) {
              //   var newNesting = nestingLevels.concat(key);
              //   testVals = dataNest(vars,testVals,newNesting);
              // }
              returnObj[key] = testVals;
            }
            else {

              returnObj[key] = keyValues;

            }

          }
          else if (idKey) {
            var endPoint = vars.id.nesting.indexOf(key) - 1;
            if (endPoint >= i && (!("endPoint" in returnObj.d3plus) || returnObj.d3plus.endPoint > i)) {
              returnObj.d3plus.endPoint = i;
            }
          }

        }

      }

      if (key in returnObj && returnObj[key] instanceof Array && returnObj[key].length === 1) {
        returnObj[key] = returnObj[key][0];
      }

    }

    for (var lll = 0; lll < nestingLevels.length; lll++) {
      var level = nestingLevels[lll];
      if (!(level in returnObj)) {
        returnObj[level] = fetchValue(vars, leaves[0], level);
      }
    }

    groupedData.push(returnObj);

    return returnObj;

  });

  var find_keys = function(obj,depth,keys) {
    if (obj.children) {
      if (vars.data.keys[nestingLevels[depth]] == "number") {
        obj.key = parseFloat(obj.key);
      }
      keys[nestingLevels[depth]] = obj.key;
      delete obj.key;
      for ( var k in keys ) {
        obj[k] = keys[k];
      }
      depth++;
      obj.children.forEach(function(c){
        find_keys(c,depth,keys);
      });
    }
  };

  nestedData = nestedData
    .entries(flatData)
    .map(rename_key_value)
    .map(function(obj){
      find_keys(obj,0,{});
      return obj;
    });

  return groupedData;

};

var checkVal = function(leaves, key) {

  var returnVals = [];

  function run(obj) {
    if (obj instanceof Array) {
      obj.forEach(run);
    }
    else if (validObject(obj) && key in obj) {
      if (obj[key] instanceof Array) {
        obj[key].forEach(run);
      }
      else {
        returnVals.push(obj);
      }
    }
  }

  run(leaves);

  return returnVals;

};

var parseDates = function(dateArray) {

  var dates = [];

  function checkDate(arr) {

    for (var i = 0; i < arr.length; i++) {
      var d = arr[i];
      if (d) {
        if (d.constructor === Array) {
          checkDate(d);
        }
        else {
          dates.push(d);
        }
        // if (d.constructor === Date) dates.push(d);
        // else if (d.constructor === Array) {
        //   checkDate(d);
        // }
        // else {
        //   d = new Date(d.toString());
        //   if (d !== "Invalid Date") {
        //     d.setTime( d.getTime() + d.getTimezoneOffset() * 60 * 1000 );
        //     dates.push(d);
        //   }
        // }
      }
    }

  }

  checkDate(dateArray);

  return uniqueValues(dates);

};

var rename_key_value = function(obj) {
  if (obj.values && obj.values.length) {
    obj.children = obj.values.map(function(obj) {
      return rename_key_value(obj);
    });
    delete obj.values;
    return obj;
  }
  else if(obj.values) {
    return obj.values;
  }
  else {
    return obj;
  }
};

module.exports = dataNest;

},{"../../object/validate.coffee":166,"../../util/uniques.coffee":204,"../fetch/value.coffee":69}],63:[function(require,module,exports){
var arraySort = require("../../array/sort.coffee"),
    dataNest   = require("./nest.js"),
    fetchValue = require("../fetch/value.coffee"),
    fetchColor = require("../fetch/color.coffee"),
    fetchText  = require("../fetch/text.js");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Merges data underneath the size threshold
//-------------------------------------------------------------------
module.exports = function( vars , rawData , split ) {

  var threshold;
  if ( vars.size.threshold.value === false ) {
    threshold = 0;
  }
  else if (typeof vars.size.threshold.value === "number") {
    threshold = vars.size.threshold.value;
  }
  else if (typeof vars.size.threshold.value === "function") {
    threshold = vars.size.threshold.value(vars);
  }
  else if (typeof vars.types[vars.type.value].threshold === "number") {
    threshold = vars.types[vars.type.value].threshold;
  }
  else if (typeof vars.types[vars.type.value].threshold === "function") {
    threshold = vars.types[vars.type.value].threshold(vars);
  }
  else {
    threshold = 0.02;
  }

  if (typeof threshold == "number" && threshold > 0) {

    var largeEnough = [],
        cutoff = vars.depth.value === 0 ? 0 : {},
        removed = [],
        parents = [],
        labelException = [],
        largest = {};

    var nest = d3.nest();

    if (split) {
      nest
        .key(function(d){
          return fetchValue(vars, d, split);
        });
    }

    nest
      .rollup(function(leaves){
        var total = leaves.length;
        if (vars.aggs.value[vars.size.value]) {
          if (typeof vars.aggs.value[vars.size.value] == "function") {
            total = vars.aggs.value[vars.size.value](leaves);
          }
          else if (typeof vars.aggs.value[vars.size.value] == "string") {
            total = d3[vars.aggs.value[vars.size.value]](leaves,function(l){
              return fetchValue(vars,l,vars.size.value);
            });
          }
        }
        else {
          total = d3.sum(leaves,function(l){
            return fetchValue(vars,l,vars.size.value);
          });
        }
        var x = split ? fetchValue(vars,leaves[0],split) : "all";
        largest[x] = total;
        return total;
      })
      .entries(rawData);

    rawData.forEach(function(d){
      var id = fetchValue(vars, d, vars.id.value),
          val = fetchValue(vars, d, vars.size.value),
          x = split ? fetchValue(vars, d, split) : "all",
          allowed = val/largest[x] >= threshold;

      if (allowed && largeEnough.indexOf(id) < 0) {
        largeEnough.push(id);
        if (vars.depth.value) {
          var p = fetchValue(vars, d, vars.id.nesting[vars.depth.value-1]);
          if (parents.indexOf(p) < 0) {
            parents.push(p);
          }
        }
      }

    });

    var filteredData = rawData.filter(function(d){

      var id = fetchValue(vars, d, vars.id.value),
          allowed = largeEnough.indexOf(id) >= 0;

      var p = vars.depth.value ?
              fetchValue(vars, d, vars.id.nesting[vars.depth.value-1]) :
              null;

      if (p !== null && parents.indexOf(p) < 0 && labelException.indexOf(p) < 0) {
        labelException.push(p);
      }

      if (!allowed) {
        var val = fetchValue(vars, d, vars.size.value);
        if (val > 0) {
          if (vars.depth.value === 0) {
            if (val > cutoff) cutoff = val;
          }
          else {
            if (!(p in cutoff)) cutoff[p] = 0;
            if (val > cutoff[p]) cutoff[p] = val;
          }
          removed.push(d);
        }
      }
      return allowed;

    });

    if ( removed.length > 1 ) {

      removed = arraySort( removed , vars.size.value , "desc" , [] , vars );

      var levels = vars.id.nesting.slice(0,vars.depth.value);
      if (vars.types[vars.type.value].requirements.indexOf(vars.axes.discrete) >= 0) {
        levels.push(vars[vars.axes.discrete].value);
      }
      var merged = dataNest(vars, removed, levels);

      merged.forEach(function(m){

        var parent = vars.id.nesting[vars.depth.value-1];
        var p_id = fetchValue(vars, m, parent);
        children = parent ? removed.filter(function(r){
          return fetchValue(vars, r, parent) === p_id;
        }) : removed;

        if (children.length > 1) {

          vars.id.nesting.forEach(function(d,i){

            if (vars.depth.value == i) {
              var prev = m[d];
              if ( typeof prev === "string" ) {
                m[d] = "d3plus_other_"+prev;
              }
              else {
                m[d] = "d3plus_other";
              }
            }
            else if (i > vars.depth.value) {
              delete m[d];
            }
          });

          if (vars.color.value && vars.color.type === "string") {
            if (vars.depth.value === 0) {
              m[vars.color.value] = vars.color.missing;
            }
            else {
              m[vars.color.value] = fetchValue(vars,p_id,vars.color.value,parent);
            }
          }

          if (vars.icon.value) {
            m[vars.icon.value] = fetchValue(vars,p_id,vars.icon.value,parent);
          }

          if (p_id) {
            m.d3plus.depth = vars.depth.value;
          }

          var textLabel;
          if (vars.depth.value === 0) {
            textLabel = vars.format.value(vars.format.locale.value.ui.values, {"key": "threshold", "vars": vars});
            textLabel += " < "+vars.format.value(cutoff, {"key": vars.size.value, "vars": vars});
          }
          else {
            textLabel = fetchText(vars,m,vars.depth.value-1);
            textLabel = textLabel.length ? textLabel[0].split(" < ")[0] : vars.format.value(vars.format.locale.value.ui.values, {"key": "threshold", "vars": vars});
            if (p_id, labelException.indexOf(p_id) < 0) {
              textLabel += " < "+vars.format.value(cutoff[p_id], {"key": vars.size.value, "vars": vars});
            }
          }
          if (p_id, labelException.indexOf(p_id) < 0) {
            textLabel += " ("+vars.format.value(threshold*100, {"key": "share", "vars": vars})+"%)";
          }

          m.d3plus.threshold = cutoff;
          m.d3plus.merged = children;

          if (vars.text.value) {
            m[vars.text.value] = textLabel;
          }
          m.d3plus.text = textLabel;

        }

      });

    }
    else {
      merged = removed;
    }

    return filteredData.concat(merged);

  }

  return rawData;

};

},{"../../array/sort.coffee":37,"../fetch/color.coffee":65,"../fetch/text.js":68,"../fetch/value.coffee":69,"./nest.js":62}],64:[function(require,module,exports){
var sizes;

sizes = require("../../font/sizes.coffee");

module.exports = function(vars, opts) {
  var f, format, func, getFormat, limit, locale, p, periods, pp, prev, render, small, step, style, time, total, vals, values;
  values = opts.values || vars.data.time.ticks;
  style = opts.style || {};
  limit = opts.limit || vars.width.value;
  time = {};
  periods = vars.data.time.periods;
  step = vars.data.time.stepType;
  total = vars.data.time.totalType;
  func = vars.data.time.functions;
  getFormat = vars.data.time.getFormat;
  locale = vars.format.locale.value.format;
  p = periods.indexOf(step);
  while (p <= periods.indexOf(total)) {
    vals = values.filter(function(t) {
      var match, pp;
      if (p === periods.indexOf(step)) {
        return true;
      }
      match = true;
      pp = p - 1;
      if (p < 0) {
        return true;
      }
      while (pp >= periods.indexOf(step)) {
        if (!match) {
          break;
        }
        match = !func[pp](t);
        pp--;
      }
      return match;
    });
    if (periods[p] === total) {
      format = d3.locale(locale).timeFormat(getFormat(periods[p], total));
    } else {
      pp = p;
      format = [];
      while (pp <= periods.indexOf(total)) {
        prev = pp - 1 < periods.indexOf(step) ? pp : pp - 1;
        prev = periods[prev];
        small = periods[pp] === prev && step !== total;
        f = getFormat(prev, periods[pp], small);
        format.push([f, func[pp]]);
        pp++;
      }
      format = d3.locale(locale).timeFormat.multi(format);
    }
    render = sizes(vals.map(function(v) {
      return format(v);
    }), style);
    if (d3.sum(render, function(r) {
      return r.width;
    }) < limit) {
      time.format = format;
      time.values = vals;
      time.sizes = render;
      break;
    }
    p++;
  }
  return time;
};



},{"../../font/sizes.coffee":97}],65:[function(require,module,exports){
var fetchValue, getColor, getRandom, randomColor, uniques, validColor, validObject;

fetchValue = require("./value.coffee");

randomColor = require("../../color/random.coffee");

validColor = require("../../color/validate.coffee");

validObject = require("../../object/validate.coffee");

uniques = require("../../util/uniques.coffee");

module.exports = function(vars, id, level) {
  var color, colorLevel, colors, i, obj, value;
  obj = validObject(id);
  if (obj && "d3plus" in id && "color" in id.d3plus) {
    return id.d3plus.color;
  }
  if (level === void 0) {
    level = vars.id.value;
  }
  if (typeof level === "number") {
    level = vars.id.nesting[level];
  }
  if (!vars.color.value) {
    return getRandom(vars, id, level);
  } else {
    colors = [];
    i = vars.id.nesting.indexOf(level);
    while (i >= 0) {
      colorLevel = vars.id.nesting[i];
      value = uniques(id, vars.color.value, fetchValue, vars, colorLevel);
      if (value.length === 1) {
        value = value[0];
      }
      if (!(value instanceof Array) && value !== void 0 && value !== null) {
        color = getColor(vars, id, value, level);
        if (colors.indexOf(color) < 0) {
          colors.push(color);
        }
        break;
      }
      i--;
    }
    if (colors.length === 1) {
      return colors[0];
    } else {
      return vars.color.missing;
    }
  }
};

getColor = function(vars, id, color, level) {
  if (!color) {
    if (vars.color.value && typeof vars.color.valueScale === "function") {
      return vars.color.valueScale(0);
    }
    return getRandom(vars, id, level);
  } else if (!vars.color.valueScale) {
    if (validColor(color)) {
      return color;
    } else {
      return getRandom(vars, color, level);
    }
  } else {
    return vars.color.valueScale(color);
  }
};

getRandom = function(vars, c, level) {
  if (validObject(c)) {
    c = fetchValue(vars, c, level);
  }
  if (c instanceof Array) {
    c = c[0];
  }
  return randomColor(c, vars.color.scale.value);
};



},{"../../color/random.coffee":49,"../../color/validate.coffee":53,"../../object/validate.coffee":166,"../../util/uniques.coffee":204,"./value.coffee":69}],66:[function(require,module,exports){
var dataFilter = require("../data/filter.js"),
    dataNest     = require("../data/nest.js"),
    print        = require("../console/print.coffee"),
    stringFormat = require("../../string/format.js"),
    stringList   = require("../../string/list.coffee");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Fetches specific years of data
//-------------------------------------------------------------------
module.exports = function(vars, years, depth) {

  if (!vars.data.value) return [];

  if (depth === undefined) depth = vars.depth.value;
  var nestLevel = vars.id.nesting[depth];

  if (years && !(years instanceof Array)) years = [years];

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If "years" have not been requested, determine the years using .time()
  // solo and mute
  //----------------------------------------------------------------------------
  if (!years && "time" in vars) {

    years = [];

    var key = vars.time.solo.value.length ? "solo" : "mute",
        filterList = vars.time[key].value;

    if ( filterList.length ) {

      years = [];
      for (var yi = 0; yi < filterList.length; yi++) {
        var y = filterList[yi];

        if (typeof y === "function") {
          for (var ti = 0; ti < vars.data.time.values.length; ti++) {
            var ms = vars.data.time.values[ti].getTime();
            if (y(ms)) years.push(ms);
          }
        }
        else if (y.constructor === Date) {
          years.push(new Date(y).getTime());
        }
        else {
          var d = new Date(y.toString());
          if (d !== "Invalid Date") {
            d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
            years.push(d.getTime());
          }
        }

      }

      if ( key === "mute" ) {
        years = vars.data.time.values.filter(function( t ){
          return years.indexOf(t.getTime()) < 0;
        });
      }

    }
    else years.push("all");

  }
  else {
    years = ["all"];
  }

  if (years.indexOf("all") >= 0 && vars.data.time.values.length) {
    years = vars.data.time.values.slice(0);
    for (var i = 0; i < years.length; i++) {
      years[i] = years[i].getTime();
    }
  }

  var cacheID = [ vars.type.value , nestLevel , depth ]
                  .concat( vars.data.filters )
                  .concat( years ),
      filter  = vars.data.solo.length ? "solo" : "mute",
      cacheKeys = d3.keys(vars.data.cache),
      vizFilter = vars.types[vars.type.value].filter || undefined;

  if ( vars.data[filter].length ) {
    for (var di = 0; di < vars.data[filter].length; di++) {
      var f = vars.data[filter][di];
      var vals = vars[f][filter].value.slice(0);
      vals.unshift(f);
      cacheID = cacheID.concat(vals);
    }
  }

  cacheID = cacheID.join("_");
  vars.data.cacheID = cacheID;

  var match = false;

  for (var c = 0 ; c < cacheKeys.length ; c++) {

    var matchKey = cacheKeys[c].split("_").slice(1).join("_");

    if ( matchKey === cacheID ) {
      cacheID = new Date().getTime() + "_" + cacheID;
      vars.data.cache[cacheID] = vars.data.cache[cacheKeys[c]];
      delete vars.data.cache[cacheKeys[c]];
      break;
    }

  }

  var returnData;

  if ( vars.data.cache[cacheID] ) {

    if ( vars.dev.value ) print.comment("data already cached");

    returnData = vars.data.cache[cacheID];

    if ( typeof vizFilter === "function" ) {
      returnData = vizFilter( vars ,  returnData );
    }

    return returnData;

  }
  else {

    var missing = [];
    returnData = [];

    if (vars.data.value && vars.data.value.length) {

      for (var yz = 0; yz < years.length; yz++) {
        var year = years[yz];
        if (vars.data.nested[year]) {
          returnData = returnData.concat(vars.data.nested[year][nestLevel]);
        }
        else {
          missing.push(year);
        }
      }

    }

    if (returnData.length === 0 && missing.length && !vars.error.internal) {

      if (missing.length > 1) {
        missing = d3.extent(missing);
      }

      missing = missing.map(function(m){
        return vars.data.time.format(new Date(m));
      });
      missing = missing.join(" - ");

      var str = vars.format.locale.value.error.dataYear,
          and = vars.format.locale.value.ui.and;
      missing = stringList(missing,and);
      vars.error.internal = stringFormat(str,missing);
      vars.time.missing = true;

    }
    else {

      if (vars.time) vars.time.missing = false;

      if ( years.length > 1 ) {

        var separated = false;
        ["x","y"].forEach(function(a){
          if (vars[a].value === vars.time.value &&
              vars[a].scale.value === "discrete" ) {
            separated = true;
          }
        });

        if (!separated) {
          var nested = vars.id.nesting.slice(0,depth+1);
          returnData = dataNest(vars, returnData, nested);
        }

      }

      if (!returnData) {
        returnData = [];
      }
      else {
        returnData = dataFilter(vars, returnData);
      }

      if ( cacheKeys.length === 20 ) {
        cacheKeys.sort();
        delete vars.data.cache[cacheKeys[0]];
      }

      cacheID = new Date().getTime() + "_" + cacheID;
      vars.data.cache[cacheID] = returnData;

      if ( typeof vizFilter === "function" ) {
        returnData = vizFilter( vars , returnData );
      }

      if ( vars.dev.value ) print.comment("storing data in cache");

    }

    return returnData;

  }

};

},{"../../string/format.js":167,"../../string/list.coffee":168,"../console/print.coffee":54,"../data/filter.js":57,"../data/nest.js":62}],67:[function(require,module,exports){
var fetchColor, fetchText, fetchValue;

fetchValue = require("./value.coffee");

fetchColor = require("./color.coffee");

fetchText = require("./text.js");

module.exports = function(vars, d, keys, colors, depth) {
  var i, key, len, obj, value;
  if (!(keys instanceof Array)) {
    keys = [keys];
  }
  if (!(colors instanceof Array)) {
    colors = [colors];
  }
  if (vars && depth !== void 0 && typeof depth !== "number") {
    depth = vars.id.nesting.indexOf(depth);
  }
  obj = {};
  for (i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    if (vars) {
      if (colors.indexOf(key) >= 0) {
        value = fetchColor(vars, d, depth);
      } else if (key === vars.text.value) {
        value = fetchText(vars, d, depth);
      } else {
        value = fetchValue(vars, d, key, depth);
      }
    } else {
      value = d[key];
    }
    if (value instanceof Array) {
      value = value[0];
    }
    value = typeof value === "string" ? value.toLowerCase() : value;
    obj[key] = value;
  }
  return obj;
};



},{"./color.coffee":65,"./text.js":68,"./value.coffee":69}],68:[function(require,module,exports){
var fetchValue = require("./value.coffee"),
    validObject = require("../../object/validate.coffee"),
    uniques     = require("../../util/uniques.coffee");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Get array of available text values
//------------------------------------------------------------------------------
module.exports = function(vars, obj, depth) {

  if (typeof depth !== "number") depth = vars.depth.value;

  var key = vars.id.nesting[depth], textKeys;

  if ( vars.text.nesting && validObject(vars.text.nesting) ) {
    if ( vars.text.nesting[key] ) {
      textKeys = vars.text.nesting[key];
    }
    else {
      textKeys = vars.text.value;
    }
  }
  else {
    textKeys = [];
    if (vars.text.value && depth === vars.depth.value) textKeys.push(vars.text.value);
    textKeys.push(key);
  }

  if ( !(textKeys instanceof Array) ) {
    textKeys = [ textKeys ];
  }

  var names = [];

  if (validObject(obj) && "d3plus" in obj && obj.d3plus.text) {
    names.push(obj.d3plus.text.toString());
    names.push(vars.format.value(obj.d3plus.text.toString(), {"vars": vars, "data": obj}));
  }
  else {

    var formatObj = validObject(obj) ? obj : undefined;

    if (formatObj && obj[vars.id.value] instanceof Array) {
      obj = obj[vars.id.value];
    }
    else if (!(obj instanceof Array)) {
      obj = [obj];
    }

    textKeys.forEach(function( t ){

      var name = uniques(obj, t, fetchValue, vars, key);

      if ( name.length ) {
        if (name.length > 1) {
          name = name.filter(function(n){
            return (n instanceof Array) || (typeof n === "string" && n.indexOf(" < ") < 0);
          });
        }
        name = name.map(function(n){
          if (n instanceof Array) {
            n = n.filter(function(nn){ return nn; });
            return n.map(function(nn){
              return vars.format.value(nn.toString(), {"vars": vars, "data": formatObj, "key": t});
            });
          }
          else if (n) {
            return vars.format.value(n.toString(), {"vars": vars, "data": formatObj, "key": t});
          }
        });
        if (name.length === 1) name = name[0];
        names.push(name);
      }

    });

  }

  return names;

};

},{"../../object/validate.coffee":166,"../../util/uniques.coffee":204,"./value.coffee":69}],69:[function(require,module,exports){
var cacheInit, checkAttrs, checkData, fetch, fetchArray, filterArray, find, uniqueValues, validObject, valueParse;

validObject = require("../../object/validate.coffee");

uniqueValues = require("../../util/uniques.coffee");

find = function(vars, node, variable, depth) {
  var cache, nodeObject, returned, val;
  nodeObject = validObject(node);
  if (typeof variable === "function" && nodeObject) {
    return variable(node, vars);
  }
  if (nodeObject) {
    if (variable in node) {
      return node[variable];
    }
    cache = vars.data.cacheID + "_" + depth;
    cacheInit(node, cache, vars);
    if (variable in node.d3plus.data[cache]) {
      return node.d3plus.data[cache][variable];
    }
    if (depth in node) {
      node = node[depth];
    } else if (vars.id.value in node) {
      node = node[vars.id.value];
      if (depth !== variable) {
        returned = checkData(vars, node, depth, vars.id.value);
      }
      if (returned === null) {
        returned = checkAttrs(vars, node, depth, vars.id.value);
      }
      if (returned === null) {
        return null;
      }
      node = returned;
    } else {
      return null;
    }
  }
  if (node instanceof Array && !validObject(node[0])) {
    node = uniqueValues(node);
  }
  if (node instanceof Array && validObject(node[0])) {
    val = uniqueValues(node, variable);
    if (val.length) {
      return val;
    }
  }
  val = checkData(vars, node, variable, depth);
  if (val) {
    return val;
  }
  val = checkAttrs(vars, node, variable, depth);
  return val;
};

checkData = function(vars, node, variable, depth) {
  var val;
  if (vars.data.viz instanceof Array && variable in vars.data.keys) {
    val = uniqueValues(filterArray(vars.data.viz, node, depth), variable);
  }
  if (val && val.length) {
    return val;
  } else {
    return null;
  }
};

checkAttrs = function(vars, node, variable, depth) {
  var attrList, n, val, vals;
  if ("attrs" in vars && vars.attrs.value && variable in vars.attrs.keys) {
    if (validObject(vars.attrs.value) && depth in vars.attrs.value) {
      attrList = vars.attrs.value[depth];
    } else {
      attrList = vars.attrs.value;
    }
    if (attrList instanceof Array) {
      val = uniqueValues(filterArray(attrList, node, depth), variable);
      if (val.length) {
        return val;
      }
    } else if (node instanceof Array) {
      attrList = [
        (function() {
          var j, len, results;
          if (n in attrList) {
            results = [];
            for (j = 0, len = node.length; j < len; j++) {
              n = node[j];
              results.push(attrList[n]);
            }
            return results;
          }
        })()
      ];
      if (attrList.length) {
        vals = uniqueValues(attrList, variable);
        if (vals.length) {
          return vals;
        }
      }
    } else if (node in attrList) {
      return attrList[node][variable];
    }
  }
  return null;
};

filterArray = function(arr, node, depth) {
  if (node instanceof Array) {
    return arr.filter(function(d) {
      return node.indexOf(d[depth]) >= 0;
    });
  } else {
    return arr.filter(function(d) {
      return d[depth] === node;
    });
  }
};

cacheInit = function(node, cache, vars) {
  if (!("d3plus" in node)) {
    node.d3plus = {};
  }
  if (!("data" in node.d3plus)) {
    node.d3plus.data = {};
  }
  if (vars.data.changed || vars.attrs.changed || !(cache in node.d3plus.data)) {
    node.d3plus.data[cache] = {};
  }
  return node;
};

valueParse = function(vars, node, depth, variable, val) {
  var cache, d, i, j, len, timeVar, v;
  if (val === null) {
    return val;
  }
  timeVar = "time" in vars && vars.time.value === variable;
  if (!(val instanceof Array)) {
    val = [val];
  }
  for (i = j = 0, len = val.length; j < len; i = ++j) {
    v = val[i];
    if (timeVar && v !== null && v.constructor !== Date) {
      d = new Date(v.toString());
      if (d !== "Invalid Date") {
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
        val[i] = d;
      }
    }
  }
  if (val.length === 1) {
    val = val[0];
  }
  if (val !== null && validObject(node) && typeof variable === "string" && !(variable in node)) {
    cache = vars.data.cacheID + "_" + depth;
    node.d3plus.data[cache][variable] = val;
  }
  return val;
};

fetchArray = function(vars, arr, variable, depth) {
  var item, j, len, v, val;
  val = [];
  for (j = 0, len = arr.length; j < len; j++) {
    item = arr[j];
    if (validObject(item)) {
      v = find(vars, item, variable, depth);
      val.push(valueParse(vars, item, depth, variable, v));
    } else {
      val.push(item);
    }
  }
  if (typeof val[0] !== "number") {
    val = uniqueValues(val);
  }
  if (val.length === 1) {
    return val[0];
  } else {
    return val;
  }
};

fetch = function(vars, node, variable, depth) {
  var nodeObject, val;
  if (!variable) {
    return null;
  }
  if (typeof variable === "number") {
    return variable;
  }
  nodeObject = validObject(node);
  if (!depth) {
    depth = vars.id.value;
  }
  if (nodeObject && node.values instanceof Array) {
    val = fetchArray(vars, node.values, variable, depth);
  } else if (nodeObject && node[variable] instanceof Array) {
    val = fetchArray(vars, node[variable], variable, depth);
  } else if (node instanceof Array) {
    val = fetchArray(vars, node, variable, depth);
  } else {
    val = find(vars, node, variable, depth);
    val = valueParse(vars, node, depth, variable, val);
  }
  return val;
};

module.exports = fetch;



},{"../../object/validate.coffee":166,"../../util/uniques.coffee":204}],70:[function(require,module,exports){
module.exports = function(type) {
  var attrs, styles, tester;
  if (["div", "svg"].indexOf(type) < 0) {
    type = "div";
  }
  styles = {
    position: "absolute",
    left: "-9999px",
    top: "-9999px",
    visibility: "hidden",
    display: "block"
  };
  attrs = type === "div" ? {} : {
    position: "absolute"
  };
  tester = d3.select("body").selectAll(type + ".d3plus_tester").data([0]);
  tester.enter().append(type).attr("class", "d3plus_tester").style(styles).attr(attrs);
  return tester;
};



},{}],71:[function(require,module,exports){
module.exports = {
  dev: {
    accepted: "{0} is not an accepted value for {1}, please use one of the following: {2}.",
    deprecated: "the {0} method has been removed, please update your code to use {1}.",
    noChange: "{0} was not updated because it did not change.",
    noContainer: "cannot find a container on the page matching {0}.",
    of: "of",
    oldStyle: "style properties for {0} have now been embedded directly into .{1}().",
    sameEdge: "edges cannot link to themselves. automatically removing self-referencing edge {0}.",
    set: "{0} has been set.",
    setLong: "{0} has been set to {1}.",
    setContainer: "please define a container div using .container()"
  },
  error: {
    accepted: "{0} is not an accepted {1} for {2} visualizations, please use one of the following: {3}.",
    connections: "no connections available for {0}.",
    data: "no data available",
    dataYear: "no data available for {0}.",
    lib: "{0} visualizations require loading the {1} library.",
    libs: "{0} visualizations require loading the following libraries: {1}.",
    method: "{0} visualizations require setting the {1} method.",
    methods: "{0} visualizations require setting the following methods: {1}."
  },
  format: {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""],
    dateTime: "%A, %B %-d, %Y %X",
    date: "%-m/%-d/%Y",
    time: "%I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  lowercase: ["a", "and", "at", "but", "in", "of", "or", "the", "to", "with"],
  message: {
    data: "analyzing data",
    draw: "drawing visualization",
    initializing: "initializing {0}",
    loading: "loading data",
    tooltipReset: "resetting tooltips",
    ui: "updating ui"
  },
  method: {
    active: "active segments",
    color: "color",
    depth: "depth",
    dev: "verbose",
    focus: "focus",
    icon: "icon",
    id: "id",
    height: "height",
    labels: "labels",
    legend: "legend",
    margin: "margin",
    messages: "status messages",
    mode: "mode",
    order: "order",
    search: "search",
    shape: "shape",
    size: "size",
    style: "style",
    temp: "temporary segments",
    text: "text",
    time: "time",
    timeline: "timeline",
    total: "total segments",
    type: "type",
    width: "width",
    x: "x axis",
    y: "y axis",
    zoom: "zoom"
  },
  time: ["date", "day", "month", "time", "year"],
  timeFormat: {
    FullYear: "%Y",
    Month: "%B",
    MonthSmall: "%b",
    Date: "%A %-d",
    DateSmall: "%-d",
    Hours: "%I %p",
    Minutes: "%I:%M",
    Seconds: "%Ss",
    Milliseconds: "%Lms",
    "FullYear-Month": "%b %Y",
    "FullYear-Date": "%-m/%-d/%Y",
    "Month-Date": "%b %-d",
    "Hours-Minutes": "%I:%M %p",
    "Hours-Seconds": "%I:%M:%S %p",
    "Hours-Milliseconds": "%H:%M:%S.%L",
    "Minutes-Seconds": "%I:%M:%S %p",
    "Minutes-Milliseconds": "%H:%M:%S.%L",
    "Seconds-Milliseconds": "%H:%M:%S.%L"
  },
  ui: {
    and: "and",
    back: "back",
    collapse: "click to collapse",
    error: "error",
    expand: "click to expand",
    including: "including",
    loading: "loading...",
    more: "{0} more",
    moreInfo: "click for more info",
    or: "or",
    noResults: "no results matching {0}.",
    primary: "primary connections",
    share: "share",
    total: "total",
    values: "values"
  },
  uppercase: ["CEO", "CFO", "CNC", "COO", "CPU", "HVAC", "R&D", "TV", "UI"],
  visualization: {
    bar: "Bar Chart",
    box: "Box Plot",
    bubbles: "Bubbles",
    chart: "Chart",
    geo_map: "Geo Map",
    line: "Line Plot",
    network: "Network",
    paths: "Paths",
    pie: "Pie Chart",
    rings: "Rings",
    scatter: "Scatter Plot",
    stacked: "Stacked Area",
    table: "Table",
    tree_map: "Tree Map"
  }
};



},{}],72:[function(require,module,exports){
module.exports = {
    "dev": {
        "accepted": "{0} не е прифатенa вредноста за {1}, ве молиме користете еднa од следниве вредности: {2}.",
        "deprecated": "{0} метод е отстранета, ве молиме обновете го вашиот код за да се користи {1}.",
        "noChange": "{0} не е ажурирана, бидејќи немаше промени.",
        "noContainer": "не можe да се најде контејнер на страницата кој се совпаѓа со {0}.",
        "of": "на",
        "oldStyle": "својствата за стилот за {0} сега се вградени директно во. {1} ().",
        "sameEdge": "рабовите не може да имаат алка самите кон себе. автоматски ги отстранувам рабовите кои се само-референцираат {0}.",
        "set": "{0} е наместен.",
        "setLong": "{0} е поставен на {1}.",
        "setContainer": "Ве молиме дефинирајте контејнер div користејќи .container()"
    },
    "error": {
        "accepted": "{0} не е прифатлива за {1} {2} визуелизација, ве молиме користете една од следниве: {3}.",
        "connections": "нема конекции на располагање за {0}.",
        "data": "нема податоци",
        "dataYear": "Нема достапни податоци за {0}.",
        "lib": "{0} визуализации бараат вчитување на библиотеката {1} .",
        "libs": "{0} визуализации бараат вчитување на следниве библиотеки: {1}.",
        "method": "{0} визуализации бара поставување на {1} методот.",
        "methods": "{0} визуализации бараат поставување на следниве методи: {1}."
    },
    "format": {
        decimal: ",",
        thousands: ".",
        grouping: [3],
        currency: ["", " ден."],
        dateTime: "%A, %e %B %Y г. %X",
        date: "%d.%m.%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
        shortDays: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
        months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
        shortMonths: ["јан", "фев", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "ное", "дек"]
    },
    "lowercase": [
        "a",
        "и",
        "во",
        "но",
        "на",
        "или",
        "да",
        "се",
        "со"
    ],
    "method": {
        "active": "активни сегменти",
        "color": "боја",
        "depth": "длабочина",
        "dev": "опширно",
        "focus": "фокус",
        "icon": "икона",
        "id": "ID",
        "height": "висина",
        "labels": "етикети",
        "legend": "легенда",
        "margin": "маргина",
        "messages": "пораки за статусот",
        "order": "цел",
        "search": "барај",
        "shape": "форма",
        "size": "големина",
        "style": "стил",
        "temp": "привремени сегменти",
        "text": "текст",
        "time": "време",
        "timeline": "времеплов",
        "total": "Вкупно сегменти",
        "type": "тип",
        "width": "ширина",
        "x": "x оската",
        "y": "y оската",
        "zoom": "зум",
        "mode": "режим"
    },
    "time": [
        "датум",
        "ден",
        "месец",
        "време",
        "година"
    ],
    "visualization": {
        "bar": "Бар табела",
        "box": "Кутија Парцел",
        "bubbles": "Меурчиња",
        "chart": "Табела",
        "geo_map": "Гео мапа",
        "line": "Линиски график",
        "network": "Мрежа",
        "path": "Патеки",
        "pie": "Пита графикон",
        "rings": "Прстени",
        "scatter": "Распрскан график",
        "stacked": "Наредена површина",
        "table": "Табела",
        "tree_map": "Мапа во вид на дрво"
    },
    "ui": {
        "and": "и",
        "back": "назад",
        "collapse": "кликни за да се собере",
        "error": "грешка",
        "expand": "кликни за да се прошири",
        "loading": "Се вчитува ...",
        "more": "{0} повеќе",
        "moreInfo": "кликнете за повеќе информации",
        "noResults": "Нема резултати за појавување на {0}.",
        "or": "или",
        "primary": "основно врски",
        "share": "удел",
        "total": "Вкупно",
        "values": "вредности",
        "including": "вклучувајќи"
    },
    "message": {
        "data": "анализирање на податоците",
        "draw": "цртање на визуелизација",
        "initializing": "иницијализација {0}",
        "loading": "вчитување на податоци",
        "tooltipReset": "ресетирање на објаснувањата",
        "ui": "ажурирање на кориничкиот интерфејс"
    },
    "uppercase": ["CEOs", "CFOs", "CNC", "COOs", "HVAC", "TV", "UI"]
}

},{}],73:[function(require,module,exports){
module.exports = {
    "dev": {
        "accepted": "{0} não é um valor aceito para {1}, por favor, use um dos seguintes procedimentos: {2}.",
        "deprecated": "{0} método foi removido, por favor atualize seu código para utilizar {1}.",
        "noChange": "{0} não foi atualizado porque ele não mudou.",
        "noContainer": "Não foi possível encontrar um local na página correspondente a {0}.",
        "of": "de",
        "oldStyle": "propriedades de estilo para {0} já foram incorporados diretamente no. {1} ().",
        "sameEdge": "bordas não podem vincular a si mesmos. removendo automaticamente borda de auto-referência {0}.",
        "set": "{0} foi definida.",
        "setLong": "{0} foi definida para {1}.",
        "setContainer": "por favor, defina um div utilizando .container()"
    },
    "error": {
        "accepted": "{0} não é um reconhecido {1} para {2} visualizações, por favor, use um dos seguintes procedimentos: {3}.",
        "connections": "Não há conexões disponíveis para {0}.",
        "data": "Não há dados disponíveis",
        "dataYear": "Não há dados disponíveis para {0}.",
        "lib": "A visualização {0} necessita que seja carregado a biblioteca {1}.",
        "libs": "A visualização {0} necessita que seja carregado as bibliotecas {1}.",
        "method": "A visualização {0} exige a definição do método {1}.",
        "methods": "A visualização {0} exige a definição dos métodos {1}."
    },
    "format": {
        decimal: ',',
        thousands: '.',
        grouping: [3],
        currency: ['R$', ''],
        dateTime: '%A, %e de %B de %Y. %X',
        date: '%d/%m/%Y',
        time: '%H:%M:%S',
        periods: ['AM', 'PM'],
        days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    "lowercase": [
        "a",
        "com",
        "de",
        "e",
        "em",
        "mas",
        "ou",
        "para",
        "um"
    ],
    "method": {
        "active": "segmentos ativos",
        "color": "cor",
        "depth": "profundidade",
        "dev": "verboso",
        "focus": "foco",
        "icon": "ícone",
        "id": "id",
        "height": "altura",
        "labels": "rótulos",
        "legend": "legenda",
        "margin": "margem",
        "messages": "mensagens de status",
        "order": "ordenar",
        "search": "pesquisar",
        "shape": "forma",
        "size": "tamanho",
        "style": "estilo",
        "temp": "segmentos temporários",
        "text": "texto",
        "time": "tempo",
        "timeline": "cronograma",
        "total": "segmentos totais",
        "type": "tipo",
        "width": "largura",
        "x": "eixo x",
        "y": "eixo y",
        "zoom": "zoom",
        "mode": "modo"
    },
    "time": [
        "ano",
        "data",
        "dia",
        "hora",
        "mês"
    ],
    "visualization": {
        "bar": "Gráfico de Barras",
        "box": "Box Plot",
        "bubbles": "Bolhas",
        "chart": "Gráfico",
        "geo_map": "Mapa",
        "line": "Gráfico de Linha",
        "network": "Rede",
        "path": "Caminhos",
        "pie": "Pie Chart",
        "rings": "Anéis",
        "scatter": "Dispersão",
        "stacked": "Evolução",
        "table": "Tabela",
        "tree_map": "Tree Map"
    },
    "ui": {
        "and": "e",
        "back": "de volta",
        "collapse": "Clique para fechar",
        "error": "erro",
        "expand": "clique para expandir",
        "loading": "carregando ...",
        "more": "mais {0}",
        "moreInfo": "clique para mais informações",
        "noResults": "nenhum resultado para {0}.",
        "or": "ou",
        "primary": "conexões primárias",
        "share": "participação",
        "total": "total",
        "values": "valores",
        "including": "incluindo"
    },
    "message": {
        "data": "analisando dados",
        "draw": "desenhando visualização",
        "initializing": "inicializando {0}",
        "loading": "carregando dados",
        "tooltipReset": "redefinindo as dicas",
        "ui": "atualizando interface"
    },
    "uppercase": ["CEOs", "CFOs", "CNC", "COOs", "HVAC", "P&D", "TV", "UI"]
}

},{}],74:[function(require,module,exports){
module.exports = {
    "dev": {
        "accepted": "{0}不是{1}的可接受值, 请用下列之一的值:{2}",
        "deprecated": "{0}的方法已被移除, 请更新您的代码去使用{1}",
        "noChange": "{0}没有更新, 因为它并没有改变。",
        "noContainer": "无法在该页找到容器去匹配{0}",
        "of": "的",
        "oldStyle": "样式属性{0}现在已经直接嵌入到。{1}（）。",
        "sameEdge": "边缘不能链接到自己。自动去除自我参照边缘{0}。",
        "set": "{0}已经被设置。",
        "setLong": "{0}被设置为{1}。",
        "setContainer": "请使用()容器来定义div容器"
    },
    "error": {
        "accepted": "{0}对于{2}的可视化效果并不是一个可接受的{1}, 请使用如下的一个：{3}.",
        "connections": "没有对{0}可用的连接。",
        "data": "无可用数据",
        "dataYear": "没有数据对{0}可用。",
        "lib": "{0}的可视化要求装载{1}库。",
        "libs": "{0}的可视化需要加载以下库：{1}。",
        "method": "{0}的可视化要求设置{1}方法。",
        "methods": "{0}的可视化要求设置以下方法：{1}。"
    },
    "format": {
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["¥", ""],
        dateTime: "%A %B %e %Y %X",
        date: "%Y/%-m/%-d",
        time: "%H:%M:%S",
        periods: ["上午", "下午"],
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    },
    "lowercase": [
        "一个",
        "和",
        "在",
        "但是",
        "在...里",
        "的",
        "或者",
        "这",
        "向",
        "与...一起"
    ],
    "method": {
        "active": "活跃段",
        "color": "颜色",
        "depth": "深度",
        "dev": "详细",
        "focus": "焦点",
        "icon": "图标",
        "id": "身份认证",
        "height": "高度",
        "labels": "标签",
        "legend": "图例注释",
        "margin": "外边距",
        "messages": "状态消息",
        "order": "规则",
        "search": "搜索",
        "shape": "形状",
        "size": "大小",
        "style": "样式",
        "temp": "暂时性区段",
        "text": "文本",
        "time": "时间",
        "timeline": "时间轴",
        "total": "总段",
        "type": "类型",
        "width": "宽度",
        "x": "X轴",
        "y": "Y轴",
        "zoom": "缩放",
        "mode": "模式"
    },
    "time": [
        "日",
        "星期",
        "月",
        "时间",
        "年"
    ],
    "visualization": {
        "bar": "条形图",
        "box": "箱线图",
        "bubbles": "气泡",
        "chart": "图表",
        "geo_map": "地理地图",
        "line": "线图",
        "network": "网络",
        "path": "路径",
        "pie": "饼图",
        "rings": "特性",
        "scatter": "散点图",
        "stacked": "堆积面积图",
        "table": "表",
        "tree_map": "树图"
    },
    "ui": {
        "and": "和",
        "back": "后面",
        "collapse": "点击合并",
        "error": "错误",
        "expand": "单击以展开",
        "loading": "载入中...",
        "more": "{0}更多",
        "moreInfo": "点击了解更多信息",
        "noResults": "没有结果匹配{0}。",
        "or": "或",
        "primary": "主要连接",
        "share": "共享",
        "total": "总",
        "values": "值",
        "including": "包括"
    },
    "message": {
        "data": "分析数据",
        "draw": "绘制可视化",
        "initializing": "初始化{0}",
        "loading": "加载数据",
        "tooltipReset": "重置工具提示",
        "ui": "更新UI"
    },
    "uppercase": [
        "电视",
        "用户界面",
        "研发"
    ]
}

},{}],75:[function(require,module,exports){
module.exports = {
  en_US: require("./languages/en_US.coffee"),
  mk_MK: require("./languages/mk_MK.js"),
  pt_BR: require("./languages/pt_BR.js"),
  zh_CN: require("./languages/zh_CN.js")
};



},{"./languages/en_US.coffee":71,"./languages/mk_MK.js":72,"./languages/pt_BR.js":73,"./languages/zh_CN.js":74}],76:[function(require,module,exports){
var checkObject, copy, createFunction, initialize, print, process, setMethod, stringFormat, validObject;

copy = require("../../util/copy.coffee");

print = require("../console/print.coffee");

process = require("./process/detect.coffee");

setMethod = require("./set.coffee");

stringFormat = require("../../string/format.js");

validObject = require("../../object/validate.coffee");

module.exports = function(vars, methods) {
  var method, obj, results;
  results = [];
  for (method in methods) {
    obj = methods[method];
    vars[method] = copy(obj);
    vars[method].initialized = initialize(vars, vars[method], method);
    results.push(vars.self[method] = createFunction(vars, method));
  }
  return results;
};

initialize = function(vars, obj, method) {
  var d, deps, i, len, o;
  obj.previous = false;
  obj.changed = false;
  obj.initialized = false;
  if ("init" in obj && (!("value" in obj))) {
    obj.value = obj.init(vars);
    delete obj.init;
  }
  if ("process" in obj) {
    obj.value = process(vars, obj, obj.value);
  }
  for (o in obj) {
    if (o === "deprecates") {
      deps = obj[o] instanceof Array ? obj[o] : [obj[o]];
      for (i = 0, len = deps.length; i < len; i++) {
        d = deps[i];
        vars.self[d] = (function(dep, n) {
          return function(x) {
            var str;
            str = vars.format.locale.value.dev.deprecated;
            dep = "." + dep + "()";
            print.error(stringFormat(str, dep, "." + n + "()"), n);
            return vars.self;
          };
        })(d, method);
      }
    } else if (o === "global") {
      if (!(method in vars)) {
        vars[method] = [];
      }
    } else if (o !== "value") {
      if (validObject(obj[o])) {
        initialize(vars, obj[o], o);
      }
    }
  }
  return true;
};

createFunction = function(vars, key) {
  return function(user, callback) {
    var accepted, checkFont, checkValue, fontAttr, fontAttrValue, s, starting, str;
    accepted = "accepted" in vars[key] ? vars[key].accepted : null;
    if (typeof accepted === "function") {
      accepted = accepted(vars);
    }
    if (!(accepted instanceof Array)) {
      accepted = [accepted];
    }
    if (user === Object) {
      return vars[key];
    } else if (!arguments.length && accepted.indexOf(void 0) < 0) {
      if ("value" in vars[key]) {
        return vars[key].value;
      } else {
        return vars[key];
      }
    }
    if (key === "style" && typeof user === "object") {
      str = vars.format.locale.value.dev.oldStyle;
      for (s in user) {
        print.warning(stringFormat(str, "\"" + s + "\"", s), s);
        vars.self[s](user[s]);
      }
    }
    if (key === "font") {
      if (typeof user === "string") {
        user = {
          family: user
        };
      }
      starting = true;
      checkValue = function(o, a, m, v) {
        if (validObject(o[m]) && a in o[m]) {
          if (validObject(o[m][a])) {
            if (o[m][a].process) {
              o[m][a].value = o[m][a].process(v);
            } else {
              o[m][a].value = v;
            }
          } else {
            o[m][a] = v;
          }
        }
      };
      checkFont = function(o, a, v) {
        var m;
        if (validObject(o)) {
          if (starting) {
            for (m in o) {
              checkValue(o, a, m, v);
            }
          } else if ("font" in o) {
            checkValue(o, a, "font", v);
          }
          starting = false;
          for (m in o) {
            checkFont(o[m], a, v);
          }
        }
      };
      for (fontAttr in user) {
        fontAttrValue = user[fontAttr];
        if (fontAttr !== "secondary") {
          if (validObject(fontAttrValue)) {
            fontAttrValue = fontAttrValue.value;
          }
          if (fontAttrValue) {
            checkFont(vars, fontAttr, fontAttrValue);
          }
        }
      }
    }
    checkObject(vars, key, vars, key, user);
    if (typeof callback === "function") {
      vars[key].callback = callback;
    }
    if (vars[key].chainable === false) {
      return vars[key].value;
    } else {
      return vars.self;
    }
  };
};

checkObject = function(vars, method, object, key, value) {
  var approvedObject, d, objectOnly, passingObject;
  if (["accepted", "changed", "initialized", "previous", "process"].indexOf(key) < 0) {
    passingObject = validObject(value);
    objectOnly = validObject(object[key]) && "objectAccess" in object[key] && object[key]["objectAccess"] === false;
    approvedObject = passingObject && (objectOnly || ((!("value" in value)) && (!(d3.keys(value)[0] in object[key]))));
    if (value === null || !passingObject || approvedObject) {
      setMethod(vars, method, object, key, value);
    } else if (passingObject) {
      for (d in value) {
        checkObject(vars, method, object[key], d, value[d]);
      }
    }
  }
};



},{"../../object/validate.coffee":166,"../../string/format.js":167,"../../util/copy.coffee":201,"../console/print.coffee":54,"./process/detect.coffee":84,"./set.coffee":90}],77:[function(require,module,exports){
module.exports = function(g) {
  if (!g) {
    g = false;
  }
  return {
    accepted: [false, Array, Function, Number, Object, String],
    callback: {
      accepted: [false, Function],
      value: false
    },
    global: g,
    process: Array,
    value: []
  };
};



},{}],78:[function(require,module,exports){
var rtl;

rtl = require("../../../client/rtl.coffee");

module.exports = function(align) {
  var accepted;
  accepted = ["left", "center", "right"];
  if (align === false) {
    accepted.unshift(false);
  }
  if (accepted.indexOf(align) < 0) {
    align = "left";
  }
  return {
    accepted: accepted,
    process: function(value) {
      if (rtl) {
        if (value === "left") {
          return "right";
        } else {
          if (value === "right") {
            return "left";
          } else {
            return value;
          }
        }
      } else {
        return value;
      }
    },
    value: align
  };
};



},{"../../../client/rtl.coffee":43}],79:[function(require,module,exports){
module.exports = function(decoration) {
  var accepted;
  accepted = ["line-through", "none", "overline", "underline"];
  if (decoration === false) {
    accepted.unshift(false);
  }
  if (accepted.indexOf(decoration) < 0) {
    decoration = "none";
  }
  return {
    accepted: accepted,
    value: decoration
  };
};



},{}],80:[function(require,module,exports){
var helvetica, validate;

validate = require("../../../font/validate.coffee");

helvetica = ["Helvetica Neue", "HelveticaNeue", "Helvetica", "Arial", "sans-serif"];

module.exports = function(family) {
  if (family === void 0) {
    family = helvetica;
  }
  return {
    process: validate,
    value: family
  };
};



},{"../../../font/validate.coffee":98}],81:[function(require,module,exports){
module.exports = function(position) {
  var accepted;
  accepted = ["top", "middle", "bottom"];
  if (position === false) {
    accepted.unshift(false);
  }
  if (accepted.indexOf(position) < 0) {
    position = "bottom";
  }
  return {
    accepted: accepted,
    mapping: {
      top: "0ex",
      middle: "0.5ex",
      bottom: "1ex"
    },
    process: function(value) {
      this.text = value;
      return this.mapping[value];
    },
    value: position
  };
};



},{}],82:[function(require,module,exports){
module.exports = function(transform) {
  var accepted;
  accepted = ["capitalize", "lowercase", "none", "uppercase"];
  if (transform === false) {
    accepted.unshift(false);
  }
  if (accepted.indexOf(transform) < 0) {
    transform = "none";
  }
  return {
    accepted: accepted,
    value: transform
  };
};



},{}],83:[function(require,module,exports){
module.exports = function(value, vars, method) {
  if (vars.history) {
    vars.history.reset();
  }
  if (typeof value === "string") {
    if (value.indexOf("/") >= 0) {
      method.url = value;
      return [];
    }
    if (d3.selectAll(value).size()) {
      return d3.selectAll(value);
    } else {
      return [];
    }
  } else {
    return value;
  }
};



},{}],84:[function(require,module,exports){
var copy, update;

copy = require("../../../util/copy.coffee");

update = require("../../../array/update.coffee");

module.exports = function(vars, object, value) {
  if (object.process === Array) {
    return update(copy(object.value), value);
  } else if (typeof object.process === "object" && typeof value === "string") {
    return object.process[value];
  } else if (typeof object.process === "function") {
    return object.process(value, vars, object);
  } else {
    return value;
  }
};



},{"../../../array/update.coffee":38,"../../../util/copy.coffee":201}],85:[function(require,module,exports){
var stylesheet;

stylesheet = require("../../../client/css.coffee");

module.exports = function(value, vars, method) {
  if (value === false || value.indexOf("fa-") < 0 || (value.indexOf("fa-") === 0 && stylesheet("font-awesome"))) {
    return value;
  } else {
    return method.fallback;
  }
};



},{"../../../client/css.coffee":39}],86:[function(require,module,exports){
module.exports = function(value, self) {
  var i, j, k, l, len, len1, len2, len3, m, results, side, sides, v;
  if (typeof value === "string") {
    value = value.split(" ");
    for (i = j = 0, len = value.length; j < len; i = ++j) {
      v = value[i];
      value[i] = parseFloat(v, 10);
    }
    if (value.length === 1) {
      value = value[0];
    } else if (value.length === 2) {
      value = {
        top: value[0],
        right: value[1],
        bottom: value[0],
        left: value[1]
      };
    } else if (value.length === 3) {
      value = {
        top: value[0],
        right: value[1],
        bottom: value[2],
        left: value[1]
      };
    } else if (value.length === 4) {
      value = {
        top: value[0],
        right: value[1],
        bottom: value[2],
        left: value[3]
      };
    } else {
      value = 0;
    }
  }
  sides = ["top", "right", "bottom", "left"];
  if (typeof value === "number") {
    for (k = 0, len1 = sides.length; k < len1; k++) {
      side = sides[k];
      self[side] = value;
    }
  } else {
    for (l = 0, len2 = sides.length; l < len2; l++) {
      side = sides[l];
      self[side] = value[side];
    }
  }
  self.css = "";
  results = [];
  for (i = m = 0, len3 = sides.length; m < len3; i = ++m) {
    side = sides[i];
    if (i) {
      self.css += " ";
    }
    results.push(self.css += self[side] + "px");
  }
  return results;
};



},{}],87:[function(require,module,exports){
var contains, format, list, print;

contains = require("../../array/contains.coffee");

format = require("../../string/format.js");

list = require("../../string/list.coffee");

print = require("../console/print.coffee");

module.exports = function(vars, accepted, value, method, text) {
  var a, allowed, app, i, len, recs, str, val;
  if (typeof accepted === "function") {
    accepted = accepted(vars);
  }
  if (!(accepted instanceof Array)) {
    accepted = [accepted];
  }
  allowed = contains(accepted, value);
  if (allowed === false && value !== void 0) {
    recs = [];
    val = JSON.stringify(value);
    if (typeof value !== "string") {
      val = "\"" + val + "\"";
    }
    for (i = 0, len = accepted.length; i < len; i++) {
      a = accepted[i];
      if (typeof a === "string") {
        recs.push("\"" + a + "\"");
      } else if (typeof a === "function") {
        recs.push(a.toString().split("()")[0].substring(9));
      } else if (a === void 0) {
        recs.push("undefined");
      } else {
        recs.push(JSON.stringify(a));
      }
    }
    recs = list(recs, vars.format.locale.value.ui.or);
    if (vars.type && ["mode", "shape"].indexOf(method) >= 0) {
      str = vars.format.locale.value.error.accepted;
      app = vars.format.locale.value.visualization[vars.type.value] || vars.type.value;
      print.warning(format(str, val, method, app, recs), method);
    } else {
      str = vars.format.locale.value.dev.accepted;
      print.warning(format(str, val, text, recs), method);
    }
  }
  return !allowed;
};



},{"../../array/contains.coffee":36,"../../string/format.js":167,"../../string/list.coffee":168,"../console/print.coffee":54}],88:[function(require,module,exports){
module.exports = function(rendering) {
  var accepted;
  accepted = ["auto", "optimizeSpeed", "crispEdges", "geometricPrecision"];
  if (!(accepted.indexOf(rendering) >= 0)) {
    rendering = "crispEdges";
  }
  return {
    accepted: accepted,
    value: rendering
  };
};



},{}],89:[function(require,module,exports){
var reset, validObject;

validObject = require("../../object/validate.coffee");

reset = function(obj, method) {
  var o;
  if (obj.changed) {
    obj.changed = false;
  }
  if (method === "draw") {
    obj.frozen = false;
    obj.update = true;
    obj.first = false;
  }
  for (o in obj) {
    if (o.indexOf("d3plus") < 0 && validObject(obj[o])) {
      reset(obj[o], o);
    }
  }
};

module.exports = reset;



},{"../../object/validate.coffee":166}],90:[function(require,module,exports){
var copy, d3selection, mergeObject, print, process, rejected, stringFormat, updateArray, validObject;

copy = require("../../util/copy.coffee");

d3selection = require("../../util/d3selection.coffee");

validObject = require("../../object/validate.coffee");

mergeObject = require("../../object/merge.coffee");

print = require("../console/print.coffee");

process = require("./process/detect.coffee");

rejected = require("./rejected.coffee");

stringFormat = require("../../string/format.js");

updateArray = require("../../array/update.coffee");

module.exports = function(vars, method, object, key, value) {
  var accepted, c, callback, d3object, hasValue, id, k, longArray, n, parentKey, str, text, typeFunction, valString;
  if (key === "value" || !key || key === method) {
    text = "." + method + "()";
  } else {
    text = "\"" + key + "\" " + vars.format.locale.value.dev.of + " ." + method + "()";
  }
  if (key === "value" && "accepted" in object) {
    accepted = object.accepted;
  } else if (validObject(object[key]) && "accepted" in object[key]) {
    accepted = object[key].accepted;
  } else {
    accepted = [value];
  }
  if (!rejected(vars, accepted, value, method, text)) {
    if (validObject(object[key]) && "value" in object[key]) {
      parentKey = key;
      object = object[key];
      key = "value";
    }
    if (key === "value" && "process" in object) {
      value = process(vars, object, value);
    }
    if ((!(object[key] instanceof Array)) && object[key] === value && value !== void 0) {
      str = vars.format.locale.value.dev.noChange;
      if (vars.dev.value) {
        print.comment(stringFormat(str, text));
      }
    } else {
      object.changed = true;
      if (object.loaded) {
        object.loaded = false;
      }
      if ("history" in vars && method !== "draw") {
        c = copy(object);
        c.method = method;
        vars.history.chain.push(c);
      }
      object.previous = object[key];
      if ("id" in vars && key === "value" && "nesting" in object) {
        if (method !== "id") {
          if (typeof object.nesting !== "object") {
            object.nesting = {};
          }
          if (validObject(value)) {
            for (id in value) {
              if (typeof value[id] === "string") {
                value[id] = [value[id]];
              }
            }
            object.nesting = mergeObject(object.nesting, value);
            if (!(vars.id.value in object.nesting)) {
              object.nesting[vars.id.value] = value[d3.keys(value)[0]];
            }
          } else if (value instanceof Array) {
            object.nesting[vars.id.value] = value;
          } else {
            object.nesting[vars.id.value] = [value];
          }
          object[key] = object.nesting[vars.id.value][0];
        } else {
          if (value instanceof Array) {
            object.nesting = value;
            if ("depth" in vars && vars.depth.value < value.length) {
              object[key] = value[vars.depth.value];
            } else {
              object[key] = value[0];
              if ("depth" in vars) {
                vars.depth.value = 0;
              }
            }
          } else {
            object[key] = value;
            object.nesting = [value];
            if ("depth" in vars) {
              vars.depth.value = 0;
            }
          }
        }
      } else if (method === "depth") {
        if (value >= vars.id.nesting.length) {
          vars.depth.value = vars.id.nesting.length - 1;
        } else if (value < 0) {
          vars.depth.value = 0;
        } else {
          vars.depth.value = value;
        }
        vars.id.value = vars.id.nesting[vars.depth.value];
        if (typeof vars.text.nesting === "object") {
          n = vars.text.nesting[vars.id.value];
          if (n) {
            vars.text.nesting[vars.id.value] = typeof n === "string" ? [n] : n;
            vars.text.value = (n instanceof Array ? n[0] : n);
          }
        }
      } else if (validObject(object[key]) && validObject(value)) {
        object[key] = mergeObject(object[key], value);
      } else {
        object[key] = value;
      }
      if (key === "value" && object.global) {
        hasValue = object[key].length > 0;
        k = parentKey || key;
        if (k in vars && ((hasValue && vars.data[k].indexOf(method) < 0) || (!hasValue && vars.data[k].indexOf(method) >= 0))) {
          vars.data[k] = updateArray(vars.data[k], method);
        }
      }
      if (key === "value" && object.dataFilter && vars.data && vars.data.filters.indexOf(method) < 0) {
        vars.data.filters.push(method);
      }
      if (vars.dev.value && object.changed && object[key] !== void 0) {
        longArray = object[key] instanceof Array && object[key].length > 10;
        d3object = d3selection(object[key]);
        typeFunction = typeof object[key] === "function";
        valString = (!longArray && !d3object && !typeFunction ? (typeof object[key] === "string" ? object[key] : JSON.stringify(object[key])) : null);
        if (valString !== null && valString.length < 260) {
          str = vars.format.locale.value.dev.setLong;
          print.log(stringFormat(str, text, "\"" + valString + "\""));
        } else {
          str = vars.format.locale.value.dev.set;
          print.log(stringFormat(str, text));
        }
      }
    }
    if (key === "value" && object.callback && !object.url) {
      callback = typeof object.callback === "function" ? object.callback : object.callback.value;
      if (callback) {
        callback(value, vars.self);
      }
    }
  }
};



},{"../../array/update.coffee":38,"../../object/merge.coffee":165,"../../object/validate.coffee":166,"../../string/format.js":167,"../../util/copy.coffee":201,"../../util/d3selection.coffee":202,"../console/print.coffee":54,"./process/detect.coffee":84,"./rejected.coffee":87}],91:[function(require,module,exports){
var print = require("../console/print.coffee"),
    stringFormat = require("../../string/format.js")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Cleans edges list and populates nodes list if needed
//-------------------------------------------------------------------
module.exports = function( vars ) {

  if ( vars.dev.value ) {
    var timerString = "analyzing edges list"
    print.time( timerString )
  }

  var appReqs     = vars.types[vars.type.value].requirements
  if (!(appReqs instanceof Array)) appReqs = [appReqs]
  var createNodes = appReqs.indexOf("nodes") >= 0 && !vars.nodes.value

  if ( createNodes ) {
    vars.nodes.value = []
    var placed = []
    vars.nodes.changed = true
  }

  vars.edges.value.forEach(function(e){

    if (typeof e[vars.edges.source] !== "object") {
      var obj = {}
      obj[vars.id.value] = e[vars.edges.source]
      e[vars.edges.source] = obj
    }
    if (typeof e[vars.edges.target] !== "object") {
      var obj = {}
      obj[vars.id.value] = e[vars.edges.target]
      e[vars.edges.target] = obj
    }

    if (!("keys" in vars.data)) {
      vars.data.keys = {}
    }

    if (!(vars.id.value in vars.data.keys)) {
      vars.data.keys[vars.id.value] = typeof e[vars.edges.source][vars.id.value]
    }

    if ( createNodes ) {
      if (placed.indexOf(e[vars.edges.source][vars.id.value]) < 0) {
        placed.push(e[vars.edges.source][vars.id.value])
        vars.nodes.value.push(e[vars.edges.source])
      }
      if (placed.indexOf(e[vars.edges.target][vars.id.value]) < 0) {
        placed.push(e[vars.edges.target][vars.id.value])
        vars.nodes.value.push(e[vars.edges.target])
      }
    }

  })

  vars.edges.value = vars.edges.value.filter(function(e){

    var source = e[vars.edges.source][vars.id.value]
      , target = e[vars.edges.target][vars.id.value]

    if ( source === target ) {
      var str = vars.format.locale.value.dev.sameEdge
      print.warning(stringFormat(str,"\""+source+"\"") , "edges" )
      return false
    }
    else {
      return true
    }

  })

  vars.edges.linked = true

  if ( vars.dev.value ) print.timeEnd( timerString )

}

},{"../../string/format.js":167,"../console/print.coffee":54}],92:[function(require,module,exports){
// Parses an HTML element for data
module.exports = function( vars ) {

  var attributes = [ vars.color.value
                   , vars.icon.value
                   , vars.keywords.value
                   , vars.alt.value
                   , "style" ]

  if (!vars.text.value) {
    vars.self.text("text")
  }

  attributes = attributes.concat(vars.id.nesting)

  function get_attributes( obj , elem ) {
    [].forEach.call(elem.attributes, function(attr) {
        if (/^data-/.test(attr.name)) {
            var camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
            obj[camelCaseName] = attr.value;
        }
    })

    attributes.forEach(function(a){

      if ( elem.getAttribute(a) !== null ) {
        obj[a] = elem.getAttribute(a)
      }

    })

  }

  vars.self.data({"element": vars.data.value})

  var elementTag  = vars.data.element.value.node().tagName.toLowerCase()
    , elementType = vars.data.element.value.attr("type")
    , elementData = []

  if ( elementTag === "select" ) {

    var elementID = vars.data.element.value.node().id
    if ( elementID ) {
      vars.self.container({"id": elementID})
    }

    vars.data.element.value.selectAll("option")
      .each(function( o , i ){

        var data_obj = {}

        data_obj.text = this.innerHTML

        get_attributes(data_obj,this)

        elementData.push(data_obj)

        if (this.selected) {
          for (var i = vars.id.nesting.length-1; i >= 0; i--) {
            var level = vars.id.nesting[i]
            if (level in data_obj) {
              vars.self.focus(data_obj[level])
              break
            }
          }
        }

      })

  }
  else if ( elementTag === "input" && elementType === "radio" ) {

    var elementName = vars.data.element.value.node().getAttribute("name")
    if ( elementName ) {
      vars.self.container({"id": elementName})
    }

    vars.data.element.value
      .each(function( o , i ){

        var data_obj = {}

        get_attributes(data_obj,this)

        var id = data_obj[vars.id.value] || this.id || false

        if ( id && isNaN(parseFloat(id)) ) {

          var label = d3.select("label[for="+id+"]")

          if ( !label.empty() ) {
            data_obj.text = label.html()
            label.call(hideElement)
          }

        }

        elementData.push(data_obj)

        if (this.checked) {
          vars.self.focus(data_obj[vars.id.value])
        }

      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Get focus from data, if it hasn't been found or set.
  //----------------------------------------------------------------------------
  if ( !vars.focus.value.length && elementData.length ) {

    vars.data.element.value.node().selectedIndex = 0
    vars.self.focus(elementData[0][vars.id.value])

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If a <legend> element exists, use it as the title.
  //----------------------------------------------------------------------------
  var elementLegend = d3.select("legend[for="+vars.container.id+"]")
  if ( !elementLegend.empty() ) {

    vars.self.title(elementLegend.html())
    elementLegend.call(hideElement)

  }

  var containerTag = vars.container.value
                   ? vars.container.value.node().tagName.toLowerCase() : false

  if ( vars.container.value === false || containerTag === "body" ) {
    vars.container.value = d3.select(vars.data.element.value.node().parentNode)
  }

  vars.data.element.value.call(hideElement)

  return elementData

};

function hideElement( elem ) {

  elem
    .style("position","absolute","important")
    .style("clip","rect(1px 1px 1px 1px)","important")
    .style("clip","rect(1px, 1px, 1px, 1px)","important")
    .style("width","1px","important")
    .style("height","1px","important")
    .style("margin","-1px","important")
    .style("padding","0","important")
    .style("border","0","important")
    .style("overflow","hidden","important");

}

},{}],93:[function(require,module,exports){
var print = require("../console/print.coffee")

// Calculates node positions, if needed for network.
module.exports = function(vars) {

  if ( vars.dev.value ) {
    var timerString = "analyzing node positions"
    print.time( timerString )
  }

  var set = vars.nodes.value.filter(function(n){
    return typeof n.x == "number" && typeof n.y == "number"
  }).length

  if (set == vars.nodes.value.length) {
    vars.nodes.positions = true
  }
  else {

    var force = d3.layout.force()
      .size([vars.width.viz,vars.height.viz])
      .nodes(vars.nodes.value)
      .links(vars.edges.value)

    var strength = vars.edges.strength.value
    if (strength) {
      if (typeof strength === "string") {
        force.linkStrength(function(e){
          return e[strength]
        })
      }
      else {
        force.linkStrength(strength)
      }
    }

    var iterations = 50,
        threshold = 0.01;

    force.start(); // Defaults to alpha = 0.1
    for (var i = iterations; i > 0; --i) {
      force.tick();
      if(force.alpha() < threshold) {
        break;
      }
    }
    force.stop();

    vars.nodes.positions = true

  }

  if ( vars.dev.value ) print.timeEnd( timerString )

}

},{"../console/print.coffee":54}],94:[function(require,module,exports){
var numeric;

numeric = require('numeric');

module.exports = function(data, options) {
  var N, X, Xfulltr, Xtr, bestResult, beta_hat, bic, degree, degrees, i, j, k, l, loglike, m, point, prevBIC, q, ref, ref1, residual, sigma2, sse, y, y_hat;
  if (options == null) {
    options = {};
  }
  if (options.maxDegree == null) {
    options.maxDegree = 5;
  }
  N = data.length;
  prevBIC = Number.MAX_VALUE;
  bestResult = null;
  Xfulltr = (function() {
    var l, ref, results;
    results = [];
    for (degree = l = 1, ref = options.maxDegree + 1; 1 <= ref ? l < ref : l > ref; degree = 1 <= ref ? ++l : --l) {
      results.push((function() {
        var len, m, results1;
        results1 = [];
        for (m = 0, len = data.length; m < len; m++) {
          point = data[m];
          results1.push(Math.pow(point[0], degree));
        }
        return results1;
      })());
    }
    return results;
  })();
  y = (function() {
    var l, len, results;
    results = [];
    for (l = 0, len = data.length; l < len; l++) {
      point = data[l];
      results.push(point[1]);
    }
    return results;
  })();
  for (i = l = 0, ref = 1 << options.maxDegree; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
    Xtr = [
      (function() {
        var m, ref1, results;
        results = [];
        for (q = m = 0, ref1 = N; 0 <= ref1 ? m < ref1 : m > ref1; q = 0 <= ref1 ? ++m : --m) {
          results.push(1);
        }
        return results;
      })()
    ];
    degrees = [0];
    for (j = m = 0, ref1 = options.maxDegree; 0 <= ref1 ? m < ref1 : m > ref1; j = 0 <= ref1 ? ++m : --m) {
      if ((i & 1 << j) > 0) {
        Xtr.push(Xfulltr[j]);
        degrees.push(j + 1);
      }
    }
    X = numeric.transpose(Xtr);
    k = degrees.length;
    beta_hat = numeric.dot(numeric.dot(numeric.inv(numeric.dot(Xtr, X)), Xtr), y);
    y_hat = numeric.dot(X, beta_hat);
    residual = numeric.sub(y, y_hat);
    sse = numeric.dot(residual, residual);
    sigma2 = sse / (N - k);
    loglike = -0.5 * N * Math.log(2 * Math.PI) - 0.5 * N * Math.log(sigma2) - sse / (2 * sigma2);
    bic = -2 * loglike + k * (Math.log(N) - Math.log(2 * Math.PI));
    if (bic < prevBIC) {
      prevBIC = bic;
      bestResult = [degrees, beta_hat, y_hat];
    }
  }
  return bestResult;
};



},{"numeric":8}],95:[function(require,module,exports){
var kdtree;

kdtree = require('static-kdtree');

module.exports = function(points, K) {
  var avg_lrd, i, j, kdists, ldr, ldrs, neighbors, p, reachDist, result, sqDist, tree;
  if (K == null) {
    K = 10;
  }
  tree = kdtree(points);
  neighbors = (function() {
    var k, len, results;
    results = [];
    for (k = 0, len = points.length; k < len; k++) {
      p = points[k];
      results.push(tree.knn(p, K + 1).slice(1));
    }
    return results;
  })();
  sqDist = function(i, j) {
    var A, B, delta, dist, k, ref;
    A = points[i];
    B = points[j];
    dist = 0;
    for (i = k = 0, ref = A.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      delta = A[i] - B[i];
      dist += delta * delta;
    }
    return dist;
  };
  kdists = (function() {
    var k, ref, results;
    results = [];
    for (i = k = 0, ref = points.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      results.push(sqDist(i, neighbors[i][K - 1]));
    }
    return results;
  })();
  reachDist = function(i, j) {
    return Math.max(sqDist(i, j), kdists[j]);
  };
  ldr = function(i) {
    var j, k, len, rDist, ref;
    rDist = 0;
    ref = neighbors[i];
    for (k = 0, len = ref.length; k < len; k++) {
      j = ref[k];
      rDist += reachDist(i, j);
    }
    return K / rDist;
  };
  ldrs = (function() {
    var k, ref, results;
    results = [];
    for (i = k = 0, ref = points.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      results.push(ldr(i));
    }
    return results;
  })();
  result = (function() {
    var k, l, len, ref, ref1, results;
    results = [];
    for (i = k = 0, ref = points.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      avg_lrd = 0;
      ref1 = neighbors[i];
      for (l = 0, len = ref1.length; l < len; l++) {
        j = ref1[l];
        avg_lrd += ldrs[j];
      }
      avg_lrd /= K;
      results.push([i, avg_lrd / ldrs[i]]);
    }
    return results;
  })();
  return result.sort(function(a, b) {
    return b[1] - a[1];
  });
};



},{"static-kdtree":10}],96:[function(require,module,exports){
module.exports = function(points) {
  var mad, median, result;
  median = d3.median(points);
  mad = d3.median(points.map(function(p) {
    return Math.abs(p - median);
  }));
  result = points.map(function(p, i) {
    return [i, Math.abs(p - median) / mad];
  });
  return result.sort(function(a, b) {
    return b[1] - a[1];
  });
};



},{}],97:[function(require,module,exports){
var fontTester, getHeight, getWidth;

fontTester = require("../core/font/tester.coffee");

module.exports = function(words, style, opts) {
  var attr, sizes, tester, tspans;
  if (!opts) {
    opts = {};
  }
  tester = opts.parent || fontTester("svg").append("text");
  style = style || {};
  sizes = [];
  if (!(words instanceof Array)) {
    words = [words];
  }
  tspans = tester.selectAll("tspan").data(words);
  attr = {
    left: "0px",
    position: "absolute",
    top: "0px",
    x: 0,
    y: 0
  };
  tspans.enter().append("tspan").text(String).style(style).attr(attr).each(function(d) {
    if (typeof opts.mod === "function") {
      return opts.mod(this);
    }
  }).each(function(d) {
    var children, height, width;
    children = d3.select(this).selectAll("tspan");
    if (children.size()) {
      width = [];
      children.each(function() {
        return width.push(getWidth(this));
      });
      width = d3.max(width);
    } else {
      width = getWidth(this);
    }
    height = getHeight(this);
    return sizes.push({
      height: height,
      text: d,
      width: width
    });
  });
  tspans.remove();
  if (!opts.parent) {
    tester.remove();
  }
  return sizes;
};

getWidth = function(elem) {
  return elem.getComputedTextLength();
};

getHeight = function(elem) {
  return elem.offsetHeight || elem.getBoundingClientRect().height || elem.parentNode.getBBox().height;
};



},{"../core/font/tester.coffee":70}],98:[function(require,module,exports){
var fontTester, validate;

fontTester = require("../core/font/tester.coffee");

validate = function(fontList) {
  var completed, family, font, fontString, i, j, len, len1, monospace, proportional, testElement, testWidth, tester, valid;
  if (!(fontList instanceof Array)) {
    fontList = fontList.split(",");
  }
  for (i = 0, len = fontList.length; i < len; i++) {
    font = fontList[i];
    font.trim();
  }
  fontString = fontList.join(", ");
  completed = validate.complete;
  if (fontString in completed) {
    return completed[fontString];
  }
  testElement = function(font) {
    return tester.append("span").style("font-family", font).style("font-size", "32px").style("padding", "0px").style("margin", "0px").text("abcdefghiABCDEFGHI_!@#$%^&*()_+1234567890");
  };
  testWidth = function(font, control) {
    var elem, width1, width2;
    elem = testElement(font);
    width1 = elem.node().offsetWidth;
    width2 = control.node().offsetWidth;
    elem.remove();
    return width1 !== width2;
  };
  tester = fontTester("div");
  monospace = testElement("monospace");
  proportional = testElement("sans-serif");
  for (j = 0, len1 = fontList.length; j < len1; j++) {
    family = fontList[j];
    valid = testWidth(family + ",monospace", monospace);
    if (!valid) {
      valid = testWidth(family + ",sans-serif", proportional);
    }
    if (valid) {
      valid = family;
      break;
    }
  }
  if (!valid) {
    valid = "sans-serif";
  }
  monospace.remove();
  proportional.remove();
  completed[fontString] = valid;
  return valid;
};

validate.complete = {};

module.exports = validate;



},{"../core/font/tester.coffee":70}],99:[function(require,module,exports){
var arraySort = require("../array/sort.coffee"),
    attach      = require("../core/methods/attach.coffee"),
    dataFormat  = require("../core/data/format.js"),
    dataKeys    = require("../core/data/keys.coffee"),
    dataLoad    = require("../core/data/load.coffee"),
    fetchData   = require("../core/fetch/data.js"),
    ie          = require("../client/ie.js"),
    methodReset = require("../core/methods/reset.coffee"),
    print       = require("../core/console/print.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Form Element shell
//------------------------------------------------------------------------------
module.exports = function() {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize the global variable object.
  //----------------------------------------------------------------------------
  var vars = {
    "types": {
      "auto": require("./types/auto.js"),
      "button": require("./types/button/button.coffee"),
      "drop": require("./types/drop/drop.coffee"),
      "toggle": require("./types/toggle.js")
    }
  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create the main drawing function.
  //----------------------------------------------------------------------------
  vars.self = function( selection ) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Set timing to 0 if it's the first time running this function or if the
    // data length is longer than the "large" limit
    //--------------------------------------------------------------------------
    var large = vars.data.value instanceof Array && vars.data.value.length > vars.data.large;

    vars.draw.timing = vars.draw.first || large || ie ? 0 : vars.timing.ui;

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create/update the UI element
    //--------------------------------------------------------------------------
    if ( vars.data.value instanceof Array ) {

      if ( vars.dev.value ) print.group("drawing \""+vars.type.value+"\"");

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Analyze new data, if changed.
      //------------------------------------------------------------------------
      if ( vars.data.changed ) {
        vars.data.cache = {};
        dataKeys( vars , "data" );
        dataFormat( vars );
      }

      vars.data.viz = fetchData( vars );

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Sort the data, if needed.
      //------------------------------------------------------------------------
      if (vars.data.sort.value && (vars.data.changed || vars.order.changed || vars.order.sort.changed) ) {
        arraySort( vars.data.viz , vars.order.value || vars.text.value,
                   vars.order.sort.value , vars.color.value , vars );
      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Set first element in data as focus if there is no focus set.
      //------------------------------------------------------------------------
      if ( vars.focus.value === false ) {

        var element = vars.data.element.value;

        if ( element && element.node().tagName.toLowerCase() === "select" ) {
          var i = element.property("selectedIndex");
          i = i < 0 ? 0 : i;
          var option = element.selectAll("option")[0][i],
              val = option.getAttribute("data-"+vars.id.value) || option.getAttribute(vars.id.value);
          if (val) vars.focus.value = val;
        }

        if ( vars.focus.value === false && vars.data.viz.length ) {
          vars.focus.value = vars.data.viz[0][vars.id.value];
        }

        if ( vars.dev.value && vars.focus.value ) print.log("\"value\" set to \""+vars.focus.value+"\"");

      }

      var getLevel = function(d,depth) {

        depth = typeof depth !== "number" ? vars.id.nesting.length === 1 ? 0 : vars.id.nesting.length-1 : depth;
        var level = vars.id.nesting[depth];

        if ( depth > 0 && (!(level in d) || d[level] instanceof Array) ) {
          return getLevel(d,depth-1);
        }
        else {
          return level;
        }

      };

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Run these things if the data has changed.
      //------------------------------------------------------------------------
      if ( vars.data.changed ) {

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // Determine if search box is needed.
        //----------------------------------------------------------------------
        if ( vars.search.value === "auto" ) {

          if (vars.data.viz.length > 10) {
            vars.search.enabled = true;
            if ( vars.dev.value ) print.log("Search enabled.");
          }
          else {
            vars.search.enabled = false;
            if ( vars.dev.value ) print.log("Search disabled.");
          }

        }
        else {

          vars.search.enabled = vars.search.value;

        }

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // Update OPTION elements with the new data.
        //----------------------------------------------------------------------
        var elementTag = vars.data.element.value ? vars.data.element.value.node().tagName.toLowerCase() : "";
        if ( vars.data.element.value && elementTag === "select" ) {

          var optionData = [];
          for (var level in vars.data.nested.all) {
            optionData = optionData.concat(vars.data.nested.all[level]);
          }

          options = vars.data.element.value.selectAll("option")
            .data(optionData,function(d){
              var level = d ? getLevel(d) : false;
              return d && level in d ? d[level] : false;
            });

          options.exit().remove();

          options.enter().append("option");

          options
            .each(function(d){

              var level   = getLevel(d),
                  textKey = level === vars.id.value ? vars.text.value || vars.id.value
                          : vars.text.nesting !== true && level in vars.text.nesting ? vars.text.nesting[level] : level;

              for ( var k in d ) {

                if ( typeof d[k] !== "object" ) {

                  if ( k === textKey ) {
                    d3.select(this).html(d[k]);
                  }

                  if ( ["alt","value"].indexOf(k) >= 0 ) {
                    d3.select(this).attr(k,d[k]);
                  }
                  else {
                    d3.select(this).attr("data-"+k,d[k]);
                  }

                }

              }

              if (d[level] === vars.focus.value) {
                this.selected = true;
              }
              else {
                this.selected = false;
              }

            });

        }

      }
      else if (vars.focus.changed && vars.data.element.value) {
        var tag = vars.data.element.value.node().tagName.toLowerCase();
        if (tag === "select") {
          vars.data.element.value.selectAll("option")
            .each(function(d){
              if (d[getLevel(d)] === vars.focus.value) {
                this.selected = true;
              }
              else {
                this.selected = false;
              }
            });
        }
        else {
          var tag = vars.data.element.value.attr("type").toLowerCase();
          if (tag === "radio") {
            vars.data.element.value
              .each(function(d){
                if (this.value === vars.focus.value) {
                  this.checked = true;
                }
                else {
                  this.checked = false;
                }
              })
          }
        }
      }

      if ( vars.type.value !== "auto" ) {

        if ( !vars.container.ui ) {

          //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
          // Select container DIV for UI element
          //----------------------------------------------------------------------
          vars.container.ui = vars.container.value
            .selectAll("div#d3plus_"+vars.type.value+"_"+vars.container.id)
            .data(["container"]);

          //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
          // Create container DIV for UI element
          //----------------------------------------------------------------------
          var before = vars.data.element.value ? vars.data.element.value[0][0] : null;

          if ( before ) {

            if ( before.id ) {
              before = "#"+before.id;
            }
            else {

              var id = before.getAttribute(vars.id.value) ? vars.id.value : "data-"+vars.id.value;

              if ( before.getAttribute(id) ) {
                before = "["+id+"="+before.getAttribute(id)+"]";
              }
              else {
                before = null;
              }

            }

          }

          vars.container.ui.enter()
            .insert("div",before)
            .attr("id","d3plus_"+vars.type.value+"_"+vars.container.id)
            .style("position","relative")
            .style("overflow","visible")
            .style("vertical-align","top");

        }

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // Update Container
        //------------------------------------------------------------------------
        vars.container.ui
          .style("display", vars.ui.display.value);

        vars.container.ui.transition().duration(vars.draw.timing)
          .style("margin", vars.ui.margin.css);

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // Create title, if available.
        //------------------------------------------------------------------------
        var title = vars.container.ui.selectAll("div.d3plus_title")
          .data(vars.title.value ? [vars.title.value] : []);

        title.enter().insert("div","#d3plus_"+vars.type.value+"_"+vars.container.id)
          .attr("class","d3plus_title")
          .style("display","inline-block");

        title
          .style("color",vars.font.color)
          .style("font-family",vars.font.family.value)
          .style("font-size",vars.font.size+"px")
          .style("font-weight",vars.font.weight)
          .style("padding",vars.ui.padding.css)
          .style("border-color","transparent")
          .style("border-style","solid")
          .style("border-width",vars.ui.border+"px")
          .text(String)
          .each(function(d){
            vars.margin.left = this.offsetWidth;
          });

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Call specific UI element type, if there is data.
      //------------------------------------------------------------------------
      if ( vars.data.value.length ) {

        var app = vars.format.locale.value.visualization[vars.type.value];
        if ( vars.dev.value ) print.time("drawing "+ app);
        vars.types[vars.type.value]( vars );
        if ( vars.dev.value ) print.timeEnd("drawing "+ app);

      }
      else if ( vars.data.url && (!vars.data.loaded || vars.data.stream) ) {

        dataLoad( vars , "data" , vars.self.draw );

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Initialization complete
      //------------------------------------------------------------------------
      if (vars.dev.value) print.timeEnd("total draw time");
      methodReset( vars );

    }

  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define methods and expose public variables.
  //----------------------------------------------------------------------------
  attach(vars, {
    "active":    require("./methods/active.coffee"),
    "alt":       require("./methods/alt.coffee"),
    "color":     require("./methods/color.coffee"),
    "config":    require("./methods/config.coffee"),
    "container": require("./methods/container.coffee"),
    "data":      require("./methods/data.js"),
    "depth":     require("./methods/depth.coffee"),
    "dev":       require("./methods/dev.coffee"),
    "draw":      require("./methods/draw.js"),
    "focus":     require("./methods/focus.coffee"),
    "font":      require("./methods/font.coffee"),
    "format":    require("./methods/format.coffee"),
    "height":    require("./methods/height.coffee"),
    "history":   require("./methods/history.coffee"),
    "hover":     require("./methods/hover.coffee"),
    "icon":      require("./methods/icon.coffee"),
    "id":        require("./methods/id.coffee"),
    "keywords":  require("./methods/keywords.coffee"),
    "margin":    require("./methods/margin.coffee"),
    "open":      require("./methods/open.coffee"),
    "order":     require("./methods/order.coffee"),
    "remove":    require("./methods/remove.coffee"),
    "search":    require("./methods/search.coffee"),
    "select":    require("./methods/select.coffee"),
    "selectAll": require("./methods/selectAll.coffee"),
    "text":      require("./methods/text.coffee"),
    "timing":    require("./methods/timing.coffee"),
    "title":     require("./methods/title.coffee"),
    "type":      require("./methods/type.coffee"),
    "ui":        require("./methods/ui.coffee"),
    "width":     require("./methods/width.coffee")
  });

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Finally, return the main UI function to the user
  //----------------------------------------------------------------------------
  return vars.self;

};

},{"../array/sort.coffee":37,"../client/ie.js":40,"../core/console/print.coffee":54,"../core/data/format.js":58,"../core/data/keys.coffee":60,"../core/data/load.coffee":61,"../core/fetch/data.js":66,"../core/methods/attach.coffee":76,"../core/methods/reset.coffee":89,"./methods/active.coffee":100,"./methods/alt.coffee":101,"./methods/color.coffee":102,"./methods/config.coffee":103,"./methods/container.coffee":104,"./methods/data.js":105,"./methods/depth.coffee":106,"./methods/dev.coffee":107,"./methods/draw.js":108,"./methods/focus.coffee":109,"./methods/font.coffee":110,"./methods/format.coffee":111,"./methods/height.coffee":112,"./methods/history.coffee":113,"./methods/hover.coffee":114,"./methods/icon.coffee":115,"./methods/id.coffee":116,"./methods/keywords.coffee":117,"./methods/margin.coffee":118,"./methods/open.coffee":119,"./methods/order.coffee":120,"./methods/remove.coffee":121,"./methods/search.coffee":122,"./methods/select.coffee":123,"./methods/selectAll.coffee":124,"./methods/text.coffee":125,"./methods/timing.coffee":126,"./methods/title.coffee":127,"./methods/type.coffee":128,"./methods/ui.coffee":129,"./methods/width.coffee":130,"./types/auto.js":131,"./types/button/button.coffee":132,"./types/drop/drop.coffee":137,"./types/toggle.js":154}],100:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [false, Array, Function, Number, String],
  value: false
};



},{"../../core/methods/filter.coffee":77}],101:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [false, Array, Function, Object, String],
  mute: filter(true),
  solo: filter(true),
  value: "alt"
};



},{"../../core/methods/filter.coffee":77}],102:[function(require,module,exports){
module.exports = {
  accepted: [String],
  value: "color"
};



},{}],103:[function(require,module,exports){
module.exports = {
  accepted: [Object],
  objectAccess: false,
  process: function(value, vars) {
    var method, setting;
    for (method in value) {
      setting = value[method];
      if (method in vars.self) {
        vars.self[method](setting);
      }
    }
    return value;
  },
  value: {}
};



},{}],104:[function(require,module,exports){
var d3selection;

d3selection = require("../../util/d3selection.coffee");

module.exports = {
  accepted: [false, Array, Object, String],
  element: false,
  id: "default",
  process: function(value) {
    if (value === false) {
      return d3.select("body");
    } else if (d3selection(value)) {
      return value;
    } else if (value instanceof Array) {
      return d3.select(value[0][0]);
    } else {
      return d3.select(value);
    }
  },
  value: d3.select("body")
};



},{"../../util/d3selection.coffee":202}],105:[function(require,module,exports){
var d3selection = require("../../util/d3selection.coffee"),
    process = require("../../core/methods/process/data.coffee");

module.exports = {
  "accepted" : [ false , Array , Function , String ],
  "delimiter" : {
    "accepted" : [ String ],
    "value"    : "|"
  },
  "element": {
    "process": function(value, vars) {

      var element = false;

      if ( d3selection(value) ) {
        element = value;
      }
      else if (typeof value === "string" && !d3.select(value).empty()) {
        element = d3.select(value);
      }

      if (element) {
        vars.self.container(d3.select(element.node().parentNode));
      }

      return element;

    },
    "value": false
  },
  "filetype" : {
    "accepted" : [false, "json", "xml", "html", "csv", "dsv", "tsv", "txt"],
    "value"    : false
  },
  "filters"  : [],
  "large": 400,
  "mute"     : [],
  "process"  : function(value, vars) {

    if ( vars.container.id === "default" && value.length ) {
      vars.self.container({"id": "default"+value.length});
    }

    return process(value, vars, this);
  },
  "solo"     : [],
  "sort": {
    "accepted": [Boolean],
    "value":    false
  },
  "value"    : false
};

},{"../../core/methods/process/data.coffee":83,"../../util/d3selection.coffee":202}],106:[function(require,module,exports){
module.exports = {
  accepted: [Number],
  value: 0
};



},{}],107:[function(require,module,exports){
module.exports = {
  accepted: [Boolean],
  value: false
};



},{}],108:[function(require,module,exports){
var d3selection  = require("../../util/d3selection.coffee"),
    parseElement = require("../../core/parse/element.js"),
    print        = require("../../core/console/print.coffee"),
    stringFormat = require("../../string/format.js")

module.exports = {
  "accepted" : [ undefined , Function ],
  "first"    : true,
  "frozen"   : false,
  "process"  : function (value, vars) {

    if ( this.initialized === false ) {
      this.initialized = true
      return value
    }

    if (vars.data.value && (!(vars.data.value instanceof Array) || d3selection(vars.data.value))) {
      vars.data.value = parseElement( vars )
    }

    if ( value === undefined && typeof this.value === "function" ) {
      value = this.value
    }

    if ( vars.container.value === false ) {

      var str = vars.format.locale.value.dev.setContainer
      print.warning( str , "container" )

    }
    else if ( vars.container.value.empty() ) {

      var str = vars.format.locale.value.dev.noContainer
      print.warning( stringFormat(str,"\""+vars.container.value+"\"") , "container" )

    }
    else {

      if (vars.dev.value) print.time("total draw time");

      vars.container.value.call(vars.self);

    }

    if ( typeof value === "function" && vars.history.chain.length ) {

      var changesObject = {}
      changes.forEach(function(c){
        var method = c.method
        delete c.method
        changesObject[method] = c
      })

      value(changesObject)

      vars.history.chain = []

    }

    return value

  },
  "update"   : true,
  "value"    : undefined
}

},{"../../core/console/print.coffee":54,"../../core/parse/element.js":92,"../../string/format.js":167,"../../util/d3selection.coffee":202}],109:[function(require,module,exports){
module.exports = {
  accepted: [false, Number, String],
  deprecates: "highlight",
  process: function(value, vars) {
    var d, element, elementTag, elementType, i, j, k, len, len1, ref;
    element = vars.data.element.value;
    if (element && ["string", "number"].indexOf(typeof value) >= 0) {
      elementTag = element.node().tagName.toLowerCase();
      elementType = element.attr("type");
      if (elementTag === "select") {
        ref = element.selectAll("option");
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          d = ref[i];
          if (d && d[vars.id.value] === value) {
            element.node().selectedIndex = i;
          }
        }
      } else if (elementTag === "input" && elementType === "radio") {
        for (k = 0, len1 = element.length; k < len1; k++) {
          d = element[k];
          this.checked = d && d[vars.id.value] === value;
        }
      }
    }
    return value;
  },
  value: false
};



},{}],110:[function(require,module,exports){
var align, decoration, family, transform;

family = require("../../core/methods/font/family.coffee");

align = require("../../core/methods/font/align.coffee");

decoration = require("../../core/methods/font/decoration.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  align: align(),
  color: "#444444",
  decoration: decoration(),
  family: family(),
  secondary: {
    align: align(),
    color: "#444444",
    decoration: decoration(),
    family: family(),
    size: 12,
    spacing: 0,
    transform: transform(),
    weight: 200
  },
  size: 12,
  spacing: 0,
  transform: transform(),
  weight: 200
};



},{"../../core/methods/font/align.coffee":78,"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82}],111:[function(require,module,exports){
var formatNumber, locale, mergeObject, titleCase;

formatNumber = require("../../number/format.coffee");

locale = require("../../core/locale/locale.coffee");

mergeObject = require("../../object/merge.coffee");

titleCase = require("../../string/title.coffee");

module.exports = {
  accepted: [Function, String],
  affixes: {
    accepted: [Object],
    objectAccess: false,
    value: {}
  },
  deprecates: ["number_format", "text_format"],
  locale: {
    accepted: function() {
      return d3.keys(locale);
    },
    process: function(value) {
      var defaultLocale, returnObject;
      defaultLocale = "en_US";
      returnObject = locale[defaultLocale];
      if (value !== defaultLocale) {
        returnObject = mergeObject(returnObject, locale[value]);
      }
      this.language = value;
      return returnObject;
    },
    value: "en_US"
  },
  number: {
    accepted: [false, Function],
    value: false
  },
  process: function(value, vars) {
    if (typeof value === "string") {
      vars.self.format({
        locale: value
      });
    } else {
      if (typeof value === "function") {
        return value;
      }
    }
    return this.value;
  },
  text: {
    accepted: [false, Function],
    value: false
  },
  value: function(value, opts) {
    var f, v, vars;
    if (!opts) {
      opts = {};
    }
    vars = opts.vars || {};
    if (vars.time && vars.time.value && opts.key === vars.time.value) {
      v = value.constructor === Date ? value : new Date(value);
      return vars.data.time.format(v);
    } else if (typeof value === "number") {
      f = this.number.value || formatNumber;
      return f(value, opts);
    } else if (typeof value === "string") {
      f = this.text.value || titleCase;
      return f(value, opts);
    } else {
      return JSON.stringify(value);
    }
  }
};



},{"../../core/locale/locale.coffee":75,"../../number/format.coffee":164,"../../object/merge.coffee":165,"../../string/title.coffee":170}],112:[function(require,module,exports){
module.exports = {
  accepted: [false, Number],
  max: 600,
  secondary: false,
  value: false
};



},{}],113:[function(require,module,exports){
module.exports = {
  back: function() {
    if (this.states.length) {
      return this.states.pop()();
    }
  },
  chain: [],
  reset: function() {
    var results;
    results = [];
    while (this.states.length) {
      results.push(this.states.pop()());
    }
    return results;
  },
  states: []
};



},{}],114:[function(require,module,exports){
module.exports = {
  accepted: [Boolean, Number, String],
  value: false
};



},{}],115:[function(require,module,exports){
var process;

process = require("../../core/methods/process/icon.coffee");

module.exports = {
  accepted: [false, Array, Function, Object, String],
  back: {
    accepted: [false, String],
    fallback: "&#x276e;",
    opacity: 1,
    process: process,
    rotate: 0,
    value: "fa-angle-left"
  },
  button: {
    accepted: [false, String],
    fallback: false,
    opacity: 1,
    process: process,
    rotate: 0,
    value: false
  },
  drop: {
    accepted: [false, String],
    fallback: "&#x276f;",
    opacity: 1,
    process: process,
    rotate: 0,
    value: "fa-angle-down"
  },
  next: {
    accepted: [false, String],
    fallback: "&#x276f;",
    opacity: 1,
    process: process,
    rotate: 0,
    value: "fa-angle-right"
  },
  select: {
    accepted: [false, String],
    fallback: "&#x2713;",
    opacity: 1,
    process: process,
    rotate: 0,
    value: "fa-check"
  },
  style: {
    accepted: [Object, String],
    value: "default"
  },
  value: "icon"
};



},{"../../core/methods/process/icon.coffee":85}],116:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [Array, String],
  dataFilter: true,
  mute: filter(true),
  nesting: ["value"],
  solo: filter(true),
  value: "value"
};



},{"../../core/methods/filter.coffee":77}],117:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [false, Array, Function, Object, String],
  mute: filter(true),
  solo: filter(true),
  value: "keywords"
};



},{"../../core/methods/filter.coffee":77}],118:[function(require,module,exports){
var process;

process = require("../../core/methods/process/margin.coffee");

module.exports = {
  accepted: [Number, Object, String],
  process: function(value) {
    var userValue;
    if (value === void 0) {
      value = this.value;
    }
    userValue = value;
    process(value, this);
    return userValue;
  },
  value: 0
};



},{"../../core/methods/process/margin.coffee":86}],119:[function(require,module,exports){
module.exports = {
  accepted: [Boolean],
  flipped: {
    accepted: [Boolean],
    value: false
  },
  value: false
};



},{}],120:[function(require,module,exports){
module.exports = {
  accepted: [false, Function, String],
  sort: {
    accepted: ["asc", "desc"],
    deprecates: ["sort"],
    value: "asc"
  },
  value: false
};



},{}],121:[function(require,module,exports){
module.exports = {
  accepted: void 0,
  process: function(value, vars) {
    if (this.initialized) {
      vars.container.value.remove();
    }
  },
  value: void 0
};



},{}],122:[function(require,module,exports){
module.exports = {
  accepted: ["auto", Boolean],
  process: function(value) {
    if (typeof value === "Boolean") {
      this.enabled = value;
    }
    return value;
  },
  term: "",
  value: "auto"
};



},{}],123:[function(require,module,exports){
module.exports = {
  accepted: [String],
  chainable: false,
  process: function(value, vars) {
    var container;
    container = vars.container.value;
    if (container && value) {
      return container.select(value);
    } else {
      return value;
    }
  },
  value: void 0
};



},{}],124:[function(require,module,exports){
module.exports = {
  accepted: [String],
  chainable: false,
  process: function(value, vars) {
    var container;
    container = vars.container.value;
    if (container && value) {
      return container.selectAll(value);
    } else {
      return value;
    }
  },
  value: void 0
};



},{}],125:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [false, String],
  nesting: true,
  mute: filter(true),
  solo: filter(true),
  secondary: {
    accepted: [false, String],
    nesting: true,
    value: false
  },
  value: false
};



},{"../../core/methods/filter.coffee":77}],126:[function(require,module,exports){
module.exports = {
  mouseevents: 60,
  ui: 200
};



},{}],127:[function(require,module,exports){
var decoration, family, stringStrip, transform;

decoration = require("../../core/methods/font/decoration.coffee");

family = require("../../core/methods/font/family.coffee");

transform = require("../../core/methods/font/transform.coffee");

stringStrip = require("../../string/strip.js");

module.exports = {
  accepted: [false, Function, String],
  font: {
    align: "center",
    color: "#444444",
    decoration: decoration(),
    family: family(),
    size: 16,
    transform: transform(),
    weight: 400
  },
  link: false,
  process: function(value, vars) {
    var id;
    if (vars.container.id.indexOf("default") === 0 && value) {
      id = stringStrip(value).toLowerCase();
      vars.self.container({
        id: id
      });
    }
    return value;
  },
  value: false
};



},{"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82,"../../string/strip.js":169}],128:[function(require,module,exports){
module.exports = {
  accepted: function(vars) {
    return d3.keys(vars.types);
  },
  value: "auto"
};



},{}],129:[function(require,module,exports){
var align, decoration, family, margin, transform;

family = require("../../core/methods/font/family.coffee");

align = require("../../core/methods/font/align.coffee");

decoration = require("../../core/methods/font/decoration.coffee");

margin = require("../../core/methods/process/margin.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  align: align("center"),
  border: 1,
  color: {
    primary: {
      process: function(value, vars) {
        var primary;
        primary = this.value;
        if (!vars.ui.color.secondary.value) {
          vars.ui.color.secondary.value = d3.rgb(primary).darker(0.75).toString();
        }
        return value;
      },
      value: "#ffffff"
    },
    secondary: {
      value: false
    }
  },
  display: {
    acceped: ["block", "inline-block"],
    value: "inline-block"
  },
  font: {
    align: align("center"),
    color: "#444",
    decoration: decoration(),
    family: family(),
    size: 11,
    transform: transform(),
    weight: 200
  },
  margin: {
    process: function(value) {
      var userValue;
      if (value === void 0) {
        value = this.value;
      }
      userValue = value;
      margin(value, this);
      return userValue;
    },
    value: 5
  },
  padding: {
    process: function(value) {
      var userValue;
      if (value === void 0) {
        value = this.value;
      }
      userValue = value;
      margin(value, this);
      return userValue;
    },
    value: 5
  }
};



},{"../../core/methods/font/align.coffee":78,"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82,"../../core/methods/process/margin.coffee":86}],130:[function(require,module,exports){
module.exports = {
  accepted: [false, Number],
  secondary: false,
  value: false
};



},{}],131:[function(require,module,exports){
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Determines form type based on data length.
//------------------------------------------------------------------------------
module.exports = function( vars ) {

  var dataLength = vars.data.value.length

  if ( dataLength === 1 ) {
    vars.self.type("button").draw()
  }
  else if ( dataLength < 5 ) {
    vars.self.type("toggle").draw()
  }
  else {
    vars.self.type("drop").draw()
  }

}

},{}],132:[function(require,module,exports){
module.exports = function(vars) {
  var button, checks, color, icons, mouseevents, print, style, updatedButtons;
  print = require("../../../core/console/print.coffee");
  color = require("./functions/color.coffee");
  icons = require("./functions/icons.js");
  mouseevents = require("./functions/mouseevents.coffee");
  style = require("./functions/style.js");
  button = vars.container.ui.selectAll('div.d3plus_node').data(vars.data.viz, function(d) {
    return d[vars.id.value];
  });
  if (vars.dev.value) {
    print.time("enter");
  }
  button.enter().append("div").attr("class", "d3plus_node").call(color, vars).call(style, vars).call(icons, vars).call(mouseevents, vars);
  if (vars.dev.value) {
    print.timeEnd("enter");
  }
  if (vars.draw.update || vars.draw.timing) {
    if (vars.dev.value) {
      print.time("ordering");
    }
    button.order();
    if (vars.dev.value) {
      print.timeEnd("ordering");
    }
    updatedButtons = button;
  } else {
    checks = [vars.focus.previous, vars.focus.value, vars.hover.previous, vars.hover.value].filter(function(c) {
      return c;
    });
    updatedButtons = button.filter(function(b) {
      return checks.indexOf(b[vars.id.value]) >= 0;
    });
  }
  if (vars.dev.value) {
    print.time("update");
  }
  if (vars.draw.timing) {
    updatedButtons.transition().duration(vars.draw.timing).call(color, vars).call(style, vars);
  } else {
    updatedButtons.call(color, vars).call(style, vars);
  }
  updatedButtons.call(icons, vars).call(mouseevents, vars);
  if (vars.dev.value) {
    print.timeEnd("update");
  }
  return button.exit().remove();
};



},{"../../../core/console/print.coffee":54,"./functions/color.coffee":133,"./functions/icons.js":134,"./functions/mouseevents.coffee":135,"./functions/style.js":136}],133:[function(require,module,exports){
module.exports = function(elem, vars) {
  var legible, lighter, textColor;
  legible = require("../../../../color/legible.coffee");
  lighter = require("../../../../color/lighter.coffee");
  textColor = require("../../../../color/text.coffee");
  return elem.style("background-color", function(d) {
    var color;
    if (vars.focus.value === d[vars.id.value]) {
      color = vars.ui.color.secondary.value;
    } else {
      color = vars.ui.color.primary.value;
    }
    if (vars.hover.value === d[vars.id.value]) {
      color = d3.rgb(color).darker(0.15).toString();
    }
    return color;
  }).style("color", function(d) {
    var color, image, opacity;
    if (vars.focus.value === d[vars.id.value]) {
      opacity = 0.75;
    } else {
      opacity = 1;
    }
    image = d[vars.icon.value] && vars.data.viz.length < vars.data.large;
    if (!image && d[vars.color.value]) {
      color = legible(d[vars.color.value]);
    } else {
      color = textColor(d3.select(this).style("background-color"));
    }
    color = d3.rgb(color);
    return "rgba(" + color.r + "," + color.g + "," + color.b + "," + opacity + ")";
  }).style('border-color', vars.ui.color.secondary.value);
};



},{"../../../../color/legible.coffee":46,"../../../../color/lighter.coffee":47,"../../../../color/text.coffee":52}],134:[function(require,module,exports){
var prefix = require("../../../../client/prefix.coffee"),
    rtl = require("../../../../client/rtl.coffee")

module.exports = function ( elem , vars ) {

  var reversed = (vars.font.align.value === "right" && !rtl)
                 || (rtl && vars.font.align.value === "right")

  elem
    .each(function(d,i){

      var children = ["label"]

      if ( d[vars.icon.value] && vars.data.viz.length <= vars.data.large ) {
        children.push("icon")
      }

      var iconGraphic = vars.icon.button.value
      if ( d[vars.id.value] === vars.focus.value && vars.icon.select.value ) {
        iconGraphic = vars.icon.select.value
        children.push("selected")
      }
      else if ( iconGraphic && d.d3plus.icon !== false ) {
        children.push("selected")
      }

      var buffer = 0

      var items = d3.select(this).selectAll("div.d3plus_button_element")
        .data(children,function(c){
          return c
        })

      items.enter().append("div")
        .style("display",function(c){
          return c === "label" ? "block" : "absolute"
        })

      items.order()
        .attr("class",function(c){
          var extra = ""
          if ( c === "selected" && iconGraphic.indexOf("fa-") === 0 ) {
            extra = " fa "+iconGraphic
          }
          return "d3plus_button_element d3plus_button_" + c + extra
        })
        .html(function(c){
          if ( c === "label" ) {
            var k = vars.text.value && vars.text.value in d && !(d[vars.text.value] instanceof Array)
                  ? vars.text.value : vars.id.value
            return vars.format.value(d[k])
          }
          return c === "selected" && iconGraphic.indexOf("fa-") < 0
                 ? iconGraphic : ""
        })
        .style("background-image",function(c){
          if (c === "icon") {
            return "url('"+d[vars.icon.value]+"')"
          }
          return "none"
        })
        .style("background-color",function(c){
          if (c === "icon" && d.style === "knockout") {
            return d[vars.color.value] || vars.ui.color.primary.value
          }
          return "transparent"
        })
        .style("background-size","100%")
        .style("text-align",function(c){
          return c === "label" ? vars.font.align.value : "center"
        })
        .style("position",function(c){
          return c == "label" ? "static" : "absolute"
        })
        .style("width",function(c){

          if ( c === "label" ) {
            return "auto"
          }

          if (vars.height.value) {
            buffer = (vars.height.value-(vars.ui.padding.top + vars.ui.padding.bottom)-(vars.ui.border*2));
          }
          else {
            buffer = vars.font.size+vars.ui.border;
          }
          return buffer+"px"
        })
        .style("height",function(c){
          if ( c === "icon" ) {
            return buffer+"px"
          }
          return "auto"
        })
        .style("margin-top",function(c){
          if ( c === "label" ) {
            return "0px"
          }
          if (this.offsetHeight || this.getBoundingClientRect().height) {
            var h = this.offsetHeight || this.getBoundingClientRect().height
          }
          else if ( c === "selected" ) {
            var h = vars.font.size
          }
          else {
            var h = buffer
          }
          return -h/2+"px"
        })
        .style("top",function(c){
          return c === "label" ? "auto" : "50%"
        })
        .style("left",function(c){
          if ((c === "icon" && !reversed) || (c === "selected" && reversed)) {
            return vars.ui.padding.left+"px"
          }
          return "auto"
        })
        .style("right",function(c){
          if ((c === "icon" && reversed) || (c === "selected" && !reversed)) {
            return vars.ui.padding.right+"px"
          }
          return "auto"
        })
        .style(prefix()+"transition",function(c){
          return c === "selected" ? (vars.draw.timing/1000)+"s" : "none"
        })
        .style(prefix()+"transform",function(c){
          var degree = c === "selected" ? vars.icon.select.rotate : "none"
          return typeof degree === "string" ? degree : "rotate("+degree+"deg)"
        })
        .style("opacity",function(c){
          return c === "selected" ? vars.icon.select.opacity : 1
        })

      items.exit().remove()

      var text = d3.select(this).selectAll(".d3plus_button_label")

      if (buffer > 0) {

        var p = vars.ui.padding;

        if (children.length === 3) {
          p = p.top+"px "+(p.right*2+buffer)+"px "+p.bottom+"px "+(p.left*2+buffer)+"px";
        }
        else if ((children.indexOf("icon") >= 0 && !rtl) || (children.indexOf("selected") >= 0 && rtl)) {
          p = p.top+"px "+p.right+"px "+p.bottom+"px "+(p.left*2+buffer)+"px";
        }
        else {
          p = p.top+"px "+(p.right*2+buffer)+"px "+p.bottom+"px "+p.left+"px";
        }

        text.style("padding", p)

      }
      else {
        text.style("padding",vars.ui.padding.css)
      }

      if (typeof vars.width.value === "number") {
        var width = vars.width.value
        width -= parseFloat(text.style("padding-left"),10)
        width -= parseFloat(text.style("padding-right"),10)
        width -= vars.ui.border*2
        width += "px"
      }
      else {
        var width = "auto"
      }

      text.style("width",width)

    })

}

},{"../../../../client/prefix.coffee":42,"../../../../client/rtl.coffee":43}],135:[function(require,module,exports){
module.exports = function(elem, vars, color) {
  var events, ie;
  color = require("./color.coffee");
  events = require("../../../../client/pointer.coffee");
  ie = require("../../../../client/ie.js");
  return elem.on(events.over, function(d, i) {
    vars.self.hover(d[vars.id.value]);
    if (ie || !vars.draw.timing) {
      return d3.select(this).style("cursor", "pointer").call(color, vars);
    } else {
      return d3.select(this).style("cursor", "pointer").transition().duration(vars.timing.mouseevents).call(color, vars);
    }
  }).on(events.out, function(d) {
    vars.self.hover(false);
    if (ie || !vars.draw.timing) {
      return d3.select(this).style("cursor", "auto").call(color, vars);
    } else {
      return d3.select(this).style("cursor", "auto").transition().duration(vars.timing.mouseevents).call(color, vars);
    }
  }).on(events.click, function(d) {
    return vars.self.focus(d[vars.id.value]).draw();
  });
};



},{"../../../../client/ie.js":40,"../../../../client/pointer.coffee":41,"./color.coffee":133}],136:[function(require,module,exports){
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//------------------------------------------------------------------------------
module.exports = function ( elem , vars ) {

  elem
    .style("position","relative")
    .style("margin",vars.ui.margin.css)
    .style("display",vars.ui.display.value)
    .style("border-style","solid")
    .style("border-width",vars.ui.border+"px")
    .style("font-family",vars.font.family.value)
    .style("font-size",vars.font.size+"px")
    .style("font-weight",vars.font.weight)
    .style("letter-spacing",vars.font.spacing+"px")

}

},{}],137:[function(require,module,exports){
module.exports = function(vars) {
  var button, data, element, keyboard, list, search, selector, title, update, width, windowevent;
  element = require("./functions/element.coffee");
  keyboard = require("./functions/keyboard.coffee");
  windowevent = require("./functions/window.js");
  width = require("./functions/width.js");
  button = require("./functions/button.js");
  selector = require("./functions/selector.js");
  title = require("./functions/title.js");
  search = require("./functions/search.js");
  list = require("./functions/list.js");
  data = require("./functions/data.js");
  update = require("./functions/update.js");
  vars.margin.top = 0;
  vars.margin.title = 0;
  element(vars);
  keyboard(vars);
  windowevent(vars);
  width(vars);
  button(vars);
  selector(vars);
  title(vars);
  search(vars);
  list(vars);
  data(vars);
  return update(vars);
};



},{"./functions/button.js":140,"./functions/data.js":141,"./functions/element.coffee":142,"./functions/keyboard.coffee":145,"./functions/list.js":146,"./functions/search.js":148,"./functions/selector.js":149,"./functions/title.js":150,"./functions/update.js":151,"./functions/width.js":152,"./functions/window.js":153}],138:[function(require,module,exports){
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Checks to see if a given variable is allowed to be selected.
//------------------------------------------------------------------------------
module.exports = function ( vars , value , active ) {

  var ret = []
    , active = active || vars.active.value

  if ( active instanceof Array ) {

    for (var i = 0; i < active.length; i++) {
      ret.push(this(vars,value,active[i]))
    }

  }
  else {

    var t = typeof active

    if (t === "number") {
      ret.push(vars.depth.value === active)
    }
    else if (t === "function") {
      ret.push(active(value))
    }
    else {
      ret.push(value === active)
    }

  }

  return ret.indexOf(true) >= 0

}

},{}],139:[function(require,module,exports){
var print = require("../../../../core/console/print.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Toggles the state of the dropdown menu.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  if ( vars.dev.value ) print.time("rotating arrow")

  var offset = vars.icon.drop.value === "&#x276f;" ? 90 : 0

  if (vars.open.value != vars.open.flipped.value) {
    var rotate = 180 + offset
  }
  else {
    var rotate = offset
  }

  vars.container.button
    .icon({
      "select": {
        "opacity": vars.open.value ? 0.5 : 1,
        "rotate": rotate
      }
    })
    .draw()

  if ( vars.dev.value ) print.timeEnd("rotating arrow")

}

},{"../../../../core/console/print.coffee":54}],140:[function(require,module,exports){
var copy = require("../../../../util/copy.coffee"),
    events = require("../../../../client/pointer.coffee"),
    form   = require("../../../form.js"),
    print  = require("../../../../core/console/print.coffee")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and styles the main drop button.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  if ( !("button" in vars.container) ) {

    if ( vars.dev.value ) print.time("creating main button")

    vars.container.button = form()
      .container(vars.container.ui)
      .type("button")
      .ui({
        "margin": 0
      })

    if ( vars.dev.value ) print.timeEnd("creating main button")

  }

  if ( vars.focus.changed || vars.data.changed || vars.depth.changed ) {

    var depth = vars.depth.value

    var buttonData = copy(vars.data.value.filter(function(d){
      var match = false
      for ( var i = 0 ; i < vars.id.nesting.length ; i++ ) {
        var level = vars.id.nesting[i]
        match = level in d && d[level] === vars.focus.value
        if (match) {
          depth = i
          break
        }
      }
      return match
    })[0])

    if ( !buttonData ) {
      buttonData = vars.container.button.data()[0] || vars.data.viz[0]
    }

    vars.container.button
      .data([buttonData])
      .id( vars.id.nesting )
      .depth(depth)

  }

  var hover = vars.hover.value === true ? vars.focus.value : false;

  vars.container.button
    .draw({
      "update": vars.draw.update
    })
    .focus("")
    .font( vars.font )
    .hover(hover)
    .icon({
      "button": vars.icon.drop.value,
      "select": vars.icon.drop.value,
      "value": vars.icon.value
    })
    .text( vars.text.value )
    .timing({
      "ui": vars.draw.timing
    })
    .ui({
      "color": vars.ui.color,
      "padding": vars.ui.padding.css
    })
    .width(vars.width.value)
    .draw()

  var button = vars.container.button.container(Object).ui

  vars.margin.top += button.node().offsetHeight || button.node().getBoundingClientRect().height

  button.on(events.click,function(){
    vars.self.open(!vars.open.value).draw()
  })

}

},{"../../../../client/pointer.coffee":41,"../../../../core/console/print.coffee":54,"../../../../util/copy.coffee":201,"../../../form.js":99}],141:[function(require,module,exports){
var stringFormat = require("../../../../string/format.js"),
    stringStrip = require("../../../../string/strip.js");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and populates the dropdown list of items.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  if ( vars.data.url && !vars.data.loaded ) {
    var loadingObject = {};
    loadingObject[vars.text.value || vars.id.value] = vars.format.value(vars.format.locale.value.ui.loading);
    vars.data.filtered = [loadingObject];
    vars.data.changed = vars.data.lastFilter !== "loading";
    vars.data.lastFilter = "loading";
  }
  else if (vars.open.value) {

    if (!vars.search.term) {
      vars.data.filtered = vars.data.viz;
      vars.data.changed = vars.data.lastFilter !== "viz";
      vars.data.lastFilter = "viz";
      if (vars.id.nesting.length > 1 && vars.depth.value < vars.id.nesting.length-1) {
        vars.data.filtered = vars.data.filtered.filter(function(d){
          if ("endPoint" in d.d3plus && d.d3plus.endPoint === vars.depth.value) {
            d.d3plus.icon = false;
          }
          return true;
        });
        vars.data.changed = vars.data.lastFilter !== "depth";
        vars.data.lastFilter = "depth";
      }
    }
    else {

      var searchWords = stringStrip(vars.search.term).split("_"),
          searchKeys  = [vars.id.value, vars.text.value, vars.alt.value, vars.keywords.value ];

      searchKeys = searchKeys.filter(function(t){ return t; });
      searchWords = searchWords.filter(function(t){ return t !== ""; });

      var startMatches = [],
          exactMatches = [],
          softMatches  = [],
          searchData   = [];

      vars.id.nesting.forEach(function(n){
        searchData = searchData.concat(vars.data.nested.all[n]);
      });

      searchData.forEach(function(d){

        var match = false;

        searchKeys.forEach(function(key){

          if ( !match && key in d && typeof d[key] === "string" ) {

            var text = d[key].toLowerCase();

            if ( [vars.text.value,vars.id.value].indexOf(key) >= 0 && text.indexOf(vars.search.term) === 0 ) {
              startMatches.push(d);
              match = true;
            }
            else if ( text.indexOf(vars.search.term) >= 0 ) {
              exactMatches.push(d);
              match = true;
            }
            else {

              var texts = stringStrip(text).split("_");

              for (var t in texts) {

                if ( !match ) {

                  for (var s in searchWords) {
                    if (texts[t].indexOf(searchWords[s]) === 0) {
                      softMatches.push(d);
                      match = true;
                      break;
                    }
                  }

                }
                else {
                  break;
                }

              }

            }
          }

        });

      });

      vars.data.filtered = d3.merge([ startMatches , exactMatches , softMatches ]);

      vars.data.filtered.forEach(function(d,i){
        d.d3plus_order = i;
      });

      vars.data.changed = true;
      vars.data.lastFilter = "search";

      if ( vars.data.filtered.length === 0 ) {

        var noData = {}, str = vars.format.value(vars.format.locale.value.ui.noResults);
        noData[vars.text.value || vars.id.value] = stringFormat(str,"\""+vars.search.term+"\"");
        vars.data.filtered = [ noData ];

      }

    }

  }
  else {
    vars.data.filtered = [];
  }

};

},{"../../../../string/format.js":167,"../../../../string/strip.js":169}],142:[function(require,module,exports){
module.exports = function(vars) {
  if (vars.data.element.value) {
    vars.data.element.value.on("focus." + vars.container.id, function() {
      return vars.self.hover(true).draw();
    });
    vars.data.element.value.on("blur." + vars.container.id, function() {
      var search;
      if (vars.search.enabled) {
        search = d3.event.relatedTarget !== vars.container.value.select('input').node();
      } else {
        search = true;
      }
      if (search) {
        return vars.self.open(false).hover(false).draw();
      }
    });
    vars.data.element.value.on("change." + vars.container.id, function() {
      return vars.self.focus(this.value).draw();
    });
    return vars.data.element.value.on("keydown.cancel_" + vars.container.id, function() {
      if (d3.event.keyCode !== 9) {
        return d3.event.preventDefault();
      }
    });
  }
};



},{}],143:[function(require,module,exports){
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculates the height and orientation of the dropdown list, based on
// available screen space.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  var height = vars.height.secondary,
      button = vars.container.button.container().node().getBoundingClientRect(),
      available = window.innerHeight - button.bottom - vars.ui.border * 2 -
                  vars.ui.margin.top - vars.ui.margin.bottom -
                  vars.ui.padding.top - vars.ui.padding.bottom;

  if (available < button.height * 3) {
    available = button.top-10;
    vars.self.open({"flipped": true});
  }
  // else {
  //   vars.self.open({"flipped": false});
  // }

  if (typeof height !== "number") {
    height = available;
  }

  if (height > vars.height.max) {
    height = vars.height.max;
  }

  vars.self.height({"secondary": height});

};

},{}],144:[function(require,module,exports){
var active, copy, form, print;

active = require("./active.js");

copy = require("../../../../util/copy.coffee");

form = require("../../../form.js");

print = require("../../../../core/console/print.coffee");

module.exports = function(vars) {
  var deepest, large, order;
  if (vars.open.value) {
    if (vars.dev.value) {
      print.time("updating list items");
    }
    if (!("items" in vars.container)) {
      vars.container.items = form().container(vars.container.list).type("button").ui({
        border: 0,
        display: "block",
        margin: 0
      }).width(false);
    }
    large = vars.draw.timing ? vars.data.large : 1;
    order = copy(vars.order);
    order.value = vars.search.term.length ? "d3plus_order" : vars.order.value;
    deepest = vars.depth.value === vars.id.nesting.length - 1;
    if (vars.focus.changed || vars.container.items.focus() === false) {
      vars.container.items.focus(vars.focus.value, function(value) {
        var change, data, depth, solo;
        data = vars.data.filtered.filter(function(f) {
          return f[vars.id.value] === value;
        })[0];
        if (vars.depth.value < vars.id.nesting.length - 1 && vars.id.nesting[vars.depth.value + 1] in data) {
          depth = vars.depth.value;
          solo = vars.id.solo.value;
          vars.history.states.push(function() {
            return vars.self.depth(depth).id({
              solo: solo
            }).draw();
          });
          vars.self.depth(vars.depth.value + 1).id({
            solo: [value]
          }).draw();
        } else {
          if (!vars.depth.changed) {
            vars.self.open(false);
          }
          change = value !== vars.focus.value;
          if (change && vars.active.value) {
            change = active(vars, value);
          }
          if (change) {
            vars.self.focus(value).draw();
          }
        }
      });
    }
    if (vars.data.changed) {
      vars.container.items.data({
        large: large,
        value: vars.data.filtered
      });
    }
    vars.container.items.active(vars.active.value).data({
      "sort": vars.data.sort.value
    }).draw({
      update: vars.draw.update
    }).font(vars.font.secondary).hover(vars.hover.value).id(vars.id.value).icon({
      button: (deepest ? false : vars.icon.next),
      select: (deepest ? vars.icon.select : false),
      value: vars.icon.value
    }).order(order).text(vars.text.secondary.value || vars.text.value).timing({
      ui: vars.draw.timing
    }).ui({
      color: {
        primary: (vars.id.nesting.length === 1 ? vars.ui.color.primary.value : vars.ui.color.secondary.value),
        secondary: vars.ui.color.secondary.value
      },
      padding: vars.ui.padding.css
    }).draw();
    if (vars.dev.value) {
      print.timeEnd("updating list items");
    }
  }
};



},{"../../../../core/console/print.coffee":54,"../../../../util/copy.coffee":201,"../../../form.js":99,"./active.js":138}],145:[function(require,module,exports){
module.exports = function(vars) {
  return d3.select(window).on("keydown." + vars.container.id, function() {
    var d, data, depth, hist, hover, i, index, j, key, len, matchKey, ref, solo;
    key = d3.event.keyCode;
    if (vars.open.value || vars.hover.value === true) {
      matchKey = vars.hover.value === true ? "focus" : "hover";
      index = false;
      ref = vars.data.filtered;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        d = ref[i];
        if (d[vars.id.value] === vars[matchKey].value) {
          index = i;
          break;
        }
      }
      if (key === 9 && vars.open.value && (!vars.search.enabled || (vars.search.enabled && !d3.event.shiftKey))) {
        return vars.self.open(false).hover(false).draw();
      } else if ([38, 40].indexOf(key) >= 0) {
        if (index === false) {
          index = 0;
        } else if (key === 38) {
          if (vars.open.value) {
            if (index <= 0) {
              index = vars.data.filtered.length - 1;
            } else {
              index -= 1;
            }
          }
        } else if (key === 40) {
          if (vars.open.value) {
            if (index >= vars.data.filtered.length - 1) {
              index = 0;
            } else {
              index += 1;
            }
          }
        }
        if (typeof vars.hover.value !== "boolean") {
          hover = vars.data.filtered[index][vars.id.value];
        } else {
          hover = vars.focus.value;
        }
        return vars.self.hover(hover).open(true).draw();
      } else if (key === 13) {
        if (typeof vars.hover.value !== "boolean") {
          data = vars.data.filtered.filter(function(f) {
            return f[vars.id.value] === vars.hover.value;
          })[0];
          depth = vars.depth.value;
          if (depth < vars.id.nesting.length - 1 && vars.id.nesting[depth + 1] in data) {
            solo = vars.id.solo.value;
            hist = function() {
              return vars.self.depth(depth).id({
                solo: solo
              }).draw();
            };
            vars.history.states.push(hist);
            return vars.self.depth(vars.depth.value + 1).id({
              solo: [vars.hover.value]
            }).draw();
          } else {
            return vars.self.focus(vars.hover.value).hover(true).draw();
          }
        } else {
          return vars.self.hover(vars.focus.value).open(true).draw();
        }
      } else if (key === 27) {
        if (vars.open.value) {
          return vars.self.open(false).hover(true).draw();
        } else if (vars.hover.value === true) {
          return vars.self.hover(false).draw();
        }
      }
    }
  });
};



},{}],146:[function(require,module,exports){
var print = require("../../../../core/console/print.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and populates the dropdown list of items.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  if ( vars.dev.value ) print.time("populating list")

  vars.container.list = vars.container.selector.selectAll("div.d3plus_drop_list")
    .data(["list"])

  vars.container.list.enter().append("div")
    .attr("class","d3plus_drop_list")
    .attr("id","d3plus_drop_list_"+vars.container.id)
    .style("overflow-y","auto")
    .style("overflow-x","hidden")

  if ( vars.dev.value ) print.timeEnd("populating list")

}

},{"../../../../core/console/print.coffee":54}],147:[function(require,module,exports){
var print = require("../../../../core/console/print.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculates scroll position of list.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  if (vars.open.value) {

    if ( vars.dev.value ) print.time("calculating height")

    var hidden = false
    if (vars.container.selector.style("display") == "none") {
      var hidden = true
    }

    if (hidden) vars.container.selector.style("display","block")

    var old_height = vars.container.selector.style("height"),
        old_scroll = vars.container.selector.property("scrollTop"),
        list_height = vars.container.list.style("max-height"),
        list_scroll = vars.container.list.property("scrollTop")

    vars.container.selector.style("height","auto")
    vars.container.list.style("max-height","200000px")

    vars.container.listHeight = parseFloat(vars.container.selector.style("height"),10)

    vars.container.list
      .style("max-height",list_height)
      .property("scrollTop",list_scroll)

    vars.container.selector
      .style("height",old_height)
      .property("scrollTop",old_scroll)

    var scrolling = false
    if (vars.container.listHeight > vars.height.secondary) {
      vars.container.listHeight = vars.height.secondary
      scrolling = true
    }

    if (hidden) vars.container.selector.style("display","none")

    if ( vars.dev.value ) print.timeEnd("calculating height")

    if (scrolling) {

      if ( vars.dev.value ) print.time("calculating scroll position")

      var options = vars.container.list.select("div").selectAll("div.d3plus_node")
      var option = options[0][0]
      var matchID = typeof vars.hover.value !== "boolean" ? vars.hover.value : vars.focus.value;
      options.each(function(d,i){
        if (d[vars.id.value] === matchID) {
          option = this
        }
      })

      var hidden = false
      if (vars.container.selector.style("display") === "none") {
        hidden = true
        vars.container.selector.style("display","block")
      }

      var button_top = option.offsetTop,
          button_height = option.offsetHeight || option.getBoundingClientRect().height,
          list_top = vars.container.list.property("scrollTop")

      if (hidden) vars.container.selector.style("display","none")

      if ( hidden || vars.data.changed || vars.depth.changed ) {

        vars.container.listScroll = button_top

      }
      else {

        vars.container.listScroll = list_top;

        if (button_top < list_top) {
          vars.container.listScroll = button_top
        }
        else if (button_top+button_height > list_top+vars.height.secondary-vars.search.height) {
          vars.container.listScroll = button_top - (vars.height.secondary-button_height-vars.search.height)
        }

      }

      if ( vars.dev.value ) print.timeEnd("calculating scroll position")

    }
    else {
      vars.container.listScroll = 0
    }

  }
  else {
    vars.container.listScroll = vars.container.list.property("scrollTop")
    vars.container.listHeight = 0
  }

}

},{"../../../../core/console/print.coffee":54}],148:[function(require,module,exports){
var prefix = require("../../../../client/prefix.coffee"),
    print = require("../../../../core/console/print.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and styles the search box, if enabled.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  if ( vars.dev.value ) print.time("creating search")

  var data = require("./data.js")
    , items = require("./items.coffee")
    , update = require("./update.js")

  vars.container.search = vars.container.selector.selectAll("div.d3plus_drop_search")
    .data(vars.search.enabled ? ["search"] : [])

  function searchStyle(elem) {

    elem
      .style("padding",vars.ui.padding.css)
      .style("display","block")
      .style("background-color",d3.rgb(vars.ui.color.primary.value).darker(0.15).toString())

  }

  function inputStyle(elem) {

    var width = vars.width.secondary - vars.ui.padding.left*2 - vars.ui.padding.right*2 + vars.ui.border*2

    elem
      .style("padding",vars.ui.padding.left/2+vars.ui.padding.right/2+"px")
      .style("width",width+"px")
      .style("border-width","0px")
      .style("font-family",vars.font.secondary.family.value)
      .style("font-size",vars.font.secondary.size+"px")
      .style("font-weight",vars.font.secondary.weight)
      .style("text-align",vars.font.secondary.align)
      .style("outline","none")
      .style(prefix()+"border-radius","0")
      .attr("placeholder",vars.format.value(vars.format.locale.value.method.search))

  }

  if (vars.draw.timing) {

    vars.container.search.transition().duration(vars.draw.timing)
      .call(searchStyle)

    vars.container.search.select("input").transition().duration(vars.draw.timing)
      .call(inputStyle)

  }
  else {

    vars.container.search
      .call(searchStyle)

    vars.container.search.select("input")
      .call(inputStyle)

  }

  vars.container.search.enter()
    .insert("div","#d3plus_drop_list_"+vars.container.id)
      .attr("class","d3plus_drop_search")
      .attr("id","d3plus_drop_search_"+vars.container.id)
      .call(searchStyle)
      .append("input")
        .attr("id","d3plus_drop_input_"+vars.container.id)
        .style("-webkit-appearance","none")
        .call(inputStyle)

  vars.container.search.select("input").on("keyup."+vars.container.id,function(d){
    var term = this.value;
    if (vars.search.term !== term) {
      vars.search.term = term;
      data(vars);
      items(vars);
      update(vars);
    }
  });

  vars.container.search.exit().remove()

  var oldDisplay = vars.container.selector.style("display")
  vars.container.selector.style("display", "block")
  vars.search.height = vars.search.enabled ? vars.container.search.node().offsetHeight ||
                       vars.container.search.node().getBoundingClientRect().height : 0;
  vars.container.selector.style("display", oldDisplay)

  if ( vars.search.enabled ) {
    vars.margin.title += vars.search.height
  }

  if ( vars.dev.value ) print.timeEnd("creating search")

}

},{"../../../../client/prefix.coffee":42,"../../../../core/console/print.coffee":54,"./data.js":141,"./items.coffee":144,"./update.js":151}],149:[function(require,module,exports){
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and styles the div that holds the search box and item list.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  vars.container.selector = vars.container.ui
    .selectAll("div.d3plus_drop_selector")
    .data(["selector"])

  vars.container.selector.enter().append("div")
    .attr("class","d3plus_drop_selector")
    .style("position","absolute")
    .style("top","0px")
    .style("z-index","-1")
    .style("overflow","hidden")

    vars.container.selector
      .style("padding",vars.ui.border+"px")

}

},{}],150:[function(require,module,exports){
var events = require("../../../../client/pointer.coffee"),
    lighter   = require("../../../../color/lighter.coffee"),
    print     = require("../../../../core/console/print.coffee"),
    textColor = require("../../../../color/text.coffee")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and styles the title and back button.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  if ( vars.open.value ) {

    if ( vars.dev.value ) print.time("creating title and back button")

    var self    = this
      , enabled = vars.id.solo.value.length === 1 && vars.depth.value > 0
      , title   = enabled
      , focus   = vars.container.button.data(Object).viz[0]

    title = true
    for (var i = 0; i < vars.id.nesting.length; i++) {
      var level = vars.id.nesting[i]
      if ( level in focus && focus[level] === vars.focus.value ) {
        title = false
        break;
      }
    }

    vars.container.title = vars.container.selector.selectAll("div.d3plus_drop_title")
      .data(enabled ? ["title"] : [])

    function boxStyle(elem) {

      elem
        .style("padding",vars.ui.padding.css)
        .style("display","block")
        .style("background-color",vars.ui.color.secondary.value)
        .style("font-family",vars.font.secondary.family.value)
        .style("font-size",vars.font.secondary.size+"px")
        .style("font-weight",vars.font.secondary.weight)
        .style("text-align",vars.font.secondary.align)
        .style("color",textColor(vars.ui.color.secondary.value))

    }

    function backStyle(elem) {

      if ( !elem.empty() ) {

        var className = vars.icon.back.value.indexOf("fa-") === 0 ? " fa "+vars.icon.back.value : ""
        className = "d3plus_drop_back" + className

        var text = vars.icon.back.value.indexOf("fa-") === 0 ? "" : vars.icon.back.value

        elem
          .style("position","absolute")
          .attr("class",className)
          .style("top",vars.ui.padding.top+(vars.font.secondary.size/2)/2.5+"px")
          .html(text)

      }

    }

    function titleStyle(elem) {

      var text = title ? vars.focus.value : vars.format.locale.value.ui.back

      elem
        .text(vars.format.value(text))
        .style("padding","0px "+(vars.ui.padding.left+vars.ui.padding.right)+"px")

    }

    if (vars.draw.timing) {

      vars.container.title.transition().duration(vars.draw.timing)
        .call(boxStyle)

      vars.container.title.select("div.d3plus_drop_title_text")
        .transition().duration(vars.draw.timing)
        .call(titleStyle)

    }
    else {

      vars.container.title
        .call(boxStyle)

      vars.container.title.select("div.d3plus_drop_title_text")
        .call(titleStyle)

    }

    vars.container.title.select("span.d3plus_drop_back")
      .call(backStyle)

    var enter = vars.container.title.enter()
      .insert("div","#d3plus_drop_list_"+vars.container.id)
        .attr("class","d3plus_drop_title")
        .attr("id","d3plus_drop_title_"+vars.container.id)
        .call(boxStyle)

    enter.append("span")
      .attr("id","d3plus_drop_back_"+vars.container.id)
      .attr("class","d3plus_drop_back")
      .call(backStyle)

    enter.append("div")
      .attr("id","d3plus_drop_title_text_"+vars.container.id)
      .attr("class","d3plus_drop_title_text")
      .call(titleStyle)

    vars.container.title
      .on(events.over,function(d,i){

        var color = lighter(vars.ui.color.secondary.value)

        d3.select(this).style("cursor","pointer")
          .transition().duration(vars.timing.mouseevents)
          .style("background-color",color)
          .style("color",textColor(color))

      })
      .on(events.out,function(d){

        var color = vars.ui.color.secondary.value

        d3.select(this).style("cursor","auto")
          .transition().duration(vars.timing.mouseevents)
          .style("background-color",color)
          .style("color",textColor(color))

      })
      .on(events.click,function(d){
        vars.history.back()
      })

    vars.container.title.exit().remove()

    if ( enabled ) {
      vars.margin.title += vars.container.title.node().offsetHeight || vars.container.title.node().getBoundingClientRect().height
    }

    if ( vars.dev.value ) print.timeEnd("creating title and back button")

  }

}

},{"../../../../client/pointer.coffee":41,"../../../../color/lighter.coffee":47,"../../../../color/text.coffee":52,"../../../../core/console/print.coffee":54}],151:[function(require,module,exports){
var items = require("./items.coffee"),
    height     = require("./height.js"),
    print      = require("../../../../core/console/print.coffee"),
    scrolllist = require("./scroll.js"),
    arrow      = require("./arrow.js")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Redraws only the drop down list.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If the menu is open, set the container element's z-index to '9999'.
  //----------------------------------------------------------------------------
  if ( vars.draw.timing ) {

    vars.container.ui.transition().duration(vars.draw.timing)
      .each("start",function(){
        if (vars.open.value) {
          d3.select(this).style("z-index",9999)
        }
      })
      .style("margin",vars.ui.margin.css)
      .each("end",function(){
        if (!vars.open.value) {
          d3.select(this).style("z-index","auto")
        }
      })

  }
  else {

    vars.container.ui
      .style("margin",vars.ui.margin.css)
      .style("z-index",function(){
        if (vars.open.value) {
          return 9999
        }
        else {
          return "auto"
        }
      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Update list items based on filtered data.
  //----------------------------------------------------------------------------
  items( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate the height and orientation of the dropdown list.
  //----------------------------------------------------------------------------
  height( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate scroll position of dropdown menu.
  //----------------------------------------------------------------------------
  scrolllist( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Rotate the dropdown button arrow appropriately.
  //----------------------------------------------------------------------------
  arrow( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Update List
  //----------------------------------------------------------------------------
  if ( vars.dev.value ) print.time("drawing list")

  function position(elem) {
    var flipped = vars.open.flipped.value
    elem
      .style("top",function(){
        return flipped ? "auto" : vars.margin.top-vars.ui.border+"px";
      })
      .style("bottom",function(){
        return flipped ? vars.margin.top+vars.ui.border+"px" : "auto";
      });
  }

  function update(elem) {

    elem
      .style("left",function(){
        if (vars.font.align.value === "left") {
          return vars.margin.left+"px";
        }
        else if (vars.font.align.value === "center") {
          return vars.margin.left-((vars.width.secondary-vars.width.value)/2)+"px";
        }
        else {
          return "auto";
        }
      })
      .style("right",function(){
        return vars.font.align.value === "right" ? "0px" : "auto";
      })
      .style("height",vars.container.listHeight+"px")
      .style("padding",vars.ui.border+"px")
      .style("background-color",vars.ui.color.secondary.value)
      .style("z-index",function(){
        return vars.open.value ? "9999" : "-1";
      })
      .style("width",(vars.width.secondary-(vars.ui.border*2))+"px")
      .style("opacity",vars.open.value ? 1 : 0)
      .call(position);

  }

  function finish(elem) {

    elem.style("display", vars.open.value ? null : "none")
      .call(position);


    if (vars.search.enabled && vars.open.value) {
      vars.container.selector.select("div.d3plus_drop_search input").node().focus()
    }

  }

  var max_height = vars.open.value ? vars.height.secondary - vars.margin.title: 0;

  if (!vars.draw.timing) {

    vars.container.selector.call(update).call(finish)

    vars.container.list
      .style("width",vars.width.secondary-vars.ui.border*2+"px")
      .style("max-height", max_height + "px")
      .property("scrollTop",vars.container.listScroll);

  }
  else {
    vars.container.selector.transition().duration(vars.draw.timing)
      .each("start",function(){
        d3.select(this)
          .style("display",vars.open.value ? "block" : null)
      })
      .call(update)
      .each("end",function(){

        d3.select(this).transition().duration(vars.draw.timing)
          .call(finish)

      })

    function scrollTopTween(scrollTop) {
        return function() {
            var i = d3.interpolateNumber(this.scrollTop, scrollTop);
            return function(t) { this.scrollTop = i(t); };
        };
    }

    vars.container.list.transition().duration(vars.draw.timing)
      .style("width",vars.width.secondary-vars.ui.border*2+"px")
      .style("max-height",max_height+"px")
      .tween("scroll",scrollTopTween(vars.container.listScroll))
  }

  if ( vars.dev.value ) print.timeEnd("drawing list")

}

},{"../../../../core/console/print.coffee":54,"./arrow.js":139,"./height.js":143,"./items.coffee":144,"./scroll.js":147}],152:[function(require,module,exports){
var copy = require("../../../../util/copy.coffee"),
    fontTester  = require("../../../../core/font/tester.coffee"),
    form        = require("../../../form.js"),
    print       = require("../../../../core/console/print.coffee"),
    validObject = require("../../../../object/validate.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// If no widths are defined, then this calculates the width needed to fit the
// longest entry in the list.
//------------------------------------------------------------------------------
module.exports = function ( vars ) {

  var data = [], buffer = 0
  for ( var level in vars.data.nested.all ) {
    var newData = vars.data.nested.all[level]
      , key     = validObject(vars.text.nesting) && level in vars.text.nesting
                ? vars.text.nesting[level][0] : level

    if ( [vars.id.value,vars.text.value].indexOf(key) < 0 ) {
      newData = copy(newData)
      newData.forEach(function(d){
        d[vars.text.value || vars.id.value] = d[key]
      })
    }
    data = data.concat( newData )
  }

  function getWidth( type ) {

    var key  = type === "primary" ? "value" : type
      , icon = key === "value" ? vars.icon.drop.value
             : vars.icon.select.value || vars.icon.drop.value
      , text = key === "value" ? vars.text.value
             : vars.text.secondary.value || vars.text.value
      , font = key === "value" ? vars.font : vars.font.secondary

    if ( vars.dev.value ) print.time("calculating "+type+" width")

    var button = form()
      .container( fontTester() )
      .data({
        "large": 9999,
        "value": data
      })
      .draw({ "update": false })
      .font( font )
      .icon({ "button": icon, "value": vars.icon.value })
      .id(vars.id.value)
      .timing({
        "ui": 0
      })
      .text( text || vars.id.value )
      .type( "button" )
      .ui({
        "border": type === "primary" ? vars.ui.border : 0,
        "display": "inline-block",
        "margin": 0,
        "padding": vars.ui.padding.css
      })
      .width(false)
      .draw()

    var w = []
    button.selectAll("div.d3plus_node").each(function(o){
      w.push(this.offsetWidth + 1)
    }).remove()

    var dropWidth = {}
    dropWidth[key] = d3.max(w)

    vars.self.width( dropWidth )

    if ( vars.dev.value ) print.timeEnd("calculating "+type+" width")

  }

  if ( typeof vars.width.value !== "number" ) {

    getWidth( "primary" )

  }

  if ( typeof vars.width.secondary !== "number" ) {

    if ( !vars.text.secondary.value || vars.text.value === vars.text.secondary.value ) {
      vars.self.width({"secondary": vars.width.value})
    }
    else {
      getWidth( "secondary" )
    }

  }

}

},{"../../../../core/console/print.coffee":54,"../../../../core/font/tester.coffee":70,"../../../../object/validate.coffee":166,"../../../../util/copy.coffee":201,"../../../form.js":99}],153:[function(require,module,exports){
var child = require("../../../../util/child.coffee")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Recursive function that applies a click event to all parent windows that
// will close the dropdown if it is open.
//------------------------------------------------------------------------------
var windowEvents = function ( vars , elem ) {

  if ( elem === undefined ) {
    var elem = window
  }

  d3.select(elem).on("click."+vars.container.id,function(){

    var element = d3.event.target || d3.event.toElement
      , parent  = element.parentNode

    if ( parent && ["d3plus_node","d3plus_drop_title"].indexOf(parent.className) >= 0 ) {
      element = parent.parentNode
    }

    if (element && parent && !child(vars.container.ui, element) && (vars.open.value || vars.hover.value)) {
      vars.self.open(false).hover(false).draw()
    }

  })

  try {
    var same_origin = window.parent.location.host === window.location.host;
  }
  catch (e) {
    var same_origin = false
  }

  if (same_origin) {
    if (elem.self !== window.top) {
      windowEvents( vars , elem.parent )
    }
  }

}

module.exports = windowEvents

},{"../../../../util/child.coffee":199}],154:[function(require,module,exports){
var form = require("../form.js")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates a set of Toggle Buttons
//------------------------------------------------------------------------------
module.exports = function( vars ) {

  if ( !("buttons" in vars.container) ) {

    vars.container.buttons = form()
      .container(vars.container.ui)
      .type("button")

  }

  var dataLength  = vars.data.viz.length
    , buttonWidth = vars.width.value
                  ? vars.width.value/dataLength
                  : false

  var toggles = vars.container.ui.selectAll("div.d3plus_toggle")
    .data(vars.data.viz,function(d){
      return d[vars.id.value]
    })

  toggles.enter().append("div")
    .attr("class","d3plus_toggle")
    .style("display","inline-block")
    .style("vertical-align","top")

  toggles.order()
    .each(function(d){

      if (!("form" in d.d3plus)) {
        d.d3plus.form = form().container(d3.select(this))
      }

      var id = vars.id.nesting.length > vars.depth.value ? vars.id.nesting[vars.depth.value+1] : vars.id.value

      if (d[id] instanceof Array) {
        d.d3plus.form
          .container({"id": vars.container.id+"_"+d[vars.id.value]})
          .data(d[id])
          .id(vars.id.nesting.slice(1))
          .type("drop")
      }
      else {
        d.d3plus.form
          .data([d])
          .id(vars.id.value)
          .type("button")
      }

      d.d3plus.form
        .color(vars.color)
        .focus(vars.focus.value,function(value){

          if (value !== vars.focus.value) {
            vars.self.focus(value).draw()
          }

        })
        .hover(vars.hover.value)
        .icon({
          "select": false,
          "value": vars.icon.value
        })
        .font(vars.font)
        .format(vars.format)
        .order(vars.order)
        .text(vars.text.value)
        .ui({
          "border": vars.ui.border,
          "color": vars.ui.color,
          "display": "inline-block",
          "margin": 0,
          "padding": vars.ui.padding.css
        })
        .width(buttonWidth)
        .draw()

    })

  if (vars.data.element.value) {
    vars.data.element.value
      .on("focus."+vars.container.id, function(){
        vars.self.focus(this.value).hover(this.value).draw();
      })
      .on("blur."+vars.container.id, function(){
        vars.self.hover(false).draw();
      })
  }

}

},{"../form.js":99}],155:[function(require,module,exports){
var intersectPoints, lineIntersection, pointInPoly, pointInSegmentBox, polyInsidePoly, print, rayIntersectsSegment, rotatePoint, rotatePoly, segmentsIntersect, simplify, squaredDist;

print = require("../core/console/print.coffee");

simplify = require("simplify-js");

module.exports = function(poly, options) {
  var aRatio, aRatios, angle, angleRad, angleStep, angles, area, aspectRatioStep, aspectRatios, bBox, boxHeight, boxWidth, centroid, events, height, i, insidePoly, j, k, l, left, len, len1, len2, len3, m, maxArea, maxAspectRatio, maxHeight, maxRect, maxWidth, maxx, maxy, minAspectRatio, minSqDistH, minSqDistW, minx, miny, modifOrigins, origOrigin, origin, origins, p, p1H, p1W, p2H, p2W, rectPoly, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, right, rndPoint, rndX, rndY, tempPoly, tolerance, width, widthStep, x0, y0;
  if (poly.length < 3) {
    print.error('polygon has to have at least 3 points');
    return null;
  }
  events = [];
  aspectRatioStep = 0.5;
  angleStep = 5;
  if (options == null) {
    options = {};
  }
  if (options.maxAspectRatio == null) {
    options.maxAspectRatio = 15;
  }
  if (options.minWidth == null) {
    options.minWidth = 0;
  }
  if (options.minHeight == null) {
    options.minHeight = 0;
  }
  if (options.tolerance == null) {
    options.tolerance = 0.02;
  }
  if (options.nTries == null) {
    options.nTries = 20;
  }
  if (options.angle != null) {
    if (options.angle instanceof Array) {
      angles = options.angle;
    } else if (typeof options.angle === 'number') {
      angles = [options.angle];
    } else if (typeof options.angle === 'string' && !isNaN(options.angle)) {
      angles = [Number(options.angle)];
    }
  }
  if (angles == null) {
    angles = d3.range(-90, 90 + angleStep, angleStep);
  }
  if (options.aspectRatio != null) {
    if (options.aspectRatio instanceof Array) {
      aspectRatios = options.aspectRatio;
    } else if (typeof options.aspectRatio === 'number') {
      aspectRatios = [options.aspectRatio];
    } else if (typeof options.aspectRatio === 'string' && !isNaN(options.aspectRatio)) {
      aspectRatios = [Number(options.aspectRatio)];
    }
  }
  if (options.origin != null) {
    if (options.origin instanceof Array) {
      if (options.origin[0] instanceof Array) {
        origins = options.origin;
      } else {
        origins = [options.origin];
      }
    }
  }
  area = Math.abs(d3.geom.polygon(poly).area());
  if (area === 0) {
    print.error('polygon has 0 area');
    return null;
  }
  ref = d3.extent(poly, function(d) {
    return d[0];
  }), minx = ref[0], maxx = ref[1];
  ref1 = d3.extent(poly, function(d) {
    return d[1];
  }), miny = ref1[0], maxy = ref1[1];
  tolerance = Math.min(maxx - minx, maxy - miny) * options.tolerance;
  tempPoly = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = poly.length; j < len; j++) {
      p = poly[j];
      results.push({
        x: p[0],
        y: p[1]
      });
    }
    return results;
  })();
  if (tolerance > 0) {
    tempPoly = simplify(tempPoly, tolerance);
    poly = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = tempPoly.length; j < len; j++) {
        p = tempPoly[j];
        results.push([p.x, p.y]);
      }
      return results;
    })();
  }
  if (options.vdebug) {
    events.push({
      type: 'simplify',
      poly: poly
    });
  }
  ref2 = d3.extent(poly, function(d) {
    return d[0];
  }), minx = ref2[0], maxx = ref2[1];
  ref3 = d3.extent(poly, function(d) {
    return d[1];
  }), miny = ref3[0], maxy = ref3[1];
  bBox = [[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy]];
  ref4 = [maxx - minx, maxy - miny], boxWidth = ref4[0], boxHeight = ref4[1];
  widthStep = Math.min(boxWidth, boxHeight) / 50;
  if (origins == null) {
    origins = [];
    centroid = d3.geom.polygon(poly).centroid();
    if (pointInPoly(centroid, poly)) {
      origins.push(centroid);
    }
    while (origins.length < options.nTries) {
      rndX = Math.random() * boxWidth + minx;
      rndY = Math.random() * boxHeight + miny;
      rndPoint = [rndX, rndY];
      if (pointInPoly(rndPoint, poly)) {
        origins.push(rndPoint);
      }
    }
  }
  if (options.vdebug) {
    events.push({
      type: 'origins',
      points: origins
    });
  }
  maxArea = 0;
  maxRect = null;
  for (j = 0, len = angles.length; j < len; j++) {
    angle = angles[j];
    angleRad = -angle * Math.PI / 180;
    if (options.vdebug) {
      events.push({
        type: 'angle',
        angle: angle
      });
    }
    for (i = k = 0, len1 = origins.length; k < len1; i = ++k) {
      origOrigin = origins[i];
      ref5 = intersectPoints(poly, origOrigin, angleRad), p1W = ref5[0], p2W = ref5[1];
      ref6 = intersectPoints(poly, origOrigin, angleRad + Math.PI / 2), p1H = ref6[0], p2H = ref6[1];
      modifOrigins = [];
      if ((p1W != null) && (p2W != null)) {
        modifOrigins.push([(p1W[0] + p2W[0]) / 2, (p1W[1] + p2W[1]) / 2]);
      }
      if ((p1H != null) && (p2H != null)) {
        modifOrigins.push([(p1H[0] + p2H[0]) / 2, (p1H[1] + p2H[1]) / 2]);
      }
      if (options.vdebug) {
        events.push({
          type: 'modifOrigin',
          idx: i,
          p1W: p1W,
          p2W: p2W,
          p1H: p1H,
          p2H: p2H,
          modifOrigins: modifOrigins
        });
      }
      for (l = 0, len2 = modifOrigins.length; l < len2; l++) {
        origin = modifOrigins[l];
        if (options.vdebug) {
          events.push({
            type: 'origin',
            cx: origin[0],
            cy: origin[1]
          });
        }
        ref7 = intersectPoints(poly, origin, angleRad), p1W = ref7[0], p2W = ref7[1];
        if (p1W === null || p2W === null) {
          continue;
        }
        minSqDistW = Math.min(squaredDist(origin, p1W), squaredDist(origin, p2W));
        maxWidth = 2 * Math.sqrt(minSqDistW);
        ref8 = intersectPoints(poly, origin, angleRad + Math.PI / 2), p1H = ref8[0], p2H = ref8[1];
        if (p1H === null || p2H === null) {
          continue;
        }
        minSqDistH = Math.min(squaredDist(origin, p1H), squaredDist(origin, p2H));
        maxHeight = 2 * Math.sqrt(minSqDistH);
        if (maxWidth * maxHeight < maxArea) {
          continue;
        }
        if (aspectRatios != null) {
          aRatios = aspectRatios;
        } else {
          minAspectRatio = Math.max(1, options.minWidth / maxHeight, maxArea / (maxHeight * maxHeight));
          maxAspectRatio = Math.min(options.maxAspectRatio, maxWidth / options.minHeight, (maxWidth * maxWidth) / maxArea);
          aRatios = d3.range(minAspectRatio, maxAspectRatio + aspectRatioStep, aspectRatioStep);
        }
        for (m = 0, len3 = aRatios.length; m < len3; m++) {
          aRatio = aRatios[m];
          left = Math.max(options.minWidth, Math.sqrt(maxArea * aRatio));
          right = Math.min(maxWidth, maxHeight * aRatio);
          if (right * maxHeight < maxArea) {
            continue;
          }
          if ((right - left) >= widthStep) {
            if (options.vdebug) {
              events.push({
                type: 'aRatio',
                aRatio: aRatio
              });
            }
          }
          while ((right - left) >= widthStep) {
            width = (left + right) / 2;
            height = width / aRatio;
            x0 = origin[0], y0 = origin[1];
            rectPoly = [[x0 - width / 2, y0 - height / 2], [x0 + width / 2, y0 - height / 2], [x0 + width / 2, y0 + height / 2], [x0 - width / 2, y0 + height / 2]];
            rectPoly = rotatePoly(rectPoly, angleRad, origin);
            if (polyInsidePoly(rectPoly, poly)) {
              insidePoly = true;
              maxArea = width * height;
              maxRect = {
                cx: x0,
                cy: y0,
                width: width,
                height: height,
                angle: angle
              };
              left = width;
            } else {
              insidePoly = false;
              right = width;
            }
            if (options.vdebug) {
              events.push({
                type: 'rectangle',
                cx: x0,
                cy: y0,
                width: width,
                height: height,
                areaFraction: (width * height) / area,
                angle: angle,
                insidePoly: insidePoly
              });
            }
          }
        }
      }
    }
  }
  return [maxRect, maxArea, events];
};

squaredDist = function(a, b) {
  var deltax, deltay;
  deltax = b[0] - a[0];
  deltay = b[1] - a[1];
  return deltax * deltax + deltay * deltay;
};

rayIntersectsSegment = function(p, p1, p2) {
  var a, b, mAB, mAP, ref;
  ref = p1[1] < p2[1] ? [p1, p2] : [p2, p1], a = ref[0], b = ref[1];
  if (p[1] === b[1] || p[1] === a[1]) {
    p[1] += Number.MIN_VALUE;
  }
  if (p[1] > b[1] || p[1] < a[1]) {
    return false;
  } else if (p[0] > a[0] && p[0] > b[0]) {
    return false;
  } else if (p[0] < a[0] && p[0] < b[0]) {
    return true;
  } else {
    mAB = (b[1] - a[1]) / (b[0] - a[0]);
    mAP = (p[1] - a[1]) / (p[0] - a[0]);
    return mAP > mAB;
  }
};

pointInPoly = function(p, poly) {
  var a, b, c, i, n;
  i = -1;
  n = poly.length;
  b = poly[n - 1];
  c = 0;
  while (++i < n) {
    a = b;
    b = poly[i];
    if (rayIntersectsSegment(p, a, b)) {
      c++;
    }
  }
  return c % 2 !== 0;
};

pointInSegmentBox = function(p, p1, q1) {
  var eps, px, py;
  eps = 1e-9;
  px = p[0], py = p[1];
  if (px < Math.min(p1[0], q1[0]) - eps || px > Math.max(p1[0], q1[0]) + eps || py < Math.min(p1[1], q1[1]) - eps || py > Math.max(p1[1], q1[1]) + eps) {
    return false;
  }
  return true;
};

lineIntersection = function(p1, q1, p2, q2) {
  var cross1, cross2, denom, dx1, dx2, dy1, dy2, eps, px, py;
  eps = 1e-9;
  dx1 = p1[0] - q1[0];
  dy1 = p1[1] - q1[1];
  dx2 = p2[0] - q2[0];
  dy2 = p2[1] - q2[1];
  denom = dx1 * dy2 - dy1 * dx2;
  if (Math.abs(denom) < eps) {
    return null;
  }
  cross1 = p1[0] * q1[1] - p1[1] * q1[0];
  cross2 = p2[0] * q2[1] - p2[1] * q2[0];
  px = (cross1 * dx2 - cross2 * dx1) / denom;
  py = (cross1 * dy2 - cross2 * dy1) / denom;
  return [px, py];
};

segmentsIntersect = function(p1, q1, p2, q2) {
  var p;
  p = lineIntersection(p1, q1, p2, q2);
  if (p == null) {
    return false;
  }
  return pointInSegmentBox(p, p1, q1) && pointInSegmentBox(p, p2, q2);
};

polyInsidePoly = function(polyA, polyB) {
  var aA, aB, bA, bB, iA, iB, nA, nB;
  iA = -1;
  nA = polyA.length;
  nB = polyB.length;
  bA = polyA[nA - 1];
  while (++iA < nA) {
    aA = bA;
    bA = polyA[iA];
    iB = -1;
    bB = polyB[nB - 1];
    while (++iB < nB) {
      aB = bB;
      bB = polyB[iB];
      if (segmentsIntersect(aA, bA, aB, bB)) {
        return false;
      }
    }
  }
  return pointInPoly(polyA[0], polyB);
};

rotatePoint = function(p, alpha, origin) {
  var cosAlpha, sinAlpha, xshifted, yshifted;
  if (origin == null) {
    origin = [0, 0];
  }
  xshifted = p[0] - origin[0];
  yshifted = p[1] - origin[1];
  cosAlpha = Math.cos(alpha);
  sinAlpha = Math.sin(alpha);
  return [cosAlpha * xshifted - sinAlpha * yshifted + origin[0], sinAlpha * xshifted + cosAlpha * yshifted + origin[1]];
};

rotatePoly = function(poly, alpha, origin) {
  var j, len, point, results;
  results = [];
  for (j = 0, len = poly.length; j < len; j++) {
    point = poly[j];
    results.push(rotatePoint(point, alpha, origin));
  }
  return results;
};

intersectPoints = function(poly, origin, alpha) {
  var a, b, closestPointLeft, closestPointRight, eps, i, idx, minSqDistLeft, minSqDistRight, n, p, shiftedOrigin, sqDist, x0, y0;
  eps = 1e-9;
  origin = [origin[0] + eps * Math.cos(alpha), origin[1] + eps * Math.sin(alpha)];
  x0 = origin[0], y0 = origin[1];
  shiftedOrigin = [x0 + Math.cos(alpha), y0 + Math.sin(alpha)];
  idx = 0;
  if (Math.abs(shiftedOrigin[0] - x0) < eps) {
    idx = 1;
  }
  i = -1;
  n = poly.length;
  b = poly[n - 1];
  minSqDistLeft = Number.MAX_VALUE;
  minSqDistRight = Number.MAX_VALUE;
  closestPointLeft = null;
  closestPointRight = null;
  while (++i < n) {
    a = b;
    b = poly[i];
    p = lineIntersection(origin, shiftedOrigin, a, b);
    if ((p != null) && pointInSegmentBox(p, a, b)) {
      sqDist = squaredDist(origin, p);
      if (p[idx] < origin[idx]) {
        if (sqDist < minSqDistLeft) {
          minSqDistLeft = sqDist;
          closestPointLeft = p;
        }
      } else if (p[idx] > origin[idx]) {
        if (sqDist < minSqDistRight) {
          minSqDistRight = sqDist;
          closestPointRight = p;
        }
      }
    }
  }
  return [closestPointLeft, closestPointRight];
};



},{"../core/console/print.coffee":54,"simplify-js":9}],156:[function(require,module,exports){
module.exports = function(radians, distance, shape) {
  var adjacentLegLength, coords, diagonal, oppositeLegLength;
  coords = {
    x: 0,
    y: 0
  };
  if (radians < 0) {
    radians = Math.PI * 2 + radians;
  }
  if (shape === "square") {
    diagonal = 45 * (Math.PI / 180);
    if (radians <= Math.PI) {
      if (radians < (Math.PI / 2)) {
        if (radians < diagonal) {
          coords.x += distance;
          oppositeLegLength = Math.tan(radians) * distance;
          coords.y += oppositeLegLength;
        } else {
          coords.y += distance;
          adjacentLegLength = distance / Math.tan(radians);
          coords.x += adjacentLegLength;
        }
      } else {
        if (radians < (Math.PI - diagonal)) {
          coords.y += distance;
          adjacentLegLength = distance / Math.tan(Math.PI - radians);
          coords.x -= adjacentLegLength;
        } else {
          coords.x -= distance;
          oppositeLegLength = Math.tan(Math.PI - radians) * distance;
          coords.y += oppositeLegLength;
        }
      }
    } else {
      if (radians < (3 * Math.PI / 2)) {
        if (radians < (diagonal + Math.PI)) {
          coords.x -= distance;
          oppositeLegLength = Math.tan(radians - Math.PI) * distance;
          coords.y -= oppositeLegLength;
        } else {
          coords.y -= distance;
          adjacentLegLength = distance / Math.tan(radians - Math.PI);
          coords.x -= adjacentLegLength;
        }
      } else {
        if (radians < (2 * Math.PI - diagonal)) {
          coords.y -= distance;
          adjacentLegLength = distance / Math.tan(2 * Math.PI - radians);
          coords.x += adjacentLegLength;
        } else {
          coords.x += distance;
          oppositeLegLength = Math.tan(2 * Math.PI - radians) * distance;
          coords.y -= oppositeLegLength;
        }
      }
    }
  } else {
    coords.x += distance * Math.cos(radians);
    coords.y += distance * Math.sin(radians);
  }
  return coords;
};



},{}],157:[function(require,module,exports){
var offset;

offset = require("../geom/offset.coffee");

module.exports = function(path) {
  var angle, i, j, last, len, length, o, obtuse, p, poly, prev, radius, segments, start, step, width;
  path = path.slice(1).slice(0, -1).split(/L|A/);
  poly = [];
  for (j = 0, len = path.length; j < len; j++) {
    p = path[j];
    p = p.split(" ");
    if (p.length === 1) {
      poly.push(p[0].split(",").map(function(d) {
        return parseFloat(d);
      }));
    } else {
      prev = poly[poly.length - 1];
      last = p.pop().split(",").map(function(d) {
        return parseFloat(d);
      });
      radius = parseFloat(p.shift().split(",")[0]);
      width = Math.sqrt(Math.pow(last[0] - prev[0], 2) + Math.pow(last[1] - prev[1], 2));
      angle = Math.acos((radius * radius + radius * radius - width * width) / (2 * radius * radius));
      obtuse = p[1].split(",")[0] === "1";
      if (obtuse) {
        angle = Math.PI * 2 - angle;
      }
      length = angle / (Math.PI * 2) * (radius * Math.PI * 2);
      segments = length / 5;
      start = Math.atan2(-prev[1], -prev[0]) - Math.PI;
      step = angle / segments;
      i = step;
      while (i < angle) {
        o = offset(start + i, radius);
        poly.push([o.x, o.y]);
        i += step;
      }
      poly.push(last);
    }
  }
  return poly;
};



},{"../geom/offset.coffee":156}],158:[function(require,module,exports){
var normalize;

normalize = require("./normalize.coffee");

module.exports = function(edges, options) {
  var Q, a, b, cid, commSize, commSizes, communities, community, deltaQ, distance, edge, endpoint, events, i, id, iter, j, k, len, len1, linksMap, m, maxa, maxb, node, nodeid, nodes, nodesMap, ref, ref1, result, startpoint;
  events = [];
  if (options == null) {
    options = {};
  }
  if ((options.nodes == null) || typeof options.nodes !== 'object') {
    ref = normalize(edges, options), edges = ref[0], options = ref[1];
    if (options === null) {
      return null;
    }
  }
  distance = options.distance, nodeid = options.nodeid, startpoint = options.startpoint, endpoint = options.endpoint, nodes = options.nodes;
  nodesMap = {};
  for (id in nodes) {
    nodesMap[id] = {
      node: nodes[id].node,
      degree: 0
    };
  }
  m = 0;
  linksMap = {};
  for (i = 0, len = edges.length; i < len; i++) {
    edge = edges[i];
    a = nodeid(startpoint(edge));
    b = nodeid(endpoint(edge));
    if (!(a in linksMap)) {
      linksMap[a] = {};
    }
    if (!(b in linksMap)) {
      linksMap[b] = {};
    }
    if (!(b in linksMap[a])) {
      linksMap[a][b] = 0;
      linksMap[b][a] = 0;
      m++;
      nodesMap[a].degree += 1;
      nodesMap[b].degree += 1;
    }
  }
  communities = {};
  Q = 0;
  for (id in nodesMap) {
    node = nodesMap[id];
    communities[id] = {
      score: node.degree / (2.0 * m),
      nodes: [id]
    };
  }
  for (a in linksMap) {
    for (b in linksMap[a]) {
      linksMap[a][b] = 1.0 / (2 * m) - (nodesMap[a].degree * nodesMap[b].degree) / (4.0 * m * m);
    }
  }
  iter = 0;
  while (iter < 1000) {
    deltaQ = -1;
    maxa = void 0;
    maxb = void 0;
    for (a in linksMap) {
      for (b in linksMap[a]) {
        if (linksMap[a][b] > deltaQ) {
          deltaQ = linksMap[a][b];
          maxa = a;
          maxb = b;
        }
      }
    }
    if (deltaQ < 0) {
      break;
    }
    for (k in linksMap[maxa]) {
      if (k !== maxb) {
        if (k in linksMap[maxb]) {
          linksMap[maxb][k] += linksMap[maxa][k];
        } else {
          linksMap[maxb][k] = linksMap[maxa][k] - 2 * communities[maxb].score * communities[k].score;
        }
        linksMap[k][maxb] = linksMap[maxb][k];
      }
      delete linksMap[k][maxa];
    }
    for (k in linksMap[maxb]) {
      if (!(k in linksMap[maxa]) && k !== maxb) {
        linksMap[maxb][k] -= 2 * communities[maxa].score * communities[k].score;
        linksMap[k][maxb] = linksMap[maxb][k];
      }
    }
    ref1 = communities[maxa].nodes;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      node = ref1[j];
      communities[maxb].nodes.push(node);
    }
    communities[maxb].score += communities[maxa].score;
    if (options.vdebug) {
      events.push({
        type: 'merge',
        father: maxb,
        child: maxa,
        nodes: communities[maxb].nodes
      });
    }
    delete communities[maxa];
    delete linksMap[maxa];
    Q += deltaQ;
    iter++;
  }
  commSizes = (function() {
    var results;
    results = [];
    for (cid in communities) {
      community = communities[cid];
      results.push([cid, community.nodes.length]);
    }
    return results;
  })();
  commSizes.sort(function(a, b) {
    return b[1] - a[1];
  });
  result = (function() {
    var l, len2, results;
    results = [];
    for (l = 0, len2 = commSizes.length; l < len2; l++) {
      commSize = commSizes[l];
      results.push(communities[commSize[0]].nodes);
    }
    return results;
  })();
  return [result, events];
};



},{"./normalize.coffee":160}],159:[function(require,module,exports){
module.exports = function(n1, n2) {
  var xx, yy;
  if (!(n1 instanceof Array)) {
    n1 = [n1.x, n1.y];
  }
  if (!(n2 instanceof Array)) {
    n2 = [n2.x, n2.y];
  }
  xx = Math.abs(n1[0] - n2[0]);
  yy = Math.abs(n1[1] - n2[1]);
  return Math.sqrt((xx * xx) + (yy * yy));
};



},{}],160:[function(require,module,exports){
var print;

print = require("../core/console/print.coffee");

module.exports = function(edges, options) {
  var K, a, b, directed, distance, edge, edge2distance, endpoint, errormsg, i, id, id1, idA, idB, j, k, l, len, len1, len2, node, nodeA, nodeB, nodeid, nodes, ref, ref1, source, startpoint, target, vdebug;
  source = options.source, target = options.target, directed = options.directed, distance = options.distance, nodeid = options.nodeid, startpoint = options.startpoint, endpoint = options.endpoint, K = options.K, vdebug = options.vdebug;
  if (!directed) {
    directed = false;
  }
  if (K == null) {
    K = 1;
  }
  if (nodeid == null) {
    nodeid = function(node) {
      return node;
    };
  } else if (typeof nodeid === 'string') {
    nodeid = (function(nodeid) {
      return function(node) {
        return node[nodeid];
      };
    })(nodeid);
  }
  if ((source != null) && typeof source === 'object') {
    source = nodeid(source);
  }
  if ((target != null) && typeof target === 'object') {
    target = nodeid(target);
  }
  if (startpoint == null) {
    startpoint = function(edge) {
      return edge.source;
    };
  } else if (typeof startpoint === 'string') {
    startpoint = (function(startpoint) {
      return function(edge) {
        return edge[startpoint];
      };
    })(startpoint);
  }
  if (endpoint == null) {
    endpoint = function(edge) {
      return edge.target;
    };
  } else if (typeof endpoint === 'string') {
    endpoint = (function(endpoint) {
      return function(edge) {
        return edge[endpoint];
      };
    })(endpoint);
  }
  if (distance == null) {
    distance = function(edge) {
      return 1;
    };
  } else if (typeof distance === 'number') {
    distance = (function(distance) {
      return function(edge) {
        return distance;
      };
    })(distance);
  } else if (typeof distance === 'string') {
    distance = (function(distance) {
      return function(edge) {
        return edge[distance];
      };
    })(distance);
  } else if (distance instanceof Array) {
    edge2distance = {};
    for (i = j = 0, len = edges.length; j < len; i = ++j) {
      edge = edges[i];
      a = nodeid(startpoint(edge));
      b = nodeid(endpoint(edge));
      edge2distance[a + '_' + b] = distance[i];
    }
    distance = function(edge) {
      a = nodeid(startpoint(edge));
      b = nodeid(endpoint(edge));
      return edge2distance[a + '_' + b];
    };
  }
  nodes = {};
  for (k = 0, len1 = edges.length; k < len1; k++) {
    edge = edges[k];
    nodeA = startpoint(edge);
    nodeB = endpoint(edge);
    idA = nodeid(nodeA);
    idB = nodeid(nodeB);
    ref = [nodeA, nodeB];
    for (l = 0, len2 = ref.length; l < len2; l++) {
      node = ref[l];
      id = nodeid(node);
      if (!(id in nodes)) {
        nodes[id] = {
          node: node,
          outedges: []
        };
      }
    }
    nodes[idA].outedges.push(edge);
    if (!directed) {
      nodes[idB].outedges.push(edge);
    }
  }
  errormsg = null;
  if (edges.length === 0) {
    errormsg = 'The length of edges is 0';
  } else if (K < 0) {
    errormsg = 'K can not have negative value';
  } else if (distance(edges[0]) == null) {
    errormsg = 'Check the distance function/attribute';
  } else if (startpoint(edges[0]) == null) {
    errormsg = 'Check the startpoint function/attribute';
  } else if (endpoint(edges[0]) == null) {
    errormsg = 'Check the endpoint function/attribute';
  } else {
    id1 = nodeid(startpoint(edges[0]));
    if ((id1 == null) || ((ref1 = typeof id1) !== 'string' && ref1 !== 'number')) {
      errormsg = 'Check the nodeid function/attribute';
    } else if ((source != null) && !(source in nodes)) {
      errormsg = 'The source is not in the graph';
    } else if ((target != null) && !(target in nodes)) {
      errormsg = 'The target is not in the graph';
    }
  }
  if (errormsg != null) {
    print.error(errormsg);
    return null;
  }
  return [
    edges, {
      source: source,
      target: target,
      directed: directed,
      distance: distance,
      nodeid: nodeid,
      startpoint: startpoint,
      endpoint: endpoint,
      K: K,
      nodes: nodes,
      vdebug: vdebug
    }
  ];
};



},{"../core/console/print.coffee":54}],161:[function(require,module,exports){
var Heap, normalize;

Heap = require('heap');

normalize = require("./normalize.coffee");

module.exports = function(edges, source, options) {
  var K, a, alt, b, directed, distance, edge, endpoint, getPath, heap, i, id, j, len, len1, maxsize, node, nodeid, nodes, path, ref, ref1, ref2, res, result, startpoint, target, u, visited;
  if (options == null) {
    options = {};
  }
  options.source = source;
  if ((options.nodes == null) || typeof options.nodes !== 'object') {
    ref = normalize(edges, options), edges = ref[0], options = ref[1];
    if (options === null) {
      return null;
    }
  }
  source = options.source, target = options.target, directed = options.directed, distance = options.distance, nodeid = options.nodeid, startpoint = options.startpoint, endpoint = options.endpoint, K = options.K, nodes = options.nodes;
  for (id in nodes) {
    node = nodes[id];
    node.count = 0;
  }
  heap = new Heap(function(a, b) {
    return a.distance - b.distance;
  });
  visited = {};
  if (target == null) {
    visited[source] = true;
  }
  heap.push({
    edge: null,
    target: source,
    distance: 0
  });
  maxsize = 0;
  result = [];
  while (!heap.empty()) {
    maxsize = Math.max(maxsize, heap.size());
    path = heap.pop();
    u = path.target;
    nodes[u].count++;
    if (target == null) {
      result.push(path);
    } else if (u === target) {
      result.push(path);
    }
    if (result.length === K) {
      break;
    }
    if (nodes[u].count <= K) {
      ref1 = nodes[u].outedges;
      for (i = 0, len = ref1.length; i < len; i++) {
        edge = ref1[i];
        a = nodeid(startpoint(edge));
        b = nodeid(endpoint(edge));
        if (!directed && b === u) {
          ref2 = [b, a], a = ref2[0], b = ref2[1];
        }
        if (target == null) {
          if (visited[b]) {
            continue;
          }
          visited[b] = true;
        }
        alt = path.distance + distance(edge);
        heap.push({
          edge: edge,
          previous: path,
          target: b,
          distance: alt
        });
      }
    }
  }
  getPath = function(path) {
    edges = [];
    while (path.edge != null) {
      edges.push(path.edge);
      path = path.previous;
    }
    return edges.reverse();
  };
  for (j = 0, len1 = result.length; j < len1; j++) {
    res = result[j];
    if (target != null) {
      delete res.target;
      res.edges = getPath(res);
    }
    delete res.edge;
    delete res.previous;
  }
  return result;
};



},{"./normalize.coffee":160,"heap":6}],162:[function(require,module,exports){
var distance;

distance = require("./distance.coffee");

module.exports = function(arr, opts) {
  var distances, quad;
  if (!opts) {
    opts = {};
  }
  distances = [];
  quad = d3.geom.quadtree().x(function(d) {
    if (opts.accessor) {
      return opts.accessor(d)[0];
    } else {
      return d[0];
    }
  }).y(function(d) {
    if (opts.accessor) {
      return opts.accessor(d)[1];
    } else {
      return d[1];
    }
  });
  quad(arr).visit(function(node) {
    var i, j, len, len1, n1, n2, ref, ref1;
    if (!node.leaf) {
      ref = node.nodes;
      for (i = 0, len = ref.length; i < len; i++) {
        n1 = ref[i];
        if (n1 && n1.point) {
          if (opts.origin) {
            distances.push(distance(n1, opts));
          } else {
            ref1 = node.nodes;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              n2 = ref1[j];
              if (n2 && n2.point && n2.point !== n1.point) {
                distances.push(distance(n1, n2));
              }
            }
          }
        }
      }
    }
    return false;
  });
  if (opts.all) {
    return distances.sort(function(aa, bb) {
      return aa - bb;
    });
  } else {
    return d3.min(distances);
  }
};



},{"./distance.coffee":159}],163:[function(require,module,exports){
var normalize;

normalize = require("./normalize.coffee");

module.exports = function(edges, source, options) {
  var K, dfs, directed, distance, edge, endpoint, id, nodeid, nodes, ref, startpoint, visited;
  if (options == null) {
    options = {};
  }
  options.source = source;
  if ((options.nodes == null) || typeof options.nodes !== 'object') {
    ref = normalize(edges, options), edges = ref[0], options = ref[1];
    if (options === null) {
      return null;
    }
  }
  source = options.source, directed = options.directed, distance = options.distance, nodeid = options.nodeid, startpoint = options.startpoint, endpoint = options.endpoint, K = options.K, nodes = options.nodes;
  visited = {};
  visited[source] = true;
  dfs = function(origin, curr_distance) {
    var a, b, edge, i, len, new_distance, ref1, ref2, results;
    ref1 = nodes[origin].outedges;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      edge = ref1[i];
      a = nodeid(startpoint(edge));
      b = nodeid(endpoint(edge));
      if (!directed && b === origin) {
        ref2 = [b, a], a = ref2[0], b = ref2[1];
      }
      if (!(b in visited)) {
        new_distance = curr_distance + distance(edge);
        if (new_distance <= K) {
          visited[b] = true;
          results.push(dfs(b, new_distance));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  dfs(source, 0);
  return {
    nodes: (function() {
      var results;
      results = [];
      for (id in visited) {
        results.push(nodes[id].node);
      }
      return results;
    })(),
    edges: (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = edges.length; i < len; i++) {
        edge = edges[i];
        if (nodeid(startpoint(edge)) in visited && nodeid(endpoint(edge)) in visited) {
          results.push(edge);
        }
      }
      return results;
    })()
  };
};



},{"./normalize.coffee":160}],164:[function(require,module,exports){
var defaultLocale;

defaultLocale = require("../core/locale/languages/en_US.coffee");

module.exports = function(number, opts) {
  var affixes, key, labels, length, ret, symbol, time, vars;
  if ("locale" in this) {
    time = this.locale.value.time;
  } else {
    time = defaultLocale.time;
  }
  if (!opts) {
    opts = {};
  }
  vars = opts.vars || {};
  key = opts.key;
  labels = "labels" in opts ? opts.labels : true;
  length = number.toString().split(".")[0].length;
  if (vars.time && vars.time.value) {
    time.push(vars.time.value);
  }
  if (typeof key === "string" && time.indexOf(key.toLowerCase()) >= 0) {
    ret = number;
  } else if (key === "share") {
    if (number >= 100) {
      ret = d3.format(",f")(number);
    } else if (number > 99) {
      ret = d3.format(".3g")(number);
    } else {
      ret = d3.format(".2g")(number);
    }
    ret += "%";
  } else if (number < 10 && number > -10) {
    ret = d3.round(number, 2);
  } else if (length > 3) {
    symbol = d3.formatPrefix(number).symbol;
    symbol = symbol.replace("G", "B");
    number = d3.formatPrefix(number).scale(number);
    number = parseFloat(d3.format(".3g")(number));
    ret = number + symbol;
  } else if (length === 3) {
    ret = d3.format(",f")(number);
  } else {
    ret = d3.format(".3g")(number);
  }
  if (labels && key && "format" in vars && key in vars.format.affixes.value) {
    affixes = vars.format.affixes.value[key];
    return affixes[0] + ret + affixes[1];
  } else {
    return ret;
  }
};



},{"../core/locale/languages/en_US.coffee":71}],165:[function(require,module,exports){
var d3selection, validate;

d3selection = require("../util/d3selection.coffee");

validate = require("./validate.coffee");


/**
 * Given any two objects, this method will merge the two objects together, returning a new third object. The values of the second object always overwrite the first.
 * @method d3plus.object.merge
 * @for d3plus.object
 * @param obj1 {Object} The primary object.
 * @param obj2 {Object} The secondary object to merge into the first.
 * @return {Object}
 */

module.exports = function(obj1, obj2) {
  var copyObject, obj3;
  copyObject = function(obj, ret, shallow) {
    var k, results, v;
    results = [];
    for (k in obj) {
      v = obj[k];
      if (typeof v !== "undefined") {
        if (!shallow && validate(v)) {
          if (typeof ret[k] !== "object") {
            ret[k] = {};
          }
          results.push(copyObject(v, ret[k], k.indexOf("d3plus") === 0));
        } else if (!d3selection(v) && v instanceof Array) {
          results.push(ret[k] = v.slice(0));
        } else {
          results.push(ret[k] = v);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  obj3 = {};
  if (obj1) {
    copyObject(obj1, obj3);
  }
  if (obj2) {
    copyObject(obj2, obj3);
  }
  return obj3;
};



},{"../util/d3selection.coffee":202,"./validate.coffee":166}],166:[function(require,module,exports){

/**
 * This function returns true if the variable passed is a literal javascript keyed Object. It's a small, simple function, but it catches some edge-cases that can throw off your code (such as Arrays and `null`).
 * @method d3plus.object.validate
 * @for d3plus.object
 * @param obj {Object} The object to validate.
 * @return {Boolean}
 */
module.exports = function(obj) {
  return obj && obj.constructor === Object;
};



},{}],167:[function(require,module,exports){
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Formats a string similar to Python's "format"
//------------------------------------------------------------------------------
module.exports = function() {

  var args = Array.prototype.slice.call(arguments)
    , str = args.shift()

  str.unkeyed_index = 0;
  return str.replace(/\{(\w*)\}/g, function(match, key) {
      if (key === '') {
          key = str.unkeyed_index;
          str.unkeyed_index++
      }
      if (key == +key) {
          return args[key] !== 'undefined'
              ? args[key]
              : match;
      } else {
          for (var i = 0; i < args.length; i++) {
              if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                  return args[i][key];
              }
          }
          return match;
      }
  }.bind(str));

}

},{}],168:[function(require,module,exports){
var format, locale;

format = require("./format.js");

locale = require("../core/locale/languages/en_US.coffee").ui;

module.exports = function(list, andText, max, moreText) {
  var amount;
  if (!(list instanceof Array)) {
    return list;
  } else {
    list = list.slice(0);
  }
  if (!andText) {
    andText = locale.and;
  }
  if (!moreText) {
    moreText = locale.moreText;
  }
  if (list.length === 2) {
    return list.join(" " + andText + " ");
  } else {
    if (max && list.length > max) {
      amount = list.length - max + 1;
      list = list.slice(0, max - 1);
      list[max - 1] = format(moreText, amount);
    }
    if (list.length > 1) {
      list[list.length - 1] = andText + " " + list[list.length - 1];
    }
    return list.join(", ");
  }
};



},{"../core/locale/languages/en_US.coffee":71,"./format.js":167}],169:[function(require,module,exports){
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Removes all non ASCII characters
//------------------------------------------------------------------------------
module.exports = function(str) {

  var removed = [ "!","@","#","$","%","^","&","*","(",")",
                  "[","]","{","}",".",",","/","\\","|",
                  "'","\"",";",":","<",">","?","=","+"];

  var diacritics = [
      [/[\300-\306]/g, "A"],
      [/[\340-\346]/g, "a"],
      [/[\310-\313]/g, "E"],
      [/[\350-\353]/g, "e"],
      [/[\314-\317]/g, "I"],
      [/[\354-\357]/g, "i"],
      [/[\322-\330]/g, "O"],
      [/[\362-\370]/g, "o"],
      [/[\331-\334]/g, "U"],
      [/[\371-\374]/g, "u"],
      [/[\321]/g, "N"],
      [/[\361]/g, "n"],
      [/[\307]/g, "C"],
      [/[\347]/g, "c"]
  ];

  str += "";

  return ""+str.replace(/[^A-Za-z0-9\-_]/g, function(chr) {

    if (" " === chr) {
      return "_";
    }
    else if (removed.indexOf(chr) >= 0) {
      return "";
    }

    var ret = chr;
    for (var d = 0; d < diacritics.length; d++) {
      if (new RegExp(diacritics[d][0]).test(chr)) {
        ret = diacritics[d][1];
        break;
      }
    }

    return ret;

  });

};

},{}],170:[function(require,module,exports){
var defaultLocale;

defaultLocale = require("../core/locale/languages/en_US.coffee");

module.exports = function(text, opts) {
  var biglow, bigs, key, locale, smalls;
  if (!text) {
    return "";
  }
  if (!opts) {
    opts = {};
  }
  key = opts.key;
  if (text.charAt(text.length - 1) === ".") {
    return text.charAt(0).toUpperCase() + text.substr(1);
  }
  locale = "locale" in this ? this.locale.value : defaultLocale;
  smalls = locale.lowercase.map(function(b) {
    return b.toLowerCase();
  });
  bigs = locale.uppercase;
  bigs = bigs.concat(bigs.map(function(b) {
    return b + "s";
  }));
  biglow = bigs.map(function(b) {
    return b.toLowerCase();
  });
  return text.replace(/\S*/g, function(txt, i) {
    var bigindex, new_txt, prefix;
    if (txt) {
      if (/^[^\W\s]/.test(txt)) {
        prefix = "";
      } else {
        prefix = txt.charAt(0);
        txt = txt.slice(1);
      }
      bigindex = biglow.indexOf(txt.toLowerCase());
      if (bigindex >= 0) {
        new_txt = bigs[bigindex];
      } else if (smalls.indexOf(txt.toLowerCase()) >= 0 && i !== 0 && i !== text.length - 1) {
        new_txt = txt.toLowerCase();
      } else {
        new_txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
      return prefix + new_txt;
    } else {
      return "";
    }
  });
};



},{"../core/locale/languages/en_US.coffee":71}],171:[function(require,module,exports){
var foreign, tspan;

foreign = require("./foreign.coffee");

tspan = require("./tspan.coffee");

module.exports = function(vars) {
  if (vars.text.html.value) {
    foreign(vars);
  } else {
    tspan(vars);
  }
};



},{"./foreign.coffee":172,"./tspan.coffee":175}],172:[function(require,module,exports){
module.exports = function(vars) {
  var anchor, color, family, opacity, text;
  text = vars.container.value;
  family = text.attr("font-family") || text.style("font-family");
  anchor = vars.align.value || text.attr("text-anchor") || text.style("text-anchor");
  color = text.attr("fill") || text.style("fill");
  opacity = text.attr("opacity") || text.style("opacity");
  anchor = anchor === "end" ? "right" : (anchor === "middle" ? "center" : "left");
  d3.select(text.node().parentNode).append("foreignObject").attr("width", vars.width.value + "px").attr("height", vars.height.value + "px").attr("x", "0px").attr("y", "0px").append("xhtml:div").style("font-family", family).style("font-size", vars.size.value[1] + "px").style("color", color).style("text-align", anchor).style("opacity", opacity).text(vars.text.current);
};



},{}],173:[function(require,module,exports){
module.exports = function(vars) {
  var diff, elem, height, prev, radius, shape, size, width, x, y;
  elem = vars.container.value;
  prev = elem.node().previousElementSibling;
  shape = prev ? prev.tagName.toLowerCase() : "";
  if (prev) {
    prev = d3.select(prev);
  }
  vars.container.x = vars.x.value || parseFloat(elem.attr("x"), 10);
  vars.container.y = vars.y.value || parseFloat(elem.attr("y"), 10);
  if (prev) {
    if (vars.shape.accepted.indexOf(shape) >= 0) {
      vars.self.shape(shape);
    }
    if (shape === "rect") {
      x = parseFloat(prev.attr("x"), 10) || 0;
      y = parseFloat(prev.attr("y"), 10) || 0;
      if (!vars.padding.value) {
        diff = Math.abs(x - vars.container.x);
        if (diff) {
          vars.self.padding(diff);
        }
      }
      if (!vars.container.x) {
        vars.container.x = x + vars.padding.value;
      }
      if (!vars.container.y) {
        vars.container.y = y + vars.padding.value;
      }
      if (!vars.width.value) {
        width = parseFloat(prev.attr("width" || prev.style("width", 10)));
        vars.self.width(width);
      }
      if (!vars.height.value) {
        height = parseFloat(prev.attr("height" || prev.style("height", 10)));
        vars.self.height(height);
      }
    } else if (shape === "circle") {
      radius = parseFloat(prev.attr("r"), 10);
      x = parseFloat(prev.attr("cx"), 10) || 0;
      x -= radius;
      y = parseFloat(prev.attr("cy"), 10) || 0;
      y -= radius;
      if (!vars.padding.value) {
        diff = Math.abs(x - vars.container.x);
        if (diff) {
          vars.self.padding(diff);
        }
      }
      if (!vars.container.x) {
        vars.container.x = x + vars.padding.value;
      }
      if (!vars.container.y) {
        vars.container.y = y + vars.padding.value;
      }
      if (!vars.width.value) {
        vars.self.width(radius * 2, 10);
      }
      if (!vars.height.value) {
        vars.self.height(radius * 2, 10);
      }
    } else {
      if (!vars.width.value) {
        vars.self.width(500);
      }
      if (!vars.height.value) {
        vars.self.height(500);
      }
    }
  }
  if (!vars.container.x) {
    vars.container.x = 0;
  }
  if (!vars.container.y) {
    vars.container.y = 0;
  }
  vars.width.inner = vars.width.value - vars.padding.value * 2;
  vars.height.inner = vars.height.value - vars.padding.value * 2;
  size = elem.attr("font-size") || elem.style("font-size");
  size = parseFloat(size, 10);
  vars.container.fontSize = size;
  vars.container.dy = parseFloat(elem.attr("dy"), 10);
  if (!vars.size.value) {
    if (vars.resize.value) {
      return vars.self.size([size, size * 2]);
    } else {
      return vars.self.size([size / 2, size]);
    }
  }
};



},{}],174:[function(require,module,exports){
module.exports = function(vars) {
  var text;
  if (!vars.text.value) {
    text = vars.container.value.text();
    if (text) {
      if (text.indexOf("tspan") >= 0) {
        text.replace(/\<\/tspan\>\<tspan\>/g, " ");
        text.replace(/\<\/tspan\>/g, "");
        text.replace(/\<tspan\>/g, "");
      }
      text = text.replace(/(\r\n|\n|\r)/gm, "");
      text = text.replace(/^\s+|\s+$/g, "");
      vars.self.text(text);
    }
  }
  if (vars.text.value instanceof Array) {
    vars.text.phrases = vars.text.value.filter(function(t) {
      return ["string", "number"].indexOf(typeof t) >= 0;
    });
  } else {
    vars.text.phrases = [vars.text.value + ""];
  }
  if (!vars.align.value) {
    return vars.container.align = vars.container.value.style("text-anchor") || vars.container.value.attr("text-anchor");
  }
};



},{}],175:[function(require,module,exports){
module.exports = function(vars) {
  var anchor, dx, dy, ellipsis, fontSize, h, height, line, lineWidth, lines, mirror, newLine, placeWord, progress, reverse, rmod, rotate, rx, ry, space, start, textBox, translate, truncate, valign, width, words, wrap, x, y, yOffset;
  newLine = function(w, first) {
    var tspan;
    if (!w) {
      w = "";
    }
    if (!reverse || first) {
      tspan = vars.container.value.append("tspan");
    } else {
      tspan = vars.container.value.insert("tspan", "tspan");
    }
    return tspan.attr("x", x + "px").attr("dx", dx + "px").attr("dy", dy + "px").style("baseline-shift", "0%").attr("dominant-baseline", "alphabetical").text(w);
  };
  mirror = vars.rotate.value === -90 || vars.rotate.value === 90;
  width = mirror ? vars.height.inner : vars.width.inner;
  height = mirror ? vars.width.inner : vars.height.inner;
  if (vars.shape.value === "circle") {
    anchor = "middle";
  } else {
    anchor = vars.align.value || vars.container.align || "start";
  }
  if (anchor === "end") {
    dx = width;
  } else if (anchor === "middle") {
    dx = width / 2;
  } else {
    dx = 0;
  }
  valign = vars.valign.value || "top";
  x = vars.container.x;
  fontSize = vars.resize.value ? vars.size.value[1] : vars.container.fontSize || vars.size.value[0];
  dy = vars.container.dy || fontSize * 1.1;
  textBox = null;
  progress = null;
  words = null;
  reverse = false;
  yOffset = 0;
  if (vars.shape.value === "circle") {
    if (valign === "middle") {
      yOffset = ((height / dy % 1) * dy) / 2;
    } else if (valign === "end") {
      yOffset = (height / dy % 1) * dy;
    }
  }
  vars.container.value.attr("text-anchor", anchor).attr("font-size", fontSize + "px").style("font-size", fontSize + "px").attr("x", vars.container.x).attr("y", vars.container.y);
  truncate = function() {
    textBox.remove();
    line--;
    if (line !== 1) {
      if (reverse) {
        textBox = vars.container.value.select("tspan");
      } else {
        textBox = d3.select(vars.container.value.node().lastChild);
      }
    }
    if (!textBox.empty()) {
      words = textBox.text().match(/[^\s-]+-?/g);
      return ellipsis();
    }
  };
  lineWidth = function() {
    var b;
    if (vars.shape.value === "circle") {
      b = ((line - 1) * dy) + yOffset;
      if (b > height / 2) {
        b += dy;
      }
      return 2 * Math.sqrt(b * ((2 * (width / 2)) - b));
    } else {
      return width;
    }
  };
  ellipsis = function() {
    var lastChar, lastWord;
    if (words && words.length) {
      lastWord = words.pop();
      lastChar = lastWord.charAt(lastWord.length - 1);
      if (lastWord.length === 1 && vars.text.split.value.indexOf(lastWord) >= 0) {
        return ellipsis();
      } else {
        if (vars.text.split.value.indexOf(lastChar) >= 0) {
          lastWord = lastWord.substr(0, lastWord.length - 1);
        }
        textBox.text(words.join(" ") + " " + lastWord + " ...");
        if (textBox.node().getComputedTextLength() > lineWidth()) {
          return ellipsis();
        }
      }
    } else {
      return truncate();
    }
  };
  placeWord = function(word) {
    var current, joiner, next_char;
    current = textBox.text();
    if (reverse) {
      next_char = vars.text.current.charAt(vars.text.current.length - progress.length - 1);
      joiner = next_char === " " ? " " : "";
      progress = word + joiner + progress;
      textBox.text(word + joiner + current);
    } else {
      next_char = vars.text.current.charAt(progress.length);
      joiner = next_char === " " ? " " : "";
      progress += joiner + word;
      textBox.text(current + joiner + word);
    }
    if (textBox.node().getComputedTextLength() > lineWidth()) {
      textBox.text(current);
      textBox = newLine(word);
      if (reverse) {
        return line--;
      } else {
        return line++;
      }
    }
  };
  start = 1;
  line = null;
  lines = null;
  wrap = function() {
    var i, len, next_char, unsafe, word;
    vars.container.value.selectAll("tspan").remove();
    vars.container.value.html("");
    words = vars.text.words.slice(0);
    if (reverse) {
      words.reverse();
    }
    progress = words[0];
    textBox = newLine(words.shift(), true);
    line = start;
    for (i = 0, len = words.length; i < len; i++) {
      word = words[i];
      if (line * dy > height) {
        truncate();
        break;
      }
      placeWord(word);
      unsafe = true;
      while (unsafe) {
        next_char = vars.text.current.charAt(progress.length + 1);
        unsafe = vars.text.split.value.indexOf(next_char) >= 0;
        if (unsafe) {
          placeWord(next_char);
        }
      }
    }
    return lines = Math.abs(line - start) + 1;
  };
  wrap();
  lines = line;
  if (vars.shape.value === "circle") {
    space = height - lines * dy;
    if (space > dy) {
      if (valign === "middle") {
        start = (space / dy / 2 >> 0) + 1;
        wrap();
      } else if (valign === "bottom") {
        reverse = true;
        start = height / dy >> 0;
        wrap();
      }
    }
  }
  if (valign === "top") {
    y = 0;
  } else {
    h = lines * dy;
    y = valign === "middle" ? height / 2 - h / 2 : height - h;
  }
  y -= dy * 0.2;
  translate = "translate(0," + y + ")";
  if (vars.rotate.value === 180 || vars.rotate.value === -180) {
    rx = vars.container.x + width / 2;
    ry = vars.container.y + height / 2;
  } else {
    rmod = vars.rotate.value < 0 ? width : height;
    rx = vars.container.x + rmod / 2;
    ry = vars.container.y + rmod / 2;
  }
  rotate = "rotate(" + vars.rotate.value + ", " + rx + ", " + ry + ")";
  return vars.container.value.attr("transform", rotate + translate);
};



},{}],176:[function(require,module,exports){
var flow, fontSizes, resize, wrap;

flow = require("./flow.coffee");

fontSizes = require("../../font/sizes.coffee");

wrap = function(vars) {
  var firstChar;
  if (vars.text.phrases.length) {
    vars.text.current = vars.text.phrases.shift() + "";
    vars.text.words = vars.text.current.match(vars.text["break"]);
    firstChar = vars.text.current.charAt(0);
    if (firstChar !== vars.text.words[0].charAt(0)) {
      vars.text.words[0] = firstChar + vars.text.words[0];
    }
    vars.container.value.text("");
    if (vars.resize.value) {
      resize(vars);
    } else {
      flow(vars);
    }
  }
};

module.exports = wrap;

resize = function(vars) {
  var addon, areaMod, areaRatio, boxArea, height, heightMax, i, lineWidth, maxWidth, mirror, sizeMax, sizeRatio, sizes, textArea, width, widthRatio, words;
  words = [];
  i = 0;
  while (i < vars.text.words.length) {
    addon = (i === vars.text.words.length - 1 ? "" : " ");
    words.push(vars.text.words[i] + addon);
    i++;
  }
  mirror = vars.rotate.value === -90 || vars.rotate.value === 90;
  width = mirror ? vars.height.inner : vars.width.inner;
  height = mirror ? vars.width.inner : vars.height.inner;
  sizeMax = Math.floor(vars.size.value[1]);
  lineWidth = vars.shape.value === "circle" ? width * 0.75 : width;
  sizes = fontSizes(words, {
    "font-size": sizeMax + "px",
    parent: vars.container.value
  });
  maxWidth = d3.max(sizes, function(d) {
    return d.width;
  });
  areaMod = 1.165 + (width / height * 0.11);
  textArea = d3.sum(sizes, function(d) {
    var h;
    h = vars.container.dy || sizeMax * 1.1;
    return d.width * h;
  }) * areaMod;
  if (vars.shape.value === "circle") {
    boxArea = Math.PI * Math.pow(width / 2, 2);
  } else {
    boxArea = lineWidth * height;
  }
  if (maxWidth > lineWidth || textArea > boxArea) {
    areaRatio = Math.sqrt(boxArea / textArea);
    widthRatio = lineWidth / maxWidth;
    sizeRatio = d3.min([areaRatio, widthRatio]);
    sizeMax = d3.max([vars.size.value[0], Math.floor(sizeMax * sizeRatio)]);
  }
  heightMax = Math.floor(height * 0.8);
  if (sizeMax > heightMax) {
    sizeMax = heightMax;
  }
  if (maxWidth * (sizeMax / vars.size.value[1]) <= lineWidth) {
    if (sizeMax !== vars.size.value[1]) {
      vars.self.size([vars.size.value[0], sizeMax]);
    }
    flow(vars);
  } else {
    wrap(vars);
  }
};



},{"../../font/sizes.coffee":97,"./flow.coffee":171}],177:[function(require,module,exports){
module.exports = {
  accepted: [false, "start", "middle", "end", "left", "center", "right"],
  process: function(value) {
    var css;
    css = ["left", "center", "right"].indexOf(value);
    if (css >= 0) {
      value = this.accepted[css + 1];
    }
    return value;
  },
  value: false
};



},{}],178:[function(require,module,exports){
module.exports = {
  accepted: [Object],
  objectAccess: false,
  process: function(value, vars) {
    var method, setting;
    for (method in value) {
      setting = value[method];
      if (method in vars.self) {
        vars.self[method](setting);
      }
    }
    return value;
  },
  value: {}
};



},{}],179:[function(require,module,exports){
var d3selection;

d3selection = require("../../util/d3selection.coffee");

module.exports = {
  accepted: [false, Array, Object, String],
  element: false,
  id: "default",
  process: function(value) {
    if (value === false) {
      return false;
    } else if (d3selection(value)) {
      return value;
    } else if (value instanceof Array) {
      return d3.select(value[0][0]);
    } else {
      return d3.select(value);
    }
  },
  value: false
};



},{"../../util/d3selection.coffee":202}],180:[function(require,module,exports){
module.exports = {
  accepted: [Boolean],
  value: false
};



},{}],181:[function(require,module,exports){
var print, stringFormat;

print = require("../../core/console/print.coffee");

stringFormat = require("../../string/format.js");

module.exports = {
  accepted: [void 0],
  process: function(value, vars) {
    var str;
    if (this.initialized === false) {
      return value;
    }
    if (vars.container.value === false) {
      str = vars.format.locale.value.dev.setContainer;
      print.warning(str, "container");
    } else if (vars.container.value.empty()) {
      str = vars.format.locale.value.dev.noContainer;
      print.warning(stringFormat(str, "\"" + vars.container.value + "\""), "container");
    } else {
      if (vars.dev.value) {
        print.time("total draw time");
      }
      vars.container.value.call(vars.self);
    }
    return value;
  },
  value: void 0
};



},{"../../core/console/print.coffee":54,"../../string/format.js":167}],182:[function(require,module,exports){
var locale, mergeObject;

locale = require("../../core/locale/locale.coffee");

mergeObject = require("../../object/merge.coffee");

module.exports = {
  accepted: [Function, String],
  locale: {
    accepted: function() {
      return d3.keys(locale);
    },
    process: function(value) {
      var defaultLocale, returnObject;
      defaultLocale = "en_US";
      returnObject = locale[defaultLocale];
      if (value !== defaultLocale) {
        returnObject = mergeObject(returnObject, locale[value]);
      }
      this.language = value;
      return returnObject;
    },
    value: "en_US"
  },
  process: function(value, vars) {
    if (this.initialized && typeof value === "string") {
      vars.self.format({
        locale: value
      });
    } else {
      if (typeof value === "function") {
        return value;
      }
    }
    return this.value;
  },
  value: "en_US"
};



},{"../../core/locale/locale.coffee":75,"../../object/merge.coffee":165}],183:[function(require,module,exports){
module.exports = {
  accepted: [false, Number],
  value: false
};



},{}],184:[function(require,module,exports){
module.exports = {
  accepted: [Number],
  value: 0
};



},{}],185:[function(require,module,exports){
module.exports = {
  accepted: [Boolean],
  value: false
};



},{}],186:[function(require,module,exports){
module.exports = {
  accepted: [-180, -90, 0, 90, 180],
  value: 0
};



},{}],187:[function(require,module,exports){
module.exports = {
  accepted: ["circle", "square"],
  value: false
};



},{}],188:[function(require,module,exports){
module.exports = {
  accepted: [Array, false],
  value: false
};



},{}],189:[function(require,module,exports){
module.exports = {
  accepted: [false, Array, Number, String],
  html: {
    accepted: [Boolean],
    value: false
  },
  init: function(vars) {
    var s;
    s = this.split.value;
    this["break"] = new RegExp("[^\\s\\" + s.join("\\") + "]+\\" + s.join("?\\") + "?", "g");
    return false;
  },
  split: {
    accepted: [Array],
    value: ["-", "/", ";", ":", "&"]
  }
};



},{}],190:[function(require,module,exports){
module.exports = {
  accepted: [false, "top", "middle", "bottom"],
  value: false
};



},{}],191:[function(require,module,exports){
module.exports = {
  accepted: [false, Number],
  value: false
};



},{}],192:[function(require,module,exports){
module.exports = {
  accepted: [false, Number],
  value: false
};



},{}],193:[function(require,module,exports){
module.exports = {
  accepted: [false, Number],
  value: false
};



},{}],194:[function(require,module,exports){
var attach, print, sizes, text, wrap;

attach = require("../core/methods/attach.coffee");

sizes = require("./helpers/parseSize.coffee");

print = require("../core/console/print.coffee");

text = require("./helpers/parseText.coffee");

wrap = require("./helpers/wrap.coffee");

module.exports = function() {
  var vars;
  vars = {
    self: function(selection) {
      selection.each(function() {
        sizes(vars);
        if (vars.size.value[0] <= vars.height.inner) {
          text(vars);
          wrap(vars);
        } else {
          vars.container.value.html("");
        }
        if (vars.dev.value) {
          print.timeEnd("total draw time");
        }
      });
      return vars.self;
    }
  };
  attach(vars, {
    align: require("./methods/align.coffee"),
    config: require("./methods/config.coffee"),
    container: require("./methods/container.coffee"),
    dev: require("./methods/dev.coffee"),
    draw: require("./methods/draw.coffee"),
    format: require("./methods/format.coffee"),
    height: require("./methods/height.coffee"),
    padding: require("./methods/padding.coffee"),
    resize: require("./methods/resize.coffee"),
    rotate: require("./methods/rotate.coffee"),
    text: require("./methods/text.coffee"),
    shape: require("./methods/shape.coffee"),
    size: require("./methods/size.coffee"),
    valign: require("./methods/valign.coffee"),
    width: require("./methods/width.coffee"),
    x: require("./methods/x.coffee"),
    y: require("./methods/y.coffee")
  });
  return vars.self;
};



},{"../core/console/print.coffee":54,"../core/methods/attach.coffee":76,"./helpers/parseSize.coffee":173,"./helpers/parseText.coffee":174,"./helpers/wrap.coffee":176,"./methods/align.coffee":177,"./methods/config.coffee":178,"./methods/container.coffee":179,"./methods/dev.coffee":180,"./methods/draw.coffee":181,"./methods/format.coffee":182,"./methods/height.coffee":183,"./methods/padding.coffee":184,"./methods/resize.coffee":185,"./methods/rotate.coffee":186,"./methods/shape.coffee":187,"./methods/size.coffee":188,"./methods/text.coffee":189,"./methods/valign.coffee":190,"./methods/width.coffee":191,"./methods/x.coffee":192,"./methods/y.coffee":193}],195:[function(require,module,exports){
var defaultLocale = require("../core/locale/languages/en_US.coffee"),
    events        = require("../client/pointer.coffee"),
    legible       = require("../color/legible.coffee"),
    move          = require("./move.coffee"),
    prefix        = require("../client/prefix.coffee"),
    rtl           = require("../client/rtl.coffee"),
    removeTooltip = require("./remove.coffee"),
    stringList    = require("../string/list.coffee"),
    textColor     = require("../color/text.coffee")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Create a Tooltip
//-------------------------------------------------------------------
module.exports = function(params) {

  var default_width = params.fullscreen ? 250 : 200
    , vendor = prefix()
  params.width = params.width || default_width
  params.max_width = params.max_width || 386
  params.id = params.id || "default"
  params.size = params.fullscreen || params.html ? "large" : "small"
  params.offset = params.offset || 0
  params.arrow_offset = params.arrow ? 8 : 0
  params.x = params.x || 0
  params.y = params.y || 0
  params.parent = params.parent || d3.select("body")
  params.curtain = params.curtain || "#fff"
  params.curtainopacity = params.curtainopacity || 0.8
  params.background = params.background || "#fff"
  params.fontcolor = params.fontcolor || "#444"
  params.fontfamily = params.fontfamily || "sans-serif"
  params.fontweight = params.fontweight || "normal"
  params.fontsize = params.fontsize || "12px"
  params.style = params.style || "default"
  params.zindex = params.size == "small" ? 2000 : 500
  params.locale = params.locale || defaultLocale


  var parentHeight = params.parent ? params.parent.node().offsetHeight
                  || params.parent.node().getBoundingClientRect().height : 0

  if (!params.iconsize) {
    params.iconsize = params.size == "small" ? 22 : 50
  }

  if (params.parent.node() === document.body) {
    params.limit = [window.innerWidth + window.scrollX, window.innerHeight + window.scrollY];
  }
  else {
    params.limit = [
      parseFloat(params.parent.style("width"),10),
      parseFloat(params.parent.style("height"),10)
    ];
  }

  if ( params.title instanceof Array ) {

    var and = params.locale.ui.and
      , more = params.locale.ui.more

    params.title = stringList( params.title , and , 3 , more )

  }

  removeTooltip(params.id)

  params.anchor = {}
  if (params.fullscreen) {
    params.anchor.x = "center"
    params.anchor.y = "center"
    params.x = params.parent ? params.parent.node().offsetWidth/2 : window.innerWidth/2
    params.y = params.parent ? parentHeight/2 : window.innerHeight/2
  }
  else if (params.align) {
    var a = params.align.split(" ")
    params.anchor.y = a[0]
    if (a[1]) params.anchor.x = a[1]
    else params.anchor.x = "center"
  }
  else {
    params.anchor.x = "center"
    params.anchor.y = "top"
  }

  var title_width = params.width - 30

  if (params.fullscreen) {
    var curtain = params.parent.append("div")
      .attr("id","d3plus_tooltip_curtain_"+params.id)
      .attr("class","d3plus_tooltip_curtain")
      .style("background-color",params.curtain)
      .style("opacity",params.curtainopacity)
      .style("position","absolute")
      .style("z-index",499)
      .style("top","0px")
      .style("right","0px")
      .style("bottom","0px")
      .style("left","0px")
      .on(events.click,function(){
        removeTooltip(params.id)
      })
  }

  var tooltip = params.parent.append("div")
    .datum(params)
    .attr("id","d3plus_tooltip_id_"+params.id)
    .attr("class","d3plus_tooltip d3plus_tooltip_"+params.size)
    .style("color",params.fontcolor)
    .style("font-family",params.fontfamily)
    .style("font-weight",params.fontweight)
    .style("font-size",params.fontsize+"px")
    .style(vendor+"box-shadow","0px 1px 3px rgba(0, 0, 0, 0.25)")
    .style("position","absolute")
    // .style("z-index",params.zindex)
    .on(events.out, close_descriptions)

  if (params.max_height) {
    tooltip.style("max-height",params.max_height+"px")
  }

  if (params.fixed) {
    tooltip.style("z-index",500)
    params.mouseevents = true
  }
  else {
    tooltip.style("z-index",2000)
  }

  var container = tooltip.append("div")
    .datum(params)
    .attr("class","d3plus_tooltip_container")
    .style("background-color",params.background)
    .style("padding","6px")

  if (params.fullscreen && params.html) {

    w = params.parent ? params.parent.node().offsetWidth*0.75 : window.innerWidth*0.75
    h = params.parent ? parentHeight*0.75 : window.innerHeight*0.75

    container
      .style("width",w+"px")
      .style("height",h+"px")

    var body = container.append("div")
      .attr("class","d3plus_tooltip_body")
      .style("padding-right","6px")
      .style("display","inline-block")
      .style("z-index",1)
      .style("width",params.width+"px")

  }
  else {

    if (params.width == "auto") {
      var w = "auto"
      container.style("max-width",params.max_width+"px")
    }
    else var w = params.width-14+"px"

    var body = container
      .style("width",w)

  }

  if (params.title || params.icon) {
    var header = body.append("div")
      .attr("class","d3plus_tooltip_header")
      .style("position","relative")
      .style("z-index",1)
  }

  if (params.fullscreen) {
    var close = tooltip.append("div")
      .attr("class","d3plus_tooltip_close")
      .style("background-color",params.color)
      .style("color",textColor(params.color))
      .style("position","absolute")
      .style(vendor+"box-shadow","0 1px 3px rgba(0, 0, 0, 0.25)")
      .style("font-size","20px")
      .style("height","18px")
      .style("line-height","14px")
      .style("text-align","center")
      .style("right","16px")
      .style("top","-10px")
      .style("width","18px")
      .style("z-index",10)
      .html("\&times;")
      .on(events.over,function(){
        d3.select(this)
          .style("cursor","pointer")
          .style(vendor+"box-shadow","0 1px 3px rgba(0, 0, 0, 0.5)")
      })
      .on(events.out,function(){
        d3.select(this)
          .style("cursor","auto")
          .style(vendor+"box-shadow","0 1px 3px rgba(0, 0, 0, 0.25)")
      })
      .on(events.click,function(){
        removeTooltip(params.id)
      })
  }

  if (!params.mouseevents) {
    tooltip.style("pointer-events","none")
  }
  else if (params.mouseevents !== true) {

    var oldout = d3.select(params.mouseevents).on(events.out)

    var newout = function() {

      var target = d3.event.toElement || d3.event.relatedTarget
      if (target) {
        var c = typeof target.className == "string" ? target.className : target.className.baseVal
        var istooltip = c.indexOf("d3plus_tooltip") == 0
      }
      else {
        var istooltip = false
      }
      if (!target || (!ischild(tooltip.node(),target) && !ischild(params.mouseevents,target) && !istooltip)) {
        oldout(d3.select(params.mouseevents).datum())
        close_descriptions()
        d3.select(params.mouseevents).on(events.out,oldout)
      }
    }

    var ischild = function(parent, child) {
       var node = child.parentNode;
       while (node !== null) {
         if (node == parent) {
           return true;
         }
         node = node.parentNode;
       }
       return false;
    }

    d3.select(params.mouseevents).on(events.out,newout)
    tooltip.on(events.out,newout)

    var move_event = d3.select(params.mouseevents).on(events.move)
    if (move_event) {
      tooltip.on(events.move,move_event)
    }

  }

  if (params.arrow) {
    var arrow = tooltip.append("div")
      .attr("class","d3plus_tooltip_arrow")
      .style("background-color",params.background)
      .style(vendor+"box-shadow","0px 1px 3px rgba(0, 0, 0, 0.25)")
      .style("position","absolute")
      .style("bottom","-5px")
      .style("height","10px")
      .style("left","50%")
      .style("margin-left","-5px")
      .style("width","10px")
      .style(vendor+"transform","rotate(45deg)")
      .style("z-index",-1)
  }

  if (params.icon) {

    var title_icon = header.append("div")
      .attr("class","d3plus_tooltip_icon")
      .style("width",params.iconsize+"px")
      .style("height",params.iconsize+"px")
      .style("z-index",1)
      .style("background-position","50%")
      .style("background-size","100%")
      .style("background-image","url("+params.icon+")")
      .style("display","inline-block")
      .style("margin","0px 3px 3px 0px")

    if (params.style == "knockout") {
      title_icon.style("background-color",params.color)
    }

    title_width -= title_icon.node().offsetWidth
  }

  if (params.title) {
    var mw = params.max_width-6
    if ( params.icon ) mw -= (params.iconsize+6)
    mw += "px"

    var title = header.append("div")
      .attr("class","d3plus_tooltip_title")
      .style("max-width",mw)
      .style("color",!params.icon ? legible(params.color) : params.fontcolor)
      .style("vertical-align","top")
      .style("width",title_width+"px")
      .style("display","inline-block")
      .style("overflow","hidden")
      .style("text-overflow","ellipsis")
      .style("word-wrap","break-word")
      .style("z-index",1)
      .style("font-size",params.size === "large" ? "18px" : "16px")
      .style("line-height",params.size === "large" ? "20px" : "17px")
      .style("padding",params.size === "large" ? "3px 6px" : "3px")
      .text(params.title)
  }

  if (params.description) {
    var description = body.append("div")
      .attr("class","d3plus_tooltip_description")
      .style("font-size","12px")
      .style("padding","6px")
      .text(params.description)
  }

  if (params.data || params.html && !params.fullscreen) {

    var data_container = body.append("div")
      .attr("class","d3plus_tooltip_data_container")
      .style("overflow-y","auto")
      .style("z-index",-1)
  }

  if (params.data) {

    var val_width = 0, val_heights = {}

    var last_group = null
    params.data.forEach(function(d,i){

      if (d.group) {
        if (last_group != d.group) {
          last_group = d.group
          data_container.append("div")
            .attr("class","d3plus_tooltip_data_title")
            .style("font-size","12px")
            .style("font-weight","bold")
            .style("padding","6px 3px 0px 3px")
            .text(d.group)
        }
      }

      var block = data_container.append("div")
        .attr("class","d3plus_tooltip_data_block")
        .style("font-size","12px")
        .style("padding","3px 6px")
        .style("position","relative")
        .datum(d)

      if ( d.highlight === true ) {
        block.style("color",legible(params.color))
      }
      else if ( d.allColors || d.highlight !== params.color ) {
        block.style("color",legible(d.highlight))
      }

      var name = block.append("div")
          .attr("class","d3plus_tooltip_data_name")
          .style("display","inline-block")
          .html(d.name)
          .on(events.out,function(){
            d3.event.stopPropagation()
          })

      if (d.link) {
        name
          .style("cursor","pointer")
          .on(events.click,d.link)
      }

      if ( d.value instanceof Array ) {

        var and = params.locale.ui.and
          , more = params.locale.ui.more

        d.value = list( d.value , and , 3 , more )

      }

      var val = block.append("div")
          .attr("class","d3plus_tooltip_data_value")
          .style("display","block")
          .style("position","absolute")
          .style("text-align","right")
          .style("top","3px")
          .html(d.value)
          .on(events.out,function(){
            d3.event.stopPropagation()
          })

      if (rtl) {
        val.style("left","6px")
      }
      else {
        val.style("right","6px")
      }

      if (params.mouseevents && d.desc) {
        var desc = block.append("div")
          .attr("class","d3plus_tooltip_data_desc")
          .style("color","#888")
          .style("overflow","hidden")
          .style(vendor+"transition","height 0.5s")
          .style("width","85%")
          .text(d.desc)
          .on(events.out,function(){
            d3.event.stopPropagation()
          })

        var dh = desc.node().offsetHeight || desc.node().getBoundingClientRect().height

        desc.style("height","0px")

        var help = name.append("div")
          .attr("class","d3plus_tooltip_data_help")
          .style("background-color","#ccc")
          .style(vendor+"border-radius","5px")
          .style("color","#fff")
          .style("cursor","pointer")
          .style("display","inline-block")
          .style("font-size","8px")
          .style("font-weight","bold")
          .style("height","10px")
          .style("margin","3px 0px 0px 3px")
          .style("padding-right","1px")
          .style("text-align","center")
          .style("width","10px")
          .style("vertical-align","top")
          .style(prefix+"transition","background-color 0.5s")
          .text("?")
          .on(events.over,function(){
            var c = d3.select(this.parentNode.parentNode).style("color")
            d3.select(this).style("background-color",c)
            desc.style("height",dh+"px")
          })
          .on(events.out,function(){
            d3.event.stopPropagation()
          })

        name
          .style("cursor","pointer")
          .on(events.over,function(){
            close_descriptions()
            var c = d3.select(this.parentNode).style("color")
            help.style("background-color",c)
            desc.style("height",dh+"px")
          })

        block.on(events.out,function(){
          d3.event.stopPropagation()
          close_descriptions()
        })
      }

      var w = parseFloat(val.style("width"),10)
      if (w > params.width/2) w = params.width/2
      if (w > val_width) val_width = w

      if (i != params.data.length-1) {
        if ((d.group && d.group == params.data[i+1].group) || !d.group && !params.data[i+1].group)
        data_container.append("div")
          .attr("class","d3plus_tooltip_data_seperator")
          .style("background-color","#ddd")
          .style("display","block")
          .style("height","1px")
          .style("margin","0px 3px")
      }

    })

    data_container.selectAll(".d3plus_tooltip_data_name")
      .style("width",function(){
        var w = parseFloat(d3.select(this.parentNode).style("width"),10)
        return (w-val_width-30)+"px"
      })

    data_container.selectAll(".d3plus_tooltip_data_value")
      .style("width",val_width+"px")
      .each(function(d){
        var h = parseFloat(d3.select(this).style("height"),10)
        val_heights[d.name] = h
      })

    data_container.selectAll(".d3plus_tooltip_data_name")
      .style("min-height",function(d){
        return val_heights[d.name]+"px"
      })

  }

  if (params.html && !params.fullscreen) {
    data_container.append("div")
      .html(params.html)
  }

  var footer = body.append("div")
    .attr("class","d3plus_tooltip_footer")
    .style("font-size","10px")
    .style("position","relative")
    .style("text-align","center")

  if (params.footer) {
    footer.html(params.footer)
  }

  params.height = tooltip.node().offsetHeight || tooltip.node().getBoundingClientRect().height

  if (params.html && params.fullscreen) {
    var h = params.height-12
    var w = tooltip.node().offsetWidth-params.width-44
    container.append("div")
      .attr("class","d3plus_tooltip_html")
      .style("width",w+"px")
      .style("height",h+"px")
      .style("display","inline-block")
      .style("vertical-align","top")
      .style("overflow-y","auto")
      .style("padding","0px 12px")
      .style("position","absolute")
      .html(params.html)
  }

  params.width = tooltip.node().offsetWidth

  if (params.anchor.y != "center") params.height += params.arrow_offset
  else params.width += params.arrow_offset

  if (params.data || (!params.fullscreen && params.html)) {

    if (!params.fullscreen) {
      var limit = params.fixed ? parentHeight-params.y-10 : parentHeight-10
      var h = params.height < limit ? params.height : limit
    }
    else {
      var h = params.height
    }
    h -= parseFloat(container.style("padding-top"),10)
    h -= parseFloat(container.style("padding-bottom"),10)
    if (header) {
      h -= header.node().offsetHeight || header.node().getBoundingClientRect().height
      h -= parseFloat(header.style("padding-top"),10)
      h -= parseFloat(header.style("padding-bottom"),10)
    }
    if (footer) {
      h -= footer.node().offsetHeight || footer.node().getBoundingClientRect().height
      h -= parseFloat(footer.style("padding-top"),10)
      h -= parseFloat(footer.style("padding-bottom"),10)
    }

    data_container
      .style("max-height",h+"px")
  }

  params.height = tooltip.node().offsetHeight || tooltip.node().getBoundingClientRect().height

  move(params.x, params.y, params.id);

}



//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Function that closes ALL Descriptions
//-------------------------------------------------------------------
function close_descriptions() {
  d3.selectAll("div.d3plus_tooltip_data_desc").style("height","0px");
  d3.selectAll("div.d3plus_tooltip_data_help").style("background-color","#ccc");
}

},{"../client/pointer.coffee":41,"../client/prefix.coffee":42,"../client/rtl.coffee":43,"../color/legible.coffee":46,"../color/text.coffee":52,"../core/locale/languages/en_US.coffee":71,"../string/list.coffee":168,"./move.coffee":196,"./remove.coffee":197}],196:[function(require,module,exports){
var arrowStyle;

module.exports = function(x, y, id) {
  var d, mins, tooltip;
  if (!id) {
    id = "default";
  }
  tooltip = d3.select("div#d3plus_tooltip_id_" + id);
  if (tooltip.node()) {
    d = tooltip.datum();
    d.cx = x;
    d.cy = y;
    if (!d.fixed) {
      if (d.parent.node().tagName.toLowerCase() === "body") {
        mins = [window.scrollX, window.scrollY];
      } else {
        mins = [0, 0];
      }
      if (d.anchor.y !== "center") {
        if (d.anchor.x === "right") {
          d.x = d.cx - d.arrow_offset - 4;
        } else if (d.anchor.x === "center") {
          d.x = d.cx - d.width / 2;
        } else {
          if (d.anchor.x === "left") {
            d.x = d.cx - d.width + d.arrow_offset + 2;
          }
        }
        if (d.anchor.y === "bottom") {
          d.flip = d.cy + d.height + d.offset <= d.limit[1];
        } else {
          if (d.anchor.y === "top") {
            d.flip = d.cy - d.height - d.offset < mins[1];
          }
        }
        if (d.flip) {
          d.y = d.cy + d.offset + d.arrow_offset;
        } else {
          d.y = d.cy - d.height - d.offset - d.arrow_offset;
        }
      } else {
        d.y = d.cy - d.height / 2;
        if (d.anchor.x === "right") {
          d.flip = d.cx + d.width + d.offset <= d.limit[0];
        } else {
          if (d.anchor.x === "left") {
            d.flip = d.cx - d.width - d.offset < mins[0];
          }
        }
        if (d.anchor.x === "center") {
          d.flip = false;
          d.x = d.cx - d.width / 2;
        } else if (d.flip) {
          d.x = d.cx + d.offset + d.arrow_offset;
        } else {
          d.x = d.cx - d.width - d.offset;
        }
      }
      if (d.x < mins[0]) {
        d.x = mins[0];
      } else {
        if (d.x + d.width > d.limit[0]) {
          d.x = d.limit[0] - d.width;
        }
      }
      if (d.y < mins[1]) {
        d.y = mins[1];
      } else {
        if (d.y + d.height > d.limit[1]) {
          d.y = d.limit[1] - d.height;
        }
      }
    }
    tooltip.style("top", d.y + "px").style("left", d.x + "px");
    if (d.arrow) {
      tooltip.selectAll(".d3plus_tooltip_arrow").call(arrowStyle);
    }
  }
  return tooltip;
};

arrowStyle = function(arrow) {
  return arrow.style("bottom", function(d) {
    if (d.anchor.y !== "center" && !d.flip) {
      return "-5px";
    } else {
      return "auto";
    }
  }).style("right", function(d) {
    if (d.anchor.y === "center" && !d.flip) {
      return "-5px";
    } else {
      return "auto";
    }
  }).style("top", function(d) {
    if (d.anchor.y !== "center" && d.flip) {
      return "-5px";
    } else if (d.anchor.y === "center") {
      return "50%";
    } else {
      return "auto";
    }
  }).style("left", function(d) {
    if (d.anchor.y === "center" && d.flip) {
      return "-5px";
    } else if (d.anchor.y !== "center") {
      return "50%";
    } else {
      return "auto";
    }
  }).style("margin-left", function(d) {
    var arrow_x;
    if (d.anchor.y === "center") {
      return "auto";
    } else {
      if (d.anchor.x === "right") {
        arrow_x = -d.width / 2 + d.arrow_offset / 2;
      } else if (d.anchor.x === "left") {
        arrow_x = d.width / 2 - d.arrow_offset * 2 - 5;
      } else {
        arrow_x = -5;
      }
      if (d.cx - d.width / 2 - 5 < arrow_x) {
        arrow_x = d.cx - d.width / 2 - 5;
        if (arrow_x < 2 - d.width / 2) {
          arrow_x = 2 - d.width / 2;
        }
      } else if (-(d.limit[0] - d.cx - d.width / 2 + 5) > arrow_x) {
        arrow_x = -(d.limit[0] - d.cx - d.width / 2 + 5);
        if (arrow_x > d.width / 2 - 11) {
          arrow_x = d.width / 2 - 11;
        }
      }
      return arrow_x + "px";
    }
  }).style("margin-top", function(d) {
    var arrow_y;
    if (d.anchor.y !== "center") {
      return "auto";
    } else {
      if (d.anchor.y === "bottom") {
        arrow_y = -d.height / 2 + d.arrow_offset / 2 - 1;
      } else if (d.anchor.y === "top") {
        arrow_y = d.height / 2 - d.arrow_offset * 2 - 2;
      } else {
        arrow_y = -9;
      }
      if (d.cy - d.height / 2 - d.arrow_offset < arrow_y) {
        arrow_y = d.cy - d.height / 2 - d.arrow_offset;
        if (arrow_y < 4 - d.height / 2) {
          arrow_y = 4 - d.height / 2;
        }
      } else if (-(d.limit[1] - d.cy - d.height / 2 + d.arrow_offset) > arrow_y) {
        arrow_y = -(d.limit[1] - d.cy - d.height / 2 + d.arrow_offset);
        if (arrow_y > d.height / 2 - 22) {
          arrow_y = d.height / 2 - 22;
        }
      }
      return arrow_y + "px";
    }
  });
};



},{}],197:[function(require,module,exports){
module.exports = function(id) {
  if (id) {
    d3.selectAll("div#d3plus_tooltip_curtain_" + id).remove();
    return d3.selectAll("div#d3plus_tooltip_id_" + id).remove();
  } else {
    d3.selectAll("div.d3plus_tooltip_curtain").remove();
    return d3.selectAll("div.d3plus_tooltip").remove();
  }
};



},{}],198:[function(require,module,exports){
module.exports = function(arr, n) {
  var buckets, step;
  buckets = [];
  step = 1 / (n - 1) * (arr[1] - arr[0]);
  return d3.range(arr[0], arr[1] + step, step);
};



},{}],199:[function(require,module,exports){
var d3selection;

d3selection = require("./d3selection.coffee");

module.exports = function(parent, child) {
  var node;
  if (!parent || !child) {
    return false;
  }
  if (d3selection(parent)) {
    parent = parent.node();
  }
  if (d3selection(parent)) {
    child = child.node();
  }
  node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};



},{"./d3selection.coffee":202}],200:[function(require,module,exports){
module.exports = function(arr, value) {
  var closest;
  closest = arr[0];
  arr.forEach(function(p) {
    if (Math.abs(value - p) < Math.abs(value - closest)) {
      return closest = p;
    }
  });
  return closest;
};



},{}],201:[function(require,module,exports){
var copy, objectMerge, objectValidate;

objectMerge = require("../object/merge.coffee");

objectValidate = require("../object/validate.coffee");

copy = function(variable) {
  var ret;
  if (objectValidate(variable)) {
    return objectMerge(variable);
  } else if (variable instanceof Array) {
    ret = [];
    variable.forEach(function(o) {
      return ret.push(copy(o));
    });
    return ret;
  } else {
    return variable;
  }
};

module.exports = copy;



},{"../object/merge.coffee":165,"../object/validate.coffee":166}],202:[function(require,module,exports){
var ie;

ie = require("../client/ie.js");

module.exports = function(elem) {
  if (ie) {
    return typeof elem === "object" && elem instanceof Array && "size" in elem && "select" in elem;
  } else {
    return elem instanceof d3.selection;
  }
};



},{"../client/ie.js":40}],203:[function(require,module,exports){
module.exports = function(url, callback) {
  var img;
  img = new Image();
  img.src = url;
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas, context;
    canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    context = canvas.getContext("2d");
    context.drawImage(this, 0, 0);
    callback.call(this, canvas.toDataURL("image/png"));
    canvas = null;
  };
};



},{}],204:[function(require,module,exports){
var objectValidate, uniques;

objectValidate = require("../object/validate.coffee");

uniques = function(data, value, fetch, vars, depth) {
  var check, d, i, j, k, len, len1, len2, len3, lookups, m, v, val, vals;
  if (data === void 0) {
    return [];
  }
  if (vars && depth === void 0) {
    depth = vars.id.value;
  }
  if (!(data instanceof Array)) {
    data = [data];
  }
  lookups = [];
  if (value === void 0) {
    return data.reduce(function(p, c) {
      var lookup;
      lookup = JSON.stringify(c);
      if (lookups.indexOf(lookup) < 0) {
        if (p.indexOf(c) < 0) {
          p.push(c);
        }
        lookups.push(lookup);
      }
      return p;
    }, []);
  }
  vals = [];
  check = function(v) {
    var l;
    if (v !== void 0 && v !== null) {
      l = JSON.stringify(v);
      if (lookups.indexOf(l) < 0) {
        vals.push(v);
        return lookups.push(l);
      }
    }
  };
  if (typeof fetch === "function" && vars) {
    for (i = 0, len = data.length; i < len; i++) {
      d = data[i];
      val = uniques(fetch(vars, d, value, depth));
      for (j = 0, len1 = val.length; j < len1; j++) {
        v = val[j];
        check(v);
      }
    }
  } else if (typeof value === "function") {
    for (k = 0, len2 = data.length; k < len2; k++) {
      d = data[k];
      val = value(d);
      check(val);
    }
  } else {
    for (m = 0, len3 = data.length; m < len3; m++) {
      d = data[m];
      if (objectValidate(d)) {
        val = d[value];
        check(val);
      }
    }
  }
  return vals.sort(function(a, b) {
    return a - b;
  });
};

module.exports = uniques;



},{"../object/validate.coffee":166}],205:[function(require,module,exports){
module.exports = function(vars) {
  var checkParent, i, len, ref, s;
  vars.container.value.style("position", function() {
    var current, remain;
    current = d3.select(this).style("position");
    remain = ["absolute", "fixed"].indexOf(current) >= 0;
    if (remain) {
      return current;
    } else {
      return "relative";
    }
  }).html("");
  ref = ["width", "height"];
  for (i = 0, len = ref.length; i < len; i++) {
    s = ref[i];
    if (!vars[s].value) {
      checkParent = function(element) {
        var elem, val;
        if (element.tagName === void 0 || ["BODY", "HTML"].indexOf(element.tagName) >= 0) {
          val = window["inner" + s.charAt(0).toUpperCase() + s.slice(1)];
          elem = document !== element ? d3.select(element) : false;
          if (elem) {
            if (s === "width") {
              val -= parseFloat(elem.style("margin-left"), 10);
              val -= parseFloat(elem.style("margin-right"), 10);
              val -= parseFloat(elem.style("padding-left"), 10);
              val -= parseFloat(elem.style("padding-right"), 10);
            } else {
              val -= parseFloat(elem.style("margin-top"), 10);
              val -= parseFloat(elem.style("margin-bottom"), 10);
              val -= parseFloat(elem.style("padding-top"), 10);
              val -= parseFloat(elem.style("padding-bottom"), 10);
            }
          }
          return vars[s].value = val <= 20 ? vars[s].small : val;
        } else {
          val = parseFloat(d3.select(element).style(s), 10);
          if (typeof val === "number" && val > 0) {
            return vars[s].value = val;
          } else if (element.tagName !== "BODY") {
            return checkParent(element.parentNode);
          }
        }
      };
      checkParent(vars.container.value.node());
      if (d3.selectAll("body > *:not(script)").size() === 1) {
        d3.select("body").style("overflow", "hidden");
      }
    }
  }
  vars.container.value.style("width", vars.width.value + "px").style("height", vars.height.value + "px");
};



},{}],206:[function(require,module,exports){
var dataFormat    = require("../../core/data/format.js"),
    dataColor     = require("../../core/data/color.js"),
    dataKeys      = require("../../core/data/keys.coffee"),
    dataLoad      = require("../../core/data/load.coffee"),
    drawDrawer    = require("./ui/drawer.js"),
    drawLegend    = require("./ui/legend.js"),
    drawTimeline  = require("./ui/timeline.coffee"),
    errorCheck    = require("./errorCheck.js"),
    fetchData     = require("../../core/fetch/data.js"),
    finish        = require("./finish.js"),
    focusTooltip  = require("./focus/tooltip.coffee"),
    focusViz      = require("./focus/viz.js"),
    history       = require("./ui/history.coffee"),
    parseEdges    = require("../../core/parse/edges.js"),
    parseNodes    = require("../../core/parse/nodes.js"),
    print         = require("../../core/console/print.coffee"),
    removeTooltip = require("../../tooltip/remove.coffee"),
    runType       = require("./types/run.coffee"),
    shapes        = require("./shapes/draw.js"),
    stringFormat  = require("../../string/format.js"),
    svgSetup      = require("./svg/enter.js"),
    svgUpdate     = require("./svg/update.js"),
    titles        = require("./ui/titles.js"),
    validObject   = require("../../object/validate.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculate steps needed to redraw the visualization
//------------------------------------------------------------------------------
module.exports = function(vars) {

  var steps       = []
    , appType     = vars.type.value
    , locale      = vars.format.locale.value
    , uiMessage   = locale.message.ui
    , drawMessage = locale.message.draw

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if any data needs to be loaded with JSON
  //----------------------------------------------------------------------------
  var urlLoads = [ "data" , "attrs" , "coords" , "nodes" , "edges" ]
  urlLoads.forEach(function(u){

    if (!vars.error.value && !vars[u].loaded && vars[u].url) {

      steps.push({
        "function": function( vars , next ){
          dataLoad( vars , u , next )
        },
        "message": locale.message.loading,
        "wait": true
      })

    }

  })

  if (vars.draw.update) {

    var appName     = locale.visualization[appType] || appType
      , appSetup    = vars.types[appType].setup || false
      , appReqs     = vars.types[appType].requirements || []
      , appMessage  = stringFormat(locale.message.initializing,appName)
      , dataMessage = locale.message.data

    if (!(appReqs instanceof Array)) appReqs = [appReqs]
    appName = appName.toLowerCase()

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If it has one, run the current app's setup function.
    //--------------------------------------------------------------------------
    if (!vars.error.value && typeof appSetup === "function") {

      steps.push({
        "function": function( vars ) {

          if ( vars.dev.value ) {
            var timerString = "running " + appName + " setup"
            print.time( timerString )
          }

          appSetup( vars )

          if ( vars.dev.value ) print.timeEnd( timerString )

        },
        "message": appMessage
      })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create SVG group elements if the container is new or has changed
    //--------------------------------------------------------------------------
    if (vars.container.changed) {

      steps.push({ "function" : svgSetup , "message" : appMessage })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create group for current app, if it doesn't exist.
    //--------------------------------------------------------------------------
    if (!(appType in vars.g.apps)) {

      steps.push({
        "function": function( vars ) {

          if ( vars.dev.value ) {
            var timerString = "creating " + appName + " group"
            print.time( timerString )
          }

          vars.g.apps[appType] = vars.g.app
            .selectAll("g#"+appType)
            .data([appType])

          vars.g.apps[appType].enter().append("g")
            .attr("id",appType)
            .attr("opacity",0)

          if ( vars.dev.value ) print.timeEnd( timerString )

        },
        "message": appMessage
      })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If new data is detected, analyze and reset it.
    //--------------------------------------------------------------------------
    if (vars.data.changed) {

      steps.push({
        "function": function(vars) {
          vars.data.cache = {}
          delete vars.nodes.restricted
          delete vars.edges.restricted
          dataKeys(vars, "data")
        },
        "message": dataMessage
      })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If new attributes are detected, analyze them.
    //--------------------------------------------------------------------------
    if (vars.attrs.changed) {

      steps.push({
        "function": function( vars ) {
          dataKeys(vars, "attrs")
        },
        "message": dataMessage
      })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Determine color type
    //--------------------------------------------------------------------------
    steps.push({
      "function": function(vars) {

          if (!vars.color.type || vars.color.changed || vars.data.changed ||
              vars.attrs.changed || vars.id.changed || vars.depth.changed ||
              (vars.time.fixed.value &&
                (vars.time.solo.changed || vars.time.mute.changed))) {

            vars.color.valueScale = false;

            if ( vars.dev.value ) {
              var timerString = "checking color type";
              print.time(timerString);
            }

            vars.color.type = false;

            if (vars.color.value) {

              var colorKey = vars.color.value;

              if ( validObject(colorKey) ) {
                if (colorKey[vars.id.value]) {
                  colorKey = colorKey[vars.id.value];
                }
                else {
                  colorKey = colorKey[d3.keys(colorKey)[0]];
                }
              }

              if (vars.data.keys && colorKey in vars.data.keys) {
                vars.color.type = vars.data.keys[colorKey];
              }
              else if (vars.attrs.keys && colorKey in vars.attrs.keys) {
                vars.color.type = vars.attrs.keys[colorKey];
              }

            }
            else if (vars.data.keys) {
              vars.color.type = vars.data.keys[vars.id.value];
            }

            if (vars.dev.value) print.timeEnd(timerString);

          }

      },
      "message": dataMessage
    })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Format nodes/edges if needed
    //--------------------------------------------------------------------------
    if ( appReqs.indexOf("edges") >= 0 && vars.edges.value
    && ( !vars.edges.linked || vars.edges.changed ) ) {
      steps.push({ "function" : parseEdges, "message" : dataMessage })
    }

    if ( appReqs.indexOf("nodes") >= 0 && vars.edges.value
    && ( !vars.nodes.positions || vars.nodes.changed ) ) {
      steps.push({ "function" : parseNodes , "message" : dataMessage })
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups data by time and nesting.
    //--------------------------------------------------------------------------
    if (vars.data.changed || vars.time.changed || vars.time.format.changed || vars.id.changed || (vars.x.scale.changed && [vars.x.scale.value, vars.x.scale.previous].indexOf("discrete") >= 0) || (vars.y.scale.changed && [vars.y.scale.value, vars.y.scale.previous].indexOf("discrete") >= 0)) {
      steps.push({ "function" : dataFormat , "message" : dataMessage })
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Fetches data for app and "pool"
    //--------------------------------------------------------------------------
    if (!vars.error.value) {
      steps.push({
        "function": function(vars) {

          var year = !vars.time.fixed.value ? ["all"] : null
          if (vars.dev.value) {
            var timerString = year ? "fetching pool data" : "fetching data"
            print.time( timerString )
          }
          vars.data.pool = fetchData( vars , year )
          if (vars.dev.value) print.timeEnd( timerString )
          if ( !year ) {
            vars.data.viz = vars.data.pool
          }
          else {
            if ( vars.dev.value ) print.time("fetching data for current year")
            vars.data.viz = fetchData( vars )
            if ( vars.dev.value ) print.timeEnd("fetching data for current year")
          }

          vars.draw.timing = vars.data.viz.length < vars.data.large ?
                             vars.timing.transitions : 0;

        },
        "message": dataMessage
      })
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Calculate color scale if type is number
    //--------------------------------------------------------------------------
    if (!vars.error.value) {
      steps.push({
        "check": function(vars) {

          return vars.color.value && vars.color.type === "number" &&
                 vars.color.valueScale === false

        },
        "function": dataColor,
        "message": dataMessage
      })

    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Remove any lingering tooltips.
  //----------------------------------------------------------------------------
  steps.push({
    "function": function(vars) {
      if ( vars.dev.value ) {
        var str = vars.format.locale.value.message.tooltipReset
        print.time(str)
      }
      if ( vars.type.previous && appType !== vars.type.previous ) {
        removeTooltip(vars.type.previous)
      }
      removeTooltip(appType)
      if ( vars.dev.value ) print.timeEnd(str)
    },
    "message": uiMessage
  })

  if (!vars.error.value) {
    steps.push({"function": errorCheck, "message": uiMessage})
  }

  steps.push({
    "function": function(vars) {

      vars.margin.process()
      titles(vars)

      if (!vars.error.value) {
        if (vars.draw.update) {

          drawDrawer(vars)
          drawTimeline(vars)
          drawLegend(vars)

        }
        else {

          if ( vars.dev.value ) print.time("calculating margins")

          var drawer = vars.container.value.select("div#d3plus_drawer").node().offsetHeight
                    || vars.container.value.select("div#d3plus_drawer").node().getBoundingClientRect().height

          var timeline = vars.g.timeline.node().getBBox()
          timeline = vars.timeline.value ? timeline.height+vars.ui.padding : 0

          var legend = vars.g.legend.node().getBBox()
          legend = vars.legend.value ? legend.height+vars.ui.padding : 0

          vars.margin.bottom += drawer+timeline+legend

          if ( vars.dev.value ) print.timeEnd("calculating margins")

        }
      }

      history(vars)
      vars.height.viz -= (vars.margin.top+vars.margin.bottom)
      vars.width.viz -= (vars.margin.left+vars.margin.right)

    },
    "message": uiMessage
  })

  if (!vars.error.value) {
    steps.push({
      "function": focusTooltip,
      "message": uiMessage
    })
  }

  steps.push({
    "function": svgUpdate,
    "message": drawMessage
  })

  if (!vars.error.value && vars.draw.update) {
    steps.push({
      "function" : [ runType, shapes ],
      "message"  : drawMessage
    })
  }

  steps.push({
    "function" : [ focusViz , finish ],
    "message" : drawMessage
  })

  return steps

}

},{"../../core/console/print.coffee":54,"../../core/data/color.js":56,"../../core/data/format.js":58,"../../core/data/keys.coffee":60,"../../core/data/load.coffee":61,"../../core/fetch/data.js":66,"../../core/parse/edges.js":91,"../../core/parse/nodes.js":93,"../../object/validate.coffee":166,"../../string/format.js":167,"../../tooltip/remove.coffee":197,"./errorCheck.js":207,"./finish.js":208,"./focus/tooltip.coffee":209,"./focus/viz.js":210,"./shapes/draw.js":219,"./svg/enter.js":230,"./svg/update.js":231,"./types/run.coffee":234,"./ui/drawer.js":235,"./ui/history.coffee":236,"./ui/legend.js":237,"./ui/timeline.coffee":239,"./ui/titles.js":240}],207:[function(require,module,exports){
var fetchText    = require("../../core/fetch/text.js"),
    print        = require("../../core/console/print.coffee"),
    rejected     = require("../../core/methods/rejected.coffee"),
    stringFormat = require("../../string/format.js"),
    stringList   = require("../../string/list.coffee")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Miscellaneous Error Checks
//------------------------------------------------------------------------------
module.exports = function(vars) {

  if ( vars.dev.value ) print.time("checking for errors")

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if we have all required variables set
  //----------------------------------------------------------------------------
  var reqs = ["id"]
    , app_reqs = vars.types[vars.type.value].requirements
  if (app_reqs) {
    if (!(app_reqs instanceof Array)) reqs.push(app_reqs)
    else reqs = reqs.concat(vars.types[vars.type.value].requirements)
  }

  var missing = []
  reqs.forEach(function(r){
    if (typeof r === "string") {
      if (!vars[r].value) missing.push("\""+r+"\"")
    }
    else if (typeof r === "function") {
      var reqReturn = r(vars)
      if (!reqReturn.status && reqReturn.text) {
        missing.push("\""+reqReturn.text+"\"")
      }
    }
  })

  if ( missing.length > 1 ) {
    var str = vars.format.locale.value.error.methods
      , app = vars.format.locale.value.visualization[vars.type.value] || vars.type.value
      , and = vars.format.locale.value.ui.and
    missing = stringList(missing,and)
    vars.error.internal = stringFormat(str,app,missing)
  }
  else if ( missing.length === 1 ) {
    var str = vars.format.locale.value.error.method
      , app = vars.format.locale.value.visualization[vars.type.value] || vars.type.value
    vars.error.internal = stringFormat(str,app,missing[0])
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if we have focus connections, if needed
  //----------------------------------------------------------------------------
  if (!vars.error.internal && reqs.indexOf("edges") >= 0 && reqs.indexOf("focus") >= 0) {
    var connections = vars.edges.connections(vars.focus.value[0],vars.id.value)
    if (connections.length == 0) {
      var name = fetchText(vars,vars.focus.value[0],vars.depth.value)
        , str = vars.format.locale.value.error.connections
      vars.error.internal = stringFormat(str,"\""+name+"\"")
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if we have all required libraries
  //----------------------------------------------------------------------------
  var reqs = ["d3"]
  if (vars.types[vars.type.value].libs) {
    reqs = reqs.concat(vars.types[vars.type.value].libs)
  }
  var missing = []
  reqs.forEach(function(r){
    if (!window[r]) missing.push("\""+r+"\"")
  })

  if ( missing.length > 1 ) {
    var str = vars.format.locale.value.error.libs
      , app = vars.format.locale.value.visualization[vars.type.value]
      , and = vars.format.locale.value.ui.and
    missing = stringList(missing,and)
    vars.error.internal = stringFormat(str,app,missing)
  }
  else if ( missing.length === 1 ) {
    var str = vars.format.locale.value.error.lib
      , app = vars.format.locale.value.visualization[vars.type.value]
    vars.error.internal = stringFormat(str,app,missing[0])
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if the requested app supports the set shape
  //----------------------------------------------------------------------------
  var shapes = vars.shape.accepted(vars);
  if (!(shapes instanceof Array)) shapes = [shapes]
  var shape = vars.shape.value;

  if (!shape || rejected(vars, shapes, shape, "shape")) {
    vars.self.shape(shapes[0]);
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if the requested app supports the set "mode"
  //----------------------------------------------------------------------------
  if ("modes" in vars.types[vars.type.value]) {

    var modes = vars.types[vars.type.value].modes
    if (!(modes instanceof Array)) modes = [modes]
    var mode = vars.type.mode.value

    if (!mode || rejected(vars, modes, mode, "mode")) {
      vars.self.type({"mode": modes[0]})
    }

  }

  if ( vars.dev.value ) print.timeEnd("checking for errors")

}

},{"../../core/console/print.coffee":54,"../../core/fetch/text.js":68,"../../core/methods/rejected.coffee":87,"../../string/format.js":167,"../../string/list.coffee":168}],208:[function(require,module,exports){
var edges = require("./shapes/edges.js"),
    flash       = require("./ui/message.js"),
    methodReset = require("../../core/methods/reset.coffee"),
    print       = require("../../core/console/print.coffee"),
    shapeLabels = require("./shapes/labels.js"),
    titleCase   = require("../../string/title.coffee")

var bounds = require("./zoom/bounds.coffee")
var labels = require("./zoom/labels.coffee")
var mouse  = require("./zoom/mouse.coffee")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Finalize Visualization
//------------------------------------------------------------------------------
module.exports = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Zoom to fit bounds, if applicable
  //----------------------------------------------------------------------------
  if (!vars.error.value) {

    var zoom = vars.zoom.viewport || vars.zoom.bounds
    if (vars.types[vars.type.value].zoom && vars.zoom.value && zoom) {

      if ( vars.dev.value ) print.time("calculating zoom")

      if (vars.draw.first || vars.zoom.reset) {
        bounds(vars, zoom, 0);
      }
      else if (vars.type.changed || vars.focus.changed || vars.height.changed || vars.width.changed || vars.nodes.changed || vars.legend.changed || vars.timeline.changed || vars.ui.changed) {
        bounds(vars, zoom);
      }

      if ( vars.dev.value ) print.timeEnd("calculating zoom")

    }
    else {
      vars.zoom.bounds = [[0,0],[vars.width.viz,vars.height.viz]]
      vars.zoom.scale = 1
      bounds(vars)
    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Resize/Reposition Overlay Rect for Mouse events
  //----------------------------------------------------------------------------
  var w = vars.zoom.size ? vars.zoom.size.width : vars.width.viz,
      h = vars.zoom.size ? vars.zoom.size.height : vars.height.viz,
      x = vars.zoom.bounds ? vars.zoom.bounds[0][0] : 0,
      y = vars.zoom.bounds ? vars.zoom.bounds[0][1] : 0

  vars.g.overlay
    .attr("width",w)
    .attr("height",h)
    .attr("x",x)
    .attr("y",y)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create labels
  //----------------------------------------------------------------------------
  if (!vars.error.value) {
    if (vars.draw.update) {
      edges(vars)
      // if (vars.draw.timing || (!vars.types[vars.type.value].zoom && !vars.draw.timing)) {
      shapeLabels( vars , "data" )
      if (vars.edges.label) {
        setTimeout(function(){
          shapeLabels( vars , "edges" )
        }, vars.draw.timing+200)
      }
      // }
    }
    else if (vars.types[vars.type.value].zoom && vars.zoom.value && vars.draw.timing) {
      setTimeout(function(){
        labels(vars)
      },vars.draw.timing)
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check for Errors
  //----------------------------------------------------------------------------
  if (!vars.error.value) {
    var reqs = vars.types[vars.type.value].requirements || []
    if (!(reqs instanceof Array)) reqs = [reqs]
    var data_req = reqs.indexOf("data") >= 0
    if (!vars.error.internal) {
      if ((!vars.data.viz || !vars.returned.nodes.length) && data_req) {
        vars.error.internal = vars.format.locale.value.error.data
      }
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Hide the previous app, if applicable
  //----------------------------------------------------------------------------
  var prev = vars.type.previous
  if (prev && vars.type.value != prev && vars.g.apps[prev]) {
    if ( vars.dev.value ) print.time("hiding \"" + prev + "\"")
    if (vars.draw.timing) {
      vars.g.apps[prev].transition().duration(vars.draw.timing)
        .attr("opacity",0)
    }
    else {
      vars.g.apps[prev].attr("opacity",0)
    }
    if ( vars.dev.value ) print.timeEnd()
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Show the current app, data, and edges groups
  //----------------------------------------------------------------------------
  if (!vars.error.value) {
    var new_opacity = (data_req && vars.data.viz.length === 0) ||
                       vars.error.internal || vars.error.value ? 0 : vars.focus.value.length &&
                       vars.types[vars.type.value].zoom && vars.zoom.value ?
                       1 - vars.tooltip.curtain.opacity : 1;

    var timing = vars.draw.timing;

    vars.group.transition().duration(timing)
      .attr("opacity",new_opacity);

    vars.g.data.transition().duration(timing)
      .attr("opacity",new_opacity);

    vars.g.edges.transition().duration(timing)
      .attr("opacity",new_opacity);

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Display and reset internal_error, if applicable
  //----------------------------------------------------------------------------
  if (vars.error.value) {
    flash(vars, vars.error.value);
  }
  else if (vars.error.internal) {
    vars.error.internal = titleCase(vars.error.internal);
    print.warning(vars.error.internal);
    flash(vars, vars.error.internal);
    vars.error.internal = null;
  }
  else {
    flash(vars);
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Unfreeze controls and apply zoom behavior, if applicable
  //----------------------------------------------------------------------------
  setTimeout(function(){

    methodReset( vars )

    if (vars.types[vars.type.value].zoom && vars.zoom.value) {
      vars.g.zoom
        .datum(vars)
        .call(vars.zoom.behavior.on("zoom",mouse))
      if (!vars.zoom.scroll.value) {
        vars.g.zoom
          .on("mousewheel.zoom",null)
          .on("MozMousePixelScroll.zoom",null)
          .on("wheel.zoom",null)
      }
      if (!vars.zoom.click.value) {
        vars.g.zoom.on("dblclick.zoom",null)
      }
      if (!vars.zoom.pan.value) {
        vars.g.zoom
          .on("mousedown.zoom",null)
          .on("mousemove.zoom",null)
      }
    }
    else {
      vars.g.zoom
        .call(vars.zoom.behavior.on("zoom",null))
        .on("dblclick.zoom",null)
        .on("mousedown.zoom",null)
        .on("mousemove.zoom",null)
        .on("mousewheel.zoom",null)
        .on("MozMousePixelScroll.zoom",null)
        .on("touchstart.zoom",null)
        .on("wheel.zoom",null)
    }

  },vars.draw.timing)

}

},{"../../core/console/print.coffee":54,"../../core/methods/reset.coffee":89,"../../string/title.coffee":170,"./shapes/edges.js":220,"./shapes/labels.js":222,"./ui/message.js":238,"./zoom/bounds.coffee":241,"./zoom/labels.coffee":243,"./zoom/mouse.coffee":244}],209:[function(require,module,exports){
var createTooltip, fetchValue, print, removeTooltip;

createTooltip = require("../tooltip/create.js");

fetchValue = require("../../../core/fetch/value.coffee");

print = require("../../../core/console/print.coffee");

removeTooltip = require("../../../tooltip/remove.coffee");

module.exports = function(vars) {
  var data, focus, offset;
  focus = vars.focus;
  if (!vars.error.internal && focus.value.length === 1 && focus.value.length && !vars.small && focus.tooltip.value) {
    if (vars.dev.value) {
      print.time("drawing focus tooltip");
    }
    data = vars.data.pool.filter(function(d) {
      return fetchValue(vars, d, vars.id.value) === focus.value[0];
    });
    if (data.length >= 1) {
      data = data[0];
    } else {
      data = {};
      data[vars.id.value] = focus.value[0];
    }
    offset = vars.labels.padding;
    createTooltip({
      anchor: "top left",
      arrow: false,
      data: data,
      fullscreen: false,
      id: "visualization_focus",
      length: "long",
      maxheight: vars.height.viz - offset * 2,
      mouseevents: true,
      offset: 0,
      vars: vars,
      width: vars.tooltip.large,
      x: vars.width.value - vars.margin.right - offset,
      y: vars.margin.top + offset
    });
    vars.width.viz -= vars.tooltip.large + offset * 2;
    if (vars.dev.value) {
      print.timeEnd("drawing focus tooltip");
    }
  } else {
    removeTooltip("visualization_focus");
  }
};



},{"../../../core/console/print.coffee":54,"../../../core/fetch/value.coffee":69,"../../../tooltip/remove.coffee":197,"../tooltip/create.js":232}],210:[function(require,module,exports){
var events = require("../../../client/pointer.coffee"),
    fetchValue   = require("../../../core/fetch/value.coffee"),
    print        = require("../../../core/console/print.coffee"),
    uniqueValues = require("../../../util/uniques.coffee")

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates focus elements, if available
//------------------------------------------------------------------------------
module.exports = function(vars) {

  vars.g.edge_focus
    .selectAll("g")
    .remove()

  vars.g.data_focus
    .selectAll("g")
    .remove()

  if (vars.focus.value.length && vars.types[vars.type.value].zoom && vars.zoom.value) {

    if ( vars.dev.value ) print.time("drawing focus elements")

    var edges = vars.g.edges.selectAll("g")

    if (edges.size() > 0) {

      edges.each(function(l){

          var source = l[vars.edges.source][vars.id.value],
              target = l[vars.edges.target][vars.id.value]

          if (source == vars.focus.value[0] || target == vars.focus.value[0]) {
            var elem = vars.g.edge_focus.node().appendChild(this.cloneNode(true))
            d3.select(elem).datum(l).attr("opacity",1)
              .selectAll("line, path").datum(l)
          }

        })


      var marker = vars.edges.arrows.value

      vars.g.edge_focus.selectAll("line, path")
        .attr("vector-effect","non-scaling-stroke")
        .style("stroke",vars.color.focus)
        .style("stroke-width",function(){
          return vars.edges.size.value ? d3.select(this).style("stroke-width")
               : vars.data.stroke.width*2
        })
        .attr("marker-start",function(e){

          var direction = vars.edges.arrows.direction.value

          if ("bucket" in e.d3plus) {
            var d = "_"+e.d3plus.bucket
          }
          else {
            var d = ""
          }

          return direction == "source" && marker
               ? "url(#d3plus_edge_marker_focus"+d+")" : "none"

        })
        .attr("marker-end",function(e){

          var direction = vars.edges.arrows.direction.value

          if ("bucket" in e.d3plus) {
            var d = "_"+e.d3plus.bucket
          }
          else {
            var d = ""
          }

          return direction == "target" && marker
               ? "url(#d3plus_edge_marker_focus"+d+")" : "none"

        })

      vars.g.edge_focus.selectAll("text")
        .style("fill",vars.color.focus)

    }

    var focii = uniqueValues(vars.edges.connections(vars.focus.value[0],vars.id.value,true),vars.id.value, fetchValue, vars)
    focii.push(vars.focus.value[0])

    var x_bounds = [], y_bounds = [], x_buffer = [0], y_buffer = [0]

    var groups = vars.g.data.selectAll("g")
      .each(function(d){
        if (focii.indexOf(d[vars.id.value]) >= 0) {
          var elem = vars.g.data_focus.node().appendChild(this.cloneNode(true))
          var elem = d3.select(elem).datum(d).attr("opacity",1)

          if (vars.shape.value == "coordinates") {

            vars.zoom.viewport = vars.path.bounds(vars.zoom.coords[d.d3plus.id])

          }
          else if ("d3plus" in d) {
            if ("x" in d.d3plus) {
              x_bounds.push(d.d3plus.x)
            }
            if ("y" in d.d3plus) {
              y_bounds.push(d.d3plus.y)
            }
            if ("r" in d.d3plus) {
              x_buffer.push(d.d3plus.r)
              y_buffer.push(d.d3plus.r)
            }
            else {
              if ("width" in d.d3plus) {
                x_buffer.push(d.d3plus.width/2)
              }
              if ("height" in d.d3plus) {
                y_buffer.push(d.d3plus.height/2)
              }
            }
          }

          for (e in events) {
            var evt = d3.select(this).on(events[e])
            if (evt) {
              elem.on(events[e],evt)
            }
          }

        }
      })

    if (x_bounds.length && y_bounds.length) {

      var xcoords = d3.extent(x_bounds),
          ycoords = d3.extent(y_bounds),
          xmax = d3.max(x_buffer),
          ymax = d3.max(y_buffer)

      vars.zoom.viewport = [
        [xcoords[0]-xmax,ycoords[0]-ymax],
        [xcoords[1]+xmax,ycoords[1]+ymax]
      ]

    }

    vars.g.data_focus.selectAll("path")
      .style("stroke-width",vars.data.stroke.width*2)

    if ( vars.dev.value ) print.timeEnd("drawing focus elements")

  }
  else {
    vars.zoom.viewport = false
  }

}

},{"../../../client/pointer.coffee":41,"../../../core/console/print.coffee":54,"../../../core/fetch/value.coffee":69,"../../../util/uniques.coffee":204}],211:[function(require,module,exports){
var angles, largestRect, path2poly, shapeStyle;

shapeStyle = require("./style.coffee");

largestRect = require("../../../geom/largestRect.coffee");

path2poly = require("../../../geom/path2poly.coffee");

angles = {
  start: {},
  end: {}
};

module.exports = function(vars, selection, enter, exit) {
  var arc, arcTween, data, newarc;
  arc = d3.svg.arc().innerRadius(0).outerRadius(function(d) {
    return d.d3plus.r;
  }).startAngle(function(d) {
    return d.d3plus.startAngle;
  }).endAngle(function(d) {
    return d.d3plus.endAngle;
  });
  data = function(d) {
    var poly, rect;
    if (vars.labels.value) {
      if (d.d3plus.label) {
        d.d3plus_label = d.d3plus.label;
      } else {
        poly = path2poly(arc(d));
        rect = largestRect(poly, {
          angle: 0
        });
        if (rect[0]) {
          d.d3plus_label = {
            w: rect[0].width,
            h: rect[0].height,
            x: rect[0].cx,
            y: rect[0].cy
          };
        } else {
          delete d.d3plus_label;
        }
      }
    }
    return [d];
  };
  if (vars.draw.timing) {
    newarc = d3.svg.arc().innerRadius(0).outerRadius(function(d) {
      return d.d3plus.r;
    }).startAngle(function(d) {
      if (angles.start[d.d3plus.id] === void 0) {
        angles.start[d.d3plus.id] = 0;
      }
      if (isNaN(angles.start[d.d3plus.id])) {
        angles.start[d.d3plus.id] = d.d3plus.startAngle;
      }
      return angles.start[d.d3plus.id];
    }).endAngle(function(d) {
      if (angles.end[d.d3plus.id] === void 0) {
        angles.end[d.d3plus.id] = 0;
      }
      if (isNaN(angles.end[d.d3plus.id])) {
        angles.end[d.d3plus.id] = d.d3plus.endAngle;
      }
      return angles.end[d.d3plus.id];
    });
    arcTween = function(arcs, newAngle) {
      return arcs.attrTween("d", function(d) {
        var e, interpolateE, interpolateS, s;
        if (newAngle === void 0) {
          s = d.d3plus.startAngle;
          e = d.d3plus.endAngle;
        } else if (newAngle === 0) {
          s = 0;
          e = 0;
        }
        interpolateS = d3.interpolate(angles.start[d.d3plus.id], s);
        interpolateE = d3.interpolate(angles.end[d.d3plus.id], e);
        return function(t) {
          angles.start[d.d3plus.id] = interpolateS(t);
          angles.end[d.d3plus.id] = interpolateE(t);
          return newarc(d);
        };
      });
    };
    enter.append("path").attr("class", "d3plus_data").call(shapeStyle, vars).attr("d", newarc);
    selection.selectAll("path.d3plus_data").data(data).transition().duration(vars.draw.timing).call(shapeStyle, vars).call(arcTween);
    exit.selectAll("path.d3plus_data").transition().duration(vars.draw.timing).call(arcTween, 0);
  } else {
    enter.append("path").attr("class", "d3plus_data");
    selection.selectAll("path.d3plus_data").data(data).call(shapeStyle, vars).attr("d", arc);
  }
};



},{"../../../geom/largestRect.coffee":155,"../../../geom/path2poly.coffee":157,"./style.coffee":226}],212:[function(require,module,exports){
var fetchText = require("../../../core/fetch/text.js"),
    fontSizes   = require("../../../font/sizes.coffee"),
    largestRect = require("../../../geom/largestRect.coffee"),
    shapeStyle  = require("./style.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
module.exports = function(vars, selection, enter, exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // D3 area definition
  //----------------------------------------------------------------------------
  var area = d3.svg.area()
    .x(function(d) { return d.d3plus.x; })
    .y0(function(d) { return d.d3plus.y0; })
    .y1(function(d) { return d.d3plus.y; })
    .interpolate(vars.shape.interpolate.value);

  var startArea = d3.svg.area()
    .x(function(d) { return d.d3plus.x; })
    .y0(function(d) { return d.d3plus.y0; })
    .y1(function(d) { return d.d3plus.y0; })
    .interpolate(vars.shape.interpolate.value);

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","d3plus_data")
    .attr("d",function(d){ return startArea(d.values); })
    .call(shapeStyle,vars);

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) {

      if (vars.labels.value && d.values.length > 1) {

        var tops = []
          , bottoms = []
          , names = fetchText(vars,d)

        d.values.forEach(function(v){
          tops.push([v.d3plus.x,v.d3plus.y])
          bottoms.push([v.d3plus.x,v.d3plus.y0])
        })
        tops = tops.concat(bottoms.reverse())

        var style = {
          "font-weight": vars.labels.font.weight,
          "font-family": vars.labels.font.family.value
        }

        if (names.length) {
          var size = fontSizes(names[0],style)
            , ratio = size[0].width/size[0].height
        }
        else {
          var ratio = null
        }

        var lr = largestRect(tops,{
          "angle": d3.range(-70,71,1),
          "aspectRatio": ratio,
          "tolerance": 0
        })

        if (lr && lr[0]) {

          var label = {
            "w": ~~(lr[0].width),
            "h": ~~(lr[0].height),
            "x": ~~(lr[0].cx),
            "y": ~~(lr[0].cy),
            "angle": lr[0].angle*-1,
            "padding": 2,
            "names": names
          }

          if (lr[0].angle !== 0) {
            label.translate = {
              "x":label.x,
              "y":label.y
            }
          }
          else {
            label.translate = false
          }

          if (label.w >= 10 && label.h >= 10) {
            d.d3plus_label = label
          }

        }

      }

      return [d];
    })

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .attr("d",function(d){ return area(d.values) })
        .call(shapeStyle,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .attr("d",function(d){ return area(d.values) })
      .call(shapeStyle,vars)
  }

}

},{"../../../core/fetch/text.js":68,"../../../font/sizes.coffee":97,"../../../geom/largestRect.coffee":155,"./style.coffee":226}],213:[function(require,module,exports){
var fetchText = require("../../../core/fetch/text.js"),
    largestRect = require("../../../geom/largestRect.coffee"),
    shapeStyle  = require("./style.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize check scale on enter and exit.
  //----------------------------------------------------------------------------
  function init(paths){
    paths.attr("transform", "scale(1)")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Change scale of check on update.
  //---------------------------------------------------------------------------
  function update(paths){
    paths.attr("transform", function(d){
      var smaller_dim = Math.min(d.d3plus.width, d.d3plus.height);
      var scale = Math.floor(smaller_dim / 16);
      return "scale("+scale+")";
    })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","d3plus_data")
    .attr("d", "M5-6.844L3.594-5.407L-2,0.188l-1.594-1.594L-5-2.844L-7.844,0l1.438,1.406l3,3L-2,5.843l1.406-1.438l7-7L7.844-4L5-6.844z")
    .call(init)
    .call(shapeStyle,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) {
      return [d];
    })

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .call(update)
        .call(shapeStyle,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .call(update)
      .call(shapeStyle,vars)
  }

}

},{"../../../core/fetch/text.js":68,"../../../geom/largestRect.coffee":155,"./style.coffee":226}],214:[function(require,module,exports){
var fetchColor, fetchValue, lighter, segments;

fetchValue = require("../../../core/fetch/value.coffee");

fetchColor = require("../../../core/fetch/color.coffee");

lighter = require("../../../color/lighter.coffee");

segments = require("./segments.coffee");

module.exports = function(d, vars, stroke) {
  var active, shape, temp, total;
  shape = d.d3plus.shape || vars.shape.value;
  if (vars.shape.value === "line" && shape !== "circle") {
    return "none";
  } else if (vars.shape.value === "area" || shape === "active" || vars.shape.value === "line") {
    return fetchColor(vars, d);
  } else if (shape === "temp") {
    if (stroke) {
      return fetchColor(vars, d);
    } else {
      return "url(#d3plus_hatch_" + d.d3plus.id + ")";
    }
  } else if (d.d3plus["static"]) {
    return lighter(fetchColor(vars, d), .75);
  }
  active = segments(vars, d, "active");
  temp = segments(vars, d, "temp");
  total = segments(vars, d, "total");
  if ((!vars.active.value && !vars.temp.value) || active === true || (active && total && active >= total && !temp) || (active && !total)) {
    return fetchColor(vars, d);
  } else if (vars.active.spotlight.value) {
    return "#eee";
  } else {
    return lighter(fetchColor(vars, d), .75);
  }
};



},{"../../../color/lighter.coffee":47,"../../../core/fetch/color.coffee":65,"../../../core/fetch/value.coffee":69,"./segments.coffee":225}],215:[function(require,module,exports){
var copy, distance, fetchText, fontSizes, labels, largestRect, path2poly, shapeStyle;

copy = require("../../../util/copy.coffee");

distance = require("../../../network/distance.coffee");

fetchText = require("../../../core/fetch/text.js");

fontSizes = require("../../../font/sizes.coffee");

largestRect = require("../../../geom/largestRect.coffee");

path2poly = require("../../../geom/path2poly.coffee");

shapeStyle = require("./style.coffee");

labels = {};

module.exports = function(vars, selection, enter, exit) {
  var projection, size_change;
  projection = d3.geo[vars.coords.projection.value]().center(vars.coords.center);
  if (!vars.zoom.scale) {
    vars.zoom.scale = 1;
  }
  vars.zoom.area = 1 / vars.zoom.scale / vars.zoom.scale;
  vars.path = d3.geo.path().projection(projection);
  enter.append("path").attr("id", function(d) {
    return d.id;
  }).attr("class", "d3plus_data").attr("d", vars.path).call(shapeStyle, vars);
  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data").transition().duration(vars.draw.timing).call(shapeStyle, vars);
  } else {
    selection.selectAll("path.d3plus_data").call(shapeStyle, vars);
  }
  size_change = vars.old_height !== vars.height.viz || vars.height.changed || vars.old_width !== vars.width.viz || vars.width.changed;
  vars.old_height = vars.height.viz;
  vars.old_width = vars.width.viz;
  if (vars.coords.changed || size_change || vars.coords.mute.changed || vars.coords.solo.changed || vars.type.changed) {
    vars.zoom.bounds = null;
    vars.zoom.reset = true;
    vars.zoom.coords = {};
    return selection.each(function(d) {
      var areaM, areas, b, c, center, coords, dist_cutoff, dist_values, distances, i, j, largest, len, names, path, ratio, rect, reduced, ref, size, style, test;
      if (d.geometry.coordinates.length > 1) {
        distances = [];
        areas = [];
        areaM = 0;
        test = copy(d);
        largest = copy(d);
        d.geometry.coordinates = d.geometry.coordinates.filter(function(c, i) {
          var a;
          test.geometry.coordinates = [c];
          a = vars.path.area(test);
          if (a > 0) {
            areas.push(a);
            if (a > areaM) {
              largest.geometry.coordinates = [c];
              areaM = a;
            }
            return true;
          } else {
            return false;
          }
        });
        center = vars.path.centroid(largest);
        reduced = copy(d);
        ref = d.geometry.coordinates;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          c = ref[i];
          test.geometry.coordinates = [c];
          distances.push(distance(vars.path.centroid(test), center));
        }
        dist_values = distances.reduce(function(arr, dist, i) {
          if (dist) {
            arr.push(areas[i] / dist);
          }
          return arr;
        }, []);
        dist_cutoff = d3.quantile(dist_values, vars.coords.threshold.value);
        reduced.geometry.coordinates = reduced.geometry.coordinates.filter(function(c, i) {
          var a, dist;
          dist = distances[i];
          a = areas[i];
          return dist === 0 || a / dist > dist_cutoff;
        });
        coords = largest.geometry.coordinates[0];
        if (coords && largest.geometry.type === "MultiPolygon") {
          coords = coords[0];
          largest.geometry.coordinates[0] = coords;
          largest.geometry.type = "Polygon";
        }
      } else {
        reduced = d;
        largest = d;
        coords = d.geometry.coordinates[0];
      }
      vars.zoom.coords[d.d3plus.id] = reduced;
      b = vars.path.bounds(reduced);
      names = fetchText(vars, d);
      delete d.d3plus_label;
      if (coords && names.length) {
        path = path2poly(vars.path(largest));
        style = {
          "font-weight": vars.labels.font.weight,
          "font-family": vars.labels.font.family.value
        };
        ratio = null;
        if (names[0].split(" ").length === 1) {
          size = fontSizes(names[0], style)[0];
          ratio = size.width / size.height;
        }
        rect = largestRect(path, {
          angle: 0,
          aspectRatio: ratio
        });
        if (rect) {
          rect = rect[0];
          d.d3plus_label = {
            anchor: "middle",
            valign: "center",
            h: rect.height,
            w: rect.width,
            x: rect.cx,
            y: rect.cy,
            names: names
          };
        }
      }
      labels[d.id] = d.d3plus_label;
      if (!vars.zoom.bounds) {
        return vars.zoom.bounds = b;
      } else {
        if (vars.zoom.bounds[0][0] > b[0][0]) {
          vars.zoom.bounds[0][0] = b[0][0];
        }
        if (vars.zoom.bounds[0][1] > b[0][1]) {
          vars.zoom.bounds[0][1] = b[0][1];
        }
        if (vars.zoom.bounds[1][0] < b[1][0]) {
          vars.zoom.bounds[1][0] = b[1][0];
        }
        if (vars.zoom.bounds[1][1] < b[1][1]) {
          return vars.zoom.bounds[1][1] = b[1][1];
        }
      }
    });
  } else if (!vars.focus.value.length) {
    vars.zoom.viewport = false;
    return selection.each(function(d) {
      return d.d3plus_label = labels[d.id];
    });
  }
};



},{"../../../core/fetch/text.js":68,"../../../font/sizes.coffee":97,"../../../geom/largestRect.coffee":155,"../../../geom/path2poly.coffee":157,"../../../network/distance.coffee":159,"../../../util/copy.coffee":201,"./style.coffee":226}],216:[function(require,module,exports){
var shapeStyle  = require("./style.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize check scale on enter and exit.
  //----------------------------------------------------------------------------
  function init(paths){
    paths.attr("d", d3.svg.symbol().type("cross").size(10))
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Change scale of check on update.
  //---------------------------------------------------------------------------
  function update(paths){
    paths.attr("d", d3.svg.symbol().type("cross").size(function(d){
      var smaller_dim = Math.min(d.d3plus.width, d.d3plus.height);
      return d3.scale.pow().exponent(2)(smaller_dim/2);
    }))
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","d3plus_data")
    .call(init)
    .call(shapeStyle,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) {
      return [d];
    })

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .call(update)
        .call(shapeStyle,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .call(update)
      .call(shapeStyle,vars)
  }

}

},{"./style.coffee":226}],217:[function(require,module,exports){
var shapeStyle  = require("./style.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize check scale on enter and exit.
  //----------------------------------------------------------------------------
  function init(paths){
    paths.attr("d", d3.svg.symbol().type("diamond").size(10))
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Change scale of check on update.
  //---------------------------------------------------------------------------
  function update(paths){
    paths.attr("d", d3.svg.symbol().type("diamond").size(function(d){
      var smaller_dim = Math.min(d.d3plus.width, d.d3plus.height);
      return d3.scale.pow().exponent(2)(smaller_dim/2);
    }))
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","d3plus_data")
    .call(init)
    .call(shapeStyle,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) {
      return [d];
    })

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .call(update)
        .call(shapeStyle,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .call(update)
      .call(shapeStyle,vars)
  }

}

},{"./style.coffee":226}],218:[function(require,module,exports){
var shapeStyle = require("./style.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "donut" shapes using svg:path with arcs
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // In order to correctly animate each donut's size and arcs, we need to store
  // it's previous values in a lookup object that does not get destroyed when
  // redrawing the visualization.
  //----------------------------------------------------------------------------
  if (!vars.arcs) {
    vars.arcs = {
      "donut": {},
      "active": {},
      "temp": {}
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main arc function that determines what values to use for each
  // arc angle and radius.
  //----------------------------------------------------------------------------
  var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d){
      var a = vars.arcs[d.d3plus.shape][d.d3plus.id].a;
      return a > Math.PI*2 ? Math.PI*2 : a;
    })
    .innerRadius(function(d){
      if (d.d3plus.static) return 0;
      var r = vars.arcs[d.d3plus.shape][d.d3plus.id].r;
      return r * vars.data.donut.size;
    })
    .outerRadius(function(d){
      return vars.arcs[d.d3plus.shape][d.d3plus.id].r;
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main "arcTween" function where all of the animation happens
  // for each arc.
  //----------------------------------------------------------------------------
  function size(path,mod,rad,ang) {
    if (!mod) var mod = 0
    if (typeof rad != "number") var rad = undefined
    if (typeof ang != "number") var ang = undefined
    path.attrTween("d", function(d){
      if (rad == undefined) var r = d.d3plus.r ? d.d3plus.r : d3.max([d.d3plus.width,d.d3plus.height])
      else var r = rad
      if (ang == undefined) var a = d.d3plus.segments[d.d3plus.shape]
      else var a = ang
      if (!vars.arcs[d.d3plus.shape][d.d3plus.id]) {
        vars.arcs[d.d3plus.shape][d.d3plus.id] = {"r": 0}
        vars.arcs[d.d3plus.shape][d.d3plus.id].a = Math.PI * 2
      }
      var radius = d3.interpolate(vars.arcs[d.d3plus.shape][d.d3plus.id].r,r+mod),
          angle = d3.interpolate(vars.arcs[d.d3plus.shape][d.d3plus.id].a,a)
      return function(t) {
        vars.arcs[d.d3plus.shape][d.d3plus.id].r = radius(t)
        vars.arcs[d.d3plus.shape][d.d3plus.id].a = angle(t)
        return arc(d)
      }
    })
  }

  function data(d) {

    if (d.d3plus.label) {
      d.d3plus_label = d.d3plus.label;
    }
    else {
      delete d.d3plus_label;
    }

    return [d];
  }

  if (vars.draw.timing) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" Exit
    //----------------------------------------------------------------------------
    exit.selectAll("path.d3plus_data").transition().duration(vars.draw.timing)
      .call(size,0,0)
      .each("end",function(d){
        delete vars.arcs[d.d3plus.shape][d.d3plus.id];
      });

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" Update
    //----------------------------------------------------------------------------
    selection.selectAll("path.d3plus_data")
      .data(data)
      .transition().duration(vars.draw.timing)
        .call(size)
        .call(shapeStyle,vars);

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" Enter
    //----------------------------------------------------------------------------
    enter.append("path")
      .attr("class","d3plus_data")
      .transition().duration(0)
        .call(size,0,0)
        .call(shapeStyle,vars)
        .transition().duration(vars.draw.timing)
          .call(size)
          .call(shapeStyle,vars);

  }
  else {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" Exit
    //----------------------------------------------------------------------------
    exit.selectAll("path.d3plus_data")
      .each(function(d){
        delete vars.arcs[d.d3plus.shape][d.d3plus.id];
      });

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" Enter
    //----------------------------------------------------------------------------
    enter.append("path")
      .attr("class","d3plus_data");

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" Update
    //----------------------------------------------------------------------------
    selection.selectAll("path.d3plus_data")
      .data(data)
      .call(size)
      .call(shapeStyle,vars);
  }

};

},{"./style.coffee":226}],219:[function(require,module,exports){
var child         = require("../../../util/child.coffee"),
    closest       = require("../../../util/closest.coffee"),
    createTooltip = require("../tooltip/create.js"),
    events        = require("../../../client/pointer.coffee"),
    fetchValue    = require("../../../core/fetch/value.coffee"),
    fetchColor    = require("../../../core/fetch/color.coffee"),
    fetchText     = require("../../../core/fetch/text.js"),
    legible       = require("../../../color/legible.coffee"),
    print         = require("../../../core/console/print.coffee"),
    removeTooltip = require("../../../tooltip/remove.coffee"),
    segments      = require("./segments.coffee"),
    shapeFill     = require("./fill.js"),
    stringStrip   = require("../../../string/strip.js"),
    touch         = require("../../../client/touch.coffee"),
    touchEvent    = require("../zoom/propagation.coffee"),
    uniqueValues  = require("../../../util/uniques.coffee"),
    validObject   = require("../../../object/validate.coffee"),
    zoomDirection = require("../zoom/direction.coffee");

var drawShape = {
  "arc":           require("./arc.coffee"),
  "area":          require("./area.js"),
  "check":         require("./check.js"),
  "coordinates":   require("./coordinates.coffee"),
  "cross":         require("./cross.js"),
  "diamond":       require("./diamond.js"),
  "donut":         require("./donut.js"),
  "line":          require("./line.js"),
  "rect":          require("./rect.coffee"),
  "triangle_down": require("./triangle_down.js"),
  "triangle_up":   require("./triangle_up.js"),
  "whisker":       require("./whisker.coffee")
};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws the appropriate shape based on the data
//------------------------------------------------------------------------------
module.exports = function(vars) {

  var data = vars.returned.nodes || [],
      edges = vars.returned.edges || [];

  vars.draw.timing = data.length < vars.data.large &&
                     edges.length < vars.edges.large ?
                     vars.timing.transitions : 0;

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Match vars.shape types to their respective d3plus.shape functions. For
  // example, both "square", and "circle" shapes use "rect" as their drawing
  // class.
  //----------------------------------------------------------------------------
  var shapeLookup = {
    "arc":             "arc",
    "area":            "area",
    "check":           "check",
    "circle":          "rect",
    "coordinates":     "coordinates",
    "cross":           "cross",
    "donut":           "donut",
    "diamond":         "diamond",
    "line":            "line",
    "plus":            "cross",
    "rect":            "rect",
    "square":          "rect",
    "triangle_down":   "triangle_down",
    "triangle":        "triangle_up",
    "triangle_up":     "triangle_up",
    "whisker":         "whisker"
  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Split the data by each shape type in the data.
  //----------------------------------------------------------------------------
  var shapes = {};
  data.forEach(function(d){
    var s = d.d3plus && d.d3plus.shape ? d.d3plus.shape : vars.shape.value;
    if (s in shapeLookup) {
      if (d.d3plus) d.d3plus.shape = s
      s = shapeLookup[s]
      if (!shapes[s]) shapes[s] = []
      shapes[s].push(d)
    }
  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Resets the "id" of each data point to use with matching.
  //----------------------------------------------------------------------------
  function id(d) {

    if (!d.d3plus.id) {
      d.d3plus.id = ""
      for (var i = 0; i <= vars.depth.value; i++) {
        d.d3plus.id += fetchValue(vars,d,vars.id.nesting[i])+"_"
      }

      d.d3plus.id += shape;

      ["x","y"].forEach(function(axis){
        if (vars[axis].scale.value == "discrete") {
          var val = fetchValue(vars, d, vars[axis].value)
          if (val.constructor === Date) val = val.getTime()
          d.d3plus.id += "_"+val
        }
      })

      d.d3plus.id = stringStrip(d.d3plus.id)
    }

    return d
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Transforms the positions and scale of each group.
  //----------------------------------------------------------------------------
  function transform(g,grow) {

    var scales = vars.types[vars.type.value].scale,
        scale = 1;
    if (scales) {
      if (validObject[scales] && vars.shape.value in scales) {
        scale = scales[vars.shape.value];
      }
      else if (typeof scales == "function") {
        scale = scales(vars, vars.shape.value);
      }
      else if (typeof scales == "number") {
        scale = scales;
      }
    }

    scale = grow ? scale : 1;
    g.attr("transform", function(d){

      if (["line","area","coordinates"].indexOf(shape) < 0) {
          var x = d.d3plus.x || 0, y = d.d3plus.y || 0;
          return "translate("+x+","+y+")scale("+scale+")";
      }
      else {
        return "scale("+scale+")";
      }

    });

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Remove old groups
  //----------------------------------------------------------------------------
  for (var s in shapeLookup) {
    if (!(shapeLookup[s] in shapes) || d3.keys(shapes).length === 0) {
      var oldShapes = vars.g.data.selectAll("g.d3plus_"+shapeLookup[s]);
      if (vars.draw.timing) {
        oldShapes
          .transition().duration(vars.draw.timing)
          .attr("opacity",0)
          .remove();
      }
      else {
        oldShapes
          .remove();
      }
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize arrays for labels and sizes
  //----------------------------------------------------------------------------
  var labels = [], shares = [];

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create groups by shape, apply data, and call specific shape drawing class.
  //----------------------------------------------------------------------------
  for (var shape in shapes) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind Data to Groups
    //--------------------------------------------------------------------------
    var selection = vars.g.data.selectAll("g.d3plus_"+shape)
      .data(shapes[shape],function(d){

        if (!d.d3plus) d.d3plus = {}

        if ( shape === "coordinates" ) {
          d.d3plus.id = d.id
          return d.id
        }

        if ( !d.d3plus.id ) {

          if (d.values) {

            d.values.forEach(function(v){
              v = id(v)
              v.d3plus.shape = "circle"
            })
            d.d3plus.id = d.key

          }
          else {

            d = id(d)

            if (!d.d3plus.segments) {

              d.d3plus.segments = {"donut": Math.PI*2}
              var active = segments(vars, d, "active"),
                  temp   = segments(vars, d, "temp"),
                  total  = segments(vars, d, "total");

              if (total) {
                if (active) {
                  d.d3plus.segments.active = (active/total) * (Math.PI * 2)
                }
                else {
                  d.d3plus.segments.active = 0
                }
                if (temp) {
                  d.d3plus.segments.temp = ((temp/total) * (Math.PI * 2)) + d.d3plus.segments.active
                }
                else {
                  d.d3plus.segments.temp = 0
                }
              }

            }

          }

        }

        return d.d3plus ? d.d3plus.id : false;

      })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups Exit
    //--------------------------------------------------------------------------
    if (vars.draw.timing) {
      var exit = selection.exit()
        .transition().duration(vars.draw.timing)
        .attr("opacity",0)
        .remove()
    }
    else {
      var exit = selection.exit()
        .remove()
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Existing Groups Update
    //--------------------------------------------------------------------------
    if (vars.draw.timing) {
      selection
        .transition().duration(vars.draw.timing)
        .call(transform)
    }
    else {
      selection.call(transform)
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups Enter
    //--------------------------------------------------------------------------
    var opacity = vars.draw.timing ? 0 : 1
    var enter = selection.enter().append("g")
      .attr("class","d3plus_"+shape)
      .attr("opacity",opacity)
      .call(transform)

    if (vars.draw.timing) {
      enter.transition().duration(vars.draw.timing)
        .attr("opacity",1)
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // All Groups Sort Order
    //--------------------------------------------------------------------------
    selection.order()

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Draw appropriate graphics inside of each group
    //--------------------------------------------------------------------------
    if ( vars.dev.value ) print.time("drawing \"" + shape + "\" shapes")
    drawShape[shape]( vars , selection , enter , exit , transform )
    if ( vars.dev.value ) print.timeEnd("drawing \"" + shape + "\" shapes")

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Check for active and temp fills for rects and donuts
    //--------------------------------------------------------------------------
    if (["rect","donut"].indexOf(shape) >= 0 && vars.types[vars.type.value].fill) {
      if ( vars.dev.value ) print.time("filling \"" + shape + "\" shapes")
      shapeFill( vars , selection , enter , exit , transform )
      if ( vars.dev.value ) print.timeEnd("filling \"" + shape + "\" shapes")
    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Function to Update Edges
  //----------------------------------------------------------------------------
  function edge_update(d) {

    if (d && vars.g.edges.selectAll("g").size() > 0) {

      vars.g.edge_hover
        .selectAll("*")
        .remove()

      vars.g.edges.selectAll("g")
        .each(function(l){

          var id = d[vars.id.value],
              source = l[vars.edges.source][vars.id.value],
              target = l[vars.edges.target][vars.id.value]

          if (source == id || target == id) {
            var elem = vars.g.edge_hover.node().appendChild(this.cloneNode(true))
            d3.select(elem).datum(l).attr("opacity",1)
              .selectAll("line, path").datum(l)
          }

        })


      var marker = vars.edges.arrows.value

      vars.g.edge_hover
        .attr("opacity",0)
        .selectAll("line, path")
          .style("stroke",vars.color.primary)
          .style("stroke-width",function(){
            return vars.edges.size.value ? d3.select(this).style("stroke-width")
                 : vars.data.stroke.width*2
          })
          .attr("marker-start",function(e){

            var direction = vars.edges.arrows.direction.value

            if ("bucket" in e.d3plus) {
              var d = "_"+e.d3plus.bucket
            }
            else {
              var d = ""
            }

            return direction == "source" && marker
                 ? "url(#d3plus_edge_marker_highlight"+d+")" : "none"

          })
          .attr("marker-end",function(e){

            var direction = vars.edges.arrows.direction.value

            if ("bucket" in e.d3plus) {
              var d = "_"+e.d3plus.bucket
            }
            else {
              var d = ""
            }

            return direction == "target" && marker
                 ? "url(#d3plus_edge_marker_highlight"+d+")" : "none"

          })


      vars.g.edge_hover.selectAll("text")
        .style("fill",vars.color.primary)

      if (vars.draw.timing) {

        vars.g.edge_hover
          .transition().duration(vars.timing.mouseevents)
          .attr("opacity",1)

        vars.g.edges
          .transition().duration(vars.timing.mouseevents)
          .attr("opacity",0.5)

      }
      else {

        vars.g.edge_hover
          .attr("opacity",1)

      }

    }
    else {

      if (vars.draw.timing) {

        vars.g.edge_hover
          .transition().duration(vars.timing.mouseevents)
          .attr("opacity",0)
          .transition()
          .selectAll("*")
          .remove()

        vars.g.edges
          .transition().duration(vars.timing.mouseevents)
          .attr("opacity",1)

      }
      else {

        vars.g.edge_hover
          .selectAll("*")
          .remove()

      }

    }

  }

  edge_update()

  if (!touch && vars.tooltip.value) {

    vars.g.data.selectAll("g")
      .on(events.over,function(d){

        if (!vars.draw.frozen && (!d.d3plus || !d.d3plus.static)) {

          d3.select(this).style("cursor","pointer")
            .transition().duration(vars.timing.mouseevents)
            .call(transform,true)

          d3.select(this).selectAll(".d3plus_data")
            .transition().duration(vars.timing.mouseevents)
            .attr("opacity",1)

          vars.covered = false

          if (d.values && vars.axes.discrete) {

            var index = vars.axes.discrete === "x" ? 0 : 1
              , mouse = d3.mouse(vars.container.value.node())[index]
              , positions = uniqueValues(d.values,function(x){return x.d3plus[vars.axes.discrete]})
              , match = closest(positions,mouse)

            d.d3plus_data = d.values[positions.indexOf(match)]
            d.d3plus = d.values[positions.indexOf(match)].d3plus

          }

          var tooltip_data = d.d3plus_data ? d.d3plus_data : d

          createTooltip({
            "vars": vars,
            "data": tooltip_data
          })

          if (typeof vars.mouse == "function") {
            vars.mouse(d.d3plus_data || d, vars)
          }
          else if (vars.mouse[events.over]) {
            vars.mouse[events.over](d.d3plus_data || d, vars)
          }

          edge_update(d)

        }

      })
      .on(events.move,function(d){

        if (!vars.draw.frozen && (!d.d3plus || !d.d3plus.static)) {

          // vars.covered = false
          var tooltipType = vars.types[vars.type.value].tooltip || "follow"

          if (d.values && vars.axes.discrete) {

            var index = vars.axes.discrete === "x" ? 0 : 1
              , mouse = d3.mouse(vars.container.value.node())[index]
              , positions = uniqueValues(d.values,function(x){return x.d3plus[vars.axes.discrete]})
              , match = closest(positions,mouse)

            d.d3plus_data = d.values[positions.indexOf(match)]
            d.d3plus = d.values[positions.indexOf(match)].d3plus

          }

          var tooltip_data = d.d3plus_data ? d.d3plus_data : d
          createTooltip({
            "vars": vars,
            "data": tooltip_data
          })

          if (typeof vars.mouse == "function") {
            vars.mouse(d.d3plus_data || d, vars)
          }
          else if (vars.mouse[events.move]) {
            vars.mouse[events.move](d.d3plus_data || d, vars)
          }

        }

      })
      .on(events.out,function(d){

        var childElement = child(this,d3.event.toElement)

        if (!childElement && !vars.draw.frozen && (!d.d3plus || !d.d3plus.static)) {

          d3.select(this)
            .transition().duration(vars.timing.mouseevents)
            .call(transform)

          d3.select(this).selectAll(".d3plus_data")
            .transition().duration(vars.timing.mouseevents)
            .attr("opacity",vars.data.opacity)

          if (!vars.covered) {
            removeTooltip(vars.type.value)
          }

          if (typeof vars.mouse == "function") {
            vars.mouse(d.d3plus_data || d, vars)
          }
          else if (vars.mouse[events.out]) {
            vars.mouse[events.out](d.d3plus_data || d, vars)
          }

          edge_update()

        }

      })

  }
  else {

    var mouseEvent = function() {
      touchEvent(vars, d3.event)
    }

    vars.g.data.selectAll("g")
      .on(events.over, mouseEvent)
      .on(events.move, mouseEvent)
      .on(events.out , mouseEvent)

  }

  vars.g.data.selectAll("g")
    .on(events.click,function(d){

      if (!d3.event.defaultPrevented && !vars.draw.frozen && (!d.d3plus || !d.d3plus.static)) {

        if (typeof vars.mouse == "function") {
          vars.mouse(d.d3plus_data || d, vars)
        }
        else if (vars.mouse[events.out]) {
          vars.mouse[events.out](d.d3plus_data || d, vars)
        }
        else if (vars.mouse[events.click]) {
          vars.mouse[events.click](d.d3plus_data || d, vars)
        }

        var depth_delta = zoomDirection(d.d3plus_data || d, vars)
          , previous = vars.id.solo.value
          , title = fetchText(vars,d)[0]
          , color = legible(fetchColor(vars,d))
          , prev_sub = vars.title.sub.value || false
          , prev_color = vars.title.sub.font.color
          , prev_total = vars.title.total.font.color

        if (d.d3plus.threshold && d.d3plus.merged && vars.zoom.value) {

          vars.history.states.push(function(){

            vars.self
              .id({"solo": previous})
              .title({
                "sub": {
                  "font": {
                    "color": prev_color
                  },
                  "value": prev_sub
                },
                "total": {
                  "font": {
                    "color": prev_total
                  }
                }
              })
              .draw()

          })

          vars.self
            .id({"solo": uniqueValues(d.d3plus.merged, vars.id.value, fetchValue, vars)})
            .title({
              "sub": {
                "font": {
                  "color": color
                },
                "value": title
              },
              "total": {
                "font": {
                  "color": color
                }
              }
            })
            .draw()

        }
        else if (depth_delta === 1 && vars.zoom.value) {

          var id = fetchValue(vars, d.d3plus_data || d, vars.id.value)

          vars.history.states.push(function(){

            vars.self
              .depth(vars.depth.value-1)
              .id({"solo": previous})
              .title({
                "sub": {
                  "font": {
                    "color": prev_color
                  },
                  "value": prev_sub
                },
                "total": {
                  "font": {
                    "color": prev_total
                  }
                }
              })
              .draw()

          })

          vars.self
            .depth(vars.depth.value+1)
            .id({"solo": [id]})
            .title({
              "sub": {
                "font": {
                  "color": color
                },
                "value": title
              },
              "total": {
                "font": {
                  "color": color
                }
              }
            })
            .draw()

        }
        else if (depth_delta === -1 && vars.zoom.value &&
                 vars.history.states.length && !vars.tooltip.value.long) {

          vars.history.back()

        }
        else if (vars.types[vars.type.value].zoom && vars.zoom.value) {

          edge_update()

          d3.select(this)
            .transition().duration(vars.timing.mouseevents)
            .call(transform)

          d3.select(this).selectAll(".d3plus_data")
            .transition().duration(vars.timing.mouseevents)
            .attr("opacity",vars.data.opacity)

          removeTooltip(vars.type.value)
          vars.draw.update = false

          if (!d || d[vars.id.value] == vars.focus.value[0]) {
            vars.self.focus(false).draw()
          }
          else {
            vars.self.focus(d[vars.id.value]).draw()
          }

        }
        else if (vars.types[vars.type.value].requirements.indexOf("focus") < 0) {

          edge_update()

          var tooltip_data = d.d3plus_data ? d.d3plus_data : d

          createTooltip({
            "vars": vars,
            "data": tooltip_data
          })

        }

      }

    })

}

},{"../../../client/pointer.coffee":41,"../../../client/touch.coffee":45,"../../../color/legible.coffee":46,"../../../core/console/print.coffee":54,"../../../core/fetch/color.coffee":65,"../../../core/fetch/text.js":68,"../../../core/fetch/value.coffee":69,"../../../object/validate.coffee":166,"../../../string/strip.js":169,"../../../tooltip/remove.coffee":197,"../../../util/child.coffee":199,"../../../util/closest.coffee":200,"../../../util/uniques.coffee":204,"../tooltip/create.js":232,"../zoom/direction.coffee":242,"../zoom/propagation.coffee":245,"./arc.coffee":211,"./area.js":212,"./check.js":213,"./coordinates.coffee":215,"./cross.js":216,"./diamond.js":217,"./donut.js":218,"./fill.js":221,"./line.js":223,"./rect.coffee":224,"./segments.coffee":225,"./triangle_down.js":227,"./triangle_up.js":228,"./whisker.coffee":229}],220:[function(require,module,exports){
var buckets = require("../../../util/buckets.coffee"),
    offset  = require("../../../geom/offset.coffee");

module.exports = function(vars) {

  var edges = vars.returned.edges || [],
      scale = vars.zoom.behavior.scaleExtent()[0];

  if (typeof vars.edges.size.value === "string") {

    var strokeDomain = d3.extent(edges, function(e){
                         return e[vars.edges.size.value];
                       }),
        maxSize = d3.min(vars.returned.nodes || [], function(n){
                        return n.d3plus.r;
                      }) * (vars.edges.size.scale * 2);

    vars.edges.scale = d3.scale.sqrt()
      .domain(strokeDomain)
      .range([vars.edges.size.min,maxSize*scale]);

  }
  else {

    var defaultWidth = typeof vars.edges.size.value == "number" ?
                       vars.edges.size.value : vars.edges.size.min;

    vars.edges.scale = function(){
      return defaultWidth;
    };

  }

  var o = vars.edges.opacity.value;
  var o_type = typeof o;

  if (vars.edges.opacity.changed && o_type === "string") {
    var opacityScale = vars.edges.opacity.scale.value
      .domain(d3.extent(edges, function(d){
        return d[o];
      }))
      .range([vars.edges.opacity.min.value,1]);
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialization of Lines
  //----------------------------------------------------------------------------
  function init(l) {

    l
      .attr("opacity", 0)
      .style("stroke-width",0)
      .style("stroke",vars.background.value)
      .style("fill","none");
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Styling of Lines
  //----------------------------------------------------------------------------
  function style(edges) {

    var marker = vars.edges.arrows.value;

    edges
      .attr("opacity", function(d){
        return o_type === "number" ? o :
               o_type === "function" ? o(d, vars) :
               opacityScale(d[o]);
      })
      .style("stroke-width",function(e){
        return vars.edges.scale(e[vars.edges.size.value]);
      })
      .style("stroke",vars.edges.color)
      .attr("marker-start",function(e){

        var direction = vars.edges.arrows.direction.value;

        if ("bucket" in e.d3plus) {
          var d = "_"+e.d3plus.bucket;
        }
        else {
          var d = "";
        }

        return direction == "source" && marker
             ? "url(#d3plus_edge_marker_default"+d+")" : "none"

      })
      .attr("marker-end",function(e){

        var direction = vars.edges.arrows.direction.value

        if ("bucket" in e.d3plus) {
          var d = "_"+e.d3plus.bucket
        }
        else {
          var d = ""
        }

        return direction == "target" && marker
             ? "url(#d3plus_edge_marker_default"+d+")" : "none"

      })
      .attr("vector-effect","non-scaling-stroke")
      .attr("pointer-events","none")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Positioning of Lines
  //----------------------------------------------------------------------------
  function line(l) {
    l
      .attr("x1",function(d){
        return d[vars.edges.source].d3plus.edges[d[vars.edges.target][vars.id.value]].x;
      })
      .attr("y1",function(d){
        return d[vars.edges.source].d3plus.edges[d[vars.edges.target][vars.id.value]].y;
      })
      .attr("x2",function(d){
        return d[vars.edges.target].d3plus.edges[d[vars.edges.source][vars.id.value]].x;
      })
      .attr("y2",function(d){
        return d[vars.edges.target].d3plus.edges[d[vars.edges.source][vars.id.value]].y;
      });
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Positioning of Splines
  //----------------------------------------------------------------------------
  var curve = d3.svg.line().interpolate(vars.edges.interpolate.value);

  function spline(l) {
    l
      .attr("d", function(d) {

        return curve(d.d3plus.spline);

      });
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculates and Draws Label for edge
  //----------------------------------------------------------------------------
  function label(d) {

    delete d.d3plus_label

    if (vars.g.edges.selectAll("line, path").size() < vars.edges.large && vars.edges.label && d[vars.edges.label]) {

      if ("spline" in d.d3plus) {

        var length = this.getTotalLength(),
            center = this.getPointAtLength(length/2),
            prev = this.getPointAtLength((length/2)-(length*.1)),
            next = this.getPointAtLength((length/2)+(length*.1)),
            radians = Math.atan2(next.y-prev.y,next.x-prev.x),
            angle = radians*(180/Math.PI),
            bounding = this.parentNode.getBBox(),
            width = length*.8,
            x = center.x,
            y = center.y

      }
      else {

        var bounds = this.getBBox(),
            source = d[vars.edges.source],
            target = d[vars.edges.target],
            start = {"x": source.d3plus.edges[target[vars.id.value]].x, "y": source.d3plus.edges[target[vars.id.value]].y},
            end = {"x": target.d3plus.edges[source[vars.id.value]].x, "y": target.d3plus.edges[source[vars.id.value]].y},
            xdiff = end.x-start.x,
            ydiff = end.y-start.y,
            center = {"x": end.x-(xdiff)/2, "y": end.y-(ydiff)/2},
            radians = Math.atan2(ydiff,xdiff),
            angle = radians*(180/Math.PI),
            length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff)),
            width = length,
            x = center.x,
            y = center.y

      }

      width += vars.labels.padding*2

      var m = 0
      if (vars.edges.arrows.value) {
        m = typeof vars.edges.arrows.value === "number"
          ? vars.edges.arrows.value : 8
        m = m/vars.zoom.behavior.scaleExtent()[1]
        width -= m*2
      }

      if (angle < -90 || angle > 90) {
        angle -= 180
      }

      if (width*vars.zoom.behavior.scaleExtent()[0] > 20) {

        d.d3plus_label = {
          "x": x,
          "y": y,
          "translate": {"x": x, "y": y},
          "w": width,
          "h": 15+vars.labels.padding*2,
          "angle": angle,
          "anchor": "middle",
          "valign": "center",
          "color": vars.edges.color,
          "resize": false,
          "names": [vars.format.value(d[vars.edges.label])],
          "background": 1
        }

      }

    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter/update/exit the Arrow Marker
  //----------------------------------------------------------------------------
  var markerData = vars.edges.arrows.value ? typeof vars.edges.size.value == "string"
                  ? [ "default_0", "default_1", "default_2",
                      "highlight_0", "highlight_1", "highlight_2",
                      "focus_0", "focus_1", "focus_2" ]
                  : [ "default", "highlight", "focus" ] : []

  if (typeof vars.edges.size.value == "string") {
    var b = buckets(vars.edges.scale.range(),4)
      , markerSize = []
    for (var i = 0; i < 3; i++) {
      markerSize.push(b[i+1]+(b[1]-b[0])*(i+2)*2)
    }
  }
  else {
    var m = typeof vars.edges.arrows.value === "number"
          ? vars.edges.arrows.value : 8

    var markerSize = typeof vars.edges.size.value === "number"
                    ? vars.edges.size.value/m : m
  }

  var marker = vars.defs.selectAll(".d3plus_edge_marker")
    .data(markerData, String)

  var marker_style = function(path) {
    path
      .attr("d",function(id){

        var depth = id.split("_")

        if (depth.length == 2 && vars.edges.scale) {
          depth = parseInt(depth[1])
          var m = markerSize[depth]
        }
        else {
          var m = markerSize
        }

        if (vars.edges.arrows.direction.value == "target") {
          return "M 0,-"+m/2+" L "+m*.85+",0 L 0,"+m/2+" L 0,-"+m/2
        }
        else {
          return "M 0,-"+m/2+" L -"+m*.85+",0 L 0,"+m/2+" L 0,-"+m/2
        }
      })
      .attr("fill",function(d){

        var type = d.split("_")[0]

        if (type == "default") {
          return vars.edges.color
        }
        else if (type == "focus") {
          return vars.color.focus
        }
        else {
          return vars.color.primary
        }
      })
      .attr("transform","scale("+1/scale+")")
  }

  if (vars.draw.timing) {
    marker.exit().transition().duration(vars.draw.timing)
      .attr("opacity",0)
      .remove()

    marker.select("path").transition().duration(vars.draw.timing)
      .attr("opacity",1)
      .call(marker_style)
  }
  else {
    marker.exit().remove()

    marker.select("path")
      .attr("opacity",1)
      .call(marker_style)
  }

  var opacity = vars.draw.timing ? 0 : 1
  var enter = marker.enter().append("marker")
    .attr("id",function(d){
      return "d3plus_edge_marker_"+d
    })
    .attr("class","d3plus_edge_marker")
    .attr("orient","auto")
    .attr("markerUnits","userSpaceOnUse")
    .style("overflow","visible")
    .append("path")
    .attr("opacity",opacity)
    .attr("vector-effect","non-scaling-stroke")
    .call(marker_style)

  if (vars.draw.timing) {
    enter.transition().duration(vars.draw.timing)
      .attr("opacity",1)
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Bind "edges" data to lines in the "edges" group
  //----------------------------------------------------------------------------
  var strokeBuckets = typeof vars.edges.size.value == "string"
                    ? buckets(vars.edges.scale.domain(),4)
                    : null
    , direction = vars.edges.arrows.direction.value

  var line_data = edges.filter(function(l){

    if (!l.d3plus) l.d3plus = {}

    l.d3plus.id = "edge_"+l[vars.edges.source][vars.id.value]+"_"+l[vars.edges.target][vars.id.value]

    if ( l.d3plus.spline !== true ) {

      if (strokeBuckets) {
        var size = l[vars.edges.size.value]
        l.d3plus.bucket = size < strokeBuckets[1] ? 0
                        : size < strokeBuckets[2] ? 1 : 2
        var marker = markerSize[l.d3plus.bucket]*.85/scale
      }
      else {
        delete l.d3plus.bucket
        var marker = markerSize*.85/scale
      }

      var source = l[vars.edges.source]
        , target = l[vars.edges.target]

      if (!source.d3plus || !target.d3plus) return false

      var sourceAngle = Math.atan2( source.d3plus.y - target.d3plus.y
                                  , source.d3plus.x - target.d3plus.x )
        , targetAngle = Math.atan2( target.d3plus.y - source.d3plus.y
                                  , target.d3plus.x - source.d3plus.x )
        , sourceRadius = direction == "source" && vars.edges.arrows.value
                       ? source.d3plus.r + marker
                       : source.d3plus.r
        , targetRadius = direction == "target" && vars.edges.arrows.value
                       ? target.d3plus.r + marker
                       : target.d3plus.r
        , sourceOffset = offset( sourceAngle
                                           , sourceRadius
                                           , vars.shape.value )
        , targetOffset = offset( targetAngle
                                           , targetRadius
                                           , vars.shape.value )

      if (!("edges" in source.d3plus)) source.d3plus.edges = {}
      source.d3plus.edges[target[vars.id.value]] = {
          "x": source.d3plus.x - sourceOffset.x,
          "y": source.d3plus.y - sourceOffset.y
      }

      if (!("edges" in target.d3plus)) target.d3plus.edges = {}
      target.d3plus.edges[source[vars.id.value]] = {
          "x": target.d3plus.x - targetOffset.x,
          "y": target.d3plus.y - targetOffset.y
      }

      return true
    }

    return false

  })

  var lines = vars.g.edges.selectAll("g.d3plus_edge_line")
    .data(line_data,function(d){

      return d.d3plus.id

    })

  var spline_data = edges.filter(function(l){

    if (l.d3plus.spline) {

      if (strokeBuckets) {
        var size = l[vars.edges.size.value]
        l.d3plus.bucket = size < strokeBuckets[1] ? 0
                        : size < strokeBuckets[2] ? 1 : 2
        var marker = markerSize[l.d3plus.bucket]*.85/scale
      }
      else {
        delete l.d3plus.bucket
        var marker = markerSize*.85/scale
      }

      var source = l[vars.edges.source]
        , target = l[vars.edges.target]
        , sourceEdge = source.d3plus.edges ? source.d3plus.edges[target[vars.id.value]] || {} : {}
        , targetEdge = target.d3plus.edges ? target.d3plus.edges[source[vars.id.value]] || {} : {}
        , sourceMod = vars.edges.arrows.value && direction == "source" ? marker : 0
        , targetMod = vars.edges.arrows.value && direction == "target" ? marker : 0
        , angleTweak = 0.1
        , sourceTweak = source.d3plus.x > target.d3plus.x ? 1-angleTweak : 1+angleTweak
        , targetTweak = source.d3plus.x > target.d3plus.x ? 1+angleTweak : 1-angleTweak
        , sourceAngle = typeof sourceEdge.angle === "number" ? sourceEdge.angle
                      : Math.atan2( source.d3plus.y - target.d3plus.y
                                  , source.d3plus.x - target.d3plus.x ) * sourceTweak
        , sourceOffset = offset(sourceAngle, source.d3plus.r + sourceMod, vars.shape.value )
        , targetAngle = typeof targetEdge.angle === "number" ? targetEdge.angle
                      : Math.atan2( target.d3plus.y - source.d3plus.y
                                  , target.d3plus.x - source.d3plus.x ) * targetTweak
        , targetOffset = offset(targetAngle, target.d3plus.r + targetMod, vars.shape.value )
        , start = [source.d3plus.x-sourceOffset.x, source.d3plus.y-sourceOffset.y]
        , startOffset = sourceEdge.offset ? offset(sourceAngle,sourceEdge.offset) : false
        , startPoint = startOffset ? [start[0]-startOffset.x,start[1]-startOffset.y] : start
        , end = [target.d3plus.x-targetOffset.x, target.d3plus.y-targetOffset.y]
        , endOffset = targetEdge.offset ? offset(targetAngle,targetEdge.offset) : false
        , endPoint = endOffset ? [end[0]-endOffset.x,end[1]-endOffset.y] : end
        , xd = endPoint[0] - startPoint[0]
        , yd = endPoint[1] - startPoint[1]
        , sourceDistance = typeof sourceEdge.radius === "number" ? sourceEdge.radius : Math.sqrt(xd*xd+yd*yd)/4
        , targetDistance = typeof targetEdge.radius === "number" ? targetEdge.radius : Math.sqrt(xd*xd+yd*yd)/4
        , startAnchor = offset(sourceAngle,sourceDistance-source.d3plus.r-sourceMod*2)
        , endAnchor = offset(targetAngle,targetDistance-target.d3plus.r-targetMod*2)

      l.d3plus.spline = [ start, end ]
      var testAngle = Math.abs(Math.atan2( source.d3plus.y - target.d3plus.y
                                         , source.d3plus.x - target.d3plus.x )).toFixed(5)
        , testStart = Math.abs(sourceAngle).toFixed(5)
        , testEnd   = Math.abs(targetAngle - Math.PI).toFixed(5)

      if (testStart !== testEnd || [testStart,testEnd].indexOf(testAngle) < 0) {

        l.d3plus.spline.splice(1,0,[startPoint[0]-startAnchor.x,startPoint[1]-startAnchor.y],
                                   [endPoint[0]-endAnchor.x,endPoint[1]-endAnchor.y])

        if (startOffset) l.d3plus.spline.splice(1,0,startPoint)
        if (endOffset) l.d3plus.spline.splice(l.d3plus.spline.length-1,0,endPoint)

      }

      return true

    }

    return false

  })

  var splines = vars.g.edges.selectAll("g.d3plus_edge_path")
    .data(spline_data,function(d){

      return d.d3plus.id

    })

  if (vars.draw.timing) {

    lines.exit().transition().duration(vars.draw.timing)
      .attr("opacity",0)
      .remove()

    splines.exit().transition().duration(vars.draw.timing)
      .attr("opacity",0)
      .remove()

    lines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .transition().duration(vars.draw.timing/2)
      .attr("opacity",0)
      .remove()

    splines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .transition().duration(vars.draw.timing/2)
      .attr("opacity",0)
      .remove()

    lines.selectAll("line")
      .data(function(d){ return [d] })
      .transition().duration(vars.draw.timing)
        .call(line)
        .call(style)
        .each("end",label)

    splines.selectAll("path")
      .data(function(d){ return [d] })
      .transition().duration(vars.draw.timing)
        .call(spline)
        .call(style)
        .each("end",label)

    lines.enter().append("g")
      .attr("class","d3plus_edge_line")
      .append("line")
      .call(line)
      .call(init)
      .transition().duration(vars.draw.timing)
        .call(style)
        .each("end",label)

    splines.enter().append("g")
      .attr("class","d3plus_edge_path")
      .append("path")
      .call(spline)
      .call(init)
      .transition().duration(vars.draw.timing)
        .call(style)
        .each("end",label)

  }
  else {

    lines.exit().remove()

    splines.exit().remove()

    lines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .remove()

    splines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .remove()

    lines.selectAll("line")
      .data(function(d){ return [d] })
      .call(line)
      .call(style)
      .call(label)

    splines.selectAll("path")
      .data(function(d){ return [d] })
      .call(spline)
      .call(style)
      .call(label)

    lines.enter().append("g")
      .attr("class","d3plus_edge_line")
      .append("line")
      .call(line)
      .call(init)
      .call(style)
      .call(label)

    splines.enter().append("g")
      .attr("class","d3plus_edge_path")
      .append("path")
      .call(spline)
      .call(init)
      .call(style)
      .call(label)

  }

}

},{"../../../geom/offset.coffee":156,"../../../util/buckets.coffee":198}],221:[function(require,module,exports){
var copy       = require("../../../util/copy.coffee"),
    fetchColor = require("../../../core/fetch/color.coffee"),
    fetchValue = require("../../../core/fetch/value.coffee"),
    segments   = require("./segments.coffee"),
    shapeStyle = require("./style.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on enter and exit.
  //----------------------------------------------------------------------------
  function init(nodes) {

    nodes
      .attr("x",0)
      .attr("y",0)
      .attr("width",0)
      .attr("height",0);

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on update.
  //----------------------------------------------------------------------------
  function update(nodes,mod) {
    if (!mod) mod = 0;
    nodes
      .attr("x",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width;
        return (-w/2)-(mod/2);
      })
      .attr("y",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height;
        return (-h/2)-(mod/2);
      })
      .attr("width",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width;
        return w+mod;
      })
      .attr("height",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height;
        return h+mod;
      })
      .attr("rx",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width;
        var rounded = ["circle","donut"].indexOf(vars.shape.value) >= 0;
        return rounded ? (w+mod)/2 : 0;
      })
      .attr("ry",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height;
        var rounded = ["circle","donut"].indexOf(vars.shape.value) >= 0;
        return rounded ? (h+mod)/2 : 0;
      })
      .attr("shape-rendering",function(d){
        if (["square"].indexOf(vars.shape.value) >= 0) {
          return vars.shape.rendering.value;
        }
        else {
          return "auto";
        }
      });
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // In order to correctly animate each donut's size and arcs, we need to store
  // it's previous values in a lookup object that does not get destroyed when
  // redrawing the visualization.
  //----------------------------------------------------------------------------
  if (!vars.arcs) {
    vars.arcs = {
      "donut": {},
      "active": {},
      "temp": {}
    };
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main arc function that determines what values to use for each
  // arc angle and radius.
  //----------------------------------------------------------------------------
  var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d){
      var a = vars.arcs[d.d3plus.shape][d.d3plus.id].a;
      return a > Math.PI*2 ? Math.PI*2 : a;
    })
    .innerRadius(function(d){
      if (!d.d3plus.static && vars.shape.value === "donut") {
        var r = vars.arcs[d.d3plus.shape][d.d3plus.id].r;
        return r * vars.data.donut.size;
      }
      else {
        return 0;
      }
    })
    .outerRadius(function(d){
      var r = vars.arcs[d.d3plus.shape][d.d3plus.id].r;
      return vars.shape.value === "donut" ? r : r*2;
    });

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main "arcTween" function where all of the animation happens
  // for each arc.
  //----------------------------------------------------------------------------
  function size(path,mod,rad,ang) {
    if (!mod) mod = 0;
    if (typeof rad != "number") rad = undefined;
    if (typeof ang != "number") ang = undefined;
    path.attrTween("d", function(d){
      if (rad === undefined) var r = d.d3plus.r ? d.d3plus.r : d3.max([d.d3plus.width,d.d3plus.height]);
      else var r = rad;
      if (ang === undefined) var a = d.d3plus.segments[d.d3plus.shape];
      else var a = ang;
      if (!vars.arcs[d.d3plus.shape][d.d3plus.id]) {
        vars.arcs[d.d3plus.shape][d.d3plus.id] = {"r": 0};
        vars.arcs[d.d3plus.shape][d.d3plus.id].a = d.d3plus.shape === "donut" ? Math.PI * 2 : 0;
      }
      var radius = d3.interpolate(vars.arcs[d.d3plus.shape][d.d3plus.id].r,r+mod),
          angle = d3.interpolate(vars.arcs[d.d3plus.shape][d.d3plus.id].a,a);

      return function(t) {
        vars.arcs[d.d3plus.shape][d.d3plus.id].r = radius(t);
        vars.arcs[d.d3plus.shape][d.d3plus.id].a = angle(t);
        return arc(d);
      };
    });
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check each data point for active and temp data
  //----------------------------------------------------------------------------
  selection.each(function(d){

    var active = segments(vars, d, "active"),
        temp  = segments(vars, d, "temp"),
        total = segments(vars, d, "total"),
        group = d3.select(this),
        color = fetchColor(vars,d);

    var fill_data = [], hatch_data = [];

    if (total && vars.types[vars.type.value].fill) {

      if (temp) {
        var c = copy(d);
        c.d3plus.shape = "temp";
        fill_data.push(c);
        hatch_data = ["temp"];
      }

      if (active && (active < total || temp)) {
        var c = copy(d);
        c.d3plus.shape = "active";
        fill_data.push(c);
      }

    }

    function hatch_lines(l) {
      l
        .attr("stroke",color)
        .attr("stroke-width",1)
        .attr("shape-rendering",vars.shape.rendering.value);
    }

    var pattern = vars.defs.selectAll("pattern#d3plus_hatch_"+d.d3plus.id)
      .data(hatch_data);

    if (vars.draw.timing) {

      pattern.selectAll("rect")
        .transition().duration(vars.draw.timing)
        .style("fill",color);

      pattern.selectAll("line")
        .transition().duration(vars.draw.timing)
        .style("stroke",color);

    }
    else {

      pattern.selectAll("rect").style("fill",color);

      pattern.selectAll("line").style("stroke",color);

    }

    var pattern_enter = pattern.enter().append("pattern")
      .attr("id","d3plus_hatch_"+d.d3plus.id)
      .attr("patternUnits","userSpaceOnUse")
      .attr("x","0")
      .attr("y","0")
      .attr("width","10")
      .attr("height","10")
      .append("g");

    pattern_enter.append("rect")
      .attr("x","0")
      .attr("y","0")
      .attr("width","10")
      .attr("height","10")
      .attr("fill",color)
      .attr("fill-opacity",0.25);

    pattern_enter.append("line")
      .attr("x1","0")
      .attr("x2","10")
      .attr("y1","0")
      .attr("y2","10")
      .call(hatch_lines);

    pattern_enter.append("line")
      .attr("x1","-1")
      .attr("x2","1")
      .attr("y1","9")
      .attr("y2","11")
      .call(hatch_lines);

    pattern_enter.append("line")
      .attr("x1","9")
      .attr("x2","11")
      .attr("y1","-1")
      .attr("y2","1")
      .call(hatch_lines);

    var clip_data = fill_data.length ? [d] : [];

    var clip = group.selectAll("#d3plus_clip_"+d.d3plus.id)
      .data(clip_data);

    clip.enter().insert("clipPath",".d3plus_mouse")
      .attr("id","d3plus_clip_"+d.d3plus.id)
      .append("rect")
      .attr("class","d3plus_clipping")
      .call(init);

    if (vars.draw.timing) {

      clip.selectAll("rect").transition().duration(vars.draw.timing)
        .call(update);

      clip.exit().transition().delay(vars.draw.timing)
        .remove();

    }
    else {

      clip.selectAll("rect").call(update);

      clip.exit().remove();

    }

    var fills = group.selectAll("path.d3plus_fill")
      .data(fill_data);

    fills.transition().duration(vars.draw.timing)
      .call(shapeStyle,vars)
      .call(size);

    fills.enter().insert("path","rect.d3plus_mouse")
      .attr("class","d3plus_fill")
      .attr("clip-path","url(#d3plus_clip_"+d.d3plus.id+")")
      .transition().duration(0)
        .call(shapeStyle,vars)
        .call(size,0,undefined,0)
        .transition().duration(vars.draw.timing)
          .call(size)
          .call(shapeStyle,vars);

    fills.exit().transition().duration(vars.draw.timing)
      .call(size,0,undefined,0)
      .remove();

  });

};

},{"../../../core/fetch/color.coffee":65,"../../../core/fetch/value.coffee":69,"../../../util/copy.coffee":201,"./segments.coffee":225,"./style.coffee":226}],222:[function(require,module,exports){
var copy       = require("../../../util/copy.coffee"),
    fetchText  = require("../../../core/fetch/text.js"),
    fetchValue = require("../../../core/fetch/value.coffee"),
    mix        = require("../../../color/mix.coffee"),
    print      = require("../../../core/console/print.coffee"),
    rtl        = require("../../../client/rtl.coffee"),
    segments   = require("./segments.coffee"),
    shapeColor = require("./color.coffee"),
    stringList = require("../../../string/list.coffee"),
    textColor  = require("../../../color/text.coffee"),
    textWrap   = require("../../../textwrap/textwrap.coffee");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "labels" using svg:text and d3plus.textwrap
//------------------------------------------------------------------------------
module.exports = function( vars , group ) {

  var scale = vars.types[vars.type.value].zoom ? vars.zoom.behavior.scaleExtent() : [1,1],
              selection = vars.g[ group ].selectAll("g");

  var opacity = function(elem) {

    elem
      .attr("opacity",function(d){
        // if (vars.draw.timing) return 1;
        var size = parseFloat(d3.select(this).attr("font-size"),10);
        d.visible = size * (vars.zoom.scale/scale[1]) >= 2;
        return d.visible ? 1 : 0;
      });

  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Label Exiting
  //----------------------------------------------------------------------------
  remove = function(text) {

    if (vars.draw.timing) {
      text
        .transition().duration(vars.draw.timing)
        .attr("opacity",0)
        .remove();
    }
    else {
      text.remove();
    }

  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Label Styling
  //----------------------------------------------------------------------------
  style = function(text) {

    var salign = vars.labels.valign.value === "bottom" ? "top" : "bottom";

    text
      .attr("font-weight",vars.labels.font.weight)
      .attr("font-family",vars.labels.font.family.value)
      .attr("pointer-events",function(t){
        return t.mouse ? "auto": "none";
      })
      .attr("fill", function(t){

        if ( t.color ) return t.color;

        var color = shapeColor(t.parent,vars),
            legible = textColor(color),
            opacity = t.text ? 0.15 : 1;

        return mix( color , legible , 0.2 , opacity );

      })
      .each(function(t){

        if (t.resize instanceof Array) {
          var min = t.resize[0], max = t.resize[1];
        }

        var size = t.resize, resize = true;

        if (t.text) {

          if ( !(size instanceof Array) ) {
            size = [9, 50];
            resize = t.resize;
          }

          var y = t.y - t.h*scale[1]/2 + t.padding/2;
          if (salign === "bottom") y += (t.h * scale[1])/2;

          textWrap()
            .align("center")
            .container(d3.select(this))
            .height((t.h * scale[1])/2)
            .padding(t.padding/2)
            .resize(resize)
            .size(size)
            .text(vars.format.value(t.text*100,{"key": "share", "vars": vars}))
            .width(t.w * scale[1])
            .valign(salign)
            .x(t.x - t.w*scale[1]/2 + t.padding/2)
            .y(y)
            .draw();

        }
        else {

          if ( !(t.resize instanceof Array) ) {
            size = [7, 40*(scale[1]/scale[0])];
            resize = t.resize;
          }

          var yOffset = vars.labels.valign.value === "bottom" ? t.share : 0;

          textWrap()
            .align(t.anchor || vars.labels.align.value)
            .container( d3.select(this) )
            .height(t.h * scale[1] - t.share)
            .padding(t.padding/2)
            .resize( resize )
            .size( size )
            .shape(t.shape || "square")
            .text( t.names )
            .valign(vars.labels.valign.value)
            .width(t.w * scale[1])
            .x(t.x - t.w*scale[1]/2 + t.padding/2)
            .y(t.y - t.h*scale[1]/2 + t.padding/2 + yOffset)
            .draw();

        }

      })
      .attr("transform",function(t){
        var translate = d3.select(this).attr("transform") || "";
        var a = t.angle || 0,
            x = t.translate && t.translate.x ? t.translate.x : 0,
            y = t.translate && t.translate.y ? t.translate.y : 0;

        if (translate.length) {
          translate = translate.split(")").slice(-3).join(")");
        }
        return "rotate("+a+","+x+","+y+")scale("+1/scale[1]+")translate("+(t.x*scale[1]-t.x)+","+(t.y*scale[1]-t.y)+")" + translate;

      });

  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Loop through each selection and analyze the labels
  //----------------------------------------------------------------------------
  if (group === "edges" || vars.labels.value) {

    if ( vars.dev.value ) {
      var timerString = "drawing " + group + " labels";
      print.time( timerString );
    }

    selection.each(function(d){

      var disabled = d.d3plus && "label" in d.d3plus && !d.d3plus.label,
          label = d.d3plus_label || null,
          share = d.d3plus_share,
          names = d.d3plus.text ? d.d3plus.text :
                  label && label.names ? label.names :
                  vars.labels.text.value ?
                  fetchValue(vars, d, vars.labels.text.value) :
                  fetchText(vars,d),
          group = label && "group" in label ? label.group : d3.select(this),
          share_size = 0,
          fill = vars.types[vars.type.value].fill;

      if (!(names instanceof Array)) names = [names];

      if (label) {

        if (["line","area"].indexOf(vars.shape.value) >= 0) {
          var background = true;
        }
        else if (d && "d3plus" in d) {
          var active = segments(vars, d, "active"),
              temp   = segments(vars, d, "temp"),
              total  = segments(vars, d, "total"),
              background = (!temp && !active) || (active >= total) || (!active && temp >= total);
        }

      }

      if (!disabled && ((label && label.force) || background || !fill)) {

        if (share && d.d3plus.share && share.w-vars.labels.padding*2 >= 10 && share.h-vars.labels.padding*2 >= 10 && vars.labels.valign.value != "middle") {

          share.resize = vars.labels.resize.value === false ? false :
            share && "resize" in share ? share.resize : true;

          share.padding = vars.labels.padding;

          share.text = d.d3plus.share;
          share.parent = d;

          var text = group.selectAll("text#d3plus_share_"+d.d3plus.id)
            .data([share],function(t){
              return t.w+""+t.h+""+t.text;
            });

          if (vars.draw.timing && vars.zoom.scale === 1) {

            text
              .transition().duration(vars.draw.timing/2)
              .call(style);

            text.enter().append("text")
              .attr("id","d3plus_share_"+d.d3plus.id)
              .attr("class","d3plus_share")
              .attr("opacity",0)
              .call(style)
              .transition().duration(vars.draw.timing/2)
              .delay(vars.draw.timing/2)
              .attr("opacity",1);

          }
          else {

            text
              .attr("opacity",1)
              .call(style);

            text.enter().append("text")
              .attr("id","d3plus_share_"+d.d3plus.id)
              .attr("class","d3plus_share")
              .attr("opacity",1)
              .call(style);

          }

          share_size = text.node().getBBox().height + vars.labels.padding;

          text.exit().call(remove);

        }
        else {
          group.selectAll("text.d3plus_share")
            .call(remove);
        }

        if (label) {

          label.resize = vars.labels.resize.value === false ? false :
            label && "resize" in label ? label.resize : true;

          label.padding = typeof label.padding === "number" ? label.padding : vars.labels.padding;

        }

        if (label && label.w*scale[1]-label.padding >= 20 && label.h*scale[1]-label.padding >= 10 && names.length) {

          var and = vars.format.locale.value.ui.and,
              more = vars.format.locale.value.ui.more;

          for (var i = 0; i < names.length; i++) {
            if (names[i] instanceof Array) {
              names[i] = stringList(names[i],and,3,more);
            }
          }

          label.names = names;

          label.share = share_size;
          label.parent = d;

          var text = group.selectAll("text#d3plus_label_"+d.d3plus.id)
            .data([label],function(t){
              if (!t) return false;
              return t.w+"_"+t.h+"_"+t.x+"_"+t.y+"_"+t.names.join("_");
            }), fontSize = label.resize ? undefined :
                           (vars.labels.font.size * scale[0]) + "px";

          if (vars.draw.timing && vars.zoom.scale === 1) {

            text
              .transition().duration(vars.draw.timing/2)
              .call(style)
              .call(opacity);

            text.enter().append("text")
              .attr("font-size",fontSize)
              .attr("id","d3plus_label_"+d.d3plus.id)
              .attr("class","d3plus_label")
              .attr("opacity",0)
              .call(style)
              .transition().duration(vars.draw.timing/2)
                .delay(vars.draw.timing/2)
                .call(opacity);

          }
          else {

            text
              .attr("opacity",1)
              .call(style)
              .call(opacity);

            text.enter().append("text")
              .attr("font-size",fontSize)
              .attr("id","d3plus_label_"+d.d3plus.id)
              .attr("class","d3plus_label")
              .call(style)
              .call(opacity);

          }

          text.exit().call(remove);

          if (text.size() === 0 || text.selectAll("tspan").size() === 0) {
            delete d.d3plus_label;
            d3.select(this).selectAll("text#d3plus_label_"+d.d3plus.id+", rect#d3plus_label_bg_"+d.d3plus.id)
              .call(remove);
            vars.g.labels.selectAll("text#d3plus_label_"+d.d3plus.id+", rect#d3plus_label_bg_"+d.d3plus.id)
              .call(remove);
          }
          else {

            if (label.background) {

              var background_data = ["background"];

              var bounds = copy(text.node().getBBox());
              bounds.width += vars.labels.padding*scale[0];
              bounds.height += vars.labels.padding*scale[0];
              bounds.x -= (vars.labels.padding*scale[0])/2;
              bounds.y -= (vars.labels.padding*scale[0])/2;
              var t = text.attr("transform").split(")");
              bounds.y += parseFloat(t[t.length-2].split(",")[1]);

            }
            else {
              var background_data = [],
                  bounds = {};
            }

            var bg = group.selectAll("rect#d3plus_label_bg_"+d.d3plus.id)
                       .data(background_data),
                bg_opacity = typeof label.background === "number" ?
                             label.background :
                             typeof label.background === "string" ? 1 : 0.6;

            function bg_style(elem) {

              var color = typeof label.background === "string" ? label.background : vars.background.value === "none"
                        ? "#ffffff" : vars.background.value
                , fill = typeof label.background === "string"
                       ? label.background : color
                , a = label.angle || 0
                , x = label.translate ? bounds.x+bounds.width/2 : 0
                , y = label.translate ? bounds.y+bounds.height/2 : 0
                , transform = "scale("+1/scale[1]+")rotate("+a+","+x+","+y+")";

              elem
                .attr("fill",fill)
                .attr(bounds)
                .attr("transform",transform);

            }

            if (vars.draw.timing) {

              bg.exit().transition().duration(vars.draw.timing)
                .attr("opacity",0)
                .remove();

              bg.transition().duration(vars.draw.timing)
                .attr("opacity",bg_opacity)
                .call(bg_style);

              bg.enter().insert("rect",".d3plus_label")
                .attr("id","d3plus_label_bg_"+d.d3plus.id)
                .attr("class","d3plus_label_bg")
                .attr("opacity",0)
                .call(bg_style)
                .transition().duration(vars.draw.timing)
                  .attr("opacity",bg_opacity);

            }
            else {

              bg.exit().remove();

              bg.enter().insert("rect",".d3plus_label")
                .attr("id","d3plus_label_bg_"+d.d3plus.id)
                .attr("class","d3plus_label_bg");

              bg.attr("opacity",bg_opacity)
                .call(bg_style);

            }

          }

        }
        else {
          delete d.d3plus_label;
          d3.select(this).selectAll("text#d3plus_label_"+d.d3plus.id+", rect#d3plus_label_bg_"+d.d3plus.id)
            .call(remove);
          vars.g.labels.selectAll("text#d3plus_label_"+d.d3plus.id+", rect#d3plus_label_bg_"+d.d3plus.id)
            .call(remove);
        }

      }
      else {
        delete d.d3plus_label;
        d3.select(this).selectAll("text#d3plus_label_"+d.d3plus.id+", rect#d3plus_label_bg_"+d.d3plus.id)
          .call(remove);
        vars.g.labels.selectAll("text#d3plus_label_"+d.d3plus.id+", rect#d3plus_label_bg_"+d.d3plus.id)
          .call(remove);
      }
    });

    if ( vars.dev.value ) print.timeEnd( timerString );

  }
  else {

    if ( vars.dev.value ) {
      var timerString = "removing " + group + " labels";
      print.time( timerString );
    }

    selection.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .call(remove);

    vars.g.labels.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .call(remove);

    if ( vars.dev.value ) print.timeEnd( timerString );

  }
}

},{"../../../client/rtl.coffee":43,"../../../color/mix.coffee":48,"../../../color/text.coffee":52,"../../../core/console/print.coffee":54,"../../../core/fetch/text.js":68,"../../../core/fetch/value.coffee":69,"../../../string/list.coffee":168,"../../../textwrap/textwrap.coffee":194,"../../../util/copy.coffee":201,"./color.coffee":214,"./segments.coffee":225}],223:[function(require,module,exports){
var copy       = require("../../../util/copy.coffee"),
    closest    = require("../../../util/closest.coffee"),
    events     = require("../../../client/pointer.coffee"),
    shapeStyle = require("./style.coffee"),
    fetchValue = require("../../../core/fetch/value.coffee");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "line" shapes using svg:line
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The D3 line function that determines what variables to use for x and y
  // positioning, as well as line interpolation defined by the user.
  //----------------------------------------------------------------------------
  var line = d3.svg.line()
    .x(function(d){ return d.d3plus.x; })
    .y(function(d){ return d.d3plus.y; })
    .interpolate(vars.shape.interpolate.value);

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Divide each line into it's segments. We do this so that there can be gaps
  // in the line and mouseover.
  //
  // Then, create new data group from values to become small nodes at each
  // point on the line.
  //----------------------------------------------------------------------------

  var stroke = vars.data.stroke.width * 2,
      hitarea = stroke < 15 ? 15 : stroke,
      discrete = vars[vars.axes.discrete];

  var ticks = discrete.ticks.values.map(function(d){
    if (d.constructor === Date) return d.getTime();
    else return d;
  });

  selection.each(function(d){

    var lastIndex = false,
        segments = [],
        nodes = [],
        temp = copy(d),
        group = d3.select(this);

    temp.values = [];
    temp.segment_key = temp.key;
    d.values.forEach(function(v,i,arr){

      var k = fetchValue(vars, v, discrete.value);

      if (k.constructor === Date) k = k.getTime();

      var index = ticks.indexOf(closest(ticks,k));

      if (lastIndex === false || lastIndex === index - 1) {
        temp.values.push(v);
        temp.segment_key += "_" + index;
      }
      else {
        if (temp.values.length > 1) {
          segments.push(temp);
        }
        else {
          nodes.push(temp.values[0]);
        }
        temp = copy(d);
        temp.values = [v];
      }

      if ( i === arr.length - 1 ) {
        if (temp.values.length > 1) {
          segments.push(temp);
        }
        else {
          nodes.push(temp.values[0]);
        }
      }

      lastIndex = index;

    });

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind segment data to "paths"
    //--------------------------------------------------------------------------
    var paths = group.selectAll("path.d3plus_line")
      .data(segments, function(d){
        if (!d.d3plus) d.d3plus = {};
        d.d3plus.shape = "line";
        return d.segment_key;
      });

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind node data to "rects"
    //--------------------------------------------------------------------------
    var rects = group.selectAll("rect.d3plus_anchor")
      .data(nodes, function(d){
        if (!d.d3plus) d.d3plus = {};
        d.d3plus.r = vars.data.stroke.width * 2;
        return d.d3plus.id;
      });

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" and "rects" Enter/Update
    //--------------------------------------------------------------------------
    if (vars.draw.timing) {

      paths.exit().transition().duration(vars.draw.timing)
        .attr("opacity", 0)
        .remove();

      paths.transition().duration(vars.draw.timing)
        .attr("d",function(d){ return line(d.values); })
        .call(shapeStyle,vars);

      paths.enter().append("path")
        .attr("class","d3plus_line")
        .style("stroke-linecap","round")
        .attr("d", function(d){ return line(d.values); })
        .call(shapeStyle,vars)
        .attr("opacity", 0)
        .transition().duration(vars.draw.timing)
          .attr("opacity", 1);

      rects.enter().append("rect")
        .attr("class","d3plus_anchor")
        .attr("id",function(d){ return d.d3plus.id; })
        .call(init)
        .call(shapeStyle,vars);

      rects.transition().duration(vars.draw.timing)
        .call(update)
        .call(shapeStyle,vars);

      rects.exit().transition().duration(vars.draw.timing)
        .call(init)
        .remove();

    }
    else {

      paths.exit().remove();

      paths.enter().append("path")
        .attr("class","d3plus_line")
        .style("stroke-linecap","round");

      paths
        .attr("d",function(d){ return line(d.values); })
        .call(shapeStyle,vars);

      rects.enter().append("rect")
        .attr("class","d3plus_anchor")
        .attr("id",function(d){
          return d.d3plus.id;
        });

      rects.exit().remove();

      rects.call(update)
        .call(shapeStyle,vars);

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create mouse event lines
    //--------------------------------------------------------------------------
    var mouse = group.selectAll("path.d3plus_mouse")
      .data(segments, function(d){
        return d.segment_key;
      });

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Enter
    //--------------------------------------------------------------------------
    mouse.enter().append("path")
      .attr("class","d3plus_mouse")
      .attr("d", function(l){ return line(l.values); })
      .style("stroke","black")
      .style("stroke-width",hitarea)
      .style("fill","none")
      .style("stroke-linecap","round")
      .attr("opacity",0);

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Update
    //--------------------------------------------------------------------------
    mouse
      .on(events.over,function(m){
        if (!vars.draw.frozen) mouseStyle(vars, this, stroke, 2);
      })
      .on(events.out,function(d){
        if (!vars.draw.frozen) mouseStyle(vars, this, stroke, 0);
      });

    if (vars.draw.timing) {

      mouse.transition().duration(vars.draw.timing)
        .attr("d",function(l){ return line(l.values); })
        .style("stroke-width",hitarea);

    }
    else {

      mouse.attr("d",function(l){ return line(l.values); })
        .style("stroke-width",hitarea);

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Exit
    //--------------------------------------------------------------------------
    mouse.exit().remove();

  });

};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// The position and size of each anchor point on enter and exit.
//----------------------------------------------------------------------------
function init(n) {

  n
    .attr("x",function(d){
      return d.d3plus.x;
    })
    .attr("y",function(d){
      return d.d3plus.y;
    })
    .attr("width",0)
    .attr("height",0);

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// The position and size of each anchor point on update.
//----------------------------------------------------------------------------
function update(n,mod) {

  if (mod === undefined) mod = 0;

  n
    .attr("x",function(d){
      var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width;
      return d.d3plus.x - ((w/2)+(mod/2));
    })
    .attr("y",function(d){
      var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height;
      return d.d3plus.y - ((h/2)+(mod/2));
    })
    .attr("width",function(d){
      var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width;
      return w+mod;
    })
    .attr("height",function(d){
      var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height;
      return h+mod;
    })
    .attr("rx",function(d){
      var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width;
      return (w+mod)/2;
    })
    .attr("ry",function(d){
      var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height;
      return (h+mod)/2;
    });

}

function mouseStyle(vars, elem, stroke, mod) {

  var timing = vars.draw.timing ? vars.timing.mouseevents : 0;
  var pathWidth = mod ? stroke * mod : stroke;

  if (timing) {

    d3.select(elem.parentNode).selectAll("path.d3plus_line")
    .transition().duration(timing)
    .style("stroke-width",pathWidth);

    d3.select(elem.parentNode).selectAll("rect")
    .transition().duration(timing)
    .style("stroke-width",stroke)
    .call(update, mod);

  }
  else {

    d3.select(elem.parentNode).selectAll("path.d3plus_line")
    .style("stroke-width",pathWidth);

    d3.select(elem.parentNode).selectAll("rect")
    .style("stroke-width",stroke)
    .call(update, mod);
  }

}

},{"../../../client/pointer.coffee":41,"../../../core/fetch/value.coffee":69,"../../../util/closest.coffee":200,"../../../util/copy.coffee":201,"./style.coffee":226}],224:[function(require,module,exports){
var shapeStyle;

shapeStyle = require("./style.coffee");

module.exports = function(vars, selection, enter, exit) {
  var data, init, update;
  data = function(d) {
    var h, w;
    if (vars.labels.value && !d.d3plus.label) {
      w = (d.d3plus.r ? d.d3plus.r * 2 : d.d3plus.width);
      h = (d.d3plus.r ? d.d3plus.r * 2 : d.d3plus.height);
      d.d3plus_label = {
        w: w,
        h: h,
        x: 0,
        y: 0
      };
      d.d3plus_share = {
        w: w,
        h: h,
        x: 0,
        y: 0
      };
      d.d3plus_label.shape = (d.d3plus.shape === "circle" ? "circle" : "square");
    } else if (d.d3plus.label) {
      d.d3plus_label = d.d3plus.label;
    } else {
      delete d.d3plus_label;
    }
    return [d];
  };
  init = function(nodes) {
    return nodes.attr("x", function(d) {
      if (d.d3plus.init && "x" in d.d3plus.init) {
        return d.d3plus.init.x;
      } else {
        if (d.d3plus.init && "width" in d.d3plus.init) {
          return -d.d3plus.width / 2;
        } else {
          return 0;
        }
      }
    }).attr("y", function(d) {
      if (d.d3plus.init && "y" in d.d3plus.init) {
        return d.d3plus.init.y;
      } else {
        if (d.d3plus.init && "height" in d.d3plus.init) {
          return -d.d3plus.height / 2;
        } else {
          return 0;
        }
      }
    }).attr("width", function(d) {
      if (d.d3plus.init && "width" in d.d3plus.init) {
        return d.d3plus.init.width;
      } else {
        return 0;
      }
    }).attr("height", function(d) {
      if (d.d3plus.init && "height" in d.d3plus.init) {
        return d.d3plus.init.height;
      } else {
        return 0;
      }
    });
  };
  update = function(nodes) {
    return nodes.attr("x", function(d) {
      var w;
      w = d.d3plus.r ? d.d3plus.r * 2 : d.d3plus.width;
      return -w / 2;
    }).attr("y", function(d) {
      var h;
      h = d.d3plus.r ? d.d3plus.r * 2 : d.d3plus.height;
      return -h / 2;
    }).attr("width", function(d) {
      if (d.d3plus.r) {
        return d.d3plus.r * 2;
      } else {
        return d.d3plus.width;
      }
    }).attr("height", function(d) {
      if (d.d3plus.r) {
        return d.d3plus.r * 2;
      } else {
        return d.d3plus.height;
      }
    }).attr("rx", function(d) {
      var rounded, w;
      rounded = d.d3plus.shape === "circle";
      w = d.d3plus.r ? d.d3plus.r * 2 : d.d3plus.width;
      if (rounded) {
        return (w + 2) / 2;
      } else {
        return 0;
      }
    }).attr("ry", function(d) {
      var h, rounded;
      rounded = d.d3plus.shape === "circle";
      h = d.d3plus.r ? d.d3plus.r * 2 : d.d3plus.height;
      if (rounded) {
        return (h + 2) / 2;
      } else {
        return 0;
      }
    }).attr("transform", function(d) {
      if ("rotate" in d.d3plus) {
        return "rotate(" + d.d3plus.rotate + ")";
      } else {
        return "";
      }
    }).attr("shape-rendering", function(d) {
      if (d.d3plus.shape === "square" && (!("rotate" in d.d3plus))) {
        return vars.shape.rendering.value;
      } else {
        return "auto";
      }
    });
  };
  if (vars.draw.timing) {
    enter.append("rect").attr("class", "d3plus_data").call(init).call(shapeStyle, vars);
    selection.selectAll("rect.d3plus_data").data(data).transition().duration(vars.draw.timing).call(update).call(shapeStyle, vars);
    return exit.selectAll("rect.d3plus_data").transition().duration(vars.draw.timing).call(init);
  } else {
    enter.append("rect").attr("class", "d3plus_data");
    return selection.selectAll("rect.d3plus_data").data(data).call(update).call(shapeStyle, vars);
  }
};



},{"./style.coffee":226}],225:[function(require,module,exports){
var fetchValue;

fetchValue = require("../../../core/fetch/value.coffee");

module.exports = function(vars, d, segment) {
  var ret;
  ret = vars[segment].value;
  if (ret) {
    if (segment in d.d3plus) {
      return d.d3plus[segment];
    } else {
      return fetchValue(vars, d, ret);
    }
  } else {
    return d.d3plus[segment];
  }
};



},{"../../../core/fetch/value.coffee":69}],226:[function(require,module,exports){
var color;

color = require("./color.coffee");

module.exports = function(nodes, vars) {
  return nodes.attr("fill", function(d) {
    if (d.d3plus && d.d3plus.spline) {
      return "none";
    } else {
      return color(d, vars);
    }
  }).style("stroke", function(d) {
    var c;
    if (d.d3plus && d.d3plus.stroke) {
      return d.d3plus.stroke;
    } else {
      c = d.values ? color(d.values[0], vars) : color(d, vars, true);
      return d3.rgb(c).darker(0.6);
    }
  }).style("stroke-width", function(d) {
    var mod;
    mod = d.d3plus.shape === "line" ? 2 : 1;
    return vars.data.stroke.width * mod;
  }).attr("opacity", vars.data.opacity).attr("vector-effect", "non-scaling-stroke");
};



},{"./color.coffee":214}],227:[function(require,module,exports){
var shapeStyle  = require("./style.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize check scale on enter and exit.
  //----------------------------------------------------------------------------
  function init(paths){
    paths.attr("d", d3.svg.symbol().type("triangle-down").size(10))
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Change scale of check on update.
  //---------------------------------------------------------------------------
  function update(paths){
    paths.attr("d", d3.svg.symbol().type("triangle-down").size(function(d){
      var smaller_dim = Math.min(d.d3plus.width, d.d3plus.height);
      return d3.scale.pow().exponent(2)(smaller_dim/2);
    }))
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","d3plus_data")
    .call(init)
    .call(shapeStyle,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) {
      return [d];
    })

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .call(update)
        .call(shapeStyle,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .call(update)
      .call(shapeStyle,vars)
  }

}

},{"./style.coffee":226}],228:[function(require,module,exports){
var shapeStyle  = require("./style.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize check scale on enter and exit.
  //----------------------------------------------------------------------------
  function init(paths){
    paths.attr("d", d3.svg.symbol().type("triangle-up").size(10))
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Change scale of check on update.
  //---------------------------------------------------------------------------
  function update(paths){
    paths.attr("d", d3.svg.symbol().type("triangle-up").size(function(d){
      var smaller_dim = Math.min(d.d3plus.width, d.d3plus.height);
      return d3.scale.pow().exponent(2)(smaller_dim/2);
    }))
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","d3plus_data")
    .call(init)
    .call(shapeStyle,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) {
      return [d];
    })

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .call(update)
        .call(shapeStyle,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .call(update)
      .call(shapeStyle,vars)
  }

}

},{"./style.coffee":226}],229:[function(require,module,exports){
module.exports = function(vars, selection, enter, exit) {
  var d, data, init, marker, orient, pos, position, size, style;
  data = function(d) {
    if (d.d3plus.text) {
      d.d3plus_label = {
        w: size,
        h: size,
        x: 0,
        y: 0,
        background: "#fff",
        resize: false,
        angle: ["left", "right"].indexOf(d.d3plus.position) >= 0 ? 90 : 0
      };
    } else if (d.d3plus.label) {
      d.d3plus_label = d.d3plus.label;
    } else {
      delete d.d3plus_label;
    }
    return [d];
  };
  style = function(line) {
    return line.style("stroke-width", vars.data.stroke.width).style("stroke", "#444").attr("fill", "none").attr("shape-rendering", vars.shape.rendering.value);
  };
  init = function(line) {
    return line.attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 0);
  };
  position = function(line) {
    return line.attr("x1", function(d) {
      var offset, w, x;
      if (["top", "bottom"].indexOf(d.d3plus.position) >= 0) {
        return 0;
      } else {
        offset = d.d3plus.offset || 0;
        w = d.d3plus.width || 0;
        x = offset < 0 ? -w : w;
        return x + offset;
      }
    }).attr("x2", function(d) {
      if (["top", "bottom"].indexOf(d.d3plus.position) >= 0) {
        return 0;
      } else {
        return d.d3plus.offset || 0;
      }
    }).attr("y1", function(d) {
      var h, offset, y;
      if (["left", "right"].indexOf(d.d3plus.position) >= 0) {
        return 0;
      } else {
        offset = d.d3plus.offset || 0;
        h = d.d3plus.height || 0;
        y = offset < 0 ? -h : h;
        return y + offset;
      }
    }).attr("y2", function(d) {
      if (["left", "right"].indexOf(d.d3plus.position) >= 0) {
        return 0;
      } else {
        return d.d3plus.offset || 0;
      }
    }).attr("marker-start", "url(#d3plus_whisker_marker)");
  };
  marker = vars.defs.selectAll("#d3plus_whisker_marker").data([0]);
  marker.enter().append("marker").attr("id", "d3plus_whisker_marker").attr("markerUnits", "userSpaceOnUse").style("overflow", "visible").append("line");
  d = selection.datum();
  if (d) {
    pos = d.d3plus.position;
    orient = ["top", "bottom"].indexOf(pos) >= 0 ? "horizontal" : "vertical";
    size = orient === "horizontal" ? d.d3plus.width : d.d3plus.height;
  } else {
    orient = "horizontal";
    size = 0;
  }
  marker.select("line").attr("x1", orient === "horizontal" ? -size / 2 : 0).attr("x2", orient === "horizontal" ? size / 2 : 0).attr("y1", orient === "vertical" ? -size / 2 : 0).attr("y2", orient === "vertical" ? size / 2 : 0).call(style).style("stroke-width", vars.data.stroke.width * 2);
  if (vars.draw.timing) {
    enter.append("line").attr("class", "d3plus_data").call(style).call(init);
    selection.selectAll("line.d3plus_data").data(data).transition().duration(vars.draw.timing).call(style).call(position);
    exit.selectAll("line.d3plus_data").transition().duration(vars.draw.timing).call(init);
  } else {
    enter.append("line").attr("class", "d3plus_data");
    selection.selectAll("line.d3plus_data").data(data).call(style).call(position);
  }
};



},{}],230:[function(require,module,exports){
var events = require("../../../client/pointer.coffee"),
    prefix     = require("../../../client/prefix.coffee"),
    print      = require("../../../core/console/print.coffee"),
    touch      = require("../../../client/touch.coffee"),
    touchEvent = require("../zoom/propagation.coffee");

// Enter SVG Elements
module.exports = function(vars) {

  if ( vars.dev.value ) print.time("creating SVG elements");

  // Enter SVG
  vars.svg = vars.container.value.selectAll("svg#d3plus").data([0]);
  vars.svg.enter().insert("svg","#d3plus_message")
    .attr("id","d3plus")
    .attr("width",vars.width.value)
    .attr("height",vars.height.value)
    .attr("xmlns","http://www.w3.org/2000/svg")
    .attr("xmlns:xmlns:xlink","http://www.w3.org/1999/xlink");

  // Enter BG Rectangle
  vars.g.bg = vars.svg.selectAll("rect#bg").data(["bg"]);
  vars.g.bg.enter().append("rect")
    .attr("id","bg")
    .attr("fill",vars.background.value)
    .attr("width",vars.width.value)
    .attr("height",vars.height.value);

  // Enter Timeline Group
  vars.g.timeline = vars.svg.selectAll("g#timeline").data(["timeline"]);
  vars.g.timeline.enter().append("g")
    .attr("id","timeline")
    .attr("transform","translate(0,"+vars.height.value+")");

  // Enter Key Group
  vars.g.legend = vars.svg.selectAll("g#key").data(["key"]);
  vars.g.legend.enter().append("g")
    .attr("id","key")
    .attr("transform","translate(0,"+vars.height.value+")");

  // Enter Footer Group
  vars.g.footer = vars.svg.selectAll("g#footer").data(["footer"]);
  vars.g.footer.enter().append("g")
    .attr("id","footer")
    .attr("transform","translate(0,"+vars.height.value+")");

  // Enter App Clipping Mask
  var clipID = "clipping_" + vars.container.id;
  vars.g.clipping = vars.svg.selectAll("#clipping").data(["clipping"]);
  vars.g.clipping.enter().append("clipPath")
    .attr("id", clipID)
    .append("rect")
      .attr("width",vars.width.viz)
      .attr("height",vars.height.viz);

  // Enter Container Group
  vars.g.container = vars.svg.selectAll("g#container").data(["container"]);
  vars.g.container.enter().append("g")
    .attr("id","container")
    .attr("clip-path","url(#" + clipID + ")")
    .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")");

  // Enter Zoom Group
  vars.g.zoom = vars.g.container.selectAll("g#zoom").data(["zoom"]);
  vars.g.zoom.enter().append("g")
    .attr("id","zoom");

  // Enter App Background Group
  vars.g.viz = vars.g.zoom.selectAll("g#d3plus_viz").data(["d3plus_viz"]);
  vars.g.viz.enter().append("g")
    .attr("id","d3plus_viz");

  // Enter App Overlay Rect
  vars.g.overlay = vars.g.viz.selectAll("rect#d3plus_overlay").data([{"id":"d3plus_overlay"}]);
  vars.g.overlay.enter().append("rect")
    .attr("id","d3plus_overlay")
    .attr("width",vars.width.value)
    .attr("height",vars.height.value)
    .attr("opacity",0);

  if (!touch) {

    vars.g.overlay
      .on(events.move,function(d){

        if (vars.types[vars.type.value].zoom && vars.zoom.pan.value &&
          vars.zoom.behavior.scaleExtent()[0] < vars.zoom.scale) {
          d3.select(this).style("cursor",prefix()+"grab");
        }
        else {
          d3.select(this).style("cursor","auto");
        }

      })
      .on(events.up,function(d){

        if (vars.types[vars.type.value].zoom && vars.zoom.pan.value &&
          vars.zoom.behavior.scaleExtent()[0] < vars.zoom.scale) {
          d3.select(this).style("cursor",prefix()+"grab");
        }
        else {
          d3.select(this).style("cursor","auto");
        }

      })
      .on(events.down,function(d){

        if (vars.types[vars.type.value].zoom && vars.zoom.pan.value &&
          vars.zoom.behavior.scaleExtent()[0] < vars.zoom.scale) {
          d3.select(this).style("cursor",prefix()+"grabbing");
        }
        else {
          d3.select(this).style("cursor","auto");
        }

      });

  }
  else {

    var mouseEvent = function() {
      touchEvent(vars, d3.event);
    };

    vars.g.overlay
      .on(events.over, mouseEvent)
      .on(events.move, mouseEvent)
      .on(events.out , mouseEvent);

  }

  // Enter App Background Group
  vars.g.app = vars.g.viz.selectAll("g#app").data(["app"]);
  vars.g.app.enter().append("g")
    .attr("id","app");

  // Enter Edges Group
  vars.g.edges = vars.g.viz.selectAll("g#edges").data(["edges"]);
  vars.g.edges.enter().append("g")
    .attr("id","edges")
    .attr("opacity",0);

  // Enter Edge Focus Group
  vars.g.edge_focus = vars.g.viz.selectAll("g#focus").data(["focus"]);
  vars.g.edge_focus.enter().append("g")
    .attr("id","focus");

  // Enter Edge Hover Group
  vars.g.edge_hover = vars.g.viz.selectAll("g#edge_hover").data(["edge_hover"]);
  vars.g.edge_hover.enter().append("g")
    .attr("id","edge_hover")
    .attr("opacity",0);

  // Enter App Data Group
  vars.g.data = vars.g.viz.selectAll("g#data").data(["data"]);
  vars.g.data.enter().append("g")
    .attr("id","data")
    .attr("opacity",0);

  // Enter Data Focus Group
  vars.g.data_focus = vars.g.viz.selectAll("g#data_focus").data(["data_focus"]);
  vars.g.data_focus.enter().append("g")
    .attr("id","data_focus");

  // Enter Top Label Group
  vars.g.labels = vars.g.viz.selectAll("g#d3plus_labels").data(["d3plus_labels"]);
  vars.g.labels.enter().append("g")
    .attr("id","d3plus_labels");

  vars.defs = vars.svg.selectAll("defs").data(["defs"]);
  vars.defs.enter().append("defs");

  if ( vars.dev.value ) print.timeEnd("creating SVG elements");

};

},{"../../../client/pointer.coffee":41,"../../../client/prefix.coffee":42,"../../../client/touch.coffee":45,"../../../core/console/print.coffee":54,"../zoom/propagation.coffee":245}],231:[function(require,module,exports){
var print = require("../../../core/console/print.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Updating Elements
//------------------------------------------------------------------------------
module.exports = function(vars) {

  if ( vars.dev.value ) print.time("updating SVG elements")

  if ( vars.draw.timing ) {

    // Update Parent Element
    vars.container.value.transition().duration(vars.draw.timing)
      .style("width",vars.width.value+"px")
      .style("height",vars.height.value+"px")

    // Update SVG
    vars.svg.transition().duration(vars.draw.timing)
        .attr("width",vars.width.value)
        .attr("height",vars.height.value)

    // Update Background Rectangle
    vars.g.bg.transition().duration(vars.draw.timing)
        .attr("width",vars.width.value)
        .attr("height",vars.height.value)

    // Update App Clipping Rectangle
    vars.g.clipping.select("rect").transition().duration(vars.draw.timing)
      .attr("width",vars.width.viz)
      .attr("height",vars.height.viz)

    // Update Container Groups
    vars.g.container.transition().duration(vars.draw.timing)
      .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")

  }
  else {

    // Update Parent Element
    vars.container.value
      .style("width",vars.width.value+"px")
      .style("height",vars.height.value+"px")

    // Update SVG
    vars.svg
      .attr("width",vars.width.value)
      .attr("height",vars.height.value)

    // Update Background Rectangle
    vars.g.bg
      .attr("width",vars.width.value)
      .attr("height",vars.height.value)

    // Update App Clipping Rectangle
    vars.g.clipping.select("rect")
      .attr("width",vars.width.viz)
      .attr("height",vars.height.viz)

    // Update Container Groups
    vars.g.container
      .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")

  }

  if ( vars.dev.value ) print.timeEnd("updating SVG elements")

}

},{"../../../core/console/print.coffee":54}],232:[function(require,module,exports){
var arraySort     = require("../../../array/sort.coffee"),
    createTooltip = require("../../../tooltip/create.js"),
    dataNest      = require("../../../core/data/nest.js"),
    fetchData     = require("./data.js"),
    fetchColor    = require("../../../core/fetch/color.coffee"),
    fetchText     = require("../../../core/fetch/text.js"),
    fetchValue    = require("../../../core/fetch/value.coffee"),
    mergeObject   = require("../../../object/merge.coffee"),
    removeTooltip = require("../../../tooltip/remove.coffee"),
    segments      = require("../shapes/segments.coffee"),
    uniques       = require("../../../util/uniques.coffee"),
    validObject   = require("../../../object/validate.coffee"),
    zoomDirection = require("../zoom/direction.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates correctly formatted tooltip for Apps
//-------------------------------------------------------------------
module.exports = function(params) {

  if ( !( "d3plus" in params.data ) ) {
    params.data.d3plus = {}
  }

  var vars = params.vars,
      d = params.data,
      dataDepth = "d3plus" in d && "depth" in d.d3plus ? d.d3plus.depth : vars.depth.value,
      ex = params.ex,
      mouse = params.mouseevents ? params.mouseevents : false,
      arrow = "arrow" in params ? params.arrow : true,
      id = fetchValue(vars,d,vars.id.value),
      tooltip_id = params.id || vars.type.value

  if ((d3.event && d3.event.type == "click") && (vars.tooltip.html.value || vars.tooltip.value.long) && !("fullscreen" in params)) {
    var fullscreen = true,
        arrow = false,
        mouse = true,
        length = "long",
        footer = vars.footer.value

    vars.covered = true
  }
  else {
    var fullscreen = false,
        align = params.anchor || vars.tooltip.anchor,
        length = params.length || "short",
        zoom = zoomDirection(d, vars)

    if (zoom === -1) {
      var key = vars.id.nesting[dataDepth-1],
          parent = fetchValue(vars,id,key)
    }

    if (zoom === 1 && vars.zoom.value) {
      var text = vars.format.value(vars.format.locale.value.ui.expand)
    }
    else if (zoom === -1 && vars.zoom.value && vars.history.states.length && !vars.tooltip.value.long) {
      var text = vars.format.value(vars.format.locale.value.ui.collapse)
    }
    else if (!vars.small && length == "short" && (vars.tooltip.html.value || vars.tooltip.value.long) && (vars.focus.value.length !== 1 || vars.focus.value[0] != id)) {
      var text = vars.format.locale.value.ui.moreInfo
    }
    else if (length == "long") {
      var text = vars.footer.value || ""
    }
    else {
      var text = ""
    }

    var footer = text.length ? vars.format.value(text,{"key": "footer", "vars": vars}) : false

  }

  if ("x" in params) {
    var x = params.x;
  }
  else if (vars.types[vars.type.value].tooltip === "static") {
    var x = d.d3plus.x;
    if (vars.zoom.translate && vars.zoom.scale) {
      x = vars.zoom.translate[0]+x*vars.zoom.scale;
    }
    x += vars.margin.left;
    if (params.length !== "long") {
      y += window.scrollX;
      x += vars.container.value.node().getBoundingClientRect().left;
      x += parseFloat(vars.container.value.style("padding-left"), 10);
    }
  }
  else {
    var x = d3.mouse(d3.select("html").node())[0];
  }

  if ("y" in params) {
    var y = params.y;
  }
  else if (vars.types[vars.type.value].tooltip == "static") {
    var y = d.d3plus.y;
    if (vars.zoom.translate && vars.zoom.scale) {
      y = vars.zoom.translate[1]+y*vars.zoom.scale;
    }
    y += vars.margin.top;
    if (params.length !== "long") {
      y += window.scrollY;
      y += vars.container.value.node().getBoundingClientRect().top;
      y += parseFloat(vars.container.value.style("padding-top"), 10);
    }
  }
  else {
    var y = d3.mouse(d3.select("html").node())[1];
  }

  if ("offset" in params) {
    var offset = params.offset;
  }
  else if (vars.types[vars.type.value].tooltip == "static") {
    var offset = d.d3plus.r ? d.d3plus.r : d.d3plus.height/2;
    if (vars.zoom.scale) {
      offset = offset * vars.zoom.scale;
    }
  }
  else {
    var offset = 3;
  }

  function make_tooltip(html) {

    var titleDepth = "depth" in params ? params.depth : dataDepth;

    var ex = {},
        children = {},
        depth     = vars.id.nesting[titleDepth+1] in d ? titleDepth + 1 : titleDepth,
        nestKey   = vars.id.nesting[depth],
        nameList  = "merged" in d.d3plus ? d.d3plus.merged : d[nestKey];

    if (!(nameList instanceof Array)) nameList = [nameList];

    var dataValue = fetchValue( vars , d , vars.size.value );

    if (vars.tooltip.children.value) {

      nameList = nameList.slice(0);

      if (vars.size.value && validObject(nameList[0])) {

        var namesWithValues = nameList.filter(function(n){
          return vars.size.value in n && (!("d3plus" in n) || !n.d3plus.merged);
        });

        var namesNoValues = nameList.filter(function(n){
          return !(vars.size.value in n) || (n.d3plus && n.d3plus.merged);
        });

        arraySort(namesWithValues, vars.size.value, "desc", [], vars);

        nameList = namesWithValues.concat(namesNoValues);

      }

      var limit = length === "short" ? 3 : vars.data.large,
          listLength = nameList.length,
          max   = d3.min([listLength , limit]),
          objs  = [];

      for (var i = 0; i < max; i++) {

        if (!nameList.length) break;

        var obj  = nameList.shift(),
            name = fetchText(vars, obj, depth)[0],
            id   = validObject(obj) ? fetchValue(vars, obj, nestKey, depth) : obj;

        if (id !== d[vars.id.nesting[titleDepth]] && name && !children[name]) {

          var value = fetchValue(vars, obj, vars.size.value, nestKey),
              color = fetchColor(vars, obj, nestKey);

          children[name] = value && !(value instanceof Array) ? vars.format.value(value, {"key": vars.size.value, "vars": vars, "data": obj}) : "";

          if (color) {
            if ( !children.d3plus_colors ) children.d3plus_colors = {};
            children.d3plus_colors[name] = color;
          }

        }
        else {
          i--;
        }

      }

      if ( listLength > max ) {
        children.d3plusMore = listLength - max;
      }

    }

    if (d.d3plus.tooltip) {
      ex = mergeObject(ex, d.d3plus.tooltip);
    }

    function getLabel(method) {
      return typeof vars[method].value === "string" ? vars[method].value :
             vars.format.locale.value.method[method];
    }

    if ( vars.tooltip.size.value ) {
      if (dataValue && typeof vars.size.value !== "number") {
        ex[getLabel("size")] = dataValue;
      }
      if (vars.axes.opposite && vars[vars.axes.opposite].value !== vars.size.value) {
        ex[getLabel(vars.axes.opposite)] = fetchValue(vars, d, vars[vars.axes.opposite].value);
      }
      if (vars.color.valueScale) {
        ex[getLabel("color")] = fetchValue(vars, d, vars.color.value);
      }
    }

    var active = segments(vars, d, "active"),
        temp   = segments(vars, d, "temp"),
        total  = segments(vars, d, "total");

    if (typeof active == "number" && active > 0 && total) {
      ex[getLabel("active")] = active+"/"+total+" ("+vars.format.value((active/total)*100, {"key": "share", "vars": vars, "data": d})+")";
    }

    if (typeof temp == "number" && temp > 0 && total) {
      ex[getLabel("temp")] = temp+"/"+total+" ("+vars.format.value((temp/total)*100, {"key": "share", "vars": vars, "data": d})+")";
    }

    if ( vars.tooltip.share.value && d.d3plus.share ) {
      ex.share = vars.format.value(d.d3plus.share*100, {"key": "share", "vars": vars, "data": d});
    }

    var depth = "depth" in params ? params.depth : dataDepth,
        title = params.title || fetchText(vars,d,depth)[0],
        icon = uniques(d, vars.icon.value, fetchValue, vars, vars.id.nesting[depth]),
        tooltip_data = fetchData(vars,d,length,ex,children,depth)

    if (icon.length === 1 && typeof icon[0] === "string") {
      icon = icon[0];
    }
    else {
      icon = false;
    }

    if ((tooltip_data.length > 0 || footer) || ((!d.d3plus_label && length == "short" && title) || (d.d3plus_label && (!("visible" in d.d3plus_label) || ("visible" in d.d3plus_label && d.d3plus_label.visible === false))))) {

      if (!title) {
        title = id;
      }

      var depth = "d3plus" in d && "merged" in d.d3plus ? dataDepth - 1 : dataDepth

      if (depth < 0) depth = 0

      depth = vars.id.nesting[depth]

      if (typeof vars.icon.style.value == "string") {
        var icon_style = vars.icon.style.value
      }
      else if (typeof vars.icon.style.value == "object" && vars.icon.style.value[depth]) {
        var icon_style = vars.icon.style.value[depth]
      }
      else {
        var icon_style = "default"
      }

      if (params.width) {
        var width = params.width
      }
      else if (!fullscreen && tooltip_data.length == 0) {
        var width = "auto"
      }
      else {
        var width = vars.tooltip.small
      }

      var parent = params.length !== "long" ? d3.select("body") : vars.container.value

      createTooltip({
        "align": align,
        "arrow": arrow,
        "locale": vars.format.locale.value,
        "background": vars.tooltip.background,
        "curtain": vars.tooltip.curtain.color,
        "curtainopacity": vars.tooltip.curtain.opacity,
        "fontcolor": vars.tooltip.font.color,
        "fontfamily": vars.tooltip.font.family.value,
        "fontsize": vars.tooltip.font.size,
        "fontweight": vars.tooltip.font.weight,
        "data": tooltip_data,
        "color": fetchColor(vars, d),
        "allColors": true,
        "footer": params.footer === false ? params.footer : footer,
        "fullscreen": fullscreen,
        "html": html,
        "icon": icon,
        "id": tooltip_id,
        "max_height": params.maxheight,
        "max_width": vars.tooltip.small,
        "mouseevents": mouse,
        "offset": offset,
        "parent": parent,
        "style": icon_style,
        "title": title,
        "width": width,
        "x": x,
        "y": y
      })

    }
    else {
      removeTooltip(tooltip_id)
    }

  }

  if (fullscreen || params.length === "long") {

    if (typeof vars.tooltip.html.value == "string") {
      make_tooltip(vars.tooltip.html.value)
    }
    else if (typeof vars.tooltip.html.value == "function") {
      make_tooltip(vars.tooltip.html.value(id))
    }
    else if (vars.tooltip.html.value && typeof vars.tooltip.html.value == "object" && vars.tooltip.html.value.url) {
      var tooltip_url = vars.tooltip.html.value.url;
      if (typeof tooltip_url === "function") tooltip_url = tooltip_url(id);
      d3.json(tooltip_url,function(data){
        var html = vars.tooltip.html.value.callback ? vars.tooltip.html.value.callback(data) : data
        make_tooltip(html)
      })
    }
    else {
      make_tooltip("")
    }

  }
  else {
    make_tooltip("")
  }

}

},{"../../../array/sort.coffee":37,"../../../core/data/nest.js":62,"../../../core/fetch/color.coffee":65,"../../../core/fetch/text.js":68,"../../../core/fetch/value.coffee":69,"../../../object/merge.coffee":165,"../../../object/validate.coffee":166,"../../../tooltip/create.js":195,"../../../tooltip/remove.coffee":197,"../../../util/uniques.coffee":204,"../shapes/segments.coffee":225,"../zoom/direction.coffee":242,"./data.js":233}],233:[function(require,module,exports){
var copy = require("../../../util/copy.coffee"),
    fetchValue   = require("../../../core/fetch/value.coffee"),
    fetchColor   = require("../../../core/fetch/color.coffee"),
    fetchText    = require("../../../core/fetch/text.js"),
    legible      = require("../../../color/legible.coffee"),
    mergeObject  = require("../../../object/merge.coffee"),
    prefix       = require("../../../client/prefix.coffee"),
    stringFormat = require("../../../string/format.js"),
    validObject  = require("../../../object/validate.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates a data object for the Tooltip
//------------------------------------------------------------------------------
module.exports = function(vars, id, length, extras, children, depth) {

  if (vars.small) {
    return []
  }

  if (!length) var length = "long"
  if (length == "long") {
    var other_length = "short"
  }
  else {
    var other_length = "long"
  }

  var extra_data = {}
  if (extras && typeof extras == "string") extras = [extras]
  else if (extras && typeof extras == "object") {
    extra_data = mergeObject(extra_data,extras)
    var extras = []
    for ( var k in extra_data ) {
      extras.push(k)
    }
  }
  else if (!extras) var extras = []

  var tooltip_highlights = []

  if (vars.tooltip.value instanceof Array) {
    var a = vars.tooltip.value
  }
  else if (typeof vars.tooltip.value == "string") {
    var a = [vars.tooltip.value]
  }
  else {

    if (vars.tooltip.value[vars.id.nesting[depth]]) {
      var a = vars.tooltip.value[vars.id.nesting[depth]]
    }
    else {
      var a = vars.tooltip.value
    }

    if (!(a instanceof Array)) {

      if (a[length]) {
        a = a[length]
      }
      else if (a[other_length]) {
        a = []
      }
      else {
        a = mergeObject({"":[]},a)
      }

    }

    if (typeof a == "string") {
      a = [a]
    }
    else if (!(a instanceof Array)) {
      a = mergeObject({"":[]},a)
    }

  }

  function format_key(key,group) {

    if (vars.attrs.value[group]) var id_var = group
    else var id_var = null

    if (group) group = vars.format.value(group)

    var value = extra_data[key] || fetchValue(vars,id,key,id_var)

    if (validObject(value)) {
      tooltip_data.push({
        "name": vars.format.value(key),
        "value": vars.format.value(value.value, {"key": value.key, "vars": vars}),
        "group": group
      })
    }
    else if (value != null && value != "undefined" && !(value instanceof Array) && ((typeof value === "string" && value.indexOf("d3plus_other") < 0) || !(typeof value === "string"))) {
      var name = vars.format.locale.value.ui[key]
               ? vars.format.value(vars.format.locale.value.ui[key])
               : vars.format.value(key),
          h = tooltip_highlights.indexOf(key) >= 0

      if ( value instanceof Array ) {
        value.forEach(function(v){
          v = vars.format.value(v, {"key": key, "vars": vars, "data": id})
        })
      }
      else {
        value = vars.format.value(value, {"key": key, "vars": vars, "data": id})
      }

      var obj = {"name": name, "value": value, "highlight": h, "group": group}

      if ( vars.descs.value ) {

        if ( typeof vars.descs.value === "function" ) {
          var descReturn = vars.descs.value( key )
          if ( typeof descReturn === "string" ) {
            obj.desc = descReturn
          }
        }
        else if ( key in vars.descs.value ) {
          obj.desc = vars.descs.value[key]
        }

      }

      tooltip_data.push(obj)

    }

  }

  var tooltip_data = []
  if (a.constructor === Array) a = {"": a};

  if (vars.id.nesting.length && depth < vars.id.nesting.length-1) {
    var a = copy(a)
    vars.id.nesting.forEach(function(n,i){
      if (i > depth && a[n]) delete a[n]
    })
  }

  for (var group in a) {
    if (a[group].constructor !== Array) a[group] = [a[group]]
    for (var i = extras.length; i > 0; i--) {
      if (a[group].indexOf(extras[i-1]) >= 0) {
        extras.splice(i-1, 1);
      }
    }
  }

  if (vars.tooltip.value.long && typeof vars.tooltip.value.long == "object") {
    var placed = []

    for (var group in vars.tooltip.value.long) {

      for (var i = extras.length; i > 0; i--) {
        var e = extras[i-1];
        if (vars.tooltip.value.long[group].indexOf(e) >= 0) {
          if (!a[group]) a[group] = [];
          a[group].push(e);
          extras.splice(i-1, 1);
        }
      }

    }

  }

  if (extras.length) {
    if (!a[""]) a[""] = []
    a[""] = a[""].concat(extras);
  }

  for (var group in a) {
    a[group].forEach(function(t){
      format_key(t, group);
    });
  }

  if ( children ) {

    var title  = vars.format.locale.value.ui.including
      , colors = children.d3plus_colors

    for ( var child in children ) {

      if ( child !== "d3plus_colors" ) {

        if ( child === "d3plusMore" ) {

          var more = vars.format.locale.value.ui.more
            , name = stringFormat(more,children[child])
            , highlight = true
          children[child] = ""

        }
        else {
          var name = child,
              highlight = colors && colors[name] ? colors[name] : false
        }

        tooltip_data.push({
          "group": vars.format.value(title),
          "highlight": highlight,
          "name": name,
          "value": children[child]
        })

      }

    }
  }

  if ( vars.tooltip.connections.value && length === "long" ) {

    var connections = vars.edges.connections( id[vars.id.value] , vars.id.value , true )

    if ( connections.length ) {
      connections.forEach(function(conn){

        var c = vars.data.viz.filter(function(d){
          return d[vars.id.value] === conn[vars.id.value]
        })

        var c = c.length ? c[0] : conn

        var name = fetchText(vars,c)[0],
            color = fetchColor(vars,c),
            size = vars.tooltip.font.size,
            radius = vars.shape.value == "square" ? 0 : size
            styles = [
              "background-color: "+color,
              "border-color: "+legible(color),
              "border-style: solid",
              "border-width: "+vars.data.stroke.width+"px",
              "display: inline-block",
              "height: "+size+"px",
              "left: 0px",
              "position: absolute",
              "width: "+size+"px",
              "top: 0px",
              prefix()+"border-radius: "+radius+"px",
            ]
            node = "<div style='"+styles.join("; ")+";'></div>"

        var nodeClick = function() {
          vars.self.focus([c[vars.id.value]]).draw()
        }

        tooltip_data.push({
          "group": vars.format.value(vars.format.locale.value.ui.primary),
          "highlight": false,
          "link": nodeClick,
          "name": "<div id='d3plustooltipfocuslink_"+c[vars.id.value]+"' class='d3plus_tooltip_focus_link' style='position:relative;padding-left:"+size*1.5+"px;'>"+node+name+"</div>"
        })

      })
    }

  }

  return tooltip_data

}

},{"../../../client/prefix.coffee":42,"../../../color/legible.coffee":46,"../../../core/fetch/color.coffee":65,"../../../core/fetch/text.js":68,"../../../core/fetch/value.coffee":69,"../../../object/merge.coffee":165,"../../../object/validate.coffee":166,"../../../string/format.js":167,"../../../util/copy.coffee":201}],234:[function(require,module,exports){
var print;

print = require("../../../core/console/print.coffee");

module.exports = function(vars) {
  var app, d, dataRequired, drawable, i, len, ref, requirements, returned, visualization;
  vars.group = vars.g.apps[vars.type.value];
  vars.mouse = {};
  visualization = vars.types[vars.type.value];
  requirements = visualization.requirements || [];
  dataRequired = requirements.indexOf("data") >= 0;
  drawable = !dataRequired || (dataRequired && vars.data.viz.length);
  if (!vars.error.internal && drawable) {
    app = vars.format.locale.value.visualization[vars.type.value];
    if (vars.dev.value) {
      print.time("running " + app);
    }
    ref = vars.data.viz;
    for (i = 0, len = ref.length; i < len; i++) {
      d = ref[i];
      if (d.d3plus) {
        delete d.d3plus.shape;
        delete d.d3plus.label;
        delete d.d3plus.rotate;
      }
    }
    returned = visualization(vars);
    if (vars.dev.value) {
      print.timeEnd("running " + app);
    }
  } else {
    returned = null;
  }
  vars.returned = {
    nodes: [],
    edges: null
  };
  if (returned instanceof Array) {
    vars.returned.nodes = returned;
  } else if (returned) {
    if (returned.nodes) {
      vars.returned.nodes = returned.nodes;
    }
    if (returned.edges) {
      vars.returned.edges = returned.edges;
    }
  }
};



},{"../../../core/console/print.coffee":54}],235:[function(require,module,exports){
var copy        = require("../../../util/copy.coffee"),
    form        = require("../../../form/form.js"),
    print       = require("../../../core/console/print.coffee"),
    validObject = require("../../../object/validate.coffee");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws a UI drawer, if defined.
//------------------------------------------------------------------------------
module.exports = function( vars ) {

  var enabled = vars.ui.value && vars.ui.value.length,
      position = vars.ui.position.value;

  if ( vars.dev.value && enabled ) print.time("drawing custom UI elements");

  var drawer = vars.container.value.selectAll("div#d3plus_drawer")
    .data(["d3plus_drawer"]);

  drawer.enter().append("div")
    .attr("id","d3plus_drawer");

  var positionStyles = {};
  vars.ui.position.accepted.forEach(function(p){
    positionStyles[p] = p == position ? vars.margin.bottom+"px" : "auto";
  });

  drawer
    .style("text-align",vars.ui.align.value)
    .style("position","absolute")
    .style("width",vars.width.value-(vars.ui.padding*2)+"px")
    .style("height","auto")
    .style(positionStyles);

  var ui = drawer.selectAll("div.d3plus_drawer_ui")
    .data(enabled ? vars.ui.value : [], function(d){
      return d.method || false;
    });

  ui.enter().append("div")
    .attr("class","d3plus_drawer_ui")
    .style("padding",vars.ui.padding+"px")
    .style("display","inline-block")
    .each(function(d){

      var container = d3.select(this);
      var focus, callback;

      if (typeof d.method === "string" && d.method in vars) {
        focus = vars[d.method].value;
        callback = function(value) {
          if ( value !== vars[d.method].value ) {
            vars.self[d.method](value).draw();
          }
        };
      }
      else {
        focus = d.value[0];
        if (validObject(focus)) focus = focus[d3.keys(focus)[0]];
        if (typeof d.method === "function") {
          callback = function(value) {
            d.method(value, vars.self);
          };
        }
      }

      d.form = form()
        .container(container)
        .data({"sort": false})
        .focus(focus, callback)
        .id("id")
        .text("text");

    });

  ui.each(function(d){

    var data = [], title;

    if (d.label) {
      title = d.label;
    }
    else if (typeof d.method === "string" && d.method in vars) {
      title = vars.format.locale.value.method[d.method] || d.method;
    }

    d.value.forEach(function(o){

      var obj = {};

      if (validObject(o)) {
        obj.id   = o[d3.keys(o)[0]];
        obj.text = vars.format.value(d3.keys(o)[0]);
      }
      else {
        obj.id   = o;
        obj.text = vars.format.value(o);
      }

      data.push(obj);

    });

    var font = copy(vars.ui.font);
    font.align = copy(vars.font.align);
    font.secondary = copy(font);

    d.form
      .data(data)
      .font(font)
      .format(vars.format.locale.language)
      .title(vars.format.value(title))
      .type(d.type || "auto")
      .ui({
        "align": vars.ui.align.value,
        "padding": vars.ui.padding,
        "margin": 0
      })
      .width(d.width || false)
      .draw();

  });

  ui.exit().remove();

  var drawerHeight = drawer.node().offsetHeight || drawer.node().getBoundingClientRect().height;

  if ( drawerHeight ) {
    vars.margin[position] += drawerHeight;
  }

  if ( vars.dev.value && enabled ) print.timeEnd("drawing custom UI elements");

};

},{"../../../core/console/print.coffee":54,"../../../form/form.js":99,"../../../object/validate.coffee":166,"../../../util/copy.coffee":201}],236:[function(require,module,exports){
var events, lighter, print, stylesheet;

events = require("../../../client/pointer.coffee");

lighter = require("../../../color/lighter.coffee");

print = require("../../../core/console/print.coffee");

stylesheet = require("../../../client/css.coffee");

module.exports = function(vars) {
  var button, color, containerPadding, enter, family, left, min_height, padding, size, stripY, style, titleClass, titleGroup, top, weight;
  if (!vars.small && vars.history.states.length > 0) {
    if (vars.dev.value) {
      print.time("drawing back button");
    }
    button = vars.container.value.selectAll("div#d3plus_back_button").data(["d3plus_back_button"]).style("position", "relative").style("z-index", 1900);
    size = vars.title.sub.font.size;
    color = vars.title.sub.font.color;
    family = vars.title.sub.font.family.value;
    weight = vars.title.sub.font.weight;
    padding = vars.title.sub.padding;
    titleClass = false;
    if (vars.title.sub.value && ["start", "left"].indexOf(vars.title.sub.font.align) < 0) {
      titleClass = "sub";
    } else if (vars.title.total.value && ["start", "left"].indexOf(vars.title.total.font.align) < 0) {
      titleClass = "total";
    } else if (vars.title.value && ["start", "left"].indexOf(vars.title.font.align) < 0) {
      titleClass = "title";
    }
    if (titleClass) {
      stripY = function(elem) {
        var y;
        y = elem.attr("transform").split(",");
        y = y[y.length - 1];
        return parseFloat(y.substring(0, y.length - 1));
      };
      titleGroup = vars.svg.select(".d3plus_title." + titleClass);
      top = stripY(titleGroup) + stripY(titleGroup.select("text"));
    } else {
      top = vars.margin.top - vars.title.padding;
      min_height = size + padding * 2;
      vars.margin.top += min_height;
    }
    containerPadding = parseFloat(vars.container.value.style("padding-top"), 10);
    top += containerPadding;
    containerPadding = parseFloat(vars.container.value.style("padding-left"), 10);
    left = vars.margin.left + size / 2 + containerPadding;
    style = function(elem) {
      return elem.style("position", "absolute").style("left", left + "px").style("top", top + "px").style("color", color).style("font-family", family).style("font-weight", weight).style("font-size", size + "px");
    };
    enter = button.enter().append("div").attr("id", "d3plus_back_button").style("opacity", 0).call(style).html(function() {
      var arrow;
      if (stylesheet("font-awesome")) {
        arrow = "<i class='fa fa-angle-left' style='margin-top:2px;margin-right:4px;'></i>";
      } else {
        arrow = "&laquo; ";
      }
      return arrow + vars.format.value(vars.format.locale.value.ui.back);
    });
    button.on(events.over, function() {
      if (!vars.small && vars.history.states.length > 0) {
        return d3.select(this).style("cursor", "pointer").transition().duration(vars.timing.mouseevents).style("color", lighter(color, .25));
      }
    }).on(events.out, function() {
      if (!vars.small && vars.history.states.length > 0) {
        return d3.select(this).style("cursor", "auto").transition().duration(vars.timing.mouseevents).style("color", color);
      }
    }).on(events.click, function() {
      return vars.history.back();
    }).transition().duration(vars.draw.timing).style("opacity", 1).call(style);
    if (vars.dev.value) {
      return print.timeEnd("drawing back button");
    }
  } else {
    return vars.container.value.selectAll("div#d3plus_back_button").transition().duration(vars.draw.timing).style("opacity", 0).remove();
  }
};



},{"../../../client/css.coffee":39,"../../../client/pointer.coffee":41,"../../../color/lighter.coffee":47,"../../../core/console/print.coffee":54}],237:[function(require,module,exports){
var arraySort = require("../../../array/sort.coffee"),
    buckets       = require("../../../util/buckets.coffee"),
    copy          = require("../../../util/copy.coffee"),
    createTooltip = require("../tooltip/create.js"),
    dataNest      = require("../../../core/data/nest.js"),
    dataURL       = require("../../../util/dataURL.coffee"),
    events        = require("../../../client/pointer.coffee"),
    fetchValue    = require("../../../core/fetch/value.coffee"),
    fetchColor    = require("../../../core/fetch/color.coffee"),
    fetchText     = require("../../../core/fetch/text.js"),
    print         = require("../../../core/console/print.coffee"),
    removeTooltip = require("../../../tooltip/remove.coffee"),
    textColor     = require("../../../color/text.coffee"),
    uniqueValues  = require("../../../util/uniques.coffee"),
    stringStrip   = require("../../../string/strip.js"),
    textWrap      = require("../../../textwrap/textwrap.coffee"),
    touch         = require("../../../client/touch.coffee"),
    validObject   = require("../../../object/validate.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates color key
//------------------------------------------------------------------------------
module.exports = function(vars) {

  var key_display = true,
      square_size = 0;

  if (!vars.error.internal && vars.color.value && !vars.small && vars.legend.value) {

    if (!vars.color.valueScale) {

      if ( vars.dev.value ) print.time("grouping data by colors");

      var data;
      if ( vars.nodes.value && vars.types[vars.type.value].requirements.indexOf("nodes") >= 0 ) {
        data = copy(vars.nodes.restriced || vars.nodes.value);
        if ( vars.data.viz.length ) {
          for (var i = 0 ; i < data.length ; i++) {
            var appData = vars.data.viz.filter(function(a){
              return a[vars.id.value] === data[i][vars.id.value];
            });
            if (appData.length) {
              data[i] = appData[0];
            }
          }
        }
      }
      else {
        data = vars.data.viz;
      }

      var colorFunction = function(d){
            return fetchColor(vars, d, colorDepth);
          },
          colorDepth = 0,
          colorKey = vars.id.value;

      var colorIndex = vars.id.nesting.indexOf(vars.color.value);
      if (colorIndex >= 0) {
        colorDepth = colorIndex;
        colorKey = vars.id.nesting[colorIndex];
      }
      else {

        for (var n = 0; n <= vars.depth.value; n++) {

          colorDepth = n;
          colorKey   = vars.id.nesting[n];

          var uniqueIDs = uniqueValues(data , function(d){
                return fetchValue(vars, d, colorKey);
              }),
              uniqueColors = uniqueValues(data, colorFunction);

          if (uniqueIDs.length <= uniqueColors.length && uniqueColors.length > 1) {
            break;
          }

        }

      }

      var legendNesting = [vars.color.value];
      if (vars.icon.value && vars.legend.icons.value) legendNesting.push(vars.icon.value);
      var colors = dataNest(vars, data, legendNesting, []);

      if ( vars.dev.value ) print.timeEnd("grouping data by color")

      var available_width = vars.width.value;

      square_size = vars.legend.size;

      var key_width = square_size*colors.length+vars.ui.padding*(colors.length+1)

      if (square_size instanceof Array) {

        if ( vars.dev.value ) print.time("calculating legend size")

        for (var i = square_size[1]; i >= square_size[0]; i--) {
          key_width = i*colors.length+vars.ui.padding*(colors.length+1)
          if (available_width >= key_width) {
            square_size = i;
            break;
          }
        }

        if ( vars.dev.value ) print.timeEnd("calculating legend size");

      }
      else if (typeof square_size != "number" && square_size !== false) {
        square_size = 30;
      }

      if (available_width < key_width || colors.length == 1) {
        key_display = false;
      }
      else {

        key_width -= vars.ui.padding*2;

        if ( vars.dev.value ) print.time("sorting legend");

        var order = vars[vars.legend.order.value].value;

        arraySort(colors, order, vars.legend.order.sort.value, vars.color.value, vars, colorDepth);

        if ( vars.dev.value ) print.timeEnd("sorting legend");

        if ( vars.dev.value ) print.time("drawing legend");

        var start_x;

        if (vars.legend.align == "start") {
          start_x = vars.ui.padding;
        }
        else if (vars.legend.align == "end") {
          start_x = available_width - vars.ui.padding - key_width;
        }
        else {
          start_x = available_width/2 - key_width/2;
        }

        vars.g.legend.selectAll("g.d3plus_scale")
          .transition().duration(vars.draw.timing)
          .attr("opacity",0)
          .remove();

        function position(group) {

          group
            .attr("transform",function(g,i){
              var x = start_x + (i*(vars.ui.padding+square_size))
              return "translate("+x+","+vars.ui.padding+")"
            })

        }

        function style(rect) {

          rect
            .attr("width", square_size)
            .attr("height", square_size)
            .attr("fill",function(g){

              d3.select(this.parentNode).select("text").remove();

              var icon = uniqueValues(g, vars.icon.value, fetchValue, vars, colorKey),
                  color = fetchColor(vars, g, colorKey);

              if (vars.legend.icons.value && icon.length === 1 &&
                  typeof icon[0] === "string") {
                icon = icon[0];
                var short_url = stringStrip(icon+"_"+color),
                    iconStyle = vars.icon.style.value,
                    icon_style,
                    pattern = vars.defs.selectAll("pattern#"+short_url)
                      .data([short_url]);

                if (typeof iconStyle === "string") {
                  icon_style = vars.icon.style.value;
                }
                else if (validObject(iconStyle) && iconStyle[colorKey]) {
                  icon_style = iconStyle[colorKey];
                }
                else {
                  icon_style = "default";
                }

                color = icon_style == "knockout" ? color : "none";

                pattern.select("rect").transition().duration(vars.draw.timing)
                  .attr("fill",color)
                  .attr("width",square_size)
                  .attr("height",square_size);

                pattern.select("image").transition().duration(vars.draw.timing)
                  .attr("width",square_size)
                  .attr("height",square_size);

                var pattern_enter = pattern.enter().append("pattern")
                  .attr("id",short_url)
                  .attr("width",square_size)
                  .attr("height",square_size);

                pattern_enter.append("rect")
                  .attr("fill",color)
                  .attr("width",square_size)
                  .attr("height",square_size);

                pattern_enter.append("image")
                  .attr("xlink:href",icon)
                  .attr("width",square_size)
                  .attr("height",square_size)
                  .each(function(d){

                    if (icon.indexOf("/") === 0 || icon.indexOf(window.location.hostname) >= 0) {
                      dataURL(icon,function(base64){
                        pattern.select("image").attr("xlink:href",base64);
                      });
                    }
                    else {
                      pattern.select("image").attr("xlink:href",icon);
                    }

                  });

                return "url(#"+short_url+")";
              }
              else {

                var names;
                if (vars.legend.text.value) {
                  names = [fetchValue(vars, g, vars.legend.text.value, colorDepth)];
                }
                else {
                  names = fetchText(vars, g, colorDepth);
                }

                if (names.length === 1 && !(names[0] instanceof Array) && names[0].length) {

                  var text = d3.select(this.parentNode).append("text");

                  text
                    .attr("font-size",vars.legend.font.size+"px")
                    .attr("font-weight",vars.legend.font.weight)
                    .attr("font-family",vars.legend.font.family.value)
                    .attr("fill",textColor(color))
                    .attr("x",0)
                    .attr("y",0)
                    .each(function(t){

                      textWrap()
                        .align("middle")
                        .container( d3.select(this) )
                        .height(square_size)
                        .padding(vars.ui.padding)
                        .resize( vars.labels.resize.value )
                        .text( names[0] )
                        .width(square_size)
                        .valign("middle")
                        .draw();

                    })

                  if (text.select("tspan").empty()) {
                    text.remove();
                  }

                }

                return color;
              }

            });

        }

        var colorInt = {};
        var keys = vars.g.legend.selectAll("g.d3plus_color")
          .data(colors,function(d){
            var c = fetchColor(vars, d, colorKey);
            if (!(c in colorInt)) colorInt[c] = -1;
            colorInt[c]++;
            return colorInt[c]+"_"+c;
          });

        keys.enter().append("g")
          .attr("class","d3plus_color")
          .attr("opacity",0)
          .call(position)
          .append("rect")
            .attr("class","d3plus_color")
            .call(style);

        keys.order()
          .transition().duration(vars.draw.timing)
          .call(position)
          .attr("opacity", 1)
          .selectAll("rect.d3plus_color")
            .call(style);

        keys.exit()
          .transition().duration(vars.draw.timing)
          .attr("opacity",0)
          .remove();

        if (!touch && vars.legend.tooltip.value) {

          keys
            .on(events.over,function(d,i){

              d3.select(this).style("cursor","pointer");

              var bounds = this.getBoundingClientRect(),
                  x = bounds.left + square_size/2 + window.scrollX,
                  y = bounds.top + square_size/2 + window.scrollY;

              var idIndex = vars.id.nesting.indexOf(colorKey),
                  title = idIndex >= 0 ? fetchText(vars,d,idIndex)[0] :
                          vars.format.value(fetchValue(vars,d,vars.color.value,colorKey), {"key": vars.color.value, "vars": vars, "data": d});

              createTooltip({
                "data": d,
                "footer": false,
                "vars": vars,
                "x": x,
                "y": y,
                "title": title,
                "offset": square_size*0.4
              });

            })
            .on(events.out,function(d){
              removeTooltip(vars.type.value);
            });

        }

        if ( vars.dev.value ) print.timeEnd("drawing legend");

      }

    }
    else if (vars.color.valueScale) {

      if ( vars.dev.value ) print.time("drawing color scale");

      vars.g.legend.selectAll("g.d3plus_color")
        .transition().duration(vars.draw.timing)
        .attr("opacity",0)
        .remove();

      var values = vars.color.valueScale.domain(),
          colors = vars.color.valueScale.range();

      if (values.length <= 2) {
        values = buckets(values,6);
      }

      var scale = vars.g.legend.selectAll("g.d3plus_scale")
        .data(["scale"]);

      scale.enter().append("g")
        .attr("class","d3plus_scale")
        .attr("opacity",0);

      var heatmap = scale.selectAll("#d3plus_legend_heatmap")
        .data(["heatmap"]);

      heatmap.enter().append("linearGradient")
        .attr("id", "d3plus_legend_heatmap")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");

      var stops = heatmap.selectAll("stop")
        .data(d3.range(0,colors.length));

      stops.enter().append("stop")
        .attr("stop-opacity",1);

      stops
        .attr("offset",function(i){
          return Math.round((i/(colors.length-1))*100)+"%";
        })
        .attr("stop-color",function(i){
          return colors[i];
        });

      stops.exit().remove();

      var gradient = scale.selectAll("rect#gradient")
        .data(["gradient"]);

      gradient.enter().append("rect")
        .attr("id","gradient")
        .attr("x",function(d){
          if (vars.legend.align == "middle") {
            return vars.width.value/2;
          }
          else if (vars.legend.align == "end") {
            return vars.width.value;
          }
          else {
            return 0;
          }
        })
        .attr("y",vars.ui.padding)
        .attr("width", 0)
        .attr("height", vars.legend.gradient.height)
        .attr("stroke",vars.legend.font.color)
        .attr("stroke-width",1)
        .style("fill", "url(#d3plus_legend_heatmap)");

      var text = scale.selectAll("text.d3plus_tick")
        .data(d3.range(0,values.length));

      text.enter().append("text")
        .attr("class","d3plus_tick")
        .attr("x",function(d){
          if (vars.legend.align == "middle") {
            return vars.width.value/2;
          }
          else if (vars.legend.align == "end") {
            return vars.width.value;
          }
          else {
            return 0;
          }
        })
        .attr("y",function(d){
          return this.getBBox().height+vars.legend.gradient.height+vars.ui.padding*2;
        });

      var label_width = 0;

      text
        .order()
        .attr("font-weight",vars.legend.font.weight)
        .attr("font-family",vars.legend.font.family.value)
        .attr("font-size",vars.legend.font.size+"px")
        .style("text-anchor",vars.legend.font.align)
        .attr("fill",vars.legend.font.color)
        .text(function(d){
          return vars.format.value(values[d], {"key": key, "vars": vars});
        })
        .attr("y",function(d){
          return this.getBBox().height+vars.legend.gradient.height+vars.ui.padding*2;
        })
        .each(function(d){
          var w = this.offsetWidth;
          if (w > label_width) label_width = w;
        });

      label_width += vars.labels.padding*2;

      var key_width = label_width * (values.length-1);

      if (key_width+label_width < vars.width.value) {

        if (key_width+label_width < vars.width.value/2) {
          key_width = vars.width.value/2;
          label_width = key_width/values.length;
          key_width -= label_width;
        }

        var start_x;
        if (vars.legend.align == "start") {
          start_x = vars.ui.padding;
        }
        else if (vars.legend.align == "end") {
          start_x = vars.width.value - vars.ui.padding - key_width;
        }
        else {
          start_x = vars.width.value/2 - key_width/2;
        }

        text.transition().duration(vars.draw.timing)
          .attr("x",function(d){
            return start_x + (label_width*d);
          });

        text.exit().transition().duration(vars.draw.timing)
          .attr("opacity",0)
          .remove();

        var ticks = scale.selectAll("rect.d3plus_tick")
          .data(d3.range(0,values.length));

        ticks.enter().append("rect")
          .attr("class","d3plus_tick")
          .attr("x",function(d){
            if (vars.legend.align == "middle") {
              return vars.width.value/2;
            }
            else if (vars.legend.align == "end") {
              return vars.width.value;
            }
            else {
              return 0;
            }
          })
          .attr("y",vars.ui.padding)
          .attr("width",0)
          .attr("height",vars.ui.padding+vars.legend.gradient.height)
          .attr("fill",vars.legend.font.color);

        ticks.transition().duration(vars.draw.timing)
          .attr("x",function(d){
            var mod = d === 0 ? 1 : 0;
            return start_x + (label_width*d) - mod;
          })
          .attr("y",vars.ui.padding)
          .attr("width",1)
          .attr("height",vars.ui.padding+vars.legend.gradient.height)
          .attr("fill",vars.legend.font.color);

        ticks.exit().transition().duration(vars.draw.timing)
          .attr("width",0)
          .remove();

        gradient.transition().duration(vars.draw.timing)
          .attr("x",function(d){
            if (vars.legend.align == "middle") {
              return vars.width.value/2 - key_width/2;
            }
            else if (vars.legend.align == "end") {
              return vars.width.value - key_width - vars.ui.padding;
            }
            else {
              return vars.ui.padding;
            }
          })
          .attr("y",vars.ui.padding)
          .attr("width", key_width)
          .attr("height", vars.legend.gradient.height);

        scale.transition().duration(vars.draw.timing)
          .attr("opacity",1);

        if ( vars.dev.value ) print.timeEnd("drawing color scale");

      }
      else {
        key_display = false;
      }

    }
    else {
      key_display = false;
    }

  }
  else {
    key_display = false;
  }
  if (vars.legend.value && key && key_display) {

    if ( vars.dev.value ) print.time("positioning legend");

    if (square_size) {
      var key_height = square_size+vars.ui.padding;
    }
    else {
      var key_box = vars.g.legend.node().getBBox(),
          key_height = key_box.height+key_box.y;
    }

    if (vars.margin.bottom === 0) {
      vars.margin.bottom += vars.ui.padding;
    }
    vars.margin.bottom += key_height;

    vars.g.legend.transition().duration(vars.draw.timing)
      .attr("transform","translate(0,"+(vars.height.value-vars.margin.bottom)+")")

    if ( vars.dev.value ) print.timeEnd("positioning legend")

  }
  else {

    if ( vars.dev.value ) print.time("hiding legend")

    vars.g.legend.transition().duration(vars.draw.timing)
      .attr("transform","translate(0,"+vars.height.value+")")

    if ( vars.dev.value ) print.timeEnd("hiding legend")

  }

}

},{"../../../array/sort.coffee":37,"../../../client/pointer.coffee":41,"../../../client/touch.coffee":45,"../../../color/text.coffee":52,"../../../core/console/print.coffee":54,"../../../core/data/nest.js":62,"../../../core/fetch/color.coffee":65,"../../../core/fetch/text.js":68,"../../../core/fetch/value.coffee":69,"../../../object/validate.coffee":166,"../../../string/strip.js":169,"../../../textwrap/textwrap.coffee":194,"../../../tooltip/remove.coffee":197,"../../../util/buckets.coffee":198,"../../../util/copy.coffee":201,"../../../util/dataURL.coffee":203,"../../../util/uniques.coffee":204,"../tooltip/create.js":232}],238:[function(require,module,exports){
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates Centered Server Message
//------------------------------------------------------------------------------
module.exports = function(vars,message) {

  message = vars.messages.value ? message : null;

  var size = vars.messages.style.value || (message === vars.error.internal ?
             "large" : vars.messages.style.backup);

  if (size === "large") {
    var font = vars.messages,
        position = "center"
  }
  else {

    if (vars.footer.value) {
      var font = vars.footer
    }
    else if (vars.title.value) {
      var font = vars.title
    }
    else if (vars.title.sub.value) {
      var font = vars.title.sub
    }
    else if (vars.title.total.value) {
      var font = vars.title.total
    }
    else {
      var font = vars.title.sub
    }

    var position = font.position

  }

  var font = {
    "color": font.font.color,
    "font-family": font.font.family.value,
    "font-weight": font.font.weight,
    "font-size": font.font.size+"px",
    "padding": font.padding+"px"
  }

  var background = vars.background.value != "none" ? vars.background.value : "white"

  function style(elem) {

    elem
      .style(font)
      .style("position","absolute")
      .style("background",background)
      .style("text-align","center")
      .style("left",function(){
        return position == "center" ? "50%" : "0px"
      })
      .style("width",function(){
        return position == "center" ? "auto" : vars.width.value+"px"
      })
      .style("margin-left",function(){
        var offset = vars.width.value-vars.width.viz
        return position == "center" ? -(this.offsetWidth/2+offset/2)+"px" : "0px"
      })
      .style("top",function(){
        if (position == "center") {
          return "50%";
        }
        else if (position == "top") {
          return "0px"
        }
        else {
          return "auto"
        }
      })
      .style("bottom",function(){
        if (position == "bottom") {
          return "0px"
        }
        else {
          return "auto"
        }
      })
      .style("margin-top",function(){
        if (size == "large") {
          var height = this.offsetHeight || this.getBoundingClientRect().height
          return -height/2+"px"
        }
        return "0px"
      })

  }

  // Enter Message Group
  vars.g.message = vars.container.value.selectAll("div#d3plus_message")
    .data(["message"])

  vars.g.message.enter().append("div")
    .attr("id","d3plus_message")
    .attr("opacity",0)

  var opacity = message ? 1 : 0,
      text = message ? message : vars.g.message.text(),
      display = message ? "inline-block" : "none"

  vars.g.message
    .text(text)
    .style("display",display)
    .call(style).transition().duration(vars.draw.timing)
      .style("opacity",opacity)

}

},{}],239:[function(require,module,exports){
var closest, css, events, fontSizes, mix, playInterval, prefix, print, textColor, timeDetect;

closest = require("../../../util/closest.coffee");

css = require("../../../client/css.coffee");

fontSizes = require("../../../font/sizes.coffee");

events = require("../../../client/pointer.coffee");

mix = require("../../../color/mix.coffee");

prefix = require("../../../client/prefix.coffee");

print = require("../../../core/console/print.coffee");

textColor = require("../../../color/text.coffee");

timeDetect = require("../../../core/data/time.coffee");

playInterval = false;

module.exports = function(vars) {
  var availableWidth, background, brush, brushExtent, brush_group, brushed, brushend, d, end, handles, i, init, j, labelWidth, labels, len, max_index, min, min_index, oldWidth, playButton, playIcon, playIconChar, playIconStyle, playStyle, playUpdate, playbackWidth, setYears, start, start_x, step, stopPlayback, text, textFill, textStyle, tickColor, tickStep, ticks, timeFormat, timeReturn, timelineBox, timelineHeight, timelineOffset, timelineWidth, visible, x, yearHeight, yearMS, year_ticks, years;
  if (vars.timeline.value && (!vars.error.internal || !vars.data.missing) && !vars.small && vars.data.time && vars.data.time.values.length > 1) {
    if (vars.dev.value) {
      print.time("drawing timeline");
    }
    textStyle = {
      "font-weight": vars.ui.font.weight,
      "font-family": vars.ui.font.family.value,
      "font-size": vars.ui.font.size + "px",
      "text-anchor": "middle"
    };
    years = vars.data.time.ticks.map(function(d) {
      return new Date(d);
    });
    timeReturn = timeDetect(vars, {
      values: years,
      style: textStyle
    });
    visible = timeReturn.values.map(Number);
    timeFormat = timeReturn.format;
    if (vars.time.solo.value.length) {
      init = d3.extent(vars.time.solo.value);
      for (i = j = 0, len = init.length; j < len; i = ++j) {
        d = init[i];
        if (d.constructor !== Date) {
          d = new Date(d.toString());
          d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
          init[i] = d;
        }
      }
    } else {
      init = d3.extent(years);
    }
    year_ticks = years.slice();
    yearHeight = d3.max(timeReturn.sizes.map(function(t) {
      return t.height;
    }));
    labelWidth = ~~(d3.max(timeReturn.sizes.map(function(t) {
      return t.width;
    }))) + 1;
    labelWidth += vars.ui.padding * 2;
    timelineHeight = yearHeight + vars.ui.padding * 2;
    timelineWidth = labelWidth * years.length;
    playbackWidth = timelineHeight;
    availableWidth = vars.width.value - vars.ui.padding * 2;
    if (vars.timeline.play.value) {
      availableWidth -= playbackWidth + vars.ui.padding;
    }
    if (visible.length < years.length || availableWidth < labelWidth * visible.length) {
      oldWidth = labelWidth;
      labelWidth = (availableWidth - labelWidth) / years.length;
      timelineWidth = labelWidth * years.length;
      timelineOffset = 1;
      tickStep = ~~(oldWidth / (timelineWidth / visible.length)) + 1;
      while (tickStep < visible.length - 1) {
        if ((visible.length - 1) % tickStep === 0) {
          break;
        }
        tickStep++;
      }
      visible = visible.filter(function(t, i) {
        return i % tickStep === 0;
      });
    } else {
      timelineOffset = 0;
      min = new Date(years[0]);
      step = vars.data.time.stepType;
      min["set" + step](min["get" + step]() + years.length);
      year_ticks.push(min);
    }
    start = new Date(init[0]);
    start = closest(year_ticks, start);
    end = new Date(init[1]);
    if (!timelineOffset) {
      end["set" + vars.data.time.stepType](end["get" + vars.data.time.stepType]() + 1);
    }
    end = closest(year_ticks, end);
    yearMS = year_ticks.map(Number);
    min_index = yearMS.indexOf(+start);
    max_index = yearMS.indexOf(+end);
    brushExtent = [start, end];
    if (vars.timeline.align === "start") {
      start_x = vars.ui.padding;
    } else if (vars.timeline.align === "end") {
      start_x = vars.width.value - vars.ui.padding - timelineWidth;
    } else {
      start_x = vars.width.value / 2 - timelineWidth / 2;
    }
    if (vars.timeline.play.value) {
      start_x += (playbackWidth + vars.ui.padding) / 2;
    }
    stopPlayback = function() {
      clearInterval(playInterval);
      playInterval = false;
      return playIcon.call(playIconChar, "icon");
    };
    brushed = function() {
      var extent, max_val, min_val;
      if (d3.event.sourceEvent !== null) {
        if (playInterval) {
          stopPlayback();
        }
        brushExtent = brush.extent();
        min_val = closest(year_ticks, brushExtent[0]);
        max_val = closest(year_ticks, brushExtent[1]);
        if (min_val === max_val) {
          min_index = yearMS.indexOf(+min_val);
          if (min_val < brushExtent[0] || min_index === 0) {
            max_val = year_ticks[min_index + 1];
          } else {
            min_val = year_ticks[min_index - 1];
          }
        }
        min_index = yearMS.indexOf(+min_val);
        max_index = yearMS.indexOf(+max_val);
        if (max_index - min_index >= 1) {
          extent = [min_val, max_val];
        } else if (min_index + 1 <= years.length) {
          extent = [min_val, year_ticks[min_index + 1]];
        } else {
          extent = [min_val];
          i = 1;
          while (i <= 1) {
            if (min_index + i <= years.length) {
              extent.push(year_ticks[min_index + i]);
            } else {
              extent.unshift(year_ticks[min_index - ((min_index + i) - years.length)]);
            }
            i++;
          }
          extent = [extent[0], extent[extent.length - 1]];
        }
        brushExtent = extent;
        text.attr("fill", textFill);
        return d3.select(this).call(brush.extent(extent));
      }
    };
    setYears = function() {
      var newYears;
      if (max_index - min_index === years.length - timelineOffset) {
        newYears = [];
      } else {
        newYears = yearMS.filter(function(t, i) {
          return i >= min_index && i < (max_index + timelineOffset);
        });
        newYears = newYears.map(function(t) {
          return new Date(t);
        });
      }
      playUpdate();
      return vars.self.time({
        "solo": newYears
      }).draw();
    };
    brushend = function() {
      var change, old_max, old_min, solo;
      if (d3.event.sourceEvent !== null) {
        if (vars.time.solo.value.length) {
          solo = d3.extent(vars.time.solo.value);
          old_min = yearMS.indexOf(+closest(year_ticks, solo[0]));
          old_max = yearMS.indexOf(+closest(year_ticks, solo[1]));
          change = old_min !== min_index || old_max !== max_index;
        } else {
          change = max_index - min_index !== years.length - timelineOffset;
        }
        if (change) {
          return setYears();
        }
      }
    };
    playButton = vars.g.timeline.selectAll("rect.d3plus_timeline_play").data(vars.timeline.play.value ? [0] : []);
    playStyle = function(btn) {
      return btn.attr("width", playbackWidth + 1).attr("height", timelineHeight + 1).attr("fill", vars.ui.color.primary.value).attr("stroke", vars.ui.color.primary.value).attr("stroke-width", 1).attr("x", start_x - playbackWidth - 1 - vars.ui.padding).attr("y", vars.ui.padding);
    };
    playButton.enter().append("rect").attr("class", "d3plus_timeline_play").attr("shape-rendering", "crispEdges").attr("opacity", 0).call(playStyle);
    playButton.transition().duration(vars.draw.timing).call(playStyle);
    playButton.exit().transition().duration(vars.draw.timing).attr("opacity", 0).remove();
    playIcon = vars.g.timeline.selectAll("text.d3plus_timeline_playIcon").data(vars.timeline.play.value ? [0] : []);
    playIconChar = function(text, char) {
      var font;
      char = vars.timeline.play[char];
      if (css("font-awesome")) {
        char = char.awesome;
        font = "FontAwesome";
      } else {
        char = char.fallback;
        font = "inherit";
      }
      return text.style("font-family", font).text(char);
    };
    playIconStyle = function(text) {
      var y;
      y = timelineHeight / 2 + vars.ui.padding + 1;
      return text.attr("fill", textColor(vars.ui.color.primary.value)).attr(textStyle).attr("x", start_x - (playbackWidth - 1) / 2 - vars.ui.padding).attr("y", y).attr("dy", "0.5ex").call(playIconChar, playInterval ? "pause" : "icon");
    };
    playIcon.enter().append("text").attr("class", "d3plus_timeline_playIcon").call(playIconStyle).style("pointer-events", "none").attr("opacity", 0);
    playIcon.call(playIconStyle).transition().duration(vars.draw.timing).attr("opacity", 1);
    playIcon.exit().transition().duration(vars.draw.timing).attr("opacity", 0).remove();
    playUpdate = function() {
      if (max_index - min_index === years.length - timelineOffset) {
        playButton.on(events.hover, null).on(events.click, null).transition().duration(vars.draw.timing).attr("opacity", 0.3);
        return playIcon.transition().duration(vars.draw.timing).attr("opacity", 0.3);
      } else {
        playButton.on(events.over, function() {
          return d3.select(this).style("cursor", "pointer");
        }).on(events.out, function() {
          return d3.select(this).style("cursor", "auto");
        }).on(events.click, function() {
          if (playInterval) {
            return stopPlayback();
          } else {
            playIcon.call(playIconChar, "pause");
            if (max_index === years.length) {
              max_index = max_index - min_index;
              min_index = 0;
            } else {
              min_index++;
              max_index++;
            }
            setYears();
            return playInterval = setInterval(function() {
              if (max_index === years.length - timelineOffset) {
                return stopPlayback();
              } else {
                min_index++;
                max_index++;
                return setYears();
              }
            }, vars.timeline.play.timing.value);
          }
        }).transition().duration(vars.draw.timing).attr("opacity", 1);
        return playIcon.transition().duration(vars.draw.timing).attr("opacity", 1);
      }
    };
    playUpdate();
    textFill = function(d) {
      var color, less, opacity;
      less = timelineOffset ? d <= brushExtent[1] : d < brushExtent[1];
      if (d >= brushExtent[0] && less) {
        opacity = 1;
        color = textColor(vars.ui.color.secondary.value);
      } else {
        opacity = 0.5;
        color = textColor(vars.ui.color.primary.value);
      }
      color = d3.rgb(color);
      return "rgba(" + color.r + "," + color.g + "," + color.b + "," + opacity + ")";
    };
    background = vars.g.timeline.selectAll("rect.d3plus_timeline_background").data(["background"]);
    background.enter().append("rect").attr("class", "d3plus_timeline_background").attr("shape-rendering", "crispEdges").attr("width", timelineWidth + 2).attr("height", timelineHeight + 2).attr("fill", vars.ui.color.primary.value).attr("x", start_x - 1).attr("y", vars.ui.padding);
    background.transition().duration(vars.draw.timing).attr("width", timelineWidth + 2).attr("height", timelineHeight + 2).attr("fill", vars.ui.color.primary.value).attr("x", start_x - 1).attr("y", vars.ui.padding);
    ticks = vars.g.timeline.selectAll("g#ticks").data(["ticks"]);
    ticks.enter().append("g").attr("id", "ticks").attr("transform", "translate(" + vars.width.value / 2 + "," + vars.ui.padding + ")");
    brush_group = vars.g.timeline.selectAll("g#brush").data(["brush"]);
    brush_group.enter().append("g").attr("id", "brush");
    labels = vars.g.timeline.selectAll("g#labels").data(["labels"]);
    labels.enter().append("g").attr("id", "labels");
    text = labels.selectAll("text").data(years, function(d, i) {
      return i;
    });
    text.enter().append("text").attr("y", 0).attr("dy", "0.5ex").attr("x", 0);
    x = d3.time.scale().domain(d3.extent(year_ticks)).rangeRound([0, timelineWidth]);
    text.order().attr(textStyle).text(function(d, i) {
      if (visible.indexOf(+d) >= 0) {
        return timeFormat(d);
      } else {
        return "";
      }
    }).attr("opacity", function(d, i) {
      if (vars.data.time.dataSteps.indexOf(i) >= 0) {
        return 1;
      } else {
        return 0.4;
      }
    }).attr("fill", textFill).attr("transform", function(d, i) {
      var dx, dy;
      dx = start_x + x(d);
      if (!timelineOffset) {
        dx += labelWidth / 2;
      }
      dy = timelineHeight / 2 + vars.ui.padding + 1;
      if (timelineOffset) {
        dy += timelineHeight;
      }
      return "translate(" + Math.round(dx) + "," + Math.round(dy) + ")";
    });
    text.exit().transition().duration(vars.draw.timing).attr("opacity", 0).remove();
    brush = d3.svg.brush().x(x).extent(brushExtent).on("brush", brushed).on("brushend", brushend);
    if (vars.axes.discrete && vars[vars.axes.discrete].value === vars.time.value) {
      tickColor = vars[vars.axes.discrete].ticks.color;
    } else {
      tickColor = vars.x.ticks.color;
    }
    ticks.attr("transform", "translate(" + start_x + "," + vars.ui.padding + ")").transition().duration(vars.draw.timing).call(d3.svg.axis().scale(x).orient("top").ticks(function() {
      return year_ticks;
    }).tickFormat("").tickSize(-timelineHeight).tickPadding(0)).selectAll("line").attr("stroke-width", 1).attr("shape-rendering", "crispEdges").attr("stroke", function(d) {
      if (visible.indexOf(+d) >= 0) {
        return tickColor;
      } else {
        return mix(tickColor, vars.background.value, 0.4, 1);
      }
    });
    ticks.selectAll("path").attr("fill", "none");
    brush_group.attr("transform", "translate(" + start_x + "," + vars.ui.padding + ")").attr("opacity", 1).call(brush);
    text.attr("pointer-events", "none");
    brush_group.selectAll("rect.background").attr("fill", "none").style("visibility", "visible").attr("height", timelineHeight).attr("shape-rendering", "crispEdges").on(events.move, function() {
      var c;
      c = vars.timeline.hover.value;
      if (["grab", "grabbing"].indexOf(c) >= 0) {
        c = prefix() + c;
      }
      return d3.select(this).style("cursor", c);
    });
    brush_group.selectAll("rect.extent").attr("opacity", 0.75).attr("height", timelineHeight).attr("fill", vars.ui.color.secondary.value).attr("shape-rendering", "crispEdges").on(events.move, function() {
      var c;
      c = vars.timeline.hover.value;
      if (["grab", "grabbing"].indexOf(c) >= 0) {
        c = prefix() + c;
      }
      return d3.select(this).style("cursor", c);
    });
    if (vars.timeline.handles.value) {
      handles = brush_group.selectAll("g.resize").selectAll("rect.d3plus_handle").data(["d3plus_handle"]);
      handles.enter().insert("rect", "rect").attr("class", "d3plus_handle");
      handles.attr("fill", vars.timeline.handles.color).attr("transform", function(d) {
        var mod;
        if (this.parentNode.className.baseVal === "resize e") {
          mod = -vars.timeline.handles.size;
        } else {
          mod = 0;
        }
        return "translate(" + mod + ",0)";
      }).attr("width", vars.timeline.handles.size).style("visibility", "visible").attr("shape-rendering", "crispEdges").attr("opacity", vars.timeline.handles.opacity);
      brush_group.selectAll("g.resize").selectAll("rect").attr("height", timelineHeight);
    } else {
      brush_group.selectAll("g.resize").remove();
    }
    timelineBox = vars.g.timeline.node().getBBox();
    if (vars.margin.bottom === 0) {
      vars.margin.bottom += vars.ui.padding;
    }
    vars.margin.bottom += timelineBox.height + timelineBox.y;
    vars.g.timeline.transition().duration(vars.draw.timing).attr("transform", "translate(0," + Math.round(vars.height.value - vars.margin.bottom - vars.ui.padding / 2) + ")");
    vars.margin.bottom += vars.ui.padding;
    if (vars.dev.value) {
      return print.time("drawing timeline");
    }
  } else {
    return vars.g.timeline.transition().duration(vars.draw.timing).attr("transform", "translate(0," + vars.height.value + ")");
  }
};



},{"../../../client/css.coffee":39,"../../../client/pointer.coffee":41,"../../../client/prefix.coffee":42,"../../../color/mix.coffee":48,"../../../color/text.coffee":52,"../../../core/console/print.coffee":54,"../../../core/data/time.coffee":64,"../../../font/sizes.coffee":97,"../../../util/closest.coffee":200}],240:[function(require,module,exports){
var events = require("../../../client/pointer.coffee"),
    fetchValue = require("../../../core/fetch/value.coffee"),
    print      = require("../../../core/console/print.coffee"),
    rtl        = require("../../../client/rtl.coffee"),
    textWrap   = require("../../../textwrap/textwrap.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws appropriate titles
//------------------------------------------------------------------------------
module.exports = function(vars) {

  var total_key = vars.size.value ? vars.size.value
    : vars.color.type === "number" ? vars.color.value : false

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If there is no data or the title bar is not needed,
  // set the total value to 'null'
  //----------------------------------------------------------------------------
  if (!vars.data.viz || !vars.title.total.value || vars.small) {
    var total = false
  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Otherwise, let's calculate it!
  //----------------------------------------------------------------------------
  else if (total_key) {

    if ( vars.dev.value ) {
      print.time("calculating total value")
    }

    if (vars.focus.value.length) {
      var total = vars.data.viz.filter(function(d){
        return d[vars.id.value] == vars.focus.value[0]
      })
      total = d3.sum(total,function(d){
        return fetchValue(vars,d,total_key)
      })
    }
    else {
      var total = d3.sum(vars.data.pool,function(d){
        return fetchValue(vars,d,total_key)
      })
    }

    if (total === 0) {
      total = false
    }

    if (typeof total === "number") {

      var pct = ""

      if (vars.data.mute.length || vars.data.solo.length || vars.focus.value.length) {

        var overall_total = d3.sum(vars.data.value, function(d){
          if (vars.time.solo.value.length > 0) {
            var match = vars.time.solo.value.indexOf(fetchValue(vars,d,vars.time.value)) >= 0
          }
          else if (vars.time.mute.value.length > 0) {
            var match = vars.time.solo.value.indexOf(fetchValue(vars,d,vars.time.value)) < 0
          }
          else {
            var match = true
          }
          if (match) {
            return fetchValue(vars,d,total_key)
          }
        })

        if (overall_total > total) {

          var pct = (total/overall_total)*100,
              ot = vars.format.value(overall_total, {"key": vars.size.value, "vars": vars});

          pct = " ("+vars.format.value(pct,{"key": "share", "vars": vars})+"% of "+ot+")";

        }
      }

      total = vars.format.value(total, {"key": vars.size.value, "vars": vars})
      var obj = vars.title.total.value
        , prefix = obj.prefix || vars.format.value(vars.format.locale.value.ui.total)+": "
      total = prefix + total
      obj.suffix ? total = total + obj.suffix : null
      total += pct

    }

    if ( vars.dev.value ) {
      print.timeEnd("calculating total value")
    }

  }
  else {
    var total = false
  }


  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize titles and detect footer
  //----------------------------------------------------------------------------
  var title_data = []

  if (vars.footer.value) {
    title_data.push({
      "link": vars.footer.link,
      "style": vars.footer,
      "type": "footer",
      "value": vars.footer.value
    })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If not in "small" mode, detect titles available
  //----------------------------------------------------------------------------
  if (!vars.small) {

    if (vars.title.value) {
      var title = vars.title.value;
      if (typeof title === "function") title = title(vars.self);
      title_data.push({
        "link": vars.title.link,
        "style": vars.title,
        "type": "title",
        "value": title
      })
    }
    if (vars.title.sub.value) {
      var title = vars.title.sub.value;
      if (typeof title === "function") title = title(vars.self);
      title_data.push({
        "link": vars.title.sub.link,
        "style": vars.title.sub,
        "type": "sub",
        "value": title
      })
    }
    if (vars.title.total.value && total) {
      title_data.push({
        "link": vars.title.total.link,
        "style": vars.title.total,
        "type": "total",
        "value": total
      })
    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter Titles
  //----------------------------------------------------------------------------
  function style(title) {

    title
      .attr("font-size",function(t){
        return t.style.font.size
      })
      .attr("fill",function(t){
        return t.link ? vars.links.font.color : t.style.font.color
      })
      .attr("font-family",function(t){
        return t.link ? vars.links.font.family.value : t.style.font.family.value
      })
      .attr("font-weight",function(t){
        return t.link ? vars.links.font.weight : t.style.font.weight
      })
      .style("text-decoration",function(t){
        return t.link ? vars.links.font.decoration.value : t.style.font.decoration.value
      })
      .style("text-transform",function(t){
        return t.link ? vars.links.font.transform.value : t.style.font.transform.value
      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter Titles
  //----------------------------------------------------------------------------
  if ( vars.dev.value ) print.time("drawing titles")
  var titles = vars.svg.selectAll("g.d3plus_title")
    .data(title_data,function(t){
      return t.type
    })

  var titleWidth = vars.title.width || vars.width.value-vars.margin.left-vars.margin.right;

  titles.enter().append("g")
    .attr("class", function(t){
      return "d3plus_title " + t.type;
    })
    .attr("opacity",0)
    .append("text")
      .call(style)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Wrap text and calculate positions, then transition style and opacity
  //----------------------------------------------------------------------------
  function getAlign(d) {
    var align = d.style.font.align;
    if (align == "center") {
      return "middle";
    }
    else if ((align == "left" && !rtl) || (align == "right" && rtl)) {
      return "start";
    }
    else if ((align == "left" && rtl) || (align == "right" && !rtl)) {
      return "end";
    }
    return align;
  }
  titles
    .each(function(d){

      var container = d3.select(this).select("text").call(style);

      var align = getAlign(d);

      textWrap()
        .align(align)
        .container(container)
        .height(vars.height.value / 8)
        .size(false)
        .text(d.value)
        .width(titleWidth)
        .draw()

      d.y = vars.margin[d.style.position]
      vars.margin[d.style.position] += this.getBBox().height + d.style.padding*2

    })
    .on(events.over,function(t){
      if (t.link) {
        d3.select(this)
          .transition().duration(vars.timing.mouseevents)
          .style("cursor","pointer")
          .select("text")
            .attr("fill",vars.links.hover.color)
            .attr("font-family",vars.links.hover.family.value)
            .attr("font-weight",vars.links.hover.weight)
            .style("text-decoration",vars.links.hover.decoration.value)
            .style("text-transform",vars.links.hover.transform.value)
      }
    })
    .on(events.out,function(t){
      if (t.link) {
        d3.select(this)
          .transition().duration(vars.timing.mouseevents)
          .style("cursor","auto")
          .select("text")
            .call(style)
      }
    })
    .on(events.click,function(t){
      if (t.link) {
        var target = t.link.charAt(0) != "/" ? "_blank" : "_self"
        window.open(t.link,target)
      }
    })
    .attr("opacity",1)
    .attr("transform",function(t){
      var pos = t.style.position,
          y = pos == "top" ? 0+t.y : vars.height.value-t.y
      if (pos == "bottom") {
        y -= this.getBBox().height+t.style.padding
      }
      else {
        y += t.style.padding
      }
      var align = getAlign(t);
      if (align === "start") {
        var x = vars.margin.left + vars.title.padding;
      }
      else {
        var w = d3.select(this).select("text").node().getBBox().width;
        if (align === "middle") {
          x = vars.width.value/2 - titleWidth/2;
        }
        else {
          x = vars.width.value - titleWidth - vars.margin.right - vars.title.padding;
        }
      }
      return "translate("+x+","+y+")";
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Exit unused titles
  //----------------------------------------------------------------------------
  titles.exit().transition().duration(vars.draw.timing)
    .attr("opacity",0)
    .remove()

  if ( vars.margin.top > 0 ) {
    vars.margin.top += vars.title.padding
  }

  if ( vars.margin.bottom > 0 ) {
    vars.margin.bottom += vars.title.padding
  }

  var min = vars.title.height
  if (min && vars.margin[vars.title.position] < min) {
    vars.margin[vars.title.position] = min
  }

  if ( vars.dev.value ) print.timeEnd("drawing titles")

}

},{"../../../client/pointer.coffee":41,"../../../client/rtl.coffee":43,"../../../core/console/print.coffee":54,"../../../core/fetch/value.coffee":69,"../../../textwrap/textwrap.coffee":194}],241:[function(require,module,exports){
var labels, transform;

labels = require("./labels.coffee");

transform = require("./transform.coffee");

module.exports = function(vars, b, timing) {
  var aspect, extent, fit, max_scale, min, padding, scale, translate, type;
  if (!b) {
    b = vars.zoom.bounds;
  }
  if (typeof timing !== "number") {
    timing = vars.timing.transitions;
  }
  vars.zoom.size = {
    height: b[1][1] - b[0][1],
    width: b[1][0] - b[0][0]
  };
  type = vars.types[vars.type.value];
  fit = vars.coords.fit.value;
  if (fit === "auto" || type.requirements.indexOf("coords") < 0) {
    aspect = d3.max([vars.zoom.size.width / vars.width.viz, vars.zoom.size.height / vars.height.viz]);
  } else {
    aspect = vars.zoom.size[fit] / vars["app_" + fit];
  }
  min = d3.min([vars.width.viz, vars.height.viz]);
  padding = type.zoom ? vars.coords.padding * 2 : 0;
  scale = ((min - padding) / min) / aspect;
  extent = vars.zoom.behavior.scaleExtent();
  if (extent[0] === extent[1] || b === vars.zoom.bounds) {
    vars.zoom.behavior.scaleExtent([scale, scale * 16]);
  }
  max_scale = vars.zoom.behavior.scaleExtent()[1];
  if (scale > max_scale) {
    scale = max_scale;
  }
  vars.zoom.scale = scale;
  translate = [vars.width.viz / 2 - (vars.zoom.size.width * scale) / 2 - (b[0][0] * scale), vars.height.viz / 2 - (vars.zoom.size.height * scale) / 2 - (b[0][1] * scale)];
  vars.zoom.translate = translate;
  vars.zoom.behavior.translate(translate).scale(scale);
  vars.zoom.size = {
    height: vars.zoom.bounds[1][1] - vars.zoom.bounds[0][1],
    width: vars.zoom.bounds[1][0] - vars.zoom.bounds[0][0]
  };
  vars.zoom.reset = false;
  labels(vars);
  return transform(vars, timing);
};



},{"./labels.coffee":243,"./transform.coffee":246}],242:[function(require,module,exports){
module.exports = function(data, vars) {
  var depth, max_depth, nextDepth;
  max_depth = vars.id.nesting.length - 1;
  depth = vars.depth.value;
  nextDepth = vars.id.nesting[vars.depth.value + 1];
  if (vars.types[vars.type.value].nesting === false) {
    return 0;
  } else if ((data.d3plus.merged || (data[nextDepth] instanceof Array && depth < max_depth)) && (!data || nextDepth in data)) {
    return 1;
  } else if ((depth === max_depth || (data && (!(nextDepth in data)))) && (vars.small || !vars.tooltip.html.value)) {
    return -1;
  } else {
    return 0;
  }
};



},{}],243:[function(require,module,exports){
var print;

print = require("../../../core/console/print.coffee");

module.exports = function(vars) {
  var opacity, scale;
  if (vars.dev.value) {
    print.time("determining label visibility");
  }
  scale = vars.zoom.behavior.scaleExtent();
  opacity = function(text) {
    return text.attr("opacity", function(d) {
      var size;
      if (!d) {
        d = {};
      }
      size = parseFloat(d3.select(this).attr("font-size"), 10);
      d.visible = size * (vars.zoom.scale / scale[1]) >= 2;
      if (d.visible) {
        return 1;
      } else {
        return 0;
      }
    });
  };
  if (vars.draw.timing) {
    vars.g.viz.selectAll("text.d3plus_label").transition().duration(vars.draw.timing).call(opacity);
  } else {
    vars.g.viz.selectAll("text.d3plus_label").call(opacity);
  }
  if (vars.dev.value) {
    return print.timeEnd("determining label visibility");
  }
};



},{"../../../core/console/print.coffee":54}],244:[function(require,module,exports){
var labels, transform;

labels = require("./labels.coffee");

transform = require("./transform.coffee");

module.exports = function(vars) {
  var delay, eventType, limits, scale, translate, xmax, xmin, xoffset, ymax, ymin, yoffset;
  eventType = d3.event.sourceEvent ? d3.event.sourceEvent.type : null;
  translate = d3.event.translate;
  scale = d3.event.scale;
  limits = vars.zoom.bounds;
  xoffset = (vars.width.viz - (vars.zoom.size.width * scale)) / 2;
  xmin = (xoffset > 0 ? xoffset : 0);
  xmax = (xoffset > 0 ? vars.width.viz - xoffset : vars.width.viz);
  yoffset = (vars.height.viz - (vars.zoom.size.height * scale)) / 2;
  ymin = (yoffset > 0 ? yoffset : 0);
  ymax = (yoffset > 0 ? vars.height.viz - yoffset : vars.height.viz);
  if (translate[0] + limits[0][0] * scale > xmin) {
    translate[0] = -limits[0][0] * scale + xmin;
  } else if (translate[0] + limits[1][0] * scale < xmax) {
    translate[0] = xmax - (limits[1][0] * scale);
  }
  if (translate[1] + limits[0][1] * scale > ymin) {
    translate[1] = -limits[0][1] * scale + ymin;
  } else if (translate[1] + limits[1][1] * scale < ymax) {
    translate[1] = ymax - (limits[1][1] * scale);
  }
  vars.zoom.behavior.translate(translate).scale(scale);
  vars.zoom.translate = translate;
  vars.zoom.scale = scale;
  if (eventType === "wheel") {
    delay = (vars.draw.timing ? 100 : 250);
    clearTimeout(vars.zoom.wheel);
    vars.zoom.wheel = setTimeout(function() {
      return labels(vars);
    }, delay);
  } else {
    labels(vars);
  }
  if (eventType === "dblclick") {
    return transform(vars, vars.timing.transitions);
  } else {
    return transform(vars, 0);
  }
};



},{"./labels.coffee":243,"./transform.coffee":246}],245:[function(require,module,exports){
module.exports = function(vars, event) {
  var enabled, zoom, zoomable, zoomed;
  zoom = vars.zoom;
  if (!event) {
    event = d3.event;
  }
  zoomed = zoom.scale > zoom.behavior.scaleExtent()[0];
  enabled = vars.types[vars.type.value].zoom && zoom.value && zoom.scroll.value;
  zoomable = event.touches && event.touches.length > 1 && enabled;
  if (!zoomable && !zoomed) {
    event.stopPropagation();
  }
};



},{}],246:[function(require,module,exports){
module.exports = function(vars, timing) {
  var translate;
  if (typeof timing !== "number") {
    timing = vars.timing.transitions;
  }
  translate = "translate(" + vars.zoom.translate + ")";
  translate += "scale(" + vars.zoom.scale + ")";
  if (timing) {
    return vars.g.viz.transition().duration(timing).attr("transform", translate);
  } else {
    return vars.g.viz.attr("transform", translate);
  }
};



},{}],247:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [false, Function, Object, String],
  deprecates: "active_var",
  mute: filter(true),
  solo: filter(true),
  spotlight: {
    accepted: [Boolean],
    deprecates: "spotlight",
    value: false
  },
  value: false
};



},{"../../core/methods/filter.coffee":77}],248:[function(require,module,exports){
module.exports = {
  accepted: [Object],
  deprecated: "nesting_aggs",
  objectAccess: false,
  value: {}
};



},{}],249:[function(require,module,exports){
var process;

process = require("../../core/methods/process/data.coffee");

module.exports = {
  accepted: [false, Array, Object, String],
  delimiter: {
    accepted: String,
    value: "|"
  },
  filetype: {
    accepted: [false, "json", "xml", "html", "csv", "dsv", "tsv", "txt"],
    value: false
  },
  keys: {},
  process: process,
  value: false
};



},{"../../core/methods/process/data.coffee":83}],250:[function(require,module,exports){
var rendering;

rendering = require("../../core/methods/rendering.coffee");

module.exports = {
  background: {
    color: "#fafafa",
    rendering: rendering(),
    stroke: {
      color: "#ccc",
      width: 1
    }
  },
  mirror: {
    accepted: [Boolean],
    deprecates: ["mirror_axis", "mirror_axes"],
    value: false
  }
};



},{"../../core/methods/rendering.coffee":88}],251:[function(require,module,exports){
module.exports = {
  accepted: [String],
  value: "#ffffff"
};



},{}],252:[function(require,module,exports){
var filter, scale;

filter = require("../../core/methods/filter.coffee");

scale = require("../../color/scale.coffee");

module.exports = {
  accepted: [false, Array, Function, Object, String],
  deprecates: "color_var",
  focus: "#444444",
  heatmap: ["#282F6B", "#419391", "#AFD5E8", "#EACE3F", "#B35C1E", "#B22200"],
  missing: "#eeeeee",
  mute: filter(true),
  primary: "#d74b03",
  range: ["#B22200", "#FFEE8D", "#759143"],
  scale: {
    accepted: [Array, Function, "d3plus", "category10", "category20", "category20b", "category20c"],
    process: function(value) {
      if (value instanceof Array) {
        return d3.scale.ordinal().range(value);
      } else if (value === "d3plus") {
        return scale;
      } else if (typeof value === "string") {
        return d3.scale[value]();
      } else {
        return value;
      }
    },
    value: "d3plus"
  },
  solo: filter(true),
  secondary: "#e5b3bb",
  value: false
};



},{"../../color/scale.coffee":50,"../../core/methods/filter.coffee":77}],253:[function(require,module,exports){
module.exports = {
  "accepted": [Array, Function, String],
  "index": {
    "accepted": [Boolean],
    "value": true
  },
  "process": function(value, vars) {
    if (typeof value === "string") value = [value]
    return value
  },
  "value": false
}

},{}],254:[function(require,module,exports){
module.exports = {
  accepted: [Object],
  objectAccess: false,
  process: function(value, vars) {
    var method, setting;
    for (method in value) {
      setting = value[method];
      if (method in vars.self) {
        vars.self[method](setting);
      }
    }
    return value;
  },
  value: {}
};



},{}],255:[function(require,module,exports){
var d3selection;

d3selection = require("../../util/d3selection.coffee");

module.exports = {
  accepted: [false, Array, Object, String],
  id: "default",
  process: function(value) {
    if (value === false) {
      return false;
    } else if (d3selection(value)) {
      return value;
    } else if (value instanceof Array) {
      return d3.select(value[0][0]);
    } else {
      return d3.select(value);
    }
  },
  value: false
};



},{"../../util/d3selection.coffee":202}],256:[function(require,module,exports){
var filter, process;

filter = require("../../core/methods/filter.coffee");

process = require("../../core/methods/process/data.coffee");

module.exports = {
  accepted: [false, Array, Function, Object, String],
  center: [0, 0],
  filetype: {
    accepted: ["json"],
    value: "json"
  },
  fit: {
    accepted: ["auto", "height", "width"],
    value: "auto"
  },
  mute: filter(false),
  padding: 20,
  process: process,
  projection: {
    accepted: ["mercator", "equirectangular"],
    value: "mercator"
  },
  solo: filter(false),
  threshold: {
    accepted: [Number],
    value: 0.9
  },
  value: false
};



},{"../../core/methods/filter.coffee":77,"../../core/methods/process/data.coffee":83}],257:[function(require,module,exports){
var fetchValue, ie, stringStrip;

fetchValue = require("../../core/fetch/value.coffee");

ie = require("../../client/ie.js");

stringStrip = require("../../string/strip.js");

module.exports = {
  accepted: [void 0, Array, String],
  chainable: false,
  data: [],
  process: function(value, vars) {
    var blob, c, col, columns, csv_data, csv_to_return, dataString, encodedUri, i, j, k, l, len, len1, len2, len3, len4, len5, link, m, max_filename_len, n, node, o, ref, ref1, row, title, titles, val;
    if (vars.returned === void 0) {
      return [];
    }
    value = value || vars.cols.value;
    if (value instanceof Array) {
      columns = value;
    } else if (typeof value === "string") {
      columns = [value];
    }
    csv_to_return = [];
    titles = [];
    if (vars.title.value) {
      title = vars.title.value;
      if (typeof title === "function") {
        title = title(vars.self);
      }
      title = stringStrip(title);
      max_filename_len = 250;
      title = title.substr(0, max_filename_len);
    } else {
      title = "D3plus Visualization Data";
    }
    if (!columns) {
      columns = [vars.id.value];
      if (vars.time.value) {
        columns.push(vars.time.value);
      }
      if (vars.size.value) {
        columns.push(vars.size.value);
      }
      if (vars.text.value) {
        columns.push(vars.text.value);
      }
    }
    for (j = 0, len = columns.length; j < len; j++) {
      c = columns[j];
      titles.push(vars.format.value(c));
    }
    csv_to_return.push(titles);
    ref = vars.returned.nodes;
    for (k = 0, len1 = ref.length; k < len1; k++) {
      node = ref[k];
      console.log(node.values);
      if ((node.values != null) && node.values instanceof Array) {
        ref1 = node.values;
        for (l = 0, len2 = ref1.length; l < len2; l++) {
          val = ref1[l];
          row = [];
          for (m = 0, len3 = columns.length; m < len3; m++) {
            col = columns[m];
            row.push(fetchValue(vars, val, col));
          }
          csv_to_return.push(row);
        }
      } else {
        row = [];
        for (n = 0, len4 = columns.length; n < len4; n++) {
          col = columns[n];
          row.push(fetchValue(vars, node, col));
        }
        csv_to_return.push(row);
      }
    }
    csv_data = "data:text/csv;charset=utf-8,";
    for (i = o = 0, len5 = csv_to_return.length; o < len5; i = ++o) {
      c = csv_to_return[i];
      dataString = c.join(",");
      csv_data += (i < csv_to_return.length ? dataString + "\n" : dataString);
    }
    if (ie) {
      blob = new Blob([csv_data], {
        type: "text/csv;charset=utf-8;"
      });
      navigator.msSaveBlob(blob, title + ".csv");
    } else {
      encodedUri = encodeURI(csv_data);
      link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", title + ".csv");
      link.click();
    }
    this.data = csv_to_return;
    return columns;
  },
  value: void 0
};



},{"../../client/ie.js":40,"../../core/fetch/value.coffee":69,"../../string/strip.js":169}],258:[function(require,module,exports){
var process;

process = require("../../core/methods/process/data.coffee");

module.exports = {
  accepted: [false, Array, Function, String],
  cache: {},
  delimiter: {
    accepted: [String],
    value: "|"
  },
  donut: {
    size: 0.35
  },
  filetype: {
    accepted: [false, "json", "xml", "html", "csv", "dsv", "tsv", "txt"],
    value: false
  },
  filters: [],
  keys: {},
  mute: [],
  large: 400,
  opacity: 0.9,
  padding: {
    accepted: [Number],
    value: 1
  },
  process: function(value, vars) {
    if (vars.container.id === "default" && value.length) {
      vars.self.container({
        id: "default" + value.length
      });
    }
    return process(value, vars, this);
  },
  solo: [],
  stroke: {
    width: 1
  },
  value: false
};



},{"../../core/methods/process/data.coffee":83}],259:[function(require,module,exports){
module.exports = {
  accepted: [Function, Number],
  value: 0
};



},{}],260:[function(require,module,exports){
module.exports = {
  accepted: [false, Function, Object],
  value: false
};



},{}],261:[function(require,module,exports){
module.exports = {
  accepted: [Boolean],
  value: false
};



},{}],262:[function(require,module,exports){
var print        = require("../../core/console/print.coffee"),
    stringFormat = require("../../string/format.js")

module.exports = {
  "accepted" : [ undefined , Function ],
  "first"    : true,
  "frozen"   : false,
  "process"  : function (value, vars) {

    if ( this.initialized === false ) {
      this.initialized = true
      return value
    }

    if ( value === undefined && typeof this.value === "function" ) {
      value = this.value
    }

    if ( vars.container.value === false ) {

      var str = vars.format.locale.value.dev.setContainer
      print.warning( str , "container" )

    }
    else if ( vars.container.value.empty() ) {

      var str = vars.format.locale.value.dev.noContainer
      print.warning( stringFormat(str,"\""+vars.container.value+"\"") , "container" )

    }
    else {

      if ( vars.dev.value ) print.time("total draw time");

      vars.container.value.call(vars.self);

    }

    if ( typeof value === "function" && vars.history.chain.length ) {

      var changesObject = {}
      changes.forEach(function(c){
        var method = c.method
        delete c.method
        changesObject[method] = c
      })

      value(changesObject)

      vars.history.chain = []

    }

    return value

  },
  "update"   : true,
  "value"    : undefined
}

},{"../../core/console/print.coffee":54,"../../string/format.js":167}],263:[function(require,module,exports){
var process = require("../../core/methods/process/data.coffee");

module.exports = {
  "accepted": [false, Array, Function, String],
  "arrows":   {
    "accepted":  [ Boolean , Number ],
    "direction": {
      "accepted": [ "source" , "target" ],
      "value":    "target"
    },
    "value": false
  },
  "color":       "#d0d0d0",
  "connections": function(focus,id,objects) {

    var self = this

    if (!self.value) {
      return []
    }

    if (!id) var id = "id"

    var edges = self.restricted || self.value,
        targets = []

    if (!focus) {
      return edges
    }

    var connections = edges.filter(function(edge){

      var match = false

      if (edge[self.source][id] == focus) {
        match = true
        if (objects) {
          targets.push(edge[self.target])
        }
      }
      else if (edge[self.target][id] == focus) {
        match = true
        if (objects) {
          targets.push(edge[self.source])
        }
      }

      return match

    })

    return objects ? targets : connections

  },
  "delimiter": {
    "accepted": [ String ],
    "value":    "|"
  },
  "filetype": {
    "accepted": [false, "json", "xml","html", "csv", "dsv", "tsv", "txt"],
    "value":    false
  },
  "interpolate": {
    "accepted": ["basis", "cardinal", "linear", "monotone", "step"],
    "value":    "basis"
  },
  "label": false,
  "large": 100,
  "limit": {
    "accepted": [false, Function, Number],
    "value":    false
  },
  "opacity": {
    "accepted": [Function, Number, String],
    "min": {
      "accepted": [Number],
      "value": 0.25
    },
    "scale": {
      "accepted": [Function],
      "value": d3.scale.linear()
    },
    "value": 1
  },
  "process":  process,
  "size": {
    "accepted": [false, Number, String],
    "min": 1,
    "scale": 0.5,
    "value": false
  },
  "source":   "source",
  "strength": {
    "accepted": [false, Function, Number, String],
    "value":    false
  },
  "target": "target",
  "value":  false
};

},{"../../core/methods/process/data.coffee":83}],264:[function(require,module,exports){
module.exports = {
  accepted: [Boolean, String],
  value: false
};



},{}],265:[function(require,module,exports){
module.exports = {
  accepted: [false, Array, Function, Number, String],
  deprecates: "highlight",
  process: function(value) {
    if (value === false) {
      return [];
    } else if (value instanceof Array) {
      return value;
    } else {
      return [value];
    }
  },
  tooltip: {
    accepted: [Boolean],
    value: true
  },
  value: []
};



},{}],266:[function(require,module,exports){
var align, decoration, family, transform;

align = require("../../core/methods/font/align.coffee");

decoration = require("../../core/methods/font/decoration.coffee");

family = require("../../core/methods/font/family.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  align: align(),
  color: "#444444",
  decoration: decoration(),
  family: family(),
  secondary: {
    align: align(),
    color: "#444444",
    decoration: decoration(),
    family: family(),
    size: 12,
    spacing: 0,
    transform: transform(),
    weight: 200
  },
  size: 12,
  spacing: 0,
  transform: transform(),
  weight: 200
};



},{"../../core/methods/font/align.coffee":78,"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82}],267:[function(require,module,exports){
var decoration, family, transform;

family = require("../../core/methods/font/family.coffee");

decoration = require("../../core/methods/font/decoration.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  accepted: [false, Number, String],
  font: {
    align: "center",
    color: "#444",
    decoration: decoration(),
    family: family(),
    size: 11,
    transform: transform(),
    weight: 200
  },
  link: false,
  padding: 0,
  position: "bottom",
  value: false
};



},{"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82}],268:[function(require,module,exports){
var formatNumber, locale, mergeObject, titleCase;

formatNumber = require("../../number/format.coffee");

locale = require("../../core/locale/locale.coffee");

mergeObject = require("../../object/merge.coffee");

titleCase = require("../../string/title.coffee");

module.exports = {
  accepted: [Function, String],
  affixes: {
    accepted: [Object],
    objectAccess: false,
    value: {}
  },
  deprecates: ["number_format", "text_format"],
  locale: {
    accepted: function() {
      return d3.keys(locale);
    },
    process: function(value) {
      var defaultLocale, returnObject;
      defaultLocale = "en_US";
      returnObject = locale[defaultLocale];
      if (value !== defaultLocale) {
        returnObject = mergeObject(returnObject, locale[value]);
      }
      this.language = value;
      return returnObject;
    },
    value: "en_US"
  },
  number: {
    accepted: [false, Function],
    value: false
  },
  process: function(value, vars) {
    if (typeof value === "string") {
      vars.self.format({
        locale: value
      });
    } else {
      if (typeof value === "function") {
        return value;
      }
    }
    return this.value;
  },
  text: {
    accepted: [false, Function],
    value: false
  },
  value: function(value, opts) {
    var f, v, vars;
    if (!opts) {
      opts = {};
    }
    vars = opts.vars || {};
    if (vars.time && vars.time.value && opts.key === vars.time.value) {
      v = value.constructor === Date ? value : new Date(value);
      return vars.data.time.format(v);
    } else if (typeof value === "number") {
      f = this.number.value || formatNumber;
      return f(value, opts);
    } else if (typeof value === "string") {
      f = this.text.value || titleCase;
      return f(value, opts);
    } else {
      return JSON.stringify(value);
    }
  }
};



},{"../../core/locale/locale.coffee":75,"../../number/format.coffee":164,"../../object/merge.coffee":165,"../../string/title.coffee":170}],269:[function(require,module,exports){
module.exports = {
  accepted: [false, Number],
  max: 600,
  secondary: false,
  small: 200,
  value: false
};



},{}],270:[function(require,module,exports){
var align, decoration, family, filter, position, rendering, transform;

align = require("../../../core/methods/font/align.coffee");

decoration = require("../../../core/methods/font/decoration.coffee");

family = require("../../../core/methods/font/family.coffee");

filter = require("../../../core/methods/filter.coffee");

position = require("../../../core/methods/font/position.coffee");

rendering = require("../../../core/methods/rendering.coffee");

transform = require("../../../core/methods/font/transform.coffee");

module.exports = function(axis) {
  return {
    accepted: [Array, Boolean, Function, Object, String],
    affixes: {
      accepted: [Boolean],
      separator: {
        accepted: [Boolean, Array],
        value: true
      },
      value: false
    },
    axis: {
      accepted: [Boolean],
      color: "#444",
      font: {
        color: false,
        decoration: decoration(false),
        family: family(""),
        size: false,
        transform: transform(false),
        weight: false
      },
      rendering: rendering(),
      value: true
    },
    dataFilter: true,
    deprecates: [axis + "axis", axis + "axis_val", axis + "axis_var"],
    domain: {
      accepted: [false, Array],
      value: false
    },
    grid: {
      accepted: [Boolean],
      color: "#ccc",
      rendering: rendering(),
      value: true
    },
    label: {
      accepted: [Boolean, String],
      fetch: function(vars) {
        if (this.value === true) {
          return vars.format.value(vars[axis].value, {
            key: axis,
            vars: vars
          });
        }
        return this.value;
      },
      font: {
        color: "#444",
        decoration: decoration(),
        family: family(),
        size: 12,
        transform: transform(),
        weight: 200
      },
      padding: 3,
      value: true
    },
    lines: {
      accept: [false, Array, Number, Object],
      dasharray: {
        accepted: [Array, String],
        process: function(value) {
          if (value instanceof Array) {
            value = value.filter(function(d) {
              return !isNaN(d);
            });
            value = value.length ? value.join(", ") : "none";
          }
          return value;
        },
        value: "10, 10"
      },
      color: "#888",
      font: {
        align: align("right"),
        color: "#444",
        background: {
          accepted: [Boolean],
          value: true
        },
        decoration: decoration(),
        family: family(),
        padding: {
          accepted: [Number],
          value: 10
        },
        position: position("middle"),
        size: 12,
        transform: transform(),
        weight: 200
      },
      process: Array,
      rendering: rendering(),
      width: 1,
      value: []
    },
    mouse: {
      accept: [Boolean],
      dasharray: {
        accepted: [Array, String],
        process: function(value) {
          if (value instanceof Array) {
            value = value.filter(function(d) {
              return !isNaN(d);
            });
            value = value.length ? value.join(", ") : "none";
          }
          return value;
        },
        value: "none"
      },
      rendering: rendering(),
      width: 2,
      value: true
    },
    mute: filter(true),
    padding: {
      accepted: [Number],
      value: 0.1
    },
    range: {
      accepted: [false, Array],
      value: false
    },
    scale: {
      accepted: ["linear", "log", "discrete", "share"],
      deprecates: ["layout", "unique_axis", axis + "axis_scale"],
      process: function(value, vars) {
        var i, len, ref, scale;
        ref = ["log", "discrete", "share"];
        for (i = 0, len = ref.length; i < len; i++) {
          scale = ref[i];
          if (scale === value) {
            vars.axes[scale] = axis;
          } else {
            if (vars.axes[scale] === axis) {
              vars.axes[scale] = false;
            }
          }
        }
        if (value === "discrete") {
          vars.axes.opposite = (axis === "x" ? "y" : "x");
        }
        return value;
      },
      value: "linear"
    },
    solo: filter(true),
    stacked: {
      accepted: [Boolean],
      process: function(value, vars) {
        if (!value && vars.axes.stacked === axis) {
          vars.axes.stacked = false;
        } else {
          if (value) {
            vars.axes.stacked = axis;
          }
        }
        return value;
      },
      value: false
    },
    ticks: {
      color: "#ccc",
      font: {
        color: "#666",
        decoration: decoration(),
        family: family(),
        size: 10,
        transform: transform(),
        weight: 200
      },
      rendering: rendering(),
      size: 10,
      width: 1
    },
    value: false,
    zerofill: {
      accepted: [Boolean],
      value: false
    }
  };
};



},{"../../../core/methods/filter.coffee":77,"../../../core/methods/font/align.coffee":78,"../../../core/methods/font/decoration.coffee":79,"../../../core/methods/font/family.coffee":80,"../../../core/methods/font/position.coffee":81,"../../../core/methods/font/transform.coffee":82,"../../../core/methods/rendering.coffee":88}],271:[function(require,module,exports){
module.exports = {
  accepted: [Boolean],
  back: function() {
    if (this.states.length) {
      return this.states.pop()();
    }
  },
  chain: [],
  reset: function() {
    var results;
    results = [];
    while (this.states.length) {
      results.push(this.states.pop()());
    }
    return results;
  },
  states: [],
  value: true
};



},{}],272:[function(require,module,exports){
var process;

process = require("../../core/methods/process/icon.coffee");

module.exports = {
  accepted: [false, Array, Function, Object, String],
  back: {
    accepted: [false, String],
    fallback: "&#x276e;",
    opacity: 1,
    process: process,
    rotate: 0,
    value: "fa-angle-left"
  },
  deprecates: "icon_var",
  style: {
    accepted: [Object, String],
    deprecates: "icon_style",
    value: "default"
  },
  value: false
};



},{"../../core/methods/process/icon.coffee":85}],273:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [Array, String],
  dataFilter: true,
  deprecates: ["id_var", "nesting"],
  grouping: {
    accepted: [Boolean],
    value: true
  },
  mute: filter(true),
  nesting: ["id"],
  solo: filter(true),
  value: "id"
};



},{"../../core/methods/filter.coffee":77}],274:[function(require,module,exports){
var decoration, family, transform;

decoration = require("../../core/methods/font/decoration.coffee");

family = require("../../core/methods/font/family.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  accepted: [Boolean],
  align: {
    accepted: ["start", "middle", "end", "left", "center", "right"],
    process: function(value) {
      var css;
      css = ["left", "center", "right"].indexOf(value);
      if (css >= 0) {
        value = this.accepted[css];
      }
      return value;
    },
    value: "middle"
  },
  font: {
    decoration: decoration(),
    family: family(),
    size: 11,
    transform: transform(),
    weight: 200
  },
  padding: 7,
  resize: {
    accepted: [Boolean],
    value: true
  },
  text: {
    accepted: [false, Function, String],
    value: false
  },
  segments: 2,
  valign: {
    accepted: [false, "top", "middle", "bottom"],
    value: "middle"
  },
  value: true
};



},{"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82}],275:[function(require,module,exports){
var family;

family = require("../../core/methods/font/family.coffee");

module.exports = {
  accepted: [Boolean],
  align: "middle",
  font: {
    align: "middle",
    color: "#444444",
    family: family(),
    size: 10,
    weight: 200
  },
  gradient: {
    height: 10
  },
  icons: {
    accepted: [Boolean],
    value: true
  },
  order: {
    accepted: ["color", "id", "size", "text"],
    sort: {
      accepted: ["asc", "desc"],
      value: "asc"
    },
    value: "color"
  },
  size: [8, 30],
  tooltip: {
    accepted: [Boolean],
    value: true
  },
  text: {
    accepted: [false, Function, String],
    value: false
  },
  value: true
};



},{"../../core/methods/font/family.coffee":80}],276:[function(require,module,exports){
var decoration, family, transform;

decoration = require("../../core/methods/font/decoration.coffee");

family = require("../../core/methods/font/family.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  font: {
    color: "#444444",
    decoration: decoration(),
    family: family(),
    transform: transform(),
    weight: 200
  },
  hover: {
    color: "#444444",
    decoration: decoration(),
    family: family(),
    transform: transform(),
    weight: 200
  }
};



},{"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82}],277:[function(require,module,exports){
var process;

process = require("../../core/methods/process/margin.coffee");

module.exports = {
  accepted: [Number, Object, String],
  process: function(value) {
    var userValue;
    if (value === void 0) {
      value = this.value;
    }
    userValue = value;
    process(value, this);
    return userValue;
  },
  value: 0
};



},{"../../core/methods/process/margin.coffee":86}],278:[function(require,module,exports){
var decoration, family, transform;

decoration = require("../../core/methods/font/decoration.coffee");

family = require("../../core/methods/font/family.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  accepted: [Boolean, String],
  font: {
    color: "#444",
    decoration: decoration(),
    family: family(),
    size: 16,
    transform: transform(),
    weight: 200
  },
  padding: 5,
  style: {
    accepted: [false, "small", "large"],
    value: false
  },
  value: true
};



},{"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82}],279:[function(require,module,exports){
var process;

process = require("../../core/methods/process/data.coffee");

module.exports = {
  accepted: [false, Array, Function, String],
  delimiter: {
    accepted: [String],
    value: "|"
  },
  filetype: {
    accepted: [false, "json", "xml", "html", "csv", "dsv", "tsv", "txt"],
    value: false
  },
  overlap: 0.6,
  process: process,
  value: false
};



},{"../../core/methods/process/data.coffee":83}],280:[function(require,module,exports){
module.exports = {
  accepted: [Boolean, Function, String],
  agg: {
    accepted: [false, Function, "sum", "min", "max", "mean", "median"],
    value: false
  },
  deprecates: ["sort"],
  sort: {
    accepted: ["asc", "desc"],
    value: "desc"
  },
  value: false
};



},{}],281:[function(require,module,exports){
var rendering;

rendering = require("../../core/methods/rendering.coffee");

module.exports = {
  accepted: function(vars) {
    var list;
    list = vars.types[vars.type.value].shapes;
    if (list && !(list instanceof Array)) {
      list = [list];
    }
    if (list.length) {
      return list;
    } else {
      return ["square"];
    }
  },
  interpolate: {
    accepted: ["basis", "basis-open", "cardinal", "cardinal-open", "linear", "monotone", "step", "step-before", "step-after"],
    deprecates: "stack_type",
    value: "linear"
  },
  rendering: rendering(),
  value: false
};



},{"../../core/methods/rendering.coffee":88}],282:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [false, Function, Number, Object, String],
  dataFilter: true,
  deprecates: ["value", "value_var"],
  mute: filter(true),
  scale: {
    accepted: [Function],
    deprecates: "size_scale",
    max: {
      accepted: [Function, Number],
      value: function(vars) {
        return Math.floor(d3.max([d3.min([vars.width.viz, vars.height.viz]) / 15, 6]));
      }
    },
    min: {
      accepted: [Function, Number],
      value: 3
    },
    value: d3.scale.sqrt()
  },
  solo: filter(true),
  threshold: {
    accepted: [Boolean, Function, Number],
    value: true
  },
  value: false
};



},{"../../core/methods/filter.coffee":77}],283:[function(require,module,exports){
module.exports = {
  value: false
};



},{}],284:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [false, Function, Object, String],
  deprecates: ["else_var", "else"],
  mute: filter(true),
  solo: filter(true),
  value: false
};



},{"../../core/methods/filter.coffee":77}],285:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [Array, Boolean, Function, Object, String],
  deprecates: ["name_array", "text_var"],
  nesting: true,
  mute: filter(true),
  solo: filter(true),
  value: false
};



},{"../../core/methods/filter.coffee":77}],286:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [Array, Boolean, Function, Object, String],
  dataFilter: true,
  deprecates: ["year", "year_var"],
  fixed: {
    accepted: [Boolean],
    deprecates: ["static_axis", "static_axes"],
    value: true
  },
  format: {
    accepted: [false, Array, Function, String],
    value: false
  },
  mute: filter(false),
  solo: filter(false),
  value: false
};



},{"../../core/methods/filter.coffee":77}],287:[function(require,module,exports){
module.exports = {
  accepted: [Boolean],
  align: "middle",
  hover: {
    accepted: ["all-scroll", "col-resize", "crosshair", "default", "grab", "grabbing", "move", "pointer"],
    value: "pointer"
  },
  handles: {
    accepted: [Boolean],
    color: "#666",
    opacity: 1,
    size: 3,
    stroke: "#666",
    value: true
  },
  height: {
    accepted: [Number],
    value: 23
  },
  play: {
    accepted: [Boolean],
    icon: {
      accepted: [false, String],
      awesome: "",
      fallback: "►"
    },
    pause: {
      accepted: [false, String],
      awesome: "",
      fallback: "❚❚"
    },
    timing: {
      accepted: [Number],
      value: 1500
    },
    value: true
  },
  value: true
};



},{}],288:[function(require,module,exports){
module.exports = {
  mouseevents: 60,
  transitions: 600,
  ui: 200
};



},{}],289:[function(require,module,exports){
var decoration, family, stringStrip, transform;

decoration = require("../../core/methods/font/decoration.coffee");

family = require("../../core/methods/font/family.coffee");

transform = require("../../core/methods/font/transform.coffee");

stringStrip = require("../../string/strip.js");

module.exports = {
  accepted: [false, Function, String],
  font: {
    align: "center",
    color: "#444444",
    decoration: decoration(),
    family: family(),
    size: 16,
    transform: transform(),
    weight: 400
  },
  height: false,
  link: false,
  padding: 2,
  position: "top",
  process: function(value, vars) {
    var id;
    if (vars.container.id.indexOf("default") === 0 && value) {
      id = stringStrip(value).toLowerCase();
      vars.self.container({
        id: id
      });
    }
    return value;
  },
  sub: {
    accepted: [false, Function, String],
    deprecates: "sub_title",
    font: {
      align: "center",
      color: "#444444",
      decoration: decoration(),
      family: family(),
      size: 12,
      transform: transform(),
      weight: 200
    },
    link: false,
    padding: 1,
    position: "top",
    value: false
  },
  total: {
    accepted: [Boolean, Object],
    deprecates: "total_bar",
    font: {
      align: "center",
      color: "#444444",
      decoration: decoration(),
      family: family(),
      size: 12,
      transform: transform(),
      weight: 200,
      value: false
    },
    link: false,
    padding: 1,
    position: "top",
    value: false
  },
  width: false,
  value: false
};



},{"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82,"../../string/strip.js":169}],290:[function(require,module,exports){
var family, transform;

family = require("../../core/methods/font/family.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  accepted: [Boolean, Array, Function, Object, String],
  anchor: "top center",
  background: "#ffffff",
  children: {
    accepted: [Boolean],
    value: true
  },
  connections: {
    accepted: [Boolean],
    value: true
  },
  curtain: {
    color: "#ffffff",
    opacity: 0.8
  },
  deprecates: "tooltip_info",
  extent: {
    accepted: [Boolean],
    value: true
  },
  font: {
    color: "#444",
    family: family(),
    size: 12,
    transform: transform(),
    weight: 200
  },
  html: {
    accepted: [false, Function, Object, String],
    deprecates: "click_function",
    value: false
  },
  iqr: {
    accepted: [Boolean],
    value: true
  },
  large: 250,
  share: {
    accepted: [Boolean],
    value: true
  },
  size: {
    accepted: [Boolean],
    value: true
  },
  small: 225,
  value: true
};



},{"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82}],291:[function(require,module,exports){
var filter;

filter = require("../../core/methods/filter.coffee");

module.exports = {
  accepted: [false, Function, Object, String],
  deprecates: ["total_var"],
  mute: filter(true),
  solo: filter(true),
  value: false
};



},{"../../core/methods/filter.coffee":77}],292:[function(require,module,exports){
module.exports = {
  accepted: function(vars) {
    return d3.keys(vars.types);
  },
  mode: {
    accepted: function(vars) {
      return vars.types[vars.type.value].modes || [false];
    },
    value: false
  },
  value: "tree_map"
};



},{}],293:[function(require,module,exports){
var align, decoration, family, transform;

family = require("../../core/methods/font/family.coffee");

align = require("../../core/methods/font/align.coffee");

decoration = require("../../core/methods/font/decoration.coffee");

transform = require("../../core/methods/font/transform.coffee");

module.exports = {
  accepted: [Array, Boolean],
  align: align("center"),
  border: 1,
  color: {
    primary: {
      process: function(value, vars) {
        var primary;
        primary = this.value;
        if (!vars.ui.color.secondary.value) {
          vars.ui.color.secondary.value = d3.rgb(primary).darker(0.75).toString();
        }
        return value;
      },
      value: "#ffffff"
    },
    secondary: {
      value: false
    }
  },
  display: {
    acceped: ["block", "inline-block"],
    value: "inline-block"
  },
  font: {
    align: "center",
    color: "#444",
    decoration: decoration(),
    family: family(),
    size: 11,
    transform: transform(),
    weight: 200
  },
  margin: 5,
  padding: 5,
  position: {
    accepted: ["top", "right", "bottom", "left"],
    value: "bottom"
  },
  value: false
};



},{"../../core/methods/font/align.coffee":78,"../../core/methods/font/decoration.coffee":79,"../../core/methods/font/family.coffee":80,"../../core/methods/font/transform.coffee":82}],294:[function(require,module,exports){
module.exports = {
  accepted: [false, Number],
  secondary: false,
  small: 200,
  value: false
};



},{}],295:[function(require,module,exports){
module.exports = {
  "accepted"   : [ Boolean ],
  "behavior"   : d3.behavior.zoom().scaleExtent([ 1 , 1 ]).duration(0),
  "click"      : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "pan"        : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "scroll"     : {
    "accepted"   : [ Boolean ],
    "deprecates" : "scroll_zoom",
    "value"      : true
  },
  "value"      : true
}

},{}],296:[function(require,module,exports){
var bar, fetchValue, graph, nest, stack, uniques,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

fetchValue = require("../../core/fetch/value.coffee");

graph = require("./helpers/graph/draw.coffee");

nest = require("./helpers/graph/nest.coffee");

stack = require("./helpers/graph/stack.coffee");

uniques = require("../../util/uniques.coffee");

bar = function(vars) {
  var bars, base, cMargin, d, data, discrete, discreteVal, divisions, domains, h, i, j, k, len, len1, length, maxSize, mod, nested, oMargin, offset, oppVal, opposite, padding, point, ref, ref1, space, value, w, x, zero;
  discrete = vars.axes.discrete;
  h = discrete === "x" ? "height" : "width";
  w = discrete === "x" ? "width" : "height";
  opposite = vars.axes.opposite;
  cMargin = discrete === "x" ? "left" : "top";
  oMargin = discrete === "x" ? "top" : "left";
  graph(vars, {
    buffer: true,
    zero: vars.axes.opposite
  });
  domains = vars.x.domain.viz.concat(vars.y.domain.viz);
  if (domains.indexOf(void 0) >= 0) {
    return [];
  }
  nested = vars.data.viz;
  if (vars.axes.stacked) {
    stack(vars, nested);
  }
  space = vars.axes[w] / vars[vars.axes.discrete].ticks.values.length;
  padding = vars[vars.axes.discrete].padding.value;
  if (padding < 1) {
    padding *= space;
  }
  if (padding * 2 > space) {
    padding = space * 0.1;
  }
  maxSize = space - padding * 2;
  if (!vars.axes.stacked) {
    if (ref = vars[discrete].value, indexOf.call(vars.id.nesting, ref) >= 0) {
      bars = d3.nest().key(function(d) {
        return fetchValue(vars, d, vars[discrete].value);
      }).entries(nested);
      divisions = d3.max(bars, function(b) {
        return b.values.length;
      });
    } else {
      bars = uniques(nested, vars.id.value, fetchValue, vars);
      divisions = bars.length;
    }
    maxSize /= divisions;
    offset = space / 2 - maxSize / 2 - padding;
    x = d3.scale.linear().domain([0, divisions - 1]).range([-offset, offset]);
  }
  data = [];
  zero = 0;
  for (i = j = 0, len = nested.length; j < len; i = ++j) {
    point = nested[i];
    mod = vars.axes.stacked ? 0 : x(i % divisions);
    ref1 = point.values;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      d = ref1[k];
      if (vars.axes.stacked) {
        value = d.d3plus[opposite];
        base = d.d3plus[opposite + "0"];
      } else {
        oppVal = fetchValue(vars, d, vars[opposite].value);
        if (oppVal === 0) {
          continue;
        }
        if (vars[opposite].scale.value === "log") {
          zero = oppVal < 0 ? -1 : 1;
        }
        value = vars[opposite].scale.viz(oppVal);
        base = vars[opposite].scale.viz(zero);
      }
      discreteVal = fetchValue(vars, d, vars[discrete].value);
      d.d3plus[discrete] = vars[discrete].scale.viz(discreteVal);
      d.d3plus[discrete] += vars.axes.margin[cMargin] + mod;
      length = base - value;
      d.d3plus[opposite] = base - length / 2;
      if (!vars.axes.stacked) {
        d.d3plus[opposite] += vars.axes.margin[oMargin];
      }
      d.d3plus[w] = maxSize;
      d.d3plus[h] = Math.abs(length);
      d.d3plus.init = {};
      d.d3plus.init[opposite] = vars[opposite].scale.viz(zero);
      d.d3plus.init[opposite] -= d.d3plus[opposite];
      d.d3plus.init[opposite] += vars.axes.margin[oMargin];
      d.d3plus.init[w] = d.d3plus[w];
      d.d3plus.label = false;
      data.push(d);
    }
  }
  return data;
};

bar.filter = function(vars, data) {
  return nest(vars, data);
};

bar.requirements = ["data", "x", "y"];

bar.setup = function(vars) {
  var axis;
  if (!vars.axes.discrete) {
    axis = vars.time.value === vars.y.value ? "y" : "x";
    return vars.self[axis]({
      scale: "discrete"
    });
  }
};

bar.shapes = ["square"];

module.exports = bar;



},{"../../core/fetch/value.coffee":69,"../../util/uniques.coffee":204,"./helpers/graph/draw.coffee":302,"./helpers/graph/nest.coffee":308,"./helpers/graph/stack.coffee":309}],297:[function(require,module,exports){
var box, fetchValue, graph, strip, uniques;

fetchValue = require("../../core/fetch/value.coffee");

graph = require("./helpers/graph/draw.coffee");

strip = require("../../string/strip.js");

uniques = require("../../util/uniques.coffee");

box = function(vars) {
  var disMargin, discrete, domains, h, medians, mergeData, mode, noData, oppMargin, opposite, returnData, space, w;
  graph(vars, {
    buffer: true,
    mouse: true
  });
  domains = vars.x.domain.viz.concat(vars.y.domain.viz);
  if (domains.indexOf(void 0) >= 0) {
    return [];
  }
  discrete = vars.axes.discrete;
  opposite = vars.axes.opposite;
  disMargin = discrete === "x" ? vars.axes.margin.left : vars.axes.margin.top;
  oppMargin = opposite === "x" ? vars.axes.margin.left : vars.axes.margin.top;
  h = discrete === "x" ? "height" : "width";
  w = discrete === "x" ? "width" : "height";
  space = vars.axes[w] / vars[discrete].ticks.values.length;
  space = d3.min([space - vars.labels.padding * 2, 100]);
  mode = vars.type.mode.value;
  if (!(mode instanceof Array)) {
    mode = [mode, mode];
  }
  mergeData = function(arr) {
    var key, obj, vals;
    obj = {};
    for (key in vars.data.keys) {
      vals = uniques(arr, key, fetchValue, vars);
      obj[key] = vals.length === 1 ? vals[0] : vals;
    }
    return obj;
  };
  noData = false;
  medians = [];
  returnData = [];
  d3.nest().key(function(d) {
    return fetchValue(vars, d, vars[discrete].value);
  }).rollup(function(leaves) {
    var bottom, bottomLabel, bottomWhisker, boxData, d, diff1, diff2, first, i, iqr, j, key, label, len, len1, median, medianBuffer, medianData, medianHeight, medianText, outliers, scale, second, tooltipData, top, topLabel, topWhisker, uniqs, val, values, x, y;
    scale = vars[opposite].scale.viz;
    values = leaves.map(function(d) {
      return fetchValue(vars, d, vars[opposite].value);
    });
    values.sort(function(a, b) {
      return a - b;
    });
    uniqs = uniques(values);
    first = d3.quantile(values, 0.25);
    median = d3.quantile(values, 0.50);
    second = d3.quantile(values, 0.75);
    tooltipData = {};
    if (mode[1] === "tukey") {
      iqr = first - second;
      top = second - iqr * 1.5;
      topLabel = "top tukey";
    } else if (mode[1] === "extent") {
      top = d3.max(values);
      topLabel = "maximum";
    } else if (typeof mode[1] === "number") {
      top = d3.quantile(values, (100 - mode[1]) / 100);
      topLabel = mode[1] + " percentile";
    }
    top = d3.min([d3.max(values), top]);
    if (vars.tooltip.extent.value) {
      tooltipData[topLabel] = {
        key: vars[opposite].value,
        value: top
      };
    }
    if (vars.tooltip.iqr.value) {
      tooltipData["third quartile"] = {
        key: vars[opposite].value,
        value: second
      };
      tooltipData["median"] = {
        key: vars[opposite].value,
        value: median
      };
      tooltipData["first quartile"] = {
        key: vars[opposite].value,
        value: first
      };
    }
    if (mode[0] === "tukey") {
      iqr = first - second;
      bottom = first + iqr * 1.5;
      bottomLabel = "bottom tukey";
    } else if (mode[0] === "extent") {
      bottom = d3.min(values);
      bottomLabel = "minimum";
    } else if (typeof mode[0] === "number") {
      bottom = d3.quantile(values, mode[0] / 100);
      bottomLabel = mode[0] + " percentile";
    }
    bottom = d3.max([d3.min(values), bottom]);
    if (vars.tooltip.extent.value) {
      tooltipData[bottomLabel] = {
        key: vars[opposite].value,
        value: bottom
      };
    }
    boxData = [];
    bottomWhisker = [];
    topWhisker = [];
    outliers = [];
    for (i = 0, len = leaves.length; i < len; i++) {
      d = leaves[i];
      val = fetchValue(vars, d, vars[opposite].value);
      if (val >= first && val <= second) {
        boxData.push(d);
      } else if (val >= bottom && val < first) {
        bottomWhisker.push(d);
      } else if (val <= top && val > second) {
        topWhisker.push(d);
      } else {
        outliers.push(d);
      }
    }
    key = fetchValue(vars, leaves[0], vars[discrete].value);
    x = vars[discrete].scale.viz(key);
    x += disMargin;
    label = vars.format.value(key, {
      key: vars[discrete].value,
      vars: vars
    });
    if (key.constructor === Date) {
      key = key.getTime();
    }
    key = strip(key);
    boxData = mergeData(boxData);
    boxData.d3plus = {
      color: "white",
      id: "box_" + key,
      init: {},
      label: false,
      shape: "square",
      stroke: "#444",
      text: "Interquartile Range for " + label
    };
    boxData.d3plus[w] = space;
    boxData.d3plus.init[w] = space;
    boxData.d3plus[h] = Math.abs(scale(first) - scale(second));
    boxData.d3plus[discrete] = x;
    y = d3.min([scale(first), scale(second)]) + boxData.d3plus[h] / 2;
    y += oppMargin;
    boxData.d3plus[opposite] = y;
    boxData.d3plus.tooltip = tooltipData;
    returnData.push(boxData);
    medianData = {
      d3plus: {
        id: "median_line_" + key,
        position: h === "height" ? "top" : "right",
        shape: "whisker",
        "static": true
      }
    };
    medianText = vars.format.value(median, {
      key: vars[opposite].value,
      vars: vars
    });
    label = {
      background: "#fff",
      names: [medianText],
      padding: 0,
      resize: false,
      x: 0,
      y: 0
    };
    diff1 = Math.abs(scale(median) - scale(first));
    diff2 = Math.abs(scale(median) - scale(second));
    medianHeight = d3.min([diff1, diff2]) * 2;
    medianBuffer = vars.data.stroke.width * 2 + vars.labels.padding * 2;
    label[w === "width" ? "w" : "h"] = space - medianBuffer;
    label[h === "width" ? "w" : "h"] = medianHeight - medianBuffer;
    medianData.d3plus.label = label;
    medianData.d3plus[w] = space;
    medianData.d3plus[discrete] = x;
    medianData.d3plus[opposite] = scale(median) + oppMargin;
    returnData.push(medianData);
    bottomWhisker = mergeData(bottomWhisker);
    bottomWhisker.d3plus = {
      id: "bottom_whisker_line_" + key,
      offset: boxData.d3plus[h] / 2,
      position: h === "height" ? "bottom" : "left",
      shape: "whisker",
      "static": true
    };
    if (opposite === "x") {
      bottomWhisker.d3plus.offset *= -1;
    }
    bottomWhisker.d3plus[h] = Math.abs(scale(bottom) - scale(first));
    bottomWhisker.d3plus[w] = space;
    bottomWhisker.d3plus[discrete] = x;
    bottomWhisker.d3plus[opposite] = y;
    returnData.push(bottomWhisker);
    topWhisker = mergeData(topWhisker);
    topWhisker.d3plus = {
      id: "top_whisker_line_" + key,
      offset: boxData.d3plus[h] / 2,
      position: h === "height" ? "top" : "right",
      shape: "whisker",
      "static": true
    };
    if (opposite === "y") {
      topWhisker.d3plus.offset *= -1;
    }
    topWhisker.d3plus[h] = Math.abs(scale(top) - scale(second));
    topWhisker.d3plus[w] = space;
    topWhisker.d3plus[discrete] = x;
    topWhisker.d3plus[opposite] = y;
    returnData.push(topWhisker);
    for (j = 0, len1 = outliers.length; j < len1; j++) {
      d = outliers[j];
      d.d3plus[discrete] = x;
      d.d3plus[opposite] = scale(fetchValue(vars, d, vars.y.value));
      d.d3plus[opposite] += oppMargin;
      d.d3plus.r = 4;
      d.d3plus.shape = vars.shape.value;
    }
    noData = !outliers.length && top - bottom === 0;
    medians.push(median);
    returnData = returnData.concat(outliers);
    return leaves;
  }).entries(vars.data.viz);
  if (noData && uniques(medians).length === 1) {
    return [];
  } else {
    return returnData;
  }
};

box.modes = ["tukey", "extent", Array, Number];

box.requirements = ["data", "x", "y"];

box.shapes = ["circle", "check", "cross", "diamond", "square", "triangle", "triangle_up", "triangle_down"];

box.setup = function(vars) {
  var axis;
  if (!vars.axes.discrete) {
    axis = vars.time.value === vars.y.value ? "y" : "x";
    return vars.self[axis]({
      scale: "discrete"
    });
  }
};

module.exports = box;



},{"../../core/fetch/value.coffee":69,"../../string/strip.js":169,"../../util/uniques.coffee":204,"./helpers/graph/draw.coffee":302}],298:[function(require,module,exports){
var arraySort, bubbles, fetchColor, fetchText, fetchValue, groupData, legible;

arraySort = require("../../array/sort.coffee");

fetchValue = require("../../core/fetch/value.coffee");

fetchColor = require("../../core/fetch/color.coffee");

fetchText = require("../../core/fetch/text.js");

legible = require("../../color/legible.coffee");

groupData = require("../../core/data/group.coffee");

bubbles = function(vars) {
  var column_height, column_width, columns, d, data, dataLength, domain, domainMax, domainMin, downscale, groupedData, i, j, k, l, labelHeight, len, len1, len2, obj, pack, padding, row, rows, screenRatio, size, size_max, size_min, t, temp, xPadding, xoffset, yMod, yPadding, yoffset;
  groupedData = groupData(vars, vars.data.viz);
  groupedData = arraySort(groupedData, null, null, null, vars);
  dataLength = groupedData.length;
  if (dataLength < 4) {
    columns = dataLength;
    rows = 1;
  } else {
    screenRatio = vars.width.viz / vars.height.viz;
    columns = Math.ceil(Math.sqrt(dataLength * screenRatio));
    rows = Math.ceil(Math.sqrt(dataLength / screenRatio));
  }
  if (dataLength > 0) {
    while ((rows - 1) * columns >= dataLength) {
      rows--;
    }
  }
  column_width = vars.width.viz / columns;
  column_height = vars.height.viz / rows;
  if (vars.size.value) {
    domainMin = d3.min(vars.data.viz, function(d) {
      return fetchValue(vars, d, vars.size.value, vars.id.value, "min");
    });
    domainMax = d3.max(vars.data.viz, function(d) {
      return fetchValue(vars, d, vars.size.value, vars.id.value);
    });
    domain = [domainMin, domainMax];
  } else {
    domain = [0, 0];
  }
  padding = 5;
  size_max = (d3.min([column_width, column_height]) / 2) - (padding * 2);
  labelHeight = vars.labels.value && !vars.small && size_max >= 40 ? d3.max([20, d3.min([size_max * 0.25, 50])]) : 0;
  size_max -= labelHeight;
  size_min = d3.min([size_max, vars.size.scale.min.value]);
  size = vars.size.scale.value.domain(domain).rangeRound([size_min, size_max]);
  pack = d3.layout.pack().children(function(d) {
    return d.values;
  }).padding(padding).radius(function(d) {
    return size(d);
  }).size([column_width - padding * 2, column_height - padding * 2 - labelHeight]).value(function(d) {
    return d.value;
  });
  data = [];
  row = 0;
  for (i = j = 0, len = groupedData.length; j < len; i = ++j) {
    d = groupedData[i];
    temp = pack.nodes(d);
    xoffset = (column_width * i) % vars.width.viz;
    yoffset = column_height * row;
    for (k = 0, len1 = temp.length; k < len1; k++) {
      t = temp[k];
      if (t.children) {
        obj = {
          d3plus: {}
        };
        obj[vars.id.value] = t.key;
      } else {
        obj = t.d3plus;
      }
      obj.d3plus.depth = vars.id.grouping.value ? t.depth : vars.depth.value;
      obj.d3plus.x = t.x;
      obj.d3plus.xOffset = xoffset;
      obj.d3plus.y = t.y;
      obj.d3plus.yOffset = yoffset + labelHeight;
      obj.d3plus.r = t.r;
      data.push(obj);
    }
    if ((i + 1) % columns === 0) {
      row++;
    }
  }
  downscale = size_max / d3.max(data, function(d) {
    return d.d3plus.r;
  });
  xPadding = pack.size()[0] / 2;
  yPadding = pack.size()[1] / 2;
  for (l = 0, len2 = data.length; l < len2; l++) {
    d = data[l];
    d.d3plus.x = ((d.d3plus.x - xPadding) * downscale) + xPadding + d.d3plus.xOffset;
    d.d3plus.y = ((d.d3plus.y - yPadding) * downscale) + yPadding + d.d3plus.yOffset;
    d.d3plus.r = d.d3plus.r * downscale;
    delete d.d3plus.xOffset;
    delete d.d3plus.yOffset;
    d.d3plus["static"] = d.d3plus.depth < vars.depth.value && vars.id.grouping.value;
    if (labelHeight && (d.d3plus.depth === 0 || vars.id.grouping.value === false)) {
      d.d3plus.text = fetchText(vars, d[vars.id.value], d.d3plus.depth);
      yMod = labelHeight > vars.labels.padding * 3 ? vars.labels.padding : 0;
      d.d3plus.label = {
        x: 0,
        y: -(size_max + yMod + labelHeight / 2),
        w: size_max * 2,
        h: labelHeight - yMod,
        padding: 0,
        resize: false,
        color: legible(fetchColor(vars, d, d.d3plus.depth)),
        force: true
      };
    } else {
      delete d.d3plus.label;
    }
  }
  return data.sort(function(a, b) {
    return a.d3plus.depth - b.d3plus.depth;
  });
};

bubbles.fill = true;

bubbles.requirements = ["data"];

bubbles.scale = 1.05;

bubbles.shapes = ["circle", "donut"];

module.exports = bubbles;



},{"../../array/sort.coffee":37,"../../color/legible.coffee":46,"../../core/data/group.coffee":59,"../../core/fetch/color.coffee":65,"../../core/fetch/text.js":68,"../../core/fetch/value.coffee":69}],299:[function(require,module,exports){
var chart, print;

print = require("../../../core/console/print.coffee");

chart = function(vars) {
  var type, types;
  types = {
    circle: "scatter",
    donut: "scatter",
    line: "line",
    square: "scatter",
    area: "stacked"
  };
  type = types[vars.shape.value];
  print.warning("The \"chart\" visualization type has been deprecated and will be removed in version 2.0. Please use the \"" + type + "\" visualization type.");
  vars.self.type(type).draw();
};

chart.shapes = ["circle", "donut", "line", "square", "area"];

module.exports = chart;



},{"../../../core/console/print.coffee":54}],300:[function(require,module,exports){
var geo_map;

geo_map = function(vars) {
  var coords, features, key, mute, solo, topo;
  topojson.presimplify(vars.coords.value);
  coords = vars.coords.value;
  key = d3.keys(coords.objects)[0];
  topo = topojson.feature(coords, coords.objects[key]);
  features = topo.features;
  solo = vars.coords.solo.value;
  mute = vars.coords.mute.value;
  features = features.filter(function(f) {
    f[vars.id.value] = f.id;
    if (solo.length) {
      return solo.indexOf(f.id) >= 0;
    } else if (mute.length) {
      return mute.indexOf(f.id) < 0;
    } else {
      return true;
    }
  });
  return features;
};

geo_map.libs = ["topojson"];

geo_map.nesting = false;

geo_map.requirements = ["coords"];

geo_map.scale = 1;

geo_map.shapes = ["coordinates"];

geo_map.zoom = true;

module.exports = geo_map;



},{}],301:[function(require,module,exports){
var color, legible, print;

color = require("../../../../core/fetch/color.coffee");

legible = require("../../../../color/legible.coffee");

print = require("../../../../core/console/print.coffee");

module.exports = function(vars) {
  var axes, axis, axisData, data, i, len, ref, style, tick, ticks, timing;
  axes = vars.axes;
  data = axes.stacked ? [] : vars.data.viz;
  timing = data.length * 2 > vars.data.large ? 0 : vars.draw.timing;
  style = function(line, axis) {
    if (axis === "y") {
      line.attr("x1", -2).attr("x2", -8).attr("y1", function(d) {
        return d.d3plus.y - axes.margin.top;
      }).attr("y2", function(d) {
        return d.d3plus.y - axes.margin.top;
      });
    } else {
      line.attr("x1", function(d) {
        return d.d3plus.x - axes.margin.left;
      }).attr("x2", function(d) {
        return d.d3plus.x - axes.margin.left;
      }).attr("y1", axes.height + 2).attr("y2", axes.height + 8);
    }
    return line.style("stroke", function(d) {
      return legible(color(vars, d));
    }).style("stroke-width", vars.data.stroke.width).attr("shape-rendering", vars.shape.rendering.value);
  };
  if (vars.dev.value) {
    print.time("creating axis tick groups");
  }
  ticks = vars.group.select("g#d3plus_graph_plane").selectAll("g.d3plus_data_tick").data(data, function(d) {
    var mod;
    mod = axes.discrete ? "_" + d.d3plus[axes.discrete] : "";
    return "tick_" + d[vars.id.value] + "_" + d.d3plus.depth + mod;
  });
  ticks.enter().append("g").attr("class", "d3plus_data_tick").attr("opacity", 0);
  if (vars.dev.value) {
    print.timeEnd("creating axis tick groups");
  }
  ref = ["x", "y"];
  for (i = 0, len = ref.length; i < len; i++) {
    axis = ref[i];
    if (vars.dev.value && timing) {
      print.time("creating " + axis + " ticks");
    }
    axisData = timing && axis !== axes.discrete ? data : [];
    tick = ticks.selectAll("line.d3plus_data_" + axis).data(axisData, function(d) {
      return "tick_" + d[vars.id.value] + "_" + d.d3plus.depth;
    });
    if (vars.dev.value && timing) {
      print.timeEnd("creating " + axis + " ticks");
    }
    if (vars.dev.value && timing) {
      print.time("styling " + axis + " ticks");
    }
    if (timing > 0) {
      tick.transition().duration(timing).call(style, axis);
    } else {
      tick.call(style, axis);
    }
    tick.enter().append("line").attr("class", "d3plus_data_" + axis).call(style, axis);
    if (vars.dev.value && timing) {
      print.timeEnd("styling " + axis + " ticks");
    }
  }
  if (timing > 0) {
    ticks.transition().duration(timing).attr("opacity", 1);
    ticks.exit().transition().duration(timing).attr("opacity", 0).remove();
  } else {
    ticks.attr("opacity", 1);
    ticks.exit().remove();
  }
};



},{"../../../../color/legible.coffee":46,"../../../../core/console/print.coffee":54,"../../../../core/fetch/color.coffee":65}],302:[function(require,module,exports){
var axes, draw, mouse, plot;

axes = require("./includes/axes.coffee");

draw = require("./includes/svg.coffee");

mouse = require("./includes/mouse.coffee");

plot = require("./includes/plot.coffee");

module.exports = function(vars, opts) {
  if (opts === void 0) {
    opts = {};
  }
  axes(vars, opts);
  plot(vars, opts);
  draw(vars, opts);
  vars.mouse = opts.mouse === true ? mouse : false;
};



},{"./includes/axes.coffee":303,"./includes/mouse.coffee":305,"./includes/plot.coffee":306,"./includes/svg.coffee":307}],303:[function(require,module,exports){
var arraySort, axisRange, buckets, buffer, dataChange, fetchData, fetchValue, getData, getScale, print, sizeScale, uniques;

arraySort = require("../../../../../array/sort.coffee");

buffer = require("./buffer.coffee");

buckets = require("../../../../../util/buckets.coffee");

fetchData = require("../../../../../core/fetch/data.js");

fetchValue = require("../../../../../core/fetch/value.coffee");

print = require("../../../../../core/console/print.coffee");

uniques = require("../../../../../util/uniques.coffee");

module.exports = function(vars, opts) {
  var axis, changed, domains, i, len, oppAxis, range, ref, reorder, zero;
  changed = dataChange(vars);
  if (changed || !vars.axes.dataset) {
    vars.axes.dataset = getData(vars);
  }
  vars.axes.scale = opts.buffer && opts.buffer !== true ? sizeScale(vars, opts.buffer) : false;
  ref = ["x", "y"];
  for (i = 0, len = ref.length; i < len; i++) {
    axis = ref[i];
    oppAxis = axis === "x" ? "y" : "x";
    reorder = vars.order.changed || vars.order.sort.changed || (vars.order.value === true && vars[oppAxis].changed);
    if (!vars[axis].ticks.values || changed || reorder) {
      if (vars.dev.value) {
        print.time("calculating " + axis + " axis");
      }
      vars[axis].reset = true;
      vars[axis].ticks.values = false;
      if (axis === vars.axes.discrete && vars[axis].value !== vars.time.value) {
        vars[axis].ticks.values = uniques(vars.axes.dataset, vars[axis].value, fetchValue, vars);
      }
      zero = [true, axis].indexOf(opts.zero) > 0 ? true : false;
      range = axisRange(vars, axis, zero);
      if (axis === "y") {
        range = range.reverse();
      }
      vars[axis].scale.viz = getScale(vars, axis, range);
      if (opts.buffer && axis !== vars.axes.discrete) {
        buffer(vars, axis, opts.buffer);
      }
      vars[axis].domain.viz = range;
      if (vars.dev.value) {
        print.timeEnd("calculating " + axis + " axis");
      }
    }
  }
  if (vars.axes.mirror.value) {
    domains = vars.y.domain.viz.concat(vars.x.domain.viz);
    vars.x.domain.viz = d3.extent(domains);
    vars.y.domain.viz = d3.extent(domains).reverse();
  }
};

dataChange = function(vars) {
  var axis, changed, check, i, j, k, l, len, len1, len2, ref, sub, subs;
  changed = vars.time.fixed.value && (vars.time.solo.changed || vars.time.mute.changed);
  if (!changed) {
    changed = vars.id.solo.changed || vars.id.mute.changed;
  }
  if (changed) {
    return changed;
  }
  check = ["data", "time", "id", "depth", "type", "x", "y"];
  for (i = 0, len = check.length; i < len; i++) {
    k = check[i];
    if (vars[k].changed) {
      changed = true;
      break;
    }
  }
  if (changed) {
    return changed;
  }
  subs = ["mute", "range", "scale", "solo", "stacked", "zerofill"];
  ref = ["x", "y"];
  for (j = 0, len1 = ref.length; j < len1; j++) {
    axis = ref[j];
    for (l = 0, len2 = subs.length; l < len2; l++) {
      sub = subs[l];
      if (vars[axis][sub].changed) {
        changed = true;
        break;
      }
    }
  }
  return changed;
};

getData = function(vars) {
  var d, depths;
  if (vars.time.fixed.value) {
    return vars.data.viz;
  } else {
    depths = d3.range(0, vars.id.nesting.length);
    return d3.merge([
      (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = depths.length; i < len; i++) {
          d = depths[i];
          results.push(fetchData(vars, "all", d));
        }
        return results;
      })()
    ]);
  }
};

axisRange = function(vars, axis, zero, buffer) {
  var agg, aggType, allNegative, allPositive, axisSums, counts, d, group, i, j, k, l, len, len1, len2, len3, m, min, oppAxis, ref, ref1, ref2, ref3, sort, sortKey, splitData, v, val, values;
  oppAxis = axis === "x" ? "y" : "x";
  if (vars[axis].range.value && vars[axis].range.value.length === 2) {
    return vars[axis].range.value.slice();
  } else if (vars[axis].scale.value === "share") {
    vars[axis].ticks.values = d3.range(0, 1.1, 0.1);
    return [0, 1];
  } else if (vars[axis].stacked.value) {
    splitData = [];
    ref = vars.axes.dataset;
    for (i = 0, len = ref.length; i < len; i++) {
      d = ref[i];
      if (d.values) {
        splitData = splitData.concat(d.values);
      } else {
        splitData.push(d);
      }
    }
    axisSums = d3.nest().key(function(d) {
      return fetchValue(vars, d, vars[oppAxis].value);
    }).rollup(function(leaves) {
      var negatives, positives;
      positives = d3.sum(leaves, function(d) {
        var val;
        val = fetchValue(vars, d, vars[axis].value);
        if (val > 0) {
          return val;
        } else {
          return 0;
        }
      });
      negatives = d3.sum(leaves, function(d) {
        var val;
        val = fetchValue(vars, d, vars[axis].value);
        if (val < 0) {
          return val;
        } else {
          return 0;
        }
      });
      return [negatives, positives];
    }).entries(splitData);
    values = d3.merge(axisSums.map(function(d) {
      return d.values;
    }));
    return d3.extent(values);
  } else if (vars[axis].value === vars.time.value && vars[axis].ticks.values) {
    return d3.extent(vars[axis].ticks.values);
  } else {
    values = [];
    ref1 = vars.axes.dataset;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      d = ref1[j];
      val = fetchValue(vars, d, vars[axis].value);
      if (val instanceof Array) {
        values = values.concat(val);
      } else {
        values.push(val);
      }
    }
    if (typeof values[0] === "string") {
      if (vars.order.value === true) {
        sortKey = vars[oppAxis].value;
      } else {
        sortKey = vars.order.value;
      }
      if (sortKey) {
        sort = vars.order.sort.value;
        agg = vars.order.agg.value || vars.aggs.value[sortKey] || "max";
        aggType = typeof agg;
        counts = values.reduce(function(obj, val) {
          obj[val] = [];
          return obj;
        }, {});
        ref2 = vars.axes.dataset;
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          d = ref2[l];
          if (d.values) {
            ref3 = d.values;
            for (m = 0, len3 = ref3.length; m < len3; m++) {
              v = ref3[m];
              group = fetchValue(vars, v, vars[axis].value);
              counts[group].push(fetchValue(vars, v, sortKey));
            }
          } else {
            group = fetchValue(vars, d, vars[axis].value);
            counts[group].push(fetchValue(vars, d, sortKey));
          }
        }
        for (k in counts) {
          v = counts[k];
          if (aggType === "string") {
            counts[k] = d3[agg](v);
          } else if (aggType === "function") {
            counts[k] = agg(v, sortKey);
          }
        }
        counts = arraySort(d3.entries(counts), "value", sort);
        counts = counts.reduce(function(arr, v) {
          arr.push(v.key);
          return arr;
        }, []);
        return counts;
      } else {
        return uniques(values);
      }
    } else {
      values.sort(function(a, b) {
        return a - b;
      });
      if (vars[axis].scale.value === "log") {
        if (values[0] === 0) {
          values[0] = 1;
        }
        if (values[values.length - 1] === 0) {
          values[values.length - 1] = -1;
        }
      }
      if (zero) {
        allPositive = values.every(function(v) {
          return v > 0;
        });
        allNegative = values.every(function(v) {
          return v < 0;
        });
        if (allPositive || allNegative) {
          min = allPositive ? 1 : -1;
          values.push(vars[axis].scale.value === "log" ? min : 0);
        }
      }
      return d3.extent(values);
    }
  }
};

getScale = function(vars, axis, range) {
  var rangeArray, rangeMax, scaleType;
  rangeMax = axis === "x" ? vars.width.viz : vars.height.viz;
  scaleType = vars[axis].scale.value;
  if (["discrete", "share"].indexOf(scaleType) >= 0) {
    scaleType = "linear";
  }
  if (typeof range[0] === "string") {
    scaleType = "ordinal";
    rangeArray = buckets([0, rangeMax], range.length);
  } else {
    rangeArray = [0, rangeMax];
  }
  return d3.scale[scaleType]().domain(range).range(rangeArray);
};

sizeScale = function(vars, value) {
  var domain, max, min;
  if (value === true) {
    value = "size";
  }
  if (value in vars) {
    value = vars[value].value;
  }
  min = vars.size.scale.min.value;
  if (typeof min === "function") {
    min = min(vars);
  }
  max = vars.size.scale.max.value;
  if (typeof max === "function") {
    max = max(vars);
  }
  if (value === false) {
    return vars.size.scale.value.rangeRound([max, max]);
  } else if (typeof value === "number") {
    return vars.size.scale.value.rangeRound([value, value]);
  } else if (value) {
    if (vars.dev.value) {
      print.time("calculating buffer scale");
    }
    domain = d3.extent(vars.axes.dataset, function(d) {
      var val;
      val = fetchValue(vars, d, value);
      if (!val) {
        return 0;
      } else {
        return val;
      }
    });
    if (domain[0] === domain[1]) {
      min = max;
    }
    if (vars.dev.value) {
      print.timeEnd("calculating buffer scale");
    }
    return vars.size.scale.value.domain(domain).rangeRound([min, max]);
  }
};



},{"../../../../../array/sort.coffee":37,"../../../../../core/console/print.coffee":54,"../../../../../core/fetch/data.js":66,"../../../../../core/fetch/value.coffee":69,"../../../../../util/buckets.coffee":198,"../../../../../util/uniques.coffee":204,"./buffer.coffee":304}],304:[function(require,module,exports){
var buckets, closest;

buckets = require("../../../../../util/buckets.coffee");

closest = require("../../../../../util/closest.coffee");

module.exports = function(vars, axis, buffer) {
  var additional, allNegative, allPositive, closestTime, diff, difference, domain, domainCompare, domainHigh, domainLow, i, lowerDiff, lowerMod, lowerScale, lowerValue, maxSize, range, rangeMax, timeIndex, upperDiff, upperMod, upperScale, upperValue, zero;
  if (vars[axis].scale.value !== "share" && !vars[axis].range.value) {
    if (axis === vars.axes.discrete) {
      domain = vars[axis].scale.viz.domain();
      if (typeof domain[0] === "string") {
        i = domain.length;
        while (i >= 0) {
          domain.splice(i, 0, "d3plus_buffer_" + i);
          i--;
        }
        range = vars[axis].scale.viz.range();
        range = buckets(d3.extent(range), domain.length);
        return vars[axis].scale.viz.domain(domain).range(range);
      } else {
        if (axis === "y") {
          domain = domain.slice().reverse();
        }
        if (vars[axis].ticks.values.length === 1) {
          if (vars[axis].value === vars.time.value && vars.data.time.ticks.length !== 1) {
            closestTime = closest(vars.data.time.ticks, domain[0]);
            timeIndex = vars.data.time.ticks.indexOf(closestTime);
            if (timeIndex > 0) {
              domain[0] = vars.data.time.ticks[timeIndex - 1];
            } else {
              diff = vars.data.time.ticks[timeIndex + 1] - closestTime;
              domain[0] = new Date(closestTime.getTime() - diff);
            }
            if (timeIndex < vars.data.time.ticks.length - 1) {
              domain[1] = vars.data.time.ticks[timeIndex + 1];
            } else {
              diff = closestTime - vars.data.time.ticks[timeIndex - 1];
              domain[1] = new Date(closestTime.getTime() + diff);
            }
          } else {
            domain[0] -= 1;
            domain[1] += 1;
          }
        } else {
          difference = Math.abs(domain[1] - domain[0]);
          additional = difference / (vars[axis].ticks.values.length - 1);
          additional = additional / 2;
          domain[0] = domain[0] - additional;
          domain[1] = domain[1] + additional;
        }
        if (axis === "y") {
          domain = domain.reverse();
        }
        return vars[axis].scale.viz.domain(domain);
      }
    } else if ((buffer === "x" && axis === "x") || (buffer === "y" && axis === "y") || (buffer === true)) {
      domain = vars[axis].scale.viz.domain();
      allPositive = domain[0] >= 0 && domain[1] >= 0;
      allNegative = domain[0] <= 0 && domain[1] <= 0;
      if (vars[axis].scale.value === "log") {
        zero = allPositive ? 1 : -1;
        if (allPositive && axis === "y") {
          domain = domain.slice().reverse();
        }
        lowerScale = Math.pow(10, parseInt(Math.abs(domain[0])).toString().length - 1) * zero;
        lowerMod = domain[0] % lowerScale;
        lowerDiff = lowerMod;
        if (lowerMod && lowerDiff / lowerScale <= 0.1) {
          lowerDiff += lowerScale * zero;
        }
        lowerValue = lowerMod === 0 ? lowerScale : lowerDiff;
        domain[0] -= lowerValue;
        if (domain[0] === 0) {
          domain[0] = zero;
        }
        upperScale = Math.pow(10, parseInt(Math.abs(domain[1])).toString().length - 1) * zero;
        upperMod = domain[1] % upperScale;
        upperDiff = Math.abs(upperScale - upperMod);
        if (upperMod && upperDiff / upperScale <= 0.1) {
          upperDiff += upperScale * zero;
        }
        upperValue = upperMod === 0 ? upperScale : upperDiff;
        domain[1] += upperValue;
        if (domain[1] === 0) {
          domain[1] = zero;
        }
        if (allPositive && axis === "y") {
          domain = domain.reverse();
        }
      } else {
        zero = 0;
        if (axis === "y") {
          domain = domain.slice().reverse();
        }
        additional = Math.abs(domain[1] - domain[0]) * 0.05 || 1;
        domain[0] = domain[0] - additional;
        domain[1] = domain[1] + additional;
        if ((allPositive && domain[0] < zero) || (allNegative && domain[0] > zero)) {
          domain[0] = zero;
        }
        if ((allPositive && domain[1] < zero) || (allNegative && domain[1] > zero)) {
          domain[1] = zero;
        }
        if (axis === "y") {
          domain = domain.reverse();
        }
      }
      return vars[axis].scale.viz.domain(domain);
    } else if (vars.axes.scale) {
      rangeMax = vars[axis].scale.viz.range()[1];
      maxSize = vars.axes.scale.range()[1];
      domainLow = vars[axis].scale.viz.invert(-maxSize * 1.5);
      domainHigh = vars[axis].scale.viz.invert(rangeMax + maxSize * 1.5);
      domain = [domainLow, domainHigh];
      if (axis === "y") {
        domain = domain.reverse();
      }
      domainCompare = vars[axis].scale.viz.domain();
      domainCompare = domainCompare[1] - domainCompare[0];
      if (!domainCompare) {
        domain[0] -= 1;
        domain[1] += 1;
      }
      if (axis === "y") {
        domain = domain.reverse();
      }
      return vars[axis].scale.viz.domain(domain);
    }
  }
};



},{"../../../../../util/buckets.coffee":198,"../../../../../util/closest.coffee":200}],305:[function(require,module,exports){
var copy, events, fetchColor, fetchValue, legible;

copy = require("../../../../../util/copy.coffee");

events = require("../../../../../client/pointer.coffee");

fetchColor = require("../../../../../core/fetch/color.coffee");

fetchValue = require("../../../../../core/fetch/value.coffee");

legible = require("../../../../../color/legible.coffee");

module.exports = function(node, vars) {
  var clickRemove, color, create, graph, lineData, lineInit, lineStyle, lineUpdate, lines, r, rectStyle, rects, s, textStyle, texts, timing, x, y;
  clickRemove = d3.event.type === events.click && (vars.tooltip.value.long || vars.tooltip.html.value);
  create = [events.over, events.move].indexOf(d3.event.type) >= 0;
  x = node.d3plus.x;
  y = node.d3plus.y;
  r = node.d3plus.r || 0;
  s = vars.types[vars.type.value].scale || 1;
  r = r * s;
  graph = vars.axes;
  timing = vars.draw.timing ? vars.timing.mouseevents : 0;
  if (!clickRemove && create) {
    color = legible(fetchColor(vars, node));
    lineData = ["x", "y"].filter(function(axis) {
      var val;
      val = fetchValue(vars, node, vars[axis].value);
      return !(val instanceof Array) && axis !== vars.axes.stacked && vars[axis].mouse.value && axis !== vars.axes.discrete;
    });
  } else {
    lineData = [];
  }
  lineInit = function(line) {
    return line.attr("x1", function(d) {
      if (d === "x") {
        return x;
      } else {
        return x - r;
      }
    }).attr("y1", function(d) {
      if (d === "y") {
        return y;
      } else {
        return y + r;
      }
    }).attr("x2", function(d) {
      if (d === "x") {
        return x;
      } else {
        return x - r;
      }
    }).attr("y2", function(d) {
      if (d === "y") {
        return y;
      } else {
        return y + r;
      }
    }).attr("opacity", 0);
  };
  lineStyle = function(line) {
    return line.style("stroke", function(d) {
      if (vars.shape.value === "area") {
        return "white";
      } else {
        return color;
      }
    }).attr("stroke-dasharray", function(d) {
      return vars[d].mouse.dasharray.value;
    }).attr("shape-rendering", function(d) {
      return vars[d].mouse.rendering.value;
    }).style("stroke-width", function(d) {
      return vars[d].mouse.width;
    });
  };
  lineUpdate = function(line) {
    return line.attr("x1", function(d) {
      if (d === "x") {
        return x;
      } else {
        return x - r;
      }
    }).attr("y1", function(d) {
      if (d === "y") {
        return y;
      } else {
        return y + r;
      }
    }).attr("x2", function(d) {
      if (d === "x") {
        return x;
      } else {
        return node.d3plus.x0 || graph.margin.left - vars[d].ticks.size;
      }
    }).attr("y2", function(d) {
      if (d === "y") {
        return y;
      } else {
        return node.d3plus.y0 || graph.height + graph.margin.top + vars[d].ticks.size;
      }
    }).style("opacity", 1);
  };
  lines = vars.g.labels.selectAll("line.d3plus_mouse_axis_label").data(lineData);
  if (timing) {
    lines.enter().append("line").attr("class", "d3plus_mouse_axis_label").attr("pointer-events", "none").call(lineInit).call(lineStyle);
    lines.transition().duration(timing).call(lineUpdate).call(lineStyle);
    lines.exit().transition().duration(timing).call(lineInit).remove();
  } else {
    lines.call(lineUpdate).call(lineStyle);
    lines.enter().append("line").attr("class", "d3plus_mouse_axis_label").attr("pointer-events", "none").call(lineInit).call(lineStyle);
    lines.exit().remove();
  }
  textStyle = function(text) {
    return text.attr("font-size", function(d) {
      return vars[d].ticks.font.size + "px";
    }).attr("fill", function(d) {
      return vars[d].ticks.font.color;
    }).attr("font-family", function(d) {
      return vars[d].ticks.font.family.value;
    }).attr("font-weight", function(d) {
      return vars[d].ticks.font.weight;
    }).attr("x", function(d) {
      if (d === "x") {
        return x;
      } else {
        return graph.margin.left - 5 - vars[d].ticks.size;
      }
    }).attr("y", function(d) {
      if (d === "y") {
        return y;
      } else {
        if (node.d3plus.y0) {
          return node.d3plus.y + (node.d3plus.y0 - node.d3plus.y) / 2 + graph.margin.top - 6;
        } else {
          return graph.height + graph.margin.top + 5 + vars[d].ticks.size;
        }
      }
    }).attr("fill", vars.shape.value === "area" ? "white" : color);
  };
  texts = vars.g.labels.selectAll("text.d3plus_mouse_axis_label").data(lineData);
  texts.enter().append("text").attr("class", "d3plus_mouse_axis_label").attr("id", function(d) {
    return d + "_d3plusmouseaxislabel";
  }).attr("dy", function(d) {
    if (d === "y") {
      return vars[d].ticks.font.size * 0.35;
    } else {
      return vars[d].ticks.font.size;
    }
  }).style("text-anchor", function(d) {
    if (d === "y") {
      return "end";
    } else {
      return "middle";
    }
  }).attr("opacity", 0).attr("pointer-events", "none").call(textStyle);
  texts.text(function(d) {
    var axis, val;
    axis = vars.axes.stacked || d;
    val = fetchValue(vars, node, vars[axis].value);
    return vars.format.value(val, {
      key: vars[axis].value,
      vars: vars
    });
  });
  if (timing) {
    texts.transition().duration(timing).delay(timing).attr("opacity", 1).call(textStyle);
    texts.exit().transition().duration(timing).attr("opacity", 0).remove();
  } else {
    texts.attr("opacity", 1).call(textStyle);
    texts.exit().remove();
  }
  rectStyle = function(rect) {
    var getText;
    getText = function(axis) {
      return d3.select("text#" + axis + "_d3plusmouseaxislabel").node().getBBox();
    };
    return rect.attr("x", function(d) {
      var width;
      width = getText(d).width;
      if (d === "x") {
        return x - width / 2 - 5;
      } else {
        return graph.margin.left - vars[d].ticks.size - width - 10;
      }
    }).attr("y", function(d) {
      var mod;
      mod = getText(d).height / 2 + 5;
      if (d === "y") {
        return y - mod;
      } else {
        if (node.d3plus.y0) {
          return node.d3plus.y + (node.d3plus.y0 - node.d3plus.y) / 2 + graph.margin.top - mod;
        } else {
          return graph.height + graph.margin.top + vars[d].ticks.size;
        }
      }
    }).attr("width", function(d) {
      return getText(d).width + 10;
    }).attr("height", function(d) {
      return getText(d).height + 10;
    }).style("stroke", vars.shape.value === "area" ? "transparent" : color).attr("fill", vars.shape.value === "area" ? color : vars.background.value).attr("shape-rendering", function(d) {
      return vars[d].mouse.rendering.value;
    }).style("stroke-width", function(d) {
      return vars[d].mouse.width;
    });
  };
  rects = vars.g.labels.selectAll("rect.d3plus_mouse_axis_label").data(lineData);
  if (timing) {
    rects.enter().insert("rect", "text.d3plus_mouse_axis_label").attr("class", "d3plus_mouse_axis_label").attr("pointer-events", "none").attr("opacity", 0).call(rectStyle);
    rects.transition().duration(timing).delay(timing).attr("opacity", 1).call(rectStyle);
    return rects.exit().transition().duration(timing).attr("opacity", 0).remove();
  } else {
    rects.attr("opacity", 1).call(rectStyle);
    rects.enter().insert("rect", "text.d3plus_mouse_axis_label").attr("class", "d3plus_mouse_axis_label").attr("pointer-events", "none").call(rectStyle);
    return rects.exit().remove();
  }
};



},{"../../../../../client/pointer.coffee":41,"../../../../../color/legible.coffee":46,"../../../../../core/fetch/color.coffee":65,"../../../../../core/fetch/value.coffee":69,"../../../../../util/copy.coffee":201}],306:[function(require,module,exports){
var buckets, buffer, createAxis, fetchValue, fontSizes, formatPower, labelPadding, resetMargins, superscript, textwrap, timeDetect, uniques;

buckets = require("../../../../../util/buckets.coffee");

buffer = require("./buffer.coffee");

fetchValue = require("../../../../../core/fetch/value.coffee");

fontSizes = require("../../../../../font/sizes.coffee");

textwrap = require("../../../../../textwrap/textwrap.coffee");

timeDetect = require("../../../../../core/data/time.coffee");

uniques = require("../../../../../util/uniques.coffee");

module.exports = function(vars, opts) {
  var axis, axisStyle, extent, j, k, len, len1, newtick, opp, ref, ref1, step, tens, tick, ticks, timeReturn, values;
  vars.axes.margin = resetMargins(vars);
  vars.axes.height = vars.height.viz;
  vars.axes.width = vars.width.viz;
  ref = ["x", "y"];
  for (j = 0, len = ref.length; j < len; j++) {
    axis = ref[j];
    if (vars[axis].ticks.values === false) {
      if (vars[axis].value === vars.time.value) {
        ticks = vars.time.solo.value;
        if (ticks.length) {
          ticks = ticks.map(function(d) {
            if (d.constructor !== Date) {
              d = new Date(d.toString());
              d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
            }
            return d;
          });
        } else {
          ticks = vars.data.time.values;
        }
        extent = d3.extent(ticks);
        step = vars.data.time.stepType;
        ticks = [extent[0]];
        tick = extent[0];
        while (tick < extent[1]) {
          newtick = new Date(tick);
          tick = new Date(newtick["set" + step](newtick["get" + step]() + 1));
          ticks.push(tick);
        }
        vars[axis].ticks.values = ticks;
      } else {
        vars[axis].ticks.values = vars[axis].scale.viz.ticks();
      }
    }
    if (!vars[axis].ticks.values.length) {
      values = fetchValue(vars, vars.data.viz, vars[axis].value);
      if (!(values instanceof Array)) {
        values = [values];
      }
      vars[axis].ticks.values = values;
    }
    opp = axis === "x" ? "y" : "x";
    if (vars[axis].ticks.values.length === 1 || (opts.buffer && opts.buffer !== opp && axis === vars.axes.discrete && vars[axis].reset === true)) {
      buffer(vars, axis, opts.buffer);
    }
    vars[axis].reset = false;
    if (vars[axis].value === vars.time.value) {
      axisStyle = {
        "font-family": vars[axis].ticks.font.family.value,
        "font-weight": vars[axis].ticks.font.weight,
        "font-size": vars[axis].ticks.font.size + "px"
      };
      timeReturn = timeDetect(vars, {
        values: vars[axis].ticks.values,
        limit: vars.width.viz,
        style: axisStyle
      });
      vars[axis].ticks.visible = timeReturn.values.map(Number);
      vars[axis].ticks.format = timeReturn.format;
    } else if (vars[axis].scale.value === "log") {
      ticks = vars[axis].ticks.values;
      tens = ticks.filter(function(t) {
        return Math.abs(t).toString().charAt(0) === "1";
      });
      if (tens.length < 3) {
        vars[axis].ticks.visible = ticks;
      } else {
        vars[axis].ticks.visible = tens;
      }
    } else {
      vars[axis].ticks.visible = vars[axis].ticks.values;
    }
  }
  if (!vars.small) {
    labelPadding(vars);
  }
  ref1 = ["x", "y"];
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    axis = ref1[k];
    vars[axis].axis.svg = createAxis(vars, axis);
  }
};

resetMargins = function(vars) {
  if (vars.small) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  } else {
    return {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
  }
};

labelPadding = function(vars) {
  var lastTick, rightLabel, rightMod, xAttrs, xAxisHeight, xAxisWidth, xDomain, xLabel, xLabelAttrs, xMaxWidth, xSizes, xText, xValues, yAttrs, yAxisWidth, yDomain, yLabel, yLabelAttrs, yText, yValues;
  xDomain = vars.x.scale.viz.domain();
  yDomain = vars.y.scale.viz.domain();
  yAttrs = {
    "font-size": vars.y.ticks.font.size + "px",
    "font-family": vars.y.ticks.font.family.value,
    "font-weight": vars.y.ticks.font.weight
  };
  yValues = vars.y.ticks.visible;
  if (vars.y.scale.value === "log") {
    yText = yValues.map(function(d) {
      return formatPower(d);
    });
  } else if (vars.y.scale.value === "share") {
    yText = yValues.map(function(d) {
      return vars.format.value(d * 100, {
        key: "share",
        vars: vars
      });
    });
  } else if (vars.y.value === vars.time.value) {
    yText = yValues.map(function(d, i) {
      return vars.y.ticks.format(new Date(d));
    });
  } else {
    if (typeof yValues[0] === "string") {
      yValues = vars.y.scale.viz.domain().filter(function(d) {
        return d.indexOf("d3plus_buffer_") !== 0;
      });
    }
    yText = yValues.map(function(d) {
      return vars.format.value(d, {
        key: vars.y.value,
        vars: vars,
        labels: vars.y.affixes.value
      });
    });
  }
  yAxisWidth = d3.max(fontSizes(yText, yAttrs), function(d) {
    return d.width;
  });
  yAxisWidth = Math.ceil(yAxisWidth + vars.labels.padding);
  vars.axes.margin.left += yAxisWidth;
  yLabel = vars.y.label.fetch(vars);
  if (yLabel) {
    yLabelAttrs = {
      "font-family": vars.y.label.font.family.value,
      "font-weight": vars.y.label.font.weight,
      "font-size": vars.y.label.font.size + "px"
    };
    vars.y.label.height = fontSizes([yLabel], yLabelAttrs)[0].height;
  } else {
    vars.y.label.height = 0;
  }
  if (vars.y.label.value) {
    vars.axes.margin.left += vars.y.label.height;
    vars.axes.margin.left += vars.y.label.padding * 2;
  }
  vars.axes.width -= vars.axes.margin.left + vars.axes.margin.right;
  vars.x.scale.viz.range(buckets([0, vars.axes.width], xDomain.length));
  xAttrs = {
    "font-size": vars.x.ticks.font.size + "px",
    "font-family": vars.x.ticks.font.family.value,
    "font-weight": vars.x.ticks.font.weight
  };
  xValues = vars.x.ticks.visible;
  if (vars.x.scale.value === "log") {
    xText = xValues.map(function(d) {
      return formatPower(d);
    });
  } else if (vars.x.scale.value === "share") {
    xText = xValues.map(function(d) {
      return vars.format.value(d * 100, {
        key: "share",
        vars: vars
      });
    });
  } else if (vars.x.value === vars.time.value) {
    xText = xValues.map(function(d, i) {
      return vars.x.ticks.format(new Date(d));
    });
  } else {
    if (typeof xValues[0] === "string") {
      xValues = vars.x.scale.viz.domain().filter(function(d) {
        return d.indexOf("d3plus_buffer_") !== 0;
      });
    }
    xText = xValues.map(function(d) {
      return vars.format.value(d, {
        key: vars.x.value,
        vars: vars,
        labels: vars.x.affixes.value
      });
    });
  }
  xSizes = fontSizes(xText, xAttrs);
  xAxisWidth = d3.max(xSizes, function(d) {
    return d.width;
  });
  xAxisHeight = d3.max(xSizes, function(d) {
    return d.height;
  });
  if (xValues.length === 1) {
    xMaxWidth = vars.axes.width;
  } else {
    xMaxWidth = vars.x.scale.viz(xValues[1]) - vars.x.scale.viz(xValues[0]);
    xMaxWidth = Math.abs(xMaxWidth);
    xMaxWidth -= vars.labels.padding * 2;
  }
  if (xAxisWidth > xMaxWidth && xText.join("").indexOf(" ") > 0) {
    vars.x.ticks.wrap = true;
    xSizes = fontSizes(xText, xAttrs, {
      mod: function(elem) {
        return textwrap().container(d3.select(elem)).height(vars.axes.height / 2).width(xMaxWidth).draw();
      }
    });
    xAxisWidth = d3.max(xSizes, function(d) {
      return d.width;
    });
    xAxisHeight = d3.max(xSizes, function(d) {
      return d.height;
    });
  } else {
    vars.x.ticks.wrap = false;
  }
  vars.x.ticks.hidden = false;
  vars.x.ticks.baseline = "auto";
  if (xAxisWidth <= xMaxWidth) {
    vars.x.ticks.rotate = 0;
  } else if (xAxisWidth < vars.axes.height / 2) {
    xSizes = fontSizes(xText, xAttrs, {
      mod: function(elem) {
        return textwrap().container(d3.select(elem)).width(vars.axes.height / 2).height(xMaxWidth).draw();
      }
    });
    xAxisHeight = d3.max(xSizes, function(d) {
      return d.width;
    });
    xAxisWidth = d3.max(xSizes, function(d) {
      return d.height;
    });
    vars.x.ticks.rotate = -90;
  } else {
    vars.x.ticks.hidden = true;
    vars.x.ticks.rotate = 0;
    xAxisWidth = 0;
    xAxisHeight = 0;
  }
  xAxisHeight = Math.ceil(xAxisHeight);
  xAxisWidth = Math.ceil(xAxisWidth);
  vars.x.ticks.maxHeight = xAxisHeight;
  vars.x.ticks.maxWidth = xAxisWidth;
  vars.axes.margin.bottom += xAxisHeight + vars.labels.padding;
  lastTick = vars.x.ticks.visible[vars.x.ticks.visible.length - 1];
  rightLabel = vars.x.scale.viz(lastTick);
  rightLabel += xAxisWidth / 2 + vars.axes.margin.left;
  if (rightLabel > vars.width.value) {
    rightMod = rightLabel - vars.width.value + vars.axes.margin.right;
    vars.axes.width -= rightMod;
    vars.axes.margin.right += rightMod;
  }
  xLabel = vars.x.label.fetch(vars);
  if (xLabel) {
    xLabelAttrs = {
      "font-family": vars.x.label.font.family.value,
      "font-weight": vars.x.label.font.weight,
      "font-size": vars.x.label.font.size + "px"
    };
    vars.x.label.height = fontSizes([xLabel], xLabelAttrs)[0].height;
  } else {
    vars.x.label.height = 0;
  }
  if (vars.x.label.value) {
    vars.axes.margin.bottom += vars.x.label.height;
    vars.axes.margin.bottom += vars.x.label.padding * 2;
  }
  vars.axes.height -= vars.axes.margin.top + vars.axes.margin.bottom;
  vars.x.scale.viz.range(buckets([0, vars.axes.width], xDomain.length));
  return vars.y.scale.viz.range(buckets([0, vars.axes.height], yDomain.length));
};

createAxis = function(vars, axis) {
  return d3.svg.axis().tickSize(vars[axis].ticks.size).tickPadding(5).orient(axis === "x" ? "bottom" : "left").scale(vars[axis].scale.viz).tickValues(vars[axis].ticks.values).tickFormat(function(d, i) {
    var c, scale;
    if (vars[axis].ticks.hidden) {
      return null;
    }
    scale = vars[axis].scale.value;
    c = d.constructor === Date ? +d : d;
    if (vars[axis].ticks.visible.indexOf(c) >= 0) {
      if (scale === "share") {
        return vars.format.value(d * 100, {
          key: "share",
          vars: vars,
          labels: vars[axis].affixes.value
        });
      } else if (d.constructor === Date) {
        return vars[axis].ticks.format(d);
      } else if (scale === "log") {
        return formatPower(d);
      } else {
        return vars.format.value(d, {
          key: vars[axis].value,
          vars: vars,
          labels: vars[axis].affixes.value
        });
      }
    } else {
      return null;
    }
  });
};

superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹";

formatPower = function(d) {
  var n, p, t;
  p = Math.round(Math.log(Math.abs(d)) / Math.LN10);
  t = Math.abs(d).toString().charAt(0);
  n = 10 + " " + (p + "").split("").map(function(c) {
    return superscript[c];
  }).join("");
  if (t !== "1") {
    n = t + " x " + n;
  }
  if (d < 0) {
    return "-" + n;
  } else {
    return n;
  }
};



},{"../../../../../core/data/time.coffee":64,"../../../../../core/fetch/value.coffee":69,"../../../../../font/sizes.coffee":97,"../../../../../textwrap/textwrap.coffee":194,"../../../../../util/buckets.coffee":198,"../../../../../util/uniques.coffee":204,"./buffer.coffee":304}],307:[function(require,module,exports){
var mix, textwrap, validObject;

mix = require("../../../../../color/mix.coffee");

textwrap = require("../../../../../textwrap/textwrap.coffee");

validObject = require("../../../../../object/validate.coffee");

module.exports = function(vars) {
  var affixes, alignMap, axis, axisData, axisLabel, bg, bgStyle, d, domain, domains, getFontStyle, grid, gridData, j, k, l, label, labelData, labelStyle, len, len1, len2, line, lineData, lineFont, lineGroup, lineRects, lineStyle, lines, linetexts, mirror, plane, planeTrans, position, rectData, rectStyle, ref, ref1, rotated, sep, textData, textPad, textPos, tickFont, tickPosition, tickStyle, userLines, xAxis, xEnter, xStyle, yAxis, yEnter, yStyle;
  domains = vars.x.domain.viz.concat(vars.y.domain.viz);
  if (domains.indexOf(void 0) >= 0) {
    return null;
  }
  bgStyle = {
    width: vars.axes.width,
    height: vars.axes.height,
    fill: vars.axes.background.color,
    stroke: vars.axes.background.stroke.color,
    "stroke-width": vars.axes.background.stroke.width,
    "shape-rendering": vars.axes.background.rendering.value
  };
  alignMap = {
    left: "start",
    center: "middle",
    right: "end"
  };
  axisData = vars.small ? [] : [0];
  tickPosition = function(tick, axis) {
    return tick.attr("x1", function(d) {
      if (axis === "x") {
        return vars.x.scale.viz(d);
      } else {
        return 0;
      }
    }).attr("x2", function(d) {
      if (axis === "x") {
        return vars.x.scale.viz(d);
      } else {
        return vars.axes.width;
      }
    }).attr("y1", function(d) {
      if (axis === "y") {
        return vars.y.scale.viz(d);
      } else {
        return 0;
      }
    }).attr("y2", function(d) {
      if (axis === "y") {
        return vars.y.scale.viz(d);
      } else {
        return vars.axes.height;
      }
    });
  };
  tickStyle = function(tick, axis, grid) {
    var color, log;
    color = grid ? vars[axis].grid.color : vars[axis].ticks.color;
    log = vars[axis].scale.value === "log";
    return tick.attr("stroke", function(d) {
      var visible;
      if (d === 0) {
        return vars[axis].axis.color;
      }
      if (d.constructor === Date) {
        d = +d;
      }
      visible = vars[axis].ticks.visible.indexOf(d) >= 0;
      if (visible && (!log || Math.abs(d).toString().charAt(0) === "1")) {
        return color;
      } else if (grid) {
        return mix(color, vars.axes.background.color, 0.4, 1);
      } else {
        return mix(color, vars.background.value, 0.4, 1);
      }
    }).attr("stroke-width", vars[axis].ticks.width).attr("shape-rendering", vars[axis].ticks.rendering.value);
  };
  getFontStyle = function(axis, val, style) {
    var type;
    type = val === 0 ? "axis" : "ticks";
    val = vars[axis][type].font[style];
    if (val && (val.length || typeof val === "number")) {
      return val;
    } else {
      return vars[axis].ticks.font[style];
    }
  };
  tickFont = function(tick, axis) {
    var log;
    log = vars[axis].scale.value === "log";
    return tick.attr("font-size", function(d) {
      return getFontStyle(axis, d, "size") + "px";
    }).attr("fill", function(d) {
      var color;
      color = getFontStyle(axis, d, "color");
      if (!log || Math.abs(d).toString().charAt(0) === "1") {
        return color;
      } else {
        return mix(color, vars.background.value, 0.4, 1);
      }
    }).attr("font-family", function(d) {
      return getFontStyle(axis, d, "family").value;
    }).attr("font-weight", function(d) {
      return getFontStyle(axis, d, "weight");
    });
  };
  lineStyle = function(line, axis) {
    var max, opp;
    max = axis === "x" ? "height" : "width";
    opp = axis === "x" ? "y" : "x";
    return line.attr(opp + "1", 0).attr(opp + "2", vars.axes[max]).attr(axis + "1", function(d) {
      return d.coords.line;
    }).attr(axis + "2", function(d) {
      return d.coords.line;
    }).attr("stroke", function(d) {
      return d.color || vars[axis].lines.color;
    }).attr("stroke-width", vars[axis].lines.width).attr("shape-rendering", vars[axis].lines.rendering.value).attr("stroke-dasharray", vars[axis].lines.dasharray.value);
  };
  lineFont = function(text, axis) {
    var opp;
    opp = axis === "x" ? "y" : "x";
    return text.attr(opp, function(d) {
      return d.coords.text[opp] + "px";
    }).attr(axis, function(d) {
      return d.coords.text[axis] + "px";
    }).attr("dy", vars[axis].lines.font.position.value).attr("text-anchor", alignMap[vars[axis].lines.font.align.value]).attr("transform", function(d) {
      return d.transform;
    }).attr("font-size", vars[axis].lines.font.size + "px").attr("fill", function(d) {
      return d.color || vars[axis].lines.color;
    }).attr("font-family", vars[axis].lines.font.family.value).attr("font-weight", vars[axis].lines.font.weight);
  };
  planeTrans = "translate(" + vars.axes.margin.left + "," + vars.axes.margin.top + ")";
  plane = vars.group.selectAll("g#d3plus_graph_plane").data([0]);
  plane.transition().duration(vars.draw.timing).attr("transform", planeTrans);
  plane.enter().append("g").attr("id", "d3plus_graph_plane").attr("transform", planeTrans);
  bg = plane.selectAll("rect#d3plus_graph_background").data([0]);
  bg.transition().duration(vars.draw.timing).attr(bgStyle);
  bg.enter().append("rect").attr("id", "d3plus_graph_background").attr("x", 0).attr("y", 0).attr(bgStyle);
  mirror = plane.selectAll("path#d3plus_graph_mirror").data([0]);
  mirror.enter().append("path").attr("id", "d3plus_graph_mirror").attr("fill", "#000").attr("fill-opacity", 0.03).attr("stroke-width", 1).attr("stroke", "#ccc").attr("stroke-dasharray", "10,10").attr("opacity", 0);
  mirror.transition().duration(vars.draw.timing).attr("opacity", function() {
    if (vars.axes.mirror.value) {
      return 1;
    } else {
      return 0;
    }
  }).attr("d", function() {
    var h, w;
    w = bgStyle.width;
    h = bgStyle.height;
    return "M " + w + " " + h + " L 0 " + h + " L " + w + " 0 Z";
  });
  rotated = vars.x.ticks.rotate !== 0;
  xStyle = function(axis) {
    var groups;
    groups = axis.attr("transform", "translate(0," + vars.axes.height + ")").call(vars.x.axis.svg.scale(vars.x.scale.viz)).selectAll("g.tick");
    groups.selectAll("line").attr("y2", function(d) {
      var y2;
      if (d.constructor === Date) {
        d = +d;
      }
      y2 = d3.select(this).attr("y2");
      if (vars.x.ticks.visible.indexOf(d) >= 0) {
        return y2;
      } else {
        return y2 / 2;
      }
    });
    return groups.select("text").attr("dy", "").style("text-anchor", rotated ? "end" : "middle").call(tickFont, "x").each("end", function(d) {
      if (d.constructor === Date) {
        d = +d;
      }
      if (!vars.x.ticks.hidden && vars.x.ticks.visible.indexOf(d) >= 0) {
        return textwrap().container(d3.select(this)).rotate(vars.x.ticks.rotate).valign(rotated ? "middle" : "top").width(vars.x.ticks.maxWidth).height(vars.x.ticks.maxHeight).padding(0).x(-vars.x.ticks.maxWidth / 2).draw();
      }
    });
  };
  xAxis = plane.selectAll("g#d3plus_graph_xticks").data(axisData);
  xAxis.transition().duration(vars.draw.timing).call(xStyle);
  xAxis.selectAll("line").transition().duration(vars.draw.timing).call(tickStyle, "x");
  xEnter = xAxis.enter().append("g").attr("id", "d3plus_graph_xticks").transition().duration(0).call(xStyle);
  xEnter.selectAll("path").attr("fill", "none");
  xEnter.selectAll("line").call(tickStyle, "x");
  xAxis.exit().transition().duration(vars.data.timing).attr("opacity", 0).remove();
  yStyle = function(axis) {
    var groups;
    groups = axis.call(vars.y.axis.svg.scale(vars.y.scale.viz)).selectAll("g.tick");
    groups.selectAll("line").attr("y2", function(d) {
      var y2;
      if (d.constructor === Date) {
        d = +d;
      }
      y2 = d3.select(this).attr("y2");
      if (vars.x.ticks.visible.indexOf(d) >= 0) {
        return y2;
      } else {
        return y2 / 2;
      }
    });
    return groups.select("text").call(tickFont, "y");
  };
  yAxis = plane.selectAll("g#d3plus_graph_yticks").data(axisData);
  yAxis.transition().duration(vars.draw.timing).call(yStyle);
  yAxis.selectAll("line").transition().duration(vars.draw.timing).call(tickStyle, "y");
  yEnter = yAxis.enter().append("g").attr("id", "d3plus_graph_yticks").call(yStyle);
  yEnter.selectAll("path").attr("fill", "none");
  yEnter.selectAll("line").call(tickStyle, "y");
  yAxis.exit().transition().duration(vars.data.timing).attr("opacity", 0).remove();
  labelStyle = function(label, axis) {
    return label.attr("x", axis === "x" ? vars.width.viz / 2 : -(vars.axes.height / 2 + vars.axes.margin.top)).attr("y", axis === "x" ? vars.height.viz - vars[axis].label.height / 2 - vars[axis].label.padding : vars[axis].label.height / 2 + vars[axis].label.padding).attr("transform", axis === "y" ? "rotate(-90)" : null).attr("font-family", vars[axis].label.font.family.value).attr("font-weight", vars[axis].label.font.weight).attr("font-size", vars[axis].label.font.size + "px").attr("fill", vars[axis].label.font.color).style("text-anchor", "middle").attr("dominant-baseline", "central");
  };
  ref = ["x", "y"];
  for (j = 0, len = ref.length; j < len; j++) {
    axis = ref[j];
    if (vars[axis].grid.value) {
      gridData = vars[axis].ticks.values;
    } else {
      gridData = [];
      if (vars[axis].ticks.values.indexOf(0) >= 0 && vars[axis].axis.value) {
        gridData = [0];
      }
    }
    grid = plane.selectAll("g#d3plus_graph_" + axis + "grid").data([0]);
    grid.enter().append("g").attr("id", "d3plus_graph_" + axis + "grid");
    lines = grid.selectAll("line").data(gridData, function(d, i) {
      if (d.constructor === Date) {
        return d.getTime();
      } else {
        return d;
      }
    });
    lines.transition().duration(vars.draw.timing).call(tickPosition, axis).call(tickStyle, axis, true);
    lines.enter().append("line").style("opacity", 0).call(tickPosition, axis).call(tickStyle, axis, true).transition().duration(vars.draw.timing).delay(vars.draw.timing / 2).style("opacity", 1);
    lines.exit().transition().duration(vars.draw.timing / 2).style("opacity", 0).remove();
    axisLabel = vars[axis].label.fetch(vars);
    labelData = axisData && axisLabel ? [0] : [];
    affixes = vars.format.affixes.value[vars[axis].value];
    if (axisLabel && !vars[axis].affixes.value && affixes) {
      sep = vars[axis].affixes.separator.value;
      if (sep === true) {
        sep = ["[", "]"];
      } else if (sep === false) {
        sep = ["", ""];
      }
      axisLabel += " " + sep[0] + affixes[0] + " " + affixes[1] + sep[1];
    }
    label = vars.group.selectAll("text#d3plus_graph_" + axis + "label").data(labelData);
    label.text(axisLabel).transition().duration(vars.draw.timing).call(labelStyle, axis);
    label.enter().append("text").attr("id", "d3plus_graph_" + axis + "label").text(axisLabel).call(labelStyle, axis);
    label.exit().transition().duration(vars.data.timing).attr("opacity", 0).remove();
  }
  ref1 = ["x", "y"];
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    axis = ref1[k];
    lineGroup = plane.selectAll("g#d3plus_graph_" + axis + "_userlines").data([0]);
    lineGroup.enter().append("g").attr("id", "d3plus_graph_" + axis + "_userlines");
    domain = vars[axis].scale.viz.domain();
    if (axis === "y") {
      domain = domain.slice().reverse();
    }
    textData = [];
    lineData = [];
    userLines = vars[axis].lines.value || [];
    for (l = 0, len2 = userLines.length; l < len2; l++) {
      line = userLines[l];
      d = validObject(line) ? line.position : line;
      if (!isNaN(d)) {
        d = parseFloat(d);
        if (d > domain[0] && d < domain[1]) {
          d = !validObject(line) ? {
            "position": d
          } : line;
          d.coords = {
            line: vars[axis].scale.viz(d.position)
          };
          lineData.push(d);
          if (d.text) {
            d.axis = axis;
            d.padding = vars[axis].lines.font.padding.value * 0.5;
            d.align = vars[axis].lines.font.align.value;
            position = vars[axis].lines.font.position.text;
            textPad = position === "middle" ? 0 : d.padding * 2;
            if (position === "top") {
              textPad = -textPad;
            }
            if (axis === "x") {
              textPos = d.align === "left" ? vars.axes.height : d.align === "center" ? vars.axes.height / 2 : 0;
              if (d.align === "left") {
                textPos -= d.padding * 2;
              }
              if (d.align === "right") {
                textPos += d.padding * 2;
              }
            } else {
              textPos = d.align === "left" ? 0 : d.align === "center" ? vars.axes.width / 2 : vars.axes.width;
              if (d.align === "right") {
                textPos -= d.padding * 2;
              }
              if (d.align === "left") {
                textPos += d.padding * 2;
              }
            }
            d.coords.text = {};
            d.coords.text[axis === "x" ? "y" : "x"] = textPos;
            d.coords.text[axis] = vars[axis].scale.viz(d.position) + textPad;
            d.transform = axis === "x" ? "rotate(-90," + d.coords.text.x + "," + d.coords.text.y + ")" : null;
            textData.push(d);
          }
        }
      }
    }
    lines = lineGroup.selectAll("line.d3plus_graph_" + axis + "line").data(lineData, function(d) {
      return d.position;
    });
    lines.enter().append("line").attr("class", "d3plus_graph_" + axis + "line").attr("opacity", 0).call(lineStyle, axis);
    lines.transition().duration(vars.draw.timing).attr("opacity", 1).call(lineStyle, axis);
    lines.exit().transition().duration(vars.draw.timing).attr("opacity", 0).remove();
    linetexts = lineGroup.selectAll("text.d3plus_graph_" + axis + "line_text").data(textData, function(d) {
      return d.position;
    });
    linetexts.enter().append("text").attr("class", "d3plus_graph_" + axis + "line_text").attr("id", function(d) {
      var id;
      id = d.position + "";
      id = id.replace("-", "neg");
      id = id.replace(".", "p");
      return "d3plus_graph_" + axis + "line_text_" + id;
    }).attr("opacity", 0).call(lineFont, axis);
    linetexts.text(function(d) {
      return d.text;
    }).transition().duration(vars.draw.timing).attr("opacity", 1).call(lineFont, axis);
    linetexts.exit().transition().duration(vars.draw.timing).attr("opacity", 0).remove();
    rectStyle = function(rect) {
      var getText;
      getText = function(d) {
        var id;
        id = d.position + "";
        id = id.replace("-", "neg");
        id = id.replace(".", "p");
        return plane.select("text#d3plus_graph_" + d.axis + "line_text_" + id).node().getBBox();
      };
      return rect.attr("x", function(d) {
        return getText(d).x - d.padding;
      }).attr("y", function(d) {
        return getText(d).y - d.padding;
      }).attr("transform", function(d) {
        return d.transform;
      }).attr("width", function(d) {
        return getText(d).width + (d.padding * 2);
      }).attr("height", function(d) {
        return getText(d).height + (d.padding * 2);
      }).attr("fill", vars.axes.background.color);
    };
    rectData = vars[axis].lines.font.background.value ? textData : [];
    lineRects = lineGroup.selectAll("rect.d3plus_graph_" + axis + "line_rect").data(rectData, function(d) {
      return d.position;
    });
    lineRects.enter().insert("rect", "text.d3plus_graph_" + axis + "line_text").attr("class", "d3plus_graph_" + axis + "line_rect").attr("pointer-events", "none").attr("opacity", 0).call(rectStyle);
    lineRects.transition().delay(vars.draw.timing).each("end", function(d) {
      return d3.select(this).transition().duration(vars.draw.timing).attr("opacity", 1).call(rectStyle);
    });
    lineRects.exit().transition().duration(vars.draw.timing).attr("opacity", 0).remove();
  }
};



},{"../../../../../color/mix.coffee":48,"../../../../../object/validate.coffee":166,"../../../../../textwrap/textwrap.coffee":194}],308:[function(require,module,exports){
var fetchValue, stringStrip, uniqueValues;

fetchValue = require("../../../../core/fetch/value.coffee");

stringStrip = require("../../../../string/strip.js");

uniqueValues = require("../../../../util/uniques.coffee");

module.exports = function(vars, data) {
  var discrete, opposite, serialized, ticks, timeAxis;
  if (!data) {
    data = vars.data.viz;
  }
  discrete = vars[vars.axes.discrete];
  opposite = vars[vars.axes.opposite];
  timeAxis = discrete.value === vars.time.value;
  if (timeAxis) {
    ticks = vars.data.time.ticks;
    if (vars.time.solo.value.length) {
      serialized = vars.time.solo.value.map(Number);
      ticks = ticks.filter(function(f) {
        return serialized.indexOf(+f) >= 0;
      });
    } else if (vars.time.mute.value.length) {
      serialized = vars.time.mute.value.map(Number);
      ticks = ticks.filter(function(f) {
        return serialized.indexOf(+f) < 0;
      });
    }
  } else {
    ticks = discrete.ticks.values;
  }
  return d3.nest().key(function(d) {
    var id, j, len, ref, return_id, val;
    return_id = "nesting";
    ref = vars.id.nesting.slice(0, vars.depth.value + 1);
    for (j = 0, len = ref.length; j < len; j++) {
      id = ref[j];
      val = fetchValue(vars, d, id);
      if (val instanceof Array) {
        val = val.join("_");
      }
      return_id += "_" + stringStrip(val);
    }
    return return_id;
  }).rollup(function(leaves) {
    var availables, filler, i, j, k, key, len, len1, obj, ref, tester, tick, timeVar;
    availables = uniqueValues(leaves, discrete.value, fetchValue, vars);
    timeVar = availables.length && availables[0].constructor === Date;
    if (timeVar) {
      availables = availables.map(Number);
    }
    if (discrete.zerofill.value) {
      if (discrete.scale.value === "log") {
        if (opposite.scale.viz.domain().every(function(d) {
          return d < 0;
        })) {
          filler = -1;
        } else {
          filler = 1;
        }
      } else {
        filler = 0;
      }
      for (i = j = 0, len = ticks.length; j < len; i = ++j) {
        tick = ticks[i];
        tester = timeAxis ? +tick : tick;
        if (availables.indexOf(tester) < 0) {
          obj = {
            d3plus: {}
          };
          ref = vars.id.nesting;
          for (k = 0, len1 = ref.length; k < len1; k++) {
            key = ref[k];
            if (key in leaves[0]) {
              obj[key] = leaves[0][key];
            }
          }
          obj[discrete.value] = tick;
          obj[opposite.value] = 0;
          obj[opposite.value] = filler;
          leaves.splice(i, 0, obj);
        }
      }
    }
    if (typeof leaves[0][discrete.value] === "string") {
      return leaves;
    } else {
      return leaves.sort(function(a, b) {
        var ad, ao, bd, bo, xsort;
        ad = fetchValue(vars, a, discrete.value);
        bd = fetchValue(vars, b, discrete.value);
        xsort = ad - bd;
        if (xsort) {
          return xsort;
        }
        ao = fetchValue(vars, a, opposite.value);
        bo = fetchValue(vars, b, opposite.value);
        return ao - bo;
      });
    }
  }).entries(data);
};



},{"../../../../core/fetch/value.coffee":69,"../../../../string/strip.js":169,"../../../../util/uniques.coffee":204}],309:[function(require,module,exports){
var fetchValue;

fetchValue = require("../../../../core/fetch/value.coffee");

module.exports = function(vars, data) {
  var d, flip, i, j, len, len1, margin, neg, negativeData, offset, opposite, positiveData, scale, stack, stacked, v, val;
  stacked = vars.axes.stacked;
  flip = vars[stacked].scale.viz(0);
  scale = vars[stacked].scale.value;
  opposite = stacked === "x" ? "y" : "x";
  margin = stacked === "y" ? vars.axes.margin.top : vars.axes.margin.left;
  offset = scale === "share" ? "expand" : "zero";
  stack = d3.layout.stack().values(function(d) {
    return d.values;
  }).offset(offset).x(function(d) {
    return d.d3plus[opposite];
  }).y(function(d) {
    return flip - vars[stacked].scale.viz(fetchValue(vars, d, vars[stacked].value));
  }).out(function(d, y0, y) {
    var negative, value;
    value = fetchValue(vars, d, vars[stacked].value);
    negative = value < 0;
    if (scale === "share") {
      d.d3plus[stacked + "0"] = (1 - y0) * flip;
      d.d3plus[stacked] = d.d3plus[stacked + "0"] - (y * flip);
    } else {
      d.d3plus[stacked + "0"] = flip - y0;
      d.d3plus[stacked] = d.d3plus[stacked + "0"] - y;
    }
    d.d3plus[stacked] += margin;
    return d.d3plus[stacked + "0"] += margin;
  });
  positiveData = [];
  negativeData = [];
  for (i = 0, len = data.length; i < len; i++) {
    d = data[i];
    val = fetchValue(vars, d, vars[stacked].value);
    if (val instanceof Array) {
      neg = true;
      for (j = 0, len1 = val.length; j < len1; j++) {
        v = val[j];
        if (v >= 0) {
          neg = false;
          break;
        }
      }
      if (neg) {
        negativeData.push(d);
      } else {
        positiveData.push(d);
      }
    } else {
      if (val >= 0) {
        positiveData.push(d);
      }
      if (val < 0) {
        negativeData.push(d);
      }
    }
  }
  if (!(positiveData.length || negativeData.length)) {
    return stack(data);
  } else {
    if (positiveData.length) {
      positiveData = stack(positiveData);
    }
    if (negativeData.length) {
      negativeData = stack(negativeData);
    }
    return positiveData.concat(negativeData);
  }
};



},{"../../../../core/fetch/value.coffee":69}],310:[function(require,module,exports){
var fetchValue, graph, line, nest, stack;

fetchValue = require("../../core/fetch/value.coffee");

graph = require("./helpers/graph/draw.coffee");

nest = require("./helpers/graph/nest.coffee");

stack = require("./helpers/graph/stack.coffee");

line = function(vars) {
  var d, data, domains, i, j, len, len1, point, ref;
  graph(vars, {
    buffer: vars.axes.opposite,
    mouse: true
  });
  domains = vars.x.domain.viz.concat(vars.y.domain.viz);
  if (domains.indexOf(void 0) >= 0) {
    return [];
  }
  data = vars.data.viz;
  for (i = 0, len = data.length; i < len; i++) {
    point = data[i];
    ref = point.values;
    for (j = 0, len1 = ref.length; j < len1; j++) {
      d = ref[j];
      d.d3plus.x = vars.x.scale.viz(fetchValue(vars, d, vars.x.value));
      d.d3plus.x += vars.axes.margin.left;
      d.d3plus.y = vars.y.scale.viz(fetchValue(vars, d, vars.y.value));
      d.d3plus.y += vars.axes.margin.top;
    }
  }
  if (vars.axes.stacked) {
    return stack(vars, data);
  } else {
    return data;
  }
};

line.filter = function(vars, data) {
  return nest(vars, data);
};

line.requirements = ["data", "x", "y"];

line.setup = function(vars) {
  var axis, size, y;
  if (!vars.axes.discrete) {
    axis = vars.time.value === vars.y.value ? "y" : "x";
    vars.self[axis]({
      scale: "discrete"
    });
  }
  y = vars[vars.axes.opposite];
  size = vars.size;
  if ((!y.value && size.value) || (size.changed && size.previous === y.value)) {
    vars.self[vars.axes.opposite](size.value);
  } else if ((!size.value && y.value) || (y.changed && y.previous === size.value)) {
    vars.self.size(y.value);
  }
};

line.shapes = ["line"];

line.tooltip = "static";

module.exports = line;



},{"../../core/fetch/value.coffee":69,"./helpers/graph/draw.coffee":302,"./helpers/graph/nest.coffee":308,"./helpers/graph/stack.coffee":309}],311:[function(require,module,exports){
var smallestGap = require("../../network/smallestGap.coffee"),
    fetchValue = require("../../core/fetch/value.coffee");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Network
//------------------------------------------------------------------------------
var network = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Use filtered lists if they are available
  //----------------------------------------------------------------------------
  var nodes = vars.nodes.restricted || vars.nodes.value,
      edges = vars.edges.restricted || vars.edges.value

  var x_range = d3.extent(nodes,function(n){return n.x}),
      y_range = d3.extent(nodes,function(n){return n.y})

  var val_range = [ 1 , 1 ]
  if (typeof vars.size.value === "number"){
    val_range = [vars.size.value, vars.size.value]
  }
  else if (vars.size.value){
    val_range = d3.extent(nodes, function(d){
      var val = fetchValue( vars , d , vars.size.value )
      return val === 0 ? null : val
    })
  }
  if (typeof val_range[0] == "undefined") val_range = [1,1]

  if (typeof vars.size.value === "number"){
    var max_size = vars.size.value;
    var min_size = vars.size.value;
  }
  else {

    var max_size = smallestGap(nodes, {"accessor": function(n){
      return [n.x, n.y];
    }});

    var overlap = vars.size.value ? vars.nodes.overlap : 0.4
    max_size = max_size * overlap

    if (vars.edges.arrows.value) {
      max_size = max_size * 0.5
    }

    if ( val_range[0] === val_range[1] ) {
      var min_size = max_size
    }
    else {

      var width = (x_range[1]+max_size*1.1)-(x_range[0]-max_size*1.1),
          height = (y_range[1]+max_size*1.1)-(y_range[0]-max_size*1.1),
          aspect = width/height,
          app = vars.width.viz/vars.height.viz;

      if ( app > aspect ) {
        var scale = vars.height.viz/height;
      }
      else {
        var scale = vars.width.viz/width;
      }
      var min_size = max_size * 0.25;
      if ( min_size * scale < 2 ) {
        min_size = 2/scale;
      }

    }
  }

  // Create size scale
  var radius = vars.size.scale.value
    .domain(val_range)
    .range([min_size, max_size])

  vars.zoom.bounds = [ [ x_range[0]-max_size*1.1 , y_range[0]-max_size*1.1 ]
                     , [ x_range[1]+max_size*1.1 , y_range[1]+max_size*1.1 ] ]

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Match nodes to data
  //----------------------------------------------------------------------------
  var data = [], lookup = {}
  nodes.forEach(function(n){

    var d = vars.data.viz.filter(function(a){
      return a[vars.id.value] == n[vars.id.value]
    })[0]

    var obj = d || {}

    obj[vars.id.value] = n[vars.id.value]

    obj.d3plus = {}
    obj.d3plus.x = n.x
    obj.d3plus.y = n.y
    var val = fetchValue(vars,obj,vars.size.value)
    obj.d3plus.r = val ? radius(val) : radius.range()[0]
    lookup[obj[vars.id.value]] = {
      "x": obj.d3plus.x,
      "y": obj.d3plus.y,
      "r": obj.d3plus.r
    }

    data.push(obj)
  })

  data.sort(function(a,b){
    return b.d3plus.r - a.d3plus.r
  })

  edges.forEach(function(l,i){

    if (l.d3plus) {
      delete l.d3plus.spline
    }

    l[vars.edges.source].d3plus = {}
    var source = lookup[l[vars.edges.source][vars.id.value]]
    l[vars.edges.source].d3plus.r = source.r
    l[vars.edges.source].d3plus.x = source.x
    l[vars.edges.source].d3plus.y = source.y

    l[vars.edges.target].d3plus = {}
    var target = lookup[l[vars.edges.target][vars.id.value]]
    l[vars.edges.target].d3plus.r = target.r
    l[vars.edges.target].d3plus.x = target.x
    l[vars.edges.target].d3plus.y = target.y

  })

  return {"nodes": data, "edges": edges}

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
network.nesting      = false
network.requirements = ["nodes","edges"]
network.scale        = 1.05
network.shapes       = [ "circle" , "square" , "donut" ]
network.tooltip      = "static"
network.zoom         = true

module.exports = network

},{"../../core/fetch/value.coffee":69,"../../network/smallestGap.coffee":162}],312:[function(require,module,exports){
var fetchValue, shortestPath, uniqueValues, viz,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

shortestPath = require("../../network/shortestPath.coffee");

fetchValue = require("../../core/fetch/value.coffee");

uniqueValues = require("../../util/uniques.coffee");

viz = function(vars) {
  var base, base1, base2, base3, col, colIndex, columnWidth, columns, edge, edgeInt, edges, i, id, j, k, l, labelSpace, lastDir, lastHop, len, len1, len2, len3, len4, len5, len6, len7, m, maxRadius, minRadius, n, newPath, next, nextDir, nextHop, nextIndex, node, o, p, path, pathInt, pathLookup, paths, prev, prevIndex, q, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, rowHeight, rows, size, sizeDomain, val, x, xDiff, y, yDomain;
  edges = [];
  pathLookup = {};
  pathLookup[vars.focus.value[0]] = 0;
  pathLookup[vars.focus.value[1]] = 0;
  paths = {
    all: [[vars.focus.value[0]], [vars.focus.value[1]]]
  };
  ref = viz.paths;
  for (pathInt = j = 0, len = ref.length; j < len; pathInt = ++j) {
    path = ref[pathInt];
    edges = edges.concat(path.edges);
    lastHop = vars.focus.value[0];
    paths[pathInt] = [lastHop];
    ref1 = path.edges;
    for (edgeInt = k = 0, len1 = ref1.length; k < len1; edgeInt = ++k) {
      edge = ref1[edgeInt];
      edge[vars.edges.source] = vars.data.viz.filter(function(d) {
        return edge[vars.edges.source][vars.id.value] === d[vars.id.value];
      })[0];
      edge[vars.edges.target] = vars.data.viz.filter(function(d) {
        return edge[vars.edges.target][vars.id.value] === d[vars.id.value];
      })[0];
      nextDir = edge[vars.edges.source][vars.id.value] === lastHop ? "target" : "source";
      nextHop = edge[vars.edges[nextDir]][vars.id.value];
      if (pathLookup[nextHop] === void 0) {
        pathLookup[nextHop] = pathInt;
      }
      paths[pathInt].push(nextHop);
      lastHop = nextHop;
    }
  }
  rows = 0;
  for (pathInt in paths) {
    path = paths[pathInt];
    if (pathInt !== "all") {
      newPath = 0;
      for (i = l = 0, len2 = path.length; l < len2; i = ++l) {
        id = path[i];
        if ((i !== 0 && i !== (path.length - 1)) && pathLookup[id] === parseFloat(pathInt)) {
          newPath = 1;
          prev = path[i - 1];
          next = path[i + 1];
          prevIndex = null;
          nextIndex = null;
          ref2 = paths.all;
          for (colIndex = m = 0, len3 = ref2.length; m < len3; colIndex = ++m) {
            col = ref2[colIndex];
            if (indexOf.call(col, prev) >= 0) {
              prevIndex = colIndex;
            }
            if (indexOf.call(col, next) >= 0) {
              nextIndex = colIndex;
            }
          }
          if (prevIndex !== null && nextIndex === null) {
            if (prevIndex + 1 === paths.all.length - 1) {
              paths.all.splice(prevIndex + 1, 0, [id]);
            } else {
              paths.all[prevIndex + 1].push(id);
            }
          } else if (nextIndex - prevIndex === 1) {
            paths.all.splice(nextIndex, 0, [id]);
          } else if (nextIndex - prevIndex > 1) {
            paths.all[nextIndex - 1].push(id);
          }
        }
      }
      rows += newPath;
    }
  }
  rowHeight = Math.floor(vars.height.viz / rows);
  yDomain = [];
  i = 0;
  while (i < rows) {
    if (i % 2 === 0) {
      yDomain.push(i);
    } else {
      yDomain.unshift(i);
    }
    i++;
  }
  labelSpace = vars.size.value && !vars.small ? 30 : 0;
  y = d3.scale.ordinal().domain(yDomain).range(d3.range(rowHeight / 2 - labelSpace, vars.height.viz + rowHeight / 2 - labelSpace, (vars.height.viz - rowHeight) / (rows - 1)));
  columns = paths["all"].length;
  columnWidth = Math.floor(vars.width.viz / columns);
  x = d3.scale.linear().domain([0, columns - 1]).rangeRound([columnWidth / 2, vars.width.viz - columnWidth / 2]);
  minRadius = 5;
  maxRadius = d3.min([columnWidth, rowHeight - labelSpace]) * 0.4;
  sizeDomain = d3.extent(vars.data.viz, function(node) {
    var val;
    val = fetchValue(vars, node, vars.size.value);
    return val || 0;
  });
  size = vars.size.scale.value.domain(sizeDomain).rangeRound([minRadius, maxRadius]);
  ref3 = vars.data.viz;
  for (n = 0, len4 = ref3.length; n < len4; n++) {
    node = ref3[n];
    if (node.d3plus == null) {
      node.d3plus = {};
    }
    ref4 = paths["all"];
    for (colIndex = o = 0, len5 = ref4.length; o < len5; colIndex = ++o) {
      col = ref4[colIndex];
      if (ref5 = node[vars.id.value], indexOf.call(col, ref5) >= 0) {
        node.d3plus.x = x(colIndex);
      }
    }
    node.d3plus.y = y(pathLookup[node[vars.id.value]]);
    if (vars.size.value) {
      val = fetchValue(vars, node, vars.size.value);
      node.d3plus.r = val ? size(val) : minRadius;
    } else {
      node.d3plus.r = maxRadius;
    }
    if (node.d3plus.r < columnWidth * 0.1 && !vars.small) {
      node.d3plus.label = {
        x: 0,
        y: node.d3plus.r + vars.labels.padding * 2,
        w: columnWidth * 0.6,
        h: labelSpace + maxRadius - node.d3plus.r,
        resize: false
      };
    } else {
      delete node.d3plus.label;
    }
  }
  ref6 = viz.paths;
  for (pathInt = p = 0, len6 = ref6.length; p < len6; pathInt = ++p) {
    path = ref6[pathInt];
    lastHop = vars.focus.value[0];
    ref7 = path.edges;
    for (edgeInt = q = 0, len7 = ref7.length; q < len7; edgeInt = ++q) {
      edge = ref7[edgeInt];
      nextDir = edge[vars.edges.source][vars.id.value] === lastHop ? "target" : "source";
      lastDir = nextDir === "target" ? "source" : "target";
      nextHop = edge[vars.edges[nextDir]][vars.id.value];
      if (pathLookup[lastHop] !== pathLookup[nextHop]) {
        edge.d3plus = {
          spline: true
        };
        if ((base = edge[vars.edges.source]).d3plus == null) {
          base.d3plus = {};
        }
        if ((base1 = edge[vars.edges.source].d3plus).edges == null) {
          base1.edges = {};
        }
        if ((base2 = edge[vars.edges.target]).d3plus == null) {
          base2.d3plus = {};
        }
        if ((base3 = edge[vars.edges.target].d3plus).edges == null) {
          base3.edges = {};
        }
        xDiff = edge[nextDir].d3plus.x - edge[lastDir].d3plus.x;
        edge[lastDir].d3plus.edges[edge[nextDir][vars.id.value]] = {
          angle: Math.PI,
          radius: columnWidth / 2
        };
        edge[nextDir].d3plus.edges[edge[lastDir][vars.id.value]] = {
          angle: 0,
          radius: columnWidth / 2,
          offset: xDiff - columnWidth
        };
      } else {
        delete edge.d3plus;
      }
      lastHop = nextHop;
    }
  }
  return {
    nodes: vars.data.viz,
    edges: edges
  };
};

viz.filter = function(vars, data) {
  var added, d, edge, edges, id, ids, j, k, l, len, len1, len2, obj, path, ref, ref1, returnData, source, target;
  edges = vars.edges.filtered || vars.edges.value;
  viz.paths = shortestPath(edges, vars.focus.value[0], {
    target: vars.focus.value[1],
    distance: vars.edges.size.value || void 0,
    nodeid: vars.id.value,
    startpoint: vars.edges.source,
    endpoint: vars.edges.target,
    K: vars.edges.limit.value || 5
  });
  viz.nodes = [];
  added = [];
  ref = viz.paths;
  for (j = 0, len = ref.length; j < len; j++) {
    path = ref[j];
    ref1 = path.edges;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      edge = ref1[k];
      source = edge[vars.edges.source];
      target = edge[vars.edges.target];
      if (added.indexOf(source[vars.id.value]) < 0) {
        viz.nodes.push(source);
        added.push(source[vars.id.value]);
      }
      if (added.indexOf(target[vars.id.value]) < 0) {
        viz.nodes.push(target);
        added.push(target[vars.id.value]);
      }
    }
  }
  ids = uniqueValues(viz.nodes, vars.id.value, fetchValue, vars);
  returnData = [];
  for (l = 0, len2 = ids.length; l < len2; l++) {
    id = ids[l];
    d = data.filter(function(d) {
      return d[vars.id.value] === id;
    });
    if (!d[0]) {
      obj = {
        d3plus: {}
      };
      obj[vars.id.value] = id;
      returnData.push(obj);
    } else {
      returnData.push(d[0]);
    }
  }
  return returnData;
};

viz.nesting = false;

viz.requirements = [
  function(vars) {
    return {
      status: vars.focus.value.length === 2,
      text: vars.format.locale.value.method.focus + " x 2"
    };
  }, "edges"
];

viz.scale = 1;

viz.shapes = ["circle", "square", "donut"];

viz.tooltip = "static";

module.exports = viz;



},{"../../core/fetch/value.coffee":69,"../../network/shortestPath.coffee":161,"../../util/uniques.coffee":204}],313:[function(require,module,exports){
var comparator, dataThreshold, fetchValue, groupData, order, pie;

comparator = require("../../array/comparator.coffee");

dataThreshold = require("../../core/data/threshold.js");

fetchValue = require("../../core/fetch/value.coffee");

groupData = require("../../core/data/group.coffee");

order = {};

pie = function(vars) {
  var d, groupedData, i, item, len, pieData, pieLayout, radius, returnData;
  pieLayout = d3.layout.pie().value(function(d) {
    return d.value;
  }).sort(function(a, b) {
    var aID, bID;
    if (vars.order.value) {
      return comparator(a.d3plus, b.d3plus, [vars.order.value], vars.order.sort.value, [], vars);
    } else {
      aID = fetchValue(vars, a.d3plus, vars.id.value);
      if (order[aID] === void 0) {
        order[aID] = a.value;
      }
      bID = fetchValue(vars, b.d3plus, vars.id.value);
      if (order[bID] === void 0) {
        order[bID] = b.value;
      }
      if (order[bID] < order[aID]) {
        return -1;
      } else {
        return 1;
      }
    }
  });
  groupedData = groupData(vars, vars.data.viz, []);
  pieData = pieLayout(groupedData);
  returnData = [];
  radius = d3.min([vars.width.viz, vars.height.viz]) / 2 - vars.labels.padding * 2;
  for (i = 0, len = pieData.length; i < len; i++) {
    d = pieData[i];
    item = d.data.d3plus;
    item.d3plus.startAngle = d.startAngle;
    item.d3plus.endAngle = d.endAngle;
    item.d3plus.r = radius;
    item.d3plus.x = vars.width.viz / 2;
    item.d3plus.y = vars.height.viz / 2;
    returnData.push(item);
  }
  return returnData;
};

pie.filter = dataThreshold;

pie.requirements = ["data", "size"];

pie.shapes = ["arc"];

pie.threshold = function(vars) {
  return (40 * 40) / (vars.width.viz * vars.height.viz);
};

module.exports = pie;



},{"../../array/comparator.coffee":35,"../../core/data/group.coffee":59,"../../core/data/threshold.js":63,"../../core/fetch/value.coffee":69}],314:[function(require,module,exports){
var arraySort     = require("../../array/sort.coffee"),
    events        = require("../../client/pointer.coffee"),
    fetchValue    = require("../../core/fetch/value.coffee"),
    fetchColor    = require("../../core/fetch/color.coffee"),
    legible       = require("../../color/legible.coffee"),
    removeTooltip = require("../../tooltip/remove.coffee"),
    smallestGap   = require("../../network/smallestGap.coffee"),
    uniqueValues  = require("../../util/uniques.coffee")

var rings = function(vars) {

  var radius = d3.min([vars.height.viz,vars.width.viz])/2
    , ring_width = vars.small || !vars.labels.value
                 ? (radius-vars.labels.padding*2)/2 : radius/3
    , primaryRing = vars.small || !vars.labels.value
                  ? ring_width*1.4 : ring_width
    , secondaryRing = ring_width*2
    , edges = []
    , nodes = []

  var center = vars.data.viz.filter(function(d){
    return d[vars.id.value] === vars.focus.value[0]
  })[0]

  if ( !center ) {
    center = { "d3plus" : {} }
    center[vars.id.value] = vars.focus.value[0]
  }

  center.d3plus.x = vars.width.viz/2
  center.d3plus.y = vars.height.viz/2
  center.d3plus.r = primaryRing*.65

  var primaries = [], claimed = [vars.focus.value[0]]
  vars.edges.connections(vars.focus.value[0],vars.id.value).forEach(function(edge){

    var c = edge[vars.edges.source][vars.id.value] == vars.focus.value[0] ? edge[vars.edges.target] : edge[vars.edges.source]
    var n = vars.data.viz.filter(function(d){
      return d[vars.id.value] === c[vars.id.value]
    })[0]

    if ( !n ) {
      n = { "d3plus" : {} }
      n[vars.id.value] = c[vars.id.value]
    }

    n.d3plus.edges = vars.edges.connections(n[vars.id.value],vars.id.value).filter(function(c){
      return c[vars.edges.source][vars.id.value] != vars.focus.value[0] && c[vars.edges.target][vars.id.value] != vars.focus.value[0]
    })
    n.d3plus.edge = edge
    claimed.push(n[vars.id.value])
    primaries.push(n)

  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Sort primary nodes by children (smallest to largest) and then by sort
  // order.
  //--------------------------------------------------------------------------
  var sort = vars.order.value || vars.color.value
          || vars.size.value || vars.id.value

  primaries.sort(function(a,b){

    var lengthdiff = a.d3plus.edges.length - b.d3plus.edges.length

    if ( lengthdiff ) {

      return lengthdiff

    }
    else {

      return arraySort( [a,b] , sort , vars.order.sort.value
                              , vars.color.value || [] , vars)

    }

  })

  if (typeof vars.edges.limit.value == "number") {
    primaries = primaries.slice(0,vars.edges.limit.value)
  }
  else if (typeof vars.edges.limit.value == "function") {
    primaries = vars.edges.limit.value(primaries)
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check for similar children and give preference to nodes with less
  // overall children.
  //----------------------------------------------------------------------------
  var secondaries = [], total = 0
  primaries.forEach(function(p){

    var primaryId = p[vars.id.value]

    p.d3plus.edges = p.d3plus.edges.filter(function(c){

      var source = c[vars.edges.source][vars.id.value]
        , target = c[vars.edges.target][vars.id.value]
      return (claimed.indexOf(source) < 0 && target == primaryId)
          || (claimed.indexOf(target) < 0 && source == primaryId)

    })

    total += p.d3plus.edges.length || 1

    p.d3plus.edges.forEach(function(c){

      var source = c[vars.edges.source]
        , target = c[vars.edges.target]
      var claim = target[vars.id.value] == primaryId ? source : target
      claimed.push(claim[vars.id.value])

    })
  })

  arraySort( primaries , sort , vars.order.sort.value
                   , vars.color.value || [] , vars)

  var offset = 0,
      radian = Math.PI*2,
      start = 0

  primaries.forEach(function(p,i){

    var children = p.d3plus.edges.length || 1,
        space = (radian/total)*children

    if (i == 0) {
      start = angle
      offset -= space/2
    }

    var angle = offset+(space/2)
    angle -= radian/4

    p.d3plus.radians = angle
    p.d3plus.x = vars.width.viz/2 + (primaryRing * Math.cos(angle))
    p.d3plus.y = vars.height.viz/2 + (primaryRing * Math.sin(angle))

    offset += space
    p.d3plus.edges.sort(function(a,b){

      var a = a[vars.edges.source][vars.id.value] == p[vars.id.value]
            ? a[vars.edges.target] : a[vars.edges.source]
        , b = b[vars.edges.source][vars.id.value] == p[vars.id.value]
            ? b[vars.edges.target] : b[vars.edges.source]

      return arraySort( [a,b] , sort , vars.order.sort.value
                              , vars.color.value || [] , vars)

    })

    p.d3plus.edges.forEach(function(edge,i){

      var c = edge[vars.edges.source][vars.id.value] == p[vars.id.value]
          ? edge[vars.edges.target] : edge[vars.edges.source]
        , s = radian/total

      var d = vars.data.viz.filter(function(a){
        return a[vars.id.value] === c[vars.id.value]
      })[0]

      if ( !d ) {
        d = { "d3plus" : {} }
        d[vars.id.value] = c[vars.id.value]
      }

      a = (angle-(s*children/2)+(s/2))+((s)*i)
      d.d3plus.radians = a
      d.d3plus.x = vars.width.viz/2 + ((secondaryRing) * Math.cos(a))
      d.d3plus.y = vars.height.viz/2 + ((secondaryRing) * Math.sin(a))
      secondaries.push(d)
    })

  })

  var primaryDistance = smallestGap(primaries,{"accessor": function(n){
        return [n.d3plus.x, n.d3plus.y]
      }})
    , secondaryDistance = smallestGap(secondaries,{"accessor": function(n){
        return [n.d3plus.x, n.d3plus.y]
      }})

  if (!primaryDistance) {
    primaryDistance = ring_width/2
  }

  if (!secondaryDistance) {
    secondaryDistance = ring_width/4
  }

  if (primaryDistance/2 - 4 < 8) {
    var primaryMax = d3.min([primaryDistance/2,8])
  }
  else {
    var primaryMax = primaryDistance/2 - 4
  }

  if (secondaryDistance/2 - 4 < 4) {
    var secondaryMax = d3.min([secondaryDistance/2,4])
  }
  else {
    var secondaryMax = secondaryDistance/2 - 4
  }

  if (secondaryMax > ring_width/10) {
    secondaryMax = ring_width/10
  }

  if (secondaryMax > primaryMax && secondaryMax > 10) {
    secondaryMax = primaryMax*.75
  }
  if (primaryMax > secondaryMax*1.5) {
    primaryMax = secondaryMax*1.5
  }

  primaryMax = Math.floor(primaryMax)
  secondaryMax = Math.floor(secondaryMax)

  var ids = uniqueValues(primaries, vars.id.value, fetchValue, vars)
  ids = ids.concat(uniqueValues(secondaries, vars.id.value, fetchValue, vars))
  ids.push(vars.focus.value[0])

  var data = vars.data.viz.filter(function(d){
    return ids.indexOf(d[vars.id.value]) >= 0
  })

  if (vars.size.value) {

    var domain = d3.extent(data,function(d){
      return fetchValue(vars,d,vars.size.value)
    })

    if (domain[0] == domain[1]) {
      domain[0] = 0
    }

    var radius = d3.scale.linear()
      .domain(domain)
      .rangeRound([3,d3.min([primaryMax,secondaryMax])])

    var val = fetchValue(vars,center,vars.size.value)
    center.d3plus.r = radius(val)

  }
  else {

    var radius = d3.scale.linear()
      .domain([1,2])
      .rangeRound([primaryMax,secondaryMax])


    if (vars.edges.label) {
      center.d3plus.r = radius(1)*1.5
    }

  }

  secondaries.forEach(function(s){
    s.d3plus.ring = 2
    var val = vars.size.value ? fetchValue(vars,s,vars.size.value) : 2
    s.d3plus.r = radius(val)
  })

  primaries.forEach(function(p){
    p.d3plus.ring = 1
    var val = vars.size.value ? fetchValue(vars,p,vars.size.value) : 1
    p.d3plus.r = radius(val)
  })

  nodes = [center].concat(primaries).concat(secondaries)

  primaries.forEach(function(p,i){

    var check = [vars.edges.source,vars.edges.target]
      , edge = p.d3plus.edge

    check.forEach(function(node){

      edge[node] = nodes.filter(function(n){
        return n[vars.id.value] == edge[node][vars.id.value]
      })[0]

    })

    delete edge.d3plus
    edges.push(edge)

    vars.edges.connections(p[vars.id.value],vars.id.value).forEach(function(edge){

      var c = edge[vars.edges.source][vars.id.value] == p[vars.id.value]
            ? edge[vars.edges.target] : edge[vars.edges.source]

      if (c[vars.id.value] != center[vars.id.value]) {

        var target = secondaries.filter(function(s){
          return s[vars.id.value] == c[vars.id.value]
        })[0]

        if (!target) {
          var r = primaryRing
          target = primaries.filter(function(s){
            return s[vars.id.value] == c[vars.id.value]
          })[0]
        }
        else {
          var r = secondaryRing
        }

        if (target) {

          edge.d3plus = {
            "spline": true,
            "translate": {
              "x": vars.width.viz/2,
              "y": vars.height.viz/2
            }
          }

          var check = [vars.edges.source,vars.edges.target]

          check.forEach(function(node,i){

            edge[node] = nodes.filter(function(n){
              return n[vars.id.value] == edge[node][vars.id.value]
            })[0]

            if (edge[node].d3plus.edges === undefined) edge[node].d3plus.edges = {}

            var oppID = i === 0 ? edge[vars.edges.target][vars.id.value] : edge[vars.edges.source][vars.id.value]

            if (edge[node][vars.id.value] == p[vars.id.value]) {

              edge[node].d3plus.edges[oppID] = {
                "angle": p.d3plus.radians + Math.PI,
                "radius": ring_width/2
              }

            }
            else {

              edge[node].d3plus.edges[oppID] = {
                "angle": target.d3plus.radians,
                "radius": ring_width/2
              }

            }
          })

          edges.push(edge)

        }

      }

    })

  })

  nodes.forEach(function(n) {

    if (!vars.small && vars.labels.value) {

      if (n[vars.id.value] != vars.focus.value[0]) {

        n.d3plus.rotate = n.d3plus.radians*(180/Math.PI)

        var angle = n.d3plus.rotate,
            width = ring_width-(vars.labels.padding*3)-n.d3plus.r

        if (angle < -90 || angle > 90) {
          angle = angle-180
          var buffer = -(n.d3plus.r+width/2+vars.labels.padding),
              anchor = "end"
        }
        else {
          var buffer = n.d3plus.r+width/2+vars.labels.padding,
              anchor = "start"
        }

        var background = primaries.indexOf(n) >= 0 ? true : false

        var height = n.d3plus.ring == 1 ? primaryDistance : secondaryDistance

        n.d3plus.label = {
          "x": buffer,
          "y": 0,
          "w": width,
          "h": height,
          "angle": angle,
          "anchor": anchor,
          "valign": "center",
          "color": legible(fetchColor(vars,n)),
          "resize": [8, vars.labels.font.size],
          "background": background,
          "mouse": true
        }

      }
      else if (vars.size.value || vars.edges.label) {

        var height = primaryRing-n.d3plus.r*2-vars.labels.padding*2

        n.d3plus.label = {
          "x": 0,
          "y": n.d3plus.r+height/2,
          "w": primaryRing,
          "h": height,
          "color": legible(fetchColor(vars,n)),
          "resize": [10,40],
          "background": true,
          "mouse": true
        }

      }
      else {
        delete n.d3plus.rotate
        delete n.d3plus.label
      }

    }
    else {
      delete n.d3plus.rotate
      delete n.d3plus.label
    }

  })

  vars.mouse[events.click] = function(d) {
    if (d[vars.id.value] != vars.focus.value[0]) {
      removeTooltip(vars.type.value)
      vars.self.focus(d[vars.id.value]).draw()
    }
  }

  return {"edges": edges, "nodes": nodes, "data": data}

};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
rings.filter       = function( vars , data ) {

  var primaries = vars.edges.connections(vars.focus.value[0],vars.id.value,true)
    , secondaries = []

  primaries.forEach(function(p){
    secondaries = secondaries.concat(vars.edges.connections(p[vars.id.value],vars.id.value,true))
  })

  var connections = primaries.concat(secondaries)
    , ids = uniqueValues(connections, vars.id.value, fetchValue, vars)
    , returnData = []

  ids.forEach(function(id){

    var d = data.filter(function(d){
      return d[vars.id.value] == id
    })[0]

    if ( !d ) {
      var obj = {"d3plus": {}}
      obj[vars.id.value] = id
      returnData.push(obj)
    }
    else {
      returnData.push(d)
    }

  })

  return returnData

}
rings.nesting      = false
rings.scale        = 1
rings.shapes       = [ "circle" , "square" , "donut" ]
rings.requirements = [ "edges" , "focus" ]
rings.tooltip      = "static"

module.exports = rings

},{"../../array/sort.coffee":37,"../../client/pointer.coffee":41,"../../color/legible.coffee":46,"../../core/fetch/color.coffee":65,"../../core/fetch/value.coffee":69,"../../network/smallestGap.coffee":162,"../../tooltip/remove.coffee":197,"../../util/uniques.coffee":204}],315:[function(require,module,exports){
var fetchValue, graph, print, scatter, sort, ticks;

fetchValue = require("../../core/fetch/value.coffee");

graph = require("./helpers/graph/draw.coffee");

print = require("../../core/console/print.coffee");

sort = require("../../array/sort.coffee");

ticks = require("./helpers/graph/dataTicks.coffee");

scatter = function(vars) {
  var d, domains, i, len, ref;
  graph(vars, {
    buffer: "size",
    mouse: true
  });
  domains = vars.x.domain.viz.concat(vars.y.domain.viz);
  if (domains.indexOf(void 0) >= 0) {
    return [];
  }
  ref = vars.data.viz;
  for (i = 0, len = ref.length; i < len; i++) {
    d = ref[i];
    d.d3plus.x = vars.x.scale.viz(fetchValue(vars, d, vars.x.value));
    d.d3plus.x += vars.axes.margin.left;
    d.d3plus.y = vars.y.scale.viz(fetchValue(vars, d, vars.y.value));
    d.d3plus.y += vars.axes.margin.top;
    if (typeof vars.size.value === "number" || !vars.size.value) {
      d.d3plus.r = vars.axes.scale(0);
    } else {
      d.d3plus.r = vars.axes.scale(fetchValue(vars, d, vars.size.value));
    }
  }
  ticks(vars);
  return sort(vars.data.viz, vars.order.value || vars.size.value || vars.id.value, vars.order.sort.value === "desc" ? "asc" : "desc", vars.color.value || [], vars);
};

scatter.fill = true;

scatter.requirements = ["data", "x", "y"];

scatter.scale = 1.1;

scatter.setup = function(vars) {
  if (vars.time.value && !vars.axes.discrete) {
    if (vars.time.value === vars.x.value) {
      vars.self.x({
        scale: "discrete"
      });
    }
    if (vars.time.value === vars.y.value) {
      return vars.self.y({
        scale: "discrete"
      });
    }
  }
};

scatter.shapes = ["circle", "square", "donut"];

scatter.tooltip = "static";

module.exports = scatter;



},{"../../array/sort.coffee":37,"../../core/console/print.coffee":54,"../../core/fetch/value.coffee":69,"./helpers/graph/dataTicks.coffee":301,"./helpers/graph/draw.coffee":302}],316:[function(require,module,exports){
var closest, fetchValue, graph, nest, sort, stack, stacked, threshold;

closest = require("../../util/closest.coffee");

fetchValue = require("../../core/fetch/value.coffee");

graph = require("./helpers/graph/draw.coffee");

nest = require("./helpers/graph/nest.coffee");

sort = require("../../array/sort.coffee");

stack = require("./helpers/graph/stack.coffee");

threshold = require("../../core/data/threshold.js");

stacked = function(vars) {
  var d, data, discrete, domains, i, j, len, len1, opposite, point, ref;
  graph(vars, {
    buffer: vars.axes.opposite
  });
  domains = vars.x.domain.viz.concat(vars.y.domain.viz);
  if (domains.indexOf(void 0) >= 0) {
    return [];
  }
  data = sort(vars.data.viz, null, null, null, vars);
  discrete = vars[vars.axes.discrete];
  opposite = vars[vars.axes.opposite];
  for (i = 0, len = data.length; i < len; i++) {
    point = data[i];
    if (!point.d3plus) {
      point.d3plus = {};
    }
    ref = point.values;
    for (j = 0, len1 = ref.length; j < len1; j++) {
      d = ref[j];
      if (!d.d3plus) {
        d.d3plus = {};
      }
      d.d3plus.x = discrete.scale.viz(fetchValue(vars, d, discrete.value));
      d.d3plus.x += vars.axes.margin.left;
      d.d3plus.y = opposite.scale.viz(fetchValue(vars, d, opposite.value));
      d.d3plus.y += vars.axes.margin.top;
      if (d.d3plus.merged instanceof Array) {
        if (!point.d3plus.merged) {
          point.d3plus.merged = [];
        }
        point.d3plus.merged = point.d3plus.merged.concat(d.d3plus.merged);
      }
      if (d.d3plus.text && !point.d3plus.text) {
        point.d3plus.text = d.d3plus.text;
      }
    }
  }
  return stack(vars, data);
};

stacked.filter = function(vars, data) {
  return nest(vars, threshold(vars, data, vars[vars.axes.discrete].value));
};

stacked.requirements = ["data", "x", "y"];

stacked.setup = function(vars) {
  var axis, size, y;
  if (!vars.axes.discrete) {
    axis = vars.time.value === vars.y.value ? "y" : "x";
    vars.self[axis]({
      scale: "discrete"
    });
  }
  if (!vars[vars.axes.discrete].zerofill.value) {
    vars.self[vars.axes.discrete]({
      zerofill: true
    });
  }
  if (!vars[vars.axes.opposite].stacked.value) {
    vars.self[vars.axes.opposite]({
      stacked: true
    });
  }
  y = vars[vars.axes.opposite];
  size = vars.size;
  if ((!y.value && size.value) || (size.changed && size.previous === y.value)) {
    vars.self[vars.axes.opposite](size.value);
  } else if ((!size.value && y.value) || (y.changed && y.previous === size.value)) {
    vars.self.size(y.value);
  }
};

stacked.shapes = ["area"];

stacked.threshold = function(vars) {
  return 20 / vars.height.viz;
};

stacked.tooltip = "static";

module.exports = stacked;



},{"../../array/sort.coffee":37,"../../core/data/threshold.js":63,"../../core/fetch/value.coffee":69,"../../util/closest.coffee":200,"./helpers/graph/draw.coffee":302,"./helpers/graph/nest.coffee":308,"./helpers/graph/stack.coffee":309}],317:[function(require,module,exports){
var fetchValue = require("../../core/fetch/value.coffee");
var uniques    = require("../../util/uniques.coffee");
var copy       = require("../../util/copy.coffee");
var rand_col   = require("../../color/random.coffee");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Table
//------------------------------------------------------------------------------

var table = function(vars) {

  // get unique IDs and columns
  var ids = uniques(vars.data.viz, vars.id.value, fetchValue, vars);
  var cols = uniques(vars.cols.value);

  // if user wants to show the row labels (default behavior) add this as a col
  if (cols.indexOf("label") < 0 && vars.cols.index.value){
    cols.unshift("label");
  }

  // width/height are a function of number of IDs and columns
  var item_height = vars.height.viz / (ids.length+1); // add 1 for header offset
  var item_width = vars.width.viz / cols.length;

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Setup background
  //----------------------------------------------------------------------------
  vars.group.selectAll("rect").data([0]).enter()
    .append("rect")
    .attr("class", "background")
    .attr("height", vars.height.viz)
    .attr("width", vars.width.viz)
    .style("fill", vars.color.missing)
  // draw line separater w/ enter/update/exit
  var lines_horiz = vars.group.selectAll("line.horiz").data(vars.data.viz);
  lines_horiz.enter().append("line").attr("class", "horiz")
  lines_horiz
    .attr("x1", 0)
    .attr("y1", function(d, row_i){ return (item_height * row_i) + item_height })
    .attr("x2", vars.width.viz)
    .attr("y2", function(d, row_i){ return (item_height * row_i) + item_height })
    .style("fill", "#fff")
    .style("stroke", "#fff")
  lines_horiz.exit().remove()
  // draw line separater w/ enter/update/exit
  var lines_vert = vars.group.selectAll("line.vert").data(cols);
  lines_vert.enter().append("line").attr("class", "vert")
  lines_vert
    .attr("x1", function(d, col_i){ return (item_width * col_i) + item_width })
    .attr("y1", 0)
    .attr("x2", function(d, col_i){ return (item_width * col_i) + item_width })
    .attr("y2", vars.height.viz)
    .style("fill", "#fff")
    .style("stroke", "#fff")
  lines_vert.exit().remove()

  var ret = []
  var colors = {}

  // doing 2 things here, first we add our column headers to our ret array as
  // items dor d3plus to draw. We also compute the color scales for each column
  cols.forEach(function(col, col_i){
    // add columns
    var header = {"d3plus":{
      "x": (item_width * col_i) + item_width/2,
      "y": item_height/2,
      "width": item_width,
      "height": item_height,
      "id": "d3p_header_"+col.toString().replace(/ /g,"_"),
      "shape": "square",
      "color": "#fff",
      "text": col
    }}
    if(col == vars.id.value){
      header.d3plus.color = "#fff";
    }
    if(col == "label"){
      header.d3plus.label = false;
      header.d3plus.color = "#fff";
      header.d3plus.stroke = "#fff";
    }
    ret.push(header)

    // set up color scales
    if(vars.data.keys[col] == "number"){
      var domain_extent = d3.extent(vars.data.viz, function(d){ return d[col]; })
      if(domain_extent[0] == domain_extent[1]){
        domain_extent = [domain_extent[0]-1, domain_extent[1]]
      }
      colors[col] = d3.scale.linear().domain(domain_extent).range([vars.color.missing,rand_col(col)])
    }
    else if(vars.data.keys[col] == "boolean"){
      colors[col] = function(bool){
        return bool ? rand_col(col) : vars.color.missing;
      }
    }
  })

  vars.data.viz.forEach(function(d, row_i){
    // offset for column headers
    row_i += 1;

    // loop through each user defined column to create new "object" to draw
    cols.forEach(function(col, col_i){

      // need to clone data since we'll be dupliating it for each column
      var d_clone = copy(d);

      // set unique ID otherwise it'd be the same in each column
      d_clone.d3plus.id = "d3p_"+d_clone[vars.id.value].toString().replace(/ /g,"_")+"_"+col;
      d_clone.d3plus.x = (item_width * col_i) + item_width/2;
      d_clone.d3plus.y = (item_height * row_i) + item_height/2;
      d_clone.d3plus.width = item_width;
      d_clone.d3plus.height = item_height;

      if(col == "label"){
        d_clone.d3plus.shape = "square";
        d_clone.d3plus.color = "#fff";
        // special case for top left corner
        ret.push(d_clone)
      }

      // be sure that this column is actually in this data item
      if(d3.keys(d).indexOf(col) >= 0 && col in d){
        if(colors[col]){
          d_clone.d3plus.color = colors[col](d_clone[col]);
        }
        d_clone.d3plus.text = d_clone[col];
        if(vars.data.keys[col] == "boolean"){
          d_clone.d3plus.label = false;
        }
        else if(vars.data.keys[col] == "string"){
          d_clone.d3plus.color = vars.color.missing;
          d_clone.d3plus.stroke = "#fff";
          d_clone.d3plus.shape = "square";
        }
        ret.push(d_clone)
      }
    })

  })

  return ret

};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
table.shapes = ["check", "cross", "diamond", "square", "triangle", "triangle_up", "triangle_down"]
table.requirements = ["data", "cols"]

module.exports = table

},{"../../color/random.coffee":49,"../../core/fetch/value.coffee":69,"../../util/copy.coffee":201,"../../util/uniques.coffee":204}],318:[function(require,module,exports){
var dataThreshold, groupData, mergeObject, tree_map;

dataThreshold = require("../../core/data/threshold.js");

groupData = require("../../core/data/group.coffee");

mergeObject = require("../../object/merge.coffee");

tree_map = function(vars) {
  var d, data, groupedData, i, len, returnData, root;
  groupedData = groupData(vars, vars.data.viz);
  data = d3.layout.treemap().mode(vars.type.mode.value).round(true).size([vars.width.viz, vars.height.viz]).children(function(d) {
    return d.values;
  }).padding(vars.data.padding.value).sort(function(a, b) {
    var sizeDiff;
    sizeDiff = a.value - b.value;
    if (sizeDiff === 0) {
      return a.id < b.id;
    } else {
      return sizeDiff;
    }
  }).nodes({
    name: "root",
    values: groupedData
  }).filter(function(d) {
    return !d.values && d.area;
  });
  if (data.length) {
    root = data[0];
    while (root.parent) {
      root = root.parent;
    }
    returnData = [];
    for (i = 0, len = data.length; i < len; i++) {
      d = data[i];
      d.d3plus.d3plus = mergeObject(d.d3plus.d3plus, {
        x: d.x + d.dx / 2,
        y: d.y + d.dy / 2,
        width: d.dx,
        height: d.dy,
        share: d.value / root.value
      });
      returnData.push(d.d3plus);
    }
  }
  return returnData;
};

tree_map.filter = dataThreshold;

tree_map.modes = ["squarify", "slice", "dice", "slice-dice"];

tree_map.requirements = ["data", "size"];

tree_map.shapes = ["square"];

tree_map.threshold = function(vars) {
  return (40 * 40) / (vars.width.viz * vars.height.viz);
};

module.exports = tree_map;



},{"../../core/data/group.coffee":59,"../../core/data/threshold.js":63,"../../object/merge.coffee":165}],319:[function(require,module,exports){
var attach, axis, container, flash, getSteps, print, validObject;

attach = require("../core/methods/attach.coffee");

axis = require("./methods/helpers/axis.coffee");

flash = require("./helpers/ui/message.js");

getSteps = require("./helpers/drawSteps.js");

print = require("../core/console/print.coffee");

container = require("./helpers/container.coffee");

validObject = require("../object/validate.coffee");

module.exports = function() {
  var vars;
  vars = {
    g: {
      apps: {}
    },
    types: {
      bar: require("./types/bar.coffee"),
      bubbles: require("./types/bubbles.coffee"),
      box: require("./types/box.coffee"),
      chart: require("./types/deprecated/chart.coffee"),
      geo_map: require("./types/geo_map.coffee"),
      line: require("./types/line.coffee"),
      network: require("./types/network.js"),
      paths: require("./types/paths.coffee"),
      pie: require("./types/pie.coffee"),
      rings: require("./types/rings.js"),
      scatter: require("./types/scatter.coffee"),
      stacked: require("./types/stacked.coffee"),
      table: require("./types/table.js"),
      tree_map: require("./types/tree_map.coffee")
    }
  };
  vars.self = function(selection) {
    selection.each(function() {
      var lastMessage, nextStep, runFunction, runStep, small_height, small_width, steps;
      vars.draw.frozen = true;
      vars.error.internal = null;
      if (!("timing" in vars.draw)) {
        vars.draw.timing = vars.timing.transitions;
      }
      if (vars.error.value) {
        vars.draw.timing = 0;
      }
      if (vars.container.changed) {
        container(vars);
      }
      small_width = vars.width.value <= vars.width.small;
      small_height = vars.height.value <= vars.height.small;
      vars.small = small_width || small_height;
      vars.width.viz = vars.width.value;
      vars.height.viz = vars.height.value;
      lastMessage = false;
      nextStep = function() {
        if (steps.length) {
          runStep();
        } else {
          if (vars.dev.value) {
            print.groupEnd();
            print.timeEnd("total draw time");
            print.log("\n");
          }
        }
      };
      runFunction = function(step, name) {
        name = name || "function";
        if (step[name] instanceof Array) {
          step[name].forEach(function(f) {
            f(vars, nextStep);
          });
        } else {
          if (typeof step[name] === "function") {
            step[name](vars, nextStep);
          }
        }
        if (!step.wait) {
          nextStep();
        }
      };
      runStep = function() {
        var message, run, same, step;
        step = steps.shift();
        same = vars.g.message && lastMessage === step.message;
        run = "check" in step ? step.check : true;
        if (typeof run === "function") {
          run = run(vars);
        }
        if (run) {
          if (!same) {
            if (vars.dev.value) {
              if (lastMessage !== false) {
                print.groupEnd();
              }
              print.group(step.message);
            }
            if (typeof vars.messages.value === "string") {
              lastMessage = vars.messages.value;
              message = vars.messages.value;
            } else {
              lastMessage = step.message;
              message = vars.format.value(step.message);
            }
            if (vars.draw.update) {
              flash(vars, message);
              if (vars.error.value) {
                runFunction(step);
              } else {
                setTimeout((function() {
                  return runFunction(step);
                }), 10);
              }
            } else {
              runFunction(step);
            }
          } else {
            runFunction(step);
          }
        } else {
          if ("otherwise" in step) {
            if (vars.error.value) {
              runFunction(step, "otherwise");
            } else {
              setTimeout((function() {
                return runFunction(step, "otherwise");
              }), 10);
            }
          } else {
            nextStep();
          }
        }
      };
      vars.messages.style.backup = vars.group && vars.group.attr("opacity") === "1" ? "small" : "large";
      steps = getSteps(vars);
      runStep();
    });
    return vars.self;
  };
  attach(vars, {
    active: require("./methods/active.coffee"),
    aggs: require("./methods/aggs.coffee"),
    attrs: require("./methods/attrs.coffee"),
    axes: require("./methods/axes.coffee"),
    background: require("./methods/background.coffee"),
    color: require("./methods/color.coffee"),
    cols: require("./methods/cols.js"),
    config: require("./methods/config.coffee"),
    container: require("./methods/container.coffee"),
    coords: require("./methods/coords.coffee"),
    csv: require("./methods/csv.coffee"),
    data: require("./methods/data.coffee"),
    depth: require("./methods/depth.coffee"),
    descs: require("./methods/descs.coffee"),
    dev: require("./methods/dev.coffee"),
    draw: require("./methods/draw.js"),
    edges: require("./methods/edges.js"),
    error: require("./methods/error.coffee"),
    focus: require("./methods/focus.coffee"),
    font: require("./methods/font.coffee"),
    footer: require("./methods/footer.coffee"),
    format: require("./methods/format.coffee"),
    height: require("./methods/height.coffee"),
    history: require("./methods/history.coffee"),
    icon: require("./methods/icon.coffee"),
    id: require("./methods/id.coffee"),
    labels: require("./methods/labels.coffee"),
    legend: require("./methods/legend.coffee"),
    links: require("./methods/links.coffee"),
    margin: require("./methods/margin.coffee"),
    messages: require("./methods/messages.coffee"),
    nodes: require("./methods/nodes.coffee"),
    order: require("./methods/order.coffee"),
    shape: require("./methods/shape.coffee"),
    size: require("./methods/size.coffee"),
    style: require("./methods/style.coffee"),
    temp: require("./methods/temp.coffee"),
    text: require("./methods/text.coffee"),
    time: require("./methods/time.coffee"),
    timeline: require("./methods/timeline.coffee"),
    timing: require("./methods/timing.coffee"),
    title: require("./methods/title.coffee"),
    tooltip: require("./methods/tooltip.coffee"),
    total: require("./methods/total.coffee"),
    type: require("./methods/type.coffee"),
    ui: require("./methods/ui.coffee"),
    width: require("./methods/width.coffee"),
    x: axis("x"),
    y: axis("y"),
    zoom: require("./methods/zoom.js")
  });
  return vars.self;
};



},{"../core/console/print.coffee":54,"../core/methods/attach.coffee":76,"../object/validate.coffee":166,"./helpers/container.coffee":205,"./helpers/drawSteps.js":206,"./helpers/ui/message.js":238,"./methods/active.coffee":247,"./methods/aggs.coffee":248,"./methods/attrs.coffee":249,"./methods/axes.coffee":250,"./methods/background.coffee":251,"./methods/color.coffee":252,"./methods/cols.js":253,"./methods/config.coffee":254,"./methods/container.coffee":255,"./methods/coords.coffee":256,"./methods/csv.coffee":257,"./methods/data.coffee":258,"./methods/depth.coffee":259,"./methods/descs.coffee":260,"./methods/dev.coffee":261,"./methods/draw.js":262,"./methods/edges.js":263,"./methods/error.coffee":264,"./methods/focus.coffee":265,"./methods/font.coffee":266,"./methods/footer.coffee":267,"./methods/format.coffee":268,"./methods/height.coffee":269,"./methods/helpers/axis.coffee":270,"./methods/history.coffee":271,"./methods/icon.coffee":272,"./methods/id.coffee":273,"./methods/labels.coffee":274,"./methods/legend.coffee":275,"./methods/links.coffee":276,"./methods/margin.coffee":277,"./methods/messages.coffee":278,"./methods/nodes.coffee":279,"./methods/order.coffee":280,"./methods/shape.coffee":281,"./methods/size.coffee":282,"./methods/style.coffee":283,"./methods/temp.coffee":284,"./methods/text.coffee":285,"./methods/time.coffee":286,"./methods/timeline.coffee":287,"./methods/timing.coffee":288,"./methods/title.coffee":289,"./methods/tooltip.coffee":290,"./methods/total.coffee":291,"./methods/type.coffee":292,"./methods/ui.coffee":293,"./methods/width.coffee":294,"./methods/zoom.js":295,"./types/bar.coffee":296,"./types/box.coffee":297,"./types/bubbles.coffee":298,"./types/deprecated/chart.coffee":299,"./types/geo_map.coffee":300,"./types/line.coffee":310,"./types/network.js":311,"./types/paths.coffee":312,"./types/pie.coffee":313,"./types/rings.js":314,"./types/scatter.coffee":315,"./types/stacked.coffee":316,"./types/table.js":317,"./types/tree_map.coffee":318}]},{},[1]);
