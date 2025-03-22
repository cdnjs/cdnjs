"use strict";
exports.id = 5626;
exports.ids = [5626,1731,1078,7220];
exports.modules = {

/***/ 5626:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActivitySequenceElement */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActivitySequenceJump_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4112);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1253);
/**
 *  File    : bags/ActivitySequenceElement.js
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
 * This class is the basic component of {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence} objects. It represents a specific
 * point in the project's sequence of JClic activities.
 *
 * For each point of the sequence, some options can be set:
 * - What activity must run at this point
 * - What to do or where to jump when the activity finishes
 * - The behavior of the "next" button
 * - The behavior of the  "prev" button
 *
 * Sequence points can also have a "tag", used to refer to them with a unique name.
 */
class ActivitySequenceElement {
  constructor() {
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml
   */
  setProperties($xml) {

    // Iterate on all provided attributes
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'id':
          this['tag'] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .nSlash */ .c4)(val);
          break;
        case 'name':
          this['activity'] = val;
          break;
        case 'description':
        // possible navButtons values are: `none`, `fwd`, `back` or `both`
        case 'navButtons':
          this[name] = val;
          break;
        case 'delay':
          this[name] = Number(val);
          break;
      }
    });

    // Iterate on 'jump' elements to load fwdJump and/or backJump
    $xml.children('jump').each((_n, data) => {
      const jmp = new _ActivitySequenceJump_js__WEBPACK_IMPORTED_MODULE_1__["default"]().setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(data));
      if (jmp.id === 'forward')
        this.fwdJump = jmp;
      else if (jmp.id === 'back')
        this.backJump = jmp;
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
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getAttr */ .iu)(this, ['tag', 'description', 'activity', 'fwdJump', 'backJump', 'navButtons', 'delay']);
  }

  /**
   * Loads sequence element settings from a data object
   * @param {object} data
   */
  setAttributes(data) {
    ['tag', 'description', 'activity', 'navButtons', 'delay'].forEach(t => {
      if (!(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .isEmpty */ .Im)(data[t]))
        this[t] = data[t];
    });

    ['fwdJump', 'backJump'].forEach(jmp => {
      if (data[jmp]) {
        this[jmp] = new _ActivitySequenceJump_js__WEBPACK_IMPORTED_MODULE_1__["default"]().setAttributes(data[jmp]);
      }
    });
    return this;
  }
}

Object.assign(ActivitySequenceElement.prototype, {
  /**
   * Optional unique identifier of this element in the {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence}.
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#tag
   * @type {string} */
  tag: null,
  /**
   * Optional description of this sequence element.
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#description
   * @type {string} */
  description: null,
  /**
   * Name of the {@link module:Activity.Activity Activity} pointed by this element.
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#activity
   * @type {string} */
  activity: '',
  /**
   * Jump to be processed by the 'next' button action
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#fwdJump
   * @type {module:bags/ActivitySequenceJump.ActivitySequenceJump} */
  fwdJump: null,
  /**
   * Jump to be processed by the 'prev' button action.
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#backJump
   * @type {module:bags/ActivitySequenceJump.ActivitySequenceJump} */
  backJump: null,
  /**
   * What buttons should be active at this point of the sequence. Valid values are:
   * - 'none'
   * - 'fwd'
   * - 'back'
   * - 'both'
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#navButtons
   * @type {string} */
  navButtons: 'both',
  /**
   * Time delay (in seconds) before passing to the next/prev activity
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#delay
   * @type {number} */
  delay: 0,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActivitySequenceElement);


/***/ }),

/***/ 4112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActivitySequenceJump */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _JumpInfo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7220);
/* harmony import */ var _ConditionalJumpInfo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1078);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1253);
/**
 *  File    : bags/ActivitySequenceJump.js
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
 * This is a special case of {@link module:bags/JumpInfo.JumpInfo JumpInfo}, used only in {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} objects.
 * Sequence elements can contain up to two ActivitySequenceJump objects: one to be processed
 * when the user clicks on the "next" button (or when the activity finishes, if in automatic mode),
 * and the other used with the "prev" button. ActivitySequenceJump objects define a default jump
 * or action to be performed, but can also have up to two {@link module:bags/ConditionalJumpInfo.ConditionalJumpInfo ConditionalJumpInfo} objects. These
 * define alternative jumps that are performed only when score or time are below or over a specific
 * threshold.
 * @extends module:bags/JumpInfo.JumpInfo
 */
class ActivitySequenceJump extends _JumpInfo_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * ActivitySequenceJump constructor
   * @param {string} action - Must be one of the described actions.
   * @param {number|string} [sq] - Can be the tag of the sequence element to jump to, or its
   * cardinal number in the list.
   */
  constructor(action, sq) {
    super(action, sq);
  }

  /**
   * Loads the object settings from a specific JQuery XML element.
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    super.setProperties($xml);

    // Read conditional jumps
    $xml.children('jump').each((_n, child) => {
      const condJmp = new _ConditionalJumpInfo_js__WEBPACK_IMPORTED_MODULE_2__["default"]().setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
      if (condJmp.id === 'upper')
        this.upperJump = condJmp;
      else if (condJmp.id === 'lower')
        this.lowerJump = condJmp;
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
    return Object.assign(super.getAttributes(), (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .getAttr */ .iu)(this, ['upperJump', 'lowerJump']));
  }

  /**
    * Loads the jump settings from a data object
    * @param {object} data - The data object to parse
    */
  setAttributes(data) {
    super.setAttributes(data);

    ['upperJump', 'lowerJump'].forEach(cj => {
      if (data[cj])
        this[cj] = new _ConditionalJumpInfo_js__WEBPACK_IMPORTED_MODULE_2__["default"]().setAttributes(data[cj]);
    });

    return this;
  }


  /**
   * Resolves what {@link module:bags/JumpInfo.JumpInfo JumpInfo} must be taken, based on a done time and average rating obtained
   * in activities.
   * @param {number} rating - Average rating obtained by the user in the activities done during the
   * last sequence stretch.
   * @param {number} time - Total time spend doing the activities.
   * @returns {module:bags/JumpInfo.JumpInfo}
   */
  resolveJump(rating, time) {
    let result = this;
    if (rating >= 0 && time >= 0) {
      if (this.upperJump !== null &&
        rating > this.upperJump.threshold &&
        (this.upperJump.time <= 0 || time < this.upperJump.time)) {
        result = this.upperJump;
      } else if (this.lowerJump !== null &&
        (rating < this.lowerJump.threshold ||
          this.lowerJump.time > 0 && time > this.lowerJump.time)) {
        result = this.lowerJump;
      }
    }
    return result;
  }
}

Object.assign(ActivitySequenceJump.prototype, {
  /**
   * Optional jump to be performed when the results (score and time) are above a specific threshold.
   * @name module:bags/ActivitySequenceJump.ActivitySequenceJump#upperJump
   * @type {module:bags/ConditionalJumpInfo.ConditionalJumpInfo} */
  upperJump: null,
  /**
   * Optional jump to be performed when the results (score or time) are below a specific threshold.
   * @name module:bags/ActivitySequenceJump.ActivitySequenceJump#lowerJump
   * @type {module:bags/ConditionalJumpInfo.ConditionalJumpInfo} */
  lowerJump: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActivitySequenceJump);


/***/ }),

/***/ 1078:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ConditionalJumpInfo */
/* harmony import */ var _JumpInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7220);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/**
 *  File    : bags/ConditionalJumpInfo.js
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
 * This special case of {@link module:bags/JumpInfo.JumpInfo JumpInfo} is used in {@link module:bags/ActivitySequenceJump.ActivitySequenceJump ActivitySequenceJump} objects to decide
 * the type of jump or action to be performed, based on the results obtained by the user when
 * playing previous JClic activities.
 *
 * In addition to the standard {@link module:bags/JumpInfo.JumpInfo JumpInfo} fields and methods, this class has two public
 * members where score and time thresholds are stored.
 *
 * The exact meaning of this members will depend on the type of `ConditionalJumpInfo` in the
 * {@link module:bags/ActivitySequenceJump.ActivitySequenceJump ActivitySequenceJump} (it can be `upperJump` or `lowerJump`).
 * @extends module:bags/JumpInfo.JumpInfo
 */
class ConditionalJumpInfo extends _JumpInfo_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * ConditionalJumpInfo constructor
   * @param {string} action - Must be one of the described actions.
   * @param {number|string} [sq] - Can be the tag of the sequence element to jump to, or its
   * cardinal number in the list.
   * @param {number} [threshold] - Threshold above or below which the action will be triggered,
   * depending on the type of JumpInfo.
   * @param {number} [time] - Delay to be applied in automatic jumps.
   */
  constructor(action, sq, threshold, time) {
    super(action, sq);
    this.threshold = typeof threshold === 'number' ? threshold : -1;
    this.time = typeof threshold === 'number' ? time : -1;
  }

  /**
   * Loads this object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    super.setProperties($xml);
    if ($xml.attr('threshold') !== undefined)
      this.threshold = $xml.attr('threshold');
    if ($xml.attr('time') !== undefined)
      this.time = $xml.attr('time');
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return Object.assign(super.getAttributes(), (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, ['threshold', 'time']));
  }

  /**
   * Loads this conditional jump settings from a data object
   * @param {object} data - The data object to parse
   */
  setAttributes(data) {
    super.setAttributes(data);
    ['threshold', 'time'].forEach(t => {
      if (!(0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isEmpty */ .Im)(data[t]))
        this[t] = data[t];
    });
    return this;
  }
}

Object.assign(ConditionalJumpInfo.prototype, {
  /**
   * Threshold above or below which the action will be triggered, depending on the type of JumpInfo.
   * @name module:bags/ConditionalJumpInfo.ConditionalJumpInfo#threshold
   * @type {number} */
  threshold: -1,
  /**
   * Delay to be applied in automatic jumps.
   * @name module:bags/ConditionalJumpInfo.ConditionalJumpInfo#time
   * @type {number} */
  time: -1,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConditionalJumpInfo);


/***/ }),

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
//# sourceMappingURL=5626.jclic-node.js.map