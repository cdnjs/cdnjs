"use strict";
exports.id = 7220;
exports.ids = [7220];
exports.modules = {

/***/ 7220:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export JumpInfo */
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1253);
/**
 *  File    : bags/JumpInfo.js
 *  Created : 05/04/2015
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
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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
 * This class contains information about what things JClic sequence manager has to do in certain
 * circumstances, such as:
 * - an activity finishes
 * - the user clicks on the "next" or "prev" buttons
 * - the user clicks or a cell with special "active content"
 *
 * Different kinds of actions are possible for each of these events:
 * - RETURN: to go back to a previous point in the sequence.
 * - EXIT: to exit the program (thus navigating to another URL)
 * - STOP: to do nothing.
 * - JUMP: to jump to a specific point in the sequence of activities, or to another JClic project.
 * @see {@link module:bags/ActivitySequenceJump.ActivitySequenceJump ActivitySequenceJump}
 * @see {@link module:bags/ConditionalJumpInfo.ConditionalJumpInfo ConditionalJumpInfo}
 */
class JumpInfo {
  /**
   * JumpInfo constructor
   * @param {string} action - Must be one of the described actions.
   * @param {number|string} [sq] - Can be the tag of the sequence element to jump to, or its
   * cardinal number in the list.
   */
  constructor(action, sq) {
    this.action = action;
    switch (typeof sq) {
      case 'string':
        this.sequence = sq;
        break;
      case 'number':
        this.actNum = sq;
        break;
    }
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    this.id = $xml.attr('id');
    this.action = $xml.attr('action') || 'JUMP';
    if ($xml.attr('tag'))
      this.sequence = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .nSlash */ .c4)($xml.attr('tag'));
    if ($xml.attr('project'))
      this.projectPath = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .nSlash */ .c4)($xml.attr('project'));
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getAttr */ .iu)(this, ['id', 'action', 'actNum', 'sequence', 'projectPath']);
  }

  /**
   * Loads the object settings from a data object
   * @param {object} data - The data object to parse
   */
  setAttributes(data) {
    ['id', 'action', 'actNum', 'sequence', 'projectPath'].forEach(t => {
      if (!(0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .isEmpty */ .Im)(data[t]))
        this[t] = data[t];
    });
    return this;
  }
}

Object.assign(JumpInfo.prototype, {
  /**
   * The JumpInfo identifier
   * - For regular jumps: 'forward', 'back'
   * - For conditional jumps: 'upper', 'lower'
   * @name module:bags/JumpInfo.JumpInfo#id
   * @type {string} */
  id: null,
  /**
   * The current action.
   * Possible values are: `JUMP`, `STOP`, `RETURN` and `EXIT`.
   * @name module:bags/JumpInfo.JumpInfo#action
   * @type {string} */
  action: null,
  /**
   * Activity number in the sequence list
   * @name module:bags/JumpInfo.JumpInfo#actNum
   * @type {number} */
  actNum: -1,
  /**
   * Current sequence tag
   * @name module:bags/JumpInfo.JumpInfo#sequence
   * @type {string} */
  sequence: null,
  /**
   * Path of another JClic project to jump to
   * @name module:bags/JumpInfo.JumpInfo#projectPath
   * @type {string} */
  projectPath: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JumpInfo);


/***/ })

};
;
//# sourceMappingURL=7220.jclic-node.js.map