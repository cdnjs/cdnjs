
/*! otpauth v6.2.4 | (c) Héctor Molinero Fernández <hector@molinero.dev> | MIT | https://github.com/hectorm/otpauth */
/*! sjcl v1.0.8 | (c) bitwiseshiftleft | (BSD-2-Clause OR GPL-2.0-only) | https://github.com/bitwiseshiftleft/sjcl */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * An object containing some utilities.
 * @type {Object}
 */
var Utils = {
  /**
   * UInt conversion.
   * @type {Object}
   */
  uint: {
    /**
     * Converts an ArrayBuffer to an integer.
     * @param {ArrayBuffer} buf ArrayBuffer.
     * @returns {number} Integer.
     */
    fromBuf: function fromBuf(buf) {
      var arr = new Uint8Array(buf);
      var num = 0;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
          num *= 256;
          num += arr[i];
        }
      }

      return num;
    },

    /**
     * Converts an integer to an ArrayBuffer.
     * @param {number} num Integer.
     * @returns {ArrayBuffer} ArrayBuffer.
     */
    toBuf: function toBuf(num) {
      var buf = new ArrayBuffer(8);
      var arr = new Uint8Array(buf);
      var acc = num;

      for (var i = 7; i >= 0; i--) {
        if (acc === 0) break;
        arr[i] = acc & 255;
        acc -= arr[i];
        acc /= 256;
      }

      return buf;
    }
  },

  /**
   * Raw string conversion.
   * @type {Object}
   */
  raw: {
    /**
     * Converts an ArrayBuffer to a string.
     * @param {ArrayBuffer} buf ArrayBuffer.
     * @returns {string} String.
     */
    fromBuf: function fromBuf(buf) {
      var arr = new Uint8Array(buf);
      var str = '';

      for (var i = 0; i < arr.length; i++) {
        str += String.fromCharCode(arr[i]);
      }

      return str;
    },

    /**
     * Converts a string to an ArrayBuffer.
     * @param {string} str String.
     * @returns {ArrayBuffer} ArrayBuffer.
     */
    toBuf: function toBuf(str) {
      var buf = new ArrayBuffer(str.length);
      var arr = new Uint8Array(buf);

      for (var i = 0; i < str.length; i++) {
        arr[i] = str.charCodeAt(i);
      }

      return buf;
    }
  },

  /**
   * Base32 string conversion.
   * @type {Object}
   */
  b32: {
    /**
     * RFC 4648 base32 alphabet without pad.
     * @type {string}
     */
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',

    /**
     * Converts an ArrayBuffer to a base32 string (RFC 4648)
     * (https://github.com/LinusU/base32-encode).
     * @param {ArrayBuffer} buf ArrayBuffer.
     * @returns {string} Base32 string.
     */
    fromBuf: function fromBuf(buf) {
      var arr = new Uint8Array(buf);
      var bits = 0;
      var value = 0;
      var str = '';

      for (var i = 0; i < arr.length; i++) {
        value = value << 8 | arr[i];
        bits += 8;

        while (bits >= 5) {
          str += Utils.b32.alphabet[value >>> bits - 5 & 31];
          bits -= 5;
        }
      }

      if (bits > 0) {
        str += Utils.b32.alphabet[value << 5 - bits & 31];
      }

      return str;
    },

    /**
     * Converts a base32 string to an ArrayBuffer (RFC 4648)
     * (https://github.com/LinusU/base32-decode).
     * @param {string} str Base32 string.
     * @returns {ArrayBuffer} ArrayBuffer.
     */
    toBuf: function toBuf(str) {
      // Canonicalize to all upper case and remove padding if it exists.
      str = str.toUpperCase().replace(/=+$/, '');
      var buf = new ArrayBuffer(str.length * 5 / 8 | 0);
      var arr = new Uint8Array(buf);
      var bits = 0;
      var value = 0;
      var index = 0;

      for (var i = 0; i < str.length; i++) {
        var idx = Utils.b32.alphabet.indexOf(str[i]);
        if (idx === -1) throw new TypeError("Invalid character found: ".concat(str[i]));
        value = value << 5 | idx;
        bits += 5;

        if (bits >= 8) {
          arr[index++] = value >>> bits - 8 & 255;
          bits -= 8;
        }
      }

      return buf;
    }
  },

  /**
   * Hexadecimal string conversion.
   * @type {Object}
   */
  hex: {
    /**
     * Converts an ArrayBuffer to a hexadecimal string.
     * @param {ArrayBuffer} buf ArrayBuffer.
     * @returns {string} Hexadecimal string.
     */
    fromBuf: function fromBuf(buf) {
      var arr = new Uint8Array(buf);
      var str = '';

      for (var i = 0; i < arr.length; i++) {
        var hex = arr[i].toString(16);
        str += hex.length === 2 ? hex : "0".concat(hex);
      }

      return str.toUpperCase();
    },

    /**
     * Converts a hexadecimal string to an ArrayBuffer.
     * @param {string} str Hexadecimal string.
     * @returns {ArrayBuffer} ArrayBuffer.
     */
    toBuf: function toBuf(str) {
      var buf = new ArrayBuffer(str.length / 2);
      var arr = new Uint8Array(buf);

      for (var i = 0, j = 0; i < arr.length; i += 1, j += 2) {
        arr[i] = parseInt(str.substr(j, 2), 16);
      }

      return buf;
    }
  },

  /**
   * Pads a number with leading zeros.
   * @param {number|string} num Number.
   * @param {number} digits Digits.
   * @returns {string} Padded number.
   */
  pad: function pad(num, digits) {
    var prefix = '';
    var repeat = digits - String(num).length;

    while (repeat-- > 0) {
      prefix += '0';
    }

    return "".concat(prefix).concat(num);
  }
};
/**
 * An object containing some utilities (for internal use only).
 * @private
 * @type {Object}
 */

var InternalUtils = {
  /**
   * "globalThis" ponyfill
   * (https://mathiasbynens.be/notes/globalthis).
   * @type {Object}
   */
  get globalThis() {
    var _globalThis;
    /* eslint-disable no-extend-native, no-restricted-globals, no-undef */


    if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      _globalThis = globalThis;
    } else {
      Object.defineProperty(Object.prototype, '__magicalGlobalThis__', {
        get: function get() {
          return this;
        },
        configurable: true
      });

      try {
        _globalThis = __magicalGlobalThis__;
      } finally {
        delete Object.prototype.__magicalGlobalThis__;
      }
    }

    if (typeof _globalThis === 'undefined') {
      // Still unable to determine "globalThis", fall back to a naive method.
      if (typeof self !== 'undefined') {
        _globalThis = self;
      } else if (typeof window !== 'undefined') {
        _globalThis = window;
      } else if (typeof global !== 'undefined') {
        _globalThis = global;
      }
    }
    /* eslint-enable */


    Object.defineProperty(this, 'globalThis', {
      enumerable: true,
      value: _globalThis
    });
    return this.globalThis;
  },

  /**
   * "console" ponyfill.
   * @type {Object}
   */
  get console() {
    var _console = {};
    var methods = ['assert', 'clear', 'context', 'count', 'countReset', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeLog', 'timeStamp', 'trace', 'warn'];

    if (_typeof(InternalUtils.globalThis.console) === 'object') {
      var _iterator = _createForOfIteratorHelper(methods),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var method = _step.value;
          _console[method] = typeof InternalUtils.globalThis.console[method] === 'function' ? InternalUtils.globalThis.console[method] : function () {};
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      var _iterator2 = _createForOfIteratorHelper(methods),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _method = _step2.value;

          _console[_method] = function () {};
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    Object.defineProperty(this, 'console', {
      enumerable: true,
      value: _console
    });
    return this.console;
  },

  /**
   * Detect if running in "Node.js".
   * @type {boolean}
   */
  get isNode() {
    var _isNode = Object.prototype.toString.call(InternalUtils.globalThis.process) === '[object process]';

    Object.defineProperty(this, 'isNode', {
      enumerable: true,
      value: _isNode
    });
    return this.isNode;
  },

  /**
   * Dynamically import "Node.js" modules.
   * (`eval` is used to prevent bundlers from including the module,
   * e.g., [webpack/webpack#8826](https://github.com/webpack/webpack/issues/8826))
   * @type {Function}
   */
  get nodeRequire() {
    var _nodeRequire = InternalUtils.isNode // eslint-disable-next-line no-eval
    ? eval('require') : function () {};

    Object.defineProperty(this, 'nodeRequire', {
      enumerable: true,
      value: _nodeRequire
    });
    return this.nodeRequire;
  }

};

/** @fileOverview Javascript cryptography implementation.
 *
 * Crush to remove comments, shorten variable names and
 * generally reduce transmission size.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */
/*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */

/*global document, window, escape, unescape, module, require, Uint32Array */

/**
 * The Stanford Javascript Crypto Library, top-level namespace.
 * @namespace
 */

var sjcl = {
  /**
   * Symmetric ciphers.
   * @namespace
   */
  cipher: {},

  /**
   * Hash functions.  Right now only SHA256 is implemented.
   * @namespace
   */
  hash: {},

  /**
   * Key exchange functions.  Right now only SRP is implemented.
   * @namespace
   */
  keyexchange: {},

  /**
   * Cipher modes of operation.
   * @namespace
   */
  mode: {},

  /**
   * Miscellaneous.  HMAC and PBKDF2.
   * @namespace
   */
  misc: {},

  /**
   * Bit array encoders and decoders.
   * @namespace
   *
   * @description
   * The members of this namespace are functions which translate between
   * SJCL's bitArrays and other objects (usually strings).  Because it
   * isn't always clear which direction is encoding and which is decoding,
   * the method names are "fromBits" and "toBits".
   */
  codec: {},

  /**
   * Exceptions.
   * @namespace
   */
  exception: {
    /**
     * Ciphertext is corrupt.
     * @constructor
     */
    corrupt: function (message) {
      this.toString = function () {
        return "CORRUPT: " + this.message;
      };

      this.message = message;
    },

    /**
     * Invalid parameter.
     * @constructor
     */
    invalid: function (message) {
      this.toString = function () {
        return "INVALID: " + this.message;
      };

      this.message = message;
    },

    /**
     * Bug or missing feature in SJCL.
     * @constructor
     */
    bug: function (message) {
      this.toString = function () {
        return "BUG: " + this.message;
      };

      this.message = message;
    },

    /**
     * Something isn't ready.
     * @constructor
     */
    notReady: function (message) {
      this.toString = function () {
        return "NOT READY: " + this.message;
      };

      this.message = message;
    }
  }
};
/** @fileOverview Arrays of bits, encoded as arrays of Numbers.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/**
 * Arrays of bits, encoded as arrays of Numbers.
 * @namespace
 * @description
 * <p>
 * These objects are the currency accepted by SJCL's crypto functions.
 * </p>
 *
 * <p>
 * Most of our crypto primitives operate on arrays of 4-byte words internally,
 * but many of them can take arguments that are not a multiple of 4 bytes.
 * This library encodes arrays of bits (whose size need not be a multiple of 8
 * bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
 * array of words, 32 bits at a time.  Since the words are double-precision
 * floating point numbers, they fit some extra data.  We use this (in a private,
 * possibly-changing manner) to encode the number of bits actually  present
 * in the last word of the array.
 * </p>
 *
 * <p>
 * Because bitwise ops clear this out-of-band data, these arrays can be passed
 * to ciphers like AES which want arrays of words.
 * </p>
 */

sjcl.bitArray = {
  /**
   * Array slices in units of bits.
   * @param {bitArray} a The array to slice.
   * @param {Number} bstart The offset to the start of the slice, in bits.
   * @param {Number} bend The offset to the end of the slice, in bits.  If this is undefined,
   * slice until the end of the array.
   * @return {bitArray} The requested slice.
   */
  bitSlice: function (a, bstart, bend) {
    a = sjcl.bitArray._shiftRight(a.slice(bstart / 32), 32 - (bstart & 31)).slice(1);
    return bend === undefined ? a : sjcl.bitArray.clamp(a, bend - bstart);
  },

  /**
   * Extract a number packed into a bit array.
   * @param {bitArray} a The array to slice.
   * @param {Number} bstart The offset to the start of the slice, in bits.
   * @param {Number} blength The length of the number to extract.
   * @return {Number} The requested slice.
   */
  extract: function (a, bstart, blength) {
    // FIXME: this Math.floor is not necessary at all, but for some reason
    // seems to suppress a bug in the Chromium JIT.
    var x,
        sh = Math.floor(-bstart - blength & 31);

    if ((bstart + blength - 1 ^ bstart) & -32) {
      // it crosses a boundary
      x = a[bstart / 32 | 0] << 32 - sh ^ a[bstart / 32 + 1 | 0] >>> sh;
    } else {
      // within a single word
      x = a[bstart / 32 | 0] >>> sh;
    }

    return x & (1 << blength) - 1;
  },

  /**
   * Concatenate two bit arrays.
   * @param {bitArray} a1 The first array.
   * @param {bitArray} a2 The second array.
   * @return {bitArray} The concatenation of a1 and a2.
   */
  concat: function (a1, a2) {
    if (a1.length === 0 || a2.length === 0) {
      return a1.concat(a2);
    }

    var last = a1[a1.length - 1],
        shift = sjcl.bitArray.getPartial(last);

    if (shift === 32) {
      return a1.concat(a2);
    } else {
      return sjcl.bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
    }
  },

  /**
   * Find the length of an array of bits.
   * @param {bitArray} a The array.
   * @return {Number} The length of a, in bits.
   */
  bitLength: function (a) {
    var l = a.length,
        x;

    if (l === 0) {
      return 0;
    }

    x = a[l - 1];
    return (l - 1) * 32 + sjcl.bitArray.getPartial(x);
  },

  /**
   * Truncate an array.
   * @param {bitArray} a The array.
   * @param {Number} len The length to truncate to, in bits.
   * @return {bitArray} A new array, truncated to len bits.
   */
  clamp: function (a, len) {
    if (a.length * 32 < len) {
      return a;
    }

    a = a.slice(0, Math.ceil(len / 32));
    var l = a.length;
    len = len & 31;

    if (l > 0 && len) {
      a[l - 1] = sjcl.bitArray.partial(len, a[l - 1] & 0x80000000 >> len - 1, 1);
    }

    return a;
  },

  /**
   * Make a partial word for a bit array.
   * @param {Number} len The number of bits in the word.
   * @param {Number} x The bits.
   * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
   * @return {Number} The partial word.
   */
  partial: function (len, x, _end) {
    if (len === 32) {
      return x;
    }

    return (_end ? x | 0 : x << 32 - len) + len * 0x10000000000;
  },

  /**
   * Get the number of bits used by a partial word.
   * @param {Number} x The partial word.
   * @return {Number} The number of bits used by the partial word.
   */
  getPartial: function (x) {
    return Math.round(x / 0x10000000000) || 32;
  },

  /**
   * Compare two arrays for equality in a predictable amount of time.
   * @param {bitArray} a The first array.
   * @param {bitArray} b The second array.
   * @return {boolean} true if a == b; false otherwise.
   */
  equal: function (a, b) {
    if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b)) {
      return false;
    }

    var x = 0,
        i;

    for (i = 0; i < a.length; i++) {
      x |= a[i] ^ b[i];
    }

    return x === 0;
  },

  /** Shift an array right.
   * @param {bitArray} a The array to shift.
   * @param {Number} shift The number of bits to shift.
   * @param {Number} [carry=0] A byte to carry in
   * @param {bitArray} [out=[]] An array to prepend to the output.
   * @private
   */
  _shiftRight: function (a, shift, carry, out) {
    var i,
        last2 = 0,
        shift2;

    if (out === undefined) {
      out = [];
    }

    for (; shift >= 32; shift -= 32) {
      out.push(carry);
      carry = 0;
    }

    if (shift === 0) {
      return out.concat(a);
    }

    for (i = 0; i < a.length; i++) {
      out.push(carry | a[i] >>> shift);
      carry = a[i] << 32 - shift;
    }

    last2 = a.length ? a[a.length - 1] : 0;
    shift2 = sjcl.bitArray.getPartial(last2);
    out.push(sjcl.bitArray.partial(shift + shift2 & 31, shift + shift2 > 32 ? carry : out.pop(), 1));
    return out;
  },

  /** xor a block of 4 words together.
   * @private
   */
  _xor4: function (x, y) {
    return [x[0] ^ y[0], x[1] ^ y[1], x[2] ^ y[2], x[3] ^ y[3]];
  },

  /** byteswap a word array inplace.
   * (does not handle partial words)
   * @param {sjcl.bitArray} a word array
   * @return {sjcl.bitArray} byteswapped array
   */
  byteswapM: function (a) {
    var i,
        v,
        m = 0xff00;

    for (i = 0; i < a.length; ++i) {
      v = a[i];
      a[i] = v >>> 24 | v >>> 8 & m | (v & m) << 8 | v << 24;
    }

    return a;
  }
};
/** @fileOverview Bit array codec implementations.
 *
 * @author Marco Munizaga
 */
//patch arraybuffers if they don't exist

if (typeof ArrayBuffer === 'undefined') {
  (function (globals) {

    globals.ArrayBuffer = function () {};

    globals.DataView = function () {};
  })(undefined);
}
/**
 * ArrayBuffer
 * @namespace
 */


sjcl.codec.arrayBuffer = {
  /** Convert from a bitArray to an ArrayBuffer. 
   * Will default to 8byte padding if padding is undefined*/
  fromBits: function (arr, padding, padding_count) {
    var out, i, ol, tmp, smallest;
    padding = padding == undefined ? true : padding;
    padding_count = padding_count || 8;

    if (arr.length === 0) {
      return new ArrayBuffer(0);
    }

    ol = sjcl.bitArray.bitLength(arr) / 8; //check to make sure the bitLength is divisible by 8, if it isn't 
    //we can't do anything since arraybuffers work with bytes, not bits

    if (sjcl.bitArray.bitLength(arr) % 8 !== 0) {
      throw new sjcl.exception.invalid("Invalid bit size, must be divisble by 8 to fit in an arraybuffer correctly");
    }

    if (padding && ol % padding_count !== 0) {
      ol += padding_count - ol % padding_count;
    } //padded temp for easy copying


    tmp = new DataView(new ArrayBuffer(arr.length * 4));

    for (i = 0; i < arr.length; i++) {
      tmp.setUint32(i * 4, arr[i] << 32); //get rid of the higher bits
    } //now copy the final message if we are not going to 0 pad


    out = new DataView(new ArrayBuffer(ol)); //save a step when the tmp and out bytelength are ===

    if (out.byteLength === tmp.byteLength) {
      return tmp.buffer;
    }

    smallest = tmp.byteLength < out.byteLength ? tmp.byteLength : out.byteLength;

    for (i = 0; i < smallest; i++) {
      out.setUint8(i, tmp.getUint8(i));
    }

    return out.buffer;
  },

  /** Convert from an ArrayBuffer to a bitArray. */
  toBits: function (buffer) {
    var i,
        out = [],
        len,
        inView,
        tmp;

    if (buffer.byteLength === 0) {
      return [];
    }

    inView = new DataView(buffer);
    len = inView.byteLength - inView.byteLength % 4;

    for (var i = 0; i < len; i += 4) {
      out.push(inView.getUint32(i));
    }

    if (inView.byteLength % 4 != 0) {
      tmp = new DataView(new ArrayBuffer(4));

      for (var i = 0, l = inView.byteLength % 4; i < l; i++) {
        //we want the data to the right, because partial slices off the starting bits
        tmp.setUint8(i + 4 - l, inView.getUint8(len + i)); // big-endian, 
      }

      out.push(sjcl.bitArray.partial(inView.byteLength % 4 * 8, tmp.getUint32(0)));
    }

    return out;
  },

  /** Prints a hex output of the buffer contents, akin to hexdump **/
  hexDumpBuffer: function (buffer) {
    var stringBufferView = new DataView(buffer);
    var string = '';

    var pad = function (n, width) {
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    };

    for (var i = 0; i < stringBufferView.byteLength; i += 2) {
      if (i % 16 == 0) string += '\n' + i.toString(16) + '\t';
      string += pad(stringBufferView.getUint16(i).toString(16), 4) + ' ';
    }

    if (typeof console === undefined) {
      console = console || {
        log: function () {}
      }; //fix for IE
    }

    console.log(string.toUpperCase());
  }
};
/** @fileOverview Javascript SHA-1 implementation.
 *
 * Based on the implementation in RFC 3174, method 1, and on the SJCL
 * SHA-256 implementation.
 *
 * @author Quinn Slack
 */

/**
 * Context for a SHA-1 operation in progress.
 * @constructor
 */

sjcl.hash.sha1 = function (hash) {
  if (hash) {
    this._h = hash._h.slice(0);
    this._buffer = hash._buffer.slice(0);
    this._length = hash._length;
  } else {
    this.reset();
  }
};
/**
 * Hash a string or an array of words.
 * @static
 * @param {bitArray|String} data the data to hash.
 * @return {bitArray} The hash value, an array of 5 big-endian words.
 */


sjcl.hash.sha1.hash = function (data) {
  return new sjcl.hash.sha1().update(data).finalize();
};

sjcl.hash.sha1.prototype = {
  /**
   * The hash's block size, in bits.
   * @constant
   */
  blockSize: 512,

  /**
   * Reset the hash state.
   * @return this
   */
  reset: function () {
    this._h = this._init.slice(0);
    this._buffer = [];
    this._length = 0;
    return this;
  },

  /**
   * Input several words to the hash.
   * @param {bitArray|String} data the data to hash.
   * @return this
   */
  update: function (data) {
    if (typeof data === "string") {
      data = sjcl.codec.utf8String.toBits(data);
    }

    var i,
        b = this._buffer = sjcl.bitArray.concat(this._buffer, data),
        ol = this._length,
        nl = this._length = ol + sjcl.bitArray.bitLength(data);

    if (nl > 9007199254740991) {
      throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
    }

    if (typeof Uint32Array !== 'undefined') {
      var c = new Uint32Array(b);
      var j = 0;

      for (i = this.blockSize + ol - (this.blockSize + ol & this.blockSize - 1); i <= nl; i += this.blockSize) {
        this._block(c.subarray(16 * j, 16 * (j + 1)));

        j += 1;
      }

      b.splice(0, 16 * j);
    } else {
      for (i = this.blockSize + ol - (this.blockSize + ol & this.blockSize - 1); i <= nl; i += this.blockSize) {
        this._block(b.splice(0, 16));
      }
    }

    return this;
  },

  /**
   * Complete hashing and output the hash value.
   * @return {bitArray} The hash value, an array of 5 big-endian words. TODO
   */
  finalize: function () {
    var i,
        b = this._buffer,
        h = this._h; // Round out and push the buffer

    b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]); // Round out the buffer to a multiple of 16 words, less the 2 length words.

    for (i = b.length + 2; i & 15; i++) {
      b.push(0);
    } // append the length


    b.push(Math.floor(this._length / 0x100000000));
    b.push(this._length | 0);

    while (b.length) {
      this._block(b.splice(0, 16));
    }

    this.reset();
    return h;
  },

  /**
   * The SHA-1 initialization vector.
   * @private
   */
  _init: [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],

  /**
   * The SHA-1 hash key.
   * @private
   */
  _key: [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6],

  /**
   * The SHA-1 logical functions f(0), f(1), ..., f(79).
   * @private
   */
  _f: function (t, b, c, d) {
    if (t <= 19) {
      return b & c | ~b & d;
    } else if (t <= 39) {
      return b ^ c ^ d;
    } else if (t <= 59) {
      return b & c | b & d | c & d;
    } else if (t <= 79) {
      return b ^ c ^ d;
    }
  },

  /**
   * Circular left-shift operator.
   * @private
   */
  _S: function (n, x) {
    return x << n | x >>> 32 - n;
  },

  /**
   * Perform one cycle of SHA-1.
   * @param {Uint32Array|bitArray} words one block of words.
   * @private
   */
  _block: function (words) {
    var t,
        tmp,
        a,
        b,
        c,
        d,
        e,
        h = this._h;
    var w;

    if (typeof Uint32Array !== 'undefined') {
      // When words is passed to _block, it has 16 elements. SHA1 _block
      // function extends words with new elements (at the end there are 80 elements). 
      // The problem is that if we use Uint32Array instead of Array, 
      // the length of Uint32Array cannot be changed. Thus, we replace words with a 
      // normal Array here.
      w = Array(80); // do not use Uint32Array here as the instantiation is slower

      for (var j = 0; j < 16; j++) {
        w[j] = words[j];
      }
    } else {
      w = words;
    }

    a = h[0];
    b = h[1];
    c = h[2];
    d = h[3];
    e = h[4];

    for (t = 0; t <= 79; t++) {
      if (t >= 16) {
        w[t] = this._S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
      }

      tmp = this._S(5, a) + this._f(t, b, c, d) + e + w[t] + this._key[Math.floor(t / 20)] | 0;
      e = d;
      d = c;
      c = this._S(30, b);
      b = a;
      a = tmp;
    }

    h[0] = h[0] + a | 0;
    h[1] = h[1] + b | 0;
    h[2] = h[2] + c | 0;
    h[3] = h[3] + d | 0;
    h[4] = h[4] + e | 0;
  }
};
/** @fileOverview Javascript SHA-256 implementation.
 *
 * An older version of this implementation is available in the public
 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
 * Stanford University 2008-2010 and BSD-licensed for liability
 * reasons.
 *
 * Special thanks to Aldo Cortesi for pointing out several bugs in
 * this code.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/**
 * Context for a SHA-256 operation in progress.
 * @constructor
 */

sjcl.hash.sha256 = function (hash) {
  if (!this._key[0]) {
    this._precompute();
  }

  if (hash) {
    this._h = hash._h.slice(0);
    this._buffer = hash._buffer.slice(0);
    this._length = hash._length;
  } else {
    this.reset();
  }
};
/**
 * Hash a string or an array of words.
 * @static
 * @param {bitArray|String} data the data to hash.
 * @return {bitArray} The hash value, an array of 16 big-endian words.
 */


sjcl.hash.sha256.hash = function (data) {
  return new sjcl.hash.sha256().update(data).finalize();
};

sjcl.hash.sha256.prototype = {
  /**
   * The hash's block size, in bits.
   * @constant
   */
  blockSize: 512,

  /**
   * Reset the hash state.
   * @return this
   */
  reset: function () {
    this._h = this._init.slice(0);
    this._buffer = [];
    this._length = 0;
    return this;
  },

  /**
   * Input several words to the hash.
   * @param {bitArray|String} data the data to hash.
   * @return this
   */
  update: function (data) {
    if (typeof data === "string") {
      data = sjcl.codec.utf8String.toBits(data);
    }

    var i,
        b = this._buffer = sjcl.bitArray.concat(this._buffer, data),
        ol = this._length,
        nl = this._length = ol + sjcl.bitArray.bitLength(data);

    if (nl > 9007199254740991) {
      throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
    }

    if (typeof Uint32Array !== 'undefined') {
      var c = new Uint32Array(b);
      var j = 0;

      for (i = 512 + ol - (512 + ol & 511); i <= nl; i += 512) {
        this._block(c.subarray(16 * j, 16 * (j + 1)));

        j += 1;
      }

      b.splice(0, 16 * j);
    } else {
      for (i = 512 + ol - (512 + ol & 511); i <= nl; i += 512) {
        this._block(b.splice(0, 16));
      }
    }

    return this;
  },

  /**
   * Complete hashing and output the hash value.
   * @return {bitArray} The hash value, an array of 8 big-endian words.
   */
  finalize: function () {
    var i,
        b = this._buffer,
        h = this._h; // Round out and push the buffer

    b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]); // Round out the buffer to a multiple of 16 words, less the 2 length words.

    for (i = b.length + 2; i & 15; i++) {
      b.push(0);
    } // append the length


    b.push(Math.floor(this._length / 0x100000000));
    b.push(this._length | 0);

    while (b.length) {
      this._block(b.splice(0, 16));
    }

    this.reset();
    return h;
  },

  /**
   * The SHA-256 initialization vector, to be precomputed.
   * @private
   */
  _init: [],

  /*
  _init:[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19],
  */

  /**
   * The SHA-256 hash key, to be precomputed.
   * @private
   */
  _key: [],

  /*
  _key:
    [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
     0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
     0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
     0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
     0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
     0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
     0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
     0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2],
  */

  /**
   * Function to precompute _init and _key.
   * @private
   */
  _precompute: function () {
    var i = 0,
        prime = 2,
        factor,
        isPrime;

    function frac(x) {
      return (x - Math.floor(x)) * 0x100000000 | 0;
    }

    for (; i < 64; prime++) {
      isPrime = true;

      for (factor = 2; factor * factor <= prime; factor++) {
        if (prime % factor === 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime) {
        if (i < 8) {
          this._init[i] = frac(Math.pow(prime, 1 / 2));
        }

        this._key[i] = frac(Math.pow(prime, 1 / 3));
        i++;
      }
    }
  },

  /**
   * Perform one cycle of SHA-256.
   * @param {Uint32Array|bitArray} w one block of words.
   * @private
   */
  _block: function (w) {
    var i,
        tmp,
        a,
        b,
        h = this._h,
        k = this._key,
        h0 = h[0],
        h1 = h[1],
        h2 = h[2],
        h3 = h[3],
        h4 = h[4],
        h5 = h[5],
        h6 = h[6],
        h7 = h[7];
    /* Rationale for placement of |0 :
     * If a value can overflow is original 32 bits by a factor of more than a few
     * million (2^23 ish), there is a possibility that it might overflow the
     * 53-bit mantissa and lose precision.
     *
     * To avoid this, we clamp back to 32 bits by |'ing with 0 on any value that
     * propagates around the loop, and on the hash state h[].  I don't believe
     * that the clamps on h4 and on h0 are strictly necessary, but it's close
     * (for h4 anyway), and better safe than sorry.
     *
     * The clamps on h[] are necessary for the output to be correct even in the
     * common case and for short inputs.
     */

    for (i = 0; i < 64; i++) {
      // load up the input word for this round
      if (i < 16) {
        tmp = w[i];
      } else {
        a = w[i + 1 & 15];
        b = w[i + 14 & 15];
        tmp = w[i & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i & 15] + w[i + 9 & 15] | 0;
      }

      tmp = tmp + h7 + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7) + (h6 ^ h4 & (h5 ^ h6)) + k[i]; // | 0;
      // shift register

      h7 = h6;
      h6 = h5;
      h5 = h4;
      h4 = h3 + tmp | 0;
      h3 = h2;
      h2 = h1;
      h1 = h0;
      h0 = tmp + (h1 & h2 ^ h3 & (h1 ^ h2)) + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10) | 0;
    }

    h[0] = h[0] + h0 | 0;
    h[1] = h[1] + h1 | 0;
    h[2] = h[2] + h2 | 0;
    h[3] = h[3] + h3 | 0;
    h[4] = h[4] + h4 | 0;
    h[5] = h[5] + h5 | 0;
    h[6] = h[6] + h6 | 0;
    h[7] = h[7] + h7 | 0;
  }
};
/** @fileOverview Javascript SHA-512 implementation.
 *
 * This implementation was written for CryptoJS by Jeff Mott and adapted for
 * SJCL by Stefan Thomas.
 *
 * CryptoJS (c) 2009–2012 by Jeff Mott. All rights reserved.
 * Released with New BSD License
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 * @author Jeff Mott
 * @author Stefan Thomas
 */

/**
 * Context for a SHA-512 operation in progress.
 * @constructor
 */

sjcl.hash.sha512 = function (hash) {
  if (!this._key[0]) {
    this._precompute();
  }

  if (hash) {
    this._h = hash._h.slice(0);
    this._buffer = hash._buffer.slice(0);
    this._length = hash._length;
  } else {
    this.reset();
  }
};
/**
 * Hash a string or an array of words.
 * @static
 * @param {bitArray|String} data the data to hash.
 * @return {bitArray} The hash value, an array of 16 big-endian words.
 */


sjcl.hash.sha512.hash = function (data) {
  return new sjcl.hash.sha512().update(data).finalize();
};

sjcl.hash.sha512.prototype = {
  /**
   * The hash's block size, in bits.
   * @constant
   */
  blockSize: 1024,

  /**
   * Reset the hash state.
   * @return this
   */
  reset: function () {
    this._h = this._init.slice(0);
    this._buffer = [];
    this._length = 0;
    return this;
  },

  /**
   * Input several words to the hash.
   * @param {bitArray|String} data the data to hash.
   * @return this
   */
  update: function (data) {
    if (typeof data === "string") {
      data = sjcl.codec.utf8String.toBits(data);
    }

    var i,
        b = this._buffer = sjcl.bitArray.concat(this._buffer, data),
        ol = this._length,
        nl = this._length = ol + sjcl.bitArray.bitLength(data);

    if (nl > 9007199254740991) {
      throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
    }

    if (typeof Uint32Array !== 'undefined') {
      var c = new Uint32Array(b);
      var j = 0;

      for (i = 1024 + ol - (1024 + ol & 1023); i <= nl; i += 1024) {
        this._block(c.subarray(32 * j, 32 * (j + 1)));

        j += 1;
      }

      b.splice(0, 32 * j);
    } else {
      for (i = 1024 + ol - (1024 + ol & 1023); i <= nl; i += 1024) {
        this._block(b.splice(0, 32));
      }
    }

    return this;
  },

  /**
   * Complete hashing and output the hash value.
   * @return {bitArray} The hash value, an array of 16 big-endian words.
   */
  finalize: function () {
    var i,
        b = this._buffer,
        h = this._h; // Round out and push the buffer

    b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]); // Round out the buffer to a multiple of 32 words, less the 4 length words.

    for (i = b.length + 4; i & 31; i++) {
      b.push(0);
    } // append the length


    b.push(0);
    b.push(0);
    b.push(Math.floor(this._length / 0x100000000));
    b.push(this._length | 0);

    while (b.length) {
      this._block(b.splice(0, 32));
    }

    this.reset();
    return h;
  },

  /**
   * The SHA-512 initialization vector, to be precomputed.
   * @private
   */
  _init: [],

  /**
   * Least significant 24 bits of SHA512 initialization values.
   *
   * Javascript only has 53 bits of precision, so we compute the 40 most
   * significant bits and add the remaining 24 bits as constants.
   *
   * @private
   */
  _initr: [0xbcc908, 0xcaa73b, 0x94f82b, 0x1d36f1, 0xe682d1, 0x3e6c1f, 0x41bd6b, 0x7e2179],

  /*
  _init:
  [0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b, 0xa54ff53a, 0x5f1d36f1,
   0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179],
  */

  /**
   * The SHA-512 hash key, to be precomputed.
   * @private
   */
  _key: [],

  /**
   * Least significant 24 bits of SHA512 key values.
   * @private
   */
  _keyr: [0x28ae22, 0xef65cd, 0x4d3b2f, 0x89dbbc, 0x48b538, 0x05d019, 0x194f9b, 0x6d8118, 0x030242, 0x706fbe, 0xe4b28c, 0xffb4e2, 0x7b896f, 0x1696b1, 0xc71235, 0x692694, 0xf14ad2, 0x4f25e3, 0x8cd5b5, 0xac9c65, 0x2b0275, 0xa6e483, 0x41fbd4, 0x1153b5, 0x66dfab, 0xb43210, 0xfb213f, 0xef0ee4, 0xa88fc2, 0x0aa725, 0x03826f, 0x0e6e70, 0xd22ffc, 0x26c926, 0xc42aed, 0x95b3df, 0xaf63de, 0x77b2a8, 0xedaee6, 0x82353b, 0xf10364, 0x423001, 0xf89791, 0x54be30, 0xef5218, 0x65a910, 0x71202a, 0xbbd1b8, 0xd2d0c8, 0x41ab53, 0x8eeb99, 0x9b48a8, 0xc95a63, 0x418acb, 0x63e373, 0xb2b8a3, 0xefb2fc, 0x172f60, 0xf0ab72, 0x6439ec, 0x631e28, 0x82bde9, 0xc67915, 0x72532b, 0x26619c, 0xc0c207, 0xe0eb1e, 0x6ed178, 0x176fba, 0xc898a6, 0xf90dae, 0x1c471b, 0x047d84, 0xc72493, 0xc9bebc, 0x100d4c, 0x3e42b6, 0x657e2a, 0xd6faec, 0x475817],

  /*
  _key:
  [0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
   0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
   0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
   0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
   0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
   0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
   0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
   0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
   0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
   0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
   0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
   0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
   0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
   0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
   0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
   0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
   0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
   0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
   0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
   0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817],
  */

  /**
   * Function to precompute _init and _key.
   * @private
   */
  _precompute: function () {
    // XXX: This code is for precomputing the SHA256 constants, change for
    //      SHA512 and re-enable.
    var i = 0,
        prime = 2,
        factor,
        isPrime;

    function frac(x) {
      return (x - Math.floor(x)) * 0x100000000 | 0;
    }

    function frac2(x) {
      return (x - Math.floor(x)) * 0x10000000000 & 0xff;
    }

    for (; i < 80; prime++) {
      isPrime = true;

      for (factor = 2; factor * factor <= prime; factor++) {
        if (prime % factor === 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime) {
        if (i < 8) {
          this._init[i * 2] = frac(Math.pow(prime, 1 / 2));
          this._init[i * 2 + 1] = frac2(Math.pow(prime, 1 / 2)) << 24 | this._initr[i];
        }

        this._key[i * 2] = frac(Math.pow(prime, 1 / 3));
        this._key[i * 2 + 1] = frac2(Math.pow(prime, 1 / 3)) << 24 | this._keyr[i];
        i++;
      }
    }
  },

  /**
   * Perform one cycle of SHA-512.
   * @param {Uint32Array|bitArray} words one block of words.
   * @private
   */
  _block: function (words) {
    var i,
        wrh,
        wrl,
        h = this._h,
        k = this._key,
        h0h = h[0],
        h0l = h[1],
        h1h = h[2],
        h1l = h[3],
        h2h = h[4],
        h2l = h[5],
        h3h = h[6],
        h3l = h[7],
        h4h = h[8],
        h4l = h[9],
        h5h = h[10],
        h5l = h[11],
        h6h = h[12],
        h6l = h[13],
        h7h = h[14],
        h7l = h[15];
    var w;

    if (typeof Uint32Array !== 'undefined') {
      // When words is passed to _block, it has 32 elements. SHA512 _block
      // function extends words with new elements (at the end there are 160 elements). 
      // The problem is that if we use Uint32Array instead of Array, 
      // the length of Uint32Array cannot be changed. Thus, we replace words with a 
      // normal Array here.
      w = Array(160); // do not use Uint32Array here as the instantiation is slower

      for (var j = 0; j < 32; j++) {
        w[j] = words[j];
      }
    } else {
      w = words;
    } // Working variables


    var ah = h0h,
        al = h0l,
        bh = h1h,
        bl = h1l,
        ch = h2h,
        cl = h2l,
        dh = h3h,
        dl = h3l,
        eh = h4h,
        el = h4l,
        fh = h5h,
        fl = h5l,
        gh = h6h,
        gl = h6l,
        hh = h7h,
        hl = h7l;

    for (i = 0; i < 80; i++) {
      // load up the input word for this round
      if (i < 16) {
        wrh = w[i * 2];
        wrl = w[i * 2 + 1];
      } else {
        // Gamma0
        var gamma0xh = w[(i - 15) * 2];
        var gamma0xl = w[(i - 15) * 2 + 1];
        var gamma0h = (gamma0xl << 31 | gamma0xh >>> 1) ^ (gamma0xl << 24 | gamma0xh >>> 8) ^ gamma0xh >>> 7;
        var gamma0l = (gamma0xh << 31 | gamma0xl >>> 1) ^ (gamma0xh << 24 | gamma0xl >>> 8) ^ (gamma0xh << 25 | gamma0xl >>> 7); // Gamma1

        var gamma1xh = w[(i - 2) * 2];
        var gamma1xl = w[(i - 2) * 2 + 1];
        var gamma1h = (gamma1xl << 13 | gamma1xh >>> 19) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
        var gamma1l = (gamma1xh << 13 | gamma1xl >>> 19) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xh << 26 | gamma1xl >>> 6); // Shortcuts

        var wr7h = w[(i - 7) * 2];
        var wr7l = w[(i - 7) * 2 + 1];
        var wr16h = w[(i - 16) * 2];
        var wr16l = w[(i - 16) * 2 + 1]; // W(round) = gamma0 + W(round - 7) + gamma1 + W(round - 16)

        wrl = gamma0l + wr7l;
        wrh = gamma0h + wr7h + (wrl >>> 0 < gamma0l >>> 0 ? 1 : 0);
        wrl += gamma1l;
        wrh += gamma1h + (wrl >>> 0 < gamma1l >>> 0 ? 1 : 0);
        wrl += wr16l;
        wrh += wr16h + (wrl >>> 0 < wr16l >>> 0 ? 1 : 0);
      }

      w[i * 2] = wrh |= 0;
      w[i * 2 + 1] = wrl |= 0; // Ch

      var chh = eh & fh ^ ~eh & gh;
      var chl = el & fl ^ ~el & gl; // Maj

      var majh = ah & bh ^ ah & ch ^ bh & ch;
      var majl = al & bl ^ al & cl ^ bl & cl; // Sigma0

      var sigma0h = (al << 4 | ah >>> 28) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
      var sigma0l = (ah << 4 | al >>> 28) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7); // Sigma1

      var sigma1h = (el << 18 | eh >>> 14) ^ (el << 14 | eh >>> 18) ^ (eh << 23 | el >>> 9);
      var sigma1l = (eh << 18 | el >>> 14) ^ (eh << 14 | el >>> 18) ^ (el << 23 | eh >>> 9); // K(round)

      var krh = k[i * 2];
      var krl = k[i * 2 + 1]; // t1 = h + sigma1 + ch + K(round) + W(round)

      var t1l = hl + sigma1l;
      var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
      t1l += chl;
      t1h += chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
      t1l += krl;
      t1h += krh + (t1l >>> 0 < krl >>> 0 ? 1 : 0);
      t1l = t1l + wrl | 0; // FF32..FF34 perf issue https://bugzilla.mozilla.org/show_bug.cgi?id=1054972

      t1h += wrh + (t1l >>> 0 < wrl >>> 0 ? 1 : 0); // t2 = sigma0 + maj

      var t2l = sigma0l + majl;
      var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0); // Update working variables

      hh = gh;
      hl = gl;
      gh = fh;
      gl = fl;
      fh = eh;
      fl = el;
      el = dl + t1l | 0;
      eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dh = ch;
      dl = cl;
      ch = bh;
      cl = bl;
      bh = ah;
      bl = al;
      al = t1l + t2l | 0;
      ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
    } // Intermediate hash


    h0l = h[1] = h0l + al | 0;
    h[0] = h0h + ah + (h0l >>> 0 < al >>> 0 ? 1 : 0) | 0;
    h1l = h[3] = h1l + bl | 0;
    h[2] = h1h + bh + (h1l >>> 0 < bl >>> 0 ? 1 : 0) | 0;
    h2l = h[5] = h2l + cl | 0;
    h[4] = h2h + ch + (h2l >>> 0 < cl >>> 0 ? 1 : 0) | 0;
    h3l = h[7] = h3l + dl | 0;
    h[6] = h3h + dh + (h3l >>> 0 < dl >>> 0 ? 1 : 0) | 0;
    h4l = h[9] = h4l + el | 0;
    h[8] = h4h + eh + (h4l >>> 0 < el >>> 0 ? 1 : 0) | 0;
    h5l = h[11] = h5l + fl | 0;
    h[10] = h5h + fh + (h5l >>> 0 < fl >>> 0 ? 1 : 0) | 0;
    h6l = h[13] = h6l + gl | 0;
    h[12] = h6h + gh + (h6l >>> 0 < gl >>> 0 ? 1 : 0) | 0;
    h7l = h[15] = h7l + hl | 0;
    h[14] = h7h + hh + (h7l >>> 0 < hl >>> 0 ? 1 : 0) | 0;
  }
};
/** @fileOverview HMAC implementation.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/** HMAC with the specified hash function.
 * @constructor
 * @param {bitArray} key the key for HMAC.
 * @param {Object} [Hash=sjcl.hash.sha256] The hash function to use.
 */

sjcl.misc.hmac = function (key, Hash) {
  this._hash = Hash = Hash || sjcl.hash.sha256;
  var exKey = [[], []],
      i,
      bs = Hash.prototype.blockSize / 32;
  this._baseHash = [new Hash(), new Hash()];

  if (key.length > bs) {
    key = Hash.hash(key);
  }

  for (i = 0; i < bs; i++) {
    exKey[0][i] = key[i] ^ 0x36363636;
    exKey[1][i] = key[i] ^ 0x5C5C5C5C;
  }

  this._baseHash[0].update(exKey[0]);

  this._baseHash[1].update(exKey[1]);

  this._resultHash = new Hash(this._baseHash[0]);
};
/** HMAC with the specified hash function.  Also called encrypt since it's a prf.
 * @param {bitArray|String} data The data to mac.
 */


sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (data) {
  if (!this._updated) {
    this.update(data);
    return this.digest(data);
  } else {
    throw new sjcl.exception.invalid("encrypt on already updated hmac called!");
  }
};

sjcl.misc.hmac.prototype.reset = function () {
  this._resultHash = new this._hash(this._baseHash[0]);
  this._updated = false;
};

sjcl.misc.hmac.prototype.update = function (data) {
  this._updated = true;

  this._resultHash.update(data);
};

sjcl.misc.hmac.prototype.digest = function () {
  var w = this._resultHash.finalize(),
      result = new this._hash(this._baseHash[1]).update(w).finalize();

  this.reset();
  return result;
};

// eslint-disable-next-line import/no-extraneous-dependencies
var randomBytes;
var hmacDigest;
var timingSafeEqual;

if (InternalUtils.isNode) {
  var NodeBuffer = InternalUtils.globalThis.Buffer;
  var NodeCrypto = InternalUtils.nodeRequire('crypto');

  randomBytes = function randomBytes(size) {
    var bytes = NodeCrypto.randomBytes(size);
    return bytes.buffer;
  };

  hmacDigest = function hmacDigest(algorithm, key, message) {
    var hmac = NodeCrypto.createHmac(algorithm, NodeBuffer.from(key));
    hmac.update(NodeBuffer.from(message));
    return hmac.digest().buffer;
  };

  timingSafeEqual = function timingSafeEqual(a, b) {
    return NodeCrypto.timingSafeEqual(NodeBuffer.from(a), NodeBuffer.from(b));
  };
} else {
  var BrowserCrypto = InternalUtils.globalThis.crypto || InternalUtils.globalThis.msCrypto;
  var getRandomValues;

  if (typeof BrowserCrypto !== 'undefined' && typeof BrowserCrypto.getRandomValues === 'function') {
    getRandomValues = function getRandomValues(array) {
      BrowserCrypto.getRandomValues(array);
    };
  } else {
    InternalUtils.console.warn('Cryptography API not available, falling back to \'Math.random\'...');

    getRandomValues = function getRandomValues(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    };
  }

  randomBytes = function randomBytes(size) {
    var bytes = new Uint8Array(size);
    getRandomValues(bytes);
    return bytes.buffer;
  };

  hmacDigest = function hmacDigest(algorithm, key, message) {
    var hash = sjcl.hash[algorithm.toLowerCase()];

    if (typeof hash === 'undefined') {
      throw new TypeError('Unknown hash function');
    } // eslint-disable-next-line new-cap


    var hmac = new sjcl.misc.hmac(sjcl.codec.arrayBuffer.toBits(key), hash);
    hmac.update(sjcl.codec.arrayBuffer.toBits(message));
    return sjcl.codec.arrayBuffer.fromBits(hmac.digest(), false);
  };

  timingSafeEqual = function timingSafeEqual(a, b) {
    if (a.length !== b.length) {
      throw new TypeError('Input strings must have the same length');
    }

    var i = -1;
    var out = 0;

    while (++i < a.length) {
      out |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return out === 0;
  };
}
/**
 * An object containing some cryptography functions with dirty workarounds for Node.js and browsers.
 * @private
 * @type {Object}
 */


var Crypto = {
  /**
   * Returns random bytes.
   * @param {number} size Size.
   * @returns {ArrayBuffer} Random bytes.
   */
  randomBytes: randomBytes,

  /**
   * Calculates an HMAC digest.
   * In Node.js, the command `openssl list -digest-algorithms` displays the available digest algorithms.
   * @param {string} algorithm Algorithm.
   * @param {ArrayBuffer} key Key.
   * @param {ArrayBuffer} message Message.
   * @returns {ArrayBuffer} Digest.
   */
  hmacDigest: hmacDigest,

  /**
   * Returns true if a is equal to b, without leaking timing information that would allow an attacker to guess one of the values.
   * @param {string} a String a.
   * @param {string} b String b.
   * @returns {boolean} Equality result.
   */
  timingSafeEqual: timingSafeEqual
};

/**
 * Secret key object.
 * @param {Object} [config] Configuration options.
 * @param {ArrayBuffer} [config.buffer=Crypto.randomBytes] Secret key.
 * @param {number} [config.size=20] Number of random bytes to generate, ignored if 'buffer' is provided.
 */

var Secret = /*#__PURE__*/function () {
  function Secret() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        buffer = _ref.buffer,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 20 : _ref$size;

    _classCallCheck(this, Secret);

    /**
     * Secret key.
     * @type {ArrayBuffer}
     */
    this.buffer = typeof buffer === 'undefined' ? Crypto.randomBytes(size) : buffer;
  }
  /**
   * Converts a raw string to a Secret object.
   * @param {string} str Raw string.
   * @returns {Secret} Secret object.
   */


  _createClass(Secret, [{
    key: "raw",
    get:
    /**
     * String representation of secret key.
     * @type {string}
     */
    function get() {
      Object.defineProperty(this, 'raw', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Utils.raw.fromBuf(this.buffer)
      });
      return this.raw;
    }
    /**
     * Base32 representation of secret key.
     * @type {string}
     */

  }, {
    key: "b32",
    get: function get() {
      Object.defineProperty(this, 'b32', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Utils.b32.fromBuf(this.buffer)
      });
      return this.b32;
    }
    /**
     * Hexadecimal representation of secret key.
     * @type {string}
     */

  }, {
    key: "hex",
    get: function get() {
      Object.defineProperty(this, 'hex', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Utils.hex.fromBuf(this.buffer)
      });
      return this.hex;
    }
  }], [{
    key: "fromRaw",
    value: function fromRaw(str) {
      return new Secret({
        buffer: Utils.raw.toBuf(str)
      });
    }
    /**
     * Converts a base32 string to a Secret object.
     * @param {string} str Base32 string.
     * @returns {Secret} Secret object.
     */

  }, {
    key: "fromB32",
    value: function fromB32(str) {
      return new Secret({
        buffer: Utils.b32.toBuf(str)
      });
    }
    /**
     * Converts a hexadecimal string to a Secret object.
     * @param {string} str Hexadecimal string.
     * @returns {Secret} Secret object.
     */

  }, {
    key: "fromHex",
    value: function fromHex(str) {
      return new Secret({
        buffer: Utils.hex.toBuf(str)
      });
    }
  }]);

  return Secret;
}();

/**
 * Default configuration.
 * @private
 * @type {Object}
 */

var defaults = {
  issuer: '',
  label: 'OTPAuth',
  algorithm: 'SHA1',
  digits: 6,
  counter: 0,
  period: 30,
  window: 1
};
/**
 * HOTP: An HMAC-based One-time Password Algorithm (RFC 4226)
 * (https://tools.ietf.org/html/rfc4226).
 * @param {Object} [config] Configuration options.
 * @param {string} [config.issuer=''] Account provider.
 * @param {string} [config.label='OTPAuth'] Account label.
 * @param {Secret|string} [config.secret=Secret] Secret key.
 * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
 * @param {number} [config.digits=6] Token length.
 * @param {number} [config.counter=0] Initial counter value.
 */

var HOTP = /*#__PURE__*/function () {
  function HOTP() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$issuer = _ref.issuer,
        issuer = _ref$issuer === void 0 ? defaults.issuer : _ref$issuer,
        _ref$label = _ref.label,
        label = _ref$label === void 0 ? defaults.label : _ref$label,
        _ref$secret = _ref.secret,
        secret = _ref$secret === void 0 ? new Secret() : _ref$secret,
        _ref$algorithm = _ref.algorithm,
        algorithm = _ref$algorithm === void 0 ? defaults.algorithm : _ref$algorithm,
        _ref$digits = _ref.digits,
        digits = _ref$digits === void 0 ? defaults.digits : _ref$digits,
        _ref$counter = _ref.counter,
        counter = _ref$counter === void 0 ? defaults.counter : _ref$counter;

    _classCallCheck(this, HOTP);

    /**
     * Account provider.
     * @type {string}
     */
    this.issuer = issuer;
    /**
     * Account label.
     * @type {string}
     */

    this.label = label;
    /**
     * Secret key.
     * @type {Secret}
     */

    this.secret = typeof secret === 'string' ? Secret.fromB32(secret) : secret;
    /**
     * HMAC hashing algorithm.
     * @type {string}
     */

    this.algorithm = algorithm;
    /**
     * Token length.
     * @type {number}
     */

    this.digits = digits;
    /**
     * Initial counter value.
     * @type {number}
     */

    this.counter = counter;
  }
  /**
   * Generates an HOTP token.
   * @param {Object} config Configuration options.
   * @param {Secret} config.secret Secret key.
   * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
   * @param {number} [config.digits=6] Token length.
   * @param {number} [config.counter=0] Counter value.
   * @returns {string} Token.
   */


  _createClass(HOTP, [{
    key: "generate",
    value:
    /**
     * Generates an HOTP token.
     * @param {Object} [config] Configuration options.
     * @param {number} [config.counter=this.counter++] Counter value.
     * @returns {string} Token.
     */
    function generate() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$counter = _ref2.counter,
          counter = _ref2$counter === void 0 ? this.counter++ : _ref2$counter;

      return HOTP.generate({
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        counter: counter
      });
    }
    /**
     * Validates an HOTP token.
     * @param {Object} config Configuration options.
     * @param {string} config.token Token value.
     * @param {Secret} config.secret Secret key.
     * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
     * @param {number} config.digits Token length.
     * @param {number} [config.counter=0] Counter value.
     * @param {number} [config.window=1] Window of counter values to test.
     * @returns {number|null} Token delta, or null if the token is not found.
     */

  }, {
    key: "validate",
    value:
    /**
     * Validates an HOTP token.
     * @param {Object} config Configuration options.
     * @param {string} config.token Token value.
     * @param {number} [config.counter=this.counter] Counter value.
     * @param {number} [config.window=1] Window of counter values to test.
     * @returns {number|null} Token delta, or null if the token is not found.
     */
    function validate(_ref3) {
      var token = _ref3.token,
          _ref3$counter = _ref3.counter,
          counter = _ref3$counter === void 0 ? this.counter : _ref3$counter,
          window = _ref3.window;
      return HOTP.validate({
        token: token,
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        counter: counter,
        window: window
      });
    }
    /**
     * Returns a Google Authenticator key URI.
     * @returns {string} URI.
     */

  }, {
    key: "toString",
    value: function toString() {
      var e = encodeURIComponent;
      return 'otpauth://hotp/' + "".concat(this.issuer.length > 0 ? "".concat(e(this.issuer), ":").concat(e(this.label), "?issuer=").concat(e(this.issuer), "&") : "".concat(e(this.label), "?")) + "secret=".concat(e(this.secret.b32), "&") + "algorithm=".concat(e(this.algorithm), "&") + "digits=".concat(e(this.digits), "&") + "counter=".concat(e(this.counter));
    }
  }], [{
    key: "generate",
    value: function generate(_ref4) {
      var secret = _ref4.secret,
          _ref4$algorithm = _ref4.algorithm,
          algorithm = _ref4$algorithm === void 0 ? defaults.algorithm : _ref4$algorithm,
          _ref4$digits = _ref4.digits,
          digits = _ref4$digits === void 0 ? defaults.digits : _ref4$digits,
          _ref4$counter = _ref4.counter,
          counter = _ref4$counter === void 0 ? defaults.counter : _ref4$counter;
      var digest = new Uint8Array(Crypto.hmacDigest(algorithm, secret.buffer, Utils.uint.toBuf(counter)));
      var offset = digest[digest.byteLength - 1] & 15;
      var otp = ((digest[offset] & 127) << 24 | (digest[offset + 1] & 255) << 16 | (digest[offset + 2] & 255) << 8 | digest[offset + 3] & 255) % Math.pow(10, digits);
      return Utils.pad(otp, digits);
    }
  }, {
    key: "validate",
    value: function validate(_ref5) {
      var token = _ref5.token,
          secret = _ref5.secret,
          algorithm = _ref5.algorithm,
          digits = _ref5.digits,
          _ref5$counter = _ref5.counter,
          counter = _ref5$counter === void 0 ? defaults.counter : _ref5$counter,
          _ref5$window = _ref5.window,
          window = _ref5$window === void 0 ? defaults.window : _ref5$window;
      // Return early if the token length does not match the digit number.
      if (token.length !== digits) return null;
      var delta = null;

      for (var i = counter - window; i <= counter + window; ++i) {
        var generatedToken = HOTP.generate({
          secret: secret,
          algorithm: algorithm,
          digits: digits,
          counter: i
        });

        if (Crypto.timingSafeEqual(token, generatedToken)) {
          delta = i - counter;
        }
      }

      return delta;
    }
  }]);

  return HOTP;
}();
/**
 * TOTP: Time-Based One-Time Password Algorithm (RFC 6238)
 * (https://tools.ietf.org/html/rfc6238).
 * @param {Object} [config] Configuration options.
 * @param {string} [config.issuer=''] Account provider.
 * @param {string} [config.label='OTPAuth'] Account label.
 * @param {Secret|string} [config.secret=Secret] Secret key.
 * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
 * @param {number} [config.digits=6] Token length.
 * @param {number} [config.period=30] Token time-step duration.
 */

var TOTP = /*#__PURE__*/function () {
  function TOTP() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref6$issuer = _ref6.issuer,
        issuer = _ref6$issuer === void 0 ? defaults.issuer : _ref6$issuer,
        _ref6$label = _ref6.label,
        label = _ref6$label === void 0 ? defaults.label : _ref6$label,
        _ref6$secret = _ref6.secret,
        secret = _ref6$secret === void 0 ? new Secret() : _ref6$secret,
        _ref6$algorithm = _ref6.algorithm,
        algorithm = _ref6$algorithm === void 0 ? defaults.algorithm : _ref6$algorithm,
        _ref6$digits = _ref6.digits,
        digits = _ref6$digits === void 0 ? defaults.digits : _ref6$digits,
        _ref6$period = _ref6.period,
        period = _ref6$period === void 0 ? defaults.period : _ref6$period;

    _classCallCheck(this, TOTP);

    /**
     * Account provider.
     * @type {string}
     */
    this.issuer = issuer;
    /**
     * Account label.
     * @type {string}
     */

    this.label = label;
    /**
     * Secret key.
     * @type {Secret}
     */

    this.secret = typeof secret === 'string' ? Secret.fromB32(secret) : secret;
    /**
     * HMAC hashing algorithm.
     * @type {string}
     */

    this.algorithm = algorithm;
    /**
     * Token length.
     * @type {number}
     */

    this.digits = digits;
    /**
     * Token time-step duration.
     * @type {number}
     */

    this.period = period;
  }
  /**
   * Generates a TOTP token.
   * @param {Object} config Configuration options.
   * @param {Secret} config.secret Secret key.
   * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
   * @param {number} [config.digits=6] Token length.
   * @param {number} [config.period=30] Token time-step duration.
   * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
   * @returns {string} Token.
   */


  _createClass(TOTP, [{
    key: "generate",
    value:
    /**
     * Generates a TOTP token.
     * @param {Object} [config] Configuration options.
     * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
     * @returns {string} Token.
     */
    function generate() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref7$timestamp = _ref7.timestamp,
          timestamp = _ref7$timestamp === void 0 ? Date.now() : _ref7$timestamp;

      return TOTP.generate({
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        period: this.period,
        timestamp: timestamp
      });
    }
    /**
     * Validates a TOTP token.
     * @param {Object} config Configuration options.
     * @param {string} config.token Token value.
     * @param {Secret} config.secret Secret key.
     * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
     * @param {number} config.digits Token length.
     * @param {number} [config.period=30] Token time-step duration.
     * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
     * @param {number} [config.window=1] Window of counter values to test.
     * @returns {number|null} Token delta, or null if the token is not found.
     */

  }, {
    key: "validate",
    value:
    /**
     * Validates a TOTP token.
     * @param {Object} config Configuration options.
     * @param {string} config.token Token value.
     * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
     * @param {number} [config.window=1] Window of counter values to test.
     * @returns {number|null} Token delta, or null if the token is not found.
     */
    function validate(_ref8) {
      var token = _ref8.token,
          timestamp = _ref8.timestamp,
          window = _ref8.window;
      return TOTP.validate({
        token: token,
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        period: this.period,
        timestamp: timestamp,
        window: window
      });
    }
    /**
     * Returns a Google Authenticator key URI.
     * @returns {string} URI.
     */

  }, {
    key: "toString",
    value: function toString() {
      var e = encodeURIComponent;
      return 'otpauth://totp/' + "".concat(this.issuer.length > 0 ? "".concat(e(this.issuer), ":").concat(e(this.label), "?issuer=").concat(e(this.issuer), "&") : "".concat(e(this.label), "?")) + "secret=".concat(e(this.secret.b32), "&") + "algorithm=".concat(e(this.algorithm), "&") + "digits=".concat(e(this.digits), "&") + "period=".concat(e(this.period));
    }
  }], [{
    key: "generate",
    value: function generate(_ref9) {
      var secret = _ref9.secret,
          algorithm = _ref9.algorithm,
          digits = _ref9.digits,
          _ref9$period = _ref9.period,
          period = _ref9$period === void 0 ? defaults.period : _ref9$period,
          _ref9$timestamp = _ref9.timestamp,
          timestamp = _ref9$timestamp === void 0 ? Date.now() : _ref9$timestamp;
      return HOTP.generate({
        secret: secret,
        algorithm: algorithm,
        digits: digits,
        counter: Math.floor(timestamp / 1000 / period)
      });
    }
  }, {
    key: "validate",
    value: function validate(_ref10) {
      var token = _ref10.token,
          secret = _ref10.secret,
          algorithm = _ref10.algorithm,
          digits = _ref10.digits,
          _ref10$period = _ref10.period,
          period = _ref10$period === void 0 ? defaults.period : _ref10$period,
          _ref10$timestamp = _ref10.timestamp,
          timestamp = _ref10$timestamp === void 0 ? Date.now() : _ref10$timestamp,
          window = _ref10.window;
      return HOTP.validate({
        token: token,
        secret: secret,
        algorithm: algorithm,
        digits: digits,
        counter: Math.floor(timestamp / 1000 / period),
        window: window
      });
    }
  }]);

  return TOTP;
}();

/**
 * Key URI regex.
 *   otpauth://TYPE/[ISSUER:]LABEL?PARAMETERS
 * @private
 * @type {RegExp}
 */

var OTPURI_REGEX = /^otpauth:\/\/([ht]otp)\/(.+)\?((?:&?[A-Z0-9.~_-]+=[^&]*)+)$/i;
/**
 * RFC 4648 base32 alphabet with pad.
 * @private
 * @type {string}
 */

var SECRET_REGEX = /^[2-7A-Z]+=*$/i;
/**
 * Regex for supported algorithms.
 * @private
 * @type {RegExp}
 */

var ALGORITHM_REGEX = /^SHA(?:1|256|512)$/i;
/**
 * Integer regex.
 * @private
 * @type {RegExp}
 */

var INTEGER_REGEX = /^[+-]?\d+$/;
/**
 * Positive integer regex.
 * @private
 * @type {RegExp}
 */

var POSITIVE_INTEGER_REGEX = /^\+?[1-9]\d*$/;
/**
 * HOTP/TOTP object/string conversion
 * (https://github.com/google/google-authenticator/wiki/Key-Uri-Format).
 */

var URI = /*#__PURE__*/function () {
  function URI() {
    _classCallCheck(this, URI);
  }

  _createClass(URI, null, [{
    key: "parse",
    value:
    /**
     * Parses a Google Authenticator key URI and returns an HOTP/TOTP object.
     * @param {string} uri Google Authenticator Key URI.
     * @returns {HOTP|TOTP} HOTP/TOTP object.
     */
    function parse(uri) {
      var uriGroups;

      try {
        uriGroups = uri.match(OTPURI_REGEX);
      } catch (error) {
        /* Handled below */
      }

      if (!Array.isArray(uriGroups)) {
        throw new URIError('Invalid URI format');
      } // Extract URI groups.


      var uriType = uriGroups[1].toLowerCase();
      var uriLabel = uriGroups[2].split(/:(.+)/, 2).map(decodeURIComponent);
      var uriParams = uriGroups[3].split('&').reduce(function (acc, cur) {
        var pairArr = cur.split(/=(.*)/, 2).map(decodeURIComponent);
        var pairKey = pairArr[0].toLowerCase();
        var pairVal = pairArr[1];
        var pairAcc = acc;
        pairAcc[pairKey] = pairVal;
        return pairAcc;
      }, {}); // 'OTP' will be instantiated with 'config' argument.

      var OTP;
      var config = {};

      if (uriType === 'hotp') {
        OTP = HOTP; // Counter: required

        if (typeof uriParams.counter !== 'undefined' && INTEGER_REGEX.test(uriParams.counter)) {
          config.counter = parseInt(uriParams.counter, 10);
        } else {
          throw new TypeError('Missing or invalid \'counter\' parameter');
        }
      } else if (uriType === 'totp') {
        OTP = TOTP; // Period: optional

        if (typeof uriParams.period !== 'undefined') {
          if (POSITIVE_INTEGER_REGEX.test(uriParams.period)) {
            config.period = parseInt(uriParams.period, 10);
          } else {
            throw new TypeError('Invalid \'period\' parameter');
          }
        }
      } else {
        throw new TypeError('Unknown OTP type');
      } // Label: required
      // Issuer: optional


      if (uriLabel.length === 2) {
        config.label = uriLabel[1];

        if (typeof uriParams.issuer === 'undefined') {
          config.issuer = uriLabel[0];
        } else if (uriParams.issuer === uriLabel[0]) {
          config.issuer = uriParams.issuer;
        } else {
          throw new TypeError('Invalid \'issuer\' parameter');
        }
      } else {
        config.label = uriLabel[0];

        if (typeof uriParams.issuer !== 'undefined') {
          config.issuer = uriParams.issuer;
        }
      } // Secret: required


      if (typeof uriParams.secret !== 'undefined' && SECRET_REGEX.test(uriParams.secret)) {
        config.secret = new Secret({
          buffer: Utils.b32.toBuf(uriParams.secret)
        });
      } else {
        throw new TypeError('Missing or invalid \'secret\' parameter');
      } // Algorithm: optional


      if (typeof uriParams.algorithm !== 'undefined') {
        if (ALGORITHM_REGEX.test(uriParams.algorithm)) {
          config.algorithm = uriParams.algorithm;
        } else {
          throw new TypeError('Invalid \'algorithm\' parameter');
        }
      } // Digits: optional


      if (typeof uriParams.digits !== 'undefined') {
        if (POSITIVE_INTEGER_REGEX.test(uriParams.digits)) {
          config.digits = parseInt(uriParams.digits, 10);
        } else {
          throw new TypeError('Invalid \'digits\' parameter');
        }
      }

      return new OTP(config);
    }
    /**
     * Converts an HOTP/TOTP object to a Google Authenticator key URI.
     * @param {HOTP|TOTP} otp HOTP/TOTP object.
     * @param {Object} [config] Configuration options.
     * @returns {string} Google Authenticator Key URI.
     */

  }, {
    key: "stringify",
    value: function stringify(otp) {
      if (otp instanceof HOTP || otp instanceof TOTP) {
        return otp.toString();
      }

      throw new TypeError('Invalid \'HOTP/TOTP\' object');
    }
  }]);

  return URI;
}();

/**
 * Library version.
 * @type {string}
 */
var version = '6.2.4';

exports.HOTP = HOTP;
exports.Secret = Secret;
exports.TOTP = TOTP;
exports.URI = URI;
exports.Utils = Utils;
exports.version = version;
