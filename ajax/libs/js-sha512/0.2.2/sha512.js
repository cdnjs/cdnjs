/*
 * js-sha512 v0.2.2
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
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K =[0x428A2F98, 0xD728AE22, 0x71374491, 0x23EF65CD,
          0xB5C0FBCF, 0xEC4D3B2F, 0xE9B5DBA5, 0x8189DBBC,
          0x3956C25B, 0xF348B538, 0x59F111F1, 0xB605D019,
          0x923F82A4, 0xAF194F9B, 0xAB1C5ED5, 0xDA6D8118,
          0xD807AA98, 0xA3030242, 0x12835B01, 0x45706FBE,
          0x243185BE, 0x4EE4B28C, 0x550C7DC3, 0xD5FFB4E2,
          0x72BE5D74, 0xF27B896F, 0x80DEB1FE, 0x3B1696B1,
          0x9BDC06A7, 0x25C71235, 0xC19BF174, 0xCF692694,
          0xE49B69C1, 0x9EF14AD2, 0xEFBE4786, 0x384F25E3,
          0x0FC19DC6, 0x8B8CD5B5, 0x240CA1CC, 0x77AC9C65,
          0x2DE92C6F, 0x592B0275, 0x4A7484AA, 0x6EA6E483,
          0x5CB0A9DC, 0xBD41FBD4, 0x76F988DA, 0x831153B5,
          0x983E5152, 0xEE66DFAB, 0xA831C66D, 0x2DB43210,
          0xB00327C8, 0x98FB213F, 0xBF597FC7, 0xBEEF0EE4,
          0xC6E00BF3, 0x3DA88FC2, 0xD5A79147, 0x930AA725,
          0x06CA6351, 0xE003826F, 0x14292967, 0x0A0E6E70,
          0x27B70A85, 0x46D22FFC, 0x2E1B2138, 0x5C26C926,
          0x4D2C6DFC, 0x5AC42AED, 0x53380D13, 0x9D95B3DF,
          0x650A7354, 0x8BAF63DE, 0x766A0ABB, 0x3C77B2A8,
          0x81C2C92E, 0x47EDAEE6, 0x92722C85, 0x1482353B,
          0xA2BFE8A1, 0x4CF10364, 0xA81A664B, 0xBC423001,
          0xC24B8B70, 0xD0F89791, 0xC76C51A3, 0x0654BE30,
          0xD192E819, 0xD6EF5218, 0xD6990624, 0x5565A910,
          0xF40E3585, 0x5771202A, 0x106AA070, 0x32BBD1B8,
          0x19A4C116, 0xB8D2D0C8, 0x1E376C08, 0x5141AB53,
          0x2748774C, 0xDF8EEB99, 0x34B0BCB5, 0xE19B48A8,
          0x391C0CB3, 0xC5C95A63, 0x4ED8AA4A, 0xE3418ACB,
          0x5B9CCA4F, 0x7763E373, 0x682E6FF3, 0xD6B2B8A3,
          0x748F82EE, 0x5DEFB2FC, 0x78A5636F, 0x43172F60,
          0x84C87814, 0xA1F0AB72, 0x8CC70208, 0x1A6439EC,
          0x90BEFFFA, 0x23631E28, 0xA4506CEB, 0xDE82BDE9,
          0xBEF9A3F7, 0xB2C67915, 0xC67178F2, 0xE372532B,
          0xCA273ECE, 0xEA26619C, 0xD186B8C7, 0x21C0C207,
          0xEADA7DD6, 0xCDE0EB1E, 0xF57D4F7F, 0xEE6ED178,
          0x06F067AA, 0x72176FBA, 0x0A637DC5, 0xA2C898A6,
          0x113F9804, 0xBEF90DAE, 0x1B710B35, 0x131C471B,
          0x28DB77F5, 0x23047D84, 0x32CAAB7B, 0x40C72493,
          0x3C9EBE0A, 0x15C9BEBC, 0x431D67C4, 0x9C100D4C,
          0x4CC5D4BE, 0xCB3E42B6, 0x597F299C, 0xFC657E2A,
          0x5FCB6FAB, 0x3AD6FAEC, 0x6C44198C, 0x4A475817];

  var blocks = [];

  var sha384 = function(message) {
    return sha512(message, 384);
  };

  var sha512_256 = function(message) {
    return sha512(message, 256);
  };

  var sha512_224 = function(message) {
    return sha512(message, 224);
  };

  var sha512 = function(message, bits) {
    var h0h, h0l, h1h, h1l, h2h, h2l, h3h, h3l, 
        h4h, h4l, h5h, h5l, h6h, h6l, h7h, h7l, block, code, end = false,
        i, j, index = 0, start = 0, bytes = 0, length = message.length,
        s0h, s0l, s1h, s1l, c1, c2, c3, c4, 
        abh, abl, dah, dal, cdh, cdl, bch, bcl,
        majh, majl, t1h, t1l, t2h, t2l, chh, chl;

    if(bits == 384) {
      h0h = 0xCBBB9D5D;
      h0l = 0xC1059ED8;
      h1h = 0x629A292A;
      h1l = 0x367CD507;
      h2h = 0x9159015A;
      h2l = 0x3070DD17;
      h3h = 0x152FECD8;
      h3l = 0xF70E5939;
      h4h = 0x67332667;
      h4l = 0xFFC00B31;
      h5h = 0x8EB44A87;
      h5l = 0x68581511;
      h6h = 0xDB0C2E0D;
      h6l = 0x64F98FA7;
      h7h = 0x47B5481D;
      h7l = 0xBEFA4FA4;
    } else if(bits == 256) {
      h0h = 0x22312194;
      h0l = 0xFC2BF72C;
      h1h = 0x9F555FA3;
      h1l = 0xC84C64C2;
      h2h = 0x2393B86B;
      h2l = 0x6F53B151;
      h3h = 0x96387719;
      h3l = 0x5940EABD;
      h4h = 0x96283EE2;
      h4l = 0xA88EFFE3;
      h5h = 0xBE5E1E25;
      h5l = 0x53863992;
      h6h = 0x2B0199FC;
      h6l = 0x2C85B8AA;
      h7h = 0x0EB72DDC;
      h7l = 0x81C52CA2;
    } else if(bits == 224) {
      h0h = 0x8C3D37C8;
      h0l = 0x19544DA2;
      h1h = 0x73E19966;
      h1l = 0x89DCD4D6;
      h2h = 0x1DFAB7AE;
      h2l = 0x32FF9C82;
      h3h = 0x679DD514;
      h3l = 0x582F9FCF;
      h4h = 0x0F6D2B69;
      h4l = 0x7BD44DA8;
      h5h = 0x77E36F73;
      h5l = 0x04C48942;
      h6h = 0x3F9D85A8;
      h6l = 0x6A1D36C8;
      h7h = 0x1112E6AD;
      h7l = 0x91D692A1;
    } else { // 512
      h0h = 0x6A09E667;
      h0l = 0xF3BCC908;
      h1h = 0xBB67AE85;
      h1l = 0x84CAA73B;
      h2h = 0x3C6EF372;
      h2l = 0xFE94F82B;
      h3h = 0xA54FF53A;
      h3l = 0x5F1D36F1;
      h4h = 0x510E527F;
      h4l = 0xADE682D1;
      h5h = 0x9B05688C;
      h5l = 0x2B3E6C1F;
      h6h = 0x1F83D9AB;
      h6l = 0xFB41BD6B;
      h7h = 0x5BE0CD19;
      h7l = 0x137E2179;
      bits = 512;
    }
    block = 0;
    do {
      blocks[0] = block;
      blocks[1] = blocks[2] = blocks[3] = blocks[4] = 
      blocks[5] = blocks[6] = blocks[7] = blocks[8] = 
      blocks[9] = blocks[10] = blocks[11] = blocks[12] = 
      blocks[13] = blocks[14] = blocks[15] = blocks[16] = 
      blocks[17] = blocks[18] = blocks[19] = blocks[20] =
      blocks[21] = blocks[22] = blocks[23] = blocks[24] =
      blocks[25] = blocks[26] = blocks[27] = blocks[28] =
      blocks[29] = blocks[30] = blocks[31] = blocks[32] = 0;
      for (i = start;index < length && i < 128; ++index) {
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
      bytes += i - start;
      start = i - 128;
      if(index == length) {
        blocks[i >> 2] |= EXTRA[i & 3];
        ++index;
      }
      block = blocks[32];
      if(index > length && i < 112) {
        blocks[31] = bytes << 3;
        end = true;
      }

      for(j = 32;j < 160;j += 2) {
        t1h = blocks[j - 30];
        t1l = blocks[j - 29];
        s0h = ((t1h >>> 1) | (t1l << 31)) ^ ((t1h >>> 8) | (t1l << 24)) ^ (t1h >>> 7);
        s0l = ((t1l >>> 1) | (t1h << 31)) ^ ((t1l >>> 8) | (t1h << 24)) ^ ((t1l >>> 7) | t1h << 25);

        t1h = blocks[j - 4];
        t1l = blocks[j - 3];
        s1h = ((t1h >>> 19) | (t1l << 13)) ^ ((t1l >>> 29) | (t1h << 3)) ^ (t1h >>> 6);
        s1l = ((t1l >>> 19) | (t1h << 13)) ^ ((t1h >>> 29) | (t1l << 3)) ^ ((t1l >>> 6) | t1h << 26);

        t1h = blocks[j - 32];
        t1l = blocks[j - 31];
        t2h = blocks[j - 14];
        t2l = blocks[j - 13];

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (s0l & 0xFFFF) + (s1l & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (s0h & 0xFFFF) + (s1h & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16);

        blocks[j] = (c4 << 16) | (c3 & 0xFFFF);
        blocks[j + 1] = (c2 << 16) | (c1 & 0xFFFF);
      }

      var ah = h0h, al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l, eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;
      bch = bh & ch;
      bcl = bl & cl;
      for(j = 0;j < 160;j += 8) {
        s0h = ((ah >>> 28) | (al << 4)) ^ ((al >>> 2) | (ah << 30)) ^ ((al >>> 7) | (ah << 25));
        s0l = ((al >>> 28) | (ah << 4)) ^ ((ah >>> 2) | (al << 30)) ^ ((ah >>> 7) | (al << 25));

        s1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((el >>> 9) | (eh << 23));
        s1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((eh >>> 9) | (el << 23));

        abh = ah & bh;
        abl = al & bl;
        majh = abh ^ (ah & ch) ^ bch;
        majl = abl ^ (al & cl) ^ bcl;

        chh = (eh & fh) ^ (~eh & gh);
        chl = (el & fl) ^ (~el & gl);

        t1h = blocks[j];
        t1l = blocks[j + 1];
        t2h = K[j];
        t2l = K[j + 1];

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (hl & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (hl >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (hh >>> 16) + (c3 >>> 16);

        t1h = (c4 << 16) | (c3 & 0xFFFF);
        t1l = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
        c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
        c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
        c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

        t2h = (c4 << 16) | (c3 & 0xFFFF);
        t2l = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (dl & 0xFFFF) + (t1l & 0xFFFF);
        c2 = (dl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (dh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
        c4 = (dh >>> 16) + (t1h >>> 16) + (c3 >>> 16);

        hh = (c4 << 16) | (c3 & 0xFFFF);
        hl = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

        dh = (c4 << 16) | (c3 & 0xFFFF);
        dl = (c2 << 16) | (c1 & 0xFFFF);

        s0h = ((dh >>> 28) | (dl << 4)) ^ ((dl >>> 2) | (dh << 30)) ^ ((dl >>> 7) | (dh << 25));
        s0l = ((dl >>> 28) | (dh << 4)) ^ ((dh >>> 2) | (dl << 30)) ^ ((dh >>> 7) | (dl << 25));

        s1h = ((hh >>> 14) | (hl << 18)) ^ ((hh >>> 18) | (hl << 14)) ^ ((hl >>> 9) | (hh << 23));
        s1l = ((hl >>> 14) | (hh << 18)) ^ ((hl >>> 18) | (hh << 14)) ^ ((hh >>> 9) | (hl << 23));

        dah = dh & ah;
        dal = dl & al;
        majh = dah ^ (dh & bh) ^ abh;
        majl = dal ^ (dl & bl) ^ abl;

        chh = (hh & eh) ^ (~hh & fh);
        chl = (hl & el) ^ (~hl & fl);

        t1h = blocks[j + 2];
        t1l = blocks[j + 3];
        t2h = K[j + 2];
        t2l = K[j + 3];

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (gl & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (gl >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (gh >>> 16) + (c3 >>> 16);

        t1h = (c4 << 16) | (c3 & 0xFFFF);
        t1l = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
        c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
        c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
        c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

        t2h = (c4 << 16) | (c3 & 0xFFFF);
        t2l = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (cl & 0xFFFF) + (t1l & 0xFFFF);
        c2 = (cl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (ch & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
        c4 = (ch >>> 16) + (t1h >>> 16) + (c3 >>> 16);

        gh = (c4 << 16) | (c3 & 0xFFFF);
        gl = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

        ch = (c4 << 16) | (c3 & 0xFFFF);
        cl = (c2 << 16) | (c1 & 0xFFFF);

        s0h = ((ch >>> 28) | (cl << 4)) ^ ((cl >>> 2) | (ch << 30)) ^ ((cl >>> 7) | (ch << 25));
        s0l = ((cl >>> 28) | (ch << 4)) ^ ((ch >>> 2) | (cl << 30)) ^ ((ch >>> 7) | (cl << 25));

        s1h = ((gh >>> 14) | (gl << 18)) ^ ((gh >>> 18) | (gl << 14)) ^ ((gl >>> 9) | (gh << 23));
        s1l = ((gl >>> 14) | (gh << 18)) ^ ((gl >>> 18) | (gh << 14)) ^ ((gh >>> 9) | (gl << 23));

        cdh = ch & dh;
        cdl = cl & dl;
        majh = cdh ^ (ch & ah) ^ dah;
        majl = cdl ^ (cl & al) ^ dal;

        chh = (gh & hh) ^ (~gh & eh);
        chl = (gl & hl) ^ (~gl & el);

        t1h = blocks[j + 4];
        t1l = blocks[j + 5];
        t2h = K[j + 4];
        t2l = K[j + 5];

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (fl & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (fl >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (fh >>> 16) + (c3 >>> 16);

        t1h = (c4 << 16) | (c3 & 0xFFFF);
        t1l = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
        c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
        c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
        c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

        t2h = (c4 << 16) | (c3 & 0xFFFF);
        t2l = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (bl & 0xFFFF) + (t1l & 0xFFFF);
        c2 = (bl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (bh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
        c4 = (bh >>> 16) + (t1h >>> 16) + (c3 >>> 16);

        fh = (c4 << 16) | (c3 & 0xFFFF);
        fl = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

        bh = (c4 << 16) | (c3 & 0xFFFF);
        bl = (c2 << 16) | (c1 & 0xFFFF);

        s0h = ((bh >>> 28) | (bl << 4)) ^ ((bl >>> 2) | (bh << 30)) ^ ((bl >>> 7) | (bh << 25));
        s0l = ((bl >>> 28) | (bh << 4)) ^ ((bh >>> 2) | (bl << 30)) ^ ((bh >>> 7) | (bl << 25));

        s1h = ((fh >>> 14) | (fl << 18)) ^ ((fh >>> 18) | (fl << 14)) ^ ((fl >>> 9) | (fh << 23));
        s1l = ((fl >>> 14) | (fh << 18)) ^ ((fl >>> 18) | (fh << 14)) ^ ((fh >>> 9) | (fl << 23));

        bch = bh & ch;
        bcl = bl & cl;
        majh = bch ^ (bh & dh) ^ cdh;
        majl = bcl ^ (bl & dl) ^ cdl;

        chh = (fh & gh) ^ (~fh & hh);
        chl = (fl & gl) ^ (~fl & hl);

        t1h = blocks[j + 6];
        t1l = blocks[j + 7];
        t2h = K[j + 6];
        t2l = K[j + 7];

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (el & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (el >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (eh >>> 16) + (c3 >>> 16);

        t1h = (c4 << 16) | (c3 & 0xFFFF);
        t1l = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
        c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
        c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
        c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

        t2h = (c4 << 16) | (c3 & 0xFFFF);
        t2l = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (al & 0xFFFF) + (t1l & 0xFFFF);
        c2 = (al >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (ah & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
        c4 = (ah >>> 16) + (t1h >>> 16) + (c3 >>> 16);

        eh = (c4 << 16) | (c3 & 0xFFFF);
        el = (c2 << 16) | (c1 & 0xFFFF);

        c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

        ah = (c4 << 16) | (c3 & 0xFFFF);
        al = (c2 << 16) | (c1 & 0xFFFF);
      }

      c1 = (h0l & 0xFFFF) + (al & 0xFFFF);
      c2 = (h0l >>> 16) + (al >>> 16) + (c1 >>> 16);
      c3 = (h0h & 0xFFFF) + (ah & 0xFFFF) + (c2 >>> 16);
      c4 = (h0h >>> 16) + (ah >>> 16) + (c3 >>> 16);

      h0h = (c4 << 16) | (c3 & 0xFFFF);
      h0l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (h1l & 0xFFFF) + (bl & 0xFFFF);
      c2 = (h1l >>> 16) + (bl >>> 16) + (c1 >>> 16);
      c3 = (h1h & 0xFFFF) + (bh & 0xFFFF) + (c2 >>> 16);
      c4 = (h1h >>> 16) + (bh >>> 16) + (c3 >>> 16);

      h1h = (c4 << 16) | (c3 & 0xFFFF);
      h1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (h2l & 0xFFFF) + (cl & 0xFFFF);
      c2 = (h2l >>> 16) + (cl >>> 16) + (c1 >>> 16);
      c3 = (h2h & 0xFFFF) + (ch & 0xFFFF) + (c2 >>> 16);
      c4 = (h2h >>> 16) + (ch >>> 16) + (c3 >>> 16);

      h2h = (c4 << 16) | (c3 & 0xFFFF);
      h2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (h3l & 0xFFFF) + (dl & 0xFFFF);
      c2 = (h3l >>> 16) + (dl >>> 16) + (c1 >>> 16);
      c3 = (h3h & 0xFFFF) + (dh & 0xFFFF) + (c2 >>> 16);
      c4 = (h3h >>> 16) + (dh >>> 16) + (c3 >>> 16);

      h3h = (c4 << 16) | (c3 & 0xFFFF);
      h3l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (h4l & 0xFFFF) + (el & 0xFFFF);
      c2 = (h4l >>> 16) + (el >>> 16) + (c1 >>> 16);
      c3 = (h4h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
      c4 = (h4h >>> 16) + (eh >>> 16) + (c3 >>> 16);

      h4h = (c4 << 16) | (c3 & 0xFFFF);
      h4l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (h5l & 0xFFFF) + (fl & 0xFFFF);
      c2 = (h5l >>> 16) + (fl >>> 16) + (c1 >>> 16);
      c3 = (h5h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
      c4 = (h5h >>> 16) + (fh >>> 16) + (c3 >>> 16);

      h5h = (c4 << 16) | (c3 & 0xFFFF);
      h5l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (h6l & 0xFFFF) + (gl & 0xFFFF);
      c2 = (h6l >>> 16) + (gl >>> 16) + (c1 >>> 16);
      c3 = (h6h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
      c4 = (h6h >>> 16) + (gh >>> 16) + (c3 >>> 16);

      h6h = (c4 << 16) | (c3 & 0xFFFF);
      h6l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (h7l & 0xFFFF) + (hl & 0xFFFF);
      c2 = (h7l >>> 16) + (hl >>> 16) + (c1 >>> 16);
      c3 = (h7h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
      c4 = (h7h >>> 16) + (hh >>> 16) + (c3 >>> 16);

      h7h = (c4 << 16) | (c3 & 0xFFFF);
      h7l = (c2 << 16) | (c1 & 0xFFFF);
    } while(!end);

    var hex = HEX_CHARS[(h0h >> 28) & 0x0F] + HEX_CHARS[(h0h >> 24) & 0x0F] +
              HEX_CHARS[(h0h >> 20) & 0x0F] + HEX_CHARS[(h0h >> 16) & 0x0F] +
              HEX_CHARS[(h0h >> 12) & 0x0F] + HEX_CHARS[(h0h >> 8) & 0x0F] +
              HEX_CHARS[(h0h >> 4) & 0x0F] + HEX_CHARS[h0h & 0x0F] +
              HEX_CHARS[(h0l >> 28) & 0x0F] + HEX_CHARS[(h0l >> 24) & 0x0F] +
              HEX_CHARS[(h0l >> 20) & 0x0F] + HEX_CHARS[(h0l >> 16) & 0x0F] +
              HEX_CHARS[(h0l >> 12) & 0x0F] + HEX_CHARS[(h0l >> 8) & 0x0F] +
              HEX_CHARS[(h0l >> 4) & 0x0F] + HEX_CHARS[h0l & 0x0F] +
              HEX_CHARS[(h1h >> 28) & 0x0F] + HEX_CHARS[(h1h >> 24) & 0x0F] +
              HEX_CHARS[(h1h >> 20) & 0x0F] + HEX_CHARS[(h1h >> 16) & 0x0F] +
              HEX_CHARS[(h1h >> 12) & 0x0F] + HEX_CHARS[(h1h >> 8) & 0x0F] +
              HEX_CHARS[(h1h >> 4) & 0x0F] + HEX_CHARS[h1h & 0x0F] +
              HEX_CHARS[(h1l >> 28) & 0x0F] + HEX_CHARS[(h1l >> 24) & 0x0F] +
              HEX_CHARS[(h1l >> 20) & 0x0F] + HEX_CHARS[(h1l >> 16) & 0x0F] +
              HEX_CHARS[(h1l >> 12) & 0x0F] + HEX_CHARS[(h1l >> 8) & 0x0F] +
              HEX_CHARS[(h1l >> 4) & 0x0F] + HEX_CHARS[h1l & 0x0F] +
              HEX_CHARS[(h2h >> 28) & 0x0F] + HEX_CHARS[(h2h >> 24) & 0x0F] +
              HEX_CHARS[(h2h >> 20) & 0x0F] + HEX_CHARS[(h2h >> 16) & 0x0F] +
              HEX_CHARS[(h2h >> 12) & 0x0F] + HEX_CHARS[(h2h >> 8) & 0x0F] +
              HEX_CHARS[(h2h >> 4) & 0x0F] + HEX_CHARS[h2h & 0x0F] +
              HEX_CHARS[(h2l >> 28) & 0x0F] + HEX_CHARS[(h2l >> 24) & 0x0F] +
              HEX_CHARS[(h2l >> 20) & 0x0F] + HEX_CHARS[(h2l >> 16) & 0x0F] +
              HEX_CHARS[(h2l >> 12) & 0x0F] + HEX_CHARS[(h2l >> 8) & 0x0F] +
              HEX_CHARS[(h2l >> 4) & 0x0F] + HEX_CHARS[h2l & 0x0F] +
              HEX_CHARS[(h3h >> 28) & 0x0F] + HEX_CHARS[(h3h >> 24) & 0x0F] +
              HEX_CHARS[(h3h >> 20) & 0x0F] + HEX_CHARS[(h3h >> 16) & 0x0F] +
              HEX_CHARS[(h3h >> 12) & 0x0F] + HEX_CHARS[(h3h >> 8) & 0x0F] +
              HEX_CHARS[(h3h >> 4) & 0x0F] + HEX_CHARS[h3h & 0x0F];
    if(bits >= 256) {
      hex += HEX_CHARS[(h3l >> 28) & 0x0F] + HEX_CHARS[(h3l >> 24) & 0x0F] +
             HEX_CHARS[(h3l >> 20) & 0x0F] + HEX_CHARS[(h3l >> 16) & 0x0F] +
             HEX_CHARS[(h3l >> 12) & 0x0F] + HEX_CHARS[(h3l >> 8) & 0x0F] +
             HEX_CHARS[(h3l >> 4) & 0x0F] + HEX_CHARS[h3l & 0x0F];
    }
    if(bits >= 384) {
      hex += HEX_CHARS[(h4h >> 28) & 0x0F] + HEX_CHARS[(h4h >> 24) & 0x0F] +
             HEX_CHARS[(h4h >> 20) & 0x0F] + HEX_CHARS[(h4h >> 16) & 0x0F] +
             HEX_CHARS[(h4h >> 12) & 0x0F] + HEX_CHARS[(h4h >> 8) & 0x0F] +
             HEX_CHARS[(h4h >> 4) & 0x0F] + HEX_CHARS[h4h & 0x0F] +
             HEX_CHARS[(h4l >> 28) & 0x0F] + HEX_CHARS[(h4l >> 24) & 0x0F] +
             HEX_CHARS[(h4l >> 20) & 0x0F] + HEX_CHARS[(h4l >> 16) & 0x0F] +
             HEX_CHARS[(h4l >> 12) & 0x0F] + HEX_CHARS[(h4l >> 8) & 0x0F] +
             HEX_CHARS[(h4l >> 4) & 0x0F] + HEX_CHARS[h4l & 0x0F] +
             HEX_CHARS[(h5h >> 28) & 0x0F] + HEX_CHARS[(h5h >> 24) & 0x0F] +
             HEX_CHARS[(h5h >> 20) & 0x0F] + HEX_CHARS[(h5h >> 16) & 0x0F] +
             HEX_CHARS[(h5h >> 12) & 0x0F] + HEX_CHARS[(h5h >> 8) & 0x0F] +
             HEX_CHARS[(h5h >> 4) & 0x0F] + HEX_CHARS[h5h & 0x0F] +
             HEX_CHARS[(h5l >> 28) & 0x0F] + HEX_CHARS[(h5l >> 24) & 0x0F] +
             HEX_CHARS[(h5l >> 20) & 0x0F] + HEX_CHARS[(h5l >> 16) & 0x0F] +
             HEX_CHARS[(h5l >> 12) & 0x0F] + HEX_CHARS[(h5l >> 8) & 0x0F] +
             HEX_CHARS[(h5l >> 4) & 0x0F] + HEX_CHARS[h5l & 0x0F];
    }
    if(bits == 512) {
      hex += HEX_CHARS[(h6h >> 28) & 0x0F] + HEX_CHARS[(h6h >> 24) & 0x0F] +
             HEX_CHARS[(h6h >> 20) & 0x0F] + HEX_CHARS[(h6h >> 16) & 0x0F] +
             HEX_CHARS[(h6h >> 12) & 0x0F] + HEX_CHARS[(h6h >> 8) & 0x0F] +
             HEX_CHARS[(h6h >> 4) & 0x0F] + HEX_CHARS[h6h & 0x0F] +
             HEX_CHARS[(h6l >> 28) & 0x0F] + HEX_CHARS[(h6l >> 24) & 0x0F] +
             HEX_CHARS[(h6l >> 20) & 0x0F] + HEX_CHARS[(h6l >> 16) & 0x0F] +
             HEX_CHARS[(h6l >> 12) & 0x0F] + HEX_CHARS[(h6l >> 8) & 0x0F] +
             HEX_CHARS[(h6l >> 4) & 0x0F] + HEX_CHARS[h6l & 0x0F] +
             HEX_CHARS[(h7h >> 28) & 0x0F] + HEX_CHARS[(h7h >> 24) & 0x0F] +
             HEX_CHARS[(h7h >> 20) & 0x0F] + HEX_CHARS[(h7h >> 16) & 0x0F] +
             HEX_CHARS[(h7h >> 12) & 0x0F] + HEX_CHARS[(h7h >> 8) & 0x0F] +
             HEX_CHARS[(h7h >> 4) & 0x0F] + HEX_CHARS[h7h & 0x0F] +
             HEX_CHARS[(h7l >> 28) & 0x0F] + HEX_CHARS[(h7l >> 24) & 0x0F] +
             HEX_CHARS[(h7l >> 20) & 0x0F] + HEX_CHARS[(h7l >> 16) & 0x0F] +
             HEX_CHARS[(h7l >> 12) & 0x0F] + HEX_CHARS[(h7l >> 8) & 0x0F] +
             HEX_CHARS[(h7l >> 4) & 0x0F] + HEX_CHARS[h7l & 0x0F];
    }
    return hex;
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
