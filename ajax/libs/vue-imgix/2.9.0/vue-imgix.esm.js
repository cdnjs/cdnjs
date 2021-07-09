import Vue from 'vue';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { r = Reflect.decorate(decorators, target, key, desc); }
    else { for (var i = decorators.length - 1; i >= 0; i--) { if (d = decorators[i]) { r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r; } } }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var crypt = createCommonjsModule(function (module) {
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        { n[i] = crypt.endian(n[i]); }
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        { bytes.push(Math.floor(Math.random() * 256)); }
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        { words[b >>> 5] |= bytes[i] << (24 - b % 32); }
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        { bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF); }
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        { bytes.push(parseInt(hex.substr(c, 2), 16)); }
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          { if (i * 8 + j * 6 <= bytes.length * 8)
            { base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F)); }
          else
            { base64.push('='); } }
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) { continue; }
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();
});

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        { bytes.push(str.charCodeAt(i) & 0xFF); }
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        { str.push(String.fromCharCode(bytes[i])); }
      return str.join('');
    }
  }
};

var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

var md5 = createCommonjsModule(function (module) {
(function(){
  var crypt$1 = crypt,
      utf8 = charenc_1.utf8,
      isBuffer = isBuffer_1,
      bin = charenc_1.bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      { if (options && options.encoding === 'binary')
        { message = bin.stringToBytes(message); }
      else
        { message = utf8.stringToBytes(message); } }
    else if (isBuffer(message))
      { message = Array.prototype.slice.call(message, 0); }
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      { message = message.toString(); }
    // else, assume byte array already

    var m = crypt$1.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt$1.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      { throw new Error('Illegal argument ' + message); }

    var digestbytes = crypt$1.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt$1.bytesToHex(digestbytes);
  };

})();
});

/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
var version = '3.6.1';
/**
 * @deprecated use lowercase `version`.
 */
var VERSION$2 = version;
var _hasatob = typeof atob === 'function';
var _hasbtoa = typeof btoa === 'function';
var _hasBuffer = typeof Buffer === 'function';
var _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
var _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
var b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64chs = [].concat( b64ch );
var b64tab = (function (a) {
    var tab = {};
    a.forEach(function (c, i) { return tab[c] = i; });
    return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === 'function'
    ? Uint8Array.from.bind(Uint8Array)
    : function (it, fn) {
      if ( fn === void 0 ) fn = function (x) { return x; };

      return new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
};
var _mkUriSafe = function (src) { return src
    .replace(/[+\/]/g, function (m0) { return m0 == '+' ? '-' : '_'; })
    .replace(/=+$/m, ''); };
var _tidyB64 = function (s) { return s.replace(/[^A-Za-z0-9\+\/]/g, ''); };
/**
 * polyfill version of `btoa`
 */
var btoaPolyfill = function (bin) {
    // console.log('polyfilled');
    var u32, c0, c1, c2, asc = '';
    var pad = bin.length % 3;
    for (var i = 0; i < bin.length;) {
        if ((c0 = bin.charCodeAt(i++)) > 255 ||
            (c1 = bin.charCodeAt(i++)) > 255 ||
            (c2 = bin.charCodeAt(i++)) > 255)
            { throw new TypeError('invalid character found'); }
        u32 = (c0 << 16) | (c1 << 8) | c2;
        asc += b64chs[u32 >> 18 & 63]
            + b64chs[u32 >> 12 & 63]
            + b64chs[u32 >> 6 & 63]
            + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */
var _btoa = _hasbtoa ? function (bin) { return btoa(bin); }
    : _hasBuffer ? function (bin) { return Buffer.from(bin, 'binary').toString('base64'); }
        : btoaPolyfill;
var _fromUint8Array = _hasBuffer
    ? function (u8a) { return Buffer.from(u8a).toString('base64'); }
    : function (u8a) {
        // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
        var maxargs = 0x1000;
        var strs = [];
        for (var i = 0, l = u8a.length; i < l; i += maxargs) {
            strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(''));
    };
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
var fromUint8Array = function (u8a, urlsafe) {
  if ( urlsafe === void 0 ) urlsafe = false;

  return urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
};
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const utob = (src: string) => unescape(encodeURIComponent(src));
// reverting good old fationed regexp
var cb_utob = function (c) {
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c
            : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
                + _fromCC(0x80 | (cc & 0x3f)))
                : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                    + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                    + _fromCC(0x80 | (cc & 0x3f)));
    }
    else {
        var cc = 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
        return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
            + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
            + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
            + _fromCC(0x80 | (cc & 0x3f)));
    }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
var utob = function (u) { return u.replace(re_utob, cb_utob); };
//
var _encode = _hasBuffer
    ? function (s) { return Buffer.from(s, 'utf8').toString('base64'); }
    : _TE
        ? function (s) { return _fromUint8Array(_TE.encode(s)); }
        : function (s) { return _btoa(utob(s)); };
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
var encode$1 = function (src, urlsafe) {
  if ( urlsafe === void 0 ) urlsafe = false;

  return urlsafe
    ? _mkUriSafe(_encode(src))
    : _encode(src);
};
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
var encodeURI$1 = function (src) { return encode$1(src, true); };
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = function (cccc) {
    switch (cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                | ((0x3f & cccc.charCodeAt(1)) << 12)
                | ((0x3f & cccc.charCodeAt(2)) << 6)
                | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
            return (_fromCC((offset >>> 10) + 0xD800)
                + _fromCC((offset & 0x3FF) + 0xDC00));
        case 3:
            return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                | (0x3f & cccc.charCodeAt(2)));
        default:
            return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                | (0x3f & cccc.charCodeAt(1)));
    }
};
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
var btou = function (b) { return b.replace(re_btou, cb_btou); };
/**
 * polyfill version of `atob`
 */
var atobPolyfill = function (asc) {
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc))
        { throw new TypeError('malformed base64.'); }
    asc += '=='.slice(2 - (asc.length & 3));
    var u24, bin = '', r1, r2;
    for (var i = 0; i < asc.length;) {
        u24 = b64tab[asc.charAt(i++)] << 18
            | b64tab[asc.charAt(i++)] << 12
            | (r1 = b64tab[asc.charAt(i++)]) << 6
            | (r2 = b64tab[asc.charAt(i++)]);
        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
            : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
};
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
var _atob = _hasatob ? function (asc) { return atob(_tidyB64(asc)); }
    : _hasBuffer ? function (asc) { return Buffer.from(asc, 'base64').toString('binary'); }
        : atobPolyfill;
//
var _toUint8Array = _hasBuffer
    ? function (a) { return _U8Afrom(Buffer.from(a, 'base64')); }
    : function (a) { return _U8Afrom(_atob(a), function (c) { return c.charCodeAt(0); }); };
/**
 * converts a Base64 string to a Uint8Array.
 */
var toUint8Array = function (a) { return _toUint8Array(_unURI(a)); };
//
var _decode = _hasBuffer
    ? function (a) { return Buffer.from(a, 'base64').toString('utf8'); }
    : _TD
        ? function (a) { return _TD.decode(_toUint8Array(a)); }
        : function (a) { return btou(_atob(a)); };
var _unURI = function (a) { return _tidyB64(a.replace(/[-_]/g, function (m0) { return m0 == '-' ? '+' : '/'; })); };
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
var decode$1 = function (src) { return _decode(_unURI(src)); };
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
  */
var isValid = function (src) {
    if (typeof src !== 'string')
        { return false; }
    var s = src.replace(/\s+/g, '').replace(/=+$/, '');
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
//
var _noEnum = function (v) {
    return {
        value: v, enumerable: false, writable: true, configurable: true
    };
};
/**
 * extend String.prototype with relevant methods
 */
var extendString = function () {
    var _add = function (name, body) { return Object.defineProperty(String.prototype, name, _noEnum(body)); };
    _add('fromBase64', function () { return decode$1(this); });
    _add('toBase64', function (urlsafe) { return encode$1(this, urlsafe); });
    _add('toBase64URI', function () { return encode$1(this, true); });
    _add('toBase64URL', function () { return encode$1(this, true); });
    _add('toUint8Array', function () { return toUint8Array(this); });
};
/**
 * extend Uint8Array.prototype with relevant methods
 */
var extendUint8Array = function () {
    var _add = function (name, body) { return Object.defineProperty(Uint8Array.prototype, name, _noEnum(body)); };
    _add('toBase64', function (urlsafe) { return fromUint8Array(this, urlsafe); });
    _add('toBase64URI', function () { return fromUint8Array(this, true); });
    _add('toBase64URL', function () { return fromUint8Array(this, true); });
};
/**
 * extend Builtin prototypes with relevant methods
 */
var extendBuiltins = function () {
    extendString();
    extendUint8Array();
};
var gBase64 = {
    version: version,
    VERSION: VERSION$2,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode$1,
    toBase64: encode$1,
    encode: encode$1,
    encodeURI: encodeURI$1,
    encodeURL: encodeURI$1,
    utob: utob,
    btou: btou,
    decode: decode$1,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins,
};

var n = /[^\0-\x7E]/;
var t = /[\x2E\u3002\uFF0E\uFF61]/g;
var o = {overflow: "Overflow Error", "not-basic": "Illegal Input", "invalid-input": "Invalid Input"};
var e = Math.floor;
var r = String.fromCharCode;
function s(n2) {
  throw new RangeError(o[n2]);
}
var c = function(n2, t2) {
  return n2 + 22 + 75 * (n2 < 26) - ((t2 != 0) << 5);
};
var u = function(n2, t2, o2) {
  var r2 = 0;
  for (n2 = o2 ? e(n2 / 700) : n2 >> 1, n2 += e(n2 / t2); n2 > 455; r2 += 36) {
    n2 = e(n2 / 35);
  }
  return e(r2 + 36 * n2 / (n2 + 38));
};
function toASCII(o2) {
  return function(n2, o3) {
    var e2 = n2.split("@");
    var r2 = "";
    e2.length > 1 && (r2 = e2[0] + "@", n2 = e2[1]);
    var s2 = function(n3, t2) {
      var o4 = [];
      var e3 = n3.length;
      for (; e3--; ) {
        o4[e3] = t2(n3[e3]);
      }
      return o4;
    }((n2 = n2.replace(t, ".")).split("."), o3).join(".");
    return r2 + s2;
  }(o2, function(t2) {
    return n.test(t2) ? "xn--" + function(n2) {
      var t3 = [];
      var o3 = (n2 = function(n3) {
        var t4 = [];
        var o4 = 0;
        var e2 = n3.length;
        for (; o4 < e2; ) {
          var r2 = n3.charCodeAt(o4++);
          if (r2 >= 55296 && r2 <= 56319 && o4 < e2) {
            var e3 = n3.charCodeAt(o4++);
            (64512 & e3) == 56320 ? t4.push(((1023 & r2) << 10) + (1023 & e3) + 65536) : (t4.push(r2), o4--);
          } else {
            t4.push(r2);
          }
        }
        return t4;
      }(n2)).length;
      var f = 128;
      var i = 0;
      var l = 72;
      for (var i$1 = 0, list = n2; i$1 < list.length; i$1 += 1) {
        var o4 = list[i$1];

        o4 < 128 && t3.push(r(o4));
      }
      var h = t3.length;
      var p = h;
      for (h && t3.push("-"); p < o3; ) {
        var o4$1 = 2147483647;
        for (var i$2 = 0, list$1 = n2; i$2 < list$1.length; i$2 += 1) {
          var t4 = list$1[i$2];

          t4 >= f && t4 < o4$1 && (o4$1 = t4);
        }
        var a = p + 1;
        o4$1 - f > e((2147483647 - i) / a) && s("overflow"), i += (o4$1 - f) * a, f = o4$1;
        for (var i$3 = 0, list$2 = n2; i$3 < list$2.length; i$3 += 1) {
          var o5 = list$2[i$3];

          if (o5 < f && ++i > 2147483647 && s("overflow"), o5 == f) {
            var n3 = i;
            for (var o6 = 36; ; o6 += 36) {
              var s2 = o6 <= l ? 1 : o6 >= l + 26 ? 26 : o6 - l;
              if (n3 < s2) {
                break;
              }
              var u2 = n3 - s2;
              var f2 = 36 - s2;
              t3.push(r(c(s2 + u2 % f2, 0))), n3 = e(u2 / f2);
            }
            t3.push(r(c(n3, 0))), l = u(i, a, p == h), i = 0, ++p;
          }
        }
        ++i, ++f;
      }
      return t3.join("");
    }(t2) : t2;
  });
}

var HASH_RE = /#/g;
var AMPERSAND_RE = /&/g;
var EQUAL_RE = /=/g;
var IM_RE = /\?/g;
var PLUS_RE = /\+/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_CARET_RE = /%5E/g;
var ENC_BACKTICK_RE = /%60/g;
var ENC_CURLY_OPEN_RE = /%7B/g;
var ENC_PIPE_RE = /%7C/g;
var ENC_CURLY_CLOSE_RE = /%7D/g;
var ENC_SPACE_RE = /%20/g;
var ENC_SLASH_RE = /%2F/g;
var ENC_ENC_SLASH_RE = /%252F/g;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return encode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return encode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
function decode(text) {
  if ( text === void 0 ) text = "";

  try {
    return decodeURIComponent("" + text);
  } catch (_err) {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function encodeHost(name) {
  if ( name === void 0 ) name = "";

  return toASCII(name);
}

function parseQuery(paramsStr) {
  if ( paramsStr === void 0 ) paramsStr = "";

  var obj = {};
  if (paramsStr[0] === "?") {
    paramsStr = paramsStr.substr(1);
  }
  for (var i = 0, list = paramsStr.split("&"); i < list.length; i += 1) {
    var param = list[i];

    var s = param.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    var key = decode(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    var value = decodeQueryValue(s[2] || "");
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
function encodeQueryItem(key, val) {
  if (!val) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(val)) {
    return val.map(function (_val) { return ((encodeQueryKey(key)) + "=" + (encodeQueryValue(_val))); }).join("&");
  }
  return ((encodeQueryKey(key)) + "=" + (encodeQueryValue(val)));
}
function stringifyQuery(query) {
  return Object.keys(query).map(function (k) { return encodeQueryItem(k, query[k]); }).join("&");
}

var $URL = function $URL(input) {
  if ( input === void 0 ) input = "";

  this.query = {};
  if (typeof input !== "string") {
    throw new TypeError(("URL input should be string received " + (typeof input) + " (" + input + ")"));
  }
  var parsed = parseURL(input);
  this.protocol = decode(parsed.protocol);
  this.host = decode(parsed.host);
  this.auth = decode(parsed.auth);
  this.pathname = decodePath(parsed.pathname);
  this.query = parseQuery(parsed.search);
  this.hash = decode(parsed.hash);
};

var prototypeAccessors = { hostname: { configurable: true },port: { configurable: true },username: { configurable: true },password: { configurable: true },hasProtocol: { configurable: true },isAbsolute: { configurable: true },search: { configurable: true },searchParams: { configurable: true },origin: { configurable: true },fullpath: { configurable: true },encodedAuth: { configurable: true },href: { configurable: true } };
prototypeAccessors.hostname.get = function () {
  return parseHost(this.host).hostname;
};
prototypeAccessors.port.get = function () {
  return parseHost(this.host).port || "";
};
prototypeAccessors.username.get = function () {
  return parseAuth(this.auth).username;
};
prototypeAccessors.password.get = function () {
  return parseAuth(this.auth).password || "";
};
prototypeAccessors.hasProtocol.get = function () {
  return this.protocol.length;
};
prototypeAccessors.isAbsolute.get = function () {
  return this.hasProtocol || this.pathname[0] === "/";
};
prototypeAccessors.search.get = function () {
  var q = stringifyQuery(this.query);
  return q.length ? "?" + q : "";
};
prototypeAccessors.searchParams.get = function () {
    var this$1 = this;

  var p = new URLSearchParams();
  var loop = function ( name ) {
    var value = this$1.query[name];
    if (Array.isArray(value)) {
      value.forEach(function (v) { return p.append(name, v); });
    } else {
      p.append(name, value || "");
    }
  };

    for (var name in this$1.query) loop( name );
  return p;
};
prototypeAccessors.origin.get = function () {
  return (this.protocol ? this.protocol + "//" : "") + encodeHost(this.host);
};
prototypeAccessors.fullpath.get = function () {
  return encodePath(this.pathname) + this.search + encodeHash(this.hash);
};
prototypeAccessors.encodedAuth.get = function () {
  if (!this.auth) {
    return "";
  }
  var ref = parseAuth(this.auth);
    var username = ref.username;
    var password = ref.password;
  return encodeURIComponent(username) + (password ? ":" + encodeURIComponent(password) : "");
};
prototypeAccessors.href.get = function () {
  var auth = this.encodedAuth;
  var originWithAuth = (this.protocol ? this.protocol + "//" : "") + (auth ? auth + "@" : "") + encodeHost(this.host);
  return this.hasProtocol && this.isAbsolute ? originWithAuth + this.fullpath : this.fullpath;
};
$URL.prototype.append = function append (url) {
  if (url.hasProtocol) {
    throw new Error("Cannot append a URL with protocol");
  }
  Object.assign(this.query, url.query);
  if (url.pathname) {
    this.pathname = withTrailingSlash(this.pathname) + withoutLeadingSlash(url.pathname);
  }
  if (url.hash) {
    this.hash = url.hash;
  }
};
$URL.prototype.toJSON = function toJSON () {
  return this.href;
};
$URL.prototype.toString = function toString () {
  return this.href;
};

Object.defineProperties( $URL.prototype, prototypeAccessors );
function hasProtocol(inputStr, acceptProtocolRelative) {
  if ( acceptProtocolRelative === void 0 ) acceptProtocolRelative = false;

  return /^\w+:\/\/.+/.test(inputStr) || acceptProtocolRelative && /^\/\/[^/]+/.test(inputStr);
}
var TRAILING_SLASH_RE = /\/$|\/\?/;
function hasTrailingSlash(input, queryParams) {
  if ( input === void 0 ) input = "";
  if ( queryParams === void 0 ) queryParams = false;

  if (!queryParams) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withTrailingSlash(input, queryParams) {
  if ( input === void 0 ) input = "";
  if ( queryParams === void 0 ) queryParams = false;

  if (!queryParams) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  var ref = input.split("?");
  var s0 = ref[0];
  var s = ref.slice(1);
  return s0 + "/" + (s.length ? ("?" + (s.join("?"))) : "");
}
function hasLeadingSlash(input) {
  if ( input === void 0 ) input = "";

  return input.startsWith("/");
}
function withoutLeadingSlash(input) {
  if ( input === void 0 ) input = "";

  return (hasLeadingSlash(input) ? input.substr(1) : input) || "/";
}
function getQuery(input) {
  return parseQuery(parseURL(input).search);
}

function parseURL(input, defaultProto) {
  if ( input === void 0 ) input = "";

  if (!hasProtocol(input, true)) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  var ref = (input.match(/([^:/]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1);
  var protocol = ref[0]; if ( protocol === void 0 ) protocol = "";
  var auth = ref[1];
  var hostAndPath = ref[2];
  var ref$1 = (hostAndPath.match(/([^/]*)(.*)?/) || []).splice(1);
  var host = ref$1[0]; if ( host === void 0 ) host = "";
  var path = ref$1[1]; if ( path === void 0 ) path = "";
  var ref$2 = parsePath(path);
  var pathname = ref$2.pathname;
  var search = ref$2.search;
  var hash = ref$2.hash;
  return {
    protocol: protocol,
    auth: auth ? auth.substr(0, auth.length - 1) : "",
    host: host,
    pathname: pathname,
    search: search,
    hash: hash
  };
}
function parsePath(input) {
  if ( input === void 0 ) input = "";

  var ref = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  var pathname = ref[0]; if ( pathname === void 0 ) pathname = "";
  var search = ref[1]; if ( search === void 0 ) search = "";
  var hash = ref[2]; if ( hash === void 0 ) hash = "";
  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}
function parseAuth(input) {
  if ( input === void 0 ) input = "";

  var ref = input.split(":");
  var username = ref[0];
  var password = ref[1];
  return {
    username: decode(username),
    password: decode(password)
  };
}
function parseHost(input) {
  if ( input === void 0 ) input = "";

  var ref = (input.match(/([^/]*)(:0-9+)?/) || []).splice(1);
  var hostname = ref[0];
  var port = ref[1];
  return {
    hostname: decode(hostname),
    port: port
  };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  var arguments$1 = arguments;

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i] != null ? arguments$1[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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
    if ("value" in descriptor) { descriptor.writable = true; }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
  if (staticProps) { _defineProperties(Constructor, staticProps); }
  return Constructor;
}

function _defineProperty$1(obj, key, value) {
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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread$1();
}

function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) { return _arrayLikeToArray(arr); }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) { return arr; }
}

function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) { return Array.from(iter); }
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) { return; }
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) { break; }
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) { _i["return"](); }
    } finally {
      if (_d) { throw _e; }
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) { return; }
  if (typeof o === "string") { return _arrayLikeToArray(o, minLen); }
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) { n = o.constructor.name; }
  if (n === "Map" || n === "Set") { return Array.from(o); }
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) { return _arrayLikeToArray(o, minLen); }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) { len = arr.length; }

  for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; }

  return arr2;
}

function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// package version used in the ix-lib parameter
var VERSION$1 = '3.3.0'; // regex pattern used to determine if a domain is valid

var DOMAIN_REGEX = /^(?:[a-z\d\-_]{1,62}\.){0,125}(?:[a-z\d](?:\-(?=\-*[a-z\d])|[a-z]|\d){0,62}\.)[a-z\d]{1,63}$/i; // minimum generated srcset width

var MIN_SRCSET_WIDTH = 100; // maximum generated srcset width

var MAX_SRCSET_WIDTH = 8192; // default tolerable percent difference between srcset pair widths

var DEFAULT_SRCSET_WIDTH_TOLERANCE = 0.08; // default quality parameter values mapped by each dpr srcset entry

var DPR_QUALITIES = {
  1: 75,
  2: 50,
  3: 35,
  4: 23,
  5: 20
};
var DEFAULT_OPTIONS = {
  domain: null,
  useHTTPS: true,
  includeLibraryParam: true,
  urlPrefix: 'https://',
  secureURLToken: null
};

function validateAndDestructureOptions(options) {
  var widthTolerance;

  if (options.widthTolerance !== undefined) {
    validateWidthTolerance(options.widthTolerance);
    widthTolerance = options.widthTolerance;
  } else {
    widthTolerance = DEFAULT_SRCSET_WIDTH_TOLERANCE;
  }

  var minWidth = options.minWidth === undefined ? MIN_SRCSET_WIDTH : options.minWidth;
  var maxWidth = options.maxWidth === undefined ? MAX_SRCSET_WIDTH : options.maxWidth; // Validate the range unless we're using defaults for both

  if (minWidth != MIN_SRCSET_WIDTH || maxWidth != MAX_SRCSET_WIDTH) {
    validateRange(minWidth, maxWidth);
  }

  return [widthTolerance, minWidth, maxWidth];
}
function validateRange(min, max) {
  if (!(Number.isInteger(min) && Number.isInteger(max)) || min <= 0 || max <= 0 || min > max) {
    throw new Error("The min and max srcset widths can only be passed positive Number values, and min must be less than max. Found min: ".concat(min, " and max: ").concat(max, "."));
  }
}
function validateWidthTolerance(widthTolerance) {
  if (typeof widthTolerance != 'number' || widthTolerance < 0.01) {
    throw new Error('The srcset widthTolerance must be a number greater than or equal to 0.01');
  }
}
function validateWidths(customWidths) {
  if (!Array.isArray(customWidths) || !customWidths.length) {
    throw new Error('The widths argument can only be passed a valid non-empty array of integers');
  } else {
    var allPositiveIntegers = customWidths.every(function (width) {
      return Number.isInteger(width) && width > 0;
    });

    if (!allPositiveIntegers) {
      throw new Error('A custom widths argument can only contain positive integer values');
    }
  }
}
function validateVariableQuality(disableVariableQuality) {
  if (typeof disableVariableQuality != 'boolean') {
    throw new Error('The disableVariableQuality argument can only be passed a Boolean value');
  }
}

/**
 * `extractUrl()` extracts URL components from a source URL string.
 * It does this by matching the URL against regular expressions. The irrelevant
 * (entire URL) matches are removed and the rest stored as their corresponding
 * URL components.
 *
 * `url` can be a partial, full URL, or full proxy URL. `useHttps` boolean
 * defaults to false.
 *
 * @returns {Object} `{ protocol, auth, host, pathname, search, hash }`
 * extracted from the URL.
 */

function extractUrl(_ref) {
  var _ref$url = _ref.url,
      url = _ref$url === void 0 ? '' : _ref$url,
      _ref$useHttps = _ref.useHttps,
      useHttps = _ref$useHttps === void 0 ? false : _ref$useHttps;
  var defaultProto = useHttps ? 'https://' : 'http://';

  if (!hasProtocol(url, true)) {
    return extractUrl({
      url: defaultProto + url
    });
  }
  /**
   * Regex are hard to parse. Leaving this breakdown here for reference.
   * - `protocol`: ([^:/]+:)? - all not `:` or `/` & preceded by `:`, 0-1 times
   * - `auth`: ([^/@]+@)? - all not `/` or `@` & preceded by `@`, 0-1 times
   * - `domainAndPath`: (.*) /) -  all except line breaks
   * - `domain`: `([^/]*)` - all before a `/` token
   */


  return parseURL(url);
}

var ImgixClient = /*#__PURE__*/function () {
  function ImgixClient() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ImgixClient);

    this.settings = _objectSpread2(_objectSpread2({}, DEFAULT_OPTIONS), opts); // a cache to store memoized srcset width-pairs

    this.targetWidthsCache = {};

    if (typeof this.settings.domain != 'string') {
      throw new Error('ImgixClient must be passed a valid string domain');
    }

    if (DOMAIN_REGEX.exec(this.settings.domain) == null) {
      throw new Error('Domain must be passed in as fully-qualified ' + 'domain name and should not include a protocol or any path ' + 'element, i.e. "example.imgix.net".');
    }

    if (this.settings.includeLibraryParam) {
      this.settings.libraryParam = 'js-' + ImgixClient.version();
    }

    this.settings.urlPrefix = this.settings.useHTTPS ? 'https://' : 'http://';
  }

  _createClass(ImgixClient, [{
    key: "buildURL",
    value: function buildURL() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var sanitizedPath = this._sanitizePath(path);

      var finalParams = this._buildParams(params);

      if (!!this.settings.secureURLToken) {
        finalParams = this._signParams(sanitizedPath, finalParams);
      }

      return this.settings.urlPrefix + this.settings.domain + sanitizedPath + finalParams;
    }
    /**
     *`_buildURL` static method allows full URLs to be formatted for use with
     * imgix.
     *
     * - If the source URL has included parameters, they are merged with
     * the `params` passed in as an argument.
     * - URL must match `{host}/{pathname}?{query}` otherwise an error is thrown.
     *
     * @param {String} url - full source URL path string, required
     * @param {Object} params - imgix params object, optional
     * @param {Object} options - imgix client options, optional
     *
     * @returns URL string formatted to imgix specifications.
     *
     * @example
     * const client = ImgixClient
     * const params = { w: 100 }
     * const opts = { useHttps: true }
     * const src = "sdk-test.imgix.net/amsterdam.jpg?h=100"
     * const url = client._buildURL(src, params, opts)
     * console.log(url)
     * // => "https://sdk-test.imgix.net/amsterdam.jpg?h=100&w=100"
     */

  }, {
    key: "_buildParams",
    value: function _buildParams() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var queryParams = [].concat(_toConsumableArray$1(this.settings.libraryParam ? ["ixlib=".concat(this.settings.libraryParam)] : []), _toConsumableArray$1(Object.entries(params).reduce(function (prev, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (value == null) {
          return prev;
        }

        var encodedKey = encodeURIComponent(key);
        var encodedValue = key.substr(-2) === '64' ? gBase64.encodeURI(value) : encodeURIComponent(value);
        prev.push("".concat(encodedKey, "=").concat(encodedValue));
        return prev;
      }, [])));
      return "".concat(queryParams.length > 0 ? '?' : '').concat(queryParams.join('&'));
    }
  }, {
    key: "_signParams",
    value: function _signParams(path, queryParams) {
      var signatureBase = this.settings.secureURLToken + path + queryParams;
      var signature = md5(signatureBase);
      return queryParams.length > 0 ? queryParams + '&s=' + signature : '?s=' + signature;
    }
  }, {
    key: "_sanitizePath",
    value: function _sanitizePath(path) {
      // Strip leading slash first (we'll re-add after encoding)
      var _path = path.replace(/^\//, '');

      if (/^https?:\/\//.test(_path)) {
        // Use de/encodeURIComponent to ensure *all* characters are handled,
        // since it's being used as a path
        _path = encodeURIComponent(_path);
      } else {
        // Use de/encodeURI if we think the path is just a path,
        // so it leaves legal characters like '/' and '@' alone
        _path = encodeURI(_path).replace(/[#?:+]/g, encodeURIComponent);
      }

      return '/' + _path;
    }
  }, {
    key: "buildSrcSet",
    value: function buildSrcSet(path) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var w = params.w,
          h = params.h;

      if (w || h) {
        return this._buildDPRSrcSet(path, params, options);
      } else {
        return this._buildSrcSetPairs(path, params, options);
      }
    }
    /**
     * _buildSrcSet static method allows full URLs to be used when generating
     * imgix formatted `srcset` string values.
     *
     * - If the source URL has included parameters, they are merged with
     * the `params` passed in as an argument.
     * - URL must match `{host}/{pathname}?{query}` otherwise an error is thrown.
     *
     * @param {String} url - full source URL path string, required
     * @param {Object} params - imgix params object, optional
     * @param {Object} srcsetModifiers - srcset modifiers, optional
     * @param {Object} clientOptions - imgix client options, optional
     * @returns imgix `srcset` for full URLs.
     */

  }, {
    key: "_buildSrcSetPairs",
    value: function _buildSrcSetPairs(path, params, options) {
      var _this = this;

      var _validateAndDestructu = validateAndDestructureOptions(options),
          _validateAndDestructu2 = _slicedToArray(_validateAndDestructu, 3),
          widthTolerance = _validateAndDestructu2[0],
          minWidth = _validateAndDestructu2[1],
          maxWidth = _validateAndDestructu2[2];

      var targetWidthValues;

      if (options.widths) {
        validateWidths(options.widths);
        targetWidthValues = _toConsumableArray$1(options.widths);
      } else {
        targetWidthValues = ImgixClient.targetWidths(minWidth, maxWidth, widthTolerance, this.targetWidthsCache);
      }

      var srcset = targetWidthValues.map(function (w) {
        return "".concat(_this.buildURL(path, _objectSpread2(_objectSpread2({}, params), {}, {
          w: w
        })), " ").concat(w, "w");
      });
      return srcset.join(',\n');
    }
  }, {
    key: "_buildDPRSrcSet",
    value: function _buildDPRSrcSet(path, params, options) {
      var _this2 = this;

      var targetRatios = [1, 2, 3, 4, 5];
      var disableVariableQuality = options.disableVariableQuality || false;

      if (!disableVariableQuality) {
        validateVariableQuality(disableVariableQuality);
      }

      var withQuality = function withQuality(path, params, dpr) {
        return "".concat(_this2.buildURL(path, _objectSpread2(_objectSpread2({}, params), {}, {
          dpr: dpr,
          q: params.q || DPR_QUALITIES[dpr]
        })), " ").concat(dpr, "x");
      };

      var srcset = disableVariableQuality ? targetRatios.map(function (dpr) {
        return "".concat(_this2.buildURL(path, _objectSpread2(_objectSpread2({}, params), {}, {
          dpr: dpr
        })), " ").concat(dpr, "x");
      }) : targetRatios.map(function (dpr) {
        return withQuality(path, params, dpr);
      });
      return srcset.join(',\n');
    }
  }], [{
    key: "version",
    value: function version() {
      return VERSION$1;
    }
  }, {
    key: "_buildURL",
    value: function _buildURL(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (url == null) {
        return '';
      }

      var _extractUrl = extractUrl({
        url: url,
        useHTTPS: options.useHTTPS
      }),
          host = _extractUrl.host,
          pathname = _extractUrl.pathname,
          search = _extractUrl.search; // merge source URL parameters with options parameters


      var combinedParams = _objectSpread2(_objectSpread2({}, getQuery(search)), params); // throw error if no host or no pathname present


      if (!host.length || !pathname.length) {
        throw new Error('_buildURL: URL must match {host}/{pathname}?{query}');
      }

      var client = new ImgixClient(_objectSpread2({
        domain: host
      }, options));
      return client.buildURL(pathname, combinedParams);
    }
  }, {
    key: "_buildSrcSet",
    value: function _buildSrcSet(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var srcsetModifiers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var clientOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (url == null) {
        return '';
      }

      var _extractUrl2 = extractUrl({
        url: url,
        useHTTPS: clientOptions.useHTTPS
      }),
          host = _extractUrl2.host,
          pathname = _extractUrl2.pathname,
          search = _extractUrl2.search; // merge source URL parameters with options parameters


      var combinedParams = _objectSpread2(_objectSpread2({}, getQuery(search)), params); // throw error if no host or no pathname present


      if (!host.length || !pathname.length) {
        throw new Error('_buildOneStepURL: URL must match {host}/{pathname}?{query}');
      }

      var client = new ImgixClient(_objectSpread2({
        domain: host
      }, clientOptions));
      return client.buildSrcSet(pathname, combinedParams, srcsetModifiers);
    } // returns an array of width values used during srcset generation

  }, {
    key: "targetWidths",
    value: function targetWidths() {
      var minWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      var maxWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8192;
      var widthTolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.08;
      var cache = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var minW = Math.floor(minWidth);
      var maxW = Math.floor(maxWidth);
      validateRange(minWidth, maxWidth);
      validateWidthTolerance(widthTolerance);
      var cacheKey = widthTolerance + '/' + minW + '/' + maxW; // First, check the cache.

      if (cacheKey in cache) {
        return cache[cacheKey];
      }

      if (minW === maxW) {
        return [minW];
      }

      var resolutions = [];
      var currentWidth = minW;

      while (currentWidth < maxW) {
        // While the currentWidth is less than the maxW, push the rounded
        // width onto the list of resolutions.
        resolutions.push(Math.round(currentWidth));
        currentWidth *= 1 + widthTolerance * 2;
      } // At this point, the last width in resolutions is less than the
      // currentWidth that caused the loop to terminate. This terminating
      // currentWidth is greater than or equal to the maxW. We want to
      // to stop at maxW, so we make sure our maxW is larger than the last
      // width in resolutions before pushing it (if it's equal we're done).


      if (resolutions[resolutions.length - 1] < maxW) {
        resolutions.push(maxW);
      }

      cache[cacheKey] = resolutions;
      return resolutions;
    }
  }]);

  return ImgixClient;
}();

/**
  * vue-class-component v7.2.6
  * (c) 2015-present Evan You
  * @license MIT
  */

function _typeof(obj) {
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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function isPrimitive(value) {
  var type = _typeof(value);

  return value == null || type !== 'object' && type !== 'function';
}
function warn(message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message);
  }
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this;

    // proxy to actual vm
    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      Object.defineProperty(_this, key, {
        get: function get() {
          return vm[key];
        },
        set: function set(value) {
          vm[key] = value;
        },
        configurable: true
      });
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
      warn('Component class must inherit Vue or its descendant class ' + 'when class property is used.');
    }
  }

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];
function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof Vue ? superProto.constructor : Vue;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}
var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // Skip the properties that should not be overwritten
    if (shouldIgnore[key]) {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (process.env.NODE_ENV !== 'production' && reservedPropertyNames.indexOf(key) >= 0) {
      warn("Static property name '".concat(key, "' declared on class '").concat(Original.name, "' ") + 'conflicts with reserved property name of Vue internal. ' + 'It may cause unexpected behavior of the component. Consider renaming the property.');
    }

    Object.defineProperty(Extended, key, descriptor);
  });
}

function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

var IxImgProps = Vue.extend({
    props: {
        src: {
            type: String,
            required: true,
        },
        fixed: Boolean,
        imgixParams: Object,
        width: [String, Number],
        height: [String, Number],
        attributeConfig: Object,
        disableVariableQuality: Boolean,
    },
});
var defaultAttributeMap$1 = {
    src: 'src',
    srcset: 'srcset',
};
var IxImg = /*@__PURE__*/(function (IxImgProps) {
    function IxImg () {
        IxImgProps.apply(this, arguments);
    }

    if ( IxImgProps ) IxImg.__proto__ = IxImgProps;
    IxImg.prototype = Object.create( IxImgProps && IxImgProps.prototype );
    IxImg.prototype.constructor = IxImg;

    IxImg.prototype.created = function created () {
        this.vueImgixSingleton = ensureVueImgixClientSingleton();
    };
    IxImg.prototype.render = function render (createElement) {
        var obj;

        var imgixParamsFromImgAttributes = Object.assign({}, (this.fixed && Object.assign({}, (this.width != null ? { w: this.width } : {}),
                (this.height != null ? { h: this.height } : {}))));
        var ref = this.vueImgixSingleton.buildUrlObject(this.src, Object.assign({}, imgixParamsFromImgAttributes,
            this.imgixParams), {
            disableVariableQuality: Boolean(this.disableVariableQuality),
        });
        var src = ref.src;
        var srcset = ref.srcset;
        var attributeConfig = Object.assign({}, defaultAttributeMap$1,
            this.attributeConfig);
        return createElement('img', {
            attrs: ( obj = {}, obj[attributeConfig.src] = src, obj[attributeConfig.srcset] = srcset, obj.width = this.width, obj.height = this.height, obj ),
        });
    };

    return IxImg;
}(IxImgProps));
IxImg = __decorate([
    Component
], IxImg);

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
// Do not change this
var VERSION = '2.9.0';
var clientOptionDefaults = {
    includeLibraryParam: true,
};
var VueImgixClient = function VueImgixClient(options) {
    var this$1 = this;

    this.buildIxParams = function (ixParams) {
        return Object.assign({}, this$1.options.defaultIxParams,
            ixParams);
    };
    this.buildUrlObject = function (url, ixParams, options) {
        if ( options === void 0 ) options = {};

        var widths = options.widths;
        var widthTolerance = options.widthTolerance;
        var minWidth = options.minWidth;
        var maxWidth = options.maxWidth;
        var rest = objectWithoutProperties( options, ["widths", "widthTolerance", "minWidth", "maxWidth"] );
        var sharedOptions = rest;
        var src = this$1._buildUrl(url, ixParams);
        var srcset = this$1._buildSrcSet(url, ixParams, Object.assign({}, {widths: widths,
            widthTolerance: widthTolerance,
            minWidth: minWidth,
            maxWidth: maxWidth},
            sharedOptions));
        return { src: src, srcset: srcset };
    };
    this.buildUrl = function (url, ixParams) {
        return this$1.client.buildURL(url, this$1.buildIxParams(ixParams));
    };
    this._buildUrl = function (url, ixParams) {
        // if 2-step URL
        if (!url.includes('://')) {
            return this$1.client.buildURL(url, this$1.buildIxParams(ixParams));
        }
        else {
            return ImgixClient._buildURL(url, this$1.buildIxParams(ixParams));
        }
    };
    this.buildSrcSet = function (url, ixParams, options) {
        return this$1.client.buildSrcSet(url, this$1.buildIxParams(ixParams), options);
    };
    this._buildSrcSet = function (url, ixParams, options) {
        // if 2-step URL
        // eslint-disable-next-line
        if (!url.includes('://')) {
            return this$1.client.buildSrcSet(url, this$1.buildIxParams(ixParams), options);
        }
        else {
            return ImgixClient._buildSrcSet(url, this$1.buildIxParams(ixParams), options);
        }
    };
    this.options = Object.assign({}, clientOptionDefaults, options);
    this.client = new ImgixClient({
        domain: this.options.domain,
        includeLibraryParam: false, // force false so that @imgix/js-core doesn't include its own library param
    });
    // This is not a public API, so it is not included in the type definitions for ImgixClient
    if (this.options.includeLibraryParam) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.client.settings.libraryParam = "vue-" + VERSION;
    }
};
var buildImgixClient = function (options) {
    var client = new VueImgixClient(Object.assign({}, options));
    return client;
};
var vueImgixClientSingleton = undefined;
var initVueImgix = function (options) {
    vueImgixClientSingleton = new VueImgixClient(options);
};
var ensureVueImgixClientSingleton = function () {
    if (vueImgixClientSingleton == null) {
        throw new Error('[vue-imgix] Vue.use(VueImgix, {}) must be called before using exported methods. This is usually done in App.vue :)');
    }
    return vueImgixClientSingleton;
};
var buildUrlObject = function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var client = ensureVueImgixClientSingleton();
    return client.buildUrlObject.apply(client, args);
};
var buildUrl = function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var client = ensureVueImgixClientSingleton();
    return client._buildUrl.apply(client, args);
};
var buildSrcSet = function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var client = ensureVueImgixClientSingleton();
    return client._buildSrcSet.apply(client, args);
};

var IxPictureProps = Vue.extend({
    props: {},
});
var IxPicture = /*@__PURE__*/(function (IxPictureProps) {
    function IxPicture () {
        IxPictureProps.apply(this, arguments);
    }

    if ( IxPictureProps ) IxPicture.__proto__ = IxPictureProps;
    IxPicture.prototype = Object.create( IxPictureProps && IxPictureProps.prototype );
    IxPicture.prototype.constructor = IxPicture;

    IxPicture.prototype.created = function created () {
        this.vueImgixSingleton = ensureVueImgixClientSingleton();
    };
    IxPicture.prototype.render = function render (createElement) {
        return createElement('picture', this.$slots.default);
    };

    return IxPicture;
}(IxPictureProps));
IxPicture = __decorate([
    Component
], IxPicture);

var IxSourceProps = Vue.extend({
    props: {
        src: {
            type: String,
            required: true,
        },
        imgixParams: Object,
        attributeConfig: Object,
    },
});
var defaultAttributeMap = {
    src: 'src',
    srcset: 'srcset',
};
var IxSource = /*@__PURE__*/(function (IxSourceProps) {
    function IxSource () {
        IxSourceProps.apply(this, arguments);
    }

    if ( IxSourceProps ) IxSource.__proto__ = IxSourceProps;
    IxSource.prototype = Object.create( IxSourceProps && IxSourceProps.prototype );
    IxSource.prototype.constructor = IxSource;

    IxSource.prototype.created = function created () {
        this.vueImgixSingleton = ensureVueImgixClientSingleton();
    };
    IxSource.prototype.render = function render (createElement) {
        var imgixParamsFromAttributes = {};
        var ref = this.vueImgixSingleton.buildUrlObject(this.src, Object.assign({}, imgixParamsFromAttributes,
            this.imgixParams));
        var srcset = ref.srcset;
        var attributeConfig = Object.assign({}, defaultAttributeMap,
            this.attributeConfig);
        var childAttrs = {};
        childAttrs[attributeConfig.srcset] = srcset;
        return createElement('source', { attrs: childAttrs });
    };

    return IxSource;
}(IxSourceProps));
IxSource = __decorate([
    Component
], IxSource);

// Declare install function executed by Vue.use()
function install(Vue, options) {
    if (install.installed)
        { return; }
    install.installed = true;
    initVueImgix(options);
    Vue.component('ix-img', IxImg);
    Vue.component('ix-picture', IxPicture);
    Vue.component('ix-source', IxSource);
}
install.installed = false;
// Create module definition for Vue.use()
var plugin = {
    install: install,
};

export default plugin;
export { IxImg, buildImgixClient, buildSrcSet, buildUrl, buildUrlObject, ensureVueImgixClientSingleton, initVueImgix, install };
