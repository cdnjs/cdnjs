"use strict";
exports.id = 5344;
exports.ids = [5344];
exports.modules = {

/***/ 5344:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Encryption */
/**
 *  File    : report/Encryption.js
 *  Created : 18/06/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

/**
 *
 * Utilities to encrypt and decrypt strings using simple methods, just to avoid write
 * passwords in plain text in data and configuration files. Do not use it as a
 * secure cryptographic system!
 *
 * Based on {@link https://github.com/projectestac/jclic/blob/master/src/utilities/edu/xtec/util/Encryption.java Encryption}
 * utilities, created by Albert Llastarri for {@link https://github.com/projectestac/jclic JClic}.
 *
 * IMPORTANT: This is a shortened version of Encryption with only the methods needed to decrypt
 * stored passwords. Full version is on file `src/misc/encryption/Encryption.js`
 *
 * @abstract
 */
class Encryption {
  /**
   * Decrypts the given code
   * @param {string} txt - Code to be decrypted
   * @returns {string}
   */
  static Decrypt(txt) {
    if (txt === null || txt.length === 0)
      return null;
    const s = Encryption.decodify(txt);
    return s === Encryption.BLANK ? '' : s;
  }

  /**
   * @param {string} cA (was char[])
   * @param {number} fromIndex
   * @returns {string} (was char)
   */
  static hexCharArrayToChar(cA, fromIndex) {
    let n = 0;
    for (let i = 0; i <= 3; i++) {
      const j = Number.parseInt(cA[fromIndex + i], 16);
      if (isNaN(j))
        throw 'Invalid expression!';
      else
        n = n * 16 + j;
    }
    return String.fromCharCode(n);
  }

  /**
   * @param {string} cA - (was char[])
   * @param {number} fromIndex
   * @returns {number}
   */
  static hexCharArrayToInt(cA, fromIndex) {
    let n = 0;
    for (let i = 0; i <= 1; i++) {
      const j = Number.parseInt(cA[fromIndex + i], 16);
      if (isNaN(j))
        throw 'Invalid expression!';
      else
        n = n * 16 + j;
    }
    return n;
  }

  /**
   * @param {string} cA - (was char[])
   * @returns {string}
   */
  static decodifyZerosField(cA) {
    let
      sb = '',
      num = Number.parseInt(cA[0], 32),
      k = 0,
      i = 0;

    for (i = 0; num !== 0; i++) {
      while (num > 0) {
        sb = sb + cA[i * 3 + 1] + cA[i * 3 + 2];
        num--;
        k++;
      }
      if (cA.length > i * 3 + 3)
        num = Number.parseInt(cA[i * 3 + 3], 32);
      else
        num = 0;
    }
    for (let j = i * 3 + 1; j < cA.length; j++)
      sb = sb + cA[j];

    return Number.parseInt(k, 32) + sb;
  }

  /**
   * @param {string} cA - (was char[])
   * @returns {string} (was StringBuilder)
   */
  static decompressZeros(cA) {
    cA = Encryption.decodifyZerosField(cA);
    let
      numBytesZeros = Number.parseInt(cA[0], 32),
      iniNoZeros = numBytesZeros * 2 + 1,
      bFi = false,
      sb = '';

    for (let i = 0; i < numBytesZeros && !bFi; i++) {
      const zeros = Encryption.hexCharArrayToInt(cA, 1 + i * 2);
      let s = zeros.toString(2);
      while (s.length < 8)
        s = '0' + s;
      for (let j = 0; j <= 7 && !bFi; j++) {
        if (s[j] === '1')
          sb = sb + '0';
        else if (iniNoZeros < cA.length)
          sb = sb + cA[iniNoZeros++];
        else
          bFi = true;
      }
    }
    return sb;
  }

  /**
   * @param {string} sb1 - (was StringBuilder)
   * @returns {string}
   */
  static decodifyFromHex(sb1) {
    let sb = '', j = 0;
    for (let i = 0; j < sb1.length; i++) {
      const c = Encryption.hexCharArrayToChar(sb1, j);
      sb = sb + c;
      j += 4;
    }
    return sb;
  }

  /**
   * @param {string} s
   * @returns {string} (was char[])
   */
  static unchangeOrder(s) {
    let m = 0, n = s.length - 1;
    const cA = [];
    for (let p = 0; p < s.length; p++)
      cA[p] = '';
    for (let i = 0; i < s.length; i++)
      if (i % 2 === 0)
        cA[i] = s[m++];
      else
        cA[i] = s[n--];
    return cA.join('');
  }

  /**
   * @param {string} word
   * @returns {string}
   */
  static codify(word) {
    if (word.length > 24)
      throw 'Password is too large!';
    return Encryption.changeOrder(Encryption.compressZeros(Encryption.codifyToHexWord(word)));
  }

  /**
   * @param {string} word
   * @returns {string}
   */
  static decodify(word) {
    try {
      return Encryption.decodifyFromHex(Encryption.decompressZeros(Encryption.unchangeOrder(word)));
    } catch (_ex) { //The supplied word was not codified using this system
      return '';
    }
  }
}

/**
* Default bank password
* @type {string}
*/
Encryption.BLANK = '___blank___##';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Encryption);


/***/ })

};
;
//# sourceMappingURL=5344.jclic-node.js.map