"use strict";
exports.id = 2379;
exports.ids = [2379];
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


/***/ })

};
;
//# sourceMappingURL=2379.jclic-node.js.map