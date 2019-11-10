/*
 * js-sha3 v0.1.0
 * https://github.com/emn178/js-sha3
 *
 * Copyright 2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(root, undefined) {
  'use strict';

  var NODE_JS = typeof(module) != 'undefined';
  if(NODE_JS) {
    root = global;
  }
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [1, 256, 65536, 16777216];
  var SHIFT = [0, 8, 16, 24];
  var R = [0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39, 41, 45, 15, 21, 8, 18, 2, 61, 56, 14];
  var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
            0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 
            2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 
            2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
            2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

  var blocks = [], s = [], b = [], c = [];

  var sha3_224 = function(message) {
    return sha3(message, 224);
  };

  var sha3_256 = function(message) {
    return sha3(message, 256);
  };

  var sha3_384 = function(message) {
    return sha3(message, 384);
  };

  var sha3 = function(message, bits) {
    if(bits === undefined) {
      bits = 512;
    }

    var block, code, end = false, index = 0, start = 0, length = message.length,
        n, x, y, x2, r, i, j, k, h, l;
    var blockCount = (1600 - bits * 2) / 32;
    var byteCount = blockCount * 4;

    for(i = 0;i < 50;++i) {
      s[i] = 0;
    }

    block = 0;
    do {
      blocks[0] = block;
      for(i = 1;i < blockCount + 1;++i) {
        blocks[i] = 0;
      }
      for (i = start;index < length && i < byteCount; ++index) {
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
      start = i - byteCount;
      if(index == length) {
        blocks[i >> 2] |= EXTRA[i & 3];
        ++index;
      }
      block = blocks[blockCount];
      if(index > length && i < byteCount) {
        blocks[blockCount - 1] |= 0x80000000;
        end = true;
      }

      for(i = 0;i < blockCount;++i) {
        s[i] ^= blocks[i];
      }

      for(n = 0; n < 24; n++) {
        for (x = 0; x < 5; x++) {
          x2 = x * 2;
          c[x2] = s[x2] ^ s[x2 + 10] ^ s[x2 + 20] ^ s[x2 + 30] ^ s[x2 + 40];
          c[x2 + 1] = s[x2 + 1] ^ s[x2 + 11] ^ s[x2 + 21] ^ s[x2 + 31] ^ s[x2 + 41];
        }

        for (x = 0; x < 5; x++) {
          x2 = x * 2;
          i = ((x + 4) % 5) * 2;
          j = ((x + 1) % 5) * 2;
          h = c[i] ^ ((c[j] << 1) | (c[j + 1] >>> 31));
          l = c[i + 1] ^ ((c[j + 1] << 1) | (c[j] >>> 31));
          for (y = 0; y < 5; y++) {
            i = x2 + y * 10;
            s[i] ^= h;
            s[i + 1] ^= l;
          }
        }

        for (x = 0; x < 5; x++) {
          x2 = x * 2;
          for (y = 0; y < 5; y++) {
            i = x2 + y * 10;
            j = y * 2 + ((x2 + 3 * y) % 5) * 10;
            r = R[x + y * 5];
            if(r === 0) {
              b[j] = s[i];
              b[j + 1] = s[i + 1];
            } else if (r < 32) {
              b[j] = (s[i] << r) | (s[i + 1] >>> (32 - r));
              b[j + 1] = (s[i + 1] << r) | (s[i] >>> (32 - r));
            } else {
              b[j] = (s[i + 1] << (r - 32)) | (s[i] >>> (64 - r));
              b[j + 1] = (s[i] << (r - 32)) | (s[i + 1] >>> (64 - r));
            }
          }
        }

        for (x = 0; x < 5; x++) {
          x2 = x * 2;
          for (y = 0; y < 5; y++) {
            i = x2 + y * 10;
            j = (((x + 1) % 5) + 5 * y) * 2;
            k = (((x + 2) % 5) + 5 * y) * 2;
            s[i] = b[i] ^ (~b[j] & b[k]);
            s[i + 1] = b[i + 1] ^ (~b[j + 1] & b[k + 1]);
          }
        }
        s[0] ^= RC[n * 2];
        s[1] ^= RC[n * 2 + 1];
      }
    } while(!end);

    var hex = '';
    for(i = 0, n = bits / 32;i < n;++i) {
      hex += HEX_CHARS[(s[i] >> 4) & 0x0F] + HEX_CHARS[s[i] & 0x0F] +
             HEX_CHARS[(s[i] >> 12) & 0x0F] + HEX_CHARS[(s[i] >> 8) & 0x0F] +
             HEX_CHARS[(s[i] >> 20) & 0x0F] + HEX_CHARS[(s[i] >> 16) & 0x0F] +
             HEX_CHARS[(s[i] >> 28) & 0x0F] + HEX_CHARS[(s[i] >> 24) & 0x0F];
    }
    return hex;
  };
  
  if(!root.JS_SHA3_TEST && NODE_JS) {
    module.exports = {
      sha3_512: sha3,
      sha3_384: sha3_384,
      sha3_256: sha3_256,
      sha3_224: sha3_224
    };
  } else if(root) {
    root.sha3_512 = sha3;
    root.sha3_384 = sha3_384;
    root.sha3_256 = sha3_256;
    root.sha3_224 = sha3_224;
  }
}(this));
