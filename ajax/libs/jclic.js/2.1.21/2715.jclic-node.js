"use strict";
exports.id = 2715;
exports.ids = [2715];
exports.modules = {

/***/ 2715:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports Evaluator, BasicEvaluator, ComplexEvaluator */
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1253);
/**
 *  File    : activities/text/Evaluator.js
 *  Created : 14/04/2015
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

/* global window */



/**
 * This class and its derivatives {@link module:activities/text/Evaluator.BasicEvaluator BasicEvaluator} and
 * {@link module:activities/text/Evaluator.ComplexEvaluator ComplexEvaluator} are used to evaluate the answers written by the final users
 * in text activities.
 */
class Evaluator {
  /**
   * Evaluator constructor
   * @param {string} className - The class name of this evaluator.
   */
  constructor(className) {
    this.className = className;
    this.collator = (window.Intl && window.Intl.Collator) ?
      new window.Intl.Collator() :
      { compare: (a, b) => this.checkCase ? a === b : a.toUpperCase() === b.toUpperCase() };
  }

  /**
   * Factory constructor that returns a specific type of {@link module:activities/text/Evaluator.Evaluator Evaluator} based on the `class`
   * attribute declared in the $xml element.
   * @param {external:jQuery} $xml - The XML element to be parsed.
   * @returns {module:activities/text/Evaluator.Evaluator}
   */
  static getEvaluator($xml) {
    let ev = null;
    if ($xml) {
      const className = $xml.attr('class');
      const cl = Evaluator.CLASSES[className];
      if (cl) {
        ev = new cl(className);
        ev.setProperties($xml);
      } else
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('error', `Unknown evaluator class: "${className}"`);
    }
    return ev;
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The jQuery XML element to parse
   */
  setProperties($xml) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, value) => {
      switch (name) {
        case 'class':
          this.className = value;
          break;
        case 'checkCase':
        case 'checkAccents':
        case 'checkPunctuation':
        case 'checkDoubleSpaces':
        case 'detail':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getBoolean */ .pW)(value);
          break;
        case 'checkSteps':
        case 'checkScope':
          this[name] = Number(value);
          break;
      }
    });
    return this;
  }

  /**
   * Builds a new Evaluator, based on the properties specified in a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:activities/text/Evaluator.Evaluator}
   */
  static factory(data) {
    const cl = Evaluator.CLASSES[data.className];
    if (cl) {
      const result = new cl(data.className);
      return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .setAttr */ .ob)(result, data, [
        'className',
        'checkCase', 'checkAccents', 'checkPunctuation', 'checkDoubleSpaces', 'detail',
        'checkSteps', 'checkScope',
      ]);
    }
    return null;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getAttr */ .iu)(this, [
      'className',
      'checkCase', 'checkAccents', 'checkPunctuation', 'checkDoubleSpaces', 'detail',
      'checkSteps', 'checkScope',
    ]);
  }

  /**
   * Initializes this evaluator
   * @param {string[]} _locales - An array of valid locales, to be used by Intl.Collator
   */
  init(_locales) {
    this.initiated = true;
  }

  /**
   * Checks the given text against a set of valid matches
   * @param {string} text - The text to be checked
   * @param {string|string[]} match - The valid expression or expressions with which to compare.
   * @returns {boolean} - `true` if the checked expression is valid, `false` otherwise.
   */
  checkText(text, match) {
    if (match instanceof Array)
      return match.some(m => this._checkText(text, m));
    else if (match)
      return this._checkText(text, match);
    else
      return false;
  }

  /**
   * Abstract method to be implemented in subclasses.
   * Performs the validation of a string against a single match.
   * @param {string} _text - The text to be checked
   * @param {string} _match - A valid expression with which to compare.
   * @returns {boolean} - `true` when the two expressions can be considered equivalent.
   */
  _checkText(_text, _match) {
    return false;
  }

  /**
   * Evaluates the given text against a set of valid matches, returning an array of flags useful
   * to indicate where the mistakes are located.
   * @param {string} text - The text to be checked
   * @param {string|string[]} match - The valid expression or expressions with which to compare.
   * @returns {number[]} - An array of flags (one number for character) indicating whether each
   * position is erroneous or ok.
   */
  evalText(text, match) {
    if (!(match instanceof Array))
      match = [match];
    return this._evalText(text, match);
  }

  /**
   * Abstract method to be implemented in subclasses.
   * Performs the evaluation of a string against an array of valid matches, returning an array of
   * flags useful to indicate where the mistakes are located.
   * @param {string} _text - The text to be checked
   * @param {string} _match - A valid expression with which to compare.
   * @returns {number[]} - An array of flags (one number for character) indicating whether each
   * position is erroneous or OK.
   */
  _evalText(_text, _match) {
    return [];
  }

  /**
   * Checks if the given array of flags (usually returned by `evalText`) can be considered as a
   * valid or erroneous answer.
   * @param {number[]} flags
   * @returns {boolean} - `true` when there is at least one flag and all flags are 0 (meaning no error).
   */
  isOk(flags) {
    return flags && flags.length > 0 && !flags.some(f => f !== 0);
  }
}

Object.assign(Evaluator.prototype, {
  /**
   * The type of evaluator.
   * @name module:activities/text/Evaluator.Evaluator#className
   * @type {string} */
  className: null,
  /**
   * Whether this evaluator has been initialized or not.
   * @name module:activities/text/Evaluator.Evaluator#initiated
   * @type {boolean} */
  initiated: false,
  /**
   * The Intl.Collator object used to compare strings, when available.
   * @name module:activities/text/Evaluator.Evaluator#collator
   * @type {external:Collator} */
  collator: null,
  /**
   * Whether uppercase and lowercase expressions must be considered equivalent or not.
   * @name module:activities/text/Evaluator.Evaluator#checkcase
   * @type {boolean} */
  checkCase: false,
});

/**
 * A basic evaluator that just compares texts, without looking for possible coincidences of text
 * fragments once erroneous characters removed.
 * @extends module:activities/text/Evaluator.Evaluator
 */
class BasicEvaluator extends Evaluator {
  /**
   * BasicEvaluator constructor
   * @param {string} className - The class name of this evaluator.
   */
  constructor(className) {
    super(className);
  }

  /**
   * Initializes the {@link module:activities/text/Evaluator.Evaluator#collator collator}.
   * @override
   * @param {string[]} locales - An array of valid locales to be used by the Inlt.Collator object
   */
  init(locales) {
    // Call `init` method on ancestor
    super.init([locales]);

    // Get canonical locales
    if (window.Intl && window.Intl.Collator) {
      this.collator = new window.Intl.Collator(locales, {
        sensitivity: this.checkAccents ? this.checkCase ? 'case' : 'accent' : 'base',
        ignorePunctuation: !this.checkPunctuation
      });
    }
  }

  /**
   * Performs the validation of a string against a single match.
   * @override
   * @param {string} text - The text to be checked
   * @param {string} match - A valid expression with which to compare.
   * @returns {boolean} - `true` when the two expressions can be considered equivalent.
   */
  _checkText(text, match) {
    return this.collator.compare(this.getClearedText(text), this.getClearedText(match)) === 0;
  }

  /**
   * Performs the evaluation of a string against an array of valid matches, returning an array of
   * flags useful to indicate where the mistakes are located.
   * In BasicEvaluator, all characters are just marked as 1 (error) or 0 (OK). See
   * {@link module:activities/text/Evaluator.ComplexEvaluator ComplexEvaluator} for more detailed analysis of answers.
   * @override
   * @param {string} text - The text to be checked
   * @param {string} match - A valid expression with which to compare.
   * @returns {number[]} - An array of flags (one number for character) indicating whether each
   * position is erroneous or OK.
   */
  _evalText(text, match) {
    return Array(text.length).fill(this._checkText(text, match[0]) ? 0 : 1);
  }

  /**
   * Removes double spaces and erroneous characters from a given text expression.
   * @param {string} src - The text to be processed.
   * @param {boolean[]} skipped - An array of boolean indicating which characters should be removed
   * from the string.
   * @returns {string}
   */
  getClearedText(src, skipped) {
    if (this.checkPunctuation && this.checkDoubleSpaces)
      return src;

    if (!skipped)
      skipped = Array(src.length).fill(false);

    let sb = '';
    for (let i = 0, wasSpace = false; i < src.length; i++) {
      const ch = src.charAt(i);
      if (this.PUNCTUATION.indexOf(ch) >= 0 && !this.checkPunctuation) {
        if (!wasSpace)
          sb += ' ';
        else
          skipped[i] = true;
        wasSpace = true;
      } else if (ch === ' ') {
        if (this.checkDoubleSpaces || !wasSpace)
          sb += ch;
        else
          skipped[i] = true;
        wasSpace = true;
      } else {
        wasSpace = false;
        sb += ch;
      }
    }
    return sb;
  }
}

Object.assign(BasicEvaluator.prototype, {
  /**
   * Whether accented letters must be considered equivalent or not.
   * @name module:activities/text/Evaluator.BasicEvaluator#checkAccents
   * @type {boolean} */
  checkAccents: true,
  /**
   * Whether to check or not dots, commas and other punctuation marks when comparing texts.
   * @name module:activities/text/Evaluator.BasicEvaluator#checkPunctuation
   * @type {boolean} */
  checkPunctuation: true,
  /**
   * Whether to check or not the extra spaces added between words.
   * @name module:activities/text/Evaluator.BasicEvaluator#checkDoubleSpaces
   * @type {boolean} */
  checkDoubleSpaces: false,
  /**
   * String containing all the characters considered as punctuation marks (currently ".,;:")
   * @name module:activities/text/Evaluator.BasicEvaluator#PUNCTUATION
   * @type {string} */
  PUNCTUATION: '.,;:',
});

/**
 * ComplexEvaluator acts like {@link module:activities/text/Evaluator.BasicEvaluator BasicEvaluator}, but providing feedback about
 * the location of mistakes on the user's answer.
 * @extends module:activities/text/Evaluator.BasicEvaluator
 */
class ComplexEvaluator extends BasicEvaluator {
  /**
   * ComplexEvaluator constructor
   * @param {string} className - The class name of this evaluator.
   */
  constructor(className) {
    super(className);
  }

  /**
   * Performs the evaluation of a string against an array of valid matches, returning an array of
   * flags useful to indicate where the mistakes are located.
   * In BasicEvaluator, all characters are just marked as 1 (error) or 0 (OK). See
   * {@link module:activities/text/Evaluator.ComplexEvaluator ComplexEvaluator} for more detailed analysis of answers.
   * @override
   * @param {string} text - The text to be checked
   * @param {string} match - A valid expression with which to compare.
   * @returns {number[]} - An array of flags (one number for character) indicating whether each
   * position is erroneous or OK.
   */
  _evalText(text, match) {

    if (!this.detail)
      return super._evalText(text, match);

    const
      skipped = Array(text.length).fill(false),
      sText = this.getClearedText(text, skipped),
      numChecks = Array(match.length),
      flags = Array(match.length),
      returnFlags = Array(text.length);
    let
      maxCheck = -1,
      maxCheckIndex = -1;

    for (let i = 0; i < match.length; i++) {
      flags[i] = Array(text.length).fill(0);
      const ok = this.compareSegment(sText, sText.length, match[i], match[i].length, flags[i], false);
      numChecks[i] = this.countFlagsOk(flags[i]);
      if (ok) {
        maxCheckIndex = i;
        maxCheck = numChecks[i];
      }
    }

    if (maxCheckIndex === -1) {
      for (let i = 0; i < match.length; i++) {
        if (numChecks[i] > maxCheck) {
          maxCheck = numChecks[i];
          maxCheckIndex = i;
        }
      }
    }

    for (let i = 0, k = 0; i < text.length; i++)
      returnFlags[i] = skipped[i] ? 0 : flags[maxCheckIndex][k++];

    return returnFlags;
  }

  /**
   * Counts the number of flags on the provided array that are zero.
   * @param {number[]} flags
   * @returns {number}
   */
  countFlagsOk(flags) {
    return flags.reduce((n, v) => v == 0 ? ++n : n, 0);
  }

  /**
   * Compares two segments of text.
   * This function should make recursive calls.
   * @param {string} src - Text to be compared
   * @param {number} ls - Offset in `src` where to start the comparison
   * @param {string} ok - Text to match against.
   * @param {number} lok - Offset in `ok` where to start the comparison.
   * @param {number[]} attr - Array of integers that will be filled with information about the
   * validity or error of each character in `src`.
   * @param {boolean} iterate - When `true`, the segment will be iterated looking for other
   * coincident fragments.
   * @returns {boolean} - `true` if the comparison was valid.
   */
  compareSegment(src, ls, ok, lok, attr, iterate) {
    let
      is = 0,
      iok = 0,
      lastIs = 0,
      lastiok = true,
      result = true,
      chs = '',
      chok = '';

    if (ls === 0 || lok === 0 || src === null || ok === null)
      return false;

    for (; is < ls; is++, iok++) {
      chs = src.charAt(is);
      lastIs = is;
      if (iok >= 0 && iok < lok)
        chok = ok.charAt(iok);
      else
        chok = 0;
      if (this.collator.compare(chs, chok) === 0) {
        attr[is] = 0;
        lastiok = true;
      } else {
        result = false;
        attr[is] = 1;
        if (!iterate && lastiok && chok !== 0 && this.checkSteps > 0 && this.checkScope > 0) {
          const
            lbloc = 2 * this.checkSteps + 1,
            itcoinc = [];
          let i = 0, j = 0;
          for (; j < lbloc; j++) {
            itcoinc[j] = 0;
            i = iok + Math.floor((j + 1) / 2) * ((j & 1) !== 0 ? 1 : -1);
            if (i >= lok)
              continue;
            const is2 = i < 0 ? is - i : is;
            if (is2 >= ls)
              continue;
            const
              ls2 = Math.min(ls - is2, this.checkScope),
              iok2 = i < 0 ? 0 : i,
              lok2 = Math.min(lok - iok2, this.checkScope),
              flags2 = Array(src.length - is2).fill(0),
              result2 = this.compareSegment(src.substring(is2), ls2, ok.substring(iok2), lok2, flags2, true);
            itcoinc[j] = this.countFlagsOk(flags2);
            if (result2)
              break;
          }
          if (j === lbloc) {
            let jmax = this.checkSteps;
            for (j = 0; j < lbloc; j++)
              if (itcoinc[j] > itcoinc[jmax])
                jmax = j;
            i = iok + Math.floor((jmax + 1) / 2) * ((jmax & 1) !== 0 ? 1 : -1);
          }
          iok = i;
          lastiok = false;
        }
      }
    }
    if (iok !== lok) {
      result = false;
      attr[lastIs] = 1;
    }
    return result;
  }
}

Object.assign(ComplexEvaluator.prototype, {
  /**
   * Whether to detail or not the location of errors found on the analyzed text.
   * @name module:activities/text/Evaluator.ComplexEvaluator#detail
   * @type {boolean} */
  detail: true,
  /**
   * Number of times to repeat the evaluation process if an error is found, eliminating in each
   * cycle the extra characters that caused the error.
   * @name module:activities/text/Evaluator.ComplexEvaluator#checkSteps
   * @type {number} */
  checkSteps: 3,
  /**
   * When an eror is detected in the analyzed expression, this variable indicates the number of
   * characters the checking pointer will be moved forward and back looking for a coincident
   * expression.
   *
   * For example, comparing the answer "_one lardzy dog_" with the correct answer "_one lazy dog_"
   * will detect an error at position 6 (an "r" instead of "z"). If `checkSteps` is set to 2 or
   * greater, the "_zy dog_" expression at position 8 will be found and evaluated as valid, while
   * a value of 1 or less will not found any coincident expression beyond the error position, thus
   * evaluating all the remaining sentence as erroneous.
   * @name module:activities/text/Evaluator.ComplexEvaluator#checkScope
   * @type {number} */
  checkScope: 6,
});

// List of known Evaluator classes
Evaluator.CLASSES = {
  '@BasicEvaluator': BasicEvaluator,
  '@ComplexEvaluator': ComplexEvaluator
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Evaluator);


/***/ })

};
;
//# sourceMappingURL=2715.jclic-node.js.map