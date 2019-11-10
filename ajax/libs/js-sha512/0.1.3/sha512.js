/*
 * js-sha512 v0.1.3
 * https://github.com/emn178/js-sha512
 *
 * Copyright 2014-2015, emn178@gmail.com
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
  var SHIFT = [24, 16, 8, 0];

  // Class Long
  var Long = function(high, low) {
    this.high = high << 0;
    this.low = low << 0;
  };

  if(root.JS_SHA512_TEST) {
    root.Long = Long;
  }

  Long.prototype.and = function(other) {
    return new Long(this.high & other.high, this.low & other.low);
  };

  Long.prototype.xor = function(other) {
    return new Long(this.high ^ other.high, this.low ^ other.low);
  };

  Long.prototype.not = function() {
    return new Long(~this.high, ~this.low);
  };

  Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if(numBits === 0) {
      return new Long(this.high, this.low);
    }
    if(numBits < 32) {
      return new Long(this.high >>> numBits, (this.low >>> numBits) |  (this.high << (32 - numBits)));
    } else if(numBits == 32) {
      return new Long(0, this.high);
    } else {
      return new Long(0, this.high >>> (numBits - 32));
    }
  };

  Long.prototype.rightRotate = function(numBits) {
    numBits &= 63;
    if(numBits === 0) {
      return new Long(this.high, this.low);
    }
    if(numBits < 32) {
      return new Long((this.high >>> numBits) | (this.low << (32 - numBits)), (this.low >>> numBits) |  (this.high << (32 - numBits)));
    } else if(numBits == 32) {
      return new Long(this.low, this.high);
    } else {
      return new Long((this.low >>> (numBits - 32)) | (this.high << (64 - numBits)), (this.high >>> (numBits - 32)) |  (this.low << (64 - numBits)));
    }
  };

  Long.prototype.add = function(other) {
    var a1 = this.low & 0xFFFF;
    var a2 = this.low >>> 16;
    var a3 = this.high & 0xFFFF;
    var a4 = this.high >>> 16;

    var b1 = other.low & 0xFFFF;
    var b2 = other.low >>> 16;
    var b3 = other.high & 0xFFFF;
    var b4 = other.high >>> 16;

    var c1 = a1 + b1;
    var c2 = a2 + b2 + (c1 >>> 16);
    var c3 = a3 + b3 + (c2 >>> 16);
    var c4 = a4 + b4 + (c3 >>> 16);
    return new Long((c4 << 16) | (c3 & 0xFFFF), (c2 << 16) | (c1 & 0xFFFF));
  };

  Long.prototype.toHexString = function() {
    return HEX_CHARS[(this.high >> 28) & 0x0F] + HEX_CHARS[(this.high >> 24) & 0x0F] +
           HEX_CHARS[(this.high >> 20) & 0x0F] + HEX_CHARS[(this.high >> 16) & 0x0F] +
           HEX_CHARS[(this.high >> 12) & 0x0F] + HEX_CHARS[(this.high >> 8) & 0x0F] +
           HEX_CHARS[(this.high >> 4) & 0x0F] + HEX_CHARS[this.high & 0x0F] +
           HEX_CHARS[(this.low >> 28) & 0x0F] + HEX_CHARS[(this.low >> 24) & 0x0F] +
           HEX_CHARS[(this.low >> 20) & 0x0F] + HEX_CHARS[(this.low >> 16) & 0x0F] +
           HEX_CHARS[(this.low >> 12) & 0x0F] + HEX_CHARS[(this.low >> 8) & 0x0F] +
           HEX_CHARS[(this.low >> 4) & 0x0F] + HEX_CHARS[this.low & 0x0F];
  };

  var K =[new Long(0x428A2F98, 0xD728AE22),  new Long(0x71374491, 0x23EF65CD),
          new Long(0xB5C0FBCF, 0xEC4D3B2F),  new Long(0xE9B5DBA5, 0x8189DBBC),
          new Long(0x3956C25B, 0xF348B538),  new Long(0x59F111F1, 0xB605D019),
          new Long(0x923F82A4, 0xAF194F9B),  new Long(0xAB1C5ED5, 0xDA6D8118),
          new Long(0xD807AA98, 0xA3030242),  new Long(0x12835B01, 0x45706FBE),
          new Long(0x243185BE, 0x4EE4B28C),  new Long(0x550C7DC3, 0xD5FFB4E2),
          new Long(0x72BE5D74, 0xF27B896F),  new Long(0x80DEB1FE, 0x3B1696B1),
          new Long(0x9BDC06A7, 0x25C71235),  new Long(0xC19BF174, 0xCF692694),
          new Long(0xE49B69C1, 0x9EF14AD2),  new Long(0xEFBE4786, 0x384F25E3),
          new Long(0x0FC19DC6, 0x8B8CD5B5),  new Long(0x240CA1CC, 0x77AC9C65),
          new Long(0x2DE92C6F, 0x592B0275),  new Long(0x4A7484AA, 0x6EA6E483),
          new Long(0x5CB0A9DC, 0xBD41FBD4),  new Long(0x76F988DA, 0x831153B5),
          new Long(0x983E5152, 0xEE66DFAB),  new Long(0xA831C66D, 0x2DB43210),
          new Long(0xB00327C8, 0x98FB213F),  new Long(0xBF597FC7, 0xBEEF0EE4),
          new Long(0xC6E00BF3, 0x3DA88FC2),  new Long(0xD5A79147, 0x930AA725),
          new Long(0x06CA6351, 0xE003826F),  new Long(0x14292967, 0x0A0E6E70),
          new Long(0x27B70A85, 0x46D22FFC),  new Long(0x2E1B2138, 0x5C26C926),
          new Long(0x4D2C6DFC, 0x5AC42AED),  new Long(0x53380D13, 0x9D95B3DF),
          new Long(0x650A7354, 0x8BAF63DE),  new Long(0x766A0ABB, 0x3C77B2A8),
          new Long(0x81C2C92E, 0x47EDAEE6),  new Long(0x92722C85, 0x1482353B),
          new Long(0xA2BFE8A1, 0x4CF10364),  new Long(0xA81A664B, 0xBC423001),
          new Long(0xC24B8B70, 0xD0F89791),  new Long(0xC76C51A3, 0x0654BE30),
          new Long(0xD192E819, 0xD6EF5218),  new Long(0xD6990624, 0x5565A910),
          new Long(0xF40E3585, 0x5771202A),  new Long(0x106AA070, 0x32BBD1B8),
          new Long(0x19A4C116, 0xB8D2D0C8),  new Long(0x1E376C08, 0x5141AB53),
          new Long(0x2748774C, 0xDF8EEB99),  new Long(0x34B0BCB5, 0xE19B48A8),
          new Long(0x391C0CB3, 0xC5C95A63),  new Long(0x4ED8AA4A, 0xE3418ACB),
          new Long(0x5B9CCA4F, 0x7763E373),  new Long(0x682E6FF3, 0xD6B2B8A3),
          new Long(0x748F82EE, 0x5DEFB2FC),  new Long(0x78A5636F, 0x43172F60),
          new Long(0x84C87814, 0xA1F0AB72),  new Long(0x8CC70208, 0x1A6439EC),
          new Long(0x90BEFFFA, 0x23631E28),  new Long(0xA4506CEB, 0xDE82BDE9),
          new Long(0xBEF9A3F7, 0xB2C67915),  new Long(0xC67178F2, 0xE372532B),
          new Long(0xCA273ECE, 0xEA26619C),  new Long(0xD186B8C7, 0x21C0C207),
          new Long(0xEADA7DD6, 0xCDE0EB1E),  new Long(0xF57D4F7F, 0xEE6ED178),
          new Long(0x06F067AA, 0x72176FBA),  new Long(0x0A637DC5, 0xA2C898A6),
          new Long(0x113F9804, 0xBEF90DAE),  new Long(0x1B710B35, 0x131C471B),
          new Long(0x28DB77F5, 0x23047D84),  new Long(0x32CAAB7B, 0x40C72493),
          new Long(0x3C9EBE0A, 0x15C9BEBC),  new Long(0x431D67C4, 0x9C100D4C),
          new Long(0x4CC5D4BE, 0xCB3E42B6),  new Long(0x597F299C, 0xFC657E2A),
          new Long(0x5FCB6FAB, 0x3AD6FAEC),  new Long(0x6C44198C, 0x4A475817)];

  var sha512 = function(message, asciiOnly) {
    return sha2(message, 512, asciiOnly);
  };

  var sha384 = function(message, asciiOnly) {
    return sha2(message, 384, asciiOnly);
  };

  var sha512_256 = function(message, asciiOnly) {
    return sha2(message, 256, asciiOnly);
  };

  var sha512_224 = function(message, asciiOnly) {
    return sha2(message, 224, asciiOnly);
  };

  var sha2 = function(message, tbit, asciiOnly) {
    var blocks, h0, h1, h2, h3, h4, h5, h6, h7;
    if(!asciiOnly && /[^\x00-\x7F]/.test(message)) {
      blocks = getBlocksFromUtf8(message);
    } else {
      blocks = getBlocksFromAscii(message);
    }

    if(tbit == 512) {
      h0 = new Long(0x6A09E667, 0xF3BCC908);
      h1 = new Long(0xBB67AE85, 0x84CAA73B);
      h2 = new Long(0x3C6EF372, 0xFE94F82B);
      h3 = new Long(0xA54FF53A, 0x5F1D36F1);
      h4 = new Long(0x510E527F, 0xADE682D1);
      h5 = new Long(0x9B05688C, 0x2B3E6C1F);
      h6 = new Long(0x1F83D9AB, 0xFB41BD6B);
      h7 = new Long(0x5BE0CD19, 0x137E2179);
    } else if(tbit == 384) {
      h0 = new Long(0xCBBB9D5D, 0xC1059ED8);
      h1 = new Long(0x629A292A, 0x367CD507);
      h2 = new Long(0x9159015A, 0x3070DD17);
      h3 = new Long(0x152FECD8, 0xF70E5939);
      h4 = new Long(0x67332667, 0xFFC00B31);
      h5 = new Long(0x8EB44A87, 0x68581511);
      h6 = new Long(0xDB0C2E0D, 0x64F98FA7);
      h7 = new Long(0x47B5481D, 0xBEFA4FA4);
    } else if(tbit == 256) {
      h0 = new Long(0x22312194, 0xFC2BF72C);
      h1 = new Long(0x9F555FA3, 0xC84C64C2);
      h2 = new Long(0x2393B86B, 0x6F53B151);
      h3 = new Long(0x96387719, 0x5940EABD);
      h4 = new Long(0x96283EE2, 0xA88EFFE3);
      h5 = new Long(0xBE5E1E25, 0x53863992);
      h6 = new Long(0x2B0199FC, 0x2C85B8AA);
      h7 = new Long(0x0EB72DDC, 0x81C52CA2);
    } else if(tbit == 224) {
      h0 = new Long(0x8C3D37C8, 0x19544DA2);
      h1 = new Long(0x73E19966, 0x89DCD4D6);
      h2 = new Long(0x1DFAB7AE, 0x32FF9C82);
      h3 = new Long(0x679DD514, 0x582F9FCF);
      h4 = new Long(0x0F6D2B69, 0x7BD44DA8);
      h5 = new Long(0x77E36F73, 0x04C48942);
      h6 = new Long(0x3F9D85A8, 0x6A1D36C8);
      h7 = new Long(0x1112E6AD, 0x91D692A1);
    }

    for(var i = 0, length = blocks.length;i < length;i += 16) {
      var w = [], s0, s1, j;
      for(j = 0;j < 16;++j) {
        w[j] = blocks[i + j];
      }
      for(j = 16;j < 80;++j) {
        s0 = w[j - 15].rightRotate(1).xor(w[j - 15].rightRotate(8)).xor(w[j - 15].shiftRightUnsigned(7));
        s1 = w[j - 2].rightRotate(19).xor(w[j - 2].rightRotate(61)).xor(w[j - 2].shiftRightUnsigned(6));
        w[j] = w[j - 16].add(s0).add(w[j - 7]).add(s1);
      }

      var a = h0;
      var b = h1;
      var c = h2;
      var d = h3;
      var e = h4;
      var f = h5;
      var g = h6;
      var h = h7;
      var maj, t1, t2, ch;

      for(j = 0;j < 80;++j) {
        s0 = a.rightRotate(28).xor(a.rightRotate(34)).xor(a.rightRotate(39));
        maj = a.and(b).xor(a.and(c)).xor(b.and(c));
        t2 = s0.add(maj);
        s1 = e.rightRotate(14).xor(e.rightRotate(18)).xor(e.rightRotate(41));
        ch = e.and(f).xor(e.not().and(g));
        t1 = h.add(s1).add(ch).add(K[j]).add(w[j]);

        h = g;
        g = f;
        f = e;
        e = d.add(t1);
        d = c;
        c = b;
        b = a;
        a = t1.add(t2);
      }

      h0 = h0.add(a);
      h1 = h1.add(b);
      h2 = h2.add(c);
      h3 = h3.add(d);
      h4 = h4.add(e);
      h5 = h5.add(f);
      h6 = h6.add(g);
      h7 = h7.add(h);
    }

    var hex = h0.toHexString() + h1.toHexString() + h2.toHexString() + h3.toHexString();
    if(tbit == 224) {
      return hex.substr(0, hex.length - 8);
    }
    if(tbit >= 384) {
      hex += h4.toHexString() + h5.toHexString();
    }
    if(tbit == 512) {
      hex += h6.toHexString() + h7.toHexString();
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
    // a block is 32 bits(4 bytes), a chunk is 1024 bits(128 bytes)
    var length = message.length;
    var chunkCount = ((length + 16) >> 7) + 1;
    var blockCount = chunkCount << 5; // chunkCount * 32
    var blocks = [], i;
    for(i = 0;i < blockCount;++i) {
      blocks[i] = 0;
    }
    for(i = 0;i < length;++i) {
      blocks[i >> 2] |= message.charCodeAt(i) << SHIFT[i & 3];
    }
    blocks[i >> 2] |= 0x80 << SHIFT[i & 3];
    blocks[blockCount - 1] = length << 3; // length * 8
    var blocks64 = [];
    for(i = 0;i < blockCount;i += 2) {
      blocks64[i >> 1] = new Long(blocks[i], blocks[i + 1]);
    }
    return blocks64;
  };
  
  var getBlocksFromUtf8 = function(message) {
    var bytes = getBytesFromUtf8(message);
    var length = bytes.length;
    var chunkCount = ((length + 16) >> 7) + 1;
    var blockCount = chunkCount << 5; // chunkCount * 32
    var blocks = [], i;
    for(i = 0;i < blockCount;++i) {
      blocks[i] = 0;
    }
    for(i = 0;i < length;++i) {
      blocks[i >> 2] |= bytes[i] << SHIFT[i & 3];
    }
    blocks[i >> 2] |= 0x80 << SHIFT[i & 3];
    blocks[blockCount - 1] = length << 3; // length * 8
    var blocks64 = [];
    for(i = 0;i < blockCount;i += 2) {
      blocks64[i >> 1] = new Long(blocks[i], blocks[i + 1]);
    }
    return blocks64;
  };

  if(!root.JS_SHA512_TEST && NODE_JS) {
    sha512.sha512 = sha512;
    sha512.sha384 = sha384;
    sha512.sha512_256 = sha512_256;
    sha512.sha512_224 = sha512_224;
    module.exports = sha512;
  } else if(root) {
    root.sha512 = sha512;
    root.sha384 = sha384;
    root.sha512_256 = sha512_256;
    root.sha512_224 = sha512_224;
  }
}(this));
