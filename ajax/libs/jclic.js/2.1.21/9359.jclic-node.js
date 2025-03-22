"use strict";
exports.id = 9359;
exports.ids = [9359];
exports.modules = {

/***/ 9359:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActionReg */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/**
 *  File    : report/ActionReg.js
 *  Created : 17/05/2016
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
 * This class stores information about one specific action done by the current user while playing
 * an activity.
 *
 */
class ActionReg {
  /**
   * ActionReg constructor
   * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
   * @param {string}+ source - Description of the object on which the action is done.
   * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
   * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwise
   */
  constructor(type, source, dest, ok) {
    this.type = type;
    this.source = source || null;
    this.dest = dest || null;
    this.ok = ok || false;
    this.time = (new Date()).valueOf();
  }

  /**
   * Provides the data associated with this action in XML format suitable for a
   * {@link http://clic.xtec.cat/en/jclic/reports/|JClic Reports Server}.
   * @returns {external:jQuery}
   */
  $getXML() {
    const attr = { ok: this.ok, time: this.time };
    if (this.type)
      attr.type = this.type;
    if (this.source)
      attr.source = this.source;
    if (this.dest)
      attr.dest = this.dest;
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()('<action/>', attr);
  }

  /**
   * Fills this ActionReg with data provided in XML format
   * @param {external:jQuery} $xml - The XML element to be processed, already wrapped as jQuery object
   */
  setProperties($xml) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, value) => {
      switch (name) {
        case 'type':
        case 'source':
        case 'dest':
          this[name] = value;
          break;
        case 'time':
          this[name] = Number(value);
          break;
        case 'ok':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(value, false);
          break;
      }
    });
  }
}

Object.assign(ActionReg.prototype, {
  /**
   * The type of action (`click`, `write`, `move`, `select`...)
   * @name module:report/ActionReg.ActionReg#type
   * @type {string} */
  type: 'unknown',
  /**
   * Description of the object on which the action was done
   * @name module:report/ActionReg.ActionReg#source
   * @type {string} */
  source: null,
  /**
   * Description of the object that has acted as a target of the action (used in pairings)
   * @name module:report/ActionReg.ActionReg#dest
   * @type {string} */
  dest: null,
  /**
   * Time stamp taken when the action was done
   * @name module:report/ActionReg.ActionReg#time
   * @type {number} */
  time: 0,
  /**
   * `true` if the action was OK
   * @name module:report/ActionReg.ActionReg#isOk
   * @type {boolean} */
  isOk: false,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionReg);


/***/ })

};
;
//# sourceMappingURL=9359.jclic-node.js.map