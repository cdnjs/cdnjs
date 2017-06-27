/*
 * js-sha1 v0.3.0
 * https://github.com/emn178/js-sha1
 *
 * Copyright 2014-2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(root, undefined){
  'use strict';

  var NODE_JS = typeof(module) != 'undefined';
  if(NODE_JS) {
    root = global;
  }
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];

  var blocks = [];

  var sha1 = function(message) {
    var notString = typeof(message) != 'string';
    if(notString && message.constructor == ArrayBuffer) {
      message = new Uint8Array(message);
    }

    var h0, h1, h2, h3, h4, block = 0, code, end = false, t, f,
        i, j, index = 0, start = 0, bytes = 0, length = message.length;

    h0 = 0x67452301;
    h1 = 0xEFCDAB89;
    h2 = 0x98BADCFE;
    h3 = 0x10325476;
    h4 = 0xC3D2E1F0;

    do {
      blocks[0] = block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      if(notString) {
        for (i = start;index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = start;index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }
      bytes += i - start;
      start = i - 64;
      if(index == length) {
        blocks[i >> 2] |= EXTRA[i & 3];
        ++index;
      }
      block = blocks[16];
      if(index > length && i < 56) {
        blocks[15] = bytes << 3;
        end = true;
      }

      for(j = 16;j < 80;++j) {
        t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^ blocks[j - 16];
        blocks[j] =  (t << 1) | (t >>> 31);
      }

      var a = h0, b = h1, c = h2, d = h3, e = h4;
      for(j = 0;j < 20;j += 5) {
        f = (b & c) | ((~b) & d);
        t = (a << 5) | (a >>> 27);
        e = t + f + e + 1518500249 + blocks[j] << 0;
        b = (b << 30) | (b >>> 2);

        f = (a & b) | ((~a) & c);
        t = (e << 5) | (e >>> 27);
        d = t + f + d + 1518500249 + blocks[j + 1] << 0;
        a = (a << 30) | (a >>> 2);

        f = (e & a) | ((~e) & b);
        t = (d << 5) | (d >>> 27);
        c = t + f + c + 1518500249 + blocks[j + 2] << 0;
        e = (e << 30) | (e >>> 2);

        f = (d & e) | ((~d) & a);
        t = (c << 5) | (c >>> 27);
        b = t + f + b + 1518500249 + blocks[j + 3] << 0;
        d = (d << 30) | (d >>> 2);

        f = (c & d) | ((~c) & e);
        t = (b << 5) | (b >>> 27);
        a = t + f + a + 1518500249 + blocks[j + 4] << 0;
        c = (c << 30) | (c >>> 2);
      }

      for(;j < 40;j += 5) {
        f = b ^ c ^ d;
        t = (a << 5) | (a >>> 27);
        e = t + f + e + 1859775393 + blocks[j] << 0;
        b = (b << 30) | (b >>> 2);

        f = a ^ b ^ c;
        t = (e << 5) | (e >>> 27);
        d = t + f + d + 1859775393 + blocks[j + 1] << 0;
        a = (a << 30) | (a >>> 2);

        f = e ^ a ^ b;
        t = (d << 5) | (d >>> 27);
        c = t + f + c + 1859775393 + blocks[j + 2] << 0;
        e = (e << 30) | (e >>> 2);

        f = d ^ e ^ a;
        t = (c << 5) | (c >>> 27);
        b = t + f + b + 1859775393 + blocks[j + 3] << 0;
        d = (d << 30) | (d >>> 2);

        f = c ^ d ^ e;
        t = (b << 5) | (b >>> 27);
        a = t + f + a + 1859775393 + blocks[j + 4] << 0;
        c = (c << 30) | (c >>> 2);
      }

      for(;j < 60;j += 5) {
        f = (b & c) | (b & d) | (c & d);
        t = (a << 5) | (a >>> 27);
        e = t + f + e - 1894007588 + blocks[j] << 0;
        b = (b << 30) | (b >>> 2);

        f = (a & b) | (a & c) | (b & c);
        t = (e << 5) | (e >>> 27);
        d = t + f + d - 1894007588 + blocks[j + 1] << 0;
        a = (a << 30) | (a >>> 2);

        f = (e & a) | (e & b) | (a & b);
        t = (d << 5) | (d >>> 27);
        c = t + f + c - 1894007588 + blocks[j + 2] << 0;
        e = (e << 30) | (e >>> 2);

        f = (d & e) | (d & a) | (e & a);
        t = (c << 5) | (c >>> 27);
        b = t + f + b - 1894007588 + blocks[j + 3] << 0;
        d = (d << 30) | (d >>> 2);

        f = (c & d) | (c & e) | (d & e);
        t = (b << 5) | (b >>> 27);
        a = t + f + a - 1894007588 + blocks[j + 4] << 0;
        c = (c << 30) | (c >>> 2);
      }

      for(;j < 80;j += 5) {
        f = b ^ c ^ d;
        t = (a << 5) | (a >>> 27);
        e = t + f + e - 899497514 + blocks[j] << 0;
        b = (b << 30) | (b >>> 2);

        f = a ^ b ^ c;
        t = (e << 5) | (e >>> 27);
        d = t + f + d - 899497514 + blocks[j + 1] << 0;
        a = (a << 30) | (a >>> 2);

        f = e ^ a ^ b;
        t = (d << 5) | (d >>> 27);
        c = t + f + c - 899497514 + blocks[j + 2] << 0;
        e = (e << 30) | (e >>> 2);

        f = d ^ e ^ a;
        t = (c << 5) | (c >>> 27);
        b = t + f + b - 899497514 + blocks[j + 3] << 0;
        d = (d << 30) | (d >>> 2);

        f = c ^ d ^ e;
        t = (b << 5) | (b >>> 27);
        a = t + f + a - 899497514 + blocks[j + 4] << 0;
        c = (c << 30) | (c >>> 2);
      }

      h0 = h0 + a << 0;
      h1 = h1 + b << 0;
      h2 = h2 + c << 0;
      h3 = h3 + d << 0;
      h4 = h4 + e << 0;
    } while(!end);

    return HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
           HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
           HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
           HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
           HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
           HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
           HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
           HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
           HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
           HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
           HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
           HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
           HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
           HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
           HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
           HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
           HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
           HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
           HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
           HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F];
  };

  if(!root.JS_SHA1_TEST && typeof(module) != 'undefined') {
    var crypto = require('crypto');
    var Buffer = require('buffer').Buffer;

    module.exports = function(message) {
      if(typeof(message) == 'string') {
        return crypto.createHash('sha1').update(message, 'utf8').digest('hex');
      }
      if(message.constructor == ArrayBuffer) {
        message = new Uint8Array(message);
      }
      return crypto.createHash('sha1').update(new Buffer(message)).digest('hex');
    };
  } else if(root) {
    root.sha1 = sha1;
  }
}(this));
