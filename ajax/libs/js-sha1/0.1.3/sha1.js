/*
 * js-sha1 v0.1.3
 * https://github.com/emn178/js-sha1
 *
 * Copyright 2014-2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(root, undefined){
  'use strict';

  var HEX_CHARS = '0123456789abcdef'.split('');

  var sha1 = function(message, asciiOnly) {
    var blocks, h0, h1, h2, h3, h4;
    if(!asciiOnly && /[^\x00-\x7F]/.test(message)) {
      blocks = getBlocksFromUtf8(message);
    } else {
      blocks = getBlocksFromAscii(message);
    }
    h0 = 0x67452301;
    h1 = 0xEFCDAB89;
    h2 = 0x98BADCFE;
    h3 = 0x10325476;
    h4 = 0xC3D2E1F0;

    for(var i = 0, length = blocks.length;i < length;i += 16) {
      var w = [], j;
      for(j = 0;j < 16;++j) {
        w[j] = blocks[i + j];
      }
      for(j = 16;j < 80;++j) {
        var x = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
        w[j] = leftrotate(x, 1);
      }

      var a = h0;
      var b = h1;
      var c = h2;
      var d = h3;
      var e = h4;
      var f, tmp;

      for(j = 0;j < 20;++j) {
        f = (b & c) | ((~b) & d);
        tmp = leftrotate(a, 5) + f + e + 0x5A827999 + w[j];
        e = d;
        d = c;
        c = leftrotate(b, 30);
        b = a;
        a = tmp;
      }

      for(;j < 40;++j) {
        f = b ^ c ^ d;
        tmp = leftrotate(a, 5) + f + e + 0x6ED9EBA1 + w[j];
        e = d;
        d = c;
        c = leftrotate(b, 30);
        b = a;
        a = tmp;
      }

      // k = 0x8F1BBCDC;
      for(;j < 60;++j) {
        f = (b & c) | (b & d) | (c & d);
        tmp = leftrotate(a, 5) + f + e + 0x8F1BBCDC + w[j];
        e = d;
        d = c;
        c = leftrotate(b, 30);
        b = a;
        a = tmp;
      }

      for(;j < 80;++j) {
        f = b ^ c ^ d;
        tmp = leftrotate(a, 5) + f + e + 0xCA62C1D6 + w[j];
        e = d;
        d = c;
        c = leftrotate(b, 30);
        b = a;
        a = tmp;
      }

      h0 += a;
      h1 += b;
      h2 += c;
      h3 += d;
      h4 += e;
    }

    return toHexString(h0) + toHexString(h1)+ toHexString(h2) + toHexString(h3) + toHexString(h4);
  };

  var leftrotate = function(x, c) {
    return (x << c) | (x >>> (32 - c));
  };

  var toHexString = function(num) {
    var hex = '';
    for(var i = 0; i < 4; i++) {
      var offset = 3 - i << 3;
      hex += HEX_CHARS[(num >> (offset + 4)) & 0x0F] + HEX_CHARS[(num >> offset) & 0x0F];
    }
    return hex;
  };

  var getBytesFromUtf8 = function(str) {
    var bytes = [], index = 0;
    for (var i = 0;i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 0x80) {
        bytes[index++] = c;
      } else if (c < 0x800) {
        bytes[index++] = 0xc0 | (c >> 6);
        bytes[index++] = 0x80 | (c & 0x3f);
      } else if (c < 0xd800 || c >= 0xe000) {
        bytes[index++] = 0xe0 | (c >> 12);
        bytes[index++] = 0x80 | ((c >> 6) & 0x3f);
        bytes[index++] = 0x80 | (c & 0x3f);
      } else {
        c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
        bytes[index++] = 0xf0 | (c >> 18);
        bytes[index++] = 0x80 | ((c >> 12) & 0x3f);
        bytes[index++] = 0x80 | ((c >> 6) & 0x3f);
        bytes[index++] = 0x80 | (c & 0x3f);
      }
    }
    return bytes;
  };

  var getBlocksFromAscii = function(message) {
    // a block is 32 bits(4 bytes), a chunk is 512 bits(64 bytes)
    var length = message.length;
    var chunkCount = ((length + 8) >> 6) + 1;
    var blockCount = chunkCount << 4; // chunkCount * 16
    var blocks = [], i;
    for(i = 0;i < blockCount;++i) {
      blocks[i] = 0;
    }
    for(i = 0;i < length;++i) {
      blocks[i >> 2] |= message.charCodeAt(i) << (3 - (i & 3) << 3);
    }
    blocks[i >> 2] |= 0x80 << (3 - (i & 3) << 3);
    blocks[blockCount - 1] = length << 3; // length * 8
    return blocks;
  };

  var getBlocksFromUtf8 = function(message) {
    var bytes = getBytesFromUtf8(message);
    var length = bytes.length;
    var chunkCount = ((length + 8) >> 6) + 1;
    var blockCount = chunkCount << 4; // chunkCount * 16
    var blocks = [], i;
    for(i = 0;i < blockCount;++i) {
      blocks[i] = 0;
    }
    for(i = 0;i < length;++i) {
      blocks[i >> 2] |= bytes[i] << (3 - (i & 3) << 3);
    }
    blocks[i >> 2] |= 0x80 << (3 - (i & 3) << 3);
    blocks[blockCount - 1] = length << 3; // length * 8
    return blocks;
  };

  if(typeof(module) != 'undefined') {
    module.exports = sha1;
  }
  else if(root) {
    root.sha1 = sha1;
  }
}(this));
