"use strict";
exports.id = 5977;
exports.ids = [5977,2379];
exports.modules = {

/***/ 2379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AutoContentProvider */
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1253);
/**
 *  File    : automation/AutoContentProvider.js
 *  Created : 13/04/2015
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
 * This abstract class is the base for classes that create on-time automatic content for JClic
 * activities, usually using random parameters to assure different content in each session.
 *
 * Activities with `AutoContentProvider` objects rely on them to build new content on every start.
 */
class AutoContentProvider {
  /**
   * AutoContentProvider constructor
   */
  constructor() {
  }

  /**
   * Dynamic constructor that returns a specific type of AutoContentProvider based on the `class`
   * attribute declared on an $xml element.
   * It should be called only from {@link module:Activity.Activity#setProperties Activity.setProperties}
   * @param {external.jQuery} $xml - The XML element to parse
   * @returns {module:automation/AutoContentProvider.AutoContentProvider}
   */
  static getProvider($xml) {
    let automation = null;
    if ($xml) {
      const
        className = ($xml.attr('class') || '').replace(/^edu\.xtec\.jclic\.automation\./, '@'),
        cl = AutoContentProvider.CLASSES[className];
      if (cl) {
        automation = new cl();
        automation.setProperties($xml);
      } else
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('error', `Unknown AutoContentProvider class: ${className}`);
    }
    return automation;
  }

  /**
   * Loads the object settings from a specific jQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    this.className = ($xml.attr('class') || '').replace(/^edu\.xtec\.jclic\.automation\./, '@');
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    // To be overrided!
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getAttr */ .iu)(this, ['className']);
  }

  /**
   * Builds a new AutoContentProvider, based on the properties specified in a data object
   * @param {object} data - The data object to be parsed
   * @param {object[]} params - Optional parameters to be passed to `setAttributes`
   * @returns {module:shapers/Shaper.Shaper}
   */
  static factory(data, params = []) {
    const cl = AutoContentProvider.CLASSES[data.className];
    return (new cl()).setAttributes(data, ...params);
  }

  /**
   * Initializes the content provider
   */
  init() {
    // To be implemented in real content providers
  }

  /**
   * Builds an {@link module:automation/AutoContentProvider/ActiveBagContentKit ActiveBagContentKit} and generates the automatized content.
   * @param {number} nRows - Number of rows to be processed
   * @param {number} nCols - Number of columns to be processed
   * @param {module:boxes/ActiveBagContent.ActiveBagContent[]} content - Array with one or more containers of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent}
   * objects to be filled with new content.
   * @param {boolean} useIds - When `true`, the `id` field of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects is significant
   * @returns {boolean} - `true` if the process was OK. `false` otherwise.
   */
  generateContent(nRows, nCols, content, useIds) {
    return this.process(new AutoContentProvider.ActiveBagContentKit(nRows, nCols, content, useIds));
  }

  /**
   * Generates the automatized content
   * @param {module:automation/AutoContentProvider.ActiveBagContentKit} _kit - The objects to be filled with content
   * @returns {boolean} - `true` if the process was OK. `false` otherwise.
   */
  process(_kit) {
    // To be implemented in subclasses
    return false;
  }

  /**
   * Registers a new type of AutoContentProvider
   * @param {string} providerName - The name used to identify this AutoContentProvider
   * @param {function} providerClass - The activity class, usually extending AutoContentProvider
   * @returns {module:automation/AutoContentProvider.AutoContentProvider} - The provider class
   */
  static registerClass(providerName, providerClass) {
    AutoContentProvider.CLASSES[providerName] = providerClass;
    return providerClass;
  }
}

Object.assign(AutoContentProvider.prototype, {
  /**
   * This AutoContentProvider manages numeric expressions, so text literals should be
   * converted to numbers for comparisions, taking in account the
   * number format of the current locale (dot or comma as decimal separator)
   * @name module:automation/AutoContentProvider.AutoContentProvider#numericContent
   * @type {boolean} */
  numericContent: false,
});

/**
 * Utility class used to encapsulate multiple sets of box contents
 * @param {number} nRows - Number of rows to be processed
 * @param {number} nCols - Number of columns to be processed
 * @param {module:boxes/ActiveBagContent.ActiveBagContent[]} content - Array with one or more containers of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent}
 * objects to be filled with new content.
 * @param {boolean} useIds - `true` when the `id` field of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects is significant.
 */
AutoContentProvider.ActiveBagContentKit = class {
  constructor(nRows, nCols, content, useIds) {
    this.nRows = nRows;
    this.nCols = nCols;
    this.content = content;
    this.useIds = useIds;
  }
};

/**
 * Contains the current list of classes derived from AutoContentProvider.
 * This object should be updated by real automation classes at declaration time.
 * Currently, only two types of "AutoContentProvider" are defined: {@link module:automation/arith/Arith.Arith Arith} and TagReplace.
 * @type {object} */
AutoContentProvider.CLASSES = {
  // TODO: Implement TagReplace
  '@tagreplace.TagReplace': AutoContentProvider
};

// TODO: Implement TagReplace
AutoContentProvider.registerClass('@tagreplace.TagReplace', AutoContentProvider);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AutoContentProvider);


/***/ }),

/***/ 5977:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Arith */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AutoContentProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2379);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1253);
/**
 *  File    : automation/arith/Arith.js
 *  Created : 28/05/2015
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

/* global Intl */





//
// Miscellaneous constants used by Arith:
const
  NMAXLOOPS = 60,
  OPSTR = ['+', '-', String.fromCharCode(215), ':'],
  RES = -12345,
  // Use comma as a decimal separator, based on current locale settings
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
  DOTASCOMMA = Intl && Intl.NumberFormat().format(1.1).indexOf(',') > 0;

/**
 * Arith provides randomly generated mental arithmetics operations, ready to be used in JClic activities.
 *
 * The operations can be additions, subtractions, multiplications or divides. The unknown of these
 * operations can be the result of the operation (`A op B = ?`), any of the two operators
 * (`A op ? = C` or `? op B = C`) or also the operator itself (`A ? B = C`).
 * @extends module:automation/AutoContentProvider.AutoContentProvider
 */
class Arith extends _AutoContentProvider_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Arith constructor
   */
  constructor() {
    super();
    this.className = '@arith.Arith';
    this.numericContent = true;
    this.opA = new Arith.Operator();
    this.opB = new Arith.Operator();
  }

  /**
   * Formats the number with a fixed number of decimals, optionally filling the result with leading
   * zeroes to have a fixed number of digits.
   * @param {number} val - The value to format
   * @param {number} dec - Number of decimals
   * @param {number} pre - Minimal number of digits before dot.
   * @returns {string}
   */
  static DecFormat(val, dec, pre) {
    let result = val.toFixed(dec);
    if (pre) {
      let n = result.indexOf('.');
      if (n < 0)
        n = result.length;
      for (; n < pre; n++)
        result = `0${result}`;
    }
    return result;
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @override
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    $xml.children().each((_n, child) => {
      const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
      let xNum = '';
      switch (child.nodeName) {
        case 'operand':
          switch ($node.attr('id')) {
            case 'A':
              this.opA.setProperties($node);
              break;
            case 'B':
              this.opB.setProperties($node);
              break;
          }
          break;
        case 'operations':
          this.use_add = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('plus'));
          this.use_subst = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('minus'));
          this.use_mult = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('multiply'));
          this.use_div = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('divide'));
          break;
        case 'unknown':
          this.exp_abx = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('result'));
          this.exp_xbc = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('first'));
          this.exp_axc = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('last'));
          this.exp_axbc = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('operand'));
          this.exp_caxb = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('inverse'));
          break;
        case 'result':
          xNum = $node.attr('from');
          this.resultLimInf = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getNumber */ .WZ)(xNum === 'x' ? 0 : xNum, this.resultLimInf);
          xNum = $node.attr('to');
          this.resultLimSup = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getNumber */ .WZ)(xNum === 'x' ? 0 : xNum, this.resultLimSup);
          this.resultCarry = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('notCarry'), this.resultCarry);
          this.resultNoDup = !(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('duplicates'), !this.resultNoDup);
          let s = $node.attr('order');
          this.resultOrder = s === 'ascending' ? 'SORTASC' : s === 'descending' ? 'SORTDESC' : 'NOSORT';
          s = $node.attr('condition');
          this.opCond = s === 'firstBig' ? 'AGB' : s === 'lastBig' ? 'BGA' : 'INDIF';
          break;
      }
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getAttr */ .iu)(this, [
      'className',
      'opA', 'opB', // Operator
      'use_add', 'use_subst', 'use_mult', 'use_div',
      'exp_abx|true', 'exp_axc|false', 'exp_xbc|false', 'exp_axbc|false', 'exp_caxb|false',
      'resultLimInf|0', 'resultLimSup|9999', 'resultCarry|false', 'resultNoDup|false', 'resultOrder|NOSORT',
      'opCond|INDIF'
    ]);
  }

  /**
   * Reads the properties of this Arith object from a dataset
   * @param {object} data - The data object to be parsed
   * @returns {object}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .setAttr */ .ob)(this, data, [
      'className',
      { key: 'opA', fn: Arith.Operator },
      { key: 'opB', fn: Arith.Operator },
      'use_add', 'use_subst', 'use_mult', 'use_div',
      'exp_abx', 'exp_axc', 'exp_xbc', 'exp_axbc', 'exp_caxb',
      'resultLimInf', 'resultLimSup', 'resultCarry', 'resultNoDup', 'resultOrder',
      'opCond',
    ]);
  }

  /**
   * Fills the `n` parameter (an {@link module:automation/arith/Arith.Num Num}) with a value in accordance with the
   * specifications of `op` (an {@link module:automation/arith/Arith.Operator Operator}), between two limits.
   * @param {module:automation/arith/Arith.Num} n - The number
   * @param {module:automation/arith/Arith.Operator} op - The operator
   * @param {number} limInf2 - Lower limit
   * @param {number} limSup2 - Upper limit
   * @returns {boolean} - `true` if all was OK
   */
  genNum(n, op, limInf2, limSup2) {
    let solved = false;
    n.c = op.numDec;
    const exp = n.c === 0 ? 1 : n.c === 1 ? 10 : 100;

    let ls = op.limSup;
    if (limSup2 !== RES && limSup2 < ls)
      ls = limSup2;
    let li = op.limInf;
    if (limInf2 !== RES && limInf2 > li)
      li = limInf2;

    if (op.fromList > 0) {
      n.vf = op.lst[Math.floor(Math.random() * op.fromList)];
      solved = true;
    }
    if (!solved) {
      const r = Math.floor(Math.random() * 100);
      if (op.wZero && r <= 10) {
        n.vf = 0;
        solved = true;
      } else if (op.wOne && r > 10 && r <= 20) {
        n.vf = 1;
        solved = true;
      } else if (op.wMinusOne && r > 20 && r <= 30) {
        n.vf = -1;
        solved = true;
      }
    }
    if (!solved) {
      if (li > ls) {
        const k = li;
        li = ls;
        ls = k;
      }
      let rang = Math.floor(ls - li + 1);
      if (rang < 0)
        rang = 1;
      let v = (Math.floor(Math.random() * rang) + li) * exp;
      if (exp > 1)
        v += Math.floor(Math.random() * exp);
      n.vf = v / exp;
    }
    return true;
  }

  /**
   * Fills the provided {@link module:automation/arith/Arith.Operator Operator} with real values
   * @param {module:automation/arith/Arith.Operator} o - The operator to use to generate the operation
   * @returns {boolean} - `true` if all was OK
   */
  genOp(o) {
    let i, ri2, rs2, q, va, vb, bufa, bufb;
    const
      ops = [],
      rlinf = this.resultLimInf,
      rlsup = this.resultLimSup;

    let nops = 0;
    if (this.use_add)
      ops[nops++] = 'SUM';
    if (this.use_subst)
      ops[nops++] = 'REST';
    if (this.use_mult)
      ops[nops++] = 'MULT';
    if (this.use_div)
      ops[nops++] = 'DIV';

    const op = ops[Math.floor(Math.random() * nops)];
    switch (op) {
      case 'SUM':
        for (i = 0; i < NMAXLOOPS; i++) {
          this.genNum(o.numA, this.opA, this.RES, rlsup);
          ri2 = o.numA.vf < rlinf ? rlinf - Math.floor(o.numA.vf) : this.RES;
          rs2 = rlsup - Math.floor(o.numA.vf);
          switch (this.opCond) {
            case 'AGB':
              if (rs2 === this.RES || rs2 > o.numA.vf)
                rs2 = Math.floor(o.numA.vf);
              break;
            case 'BGA':
              if (ri2 === this.RES || ri2 < o.numA.vf)
                ri2 = Math.floor(o.numA.vf);
              break;
          }
          this.genNum(o.numB, this.opB, ri2, rs2);
          o.numR.vf = o.numA.vf + o.numB.vf;
          if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
            break;
        }
        o.numR.c = o.numA.c > o.numB.c ? o.numA.c : o.numB.c;
        o.op = 0;
        if (this.resultCarry && o.numA.vf > 0 && o.numB.vf > 0) {
          q = o.numR.c === 2 ? 100 : o.numR.c === 1 ? 10 : 1;

          bufa = Arith.DecFormat(Math.floor(o.numA.vf * q + 0.5), 0, 10).split('');
          bufb = Arith.DecFormat(Math.floor(o.numB.vf * q + 0.5), 0, 10).split('');
          for (i = 0; i < 10; i++)
            if (bufa[i] !== '0' || bufb[i] !== '0')
              break;
          for (; i < 10; i++) {
            va = parseInt(bufa[i]);
            vb = parseInt(bufb[i]);
            if (va + vb < 10)
              continue;
            while (va + vb > 9) {
              if (va > vb)
                va = va > 0 ? Math.floor(Math.random() * va) : 0;
              else
                vb = vb > 0 ? Math.floor(Math.random() * vb) : 0;
            }
            bufa[i] = va.toFixed(0);
            bufb[i] = vb.toFixed(0);
          }

          o.numA.vf = parseInt(bufa.join('')) / q;
          o.numB.vf = parseInt(bufb.join('')) / q;
          // Corrected 2019/02/11: Factors should be multiplied by 'q'!
          // INCORRECT: o.numR.vf = Math.floor(o.numA.vf + o.numB.vf + 0.5) / q
          o.numR.vf = Math.floor(o.numA.vf * q + o.numB.vf * q + 0.5) / q;
        }
        break;

      case 'REST':
        for (i = 0; i < NMAXLOOPS; i++) {
          this.genNum(o.numA, this.opA, rlinf, this.RES);
          ri2 = o.numA.vf > rlsup ? Math.floor(o.numA.vf - rlsup) : this.RES;
          rs2 = Math.floor(o.numA.vf - rlinf);
          switch (this.opCond) {
            case 'AGB':
              if (rs2 === this.RES || rs2 > o.numA.vf)
                rs2 = Math.floor(o.numA.vf);
              break;
            case 'BGA':
              if (ri2 === this.RES || ri2 < o.numA.vf)
                ri2 = Math.floor(o.numA.vf);
              break;
          }
          this.genNum(o.numB, this.opB, ri2, rs2);
          o.numR.vf = o.numA.vf - o.numB.vf;
          if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
            break;
        }
        o.numR.c = o.numA.c > o.numB.c ? o.numA.c : o.numB.c;
        o.op = 1;
        if (this.resultCarry && o.numA.vf > 0 && o.numB.vf > 0 && o.numA.vf >= o.numB.vf) {
          q = o.numR.c === 2 ? 100 : o.numR.c === 1 ? 10 : 1;
          bufa = Arith.DecFormat(Math.floor(o.numA.vf * q + 0.5), 0, 10).split('');
          bufb = Arith.DecFormat(Math.floor(o.numB.vf * q + 0.5), 0, 10).split('');
          for (i = 0; i < 10; i++)
            if (bufb[i] !== '0')
              break;
          for (; i < 10; i++) {
            va = parseInt(bufa[i]);
            vb = parseInt(bufb[i]);
            if (va >= vb)
              continue;
            vb = va > 0 ? Math.floor(Math.random() * va) : 0;
            bufb[i] = vb.toFixed(0);
          }

          o.numA.vf = parseInt(bufa.join('')) / q;
          o.numB.vf = parseInt(bufb.join('')) / q;
          // Corrected 2019/02/11: Factors should be multiplied by 'q'!
          // o.numR.vf = Math.floor(o.numA.vf - o.numB.vf + 0.5) / q
          o.numR.vf = Math.floor(o.numA.vf * q - o.numB.vf * q + 0.5) / q;
        }
        break;

      case 'MULT':
        for (i = 0; i < NMAXLOOPS; i++) {
          this.genNum(o.numA, this.opA, this.RES, this.RES);
          ri2 = this.opB.limInf;
          rs2 = this.opB.limSup;
          switch (this.opCond) {
            case 'AGB':
              if (rs2 > o.numA.vf)
                rs2 = Math.floor(o.numA.vf);
              break;
            case 'BGA':
              if (ri2 < o.numA.vf)
                ri2 = Math.floor(o.numA.vf);
              break;
          }
          this.genNum(o.numB, this.opB, ri2, rs2);
          o.numR.vf = o.numA.vf * o.numB.vf;
          if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
            break;
        }
        o.numR.c = o.numA.c + o.numB.c;
        o.op = 2;
        break;

      case 'DIV':
        for (i = 0; i < NMAXLOOPS; i++) {
          this.genNum(o.numA, this.opA, this.RES, this.RES);
          ri2 = this.opB.limInf;
          rs2 = this.opB.limSup;
          switch (this.opCond) {
            case 'AGB':
              if (rs2 > o.numA.vf)
                rs2 = Math.floor(o.numA.vf);
              break;
            case 'BGA':
              if (ri2 < o.numA.vf)
                ri2 = Math.floor(o.numA.vf);
              break;
          }
          this.genNum(o.numB, this.opB, ri2, rs2);
          if (o.numB.vf !== 0 &&
            Math.abs(o.numA.vf) >= Math.abs(o.numB.vf) &&
            (o.numR.vf = o.numA.vf / o.numB.vf) >= rlinf &&
            o.numR.vf <= rlsup)
            break;
        }
        if (o.numB.vf === 0)
          o.numB.vf = 1;
        o.numR.vf = o.numA.vf / o.numB.vf;
        i = o.numA.c - o.numB.c;
        q = Math.pow(10, i);
        o.numA.vf *= q;
        o.numR.vf *= q;
        o.numR.vf = Math.floor(o.numR.vf);
        o.numA.vf = o.numR.vf * o.numB.vf;
        o.numA.vf /= q;
        o.numR.vf /= q;
        o.numR.c = i > 0 ? i : 0;
        o.op = 3;
        break;

      default:
        return false;
    }
    return true;
  }

  /**
   * Fills the provided ActiveBagContentKit with randomly generated operations
   * @override
   * @param {module:automation/AutoContentProvider.ActiveBagContentKit} kit - The composite object to be filled with data.
   * @returns {boolean} - `true` if all was OK
   */
  process(kit) {
    let nRows = kit.nRows,
      nCols = kit.nCols,
      content = kit.content, //Array of ActiveBagContent
      useIds = kit.useIds,
      i, j, k,
      o, op = [], // Array of Arith.Operation
      tipus = [],
      numTipus, tipX,
      tipInv = this.exp_caxb,
      va = '', vb = '', vc = '', operator = '',
      stra = [], strb = [], strc = [],
      nColsB = nCols, nRowsB = nRows,
      nCells = nRows * nCols,
      ass = null;

    if (nRows <= 0 || nCols <= 0 ||
      content === null || content.length < 1 || content[0] === null)
      return false;

    if (nCells < 2)
      return false;

    numTipus = 0;
    if (this.exp_abx)
      tipus[numTipus++] = 'ABX';
    if (this.exp_axc)
      tipus[numTipus++] = 'AXC';
    if (this.exp_xbc)
      tipus[numTipus++] = 'XBC';
    if (this.exp_axbc)
      tipus[numTipus++] = 'AXBC';
    if (numTipus === 0)
      return false;

    for (i = 0; i < nCells; i++) {
      o = new Arith.Operation();
      for (j = 0; j < NMAXLOOPS; j++) {
        this.genOp(o);
        if (this.resultNoDup) {
          for (k = 0; k < i; k++) {
            if (o.numR.vf === op[k].numR.vf)
              break;
          }
          if (k === i)
            break;
        } else
          break;
      }
      op[i] = o;
    }

    if (this.resultOrder !== 0) {
      for (i = nCells - 1; i > 0; i--) {
        for (j = 0; j < i; j++) {
          if (this.resultOrder === 'SORTASC' && op[j].numR.vf > op[j + 1].numR.vf ||
            this.resultOrder === 'SORTDESC' && op[j].numR.vf < op[j + 1].numR.vf) {
            // Switch values
            o = op[j];
            op[j] = op[j + 1];
            op[j + 1] = o;
          }
        }
      }
    }

    for (i = 0; i < nCells; i++) {
      tipX = tipus[Math.floor(Math.random() * numTipus)];
      va = Arith.DecFormat(op[i].numA.vf, op[0].numA.c);
      vb = Arith.DecFormat(op[i].numB.vf, op[0].numB.c);
      vc = Arith.DecFormat(op[i].numR.vf, op[0].numR.c);
      operator = OPSTR[op[i].op];

      // Use the special blank space ASCII 160 (\xA0) instead of regular blank spaces

      if (tipInv)
        strc[i] = `${vc}\xA0=\xA0${va}\xA0${operator}\xA0${vb}`;
      else
        strc[i] = `${va}\xA0${operator}\xA0${vb}\xA0=\xA0${vc}`;

      switch (tipX) {
        case 'AXC':
          strb[i] = vb;
          stra[i] = tipInv ? `${vc}\xA0=\xA0${va}\xA0${operator}\xA0?` : `${va}\xA0${operator}\xA0?\xA0=\xA0${vc}`;
          break;

        case 'XBC':
          strb[i] = va;
          stra[i] = tipInv ? `${vc}\xA0=\xA0?\xA0${operator}\xA0${vb}` : `?\xA0${operator}\xA0${vb}\xA0=\xA0${vc}`;
          break;

        case 'AXBC':
          strb[i] = operator;
          stra[i] = tipInv ? `${vc}\xA0=\xA0${va}\xA0?\xA0${vb}` : `${va}\xA0?\xA0${vb}\xA0=\xA0${vc}`;
          break;

        default:
          strb[i] = vc;
          stra[i] = tipInv ? `?\xA0=\xA0${va}\xA0${operator}\xA0${vb}` : `${va}\xA0${operator}\xA0${vb}\xA0=`;
          break;
      }
    }

    if (useIds) {
      ass = [];
      let strbx = [];
      k = 0;
      for (i = 0; i < nCells; i++) {
        for (j = 0; j < k; j++)
          if (strb[i] === strbx[j])
            break;
        if (j === k) {
          strbx[k] = strb[i];
          ass[i] = k;
          k++;
        } else
          ass[i] = j;
      }

      strb = [];
      for (i = 0; i < k; i++)
        strb[i] = strbx[i];

      if (nRowsB * nColsB !== k) {
        let distH = false;
        switch (k) {
          case 6:
            nRowsB = distH ? 2 : 3;
            nColsB = distH ? 3 : 2;
            break;

          case 8:
            nRowsB = distH ? 2 : 4;
            nColsB = distH ? 4 : 2;
            break;

          case 9:
            nRowsB = 3;
            nColsB = 3;
            break;

          case 10:
            nRowsB = distH ? 2 : 5;
            nColsB = distH ? 5 : 2;
            break;

          case 12:
            nRowsB = distH ? 3 : 4;
            nColsB = distH ? 4 : 3;
            break;

          case 14:
            nRowsB = distH ? 2 : 7;
            nColsB = distH ? 7 : 2;
            break;

          case 15:
            nRowsB = distH ? 3 : 5;
            nColsB = distH ? 3 : 5;
            break;

          case 16:
            nRowsB = 4;
            nColsB = 4;
            break;

          case 18:
            nRowsB = distH ? 6 : 3;
            nColsB = distH ? 3 : 6;
            break;

          case 20:
            nRowsB = distH ? 4 : 5;
            nColsB = distH ? 5 : 4;
            break;

          default:
            nRowsB = distH ? 1 : k;
            nColsB = distH ? k : 1;
            break;
        }
      }
    }

    // Added 2019/02/11
    // Use comma instead of dot for decimal separator, accordingly to current locale
    if (DOTASCOMMA) {
      function replaceDot(s) { return s.replace(/\./g, ','); }
      stra = stra.map(replaceDot);
      strb = strb.map(replaceDot);
      strc = strc.map(replaceDot);
    }

    content[0].setTextContent(stra, nCols, nRows);
    if (ass !== null)
      content[0].setIds(ass);
    if (content.length > 1 && content[1] !== null) {
      content[1].setTextContent(strb, nColsB, nRowsB);
      content[1].getShaper().reset(nColsB, nRowsB);
    }
    if (content.length > 2 && content[2] !== null)
      content[2].setTextContent(strc, nCols, nRows);

    return true;
  }
}

Object.assign(Arith.prototype, {
  //
  // Operations use two operators:
  /**
   * First operator
   * @name module:automation/arith/Arith.Arith#opA
   * @type {module:automation/arith/Arith.Operator} */
  opA: null,
  /**
   * Second operator
   * @name module:automation/arith/Arith.Arith#opB
   * @type {module:automation/arith/Arith.Operator} */
  opB: null,
  /**
   * Allow additions
   * @name module:automation/arith/Arith.Arith#use_add
   * @type {boolean} */
  use_add: true,
  /**
   * Allow subtractions
   * @name module:automation/arith/Arith.Arith#use_subst
   * @type {boolean} */
  use_subst: false,
  /**
   * Allow multiplications
   * @name module:automation/arith/Arith.Arith#use_mult
   * @type {boolean} */
  use_mult: false,
  /**
   * Allow divides
   * @name module:automation/arith/Arith.Arith#use_div
   * @type {boolean} */
  use_div: false,
  /**
   * Allow expressions of type `A op B = X`
   * @name module:automation/arith/Arith.Arith#exp_abx
   * @type {boolean} */
  exp_abx: true,
  /**
   * Allow expressions of type `A op X = C`
   * @name module:automation/arith/Arith.Arith#exp_axc
   * @type {boolean} */
  exp_axc: false,
  /**
   * Allow expressions of type `X op B = C`
   * @name module:automation/arith/Arith.Arith#exp_xbc
   * @type {boolean} */
  exp_xbc: false,
  /**
   * Allow expressions of type `A x B = C`
   * @name module:automation/arith/Arith.Arith#exp_axbc
   * @type {boolean} */
  exp_axbc: false,
  /**
   * Allow inverse expressions, like `C = A op B`
   * @name module:automation/arith/Arith.Arith#exp_caxb
   * @type {boolean} */
  exp_caxb: false,
  /**
   * Lower limit of the result
   * @name module:automation/arith/Arith.Arith#resultLimInf
   * @type {number} */
  resultLimInf: 0,
  /**
   * Upper limit of the result
   * @name module:automation/arith/Arith.Arith#resultLimSup
   * @type {number} */
  resultLimSup: 9999,
  /**
   * Allow carry operations
   * @see {@link https://en.wikipedia.org/wiki/Carry_(arithmetic)}
   * @name module:automation/arith/Arith.Arith#resultCarry
   * @type {boolean} */
  resultCarry: false,
  /**
   * Avoid operations with the same result
   * @name module:automation/arith/Arith.Arith#resultNoDup
   * @type {boolean} */
  resultNoDup: false,
  /**
   * Type of sorting of results. Possible values are: 'NOSORT', 'SORTASC' and 'SORTDESC'
   * @name module:automation/arith/Arith.Arith#resultOrder
   * @type {string} */
  resultOrder: 'NOSORT',
  /**
   * Sorting of the operands in commutative operations. Possible values are: 'AGB' (_A greater than B_),
   * 'BGA' (_B greater tan A_) and 'INDIF' (default)
   * @name module:automation/arith/Arith.Arith#opCond
   * @type {string} */
  opCond: 'INDIF',
});

/**
 * Operator is an Utility class used by Arith to encapsulate the properties and methods related
 * to the members of the operations.
 */
Arith.Operator = class {
  constructor() {
  }

  /**
   * Loads Operator settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    // Read attributes
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'decimals':
          this.numDec = Number(val);
          break;

        case 'values':
          this.lst = val.split(' ').map(v => Number(v));
          this.fromList = this.lst.length;
          break;

        case 'from':
          this.limInf = Number(val === 'x' ? 0 : val);
          break;

        case 'to':
          this.limSup = Number(val === 'x' ? 0 : val);
          break;
      }

      $xml.children().each((_n, child) => {
        const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
        switch (child.nodeName) {
          case 'include':
            this.wZero = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('zero'));
            this.wOne = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('one'));
            this.wMinusOne = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)($node.attr('minusOne'));
            break;
        }
      });
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getAttr */ .iu)(this, [
      'limInf', 'limSup',
      'numDec|0',
      'wZero|false', 'wOne|false', 'wMinusOne|false',
      'fromList|0', 'lst',
    ]);
  }

  /**
   * Reads the properties of this operator from a dataset
   * @param {object} data - The data object to be parsed
   * @returns {module:automation/arith/Arith.Arith}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .setAttr */ .ob)(this, data, [
      'limInf', 'limSup',
      'numDec',
      'wZero', 'wOne', 'wMinusOne',
      'fromList', 'lst',
    ]);
  }
};

Object.assign(Arith.Operator.prototype, {
  /**
   * Lower limit
   * @name module:automation/arith/Arith.Arith.Operator#limInf
   * @type {number} */
  limInf: 0,
  /**
   * Upper limit
   * @name module:automation/arith/Arith.Arith.Operator#limSup
   * @type {number} */
  limSup: 10,
  /**
   * Number of decimal places
   * @name module:automation/arith/Arith.Arith.Operator#numDec
   * @type {number} */
  numDec: 0,
  /**
   * Including 0
   * @name module:automation/arith/Arith.Arith.Operator#wZero
   * @type {boolean} */
  wZero: false,
  /**
   * Including 1
   * @name module:automation/arith/Arith.Arith.Operator#wOne
   * @type {boolean} */
  wOne: false,
  /**
   * Including -1
   * @name module:automation/arith/Arith.Arith.Operator#wMinusOne
   * @type {boolean} */
  wMinusOne: false,
  /**
   * Take values from list. This member stores the list length.
   * @name module:automation/arith/Arith.Arith.Operator#fromList
   * @type {number} */
  fromList: 0,
  /**
   * The list of possible values
   * @name module:automation/arith/Arith.Arith.Operator#lst
   * @type {number[]} */
  lst: [],
});

Arith.Num = class {
  constructor() {
    this.vf = 0.0; // The number value
    this.c = 0; // Number of decimals to be used when representing the number
  }

  format() {
    return Arith.DecFormat(this.vf, this.c);
  }
};

Arith.Operation = class {
  constructor() {
    this.numA = new Arith.Num();
    this.numB = new Arith.Num();
    this.numR = new Arith.Num();
    this.op = 0;
  }
};

// Register class in AutoContentProvider.CLASSES
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_AutoContentProvider_js__WEBPACK_IMPORTED_MODULE_1__["default"].registerClass('@arith.Arith', Arith));


/***/ })

};
;
//# sourceMappingURL=5977.jclic-node.js.map