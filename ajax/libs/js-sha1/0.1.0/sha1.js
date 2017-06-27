(function(root, undefined){
  'use strict';

  var HEX_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  var HEX_TABLE = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15,
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
  };

  var sha1 = function(message) {
    var blocks = hasUTF8(message) ? UTF8toBlocks(message) : ASCIItoBlocks(message);
    var h0 = 0x67452301;
    var h1 = 0xEFCDAB89;
    var h2 = 0x98BADCFE;
    var h3 = 0x10325476;
    var h4 = 0xC3D2E1F0;

    for(var i = 0, length = blocks.length;i < length;i += 16)
    {
      var w = [];
      for(var j = 0;j < 16;++j)
        w[j] = blocks[i + j];
      for(var j = 16;j < 80;++j)
      {
        var x = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
        w[j] = leftrotate(x, 1);
      }

      var a = h0;
      var b = h1;
      var c = h2;
      var d = h3;
      var e = h4;
      var f, k, tmp;

      for(var j = 0;j < 20;++j)
      {
        f = (b & c) | ((~b) & d);
        tmp = leftrotate(a, 5) + f + e + 0x5A827999 + w[j];
        e = d;
        d = c;
        c = leftrotate(b, 30);
        b = a;
        a = tmp;
      }

      for(;j < 40;++j)
      {
        f = b ^ c ^ d;
        tmp = leftrotate(a, 5) + f + e + 0x6ED9EBA1 + w[j];
        e = d;
        d = c;
        c = leftrotate(b, 30);
        b = a;
        a = tmp;
      }

      // k = 0x8F1BBCDC;
      for(;j < 60;++j)
      {
        f = (b & c) | (b & d) | (c & d);
        tmp = leftrotate(a, 5) + f + e + 0x8F1BBCDC + w[j];
        e = d;
        d = c;
        c = leftrotate(b, 30);
        b = a;
        a = tmp;
      }

      for(;j < 80;++j)
      {
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
    var hex = "";
    for(var i = 0; i < 4; i++)
    {
      var offset = 3 - i << 3;
      hex += HEX_CHARS[(num >> (offset + 4)) & 0x0F] + HEX_CHARS[(num >> offset) & 0x0F];
    }
    return hex;
  };

  var hasUTF8 = function(message) {
    var i = message.length;
    while(i--)
      if(message.charCodeAt(i) > 255)
        return true;
    return false;
  };

  var ASCIItoBlocks = function(message) {
    // a block is 32 bits(4 bytes), a chunk is 512 bits(64 bytes)
    var length = message.length;
    var chunkCount = ((length + 8) >> 6) + 1;
    var blockCount = chunkCount << 4; // chunkCount * 16
    var blocks = [];
    var i;
    for(i = 0;i < blockCount;++i)
      blocks[i] = 0;
    for(i = 0;i < length;++i)
      blocks[i >> 2] |= message.charCodeAt(i) << (3 - (i % 4) << 3);
    blocks[i >> 2] |= 0x80 << (3 - (i % 4) << 3);
    blocks[blockCount - 1] = length << 3; // length * 8
    return blocks;
  };

  var UTF8toBlocks = function(message) {
    var uri = encodeURIComponent(message);
    var blocks = [];
    for(var i = 0, bytes = 0, length = uri.length;i < length;++i)
    {
      var c = uri.charCodeAt(i);
      if(c == 37) // %
        blocks[bytes >> 2] |= ((HEX_TABLE[uri.charAt(++i)] << 4) | HEX_TABLE[uri.charAt(++i)]) << (3 - (bytes % 4) << 3);
      else
        blocks[bytes >> 2] |= c << (3 - (bytes % 4) << 3);
      ++bytes;
    }
    var chunkCount = ((bytes + 8) >> 6) + 1;
    var blockCount = chunkCount << 4; // chunkCount * 16
    var index = bytes >> 2;
    blocks[index] |= 0x80 << (3 - (bytes % 4) << 3);
    for(var i = index + 1;i < blockCount;++i)
      blocks[i] = 0;
    blocks[blockCount - 1] = bytes << 3; // bytes * 8
    return blocks;
  };

  if(typeof(module) != 'undefined')
    module.exports = sha1;
  else if(root)
    root.sha1 = sha1;
}(this));
